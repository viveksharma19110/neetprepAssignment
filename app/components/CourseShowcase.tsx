"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './CourseCard';
import ProductDetail from './CourseDetail';
import Image from 'next/image';
import { Product } from '../page';

interface ProductShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  cartIconRef: React.RefObject<HTMLDivElement>;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, onAddToCart, cartIconRef }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [flyingImage, setFlyingImage] = useState<{ product: Product; position: { x: number; y: number } } | null>(null);

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product: Product) => {
    onAddToCart(product);

    const addToCartButton = document.querySelector(`button[data-product-id="${product.id}"]`);
    if (addToCartButton) {
      const buttonRect = addToCartButton.getBoundingClientRect();
      const buttonPosition = {
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2
      };

      setFlyingImage({ product, position: buttonPosition });
      setTimeout(() => setFlyingImage(null), 1000);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product: Product) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            <ProductCard product={product} onClick={() => openProductDetail(product)} />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={closeProductDetail}
            onAddToCart={() => {
              addToCart(selectedProduct);
              closeProductDetail();
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flyingImage && cartIconRef.current && (
          <motion.div
            className="fixed w-16 h-16 z-50 pointer-events-none"
            initial={{ x: flyingImage.position.x - 32, y: flyingImage.position.y - 32, opacity: 0.8, scale: 1 }}
            animate={{ 
              x: cartIconRef.current.getBoundingClientRect().left + cartIconRef.current.getBoundingClientRect().width / 2 - 32,
              y: cartIconRef.current.getBoundingClientRect().top + cartIconRef.current.getBoundingClientRect().height / 2 - 32,
              opacity: 0,
              scale: 0.5
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image src={flyingImage.product.image || flyingImage.product.images[0]} alt={flyingImage.product.name} layout="fill" objectFit="contain" className="rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductShowcase;