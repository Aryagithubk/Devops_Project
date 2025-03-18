import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import ItemList from "../itemList/ItemList";
import Banner from "../banner/Banner";
import "./HomePage.css";

function HomePage() {
  const [items, setItems] = useState([]); // State to hold the list of items
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to hold error message (if any)

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setItems(response.data); // Set the items data from the response
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("Error fetching items.");
        setLoading(false);
      }
    };

    fetchItems();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there was an issue fetching the data
  }

  return (
    <div>
      <div className="banner_cl">
        <Banner />
      </div>
      <section>
        <ItemList items={items} />{" "}
        {/* Pass the fetched items to ItemList component */}
      </section>
    </div>
  );
}

export default HomePage;
