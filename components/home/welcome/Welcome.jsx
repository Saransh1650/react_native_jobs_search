import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import styles from "./welcome.style.js";

import { COLORS, FONT, SIZES, icons } from "../../../constants";
import { useRouter } from "expo-router";
const jobtypes = ["Full-Time", "Part-Time", "Contractor"];
const Welcome = ({SearchTerm, setSearchTerm, handleClick}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-Time");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Saransh</Text>
        <Text style={styles.welcomeMessage}>Find Your perfect job</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={SearchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              placeholder="What are you looking for"
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <FlatList
          horizontal
          contentContainerStyle={{columnGap:SIZES.small}}
          keyExtractor={item => item}
            data={jobtypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={()=>{setActiveJobType(item);
                router.push(`/search/${item}`)
                }
              
                }
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
