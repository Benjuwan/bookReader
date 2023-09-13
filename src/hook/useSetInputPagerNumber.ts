/* ページ数指定でページ移動（呼び出し先：PagerInputEl.tsx で useCallback 処理）*/

export const useSetInputPagerNumber = () => {
    const _setPageNumImgSrc = (
        isInputTxt: string,
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
        isInputTxt: string,
        lastPageNum: number,
        setPageNum: (isPageNumEl: number) => void,
        PrevPage: (isPageNumEl: number) => string,
        NextPage: (isPageNumEl: number) => string,
    ) => {
        const multiPageWrapperEl: HTMLDivElement | null = document.querySelector('.multiPageWrapper');
        const imgEls: NodeListOf<HTMLImageElement> | undefined = multiPageWrapperEl?.querySelectorAll('.imgEls');

        imgEls?.forEach(imgEl => {
            /* 最後のページでの処理は PrevPage（ページ番号に +1 を行わない）*/
            if (Number(isInputTxt) === lastPageNum) {
                _setPageNumImgSrc(isInputTxt, setPageNum, PrevPage, imgEl);
            }

            /* 最初のページでの処理は NextPage（ページ番号に +1 を行う：現状 00.jpg は 404エラーなので → 01.jpg に）*/
            else if (Number(isInputTxt) === 1) {
                _setPageNumImgSrc(isInputTxt, setPageNum, NextPage, imgEl);
            }

            /* 両開き（複数）ページではページ別の処理を指定（prevPage：左ページ）*/
            else {
                if (imgEl.classList.contains('prevPage')) {
                    _setPageNumImgSrc(isInputTxt, setPageNum, PrevPage, imgEl);
                } else {
                    _setPageNumImgSrc(isInputTxt, setPageNum, NextPage, imgEl);
                }
            }
        });
    }

    return { SetInputPagerNumber }
}