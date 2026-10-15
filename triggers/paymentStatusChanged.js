// The API has no sort/order params. `updated_after` returns payments updated
// after a timestamp, oldest first, so we look back a fixed window, page
// through it and return newest first (Zapier expects reverse-chronological).
// Dedup uses the composite `${id}_${status}` key, so each status change
// triggers once.
const LOOKBACK_MINUTES = 60;
const PAGE_SIZE = 100;
const MAX_PAGES = 5;

const perform = async (z, bundle) => {
  const baseUrl = bundle.authData.apiUrl || 'https://api.payzcore.com';
  const updatedAfter = new Date(Date.now() - LOOKBACK_MINUTES * 60 * 1000).toISOString();

  const payments = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    const response = await z.request({
      url: `${baseUrl}/v1/payments`,
      params: {
        updated_after: updatedAfter,
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      },
    });
    payments.push(...(response.data.payments || []));
    if (!response.data.pagination || !response.data.pagination.has_more) break;
  }

  return payments.reverse().map((p) => ({
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
