import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import useFetch from "../../hooks/useFetch";
import { COLORS, SIZES, icons } from "../../constants";
import Company from "../../components/jobdetails/company/Company.jsx";
import Tabs from "../../components/jobdetails/tabs/Tabs.jsx";
import Specifics from "../../components/jobdetails/specifics/Specifics.jsx"
import { ScreenHeaderBtn } from "../../components/common/header/ScreenHeaderBtn";
import About from "../../components/jobdetails/about/About.jsx"
import Footer from "../../components/jobdetails/footer/Footer.jsx"

const tabs = ["About", "Qualification", "Responsibilities"]
const JobDetails = () => {
  const [activeTabs, setActiveTabs] = useState(tabs[0]);  
  const param = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: param.id,
  });
  const [refreshing, isRefreshing] = useState(false);
  const onRefresh = () => {};
  const displayTabContent = () => {
    switch (activeTabs) {
      case "Qualification":
       return (
         <Specifics
           title="Qualification"
           points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
         />
       );
      case "About":
        return <About
            info={data[0].job_description ?? "No data provided"}
        />
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went Wrong</Text>
        ) : data.length === 0 ? (
          <Text>No Data</Text>
        ) : (
          <View style={{ padding: SIZES.small, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />
            <Tabs
              tabs={tabs}
              activeTabs={activeTabs}
              setActiveTabs={setActiveTabs}
            />
            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <Footer
        url={
          data[0]?.job_google_link ?? "https://careers.google.com/jobs/results/"
        }
      />
    </SafeAreaView>
  );
};

export default JobDetails;
