var fs = require('fs');
var path = require('path');
var prompt = require('prompt');

var ENV_FILE_PATH = path.resolve(__dirname, '.env');

if (!fs.existsSync(ENV_FILE_PATH)) {
    var schema = {
        properties: {
            apixuKey: {
                description: 'Please input your Apixu api key'
            }
        }
    };

    prompt.start();

    prompt.get(schema, function (err, result) {
        console.log('Writing .env file containing your Apixu api key');

        fs.writeFileSync(ENV_FILE_PATH, 'APIXU_KEY=' + result.apixuKey);
    });
}

