import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';

const ManageScholarships = () => {
  const [sortBy, setSortBy] = useState('deadline');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ['moderatorScholarships', sortBy, filterStatus],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/scholarships/manage?sort=${sortBy}&status=${filterStatus}`
      );
      return res.data;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-6">
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered"
        >
          <option value="deadline">Deadline</option>
          <option value="amount">Amount</option>
          <option value="applications">Applications</option>
        </select>
        
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Scholarship list table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table content */}
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
