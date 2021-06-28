import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../common/Text';
// import '../../assets/styles/service-components.less';


function ServiceCard({title, children, ...rest}) {
  return (
    <View style={styles.serviceCard} {...rest}>
        <View className="title"><Text style={styles.title}>{title}</Text></View>
        <View style={styles.children} >{children}</View>
    </View>
  );
}

export default ServiceCard;
const styles = StyleSheet.create({
  title:{
   fontSize:20
  },
  children:{
    // backgroundColor:"red",
    // flex:1,
    // flexDirection:"row",
    // flexWrap:"wrap",
    
  },
  title:{
    paddingLeft:"3%",
    fontSize:23,
    marginBottom:30
  },
  serviceCard:{
    paddingVertical: 40,
    paddingHorizontal:20,
    backgroundColor: "rgba(196, 196, 196, 0.15)",
    flex:1,
  
    marginBottom: 40,
   
  },
  
});