import React, { Component, Fragment } from 'react';
import { Button, Modal, Icon} from 'react-materialize';
import Dropdown from '../Dropdown/Dropdown';
import DropdownScreen from '../DropdownScreen/DropdownScreen';

import './PromoLoop.css';

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

const videoName = [
    { name: 'promo 1', key: 1 },
    { name: 'promo 2', key: 2 },
    { name: 'promo 3', key: 3 },
    { name:'default_video', key:4},
];

const screenName = [
    { name: 'Screen 1', key: 1 },
    { name: 'Screen 2', key: 2 },
    { name: 'Screen 3', key: 3 },
    { name: 'All Screens', key: 4 },
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


    sendToDb = () => {
        console.log("Clicked!")
    
        this.setState(prevState => {
            //pull states
            startTime= this.state.schedules[0].start;
            endTime= this.state.schedules[0].end;

            //negative indexes
            startHr = startTime.slice(0,-3);
            startMin = startTime.slice(-2);

            IntStartHr = parseInt(startHr,10);
            IntStartMin = parseInt(startMin,10);

            endHr = endTime.slice(0,-3);
            endMin = endTime.slice(-2);

            IntEndtHr = parseInt(endHr,10);
            IntEndMin = parseInt(endMin,10);
            
            if (IntStartHr > IntEndtHr){
                alert('Invalid Schedule');
            }

            if (IntStartHr === IntEndtHr && IntStartMin > IntEndMin){
                alert('Invalid Schedule');
            }

            if (IntStartHr === IntEndtHr && IntStartMin === IntEndMin){
                alert('Invalid Schedule');
            }

            
            else{
                //console.log("video ",`${this.state.schedules[0].video}.mp4`);
                video2Push= this.state.schedules[0].video + '.mp4';
                screen2Push= this.state.screenName;

                if (screen2Push === 'All Screens' ){
                    screen2Push="all";

                    response.push(screen2Push,video2Push,this.state.schedules[0].start,this.state.schedules[0].end);
                    console.log(response);
                    this.props.updateLoopPromo(response);
                }

                else{
                    screen2Push= screen2Push.replace(" ",""); 
                    response.push(screen2Push,video2Push,this.state.schedules[0].start,this.state.schedules[0].end);
                    console.log(response);
                    this.props.updateLoopPromo(response);
                }

            }
            
        });

        window.location.reload();
    }

 
    render() {
        return (
            <div className="PromoLoop" >

                <div>
                     <h2 className="headerScheduler"> Loop Promo </h2> 
                         <span className="modalScheduler">
                            <Modal 
                            header='Modal Header'
                            trigger={<Button waves='light'>Help!<Icon right> help </Icon></Button>}>
                            <p>Lorem ipsum dolor sit agffgfgfgdgfgfgfgfgmet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.</p>
                            </Modal>
                        </span>
                </div>

                <div className="row">
                    <div className= "selectScreenQS">
                        <div className="col s12">
                            <p className="subtitlesHead2"> Select the screen for scheduling content </p>
                            <DropdownScreen 
                                handleChange={this.handleScreenChange}
                                name="video"
                                items={screenName}
                            />
                        </div>
                    </div>
                </div>    

                <div className="row">
                    <div className="col s12">
                        <p className="subtitlesHead2" > Set time for video promo looping </p>
                    {
                        this.state.schedules.map((value, index, key) => (
                            <Fragment key={index}>
                                <div className="row">

                                    <div className="col s4">
                                        <Dropdown 
                                            handleChange={this.handleScheduleChange}
                                            name="video"
                                            index={index} 
                                            items={videoName} />
                                        
                                    </div>

                                    <div className="col s4">
                                        <Dropdown handleChange={this.handleScheduleChange} name="start" index={index} items={timeNumber} />                                       
                                    </div>

                                    <div className="col s4">
                                        <Dropdown handleChange={this.handleScheduleChange} name="end" index={index} items={timeNumber} />
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }
                    </div>
                    

                <div className="row">
                    <div className="col12">
                        <Button 
                            onClick={() => {
                                this.sendToDb();
                            }}
                        type="submit" value="Submit" > Apply! </Button>
                      
                    </div>
                </div>
            </div>
           </div>
        )
    }
}
export default PromoLoop;



