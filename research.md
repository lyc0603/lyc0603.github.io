---
layout: page
permalink: /research/
title: Research
wps:

    - title:   "ESG Scores, Scandal Probability, and Event Returns"
      author:  "Yichen Luo, Wenzhi Ding, Wenya Sun, S.M. Yiu, Luping Yu"
      brief: "Higher ESG scores, lower ESG scandal probability but higher loss given scandal happened. Firm has optimal ESG investment level based on theoretical prediction."
      year:    "2022"
      url:     "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4172587"
---

## I. Green Finance & ESG

{% for item in page.wps %}
<!-- [**{{item.title}}**]({% if item.internal %}{{item.url | prepend: site.baseurl}}
{% else %}{{item.url}}{% endif %}){:target="_blank"} -->
### 1. {{item.title}}
- Working Paper <i class="fa-solid fa-arrow-up-right-from-square" href="[{{item.url}}](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4172587)">SSRN</i>
- {{item.author}} ({{item.year}})
- Brief: {{item.brief}}
{% endfor %}