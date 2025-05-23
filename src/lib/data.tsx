interface Message {
    id: string;
    sender: string;
    avatar: string;
    preview: string;
    fullMessage: string;
    time: string;
    isActive:boolean;
  }
export const messages:Message[] = [
    {
      id: '1',
      sender: 'Luis Easton',
      avatar: 'L',
      preview: 'I bought a product from your store in November as a Christmas gift...',
      fullMessage: 'Hi, I bought a product in November as a gift and it was defective. Can I get a refund?',
      time: '4m',
      isActive:false
    },
    {
      id: '2',
      sender: 'Lucy Smith',
      avatar: 'NY',
      preview: 'Good morning, let me...',
      fullMessage: 'Hi, I bought a product a week ago but I dont like it anymore. Can it be rerturned?',
      time: '2h',
      isActive:false
    },
    {
      id: '3',
      sender: 'Sharon Joseph',
      avatar: 'M',
      preview: 'Hey there, I\'m Ne...',
      fullMessage: 'Hi, I bought a product in November as a gift and it was defective. i want to have a refund.',
      time: '4h',
      isActive:false, 
    }

  ];
  
  export const aiResponses: Record<string, string> = {
    refund: `We’re sorry the product didn’t meet expectations. We can process a full refund once the return is initiated.`,
    defective: `Please share a photo of the defective item. We’ll either send a replacement or refund your purchase.`,
    late: `Thanks for your patience. We’re checking with the courier and will provide an update within 24 hours.`,
    return: `Sure, we accept returns within 30 days. Please use the prepaid label included in your order.`,
    discount: `Thank you for being a loyal customer! Here’s a 15% discount code: THANKYOU15`,
    status: `Please provide your order number and I’ll check the latest shipping status for you.`,
    warranty: `Most of our items come with a 1-year warranty. If your issue falls within that, we’ll handle it.`,
   };
  