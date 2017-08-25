import React ,{Component}from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';

import BaseComponent from './baseComponent';
import SinglePicker from 'mkp-react-native-picker';

import {viewStyles} from '../themes/default';

const options = [{
    key: 1,
    value: "Option1"
}, {
    key: 2,
    value: "Option2"
}, {
    key: 3,
    value: "Option3"
}]

const another_options = [{
    key: 1,
    value: "OptionA"
}, {
    key: 2,
    value: "OptionB"
}, {
    key: 3,
    value: "OptionC"
}];

const optionsGroup = [options, another_options]

export default class Picker extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        }
        this.optionsGroupIndex = 0
    }

    render() {
        return <View style={viewStyles.main}>
            <TouchableOpacity
                style={{height:30,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                onPress={()=>{
                    this.singlePicker.show();
                }}>
                <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Single Picker(Click Me!)</Text>
            </TouchableOpacity>

            <View style={{height:50,justifyContent:'center'}}><Text>You have
                selected {this.state.selected}</Text></View>

            <TouchableOpacity
                style={{height:30,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'red'}}
                onPress={()=>{
                    this.optionsGroupIndex = Math.abs(this.optionsGroupIndex - 1)
                    this.singlePicker.setOption(optionsGroup[this.optionsGroupIndex]);
                }}>
                <Text>Switch Options</Text>
            </TouchableOpacity>

            <SinglePicker
                lang="en-US"
                ref={ref=>this.singlePicker=ref}
                onConfirm={(option)=>{
                    //this.setState({selected:option.value})
                }}
                onSelect={(option)=>{
                    this.setState({selected:option.value})
                }}
                options={options}
            >

            </SinglePicker>
        </View>
    }
}