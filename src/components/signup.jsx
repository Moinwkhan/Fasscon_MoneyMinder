import React, { useState } from "react";
import axios from "axios";
import Signupimg from "../images/expensessignup.png";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://loginapi345.onrender.com/api/signup", {
        username,
        email,
        password,
      });
      alert("Signup Successful");
      navigate("/");
    } catch (error) {
      console.error("Signup Failed");
      alert("Signup Failed. Please try again.");
    }
  };

  return (
    <div className="frombackdrop">
      <img className="image" src={Signupimg} alt="" height={600} />
      <form className="Signupform fs-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <footer
        style={{
          backgroundColor: "grey",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          width: "100vw",
          padding: "5px",
        }}
      >
        2024 &copy; Made by Moin khan
      </footer>
    </div>
  );
}

export default Signup;
