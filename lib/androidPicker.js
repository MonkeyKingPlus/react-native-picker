import React,{Component,PropTypes} from "react";
import {
    StyleSheet,
    View,
    Dimensions
} from "react-native";
import WheelView from 'react-native-wheel';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class PickerAndroid extends Component {
    constructor(props) {
        super(props);
        this.items = this.props.children;
    }

    static propTypes = {
        mode: PropTypes.string,
        style: PropTypes.any,
        selectedValue: PropTypes.any,
        onValueChange: PropTypes.func
    };

    static defaultProps = {
        mode: 'slide',
        style: {width: SCREEN_WIDTH}
    };

    _onItemChange(index) {
        this.props.onValueChange(this.items[index].props.value);
    }

    render() {
        return <WheelView
            style={this.props.style}
            onItemChange={this._onItemChange.bind(this)}
            values={pluck(this.items,'label')}
            isLoop={false}
            selectedIndex={0}
            textSize={20}
            velocityFling={20}/>
    }
}

export class PickerItemAndroid extends Component {
    static propTypes = {
        value: PropTypes.any,
        label: PropTypes.string
    };

    render() {
        return <View/>;
    }
}

function pluck(collection, field) {
    let array = [];
    if (collection && collection.length > 0) {
        collection.forEach(item=> {
            array.push(item.props[field]);
        })
    }
    return array;
}