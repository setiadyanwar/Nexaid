import { useState, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import PostFormModal from "@/components/PostFormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner";
import AppLayout from "@/layouts/app-layout";

interface Product {
  category: Category;
  id: number;
  title: string;
  content: string;
  image?: string;
  category_id: number;  // Ganti menjadi category_id untuk menyimpan ID kategori
  price: number;
}

interface Button {
  onClick: () => void;
  label?: string;
}

interface Category {
  id: number;
  name: string;
  color: string;
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface ProductPagination {
  data: Product[];
  links: PaginationLinks[];
}

export default function Products() {
  const { products, categories } = usePage<{
    products: ProductPagination;
    categories: Category[];
  }>().props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  // Debounce untuk pencarian produk
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.get("/products", { search }, { preserveState: true });
    }, 500); // delay 500ms setelah user berhenti mengetik
  
    return () => clearTimeout(timeout); // bersihkan timeout jika search berubah sebelum delay selesai
  }, [search]);

  // Fungsi untuk membuka modal tambah/edit produk
  const openModal = (product: Product | null = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Fungsi untuk menghapus produk
  const handleDelete = (id: number) => {
    router.delete(`/products/${id}`, {
      onSuccess: () => {toast.success("Produk berhasil dihapus!");},
      onError: () => {toast.error("Gagal menghapus produk!");},
    });
  };

  // Fungsi untuk navigasi pagination
  const handlePagination = (url: string | null) => {
    if (url) {
      router.get(url, {}, { preserveState: true });
    }
  };

  // Fungsi untuk mendapatkan nama kategori berdasarkan category_id
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <AppLayout>
      {/* Toaster */}
      <Toaster richColors position="top-right" />
      <Head title="Products" />

      {/* Header Section */}
      <div className="mb-4 pt-4 px-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-600">Manage your products easily</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {/* Search and Add Button */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          />
          <Button
            onClick={() => openModal()}
            className="bg-slate-950 hover:bg-slate-800 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Product
          </Button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Image", "Title", "Description", "Category", "Price", "Actions"].map((header) => (
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
              {products.data.length > 0 ? (
                products.data.map((product) => (
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
                      {/* Menampilkan nama kategori dengan warna pill */}
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full`}
                        style={{ backgroundColor: product.category ? product.category.color : '#e5e7eb' }}
                      >
                        {getCategoryName(product.category_id)}
                      </span>
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

        {/* Pagination */}
        {products.links && products.links.length > 0 && (
          <Pagination className="mt-6">
            <PaginationContent>
              {products.links.map((link, idx) => {
                const label = link.label.toLowerCase();

                if (label.includes("previous")) {
                  return (
                    <PaginationItem key={idx}>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          handlePagination(link.url);
                        }}
                      />
                    </PaginationItem>
                  );
                }

                if (label.includes("next")) {
                  return (
                    <PaginationItem key={idx}>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          handlePagination(link.url);
                        }}
                      />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={idx}>
                    {link.url === null ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        isActive={link.active}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePagination(link.url);
                        }}
                      />
                    )}
                  </PaginationItem>
                );
              })}
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {/* Modal Tambah/Edit Produk */}
      <PostFormModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        product={
          selectedProduct
            ? { ...selectedProduct, category: categories.find(cat => cat.id === selectedProduct.category_id)! }
            : null
        }
        categories={categories}
      />
    </AppLayout>
  );
}
