<?php

namespace App\Http\Controllers\Crud;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   public function index()
    {
        extract(request()->only(['query', 'limit', 'page', 'orderBy', 'ascending', 'byColumn']));

        $fields = ['id','name','email',"created_at"];
        $model =  new User;
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
            $old_user = User::where('name' , $request->name)->where('email' , $request->email)->first();
           $role = new User;
           $role->name = $request->name;
           $role->email = $request->email;
           $role->password = bcrypt($request->password);

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
        return User::findOrFail($id);
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
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password ;
        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = User::findOrFail($id);
        $company->delete();
        return '';
    }
}
