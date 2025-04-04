import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import ScoreScreen from "../screens/ScoreScreen";
import GameScreen from "../screens/GameScreen";
import RegisterScreen from "../screens/RegisterScreen";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
    return <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Drawer" component={MyDrawer} />
    </Stack.Navigator>;
  }
  
  function MyDrawer() {
    return <Drawer.Navigator>
      <Drawer.Screen name="Score" component={ScoreScreen} />
      <Drawer.Screen name="Game" component={GameScreen} />
    </Drawer.Navigator>;
  }
  
  export default function MainNavigator(){
      return (
          <NavigationContainer>
              <MyStack />
          </NavigationContainer>
      );
  };