import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCollector = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collector, setCollector] = useState({
    name: "",
    email: "",
    address: "",
    salary: "",
    category_id: "",
    image: "",
  });

  // ✅ Hardcoded category list (you can fetch from backend if needed)
  const categories = [
    { id: 1, name: "Plastic Waste" },
    { id: 2, name: "Organic Waste" },
    { id: 3, name: "Paper Waste" },
    { id: 4, name: "Metal Waste" },
  ];

  // ✅ Fetch existing collector details
  useEffect(() => {
    axios
      .get(`http://localhost:3000/collector/detail/${id}`)
      .then((res) => {
        if (res.data.Status) {
          const data = res.data.Result;
          setCollector({
            name: data.name || "",
            email: data.email || "",
            address: data.address || "",
            salary: data.salary || "",
            category_id: data.category_id || "",
            image: data.image || "",
          });
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // ✅ Handle update
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", collector.name);
    formData.append("email", collector.email);
    formData.append("address", collector.address);
    formData.append("salary", collector.salary);
    formData.append("category_id", collector.category_id);

    if (collector.image instanceof File) {
      formData.append("image", collector.image);
    }

    axios
      .put(`http://localhost:3000/auth/edit_collector/${id}`, formData)
      .then((res) => {
        if (res.data.Status) {
          navigate("/dashboard/collector");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Collector</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              value={collector.name}
              onChange={(e) =>
                setCollector({ ...collector, name: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control rounded-0"
              value={collector.email}
              onChange={(e) =>
                setCollector({ ...collector, email: e.target.value })
              }
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control rounded-0"
              value={collector.address}
              onChange={(e) =>
                setCollector({ ...collector, address: e.target.value })
              }
              required
            />
          </div>

          {/* Salary */}
          <div className="mb-3">
            <label>Salary</label>
            <input
              type="number"
              className="form-control rounded-0"
              value={collector.salary}
              onChange={(e) =>
                setCollector({ ...collector, salary: e.target.value })
              }
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label>Category</label>
            <select
              className="form-select rounded-0"
              value={collector.category_id}
              onChange={(e) =>
                setCollector({ ...collector, category_id: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="mb-3">
            <label>Image</label>
            <input
              type="file"
              className="form-control rounded-0"
              onChange={(e) =>
                setCollector({ ...collector, image: e.target.files[0] })
              }
            />
            {/* Show existing image if available */}
            {collector.image && !(collector.image instanceof File) && (
              <img
                src={`http://localhost:3000/Images/${collector.image}`}
                alt="collector"
                width="100"
                className="mt-2 rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Update Collector
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCollector;
