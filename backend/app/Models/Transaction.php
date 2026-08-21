<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public $fillable = ['customer_id', 'cashier_id', 'transaction_type', 'total_amount', 'payment status'];

    public function customer(){
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function cashier(){
        return $this->belongsTo(User::class,'cashier_id');
    }

    public function details(){
        return $this->hasMany(TransactionDetail::class);
    }
}

