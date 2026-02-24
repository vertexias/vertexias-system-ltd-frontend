import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Clock, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'EduWave – SaaS Learning Management Platform',
    description:
      'An SaaS LMS platform where students can purchase courses, teachers manage content, and admins control the ecosystem, teachers and students can contact by chatting within the website. Features include course marketplace, role-based dashboards (Admin, Teacher, Student), and scalable architecture for future expansion.',
    tags: ['Next.Js', 'NestJS', 'PostgreSQL', 'TypeORM'],
    status: 'Ongoing',
    image: '/eduwave.png',
  },
  {
    title: 'eSports Tournament Management System',
    description:
      'A SaaS platform designed to organize and manage online and offline eSports tournaments. Includes player registration, team management, match scheduling, bracket automation, and real-time result tracking with admin control panels.',
    tags: ['React', '.NET Core', 'PostgreSQL', 'EF Core'],
    status: 'Ongoing',
    image: '/game.webp',
  },
  {
    title: 'E-commerce System Web Application',
    description:
      'A full-featured e-commerce web application for managing online retail operations. Includes product catalog management, shopping cart, order processing, payment integration, and an admin dashboard for inventory and user management.',
    tags: ['PHP', 'Apache', 'Bootstrap 5', 'JavaScript'],
    status: 'Ongoing',
    image: '/ecommerce.png',
  },
  {
    title: 'Pharmacy Management Desktop Application',
    description:
      'A comprehensive desktop application for pharmacy management. Features include product inventory, sales tracking, purchase orders, billing, user roles, and reporting tools for efficient pharmacy operations.',
    tags: ['C#', '.NET Framework', 'SQL Server', 'Winforms'],
    status: 'Completed',
    image: '/pharmacy.png',
  },
];

export const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="portfolio" className="py-28 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Building the Future, Project by Project
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here’s a glimpse of the SaaS platforms we are currently engineering —
              focused on scalability, performance, and real-world impact.
            </p>
          </div>

          {/* Projects */}
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project) => {
              const isCompleted = project.status === 'Completed';

              return (
                <div
                  key={project.title}
                  className="group bg-card/70 backdrop-blur-lg rounded-3xl p-8 border border-border/40 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title + Status */}
                  <div className="flex justify-between items-start mb-5">
                    <h3 className="text-2xl font-semibold text-foreground leading-snug">
                      {project.title}
                    </h3>

                    <span
                      className={`flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border
                        ${
                          isCompleted
                            ? 'bg-green-500/10 text-green-600 border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                        }`}
                    >
                      {isCompleted ? <BadgeCheck size={14} /> : <Clock size={14} />}
                      {project.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button variant="heroOutline" size="lg">
              More Projects Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};