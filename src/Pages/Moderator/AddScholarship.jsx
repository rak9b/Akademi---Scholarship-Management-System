import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider'; // Adjust path as needed
import Swal from 'sweetalert2';

const AddScholarship = () => {
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const today = new Date();
        const deadline = new Date(data.applicationDeadline);
        if (today > deadline) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'Please select a valid future date for the deadline.',
            });
            return;
        }

        const imageFile = new FormData();
        imageFile.append('image', formData.get('universityImage'));

        const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
        if (!imgbbKey) {
            Swal.fire({
                icon: 'error',
                title: 'Configuration Error',
                text: 'ImgBB API key is missing. Please check environment variables.',
            });
            return;
        }

        try {
            const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
                method: 'POST',
                body: imageFile,
            });
            const imgData = await imgRes.json();
            if (!imgData.success) {
                throw new Error('Image upload failed');
            }

            const month = today.toLocaleString('default', { month: 'long' });
            const day = today.getDate();
            const year = today.getFullYear();
            const postDate = `${month} ${day}, ${year}`;

            const newData = {
                ...data,
                applicationFees: parseInt(data.applicationFees),
                serviceCharge: parseInt(data.serviceCharge),
                tuitionFees: parseInt(data.tuitionFees),
                universityImage: imgData.data.url,
                universityWorldRank: parseInt(data.universityWorldRank),
                scholarshipPostDate: postDate,
                postedUserEmail: user.email
            };

            const token = localStorage.getItem('jwt-token'); // Assuming JWT is stored in localStorage
            const res = await fetch('http://localhost:5000/api/scholarships', { // Adjust URL to your backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            });

            if (!res.ok) {
                throw new Error('Failed to add scholarship');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Scholarship added successfully!',
            });
            e.target.reset();
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message || 'An error occurred. Please try again.',
            });
        }
    };

    return (
        <section className='bg-[#f2f8f1] h-full py-5 md:py-14'>
            <div className='max-w-screen-lg mx-auto'>
                <form onSubmit={handleSubmit} className='flex gap-5 flex-col justify-center'>
                    <div className='grid justify-center items-center md:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {/* Similar structure as existing, with fields */}
                        <div className='flex mx-auto max-w-max flex-col gap-5'>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Scholarship Name</span>
                                </div>
                                <input required name='scholarshipName' type="text" placeholder="Type here" className="input input-bordered w-[300px]" />
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">University Name</span>
                                </div>
                                <input name='universityName' required type="text" placeholder="Type here" className="input input-bordered w-[300px]" />
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">University Image</span>
                                </div>
                                <input name='universityImage' required type="file" className="input py-2 input-bordered w-[300px]" />
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">University Country</span>
                                </div>
                                <input name='universityCountry' required type="text" placeholder="Type here" className="input input-bordered w-[300px]" />
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">University City</span>
                                </div>
                                <input name='universityCity' required type="text" placeholder="Type here" className="input input-bordered w-[300px]" />
                            </label>
                        </div>
                        <div className='flex mx-auto max-w-max flex-col gap-5'>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Subject Category</span>
                                </div>
                                <select defaultValue={'none'} className='input input-bordered' name="subjectCategory" required>
                                    <option disabled value="none">Select One</option>
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Doctor">Doctor</option>
                                </select>
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Scholarship Category</span>
                                </div>
                                <select defaultValue={'none'} className='input input-bordered' name="scholarshipCategory" required>
                                    <option disabled value="none">Select One</option>
                                    <option value="Full fund">Full fund</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Self-fund">Self-fund</option>
                                </select>
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Degree</span>
                                </div>
                                <select defaultValue={'none'} className='input input-bordered' name="degree" required>
                                    <option disabled value="none">Select One</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Masters">Masters</option>
                                </select>
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Tuition Fees</span>
                                </div>
                                <input name='tuitionFees' required type="number" placeholder="Type here" className="input input-bordered w-[300px]" />
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Application Fees</span>
                                </div>
                                <input name='applicationFees' required type="number" placeholder="Type here" className="input input-bordered w-[300px]" />
                            </label>
                        </div>
                        <div className='flex mx-auto max-w-max flex-col gap-5'>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Service Charge</span>
                                </div>
                                <input name='serviceCharge' required type="number" placeholder="Type here" className="input input-bordered w-[300px]" />
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Application Deadline</span>
                                </div>
                                <input name='applicationDeadline' required type="date" className="input input-bordered w-[300px]" />
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">University World Rank</span>
                                </div>
                                <input name='universityWorldRank' required type="number" placeholder="Type here" className="input input-bordered w-[300px]" />
                            </label>
                            <label className="form-control w-[300px]">
                                <div className="label max-w-max">
                                    <span className="label-text">Description</span>
                                </div>
                                <textarea placeholder='Write a description' name="description" className="input p-2 input-bordered w-[300px] h-40" required></textarea>
                            </label>
                        </div>
                    </div>
                    <div className='flex pt-4 justify-center'>
                        <button type="submit" className="btn transition duration-300 hover:bg-[#7CFF77] hover:text-[#14452F] bg-[#185137] text-white px-7">Add Scholarship</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddScholarship;