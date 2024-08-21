import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      axios
        .get("http://localhost:5000/api/inventory", {
          headers: { "x-auth-token": auth.token },
        })
        .then((response) => setInventory(response.data))
        .catch((error) => console.error("Error fetching inventory:", error));
    }
  }, [auth.token]);

  return (
    <div className="dashboard">
      <h2>Inventory Dashboard</h2>
      <div className="inventory-list">
        {inventory &&
          inventory?.map((item) => (
            <div key={item._id} className="inventory-card">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Location: {item.location}</p>
              <p>Vendor: {item.vendor}</p>
              <p>Status: {item.status}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
