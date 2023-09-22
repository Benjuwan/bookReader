export const useToggleClass = () => {
    /* PageComponents.tsx の CSS：.paginate の アニメーション時間 */
    const paginateAnimationTime: number = 250;

    const ToggleClass = (
        targetEl: HTMLElement,
        targetClassName: string
    ) => {
        targetEl.classList.add(targetClassName);

        /* 指定時間経過後に初期化処理（targetClassName を remove）を行う */
        setTimeout(() => {
            targetEl.classList.remove(targetClassName);
        }, paginateAnimationTime);
    }

    return { ToggleClass }
}