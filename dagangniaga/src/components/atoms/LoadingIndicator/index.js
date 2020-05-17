import React from 'react';
import { DotIndicator } from 'react-native-indicators';

const LoadingIndicator = ({ size, color, count }) =>
  <DotIndicator size={size} color={color} count={count || 3} />;

export default LoadingIndicator;