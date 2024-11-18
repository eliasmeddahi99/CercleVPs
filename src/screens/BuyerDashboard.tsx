import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ListView, TextField } from '@nativescript/core';
import type { Ticket } from '../types';

interface BuyerDashboardProps {
  navigation: FrameNavigationProp<any>;
}

export function BuyerDashboard({ navigation }: BuyerDashboardProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [tickets, setTickets] = React.useState<Ticket[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic with regex
  };

  const handlePurchase = (ticket: Ticket) => {
    navigation.navigate('Payment', { ticketId: ticket.id });
  };

  return (
    <flexboxLayout style={styles.container}>
      <TextField
        hint="Rechercher des billets..."
        className="mb-4 p-2"
        onTextChange={(e) => handleSearch(e.value)}
      />

      <ListView
        items={tickets}
        className="w-full"
        itemTemplate={(item: Ticket) => (
          <gridLayout columns="*, auto" className="p-2 border-b">
            <stackLayout col="0">
              <label className="font-bold">{item.title}</label>
              <label className="text-sm">{item.description}</label>
              <label className="text-sm">{item.price}€</label>
            </stackLayout>
            <button
              col="1"
              className="bg-blue-500 text-white p-2 rounded"
              onTap={() => handlePurchase(item)}
            >
              Acheter
            </button>
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