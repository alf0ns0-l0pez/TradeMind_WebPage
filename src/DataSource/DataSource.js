import "./DataSource.css"
export default function DataSource(){
    return(
        <div id='datasource'>
            <h3 >💾Data Source.</h3>
            <p>This project collect hourly data from two the most important 
                crypto web sides such as <a href="https://www.coinmarketcap.com" target="_blank" rel="noreferrer">
                Coinmarketcap.com</a> providing of price, volume, and marketcap about bitcoin, on the other 
                hand the second but no less important value that we collect is Fear & Greed Index 
                from  <a href="https://alternative.me/crypto/fear-and-greed-index/" target="_blank" rel="noreferrer">
                Alternative.me</a>.<br/>
                The crypto market behaviour is very emotional. People tend to get greedy when the 
                market is rising which results in FOMO (Fear of missing out). Also, people often sell 
                their coins in irrational reaction of seeing red numbers. With our Fear and Greed Index, 
                we try to save you from your own emotional overreactions. There are two simple assumptions:
                </p>
            <ul>
            <li>
                <p><q style={{color:'red'}}>Extreme fear</q> can be a sign that investors are 
                too worried. That could be a <q style={{color:'green'}}>buying opportunity</q>.</p>
            </li>
            <li>
                <p>When Investors are getting <q style={{color:'green'}}>too greedy</q>, that means 
                the market is <q style={{color:'red'}}>due for a correction</q>.</p>
            </li>
            </ul>
            <section>
                <img src=".\images\alternative.png" height="50px" alt="alternative.png"/>
                <img src=".\images\coinmarketcap.png" height="50px" alt="coinmarketcap.png"/>
            </section>
        </div>
    );
}