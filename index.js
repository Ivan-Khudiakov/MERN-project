const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 5000

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/contacts', require('./routes/contacts.route'))

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.luzix.azure.mongodb.net/database?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
            })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {console.error(err)}
}

const db = mongoose.connection
start()