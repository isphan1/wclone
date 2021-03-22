import React,{useEffect,useRef} from 'react'
import { View, Text,TextInput, FlatList, StyleSheet, ImageBackground, Keyboard, Dimensions } from 'react-native'
import Chats from '../data/chats'
import { useFocusEffect } from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { connect } from 'react-redux';
import {io} from 'socket.io-client'
import { getMessage, newMessage } from '../redux/message/action';
import AuthContext from "../data/AuthContext";

const ChatRoomScreen = (props:any) =>{

    // const { ioRef } = React.useContext(AuthContext);
    // const msgRef = ioRef()

    const [message,setMessage]=React.useState('')
    const [info,setInfo]=React.useState([])
    const [loading,setLoading] = React.useState(false)

     var myId = ""

    const chatRef = React.useRef(null)
    const isInitialMount = React.useRef(true);

    const ChatRoom = props.route.params.chatList
    const msgRef = props.route.params.msgRef
    // console.log(ChatRoom.users[0].room)

    // const msgRef = React.useRef(io())

    React.useEffect(() => {
        if(isInitialMount.current){
            props.getMessage({'s_name':ChatRoom.users[0].name,"r_name":ChatRoom.users[1].name})
            setInfo(props.data.message)
            setTimeout(() => {
                    setLoading(false)  
                }, 1000);
        }

        return ()=>{
            setTimeout(() => {
                isInitialMount.current = false
            },100)
        }
    },[]);


React.useEffect(()=>{
    msgRef.current = io("https://wclonesocket.herokuapp.com/")
    // msgRef.current = io("ws://127.0.0.1:5000/")
    msgRef.current.emit("join",({name:ChatRoom.users[0].name,room:ChatRoom.users[0].room}))
    msgRef.current.on('myId',id=>{
        myId = id
      })
    msgRef.current.on('newMsg',({msg,user}:any)=>{
        if(user.id === myId){
            // console.log("if",user.id,myId)
            props.newMessage({'s_name':ChatRoom.users[0].name,"msg":msg,'r_name':ChatRoom.users[1].name,'uid':"u1"})               
        }
        else{
            // console.log("else",user.id,myId)
            props.newMessage({'s_name':ChatRoom.users[1].name,"msg":msg,'r_name':ChatRoom.users[0].name,'uid':"u2"})               

        }
    }
)
},[])

    const sendMessage = () =>{
        msgRef.current.emit("chatMsg",message)
        Keyboard.dismiss()
        setMessage("")
    }

    const leaveRoom = () =>{
        msgRef.current.emit('end')
    }

    React.useEffect(()=>{
        setInfo(props.data.message)
    },[props.data.message])

    return (
        <View style={{
            flex:1,
        }}>
            <ImageBackground
                style={{
                    width:"100%",
                    height:"100%"
                }}
                source={{uri:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F04%2FGrey-backgrounds-for-desktop.jpg&f=1&nofb=1"}}
            >
                {
                    loading ? 

               <View style={{flex:1,justifyContent:"center",alignItems:"center"}}> 
                    <Text style={{fontSize:24}}>Loading..............</Text>
               </View>
                    
                    :
            <FlatList
                ref={chatRef}
                onContentSizeChange={() => {
                    chatRef.current.scrollToEnd();
                }}
                keyExtractor={chats => chats.id.toString()+ Math.random()*975435}
                data={info.message}
                renderItem={({item})=>(
                    <ChatMessage ChatMessage={item}/>
                )}
            />
                }
                <View style={styles.messageDiv}>
                    <View style={styles.messageType}>
                    <FontAwesome5 name="laugh-beam" size={30} color="#000"/>
                        <TextInput 
                            style={{
                                flex:1,
                                paddingLeft:10,
                                paddingRight:10,
                                fontSize:20
                            }}
                            value={message}
                            onChangeText={setMessage}
                            multiline
                            placeholder="Start typing.........."
                            
                        />
                        <MaterialCommunityIcons style={{marginRight:10}} name="attachment" size={32} onPress={leaveRoom} color="#000"/>
                        {!message && <MaterialCommunityIcons name="camera" size={30} color="#000"/>}
                    </View>
                    <View style={styles.messageMike}>
                        {
                            message ? <MaterialCommunityIcons name="send" size={30} color="#fff"
                                onPress={sendMessage}
                            />
                                    : <MaterialCommunityIcons name="microphone" size={30} color="#fff"/>

                        }
                    </View>
                </View>
        </ImageBackground>
        </View>
    )
}
const mapStateToProps = (state:any) => ({
    data :state.messages
  });
  
  const mapDispatchToProps = (dispatch:any) => {
    return {
        getMessage: (data:any) => dispatch(getMessage(data)),
        newMessage: (data:any) => dispatch(newMessage(data)),

    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(ChatRoomScreen)

const styles = StyleSheet.create({
    messageDiv:{
        flexDirection:"row",
        alignItems:"flex-end",
        padding:10,
    },
    messageType:{
        flex:1,
        flexDirection:"row",
        backgroundColor:"#fff",
        padding:10,
        borderRadius:20,
        alignItems:"flex-end"
    },
    messageMike:{
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        backgroundColor:"#000",
        borderRadius:50,
        marginLeft:10
    }
})
