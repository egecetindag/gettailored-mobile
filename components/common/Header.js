import { View, StyleSheet, Image, TouchableOpacity, LogBox, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { DrawerActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {  validatePostcode } from '../../actions/BookingActions';
import Text from './Text';
import Button from './Button';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';


function Header(props) {
  const navigation = useNavigation();
  const [valueIndex, setValueIndex] = useState(1);
  const route = useRoute();
  const dispatch = useDispatch();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

  var radio_props = [
    { label: 'SELF-MEASURE GARMENTS', value: 0 },
    { label: 'PREMIUM TAILOR VISIT', value: 1 }
  ];
  onPress = (i) => {
    setValueIndex(i);
  }
  const checkPostcode = (val) =>{
    console.log("aaa", val)
    dispatch(validatePostcode(val.postcode, val.radio === 1 ? 'prime' :'self', navigation))
  }
  return (
    <>
      {props.type === "small" &&
        <View style={styles.smallHeader}>
          <View style={styles.headerContainer}>
            <View />
            <View style={styles.header2}>
              <Image style={styles.image} source={require("./esclot-logo.png")} />
            </View>
            <View>
              <TouchableOpacity
                onPress={toggleDrawer}
                testID="CustomHeader-toggleDrawer">
                <Image style={styles.menuIcon} source={require('./menu.png')} />

              </TouchableOpacity>
            </View>
          </View>

        </View>


      }
      {props.type === "full" &&
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <View />
            <View style={styles.header2}>
              <Image style={styles.image} source={require("./esclot-logo.png")} />
            </View>
            <View>
              <TouchableOpacity
              style={{padding:10, paddingBottom:15}}
                onPress={toggleDrawer}
                testID="CustomHeader-toggleDrawer">
                <Image style={styles.menuIcon} source={require('./menu.png')} />

              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.titleStyle}>{route.name === "Home" ? "ALTERATION SERVICE TO YOUR LOCATION" : ""}</Text>
          </View>
          <View style={styles.btnWrapper}>
            <View style={styles.chooseServiceWrapper}><Text style={styles.chooseService}>CHOOSE YOUR  SERVICE</Text></View>
            {/* <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
                <Radio value="self">SELF-MEASURE GARMENTS</Radio>
                <Radio value="prime">PREMIUM TAILOR VISIT</Radio>
              </Radio.Group> */}
            <Formik
              onSubmit={values => checkPostcode(values)}
              name="basic"
              initialValues={{}}
            // validateOnChange={onChange}
            >
              {({ handleChange, handleBlur, handleSubmit,setFieldValue, values }) => (
                <>
                  <RadioForm
                    formHorizontal={false}
                    animation={true}
                  >
                    {/* To create radio buttons, loop through your array of options */}
                    {
                      radio_props.map((obj, i) => (
                        <RadioButton labelHorizontal={true} key={i} >
                          {/*  You can set RadioButtonLabel before RadioButtonInput */}
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={valueIndex === i}
                            onPress={(i)=>{onPress(i); setFieldValue('radio',i)}}
                            borderWidth={1}
                            buttonInnerColor={'#F7A116'}
                            buttonOuterColor={'#F7A116'}
                            buttonSize={8}
                            buttonOuterSize={20}
                            buttonStyle={{ borderRadius: 0 }}
                            buttonWrapStyle={{ marginLeft: 10, marginRight: 10, paddingLeft: '10%' }}
                          />
                          <RadioButtonLabel
                            obj={obj}
                            index={i}

                            // onPress={onPress}
                            labelStyle={{ fontSize: 14, color: 'white', fontSize: 16 }}
                            labelWrapStyle={{ marginBottom: 5, marginRight: 10 }}
                          />
                        </RadioButton>
                      ))
                    }
                  </RadioForm>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholderTextColor='#d2d2d2'
                      placeholder="Enter Your Postcode"
                      onChangeText={handleChange('postcode')}
                      onBlur={handleBlur('postcode')}
                      value={values.postcode}
                    />
                    <Button style={{ marginLeft: 0, backgroundColor: 'white', width: 70, height: 35, paddingVertical: 4, paddingHorizontal: 15 }} onClick={handleSubmit}>
                      <Text style={{ color: "black" }}>SCHEDULE</Text>
                    </Button>
                    {/* <Button>Schedule</Button> */}
                  </View>
                </>
              )}

            </Formik>
            <View className="location-check">
              {/* <Form
              onFinish={checkPostcode}
              initialValues={{
                postcode: ''
              }}
              >
                <Form.Item name="postcode" rules={[{ required: true, message: 'Postcode can not be empty!'}]}>
                  <Input  placeholder="Enter Your Postcode" />
                </Form.Item>
                <Button type='white' htmlType="submit">SCHEDULE</Button>
              </Form> */}
            </View>

          </View>
        </View>

      }

    </>
  );
}
const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -18,

    left: '5%',
    right: '5%'
  },
  input: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    height: 35,
    backgroundColor: '#1D1D1D',
    width: '62%',
    textAlign: 'center'

  },
  image: {
    width: 150,
    aspectRatio: 1.9,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  menuIcon: {
    width: 20,
    height: 20
  },
  header2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 20,

  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
  },
  chooseServiceWrapper: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 2,

    backgroundColor: '#1D1D1D',
    position: 'absolute',
    top: -18,
    left: '10%',
    right: '10%'
  },
  chooseService: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  titleStyle: {
    textAlign: "center",
    letterSpacing: 6,
    textShadowRadius: 4,
    textShadowOffset: { width: 4, height: 0 },
    textShadowColor: "rgba(0,0,0 ,0.2)",
    color: "white",
    fontSize: 28,
    lineHeight: 40
  },
  btnWrapper: {
    width: '100%',
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: 'white',
    minHeight: 150,
    marginBottom: 50,
    marginHorizontal: 20,
    // background: 'linear-gradient(to right, white 10%, transparent 10%, transparent 90%, white 90%) no-repeat',
    // backgroundSize: '100% 2',
    // backgroundPosition: '0 100%'

  },
  textStyle: {
    color: "white"
  },
  borderBtnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white"
  },

  smallHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 50,
    paddingHorizontal: "5%",
    alignItems: "center",
    height: 100,
    marginTop: 20

  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 50,
    paddingHorizontal: "5%",
    alignItems: "center",
    height: 550,
    marginTop: 20

  },
});

export default Header;
