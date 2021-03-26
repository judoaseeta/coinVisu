import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import {
    ScaleBand,
    ScaleLinear
} from 'd3-scale';
import CandleChart from '../candleChart';

// entity
import { HistoData } from '../../../entities/cryptoData';
// utils && mocks
import { 
    getCandleYposStart,
    getCandleYposEnd,
} from '../utils';
import {
    mockDimensions,
    mockHistoData,
    xScale,
    yScale,
    mockHistoData50,
    yScale50,
    xScale50,
    mockHistoData100,
    xScale100,
    yScale100,
    mockHistoData157,
    xScale157,
    yScale157
} from '../mocks';

function testCandleAttributes(
    candles: Element[], 
    histoDatas:HistoData[],
    xScale: ScaleBand<Date>, 
    yScale: ScaleLinear<number,number>,
) {
    // candles length should equal to length of HistoData items
    expect(candles.length).toEqual(histoDatas.length);
    // every candle's width should be same as...
    const expectedItemWidth = xScale.bandwidth() * 0.7;
    candles.forEach( candle => 
        expect(candle.getAttribute('width')).toEqual(String(expectedItemWidth))
    );
    // every candle's y(pos y) and height should be equal to...
    candles.forEach( (candle,i) => {
        const yPosStart = getCandleYposStart(histoDatas[i]);
        const yPosEnd =getCandleYposEnd(histoDatas[i]);
        const expectedItemY = yScale(yPosStart);
        const height = yScale(yPosEnd) - yScale(yPosStart);
        expect(candle.getAttribute('y')).toEqual(String(expectedItemY));
        expect(candle.getAttribute('height')).toEqual(String(height));
    }); 
}
function testPanels(panels: Element[], mockHover: jest.Mock) {
    panels.forEach((panel,index) => {
        fireEvent.mouseEnter(panel);
        expect(mockHover.mock.calls[index][0]).toEqual(index);
    })
}






describe('<CandleChart />', () => {
    let mockOnPanelHover: jest.Mock;
    beforeEach(() => {
        mockOnPanelHover = jest.fn();
    })
    it('with 10 HistoDatas, should render candles by scale', () => {
        // given
        const { container } = render(
            <CandleChart 
                datas={mockHistoData}
                dimensions={mockDimensions}
                xScale={xScale}
                yScale={yScale}
                onPanelHover={mockOnPanelHover}
            />
        );
        const candles = Array.from(container.getElementsByClassName('candle'));
        testCandleAttributes(candles, mockHistoData, xScale, yScale);
        // testing panel's mouseEnter event handler
        const panels = Array.from(container.getElementsByClassName('panel'));
        testPanels(panels,mockOnPanelHover);
    });     
    it('with 50 HistoDatas, should render candles by scale', () => {
        // given
        const { container } = render(
            <CandleChart 
                datas={mockHistoData50}
                dimensions={mockDimensions}
                xScale={xScale50}
                yScale={yScale50}
                onPanelHover={mockOnPanelHover}
            />
        );
        const candles = Array.from(container.getElementsByClassName('candle'));
        testCandleAttributes(candles, mockHistoData50, xScale50, yScale50);
        // testing panel's mouseEnter event handler
        const panels = Array.from(container.getElementsByClassName('panel'));
        testPanels(panels,mockOnPanelHover);
    });    
    it('with 100 HistoDatas, should render candles by scale', () => {
        // given
        const { container } = render(
            <CandleChart 
                datas={mockHistoData100}
                dimensions={mockDimensions}
                xScale={xScale100}
                yScale={yScale100}
                onPanelHover={mockOnPanelHover}
            />
        );
        const candles = Array.from(container.getElementsByClassName('candle'));
        testCandleAttributes(candles, mockHistoData100, xScale100, yScale100);

        // testing panel's mouseEnter event handler
        const panels = Array.from(container.getElementsByClassName('panel'));
        testPanels(panels,mockOnPanelHover);

    });    
    it('with 157 HistoDatas, should render candles by scale', () => {
        // given
        const { container } = render(
            <CandleChart 
                datas={mockHistoData157}
                dimensions={mockDimensions}
                xScale={xScale157}
                yScale={yScale157}
                onPanelHover={mockOnPanelHover}
            />
        );
        const candles = Array.from(container.getElementsByClassName('candle'));
        testCandleAttributes(candles, mockHistoData157, xScale157, yScale157);
        // testing panel's mouseEnter event handler
        const panels = Array.from(container.getElementsByClassName('panel'));
        testPanels(panels,mockOnPanelHover);
    });     
});