const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// in MVC ACT 28 Main, sessions is added to server.js but other examples in MVC dont use sessions, fyi

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// i didnt use below code in Planeta to get it running, fyi
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
