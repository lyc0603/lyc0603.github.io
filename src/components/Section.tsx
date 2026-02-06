import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

const Section = ({ id, title, children }: SectionProps) => {
  return (
    <section id={id} className="py-1">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
};

export default Section;
