import React, { Component } from 'react';
import './App.css';
// set database config   "npm i firebase"
import Toolbar from './components/Toolbar/Toolbar';
import Login from './components/Login/Login';
import firebaseApp from './firebase/firebaseApp';

class App extends Component {
  state = {
    notes: [],
    trigger: '',
    user: null,
  };

  constructor() {
    super();

    this.app = firebaseApp;
    this.db = this.app.database().ref().child('Scheduler');

  }
    
  componentDidMount() {
    this.authListener();
    //this.showSchedules();
     
  }

  authListener = () => {
    this.app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
      else {
        this.setState({ user: null })
      }
    });
  }

  updateScheduler = (schedulerArray) => {

    for(let i=0 ; i < schedulerArray.length; i ++ ){
        console.log("schedulerArray.length", schedulerArray.length);
        console.log("i", i);

        if(schedulerArray[i].screen === "all"){  
          for(let j=1; j<= 3; j++){
              this.db.child("Screen"+ j + '/').child(schedulerArray[i].dayIndex + '/' )
                .child(schedulerArray[i].scheduleIndex+'/').update({    "VideoName": schedulerArray[i].video,
                                                                      "startTime": schedulerArray[i].start,
                                                                      "endTime": schedulerArray[i].end,
                                                                  });
              }
        }

        else{
        this.db.child(schedulerArray[i].screen + '/').child(schedulerArray[i].dayIndex + '/' )
          .child(schedulerArray[i].scheduleIndex+'/').update({    "VideoName": schedulerArray[i].video,
                                                                "startTime": schedulerArray[i].start,
                                                                "endTime": schedulerArray[i].end,
                                                            });
        }
        
    }

    window.location.reload();

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

        {this.state.user ? (<Toolbar 
          updateAnnouncement={this.updateAnnouncement}
          updateLoopPromo={this.updateLoopPromo}
          updatePowerSettings= {this.updatePowerSettings}
          updateScheduler= {this.updateScheduler}
          showSchedules= {this.showSchedules}
        />) : (<Login />)}

      </div>


    );
  }
}

export default App;
