import {
    StyleSheet,
    Platform
} from "react-native";

export const viewStyles = StyleSheet.create({
    main: {
        ...Platform.select({
            android: {
                ...margin(44, 0, 0, 0),
            },
            ios: {
                ...margin(64, 0, 0, 0)
            }
        }),
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
});

/*
 * 设置margin，参数和css一样。
 * 一个参数则设置top=right=bottom=left=value1
 * 两个参数则设置top=bottom=value1,left=right=value2
 * 三个参数设置top=value1,right=value2,bottom=value3,left=null
 * 四个参数设置top=value1,right=value2,bottom=value3,left=value4
 * */
export function margin(...args) {
    let result = {};
    if (args.length === 0) {
        throw new Error(`margin miss parameter`);
    }
    if (args.length === 1) {
        result.marginTop = result.marginRight = result.marginBottom = result.marginLeft = args[0];
    }
    else if (args.length === 2) {
        result.marginTop = result.marginBottom = args[0];
        result.marginLeft = result.marginRight = args[1];
    }
    else if (args.length === 3) {
        result.marginTop = args[0];
        result.marginRight = args[1];
        result.marginBottom = args[2];
    }
    else {
        result.marginTop = args[0];
        result.marginRight = args[1];
        result.marginBottom = args[2];
        result.marginLeft = args[3];
    }
    return result;
}