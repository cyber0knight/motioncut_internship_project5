var mysql = require('mysql2');
const { faker } = require('@faker-js/faker');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2774693949',
    database: 'tiffin_service'
})

var data = [];

for(var i=0; i<10; i++){
    data.push(
        [
            faker.internet.email(),
            faker.internet.password(),
            faker.internet.userName(),
            faker.image.avatar(),
            faker.phone.number(),
            faker.location.zipCode(),
            faker.location.streetAddress(),
            faker.date.past().toISOString().slice(0, 19).replace('T', ' ')
        ]
    )
}

console.log(data);

var q = 'insert into users (email, password, name, image, phone, zincode, address, created_at) values ?';

connection.query(q, [data], function(err, result){
    if(err) throw err;
    console.log(result);
})

connection.end();