import { memo } from "react";
import setFileContent from '../../src/assets/document.pdf';

export const GetOtherFile = memo(() => {
    const fileName: string = 'PDFファイル';

    return (
        <div className="text-center my-[2.5em] mx-auto">
            <a className="block w-[clamp(10rem,calc(100vw/2),25rem)] mx-auto text-[0.875rem] leading-[2em] no-underline rounded border border-transparent bg-gray-800 text-white px-4 py-2 text-center transition-colors hover:text-blue-700 hover:border-blue-700 hover:bg-white lg:w-[clamp(160px,calc(100vw/2),400px)] lg:text-[14px]" href={setFileContent} target="_blank">ドキュメントを{fileName}で閲覧（別タブで表示）</a>
        </div>
    );
});