const app = require('./index');

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});