<?php

namespace App\Http\Controllers;
use App\User;
use App\Role;
use App\User_Role;
use App\Http\Requests\RegisterFormRequest;
use Illuminate\Http\Request;
use JWTAuth;
use Auth;
class AuthController extends Controller
{
    public function register(Request $request)
{
    $user = new User;
    $user->email = $request->email;
    $user->name = $request->name;
    $user->password = bcrypt($request->password);
    $user->save();
    return response([
        'status' => 'success',
        'data' => $user
       ], 200);
 }
 public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    $user = User::with('roles')->where('email',$request->email)->first();
    if ( ! $token = JWTAuth::attempt($credentials)) {
            return response([
                'status' => 'error',
                'error' => 'invalid.credentials',
                'msg' => 'Invalid Credentials.'
            ], 400);
    }
    return response([
            'status' => 'success',
            'user' => $user,
        ])
        ->header('Authorization', $token);
}
public function user(Request $request)
{
    // $user = User::find(Auth::user()->id);
     $user = User::with('roles')->where('id',Auth::user()->id)->first();
    return response([
            'status' => 'success',
            'data' => $user

        ]);
}
public function refresh()
{
   return JWTAuth::parseToken()->authenticate();
}
public function logout()
{
    JWTAuth::invalidate();
    return response([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
}
}
