type ConsonantType = 'main' | 'obj';
export function symbolWithConsonant(symbol:string, type: ConsonantType) {
    // main consonant '이' or '가'
    // obj consonant '을' or '를'
    const 이을regex = new RegExp(/[lmnr]$/,"i");
    if(type === 'main') {
        return 이을regex.test(symbol) ? `${symbol}이` : `${symbol}가`;
    } else {
        return 이을regex.test(symbol) ? `${symbol}을` : `${symbol}를`;
    }
}