import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Collection = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/collection")
      .then((result) => {
        if (result.data.Status) setCollections(result.data.Result);
        else alert(result.data.Error);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/collection/delete/" + id)
      .then((result) => {
        if (result.data.Status) window.location.reload();
        else alert(result.data.Error);
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Collection List</h3>
      </div>
      <Link to="/dashboard/add_collection" className="btn btn-success">
        Add Collection
      </Link>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Collector</th>
              <th>Category</th>
              <th>Waste Amount (kg)</th>
              <th>Collection Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((c) => (
              <tr key={c.id}>
                <td>{c.collector_name}</td>
                <td>{c.category_name}</td>
                <td>{c.waste_amount}</td>
                <td>{c.collection_date}</td>
                <td>{c.status}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_collection/${c.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
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
    </div>
  );
};

export default Collection;
