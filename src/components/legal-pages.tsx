import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';

export function LegalPages() {
  const privacyPolicy = `
Last updated: December 2024

PRIVACY POLICY

1. INFORMATION WE COLLECT
We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, delivery address, and payment information.

2. HOW WE USE YOUR INFORMATION
- Process and fulfill your orders
- Communicate with you about your orders
- Send promotional materials (with your consent)
- Improve our services and website
- Comply with legal obligations

3. INFORMATION SHARING
We do not sell, trade, or rent your personal information to third parties. We may share information with:
- Service providers who assist in our operations
- Payment processors for transaction completion
- Delivery partners for order fulfillment

4. DATA SECURITY
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. YOUR RIGHTS
You have the right to:
- Access your personal information
- Correct inaccurate information
- Delete your account and data
- Opt-out of marketing communications

6. CONTACT US
For privacy-related questions, contact us at privacy@crispychicken.com
  `;

  const termsOfService = `
Last updated: December 2024

TERMS OF SERVICE

1. ACCEPTANCE OF TERMS
By using our website and services, you agree to these Terms of Service and our Privacy Policy.

2. ORDERING AND PAYMENT
- All orders are subject to acceptance and availability
- Prices are subject to change without notice
- Payment must be completed before order processing
- We accept major credit cards, debit cards, and cash on delivery

3. DELIVERY POLICY
- Delivery times are estimates and may vary
- Delivery is available within our service areas
- Free delivery on orders over $25
- Delivery fee of $2.99 applies to orders under $25

4. CANCELLATION AND REFUNDS
- Orders can be cancelled within 5 minutes of placement
- Refunds are provided for order errors or quality issues
- Refunds are processed within 2-3 business days

5. USER CONDUCT
You agree not to:
- Use the service for illegal purposes
- Provide false information
- Interfere with the website's operation
- Violate any applicable laws

6. LIMITATION OF LIABILITY
Our liability is limited to the amount you paid for the specific order in question.

7. CONTACT INFORMATION
For questions about these terms, contact us at legal@crispychicken.com
  `;

  const cookiePolicy = `
Last updated: December 2024

COOKIE POLICY

1. WHAT ARE COOKIES
Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.

2. TYPES OF COOKIES WE USE
- Essential Cookies: Required for website functionality
- Performance Cookies: Help us understand how you use our website
- Functional Cookies: Remember your preferences
- Marketing Cookies: Used to show relevant advertisements

3. COOKIE CATEGORIES
ESSENTIAL COOKIES:
- Shopping cart functionality
- User authentication
- Security features

PERFORMANCE COOKIES:
- Google Analytics
- Page load optimization
- Error tracking

FUNCTIONAL COOKIES:
- Language preferences
- Location settings
- Previous orders

4. MANAGING COOKIES
You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.

5. THIRD-PARTY COOKIES
We use services like Google Analytics and payment processors that may set their own cookies.

6. CONTACT US
For cookie-related questions, contact us at cookies@crispychicken.com
  `;

  const accessibility = `
Last updated: December 2024

ACCESSIBILITY STATEMENT

1. OUR COMMITMENT
Crispy Chicken is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone.

2. ACCESSIBILITY FEATURES
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode available
- Scalable text and images
- Alternative text for images
- Clear heading structure

3. STANDARDS COMPLIANCE
We aim to conform to WCAG 2.1 Level AA accessibility guidelines.

4. ONGOING EFFORTS
- Regular accessibility audits
- Staff training on accessibility
- User feedback integration
- Continuous improvements

5. FEEDBACK
We welcome feedback on accessibility. Please contact us at:
- Email: accessibility@crispychicken.com
- Phone: (555) 123-ACCESS
- Mail: Accessibility Team, Crispy Chicken Corp.

6. ALTERNATIVE ACCESS
If you encounter accessibility barriers:
- Call us for phone orders: (555) 123-CRISPY
- Visit our physical locations
- Request assistance via email

We are committed to providing equal access to all customers.
  `;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-300 hover:text-white transition-colors">
            Privacy Policy
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
            <DialogDescription>
              Learn how we collect, use, and protect your personal information.
            </DialogDescription>
          </DialogHeader>
          <div className="whitespace-pre-line text-sm text-gray-600">
            {privacyPolicy}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-300 hover:text-white transition-colors">
            Terms of Service
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
            <DialogDescription>
              Our terms and conditions for using Crispy Chicken services.
            </DialogDescription>
          </DialogHeader>
          <div className="whitespace-pre-line text-sm text-gray-600">
            {termsOfService}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-300 hover:text-white transition-colors">
            Cookie Policy
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Policy</DialogTitle>
            <DialogDescription>
              Information about how we use cookies on our website.
            </DialogDescription>
          </DialogHeader>
          <div className="whitespace-pre-line text-sm text-gray-600">
            {cookiePolicy}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <button className="text-gray-300 hover:text-white transition-colors">
            Accessibility
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Accessibility Statement</DialogTitle>
            <DialogDescription>
              Our commitment to making our website accessible to everyone.
            </DialogDescription>
          </DialogHeader>
          <div className="whitespace-pre-line text-sm text-gray-600">
            {accessibility}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}