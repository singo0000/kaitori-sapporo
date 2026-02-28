# 出張買取サポート札幌 プロジェクト進捗メモ
> 最終更新: 2026-02-27

---

## 🗂 プロジェクト全体像

| サービス | 現状 | 将来 |
|----------|------|------|
| **kaitori-sapporo.vercel.app** | 買取LP（Next.js・稼働中） | ansinjp.com に統合予定 |
| **ansinjp.net** | ブログ「くるまど札幌」（ConoHa・WordPress） | ansinjp.com/blog に移行予定 |
| **ansinjp.com** | ペライチで管理中（中途半端な状態） | 全サービスの統合先ドメイン |
| **support@ansinjp.com** | ペライチ経由でGoogle Workspaceが提供 | Google Workspace継続・ペライチ解約 |

---

## ✅ 完了した作業

### 買取LP（kaitori-sapporo）
- [x] サイト全体の構築（Next.js + Vercel）
- [x] ピンク・オレンジ色を全廃→ブルー系に統一
- [x] お問い合わせフォーム実装（reCAPTCHA v3 + Nodemailer）
- [x] Gmail アプリパスワード設定・動作確認済
- [x] Vercel 環境変数設定（SMTP / reCAPTCHA）
- [x] Aboutページ サイバーパンク風デザイン復元（画像3枚含む）
- [x] KPIセクション追加（悩みに共感するPain Pointセクション）
- [x] FAQセクション追加（アコーディオン式）
- [x] 「書類説明スタッフ」「悩む売り手」画像を生成・追加
- [x] 車種別ページ（[area]/[category]/[vehicle]）のorange色修正
- [x] 代表者名・顔写真の削除

### コンタクトフォーム設定
- [x] SMTP: smtp.gmail.com / port 587
- [x] SMTP_USER: Gmailアドレス
- [x] SMTP_PASS: 16桁アプリパスワード（スペースなし）
- [x] CONTACT_TO_EMAIL: 受信用アドレス
- [x] NEXT_PUBLIC_RECAPTCHA_SITE_KEY / RECAPTCHA_SECRET_KEY 設定済

---

## 🚧 未完了・今後の作業

### 優先度：高（サイト品質）
- [x] PCで見たときのピンク文字が残っている箇所の最終確認
  - `[area]/[category]/[vehicle]/page.tsx` は修正済
  - Noto Sans JP のフォント修正および、ブログ全体のデザイン修正（Tailwind Typographyの適用・SWELL残骸の除去）完了

### 優先度：中（インフラ整理）
- [ ] **ansinjp.com のドメイン移管**（ペライチへ問い合わせ中・返答待ち）
  - 移管先候補: ムームードメイン
  - 手順: ペライチから「トランスファーできますか」とメールし返信待ち
  - ⚠️ メール(support@ansinjp.com)はGoogle Workspace継続でOK・MXレコード引き継ぎ必要
- [x] **ansinjp.net → ansinjp.com/blog への記事移行（ローカル作業完了）**
  - WordPress REST API から全記事（約300記事）を `data/wp-posts.json` へ抽出完了
  - アイキャッチ画像（約290枚）を `public/blog-images/` へ一括ダウンロード完了
  - kaitori-sapporo に `/blog` セクションを追加済み（ローカルで閲覧可能）
- [x] **記事移行のネットへの公開（Vercelへのデプロイ）**
  - SWELL等のWordPress残骸データをクリーンアップし、美しいブログカードとして「あわせて読みたい」リンクが表示されるよう再構築・デプロイ完了
  - SEO: `generateMetadata()` などの適用済み
- [ ] 移行完了後: ansinjp.net → ansinjp.com/blog へ301リダイレクト設定
- [ ] **コノHAWING（WordPress）解約** ─ 記事移行完了後
- [ ] **ペライチ解約** ─ ドメイン移管完了後

### 優先度：低（将来）
- [ ] Google Workspace を SMTP サーバーとして使う設定（support@ansinjp.com で送信）
  - ペライチを解約するタイミングで検討
- [ ] ansinjp.com を Vercel に接続（ドメイン移管後）

---

## 🚀 ブログ × AI記事自動生成 戦略

### 目的・全体像
```
Google検索
  └→ ansinjp.com/blog（SEOブログ記事）
        └→ 記事末尾「→ 無料査定はこちら」
              └→ ansinjp.com（買取LP・問い合わせ）
```
### ブログ記事投稿の仕組み（移行後）

**選択肢A：マークダウンファイル管理（シンプル）**
- `/blog/posts/タイトル.md` を追加するだけで記事公開
- GitHubに push → Vercelが自動デプロイ

**選択肢B：簡易CMS管理画面（おすすめ・実装予定）**
- ブラウザから記事の作成・編集・下書き保存が可能
- 以下を**ワンクリックでAI（Gemini）が全自動生成**する機能を搭載：
  1. 記事本文（見出し構造つき）
  2. SEOタイトル
  3. スラッグ（URL名、例：`sapporo-car-sell-spring`）
  4. メタディスクリプション
  5. 記事スコア測定（キーワード密度、文字数などYoast代替機能）
- 生成された内容をプレビューで確認可能
- **AIアシスタント機能（リライト指示）**：「ここの文章をもう少し柔らかくして」「〇〇というエピソードを追加して」とAIにチャット感覚で指示を出し、部分修正をさせた後に「公開」を押せるUX
- **アイキャッチ画像のAI自動生成機能**：記事の内容に合わせた画像を自動生成し、気に入らなければ「やり直し（リテイク）」ができる機能

### AI記事自動量産システム

**仕組み：**
1. 既存300記事をAIに読み込ませてスタイル・テーマを分析
2. 指定テーマ・キーワードで新記事を自動生成（Gemini API使用）
3. **【重要】記事内に「あわせて読みたい」過去記事への内部リンク（ブログカード形式）を自動挿入し、サイト内の回遊率を上げる仕組みを組み込む**
4. 記事末尾に買取LPへの自然な誘導文・リンクを自動挿入
5. 月20〜30記事のペースで量産 → 半年で検索流入を大幅増

**量産できる記事の種類：**

| カテゴリ | 例 | 狙うキーワード |
|---------|-----|----------------|
| 地域×買取 | 「札幌市南区で車を高く売る方法」| 「[区名] 車買取」 |
| 車種×買取 | 「ハイエースを札幌で高額買取してもらう方法」| 「[車種] 買取 札幌」 |
| 季節×車 | 「春の車買い替えシーズン前に査定すべき理由」| 「春 車売る」 |
| 悩み解決 | 「廃車になりそうな車、捨てる前にまず査定を」| 「廃車 買取 札幌」 |
| 北海道特化 | 「北海道の冬道で傷んだ車でも買取できる？」| 「北海道 車買取 傷」 |

### 実施スケジュール（予定）
```
Day 1（明日）: ドメイン移管（ansinjp.com → ムームードメイン）
Day 2〜3   : WordPress全記事をNext.jsに自動移行
Day 4〜5   : ブログデザイン・CMS管理画面の実装
Day 6〜7   : AI記事生成システムの構築・テスト
1週間後    : ansinjp.com にすべてを集約・完成
```

---

## 💰 費用まとめ（移行後）

| 項目 | 移行前 | 移行後 |
|------|--------|--------|
| ペライチ | 有料 | **解約→0円** |
| ConoHa（WordPress）| 有料 | **解約→0円** |
| Yoast SEO Premium | 有料 | **解約→0円** |
| Vercel（サイト） | 無料 | 無料 |
| Google Workspace（メール）| 月680円〜 | 継続（必須） |

---

## 🔑 重要な設定情報（Vercel 環境変数）

| Key | 内容 |
|-----|------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 サイトキー |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v3 シークレットキー |
| `SMTP_HOST` | smtp.gmail.com |
| `SMTP_PORT` | 587 |
| `SMTP_USER` | 送信元Gmailアドレス |
| `SMTP_PASS` | 16桁アプリパスワード（スペースなし） |
| `CONTACT_TO_EMAIL` | 問い合わせ受信アドレス |

---

## 📁 プロジェクト構成

```
/Desktop/プロジェクト/kaitori-sapporo/
├── app/
│   ├── page.tsx           # トップページ（買取LP）
│   ├── about/page.tsx     # 会社情報（サイバーパンク風）
│   ├── [area]/[category]/ # エリア別SEOページ
│   └── api/contact/       # お問い合わせAPI
├── public/
│   ├── hero-inspection.png
│   ├── various-cars.png
│   ├── kaitori-payment.png
│   ├── worried-seller.png
│   ├── staff-handover.png
│   └── about/
│       ├── sapporo-city.png
│       ├── car-blueprint.png
│       └── hokkaido-hologram.png
```
