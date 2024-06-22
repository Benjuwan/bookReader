import { extendsType, imgSrcPath } from "../utils/imgSrcPath";
// import { useSetImgSrc } from "./useSetImgSrc";

export const useWaitLoadingAllImgs = () => {
    const WaitLoadingAllImgs: (lastPageNum: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void = (
        lastPageNum: number,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setLoading(true);

        /* 画像データ名のナンバリング部分が「001 ~ 009」「010 ~ 099」「100 ~ 」という形の場合に使用するカスタムフック */
        // const { setImgSrc } = useSetImgSrc();

        const _fetchImgSrc: (i: number) => Promise<number | undefined> = async (i: number) => {
            // const res: Response = await fetch(setImgSrc(i));
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