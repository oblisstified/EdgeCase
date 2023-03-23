import { PieChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { getDataArray, getMacroObject } from '../../utils/analytics'
import { getAuth } from 'firebase/auth'

const MyMacroChart = () => {
  const screenWidth = Dimensions.get("window").width;
  let [macroObject, setMacroObject] = useState()
  let email = getAuth().currentUser.email;
  const today = (new Date(Date.now())).toDateString();

  

  useEffect(() => {

    async function pullData(){
      let object = await getMacroObject(email);

      setMacroObject(JSON.parse(object))
    }
    pullData()
  }, []);

  const data = [
      {
        name: 'Fat',
        population: (!macroObject) ? 0 : macroObject["Fat"],
        color: '#097969',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Carbohydrates',
        population: (!macroObject ) ? 0 : macroObject["Carbohydrates"],
        color: '#338e59',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Protein',
        population: (!macroObject) ? 0 : macroObject["Protein"],
        color: '#6d9f39',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Fibre',
        population: (!macroObject) ? 0 : macroObject["Fibre"],
        color: '#b1a80a',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Sugar',
        population: (!macroObject) ? 0 : macroObject["Sugar"],
        color: '#ffa600',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];

   
   
    return (
          
    <View style={StyleSheet.MainContainer}>
      <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={{
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: (opacity = 1) => `rgba(0, 164, 108, ${opacity})`,
          style: {
            borderRadius: 15,
          },
        }}
        hideLegend={false}
        style={{
          marginVertical: 8,
        }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
</View>

  );
};


  export default MyMacroChart;
