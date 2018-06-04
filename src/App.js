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
      notes: []
    };

    this.addHBDName = this.addHBDName.bind(this);
    this.bdayScreenName = this.bdayScreenName.bind(this);
    
    this.app= firebase.initializeApp(DB_CONFIG);

    this.db= this.app.database().ref().child('birthdayName'); 
    this.db2= this.app.database().ref().child('birthdayScreen'); 
  }

  componentDidMount(){
    const {notes}= this.state;  
    
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({notes});
    });
    
    this.db.on('child_removed', snap => {
      for(let i=0; i< notes.length; i++){ //remueve del array el item con el snap.key seleccionado
        if(notes[i].noteId = snap.key){ 
          notes.splice(i,1);
        }
      }
      this.setState({notes});
    });
  }

  addHBDName(name){
    this.db.push().set({birthdayPerson:name});
    
  }

  bdayScreenName (screen){
    this.db2.push().set({screenName:screen});
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
        />    
        

      </div>
      
    );
  }
}

export default App;
