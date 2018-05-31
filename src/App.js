import React, { Component } from 'react';
import './App.css';
import Note from './components/Note/Note';
import NoteForm from './components/NoteForm/NoteForm';

// set database config   "npm i firebase"
import firebase from 'firebase';
import { DB_CONFIG } from "./config/config";
import 'firebase/database';

class App extends Component {

  constructor(){
    super();
    this.state = {
      notes:[
       // {noteId:1, noteContent: 'note1'},
       // {noteId:2, noteContent: 'note2'}
      ]
    };
    this.addNote= this.addNote.bind(this);
    this.removeNote= this.removeNote.bind(this);

    //connection to firebase
    this.app= firebase.initializeApp(DB_CONFIG);
    //connection to "table" notes
    this.db= this.app.database().ref().child('notes'); 
  }

  //cambiar el estado de los componentes con firebase
  
  componentDidMount(){
    //const notes= this.state.notes;  Forma 1
    //forma 2:
    const {notes}= this.state;   //quiero del estado las notas
    
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

  removeNote(noteId){
    this.db.child(noteId).remove();
  }

  addNote(note){

    /*
    let { notes } = this.state;
    //push, método de arreglo
    notes.push({
      noteId: notes.length + 1,
      noteContent: note
    })
    this.setState({notes});
    */

    this.db.push().set({noteContent:note});

  }
  
  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader"> 
          <h1> React and firebase </h1>
        </div>

        <div className="notesBody"> 
          <ul>
          { 
            this.state.notes.map(note => {
              return(
                <Note
                  noteContent={note.noteContent}
                  noteId={note.noteId}
                  key={note.noteId}
                  //this.removeNote, hace referencia al método que se definió arriba,
                  //lo mismo pasa con el método addNote, que se utiliza en NoteForm
                  removeNote= {this.removeNote}
                />
              )
            })
          }
          </ul>
        </div>
        
        <div className="notesFooter"> 
          <NoteForm addNote={this.addNote}/>
        </div>

      </div>
    );
  }
}

export default App;
