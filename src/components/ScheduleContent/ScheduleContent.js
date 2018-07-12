import React, { Component, Fragment } from 'react';
import './ScheduleContent.css';
import { Row, Button } from 'react-materialize';
import Dropdown from '../Dropdown/Dropdown';
import DropdownScreen from '../DropdownScreen/DropdownScreen'

import firebase from 'firebase';
import 'firebase/database';
import firebaseApp from '../../firebase/firebaseApp';

//concat mp4 format
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
let screen2Push;
let arrayVideos= [];
let arrayScreens= [];
let screenName2;
let videoName2;
let initialVideos;

let response= [];

const videoName = [
    { name: 'video 1', key: 1 },
    { name: 'video 2', key: 2 },
    { name: 'video 3', key: 3 },
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

class SchedulerContent extends Component {

    state = {
        scheduleValue: '',
        dayOfWeek: '',
        videos: '',
        indexState: '',
        value: 'coconut',
        screenName: 'Screen1',
        listOfSchedule: [],
        screens: [],
        screenList: [],
        videoList: [],
        schedules: [
            {
                video: 'video 1',
                start: '00:00',
                end: '00:00',
            },
        ]
    }

    componentDidMount() {
        screenName2 = this.state.screenName;
        videoName2 = "";
        initialVideos;

        firebaseApp.database().ref(`Inventory/${screenName2}/`) // videos per screen
        .on('value', (data) => {
              let values = data.val();
              this.setState({ videos: values }, () => {
                arrayVideos = [];
                arrayScreens = [];
                Object.keys(this.state.videos).map((key, index) => {
                    initialVideos = this.state.videos[key]
                    videoName2= initialVideos.name;
                    arrayVideos.push({name: videoName2, key:key});  
                    this.setState({videoList: arrayVideos }) ; 
              }
            );
            });
          }, (err) => {
              console.log(err);
          });

        firebaseApp.database().ref(`Inventory`) //screens
        .on('value', (data) => {
            let values = data.val();
            this.setState({ screens: values }, () => {
              arrayScreens=[];
              Object.keys(this.state.screens).map((key, index) => {
                  arrayScreens.push({name: key, key:index}); 
                  this.setState({screenList: arrayScreens }); 
             }
          );
          });

        }, (err) => {
            console.log(err);
        });
    }

    selectAll = () => { //Select all screens!
        console.log("Select all screens!");
        alert("Selected all screens")
        this.setState({screenName: "all"});
    }


    addSchedule = () => {
        const schedules = this.state.schedules;
        if (schedules.length > 3) return;

        this.setState(prevState => ({
            schedules: [...schedules, {
                video: 'video 1',
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
        
    }

    handleScreenChange = (name, value) => {
        this.setState({ screenName: value }, () => { //change videos to show in dropdown
            firebaseApp.database().ref(`Inventory/${value}/`) // videos per screen
            .on('value', (data) => {
                arrayVideos = [];
                arrayScreens = [];
                
                let values = data.val();
                this.setState({ videos: values }, () => {
                    console.log
                    Object.keys(this.state.videos).map((key, index) => {
                        initialVideos = this.state.videos[key]
                        videoName2= initialVideos.name;
                        arrayVideos.push({name: videoName2, key:key});  
                        this.setState({videoList: arrayVideos }) ; 
                        }
                    );
                });
            }, (err) => {
                console.log(err);
            });
        });
    }

    removeSchedule = (index) => {
        if (this.state.schedules.length === 1) return;

        let schedules = [...this.state.schedules];
        schedules.splice(index, 1);

        this.setState({
            schedules: [...schedules],
        });

    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state.schedules, this.props.dayIndex);
    }
    
    sendToDb = () => {

        console.log("screenName", this.state.screenName);
        console.log("this.state.schedules[0].start", this.state.schedules[0].start);
        console.log("this.state.schedules[0].end", this.state.schedules[0].end);
        console.log("this.state.schedules[0].video", this.state.schedules[0].video);
        console.log("this.props.dayIndex", this.props.dayIndex);
        
        
        this.setState(prevState => {
        
        for (let i=0; i < this.state.schedules.length; i++ ){
                if (this.state.schedules[0].start === "" ||
                    this.state.schedules[0].end === "" ||
                    this.state.screenName === "" ||
                    this.state.schedules[0].video === "") {
                    alert("Not valid entry!, fill all the inputs")
                }

                if (this.state.schedules[0].start !== "" && this.state.schedules[0].end !== "" &&
                    this.state.screenName !== "" && this.state.schedules[0].video !== "") {

                    startTime = this.state.schedules[0].start;
                    endTime = this.state.schedules[0].end;
                    
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
                            
                            screen2Push="all";
                            
                            response.push({
                                scheduleIndex: 'schedule'+ (i+1),
                                dayIndex:this.props.dayIndex,
                                screen: screen2Push,
                                video: this.state.schedules[i].video +'.mp4',
                                start:this.state.schedules[i].start,
                                end: this.state.schedules[i].end,
                                scheduleSelected: this.state.scheduleSelected,
                            });
                                
                          
                            this.props.updateScheduler(response);

                        }   

                        else{
                            console.log("entra else")
                            screen2Push= screen2Push.replace(" ",""); 
                            
                            response.push({
                                scheduleIndex: 'schedule'+ (i+1),
                                dayIndex:this.props.dayIndex,
                                screen: screen2Push,
                                video: this.state.schedules[i].video +'.mp4',
                                start:this.state.schedules[i].start,
                                end: this.state.schedules[i].end,
                            });
                                
                            this.props.updateScheduler(response);
                        }


                    }

                }
             }
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

                    <div className="row ">
                        <div className="col s12">
                            <div className="col s6">
                                <p className="subtitlesHeadSchedule "> Select a screen  </p>
                                <DropdownScreen
                                    handleChange={this.handleScreenChange}
                                    name="video"
                                    items={this.state.screenList}
                                />
                            </div>
                            <div className="col s6">
                                <div className="btnMargin">
                                    <Button  
                                        onClick={() => {
                                            this.selectAll();
                                        }}
                                        type="submit" value="Apply"> All Screen 
                                    </Button>
                                </div>
                            </div>
                        </div>
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
                                            <p className="subtitlesHead2"> Video name </p>
                                            <Dropdown
                                                handleChange={this.handleScheduleChange}
                                                name="video"
                                                index={index}
                                                items={this.state.videoList} />
                                        </Row >
                                    </div>

                                    <div className="col s4">
                                        <Row >
                                            <p className="subtitlesHead2" > Start time </p>
                                            <Dropdown handleChange={this.handleScheduleChange} name="start" index={index} items={timeNumber} />
                                        </Row >
                                    </div>

                                    <div className="col s4">
                                        <Row >
                                            <p className="subtitlesHead2"> End time </p>
                                            <Dropdown handleChange={this.handleScheduleChange} name="end" index={index} items={timeNumber} />
                                        </Row >
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col s6">
                                        <Button onClick={() => this.addSchedule()} > Add </Button>
                                    </div>

                                    <div className="col s6">
                                        <Button onClick={() => this.removeSchedule(index)}>Remove </Button>
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
                            > Apply </Button>
                    </div>
                </div>

            </div >
        )
    }
}
export default SchedulerContent;
