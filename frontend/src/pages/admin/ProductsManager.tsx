import { useEffect, useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import { categoryMeta } from "../../constants/site";
import { productsService } from "../../services/products.service";
import api from "../../services/http";
import type { Product, ProductCategory } from "../../types/api";

const emptyProduct = {
  name: "",
  category: "general-products" as ProductCategory,
  subCategory: "",
  shortDescription: "",
  description: "",
  price: 0,
  unit: "kg",
  imageUrl: "",
  isFeatured: false,
};

const agroSubCategories = [
  "Masala powder",
  "Direct powder",
  "Breakfast products",
  "Packed products",
  "Whole spices",
  "Other food products",
  "Rice",
  "Pickles",
  "Paste",
  "Sauce",
  "Chutney",
  "Millets and pulses"
];

const kidsSubCategories = ["Babys", "Kids", "Teens"];

function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [isUploading, setIsUploading] = useState(false);

  const loadProducts = async () => {
    const data = await productsService.list();
    setProducts(data);
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const submitLabel = useMemo(() => (editingId ? "Update Product" : "Add Product"), [editingId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingId) {
      await productsService.update(editingId, form);
    } else {
      await productsService.create(form);
    }
    setForm(emptyProduct);
    setEditingId(null);
    await loadProducts();
  };

  const handleEdit = (item: Product) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      subCategory: item.subCategory || "",
      shortDescription: item.shortDescription,
      description: item.description,
      price: item.price,
      unit: item.unit,
      imageUrl: item.imageUrl,
      isFeatured: item.isFeatured,
    });
  };

  const handleDelete = async (id: number) => {
    await productsService.remove(id);
    await loadProducts();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload", formData, {
        params: { type: "products" },
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, imageUrl: res.data.url }));
    } catch (err: any) {
      console.error(err);
      alert("Error uploading image: " + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Manage Products</h1>
      <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg border border-zinc-700 bg-zinc-900 p-4 md:grid-cols-2">
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Product Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
        <select
          className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
          value={form.category}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              category: e.target.value as ProductCategory,
              subCategory:
                e.target.value === "agro-commodities" || e.target.value === "kids-clothing"
                  ? prev.subCategory
                  : "",
            }))
          }
          required
        >
          {categoryMeta.map((item) => (
            <option value={item.key} key={item.key}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Conditional sub-category dropdown for agro and kids wear */}
        {(form.category === "agro-commodities" || form.category === "kids-clothing") && (
          <select 
            className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm md:col-span-2" 
            value={form.subCategory || ""} 
            onChange={(e) => setForm((prev) => ({ ...prev, subCategory: e.target.value }))}
            required
          >
            <option value="" disabled>Select Sub-Category</option>
            {(form.category === "agro-commodities" ? agroSubCategories : kidsSubCategories).map((sub) => (
              <option value={sub} key={sub}>{sub}</option>
            ))}
          </select>
        )}
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Short Description" value={form.shortDescription} onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))} required />
        
        {/* Dynamic Image Uploader */}
        <div className="flex items-center gap-3 rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm">
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Thumbnail" className="h-8 w-8 rounded object-cover border border-zinc-700 bg-zinc-900" />
          )}
          <div className="flex-1 flex flex-col justify-center">
            {isUploading ? (
              <span className="text-gold-400 text-xs font-medium animate-pulse">Uploading image...</span>
            ) : (
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-zinc-400 w-full file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 file:text-xs file:cursor-pointer cursor-pointer text-xs" />
            )}
            <input type="hidden" value={form.imageUrl} required />
          </div>
        </div>

        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Unit (kg, ton)" value={form.unit} onChange={(e) => setForm((prev) => ({ ...prev, unit: e.target.value }))} required />
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))} required />
        <textarea className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm md:col-span-2" placeholder="Full description" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
        <label className="flex items-center gap-2 text-sm text-zinc-300 md:col-span-2">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))} />
          Featured product
        </label>
        <div className="md:col-span-2">
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-lg border border-zinc-700">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-zinc-900">
            <tr>
              <th className="px-3 py-2 text-zinc-300">Name</th>
              <th className="px-3 py-2 text-zinc-300">Category</th>
              <th className="px-3 py-2 text-zinc-300">Price</th>
              <th className="px-3 py-2 text-zinc-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-t border-zinc-800">
                <td className="px-3 py-2 text-zinc-200">{item.name}</td>
                <td className="px-3 py-2 text-zinc-300">{item.category}</td>
                <td className="px-3 py-2 text-zinc-300">${item.price.toFixed(2)}</td>
                <td className="flex gap-2 px-3 py-2">
                  <Button variant="ghost" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsManager;
