import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    WorkSans_400Regular,
    WorkSans_600SemiBold,
} from '@expo-google-fonts/work-sans'

export default function TextClass(props) {

    let [fontsLoaded] = useFonts({
        WorkSans_400Regular,
        WorkSans_600SemiBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        if(props.style && props.style.fontWeight && props.style.fontWeight == "bold"){
            return(
                <Text {...props} style={[styles.txtBold, props.style]}>{props.children}</Text>
            )
        }
        return (
            <Text {...props}  style={[styles.txt, props.style]}>{props.children}</Text>
        );
    }
}

const styles = StyleSheet.create({
    txt: {
        fontFamily: "WorkSans_400Regular"
    },
    txtBold: {
        fontFamily: "WorkSans_600SemiBold"
    },

});


