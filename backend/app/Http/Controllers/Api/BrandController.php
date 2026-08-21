<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        return response()->json(Brand::withCount('products')->latest()->get());
    }

    public function show(Brand $brand)
    {
        return response()->json($brand);
    }

    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $brand = Brand::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Brand created',
            'brand' => $brand,
        ], 201);
    }

    public function update(Request $request, Brand $brand)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $brand->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Brand updated',
            'brand' => $brand,
        ]);
    }

    public function destroy(Request $request, Brand $brand)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $brand->delete();

        return response()->json([
            'message' => 'Brand deleted'
        ]);
    }
}
