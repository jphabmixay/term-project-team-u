const fs = require('fs');
const db = require('./db');

const avatarsPath = __dirname+'/../public/images/avatars';
const files = fs.readdirSync(avatarsPath);

files.forEach(function(f) {
    db.any('SELECT * FROM Avatars WHERE image_url=$1', f.toString())
        .then(function(data) {
            // success;
            if(data.toString() === '')
                db.none('INSERT INTO Avatars (image_url) VALUES ($1)',f.toString())
                    .then(function() {
                        console.log(f + ' inserted');
                    })
                    .catch(function(error) {
                        console.log(f + ' insert error');
                    });
        })
        .catch(function(error) {
            // error;
            console.log('Access db error');   
        });
});
