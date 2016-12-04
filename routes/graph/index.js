const router = require('express').Router();
const spawn  = require('child_process').spawn;

router.post('/sort', function (req, res) {
	console.log('success');

	const ls = spawn('python', [process.env.GRAPH_SORT])

	ls.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
		res.status(500).end();
	});

	ls.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		res.status(200).end();
	});
});

module.exports = router;