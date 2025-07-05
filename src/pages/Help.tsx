import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ResearchGuidePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 text-gray-800">

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section className="bg-white p-8 rounded-xl shadow-md border-l-8 border-blue-400">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Why Do Undergraduate Research?</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Learn how science and innovation really happen, beyond the classroom.</li>
            <li>Develop hands-on skills in labs, design studios, or coding environments.</li>
            <li>Work closely with faculty mentors and potentially earn strong recommendation letters.</li>
            <li>Build your resume and stand out for jobs, grad school, or med school.</li>
            <li>Present at conferences or contribute to real-world discoveries.</li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-md border-l-8 border-purple-400">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">How to Get Started</h2>
          <ol className="list-decimal list-inside text-gray-800 space-y-3 pl-5">
            <li>
              <strong>Browse Faculty:</strong> Look through department directories or research centers for professors doing work that interests you. See the <Link to="/guides" className="text-blue-600 underline">full guide</Link>.
            </li>
            <li>
              <strong>Shortlist Faculty:</strong> Make a list of 3-5 whose work aligns with your interests, even if it&apos;s outside your major.
            </li>
            <li>
              <strong>Send a Thoughtful Email:</strong> Introduce yourself, explain your interest, and include:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>Your name, year, and major</li>
                <li>Your career goals</li>
                <li>Why their specific work excites you</li>
                <li>Your availability (at least 7-10 hours/week)</li>
                <li>Your resume and unofficial transcript</li>
              </ul>
              <div className="mt-2">
                Need help? See <Link to="/email-tips" className="text-blue-600 underline">email tips &amp; templates</Link>.
              </div>
            </li>
            <li>
              <strong>Follow Up:</strong> If you don&apos;t hear back in 1-2 weeks, politely follow up or try another faculty member.
            </li>
          </ol>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-md border-l-8 border-green-400">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Ways to Participate</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li><strong>Volunteer:</strong> Great for gaining initial experience.</li>
            <li><strong>Course Credit:</strong> Some schools offer special research courses or capstone projects (like 3396/4396).</li>
            <li><strong>Honors Thesis:</strong> A structured research project over 2 semesters with a formal write-up.</li>
            <li><strong>Summer Programs:</strong> Look into REUs, SURF, PURS, or faculty-led grants.</li>
            <li><strong>Work Study:</strong> If eligible, you may get paid through federal work study programs for research roles.</li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-md border-l-8 border-pink-400">
          <h2 className="text-2xl font-bold text-pink-900 mb-4">Next Steps</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Start browsing labs and departments now - don&apos;t wait for someone to tell you.</li>
            <li>Craft a tailored message to 2-3 faculty members this week.</li>
            <li>Ask peers or mentors if they&apos;ve done research - they might connect you.</li>
            <li>Be consistent and professional. Professors respect initiative and reliability.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ResearchGuidePage;
