const perform = async (z, bundle) => {
  const baseUrl = bundle.authData.apiUrl || 'https://api.payzcore.com';
  const params = {};
  if (bundle.inputData.status) params.status = bundle.inputData.status;
  if (bundle.inputData.limit) params.limit = bundle.inputData.limit;

  const response = await z.request({
    url: `${baseUrl}/v1/payments`,
    params,
  });
  return response.data.payments || [];
};

module.exports = {
  key: 'list_payments',
  noun: 'Payment',
  display: {
    label: 'List Payments',
    description:
      'Lists payments for the project, optionally filtered by status.',
  },
  operation: {
    perform,
    inputFields: [
      {
        key: 'status',
        label: 'Status Filter',
        type: 'string',
        required: false,
        choices: {
          pending: 'Pending',
          confirming: 'Confirming',
          partial: 'Partial',
          paid: 'Paid',
          overpaid: 'Overpaid',
          expired: 'Expired',
          cancelled: 'Cancelled',
        },
      },
      {
        key: 'limit',
        label: 'Limit',
        type: 'integer',
        required: false,
        default: '50',
        helpText: 'Max results (1-100)',
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
    ],
  },
};
