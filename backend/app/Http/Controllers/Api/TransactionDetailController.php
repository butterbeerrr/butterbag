<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;

class TransactionDetailController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'transaction_id' => 'required|exists:transactions,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $transaction = Transaction::findOrFail(
            $validated['transaction_id']
        );

        $details = [];

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);

            $detail = TransactionDetail::create([
                'transaction_id' => $transaction->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);

            $details[] = $detail;
        }

        $total = $transaction->details->sum(function ($detail) {
            return $detail->quantity * $detail->price;
        });

        $transaction->update([
            'total_amount' => $total,
        ]);

        return response()->json([
            'message' => 'Transaction details created successfully',
            'transaction' => $transaction->load('details.product'),
        ], 201);
    }

    public function update(Request $request, TransactionDetail $transactionDetail)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $transactionDetail->update([
            'quantity' => $validated['quantity'],
        ]);

        $transaction = $transactionDetail->transaction;

        $total = $transaction->details->sum(function ($detail) {
            return $detail->quantity * $detail->price;
        });

        $transaction->update([
            'total_amount' => $total,
        ]);

        return response()->json([
            'message' => 'Transaction detail updated successfully',
            'detail' => $transactionDetail->load('product'),
            'total_amount' => $total,
        ]);
    }

    public function destroy(TransactionDetail $transactionDetail)
    {
        $transaction = $transactionDetail->transaction;

        $transactionDetail->delete();

        $total = $transaction->details->sum(function ($detail) {
            return $detail->quantity * $detail->price;
        });

        $transaction->update([
            'total_amount' => $total,
        ]);

        return response()->json([
            'message' => 'Transaction detail deleted successfully',
            'total_amount' => $total,
        ]);
    }
}
