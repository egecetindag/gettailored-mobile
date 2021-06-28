import React from 'react';
import { Icon } from 'react-native-elements'
import Text from '../common/Text';
import Button from '../common/Button';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// import '../../assets/styles/service-components.less';


function StickyCard(props) {
  return (
    <View  style={styles.stickyCard}>
      <View style={{justifyContent:"space-between", flexDirection:"row"}} >
        <Text style={styles.title}>Cart</Text>
      <TouchableOpacity onPress={()=>props.setModalVisible(false)}><Icon name='close' /></TouchableOpacity>
      </View>
      {props.children}
      {/* <br /> */}
      
     
      <View style={styles.total} >
        <Text style={styles.txtM}>Subtotal</Text>
        <Text style={styles.txtM}>£{props.cost}</Text>
       
      </View>
      <Text numberOfLines={1} ellipsizeMode="clip" style={{fontSize:15,marginBottom:20}}>-----------------------------------------------</Text>
      <View style={{   height: 40}}>
        <Button style={styles.btn} disabled={props.disabled} onClick={() => props.onNext()}>
          <Text style={styles.txt}>Proceed</Text>
        </Button>
      </View>
    </View>
  );
}

export default StickyCard;
const styles = StyleSheet.create({
  stickyCard:{
    padding: 0,
    top: 0,
    backgroundColor: "rgba(196, 196, 196, 0.15)",
    flex:1,
    padding:20
  },
  total:{
    flexDirection:"row",
    flexGrow:0,
    flexShrink:0,
    marginTop:20,
    borderRadius: 3,
    justifyContent: "space-between",
 
    
  },
  btn:{
    backgroundColor: "#103154",
    color: "white",
 
    paddingHorizontal:40,

  },
  title:{
    fontSize:25,
    marginBottom:10
  },
  txt:{
    color:"white"
  },
  txtM:{
    fontSize:20
  },

});