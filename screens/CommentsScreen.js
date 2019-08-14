import React from 'react';
import { Button, Text, StyleSheet, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements"
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { Card, Divider } from 'react-native-material-ui';
import Config from "../constants/Config";

export default class CommentsScreen extends React.Component{
  state = {
    comments: [],
    loading: true
  }

  static navigationOptions = {
    title: 'Comentarios'
  };

  componentDidMount = () => {
    let instance = this;
    const movieId = this.props.navigation.state.params.movieId;
    let uri = `${Config.url2}movies/${movieId}/comments`;
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
    /*return <Card>
            <CardTitle style={styles.title}
              title={item.comment}
            />
            <CardContent text={item.username} />
          </Card>;*/
    return <Card style= {{}}>
              <Text style={{fontSize:15, backgroundColor: '#c6e2ff', fontWeight: 'bold', height: 18}}>El usuario '{item.username}' dijo:</Text>
              <Divider/>
              <Text style={{fontSize:20}}>{item.comment}</Text>
              <Divider/>
              <Divider/>
            </Card>;
  }

  render() {
    return (
      <View style={{width: 412, heigth: 300}}>
        <FlatList
          data={this.state.comments}
          extraData = {this.state.comments}
          renderItem={({item}) => this.renderNativeItem(item)}
          keyExtractor={(item, index) => index.toString()}
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
