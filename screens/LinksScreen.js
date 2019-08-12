import React from 'react';
import { Button, Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { ListItem } from "react-native-elements"
import Config from "../constants/Config";

export default class LinksScreen extends React.Component{
  constructor() {
    super();

    this.state = {
      dataSource: [{key:1, name:'const abc item'}, {key:2, name:'const def item'}],
    };
    this.getRemoteData();
  }

  static navigationOptions = {
    title: 'LinksScreen'
  };

  getImage(path){
    console.log("https://image.tmdb.org/t/p/w200/" + path);
    return "https://image.tmdb.org/t/p/w200" + path;
  }

  getRemoteData = () => {
    let uri = `${Config.url}${Config.apikey}&language=en-US&page=1&include_adult=false&query=harry`;
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
  };

  renderNativeItem = (item) => {
    return <ListItem
            roundAvatar
            key={item.original_title}
            title={item.title}
            subtitle={item.original_title}
            avatar={{ uri: this.getImage(item.poster_path)}}
            onPress={() => this.onPressItem(item)}
          />;
  }

  capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('MovieDetailScreen', {item: item})
  }
  
  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderNativeItem(item)}
        />
        <Button
          title="Go Detail"
          onPress={() => this.props.navigation.navigate('MovieDetail', {source: "LinksScreen"})}
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
});
