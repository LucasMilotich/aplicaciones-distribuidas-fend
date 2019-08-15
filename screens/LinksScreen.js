import React from 'react';
import { Button, Text, StyleSheet, View, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
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
        .then( (res) => {
          const statusCode = res.status;
          const data = res.json();
          if(statusCode != 200){
            Alert.alert("Error","La API de Movies está caída!")
            this.setState({
              loading:false
            });
            return Promise.reject()
          }
          return data
        })
        
        .then(res => {
          console.log(res)
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
      .then( (res) => {
        const statusCode = res.status;
        const data = res.json();
        if(statusCode != 200){
          Alert.alert("Error","La API de Movies está caída!")
          this.setState({
            loading:false
          });
          return Promise.reject()
        }
        return data
      })
      
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
            <CardTitle style= {styles.title}
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
                color="blue">
              </CardButton>
            </CardAction>
          </Card>;
  }

  updateSearch = search => {
    if (search == '' || search == null){
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
          autoCorrect={false}
        />
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderNativeItem(item)}
          keyExtractor={(item, index) => index.toString()}
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
