import React from "react";

const Category = () => {
  // Hardcoded category list
  const categories = [
    { id: 1, name: "Plastic Waste" },
    { id: 2, name: "Organic Waste" },
    { id: 3, name: "Paper Waste" },
    { id: 4, name: "Metal Waste" },
  ];

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Category List</h3>
      </div>

      <div className="row mt-4">
        {categories.map((cat) => (
          <div key={cat.id} className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{cat.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
