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
  researchField: { en: 'FinTech & AI', zh: '金融科技与人工智能' },
  about: { en: 'About Me', zh: '关于我' },
  position: { en: 'Positions', zh: '任职经历' },
  education: { en: 'Education', zh: '教育背景' },
  publications: { en: 'Publications', zh: '发表论文' },
  workingPapers: { en: 'Working Papers', zh: '工作论文' },
  photography: { en: 'Photography', zh: '摄影' },
  navAbout: { en: 'About', zh: '关于' },
  navPublications: { en: 'Publications', zh: '发表论文' },
  navWorkingPapers: { en: 'Working Papers', zh: '工作论文' },
  navPhotography: { en: 'Photography', zh: '摄影' },
  previousPhoto: { en: 'Previous photo', zh: '上一张' },
  nextPhoto: { en: 'Next photo', zh: '下一张' },
  cv: { en: 'Curriculum Vitae', zh: '个人简历' },
  presentation: { en: 'Presented at', zh: '会议报告' },
  mediaCoverage: { en: 'Media Coverage', zh: '媒体报道' },
  fieldFinance: { en: 'Fin', zh: '金融' },
  fieldCs: { en: 'CS', zh: '计算机' },
  bibtexTitle: { en: 'BibTeX Citation', zh: 'BibTeX 引用' },
} satisfies Record<string, Localized>;

/**
 * Link buttons on a paper card. SSRN and ArXiv are both preprint repositories
 * and read as 预印 in Chinese; PDF is a file format and stays as it is. The key
 * is the label as written in the data, which is also what selects the BibTeX
 * dialog, so translating the button text cannot change the click behaviour.
 */
export const linkLabels: Record<string, Localized> = {
  BIB: { en: 'BIB', zh: '引用' },
  SSRN: { en: 'SSRN', zh: '预印' },
  ArXiv: { en: 'ArXiv', zh: '预印' },
};

export const aboutText: Localized = {
  en: 'I conduct interdisciplinary research at the intersection of computer science and finance.',
  zh: '我从事计算机科学与金融交叉领域的研究。',
};

/** A position line; `link` turns the first occurrence of its label in the text into a link. */
export type Position = Localized & { date: Localized; link?: { label: Localized; url: string }; logo: Logo };

/** Logo shown before a position or degree; files live in public/asset/logo. */
export type Logo = { src: string; alt: string };

const LOGO = {
  hku: { src: '/asset/logo/hku.png', alt: 'HKU' },
  blockeye: { src: '/asset/logo/blockeye.png', alt: 'BlockEye' },
  ucl: { src: '/asset/logo/ucl-wordmark.png', alt: 'UCL' },
  durham: { src: '/asset/logo/durham.png', alt: 'Durham University' },
} satisfies Record<string, Logo>;

export const positions: Position[] = [
  {
    en: 'Co-founder, BlockEye',
    zh: '联合创始人，博视智能（BlockEye）',
    date: { en: '07/2026 - Now', zh: '2026 年 7 月至今' },
    link: { label: { en: 'BlockEye', zh: '博视智能（BlockEye）' }, url: 'https://www.blockeye.ai/' },
    logo: LOGO.blockeye,
  },
  {
    en: 'Postdoctoral Fellow, HKU Business School, Hosted by Prof. Chen Lin and Prof. Wenzhi Ding',
    zh: '博士后研究员，香港大学经济及工商管理学院，合作导师：林晨教授、丁文治教授',
    date: { en: '10/2026 - Now', zh: '2026 年 10 月至今' },
    logo: LOGO.hku,
  },
  {
    en: 'Visiting Scholar, HKU Business School',
    zh: '访问学者，香港大学经济及工商管理学院',
    date: { en: '01/2026 - 07/2026', zh: '2026 年 1 月 - 2026 年 7 月' },
    logo: LOGO.hku,
  },
];

export const education: (Localized & { date: Localized; logo: Logo })[] = [
  {
    en: 'Ph.D. in Computer Science, UCL',
    zh: '计算机科学博士，伦敦大学学院（UCL）',
    date: { en: '2024 - 2026', zh: '2024 - 2026' },
    logo: LOGO.ucl,
  },
  {
    en: 'M.Sc. in Banking and Digital Finance, UCL',
    zh: '银行与数字金融理学硕士，伦敦大学学院（UCL）',
    date: { en: '2022 - 2023', zh: '2022 - 2023' },
    logo: LOGO.ucl,
  },
  {
    en: 'B.Sc. in Finance, Durham University',
    zh: '金融学理学学士，杜伦大学',
    date: { en: '2019 - 2022', zh: '2019 - 2022' },
    logo: LOGO.durham,
  },
];

export interface Paper {
  badge: string;
  badgeColorKey: 'conference' | 'journal' | 'workingPaper';
  /** Field, by where the paper is published or submitted rather than by topic. */
  field: 'finance' | 'cs';
  title: Localized;
  /** Finance papers list co-authors only, as "with ..."; computer science papers list everyone. */
  authors: Localized;
  /** Venue and conference names are never translated. */
  venue?: string;
  /** The paper's page at the publisher; the venue name links here. */
  venueUrl?: string;
  year?: string;
  presentations?: { name: string; year?: string; url?: string }[];
  /** Outlet names stay untranslated, like venue names. */
  mediaCoverage?: { name: string; url: string }[];
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
    field: 'cs',
    title: {
      en: 'Resisting Manipulative Bots in Meme Coin Copy Trading: A Multi-Agent Approach with Chain-of-Thought Reasoning',
      zh: '抵御迷因币跟单交易中的操纵型机器人：基于思维链推理的多智能体方法',
    },
    authors: {
      en: 'Yichen Luo, Yebo Feng, Jiahua Xu, Yang Liu',
      zh: '罗奕辰、冯业博、徐家画、刘杨',
    },
    venue: 'The ACM Web Conference (Oral)',
    venueUrl: 'https://dl.acm.org/doi/10.1145/3774904.3792635',
    year: '2026',
    presentations: [
      {
        name: 'NUS Computing Seminar',
        year: '2026',
        // NUS publishes no listing for the seminar; UK CBT's post of 25 August 2026
        // is the record of the talk.
        url: 'https://www.linkedin.com/posts/ubri-ugcPost-7497884809332178944-9Cvf/',
      },
    ],
    abstract: {
      en: 'This paper studies how manipulative bots exploit copy trading in illiquid meme coin markets and introduces a defense framework based on a multi-agent system powered by multimodal large language models (LLMs) and structured chain-of-thought (CoT) reasoning.',
      zh: '本文研究操纵型机器人如何在流动性匮乏的迷因币市场中利用跟单交易牟利，并提出一套防御框架：以多模态大语言模型（LLM）驱动的多智能体系统，结合结构化的思维链（CoT）推理。',
    },
    links: [
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
    field: 'cs',
    title: {
      en: 'Piercing the Veil of TVL: DeFi Reappraised',
      zh: '刺破总锁仓价值的面纱：去中心化金融价值重估',
    },
    authors: {
      en: 'Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca',
      zh: '罗奕辰、冯业博、徐家画、Paolo Tasca',
    },
    venue: 'Financial Cryptography and Data Security',
    venueUrl: 'https://link.springer.com/chapter/10.1007/978-3-032-07035-7_1',
    year: '2025',
    presentations: [
      {
        name: 'Frontiers in DeFi',
        year: '2025',
        // HTW Berlin, 18 September 2025, Morning Session 1.
        url: 'https://events.htw-berlin.de/files/Stg/WIKO/Frontiers_in_DeFi/20250821_Programm_DeFi_2025.pdf',
      },
      {
        name: 'XRP Ledger Apex',
        year: '2025',
        // Singapore, 10-12 June 2025. The official site is down and its agenda never
        // listed talks; UK CBT's write-up is the record of this one.
        url: 'https://www.ukcbt.org/post/uk-cbt-presents-xrp-ledger-apex-2025-singapore',
      },
    ],
    mediaCoverage: [
      {
        name: 'The Capital',
        // "Correlation Isn't Causation", by ChangeNOW.io on Medium, 13 July 2026.
        url: 'https://medium.com/thecapital/correlation-isnt-causation-the-5-most-misleading-metrics-in-on-chain-analytics-8625b8cadb6e',
      },
    ],
    abstract: {
      en: 'The Total Value Locked (TVL) metric in DeFi is manipulable and systematically distorted due to double counting. We propose Total Value Redeemable (TVR) to measures the truly withdrawable economic value of DeFi.',
      zh: 'DeFi（去中心化金融）中的总锁仓价值（TVL）指标易被操纵，并因重复计算而系统性失真。我们提出可赎回总价值（TVR），用以衡量 DeFi 中真正可提取的经济价值。',
    },
    links: [
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
    field: 'finance',
    title: {
      en: 'ESG Scores, Scandal Probability, and Event Returns',
      zh: 'ESG 评分、丑闻概率与事件收益',
    },
    authors: {
      en: 'with Wenya Sun, S.M. Yiu, Luping Yu, Wenzhi Ding',
      zh: '合作者：孙文雅、姚兆明、俞路平、丁文治',
    },
    venue: 'Financial Innovation',
    venueUrl: 'https://link.springer.com/article/10.1186/s40854-024-00635-1',
    year: '2024',
    mediaCoverage: [
      {
        name: 'Sing Tao Daily',
        // 星島頭條, 3 April 2025.
        url: 'https://www.stheadline.com/esg/3443454/ESG%E9%AB%98%E5%88%86%E6%81%90%E6%88%90%E9%9B%99%E5%88%83%E5%8A%8D%E9%86%9C%E8%81%9E%E6%A9%9F%E7%8E%87%E4%BD%8E%E6%96%BC%E5%90%8C%E6%A5%AD-%E4%B8%80%E6%97%A6%E5%87%BA%E4%BA%8B%E5%8D%BB%E8%A1%9D%E6%93%8A%E6%9B%B4%E5%A4%A7',
      },
    ],
    abstract: {
      en: 'High ESG scores can lower the probability of an ESG scandal but can also incur higher losses if one occurs. Based on a theoretical model, the firm has two equilibria of the optimal ESG investment level - not doing at all or doing a lot.',
      zh: '较高的 ESG（环境社会治理）评分能够降低 ESG 丑闻发生的概率，但一旦丑闻发生，损失也会更大。基于理论模型，企业的最优 ESG 投入水平存在两个均衡——要么完全不投入，要么大量投入。',
    },
    links: [
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
    field: 'cs',
    title: {
      en: 'From Algorithms to Agents: A Survey of LLM-Based Trading Systems',
      zh: '从算法到智能体：基于大语言模型的交易系统综述',
    },
    authors: {
      en: 'Yebo Feng, Yichen Luo, Jingyang Dai, Chien-Chih Chen, Guangyan Gan, Jiahua Xu, Lin William Cong, Yang Liu',
      zh: '冯业博、罗奕辰、戴婧扬、Chien-Chih Chen、甘广燕、徐家画、丛林、刘杨',
    },
    year: '2026',
    links: [
      {
        label: 'SSRN',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7610285',
      },
      { label: 'PDF', url: '/asset/pdf/llm_trading_survey.pdf' },
    ],
    abstract: {
      en: 'Large language models (LLMs) now drive trading systems, from signal extractors to autonomous agents. This survey organizes the literature by capability and by six markets, maps 47 systems, and audits their evaluation against traditional quantitative baselines. The margins of independently re-run agents shrink or vanish, the best-supported role for the LLM is upstream of the trade, and controlled comparisons do not establish a multi-agent advantage.',
      zh: '大语言模型（LLM）正驱动从信号提取到自主智能体的各类交易系统。本综述按能力与六类市场梳理文献，归纳 47 个系统，并对照传统量化基准审视其评估方法。独立重跑后，智能体的超额表现缩小乃至消失；证据最充分的做法是把大语言模型放在交易的上游；而受控比较并未证明多智能体具有优势。',
    },
    // Panel a of figures/reported_vs_reeval.pdf in the survey repository.
    visualizationUrl: '/asset/visualization/llm_trading_survey.png',
    visualizationAlt: 'llm_trading_survey',
    visualizationCaption: {
      en: 'Reported vs. Re-run Sharpe Ratios of LLM Trading Agents',
      zh: '大语言模型交易智能体的报告与重跑夏普比率',
    },
  },
  {
    badge: 'WP',
    badgeColorKey: 'workingPaper',
    field: 'finance',
    title: {
      en: 'How Well Do LLMs Perform in Peer Review? Evidence from Finance and Accounting',
      zh: '大语言模型在同行评审中表现如何？来自金融与会计学的证据',
    },
    authors: {
      en: 'with Hai Lu, Luping Yu',
      zh: '合作者：卢海、俞路平',
    },
    year: '2026',
    links: [
      {
        label: 'SSRN',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7607363',
      },
      { label: 'PDF', url: '/asset/pdf/llm_referee.pdf' },
    ],
    abstract: {
      en: 'GPT-4o, whose training data end before the 2024 conference season, referees the papers of the 2024 AFA and NBER finance meetings. Net of author reputation, papers it scores one standard deviation higher are 44% more likely to appear in a top-three finance journal, and the information comes from its judgements of correctness and exposition, not of originality or significance. LLMs can check whether research is right, but not whether it matters.',
      zh: '我们让训练数据截止于 2024 年会议季之前的 GPT-4o 评审 2024 年 AFA 与 NBER 金融会议的论文。在控制作者声誉后，模型评分高一个标准差的论文在金融学三大顶级期刊发表的概率高出 44%；这一信息来自模型对正确性与表述的判断，而非对原创性与重要性的判断。大语言模型能检验研究是否正确，却无法判断它是否重要。',
    },
    // Table 3 of the paper: GPT-4o, Top3Fin, N = 276.
    visualizationUrl: '/asset/visualization/llm_referee.png',
    visualizationAlt: 'llm_referee',
    visualizationCaption: {
      en: 'Effect of Each GPT-4o Score on Top-3 Publication, with 95% CIs',
      zh: 'GPT-4o 各项评分对顶刊发表的影响及 95% 置信区间',
    },
  },
  {
    badge: 'WP',
    badgeColorKey: 'workingPaper',
    field: 'cs',
    title: {
      en: 'SwingGuard: Risk-Conditioned Multi-Agent Swing Trading with Dual-Timescale Governance',
      zh: 'SwingGuard：基于双时间尺度治理的风险条件多智能体波段交易',
    },
    authors: {
      en: 'Junzhou Su, Yichen Luo, Yebo Feng, Teng Li, Jiahua Xu',
      zh: '苏俊洲、罗奕辰、冯业博、李腾、徐家画',
    },
    year: '2026',
    links: [
      { label: 'ArXiv', url: 'https://arxiv.org/abs/2610.12988' },
      { label: 'PDF', url: '/asset/pdf/swingguard.pdf' },
    ],
    abstract: {
      en: 'SwingGuard is a dual-timescale, long-only multi-agent framework for cryptocurrency swing trading. Analyst agents and a Portfolio Architect form a target position conditioned on current risk, and a five-minute Risk Controller keeps governing the position between strategy revisions. On BTC and ETH it stays profitable after transaction costs with shallow drawdowns, and the exposure-capped joint portfolio reaches a Sharpe ratio of 2.98, against 2.79 when risk is assessed only after the strategy is formed.',
      zh: 'SwingGuard 是一个面向加密货币波段交易的双时间尺度、只做多的多智能体框架。分析师智能体与投资组合架构师在当前风险约束下形成目标仓位，每五分钟运行一次的风险控制器则在两次策略修订之间持续管控仓位。在 BTC 与 ETH 上，扣除交易成本后它仍保持盈利且回撤较浅；限定敞口的联合组合夏普比率达 2.98，而仅在策略形成后才评估风险的版本为 2.79。',
    },
    // The "Capped portfolio" net-value panel of Figure 4 in the arXiv HTML version, with the
    // shared date axis from below its drawdown panel.
    visualizationUrl: '/asset/visualization/swingguard.png',
    visualizationAlt: 'swingguard',
    visualizationCaption: {
      en: 'Net Value of the Capped BTC-ETH Portfolio, After Costs',
      zh: '限定敞口的 BTC-ETH 联合组合扣除成本后的净值',
    },
  },
  {
    badge: 'WP',
    badgeColorKey: 'workingPaper',
    field: 'finance',
    title: {
      en: 'Do Small Shareholders Have a Voice? Deliberation, Delegation, and Value in DAO Governance',
      zh: '小股东有话语权吗？去中心化自治组织治理中的审议、委托与价值',
    },
    authors: {
      en: 'with Jiahua Xu, Qiaozhi Ye, Kathy Yuan',
      zh: '合作者：徐家画、叶乔治、Kathy Yuan',
    },
    year: '2026',
    presentations: [
      {
        name: 'Nanyang Blockchain Conference',
        year: '2026',
        url: 'https://www.ntu.edu.sg/cctf/cctf-community/2026-nanyang-blockchain-conference',
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
      zh: '我们研究小额代币持有者在 DAO（去中心化自治组织）治理中是否拥有话语权，以及这种话语权能否创造价值。我们构建了一个用户通过使用协议来了解治理后果的模型，并在覆盖 DeFi（去中心化金融）DAO 共 2,830 项提案的账户级数据上进行检验：审议与委托提高了小额持有者的参与度和影响力，而他们为数不多的胜利带来了显著为正的超额收益。',
    },
    visualizationUrl: '/asset/visualization/dynamic_delegation.png',
    visualizationAlt: 'dynamic_delegation',
    visualizationCaption: {
      en: 'DID Treatment Effects of Delegation on Small-Holder Participation',
      zh: '委托对小额持有者参与度的双重差分处理效应',
    },
  },
  {
    badge: 'WP',
    badgeColorKey: 'workingPaper',
    field: 'finance',
    title: {
      en: 'Decomposing and Deterring Market Manipulation: Evidence from On-chain Trading',
      zh: '分解与遏制市场操纵：来自链上交易的证据',
    },
    authors: {
      en: 'with Wenzhi Ding, Jiahua Xu, Chen Lin',
      zh: '合作者：丁文治、徐家画、林晨',
    },
    year: '2025',
    presentations: [
      {
        name: 'Sydney Banking and Financial Stability Conference',
        year: '2025',
        // The organisers' site now shows 2026; this snapshot still lists the paper.
        url: 'https://web.archive.org/web/20251201220400/https://sbfc.sydney.edu.au/program/',
      },
      {
        // As listed on Wenzhi Ding's homepage, which gives no link for it.
        name: 'NSFC Major Project "Research on Antitrust Theory and Policy in the Digital Economy" Workshop',
        year: '2025',
      },
    ],
    links: [
      {
        label: 'SSRN',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5953738',
      },
      { label: 'PDF', url: '/asset/pdf/meme.pdf' },
    ],
    abstract: {
      // The brief on Wenzhi Ding's homepage.
      en: "Using account-level data for 6,000 meme coin projects on the blockchain, we decompose the effects of two families of market manipulation: position manipulation and attention manipulation. The platform has (1) increased the cost of attention manipulation and (2) adopted our algorithm to disclose position manipulation; these two interventions close the manipulators' profit gap with other traders by 75% and 44%, respectively.",
      zh: '我们利用区块链上 6,000 个迷因币项目的账户级数据，分解两类市场操纵的影响：仓位操纵与注意力操纵。平台（1）提高了注意力操纵的成本，并（2）采用我们的算法披露仓位操纵；这两项干预使操纵者相对其他交易者的收益差距分别缩小了 75% 和 44%。',
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
    field: 'cs',
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

/**
 * Photography section. Web copies live in public/asset/photo (long edge 2000px, EXIF removed);
 * the originals are in ~/Desktop/photo. Locations come from the file names and the images.
 */
const OSBORNE: Localized = { en: 'Osborne House, Isle of Wight, UK', zh: '英国怀特岛奥斯本宫' };
const ALUM_BAY: Localized = { en: 'Alum Bay, Isle of Wight, UK', zh: '英国怀特岛阿勒姆湾' };

/**
 * `thumb` is the grid thumbnail (covers a 480x360 card); `src` is the full photo shown in the lightbox.
 * `focus` is the CSS object-position used when the thumbnail is cropped to the 4:3 card.
 */
export const photos: {
  src: string;
  thumb: string;
  title: Localized;
  alt: Localized;
  location: Localized;
  focus?: string;
}[] = [
  {
    src: '/asset/photo/osborne_window.jpg',
    thumb: '/asset/photo/thumbs/osborne_window.jpg',
    title: { en: 'Window', zh: '窗' },
    alt: { en: 'A window at Osborne House looking out over the gardens', zh: '奥斯本宫的一扇窗，窗外是花园' },
    location: OSBORNE,
  },
  {
    src: '/asset/photo/osborne_staircase.jpg',
    thumb: '/asset/photo/thumbs/osborne_staircase.jpg',
    title: { en: 'Staircase', zh: '旋转楼梯' },
    alt: { en: 'The oval spiral staircase at Osborne House, looking up to the skylight', zh: '奥斯本宫的椭圆形旋转楼梯，仰望天窗' },
    location: OSBORNE,
    // Portrait: keep the top of the arch and the skylight lamp in the 4:3 card.
    focus: 'center 30%',
  },
  {
    src: '/asset/photo/osborne_stairwell_above.jpg',
    thumb: '/asset/photo/thumbs/osborne_stairwell_above.jpg',
    title: { en: 'Stairwell', zh: '楼梯井' },
    alt: { en: 'The stairwell at Osborne House seen from above, with red carpet and a white statue', zh: '俯瞰奥斯本宫的楼梯井，红地毯与白色雕像' },
    location: OSBORNE,
  },
  {
    src: '/asset/photo/alum_bay_chalk_path.jpg',
    thumb: '/asset/photo/thumbs/alum_bay_chalk_path.jpg',
    title: { en: 'Chalk Path', zh: '白垩小径' },
    alt: { en: 'A chalk path along the cliffs above Alum Bay in fog', zh: '雾中阿勒姆湾崖顶的白垩小径' },
    location: ALUM_BAY,
  },
];
