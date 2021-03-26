import { rest } from 'msw';
import {
    mockHistoDatasFor6,
    mockCoinInfo
} from './mockDatas';
const handlers = [
    // ?fsym=${fsym}&tsym=USD&limit=6
    rest.get('https://min-api.cryptocompare.com/data/v2/histoday',(req,res,ctx) => {
        const params = req.url.searchParams;
        let fsym = params.get('fsym');
        let limit = params.get('limit');
        if(fsym && limit && Number(limit) <= 6) {
            return res(ctx.json(mockHistoDatasFor6))
        }
    }),
    rest.get('https://min-api.cryptocompare.com/data/top/totalvolfull',async (req,res,ctx) => {
        let mockTop100coins = [];
        for(let i = 0; i< 100; i++) {
            mockTop100coins.push(mockCoinInfo);
        }
        const mockData = {
            Data: mockTop100coins
        };
        return res(
            ctx.json(mockData)
        );
    })
];


export const histoDataFailure = rest.get('https://min-api.cryptocompare.com/data/v2/histoday',(req,res,ctx) => {
    return res.networkError('eror');
});
export default handlers;

