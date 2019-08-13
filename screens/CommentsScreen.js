import React from 'react';
import { Button, Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements"
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import Config from "../constants/Config";

export default class CommentsScreen extends React.Component{
  constructor() {
    super();

    this.state = {
      dataSource: [{key:1, name:'const abc item'}, {key:2, name:'const def item'}],
      search: ''
    };
  }

  static navigationOptions = {
    title: 'CommentsScreen',
    headerBackTitle: 'Detalles'
  };

  getImage(path){
    return "https://image.tmdb.org/t/p/w200" + path;
  }

  getRemoteData = (text) => {
  
    let uri = `${Config.url}${Config.apikey}&language=en-US&page=1&include_adult=false&query=a`;
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
          <Text>Comentarios</Text>
        </View>
       
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
