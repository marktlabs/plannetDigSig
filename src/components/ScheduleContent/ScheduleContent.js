import React from 'react';
import './ScheduleContent.css';
import {Button,Input, Row, NavItem, Dropdown} from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
  
const schedulerContent = (props) => {
    return (
        <div > 
            <div className="row">
                <div className="col s12">
                        <Row >
                            <input 
                                ref= {input=> {this.textInputScreen= input;}}
                                placeholder="Screen1, Screen2, Screen3"
                                type="text"/>       
                        </Row>
                 </div>
                
                <div className="col s12">
                    <Row >
                        <input 
                            ref= {input=> {this.textInput= input;}}
                            placeholder="Video Name"
                            type="text"/>       
                    </Row>
                
                </div>
            
                <div className="col s12">
                    <Row >
                        <input  className="ScheduleContent"
                                ref= {input=> {this.textInputScreen= input;}}
                                placeholder="Start time (hh:mm:ss)"
                                s={8} 
                                type="text"/>       
                    </Row>
                    
                    <Row>
                        <input  className="ScheduleContent"
                                    ref= {input=> {this.textInputScreen= input;}}
                                    placeholder="End time (hh:mm:ss)"
                                    s={8} 
                                    type="text"/>  
                    </Row>
                
                </div>
           
                
                <div className="col12">
                    <Button className="btn waves-effect waves-light" type="submit" name="action">Apply!
                        <Icon className="material-icons right">done_all</Icon>
                    </Button>
                
                </div>
            </div>

        </div>          
    )
}

export default schedulerContent;
