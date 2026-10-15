import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { publications, workingPapers } from "@/i18n/content";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/zh" element={<Index />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>,
  );

describe("language switching", () => {
  it("renders the English page at /", () => {
    renderAt("/");

    expect(screen.getByRole("heading", { name: "Yichen Luo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Working Papers" })).toBeInTheDocument();
    // The active language is plain text, the other is a link.
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh");
    expect(screen.queryByRole("link", { name: "English" })).not.toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
  });

  it("renders the Chinese page at /zh", () => {
    renderAt("/zh");

    expect(screen.getByRole("heading", { name: "罗奕辰" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "工作论文" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("link", { name: "中文" })).not.toBeInTheDocument();
    expect(document.documentElement.lang).toBe("zh-CN");
  });

  it("treats /zh/ the same as /zh, since GitHub Pages serves it as a directory", () => {
    renderAt("/zh/");

    expect(screen.getByRole("heading", { name: "关于我" })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("zh-CN");
  });

  it("switches to Chinese when the toggle is clicked", () => {
    renderAt("/");

    fireEvent.click(screen.getByRole("link", { name: "中文" }));

    expect(screen.getByRole("heading", { name: "关于我" })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("zh-CN");
  });

  it("translates paper titles and author names, but not venues", () => {
    const { unmount } = renderAt("/");
    expect(
      screen.getByText("Piercing the Veil of TVL: DeFi Reappraised"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca"),
    ).toBeInTheDocument();
    unmount();

    renderAt("/zh");
    expect(
      screen.getByText("刺破总锁仓价值的面纱：去中心化金融价值重估"),
    ).toBeInTheDocument();
    // "meme" reads as 迷因, and the acronyms are spelled out in the abstracts.
    expect(screen.getByText(/抵御迷因币跟单交易/)).toBeInTheDocument();
    expect(
      screen.getByText(/DeFi（去中心化金融）中的总锁仓价值/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/在 DAO（去中心化自治组织）治理中是否拥有话语权/),
    ).toBeInTheDocument();
    expect(screen.getByText("罗奕辰、冯业博、徐家画、Paolo Tasca")).toBeInTheDocument();
    expect(screen.getByText(/可赎回总价值/)).toBeInTheDocument();
    // Venue names stay in English on both versions.
    expect(
      screen.getByRole("link", { name: /^Financial Cryptography and Data Security\s*, 2025$/ }),
    ).toBeInTheDocument();
  });

  // ESG reads as itself in Chinese, and SwingGuard is a system name; both stay untranslated.
  const titleLatinAllowlist = ["ESG", "SwingGuard"];

  it.each([...publications, ...workingPapers])(
    "keeps the Chinese title of $title.en free of untranslated Latin script",
    (paper) => {
      const stripped = titleLatinAllowlist.reduce(
        (title, term) => title.split(term).join(""),
        paper.title.zh,
      );
      expect(stripped).not.toMatch(/[A-Za-z]/);
    },
  );

  it("shows paper titles as plain text with no Paper button", () => {
    renderAt("/");

    expect(screen.queryByRole("link", { name: "Paper" })).not.toBeInTheDocument();
    // Titles are plain text, not links.
    expect(
      screen.queryByRole("link", { name: "Piercing the Veil of TVL: DeFi Reappraised" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Piercing the Veil of TVL: DeFi Reappraised" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/^Presented at:/).length).toBe(4);
    expect(screen.getAllByText(/^Media Coverage:/).length).toBe(2);
  });

  it("translates the link buttons that are English words", () => {
    renderAt("/zh");
    // SSRN and ArXiv are both preprint repositories.
    expect(screen.getAllByRole("link", { name: "预印" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "SSRN" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "ArXiv" })).not.toBeInTheDocument();
    // PDF is a file format, so it stays as it is.
    expect(screen.getAllByRole("link", { name: "PDF" }).length).toBeGreaterThan(0);
  });

  it("still opens the BibTeX dialog from the translated 引用 button", () => {
    renderAt("/zh");

    const card = screen.getByRole("heading", { name: /^抵御迷因币跟单交易/ }).closest("div.flex.gap-4") as HTMLElement;
    fireEvent.click(within(card).getByRole("link", { name: "引用" }));

    expect(screen.getByRole("dialog")).toHaveTextContent("BibTeX 引用");
    expect(screen.getByRole("dialog")).toHaveTextContent("luo2026resisting");
  });

  it("links venues to the paper and conferences to their programs", () => {
    renderAt("/");

    expect(screen.getByRole("link", { name: /^The ACM Web Conference \(Oral\)\s*, 2026$/ })).toHaveAttribute(
      "href",
      "https://dl.acm.org/doi/10.1145/3774904.3792635",
    );
    expect(
      screen.getByRole("link", { name: /^Financial Cryptography and Data Security\s*, 2025$/ }),
    ).toHaveAttribute("href", "https://link.springer.com/chapter/10.1007/978-3-032-07035-7_1");
    expect(screen.getByRole("link", { name: /^Financial Innovation\s*, 2024$/ })).toHaveAttribute(
      "href",
      "https://link.springer.com/article/10.1186/s40854-024-00635-1",
    );
    expect(screen.getByRole("link", { name: "Nanyang Blockchain Conference 2026" })).toHaveAttribute(
      "href",
      "https://www.ntu.edu.sg/cctf/cctf-community/2026-nanyang-blockchain-conference",
    );
    expect(
      screen.getByRole("link", { name: "Sydney Banking and Financial Stability Conference 2025" }),
    ).toHaveAttribute(
      "href",
      "https://web.archive.org/web/20251201220400/https://sbfc.sydney.edu.au/program/",
    );
    expect(screen.queryByText(/\bSBFC\b/)).not.toBeInTheDocument();
  });

  it("lists the TVL paper's Frontiers in DeFi presentation", () => {
    renderAt("/");

    expect(screen.getByRole("link", { name: "Frontiers in DeFi 2025" })).toHaveAttribute(
      "href",
      "https://events.htw-berlin.de/files/Stg/WIKO/Frontiers_in_DeFi/20250821_Programm_DeFi_2025.pdf",
    );
  });

  it("lists XRP Ledger Apex and the Sing Tao Daily coverage", () => {
    const { unmount } = renderAt("/");
    expect(screen.getByRole("link", { name: "XRP Ledger Apex 2025" })).toHaveAttribute(
      "href",
      "https://www.ukcbt.org/post/uk-cbt-presents-xrp-ledger-apex-2025-singapore",
    );
    expect(screen.getByRole("link", { name: "Sing Tao Daily" }).getAttribute("href")).toMatch(
      /^https:\/\/www\.stheadline\.com\/esg\/3443454\//,
    );
    unmount();

    renderAt("/zh");
    expect(screen.getAllByText(/^媒体报道:/).length).toBe(2);
    expect(screen.getByRole("link", { name: "Sing Tao Daily" })).toBeInTheDocument();
  });

  it("orders the TVL talks Frontiers in DeFi first, without parentheses, and lists The Capital", () => {
    renderAt("/");

    const lines = screen.getAllByText(/^Presented at:/).map((p) => p.textContent);
    expect(lines).toContain("Presented at: Frontiers in DeFi 2025, XRP Ledger Apex 2025");
    expect(screen.queryByText(/\((2024|2025|2026)\)/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The Capital" })).toHaveAttribute(
      "href",
      "https://medium.com/thecapital/correlation-isnt-causation-the-5-most-misleading-metrics-in-on-chain-analytics-8625b8cadb6e",
    );
  });

  it("lists the WWW'26 paper's NUS Computing seminar", () => {
    renderAt("/");

    expect(screen.getByRole("link", { name: "NUS Computing Seminar 2026" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/posts/ubri-ugcPost-7497884809332178944-9Cvf/",
    );
  });

  it("shows the HKU postdoc and the completed PhD", () => {
    const { unmount } = renderAt("/");
    expect(screen.getByText("ycluo@hku.hk")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", "mailto:ycluo@hku.hk");
    expect(screen.getByRole("heading", { name: "Positions" })).toBeInTheDocument();
    expect(screen.getByText(/^Postdoctoral Fellow, HKU Business School, 2026 - Now/)).toBeInTheDocument();
    expect(screen.getByText("Visiting Scholar, HKU Business School, 01/2026 - 07/2026")).toBeInTheDocument();
    expect(screen.getByText("Ph.D. in Computer Science, UCL, 2024 - 2026")).toBeInTheDocument();
    unmount();

    renderAt("/zh");
    expect(screen.getByRole("heading", { name: "任职经历" })).toBeInTheDocument();
    expect(screen.getByText(/^博士后研究员，香港大学经济及工商管理学院/)).toBeInTheDocument();
  });

  it("captions both event-study figures as DID treatment effects", () => {
    renderAt("/");
    expect(screen.getByText("DID Treatment Effects of Delegation on Small-Holder Participation")).toBeInTheDocument();
    expect(screen.getByText("DID Treatment Effects of Manipulative Bot on Trader Participation")).toBeInTheDocument();
  });

  it("lists computer science publications first", () => {
    renderAt("/");
    const section = screen.getByRole("heading", { name: "Publications" }).closest("section") as HTMLElement;
    expect(within(section).getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Resisting Manipulative Bots in Meme Coin Copy Trading: A Multi-Agent Approach with Chain-of-Thought Reasoning",
      "Piercing the Veil of TVL: DeFi Reappraised",
      "ESG Scores, Scandal Probability, and Event Returns",
    ]);
  });

  it("lists finance working papers first", () => {
    const { unmount } = renderAt("/");
    const section = screen.getByRole("heading", { name: "Working Papers" }).closest("section") as HTMLElement;
    const titles = within(section).getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    // Finance first, then computer science, each newest first.
    expect(titles).toEqual([
      "How Well Do LLMs Perform in Peer Review? Evidence from Finance and Accounting",
      "Do Small Shareholders Have a Voice? Deliberation, Delegation, and Value in DAO Governance",
      "Decomposing and Deterring Market Manipulation: Evidence from On-chain Trading",
      "From Algorithms to Agents: A Survey of LLM-Based Trading Systems",
      "SwingGuard: Risk-Conditioned Multi-Agent Swing Trading with Dual-Timescale Governance",
      "LLM-Powered Multi-Agent System for Automated Crypto Portfolio Management",
    ]);
    expect(within(section).getAllByRole("link", { name: "SSRN" })[0]).toHaveAttribute(
      "href",
      "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7607363",
    );
    unmount();

    renderAt("/zh");
    expect(screen.getByText("合作者：卢海、俞路平")).toBeInTheDocument();
    expect(screen.getByAltText("llm_referee")).toHaveAttribute("src", "/asset/visualization/llm_referee.png");
  });

  it("lists finance co-authors as 'with ...' and computer science authors in full", () => {
    const { unmount } = renderAt("/");
    for (const line of [
      "with Wenya Sun, S.M. Yiu, Luping Yu, Wenzhi Ding",
      "with Hai Lu, Luping Yu",
      "with Jiahua Xu, Qiaozhi Ye, Kathy Yuan",
      "with Wenzhi Ding, Jiahua Xu, Chen Lin",
    ]) {
      expect(screen.getByText(line)).toBeInTheDocument();
    }
    expect(screen.getAllByText(/^with /).length).toBe(4);
    expect(screen.getByText("Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca")).toBeInTheDocument();
    unmount();

    renderAt("/zh");
    expect(screen.getByText("合作者：丁文治、徐家画、林晨")).toBeInTheDocument();
    expect(screen.getAllByText(/^合作者：/).length).toBe(4);
  });

  it("tags each paper with its field", () => {
    const { unmount } = renderAt("/");
    const tagOf = (title: string) =>
      screen.getByRole("heading", { name: title }).closest("div.flex.gap-4")?.querySelector(".field-tag")?.textContent;
    expect(tagOf("Piercing the Veil of TVL: DeFi Reappraised")).toBe("CS");
    expect(tagOf("ESG Scores, Scandal Probability, and Event Returns")).toBe("Fin");
    expect(tagOf("How Well Do LLMs Perform in Peer Review? Evidence from Finance and Accounting")).toBe("Fin");
    expect(document.querySelectorAll(".field-tag-finance").length).toBe(4);
    expect(document.querySelectorAll(".field-tag-cs").length).toBe(5);
    unmount();

    renderAt("/zh");
    expect(screen.getAllByText("金融").length).toBe(4);
    expect(screen.getAllByText("计算机").length).toBe(5);
  });

  it("shows the Decompose paper as on Wenzhi Ding's homepage", () => {
    renderAt("/");

    const card = screen
      .getByRole("heading", { name: "Decomposing and Deterring Market Manipulation: Evidence from On-chain Trading" })
      .closest("div.flex.gap-4") as HTMLElement;
    expect(within(card).getByText(/75% and 44%/)).toBeInTheDocument();
    expect(card).toHaveTextContent(
      'Presented at: Sydney Banking and Financial Stability Conference 2025, NSFC Major Project "Research on Antitrust Theory and Policy in the Digital Economy" Workshop 2025',
    );
  });

  it("lists the LLM trading survey as a CS working paper", () => {
    renderAt("/");
    const card = screen
      .getByRole("heading", { name: "From Algorithms to Agents: A Survey of LLM-Based Trading Systems" })
      .closest("div.flex.gap-4") as HTMLElement;
    expect(card.querySelector(".field-tag")?.textContent).toBe("CS");
    expect(within(card).getByText(/^Yebo Feng, Yichen Luo, /)).toBeInTheDocument();
    expect(within(card).getByRole("link", { name: "SSRN" })).toHaveAttribute(
      "href",
      "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7610285",
    );
  });

  it("lists SwingGuard as a CS working paper with its arXiv link", () => {
    renderAt("/");
    const card = screen
      .getByRole("heading", { name: "SwingGuard: Risk-Conditioned Multi-Agent Swing Trading with Dual-Timescale Governance" })
      .closest("div.flex.gap-4") as HTMLElement;
    expect(card.querySelector(".field-tag")?.textContent).toBe("CS");
    expect(within(card).getByText("Junzhou Su, Yichen Luo, Yebo Feng, Teng Li, Jiahua Xu")).toBeInTheDocument();
    expect(within(card).getByRole("link", { name: "ArXiv" })).toHaveAttribute("href", "https://arxiv.org/abs/2610.12988");
  });

  it("lists the BlockEye co-founder role with a link", () => {
    const { unmount } = renderAt("/");
    const section = screen.getByRole("heading", { name: "Positions" }).closest("section") as HTMLElement;
    const items = within(section).getAllByRole("listitem").map((li) => li.textContent);
    expect(items[1]).toBe("Co-founder, BlockEye");
    expect(within(section).getByRole("link", { name: "BlockEye" })).toHaveAttribute("href", "https://www.blockeye.ai/");
    unmount();

    renderAt("/zh");
    expect(screen.getByRole("link", { name: "博视智能（BlockEye）" })).toHaveAttribute("href", "https://www.blockeye.ai/");
  });

  it("shows the survey's Chinese author names", () => {
    renderAt("/zh");
    expect(screen.getByText("苏俊洲、罗奕辰、冯业博、李腾、徐家画")).toBeInTheDocument();
    expect(screen.getByText("冯业博、罗奕辰、戴婧扬、Chien-Chih Chen、甘广燕、徐家画、丛林、刘杨")).toBeInTheDocument();
  });

  it("no longer lists the Warwick presentation for the DAO paper", () => {
    renderAt("/");

    expect(screen.getByText(/Nanyang Blockchain Conference/)).toBeInTheDocument();
    expect(screen.queryByText(/Gillmore/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Warwick/i)).not.toBeInTheDocument();
  });

  it("no longer lists the AMM liquidity hedging working paper", () => {
    renderAt("/");

    const workingPapers = screen
      .getByRole("heading", { name: "Working Papers" })
      .closest("section") as HTMLElement;
    expect(
      within(workingPapers).queryByText(/Liquidity Position Hedging/i),
    ).not.toBeInTheDocument();
  });
});
