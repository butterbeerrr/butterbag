<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'brand_id' => 1,
            'name' => 'Classic Flap Bag',
            'price' => 25000000,
            'stock' => 5,
        ]);

        Product::create([
            'brand_id' => 2,
            'name' => 'Lady Dior',
            'price' => 30000000,
            'stock' => 3,
        ]);

        Product::create([
            'brand_id' => 3,
            'name' => 'Neverfull MM',
            'price' => 22000000,
            'stock' => 7,
        ]);

        Product::create([
            'brand_id' => 4,
            'name' => 'Birkin 25',
            'price' => 150000000,
            'stock' => 2,
        ]);
    }
}
