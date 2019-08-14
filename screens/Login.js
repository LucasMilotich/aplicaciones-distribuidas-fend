import React, { Component } from 'react';
import {
    Text,
    View,
    AsyncStorage,
    Alert,
    ActivityIndicator
} from 'react-native';

import {TextInput, Button} from 'react-native-paper';
import Navigation from '../components/Navigation';
import Config from '../constants/Config';
import Icon from 'react-native-vector-icons';
import { ImageBackground } from 'react-native'


export default class Login extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
    
        return {
          headerTitle: "Wellcome to App movies",
        };
      };
    
    
    constructor(props){
        super(props);
        this.state = {
            user: "",
            pw: "",
            newUser: "",
            newPw:"",
            newName: "",
            newUserForm: false,
            loading: false
        }

    }

    updateUser = user => {
        this.setState({ user: user });
    };

    updatePw = pw => {
        this.setState({ pw: pw });
    };

    updateNewUser = newUser => {
        this.setState({ newUser: newUser });
    };

    updateNewPw = newPw => {
        this.setState({ newPw: newPw });
    };

    updateNewName = newName => {
        this.setState({ newName: newName });
    };

    updateNewUserForm (show) {
        this.setState({newUserForm: show});
    }

    login(){
        this.setState({loading: true});

            let data = {
                username: this.state.user,
                password: this.state.pw
            }

            const endpoint_auth = `${Config.api_url}user/login`;
            fetch(endpoint_auth,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
            ).then(
                (response) => {
                    if(response.status == 200){
                        return response.json();
                    }else{
                        Alert.alert("Error","Server error");
                        return null;
                    }
                }
            ).then(responseOk => {
                if(responseOk._id){
                    storedData = JSON.stringify(responseOk);
                    this.storeData(data.username);
                    global.username = this.state.user;
                    this.setState({loading: false});
                    this.props.navigation.navigate('Links', {response: responseOk});
                }
                else{
                    Alert.alert("Error",responseOk.message);
                    this.setState({loading: false});
                }
    
            })
            ;
    }

    storeData = async (user) => {
        try {
            await AsyncStorage.setItem('user', user);
        } catch (e) {
        }
    }

    newUser(){
            let data = {
                username: this.state.newName,
                password: this.state.newPw,
            }
            const endpoint_new_user = `${Config.api_url}user/register`;
            fetch(endpoint_new_user,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
                ).then(
                    (response) => {
                        if(response.status == 200){
                            return response.json();
                        }
                        else{
                            Alert.alert("Error","Server error");
                            return null;
                        }
                    }
                ).then(responseOk => {
                    if(responseOk._id){
                        Alert.alert("Éxito","Usuario creado exitosamente!");
                        this.setState({newUserForm: false});
                    }
                    else{
                        alert("El registro de usuario falló");
                    }
                })
                ;
    }

    render() {

        if(this.state.newUserForm){
            return (
                <View>
                    <ImageBackground source={{uri: 'https://i.pinimg.com/736x/4e/f1/07/4ef107f60fc952dad6ef49254d74e7dd.jpg'}} style={{width: '100%', height: '100%'}}>

                    <View style={{margin:20}}>
                        <Text
                            style={{fontSize: 27, marginLeft: 110, fontWeight: 'bold'}}>
                            Registrarse
                        </Text>
                        <TextInput
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            onChangeText={this.updateNewName}
                            label="User"
                            value={this.state.newName}
                            autoCapitalize = "none"
                        />
                        <TextInput
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}}
                            //placeholder='Password' 
                            onChangeText={this.updateNewPw}
                            value={this.state.newPw}
                            label="Contraseña"
                            secureTextEntry={true}
                        />
                        
                        <View style={{margin:7}} />
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading}/>
                        <Button 
                            onPress={this.newUser.bind(this)}
                            mode="contained"
                            color="lightblue"
                            loading={this.state.loading}
                        >
                            Submit
                        </Button>
                    </View>
                    
                    <View style={{margin:20}} alignContent='center'>
                        <Button mode="contained" onPress={() => {this.updateNewUserForm(false)}} color="red">Back</Button>
                    </View>

                    </ImageBackground>
                </View>
            )
        }
        else{
            return (

                <View>

                    <ImageBackground source={{uri: 'https://i.pinimg.com/736x/4e/f1/07/4ef107f60fc952dad6ef49254d74e7dd.jpg'}} style={{width: '100%', height: '100%'}}>

                    {/* <Navigation/>  */}
                    <View style={{margin:20}}>
                        <Text 
                            style={{fontSize: 27, marginLeft:150, fontWeight: 'bold'}}>
                            Login
                        </Text>
                        <TextInput
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            onChangeText={this.updateUser}
                            value={this.state.user}
                            label="Usuario"
                            autoCapitalize = "none"
                        />
                        <TextInput
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}}  
                            onChangeText={this.updatePw}
                            value={this.state.pw}
                            label="Contraseña"
                            secureTextEntry={true}
                        />
                        <View style={{margin:7}} />
                        <Button 
                            onPress={this.login.bind(this)}
                            mode="contained"
                            color="lightblue"
                            loading={this.state.loading}
                        >
                            Enter
                        </Button>
                    </View>
                    <View style={{margin:20}}>
                        <Button mode="contained" color="red" onPress={() => {this.updateNewUserForm(true)} }>Register</Button>
                    </View>
                    </ImageBackground>
                </View>
            )
         }
    }
}