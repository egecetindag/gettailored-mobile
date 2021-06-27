import React from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loading(props) {
    return (
        <View style={styles.loading}>
          <ActivityIndicator color="#F7A116" size="large"/>
        </View>
    );
}


const styles = StyleSheet.create({
    loading:{
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: '#000000c9',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    position: 'absolute'
    }
})
