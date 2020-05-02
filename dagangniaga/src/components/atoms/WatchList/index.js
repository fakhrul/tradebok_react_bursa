import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../utils";

const WatchList = ({ item }) => {
  console.log({ item });
  return (
    <View
      style={{
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        marginVertical: 5,
        height: 280,
      }}
    >
      <View
        style={{
          // borderColor: "#000",
          // borderWidth: 1,
          height: 50,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={item.logo}
          style={{
            width: 40,
            height: 40,
            borderRadius: 18,
            marginRight: 16,
          }}
        ></Image>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.default,
            }}
          >
            {item.stockName}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text.timestamp,
            }}
          >
            {item.mainSector}
          </Text>
        </View>
        <View
          style={
            {
              // borderWidth: 1,
            }
          }
        >
          <Rating
            imageSize={18}
            readonly
            startingValue={item.rating}
            style={{}}
          />
          <Text
            style={{
              fontSize: 12,
              alignSelf: "flex-end",
              marginRight: 5,
              color: colors.text.timestamp,
            }}
          >
            {item.ratingRemarks}
          </Text>
        </View>
      </View>
      <View
        style={{
          // borderWidth: 1,
          // borderColor: "#000",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              // borderWidth: 1,
              width: 150,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: colors.text.bearish,
              }}
            >
              RM {item.priceNow}
            </Text>
            <Text
              style={{
                color: colors.text.bearish,
              }}
            >
              (RM {item.priceChange} / {item.priceChangePercent}%)
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: colors.text.default,
              }}
            >
              Market: {item.marketSummary}
            </Text>
            <Text
              style={{
                marginTop: 5,
                marginLeft: 5,
                color: colors.text.default,
              }}
            >
              MACD: {item.macdRemarks}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                color: colors.text.default,
              }}
            >
              RSI: {item.rsiRemarks}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                color: colors.text.default,
              }}
            >
              OBV: {item.obvRemarks}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                color: colors.text.default,
              }}
            >
              BB: {item.bbRemarks}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                color: colors.text.default,
              }}
            >
              MA: {item.maRemarks}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Image
              source={item.chart}
              style={{
                height: 150,
                width: 220,
              }}
            ></Image>
          </View>
        </View>
      </View>
      <View
        style={{
          // borderWidth: 1,
          borderColor: "#000",
          height: 30,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            // borderWidth:1
          }}
        >
          <Text
            style={{
              marginRight: 5,
              color: colors.text.timestamp,
              fontSize: 12
            }}
          >
            PE: {item.pe}
          </Text>
          <Text
            style={{
              marginRight: 5,
              color: colors.text.timestamp,
              fontSize: 12
            }}
          >
            DY: {item.dy}
          </Text>
          <Text
            style={{
              marginRight: 5,
              color: colors.text.timestamp,
              fontSize: 12
         }}
          >
            ROE: {item.roe}
          </Text>
          <Text
            style={{
              marginRight: 5,
              color: colors.text.timestamp,
              fontSize: 12
        }}
          >
            Margin: {item.profitMargin}
          </Text>
        </View>
        <View
          style={{
            width: 40,
            justifyContent: "flex-end",
            alignSelf: "center",
            alignContent: "flex-end",
          }}
        >
          <TouchableOpacity>
            <MaterialIcons name="navigate-next" size={32}></MaterialIcons>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WatchList;
