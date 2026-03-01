module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      required: true,
      type: 'string',
      sensitive: true,
      helpText: 'Your PayzCore project API key (pk_live_...)',
    },
    {
      key: 'apiUrl',
      label: 'API URL',
      required: false,
      type: 'string',
      default: 'https://api.payzcore.com',
      helpText: 'PayzCore API base URL (change only for self-hosted)',
    },
  ],
  test: async (z, bundle) => {
    const response = await z.request({
      url: `${bundle.authData.apiUrl || 'https://api.payzcore.com'}/v1/payments`,
      params: { limit: '1' },
    });
    return response.data;
  },
  connectionLabel: (z, bundle) => {
    const key = bundle.authData.apiKey || '';
    return `PayzCore (${key.substring(0, 12)}...)`;
  },
};
