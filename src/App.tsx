import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import styled, { createGlobalStyle } from 'styled-components';

// Estilo global aplicado ao body
const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #010101; /* Cor de fundo do body */
    color: white; /* Cor do texto padrão */
  }
`;

const Container = styled.div`
text-align: center;
  padding: 16px;
`;

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const App: React.FC = () => {
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);

  const handleEdit = (contact: Contact) => {
    setContactToEdit(contact);
  };

  const clearEdit = () => {
    setContactToEdit(null);
  };

  return (
    <Provider store={store}>
      <GlobalStyle /> {/* Aplicando o estilo global */}
      <Container>
        <h1>Lista de Contatos</h1>
        <ContactForm contactToEdit={contactToEdit} onClearEdit={clearEdit} />
        <ContactList onEdit={handleEdit} />
      </Container>
    </Provider>
  );
};

export default App;
