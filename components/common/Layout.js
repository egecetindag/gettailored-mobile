import { View, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import {Video} from 'expo-av'
import StackScreen from './StackScreen';
import Header from './Header';
// import Footer from './Footer';
// import Header from './Header';
// import '../../assets/styles/layout.less';


function Layout(props) {

    return (
        <>
            {props.type === "small" &&
                <View style={styles.smallHeader}>
             
                        <Header type={props.type}/>
                        {/* <Header title={props.title} type={props.type}/> */}
                        <View style={styles.layout}>
                            {props.children}
                        </View>
                        {/* <Footer /> */}
                 
                </View>

            }
            {props.type === "full" &&
                <View>
                    <Video
                    isMuted={true}
                    resizeMode={"cover"}
                    rate={1.0}

                    shouldPlay
                    isLooping
                    ignoreSilentSwitch={"obey"}
                        style={styles.headerImg}
                        source={require('./bg.mp4')}
                    />
                    <View style={styles.bgEffect} />
                    <ScrollView >
                        <Header type={props.type}/>
                        {/* <Header title={props.title} type={props.type}/> */}
                        <View style={styles.layout}>
                            {props.children}
                        </View>
                        {/* <Footer /> */}
                    </ScrollView>
                </View>
            }
        </>



    );
}

const styles = StyleSheet.create({
    layout: {
        //   flex: 1,
        //   backgroundColor: '#fff',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        flex: 1,
        backgroundColor: "white"
    },
    smallHeader: {
        backgroundColor:"#19181a",
        flex:1
    },
    headerImg: {
        zIndex: -1,
        position: "absolute",
        width: "100%",
        height: 650,
        left: 0
    },
    bgEffect: {
        zIndex: -1,
        height: "100%",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100%",
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
});
export default Layout;
