import React, { Component, Fragment } from 'react';
import './HBDPromo.css';
import { Button, Modal, Icon, Row } from 'react-materialize';
import DropdownScreen from '../DropdownScreen/DropdownScreen';
import Dropdown from '../Dropdown/Dropdown';

import ReactPlayer from 'react-player';

import firebaseApp from '../../firebase/firebaseApp';

let response = [];
let screen2Push;
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
let name2render;
let videoRender;


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

const timeNumber = [];

for (let i = 0; i <= 23; i++) {

    for (let j = 0; j <= 59; j = j + 15) {

        if (i < 10 && j < 10) {
            timeNumber.push({ key: `0${i}:0${j}`, name: `0${i}:0${j}` });
        }

        if (i < 10 && j >= 10) {
            timeNumber.push({ key: `0${i}:${j}`, name: `0${i}:${j}` });
        }

        if (i >= 10 && j >= 10) {
            timeNumber.push({ key: `${i}:${j}`, name: `${i}:${j}` })
        }

    }

}


class HBDPromo extends Component {
    
    state = {
        screenName: 'Screen 1',
        name: '',
        schedules: [
            {
                video: 'video 1',
                start: 0,
                end: 0,
            },
        ]
    }

    handleScreenChange = (name, value) => {
        this.setState({ screenName : value });
    }

    handleScheduleChange = (index, name, value) => {
        const schedules = this.state.schedules;
        const scheduleToModify = schedules[index];

        scheduleToModify[name] = value;
        schedules[index] = scheduleToModify;

        this.setState({schedules}, () => {
            console.log(this.state.schedules[index]);
        });
    }


    handleChange = (event) => {
        this.setState({ name: event.target.value});
    }


    sendApplyNow = () => {
        console.log("entraaa");
        console.log(this.state.screenName);

        this.setState(prevState => {
            name2render= this.state.name;
            screen2Push= this.state.screenName;
            videoRender= this.state.schedules[0].video;
            
            if (name2render === ""){
                alert("Fill all the inputs!");
            }  

            else {
                if (screen2Push === "All Screens" ){
                    for (let i=1; i<=3 ; i++){
                        firebaseApp.database().ref().child(`BirthdaySection/Screen${i}`)
                        .update({ "birthdayPerson": name2render,
                                "videoName": videoRender,
                                "Trigger": 2 });  
                        
                    }
                }
        
               else{
                    screen2Push= screen2Push.replace(" ",""); 

                    firebaseApp.database().ref().child(`BirthdaySection/${screen2Push}`)
                    .update({ "birthdayPerson": name2render,
                            "videoName": videoRender,
                            "Trigger": 2 });                      
                }
            
            }
        });

        window.location.reload();
    }



    sendToDb = () => {
        console.log("Clicked!")
        this.setState(prevState => {
        
        name2render= this.state.name;

        if (name2render === ""){
            alert("Fill all the inputs!")
        }  
        
        else {
                if (this.state.schedules[0].start === "" ||
                    this.state.schedules[0].end === "" ||
                    this.state.screenName === "" ||
                    this.state.schedules[0].video === "") {
                    alert("Not valid entry!, fill all the inputs")
                }
    
                if (this.state.schedules[0].start !== "" && this.state.schedules[0].end !== "" &&
                    this.state.screenName !== "" && this.state.schedules[0].video !== "") {
    
                    //pull states
                    startTime = this.state.schedules[0].start;
                    endTime = this.state.schedules[0].end;
                    console.log('StartTime',startTime);
    
                    //negative indexes
                    startHr = startTime.slice(0, -3);
                    startMin = startTime.slice(-2);
    
                    IntStartHr = parseInt(startHr,10);
                    IntStartMin = parseInt(startMin,10);
    
                    endHr = endTime.slice(0, -3);
                    endMin = endTime.slice(-2);
    
                    IntEndtHr = parseInt(endHr,10);
                    IntEndMin = parseInt(endMin,10);
    
                    if (IntStartHr > IntEndtHr) {
                        alert('Invalid Schedule');
                    }
    
                    if (IntStartHr === IntEndtHr && IntStartMin > IntEndMin) {
                        alert('Invalid Schedule');
                    }
    
                    if (IntStartHr === IntEndtHr && IntStartMin === IntEndMin) {
                        alert('Invalid Schedule');
                    }
    
                    else {
                        screen2Push= this.state.screenName;
    
                        if (screen2Push === 'All Screens' ){
                            for (let i=1; i<=3 ; i++){
                                firebaseApp.database().ref().child(`BirthdaySection/Screen${i}`)
                                .update({ "birthdayPerson": name2render,
                                        "videoName": this.state.schedules[0].video +'.mp4',
                                        "startTime": this.state.schedules[0].start,
                                        "endTime": this.state.schedules[0].end,
                                        "Trigger": 1 });  
                            }
                        }   
    
                        else{
                            screen2Push= screen2Push.replace(" ",""); 
                                                        
                            firebaseApp.database().ref().child(`BirthdaySection/${screen2Push}`)
                            .update({ "birthdayPerson": name2render,
                                       "videoName": this.state.schedules[0].video +'.mp4',
                                       "startTime": this.state.schedules[0].start,
                                       "endTime": this.state.schedules[0].end,
                                      "Trigger": 1 });   
                            
                        }
                    }
                }
             
            }
        });
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
                                
                                <div className="col s12" >
                                    <p>Lorem ipsum dolor sit gmet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.</p>
                                    
                                        <div className="videoModal">
                                            <ReactPlayer
                                            url='https://www.youtube.com/watch?v=JnFW32XA7pk' 
                                            className='react-player'
                                            />
                                        </div>

                                </div>
                                                                
                            </Modal>
                        </span>
                    
                    </div>


                    <div className="col s12">
                           <p className="subtitlesHead2"> Select a screen for trigger </p>
                        
                        <DropdownScreen 
                            handleChange={this.handleScreenChange}
                            name="video"
                            items={screenName}
                        />
                    </div>


                    <div className="col s12">
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
                    </div>
                </div>
                
                <div className = "row">  
                    <div className="col s12">
                         <p className="subtitlesHead4"> Enter input  </p>
                        <input className="inputName" 
                                ref={input => { this.textInput = input; }}
                                type="text" value={this.state.value} 
                                onChange={this.handleChange} 
                        />
                    </div>
                </div>


                <div className = "row">    
                    <div className="col s6">
                            <Button  
                                onClick={() => {
                                    this.sendToDb();
                            }}
                            type="submit" value="Apply"> Apply! </Button>
                    </div>

                    <div className="col s6">
                            <Button  
                                onClick={() => {
                                    this.sendApplyNow();
                            }}
                            type="submit" value="Apply"> Apply NOW! </Button>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default HBDPromo;
