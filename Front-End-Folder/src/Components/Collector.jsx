import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Collector = () => {
  const [collectors, setCollectors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollectors();
  }, []);

  const fetchCollectors = () => {
    axios
      .get("http://localhost:3000/auth/collector_records")
      .then((res) => {
        if (res.data.Status) setCollectors(res.data.Result);
        else alert(res.data.Error);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this collector?")) {
      axios
        .delete(`http://localhost:3000/auth/delete_collector/${id}`)
        .then((res) => {
          if (res.data.Status) fetchCollectors();
          else alert(res.data.Error);
        });
    }
  };

  return (
    <div className="px-5 mt-3">
      <h3>Collectors List</h3>
      <button
        className="btn btn-success mb-2"
        onClick={() => navigate("/dashboard/add_collector")}
      >
        Add Collector
      </button>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collectors.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>
              <td>{c.salary}</td>
              <td>{c.category_name}</td>
              <td>
                {c.image && (
                  <img
                    src={`http://localhost:3000/Images/${c.image}`}
                    alt={c.name}
                    width="50"
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() =>
                    navigate(`/dashboard/edit_collector/${c.id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Collector;
