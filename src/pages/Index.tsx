import ProfileSidebar from '@/components/ProfileSidebar';
import Section from '@/components/Section';
import PublicationCard from '@/components/PublicationCard';
import { GraduationCap, Building2 } from 'lucide-react';

const Index = () => {
  const badgeColors = {
    conference: '#0b7fae',
    journal: '#1f4f99',
    workingPaper: '#6b7280',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <header className="mb-6 pb-3 border-b border-section-border">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Main Page
          </p>
        </header>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileSidebar />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* About Me */}
            <Section id="about" title="About Me">
              <p className="text-foreground leading-relaxed">
                I conduct interdisciplinary research at the intersection of computer science and finance. I am interested in turning news events, market narratives, and practitioner anecdotes into rigorous research. If you come across compelling or counterintuitive financial anecdotes, I would love to hear about them.
              </p>
            </Section>

            <div className="section-divider" />

            {/* Current Position */}
            <Section id="position" title="Current Position">
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span>Visiting Scholar, HKU FinTech Academy, 2026, Hosted by Prof. Chen Lin and Prof. Wenzhi Ding</span>
                </li>
              </ul>
            </Section>

            <div className="section-divider" />

            {/* Education */}
            <Section id="education" title="Education">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span>Ph.D. in Computer Science, UCL, 2024 - Now</span>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span>M.Sc. in Banking and Digital Finance, UCL, 2022 - 2023</span>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span>B.Sc. in Finance, Durham University, 2019 - 2022</span>
                </li>
              </ul>
            </Section>

            <div className="section-divider" />

            {/* Publications */}
            <Section id="publications" title="Publications">
              <div className="divide-y divide-border">
                <PublicationCard
                  badge="WWW'26"
                  badgeColor={badgeColors.conference}
                  title="Resisting Manipulative Bots in Meme Coin Copy Trading: A Multi-Agent Approach with Chain-of-Thought Reasoning"
                  authors="Yichen Luo, Yebo Feng, Jiahua Xu, Yang Liu"
                  venue="The ACM Web Conference"
                  year="2026"
                  abstract='This paper studies how manipulative bots exploit copy trading in illiquid meme coin markets and introduces a defense framework based on a multi-agent system powered by multimodal large language models (LLMs) and structured chain-of-thought (CoT) reasoning.'
                  links={[
                    { label: 'PDF', url: 'https://arxiv.org/pdf/2601.08641' },
                    { label: 'BIB', url: '#' },
                  ]}
                  bibtex={`@inproceedings{luo2026resisting,
    title     = {Resisting Manipulative Bots in Meme Coin Copy Trading: A Multi-Agent Approach with Chain-of-Thought Reasoning},
    author    = {Yichen Luo and Yebo Feng and Jiahua Xu and Yang Liu},
    booktitle = {Proceedings of the ACM Web Conference (WWW)},
    year      = {2026},
    doi       = {10.1145/3774904.3792635}
}`}
                  visualizationUrl="/asset/visualization/meme_mas.png"
                  visualizationAlt="meme_mas"
                  visualizationCaption="Copy Trading Profit per Investment"
                />
                <PublicationCard
                  badge="FC'25"
                  badgeColor={badgeColors.conference}
                  title="Piercing the Veil of TVL: DeFi Reappraised"
                  authors="Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca"
                  venue="Financial Cryptography and Data Security"
                  year="2025"
                  abstract="The Total Value Locked (TVL) metric in DeFi is manipulable and systematically distorted due to double counting. We propose Total Value Redeemable (TVR) to measures the truly withdrawable economic value of DeFi."
                  links={[
                    { label: 'Paper', url: 'https://link.springer.com/chapter/10.1007/978-3-032-07035-7_1' },
                    { label: 'BIB', url: '#' },
                  ]}
                  bibtex={`@inproceedings{luo2025piercing,
    author = {Luo, Yichen and Feng, Yebo and Xu, Jiahua and Tasca, Paolo},
    title = {Piercing the Veil of TVL: DeFi Reappraised},
    booktitle = {Financial Cryptography and Data Security 2025},
    year = {2025},
    publisher = {Springer Nature Switzerland},
    address = {Cham},
    pages = {3--19}
}`}
                  visualizationUrl="/asset/visualization/tvl.png"
                  visualizationAlt="tvl"
                  visualizationCaption="TVL and TVR of All DeFi Protocols"
                />
                <PublicationCard
                  badge="FI"
                  badgeColor={badgeColors.journal}
                  title="ESG Scores, Scandal Probability, and Event Returns"
                  authors="Yichen Luo, Wenya Sun, S.M. Yiu, Luping Yu, Wenzhi Ding"
                  venue="Financial Innovation"
                  year="2024"
                  abstract="High ESG scores can lower the probability of an ESG scandal but can also incur higher losses if one occurs. Based on a theoretical model, the firm has two equilibria of the optimal ESG investment level - not doing at all or doing a lot."
                  links={[
                    { label: 'Paper', url: 'https://link.springer.com/article/10.1186/s40854-024-00635-1' },
                    { label: 'BIB', url: '#' },
                  ]}
                  bibtex={`@article{Sun2024,
   author = {Wenya Sun and Yichen Luo and Siu Ming Yiu and Luping Yu and Wenzhi Ding},
   doi = {10.1186/s40854-024-00635-1},
   issn = {21994730},
   issue = {1},
   journal = {Financial Innovation},
   month = {7},
   pages = {121-},
   publisher = {SpringerOpen},
   title = {ESG scores, scandal probability, and event returns},
   volume = {10},
   url = {https://link.springer.com/article/10.1186/s40854-024-00635-1},
   year = {2024}
}
`}
                  visualizationUrl="/asset/visualization/esg.png"
                  visualizationAlt="esg"
                  visualizationCaption="Optimal ESG Investment"
                />
              </div>
            </Section>

            <div className="section-divider" />

            {/* Working Papers */}
            <Section id="working-papers" title="Working Papers">
              <div className="divide-y divide-border">
                <PublicationCard
                  badge="WP"
                  badgeColor={badgeColors.workingPaper}
                  title="Decompose Market Manipulation Strategies: Evidence from On-chain Meme Coin Market"
                  authors="Yichen Luo, Wenzhi Ding, Jiahua Xu, Chen Lin"
                  links={[
                    { label: 'SSRN', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5953738' },
                    // { label: 'PDF', url: '#' },
                  ]}
                  abstract="Use blockchain account-level transaction data to decompose the effects of several market manipulation strategies on asset performance and participant profits. These strategies are popular yet hard to measure in traditional financial markets. Meme coin market provides some evaluations that can be applied to the traditional market."
                  visualizationUrl="/asset/visualization/meme.png"
                  visualizationAlt="meme"
                  visualizationCaption="DID Treatment Effects of Manipulative Bot on Trader Participation"
                />
                <PublicationCard
                  badge="WP"
                  badgeColor={badgeColors.workingPaper}
                  title="LLM-Powered Multi-Agent System for Automated Crypto Portfolio Management"
                  authors="Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca, Yang Liu"
                  links={[
                    { label: 'ArXiv', url: 'https://arxiv.org/abs/2501.00826' },
                  ]}
                  abstract="We propose a multi-agent system for automated crypto portfolio management, leveraging multimodal large language models (LLMs) to analyze market data and execute trading strategies. The system consists of specialized agents for market analysis, strategy formulation, and trade execution, demonstrating the potential of agents in financial applications."
                  visualizationUrl="/asset/visualization/mas.png"
                  visualizationAlt="mas"
                  visualizationCaption="Multi-Agent System Architecture for Crypto Portfolio Management"
                />
              </div>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
