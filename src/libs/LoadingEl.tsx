import { memo, useEffect } from "react";
import styled from "styled-components";

export const LoadingEl = memo(() => {
    /* ローディングテキストのアニメーション演出の準備と補助 */
    useEffect(() => {
        const isLoadingEl: HTMLParagraphElement | null = document.querySelector('.isLoading');
        const isLoadingElWords: string[] | undefined = isLoadingEl?.textContent?.split('');
        const loadingWords: string[] | undefined = isLoadingElWords?.map((word, i) => {
            return `<span class="txtFrames" style="animation-delay:${(i + 1) * 0.025}s">${word}</span>`;
        });

        if (
            isLoadingEl !== null &&
            typeof loadingWords !== "undefined"
        ) {
            isLoadingEl.innerHTML = loadingWords?.join('');
        }
    }, []);

    return <LoadingElm><p className="isLoading">...データを取得中</p></LoadingElm>
});

const LoadingElm = styled.section`
display: grid;
place-content: center;
height: calc(100vh - 5em); // 親の main（PageComponents.tsx）で margin: 2.5em auto; のスタイルをあてているため

& p {
    overflow: hidden;
    letter-spacing: .25em;
    text-align: center;
    font-size: 16px;
    line-height: 2;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & span {
        display: inline-block;
        transform: translateY(1em);

        &.txtFrames{
            animation: txtFrames .75s infinite ease-in-out;
        }
    }
}

@media screen and (min-width: 700px) {
    & p {
        font-size: 18px;
    }
}

@keyframes txtFrames {
    0%{transform:translateY(1em)}
    50%, 100%{transform:translateY(0)}
}
`;