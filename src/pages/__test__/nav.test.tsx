import React from 'react';
import { Route } from 'react-router-dom';
import Search from '../search';
import Nav from '../nav';
import { 
    act,
    render,
    mockInitialState,
    fireEvent,
    userEvent,
} from '../../utils/richTest';

describe('Testing Page <Nav />', () => {
    it('logo should appear in default route"/" ', () => {
        const { container } = render(<Nav />, {
            initialState: mockInitialState,
        });
        // main logo should be appeared
        const logo = container.querySelector('.logo');
        expect(logo).toBeInTheDocument();
        expect(logo?.classList.contains('off')).toBe(false);
    });
    it('typing on serachInput', () => {
        const { container,getByText,debug } = render(
        <>
            <Route 
                path="/"
                component={Nav}
            />
            <Route 
                path="/search"
                component={Search}
            />
        </>
        , {
            initialState: mockInitialState,
        });
        // main logo should be appeared
        const searchInput = container.querySelector('.searchInput');
        expect(searchInput).toBeInTheDocument();
        
        // when typing on search input
        const mockKeyword = 'btc'
        fireEvent.change(searchInput!, { target: { value: mockKeyword}});
        // input value should be changed.
        expect(searchInput?.getAttribute('value')).toEqual(mockKeyword);
        // 10 searchItem should be rendered.
        // the number of total result of 'btc' is over 10
        const searchItems = container.getElementsByClassName('searchResultItem');
        expect(searchItems.length).toEqual(10);
        // seeMore should be rendered and has textcontent 
        const seeMore = getByText(/검색된 46개의 암호화폐가 더 있습니다!/);
        expect(seeMore).toBeInTheDocument();
        expect(seeMore.getAttribute('href')).toEqual('/search');
        // when click seeMore, should navigate to /search
        userEvent.click(seeMore!,{ button: 0});
        const extendedSearchList = container.querySelector('.searchList');
        expect(extendedSearchList).toBeInTheDocument();
        // search page should render all of searched items
        expect(extendedSearchList?.getElementsByClassName('searchResultItem').length).toEqual(56);
    });
});