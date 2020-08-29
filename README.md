# UniHakka

將客委會、教育部客家語內碼，轉換為 Unicode 標準之套件。如：

| 客語字 | 客委會 | 教育部 |
|:---:|:---:|:---:|
| 𠊎 (U+2028E) |  (U+E002) |  (U+E51F) |
| 𫣆 (U+2B8C6) |  (U+E000) |  (U+E700) |

本套件提供 340 字，約 440 餘種私有碼轉換，詳細表格至 [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1_OLALrobGqdlMRoBZIgVmx5AnsixFJdgDeqHdrJAwCA/edit?usp=sharing)。

## Installation 安裝

```
yarn add uni-hakka
```

or

```
npm install --save uni-hakka
```

## Usage 使用方法

``` es6
const UniHakka = require('uni-hakka')
const hakka = new UniHakka()

hakka.convert('來去') // 𫟧來𫟧去
```

### `hakka.convert(text : string) -> string`

將 `text` 中存在於私有區之客語字編碼，轉換為統一 Unicode 編碼。

### `hakka.inspect(text : string) -> Inspector[]`

檢查 `text` 內是否存在私有字。

``` es6
hakka.inspect('來去')
```

回傳值為

```
[
  Inspector {
    position: [ 0, 2 ],
    original: '',
    code: 'e72c',
    toUnicode: '𫟧',
    info: '教育部輸入法、文本, 客委會認證詞庫'
  }
]
```
