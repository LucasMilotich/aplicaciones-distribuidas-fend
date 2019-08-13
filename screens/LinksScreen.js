import React from 'react';
import { Button, Text, StyleSheet, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements"
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import Config from "../constants/Config";

export default class LinksScreen extends React.Component{
  constructor() {
    super();

    this.state = {
      dataSource: [{key:1, name:'const abc item'}, {key:2, name:'const def item'}],
      search: '',
      trending: true,
      loading:true
      
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
    if(this.state.trending || text == ''){
      let uri = `${Config.url2}movies`;
      console.log(uri);
      fetch(uri)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.movies,
            loading:false
          });
        })
        .catch(error => {
          console.log("get data error from:" + uri + " error:" + error);
        });
      this.state.trending = false;
    }else{
      this.setState({
        
        loading:true
      });
      
      let uri = `${Config.url2}movies/search?query=${text}`;
      console.log(uri);
      fetch(uri)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.movies,
            loading:false
          });
        })
        .catch(error => {
          console.log("get data error from:" + uri + " error:" + error);
        });
      }
  };

  renderNativeItem = (item) => {
    console.log(item.poster_path);
    return <Card>
            <CardImage 
              source={{uri: item.poster_path}} 
            />
            <CardTitle 
              title={item.original_title}
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
    

    if (search == '' || search == null){
      console.log("asdadsadasd")
      this.setState({ search: search, trending : true });
      
    } else {
      this.setState({ search });
    }

    this.getRemoteData(search)
  };
  
  render() {
    return (
      <View>
        
        <SearchBar
          placeholder="Ingrese un nombre.."
          value={this.state.search}
          onChangeText={this.updateSearch}
        />
        
        
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderNativeItem(item)}
        />
        <ActivityIndicator size="large" color="#0000ff"  animating={this.state.loading}/>
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
