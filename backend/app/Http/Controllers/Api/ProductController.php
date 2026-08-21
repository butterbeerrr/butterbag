<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('brand')->get());
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $imageUrl = null;

        if ($request->hasFile('image')) {
            $cloudinary = new Cloudinary();

            $upload = $cloudinary
                ->uploadApi()
                ->upload(
                    $request->file('image')->getRealPath(),
                    [
                        'folder' => 'butterbag/products',
                    ]
                );

            $imageUrl = $upload['secure_url'];
        }

        $product = Product::create([
            'brand_id' => $request->brand_id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $imageUrl,
        ]);

        return response()->json([
            'message' => 'Product created',
            'product' => $product,
        ], 201);
    }

    public function update(Request $request, Product $product)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $imageUrl = $product->image;

        if ($request->hasFile('image')) {
            $cloudinary = new Cloudinary();

            $upload = $cloudinary
                ->uploadApi()
                ->upload(
                    $request->file('image')->getRealPath(),
                    [
                        'folder' => 'butterbag/products',
                    ]
                );

            $imageUrl = $upload['secure_url'];
        }

        $product->update([
            'brand_id' => $request->brand_id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $imageUrl,
        ]);

        return response()->json([
            'message' => 'Product updated',
            'product' => $product,
        ]);
    }

    public function destroy(Request $request, Product $product)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted'
        ]);
    }
}
