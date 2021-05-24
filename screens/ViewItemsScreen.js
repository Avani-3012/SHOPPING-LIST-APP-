import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { ListItem } from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import { ScrollView } from "react-native";

export default class EnterItemsScreen extends Component {
constructor(){
  super();
  this.state={
    listOfItems:[]
  }
  this.listRef=null
}


 viewList=()=>{
 this.listRef=db.collection('entered_items')
 .onSnapshot((snapshot)=>{
  var itemsList = snapshot.docs.map((doc)=>doc.data())
  this.setState({
    listOfItems:itemsList
  })
 })
 }

componentDidMount(){
  this.viewList()
}

componentWillUnmount(){
  this.listRef()
}

keyExtractor = (item, index) => index.toString()

renderItem=({item,i})=>{
console.log(item.item_name)
return(
<View style={styles.listContainer}>
 <Text style={styles.listTitle}>{item.item_name}</Text>
 </View>
)
}



  render() {
    return (
      <View>
        <View style={styles.logOutContainer}>
        <TouchableOpacity 
          style={styles.logOutButton,{backgroundColor:"#EEF6E9"}}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
         <Text style={{fontColor:'green',fontWeight:"bold"}}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
           
    
     <View>
     <View style={styles.container}>
              <Text style={styles.title}>View Your Important Items To Buy</Text>
           
               </View>
     {
            this.state.listOfItems.length === 0
            ?(
              <Text>No items</Text>
            )
            :(
              <ScrollView>
              <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.listOfItems}
              renderItem={this.renderItem}
        
              />
              </ScrollView>
            )
          }
   

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
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#62C4DC',
    borderRadius:10,
    borderWidth:3,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderWidth:3,
    backgroundColor:"#62C4DC",
    shadowColor: "#000",
    marginLeft:200,
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
    logOutButton : {
      height:30,
      width:80,
     
     
     borderColor:"green",
      borderWidth:2
    },
    logOutContainer: {
      flex: 1,
      backgroundColor:"#EEF6E9",
      alignItems: "center",
      justifyContent: "center",
      
    },
   listTitle:{
    flex: 1,
    fontColor:"black",
    fontWeight:"bold",
    fontSize:30,
    alignItems: "center",
    justifyContent: "center",
   },
   listContainer:{
    width:"100%",
    height:55,
    alignSelf:'center',
    borderColor:'"#EEF6E9',
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
});

