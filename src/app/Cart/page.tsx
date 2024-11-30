"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/Context/CartContext"; // Import the cart context

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart(); // Access cartItems, removeFromCart, and clearCart from context
  const [loading, setLoading] = useState(false);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Send cart items to your checkout API endpoint
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cartItems }), // Send cart items to the backend
      });

      if (!response.ok) {
        // Handle non-200 status codes (e.g., 400, 500 errors)
        throw new Error(`Failed to create session, status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.id) {
        throw new Error("Session ID not returned");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe initialization failed");
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) {
        console.error("Stripe Checkout Error:", error.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during payment:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 border-b"
            >
              <div>
                <h2 className="font-semibold">{product.title}</h2>
                <p>
                  ${product.price} x {product.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-white rounded-xl px-4 py-2 bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-xl font-bold mt-4">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button
            onClick={handlePayment}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md mt-6 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
          <button
            onClick={clearCart}
            className="bg-gray-600 text-white px-4 py-2 rounded-md mt-4"
          >
            Clear Cart
          </button>
        </div>
      ) : (
        <p className="text-2xl text-red-800 font-bold">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;

// "use client";

// import React from "react";
// import { useCart } from "@/Context/CartContext"; // Adjust path if needed
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51QJ9zkJJJHcRc6NNHhY4LEaDvwQ5ITZkpXbpNfw7Ow9W0AHoPSTmZ6EM7vefvecWg6q92GMeebf9ynCF5RJB722f00LHz5vGSz"
// );

// const Cart: React.FC = () => {
//   const { cartItems, removeFromCart } = useCart();

//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const makePayment = async () => {
//     const stripe = await stripePromise;
//     console.log(makePayment);

//     if (!stripe) {
//       console.error("Stripe failed to load.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cartItems }),
//       });

//       if (!response.ok) {
//         console.error(
//           "Error creating checkout session:",
//           await response.text()
//         );
//         return;
//       }

//       const session = await response.json();

//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         console.error(
//           "Error in redirecting to checkout:",
//           result.error.message
//         );
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-4xl font-bold text-blue-600 mb-4">Your Cart</h1>
//       {cartItems.length > 0 ? (
//         <div>
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between p-4 border-b"
//             >
//               <div>
//                 <h2 className="font-semibold">{item.title}</h2>
//                 <p>
//                   ${item.price} x {item.quantity}
//                 </p>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-white rounded-xl px-4 py-2 bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <div className="text-xl font-bold mt-4">
//             Total: ${total.toFixed(2)}
//           </div>
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded-md mt-6"
//             onClick={makePayment}
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       ) : (
//         <p className="text-2xl text-red-800 font-bold">Your cart is empty</p>
//       )}
//     </div>
//   );
// };

// export default Cart;
