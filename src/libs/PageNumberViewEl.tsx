import styled from "styled-components";
import { FC, memo, useState } from "react";
import { usePagination } from "../hook/usePagination";
import { PagerInputEl } from "./PagerInputEl";

type pageProps = {
    verticalWritingMode: boolean;
    isPageNum: number;
    setPageNum: (el: number) => void;
    lastPageNum: number;
}

export const PageNumberViewEl: FC<pageProps> = memo((props) => {
    const { verticalWritingMode, isPageNum, setPageNum, lastPageNum } = props;

    /* ページ数を指定する入力項目の表示有無に関する bool */
    const [isEdit, setEdit] = useState<boolean>(true);
    const editMode = () => {
        setEdit(!isEdit);
    }

    /* input value */
    const [isInputTxt, setInputTxt] = useState<string>('');

    /* クリックでのページ移動 */
    const { PrevPage, NextPage } = usePagination();


    return (
        <PageNumberViewWrapper>
            {isPageNum <= 1 || isPageNum >= lastPageNum ?
                <div className={`pagerEls ${isEdit ? 'isEditTrue' : 'isEditFalse'}`} onClick={editMode}>
                    {isPageNum <= 1 &&
                        <>
                            {isPageNum === 0 ?
                                <span>{isPageNum + 1}</span> :
                                <span>{isPageNum}</span>
                            }
                        </>
                    }
                    {isPageNum >= lastPageNum &&
                        <>
                            {isPageNum === lastPageNum ?
                                <span>{isPageNum}</span> :
                                <span>{isPageNum - 1}</span>
                            }
                        </>
                    } / {lastPageNum}
                </div> :
                <div className={`pagerEls ${isEdit ? 'isEditTrue' : 'isEditFalse'}`} onClick={editMode}>
                    {verticalWritingMode ?
                        <>{lastPageNum} / <span>{isPageNum + 1}</span> - <span>{isPageNum}</span></> :
                        <><span>{isPageNum}</span> - <span>{isPageNum + 1}</span> / {lastPageNum}</>
                    }
                </div>
            }
            {isEdit &&
                <PagerInputEl
                    lastPageNum={lastPageNum}
                    isInputTxt={isInputTxt}
                    setInputTxt={setInputTxt}
                    setPageNum={setPageNum}
                    PrevPage={PrevPage}
                    NextPage={NextPage}
                />
            }
        </ PageNumberViewWrapper>
    );
});

const PageNumberViewWrapper = styled.div`
font-size: 16px;
text-align: center;
padding: 0 16px;
line-height: 2;

& .pagerEls {
    cursor: pointer;

    &.isEditTrue {
        &:hover {
            opacity: .75;
        }
    }

    &.isEditFalse {
        width: fit-content;
        margin: auto;
        position: relative;

        &::after {
            content: "→";
            font-size: 14px;
            position: absolute;
            top: 50%;
            left: 100%;
            transform: translate(50%, -50%);
            transition: transform .25s;
        }
        
        &:hover {
            opacity: .75;
            &::after {
                transform: translate(80%, -50%);
            }
        }
    }
}
`;