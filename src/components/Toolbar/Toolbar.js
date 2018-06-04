import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './Toolbar.css';
import Scheduler from '../Scheduler/Scheduler';
import HBDPromo from '../HBDPromo/HBDPromo';
import AddScreen from '../AddScreen/AddScreen';
import PromoLoop from '../PromoLoop/PromoLoop';
import PowerSettings from '../PowerSettings/PowerSettings';

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
            <Link to="/addScreen">
              <Icon className="material-icons left">add_circle</Icon> Add Screen
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
          <Route path="/addScreen"component={AddScreen} /> 
          <Route exact path="/promoHBD" render={() => <HBDPromo 
                                            addHBDName={this.props.addHBDName}
                                            bdayScreenName= {this.props.bdayScreenName}/> }
            />
          <Route path="/promoLoop" component={PromoLoop} />
          <Route path="/powerONOFF" component={PowerSettings} />
        </Switch>
      </div>

    </Router>
    )
  }
}

export default Toolbar;