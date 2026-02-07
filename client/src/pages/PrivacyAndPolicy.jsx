import React from "react";
import style from "../styles/pages/PrivacyAndPolicy.module.css";
const PrivacyAndPolicy = () => {
  const policy = [
    {
      heading: "Privacy Policy",
      para: `This Privacy Policy describes how Kaira Jewellers ("we", "our", or "us") collects, uses, and protects your personal information when you visit our website or engage with us for jewellery purchases or franchise opportunities.`,
    },
    {
      heading: "1. Information We Collect",
      ul: [
        "Name, email, phone number",
        "Shipping and billing address",
        "Payment details (processed via secure third-party gateways)",
        "Franchise application information (identity proof, financial documents)",
        "IP address, browser type, device data",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      ul: [
        "To process jewellery orders and deliver products",
        "To communicate with franchise applicants and partners",
        "To respond to customer service requests",
        "To send promotional updates and offers",
        "To analyze and improve website functionality",
      ],
    },
    {
      heading: "3. Franchise Data Use",
      para: "When you apply for a franchise, we collect additional information to evaluate your eligibility. This data is strictly used for the application process and is not shared without your consent.",
    },
    {
      heading: "4. Data Protection",
      para: "Your data is secured using SSL encryption. Sensitive data is accessible only to authorized personnel. Payments are handled securely through trusted third-party processors."
    },
    {
      heading: "5. Cookies and Tracking",
      para: "We use cookies to enhance your browsing experience. You can manage cookies in your browser settings. Disabling cookies may affect some functionalities..",
    },
    {
      heading: "6. Third-Party Disclosure",
      para: "We do not sell or trade your personal data. We may share data with trusted partners (e.g., courier services) to fulfill your orders.",
    },
    {
      heading: "7. Your Rights",
      ul: [
    "Access your personal data",
    "Request corrections or deletion",
    "Withdraw consent for data use"
  ]
    },
    {
      heading: "8. Contact Us",
      para: `For questions regarding this Privacy Policy or your data, please contact us at:

Email: kskairajewellers@gmail.com

Phone: +91-7065566678

Address: K S Jewellers Shop Number 1, Sector 23, Gurgaon Gurgaon - 122015

By using our website or submitting information through our franchise application, you consent to this Privacy Policy.`,
    },
   
  ];

  const renderPrivacyAndPolicy = policy.map((policy, id) => {
    return (
      <div className={style.conditionSection} key={id}>
        <div className={style.text}>
          <h1>{policy.heading}</h1>
          {policy.para && <p>{policy.para}</p>}
        {policy.ul && (
          <ul>
            {policy.ul.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        )}
        </div>
      </div>
    );
  });

  return (
    <div className={style.termAndConditionCOntainer}>
      <div className={style.termsinnerContainer}>{renderPrivacyAndPolicy}</div>
    </div>
  );
};

export default PrivacyAndPolicy;
