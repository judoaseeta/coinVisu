import { symbolWithConsonant } from '../consonant';

test('Testing symbolWithConsonant', () => {
    
    const mainSymbol1 = 'EDA';
    const mainSymbol2 = 'SDL';
    // 심볼1은 A로 끝나므로 주격조사 가
    // 심볼2는 L로 끝나므로 주격조사 이
    expect(symbolWithConsonant(mainSymbol1, 'main')).toEqual('EDA가');
    expect(symbolWithConsonant(mainSymbol2,'main')).toEqual('SDL이');

    const objSymbol1 = 'BTC';
    const objSymbol2 = 'PXR';
    // 심볼1은 C로 끝나므로 목적격조사 를
    // 심볼2는 R로 끝나므로 목적격조사 을
    expect(symbolWithConsonant(objSymbol1,'obj')).toEqual('BTC를');
    expect(symbolWithConsonant(objSymbol2,'obj')).toEqual('PXR을');
});