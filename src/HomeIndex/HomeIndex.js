import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from '../App';
import './HomeIndex.css';

class HomeIndex extends Component {
    state = {
        screenName: 'Screen 1',
        day: '1',
        month: 'January',
    }

    render() {
        return (
            <Router>
            <div>
                <div className="headerTitle">
                  
                </div>
                <div className="navigation-bar">
                    <div id="navigation-container">
                            <img src={require("./logo.png")} alt="" className=" logoNavBar" />
                            <div>
                            <ul>
                                <li>
                                    <a href="#">Home</a></li>
                                <li><a href="#">Projects</a></li>
                                <li><a href="#">About</a></li>
                                <li>
                                    <Link to="/digitalSignage">
                                     Services
                                    </Link>
                                </li>
                                <li><a href="#">Get in Touch</a></li>
                            </ul>
                            </div>
                    </div>
                </div>

                <div>
                    <img src={require("./marktlabs.png")} alt="" className=" banner" />
                </div>                
            
            <hr/>
            
                <Switch>
                    <Route exact path="/digitalSignage" render={() => <App/>}/>
                </Switch>
                
                </div>

            </Router>
        )
    }
}
export default HomeIndex;



