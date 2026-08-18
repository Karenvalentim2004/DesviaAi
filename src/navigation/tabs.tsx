import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "@/screens/Home";
import Mapa from "@/screens/Mapa";
import CadastroBuraco from "@/screens/CadastroBuraco";
import Perfil from "@/screens/Perfil";

import { colors } from "@/theme/colors";

const Tab = createBottomTabNavigator();

export function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor: colors.primary,

                tabBarInactiveTintColor: colors.gray[500],

                tabBarStyle: {
                    height: 75,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }}
        >
            <Tab.Screen
                name="Início"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Mapa"
                component={Mapa}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="map-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Cadastrar"
                component={CadastroBuraco}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="add-circle"
                            color={color}
                            size={38}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}