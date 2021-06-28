import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
export default function Button(props) {
    return (
       
            <TouchableOpacity 
                style={[styles.buttonStyle, props.style]}
                onPress={props.onClick ? props.onClick : undefined}>
                {props.children}
            </TouchableOpacity>
       
    );
}
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#103154",
        height: 40,
        paddingVertical: 2,
        paddingHorizontal: 40,
        alignItems:"center",
        flex:1,
        justifyContent:"center"
    },
});