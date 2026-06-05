import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const termsContent = `
# Terms of Service

**Last Updated: March 7, 2026**

Welcome to the Project1 SmartStore chatbot service ("Service") operated by TROIKA DRIVE ("we," "us," or "our"). These Terms of Service ("Terms") govern your use of our automated customer service chatbot available through Instagram Direct Messages.

By sending a message to our Instagram account, you agree to be bound by these Terms.

---

## 1. Description of Service

Our Service provides an AI-powered customer service chatbot that:

- Responds to product inquiries about our SmartStore catalog
- Provides pricing, availability, and shipping information
- Assists with product recommendations
- Answers questions about store policies (shipping, returns, payments)

The Service operates through Instagram Direct Messages using the Meta (Instagram) Messaging API.

---

## 2. Eligibility

You must be at least 13 years old (or 16 in the EU/EEA) to use this Service. By using the Service, you represent that you meet this age requirement.

---

## 3. Acceptable Use

When using our Service, you agree NOT to:

- Send abusive, threatening, or harassing messages
- Attempt to exploit, hack, or interfere with the Service
- Use the Service for any illegal purpose
- Send spam or bulk automated messages
- Impersonate another person or entity
- Attempt to extract or reverse-engineer the AI system
- Use the Service to collect information about other users

---

## 4. AI-Generated Responses

### 4.1 Nature of Responses

Our chatbot uses artificial intelligence (Google Gemini) to generate responses. Please be aware that:

- Responses are generated automatically and may not always be perfectly accurate.
- Product information (prices, stock, availability) is sourced from our Naver SmartStore catalog and is subject to change.
- The chatbot is not a substitute for human customer service for complex issues.

### 4.2 No Guarantee

We strive for accuracy but do **not guarantee** that:

- All product information is current or error-free
- The chatbot will be available 24/7 without interruption
- AI responses will address every possible customer need
- Prices or availability shown by the chatbot are final

### 4.3 Binding Offers

Chatbot responses do **not** constitute legally binding offers. Actual purchases are completed through our Naver SmartStore, and those transactions are governed by Naver's terms and conditions.

---

## 5. Intellectual Property

- All content, branding, and technology of the Service are owned by TROIKA DRIVE.
- Product images and descriptions are sourced from our Naver SmartStore catalog.
- You may not copy, reproduce, or distribute any content from the Service without our written permission.

---

## 6. Limitation of Liability

To the maximum extent permitted by applicable law:

- The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind.
- We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
- Our total liability for any claim related to the Service shall not exceed $100 USD.
- We are not responsible for any loss or damage resulting from reliance on chatbot responses.

---

## 7. Service Availability

- We aim to keep the Service available at all times but do not guarantee uninterrupted access.
- We may modify, suspend, or discontinue the Service at any time without prior notice.
- Scheduled maintenance may occasionally affect availability.

---

## 8. Termination

- We reserve the right to block or restrict access to the Service for users who violate these Terms.
- You may stop using the Service at any time by ceasing to send messages to our Instagram account.

---

## 9. Third-Party Platforms

The Service operates on Instagram, which is owned by Meta Platforms, Inc. Your use of Instagram is governed by Meta's own Terms of Service and Privacy Policy. We are not responsible for Meta's practices or policies.

---

## 10. Governing Law

These Terms are governed by and construed in accordance with the laws of the Republic of Korea, without regard to conflict of law principles. For international users, any disputes shall be resolved in the courts of Seoul, Republic of Korea.

---

## 11. Changes to Terms

We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.

---

## 12. Contact Us

For questions about these Terms:

- **Email**: support@troikadrive.com
- **Website**: https://troikadrive.com
- **Business Name**: TROIKA DRIVE

---

# 이용약관

**최종 수정일: 2026년 3월 7일**

본 이용약관은 TROIKA DRIVE("회사")가 운영하는 Project1 SmartStore 챗봇 서비스("서비스")의 이용에 관한 사항을 규정합니다.

---

## 1. 서비스 설명

본 서비스는 Instagram DM을 통해 다음 기능을 제공하는 AI 기반 고객 서비스 챗봇입니다:
- 스마트스토어 상품 문의 응답
- 가격, 재고, 배송 정보 제공
- 상품 추천
- 매장 정책 안내

---

## 2. 이용 자격

만 13세 이상(EU/EEA의 경우 16세 이상)이어야 서비스를 이용할 수 있습니다.

---

## 3. 금지 행위

- 욕설, 위협, 괴롭힘 메시지 전송
- 서비스 해킹 또는 방해 시도
- 불법 목적으로의 이용
- 스팸 또는 대량 자동 메시지 전송
- 타인 사칭
- AI 시스템 추출 또는 역공학 시도

---

## 4. AI 응답에 관한 사항

- AI가 자동으로 생성한 응답이며 항상 정확하지 않을 수 있습니다.
- 상품 정보는 네이버 스마트스토어에서 가져오며 변경될 수 있습니다.
- 챗봇 응답은 법적 구속력 있는 제안이 아닙니다. 실제 구매는 네이버 스마트스토어에서 이루어집니다.

---

## 5. 면책 조항

- 서비스는 "있는 그대로" 제공되며 어떠한 보증도 하지 않습니다.
- 챗봇 응답에 의존하여 발생한 손실에 대해 책임지지 않습니다.
- 서비스를 사전 통지 없이 수정, 중단, 종료할 수 있습니다.

---

## 6. 준거법

본 약관은 대한민국 법률에 따라 해석됩니다. 분쟁 발생 시 서울 소재 법원을 관할 법원으로 합니다.

---

## 7. 연락처

- **이메일**: support@troikadrive.com
- **웹사이트**: https://troikadrive.com
- **사업자명**: TROIKA DRIVE
`;

export default function Terms() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase text-xs tracking-widest mb-12 hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="markdown-body prose prose-slate max-w-none">
          <ReactMarkdown>{termsContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
