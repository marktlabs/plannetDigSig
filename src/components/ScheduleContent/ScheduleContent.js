import React, { Component, Fragment } from 'react';
import './ScheduleContent.css';
import {Row } from 'react-materialize';
import Dropdown from '../Dropdown/Dropdown';
import DropdownScreen from '../DropdownScreen/DropdownScreen'

const videoName = [
    { name: 'video 1', key: 1 },
    { name: 'video 2', key: 2 },
    { name: 'video 3', key: 3 },
];

const screenName = [
    { name: 'screen 1', key: 1 },
    { name: 'screen 2', key: 2 },
    { name: 'screen 3', key: 3 },
];

const timeNumber= [];

for (let i=0; i <= 23 ; i++){

    for (let j=0 ; j<= 59 ; j=j+15){
        
        if (i<10 && j < 10)
        {
            timeNumber.push({key: `0${i}:0${j}`, name: `0${i}:0${j}`});
        }

        if (i<10 && j >= 10)
        {
            timeNumber.push({key: `0${i}:${j}`, name: `0${i}:${j}`});
        }

        if (i>=10 && j >= 10)
        {
            timeNumber.push({key: `${i}:${j}`, name: `${i}:${j}`})
        }
        
    }

}

class SchedulerContent extends Component {

    state = {
        scheduleValue: '',
        dayOfWeek: '',
        value: 'coconut',
        screenName: '',
        schedules: [
            {
                video: 1,
                start: 0,
                end: 0,
            },
        ]
    }

    constructor(props) {
        super(props);
    }

    setNewTrigger = () => {
        let newTrigger = "Scheduler";
        this.props.setNewTrigger(newTrigger);
        console.log(newTrigger);
    }

    addSchedule = () => {
        const schedules = this.state.schedules;
        if(schedules.length > 3) return; 

        this.setState(prevState => ({
            schedules: [...schedules, {
                video: 1,
                start: 0,
                end: 0,
            }]
        }));
    }

    handleScheduleChange = (index, name, value) => {
        console.log(index);
        const schedules = this.state.schedules;
        const scheduleToModify = schedules[index];

        scheduleToModify[name] = value;
        schedules[index] = scheduleToModify;

        this.setState({schedules}, () => {
            console.log(this.state.schedules[index]);
        });
    }


    handleScreenChange = (name, value) => {
        this.setState({ screenName : value });
    }



    removeSchedule = (index) => {
        if(this.state.schedules.length === 1) return;

        let schedules = [...this.state.schedules];
        schedules.splice(index, 1);

        this.setState({
            schedules: [...schedules],
        });

    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state.schedules, this.props.dayIndex);
    }


    validateHour = () => {
        this.setState(prevState => {
            //concat mp4 format
            let startTime;
            let endTime;
            let startMin;
            let startHr;

            startTime= this.state.schedules[0].start;
            endTime= this.state.schedules[0].end;
            
            startMin= startTime.slice(1,3);
            //startHr= startTime.slice(2,3);
            
            console.log(startTime.length);
            console.log(startTime.slice(3));
            console.log("hoursss", startMin);

            
            /*
            if(){

            }*/
        });
    }

    sendToDb = () => {
        console.log("Clicked!")
    
        this.setState(prevState => {

            this.validateHour();
    
            console.log("video ",`${this.state.schedules[0].video}.mp4`);
            console.log("start ",this.state.schedules[0].start);
            console.log("end ",this.state.schedules[0].end);
            console.log("the screenName is: ",this.state.screenName);
            console.log("dayIndex", this.props.dayIndex);

        });
    }

    render() {
        return (
            <div className="ScheduleContent" >
                <div className="row">
                    <div className="col s12">
                        <h6 className="headerSContent"> Only four schedules per day can be added </h6>
                    </div>

                    <br />
                    <br />

                    <div className="col s12">

                        <p className="subtitlesHead"> Select the screen for scheduling content </p>

                        <DropdownScreen 
                            handleChange={this.handleScreenChange}
                            name="video"
                            items={screenName}
                        />
                    </div>
                   
                    {
                        this.state.schedules.map((value, index) => (
                            <Fragment key={index}>
                                <div className="row">
                                    <div className="col s12">
                                        <h5 className="titleHead">Schedule {index + 1}</h5>
                                    </div>
                                </div>

                                <div className="row" >

                                    <div className="col s4">
                                        <Row >
                                            <p className="subtitlesHead"> Video name </p>
                                            <Dropdown 
                                                handleChange={this.handleScheduleChange}
                                                name="video"
                                                index={index} 
                                                items={videoName} />
                                        </Row >
                                    </div>

                                    <div className="col s4">
                                        <Row >
                                            <p className="subtitlesHead" > Start time </p>
                                            <Dropdown handleChange={this.handleScheduleChange} name="start" index={index} items={timeNumber} />
                                        </Row >
                                    </div>

                                    <div className="col s4">
                                        <Row >
                                            <p className="subtitlesHead"> End time </p>
                                            <Dropdown handleChange={this.handleScheduleChange} name="end" index={index} items={timeNumber} />
                                        </Row >
                                    </div>
                                </div>

                            <div className="row">

                                <div className="col s6">
                                    <button onClick={() => this.addSchedule()} className="buttonSubmit"> Add </button>
                                </div>

                                <div className="col s6">
                                    <button onClick={() => this.removeSchedule(index)} className="buttonSubmit">Remove </button>
                                </div>
                            </div>
                            
                            </Fragment>
                        ))
                    }
                </div>

                <div className="row">
                    <div className="col12">
                        <input className='buttonSubmit'
                            onClick={() => {
                            this.sendToDb();
                        }}
                         type="submit" value="Submit" />
                    </div>
                </div>

            </div >
        )
    }
}
export default SchedulerContent;
