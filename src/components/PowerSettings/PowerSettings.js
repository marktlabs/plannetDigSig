import React, { Component } from 'react';
import { Button, Row } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './PowerSettings.css';


class PowerSettings extends Component {

    powerScreenName = () => {
        console.log(this.textInput.value);
        this.props.powerScreenName(this.textInput.value);
        this.textInput.value = '';
        this.textInput.focus();
    }

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

    setNewTrigger = () => {
        let newTrigger = "powerSettings";
        this.props.setNewTrigger(newTrigger);
        console.log("newTrigger");
    }

    render() {
        return (
            <div className="PowerSettings" >
                <div className="row">
                    <div className="col s12 ">
                        <p> Select screen name</p>
                        <Row >
                            <input
                                ref={input => { this.textInput = input; }}
                                placeholder="Screen1, Screen2, Screen3"
                                type="text" />
                        </Row>
                    </div>

                    <br />

                    <div className="col12">
                        <Button waves='light'
                            onClick = {() => {
                                this.powerScreenName(); this.powerON(); this.setNewTrigger()
                            }}
                        >ON <Icon left>brightness_low</Icon>
                        </Button>
                        {` `}

                        <Button waves='light'
                            onClick ={() => {
                                this.powerScreenName(); this.powerOFF(); this.setNewTrigger()
                            }}
                        >OFF<Icon left>brightness_2</Icon>
                        </Button>
                    </div>

                    <br />

                    {/*
                <div className="col12"> 
                     <Button waves='light'>Apply<Icon left>check_box</Icon></Button>

                </div>  
                */}

                </div>
            </div>
        )
    }
}

export default PowerSettings;
