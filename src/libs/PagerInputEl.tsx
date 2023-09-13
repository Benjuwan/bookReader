import styled from "styled-components";
import { ChangeEvent, FC, memo, useCallback, useMemo } from "react";
import { useGetPagerNum } from "../hook/useGetPagerNum";
import { useSetInputPagerNumber } from "../hook/useSetInputPagerNumber";

type pagerInputElType = {
    lastPageNum: number;
    isInputTxt: string;
    setInputTxt: React.Dispatch<React.SetStateAction<string>>;
    setPageNum: (isPageNumEl: number) => void;
    PrevPage: (isPageNumEl: number) => string;
    NextPage: (isPageNumEl: number) => string;
}

export const PagerInputEl: FC<pagerInputElType> = memo((props) => {
    const { lastPageNum, isInputTxt, setInputTxt, setPageNum, PrevPage, NextPage } = props;

    /* 入力内容が数値かつ適正範囲内かどうか判定 */
    const { GetPagerNum } = useGetPagerNum();
    const getPagerNum = useCallback((el: ChangeEvent<HTMLInputElement>) => {
        GetPagerNum(el, lastPageNum, setInputTxt);
    }, [isInputTxt]);

    /* ページ数指定でページ移動 */
    const { SetInputPagerNumber } = useSetInputPagerNumber();
    const setInputPagerNumber = useCallback(() => {
        SetInputPagerNumber(isInputTxt, lastPageNum, setPageNum, PrevPage, NextPage);
    }, [isInputTxt]);

    /* スクロールトップ */
    const ScrollTop = () => {
        window.scrollTo(0, 0);
    }

    const inputTxtEl: HTMLInputElement | null = useMemo(() => {
        return document.querySelector('input[type="tel"]');
    }, [isInputTxt]);

    return (
        /** 
         * #pagerInputTxt の focusout でページャー処理を行いたかったが、onFocusOut が現状無い（onFocus はある）ので form の submit イベントで処理実行
        */
        <PagerInputElWrapper action="" onSubmit={
            (formEl: ChangeEvent<HTMLFormElement>) => {
                formEl.preventDefault();
                if (inputTxtEl && inputTxtEl.value.length > 0) {
                    setInputPagerNumber();
                    setInputTxt('');
                    ScrollTop();
                }
            }}>
            <label htmlFor="pagerInputTxt">「ページ番号を入力」→「エンターキー押下」でページ移動<br />※ 数値以外は入力できません。<input id="pagerInputTxt" type="tel" value={isInputTxt}
                onInput={
                    (el: ChangeEvent<HTMLInputElement>) => getPagerNum(el)
                }
                placeholder="移動したいページ番号を入力してください" />
            </label>
        </PagerInputElWrapper>
    );
});

const PagerInputElWrapper = styled.form`
font-size: 14px;

& label {
    display: block;
    line-height: 1.6;
    cursor: default;
    margin: .5em auto;

    & input[type="tel"] {
        display: block;
        border: 1px solid #969696;
        border-radius: 0;
        padding-left: 1em;
        line-height: 1.8;
        width: clamp(320px, calc(100vw / 3), 640px);
        margin: .5em auto 0;

        @media screen and (min-width: 700px) {
            font-size: 16px;
        }
    }
}
`;