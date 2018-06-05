import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './Toolbar.css';
import Scheduler from '../Scheduler/Scheduler';
import HBDPromo from '../HBDPromo/HBDPromo';
import AddScreen from '../AddScreen/AddScreen';
import PromoLoop from '../PromoLoop/PromoLoop';
import PowerSettings from '../PowerSettings/PowerSettings';
import ProofPlaying from '../ProofPlaying/ProofPlaying';

import {Icon, Navbar} from 'react-materialize';

class Toolbar extends Component {
  render(){
    return(
    <Router>
      <div >
        <Navbar className="Toolbar">
          <li>
            <Link to="/scheduler">
              <Icon className="material-icons left">access_time</Icon> Scheduler
            </Link>
          </li>
              
          <li>
            <Link to="/promoHBD">
              <Icon className="material-icons left">cake</Icon>Birthday Promo 
            </Link>
          </li> 
              
          <li>
            <Link to="/proofPlaying">
              <Icon className="material-icons left">insert_chart</Icon> Proof of Playing
            </Link>
          </li> 
              
          <li>
            <Link to="/promoLoop">
              <Icon className="material-icons left">cached</Icon>Loop Promo
            </Link>
          </li> 
              
          <li>
            <Link to="/powerONOFF">
              <Icon className="material-icons left">power_settings_new</Icon>Power Settings
            </Link>
          </li>
        </Navbar>

        <hr />

        <Switch>
          <Route path="/Scheduler" component={Scheduler} />
          <Route path="/proofPlaying"component={ProofPlaying} /> 
          <Route exact path="/promoHBD" render={() => <HBDPromo 
                                            addHBDName={this.props.addHBDName}
                                            setNewTrigger={this.props.setNewTrigger}
                                            bdayScreenName= {this.props.bdayScreenName}/> }
            />
          <Route exac path="/promoLoop" render={() => <PromoLoop 
                                          addEndTime={this.props.addEndTime}
                                          setNewTrigger={this.props.setNewTrigger}
                                          loopPromoScreen={this.props.loopPromoScreen}
                                          addStartTime ={this.props.addStartTime}/> }
            />
          <Route path="/powerONOFF" component={PowerSettings} />
        </Switch>
      </div>

    </Router>
    )
  }
}

export default Toolbar;