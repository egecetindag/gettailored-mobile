import React, { useEffect, useState } from 'react';
import Text from '../common/Text';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
function TimeslotButton({ text, active, onSelectHour, type, onSwitch, checked }) {
    return (
        <TouchableOpacity onPress={onSelectHour} style={active ? styles.timeslotActive : styles.timeslotButton} >
            <Text style={active ? { color: "white" } : {}}>{text}</Text>
        </TouchableOpacity>
    )
}

function TimeSlotPicker(props) {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    // Has to be properly formatted
    const handleConfirm = (value) => {
        setDatePickerVisible(false);
        props.onChange(value)
    }
    console.log("activeHourrr", props.disabledDate)
    var momentSelectedDate = props.selectedDate ? moment(props.selectedDate, 'YYYY-MM-DDT') : undefined
    return (

        <View style={styles.timePickerWrapper}>
            <View style={styles.timePicker}>

                <View style={styles.select}><Text onPress={() => setDatePickerVisible(true)}>{props.selectedDate ? momentSelectedDate.format("DD-MM-YYYY") : "Please select a date"}</Text></View>
                <DateTimePickerModal
                    minimumDate={moment(props.disabledDate()).toDate()}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePickerVisible(false)}
                    date={moment(momentSelectedDate).toDate()}
                />


                {/* <Form.Item
          rules={[{ required: true, message: 'Please select pickup date!' }]}
          label={label}
          initialValue={selectedDate ? momentSelectedDate : undefined}
          name={name}
        >
          <Calendar onChange={onChange}
            disabledDate={disabledDate}
            fullscreen={false}
          />


        </Form.Item> */}
            </View>
            {props.timeslots && <Text style={{ marginBottom: 10 }}>*Select time</Text>}
            <View style={styles.timepickerSlots}>
                {props.timeslots && props.timeslots.map((timeslot, i) => <TimeslotButton key={i} checked={timeslot.status}
                    // onSwitch={() => onSwitch(props.timeslot)}
                    type={props.type} active={props.activeHour === timeslot.slot}
                    onSelectHour={() => props.onSelectHour(timeslot.slot)}
                    text={timeslot.interval} />)}
            </View>

        </View>
    );
}
export default TimeSlotPicker;

const styles = StyleSheet.create({

    timePicker: {
        marginBottom: 20
    },
    timepickerSlots: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    timeslotButton: {
        backgroundColor: "white",
        width: 100,
        borderRadius: 10,
        marginBottom: 15,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,

    },
    timeslotActive: {
        backgroundColor: "white",
        width: 100,
        borderRadius: 10,
        marginBottom: 15,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: "#F7A116",

    },
    select: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10
    }

});
