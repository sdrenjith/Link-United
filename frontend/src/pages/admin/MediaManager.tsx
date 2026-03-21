import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { mediaService } from "../../services/media.service";
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Manage Media Updates</h1>
      <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Summary" value={form.summary} onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))} />
        <input className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))} />
        <textarea className="h-32 rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" placeholder="Content" value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} />
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
