import { FC, memo, SyntheticEvent } from 'react';
import { EachPageType } from '../PageComponents';
import { usePagination } from '../hook/usePagination';

export const MultiPages: FC<EachPageType> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, documentTitle, thePostsPagination } = props;

    const { PrevPage, NextPage, prevAction, nextAction } = usePagination();

    const handlePrev: (e: SyntheticEvent<HTMLButtonElement>) => void = (e: SyntheticEvent<HTMLButtonElement>) => {
        const prevAction_core: () => void = () => {
            if (verticalWritingMode) {
                thePostsPagination(2);
                return; // ページネーション後は（当スコープ内で）処理終了
            }
            thePostsPagination(-2);
        }

        prevAction(e, pagerSpeed, prevAction_core);
    }

    const handleNext: (e: SyntheticEvent<HTMLButtonElement>) => void = (e: SyntheticEvent<HTMLButtonElement>) => {
        const nextAction_core: () => void = () => {
            if (verticalWritingMode) {
                thePostsPagination(-2);
                return; // ページネーション後は（当スコープ内で）処理終了
            }
            thePostsPagination(2);
        }

        nextAction(e, pagerSpeed, nextAction_core);
    }

    return (
        <>
            <button
                className="appearance-none rounded-none border-0 bg-transparent cursor-pointer w-full"
                onClick={handlePrev}
            >
                <img
                    className={`useSetInputPagerNumber_prevPage block object-cover duration-250 hover:filter hover:brightness-75 ${verticalWritingMode ? 'origin-left' : 'origin-right'}`}
                    src={verticalWritingMode ? NextPage(isPageNum) : PrevPage(isPageNum)}
                    alt={`${documentTitle}の画像 - ${verticalWritingMode ? isPageNum + 1 : isPageNum}ページ目`}
                />
            </button>
            <button
                className="appearance-none rounded-none border-0 bg-transparent cursor-pointer w-full"
                onClick={handleNext}
            >
                <img
                    className={`useSetInputPagerNumber_prevPage block object-cover duration-250 hover:filter hover:brightness-75 ${verticalWritingMode ? 'origin-right' : 'origin-left'}`}
                    src={verticalWritingMode ? PrevPage(isPageNum) : NextPage(isPageNum)}
                    alt={`${documentTitle}の画像 - ${verticalWritingMode ? isPageNum : isPageNum + 1}ページ目`}
                />
            </button>
        </>
    );
});