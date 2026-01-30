/* 入力内容が数値かつ適正範囲内かどうか判定（呼び出し先：PagerInputEl.tsx で useCallback 処理）*/

import { SyntheticEvent } from "react";

export const useCheckCorrectNum = () => {
    const CheckCorrectNum = (
        element: SyntheticEvent<HTMLInputElement>,
        lastPageNum: number,
    ) => {
        /* parseInt：入力内容が数値かどうか判定 */
        if (parseInt(element.currentTarget.value)) {
            if (
                Number(element.currentTarget.value) <= 0 ||
                Number(element.currentTarget.value) > lastPageNum
            ) {
                alert(`こちらは全${lastPageNum}ページです。\n1 〜 ${lastPageNum} の間で数値を入力してください`);
            }
            /**
             *【備忘録】
             * 当初、ここに setInputTxt(element.target.value); という記述をしていたが文字をデリートする過程で残り1文字になると、if条件の内容（Number(element.target.value) <= 0）と矛盾が起きてしまうので先頭1文字だけがデリートできない状態になっていた。→ イベント発生対象の input の onInput イベントに setInputTxt を記述することで解決
            */
        }
    }

    return { CheckCorrectNum }
}