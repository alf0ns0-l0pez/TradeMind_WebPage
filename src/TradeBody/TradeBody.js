import { useEffect, useState } from "react";
import "./TradeBody.css";
import { Option1LineDefault, OptionLineColorEdit, ColorStatusFearGeed } from "../Utils/Constants";
import TwoLineChart from '../Charts/TwoLineChart';
import StatusBar from "../StatusBar/StatusBar";
import io from "socket.io-client";

const socket = io.connect("85.31.225.160:2020");

export default function TradeBody() {
    const [bitcoin_price, setBitcoin_price] = useState([]);
    /*const [bitcoin_market_cap, setBitcoin_market_cap] = useState([]);*/
    const [bitcoin_volume_24h, setBitcoin_volume_24h] = useState([]);
    const [fearandgreed_value, setFearandgreed_value] = useState([]);
    const [last_fearandgreed_class, setLast_fearandgreed_class] = useState("Unknown");
    const [last_fearandgreed_value, setLast_fearandgreed_value] = useState(0);
    /*const [last_bitcoin_volume_24h, setLast_bitcoin_volume_24h] = useState(0);*/
    const [last_bitcoin_price, setLast_bitcoin_price] = useState(0);
    

    function createRow(year, month, day, hour, value) {
        return {
            time: new Date(
                year,
                month - 1,
                day,
                hour).getTime() / 1000,
            value: value
        }
    }
    const updateAllCharts = (data) => {

        setBitcoin_price(data.map((row) => createRow(row.dt_year, row.dt_month, row.dt_day, row.dt_hour, row.bitcoin_price)));
        /*setBitcoin_market_cap(data.map((row) => createRow(row.dt_year, row.dt_month, row.dt_day, row.dt_hour, row.bitcoin_market_cap)));*/
        setBitcoin_volume_24h(data.map((row) => createRow(row.dt_year, row.dt_month, row.dt_day, row.dt_hour, row.bitcoin_volume_24h)));
        setFearandgreed_value(data.map((row) => createRow(row.dt_year, row.dt_month, row.dt_day, row.dt_hour, row.fearandgreed_value)));
        setLast_fearandgreed_class(data[data.length - 1].fearandgreed_value_classification);
        /*setLast_bitcoin_volume_24h(data[data.length - 1].bitcoin_volume_24h);*/
        setLast_bitcoin_price(data[data.length - 1].bitcoin_price);
        setLast_fearandgreed_value(data[data.length - 1].fearandgreed_value);
    }
    console.log(last_fearandgreed_class)
    useEffect(() => {
        socket.on("receive_new_sampler", (data) => {
            updateAllCharts(data);
        });
        socket.on("init_body", (data) => {
            updateAllCharts(data);
        });
    }, [socket]);
    return (
        
        <div className="article">
            <StatusBar 
                bitcoinPrice={last_bitcoin_price} 
                fearGreedValue={last_fearandgreed_value} 
                fearGreedClass={last_fearandgreed_class}
                rowNo={bitcoin_price.length}/>
            <article id="about_bar">
                <h3>
                    About
                </h3>
                <p>
                In this page any enthusiast of Crypto Trading be able to visualize stats which count with axies such as price in dollars, market cap, volume 24h, fear and greed value, fear and greed classification relating between them. 
                </p>
            </article>
            <TwoLineChart
                Title="Dollar Bitcoin Price VS Fear and Geed Index."
                Axis1={bitcoin_price}
                Axis2={fearandgreed_value}
                Options1={Option1LineDefault}
                Options2={OptionLineColorEdit(ColorStatusFearGeed[last_fearandgreed_class], last_fearandgreed_class)} />

            <TwoLineChart
                Title="Dollar Bitcoin Price and Bitcoin Volumn 24H."
                Axis1={bitcoin_price}
                Axis2={bitcoin_volume_24h}
                Options1={Option1LineDefault}
                Options2={OptionLineColorEdit('#ff00f4', "Volumn 24h")}/>
        </div>
    );
}