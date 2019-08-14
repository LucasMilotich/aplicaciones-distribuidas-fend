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

export default class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            user: "",
            pw: "",
            newUser: "",
            newPw:"",
            newName: "",
            newUserForm: false,
            loading:false
        }

    }

    static navigationOptions = {
        header: null,
      };

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
        // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if (reg.test(this.state.user) === true){
            
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
            });
    }

    storeData = async (user) => {
        try {
            await AsyncStorage.setItem('user', user);
        } catch (e) {
        }
    }

    newUser(){
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
                });
    }

    render() {

        if(this.state.newUserForm){
            return (
                <View>
                    <Navigation/>
                    <View style={{margin:20}}>
                        <Text
                            style={{fontSize: 27, marginLeft: 110, fontWeight: 'bold'}}>
                            Registrarse
                        </Text>
                        <TextInput
                            style={{fontSize: 18, marginTop:15, height: 50, borderColor: "grey", borderBottomWidth: 1}} 
                            onChangeText={this.updateNewName}
                            label="Usuario"
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
                            color="lightblue">
                            Enviar
                        </Button>
                    </View>
                    <View style={{margin:20}} alignContent='center'>
                        <Button mode="outlined" onPress={() => {this.updateNewUserForm(false)}} color="lightblue">Volver al Login</Button>
                    </View>
                </View>
            )
        }
        else{
            return (
                <View>
                    <Navigation/> 
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
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading}/>
                        <Button 
                            onPress={this.login.bind(this)}
                            mode="contained"
                            color="lightblue">
                        Ingresar
                        </Button>
                    </View>
                    <View style={{margin:20}}>
                        <Button 
                            mode="contained" 
                            onPress={() => {this.updateNewUserForm(true)}} 
                            color="lightblue">
                        Registrarse
                        </Button>
                    </View>
                </View>
            )
         }
    }
}