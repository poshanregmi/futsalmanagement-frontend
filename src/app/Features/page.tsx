"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Booking {
  id: number;
  name: string;
  court: string;
  date: string;
  time: string;
}

const Features = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [name, setName] = useState<string>("");
  const [court, setCourt] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showBookings, setShowBookings] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [timeFrom, setTimeFrom] = useState<string>("");
  const [timeTo, setTimeTo] = useState<string>("");

  const courtOptions = ["AITM FUTSAL", "Futsal Court A"];

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/bookings/")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again later.");
        setLoading(false);
      });
  }, []);

  const validateBooking = (): string | null => {
    if (!name || !court || !date || !timeFrom || !timeTo) {
      return "Please fill in all the required fields.";
    }

    if (timeTo <= timeFrom) {
      return "The 'Time To' must be later than the 'Time From'.";
    }

    return null;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateBooking();
    if (error) {
      setError(error);

      return;
    }

    const newBooking = {
      name,
      court,
      time: `${date}, ${timeFrom} - ${timeTo}`,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/bookings/",
        newBooking
      );
      if (res.status === 201) {
        setBookings([...bookings, res.data]);
        setName("");
        setCourt("");
        setDate("");
        setTimeFrom("");
        setTimeTo("");
        setShowImage(true);
        setSuccessMessage("Booking Successful!");
        setTimeout(() => setSuccessMessage(""), 8000);
        setError("");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.non_field_errors?.[0] ||
          "An error occurred. Please try again.";

        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Services</h2>
        <ul className="text-gray-700 space-y-4 mb-6">
          <li
            className="bg-blue-100 p-4 rounded-md hover:bg-blue-200 transition duration-300 cursor-pointer"
            onClick={() => setShowBookings(!showBookings)}
          >
            Futsal Court Booking System
          </li>
        </ul>

        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-600 text-white py-2 px-4 rounded-md shadow-md">
            {successMessage}
          </div>
        )}

        {showBookings && (
          <div className="w-full bg-white p-6 shadow-md rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Futsal Court Bookings
            </h2>

            <form onSubmit={handleBookingSubmit} className="space-y-4 mb-6">
              {/* <input
                type="text"
                placeholder="time"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              /> */}

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <select
                value={court}
                onChange={(e) => setCourt(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select a Court
                </option>
                {courtOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                min={new Date().toISOString().split("T")[0]}
                required
              />
              <div>
                <label className="block text-gray-600 mb-2 font-semibold">
                  Time From:
                </label>
                <input
                  type="time"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2 font-semibold">
                  Time To:
                </label>
                <input
                  type="time"
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  min={timeFrom}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-md"
              >
                Book Now
              </button>
            </form>

            {error ? <div className="text-red-500 font-bold">{error}</div> : ""}
            {loading ? (
              <div>Loading bookings...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border2 mb-2">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left border-2">
                        Booking ID
                      </th>
                      <th className="px-4 py-2 text-left border-2">Name</th>
                      <th className="px-4 py-2 text-left border-2">Court</th>
                      <th className="px-4 py-2 text-left border-2">
                        Date & Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-4 py-2 border-2">{booking.id}</td>
                        <td className="px-4 py-2 border-2">{booking.name}</td>
                        <td className="px-4 py-2 border-2">{booking.court}</td>
                        <td className="px-4 py-2 border-2">
                          {booking.date} {booking.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end">
                  <button className="px-4 py-2 border rounded-xl hover:opacity-75 text-white bg-green-600">
                    Payment
                  </button>
                </div>
              </div>
            )}

            {/* Conditionally show the futsal court image */}
            {showImage && (
              <div className="w-full p-6 mt-4 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Futsal Court View
                </h3>
                <Image
                  src="/images/futsal image 2.png"
                  alt="Futsal court view"
                  width={500}
                  height={300}
                  className="rounded-md"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;

// "use client"; // Marking this file as a client component

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Define the interface for a Booking object based on the data from your API
// interface Booking {
//   id: number;
//   name: string;
//   court: string;
//   date: string; // Date field
//   time: string; // Time field
// }

// const Features = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [name, setName] = useState<string>("");
//   const [court, setCourt] = useState<string>("");
//   const [date, setDate] = useState<string>("");
//   const [time, setTime] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const [showBookings, setShowBookings] = useState<boolean>(false); // New state for toggling display

//   const courtOptions = ["Futsal Court A", "Futsal Court B", "Futsal Court C"];

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/bookings/")
//       .then((response) => {
//         setBookings(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//         setError("Error fetching bookings. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   const handleBookingSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name || !court || !date || !time) {
//       alert("Please fill in all the required fields.");
//       return;
//     }

//     const newBooking = {
//       name,
//       court,
//       time: date + " " + time,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/bookings/",
//         newBooking
//       );
//       if (res.status === 201) {
//         alert("Booking Successful!");
//         setBookings([...bookings, res.data]);
//         setName("");
//         setCourt("");
//         setDate("");
//         setTime("");
//       }
//     } catch (error) {
//       console.error("Error making booking:", error);
//       alert("Error making booking");
//     }
//   };

//   return (
//     <div className=" bg-gray-50 flex flex-col items-center justify-center p-6">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
//         <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Services</h2>
//         <ul className="text-gray-700 space-y-4 mb-6">
//           <li
//             className="bg-blue-100 p-4 rounded-md hover:bg-blue-200 transition duration-300 cursor-pointer"
//             onClick={() => setShowBookings(!showBookings)} // Toggle showBookings
//           >
//             Futsal Court Booking System
//           </li>
//           {/* <li className="bg-blue-100 p-4 rounded-md hover:bg-blue-200 transition duration-300">
//             Player Statistics and Performance Tracking
//           </li>
//           <li className="bg-blue-100 p-4 rounded-md hover:bg-blue-200 transition duration-300">
//             League and Tournament Management
//           </li>
//           <li className="bg-blue-100 p-4 rounded-md hover:bg-blue-200 transition duration-300">
//             Training Sessions and Coaching
//           </li>
//           <li className="bg-blue-100 p-4 rounded-md hover:bg-blue-200 transition duration-300">
//             Equipment Rentals
//           </li> */}
//         </ul>

//         {/* Conditionally render the Futsal Court Bookings section */}
//         {showBookings && (
//           <div className="w-full bg-white p-6 shadow-md rounded-lg mb-8">
//             <h2 className="text-2xl font-bold text-blue-600 mb-4">
//               Futsal Court Bookings
//             </h2>

//             <form onSubmit={handleBookingSubmit} className="space-y-4 mb-6">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />

//               {/* Court Dropdown */}
//               <select
//                 value={court}
//                 onChange={(e) => setCourt(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               >
//                 <option value="" disabled>
//                   Select a Court
//                 </option>
//                 {courtOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full p-3 bg-blue-600 text-white rounded-md"
//               >
//                 Book Now
//               </button>
//             </form>

//             {loading ? (
//               <div>Loading bookings...</div>
//             ) : error ? (
//               <div className="text-red-500">{error}</div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full table-auto">
//                   <thead>
//                     <tr>
//                       <th className="px-4 py-2 text-left">Booking ID</th>
//                       <th className="px-4 py-2 text-left">Name</th>
//                       <th className="px-4 py-2 text-left">Court</th>
//                       <th className="px-4 py-2 text-left">Date & Time</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bookings.map((booking) => (
//                       <tr key={booking.id}>
//                         <td className="px-4 py-2">{booking.id}</td>
//                         <td className="px-4 py-2">{booking.name}</td>
//                         <td className="px-4 py-2">{booking.court}</td>
//                         <td className="px-4 py-2">
//                           {booking.date} {booking.time}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Features;
