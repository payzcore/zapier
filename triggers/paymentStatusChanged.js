const perform = async (z, bundle) => {
  const baseUrl = bundle.authData.apiUrl || 'https://api.payzcore.com';
  const params = {
    limit: '25',
    sort: 'updated_at',
    order: 'desc',
  };

  // Zapier calls perform repeatedly; dedup via composite id_status handles the rest.
  // Limit kept low (25) to reduce API load since we rely on dedup, not time-based filtering.
  const response = await z.request({
    url: `${baseUrl}/v1/payments`,
    params,
  });

  // Return with composite dedup key
  return (response.data.payments || []).map((p) => ({
    ...p,
    id: `${p.id}_${p.status}`,
    payment_id: p.id,
  }));
};

module.exports = {
  key: 'payment_status_changed',
  noun: 'Payment Status Change',
  display: {
    label: 'Payment Status Changed',
    description:
      'Triggers when any payment status changes (paid, expired, partial, overpaid, cancelled).',
  },
  operation: {
    perform,
    sample: {
      id: '550e8400-e29b-41d4-a716-446655440000_paid',
      payment_id: '550e8400-e29b-41d4-a716-446655440000',
      external_ref: 'user-123',
      external_order_id: 'ORD-456',
      network: 'TRC20',
      token: 'USDT',
      address: 'TXyz...abc',
      expected_amount: '50.00',
      paid_amount: '50.00',
      status: 'paid',
      tx_hash: 'abc123...',
      expires_at: '2026-02-16T12:00:00.000Z',
      paid_at: '2026-02-16T11:30:00.000Z',
      created_at: '2026-02-16T11:00:00.000Z',
      updated_at: '2026-02-16T11:30:00.000Z',
    },
    outputFields: [
      { key: 'id', label: 'Dedup Key', type: 'string' },
      { key: 'payment_id', label: 'Payment ID', type: 'string' },
      { key: 'external_ref', label: 'External Reference', type: 'string' },
      {
        key: 'external_order_id',
        label: 'External Order ID',
        type: 'string',
      },
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
