import { Alchemy, Utils } from "alchemy-sdk";
import { Config } from "../constants/config";

const useAlchemy = () => {
  const alchemy = new Alchemy(Config.alchemy);

  const getCurrentGasFee = async () => {
    console.log("Getting current gas fee...");
    const gasBigNumber = await alchemy.core.getGasPrice();
    const gasPrice = gasBigNumber.toNumber(); // Hex to wei
    return Math.round(Utils.formatUnits(gasPrice, "gwei")); // wei to gwei
  };

  const getLatestBlocks = async (numberOfBlocks = 5) => {
    let blocks = [];
    let latestBlockNumberOrHash = await alchemy.core.getBlockNumber();
    for (let i = 0; i < numberOfBlocks; i++) {
      const block = await alchemy.core.getBlock(latestBlockNumberOrHash);
      blocks.push({
        ...block,
        gasUsed: Utils.formatUnits(block.gasUsed.toNumber(), "gwei"),
      });
      latestBlockNumberOrHash = block.parentHash;
    }
    return blocks;
  };

  const getLatestTransactions = async (numberOfTransactions = 5) => {
    let latestBlockNumberOrHash = await alchemy.core.getBlockNumber();
    let transactions = (
      await alchemy.core.getBlockWithTransactions(latestBlockNumberOrHash)
    ).transactions;
    return transactions.slice(0, numberOfTransactions);
  };

  const getAllTransactions = async (numberOfTransactions = 100) => {
    let latestBlockNumberOrHash = await alchemy.core.getBlockNumber();
    let transactions = (
      await alchemy.core.getBlockWithTransactions(latestBlockNumberOrHash)
    ).transactions;
    console.log(transactions);
    return transactions.slice(0, numberOfTransactions);
  };

  const getEthMetaData = async () => {
    const ethMetaData = await alchemy.core.getTokenMetadata(
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    );
    console.log(ethMetaData);
    return ethMetaData;
  };

  return {
    getCurrentGasFee,
    getLatestBlocks,
    getLatestTransactions,
    getAllTransactions,
  };
};

export default useAlchemy;
