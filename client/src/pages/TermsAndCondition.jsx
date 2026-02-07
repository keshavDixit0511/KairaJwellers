import React from 'react'
import style from '../styles/LandingPage/termsAndCondition.module.css'
const TermsAndCondition = () => {
    const terms = [
    {
        heading:"Acceptance of Terms",
        para:"By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions and our Privacy Policy. If you do not accept any part of these terms, you must discontinue your use of the website immediately."
    },
    {
        heading:"Eligibility",
        para:"By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions and our Privacy Policy. If you do not accept any part of these terms, you must discontinue your use of the website immediately."
    },
    {
        heading:"Changes to Terms",
        para:"We reserve the right to modify these Terms at any time without prior notice. Any changes will be effective immediately upon posting on this page. Your continued use of the website after any such changes constitutes your acceptance of the new Terms. We encourage you to review this page periodically."
    },
    {
        heading:"User Accounts",
        para:"To access certain features of our website, you may be required to register for an account. You agree to:"
    },
     {
        heading:"Intellectual Property Rights",
        para:"All content, trademarks, logos, graphics, images, audio, video, software, and data on this website are the property of [Your Website Name] or its licensors and are protected by copyright and other intellectual property laws. You may not: Reproduce, modify, or distribute any content from this website without our written permission. Use our trademarks or service marks without our prior written consent. Use the content for commercial purposes unless expressly permitted."
    },
     {
        heading:"Prohibited Conduct",
        para:"You agree not to engage in any of the following prohibited activities: Violating any applicable laws or regulations. Infringing the rights of any third party, including intellectual property or privacy rights. Uploading viruses, malware, or other malicious code. Attempting to gain unauthorized access to our systems or user accounts. Harassing, abusing, or threatening others. Using the website for fraudulent or misleading purposes."
    },
    {
        heading:"Products and Services",
        para:"We reserve the right to modify or discontinue any product or service without notice. We make every effort to ensure accuracy in our product descriptions and pricing, but we do not guarantee the absence of errors. In case of pricing or typographical errors, we reserve the right to refuse or cancel any orders placed for the incorrect price."
    },
     {
        heading:"Payments and Billing",
        para:"If you purchase any products or services through our website, you agree to pay all charges and applicable taxes. Payments must be made through approved payment methods. We reserve the right to: Change prices at any time. Refuse any order placed through the website. Limit or cancel quantities purchased per person, per account, or per order."
    },
    {
        heading:"Refunds and Cancellations",
        para:"Refunds and cancellations are subject to our Refund Policy, which is incorporated by reference into"
    },
       {
        heading:"Refunds and Cancellations",
        para:"Refunds and cancellations are subject to our Refund Policy, which is incorporated by reference into these Terms. Please refer to that policy for specific details regarding eligibility and procedures."
    },
      {
        heading:"Privacy Policy",
        para:"Our website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content, privacy policies, or practices of any third-party websites. Accessing such links is at your own risk, and you should review the applicable terms and policies."
    },
    {
        heading:"Disclaimer of Warranties",
        para:"Your use of the website is also governed by our Privacy Policy, which explains how we collect, use, and disclose your personal information. By using the website, you consent to the collection and use of your information as described in the Privacy Policy."
    },
    {
        heading:"Limitation of Liability",
        para:"The website and its content are provided on an as-is and as-available basis. We make no warranties or representations, express or implied, regarding: The accuracy, completeness, or reliability of the content. The availability or operation of the website without interruptions or errors. The safety and security of the website. To the fullest extent permitted by law, we disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement."
    },
    {
        heading:"Indemnification",
        para:"To the maximum extent permitted by applicable law, [Kaira Jewellers] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses."
    },
    {
        heading:"Termination",
        para:"You agree to indemnify, defend, and hold harmless [Kaira Jewellers], its affiliates, employees, agents, and licensors from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your use of the website, your violation of these Terms, or your violation of any rights of a third party."
    },
    {
        heading:"Governing Law",
        para:"We may terminate or suspend your access to the website, with or without notice, for any conduct that we believe violates these Terms or is harmful to other users or the integrity of the website. Upon termination, your right to use the website will immediately cease. Provisions of these Terms which by their nature should survive termination shall remain in effect, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability."
    },
    {
        heading:"Entire Agreement",
        para:"These Terms shall be governed by and construed in accordance with the laws of [Uttar Pardesh], without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Gurugram (NCR) for the resolution of any disputes arising out of or related to these Terms or the website. 17. Entire Agreement"
    },
    {
        heading:"Severability",
        para:"If any provision of these Terms is found to be unlawful, void, or unenforceable, the remaining provisions shall remain in full force and effect."
    },       
]

const renderTermsAndCondition = terms.map((terms,id) => {
    return <div className={style.conditionSection} key={id}>
        <div className={style.text}>
            <h1>{terms.heading}</h1>
        <p>{terms.para}</p>
        </div>
    </div>
})
  return (
    <div className={style.termAndConditionCOntainer}>
        <div className={style.termsinnerContainer}>
            {renderTermsAndCondition}
        </div>
    </div>
  )
}

export default TermsAndCondition