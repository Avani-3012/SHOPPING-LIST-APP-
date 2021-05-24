import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase"; 

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
      confirmPassword: "",
      isModalVisible: "false",
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email_id: this.state.emailId,
            password: this.state.password,
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.props.navigation.navigate('EnterItems')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                placeholderTextColor="green"
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                placeholderTextColor="green"
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Email"}
                placeholderTextColor="green"
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                placeholderTextColor="green"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Confrim Password"}
                placeholderTextColor="green"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity style={styles.modalButton}
                  onPress={() =>
                    this.userSignUp(
                     
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => this.setState({ isModalVisible: false })}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={{ backgroundColor: "#EEF6E9" }}>
        <View style={styles.container}>
          <Text style={styles.title}>SHOPPING LIST APP</Text>
        </View>
        {this.showModal()}

        <View style={{ paddingBottom: 50, marginBottom: 50, marginTop: 50 }}>
          <Image
            source={require("../assets/shoppingBag.jpg")}
            style={{
              alignSelf: "center",
              width: 300,
              height: 300,
              marginTop: 50,
            }}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder="Enter Email-ID"
            keyboardType={"email-address"}
            onChangeText={(text)=>{
              this.setState({
                emailId:text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={(text)=>{
              this.setState({
                password:text
              })
            }
          }
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}
          >
            <Text>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}
          >
            <Text>SIGNUP</Text>
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
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#ff8a65",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 550,
    marginTop: 30,
    borderRadius: 25,
    backgroundColor: "#62C4DC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  modalButton: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 550,
    marginTop: 40,
    borderRadius: 25,
    backgroundColor: "green",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  formTextInput: {
    width: "25%",
    height: 35,
    alignSelf: "center",
    borderColor: "green",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "green",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 50,
    marginTop: 90,
    marginBottom: 90,
  },
});
