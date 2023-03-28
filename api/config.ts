import * as dotenv  from 'dotenv';
dotenv.config();

const PORT = process.env.SERVER_PORT;

export default {
  PORT,
};
