# 🌌 宇宙流 PODCAST 官方網站

> 「我們來自於宇宙，陪伴你隨著宇宙的流動，體驗人生、覺察生命，成為完整的自己。」  
> 由 Roger 主持的自我覺察與心靈流動 Podcast 官方網站。

---

## ✨ 網站核心特色

1. **🎙️ 306+ 集深層音訊串流**：串接 Firstory 官方 RSS，支援關鍵字即時搜尋、分類篩選、單集詳細 Show Notes 閱讀與全域底部懸浮播放器（支援波形動態、15秒跳轉、倍速播放）。
2. **👤 主理人 Roger 與三大精神**：深入介紹宇宙流理念與自我覺察心法，並將「專屬聽眾樹洞」全面對接官方 Instagram 小盒子。
3. **🎥 影音社群即時聯播**：
   - **Instagram 即時牆**：嵌入 `@universe.flow2021` 官方動態。
   - **YouTube 最新影片自動連播**：即時自動抓取 `@podcast1832` 頻道的最新上傳影片。
4. **📖 覺察與體驗手札專頁**：獨立深度文章庫，支援標籤切換、延伸單集音訊播放與文章一鍵分享。
5. **🕯️ 宇宙流周邊（登記預購）**：三款淨化選品（空間噴霧、沐浴礦物鹽、金句貼紙），預購資料直寄 Roger 官方信箱（支援 Gmail 網頁版直寄、本機郵件軟體與一鍵複製明細）。
6. **🚀 零維護全自動排程**：內建 GitHub Actions 每週四全自動同步 Firstory 最新單集。

---

## 🛠️ 開發與指令

```bash
# 安裝相依套件
npm install

# 啟動本地開發伺服器
npm run dev

# 專案打包構建
npm run build

# 手動同步 Firstory 最新 Podcast 單集資料
npm run update-episodes
```

---

## ⏰ 每週四 GitHub Actions 自動排程說明

排程設定檔位於 `.github/workflows/auto-update-episodes.yml`：
- **自動執行時間**：每週四台灣時間 `08:00`、`12:00`、`18:00`、`22:00`。
- **運作機制**：自動抓取 Firstory RSS，若偵測到新單集會自動提交並 Push 到 `main` 分支。
- **即時重新部署**：搭配 Vercel / Netlify，偵測到新 Commit 後約 30 秒內全自動重新打包發布。
- **手動立即觸發**：隨時可在 GitHub 儲存庫的 **Actions** 標籤頁中，點擊 `Auto Sync Podcast Episodes` > `Run workflow` 進行手動立即同步。

---

## 🌐 官方社群與平台連結

- **Instagram**：[@universe.flow2021](https://www.instagram.com/universe.flow2021/)
- **YouTube**：[@podcast1832](https://www.youtube.com/@podcast1832)
- **Apple Podcasts**：[宇宙流 Apple Podcasts](https://podcasts.apple.com/podcast/id1571623462)
- **Spotify**：[宇宙流 Spotify](https://open.spotify.com/show/6GtjJ8OjsAbvnBzbqpqbLr)
- **KKBOX**：[宇宙流 KKBOX](https://podcast.kkbox.com/channel/HYyUpLPNegHwH3s6Db)
- **Firstory RSS**：`https://feed.firstory.me/rss/user/ckpp8gmtxcbi708463itdb0t5`

