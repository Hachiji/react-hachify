import { createContext, useContext, useEffect, useState } from 'react'
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { auth, db } from '../config/Firebase'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchCart(user.uid)
      } else {
        setCart([])
        setLoading(false)
      }
    })
    return unsubscribe;
  }, [])

  const fetchCart = async (userId) => {
    try {
      const cartRef = doc(db, 'carts', userId)
      const cartSnap = await getDoc(cartRef)
      
      if (cartSnap.exists()) {
        setCart(cartSnap.data().items || [])
      } else {
        await setDoc(cartRef, { items: [] })
        setCart([])
      }
    } catch (error) {
      console.error("Error fetching cart: ", error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product) => {
    if (!auth.currentUser) return
    
    try {
      const cartRef = doc(db, 'carts', auth.currentUser.uid)
      await updateDoc(cartRef, {
        items: arrayUnion({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      })
      setCart(prev => [...prev, { ...product, quantity: 1 }])
    } catch (error) {
      console.error("Error adding to cart: ", error)
    }
  }

  const removeFromCart = async (productId) => {
    if (!auth.currentUser) return
    
    try {
      const cartRef = doc(db, 'carts', auth.currentUser.uid)
      const itemToRemove = cart.find(item => item.id === productId)
      
      if (itemToRemove) {
        await updateDoc(cartRef, {
          items: arrayRemove(itemToRemove)
        })
        setCart(prev => prev.filter(item => item.id !== productId))
      }
    } catch (error) {
      console.error("Error removing from cart: ", error)
    }
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)