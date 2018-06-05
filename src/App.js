import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';

// set database config   "npm i firebase"
import firebase from 'firebase';
import { DB_CONFIG } from "./config/config";
import 'firebase/database';

class App extends Component {

  constructor(){
    super();
    this.state = {
      poncho:1,
      notes: [],
      trigger:''
    };

    this.addHBDName = this.addHBDName.bind(this);
    this.bdayScreenName = this.bdayScreenName.bind(this);
    this.setNewTrigger=this.setNewTrigger.bind(this);
    this.addStartTime=this.addStartTime.bind(this);
    this.addEndTime=this.addEndTime.bind(this);
    this.loopPromoScreen= this.loopPromoScreen.bind(this);

    this.app= firebase.initializeApp(DB_CONFIG);

    this.db= this.app.database().ref().child('BirthdaySection'); 
    //this.db2= this.app.database().ref().child('birthdayScreen'); 
    this.db3= this.app.database().ref().child('Trigger'); 
    this.db4= this.app.database().ref().child('Schedule'); 

  }

  componentDidMount(){
    const {notes}= this.state;  
    
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({notes});
      this.setState({})
    });
    
  }

  addHBDName(name){
    this.db.push().set({birthdayPerson:name});
  }

  bdayScreenName (screen){
    this.db.push().set({screenName:screen});
  }

  setNewTrigger(newTrigger){
    this.db3.push().set({trigger:newTrigger});
  }

  addStartTime(time){
    this.db4.push().set({startTime:time});
  }

  addEndTime(time){
    this.db4.push().set({EndTime:time});
  }

  loopPromoScreen(screen){
    this.db4.push().set({screenName:screen});
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
        
        
        <Toolbar addHBDName={this.addHBDName}
                 bdayScreenName={this.bdayScreenName}
                 setNewTrigger={this.setNewTrigger}
                 addStartTime ={this.addStartTime}
                 addEndTime ={this.addEndTime}
                 loopPromoScreen={this.loopPromoScreen}

        />    
        

      </div>
      
    );
  }
}

export default App;
