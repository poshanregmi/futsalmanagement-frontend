import React, { useState } from "react";
import Image from "next/image";

// Define the props for ProductCard without id
interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  onAddToCart: () => void; // Function to handle the "Add to Cart" action
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  onAddToCart,
}) => {
  const [message, setMessage] = useState<string>("");

  const handleAddToCart = () => {
    onAddToCart(); // Call the passed-in onAddToCart function
    setMessage("Item added to cart!"); // Show the message
  };

  return (
    <div className="border rounded-lg p-4 shadow-md m-4">
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-700">${price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart} // Trigger the handleAddToCart function when clicked
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add to Cart
      </button>

      {/* Show the message if it's set */}
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default ProductCard;
