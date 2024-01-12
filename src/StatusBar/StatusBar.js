import "./StatusBar.css"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SavingsIcon from '@mui/icons-material/Savings';
import SellIcon from '@mui/icons-material/Sell';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Chip from '@mui/material/Chip';

export default function StatusBar(props) {
	const { bitcoinPrice, fearGreedValue, fearGreedClass, rowNo } = props;
	return (
		<div id="status_bar">
			<ul >
			<li >
					{
						{
							"Extreme Fear": <Chip icon={<CreditScoreIcon />} color="success" label="BUY NOW" variant="filled" />,
							"Fear": <Chip icon={<CreditScoreIcon />} color="success" label="PREPARE TO BUY" variant="filled" />,
							"Normal":<Chip icon={<SavingsIcon />} color="success" label="HOLD ON" variant="filled" />,
							"Greed":<Chip icon={<SellIcon />} color="warning" label="PREPARE TO SELL" variant="filled" />,
							"Extreme Greed":<Chip icon={<SellIcon />} color="success" label="SELL NOW" variant="filled" />
						}[fearGreedClass]
					}

				</li>
				<li >
					{
						{
							"Extreme Greed":<Chip icon={<TrendingUpIcon />} color="success" label="Extreme Up" variant="filled" />,
							"Greed":<Chip icon={<TrendingUpIcon />} color="success" label="Trending Up" variant="filled" />,
							"Normal":<Chip icon={<TrendingFlatIcon />} color="success" label="Trending Flat" variant="filled" />,
							"Fear":<Chip icon={<TrendingDownIcon />} color="error" label="Trending Down" variant="filled" />,
							"Extreme Fear":<Chip icon={<TrendingDownIcon />} color="error" label="Extreme Down" variant="filled" />
						}[fearGreedClass]
					}
				</li>
				<li >
					<Chip icon={<CurrencyBitcoinIcon />} color="secondary" label={`Bitcoin: ${bitcoinPrice.toFixed(2)}`} variant="filled" />
				</li>
				<li >
					<Chip icon={<SentimentVeryDissatisfiedIcon />} color="info" label={`Fear & Greed: ${fearGreedValue}`} variant="filled" />
				</li>

				<li >
					<Chip icon={<TableRowsIcon />} color="info" label={`Row Number: ${rowNo}`} variant="filled" />
				</li>
			</ul>
		</div>
	);

}