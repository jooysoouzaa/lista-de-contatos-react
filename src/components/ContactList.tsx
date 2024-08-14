import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ContactItem from './ContactItem';

interface ContactListProps {
    onEdit: (contact: { id: string; name: string; email: string; phone: string }) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onEdit }) => {
    const contacts = useSelector((state: RootState) => state.contacts.contacts);

    return (
        <div>
            {contacts.map(contact => (
                <ContactItem key={contact.id} {...contact} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default ContactList;
