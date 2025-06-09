import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";

const App = () => {
  const Layout = ({ children }) => {
    const location = useLocation();
    const excludedPaths = ["/auth", "/profile", "/add-product"]
    const hideNavbar = excludedPaths.some(path => location.pathname.startsWith(path));

    const isHomePage = location.pathname === '/'

    return (
      <>
        <div className="min-h-screen flex flex-col">
          {!hideNavbar && <Navbar />}
          <main className={`flex-grow ${!hideNavbar && !isHomePage ? 'pt-16' : ''}`}>
            {children}
          </main>
          <footer className={`text-center h-auto p-2 bg-gray-800 text-white ${hideNavbar && !isHomePage ? 'hidden' : 'block'}`}>
            Doro Online Shop 2025
          </footer>
        </div>
      </>
    );
  };
  
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            {/* index */}
            <Route path="/" element={<Home />} />

            {/* products */}
            <Route path="/add-product" element={<AddProduct/>} />

            {/* authentication */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;