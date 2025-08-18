import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function AllScholarships() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['scholarships', page, sort],
    queryFn: async () => {
      const qs = new URLSearchParams({ page, limit: 9 });
      if (sort) qs.set('sort', sort); // fee or -fee
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/scholarships?${qs.toString()}`);
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Scholarships</h1>
        <select className="border rounded px-2 py-1" value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="fee">Price: Low to High</option>
          <option value="-fee">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.map((s) => (
          <div key={s._id} className="rounded-card border bg-white dark:bg-gray-900 h-[320px] flex flex-col">
            <div className="h-40 w-full overflow-hidden rounded-t-card bg-gray-100">
              <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-3 flex-1">
              <h3 className="font-semibold line-clamp-1">{s.name}</h3>
              <p className="text-sm text-neutral">{s.university}</p>
              <p className="text-sm">Fee: {s.fee}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <button className="px-3 py-1 border rounded" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span>Page {data?.page}</span>
        <button className="px-3 py-1 border rounded"
                disabled={data && (data.page*data.limit)>=data.total}
                onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  );
}
