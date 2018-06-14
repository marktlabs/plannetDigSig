import React, { Component } from 'react';
import { Button } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './PowerSettings.css';
import DropdownScreen from '../DropdownScreen/DropdownScreen';

const screenName = [
    { name: 'screen 1', key: 1 },
    { name: 'screen 2', key: 2 },
    { name: 'screen 3', key: 3 },
];  


class PowerSettings extends Component {

    state = {
        screenName: '',
        status: '',
    }

    handleScreenChange = (name, value) => {
        this.setState({ screenName : value });
    }
    
   
    /*
    powerON = () => {
        const boolValue = 1;
        console.log(boolValue);
        this.props.powerON(boolValue);

    }

    powerOFF = () => {
        const boolValue = 0;
        console.log(boolValue);
        this.props.powerOFF(boolValue);
    }
    */

    sendToDb = () => {
        console.log("Clicked!")
        const response = window.confirm('Are you sure?')
        
        this.setState(prevState => {    
            console.log("tv status: ",this.state.status)
            console.log("the screenName is: ",this.state.screenName);
        });
       
    }


    handleChangeToAll = () => {
        this.setState({ screenName : "Apply to all!" });
    }



    sendToAllDB = () => {
        console.log("Clicked!2")

        const response = window.confirm('Are you sure?')
        
        this.setState(prevState => {    
            console.log("tv status: ",this.state.status)
            console.log("the screenName is: ",this.state.screenName);
        });
       
    }


    powerON = () => {
        //this.setState({ status : "TURN ON" });
        this.setState({ status : 1 });
    }

    powerOFF = () => {
        //this.setState({ status : "TURN OFF" });
        this.setState({ status : 2 });
    }


    

    render() {
        return (
            <div className="PowerSettings" >
                <div className="row">
                    <div className="col s6 ">
                        <p className="subtitlesHead4"> Select screen name</p>
                        <DropdownScreen 
                            handleChange={this.handleScreenChange}
                            name="video"
                            items={screenName}
                        />
                    </div>

                     <div className="col s6">
                     <p className="subtitlesHead4"> Trigger all screens </p>
                        <Button waves='light'
                            onClick = {() => {
                                this.handleChangeToAll();
                            }}
                        > Apply to All
                        </Button>  
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <Button 
                            
                            waves='light'
                            onClick = {() => {
                                this.powerON();
                                
                            }}
                        >ON <Icon left>brightness_low</Icon>
                        </Button>
                        {` `}

                        <Button  waves='light'
                            onClick ={() => {
                                this.powerOFF();
                            }}
                        >OFF<Icon left>brightness_2</Icon>
                        </Button>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <Button waves='light'
                            onClick = {() => {
                                this.sendToDb();
                            }}
                        > Apply
                        </Button>  
                    </div>

                    
                </div>

            </div>
        )
    }
}

export default PowerSettings;
