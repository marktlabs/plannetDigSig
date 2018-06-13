
import React from 'react';

import './DropdownScreen.css';

const DropdownScreen = ({handleChange, items, name}) => (
  <div className="DropdownScreen">
    <select className='browser-default' onChange={({target: {value}}) => handleChange( name, value)}>
      {
        items.map(({name, key}) => (
          <option key={key} value={name}> {name} </option>
        ))
      }
    </select>         
  </div>
);

export default DropdownScreen;
  
