const chalk = require('chalk');
const path = require('path');
const {spawn} = require('child_process');

const home = async (req, res) => {
	console.log(chalk.bold.green`[Debug] A new user has arrived...`);
	res.sendFile(path.resolve('public/html/login.html'));
}

const checkUser = async (req, res) => {

	console.log(chalk.bold.green`[Debug] Checking user...`);
	console.log(chalk.bold.yellow`[Debug] User: ${req.body.login}`);
	console.log(chalk.bold.yellow`[Debug] Password: ${req.body.password}`);

	if (req.body.login == "admin" && req.body.password == "admin") {
		console.log(chalk.bold.green`[Debug] Admin has logged in...`);
		res.status(200).json({status: 200});
	} else {
		console.log(chalk.bold.red`[Debug] Wrong credentials...`);
		res.status(200).json({status: 400});
	}

}

const newAccount = async (req, res) => {
	console.log(chalk.bold.green`[Debug] New user...`);
	res.sendFile(path.resolve('public/html/register.html'));
}

const dashboard = async (req, res) => {
	res.sendFile(path.resolve('public/html/dashboard.html'));                                          
	console.log(chalk.bold.red`[Debug] Dashboard loaded`);
}

const evaluate = async (req, res) => {
	data = req.body;
	console.log(chalk.bold.green`[Debug] Evaluating...`);
	console.log(chalk.bold.yellow`[Debug] Users: ${data.usersMultiply}`);
	console.log(chalk.bold.yellow`[Debug] Company: ${data.actualCompany}`);
	console.log(chalk.bold.yellow`[Debug] Washing Machine: ${data.washingMachine}`);
	console.log(chalk.bold.yellow`[Debug] Fridge: ${data.fridge}`);
	console.log(chalk.bold.yellow`[Debug] TV: ${data.tv}`);
	console.log(chalk.bold.yellow`[Debug] Air: ${data.air}`);
	console.log(chalk.bold.yellow`[Debug] Heater: ${data.heater}`);
	console.log(chalk.bold.yellow`[Debug] Thermo: ${data.thermo}`);

	users = parseFloat(data.usersMultiply);

	let wp = spawn('python3', ['python/formulario_luz.py', users, data.washingMachine, data.fridge, data.tv, data.air, data.heater, data.thermo, data.actualCompany]);

	wp.stdout.on('data', async (data) => {
		console.log(chalk.bold.green`[Debug] Python script has finished...`);
		console.log(chalk.bold.yellow`[Debug] Data: ${data}`);
		chr = [];
		data.forEach((element) => {
			chr.push(String.fromCharCode(element));
		});
		total = chr.join('');
		total = total.replace(/[(),]/g, '');
		total = total.split(' ');
		kwh = parseFloat(total[0]).toFixed(2);
		value = parseFloat(total[1]).toFixed(2);
		total = [kwh, value];
		res.status(200).json(total);
	});
	wp.stderr.on('data', (data) => {
		console.log(chalk.bold.red`[Debug] Python script has failed...`);
		console.log(chalk.bold.yellow`[Debug] Data: ${data}`);
		res.status(200).json({status: 400, data: data});
	});
}

module.exports = { home, checkUser, newAccount, dashboard, evaluate };
