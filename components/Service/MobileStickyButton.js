// import { Badge, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import StickyCard from './StickyCard';
import { Badge } from 'react-native-elements'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Drawer from 'react-native-drawer'
import Button from '../common/Button';
import Text from '../common/Text';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function MobileStickyButton({ cart, children, closeControlPanel, openControlPanel, setModalVisible}) {
    const [visible, setVisible] = useState(true);

    const drawerRef = useRef(null);
    const navigation = useNavigation();
    // const showDrawer = () => {
    //     setVisible(true);
    // };
    // const onClose = () => {
    //     setVisible(false);
    // };
  

    return (
        <View style={styles.mobileStickyButton}>

            <View style={styles.wrapper}>
               {cart.length >0  &&<Badge
                    value={cart ? cart.length : 0}
                    textStyle={{fontSize:15}}
                    badgeStyle={{ backgroundColor: "orange",width:25, height:25, borderRadius:20 }}
                    containerStyle={{ position: 'absolute', top: -9, right: -10 }}
                />}

                <TouchableOpacity style={styles.insideCircle} onPress={()=>setModalVisible(true)}>
                    <Image style={styles.img} source={require("./shopping-cart.png")} />
                    {/* <img className="empty-cart-icn" src="/shopping-cart.svg" /> */}
                </TouchableOpacity>
            </View>

            {/* <Drawer
                ref={drawerRef}
                content={<View ><Text>Selamm</Text></View>}
                className="mobile-drawer"
                title="Cart"
                placement="right"
                closable={true}
                onClose={closeControlPanel}
                
            >
                <View><Text>Selammm</Text></View>
                {/* {children} 
            </Drawer> */}
        </View>
    );
}

export default MobileStickyButton;

const styles = StyleSheet.create({
    img: {

        aspectRatio: 1.13,
        width: "80%",
        height: undefined,
        // backgroundColor: "red"
    },
    mobileStickyButton: {
        // zIndex: 1,
        position: "absolute",

        right: 10,
        bottom: 10,
        width: 75,
        height: 75,
        borderRadius: 50,

        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        // boxShadow: "1 1 3 #b5b5b5",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    insideCircle: {
        width: 55,
        height: 55,
        flex: 1,
        alignItems: "center",

        justifyContent: "center"
    }
});