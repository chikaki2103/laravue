<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role_Permission extends Model
{
     protected $fillable = [
        'role_id', 'permission_id',
    ];
}
