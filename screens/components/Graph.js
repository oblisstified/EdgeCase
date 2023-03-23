import { LineChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { getDataArray, getMacroObject } from '../../utils/analytics'
import { getAuth } from 'firebase/auth'


const BazierLineChart = ({route,field}) => {

  let [dataList, setDataList] = useState([])
  let [macroObject, setMacroObject] = useState(null)

  let email;
  if(getAuth().currentUser)email = getAuth().currentUser.email;



  useEffect(() => {

    async function pullData(){
      let object = await getMacroObject(email);

      setMacroObject(object)
    }
    pullData()
  }, []);

  const today = (new Date(Date.now())).toDateString();
  if(field == undefined){
    field = "Calories";
  }

 function getUnits(field){
  const unitsMap = new Map();

  unitsMap.set("Calories", "kcal");
  unitsMap.set("Protein",  "g");
  unitsMap.set("Sugar", "g");
  unitsMap.set("Carbohydrate", "g");
 
  return unitsMap.get(field);
 }

 
  
  

  // 
  getDataArray(email, today, 7, "Calories").then((info) => setDataList(info))


  let data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
    <View style={{ backgroundColor: 'white' }}>
      <LineChart
        data={data}
        width={350}
        height={220}
        yAxisSuffix={getUnits(field)}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2,
          color: () => '#00a46c',
          labelColor: () => '#999999',
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#00a46c',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default BazierLineChart;