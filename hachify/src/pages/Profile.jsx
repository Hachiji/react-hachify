import { useEffect } from 'react';
import { auth } from '../config/Firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiArrowLeft } from 'react-icons/fi';


const Profile = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return  (
            <div className="flex flex-grow justify-center items-center mt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    if (!user) {
        return null;
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div className="w-screen">
            <button 
                onClick={handleGoBack}
                className="flex items-center justify-start cursor-pointer ml-5 mt-5 text-indigo-600 hover:text-indigo-800 mr-2"
            >
                <FiArrowLeft className="mr-1" /> Back
            </button>

            <div className="max-w-md mx-auto p-4">
                <div className="flex items-center mb-4">
                    
                </div>
                <h1 className="text-2xl md:text-4xl font-bold my-4 text-center text-rose-400">PROFILE</h1>
                <div className="bg-white p-6 rounded-lg shadow-md border-1 border-indigo-100">
                    <div className="flex justify-center items-center">
                        {user?.email === "doro-chan@gmail.com" ? (
                            <img 
                                src="src/img/doro-icon.png" 
                                alt="doro profile picture" 
                                className="rounded-full mb-7 size-60"
                            />
                        ) : (
                            <FiUser className='text-amber-300 bg-indigo-300 rounded-b-full rounded-t-3xl size-25 my-10'></FiUser>
                        )}
                    </div>
                    <hr className='mb-5 text-indigo-900'/>
                    <div className="mb-5">
                        <p className="font-semibold">Email:</p>
                        <p className='text-gray-500'>{user.email}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-600 transition-colors"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile