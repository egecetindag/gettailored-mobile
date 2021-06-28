import { StyleSheet, View } from 'react-native';
import React from 'react';
import Layout from '../../components/common/Layout';
import Text from '../../components/common/Text';

export default function About() {
  return (
    <View style={styles.container}>
     
      <Layout type="small">
      <View>
        <Text style={styles.titleStyle}>About</Text>
      </View>
        <View style={styles.viewStyle}>
          <Text> Esclot London, established over 30 years as London’s leading alterations company,
          have launched a new online platform ‘GetTailored’ in 2021. The vision is to make
          tailoring convenient and accessible for customers with the mission to provide alteration
          services to their location without the need to go to a tailor in person. The COVID-19 pandemic
          has made it even more apparent that convenient ways of providing tailoring services to keep our
          customers safe are needed. Our tailors are bespoke
          suit makers by trade who provide high-quality craftmanship for the perfect fit
          based on years of experience.
{"\n\n"}
          Although Esclot London is essentially a menswear business, we also make garment alterations
          for women and children. Our two bespoke services are premium and self-measure.
          Our premium service provides a personal fitting session at your location by one of our
          highly skilled tailors who measures and takes away your garments for alterations to be
          delivered back to you in 1-2 working days. Our self-measure service offers a cost-effective way of getting your garments altered by measuring the adjustments yourself. Our team will then collect and deliver your garments based on how you schedule it. Whilst altering and delivering our services, we follow government guidance for PPE.
             </Text>

        </View>

      </Layout>
    </View>

  );
}

const styles = StyleSheet.create({
  viewStyle: {
    padding: "10%",

  },
  titleStyle: {
    padding: "10%",
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