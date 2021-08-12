import { useState, useEffect } from "react";
import ContactAddForm from './components/Phonebook/ContactAddForm';
import ContactList from './components/Phonebook/ContactList';
import Filter from './components/Phonebook/Filter';
import shortid from 'shortid';

const startContacts = [];
const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
};

const App = () => {
    const [contacts, setContacts] = useLocalStorage('contacts', startContacts);
    const [filter, setFilter] = useState('');
    const formSubmitHandler = ({ name, number }) => {
      setContacts(prevState => [...prevState, { id: shortid.generate(), name, number }]);
    };
    const changeFilter = e => {
      setFilter(e.currentTarget.value);
    };
    const visibleContacts = () => {
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter),
      );
    };
    const deleteContact = contactId => {
      setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
    };
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactAddForm contacts={contacts} onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts()}
          onChange={changeFilter}
          onDeleteContact={deleteContact}
        />
      </div>
    );
};
export default App;