import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../features/contactsSlice';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 360px; /* Largura total do formulário */
  margin: 0 auto;
`;

const Input = styled.input`
    margin: 6px 0;
    border-radius: 4px;
    border: 1px solid rgb(217 91 5 / 34%);
    background: transparent;
    padding: 8px;
    color: #fff;

    &:focus {
    border-color: #d95b05; /* Cor da borda quando o input está focado */
    box-shadow: 0 0 5px #d95b05; /* Sombra ao redor do input com a cor desejada */
    outline: none; /* Remove o outline padrão */
  }
`;

const Button = styled.button`
  margin-top: 10px;
    background-color: #d95b05;
    color: white;
    border: none;
    padding: 16px;
    cursor: pointer;
    border-radius: 4px;
  
  &:hover {
    background-color: #b14800;
  }
`;

interface ContactFormProps {
  contactToEdit?: { id: string; name: string; email: string; phone: string } | null; // Permitir que seja null
  onClearEdit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contactToEdit, onClearEdit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setEmail(contactToEdit.email);
      setPhone(contactToEdit.phone);
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [contactToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactToEdit) {
      dispatch(editContact({ id: contactToEdit.id, name, email, phone }));
      onClearEdit();
    } else {
      const id = new Date().toISOString();
      dispatch(addContact({ id, name, email, phone }));
    }
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input placeholder="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <Button type="submit">{contactToEdit ? 'Atualizar Contato' : 'Adicionar Contato'}</Button>
    </Form>
  );
};

export default ContactForm;
