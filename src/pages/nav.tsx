import React, { 
    useEffect,
    useState 
} from 'react';
import { 
    withRouter,
    RouteComponentProps 
} from 'react-router-dom';
// components
import NavComponent from '../components/nav';

// hooks
import useCoinList from '../hooks/useCoinList';
import useSearch from '../hooks/useSearch';

type NavPageProps = RouteComponentProps;
const Nav:React.FC<NavPageProps> = ({
    location,
    match,
}) => {
    const searchArgs = useSearch();


    //
    const [logoOff, setLogoOff ] = useState(false);
    
    const {
        searchKeyword, 
        onSearch, 
        selectedCoinList,
    } = useCoinList();
    // detect location 
    // on and off logo by location 
    useEffect(() => {
        if(location.pathname.includes('currency') || location.pathname.includes('search')) {
            setLogoOff(true);
        } else {
            setLogoOff(false);
        }
    },[location.pathname]);
    return (
        <NavComponent
            {...searchArgs}
            searchKeyword={searchKeyword}
            onChange={onSearch}
            results={selectedCoinList}
            totalResultsLength={selectedCoinList.length}
            isLogoOff={logoOff}
        />
    )
}
export default withRouter(Nav);
