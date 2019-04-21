<?php

namespace App\Http\Controllers\Crud;

use App\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return Role::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
          
            try {
            $old_role = Role::where('name' , $request->name)->where('display_name' , $request->display_name)->first();
           $role = new Role;
           $role->name = $request->name;
           $role->display_name = $request->display_name;
              $role->save();
              
             

            } catch (Exception $e) {
            return response()->json(['error'=>$e->errors()],500);
              
                    
            }
           // if(isset($old_role->name)){
           //       return response()->json(['message'=>'trung old name'],500);
           // }
           // if(isset($old_role->display_name)){
           //       return response()->json(['message'=>'trung display name'],500);
           // }
         
           
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Role::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // dd($request->all());
        //  $role = Role::findOrFail($id);
        // $role->update($request->all());
        $role = Role::find($id);
        $role->name = $request->name;
        $role->display_name = $request->display_name;
        $role->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Role::findOrFail($id);
        $company->delete();
        return '';
    }
}
