import { useEffect, useState } from "react";
import useAlchemy from "../hooks/useAlchemy";
import { Link } from "react-router-dom";

const BlocksListing = () => {
    const [blocks, setBlocks] = useState([]);
    const alchemy = useAlchemy();

    useEffect(() => {
        const getTransactions = async () => {
            const newBlocks = await alchemy.getAllBlocks(10);
            console.log(newBlocks);
            setBlocks(newBlocks);
        }
        getTransactions();
        
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <div id="ContentPlaceHolder1_divTransactions" className="card">
            <div id="ContentPlaceHolder1_divDataInfo" className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover table-align-middle mb-0">
                    <thead id="ContentPlaceHolder1_theadAllTransactionTable" className="align-middle text-nowrap">
                        <tr>
                            <th scope="col">Block</th>
                            <th scope="col">Date</th>
                            <th scope="col">Txn</th>
                            <th scope="col">Gas used</th>
                            <th scope="col">Gas Limit</th>
                            <th scope="col">Base Fee</th>
                            <th scope="col">Miner</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle text-nowrap">
                        {
                            blocks && blocks.map((block) => {
                                return (
                                    <tr key={`tr_${block.number}`}>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <span className="hash-tag text-truncate">
                                                    <Link to={`/blocks/${block.hash}`} className="myFnExpandBox_searchVal">{block.hash}</Link>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <span className="hash-tag text-truncate">
                                                    <span className="myFnExpandBox_searchVal">{block.timestamp}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <span className="hash-tag text-truncate">
                                                    <span className="myFnExpandBox_searchVal">{block.transactions.length}</span>
                                                </span>
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <span className="hash-tag text-truncate">
                                                    <span className="myFnExpandBox_searchVal">{block.gasUsed}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <span className="hash-tag text-truncate">
                                                    <span className="myFnExpandBox_searchVal">{block.gasLimit}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <span className="hash-tag text-truncate">
                                                    <span className="myFnExpandBox_searchVal">{block.baseFeePerGas}</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <span className="hash-tag text-truncate">
                                                    <Link to={`/address/${block.miner}`} className="myFnExpandBox_searchVal">{block.miner}</Link>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BlocksListing;