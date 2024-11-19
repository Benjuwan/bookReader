import { FC, memo } from 'react';
import { extendsType, imgSrcPath } from '../utils/imgSrcPath';

type pageProps = {
    verticalWritingMode: boolean;
    pagerSpeed: number;
    isPageNum: number;
    documentTitle: string;
    ToggleClass: (el: HTMLElement, className: string) => void;
    thePostsPagination: (page: number) => void;
}

export const FirstPage: FC<pageProps> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, documentTitle, ToggleClass, thePostsPagination } = props;

    return (
        <button onClick={(elm) => {
            ToggleClass(elm.currentTarget, `${verticalWritingMode ? 'paginatePrev' : 'paginateNext'}`);
            {
                isPageNum === 0 ?
                    setTimeout(() => { thePostsPagination(2) }, pagerSpeed) :
                    setTimeout(() => { thePostsPagination(1) }, pagerSpeed)
            }
        }} >
            <img className="imgEls singlePage-first" src={`${location.origin}${imgSrcPath}${isPageNum === 0 ? isPageNum + 1 : isPageNum}.${extendsType}`} alt={
                isPageNum === 0 ?
                    `${documentTitle}の画像 - ${isPageNum + 1}ページ目` :
                    `${documentTitle}の画像 - ${isPageNum}ページ目`
            }
            />
        </button>
    );
});