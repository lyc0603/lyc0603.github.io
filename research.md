---
layout: page
permalink: /research/
title: Research
greenFinance:

    - title: "ESG Scores, Scandal Probability, and Event Returns"
      author: "Yichen Luo, Wenzhi Ding, Wenya Sun, S.M. Yiu, Luping Yu"
      venue: "Financial Innovation"
      brief: "High ESG scores can lower the probability of an ESG scandal but can also incur higher losses if one occurs. Based on a theoretical model, the firm has two equilibria of the optimal ESG investment level - not doing at all or doing a lot."
      year: "2024"
      url: "https://jfin-swufe.springeropen.com/articles/10.1186/s40854-024-00635-1"
      media: "Sing Tao Daily"
      media_url: "https://www.stheadline.com/esg/3443454"

computerScience:

    - title: "Piercing the Veil of TVL: DeFi Reappraised"
      author: "Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca"
      venue: "Financial Cryptography and Data Security"
      brief: "We propose a new metric, Total Value Redeemable (TVR), to accurately assess the value within DeFi, addressing the 'double counting' issue in Total Value Locked (TVL) calculations."
      year: "2025"
      url: "https://fc25.ifca.ai/preproceedings/94.pdf"

---

## I. Finance

{% for item in page.greenFinance %}
[**{{item.title}}**]({{item.url}}){:target="_blank"}

- {{item.venue}} ({{item.year}})
- {{item.author}}
- Brief: {{item.brief}}
- Media Coverage: [**{{item.media}}**]({{item.media_url}}){:target="_blank"}
{% endfor %}

## II. Computer Science

{% for item in page.computerScience %}
[**{{item.title}}**]({{item.url}}){:target="_blank"}

- {{item.venue}} ({{item.year}})
- {{item.author}}
- Brief: {{item.brief}}
{% endfor %}