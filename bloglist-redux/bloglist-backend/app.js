/* This is the app itself. It will establish the connection to MongoDB
the route handlers and middlewares. 

We export it to import in index.js, which is the first executed code when
'npm start' is called.

Once index.js calls app.js to run on the informed PORT, the connection to
MongoDB is immediately established with mongoose. 

After that, cors(), express.static('build') and express.json() are called
into use BEFORE the routes handlers. Finally, we call the route handler
which handles the routes starting with '/api/blogs'. 

Any requisition to the server in this route will be handled by blogsRouter
module, which is exported in blogs.js.

Be careful by the order of the middleware calling. The middleware 
requestLogger is called right before the router, since we want to
have this information before the request is actually 
handled (by blogsRouter). On the other hand, unknownEndpoint and 
errorHandler are called after handling the route. There are some 
observations here:

(1) If there is an error, the route handler calls the errorHandler function,
since it has an "error" parameter. unknownEndpoint is "skipped";

(2) If there is no error, the execution finishes before unknownEndpoint 
is called. 

(3) Thus, when is unknownEndpoint called? It is called when the
requisiton is made to an addres which does NOT start with '/api/blogs'. 
In this case, the route handler 'app.use('/api/blogs', blogsRouter)'
will not be called, and then unknownEndpoint is called. Observe that, 
in this case, the route handler does not throw an error, since it is 
not even called. */

const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)


const connectToDb = async () => {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB')
}

connectToDb()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
/*app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)*/

if(process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app