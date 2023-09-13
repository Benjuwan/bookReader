import styled from "styled-components";
import { memo, useState } from "react";
/* 最初のページの画像パス（※ナンバリングの先頭に 0 or 00 などが付く場合は調整が必要）*/
import firstPageImgSrc from '../public/catalog-img/catalog_all_page_1.jpg';
import { useToggleClass } from "./hook/useToggleClass";
import { usePagination } from "./hook/usePagination";
import { FirstPage } from "./libs/FirstPage";
import { FinalPage } from "./libs/FinalPage";
import { MultiPages } from "./libs/MultiPages";
import { PageNumberViewEl } from "./libs/PageNumberViewEl";
import { GetOtherFile } from "./libs/GetOtherFile";

export const PageComponents = memo(() => {
    const lastPageNum: number = 100;
    const documentTitle: string = 'ドキュメント XXXX';
    /* ドキュメントが縦書き（右開き）の場合は true */
    const verticalWritingMode: boolean = false;

    const [isPageNum, setPageNum] = useState<number>(1);
    const thePostsPagination = (pageNum: number) => {
        setPageNum((prevPageNum) => prevPageNum + pageNum);
    }

    const { ToggleClass } = useToggleClass();
    const { PrevPage, NextPage } = usePagination();

    const pagerSpeed: number = 150;

    return (
        <PageComponentsEl>
            <div className="multiPageWrapper">
                {
                    (isPageNum <= 1 || isPageNum >= lastPageNum) ?
                        <>
                            {isPageNum <= 1 &&
                                <FirstPage
                                    verticalWritingMode={verticalWritingMode}
                                    pagerSpeed={pagerSpeed}
                                    isPageNum={isPageNum}
                                    firstPageImgSrc={firstPageImgSrc}
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
                        />
                }
            </div>
            <PageNumberViewEl
                verticalWritingMode={verticalWritingMode}
                isPageNum={isPageNum}
                setPageNum={setPageNum}
                lastPageNum={lastPageNum}
            />
            <GetOtherFile />
        </PageComponentsEl>
    );
});

const PageComponentsEl = styled.div`
width: clamp(320px,calc(100vw/2),640px);
margin: 2.5em auto;
/* 親要素に「perspective」の指定。子要素にも適用。※ 子要素（例：<img>）のみを3D変形する際には「transform: perspective(数値)」を指定。 */
perspective: 1000px;

& .multiPageWrapper{
    display: flex;
    justify-content: center;
    margin: auto;
    padding: 16px;
    width: clamp(160px, calc(100vw/2), 640px);
    
    @media screen and (min-width: 700px) {
        width: clamp(320px, calc(100vw/2), 640px);
    }

    & .imgEls{
        display: block;
        cursor: pointer;
        transform: rotateY(0deg);
        
        &:hover{
            transition: filter .25s;
            filter: brightness(.75);
        }

        &.paginateNext{
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

        &.paginatePrev{
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