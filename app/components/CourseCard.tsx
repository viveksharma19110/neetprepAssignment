import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Product {
  id: number;
  images: string[];
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  image?: string; // Optional if not always needed
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}



const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      className="bg-gray-900 text-white rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out overflow-hidden cursor-pointer my-5 mx-2 hover:scale-[1.02] hover:shadow-xl will-change-transform"
      onClick={onClick}
      layout
    >
      <div className="p-4 flex justify-center">
        {/* Image Container */}
        <div className="w-full h-48 relative overflow-hidden rounded-lg">
          <Image
            src={product.image || product.images[0]} // Use default image if available
            alt={product.name}
            layout="fill"
            objectFit="contain" // Ensures the whole image is visible without being cropped
            className="rounded-lg" // Apply rounded corners
          />
        </div>
      </div>

      <div className="p-4 text-center">
        <h2 className="text-xl font-bold hover:text-blue-400 transition-colors duration-300">{product.name}</h2>
        <div className="flex justify-center items-center mt-2">
          <p className="text-lg font-semibold text-blue-400 mr-2">₹{product.price}</p>
          <p className="text-gray-400 line-through">₹{product.originalPrice}</p>
          <p className="ml-3 bg-green-500 text-white px-2 py-1 text-sm rounded-md">{discountPercentage}% off</p>
        </div>
        {/* <p className="mt-2 text-gray-300 text-sm">{product.description}</p> */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300 w-full">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
