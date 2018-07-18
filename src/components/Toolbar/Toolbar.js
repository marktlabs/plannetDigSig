import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './Toolbar.css';
import Scheduler from '../Scheduler/Scheduler';
import Announcements from '../Announcements/Announcements';
import PromoLoop from '../PromoLoop/PromoLoop';
import PowerSettings from '../PowerSettings/PowerSettings';
import ProofPlaying from '../ProofPlaying/ProofPlaying';
import QuickViewSchedule from '../QuickViewSchedule/QuickViewSchedule';
import Home from '../Home/Home';
import UploadVideo from '../UploadVideo/UploadVideo';
import MyProfile from '../MyProfile/MyProfile';
import DeleteVideo from '../DeleteVideo/DeleteVideo';
import StorageView from '../StorageView/StorageView';
import firebase from 'firebase';

import { Icon, Button, SideNav, SideNavItem } from 'react-materialize';

class Toolbar extends Component {
  
  constructor(props){
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    console.log("Hi Logout!")
    firebase.auth().signOut();
  }

  render() {
    return (
      <Router>
        <span className= "Toolbar">
        <SideNav  
          trigger={<Button className="sideMenuButton" > <Icon className="material-icons left"> dehaze </Icon> Menu  </Button>}
          options={{ closeOnClick: true }}
          >
         
          <li>
              <Link to="/myprofile"> <Icon className="material-icons left">tag_faces</Icon> My Profile</Link>
          </li>
         
          <SideNavItem divider />
          
          <SideNavItem subheader>Features</SideNavItem>

          <li>
             <Link to="/scheduler"><Icon className="material-icons left">access_time</Icon> Scheduler</Link>
          </li>
          
          <li>
              <Link to="/QuickViewSchedule"><Icon className="material-icons left">view_list</Icon> View Schedule</Link>
          </li>

          <li>
            <Link to="/announcements"><Icon className="material-icons left">access_alarm</Icon> Announcements</Link>
          </li>
        
          <li>
            <Link to="/proofPlaying"><Icon className="material-icons left">insert_drive_file</Icon> Proof of Playing</Link>
          </li>
        
          <li>
              <Link to="/loopPromo"><Icon className="material-icons left">cached</Icon>Loop Promo</Link>
          </li>
        
          <li>
              <Link to="/powerSettings"><Icon className="material-icons left">power_settings_new</Icon>Power Settings</Link>
          </li>

          <li>
              <Link to="/uploadVideo"><Icon className="material-icons left">file_upload</Icon> Upload Content </Link>
          </li>

          <li>
              <Link to="/spaceAvailable"><Icon className="material-icons left">sd_storage</Icon> Storage Available </Link>
          </li>

          <li>
              <Link to="/deleteVideos"><Icon className="material-icons left">delete</Icon> Delete Videos </Link>
          </li>
        
          <li>
            <Button onClick={this.logout}> Logout </Button>
          </li>        
        
        </SideNav>


          <hr />

          <Switch>
          <Route exact path="/" render={() => <Home/>}
          />

          <Route exact path="/myProfile" render={() => <MyProfile/>}
            />

          <Route exact path="/deleteVideos" render={() => <DeleteVideo/>}
            />
          
          <Route path="/uploadVideo" component={UploadVideo} />
          
          <Route path="/spaceAvailable" component={StorageView} />
                  
          <Route exact path="/scheduler" render={() => <Scheduler
              verifyDayOfWeek={this.props.verifyDayOfWeek}
              submitSchedules={this.props.submitSchedules}
              updateScheduler={this.props.updateScheduler}
              schedulerSection={this.props.schedulerSection} />}
            />
            
            <Route exact path="/quickViewSchedule" render={() => <QuickViewSchedule/>}
            />

            <Route path="/proofPlaying" component={ProofPlaying} />
            
           
            <Route exact path="/announcements" render={() => <Announcements />}
            />

            <Route exact path="/loopPromo" render={() => <PromoLoop />}
            />

            <Route exact path="/powerSettings" render={() => <PowerSettings/>}/>
          </Switch>       
        </span>
      </Router>
    )
  }
}

export default Toolbar;