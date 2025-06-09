import { useState, useEffect } from 'react';
import { FiShoppingCart, FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/Firebase';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [cartOpen, setCartOpen] = useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = false;

    const navigate = useNavigate()

    const [user] = useAuthState(auth);

    const getUsernameFromEmail = (email) => {
        return email?.split('@')[0] || '';
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const cartPanel = document.getElementById('cart-panel');
            const cartButton = document.getElementById('cart-button');
            
            if (cartOpen && cartPanel && !cartPanel.contains(event.target) && 
                !cartButton.contains(event.target)) {
                setCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [cartOpen]);

    return (
        <>
            <nav className="flex flex-col md:flex-row md:justify-between p-3 bg-gray-800 sticky top-0 z-50">
                <div className="flex items-center justify-between w-full">
                    <a 
                        className="cursor-pointer"
                        href="#hero"
                    >
                        <img 
                            src="src/img/doro-bg.png" 
                            alt="doro" 
                            className="w-30 h-10 rounded ml-2 md:ml-5" 
                        />
                    </a>
                    
                    <div className="relative mx-2 md:mx-4 flex-1 md:max-w-md">
                        <input 
                            type="text"
                            placeholder='Search Product'
                            className="w-full border-1 p-2 rounded bg-amber-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                        />
                        <FiSearch className="absolute right-3 top-3 text-gray-400 cursor-pointer"/>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden text-amber-300 p-2"
                            onClick={toggleMobileMenu}
                        >
                            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                        
                        <button 
                            id="cart-button"
                            onClick={toggleCart}
                            className="p-2 hover:text-rose-500 transition-all duration-200 md:hidden"
                        >
                            <FiShoppingCart className="size-6 text-amber-300 hover:text-rose-500 hover:animate-bounce"/>
                        </button>
                    </div>
                </div>

                <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-6 list-none text-amber-300 items-center mt-4 md:mt-0 mr-0 md:mr-5`}>
                    <li>
                        <a 
                            className={`block py-2 hover:text-rose-500 ${isActive ? 'text-rose-500 font-medium' : ''}`}
                            href="#product"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Product
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`block py-2 hover:text-rose-500 ${isActive ? 'text-rose-500 font-medium' : ''}`}
                            href="#about"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`block py-2 hover:text-rose-500 ${isActive ? 'text-rose-500 font-medium' : ''}`}
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </a>
                    </li>
                    <li className="w-full md:w-auto">
                        {user ? (
                            <div className="flex items-center min-w-0">
                                <button 
                                    onClick={() => {
                                        navigate('/profile');
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-indigo-500 rounded-md hover:bg-indigo-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
                                >
                                    <FiUser className="text-amber-300 flex-shrink-0" />
                                    <span className="truncate">{getUsernameFromEmail(user.email)}</span>
                                </button>
                            </div>
                        ) : (
                            <a 
                                className={`block px-4 py-2 bg-indigo-400 rounded-md hover:text-rose-400 hover:bg-indigo-500 text-center ${isActive ? 'bg-indigo-500' : ''}`} 
                                href="/auth"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </a>
                        )}
                    </li>
                    <li>
                        <button 
                            id="cart-button"
                            onClick={toggleCart}
                            className="p-2 cursor-pointer hover:text-rose-500 transition-all duration-200 hidden md:block"
                        >
                            <FiShoppingCart className="size-6 md:size-7 hover:animate-bounce"/>
                        </button>
                    </li>
                </div>
            </nav>

            {/* Slide-out Cart Panel */}
            <div 
                id="cart-panel"
                className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
                    cartOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ marginTop: '64px' }}
            >
                <div className="p-4 h-full flex flex-col">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                        <h2 className="text-amber-300 text-xl font-bold">Your Cart</h2>
                        <button 
                            onClick={toggleCart}
                            className="text-gray-400 hover:text-rose-500"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto py-4">
                        {/* Cart items here */}
                        <div className="text-center text-gray-400 py-10">
                            <p>Your cart is empty</p>
                            <p className="text-sm mt-2">Start shopping to add items</p>
                        </div>
                    </div>
                    
                    <div className="border-y border-gray-700 pt-4">
                        <div className="flex justify-between text-amber-300 mb-4">
                            <span>Total:</span>
                            <span>₱0.00</span>
                        </div>
                        <button 
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition-colors"
                            onClick={() => {
                                navigate('/checkout');
                                setCartOpen(false);
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay when cart is open */}
            {cartOpen && (
                <div 
                    className="fixed inset-0 bg-opacity-50 z-30"
                    onClick={toggleCart}
                />
            )}
        </>
    );
};

export default Navbar;