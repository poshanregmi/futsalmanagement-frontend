"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

interface Booking {
  id: number;
  name: string;
  court: string;
  date: string;
  time: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useAuth();
  const [newBookingNotification, setNewBookingNotification] = useState<
    null | string
  >(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/bookings/");
        setBookings(response.data);

        if (response.data.length > bookings.length) {
          setNewBookingNotification("New booking received!");
          setTimeout(() => setNewBookingNotification(null), 5000);
        }
      } catch (error) {
        console.error("Error fetching admin bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [bookings.length]);

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Hello, System Admin
        </h1>
        <button
          onClick={handleLogout}
          className="hover:opacity-80 transition-colors duration-300 text-white bg-blue-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="text-center text-4xl font-semibold text-blue-600 mb-8">
        Dashboard
      </div>

      {newBookingNotification && (
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg mb-6">
          {newBookingNotification}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-600 rounded-full"></div>
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No bookings available.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="table-auto w-full text-sm md:text-base text-left">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Court</th>
                <th className="px-4 py-2">Date & Time</th>
                <th className="px-4 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 text-left">{booking.id}</td>
                  <td className="px-4 py-2">{booking.name}</td>
                  <td className="px-4 py-2">{booking.court}</td>
                  <td className="px-4 py-2">
                    {booking.date} {booking.time}
                  </td>
                  <td className="text-center">
                    <button className="bg-green-500 text-white rounded-full px-4 py-2 mx-2 hover:bg-green-600 focus:outline-none transition duration-300">
                      Confirm
                    </button>
                    <button className="bg-red-500 text-white rounded-full px-4 py-2 mx-2 hover:bg-red-600 focus:outline-none transition duration-300">
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

// // Ok/page.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "@/Context/AuthContext"; // Import useAuth hook
// import { useRouter } from "next/navigation"; // For redirection

// interface Booking {
//   id: number;
//   name: string;
//   court: string;
//   date: string;
//   time: string;
// }

// const admindashboard = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const { isAuthenticated, logout } = useAuth();
//   const [newBookingNotification, setNewBookingNotification] = useState<
//     string | null
//   >(null);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/bookings/");
//         setBookings(response.data);

//         if (response.data.length > bookings.length) {
//           setNewBookingNotification("New booking received!");
//           setTimeout(() => setNewBookingNotification(null), 5000); // Clear after 5 seconds
//         }
//       } catch (error) {
//         console.error("Error fetching admin bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, [bookings.length]); // Refetch when bookings length changes

//   const handleLogout = () => {
//     logout(); // Call the logout function from context
//     router.push("/Login"); // Redirect to login page after logging out
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

//       {/* New Booking Notification */}
//       {newBookingNotification && (
//         <div className="bg-green-500 text-white p-4 rounded mb-4">
//           {newBookingNotification}
//         </div>
//       )}

//       {loading ? (
//         <p>Loading bookings...</p>
//       ) : bookings.length === 0 ? (
//         <p>No bookings available.</p>
//       ) : (
//         <table className="table-auto w-full bg-white rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-blue-600 text-white">
//               <th className="px-4 py-2">ID</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Court</th>
//               <th className="px-4 py-2">Date & Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.id} className="border-b">
//                 <td className="px-4 py-2">{booking.id}</td>
//                 <td className="px-4 py-2">{booking.name}</td>
//                 <td className="px-4 py-2">{booking.court}</td>
//                 <td className="px-4 py-2">
//                   {booking.date} {booking.time}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <button
//         onClick={handleLogout} // Call logout function on click
//         className="hover:text-blue-300 border px-4 py-2 bg-blue-500 rounded-xl mt-5  "
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default admindashboard;
