
import React from 'react';

import './Dropdown.css';

const Dropdown = ({handleChange, items, name, index}) => (
  <div className="Dropdown">
    <select className='browser-default' onChange={({target: {value}}) => handleChange(index, name, value)}>
      { 
        
        items.map(({name, key}) => (
          <option key={key} value={name}> {name} </option>
        ))
      }
    </select>         
  </div>
);

export default Dropdown;
  
