import React from 'react';
import { View, Alert } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Config from '../constants/Config'
import Navigation from '../components/Navigation';

class ChangePassword extends React.Component{

    constructor(){
        super();
            this.state = {
            newPw: "",
            user: global.username,
        }

        // this.goBack = this.goBack.bind(this);
        this.changePw = this.changePw.bind(this);
    }

    static navigationOptions = {
        header: null,
      };

    updateNewPw = pw => {
        this.setState({ newPw: pw });
    };

    changePw(){
            
            let data = {
                username: this.state.user,
                new_password: this.state.newPw,
            }
            const endpoint = `${Config.api_url}/users/change_password`;
            fetch(endpoint,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json',
                    }
                }
            ).then(
                (response) => {
                    if(response.status == 200){
                        return response.json();
                    }
                    else{
                        return null;
                    }
                }
            ).then(responseOk => {
                if(responseOk){
                    Alert.alert(
                        'Password changed succesfully.',
                        'Please login again with your new password.');
                    this.props.navigation.navigate('Login')
                }
                else{
                    alert("FAILED.");
                }
    
            })
            ; 
    }

    // goBack(){
    //     console.log("entre go back")
    //     this.props.navigation.navigate('Profile');
    // }


    render(){

        return(
            <View>
                <Navigation/>
                <TextInput
                        style={{fontSize: 18, marginTop:5, marginBottom:5, height: 50, borderColor: "grey", borderBottomWidth: 1}}
                        placeholder='New Password' 
                        onChangeText={this.updateNewPw}
                        label="New Password"
                        secureTextEntry={true}
                    />
                <Button 
                    mode="contained" 
                    onPress={this.changePw} 
                    color="lightblue">
                        Change Password
                </Button>

                 {/* <Button 
                    mode="outlined" 
                    onPress={this.goBack} 
                    color="lightblue" style={{marginTop:30}}>
                        Back
                </Button>  */}

            </View>
        )

    }

}


export default ChangePassword;