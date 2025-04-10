import React, { useState } from 'react';

export default function Untitled() {
  const rate = [0.13, 2, 2.5, 3.7, 4.1];
  const [value, setValue] = useState(0);
  const [selectedRate, setSelectedRate] = useState(rate[0]);

  return (
    <div>
      <input
        type="number"
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <select onChange={(e) => setSelectedRate(Number(e.target.value))}>
        {rate.map((r, i) => (
          <option key={i} value={r}>
            {r}
          </option>
        ))}
      </select>
      <p>Result: {value * selectedRate}</p>
    </div>
  );
}