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
let videosRef;
let url_database;
let progress=0;
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
        size: 0,
        showResults: false,
        percent: null ,
        videos: [],
        videoList: []
    }

    componentDidMount() {
        storageRef= firebase.storage().ref();
        logFilesRef= firebaseApp.database().ref().child("Inventory");
        videosRef= firebaseApp.database().ref().child("General_Inventory");

        screenName2 = this.state.screenName;
        screenName2= screenName2.replace(" ",""); 
        let videoName2 = "";

        console.log("the screen value is: ",screenName2 );

          firebaseApp.database().ref(`Inventory/${screenName2}/`)
          .on('value', (data) => {
              let values = data.val();
             
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

    getAvailableStorage = () => {
        let itemVal;
        let returnArr = [];

        /*
        logFilesRef.once('value', function(snapshot) {

            snapshot.forEach(function(snap){
                console.log(snap.val());
                let item = snap.val();
                item.key = snap.key;
                console.log("****test",snapshot.key);
                returnArr.push(item);
                console.log("returnArr", returnArr[0]["-LGkskA8KbJMVy2pQ8Rs"].size);
            });

         }, (err) => {
            console.log(err);

        });
        */

        firebaseApp.database().ref('Inventory')
        .on('value', (data) => {
           
            arrayVideos = [];
            
            let values = data.val();
            let videoName2;


            console.log("values", values);
                 
            Object.keys(values).map((key, index) => {
                  initialVideos = values[key];
                  console.log("initialVideos",initialVideos);
                  
                  videoName2= initialVideos.name;
                  console.log("videoName2", videoName2);
                  console.log("key",key);
                  /*
                  arrayVideos.push({name: videoName2, key: key});    
                  this.setState({videoList: arrayVideos }) ;
                  */ 
                }
            );
        
            
          
          
        }, (err) => {
            console.log(err);
        });

        

    }


    filesSelectedHandler = (event) => {
      
       this.setState({
           selectedVideo: event.target.files[0]
       })

    }

    applyScreen = () => {   
        
        if (this.state.selectedVideo === null){
            alert("Browse a video to upload")
        }

        else{
            screenIndex= this.state.screenName;
            screenIndex= screenIndex.replace(" ",""); 
            
            logFilesRef.child(`${screenIndex}`).push({ name: this.state.selectedVideo.name,
                                                       size: this.state.size
            });
        }
       
        
    }

    applyAll = () => {
        if (this.state.selectedVideo === null){
            alert("Browse a video to upload")
        }

        else{
            let videotest= this.state.selectedVideo.name;
            let videosize2= this.state.size;
            let numberOfChildren;
            
            logFilesRef.once('value', function(snapshot) {
               numberOfChildren= snapshot.numChildren(); //get number of immediate children
               let i=0
               snapshot.forEach(function(snap){
                    i=i+1;
                    logFilesRef.child(`Screen${i}`).push({ name: videotest,size: videosize2}); 
               });
            })
            console.log("done!");
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
        
        let videoSize= this.state.selectedVideo.size;
        videoSize= videoSize/1000000;
        videoSize= `${videoSize}MB`;
        
        if (videoSize > 3){
            alert("The max file size to upload is 3MB")
        }
        screenIndex= this.state.screenName;
        screenIndex= screenIndex.replace(" ",""); 

        
        let uploadTask= storageRef.child(`videosInventory/${videoName}`).put(this.state.selectedVideo);
        const self = this;

        uploadTask.on('state_changed',
            function(snapshot){
                //progress bar
                progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                self.setState({percent: progress }) ; 

            }, function(error){
                alert("hubo un error")

            }, function(){
                //success callback
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    //console.log('File available at ', downloadURL);
                    videosRef.push({ name: videoNameDB, 
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
                    <div className="Scheduler">
                    <div className= "col s12 Scheduler">   
                        <div className= "col s6 ">
                            <label> 
                                    <input type="file"  
                                    className="inputName" 
                                    onChange={this.filesSelectedHandler} 
                                    id={this.state.videoName}
                                    />           
                            </label>

                            
                            <Line percent={this.state.percent} strokeWidth="2" strokeColor="#14a76c" />
                         
                        </div>

                        <div className="col s6">
                            <br/> 
                            <Button className="updateBtn" onClick={() => {
                                  this.fileUploadHandler();}}
                                >Upload File </Button> 

                               
                        </div>
                    </div>
                 </div>
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
                    <p > Click on the following button to see the current videos per each screen</p>
                        <br/>
                        <Button onClick={() => {
                            this.showVideos();}}
                            > Show Videos </Button>     
                  </div>
                </div>      
                   
                <div className="row">
                    <div className="col s12">
                        <p > STORAGE </p>
                            <br/>
                            <Button onClick={() => {
                                this. getAvailableStorage();}}
                                > STORAGE </Button>     
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



