import React, { useState, useEffect } from "react";
import Image from "./images/Logo2.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navber";
import Signup from "./components/signup";
import Expenses from "./components/expenses";
import Container from "./components/Container";

function App() {
  const [userData, setUserData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [incomeCount, setIncomeCount] = useState(0);
  const [expenseCount, setExpenseCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchData();
    }
  }, [isLoggedIn, userId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://loginapi345.onrender.com/api/login", {
        username,
        password,
      });
      const userId = response.data.userId;
      setUserId(userId);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login Failed");
      alert("Login Failed. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://loginapi345.onrender.com/api/adddata/${userId}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch data");
      setUserData([]);
    }
  };

  useEffect(() => {
    if (userData.length > 0) {
      const income = userData
        .filter((data) => data.type === "income")
        .reduce((acc, cur) => acc + cur.amount, 0);
      const expense = userData
        .filter((data) => data.type === "expense")
        .reduce((acc, cur) => acc + cur.amount, 0);
      setTotalIncome(income);
      setTotalExpense(expense);
      setIncomeCount(userData.filter((data) => data.type === "income").length);
      setExpenseCount(
        userData.filter((data) => data.type === "expense").length
      );
    }
  }, [userData]);

  return (
    <Router>
      {isLoggedIn && <Navbar username={username} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/home"
              element={
                <Container
                  fetchData={fetchData}
                  userData={userData}
                  userId={userId}
                />
              }
            />
            <Route
              path="/expense"
              element={
                <Expenses
                  userId={userId}
                  totalIncome={totalIncome}
                  totalExpense={totalExpense}
                  incomeCount={incomeCount}
                  expenseCount={expenseCount}
                  fetchData={fetchData}
                />
              }
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route
            path="/"
            element={
              <div className="frombackdrop ">
                <img className="logo" src={Image} alt="" height={100} />
                <img
                  className="loginimage"
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhwZW5zZXN8ZW58MHx8MHx8fDA%3D"
                  alt="image"
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
                    <Link to="/signup" style={{ textDecoration: "none" }}>
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
                    bottom: 0,
                    width: "100vw",
                    padding: "5px",
                  }}
                >
                  2024 &copy; Made by Moin Khan
                </footer>
              </div>
            }
          />
        )}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
