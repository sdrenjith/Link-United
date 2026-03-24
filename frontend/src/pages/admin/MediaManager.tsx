import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { mediaService } from "../../services/media.service";
import api from "../../services/http";
import type { MediaPost } from "../../types/api";

const emptyPost = {
  title: "",
  summary: "",
  content: "",
  imageUrl: "",
  publishedAt: new Date().toISOString(),
};

function MediaManager() {
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [isUploading, setIsUploading] = useState(false);

  const loadPosts = async () => {
    const items = await mediaService.list();
    setPosts(items);
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingId) {
      await mediaService.update(editingId, form);
    } else {
      await mediaService.create(form);
    }
    setForm(emptyPost);
    setEditingId(null);
    await loadPosts();
  };

  const handleDelete = async (id: number) => {
    await mediaService.remove(id);
    await loadPosts();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload", formData, {
        params: { type: "media" },
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
      <h1 className="text-2xl font-semibold text-white">Manage Media Updates</h1>
      <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Summary" value={form.summary} onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))} required />
        
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

        <textarea className="h-32 rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Content" value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} required />
        <Button type="submit">{editingId ? "Update Post" : "Add Post"}</Button>
      </form>

      <div className="space-y-3">
        {posts.map((post) => (
          <article key={post.id} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <h3 className="text-lg text-white">{post.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{post.summary}</p>
            <div className="mt-4 flex gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setEditingId(post.id);
                  setForm({
                    title: post.title,
                    summary: post.summary,
                    content: post.content,
                    imageUrl: post.imageUrl,
                    publishedAt: post.publishedAt,
                  });
                }}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(post.id)}>
                Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default MediaManager;
