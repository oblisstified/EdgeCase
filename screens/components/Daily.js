import { ProgressChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import { getAuth } from 'firebase/auth';
import { getDataArray } from '../../utils/analytics';

const ProgressChart = () => {

  let [dataList, setDataList] = useState([])

  const screenWidth = Dimensions.get("window").width;
  const email = getAuth().currentUser.email;
  const today = (new Date(Date.now())).toDateString();
  
  getDataArray(email, today, 7, "Protien").then((info) => setDataList(info))

 const data = {
   labels: ["Calorie Goal", "Food", "Goals Completed"], // optional
   datasets: [
      {
        data: dataList,
        color: () => '#00a46c',
        strokeWidth: 2,
      },
    ],
 }; 

  if(dataList.length == 0){
    return(
      <Text>Loading Data....</Text>
    )
  }
  
  return (
          
    <View style={StyleSheet.MainContainer}>
     
      <ProgressChart
        data={data}
        width={ screenWidth - 15 }
        height={220}
        chartConfig={{
          //backgroundColor: '#478438',
          backgroundGradientFrom: '#FFF8E1',
          backgroundGradientTo: '#FFF8E1',
          //decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        }}
        style= {{
          borderRadius: 15,
        }}
      />

      <Text style={{ fontSize: 28, textAlign: 'center' }}> Progress Chart in React Native </Text> 
      
    </View>
  );
};



export default ProgressChart;




