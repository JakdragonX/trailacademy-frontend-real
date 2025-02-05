export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Homeschool Parent",
      quote:
        "Trail has revolutionized our homeschooling experience. The AI-generated courses are engaging and save me hours of planning time.",
    },
    {
      name: "Alex M.",
      role: "Self-Taught Developer",
      quote:
        "I used Trail to create a personalized coding bootcamp from various resources. The AI-powered study tools helped me stay on track and master complex concepts.",
    },
    {
      name: "Dr. Emily R.",
      role: "University Professor",
      quote:
        "Trail's ability to generate courses from academic papers and textbooks has greatly enhanced my students' learning experience. It's a game-changer in higher education.",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#2D4F1E]/10" />
      <div className="container mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] shadow-lg hover:transform hover:scale-105 transition-all duration-300 border-l-4 border-[#8B4513] border-opacity-50"
            >
              <p className="mb-4 italic text-gray-700">"{testimonial.quote}"</p>
              <div className="border-t border-[#2D4F1E]/20 pt-4">
                <p className="font-semibold text-[#2D4F1E]">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

