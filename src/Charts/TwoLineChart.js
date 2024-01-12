
import './Charts.css'
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';


export const ChartComponent = props => {
	const { axis1, axis2, Options1, Options2 } = props;
	const chartContainerRef = useRef();
	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				rightPriceScale: { visible: true },
				leftPriceScale: { visible: true },
				layout: {
					background: { type: ColorType.VerticalGradient , color: 'transparent' },
					textColor: 'white',
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
				crosshair: { mode: 0 },
				timeScale: {
					timeVisible: true,
					secondsVisible: false
				}
			});
			chart.timeScale().fitContent();
			chart.addAreaSeries(Options1).setData(axis1);
			chart.addLineSeries(Options2).setData(axis2);
			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		},
		[axis1, axis2]
	);
	return (
		<div className='chart_box_in2'
			ref={chartContainerRef}
		/>
	);
};


export default function MarketCapVsFearGreed(props) {
	const { Title, Axis1, Axis2, Options1, Options2 } = props;
	return (
		<div id='defaul_chart'>
			<section>
				<h1>{Title}</h1>

			</section>
			<div className='chart_box'>
			<div className='chart_box_in1'>
			{
					!Axis1.length && !Axis2.length ?
						null :
						<ChartComponent axis1={Axis1} axis2={Axis2} Options1={Options1} Options2={Options2} ></ChartComponent>
				}
			</div>


			</div>

		</div>

	);
}