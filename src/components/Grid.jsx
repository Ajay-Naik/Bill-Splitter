import React from "react";

let grid = {
  display: "grid",
  grid: "auto / auto 1fr 1fr 1fr ",
  width: "450px",
  height: "40px",
  placeItems: "center",
  gap: "10px",
  //    backgroundColor: "#8585a8ff",
};

let styles ={
   color: "black",
          border: "transparent",
          fontSize: 15,
          borderRadius: "5px",
          backgroundColor: "#cdc9c9ff",
          padding: "10px",
          width: "100px",
          height: "2.8rem"
}

export default function Grid({ name, data, onChange }) {
  const handleTypeChange = (e) => {
    onChange({ ...data, type: e.target.value });
  };


  return (
    <div style={grid}>
      <span
        style={{
          fontSize: "20px",
          fontWeight: "500",
          color: "black",
          backgroundColor: "inherit",
        }}>
        {name}
      </span>

      <select
        id="taxTipSelect"
        value={data.type}
        onChange={handleTypeChange}
        style={styles}
       >

        <option value="%" style={styles}>%</option>
        <option value="flat" style={styles}>flat</option>
      </select>

      <input
        type="number"
        placeholder="0.00"
        min={0}
        value={data.amount === 0 ? "" : data.amount}
        onChange={(e) => {
          const val = e.target.value;
          onChange({ ...data, amount: val === "" ? "" : parseFloat(val) });
        }}
        className="taxTipInput"
        style={{ width: "80px", height: "1.5rem", fontSize: 16 }}></input>

      <span
        placeholder="0.00"
        style={{ backgroundColor: "inherit", color: "black", fontSize: 18 }}>
        {" "}
        {data.amount
          ? data.type === "%"
            ? `${data.amount}%`
            : `₹ ${data.amount}`
          : "0.00"}
      </span>
    </div>
  );
}
