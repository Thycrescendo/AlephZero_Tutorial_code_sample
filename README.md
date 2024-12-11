# Front-end App: Smart Contract Interaction with Aleph Zero

Learn how to query a contract's state and send signed transactions in your front-end application.

## Introduction

In this tutorial, you will learn how to make the front-end of your application interact with smart contracts using `@polkadot/api-contract`. Specifically, you will learn:

- How to read values stored in your smart contract.
- How to send signed transactions to your smart contract.

Before starting, consider checking out the [Bulletin Board Example repository](https://github.com/alephzero/bulletin-board-example). It provides a comprehensive example dApp that can be used to learn more about writing smart contracts in Ink! and building your first dApp on the Aleph Zero ecosystem. All the code snippets in this tutorial are derived from this repository.

Additionally, the [Aleph Zero Signer Integration tutorial](https://alephzero.org/docs/signer-integration-tutorial) may be a useful starting point.

## Connecting to a Deployed Smart Contract

To interact with the blockchain, you need to connect to a node running as part of the network. Using public Aleph Zero endpoints, you connect to a single endpoint that serves as an umbrella for multiple nodes run by the Aleph Zero Foundation, which will automatically choose the best endpoint.

The first step is to create an API instance to connect to a running node using a provider. The default `WsProvider` connects to `ws://127.0.0.1:9944`, typically your local node's endpoint. For Aleph Zero Testnet, use `wss://ws.test.azero.dev` and for Aleph Zero Mainnet, use `wss://ws.azero.dev`.

```javascript
import { ApiPromise, WsProvider } from '@polkadot/api';

const APP_PROVIDER_URL = "ws://127.0.0.1:9944";
const wsProvider = new WsProvider(APP_PROVIDER_URL);
const api = await ApiPromise.create({ provider: wsProvider });
