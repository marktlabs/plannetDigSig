import React, { Component } from 'react';
import './HBDPromo.css';
import DropdownScreen from '../DropdownScreen/DropdownScreen';


const screenName = [
    { name: 'screen 1', key: 1 },
    { name: 'screen 2', key: 2 },
    { name: 'screen 3', key: 3 },
];


class HBDPromo extends Component {
    
    state = {
        screenName: '',
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
            console.log("the name is: ",this.state.name)
            console.log("the screenName is: ",this.state.screenName);
        });
        

        this.textInput.value = '';
    }


    render() {

        return (
            <div className="HBDPromo" >
                <div className="row">
                    
                    <div className="col s12">
                        <p className="subtitlesHead3"> Select a screen for trigger </p>
                       
                        <DropdownScreen 
                            handleChange={this.handleScreenChange}
                            name="video"
                            items={screenName}
                        />
                    </div>
                    
                    <div className="col s12">
                         <p className="subtitlesHead4"> Enter person's name </p>
                        <input className="inputName" 
                                ref={input => { this.textInput = input; }}
                                type="text" value={this.state.value} 
                                onChange={this.handleChange} 
                        />
                    </div>

                    
                    <div className="col12">
                            <input className='buttonSubmit' 
                                onClick={() => {
                                    this.sendToDb();
                            }}
                            type="submit" value="Apply"/>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default HBDPromo;
