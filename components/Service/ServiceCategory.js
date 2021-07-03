import React from 'react';
import Text from '../common/Text';
// import '../../assets/styles/service-components.less';
import { View , StyleSheet} from 'react-native';
import Button from '../common/Button';
import SvgUri from 'react-native-svg-uri';

function ServiceCategory(props) {

  return (
    <Button onClick={props.onClick} style={props.active ? {...styles.service,...styles.active} : styles.service}>
        <View style={styles.circle}>
           <SvgUri height="50"  source={{uri:props.icon}} />
        </View>
        <Text size="xss" >{props.name}</Text>
    </Button>
  );
}

export default ServiceCategory;

const styles = StyleSheet.create({
  img:{
      width:40
  },
  circle:{
    height: 80,
    width: 80 ,
    backgroundColor: "rgba(196, 196, 196, 0.15)",
    borderRadius: 100,
    marginBottom: 5,
 
    alignItems: "center",
    justifyContent: "center"
  },
  service: {
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: "45%",
    height: 150,
    flex:0,
    paddingHorizontal:0,
    paddingVertical:0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  active: {
    padding: "10%",
  },
  titleStyle: {
    paddingBottom: "0%",
    letterSpacing: 6,
    color: "black",
    fontSize: 24,
  },
  // txtStyle:{
  //   textAlign:"center"
  // },
  container: {
    flex: 1,

  },
});