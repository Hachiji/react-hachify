import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-48 overflow-hidden">
        <img 
          className="absolute inset-0 h-full w-full object-cover" 
          src={product.image} 
          alt={product.name} 
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">${product.price}</span>
          <button 
            onClick={() => addToCart(product)}
            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard