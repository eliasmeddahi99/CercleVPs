import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { TextField } from '@nativescript/core';

interface NewTicketProps {
  navigation: FrameNavigationProp<any>;
}

export function NewTicket({ navigation }: NewTicketProps) {
  const [ticketData, setTicketData] = React.useState({
    title: '',
    description: '',
    price: ''
  });

  const handleSubmit = () => {
    // TODO: Implement ticket creation logic
    navigation.goBack();
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-xl font-bold mb-4">Nouvelle Annonce</label>

      <TextField
        hint="Titre de l'annonce"
        className="mb-2 p-2 w-full"
        onTextChange={(e) => setTicketData({...ticketData, title: e.value})}
      />

      <TextField
        hint="Description"
        className="mb-2 p-2 w-full"
        onTextChange={(e) => setTicketData({...ticketData, description: e.value})}
      />

      <TextField
        hint="Prix (€)"
        keyboardType="number"
        className="mb-4 p-2 w-full"
        onTextChange={(e) => setTicketData({...ticketData, price: e.value})}
      />

      <button 
        className="bg-blue-500 text-white p-2 rounded"
        onTap={handleSubmit}
      >
        Publier l'annonce
      </button>
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