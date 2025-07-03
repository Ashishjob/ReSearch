import { Lightbulb } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-800">

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        <section>
          <h2 className="text-3xl font-bold text-yellow-800 mb-6">Why This Exists</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            This site was built to solve a very real, very common issue: students were struggling to find research opportunities. Whether it was outdated websites, scattered information, or unclear entry points — the barrier wasn&apos;t a lack of interest, but a lack of access.
          </p>
          <p className="text-lg text-gray-700 mt-6 leading-relaxed">
            Originally, it started as a personal blog post listing known research labs at UH. After receiving a steady stream of messages asking for guidance, I realized a static list wasn&apos;t enough. This site was created to make that information easier to find, easier to update, and easier to act on.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-yellow-800 mb-6">Who It&apos;s For</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            This site is for any undergraduate student — regardless of major — who is curious about research. Whether you&apos;re exploring new interests or already have a clear path in mind, this resource is designed to help you navigate that journey. No prior experience required.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-yellow-800 mb-6">What You Can Do Here</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-3">
            <li>Browse local and national undergraduate research programs</li>
            <li>Learn how to find labs, write outreach emails, and follow up professionally</li>
            <li>Understand the difference between volunteering, funded research, and academic credit</li>
            <li>Start your search with real examples and faculty connections</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-yellow-800 mb-6">How You Can Contribute</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you know of an opportunity not yet listed — a lab, program, or fellowship — please share it. This is a community-driven tool that gets better the more students contribute. You can reach me directly through the links in the footer.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-yellow-800 mb-6">Built by Ashish</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            I'm Ashish — a developer, researcher, and lifelong learner. I created this project to streamline how students find meaningful work beyond the classroom. Whether you&apos;re exploring, applying, or just curious, I hope this site helps you take the next step.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;