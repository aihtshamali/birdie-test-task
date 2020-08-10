import { Events } from '../entity/Event';
import { createConnection} from 'typeorm';

// const connectionManager = new ConnectionManager();
const  conn = async () => await createConnection({
    type: "mysql",
    host: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
    port: 3306,
    username: "test-read",
    password: "xnxPp6QfZbCYkY8",
    database: "birdietest",
    entities: [Events]
})
export default conn