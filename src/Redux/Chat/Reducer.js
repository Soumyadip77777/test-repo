import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType"

const initialvalue={
    chats:[],
    createdGroup:null,
    createdChat:null,
}

export const chatReducer=(store=initialvalue,{type,payload})=>{
    if(type===CREATE_CHAT){
        return{...store,createdChat:payload}
    }
    else if(type===CREATE_GROUP){
        return{...store,createdGroup:payload}
    }
    else if(type===GET_USERS_CHAT){
        return{...store,creats:payload}
    }

    return store;

}