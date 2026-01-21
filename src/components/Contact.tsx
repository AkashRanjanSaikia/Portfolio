import { Github, Linkedin, Mail } from "lucide-react";
import Twitter from "@/components/ui/twitter";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@johndoe.dev", label: "Email" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6">
            Let's work together
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Have a project in mind? I'd love to hear about it. Send me a message 
            and let's create something amazing together.
          </p>

          <a
            href="mailto:hello@johndoe.dev"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-base font-medium hover:bg-primary/90 transition-colors mb-12"
          >
            <Mail className="w-5 h-5" />
            arsaikia26@gmail.com
          </a>

          <div className="flex items-center justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center  hover:text-foreground hover:bg-accent transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
