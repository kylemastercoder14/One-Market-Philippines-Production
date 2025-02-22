/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
import {
  Archive,
  CircleEllipsis,
  FileText,
  HandCoins,
  ShieldCheck,
  Truck,
  User,
  Wallet,
} from "lucide-react";

export const TOPICS = [
  { id: "order", label: "Order issues", icon: FileText },
  { id: "shipping", label: "Shipping & delivery", icon: Truck },
  { id: "return", label: "Return & refund", icon: HandCoins },
  { id: "product", label: "Product & stock", icon: Archive },
  { id: "account", label: "Managing my account", icon: User },
  { id: "payment", label: "Payment & promos", icon: Wallet },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "policies", label: "Policies & others", icon: CircleEllipsis },
];

export const MAINCONTENT = [
  { id: "payment", label: "Unknown charges" },
  {
    id: "security",
    label: "Report something suspicious on 1 Market Philippines",
  },
  {
    id: "return",
    label: "How to return or exchange an item on 1 Market Philippines",
  },
  {
    id: "shipping",
    label:
      "My tracking info says my package was delivered, but I haven't received it.",
  },
  { id: "return", label: "How do I ship my items back?" },
  {
    id: "shipping",
    label: "What should I do if I am missing item(s) from my order?",
  },
  { id: "account", label: "Why can't I find my order in my account?" },
  { id: "return", label: "How do I track my refund?" },
  {
    id: "return",
    label: "What if I received an item damaged or not as described?",
  },
  {
    id: "security",
    label:
      "Is it safe to shop on 1 Market Philippines? How will my information be used?",
  },
];

export const ORDERHELP = [
  {
    title: "How to search for items on 1 Market Philippines",
    description: (
      <p>
        You can use the search button at the top of the 1 Market Philippines app
        or on our website to look for items. Enter descriptive terms in the
        search bar to start your search. For example: <b>'black sweatshirt'</b>{" "}
        or <b>&apos;casual shorts'</b>. Search results are ordered by relevance,
        but you can adjust this with the <b>Sort by</b> options above the
        results. Using multiple descriptive terms can help narrow results. For
        example, <b>'little black dress'</b> is more specific than{" "}
        <b>'dress'</b>.
      </p>
    ),
  },
  {
    title: "I received an email about an order I did not place",
    description: (
      <p>
        Please check if a family member or friend has used your account details
        to place an order. Someone may have also misspelled their email when
        registering, leading to an order being placed under your email. If you
        suspect fraud, change your password immediately to secure your account.
      </p>
    ),
  },
  {
    title: "How to remove an item from my cart",
    description: (
      <ul className="list-disc pl-5">
        <li>
          Click the{" "}
          <a href="/shopping-cart" className="text-red-600 underline">
            shopping cart
          </a>{" "}
          icon from our site.
        </li>
        <li>
          Find the item you want to remove and click the <b>trash bin</b> icon
          or the <b>'-'</b> button to adjust quantity. On mobile, swipe left and
          click <b>'Remove'</b>.
        </li>
        <li>
          To delete multiple items, click <b>'Manage Cart'</b> on the top right,
          select items, and click <b>'Delete'</b>.
        </li>
      </ul>
    ),
  },
  {
    title: "Why was my credit card declined during checkout?",
    description: (
      <p>
        Your credit card may have been declined due to various reasons. Please
        check the following:
        <ul className="list-disc pl-5">
          <li>
            Ensure your card is not expired and the card number, expiration
            date, and CVV are correct.
          </li>
          <li>
            Check if your card has sufficient funds to cover the purchase.
          </li>
          <li>
            Contact your bank to check if the transaction was declined due to
            security reasons.
          </li>
        </ul>
      </p>
    ),
  },
  {
    title: "Where is my order ID?",
    description: (
      <p>
        Your order ID is a unique number assigned to your order. You can find it
        in your order confirmation email or in your order history on your
        account. If you can't find it, please contact our customer service for
        assistance.
      </p>
    ),
  },
  {
    title: "How can I make a change or modify items in my order?",
    description: (
      <p>
        If your order has already been packed, you will not be able to make any
        changes or modifications to your order. Please wait for your items to
        arrive and then submit a return and refund request for the items you
        don't wish to keep. If your order has not been packed yet, please
        contact the seller to request changes to your order.
      </p>
    ),
  },
  {
    title: "How to cancel an order?",
    description: (
      <p>
        You can cancel your order if it has not been packed yet. To cancel your
        order, go to your order history and click the <b>Cancel Order</b> button
        next to the order you want to cancel. If the button is not available,
        please contact the seller to request cancellation.
      </p>
    ),
  },
  {
    title: "How to leave a review?",
    description: (
      <p>
        To leave a review, go to your order history and find the order you want
        to review. Click the <b>Leave a Review</b> button and rate the product
        and seller. You can also leave a comment to share your experience with
        other buyers.
      </p>
    ),
  },
];

export const SHIPPINGHELP = [
  {
    title: "How do I update my shipping address?",
    description: (
      <p>
        If your order has not yet been packed, you can follow the steps below to
        update your shipping address:
        <ul className="list-disc pl-5">
          <li>
            Go to your order history and find the order you want to update.
          </li>
          <li>
            Click the <b>"Update Shipping Address"</b> button.
          </li>
          <li>
            If the change is successful, you will receive a prompt that says{" "}
            <b>"your address has been updated"</b> and the order details will
            show the latest address. If your order has already been packed, 1
            Market Philippines's delivery partners unfortunately will not be
            able to update your shipping address. If your package has not yet
            been delivered, you may contact the carrier directly to see if it
            would be possible to update your shipping address.
          </li>
        </ul>
      </p>
    ),
  },
  {
    title: "How do I track my order?",
    description: (
      <p>
        You can track the latest shipping status of your order. Simply visit{" "}
        <b>"Your orders"</b> and click the <b>"Track"</b> button next to your
        order to get a direct link to your shipping information. You will be
        able to see your rider's name, tracking number, delivery time, and
        latest shipping status on the page. If a tracking number isn't available
        yet, then your order may still be processed. We will notify you when
        your tracking number is ready and your order has been shipped.
      </p>
    ),
  },
  {
    title: "How do I know if my order has been shipped?",
    description: (
      <p>
        You will receive an email notification when your order has been shipped.
        You can also check the status of your order by visiting{" "}
        <b>"Your orders"</b> and looking for the <b>"Shipped"</b> status. If
        your order has been shipped, you will see the expected delivery date and
        the carrier's name. You can also track your order by clicking the{" "}
        <b>"Track"</b> button next to your order.
      </p>
    ),
  },
  {
    title: "How do I know when my order will arrive?",
    description: (
      <p>
        You can check the estimated delivery date of your order by visiting{" "}
        <b>"Your orders"</b>. If your order has been shipped, you will see the
        expected delivery date and the carrier's name. You can also track your
        order by clicking the <b>"Track"</b> button next to your order.
      </p>
    ),
  },
  {
    title: "What should I do if I am missing item(s) from my order?",
    description: (
      <p>
        If you are missing item(s) from your order, please check the following:
        <ul className="list-disc pl-5">
          <li>
            Check the order confirmation email to see if the missing item(s) are
            listed.
          </li>
          <li>
            Check the order summary in your account to see if the missing
            item(s) are listed.
          </li>
          <li>
            Contact the seller to confirm if the missing item(s) are included in
            the order.
          </li>
        </ul>
        If the missing item(s) are not included in the order, please contact our
        customer service for assistance.
      </p>
    ),
  },
  {
    title: "What should I do if my order is delayed?",
    description: (
      <p>
        If your order is delayed, please check the following:
        <ul className="list-disc pl-5">
          <li>
            Check the estimated delivery date of your order by visiting{" "}
            <b>"Your orders"</b> and looking for the <b>"Shipped"</b> status.
          </li>
          <li>
            Contact the carrier directly to inquire about the status of your
            order.
          </li>
          <li>
            Contact our customer service for assistance if your order is
            significantly delayed.
          </li>
        </ul>
      </p>
    ),
  },
  {
    title:
      "My tracking says my package was delivered, but I haven't received it",
    description: (
      <p>
        If your tracking information shows that your package was delivered, but
        you haven't received it, please check the following:
        <ul className="list-disc pl-5">
          <li>
            Check the delivery address on your order confirmation email to
            ensure it is correct.
          </li>
          <li>
            Check with your neighbors or building security to see if they
            received the package on your behalf.
          </li>
          <li>
            Check with the carrier to see if they have any additional
            information about the delivery.
          </li>
        </ul>
        If you still can't locate your package, please contact our customer
        service for assistance.
      </p>
    ),
  },
];

export const RETURNHELP = [
  {
    title: "How to return or exchange an item on 1 Market Philippines",
    description: (
      <p>
        Unfortunately, exchanges are not possible at the moment, but you can
        place a new order and initiate a return of the existing order. Almost
        all items are eligible for returns and refunds based on the seller's
        policy. The few exceptions are for: Items that can't be returned:
        <ul className="list-disc pl-5">
          <li>
            Clothing items that have been worn, washed, or damaged after
            delivery, or have had their tags or hygiene stickers removed.
          </li>
          <li>Items that have been customized or personalized.</li>
          <li>
            Items that are perishable, such as food, flowers, newspapers, or
            magazines.
          </li>
          <li>Health and personal care items.</li>
          <li>Some underwear orders.</li>
          <li>
            Items that are classified as hazardous materials or use flammable
            liquids or gases.
          </li>
        </ul>
      </p>
    ),
  },
  {
    title: "How do I ship my items back?",
    description: (
      <p>
        If your items are eligible for a return, you may follow the steps below
        to start your return process:
        <ul className="list-disc pl-5">
          <li>
            Find the relevant order under <b>'Your orders'</b> and click{" "}
            <b>'Return/Refund'</b>.
          </li>
          <li>
            Confirm that you have received the package, and select the item(s)
            you would like to return and the reason for the return. If
            applicable, you may also upload photos and/or comments to further
            explain.
          </li>
          <li>
            Confirm the return information, and click <b>'Next'</b>.
          </li>
          <li>
            If there is no need to return your item, then your final step is
            simply to select your refund method. You may choose to receive your
            refund to your payment method. Make your selection and click{" "}
            <b>'Submit'</b>.
          </li>
        </ul>
        If you would like to request return and refund of additional items
        before shipping out the return package, please follow the instructions
        on the return details page and choose to use the same return label. Then
        you can ship back the additional items together and avoid return
        shipping fees. After you apply for your return, you will need to return
        your package within 14 days. You can reference the status of your refund
        or rebuy any items from your order on your order details page.
      </p>
    ),
  },
  {
    title: "How do I track my refund?",
    description: (
      <p>
        You can track the status of your refund by visiting <b>'Your orders'</b>{" "}
        and looking for the <b>'Refunded'</b> status. If your refund has been
        processed, you will see the refund amount and the payment method used
        for the refund. You can also track your refund by clicking the{" "}
        <b>'Track'</b> button next to your order.
      </p>
    ),
  },
  {
    title: "What if I received an item damaged or not as described?",
    description: (
      <p>
        If you received an item that is damaged or not as described, please
        contact the seller immediately to report the issue. You can find the
        seller's contact information on the order details page. The seller will
        work with you to resolve the issue and may offer a refund or replacement
        for the item. If the seller is unresponsive or unable to resolve the
        issue, please contact our customer service for assistance.
      </p>
    ),
  },
];

export const PRODUCTHELP = [
  {
    title: "How do I know if an item is in stock?",
    description: (
      <p>
        You can check the availability of an item by visiting the product page
        and looking for the <b>'In Stock'</b> or <b>'Out of Stock'</b> status.
        If the item is out of stock, you can sign up to receive an email
        notification when the item is back in stock. You can also contact the
        seller directly to inquire about the availability of the item.
      </p>
    ),
  },
  {
    title: "Your sizing chart is different from what I'm used to",
    description: (
      <p>
        We are sorry that you are not happy with the fit of your item. Some
        pieces might fit differently depending on the styles, such as oversized
        sweatshirts and t-shirts which run bigger than the general guidelines.
        We recommend checking the product description for more information on
        the fit of the item. If you are still unsure, you can contact the seller
        directly for more information on the sizing of the item.
      </p>
    ),
  },
  {
    title: "Item doesn't have my size",
    description: (
      <p>
        We are sorry that the item you are interested in does not have your size
        available. We recommend checking back later as the seller may restock
        the item in your size. You can also contact the seller directly to
        inquire about the availability of the item in your size.
      </p>
    ),
  },
];

export const ACCOUNTHELP = [
  {
    title: "How to change my account password",
    description: (
      <p>
        You can change your account password by following these steps:
        <ul className="list-disc pl-5">
          <li>Go to your account settings.</li>
          <li>
            Find <b>'Password'</b> and click <b>'Edit'</b> to change your
            password.
          </li>
          <li>Enter your old password and your new password.</li>
          <li>
            Click <b>'Save'</b> to update your password.
          </li>
        </ul>
        Your password should be at least 8 characters long and contain a mix of
        letters, numbers, and special characters for security. If you used your
        Google or Facebook account details to log in to Temu, then you will need
        to change your password details there.
      </p>
    ),
  },
  {
    title: "How to change my address",
    description: (
      <p>
        You can change your address by following these steps:
        <ul className="list-disc pl-5">
          <li>Go to your account settings.</li>
          <li>
            Find <b>'Addresses'</b> and click <b>'Edit'</b> to change your
            address.
          </li>
          <li>Enter your new address details.</li>
          <li>
            Click <b>'Save'</b> to update your address.
          </li>
        </ul>
      </p>
    ),
  },
  {
    title: "How can I delete my account?",
    description: (
      <p>
        You can delete your account by following these steps:
        <ul className="list-disc pl-5">
          <li>Go to your account settings.</li>
          <li>
            Find <b>'Account'</b> and click <b>'Delete Account'</b>.
          </li>
          <li>Enter your password to confirm the deletion of your account.</li>
          <li>
            Click <b>'Delete'</b> to permanently delete your account.
          </li>
        </ul>
        Please note that deleting your account is irreversible and will remove
        all your account information, including your order history and saved
        addresses.
      </p>
    ),
  },
  {
    title: "How to change my email address",
    description: (
      <p>
        You can change your email address by following these steps:
        <ul className="list-disc pl-5">
          <li>Go to your account settings.</li>
          <li>
            Find <b>'Email'</b> and click <b>'Edit'</b> to change your email
            address.
          </li>
          <li>Enter your new email address.</li>
          <li>
            Click <b>'Save'</b> to update your email address.
          </li>
        </ul>
      </p>
    ),
  },
  {
    title: "How to find my order in my account",
    description: (
      <p>
        If you can't find your order in your account, please check the
        following:
        <ul className="list-disc pl-5">
          <li>Check your order confirmation email for the order number.</li>
          <li>
            Check your order history in your account to see if the order is
            listed.
          </li>
          <li>
            Contact the seller to confirm if the order was successfully placed.
          </li>
        </ul>
        If you still can't find your order, please contact our customer service
        for assistance.
      </p>
    ),
  },
  {
    title: "How to make my account more secure",
    description: (
      <p>
        You can make your account more secure by following these steps:
        <ul className="list-disc pl-5">
          <li>Use a strong and unique password for your account.</li>
          <li>
            Enable two-factor authentication to add an extra layer of security
            to your account.
          </li>
          <li>
            Check your account settings regularly to review your login history
            and connected devices.
          </li>
          <li>
            Be cautious of phishing emails and only log in to your account on
            the official 1 Market Philippines website or app.
          </li>
        </ul>
      </p>
    ),
  },
  {
    title: "I can't log in to my account",
    description: (
      <p>
        If you can't log in to your account, please check the following:
        <ul className="list-disc pl-5">
          <li>Ensure you are using the correct email and password.</li>
          <li>
            Check if your account is locked due to multiple failed login
            attempts.
          </li>
          <li>
            Reset your password if you have forgotten it or if you suspect your
            account has been compromised.
          </li>
          <li>
            Contact our customer service for assistance if you are still unable
            to log in.
          </li>
        </ul>
      </p>
    )
  },
];

export const PAYMENTHELP = [];

export const SECURITYHELP = [];

export const POLICIESHELP = [];
