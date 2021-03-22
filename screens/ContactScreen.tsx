import React from 'react'
import { View, FlatList } from 'react-native'
import ContactListItem from '../components/ContactListItem'
import item from '../data/chatItem'

export default function ContactScreen(props) {

    return (
        <View style={{flex:1}}>
          <FlatList
            keyExtractor={item=>item.id.toString()}
            data={props.route.params.data}
            renderItem={({item})=>(
                <ContactListItem ChatRoom={item}/>
            )}
          />        
        </View>
    )
}


