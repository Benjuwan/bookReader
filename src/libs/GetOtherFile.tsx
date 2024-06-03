import styled from "styled-components";
import { memo } from "react";
import setFileContent from '../../src/assets/document.pdf';

export const GetOtherFile = memo(() => {
    const fileName: string = 'PDFファイル';

    return (
        <GetOtherFileWrapper>
            <a href={setFileContent} target="_blank">ドキュメントを{fileName}で閲覧（別タブで表示）</a>
        </GetOtherFileWrapper>
    );
});

const GetOtherFileWrapper = styled.div`
text-align: center;
margin: 2.5em auto;

    & a {
        display: block;
        width: clamp(160px, calc(100vw / 2), 400px);
        margin: auto;
        font-size: 14px;
        line-height: 2;
        text-decoration: none;
        border-radius: 4px;
        color: #fff;
        background-color: #333;
        border: 1px solid transparent;
        padding: 1em;

        &:hover {
            color: #1a0dab;
            border-color: #1a0dab;
            background-color: #fff;
        }
    }
`