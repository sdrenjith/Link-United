require('./config/db');
const app = require('./app');

PORT = 5000;

app.listen(PORT , () => {
    console.log(`express started at ${PORT}`);
})

