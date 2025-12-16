import { memo, useEffect, useLayoutEffect, useState } from "react";
import { FirstPage } from "./libs/FirstPage";
import { FinalPage } from "./libs/FinalPage";
import { MultiPages } from "./libs/MultiPages";
import { SinglePage } from "./libs/SinglePage";
import { PageNumberViewEl } from "./libs/PageNumberViewEl";
import { GetOtherFile } from "./libs/GetOtherFile";
import { LoadingEl } from "./libs/LoadingEl";
import { useWaitLoadingAllImgs } from "./hook/useWaitLoadingAllImgs";

export type EachPageType = {
    pagerSpeed: number;
    isPageNum: number;
    documentTitle: string;
    thePostsPagination: (page: number) => void;
    verticalWritingMode?: boolean;
    lastPageNum?: number;
};

export const PageComponents = memo(() => {
    const lastPageNum: number = 100;
    const documentTitle: string = 'ドキュメント XXXX';

    /* ドキュメントが縦書き（右開き）の場合は true */
    const verticalWritingMode: boolean = false;

    const pagerSpeed: number = 150;

    const [isPageNum, setPageNum] = useState<number>(1);
    const [isViewPortWidth, setViewPortWidth] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const { WaitLoadingAllImgs } = useWaitLoadingAllImgs();

    const thePostsPagination: (pageNum: number) => void = (pageNum: number) => {
        if (isPageNum + pageNum === 0) {
            setPageNum(1);
            return;
        }

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
        const firstPageImg: HTMLImageElement | null = document.querySelector('.WRAPPER_SECTION img');
        /* 匿名関数を使用するとうまくクリーンアップできない（生成された関数がそれぞれ異なる参照を持つため）ので handleLoad のように参照を共有できる関数を用意しておく。そして、イベントリスナーを設定する際には以下のように関数（の参照）を直接使用する */
        firstPageImg?.addEventListener('load', handleLoad);

        /* useEffect のクリーンアップ処理 */
        return () => {
            firstPageImg?.removeEventListener('load', handleLoad);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        // 親要素に「perspective」の指定。子要素にも適用。※ 子要素（例：<img>）のみを3D変形する際には「transform: perspective(数値)」を指定。
        <main className="w-[clamp(20rem,100%,75rem)] mx-auto mt-10 perspective-[1000px]">
            {loading ? <LoadingEl /> :
                <section className="WRAPPER_SECTION">
                    <div className={`useSetInputPagerNumber_multiPageWrapper flex justify-center mx-auto p-4 ${isViewPortWidth >= 700 ? 'w-full max-w-270' : 'w-full max-w-100'}`}>
                        {isViewPortWidth >= 700 ?
                            (isPageNum <= 1 || isPageNum >= lastPageNum) ?
                                <>
                                    {isPageNum <= 1 &&
                                        <FirstPage
                                            verticalWritingMode={verticalWritingMode}
                                            pagerSpeed={pagerSpeed}
                                            isPageNum={isPageNum}
                                            documentTitle={documentTitle}
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
                                            thePostsPagination={thePostsPagination}
                                        />
                                    }
                                </> :
                                <MultiPages
                                    verticalWritingMode={verticalWritingMode}
                                    pagerSpeed={pagerSpeed}
                                    isPageNum={isPageNum}
                                    documentTitle={documentTitle}
                                    thePostsPagination={thePostsPagination}
                                /> :
                            <SinglePage
                                verticalWritingMode={verticalWritingMode}
                                pagerSpeed={pagerSpeed}
                                isPageNum={isPageNum}
                                lastPageNum={lastPageNum}
                                documentTitle={documentTitle}
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
        </main>
    );
});