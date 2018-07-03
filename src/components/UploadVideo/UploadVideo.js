import React, { Component } from 'react';
import DropdownScreen from '../DropdownScreen/DropdownScreen';
import {Button, Modal, Icon} from 'react-materialize';
import axios from 'axios';
import { Line, Circle } from 'rc-progress';

import firebase from 'firebase';
import 'firebase/database';
import './UploadVideo.css';

let storageRef;
let screenIndex;
let fichero;
let logFilesRef;
let logFilesRef2;
let imageDownload;
let screenDownload;
let imgRef;
let url_database;
let progress=10;

const screenName = [
    { name: 'Screen 1', key: 1 },
    { name: 'Screen 2', key: 2 },
    { name: 'Screen 3', key: 3 },
];


class UploadVideo extends Component {
    state = {
        selectedVideo: null,
        screenName: "Screen1"
    }

    
    componentDidMount() {
        storageRef= firebase.storage().ref();
        console.log("initialize!")

        //version de youtube, su funciona
        url_database= "https://firebasestorage.googleapis.com/v0/b/digitalsignage-acb79.appspot.com/o/imagenes%2Fscreen2%2FScreen1_(2018-6-14)?alt=media&token=f16c0515-95ab-4fe3-981d-724dfbc141b8"

        storageRef= firebase.storage().ref();
        logFilesRef= firebase.database().ref().child("Inventory");
        logFilesRef2= firebase.database().ref().child("LogFiles/screen2/");

    }


    deleteVideo = () => {
        // Create a reference to the file to delete
        //var desertRef = storageRef.child('images/desert.jpg');
        
        var desertRef = storageRef.child('imagenes/'+ 'Screen1' +'/'+ 'meme.jpeg')
        
        logFilesRef.child('Screen1').orderByChild('name').equalTo('meme.jpeg').once('value').then(function(snapshot) {
            console.log(snapshot.val());
            //var key = snapshot.key; 
           
            let key = Object.keys(snapshot.val())[0];
            console.log("the key is ",key)

            logFilesRef.child('Screen1').child(key).remove();
        });

        // Delete the file
        desertRef.delete().then(function() {
        // File deleted successfully
            console.log("deleted!");
           
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        });
    }

    

    handleScreenChange = (name, value) => {
        this.setState({ screenName: value});
        console.log("value",value);
    }

    filesSelectedHandler = (event) => {
      
       this.setState({
           selectedVideo: event.target.files[0]
       })

    }

    fileUploadHandler = () => {       
       const fd= new FormData();
       let videoName;
       let videoNameDB;

       fd.append('image', this.state.selectedVideo, this.state.selectedVideo.name);

       console.log("path",this.state.selectedVideo);
       console.log("videoName",this.state.selectedVideo.name);
       
       //cambiar el nombre para subir a firebase
       videoName= this.state.selectedVideo.name;
       videoNameDB= this.state.selectedVideo.name;
       videoName= videoName.replace(" ",""); 
      
       screenIndex= this.state.screenName;
       screenIndex= screenIndex.replace(" ",""); 
       console.log("screenIndex",screenIndex);
       

       //verificar que el nombre no este en la DB (evitar duplicados)
      
        let uploadTask= storageRef.child('imagenes/'+ screenIndex +'/'+ videoName).put(this.state.selectedVideo);

        uploadTask.on('state_changed',
            function(snapshot){
                //progress bar
                progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               
                console.log('Upload is ' + progress + '% done');


            }, function(error){
                alert("hubo un error")

            }, function(){
                //success callback
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at ', downloadURL);
        
                    //crearNodoEnBDFirebase(this.state.selectedVideo.name,downloadURL,screenName);
                    logFilesRef.child(screenIndex).push({ name: videoNameDB, url: downloadURL});
                    
                });

            }

        )
        
        
    }

 
    render() {
        return (
            <div className="PromoLoop" >
               
                <div>
                    <h2 className="headerScheduler"> Upload New Video </h2> 

                    <span className="modalScheduler">
                            <Modal 
                            header='Modal Header'
                            trigger={<Button waves='light'>Help!<Icon right> help </Icon></Button>}>
                            <p>Lorem ipsum dolor sit agffgfgfgdgfgfgfgfgmet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.</p>
                            </Modal>
                    </span>
                
                </div>

                <div className=" col s12">
                            <p className="subtitlesHead2"> Select the screen for scheduling content </p>
                            <DropdownScreen 
                                handleChange={this.handleScreenChange}
                                name="video"
                                items={screenName}
                            />
                </div>


                <div>
                    <div className="col s6">
                    <br/>
                            <Button onClick={() => {
                                            this.deleteVideo();
                                            
                                        }}
                                    >Delete Video </Button>     
                    </div>
                </div>                
            
                    <div className= "col s6">   
                        <label> 
                                <input type="file"  
                                className="inputName" 
                                onChange={this.filesSelectedHandler} 
                                id={this.state.videoName}
                                />           
                        </label>
                    </div>
                
                    <div>
                        <Line percent={progress} strokeWidth="2" strokeColor="red" />
                    </div>

                <div className="col s6">
                <br/>
                        <Button onClick={() => {
                                        this.fileUploadHandler();
                                        
                                    }}
                                >Upload File </Button>     
                </div>
                
                 
             
            </div>
        )
    }
}
export default UploadVideo;



