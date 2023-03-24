import { LineChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions} from 'react-native';

import { getDataArray, getMacroObject } from '../../utils/analytics'
import { getAuth } from 'firebase/auth'


const BazierLineChart = ({route,field}) => {

  const screenWidth = Dimensions.get("window").width;


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

  let today = (new Date(Date.now())).toDateString();
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


// Create an array to store the dates
let dateLabels = [today];

// Loop through the past 6 days and add their dates to the array
for (let i = 1; i <= 6; i++) {
  let date = new Date();
  date.setDate(date.getDate() - i);
  dateLabels.push(date.toLocaleDateString());
}
// Reverse the order of the date labels so that the most recent date is at the top
dateLabels.reverse();


  // 
  getDataArray(email, today, 7, "Calories").then((info) => setDataList(info))



// Use the dateLabels array as the labels in your chart data
let data = {
  labels: dateLabels,
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
    <View style={{ backgroundColor: 'white', marginLeft: 20 }}>
      <LineChart
        data={data}
        width={screenWidth - 25}
        height={350}
        yAxisSuffix={getUnits(field)}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0,
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
        verticalLabelRotation={45}
      />
    </View>
  );
};

export default BazierLineChart;