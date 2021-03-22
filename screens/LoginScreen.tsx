import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../data/AuthContext";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
const url = "http://wbclone.herokuapp.com/"
// const url = "http://127.0.0.1:8000/"


export default function LoginScreen() {
  const { singIn } = React.useContext(AuthContext);

  const [user,setUser] = React.useState('')
  const [err,setErr] = React.useState('')

  const navigation = useNavigation();

  const storeData = async (user:any) => {
    try {
      await AsyncStorage.multiSet([['username',user.username],['id',user.id.toString()]])
      singIn()
      navigation.navigate("Login");
    } catch (e) {
      // saving error
    }
  }

  const logIn = async() =>{
    await axios({
      method:"POST",
      url:`${url}api/login/`,
      data:{"username":user},
      headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
  }).then(res=>{
     storeData(res.data)
  }).catch(err=>{
      setErr(err.response.data.msg)
  })
  }

  return (
    <View style={styles.root}>
      <View
        style={[styles.box,{
          display: err ? "flex" : "none",
          flexDirection:"row",
        }]}
      >
        <Text style={{fontSize:24,color:"red",textAlign:"left"}}>{err}</Text>
        <Text style={{position:"absolute",right:0,fontSize:24,color:"red"}}
          onPress={()=>setErr("")}
        >X</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.headerText}>Log in and get connect</Text>
      </View>
      <View style={styles.inputBox}>
        <MaterialCommunityIcons
          name="face"
          size={24}
          style={{
            position: "absolute",
            color: "#000",
            paddingTop: 7,
            paddingRight: 0,
            paddingLeft: 10,
            paddingBottom: 7,
          }}
        />
        <TextInput
          style={{
            paddingTop: 7,
            paddingRight: 7,
            paddingLeft: 45,
            paddingBottom: 7,
            fontSize: 18,

            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#ccc",
            borderRadius: 5,
          }}
          value={user}
          onFocus={()=>setErr("")}
          onChangeText={setUser}
          placeholder="Username or Email"
          placeholderTextColor="#000"
        />
      </View>
      <View style={styles.submitBox}>
        <TouchableOpacity onPress={logIn} disabled={err ? true : false}>
          <Text
            style={{
              padding: 7,
              backgroundColor: err ? "#ccc":"#37a000",
              borderRadius: 5,
              textAlign: "center",
              fontSize: 20,
              color: err ? "#000":"#fff",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View
          style={{
            width: "45%",
            backgroundColor: "#000",
            height: 1,
          }}
        ></View>
        <View style={{ width: "10%" }}>
          <Text style={{ textAlign: "center", fontSize: 18 }}>or</Text>
        </View>
        <View
          style={{
            width: "45%",
            backgroundColor: "#000",
            height: 1,
          }}
        ></View>
      </View>
      <TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          borderRadius: 5,
          backgroundColor: "#4285F4",
          padding: 7,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#ccc",
        }}
      >
          <View
            style={{
              width: "10%",
            }}
          >
            <FontAwesome5 name="google" size={20} color="#000" />
          </View>
          <View style={{ width: "100%", marginLeft: "-10%" }}>
            <Text style={{ textAlign: "center", fontSize: 18, color: "#fff" }}>
              Sing in With Google
            </Text>
          </View>
      </View>
      </TouchableOpacity>

      <View style={styles.submitBox}>
        <TouchableOpacity>
          <Text
            style={{
              padding: 7,
              borderRadius: 5,
              textAlign: "center",
              fontSize: 20,
              color: "#000",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#ccc",
            }}
          >
            <MaterialCommunityIcons name="apple" size={20} />
            Sing in With Apple
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 30,
          width: "100%",
          backgroundColor: "#ccc",
          height: 1,
        }}
      ></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View
          style={{
            width: "25%",
            backgroundColor: "#000",
            height: 1,
          }}
        ></View>
        <View style={{ width: "50%" }}>
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            New to MyChat ?
          </Text>
        </View>
        <View
          style={{
            width: "25%",
            backgroundColor: "#000",
            height: 1,
          }}
        ></View>
      </View>
      <View style={styles.submitBox}>
        <TouchableOpacity>
          <Text
            style={{
              padding: 7,
              borderRadius: 5,
              textAlign: "center",
              fontSize: 20,
              backgroundColor: "#1D4354",
              color: "#fff",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#ccc",
            }}
          >
            Sing Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent:"center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  box: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    marginTop: 30,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
  },
  submitBox: {
    marginTop: 20,
  },
});
