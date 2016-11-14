import React,{Component,PropTypes} from "react";
import {
    PickerIOS,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Dimensions
} from "react-native";

import PickerAndroid,{PickerItemAndroid} from './androidPicker';
import langs from '../lang';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let _Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let _PickerItem = Platform.OS === 'ios' ? _Picker.Item : PickerItemAndroid;

/*
 *自定义Picker
 * onValueChange:func
 * selectedValue:any
 * style:pickerStyleType
 * [android]enabled:bool
 * [android]mode:enum('dialog', 'dropdown')
 * [android]prompt:string, Prompt string for this picker, used on Android in dialog mode as the title of the dialog.
 * [ios]itemStyle:itemStylePropType, Style that applied to each of the item labels.
 * */
export default class SinglePicker extends Component {
    constructor(props) {
        super(props);
        this.lang = langs[this.props.lang];
        this.state = {
            modalVisible: false,
            selectedOption: this.props.options.filter((op)=> op.key === this.props.defaultSelectedValue)[0] || {}
        }
    }

    static propTypes = {
        options: PropTypes.array.isRequired,
        defaultSelectedValue: PropTypes.any,
        onSubmit: PropTypes.func,
        onValueChange: PropTypes.func,
        lang: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        options: [],
        lang: "zh-CN",
        style: {backgroundColor: "white"}
    };

    show() {
        this.setState(Object.assign({}, this.state, {modalVisible: true}));
    }

    hide() {
        this.setState({modalVisible: false});
    }

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                onRequestClose={()=>{}}
                visible={this.state.modalVisible}>
                <View style={styles.basicContainer}>
                    <View style={[styles.modalContainer,this.props.style]}>
                        <View style={{backgroundColor:'#CACACA',height:0.5,width: SCREEN_WIDTH}}/>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={[styles.button,styles.buttonLeft]} onPress={() => {
                                    this.setState({modalVisible: false});
                                }}>
                                <Text>{this.lang.BTN_CANCEL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,styles.buttonRight]} onPress={() => {
                                if (this.props.onSubmit) {
                                    if (!this.state.selectedOption.key && this.state.selectedOption.key !== 0) {
                                        let submitData = this.props.options[0] || {};
                                        if (!submitData && this.props.defaultSelectedValue) {
                                            submitData = this.props.options.filter((op)=> op.key === this.props.defaultSelectedValue)[0];
                                        }
                                        this.props.onSubmit(submitData);
                                    } else {
                                        this.props.onSubmit(this.state.selectedOption);
                                    }
                                }
                                this.setState({modalVisible: false});
                            }}>
                                <Text>{this.lang.BTN_CONFIRM}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:'#CACACA',height:0.5,width: SCREEN_WIDTH}}/>
                        <View style={styles.mainBox}>
                            <_Picker
                                ref={'picker'}
                                mode="dropdown"
                                style={styles.bottomPicker}
                                selectedValue={(this.state.selectedOption.key || this.state.selectedOption === 0) ? this.state.selectedOption.key : this.props.defaultSelectedValue}
                                onValueChange={val => {
                                    let curOption = this.props.options.filter((op)=> op.key === val)[0];
                                    this.props.onValueChange(curOption);
                                    this.setState(
                                        Object.assign({},this.state,{selectedOption:curOption}));                                }}>
                                {this.props.options.map((option, i) => {
                                    return (
                                        <_PickerItem
                                            key={i}
                                            value={option.key}
                                            label={option.value}
                                        />
                                    )
                                })}
                            </_Picker>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
    basicContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalContainer: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    buttonView: {
        height: 30,
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottomPicker: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 3 * 1,
    },
    mainBox: {},
    button: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonLeft: {
        justifyContent: 'flex-start'
    },
    buttonRight: {
        justifyContent: 'flex-end'
    }
});