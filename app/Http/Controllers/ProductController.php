<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the products, with optional search and pagination.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $products = Product::query()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
            })
            ->orderByDesc('id')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Products', [
            'products' => $products,
            'categories' => Category::all(),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id', 
            'price' => 'required|numeric',
        ]);

        $validated['image'] = $this->handleImageUpload($request);

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $this->handleImageUpload($request);
        }
        $validated['category_id'] = $request->input('category_id');
        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Delete the specified product.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }

    /**
     * Handle image upload logic.
     */
    private function handleImageUpload(Request $request): string
    {
        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('uploads', $filename, 'public');
        return '/storage/' . $path;
    }
}
