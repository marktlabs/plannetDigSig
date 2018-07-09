import React, { Component } from 'react';
import DropdownScreen from '../DropdownScreen/DropdownScreen';
import {Table, Button, Modal, Icon} from 'react-materialize';
import { Line } from 'rc-progress';

import firebase from 'firebase';
import 'firebase/database';
import './UploadVideo.css';
import firebaseApp from '../../firebase/firebaseApp';

let storageRef;
let screenIndex;
let logFilesRef;
let url_database;
let progress=10;
let screenName2;
let initialVideos;

let arrayVideos = [];

let screenName = [
    { name: 'Screen 1', key: 1 },
    { name: 'Screen 2', key: 2 },
    { name: 'Screen 3', key: 3 },
];


class UploadVideo extends Component {
    state = {
        selectedVideo: null,
        screenName: "Screen1",
        showResults: false,
        percent:0 ,
        videos: [],
        deleteVideo: [],
        videoList: [
           // { name: "licuado1.png", key: "-LGWzDkUc4sE8ukexn4u"}
        ]
    }

    handleVideoChange = (name, value) => {
        this.setState({ deleteVideo: value });
    }


    componentDidMount() {
        storageRef= firebase.storage().ref();
        console.log("initialize!")

        storageRef= firebaseApp.storage().ref();
        logFilesRef= firebaseApp.database().ref().child("Inventory");

        screenName2 = this.state.screenName;
        screenName2= screenName2.replace(" ",""); 
        let videoName2 = "";

        console.log("the screen value is: ",screenName2 );

          firebaseApp.database().ref(`Inventory/${screenName2}/`)
          .on('value', (data) => {
              let values = data.val();
              //console.log("values", values);
              
              this.setState({ videos: values }, () => {
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
         
    }

    showVideos = () => {
       
        this.setState({ showResults: true});

        screenName2 = this.state.screenName;
        screenName2= screenName2.replace(" ",""); 

        firebaseApp.database().ref(`Inventory/${screenName2}/`)
            .on('value', (data) => {
                let values = data.val();
                console.log("values", values);
                this.setState({ videos: values });

            }, (err) => {
                console.log(err);
            });
    }
    componentWillUnmount() {
        clearInterval(this.state.videos);
        clearInterval(this.state.screenName);
        clearInterval(this.state.videoList);
    
    }

    deleteVideo = () => {
        // Create a reference to the file to delete
        //var desertRef = storageRef.child('images/desert.jpg');
        
        var desertRef = storageRef.child('imagenes/'+ 'Screen1' +'/'+ 'meme.jpeg')
        
        // Delete the file
        desertRef.delete().then(function() {
        // File deleted successfully
            console.log("deleted!");
            logFilesRef.child('Screen1').orderByChild('name').equalTo('meme.jpeg').once('value').then(function(snapshot) {
                console.log(snapshot.val());
                //var key = snapshot.key; 
               
                let key = Object.keys(snapshot.val())[0];
                console.log("the key is ",key)
    
                logFilesRef.child('Screen1').child(key).remove();
            });
           
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        });
    }

    handleScreenChange = (name, value) => {
        let videoName2 = "";
        arrayVideos = [];
        this.setState({ screenName: value});
        console.log("value",value);

        screenName2 = value;
        screenName2= screenName2.replace(" ",""); 
        
        console.log("the screen value is: ",screenName2 );

        firebaseApp.database().ref(`Inventory/${screenName2}/`)
          .on('value', (data) => {
              let values = data.val();
              console.log("values", values);
              this.setState({ videos: values }, () => {
                Object.keys(this.state.videos).map((key, index) => {
                    initialVideos = this.state.videos[key]
                    videoName2= initialVideos.name;
                    console.log("videoName2", videoName2);
                    console.log("key",key);
                    arrayVideos.push({name: videoName2, key: key});    
                    this.setState({videoList: arrayVideos }) ; 
              }
            );
         
            });

          }, (err) => {
              console.log(err);
          });

    }

    filesSelectedHandler = (event) => {
      
       this.setState({
           selectedVideo: event.target.files[0]
       })

    }

    fileUploadHandler = () => {  
       progress=10;     
       const fd= new FormData();
       let videoName;
       let videoNameDB;
        console.log(this.state.selectedVideo);
       if(this.state.selectedVideo == null){
           alert("enter a video to upload");
       }

       else {
        fd.append('image', this.state.selectedVideo, this.state.selectedVideo.name);
        console.log("path",this.state.selectedVideo);
        console.log("videoName",this.state.selectedVideo.name);
        
        
        //cambiar el nombre para subir a firebase
        videoName= this.state.selectedVideo.name;
        videoNameDB= this.state.selectedVideo.name;
        //videoName= videoName.replace(" ",""); 

        let videoSize= this.state.selectedVideo.size;
        videoSize= videoSize/1000000;
        videoSize= `${videoSize}MB`;
        //console.log("the video size is: ", videoSize);

        screenIndex= this.state.screenName;
        screenIndex= screenIndex.replace(" ",""); 
        //console.log("screenIndex",screenIndex);
    
            let uploadTask= storageRef.child('imagenes/'+ screenIndex +'/'+ videoName).put(this.state.selectedVideo);

            uploadTask.on('state_changed',
                function(snapshot){
                    //progress bar
                    progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    //this.setState({ percent: progress });
                    //console.log(this.state.percent);

                }, function(error){
                    alert("hubo un error")

                }, function(){
                    //success callback
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at ', downloadURL);
            
                        //crearNodoEnBDFirebase(this.state.selectedVideo.name,downloadURL,screenName);
                        logFilesRef.child(screenIndex).push({ name: videoNameDB, 
                                                            size: videoSize, 
                                                            url: downloadURL});
                        
                    });

                }
            )

        }
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

                <div className="row">
                    <div className=" col s6">
                                <p className="subtitlesHead2"> Select the screen for scheduling content </p>
                                <DropdownScreen 
                                    handleChange={this.handleScreenChange}
                                    name="video"
                                    items={screenName}
                                />
                    </div>

                    <div className= "col s6">   
                        <div className= "col s4">
                            <label> 
                                    <input type="file"  
                                    className="inputName" 
                                    onChange={this.filesSelectedHandler} 
                                    id={this.state.videoName}
                                    />           
                            </label>
                        </div>

                        <div className="col s8">
                            <br/> 
                            <Button className="updateBtn" onClick={() => {
                                  this.fileUploadHandler();}}
                                >Upload File </Button>     
                        </div>

                        <div>
                        <Line percent={progress} strokeWidth="2" strokeColor="#14a76c" />
                        </div>
            
                    </div>
                </div>

                <div className="row">
                  <div className="col s12">
                    <p> Click on the following button to see the current videos per each screen</p>
                        <br/>
                        <Button onClick={() => {
                            this.showVideos();}}
                            > Show Videos </Button>     
                  </div>
                </div>      
                
                { this.state.showResults ? (
                    <div className="row">
                            <div className="pageCenter">
                                <Table className="quickTable">
                                    <thead>
                                        <tr>
                                            <th> Video Name</th>
                                            <th> Size </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                         {
                                            Object.entries(this.state.videos).map(([key, videos]) => (
                                                <tr key={key} >
                                                    <td> {videos.name}</td>
                                                    <td> {videos.size} </td>
                                                </tr>

                                            ))
                                        }
                                    </tbody>

                                </Table>
                            </div>
                     </div>) : <br/>
                }
            
            </div>
        )
    }
}
export default UploadVideo;



