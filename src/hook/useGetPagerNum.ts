/* 入力内容が数値かつ適正範囲内かどうか判定（呼び出し先：PagerInputEl.tsx で useCallback 処理）*/

import { ChangeEvent } from "react";

export const useGetPagerNum = () => {
    const GetPagerNum = (
        element: ChangeEvent<HTMLInputElement>,
        lastPageNum: number,
        setInputTxt: (el: string) => void,
    ) => {
        if (parseInt(element.currentTarget.value)) {
            if (
                Number(element.currentTarget.value) <= 0 ||
                Number(element.currentTarget.value) > lastPageNum
            ) {
                alert(`こちらは全${lastPageNum}ページです。\n1 〜 ${lastPageNum} の間で数値を入力してください`);
            } else {
                setInputTxt(element.currentTarget.value);
            }
        }
    }

    return { GetPagerNum }
}