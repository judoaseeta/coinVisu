import React from 'react';
export const isMatchedText =  (text: string, keyword: string)  => {
    const regex = new RegExp(`${keyword.toLocaleLowerCase()}`,"gi");
    return regex.test(text)
}
export const highlightMatchedText = (text: string, keyword: string, hightlightClass: string) => {
    const regex = new RegExp(`${keyword.toLocaleLowerCase()}`,"gi");
    const result = regex.exec(text);
    if(result !== null) {
        return <>
            {text.slice(0, result.index)}
            <span
                className={hightlightClass}
            >
                {keyword}
            </span>
            {text.slice(result.index + keyword.length)}
        </>;
    } else {
        return text;
    }
}