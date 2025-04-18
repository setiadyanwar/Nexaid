<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed user admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => bcrypt('admin'),
        ]);
        User::create([
            'name' => 'User 1',
            'email' => 'user@test.com',
            'password' => bcrypt('password'),
        ]);
    }
}
