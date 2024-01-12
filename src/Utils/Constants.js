export const Option1LineDefault = {
    title: 'BTC',
    lineColor: '#00c1ff',
    lineWidth: 2,
    topColor: '#00c1ff',
    bottomColor: 'transparent',
}
export const Option2LineDefault = {
    lineColor: '#ff00f4',
    priceScaleId: 'left',
    lineWidth: 2
}
export function OptionLineColorEdit (status_color, title) {
    return {
        title: title,
        color: status_color,
        priceScaleId: 'left',
        lineWidth: 4,
        lineStyle:1
    }

}
export const ColorStatusFearGeed = {
    "Extreme Fear": '#00de00',
    "Fear": '#7ade00',
    "Neutral": '#dedb00',
    "Greed": '#de8700',
    "Extreme Greed": '#de0000',
    "Unknown":"#ffffff"
}