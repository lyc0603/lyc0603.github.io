---
layout: page
permalink: /research/
title: Research
greenFinance:

    - title:   "ESG Scores, Scandal Probability, and Event Returns"
      author:  "Yichen Luo, Wenzhi Ding, Wenya Sun, S.M. Yiu, Luping Yu"
      brief: "Higher ESG scores, lower ESG scandal probability but higher loss given scandal happened. Firm has optimal ESG investment level based on theoretical prediction."
      year:    "2022"
      url:     "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4172587"

computerScience:

    - title:   "Piercing the Veil of TVL: DeFi Reappraised"
      author: "Yichen Luo, Yebo Feng, Jiahua Xu, Paolo Tasca"
      brief: "We propose a new metric, Total Value Redeemable (TVR), to accurately assess the value within DeFi, addressing the "double counting" issue in Total Value Locked (TVL) calculations."
      year: "2024"
      url: "https://arxiv.org/abs/2404.11745"

---

## I. Finance

{% for item in page.greenFinance %}
[**{{item.title}}**]({% if item.internal %}{{item.url | prepend: site.baseurl}}
{% else %}{{item.url}}{% endif %}){:target="_blank"}

- Working Paper ({{item.year}})
- {{item.author}}
- Brief: {{item.brief}}
{% endfor %}

## II. Computer Science

{% for item in page.computerScience %}
[**{{item.title}}**]({% if item.internal %}{{item.url | prepend: site.baseurl}}
{% else %}{{item.url}}{% endif %}){:target="_blank"}

- Preprint ({{item.year}})
- {{item.author}}
- Brief: {{item.brief}}
{% endfor %}