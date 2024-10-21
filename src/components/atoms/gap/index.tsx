import React from 'react';
import {DimensionValue, View} from 'react-native';

type Props = {
    width?: DimensionValue,
    height?: DimensionValue
}
const Gap = ({width, height} : Props) => {
  return <View style={{width: width, height: height}} />;
};

export default Gap;