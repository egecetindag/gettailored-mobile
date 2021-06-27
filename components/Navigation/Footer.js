
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../common/Button';
import Text from '../common/Text';

const StepsNavigationFooter = (props) => {
  return (
    <View className="service-navigation">
      {/* <Button disabled={props.onlyNext} onClick={() => props.onPrev()}>
        <Text color="white">Back</Text>
      </Button> */}
      <Button style={styles.btn} disabled={props.disabled} onClick={() => props.onNext()}>
        <Text style={{color:"white"}}>{props.title}</Text>
      </Button>
    </View>
  )
}

export default StepsNavigationFooter;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#103154",
    color: "white",
    paddingHorizontal: 40,

  }
});