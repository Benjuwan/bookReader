import { FC, memo, SyntheticEvent } from "react";
import { extendsType, imgSrcPath } from "../utils/imgSrcPath";
import { EachPageType } from "../PageComponents";
import { usePagination } from '../hook/usePagination';

export const SinglePage: FC<EachPageType> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, lastPageNum, documentTitle, thePostsPagination } = props;

    const lastPageNumber: number = typeof lastPageNum !== "undefined" ? lastPageNum : 0;

    const { PrevPage, prevAction, nextAction } = usePagination();

    const handlePrev: (e: SyntheticEvent<HTMLButtonElement>) => void = (e: SyntheticEvent<HTMLButtonElement>) => {
        if (verticalWritingMode) {
            if (isPageNum === lastPageNum) {
                return;
            }
        } else {
            if (isPageNum === 1) {
                return;
            }
        }

        const prevAction_core: () => void = () => {
            if (verticalWritingMode) {
                if (isPageNum < lastPageNumber) {
                    thePostsPagination(1);
                }
            } else {
                if (isPageNum > 1) {
                    thePostsPagination(-1);
                }
            }
        }

        prevAction(e, pagerSpeed, prevAction_core);
    }

    const handleNext: (e: SyntheticEvent<HTMLButtonElement>) => void = (e: SyntheticEvent<HTMLButtonElement>) => {
        if (verticalWritingMode) {
            if (isPageNum === 1) {
                return;
            }
        } else {
            if (isPageNum === lastPageNum) {
                return;
            }
        }

        const nextAction_core: () => void = () => {
            if (verticalWritingMode) {
                if (isPageNum > 1) {
                    thePostsPagination(-1);
                }
            } else {
                if (isPageNum < lastPageNumber) {
                    thePostsPagination(1);
                }
            }
        }

        nextAction(e, pagerSpeed, nextAction_core);
    }

    const firstPageImgSrc: string = `${location.origin}${imgSrcPath}${isPageNum === 0 ? isPageNum + 1 : isPageNum}.${extendsType}`;

    return (
        <div className="relative">
            {/* 前ページボタン（verticalWritingMode true の場合は 次ページボタン）*/}
            {/* SinglePage コンポーネントではページ送り機能を維持するため h-full を指定 */}
            <button type="button" className="appearance-none rounded-none border-0 bg-transparent cursor-pointer w-1/2 h-full absolute top-[50%] left-0 translate-y-[-50%] z-1 hover:bg-[rgba(0,0,0,.015)]" onClick={handlePrev}>&nbsp;</button>

            {/* ページ画像 */}
            <img
                className="useSetInputPagerNumber_singlePageImg block rotate-y-[0deg] duration-250 hover:filter hover:brightness-75"
                src={isPageNum === 0 ? firstPageImgSrc : PrevPage(isPageNum)}
                alt={isPageNum === 0 ?
                    `${documentTitle}の画像 - ${isPageNum + 1}ページ目` :
                    `${documentTitle}の画像 - ${isPageNum}ページ目`
                }
            />

            {/* 次ページボタン（verticalWritingMode true の場合は 前ページボタン）*/}
            {/* SinglePage コンポーネントではページ送り機能を維持するため h-full を指定 */}
            <button type="button" className="appearance-none rounded-none border-0 bg-transparent cursor-pointer w-1/2 h-full absolute top-[50%] right-0 translate-y-[-50%] z-1 hover:bg-[rgba(0,0,0,.015)]" onClick={handleNext}>&nbsp;</button>
        </div>
    );
});