import React, { Component } from "react";
import { Container, Content, List, Text, View } from "native-base";

import getArticles from "../../service/News";
import { Alert, ActivityIndicator } from "react-native";
import DataItem from "../../component/DataItem";
import Model from "../../component/model";
export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      setModelVisible: false,
      modalArticalData: {},
    };
  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData
    });
  }

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {}
    });
  }
  componentDidMount() {
    getArticles().then((data) => {
      this.setState({
        isLoading: false,
        data: data,
      });
    }),
      (error) => {
        Alert.alert("Error", error);
      };
  }

  render() {

    let view = this.state.isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
        <Text style={{marginTop: 10}} children="Please Wait.." />
      </View>
    ) : (
      <List
        dataArray={this.state.data}
        renderRow={(item) => {
            return (
              <DataItem onPress={this.handleItemDataOnPress} data={item} />
            )
        }} />
    )

    return (
      <Container>
        <Content>
          {view}
        </Content>
        <Model 
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}