
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

type PlanProps = {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
};

const Plan: React.FC<PlanProps> = ({ name, price, period, features, popular }) => {
  return (
    <div 
      className={`relative glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
        popular ? 'border-primary/50 shadow-lg' : 'border-white/20'
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-primary shrink-0 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button className="w-full" variant={popular ? "default" : "outline"}>
          Choose Plan
        </Button>
      </div>
    </div>
  );
};

const MembershipCard = () => {
  return (
    <div className="py-16" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground">
            Select the perfect plan to suit your needs and unlock the full potential of our AI poster generator.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Plan 
            name="Free Trial" 
            price="¥0" 
            period="forever" 
            features={[
              "5 poster generations",
              "Basic templates",
              "Watermarked downloads",
              "Standard quality"
            ]}
          />
          
          <Plan 
            name="Monthly" 
            price="¥29" 
            period="month" 
            features={[
              "Unlimited generations",
              "Premium templates",
              "Watermark-free downloads",
              "High quality output",
              "Priority access"
            ]}
            popular={true}
          />
          
          <Plan 
            name="Annual" 
            price="¥290" 
            period="year" 
            features={[
              "Everything in Monthly",
              "2 months free",
              "Exclusive templates",
              "Priority support",
              "Early access to new features"
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
