import { LineChart } from 'react-native-chart-kit';
import React from 'react';
import { View } from 'react-native';



const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [2500, 2200, 1900, 2000, 1800, 2700, 10000],
      color: () => '#00a46c',
      strokeWidth: 2,
    },
  ],
};

const BazierLineChart = () => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <LineChart
        data={data}
        width={350}
        height={220}
        yAxisSuffix="kcal"
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
      />
    </View>
  );
};

export default BazierLineChart;