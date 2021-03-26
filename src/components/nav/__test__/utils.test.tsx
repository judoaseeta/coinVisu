import { render } from '@testing-library/react';
import {
    isMatchedText,
    highlightMatchedText
} from '../utils';

describe('Testing <Nav /> related utils', () => {
    it('isMatchedText', () => {
        // when keyword: 'bit', text: 'BitCoin';
        const resultWithExactKeyword = isMatchedText('BitCoin','bit');
        expect(resultWithExactKeyword).toBe(true);
        // non exact keyword: 'etx', text: 'Vertex';
        const resultWithSomeDiffer = isMatchedText('Vertex', 'etx');
        expect(resultWithSomeDiffer).toBe(false);
    });
    it('highlightMatchedText if matched', () => {
        const Highlighted = highlightMatchedText('Etheriumher','her','highlighted');
        const { container, getByTestId } = render(<div data-testid="text">{Highlighted}</div>);
        const wholeText = getByTestId('text');
        // should return 
        expect(wholeText.textContent).toEqual('Etheriumher')
        const spanHighlighted = container.getElementsByClassName('highlighted');
        // should return 1 highlighted span 
        // whose text content is equal to keyword;
        expect(spanHighlighted.length).toEqual(1);
        expect(spanHighlighted[0].textContent).toEqual('her');
    });
    it('highlightMatchedText if not matched', () => {
        const Highlighted = highlightMatchedText('ADA','SPC','highlighted');
        const { container, getByTestId } = render(<div data-testid="text">{Highlighted}</div>);
        const wholeText = getByTestId('text');
        // should return original text
        expect(wholeText.textContent).toEqual('ADA');
        // no highlighted span
        const spanHighlighted = container.getElementsByClassName('highlighted');
        expect(spanHighlighted.length).toEqual(0);
    });
});