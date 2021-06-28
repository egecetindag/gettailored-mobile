import React from 'react';
import { useSelector } from 'react-redux';
import Text from '../common/Text';
// import '../../assets/styles/service-components.less';
import SummaryCartLine from './SummaryCartLine';
import { StyleSheet, View } from 'react-native';

function CartInfo(props) {
    const { delivery } = useSelector(state => ({
        delivery: state.booking.delivery,
    }));
    return (
        <View style={styles.cartInfo}>
            {props.cart && props.cart.map((item, i) =>
                <SummaryCartLine key={i} {...item} />
            )}
            <View style={styles.total} >
                <Text style={styles.txtM}>Subtotal</Text>
                <Text style={{...styles.txtM , marginRight:10}}>£{props.total}</Text>
            </View>
            <Text numberOfLines={1} ellipsizeMode="clip" style={{ fontSize: 13}}>-----------------------------------------------</Text>
            {(props.delivery || delivery) && 
            <>
            <View style={{...styles.total, marginTop:10}} >
                <Text style={{fontSize:15, color:"orange"}} >Delivery</Text>
                <Text style={{fontSize:15, color:"orange", marginRight:10}}color="main" color="second-color" size="sm" size="sm">£{delivery ? delivery.toFixed(2) : props.delivery ? props.delivery : ''}</Text>
               
            </View>
            <Text style={{fontSize:13, color:"orange", marginBottom: 15}} numberOfLines={1} ellipsizeMode="clip" >-----------------------------------------------</Text>
            </>
            }
            
            { <View style={{...styles.total,marginTop:0} } >
                <Text style={styles.txtL}>Total</Text>
                <Text style={{...styles.txtL, marginRight:10}} >£{((delivery || 0) + props.total).toFixed(2)}</Text>
            </View>}
        </View>
    );
}

export default CartInfo;

const styles = StyleSheet.create({
    total: {
        flexDirection: "row",
        flexGrow: 0,
        flexShrink: 0,
        marginTop: 40,
        borderRadius: 3,
        justifyContent: "space-between",
    },
    txtM: {
        fontSize: 20,
        color:"#103154"
    },
    txtL: {
        fontSize: 24,
        color:"#103154"
    },
    cartInfo: {
        paddingHorizontal: 20,
       
    },
    serviceLine: {
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "white",
        height: 45,
        marginTop: 20,
        borderRadius: 10,
    },
    serviceLineActive: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    serviceLineCart: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        width: "100%",
        // box-shadow: rgb(23 43 77 / 20%) 0px 1px 1px, rgb(23 43 77 / 20%) 0px 0px 1px;
        marginTop: 10
    },
    dt2: {
        // flex:1,
        flexDirection: "column",
        borderRadius: 10,
        paddingVertical: 10,
        textAlign: "left"
    },
    dt: {
        overflow: "hidden",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "left"
    }

});