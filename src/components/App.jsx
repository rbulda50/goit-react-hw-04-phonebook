import React, {useState, useEffect} from "react";
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Notiflix from "notiflix";
import css from './App.module.css';

const LS_KEY = 'contacts';

export function App() {

  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LS_KEY))
    ?? [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts))
  }, [contacts]);

  const addContact = (data) => {  
    const { name, number } = data;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const checkContact = contacts.find(contact =>
      contact.name === name);
    
    if (checkContact) {
      return Notiflix.Notify.failure(`${name} is already in contacts.`)
    };

    setContacts([...contacts, newContact]);
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value)
  };

  const getContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDeleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId))
  };

      return (
      <div className={css.Container}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter
          filter={filter}
          changeFilter={changeFilter} />
        {contacts.length > 0 && <ContactList
          visibleContacts={getContacts()}
          deleteContact={onDeleteContact} />}
      </div>
    );
};