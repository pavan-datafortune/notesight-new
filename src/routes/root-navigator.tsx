import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth0 } from "react-native-auth0";
import AppNavigator from "./app-navigator";
import AuthNavigator from "./auth-navigator";
import { SafeAreaView } from "react-native-safe-area-context";

// import { useAuthStore } from "../stores/auth";

export default function RootNavigator() {
  console.log("RootNavigator:");
  const { user, isLoading } = useAuth0();
  //   const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  //   if (isLoading) {
  //     return (
  //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //         <ActivityIndicator size="large" />
  //       </View>
  //     );
  //   }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* {isLoggedIn ? <AppNavigator /> : <AuthNavigator />} */}
        {/* {user ? <AppNavigator /> : <AuthNavigator />} */}
        <AuthNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
