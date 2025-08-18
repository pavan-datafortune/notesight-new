import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteStackParamList } from "./routes";
import StudyPlannerScreen from "@/screens/study-planner/study-planner-screen";

const Stack = createNativeStackNavigator<RouteStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TestPrep"
        component={StudyPlannerScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="TutorCenterTools"
        component={TutorCenterTools}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlashCards"
        component={FlashCardScreen}
        options={{ headerBackButtonDisplayMode: "minimal" }}
      /> */}
    </Stack.Navigator>
  );
}
