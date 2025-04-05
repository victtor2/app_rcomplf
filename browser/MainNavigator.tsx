import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import ScoreScreen from "../screens/ScoreScreen";
import GameScreen from "../screens/GameScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RecordScreen from "../screens/RecordScreen";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
    return <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Drawer" component={MyDrawer} />
    </Stack.Navigator>;
  }
  
  function MyDrawer() {
    return <Drawer.Navigator initialRouteName="Score">
      <Drawer.Screen name="Score" component={ScoreScreen} />
      <Drawer.Screen name="Record" component={RecordScreen} />
      <Drawer.Screen name="Game" component={GameScreen} />
      <Drawer.Screen name="Stack" component={MyStack} />
    </Drawer.Navigator>;
  }
  
  export default function MainNavigator(){
      return (
          <NavigationContainer>
              <MyStack />
          </NavigationContainer>
      );
  };