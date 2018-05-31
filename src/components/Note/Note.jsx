import React, {Component} from 'react';
import './Note.css';

class Note extends Component {
    constructor(props){
        super(props);

        this.noteContent = props.noteContent;
        this.noteId= props.noteId;

    }


    handleRemove(id){
        //console.log(id);
        alert('this is going to be deleted!');
        const response = window.confirm('Are you sure?')
        
        if (response){
            this.props.removeNote(id);
        }

        return;
    }

    render(){
        return (
            <div className="Note"> 
                <span
                    //función anónima
                    onClick={() => this.handleRemove(this.noteId)}
                > 
                &times; 
                </span>
                <p> {this.noteContent} </p>
            </div>
        )
    }
}

export default Note;