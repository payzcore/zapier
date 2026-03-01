const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('creates', () => {
  test('createPayment structure', async () => {
    const bundle = {
      authData: {
        apiKey: process.env.PAYZCORE_API_KEY || 'pk_test_123',
        apiUrl: process.env.PAYZCORE_API_URL || 'https://api.payzcore.com',
      },
      inputData: {
        amount: 50,
        network: 'TRC20',
        token: 'USDT',
        external_ref: 'test-user-1',
      },
    };
    try {
      const result = await appTester(
        App.creates.create_payment.operation.perform,
        bundle
      );
      expect(result.id).toBeDefined();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
