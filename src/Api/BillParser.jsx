import React, { useState, useEffect } from "react";

const BillParser = ({ initialItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Copy initial items
    const updatedItems = initialItems.map(item => {
      // If total is missing, calculate it
      if (!item.total) {
        return {
          ...item,
          total: item.rate * item.quantity
        };
      }
      return item;
    });

    setItems(updatedItems);
  }, [initialItems]);

  return (
    <div>
      <h2>Bill Items</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillParser;
