/* Multi-step form definitions. Every wizard posts to /api/lead, which upserts the contact in
   GoHighLevel with the listed tags and writes the answers into a contact note. */

export type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "radio" | "chips";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  half?: boolean;
  hint?: string;
};
export type Step = { title: string; blurb?: string; fields: Field[] };
export type WizardConfig = {
  id: string;
  intent: string;
  tags: string[];
  eyebrow: string;
  title: string;
  steps: Step[];
  submitLabel: string;
  success: { title: string; body: string };
};

const you = (extra: Field[] = []): Step => ({
  title: "About you",
  blurb: "So the WG team can follow up.",
  fields: [
    { name: "name", label: "Full name", type: "text", required: true, half: true, placeholder: "First and last" },
    { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
    { name: "phone", label: "Phone (optional)", type: "tel", half: true, placeholder: "(808) 555-0100" },
    ...extra,
  ],
});

export const leagueFinder: WizardConfig = {
  id: "find-your-league",
  intent: "league-interest",
  tags: ["leagues"],
  eyebrow: "Find your league",
  title: "Tell us how you play.",
  steps: [
    {
      title: "Your game",
      blurb: "Pick everything you would show up for.",
      fields: [
        { name: "games", label: "Games you are into", type: "chips", required: true, options: ["Valorant", "League of Legends", "Rocket League", "Super Smash Bros.", "Street Fighter 6", "Overwatch 2", "Marvel Rivals", "Something else"] },
        { name: "platform", label: "Platform", type: "radio", required: true, options: ["PC", "Console", "Either"] },
      ],
    },
    {
      title: "Your schedule",
      blurb: "Leagues are built around real-life hours.",
      fields: [
        { name: "availability", label: "When can you play?", type: "radio", required: true, options: ["Weeknights", "Weekends", "Flexible"] },
        { name: "level", label: "How competitive?", type: "radio", required: true, options: ["Casual, here for the people", "Competitive, I want to win", "Ranked grinder"] },
        { name: "squad", label: "Coming solo or with a team?", type: "radio", required: true, options: ["Solo, place me on a team", "I have a full team", "Partial team, need a few"] },
      ],
    },
    you([{ name: "discord", label: "Discord handle (optional)", type: "text", half: true, placeholder: "username" }]),
  ],
  submitLabel: "Find my league",
  success: { title: "You are on the list.", body: "The WG team will reach out when a league that fits your games and schedule opens. Hop in Discord in the meantime to meet the squad." },
};

export const companyPlay: WizardConfig = {
  id: "company",
  intent: "company",
  tags: ["company-play"],
  eyebrow: "Bring WG to work",
  title: "Let’s plan company play.",
  steps: [
    {
      title: "Your company",
      fields: [
        { name: "company", label: "Company name", type: "text", required: true, half: true },
        { name: "role", label: "Your role", type: "text", required: true, half: true, placeholder: "HR, team lead, founder..." },
        { name: "team_size", label: "How many people?", type: "radio", required: true, options: ["Under 20", "20 to 100", "100+"] },
      ],
    },
    {
      title: "What you have in mind",
      fields: [
        { name: "formats", label: "Formats", type: "chips", required: true, options: ["Company league", "One-day tournament", "Team game night", "Company vs. company", "Branded event"] },
        { name: "timeline", label: "Timeline", type: "radio", required: true, options: ["Next 30 days", "This quarter", "Just exploring"] },
      ],
    },
    you(),
  ],
  submitLabel: "Start the conversation",
  success: { title: "Talk soon.", body: "The WG team will follow up with formats and dates that fit your crew." },
};

export const getInvolved: WizardConfig = {
  id: "apply",
  intent: "get-involved",
  tags: ["career-hub"],
  eyebrow: "Get involved",
  title: "Find your role with WG.",
  steps: [
    {
      title: "Your path",
      blurb: "Our current focus is volunteers, interns, and contractors.",
      fields: [{ name: "path", label: "How do you want to get involved?", type: "radio", required: true, options: ["Volunteer", "Internship", "Contractor"] }],
    },
    {
      title: "Roles that fit",
      fields: [
        { name: "roles", label: "Pick all that interest you", type: "chips", required: true, options: ["Match referee", "Community moderator", "Player support", "Caster + commentator", "Technical director", "Video editor", "Graphic designer", "Event operations", "Something else"] },
        { name: "availability", label: "Availability", type: "radio", required: true, options: ["A few hours a month", "Weekly", "Event days only"] },
      ],
    },
    you([
      { name: "portfolio", label: "Portfolio or LinkedIn (optional)", type: "url", half: true, placeholder: "https://" },
      { name: "experience", label: "Experience or what you want to learn", type: "textarea", placeholder: "A few sentences is plenty." },
    ]),
  ],
  submitLabel: "Send my application",
  success: { title: "Application in.", body: "Thanks for raising your hand. The WG team reviews every application and will reach out about next steps." },
};

export const partnerInquiry: WizardConfig = {
  id: "partner-form",
  intent: "partner",
  tags: ["partnership"],
  eyebrow: "Let’s build something good",
  title: "Tell us what your brand has in mind.",
  steps: [
    {
      title: "Your brand",
      fields: [
        { name: "company", label: "Business name", type: "text", required: true, half: true },
        { name: "website", label: "Website", type: "url", half: true, placeholder: "https://" },
        { name: "role", label: "Your role", type: "text", required: true, half: true, placeholder: "Marketing, owner, community lead..." },
      ],
    },
    {
      title: "Partnership interests",
      fields: [
        { name: "interests", label: "What are you interested in?", type: "chips", required: true, options: ["Sponsorship", "Company league", "Event partnership", "Broadcast + production", "Prizing + product", "Venue or space"] },
        { name: "budget", label: "Budget range", type: "radio", options: ["Under $1,000", "$1,000 to $5,000", "$5,000+", "Not sure yet"] },
      ],
    },
    you([{ name: "message", label: "Anything else?", type: "textarea", placeholder: "Goals, timing, ideas." }]),
  ],
  submitLabel: "Start the conversation",
  success: { title: "Received.", body: "The WG team will review your inquiry and reach out to set up a discovery call." },
};

export const contact: WizardConfig = {
  id: "contact",
  intent: "contact",
  tags: ["contact"],
  eyebrow: "Contact WG",
  title: "What can we help with?",
  steps: [
    {
      title: "Your topic",
      fields: [
        { name: "topic", label: "Topic", type: "radio", required: true, options: ["Leagues", "Tournaments", "Events", "Volunteering", "Partnership", "Something else"] },
        { name: "message", label: "Your message", type: "textarea", required: true, placeholder: "Tell us what is on your mind." },
      ],
    },
    you(),
  ],
  submitLabel: "Send message",
  success: { title: "Message sent.", body: "Thanks for reaching out. Someone from the WG team will get back to you." },
};
