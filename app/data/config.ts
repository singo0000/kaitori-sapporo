// =============================================
// 地域 × カテゴリ データ設定
// =============================================

export interface Area {
  name: string;
  slug: string;
  description: string;
  keywords?: string[];
}

export interface Category {
  name: string;
  slug: string;
  shortName: string;
  description: string;
  painPoints: string[];
  features: string[];
  heroImage: string;
  targetVehicles?: { name: string; icon: string }[];
}

// 対象地域（地域特性データを追加）
export const TARGET_AREAS: Area[] = [
  {
    name: "札幌市",
    slug: "sapporo",
    description: "北海道の中心都市・札幌。中央区・北区・東区・白石区・豊平区・南区・西区・厚別区・手稲区・清田区の全域に対応。",
    keywords: ["除雪", "排雪", "営業車", "社用車", "過走行"]
  },
  {
    name: "江別市",
    slug: "ebetsu",
    description: "札幌のベッドタウン・江別エリア。野幌・大麻地区もお任せください。",
    keywords: ["農家", "酪農", "軽トラ", "雪害", "通勤"]
  },
  {
    name: "北広島市",
    slug: "kitahiroshima",
    description: "ボールパークの街・北広島。再開発エリアや工業団地からのご依頼も増えています。",
    keywords: ["建設機械", "重機", "再開発", "ダンプ", "資材運搬"]
  },
  {
    name: "小樽市",
    slug: "otaru",
    description: "歴史ある港町・小樽。坂道に強い4WD車や、塩害・サビのある車も高価買取。",
    keywords: ["坂道", "4WD", "塩害", "サビ", "漁業"]
  },
  {
    name: "千歳市",
    slug: "chitose",
    description: "空港のある街・千歳。自衛隊関係や空港関連の法人様からの買取実績も多数。",
    keywords: ["長距離", "レンタカー落ち", "送迎車", "法人買取", "リースアップ"]
  },
  {
    name: "石狩市",
    slug: "ishikari",
    description: "日本海沿いの街・石狩。石狩新港エリアの重機・トラック買取を強化中。",
    keywords: ["港湾", "トレーラー", "水産", "工場", "フォークリフト"]
  },
  {
    name: "恵庭市",
    slug: "eniwa",
    description: "花とガーデンの街・恵庭。ガーデニング業や農家様の軽トラ・ダンプも大歓迎。",
    keywords: ["造園", "軽ダンプ", "農業", "家庭菜園", "直売所"]
  },
  {
    name: "岩見沢市",
    slug: "iwamizawa",
    description: "空知の中心都市・岩見沢。豪雪地帯ならではの除雪車や4WDトラックを高価買取。",
    keywords: ["豪雪", "除雪車", "タイヤショベル", "農業機械", "長距離通勤"]
  },
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
    heroImage: "/hero-truck.png",
    targetVehicles: [
      { name: "平ボディ", icon: "🚚" },
      { name: "ダンプ", icon: "🚛" },
      { name: "クレーン・ユニック", icon: "🏗️" },
      { name: "アルミバン", icon: "📦" },
      { name: "冷凍・冷蔵車", icon: "❄️" },
      { name: "パッカー車", icon: "🗑️" },
    ],
  },
  {
    name: "普通車・コンパクトカー",
    slug: "general",
    shortName: "普通車",
    description: "カローラ、フィット、ヴィッツなどの普通車・コンパクトカー",
    painPoints: [
      "年式が古くて値段がつかない",
      "走行距離が多くて下取りが安い",
      "車検が切れそうで手放したい",
      "キズやヘコミがある",
    ],
    features: [
      "海外人気の高い車種を高価買取",
      "走行距離不問で査定",
      "名義変更も迅速対応",
      "即日現金化も可能",
    ],
    heroImage: "/hero-general.png",
    targetVehicles: [
      { name: "カローラ", icon: "🚗" },
      { name: "プリウス", icon: "🚗" },
      { name: "フィット", icon: "🚗" },
      { name: "ヴィッツ", icon: "🚗" },
      { name: "商用バン", icon: "🚐" },
      { name: " SUV", icon: "🚙" },
    ],
  },
  {
    name: "ハイエース・キャラバン（バン・商用車）",
    slug: "hiace",
    shortName: "ハイエース・バン",
    description: "トヨタ ハイエース、日産 キャラバンなどのバン・商用車",
    painPoints: [
      "仕事で使ってボロボロで値段がつかない",
      "走行距離が30万kmを超えている",
      "エンジンの調子が悪い",
      "シートが破れている",
    ],
    features: [
      "ハイエースは海外で圧倒的人気",
      "ボロボロ・過走行でも高価買取",
      "ディーゼル車は特に高額査定",
      "バン・商用車全般対応",
    ],
    heroImage: "/hero-hiace.png",
    targetVehicles: [
      { name: "ハイエースバン", icon: "🚐" },
      { name: "レジアスエース", icon: "🚐" },
      { name: "キャラバン", icon: "🚐" },
      { name: "タウンエース", icon: "🚐" },
      { name: "ボンゴバン", icon: "🚐" },
      { name: "プロボックス", icon: "🚗" },
    ],
  },
  {
    name: "軽自動車",
    slug: "kei",
    shortName: "軽自動車",
    description: "ワゴンR、ムーブ、タントなどの軽自動車",
    painPoints: [
      "10万キロ超えで捨てようと思っている",
      "車検費用が高いので乗り換えたい",
      "サビが出てきている",
      "エンジンから異音がする",
    ],
    features: [
      "軽自動車は部品需要が高い",
      "鉄スクラップ以上の価値を提示",
      "抹消手続き完全無料",
      "リサイクル券無くても相談可",
    ],
    heroImage: "/hero-kei.png",
    targetVehicles: [
      { name: "ワゴンR", icon: "🚗" },
      { name: "ムーブ", icon: "🚗" },
      { name: "タント", icon: "🚗" },
      { name: "N-BOX", icon: "🚗" },
      { name: "アルト", icon: "🚗" },
      { name: "ミラ", icon: "🚗" },
    ],
  },
  {
    name: "軽トラ・軽バン",
    slug: "keivan",
    shortName: "軽トラ・軽バン",
    description: "キャリイ、ハイゼット、エブリイなどの軽トラ・軽バン",
    painPoints: [
      "農作業で泥だらけで汚い",
      "荷台がサビて穴が開いている",
      "エンジンがかかりにくい",
      "ボロボロだが売れるか心配",
    ],
    features: [
      "軽トラは海外で大人気",
      "ボロボロ・サビサビでも高価買取",
      "農機具もまとめて査定OK",
      "動かなくても引取無料",
    ],
    heroImage: "/hero-keivan.png",
    targetVehicles: [
      { name: "キャリイ", icon: "🛻" },
      { name: "ハイゼット", icon: "🛻" },
      { name: "サンバー", icon: "🛻" },
      { name: "アクティ", icon: "🛻" },
      { name: "エブリイ", icon: "🚐" },
      { name: "ミニキャブ", icon: "🛻" },
    ],
  },
  {
    name: "廃車・事故車・不動車",
    slug: "scrap",
    shortName: "廃車・事故車",
    description: "事故車、水没車、エンジン不動車などの廃車予定車両",
    painPoints: [
      "事故で動かなくなってしまった",
      "修理代が高額で直せない",
      "車検が切れて放置している",
      "処分費用がかかると言われた",
    ],
    features: [
      "レッカー代・引取費用無料",
      "どんな状態でも0円以上保証",
      "廃車手続き代行無料",
      "部品取りとして価値を評価",
    ],
    heroImage: "/hero-scrap.png",
    targetVehicles: [
      { name: "事故車", icon: "💥" },
      { name: "水没車", icon: "🌊" },
      { name: "不動車", icon: "🛑" },
      { name: "車検切れ", icon: "📅" },
      { name: "低年式車", icon: "👴" },
      { name: "過走行車", icon: "🏃" },
    ],
  },
  {
    name: "重機・建設機械（ユンボ・フォークリフト等）",
    slug: "heavy-equipment",
    shortName: "重機・建機",
    description: "ユンボ、フォークリフト、ホイールローダーなどの重機・建設機械",
    painPoints: [
      "古くて動かない重機がある",
      "赤サビだらけで処分に困っている",
      "アタッチメントしかない",
      "型式が古すぎる",
    ],
    features: [
      "動かなくても全然OK",
      "パーツだけでも買取可能",
      "重量物の搬出もお任せ",
      "海外輸出で高額査定",
    ],
    heroImage: "/hero-heavy.png",
    targetVehicles: [
      { name: "油圧ショベル", icon: "🚜" },
      { name: "ユンボ", icon: "🚜" },
      { name: "ホイールローダー", icon: "🚜" },
      { name: "フォークリフト", icon: "🚜" },
      { name: "ブルドーザー", icon: "🚜" },
      { name: "発電機・コンプレッサー", icon: "⚡" },
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
    heroImage: "/hero-export.png",
  },
];

// LINE URL プレースホルダー
export const LINE_URL = "https://lin.ee/KNy4lHy";

// サイト情報
export const SITE_INFO = {
  name: "出張買取サポート札幌",
  domain: "ansin-kaitori-sapporo.com",
  phone: "050-1724-2478",
  phoneGuidance: "音声ガイダンスに従ってお問い合わせください",
  established: "15年",
  tagline: "海外輸出直販だからできる高価買取",
};
