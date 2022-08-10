import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import Separator from "./separator";

function Device(props) {
    return (
        <>
        <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
            <View style={styles.wrapperLeft}>
                <Image style={styles.iconLeft} source={props.iconLeft} />
            </View>
            <View style={styles.wrapperName}>
                <Text style={styles.name}>{props.name}</Text>
            </View>
            <Image source={props.iconRight} style={styles.iconRight} />
        </TouchableOpacity>
        <Separator/>
        </>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between"
    },
    wrapperLeft: {
        width: 60,
        height: 60,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    iconLeft: {
        width: 40,
        height: 40
    },
    wrapperName: {
        flex: 1,
        justifyContent: "flex-start", marginLeft: 15,
    },
})

export default Device;