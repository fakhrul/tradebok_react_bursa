import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils'

const ActionButtonCustom = ({title, ...rest}) => {
    return (
      <View>
     <TouchableOpacity
          style={{
            backgroundColor: colors.default,
            paddingVertical: 14,
            borderRadius: 25,
            width: 225
          }}
          {...rest}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  

  export default ActionButtonCustom;