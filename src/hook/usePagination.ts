/* クリックでのページ移動 */
import { useCallback } from "react";
import { extendsType, imgSrcPath } from "../utils/imgSrcPath";

export const usePagination = () => {
    /* 画像データ名のナンバリング部分が「001 ~ 009」「010 ~ 099」「100 ~ 」という形の場合に使用する関数（プライベートメソッド）*/
    // const _setImgSrc: (pageNum: number, adjustNum: number) => string = (
    //     pageNum: number,
    //     adjustNum: number
    // ) => {
    //     /* ナンバリングが「01 ~ 099」の場合は if (pageNum < 10) を取って、その下にある else if を if 表記に切替 */
    //     if (pageNum < 10) {
    //         return `${location.origin}${imgSrcPath}00${pageNum + adjustNum}.${extendsType}`;
    //     } else if (pageNum < 100) {
    //         return `${location.origin}${imgSrcPath}0${pageNum + adjustNum}.${extendsType}`;
    //     } else {
    //         return `${location.origin}${imgSrcPath}${pageNum + adjustNum}.${extendsType}`;
    //     }
    // }

    /* 前ページ */
    const PrevPage: (pageNum: number) => string = useCallback((pageNum: number) => {
        // return _setImgSrc(pageNum, 0);
        return `${location.origin}${imgSrcPath}${pageNum}.${extendsType}`;
    }, []);

    /* 次ページ */
    const NextPage: (pageNum: number) => string = useCallback((pageNum: number) => {
        // return _setImgSrc(pageNum, 1);
        return `${location.origin}${imgSrcPath}${pageNum + 1}.${extendsType}`;
    }, []);

    return { PrevPage, NextPage }
}