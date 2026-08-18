import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { initDatabase } from "@/database/database";

import Login from "@/screens/Login";
import Cadastro from "@/screens/Cadastro";
import Home from "@/screens/Home";
import DetalhesBuraco from "@/screens/DetalhesBuraco";
import CadastroBuraco from "@/screens/CadastroBuraco";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  DetalhesBuraco: {
    id: number;
  };
  CadastroBuraco: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function App() {

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="DetalhesBuraco"
          component={DetalhesBuraco}
        />

        <Stack.Screen
          name="CadastroBuraco"
          component={CadastroBuraco}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}