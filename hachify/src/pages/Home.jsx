import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/Firebase'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'


const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  // const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const { cart } = useCart()
    
    // const handleLogout = async () => {
    //     try {
    //         console.log("Attempting sign out...");
    //         await signOut(auth);
    //         window.location.href="/auth"
    //         console.log("Sign out successful");
    //     } catch (err) {
    //         console.error("Sign out error:", err);
    //         setError(`Logout failed: ${err.message}`);

    //     }
    // }

    // const auth = getAuth();
    // const user = auth.currentUser;

    // if (user) {
    //     user.getIdToken().then((idToken) => {
    //         setToken(idToken)
    //     });
    // }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products')
        const querySnapshot = await getDocs(productsCollection)
        
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-8">Our Products</h1> */}

      {/* { token ? (<button
            onClick={handleLogout}
            className="bg-rose-500 px-4 py-2 text-white font-bold cursor-pointer rounded hover:bg-rose-600 transition-colors"
        >
            Logout
        </button>):<div></div>
        } */}
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Products Available</h2>
          <p className="text-gray-500">We haven't added any products yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home