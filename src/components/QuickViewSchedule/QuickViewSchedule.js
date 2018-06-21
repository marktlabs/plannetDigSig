import React, { Component, Fragment } from 'react';
import { Row, Button, Modal, Icon} from 'react-materialize';
import Dropdown from '../Dropdown/Dropdown';
import DropdownScreen from '../DropdownScreen/DropdownScreen';

import './QuickViewSchedule.css';

let response = [];
let screen2Push;
let video2Push;

let startTime;
let endTime;
let startMin;
let startHr;
let endMin;
let endHr;
let IntStartHr;
let IntStartMin;
let IntEndtHr;
let IntEndMin;

const days = [
    { name: 'Monday', key: 1 },
    { name: 'Tuesday', key: 2 },
    { name: 'Wednesday', key: 3 },
    { name:'default_video', key:4},
];

const screenName = [
    { name: 'Screen 1', key: 1 },
    { name: 'Screen 2', key: 2 },
    { name: 'Screen 3', key: 3 },
];

const timeNumberMin = [];

const timeNumberHour = [];

const timeNumber = [];

for(let i = 0 ; i <= 59 ; i++ ) {
    timeNumberMin.push({name: `${i}`, key: i})
}

for(let i = 0 ; i <= 23 ; i++ ) {
    timeNumberHour.push({name: `${i}`, key: i})
}


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


class PromoLoop extends Component {

    state = {
        screenName: 'Screen 1',
        schedules: [
            {
                video: 'promo 1',
                start: '00:00',
                end: '00:00',
            },
        ]
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
        this.setState({ screenName: value});
    }

    handleChangeToAll = () => {
        this.setState({ screenName : "all" });
    }

    showData = () => {
        console.log("Show data for all week for Monday!")
        this.setState(prevState => {
            console.log(this.state.screenName);
            screen2Push= this.state.screenName;
            screen2Push= screen2Push.replace(" ","");
            console.log("state:", screen2Push);
            this.props.showSchedules(screen2Push);
        });

       
       //window.location.reload();

    }

 
    render() {
        return (
            <div className="QuickViewSchedule" >

                <div>
                     <h2 className="headerScheduler"> Quick View Schedule </h2> 
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
                    <div className="col s6">
                        <div className="selectScreenQS">    
                            <p className="subtitlesHead2"> Select the screen for scheduling content </p>
                            <DropdownScreen 
                                handleChange={this.handleScreenChange}
                                name="video"
                                items={screenName}
                            /> 
                        </div>
                    </div>

                    <div className="col s6">
                        <div className="selectScreenQS">    
                            <p className="subtitlesHead2"> Select the screen for scheduling content </p>
                            <DropdownScreen 
                                handleChange={this.handleDayChange}
                                name="video"
                                items={days}
                            /> 
                        </div>
                    </div>
                </div>    

                <div className="row">
                    <div className="col s12">
                        <h5> Render tablaaa </h5>
                    </div>
                </div>
                   

                <div className="row">
                    <div className="col12">
                        <Button 
                            onClick={() => {
                                this.showData();
                            }}
                        type="submit" value="Submit" > Show </Button>
                      
                    </div>
                </div>
            </div>
         
        )
    }
}
export default PromoLoop;



