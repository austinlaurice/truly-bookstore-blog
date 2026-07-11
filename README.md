# 真的書店 Blog

真的書店（[trulybookstore.in-common.tw](https://trulybookstore.in-common.tw/)）的部落格。
線上網址：**https://blog.in-common.tw**

## 技術架構

- **Jekyll**，由 GitHub Pages 原生建置（push 到 `main` 即自動部署，無需 CI 設定）
- 因為是 Pages 原生建置（safe mode），**只能使用 [白名單 plugins](https://pages.github.com/versions/)**：目前用 `jekyll-feed`（RSS）與 `jekyll-seo-tag`（meta tags）
- 樣式與主站一致：Tailwind CDN + 自訂色票（`_includes/head.html` 內的 inline config，色票來源為主站 `js/script.js`）、Noto Serif/Sans TC、Lucide icons
- Tag 頁（`tags.html`）用純 Liquid `site.tags` 實作（safe mode 不能用 tag plugins）
- 搜尋為純前端：`search.json`（Liquid 產生索引）+ `assets/js/search.js`（子字串比對）

## 發文

非工程師發文流程請看 **[POST_GUIDE.md](POST_GUIDE.md)**，文章範本在 **[post-template.md](post-template.md)**。

## RSS / 電子報

`jekyll-feed` 自動產出 `/feed.xml`（Atom）。接電子報服務（如 Buttondown）時，
只需要提供 feed 網址：`https://blog.in-common.tw/feed.xml`。

## 本機開發

```bash
brew install ruby          # macOS 系統 ruby 太舊，需要 Homebrew 版
# 依照 brew 提示把 ruby 加入 PATH 後：
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000
```

`github-pages` gem 會完全模擬線上建置環境（版本與 safe mode 一致）。

## 自訂網域注意事項（重要）

`blog.in-common.tw` 透過 DNS CNAME 指向 `austinlaurice.github.io`，並在
GitHub 帳號層級完成了 `in-common.tw` 的網域驗證（防止子網域被其他 GitHub 帳號綁走）。

⚠️ **如果日後要下架這個部落格：請先到 DNS 刪除 `blog.in-common.tw` 的 CNAME 記錄，
再刪除 repo 或關閉 Pages。** 順序顛倒會留下懸空 CNAME，
任何人都可能把這個子網域接管拿去放垃圾內容（本網域發生過真實案例：
`truly-bookstore.in-common.tw`（帶連字號的舊子網域）曾因 Netlify 懸空記錄被賭博網站接管）。
