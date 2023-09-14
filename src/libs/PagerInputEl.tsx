import styled from "styled-components";
import { ChangeEvent, FC, memo, useCallback, useMemo } from "react";
import { useCheckCorrectNum } from "../hook/useCheckCorrectNum";
import { useSetInputPagerNumber } from "../hook/useSetInputPagerNumber";

type pagerInputElType = {
    lastPageNum: number;
    isInputTxt: string | number;
    setInputTxt: React.Dispatch<React.SetStateAction<string | number>>;
    setPageNum: (isPageNumEl: number) => void;
    PrevPage: (isPageNumEl: number) => string;
    NextPage: (isPageNumEl: number) => string;
}

export const PagerInputEl: FC<pagerInputElType> = memo((props) => {
    const { lastPageNum, isInputTxt, setInputTxt, setPageNum, PrevPage, NextPage } = props;

    /* 入力内容が数値かつ適正範囲内かどうか判定 */
    const { CheckCorrectNum } = useCheckCorrectNum();
    const checkCorrectNum = useCallback((el: ChangeEvent<HTMLInputElement>) => {
        CheckCorrectNum(el, lastPageNum);
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
        return document.querySelector('input[type="text"]');
    }, [isInputTxt]);

    return (
        <PagerInputElWrapper action="" onSubmit={
            (formEl: ChangeEvent<HTMLFormElement>) => {
                formEl.preventDefault();
                if (inputTxtEl && inputTxtEl.value.length > 0) {
                    setInputPagerNumber();
                    setInputTxt('');
                    ScrollTop();
                }
            }}>
            <label htmlFor="pagerInputTxt">
                <p>「ページ番号を入力」→「エンターキー押下」でページ移動<br />※ 数値以外は入力できません。</p>
                <input id="pagerInputTxt" type="text" value={isInputTxt}
                    onInput={
                        (el: ChangeEvent<HTMLInputElement>) => {
                            checkCorrectNum(el);

                            /* lastPageNum 以上の数値は入力不可 */
                            if (Number(el.target.value) <= lastPageNum) {
                                setInputTxt(el.target.value);
                            }
                        }
                    }
                    placeholder="移動したいページ番号を入力してください" />
                <input type="submit" value="移動" />
            </label>
        </PagerInputElWrapper>
    );
});

const PagerInputElWrapper = styled.form`
font-size: 14px;
margin: auto;

@media screen and (min-width: 700px) {
    width: clamp(160px, calc(100vw/2), 480px);
}

& label {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 2%;
    line-height: 1.6;
    cursor: default;
    margin: .5em auto;

    & p {
        width: 100%;
        margin-bottom: 1em;
    }

    & input {
        &[type="text"]{
            width: clamp(240px, 100%, 400px);
            text-align: left;
            border: 1px solid #969696;
            border-radius: 0;
            padding-left: 1em;
            line-height: 1.8;
            margin: .5em auto;
        }

        &[type="submit"]{
            width: clamp(80px, 100%, 400px);
            border: none;
            border-radius: 2px;
            line-height: 44px;
            letter-spacing: .25em;
            color: #fff;
            background-color: #969696;
        }

        @media screen and (min-width: 700px) {
            font-size: 16px;

            &[type="text"]{
                width: 78%;
                margin: 0;
            }

            &[type="submit"]{
                width: 20%;
            }
        }
    }
}
`;