// =============================================
// 地域 × カテゴリ データ設定
// =============================================

export interface Area {
  name: string;
  slug: string;
  description: string;
}

export interface Category {
  name: string;
  slug: string;
  shortName: string;
  description: string;
  painPoints: string[];
  features: string[];
}

// 対象地域
export const TARGET_AREAS: Area[] = [
  { name: "札幌市", slug: "sapporo", description: "北海道の中心都市・札幌" },
  { name: "江別市", slug: "ebetsu", description: "札幌のベッドタウン・江別" },
  { name: "北広島市", slug: "kitahiroshima", description: "ボールパークの街・北広島" },
  { name: "小樽市", slug: "otaru", description: "歴史ある港町・小樽" },
  { name: "千歳市", slug: "chitose", description: "空港のある街・千歳" },
  { name: "石狩市", slug: "ishikari", description: "日本海沿いの街・石狩" },
  { name: "恵庭市", slug: "eniwa", description: "花とガーデンの街・恵庭" },
  { name: "岩見沢市", slug: "iwamizawa", description: "空知の中心都市・岩見沢" },
];

// 対象カテゴリ
export const TARGET_CATEGORIES: Category[] = [
  {
    name: "トラック・商用車（ダイナ・エルフ等）",
    slug: "truck",
    shortName: "トラック・商用車",
    description: "トヨタ ダイナ、いすゞ エルフなどのトラック・商用車",
    painPoints: [
      "走行距離が20万km超えで下取り0円と言われた",
      "車検が切れて放置しているトラックがある",
      "古いダイナやエルフの処分に困っている",
      "廃車費用を請求されてしまった",
    ],
    features: [
      "ダイナ・エルフ等のトラック高価買取",
      "過走行・低年式でもOK",
      "海外輸出ルートで高値実現",
      "即日引取り・現金化対応",
    ],
  },
  {
    name: "ハイエース・バン",
    slug: "hiace",
    shortName: "ハイエース・バン",
    description: "トヨタ ハイエース、日産 キャラバンなどのバン",
    painPoints: [
      "走行距離が多くて査定に自信がない",
      "修復歴ありで断られた",
      "古いハイエースの処分に困っている",
      "ディーラーで下取り価格が安すぎる",
    ],
    features: [
      "ハイエースは海外需要が高く高価買取",
      "走行30万km超でもOK",
      "修復歴あり・事故車でも対応",
      "全グレード・全年式対応",
    ],
  },
  {
    name: "廃車・事故車・不動車",
    slug: "scrap",
    shortName: "廃車・事故車・不動車",
    description: "廃車・事故車・不動車・水没車",
    painPoints: [
      "事故で動かなくなった車をどうすればいいかわからない",
      "自宅に放置している不動車がある",
      "廃車の手続きが面倒で放置している",
      "レッカー代が高くて処分できない",
    ],
    features: [
      "動かない車もそのまま引取り",
      "レッカー費用0円",
      "廃車手続き代行無料",
      "パーツ・資源価値で買取",
    ],
  },
  {
    name: "農機具・重機・建設機械",
    slug: "heavy-equipment",
    shortName: "農機具・重機・建設機械",
    description: "トラクター、ユンボ、ショベルカー等の農機具・重機・建設機械",
    painPoints: [
      "使わなくなったトラクターが納屋に眠っている",
      "古いユンボを処分したいが方法がわからない",
      "農機具の買取業者が見つからない",
      "重機の輸送費が心配",
    ],
    features: [
      "トラクター・ユンボなど何でも対応",
      "自走不可でも引取りOK",
      "海外需要で高価買取実現",
      "大型機械の輸送手配もお任せ",
    ],
  },
  {
    name: "輸出向け車両（過走行車OK）",
    slug: "export",
    shortName: "輸出向け車両",
    description: "海外輸出向け車両（過走行車・低年式車OK）",
    painPoints: [
      "走行距離が多くて国内では値段がつかない",
      "年式が古くて買取を断られた",
      "車検切れで動かせない",
      "国内相場より高く売りたい",
    ],
    features: [
      "海外輸出ルートで国内相場超え",
      "走行10万km以上の車に強い",
      "幅広い車種・メーカーに対応",
      "アフリカ・東南アジア等の販路あり",
    ],
  },
];

// LINE URL プレースホルダー
export const LINE_URL = "YOUR_LINE_URL_HERE";

// サイト情報
export const SITE_INFO = {
  name: "出張買取サポート札幌",
  phone: "0120-XXX-XXX",
  established: "15年",
  tagline: "海外輸出直販だからできる高価買取",
};
