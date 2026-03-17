import { motion } from 'framer-motion'

const OurStory = () => {
  const milestones = [
    {
      date: "1st June 2025",
      title: "The Beginning",
      description: "The day it all started. A simple hello that turned into the most beautiful journey of my life.",
      icon: "✨"
    },
    {
      date: "12th September 2025",
      title: "First Walk",
      description: "That shy, nervous walk side by side where I realized just how much you mean to me.",
      icon: "🚶‍♀️‍➡️"
    },
    {
      date: "17th December 2025",
      title: "First Kiss",
      description: "A moment where time stopped and everything just felt perfect. I'll never forget it.",
      icon: "💋"
    },
    {
      date: "21st December 2025",
      title: "First Date",
      description: "Our official first date. Laughs, nervous energy, and the feeling that this was the start of something forever.",
      icon: "🕯️"
    },
    {
      date: "14th February 2026",
      title: "Valentine's Day",
      description: "A night of pure love, connection, and becoming even closer. The best Valentine's Day ever.",
      icon: "💖"
    },
    {
      date: "14th March 2026",
      title: "First Month Together",
      description: "One month of us. Every day is a gift, and I'm so excited for all the months and years to come.",
      icon: "📅"
    },
    {
      date: "Today",
      title: "Still Growing",
      description: "Every day with you is a new favorite chapter in our never-ending story. I love you.",
      icon: "🌻"
    }
  ]

  return (
    <div className="paper p-8">
      <div className="hand text-3xl mb-10 text-center">Our Story So Far ❤️</div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-[#ffda1a] -translate-x-1/2 opacity-30" />

        <div className="space-y-12">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full relative ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              {/* Content */}
              <div className="w-full md:w-5/12 pl-14 md:pl-0">
                <div className={`paper p-4 tape ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="hand text-sm opacity-60 mb-1">{item.date}</div>
                  <div className="hand text-xl text-[#7a5c00] mb-2">{item.title}</div>
                  <div className="text-sm opacity-80">{item.description}</div>
                </div>
              </div>

              {/* Icon */}
              <div className="absolute left-6 md:static md:mx-auto z-10 w-12 h-12 rounded-full bg-white border-4 border-[#ffb300] flex items-center justify-center text-2xl shadow-md -translate-x-1/2 md:translate-x-0">
                {item.icon}
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurStory
