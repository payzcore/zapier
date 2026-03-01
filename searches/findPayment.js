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
    sample: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      external_ref: 'user-123',
      network: 'TRC20',
      token: 'USDT',
      status: 'paid',
    },
    outputFields: [
      { key: 'id', label: 'Payment ID', type: 'string' },
      { key: 'external_ref', label: 'External Reference', type: 'string' },
      { key: 'network', label: 'Network', type: 'string' },
      { key: 'token', label: 'Token', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
      { key: 'address', label: 'Address', type: 'string' },
      { key: 'expected_amount', label: 'Expected Amount', type: 'string' },
      { key: 'paid_amount', label: 'Paid Amount', type: 'string' },
      { key: 'tx_hash', label: 'Transaction Hash', type: 'string' },
    ],
  },
};
