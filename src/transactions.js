import { web3Enable, web3Accounts, web3FromSource } from "@polkadot/extension-dapp";
import { api } from './api';
import { contract } from './contract';

const APP_NAME = 'Aleph Zero The Bulletin Board';

export const initWallet = async () => {
  const injectedExtensions = await web3Enable(APP_NAME);
  const accounts = await web3Accounts();
  return accounts[0];
};

export const getGasLimit = async (
  api,
  userAddress,
  message,
  contract,
  options = {},
  args = []
) => {
  const abiMessage = toContractAbiMessage(contract, message);
  if (!abiMessage.ok) return abiMessage;

  const { value, gasLimit, storageDepositLimit } = options;
  const { gasConsumed, gasRequired, storageDeposit, debugMessage, result } =
    await api.call.contractsApi.call(
      userAddress,
      contract.address,
      value ?? new BN(0),
      gasLimit ?? null,
      storageDepositLimit ?? null,
      abiMessage.value.toU8a(args)
    );

  return { ok: true, value: gasRequired };
};

export const sendPost = async (
  expiresAfter,
  postText,
  totalPrice,
  userAccount
) => {
  const injector = await web3FromSource(userAccount.meta.source);

  const options = { value: totalPrice };
  const gasLimitResult = await getGasLimit(
    api,
    userAccount.address,
    "post",
    contract,
    options,
    [expiresAfter, postText]
  );

  if (!gasLimitResult.ok) {
    console.log(gasLimitResult.error);
    return;
  }

  const { value: gasLimit } = gasLimitResult;
  const tx = contract.tx.post({ value: totalPrice, gasLimit }, expiresAfter, postText);

  await tx.signAndSend(userAccount.address, { signer: injector.signer }, ({ events = [], status }) => {
    events.forEach(({ event }) => {
      const { method } = event;
      if (method === "ExtrinsicSuccess" && status.type === "InBlock") {
        console.log("Success!");
      } else if (method === "ExtrinsicFailed") {
        console.log(`An error occurred: ${method}.`);
      }
    });
  }).catch((error) => {
    console.log(`An error occurred: ${error}.`);
  });
};
