<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        Product::create([
            'title' => 'Laptop Dell XPS 13',
            'image' => 'storage/productImage/laptop1.jpg',  // Path relatif dari public
            'category_id' => $categories->where('name', 'Laptop')->first()->id,
            'content' => 'Laptop Dell XPS 13 dengan performa tinggi dan desain premium.',
            'price' => 15000000,
        ]);
        
        Product::create([
            'title' => 'iPhone 13 Pro Max',
            'image' => 'storage/productImage/iphone1.jpg', 
            'category_id' => $categories->where('name', 'Smartphone')->first()->id,
            'content' => 'Smartphone terbaru dari Apple dengan kamera terbaik.',
            'price' => 20000000,
        ]);
        
        Product::create([
            'title' => 'Samsung 55 inch 4K TV',
            'image' => 'storage/productImage/tv1.jpg', 
            'category_id' => $categories->where('name', 'Televisi')->first()->id,
            'content' => 'Televisi 4K dengan gambar yang tajam dan suara jernih.',
            'price' => 12000000,
        ]);
        
        Product::create([
            'title' => 'Canon EOS R6',
            'image' => 'storage/productImage/camera1.jpg',
            'category_id' => $categories->where('name', 'Kamera')->first()->id,
            'content' => 'Kamera mirrorless dengan kualitas gambar luar biasa.',
            'price' => 25000000,
        ]);
        
        Product::create([
            'title' => 'Logitech Wireless Mouse',
            'image' => 'storage/productImage/mouse1.jpg',
            'category_id' => $categories->where('name', 'Aksesoris')->first()->id,
            'content' => 'Mouse nirkabel dengan desain ergonomis.',
            'price' => 500000,
        ]);
        
        Product::create([
            'title' => 'Sony Noise Cancelling Headphones',
            'image' => 'storage/productImage/headphones1.jpg',  
            'category_id' => $categories->where('name', 'Perangkat Audio')->first()->id,
            'content' => 'Headphone dengan teknologi noise-cancelling.',
            'price' => 4000000,
        ]);
    }
}
