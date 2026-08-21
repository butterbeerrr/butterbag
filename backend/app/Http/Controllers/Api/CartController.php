<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index(Request $request){
        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id,
        ]);

        $cart->load('items.product');

        return response()->json([
            'cart' => $cart,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id
        ]);

        $product = Product::findOrFail($validated['product_id']);

        $item = CartItem::where('cart_id', $cart->id)->where('product_id', $product->id)->first();

        if ($item) {
            $item->quantity += $validated['quantity'];
            $item->save();
        } else {
            $item = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $validated['quantity']
            ]);
        }

        return response()->json([
            'message' => 'Product added to cart successfully',
            'cart' => $cart->load('items.product')
        ], 201);
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::where('user_id', $request->user()->id)->firstOrFail();

        if ($cartItem->cart_id !== $cart->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $cartItem->update([
            'quantity' => $validated['quantity']
        ]);

        return response()->json([
            'message' => 'Cart item updated successfully',
            'cart' => $cart->load('items.product')
        ]);
    }

    public function destroy(Request $request, CartItem $cartItem)
    {
        $cart = Cart::where('user_id', $request->user()->id)->firstOrFail();

        if ($cartItem->cart_id !== $cart->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $cartItem->delete();

        return response()->json([
            'message' => 'Product removed from cart successfully',
            'cart' => $cart->load('items.product')
        ]);
    }

    public function checkout(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)->with('items.product')->firstOrFail();

        if ($cart->items->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty'
            ], 400);
        }

        DB::beginTransaction();

        try {
            foreach ($cart->items as $item) {
                if ($item->quantity > $item->product->stock) {
                    DB::rollBack();

                    return response()->json([
                        'message' => 'Insufficient stock',
                        'product' => $item->product->name,
                        'available_stock' => $item->product->stock,
                        'requested_quantity' => $item->quantity,
                    ], 400);
                }
            }

            $transaction = Transaction::create([
                'customer_id' => $request->user()->id,
                'cashier_id' => null,
                'transaction_type' => 'online',
                'total_amount' => 0,
                'payment_status' => 'pending',
            ]);

            $total = 0;

            foreach ($cart->items as $item) {

                $price = $item->product->price;

                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $item->product->id,
                    'quantity' => $item->quantity,
                    'price' => $price,
                ]);

                $total += $price * $item->quantity;

                $item->product->decrement('stock', $item->quantity);
            }

            $transaction->update([
                'total_amount' => $total,
            ]);

            $cart->items()->delete();

            DB::commit();

            return response()->json([
                'message' => 'Checkout successful',
                'transaction' => $transaction->load('details.product'),
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
