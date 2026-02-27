import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, phone, email, content, captchaToken } = await req.json();

        // reCAPTCHA v3 検証
        const captchaRes = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
            { method: "POST" }
        );
        const captchaData = await captchaRes.json();

        if (!captchaData.success || captchaData.score < 0.5) {
            return NextResponse.json(
                { success: false, message: "reCAPTCHA検証に失敗しました。もう一度お試しください。" },
                { status: 400 }
            );
        }

        // メール送信
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"出張買取サポート札幌 問い合わせフォーム" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_TO_EMAIL || "support@ansinjp.com",
            replyTo: email,
            subject: `【お問い合わせ】${name} 様より`,
            text: `
お名前: ${name}
電話番号: ${phone}
メール: ${email}

お問い合わせ内容:
${content}
      `.trim(),
            html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
  <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 8px;">お問い合わせが届きました</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; background: #f8fafc; font-weight: bold; width: 120px;">お名前</td><td style="padding: 8px;">${name}</td></tr>
    <tr><td style="padding: 8px; background: #f8fafc; font-weight: bold;">電話番号</td><td style="padding: 8px;">${phone}</td></tr>
    <tr><td style="padding: 8px; background: #f8fafc; font-weight: bold;">メール</td><td style="padding: 8px;">${email}</td></tr>
  </table>
  <h3 style="color: #475569; margin-top: 16px;">お問い合わせ内容</h3>
  <div style="background: #f8fafc; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${content}</div>
  <p style="color: #94a3b8; font-size: 12px; margin-top: 16px;">このメールは出張買取サポート札幌のお問い合わせフォームから自動送信されました。</p>
</div>
      `,
        });

        return NextResponse.json({ success: true, message: "お問い合わせを受け付けました。" });
    } catch (err) {
        console.error("Contact form error:", err);
        return NextResponse.json(
            { success: false, message: "送信に失敗しました。お電話でお問い合わせください。" },
            { status: 500 }
        );
    }
}
