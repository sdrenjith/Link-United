import { useEffect, useState } from "react";
import { enquiriesService } from "../../services/enquiries.service";
import type { Enquiry } from "../../types/api";

function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await enquiriesService.list();
      setEnquiries(data);
    };
    void load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Enquiries</h1>
      <p className="mt-2 text-sm text-zinc-300">Recent incoming corporate requests.</p>
      <div className="mt-5 space-y-3">
        {enquiries.map((item) => (
          <article key={item.id} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h3 className="text-lg text-white">{item.name}</h3>
                <p className="text-sm text-zinc-300">{item.company}</p>
                <p className="text-sm text-zinc-400">
                  {item.email} • {item.phone}
                </p>
              </div>
              <p className="text-xs uppercase tracking-wide text-amber-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="mt-3 text-zinc-300">{item.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default EnquiriesPage;
