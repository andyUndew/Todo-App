## アプリ概要

シンプルなMarkdown対応のノートアプリ。Supabase のリアルタイム機能を活用し、複数のデバイスでノートを同期できる。

## 🛠️ 技術スタック

- **フロントエンド**: React + TypeScript + Vite
- **バックエンド / データベース**: Supabase
- **UI ライブラリ**: Radix UI

## 🏗️ アーキテクチャ

### **Supabase のテーブル構造**

### **noteテーブル**

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| id | int | ノートの ID |
| title | varchar | ノートのタイトル |
| content | text | ノートの内容 |

## 🔧 主要な機能と実装ポイント

### **1. ノートの作成・更新・削除**

- ユーザーが新しいノートを作成できる。
- ノートのタイトルと内容を編集可能。
- 削除機能も実装予定。

### **2. Supabase のリアルタイム更新**

- `postgres_changes` を利用して、ノートの内容を他のデバイスにリアルタイムで反映。
- 変更があるたびに `fetchNotes()` を実行し、最新のデータを取得。

### **3. Debounce を活用したスムーズな更新**

- `useDebouncedCallback` を利用し、入力のたびに即時リクエストを送らないように調整。
- `localContent` ステートを追加し、入力中のユーザー体験を向上。
- 500ms ごとに Supabase にデータを保存する。

## 🔮 今後の改善点や追加機能のアイデア

- **ノートの削除**: ノートの削除をする
- **タグ機能の追加**: ノートをタグで分類できるようにする。
- **Notion のような機能拡張**: ブロックエディタやページネーション機能を導入し、より柔軟な編集体験を提供。
- **IOS実機の挙動**: IOS実機で特定のノートを開こうとすると画面が真っ白になるので修正したいが、原因がわからない

---


