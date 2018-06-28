import React, { Component } from 'react';
import { Button, Modal, Icon} from 'react-materialize';

import firebaseApp from '../../firebase/firebaseApp';

class MyProfile extends Component {

    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        
    }

    resetPassword = () => {
        console.log("the email is ", this.state.email);
        let resetEmail= this.state.email;
        console.log("the resetEmail is ", resetEmail);
        firebaseApp.auth().sendPasswordResetEmail(resetEmail).then(function (){
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
            <div className="PromoLoop" >
                <div className="row">
                    <div className="col s12">
                     <h2 className="headerScheduler"> My Profile </h2> 
                         <span className="modalScheduler">
                            <Modal 
                            header='My Profile'
                            trigger={<Button waves='light'>More Information <Icon right> help </Icon></Button>}>
                            <p> In this section you can change your password</p>
                            </Modal>
                        </span>
                    </div>
                </div>

                <div className="col s12">
                    <div className="col s6">
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Enter email" />
                    </div>
                </div>

                <div className="col s12">
                    <div className="col s6">
                        <Button type="submit" onClick={this.resetPassword} >Reset Password</Button>
                    </div>
                    <div className="col12">
                        <br/>
                    </div>
                </div>
            </div>
           
        )
    }
}
export default MyProfile;



