import React, { Component } from 'react';
import DropdownScreen from '../DropdownScreen/DropdownScreen';
import {Table, Button, Modal, Icon, ProgressBar} from 'react-materialize';
import './UploadVideo.css';

import firebase from 'firebase';
import 'firebase/database';
import firebaseApp from '../../firebase/firebaseApp';

let storageRef;
let uploaded_videos;
let screenIndex;
let logFilesRef;
let videosRef;
let url_database;
let progress=0;
let screenName2;
let initialVideos;
let videoSize=0;
let videoName3;

let arrayPerScreen = [];
let arrayVideos = [];
let arrayScreens= [];

class UploadVideo extends Component {
    state = {
        selectedVideo: null,
        screenName: "Screen1",
        screens: "Screen1",
        size: 0,
        showResults: false,
        percent: null ,
        videos: [],
        videoList: [],
        video2: [],
        videoListPerScreen: [],
        addContentTo: null,
        screenList: []
    }

    componentDidMount() {
        
        storageRef= firebase.storage().ref();
        logFilesRef= firebaseApp.database().ref().child("Inventory");
        videosRef= firebaseApp.database().ref().child("General_Inventory");
        uploaded_videos= firebaseApp.database().ref().child("Uploaded_Videos");

        screenName2 = this.state.screenName;
        screenName2= screenName2.replace(" ",""); 
        let videoName2 = "";
       
        firebaseApp.database().ref(`General_Inventory/`) //show all videos
          .on('value', (data) => {
              let values = data.val();
              this.setState({ videos: values }, () => {
                Object.keys(this.state.videos).map((key, index) => {
                    initialVideos = this.state.videos[key];
                    videoName2= initialVideos.name;
                    arrayVideos.push({name: videoName2, key:key});    
                    
                    this.setState({videoList: arrayVideos }) ; 
                    }
                  );
                });
             }, (err) => {
              console.log(err);
        });

          firebaseApp.database().ref(`Inventory/${screenName2}/`) //show videos per screen
          .on('value', (data) => {
              let values2 = data.val();
              let videoNamePerScreen;

              this.setState({ videos2: values2 }, () => {
                arrayPerScreen= [];
                Object.keys(this.state.videos).map((key, index) => {
                    initialVideos = this.state.videos[key]
                    videoNamePerScreen= initialVideos.name;
                    arrayPerScreen.push({name: videoNamePerScreen, key:key}); 
                       
                    this.setState({videoListPerScreen: arrayPerScreen }) ; 
                    }
                  );
                });

                //console.log("arrayPerScreen", arrayPerScreen);
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

    showVideos = () => {
        this.setState({ showResults: true});

        screenName2 = this.state.screenName;
        screenName2= screenName2.replace(" ",""); 

        firebaseApp.database().ref(`Inventory/${screenName2}/`)
            .on('value', (data) => {
                let values = data.val();
                this.setState({ videos: values });

            }, (err) => {
                console.log(err);
            });
    }
   

    handleScreenChange = (name, value) => {
        let videoName2 = "";
        arrayVideos = [];
        this.setState({ screenName: value});

        screenName2 = value;
        screenName2= screenName2.replace(" ",""); 

        firebaseApp.database().ref(`Inventory/${screenName2}/`)
          .on('value', (data) => {
              let values = data.val();
              
              this.setState({ videos: values }, () => {
                Object.keys(this.state.videos).map((key, index) => {
                    initialVideos = this.state.videos[key]
                    videoName2= initialVideos.name;
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

    handleVideoChange = (name, value) => {
        console.log("CHANGE VIDEO SCREEEEEEEEEEN");
        this.setState({ addContentTo: value});
        console.log("addContentTo",value);
    }


    filesSelectedHandler = (event) => {
      
       this.setState({
           selectedVideo: event.target.files[0]
       })

    }

    applyScreen = () => {   
        
        if (this.state.addContentTo === null){
            alert("Browse a video to upload")
        }

        else{
            screenIndex= this.state.screenName;
            screenIndex= screenIndex.replace(" ","");             
            videoName3= this.state.addContentTo;
         
            logFilesRef.child(`${screenIndex}`).push({ name: videoName3
            }).on('child_added', function(snap) {
                    videoName3= videoName3.replace(/\s/g,'');
                    uploaded_videos.child(`${screenIndex}`).update({
                                                                Trigger: 1,
                                                                Video_Name: videoName3
                                                                });
              });

            alert('Send to ' + `${screenIndex}`);
            
        }
       
        
    }

    applyAll = () => {
        let numberOfChildren;

        if (this.state.addContentTo === null){
            alert("Browse a video to upload")
        }

        else{
            
            videoName3= this.state.addContentTo;
            
            logFilesRef.once('value', function(snapshot) {
               numberOfChildren= snapshot.numChildren(); //get number of immediate children
               let i=0
               snapshot.forEach(function(snap){
                    i=i+1;
                    logFilesRef.child(`Screen${i}`).push({ name: videoName3})
                                .on('child_added', function(snap) {
                                    videoName3= videoName3.replace(/\s/g,'');
                                    uploaded_videos.child(`Screen${i}`)
                                                        .update({ Trigger: 1,
                                                                  Video_Name: videoName3 });
                                                        });
                                            
               });
            })
            alert('Send to all screens');
        }
        
    }


    fileUploadHandler = () => {         
       const fd= new FormData();
       let videoName;
       let videoNameDB;
       
       if(this.state.selectedVideo == null){
           alert("enter a video to upload");
       }

       else {
        fd.append('image', this.state.selectedVideo, this.state.selectedVideo.name);
        videoName= this.state.selectedVideo.name;
        videoNameDB= this.state.selectedVideo.name;
        videoName= videoName.replace(/\s/g,'');
        videoSize= this.state.selectedVideo.size;
        videoSize= videoSize/1000000;
        videoSize= `${videoSize}MB`; 
        screenIndex= this.state.screenName;
        screenIndex= screenIndex.replace(" ",""); 
        
        let uploadTask= storageRef.child(`videosInventory/${videoName}`).put(this.state.selectedVideo);
        const self = this;

        uploadTask.on('state_changed',
            function(snapshot){
                progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log('Upload is ' + progress + '% done');
                self.setState({percent: progress }) ; 
              

            }, function(error){
                alert("hubo un error")

            }, function(){  //success callback
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    //console.log('File available at ', downloadURL);
                    videosRef.push({ name: videoNameDB, 
                                    size: videoSize, 
                                    url: downloadURL});
                    
                });
            }
        )}
    }

    render() {
        return (
            <div className="PromoLoop" >
               
                <div>
                    <h2 className="headerScheduler"> Upload Content </h2> 

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
                    <div className="Scheduler">
                        <div className= "col s12 Scheduler">  
                            <p className="titleHead"> Upload new content to central directory </p>
                                <div className= "col s6 ">
                                    <label> 
                                            <input type="file"  
                                            className="inputName" 
                                            onChange={this.filesSelectedHandler} 
                                            id={this.state.videoName}
                                            />           
                                    </label>
                                
                                </div>

                                <div className="col s6">
                                    <br/> 
                                    <Button className="fixPaddingBar" onClick={() => {
                                        this.fileUploadHandler();}}
                                        >Upload File </Button> 
                                        <br/>
                                </div>
                        </div>
                        <div className="col s12">
                                <ProgressBar progress={this.state.percent}/>
                        </div>
                    </div>
                </div>
   
               <div className="row">
                    <div className="col s12">                   
                                     
                            <p className="subtitlesHead2"> All available videos  </p>
                            <p> Please select a video to sync in screen(s) </p>
                            
                                <DropdownScreen 
                                    handleChange={this.handleVideoChange}
                                    name="video"
                                    items={this.state.videoListPerScreen}
                                />  
                       
                    </div>
                </div>
              


                <div className="row">
                    <div className=" col s6">
                                <p className="subtitlesHead2"> Select a screen </p>
                                <DropdownScreen 
                                    handleChange={this.handleScreenChange}
                                    name="video"
                                    items={this.state.screenList}
                                />
                    </div>
                </div>
            
            
                <div className="row">
                
                        <div className="col s6">
                            <p> Upload video to selected screen </p>
                            <br/>
                                <Button onClick={() => {
                                    this.applyScreen();}}
                                    > Send </Button>     
                        </div>
                    
                    
                        <div className="col s6">
                            <p> Upload video to all screens</p>
                            <br/>
                                <Button onClick={() => {
                                    this.applyAll();}}
                                    > Send All Screens! </Button>     
                        </div>
                     
                </div>

                <div className="row">
                  <div className="col s12">
                    <br/>
                    <p > Click on the following button to see the current videos per each screen</p> 
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
                                          
                                        </tr>
                                    </thead>

                                    <tbody>
                                         {
                                            Object.entries(this.state.videos).map(([key, videos]) => (
                                                <tr key={key} >
                                                    <td> {videos.name}</td>
                                                   
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



