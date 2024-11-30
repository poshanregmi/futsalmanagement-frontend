// // pages/_app.tsx
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import type { AppProps } from "next/app";
// import "../styles/globals.css"; // Add any global CSS if needed

// function MyApp({ Component, pageProps }: AppProps) {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check authentication state, e.g., from localStorage
//     const loggedInStatus = localStorage.getItem("isAuthenticated");
//     setIsAuthenticated(loggedInStatus === "true");

//     // Redirect to login if not authenticated and trying to access dashboard
//     if (!isAuthenticated && router.pathname === "/dashboard") {
//       router.push("/login");
//     }
//   }, [isAuthenticated, router]);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     localStorage.setItem("isAuthenticated", "true");
//     router.push("/dashboard");
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated");
//     router.push("/login");
//   };

//   return (
//     <Component
//       {...pageProps}
//       onLogin={handleLogin}
//       onLogout={handleLogout}
//       isAuthenticated={isAuthenticated}
//     />
//   );
// }

// export default MyApp;
