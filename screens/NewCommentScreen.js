import React from 'react';
import { Text, StyleSheet, View, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';
import Config from "../constants/Config";

export default class NewCommentScreen extends React.Component{
  constructor(){
    super();
    this.state = {
        loading: true,
        text: '',
        user: ''
      }
    this._asyncUser();
  }
  
  static navigationOptions = {
    title: 'Nuevo comentario',
    headerBackTitle: 'Volver'
  };

  _asyncUser = async () => {
    const usuario = await AsyncStorage.getItem('user');
    this.setState({user:usuario});
  };
  
sendInput = (inputText) => {
    const valor = this.state.user;
    let data = {
        username: valor,
        comment: inputText,
        movie_id: this.props.navigation.state.params.item.id
    }
    const endpoint_auth = `${Config.url2}movies/${data.movieId}/comment`;
    fetch(endpoint_auth,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }
    ).then(
        (response) => {
            if(response.status == 200){
                alert("Comentario grabado exitosamente!");
                this.props.navigation.navigate('MovieDetailScreen', {item: this.props.navigation.state.params.item});
            }else{
                alert("Server error");
                return null;
            }
        }
    );

}

  render() {
    const movieId = this.props.navigation.state.params.item.movieId;
    return (
      <View stlye={{width: 400, heigth: 400}}>
        <View style={styles.title}>
          <TextInput
            multiline = {true}
            autoCorrect = {false}
            style={{height: 200, width: 350, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <View>
            <Button onPress={() => this.sendInput(this.state.text)} 
                    mode="contained"
                    color="lightblue">
                Enviar
            </Button>
        </View>
        <View>
            <Button onPress={() => this.props.navigation.navigate('MovieDetailScreen', {item: this.props.navigation.state.params.item})}
                    mode="outlined"
                    color="lightblue">
                Atrás
            </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  title: {
    alignItems: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold'
  }
});
