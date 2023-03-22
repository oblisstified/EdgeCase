import { ProgressChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

import { getAuth } from 'firebase/auth';
import { getDataArray, getUserProgress } from '../../utils/analytics';

const MyProgressChart = () => {

  let [challengesCompleted, setChallengesCompleted] = useState(0)

  const screenWidth = Dimensions.get("window").width;

  let email = getAuth().currentUser.email;
  const today = (new Date(Date.now())).toDateString();
  
  getUserProgress(email).then((info) => setChallengesCompleted(info))

  let data = {
    labels: ['Goal', 'Food', 'Challenges'],
    data: [0.2, 0.3, challengesCompleted],
  };

  
  
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




