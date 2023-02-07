import React, { useState, useEffect } from 'react';
// import fetch from 'fetch';
import './style.css';

const MyApp = () => {
  const [result, setResult] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [displaylist, setDisplayList] = useState([]);

  const handleSelect = (option) => {
    let selectedOpt = option.target.value;
    console.log('Selected = ', selectedOpt);
    const listToDisplay = result.filter((list) => list.userId == selectedOpt);
    setDisplayList(listToDisplay);
    console.log('listToDisplay == ', result);
  };

  const loadResult = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        setResult(json);

        let isPresent = false;
        let filteredArray = [];
        json.map((list) => {
          isPresent = filteredArray.find((opt) => opt.userId === list.userId);
          if (!isPresent) {
            filteredArray = [...filteredArray, list];
          }
          return list;
        });
        setFilteredRecords(filteredArray);
      });
  };

  useEffect(() => {
    loadResult();
  }, []);

  const handleCheck = (opt) => {
    console.log('Handle update...');
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <select onChange={handleSelect}>
        <option value="">Select Your Option:</option>
        {filteredRecords.map((list) => {
          return (
            <option value={list.userId}>
              {list.userId}. {list.title}
            </option>
          );
        })}
      </select>
      <br />
      <ul style={{ listStyleType: "none"}}>
        {displaylist.map((list) => {
          return (
            <li>
              <input
                type="checkbox"
                checked={list.completed}
                onChange={handleCheck}
              />
              {list.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyApp;
