import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// データファイルパス
const DATA_FILE = path.join(process.cwd(), 'app/data/leads.json');

// 型定義
export interface Lead {
    id: string;
    name?: string;
    phone?: string;
    carModel?: string;
    year?: string;
    mileage?: string;
    address?: string;
    status: 'new' | 'contacted' | 'closed';
    createdAt: string;
}

// データ読み込みヘルパー
const getLeads = (): Lead[] => {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

// データ保存ヘルパー
const saveLeads = (leads: Lead[]) => {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
};

// GET: 全件取得
export async function GET() {
    const leads = getLeads();
    return NextResponse.json(leads);
}

// POST: 新規保存
export async function POST(request: Request) {
    const body = await request.json();
    const leads = getLeads();

    const newLead: Lead = {
        id: Date.now().toString(),
        ...body,
        status: 'new',
        createdAt: new Date().toISOString(),
    };

    leads.unshift(newLead);
    saveLeads(leads);

    // 通知メール送信（非同期で実行し、APIレスポンスを待たせない）
    sendNotificationEmail(newLead).catch(console.error);

    return NextResponse.json(newLead);
}

// ------ メール通知ロジック ------

const sendNotificationEmail = async (lead: Lead) => {
    // ※本来は環境変数で管理すべき情報
    // ここではGmailや独自ドメインのSMTP設定を行いますが、
    // 未設定の場合はコンソールに出力するだけにします。

    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    */

    // 通知内容の作成
    const message = `
【新規査定依頼】チャットボットから連絡がありました

■お客様情報
お名前: ${lead.name || '未入力'}
連絡先: ${lead.phone || '未入力'}
住所: ${lead.address || '未入力'}

■車両情報
車種: ${lead.carModel || '未入力'}
年式: ${lead.year || '未入力'}
走行距離: ${lead.mileage || '未入力'}

--------------------------------
確認URL: http://localhost:3000/admin
`;

    console.log("---------------------------------------------------");
    console.log("【メール送信シミュレーション】");
    console.log(`To: 管理者様`);
    console.log(message);
    console.log("---------------------------------------------------");

    // 実装時は以下のように送信します
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: 'your-email@example.com', // 管理者のメールアドレス
    //   subject: '【新規査定依頼】チャットボットから連絡がありました',
    //   text: message,
    // });
};
