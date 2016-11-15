import React from 'react';
import BaseComponent from './baseComponent'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import {viewStyles} from '../themes/default';

export default class Home extends BaseComponent {
    render() {
        return <View style={viewStyles.main}>
            <TouchableOpacity
                style={{height:50,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                onPress={()=>{
                    this._goto('picker');
                }}>
                <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Picker</Text>
            </TouchableOpacity>
        </View>
    }
}