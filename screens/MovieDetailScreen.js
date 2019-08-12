import React from 'react';
import Navigation from '../components/Navigation';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { Title } from 'react-native-paper';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'



export default class MovieDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'MovieDetailScreen',
    headerBackTitle: 'Detalles'
  };

  getImage(path) {
    console.log("https://image.tmdb.org/t/p/w400" + path);
    return "https://image.tmdb.org/t/p/w400" + path;
  }

  render() {
    const source = this.props.navigation.state.params.source;
    const item = this.props.navigation.state.params.item;
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
      <View style = {{ height: '100%', backgroundColor: 'grey'}}>
      <Card
        style= {{
          flexWrap: 'wrap',
          flexGrow: '1'}}


      >
        

       

<CardImage
          source={{ uri: this.getImage(image) }}
          style={{   width: '100%', height: '110%',flexWrap: 'wrap'}} 
        />
         <CardTitle
          style ={{marginTop: '10%'}}
          title={name}
          subtitle={"Puntaje promedio " + vote_average}
        />
        
        <CardContent  style = {{flexWrap: 'wrap'}} text={ overview } />



        




      </Card>
      <CardAction
          separator={true}
          inColumn={false}>
          <CardButton
            onPress={() => { }}
            title="Agregar comentario"
            color="blue"
          />
          <CardButton
            onPress={() => { }}
            title="Ver comentarios"
            color="blue"
            
          />
        </CardAction>
      </View>
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