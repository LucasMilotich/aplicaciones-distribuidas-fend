import React from 'react';
import { Button, Text, StyleSheet, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements"
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import Config from "../constants/Config";

export default class CommentsScreen extends React.Component{
  state = {
    comments: [],
    loading: true
  }

  static navigationOptions = {
    title: 'Comentarios',
    headerBackTitle: 'Detalle'
  };

  componentDidMount = () => {
    let instance = this;
    const movieId = this.props.navigation.state.params.movieId;
    let uri = `http://localhost:8080/movies/${movieId}/comments`;
    console.log(uri);
    fetch(uri)
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res.comments,
          loading:false
        });
      })
      .catch(error => {
        console.log("get data error from:" + uri + " error:" + error);
      });
  };

  renderNativeItem = (item) => {
    console.log(item)
    return <Card>
            <CardTitle 
              title={item.username + ' dijo '}
            />
            <CardContent text={item.comment} />
          </Card>;
  }

  render() {
    return (
      <View stlye={{width: 400, heigth: 400}}>
        <View style={styles.title}>
          <Text>Comentarios</Text>
        </View>
        
        <FlatList
          data={this.state.comments}
          extraData = {this.state.comments}
          renderItem={({item}) => this.renderNativeItem(item)}
        />
        <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading}/>
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
