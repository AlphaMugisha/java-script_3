const fs = require('fs');
fs.readFile('alpha.txt', 'utf8', function(err, data) {
    if (err) {
        console.log('error:', err.message);
        return;
    }
    console.log('File contents:', data);
}
)