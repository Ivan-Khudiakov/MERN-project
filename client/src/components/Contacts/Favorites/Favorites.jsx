import React, {useEffect, useState} from "react"
import axios from "axios"

export const Favorites = () => {

    const [favoritesArray, setFavoritesArray] = useState([])
    const authMe = async () => {
        try {
            const data = await axios.get('/api/auth/me', {
                headers: {
                    token: JSON.parse(localStorage.getItem('userData')).token
                }
            })
                .then(response => response.data)
            setFavoritesArray(data.favorites)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        authMe()
    }, [])

    return (
        <div className="container">
            <h4>Favorites</h4>
            {favoritesArray.map(item => {
                return (
                    <div className="contact" key={item._id}>
                        <div>{item.name}</div>
                    </div>
                )
            })}
        </div>
    )
}