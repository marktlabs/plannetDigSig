import React, { Component } from 'react';
import DropdownScreen from '../DropdownScreen/DropdownScreen';
import {Table, Button, Modal, Icon} from 'react-materialize';


import firebase from 'firebase';
import 'firebase/database';
import './DeleteVideo.css';
import firebaseApp from '../../firebase/firebaseApp';

let storageRef;

let logFilesRef;

let url_database;
let screenName2;
let initialVideos;
let arrayScreens= [];

let arrayVideos = [];

class DeleteVideo extends Component {
    state = {
        selectedVideo: null,
        screenName: "Screen1",
        showResults: false,
        videos: [],
        deleteVideo: '',
        screens: [],
        screenList: [],
        videoList: [
           // { name: "licuado1.png", key: "-LGWzDkUc4sE8ukexn4u"}
        ]
    }

    handleVideoChange = (name, value) => {
        console.log("CHANGE VIDEO SCREEEEEEEEEEN");
        this.setState({ deleteVideo: value});
        console.log("valueVideo",value);
    }
    componentWillUnmount() {
        clearInterval(this.state.videos);
        clearInterval(this.state.screens);
        clearInterval(this.state.screenName);
        clearInterval(this.state.videoList);
       
    }

    componentDidMount() {
        
        storageRef= firebase.storage().ref();
        console.log("initialize!")

        //version de youtube, su funciona
        url_database= "https://firebasestorage.googleapis.com/v0/b/digitalsignage-acb79.appspot.com/o/imagenes%2Fscreen2%2FScreen1_(2018-6-14)?alt=media&token=f16c0515-95ab-4fe3-981d-724dfbc141b8"

        storageRef= firebaseApp.storage().ref();
        logFilesRef= firebaseApp.database().ref().child("Inventory");

        screenName2 = this.state.screenName;
        screenName2= screenName2.replace(" ",""); 
        let videoName2 = "";

        console.log("the screen value is: ",screenName2 );

          firebaseApp.database().ref(`Inventory/${screenName2}/`)
          .on('value', (data) => {
              let values = data.val();
              this.setState({ videos: values }, () => {
                arrayVideos = [];
                arrayScreens = [];
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
          
          
          firebaseApp.database().ref(`Inventory`)
          .on('value', (data) => {
              let values = data.val();
              //console.log("scrensssssss", values);

              this.setState({ screens: values }, () => {
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

    deleteVideo = () => {  
        if (this.state.deleteVideo === null){
            alert("Please, select a video to delete");
        }

        else {
            screenName2 = this.state.screenName;
            screenName2= screenName2.replace(" ",""); 
            let video2delete=  this.state.deleteVideo;
            var desertRef = storageRef.child('imagenes/'+`${screenName2}/${this.state.deleteVideo}`);
            console.log('imagenes/'+`${screenName2}/${this.state.deleteVideo}`);
            console.log("video2delete*********", video2delete);

            desertRef.delete().then(function() {
                console.log("deleted!");
                logFilesRef.child(`${screenName2}`).orderByChild('name').equalTo(video2delete).once('value').then(function(snapshot) {  
                        console.log("entraaa*********");
                        console.log("the key is ",snapshot.key);
                        console.log("snapshot.val()",snapshot.val());
                        let key = Object.keys(snapshot.val())[0];
                        console.log("thekey", key);
                        
                        logFilesRef.child(`${screenName2}`).child(key).remove();


                    }).catch(function(error) {
                        // Uh-oh, an error occurred!
                            console.log(error);
                    });;
            }).catch(function(error) {
                // Uh-oh, an error occurred!
                    alert("Video not found");
                });
            
                
        }

        //window.location.reload();

    }

    handleScreenChange = (name, value) => {
        console.log("ENTRA A CAMBIO DE PANTALLA");
        let videoName2 = "";
        arrayVideos = [];
        this.setState({ screenName: value});

        console.log("value",value);

        screenName2 = value;
        screenName2= screenName2.replace(" ",""); 
        
        console.log("the screen value is: ",screenName2 );

        firebaseApp.database().ref(`Inventory/${screenName2}/`)
          .on('value', (data) => {
            arrayVideos = [];
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

  
    render() {

        return (

            <div className="PromoLoop" >
               
                <div>
                    <h2 className="headerScheduler"> Delete Videos </h2> 

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
                    <div className=" col s12">
                                <p className="subtitlesHead2"> Select the screen for scheduling content </p>
                                <DropdownScreen 
                                    handleChange={this.handleScreenChange}
                                    name="video"
                                    items={this.state.screenList}
                                />
                    </div>

                </div>
  
                <div className=" col s12">                  
                    <p className="subtitlesHead2"> Select video to delete </p>
                        <DropdownScreen 
                            handleChange={this.handleVideoChange}
                            name="video"
                            items={this.state.videoList}
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
  
            </div>
        )
    }
}
export default DeleteVideo;



