import React, { useState } from "react";
import axios from "axios";

function AddNew({ setShowAddNew, fetchData, userId }) {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://loginapi345.onrender.com/api/adddata/${userId}`,
        formData
      );
      console.log(response.data);
      setFormData({
        date: "",
        amount: "",
        type: "",
        category: "",
        description: "",
      });
      setShowAddNew(false);
      fetchData(); // Call the refetchData function after successful submission
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.error("Network error or server not reachable.");
      }
    }
  };

  return (
    <div className="add-new-container active">
      <form
        className="row g-3 needs-validation addDataForm add-new-content"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Date*
          </label>
          <input
            type="date"
            className="form-control"
            id="validationCustom01"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Amount*
          </label>
          <input
            type="number"
            className="form-control"
            id="validationCustom02"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            Type*
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              #
            </span>
            <select
              className="form-select"
              id="typeSelect"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="select">Select</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <div className="invalid-feedback">Please choose a type.</div>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom03" className="form-label">
            Category*
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please provide a Category.</div>
        </div>
        <div className="col-md-3">
          <label
            htmlFor="validationCustom04"
            className="form-label"
            style={{ display: "flex", alignItems: "center" }}
          >
            Description(if any)
          </label>
          <textarea
            className="p-2"
            rows={3}
            // cols={35}
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 btns">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddNew(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNew;
