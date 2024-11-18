import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { TextField, Button } from '@nativescript/core';

interface AuthScreenProps {
  navigation: FrameNavigationProp<any>;
  route: RouteProp<any, any>;
}

export function AuthScreen({ navigation }: AuthScreenProps) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = () => {
    // TODO: Implement authentication logic
    navigation.navigate('Home');
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-2xl font-bold mb-4">
        {isLogin ? 'Connexion' : 'Inscription'}
      </label>
      
      {!isLogin && (
        <>
          <TextField
            hint="Prénom"
            className="mb-2 p-2 w-3/4"
            onTextChange={(e) => setFormData({...formData, firstName: e.value})}
          />
          <TextField
            hint="Nom"
            className="mb-2 p-2 w-3/4"
            onTextChange={(e) => setFormData({...formData, lastName: e.value})}
          />
        </>
      )}
      
      <TextField
        hint="Nom d'utilisateur"
        className="mb-2 p-2 w-3/4"
        onTextChange={(e) => setFormData({...formData, username: e.value})}
      />
      <TextField
        hint="Email"
        className="mb-2 p-2 w-3/4"
        onTextChange={(e) => setFormData({...formData, email: e.value})}
      />
      <TextField
        hint="Mot de passe"
        secure={true}
        className="mb-4 p-2 w-3/4"
        onTextChange={(e) => setFormData({...formData, password: e.value})}
      />

      <button className="bg-blue-500 text-white p-2 rounded mb-2" onTap={handleSubmit}>
        {isLogin ? 'Se connecter' : "S'inscrire"}
      </button>
      
      <button className="text-blue-500" onTap={() => setIsLogin(!isLogin)}>
        {isLogin ? "Créer un compte" : "Déjà inscrit ?"}
      </button>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  }
});