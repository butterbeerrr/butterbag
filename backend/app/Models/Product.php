<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    use HasFactory;

    protected $fillable = ['brand_id', 'name', 'price', 'stock', 'image'];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function transactionDetail()
    {
        return $this->hasMany(Transaction::class);
    }
}
