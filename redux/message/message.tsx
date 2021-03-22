const initialState={
    message:[{
        id:1,
        users:[],
        message:[]
    }]
}


export default function (state=initialState,action:any) {
    
    switch (action.type) {
        case "GETMESSAGE":
            return {
                ...state,
                message:action.payload,
            }
        case "NEWMESSAGE":
            return {
                ...state,
                message:{ 
                    message:[...state.message.message,action.payload]
                }
            }
        default:
            return state;
    }
}