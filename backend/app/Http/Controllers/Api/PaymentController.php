<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
    public function createPayment(Request $request, Transaction $transaction)
    {
        if ($transaction->customer_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        if ($transaction->transaction_type !== 'online') {
            return response()->json([
                'message' => 'This transaction is not an online transaction'
            ], 400);
        }

        if ($transaction->payment_status === 'paid') {
            return response()->json([
                'message' => 'Transaction has already been paid'
            ], 400);
        }

        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $orderId = 'BUTTERBAG-' . $transaction->id . '-' . time();

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) $transaction->total_amount,
            ],

            'customer_details' => [
                'first_name' => $request->user()->name,
                'email' => $request->user()->email,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);

            $transaction->update([
                'midtrans_order_id' => $orderId,
            ]);

            return response()->json([
                'message' => 'Payment created successfully',
                'order_id' => $orderId,
                'snap_token' => $snapToken,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create payment',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
