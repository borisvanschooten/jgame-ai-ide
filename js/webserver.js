class WebServer {
	basedir;
	port;
	server;
	constructor(basedir, port) {
		this.basedir = basedir
		this.port = port;
		this.server = this.createWebService()
	}
	/** @cogs_func createWebService
	 * Create a Javascript method createWebService() that starts a web service in the background that serves static files. Base dir is found in this.basedir; port in this.port. Node.js functions are available. Directory indexes are now allowed.  MIME type mapping is done via file extension, supporting: html, js, json, css, png, jpg, gif. All other file extensions map to text/plain.
	 * Always use indents of 4 spaces, and indent every line with at least 4 spaces.
	 */
//@cogs_build 0.6.0 openai-gpt-5.4 2026-05-13T18:42:35.174Z
	createWebService() {
		const http = require('http');
		const fs = require('fs');
		const path = require('path');

		const baseDir = path.resolve(this.basedir);
		const port = this.port;

		const mimeTypes = {
			'.html': 'text/html',
			'.js': 'application/javascript',
			'.json': 'application/json',
			'.css': 'text/css',
			'.png': 'image/png',
			'.jpg': 'image/jpeg',
			'.gif': 'image/gif'
		};

		const server = http.createServer((req, res) => {
			const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
			const safePath = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');
			const filePath = path.join(baseDir, safePath);

			fs.stat(filePath, (err, stats) => {
			if (err || !stats.isFile()) {
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/plain');
				res.end('Not Found');
				return;
			}

			const ext = path.extname(filePath).toLowerCase();
			const contentType = mimeTypes[ext] || 'text/plain';
			res.statusCode = 200;
			res.setHeader('Content-Type', contentType);

			const stream = fs.createReadStream(filePath);
			stream.on('error', () => {
				res.statusCode = 500;
				res.setHeader('Content-Type', 'text/plain');
				res.end('Internal Server Error');
			});
			console.log(`Serving file ${filePath}`)
			stream.pipe(res);
			});
		});
		console.log(`Server listening on port ${port}`)
		server.listen(port);
		return server;
	}
	/** @cogs_endfunc */
	close() {
		this.server.close();
	}
}

export {WebServer}