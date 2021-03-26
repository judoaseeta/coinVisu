import CoinList from '../../../assets/coinList';
import { isMatchedText } from '../utils';

export const mockResults = CoinList.filter( coin => isMatchedText(coin.symbol,'btc') || isMatchedText(coin.coinName,'btc'));
export const mockResultsUnder10 = CoinList.filter( coin => isMatchedText(coin.symbol,'moner') || isMatchedText(coin.coinName,'moner'));

