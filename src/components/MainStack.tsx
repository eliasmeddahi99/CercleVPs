import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { AuthScreen } from "../screens/AuthScreen";
import { SellerDashboard } from "../screens/SellerDashboard";
import { BuyerDashboard } from "../screens/BuyerDashboard";
import { NewTicket } from "../screens/NewTicket";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Auth"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={{ title: "Authentification" }}
            />
            <StackNavigator.Screen
                name="SellerDashboard"
                component={SellerDashboard}
                options={{ title: "Espace Vendeur" }}
            />
            <StackNavigator.Screen
                name="BuyerDashboard"
                component={BuyerDashboard}
                options={{ title: "Acheter des billets" }}
            />
            <StackNavigator.Screen
                name="NewTicket"
                component={NewTicket}
                options={{ title: "Nouvelle Annonce" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);