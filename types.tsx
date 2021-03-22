export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  ChatRoom: undefined,
  Contacts:undefined,
  Login:undefined
};

export type MainTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;

};

export type User = {
  id:String,
  name:String,
  imageUri:String
}

export type Message = {
  id:String,
  content:String,
  createdAt:String
}

export type UserMessage = {
  id:String,
  content:String,
  createdAt:String,
  user:User

}

export type ChatRoom = {
  id:string,
  users:User[],
  lastMessage:Message
}