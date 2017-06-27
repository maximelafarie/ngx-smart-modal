import config from './rollup.config.umd.js';
import {nameLibrary,PATH_DIST} from './config-library.js'
config.format = "es";
config.dest = PATH_DIST+nameLibrary+".esm.js";
export default config;
