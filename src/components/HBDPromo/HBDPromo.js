import React, { Component } from 'react';
import './HBDPromo.css';
import { Button, Modal, Icon } from 'react-materialize';
import DropdownScreen from '../DropdownScreen/DropdownScreen';

let response = [];
let screen2Push;

const screenName = [
    { name: 'Screen 1', key: 1 },
    { name: 'Screen 2', key: 2 },
    { name: 'Screen 3', key: 3 },
    { name: 'All Screens', key: 4 },
];


class HBDPromo extends Component {
    
    state = {
        screenName: 'Screen 1',
        name: '',
    }

    handleScreenChange = (name, value) => {
        this.setState({ screenName : value });
    }


    handleChange = (event) => {
        this.setState({ name: event.target.value});
    }


    sendToDb = () => {
        console.log("Clicked!")
        
        this.setState(prevState => {    

            let name2render= this.state.name;

            if (name2render === ""){
                alert("Fill all the inputs!")
            }

            else{
                screen2Push= this.state.screenName;

                if (screen2Push === 'All Screens' ){
                    screen2Push="all";
                    response.push(this.state.name,screen2Push);
                    console.log("the response array: ",response);
                    this.props.updateAnnouncement(response);
                }

                else{
                    screen2Push= screen2Push.replace(" ","");
                    response.push(this.state.name,screen2Push);
                    console.log("the response array: ",response);
                    this.props.updateAnnouncement(response);
                }

            }
        });
        
        this.textInput.value = '';
        window.location.reload();
    }


    render() {

        return (
            <div className="HBDPromo" >
                <div className="row"> 

                    <div>
                        <h2 className="headerScheduler"> Announcements </h2> 
                       
                        <span className="modalScheduler">
                            <Modal 
                            header='Modal Header'
                            trigger={<Button waves='light'>Help!<Icon right> help </Icon></Button>}>
                            <p>Lorem ipsum dolor sit gmet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.</p>
                            </Modal>
                        </span>
                    
                    </div>


                    <div className="col s12">
                           <p className="subtitlesHead3"> Select a screen for trigger </p>
                        
                        <DropdownScreen 
                            handleChange={this.handleScreenChange}
                            name="video"
                            items={screenName}
                        />
                    </div>
                </div>
                
                <div className = "row">  
                    <div className="col s12">
                         <p className="subtitlesHead4"> Enter input name </p>
                        <input className="inputName" 
                                ref={input => { this.textInput = input; }}
                                type="text" value={this.state.value} 
                                onChange={this.handleChange} 
                        />
                    </div>

                    
                    <div className="col12">
                            <Button  
                                onClick={() => {
                                    this.sendToDb();
                            }}
                            type="submit" value="Apply"> Apply! </Button>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default HBDPromo;
