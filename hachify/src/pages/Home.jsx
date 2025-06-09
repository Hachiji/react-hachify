import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../config/Firebase'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

import { Link } from 'react-router-dom'

import { SiGmail, SiFacebook, SiGithub, } from 'react-icons/si'
import { FiPhone } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { cart } = useCart()
  const [user] = useAuthState(auth)

  useEffect(() => {
    const productsCollection = collection(db, 'products')
    const unsubscribe = onSnapshot(productsCollection, 
      (querySnapshot) => {
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProducts(productsData)
        setLoading(false)
      }, 
      (err) => {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-grow justify-center items-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }


  return (
    <div className="container mx-auto px-4 py-4">
      {/* hero section */}
      <section id="hero">
        <img 
          src="src/img/doro-bg.png" 
          alt="hero doro picture" 
          className="w-screen h-auto mb-20" 
          id="heroImages" 
        />
      </section>

      {/* product section */}
      <section 
        className='h-auto w-auto md:h-screen md:w-screen'
        id="product">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Products</h1>
          {user?.email === "doro-chan@gmail.com" && (
            <Link 
              to="/add-product"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Add Product
            </Link>
          )}
          
        </div>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Products Available</h2>
                <p className="text-gray-500">We haven't added any products yet. Check back soon!</p>
              </div>
            ) : (
              <div className="justify-start items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
      </section>

      {/* about section */}
      <section 
        className='h-auto w-auto md:h-screen md:w-screen'
        id="about">
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl mt-10 md:text-6xl md:mb-25">ABOUT US</h1>
            <div className="flex flex-col justify-center items-center md:space-x-15 md:flex-row md:justify-center md:items-center">
                <img 
                    src="src/img/doro-bg.png" 
                    alt="doro" 
                    className="size-52 w-100 my-10 " 
                />
                <div className="flex flex-col w-100 indent-3 space-y-5  md:justify-center md:items-center">
                    <p className="text-base/6 text-justify text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quidem placeat beatae, itaque sapiente aspernatur.</p>
                    <p className="text-base/6 text-justify text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. At tempora ducimus magni! Quos dolores quo deserunt nostrum sint, molestias, culpa deleniti ad blanditiis, qui sit aliquam officiis sequi modi ea?</p>
                </div>
            </div>
        </div>
      </section>

      {/* contact section */}
      <section 
        className='mb-20' 
        id="contact">
        <div className="flex flex-col justify-center items-center">
                    <h1 className="text-rose-400 text-3xl md:text-5xl mb-5 md:mb-10">CONTACT US</h1>
                    <div className="flex gap-6 justify-center items-center">
                        <a 
                            href="https://github.com/Hachiji" 
                            className="hover:wiggle-10 hover:scale-150 transition-all duration-300 ease-in-out" 
                            target='_blank'
                        >
                            <SiGithub size={30} color='#181717'/>
                        </a>
        
                        <a 
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=marloujerezon.anhs@gmail.com&su=Inquire" 
                            className="hover:wiggle-10 hover:scale-150 transition-all duration-300 ease-in-out" 
                            target='_blank'
                        >
                            <SiGmail size={30} color='#EA4335'/>
                        </a>
        
                        <a 
                        href="https://web.facebook.com/mjjerezon" 
                        className="hover:wiggle-10 hover:scale-150 transition-all duration-300 ease-in-out" 
                        target='_blank'
                        >
                            <SiFacebook size={30} color='#1877F2'/>
                        </a>
                    </div>
                        <div className="flex justify-center items-center gap-3 mt-5 md:mt-10">
                            <FiPhone size={30} color='#000'/><span className='text-gray-500 hover:underline hover:underline-offset-2 transition-all duration-200 ease-in-out'>+639398331682</span>
                        </div>
                </div>
      </section>
      
    </div>
  )
}

export default Home