import React, { Component } from 'react';

import style from './App.module.css';
import './app.css';

import Notification from './components/Notiffication/Notification';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    notification: false,
  };

  getName = data => {
    this.setState({ name: data });
  };

  getContact = contact => {
    let flag = true;

    this.state.contacts.map(el =>
      el.name === contact.name ? (flag = false) : '',
    );

    flag
      ? this.setState(prev => {
          return { ...prev, contacts: [...prev.contacts, contact] };
        })
      : this.visibleDiv();
  };

  visibleDiv() {
    this.setState({ notification: true });
  }

  getFilterName = event => {
    this.setState({ filter: event.target.value });
  };

  filteredItems = () => {
    return this.state.filter
      ? this.state.contacts.filter(el =>
          el.name.toLowerCase().includes(this.state.filter.toLowerCase()),
        )
      : this.state.contacts;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    } else {
      return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevState', prevState);

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

    console.log('this.state', this.state);
  }

  render() {
    return (
      <div>
        <CSSTransition
          in={true}
          timeout={500}
          classNames="mainTitle"
          appear
          unmountOnExit
        >
          <h1 className={style.title}>Phonebook</h1>
        </CSSTransition>

        <div className={style.form}>
          <CSSTransition
            in={this.state.notification}
            unmountOnExit
            timeout={2000}
            classNames="error"
            onEntered={() => this.setState({ notification: false })}
          >
            <Notification />
          </CSSTransition>

          <ContactForm getContact={this.getContact} getName={this.getName} />
        </div>

        <CSSTransition
          in={this.state.contacts.length >= 1}
          timeout={300}
          unmountOnExit
          classNames="contactsTitle"
        >
          <h1 className={style.title}>Contacts</h1>
        </CSSTransition>

        <CSSTransition
          in={this.state.contacts.length >= 2}
          timeout={300}
          classNames="contactsTitle"
          unmountOnExit
        >
          <h3 className={style.subTitle}>Find contacts by name</h3>
        </CSSTransition>

        <CSSTransition
          in={this.state.contacts.length >= 2}
          timeout={300}
          classNames="contactsTitle"
          unmountOnExit
        >
          <Filter
            filter={this.state.filter}
            getFilterName={this.getFilterName}
          />
        </CSSTransition>

        <ContactList
          contactList={this.filteredItems()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
