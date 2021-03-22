const initialState={
    friends:false
}


export default function (state=initialState,action:any) {
    
    switch (action.type) {
        case "GETFRIENDS":
            return {
                ...state,
                friends:action.payload,
            }
        default:
            return state;
    }
}