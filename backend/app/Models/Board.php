<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Board extends Model
{
    protected $fillable = ['title'];

    public function lists(): HasMany
    {
        return $this->hasMany(BoardList::class);
    }
}
