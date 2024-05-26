/* クリックでのページ移動 */
import { useCallback } from "react";

export const usePagination = () => {
    /* 画像データへのパス一部（サブディレクトリで機能させるにはディレクトリパスの記述が必要になります）*/
    const imgpath: string = '/public/catalog-img/catalog_all_page_';
    // const imgpath: string = '/サブディレクトリ-XXX/サブディレクトリ-YYY/catalog-img/catalog_all_page_';

    /* 画像データの拡張子 */
    const extendsType: string = 'jpg';

    /* 画像データ名のナンバリング部分が「001 ~ 009」「010 ~ 099」「100 ~ 」という形の場合に使用する関数（プライベートメソッド）*/
    // const _setImgSrc: (pageNum: number, adjustNum: number) => string = (
    //     pageNum: number,
    //     adjustNum: number
    // ) => {
    //     /* ナンバリングが「01 ~ 099」の場合は if (pageNum < 10) を取って、その下にある else if を if 表記に切替 */
    //     if (pageNum < 10) {
    //         return `${location.origin}${imgpath}00${pageNum + adjustNum}.${extendsType}`;
    //     } else if (pageNum < 100) {
    //         return `${location.origin}${imgpath}0${pageNum + adjustNum}.${extendsType}`;
    //     } else {
    //         return `${location.origin}${imgpath}${pageNum + adjustNum}.${extendsType}`;
    //     }
    // }

    /* 前ページ */
    const PrevPage: (pageNum: number) => string = useCallback((pageNum: number) => {
        // return _setImgSrc(pageNum, 0);
        return `${location.origin}${imgpath}${pageNum}.${extendsType}`;
    }, []);

    /* 次ページ */
    const NextPage: (pageNum: number) => string = useCallback((pageNum: number) => {
        // return _setImgSrc(pageNum, 1);
        return `${location.origin}${imgpath}${pageNum + 1}.${extendsType}`;
    }, []);

    return { PrevPage, NextPage }
}