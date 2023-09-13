import { FC, memo } from 'react';

type pageProps = {
    verticalWritingMode: boolean;
    pagerSpeed: number;
    isPageNum: number;
    documentTitle: string;
    PrevPage: (isPageNum: number) => string;
    NextPage: (isPageNum: number) => string;
    ToggleClass: (el: HTMLElement, className: string) => void;
    thePostsPagination: (page: number) => void;
}

export const MultiPages: FC<pageProps> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, documentTitle, PrevPage, NextPage, ToggleClass, thePostsPagination } = props;

    return (
        <>
            <img
                className={`imgEls multiPages ${verticalWritingMode ? 'nextPage' : 'prevPage'}`}
                src={verticalWritingMode ? NextPage(isPageNum) : PrevPage(isPageNum)}
                alt={`${documentTitle}の画像 - ${verticalWritingMode ? isPageNum + 1 : isPageNum}ページ目`}
                onClick={(elm) => {
                    ToggleClass(elm.currentTarget, 'paginatePrev');
                    setTimeout(() => {
                        {
                            verticalWritingMode ? thePostsPagination(2) : thePostsPagination(-2)
                        }
                    }, pagerSpeed);
                }} />
            <img
                className={`imgEls multiPages ${verticalWritingMode ? 'prevPage' : 'nextPage'}`}
                src={verticalWritingMode ? PrevPage(isPageNum) : NextPage(isPageNum)}
                alt={`${documentTitle}の画像 - ${verticalWritingMode ? isPageNum : isPageNum + 1}ページ目`}
                onClick={(elm) => {
                    ToggleClass(elm.currentTarget, 'paginateNext');
                    setTimeout(() => {
                        {
                            verticalWritingMode ? thePostsPagination(-2) : thePostsPagination(2)
                        }
                    }, pagerSpeed);
                }} />
        </>
    );
});