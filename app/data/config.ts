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

// 車種データ定義
export interface Vehicle {
  name: string;
  slug: string;
  categorySlug: string; // どのカテゴリに属するか
  maker: string;
  description: string;
  features: string[];
  keywords: string[];
}


export const TARGET_VEHICLES: Vehicle[] = [
  // トラック系
  {
    name: "エルフ",
    slug: "elf",
    categorySlug: "truck",
    maker: "いすゞ",
    description: "小型トラックの代名詞・エルフ。平ボディからダンプ、ユニックまで幅広く高価買取。",
    features: ["国内シェアNo.1の人気車種", "海外需要が高く古くても高値", "2t/3tクラス強化買取中"],
    keywords: ["NJR", "NKR", "平ボディ", "ダブルキャブ"],
  },
  {
    name: "キャンター",
    slug: "canter",
    categorySlug: "truck",
    maker: "三菱ふそう",
    description: "粘り強い走りのキャンター。建設現場や配送で使い込まれた車両も大歓迎。",
    features: ["頑丈なフレームで海外人気大", "古い年式でも部品価値あり", "ガッツも高価買取"],
    keywords: ["ブルーテック", "ダンプ", "ユニック", "4WD"],
  },
  {
    name: "ダイナ",
    slug: "dyna",
    categorySlug: "truck",
    maker: "トヨタ",
    description: "トヨタの信頼性・ダイナ。1tクラスから広く流通しており、どんな状態でも買取可能。",
    features: ["トヨタブランドで安定した人気", "ガソリン車も海外で需要あり", "トヨエースも同額査定"],
    keywords: ["ジャストロー", "カーゴ", "ルートバン"],
  },
  {
    name: "フォワード",
    slug: "forward",
    categorySlug: "truck",
    maker: "いすゞ",
    description: "中型トラックの定番・フォワード。増トン車やクレーン付きは特に高額査定。",
    features: ["4tクラスのベストセラー", "過走行でもエンジン価値が高い", "ユニック車はさらにプラス"],
    keywords: ["FRR", "FSR", "増トン", "平ボディ"],
  },
  {
    name: "レンジャー",
    slug: "ranger",
    categorySlug: "truck",
    maker: "日野",
    description: "パリダカでも有名なレンジャー。耐久性が高く、走行50万km超えでも問題なし。",
    features: ["ヒノノニトンでおなじみ", "海外での信頼性抜群", "プロフィアも相談可"],
    keywords: ["FD", "FC", "ユニック", "ダンプ"],
  },
  {
    name: "デュトロ",
    slug: "dutro",
    categorySlug: "truck",
    maker: "日野",
    description: "スマートな小型トラック・デュトロ。市街地配送で使われた車両も高価買取。",
    features: ["ハイブリッド車も買取強化", "ダイナの兄弟車", "AT車も需要あり"],
    keywords: ["エアループ", "ハイブリッド", "アルミバン"],
  },

  // ハイエース・バン系
  {
    name: "ハイエースバン",
    slug: "hiace-van",
    categorySlug: "hiace",
    maker: "トヨタ",
    description: "キングオブ商用車・ハイエース。ボロボロ、過走行、事故車でも驚きの価格。",
    features: ["世界中で奪い合いになる人気", "100系・200系問わず高値", "ディーゼル4WDは最強"],
    keywords: ["スーパーGL", "DX", "ロング", "ハイルーフ"],
  },
  {
    name: "レジアスエース",
    slug: "regiusace",
    categorySlug: "hiace",
    maker: "トヨタ",
    description: "ハイエースの兄弟車・レジアスエース。中身は同じなので、もちろん同様に高価買取。",
    features: ["ハイエースと同等の査定額", "エンブレム違いなだけ", "販売終了モデルも人気"],
    keywords: ["バン", "ディーゼル", "4WD"],
  },
  {
    name: "NV350キャラバン",
    slug: "caravan",
    categorySlug: "hiace",
    maker: "日産",
    description: "日産の主力商用バン・キャラバン。仕事で使い倒した車両も大歓迎。",
    features: ["プレミアムGX高価買取", "ディーゼル4WDは人気", "E25/E26型問わず"],
    keywords: ["ライダー", "ロング", "ターボ"],
  },
  {
    name: "ボンゴバン",
    slug: "bongo",
    categorySlug: "hiace",
    maker: "マツダ",
    description: "使い勝手の良いボンゴバン。低床・広床、どんなタイプでも買取ります。",
    features: ["4WD車は特に北海道で人気", "バネットも同額査定", "ディーゼル車歓迎"],
    keywords: ["GL", "DX", "4WD"],
  },
  {
    name: "タウンエースバン",
    slug: "townace",
    categorySlug: "hiace",
    maker: "トヨタ",
    description: "ジャストサイズのタウンエース。配送業や職人さんに人気の車両。",
    features: ["402系/403系高価買取", "ライトエースもOK", "コンパクトで海外人気"],
    keywords: ["GL", "DX", "4WD"],
  },

  // 重機系
  {
    name: "ユンボ（油圧ショベル）",
    slug: "excavator",
    categorySlug: "heavy-equipment",
    maker: "コマツ・コベルコ他",
    description: "工事現場の主役・ユンボ。ミニユンボから超大型まで、動かなくても買取。",
    features: ["PCシリーズ高価買取", "ゴムキャタ・鉄キャタ不問", "アタッチメントも評価"],
    keywords: ["PC30", "PC50", "SK", "ZX"],
  },
  {
    name: "ホイールローダー",
    slug: "wheel-loader",
    categorySlug: "heavy-equipment",
    maker: "コマツ・CAT他",
    description: "除雪の必需品・ホイールローダー（タイヤショベル）。冬の北海道で最強買取。",
    features: ["除雪仕様はプラス査定", "WAシリーズ人気", "古くてもエンジンさえかかればOK"],
    keywords: ["WA100", "WA30", "910", "ZG"],
  },
  {
    name: "フォークリフト",
    slug: "forklift",
    categorySlug: "heavy-equipment",
    maker: "トヨタ・コマツ他",
    description: "物流を支えるフォークリフト。バッテリー式、エンジン式問わず買取。",
    features: ["トヨタL&F人気", "ディーゼル車は高値", "ツメが長くても古くてもOK"],
    keywords: ["ジェネオ", "FD25", "FG20"],
  },

  // 軽自動車
  {
    name: "軽トラック（キャリイ・ハイゼット）",
    slug: "kei-truck",
    categorySlug: "keivan",
    maker: "スズキ・ダイハツ",
    description: "日本の宝・軽トラ。キャリイ、ハイゼット、サンバー、アクティなど全車種対応。",
    features: ["農家の相棒を高価買取", "ダンプ・4WDはプラス査定", "エアコンなしでもOK"],
    keywords: ["農繁", "ジャンボ", "スーパーキャリイ"],
  },
  {
    name: "軽バン（エブリイ・ハイゼットカーゴ）",
    slug: "kei-van-cargo",
    categorySlug: "keivan",
    maker: "スズキ・ダイハツ",
    description: "配送・仕事に・エブリイなどの軽バン。黒ナンバー車の廃車もお任せ。",
    features: ["ジョイン・クルーズターボ人気", "過走行でも需要あり", "配達仕様車もOK"],
    keywords: ["ジョイン", "クルーズ", "デッキバン"],
  },
  {
    name: "ジムニー",
    slug: "jimny",
    categorySlug: "kei",
    maker: "スズキ",
    description: "軽オフロードの王者・ジムニー。古い2スト車から最新型まで、どんな状態でも買取。",
    features: ["ボロボロでも価値あり", "JA11/JA22人気", "改造車・リフトアップも評価"],
    keywords: ["JA11", "JB23", "JB64", "ランドベンチャー"],
  },
];

// サイト情報
export const SITE_INFO = {
  name: "出張買取サポート札幌",
  domain: "ansin-kaitori-sapporo.com",
  phone: "050-1724-2478",
  phoneGuidance: "音声ガイダンスに従ってお問い合わせください",
  established: "15年",
  tagline: "海外輸出直販だからできる高価買取",
};
