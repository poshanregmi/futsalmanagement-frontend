import React from "react";
import { CartProvider } from "@/Context/CartContext"; // Import CartContext for managing cart state
import { AppProps } from "next/app"; // Import AppProps from Next.js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ToastContainer />

      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
};

export default App;
