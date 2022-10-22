// Dependencies
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
const port = 3042;

// App-routes
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/', require(path.resolve('routes/router.js')));

// Debug
app.listen(port, () => {
	console.log(chalk.bold.green`\n[Debug] Hack4Energy listening at http://localhost:${port}`);
});
