import { FC, memo, SyntheticEvent } from 'react';
import { extendsType, imgSrcPath } from '../utils/imgSrcPath';
import { EachPageType } from '../PageComponents';
import { usePagination } from '../hook/usePagination';

export const FirstPage: FC<EachPageType> = memo((props) => {
    const { verticalWritingMode, pagerSpeed, isPageNum, documentTitle, thePostsPagination } = props;

    const { nextAction } = usePagination();

    const handleNext: (e: SyntheticEvent<HTMLButtonElement>) => void = (e: SyntheticEvent<HTMLButtonElement>) => {
        const nextAction_core: () => void = () => {
            thePostsPagination(1);
        }

        const specificClassName: string | undefined = verticalWritingMode ? 'paginatePrev' : undefined;

        nextAction(e, pagerSpeed, nextAction_core, specificClassName);
    }

    return (
        <button onClick={handleNext} >
            <img className="block object-cover duration-250 hover:filter hover:brightness-75 w-1/2 max-w-120 mx-auto lg:max-w-7xl lg:min-h-[640px]"
                src={`${location.origin}${imgSrcPath}${isPageNum === 0 ?
                    isPageNum + 1 : isPageNum}.${extendsType}`
                }
                alt={
                    isPageNum === 0 ?
                        `${documentTitle}の画像 - ${isPageNum + 1}ページ目` :
                        `${documentTitle}の画像 - ${isPageNum}ページ目`
                }
            />
        </button>
    );
});