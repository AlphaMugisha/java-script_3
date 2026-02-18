const fs = require('fs');
fs.readFile('alpha.txt', 'utf8', fundtion(err, data) {
    if (err) {
        console.log('error'.err.message);
        return;
    }
    console.log('File contents:', data);
}
)