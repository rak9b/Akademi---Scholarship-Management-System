import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axiosSecure from '../api/axiosSecure';
import { toast } from 'react-hot-toast';

export default function Payment() {
  const { scholarshipId } = useParams();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      date: new Date().toISOString().slice(0,10),
      scholarshipId
    }
  });

  const onSubmit = async (data) => {
    try {
      // Placeholder: record intent or application with pre-form data as needed
      await axiosSecure.post('/applications', { scholarshipId });
      toast.success('Pre-payment form submitted');
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Payment pre-form failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-md">
      <input className="border p-2 w-full" placeholder="Your name" {...register('userName', { required: true })} />
      <input className="border p-2 w-full" type="email" placeholder="Your email" {...register('userEmail', { required: true })} />
      <input className="border p-2 w-full" placeholder="Your userId" {...register('userId', { required: true })} />
      <input className="border p-2 w-full" value={scholarshipId} readOnly {...register('scholarshipId')} />
      <input className="border p-2 w-full" type="date" {...register('date')} />
      <button className="bg-accent text-white px-4 py-2 rounded">Proceed to pay</button>
    </form>
  );
}
