import React, {Component} from 'react';
import './NoteForm.css'

class NoteForm extends Component {
    constructor(){
        super();
        this.addNote = this.addNote.bind(this);
    }

    addNote(){
        //console.log(this.textInput.value);
        this.props.addNote(this.textInput.value);
        this.textInput.value = '';
        this.textInput.focus();
    }

    render(){
        return (
        <div className = "NoteForm">  

            <input 
            //la ref se utiliza para utilizar el contenido del input en una
            //función de la clase

            ref= {input=> {this.textInput= input;}}
            placeholder="Write a note"
            type="text"/>

            <button
            onClick={this.addNote}>
                Add Note
            </button> 

        </div>
        )
    }
}

export default NoteForm;