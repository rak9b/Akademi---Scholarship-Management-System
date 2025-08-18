import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthProvider';
import useRole from '../../../../Hooks/useRole';

import Footer from '../../../../Components/Footer';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { role } = useRole();

    return (
        <section className='bg-[#f2f8f1] h-full py-14'>
            <div className="mx-auto max-w-screen-lg">
                <h2 className="text-3xl font-bold text-center mb-8">My Profile</h2>
                <div className="card w-full max-w-md mx-auto bg-white shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={user?.photoURL || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} alt="Profile" className="rounded-xl w-32 h-32 object-cover" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-2xl">{user?.displayName}</h2>
                        <p className="text-lg">Email: {user?.email}</p>
                        <p className="text-lg">Role: {role}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Profile;