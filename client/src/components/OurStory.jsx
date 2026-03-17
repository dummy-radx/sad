import { motion } from 'framer-motion'

const OurStory = () => {
  const milestones = [
    {
      date: "August 2023",
      title: "The Beginning",
      description: "That first conversation that changed everything and started this beautiful journey.",
      icon: "💬"
    },
    {
      date: "October 2023",
      title: "First Date",
      description: "Coffee, laughs, and the moment I knew you were someone extremely special.",
      icon: "☕"
    },
    {
      date: "December 2023",
      title: "First Trip",
      description: "Exploring new places and finding a home in each other's presence.",
      icon: "🚗"
    },
    {
      date: "January 2024",
      title: "New Year's Eve",
      description: "Starting the year with the person who makes every second count.",
      icon: "🎆"
    },
    {
      date: "February 2024",
      title: "Valentine's Day",
      description: "Celebrating love and the fact that I get to call you mine.",
      icon: "💝"
    },
    {
      date: "September 2024",
      title: "First Anniversary",
      description: "365 days of growth, laughter, and building our own little world.",
      icon: "💍"
    },
    {
      date: "Today",
      title: "Still Growing",
      description: "Every day with you is a new favorite chapter in our never-ending story.",
      icon: "🌻"
    }
  ]

  return (
    <div className="paper p-8">
      <div className="hand text-3xl mb-10 text-center">Our Story So Far ❤️</div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#ffda1a] -translate-x-1/2 opacity-30" />

        <div className="space-y-12">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex items-center justify-between w-full ${
                index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Content */}
              <div className="w-5/12">
                <div className={`paper p-4 tape ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="hand text-sm opacity-60 mb-1">{item.date}</div>
                  <div className="hand text-xl text-[#7a5c00] mb-2">{item.title}</div>
                  <div className="text-sm opacity-80">{item.description}</div>
                </div>
              </div>

              {/* Icon */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-[#ffb300] flex items-center justify-center text-2xl shadow-md">
                {item.icon}
              </div>

              {/* Spacer */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurStory
