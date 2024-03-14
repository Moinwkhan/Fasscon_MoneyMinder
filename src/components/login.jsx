import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://loginapi345.onrender.com/api/login", {
        username,
        password,
      });
      console.log(username, password);
      navigate("/home");
    } catch (error) {
      console.error("Login Failed");
      alert("Login Failed. Please try again.");
    }
  };

  return (
    <div className="frombackdrop">
    
      <img
        src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhwZW5zZXN8ZW58MHx8MHx8fDA%3D"
        alt="image"
        height={400}
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          borderRadius: 10,
        }}
      />
      <form className="formLogin fs-4" onSubmit={handleLogin}>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p className="fs-5">
          Create a new account?{" "}
          <Link
            rel="stylesheet"
            to="/signup"
            style={{ textDecoration: "none" }}
          >
            Click Here
          </Link>
        </p>
      </form>
      <footer
        style={{
          backgroundColor: "grey",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: "96.5%",
          width: "100vw",
        }}
      >
        2024 &copy; Made by Moin khan
      </footer>
    </div>
  );
}

export default Login;
