import React, { useEffect, useRef, useState } from 'react';

import moment from 'moment';
import { getTimeSlots, deleteTimeSlots, claimTimeSlots, setTimeValues } from '../../actions/TimeSlotActions'
import { useDispatch, useSelector } from 'react-redux';
import TimeSlotPicker from '../../components/Summary/TimeSlotPicker';
import CartInfo from '../../components/Summary/CartInfo';
import StepsNavigationFooter from '../../components/Navigation/Footer';
import MobileCartInfo from '../../components/Summary/MobileCartInfo';
import Text from '../../components/common/Text';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';


function TimeSlotPage(props) {
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [selectedPickupDate, setSelectedPickupDate] = useState(null);
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
    const deliveryRef = useRef(null);
    const buttonRef = useRef(null);

    const { deliveryTimeslots,
        pickupTimeslots,
        cart,
        successfullyCreatedID,
        pickupClaimed,
        deliveryClaimed,
        timeValues
    } = useSelector(state => ({
        successfullyCreatedID: state.booking.successfullyCreatedID,
        deliveryTimeslots: state.timeslots.deliveryTimeslots,
        pickupTimeslots: state.timeslots.pickupTimeslots,
        deliveryClaimed: state.timeslots.deliveryClaimed,
        pickupClaimed: state.timeslots.pickupClaimed,
        cart: state.booking.cart,
        timeValues: state.timeslots.timeValues
    }));
    const onChangePickup = (value) => {
        console.log("valuee", value, moment(value).format("YYYY-MM-DDT"))
        // setSelectedPickupDate(value.format("YYYY-MM-DDT"));
        dispatch(setTimeValues({
            pickupDate: moment(value).format("YYYY-MM-DDT"),
            pickupSlot: undefined,
            deliveryDate: undefined,
            deliverySlot: undefined
        }));
        // form.setFieldsValue({ deliveryDate: undefined });
        dispatch(deleteTimeSlots("pickupTimeslots"));
        dispatch(deleteTimeSlots("deliveryTimeslots"));
        dispatch(getTimeSlots(moment(value).format("YYYY-MM-DDT"), "pickup"));
    }
    const onChangeDelivery = (value) => {
        dispatch(setTimeValues({
            ...timeValues,
            deliveryDate: moment(value).format("YYYY-MM-DDT"),
            deliverySlot: undefined,
        }));
        // setSelectedDeliveryDate(value.format("YYYY-MM-DDT"));
        dispatch(deleteTimeSlots("deliveryTimeslots"));
        dispatch(getTimeSlots(moment(value).format("YYYY-MM-DDT"), "delivery"));
    }
    const onSelectPickupHour = (value) => {
        dispatch(setTimeValues({
            ...timeValues,
            pickupSlot: value
        }));
        // dispatch(claimTimeSlots({
        //     booking_id: successfullyCreatedID,
        //     type: 'pickup',
        //     slot: value,
        //     date: selectedPickupDate,
        // }, 'pickup'))
        console.log(value)
        // deliveryRef.current.scrollIntoView();
    }

    const onSelectDeliveryHour = (value) => {
        // dispatch(claimTimeSlots({
        //     booking_id: successfullyCreatedID,
        //     type: 'delivery',
        //     date: selectedDeliveryDate,
        //     slot: value,
        // }, 'delivery'))
        dispatch(setTimeValues({
            ...timeValues,
            deliverySlot: value
        }));
        console.log(value)
        // buttonRef.current.scrollIntoView({ block: "center" });
    }
    const isLaundyInCart = () => {
        let isL = false;
        cart && cart.map((item) => {
            if (item.category === "Laundry") {
                isL = true;
                return;
            }
        });
        return isL;
    }
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    const disabledDeliveryDate = (current) => {
        // Can not select days before today and today
        if (isLaundyInCart()) {
            return current && current < moment(form.getFieldsValue().pickupDate).add(3, 'days');
        }
        return current && current < moment(form.getFieldsValue().pickupDate).add(2, 'days');
    }
    useEffect(() => {
        let total = cart.reduce((a, { cost }) => a + cost, 0);
        setTotal(total);
    }, [cart])

    useEffect(() => {
        if (!successfullyCreatedID) {
            // props.onPrev();
        }


    }, [])

    const onProceed = () => {
        dispatch(claimTimeSlots({
            "booking_id": successfullyCreatedID,
            "pickup_slot": timeValues.pickupSlot,
            "delivery_slot": timeValues.deliverySlot,
            "pickup_date": timeValues.pickupDate,
            "delivery_date": timeValues.deliveryDate
        }, props.onNext))

    }

    return (
        <ScrollView className="time-slot-page">
            {window.innerWidth < 768 && <View><MobileCartInfo total={total} cart={cart} /></View>}
            <View style={styles.timeSlotCol}>
                <View ><Text style={styles.title}>Select Pickup & Delivery Dates</Text></View>
                <Formik
                    name="basic"
                    initialValues={{}}
                // onFinish={onFinish}

                // alValues={convertValues(info)}
                // onValuesChange={onChange}
                >{/* <View ref={deliveryRef}>
            {timeValues.pickupSlot &&
              <TimeSlotPicker onSelectHour={onSelectDeliveryHour}
                selectedDate={timeValues.deliveryDate}
                label="Delivery Date"
                activeHour={timeValues.deliverySlot}
                name="deliveryDate"
                timeslots={deliveryTimeslots}
                onChange={onChangeDelivery}
                disabledDate={disabledDeliveryDate} />}
          </View> */}
                    {/* <View ref={buttonRef}>
            {timeValues.deliverySlot && window.innerWidth < 768 && 
            <StepsNavigationFooter title="Proceed"
              disabled={false}
              onNext={onProceed}
              onPrev={props.onPrev} />}
          </View> */}
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                        <>
                            <View>
                                <Text style={{ marginTop: 20 }}>*Pickup Date</Text>
                                <TimeSlotPicker onSelectHour={onSelectPickupHour}
                                    label="Pickup Date"
                                    name="pickupDate"
                                    type="date"
                                    values={values}
                                    activeHour={timeValues.pickupSlot}
                                    selectedDate={timeValues.pickupDate}
                                    timeslots={pickupTimeslots}
                                    setFieldValue={setFieldValue}
                                    onChange={onChangePickup}
                                    disabledDate={disabledDate}
                                />
                                {timeValues.pickupSlot && <>
                                    <Text style={{ marginTop: 20 }}>*Delivery Date</Text>
                                    <TimeSlotPicker onSelectHour={onSelectDeliveryHour}
                                        selectedDate={timeValues.deliveryDate}
                                        label="Delivery Date"
                                        activeHour={timeValues.deliverySlot}
                                        name="deliveryDate"
                                        timeslots={deliveryTimeslots}
                                        onChange={onChangeDelivery}
                                        disabledDate={disabledDeliveryDate} />
                                </>
                                }
                                {timeValues.deliverySlot &&
                                    <StepsNavigationFooter title="Proceed"
                                        disabled={false}
                                        onNext={onProceed}
                                        onPrev={props.onPrev} />}
                            </View>

                        </>

                    )}
                </Formik>
            </View>

        </ScrollView>

    );
}

export default TimeSlotPage;

const styles = StyleSheet.create({
    timeSlotCol: {
        width: "100%",
        backgroundColor: "rgba(196, 196, 196, 0.15)",
        padding: 40,
        textAlign: "left",
        maxWidth: 720,
        marginBottom: 40,
        paddingRight: 30
    },
    title: {
        color: "#103154",
        fontSize: 20,
    }


});