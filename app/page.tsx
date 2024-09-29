"use client"
import React, { useState, useRef, useEffect } from 'react';
import CartIcon from './components/CartIcon';
import ProductShowcase from './components/CourseShowcase';
import { ShoppingCart, Search, Menu, ArrowDown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice:number;
  image: string;
  images: string[];
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone X Pro",
    price: 999.99,
    originalPrice: 2099.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Experience the future of communication with the Smartphone X Pro, featuring cutting-edge technology and a stunning design."
  },
  {
    id: 2,
    name: "Laptop Z Ultra",
    price: 1299.99,
    originalPrice: 2999.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "The Laptop Z Ultra combines performance and portability, perfect for professionals and students alike."
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 199.99,
    originalPrice: 499.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Immerse yourself in music with our Wireless Headphones, designed for comfort and superior sound quality."
  },
  {
    id: 4,
    name: "4K Action Camera",
    price: 399.99,
    originalPrice: 799.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Capture every adventure in stunning 4K resolution with our lightweight and durable Action Camera."
  },
  {
    id: 5,
    name: "Smartwatch Series 5",
    price: 249.99,
    originalPrice: 1099.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Stay connected and track your fitness goals with the Smartwatch Series 5, designed for your active lifestyle."
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 149.99,
    originalPrice: 599.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Take your music anywhere with our portable Bluetooth Speaker, offering exceptional sound quality and battery life."
  },
  {
    id: 7,
    name: "Gaming Mouse",
    price: 89.99,
    originalPrice: 199.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Enhance your gaming experience with our high-precision Gaming Mouse, designed for performance and comfort."
  },
  {
    id: 8,
    name: "Portable SSD 1TB",
    price: 109.99,
    originalPrice: 299.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Store your data securely and access it at lightning speed with our Portable SSD."
  },
  {
    id: 9,
    name: "Wireless Charger",
    price: 49.99,
    originalPrice: 299.99,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/product1-1.jpg"],
    description: "Charge your devices effortlessly with our sleek and efficient Wireless Charger."
  }

];


const Home: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 min-h-screen flex flex-col">
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-80' : 'bg-transparent'} backdrop-filter backdrop-blur-lg py-5`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1 
            className="text-white text-4xl font-bold italic"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            NeetPrep
          </motion.h1>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Courses', 'About', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-white hover:text-purple-300 transition-colors duration-300"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Search onClick={toggleSearch} className="text-white hover:text-purple-300 cursor-pointer transition-colors duration-300" />
            </motion.div>
            <motion.div
              ref={cartIconRef}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CartIcon itemCount={cartItems.length} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Menu className="text-white hover:text-purple-300 cursor-pointer transition-colors duration-300 md:hidden" />
            </motion.div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showSearch && (
          <motion.div 
            className="fixed top-20 left-0 w-full bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg py-4 px-4 z-40"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow mr-4 px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                onClick={toggleSearch}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col items-center pt-24">
        <motion.div 
          className="text-center pt-20 pb-12 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-white text-6xl font-extrabold mb-4 animate-pulse">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">TechNova</span>
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
            Discover cutting-edge technology that will transform your digital lifestyle.
          </p>
          <button 
            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold py-3 px-8 rounded-full hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Explore Now
          </button>
        </motion.div>

        <motion.div 
          className="w-full max-w-7xl px-4 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 opacity-25 rounded-lg shadow-2xl transform -rotate-2 scale-105 z-0"></div>
            <div className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8">
              <ProductShowcase products={mockProducts} onAddToCart={addToCart} cartIconRef={cartIconRef} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-white text-3xl font-bold mb-6">Why Choose NeetPrep?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Top Quality", description: "We offer the best Courses." },
              { icon: ShoppingCart, title: "Course Buy", description: "User-friendly interface for a smooth Education Content." },
              { icon: ArrowDown, title: "Best Prices", description: "Competitive prices and regular discounts on our Courses." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="text-purple-400 w-12 h-12 mx-auto mb-4" />
                <h4 className="text-white text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg py-8 mt-20">
  <div className="container mx-auto px-4 text-center">
    <p className="text-gray-300 mb-4">© 2024 NeetPrep. All rights reserved.</p>
    <p className="text-gray-400 mb-4">Explore our courses and resources</p>
    
    <div className="flex flex-wrap justify-center space-x-6">
      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Courses</a>
      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Resources</a>
      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a>
      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a>
      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Home;
