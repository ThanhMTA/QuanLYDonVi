import React, { useState, useEffect } from 'react';
import { TreeSelect, FilterTwoTone } from 'antd'; // Import các component từ thư viện Ant Design

const YourComponent = () => {
  const [donViData, setDonViData] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [canBoData, setCanBoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch DonVi data
  const fetchDonViData = async () => {
    try {
      const response = await fetch('https://localhost:44325/api/DonVi');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDonViData(data);
      setLoading(false);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };

  // Function to fetch CanBo data based on selected unit id
  const fetchCanBoData = async (id) => {
    try {
      const response = await fetch(`https://localhost:44325/api/CanBo?id=${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCanBoData(data);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };

  // useEffect to fetch DonVi data on component mount
  useEffect(() => {
    fetchDonViData();
  }, []);

  // Handle selection change in TreeSelect
  const handleTreeSelectChange = (value, node) => {
    if (node) {
      setSelectedUnitId(node.key);
    }
  };

  // Handle filter icon click
  const handleFilterIconClick = async () => {
    if (selectedUnitId) {
      await fetchCanBoData(selectedUnitId);
      // Log or display canBoData in a table or modal as needed
      console.log('CanBo Data:', canBoData);
      // Implement your logic to display the data
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* TreeSelect component */}
      <TreeSelect
        style={{ width: '400px' }}
        treeData={/* your treeData based on donViData */}
        onChange={handleTreeSelectChange}
      />

      {/* Filter icon */}
      <FilterTwoTone
        style={{ fontSize: '16px', color: '#08c', cursor: 'pointer' }}
        onClick={handleFilterIconClick}
      />

      {/* Table or Modal to display CanBo data */}
      {/* Implement your logic to display CanBo data */}
    </div>
  );
};

export default YourComponent;
