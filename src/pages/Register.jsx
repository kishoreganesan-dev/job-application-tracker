import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div
      style={{
        width: "300px",
        margin: "100px auto",
        textAlign: "center",
      }}
    >
      <h2>Register</h2>

      <input type="text" placeholder="Full Name" />

      <br />
      <br />

      <input type="email" placeholder="Email" />

      <br />
      <br />

      <input type="password" placeholder="Password" />

      <br />
      <br />

      <button>Register</button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}