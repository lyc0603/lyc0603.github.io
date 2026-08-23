import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import { LanguageProvider } from "@/i18n/LanguageContext";

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
    expect(screen.getByText("刺破 TVL 的面纱：DeFi 价值重估")).toBeInTheDocument();
    expect(screen.getByText("罗奕辰、冯业博、徐家画、Paolo Tasca")).toBeInTheDocument();
    expect(screen.getByText(/可赎回总价值/)).toBeInTheDocument();
    // Venue names stay in English on both versions.
    expect(
      screen.getByText(/Financial Cryptography and Data Security, 2025/),
    ).toBeInTheDocument();
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
