import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '@/constants';

const TabButton = ({ name, activeTab, onHandleSerachType }) => (
  <TouchableOpacity
  style={styles.btn(name,activeTab)}
  onPress={onHandleSerachType}>
    <Text style={styles.btnText(name,activeTab)}>{name}</Text>
  </TouchableOpacity>
);

const Tabs = ({ tabs, setActiveTabs, activeTabs }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTabs}
            onHandleSerachType={() => setActiveTabs(item)}
          />
        )}
        horizontal
        keyExtractor={(item) => item}
        contentContainerStyle = {{columnGap : SIZES.small / 2}}
      />
    </View>
  );
};

export default Tabs