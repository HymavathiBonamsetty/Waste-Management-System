import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CollectorDetail = () => {
  const [collector, setCollector] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/collector/${id}`) // backend route to get collector by id
      .then(res => {
        if (res.data.Status) {
          setCollector(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleEdit = () => {
    navigate(`/dashboard/edit_collector/${collector.id}`);
  };

  if (!collector) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Collector Details</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:3000/Images/${collector.image}`}
          alt={collector.name}
          className="collector-detail-image"
          style={{ width: '200px', height: '200px', borderRadius: '10px' }}
        />
        <div className="d-flex flex-column align-items-start mt-4">
          <h4>Name: {collector.name}</h4>
          <h4>Email: {collector.email}</h4>
          <h4>Address: {collector.address || 'N/A'}</h4>
          <h4>Salary: ${collector.salary || '0.00'}</h4>
          <h4>Category: {collector.category_name || 'N/A'}</h4>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary me-2" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard/collector')}>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectorDetail;
