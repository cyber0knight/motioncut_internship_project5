import mysql from 'mysql2';
import {faker} from '@faker-js/faker';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2774693949',
    database: 'tiffin_service'
})


var data = [];

for(var i=0; i<20; i++){
    data.push(
        [
            faker.number.int()%20+1, 
            faker.number.int()%10+1, 
            faker.number.int()%5+1, 
            faker.lorem.lines(1),
            faker.date.past().toISOString().slice(0, 19).replace('T', ' ')
        ]
    )
        
}

console.log(data);

var q = 'insert into reviews (user_id, menu_id, Rating, Comment, Review_date) values ?';

db.query(q, [data], function(err, result){
    if(err) throw err;
    console.log(result);
})

db.end();

