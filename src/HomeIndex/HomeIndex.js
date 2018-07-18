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
                <ul id="dropdown1" class="dropdown-content">
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li class="divider"></li>
                    <li><a href="#!">three</a></li>
                </ul>
                </div>
                <div className="navigation-bar">
                    <div id="navigation-container">
                            <img src={require("./logo.png")} alt="" className=" logoNavBar" />
                            <div>
                            <ul className="dropdown" >
                                <li><a href="#">About</a></li>
                                <li><a href="#">Get in Touch</a></li>
                                <li><a href="#">Home</a></li>
                                <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown</a></li>
                                <li><a href="#">Projects</a>
                                    <ul className="dropdown-content">
                                        <li>
                                        <a href="#!">Web Design</a>
                                        </li>
                                        <li>
                                        <a href="#!">Web Development</a>
                                        </li>
                                        <li>
                                        <a href="#!">Graphic Design</a>
                                        </li>
                                    </ul>
                                </li>
                                
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



