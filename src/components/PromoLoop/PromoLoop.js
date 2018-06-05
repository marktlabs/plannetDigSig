import React, { Component } from 'react';
import { Button, NavItem, Dropdown, Row } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './PromoLoop.css';


class PromoLoop extends Component {

    addStartTime = () => {
        console.log(this.textInputStart.value);
        this.props.addStartTime(this.textInputStart.value);
        this.textInputStart.value = '';
        this.textInputStart.focus();

    }

    addEndTime = () => {
        console.log(this.textInputEnd.value);
        this.props.addEndTime(this.textInputEnd.value);
        this.textInputEnd.value = '';
        this.textInputEnd.focus();
    }

    setNewTrigger = () => {
        let newTrigger = "promoLoop";
        this.props.setNewTrigger(newTrigger);
        console.log("newTrigger");
    }

    loopPromoScreen = () => {
        console.log(this.textInputScreen2.value);
        this.props.loopPromoScreen(this.textInputScreen2.value);
        this.textInputScreen2.value = '';
        this.textInputScreen2.focus();
    }   


    render() {
        return (
            <div className="PromoLoop" >
                <div className="row">
                    <div className="col s12">
                        <h6> Set time for video promo looping </h6>
                        <Row >
                            <input
                                ref={input => { this.textInputStart = input; }}
                                placeholder="Start time (hh:mm:ss)"
                                s={8}
                                type="text" />
                        </Row>

                        <Row>
                            <input
                                ref={input => { this.textInputEnd = input; }}
                                placeholder="End time (hh:mm:ss)"
                                s={8}
                                type="text" />
                        </Row>
                    </div>


                    <div className="col s12">
                        <Row >
                            <h6 > Select a screen for trigger </h6>
                            <br />
                            <input
                                ref={input => { this.textInputScreen2 = input; }}
                                placeholder="Screen1, Screen2, Screen3"
                                type="text" />
                        </Row>

                    </div>

                    <div className="col s12">
                        <Button className="btn waves-effect waves-light"
                            type="submit"
                            onClick={() => {
                                this.addStartTime(); this.loopPromoScreen();
                                this.addEndTime(); this.setNewTrigger()
                            }} >Apply!


                        <Icon className="material-icons right">done_all</Icon>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default PromoLoop;
