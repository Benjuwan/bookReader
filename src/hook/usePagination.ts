import { extendsType, imgSrcPath } from "../utils/imgSrcPath";
// import { useSetImgSrc } from "./useSetImgSrc";

export const usePagination = () => {
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

    return { PrevPage, NextPage }
}