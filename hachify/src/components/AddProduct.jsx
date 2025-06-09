import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/Firebase'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: 'keychain',
    imageBase64: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required')
      return
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price')
      return
    }
    
    if (!formData.imageBase64) {
      setError('Product image is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await addDoc(collection(db, 'products'), {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        categories: formData.categories,
        imageBase64: formData.imageBase64,
        createdAt: new Date()
      })
      navigate('/')
    } catch (err) {
      console.error('Error adding product:', err)
      setError('Failed to add product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select a valid image file (JPEG, PNG, etc.)')
      return
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB')
      return
    }

    const reader = new FileReader()
    reader.onloadstart = () => setLoading(true)
    reader.onload = (upload) => {
      setFormData(prev => ({
        ...prev,
        imageBase64: upload.target.result
      }))
      setError(null)
    }
    reader.onerror = () => {
      setError('Failed to read image file')
      setLoading(false)
    }
    reader.onloadend = () => setLoading(false)
    reader.readAsDataURL(file)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <button 
          className="flex items-center cursor-pointer mb-6 text-indigo-600 hover:text-indigo-800 transition-colors"
          type='button'
          onClick={handleGoBack}
        >
          <FiArrowLeft size={18} />
          <span>Back to Products</span>
        </button>
      <div className="max-w-md mx-auto">
        

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">Add New Product</h1>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (₱) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  ₱
                </span>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="categories"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="keychain">Keychain</option>
                <option value="eyeglasses">Eye Glasses</option>
                <option value="sunglasses">Sun Glasses</option>
                <option value="tshirt">T-shirt</option>
                <option value="pants">Pants</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Product Image <span className="text-red-500">*</span>
              </label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500">
                Maximum file size: 2MB (JPEG, PNG)
              </p>
              
              {formData.imageBase64 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="flex justify-center">
                    <img 
                      src={formData.imageBase64} 
                      alt="Preview" 
                      className="max-h-48 object-contain border border-gray-200 rounded"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex justify-center items-center"
            >
            {loading ? (<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>) : 'Add Product'}
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct