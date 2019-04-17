<?php

use App\User;
use Illuminate\Database\Seeder;

/**
 * Class UserTableSeeder.
 */
class UsersTableSeeder extends Seeder
{

    /**
     * Run the database seed.
     *
     * @return void
     */
    public function run()
    {

        // Add the master administrator, user id of 1
        User::create([
            'name'              => 'Admin User',
            'email'             => 'admin@test.com',
            'password'          => bcrypt('123456'),
        ]);

        User::create([
            'name'              => 'Moderator User',
            'email'             => 'moderator@test.com',
            'password'          =>  bcrypt('123456'),
        ]);

        User::create([
            'name'              => 'Normal User',
            'email'             => 'user@test.com',
            'password'          =>  bcrypt('123456'),
        ]);
    }
}
