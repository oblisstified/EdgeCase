import { PieChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { getDataArray, getMacroObject } from '../../utils/analytics'
import { getAuth } from 'firebase/auth'

const MyMacroChart = () => {
  
  const screenWidth = Dimensions.get("window").width;

  let email = getAuth().currentUser.email;
  const today = (new Date(Date.now())).toDateString();

  const Data = [
      {
        name: 'Fat',
        population: 21500000,
        color: '#097969',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Carbohydrates',
        population: 2800000,
        color: '#338e59',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Protein',
        population: 527612,
        color: '#6d9f39',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Fibre',
        population: 8538000,
        color: '#b1a80a',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Sugar',
        population: 11920000,
        color: '#ffa600',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];

   
   
    return (
          
    <View style={StyleSheet.MainContainer}>
  <PieChart
      data={Data}
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
