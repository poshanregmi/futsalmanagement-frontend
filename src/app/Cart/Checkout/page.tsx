// // pages/checkout.tsx
// import React from "react";
// import { useCart } from "@/Context/CartContext"; // Ensure the path is correct
// import Image from "next/image"; // Use Next.js Image component
// import { CartItem } from "@/Context/CartContext"; // Import CartItem type

// const Checkout: React.FC = () => {
//   const { cartItems } = useCart(); // Access the cart items

//   const handlePayment = () => {
//     // Handle payment logic here (e.g., Stripe, PayPal, etc.)
//     alert("Payment successful!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-4xl font-bold text-blue-600 mb-4">Checkout</h1>

//       {cartItems.length === 0 ? (
//         <p>
//           Your cart is empty. Please add items to your cart before proceeding.
//         </p>
//       ) : (
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {cartItems.map((item: CartItem) => (
//               <div
//                 key={item.id}
//                 className="border rounded-lg p-4 shadow-md m-4"
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   width={500} // Adjust width and height
//                   height={300}
//                   className="w-full h-48 object-cover rounded"
//                 />
//                 <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
//                 <p className="text-gray-700">${item.price.toFixed(2)}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4">
//             <h3 className="text-xl font-bold">
//               Total: $
//               {cartItems
//                 .reduce(
//                   (total: number, item: CartItem) =>
//                     total + item.price * item.quantity,
//                   0
//                 )
//                 .toFixed(2)}
//             </h3>
//             <form onSubmit={handlePayment} className="mt-4">
//               {/* Add payment form fields here (e.g., card number, expiry date, etc.) */}
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md"
//               >
//                 Pay Now
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;
