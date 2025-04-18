/* ページ数指定でページ移動（呼び出し先：PagerInputEl.tsx で useCallback 処理）*/

import { usePagination } from "./usePagination";

export const useSetInputPagerNumber = () => {
    const { PrevPage, NextPage } = usePagination();

    const _setPageNumImgSrc = (
        isInputTxt: string | number,
        setPageNum: (isPageNumEl: number) => void,
        setPageAction: (isPageNumEl: number) => string,
        imgEl: HTMLImageElement
    ) => {
        if (Number(isInputTxt) % 2 === 0) {
            setPageNum(Number(isInputTxt));
            imgEl.setAttribute('src', setPageAction(Number(isInputTxt)));
        } else {
            setPageNum(Number(isInputTxt) - 1);
            imgEl.setAttribute('src', setPageAction(Number(isInputTxt) - 1));
        }
    }

    const SetInputPagerNumber = (
        isInputTxt: string | number,
        lastPageNum: number,
        setPageNum: (isPageNumEl: number) => void
    ) => {
        const multiPageWrapperEl: HTMLDivElement | null = document.querySelector('.useSetInputPagerNumber_multiPageWrapper');

        const imgEls: NodeListOf<HTMLImageElement> | undefined = multiPageWrapperEl?.querySelectorAll('img');

        imgEls?.forEach(imgEl => {
            /* スマートフォンでの閲覧：1ページver */
            if (multiPageWrapperEl?.querySelector('.useSetInputPagerNumber_singlePageImg')) {
                setPageNum(Number(isInputTxt));
                imgEl.setAttribute('src', PrevPage(Number(isInputTxt)));
            }

            /* タブレット・PCでの閲覧：両開き仕様ver */
            else {
                /* 最後のページでの処理は PrevPage */
                if (Number(isInputTxt) === lastPageNum) {
                    _setPageNumImgSrc(isInputTxt, setPageNum, PrevPage, imgEl);
                }

                /* 最初のページでの処理は NextPage */
                else if (Number(isInputTxt) === 1) {
                    _setPageNumImgSrc(isInputTxt, setPageNum, NextPage, imgEl);
                }

                /* 両開き（複数）ページではページ別の処理を指定（prevPage：左ページ）*/
                else {
                    if (imgEl.classList.contains('useSetInputPagerNumber_prevPage')) {
                        _setPageNumImgSrc(isInputTxt, setPageNum, PrevPage, imgEl);
                    } else {
                        _setPageNumImgSrc(isInputTxt, setPageNum, NextPage, imgEl);
                    }
                }
            }
        });
    }

    return { SetInputPagerNumber }
}