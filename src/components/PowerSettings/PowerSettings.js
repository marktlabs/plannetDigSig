import React from 'react';
import { Button, NavItem, Dropdown, Row} from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './PowerSettings.css';
  
const powerSettings = (props) => {
    return (
        <div className="PowerSettings" > 
            <div className="row">
                <div className="col s12 ">
                    <p> Select screen name</p>
                     <Row >
                        <input 
                            ref= {input=> {this.textInputScreen= input;}}
                            placeholder="Screen1, Screen2, Screen3"
                            type="text"/>       
                    </Row>
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
                {/*
                <div className="col12"> 
                     <Button waves='light'>Apply<Icon left>check_box</Icon></Button>

                </div>  
                */}              

            </div>
        </div>          
    )
}

export default powerSettings;
