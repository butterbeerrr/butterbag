<?php

namespace App\Http\Controllers\Api;

use App\Models\Transaction;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with([
            'customer',
            'cashier',
            'details.product'
        ])->get();

        return response()->json([
            'transactions' => $transactions
        ]);
    }

    public function show(Transaction $transaction)
    {
        $transaction->load([
            'customer',
            'cashier',
            'details.product'
        ]);

        return response()->json([
            'transaction' => $transaction,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'cashier') {

            $validated = $request->validate([
                'customer_id' => 'nullable|exists:users,id',
                'payment_status' => 'required|in:pending,paid,cancelled',
            ]);

            $transaction = Transaction::create([
                'customer_id' => $validated['customer_id'] ?? null,
                'cashier_id' => $user->id,
                'transaction_type' => 'offline',
                'total_amount' => 0,
                'payment_status' => $validated['payment_status'],
            ]);
        } elseif ($user->role === 'customer') {

            $validated = $request->validate([
                'payment_status' => 'required|in:pending,paid,cancelled',
            ]);

            $transaction = Transaction::create([
                'customer_id' => $user->id,
                'cashier_id' => null,
                'transaction_type' => 'online',
                'total_amount' => 0,
                'payment_status' => $validated['payment_status'],
            ]);
        } else {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'message' => 'Transaction created successfully',
            'transaction' => $transaction,
        ], 201);
    }

    public function myTransactions(Request $request)
    {
        $transactions = Transaction::where(
            'customer_id',
            $request->user()->id
        )
            ->with('details.product')
            ->latest()
            ->get();

        return response()->json([
            'transactions' => $transactions
        ]);
    }
}
