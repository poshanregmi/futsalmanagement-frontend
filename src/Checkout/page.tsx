// import React from "react";
// import { useCart } from "@/Context/CartContext"; // Adjust the path to your CartContext
// import { loadStripe } from "@stripe/stripe-js"; // Load Stripe.js
// import Image from "next/image"; // Import Image from next/image

// // Set your Stripe publishable key here
// const stripePromise = loadStripe("your-publishable-key");

// const Checkout: React.FC = () => {
//   const { cartItems } = useCart();

//   const handlePayment = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (cartItems.length === 0) return;

//     try {
//       // Make a request to your backend to create a payment session
//       const response = await fetch("/api/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cartItems,
//         }),
//       });

//       const session = await response.json();

//       const stripe = await stripePromise;

//       // Redirect to Stripe Checkout
//       const { error } = await stripe!.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (error) {
//         console.error("Stripe Checkout Error: ", error);
//         alert("Payment failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during payment process: ", error);
//       alert("An error occurred. Please try again later.");
//     }
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
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="border rounded-lg p-4 shadow-md m-4"
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   width={500} // Adjust to desired width
//                   height={300} // Adjust to desired height
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
//                 .reduce((total, item) => total + item.price * item.quantity, 0)
//                 .toFixed(2)}
//             </h3>
//             <form onSubmit={handlePayment} className="mt-4">
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
