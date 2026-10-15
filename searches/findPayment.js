const perform = async (z, bundle) => {
  const baseUrl = bundle.authData.apiUrl || 'https://api.payzcore.com';
  const response = await z.request({
    url: `${baseUrl}/v1/payments/${bundle.inputData.paymentId}`,
  });
  return [response.data.payment || response.data];
};

module.exports = {
  key: 'find_payment',
  noun: 'Payment',
  display: {
    label: 'Find Payment',
    description: 'Finds a payment by its ID.',
  },
  operation: {
    perform,
    inputFields: [
      {
        key: 'paymentId',
        label: 'Payment ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the payment to find',
      },
    ],
    // GET /v1/payments/:id has no external_ref / created_at (use List Payments for those)
    sample: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      network: 'TRC20',
      token: 'USDT',
      status: 'paid',
      expected_amount: '50.00',
      paid_amount: '50.00',
      paid_at: '2026-02-16T11:30:00.000Z',
    },
    outputFields: [
      { key: 'id', label: 'Payment ID', type: 'string' },
      { key: 'network', label: 'Network', type: 'string' },
      { key: 'token', label: 'Token', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
      { key: 'address', label: 'Address', type: 'string' },
      { key: 'expected_amount', label: 'Expected Amount', type: 'string' },
      { key: 'paid_amount', label: 'Paid Amount', type: 'string' },
      { key: 'tx_hash', label: 'Transaction Hash', type: 'string' },
      { key: 'expires_at', label: 'Expires At', type: 'datetime' },
      { key: 'paid_at', label: 'Paid At', type: 'datetime' },
    ],
  },
};
