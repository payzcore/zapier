# PayzCore Zapier Integration

Zapier integration for [PayzCore](https://payzcore.com) — blockchain stablecoin transaction monitoring API.

## Important

**PayzCore is a blockchain monitoring service, not a payment processor.** All payments are sent directly to your own wallet addresses. PayzCore never holds, transfers, or has access to your funds.

- **Your wallets, your funds** — You provide your own wallet (HD xPub or static addresses). Customers pay directly to your addresses.
- **Read-only monitoring** — PayzCore watches the blockchain for incoming transactions and sends webhook notifications. That's it.
- **Protection Key security** — Sensitive operations like wallet management, address changes, and API key regeneration require a Protection Key that only you set. PayzCore cannot perform these actions without your authorization.
- **Your responsibility** — You are responsible for securing your own wallets and private keys. PayzCore provides monitoring and notification only.

## Authentication

| Field | Description |
|-------|-------------|
| API Key | Your project API key (`pk_live_...`) |
| API URL | `https://api.payzcore.com` (default, change only for self-hosted) |

## Actions

| Action | Description |
|--------|-------------|
| **Create Payment** | Creates a new payment monitoring request. Supports optional `address` field for static wallet mode. |
| **Confirm Payment** | Confirms a static-wallet payment by submitting the transaction hash. |

## Searches

| Search | Description |
|--------|-------------|
| **Find Payment** | Finds a payment by its ID. |
| **List Payments** | Lists recent payments for the project. |

## Triggers

| Trigger | Description |
|---------|-------------|
| **New Completed Payment** | Fires when a payment is fully received. |
| **New Expired Payment** | Fires when a payment expires. |
| **Payment Status Changed** | Fires on any payment status change. |

## Supported Networks

| Network | USDT | USDC |
|-------|------|------|
| TRC20 (Tron) | Yes | No |
| BEP20 (BSC) | Yes | Yes |
| ERC20 (Ethereum) | Yes | Yes |
| Polygon | Yes | Yes |
| Arbitrum | Yes | Yes |

## Static Wallet Mode

When creating a payment, you can pass a pre-assigned `address` field. In this mode PayzCore skips HD derivation and monitors the provided address instead. The response may include `requires_txid: true`, meaning you need to call **Confirm Payment** with the transaction hash after the user pays.

## Before Going Live

**Always test your setup before accepting real payments:**

1. **Verify your wallet** — In the PayzCore dashboard, verify that your wallet addresses are correct. For HD wallets, click "Verify Key" and compare address #0 with your wallet app.
2. **Run a test order** — Place a test order for a small amount ($1–5) and complete the payment. Verify the funds arrive in your wallet.
3. **Test sweeping** — Send the test funds back out to confirm you control the addresses with your private keys.

> **Warning:** Wrong wallet configuration means payments go to addresses you don't control. Funds sent to incorrect addresses are permanently lost. PayzCore is watch-only and cannot recover funds. Please test before going live.

## See Also

- [Getting Started](https://docs.payzcore.com/getting-started) — Account setup and first payment
- [Webhooks Guide](https://docs.payzcore.com/guides/webhooks) — Events, headers, and signature verification
- [Supported Networks](https://docs.payzcore.com/guides/networks) — Available networks and tokens
- [Error Reference](https://docs.payzcore.com/guides/errors) — HTTP status codes and troubleshooting
- [API Reference](https://docs.payzcore.com) — Interactive API documentation

## License

MIT
