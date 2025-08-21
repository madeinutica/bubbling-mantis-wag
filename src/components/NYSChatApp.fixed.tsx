// Welcome to your New York Sash React App!
// This version updates the sidebar's quick actions to be "Call Us" and "Text Us",
// with links that open the native phone and messaging applications.

// Add WebkitSpeechRecognition interface
declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
        recognition: any;
    }
}

import React, { useState, useEffect, useRef } from 'react';
import { Video, BookOpen, Star, MapPin, Send, DollarSign, ShieldCheck, FileText, Phone, MessageSquare, ShoppingCart, MessageCircle, Search, Mic } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

// --- Helper Components (Icons) ---
const NysLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM2 12l10 5 10-5-10-5-10 5z" />
    </svg>
);

// --- Main Application Components ---

const ChatMessage = ({ message, sender, onAskQuestion }: { message: string; sender: string; onAskQuestion: (originalMessage: string) => void }) => {
    const isUser = sender === 'user';
    const isAgent = sender === 'agent';

    return (
        <div className={`flex items-end gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'} group`}>
            {isAgent && (
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <NysLogo className="w-6 h-6 text-white" />
                </div>
            )}
            <div
                className={`px-4 py-3 rounded-2xl max-w-sm md:max-w-md lg:max-w-lg shadow-md transition-all duration-300 relative ${
                    isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                }`}
            >
                <p className="text-base" style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
                
                {isAgent && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button 
                                    onClick={() => onAskQuestion(message)}
                                    className="absolute -top-3 -right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-gray-200"
                                    aria-label="Ask a question about this"
                                >
                                    <MessageCircle className="w-4 h-4 text-blue-600" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ask a question about this</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
        </div>
    );
};

const ChatOptions = ({ options, onSelect }: { options: any[]; onSelect: (value: string, text: string) => void }) => {
    return (
        <div className="flex flex-wrap justify-start gap-2 my-4 ml-14">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(option.value, option.text)}
                    className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-full hover:bg-blue-100 hover:text-blue-700 border border-gray-200 transition-all duration-200 ease-in-out shadow-sm"
                >
                    {option.text}
                </button>
            ))}
        </div>
    );
};

const AppHeader = ({ userInfo }: { userInfo: any }) => {
    const navLinks = [
        { name: 'Windows', href: '#' },
        { name: 'Siding', href: '#' },
        { name: 'Bathrooms', href: '#' },
        { name: 'Doors', href: '#' },
    ];

    return (
        <header className="w-full p-4 bg-white border-b border-gray-200 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <NysLogo className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">New York Sash</h1>
                        <p className="text-xs text-gray-600">Utica, NY | Since 1989</p>
                    </div>
                </div>
                <nav className="hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    {userInfo && (
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-700">{userInfo.name}</p>
                            <p className="text-xs text-gray-500">{userInfo.location}</p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

// Sidebar Navigation with Quick Action Buttons
const Sidebar = ({ content }: { content: any }) => {
    return (
        <div className="w-full h-full border-r border-gray-200 bg-white p-4 flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">{content?.title || "Product Information"}</h2>
                
                {content?.type === 'text' && (
                    <div className="prose prose-sm max-w-none">
                        <p className="text-gray-600 mb-4">{content?.description}</p>
                        {content?.details && content.details.map((detail: any, index: number) => (
                            <div key={index} className="mb-4">
                                {detail.heading && <h3 className="text-md font-medium text-gray-800 mb-2">{detail.heading}</h3>}
                                <p className="text-gray-600">{detail.text}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                {content?.type === 'image' && (
                    <div className="space-y-4">
                        {content.image && (
                            <img 
                                src={content.image} 
                                alt={content.imageAlt || "Product"} 
                                className="w-full rounded-lg shadow-sm"
                            />
                        )}
                        <p className="text-gray-600">{content?.description}</p>
                    </div>
                )}
                
                {content?.type === 'video' && (
                    <div className="space-y-4">
                        <div className="relative pt-[56.25%] bg-gray-100 rounded-lg">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Video className="w-12 h-12 text-gray-400" />
                            </div>
                        </div>
                        <p className="text-gray-600">{content?.description}</p>
                    </div>
                )}
                
                {content?.type === 'testimonial' && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                        <div className="flex items-center mb-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="text-gray-600 italic mb-2">"{content.quote}"</p>
                        <p className="text-gray-700 font-medium">{content.author}</p>
                        <p className="text-gray-500 text-sm">{content.location}</p>
                    </div>
                )}
                
                {content?.bullets && (
                    <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-4">
                        {content.bullets.map((bullet: string, index: number) => (
                            <li key={index}>{bullet}</li>
                        ))}
                    </ul>
                )}
            </div>
            
            <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-3 mt-auto">
                <a 
                    href="tel:+13152220000" 
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Phone className="w-4 h-4" />
                    <span>Call Us</span>
                </a>
                <a 
                    href="sms:+13152220000" 
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <MessageSquare className="w-4 h-4" />
                    <span>Text Us</span>
                </a>
            </div>
        </div>
    );
};

// --- The Main Conversational App Component ---
export default function NYSChatApp() {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [currentStep, setCurrentStep] = useState('welcome');
    const [sidebarContent, setSidebarContent] = useState<any>(null);
    const [productContext, setProductContext] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    
    // Custom Question Dialog State
    const [customDialogOpen, setCustomDialogOpen] = useState(false);
    const [customQuestion, setCustomQuestion] = useState('');
    const [relatedMessage, setRelatedMessage] = useState('');
    const [isAskingCustom, setIsAskingCustom] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [contactInfo, setContactInfo] = useState({ phone: '', email: '' });
    const [showContactForm, setShowContactForm] = useState(false);

    // Mock historical chat data for answering custom questions
    const historicalChatData = [
        {
            question: "How long does a window installation take?",
            answer: "Most window installations take 1-2 days depending on the number of windows and complexity. For a typical home with 10-15 windows, we can usually complete the job in a single day with our professional installation team."
        },
        {
            question: "Do you offer financing?",
            answer: "Yes, we offer several financing options including 0% interest for qualified buyers, and flexible payment plans that can fit within your budget. Our financing specialist can help you find the best option for your situation."
        },
        {
            question: "What's the warranty on your windows?",
            answer: "Our windows come with a comprehensive lifetime warranty that covers both materials and labor. This transferable warranty ensures your investment is protected for the life of your home."
        },
        {
            question: "Are your products made locally?",
            answer: "Yes! We take pride in offering products manufactured right here in Upstate New York. This allows us to maintain strict quality control and reduce our carbon footprint while supporting the local economy."
        },
        {
            question: "How energy efficient are your windows?",
            answer: "Our windows exceed ENERGY STAR standards, with options for double or triple pane glass, low-E coatings, and argon gas filling. Many customers report energy savings of 20-30% after installation."
        }
    ];

    // Mock function to find the best answer from historical data
    const findAnswerFromHistory = (question: string, context: string = "") => {
        // In a real implementation, this would use a more sophisticated search algorithm
        // For now, just use a simple keyword match
        const combinedQuery = `${question} ${context}`.toLowerCase();
        
        // Find the best match
        let bestMatch = historicalChatData[0];
        let bestScore = 0;
        
        historicalChatData.forEach(item => {
            const questionWords = item.question.toLowerCase().split(' ');
            let score = 0;
            
            questionWords.forEach(word => {
                if (combinedQuery.includes(word) && word.length > 3) {
                    score++;
                }
            });
            
            if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
            }
        });
        
        return bestScore > 0 ? bestMatch.answer : "I don't have specific information about that, but our customer service team would be happy to help. Would you like me to have someone contact you?";
    };

    // Handler for custom question bubble clicks
    const handleCustomQuestionClick = (originalMessage: string) => {
        setRelatedMessage(originalMessage);
        setCustomQuestion('');
        setCustomDialogOpen(true);
    };

    // Handler for submitting custom questions
    const handleCustomQuestionSubmit = () => {
        if (!customQuestion.trim()) return;
        
        setIsAskingCustom(true);
        addUserMessage(customQuestion);
        setCustomDialogOpen(false);
        
        // Simulate processing time
        setTimeout(() => {
            const answer = findAnswerFromHistory(customQuestion, relatedMessage);
            addAgentMessage(answer);
            setIsAskingCustom(false);
        }, 1000);
    };
    
    // Voice to text functionality
    const handleVoiceToTextToggle = () => {
        if (!isListening) {
            startListening();
        } else {
            stopListening();
        }
    };
    
    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            
            recognition.onstart = () => {
                setIsListening(true);
            };
            
            recognition.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0])
                    .map((result) => result.transcript)
                    .join('');
                
                setCustomQuestion(transcript);
            };
            
            recognition.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };
            
            recognition.onend = () => {
                setIsListening(false);
            };
            
            recognition.start();
            window.recognition = recognition;
        } else {
            alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
        }
    };
    
    const stopListening = () => {
        if (window.recognition) {
            window.recognition.stop();
            setIsListening(false);
        }
    };

    // Mock content database with Utica-specific content and product integration
    const sidebarContentDB = {
        windows: {
            title: "Replacement Windows",
            type: "text",
            description: "Our energy-efficient replacement windows are custom manufactured in Upstate New York and installed by our expert team.",
            details: [
                {
                    heading: "Customized for Your Home",
                    text: "Each window is custom-made to fit the exact dimensions of your home, ensuring a perfect fit and maximum energy efficiency."
                },
                {
                    heading: "Energy Savings",
                    text: "Our windows feature Low-E glass, argon gas, and insulated frames that can reduce your energy bills by up to 30%."
                }
            ],
            bullets: [
                "Lifetime transferable warranty",
                "Made locally in Upstate NY",
                "Professional installation by certified technicians",
                "0% financing available for qualified buyers",
                "Variety of styles and finishes"
            ]
        },
        
        siding: {
            title: "Premium Vinyl Siding",
            type: "image",
            image: "https://via.placeholder.com/300x200",
            imageAlt: "Vinyl siding installation on a home",
            description: "Our premium vinyl siding offers exceptional durability, energy efficiency, and curb appeal for homes in the Mohawk Valley region.",
            bullets: [
                "Insulated siding options for greater energy efficiency",
                "Wide selection of colors and textures",
                "Low maintenance - never needs painting",
                "Resistant to harsh Upstate NY weather conditions",
                "Expert installation with attention to detail"
            ]
        },
        
        bathrooms: {
            title: "Bathroom Renovations",
            type: "text",
            description: "Transform your bathroom with our one-day bath remodeling services. We offer high-quality acrylic bath and shower systems designed for beauty and durability.",
            details: [
                {
                    heading: "Quick Installation",
                    text: "Most bathroom transformations can be completed in just one day, minimizing disruption to your home."
                },
                {
                    heading: "Accessibility Options",
                    text: "We offer walk-in tubs and roll-in showers designed for safety and accessibility, perfect for aging in place."
                }
            ],
            bullets: [
                "Antimicrobial acrylic materials resist mold and mildew",
                "Custom solutions for any bathroom size",
                "Wide variety of styles, colors, and fixtures",
                "Lifetime warranty on all acrylic systems",
                "Financing options available with approved credit"
            ]
        },
        
        doors: {
            title: "Entry & Patio Doors",
            type: "video",
            description: "Enhance your home's security, energy efficiency, and curb appeal with our selection of premium entry and patio doors.",
            bullets: [
                "Steel, fiberglass, and wood options available",
                "Energy-efficient design reduces heat transfer",
                "Enhanced security features",
                "Professional installation ensures proper fit",
                "Wide selection of styles, colors, and finishes"
            ]
        },
        
        testimonial: {
            title: "Customer Success Stories",
            type: "testimonial",
            quote: "We had all our windows replaced by New York Sash and couldn't be happier with the results. The installation was quick and professional, and we've already noticed a big difference in our heating bills. Their team was courteous and left our home spotless.",
            author: "Michael & Sarah Johnson",
            location: "Utica, NY",
            description: "Hear what our customers throughout Central New York have to say about their experience with New York Sash."
        },
        
        financing: {
            title: "Affordable Financing Options",
            type: "text",
            description: "Make your home improvement dreams a reality with our flexible financing options designed to fit your budget.",
            details: [
                {
                    heading: "0% Interest Options",
                    text: "Qualified buyers can take advantage of our 0% interest financing plans, making your project more affordable than ever."
                },
                {
                    heading: "Flexible Payment Plans",
                    text: "We offer a variety of payment plans with competitive rates and terms to suit your financial situation."
                }
            ],
            bullets: [
                "Fast application process",
                "Competitive interest rates",
                "Fixed monthly payments",
                "No prepayment penalties",
                "Transparent terms and conditions"
            ]
        },
        
        warranty: {
            title: "Lifetime Warranty",
            type: "text",
            description: "New York Sash offers one of the strongest warranties in the home improvement industry, providing you with peace of mind for years to come.",
            details: [
                {
                    heading: "Transferable Protection",
                    text: "Our warranty can be transferred to new homeowners, which can be a valuable selling point if you decide to move."
                }
            ],
            bullets: [
                "Lifetime coverage on materials and installation",
                "Transferable to new homeowners",
                "Local service team for quick response",
                "No pro-rating - full coverage for life",
                "Backed by over 30 years of business stability"
            ]
        }
    };

    const conversationFlow: any = {
        welcome: {
            message: "Hi there! I'm your New York Sash virtual assistant. How can I help you today?",
            options: [
                { text: "I need new windows", value: "windows" },
                { text: "Tell me about siding", value: "siding" },
                { text: "Bathroom remodeling", value: "bathroom" },
                { text: "I'm interested in doors", value: "doors" },
                { text: "Financing options", value: "financing" },
            ]
        },
        
        windows: {
            message: "Our energy-efficient replacement windows are a great choice for homes in the Utica area. What would you like to know about our windows?",
            sidebar: "windows",
            options: [
                { text: "Window styles", value: "window_styles" },
                { text: "Energy efficiency", value: "window_efficiency" },
                { text: "Pricing information", value: "window_pricing" },
                { text: "Warranty details", value: "warranty" }
            ]
        },
        
        window_styles: {
            message: "We offer a variety of window styles to suit your home's architecture and your personal preferences. Our most popular styles include double-hung, casement, sliding, bay, and bow windows. Each style has unique benefits. What style are you most interested in?",
            options: [
                { text: "Double-hung windows", value: "double_hung" },
                { text: "Casement windows", value: "casement" },
                { text: "Sliding windows", value: "sliding" },
                { text: "Bay or bow windows", value: "bay_bow" }
            ]
        },
        
        window_efficiency: {
            message: "Our windows exceed ENERGY STAR standards for the Upstate NY climate. They feature Low-E glass coatings, argon gas filling, and insulated frames to maximize energy efficiency. Many of our customers report energy savings of 20-30% after installation. Would you like to learn more about the specific features?",
            options: [
                { text: "Tell me about Low-E glass", value: "low_e" },
                { text: "How much can I save?", value: "energy_savings" },
                { text: "Request a free quote", value: "quote_request" }
            ]
        },
        
        window_pricing: {
            message: "Window pricing depends on several factors including size, style, and the number of windows needed. We offer competitive pricing and flexible financing options. Would you like to get a personalized quote for your home?",
            sidebar: "financing",
            options: [
                { text: "Yes, I'd like a free quote", value: "quote_request" },
                { text: "Tell me about financing", value: "financing" },
                { text: "Not ready yet", value: "not_ready" }
            ]
        },
        
        siding: {
            message: "Our premium vinyl siding is designed to withstand Upstate NY's varied climate while enhancing your home's appearance. What specific aspect of our siding are you interested in?",
            sidebar: "siding",
            options: [
                { text: "Siding styles & colors", value: "siding_styles" },
                { text: "Insulated siding options", value: "insulated_siding" },
                { text: "Get a free estimate", value: "quote_request" },
                { text: "Warranty information", value: "warranty" }
            ]
        },
        
        bathroom: {
            message: "Our one-day bathroom remodeling services can transform your bathroom quickly with minimal disruption. What type of bathroom project are you considering?",
            sidebar: "bathrooms",
            options: [
                { text: "Tub to shower conversion", value: "tub_to_shower" },
                { text: "Walk-in tubs", value: "walk_in_tubs" },
                { text: "Full bathroom remodel", value: "full_bathroom" },
                { text: "Schedule a consultation", value: "quote_request" }
            ]
        },
        
        doors: {
            message: "New doors can enhance your home's security, energy efficiency, and curb appeal. What type of doors are you interested in?",
            sidebar: "doors",
            options: [
                { text: "Entry doors", value: "entry_doors" },
                { text: "Patio doors", value: "patio_doors" },
                { text: "Storm doors", value: "storm_doors" },
                { text: "Request a quote", value: "quote_request" }
            ]
        },
        
        financing: {
            message: "We offer flexible financing options to make your home improvement project affordable. This includes 0% interest options for qualified buyers and various payment plans to fit your budget.",
            sidebar: "financing",
            options: [
                { text: "Tell me about 0% financing", value: "zero_interest" },
                { text: "What are the payment terms?", value: "payment_terms" },
                { text: "How do I apply?", value: "financing_application" },
                { text: "Request more information", value: "quote_request" }
            ]
        },
        
        warranty: {
            message: "Our lifetime warranty is one of the strongest in the industry. It covers both materials and labor for as long as you own your home, and it's even transferable to the next homeowner if you sell your home.",
            sidebar: "warranty",
            options: [
                { text: "What's covered?", value: "warranty_coverage" },
                { text: "Is it transferable?", value: "warranty_transfer" },
                { text: "How to make a claim", value: "warranty_claim" },
                { text: "Learn about our products", value: "welcome" }
            ]
        },
        
        quote_request: {
            message: "Great! We'd be happy to provide a free, no-obligation quote for your project. To get started, could you tell me your name?",
            input: "name"
        },
        
        contact_info: {
            message: "Thanks, {name}! What's the best phone number to reach you?",
            input: "phone"
        },
        
        email_request: {
            message: "Perfect! And what's your email address so we can send you some information?",
            input: "email"
        },
        
        schedule_confirmation: {
            message: "Thank you for your interest in New York Sash! A member of our team will contact you within 24 hours to discuss your project and schedule a free in-home consultation. In the meantime, is there anything specific you'd like us to know about your project?",
            sidebar: "testimonial",
            options: [
                { text: "No, that's all for now", value: "thank_you" },
                { text: "Yes, I have more details", value: "project_details" }
            ]
        },
        
        thank_you: {
            message: "Wonderful! We look forward to helping you with your home improvement project. If you have any other questions before your consultation, feel free to call us at (315) 222-0000 or visit our showroom in Utica. Have a great day!",
            options: [
                { text: "Start over", value: "welcome" }
            ]
        }
    };

    const scrollToBottom = () => { 
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
    };
    
    useEffect(scrollToBottom, [messages]);

    const addAgentMessage = (message: string) => { 
        setMessages(prev => [...prev, { sender: 'agent', text: message }]); 
    };
    
    const addUserMessage = (message: string) => { 
        setMessages(prev => [...prev, { sender: 'user', text: message }]); 
    };
    
    const handleNameSubmit = async (name: string) => {
        let location = null;
        let city = 'generic';
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const data = await response.json();
                const serviceAreas = ['Utica', 'Rome', 'Whitesboro', 'Clinton', 'New Hartford'];
                city = serviceAreas.includes(data.city) ? data.city : 'Mohawk Valley';
                location = data.city + ', ' + data.region;
            }
        } catch (error) {
            console.error('Error fetching location:', error);
        }
        
        setUserInfo({ name, location });
        addUserMessage(name);
        addAgentMessage(`Great to meet you, ${name}! What's the best phone number to reach you?`);
        setCurrentStep('contact_info');
    };
    
    const processStep = (stepKey: string, userText: string) => {
        const step = conversationFlow[stepKey];
        
        if (!step) return;
        
        if (step.sidebar) {
            setSidebarContent(sidebarContentDB[step.sidebar]);
        }
        
        let message = step.message;
        
        if (stepKey === 'contact_info' && userInfo) {
            message = message.replace('{name}', userInfo.name);
        }
        
        switch (stepKey) {
            case 'quote_request':
                addAgentMessage(message);
                setCurrentStep('quote_request');
                break;
                
            case 'contact_info':
                setContactInfo(prev => ({ ...prev, phone: userText }));
                addAgentMessage(message);
                setCurrentStep('email_request');
                break;
                
            case 'email_request':
                setContactInfo(prev => ({ ...prev, email: userText }));
                addAgentMessage(conversationFlow['schedule_confirmation'].message);
                setCurrentStep('schedule_confirmation');
                if (conversationFlow['schedule_confirmation'].sidebar) {
                    setSidebarContent(sidebarContentDB[conversationFlow['schedule_confirmation'].sidebar]);
                }
                break;
                
            default:
                addAgentMessage(message);
                setCurrentStep(stepKey);
                break;
        }
    };
    
    const currentOptions = conversationFlow[currentStep]?.options || [];
    
    // Initialize the chat
    useEffect(() => {
        if (messages.length === 0) {
            const welcomeStep = conversationFlow['welcome'];
            addAgentMessage(welcomeStep.message);
        }
    }, []);
    
    return (
        <div className="flex flex-col h-screen bg-white font-sans antialiased">
            <AppHeader userInfo={userInfo} />
            
            <div className="flex-1 flex overflow-hidden">
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="max-w-3xl mx-auto">
                            {messages.map((msg, index) => (
                                <ChatMessage 
                                    key={index} 
                                    message={msg.text} 
                                    sender={msg.sender} 
                                    onAskQuestion={handleCustomQuestionClick}
                                />
                            ))}
                            
                            {/* Only show options if we're not in a custom question flow */}
                            {!isAskingCustom && currentStep !== 'quote_request' && currentStep !== 'contact_info' && currentStep !== 'email_request' && currentOptions.length > 0 && (
                                <ChatOptions 
                                    options={currentOptions} 
                                    onSelect={(value, text) => {
                                        addUserMessage(text);
                                        processStep(value, text);
                                    }} 
                                />
                            )}
                            
                            {/* User input for name, phone, email */}
                            {(currentStep === 'quote_request' || currentStep === 'contact_info' || currentStep === 'email_request') && (
                                <div className="flex gap-2 ml-14 my-4">
                                    <input
                                        type="text"
                                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={
                                            currentStep === 'quote_request' 
                                                ? "Enter your name..." 
                                                : currentStep === 'contact_info' 
                                                    ? "Enter your phone number..." 
                                                    : "Enter your email address..."
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                                                const value = (e.target as HTMLInputElement).value.trim();
                                                if (currentStep === 'quote_request') {
                                                    handleNameSubmit(value);
                                                } else if (currentStep === 'contact_info') {
                                                    addUserMessage(value);
                                                    processStep('contact_info', value);
                                                } else if (currentStep === 'email_request') {
                                                    addUserMessage(value);
                                                    processStep('email_request', value);
                                                }
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }}
                                    />
                                    <button
                                        className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
                                        onClick={(e) => {
                                            const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                                            if (input.value.trim()) {
                                                const value = input.value.trim();
                                                if (currentStep === 'quote_request') {
                                                    handleNameSubmit(value);
                                                } else if (currentStep === 'contact_info') {
                                                    addUserMessage(value);
                                                    processStep('contact_info', value);
                                                } else if (currentStep === 'email_request') {
                                                    addUserMessage(value);
                                                    processStep('email_request', value);
                                                }
                                                input.value = '';
                                            }
                                        }}
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                            
                            <div ref={chatEndRef} />
                        </div>
                    </div>
                </div>
                
                {/* Sidebar */}
                <div className="hidden md:block w-1/3 max-w-sm">
                    <Sidebar content={sidebarContent} />
                </div>
            </div>
            
            {/* Custom Question Dialog */}
            <Dialog open={customDialogOpen} onOpenChange={setCustomDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Ask a Custom Question</DialogTitle>
                        <DialogDescription>
                            What would you like to know about this topic?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-3 items-center">
                        <input
                            type="text"
                            value={customQuestion}
                            onChange={(e) => setCustomQuestion(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your question here..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && customQuestion.trim()) {
                                    handleCustomQuestionSubmit();
                                }
                            }}
                        />
                        <button
                            onClick={handleVoiceToTextToggle}
                            className={`p-2.5 rounded-full ${isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-80`}
                            aria-label={isListening ? "Stop listening" : "Start voice input"}
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleCustomQuestionSubmit} disabled={!customQuestion.trim()}>
                            Ask Question
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
