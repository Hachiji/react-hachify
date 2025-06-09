import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Firebase'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [direction, setDirection] = useState(1);
    const [isAuth, setIsAuth] = useState(false);
    const [formToggle, setFormToggle] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && user) {
            if (user) {
                navigate('/', { replace: true });
            }
        }
    }, [user,loading,navigate])

    if(loading) {
        return (
            <div className="flex flex-grow justify-center items-center mt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    if (user) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (formToggle) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            setIsAuth(true);
            window.location.href = "/";
        } catch (err) {
            handleAuthError(err);
        } finally {
            setIsLoading(false);
        }

    };

    const handleAuthError = (err) => {
        console.error("Auth error:", err);
        switch (err.code) {
            case 'auth/email-already-in-use':
                setError('This email is already registered');
                break;
            case 'auth/user-not-found':
                setError('User not found. Please check your email or sign up');
                break;
            case 'auth/invalid-email':
                setError('Please enter a valid email address');
                break;
            case 'auth/weak-password':
                setError('Password should be at least 6 characters');
                break;
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                setError('Incorrect email or password');
                break;
            case 'auth/network-request-failed':
                setError('Network error - please check your connection');
                break;
            case 'auth/too-many-requests':
                setError('Account temporarily locked due to many failed attempts');
                break;
            default:
                setError(`Login failed: ${err.message || 'Please check your credentials'}`);
        }
    }

    const toggleAuthMode = () => {
        setDirection(prev => -prev);
        setFormToggle(!formToggle);
        setError('');
    }

    // Animation variants
    const formVariants = {
        initial: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20
            }
        },
        exit: (direction) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        })
    };

    return (
        <div className="max-w-md mx-auto h-screen p-4 overflow-hidden">
            <div className="relative h-[400px]">
                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        key={formToggle ? 'login' : 'signup'}
                        custom={direction}
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 border-indigo-500 border-2 p-6 rounded-2xl">
                            <h2 className="text-center text-4xl font-bold text-indigo-400">
                                {formToggle ? 'Login' : 'Sign Up'}
                            </h2>
                            {error && <p className='text-red-500 text-center'>{error}</p>}

                            <div className="flex flex-col justify-start space-y-3">
                                <label className="font-bold">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    placeholder='test@example.com'
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="username"
                                    className='border border-gray-300 rounded p-2 focus:border-indigo-500 focus:outline-none'
                                    required
                                />

                                <div className="flex flex-col relative space-y-3">
                                    <label className='font-bold'>Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        placeholder='Enter password here'
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="password"
                                        className='border border-gray-300 rounded p-2 pr-10 focus:border-indigo-500 focus:outline-none'
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-12 text-gray-500 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>

                                <div className="flex flex-col justify-center items-center space-y-3 mt-4">
                                    <button
                                        type='submit'
                                        disabled={isLoading}
                                        className={`bg-indigo-500 px-4 py-2 w-60 text-white font-bold rounded cursor-pointer hover:bg-indigo-600 transition-colors duration-300 ease-in-out ${isLoading ? 'opacity-70' : 'cursor-not-allowed'}`}
                                    >
                                        {formToggle ? 'Login' : 'Sign Up'}
                                    </button>

                                    <button
                                        type='button'
                                        className='text-indigo-500 text-sm font-medium hover:underline'
                                        onClick={toggleAuthMode}
                                    >
                                        {formToggle ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Auth;