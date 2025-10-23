import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCollector = () => {
  const [collector, setCollector] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    category_id: "",
    image: null,
  });

  // ✅ Hardcoded category list
  const categories = [
    { id: 1, name: "Plastic Waste" },
    { id: 2, name: "Organic Waste" },
    { id: 3, name: "Paper Waste" },
    { id: 4, name: "Metal Waste" },
  ];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", collector.name);
    formData.append("email", collector.email);
    formData.append("password", collector.password);
    formData.append("address", collector.address);
    formData.append("salary", collector.salary);
    formData.append("category_id", collector.category_id);
    if (collector.image) formData.append("image", collector.image);

    axios
      .post("http://localhost:3000/auth/add_collector", formData)
      .then((res) => {
        if (res.data.Status) navigate("/dashboard/collector");
        else alert(res.data.Error);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Collector</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              onChange={(e) =>
                setCollector({ ...collector, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control rounded-0"
              onChange={(e) =>
                setCollector({ ...collector, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control rounded-0"
              onChange={(e) =>
                setCollector({ ...collector, password: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control rounded-0"
              onChange={(e) =>
                setCollector({ ...collector, address: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Salary</label>
            <input
              type="text"
              className="form-control rounded-0"
              onChange={(e) =>
                setCollector({ ...collector, salary: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <select
              className="form-select rounded-0"
              onChange={(e) =>
                setCollector({ ...collector, category_id: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Image</label>
            <input
              type="file"
              className="form-control rounded-0"
              onChange={(e) =>
                setCollector({ ...collector, image: e.target.files[0] })
              }
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add Collector
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCollector;
