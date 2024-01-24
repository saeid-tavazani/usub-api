import {config} from "dotenv"
import bootApplication from "./app/index"
config();
bootApplication(3000)