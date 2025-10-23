import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCollection = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [collectors, setCollectors] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/auth/collector").then(res => setCollectors(res.data.Result));
    axios.get("http://localhost:3000/auth/category").then(res => setCategories(res.data.Result));
    axios.get(`http://localhost:3000/collection/${id}`).then(res => setData(res.data.Result));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/collection/edit/${id}`, data)
      .then(res => {
        if (res.data.Status) navigate("/dashboard/collection");
        else alert(res.data.Error);
      });
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Collection</h3>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Collector</label>
          <select className="form-select" value={data.collector_id || ''} onChange={e => setData({ ...data, collector_id: e.target.value })}>
            {collectors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <label className="form-label mt-2">Category</label>
          <select className="form-select" value={data.category_id || ''} onChange={e => setData({ ...data, category_id: e.target.value })}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <label className="form-label mt-2">Waste Amount (kg)</label>
          <input type="number" className="form-control" value={data.waste_amount || ''} onChange={e => setData({ ...data, waste_amount: e.target.value })} />

          <label className="form-label mt-2">Collection Date</label>
          <input type="date" className="form-control" value={data.collection_date || ''} onChange={e => setData({ ...data, collection_date: e.target.value })} />

          <label className="form-label mt-2">Status</label>
          <select className="form-select" value={data.status || 'Pending'} onChange={e => setData({ ...data, status: e.target.value })}>
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <button className="btn btn-primary w-100 mt-3">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditCollection;
