import * as dotenv from 'dotenv';
dotenv.config();
import { keyblade } from 'keyblade';
export const env = keyblade(process.env);
