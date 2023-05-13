import React, { useState } from "react";
import css from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
    
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                console.warn('Value is wrong!')
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, number });
        setName('');
        setNumber('');
    };

        return (
            <form
                onSubmit={handleSubmit}
                className={css.Form}>
            <label className={css.Form__label}>Name
                <input
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                    className={css.Form__input}
                    placeholder='Write your name'
                />
            </label>
            <label className={css.Form__label}>Number
                <input
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                        className={css.Form__input}
                        placeholder='Write your phone number'
                />
            </label>
                <button
                    type="submit"
                    className={css.Form__button}
                >Add contact</button>
        </form>
        )
}