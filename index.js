import dotenv from 'dotenv';

import { runServer } from './src/app';

dotenv.config();

console.log (process.env.TOKEN_NUI);

runServer(process.env.PORT || 3000);
