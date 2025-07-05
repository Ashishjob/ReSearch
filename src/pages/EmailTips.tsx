import React from "react";

export default function EmailTipsPage() {
  return (
    <main className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Emailing Professors for Research</h1>
        <p className="mb-4 text-gray-700">
          Reaching out to a professor can be intimidating, but a well-crafted email can open doors to incredible opportunities. Here's how to write emails that get responses and make a great first impression.
        </p>

        <div className="bg-orange-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-orange-900 mb-2">The Reality Check</h3>
          <p className="text-orange-800 text-sm">
            Professors receive dozens of emails daily. Many are generic, poorly written, or show no understanding of their work. Your goal is to stand out by being thoughtful, specific, and genuine. A good email shows you're serious about research, not just looking for easy credits.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Do Your Homework First</h2>
        <p className="text-gray-700 mb-4">
          Before you type a single word, research the professor and their work. This isn't just about being polite - it's about showing you're genuinely interested and serious about research.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-2">Research checklist:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Read their faculty profile and current research interests</li>
            <li>• Look at 2-3 recent publications (don't worry if you don't understand everything)</li>
            <li>• Check if they've mentioned taking new students recently</li>
            <li>• Look at their lab website if they have one</li>
            <li>• See if any current students have similar backgrounds to yours</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Keep It Concise</h2>
        <p className="text-gray-700 mb-4">
          Professors are busy. Your email should be easy to scan and get to the point quickly. Aim for 3-4 short paragraphs that can be read in under a minute.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Personalize Your Message</h2>
        <p className="text-gray-700 mb-4">
          Generic emails get deleted. Mention something specific about their research that genuinely interests you. This shows you've done your homework and aren't just mass-emailing every professor in the department.
        </p>
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-2 text-red-900">Avoid these red flags:</h4>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• "Dear Professor" (use their actual name)</li>
            <li>• "I'm very interested in your research" (be specific about what interests you)</li>
            <li>• "I need research experience for my resume" (focus on learning, not just credentials)</li>
            <li>• Obvious copy-paste emails with wrong names or details</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Be Clear About Your Intent</h2>
        <p className="text-gray-700 mb-4">
          Say exactly what you're looking for. Are you hoping to volunteer? Earn course credit? Get paid? How many hours per week can you commit? When can you start? Clarity helps professors understand how you might fit into their lab.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Include a Resume</h2>
        <p className="text-gray-700 mb-4">
          Always attach a one-page resume in PDF format. Even if you feel like you don't have much experience, include relevant coursework, projects, work experience, and any technical skills. Keep it clean and professional.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Follow Up (But Don't Be Annoying)</h2>
        <p className="text-gray-700 mb-4">
          If you don't hear back within a week, it's okay to send a brief follow-up. After that, move on. Professors may not respond for many reasons that have nothing to do with you personally.
        </p>

        <div className="mt-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">Sample Email Templates</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Template 1: STEM Research</h4>
            <div className="bg-white p-4 rounded text-sm text-gray-800">
              <p className="font-medium">Subject: Undergraduate Interest in Your Computational Biology Lab</p>
              <p className="mt-2">Dear Professor [Last Name],</p>
              <p className="mt-2">
                My name is [Your Name], and I'm a sophomore studying Computer Science at UH. I recently came across your paper on protein folding prediction using machine learning, and I'm fascinated by how computational methods can solve complex biological problems.
              </p>
              <p className="mt-2">
                I'm particularly interested in your work with neural networks for structural prediction. I've completed coursework in data structures, algorithms, and I'm currently taking machine learning. I'd love to contribute to your research lab and learn more about computational biology.
              </p>
              <p className="mt-2">
                I'm hoping to volunteer 8-10 hours per week this semester and could potentially enroll in research credits next semester. I've attached my resume and would welcome the opportunity to discuss how I might contribute to your research.
              </p>
              <p className="mt-2">
                Thank you for your time and consideration.
              </p>
              <p className="mt-2">Best regards,<br />[Your Name]<br />[Your Phone]<br />[Your Email]</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Template 2: Social Sciences</h4>
            <div className="bg-white p-4 rounded text-sm text-gray-800">
              <p className="font-medium">Subject: Interest in Your Research on Educational Policy</p>
              <p className="mt-2">Dear Dr. [Last Name],</p>
              <p className="mt-2">
                I'm [Your Name], a junior studying Psychology with a minor in Education at UH. Your research on the impact of school funding on student achievement really resonates with me, especially having grown up in an underfunded school district.
              </p>
              <p className="mt-2">
                I'm particularly interested in your recent study on teacher retention rates and would love to learn more about your research methods in educational policy analysis. I have experience with SPSS and qualitative coding from my research methods courses.
              </p>
              <p className="mt-2">
                I'm looking to get involved in research and could commit 6-8 hours per week. I'm especially interested in data collection and analysis, and I'd be excited to contribute to your ongoing projects.
              </p>
              <p className="mt-2">
                I've attached my resume and would appreciate the opportunity to discuss your research further.
              </p>
              <p className="mt-2">Sincerely,<br />[Your Name]</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">Template 3: Humanities</h4>
            <div className="bg-white p-4 rounded text-sm text-gray-800">
              <p className="font-medium">Subject: Undergraduate Interest in Your Digital Humanities Project</p>
              <p className="mt-2">Dear Professor [Last Name],</p>
              <p className="mt-2">
                I'm [Your Name], a sophomore studying English Literature at UH. I attended your recent talk on using digital tools to analyze Victorian novels, and I'm excited about how technology can reveal new insights in literary analysis.
              </p>
              <p className="mt-2">
                Your project on mapping character networks in 19th-century fiction aligns perfectly with my interests in both literature and data visualization. I have experience with Python and have been teaching myself network analysis tools.
              </p>
              <p className="mt-2">
                I'd love to contribute to your digital humanities research and could dedicate 5-7 hours per week to the project. I'm particularly interested in learning more about computational text analysis and would be eager to help with data preparation or visualization.
              </p>
              <p className="mt-2">
                Thank you for considering my interest. I've attached my resume and look forward to hearing from you.
              </p>
              <p className="mt-2">Best,<br />[Your Name]</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-green-900 mb-2">Pro Tips</h3>
          <ul className="text-sm text-green-800 space-y-2">
            <li>• Send emails Tuesday-Thursday, 10 AM-2 PM for best response rates</li>
            <li>• Use a professional email address (avoid nicknames or numbers)</li>
            <li>• Proofread carefully - typos suggest carelessness</li>
            <li>• Consider emailing graduate students first; they're often more accessible</li>
            <li>• If you get a "no," ask if they can recommend someone else</li>
            <li>• Keep your initial email focused on one professor and one lab</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">What Happens Next?</h3>
          <p className="text-blue-800 text-sm mb-2">
            If a professor is interested, they might:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Invite you for a brief meeting to discuss expectations</li>
            <li>• Ask you to read specific papers before meeting</li>
            <li>• Connect you with a graduate student who will be your direct mentor</li>
            <li>• Suggest you attend lab meetings before making a commitment</li>
            <li>• Offer a small trial project to see if you're a good fit</li>
          </ul>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">Remember</h3>
          <p className="text-yellow-800 text-sm">
            Your email is your first impression. Make it count by being genuine, specific, and professional. The goal isn't just to get a response - it's to start a meaningful research relationship that will benefit both you and the lab.
          </p>
        </div>
      </div>
    </main>
  );
}