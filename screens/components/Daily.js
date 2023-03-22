import { ProgressChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDataArray, getUserProgress, getMacroObject, getTodaysCalories, getCalorieGoal  } from '../../utils/analytics';

const MyProgressChart = () => {

  let [challengesCompleted, setChallengesCompleted] = useState(0)
  let [caloriesEaten, setCaloriesEaten] = useState(0)
  let [goalProgression, setGoalProgression] = useState(0)

  const screenWidth = Dimensions.get("window").width;

  let email = getAuth().currentUser.email;
  const today = (new Date(Date.now())).toDateString();
  
  getUserProgress(email).then((info) => setChallengesCompleted(info))
  getTodaysCalories(email).then((info) => setCaloriesEaten(info))
  getCalorieGoal(email).then((info) => setGoalProgression(info))

  let data = {
    labels: ['Challenges', 'Food', 'Goal'],
    data: [challengesCompleted, caloriesEaten, goalProgression ],
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




