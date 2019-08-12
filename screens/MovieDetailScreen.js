import React from 'react';
import Navigation from '../components/Navigation';
import { Button, Text, View, StyleSheet, Image } from 'react-native';

export default class MovieDetailScreen extends React.Component {
    static navigationOptions = {
      title: 'Detalle de Pelicula',
      headerBackTitle: 'Detalles'
    };

    getImage(path){
        console.log("https://image.tmdb.org/t/p/w200" + path);
        return "https://image.tmdb.org/t/p/w200" + path;
    }
  
    render() {
      const source = this.props.navigation.state.params.source;
      const item = this.props.navigation.state.params.item;
      let name = "";
      let vote_average = "";
      if (item != null) {
        name = item.title;
        image = item.poster_path;
        vote_average = item.vote_average;
      }
      return (
        <View style={styles.container}>
          <Image source={{uri: this.getImage(image)}} style={{width: 400, height: 400}}/>
          <Text style={styles.text}>Título: {name}</Text>
          <Text style={styles.text}>Promedio puntaje:{vote_average}</Text>
          <Button title="Agregar comentario" /><Button title="Ver comentarios" />
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