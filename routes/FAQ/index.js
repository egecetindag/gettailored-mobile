import { StyleSheet, View, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import Text from '../../components/common/Text';
export const SECTIONS= [

  {
      q: "What are your working hours?",
      a: "We work from 10am to 6pm, Monday to Friday."
  },
  {
      q: "What locations do you provide this service for?",
      a: "We currently provide our services for all London boroughs. It will be soon available in other locations in the UK."
  },
  {
      q: "Is there a GetTailored app?",
      a: "Our iOS & Android app will be launched soon as an additional platform to our website. "
  },
  {
      q: "How long does it take to make the alterations?",
      a: "Alterations normally take 1-2 working days. If you need a same day service, contact us directly."
  },
  {
      q: "Can you alter any type of garments?",
      a: "We have tailors who make bespoke garments from scratch, so they are capable of any alterations."
  },
  {
      q: "Can you tailor a long fitting suit to a regular fit?",
      a: "This alteration is possible."
  },
  {
      q: "Are you able to alter leather and suede garments?",
      a: "Yes, we have specialist equipment which can lathe leather and suede garments."
  },
  {
      q: "Do you alter garments of women and children?",
      a: "Yes.  If preferred, our women tailors are available to tailor garments of our women customers. "
  },
  {
      q: "I have lost a lot of weight can you alter my garments to fit me?",
      a: "Yes, within reason, it is possible to tailor for larger adjustments as our skilled tailors are experienced with bespoke fittings."
  },
  {
      q: "What are the costs of alterations?",
      a: "Costs can vary from £5 - £150."
  },
  {
      q: "When and how do we pay?",
      a: "The payment is made upfront online after you have chosen and scheduled your alteration service."
  },
  // {
  //     q: "Is there a discount on orders for multiple garments?",
  //     a: "Yes, we provide a 10% discount on orders with 10 garments and above."
  // },
  {
      q: "Do I have to make a delivery appointment?",
      a: "Yes, you will need to select the pick-up and drop-off dates through the online ordering system."
  },
  {
      q: "As well as alterations, do you have a dry cleaning service?",
      a: "Yes, we can dry clean clothes."
  },
  {
      q: "Will my garments be sanitised in your care given the current circumstances with COVID-19?",
      a: "Once the garments arrive to us, they are automatically sanitised and once again before delivery."
  },
  {
      q: "What happens if I am not happy with my alterations?",
      a: "If this were to happen, please contact us after delivery of your tailored clothes. Based on your feedback, we would aim to quickly rectify the alterations at no further cost to the customer."
  },
  {
      q: "What happens if my garments are not back on time as requested?",
      a: "We will provide you a discount based on the delay."
  },
  {
      q: "What happens if my garments are damaged or ruined in your care?",
      a: "If this situation occurred, we will refund when a receipt is provided."
  },
  {
      q: "Do you provide refunds?",
      a: "If you require a refund, please contact us."
  }

]

export default function FAQ() {
  const [activeSections, setActiveSections] = useState([]);
 
  const _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.a}</Text>
      </View>
    );
  };
  const _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text>{section.a}</Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}><Image style={styles.imgStyle} source={require('./next.png')}/>  {section.q}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Layout type="small">
      <View>
        <Text style={styles.titleStyle}>FAQ</Text>
      </View>
        <View style={styles.paddedContainer}>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
          />
        </View>

      </Layout>
    </View>

  );
}
const styles = StyleSheet.create({
  paddedContainer:{
    margin:10,
    borderWidth:1,
    borderColor:"#d9d9d9",
    borderBottomWidth:0,
  },
  titleStyle: {
    padding: "10%",

    letterSpacing: 6,
    color: "black",
    fontSize: 24,
  },
  imgStyle:{
    width:10,
    height:10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // fontFamily: "WorkSans_400Regular"
   
  },
  title: {
    paddingVertical:50,
    fontSize: 22,
    marginBottom: 20,
   
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth:1,
    borderColor:"#d9d9d9"
  },
  headerText: {
    fontSize: 16,
    fontWeight:"bold"
  },
  content: {
    padding: 20,
    backgroundColor:"#c4c4c426"
  },
  active: {
    backgroundColor: '#c4c4c426',
    borderWidth:1,
    borderColor:"black"
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
    borderWidth:1,
    borderColor:"black"
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});