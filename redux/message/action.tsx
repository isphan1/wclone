import axios from 'axios'
const url = "http://wbclone.herokuapp.com/"
// const url = "http://127.0.0.1:8000/"
import AsyncStorage from '@react-native-async-storage/async-storage';
const getData = async (data,username) => {
    try {
      const value = await AsyncStorage.getItem('username').then(val=>{
        if(val === username){
            axios({
                method:"POST",
                url:`${url}api/new/message/`,
                data:data,
                headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(res=>{
            }).catch(err=>{
                console.log(err)
            })
        }
      })
    } catch(e) {
      // error reading value
    }
  }

export const getMessage = (data:any)=>async(dispatch:any) =>{
    await axios({
        method:"POST",
        url:`${url}api/messages/`,
        data:data,
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(res=>{
        dispatch({
            type:"GETMESSAGE",
            payload:res.data
        })
    }).catch(err=>{
        console.log(err)
    })

}

export const newMessage = (data:any)=>async(dispatch:any) =>{
    dispatch({
        type:"NEWMESSAGE",
        payload:{
            "id": Math.floor(Math.random())*576464,
            "createdAt": new Date().toUTCString(),
            "content": data.msg,
            "user": {
                "id": data.uid,
                "name": data.s_name
            }
        }
    })

    getData(data,data.s_name)

}
