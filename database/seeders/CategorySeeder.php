<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    Category::insert([
        ['name' => 'Laptop', 'color' => '#3B82F6'], // biru
        ['name' => 'Smartphone', 'color' => '#10B981'], // hijau
        ['name' => 'Televisi', 'color' => '#F59E0B'], // kuning
        ['name' => 'Kamera', 'color' => '#EF4444'], // merah
        ['name' => 'Aksesoris', 'color' => '#8B5CF6'], // ungu
        ['name' => 'Perangkat Audio', 'color' => '#06B6D4'], // cyan
    ]);
        
    }
}
