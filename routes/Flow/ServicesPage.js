import React, { useEffect, useRef, useState } from 'react';
// import { Form, Select, Badge, Slider } from 'antd';

import ServiceCard from '../../components/Service/ServiceCard';
import ServiceCategory from '../../components/Service/ServiceCategory';
import ServiceLine, { ServiceLineCart } from '../../components/Service/ServiceLine';
import StickyCard from '../../components/Service/StickyCard';
import { addCartItem, removeCartItem, setCartType } from '../../actions/BookingActions'
import { useDispatch, useSelector } from 'react-redux';

// import { useParams } from 'react-router-dom';
// import { Input } from 'antd';
// import Button from '../../components/common/Button';
// import Text from '../../components/common/Text';
import Cart from '../../components/Service/Cart';
import Button from '../../components/common/Button';
import MobileStickyButton from '../../components/Service/MobileStickyButton';
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity, Picker, Text } from 'react-native';
// import {Picker} from '@react-native-community/picker';
// import Ruler from '../../components/Common/Ruler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Formik } from 'formik';

function Service(props) {
  const dispatch = useDispatch();
  const params = props.params
  const serviceRef = useRef(null);
  //   const [form] = Form.useForm();
  const inputRef = useRef(null);
  const categoriesColRef = useRef(null);
  const [opt, setSelectOpt] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedService, setSelectedService] = useState({});
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const { services, cart, inputs } = useSelector(state => ({
    services: state.service.services,
    cart: state.booking.cart,
    inputs: state.service.serviceInputs
  }));

  const addToCartCallback = (serviceName, cost, code) => {
    setSelectedService({ name: serviceName, cost: cost, code: code });
    if (cart && cart.length === 0) {
      dispatch(setCartType(params.type))
    }
    if (params.type === "self" && inputs[code] && inputs[code].length > 0) {
      // inputRef.current.scrollIntoView();
      serviceRef.current?.scrollToEnd()
    }
    else {
      dispatch(addCartItem(selectedCategory.name, serviceName, cost, code));
    }

  }
  const addCartSelfService = (values) => {
    let inputArr = [];
    Object.keys(values).map(key => {
      if (key !== "otherColor") {
        inputArr.push({ ...inputs[selectedService.code].find(s => s.code === key), options: null, value: values[key] === "other" ? values.otherColor : values[key].toString() })
      }
    });

    dispatch(addCartItem(selectedCategory.name, selectedService.name, selectedService.cost, selectedService.code, inputArr))
    console.log("serviceRef", serviceRef)
    setSelectedService({});
  }
  const deleteItem = (i) => {
    dispatch(removeCartItem(i));
  }
  const next = () => {
    console.log("nexxtt")
    props.onNext();
  }
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 16 },
  };
  useEffect(() => {
    setSelectedCategory();
    setSelectedService({});
    setSelectedCategoryId();
    setTotal(0);
  }, [params.type]);

  useEffect(() => {
    let total = cart.reduce((a, { cost }) => a + cost, 0);
    setTotal(total);
  }, [cart])
  useEffect(() => {
    if (selectedCategory) {
      serviceRef.current?.scrollTo({ x: 0, y: 700, animated: "true" });
    }

  }, [selectedCategory])

  return (
    <View style={{ background: "red", flex: 1 }}>
      <ScrollView ref={serviceRef} style={{ background: "red", flex: 1 }}>
        <View style={styles.categoriesRow}>
          <View>
            <ServiceCard title="Choose a Category">
              <View style={styles.categoriesRow}>
                {services.map((category, i) =>
                  <ServiceCategory key={i} active={i === selectedCategoryId}
                    onClick={() => {
                      setSelectedCategory(category);


                      // setModalVisible2(true);
                      // setSelectedCategoryId(i);
                      // setSelectedService({});
                      // setSelectOpt(undefined) 
                    }}
                    icon={category.icon}
                    name={category.name} />
                )}
              </View>
            </ServiceCard>

          </View>
        </View>

        <View style={styles.categoriesRow}>
          {selectedCategory &&
            <ServiceCard title="Choose a Service" >
              <View className="services-row">
                {selectedCategory.services.map((service, i) =>
                  <ServiceLine
                    active={service.code === selectedService.code}
                    key={i} addCartItem={() => {
                      addToCartCallback(service.name, service.cost, service.code);
                      // form.resetFields(); 
                      setSelectOpt(undefined)
                    }}
                    name={service.name} cost={service.cost} />)}
              </View>
            </ServiceCard>
          }
        </View>
        <View style={styles.categoriesRow}>
          {params.type === "self" && inputs[selectedService.code] && inputs[selectedService.code].length > 0 &&
            <ServiceCard title="Inputs"  >
              <View className="inputs-row">
                <Formik
                  onSubmit={addCartSelfService}
                  name="register"
                  initialValues={{}}
                >
                  {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
                    let a = inputs[selectedService.code].map(inp =>
                      <>
                        <Text style={{ marginLeft: 10, marginBottom: 10, fontSize: 15 }}>{`*${inp.name} (${inp.desc})`}</Text>
                        <View style={styles.pickerView}>
                          <Picker
                            selectedValue={values[inp.code]}
                            style={styles.picker}
                            onValueChange={handleChange(inp.code)}
                          >
                            {inp.options && inp.options.map(option =>
                              <Picker.Item label={
                                option.value
                              } value={option.value} />
                            )}
                          </Picker>
                        </View>

                        {/* <Form.Item
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                        label={`${inp.name} (${inp.desc})` }
                        name={inp.code}
                        rules={[{ required: true, message: 'Please enter valid input!' }]}
                      >
                        {(inp.desc === "Inches" || inp.code === "amount") ? <Ruler arr={inp.options || []} /> :
                      
                          <Select
                            showSearch
                            onChange={(op) => { setSelectOpt(op) }}
                            placeholder="Please Select"
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{ width: '100%' }}>
                            {inp.options && inp.options.map(option =>
                              <Select.Option value={option.value}>
                                <View style={{ display: "flex", alignItems: "center" }}>
                                  {inp.code === 'color' ? <View style={{ width: "20px", height: "15px", marginRight: "10px", backgroundColor: option.value === "other" ? "white" : option.value }} /> : ""}
                                  {option.value}</View>
                              </Select.Option>)}
                          </Select>
                        }
                      </Form.Item> */}

                        {/* {(inp.code === "color" && opt === "other") ?
                        <Form.Item
                          name="otherColor"
                          label="Other Color Name"
                          rules={[{ required: true, message: 'Please enter valid color!' }]}
                        ><Input />
                        </Form.Item> :

                        ""} */}
                      </>

                    );
                    return <>{a}
                      <Button onClick={handleSubmit} style={styles.btnStyle} type="primary">
                        <Text style={{ color: "white" }} >Add to cart</Text>
                      </Button>
                    </>;
                  }}

                  {/* <Button type="primary" htmlType="submit">
                    Add to cart
                    </Button> */}
                </Formik>

              </View>
            </ServiceCard>
          }
        </View>

      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >

        <Cart cart={cart} setModalVisible={setModalVisible} total={total} next={next} deleteItem={deleteItem} />
      </Modal>
      <View>
        <MobileStickyButton cart={cart} setModalVisible={setModalVisible}>
          {/* <Cart cart={cart} total={total} next={next} deleteItem={deleteItem} /> */}

        </MobileStickyButton></View>
    </View>

  );
}

export default Service;

const styles = StyleSheet.create({
  btnStyle: {
    color: "white",
    marginTop: 20
  },
  img: {
    width: 40
  },
  categoriesRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

  },
  pickerView: {
    backgroundColor: "white",
    marginLeft: 10,
    borderRadius: 10,
    width: 150,

  },
  picker: {
    height: 40,
    width: 150,
    marginLeft: 10,

  }

});