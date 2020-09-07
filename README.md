# UniHakka

將客委會、教育部客家語內碼，轉換為 Unicode 標準之套件。如：

| 客語字 | 客委會 | 教育部 |
|:---:|:---:|:---:|
| 𠊎 (U+2028E) |  (U+E002) |  (U+E51F) |
| 𫣆 (U+2B8C6) |  (U+E000) |  (U+E700) |

本套件提供 340 字，約 440 餘種私有碼轉換，詳細表格至 [UniHakka 客家語私有碼對應表](https://docs.google.com/spreadsheets/d/1_OLALrobGqdlMRoBZIgVmx5AnsixFJdgDeqHdrJAwCA/edit?usp=sharing)。

## Installation 安裝

```
yarn add uni-hakka @m80126colin/uni-hakka --registry=https://npm.pkg.github.com
```

or

```
npm install --save @m80126colin/uni-hakka --registry=https://npm.pkg.github.com
```

## Usage 使用方法

``` es6
const UniHakka = require('uni-hakka')
const hakka = new UniHakka()

hakka.convert('來去') // 𫟧來𫟧去
```

## API

### `hakka.convert(text : string) -> string`

將 `text` 中存在於私有區之客語字編碼，轉換為統一 Unicode 編碼。

### `hakka.inspect(text : string) -> UniHakkaInspector[]`

檢查 `text` 內是否存在私有字。

``` es6
hakka.inspect('來去')
```

回傳值為

``` js
[
  UniHakkaInspector {
    position: [ 0, 2 ],
    original: '',
    code: 'e72c',
    toUnicode: '𫟧',
    info: '教育部輸入法、文本, 客委會認證詞庫'
  }
]
```

## Sources 資料來源

* 教育部《臺灣客家語常用詞辭典》
* 客家委員會 2009 年《客語造字檔內碼表》
* 客家委員會《客語能力認證基本詞彙》
* 2011 至 2019 年全國語文競賽客家語朗讀

## References 參考資料

* [CHISE IDS 漢字検索](http://www.chise.org/ids-find)
* [CNS11643 中文全字庫](https://www.cns11643.gov.tw/index.jsp)
* [本土語言外字表 - 再會豆腐字](https://tauhu.tw/gua-ji-pio/)

## Contributers 貢獻者

* [Hsu Subang](https://github.com/m80126colin)
* [David Kuo](https://github.com/david50407)

## License 授權

MIT
