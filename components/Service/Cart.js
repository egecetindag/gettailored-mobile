import React from 'react';
import { ServiceLineCart } from './ServiceLine';
import StickyCard from './StickyCard';
import { Image, StyleSheet, View } from 'react-native';

function Cart({ cart, deleteItem, setModalVisible, next, total }) {
    
    return (
        <StickyCard setModalVisible={setModalVisible} disabled={cart && cart.length < 1 ? true : false} cost={total} onNext={next}>
            {cart.length === 0 &&
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image style={styles.img} source={require("./shopping-cart.png")} />
                </View>
            }
            <View className="scrollable">
                {cart && cart.map((item, i) =>

                    <ServiceLineCart deleteItem={() => deleteItem(i)} key={i} {...item} />
                )}
            </View>
        </StickyCard>
    );
}

export default Cart;

const styles = StyleSheet.create({
    img: {
        opacity:0.3,
        aspectRatio: 1.13,
        width: "40%",
        height: undefined,
        // backgroundColor: "red"
    }
})