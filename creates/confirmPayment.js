const perform = async (z, bundle) => {
  const baseUrl = bundle.authData.apiUrl || 'https://api.payzcore.com';
  const paymentId = bundle.inputData.payment_id;
  const response = await z.request({
    method: 'POST',
    url: `${baseUrl}/v1/payments/${paymentId}/confirm`,
    body: { tx_hash: bundle.inputData.tx_hash },
  });
  return response.data.payment || response.data;
};

module.exports = {
  key: 'confirm_payment',
  noun: 'Payment',
  display: {
    label: 'Confirm Payment',
    description:
      'Confirms a static-wallet payment by submitting the transaction hash.',
  },
  operation: {
    perform,
    inputFields: [
      {
        key: 'payment_id',
        label: 'Payment ID',
        type: 'string',
        required: true,
        helpText: 'UUID of the payment to confirm',
      },
      {
        key: 'tx_hash',
        label: 'Transaction Hash',
        type: 'string',
        required: true,
        helpText: 'Blockchain transaction hash proving the transfer',
      },
    ],
    sample: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      status: 'confirming',
      tx_hash: 'abc123def456...',
      network: 'TRC20',
      token: 'USDT',
      address: 'TXyz...abc',
      expected_amount: '50.00',
    },
    outputFields: [
      { key: 'id', label: 'Payment ID', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
      { key: 'tx_hash', label: 'Transaction Hash', type: 'string' },
      { key: 'network', label: 'Network', type: 'string' },
      { key: 'token', label: 'Token', type: 'string' },
      { key: 'address', label: 'Address', type: 'string' },
      { key: 'expected_amount', label: 'Expected Amount', type: 'string' },
    ],
  },
};
