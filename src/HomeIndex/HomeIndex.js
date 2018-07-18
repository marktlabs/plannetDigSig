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
           
            <div>
                <div className="navigation-bar">
                    
                    <div id="navigation-container">
                            <img src={require("./logo.png")} alt="" className=" logoNavBar" />
                            <div>
                            <ul className="dropdown" >
                                <li><a href="#sdf">About</a></li>
                                <li><a href="#adc">Get in Touch</a></li>
                                <li><a href="#ert">Home</a></li>
                                <li><a href="http://192.168.65.19:3006/">Projects</a>
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
                    <br/>
                    <br/>
                    <br/>
                    <img src={require("./marktlabs.png")} alt="" className=" banner" />
                </div>                
            </div>
           
        )
    }
}
export default HomeIndex;



