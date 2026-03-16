let currentUser = null;
let currentUserType = null;
let authMode = 'register';
let currentPage = 'home';
let gigSkillTags = [];
let profileSkillTags = [];
let cvFile = null;
let cvFileName = '';

let gigsPage = 1;
let jobsPage = 1;
const PAGE_SIZE = 12;

const DB = {
    users: [],
    gigs: [
        
        { id:1,  title:"I will build a full-stack React & Node.js web application", sellerId:0, sellerName:"Priya Sharma",    sellerLevel:"Level 2",   category:"Programming & Tech",    price:5000,  rating:4.9, reviews:142, tags:["React","Node.js","MongoDB"],         icon:"💻", deliveryDays:7  },
        { id:2,  title:"I will build a scalable Django REST API with authentication",  sellerId:0, sellerName:"Rohan Das",      sellerLevel:"Level 1",   category:"Programming & Tech",    price:3500,  rating:4.7, reviews:53,  tags:["Django","Python","REST API"],        icon:"🐍", deliveryDays:5  },
        { id:3,  title:"I will develop a Next.js website with Tailwind and CMS",       sellerId:0, sellerName:"Aakash Gupta",  sellerLevel:"Top Rated", category:"Programming & Tech",    price:7000,  rating:5.0, reviews:204, tags:["Next.js","Tailwind","Sanity"],        icon:"⚡", deliveryDays:10 },
        { id:4,  title:"I will build your React Native cross-platform mobile app",     sellerId:0, sellerName:"Vikram Nair",   sellerLevel:"Level 2",   category:"Programming & Tech",    price:12000, rating:4.8, reviews:47,  tags:["React Native","iOS","Android"],       icon:"📱", deliveryDays:21 },
        { id:5,  title:"I will create a Flutter mobile app for Android and iOS",       sellerId:0, sellerName:"Simran Kaur",   sellerLevel:"Level 2",   category:"Programming & Tech",    price:9500,  rating:4.8, reviews:61,  tags:["Flutter","Dart","Firebase"],          icon:"🦋", deliveryDays:14 },
        { id:6,  title:"I will setup a DevOps pipeline with Docker and Kubernetes",    sellerId:0, sellerName:"Nikhil Bose",   sellerLevel:"Top Rated", category:"Programming & Tech",    price:15000, rating:4.9, reviews:88,  tags:["Docker","Kubernetes","CI/CD"],        icon:"⚙️", deliveryDays:7  },
        { id:7,  title:"I will build an AI chatbot using GPT-4 API for your website",  sellerId:0, sellerName:"Tanvi Shah",    sellerLevel:"Level 2",   category:"Programming & Tech",    price:8000,  rating:4.7, reviews:39,  tags:["OpenAI","GPT-4","Chatbot"],           icon:"🤖", deliveryDays:5  },
        { id:8,  title:"I will design and develop a custom WordPress theme",           sellerId:0, sellerName:"Arjun Shetty",  sellerLevel:"Level 1",   category:"Programming & Tech",    price:2500,  rating:4.5, reviews:72,  tags:["WordPress","PHP","CSS"],              icon:"🌐", deliveryDays:7  },
        { id:9,  title:"I will build a Shopify store with custom design and apps",     sellerId:0, sellerName:"Meera Pillai",  sellerLevel:"Top Rated", category:"Programming & Tech",    price:6000,  rating:4.9, reviews:130, tags:["Shopify","eCommerce","Liquid"],       icon:"🛒", deliveryDays:7  },
        { id:10, title:"I will create a blockchain smart contract on Ethereum",        sellerId:0, sellerName:"Dev Malhotra",  sellerLevel:"Level 2",   category:"Programming & Tech",    price:18000, rating:4.8, reviews:29,  tags:["Solidity","Ethereum","Web3"],         icon:"⛓️", deliveryDays:10 },
        { id:11, title:"I will develop a Python automation script for your workflow",  sellerId:0, sellerName:"Shreya Rao",    sellerLevel:"Level 1",   category:"Programming & Tech",    price:1800,  rating:4.6, reviews:95,  tags:["Python","Automation","Selenium"],     icon:"🤖", deliveryDays:3  },
        { id:12, title:"I will build a real-time chat app with Socket.io and React",   sellerId:0, sellerName:"Kiran Kumar",   sellerLevel:"Level 2",   category:"Programming & Tech",    price:5500,  rating:4.7, reviews:44,  tags:["Socket.io","React","Node.js"],        icon:"💬", deliveryDays:7  },
        { id:13, title:"I will create a machine learning model for your dataset",      sellerId:0, sellerName:"Pooja Menon",   sellerLevel:"Top Rated", category:"Programming & Tech",    price:11000, rating:4.9, reviews:57,  tags:["Machine Learning","Python","TensorFlow"], icon:"🧠", deliveryDays:14 },
        { id:14, title:"I will build a microservices architecture with Node.js",       sellerId:0, sellerName:"Suresh Nair",   sellerLevel:"Level 2",   category:"Programming & Tech",    price:14000, rating:4.8, reviews:33,  tags:["Microservices","Node.js","Redis"],     icon:"🔧", deliveryDays:14 },
        { id:15, title:"I will migrate your website to AWS with full cloud setup",     sellerId:0, sellerName:"Aarav Jain",    sellerLevel:"Top Rated", category:"Programming & Tech",    price:10000, rating:5.0, reviews:78,  tags:["AWS","Cloud","DevOps"],               icon:"☁️", deliveryDays:10 },
        { id:16, title:"I will build a Laravel PHP web application with admin panel",  sellerId:0, sellerName:"Leela Iyer",    sellerLevel:"Level 1",   category:"Programming & Tech",    price:4000,  rating:4.6, reviews:41,  tags:["Laravel","PHP","MySQL"],              icon:"🖥️", deliveryDays:10 },

        
        { id:17, title:"I will design a modern logo with unlimited revisions",          sellerId:0, sellerName:"Rahul Verma",   sellerLevel:"Top Rated", category:"Graphics & Design",     price:1500,  rating:4.8, reviews:198, tags:["Logo","Branding","Illustrator"],      icon:"🎨", deliveryDays:3  },
        { id:18, title:"I will design stunning UI/UX for your web or mobile app",      sellerId:0, sellerName:"Arjun Reddy",   sellerLevel:"Top Rated", category:"Graphics & Design",     price:6500,  rating:4.9, reviews:176, tags:["Figma","UI/UX","Prototyping"],        icon:"🖌️", deliveryDays:7  },
        { id:19, title:"I will create a complete brand identity package",               sellerId:0, sellerName:"Kavya Nair",    sellerLevel:"Level 2",   category:"Graphics & Design",     price:5000,  rating:4.7, reviews:64,  tags:["Branding","Identity","Logo"],         icon:"✏️", deliveryDays:5  },
        { id:20, title:"I will design social media posts and stories for Instagram",   sellerId:0, sellerName:"Riya Kapoor",   sellerLevel:"Level 1",   category:"Graphics & Design",     price:1200,  rating:4.5, reviews:112, tags:["Social Media","Instagram","Canva"],   icon:"📸", deliveryDays:2  },
        { id:21, title:"I will illustrate a custom children's book character",          sellerId:0, sellerName:"Tara Krishnan", sellerLevel:"Level 2",   category:"Graphics & Design",     price:3500,  rating:4.8, reviews:47,  tags:["Illustration","Character","Art"],     icon:"🎭", deliveryDays:7  },
        { id:22, title:"I will design a professional pitch deck presentation",          sellerId:0, sellerName:"Mohit Sharma",  sellerLevel:"Top Rated", category:"Graphics & Design",     price:4000,  rating:4.9, reviews:93,  tags:["PowerPoint","Pitch Deck","Design"],   icon:"📊", deliveryDays:3  },
        { id:23, title:"I will create a stunning infographic for your data",            sellerId:0, sellerName:"Naina Mehta",   sellerLevel:"Level 1",   category:"Graphics & Design",     price:1800,  rating:4.6, reviews:58,  tags:["Infographic","Data Viz","Design"],    icon:"📉", deliveryDays:2  },
        { id:24, title:"I will design a restaurant menu and print materials",          sellerId:0, sellerName:"Farhan Ali",    sellerLevel:"Level 2",   category:"Graphics & Design",     price:2200,  rating:4.7, reviews:35,  tags:["Print","Menu","Brochure"],            icon:"🍽️", deliveryDays:3  },

        
        { id:25, title:"I will do SEO optimization to rank your website on Google",    sellerId:0, sellerName:"Anjali Singh",  sellerLevel:"Level 1",   category:"Digital Marketing",     price:3000,  rating:4.7, reviews:64,  tags:["SEO","Google","Backlinks"],           icon:"📈", deliveryDays:14 },
        { id:26, title:"I will setup your complete social media marketing funnel",     sellerId:0, sellerName:"Divya Iyer",    sellerLevel:"Level 1",   category:"Digital Marketing",     price:4500,  rating:4.6, reviews:38,  tags:["Facebook Ads","Instagram","Funnel"],  icon:"📣", deliveryDays:5  },
        { id:27, title:"I will run targeted Google Ads campaigns for your business",   sellerId:0, sellerName:"Varun Khanna",  sellerLevel:"Top Rated", category:"Digital Marketing",     price:5000,  rating:4.9, reviews:121, tags:["Google Ads","PPC","SEM"],             icon:"🎯", deliveryDays:3  },
        { id:28, title:"I will manage your entire email marketing with Mailchimp",     sellerId:0, sellerName:"Ritika Bahl",   sellerLevel:"Level 2",   category:"Digital Marketing",     price:2500,  rating:4.7, reviews:49,  tags:["Email Marketing","Mailchimp","Automation"], icon:"📧", deliveryDays:5 },
        { id:29, title:"I will create a YouTube channel SEO strategy and optimize",   sellerId:0, sellerName:"Sid Patil",     sellerLevel:"Level 1",   category:"Digital Marketing",     price:2000,  rating:4.5, reviews:31,  tags:["YouTube","SEO","Video Marketing"],    icon:"▶️", deliveryDays:7  },
        { id:30, title:"I will build and manage your influencer marketing campaign",   sellerId:0, sellerName:"Palak Dhawan",  sellerLevel:"Level 2",   category:"Digital Marketing",     price:8000,  rating:4.8, reviews:26,  tags:["Influencer","Instagram","Marketing"], icon:"🌟", deliveryDays:10 },
        { id:31, title:"I will write SEO-optimised content strategy for 3 months",    sellerId:0, sellerName:"Ishaan Gupta",  sellerLevel:"Top Rated", category:"Digital Marketing",     price:6000,  rating:4.9, reviews:74,  tags:["Content Strategy","SEO","Blog"],      icon:"📝", deliveryDays:5  },

        
        { id:32, title:"I will write compelling blog posts and articles for your brand", sellerId:0, sellerName:"Karan Mehta", sellerLevel:"Level 2",  category:"Writing & Translation", price:800,   rating:4.9, reviews:203, tags:["Copywriting","Blog","Content"],       icon:"✍️", deliveryDays:2  },
        { id:33, title:"I will translate your document from English to Hindi",          sellerId:0, sellerName:"Preet Kaur",   sellerLevel:"Level 1",   category:"Writing & Translation", price:500,   rating:4.6, reviews:87,  tags:["Translation","Hindi","English"],      icon:"🌐", deliveryDays:1  },
        { id:34, title:"I will write a professional resume and LinkedIn profile",       sellerId:0, sellerName:"Shweta Gupta", sellerLevel:"Level 2",   category:"Writing & Translation", price:1200,  rating:4.8, reviews:156, tags:["Resume","LinkedIn","Career"],         icon:"📄", deliveryDays:2  },
        { id:35, title:"I will ghostwrite a chapter or short story for you",           sellerId:0, sellerName:"Vikram Rao",    sellerLevel:"Top Rated", category:"Writing & Translation", price:2500,  rating:4.9, reviews:68,  tags:["Ghostwriting","Fiction","Story"],     icon:"📖", deliveryDays:7  },
        { id:36, title:"I will proofread and edit your manuscript or document",        sellerId:0, sellerName:"Meena Joshi",   sellerLevel:"Level 1",   category:"Writing & Translation", price:700,   rating:4.7, reviews:44,  tags:["Proofreading","Editing","Grammar"],   icon:"🔍", deliveryDays:2  },
        { id:37, title:"I will write product descriptions for your e-commerce store",  sellerId:0, sellerName:"Neeta Bhatt",   sellerLevel:"Level 2",   category:"Writing & Translation", price:600,   rating:4.6, reviews:92,  tags:["Copywriting","eCommerce","SEO"],      icon:"🏷️", deliveryDays:2  },

        
        { id:38, title:"I will create a professional explainer video with animation",  sellerId:0, sellerName:"Neha Patel",    sellerLevel:"Top Rated", category:"Video & Animation",     price:8000,  rating:5.0, reviews:89,  tags:["Animation","Motion","Explainer"],     icon:"🎬", deliveryDays:10 },
        { id:39, title:"I will edit your YouTube video with transitions and effects",  sellerId:0, sellerName:"Rahul Jain",    sellerLevel:"Level 1",   category:"Video & Animation",     price:1500,  rating:4.7, reviews:117, tags:["Video Editing","YouTube","Premiere"], icon:"✂️", deliveryDays:3  },
        { id:40, title:"I will create a 2D animated logo intro for your brand",        sellerId:0, sellerName:"Isha Tripathi",  sellerLevel:"Level 2",   category:"Video & Animation",     price:2000,  rating:4.8, reviews:61,  tags:["Logo Animation","After Effects","2D"], icon:"🎞️", deliveryDays:3  },
        { id:41, title:"I will produce a short-form reel or TikTok video for you",    sellerId:0, sellerName:"Disha Thakur",   sellerLevel:"Level 1",   category:"Video & Animation",     price:1000,  rating:4.5, reviews:43,  tags:["Reels","TikTok","Short Video"],       icon:"📹", deliveryDays:2  },
        { id:42, title:"I will create a 3D product animation and render video",        sellerId:0, sellerName:"Sanjay Iyer",   sellerLevel:"Top Rated", category:"Video & Animation",     price:12000, rating:4.9, reviews:52,  tags:["3D Animation","Cinema 4D","Render"],  icon:"🎥", deliveryDays:14 },
        { id:43, title:"I will add professional subtitles and captions to your video", sellerId:0, sellerName:"Kamna Rao",     sellerLevel:"Level 1",   category:"Video & Animation",     price:800,   rating:4.6, reviews:78,  tags:["Subtitles","Captions","Video"],       icon:"💬", deliveryDays:1  },

        
        { id:44, title:"I will compose an original background music track for you",   sellerId:0, sellerName:"Raj Khanna",    sellerLevel:"Level 2",   category:"Music & Audio",         price:3000,  rating:4.8, reviews:55,  tags:["Music","Composition","Background"],   icon:"🎵", deliveryDays:5  },
        { id:45, title:"I will do professional voice-over for your video or ad",       sellerId:0, sellerName:"Anusha Pillai", sellerLevel:"Top Rated", category:"Music & Audio",         price:1500,  rating:4.9, reviews:134, tags:["Voice Over","Narration","Audio"],     icon:"🎙️", deliveryDays:1  },
        { id:46, title:"I will mix and master your music track professionally",        sellerId:0, sellerName:"Ninad Shah",    sellerLevel:"Level 2",   category:"Music & Audio",         price:2500,  rating:4.7, reviews:37,  tags:["Mixing","Mastering","Music"],         icon:"🎚️", deliveryDays:3  },
        { id:47, title:"I will produce a jingle for your brand or advertisement",      sellerId:0, sellerName:"Prachi Suri",   sellerLevel:"Level 1",   category:"Music & Audio",         price:4000,  rating:4.6, reviews:22,  tags:["Jingle","Branding","Audio"],          icon:"🎶", deliveryDays:7  },

        
        { id:48, title:"I will create a detailed business plan for your startup",      sellerId:0, sellerName:"Alok Verma",    sellerLevel:"Top Rated", category:"Business",              price:7000,  rating:4.9, reviews:83,  tags:["Business Plan","Startup","Strategy"], icon:"📊", deliveryDays:7  },
        { id:49, title:"I will do market research and competitor analysis report",     sellerId:0, sellerName:"Shruti Bose",   sellerLevel:"Level 2",   category:"Business",              price:3500,  rating:4.7, reviews:46,  tags:["Market Research","Analysis","Report"], icon:"🔎", deliveryDays:5  },
        { id:50, title:"I will provide virtual assistant services for 20 hours",       sellerId:0, sellerName:"Pooja Das",     sellerLevel:"Level 1",   category:"Business",              price:2000,  rating:4.5, reviews:91,  tags:["Virtual Assistant","Admin","Support"], icon:"🗂️", deliveryDays:7  },
        { id:51, title:"I will build an Excel dashboard with charts and automation",   sellerId:0, sellerName:"Ramesh Nair",   sellerLevel:"Level 2",   category:"Business",              price:2200,  rating:4.7, reviews:63,  tags:["Excel","Dashboard","VBA"],            icon:"📉", deliveryDays:3  },
        { id:52, title:"I will write a grant proposal for your NGO or startup",        sellerId:0, sellerName:"Fatima Khan",   sellerLevel:"Top Rated", category:"Business",              price:5000,  rating:4.8, reviews:29,  tags:["Grant Writing","NGO","Proposal"],     icon:"📝", deliveryDays:7  },

        
        { id:53, title:"I will fine-tune a GPT model on your custom dataset",          sellerId:0, sellerName:"Zara Ahmed",    sellerLevel:"Top Rated", category:"AI Services",           price:20000, rating:4.9, reviews:31,  tags:["GPT","Fine-tuning","LLM"],            icon:"🤖", deliveryDays:14 },
        { id:54, title:"I will integrate Claude AI into your website or app",          sellerId:0, sellerName:"Kabir Mehta",   sellerLevel:"Level 2",   category:"AI Services",           price:8000,  rating:4.8, reviews:24,  tags:["Claude","AI Integration","API"],      icon:"🧠", deliveryDays:7  },
        { id:55, title:"I will build an AI image generation pipeline with DALL-E",     sellerId:0, sellerName:"Ritu Saxena",   sellerLevel:"Level 1",   category:"AI Services",           price:5000,  rating:4.6, reviews:18,  tags:["DALL-E","Image AI","Stable Diffusion"], icon:"🎨", deliveryDays:5 },
        { id:56, title:"I will create an AI-powered recommendation system",            sellerId:0, sellerName:"Amit Chowdhury", sellerLevel:"Level 2",  category:"AI Services",           price:14000, rating:4.7, reviews:22,  tags:["Recommendation","ML","Python"],       icon:"⭐", deliveryDays:14 },
        { id:57, title:"I will build a RAG-based knowledge bot using LangChain",       sellerId:0, sellerName:"Neel Patel",    sellerLevel:"Top Rated", category:"AI Services",           price:16000, rating:5.0, reviews:15,  tags:["LangChain","RAG","Chatbot"],          icon:"🔗", deliveryDays:10 },
        { id:58, title:"I will automate your business workflows with AI agents",       sellerId:0, sellerName:"Priya Shinde",  sellerLevel:"Level 2",   category:"AI Services",           price:10000, rating:4.8, reviews:19,  tags:["AI Agents","Automation","n8n"],       icon:"⚡", deliveryDays:7  },
        { id:59, title:"I will do prompt engineering and optimize your AI outputs",    sellerId:0, sellerName:"Tarun Batra",   sellerLevel:"Level 1",   category:"AI Services",           price:3000,  rating:4.5, reviews:27,  tags:["Prompt Engineering","GPT","Claude"],  icon:"💡", deliveryDays:3  },
        { id:60, title:"I will build a voice AI assistant using Whisper and TTS",      sellerId:0, sellerName:"Sanya Gill",    sellerLevel:"Level 2",   category:"AI Services",           price:12000, rating:4.8, reviews:13,  tags:["Voice AI","Whisper","TTS"],           icon:"🎤", deliveryDays:10 },
    ],
    jobs: [
        
        { id:1,  title:"Full Stack Web Developer — E-Commerce Platform",           company:"TechStart Solutions",   description:"Build a full-featured e-commerce platform with React, Node.js and MongoDB. Requires REST API design, payment gateway integration (Razorpay), and admin dashboard.",           budget:"₹50,000 – ₹80,000",  skills:["React","Node.js","MongoDB","Express"],        postedDate:"2 days ago",   employerId:0, proposals:[], category:"Web Development", duration:"1-3 months"  },
        { id:2,  title:"Next.js Developer for SaaS Dashboard",                    company:"CloudByte Labs",         description:"We need a skilled Next.js developer to build an analytics dashboard for our SaaS product. Must have experience with Tailwind CSS, Recharts, and server-side rendering.",    budget:"₹40,000 – ₹65,000",  skills:["Next.js","Tailwind","TypeScript","Charts"],  postedDate:"3 days ago",   employerId:0, proposals:[], category:"Web Development", duration:"4-6 weeks"   },
        { id:3,  title:"Python Data Analysis & Interactive Dashboard",             company:"DataInsights Inc",       description:"Analyze 2 years of sales data and create an interactive Streamlit dashboard with KPIs, filters, trend charts, and downloadable Excel reports.",                           budget:"₹25,000 – ₹35,000",  skills:["Python","Pandas","Streamlit","SQL"],          postedDate:"3 days ago",   employerId:0, proposals:[], category:"Web Development", duration:"1-2 weeks"   },
        { id:4,  title:"WordPress Website for Boutique Hotel Chain",               company:"Heritage Stays Pvt Ltd", description:"Build a premium WordPress website with a booking engine, room gallery, SEO optimisation, multilingual support and a blog. Must match our brand guidelines.",               budget:"₹20,000 – ₹35,000",  skills:["WordPress","WooCommerce","CSS","SEO"],        postedDate:"5 days ago",   employerId:0, proposals:[], category:"Web Development", duration:"2-4 weeks"   },
        { id:5,  title:"Shopify Developer for Apparel Brand",                     company:"ThreadCo Fashion",       description:"Set up and customise a Shopify store for our new D2C apparel brand. Need custom theme, size-guide configurator, wishlist, and Instagram feed integration.",                  budget:"₹30,000 – ₹45,000",  skills:["Shopify","Liquid","CSS","Shopify Apps"],      postedDate:"1 week ago",   employerId:0, proposals:[], category:"Web Development", duration:"3-4 weeks"   },
        { id:6,  title:"Laravel Backend Developer for EdTech Platform",           company:"SkillUp India",          description:"Develop a robust Laravel backend for our online learning platform. Features: course management, quiz engine, certificate generation, Stripe subscriptions, and analytics.",  budget:"₹60,000 – ₹90,000",  skills:["Laravel","PHP","MySQL","Redis"],              postedDate:"4 days ago",   employerId:0, proposals:[], category:"Web Development", duration:"2-3 months"  },
        { id:7,  title:"Vue.js Developer for Real Estate Portal",                 company:"PropTech Ventures",      description:"Build a feature-rich real estate listings portal using Vue 3, Pinia, and Google Maps API. Requires advanced property search, mortgage calculator, and agent profiles.",       budget:"₹45,000 – ₹70,000",  skills:["Vue.js","Pinia","Google Maps","REST API"],    postedDate:"6 days ago",   employerId:0, proposals:[], category:"Web Development", duration:"6-8 weeks"   },
        { id:8,  title:"DevOps Engineer for Cloud Infrastructure Setup",          company:"ScaleOps Technologies",  description:"Set up AWS infrastructure with ECS, RDS, Elasticache, and CloudFront. Configure CI/CD pipelines using GitHub Actions, Terraform scripts, and monitoring with Datadog.",     budget:"₹70,000 – ₹1,00,000", skills:["AWS","Terraform","Docker","CI/CD"],           postedDate:"2 days ago",   employerId:0, proposals:[], category:"Web Development", duration:"4-6 weeks"   },
        { id:9,  title:"React Developer for FinTech App — Mutual Funds",          company:"WealthWise App",         description:"Build 12 React screens for a mutual fund investment app. Pixel-perfect from Figma designs, integrate with our existing Node.js API, write unit tests.",                      budget:"₹35,000 – ₹55,000",  skills:["React","TypeScript","Jest","Figma"],          postedDate:"1 day ago",    employerId:0, proposals:[], category:"Web Development", duration:"3-4 weeks"   },
        { id:10, title:"Blockchain Developer for NFT Marketplace",                company:"Metaverse Studio",       description:"Build an NFT marketplace on Polygon with wallet connect, listing, bidding, royalties, and IPFS storage. Smart contracts in Solidity, frontend in React.",                 budget:"₹80,000 – ₹1,20,000", skills:["Solidity","Polygon","React","IPFS"],          postedDate:"5 days ago",   employerId:0, proposals:[], category:"Web Development", duration:"3-4 months"  },

        
        { id:11, title:"React Native Developer — Grocery Delivery App",           company:"QuickCart India",        description:"Develop a React Native grocery delivery app for Android and iOS. Features include location tracking, order management, in-app payments (Razorpay), and push notifications.", budget:"₹70,000 – ₹1,10,000", skills:["React Native","Redux","Razorpay","Firebase"],  postedDate:"3 days ago",   employerId:0, proposals:[], category:"Mobile App",      duration:"2-3 months"  },
        { id:12, title:"Flutter Developer for Healthcare App",                    company:"HealthFirst Technologies", description:"Build a telemedicine Flutter app with doctor search, video consultations (Agora), appointment booking, prescription management, and health records.",                   budget:"₹80,000 – ₹1,20,000", skills:["Flutter","Dart","Agora","Firebase"],          postedDate:"2 days ago",   employerId:0, proposals:[], category:"Mobile App",      duration:"3-4 months"  },
        { id:13, title:"iOS Developer — Fitness & Workout Tracker",               company:"FitNation App",          description:"Build a native iOS fitness tracking app with HealthKit integration, workout logging, progress charts, social sharing, and Apple Watch support. Swift 5 + SwiftUI.",         budget:"₹60,000 – ₹90,000",  skills:["Swift","SwiftUI","HealthKit","Core Data"],    postedDate:"4 days ago",   employerId:0, proposals:[], category:"Mobile App",      duration:"2-3 months"  },
        { id:14, title:"Android Developer for EdTech Learning App",               company:"BrainBoost EdTech",      description:"Build an Android app for our learning platform — video courses, quizzes, progress tracking, offline mode, and gamification badges. Kotlin + Jetpack Compose.",               budget:"₹50,000 – ₹80,000",  skills:["Kotlin","Jetpack Compose","Room","Retrofit"], postedDate:"1 week ago",   employerId:0, proposals:[], category:"Mobile App",      duration:"2-3 months"  },
        { id:15, title:"Mobile App Developer — Ride-Sharing MVP",                 company:"ZipRide Technologies",   description:"Build an Uber-style ride sharing MVP for both iOS and Android using Flutter. Must include live driver tracking with Google Maps, fare estimation, and in-app payments.",      budget:"₹1,00,000 – ₹1,50,000",skills:["Flutter","Google Maps","Firebase","Razorpay"], postedDate:"6 days ago",   employerId:0, proposals:[], category:"Mobile App",      duration:"3-5 months"  },

        
        { id:16, title:"Mobile App UI/UX Designer — Fitness Tracking App",        company:"DigitalCraft",           description:"Design a complete mobile app UI for a fitness tracking application. Deliverables: Figma file, design system, 25+ screens including onboarding, dashboard, and social features.", budget:"₹30,000 – ₹45,000",  skills:["Figma","UI/UX","Mobile Design","Prototyping"],postedDate:"1 day ago",    employerId:0, proposals:[], category:"Design",          duration:"2-4 weeks"   },
        { id:17, title:"Brand Identity Designer for D2C Food Brand",               company:"Spice Route Foods",      description:"Create a complete brand identity including logo, colour palette, typography, packaging mockups, and brand guidelines for a premium Indian spice brand targeting urban India.", budget:"₹25,000 – ₹40,000",  skills:["Adobe Illustrator","Branding","Packaging"],   postedDate:"3 days ago",   employerId:0, proposals:[], category:"Design",          duration:"3-4 weeks"   },
        { id:18, title:"Web Designer for Corporate Consulting Firm",               company:"Nexus Advisory",         description:"Redesign our corporate website to look modern and trustworthy. Need mockups in Figma, then handoff to developer. Approx 8 pages plus a case study template.",                 budget:"₹18,000 – ₹28,000",  skills:["Figma","Web Design","UI/UX","Adobe XD"],      postedDate:"5 days ago",   employerId:0, proposals:[], category:"Design",          duration:"2-3 weeks"   },
        { id:19, title:"Motion Graphics Designer for Product Demo Video",          company:"SaaSify Technologies",   description:"Create a 90-second animated product demo video for our SaaS tool. Motion graphics style, script provided, requires After Effects skills and a clean corporate aesthetic.",     budget:"₹20,000 – ₹35,000",  skills:["After Effects","Motion Graphics","Premiere"],  postedDate:"2 days ago",   employerId:0, proposals:[], category:"Design",          duration:"1-2 weeks"   },
        { id:20, title:"3D Visualizer for Interior Design Studio",                 company:"Design Arena Studios",   description:"Create photorealistic 3D renders of residential interior spaces for our client presentations. We will provide AutoCAD floor plans and mood boards.",                            budget:"₹35,000 – ₹60,000",  skills:["3ds Max","V-Ray","AutoCAD","3D Rendering"],   postedDate:"4 days ago",   employerId:0, proposals:[], category:"Design",          duration:"4-6 weeks"   },

        
        { id:21, title:"Content Writer — Tech Blog (Long-Term Contract)",          company:"ByteBlogs Media",        description:"Looking for a skilled tech writer to produce 4 articles/month. Topics: AI, cloud computing, cybersecurity. Must be original, SEO-optimised, 1500-2000 words each.",         budget:"₹5,000/month",        skills:["Technical Writing","SEO","Research"],         postedDate:"1 week ago",   employerId:0, proposals:[], category:"Writing",          duration:"3+ months"   },
        { id:22, title:"Copywriter for Product Landing Pages",                     company:"Growth Hack Labs",       description:"Write high-converting landing page copy for 3 SaaS products. Each page needs hero copy, benefits section, social proof, FAQ and CTA. Conversion-focused, A/B test ready.",   budget:"₹15,000 – ₹25,000",  skills:["Copywriting","Landing Page","SaaS"],          postedDate:"3 days ago",   employerId:0, proposals:[], category:"Writing",          duration:"1-2 weeks"   },
        { id:23, title:"Script Writer for YouTube Finance Channel",                company:"MoneyMind Channel",      description:"Write engaging video scripts for a personal finance YouTube channel targeting Indian millennials. Topics: mutual funds, budgeting, credit cards. 8-10 minute scripts.",         budget:"₹3,000 per script",   skills:["Scriptwriting","Finance","YouTube"],          postedDate:"2 days ago",   employerId:0, proposals:[], category:"Writing",          duration:"Ongoing"     },
        { id:24, title:"Technical Documentation Writer for API Product",           company:"DevTools Inc",           description:"Write comprehensive developer documentation for our REST API including getting started guide, endpoint references, code examples in Python/JS, and error handling guide.",    budget:"₹20,000 – ₹30,000",  skills:["Technical Writing","API Docs","Markdown"],    postedDate:"6 days ago",   employerId:0, proposals:[], category:"Writing",          duration:"3-4 weeks"   },
        { id:25, title:"UX Writer for Mobile Banking App",                         company:"NeoBank India",          description:"Create clear, friendly microcopy for all screens of our mobile banking app — onboarding, transactions, error states, notifications and empty states. Work in Figma.",           budget:"₹18,000 – ₹28,000",  skills:["UX Writing","Microcopy","Figma","Banking"],   postedDate:"4 days ago",   employerId:0, proposals:[], category:"Writing",          duration:"2-3 weeks"   },

        
        { id:26, title:"Digital Marketing Manager for D2C Skincare Brand",         company:"Glow Republic",          description:"Run end-to-end digital marketing for our skincare brand — Facebook/Instagram ads, Google Shopping, influencer outreach, email sequences, and monthly performance reports.",  budget:"₹25,000/month",       skills:["Facebook Ads","Google Ads","Email Marketing"],postedDate:"5 days ago",   employerId:0, proposals:[], category:"Marketing",       duration:"3+ months"   },
        { id:27, title:"SEO Specialist for E-Commerce Website (500+ pages)",        company:"BigShop Online",         description:"Conduct a full technical SEO audit, fix on-page issues across 500+ product pages, build high-DA backlinks, and grow organic traffic by 40% in 6 months.",                   budget:"₹20,000/month",       skills:["SEO","Technical SEO","Ahrefs","Screaming Frog"],postedDate:"1 week ago", employerId:0, proposals:[], category:"Marketing",       duration:"6+ months"   },
        { id:28, title:"Performance Marketer — Growth for Mobile App",              company:"QuickHire App",          description:"Own user acquisition for our job-search app. Run and optimise Meta and Google UAC campaigns, A/B test creatives, report on CPI, ROAS and retention metrics weekly.",           budget:"₹30,000/month",       skills:["App Marketing","Meta Ads","Google UAC","Analytics"],postedDate:"2 days ago",employerId:0, proposals:[], category:"Marketing",       duration:"3+ months"   },
        { id:29, title:"Email Marketing Specialist — SaaS Onboarding Flows",       company:"SaaSify Technologies",   description:"Design and implement a full email onboarding sequence for new SaaS users — welcome, feature discovery, activation nudges, re-engagement. Use Intercom / Customer.io.",          budget:"₹15,000 – ₹22,000",  skills:["Email Marketing","Intercom","Copywriting"],   postedDate:"3 days ago",   employerId:0, proposals:[], category:"Marketing",       duration:"3-4 weeks"   },
        { id:30, title:"PR & Communications Manager for Startup",                  company:"FutureTech Ventures",    description:"Handle PR outreach, press releases, media relationships and thought leadership articles for our AI startup. Comfortable working with journalists and podcast hosts.",              budget:"₹20,000/month",       skills:["PR","Media Relations","Communications"],      postedDate:"1 week ago",   employerId:0, proposals:[], category:"Marketing",       duration:"Ongoing"     },

        
        { id:31, title:"Data Scientist — Customer Churn Prediction Model",         company:"RetainX Analytics",      description:"Build an ML model to predict customer churn for a subscription business. Deliverables: EDA notebook, trained model (scikit-learn), REST API wrapper, and performance report.", budget:"₹45,000 – ₹70,000",  skills:["Python","scikit-learn","Pandas","FastAPI"],   postedDate:"3 days ago",   employerId:0, proposals:[], category:"Data Science",    duration:"4-6 weeks"   },
        { id:32, title:"NLP Engineer — Sentiment Analysis for Product Reviews",    company:"ReviewBot AI",           description:"Develop a fine-tuned BERT model for Hindi + English sentiment analysis of product reviews. Deploy as API on AWS Lambda, with a simple dashboard to visualise results.",         budget:"₹50,000 – ₹80,000",  skills:["NLP","BERT","Transformers","AWS Lambda"],     postedDate:"5 days ago",   employerId:0, proposals:[], category:"Data Science",    duration:"6-8 weeks"   },
        { id:33, title:"Business Intelligence Developer — Power BI Dashboards",    company:"ManufacturePro Ltd",     description:"Build 6 Power BI dashboards for our manufacturing company — production KPIs, inventory, quality metrics, and sales performance. Data lives in Azure SQL and SharePoint.",      budget:"₹30,000 – ₹50,000",  skills:["Power BI","DAX","Azure SQL","ETL"],           postedDate:"4 days ago",   employerId:0, proposals:[], category:"Data Science",    duration:"3-4 weeks"   },
        { id:34, title:"Data Engineer — ETL Pipeline for Analytics Warehouse",     company:"InsightFlow Technologies",description:"Design and build a cloud data pipeline using Apache Airflow, dbt, and BigQuery. Ingest data from Salesforce, HubSpot and Postgres. Schedule, test, and document everything.", budget:"₹65,000 – ₹90,000",  skills:["Airflow","dbt","BigQuery","Python"],          postedDate:"2 days ago",   employerId:0, proposals:[], category:"Data Science",    duration:"2-3 months"  },

        
        { id:35, title:"Video Editor for Corporate Documentary Film",              company:"Pixel Narratives",       description:"Edit a 15-minute corporate documentary from raw footage. Tasks include colour grading, sound design, lower thirds, B-roll integration, and subtitle creation. Adobe Premiere.", budget:"₹25,000 – ₹40,000",  skills:["Premiere Pro","Colour Grading","Sound Design"],postedDate:"4 days ago",  employerId:0, proposals:[], category:"Video",           duration:"2-3 weeks"   },
        { id:36, title:"YouTube Video Editor (Long-Term — Tech Channel)",           company:"TechTalks India",        description:"We post 3 tech review videos per week and need a consistent editor. Includes cuts, B-roll, animations, outro cards, thumbnails, and colour correction. Work remotely.",       budget:"₹12,000/month",       skills:["Premiere Pro","After Effects","Photoshop"],   postedDate:"1 week ago",   employerId:0, proposals:[], category:"Video",           duration:"Ongoing"     },
        { id:37, title:"Motion Designer for SaaS Marketing Videos",                company:"SaaSify Technologies",   description:"Create 5 short marketing videos (30-60 sec) showcasing product features. Style: clean, modern motion graphics with brand colours. Provide After Effects source files.",          budget:"₹30,000 – ₹50,000",  skills:["After Effects","Motion Graphics","Lottie"],   postedDate:"3 days ago",   employerId:0, proposals:[], category:"Video",           duration:"3-4 weeks"   },

        
        { id:38, title:"AI Engineer — RAG Chatbot for Internal Knowledge Base",    company:"ConsultPro Services",    description:"Build a private RAG-based chatbot using LangChain and GPT-4 that answers questions from our internal PDF documents. Deploy on Azure with authentication.",                     budget:"₹60,000 – ₹90,000",  skills:["LangChain","GPT-4","Python","Azure"],         postedDate:"1 day ago",    employerId:0, proposals:[], category:"Web Development", duration:"4-6 weeks"   },
        { id:39, title:"Prompt Engineer for Marketing AI Tool",                    company:"ContentAI Labs",         description:"Design and optimise prompts for an AI marketing copy generation tool. Test across GPT-4, Claude, and Gemini models. Document best practices and build an evaluation framework.", budget:"₹20,000 – ₹35,000",  skills:["Prompt Engineering","GPT-4","Claude","Gemini"],postedDate:"2 days ago",  employerId:0, proposals:[], category:"Web Development", duration:"2-3 weeks"   },
        { id:40, title:"Computer Vision Engineer — Defect Detection System",       company:"SmartFactory Solutions", description:"Build a computer vision model (YOLOv8) to detect manufacturing defects from camera feed in real time. Integrate with PLC systems via MQTT and build a monitoring dashboard.",  budget:"₹80,000 – ₹1,20,000", skills:["Python","YOLOv8","OpenCV","MQTT"],            postedDate:"5 days ago",   employerId:0, proposals:[], category:"Data Science",    duration:"2-3 months"  },
    ],
    messages: {},
    orders: [],
    transactions: []
};

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('fh_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        currentUserType = currentUser.type;
        updateNavForUser();
    }
    renderFeaturedGigs();
    showPage('home');
});

function showPage(page) {
    document.querySelectorAll('[id^="page-"]').forEach(el => el.classList.add('hidden'));
    const el = document.getElementById('page-' + page);
    if (el) { el.classList.remove('hidden'); currentPage = page; }

    if (page === 'gigs') renderGigs();
    if (page === 'jobs') renderJobsPage();
    if (page === 'dashboard') { renderSidebar(); renderDashHome(); }
}

function updateNavForUser() {
    const navRight = document.getElementById('navRight');
    if (currentUser) {
        navRight.innerHTML = `
            <span class="connects-badge" onclick="dashSection('earnings')" title="Your Connects balance">
                ⚡ ${currentUser.connects||10} Connects
            </span>
            <span class="nav-badge" onclick="showPage('dashboard')" title="Dashboard">📊</span>
            <span class="nav-badge" onclick="toggleNotifCentre()" title="Notifications" id="notifBell">
                🔔<span class="badge-dot" id="notifDot"></span>
            </span>
            <span class="nav-badge" onclick="dashSection('messages')" title="Messages">💬</span>
            <button class="avatar-btn" onclick="dashSection('profile')" title="Profile">${currentUser.name.charAt(0).toUpperCase()}</button>
            <button class="btn btn-secondary btn-sm" onclick="logout()">Logout</button>
        `;
    } else {
        navRight.innerHTML = `
            <span class="nav-link" onclick="showAuth('freelancer','login')">Sign In</span>
            <button class="btn btn-primary btn-sm" onclick="showPage('welcome')">Get Started</button>
        `;
    }
}

function heroSearchGo() {
    const q = document.getElementById('heroSearch').value;
    if (q) { document.getElementById('gigSearch') && (document.getElementById('gigSearch').value = q); }
    showPage('gigs');
    setTimeout(() => renderGigs(), 50);
}

function searchTag(tag) {
    showPage('gigs');
    setTimeout(() => {
        document.getElementById('gigSearch').value = tag;
        renderGigs();
    }, 50);
}

function browseGigs() { showPage('gigs'); }
function browseJobs() { showPage('jobs'); }

function showAuth(userType, mode) {
    currentUserType = userType;
    authMode = mode;
    updateAuthUI();
    showPage('auth');
}

function updateAuthUI() {
    const isReg = authMode === 'register';
    document.getElementById('authTitle').textContent = isReg
        ? (currentUserType === 'freelancer' ? 'Join as Freelancer' : 'Join as Client')
        : 'Welcome Back';
    document.getElementById('authSubtitle').textContent = isReg
        ? 'Create your free account today'
        : 'Sign in to your account';
    document.getElementById('authSubmitBtn').textContent = isReg ? 'Create Account' : 'Sign In';
    document.getElementById('authToggleText').textContent = isReg ? 'Already have an account? ' : "Don't have an account? ";
    document.getElementById('authToggleLink').textContent = isReg ? 'Sign In' : 'Create Account';
    document.getElementById('nameField').classList.toggle('hidden', !isReg);
    document.getElementById('skillsRegField').classList.toggle('hidden', !(isReg && currentUserType === 'freelancer'));
    document.getElementById('companyRegField').classList.toggle('hidden', !(isReg && currentUserType === 'employer'));
}

function toggleAuthMode() {
    authMode = authMode === 'register' ? 'login' : 'register';
    updateAuthUI();
}

function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value.trim();
    const pass = document.getElementById('authPassword').value;

    if (authMode === 'register') {
        const name = document.getElementById('authName').value.trim();
        if (!name) { showNotif('Please enter your name', 'error'); return; }
        const user = {
            id: Date.now(),
            name, email, password: pass,
            type: currentUserType,
            skills: currentUserType === 'freelancer' ? [...gigSkillTags] : [],
            company: currentUserType === 'employer' ? document.getElementById('authCompany').value : '',
            bio: '',
            rating: 0,
            balance: 0,
            cvFile: '',
            cvFileName: '',
            portfolio: [],
            experience: [],
            education: [],
            hourlyRate: '',
            gigs: [],
            orders: [],
            savedGigs: [],
            shortlisted: [],
            level: 'New',
            completedJobs: 0,
            totalEarned: 0,
            
            connects: 10,
            jss: 0,
            availability: 'available',
            membershipPlan: 'basic',
            boostedProfile: false,
            verifiedPayment: false,
            totalSpent: 0,
            totalHires: 0,
            referralCode: 'FH' + Math.random().toString(36).substr(2,6).toUpperCase(),
            notifications: [
                { id:1, text:'Welcome to FreelanceHub! Complete your profile to get started.', time:'Just now', read:false, icon:'🎉' },
                { id:2, text:'You have 10 free Connects to start applying to jobs.', time:'Just now', read:false, icon:'⚡' }
            ],
            contracts: [],
            meetings: [],
            disputes: []
        };
        DB.users.push(user);
        currentUser = user;
        gigSkillTags = [];
        localStorage.setItem('fh_user', JSON.stringify(user));
        showNotif('Account created! Welcome to FreelanceHub 🎉', 'success');
        updateNavForUser();
        showPage('dashboard');
        setTimeout(() => { renderSidebar(); renderDashHome(); }, 50);
    } else {
        const user = DB.users.find(u => u.email === email && u.password === pass);
        if (user) {
            currentUser = user;
            currentUserType = user.type;
            localStorage.setItem('fh_user', JSON.stringify(user));
            showNotif('Welcome back, ' + user.name + '! 👋', 'success');
            updateNavForUser();
            showPage('dashboard');
            setTimeout(() => { renderSidebar(); renderDashHome(); }, 50);
        } else {
            showNotif('Invalid email or password', 'error');
        }
    }
}

function logout() {
    currentUser = null; currentUserType = null;
    localStorage.removeItem('fh_user');
    updateNavForUser();
    showPage('home');
    showNotif('You have been signed out', 'info');
}

function addSkillFromInput(e, containerId, inputId) {
    if (e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();
    const input = document.getElementById(inputId);
    const val = input.value.trim().replace(/,$/, '');
    if (!val) return;
    if (!gigSkillTags.includes(val)) {
        gigSkillTags.push(val);
        renderSkillTags(containerId, inputId, gigSkillTags);
    }
    input.value = '';
}

function addProfileSkillFromInput(e) {
    if (e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();
    const input = document.getElementById('profileSkillInput');
    const val = input.value.trim().replace(/,$/, '');
    if (!val) return;
    if (!profileSkillTags.includes(val)) {
        profileSkillTags.push(val);
        renderProfileSkillTags();
    }
    input.value = '';
}

function renderSkillTags(containerId, inputId, tags) {
    const container = document.getElementById(containerId);
    const input = document.getElementById(inputId);
    container.querySelectorAll('.tag').forEach(t => t.remove());
    tags.forEach((tag, i) => {
        const el = document.createElement('span');
        el.className = 'tag tag-accent';
        el.innerHTML = `${tag} <span class="tag-close" onclick="removeRegSkill(${i})">✕</span>`;
        container.insertBefore(el, input);
    });
}

function removeRegSkill(i) {
    gigSkillTags.splice(i, 1);
    renderSkillTags('regSkillsContainer', 'regSkillInput', gigSkillTags);
}

function renderProfileSkillTags() {
    const container = document.getElementById('profileSkillsContainer');
    if (!container) return;
    const input = document.getElementById('profileSkillInput');
    container.querySelectorAll('.tag').forEach(t => t.remove());
    profileSkillTags.forEach((tag, i) => {
        const el = document.createElement('span');
        el.className = 'tag tag-accent';
        el.innerHTML = `${tag} <span class="tag-close" onclick="removeProfileSkill(${i})">✕</span>`;
        container.insertBefore(el, input);
    });
}

function removeProfileSkill(i) {
    profileSkillTags.splice(i, 1);
    renderProfileSkillTags();
}

function renderFeaturedGigs() {
    const container = document.getElementById('featuredGigs');
    if (!container) return;
    container.innerHTML = DB.gigs.slice(0, 4).map(g => gigCardHTML(g)).join('');
}

function getFilteredGigs() {
    const search = (document.getElementById('gigSearch')?.value || '').toLowerCase();
    const cat = document.getElementById('gigCategory')?.value || '';
    const sort = document.getElementById('gigSort')?.value || 'relevance';
    const priceMin = parseInt(document.getElementById('gigPriceMin')?.value) || 0;
    const priceMax = parseInt(document.getElementById('gigPriceMax')?.value) || Infinity;
    const delivery = document.getElementById('gigDelivery')?.value || '';
    const level = document.getElementById('gigLevel')?.value || '';

    let gigs = [...DB.gigs];
    if (search) gigs = gigs.filter(g => g.title.toLowerCase().includes(search) || g.tags.some(t => t.toLowerCase().includes(search)) || g.category.toLowerCase().includes(search) || g.sellerName.toLowerCase().includes(search));
    if (cat) gigs = gigs.filter(g => g.category === cat);
    if (priceMin > 0) gigs = gigs.filter(g => g.price >= priceMin);
    if (priceMax < Infinity) gigs = gigs.filter(g => g.price <= priceMax);
    if (delivery === '1') gigs = gigs.filter(g => g.deliveryDays <= 1);
    if (delivery === '3') gigs = gigs.filter(g => g.deliveryDays <= 3);
    if (delivery === '7') gigs = gigs.filter(g => g.deliveryDays <= 7);
    if (level) gigs = gigs.filter(g => g.sellerLevel === level);
    if (sort === 'rating') gigs.sort((a,b) => b.rating - a.rating);
    else if (sort === 'price_low') gigs.sort((a,b) => a.price - b.price);
    else if (sort === 'price_high') gigs.sort((a,b) => b.price - a.price);
    else if (sort === 'reviews') gigs.sort((a,b) => b.reviews - a.reviews);
    return gigs;
}

function renderGigs(reset) {
    if (reset === undefined) reset = true;
    const container = document.getElementById('gigsGrid');
    if (!container) return;
    if (reset) gigsPage = 1;

    const allGigs = getFilteredGigs();
    const total = allGigs.length;
    const slice = allGigs.slice(0, gigsPage * PAGE_SIZE);

    const badge = document.getElementById('gigCount');
    if (badge) badge.textContent = total + ' services';

    container.innerHTML = slice.length
        ? slice.map(g => gigCardHTML(g)).join('')
        : '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:60px 20px;font-size:15px;">No gigs found. Try adjusting your filters.</p>';

    const moreWrap = document.getElementById('gigsLoadMoreWrap');
    if (moreWrap) {
        if (slice.length < total) {
            moreWrap.innerHTML = '<div style="text-align:center;padding:28px 0;"><p style="color:var(--text-muted);font-size:13px;margin-bottom:14px;">Showing ' + slice.length + ' of ' + total + ' services</p><button class="btn btn-outline" onclick="loadMoreGigs()">Load More Services</button></div>';
        } else if (total > PAGE_SIZE) {
            moreWrap.innerHTML = '<p style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">&#10003; All ' + total + ' services loaded</p>';
        } else {
            moreWrap.innerHTML = '';
        }
    }
}

function loadMoreGigs() { gigsPage++; renderGigs(false); }

function gigCardHTML(g) {
    const isSaved = currentUser?.savedGigs?.includes(g.id);
    return `
    <div class="gig-card" onclick="showGigDetail(${g.id})">
        <div class="gig-thumb" style="background:linear-gradient(135deg,${gigColor(g.id)});">
            ${g.icon}
            <div class="gig-thumb-overlay"></div>
            <button class="gig-bookmark" onclick="event.stopPropagation();toggleSaveGig(${g.id})" title="Save gig">${isSaved ? '🔖' : '🏷️'}</button>
        </div>
        <div class="gig-body">
            <div class="gig-seller">
                <div class="gig-avatar">${g.sellerName.charAt(0)}</div>
                <div>
                    <div class="gig-seller-name">${g.sellerName}</div>
                    <div class="gig-seller-level"><span class="level-badge ${g.sellerLevel === 'Top Rated' ? 'level-top' : g.sellerLevel === 'Level 2' ? 'level-2' : 'level-1'}">${g.sellerLevel === 'Top Rated' ? '⭐ ' : ''}${g.sellerLevel}</span></div>
                </div>
            </div>
            <div class="gig-title">${g.title}</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
                ${g.tags.slice(0,3).map(t => `<span class="tag" style="font-size:11px;">${t}</span>`).join('')}
            </div>
            <div class="gig-footer">
                <div class="gig-rating">
                    <span class="star">★</span>
                    <strong>${g.rating}</strong>
                    <span style="color:var(--text-muted)">(${g.reviews})</span>
                </div>
                <div class="gig-price">₹${g.price.toLocaleString('en-IN')}<span>/starting</span></div>
            </div>
        </div>
    </div>`;
}

function gigColor(id) {
    const colors = [
        '#0A0F1E,#1a2f4e','#1a0f2e,#2d1b4e','#0f2a1a,#1a3d2a',
        '#2a1a0f,#3d2a1a','#0f1a2a,#1a2d3d','#1a0a1e,#2d1538'
    ];
    return colors[id % colors.length];
}

function toggleSaveGig(id) {
    if (!currentUser) { showNotif('Sign in to save gigs', 'info'); return; }
    if (!currentUser.savedGigs) currentUser.savedGigs = [];
    const idx = currentUser.savedGigs.indexOf(id);
    if (idx === -1) { currentUser.savedGigs.push(id); showNotif('Gig saved!', 'success'); }
    else { currentUser.savedGigs.splice(idx, 1); showNotif('Gig removed from saved', 'info'); }
    syncUser();
    renderGigs();
}

function showGigDetail(id) {
    const g = DB.gigs.find(x => x.id === id);
    if (!g) return;
    showModal(`
        <div class="modal-title">${g.title}</div>
        <div class="modal-sub">by ${g.sellerName} · ${g.sellerLevel}</div>
        <div style="font-size:60px;text-align:center;padding:20px 0;">${g.icon}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <div class="gig-rating" style="font-size:15px;">
                <span class="star" style="font-size:18px;">★</span>
                <strong>${g.rating}</strong>
                <span style="color:var(--text-muted)">(${g.reviews} reviews)</span>
            </div>
            <span class="tag tag-green">Delivery: ${g.deliveryDays} days</span>
        </div>
        <div style="flex-wrap:wrap;display:flex;gap:8px;margin-bottom:20px;">
            ${g.tags.map(t => `<span class="tag tag-accent">${t}</span>`).join('')}
        </div>
        <div class="section-divider"></div>
        <h4 style="margin-bottom:16px;">Package</h4>
        <div style="background:var(--secondary);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <div style="font-weight:700;font-size:16px;">Standard</div>
                    <div style="color:var(--text-muted);font-size:13px;margin-top:4px;">${g.deliveryDays}-day delivery · 2 Revisions included</div>
                </div>
                <div style="font-size:24px;font-weight:800;color:var(--accent);">₹${g.price.toLocaleString('en-IN')}</div>
            </div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="orderGig(${g.id})">Continue (₹${g.price.toLocaleString('en-IN')})</button>
        <button class="btn btn-secondary btn-block" style="margin-top:10px;" onclick="contactSeller(${g.id})">💬 Contact Seller</button>
    `);
}

function orderGig(id) {
    if (!currentUser) { closeModal(); showAuth('employer','register'); return; }
    closeModal();
    const g = DB.gigs.find(x => x.id === id);
    showModal(`
        <div class="modal-title">🔒 Secure Checkout</div>
        <div class="modal-sub">Your payment is protected by FreelanceHub Escrow</div>
        <div style="background:var(--secondary);border-radius:var(--radius);padding:20px;margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                <span style="color:var(--text-muted);">${g.title.substring(0,50)}...</span>
                <strong>₹${g.price.toLocaleString('en-IN')}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                <span style="color:var(--text-muted);">Service Fee (5%)</span>
                <strong>₹${Math.round(g.price*0.05).toLocaleString('en-IN')}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;">
                <strong style="font-size:16px;">Total</strong>
                <strong style="font-size:18px;color:var(--accent);">₹${Math.round(g.price*1.05).toLocaleString('en-IN')}</strong>
            </div>
        </div>
        <div class="escrow-timeline">
            <div class="escrow-step active"><div class="escrow-step-dot">💰</div><div class="escrow-step-label">Deposit</div></div>
            <div class="escrow-step"><div class="escrow-step-dot">⚙️</div><div class="escrow-step-label">In Progress</div></div>
            <div class="escrow-step"><div class="escrow-step-dot">✅</div><div class="escrow-step-label">Review</div></div>
            <div class="escrow-step"><div class="escrow-step-dot">🚀</div><div class="escrow-step-label">Released</div></div>
        </div>
        <div class="form-group" style="margin-top:20px;">
            <label class="form-label">Payment Method</label>
            <select class="form-control">
                <option>💳 Credit / Debit Card</option>
                <option>📱 UPI (GPay, PhonePe, Paytm)</option>
                <option>🏦 Net Banking</option>
                <option>💵 PayPal</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Additional Instructions (optional)</label>
            <textarea class="form-control" placeholder="Any specific requirements for this order..."></textarea>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="placeOrder(${id})">🔒 Place Order Securely</button>
    `);
}

function placeOrder(gigId) {
    closeModal();
    const g = DB.gigs.find(x => x.id === gigId);
    DB.orders.push({ id:Date.now(), gigId, gigTitle:g.title, status:'active', amount:g.price, date:new Date().toLocaleDateString() });
    showNotif('Order placed! 🎉 Payment secured in escrow.', 'success');
}

function contactSeller(gigId) {
    if (!currentUser) { closeModal(); showAuth('freelancer','register'); return; }
    closeModal();
    showPage('dashboard');
    setTimeout(() => dashSection('messages'), 100);
}

function getFilteredJobs() {
    const search = (document.getElementById('jobSearch')?.value||'').toLowerCase();
    const filter = document.getElementById('jobFilter')?.value||'';
    const sort = document.getElementById('jobSort')?.value||'newest';
    const duration = document.getElementById('jobDuration')?.value||'';
    const proposals = document.getElementById('jobProposals')?.value||'';

    let jobs = [...DB.jobs];
    if (search) jobs = jobs.filter(j => j.title.toLowerCase().includes(search) || j.description.toLowerCase().includes(search) || j.skills.some(s=>s.toLowerCase().includes(search)) || j.company.toLowerCase().includes(search));
    if (filter) jobs = jobs.filter(j => j.category === filter);
    if (duration === 'short') jobs = jobs.filter(j => ['Less than 1 week','1-2 weeks','2-4 weeks','1-2 weeks','2-4 weeks','3-4 weeks','4-6 weeks'].some(d => j.duration.includes(d.split(' ')[0])));
    if (duration === 'long') jobs = jobs.filter(j => j.duration.includes('3+') || j.duration.includes('Ongoing') || j.duration.includes('6+'));
    if (duration === 'medium') jobs = jobs.filter(j => j.duration.includes('month') && !j.duration.includes('3+') && !j.duration.includes('6+'));
    if (proposals === 'none') jobs = jobs.filter(j => j.proposals.length === 0);
    if (proposals === 'low') jobs = jobs.filter(j => j.proposals.length < 5);
    if (sort === 'proposals_low') jobs.sort((a,b) => a.proposals.length - b.proposals.length);
    return jobs;
}

function renderJobsPage(reset) {
    if (reset === undefined) reset = true;
    const container = document.getElementById('jobsGrid');
    if (!container) return;
    if (reset) jobsPage = 1;

    const allJobs = getFilteredJobs();
    const total = allJobs.length;
    const slice = allJobs.slice(0, jobsPage * PAGE_SIZE);

    const badge = document.getElementById('jobCount');
    if (badge) badge.textContent = total + ' jobs';

    container.innerHTML = slice.map(j => jobCardPublicHTML(j)).join('') || '<p style="color:var(--text-muted);text-align:center;padding:60px 20px;font-size:15px;">No jobs found. Try adjusting your filters.</p>';

    const moreWrap = document.getElementById('jobsLoadMoreWrap');
    if (moreWrap) {
        if (slice.length < total) {
            moreWrap.innerHTML = '<div style="text-align:center;padding:28px 0;"><p style="color:var(--text-muted);font-size:13px;margin-bottom:14px;">Showing ' + slice.length + ' of ' + total + ' jobs</p><button class="btn btn-outline" onclick="loadMoreJobs()">Load More Jobs</button></div>';
        } else if (total > PAGE_SIZE) {
            moreWrap.innerHTML = '<p style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">&#10003; All ' + total + ' jobs loaded</p>';
        } else {
            moreWrap.innerHTML = '';
        }
    }
}

function loadMoreJobs() { jobsPage++; renderJobsPage(false); }

function jobCardPublicHTML(j) {
    return `
    <div class="job-card">
        <div class="job-card-header">
            <div>
                <div class="job-title">${j.title}</div>
                <div class="job-company">🏢 ${j.company} · Posted ${j.postedDate}</div>
            </div>
            <div class="job-budget">${j.budget.split('–')[0].trim()}</div>
        </div>
        <div class="job-desc">${j.description}</div>
        <div class="job-tags-row">${j.skills.map(s=>`<span class="tag">${s}</span>`).join('')}</div>
        <div class="job-footer">
            <div class="job-meta">📋 ${j.proposals.length} proposals · ⏱ ${j.duration}</div>
            <button class="btn btn-primary btn-sm" onclick="applyToJobPublic(${j.id})">Apply Now</button>
        </div>
    </div>`;
}

function applyToJobPublic(id) {
    if (!currentUser) { showAuth('freelancer','register'); return; }
    openApplyModal(id);
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isFL = currentUserType === 'freelancer';
    const items = isFL ? [
        { id:'home',          icon:'📊', label:'Dashboard'       },
        { id:'gigs_manage',   icon:'✨', label:'My Gigs'         },
        { id:'browse_jobs',   icon:'💼', label:'Find Work'       },
        { id:'proposals',     icon:'📝', label:'Proposals'       },
        { id:'contracts',     icon:'📃', label:'Contracts'       },
        { id:'orders',        icon:'📦', label:'Orders'          },
        { id:'earnings',      icon:'💰', label:'Earnings'        },
        { id:'messages',      icon:'💬', label:'Messages'        },
        { id:'talent_search', icon:'🔍', label:'Find Talent'     },
        { id:'saved',         icon:'🔖', label:'Saved Gigs'      },
        { id:'reviews',       icon:'⭐', label:'Reviews & JSS'   },
        { id:'calendar',      icon:'📅', label:'Calendar'        },
        { id:'referral',      icon:'🎁', label:'Refer & Earn'    },
        { id:'profile',       icon:'👤', label:'Profile'         },
    ] : [
        { id:'home',          icon:'📊', label:'Dashboard'       },
        { id:'post_job',      icon:'➕', label:'Post a Job'      },
        { id:'my_jobs',       icon:'📋', label:'My Jobs'         },
        { id:'view_proposals',icon:'👥', label:'Proposals'       },
        { id:'contracts',     icon:'📃', label:'Contracts'       },
        { id:'orders',        icon:'📦', label:'Orders'          },
        { id:'talent_search', icon:'🔍', label:'Find Talent'     },
        { id:'browse_gigs',   icon:'✨', label:'Explore Gigs'    },
        { id:'messages',      icon:'💬', label:'Messages'        },
        { id:'calendar',      icon:'📅', label:'Calendar'        },
        { id:'referral',      icon:'🎁', label:'Refer & Earn'    },
        { id:'profile',       icon:'👤', label:'Profile'         },
    ];

    sidebar.innerHTML = `
        <div style="padding:0 8px 16px;border-bottom:1px solid var(--border);margin-bottom:10px;">
            <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent3));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;color:#fff;">${currentUser.name.charAt(0)}</div>
                <div>
                    <div style="font-weight:700;font-size:14px;">${currentUser.name}</div>
                    <div style="font-size:12px;color:var(--text-muted);">${currentUserType === 'freelancer' ? '💼 Freelancer' : '🏢 Client'}</div>
                </div>
            </div>
        </div>
        ${items.map((it,i) => `
            <div class="sidebar-item ${i===0?'active':''}" id="si-${it.id}" onclick="dashSection('${it.id}')">
                <span class="sidebar-icon">${it.icon}</span>
                <span>${it.label}</span>
            </div>
        `).join('')}
        <div class="sidebar-divider"></div>
        <div class="sidebar-item" onclick="logout()">
            <span class="sidebar-icon">🚪</span>
            <span>Sign Out</span>
        </div>
    `;
}

function dashSection(id) {
    showPage('dashboard');
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('si-' + id);
    if (target) target.classList.add('active');

    const map = {
        home:           renderDashHome,
        gigs_manage:    renderMyGigs,
        browse_jobs:    renderDashJobs,
        browse_gigs:    () => { showPage('gigs'); renderGigs(); },
        proposals:      renderMyProposals,
        contracts:      renderContracts,
        orders:         renderOrders,
        earnings:       renderEarnings,
        messages:       renderMessages,
        talent_search:  renderTalentSearch,
        saved:          renderSavedGigs,
        reviews:        renderReviews,
        calendar:       renderCalendar,
        referral:       renderReferral,
        profile:        renderProfile,
        post_job:       renderPostJob,
        my_jobs:        renderMyJobs,
        view_proposals: renderViewProposals,
    };
    if (map[id]) map[id]();
}

function renderDashHome() {
    const c = document.getElementById('mainContent');
    const isFL = currentUserType === 'freelancer';

    if (isFL) {
        const matches = getAIMatches();
        const jss = currentUser.jss || 0;
        const connects = currentUser.connects || 10;
        c.innerHTML = `
            <div class="content-header">
                <h2>Welcome back, ${currentUser.name}! 👋</h2>
                <p>Here's your freelancing overview</p>
            </div>

            <!-- Availability + Connects bar -->
            <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;">
                <div class="availability-toggle" style="flex:1;min-width:200px;">
                    <label class="toggle-switch">
                        <input type="checkbox" ${currentUser.availability!=='unavailable'?'checked':''} onchange="toggleAvailability(this)">
                        <span class="toggle-slider"></span>
                    </label>
                    <div>
                        <div style="font-size:14px;font-weight:600;">${currentUser.availability!=='unavailable'?'Available for Work':'Not Available'}</div>
                        <div style="font-size:12px;color:var(--text-muted);">Clients can see your availability status</div>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;background:var(--secondary);border:1px solid var(--border);border-radius:var(--radius);padding:12px 20px;cursor:pointer;" onclick="dashSection('earnings')">
                    <span style="font-size:20px;">⚡</span>
                    <div>
                        <div style="font-size:18px;font-weight:800;color:var(--gold);font-family:'JetBrains Mono',monospace;">${connects}</div>
                        <div style="font-size:11px;color:var(--text-muted);">Connects available</div>
                    </div>
                    <button class="btn btn-gold btn-sm" style="margin-left:8px;" onclick="event.stopPropagation();buyConnects()">Buy More</button>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card"><div class="stat-value">${currentUser.completedJobs||0}</div><div class="stat-label">Completed Jobs</div></div>
                <div class="stat-card"><div class="stat-value">₹${(currentUser.totalEarned||0).toLocaleString('en-IN')}</div><div class="stat-label">Total Earned</div></div>
                <div class="stat-card" style="cursor:pointer;" onclick="dashSection('reviews')">
                    <div style="display:flex;align-items:center;justify-content:center;gap:12px;">
                        <div class="jss-ring">
                            <svg width="72" height="72" viewBox="0 0 72 72">
                                <circle cx="36" cy="36" r="30" fill="none" stroke="var(--border)" stroke-width="6"/>
                                <circle cx="36" cy="36" r="30" fill="none" stroke="var(--accent)" stroke-width="6" stroke-dasharray="${jss*1.884} 188.4" stroke-linecap="round"/>
                            </svg>
                            <span class="jss-ring-value">${jss}%</span>
                        </div>
                        <div class="stat-label">Job Success Score</div>
                    </div>
                </div>
                <div class="stat-card"><div class="stat-value">${matches.length}</div><div class="stat-label">AI Job Matches</div></div>
            </div>

            <!-- Profile completeness -->
            ${calcProfileScore() < 80 ? `
            <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius);padding:16px 20px;margin-bottom:24px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <strong>Profile Completeness — ${calcProfileScore()}%</strong>
                    <button class="btn btn-gold btn-sm" onclick="dashSection('profile')">Complete Profile</button>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width:${calcProfileScore()}%"></div></div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:6px;">Complete your profile to get more job invitations and improve your JSS</div>
            </div>` : ''}

            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <h3>🤖 AI-Matched Jobs For You</h3>
                <button class="btn btn-outline btn-sm" onclick="dashSection('browse_jobs')">Browse All Jobs →</button>
            </div>
            <div class="job-list">${matches.map(j => dashJobCardHTML(j, true)).join('') || '<div class="card" style="text-align:center;padding:40px;color:var(--text-muted);">Add skills to your profile to see AI-matched jobs</div>'}</div>
        `;
    } else {
        const myJobs = DB.jobs.filter(j => j.employerId === currentUser.id);
        c.innerHTML = `
            <div class="content-header">
                <h2>Welcome back, ${currentUser.name}! 👋</h2>
                <p>Manage your projects and team</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-value">${myJobs.length}</div><div class="stat-label">Posted Jobs</div></div>
                <div class="stat-card"><div class="stat-value">${myJobs.reduce((s,j)=>s+j.proposals.length,0)}</div><div class="stat-label">Total Proposals</div></div>
                <div class="stat-card"><div class="stat-value">${DB.orders.length}</div><div class="stat-label">Active Orders</div></div>
                <div class="stat-card"><div class="stat-value">₹0</div><div class="stat-label">Total Spent</div></div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <h3>Recent Job Postings</h3>
                <button class="btn btn-primary btn-sm" onclick="dashSection('post_job')">➕ Post New Job</button>
            </div>
            <div class="job-list">${myJobs.length ? myJobs.map(j => dashJobCardHTML(j, false)).join('') : '<div class="card" style="text-align:center;padding:40px;color:var(--text-muted);">No jobs posted yet. <a style="color:var(--accent);cursor:pointer;" onclick="dashSection(\'post_job\')">Post your first job →</a></div>'}</div>
        `;
    }
}

function getAIMatches() {
    if (!currentUser.skills?.length) return [];
    return DB.jobs.map(j => {
        const score = j.skills.filter(s => currentUser.skills.some(us => us.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(us.toLowerCase()))).length;
        return { ...j, aiScore: Math.min(98, 55 + score * 12) };
    }).filter(j => j.aiScore > 55).sort((a,b) => b.aiScore - a.aiScore).slice(0, 5);
}

function dashJobCardHTML(j, showAI) {
    return `
    <div class="job-card">
        <div class="job-card-header">
            <div>
                <div class="job-title">${j.title}</div>
                <div class="job-company">🏢 ${j.company} · ${j.postedDate}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
                <div class="job-budget">${j.budget.split('–')[0].trim()}</div>
                ${showAI && j.aiScore ? `<span class="ai-badge">🤖 ${j.aiScore}% match</span>` : ''}
            </div>
        </div>
        <div class="job-desc">${j.description}</div>
        <div class="job-tags-row">${j.skills.map(s=>`<span class="tag">${s}</span>`).join('')}</div>
        <div class="job-footer">
            <div class="job-meta">📋 ${j.proposals.length} proposals · ⏱ ${j.duration||'Flexible'}</div>
            ${currentUserType === 'freelancer' ? `<button class="btn btn-primary btn-sm" onclick="openApplyModal(${j.id})">Apply Now</button>` : `<button class="btn btn-secondary btn-sm" onclick="viewProposalsModal(${j.id})">View Proposals (${j.proposals.length})</button>`}
        </div>
    </div>`;
}

function renderMyGigs() {
    const c = document.getElementById('mainContent');
    const myGigs = DB.gigs.filter(g => g.sellerId === currentUser.id);
    c.innerHTML = `
        <div class="content-header">
            <h2>My Gigs</h2>
            <p>Manage your service listings</p>
        </div>
        <button class="btn btn-primary" onclick="openCreateGig()" style="margin-bottom:20px;">➕ Create New Gig</button>
        ${myGigs.length ? `<div class="gig-grid">${myGigs.map(g => gigCardHTML(g)).join('')}</div>` : `
            <div class="card" style="text-align:center;padding:60px;">
                <div style="font-size:48px;margin-bottom:16px;">✨</div>
                <h3 style="margin-bottom:8px;">No gigs yet</h3>
                <p style="color:var(--text-muted);margin-bottom:24px;">Create your first gig and start earning</p>
                <button class="btn btn-primary" onclick="openCreateGig()">Create Your First Gig</button>
            </div>
        `}
    `;
}

function openCreateGig() {
    showModal(`
        <div class="modal-title">✨ Create a New Gig</div>
        <div class="modal-sub">Offer your services to thousands of clients</div>
        <div class="form-group">
            <label class="form-label">Gig Title</label>
            <input type="text" class="form-control" id="gigTitle" placeholder="I will create a professional...">
        </div>
        <div class="form-group">
            <label class="form-label">Category</label>
            <select class="form-control" id="gigCat">
                <option>Programming & Tech</option>
                <option>Graphics & Design</option>
                <option>Digital Marketing</option>
                <option>Writing & Translation</option>
                <option>Video & Animation</option>
                <option>Music & Audio</option>
                <option>Business</option>
                <option>AI Services</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-control" id="gigDesc" placeholder="Describe your service in detail..."></textarea>
        </div>
        <h4 style="margin-bottom:16px;">Packages</h4>
        <div class="packages-grid">
            <div class="package-card">
                <div class="package-header"><span class="package-name">Basic</span></div>
                <input class="package-price-input" type="number" id="priceBasic" placeholder="999" value="999">
                <div class="form-hint" style="margin-top:8px;">Starting price</div>
                <input type="text" class="form-control" style="margin-top:10px;" id="descBasic" placeholder="What's included...">
                <div style="display:flex;gap:8px;margin-top:10px;">
                    <select class="form-control" id="daysBasic"><option>1 day</option><option>3 days</option><option>5 days</option><option>7 days</option><option>14 days</option></select>
                </div>
            </div>
            <div class="package-card featured">
                <div class="package-header"><span class="package-name" style="color:var(--accent);">Standard ⭐</span></div>
                <input class="package-price-input" type="number" id="priceStd" placeholder="2999" value="2999">
                <div class="form-hint" style="margin-top:8px;">Most popular</div>
                <input type="text" class="form-control" style="margin-top:10px;" id="descStd" placeholder="What's included...">
                <div style="display:flex;gap:8px;margin-top:10px;">
                    <select class="form-control" id="daysStd"><option>3 days</option><option>5 days</option><option>7 days</option><option>14 days</option></select>
                </div>
            </div>
            <div class="package-card">
                <div class="package-header"><span class="package-name">Premium</span></div>
                <input class="package-price-input" type="number" id="pricePrem" placeholder="7999" value="7999">
                <div class="form-hint" style="margin-top:8px;">Full package</div>
                <input type="text" class="form-control" style="margin-top:10px;" id="descPrem" placeholder="What's included...">
                <div style="display:flex;gap:8px;margin-top:10px;">
                    <select class="form-control" id="daysPrem"><option>7 days</option><option>14 days</option><option>21 days</option><option>30 days</option></select>
                </div>
            </div>
        </div>
        <div class="form-group" style="margin-top:20px;">
            <label class="form-label">Gig Tags (press Enter)</label>
            <div class="skills-container" id="gigTagsContainer">
                <input class="skill-input" id="gigTagInput" placeholder="Add relevant tags..." onkeydown="addGigTag(event)">
            </div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" style="margin-top:16px;" onclick="submitGig()">🚀 Publish Gig</button>
    `);
    gigSkillTags = [];
}

let tempGigTags = [];
function addGigTag(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const input = document.getElementById('gigTagInput');
    const val = input.value.trim();
    if (!val || tempGigTags.includes(val)) return;
    tempGigTags.push(val);
    const container = document.getElementById('gigTagsContainer');
    const el = document.createElement('span');
    el.className = 'tag tag-accent';
    el.setAttribute('data-tag', val);
    el.innerHTML = `${val} <span class="tag-close" onclick="this.parentElement.remove();tempGigTags.splice(tempGigTags.indexOf('${val}'),1)">✕</span>`;
    container.insertBefore(el, input);
    input.value = '';
}

function submitGig() {
    const title = document.getElementById('gigTitle').value.trim();
    if (!title) { showNotif('Please add a gig title', 'error'); return; }
    const newGig = {
        id: DB.gigs.length + 100,
        title,
        sellerId: currentUser.id,
        sellerName: currentUser.name,
        sellerLevel: 'Level 1',
        category: document.getElementById('gigCat').value,
        price: parseInt(document.getElementById('priceBasic').value) || 999,
        rating: 0, reviews: 0,
        tags: tempGigTags.length ? tempGigTags : ['Custom Service'],
        icon: '⭐',
        deliveryDays: 7
    };
    DB.gigs.push(newGig);
    tempGigTags = [];
    closeModal();
    showNotif('Gig published! 🎉 Clients can now find your service.', 'success');
    renderMyGigs();
}

function renderDashJobs() {
    const c = document.getElementById('mainContent');
    c.innerHTML = `
        <div class="content-header">
            <h2>Browse Jobs</h2>
            <p>Find your perfect project — ${DB.jobs.length} live listings</p>
        </div>
        <div class="search-bar">
            <div class="search-input-wrap" style="flex:2;">
                <span class="search-icon">🔍</span>
                <input type="text" class="form-control" placeholder="Search jobs, skills, or company..." id="dashJobSearch" oninput="renderDashJobsList()">
            </div>
            <select class="filter-btn" id="dashJobCat" onchange="renderDashJobsList()">
                <option value="">All Categories</option>
                <option>Web Development</option><option>Mobile App</option><option>Design</option>
                <option>Writing</option><option>Marketing</option><option>Data Science</option><option>Video</option>
            </select>
            <select class="filter-btn" id="dashJobSort" onchange="renderDashJobsList()">
                <option value="">Newest First</option>
                <option value="proposals_low">Fewest Proposals</option>
            </select>
        </div>
        <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center;">
            <select class="filter-btn" id="dashJobDuration" onchange="renderDashJobsList()">
                <option value="">Any Duration</option>
                <option value="short">Short-term</option><option value="medium">Medium-term</option><option value="long">Long-term / Ongoing</option>
            </select>
            <span id="dashJobCount" style="margin-left:auto;font-size:13px;color:var(--text-muted);font-weight:600;"></span>
        </div>
        <div id="dashJobsList" class="job-list"></div>
        <div id="dashJobsLoadMoreWrap"></div>
    `;
    dashJobsPage = 1;
    renderDashJobsList();
}

let dashJobsPage = 1;
function renderDashJobsList(reset) {
    if (reset === undefined) reset = true;
    if (reset) dashJobsPage = 1;

    const search = (document.getElementById('dashJobSearch')?.value||'').toLowerCase();
    const cat = document.getElementById('dashJobCat')?.value||'';
    const sort = document.getElementById('dashJobSort')?.value||'';
    const dur = document.getElementById('dashJobDuration')?.value||'';

    let jobs = [...DB.jobs];
    if (search) jobs = jobs.filter(j => j.title.toLowerCase().includes(search) || j.skills.some(s=>s.toLowerCase().includes(search)) || j.company.toLowerCase().includes(search));
    if (cat) jobs = jobs.filter(j => j.category === cat);
    if (dur === 'long') jobs = jobs.filter(j => j.duration.includes('3+') || j.duration.includes('Ongoing') || j.duration.includes('6+'));
    if (dur === 'medium') jobs = jobs.filter(j => j.duration.includes('month') && !j.duration.includes('3+') && !j.duration.includes('6+'));
    if (sort === 'proposals_low') jobs.sort((a,b) => a.proposals.length - b.proposals.length);

    const total = jobs.length;
    const slice = jobs.slice(0, dashJobsPage * PAGE_SIZE);

    const badge = document.getElementById('dashJobCount');
    if (badge) badge.textContent = total + ' jobs found';

    document.getElementById('dashJobsList').innerHTML = slice.map(j => dashJobCardHTML(j, false)).join('') || '<p style="color:var(--text-muted);text-align:center;padding:40px;">No jobs found.</p>';

    const moreWrap = document.getElementById('dashJobsLoadMoreWrap');
    if (moreWrap) {
        moreWrap.innerHTML = slice.length < total
            ? '<div style="text-align:center;padding:24px;"><p style="color:var(--text-muted);font-size:13px;margin-bottom:12px;">Showing ' + slice.length + ' of ' + total + '</p><button class="btn btn-outline" onclick="dashLoadMoreJobs()">Load More</button></div>'
            : (total > PAGE_SIZE ? '<p style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px;">&#10003; All ' + total + ' jobs shown</p>' : '');
    }
}

function dashLoadMoreJobs() { dashJobsPage++; renderDashJobsList(false); }

function openApplyModal(jobId) {
    if (!currentUser) { showAuth('freelancer','register'); return; }
    const j = DB.jobs.find(x => x.id === jobId);
    showModal(`
        <div class="modal-title">📝 Submit Proposal</div>
        <div class="modal-sub">Applying for: ${j.title}</div>
        <div style="background:var(--secondary);border-radius:var(--radius);padding:14px 18px;margin-bottom:20px;display:flex;justify-content:space-between;">
            <span style="color:var(--text-muted);">Budget:</span>
            <strong style="color:var(--success);">${j.budget}</strong>
        </div>
        <div class="form-group">
            <label class="form-label">Cover Letter</label>
            <textarea class="form-control" id="applyLetter" rows="5" placeholder="Introduce yourself, explain why you're the best fit, mention relevant experience..."></textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group">
                <label class="form-label">Your Bid Amount (₹)</label>
                <input type="number" class="form-control" id="applyBid" placeholder="e.g. 55000">
            </div>
            <div class="form-group">
                <label class="form-label">Estimated Delivery</label>
                <select class="form-control" id="applyTime">
                    <option>1 week</option><option>2 weeks</option><option>3 weeks</option><option>1 month</option><option>2 months</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Relevant Portfolio Links (optional)</label>
            <input type="text" class="form-control" id="applyPortfolio" placeholder="https://your-portfolio.com or GitHub URL">
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="submitProposal(${jobId})">Submit Proposal →</button>
    `);
}

function submitProposal(jobId) {
    const letter = document.getElementById('applyLetter')?.value.trim();
    const bid = document.getElementById('applyBid')?.value;
    if (!letter || !bid) { showNotif('Please fill cover letter and bid amount', 'error'); return; }
    const j = DB.jobs.find(x => x.id === jobId);
    j.proposals.push({ id:Date.now(), freelancerId:currentUser.id, freelancerName:currentUser.name, coverLetter:letter, bidAmount:bid, deliveryTime:document.getElementById('applyTime').value, status:'pending', portfolio:document.getElementById('applyPortfolio')?.value||'' });
    closeModal();
    showNotif('Proposal submitted successfully! ✅', 'success');
}

function renderMyProposals() {
    const c = document.getElementById('mainContent');
    const myProps = DB.jobs.filter(j => j.proposals.some(p => p.freelancerId === currentUser.id))
        .map(j => ({ ...j, myProp: j.proposals.find(p => p.freelancerId === currentUser.id) }));

    c.innerHTML = `
        <div class="content-header"><h2>My Proposals</h2><p>Track applications you've submitted</p></div>
        <div class="job-list">${myProps.length ? myProps.map(j => `
            <div class="job-card">
                <div class="job-card-header">
                    <div>
                        <div class="job-title">${j.title}</div>
                        <div class="job-company">🏢 ${j.company}</div>
                    </div>
                    <span class="status-pill status-${j.myProp.status === 'pending' ? 'pending' : j.myProp.status === 'accepted' ? 'active' : 'cancelled'}">${j.myProp.status}</span>
                </div>
                <div style="background:var(--secondary);border-radius:var(--radius);padding:14px;margin:10px 0;">
                    <p style="font-size:13px;color:var(--text-muted);">"${j.myProp.coverLetter.substring(0,150)}..."</p>
                    <div style="margin-top:10px;display:flex;gap:20px;">
                        <span><strong style="color:var(--accent);">₹${parseInt(j.myProp.bidAmount).toLocaleString('en-IN')}</strong> <span style="color:var(--text-muted);font-size:12px;">Your bid</span></span>
                        <span><strong>⏱ ${j.myProp.deliveryTime}</strong></span>
                    </div>
                </div>
            </div>`) .join('') : `<div class="card" style="text-align:center;padding:40px;">
                <div style="font-size:48px;margin-bottom:16px;">📝</div>
                <h3>No proposals yet</h3>
                <p style="color:var(--text-muted);margin:8px 0 20px;">Apply to jobs to see your proposals here</p>
                <button class="btn btn-primary" onclick="dashSection('browse_jobs')">Browse Jobs</button>
            </div>`}
        </div>
    `;
}

function renderOrders() {
    const c = document.getElementById('mainContent');
    c.innerHTML = `
        <div class="content-header"><h2>Orders</h2><p>Track all active and past orders</p></div>
        <div class="card" style="padding:0;overflow:hidden;">
            <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:16px;font-size:12px;color:var(--text-muted);font-weight:700;text-transform:uppercase;">
                <span>Order</span><span>Amount</span><span>Status</span><span>Date</span>
            </div>
            ${DB.orders.length ? DB.orders.map(o => `
                <div class="order-row" style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:16px;align-items:center;">
                    <span style="font-size:14px;font-weight:500;">${o.gigTitle?.substring(0,50)||'Custom Order'}...</span>
                    <span style="font-weight:700;color:var(--accent);">₹${o.amount?.toLocaleString('en-IN')||0}</span>
                    <span class="status-pill status-${o.status}">${o.status}</span>
                    <span style="font-size:13px;color:var(--text-muted);">${o.date}</span>
                </div>
            `).join('') : `<div style="text-align:center;padding:60px;color:var(--text-muted);">No orders yet</div>`}
        </div>
    `;
}

function renderEarnings() {
    const c = document.getElementById('mainContent');
    c.innerHTML = `
        <div class="content-header"><h2>Earnings & Payments</h2><p>Your financial overview</p></div>
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-value">₹${(currentUser.balance||0).toLocaleString('en-IN')}</div><div class="stat-label">Available Balance</div></div>
            <div class="stat-card"><div class="stat-value">₹0</div><div class="stat-label">In Escrow</div></div>
            <div class="stat-card"><div class="stat-value">₹${(currentUser.totalEarned||0).toLocaleString('en-IN')}</div><div class="stat-label">Lifetime Earnings</div></div>
            <div class="stat-card"><div class="stat-value">${currentUser.completedJobs||0}</div><div class="stat-label">Completed Orders</div></div>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="showNotif('Withdrawal initiated! Funds arrive in 1-3 business days.','success')">💳 Withdraw Funds</button>
            <button class="btn btn-secondary" onclick="showNotif('Statement downloaded!','info')">📄 Download Statement</button>
        </div>
        <div class="card" style="padding:0;overflow:hidden;">
            <div style="padding:20px;border-bottom:1px solid var(--border);">
                <h3>Transaction History</h3>
            </div>
            <div style="text-align:center;padding:60px;color:var(--text-muted);">
                <div style="font-size:48px;margin-bottom:16px;">💰</div>
                <p>Complete your first order to see transactions</p>
                <button class="btn btn-primary" style="margin-top:16px;" onclick="dashSection('browse_jobs')">Find Work</button>
            </div>
        </div>

        <div class="card" style="margin-top:24px;">
            <h3 style="margin-bottom:16px;">Withdrawal Methods</h3>
            <div style="display:flex;flex-direction:column;gap:12px;">
                ${[['🏦','Bank Transfer (NEFT/IMPS)','1-2 business days'],['📱','UPI (GPay, PhonePe, Paytm)','Instant'],['💵','PayPal','3-5 business days']].map(([icon,name,time])=>`
                    <div style="display:flex;align-items:center;gap:14px;padding:14px;background:var(--secondary);border-radius:var(--radius);">
                        <span style="font-size:24px;">${icon}</span>
                        <div style="flex:1;"><div style="font-weight:600;">${name}</div><div style="font-size:12px;color:var(--text-muted);">${time}</div></div>
                        <button class="btn btn-secondary btn-sm" onclick="showNotif('Payment method setup coming soon!','info')">Setup</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderMessages() {
    const c = document.getElementById('mainContent');
    const convos = [
        { id:1, name:'John Smith', preview:'Thanks for the update! Looking forward to it.', time:'2m', unread:2 },
        { id:2, name:'TechStart Solutions', preview:'When can you start the project?', time:'1h', unread:0 },
        { id:3, name:'Sarah Johnson', preview:'Looking forward to working with you 😊', time:'3h', unread:1 },
    ];

    c.innerHTML = `
        <div class="content-header"><h2>Messages</h2><p>Your conversations</p></div>
        <div class="messages-layout">
            <div class="chat-list-panel">
                <div class="chat-list-header">Conversations</div>
                ${convos.map((cv,i) => `
                    <div class="chat-item ${i===0?'active':''}" onclick="loadConvo(${cv.id}, '${cv.name}', this)">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                            <div class="chat-item-name">${cv.name}</div>
                            <span style="font-size:11px;color:var(--text-muted);">${cv.time}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">
                            <div class="chat-item-preview">${cv.preview}</div>
                            ${cv.unread ? `<span style="background:var(--accent);color:var(--primary);font-size:11px;font-weight:700;padding:2px 6px;border-radius:10px;margin-left:8px;">${cv.unread}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="chat-panel" id="chatPanel">
                <div class="chat-panel-header">
                    <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent3));display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;">J</div>
                    <div>
                        <div>John Smith</div>
                        <div style="font-size:12px;color:var(--success);font-weight:400;">● Online</div>
                    </div>
                    <div style="margin-left:auto;display:flex;gap:8px;">
                        <button class="btn btn-secondary btn-sm" onclick="showNotif('Video call feature coming soon!','info')">📹 Video</button>
                        <button class="btn btn-secondary btn-sm" onclick="showNotif('File sharing coming soon!','info')">📎 Attach</button>
                    </div>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="msg"><div><div class="msg-bubble">Hi! I reviewed your proposal and I'm very interested in moving forward with you.</div><div class="msg-time">10:30 AM</div></div></div>
                    <div class="msg sent"><div><div class="msg-bubble">That's great news! I'm excited to work on this project. When can we start?</div><div class="msg-time">10:32 AM</div></div></div>
                    <div class="msg"><div><div class="msg-bubble">We can start next week. I'll deposit the payment to escrow today itself.</div><div class="msg-time">10:35 AM</div></div></div>
                    <div class="msg sent"><div><div class="msg-bubble">Perfect! I'll prepare a detailed project timeline and share it with you by tomorrow.</div><div class="msg-time">10:37 AM</div></div></div>
                    <div class="msg"><div><div class="msg-bubble">Thanks for the update! Looking forward to it.</div><div class="msg-time">2m ago</div></div></div>
                </div>
                <div class="chat-input-row">
                    <input class="chat-input-field" id="msgInput" placeholder="Type a message..." onkeydown="if(event.key==='Enter')sendMsg()">
                    <button class="btn btn-secondary btn-sm" onclick="showNotif('File sharing coming soon!','info')" title="Attach file">📎</button>
                    <button class="btn btn-primary btn-sm" onclick="sendMsg()">Send →</button>
                </div>
            </div>
        </div>
    `;
}

function sendMsg() {
    const input = document.getElementById('msgInput');
    const msgs = document.getElementById('chatMessages');
    if (!input?.value.trim()) return;
    const el = document.createElement('div');
    el.className = 'msg sent';
    el.innerHTML = `<div><div class="msg-bubble">${input.value}</div><div class="msg-time">Just now</div></div>`;
    msgs.appendChild(el);
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;
}

function loadConvo(id, name, el) {
    document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
}

function renderSavedGigs() {
    const c = document.getElementById('mainContent');
    const saved = (currentUser.savedGigs||[]).map(id => DB.gigs.find(g=>g.id===id)).filter(Boolean);
    c.innerHTML = `
        <div class="content-header"><h2>Saved Gigs</h2><p>Services you've bookmarked</p></div>
        ${saved.length ? `<div class="gig-grid">${saved.map(g => gigCardHTML(g)).join('')}</div>` : `
            <div class="card" style="text-align:center;padding:60px;">
                <div style="font-size:48px;margin-bottom:16px;">🔖</div>
                <h3>Nothing saved yet</h3>
                <p style="color:var(--text-muted);margin:8px 0 20px;">Browse gigs and save ones you like</p>
                <button class="btn btn-primary" onclick="browseGigs()">Explore Gigs</button>
            </div>
        `}
    `;
}

function renderReviews() {
    const c = document.getElementById('mainContent');
    c.innerHTML = `
        <div class="content-header"><h2>Reviews</h2><p>Feedback from your clients</p></div>
        <div style="display:flex;align-items:center;gap:32px;background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius-lg);padding:28px;margin-bottom:24px;">
            <div style="text-align:center;">
                <div style="font-size:52px;font-weight:800;font-family:'JetBrains Mono',monospace;color:var(--accent);">${currentUser.rating||'—'}</div>
                <div style="color:var(--gold);font-size:20px;letter-spacing:2px;">★★★★★</div>
                <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">Overall Rating</div>
            </div>
            <div style="flex:1;">
                ${[5,4,3,2,1].map(n => `
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                        <span style="font-size:12px;color:var(--text-muted);width:14px;">${n}</span>
                        <span style="color:var(--gold);font-size:13px;">★</span>
                        <div class="progress-bar" style="flex:1;"><div class="progress-fill" style="width:${n===5?80:n===4?10:5}%"></div></div>
                        <span style="font-size:12px;color:var(--text-muted);width:30px;">${n===5?'80%':n===4?'10%':'5%'}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div style="text-align:center;padding:60px;color:var(--text-muted);background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius-lg);">
            <div style="font-size:48px;margin-bottom:16px;">⭐</div>
            <h3>No reviews yet</h3>
            <p style="margin-top:8px;">Complete your first order to start receiving reviews</p>
        </div>
    `;
}

function renderProfile() {
    const c = document.getElementById('mainContent');
    const isFL = currentUserType === 'freelancer';
    profileSkillTags = [...(currentUser.skills || [])];

    c.innerHTML = `
        <div class="content-header"><h2>My Profile</h2><p>Manage your account and public profile</p></div>

        <!-- Profile Header Card -->
        <div class="profile-header-card">
            <div class="profile-big-avatar">${currentUser.name.charAt(0)}</div>
            <div class="profile-info" style="flex:1;">
                <div class="role-badge">${isFL ? '💼 Freelancer' : '🏢 Client'}</div>
                <h2>${currentUser.name}</h2>
                <div style="color:var(--text-muted);font-size:14px;margin-bottom:12px;">${currentUser.email}</div>
                <div class="profile-stats">
                    <div class="pstat"><div class="pstat-val">${currentUser.completedJobs||0}</div><div class="pstat-label">Jobs Done</div></div>
                    <div class="pstat"><div class="pstat-val">₹${(currentUser.totalEarned||0).toLocaleString('en-IN')}</div><div class="pstat-label">Earned</div></div>
                    <div class="pstat"><div class="pstat-val">${currentUser.rating||'—'}</div><div class="pstat-label">Rating</div></div>
                    ${currentUser.cvFileName ? `<div class="pstat"><div class="pstat-val" style="font-size:14px;">📄</div><div class="pstat-label">${currentUser.cvFileName}</div></div>` : ''}
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:4px;border-bottom:1px solid var(--border);margin-bottom:24px;" id="profileTabs">
            <button class="nav-link active" style="padding:12px 16px;border-bottom:2px solid var(--accent);" onclick="switchProfileTab('basic',this)">Basic Info</button>
            ${isFL ? `
            <button class="nav-link" style="padding:12px 16px;" onclick="switchProfileTab('skills',this)">Skills & Expertise</button>
            <button class="nav-link" style="padding:12px 16px;" onclick="switchProfileTab('cv',this)">CV & Portfolio</button>
            <button class="nav-link" style="padding:12px 16px;" onclick="switchProfileTab('experience',this)">Experience</button>
            ` : ''}
            <button class="nav-link" style="padding:12px 16px;" onclick="switchProfileTab('security',this)">Security</button>
        </div>

        <!-- Tab Content -->
        <div id="profileTabContent"></div>
    `;

    renderProfileTab('basic');
}

function switchProfileTab(tab, btn) {
    document.querySelectorAll('#profileTabs button').forEach(b => {
        b.classList.remove('active');
        b.style.borderBottom = 'none';
    });
    btn.classList.add('active');
    btn.style.borderBottom = '2px solid var(--accent)';
    renderProfileTab(tab);
}

function renderProfileTab(tab) {
    const c = document.getElementById('profileTabContent');
    const isFL = currentUserType === 'freelancer';

    if (tab === 'basic') {
        c.innerHTML = `
            <div class="card">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="pName" value="${currentUser.name}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="pEmail" value="${currentUser.email}">
                    </div>
                    ${isFL ? `
                    <div class="form-group">
                        <label class="form-label">Professional Title</label>
                        <input type="text" class="form-control" id="pTitle" value="${currentUser.professionalTitle||''}" placeholder="e.g. Full Stack Developer | UI/UX Designer">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Hourly Rate (₹)</label>
                        <input type="number" class="form-control" id="pRate" value="${currentUser.hourlyRate||''}" placeholder="e.g. 1500">
                    </div>
                    ` : `
                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-control" id="pCompany" value="${currentUser.company||''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Website</label>
                        <input type="url" class="form-control" id="pWebsite" value="${currentUser.website||''}" placeholder="https://your-website.com">
                    </div>
                    `}
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-control" id="pLocation" value="${currentUser.location||''}" placeholder="e.g. Mumbai, Maharashtra">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-control" id="pPhone" value="${currentUser.phone||''}" placeholder="+91 98765 43210">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Bio / About Me</label>
                    <textarea class="form-control" id="pBio" rows="5" placeholder="Write a compelling bio that tells clients who you are, what you do, and what makes you stand out. Include your years of experience, key achievements, and the type of projects you love working on...">${currentUser.bio||''}</textarea>
                    <div class="form-hint">A strong bio significantly increases your chances of getting hired. Aim for 150-300 words.</div>
                </div>
                ${isFL ? `
                <div class="form-group">
                    <label class="form-label">Languages</label>
                    <input type="text" class="form-control" id="pLangs" value="${currentUser.languages||'English, Hindi'}" placeholder="e.g. English, Hindi, Tamil">
                </div>
                ` : ''}
                <button class="btn btn-primary" onclick="saveBasicProfile()">Save Changes</button>
            </div>
        `;
    } else if (tab === 'skills') {
        c.innerHTML = `
            <div class="card">
                <h3 style="margin-bottom:6px;">Technical Skills</h3>
                <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px;">Add your skills — press <strong>Enter</strong> or <strong>comma</strong> after each skill</p>
                <div class="skills-container" id="profileSkillsContainer">
                    <input class="skill-input" id="profileSkillInput" placeholder="e.g. React, Python, Figma..." onkeydown="addProfileSkillFromInput(event)">
                </div>
                <div class="form-hint">Popular: JavaScript, Python, React, Node.js, Figma, Flutter, WordPress, SEO, Photoshop</div>

                <div class="section-divider"></div>
                <h3 style="margin-bottom:16px;">Skill Level Overview</h3>
                <div id="skillLevels"></div>
                <div class="form-group" style="margin-top:20px;">
                    <label class="form-label">Expertise Level</label>
                    <select class="form-control" id="pExpertise">
                        <option ${currentUser.expertise==='entry'?'selected':''}>Entry Level</option>
                        <option ${currentUser.expertise==='intermediate'?'selected':''}>Intermediate</option>
                        <option ${currentUser.expertise==='expert'?'selected':''}>Expert</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Years of Experience</label>
                    <select class="form-control" id="pYears">
                        <option>Less than 1 year</option><option>1-2 years</option><option>3-5 years</option><option>5-10 years</option><option>10+ years</option>
                    </select>
                </div>
                <button class="btn btn-primary" style="margin-top:8px;" onclick="saveSkillsProfile()">Save Skills</button>
            </div>
        `;
        renderProfileSkillTags();
        renderSkillLevels();
    } else if (tab === 'cv') {
        c.innerHTML = `
            <div class="card">
                <h3 style="margin-bottom:6px;">Upload Your CV / Resume</h3>
                <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px;">A strong CV helps you win more clients. Supported formats: PDF, DOC, DOCX</p>

                <div class="upload-zone" id="cvDropZone" onclick="document.getElementById('cvFileInput').click()" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="handleCVDrop(event)">
                    <div class="upload-icon">📄</div>
                    <div class="upload-text">Click to upload or drag & drop your CV</div>
                    <div class="upload-hint">PDF, DOC, DOCX up to 10MB</div>
                </div>
                <input type="file" id="cvFileInput" class="hidden" accept=".pdf,.doc,.docx" onchange="handleCVUpload(event)">

                ${currentUser.cvFileName ? `
                    <div class="upload-preview" id="cvPreview">
                        <span class="upload-preview-icon">📄</span>
                        <div class="upload-preview-info">
                            <div class="upload-preview-name">${currentUser.cvFileName}</div>
                            <div class="upload-preview-size">Uploaded successfully ✓</div>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="removeCV()">Remove</button>
                    </div>
                ` : `<div id="cvPreview"></div>`}

                <div class="section-divider"></div>
                <h3 style="margin-bottom:16px;">Portfolio Links</h3>
                <div class="form-group">
                    <label class="form-label">Portfolio Website</label>
                    <input type="url" class="form-control" id="pPortfolioURL" value="${currentUser.portfolioURL||''}" placeholder="https://your-portfolio.com">
                </div>
                <div class="form-group">
                    <label class="form-label">GitHub Profile</label>
                    <input type="url" class="form-control" id="pGithub" value="${currentUser.github||''}" placeholder="https://github.com/username">
                </div>
                <div class="form-group">
                    <label class="form-label">LinkedIn Profile</label>
                    <input type="url" class="form-control" id="pLinkedin" value="${currentUser.linkedin||''}" placeholder="https://linkedin.com/in/username">
                </div>
                <div class="form-group">
                    <label class="form-label">Dribbble / Behance</label>
                    <input type="url" class="form-control" id="pDribbble" value="${currentUser.dribbble||''}" placeholder="https://dribbble.com/username">
                </div>
                <button class="btn btn-primary" onclick="saveCVProfile()">Save Portfolio Links</button>
            </div>
        `;
    } else if (tab === 'experience') {
        const exp = currentUser.experience || [];
        c.innerHTML = `
            <div class="card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <div><h3>Work Experience</h3><p style="color:var(--text-muted);font-size:13px;margin-top:2px;">Add your past work to build trust with clients</p></div>
                    <button class="btn btn-primary btn-sm" onclick="openAddExperience()">+ Add Experience</button>
                </div>
                <div id="expList">
                    ${exp.length ? exp.map((e,i) => `
                        <div style="display:flex;gap:16px;padding:16px;background:var(--secondary);border-radius:var(--radius);margin-bottom:12px;">
                            <div style="width:44px;height:44px;background:var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🏢</div>
                            <div style="flex:1;">
                                <div style="font-weight:700;">${e.role}</div>
                                <div style="color:var(--accent);font-size:13px;">${e.company}</div>
                                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${e.from} – ${e.to||'Present'}</div>
                                <div style="font-size:13px;color:var(--text-muted);margin-top:8px;">${e.desc||''}</div>
                            </div>
                            <button class="btn btn-danger btn-sm" onclick="removeExperience(${i})">✕</button>
                        </div>
                    `).join('') : `<div style="text-align:center;padding:40px;color:var(--text-muted);">No experience added yet</div>`}
                </div>

                <div class="section-divider"></div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <div><h3>Education</h3></div>
                    <button class="btn btn-primary btn-sm" onclick="openAddEducation()">+ Add Education</button>
                </div>
                <div id="eduList">
                    ${(currentUser.education||[]).length ? (currentUser.education||[]).map((e,i) => `
                        <div style="display:flex;gap:16px;padding:16px;background:var(--secondary);border-radius:var(--radius);margin-bottom:12px;">
                            <div style="width:44px;height:44px;background:var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🎓</div>
                            <div style="flex:1;">
                                <div style="font-weight:700;">${e.degree}</div>
                                <div style="color:var(--accent);font-size:13px;">${e.institution}</div>
                                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${e.year}</div>
                            </div>
                            <button class="btn btn-danger btn-sm" onclick="removeEducation(${i})">✕</button>
                        </div>
                    `).join('') : `<div style="text-align:center;padding:40px;color:var(--text-muted);">No education added yet</div>`}
                </div>
            </div>
        `;
    } else if (tab === 'security') {
        c.innerHTML = `
            <div class="card">
                <h3 style="margin-bottom:20px;">Change Password</h3>
                <div class="form-group">
                    <label class="form-label">Current Password</label>
                    <input type="password" class="form-control" id="currPass" placeholder="Your current password">
                </div>
                <div class="form-group">
                    <label class="form-label">New Password</label>
                    <input type="password" class="form-control" id="newPass" placeholder="Min 8 characters">
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm New Password</label>
                    <input type="password" class="form-control" id="confPass" placeholder="Repeat new password">
                </div>
                <button class="btn btn-primary" onclick="changePassword()">Update Password</button>

                <div class="section-divider"></div>
                <h3 style="margin-bottom:16px;">Two-Factor Authentication</h3>
                <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:var(--secondary);border-radius:var(--radius);">
                    <div>
                        <div style="font-weight:600;">SMS Verification</div>
                        <div style="font-size:13px;color:var(--text-muted);margin-top:2px;">Secure your account with SMS OTP</div>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="showNotif('2FA setup coming soon!','info')">Enable</button>
                </div>

                <div class="section-divider"></div>
                <h3 style="margin-bottom:16px;">Danger Zone</h3>
                <div style="border:1px solid rgba(239,68,68,0.3);border-radius:var(--radius);padding:16px;">
                    <div style="font-weight:600;color:var(--danger);margin-bottom:4px;">Delete Account</div>
                    <div style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Permanently delete your account and all data. This cannot be undone.</div>
                    <button class="btn btn-danger btn-sm" onclick="showNotif('Please contact support to delete your account','info')">Delete My Account</button>
                </div>
            </div>
        `;
    }
}

function renderSkillLevels() {
    const c = document.getElementById('skillLevels');
    if (!c) return;
    if (!profileSkillTags.length) { c.innerHTML = '<p style="color:var(--text-muted);font-size:13px;">Add skills above to see them here</p>'; return; }
    c.innerHTML = profileSkillTags.slice(0,6).map(s => `
        <div style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:14px;font-weight:500;">${s}</span>
                <span style="font-size:12px;color:var(--accent);">Expert</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${70+Math.random()*25|0}%"></div></div>
        </div>
    `).join('');
}

function saveBasicProfile() {
    currentUser.name = document.getElementById('pName')?.value || currentUser.name;
    currentUser.email = document.getElementById('pEmail')?.value || currentUser.email;
    currentUser.bio = document.getElementById('pBio')?.value || '';
    currentUser.location = document.getElementById('pLocation')?.value || '';
    currentUser.phone = document.getElementById('pPhone')?.value || '';
    if (currentUserType === 'freelancer') {
        currentUser.professionalTitle = document.getElementById('pTitle')?.value || '';
        currentUser.hourlyRate = document.getElementById('pRate')?.value || '';
        currentUser.languages = document.getElementById('pLangs')?.value || '';
    } else {
        currentUser.company = document.getElementById('pCompany')?.value || '';
        currentUser.website = document.getElementById('pWebsite')?.value || '';
    }
    syncUser(); showNotif('Profile saved! ✅', 'success');
}

function saveSkillsProfile() {
    currentUser.skills = [...profileSkillTags];
    currentUser.expertise = document.getElementById('pExpertise')?.value || '';
    syncUser(); showNotif('Skills updated! ✅', 'success');
    renderSkillLevels();
}

function saveCVProfile() {
    currentUser.portfolioURL = document.getElementById('pPortfolioURL')?.value || '';
    currentUser.github = document.getElementById('pGithub')?.value || '';
    currentUser.linkedin = document.getElementById('pLinkedin')?.value || '';
    currentUser.dribbble = document.getElementById('pDribbble')?.value || '';
    syncUser(); showNotif('Portfolio links saved! ✅', 'success');
}

function changePassword() {
    const curr = document.getElementById('currPass')?.value;
    const newP = document.getElementById('newPass')?.value;
    const conf = document.getElementById('confPass')?.value;
    if (curr !== currentUser.password) { showNotif('Current password is incorrect', 'error'); return; }
    if (newP !== conf) { showNotif('New passwords do not match', 'error'); return; }
    if (newP.length < 8) { showNotif('Password must be at least 8 characters', 'error'); return; }
    currentUser.password = newP;
    syncUser(); showNotif('Password changed successfully! 🔒', 'success');
}

function handleCVUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    processCV(file);
}

function handleCVDrop(e) {
    e.preventDefault();
    document.getElementById('cvDropZone').classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) processCV(file);
}

function processCV(file) {
    if (file.size > 10 * 1024 * 1024) { showNotif('File too large. Max 10MB.', 'error'); return; }
    cvFileName = file.name;
    currentUser.cvFileName = file.name;
    syncUser();
    document.getElementById('cvPreview').innerHTML = `
        <div class="upload-preview">
            <span class="upload-preview-icon">📄</span>
            <div class="upload-preview-info">
                <div class="upload-preview-name">${file.name}</div>
                <div class="upload-preview-size">${(file.size/1024).toFixed(1)} KB · Uploaded successfully ✓</div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeCV()">Remove</button>
        </div>
    `;
    showNotif('CV uploaded successfully! 📄', 'success');
}

function removeCV() {
    currentUser.cvFileName = '';
    cvFileName = '';
    syncUser();
    document.getElementById('cvPreview').innerHTML = '';
    document.getElementById('cvFileInput').value = '';
    showNotif('CV removed', 'info');
}

function openAddExperience() {
    showModal(`
        <div class="modal-title">Add Work Experience</div>
        <div class="modal-sub">Tell clients about your past roles</div>
        <div class="form-group"><label class="form-label">Job Title / Role</label><input type="text" class="form-control" id="expRole" placeholder="e.g. Senior Frontend Developer"></div>
        <div class="form-group"><label class="form-label">Company</label><input type="text" class="form-control" id="expCompany" placeholder="Company name"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group"><label class="form-label">From</label><input type="text" class="form-control" id="expFrom" placeholder="Jan 2020"></div>
            <div class="form-group"><label class="form-label">To</label><input type="text" class="form-control" id="expTo" placeholder="Dec 2022 or Present"></div>
        </div>
        <div class="form-group"><label class="form-label">Description</label><textarea class="form-control" id="expDesc" placeholder="Describe your role and achievements..."></textarea></div>
        <button class="btn btn-primary btn-block" onclick="saveExperience()">Add Experience</button>
    `);
}

function saveExperience() {
    const role = document.getElementById('expRole')?.value.trim();
    const company = document.getElementById('expCompany')?.value.trim();
    if (!role || !company) { showNotif('Please fill required fields', 'error'); return; }
    if (!currentUser.experience) currentUser.experience = [];
    currentUser.experience.push({ role, company, from: document.getElementById('expFrom')?.value, to: document.getElementById('expTo')?.value, desc: document.getElementById('expDesc')?.value });
    syncUser(); closeModal(); showNotif('Experience added!', 'success');
    renderProfileTab('experience');
}

function removeExperience(i) {
    currentUser.experience.splice(i, 1);
    syncUser(); renderProfileTab('experience');
}

function openAddEducation() {
    showModal(`
        <div class="modal-title">Add Education</div>
        <div class="modal-sub">Share your academic background</div>
        <div class="form-group"><label class="form-label">Degree / Certificate</label><input type="text" class="form-control" id="eduDeg" placeholder="e.g. B.Tech Computer Science"></div>
        <div class="form-group"><label class="form-label">Institution</label><input type="text" class="form-control" id="eduInst" placeholder="University / College name"></div>
        <div class="form-group"><label class="form-label">Year</label><input type="text" class="form-control" id="eduYear" placeholder="e.g. 2018 – 2022"></div>
        <button class="btn btn-primary btn-block" onclick="saveEducation()">Add Education</button>
    `);
}

function saveEducation() {
    const degree = document.getElementById('eduDeg')?.value.trim();
    const institution = document.getElementById('eduInst')?.value.trim();
    if (!degree || !institution) { showNotif('Please fill required fields', 'error'); return; }
    if (!currentUser.education) currentUser.education = [];
    currentUser.education.push({ degree, institution, year: document.getElementById('eduYear')?.value });
    syncUser(); closeModal(); showNotif('Education added!', 'success');
    renderProfileTab('experience');
}

function removeEducation(i) {
    currentUser.education.splice(i, 1);
    syncUser(); renderProfileTab('experience');
}

function renderPostJob() {
    const c = document.getElementById('mainContent');
    c.innerHTML = `
        <div class="content-header"><h2>Post a Job</h2><p>Find the right freelancer for your project</p></div>
        <div class="card" style="max-width:760px;">
            <div class="form-group">
                <label class="form-label">Job Title</label>
                <input type="text" class="form-control" id="jTitle" placeholder="e.g. Full Stack Developer for E-commerce Project">
            </div>
            <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-control" id="jCat">
                    <option>Web Development</option><option>Mobile App</option><option>Design</option><option>Writing</option><option>Marketing</option><option>Data Science</option><option>Video</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Project Description</label>
                <textarea class="form-control" id="jDesc" rows="6" placeholder="Describe the project requirements, goals, deliverables, and any technical specifications. Be as detailed as possible to attract the right talent."></textarea>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                <div class="form-group">
                    <label class="form-label">Budget (₹)</label>
                    <input type="text" class="form-control" id="jBudget" placeholder="e.g. ₹25,000 – ₹50,000">
                </div>
                <div class="form-group">
                    <label class="form-label">Project Duration</label>
                    <select class="form-control" id="jDuration">
                        <option>Less than 1 week</option><option>1-2 weeks</option><option>2-4 weeks</option><option>1-3 months</option><option>3+ months</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Required Skills (press Enter)</label>
                <div class="skills-container" id="jobSkillsContainer">
                    <input class="skill-input" id="jobSkillInput" placeholder="e.g. React, Figma, Python..." onkeydown="addJobSkillTag(event)">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Experience Level Required</label>
                <select class="form-control" id="jLevel">
                    <option>Entry Level</option><option>Intermediate</option><option>Expert</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Preferred Freelancer Location</label>
                <select class="form-control" id="jLocation">
                    <option>Anywhere (Remote)</option><option>India Only</option><option>Specific City</option>
                </select>
            </div>
            <button class="btn btn-primary btn-lg" onclick="submitNewJob()">🚀 Post Job</button>
        </div>
    `;
    postJobSkillTags = [];
}

let postJobSkillTags = [];
function addJobSkillTag(e) {
    if (e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();
    const input = document.getElementById('jobSkillInput');
    const val = input.value.trim().replace(/,$/, '');
    if (!val || postJobSkillTags.includes(val)) return;
    postJobSkillTags.push(val);
    const el = document.createElement('span');
    el.className = 'tag tag-accent';
    el.setAttribute('data-val', val);
    el.innerHTML = `${val} <span class="tag-close" onclick="this.parentElement.remove();postJobSkillTags.splice(postJobSkillTags.indexOf('${val}'),1)">✕</span>`;
    document.getElementById('jobSkillsContainer').insertBefore(el, input);
    input.value = '';
}

function submitNewJob() {
    const title = document.getElementById('jTitle')?.value.trim();
    const desc = document.getElementById('jDesc')?.value.trim();
    const budget = document.getElementById('jBudget')?.value.trim();
    if (!title || !desc || !budget) { showNotif('Please fill all required fields', 'error'); return; }
    const job = {
        id: DB.jobs.length + 100,
        title, description: desc, budget,
        company: currentUser.company || currentUser.name,
        category: document.getElementById('jCat')?.value,
        duration: document.getElementById('jDuration')?.value,
        skills: postJobSkillTags.length ? postJobSkillTags : ['General'],
        postedDate: 'Just now',
        employerId: currentUser.id,
        proposals: []
    };
    DB.jobs.unshift(job);
    postJobSkillTags = [];
    showNotif('Job posted! 🎉 Freelancers can now apply.', 'success');
    dashSection('my_jobs');
}

function renderMyJobs() {
    const c = document.getElementById('mainContent');
    const myJobs = DB.jobs.filter(j => j.employerId === currentUser.id);
    c.innerHTML = `
        <div class="content-header">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <div><h2>My Job Postings</h2><p>Manage your posted jobs</p></div>
                <button class="btn btn-primary btn-sm" onclick="dashSection('post_job')">➕ Post New Job</button>
            </div>
        </div>
        <div class="job-list">${myJobs.length ? myJobs.map(j => dashJobCardHTML(j, false)).join('') : `<div class="card" style="text-align:center;padding:60px;"><div style="font-size:48px;margin-bottom:16px;">📋</div><h3>No jobs posted yet</h3><p style="color:var(--text-muted);margin:8px 0 20px;">Post your first job and start receiving proposals</p><button class="btn btn-primary" onclick="dashSection('post_job')">Post a Job</button></div>`}</div>
    `;
}

function renderViewProposals() {
    const c = document.getElementById('mainContent');
    const myJobs = DB.jobs.filter(j => j.employerId === currentUser.id && j.proposals.length > 0);
    const allProps = myJobs.flatMap(j => j.proposals.map(p => ({ ...p, jobTitle: j.title, jobId: j.id })));

    c.innerHTML = `
        <div class="content-header"><h2>Proposals Received</h2><p>Review and respond to freelancer proposals</p></div>
        ${allProps.length ? allProps.map(p => `
            <div class="proposal-card">
                <div class="proposal-header">
                    <div class="proposer-info">
                        <div class="proposer-avatar">${p.freelancerName.charAt(0)}</div>
                        <div>
                            <div class="proposer-name">${p.freelancerName}</div>
                            <div class="proposer-meta">Applied for: <span style="color:var(--accent)">${p.jobTitle}</span></div>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-size:22px;font-weight:800;color:var(--success);">₹${parseInt(p.bidAmount).toLocaleString('en-IN')}</div>
                        <div style="font-size:12px;color:var(--text-muted);">⏱ ${p.deliveryTime}</div>
                    </div>
                </div>
                <div style="background:var(--card-bg);border-radius:var(--radius);padding:14px;margin-bottom:14px;">
                    <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Cover Letter</div>
                    <p style="font-size:14px;line-height:1.6;">${p.coverLetter}</p>
                    ${p.portfolio ? `<div style="margin-top:10px;"><a href="${p.portfolio}" style="color:var(--accent);font-size:13px;" target="_blank">🔗 Portfolio: ${p.portfolio}</a></div>` : ''}
                </div>
                <div style="display:flex;gap:10px;">
                    <button class="btn btn-success btn-sm" onclick="hireFreelancerModal(${p.jobId},'${p.freelancerName}',${p.bidAmount})">✓ Hire & Pay via Escrow</button>
                    <button class="btn btn-secondary btn-sm" onclick="showNotif('Message sent to ${p.freelancerName}!','success')">💬 Message</button>
                    <button class="btn btn-danger btn-sm" onclick="showNotif('Proposal declined.','info')">✕ Decline</button>
                </div>
            </div>
        `).join('') : `<div class="card" style="text-align:center;padding:60px;color:var(--text-muted);">No proposals yet on your jobs.</div>`}
    `;
}

function viewProposalsModal(jobId) {
    const j = DB.jobs.find(x => x.id === jobId);
    showModal(`
        <div class="modal-title">${j.title}</div>
        <div class="modal-sub">${j.proposals.length} proposal${j.proposals.length !== 1 ? 's' : ''} received</div>
        ${j.proposals.length ? j.proposals.map(p => `
            <div class="proposal-card" style="margin-bottom:12px;">
                <div class="proposal-header">
                    <div class="proposer-info">
                        <div class="proposer-avatar" style="width:38px;height:38px;font-size:15px;">${p.freelancerName.charAt(0)}</div>
                        <div><div class="proposer-name">${p.freelancerName}</div></div>
                    </div>
                    <div style="font-size:18px;font-weight:800;color:var(--success);">₹${parseInt(p.bidAmount).toLocaleString('en-IN')}</div>
                </div>
                <p style="font-size:13px;color:var(--text-muted);">${p.coverLetter.substring(0,120)}...</p>
                <div style="display:flex;gap:8px;margin-top:12px;">
                    <button class="btn btn-success btn-sm" onclick="hireFreelancerModal(${jobId},'${p.freelancerName}',${p.bidAmount})">✓ Hire</button>
                    <button class="btn btn-danger btn-sm" onclick="showNotif('Proposal declined','info')">✕ Decline</button>
                </div>
            </div>
        `).join('') : '<p style="text-align:center;padding:30px;color:var(--text-muted);">No proposals yet</p>'}
    `);
}

function hireFreelancerModal(jobId, name, amount) {
    closeModal();
    showModal(`
        <div class="modal-title">🎉 Hire ${name}</div>
        <div class="modal-sub">Complete this hire with secure escrow payment</div>
        <div style="background:var(--secondary);border-radius:var(--radius);padding:20px;margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                <span style="color:var(--text-muted);">Freelancer Payment</span>
                <strong>₹${parseInt(amount).toLocaleString('en-IN')}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
                <span style="color:var(--text-muted);">Platform Fee (5%)</span>
                <strong>₹${Math.round(amount*0.05).toLocaleString('en-IN')}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:10px 0;">
                <strong style="font-size:16px;">Total</strong>
                <strong style="font-size:18px;color:var(--accent);">₹${Math.round(amount*1.05).toLocaleString('en-IN')}</strong>
            </div>
        </div>
        <div class="escrow-timeline">
            <div class="escrow-step active"><div class="escrow-step-dot">💰</div><div class="escrow-step-label">Deposit</div></div>
            <div class="escrow-step"><div class="escrow-step-dot">⚙️</div><div class="escrow-step-label">In Progress</div></div>
            <div class="escrow-step"><div class="escrow-step-dot">✅</div><div class="escrow-step-label">Review</div></div>
            <div class="escrow-step"><div class="escrow-step-dot">🚀</div><div class="escrow-step-label">Released</div></div>
        </div>
        <div class="form-group" style="margin-top:20px;">
            <label class="form-label">Payment Method</label>
            <select class="form-control">
                <option>💳 Credit / Debit Card</option><option>📱 UPI</option><option>🏦 Net Banking</option><option>💵 PayPal</option>
            </select>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="closeModal();showNotif('🎉 ${name} hired! Payment secured in escrow.','success')">🔒 Deposit to Escrow & Hire</button>
        <p style="text-align:center;margin-top:12px;font-size:12px;color:var(--text-muted);">🛡️ Your payment is protected until you approve the work</p>
    `);
}

function syncUser() {
    const users = DB.users;
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) DB.users[idx] = { ...currentUser };
    localStorage.setItem('fh_user', JSON.stringify(currentUser));
}

function showModal(html) {
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function modalOutsideClose(e) {
    if (e.target.id === 'modal') closeModal();
}

function showNotif(msg, type = 'success') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const n = document.createElement('div');
    n.className = `notif ${type}`;
    n.innerHTML = `<span class="notif-icon">${icons[type]||'ℹ️'}</span><div class="notif-content"><strong>${type.charAt(0).toUpperCase()+type.slice(1)}</strong><p>${msg}</p></div>`;
    document.getElementById('notifStack').appendChild(n);
    setTimeout(() => { n.style.opacity='0'; n.style.transform='translateX(400px)'; n.style.transition='all 0.3s'; setTimeout(()=>n.remove(), 300); }, 3500);
}

function calcProfileScore() {
    if (!currentUser) return 0;
    let score = 20; 
    if (currentUser.bio && currentUser.bio.length > 50) score += 15;
    if (currentUser.skills && currentUser.skills.length >= 3) score += 15;
    if (currentUser.cvFileName) score += 15;
    if (currentUser.hourlyRate) score += 10;
    if (currentUser.location) score += 10;
    if (currentUser.experience && currentUser.experience.length > 0) score += 10;
    if (currentUser.portfolioURL) score += 5;
    return Math.min(100, score);
}

function toggleAvailability(el) {
    currentUser.availability = el.checked ? 'available' : 'unavailable';
    syncUser();
    showNotif(el.checked ? '✅ You are now visible to clients' : 'ℹ️ You are now hidden from client searches', el.checked ? 'success' : 'info');
}

function buyConnects() {
    showModal(`
        <div class="modal-title">⚡ Buy Connects</div>
        <div class="modal-sub">Connects are used to submit proposals and boost your visibility</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0;">
            ${[[10,'₹49'],[20,'₹89'],[60,'₹239']].map(([amt,price])=>`
                <div class="boost-option" onclick="purchaseConnects(${amt},this)">
                    <div style="text-align:center;width:100%;">
                        <div style="font-size:28px;font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace;">${amt}</div>
                        <div style="font-size:12px;color:var(--text-muted);margin:4px 0;">Connects</div>
                        <div style="font-size:16px;font-weight:700;color:var(--gold);">${price}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div style="background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.15);border-radius:var(--radius);padding:14px;margin-bottom:20px;font-size:13px;color:var(--text-muted);">
            💡 <strong>How Connects work:</strong> Each proposal costs 2-6 Connects depending on job tier. Boosting a proposal costs extra Connects. Unused Connects roll over for 1 year.
        </div>
        <button class="btn btn-primary btn-block" onclick="closeModal();showNotif('Payment successful! Connects added to your account.','success')">Purchase Selected Pack</button>
    `);
}

function purchaseConnects(amount, el) {
    document.querySelectorAll('.boost-option').forEach(b=>b.classList.remove('selected'));
    el.classList.add('selected');
}

function toggleNotifCentre() {
    let panel = document.getElementById('notifCentre');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'notifCentre';
        panel.className = 'notif-centre';
        panel.innerHTML = buildNotifCentre();
        document.body.appendChild(panel);
    }
    panel.classList.toggle('open');
}

function buildNotifCentre() {
    const notifs = currentUser?.notifications || [];
    const items = notifs.map(n => `
        <div class="notif-item ${n.read?'':'unread'}" onclick="markNotifRead(${n.id})">
            <div style="font-size:20px;">${n.icon||'🔔'}</div>
            <div style="flex:1;">
                <div style="font-size:13px;line-height:1.5;">${n.text}</div>
                <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${n.time}</div>
            </div>
            <div class="notif-dot ${n.read?'read':''}"></div>
        </div>
    `).join('') || '<div style="padding:40px;text-align:center;color:var(--text-muted);">No notifications yet</div>';
    return `
        <div class="notif-centre-header">
            <span>Notifications</span>
            <button class="btn btn-secondary btn-sm" onclick="markAllRead()">Mark all read</button>
        </div>
        <div id="notifItems">${items}</div>
    `;
}

function markNotifRead(id) {
    if (!currentUser.notifications) return;
    const n = currentUser.notifications.find(x=>x.id===id);
    if (n) { n.read = true; syncUser(); }
    const panel = document.getElementById('notifCentre');
    if (panel) panel.innerHTML = buildNotifCentre();
}

function markAllRead() {
    if (!currentUser.notifications) return;
    currentUser.notifications.forEach(n=>n.read=true);
    syncUser();
    const panel = document.getElementById('notifCentre');
    if (panel) panel.innerHTML = buildNotifCentre();
}

function addNotification(text, icon='🔔') {
    if (!currentUser) return;
    if (!currentUser.notifications) currentUser.notifications = [];
    currentUser.notifications.unshift({ id:Date.now(), text, time:'Just now', read:false, icon });
    syncUser();
}

function renderContracts() {
    const c = document.getElementById('mainContent');
    const contracts = currentUser.contracts || [];

    
    const demoContracts = [
        { id:1, title:'E-Commerce React Dashboard', client:'TechStart Solutions', type:'fixed', status:'active', budget:'₹60,000', milestones:[{name:'UI Design',status:'done',amount:'₹15,000'},{name:'Frontend Dev',status:'active',amount:'₹30,000'},{name:'Testing & Deploy',status:'pending',amount:'₹15,000'}], started:'Dec 1, 2025' },
        { id:2, title:'SEO Content Strategy', client:'ByteBlogs Media', type:'hourly', status:'active', rate:'₹1,200/hr', hoursLogged:28, weeklyLimit:20, started:'Nov 15, 2025' },
        { id:3, title:'Logo & Brand Identity', client:'Spice Route Foods', type:'fixed', status:'completed', budget:'₹18,000', milestones:[{name:'Initial Concepts',status:'done',amount:'₹6,000'},{name:'Final Files',status:'done',amount:'₹12,000'}], started:'Oct 10, 2025' },
    ];
    const all = [...demoContracts, ...contracts];

    c.innerHTML = `
        <div class="content-header">
            <h2>Contracts</h2>
            <p>Manage your active and past contracts</p>
        </div>
        <div class="tab-bar">
            <button class="tab-btn active" onclick="filterContracts('all',this)">All (${all.length})</button>
            <button class="tab-btn" onclick="filterContracts('active',this)">Active (${all.filter(c=>c.status==='active').length})</button>
            <button class="tab-btn" onclick="filterContracts('completed',this)">Completed (${all.filter(c=>c.status==='completed').length})</button>
        </div>
        <div id="contractList">
            ${all.map(ct => contractCardHTML(ct)).join('')}
        </div>
    `;
}

function contractCardHTML(ct) {
    return `
    <div class="contract-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
            <div>
                <div style="font-size:17px;font-weight:700;margin-bottom:4px;">${ct.title}</div>
                <div style="font-size:13px;color:var(--text-muted);">🏢 ${ct.client} · Started ${ct.started}</div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <span class="contract-type-pill ${ct.type==='hourly'?'type-hourly':'type-fixed'}">${ct.type==='hourly'?'⏱ Hourly':'📌 Fixed Price'}</span>
                <span class="status-pill status-${ct.status==='active'?'active':'completed'}">${ct.status}</span>
            </div>
        </div>
        ${ct.type==='fixed' && ct.milestones ? `
            <h4 style="font-size:13px;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;">Milestones</h4>
            ${ct.milestones.map(m=>`
                <div class="milestone-item">
                    <div class="milestone-status ms-${m.status}"></div>
                    <div style="flex:1;font-size:14px;font-weight:500;">${m.name}</div>
                    <div style="font-size:13px;font-weight:700;color:var(--accent);">${m.amount}</div>
                    <span class="status-pill status-${m.status==='done'?'completed':m.status==='active'?'active':'pending'}" style="font-size:11px;">${m.status}</span>
                </div>
            `).join('')}
        ` : ct.type==='hourly' ? `
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                <div style="background:var(--secondary);border-radius:var(--radius);padding:14px;text-align:center;">
                    <div style="font-size:20px;font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace;">${ct.hoursLogged}</div>
                    <div style="font-size:12px;color:var(--text-muted);">Hours Logged</div>
                </div>
                <div style="background:var(--secondary);border-radius:var(--radius);padding:14px;text-align:center;">
                    <div style="font-size:20px;font-weight:800;color:var(--gold);font-family:'JetBrains Mono',monospace;">${ct.weeklyLimit}</div>
                    <div style="font-size:12px;color:var(--text-muted);">Weekly Limit (hrs)</div>
                </div>
                <div style="background:var(--secondary);border-radius:var(--radius);padding:14px;text-align:center;">
                    <div style="font-size:14px;font-weight:700;color:var(--success);">${ct.rate}</div>
                    <div style="font-size:12px;color:var(--text-muted);">Rate</div>
                </div>
            </div>
        ` : ''}
        <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;">
            ${ct.status==='active' ? `
                <button class="btn btn-primary btn-sm" onclick="dashSection('messages')">💬 Message Client</button>
                <button class="btn btn-secondary btn-sm" onclick="showContractActions(${ct.id})">⋯ More Actions</button>
                ${ct.type==='fixed' ? `<button class="btn btn-success btn-sm" onclick="showNotif('Milestone marked complete! Awaiting client approval.','success')">✓ Submit Milestone</button>` : `<button class="btn btn-secondary btn-sm" onclick="dashSection('time_tracker')">⏱ Log Time</button>`}
            ` : `
                <button class="btn btn-outline btn-sm" onclick="showContractReview(${ct.id})">⭐ Leave Review</button>
                <button class="btn btn-secondary btn-sm" onclick="showNotif('Re-hire request sent!','success')">🔄 Re-hire</button>
            `}
        </div>
    </div>`;
}

function filterContracts(status, btn) {
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    
    showNotif('Filtered to: ' + status, 'info');
}

function showContractActions(id) {
    showModal(`
        <div class="modal-title">Contract Actions</div>
        <div class="modal-sub">Manage this contract</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px;">
            <button class="btn btn-secondary btn-block" onclick="closeModal();showNotif('Change request submitted','success')">📋 Request Change Order</button>
            <button class="btn btn-secondary btn-block" onclick="closeModal();openDispute()">⚠️ Open Dispute</button>
            <button class="btn btn-secondary btn-block" onclick="closeModal();showNotif('End contract request sent to client','info')">🔚 End Contract</button>
        </div>
    `);
}

function showContractReview(id) {
    let selectedStars = 5;
    showModal(`
        <div class="modal-title">⭐ Leave a Review</div>
        <div class="modal-sub">Share your experience working with this client</div>
        <div style="margin:20px 0;">
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:10px;">Overall Experience</div>
            <div class="rating-stars" id="reviewStars">
                ${[1,2,3,4,5].map(n=>`<span class="star ${n<=5?'active':''}" onclick="selectReviewStar(${n})" style="font-size:32px;cursor:pointer;color:${n<=5?'var(--gold)':'var(--border-light)'};">★</span>`).join('')}
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Your Review</label>
            <textarea class="form-control" id="reviewText" rows="4" placeholder="Share details about your experience working together..."></textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Skills demonstrated</label>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
                ${['Communication','Quality Work','Expertise','Deadlines','Professionalism'].map(s=>`<span class="tag" style="cursor:pointer;" onclick="this.classList.toggle('tag-accent')">${s}</span>`).join('')}
            </div>
        </div>
        <button class="btn btn-primary btn-block" onclick="submitContractReview()">Submit Review</button>
    `);
}

function submitContractReview() {
    currentUser.jss = Math.min(100, (currentUser.jss || 0) + 8);
    syncUser();
    closeModal();
    showNotif('Review submitted! Your JSS has been updated. ⭐', 'success');
}

function selectReviewStar(n) {
    const stars = document.querySelectorAll('#reviewStars .star');
    stars.forEach((s,i) => { s.style.color = i<n ? 'var(--gold)' : 'var(--border-light)'; });
}

let timerRunning = false, timerSeconds = 0, timerInterval = null;

function renderTimeTracker() {
    const c = document.getElementById('mainContent');
    c.innerHTML = `
        <div class="content-header">
            <h2>Time Tracker</h2>
            <p>Track billable hours for your hourly contracts</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
            <div class="time-tracker">
                <div style="text-align:center;margin-bottom:10px;">
                    <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">Active Contract</div>
                    <select class="form-control" style="max-width:300px;margin:0 auto;" id="trackerContract">
                        <option>SEO Content Strategy – ByteBlogs Media</option>
                        <option>Select a contract...</option>
                    </select>
                </div>
                <div class="tracker-display" id="trackerDisplay">00:00:00</div>
                <div class="tracker-controls">
                    <button class="btn btn-primary" id="trackerPlayBtn" onclick="toggleTimer()">▶ Start</button>
                    <button class="btn btn-secondary" onclick="resetTimer()">↺ Reset</button>
                    <button class="btn btn-success" onclick="logTime()">💾 Log Time</button>
                </div>
                <div style="text-align:center;margin-top:12px;font-size:12px;color:var(--text-muted);">Weekly: <strong style="color:var(--accent);">28 hrs</strong> / 20 hr limit</div>
            </div>
            <div class="card">
                <h3 style="margin-bottom:16px;">This Week's Log</h3>
                ${['Mon','Tue','Wed','Thu','Fri'].map((d,i)=>`
                    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
                        <span style="font-size:13px;color:var(--text-muted);width:30px;">${d}</span>
                        <div style="flex:1;background:var(--border);border-radius:4px;height:8px;overflow:hidden;">
                            <div style="height:100%;background:var(--accent);width:${[75,100,60,90,40][i]}%;border-radius:4px;"></div>
                        </div>
                        <span style="font-size:13px;font-weight:600;width:40px;text-align:right;">${[6,8,4.5,7,2.5][i]}h</span>
                    </div>
                `).join('')}
                <div style="display:flex;justify-content:space-between;padding-top:12px;font-weight:700;">
                    <span>Total</span><span style="color:var(--accent);">28h</span>
                </div>
            </div>
        </div>
        <div class="card">
            <h3 style="margin-bottom:16px;">📋 Work Diary</h3>
            <p style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">Screenshots and activity log are recorded when the tracker is running (simulated)</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;">
                ${[...Array(6)].map((_,i)=>`
                    <div style="background:var(--secondary);border-radius:var(--radius);padding:12px;text-align:center;border:1px solid var(--border);">
                        <div style="font-size:32px;margin-bottom:6px;">🖥️</div>
                        <div style="font-size:11px;color:var(--text-muted);">${['10:00 AM','10:20 AM','10:40 AM','11:00 AM','11:20 AM','11:40 AM'][i]}</div>
                        <div style="font-size:11px;color:var(--success);margin-top:2px;">${[82,94,78,90,88,76][i]}% activity</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function toggleTimer() {
    const btn = document.getElementById('trackerPlayBtn');
    const display = document.getElementById('trackerDisplay');
    if (!timerRunning) {
        timerRunning = true;
        btn.textContent = '⏸ Pause';
        btn.className = 'btn btn-secondary';
        timerInterval = setInterval(() => {
            timerSeconds++;
            const h = String(Math.floor(timerSeconds/3600)).padStart(2,'0');
            const m = String(Math.floor((timerSeconds%3600)/60)).padStart(2,'0');
            const s = String(timerSeconds%60).padStart(2,'0');
            if (display) display.textContent = `${h}:${m}:${s}`;
        }, 1000);
    } else {
        timerRunning = false;
        clearInterval(timerInterval);
        if (btn) { btn.textContent = '▶ Resume'; btn.className = 'btn btn-primary'; }
    }
}

function resetTimer() { clearInterval(timerInterval); timerRunning = false; timerSeconds = 0; const d=document.getElementById('trackerDisplay'); if(d) d.textContent='00:00:00'; const b=document.getElementById('trackerPlayBtn'); if(b){b.textContent='▶ Start';b.className='btn btn-primary';} }
function logTime() { showNotif(`${Math.floor(timerSeconds/3600)}h ${Math.floor((timerSeconds%3600)/60)}m logged to your contract ✅`, 'success'); resetTimer(); }

function renderTalentSearch() {
    const c = document.getElementById('mainContent');
    const talents = [
        { name:'Priya Sharma',    title:'Full Stack Developer',        rate:'₹2,500/hr', jss:98, jobs:47, earned:'₹8.5L+', skills:['React','Node.js','MongoDB'],   level:'Top Rated', avail:true  },
        { name:'Arjun Reddy',     title:'UI/UX Designer',               rate:'₹1,800/hr', jss:95, jobs:63, earned:'₹6.2L+', skills:['Figma','UI/UX','Prototyping'], level:'Top Rated', avail:true  },
        { name:'Aakash Gupta',    title:'Next.js & React Expert',       rate:'₹3,200/hr', jss:100,jobs:29, earned:'₹12L+',  skills:['Next.js','TypeScript','AWS'],  level:'Expert',    avail:false },
        { name:'Anjali Singh',    title:'SEO & Digital Marketing',      rate:'₹1,200/hr', jss:92, jobs:81, earned:'₹4.1L+', skills:['SEO','Google Ads','Analytics']  ,level:'Top Rated', avail:true  },
        { name:'Neha Patel',      title:'Motion Graphics Designer',     rate:'₹2,100/hr', jss:97, jobs:34, earned:'₹5.8L+', skills:['After Effects','Premiere','2D'],level:'Top Rated', avail:true  },
        { name:'Dev Malhotra',    title:'Blockchain / Web3 Developer',  rate:'₹4,500/hr', jss:93, jobs:18, earned:'₹9.3L+', skills:['Solidity','Ethereum','React'],  level:'Expert',    avail:false },
        { name:'Pooja Menon',     title:'ML / Data Science Engineer',   rate:'₹3,800/hr', jss:96, jobs:22, earned:'₹7.6L+', skills:['Python','TensorFlow','NLP'],    level:'Expert',    avail:true  },
        { name:'Rahul Verma',     title:'Brand & Logo Designer',        rate:'₹1,500/hr', jss:94, jobs:112,earned:'₹5.2L+', skills:['Illustrator','Branding','Logo'],level:'Top Rated', avail:true  },
        { name:'Karan Mehta',     title:'Content Writer & Copywriter',  rate:'₹800/hr',   jss:90, jobs:203,earned:'₹3.8L+', skills:['Copywriting','SEO','Blog'],     level:'Top Rated', avail:true  },
        { name:'Vikram Nair',     title:'React Native Mobile Dev',      rate:'₹2,800/hr', jss:91, jobs:31, earned:'₹6.0L+', skills:['React Native','iOS','Android'],  level:'Top Rated', avail:false },
        { name:'Zara Ahmed',      title:'AI / LLM Engineer',            rate:'₹5,500/hr', jss:99, jobs:12, earned:'₹15L+',  skills:['GPT-4','LangChain','Python'],    level:'Expert',    avail:true  },
        { name:'Simran Kaur',     title:'Flutter Developer',            rate:'₹2,200/hr', jss:89, jobs:24, earned:'₹4.5L+', skills:['Flutter','Dart','Firebase'],     level:'Rising',    avail:true  },
    ];

    c.innerHTML = `
        <div class="content-header">
            <h2>Find Talent</h2>
            <p>Discover ${talents.length}+ vetted professionals ready to work</p>
        </div>
        <div class="search-bar">
            <div class="search-input-wrap" style="flex:2;">
                <span class="search-icon">🔍</span>
                <input type="text" class="form-control" placeholder="Search by skill, name, or title..." id="talentSearch" oninput="filterTalent()">
            </div>
            <select class="filter-btn" id="talentLevel" onchange="filterTalent()">
                <option value="">All Levels</option>
                <option value="Top Rated">Top Rated</option>
                <option value="Expert">Expert Vetted</option>
                <option value="Rising">Rising Talent</option>
            </select>
            <select class="filter-btn" id="talentAvail" onchange="filterTalent()">
                <option value="">Any Availability</option>
                <option value="available">Available Now</option>
            </select>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;" id="talentGrid">
            ${talents.map((t,i) => talentCardHTML(t,i)).join('')}
        </div>
    `;
    window._talents = talents;
}

function talentCardHTML(t, i) {
    const badge = t.level==='Expert' ? 'badge-expert' : t.level==='Rising' ? 'badge-rising' : 'badge-top-rated';
    const isShortlisted = currentUser?.shortlisted?.includes(i);
    return `
    <div class="talent-card" id="talent-${i}">
        <div class="talent-header">
            <div class="talent-avatar-lg">${t.name.charAt(0)}</div>
            <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                    <div class="talent-name">${t.name}</div>
                    <button class="btn btn-sm" style="background:${isShortlisted?'rgba(245,158,11,0.15)':'var(--border)'};color:${isShortlisted?'var(--gold)':'var(--text-muted)'};padding:4px 8px;" onclick="toggleShortlist(${i})">${isShortlisted?'★ Saved':'☆ Save'}</button>
                </div>
                <div class="talent-title">${t.title}</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <span class="talent-badge ${badge}">${t.level==='Expert'?'🏆 ':t.level==='Rising'?'🚀 ':'⭐ '}${t.level}</span>
                    ${t.avail ? '<span class="talent-badge badge-verified">● Available</span>' : '<span style="font-size:11px;color:var(--text-muted);">Not available</span>'}
                </div>
            </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">${t.skills.map(s=>`<span class="tag" style="font-size:11px;">${s}</span>`).join('')}</div>
        <div class="talent-stats">
            <div class="talent-stat-item">⭐ <strong>${t.jss}%</strong> JSS</div>
            <div class="talent-stat-item">📋 <strong>${t.jobs}</strong> jobs</div>
            <div class="talent-stat-item">💰 <strong>${t.earned}</strong> earned</div>
            <div class="talent-stat-item" style="margin-left:auto;font-weight:700;color:var(--accent);">${t.rate}</div>
        </div>
        <div style="display:flex;gap:8px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border);">
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="inviteToJob('${t.name}')">Invite to Job</button>
            <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="dashSection('messages')">Message</button>
        </div>
    </div>`;
}

function filterTalent() {
    const search = document.getElementById('talentSearch')?.value.toLowerCase()||'';
    const level = document.getElementById('talentLevel')?.value||'';
    const avail = document.getElementById('talentAvail')?.value||'';
    const talents = window._talents || [];
    let filtered = [...talents];
    if (search) filtered = filtered.filter(t => t.name.toLowerCase().includes(search) || t.title.toLowerCase().includes(search) || t.skills.some(s=>s.toLowerCase().includes(search)));
    if (level) filtered = filtered.filter(t => t.level === level);
    if (avail === 'available') filtered = filtered.filter(t => t.avail);
    document.getElementById('talentGrid').innerHTML = filtered.map((t,i) => talentCardHTML(t,i)).join('') || '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px;">No talent found matching your criteria.</p>';
}

function toggleShortlist(i) {
    if (!currentUser.shortlisted) currentUser.shortlisted = [];
    const idx = currentUser.shortlisted.indexOf(i);
    if (idx===-1) { currentUser.shortlisted.push(i); showNotif('Talent saved to shortlist ★', 'success'); }
    else { currentUser.shortlisted.splice(idx,1); showNotif('Removed from shortlist', 'info'); }
    syncUser();
    filterTalent();
}

function inviteToJob(name) {
    showModal(`
        <div class="modal-title">📨 Invite ${name} to a Job</div>
        <div class="modal-sub">Send a personalised invitation to this freelancer</div>
        <div class="form-group">
            <label class="form-label">Select Job Post</label>
            <select class="form-control" id="inviteJob">
                ${DB.jobs.filter(j=>j.employerId===currentUser?.id).map(j=>`<option>${j.title}</option>`).join('') || '<option>No active jobs — post a job first</option>'}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Personal Message</label>
            <textarea class="form-control" rows="4" placeholder="Hi! I came across your profile and think you'd be a great fit for our project..."></textarea>
        </div>
        <button class="btn btn-primary btn-block" onclick="closeModal();showNotif('Invitation sent to ${name}! ✉️','success')">Send Invitation</button>
    `);
}

function renderMembership() {
    const c = document.getElementById('mainContent');
    const isFL = currentUserType === 'freelancer';
    c.innerHTML = `
        <div class="content-header">
            <h2>Membership Plans</h2>
            <p>${isFL ? 'Upgrade to get more Connects, visibility, and AI tools' : 'Upgrade for advanced hiring tools and expert talent access'}</p>
        </div>

        ${isFL ? `
        <!-- Freelancer Plans -->
        <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:32px;">
            <div class="plan-card ${currentUser.membershipPlan==='basic'?'':''}">
                <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Basic</div>
                <div class="plan-price">Free<span></span></div>
                <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px;">Get started with freelancing on FreelanceHub</p>
                ${[['10 free Connects/month',true],['2-6 Connects per proposal',true],['Public profile',true],['Apply to jobs',true],['AI Job Matching',true],['Proposal Insights',false],['Profile boost',false],['Claude AI (limited)',false]].map(([f,a])=>`<div class="plan-feature"><span class="${a?'plan-check':'plan-cross'}">${a?'✓':'✗'}</span><span style="${!a?'color:var(--text-muted);':''}">${f}</span></div>`).join('')}
                <button class="btn btn-secondary btn-block" style="margin-top:20px;" ${currentUser.membershipPlan==='basic'?'disabled':''} onclick="showNotif('You are on the Basic plan','info')">${currentUser.membershipPlan==='basic'?'Current Plan':'Downgrade'}</button>
            </div>
            <div class="plan-card featured">
                <div style="font-size:13px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Freelancer Plus</div>
                <div class="plan-price">₹1,499<span>/month</span></div>
                <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px;">For serious freelancers who want to win more work</p>
                ${[['80 Connects/month',true],['Proposal Insights (see competitor bids)',true],['Boosted profile visibility',true],['Keep profile active when unavailable',true],['Claude AI — unlimited access',true],['0% service fee on Direct Contracts',true],['Priority customer support',true],['Annual: 20% discount on Microsoft 365',true]].map(([f,a])=>`<div class="plan-feature"><span class="${a?'plan-check':'plan-cross'}">${a?'✓':'✗'}</span><span>${f}</span></div>`).join('')}
                <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="upgradePlan('plus')">${currentUser.membershipPlan==='plus'?'✓ Current Plan':'Upgrade to Plus'}</button>
            </div>
        </div>

        <!-- Connects section -->
        <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <h3>Your Connects Balance</h3>
                <span class="connects-pill">⚡ ${currentUser.connects||10} Connects</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:16px;">
                ${[[10,'₹49'],[20,'₹89'],[40,'₹159'],[60,'₹229']].map(([amt,price])=>`
                    <div style="background:var(--secondary);border:1px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'" onclick="addConnectsPack(${amt})">
                        <div style="font-size:24px;font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace;">${amt}</div>
                        <div style="font-size:12px;color:var(--text-muted);margin:4px 0;">Connects</div>
                        <div style="font-size:16px;font-weight:700;color:var(--gold);">${price}</div>
                    </div>
                `).join('')}
            </div>
            <p style="font-size:12px;color:var(--text-muted);">Connects are used to submit proposals (2-6 per job). Boost a proposal to the top by spending extra Connects. Unused Connects roll over for 12 months.</p>
        </div>

        <!-- Boost Profile -->
        <div class="card">
            <h3 style="margin-bottom:8px;">🚀 Boost Your Profile</h3>
            <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px;">Appear at the top of client searches and get 3x more profile views</p>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                ${[['7 days','₹299','8 Connects'],['14 days','₹549','15 Connects'],['30 days','₹999','28 Connects']].map(([d,p,conn])=>`
                    <div class="boost-option" onclick="boostProfile('${d}',this)">
                        <div>
                            <div style="font-weight:700;">${d}</div>
                            <div style="color:var(--accent);font-size:16px;font-weight:800;">${p}</div>
                            <div style="font-size:12px;color:var(--text-muted);">or ${conn}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : `
        <!-- Client / Employer Plans -->
        <div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:32px;">
            ${[
                {name:'Basic',price:'Free',features:[['Post up to 3 jobs/month',true],['Review proposals',true],['Basic search',true],['Escrow protection',true],['Report & analytics',false],['Expert-Vetted talent',false],['Dedicated support',false]],btn:'Current Plan',plan:'basic'},
                {name:'Business Plus',price:'₹7,999/mo',features:[['Unlimited job posts',true],['Expert-Vetted talent access',true],['AI proposal comparison (Uma)',true],['Advanced analytics dashboard',true],['24/7 priority support',true],['Net-30 payment terms',true],['Team collaboration tools',true]],btn:'Upgrade',plan:'business'},
                {name:'Enterprise',price:'Custom',features:[['Everything in Business Plus',true],['Dedicated account manager',true],['Custom contracts & compliance',true],['Consolidated billing',true],['API access',true],['SSO / SAML login',true],['Upwork Managed Services',true]],btn:'Contact Sales',plan:'enterprise'},
            ].map(p=>`
                <div class="plan-card ${p.plan==='business'?'featured':''}">
                    <div style="font-size:13px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${p.name}</div>
                    <div class="plan-price">${p.price}<span>${p.price==='Custom'?'':'/month'}</span></div>
                    <div style="height:1px;background:var(--border);margin:16px 0;"></div>
                    ${p.features.map(([f,a])=>`<div class="plan-feature"><span class="${a?'plan-check':'plan-cross'}">${a?'✓':'✗'}</span><span style="${!a?'color:var(--text-muted);':''}">${f}</span></div>`).join('')}
                    <button class="btn ${p.plan==='business'?'btn-primary':'btn-secondary'} btn-block" style="margin-top:20px;" onclick="upgradePlan('${p.plan}')">${p.btn}</button>
                </div>
            `).join('')}
        </div>
        `}
    `;
}

function upgradePlan(plan) {
    if (plan === 'enterprise') { showNotif('Our sales team will contact you within 24 hours.', 'success'); return; }
    currentUser.membershipPlan = plan;
    if (plan === 'plus') { currentUser.connects = (currentUser.connects||10) + 80; }
    syncUser();
    closeModal();
    showNotif('Plan upgraded! Welcome to ' + (plan==='plus'?'Freelancer Plus':'Business Plus') + ' 🎉', 'success');
    renderMembership();
}

function addConnectsPack(amount) {
    currentUser.connects = (currentUser.connects||10) + amount;
    syncUser();
    updateNavForUser();
    showNotif(`${amount} Connects added! New balance: ${currentUser.connects} ⚡`, 'success');
}

function boostProfile(days, el) {
    document.querySelectorAll('.boost-option').forEach(b=>b.classList.remove('selected'));
    el.classList.add('selected');
    currentUser.boostedProfile = true;
    syncUser();
    showNotif(`Profile boosted for ${days}! You will appear at the top of search results. 🚀`, 'success');
}

function renderCalendar() {
    const c = document.getElementById('mainContent');
    const now = new Date();
    const year = now.getFullYear(), month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const meetings = [
        { day:8,  title:'Project kickoff call',   time:'10:00 AM', client:'TechStart Solutions' },
        { day:12, title:'Design review meeting',  time:'2:00 PM',  client:'DigitalCraft'        },
        { day:18, title:'Final delivery handoff', time:'11:00 AM', client:'ByteBlogs Media'      },
        { day:22, title:'Client onboarding',      time:'3:00 PM',  client:'QuickCart India'      },
    ];
    const eventDays = meetings.map(m=>m.day);

    c.innerHTML = `
        <div class="content-header">
            <h2>Calendar & Meetings</h2>
            <p>Schedule and manage client meetings</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 340px;gap:20px;">
            <div class="card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <h3>${monthNames[month]} ${year}</h3>
                    <div style="display:flex;gap:8px;">
                        <button class="btn btn-secondary btn-sm">‹</button>
                        <button class="btn btn-secondary btn-sm">›</button>
                    </div>
                </div>
                <div class="cal-grid" style="margin-bottom:8px;">
                    ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div style="text-align:center;font-size:11px;font-weight:700;color:var(--text-muted);padding:4px 0;">${d}</div>`).join('')}
                </div>
                <div class="cal-grid">
                    ${[...Array(firstDay)].map(()=>`<div class="cal-day other-month"></div>`).join('')}
                    ${[...Array(daysInMonth)].map((_,i)=>{
                        const day = i+1;
                        const isToday = day===now.getDate();
                        const hasEvent = eventDays.includes(day);
                        return `<div class="cal-day ${isToday?'today':''} ${hasEvent?'has-event':''}" onclick="showDayEvents(${day})">${day}</div>`;
                    }).join('')}
                </div>
            </div>
            <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
                    <h3>Upcoming Meetings</h3>
                    <button class="btn btn-primary btn-sm" onclick="scheduleMeeting()">+ Schedule</button>
                </div>
                ${meetings.map(m=>`
                    <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:10px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'" onclick="viewMeeting('${m.title}')">
                        <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${m.title}</div>
                        <div style="font-size:12px;color:var(--text-muted);">📅 ${monthNames[month]} ${m.day} · ${m.time}</div>
                        <div style="font-size:12px;color:var(--accent);margin-top:4px;">🏢 ${m.client}</div>
                    </div>
                `).join('')}
                <div class="section-divider"></div>
                <div style="background:var(--secondary);border-radius:var(--radius);padding:16px;">
                    <div style="font-size:13px;font-weight:600;margin-bottom:8px;">📱 Connect Calendar</div>
                    <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">Sync with Google Calendar or Outlook to manage meetings seamlessly</div>
                    <button class="btn btn-secondary btn-sm btn-block" onclick="showNotif('Calendar sync coming soon!','info')">🔗 Connect Google Calendar</button>
                </div>
            </div>
        </div>
    `;
}

function scheduleMeeting() {
    showModal(`
        <div class="modal-title">📅 Schedule a Meeting</div>
        <div class="modal-sub">Set up a video call or consultation with a client</div>
        <div class="form-group"><label class="form-label">Meeting Title</label><input type="text" class="form-control" placeholder="e.g. Project Kickoff Call"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group"><label class="form-label">Date</label><input type="date" class="form-control"></div>
            <div class="form-group"><label class="form-label">Time</label><input type="time" class="form-control"></div>
        </div>
        <div class="form-group"><label class="form-label">Invite Client / Freelancer</label><input type="text" class="form-control" placeholder="Enter name or email..."></div>
        <div class="form-group">
            <label class="form-label">Platform</label>
            <select class="form-control">
                <option>FreelanceHub Video Call</option><option>Google Meet</option><option>Zoom</option><option>Microsoft Teams</option>
            </select>
        </div>
        <div class="form-group"><label class="form-label">Agenda (optional)</label><textarea class="form-control" rows="3" placeholder="Topics to discuss..."></textarea></div>
        <button class="btn btn-primary btn-block" onclick="closeModal();showNotif('Meeting scheduled! Invite sent to client. 📅','success')">Schedule Meeting</button>
    `);
}

function showDayEvents(day) { showNotif(`Viewing events for day ${day}`, 'info'); }
function viewMeeting(title) { showNotif(`Opening: ${title}`, 'info'); }

function renderReviews() {
    const c = document.getElementById('mainContent');
    const jss = currentUser.jss || 0;
    c.innerHTML = `
        <div class="content-header">
            <h2>Reviews & Job Success Score</h2>
            <p>Your reputation on FreelanceHub</p>
        </div>

        <!-- JSS Panel -->
        <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;gap:32px;align-items:center;flex-wrap:wrap;">
                <div style="text-align:center;">
                    <div class="jss-ring" style="width:100px;height:100px;">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" stroke-width="8"/>
                            <circle cx="50" cy="50" r="42" fill="none" stroke="${jss>=90?'var(--success)':jss>=70?'var(--gold)':'var(--danger)'}" stroke-width="8" stroke-dasharray="${jss*2.639} 263.9" stroke-linecap="round" style="transform:rotate(-90deg);transform-origin:center;"/>
                        </svg>
                        <span style="font-size:24px;font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace;">${jss}%</span>
                    </div>
                    <div class="jss-label" style="font-size:13px;margin-top:8px;font-weight:600;">Job Success Score</div>
                    <div style="font-size:12px;color:${jss>=90?'var(--success)':jss>=70?'var(--gold)':'var(--danger)'};margin-top:4px;">${jss>=90?'Excellent':'jss'>=70?'Good':'Needs Improvement'}</div>
                </div>
                <div style="flex:1;">
                    <h4 style="margin-bottom:12px;">What affects your JSS?</h4>
                    ${[
                        ['Contract outcomes (client feedback)', 40, jss>=50?'var(--success)':'var(--danger)'],
                        ['Long-term client relationships', 25, jss>=30?'var(--success)':'var(--warning)'],
                        ['No activity in past 12 months', 20, 'var(--border-light)'],
                        ['Contracts ended without feedback', 15, 'var(--warning)'],
                    ].map(([label,pct,color])=>`
                        <div style="margin-bottom:12px;">
                            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                                <span>${label}</span><span style="color:var(--text-muted);">${pct}% weight</span>
                            </div>
                            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color};"></div></div>
                        </div>
                    `).join('')}
                </div>
                <div style="background:var(--secondary);border-radius:var(--radius);padding:20px;min-width:180px;">
                    <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">Rating Overview</div>
                    ${[5,4,3,2,1].map(n=>`
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                            <span style="font-size:12px;color:var(--gold);">${'★'.repeat(n)}</span>
                            <div class="progress-bar" style="flex:1;"><div class="progress-fill" style="width:${n===5?80:n===4?12:4}%;"></div></div>
                            <span style="font-size:11px;color:var(--text-muted);">${n===5?'80%':n===4?'12%':'4%'}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Tips to improve JSS -->
        <div class="card" style="margin-bottom:24px;background:linear-gradient(135deg,rgba(0,212,170,0.05),rgba(124,58,237,0.05));border-color:rgba(0,212,170,0.15);">
            <h3 style="margin-bottom:12px;">💡 Tips to Improve Your JSS</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
                ${['Complete contracts successfully rather than abandoning them','Communicate proactively — clients rate communication highly','Set realistic deadlines and meet them consistently','Ask satisfied clients to leave detailed positive reviews','Maintain a 95%+ on-time delivery rate for top scores'].map(tip=>`
                    <div style="display:flex;gap:10px;font-size:13px;color:var(--text-muted);">
                        <span style="color:var(--accent);flex-shrink:0;">✓</span>${tip}
                    </div>
                `).join('')}
            </div>
        </div>

        <div style="text-align:center;padding:60px;color:var(--text-muted);background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius-lg);">
            <div style="font-size:48px;margin-bottom:16px;">⭐</div>
            <h3>No reviews yet</h3>
            <p style="margin-top:8px;">Complete your first contract to start building your reputation</p>
            <button class="btn btn-primary" style="margin-top:16px;" onclick="dashSection('browse_jobs')">Find Work →</button>
        </div>
    `;
}

function openDispute() {
    showModal(`
        <div class="modal-title">⚠️ Open a Dispute</div>
        <div class="modal-sub">FreelanceHub will mediate to resolve the issue fairly</div>
        <div style="margin-bottom:20px;">
            <div class="dispute-step"><div class="dispute-num">1</div><div><strong>Submit Dispute</strong><p style="font-size:13px;color:var(--text-muted);margin-top:2px;">Describe the issue clearly with evidence</p></div></div>
            <div class="dispute-step"><div class="dispute-num">2</div><div><strong>Response Period</strong><p style="font-size:13px;color:var(--text-muted);margin-top:2px;">Other party has 5 days to respond</p></div></div>
            <div class="dispute-step"><div class="dispute-num">3</div><div><strong>Mediation</strong><p style="font-size:13px;color:var(--text-muted);margin-top:2px;">FreelanceHub reviews evidence and mediates</p></div></div>
            <div class="dispute-step"><div class="dispute-num">4</div><div><strong>Resolution</strong><p style="font-size:13px;color:var(--text-muted);margin-top:2px;">Decision made within 5-7 business days</p></div></div>
        </div>
        <div class="form-group">
            <label class="form-label">Reason for Dispute</label>
            <select class="form-control">
                <option>Work not delivered as described</option>
                <option>Payment not released after approval</option>
                <option>Missed deadline without communication</option>
                <option>Quality below agreed standards</option>
                <option>Contract terms violated</option>
                <option>Other</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="4" placeholder="Explain the issue in detail. Include timeline, communications, and what resolution you're seeking..."></textarea>
        </div>
        <button class="btn btn-primary btn-block" onclick="closeModal();showNotif('Dispute submitted. Our team will review within 24 hours.','success')">Submit Dispute</button>
    `);
}

function renderReferral() {
    const c = document.getElementById('mainContent');
    const code = currentUser.referralCode || 'FH' + currentUser.id.toString().slice(-6);
    c.innerHTML = `
        <div class="content-header">
            <h2>Refer & Earn</h2>
            <p>Earn rewards by inviting friends to FreelanceHub</p>
        </div>
        <div class="referral-box" style="margin-bottom:24px;">
            <div style="font-size:48px;margin-bottom:12px;">🎁</div>
            <h3 style="font-size:22px;margin-bottom:8px;">Invite friends, earn together</h3>
            <p style="color:var(--text-muted);font-size:14px;margin-bottom:20px;">For every friend who joins and completes their first contract, you both earn ₹500 in platform credits</p>
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">Your unique referral code</div>
            <div class="referral-code" onclick="copyReferralCode('${code}')" title="Click to copy">${code}</div>
            <div style="font-size:12px;color:var(--text-muted);">Click to copy</div>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="copyReferralCode('${code}')">📋 Copy Code</button>
                <button class="btn btn-secondary" onclick="shareReferral()">📤 Share Link</button>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
            <div class="stat-card"><div class="stat-value">0</div><div class="stat-label">Friends Referred</div></div>
            <div class="stat-card"><div class="stat-value">₹0</div><div class="stat-label">Credits Earned</div></div>
            <div class="stat-card"><div class="stat-value">₹500</div><div class="stat-label">Per Successful Referral</div></div>
        </div>
        <div class="card">
            <h3 style="margin-bottom:16px;">How it works</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;">
                ${[['1. Share','Send your code to friends via WhatsApp, email, or social media'],['2. They Join','Your friend creates an account using your referral code'],['3. Complete Work','They complete their first contract on FreelanceHub'],['4. Both Earn','You both receive ₹500 platform credits automatically']].map(([step,desc])=>`
                    <div style="text-align:center;padding:20px;">
                        <div style="font-size:32px;font-weight:800;color:var(--accent);margin-bottom:8px;">${step.charAt(0)}</div>
                        <div style="font-weight:700;margin-bottom:6px;">${step.slice(3)}</div>
                        <div style="font-size:13px;color:var(--text-muted);">${desc}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function copyReferralCode(code) {
    navigator.clipboard?.writeText(code).catch(()=>{});
    showNotif('Referral code copied! Share it with friends 🎉', 'success');
}

function shareReferral() {
    const code = currentUser.referralCode;
    const text = `Join FreelanceHub — India's smartest freelancing platform! Use my code ${code} and we both earn ₹500. Sign up at freelancehub.in`;
    if (navigator.share) { navigator.share({ title:'Join FreelanceHub', text }); }
    else { navigator.clipboard?.writeText(text).catch(()=>{}); showNotif('Referral link copied!', 'success'); }
}

function openAIProposalAssist(jobId) {
    const job = DB.jobs.find(j=>j.id===jobId);
    if (!job) return;
    const suggestions = [
        `Start with a specific insight about ${job.title.split(' ').slice(0,4).join(' ')}`,
        `Mention your experience with: ${(job.skills||[]).slice(0,2).join(' and ')}`,
        `Address the client's main pain point from the description`,
        `Include one concrete result from a similar past project`,
        `End with a clear, low-friction call to action`,
    ];
    showModal(`
        <div class="modal-title">🤖 AI Proposal Assistant</div>
        <div class="modal-sub">Powered by FreelanceHub AI — trained on winning proposals</div>
        <div style="background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.15);border-radius:var(--radius);padding:16px;margin-bottom:20px;">
            <div style="font-size:13px;font-weight:600;color:var(--accent);margin-bottom:10px;">✨ AI Suggestions for this job:</div>
            ${suggestions.map((s,i)=>`<div style="display:flex;gap:10px;font-size:13px;margin-bottom:8px;"><span style="color:var(--accent);font-weight:700;">${i+1}.</span><span style="color:var(--text-muted);">${s}</span></div>`).join('')}
        </div>
        <div class="form-group">
            <label class="form-label">AI-Generated Draft</label>
            <textarea class="form-control" rows="7" id="aiDraftText">Hi! I noticed you're looking for a ${job.title.toLowerCase().replace('needed','').replace('developer','developer')} — this is exactly the kind of project I specialize in.

I've worked on ${(job.skills||[]).slice(0,2).join(' and ')} for the past 3+ years, delivering high-quality results for clients across India. Most recently, I built a similar solution that resulted in a 40% improvement in performance.

Your timeline and budget align perfectly with my availability. I'd love to jump on a quick 15-minute call to understand your specific requirements better.

Ready to start immediately. Looking forward to your response!</textarea>
        </div>
        <div style="display:flex;gap:10px;">
            <button class="btn btn-secondary" style="flex:1;" onclick="regenerateDraft(${jobId})">🔄 Regenerate</button>
            <button class="btn btn-primary" style="flex:1;" onclick="useAIDraft()">Use This Draft →</button>
        </div>
    `);
}

function regenerateDraft(jobId) { showNotif('New proposal draft generated! ✨', 'success'); }
function useAIDraft() {
    const draft = document.getElementById('aiDraftText')?.value;
    closeModal();
    openApplyModal(DB.jobs[0]?.id||1);
    setTimeout(()=>{ const el=document.getElementById('applyLetter'); if(el&&draft) el.value=draft; }, 100);
}

const _origApplyModal = openApplyModal;
openApplyModal = function(jobId) {
    if (!currentUser) { showAuth('freelancer','register'); return; }
    const j = DB.jobs.find(x => x.id === jobId);
    if (!j) return;
    const connectCost = 4;
    showModal(`
        <div class="modal-title">📝 Submit Proposal</div>
        <div class="modal-sub">Applying for: <strong>${j.title}</strong></div>
        <div style="display:flex;justify-content:space-between;background:var(--secondary);border-radius:var(--radius);padding:14px 18px;margin-bottom:16px;">
            <div><span style="color:var(--text-muted);">Budget:</span> <strong style="color:var(--success);">${j.budget}</strong></div>
            <div><span class="connects-pill">⚡ ${connectCost} Connects</span></div>
        </div>
        <button class="btn btn-outline btn-sm" style="margin-bottom:16px;width:100%;" onclick="openAIProposalAssist(${j.id})">🤖 Use AI to write my proposal</button>
        <div class="form-group">
            <label class="form-label">Cover Letter</label>
            <textarea class="form-control" id="applyLetter" rows="5" placeholder="Introduce yourself, explain why you're the best fit, mention relevant experience..."></textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group"><label class="form-label">Your Bid Amount (₹)</label><input type="number" class="form-control" id="applyBid" placeholder="e.g. 55000"></div>
            <div class="form-group"><label class="form-label">Estimated Delivery</label><select class="form-control" id="applyTime"><option>1 week</option><option>2 weeks</option><option>3 weeks</option><option>1 month</option><option>2 months</option></select></div>
        </div>
        <div class="form-group">
            <label class="form-label">Questions for Client (optional)</label>
            <textarea class="form-control" id="applyQuestions" rows="2" placeholder="Any questions you have about the project scope, timeline, or requirements..."></textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Portfolio Link (optional)</label>
            <input type="text" class="form-control" id="applyPortfolio" placeholder="https://your-portfolio.com or GitHub URL">
        </div>
        <!-- Boost proposal -->
        <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius);padding:14px;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:20px;">🚀</span>
                <div style="flex:1;">
                    <div style="font-size:14px;font-weight:600;">Boost this proposal</div>
                    <div style="font-size:12px;color:var(--text-muted);">Appear at the top of the client's proposal list (+6 Connects)</div>
                </div>
                <label class="toggle-switch"><input type="checkbox" id="boostProposal"><span class="toggle-slider"></span></label>
            </div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="submitProposal(${jobId})">Submit Proposal (${connectCost} Connects) →</button>
        <p style="text-align:center;margin-top:10px;font-size:12px;color:var(--text-muted);">You have <strong>${currentUser.connects||10}</strong> Connects. <a style="color:var(--accent);cursor:pointer;" onclick="closeModal();dashSection('earnings')">Buy more</a></p>
    `);
};

const _origSubmit = submitProposal;
submitProposal = function(jobId) {
    const letter = document.getElementById('applyLetter')?.value.trim();
    const bid = document.getElementById('applyBid')?.value;
    if (!letter || !bid) { showNotif('Please fill cover letter and bid amount', 'error'); return; }
    const boost = document.getElementById('boostProposal')?.checked;
    const cost = 4 + (boost ? 6 : 0);
    if ((currentUser.connects||0) < cost) { showNotif(`Not enough Connects. You need ${cost} but have ${currentUser.connects||0}.`, 'error'); return; }
    const j = DB.jobs.find(x => x.id === jobId);
    j.proposals.push({ id:Date.now(), freelancerId:currentUser.id, freelancerName:currentUser.name, coverLetter:letter, bidAmount:bid, deliveryTime:document.getElementById('applyTime').value, status:'pending', portfolio:document.getElementById('applyPortfolio')?.value||'', boosted:boost });
    currentUser.connects = (currentUser.connects||10) - cost;
    syncUser();
    updateNavForUser();
    closeModal();
    addNotification(`Proposal submitted for "${j.title}"`, '📝');
    showNotif(`Proposal submitted! ${cost} Connects used. Remaining: ${currentUser.connects} ⚡`, 'success');
};

const _origEarnings = renderEarnings;
renderEarnings = function() {
    const c = document.getElementById('mainContent');
    const months = ['Jul','Aug','Sep','Oct','Nov','Dec'];
    const earnings = [12000, 18500, 9800, 22000, 15600, 27800];
    const maxEarning = Math.max(...earnings);
    c.innerHTML = `
        <div class="content-header"><h2>Earnings & Payments</h2><p>Your complete financial overview</p></div>
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-value">₹${(currentUser.balance||0).toLocaleString('en-IN')}</div><div class="stat-label">Available Balance</div></div>
            <div class="stat-card"><div class="stat-value">₹0</div><div class="stat-label">In Escrow</div></div>
            <div class="stat-card"><div class="stat-value">₹${(currentUser.totalEarned||0).toLocaleString('en-IN')}</div><div class="stat-label">Lifetime Earnings</div></div>
            <div class="stat-card"><div class="stat-value">${currentUser.completedJobs||0}</div><div class="stat-label">Completed Orders</div></div>
        </div>

        <!-- Earnings chart -->
        <div class="card" style="margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3>Earnings Overview</h3>
                <select class="filter-btn" style="font-size:12px;">
                    <option>Last 6 months</option><option>This year</option><option>All time</option>
                </select>
            </div>
            <div class="chart-bar-wrap">
                ${earnings.map((e,i)=>`<div class="chart-bar" style="height:${(e/maxEarning)*100}%;position:relative;" title="₹${e.toLocaleString('en-IN')}"></div>`).join('')}
            </div>
            <div class="chart-labels">
                ${months.map(m=>`<div class="chart-label">${m}</div>`).join('')}
            </div>
        </div>

        <!-- Service fee breakdown -->
        <div class="card" style="margin-bottom:20px;">
            <h3 style="margin-bottom:12px;">Service Fee Breakdown</h3>
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">FreelanceHub uses a tiered service fee based on your lifetime earnings with each client</p>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                ${[['First ₹50,000','20%','With a new client'],['₹50K – ₹5L','10%','As relationship grows'],['Above ₹5L','5%','Long-term partners']].map(([tier,fee,desc])=>`
                    <div style="background:var(--secondary);border-radius:var(--radius);padding:16px;text-align:center;">
                        <div style="font-size:13px;color:var(--text-muted);margin-bottom:6px;">${tier}</div>
                        <div style="font-size:28px;font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace;">${fee}</div>
                        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${desc}</div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top:12px;font-size:12px;color:var(--text-muted);">💡 Direct Contracts with Freelancer Plus have a 0% service fee</div>
        </div>

        <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="showWithdrawModal()">💳 Withdraw Funds</button>
            <button class="btn btn-secondary" onclick="openDirectContract()">📋 Create Direct Contract</button>
            <button class="btn btn-secondary" onclick="showNotif('Statement downloaded as PDF!','info')">📄 Download Statement</button>
        </div>

        <div class="card" style="padding:0;overflow:hidden;">
            <div style="padding:20px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
                <h3>Transaction History</h3>
                <select class="filter-btn" style="font-size:12px;"><option>All</option><option>Payments In</option><option>Withdrawals</option></select>
            </div>
            <div style="text-align:center;padding:60px;color:var(--text-muted);">
                <div style="font-size:48px;margin-bottom:16px;">💰</div>
                <p>Complete your first order to see transactions</p>
                <button class="btn btn-primary" style="margin-top:16px;" onclick="dashSection('browse_jobs')">Find Work</button>
            </div>
        </div>

        <div class="card" style="margin-top:20px;">
            <h3 style="margin-bottom:16px;">Withdrawal Methods</h3>
            <div style="display:flex;flex-direction:column;gap:10px;">
                ${[['🏦','Bank Transfer (NEFT/IMPS/RTGS)','1-2 business days','Setup'],['📱','UPI (GPay, PhonePe, Paytm)','Instant','Setup'],['💵','PayPal','3-5 business days','Setup'],['💳','Payoneer','1-2 business days','Setup'],['🏧','Wise (TransferWise)','1-3 business days','Setup']].map(([icon,name,time,btn])=>`
                    <div style="display:flex;align-items:center;gap:14px;padding:14px;background:var(--secondary);border-radius:var(--radius);">
                        <span style="font-size:24px;">${icon}</span>
                        <div style="flex:1;"><div style="font-weight:600;">${name}</div><div style="font-size:12px;color:var(--text-muted);">${time}</div></div>
                        <button class="btn btn-secondary btn-sm" onclick="showNotif('Payment method setup coming soon!','info')">${btn}</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

function showWithdrawModal() {
    showModal(`
        <div class="modal-title">💳 Withdraw Funds</div>
        <div class="modal-sub">Transfer your earnings to your bank account</div>
        <div style="background:var(--secondary);border-radius:var(--radius);padding:16px;margin-bottom:20px;">
            <div style="font-size:13px;color:var(--text-muted);">Available Balance</div>
            <div style="font-size:32px;font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace;">₹${(currentUser.balance||0).toLocaleString('en-IN')}</div>
        </div>
        <div class="form-group"><label class="form-label">Amount to Withdraw (₹)</label><input type="number" class="form-control" placeholder="Minimum ₹1,000" max="${currentUser.balance||0}"></div>
        <div class="form-group"><label class="form-label">Payment Method</label><select class="form-control"><option>Bank Transfer</option><option>UPI</option><option>PayPal</option><option>Payoneer</option></select></div>
        <div style="background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.15);border-radius:var(--radius);padding:12px;margin-bottom:16px;font-size:13px;color:var(--text-muted);">
            ℹ️ Withdrawals are processed within 1-3 business days. A ₹25 processing fee applies for bank transfers under ₹10,000.
        </div>
        <button class="btn btn-primary btn-block" onclick="closeModal();showNotif('Withdrawal initiated! Funds arrive in 1-3 business days.','success')">Withdraw Now</button>
    `);
}

function renderSkillTests() {
    const c = document.getElementById('mainContent');
    const tests = [
        { name:'JavaScript (ES6+)',        score:92, percentile:88, badge:'Top 15%',  taken:true  },
        { name:'React.js',                  score:87, percentile:79, badge:'Top 25%',  taken:true  },
        { name:'Node.js & Express',         score:null, percentile:null, badge:null,  taken:false },
        { name:'Python Programming',        score:94, percentile:91, badge:'Top 10%',  taken:true  },
        { name:'SQL & Databases',           score:null, percentile:null, badge:null,  taken:false },
        { name:'UI/UX Design Fundamentals', score:null, percentile:null, badge:null,  taken:false },
        { name:'Digital Marketing',         score:78, percentile:65, badge:'Top 40%',  taken:true  },
        { name:'Data Analysis with Excel',  score:null, percentile:null, badge:null,  taken:false },
    ];
    c.innerHTML = `
        <div class="content-header">
            <h2>Skill Certifications & Tests</h2>
            <p>Prove your expertise and stand out to clients</p>
        </div>
        <div style="background:linear-gradient(135deg,rgba(0,212,170,0.07),rgba(124,58,237,0.07));border:1px solid rgba(0,212,170,0.2);border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;gap:16px;">
            <span style="font-size:36px;">🏆</span>
            <div>
                <h3 style="margin-bottom:4px;">Certified skills attract 3x more clients</h3>
                <p style="font-size:13px;color:var(--text-muted);">Take a skill test and earn a badge. Tests are 20-30 minutes, and you can retake after 30 days.</p>
            </div>
        </div>
        <div style="display:grid;gap:12px;">
            ${tests.map(t => `
            <div class="test-card">
                <div style="flex:1;">
                    <div style="font-weight:700;font-size:15px;margin-bottom:3px;">${t.name}</div>
                    ${t.taken ? `
                        <div style="display:flex;align-items:center;gap:10px;margin-top:6px;">
                            <div class="progress-bar" style="width:160px;"><div class="progress-fill" style="width:${t.score}%;"></div></div>
                            <span style="font-size:12px;color:var(--text-muted);">${t.score}/100</span>
                            <span class="tag tag-accent" style="font-size:11px;">${t.badge}</span>
                        </div>
                    ` : `<div style="font-size:13px;color:var(--text-muted);margin-top:4px;">Not taken yet</div>`}
                </div>
                <div style="text-align:right;">
                    ${t.taken ? `
                        <div class="test-score" style="color:var(--accent);">${t.score}</div>
                        <div class="test-percentile">Top ${100-t.percentile}%</div>
                        <button class="btn btn-secondary btn-sm" style="margin-top:6px;" onclick="showNotif('Retake available in 30 days','info')">Retake</button>
                    ` : `<button class="btn btn-primary btn-sm" onclick="startSkillTest('${t.name}')">Take Test</button>`}
                </div>
            </div>
            `).join('')}
        </div>
    `;
}

function startSkillTest(name) {
    showModal(`
        <div class="modal-title">📝 ${name} Skill Test</div>
        <div class="modal-sub">20 questions · 30 minutes · Results shared with clients</div>
        <div style="background:var(--secondary);border-radius:var(--radius);padding:20px;margin-bottom:20px;">
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
                <div style="flex:1;text-align:center;background:var(--card-bg);border-radius:var(--radius);padding:14px;">
                    <div style="font-size:22px;font-weight:800;color:var(--accent);">20</div>
                    <div style="font-size:12px;color:var(--text-muted);">Questions</div>
                </div>
                <div style="flex:1;text-align:center;background:var(--card-bg);border-radius:var(--radius);padding:14px;">
                    <div style="font-size:22px;font-weight:800;color:var(--gold);">30</div>
                    <div style="font-size:12px;color:var(--text-muted);">Minutes</div>
                </div>
                <div style="flex:1;text-align:center;background:var(--card-bg);border-radius:var(--radius);padding:14px;">
                    <div style="font-size:22px;font-weight:800;color:var(--success);">Pass</div>
                    <div style="font-size:12px;color:var(--text-muted);">≥ 70%</div>
                </div>
            </div>
            <ul style="font-size:13px;color:var(--text-muted);padding-left:16px;line-height:1.8;">
                <li>Test is time-limited — timer starts when you click Begin</li>
                <li>You can skip and return to questions</li>
                <li>Results displayed immediately after submission</li>
                <li>Badge awarded for scores in top 30th percentile</li>
            </ul>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="closeModal();showNotif('Test started! Good luck 🎯 (Demo: score saved as 91/100)','success');setTimeout(()=>renderSkillTests(),500)">Begin Test →</button>
        <button class="btn btn-secondary btn-block" style="margin-top:10px;" onclick="closeModal()">Cancel</button>
    `);
}

function renderSavedSearches() {
    const c = document.getElementById('mainContent');
    const saved = currentUser.savedSearches || [
        { id:1, name:'React Developer Jobs',  query:'React',  category:'Web Development', alert:true,  count:12 },
        { id:2, name:'UI/UX Design Projects', query:'Figma',  category:'Design',          alert:false, count:5  },
        { id:3, name:'Python Data Science',   query:'Python', category:'Data Science',     alert:true,  count:8  },
    ];
    c.innerHTML = `
        <div class="content-header">
            <h2>Saved Searches & Job Alerts</h2>
            <p>Get notified when new jobs match your criteria</p>
        </div>
        <div class="card" style="margin-bottom:20px;">
            <h3 style="margin-bottom:16px;">Create New Job Alert</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                <div class="form-group">
                    <label class="form-label">Search Keywords</label>
                    <input type="text" class="form-control" id="alertKeyword" placeholder="e.g. React, Flutter, SEO...">
                </div>
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select class="form-control" id="alertCat">
                        <option value="">All Categories</option>
                        <option>Web Development</option><option>Mobile App</option><option>Design</option>
                        <option>Writing</option><option>Marketing</option><option>Data Science</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Alert Frequency</label>
                    <select class="form-control" id="alertFreq">
                        <option>Instantly (as they're posted)</option>
                        <option>Daily digest</option>
                        <option>Weekly digest</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Alert Name</label>
                    <input type="text" class="form-control" id="alertName" placeholder="e.g. My React Alerts">
                </div>
            </div>
            <button class="btn btn-primary" onclick="createJobAlert()">🔔 Create Alert</button>
        </div>
        <h3 style="margin-bottom:14px;">Active Alerts (${saved.length})</h3>
        ${saved.map(s => `
        <div class="saved-search-item">
            <div style="flex:1;">
                <div style="font-weight:700;font-size:14px;">${s.name}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:3px;">🔍 "${s.query}" · ${s.category} · <span style="color:var(--accent);font-weight:600;">${s.count} new jobs</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
                <label class="toggle-switch" title="Email alerts ${s.alert?'on':'off'}">
                    <input type="checkbox" ${s.alert?'checked':''} onchange="toggleAlert(${s.id},this)">
                    <span class="toggle-slider"></span>
                </label>
                <button class="btn btn-primary btn-sm" onclick="searchTag('${s.query}')">View Jobs</button>
                <button class="btn btn-danger btn-sm" onclick="showNotif('Alert deleted','info')">✕</button>
            </div>
        </div>
        `).join('')}
    `;
}

function createJobAlert() {
    const keyword = document.getElementById('alertKeyword')?.value.trim();
    const name = document.getElementById('alertName')?.value.trim() || keyword + ' Jobs';
    if (!keyword) { showNotif('Please enter search keywords','error'); return; }
    if (!currentUser.savedSearches) currentUser.savedSearches = [];
    currentUser.savedSearches.push({ id:Date.now(), name, query:keyword, category:document.getElementById('alertCat')?.value||'All', alert:true, count:0 });
    syncUser();
    showNotif('Job alert created! You\'ll be notified when matching jobs are posted 🔔','success');
    renderSavedSearches();
}

function toggleAlert(id, el) {
    if (!currentUser.savedSearches) return;
    const s = currentUser.savedSearches.find(x=>x.id===id);
    if (s) { s.alert = el.checked; syncUser(); showNotif(el.checked?'Alerts enabled':'Alerts paused','info'); }
}

function renderAgency() {
    const c = document.getElementById('mainContent');
    c.innerHTML = `
        <div class="content-header">
            <h2>Agency Dashboard</h2>
            <p>Manage your team and agency contracts</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-value">1</div><div class="stat-label">Agency Members</div></div>
            <div class="stat-card"><div class="stat-value">0</div><div class="stat-label">Active Contracts</div></div>
            <div class="stat-card"><div class="stat-value">₹0</div><div class="stat-label">Team Earnings</div></div>
            <div class="stat-card"><div class="stat-value">0%</div><div class="stat-label">JSS (Agency)</div></div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">
            <div class="card">
                <h3 style="margin-bottom:16px;">🏢 Agency Profile</h3>
                <div class="agency-banner">🏢</div>
                <div class="form-group"><label class="form-label">Agency Name</label><input type="text" class="form-control" value="${currentUser.agencyName||''}" id="agencyName" placeholder="e.g. DevCraft Studios"></div>
                <div class="form-group"><label class="form-label">Tagline</label><input type="text" class="form-control" id="agencyTagline" placeholder="Top-rated full-stack development agency"></div>
                <div class="form-group"><label class="form-label">Specialisations</label><input type="text" class="form-control" id="agencySpec" placeholder="e.g. Web Apps, Mobile, AI"></div>
                <div class="form-group"><label class="form-label">Min Project Budget</label><select class="form-control"><option>₹10,000+</option><option>₹25,000+</option><option>₹50,000+</option><option>₹1,00,000+</option></select></div>
                <button class="btn btn-primary" onclick="saveAgencyProfile()">Save Agency Profile</button>
            </div>
            <div class="card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                    <h3>Team Members</h3>
                    <button class="btn btn-primary btn-sm" onclick="inviteTeamMember()">+ Invite</button>
                </div>
                <div style="background:var(--secondary);border-radius:var(--radius);padding:14px;display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                    <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent3));display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;">${currentUser.name.charAt(0)}</div>
                    <div style="flex:1;"><div style="font-weight:600;">${currentUser.name}</div><div style="font-size:12px;color:var(--accent);">Owner / Admin</div></div>
                    <span class="tag tag-green">Active</span>
                </div>
                <div style="text-align:center;padding:30px;color:var(--text-muted);border:1px dashed var(--border-light);border-radius:var(--radius);">
                    <div style="font-size:28px;margin-bottom:8px;">👥</div>
                    <p style="font-size:13px;">Invite freelancers to join your agency. They can work under your agency profile and share clients.</p>
                    <button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="inviteTeamMember()">Invite Team Member</button>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 style="margin-bottom:16px;">Agency Benefits</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;">
                ${[['🎯','Agency-Only Jobs','Access jobs posted exclusively for verified agencies'],['💰','Higher Rates','Agencies typically command 30-50% higher rates than solo freelancers'],['🤝','Collaborative Delivery','Team members can collaborate on large, complex projects'],['🏆','Agency Badge','Distinguished "Agency" badge on your profile builds instant trust'],['📊','Team Analytics','Track performance, utilization, and revenue across your team'],['🔒','Escrow Protection','All agency payments protected by FreelanceHub escrow']].map(([i,t,d])=>`
                    <div style="display:flex;gap:12px;padding:14px;background:var(--secondary);border-radius:var(--radius);">
                        <span style="font-size:24px;flex-shrink:0;">${i}</span>
                        <div><div style="font-weight:700;font-size:13px;margin-bottom:3px;">${t}</div><div style="font-size:12px;color:var(--text-muted);">${d}</div></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function saveAgencyProfile() {
    currentUser.agencyName = document.getElementById('agencyName')?.value;
    syncUser();
    showNotif('Agency profile saved! 🏢','success');
}

function inviteTeamMember() {
    showModal(`
        <div class="modal-title">👥 Invite Team Member</div>
        <div class="modal-sub">Invite a freelancer to join your agency</div>
        <div class="form-group"><label class="form-label">Email Address</label><input type="email" class="form-control" placeholder="colleague@email.com"></div>
        <div class="form-group"><label class="form-label">Role</label><select class="form-control"><option>Member (can receive work)</option><option>Senior Member</option><option>Admin</option></select></div>
        <div class="form-group"><label class="form-label">Personal Message (optional)</label><textarea class="form-control" rows="3" placeholder="Hi! I'd like you to join my agency on FreelanceHub..."></textarea></div>
        <button class="btn btn-primary btn-block" onclick="closeModal();showNotif('Invitation sent! ✉️','success')">Send Invitation</button>
    `);
}

function renderAnalytics() {
    const c = document.getElementById('mainContent');
    const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8'];
    const views  = [12,28,19,43,37,55,48,62];
    const clicks = [3,8,5,14,11,19,15,24];
    const maxV = Math.max(...views);
    c.innerHTML = `
        <div class="content-header">
            <h2>Analytics & Insights</h2>
            <p>Understand your profile performance and growth trends</p>
        </div>
        <div class="stats-grid" style="margin-bottom:24px;">
            <div class="stat-card"><div class="stat-value">62</div><div class="stat-label">Profile Views (This Week)</div></div>
            <div class="stat-card"><div class="stat-value">24</div><div class="stat-label">Proposal Opens</div></div>
            <div class="stat-card"><div class="stat-value">${Math.round(24/62*100)}%</div><div class="stat-label">Response Rate</div></div>
            <div class="stat-card"><div class="stat-value">${currentUser.jss||0}%</div><div class="stat-label">Job Success Score</div></div>
        </div>

        <!-- Profile views chart -->
        <div class="card" style="margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3>Profile Views (Last 8 Weeks)</h3>
                <span class="tag tag-green">+29% vs last month</span>
            </div>
            <div class="chart-bar-wrap" style="height:100px;">
                ${views.map((v,i)=>`<div class="chart-bar" style="height:${(v/maxV)*100}%;" title="${v} views - ${weeks[i]}"></div>`).join('')}
            </div>
            <div class="chart-labels">${weeks.map(w=>`<div class="chart-label">${w}</div>`).join('')}</div>
        </div>

        <!-- Proposal performance -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">
            <div class="card">
                <h3 style="margin-bottom:16px;">Proposal Performance</h3>
                ${[['Sent','24','var(--text)'],['Viewed by client','18','var(--info)'],['Shortlisted','7','var(--gold)'],['Hired','2','var(--success)']].map(([l,v,c])=>`
                    <div class="digest-row"><span style="font-size:14px;">${l}</span><span style="font-weight:800;color:${c};font-family:'JetBrains Mono',monospace;">${v}</span></div>
                `).join('')}
            </div>
            <div class="card">
                <h3 style="margin-bottom:16px;">Earnings Trend</h3>
                ${[['This Week','₹0'],['This Month','₹0'],['Last Month','₹0'],['This Year','₹0']].map(([l,v])=>`
                    <div class="digest-row"><span style="font-size:14px;">${l}</span><span style="font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace;">${v}</span></div>
                `).join('')}
            </div>
        </div>

        <!-- Profile optimisation score -->
        <div class="card" style="margin-bottom:20px;">
            <h3 style="margin-bottom:16px;">Profile Optimisation Score</h3>
            <div style="display:flex;align-items:center;gap:20px;margin-bottom:20px;">
                <div style="flex:1;"><div class="progress-bar" style="height:10px;"><div class="progress-fill" style="width:${Math.min(100,
                    (currentUser.bio?20:0)+(currentUser.skills?.length?20:0)+(currentUser.cvFileName?15:0)+(currentUser.portfolioURL?15:0)+(currentUser.experience?.length?15:0)+(currentUser.professionalTitle?15:0)
                )}%;"></div></div></div>
                <span style="font-size:20px;font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace;">${Math.min(100,
                    (currentUser.bio?20:0)+(currentUser.skills?.length?20:0)+(currentUser.cvFileName?15:0)+(currentUser.portfolioURL?15:0)+(currentUser.experience?.length?15:0)+(currentUser.professionalTitle?15:0)
                )}%</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;">
                ${[
                    ['Professional title',!!currentUser.professionalTitle],
                    ['Bio / overview',!!currentUser.bio],
                    ['Skills added',!!(currentUser.skills?.length)],
                    ['CV uploaded',!!currentUser.cvFileName],
                    ['Portfolio link',!!currentUser.portfolioURL],
                    ['Work experience',!!(currentUser.experience?.length)],
                ].map(([t,done])=>`
                    <div style="display:flex;align-items:center;gap:8px;font-size:13px;padding:8px;background:var(--secondary);border-radius:var(--radius);cursor:pointer;" onclick="dashSection('profile')">
                        <span style="color:${done?'var(--success)':'var(--border-light)'};">${done?'✓':'○'}</span>
                        <span style="color:${done?'var(--text)':'var(--text-muted)'};">${t}</span>
                        ${!done?`<span style="margin-left:auto;font-size:11px;color:var(--accent);">Add →</span>`:''}
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Top skills in demand -->
        <div class="card">
            <h3 style="margin-bottom:16px;">🔥 Skills in High Demand Right Now</h3>
            <div style="display:flex;flex-wrap:wrap;gap:10px;">
                ${['React.js','Next.js','TypeScript','Flutter','FastAPI','LangChain','Figma','Tailwind CSS','PostgreSQL','OpenAI API','Solidity','Data Analysis','SEO 2025','Shopify','Video Editing'].map((s,i)=>`
                    <div style="display:flex;align-items:center;gap:8px;background:var(--secondary);border:1px solid var(--border);border-radius:var(--radius);padding:8px 14px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'" onclick="searchTag('${s}')">
                        <span style="font-size:13px;font-weight:600;">${s}</span>
                        <span style="font-size:11px;color:var(--success);">+${[34,28,22,41,38,53,19,31,17,45,62,25,29,33,37][i]}% demand</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openDirectContract() {
    showModal(`
        <div class="modal-title">📋 Create Direct Contract</div>
        <div class="modal-sub">Work directly with a client outside job postings — 0% fee with Freelancer Plus</div>
        <div class="direct-contract-box" style="margin-bottom:20px;">
            <div style="font-size:13px;font-weight:600;color:var(--accent);margin-bottom:8px;">✨ Direct Contract Benefits</div>
            <div style="font-size:13px;color:var(--text-muted);line-height:1.7;">0% service fee with Freelancer Plus · Escrow protection · Milestone payments · Legally binding agreement · Dispute resolution included</div>
        </div>
        <div class="form-group"><label class="form-label">Client's Email</label><input type="email" class="form-control" id="dcEmail" placeholder="client@company.com"></div>
        <div class="form-group"><label class="form-label">Contract Title</label><input type="text" class="form-control" id="dcTitle" placeholder="e.g. Website Redesign for ABC Corp"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
            <div class="form-group">
                <label class="form-label">Contract Type</label>
                <select class="form-control" id="dcType" onchange="updateDCFields()">
                    <option value="fixed">Fixed Price</option>
                    <option value="hourly">Hourly Rate</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" id="dcAmountLabel">Total Amount (₹)</label>
                <input type="number" class="form-control" id="dcAmount" placeholder="e.g. 50000">
            </div>
        </div>
        <div class="form-group"><label class="form-label">Start Date</label><input type="date" class="form-control" id="dcStart"></div>
        <div class="form-group"><label class="form-label">Project Description</label><textarea class="form-control" rows="3" id="dcDesc" placeholder="Describe the scope of work, deliverables, and any terms..."></textarea></div>
        <div class="form-group">
            <label class="form-label">Payment Schedule</label>
            <select class="form-control" id="dcSchedule">
                <option>Full payment upfront in escrow</option>
                <option>50% upfront, 50% on completion</option>
                <option>Milestone-based (customise after creation)</option>
                <option>Weekly billing (hourly)</option>
            </select>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="createDirectContract()">Send Contract to Client →</button>
        <p style="text-align:center;margin-top:10px;font-size:12px;color:var(--text-muted);">🔒 Client must accept the contract before work begins. Payment held in escrow.</p>
    `);
}

function createDirectContract() {
    const email = document.getElementById('dcEmail')?.value;
    const title = document.getElementById('dcTitle')?.value;
    if (!email || !title) { showNotif('Please fill all required fields','error'); return; }
    closeModal();
    showNotif(`Direct contract sent to ${email}! They'll receive an email to accept. 📧`,'success');
}

function renderIDVerification() {
    const c = document.getElementById('mainContent');
    const verified = currentUser.idVerified || false;
    c.innerHTML = `
        <div class="content-header">
            <h2>Identity Verification</h2>
            <p>Verify your identity to unlock full platform features and build client trust</p>
        </div>
        ${verified ? `
        <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-lg);padding:28px;text-align:center;margin-bottom:24px;">
            <div style="font-size:48px;margin-bottom:12px;">✅</div>
            <h3 style="color:var(--success);margin-bottom:6px;">Identity Verified</h3>
            <p style="color:var(--text-muted);">Your identity has been verified. The <span class="verified-badge">✓ Verified</span> badge is visible on your profile.</p>
        </div>
        ` : `
        <div class="card" style="max-width:560px;">
            <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:24px;">
                <div style="width:48px;height:48px;border-radius:50%;background:rgba(59,130,246,0.12);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;">🛡️</div>
                <div>
                    <h3 style="margin-bottom:4px;">Why verify your identity?</h3>
                    <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">Verified freelancers get 2x more interview calls, can access Premium job listings, and display a trust badge that gives clients confidence to hire.</p>
                </div>
            </div>
            <h4 style="margin-bottom:14px;">Step 1: Choose ID Type</h4>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
                ${[['🪪','Aadhaar Card'],['🛂','Passport'],['🚗','Driving Licence']].map(([i,n])=>`
                    <div style="background:var(--secondary);border:1.5px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'" onclick="this.parentElement.querySelectorAll('div').forEach(d=>d.style.borderColor='var(--border)');this.style.borderColor='var(--accent)'">
                        <div style="font-size:28px;margin-bottom:6px;">${i}</div>
                        <div style="font-size:12px;font-weight:600;">${n}</div>
                    </div>
                `).join('')}
            </div>
            <h4 style="margin-bottom:14px;">Step 2: Upload Document</h4>
            <div class="upload-zone" onclick="document.getElementById('idUpload').click()" style="margin-bottom:20px;">
                <div class="upload-icon">📎</div>
                <div class="upload-text">Upload front of your ID document</div>
                <div class="upload-hint">JPG, PNG or PDF · Max 5MB</div>
            </div>
            <input type="file" id="idUpload" class="hidden" onchange="showNotif('Document uploaded! Verification in progress...','success')">
            <h4 style="margin-bottom:14px;">Step 3: Selfie Verification</h4>
            <button class="btn btn-secondary btn-block" onclick="showNotif('Camera access required. Please allow camera permissions.','info')" style="margin-bottom:20px;">📷 Take Selfie</button>
            <button class="btn btn-primary btn-block btn-lg" onclick="submitIDVerification()">Submit for Verification</button>
            <p style="text-align:center;margin-top:12px;font-size:12px;color:var(--text-muted);">Verification typically takes 1-2 business days. Your documents are encrypted and never shared.</p>
        </div>
        `}
    `;
}

function submitIDVerification() {
    currentUser.idVerified = true;
    syncUser();
    closeModal();
    showNotif('Verification submitted! You\'ll receive an email within 1-2 business days. 🛡️','success');
    renderIDVerification();
}

let claudeChatHistory = [];

function renderClaudeAI() {
    const c = document.getElementById('mainContent');
    const isFL = currentUserType === 'freelancer';
    claudeChatHistory = [];

    const quickActions = isFL ? [
        { icon:'✍️', label:'Write a Proposal',      prompt:'Help me write a compelling proposal for a freelance project. Ask me for the job details first.' },
        { icon:'💰', label:'Rate Advisor',           prompt:'What hourly or project rate should I charge? Ask me about my skills, experience, and the project type.' },
        { icon:'📊', label:'Improve My JSS',         prompt:'Give me specific, actionable tips to improve my Job Success Score on a freelancing platform.' },
        { icon:'📝', label:'Review My Profile Bio',  prompt:'Help me write a strong freelancer profile bio. Ask me about my skills and experience first.' },
        { icon:'🎯', label:'Proposal Feedback',      prompt:'I\'ll paste my proposal draft — give me honest feedback and suggestions to improve it.' },
        { icon:'💬', label:'Client Communication',   prompt:'Help me draft a professional message to a client. Ask me what I need to communicate.' },
    ] : [
        { icon:'📋', label:'Write a Job Post',       prompt:'Help me write a clear, detailed job post to attract great freelancers. Ask me about the project first.' },
        { icon:'💰', label:'Budget Advice',          prompt:'What\'s a realistic budget for my project? Ask me about the scope, timeline, and requirements.' },
        { icon:'🔍', label:'Shortlist Candidates',   prompt:'Help me evaluate freelancer proposals. I\'ll paste them and you can help me identify the best fit.' },
        { icon:'💬', label:'Interview Questions',    prompt:'Generate smart interview questions for a freelancer I\'m about to hire. Ask me the role details first.' },
        { icon:'📑', label:'Contract Advice',        prompt:'What should I include in a freelance contract? Ask me about the project type.' },
        { icon:'⚡', label:'Project Scoping',        prompt:'Help me scope a freelance project — define deliverables, milestones, and timeline. Ask me what I\'m building.' },
    ];

    c.innerHTML = `
        <div class="content-header" style="margin-bottom:0;">
            <div style="display:flex;align-items:center;gap:14px;">
                <div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,#7C3AED,#00D4AA);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">✦</div>
                <div>
                    <h2 style="margin-bottom:2px;">Claude AI Assistant</h2>
                    <p style="margin:0;">Powered by Anthropic · Your intelligent freelancing companion</p>
                </div>
                <div style="margin-left:auto;display:flex;align-items:center;gap:8px;">
                    <span style="width:8px;height:8px;border-radius:50%;background:var(--success);display:inline-block;"></span>
                    <span style="font-size:12px;color:var(--text-muted);">claude-sonnet-4-5</span>
                </div>
            </div>
        </div>

        <!-- Quick action chips -->
        <div style="padding:20px 0 0;">
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;font-weight:500;">Quick actions — click to start:</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:0;">
                ${quickActions.map(a => `
                <button onclick="claudeQuickAction(${JSON.stringify(a.prompt).replace(/'/g,"&#39;")})"
                    style="display:inline-flex;align-items:center;gap:7px;background:var(--secondary);border:1px solid var(--border);border-radius:100px;padding:8px 16px;font-size:13px;font-weight:500;cursor:pointer;color:var(--text);font-family:'Sora',sans-serif;transition:all 0.2s;"
                    onmouseover="this.style.borderColor='var(--accent)';this.style.color='var(--accent)'"
                    onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text)'">
                    <span>${a.icon}</span>${a.label}
                </button>`).join('')}
            </div>
        </div>

        <!-- Chat window -->
        <div style="display:flex;flex-direction:column;height:calc(100vh - 360px);min-height:380px;margin-top:20px;background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;">
            <!-- Messages -->
            <div id="claudeMessages" style="flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px;">
                <div style="display:flex;gap:12px;align-items:flex-start;">
                    <div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#7C3AED,#00D4AA);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:#fff;font-weight:800;">✦</div>
                    <div style="background:var(--secondary);border:1px solid var(--border);border-radius:4px 16px 16px 16px;padding:14px 18px;max-width:80%;font-size:14px;line-height:1.7;color:var(--text);">
                        Hi ${currentUser.name}! 👋 I'm Claude, your AI assistant on FreelanceHub — powered by Anthropic.<br><br>
                        I can help you ${isFL ? 'write winning proposals, set competitive rates, improve your Job Success Score, craft client messages, and grow your freelancing career' : 'write compelling job posts, set realistic budgets, evaluate proposals, generate interview questions, and find the perfect freelancer'}.<br><br>
                        What would you like help with today?
                    </div>
                </div>
            </div>
            <!-- Input bar -->
            <div style="border-top:1px solid var(--border);padding:16px 20px;display:flex;gap:12px;align-items:flex-end;background:var(--card-bg);">
                <textarea id="claudeInput"
                    style="flex:1;background:var(--secondary);border:1px solid var(--border);border-radius:12px;padding:12px 16px;font-family:'Sora',sans-serif;font-size:14px;color:var(--text);resize:none;min-height:46px;max-height:140px;line-height:1.5;outline:none;transition:border-color 0.2s;"
                    placeholder="Ask Claude anything about freelancing…"
                    rows="1"
                    onfocus="this.style.borderColor='var(--accent)'"
                    onblur="this.style.borderColor='var(--border)'"
                    onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendClaudeMsg();}"
                    oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,140)+'px'"></textarea>
                <button id="claudeSendBtn" onclick="sendClaudeMsg()"
                    style="width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,#7C3AED,#00D4AA);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;transition:opacity 0.2s;"
                    title="Send (Enter)">➤</button>
            </div>
        </div>
        <p style="text-align:center;font-size:11px;color:var(--border-light);margin-top:10px;">Claude can make mistakes. Verify important information. · Powered by Anthropic</p>
    `;
}

function claudeQuickAction(prompt) {
    const input = document.getElementById('claudeInput');
    if (input) { input.value = prompt; input.dispatchEvent(new Event('input')); }
    sendClaudeMsg();
}

async function sendClaudeMsg() {
    const input = document.getElementById('claudeInput');
    const msgsEl = document.getElementById('claudeMessages');
    const sendBtn = document.getElementById('claudeSendBtn');
    if (!input || !msgsEl) return;
    const text = input.value.trim();
    if (!text) return;

    
    input.value = '';
    input.style.height = 'auto';

    
    msgsEl.innerHTML += `
        <div style="display:flex;gap:12px;align-items:flex-start;flex-direction:row-reverse;">
            <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent3));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;color:#fff;flex-shrink:0;">${currentUser.name.charAt(0)}</div>
            <div style="background:linear-gradient(135deg,rgba(0,212,170,0.12),rgba(124,58,237,0.08));border:1px solid rgba(0,212,170,0.2);border-radius:16px 4px 16px 16px;padding:14px 18px;max-width:75%;font-size:14px;line-height:1.7;">${text.replace(/\n/g,'<br>')}</div>
        </div>`;
    msgsEl.scrollTop = msgsEl.scrollHeight;

    
    claudeChatHistory.push({ role: 'user', content: text });

    
    const typingId = 'typing-' + Date.now();
    msgsEl.innerHTML += `
        <div id="${typingId}" style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#7C3AED,#00D4AA);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:#fff;font-weight:800;">✦</div>
            <div style="background:var(--secondary);border:1px solid var(--border);border-radius:4px 16px 16px 16px;padding:14px 18px;font-size:14px;color:var(--text-muted);">
                <span style="display:inline-flex;gap:4px;align-items:center;">
                    <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 1s infinite;"></span>
                    <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 1s 0.2s infinite;"></span>
                    <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 1s 0.4s infinite;"></span>
                </span>
            </div>
        </div>`;
    msgsEl.scrollTop = msgsEl.scrollHeight;

    
    if (sendBtn) sendBtn.style.opacity = '0.5';

    const isFL = currentUserType === 'freelancer';
    const systemPrompt = `You are Claude, an expert AI assistant embedded in FreelanceHub — India's leading freelancing platform. The user is a ${isFL ? 'freelancer' : 'client/employer'} named ${currentUser.name}.

Your role is to give practical, specific, and actionable advice on:
${isFL
    ? '- Writing winning proposals and cover letters\n- Setting competitive rates (in Indian Rupees)\n- Improving Job Success Score (JSS)\n- Managing client relationships\n- Growing a freelancing career on FreelanceHub\n- Profile optimisation tips'
    : '- Writing clear, attractive job posts\n- Setting realistic project budgets (in Indian Rupees)\n- Evaluating freelancer proposals\n- Conducting effective interviews\n- Managing freelance contracts and milestones\n- Finding the right talent'}

Be conversational, warm, and concise. Use bullet points and formatting where helpful. Always tailor advice to the Indian freelancing market context when relevant. Keep responses focused and practical — avoid unnecessary fluff.`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'claude-sonnet-4-5',
                max_tokens: 1000,
                system: systemPrompt,
                messages: claudeChatHistory
            })
        });

        const data = await response.json();
        const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t get a response. Please try again.';

        
        claudeChatHistory.push({ role: 'assistant', content: reply });

        
        document.getElementById(typingId)?.remove();
        const formattedReply = reply
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*)/gm, '<h4 style="margin:12px 0 6px;font-size:14px;">$1</h4>')
            .replace(/^## (.*)/gm, '<h3 style="margin:14px 0 8px;font-size:15px;">$1</h3>')
            .replace(/^- (.*)/gm, '<li style="margin-left:16px;margin-bottom:4px;">$1</li>')
            .replace(/(<li.*<\/li>\n?)+/g, m => `<ul style="margin:8px 0;">${m}</ul>`)
            .replace(/\n\n/g, '</p><p style="margin-top:10px;">')
            .replace(/\n/g, '<br>');

        msgsEl.innerHTML += `
            <div style="display:flex;gap:12px;align-items:flex-start;">
                <div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#7C3AED,#00D4AA);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:#fff;font-weight:800;">✦</div>
                <div style="background:var(--secondary);border:1px solid var(--border);border-radius:4px 16px 16px 16px;padding:14px 18px;max-width:80%;font-size:14px;line-height:1.7;color:var(--text);">${formattedReply}</div>
            </div>`;

    } catch (err) {
        document.getElementById(typingId)?.remove();
        msgsEl.innerHTML += `
            <div style="display:flex;gap:12px;align-items:flex-start;">
                <div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#7C3AED,#00D4AA);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:#fff;font-weight:800;">✦</div>
                <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:4px 16px 16px 16px;padding:14px 18px;max-width:80%;font-size:14px;color:var(--danger);">
                    ⚠️ Unable to connect to Claude right now. Please check your connection and try again.
                </div>
            </div>`;
    }

    if (sendBtn) sendBtn.style.opacity = '1';
    msgsEl.scrollTop = msgsEl.scrollHeight;
}

const _origRenderSidebar = renderSidebar;
renderSidebar = function() {
    _origRenderSidebar();
    
    const isFL = currentUserType === 'freelancer';
    const newItems = isFL ? [
        { id:'skill_tests',    icon:'🏆', label:'Skill Tests'       },
        { id:'saved_searches', icon:'🔔', label:'Job Alerts'        },
        { id:'agency',         icon:'🏢', label:'Agency'            },
        { id:'analytics',      icon:'📈', label:'Analytics'         },
        { id:'id_verify',      icon:'🛡️', label:'ID Verify'         },
        { id:'claude_ai',      icon:'🤖', label:'Claude AI'         },
    ] : [
        { id:'analytics',      icon:'📈', label:'Analytics'         },
        { id:'agency',         icon:'🏢', label:'Agency'            },
        { id:'id_verify',      icon:'🛡️', label:'ID Verify'         },
        { id:'claude_ai',      icon:'🤖', label:'Claude AI'         },
    ];
    const divider = document.querySelector('.sidebar-divider');
    if (divider) {
        newItems.forEach(it => {
            const el = document.createElement('div');
            el.className = 'sidebar-item';
            el.id = 'si-' + it.id;
            el.innerHTML = `<span class="sidebar-icon">${it.icon}</span><span>${it.label}</span>`;
            el.addEventListener('click', () => dashSection(it.id));
            divider.parentNode.insertBefore(el, divider);
        });
    }
};

const _origDashSection = dashSection;
dashSection = function(id) {
    const extraMap = {
        skill_tests:    renderSkillTests,
        saved_searches: renderSavedSearches,
        agency:         renderAgency,
        analytics:      renderAnalytics,
        id_verify:      renderIDVerification,
        claude_ai:      renderClaudeAI,
    };
    if (extraMap[id]) {
        showPage('dashboard');
        document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
        const target = document.getElementById('si-' + id);
        if (target) target.classList.add('active');
        extraMap[id]();
    } else {
        _origDashSection(id);
    }
};

function populateNotifCentre() {
    const nc = document.getElementById('notifCentre');
    if (!nc || !currentUser) return;
    const notifs = [
        { icon:'💼', text:`New job matching your skills: "React Developer for FinTech App"`, time:'2 min ago', unread:true },
        { icon:'✅', text:'Your proposal was viewed by TechStart Solutions', time:'1 hour ago', unread:true },
        { icon:'💬', text:'New message from Anjali Singh', time:'3 hours ago', unread:true },
        { icon:'⚡', text:'You have 10 Connects remaining. Buy more to keep applying.', time:'1 day ago', unread:false },
        { icon:'🎉', text:'Congratulations! You\'ve been shortlisted for "Next.js Dashboard" project', time:'2 days ago', unread:false },
        { icon:'⭐', text:'Reminder: Leave a review for your completed contract', time:'3 days ago', unread:false },
    ];
    nc.innerHTML = `
        <div class="notif-centre-header">
            <span>Notifications</span>
            <button class="btn btn-secondary btn-sm" onclick="markAllNotifRead()">Mark all read</button>
        </div>
        ${notifs.map(n=>`
        <div class="notif-item ${n.unread?'unread':''}">
            <span style="font-size:20px;flex-shrink:0;">${n.icon}</span>
            <div style="flex:1;">
                <p style="font-size:13px;line-height:1.5;">${n.text}</p>
                <span style="font-size:11px;color:var(--text-muted);">${n.time}</span>
            </div>
            <div class="notif-dot ${n.unread?'':'read'}"></div>
        </div>
        `).join('')}
    `;
}

function markAllNotifRead() {
    document.querySelectorAll('.notif-item').forEach(el => { el.classList.remove('unread'); el.querySelector('.notif-dot')?.classList.add('read'); });
    showNotif('All notifications marked as read','info');
}

const _origHandleAuth = handleAuth;
handleAuth = function(e) {
    _origHandleAuth(e);
    setTimeout(populateNotifCentre, 300);
};

const homePageEl = document.getElementById('page-home');
if (homePageEl) {
    const howDiv = document.createElement('div');
    howDiv.style.cssText = 'background:var(--secondary);padding:60px 0;';
    howDiv.innerHTML = `
        <div class="container">
            <div style="text-align:center;margin-bottom:40px;">
                <h2 style="font-size:28px;font-weight:800;margin-bottom:8px;">How FreelanceHub Works</h2>
                <p style="color:var(--text-muted);font-size:15px;">Everything you need to hire great talent or find great work</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">
                ${[
                    ['1','Create your profile','Showcase your skills, portfolio, experience, and get a Job Success Score badge'],
                    ['2','Find work or talent','Browse gigs & jobs with AI-matching, saved searches, and smart filters'],
                    ['3','Collaborate securely','Use built-in messaging, file sharing, video calls, and a work diary'],
                    ['4','Get paid safely','Milestone-based escrow payments protect both clients and freelancers'],
                ].map(([n,t,d])=>`
                <div style="text-align:center;">
                    <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent3));display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin:0 auto 16px;">${n}</div>
                    <h4 style="margin-bottom:8px;">${t}</h4>
                    <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">${d}</p>
                </div>
                `).join('')}
            </div>
            <div style="text-align:center;margin-top:48px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
                <button class="btn btn-primary btn-lg" onclick="showPage('welcome')">Get Started Free →</button>
                <button class="btn btn-secondary btn-lg" onclick="browseGigs()">Explore Gigs</button>
            </div>
        </div>
    `;
    homePageEl.appendChild(howDiv);

    
    const trustDiv = document.createElement('div');
    trustDiv.style.cssText = 'padding:40px 0;border-top:1px solid var(--border);';
    trustDiv.innerHTML = `
        <div class="container" style="text-align:center;">
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Trusted by professionals from</p>
            <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:32px;opacity:0.5;">
                ${['Google','Microsoft','Infosys','TCS','Flipkart','Zomato','CRED','Razorpay','PhonePe','Meesho'].map(c=>`<span style="font-size:15px;font-weight:800;letter-spacing:-0.5px;">${c}</span>`).join('')}
            </div>
        </div>
    `;
    homePageEl.appendChild(trustDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    const nc = document.createElement('div');
    nc.id = 'notifCentre';
    nc.className = 'notif-centre';
    nc.innerHTML = '<div class="notif-centre-header"><span>Notifications</span></div><div style="padding:40px;text-align:center;color:var(--text-muted);">Sign in to see notifications</div>';
    document.body.appendChild(nc);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && document.activeElement?.id === 'msgInput') sendMsg();
});

renderFeaturedGigs();
