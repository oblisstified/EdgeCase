import { ProgressChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import { getAuth } from 'firebase/auth';
import { getDataArray } from '../../utils/analytics';

const MyProgressChart = () => {

  let [dataList, setDataList] = useState([])

  const screenWidth = Dimensions.get("window").width;

  const email = getAuth().currentUser.email;
  const today = (new Date(Date.now())).toDateString();
  
  getDataArray(email, today, "Calories").then((info) => setDataList(info))

  let data = {
    labels: ['Goal', 'Food', 'Challenges'],
    datasets: [
      {
        data: dataList,
        color: () => '#00a46c',
        strokeWidth: 2,
      },
    ],
  };

//   if(dataList.length == 0){
//     return(
//       <Text>Loading Data....</Text>
//     )
//   }
  
  return (
          
    <View style={StyleSheet.MainContainer}>
  <ProgressChart
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
    hasLegend
    chartRadius={100}
    strokeWidth={15.5}
    hideLabels={false}
    />
</View>

  );
};



export default MyProgressChart;




