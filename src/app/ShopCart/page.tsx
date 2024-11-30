"use client";

import React from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "@/Context/CartContext"; // Import the cart context
import Link from "next/link"; // Import Link for navigation

const products = [
  {
    id: 1,
    title: "Football",
    price: 29.99,
    image: "/images/football.png",
  },
  {
    id: 2,
    title: "Adidas Predator Elite",
    price: 279.99,
    image: "/images/footballboot.png",
  },
  {
    id: 3,
    title: "Jersey",
    price: 50,
    image: "/images/realmadrid.png",
  },
  {
    id: 4,
    title: "Nike Shin Pad",
    price: 8,
    image: "/images/ShinPad.png",
  },
  {
    id: 7,
    title: "Gloves",
    price: 29.99,
    image: "/images/gloves.png",
  },
];

const Shop: React.FC = () => {
  const { addToCart } = useCart(); // Destructure the addToCart function from cart context

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Shop for Football Equipment
      </h1>

      {/* Link to Cart Page */}
      <Link href="/Cart">
        <span className="text-white underline mb-4 inline-block rounded-xl border  bg-blue-600 px-4 py-2 hover:opacity-50 ">
          View Cart
        </span>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            onAddToCart={() =>
              addToCart({
                ...product,
                quantity: 1, // Add a default quantity of 1
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
