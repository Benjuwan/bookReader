import { extendsType, imgSrcPath } from "../utils/imgSrcPath";

export const useWaitLoadingAllImgs = () => {
    const WaitLoadingAllImgs: (lastPageNum: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void = (
        lastPageNum: number,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setLoading(true);

        /* 画像データ名のナンバリング部分が「001 ~ 009」「010 ~ 099」「100 ~ 」という形の場合に使用する関数（プライベートメソッド）*/
        // const _setImgSrc: (i: number) => string = (i: number) => {
        //     /* ナンバリングが「01 ~ 099」の場合は if (pageNum < 10) を取って、その下にある else if を if 表記に切替 */
        //     if (i < 10) {
        //         return `${location.origin}${imgSrcPath}00${i}.${extendsType}`;
        //     } else if (i < 100) {
        //         return `${location.origin}${imgSrcPath}0${i}.${extendsType}`;
        //     } else {
        //         return `${location.origin}${imgSrcPath}${i}.${extendsType}`;
        //     }
        // }

        const _fetchImgSrc: (i: number) => Promise<number | undefined> = async (i: number) => {
            // const res: Response = await fetch(_setImgSrc(i));
            const res: Response = await fetch(`${location.origin}${imgSrcPath}${i}.${extendsType}`);

            try {
                if (!res.ok) {
                    throw new Error(`_fetchImgSrc was failed. status:${res.status}`);
                }

                /* 最後の画像データへのフェッチ成功時にローディング解除 */
                if (i === lastPageNum) {
                    setLoading(false);
                }

                return res.status;
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }

        /* 全画像に対するフェッチ処理 */
        for (let i = 1; i <= lastPageNum; i++) {
            _fetchImgSrc(i);
        }
    }

    return { WaitLoadingAllImgs }
}