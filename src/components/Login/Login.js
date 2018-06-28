import React, { Component } from 'react';
import firebase from 'firebase';
import './Login.css';
import { Button } from 'react-materialize';

class Login extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        //this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {

            if (error.code === "auth/user-not-found")
                alert("User not found");

            if (error.code === "auth/wrong-password")
                alert("Wrong password");
            
            console.log(error);
        });
    }

    /*
    signup(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                console.log(error);
            })
    }
    */

    resetPassword = () => {
        alert("reset");
        console.log("the email is ", this.state.email);
        let resetEmail= this.state.email;
        console.log("the resetEmail is ", resetEmail);
        firebase.auth().sendPasswordResetEmail(resetEmail).then(function (){
            alert('Password Reset Email Sent! ');
        }).catch(function(error){
            let errorCode= error.code;
            let errorMessage= error.message;

            if(errorCode === 'auth/invalid-email'){
                alert(errorMessage);
            } 
            else if (errorCode === 'auth/user-not-found'){
                alert(errorMessage);
            }
            console.log(error);
        
        });
    }

    render() {
        return (
            <div className="LoginForm">
                <div className="row">
                    <div className="col s12">
                        <form >
                            <div className="col s12 fixPadding-bottom">
                                <input value={this.state.email} onChange={this.handleChange} className="inputFixMargin1" type="email" name="email" placeholder="Enter email" />
                                <small id="emailHelp" className="smallText">We'll never share your email with anyone else.</small>
                            </div>

                            <div className="col s12">
                                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password" />
                            </div>

                            <div className="col s12">
                                <div className="col s12">
                                    <Button type="submit" onClick={this.login} >Login</Button>
                                </div>
                                
                                {/*
                                <div className="col s6">
                                    <Button onClick={this.signup} className="signUpButton" >Signup</Button>
                                </div>
                                */}

                                <div className="col s12">
                                <br/>
                                <Button type="submit" onClick={this.resetPassword} >Recover Password</Button>
                                </div> 
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;