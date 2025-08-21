// Welcome to your New York Sash React App!
// This version updates the sidebar's quick actions to be "Call Us" and "Text Us",
// with links that open the native phone and messaging applications.

import React, { useState, useEffect, useRef } from 'react';
import { Video, BookOpen, Star, MapPin, Send, DollarSign, ShieldCheck, FileText, Phone, MessageSquare } from 'lucide-react';

// --- Helper Components (Icons) ---
const NysLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM2 12l10 5 10-5-10-5-10 5z" />
    </svg>
);

// --- Main Application Components ---

const ChatMessage = ({ message, sender }: { message: string; sender: string }) => {
    const isUser = sender === 'user';
    const isAgent = sender === 'agent';

    return (
        <div className={`flex items-end gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {isAgent && (
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <NysLogo className="w-6 h-6 text-white" />
                </div>
            )}
            <div
                className={`px-4 py-3 rounded-2xl max-w-sm md:max-w-md lg:max-w-lg shadow-md transition-all duration-300 ${
                    isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                }`}
            >
                <p className="text-base" style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
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
                        <h1 className="text-lg font-bold text-gray-800">New York Sash</h1>
                        {userInfo && <p className="text-sm text-gray-500">Hello, {userInfo.name.split(' ')[0]}!</p>}
                    </div>
                </div>
                <nav className="hidden md:flex gap-6 text-sm">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} className="text-gray-600 hover:text-blue-600 font-medium">{link.name}</a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

const WelcomeScreen = ({ onNameSubmit }: { onNameSubmit: (name: string) => void }) => {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onNameSubmit(name.trim());
        }
    };

    const quickLinks = [
        { title: "Window Sale", subtitle: "Save big this season", href: "#" },
        { title: "Financing Specials", subtitle: "0% APR for 12 months", href: "#" },
        { title: "Bathroom Promos", subtitle: "Free upgrade included", href: "#" }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50 items-center justify-center text-center p-4">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl mb-6">
                <NysLogo className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Welcome to New York Sash</h1>
            <p className="text-lg text-gray-600 mt-2 mb-8">Your personal home improvement assistant.</p>
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First, what's your name?"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
                <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                    <Send className="w-6 h-6" />
                </button>
            </form>

            <div className="mt-12 w-full max-w-lg text-center">
                <p className="text-sm text-gray-500 mb-4">Or, check out our current offers</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickLinks.map(link => (
                         <a href={link.href} key={link.title} className="block bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-400 transition-all transform hover:-translate-y-1">
                            <p className="font-semibold text-gray-800">{link.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{link.subtitle}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ content }: { content: any }) => {
    if (!content) {
        return (
            <aside className="hidden md:flex w-full md:w-1/3 lg:w-1/4 bg-gray-50 p-6 border-l border-gray-200 flex-col items-center justify-center text-center">
                <NysLogo className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="font-bold text-gray-500">Your Assistant</h3>
                <p className="text-sm text-gray-400">Relevant content will appear here as we chat.</p>
            </aside>
        );
    }

    return (
        <aside className="hidden md:block w-full md:w-1/3 lg:w-1/4 bg-white p-6 border-l border-gray-200 overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">{content.title}</h2>
            <div className="space-y-6">
                <div className="group">
                    <div className="flex items-center gap-3 mb-2"><Video className="w-5 h-5 text-blue-500" /><h3 className="font-semibold text-gray-700">Featured Video</h3></div>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-gray-200"><img src={content.video.thumbnail} alt={content.video.title} className="w-full h-full object-cover" /></div>
                    <p className="text-sm text-gray-600 mt-2">{content.video.title}</p>
                </div>
                <div className="group">
                     <div className="flex items-center gap-3 mb-2"><BookOpen className="w-5 h-5 text-blue-500" /><h3 className="font-semibold text-gray-700">From Our Blog</h3></div>
                    <a href="#" className="text-sm text-blue-600 hover:underline">{content.blog.title}</a>
                </div>
                <div className="group">
                     <div className="flex items-center gap-3 mb-2"><Star className="w-5 h-5 text-blue-500" /><h3 className="font-semibold text-gray-700">Customer Review</h3></div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-sm italic text-gray-700">"{content.review.quote}"</p>
                        <p className="text-sm font-semibold text-right mt-2">- {content.review.author}</p>
                    </div>
                </div>
                {/* Quick Actions Section */}
                <div>
                    <div className="grid grid-cols-2 gap-3 mt-8">
                        <a href="tel:315-768-8171" className="block bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-400 transition-all text-center transform hover:-translate-y-1">
                            <Phone className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                            <p className="font-semibold text-gray-800 text-sm">Call Us</p>
                        </a>
                        <a href="sms:315-768-8171" className="block bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-400 transition-all text-center transform hover:-translate-y-1">
                            <MessageSquare className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                            <p className="font-semibold text-gray-800 text-sm">Text Us</p>
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const InstantActions = ({ onActionSelect }: { onActionSelect: (value: string, text: string) => void }) => {
    const actions = [
        { label: 'Free Quote', value: 'contact', icon: <FileText className="w-5 h-5" /> },
        { label: 'Financing', value: 'financing', icon: <DollarSign className="w-5 h-5" /> },
        { label: 'Warranty', value: 'warranty', icon: <ShieldCheck className="w-5 h-5" /> },
    ];

    return (
        <div className="bg-white border-t border-gray-200 p-3">
            <div className="container mx-auto flex justify-around items-center gap-2">
                {actions.map(action => (
                    <button
                        key={action.value}
                        onClick={() => onActionSelect(action.value, `I'd like to know about ${action.label}.`)}
                        className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 transition-colors w-full p-2 rounded-lg hover:bg-gray-100"
                    >
                        {action.icon}
                        <span className="text-xs font-medium mt-1">{action.label}</span>
                    </button>
                ))}
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

    // Mock content database
    const sidebarContentDB = {
        bathrooms: {
            generic: { title: "Bathroom Remodeling", video: { title: "One-Day Bathroom Transformations", thumbnail: "https://placehold.co/400x225/a0c4ff/ffffff?text=Bathroom+Video" }, blog: { title: "Top 5 Bathroom Trends in Central NY" }, review: { quote: "They remodeled our bathroom in a single day, just as promised. Incredible!", author: "Sarah K., Syracuse" } },
            utica: { title: "Bathroom Remodeling in Utica", video: { title: "See a Recent Utica Bathroom Project", thumbnail: "https://placehold.co/400x225/90e0ef/ffffff?text=Utica+Bathroom" }, blog: { title: "Maximizing Small Bathroom Space in Utica Homes" }, review: { quote: "New York Sash made our old bathroom feel brand new. The team was fantastic.", author: "John D., Utica" } }
        },
        windows: {
            generic: { title: "Replacement Windows", video: { title: "Energy-Efficient Windows in Action", thumbnail: "https://placehold.co/400x225/a0c4ff/ffffff?text=Window+Video" }, blog: { title: "Are Triple-Pane Windows Worth It in NY?" }, review: { quote: "Our heating bills dropped immediately after New York Sash installed our new windows.", author: "Mike T., Rome" } },
            utica: { title: "Windows for Utica Homes", video: { title: "A Recent Window Installation in Utica", thumbnail: "https://placehold.co/400x225/90e0ef/ffffff?text=Utica+Windows" }, blog: { title: "Choosing the Right Window Style for Historic Utica Homes" }, review: { quote: "The new windows look perfect on our older home. Great craftsmanship.", author: "Emily R., Utica" } }
        },
    };

    const conversationFlow: any = {
        welcome: {
            agent: (name: string, loc: string) => `Hi ${name}! Thanks for connecting. ${loc ? `Happy to help our neighbors in ${loc}. ` : ''}What home improvement project are you thinking about?`,
            options: [ { text: 'Windows', value: 'windows' }, { text: 'Siding', value: 'siding' }, { text: 'Bathrooms', value: 'bathrooms' }, { text: 'Doors', value: 'doors' } ],
            next: (choice: string) => choice,
        },
        windows: { agent: "Great! We offer a wide variety of beautiful, energy-efficient replacement windows. What are you most interested in?", options: [ { text: 'Energy Efficiency', value: 'windows_efficiency' }, { text: 'Curb Appeal', value: 'windows_style' } ], next: (choice: string) => choice, },
        bathrooms: { agent: "Great choice! We specialize in stunning one-day bath and shower remodels. What would you like to know more about?", options: [ { text: 'The One-Day Process', value: 'bath_process' }, { text: 'Safety & Accessibility', value: 'bath_safety' } ], next: (choice: string) => choice, },
        financing: { agent: (context: string) => `Of course. We offer flexible financing to make your dream ${context || 'project'} a reality. A specialist can walk you through the options. To get started, what is the best phone number and email to reach you?`, next: () => 'end_contact' },
        warranty: { agent: (context: string) => `Absolutely. We stand behind our work. All our ${context || 'products'} come with a comprehensive warranty for your peace of mind. A specialist can provide all the details for you. Can I get your phone and email?`, next: () => 'end_contact' },
        contact: { agent: (context: string, name: string) => `Perfect, ${name}. A specialist can provide a detailed, free quote for your ${context || 'project'}. I'll have someone reach out to the contact info you provide. What is the best phone number and email?`, next: () => 'end_contact' },
        end_contact: { agent: "Thank you! We'll be in touch soon. Have a great day!", next: () => null },
    };

    const scrollToBottom = () => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    useEffect(scrollToBottom, [messages]);

    const addAgentMessage = (message: string) => { setMessages(prev => [...prev, { sender: 'agent', text: message }]); };
    const addUserMessage = (message: string) => { setMessages(prev => [...prev, { sender: 'user', text: message }]); };
    
    const handleNameSubmit = async (name: string) => {
        let location = null;
        let city = 'generic';
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const data = await response.json();
                const serviceAreas = ['Utica', 'Rome', 'Whitesboro', 'Clinton', 'New Hartford'];
                if (serviceAreas.includes(data.city)) { location = data.city; city = data.city.toLowerCase(); }
            }
        } catch (error) { console.error("Could not fetch location.", error); }
        setUserInfo({ name, location: city });
        addAgentMessage(conversationFlow.welcome.agent(name.split(' ')[0], location));
    };

    const processStep = (stepKey: string, userText: string) => {
        addUserMessage(userText);
        
        const productCategories = ['windows', 'siding', 'bathrooms', 'doors'];
        if (productCategories.includes(stepKey)) {
            setProductContext(stepKey);
             if (sidebarContentDB[stepKey as keyof typeof sidebarContentDB]) {
                const content = sidebarContentDB[stepKey as keyof typeof sidebarContentDB][userInfo?.location] || sidebarContentDB[stepKey as keyof typeof sidebarContentDB].generic;
                setSidebarContent(content);
            }
        }
        
        setTimeout(() => {
            const currentFlow = conversationFlow[currentStep];
            const nextStepKey = currentFlow ? currentFlow.next(stepKey) : stepKey;
            
            if (nextStepKey && conversationFlow[nextStepKey]) {
                const nextFlow = conversationFlow[nextStepKey];
                const agentMessage = typeof nextFlow.agent === 'function' 
                    ? nextFlow.agent(productContext || 'project', userInfo?.name.split(' ')[0] || '') 
                    : nextFlow.agent;

                addAgentMessage(agentMessage);
                setCurrentStep(nextStepKey);
            }
        }, 800);
    };

    const currentOptions = conversationFlow[currentStep]?.options || [];

    return (
        <div className="flex flex-col h-screen bg-white font-sans antialiased">
            {!userInfo ? (
                <WelcomeScreen onNameSubmit={handleNameSubmit} />
            ) : (
                <>
                    <AppHeader userInfo={userInfo} />
                    <div className="flex flex-1 overflow-hidden">
                        <div className="flex flex-col flex-1 h-full">
                            <main className="flex-1 overflow-y-auto p-4 md:p-6">
                                <div className="container mx-auto">
                                    {messages.map((msg, index) => (<ChatMessage key={index} message={msg.text} sender={msg.sender} />))}
                                    {currentOptions.length > 0 && (<ChatOptions options={currentOptions} onSelect={processStep} />)}
                                    <div ref={chatEndRef} />
                                </div>
                            </main>
                            <InstantActions onActionSelect={processStep} />
                        </div>
                        <Sidebar content={sidebarContent} />
                    </div>
                </>
            )}
        </div>
    );
}