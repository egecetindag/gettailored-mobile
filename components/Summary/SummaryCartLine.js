import React from 'react';
import Text from '../common/Text';
// import '../../assets/styles/summary-components.less';
import { View, StyleSheet } from 'react-native';

function SummaryCartLine(props) {
// console.log(props)
  return (
    <View style={styles.summaryCartLine}>
      <View style={styles.dt}>
        <View>
          <Text style={{color:"#103154", fontSize:18}}>{props.category || props.category_name}</Text>
          <Text style={{color:"#757575", fontSize:10}}>{props.name}</Text>
          {props.inputs && props.inputs.map(inp => <Text size="xxs" color="second-color">{inp.name}: {inp.value}</Text>)}
          
        </View>
      </View>
      <View style={styles.cost}><Text style={{color:"white"}}>£{props.cost}</Text></View>
    </View>
  );
}
export default SummaryCartLine;



const styles = StyleSheet.create({
    cost:{
        marginRight: 8,
        backgroundColor: "#F7A116",
        color: "white",
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 16
    },
    summaryCartLine: {
      paddingVertical: 10,
paddingHorizontal:10,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: "white",

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
 
    dt: {
      
      flexDirection: "column",
    
      alignItems:"center",
      justifyContent:"center",
      textAlign:"left"
    }
  
  });