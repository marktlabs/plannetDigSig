
import React, {Component} from 'react';
import { Button } from 'react-materialize';

import './DropdownNoIndex.css';

const DropdownNoIndex = ({handleChange, items, name, index}) => (
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

export default DropdownNoIndex;
  
