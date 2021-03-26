import React from 'react';
import { 
    Router 
} from 'react-router-dom';
import {
    createMemoryHistory
} from 'history';
import {
    fireEvent,
    render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// component
import Nav from '../index';
// mocks
import {
    mockResults
} from '../mocks';

describe('<Nav/>', () => {
    let mockFocus: jest.Mock;
    let mockKeyDown: jest.Mock;
    let mockOnChange: jest.Mock;
    beforeEach(() => {
        mockFocus = jest.fn();
        mockKeyDown = jest.fn();
        mockOnChange = jest.fn();
    });
    it('10개 이상의 검색결과가 있는 경우', async () => {
        const history = createMemoryHistory();
        const { container  } = render(
        <Router
            history={history}
        >
            <Nav 
                on={true}
                results={mockResults}
                searchKeyword={'btc'}
                totalResultsLength={mockResults.length}
                onChange={mockOnChange}
                onKeyDown={mockKeyDown}
                onFocus={mockFocus}
            />
        </Router>
        );
        // results with keyword 'btc' are more than 10 items.
        // so, 10 searchResultItem should be rendered.
        expect(container.getElementsByClassName('searchResultItem').length).toEqual(10);
        const seeMore = container.querySelector('.seeMore');
        expect(seeMore).toBeInTheDocument();
        // when keydown on search form
        const form = container.querySelector('.search');
        fireEvent.keyDown(form!,{ key: 'Tab', code: 'Tab'});
        expect(mockKeyDown).toHaveBeenCalled();
    });
});
