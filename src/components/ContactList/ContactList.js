import React from 'react';
import styles from './contactList.module.css';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../../app.css';

function ContactList({ contactList, deleteContact }) {
  return (
    <TransitionGroup component="ul" className={styles.list}>
      {contactList.map(el => (
        <CSSTransition
          key={el.id}
          timeout={2000}
          classNames="contactList"
          unmountOnExit
        >
          <li key={el.id} className={styles.item}>
            <span>{el.name}</span>
            <span>: {el.number}</span>
            <button
              onClick={() => deleteContact(el.id)}
              className={styles.button}
            >
              Delete
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
ContactList.propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.object),
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func,
};

export default ContactList;
