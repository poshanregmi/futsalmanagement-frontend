"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);
  console.log(isAuthenticated);

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <nav className="w-full bg-blue-600 p-4 shadow-md">
        <ul className="flex justify-center space-x-8 text-white font-semibold">
          <li>
            <Link href="/" className="hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Features" className="hover:text-blue-300">
              Services
            </Link>
          </li>
          <li>
            <Link href="/Contact" className="hover:text-blue-300">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/Aboutus" className="hover:text-blue-300">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/News" className="hover:text-blue-300">
              News
            </Link>
          </li>
          <li>
            <Link href="/ShopCart" className="hover:text-blue-300">
              Shop
            </Link>
          </li>
          {/* Remove Login and Signup links */}
          <li>
            <button
              onClick={handleLogout} // Call logout function on click
              className="hover:text-blue-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to the Futsal Management System
        </h1>
        <p className="text-gray-700 max-w-lg text-center mb-8">
          Manage and optimize your futsal operations effortlessly. Track games,
          manage bookings, and provide a seamless experience for players and
          staff.
        </p>

        <Link
          href="/Features"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
        >
          Explore Features
        </Link>
      </main>

      <footer className="w-full bg-blue-600 text-center py-4 text-white mt-8">
        <p>&copy; 2024 Futsal Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;

// "use client"; // Marking this file as a client component

// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/Context/AuthContext"; // Import useAuth hook
// import Link from "next/link"; // For navigation
// import { useRouter } from "next/navigation"; // For redirection
// import { toast, ToastContainer } from "react-toastify"; // Import Toastify for notifications
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// const Dashboard: React.FC = () => {
//   const { isAuthenticated, logout } = useAuth(); // Get authentication status and logout function
//   const [isLoading, setIsLoading] = useState(true); // To handle loading state
//   const router = useRouter();

//   // Display success message after signup
//   useEffect(() => {
//     const message = localStorage.getItem("signupSuccessMessage");
//     if (message) {
//       toast.success(message); // Show success notification
//       localStorage.removeItem("signupSuccessMessage"); // Remove message after showing
//     }
//   }, []);

//   // Check authentication status on initial load
//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/Login"); // Redirect to login if not authenticated
//     } else {
//       setIsLoading(false); // Set loading to false once authenticated
//     }
//   }, [isAuthenticated, router]);

//   // Handle logout functionality
//   const handleLogout = () => {
//     logout(); // Call the logout function from context
//     router.push("/Login"); // Redirect to login page after logging out
//   };

//   // Render a loading screen while checking authentication
//   if (isLoading) {
//     return <div>Loading...</div>; // You can replace this with a spinner or skeleton loader
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <nav className="w-full bg-blue-600 p-4 shadow-md">
//         <ul className="flex justify-center space-x-8 text-white font-semibold">
//           <li>
//             <Link href="/" className="hover:text-blue-300">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link href="/Features" className="hover:text-blue-300">
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link href="/Contact" className="hover:text-blue-300">
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link href="/Aboutus" className="hover:text-blue-300">
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link href="/News" className="hover:text-blue-300">
//               News
//             </Link>
//           </li>
//           <li>
//             <Link href="/ShopCart" className="hover:text-blue-300">
//               Shop
//             </Link>
//           </li>
//           <li>
//             <button
//               onClick={handleLogout} // Call logout function on click
//               className="hover:text-blue-300"
//             >
//               Logout
//             </button>
//           </li>
//         </ul>
//       </nav>

//       <main className="flex-grow flex flex-col items-center justify-center p-10">
//         <h1 className="text-4xl font-bold text-blue-600 mb-4">
//           Welcome to the Futsal Management System
//         </h1>
//         <p className="text-gray-700 max-w-lg text-center mb-8">
//           Manage and optimize your futsal operations effortlessly. Track games,
//           manage bookings, and provide a seamless experience for players and
//           staff.
//         </p>

//         <Link
//           href="/Features"
//           className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
//         >
//           Explore Features
//         </Link>
//       </main>

//       <footer className="w-full bg-blue-600 text-center py-4 text-white mt-8">
//         <p>&copy; 2024 Futsal Management System. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;
