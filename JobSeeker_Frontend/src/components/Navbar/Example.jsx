import React, { useEffect, useState } from 'react';

export default function Example() {
  const [data, setData] = useState([]);
  const startValue = 1;
  const endValue = 100;
  const interval = 45;

  useEffect(() => {
    const newData = [];
    for (let i = startValue; i <= endValue; i += interval) {
      newData.push(i);
    }
    setData(newData);
  }, []);

  return (
    <div>
      <p>Data Array: {JSON.stringify(data)}</p>
    </div>
  );
}