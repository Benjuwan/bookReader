import { FC, memo, useLayoutEffect, useState } from "react";
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

    /**
     * SinglePage.tsx（スマートフォン用のコンポーネント）は 1ページ表示仕様なのでページ送り用の button 要素を2つ用意して画像の半々で分割しているので他のページとは異なる処理方法（*1）になっている。
     * *1：ページ画像のStateを用意したり、ページ画像に直接アニメーションclass を付与したり
    */

    /* useLayoutEffect でレンダリング前に要素（targetImgEl：.singlePageImg）を認知させておくことで最初のページにも class付与（ページめくり）の処理を反映 */
    const [isImgEl, setImgEl] = useState<HTMLImageElement | null>(null);
    useLayoutEffect(() => {
        const targetImgEl: HTMLImageElement | null = document.querySelector('.singlePageImg');
        setImgEl(targetImgEl);
    }, [isPageNum]);


    return (
        <SinglePageWrapper>
            {/* 前ページボタン（verticalWritingMode true の場合は 次ページボタン）*/}
            <button type="button" className="prevSide" onClick={() => {
                /* 三項演算子 or AND/OR演算子で複数行処理を行いたい場合は、フラグメントを使うとともにそれぞれの処理を {} で囲ってやる */
                verticalWritingMode ?
                    isPageNum < lastPageNum &&
                    <>
                        {isImgEl && ToggleClass(isImgEl, 'paginatePrev')}
                        {setTimeout(() => thePostsPagination(1), pagerSpeed)}
                    </> :
                    isPageNum > 1 &&
                    <>
                        {isImgEl && ToggleClass(isImgEl, 'paginatePrev')}
                        {setTimeout(() => thePostsPagination(-1), pagerSpeed)}
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

            {/* 次ページボタン（verticalWritingMode true の場合は 前ページボタン）*/}
            <button type="button" className="nextSide" onClick={() => {
                verticalWritingMode ?
                    isPageNum > 1 &&
                    <>
                        {isImgEl && ToggleClass(isImgEl, 'paginateNext')}
                        {setTimeout(() => thePostsPagination(-1), pagerSpeed)}
                    </> :
                    isPageNum < lastPageNum &&
                    <>
                        {isImgEl && ToggleClass(isImgEl, 'paginateNext')}
                        {setTimeout(() => thePostsPagination(1), pagerSpeed)}
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
    width: 50%!important;
    height: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    &:hover{
        background-color: rgba(0,0,0,.015);
    }
}
& .prevSide {
    left: 0;
}
& .nextSide {
    right: 0;
}

& .singlePageImg {
    transform: rotateY(0deg);
    object-fit: unset;
    height: auto;

    &.paginateNext {
        transform-origin: left center;
        animation: paginateNext .25s linear;

        @keyframes paginateNext {
            0%{
                transform: rotateY(-8deg);
                filter: brightness(1);
            }

            25%{
                transform: rotateY(-28deg);
                filter: brightness(1);
            }

            50%{
                transform: rotateY(-48deg);
                filter: brightness(1);
            }

            75%{
                transform: rotateY(-68deg);
                filter: brightness(.5);
            }

            100%{
                transform: rotateY(-88deg);
                filter: brightness(.25);
            }
        }
    }

    &.paginatePrev {
        transform-origin: right center;
        animation: paginatePrev .25s linear;

        @keyframes paginatePrev {
            0%{
                transform: rotateY(8deg);
                filter: brightness(1);
            }

            25%{
                transform: rotateY(28deg);
                filter: brightness(1);
            }

            50%{
                transform: rotateY(48deg);
                filter: brightness(1);
            }

            75%{
                transform: rotateY(68deg);
                filter: brightness(.5);
            }

            100%{
                transform: rotateY(88deg);
                filter: brightness(.25);
            }
        }
    }
}
`;