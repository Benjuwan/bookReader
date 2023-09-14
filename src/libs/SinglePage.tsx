import { FC, memo, useLayoutEffect } from "react";
import styled from "styled-components";

type singlePageType = {
    verticalWritingMode: boolean;
    pagerSpeed: number;
    isPageNum: number;
    lastPageNum: number;
    documentTitle: string;
    firstPageImgSrc: string;
    PrevPage: (isPageNum: number) => string;
    ToggleClass: (el: HTMLElement, className: string) => void;
    thePostsPagination: (page: number) => void;
}

export const SinglePage: FC<singlePageType> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, lastPageNum, documentTitle, firstPageImgSrc, PrevPage, ToggleClass, thePostsPagination } = props;

    /* useLayoutEffect でレンダリング前に要素（targetImg：.singlePageImg）を認知させておくことで最初のページにも class付与（ページめくり）の処理を反映 */
    let targetImg: HTMLImageElement | null = null;
    useLayoutEffect(() => {
        targetImg = document.querySelector('.singlePageImg');
    }, [isPageNum]);

    return (
        <SinglePageWrapper>
            {/* 前ページボタン */}
            <button type="button" className="prevSide" onClick={() => {
                /* 三項演算子 or AND/OR演算子で複数行処理を行いたい場合は、フラグメントを使うとともにそれぞれの処理を {} で囲ってやる */
                isPageNum > 1 &&
                    <>
                        {verticalWritingMode ?
                            /* targetImg && ：このAND演算子が無いと targetImg が null だという警告が入る */
                            targetImg && ToggleClass(targetImg, 'paginateNext') : targetImg && ToggleClass(targetImg, 'paginatePrev')}
                        {setTimeout(() => {
                            verticalWritingMode ? thePostsPagination(1) : thePostsPagination(-1)
                        }, pagerSpeed)
                        }
                    </>
            }}>&nbsp;</button>

            {/* ページ画像 */}
            <img className="imgEls singlePageImg" src={
                isPageNum === 0 ?
                    firstPageImgSrc :
                    PrevPage(isPageNum)
            } alt={
                isPageNum === 0 ?
                    `${documentTitle}の画像 - ${isPageNum + 1}ページ目` :
                    `${documentTitle}の画像 - ${isPageNum}ページ目`
            } />

            {/* 次ページボタン */}
            <button type="button" className="nextSide" onClick={() => {
                isPageNum < lastPageNum &&
                    <>
                        {verticalWritingMode ? targetImg && ToggleClass(targetImg, 'paginatePrev') : targetImg && ToggleClass(targetImg, 'paginateNext')}
                        {setTimeout(() => {
                            verticalWritingMode ? thePostsPagination(-1) : thePostsPagination(1)
                        }, pagerSpeed)}
                    </>
            }}>&nbsp;</button>
        </SinglePageWrapper>
    );
});

const SinglePageWrapper = styled.div`
position: relative;

& .prevSide,
& .nextSide {
    appearance: none;
    border: none;
    border-radius: 0;
    background-color: transparent;
    width: 50%;
    height: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    &:hover{
        background-color: rgba(0,0,0,.025);
    }
}
& .prevSide {
    left: 0;
}
& .nextSide {
    right: 0;
}
`;