import { Github, Mail, FileText, Linkedin } from 'lucide-react';

const ProfileSidebar = () => {
  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <div className="sticky top-6 space-y-4">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="w-36 h-36 rounded-lg overflow-hidden bg-secondary">
            <img
              /* load from asset/profile.jpg in production */
              src="/asset/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name and Info */}
        <div className="text-center space-y-0.5">
          <h1 className="text-lg font-semibold">Yichen Luo</h1>
          <p className="text-sm text-muted-foreground">yichen.luo.22@ucl.ac.uk</p>
          <p className="text-sm text-muted-foreground">Blockchain & DeFi</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3">
          <a
            href="mailto:yichen.luo.22@ucl.ac.uk"
            className="p-2 rounded-md hover:bg-secondary transition-colors text-foreground"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/lyc0603"
            className="p-2 rounded-md hover:bg-secondary transition-colors text-foreground"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/yichen-luo-8aba91245/"
            className="p-2 rounded-md hover:bg-secondary transition-colors text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Navigation */}
        <nav className="space-y-0.5 pt-3 border-t border-border">
          <a href="#about" className="block py-1.5 text-center text-sm hover:text-primary text-foreground">
            About
          </a>
          <a href="#publications" className="block py-1.5 text-center text-sm hover:text-primary text-foreground">
            Publications
          </a>
          <a href="#working-papers" className="block py-1.5 text-center text-sm hover:text-primary text-foreground">
            Working Papers
          </a>
        </nav>

        {/* CV Link */}
        <div className="text-center pt-3">
          <a
            href="/asset/pdf/cv.pdf"
            className="inline-flex items-center gap-2 text-sm hover:text-primary text-foreground"
          >
            <FileText className="w-4 h-4" />
            Curriculum Vitae
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-muted-foreground pt-6">
          © {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
