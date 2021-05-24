import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import firebase from "firebase";
import db from '../config'

export default class EnterItemsScreen extends Component {
  constructor() {
    super();
    this.state = {
      foodItemName: "",
      consumers: "",
      quantitiy: "",
      dateBought: "",
    };
  }

  createItemList = () => {
    db.collection("entered_items").add({
      item_name: this.state.foodItemName,
      no_of_users: this.state.consumers,
      quantitiy: this.state.quantitiy,
      date_bought: this.state.dateBought,
    });
  };

  render() {
    return (
      <View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity
            style={(styles.logOutButton, { backgroundColor: "#EEF6E9" })}
            onPress={() => {
              this.props.navigation.navigate("WelcomeScreen");
              firebase.auth().signOut();
            }}
          >
            <Text style={{ fontColor: "green", fontWeight: "bold" }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Enter Your Essential Item</Text>
        </View>
        <View>
          <TextInput
            style={styles.formTextInput}
            placeholder="Enter Your Food Item"
            onChangeText={(text)=>{
              this.setState({
                foodItemName:text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Enter The Number Of Members in your family"
            onChangeText={(text)=>{
              this.setState({
                consumers:text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Enter The Quantity Of Your Food Item"
            onChangeText={(text)=>{
              this.setState({
                quantitiy:text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="When did you purchase it?"
            onChangeText={(text)=>{
              this.setState({
                dateBought:text
              })
            }}
          />
          <TouchableOpacity style={styles.button}  onPress={()=>{
              this.createItemList()
            }}>
            <Text style={{ fontColor: "black" }}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#62C4DC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
  },
  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 30,
    color: "black",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#62C4DC",
    borderRadius: 10,
    borderWidth: 3,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft:10,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: "#62C4DC",
    shadowColor: "#000",
    marginLeft: 180,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  logOutButton: {
    height: 30,
    width: 80,
    marginLeft: -1050,

    borderColor: "green",
    borderWidth: 2,
  },
  logOutContainer: {
    flex: 1,
    backgroundColor: "#EEF6E9",
    alignItems: "center",
    justifyContent: "center",
  },
});