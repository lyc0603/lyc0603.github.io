export type Lang = 'en' | 'zh';

/** A string that exists in both languages. */
export type Localized = Record<Lang, string>;

export const LANGUAGES: { code: Lang; label: string; path: string }[] = [
  { code: 'en', label: 'English', path: '/' },
  { code: 'zh', label: '中文', path: '/zh' },
];

/** Interface strings: section titles, labels, navigation. */
export const ui = {
  siteTitle: {
    en: 'Yichen Luo | Personal Website',
    zh: '罗奕辰 | 个人主页',
  },
  mainPage: { en: 'Main Page', zh: '主页' },
  name: { en: 'Yichen Luo', zh: '罗奕辰' },
  researchField: { en: 'Blockchain & DeFi', zh: '区块链与去中心化金融' },
  about: { en: 'About Me', zh: '关于我' },
  position: { en: 'Current Position', zh: '现任职位' },
  education: { en: 'Education', zh: '教育背景' },
  publications: { en: 'Publications', zh: '发表论文' },
  workingPapers: { en: 'Working Papers', zh: '工作论文' },
  navAbout: { en: 'About', zh: '关于' },
  navPublications: { en: 'Publications', zh: '发表论文' },
  navWorkingPapers: { en: 'Working Papers', zh: '工作论文' },
  cv: { en: 'Curriculum Vitae', zh: '个人简历' },
  presentation: { en: 'Presentation', zh: '会议报告' },
  bibtexTitle: { en: 'BibTeX Citation', zh: 'BibTeX 引用' },
} satisfies Record<string, Localized>;

export const aboutText: Localized = {
  en: 'I conduct interdisciplinary research at the intersection of computer science and finance. I am interested in turning news events, market narratives, and practitioner anecdotes into rigorous research. If you come across compelling or counterintuitive financial anecdotes, I would love to hear about them.',
  zh: '我从事计算机科学与金融交叉领域的研究，热衷于把新闻事件、市场叙事以及业界见闻转化为严谨的学术研究。如果你遇到有趣或反直觉的金融现象，欢迎与我交流。',
};

export const positions: Localized[] = [
  {
    en: 'Visiting Scholar, HKU FinTech Academy, 2026, Hosted by Prof. Chen Lin and Prof. Wenzhi Ding',
    zh: '访问学者，香港大学金融科技学院，2026 年，合作导师：Prof. Chen Lin、Prof. Wenzhi Ding',
  },
];

export const education: Localized[] = [
  {
    en: 'Ph.D. in Computer Science, UCL, 2024 - Now',
    zh: '计算机科学博士，伦敦大学学院（UCL），2024 年至今',
  },
  {
    en: 'M.Sc. in Banking and Digital Finance, UCL, 2022 - 2023',
    zh: '银行与数字金融理学硕士，伦敦大学学院（UCL），2022 - 2023',
  },
  {
    en: 'B.Sc. in Finance, Durham University, 2019 - 2022',
    zh: '金融学理学学士，杜伦大学，2019 - 2022',
  },
];

export interface Paper {
  badge: string;
  badgeColorKey: 'conference' | 'journal' | 'workingPaper';
  /** Paper titles and author lists stay in English in both versions. */
  title: string;
  authors: string;
  venue?: Localized;
  year?: string;
  presentations?: { name: Localized; year?: string }[];
  links?: { label: string; url: string }[];
  abstract: Localized;
  bibtex?: string;
  visualizationUrl?: string;
  visualizationAlt?: string;
  visualizationCaption?: Localized;
}

export const badgeColors = {
  conference: '#0b7fae',
  journal: '#1f4f99',
  workingPaper: '#6b7280',
} as const;

export const publications: Paper[] = [
  {
    badge: "WWW'26",
    badgeColorKey: 'conference',
    title:
      'Resisting Manipulative Bots in Meme Coin Copy Trading: A Multi-Agent Approach with Chain-of-Thought Reasoning',
    authors: 'Yichen Luo, Yebo Feng, Jiahua Xu, Yang Liu',
    venue: {
      en: 'The ACM Web Conference (Oral)',
      zh: 'ACM 国际万维网大会（口头报告）',
    },
    year: '2026',
    abstract: {
      en: 'This paper studies how manipulative bots exploit copy trading in illiquid meme coin markets and introduces a defense framework based on a multi-agent system powered by multimodal large language models (LLMs) and structured chain-of-thought (CoT) reasoning.',
      zh: '本文研究操纵型机器人如何在流动性匮乏的 meme 币市场中利用跟单交易牟利，并提出一套防御框架：以多模态大语言模型（LLM）驱动的多智能体系统，结合结构化的思维链（CoT）推理。',
    },
    links: [
      { label: 'Paper', url: 'https://dl.acm.org/doi/10.1145/3774904.3792635' },
      { label: 'PDF', url: '/asset/pdf/meme_mas.pdf' },
      { label: 'BIB', url: '#' },
    ],
    bibtex: `@inproceedings{luo2026resisting,
    title     = {Resisting Manipulative Bots in Meme Coin Copy Trading: A Multi-Agent Approach with Chain-of-Thought Reasoning},
    author    = {Yichen Luo and Yebo Feng and Jiahua Xu and Yang Liu},
    booktitle = {Proceedings of the ACM Web Conference (WWW)},
    year      = {2026},
    doi       = {10.1145/3774904.3792635}
}`,
    visualizationUrl: '/asset/visualization/meme_mas.png',
    visualizationAlt: 'meme_mas',
    visualizationCaption: {
      en: 'Copy Trading Profit per Investment',
      zh: '跟单交易的单位投资收益',
    },
  },
  {
    badge: "FC'25",
    badgeColorKey: 'conference',
    title: 'Piercing the Veil of TVL: DeFi Reappraised',
    authors: 'Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca',
    venue: {
      en: 'Financial Cryptography and Data Security',
      zh: '金融密码学与数据安全会议',
    },
    year: '2025',
    abstract: {
      en: 'The Total Value Locked (TVL) metric in DeFi is manipulable and systematically distorted due to double counting. We propose Total Value Redeemable (TVR) to measures the truly withdrawable economic value of DeFi.',
      zh: 'DeFi 中的总锁仓价值（TVL）指标易被操纵，并因重复计算而系统性失真。我们提出可赎回总价值（TVR），用以衡量 DeFi 中真正可提取的经济价值。',
    },
    links: [
      {
        label: 'Paper',
        url: 'https://link.springer.com/chapter/10.1007/978-3-032-07035-7_1',
      },
      { label: 'PDF', url: '/asset/pdf/tvl.pdf' },
      { label: 'BIB', url: '#' },
    ],
    bibtex: `@inproceedings{luo2025piercing,
    author = {Luo, Yichen and Feng, Yebo and Xu, Jiahua and Tasca, Paolo},
    title = {Piercing the Veil of TVL: DeFi Reappraised},
    booktitle = {Financial Cryptography and Data Security 2025},
    year = {2025},
    publisher = {Springer Nature Switzerland},
    address = {Cham},
    pages = {3--19}
}`,
    visualizationUrl: '/asset/visualization/tvl.png',
    visualizationAlt: 'tvl',
    visualizationCaption: {
      en: 'TVL and TVR of All DeFi Protocols',
      zh: '所有 DeFi 协议的 TVL 与 TVR',
    },
  },
  {
    badge: 'FI',
    badgeColorKey: 'journal',
    title: 'ESG Scores, Scandal Probability, and Event Returns',
    authors: 'Yichen Luo, Wenya Sun, S.M. Yiu, Luping Yu, Wenzhi Ding',
    venue: { en: 'Financial Innovation', zh: 'Financial Innovation' },
    year: '2024',
    abstract: {
      en: 'High ESG scores can lower the probability of an ESG scandal but can also incur higher losses if one occurs. Based on a theoretical model, the firm has two equilibria of the optimal ESG investment level - not doing at all or doing a lot.',
      zh: '较高的 ESG 评分能够降低 ESG 丑闻发生的概率，但一旦丑闻发生，损失也会更大。基于理论模型，企业的最优 ESG 投入水平存在两个均衡——要么完全不投入，要么大量投入。',
    },
    links: [
      {
        label: 'Paper',
        url: 'https://link.springer.com/article/10.1186/s40854-024-00635-1',
      },
      { label: 'PDF', url: '/asset/pdf/esg.pdf' },
      { label: 'BIB', url: '#' },
    ],
    bibtex: `@article{Sun2024,
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
`,
    visualizationUrl: '/asset/visualization/esg.png',
    visualizationAlt: 'esg',
    visualizationCaption: {
      en: 'Optimal ESG Investment',
      zh: '最优 ESG 投入水平',
    },
  },
];

export const workingPapers: Paper[] = [
  {
    badge: 'WP',
    badgeColorKey: 'workingPaper',
    title:
      'Do Small Shareholders Have a Voice? Deliberation, Delegation, and Value in DAO Governance',
    authors: 'Yichen Luo, Jiahua Xu, Qiaozhi Ye, Kathy Yuan',
    year: '2026',
    presentations: [
      {
        name: {
          en: 'Nanyang Blockchain Conference',
          zh: '南洋区块链大会',
        },
        year: '2026',
      },
      {
        name: {
          en: 'Warwick Business School Gillmore Centre Academic Conference',
          zh: '华威商学院 Gillmore 中心学术会议',
        },
        year: '2026',
      },
    ],
    links: [
      {
        label: 'SSRN',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6865699',
      },
      { label: 'PDF', url: '/asset/pdf/dao_governance.pdf' },
    ],
    abstract: {
      en: "We study whether small token holders have a voice in DAO governance, and whether that voice creates value. We build a model where users learn governance consequences through protocol usage, then test it on account-level data covering 2,830 proposals from DeFi DAOs: deliberation and delegation raise small holders' participation and influence, and their rare victories earn positive abnormal returns.",
      zh: '我们研究小额代币持有者在 DAO 治理中是否拥有话语权，以及这种话语权能否创造价值。我们构建了一个用户通过使用协议来了解治理后果的模型，并在覆盖 DeFi DAO 共 2,830 项提案的账户级数据上进行检验：审议与委托提高了小额持有者的参与度和影响力，而他们为数不多的胜利带来了显著为正的超额收益。',
    },
    visualizationUrl: '/asset/visualization/dynamic_delegation.png',
    visualizationAlt: 'dynamic_delegation',
    visualizationCaption: {
      en: 'Small-Holder Participation Rises After Delegation is Enabled',
      zh: '开放委托后小额持有者参与度上升',
    },
  },
  {
    badge: 'WP',
    badgeColorKey: 'workingPaper',
    title:
      'Decompose Market Manipulation Strategies: Evidence from On-chain Meme Coin Market',
    authors: 'Yichen Luo, Wenzhi Ding, Jiahua Xu, Chen Lin',
    year: '2025',
    presentations: [{ name: { en: 'SBFC', zh: 'SBFC' }, year: '2025' }],
    links: [
      {
        label: 'SSRN',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5953738',
      },
      { label: 'PDF', url: '/asset/pdf/meme.pdf' },
    ],
    abstract: {
      en: 'Use blockchain account-level transaction data to decompose the effects of several market manipulation strategies on asset performance and participant profits. These strategies are popular yet hard to measure in traditional financial markets. Meme coin market provides some evaluations that can be applied to the traditional market.',
      zh: '本文利用区块链账户级交易数据，分解多种市场操纵策略对资产表现与参与者收益的影响。这些策略在传统金融市场中很常见，却难以度量；meme 币市场提供了可迁移到传统市场的量化评估。',
    },
    visualizationUrl: '/asset/visualization/meme.png',
    visualizationAlt: 'meme',
    visualizationCaption: {
      en: 'DID Treatment Effects of Manipulative Bot on Trader Participation',
      zh: '操纵型机器人对交易者参与度的双重差分处理效应',
    },
  },
  {
    badge: 'WP',
    badgeColorKey: 'workingPaper',
    title: 'LLM-Powered Multi-Agent System for Automated Crypto Portfolio Management',
    authors: 'Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca, Yang Liu',
    year: '2025',
    links: [
      { label: 'ArXiv', url: 'https://arxiv.org/abs/2501.00826' },
      { label: 'PDF', url: '/asset/pdf/mas.pdf' },
    ],
    abstract: {
      en: 'We propose a multi-agent system for automated crypto portfolio management, leveraging multimodal large language models (LLMs) to analyze market data and execute trading strategies. The system consists of specialized agents for market analysis, strategy formulation, and trade execution, demonstrating the potential of agents in financial applications.',
      zh: '我们提出一套用于加密资产组合自动化管理的多智能体系统，借助多模态大语言模型（LLM）分析市场数据并执行交易策略。该系统由负责市场分析、策略制定与交易执行的专用智能体组成，展示了智能体在金融场景中的应用潜力。',
    },
    visualizationUrl: '/asset/visualization/mas.png',
    visualizationAlt: 'mas',
    visualizationCaption: {
      en: 'Risk-Return Profile of MAS Strategies vs. Single-Agent and Deep Learning Baselines',
      zh: '多智能体策略与单智能体、深度学习基准的风险收益对比',
    },
  },
];
