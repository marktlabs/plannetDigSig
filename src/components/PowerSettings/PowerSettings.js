import React, { Component } from 'react';
import { Button, Modal } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './PowerSettings.css';
import DropdownScreen from '../DropdownScreen/DropdownScreen';


let response = [];
let screen2Push;

const screenName = [
    { name: 'Screen 1', key: 1 },
    { name: 'Screen 2', key: 2 },
    { name: 'Screen 3', key: 3 },
    { name: 'All Screens', key: 4 },
];  


class PowerSettings extends Component {

    state = {
        screenName: 'Screen 1',
        status: '',
    }

    handleScreenChange = (name, value) => {
        this.setState({ screenName : value });
    }
    
    powerON = () => {
        this.setState({ status : 1 });
    }

    powerOFF = () => {
        this.setState({ status : 0 });
    }

    sendToDb = () => {
        console.log("Clicked!")
        
        this.setState(prevState => {    
            console.log("tv status: ",this.state.status)
            console.log("the screenName is: ",this.state.screenName);

            screen2Push= this.state.screenName;
            
            
            if(this.state.status === ''){
                alert("Select a status for " + screen2Push);
            }
            
            else{
                if(this.state.status === 0){
                    alert("Turning "+ this.state.screenName + ": "+ " OFF" );
                }

                if(this.state.status === 1){
                    alert("Turning "+ this.state.screenName + ": "+ " ON" );
                }

                if (screen2Push === 'All Screens' ){
                    screen2Push="all";

                    response.push(screen2Push,this.state.status);
                    this.props.updatePowerSettings(response);
                }
                    
                else{
                    screen2Push= screen2Push.replace(" ",""); 
                    console.log(screen2Push);
                    response.push(screen2Push,this.state.status);
                    this.props.updatePowerSettings(response);
                }
            
                
            }
            
        });
       
    }

    sendToDbAll = () => {
        
        this.setState(prevState => {  

            console.log("tv status: ",this.state.status)
            console.log("the screenName is: ",this.state.screenName);

            screen2Push= this.state.screenName;

            if(this.state.status === ''){
                alert("Select a status for " + screen2Push);
            }
            
            else{
                if(this.state.status === 0){
                    alert("Turning "+ this.state.screenName + ": "+ " OFF" );
                }

                if(this.state.status === 1){
                    alert("Turning "+ this.state.screenName + ": "+ " ON" );
                }

                
                screen2Push= screen2Push.replace(" ",""); 
                console.log(screen2Push);
            
                response.push(screen2Push,this.state.status);
                this.props.updatePowerSettings(response);
            }
            
        });

        window.location.reload();
       
    }

  
    render() {
        return (
            <div className="PowerSettings" >
                <div>
                    <h2 className="headerScheduler"> Power Settings </h2> 
                    <span className="modalScheduler">
                            <Modal 
                            header='Modal Header'
                            trigger={<Button waves='light'>Help!<Icon right> help </Icon></Button>}>
                            <p>Lorem ipsum dolor sit gmet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.</p>
                            </Modal>
                    </span>
                </div>    

                <div className="row">
                    <div className="col s12 ">
                        <p className="subtitlesHead4"> Select screen name</p>
                        <DropdownScreen 
                            handleChange={this.handleScreenChange}
                            name="video"
                            items={screenName}
                        />
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

                <div className="row fix-row-padding">
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
