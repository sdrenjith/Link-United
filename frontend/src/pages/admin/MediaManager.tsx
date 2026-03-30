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
    if (!editingId && !form.imageUrl.trim()) {
      alert("Please upload an image before saving.");
      return;
    }
    try {
      if (editingId) {
        await mediaService.update(editingId, form);
      } else {
        await mediaService.create(form);
      }
      setForm(emptyPost);
      setEditingId(null);
      await loadPosts();
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { message?: string; errors?: { path: string; message: string }[] } } };
      const data = ax.response?.data;
      const detail =
        data?.errors?.map((e) => `${e.path}: ${e.message}`).join("\n") ||
        data?.message ||
        (err instanceof Error ? err.message : "Request failed");
      alert(detail);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyPost);
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
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Summary (optional)" value={form.summary} onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))} />
        
        {/* Image upload + preview (matches product-slider style: bordered frame) */}
        <div className="space-y-3 rounded border border-zinc-700 bg-zinc-950 p-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {isUploading ? (
              <span className="text-gold-400 text-xs font-medium animate-pulse">Uploading image...</span>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-zinc-400 w-full text-xs file:mr-3 file:rounded file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-zinc-300 hover:file:bg-zinc-700 file:cursor-pointer cursor-pointer"
              />
            )}
          </div>
          <p className="text-[11px] text-zinc-500">
            Image required for new posts. Title at least 5 characters. When editing, upload a new file to replace the image.
          </p>
          {form.imageUrl ? (
            <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-black/50">
              <img src={form.imageUrl} alt="Upload preview" className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-xl border border-dashed border-white/15 bg-zinc-900/80 text-xs text-zinc-500">
              No image selected — preview appears after upload
            </div>
          )}
        </div>

        <textarea className="h-32 rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Content (optional)" value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} />
        <div className="flex flex-wrap gap-2">
          <Button type="submit" className="min-w-[140px]">
            {editingId ? "Update Post" : "Add Post"}
          </Button>
          {editingId != null && (
            <Button type="button" variant="secondary" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="flex flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-3 sm:p-4">
            <div className="mb-3 w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 aspect-video">
              <img src={post.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <h3 className="text-base font-semibold leading-snug text-white line-clamp-2 sm:text-lg">{post.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-xs text-zinc-400 sm:text-sm">{post.summary}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-3">
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
