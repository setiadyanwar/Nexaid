import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface Product {
  id?: number;
  title: string;
  content: string;
  image?: string;
  category: Category; // Modify to include Category object
  price: number;
}

interface Category {
  id: number;
  name: string;
  color: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  product?: Product | null;
  categories: Category[];
}

export default function ProductFormModal({ isOpen, closeModal, product, categories }: Props) {
  // State untuk data form produk
  const [formData, setFormData] = useState<Product>({
    title: "",
    content: "",
    image: "",
    category: { id: 0, name: "", color: "" }, // Default to empty category object
    price: 0,
  });

  // State untuk file gambar yang dipilih dan preview URL-nya
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // Sinkronisasi state form jika ada perubahan pada prop product (misalnya untuk edit)
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        content: product.content,
        image: product.image || "",
        category: product.category || { id: 0, name: "", color: "" }, // Ensure category is set
        price: product.price,
      });
      setPreview(product.image || "");
      setSelectedFile(null);
    } else {
      setFormData({
        title: "",
        content: "",
        image: "",
        category: { id: 0, name: "", color: "" }, // Ensure category is reset
        price: 0,
      });
      setPreview("");
      setSelectedFile(null);
    }
  }, [product]);

  // Handler untuk perubahan input teks dan textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler untuk perubahan kategori
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(e.target.value);
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    setFormData({ ...formData, category: selectedCategory || { id: 0, name: "", color: "" } });
  };

  // Handler untuk file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert("File terlalu besar! Maksimal ukuran 5MB.");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handler untuk submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category_id", formData.category.id.toString()); 
    data.append("price", formData.price.toString());

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    if (product?.id) {
      data.append("_method", "PUT");
      router.post(`/products/${product.id}`, data, {
        onSuccess: () => {
          closeModal();
          router.reload();
          toast.success('Produk berhasil diperbarui!');
        },
        onError: (errors) => {
          alert(errors.message || "Terjadi kesalahan saat memperbarui produk.");
          toast.error(errors.message || "Terjadi kesalahan saat memperbarui produk.");
        },
      });
    } else {
      // Tambah produk baru
      router.post("/products", data, {
        onSuccess: () => {
          closeModal();
          router.reload();
          toast.success('Produk berhasil ditambahkan!');
        },
        onError: (errors) => {
          console.error(errors);
          alert(errors.message || "Terjadi kesalahan saat menambahkan produk.");
          toast.error(errors.message || "Terjadi kesalahan saat menambahkan produk.");
        },
      });
    }
  };

  // Jika modal tidak aktif, jangan render apa pun
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Title Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {/* Content Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            ></textarea>
          </div>
          {/* Category Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category.id} // Use category.id for selected value
              onChange={handleCategoryChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Pilih kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          {/* Price Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {/* File Upload Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Image (optional)</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full mt-2 cursor-pointer bg-slate-100 text-slate-600 p-2 rounded"
              accept="image/*"
            />
          </div>
          {/* Image Preview */}
          {preview && (
            <div className="mb-3">
              <p className="text-sm mb-1">Image Preview:</p>
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
