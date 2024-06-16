const mongoose = require("mongoose");

async function connectToDb(uri) {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,


    };
    return (
        mongoose.connect(uri, options)
            .then((d) => {
                console.log('Connected to MongoDB Atlas');

              

            })
            .catch((error) => {
                console.error('Error connecting to MongoDB Atlas:', error);
            })
    )
}
module.exports = { connectToDb };