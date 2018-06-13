import React, { Component } from 'react';
import './ScheduleContent.css';
import { Button, Row } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import SchedulerSection from '../SchedulerSection/SchedulerSection'

class SchedulerContent extends Component {

    getDayOfWeek = (dayKey) => {
        console.log(dayKey);

    }

    getVideoName = (video) => {
        console.log(video);
    }

    getInput1 = (input) => {
        console.log(input);
    }

    getInput2 = (input) => {
        console.log(input);
    }

    getInput3 = (input) => {
        console.log(input);
    }

    getInput4 = (input) => {
        console.log(input);
    }

    render() {
        return (
            <div >
                <div className="row">
                    <div className="col s12">
                        <h5 className="headerSContent"> You can only add four different schedules per day </h5>
                    </div>

                    <br />

                    <div className="col s12">
                        <Row >
                            <input
                                ref={input => { this.textInput1 = input; }}
                                placeholder="Screen1, Screen2, Screen3"
                                type="text" />
                        </Row>
                    </div>

                    <div className="col s12">
                        <h5> First Schedule </h5>
                    </div>
                    <SchedulerSection getInput1={this.getInput1.props} />

                    <div className="col s12">
                        <h5> Second Schedule </h5>
                    </div>
                    <SchedulerSection getInput2={this.getInput2.props} />

                    <div className="col s12">
                        <h5> Third Schedule </h5>
                    </div>
                    <SchedulerSection getInput3={this.getInput3.props} />

                    <div className="col s12">
                        <h5> Fourth Schedule </h5>
                    </div>
                    <SchedulerSection getInput4={this.getInput4.props} />


                </div>

                <div className="row">
                    <div className="col12">
                        <Button className="btn waves-effect waves-light" type="submit" name="action"
                            onClick={() => { this.getDayOfWeek(this.props.dayIndex); this.getInput1() }}

                        >Apply!
                        <Icon className="material-icons right">done_all</Icon>
                        </Button>

                    </div>
                </div>

            </div >
        )
    }
}
export default SchedulerContent;
