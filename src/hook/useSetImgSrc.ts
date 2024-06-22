import { imgSrcPath, extendsType } from "../utils/imgSrcPath";

export const useSetImgSrc = () => {
    const setImgSrc: (pageNum: number, adjustNum?: number) => string = (
        pageNum: number,
        adjustNum?: number
    ) => {
        /* ナンバリングが「01 ~ 099」の場合は if (pageNum < 10) を取って、その下にある else if を if 表記に切替 */
        if (pageNum < 10) {
            if (adjustNum !== undefined) {
                return `${location.origin}${imgSrcPath}00${pageNum + adjustNum}.${extendsType}`;
            } else {
                return `${location.origin}${imgSrcPath}00${pageNum}.${extendsType}`;
            }
        } else if (pageNum < 100) {
            if (adjustNum !== undefined) {
                return `${location.origin}${imgSrcPath}0${pageNum + adjustNum}.${extendsType}`;
            } else {
                return `${location.origin}${imgSrcPath}0${pageNum}.${extendsType}`;
            }
        } else {
            if (adjustNum !== undefined) {
                return `${location.origin}${imgSrcPath}${pageNum + adjustNum}.${extendsType}`;
            } else {
                return `${location.origin}${imgSrcPath}${pageNum}.${extendsType}`;
            }
        }
    }

    return { setImgSrc }
}