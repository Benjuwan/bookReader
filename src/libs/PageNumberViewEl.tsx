import { FC, memo, useState } from "react";
import { PagerInputEl } from "./PagerInputEl";

type pageProps = {
    verticalWritingMode: boolean;
    isPageNum: number;
    setPageNum: (el: number) => void;
    lastPageNum: number;
    isViewPortWidth: number;
};

export const PageNumberViewEl: FC<pageProps> = memo((props) => {
    const { verticalWritingMode, isPageNum, setPageNum, lastPageNum, isViewPortWidth } = props;

    /* ページ数を指定する入力項目の表示有無に関する bool */
    const [isEdit, setEdit] = useState<boolean>(true);
    const editMode = () => {
        setEdit(!isEdit);
    }

    /* input value */
    const [isInputTxt, setInputTxt] = useState<string | number>('');

    return (
        <div className="text-1 text-center py-0 px-1 leading-[2em]">
            {isViewPortWidth >= 700 ?
                <>
                    {isPageNum <= 1 || isPageNum === lastPageNum ?
                        <div className={`cursor-pointer ${isEdit ?
                            'hover:opacity-[0.75]' :
                            'w-fit mx-auto relative hover:opacity-[0.75] after:content-["→"] after:absolute after:top-[50%] after:left-[100%] after:transform-[translate(50%,-50%)] after:transition after:duration-[0.25s] hover:after:transform-[translate(80%,-50%)]'}`} onClick={editMode}>
                            {isPageNum <= 1 &&
                                <>
                                    {isPageNum === 0 ?
                                        <span>{isPageNum + 1}</span> :
                                        <span>{isPageNum}</span>
                                    }
                                </>
                            }
                            {isPageNum === lastPageNum && <span>{lastPageNum}</span>} / {lastPageNum}
                        </div> :
                        <div className={`cursor-pointer ${isEdit ?
                            'hover:opacity-[0.75]' :
                            'w-fit mx-auto relative hover:opacity-[0.75] after:content-["→"] after:absolute after:top-[50%] after:left-[100%] after:transform-[translate(50%,-50%)] after:transition after:duration-[0.25s] hover:after:transform-[translate(80%,-50%)]'}`} onClick={editMode}>
                            {verticalWritingMode ?
                                <><span>{isPageNum + 1}</span> - <span>{isPageNum}</span> / {lastPageNum}</> :
                                <><span>{isPageNum}</span> - <span>{isPageNum + 1}</span> / {lastPageNum}</>
                            }
                        </div>
                    }
                </> :
                <div className={`cursor-pointer ${isEdit ?
                    'hover:opacity-[0.75]' :
                    'w-fit mx-auto relative hover:opacity-[0.75] after:content-["→"] after:absolute after:top-[50%] after:left-[100%] after:transform-[translate(50%,-50%)] after:transition after:duration-[0.25s] hover:after:transform-[translate(80%,-50%)]'}`} onClick={editMode}>
                    <>
                        {isPageNum === 0 ?
                            <span>{isPageNum + 1}</span> :
                            <span>{isPageNum}</span>
                        }
                    </> / {lastPageNum}
                </div>
            }
            {isEdit &&
                <PagerInputEl
                    lastPageNum={lastPageNum}
                    isInputTxt={isInputTxt}
                    setInputTxt={setInputTxt}
                    setPageNum={setPageNum}
                />
            }
        </ div>
    );
});