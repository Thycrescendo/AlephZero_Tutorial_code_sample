import { ApiPromise, WsProvider } from '@polkadot/api';

const APP_PROVIDER_URL = "ws://127.0.0.1:9944";
const wsProvider = new WsProvider(APP_PROVIDER_URL);

export const api = await ApiPromise.create({ provider: wsProvider });
