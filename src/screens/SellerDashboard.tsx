import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ListView, TextField, Button } from '@nativescript/core';
import type { Ticket } from '../types';

interface SellerDashboardProps {
  navigation: FrameNavigationProp<any>;
}

export function SellerDashboard({ navigation }: SellerDashboardProps) {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  
  return (
    <flexboxLayout style={styles.container}>
      <label className="text-xl font-bold mb-4">Mes Annonces</label>
      
      <label className="text-sm text-gray-600 mb-4 text-center">
        Les acheteurs n'ont pas accès à votre vraie identité ni votre vrai pseudo
      </label>

      <button 
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onTap={() => navigation.navigate('NewTicket')}
      >
        Créer une nouvelle annonce
      </button>

      <ListView
        items={tickets}
        className="w-full"
        itemTemplate={(item: Ticket) => (
          <gridLayout columns="*, auto" className="p-2 border-b">
            <stackLayout col="0">
              <label className="font-bold">{item.title}</label>
              <label className="text-sm">{item.price}€</label>
              <label className="text-xs text-gray-500">ID Vendeur: {item.anonymousSellerId}</label>
            </stackLayout>
            <label 
              col="1" 
              className={item.status === 'sold' ? 'text-green-500' : 'text-blue-500'}
            >
              {item.status === 'sold' ? 'Vendu' : 'Disponible'}
            </label>
          </gridLayout>
        )}
      />
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    padding: 20,
  }
});