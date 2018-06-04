import React from 'react';
import './ScheduleContent.css';
import {Button,Input, Row, NavItem, Dropdown} from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
  
const schedulerContent = (props) => {
    return (
        <div > 
            <div className="row">
                <div className="col s6">
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

                <div className="col s6">
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
            </div>
              
            <div className="row">
                <div className="col s12">
                    <Row >
                        <Input className="ScheduleContent" placeholder="Start time" s={8} label="hh:mm:ss" />        
                    </Row>
                    
                    <Row>
                        <Input  className="ScheduleContent" placeholder="End time" s={8} label="hh:mm:ss" />
                    </Row>
                
                </div>
            </div>

            <div className="row">
                <div className="col12">
                <Button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <Icon className="material-icons right">send</Icon>
                </Button>
                </div>
            </div>
        </div>          
    )
}

export default schedulerContent;
