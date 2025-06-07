import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";

const App = () => {
  const Layout = ({ children }) => {
    const location = useLocation();
    const excludedPaths = ["/auth", "/profile"]
    const hideNavbar = excludedPaths.some(path => location.pathname.startsWith(path));

    return (
      <>
        {!hideNavbar && <Navbar />}
        <main className={`flex-1 ${!hideNavbar ? 'pt-16' : ''}`}></main>
        {children}
      </>
    );
  };
  
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;