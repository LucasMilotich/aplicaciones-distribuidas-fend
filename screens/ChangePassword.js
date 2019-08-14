import React from 'react';
import { View, Alert } from 'react-native';
import {TextInput, Button, IconButton, Text} from 'react-native-paper';
import Config from '../constants/Config'
import Navigation from '../components/Navigation';
import Icon from 'react-native-vector-icons';


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

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
    
        return {
        headerTitle: "Change password",
        headerRight: <IconButton
                        icon="power-settings-new"
                        color="black"
                        onPress={() => navigation.navigate('Login')}
                     >

                     </IconButton>
        };
    };

    updateNewPw = pw => {
        this.setState({ newPw: pw });
    };

    changePw(){
            
            let data = {
                username: this.state.user,
                new_password: this.state.newPw,
            }
            const endpoint = `${Config.api_url}/user/change_password`;
            fetch(endpoint,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json',
                    }
                }
            ).then(
                (response) => {
                    console.log(response);
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
    };

    render(){
        return(
            <View>
                <View style={{margin:20}}>


                <Text style={{fontSize: 18, marginTop:5, marginBottom:5}}>User: {global.username}</Text>
                <View style={{margin:7}} />

                <TextInput
                        style={{fontSize: 18, marginTop:5, marginBottom:5, height: 50, borderColor: "grey", borderBottomWidth: 1}}
                        placeholder='New Password' 
                        onChangeText={this.updateNewPw}
                        label="New Password"
                        secureTextEntry={true}
                />

                <View style={{margin:7}} />

                <Button 
                    mode="contained" 
                    onPress={this.changePw} 
                    color="green">
                        Change Password
                </Button>

                 {/* <Button 
                    mode="outlined" 
                    onPress={this.goBack} 
                    color="lightblue" style={{marginTop:30}}>
                        Back
                </Button>  */}
                </View>
            </View>
        )

    }

}

export default ChangePassword;