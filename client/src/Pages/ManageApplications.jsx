import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../api/axiosSecure';

export default function ManageApplications() {
  const [sort, setSort] = useState('-appliedDate');
  const [status, setStatus] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['apps-manage', sort, status],
    queryFn: async () => {
      const qs = new URLSearchParams();
      if (sort) qs.set('sort', sort);
      if (status) qs.set('status', status);
      const res = await axiosSecure.get(`/applications/manage?${qs.toString()}`);
      return res.data;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-3">
        <select className="border p-2" value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option value="-appliedDate">Applied date ↓</option>
          <option value="appliedDate">Applied date ↑</option>
          <option value="-deadline">Deadline ↓</option>
          <option value="deadline">Deadline ↑</option>
        </select>
        <select className="border p-2" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Applicant</th>
                <th className="p-2">Scholarship</th>
                <th className="p-2">Applied</th>
                <th className="p-2">Deadline</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((a) => (
                <tr key={a._id} className="border-b">
                  <td className="p-2">{a.user?.email}</td>
                  <td className="p-2">{a.scholarship?.name}</td>
                  <td className="p-2">{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">{a.scholarship?.deadline?.slice(0,10)}</td>
                  <td className="p-2 capitalize">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
