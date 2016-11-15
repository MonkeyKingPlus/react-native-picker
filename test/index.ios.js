/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import Index from './app';

export default class ReactNativeComponents extends Component {
    render() {
        return (
            <Index/>
        );
    }
}
AppRegistry.registerComponent('ReactNativeComponents', () => ReactNativeComponents);
