"use client"
import React, { useState, useRef, useEffect } from 'react';
import CartIcon from './components/CartIcon';
import ProductShowcase from './components/CourseShowcase';
import { ShoppingCart, Search, Menu, ArrowDown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "NEET Biology Mastery",
    price: 499.99,
    originalPrice: 999.99,
    image: "/images/course3.jpg",
    images: ["/images/course3.jpg", "/images/course3.jpg"],
    description: "Master NEET Biology with our comprehensive course, covering all essential topics and concepts."
  },
  {
    id: 2,
    name: "JEE Physics Advanced",
    price: 599.99,
    originalPrice: 1199.99,
    image: "/images/course6.jpg",
    images: ["/images/course6.jpg", "/images/course6.jpg"],
    description: "Excel in JEE Physics with our advanced course, designed for in-depth understanding and problem-solving skills."
  },
  {
    id: 3,
    name: "NEET Chemistry Essentials",
    price: 399.99,
    originalPrice: 799.99,
    image: "/images/course1.jpg",
    images: ["/images/course1.jpg", "/images/course1.jpg"],
    description: "Get a strong foundation in NEET Chemistry with our essential course, focusing on key concepts and applications."
  },
  {
    id: 4,
    name: "JEE Mathematics Pro",
    price: 699.99,
    originalPrice: 1399.99,
    image: "/images/course4.jpg",
    images: ["/images/course4.jpg", "/images/course4.jpg"],
    description: "Achieve excellence in JEE Mathematics with our pro course, offering extensive practice and expert guidance."
  },
  {
    id: 5,
    name: "NEET Physics Fundamentals",
    price: 449.99,
    originalPrice: 899.99,
    image: "/images/course2.jpg",
    images: ["/images/course2.jpg", "/images/course2.jpg"],
    description: "Build a solid foundation in NEET Physics with our fundamentals course, perfect for beginners and intermediates."
  },
  {
    id: 6,
    name: "JEE Chemistry Masterclass",
    price: 549.99,
    originalPrice: 1099.99,
    image: "/images/course5.jpg",
    images: ["/images/course5.jpg", "/images/course5.jpg"],
    description: "Master JEE Chemistry with our masterclass, featuring detailed explanations and advanced problem-solving techniques."
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
    <div className="bg-green-800 min-h-screen flex flex-col">
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
          Welcome to <span className="bg-clip-text text-transparent bg-yellow-500">NeetPrep</span>
        </h2>
        <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
          Discover Courses to boost your Neet Preperation.
        </p>
        <button 
          className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
          <div className="absolute inset-0 bg-yellow-500 opacity-25 rounded-lg shadow-2xl transform -rotate-2 scale-105 z-0"></div>
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
            { icon: ShoppingCart, title: "Buy Courses", description: "User-friendly interface for a smooth Neet Content." },
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