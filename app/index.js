import { Stack, useRouter } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import {COLORS, SIZES, icons, images} from "../constants"
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from "../components"
import { useState } from 'react';

const home=()=> {
  const router  = useRouter();
  const [SearchTerm, setSearchTerm] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
         
          
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              handlePress={undefined}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              dimension="100%"
              handlePress={undefined}
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
          setSearchTerm={setSearchTerm}
          SearchTerm={SearchTerm}
          handleClick={()=>{
            if(SearchTerm){
              router.push(`/search/${SearchTerm}`)
            }
          }}
           />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
 export default home;

