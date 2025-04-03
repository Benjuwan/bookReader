import { FC, memo, SyntheticEvent } from 'react';
import { EachPageType } from '../PageComponents';
import { usePagination } from '../hook/usePagination';

export const FinalPage: FC<EachPageType> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, lastPageNum, documentTitle, thePostsPagination } = props;

    const { PrevPage, prevAction } = usePagination();

    const handlePrev: (e: SyntheticEvent<HTMLButtonElement>) => void = (e: SyntheticEvent<HTMLButtonElement>) => {
        const prevAction_core: () => void = () => {
            thePostsPagination(-2);
        }

        const specificClassName: string | undefined = verticalWritingMode ? 'paginateNext' : undefined;

        prevAction(e, pagerSpeed, prevAction_core, specificClassName);
    }

    return (
        <button onClick={handlePrev} >
            <img className="block object-cover h-full duration-250 hover:filter hover:brightness-75 w-1/2 max-w-[35rem] mx-auto lg:max-w-[1280px] lg:min-h-[640px]"
                src={typeof lastPageNum !== "undefined" ? PrevPage(lastPageNum) : undefined}
                alt={`${documentTitle}の画像 - ${isPageNum}ページ目`}
            />
        </button>
    );
});