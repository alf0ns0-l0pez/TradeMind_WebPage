import { useEffect, useState } from "react";
import "./TradeBody.css";
import { Option1LineDefault, OptionLineColorEdit, ColorStatusFearGeed } from "../Utils/Constants";
import TwoLineChart from '../Charts/TwoLineChart';
import StatusBar from "../StatusBar/StatusBar";
import CalendarChart from "../Charts/CalendarChart";
import DataSource from "./DataSource";
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
    const [heatCalendar, setHeatCalendar] = useState([]);
    
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
        const calendarData = data.map((row) => [new Date(row.dt_year, row.dt_month - 1, row.dt_day), row.fearandgreed_value]);
        setHeatCalendar([[
            { type: "date", id: "Date" },
            { type: "number", id: "Value" },
        ] , ...calendarData]);
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
                    About Bitcoin Halving
                </h3>
                <p>
                The halving event is automatically triggered by the Bitcoin network once 210,000 blocks have been 
                mined since the last halving. This count is embedded within the Bitcoin protocol and can not be 
                changed without forking the Bitcoin blockchain and creating a new cryptocurrency. 
                <br/>
                The next Bitcoin halving is expected on April 20, 2024 after block 740,000 has been mined. It will 
                reduce the block reward from 6.25 BTC to 3.125 BTC.
                <br/>
                Bitcoin halving directly impacts its supply by reducing the rate at which new coins are generated, 
                creating a scarcity effect. This scarcity can lead to increased demand if Bitcoin's adoption and 
                investor interest continue to grow. 
                <br/>
                In this page any enthusiast of Crypto Trading be able to visualize stats which count with axies 
                such as price in dollars, market cap, volume 24h, fear and greed value, fear and greed classification relating between them. 
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
            <CalendarChart data={heatCalendar}/>
            <DataSource/>
        </div>
    );
}