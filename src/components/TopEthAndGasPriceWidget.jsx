import { useEffect, useState } from "react";
import useAlchemy from "../hooks/useAlchemy";

const TopEthAndGasPriceWidget = () => {
    const alchemy = useAlchemy();
    const [gasPrice, setGasPrice] = useState(0);

    useEffect(() => {
        const getGasPrice = async () => {
            const newPrice = await alchemy.getCurrentGasFee();
            setGasPrice(newPrice);
        }
        if (gasPrice === 0) {
            getGasPrice();
        }
    }, [gasPrice]);

    return (
        <section id="masterTopBar" className="d-none d-lg-block sticky-top bg-white border-bottom py-1">
         <div className="container-xxl d-flex align-items-center justify-content-between">
            <div id="ethPrice" className="d-flex align-items-sm-center gap-4 w-100 fs-sm">
               <div className="text-muted">
                <span className="text-muted">ETH Price:&nbsp;</span> 
                        $1,866.24
                        {/* <span data-bs-toggle="tooltip" data-bs-placement="top">
                            <span className="text-danger"> (-0.49%)
                            </span>
                        </span> */}
                    </div>
               <div className="text-muted ">
                <i className="fad fa-gas-pump me-1"></i> Gas: 
                    <span id="spanGasTooltip" data-bs-toggle="tooltip" data-bs-html="true">
                        <span className="gasPricePlaceHolder">{gasPrice}</span> Gwei
                    </span>
                </div>
            </div>
         </div>
      </section>
    );
}


export default TopEthAndGasPriceWidget;