import React, { useState } from 'react';

export default function App() {

  const Data = [
    { id: 2, name: 'A11', age: 32 },
    { id: 1, name: 'Prabhgun', age: 16 },
    { id: 3, name: 'Arsh', age: 16 },
  ];

  return (
    <div>
      <ul>
        {Data.map((person) => (
          <li key={person.id}>
            {person.name} ({person.age})
          </li>
        ))}
      </ul>
    </div>
  );
}