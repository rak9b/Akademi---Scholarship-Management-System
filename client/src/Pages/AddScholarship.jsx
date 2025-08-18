import { useForm } from 'react-hook-form';
import axiosSecure from '../api/axiosSecure';
import { toast } from 'react-hot-toast';

export default function AddScholarship() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      fd.append('image', data.image[0]);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
        method: 'POST', body: fd
      });
      const json = await res.json();
      const imageUrl = json?.data?.url;
      if (!imageUrl) return toast.error('Image upload failed');

      await axiosSecure.post('/scholarships', {
        name: data.name,
        university: data.university,
        degree: data.degree,
        subject: data.subject, // Agriculture/Engineering/Doctor
        category: data.category, // Full fund/Partial/Self-fund
        fee: Number(data.fee),
        deadline: data.deadline,
        image: imageUrl
      });
      toast.success('Scholarship added');
      reset();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to add scholarship');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-3">
      <input className="border p-2 w-full" placeholder="Scholarship name" {...register('name', { required: true })} />
      <input className="border p-2 w-full" placeholder="University" {...register('university', { required: true })} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select className="border p-2" {...register('subject', { required: true })}>
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="Doctor">Doctor</option>
        </select>
        <select className="border p-2" {...register('category', { required: true })}>
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>
        <select className="border p-2" {...register('degree', { required: true })}>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input className="border p-2" type="number" placeholder="Fee" {...register('fee', { required: true, min: 0 })} />
        <input className="border p-2" type="date" {...register('deadline', { required: true })} />
        <input className="border p-2" type="file" accept="image/*" {...register('image', { required: true })} />
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded">Add Scholarship</button>
    </form>
  );
}
