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
      screen.getByRole("link", { name: "Financial Cryptography and Data Security, 2025" }),
    ).toBeInTheDocument();
  });

  // ESG reads as itself in Chinese and stays untranslated.
  const titleLatinAllowlist = ["ESG"];

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

  it("links publication titles to the paper instead of a Paper button", () => {
    renderAt("/");

    expect(screen.queryByRole("link", { name: "Paper" })).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Piercing the Veil of TVL: DeFi Reappraised" }),
    ).toHaveAttribute("href", "https://link.springer.com/chapter/10.1007/978-3-032-07035-7_1");
    expect(screen.getAllByText(/^Presented at:/).length).toBe(2);
  });

  it("translates the link buttons that are English words", () => {
    renderAt("/zh");
    expect(
      screen.getByRole("link", { name: "刺破总锁仓价值的面纱：去中心化金融价值重估" }),
    ).toHaveAttribute("href", "https://link.springer.com/chapter/10.1007/978-3-032-07035-7_1");
    // SSRN and ArXiv are both preprint repositories.
    expect(screen.getAllByRole("link", { name: "预印" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "SSRN" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "ArXiv" })).not.toBeInTheDocument();
    // PDF is a file format, so it stays as it is.
    expect(screen.getAllByRole("link", { name: "PDF" }).length).toBeGreaterThan(0);
  });

  it("still opens the BibTeX dialog from the translated 引用 button", () => {
    renderAt("/zh");

    fireEvent.click(screen.getAllByRole("link", { name: "引用" })[0]);

    expect(screen.getByRole("dialog")).toHaveTextContent("BibTeX 引用");
    expect(screen.getByRole("dialog")).toHaveTextContent("luo2026resisting");
  });

  it("links conferences to their programs and spells out their names", () => {
    renderAt("/");

    expect(screen.getByRole("link", { name: "The ACM Web Conference (Oral), 2026" })).toHaveAttribute(
      "href",
      "https://www2026.thewebconf.org/program/full-schedule.html",
    );
    expect(
      screen.getByRole("link", { name: "Financial Cryptography and Data Security, 2025" }),
    ).toHaveAttribute("href", "https://fc25.ifca.ai/program.html");
    expect(screen.getByRole("link", { name: "Nanyang Blockchain Conference (2026)" })).toHaveAttribute(
      "href",
      "https://www.ntu.edu.sg/cctf/cctf-community/2026-nanyang-blockchain-conference",
    );
    expect(
      screen.getByRole("link", { name: "Sydney Banking and Financial Stability Conference (2025)" }),
    ).toHaveAttribute(
      "href",
      "https://web.archive.org/web/20251201220400/https://sbfc.sydney.edu.au/program/",
    );
    expect(screen.queryByText(/\bSBFC\b/)).not.toBeInTheDocument();
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
