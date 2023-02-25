import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { Container, MainTitle, Title, ErrorText } from './App.styled';


export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  handleSubmitForm = ({name, number}) => {
          const {contacts} = this.state
          const newContact = {
          id: nanoid(),
          name,
          number,
        }; 
        
        contacts.some(contact => contact.name === name)
        ? alert(`${name}, Contact with such name is already exists!`)
        : this.setState(({ contacts }) => ({
            contacts: [newContact, ...contacts],
          }));
    }
    filterInput = e => {
      const { value } = e.currentTarget;
      this.setState({
        filter: value}) 
    }
    deleteContact = id => {
      this.setState((prevState) => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }))
    }
  render() { 
    const normalizedContacts = this.state.filter.toLowerCase();  
    const filteredContacts = this.state.contacts.filter(contact => 
    contact.name.toLowerCase().includes(normalizedContacts));
    
    return (
      <Container>
        <MainTitle>Phonebook</MainTitle>
        <Form submit={this.handleSubmitForm}/>
        <Title> Contacts</Title>
          <Filter value={this.state.filter} onChange={this.filterInput}/>
          {this.state.contacts.length > 0 ? 
          (<ContactsList contacts={filteredContacts} onDelete={this.deleteContact}/>) : 
          <ErrorText>Sorry! No contacts in phonebook!</ErrorText>}   
      </Container> 
    );
  }
};