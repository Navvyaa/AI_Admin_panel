interface Message {
    id: string;
    sender: string;
    avatar: string;
    preview: string;
    fullMessage: string;
    time: string;
    isActive:boolean;
    chatHistory: { role: string; text: string }[];
  }
export const messages:Message[] = [
    {
      id: '1',
      sender: 'Luis Easton',
      avatar: 'L',
      preview: 'I bought a product from your store in November as a Christmas gift...',
      fullMessage: 'Hi, I bought a product in November as a gift and it was defective. Can I get a refund?',
      time: '4m',
      isActive:false,
      chatHistory: [
        { role: "user", text: "Hi, I bought a product in November as a gift and it was defective. Can I get a refund?" },
        
      ]
    },
    {
      id: '2',
      sender: 'Lucy Smith',
      avatar: 'NY',
      preview: 'Good morning,can I return a product I bought a week ...',
      fullMessage: 'Good morning, can I return a product I bought a week ago that I dont like  anymore?',
      time: '2h',
      isActive:false,
      chatHistory: [
        { role: "user", text: "Hi, I bought a product a week ago but I dont like it anymore. Can it be returned?" },
      ]
    },
    {
      id: '3',
      sender: 'Sharon Joseph',
      avatar: 'M',
      preview: 'Hey there, I bought a product in November...',
      fullMessage: 'Hi, I bought a product in November as a gift and it was defective. i want to have a refund.',
      time: '4h',
      isActive:false, 
      chatHistory: [
        { role: "user", text: "Hi, I bought a product in November as a gift and it was defective. i want to have a refund." },
      ]
    },
    {
      id: '4',
      sender: 'Michael Chen',
      avatar: 'MC',
      preview: 'Hello, I received a damaged package yesterday...',
      fullMessage: 'Hello, I received my package yesterday but it was severely damaged during shipping. I would like to request a replacement.',
      time: '1h',
      isActive: false,
      chatHistory: [
        { role: "user", text: "Hello, I received my package yesterday but it was severely damaged during shipping. I would like to request a replacement." },
      ]
    }

  ];
  
  export const aiResponses: Record<string, string> = {
    hello:'Hi, how can I help you today?',
    hi:'Hi, how can I help you today?',
    refund: `We’re sorry the product didn’t meet expectations. We can process a full refund once the return is initiated.`,
    defective: `Please share a photo of the defective item. We’ll either send a replacement or refund your purchase.`,
    late: `Thanks for your patience. We’re checking with the courier and will provide an update within 24 hours.`,
    return: `Sure, we accept returns within 30 days. Please use the prepaid label included in your order.`,
    discount: `Thank you for being a loyal customer! Here’s a 15% discount code: THANKYOU15`,
    status: `Please provide your order number and I’ll check the latest shipping status for you.`,
    damaged: `I'm sorry to hear about the damaged package. Please send us photos of both the damaged package and the item. We'll process a replacement shipment right away and investigate the shipping issue.`,
    warranty: `Most of our items come with a 1-year warranty. If your issue falls within that, we’ll handle it.`,
   };
  