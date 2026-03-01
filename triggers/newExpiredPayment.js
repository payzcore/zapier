const perform = async (z, bundle) => {
  const baseUrl = bundle.authData.apiUrl || 'https://api.payzcore.com';
  const response = await z.request({
    url: `${baseUrl}/v1/payments`,
    params: { status: 'expired', limit: '100' },
  });
  return response.data.payments || [];
};

module.exports = {
  key: 'new_expired_payment',
  noun: 'Expired Payment',
  display: {
    label: 'New Expired Payment',
    description: 'Triggers when a payment expires without being fully received.',
  },
  operation: {
    perform,
    sample: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      external_ref: 'user-123',
      external_order_id: 'ORD-456',
      network: 'TRC20',
      token: 'USDT',
      address: 'TXyz...abc',
      expected_amount: '50.00',
      paid_amount: '0.00',
      status: 'expired',
      tx_hash: null,
      expires_at: '2026-02-16T12:00:00.000Z',
      paid_at: null,
      created_at: '2026-02-16T11:00:00.000Z',
      updated_at: '2026-02-16T12:00:00.000Z',
    },
    outputFields: [
      { key: 'id', label: 'Payment ID', type: 'string' },
      { key: 'external_ref', label: 'External Reference', type: 'string' },
      { key: 'external_order_id', label: 'External Order ID', type: 'string' },
      { key: 'network', label: 'Network', type: 'string' },
      { key: 'token', label: 'Token', type: 'string' },
      { key: 'address', label: 'Address', type: 'string' },
      { key: 'expected_amount', label: 'Expected Amount', type: 'string' },
      { key: 'paid_amount', label: 'Paid Amount', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
      { key: 'tx_hash', label: 'Transaction Hash', type: 'string' },
      { key: 'expires_at', label: 'Expires At', type: 'datetime' },
      { key: 'paid_at', label: 'Paid At', type: 'datetime' },
      { key: 'created_at', label: 'Created At', type: 'datetime' },
      { key: 'updated_at', label: 'Updated At', type: 'datetime' },
    ],
  },
};
