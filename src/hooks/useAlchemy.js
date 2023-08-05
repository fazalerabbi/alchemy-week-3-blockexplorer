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

  const getAllBlocks = async (numberOfBlocks = 5) => {
    let blocks = [];
    let latestBlockNumberOrHash = await alchemy.core.getBlockNumber();

    for (let i = 0; i < numberOfBlocks; i++) {
      const block = await alchemy.core.getBlock(latestBlockNumberOrHash);
      const date = new Date(block.timestamp * 1000);
      blocks.push({
        ...block,
        baseFeePerGas: Utils.formatUnits(
          block.baseFeePerGas.toNumber(),
          "gwei"
        ),
        timestamp:
          (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()) +
          "-" +
          (date.getMonth() + 1 <= 9
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds(),
        gasLimit: Utils.formatUnits(block.gasLimit.toNumber(), "gwei"),
        gasUsed: Utils.formatUnits(block.gasUsed.toNumber(), "gwei"),
      });
      latestBlockNumberOrHash = block.parentHash;
    }

    return blocks;
  };

  const getAllTransactions = async (numberOfTransactions = 100) => {
    let latestBlockNumberOrHash = await alchemy.core.getBlockNumber();
    let transactions = (
      await alchemy.core.getBlockWithTransactions(latestBlockNumberOrHash)
    ).transactions;
    console.log(transactions);
    return transactions.slice(0, numberOfTransactions);
  };

  return {
    getCurrentGasFee,
    getLatestBlocks,
    getLatestTransactions,
    getAllTransactions,
    getAllBlocks,
  };
};

export default useAlchemy;
