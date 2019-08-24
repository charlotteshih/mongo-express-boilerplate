const app = require('./app');
const { PORT, PROD_URL } = require('./config');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let server;

function runServer(databaseUrl = PROD_URL, port = PORT) {
  return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, { useNewUrlParser: true}, err => {
			if(err) {
				return reject(err);
			}

			server = app.listen(PORT, () => {
				console.log(`Server listening at http://localhost:${PORT}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer() {
	mongoose.disconnect();

	return new Promise((resolve, reject) => {
		console.log('Server is shutting down...');

		server.close(err => {
			if(err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}

if(require.main === module) {
	runServer(PROD_URL).catch(err => console.error(err));
}

module.exports = { runServer, closeServer };