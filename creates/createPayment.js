const perform = async (z, bundle) => {
  const baseUrl = bundle.authData.apiUrl || 'https://api.payzcore.com';
  const body = {
    amount: bundle.inputData.amount,
    external_ref: bundle.inputData.external_ref,
  };
  if (bundle.inputData.network) body.network = bundle.inputData.network;
  if (bundle.inputData.token) body.token = bundle.inputData.token;
  if (bundle.inputData.external_order_id)
    body.external_order_id = bundle.inputData.external_order_id;
  if (bundle.inputData.expires_in)
    body.expires_in = parseInt(bundle.inputData.expires_in, 10);
  if (bundle.inputData.address) body.address = bundle.inputData.address;
  if (bundle.inputData.metadata) {
    try {
      body.metadata = JSON.parse(bundle.inputData.metadata);
    } catch (e) {
      /* ignore invalid JSON */
    }
  }

  const response = await z.request({
    method: 'POST',
    url: `${baseUrl}/v1/payments`,
    body,
  });
  return response.data.payment || response.data;
};

module.exports = {
  key: 'create_payment',
  noun: 'Payment',
  display: {
    label: 'Create Payment',
    description: 'Creates a new payment monitoring request in PayzCore.',
  },
  operation: {
    perform,
    inputFields: [
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        required: true,
        helpText: 'Payment amount in stablecoin',
      },
      {
        key: 'network',
        label: 'Network',
        type: 'string',
        required: false,
        choices: {
          TRC20: 'TRC20 (Tron)',
          BEP20: 'BEP20 (BSC)',
          ERC20: 'ERC20 (Ethereum)',
          POLYGON: 'Polygon',
          ARBITRUM: 'Arbitrum',
        },
        helpText:
          'Blockchain network. If omitted, the customer selects on the payment page.',
      },
      {
        key: 'token',
        label: 'Token',
        type: 'string',
        required: false,
        default: 'USDT',
        choices: { USDT: 'USDT', USDC: 'USDC' },
        helpText: 'Stablecoin token. Note: USDC is not available on TRC20.',
      },
      {
        key: 'external_ref',
        label: 'External Reference',
        type: 'string',
        required: true,
        helpText: 'Your user/customer identifier',
      },
      {
        key: 'external_order_id',
        label: 'External Order ID',
        type: 'string',
        required: false,
        helpText: 'Your order reference (for idempotency)',
      },
      {
        key: 'expires_in',
        label: 'Expires In (Seconds)',
        type: 'integer',
        required: false,
        helpText:
          'Seconds until payment expires (300-86400, default: 1800)',
      },
      {
        key: 'address',
        label: 'Static Wallet Address',
        type: 'string',
        required: false,
        helpText:
          'Pre-assigned blockchain address (for static wallet mode). If omitted, PayzCore derives one automatically.',
      },
      {
        key: 'metadata',
        label: 'Metadata (JSON)',
        type: 'text',
        required: false,
        helpText: 'Arbitrary JSON data returned in webhooks',
      },
    ],
    sample: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      address: 'TXyz...abc',
      amount: '50.00',
      network: 'TRC20',
      token: 'USDT',
      status: 'pending',
      expires_at: '2026-02-16T12:00:00.000Z',
      external_order_id: 'ORD-456',
      qr_code: 'data:image/png;base64,...',
      notice: null,
      original_amount: '50.00',
      requires_txid: false,
      confirm_endpoint: null,
    },
    outputFields: [
      { key: 'id', label: 'Payment ID', type: 'string' },
      { key: 'address', label: 'Watch Address', type: 'string' },
      { key: 'amount', label: 'Amount', type: 'string' },
      { key: 'network', label: 'Network', type: 'string' },
      { key: 'token', label: 'Token', type: 'string' },
      { key: 'status', label: 'Status', type: 'string' },
      { key: 'expires_at', label: 'Expires At', type: 'datetime' },
      {
        key: 'external_order_id',
        label: 'External Order ID',
        type: 'string',
      },
      { key: 'notice', label: 'Notice', type: 'string' },
      { key: 'original_amount', label: 'Original Amount', type: 'string' },
      { key: 'requires_txid', label: 'Requires TX ID', type: 'boolean' },
      {
        key: 'confirm_endpoint',
        label: 'Confirm Endpoint',
        type: 'string',
      },
    ],
  },
};
