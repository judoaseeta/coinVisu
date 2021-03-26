import { RawCoinInfo } from '../../entities/cryptoData';
import { RawResponseHistoData } from '../../api/index';
export const mockHistoDatasFor6: RawResponseHistoData = { "Response":"Success","Message":"","HasWarning":false,"Type":100,"RateLimit":{},"Data":{"Aggregated":false,"TimeFrom":1614729600,"TimeTo":1615248000,"Data":[{"time":1614729600,"high":52625.39,"low":48176.64,"open":48501.21,"volumefrom":51572.27,"volumeto":2615513552.66,"close":50392.55,"conversionType":"direct","conversionSymbol":""},{"time":1614816000,"high":51792.65,"low":47516.91,"open":50392.55,"volumefrom":61387.71,"volumeto":3024053725.58,"close":48363.74,"conversionType":"direct","conversionSymbol":""},{"time":1614902400,"high":49467.19,"low":46311.43,"open":48363.74,"volumefrom":60955.82,"volumeto":2907395734.68,"close":48775.37,"conversionType":"direct","conversionSymbol":""},{"time":1614988800,"high":49185.32,"low":47099.07,"open":48775.37,"volumefrom":25116.42,"volumeto":1214194643.85,"close":48892.8,"conversionType":"direct","conversionSymbol":""},{"time":1615075200,"high":51455.54,"low":48892.8,"open":48892.8,"volumefrom":32958.26,"volumeto":1658558074.88,"close":50964.18,"conversionType":"direct","conversionSymbol":""},{"time":1615161600,"high":52408.08,"low":49341.09,"open":50964.18,"volumefrom":48084.28,"volumeto":2445827949.75,"close":52405.02,"conversionType":"direct","conversionSymbol":""},{"time":1615248000,"high":54480.38,"low":51888.98,"open":52405.02,"volumefrom":29147.45,"volumeto":1562907728.7,"close":54178.23,"conversionType":"direct","conversionSymbol":""}]}};

export const mockCoinInfo: RawCoinInfo = {"CoinInfo":{"Id":"1182","Name":"BTC","FullName":"Bitcoin","Internal":"BTC","ImageUrl":"/media/37746251/btc.png","Url":"/coins/btc/overview","Algorithm":"SHA-256","ProofType":"PoW","Rating":{"Weiss":{"Rating":"B+","TechnologyAdoptionRating":"A-","MarketPerformanceRating":"B"}},"NetHashesPerSecond":155870814787270380000,"BlockNumber":673851,"BlockTime":579.731,"BlockReward":6.25,"AssetLaunchDate":"2009-01-03","MaxSupply":20999999.9769,"Type":1,"DocumentType":"Webpagecoinp"},"DISPLAY":{"USD":{"FROMSYMBOL":"Ƀ","TOSYMBOL":"$","MARKET":"CryptoCompare Index","PRICE":"$ 54,126.9","LASTUPDATE":"Just now","LASTVOLUME":"Ƀ 0.001790","LASTVOLUMETO":"$ 96.82","LASTTRADEID":"1615290600.2202","VOLUMEDAY":"Ƀ 30,065.4","VOLUMEDAYTO":"$ 1,612,626,309.6","VOLUME24HOUR":"Ƀ 55,581.1","VOLUME24HOURTO":"$ 2,919,074,867.5","OPENDAY":"$ 52,405.1","HIGHDAY":"$ 54,480.4","LOWDAY":"$ 51,889.0","OPEN24HOUR":"$ 50,500.6","HIGH24HOUR":"$ 54,487.4","LOW24HOUR":"$ 50,150.4","LASTMARKET":"Kraken","VOLUMEHOUR":"Ƀ 809.25","VOLUMEHOURTO":"$ 43,824,866.8","OPENHOUR":"$ 54,178.1","HIGHHOUR":"$ 54,316.7","LOWHOUR":"$ 53,966.2","TOPTIERVOLUME24HOUR":"Ƀ 55,581.1","TOPTIERVOLUME24HOURTO":"$ 2,919,074,867.5","CHANGE24HOUR":"$ 3,626.24","CHANGEPCT24HOUR":"7.18","CHANGEDAY":"$ 1,721.78","CHANGEPCTDAY":"3.29","CHANGEHOUR":"$ -51.21","CHANGEPCTHOUR":"-0.09","CONVERSIONTYPE":"direct","CONVERSIONSYMBOL":"","SUPPLY":"Ƀ 18,649,075.0","MKTCAP":"$ 1,009.42 B","MKTCAPPENALTY":"0 %","TOTALVOLUME24H":"Ƀ 291.40 K","TOTALVOLUME24HTO":"$ 15.68 B","TOTALTOPTIERVOLUME24H":"Ƀ 290.94 K","TOTALTOPTIERVOLUME24HTO":"$ 15.66 B","IMAGEURL":"/media/37746251/btc.png"}}};