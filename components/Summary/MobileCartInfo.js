import React, { useState } from 'react';
import CartInfo from './CartInfo';
// import { Collapse } from 'antd';
import Accordion from 'react-native-collapsible/Accordion';
import { StyleSheet, View } from 'react-native';
import Text from '../common/Text';
// import '../../assets/styles/cart-info.less';
// const { Panel } = Collapse;

function MobileCartInfo(props) {

    const [activeSections, setActiveSections] = useState([0]);

    const _renderContent = section => {
        return (

            <View style={styles.content}>
                {section.b}
            </View>
        );
    };
    const _renderHeader = section => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.a}</Text>
            </View>
        );
    };

    const _updateSections = activeSections => {
        setActiveSections(activeSections);
    };
    return (

        <View className="mobile-cart-info">
            <Accordion
                sections={[{ a: "Order Summary", b: <CartInfo {...props} /> }]}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
            />

            {/* <Collapse defaultActiveKey={[0]}>
                <Panel header={"Order Summary"} key={0}></Panel>
            </Collapse> */}

        </View>

    );
}

export default MobileCartInfo;


const styles = StyleSheet.create({
    content:{
        backgroundColor:"rgba(196, 196, 196, 0.15)",
        padding:16,
    },
    headerText:{
        fontSize:20
    },
    header: {
        // position: relative;
        paddingVertical: 12,
        paddingHorizontal: 16,
        paddingLeft: 40,
        color: "#000",
        backgroundColor:"rgba(196, 196, 196, 0.15)",
        borderBottomWidth:2,
        borderColor: "rgba(196, 196, 196, 0.4)"
    }
});