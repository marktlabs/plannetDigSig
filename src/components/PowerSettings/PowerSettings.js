import React from 'react';
import { Button, NavItem, Dropdown} from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './PowerSettings.css';
  
const powerSettings = (props) => {
    return (
        <div className="PowerSettings" > 
            <div className="row">
                <div className="col s12 ">
                    <Dropdown trigger={
                        <Button>DMP Name</Button>
                        }>
                            <NavItem>Screen 1</NavItem>
                            <NavItem divider />
                            <NavItem>Screen 2</NavItem>
                            <NavItem divider />
                            <NavItem>Screen 3</NavItem>
                        </Dropdown>
                </div>
                
                <br/>
                <br/>
                <br/>

                <div className="col12"> 
                     <Button waves='light'>ON<Icon left>brightness_low</Icon></Button>
                     {` `}
                     <Button waves='light'>OFF<Icon left>brightness_2</Icon></Button>
                </div>

                <br/>
                <br/>
                <br/>

                <div className="col12"> 
                     <Button waves='light'>Apply<Icon left>check_box</Icon></Button>

                </div>                

            </div>
        </div>          
    )
}

export default powerSettings;
