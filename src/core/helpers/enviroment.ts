import * as nconf from 'nconf';

nconf.env().argv();

const env = nconf.get('NODE_ENV') || 'development';

const IS_NODE_NOT_PRODUCTION = env !== 'production';
const IS_NODE_PRODUCTION = env === 'production';
const IS_NODE_DEVELOPMENT = env === 'development';

export { IS_NODE_NOT_PRODUCTION, IS_NODE_DEVELOPMENT, IS_NODE_PRODUCTION };
