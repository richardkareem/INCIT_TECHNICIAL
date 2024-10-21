import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
const {width} = Dimensions.get('window')
  type PieChartData = {
    name: string,
    population: number,
    color: string,
    legendFontColor: 'string',
    legendFontSize: number
  }
  type Props = {
    data: PieChartData[]
  }
const PieChartComponent = ({data}: Props) => {
  return (
    <PieChart
      data={data}
      width={width-64}
      height={200}
      chartConfig={chartConfig}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={"0"}
      center={[0, 0]}
      absolute={false}
      hasLegend
/>
  )
}

const chartConfig : ChartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export default PieChartComponent

const styles = StyleSheet.create({})