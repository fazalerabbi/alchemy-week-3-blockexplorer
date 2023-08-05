import { useEffect, useState } from "react";
import useAlchemy from "../hooks/useAlchemy";
import { Link } from "react-router-dom";

const Blocks = () => {
    const alchemy = useAlchemy();
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const getBlocks = async () => {
            const newBlocks = await alchemy.getLatestBlocks();
            setBlocks(newBlocks);
        }

        if (blocks.length === 0) {
            getBlocks();
        }

    }, [blocks]);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-header-title">Latest Blocks</h2>
                </div>
                <div className="card-body overflow-auto scrollbar-custom" style={{maxHeight: "30.3rem"}}>
                    {
                        blocks && blocks.map((block) => {
                            return (
                                <>
                                    <div className="row" key={`row_${block.number}`}>
                                        <div className="col-sm-4">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="d-none d-sm-flex content-center bg-light text-muted rounded p-3" style={{height: "3rem", width: "3rem"}}>
                                                    <i className="fa fa-cube fa-lg"></i>
                                                </div>
                                                <div className="d-flex flex-row flex-sm-column align-items-center align-items-sm-start gap-1 gap-sm-0">
                                                    <span className="d-inline-block d-sm-none">Block</span>
                                                    <Link className="text-truncate" style={{maxWidth: "6rem"}} to={`/blocks/${block.number}`}>{block.number}</Link>
                                                    <div className="small text-muted"> 11 secs ago</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-8 d-flex justify-content-sm-between align-items-end align-items-sm-center position-relative">
                                            <div className="pe-0 pe-sm-2">
                                                <div className="d-flex flex-wrap gap-1">Fee Recipient 
                                                    <Link className="text-truncate d-block" style={{maxWidth: "8rem"}} to={`/address/${block.miner}`}>{block.miner}</Link>
                                                </div>
                                                <Link className="text-truncate d-block" style={{maxWidth: "8rem"}} to={`/transactions?block=${block.number}`}>{block.transactions.length}&nbsp;txns</Link>
                                            </div>
                                            <div class="d-none d-sm-block text-end ms-2 ms-sm-0">
                                                <span class="badge border border-dark dark:border-white border-opacity-15 text-dark fw-medium py-1.5 px-2">
                                                    <b>Gas used: </b>{block.gasUsed} Gwei
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr key={`hr_${block.number}`}/>
                                </>
                            );
                        })
                    }       
                </div>
                <a className="card-footer bg-light fw-medium text-cap link-muted text-center" href="https://etherscan.io/blocks">
                View all blocks <i className="far fa-long-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    );
}

export default Blocks;