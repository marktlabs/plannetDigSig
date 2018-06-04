import React from 'react';
import {Button,Input, Row} from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './AddScreen.css';

const addScreen = (props) => {
    return (
        <div className="AddScreen" > 
            <div className="row">
                <br/>
                <br/>

                <div className="col s12">
                    <Row >
                        <Input placeholder="Screen Name" s={8} label="Add a name to the new screen" />        
                    </Row>
                    
                    <Row>
                        <Input placeholder="Screen IP Address" s={8} label="Add the IP address of the new screen" />
                    </Row>

                </div>

                <div className="col s12">
                    <Button className="btn waves-effect waves-light" type="submit" name="action">Apply!
                        <Icon className="material-icons right">done</Icon>
                    </Button>

                    
                </div>

                
                
            </div>
        </div>          
    )
}

export default addScreen;
