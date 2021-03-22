import axios from 'axios'
const url = "http://wbclone.herokuapp.com/"
// const url = "http://127.0.0.1:8000/"

export const getFriends = (data:any)=>async(dispatch:any) =>{
    await axios({
        method:"POST",
        url:`${url}api/friends/`,
        data:data,
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(res=>{
        dispatch({
            type:"GETFRIENDS",
            payload:res.data
        })
    }).catch(err=>{
        console.log(err)
    })

}