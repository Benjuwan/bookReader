import { SyntheticEvent } from "react";
import { extendsType, imgSrcPath } from "../utils/imgSrcPath";
// import { useSetImgSrc } from "./useSetImgSrc";

export const usePagination = (verticalWritingMode?: boolean) => {
    /* 画像データ名のナンバリング部分が「001 ~ 009」「010 ~ 099」「100 ~ 」という形の場合に使用するカスタムフック */
    // const { setImgSrc } = useSetImgSrc();

    /* 前ページ */
    const PrevPage: (pageNum: number) => string = (pageNum: number) => {
        // return setImgSrc(pageNum, 0);
        return `${location.origin}${imgSrcPath}${pageNum}.${extendsType}`;
    }

    /* 次ページ */
    const NextPage: (pageNum: number) => string = (pageNum: number) => {
        // return setImgSrc(pageNum, 1);
        return `${location.origin}${imgSrcPath}${pageNum + 1}.${extendsType}`;
    }

    const prevAction: (e: SyntheticEvent<HTMLButtonElement>, pagerSpeed: number, prevAction_core: () => void, specificClassName?: string) => void = (
        e: SyntheticEvent<HTMLButtonElement>,
        pagerSpeed: number,
        prevAction_core: () => void,
        specificClassName?: string
    ) => {
        const addClassName: string = specificClassName ?? verticalWritingMode ? 'paginateNext' : 'paginatePrev';

        const hasChildImg: boolean | undefined = e.currentTarget.querySelector('img') !== null || undefined;
        const targetImg: HTMLImageElement | null | undefined = hasChildImg ?
            e.currentTarget.querySelector('img') :
            e.currentTarget.parentElement?.querySelector('img'); // false は SinglePage 用
        targetImg?.classList.add(addClassName); // ページ送り時のアニメーション付与

        const theTimeoutId = setTimeout(() => {
            prevAction_core();
            targetImg?.classList.remove(addClassName);
        }, pagerSpeed);

        return () => {
            clearTimeout(theTimeoutId);
        }
    }

    const nextAction: (e: SyntheticEvent<HTMLButtonElement>, pagerSpeed: number, prevAction_core: () => void, specificClassName?: string) => void = (
        e: SyntheticEvent<HTMLButtonElement>,
        pagerSpeed: number,
        nextAction_core: () => void,
        specificClassName?: string
    ) => {
        const addClassName: string = specificClassName ?? verticalWritingMode ? 'paginatePrev' : 'paginateNext';

        const hasChildImg: boolean | undefined = e.currentTarget.querySelector('img') !== null || undefined;
        const targetImg: HTMLImageElement | null | undefined = hasChildImg ?
            e.currentTarget.querySelector('img') :
            e.currentTarget.parentElement?.querySelector('img'); // false は SinglePage 用
        targetImg?.classList.add(addClassName); // ページ送り時のアニメーション付与

        const theTimeoutId = setTimeout(() => {
            nextAction_core();
            targetImg?.classList.remove(addClassName);
        }, pagerSpeed);

        return () => {
            clearTimeout(theTimeoutId);
        }
    }

    return { PrevPage, NextPage, prevAction, nextAction }
}