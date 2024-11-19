# BookReader

## 概要
パンフレットや各種資料、冊子、雑誌などの見開きコンテンツを webブラウザ上で閲覧できるデジタルパンフレット機能です。<br />資料ダウンロードやサービス・商品の効果的な販促・宣伝などを考えたときに「カタログや資料をテキストリンクだけで別タブ表示して閲覧してもらうよりも、イメージしやすいブックリーダー形式で表示したほうがファイルダウンロード率や訴求効果が高まるのでは？」と思って制作しました。<br />ブラウザ幅が 700px 以下（スマホ閲覧時）では 1ページ表示仕様になります。
- サンプルドキュメントとして、<a href="https://security-portal.nisc.go.jp/" target="_blank">内閣サイバーセキュリティセンター（NISC）</a>が制作した「インターネットの安全・安心ハンドブック」を使用させていただいております。<br />webに親しまれていない方や子どもでも分かりやすいようにイラストも多めですし、平易な文章で説明されているのでサイバーセキュリティの意識付けに対する敷居が低く感じられる内容です。<br />BookReader（当ファイル）では、サンプルドキュメントのため一部の画像（100ページまで）しか扱っていませんが PDF は全ページ閲覧できるようになっています。<br />今後も更新されていく可能性があるため以下のリンクを定期的にチェックして確認してみてください。<br />
<a href="https://security-portal.nisc.go.jp/guidance/handbook.html" target="_blank">インターネットの安全・安心ハンドブック - NISC</a>

- （左）大きいディスプレイver、（右）スマートフォンver <br />
![大きいディスプレイver](readmeimg/gif-001.gif "hero")
![スマートフォンver](readmeimg/gif-002.gif "hero")

## 技術構成
- @types/react-dom@18.3.0
- @types/react@18.3.3
- @typescript-eslint/eslint-plugin@6.21.0
- @typescript-eslint/parser@6.21.0
- @vitejs/plugin-react@4.3.1
- eslint-plugin-react-hooks@4.6.2
- eslint-plugin-react-refresh@0.4.9
- eslint@8.57.0
- react-dom@18.3.1
- react@18.3.1
- styled-components@6.1.12
- typescript@5.5.4
- vite@4.5.5

## 用途
- パンフレットや資料といった各種ドキュメントの閲覧
- 資料ダウンロード前に商品やサービスの理解促進を行うことでその後の訴求効果UP？
- 家族や友人たちとの思い出の写真を残すデジタルプライベートアルバムとして？

## 使い方
- ファイルダウンロード後に `git install` して `npm run dev` で起動します。<br />※使用許可は不要です。改変や再配布も自由にしてください。
- ドキュメントのPDFファイルは`src/assets`ディレクトリに、ドキュメントの各ページ画像は`public/catalog-img`ディレクトリに置いてください。
- 対象ドキュメントが **縦書き（左開き）** の場合<br />
`PageComponents.tsx`の `const verticalWritingMode: boolean = false;` の値を `true`に変更してください。

## ビルド時（`npm run build`）の注意事項
- 特定のディレクトリ or サブディレクトリに格納する場合
    - `vite.config.ts`の `base:` 箇所にパスを指定<br />
    例：example ディレクトリ内の book-reader ディレクトリ下に置く場合
    ```
    base: '/example/book-reader',
    ```

- `imgSrcPath.ts`で以下を調整
    - 画像パス（`imgSrcPath`）と、必要に応じて拡張子（`extendsType`）の設定を調整

- `PageComponents.tsx`で最後のページ番号とコンテンツ名を指定
    - `const lastPageNum: number = 最後のページ番号（コンテンツの画像データの最大ナンバー）;`
    - `const documentTitle: string = 'コンテンツ名を指定';`
    - 【任意】ドキュメントが縦書き（右開き）の場合は`verticalWritingMode`を`true`にする

- `usePagination.ts`と`useWaitLoadingAllImgs.ts`の以下を調整
    - 【任意】画像データファイルのナンバリング先頭に 0 or 00 などが前置する場合（例：画像データ名のナンバリング部分が「001 ~ 009」「010 ~ 099」「100 ~ 」という形）は`useSetImgSrc.ts`（`src\hook\useSetImgSrc.ts`）カスタムフックを使用する（当該カスタムフックは現状コメントアウト）

- 【任意】`GetOtherFile.tsx`（`src\libs\GetOtherFile.tsx`）の以下を調整
    - カタログやマニュアルなど対象ファイルに応じて、`setFileContent`のpdfファイル名を変更（デフォルトは`document.pdf`）

## 補足事項
- 仕組み
    画像をクリックで`img`の`src`と`alt`を随時書き換えています。ページめくりの表現はCSSの`animation`です。<br />ページ数入力で任意のページへ飛べます。入力欄は**数値以外受け付けず**、**1 〜 最終ページ番号の範囲内で機能**します。
    - 画像をクリックでの書き換え：`usePagination.ts`の `PrevPage` と `NextPage`メソッド
    - ページ数入力後のページジャンプ：`useSetInputPagerNumber.ts` の `SetInputPagerNumber`メソッド
    - 数値以外受け付けず、1 〜 最終ページ番号の範囲内で機能：`useGetPagerNum.ts` の `GetPagerNum`メソッド

- PDFから画像の書き出し + 一括リネームの方法（Mac）
    <details>
    <summary>PDFから画像の書き出し + 一括リネームの方法（Mac）</summary>

    1：Adobe AcrobatでPDFから画像の書き出し方法
    ![Adobe AcrobatでPDFから画像の書き出し](readmeimg/0001-min.png "hero")

    2：書き出し画像を一括リネーム（Mac）：画像を全選択して「右クリック」 - 「名称変更」 
    ![書き出し画像を一括リネーム（Mac）：画像を全選択して「右クリック」 - 「名称変更」](readmeimg/0002-min.png "hero")

    3 - a：画像のファイルネームを任意の形へ書き換えたい場合：「フォーマット」を選択
    ![画像のファイルネームを任意の形へ書き換えたい場合「フォーマット」を選択](readmeimg/0003-min.png "hero")

    3 - b：画像のファイルネームの一部を変更したい場合：「テキストを置き換える」を選択
    ![画像のファイルネームの一部を変更したい場合「テキストを置き換える」を選択](readmeimg/0004-min.png "hero")
    </details>