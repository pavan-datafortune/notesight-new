import { auth0Config } from "@/auth/auth0";
import RootNavigator from "@/routes/root-navigator";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Auth0Provider, useAuth0 } from "react-native-auth0";

export default function App() {
  const { domain, clientId } = auth0Config;
  console.log("Auth0 Domain:", domain);
  return (
    <Auth0Provider domain={domain} clientId={clientId}>
      <RootNavigator />
      {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app! ${domain}</Text>
        <StatusBar style="auto" />
      </View> */}
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
