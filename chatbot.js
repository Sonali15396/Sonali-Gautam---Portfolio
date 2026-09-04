/**
 * ============================================================================
 * ASK SONALI - AI PORTFOLIO CHATBOT SCRIPT (chatbot.js)
 * Features:
 *  1. Interactive floating chatbot modal with smooth transitions
 *  2. Knowledge base containing all of Sonali Gautam's portfolio details
 *  3. Natural language fuzzy intent matcher & contextual responses
 *  4. Quick suggestion chips and interactive action buttons
 *  5. Typing simulation effect and automatic scroll management
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. SONALI'S PORTFOLIO KNOWLEDGE BASE
  // ==========================================================================
  const sonaliData = {
    name: "Sonali Gautam",
    headline: "Aspiring Software Engineer | Data Analytics Enthusiast",
    bio: "I’m a technology enthusiast and aspiring software developer with a strong interest in building practical solutions to real-world problems. Currently in my 4th year (7th semester) of B.Tech in Information Science & Engineering at JAIN University, Bengaluru. I love turning ideas into functional, user-focused digital experiences and exploring software development, data analytics, and emerging technologies.",
    status: "Actively open to internships, entry-level software engineering roles, and collaborative projects.",
    location: "Bengaluru, Karnataka, India",
    email: "gautamsonali326@gmail.com",
    phone: "+91 9008536461",
    linkedin: "https://www.linkedin.com/in/sonaligautam15",
    github: "https://github.com/Sonali15396",
    resumeUrl: "assets/docs/resume.pdf",

    education: [
      {
        degree: "B.Tech in Information Science & Engineering",
        institution: "JAIN (Deemed-to-be) University, Bengaluru",
        duration: "2023 – 2027",
        gpa: "8.3 / 10",
        details: "4th Year • 7th Semester. Core coursework includes Data Structures & Algorithms, DBMS, Computer Networks, Software Engineering, Web Development, and Operating Systems."
      },
      {
        degree: "Class XII (Higher Secondary)",
        institution: "Sri Chaitanya Techno School, Bengaluru",
        duration: "2021 – 2023",
        details: "Core subjects: Physics, Chemistry, Mathematics, and Information Practices."
      },
      {
        degree: "Class X (Secondary Education)",
        institution: "SJR Kengeri Public School, Bengaluru",
        duration: "2021",
        details: "Strong academic foundation in science, mathematics, computer applications, and logical problem solving."
      }
    ],

    skills: {
      programming: ["Python (general & ML)", "Java (OOP)", "SQL (relational queries)", "JavaScript (ES6+)"],
      ai_ml: ["Python for ML", "NumPy (numerical computing)", "Pandas (data manipulation)", "Scikit-learn", "Matplotlib (visualization)"],
      web: ["HTML5", "CSS3", "JavaScript", "React.js", "REST APIs", "Responsive Web Design"],
      databases: ["MySQL", "MongoDB (NoSQL)", "PostgreSQL", "Cassandra (distributed NoSQL)", "Database Design & Schema Modeling"],
      tools: ["Git", "GitHub", "Docker", "Netlify", "Postman (API testing)"],
      ides: ["VS Code", "IntelliJ IDEA", "Google Colab", "Jupyter Notebook", "PyCharm"]
    },

    projects: [
      {
        title: "ShopSphere E-Commerce Platform",
        category: "Full Stack",
        stack: "React, Next.js, Node.js, Stripe API, PostgreSQL, Tailwind CSS",
        description: "A high-performance headless e-commerce store with instant product searching, Stripe checkout integration, session-based cart management, and inventory synchronization.",
        github: "https://github.com/Sonali15396/shopsphere"
      },
      {
        title: "TaskFlow AI Collaboration Board",
        category: "Frontend & UI",
        stack: "React 18, TypeScript, DnD-Kit, Zustand, OpenAI API, CSS Modules",
        description: "An interactive real-time Kanban management application with drag-and-drop mechanics, automated AI sprint task summarization, keyboard shortcuts, and dark mode.",
        github: "https://github.com/Sonali15396/taskflow-ai"
      },
      {
        title: "NovaPay Realtime FinTech Engine",
        category: "Full Stack",
        stack: "React, Express.js, MongoDB, Chart.js, WebSockets, JWT Auth",
        description: "A financial analytics dashboard delivering low-latency transaction tracking, currency conversion calculations, SVG dynamic charting, and exportable financial audits.",
        github: "https://github.com/Sonali15396/novapay-dashboard"
      },
      {
        title: "DevPulse Cloud Health Monitor",
        category: "Backend & DevOps",
        stack: "Python, Docker Engine API, Redis, FastAPI, Prometheus, Bash",
        description: "A container monitoring daemon and telemetry collector that aggregates CPU/Memory metrics across cluster nodes and streams live container logs.",
        github: "https://github.com/Sonali15396/devpulse-monitor"
      }
    ]
  };

  // ==========================================================================
  // 2. INTENT MATCHING & NATURAL LANGUAGE PROCESSOR
  // ==========================================================================
  function matchIntent(rawQuery) {
    const query = rawQuery.toLowerCase().trim();

    // Helper to test if any keyword in array exists in query (uses word boundary for short acronyms)
    const hasAny = (keywords) => keywords.some(k => {
      if (k.length <= 3) {
        return new RegExp(`\\b${k}\\b`, 'i').test(query);
      }
      return query.includes(k);
    });

    // Greeting
    if (/^(hi|hello|hey|greetings|hola|namaste|good (morning|afternoon|evening)|wassup|yo)\b/.test(query) || query === 'hi' || query === 'hello') {
      return {
        text: `Hello there! 👋 I am <strong>Ask Sonali</strong>, Sonali Gautam's AI portfolio assistant. <br><br>I can answer questions about her <strong>background</strong>, <strong>education</strong>, <strong>technical skills</strong>, <strong>projects</strong>, <strong>resume</strong>, or how to <strong>contact</strong> her! What would you like to explore?`,
        actions: [
          { text: "Who is Sonali?", prompt: "Who is Sonali?" },
          { text: "View Skills", prompt: "What are your skills?" },
          { text: "Show Projects", prompt: "Show me your projects" },
          { text: "Download Resume", prompt: "Can I download your resume?" }
        ]
      };
    }

    // Who is Sonali / About Me / Bio / Introduction
    if (hasAny(["who is sonali", "about sonali", "about you", "tell me about yourself", "who are you", "bio", "introduction", "background", "profile", "summary"])) {
      return {
        text: `<strong>${sonaliData.name}</strong> is an <strong>${sonaliData.headline}</strong> based in ${sonaliData.location}.<br><br>${sonaliData.bio}<br><br>✨ <strong>Current Status:</strong> ${sonaliData.status}`,
        actions: [
          { text: "View About Section", link: "#about" },
          { text: "Educational Background", prompt: "Tell me about your education" },
          { text: "Skills & Tech", prompt: "What are your skills?" },
          { text: "Contact Sonali", prompt: "How can I contact Sonali?" }
        ]
      };
    }

    // Education / College / Degree / University / GPA
    if (hasAny(["education", "college", "degree", "university", "school", "study", "gpa", "marks", "btech", "b.tech", "jain"])) {
      return {
        text: `Here is a summary of Sonali's academic background:<br>
        <ul>
          <li><strong>B.Tech in Information Science & Engineering</strong> (2023 – 2027) at <strong>JAIN (Deemed-to-be) University, Bengaluru</strong>.<br>Academic GPA: <strong>8.3 / 10</strong> (4th Year, 7th Semester).</li>
          <li><strong>Class XII (Higher Secondary)</strong> (2021 – 2023) at Sri Chaitanya Techno School, Bengaluru (Physics, Chemistry, Math, Information Practices).</li>
          <li><strong>Class X (Secondary Education)</strong> (2021) at SJR Kengeri Public School, Bengaluru.</li>
        </ul>
        Core subjects include <em>Data Structures & Algorithms, DBMS, Computer Networks, Software Engineering, Web Development, and Operating Systems</em>.`,
        actions: [
          { text: "Jump to Education", link: "#education" },
          { text: "What are your skills?", prompt: "What skills do you have?" },
          { text: "Download Resume", link: sonaliData.resumeUrl, download: "Sonali_Gautam_Resume.pdf" }
        ]
      };
    }

    // AI / Machine Learning Specific Skills
    if (hasAny(["ai", "machine learning", "ml", "numpy", "pandas", "scikit", "data analytics", "data analysis", "matplotlib"])) {
      return {
        text: `Sonali has strong foundations in <strong>Data Analytics and AI/ML technologies</strong>:<br>
        <ul>
          <li><strong>Python for Machine Learning:</strong> Developing intelligent models and data processing pipelines.</li>
          <li><strong>NumPy:</strong> High-performance numerical computing and multi-dimensional array operations.</li>
          <li><strong>Pandas:</strong> Data wrangling, cleaning, transformation, and structured dataset analysis.</li>
          <li><strong>Scikit-learn:</strong> Implementing machine learning algorithms (classification, regression, clustering).</li>
          <li><strong>Matplotlib:</strong> Data visualization, statistical plotting, and exploratory data analysis.</li>
        </ul>`,
        actions: [
          { text: "View All Skills", link: "#skills" },
          { text: "Show AI Projects", prompt: "Show me your projects" }
        ]
      };
    }

    // Programming Languages
    if (hasAny(["programming language", "languages", "python", "java", "sql", "coding"])) {
      return {
        text: `Sonali is proficient in the following core programming languages:<br>
        <ul>
          <li><strong>Python:</strong> General-purpose software development, data analytics, and machine learning.</li>
          <li><strong>Java:</strong> Object-Oriented Programming (OOP), algorithmic design, and enterprise paradigms.</li>
          <li><strong>SQL:</strong> Database queries, relational joins, aggregation, and data normalization.</li>
          <li><strong>JavaScript (ES6+):</strong> Modern asynchronous scripting, DOM manipulation, and interactive web features.</li>
        </ul>`,
        actions: [
          { text: "Web Tech Skills", prompt: "What web technologies do you use?" },
          { text: "Database Skills", prompt: "What databases do you know?" },
          { text: "View All Skills", link: "#skills" }
        ]
      };
    }

    // Web Technologies
    if (hasAny(["web", "react", "html", "css", "frontend", "api", "rest"])) {
      return {
        text: `For web engineering, Sonali works with modern frontend and web technologies:<br>
        <ul>
          <li><strong>HTML5 & CSS3:</strong> Semantic markup, responsive Flexbox/Grid layouts, and modern animations.</li>
          <li><strong>JavaScript (ES6+):</strong> Event-driven architecture, Fetch API, closures, and async/await.</li>
          <li><strong>React.js:</strong> Component-based architecture, hooks, state management, and SPAs.</li>
          <li><strong>REST APIs:</strong> Integration and consumption of HTTP web services and endpoints.</li>
        </ul>`,
        actions: [
          { text: "See Web Projects", prompt: "Show me your projects" },
          { text: "Jump to Skills", link: "#skills" }
        ]
      };
    }

    // Databases
    if (hasAny(["database", "db", "mysql", "mongodb", "postgresql", "postgres", "cassandra", "nosql", "schema"])) {
      return {
        text: `Sonali has experience working with both relational and distributed database systems:<br>
        <ul>
          <li><strong>MySQL:</strong> Relational schema design and complex SQL queries.</li>
          <li><strong>MongoDB:</strong> NoSQL document stores and JSON-based data modeling.</li>
          <li><strong>PostgreSQL:</strong> Advanced relational operations and reliable transactional storage.</li>
          <li><strong>Cassandra:</strong> Distributed, high-availability NoSQL database concepts.</li>
          <li><strong>Database Design:</strong> Schema normalization and entity relationship modeling.</li>
        </ul>`,
        actions: [
          { text: "View Skills Section", link: "#skills" },
          { text: "Tools & Cloud", prompt: "What tools do you use?" }
        ]
      };
    }

    // Tools & Cloud & Development Environments
    if (hasAny(["tool", "git", "github", "docker", "netlify", "postman", "vscode", "vs code", "intellij", "ide", "jupyter", "colab", "pycharm"])) {
      return {
        text: `Here are the key developer tools and environments Sonali uses:<br>
        <ul>
          <li><strong>Version Control:</strong> Git & GitHub (collaboration, branching, pull requests).</li>
          <li><strong>DevOps & Testing:</strong> Docker (containerization), Netlify (cloud deployment), and Postman (API testing).</li>
          <li><strong>IDEs & Editors:</strong> VS Code, IntelliJ IDEA, Google Colab, Jupyter Notebook, and PyCharm.</li>
        </ul>`,
        actions: [
          { text: "Jump to Skills", link: "#skills" },
          { text: "View Projects", link: "#projects" }
        ]
      };
    }

    // General Skills / Tech Stack
    if (hasAny(["skill", "stack", "tech", "technologies", "competencies", "what can you do"])) {
      return {
        text: `Sonali's technical competencies span across multiple domains:<br>
        <ul>
          <li><strong>Languages:</strong> Python, Java, SQL, JavaScript (ES6+)</li>
          <li><strong>AI / ML & Data:</strong> Python for ML, NumPy, Pandas, Scikit-learn, Matplotlib</li>
          <li><strong>Web Technologies:</strong> HTML5, CSS3, JavaScript, React.js, REST APIs</li>
          <li><strong>Databases:</strong> MySQL, MongoDB, PostgreSQL, Cassandra, Database Design</li>
          <li><strong>Tools & Cloud:</strong> Git, GitHub, Docker, Netlify, Postman</li>
          <li><strong>IDEs:</strong> VS Code, IntelliJ IDEA, Jupyter Notebook, Google Colab</li>
        </ul>`,
        actions: [
          { text: "Jump to Skills Section", link: "#skills" },
          { text: "Show Projects", prompt: "Show me your projects" },
          { text: "Download Resume", link: sonaliData.resumeUrl, download: "Sonali_Gautam_Resume.pdf" }
        ]
      };
    }

    // Projects / Portfolio Work
    if (hasAny(["project", "work", "portfolio", "shopsphere", "taskflow", "novapay", "devpulse", "repo", "github work"])) {
      return {
        text: `Here are Sonali's featured software engineering projects:<br><br>
        1. <strong>ShopSphere E-Commerce Platform</strong>: Headless e-commerce store with instant product searching, Stripe Checkout integration, session cart, and inventory sync. <em>(React, Next.js, Node.js, Stripe, PostgreSQL)</em><br><br>
        2. <strong>TaskFlow AI Collaboration Board</strong>: Interactive real-time Kanban management app with drag-and-drop workflows and AI sprint task summarization. <em>(React 18, TypeScript, DnD-Kit, Zustand, OpenAI API)</em><br><br>
        3. <strong>NovaPay Realtime FinTech Engine</strong>: Financial analytics dashboard delivering low-latency transaction tracking and SVG dynamic charting. <em>(React, Express, MongoDB, Chart.js, WebSockets)</em><br><br>
        4. <strong>DevPulse Cloud Health Monitor</strong>: Container monitoring daemon that aggregates CPU/Memory metrics across cluster nodes. <em>(Python, Docker Engine API, Redis, FastAPI, Prometheus)</em>`,
        actions: [
          { text: "View Projects on Page", link: "#projects" },
          { text: "Visit Sonali's GitHub", link: sonaliData.github, external: true }
        ]
      };
    }

    // Resume / CV
    if (hasAny(["resume", "cv", "curriculum vitae", "download resume", "pdf", "file"])) {
      return {
        text: `You can download Sonali Gautam's full, up-to-date resume in PDF format, containing detailed breakdowns of her education, skills, and project accomplishments.`,
        actions: [
          { text: "📥 Download PDF Resume", link: sonaliData.resumeUrl, download: "Sonali_Gautam_Resume.pdf", primary: true },
          { text: "👁 Preview in Browser", link: sonaliData.resumeUrl, external: true }
        ]
      };
    }

    // Contact / Phone / Email / Hire / Reach out
    if (hasAny(["contact", "reach", "email", "phone", "call", "message", "hire", "job", "internship", "interview", "opportunity", "connect"])) {
      return {
        text: `Sonali is open to internships, software engineering roles, and project collaborations! You can reach her directly through:<br>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:${sonaliData.email}">${sonaliData.email}</a></li>
          <li><strong>Phone:</strong> <a href="tel:${sonaliData.phone.replace(/\s+/g, '')}">${sonaliData.phone}</a></li>
          <li><strong>Location:</strong> ${sonaliData.location}</li>
          <li><strong>LinkedIn:</strong> <a href="${sonaliData.linkedin}" target="_blank" rel="noopener">linkedin.com/in/sonaligautam15</a></li>
          <li><strong>GitHub:</strong> <a href="${sonaliData.github}" target="_blank" rel="noopener">github.com/Sonali15396</a></li>
        </ul>`,
        actions: [
          { text: "Jump to Contact Form", link: "#contact" },
          { text: "Send an Email", link: `mailto:${sonaliData.email}`, primary: true },
          { text: "Connect on LinkedIn", link: sonaliData.linkedin, external: true }
        ]
      };
    }

    // LinkedIn / GitHub Socials
    if (hasAny(["linkedin", "github", "social", "profile", "link"])) {
      return {
        text: `Here are Sonali's professional profiles:<br>
        <ul>
          <li><strong>LinkedIn:</strong> <a href="${sonaliData.linkedin}" target="_blank" rel="noopener">linkedin.com/in/sonaligautam15</a></li>
          <li><strong>GitHub:</strong> <a href="${sonaliData.github}" target="_blank" rel="noopener">github.com/Sonali15396</a></li>
        </ul>`,
        actions: [
          { text: "Open LinkedIn", link: sonaliData.linkedin, external: true },
          { text: "Open GitHub", link: sonaliData.github, external: true }
        ]
      };
    }

    // Location / Where are you based
    if (hasAny(["where are you", "location", "city", "where do you live", "bangalore", "bengaluru", "india"])) {
      return {
        text: `Sonali is based in <strong>${sonaliData.location}</strong>. She is open to local opportunities as well as remote or relocation roles!`,
        actions: [
          { text: "How to Contact", prompt: "How can I contact Sonali?" }
        ]
      };
    }

    // Fallback response for unhandled queries
    return {
      text: `I'm not sure about that specific detail, but I'd love to help! You can ask me about Sonali's <strong>education</strong>, <strong>technical skills</strong>, <strong>projects</strong>, <strong>resume</strong>, or how to <strong>contact</strong> her.`,
      actions: [
        { text: "About Sonali", prompt: "Who is Sonali?" },
        { text: "View Education", prompt: "Tell me about your education" },
        { text: "Technical Skills", prompt: "What are your skills?" },
        { text: "Featured Projects", prompt: "Show me your projects" },
        { text: "Contact Info", prompt: "How do I contact Sonali?" }
      ]
    };
  }

  // ==========================================================================
  // 3. CHATBOT CONTROLLER & DOM INITIALIZATION
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    const launcher = document.getElementById('chatbot-launcher');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const clearBtn = document.getElementById('chatbot-clear');
    const messagesContainer = document.getElementById('chatbot-messages');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const chipsContainer = document.getElementById('chatbot-chips');

    if (!launcher || !chatWindow || !form || !input || !messagesContainer) {
      console.warn("Chatbot DOM elements not found on page.");
      return;
    }

    let isTyping = false;

    // Toggle Chat Window
    const toggleChat = () => {
      const isActive = chatWindow.classList.toggle('active');
      launcher.setAttribute('aria-expanded', isActive);
      if (isActive) {
        input.focus();
        scrollToBottom();
      }
    };

    launcher.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', toggleChat);

    // Scroll to Bottom Helper
    const scrollToBottom = () => {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 50);
    };

    // Format Current Time (e.g. 10:45 AM)
    const getTimeString = () => {
      const d = new Date();
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Append Message Bubble
    const appendMessage = (sender, content, actions = []) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${sender}`;

      const bubbleDiv = document.createElement('div');
      bubbleDiv.className = 'chat-msg-bubble';
      bubbleDiv.innerHTML = content;

      // If bot has action buttons
      if (actions && actions.length > 0) {
        const actionWrap = document.createElement('div');
        actionWrap.className = 'chat-action-buttons';

        actions.forEach(act => {
          const btn = document.createElement('a');
          btn.className = `chat-btn-action ${act.primary ? 'primary' : ''}`;
          btn.innerHTML = act.text;

          if (act.link) {
            btn.href = act.link;
            if (act.external) {
              btn.target = "_blank";
              btn.rel = "noopener noreferrer";
            }
            if (act.download) {
              btn.download = act.download;
            }
            btn.addEventListener('click', () => {
              if (act.link.startsWith('#')) {
                // Smooth scroll to section and close mobile drawer if open
                const target = document.querySelector(act.link);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
            });
          } else if (act.prompt) {
            btn.href = "javascript:void(0);";
            btn.addEventListener('click', () => {
              handleUserSubmit(act.prompt);
            });
          }

          actionWrap.appendChild(btn);
        });

        bubbleDiv.appendChild(actionWrap);
      }

      const timeDiv = document.createElement('div');
      timeDiv.className = 'chat-msg-time';
      timeDiv.textContent = getTimeString();

      msgDiv.appendChild(bubbleDiv);
      msgDiv.appendChild(timeDiv);
      messagesContainer.appendChild(msgDiv);

      scrollToBottom();
    };

    // Show Typing Indicator
    const showTyping = () => {
      isTyping = true;
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-typing-indicator';
      typingDiv.id = 'chat-typing-loader';
      typingDiv.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      `;
      messagesContainer.appendChild(typingDiv);
      scrollToBottom();
    };

    // Remove Typing Indicator
    const hideTyping = () => {
      isTyping = false;
      const typingDiv = document.getElementById('chat-typing-loader');
      if (typingDiv) {
        typingDiv.remove();
      }
    };

    // Conversation history for the AI
let chatHistory = [];

// Handle User Message Submission
const handleUserSubmit = async (userText) => {
  const text = (userText || input.value || '').trim();

  if (!text || isTyping) return;

  // Add user message to the UI
  appendMessage('user', escapeHTML(text));
  input.value = '';

  // Show typing indicator
  showTyping();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        history: chatHistory
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong.');
    }

    const reply = data.reply || "Sorry, I couldn't generate a response.";

    // Save conversation for context
    chatHistory.push({
      role: 'user',
      content: text
    });

    chatHistory.push({
      role: 'assistant',
      content: reply
    });

    // Keep only the latest 10 messages
    chatHistory = chatHistory.slice(-10);

    hideTyping();

    // Display AI response
    appendMessage('bot', escapeHTML(reply));

  } catch (error) {
    console.error('Chatbot error:', error);

    hideTyping();

    appendMessage(
      'bot',
      "Sorry, I'm having trouble connecting to my AI service right now. Please try again in a moment."
    );
  }
};

    // Form Submit Event
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit();
    });

    // Suggestion Chips Click Handling
    if (chipsContainer) {
      chipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.chat-chip');
        if (chip) {
          const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
          handleUserSubmit(prompt);
        }
      });
    }

    // Clear Chat Button
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        messagesContainer.innerHTML = '';
        appendInitialGreeting();
      });
    }

    // Escape HTML to prevent injection
    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }

    // Initial Bot Greeting
    const appendInitialGreeting = () => {
      const greetingHTML = `Hi! I'm <strong>Ask Sonali</strong>, your personal AI assistant. 
      Ask me anything about Sonali's <strong>education</strong>, <strong>skills</strong>, <strong>projects</strong>, or how to <strong>get in touch</strong>!`;
      const initialActions = [
        { text: "👋 Who is Sonali?", prompt: "Who is Sonali?" },
        { text: "🎓 Education", prompt: "Tell me about your education" },
        { text: "💻 Skills", prompt: "What are your skills?" },
        { text: "🚀 Projects", prompt: "Show me your projects" }
      ];
      appendMessage('bot', greetingHTML, initialActions);
    };

    // Populate Initial Greeting
    appendInitialGreeting();
  });
})();
