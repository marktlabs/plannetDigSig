import React from 'react';
import {Button,NavItem, Dropdown} from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './PromoLoop.css';
  
const promoLoop = (props) => {
    return (
        <div className= "PromoLoop" > 
            <div className="row">
                <div className="col s12" >
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

                <div className="col s12">
                <br/>
                <br/>
                <Dropdown trigger={
                    <Button>Video Name</Button>
                }>
                    <NavItem>Breakfast</NavItem>
                    <NavItem divider />
                    <NavItem>Brunch</NavItem>
                    <NavItem divider />
                    <NavItem>Lunch</NavItem>
                    <NavItem divider />
                    <NavItem>Dinner</NavItem>
                </Dropdown>   
                </div>
                
                <div className="col s12">
                    <br/>
                    <br/>
                </div>

                <div className="col s6">
                    <Button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <Icon className="material-icons right">send</Icon>
                    </Button>
                </div>
                <br/>
                <div className="col s6">
                    <Button className="btn waves-effect waves-light" type="submit" name="action">Apply to all screens
                        <Icon className="material-icons right">done_all</Icon>
                    </Button>
                </div>
            </div>
        </div>          
    )
}

export default promoLoop;
