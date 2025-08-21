// Welcome to your New York Sash React App!
// This version updates the sidebar's quick actions to be "Call Us" and "Text Us",
// with links that open the native phone and messaging applications.

import React, { useState, useEffect, useRef } from 'react';
import { Video, BookOpen, Star, MapPin, Send, DollarSign, ShieldCheck, FileText, Phone, MessageSquare, ShoppingCart } from 'lucide-react';

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
                {/* Product Section - replaces video when available */}
                {content.product ? (
                    <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingCart className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold text-gray-700">Featured Product</h3>
                        </div>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-gray-200">
                            <img 
                                src={content.product.image} 
                                alt={content.product.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="font-semibold text-gray-800 mt-2">{content.product.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{content.product.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                            <span className="font-bold text-blue-600">${content.product.price}</span>
                            <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                                View Details
                            </button>
                        </div>
                    </div>
                ) : content.video ? (
                    <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <Video className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold text-gray-700">Featured Video</h3>
                        </div>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-gray-200">
                            <img 
                                src={content.video.thumbnail} 
                                alt={content.video.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{content.video.title}</p>
                    </div>
                ) : null}

                {content.blog && (
                    <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold text-gray-700">From Our Blog</h3>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:underline">{content.blog.title}</a>
                    </div>
                )}

                {content.review && (
                    <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <Star className="w-5 h-5 text-blue-500" />
                            <h3 className="font-semibold text-gray-700">Customer Review</h3>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <p className="text-sm italic text-gray-700">"{content.review.quote}"</p>
                            <p className="text-sm font-semibold text-right mt-2">- {content.review.author}</p>
                        </div>
                    </div>
                )}

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

    // Mock content database with Utica-specific content and product integration
    const sidebarContentDB = {
        bathrooms: {
            generic: { 
                title: "Bathroom Remodeling", 
                video: { title: "One-Day Bathroom Transformations", thumbnail: "https://placehold.co/400x225/a0c4ff/ffffff?text=Bathroom+Video" }, 
                blog: { title: "Top 5 Bathroom Trends in Central NY" }, 
                review: { quote: "They remodeled our bathroom in a single day, just as promised. Incredible!", author: "Sarah K., Syracuse" } 
            },
            utica: { 
                title: "Bathroom Remodeling in Utica", 
                video: { title: "See a Recent Utica Bathroom Project", thumbnail: "https://placehold.co/400x225/90e0ef/ffffff?text=Utica+Bathroom" }, 
                blog: { title: "Maximizing Small Bathroom Space in Utica Homes" }, 
                review: { quote: "New York Sash made our old bathroom feel brand new. The team was fantastic.", author: "John D., Utica" } 
            }
        },
        windows: {
            generic: { 
                title: "Replacement Windows", 
                video: { title: "Energy-Efficient Windows in Action", thumbnail: "https://placehold.co/400x225/a0c4ff/ffffff?text=Window+Video" }, 
                blog: { title: "Are Triple-Pane Windows Worth It in NY?" }, 
                review: { quote: "Our heating bills dropped immediately after New York Sash installed our new windows.", author: "Mike T., Rome" } 
            },
            utica: { 
                title: "Windows for Utica Homes", 
                video: { title: "A Recent Window Installation in Utica", thumbnail: "https://placehold.co/400x225/90e0ef/ffffff?text=Utica+Windows" }, 
                blog: { title: "Choosing the Right Window Style for Historic Utica Homes" }, 
                review: { quote: "The new windows look perfect on our older home. Great craftsmanship.", author: "Emily R., Utica" } 
            }
        },
        double_hung: {
            generic: {
                title: "Double Hung Windows",
                product: {
                    name: "Premium Double Hung Vinyl Window",
                    description: "Energy-efficient double hung window with tilt-in sashes for easy cleaning",
                    price: "299.99",
                    image: "https://placehold.co/400x225/4a90e2/ffffff?text=Double+Hung+Window"
                },
                blog: { title: "Benefits of Double Hung Windows" },
                review: { quote: "These windows are perfect for our family. Easy to clean and very energy efficient.", author: "Robert L., Syracuse" }
            },
            utica: {
                title: "Double Hung Windows for Utica",
                product: {
                    name: "Utica Double Hung Vinyl Window",
                    description: "Custom-designed for Utica homes with enhanced weather resistance",
                    price: "329.99",
                    image: "https://placehold.co/400x225/50c878/ffffff?text=Utica+Double+Hung"
                },
                blog: { title: "Double Hung Windows in Historic Utica Homes" },
                review: { quote: "Perfect fit for our 1920s home. The energy savings are impressive!", author: "Justin M., Utica" }
            }
        },
        bay_bow: {
            generic: {
                title: "Bay & Bow Windows",
                product: {
                    name: "Custom Bay Window System",
                    description: "Beautiful projecting windows that add space and light to any room",
                    price: "899.99",
                    image: "https://placehold.co/400x225/ffa500/ffffff?text=Bay+Window"
                },
                blog: { title: "Maximizing Natural Light with Bay Windows" },
                review: { quote: "Our bay window transformed our living room. So much more spacious now!", author: "Lisa K., Clinton" }
            },
            utica: {
                title: "Bay & Bow Windows for Utica",
                product: {
                    name: "Utica Bay Window Collection",
                    description: "Designed for Utica's architectural styles with enhanced insulation",
                    price: "949.99",
                    image: "https://placehold.co/400x225/ff6347/ffffff?text=Utica+Bay+Window"
                },
                blog: { title: "Bay Windows for Utica's Historic Districts" },
                review: { quote: "Absolutely love our new bay window. It's the focal point of our dining room.", author: "Mark T., Utica" }
            }
        },
        picture: {
            generic: {
                title: "Picture Windows",
                product: {
                    name: "Large Picture Window",
                    description: "Maximize your view with our energy-efficient fixed windows",
                    price: "449.99",
                    image: "https://placehold.co/400x225/9370db/ffffff?text=Picture+Window"
                },
                blog: { title: "Picture Windows for Stunning Views" },
                review: { quote: "The view from our picture window is breathtaking. Worth every penny.", author: "Jennifer S., Rome" }
            },
            utica: {
                title: "Picture Windows for Utica",
                product: {
                    name: "Utica Picture Window",
                    description: "Custom-sized for Utica homes with superior clarity and insulation",
                    price: "479.99",
                    image: "https://placehold.co/400x225/20b2aa/ffffff?text=Utica+Picture+Window"
                },
                blog: { title: "Picture Windows for Utica's Scenic Areas" },
                review: { quote: "Our picture window frames the garden perfectly. Beautiful craftsmanship.", author: "Justin M., Utica" }
            }
        },
        awning: {
            generic: {
                title: "Awning Windows",
                product: {
                    name: "Vinyl Awning Window",
                    description: "Top-hinged windows perfect for ventilation during light rain",
                    price: "199.99",
                    image: "https://placehold.co/400x225/ff69b4/ffffff?text=Awning+Window"
                },
                blog: { title: "Awning Windows for Optimal Ventilation" },
                review: { quote: "These windows are perfect for our kitchen. Great airflow even in the rain.", author: "David P., Whitesboro" }
            },
            utica: {
                title: "Awning Windows for Utica",
                product: {
                    name: "Utica Awning Window",
                    description: "Weather-resistant awning windows designed for Utica's climate",
                    price: "219.99",
                    image: "https://placehold.co/400x225/32cd32/ffffff?text=Utica+Awning+Window"
                },
                blog: { title: "Awning Windows for Utica's Variable Weather" },
                review: { quote: "Perfect for our basement. Great ventilation without compromising security.", author: "Justin M., Utica" }
            }
        },
        slider: {
            generic: {
                title: "Slider Windows",
                product: {
                    name: "Smooth Glide Slider Window",
                    description: "Easy-to-operate horizontal sliding windows with superior insulation",
                    price: "279.99",
                    image: "https://placehold.co/400x225/ff4500/ffffff?text=Slider+Window"
                },
                blog: { title: "Slider Windows: Easy Operation, Great Views" },
                review: { quote: "These slider windows are so smooth. Much easier than our old crank windows.", author: "Nancy W., New Hartford" }
            },
            utica: {
                title: "Slider Windows for Utica",
                product: {
                    name: "Utica Slider Window",
                    description: "Durable slider windows built for Utica's weather conditions",
                    price: "299.99",
                    image: "https://placehold.co/400x225/8a2be2/ffffff?text=Utica+Slider+Window"
                },
                blog: { title: "Slider Windows for Utica's Modern Homes" },
                review: { quote: "The slider windows in our family room are perfect. Easy to use and energy efficient.", author: "Justin M., Utica" }
            }
        },
        hopper: {
            generic: {
                title: "Hopper Windows",
                product: {
                    name: "Basement Hopper Window",
                    description: "Bottom-hinged windows ideal for basements and small spaces",
                    price: "179.99",
                    image: "https://placehold.co/400x225/ff8c00/ffffff?text=Hopper+Window"
                },
                blog: { title: "Hopper Windows for Basement Ventilation" },
                review: { quote: "These hopper windows are perfect for our basement. Great airflow and security.", author: "Tom R., Clinton" }
            },
            utica: {
                title: "Hopper Windows for Utica",
                product: {
                    name: "Utica Hopper Window",
                    description: "Secure hopper windows designed for Utica's basement conditions",
                    price: "199.99",
                    image: "https://placehold.co/400x225/008080/ffffff?text=Utica+Hopper+Window"
                },
                blog: { title: "Hopper Windows for Utica's Historic Basements" },
                review: { quote: "Exactly what we needed for our finished basement. Works perfectly.", author: "Justin M., Utica" }
            }
        },
        casement: {
            generic: {
                title: "Casement Windows",
                product: {
                    name: "Crank-Operated Casement Window",
                    description: "Outward-opening windows with superior ventilation and security",
                    price: "349.99",
                    image: "https://placehold.co/400x225/4169e1/ffffff?text=Casement+Window"
                },
                blog: { title: "Casement Windows for Maximum Ventilation" },
                review: { quote: "These casement windows provide excellent airflow. The crank mechanism is smooth.", author: "Susan L., Rome" }
            },
            utica: {
                title: "Casement Windows for Utica",
                product: {
                    name: "Utica Casement Window",
                    description: "Secure casement windows with enhanced weather resistance for Utica",
                    price: "379.99",
                    image: "https://placehold.co/400x225/dc143c/ffffff?text=Utica+Casement+Window"
                },
                blog: { title: "Casement Windows for Utica's Drafty Winters" },
                review: { quote: "Our new casement windows keep out the cold Utica winters perfectly. Great quality.", author: "Justin M., Utica" }
            }
        },
        siding: {
            generic: {
                title: "Siding Options",
                video: { title: "Transform Your Home with New Siding", thumbnail: "https://placehold.co/400x225/90e0ef/ffffff?text=Siding+Video" },
                blog: { title: "Choosing the Right Siding for Your Home" },
                review: { quote: "The new siding completely transformed our home's curb appeal. Worth every penny!", author: "Robert L., Syracuse" }
            },
            utica: {
                title: "Siding for Utica Homes",
                video: { title: "Recent Siding Project in Utica", thumbnail: "https://placehold.co/400x225/50c878/ffffff?text=Utica+Siding" },
                blog: { title: "Siding Options for Historic Utica Homes" },
                review: { quote: "New York Sash helped us choose the perfect siding for our 1920s home. The team was fantastic!", author: "Justin M., Utica" }
            }
        },
        engineered_wood: {
            generic: {
                title: "Engineered Wood Siding",
                product: {
                    name: "Diamond Kote Engineered Wood Siding",
                    description: "Rich texture and natural appeal of wood with enhanced durability and 30-year warranty",
                    price: "5.99/sq ft",
                    image: "https://placehold.co/400x225/8B4513/ffffff?text=Engineered+Wood+Siding"
                },
                blog: { title: "Benefits of Engineered Wood Siding" },
                review: { quote: "Love the look of real wood without the maintenance. The warranty gives us peace of mind.", author: "Sarah K., Rome" }
            },
            utica: {
                title: "Engineered Wood Siding for Utica",
                product: {
                    name: "Utica Diamond Kote Siding",
                    description: "Custom-engineered for Utica's weather conditions with enhanced moisture resistance",
                    price: "6.49/sq ft",
                    image: "https://placehold.co/400x225/A0522D/ffffff?text=Utica+Engineered+Wood"
                },
                blog: { title: "Engineered Wood Siding for Historic Utica Homes" },
                review: { quote: "Perfect for our older home. Looks authentic and has held up great through Utica winters.", author: "Justin M., Utica" }
            }
        },
        cedar_shake: {
            generic: {
                title: "Cedar Shake & Shingle Siding",
                product: {
                    name: "Cedar Shake & Shingle Vinyl Siding",
                    description: "Authentic look of real cedar with low-maintenance convenience of vinyl",
                    price: "4.99/sq ft",
                    image: "https://placehold.co/400x225/8B4513/ffffff?text=Cedar+Shake+Siding"
                },
                blog: { title: "Cedar Shake Siding: Classic Beauty with Modern Benefits" },
                review: { quote: "Gets the authentic cedar look without the upkeep. Neighbors can't tell the difference!", author: "Mike T., Whitesboro" }
            },
            utica: {
                title: "Cedar Shake Siding for Utica",
                product: {
                    name: "Utica Cedar Shake Vinyl Siding",
                    description: "Molded from genuine wood shingles with enhanced durability for Utica's climate",
                    price: "5.49/sq ft",
                    image: "https://placehold.co/400x225/8B5A2B/ffffff?text=Utica+Cedar+Shake"
                },
                blog: { title: "Cedar Shake Siding for Utica's Architectural Styles" },
                review: { quote: "Gives our home that classic cottage look we wanted. Perfect for our Utica neighborhood.", author: "Justin M., Utica" }
            }
        },
        reinforced_vinyl: {
            generic: {
                title: "Reinforced Vinyl Siding",
                product: {
                    name: "Reinforced Vinyl Siding",
                    description: "Authentic wood appearance with unmatched durability and low maintenance",
                    price: "3.99/sq ft",
                    image: "https://placehold.co/400x225/4682B4/ffffff?text=Reinforced+Vinyl+Siding"
                },
                blog: { title: "Benefits of Reinforced Vinyl Siding" },
                review: { quote: "Best investment we made for our home. Looks great and zero maintenance!", author: "Lisa K., Clinton" }
            },
            utica: {
                title: "Reinforced Vinyl Siding for Utica",
                product: {
                    name: "Utica Reinforced Vinyl Siding",
                    description: "Enhanced rigidity and impact resistance for Utica's weather conditions",
                    price: "4.49/sq ft",
                    image: "https://placehold.co/400x225/5D8AA8/ffffff?text=Utica+Reinforced+Vinyl"
                },
                blog: { title: "Reinforced Vinyl Siding for Utica's Harsh Winters" },
                review: { quote: "Held up perfectly through last winter's ice storms. No damage whatsoever.", author: "Justin M., Utica" }
            }
        },
        monogram: {
            generic: {
                title: "Monogram Traditional Vinyl Siding",
                product: {
                    name: "Monogram Traditional Vinyl Siding",
                    description: "Classic look of painted or stained cedar with refined aesthetic",
                    price: "3.49/sq ft",
                    image: "https://placehold.co/400x225/708090/ffffff?text=Monogram+Vinyl+Siding"
                },
                blog: { title: "Traditional Vinyl Siding Styles" },
                review: { quote: "Exactly the classic look we wanted. Color has stayed vibrant for years.", author: "Emily R., Utica" }
            },
            utica: {
                title: "Monogram Vinyl Siding for Utica",
                product: {
                    name: "Utica Monogram Traditional Siding",
                    description: "Custom color options designed for Utica's architectural styles",
                    price: "3.99/sq ft",
                    image: "https://placehold.co/400x225/778899/ffffff?text=Utica+Monogram+Siding"
                },
                blog: { title: "Traditional Siding for Historic Utica Homes" },
                review: { quote: "Perfect match for our neighborhood. Neighbors keep asking where we got it!", author: "Justin M., Utica" }
            }
        },
        stacked_stone: {
            generic: {
                title: "Stacked Stone Vinyl Siding",
                product: {
                    name: "Stacked Stone Vinyl Siding",
                    description: "Sophisticated texture and timeless appeal of natural stone",
                    price: "7.99/sq ft",
                    image: "https://placehold.co/400x225/696969/ffffff?text=Stacked+Stone+Siding"
                },
                blog: { title: "Stacked Stone Siding: Elegance Meets Durability" },
                review: { quote: "Transformed our entire home's exterior. Adds so much character and value.", author: "Mark T., Utica" }
            },
            utica: {
                title: "Stacked Stone Siding for Utica",
                product: {
                    name: "Utica Stacked Stone Vinyl Siding",
                    description: "Designed to complement Utica's historic stone architecture",
                    price: "8.49/sq ft",
                    image: "https://placehold.co/400x225/808080/ffffff?text=Utica+Stacked+Stone"
                },
                blog: { title: "Stacked Stone Siding for Utica's Historic Districts" },
                review: { quote: "Perfect for creating accent walls. Blends beautifully with our neighborhood's character.", author: "Justin M., Utica" }
            }
        },
        board_batten: {
            generic: {
                title: "Board & Batten Vertical Vinyl Siding",
                product: {
                    name: "Board & Batten Vertical Vinyl Siding",
                    description: "Dramatic visual impact with strong vertical lines for modern sophistication",
                    price: "4.99/sq ft",
                    image: "https://placehold.co/400x225/2F4F4F/ffffff?text=Board+Batten+Siding"
                },
                blog: { title: "Modern Board & Batten Siding Trends" },
                review: { quote: "Gave our home a completely modern look. The vertical lines make it appear taller.", author: "Nancy W., New Hartford" }
            },
            utica: {
                title: "Board & Batten Siding for Utica",
                product: {
                    name: "Utica Board & Batten Vinyl Siding",
                    description: "Contemporary style designed to complement Utica's diverse architecture",
                    price: "5.49/sq ft",
                    image: "https://placehold.co/400x225/36454F/ffffff?text=Utica+Board+Batten"
                },
                blog: { title: "Board & Batten Siding for Modern Utica Homes" },
                review: { quote: "Love the modern look on our renovated home. Stands out in the best way.", author: "Justin M., Utica" }
            }
        }
    };

    const conversationFlow: any = {
        welcome: {
            agent: (name: string, loc: string) => `Hi ${name}! Thanks for connecting. ${loc ? `Happy to help our neighbors in ${loc}. ` : ''}What home improvement project are you thinking about?`,
            options: [ { text: 'Windows', value: 'windows' }, { text: 'Siding', value: 'siding' }, { text: 'Bathrooms', value: 'bathrooms' }, { text: 'Doors', value: 'doors' } ],
            next: (choice: string) => choice,
        },
        windows: { 
            agent: "Great! We offer a wide variety of beautiful, energy-efficient replacement windows. What are you most interested in?", 
            options: [ 
                { text: 'Window Styles', value: 'windows_styles' }, 
                { text: 'Energy Efficiency', value: 'windows_efficiency' },
                { text: 'Customization Options', value: 'windows_customization' }
            ], 
            next: (choice: string) => choice, 
        },
        windows_styles: { 
            agent: "When you choose New York Sash, you're investing in premium, custom-crafted vinyl windows designed specifically for your Central New York home. Let me tell you about our window styles:\n\n1. Double Hung Windows - Classic and versatile with two operable sashes that tilt inward for easy cleaning.\n2. Bay Windows - Project outward to create spaciousness and increase natural light.\n3. Bow Windows - Gentle curved design for panoramic views.\n4. Picture Windows - Large fixed windows for unobstructed views.\n5. Awning Windows - Hinged at the top, perfect for ventilation during light rain.\n6. Slider Windows - Glide effortlessly with a simple push or pull.\n7. Hopper Windows - Hinged at the bottom, ideal for basements.\n8. Casement Windows - Outward opening with a crank mechanism for security and views.\n\nWhich style interests you most?", 
            options: [ 
                { text: 'Double Hung', value: 'double_hung' }, 
                { text: 'Bay/Bow', value: 'bay_bow' },
                { text: 'Picture', value: 'picture' },
                { text: 'Awning', value: 'awning' },
                { text: 'Slider', value: 'slider' },
                { text: 'Hopper', value: 'hopper' },
                { text: 'Casement', value: 'casement' }
            ], 
            next: (choice: string) => choice, 
        },
        double_hung: { 
            agent: "Double Hung Windows are a classic and versatile choice, featuring two operable sashes (upper and lower) that glide smoothly within the frame. This allows for flexible ventilation – open the top sash, the bottom sash, or both. For easy cleaning, both sashes conveniently tilt inward. Double hung windows are a timeless and practical option for virtually any room in your home.\n\nWould you like to know about customization options for your windows?", 
            options: [ 
                { text: 'Yes, tell me about customization', value: 'windows_customization' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        bay_bow: { 
            agent: "Bay and Bow Windows project outward from your wall, creating a sense of spaciousness and dramatically increasing natural light. Bay windows feature a distinct angular design, while bow windows have a gentle curved shape for panoramic views. Both add architectural elegance and dimension to your home.\n\nWould you like to know about customization options for your windows?", 
            options: [ 
                { text: 'Yes, tell me about customization', value: 'windows_customization' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        picture: { 
            agent: "Picture Windows are perfect for showcasing beautiful views. These large, fixed windows offer expansive, unobstructed views of the outside world and maximize natural light penetration to create a strong visual connection to your outdoor surroundings.\n\nWould you like to know about customization options for your windows?", 
            options: [ 
                { text: 'Yes, tell me about customization', value: 'windows_customization' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        awning: { 
            agent: "Awning Windows are hinged at the top and open outward, making them ideal for ventilation even during light rain. They're perfect for adding privacy and security while still allowing ample sunlight to brighten your home.\n\nWould you like to know about customization options for your windows?", 
            options: [ 
                { text: 'Yes, tell me about customization', value: 'windows_customization' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        slider: { 
            agent: "Slider Windows offer unobstructed views and effortless operation. Say goodbye to cumbersome lifting and cranking—our slider windows glide smoothly with a simple push or pull. With fewer moving parts, they're easier to use and require less maintenance over time.\n\nWould you like to know about customization options for your windows?", 
            options: [ 
                { text: 'Yes, tell me about customization', value: 'windows_customization' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        hopper: { 
            agent: "Hopper Windows are hinged at the bottom and open inward, making them excellent for maximizing airflow in smaller spaces. Often used in basements and bathrooms, they offer ventilation while maintaining security and are easy to operate in confined areas.\n\nWould you like to know about customization options for your windows?", 
            options: [ 
                { text: 'Yes, tell me about customization', value: 'windows_customization' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        casement: { 
            agent: "Casement Windows feature a multi-point locking system for enhanced security and offer panoramic views when opened outward with their easy-to-use crank mechanism. The hinges are designed for easy cleaning from inside your home, and triple weather-stripping ensures a tight seal against drafts.\n\nWould you like to know about customization options for your windows?", 
            options: [ 
                { text: 'Yes, tell me about customization', value: 'windows_customization' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        windows_customization: { 
            agent: "At New York Sash, every window is custom-made for your home. We offer:\n\n1. Colors - A wide range of colors to match your home's exterior and interior.\n2. Grids - Contoured, flat, or simulated divided lite grids for various architectural styles.\n3. Casing - Finishing touches that add architectural detail and refinement.\n\nOur windows exceed ENERGY STAR standards, are built to handle upstate New York weather, and come with our unbeatable warranty.\n\nWould you like to visit our Idea & Design Center to see exactly what your windows will look like?", 
            options: [ 
                { text: 'Tell me about the Design Center', value: 'design_center' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        design_center: { 
            agent: "At the New York Sash Idea & Design Center located at 349 Oriskany Boulevard in Whitesboro, you can see exactly what the windows will look like once installed in your home. Consult with our knowledgeable team, explore design options, and gather inspiration to create the stunning home exterior you've always dreamed of.\n\nWould you like to schedule a visit or get a free quote?", 
            options: [ 
                { text: 'Get a Free Quote', value: 'contact' }, 
                { text: 'Financing Options', value: 'financing' }
            ], 
            next: (choice: string) => choice, 
        },
        windows_efficiency: { 
            agent: "New York Sash windows go beyond ENERGY STAR standards, helping you save on energy costs while maintaining a cozy living environment throughout the year. Our custom-made windows are built to handle upstate New York weather with fusion-welded sashes and frames for incredible strength and durability.\n\nWould you like to know about our customization options?", 
            options: [ 
                { text: 'Yes, tell me about customization', value: 'windows_customization' }, 
                { text: 'Get a Free Quote', value: 'contact' }
            ], 
            next: (choice: string) => choice, 
        },
        siding: {
            agent: "Enhance your home's curb appeal and protection with New York Sash siding. We offer a variety of siding options to transform and protect your home's exterior. Whether you're drawn to the timeless charm of wood, the low-maintenance strength of vinyl, or the sophisticated beauty of stone, we have options to suit your unique taste and budget.\n\nWhat type of siding are you most interested in?",
            options: [
                { text: 'Engineered Wood', value: 'engineered_wood' },
                { text: 'Cedar Shake', value: 'cedar_shake' },
                { text: 'Reinforced Vinyl', value: 'reinforced_vinyl' },
                { text: 'Traditional Vinyl', value: 'monogram' },
                { text: 'Stacked Stone', value: 'stacked_stone' },
                { text: 'Board & Batten', value: 'board_batten' }
            ],
            next: (choice: string) => choice,
        },
        engineered_wood: {
            agent: "Diamond Kote Engineered Wood Siding delivers the rich texture and natural appeal of wood with significantly enhanced durability. This siding is backed by an impressive 30-year no-fade finish warranty, giving you peace of mind for decades to come.\n\nWould you like to know more about our installation process or get a free quote?",
            options: [
                { text: 'Installation Process', value: 'siding_installation' },
                { text: 'Get a Free Quote', value: 'contact' }
            ],
            next: (choice: string) => choice,
        },
        cedar_shake: {
            agent: "Long for the classic, weathered beauty of cedar shingles? Our Cedar Shake & Shingle Vinyl Siding collection provides the authentic look of real cedar, meticulously molded from genuine wood shingles, but with the low-maintenance convenience of vinyl.\n\nWould you like to know more about our installation process or get a free quote?",
            options: [
                { text: 'Installation Process', value: 'siding_installation' },
                { text: 'Get a Free Quote', value: 'contact' }
            ],
            next: (choice: string) => choice,
        },
        reinforced_vinyl: {
            agent: "Reinforced Vinyl Siding offers the best of both worlds: the authentic appearance of traditional wood plank siding and the unmatched durability and low-maintenance benefits of vinyl. Reinforced for enhanced rigidity and impact resistance, this siding is moisture-resistant, eliminating concerns about rot or decay.\n\nWould you like to know more about our installation process or get a free quote?",
            options: [
                { text: 'Installation Process', value: 'siding_installation' },
                { text: 'Get a Free Quote', value: 'contact' }
            ],
            next: (choice: string) => choice,
        },
        monogram: {
            agent: "Available in a wide range of colors and profiles, Monogram Traditional Vinyl Siding beautifully replicates the classic look of painted or stained cedar, offering a refined and enduring aesthetic for any home style.\n\nWould you like to know more about our installation process or get a free quote?",
            options: [
                { text: 'Installation Process', value: 'siding_installation' },
                { text: 'Get a Free Quote', value: 'contact' }
            ],
            next: (choice: string) => choice,
        },
        stacked_stone: {
            agent: "Add the sophisticated texture and timeless appeal of natural stone to your home with Stacked Stone Vinyl Siding. Create stunning accent walls or transform your entire home exterior with this elegant and durable siding option.\n\nWould you like to know more about our installation process or get a free quote?",
            options: [
                { text: 'Installation Process', value: 'siding_installation' },
                { text: 'Get a Free Quote', value: 'contact' }
            ],
            next: (choice: string) => choice,
        },
        board_batten: {
            agent: "Embrace contemporary style with Board and Batten vertical siding. This siding creates a dramatic visual impact with its strong vertical lines, adding height and modern sophistication to any home.\n\nWould you like to know more about our installation process or get a free quote?",
            options: [
                { text: 'Installation Process', value: 'siding_installation' },
                { text: 'Get a Free Quote', value: 'contact' }
            ],
            next: (choice: string) => choice,
        },
        siding_installation: {
            agent: "Our professional siding installation ensures your new siding is properly fitted and secured for maximum durability and protection. We utilize cutting-edge 3D modeling technology to create realistic renderings of your home with different siding products, colors, and styles. This allows you to see your vision come to life before any work begins.\n\nWould you like to visit our Idea & Design Center or get a free quote?",
            options: [
                { text: 'Visit Design Center', value: 'design_center' },
                { text: 'Get a Free Quote', value: 'contact' }
            ],
            next: (choice: string) => choice,
        },
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
        
        // Update sidebar content for specific window styles and siding types
        const windowStyles = ['double_hung', 'bay_bow', 'picture', 'awning', 'slider', 'hopper', 'casement'];
        const sidingTypes = ['engineered_wood', 'cedar_shake', 'reinforced_vinyl', 'monogram', 'stacked_stone', 'board_batten'];
        if (windowStyles.includes(stepKey) || sidingTypes.includes(stepKey)) {
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