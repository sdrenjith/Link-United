import { useState, useEffect, useRef } from "react";
import api from "../../services/http";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";

const emptyAnnouncement = {
  title: "",
  description: "",
  imageUrl: "",
  isActive: true,
};

export default function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [form, setForm] = useState(emptyAnnouncement);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/announcements`);
      setAnnouncements(data.items || []);
    } catch (err) {
      console.error("Failed to fetch announcements", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const uploadRes = await api.post("/upload", formData, {
        params: { type: "announcements" },
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, imageUrl: uploadRes.data.url }));
    } catch (err: any) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      return alert("Title is required!");
    }

    setIsSaving(true);
    try {
      await api.post("/announcements", {
        ...form,
        orderIndex: announcements.length,
      });
      setForm(emptyAnnouncement);
      fetchAnnouncements();
    } catch (err: any) {
      alert("Error saving: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this announcement forever?")) return;
    
    try {
      await api.delete(`/announcements/${id}`);
      setAnnouncements((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Announcements
        </h1>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
          Manage the scrolling announcements bar on the homepage. Optional small logos can appear next to each title.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 mt-6">
        
        {/* Creation Form */}
        <div className="space-y-4">
          <form onSubmit={handleSave} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md sticky top-6 space-y-5">
            <h3 className="text-sm font-semibold text-white">New announcement</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Display Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-gold-500/50 transition-colors"
                placeholder="E.g., Global Summit 2026 partner..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Hover Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-gold-500/50 resize-none transition-colors"
                placeholder="Visible when a visitor hovers an announcement..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Company Logo (Optional)</label>
              
              {!form.imageUrl ? (
                <div>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full py-6 px-4 border border-dashed border-white/20 hover:border-gold-400/50 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors group bg-white/[0.01]"
                  >
                    {isUploading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-gold-400 border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-zinc-500 group-hover:text-gold-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span className="text-xs text-zinc-400 group-hover:text-zinc-300">Upload SVG/PNG Logo</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="relative border border-white/10 rounded-lg p-3 bg-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <img src={form.imageUrl} alt="Attached Logo" className="w-10 h-10 object-contain bg-black/50 rounded" />
                    <span className="text-xs text-zinc-300 truncate max-w-[150px]">{form.imageUrl.split('/').pop()}</span>
                  </div>
                  <button type="button" onClick={() => setForm({ ...form, imageUrl: "" })} className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <Button type="submit" disabled={isSaving || isUploading} className="w-full mt-4">
              {isSaving ? "Saving..." : "Add announcement"}
            </Button>
          </form>
        </div>

        {/* Existing Items List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-200">Active announcements</h2>
          
          {isLoading ? (
            <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
              <div className="animate-spin h-6 w-6 border-2 border-gold-400 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {announcements.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group bg-white/[0.02] border border-white/10 rounded-xl p-4 flex gap-4 hover:bg-white/[0.04] transition-colors relative pr-12"
                  >
                    {item.imageUrl && (
                      <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-black/40 rounded-lg border border-white/5 p-2">
                        <img src={item.imageUrl} alt="Logo" className="max-w-full max-h-full object-contain filter drop-shadow-md brightness-110" />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      {item.description && (
                         <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                      )}
                    </div>

                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 bg-red-500/10 text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition-all border border-red-500/20"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                  </motion.div>
                ))}
              </AnimatePresence>

              {announcements.length === 0 && (
                <div className="h-32 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl text-zinc-500 text-sm">
                  No announcements yet. Add one above.
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
