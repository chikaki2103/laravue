<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('auth/register', 'AuthController@register');
Route::post('auth/login', 'AuthController@login');
// Route::get('auth/userLg' , 'AuthController@userLogin');
Route::group(['middleware' => 'jwt.auth'], function(){
 
  Route::get('auth/user', 'AuthController@user');
  Route::post('auth/logout', 'AuthController@logout');
});
Route::group(['middleware' => 'jwt.refresh'], function(){
  Route::get('auth/refresh', 'AuthController@refresh');
});

 Route::group([    
    'namespace' => 'Auth',    
    'middleware' => 'api',    
    'prefix' => 'password'
], function () {    
    Route::post('create', 'ResetPasswordController@create');
    Route::get('find/{token}', 'ResetPasswordController@find');
    Route::post('reset', 'ResetPasswordController@reset');
});
 //crud role
Route::group(['prefix' => '/role', 'namespace' => 'Crud', 'as' => 'api.'], function () {
    Route::resource('roles', 'RoleController', ['except' => ['create', 'edit']]);
});
Route::group(['prefix' => '/user', 'namespace' => 'Crud', 'as' => 'api.'], function () {
    Route::resource('users', 'UserController', ['except' => ['create', 'edit']]);
});
Route::group(['prefix' => '/permission', 'namespace' => 'Crud', 'as' => 'api.'], function () {
    Route::resource('permissions', 'PermissionController', ['except' => ['create', 'edit']]);
});
