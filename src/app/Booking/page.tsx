// "use client";

// import { useState, FormEvent } from "react";

// function Booking() {
//   const [date, setDate] = useState<string>(""); // Separate date and time states
//   const [time, setTime] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [message, setMessage] = useState<string>("");

//   // Handle booking submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Combine date and time into a single datetime string
//     const datetime = `${date}T${time}`;

//     const bookingData = { datetime, name, message };

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/bookings/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (res.ok) {
//         alert("Booking successful");
//         setDate(""); // Clear the form after success
//         setTime("");
//         setName("");
//         setMessage("");
//       } else {
//         alert("Error with booking");
//       }
//     } catch (error) {
//       console.error("Booking submission error:", error);
//       alert("There was an error with your booking.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         required
//       />
//       <input
//         type="time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Court (optional)"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button type="submit">Book Now</button>
//     </form>
//   );
// }

// export default Booking;
