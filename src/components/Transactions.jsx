import { useEffect, useState } from "react";
import useAlchemy from "../hooks/useAlchemy";
import { Link } from "react-router-dom";
import { Utils } from "alchemy-sdk";

const Transactions = () => {
    const alchemy = useAlchemy();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactions = async () => {
            const newTransactions = await alchemy.getLatestTransactions();
            setTransactions(newTransactions);
        }
        if (transactions.length === 0) {
            getTransactions();
        }
    }, [transactions]);
    return (
        <div className="col-lg-6">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-header-title">Latest Transactions</h2>
                </div>
                <div className="card-body overflow-auto scrollbar-custom" style={{maxHeight: "30.3rem"}}>
                    {
                        transactions && transactions.map((transaction) => {
                            return (
                                <>
                                    <div className="row" key={`row_${transaction.hash}`}>
                                        <div className="col-sm-4 col-lg-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="d-none d-sm-flex content-center bg-light text-muted rounded p-3" style={{height: "3rem", width: "3rem"}}>
                                                    <i className="fa fa-book fa-lg"></i>
                                                </div>
                                                <div className="d-flex align-items-center align-items-sm-start flex-row flex-sm-column gap-1 gap-sm-0">
                                                    <span className="d-inline-block d-sm-none">TX#</span>
                                                    <Link style={{maxWidth: "8rem"}} to={`/transactions/${transaction.hash}`}>{transaction.hash.slice(0, 12)}...</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-8 col-lg-7 d-flex justify-content-sm-between align-items-end align-items-sm-center">
                                            <div className="pe-0 pe-sm-2">
                                                <div className="d-flex flex-wrap gap-1">From
                                                    <Link to={`/addresses/${transaction.from}`}>{transaction.from.slice(0, 6)}...{transaction.from.slice(36)}</Link>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap gap-1">To 
                                                    <Link to={`/addresses/${transaction.to}`}>{transaction.to.slice(0, 6)}...{transaction.to.slice(36)}</Link>
                                                </div>
                                            </div>
                                            <div className="d-none d-sm-block text-end ms-2 ms-sm-0">
                                                <span className="badge border border-dark dark:border-white border-opacity-15 text-dark  py-1.5 px-2 fw-medium">
                                                    <b>Value: </b>{Utils.formatEther(transaction.value)} ETH
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr  key={`hr_${transaction.hash}`}/>
                                </>
                            );
                        })
                    }
                </div>
                <a className="card-footer bg-light fw-medium text-cap link-muted text-center" href="https://etherscan.io/txs">
                View all transactions <i className="far fa-long-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    );
}

export default Transactions;