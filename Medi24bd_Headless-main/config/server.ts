const application = require('../index')

const PORT = process.env.PORT

application.listen(PORT,()=>{
    console.log(`Server is Running on port ${PORT}`)
});