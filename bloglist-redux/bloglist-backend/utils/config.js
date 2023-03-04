/* this module contains the application configurations; e.g., the PORT where it is running and
the URI for the MongoDB database. The file .env is included in .gitignore since it contains
secret MongoDB login information */

require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}