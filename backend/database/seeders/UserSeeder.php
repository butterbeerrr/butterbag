<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin ButterBag',
            'email' => 'admin@butterbag.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Cashier ButterBag',
            'email' => 'cashier@butterbag.com',
            'password' => Hash::make('password123'),
            'role' => 'cashier',
        ]);

        User::create([
            'name' => 'Customer ButterBag',
            'email' => 'customer@butterbag.com',
            'password' => Hash::make('password123'),
            'role' => 'customer',
        ]);
    }
}
