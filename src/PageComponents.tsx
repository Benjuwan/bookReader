import styled from "styled-components";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import { FirstPage } from "./libs/FirstPage";
import { FinalPage } from "./libs/FinalPage";
import { MultiPages } from "./libs/MultiPages";
import { SinglePage } from "./libs/SinglePage";
import { PageNumberViewEl } from "./libs/PageNumberViewEl";
import { GetOtherFile } from "./libs/GetOtherFile";
import { LoadingEl } from "./libs/LoadingEl";
import { usePagination } from "./hook/usePagination";
import { useToggleClass } from "./hook/useToggleClass";
import { useWaitLoadingAllImgs } from "./hook/useWaitLoadingAllImgs";

export const PageComponents = memo(() => {
    const lastPageNum: number = 100;
    const documentTitle: string = 'ドキュメント XXXX';

    /* ドキュメントが縦書き（右開き）の場合は true */
    const verticalWritingMode: boolean = false;

    const pagerSpeed: number = 150;

    const [isPageNum, setPageNum] = useState<number>(1);
    const [isViewPortWidth, setViewPortWidth] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const { ToggleClass } = useToggleClass();
    const { PrevPage, NextPage } = usePagination();
    const { WaitLoadingAllImgs } = useWaitLoadingAllImgs();

    const thePostsPagination: (pageNum: number) => void = (pageNum: number) => {
        setPageNum((prevPageNum) => prevPageNum + pageNum);
    }

    /* ブラウザ幅（デバイス別）による表示切替のため、useLayoutEffect でレンダリング前にブラウザ幅を確認 */
    useLayoutEffect(() => {
        setViewPortWidth(window.innerWidth);
    }, []);

    const handleLoad: () => void = () => setLoading(false);

    useEffect(() => {
        setLoading(true);

        WaitLoadingAllImgs(lastPageNum);

        /* 最初の一枚目が読み込まれたタイミングでローディングを解除 */
        const firstPageImg: HTMLImageElement | null = document.querySelector('.wrapperSec img');
        /* 匿名関数を使用するとうまくクリーンアップできない（生成された関数がそれぞれ異なる参照を持つため）ので handleLoad のように参照を共有できる関数を用意しておく。そして、イベントリスナーを設定する際には以下のように関数（の参照）を直接使用する */
        firstPageImg?.addEventListener('load', handleLoad);

        /* useEffect のクリーンアップ処理 */
        return () => {
            firstPageImg?.removeEventListener('load', handleLoad);
        }
    }, []);

    return (
        <PageComponentsEl>
            {loading ? <LoadingEl /> :
                <section className="wrapperSec">
                    <div className={`multiPageWrapper ${isViewPortWidth >= 700 ? 'largeDisplayView' : 'singlePageView'}`}>
                        {isViewPortWidth >= 700 ?
                            (isPageNum <= 1 || isPageNum >= lastPageNum) ?
                                <>
                                    {isPageNum <= 1 &&
                                        <FirstPage
                                            verticalWritingMode={verticalWritingMode}
                                            pagerSpeed={pagerSpeed}
                                            isPageNum={isPageNum}
                                            documentTitle={documentTitle}
                                            ToggleClass={ToggleClass}
                                            thePostsPagination={thePostsPagination}
                                        />
                                    }
                                    {isPageNum >= lastPageNum &&
                                        <FinalPage
                                            verticalWritingMode={verticalWritingMode}
                                            pagerSpeed={pagerSpeed}
                                            isPageNum={isPageNum}
                                            lastPageNum={lastPageNum}
                                            documentTitle={documentTitle}
                                            PrevPage={PrevPage}
                                            ToggleClass={ToggleClass}
                                            thePostsPagination={thePostsPagination}
                                        />
                                    }
                                </> :
                                <MultiPages
                                    verticalWritingMode={verticalWritingMode}
                                    pagerSpeed={pagerSpeed}
                                    isPageNum={isPageNum}
                                    documentTitle={documentTitle}
                                    PrevPage={PrevPage}
                                    NextPage={NextPage}
                                    ToggleClass={ToggleClass}
                                    thePostsPagination={thePostsPagination}
                                /> :
                            <SinglePage
                                verticalWritingMode={verticalWritingMode}
                                pagerSpeed={pagerSpeed}
                                isPageNum={isPageNum}
                                lastPageNum={lastPageNum}
                                documentTitle={documentTitle}
                                PrevPage={PrevPage}
                                ToggleClass={ToggleClass}
                                thePostsPagination={thePostsPagination}
                            />
                        }
                    </div>
                    <PageNumberViewEl
                        verticalWritingMode={verticalWritingMode}
                        isPageNum={isPageNum}
                        setPageNum={setPageNum}
                        lastPageNum={lastPageNum}
                        isViewPortWidth={isViewPortWidth}
                    />
                    <GetOtherFile />
                </section>
            }
        </PageComponentsEl>
    );
});

const PageComponentsEl = styled.main`
width: clamp(320px, 100%, 1200px);
margin: 2.5em auto;
/* 親要素に「perspective」の指定。子要素にも適用。※ 子要素（例：<img>）のみを3D変形する際には「transform: perspective(数値)」を指定。 */
perspective: 1000px;

& .multiPageWrapper{
    display: flex;
    justify-content: center;
    margin: auto;
    padding: 16px;
    
    &.singlePageView {
        width: clamp(160px, 100%, 400px);
    }

    &.largeDisplayView {
        width: clamp(400px, 100%, 1080px);
    }

    & button {
        appearance: none;
        border-radius: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;
        width: 100%;

        &:hover {
            & .imgEls {
                transition: filter .25s;
                filter: brightness(.75);
            }
        }

        & .imgEls {
            display: block;
            object-fit: cover;
            height: 100%;

            &.singlePage-first,
            &.singlePage-final {
                width: calc(100vw/2);
                max-width: 560px;
                margin: auto;
            }
        }

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
}
`;