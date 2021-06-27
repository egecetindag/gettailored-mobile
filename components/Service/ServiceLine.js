import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import Text from '../common/Text';
import Button from '../common/Button';
// import '../../assets/styles/service-components.less';
// import {
//   DeleteOutlined
// } from '@ant-design/icons';

function ServiceLine(props) {
  return (
    <Button style={props.active ? {...styles.serviceLineActive,...styles.serviceLine} : styles.serviceLine} onClick={props.addCartItem}>
      <View style={styles.dt}>
        <Text numberOfLines={1} style={{fontSize:14, textAlign:"left"}}>{props.name} ..............................................................</Text>
      </View>
     
      <View className="dd"><Text size="xs"> £{props.cost}</Text></View>
    </Button>
  );
}

export function ServiceLineCart(props) {
  return (
    <View style={styles.serviceLineCart}>
      <View style={styles.dt2}>
        {/* <View> */}
          <Text style={{color:"#103154", fontSize:20}} >{props.category}</Text>
          <Text style={{color:"#757575", fontSize:12}} >{props.name}</Text>
          {props.inputs && props.inputs.map(inp => <Text size="xxs" color="second-color">{inp.name}: {inp.value}</Text>)}
          <Text style={{fontSize:20}}>£{props.cost}</Text>
        </View>
    
      <TouchableOpacity onPress={props.deleteItem} style={styles.cartIcon}><Icon size={18} color="white" type="antdesign" name='delete' /></TouchableOpacity>
    </View> 
  );
}

export default ServiceLine;

const styles = StyleSheet.create({
  cartIcon:{
    marginRight: 8,
    backgroundColor: "#F7A116",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal:5,
    borderRadius: 20,
    width:35,
    height:35,
    alignItems:"center",
    justifyContent:"center"
  },
  serviceLine: {
    paddingHorizontal: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "white",
    height: 45,
    marginTop: 20,
    borderRadius: 10,
  },
  serviceLineActive:{
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
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom:10,
    paddingHorizontal:20,
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
  dt2:{
    // flex:1,
    flexDirection: "column",
    borderRadius: 10,
    paddingVertical:10,
    textAlign: "left"
  },
  dt: {
    overflow: "hidden",
    flexDirection: "row",
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    textAlign:"left"
  }

});