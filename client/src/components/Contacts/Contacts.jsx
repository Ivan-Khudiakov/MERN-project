import React, {useEffect, useState} from "react"
import './Contacts.css'
import axios from "axios"

export const Contacts = () => {
    const [contactsArray, setContactsArray] = useState([])

    const getContacts = async () => {
        try {
            const data = await axios.get('/contacts/get_contacts/')
                .then(response => {return response.data})
            setContactsArray(data)
        } catch (error) {
            console.log(error)
        }
    }

    const addToFavorites = async (contact) => {
        try {
            await axios.put('/contacts/', contact,{
                headers: {
                    'Content-Type': 'application/json',
                    'token': JSON.parse(localStorage.getItem('userData')).token
                }
            })
                .then(response => console.log('contact added to favorites'))
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getContacts()
    },[])

    return (
        <div className="container">
            <h4>Contacts</h4>
            {contactsArray.map (item => {
                return (
                    <div className="contact" key={item._id}>
                        <div>{item.name}</div>
                        <button className="wawes-effect wawes-light btn blue"
                                onClick={() => addToFavorites(item)}>Add to favorites</button>
                    </div>
                )
            })}

        </div>
    )
}