import React from 'react';
import Navigation from '../components/Navigation';
import { Text, ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";
import { Title } from 'react-native-paper';
import { Card, Divider, Button } from 'react-native-material-ui';




export default class MovieDetailScreen extends React.Component {
  
  constructor() {
    super();

    this.state = {
      dialogVisible: false
    };
  }

  static navigationOptions = {
    title: 'Detalle de Pelicula',
    headerBackTitle: 'Detalle'
  };

  getImage(path) {
    console.log("https://image.tmdb.org/t/p/w400" + path);
    return "https://image.tmdb.org/t/p/w400" + path;
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('CommentsScreen', {item: item})
  }

  sendInput = (inputText) => {
    let data = {
      username: this.state.user,
      comment: inputText,
      movieId: this.props.navigation.state.params.item.movieId
    }

    const endpoint_auth = `${Config.url2}movies/${data.movieId}/comment`;
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
          this.storeData(storedData);
          this.setState({isDialogVisible: false});
          //this.props.navigation.navigate('Links', {response: responseOk});
      }
      else{
          Alert.alert("Error",responseOk.message);
      }
    });
  }

  render() {
    const source = this.props.navigation.state.params.source;
    const item = this.props.navigation.state.params.item;
    console.log(item)
    let name = "";
    let vote_average = "";
    let overview = "";
    if (item != null) {
      name = item.title;
      image = item.poster_path;
      otherImage = item.backdrop_path
      vote_average = item.vote_average;
      overview = item.overview
    }
    return (
      <ScrollView style = {{ }}>
        <Card style= {{}}>
          <Image
            source={{ uri: image }}
            style={{   width: '100%', height: 400, resizeMode: 'stretch'}} 
          />
          <Text style={{fontSize:35, padding: '4% 4% 4% 4%', backgroundColor:'#c6e2ff', fontWeight: 'bold'}}>{name}</Text>
          <Divider/>
          <Text style={{fontSize:23, backgroundColor:'#fff68f', textAlign:'center', fontWeight: 'bold'}}>{ "Puntaje: " + vote_average}</Text>
          <Divider/>
          <Text style={{ padding: '2% 2% 2% 2%'}}>Sinopsis: {overview}</Text>
          <Divider/>
          <Button primary text="Agregar comentario" onPress={() => this.props.navigation.navigate('NewCommentScreen', {item: item})}/>
          <Button onPress={() => this.props.navigation.navigate('CommentsScreen', {movieId: item.id})}primary text="Ver comentarios" />
        </Card>
      </ScrollView>
    );
  }
  _goHome = async () => {
    this.props.navigation.navigate('LinksScreen');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  }
});