import React from 'react';
import { Button, Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements"
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import Config from "../constants/Config";

export default class LinksScreen extends React.Component{
  constructor() {
    super();

    this.state = {
      dataSource: [{key:1, name:'const abc item'}, {key:2, name:'const def item'}],
      search: '',
      trending: true
    };
    this.getRemoteData();
  }

  static navigationOptions = {
    title: 'Peliculas'
  };

  getImage(path){
    return "https://image.tmdb.org/t/p/w200" + path;
  }

  getRemoteData = (text) => {
    console.log(text);
    if(this.state.trending){
      let uri = `${Config.url2}movies`;
      console.log(uri);
      fetch(uri)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.results,
            trending: false
          });
        })
        .catch(error => {
          console.log("get data error from:" + uri + " error:" + error);
        });
    }else{
      if(text == ''){
        alert("Debe ingresar un texto.");
      }
      let uri = `${Config.url2}movies/search?&query=${text}`;
      console.log(uri);
      fetch(uri)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.results
          });
        })
        .catch(error => {
          console.log("get data error from:" + uri + " error:" + error);
        });
    }
  };

  renderNativeItem = (item) => {
    return <Card>
            <CardImage 
              source={{uri: this.getImage(item.poster_path)}} 
            />
            <CardTitle 
              title={item.title}
              subtitle={item.vote_average}
            />
            <CardContent text={item.overview} />
            <CardAction 
              separator={true} 
              inColumn={false}>
              <CardButton
                onPress={() => this.props.navigation.navigate('MovieDetailScreen', {item: item})}
                title="Ver Detalles"
                color="blue"
              />
            </CardAction>
          </Card>;
  }

  capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('MovieDetailScreen', {item: item})
  }

  updateSearch = search => {
    this.setState({ search });
  };
  
  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text>Buscador de Peliculas</Text>
        </View>
        <SearchBar
          placeholder="Ingrese un nombre.."
          value={this.state.search}
          onChangeText={this.updateSearch}
        />
        <Button title="Buscar peliculas" onPress={() => this.getRemoteData(this.state.search)} loading/>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderNativeItem(item)}
        />
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
