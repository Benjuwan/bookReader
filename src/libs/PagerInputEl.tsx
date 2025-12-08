import { ChangeEvent, FC, memo } from "react";
import { useCheckCorrectNum } from "../hook/useCheckCorrectNum";
import { useSetInputPagerNumber } from "../hook/useSetInputPagerNumber";

type pagerInputElType = {
    lastPageNum: number;
    isInputTxt: string | number;
    setInputTxt: React.Dispatch<React.SetStateAction<string | number>>;
    setPageNum: (isPageNumEl: number) => void;
};

export const PagerInputEl: FC<pagerInputElType> = memo((props) => {
    const { lastPageNum, isInputTxt, setInputTxt, setPageNum } = props;

    const { CheckCorrectNum } = useCheckCorrectNum();
    const { SetInputPagerNumber } = useSetInputPagerNumber();

    const handleInputEntry = (el: ChangeEvent<HTMLInputElement>) => {
        /* 入力内容が数値かつ適正範囲内かどうか判定 */
        CheckCorrectNum(el, lastPageNum);

        /* lastPageNum 以上の数値は入力不可 */
        if (Number(el.target.value) <= lastPageNum) {
            setInputTxt(el.target.value);
        }
    }

    /* ページ数指定でページ移動 */
    const setInputPagerNumber = () => {
        SetInputPagerNumber(isInputTxt, lastPageNum, setPageNum);
    }

    /* スクロールトップ */
    const ScrollTop = () => {
        window.scrollTo(0, 0);
    }

    const inputTxtEl: HTMLInputElement | null = document.querySelector('input[type="text"]');

    const submitAction: (formEl: ChangeEvent<HTMLFormElement>) => void = (formEl: ChangeEvent<HTMLFormElement>) => {
        formEl.preventDefault();
        if (inputTxtEl && inputTxtEl.value.length > 0) {
            setInputPagerNumber();
            setInputTxt('');
            ScrollTop();
        }
    }

    return (
        <form action="" className="my-0 mx-auto md:w-[clamp(160px,calc(100vw/2),480px)]" onSubmit={submitAction}>
            <label htmlFor="pagerInputTxt" className="flex flex-row flex-wrap justify-center gap-[2%] leading-[2em] my-[0.5em] mx-auto">
                <p className="w-full mb-[1em]">「ページ番号を入力」→<br />「エンターキー押下」でページ移動<br />※ 数値以外は入力できません。</p>
                <input id="pagerInputTxt" className="block w-[clamp(15rem,100%,25rem)] border border-[#969696] rounded-none pl-[1em] leading-[1.8] my-[0.5em] mx-auto md:w-[78%]" type="text" value={isInputTxt} onInput={handleInputEntry} placeholder="移動したいページ番号を入力してください" />
                <input
                    type="submit"
                    value="移動"
                    disabled={isInputTxt.toString().length === 0}
                    className="w-[clamp(5rem,100%,25rem)] border-none rounded-2 tracking-[0.25em] text-white bg-[#969696] rounded-none leading-[1.8] my-[0.5em] mx-0 not-disabled:cursor-pointer not-disabled:bg-[#1e2939] md:w-[20%]" />
            </label>
        </form>
    );
});