<?php

namespace App\Http\Controllers\Crud;

use App\Permission;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        extract(request()->only(['query', 'limit', 'page', 'orderBy', 'ascending', 'byColumn']));

        $fields = ['id','name','display_name',"created_at"];
        $model =  new Permission;
        $data = $model->select($fields);

        if (isset($query) && $query) {
            $data = $byColumn == 1 ?
                $this->filterByColumn($data, $query) :
                $this->filter($data, $query, $fields);
        }

        $count = $data->count();

        $data = $data->limit($limit)
            ->skip($limit * ($page - 1));

        if (isset($orderBy)) {
            $direction = $ascending == 0 ? 'ASC' : 'DESC';
            $data = $data->orderBy($orderBy, $direction);
        }

        $results = $data->get()->toArray();

        return [
            'data' => $results,
            'count' => $count,
        ];

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected function filterByColumn($data, $queries)
    {
        return $data->where(function ($q) use ($queries) {
            foreach ($queries as $field => $query) {
                if (is_string($query)) {
                    $q->where($field, 'LIKE', "%{$query}%");
                } else {
                    $start = Carbon::createFromFormat('Y-m-d', $query['start'])->startOfDay();
                    $end = Carbon::createFromFormat('Y-m-d', $query['end'])->endOfDay();

                    $q->whereBetween($field, [$start, $end]);
                }
            }
        });
    }


   protected function filter($data, $query, $fields)
    {
        return $data->where(function ($q) use ($query, $fields) {
            foreach ($fields as $index => $field) {
                $method = $index ? 'orWhere' : 'where';
                $q->{$method}($field, 'LIKE', "%{$query}%");
            }
        });
    }

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
            $old_role = Permission::where('name' , $request->name)->where('display_name' , $request->display_name)->first();
           $role = new Permission;
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
        return Permission::findOrFail($id);
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
        $role = Permission::find($id);
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
        $company = Permission::findOrFail($id);
        $company->delete();
        return '';
    }
}
