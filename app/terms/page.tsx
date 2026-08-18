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

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The Terms and Conditions governing your access to and use of the CAROS website and services.",
  alternates: { canonical: "/terms" },
}

const toc: TocEntry[] = [
  { id: "agreement", title: "1. Agreement to Terms" },
  { id: "changes", title: "2. Changes to Terms" },
  { id: "access", title: "3. Accessing the Website" },
  { id: "ip", title: "4. Intellectual Property Rights" },
  { id: "acceptable-use", title: "5. Acceptable Use Policy" },
  { id: "contributions", title: "6. User Contributions" },
  { id: "enforcement", title: "7. Monitoring and Enforcement" },
  { id: "reliance", title: "8. Reliance on Information" },
  { id: "links", title: "9. Links from the Website" },
  { id: "services", title: "10. Services and Platform Access" },
  { id: "warranties", title: "11. Disclaimer of Warranties" },
  { id: "liability", title: "12. Limitation of Liability" },
  { id: "indemnification", title: "13. Indemnification" },
  { id: "governing-law", title: "14. Governing Law and Jurisdiction" },
  { id: "dispute", title: "15. Dispute Process" },
  { id: "waiver", title: "16. Waiver and Severability" },
  { id: "entire-agreement", title: "17. Entire Agreement" },
  { id: "contact", title: "18. Contact" },
]

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Terms and Conditions"
      serifTitle="of Use."
      lastUpdated="August 9, 2026"
      intro="These Terms govern your access to and use of the CAROS website and services. Please read them carefully before using the site."
      toc={toc}
    >
      <LegalSection n={1} id="agreement" title="Agreement to Terms">
        <LegalP>
          Welcome to CAROS (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms and Conditions of Use
          (&ldquo;Terms&rdquo;) govern your access to and use of the CAROS website located at getcaros.com (the
          &ldquo;Website&rdquo;), including any content, functionality, and services offered on or through the Website.
        </LegalP>
        <LegalP>
          By accessing or using the Website, you accept and agree to be bound by these Terms and our Privacy Policy,
          incorporated herein by reference. If you do not agree to these Terms, you must not access or use the Website.
        </LegalP>
      </LegalSection>

      <LegalSection n={2} id="changes" title="Changes to Terms">
        <LegalP>
          We may revise and update these Terms from time to time in our sole discretion. All changes are effective
          immediately when we post them. Your continued use of the Website following the posting of revised Terms means
          that you accept and agree to the changes.
        </LegalP>
      </LegalSection>

      <LegalSection n={3} id="access" title="Accessing the Website and Account Security">
        <LegalP>
          We reserve the right to withdraw or amend the Website without notice. You are responsible for making all
          arrangements necessary for you to have access to the Website. To access certain features, you may be asked to
          provide registration details. It is a condition of your use that all information you provide is correct,
          current, and complete.
        </LegalP>
        <LegalP>
          If you are provided with a user name, password, or other security information, you must treat such information
          as confidential. We have the right to disable any user identifier at any time for any or no reason, including
          if you have violated any provision of these Terms.
        </LegalP>
      </LegalSection>

      <LegalSection n={4} id="ip" title="Intellectual Property Rights">
        <LegalP>
          The Website and its entire contents, features, and functionality are owned by CAROS, its licensors, or other
          providers and are protected by United States and international copyright, trademark, patent, trade secret, and
          other intellectual property or proprietary rights laws.
        </LegalP>
        <LegalP>
          The CAROS name, logo, and all related names, logos, product and service names, designs, and slogans are
          trademarks of CAROS or its affiliates. You must not use such marks without prior written permission.
        </LegalP>
        <LegalP>
          You may print or download one copy of a reasonable number of pages of the Website for your own personal,
          non-commercial use. You must not modify copies of materials, use illustrations separately from accompanying
          text, delete proprietary rights notices, or use any part for commercial purposes without our express written
          consent.
        </LegalP>
      </LegalSection>

      <LegalSection n={5} id="acceptable-use" title="Acceptable Use Policy">
        <LegalP>
          You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to use the
          Website:
        </LegalP>
        <LegalList
          items={[
            "In any way that violates any applicable federal, state, local, or international law or regulation, including laws regarding export of data or software.",
            "For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.",
            'To transmit, or procure the sending of, any advertising or promotional material, including "junk mail," "chain letter," "spam," or any other similar solicitation.',
            "To impersonate or attempt to impersonate CAROS, a CAROS employee, another user, or any other person or entity.",
            "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which may harm CAROS or users.",
            "Use any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying any material.",
            "Use any manual process to monitor or copy any material for any purpose not expressly authorized, without our prior written consent.",
            "Use any device, software, or routine that interferes with the proper working of the Website.",
            "Introduce any viruses, trojan horses, worms, logic bombs, or other malicious or technologically harmful material.",
            "Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server, or any connected database.",
            "Attack the Website via a denial-of-service attack or distributed denial-of-service attack.",
            "Otherwise attempt to interfere with the proper working of the Website.",
          ]}
        />
      </LegalSection>

      <LegalSection n={6} id="contributions" title="User Contributions">
        <LegalP>
          The Website may contain interactive features that allow users to submit, post, display, or transmit content
          (&ldquo;User Contributions&rdquo;). All User Contributions must comply with these Terms.
        </LegalP>
        <LegalP>
          Any User Contribution you post will be considered non-confidential and non-proprietary. By providing any User
          Contribution, you grant us and our affiliates and service providers the right to use, reproduce, modify,
          perform, display, distribute, and disclose such material for any purpose.
        </LegalP>
        <LegalP>
          You represent and warrant that you own or control all rights in and to the User Contributions and that they
          comply with these Terms. You are responsible for any User Contributions you submit.
        </LegalP>
      </LegalSection>

      <LegalSection n={7} id="enforcement" title="Monitoring and Enforcement">
        <LegalP>
          We have the right to remove or refuse to post any User Contributions; take action against any User
          Contribution that violates these Terms or infringes any right; disclose your identity to third parties who
          claim material violates their rights; take appropriate legal action; and terminate or suspend your access for
          any violation.
        </LegalP>
        <LegalP>
          Without limiting the foregoing, we have the right to fully cooperate with any law enforcement authorities or
          court order requesting or directing us to disclose the identity or other information of anyone posting
          materials on the Website.
        </LegalP>
      </LegalSection>

      <LegalSection n={8} id="reliance" title="Reliance on Information Posted">
        <LegalP>
          The information presented on or through the Website is made available solely for general information purposes.
          We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such
          information is strictly at your own risk.
        </LegalP>
      </LegalSection>

      <LegalSection n={9} id="links" title="Links from the Website">
        <LegalP>
          If the Website contains links to other sites and resources provided by third parties, these links are provided
          for your convenience only. We have no control over the contents of those sites or resources and accept no
          responsibility for them or for any loss or damage that may arise from your use of them.
        </LegalP>
      </LegalSection>

      <LegalSection n={10} id="services" title="Services and Platform Access">
        <LegalP>
          The CAROS Revenue Operating System (&ldquo;Platform&rdquo;) is a managed service provided to business clients
          under a separate Master Services Agreement. These Terms govern use of the public Website only. Access to and
          use of the Platform is governed by the executed Master Services Agreement between CAROS and the client.
        </LegalP>
        <LegalP>
          CAROS provides a managed revenue-operations environment combining configured software, CRM and workflow
          infrastructure, automated communications, human answering, business intelligence, marketing attribution,
          customer reactivation, scheduling and estimate workflows, and selected integrations. CAROS may use third-party
          infrastructure and may offer optional advertising, SEO/GEO, custom integrations, AI-assisted functions, and
          other add-ons.
        </LegalP>
        <LegalP>
          Unless expressly stated, CAROS does not provide accounting, tax, payroll, legal, regulatory-compliance,
          inventory, fleet-management, full field-service-management, professional valuation, investment advisory,
          business brokerage, or licensed professional services.
        </LegalP>

        <LegalSubheading>AI and Automated Communications</LegalSubheading>
        <LegalP>
          The Platform may use artificial intelligence or machine-learning systems to assist with summarization,
          classification, routing, drafting, analysis, forecasting, conversational workflows, or other functions. AI
          output can be incomplete or inaccurate and should be reviewed where appropriate before reliance for material
          business decisions.
        </LegalP>
        <LegalP>
          AI and business-intelligence outputs are informational and operational. They are not legal, tax, accounting,
          medical, investment, valuation, or other licensed professional advice. If call recording, transcription, or
          AI-generated/AI-voiced communications are enabled through the Platform, CAROS will configure notices, consent
          flows, scripts, and use restrictions as required by applicable law and the applicable Service Order. CAROS
          does not use AI to make automated decisions that produce legal or similarly significant effects on Website
          visitors without human review.
        </LegalP>

        <LegalSubheading>Call Recording and Monitoring</LegalSubheading>
        <LegalP>
          Where call recording or monitoring services are provided through the Platform, such recording is conducted in
          accordance with applicable law and the terms of the applicable Master Services Agreement. Client businesses
          using CAROS answering services are responsible for ensuring compliance with state and federal call-recording
          laws, including providing required notices to callers.
        </LegalP>
        <LegalP>
          CAROS will configure recording notices and consent flows as required by applicable law and the applicable
          Service Order. Call recordings and transcripts, if enabled, are processed and stored in accordance with our
          Privacy Policy and Data Processing Addendum.
        </LegalP>
      </LegalSection>

      <LegalSection n={11} id="warranties" title="Disclaimer of Warranties">
        <LegalP>
          YOU UNDERSTAND AND AGREE THAT YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH
          THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE
          WEBSITE ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT ANY WARRANTIES OF
          ANY KIND, EITHER EXPRESS OR IMPLIED.
        </LegalP>
        <LegalP>
          NEITHER CAROS NOR ANY PERSON ASSOCIATED WITH CAROS MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
          COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE. CAROS HEREBY DISCLAIMS
          ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO
          ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE.
        </LegalP>
      </LegalSection>

      <LegalSection n={12} id="liability" title="Limitation of Liability">
        <LegalP>
          TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL CAROS, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE
          PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY,
          ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY
          CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES.
        </LegalP>
        <LegalP>
          THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
        </LegalP>
      </LegalSection>

      <LegalSection n={13} id="indemnification" title="Indemnification">
        <LegalP>
          You agree to defend, indemnify, and hold harmless CAROS, its affiliates, licensors, and service providers, and
          its and their respective officers, directors, employees, contractors, agents, licensors, suppliers,
          successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs,
          expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of
          these Terms or your use of the Website.
        </LegalP>
      </LegalSection>

      <LegalSection n={14} id="governing-law" title="Governing Law and Jurisdiction">
        <LegalP>
          These Terms and any dispute or claim arising out of or related to them, their subject matter, or their
          formation shall be governed by and construed in accordance with the internal laws of the State of New York
          without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, or
          proceeding arising out of, or related to, these Terms or the Website shall be instituted exclusively in the
          federal or state courts located in Suffolk County, New York. You waive any and all objections to the exercise
          of jurisdiction over you by such courts and to venue in such courts.
        </LegalP>
      </LegalSection>

      <LegalSection n={15} id="dispute" title="Dispute Process">
        <LegalP>
          Before filing suit, senior representatives of the Parties will attempt in good faith for at least thirty (30)
          days to resolve the dispute. If the dispute cannot be resolved through negotiation, either Party may pursue
          litigation in the courts identified above.
        </LegalP>
      </LegalSection>

      <LegalSection n={16} id="waiver" title="Waiver and Severability">
        <LegalP>
          No waiver by CAROS of any term or condition set out in these Terms shall be deemed a further or continuing
          waiver of such term or condition or a waiver of any other term or condition. If any provision of these Terms is
          held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any
          reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions
          of the Terms will continue in full force and effect.
        </LegalP>
      </LegalSection>

      <LegalSection n={17} id="entire-agreement" title="Entire Agreement">
        <LegalP>
          These Terms and our Privacy Policy constitute the sole and entire agreement between you and CAROS regarding the
          Website and supersede all prior and contemporaneous understandings, agreements, representations, and
          warranties, both written and oral, regarding the Website.
        </LegalP>
      </LegalSection>

      <LegalSection n={18} id="contact" title="Your Comments and Concerns">
        <LegalP>
          The Website is operated by {COMPANY_NAME}. All feedback, comments, requests for technical support, and other
          communications relating to the Website should be directed to:
        </LegalP>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-semibold text-foreground">{COMPANY_NAME}</p>
          <p className="mt-3 text-muted-foreground">
            Email:{" "}
            <Link href={COMPANY_EMAIL_HREF} className="font-medium text-gold underline-offset-4 hover:underline">
              {COMPANY_EMAIL}
            </Link>
          </p>
        </div>
      </LegalSection>
    </LegalDoc>
  )
}
