const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').isLength({min: 6})
    ],
    async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration'
            })
        }
        const {email, password} = req.body

        const isUsed = await User.findOne({email})

        if (isUsed) {
           return res.status(300).json({message: 'this email is used'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email, password: hashedPassword
        })

        await user.save()

        res.status(201).json({message: 'the user has been created'})

    } catch (error) {
        console.log(error)
    }
})

router.post('/login',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async(req, res) => {
        try {

            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login data'
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({email}).populate('favorites')

            if(!user) {
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({message: 'Invalid password'})
            }

            const jwtSecret = 'ugrfougdsoajvfppkdsajsadhoasodifb'

            const token = jwt.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id, user})
        } catch (error) {
            console.log(error)
        }
    })

router.get('/me',  async(req, res) => {
    const token = req.headers.token
    const {userId} = jwt.decode(token)
    try {
        const user = await User.findById(userId).populate('favorites')
        await res.status(201).send(user)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = router