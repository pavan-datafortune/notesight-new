import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteStackParamList } from "./routes";
import LoginScreen from "@/screens/login/login-screen";

const Stack = createNativeStackNavigator<RouteStackParamList>();

export default function AuthNavigator() {
  console.log("AuthNavigator:");
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
