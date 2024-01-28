import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import './Charts.css'



export function options(cell_size, day_size, year_size, month_size, mobile) {
    return {
        colorAxis: {
            minValue: 0,
            maxValue: 100,
            colors: ['#ff0000', '#00ff00']
        },
        noDataPattern: {
            backgroundColor: '#000000',
            color: 'transparent'
        },
        calendar: {
            underYearSpace: 20, // Bottom padding for the year labels.
            yearLabel: {
                fontName: 'Times-Roman',
                fontSize: year_size,
                color: '#ffffff',
                bold: true,
            },
            dayOfWeekLabel: {
                fontName: 'Times-Roman',
                fontSize: day_size,
                color: '#ffffff',
                bold: true
            },
            monthLabel: {
                fontName: 'Times-Roman',
                fontSize: month_size,
                color: '#ffffff',
                bold: true
            },
            cellColor: {
                stroke: '#ffffff',
                strokeWidth: 0.5,
            },
            monthOutlineColor: {
                stroke: '#ff00f4',
                strokeWidth: mobile?2:5
            },
            unusedMonthOutlineColor: {
                stroke: '#00c1ff',
                strokeWidth: mobile?1:3
            },
            cellSize: cell_size
        }
    }
};

export default function CalendarChart(props) {
    const {data} = props;
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    return (
        <div id='defaul_chart'>
            <section>
                <h1>Heatcalendar - Fear and Gread Index</h1>
            </section>
            <div className='chart_box'>
                <div className='chart_box_in1'>
                    <div className='chart_box_calendar'>
                        <Chart
                            chartType="Calendar"
                            width="100%"
                            height={!isMobile?"370px":"140px"}
                            data={data}
                            options={!isMobile?options(18, 16, 40, 14, false):options(5, 8, 15, 8, true)}
                        />
                    </div>

                </div>


            </div>

        </div>

    );
}