import React from 'react';
import { 
    render,
    fireEvent,
} from '@testing-library/react';
// components
import PageSelector from '../';

test('<PageSelector /> should render 10pages and be clickable', () => {
    const mockOnPage = jest.fn();
    const { rerender, container } = render(
        <PageSelector 
            onPage={mockOnPage}
            currentPage={1}
        />
    );
    // the number of page items should be 10.
    const pages = container.getElementsByClassName('page');
    expect(pages.length).toEqual(10);
    // currentPage prop is 1, so the first page item should have class 'selected'
    const firstPageItem = pages[0];
    expect(firstPageItem.classList.contains('selected')).toBe(true);

    // rerender change current page to 7;
    rerender(<PageSelector currentPage={7} onPage={mockOnPage} />);
    expect(firstPageItem.classList.contains('selected')).toBe(false);
    const seventhPageItem = pages[6];
    expect(seventhPageItem.classList.contains('selected')).toBe(true);
    // when click the tenth page item;
    const tenthPageItem = pages[9];
    fireEvent.click(tenthPageItem);
    // mock function should get number 10
    expect(mockOnPage.mock.calls[0][0]).toEqual(10);
});