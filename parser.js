(function () {
	var marked = require('marked'),
		prompt = require('prompt'),
		fs = require('fs'),
		q = require('q'),
		hl = require('highlight').Highlight,
		props = null;

	main();

	function main () {
		init();

		prompt.start();
		prompt.get(props, function (err, result) {
			if (err) {
				errorHandler(); 
			}
			var filepath = result.filepath;
			readFileContent(filepath).then(function (content) {
				saveHtmlFile(filepath, content);
			}, function (err) {
				console.log(err);
			});
		});
	}

	function init() {
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false
		});
		props = [{
			name: 'filepath'
		}];
	}

	function errorHandler (err) {
		console.log(err);
		return 1;
	}

	function readFileContent (filepath) {
		var defer = q.defer();

		fs.readFile(filepath, 'utf8', function (err, data) {
			if (err) {
				defer.reject(err);
			} else {
				defer.resolve(data);
			}
		});

		return defer.promise;
	}

	function convertToHTML(content){
		var defer = q.defer();

		marked(content, function (err, converted) {
			if (err) { 
				console.log(err); 
			} else {
				var convAndHighltd = hl(converted, false, true);
				readFileContent('./templates/mkdTempl.txt').then(function (tmpl) {
					defer.resolve(tmpl + convAndHighltd + '</div></body></html>');
				}, function (err) {
					defer.reject(err);
				});
			}
		});

		return defer.promise;
	}

	function saveHtmlFile(filepath, content){
        var htmlFilepath = filepath.substring(0, filepath.lastIndexOf('.')) + '.html';
        
        convertToHTML(content).then(function (converted) {
        	fs.writeFile(htmlFilepath, converted, function(err) {
            	if (err) {
            	    console.log(err);
            	} else {
            	    console.log('Saved successfully!');
            	}
        	});
        }, function (err) {
        	console.log(err);
        });
    }
})();