const { Pool } = require('pg');

const pool1 = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const pool2 = new Pool({
    connectionString: process.env.DATABASE_URL_admin,
});


const pool3 = new Pool({
    connectionString: process.env.DATABASE_URL_hr,
});

const pool4 = new Pool({
    connectionString: process.env.DATABASE_URL_manager,
});
const pool5 = new Pool({
    connectionString: process.env.DATABASE_URL_supervisor,
});
const pool6 = new Pool({
    connectionString: process.env.DATABASE_URL_employee,
});

module.exports ={ pool1,pool2,pool3,pool4,pool5,pool6 } ;
