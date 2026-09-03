// import { useState } from "react";
// import { registerUser } from "../api/authApi";

// export default function Registers() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     try {
//       const data = await registerUser({
//         name,
//         email,
//         password,
//       });

//       console.log("Registration successful:", data);
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Create Account</h1>

//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button type="submit">Register</button>
//     </form>
//   );
// }

function TestProtected() {
  return <h1>Authenticated area</h1>;
}

export default TestProtected;
