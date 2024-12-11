import { ContractPromise } from '@polkadot/api-contract';
import { api } from './api';
import bulletinBoardMetadata from '../metadata/metadata_bulletin_board.json';
import addresses from '../metadata/addresses.json';

const bulletin_board_address = addresses.bulletin_board_address;

export const contract = new ContractPromise(api, bulletinBoardMetadata, bulletin_board_address);

export const queryContractState = async (accountId) => {
  const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
  const readOnlyGasLimit = api.registry.createType('WeightV2', {
    refTime: new BN(1_000_000_000_000),
    proofSize: MAX_CALL_WEIGHT,
  });

  const {
    gasConsumed,
    gasRequired,
    storageDeposit,
    result,
    output,
    debugMessage,
  } = await contract.query.getByAccount(
    contract.address,
    { gasLimit: readOnlyGasLimit },
    accountId
  );

  if (result.isOk && output) {
    console.log(output.toHuman());
  } else if (result.isErr) {
    console.log(result.toHuman());
  }
};
