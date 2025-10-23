import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [collectorTotal, setCollectorTotal] = useState(0);
  const [wasteTotal, setWasteTotal] = useState(0);
  const [collectors, setCollectors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminCount();
    fetchCollectorCount();
    fetchWasteTotal();
    fetchCollectorRecords();
  }, []);

  const fetchCollectorRecords = () => {
    axios.get('http://localhost:3000/auth/collector_records')
      .then(result => {
        if (result.data.Status) {
          setCollectors(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this collector?')) {
      axios.delete(`http://localhost:3000/auth/delete_collector/${id}`)
        .then(result => {
          if (result.data.Status) {
            fetchCollectorRecords(); // Refresh the list
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };

  const fetchAdminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) setAdminTotal(result.data.Result[0].admin);
      });
  };

  const fetchCollectorCount = () => {
    axios.get('http://localhost:3000/auth/collector_count')
      .then(result => {
        if (result.data.Status) setCollectorTotal(result.data.Result[0].collector);
      });
  };

  const fetchWasteTotal = () => {
    axios.get('http://localhost:3000/auth/waste_count')
      .then(result => {
        if (result.data.Status) setWasteTotal(result.data.Result[0].totalWaste);
      });
  };

  return (
    <div>
      {/* Stats */}
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 text-center'>
          <h4>Admin</h4><hr />
          <h5>Total: {adminTotal}</h5>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 text-center'>
          <h4>Collectors</h4><hr />
          <h5>Total: {collectorTotal}</h5>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 text-center'>
          <h4>Total Waste</h4><hr />
          <h5>{wasteTotal} kg</h5>
        </div>
      </div>

      {/* Collectors Table */}
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Collectors</h3>
        <button className="btn btn-success mb-2"
          onClick={() => navigate('/dashboard/add_collector')}
        >
          Add Collector
        </button>
        <table className='table table-bordered'>
          <thead className='table-dark'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {collectors.length > 0 ? collectors.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>{c.salary}</td>
                <td>{c.category_name}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2"
                    onClick={() => navigate(`/dashboard/edit_collector/${c.id}`)}
                  >Edit</button>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(c.id)}
                  >Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center">No collectors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
