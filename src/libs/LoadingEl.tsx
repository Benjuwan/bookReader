import { Dispatch, memo, SetStateAction, useEffect, useRef } from "react";

export const LoadingEl = memo(({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) => {
    const loadingElmRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const counterId = setTimeout(() => {
            alert("Timeout Error | 描画まで時間がかかりすぎているので処理を中断します");
            setLoading(false);
            throw new Error("Timeout Error | 画像データの取得元URLやエンドポイントを確認してください");
        }, 180000); // 3分（3*60*1000）経過した場合はタイムアウトエラーを投げる

        const isLoadingElWords: string[] | undefined = loadingElmRef.current?.textContent?.split('');
        const loadingWords: string[] | undefined = isLoadingElWords?.map((word, i) => {
            return `<span class="txtFrames inline-block transform-[translateY(1em)]" style="animation-delay:${(i + 1) * 0.025}s">${word}</span>`;
        });

        if (loadingElmRef.current !== null && typeof loadingWords !== "undefined") {
            loadingElmRef.current.innerHTML = loadingWords?.join('');
        }

        // クリーンアップ処理
        return () => {
            clearTimeout(counterId);
        }
    }, []);

    return <section className="grid place-content-center h-[calc(100vh-5em)]"><p ref={loadingElmRef} className="overflow-hidden text-center fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)] leading-[2em] text-base tracking-[0.25em]">...データを取得中</p></section>
});
