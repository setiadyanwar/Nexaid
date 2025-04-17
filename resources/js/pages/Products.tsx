import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import PostFormModal from "@/components/PostFormModal";
import AppLayout from "@/layouts/app-layout";

interface Product {
  id: number;
  title: string;
  content: string;
  image?: string;
  category: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  color: string;
}

export default function Products() {
  const { products, categories } = usePage<{ products: Product[]; categories: Category[] }>().props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product | null = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    router.delete(`/products/${id}`, {
      onSuccess: () => router.reload(),
      onError: () => console.error("Failed to delete product."),
    });
  };

  return (
    <AppLayout>
      <Head title="Products" />

      {/* Header Section */}
      <div className="mb-4 pt-4 px-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-600">Manage your products easily</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">List of Products</h2>
          <button
            onClick={() => openModal()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium rounded px-4 py-2 transition"
          >
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Image", "Title", "Decsription", "Category", "Price", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                      {product.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      Rp {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openModal(product)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded px-3 py-1 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded px-3 py-1 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PostFormModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        product={selectedProduct} categories={categories}      />
    </AppLayout>
  );
}
