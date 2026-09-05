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

/**
 * Link buttons on a paper card. SSRN and ArXiv are both preprint repositories
 * and read as 预印 in Chinese; PDF is a file format and stays as it is. The key
 * is the label as written in the data, which is also what selects the BibTeX
 * dialog, so translating the button text cannot change the click behaviour.
 */
export const linkLabels: Record<string, Localized> = {
  Paper: { en: 'Paper', zh: '论文' },
  BIB: { en: 'BIB', zh: '引用' },
  SSRN: { en: 'SSRN', zh: '预印' },
  ArXiv: { en: 'ArXiv', zh: '预印' },
};

export const aboutText: Localized = {
  en: 'I conduct interdisciplinary research at the intersection of computer science and finance. I am interested in turning news events, market narratives, and practitioner anecdotes into rigorous research. If you come across compelling or counterintuitive financial anecdotes, I would love to hear about them.',
  zh: '我从事计算机科学与金融交叉领域的研究，热衷于把新闻事件、市场叙事以及业界见闻转化为严谨的学术研究。如果你遇到有趣或反直觉的金融现象，欢迎与我交流。',
};

export const positions: Localized[] = [
  {
    en: 'Visiting Scholar, HKU Business School, 2026, Hosted by Prof. Chen Lin and Prof. Wenzhi Ding',
    zh: '访问学者，香港大学经济及工商管理学院，2026 年，合作导师：林晨教授、丁文治教授',
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
  title: Localized;
  authors: Localized;
  /** Venue and conference names are never translated. */
  venue?: string;
  year?: string;
  presentations?: { name: string; year?: string }[];
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
    title: {
      en: 'Resisting Manipulative Bots in Meme Coin Copy Trading: A Multi-Agent Approach with Chain-of-Thought Reasoning',
      zh: '抵御迷因币跟单交易中的操纵型机器人：基于思维链推理的多智能体方法',
    },
    authors: {
      en: 'Yichen Luo, Yebo Feng, Jiahua Xu, Yang Liu',
      zh: '罗奕辰、冯业博、徐家画、刘杨',
    },
    venue: 'The ACM Web Conference (Oral)',
    year: '2026',
    abstract: {
      en: 'This paper studies how manipulative bots exploit copy trading in illiquid meme coin markets and introduces a defense framework based on a multi-agent system powered by multimodal large language models (LLMs) and structured chain-of-thought (CoT) reasoning.',
      zh: '本文研究操纵型机器人如何在流动性匮乏的迷因币市场中利用跟单交易牟利，并提出一套防御框架：以多模态大语言模型（LLM）驱动的多智能体系统，结合结构化的思维链（CoT）推理。',
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
    title: {
      en: 'Piercing the Veil of TVL: DeFi Reappraised',
      zh: '刺破总锁仓价值的面纱：去中心化金融价值重估',
    },
    authors: {
      en: 'Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca',
      zh: '罗奕辰、冯业博、徐家画、Paolo Tasca',
    },
    venue: 'Financial Cryptography and Data Security',
    year: '2025',
    abstract: {
      en: 'The Total Value Locked (TVL) metric in DeFi is manipulable and systematically distorted due to double counting. We propose Total Value Redeemable (TVR) to measures the truly withdrawable economic value of DeFi.',
      zh: 'DeFi（去中心化金融）中的总锁仓价值（TVL）指标易被操纵，并因重复计算而系统性失真。我们提出可赎回总价值（TVR），用以衡量 DeFi 中真正可提取的经济价值。',
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
    title: {
      en: 'ESG Scores, Scandal Probability, and Event Returns',
      zh: 'ESG 评分、丑闻概率与事件收益',
    },
    authors: {
      en: 'Yichen Luo, Wenya Sun, S.M. Yiu, Luping Yu, Wenzhi Ding',
      zh: '罗奕辰、孙文雅、姚兆明、俞路平、丁文治',
    },
    venue: 'Financial Innovation',
    year: '2024',
    abstract: {
      en: 'High ESG scores can lower the probability of an ESG scandal but can also incur higher losses if one occurs. Based on a theoretical model, the firm has two equilibria of the optimal ESG investment level - not doing at all or doing a lot.',
      zh: '较高的 ESG（环境社会治理）评分能够降低 ESG 丑闻发生的概率，但一旦丑闻发生，损失也会更大。基于理论模型，企业的最优 ESG 投入水平存在两个均衡——要么完全不投入，要么大量投入。',
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
    title: {
      en: 'Do Small Shareholders Have a Voice? Deliberation, Delegation, and Value in DAO Governance',
      zh: '小股东有话语权吗？去中心化自治组织治理中的审议、委托与价值',
    },
    authors: {
      en: 'Yichen Luo, Jiahua Xu, Qiaozhi Ye, Kathy Yuan',
      zh: '罗奕辰、徐家画、叶乔治、Kathy Yuan',
    },
    year: '2026',
    presentations: [{ name: 'Nanyang Blockchain Conference', year: '2026' }],
    links: [
      {
        label: 'SSRN',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6865699',
      },
      { label: 'PDF', url: '/asset/pdf/dao_governance.pdf' },
    ],
    abstract: {
      en: "We study whether small token holders have a voice in DAO governance, and whether that voice creates value. We build a model where users learn governance consequences through protocol usage, then test it on account-level data covering 2,830 proposals from DeFi DAOs: deliberation and delegation raise small holders' participation and influence, and their rare victories earn positive abnormal returns.",
      zh: '我们研究小额代币持有者在 DAO（去中心化自治组织）治理中是否拥有话语权，以及这种话语权能否创造价值。我们构建了一个用户通过使用协议来了解治理后果的模型，并在覆盖 DeFi（去中心化金融）DAO 共 2,830 项提案的账户级数据上进行检验：审议与委托提高了小额持有者的参与度和影响力，而他们为数不多的胜利带来了显著为正的超额收益。',
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
    title: {
      en: 'Decompose Market Manipulation Strategies: Evidence from On-chain Meme Coin Market',
      zh: '分解市场操纵策略：来自链上迷因币市场的证据',
    },
    authors: {
      en: 'Yichen Luo, Wenzhi Ding, Jiahua Xu, Chen Lin',
      zh: '罗奕辰、丁文治、徐家画、林晨',
    },
    year: '2025',
    presentations: [{ name: 'SBFC', year: '2025' }],
    links: [
      {
        label: 'SSRN',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5953738',
      },
      { label: 'PDF', url: '/asset/pdf/meme.pdf' },
    ],
    abstract: {
      en: 'Use blockchain account-level transaction data to decompose the effects of several market manipulation strategies on asset performance and participant profits. These strategies are popular yet hard to measure in traditional financial markets. Meme coin market provides some evaluations that can be applied to the traditional market.',
      zh: '本文利用区块链账户级交易数据，分解多种市场操纵策略对资产表现与参与者收益的影响。这些策略在传统金融市场中很常见，却难以度量；迷因币市场提供了可迁移到传统市场的量化评估。',
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
    title: {
      en: 'LLM-Powered Multi-Agent System for Automated Crypto Portfolio Management',
      zh: '基于大语言模型的多智能体系统：加密资产组合的自动化管理',
    },
    authors: {
      en: 'Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca, Yang Liu',
      zh: '罗奕辰、冯业博、徐家画、Paolo Tasca、刘杨',
    },
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
