import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const privacyContent = `
# Privacy Policy

**Last Updated: March 7, 2026**

TROIKA DRIVE ("we," "us," or "our") operates the Project1 SmartStore Instagram chatbot service (the "Service"). This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our Service through Instagram Direct Messages.

By using our Service, you agree to the collection and use of information as described in this Privacy Policy.

---

## 1. Information We Collect

### 1.1 Information Collected Automatically

When you send a message to our Instagram account, we automatically receive and store:

- **Instagram User ID**: Your unique, platform-scoped Instagram identifier provided by Meta.
- **Message Content**: The text of messages you send to our Instagram account.
- **Timestamp**: The date and time of each message.

### 1.2 Information from Instagram (Meta Platform)

Through the Instagram Graph API, we may access:

- **Profile Information**: Your Instagram display name and profile picture, as made available by Meta's API.

### 1.3 Information We Do NOT Collect

We do **not** collect:

- Passwords or login credentials
- Payment or financial information (credit card numbers, bank accounts)
- Precise geolocation data
- Contacts, photos, or media from your device
- Data from other Instagram users you interact with
- Any data from minors under the age of 13

---

## 2. How We Use Your Information

We use the collected information solely for the following purposes:

- **Customer Service**: To respond to your product inquiries, provide shopping assistance, and answer questions about our store via automated AI-powered chatbot.
- **Service Improvement**: To analyze conversation patterns and improve the quality and accuracy of our chatbot responses.
- **Order Support**: To assist with product recommendations, pricing information, shipping and return policy inquiries.
- **Logging**: To maintain conversation logs for quality assurance and troubleshooting purposes.

We do **not** use your information for:

- Advertising or marketing to third parties
- Selling or renting your data to any third party
- Profiling or automated decision-making that produces legal effects
- Training AI models on your personal conversations (conversations are used only for real-time response generation)

---

## 3. Data Storage and Security

### 3.1 Storage

- Conversation data is stored in **Google Firebase Realtime Database**, hosted on Google Cloud infrastructure.
- Our servers are hosted on **Google Cloud Run** (region: us-west1).
- Data is encrypted in transit (TLS/HTTPS) and at rest (Google Cloud default encryption).

### 3.2 Retention

- **Chat logs** are retained for a maximum of **30 days**, after which they are automatically deleted.
- **Processed message IDs** (used solely for deduplication) are retained for **7 days**.
- You may request immediate deletion of your data at any time (see Section 6).

### 3.3 Security Measures

We implement appropriate technical and organizational measures to protect your data, including:

- HTTPS encryption for all data in transit
- Access-controlled cloud infrastructure (Google Cloud IAM)
- No storage of sensitive financial or authentication data
- Regular security reviews

---

## 4. Data Sharing and Third Parties

### 4.1 Service Providers

We use the following third-party services to operate our Service:

| Provider | Purpose | Data Shared |
|----------|---------|-------------|
| **Meta (Instagram)** | Messaging platform | Messages sent/received via Instagram API |
| **Google Cloud (Firebase)** | Data storage | Conversation logs (encrypted) |
| **Naver Commerce API** | Product catalog | No user data shared — product data only |

### 4.2 We Do NOT

- Sell your personal data to any third party
- Share your data with advertisers
- Transfer your data to data brokers
- Provide your data to any entity not listed above

### 4.3 Legal Requirements

We may disclose your information if required by law, legal process, or governmental request, or to protect the rights, safety, or property of our users or the public.

---

## 5. Your Rights

Depending on your jurisdiction, you may have the following rights:

### 5.1 For All Users

- **Access**: Request a copy of the data we hold about you.
- **Deletion**: Request deletion of your data at any time.
- **Opt-Out**: Stop using the Service at any time by ceasing to message our Instagram account.

### 5.2 For EU/EEA Users (GDPR)

- Right to rectification
- Right to data portability
- Right to restrict processing
- Right to object to processing
- Right to lodge a complaint with a supervisory authority

### 5.3 For California Users (CCPA)

- Right to know what personal information is collected
- Right to delete personal information
- Right to opt-out of the sale of personal information (we do not sell your data)
- Right to non-discrimination for exercising your rights

### 5.4 For Korean Users (개인정보보호법)

- 개인정보 열람 요구권
- 개인정보 정정·삭제 요구권
- 개인정보 처리정지 요구권

---

## 6. Data Deletion

### 6.1 Automatic Deletion

Chat logs are automatically deleted after 30 days.

### 6.2 Manual Deletion Request

To request immediate deletion of all your data, contact us at:

- **Email**: privacy@troikadrive.com
- **Instagram DM**: Send "DELETE MY DATA" to our Instagram account

We will process deletion requests within **7 business days**.

### 6.3 Meta Data Deletion Callback

We support Meta's data deletion request callback. When you remove our app from your Facebook/Instagram settings, we automatically delete all data associated with your account.

---

## 7. Children's Privacy

Our Service is not intended for children under the age of 13 (or under 16 in the EU/EEA). We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will promptly delete it.

---

## 8. International Data Transfers

Your data may be transferred to and processed in countries other than your own, including the United States (Google Cloud servers). We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.

---

## 9. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the "Last Updated" date at the top of this page. Continued use of the Service after changes constitutes acceptance of the updated policy.

---

## 10. Contact Us

If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:

- **Email**: privacy@troikadrive.com
- **Website**: https://troikadrive.com
- **Business Name**: TROIKA DRIVE
- **Address**: Gyeonggi-do, Republic of Korea

---

# 개인정보처리방침

**최종 수정일: 2026년 3월 7일**

TROIKA DRIVE("회사")는 Project1 SmartStore Instagram 챗봇 서비스("서비스")를 운영합니다. 본 개인정보처리방침은 Instagram 다이렉트 메시지를 통해 서비스를 이용할 때 수집, 이용, 보관하는 정보에 대해 설명합니다.

---

## 1. 수집하는 개인정보

### 자동 수집 정보
- **Instagram 사용자 ID**: Meta에서 제공하는 플랫폼 고유 식별자
- **메시지 내용**: 당사 Instagram 계정으로 보내신 메시지 텍스트
- **타임스탬프**: 각 메시지의 날짜 및 시간

### Instagram API를 통해 접근 가능한 정보
- **프로필 정보**: Instagram 표시 이름 및 프로필 사진

### 수집하지 않는 정보
- 비밀번호 또는 로그인 정보
- 결제 또는 금융 정보
- 정밀 위치 정보
- 기기의 연락처, 사진, 미디어
- 만 13세 미만 아동의 데이터

---

## 2. 개인정보의 이용 목적

- **고객 서비스**: AI 챗봇을 통한 상품 문의 응답, 쇼핑 안내
- **서비스 개선**: 대화 패턴 분석을 통한 챗봇 품질 향상
- **주문 지원**: 상품 추천, 가격, 배송/반품 정책 안내
- **로그 관리**: 품질 보증 및 문제 해결을 위한 대화 로그 유지

개인정보를 제3자 광고, 데이터 판매, 프로파일링 목적으로 사용하지 않습니다.

---

## 3. 개인정보의 보관 및 보안

- **저장소**: Google Firebase Realtime Database (Google Cloud 인프라)
- **서버**: Google Cloud Run (us-west1 리전)
- **암호화**: 전송 중 TLS/HTTPS, 저장 시 Google Cloud 기본 암호화
- **보관 기간**: 채팅 로그 최대 30일, 이후 자동 삭제
- **중복 확인용 메시지 ID**: 7일 보관

---

## 4. 개인정보의 제3자 제공

| 제공받는 자 | 목적 | 제공 항목 |
|------------|------|----------|
| Meta (Instagram) | 메시징 플랫폼 | Instagram API를 통한 메시지 송수신 |
| Google Cloud (Firebase) | 데이터 저장 | 대화 로그 (암호화) |
| 네이버 커머스 API | 상품 카탈로그 | 사용자 데이터 미제공 — 상품 데이터만 |

개인정보를 광고주, 데이터 브로커 등 제3자에게 판매하지 않습니다.

---

## 5. 정보주체의 권리

- **열람권**: 보유 중인 데이터 사본 요청
- **삭제권**: 언제든지 데이터 삭제 요청 가능
- **처리정지권**: Instagram 계정으로의 메시지 전송을 중단하여 서비스 이용 중지
- **정정권**: 부정확한 데이터의 수정 요청

---

## 6. 개인정보 삭제

- **자동 삭제**: 채팅 로그 30일 후 자동 삭제
- **수동 삭제 요청**: privacy@troikadrive.com으로 연락하거나 Instagram DM으로 "DELETE MY DATA" 전송
- **처리 기간**: 영업일 기준 7일 이내
- **Meta 데이터 삭제 콜백**: Facebook/Instagram 설정에서 앱 제거 시 자동 삭제

---

## 7. 아동의 개인정보

만 13세 미만 아동(EU/EEA의 경우 16세 미만)을 대상으로 하지 않으며, 아동의 개인정보를 고의로 수집하지 않습니다.

---

## 8. 연락처

- **이메일**: privacy@troikadrive.com
- **웹사이트**: https://troikadrive.com
- **사업자명**: TROIKA DRIVE
`;

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase text-xs tracking-widest mb-12 hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="markdown-body prose prose-slate max-w-none">
          <ReactMarkdown>{privacyContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
