import { memo, useEffect, useRef } from "react";

export const LoadingEl = memo(() => {
    const loadingElmRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const isLoadingElWords: string[] | undefined = loadingElmRef.current?.textContent?.split('');
        const loadingWords: string[] | undefined = isLoadingElWords?.map((word, i) => {
            return `<span class="txtFrames inline-block transform-[translateY(1em)]" style="animation-delay:${(i + 1) * 0.025}s">${word}</span>`;
        });

        if (loadingElmRef.current !== null && typeof loadingWords !== "undefined") {
            loadingElmRef.current.innerHTML = loadingWords?.join('');
        }
    }, []);

    return <section className="grid place-content-center h-[calc(100vh-5em)]"><p ref={loadingElmRef} className="overflow-hidden text-center fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)] leading-[2em] text-1 tracking-[0.25em] lg:text-[16px]">...データを取得中</p></section>
});