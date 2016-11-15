import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity
} from 'react-native';

import Home from './components/home'
import Picker from './components/picker'

const routes = [{
    title: 'home',
    component: Home,
    index: 0
},
    {
        title: 'picker',
        component: Picker,
        index: 1
    }
];
export default class Index extends Component {
    render() {
        return <Navigator
            initialRoute={routes[0]}
            initialRouteStack={routes}
            renderScene={(route,navigator)=>
                <route.component navigator={navigator} routes={routes}/>
            }
            navigationBar={
                 <Navigator.NavigationBar
                   routeMapper={{
                     LeftButton: (route, navigator, index, navState) =>{
                         return (
                          <TouchableOpacity onPress={()=>{
                                navigator.pop();
                          }}>
                            <Text>back</Text>
                            </TouchableOpacity>
                          );
                      },
                      RightButton: (route, navigator, index, navState) =>{},
                     Title: (route, navigator, index, navState) =><Text>{route.title}</Text>
                   }}
                 />
            }
        />
    }
}