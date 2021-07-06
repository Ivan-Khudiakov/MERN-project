const {Router} = require('express')
const router = Router()
const Contact = require('../models/Contact')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


router.get('/get_contacts/', async (req, res) => {
    try {
        const contacts = await Contact.find()
        await res.status(201).send(contacts)
    } catch (error) {
        console.log(error)
    }
})

router.put('/', async (req, res) => {
    const token = req.headers.token
    const contact = req.body
    const {userId} = jwt.decode(token)
    try {
        await User.findByIdAndUpdate(userId, {$push: {favorites: contact._id}}, {new: true})
        const user = await User.findById(userId).populate('favorites')
        await res.status(201).send(user)
    } catch (error) {
        throw new Error(error)
    }
})

// router.get('/get_favorites/', async(req, res) => {
//     const token = req.headers.token
//     const {userId} = jwt.decode(token)
//     try {
//         const favorites =  await User.findById(userId, .favorites)
//         await res.status(200).send(favorites)
//     } catch (error) {
//         console.log(error)
//     }
// })
module.exports = router


