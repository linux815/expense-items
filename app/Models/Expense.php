<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Expense extends Model
{
    use SoftDeletes;

    protected $table = 'expenses';

    protected $fillable = [
        'name', 'cost', 'comment', 'category_id', 'expensed_at',
    ];

    protected $dates = [
        'created_at', 'updated_at', 'deleted_at', 'expensed_at'
    ];
}
