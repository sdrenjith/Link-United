import { useState, useEffect, useRef } from "react";
import api from "../../services/http";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { number: "01", name: "Agro Commodities" },
  { number: "02", name: "Vehicles & Machinery" },
  { number: "03", name: "Woods & Wood Products" },
  { number: "04", name: "Kids Clothing" },
  { number: "05", name: "General Products" },
];

export default function SlidersManager() {
  const [activeCategory, setActiveCategory] = useState("01");
  const [sliders, setSliders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSliders = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/sliders`, { params: { categoryNumber: activeCategory } });
      setSliders(data.items || []);
    } catch (err) {
      console.error("Failed to fetch sliders", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, [activeCategory]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // 1. Upload the image to the static storage public/images/sliders
      const uploadRes = await api.post("/upload", formData, {
        params: { type: "sliders" },
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadData = uploadRes.data;

      // 2. Register the uploaded image URL to the active category slider in Postgres
      await api.post("/sliders", {
        categoryNumber: activeCategory,
        imageUrl: uploadData.url,
        orderIndex: sliders.length,
      });

      fetchSliders();
    } catch (err: any) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this image from the slider?")) return;
    
    try {
      await api.delete(`/sliders/${id}`);
      setSliders((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Slider Management
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
          Control the dynamic image galleries featured on the Products page. Select a category below to upload, reorder, or unselect images. Changes apply instantly.
        </p>
      </div>

      {/* Category Selector Tabs */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-white/5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.number;
          return (
            <button
              key={cat.number}
              onClick={() => setActiveCategory(cat.number)}
              className={`relative px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
                isActive ? "text-gold-400 bg-gold-400/10 border-gold-400/20" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
              } border border-transparent`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-lg border border-gold-400/50 shadow-[0_0_15px_rgba(201,151,58,0.2)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        
        {/* Gallery Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-200">
            {CATEGORIES.find(c => c.number === activeCategory)?.name} Gallery
          </h2>
          
          {isLoading ? (
            <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
              <div className="animate-spin h-6 w-6 border-2 border-gold-400 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence>
                {sliders.map((slider) => (
                  <motion.div
                    key={slider.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50"
                  >
                    <img 
                      src={slider.imageUrl} 
                      alt="Slider" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Hover Controls */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <button 
                        onClick={() => handleDelete(slider.id)}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/40 p-2 rounded-full transition-colors border border-red-500/30"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {sliders.length === 0 && (
                <div className="col-span-full h-32 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl text-zinc-500 text-sm">
                  <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  No images in this slider yet.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upload Sidebar */}
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md sticky top-6">
            <h3 className="text-sm font-semibold text-white mb-4">Add to Slider</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Upload a high-quality landscape image (16:9 recommended). It will automatically attach to the active selected category.
            </p>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full py-10 px-4 border-2 border-dashed border-gold-400/30 hover:border-gold-400/70 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors group bg-gold-400/[0.02] hover:bg-gold-400/[0.05]"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin h-6 w-6 border-2 border-gold-400 border-t-transparent rounded-full" />
                  <span className="text-xs font-medium text-gold-400">Uploading...</span>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-full bg-gold-400/10 group-hover:bg-gold-400/20 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-gold-400 transition-colors">Select Image to Upload</span>
                  <span className="text-[10px] text-zinc-500">Max size: 10MB</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
