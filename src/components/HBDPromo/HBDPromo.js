import React, { Component } from 'react';
import { Button, Row, Dropdown } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './HBDPromo.css';

class HBDPromo extends Component {


    addHBDName = () => {
        //console.log(this.textInput.value);
        this.props.addHBDName(this.textInput.value);
        this.textInput.value = '';
        this.textInput.focus();

    }

    selectScreen = () => {
        this.props.bdayScreenName(this.textInputScreen.value);
        this.textInputScreen.value = '';
        this.textInputScreen.focus();
    }

    setNewTrigger = () => {
        let newTrigger = "hbdPromo";
        this.props.setNewTrigger(newTrigger);
        console.log("newTrigger");
    }


    render() {

        return (
            <div className="HBDPromo" >
                <div className="row">
                    {/* 
                        <Dropdown 
                         trigger={<Button>DMP Name</Button>}>

                        <NavItem>Screen 1</NavItem>
                        <NavItem divider />
                        <NavItem>Screen 2</NavItem>
                        <NavItem divid2er />
                        <NavItem>Screen 3</NavItem>
                        </Dropdown>
                    */}

                    <div className="col s12">
                        <p className="fixPadding"> Select a screen for trigger </p>
                        <br />
                        <br />
                        <Row >
                            <input
                                ref={input => { this.textInputScreen = input; }}
                                placeholder="Screen1, Screen2, Screen3"
                                type="text" />
                        </Row>

                        <Row >
                            <input
                                ref={input => { this.textInput = input; }}
                                placeholder="Name"
                                type="text" />
                        </Row>

                        <Button className="btn waves-effect waves-light"
                            onClick={() => {
                                this.addHBDName();
                                this.selectScreen(); this.setNewTrigger()
                            }} > Apply!
                            {/* onClick={() => this.addHBDName()} > Apply!
                            */}
                            <Icon className="material-icons right">done</Icon>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default HBDPromo;
