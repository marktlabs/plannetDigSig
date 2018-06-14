import React, { Component } from 'react';
import './App.css';
// set database config   "npm i firebase"
import firebase from 'firebase';
import { DB_CONFIG } from "./config/config";
import 'firebase/database';

import Toolbar from './components/Toolbar/Toolbar';
import Login from './components/Login/Login';


class App extends Component {

    state = {
        poncho: 1,
        notes: [],
        trigger: '',
        user: null,
    };

    constructor() {
        super();

        this.app = firebase.initializeApp(DB_CONFIG);
        this.db = this.app.database().ref().child('BirthdaySection');
        this.db2 = this.app.database().ref().child('PowerSettings');
        this.db3 = this.app.database().ref().child('Trigger');
        this.db4 = this.app.database().ref().child('LoopPromo');
        this.db5 = this.app.database().ref().child('Scheduler');
    }



    componentDidMount() {
        this.authListener();
    }

    authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
            else {
                this.setState({ user: null })
            }
        });
    }

    addHBDName = (name) => {
        //this.db.push().set({birthdayPerson:name});
        this.db.update({ birthdayPerson: name });
    }

    bdayScreenName = (screen) => {
        this.db3.update({ screenName: screen });
    }

    setNewTrigger = (newTrigger) => {
        this.db3.update({ trigger: newTrigger });
    }

    addStartTime = (time) => {
        this.db4.update({ startTime: time });
    }

    addEndTime = (time) => {
        this.db4.update({ EndTime: time });
    }

    loopPromoScreen = (screen) => {
        this.db3.update({ screenName: screen });
    }

    powerScreenName = (screen) => {
        this.db3.update({ screenName: screen });
    }

    powerON = (boolval) => {
        this.db2.update(({ value: boolval }));
    }

    powerOFF = (boolval) => {
        this.db2.update(({ value: boolval }));
    }

    submitSchedules = (scheduleList, dayIndex) => {
        // Mandarselo a la rasp

    }

    //insert en la db
    verifyDayOfWeek = (day) => {
        console.log("juat")




        //  this.db3.update({ trigger: newTrigger });

        //this.db2.update(({ value: boolval }));
    }

    schedulerSection = (array, array1, array2, array3) => {

        /*
        console.log("is here!", array);
        console.log("ScreenName",array[0]);
        console.log("VideoName",array[1]);
        console.log("StartTime",array[2]);
        console.log("EndTime",array[3]);
        */

        //this.db5.child("Scheduler").child("Screen").update({"screenName": array[0]});

        //this.db5.child("Scheduler").child(array[0]).child(array[4]).update({"VideoName": array[0]});

        console.log("array1", array);
        console.log("array2", array1);
        console.log("array3", array2);
        console.log("array4", array3);

        //array[4] day of the week
        //array[0] screenName
        //array[1] videoName
        //array[2] startTime
        //array[3] endTime


        // per schedule

        this.db5.child(array[0]).child(array[4]).child("schedule1").update({ "VideoName": array[1] });
        this.db5.child(array[0]).child(array[4]).child("schedule1").update({ "startTime": array[2] });
        this.db5.child(array[0]).child(array[4]).child("schedule1").update({ "endTime": array[3] });

        this.db5.child(array[0]).child(array[4]).child("schedule2").update({ "VideoName": array[1] });
        this.db5.child(array[0]).child(array[4]).child("schedule2").update({ "startTime": array[2] });
        this.db5.child(array[0]).child(array[4]).child("schedule2").update({ "endTime": array[3] });

        this.db5.child(array[0]).child(array[4]).child("schedule3").update({ "VideoName": array[1] });
        this.db5.child(array[0]).child(array[4]).child("schedule3").update({ "startTime": array[2] });
        this.db5.child(array[0]).child(array[4]).child("schedule3").update({ "endTime": array[3] });

        this.db5.child(array[0]).child(array[4]).child("schedule4").update({ "VideoName": array[1] });
        this.db5.child(array[0]).child(array[4]).child("schedule4").update({ "startTime": array[2] });
        this.db5.child(array[0]).child(array[4]).child("schedule4").update({ "endTime": array[3] });

    }




    render() {
        return (

            <div className="notesContainer">
                <div className="notesHeader">
                    <h1>
                        Digital Signage Management
          </h1>
                    <h5>Change your screen's content from a web</h5>
                </div>

                {this.state.user ? (<Toolbar addHBDName={this.addHBDName}
                    bdayScreenName={this.bdayScreenName}
                    setNewTrigger={this.setNewTrigger}
                    addStartTime={this.addStartTime}
                    addEndTime={this.addEndTime}
                    powerScreenName={this.powerScreenName}
                    powerON={this.powerON}
                    powerOFF={this.powerOFF}
                    loopPromoScreen={this.loopPromoScreen}
                    verifyDayOfWeek={this.verifyDayOfWeek}
                    schedulerSection={this.schedulerSection}
                    submitSchedules={this.submitSchedules}
                />) : (<Login />)}


                {/*
        <Toolbar addHBDName={this.addHBDName}
                                      bdayScreenName={this.bdayScreenName}
                                      setNewTrigger={this.setNewTrigger}
                                      addStartTime={this.addStartTime}
                                      addEndTime={this.addEndTime}
                                      powerScreenName={this.powerScreenName}
                                      powerON={this.powerON}
                                      powerOFF={this.powerOFF}
                                      loopPromoScreen={this.loopPromoScreen}
                                      verifyDayOfWeek={this.verifyDayOfWeek}
                                      schedulerSection={this.schedulerSection}
                                      submitSchedules= {this.submitSchedules}
                                />
        */}

            </div>


        );
    }
}

export default App;
