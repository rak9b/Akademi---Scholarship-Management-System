import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddScholarship = () => {
  const [scholarshipData, setScholarshipData] = useState({
    title: '',
    description: '',
    amount: '',
    deadline: '',
    eligibility: '',
    requirements: []
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/scholarships`,
        data,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Scholarship Added Successfully',
        showConfirmButton: false,
        timer: 1500
      });
      setScholarshipData({
        title: '',
        description: '',
        amount: '',
        deadline: '',
        eligibility: '',
        requirements: []
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(scholarshipData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Form fields */}
    </form>
  );
};

export default AddScholarship;
