<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
      protected $fillable = ['name','display_name'];

      public function PermissionHasRole(){
         return $this->belongsToMany('App\Role','role_permission','role_id','permission_id');
    }
}
