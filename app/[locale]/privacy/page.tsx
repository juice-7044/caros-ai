import catalog from "@/messages/full/forms-legal.es.json"
import { getLocale } from "next-intl/server"
import { spanishTranslator, translateSpanishData } from "@/lib/spanish"
import type { Metadata } from "next"
import Link from "next/link"
import {
  LegalDoc,
  LegalSection,
  LegalSubheading,
  LegalP,
  LegalList,
  type TocEntry,
} from "@/components/caros/legal/legal-doc"
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_EMAIL_HREF } from "@/lib/site"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return translateSpanishData({
  title: "Privacy Policy",
  description:
    "How CAROS collects, uses, maintains, protects, and discloses information from visitors and clients of our website and services.",
  alternates: { canonical: "/privacy" },
}, locale, catalog)
}

const EmailLink = () => (
  <Link href={COMPANY_EMAIL_HREF} className="font-medium text-gold underline-offset-4 hover:underline">
    {COMPANY_EMAIL}
  </Link>
)

const toc: TocEntry[] = [
  { id: "introduction", title: "1. Introduction" },
  { id: "collect", title: "2. Information We Collect" },
  { id: "use", title: "3. How We Use Your Information" },
  { id: "disclosure", title: "4. Disclosure of Your Information" },
  { id: "security", title: "5. Data Processing and Security" },
  { id: "retention", title: "6. Data Retention" },
  { id: "rights", title: "7. Your Rights and Choices" },
  { id: "third-party", title: "8. Third-Party Services" },
  { id: "cookies", title: "9. Cookies and Tracking" },
  { id: "children", title: "10. Children's Privacy" },
  { id: "changes", title: "11. Changes to This Policy" },
  { id: "contact", title: "12. Contact Information" },
]

export default async function PrivacyPage() {
  const locale = await getLocale()
  const tr = spanishTranslator(locale, catalog)
  return (
    <LegalDoc
      eyebrow={tr("Legal")}
      title={tr("Privacy")}
      serifTitle={tr("Policy.")}
      lastUpdated={tr("August 9, 2026")}
      intro={tr("This policy describes what information we collect, how we use it, and the choices you have. Your privacy matters to us.")}
      toc={translateSpanishData(toc, locale, catalog)}
    >
      <LegalSection n={1} id="introduction" title={tr("Introduction")}>
        <LegalP>
          {COMPANY_NAME} {tr("(“CAROS,” “we,” “us,” or “our”) respects your privacy and is committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website getcaros.com (our “Website”) and our practices for collecting, using, maintaining, protecting, and disclosing that information.")} </LegalP>
        <LegalP>{tr("This Privacy Policy applies to information we collect:")}</LegalP>
        <LegalList
          items={[
            tr("On the Website."),
            tr("In email, text, and other electronic messages between you and the Website."),
            tr("Through the CAROS Revenue Operating System and related services (the “Services”)."),
          ]}
        />
        <LegalP> {tr("It does not apply to information collected by us offline or through any other means, including on any other website operated by CAROS or any third party. Please read this Privacy Policy carefully. If you do not agree with our policies and practices, your choice is not to use our Website. By accessing or using the Website, you agree to this Privacy Policy.")} </LegalP>
      </LegalSection>

      <LegalSection n={2} id="collect" title={tr("Information We Collect About You")}>
        <LegalSubheading>{tr("2.1 Personal Information You Provide to Us")}</LegalSubheading>
        <LegalP>{tr("We collect information that you provide directly to us, including:")}</LegalP>
        <LegalList
          items={[
            tr("Contact Information: Name, email address, postal address, phone number, and other similar contact data."),
            tr("Business Information: Company name, industry, service area, website URL, approximate annual revenue, number of employees, approximate monthly leads, and other business details."),
            tr("Account Information: Username, password, and other credentials used to access the Services."),
            tr("Communication Information: Information you provide when you contact us, request a Revenue Audit, fill out forms, or otherwise communicate with us."),
            tr("Diagnostic Tool Information: Information entered into the Revenue Leak Diagnostic tool, including average job value, missed calls per month, close rate, and other business metrics."),
            tr("Service Order Information: Information provided during the onboarding process, including integration details, third-party account access, and configuration preferences."),
          ]}
        />

        <LegalSubheading>{tr("2.2 Information We Collect Automatically")}</LegalSubheading>
        <LegalP>{tr("When you access or use the Website, we automatically collect:")}</LegalP>
        <LegalList
          items={[
            tr("Usage Details: Details of your visits to the Website, including traffic data, location data, logs, and other communication data and the resources that you access and use."),
            tr("Device Information: Information about your computer, mobile device, and internet connection, including your IP address, operating system, browser type, and device identifiers."),
            tr("Cookies and Similar Technologies: We use cookies, web beacons, and other tracking technologies to collect information about your browsing activities. See Section 9 for more information."),
          ]}
        />

        <LegalSubheading>{tr("2.3 Information from Third Parties")}</LegalSubheading>
        <LegalP> {tr("We may receive information about you from third parties, including business partners, service providers, social media platforms, and publicly available sources.")} </LegalP>
      </LegalSection>

      <LegalSection n={3} id="use" title={tr("How We Use Your Information")}>
        <LegalP> {tr("We use the information we collect about you or that you provide to us for the following purposes:")} </LegalP>
        <LegalList
          items={[
            tr("To provide, maintain, and improve the Website and Services."),
            tr("To process and complete transactions, including billing and payment processing."),
            tr("To provide customer support and respond to your inquiries."),
            tr("To send you technical notices, updates, security alerts, and support messages."),
            tr("To communicate with you about products, services, offers, promotions, and events."),
            tr("To conduct research and analysis to improve our Website and Services."),
            tr("To monitor and analyze trends, usage, and activities."),
            tr("To detect, investigate, and prevent fraudulent transactions and other illegal activities."),
            tr("To personalize and improve the Website and deliver content matching user profiles or interests."),
            tr("To carry out any other purpose described to you at the time the information was collected."),
          ]}
        />
      </LegalSection>

      <LegalSection n={4} id="disclosure" title={tr("Disclosure of Your Information")}>
        <LegalP>{tr("We may disclose aggregated information about our users without restriction.")}</LegalP>
        <LegalP> {tr("We may disclose personal information that we collect or you provide as described in this Privacy Policy:")} </LegalP>
        <LegalList
          items={[
            tr("To our subsidiaries and affiliates."),
            tr("To contractors, service providers, and other third parties we use to support our business, who are bound by contractual obligations to keep personal information confidential."),
            tr("To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of CAROS's assets."),
            tr("To fulfill the purpose for which you provide it."),
            tr("For any other purpose disclosed by us when you provide the information."),
            tr("With your consent."),
          ]}
        />
        <LegalP>{tr("We may also disclose your personal information:")}</LegalP>
        <LegalList
          items={[
            tr("To comply with any court order, law, or legal process, including to respond to any government or regulatory request."),
            tr("To enforce or apply our Terms of Use and other agreements."),
            tr("If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of CAROS, our customers, or others."),
          ]}
        />
      </LegalSection>

      <LegalSection n={5} id="security" title={tr("Data Processing and Security")}>
        <LegalSubheading>{tr("5.1 Data Processing")}</LegalSubheading>
        <LegalP> {tr("CAROS processes personal information only to provide, secure, support, improve, and administer the Services; comply with documented instructions; prevent fraud and abuse; and comply with law. We characterize our role as a service provider / processor with respect to Client Data, and as a business / controller with respect to Website visitor data.")} </LegalP>

        <LegalSubheading>{tr("5.2 Categories of Data")}</LegalSubheading>
        <LegalP> {tr("Data we process may include customer/prospect names, contact details, communications, call recordings and transcripts if enabled, service inquiries, appointment and estimate information, marketing-source and attribution information, transaction/revenue metadata, customer history, photos/videos submitted through supported channels, and other data configured by our clients.")} </LegalP>

        <LegalSubheading>{tr("5.3 Sensitive / Regulated Data Restrictions")}</LegalSubheading>
        <LegalP> {tr("We do not intentionally collect protected health information, full payment-card data, government identification numbers, highly sensitive authentication secrets, or other specially regulated data through the Website unless expressly agreed in writing.")} </LegalP>

        <LegalSubheading>{tr("5.4 Subprocessors")}</LegalSubheading>
        <LegalP> {tr("CAROS may use subprocessors and third-party services to provide hosting, CRM, telephony, messaging, AI, payments, analytics, support, and related functions. We require material subprocessors that process personal information on our behalf to maintain confidentiality and security obligations appropriate to their role.")} </LegalP>

        <LegalSubheading>{tr("5.5 Security Measures")}</LegalSubheading>
        <LegalP> {tr("We maintain commercially reasonable administrative, technical, and organizational safeguards appropriate to the nature of the data and the Services, including:")} </LegalP>
        <LegalList
          items={[
            tr("Access controls and least-privilege practices."),
            tr("Multi-factor authentication for material administrative systems where available."),
            tr("Reasonable credential-management and offboarding procedures."),
            tr("Encryption in transit using generally accepted protocols where supported."),
            tr("Vendor and subprocessor review proportionate to risk."),
            tr("Logging and monitoring appropriate to the Services."),
            tr("Reasonable backup and business-continuity practices."),
            tr("Incident-response procedures."),
            tr("Workforce and contractor confidentiality and security obligations."),
          ]}
        />

        <LegalSubheading>{tr("5.6 Security Incident")}</LegalSubheading>
        <LegalP> {tr("We will investigate confirmed security incidents involving unauthorized access to or acquisition of personal information for which notification is legally or contractually required. We will notify affected users without undue delay after confirming such an incident and will provide information reasonably available to support your response.")} </LegalP>
      </LegalSection>

      <LegalSection n={6} id="retention" title={tr("Data Retention")}>
        <LegalP> {tr("We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law.")} </LegalP>
        <LegalP> {tr("If you are a CAROS client, we will retain your information for the duration of our business relationship and for a period thereafter as required by law or for legitimate business purposes. If you are a website visitor who has not become a client, we will retain your information for 24 months, or until you request deletion, whichever comes first.")} </LegalP>
      </LegalSection>

      <LegalSection n={7} id="rights" title={tr("Your Rights and Choices")}>
        <LegalSubheading>{tr("7.1 Access and Update")}</LegalSubheading>
        <LegalP> {tr("You may access, update, or correct your personal information by contacting us at")} <EmailLink />.
        </LegalP>

        <LegalSubheading>{tr("7.2 Opt-Out of Marketing")}</LegalSubheading>
        <LegalP> {tr("You may opt out of receiving marketing communications from us by following the unsubscribe instructions included in each email or by contacting us at")} <EmailLink />.
        </LegalP>

        <LegalSubheading>{tr("7.3 Data Subject / Consumer Requests")}</LegalSubheading>
        <LegalP> {tr("Taking into account the nature of processing, we will provide reasonable assistance using available functionality when you submit a legally valid access, deletion, correction, portability, or opt-out request.")} </LegalP>

        <LegalSubheading>{tr("7.4 California Residents (CCPA)")}</LegalSubheading>
        <LegalP> {tr("If you are a California resident, you have certain rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, use, disclose, and sell; the right to request deletion; the right to opt out of the sale of personal information; and the right to non-discrimination. We do not sell personal information. To exercise these rights, contact us at")} <EmailLink />.
        </LegalP>

        <LegalSubheading>{tr("7.5 European Residents (GDPR)")}</LegalSubheading>
        <LegalP> {tr("If you are located in the European Union, you have certain rights under the General Data Protection Regulation (GDPR), including the right to access, rectification, erasure, restriction of processing, data portability, and objection. To exercise these rights, contact us at")} <EmailLink />.
        </LegalP>
      </LegalSection>

      <LegalSection n={8} id="third-party" title={tr("Third-Party Services and Integrations")}>
        <LegalSubheading>{tr("8.1 Platform Providers")}</LegalSubheading>
        <LegalP> {tr("The CAROS Revenue Operating System operates on underlying third-party platforms. Your use of the Services is subject to the terms of service and privacy policies of these third-party providers.")} </LegalP>

        <LegalSubheading>{tr("8.2 Advertising and Analytics")}</LegalSubheading>
        <LegalP> {tr("We use third-party service providers to serve advertisements and analyze usage of the Website. These providers may use cookies, web beacons, and other technologies to collect information about your use of the Website and other websites.")} </LegalP>

        <LegalSubheading>{tr("8.3 Social Media Features")}</LegalSubheading>
        <LegalP> {tr("The Website may include social media features that may collect your IP address, which page you are visiting, and may set a cookie to enable the feature to function properly.")} </LegalP>
      </LegalSection>

      <LegalSection n={9} id="cookies" title={tr("Cookies and Tracking Technologies")}>
        <LegalSubheading>{tr("9.1 What Are Cookies")}</LegalSubheading>
        <LegalP> {tr("Cookies are small data files stored on your device that help us improve your experience on the Website.")} </LegalP>

        <LegalSubheading>{tr("9.2 Types of Cookies We Use")}</LegalSubheading>
        <LegalList
          items={[
            tr("Essential Cookies: Necessary for the Website to function. These cannot be disabled."),
            tr("Analytics Cookies: Help us understand how visitors interact with the Website."),
            tr("Marketing Cookies: Used to track visitors across websites to display relevant advertisements."),
          ]}
        />

        <LegalSubheading>{tr("9.3 Your Choices")}</LegalSubheading>
        <LegalP> {tr("Most web browsers are set to accept cookies by default. You can usually modify your browser settings to decline cookies. However, if you disable cookies, some features of the Website may not function properly.")} </LegalP>

        <LegalSubheading>{tr("9.4 Do Not Track")}</LegalSubheading>
        <LegalP>{tr("We do not currently respond to “Do Not Track” signals from web browsers.")}</LegalP>
      </LegalSection>

      <LegalSection n={10} id="children" title={tr("Children's Privacy")}>
        <LegalP> {tr("The Website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information.")} </LegalP>
      </LegalSection>

      <LegalSection n={11} id="changes" title={tr("Changes to Our Privacy Policy")}>
        <LegalP> {tr("We may update our Privacy Policy from time to time. If we make material changes, we will notify you by email or by means of a notice on the Website prior to the change becoming effective. Your continued use of the Website after any changes constitutes your acceptance of the revised Privacy Policy.")} </LegalP>
      </LegalSection>

      <LegalSection n={12} id="contact" title={tr("Contact Information")}>
        <LegalP> {tr("To ask questions or comment about this Privacy Policy and our privacy practices, contact us at:")} </LegalP>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-semibold text-foreground">{COMPANY_NAME}</p>
          <p className="mt-3 text-muted-foreground"> {tr("Email:")} <EmailLink />
          </p>
        </div>
        <LegalP> {tr("If you are a California resident and would like to submit a request under the CCPA, you may also contact us at the email address above.")} </LegalP>
      </LegalSection>
    </LegalDoc>
  )
}
