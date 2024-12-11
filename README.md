# フロントエンドアプリ: Aleph Zeroとスマートコントラクトの連携

フロントエンドアプリケーションでコントラクトの状態をクエリし、署名済みトランザクションを送信する方法を学びましょう。

## はじめに

このチュートリアルでは、`@polkadot/api-contract`を使用して、アプリケーションのフロントエンドがスマートコントラクトと連携する方法を学びます。具体的には、次のことを学びます:

- スマートコントラクトに格納された値を読み取る方法
- スマートコントラクトに署名済みトランザクションを送信する方法

開始する前に、[Bulletin Board Example リポジトリ](https://github.com/alephzero/bulletin-board-example)をチェックしてみてください。Ink!でのスマートコントラクトの作成や、Aleph Zeroエコシステムでの最初のdAppの構築について学ぶための包括的な例dAppが提供されています。このチュートリアルのすべてのコードスニペットは、このリポジトリから派生しています。

さらに、[Aleph Zero Signer Integration チュートリアル](https://alephzero.org/docs/signer-integration-tutorial)も参考になるかもしれません。

## デプロイされたスマートコントラクトへの接続

ブロックチェーンと連携するには、ネットワークの一部として実行されているノードに接続する必要があります。Aleph Zeroのパブリックエンドポイントを使用することで、Aleph Zero財団によって運営されている複数のノードの傘として機能する単一のエンドポイントに接続し、最適なエンドポイントを自動的に選択できます。

最初のステップは、プロバイダーを使用して実行中のノードに接続するためのAPIインスタンスを作成することです。デフォルトの`WsProvider`は通常、ローカルノードのエンドポイントである`ws://127.0.0.1:9944`に接続します。Aleph Zero Testnetの場合は`wss://ws.test.azero.dev`、Aleph Zero Mainnetの場合は`wss://ws.azero.dev`を使用します。

```javascript
import { ApiPromise, WsProvider } from '@polkadot/api';

const APP_PROVIDER_URL = "ws://127.0.0.1:9944";
const wsProvider = new WsProvider(APP_PROVIDER_URL);
const api = await ApiPromise.create({ provider: wsProvider });
```