import { FC, memo } from 'react';

type pageProps = {
    verticalWritingMode: boolean;
    pagerSpeed: number;
    isPageNum: number;
    lastPageNum: number;
    documentTitle: string;
    PrevPage: (isPageNum: number) => string;
    ToggleClass: (el: HTMLElement, className: string) => void;
    thePostsPagination: (page: number) => void;
}

export const FinalPage: FC<pageProps> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, lastPageNum, documentTitle, PrevPage, ToggleClass, thePostsPagination } = props;

    return (
        <button onClick={(elm) => {
            ToggleClass(elm.currentTarget, `${verticalWritingMode ? 'paginateNext' : 'paginatePrev'}`);
            setTimeout(() => { thePostsPagination(-2) }, pagerSpeed);
        }} >
            <img className="imgEls singlePage-final" src={PrevPage(lastPageNum)} alt={`${documentTitle}の画像 - ${isPageNum}ページ目`}
            />
        </button>
    );
});