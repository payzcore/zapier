const authentication = require('./authentication');
const newCompletedPayment = require('./triggers/newCompletedPayment');
const newExpiredPayment = require('./triggers/newExpiredPayment');
const paymentStatusChanged = require('./triggers/paymentStatusChanged');
const createPayment = require('./creates/createPayment');
const confirmPayment = require('./creates/confirmPayment');
const findPayment = require('./searches/findPayment');
const listPayments = require('./searches/listPayments');

const addApiKey = (request, z, bundle) => {
  request.headers['x-api-key'] = bundle.authData.apiKey;
  request.headers['Content-Type'] = 'application/json';
  return request;
};

const handleErrors = (response, z, bundle) => {
  if (response.status === 429) {
    throw new z.errors.ThrottledError('Rate limit exceeded', 60);
  }
  if (response.status === 401) {
    throw new z.errors.RefreshAuthError('Invalid API key');
  }
  return response;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addApiKey],
  afterResponse: [handleErrors],
  triggers: {
    [newCompletedPayment.key]: newCompletedPayment,
    [newExpiredPayment.key]: newExpiredPayment,
    [paymentStatusChanged.key]: paymentStatusChanged,
  },
  creates: {
    [createPayment.key]: createPayment,
    [confirmPayment.key]: confirmPayment,
  },
  searches: {
    [findPayment.key]: findPayment,
    [listPayments.key]: listPayments,
  },
};
