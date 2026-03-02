const express = require('express');
const client = require('../index');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// simple homepage
app.get('/', (req, res) => {
    res.send('<h1>Dashboard placeholder</h1><p>Bot is running.</p>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Dashboard listening on ${PORT}`));

module.exports = app;