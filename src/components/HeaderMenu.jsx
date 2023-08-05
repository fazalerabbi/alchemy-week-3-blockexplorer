import { Link } from "react-router-dom";

const HeaderMenu = () => {
    return (
        <header className="header border-bottom d-print-none">
            <nav className="navbar navbar-expand-lg navbar-light py-3 py-lg-0">
                <div className="container-xxl position-relative">
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav gap-1 gap-lg-0 pt-4 pt-lg-0">
                            <li className="nav-item">
                                <Link to="/" className={"nav-link"}>Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle">Blockchain</Link>
                                <ul className="dropdown-menu dropdown-menu-border" style={{minWidth: "14rem"}}>
                                    <li>
                                        <Link to="/transactions" className="dropdown-item">Transactions</Link>
                                    </li>
                                    <li>
                                        <Link to="/transactions?type=pending" className="dropdown-item">Pending Transactions</Link>
                                    </li>
                                    <li>
                                        <Link to="/transactions?type=contract-internal-transactions" className="dropdown-item">Contract Internal Transactions</Link>
                                    </li>
                                    <li>
                                        <Link to="/transactions?type=beacon-deposits" className="dropdown-item">Beacon Deposits</Link>
                                    </li>
                                    <li>
                                        <Link to="/transactions?type=beacon-withdrawals" className="dropdown-item">Beacon Withdrawals</Link>
                                    </li>
                                    <li>
                                    <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link to="/blocks" className="dropdown-item">View Blocks</Link>
                                    </li>
                                    <li>
                                        <Link to="/blocks?type=forked" className="dropdown-item">Forked Blocks (Reorgs)</Link>
                                    </li>
                                    <li>
                                        <Link to="/blocks?type=uncles" className="dropdown-item">Uncles</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle">Tokens</Link>
                                <ul className="dropdown-menu dropdown-menu-border" style={{minWidth: "14rem"}}>
                                    <li>
                                        <Link to="/tokens" className="dropdown-item">View Tokens 
                                            <span className="small text-muted">(ERC-20)</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/tokens?type=transfers" className="dropdown-item">Token Holders 
                                            <span className="small text-muted">(ERC-20)</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle">NFTs</Link>
                                <ul className="dropdown-menu dropdown-menu-border" style={{minWidth: "14rem"}}>
                                    <li>
                                        <Link to="/nfts?type=top" className="dropdown-item">Top NFTs</Link>
                                    </li>
                                    <li>
                                        <Link to="/nfts?type=top-mints" className="dropdown-item">Top Mints</Link>
                                    </li>
                                    <li>
                                        <Link to="/nfts?type=latest-trades" className="dropdown-item">Latest Trades</Link>
                                    </li>
                                    <li>
                                        <Link to="/nfts?type=latest-transfers" className="dropdown-item">Latest Transfers</Link>
                                    </li>
                                    <li>
                                        <Link to="/nfts?type=latest-mints" className="dropdown-item">Latest Mints</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderMenu;