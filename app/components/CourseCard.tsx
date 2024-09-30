import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '../page';
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <motion.div
      className="bg-green-800 text-white rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out overflow-hidden cursor-pointer my-5 mx-2 hover:scale-[1.02] hover:shadow-xl will-change-transform"
      onClick={onClick}
      layout
    >
      <div className="p-4 flex justify-center">
        <div className="w-full h-48 relative overflow-hidden rounded-lg">
          <Image
            src={product.image || product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="p-4 text-center">
        <h2 className="text-xl font-bold hover:text-blue-400 transition-colors duration-300">{product.name}</h2>
        <div className="flex justify-center items-center mt-2">
          <p className="text-lg font-semibold text-blue-400 mr-2">₹{product.price}</p>
          <p className="text-gray-400 line-through">₹{product.originalPrice}</p>
          {/* <p className="ml-3 bg-green-500 text-white px-2 py-1 text-sm rounded-md">{product.discount}% off</p> */}
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300 w-full">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;