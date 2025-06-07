import { auth } from '../config/Firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiArrowLeft } from 'react-icons/fi'


const Profile = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    if(!user) {
        navigate('/auth')
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
                <h1 className="text-2xl font-bold my-4 text-center text-rose-400">PROFILE</h1>
                <div className="bg-white p-6 rounded-lg shadow-md border-1 border-indigo-100">
                    <div className="flex justify-center items-center">
                        <FiUser className='text-amber-300 bg-indigo-300 rounded-b-full rounded-t-3xl size-25 my-10'></FiUser>
                    </div>
                    <hr className='mb-10 text-indigo-900'/>
                    <div className="mb-4">
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