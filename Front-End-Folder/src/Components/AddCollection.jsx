import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCollection = () => {
  const [data, setData] = useState({
    collector_id: "",
    category_id: "",
    waste_amount: "",
    collection_date: "",
    status: "Pending"
  });
  const [collectors, setCollectors] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/auth/collector").then(res => setCollectors(res.data.Result));
    axios.get("http://localhost:3000/auth/category").then(res => setCategories(res.data.Result));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/collection/add", data)
      .then(res => {
        if (res.data.Status) navigate("/dashboard/collection");
        else alert(res.data.Error);
      });
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Collection</h3>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Collector</label>
          <select className="form-select" onChange={e => setData({ ...data, collector_id: e.target.value })}>
            <option>Select Collector</option>
            {collectors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <label className="form-label mt-2">Category</label>
          <select className="form-select" onChange={e => setData({ ...data, category_id: e.target.value })}>
            <option>Select Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <label className="form-label mt-2">Waste Amount (kg)</label>
          <input type="number" className="form-control" onChange={e => setData({ ...data, waste_amount: e.target.value })} />

          <label className="form-label mt-2">Collection Date</label>
          <input type="date" className="form-control" onChange={e => setData({ ...data, collection_date: e.target.value })} />

          <label className="form-label mt-2">Status</label>
          <select className="form-select" onChange={e => setData({ ...data, status: e.target.value })}>
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <button className="btn btn-primary w-100 mt-3">Add Collection</button>
        </form>
      </div>
    </div>
  );
};

export default AddCollection;
