<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
  protected $fillable = ['name','display_name'];

  public function UserHasRole(){
        return $this->belongsToMany('App\User','user_role','user_id','role_id');
    }
     public function permissions(){
        return $this->belongsToMany('App\Permission','role_permission','role_id','permission_id');
    }
}
