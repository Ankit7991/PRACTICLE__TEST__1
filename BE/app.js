const logger = require('morgan');
require('dotenv').config();
const Express = require('express');
const bodyParser = require('body-parser');
const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const cors = require('cors');
const router = require('./routes');


const app = Express();
app.use(logger(`\x1b[37m\x1b[7m :date \x1b[0m \x1b[33m\x1b[1m:status\x1b[0m \x1b[2m:url\x1b[0m \x1b[1m\x1b[33m:method\x1b[0m :res[content-length] - :response-time ms`));

// set body parser...
app.use(bodyParser.urlencoded({
	limit: "50mb",
	extended: false
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.options('*', cors());

app.use((req, res, next) => {
	req.locals = {};
	
	next();
});

app.use('/api', router);

app.use((req, res, next) => {
	if (req.locals.res) {
		return res.status(httpStatus.OK).json({
			message: req.locals.msg || 'Success.',
			data: req.locals.res
		});
	} else {
		return next('Api not found');
	}
});

app.use((err, req, res, next) => {
	console.log(`----`, err, err?.details);
	res.status(err.status || httpStatus.BAD_REQUEST).json({
		error: {
			message: err?.details?.body?.[0]?.message || err.message
		}
	});
});



app.listen(process.env.port, err => err ? console.log(err) : console.log('express connected at port ', process.env.port));