import React from 'react';
import { Button, NavItem, Dropdown, Row } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import './PromoLoop.css';

const promoLoop = (props) => {


    const addStartTime = () => {
        console.log(this.textInputStart.value);
        console.log(this.textInputEnd.value);
        /*
        this.props.addHBDName(this.textInput.value);
        this.textInput.value = '';
        this.textInput.focus();
        */
    }


    return (
        <div className="PromoLoop" >
            <div className="row">
                <div className="col s12">
                    <p> Set time for video promo looping </p>
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
                    <br />
                </div>

                <br />

                <div className="col s12">
                    <Button className="btn waves-effect waves-light"
                        type="submit"
                        onClick={() => addStartTime()}
                    > Apply!
                        <Icon className="material-icons right">done_all</Icon>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default promoLoop;
