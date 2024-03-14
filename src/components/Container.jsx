import React, { useState, useEffect } from "react";
import AddNew from "./AddNew";

function Container({ fetchData, userData, userId }) {
  const [showAddNew, setShowAddNew] = useState(false);
  const [selectedType, setSelectedType] = useState("Select");
  const [selectedFrequency, setSelectedFrequency] = useState("All");

  const handleAddNew = async () => {
    setShowAddNew(true);
    await fetchData();
  };

  
  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleFrequencyChange = (e) => {
    setSelectedFrequency(e.target.value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  return (
    <>
      <div className="pageHeader">
        <div className="Select">
          <label htmlFor="frequencySelect">Select Frequency:</label>
          <select
            className="p-1"
            id="frequencySelect"
            onChange={handleFrequencyChange}
            value={selectedFrequency}
          >
            <option value="All">All</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="last3Months">Last 3 Months</option>
            <option value="last6Months">Last 6 Months</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>

        <div className="Select">
          <label htmlFor="typeSelect">Select Type:</label>
          <select
            className="p-1"
            id="typeSelect"
            onChange={handleTypeChange}
            value={selectedType}
          >
            <option value="Select">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button className="btn btn-primary button" onClick={handleAddNew}>
          Add New
        </button>
      </div>

      {userData ? (
        <table className="table Data">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {userData
              .filter(
                (data) =>
                  selectedType === "Select" || data.type === selectedType
              )
              .filter((data) => {
                const date = new Date(data.date);
                switch (selectedFrequency) {
                  case "lastWeek":
                    return isLastWeek(date);
                  case "lastMonth":
                    return isLastMonth(date);
                  case "last3Months":
                    return isLast3Months(date);
                  case "last6Months":
                    return isLast6Months(date);
                  case "lastYear":
                    return isLastYear(date);
                  default:
                    return true;
                }
              })
              .map((data) => (
                <tr key={data._id}>
                  <td>{formatDate(data.date)}</td>
                  <td>{data.amount}</td>
                  <td>{data.type}</td>
                  <td>{data.category}</td>
                  <td>{data.reference}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="load">Loading...</p>
      )}
      {showAddNew && (
        <AddNew setShowAddNew={setShowAddNew} fetchData={fetchData} userId={userId} />
      )}
    </>
  );
}

function isLastWeek(date) {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return date >= lastWeek && date <= today;
}

function isLastMonth(date) {
  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  return date >= lastMonth && date <= today;
}

function isLast3Months(date) {
  const today = new Date();
  const last3Months = new Date(
    today.getFullYear(),
    today.getMonth() - 3,
    today.getDate()
  );
  return date >= last3Months && date <= today;
}

function isLast6Months(date) {
  const today = new Date();
  const last6Months = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    today.getDate()
  );
  return date >= last6Months && date <= today;
}

function isLastYear(date) {
  const today = new Date();
  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );
  return date >= lastYear && date <= today;
}

export default Container;
