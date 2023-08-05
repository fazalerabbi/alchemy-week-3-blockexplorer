import { useEffect, useState } from "react";
import useAlchemy from "../hooks/useAlchemy";
import { Link } from "react-router-dom";
import { Utils } from "alchemy-sdk";

const TransactionsListing = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const alchemy = useAlchemy();

    useEffect(() => {
        console.log("TransactionsListing useEffect");
        const getTransactions = async () => {
            const newTransactions = await alchemy.getAllTransactions();
            setTransactions(newTransactions);
            setLoading(false);
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
                    {/* <div>
                        <span className="text-dark content-center gap-1">
                        More than 2,048,692,956 transactions found</span>
                        <div className="d-block text-muted small">
                        (Showing the last 500k records)
                        </div>
                    </div> */}
                    {/* <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                        <nav aria-label="table navigation">
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled"><span className="page-link">First</span></li>
                            <li className="page-item disabled"><span className="page-link px-3"><i className="fa fa-chevron-left small"></i></span><span className="sr-only">Previous</span></li>
                            <li className="page-item disabled"><span className="page-link text-nowrap">Page 1 of 10000</span></li>
                            <li className="page-item" data-bs-toggle="tooltip"><a className="page-link px-3" href="https://etherscan.io/txs?p=2" aria-label="Next"><span aria-hidden="True"><i className="fa fa-chevron-right small"></i></span><span className="sr-only">Next</span></a></li>
                            <li className="page-item"><a className="page-link" href="https://etherscan.io/txs?p=10000"><span aria-hidden="True">Last</span><span className="sr-only">Last</span></a></li>
                        </ul>
                        </nav>
                    </div> */}
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover table-align-middle mb-0">
                    <thead id="ContentPlaceHolder1_theadAllTransactionTable" className="align-middle text-nowrap">
                        <tr>
                            <th scope="col">Txn Hash</th>
                            <th scope="col">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="text-nowrap">Method
                                    </span>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="text-nowrap">Block</span>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex align-items-center gap-2">
                                    Age
                                </div>
                            </th>
                            <th scope="col" width="100">
                                <div className="d-flex align-items-center gap-2">
                                    <span>From</span>
                                </div>
                            </th>
                            <th scope="col">&nbsp;</th>
                            <th scope="col">
                                <div className="d-flex align-items-center gap-2">
                                    <span>To</span>
                                </div>
                            </th>
                            <th scope="col">
                                Value(Eth)
                            </th>
                            <th scope="col">
                                Txn Fee(Gwei)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="align-middle text-nowrap">
                        {
                            transactions && transactions.map((transaction, index) => {
                                return (
                                    <tr key={`tr_${transaction.hash}`}>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <span className="hash-tag text-truncate">
                                                    <Link to={`/transaction/${transaction.hash}`} className="myFnExpandBox_searchVal">{transaction.hash}</Link>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{maxWidth: "95px"}} className="d-block badge bg-light border border-dark dark:border-white border-opacity-10 text-dark fw-normal text-truncate w-100 py-1.5">Approve</span>
                                        </td>
                                        <td>
                                            <Link to={`/block/${transaction.blockNumber}`} className="myFnExpandBox_searchVal">{transaction.blockNumber}</Link>
                                        </td>
                                        <td className="showAge "><span rel="tooltip" data-bs-toggle="tooltip" data-bs-title="2023-08-01 6:35:11">7 secs ago</span></td>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <Link to={`/address/${transaction.from}`} >{transaction.from.slice(0,16)}...{transaction.from.slice(36)}</Link>
                                                <Link className="js-clipboard link-secondary">
                                                    <i className="fa fa-copy fa-fw" onClick={() => {copyToClipboard(transaction.from)}}></i>
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="text-center"><span className="bg-success bg-opacity-10 border border-success border-opacity-25 text-success fs-70x content-center rounded-pill mx-auto" style={{width: "1.5rem", height: "1.5rem"}}>
                                            <i className="fa fa-arrow-right"></i>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex d-flex align-items-center gap-1">
                                                <Link to={`/address/${transaction.to}`} >{transaction.to.slice(0,16)}...{transaction.to.slice(36)}</Link>
                                                <Link className="js-clipboard link-secondary">
                                                    <i className="fa fa-copy fa-fw" onClick={() => {copyToClipboard(transaction.to)}}></i>
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="d-block text-truncate">
                                                <span className="text-nowrap">{transaction.value? Utils.formatEther(transaction.value) : 0.00}</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="d-block text-truncate">
                                                <span className="text-nowrap">{Math.round(Utils.formatUnits(transaction.gasPrice.toNumber(), 'gwei'))}</span>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* <form method="post" action="https://etherscan.io/txs" id="ctl00">
                <div id="ContentPlaceHolder1_divBottomPagination" className="card-footer d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div id="ContentPlaceHolder1_pageRecords" className="d-flex align-items-center gap-2 text-nowrap text-muted">
                        Show:
                        <select name="ctl00$ContentPlaceHolder1$ddlRecordsPerPage" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$ContentPlaceHolder1$ddlRecordsPerPage\&#39;,\&#39;\&#39;)&#39;, 0)" id="ContentPlaceHolder1_ddlRecordsPerPage" className="form-select form-select-sm w-auto">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option selected="selected" value="50">50</option>
                        <option value="100">100</option>
                        </select>
                        Records
                    </div>
                    <nav aria-label="table navigation">
                        <ul className="pagination pagination-sm mb-0">
                        <li className="page-item disabled"><span className="page-link">First</span></li>
                        <li className="page-item disabled"><span className="page-link px-3"><i className="fa fa-chevron-left small"></i></span><span className="sr-only">Previous</span></li>
                        <li className="page-item disabled"><span className="page-link text-nowrap">Page 1 of 10000</span></li>
                        <li className="page-item" data-bs-toggle="tooltip"><a className="page-link px-3" href="https://etherscan.io/txs?p=2" aria-label="Next"><span aria-hidden="True"><i className="fa fa-chevron-right small"></i></span><span className="sr-only">Next</span></a></li>
                        <li className="page-item"><a className="page-link" href="https://etherscan.io/txs?p=10000"><span aria-hidden="True">Last</span><span className="sr-only">Last</span></a></li>
                        </ul>
                    </nav>
                </div>
            </form> */}
        </div>
    );
}

export default TransactionsListing;