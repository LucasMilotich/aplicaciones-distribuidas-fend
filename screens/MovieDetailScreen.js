import React from 'react';
import Navigation from '../components/Navigation';
import { Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Title } from 'react-native-paper';
import { Card, Divider, Button } from 'react-native-material-ui';




export default class MovieDetailScreen extends React.Component {

  static navigationOptions = {
    title: 'MovieDetailScreen',
    headerBackTitle: 'Detalles'
  };

  getImage(path) {
    console.log("https://image.tmdb.org/t/p/w400" + path);
    return "https://image.tmdb.org/t/p/w400" + path;
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('CommentsScreen', {item: item})
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
      <Card
        style= {{
          }}


      >
        

       

<Image
          source={{ uri: image }}
          style={{   width: '100%', height: 400, resizeMode: 'stretch'}} 
        />
          <Text style={{fontSize:40, padding: '8% 8% 8% 8%'}}>{name}</Text>
          <Divider/>
          <Text style={{fontSize:25, marginLeft: '35%'}}>{ "Puntaje: " + vote_average}</Text>
          <Divider/>
          <Text style={{ padding: '2% 2% 2% 2%'}}>{  overview}</Text>
          <Divider/>
          <Button primary text="Agregar comentario"/>
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