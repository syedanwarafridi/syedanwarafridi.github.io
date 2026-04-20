/**
 * PORTFOLIO CONTENT
 * ─────────────────
 * Edit this file to update your portfolio. No HTML knowledge needed.
 * Supports **bold** and _italic_ markdown in any description field.
 */

const PORTFOLIO = {

  /* ═══════════════════════════════════════════
     HERO
  ═══════════════════════════════════════════ */
  hero: {
    badge: 'Available for opportunities',
    name: 'Syed Anwar',
    roles: [
      'Senior Data Scientist',
      'AI / ML Engineer',
      'Deep Learning Specialist',
      'AI Agents & RAG Architect',
      'Computer Vision Engineer',
    ],
    description: 'Senior Data Scientist & AI/ML Engineer with 6+ years building production AI systems — from training Transformers from scratch to deploying LLM agents, computer vision pipelines, and RAG architectures that ship and scale.',
    stats: [
      { num: '6+',  label: 'Years Experience'   },
      { num: '50+', label: 'Projects Delivered'  },
      { num: '5+',  label: 'Companies'           },
      { num: '50+', label: 'Happy Clients'       },
    ],
  },

  /* ═══════════════════════════════════════════
     ABOUT
  ═══════════════════════════════════════════ */
  about: {
    heading: 'Building AI systems that make a real difference',
    bio: [
      "I'm a **Senior Data Scientist & AI/ML Engineer** based in **Islamabad, Pakistan**, specialising in machine learning, deep learning, large language models, and computer vision. I've built and shipped AI systems across multiple industries — from crypto intelligence platforms to smart attendance systems to multilingual translation detectors.",
      "My work spans training Transformer models from scratch, building RAG pipelines, fine-tuning LLMs, and integrating AI agents into production workflows. I care deeply about accuracy, latency, and systems that actually scale.",
    ],
    details: {
      Name:      'Syed Anwar',
      Title:     'Senior Data Scientist & AI/ML Engineer',
      Email:     'syedanwarafridi00@gmail.com',
      Phone:     '+92 334 454 6885',
      Location:  'Islamabad, Pakistan',
      Education: 'B.Sc. Computer Science — UoB (CGPA 3.36)',
    },
  },

  /* ═══════════════════════════════════════════
     EXPERIENCE
     active: true  → shows coloured dot + badge
     badge:        → text shown in badge (omit to hide)
     isFreelance:  → shows Fiverr/Upwork buttons
  ═══════════════════════════════════════════ */
  experience: [
    {
      role:        'Freelance Senior Data Scientist & AI/ML Engineer',
      period:      '2022 – Present',
      location:    'Remote',
      badge:       'Ongoing',
      active:      true,
      isFreelance: true,
      fiverr:      'https://www.fiverr.com/sellers/syedanwarai/',
      upwork:      'https://www.upwork.com/freelancers/syeda343',
      bullets: [
        'Delivered **50+ custom AI/ML projects** to clients across USA, UK, Middle East, and Europe on Fiverr and Upwork.',
        'Services include custom LLM fine-tuning, RAG pipelines, computer vision systems, NLP chatbots, and data analysis dashboards.',
        'Maintained top-rated status with consistent 5-star reviews and long-term repeat clients.',
        'Specialised in rapid prototyping and delivering production-ready AI solutions within tight deadlines.',
      ],
      stack: ['Python', 'LLMs', 'RAG', 'Computer Vision', 'NLP', 'PyTorch'],
    },
    {
      role:     'Senior Data Scientist',
      company:  'Alpha Squad',
      period:   'February 2025 – Present',
      location: 'Islamabad, PK',
      badge:    'Current',
      active:   true,
      bullets: [
        'Built and fine-tuned a persona-driven crypto Twitter agent (Mind of Pepe) by scraping tweets from Aixbt agent and training a LLaMA model to mimic its style — achieving **98% signal accuracy** and viral engagement.',
        'Developed a gated terminal integrating AI signal generation, crypto sentiment analysis, and technical analysis using real-time CoinMarketCap data for meme coin traders.',
        'Integrated a RAG system with the agent and terminal, pulling live crypto data and user behaviour patterns for contextual understanding.',
        'Built a full AI-powered receptionist using n8n, Telnyx, and ElevenLabs for Jumper Media — intelligent call handling, scheduling, follow-ups, and outbound calls.',
        'Optimised system performance reducing response latency to **850ms** for a seamless, human-like experience.',
      ],
      stack: ['LLaMA', 'RAG', 'n8n', 'ElevenLabs', 'Telnyx', 'Python'],
    },
    {
      role:     'AI / ML Data Scientist',
      company:  'MetaViz Pro',
      period:   'August 2024 – February 2025',
      location: 'Lahore, PK',
      badge:    'Current',
      active:   true,
      bullets: [
        'Trained two Transformer-based models from scratch: text generation (5M params, **74% accuracy**) and code completion for Python & Java (19M params, **67% accuracy**) using GPT-NeoX and PyTorch.',
        'Built a real-time yoga pose estimation system that compares extracted pose features against a reference database and provides corrective feedback.',
        'Developed a facial recognition attendance system with PPE compliance monitoring — triggers alarm and identifies non-compliant workers in real time.',
        'Trained a CNN model for brain tumour detection achieving **98% accuracy** using only 5 CNN layers — matching EfficientNet performance with a far more compact architecture.',
        'Built an AI agent system in LangGraph scoring AI job-replacement risk, performing skills gap analysis, and recommending career pathways.',
      ],
      stack: ['PyTorch', 'GPT-NeoX', 'OpenCV', 'LangGraph', 'TensorFlow'],
    },
    {
      role:     'Jr. Data Scientist',
      company:  'JMM Technologies',
      period:   'September 2023 – August 2024',
      location: 'Peshawar, PK',
      active:   false,
      bullets: [
        'Built an AI app using GPT-4o to detect translation errors across Spanish, French, and Arabic — improving accuracy from **50% to 90%** via advanced prompt engineering; reduced costs **40%** via token management.',
        'Trained and fine-tuned YOLOv8 and YOLOv5 for an American Sign Language detection system for Saudi Airport Assistance.',
        'Built an advanced RAG application using Query Expansion and Cross-Encoder Re-ranking for highly accurate document retrieval.',
        'Deployed ML pipelines on AWS (EC2, Lambda, S3) and applied Time Series modelling (ARIMA, SARIMA, Prophet) for forecasting.',
      ],
      stack: ['GPT-4o', 'LangChain', 'YOLOv8', 'AWS', 'ARIMA'],
    },
    {
      role:     'Machine Learning Engineer Associate',
      company:  'Government Innovation Lab · UNDP',
      period:   'November 2022 – May 2023',
      location: 'Quetta, PK',
      active:   false,
      bullets: [
        'Led development of a Smart Attendance System for the Planning & Development Department using facial recognition and ML techniques.',
        'Contributed to Smart Vehicle Counting using YOLOv8 and Jetson Nano for precise automated vehicle counting.',
        'Collaborated with cross-functional teams as ICT Developer Fellow, integrating cutting-edge technologies into government infrastructure.',
      ],
      stack: ['OpenCV', 'Scikit-Learn', 'YOLOv8', 'Jetson Nano', 'Flask'],
    },
    {
      role:     'Research Assistant',
      company:  'University of Balochistan — CS Department',
      period:   'January 2021 – December 2021',
      location: 'Quetta, PK',
      active:   false,
      bullets: [
        'Executed advanced model training and refined predictive algorithms for Gender Prediction and License Plate Detection under PhD supervision.',
        'Trained four detection models (Faster RCNN, RCNN, SSD, YOLOv8) for license plate recognition — contributing to academic publication.',
      ],
      stack: ['TensorFlow', 'Keras', 'OpenCV', 'Python'],
    },
  ],

  /* ═══════════════════════════════════════════
     PROJECTS
     screenshotUrl → URL passed to thum.io for thumbnail
     liveUrl       → "Live Site" button (omit to hide)
     githubUrl     → "GitHub" button (omit to hide)
     xUrl          → "X/Twitter" button (omit to hide)
     reverse: true → image on left, text on right
  ═══════════════════════════════════════════ */
  projects: {
    featured: [
      {
        id:          'project-1',
        badge:       'AI Real Estate',
        year:        '2025',
        title:       'Aqariiq.ai',
        tagline:     'AI-powered real estate platform for the UAE market.',
        description: 'A full-stack AI real estate platform leveraging machine learning for intelligent property search, valuation estimates, and market analysis. Built to serve multi-language markets with smart recommendations, natural language search, and data-driven insights for buyers, sellers, and investors.',
        features: [
          'AI-driven property recommendations and smart search',
          'Automated property valuation using ML models',
          'Real-time market trend analysis and insights dashboard',
          'Multi-language support with NLP-powered query understanding',
        ],
        stack:         ['Machine Learning', 'Data Analytics', 'AI Agents', 'Django', 'Next.js', 'PostgreSQL'],
        screenshotUrl: 'https://aqariiq.ai/',
        liveUrl:       'https://aqariiq.ai/',
        githubUrl:     'https://github.com/syedanwarafridi',
        reverse:       false,
      },
      {
        id:          'project-2',
        badge:       'AI Agent / Crypto',
        year:        '2025',
        title:       'Mind of Pepe',
        tagline:     'Persona-driven crypto AI agent with 98% signal accuracy.',
        description: "A gated crypto intelligence platform featuring a persona-driven LLaMA-based Twitter agent (Mind of Pepe) trained on Aixbt's tweet style. Integrates real-time sentiment analysis, technical analysis via CoinMarketCap, and a RAG system for contextual meme coin trading signals.",
        features: [
          'Fine-tuned LLaMA model achieving **98% signal accuracy**',
          'Real-time crypto sentiment + technical analysis terminal',
          'RAG system pulling live CoinMarketCap data for context',
          'Viral Twitter engagement driving significant community growth',
        ],
        stack:         ['LLaMA', 'RAG', 'SFT Fine Tuning', 'Data Scraping', 'CoinMarketCap API', 'Twitter/X Integration', 'Gated Terminal'],
        screenshotUrl: 'https://mindofpepe.com/',
        liveUrl:       'https://mindofpepe.com/',
        xUrl:          'https://x.com/MIND_agent',
        reverse:       true,
      },
    ],

    others: [
      {
        badge:       'AI Career Platform',
        year:        '2025',
        title:       'OnTrack Careers',
        tagline:     'AI-powered career intelligence platform.',
        description: "AI agent system built with LangGraph that scores a user's AI job-replacement risk, performs skills gap analysis, recommends alternative career pathways, and provides personalised development plans.",
        stack:         ['LangGraph', 'OpenAI', 'Python', 'FastAPI'],
        screenshotUrl: 'https://ontrackcareers.ai/',
        liveUrl:       'https://ontrackcareers.ai/',
      },
      {
        badge:       'AI Twitter Agent',
        year:        '2025',
        title:       'MIND Agent',
        tagline:     'Live AI crypto agent on X (Twitter).',
        description: 'The deployed persona-driven LLaMA-based AI agent that autonomously posts crypto signals and analysis on X. Trained on real trading agent data to mimic expert-level signal generation style.',
        stack:         ['LLaMA', 'Twitter API', 'Python'],
        screenshotUrl: 'https://x.com/MIND_agent',
        xUrl:          'https://x.com/MIND_agent',
      },
      {
        badge:       'AI Code Generation',
        year:        '2024',
        title:       'GeniCoder',
        tagline:     'AI-powered code auto-completion platform.',
        description: 'Deployed AI code completion system powered by a custom Transformer model trained from scratch for Python and JavaScript. Provides real-time, context-aware code suggestions with 97% accuracy on unseen code.',
        stack:         ['PyTorch', 'GPT-NeoX', 'Python', 'FastAPI'],
        screenshotUrl: 'https://autocoder.greensensebilling.com/',
        liveUrl:       'https://autocoder.greensensebilling.com/',
        githubUrl:     'https://github.com/markNZed/GPT-NeoX-Colab',
      },
      {
        badge:       'Deep Learning',
        year:        '2024',
        title:       'GPT Training From Scratch',
        tagline:     'Training Transformer LLMs with zero pretrained weights.',
        description: 'Built and trained two GPT-NeoX Transformer models from scratch on Google Colab — a 5M-parameter text generation model (74% accuracy) and a 19M-parameter code completion model for Python & Java (67% accuracy).',
        stack:         ['PyTorch', 'GPT-NeoX', 'Colab', 'CodeXGLUE'],
        screenshotUrl: 'https://github.com/markNZed/GPT-NeoX-Colab',
        githubUrl:     'https://github.com/markNZed/GPT-NeoX-Colab',
      },
      {
        badge:       'FinTech / AI',
        year:        '2024',
        title:       'Hysabat',
        tagline:     'AI-powered accounting & financial management platform.',
        description: 'A smart accounting platform integrating AI to automate bookkeeping, financial forecasting, and business analytics. Applied ML models for trend analysis and strategic financial decision support.',
        stack:         ['Python', 'ML', 'Pandas', 'Django'],
        screenshotUrl: 'https://www.hysabat.com/en',
        liveUrl:       'https://www.hysabat.com/en',
      },
    ],
  },

};
