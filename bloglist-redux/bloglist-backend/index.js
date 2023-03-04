/* Now, index.js simply call the actual app (app.js) to run
on the PORT defined in config.js,
and gives a message of 'Server running' in the console.  */

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})