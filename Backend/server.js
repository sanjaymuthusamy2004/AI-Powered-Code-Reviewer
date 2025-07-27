require('dotenv').config()
const app = require('./src/app')


// To start the server
app.listen(3000, () => {
    console.log('Server is running on port number 3000')
})