<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::create([
            'name' => 'Chanel',
        ]);

        Brand::create([
            'name' => 'Dior',
        ]);

        Brand::create([
            'name' => 'Louis Vuitton',
        ]);

        Brand::create([
            'name' => 'Hermès',
        ]);
    }
}
