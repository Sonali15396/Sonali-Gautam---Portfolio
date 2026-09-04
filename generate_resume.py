import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

os.makedirs('assets/docs', exist_ok=True)
doc = SimpleDocTemplate(
    'assets/docs/resume.pdf',
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

primary_color = colors.HexColor('#2563eb')
dark_text = colors.HexColor('#1e293b')
gray_text = colors.HexColor('#64748b')

name_style = ParagraphStyle('Name', fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=primary_color)
title_style = ParagraphStyle('Title', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=gray_text)
contact_style = ParagraphStyle('Contact', fontName='Helvetica', fontSize=9, leading=13, textColor=dark_text)
heading_style = ParagraphStyle('Heading', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=primary_color, spaceBefore=7, spaceAfter=3)
subheading_style = ParagraphStyle('Subheading', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=dark_text)
body_style = ParagraphStyle('Body', fontName='Helvetica', fontSize=9, leading=13, textColor=dark_text)
bullet_style = ParagraphStyle('Bullet', fontName='Helvetica', fontSize=8.5, leading=12, textColor=dark_text, leftIndent=12)

story = []

# Header
story.append(Paragraph('SONALI GAUTAM', name_style))
story.append(Paragraph('ASPIRING SOFTWARE ENGINEER | DATA ANALYTICS ENTHUSIAST', title_style))
story.append(Spacer(1, 4))
contact_info = 'Email: gautamsonali326@gmail.com &nbsp;|&nbsp; Phone: +91 9008536461 &nbsp;|&nbsp; Location: Bengaluru, Karnataka, India<br/>LinkedIn: linkedin.com/in/sonaligautam15 &nbsp;|&nbsp; GitHub: github.com/Sonali15396'
story.append(Paragraph(contact_info, contact_style))
story.append(Spacer(1, 4))
story.append(HRFlowable(width='100%', thickness=1.5, color=primary_color, spaceBefore=4, spaceAfter=6))

# Summary
story.append(Paragraph('PROFESSIONAL SUMMARY', heading_style))
summary_text = 'Motivated and enthusiastic Information Science engineering student with a strong passion for software development, web technologies, and data analytics. Adept at turning ideas into intuitive, functional digital experiences, with solid foundation in algorithms, databases, and modern programming languages. Eager to contribute to forward-thinking engineering teams.'
story.append(Paragraph(summary_text, body_style))
story.append(Spacer(1, 4))

# Education
story.append(Paragraph('EDUCATION', heading_style))
story.append(Paragraph('Bachelor of Technology in Information Science & Engineering &nbsp;|&nbsp; JAIN (Deemed-to-be) University, Bengaluru <font color="#64748b">(2023 - 2027)</font>', subheading_style))
story.append(Paragraph('&bull; Academic Performance: GPA: 8.3 / 10 &nbsp;|&nbsp; 4th Year, 7th Semester', bullet_style))
story.append(Paragraph('&bull; Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Computer Networks, Software Engineering, Web Development, Operating Systems.', bullet_style))
story.append(Spacer(1, 3))

story.append(Paragraph('Class XII (Higher Secondary) &nbsp;|&nbsp; Sri Chaitanya Techno School, Bengaluru <font color="#64748b">(2021 - 2023)</font>', subheading_style))
story.append(Paragraph('&bull; Core Focus: Physics, Chemistry, Mathematics, Information Practices', bullet_style))
story.append(Spacer(1, 3))

story.append(Paragraph('Class X (Secondary Education) &nbsp;|&nbsp; SJR Kengeri Public School, Bengaluru <font color="#64748b">(2021)</font>', subheading_style))
story.append(Paragraph('&bull; Foundation: Mathematics, Science, Computer Applications, Logical Reasoning', bullet_style))
story.append(Spacer(1, 4))

# Technical Skills
story.append(Paragraph('TECHNICAL SKILLS', heading_style))
skills_data = [
    [Paragraph('<b>Languages:</b>', body_style), Paragraph('Python, Java, SQL, JavaScript (ES6+)', body_style)],
    [Paragraph('<b>AI / ML & Data:</b>', body_style), Paragraph('Python for ML, NumPy, Pandas, Scikit-learn, Matplotlib, Data Visualization', body_style)],
    [Paragraph('<b>Web Tech:</b>', body_style), Paragraph('HTML5, CSS3, JavaScript, React.js, RESTful APIs, Responsive Web Design', body_style)],
    [Paragraph('<b>Databases:</b>', body_style), Paragraph('MySQL, MongoDB, PostgreSQL, Database Design, Cassandra', body_style)],
    [Paragraph('<b>Tools & Cloud:</b>', body_style), Paragraph('Git, GitHub, Docker, Netlify, Postman, VS Code, IntelliJ IDEA, Jupyter', body_style)]
]
t = Table(skills_data, colWidths=[95, 445])
t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
story.append(t)
story.append(Spacer(1, 4))

# Featured Projects
story.append(Paragraph('KEY PROJECTS', heading_style))
story.append(Paragraph('&bull; <b>ShopSphere E-Commerce Platform:</b> Headless e-commerce platform built with React, Next.js, Node.js, and PostgreSQL featuring search, responsive catalog, and Stripe integration.', bullet_style))
story.append(Paragraph('&bull; <b>TaskFlow AI Collaboration Board:</b> Interactive Kanban board with drag-and-drop task workflows, AI-assisted summaries, and real-time state management.', bullet_style))
story.append(Paragraph('&bull; <b>NovaPay FinTech Analytics Engine:</b> Real-time analytics dashboard with dynamic charting, currency conversions, and secure authenticated endpoints.', bullet_style))
story.append(Paragraph('&bull; <b>DevPulse Cloud Health Monitor:</b> Container infrastructure monitoring tool aggregating CPU/memory metrics and streaming logs using Python and FastAPI.', bullet_style))

doc.build(story)
print('Sonali Gautam resume generated successfully at assets/docs/resume.pdf')
