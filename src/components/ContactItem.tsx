import React from 'react';
import { useDispatch } from 'react-redux';
import { removeContact } from '../features/contactsSlice';
import styled from 'styled-components';

const Item = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px 0;
    align-items: center;
    gap: 16px;
`;

const Button = styled.button`
    background-color: #d95b05;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 8px;
  
    &:hover {
    background-color: #b14800;
`;

interface ContactItemProps {
    id: string;
    name: string;
    email: string;
    phone: string;
    onEdit: (contact: { id: string; name: string; email: string; phone: string }) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ id, name, email, phone, onEdit }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        onEdit({ id, name, email, phone });
    };

    return (
        <Item>
            <div>
                {name} - {email} - {phone}
            </div>
            <div>
                <Button onClick={handleEdit}>Editar</Button>
                <Button onClick={() => dispatch(removeContact(id))}>Remover</Button>
            </div>
        </Item>
    );
};

export default ContactItem;
