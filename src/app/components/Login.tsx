// // app/login/page.tsx
// "use client";

// import React, { useState } from "react";
// import "./Login.css"; // Import the CSS file for styling
// import Link from "next/link";

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Login logic here
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Dont have an account? <Link href="/signup">Sign Up</Link>{" "}
//         {/* Use href for Next.js */}
//       </p>
//     </div>
//   );
// };

// export default LoginPage;
