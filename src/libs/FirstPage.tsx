import { FC, memo } from 'react';

type pageProps = {
    verticalWritingMode: boolean;
    pagerSpeed: number;
    isPageNum: number;
    firstPageImgSrc: string;
    documentTitle: string;
    ToggleClass: (el: HTMLElement, className: string) => void;
    thePostsPagination: (page: number) => void;
}

export const FirstPage: FC<pageProps> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, firstPageImgSrc, documentTitle, ToggleClass, thePostsPagination } = props;

    return (
        <>
            <img className="imgEls singlePage-first" src={firstPageImgSrc} alt={
                isPageNum === 0 ?
                    `${documentTitle}の画像 - ${isPageNum + 1}ページ目` :
                    `${documentTitle}の画像 - ${isPageNum}ページ目`
            } onClick={(elm) => {
                ToggleClass(elm.currentTarget, `${verticalWritingMode ? 'paginatePrev' : 'paginateNext'}`);
                {
                    isPageNum === 0 ?
                        setTimeout(() => { thePostsPagination(2) }, pagerSpeed) :
                        setTimeout(() => { thePostsPagination(1) }, pagerSpeed)
                }
            }} />
        </>
    );
});