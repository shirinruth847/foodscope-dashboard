/**
 * FoodScope content.
 * All visible copy lives here so it can be edited without touching layout code.
 * Statistics must come from the project brief §3 and be cited. Use
 * "associated with" language: the brief rules out causal claims.
 */

export const SITE = {
  brand: "FoodScope",
  eyebrow: "IS428 Visual Analytics Final Project G1T1",
  title: "Does growing your own food mean greater food availability?",
  lede: "An interactive look at food self-sufficiency and food supply across 178 countries from 2010 to 2023, and where Singapore fits in the global picture.",
  team: ["Anjali", "Anumitaa", "Shirin", "Shree", "Sreya"],
  stats: [{ value: "FAOSTAT", label: "Primary data source" }],
};

/**
 * Side navigation, one entry per page. `summary` is shown on the home page cards.
 * The Explore Dashboards entry gets a sub-link per item in DASHBOARDS.items.
 */
export const NAV = [
  { id: "home", label: "Home", path: "/" },
  {
    id: "problem",
    label: "Problem",
    path: "/problem",
    summary:
      "Why producing more food at home doesn’t automatically mean more food available.",
  },
  {
    id: "findings",
    label: "Key Findings",
    path: "/findings",
    summary: "Headline insights from 178 countries, 2010–2023.",
  },
  {
    id: "dashboards",
    label: "Explore Dashboards",
    path: "/dashboards",
    summary: "Six interactive Tableau dashboards to explore the data yourself.",
  },
  {
    id: "conclusion",
    label: "Conclusion",
    path: "/conclusion",
    summary: "The overall answer, Singapore’s position and the limits of interpretation.",
  },
];

export const PROBLEM = {
  title: "Problem",
  banner: {
    src: "/images/problem-rice-paddy.png",
    alt: "Two farmers working in a flooded green rice paddy. One bends over the seedlings while the other shakes mud from a bundle of uprooted rice plants.",
  },
  photo: {
    src: "/images/problem-harvest.png",
    alt: "A farmer in a straw hat walks along a dirt path beside a cornfield, carrying a bucket and a basket of freshly picked corn on a shoulder pole.",
  },
  paragraphs: [
    "Governments have long treated domestic food production as a safeguard for national food availability. But food supply doesn’t stop at the border: a large share of the world’s cereals, fish and oils is traded. Whether countries that produce more of their own food really have more food available per person is rarely checked, and the data sits in separate FAOSTAT tables that governments and policy analysts cannot easily compare. Without a consistent way to do so over time, it’s hard to tell whether growing more food at home actually puts more food on the table.",
  ],
  question:
    "Is a higher share of domestically produced food associated with greater food availability per person, and how does Singapore compare?",
  scope:
    "Scope: This study looks at national food availability (whether enough food is available in the country), not how food is distributed within a population.",
};

/**
 * Key findings. Replace each `text` with a final finding once the dashboards
 * are done. Cards with `placeholder: true` are styled as drafts.
 */
export const FINDINGS = {
  title: "Key Findings",
  intro: "Headline insights from our analysis of 178 countries, 2010–2023.",
  items: [
    {
      tag: "Self-sufficiency",
      text: "Food self-sufficiency varies widely: some countries produce more than their domestic supply, while others depend heavily on imports. The ratio shows where food comes from, not whether enough food is available.",
      placeholder: false,
    },
    {
      tag: "Food categories",
      text: "Finding to be added: which food categories countries produce domestically versus import.",
      placeholder: true,
    },
    {
      tag: "Food categories & self-sufficiency",
      text: "A high national self-sufficiency ratio can hide large gaps. A country can be a surplus producer overall and still import most of its cereals, sugar or any other food group.",
      placeholder: false,
    },
    {
      tag: "Income",
      text: "Income does not predict self-sufficiency: it varies as widely within income groups as between them. The link between growing your own food and having enough of it is strongest where food is scarcest.",
      placeholder: false,
    },
    {
      tag: "Supply structure",
      text: "Singapore sources its food imports more widely than most comparable economies, but a few foods still depend almost entirely on one supplier, most of all live chickens from Malaysia.",
      placeholder: false,
    },
    {
      tag: "2035 targets",
      text: "Singapore’s two 2035 targets are moving in opposite directions. Protein is close at 25% against a 30% goal, carried by eggs, while fibre sits at 8% against 20% as vegetable output falls.",
      placeholder: false,
    },
  ],
};

/**
 * Dashboards. To embed a published Tableau Public view, set `src` to its link
 * in the form https://public.tableau.com/views/WorkbookName/SheetName
 * Leave `src` empty to show a placeholder. Each dashboard gets its own page
 * at /dashboards/<slug>. Set `width` to the published size for fixed-size
 * dashboards (the width in Tableau's embed code).
 */
export const DASHBOARDS = {
  title: "Explore Dashboards",
  intro:
    "Interactive Tableau dashboards. Hover, filter and click to explore the data.",
  items: [
    {
      slug: "1",
      navTitle: "Dashboard 1",
      title: "Global food self-sufficiency",
      description:
        "See how much of each country’s food supply was produced domestically, then compare its position with countries at both ends of the global range.",
      src: "https://public.tableau.com/views/Dashboard1_17935574978110/Dashboard1-Globaloverview",
      width: "1200px",
      height: "827px",
      overview: {
        eyebrow: "Dashboard 01 · Global overview",
        meta: ["178 countries", "2010–2023", "National food availability"],
      },
      navigation: [
        {
          title: "Choose a year",
          text: "Use the year control to compare the global picture over time.",
        },
        {
          title: "Select a country",
          text: "Choose a country or click the map to update its profile.",
        },
        {
          title: "Compare the extremes",
          text: "Compare the ranking with 100%, where production equals domestic supply.",
        },
        {
          title: "Hover for detail",
          text: "Hover for exact values. Use Reset dashboard to clear selections.",
        },
      ],
      analysis: {
        intro:
          "Use the three views together to locate, compare and understand each country.",
        items: [
          {
            label: "01 · World map",
            title: "Regional patterns",
            text: "Colour shows the share produced domestically. Use it to spot patterns—not to judge food availability.",
          },
          {
            label: "02 · Top and bottom 15",
            title: "Extremes around 100%",
            text: "Above 100% means production exceeds domestic supply; lower values suggest greater import reliance. This shows extremes, not food-security rankings.",
          },
          {
            label: "03 · Country profile",
            title: "Context for one country",
            text: "Compare the ratio with import dependency, calories, GDP and income group. Treat patterns as associations, not causes.",
          },
        ],
        takeaway:
          "Self-sufficiency describes where food comes from, not whether a country’s supply is sufficient, diverse or evenly distributed.",
      },
      significance: {
        title: "Why the global overview matters",
        text: "Trade helps explain why self-sufficiency and food availability can differ. In 2023, exports equalled about 20% of cereal production and 46% of vegetable oil production. Read the map alongside trade and supply measures.",
        source: "FAO Food Balance Sheets, 2023",
      },
    },
    {
      slug: "2",
      navTitle: "Dashboard 2",
      title: "Does higher self-sufficiency mean more food per person?",
      description:
        "Compare how much of each country's food supply is produced domestically with how many calories each person has available, then see where one country sits against the world.",
      src: "https://public.tableau.com/views/Dashboard2_17935305135460/Dashboard",
      width: "1000px",
      height: "827px",
      overview: {
        eyebrow: "Dashboard 02 · Self-sufficiency and food supply",
        meta: ["Up to 178 countries", "2010–2023", "National food availability"],
      },
      navigationIntro:
        "Follow this sequence to compare countries without losing track of your selections.",
      navigation: [
        {
          title: "Choose a year",
          text: "Use the Year slider to update the scatterplot and histogram. The line chart always shows 2010–2023.",
        },
        {
          title: "Zoom to a region",
          text: "Pick a region to focus the scatterplot, or keep (All) to see every country.",
        },
        {
          title: "Select a country",
          text: "Click a dot on the scatterplot to compare that country with the global average.",
        },
        {
          title: "Hover for detail",
          text: "Hover for exact values. Use Reset dashboard to clear selections.",
        },
      ],
      analysis: {
        intro:
          "Use the three views together: see the pattern, compare one country, then place it in the global distribution.",
        items: [
          {
            label: "01 · Scatterplot",
            title: "Self-sufficiency vs. food supply",
            text: "Each dot is a country in the selected year. Left to right is self-sufficiency (SSR); bottom to top is food supply per person per day. Colour shows income group; the larger dot is Hong Kong, the case-study proxy.",
            callout: {
              title: "Reading the SSR = 100 line",
              sides: [
                {
                  label: "Left of the line (SSR below 100)",
                  text: "Production is lower than domestic supply, so imports fill the gap. The further left, the more a country relies on trade.",
                },
                {
                  label: "Right of the line (SSR above 100)",
                  text: "Production exceeds domestic supply, so the country has a surplus, usually exported. The further right, the larger the surplus.",
                },
              ],
            },
          },
          {
            label: "02 · Country vs world",
            title: "Selected country vs. global average",
            text: "Click a dot to draw that country against the grey global averages. The top panel tracks SSR and the bottom tracks kcal per person per day, 2010–2023. A country whose SSR is below the global line but whose kcal is at or above it is meeting its needs largely through trade. Look at the direction over time as well as the gap.",
          },
          {
            label: "03 · Histogram",
            title: "Spread of self-sufficiency",
            text: "Bars count countries in each SSR band for the selected year. Most countries fall below 100, and a long tail to the right are net producers. The highlighted bar is Hong Kong (proxy), in the lowest band.",
          },
        ],
        takeaway:
          "Self-sufficiency shows where food comes from, not whether supply is sufficient, diverse or evenly distributed. Food supply per person is a national average and says nothing about who can access it.",
      },
    },
    {
      slug: "3",
      navTitle: "Dashboard 3",
      title: "Deep dive into self-sufficiency by food groups",
      description: "A country's overall self-sufficiency ratio can look strong while individual food groups depend heavily on imports. Choose a country and year to see where its food is produced at home and where it is imported.",
      src: "https://public.tableau.com/views/Dashboard3_17947413071250/Dashboard1",
      width: "1200px",
      height: "900px",
      overview: {  eyebrow: 'Dashboard 03 · Breaking down self-sufficiency ratios',
        meta: ['FAOSTAT Food Balances', '2010–2023', '11 food groups', 'Calorie-weighted SSR'],
      },
      navigation: [
        { title: 'Choose a year and country', text: 'Use the Year slider and Country menu at the top left. Everything on the page follows them.' },
        { title: 'Read the heatmap', text: 'Each row is a country, each column a food group. Click a row to make it the selected country.' },
        { title: 'Check where the food comes from', text: 'The bars split each group into home production and net imports for the selected country.' },
        { title: 'Compare with the median', text: 'The table and the faces below show how the selected country differs from the world median.' },
      ],
      analysis: {
        intro: 'Three views answer one question: does a high self-sufficiency ratio mean sufficiency in every food group?',
        items: [
          { label: 'View 1', title: 'Country by food group',
            text: 'The number beside each country is its overall SSR. The cells show each group separately. Blue means production exceeds domestic supply, orange means the country relies on imports.' },
          { label: 'View 2', title: 'Where the food comes from',
            text: 'Orange is home production and blue is net imports (imports minus exports) as a share of domestic supply. A bar past 100% means the surplus is exported.' },
          { label: 'View 3', title: 'Table and faces vs the median',
            text: 'The table gives exact values and the ratio to the world median. The face turns those ratios into features: bigger, higher or more upturned means above the median. A low ratio means a country imports that food, not that it goes without.' },
        ],
        takeaway: 'A high national self-sufficiency ratio can hide large gaps. A country can be a surplus producer overall and still import most of its cereals, sugar or any other food group.',
      },
    },
    {
      slug: "4",
      navTitle: "Dashboard 4",
      title: "Does income explain self-sufficiency?",
      description:
        "Wealthier countries can afford to import, so any link between producing your own food and having enough of it might simply reflect national income. These four views hold income constant.",
      src: "https://public.tableau.com/views/VASelfSufficiencyAnalysis-Dashboard5/Dashboard5",
      width: "1200px",
      height: "827px",
      overview: {
        eyebrow: "Dashboard 04 · Income comparison",
        meta: ["2023 snapshot", "By World Bank income group"],
      },
      navigation: [
        {
          title: "Start with the correlations",
          text: "The top chart states the finding. Right of zero is positive, left is negative.",
        },
        {
          title: "Select an income group",
          text: "Click a bar to highlight that group across the other three views.",
        },
        {
          title: "Trace a single country",
          text: "Click a point in the scatter to find the same country elsewhere.",
        },
        {
          title: "Hover for detail",
          text: "Hover for exact values. Use Reset dashboard to clear selections.",
        },
      ],
      analysis: {
        intro:
          "Read the correlations first, then use the other three views to check what lies behind them.",
        items: [
          {
            label: "01 · Correlation by income group",
            title: "Where the link holds",
            text: "Moderate in low-income countries (+0.44), near zero in the middle bands. Self-sufficiency matters most where food is scarce.",
          },
          {
            label: "02 · Supply vs self-sufficiency",
            title: "Four panels, four slopes",
            text: "Each band trends differently, yet supply clusters near 3,000 kcal per person per day across the whole range.",
          },
          {
            label: "03 · Self-sufficiency against GDP",
            title: "Wealth doesn’t predict it",
            text: "A near-flat line across two orders of magnitude of GDP. Income does not determine self-sufficiency in either direction.",
          },
          {
            label: "04 · Distribution by income group",
            title: "Spread within every band",
            text: "Self-sufficiency varies widely inside each group. If income set it, these boxes would be narrow and sit apart.",
          },
        ],
        takeaway:
          "Income shapes how easily a country imports, but it does not determine how much of its own food it grows.",
      },
    },
    {
      slug: "5",
      navTitle: "Dashboard 5",
      title: "If a country doesn’t grow its food, where does its food supply come from?",
      description: "Self-sufficiency shows how much a country imports, but not from where. Trace Singapore’s suppliers for each food, and see how much it relies on its largest one compared with similar economies.",
      src: "https://public.tableau.com/shared/MPPSXQ5KH",
      width: "1000px",
      height: "827px",
      mobileHeight: "1127px",
    },
    {
      slug: "6",
      navTitle: "Dashboard 6",
      title: "Is Singapore on track for its 2035 targets?",
      description:
        "Singapore imports more than 90% of its food. Under Singapore Food Story 2, local farms are meant to supply 20% of its fibre and 30% of its protein by 2035.",
      src: "https://public.tableau.com/views/VASelfSufficiencyAnalysis-Dashboard6/Dashboard6",
      width: "1200px",
      height: "827px",
      note: "'Others' covers licensed food farms outside the four named categories. SFA does not itemise it; the group has fallen from 8 farms in 2019 to 3 in 2025.",
      overview: {
        eyebrow: "Dashboard 06 · Singapore progress",
        meta: ["Singapore", "2015–2025", "Local production vs 2035 targets"],
      },
      navigation: [
        {
          title: "Start with the targets",
          text: "The bars show current local share against the 2035 goal.",
        },
        {
          title: "Select a category",
          text: "Click Fibre or Protein to filter production and highlight the farms behind it.",
        },
        {
          title: "Narrow the years",
          text: "Use the production slider to focus the trend on a shorter window.",
        },
        {
          title: "Hover for detail",
          text: "Hover for exact values. Use Reset dashboard to clear selections.",
        },
      ],
      analysis: {
        intro:
          "Start with the gap to each target, then read the trends that explain why they differ.",
        items: [
          {
            label: "01 · Progress to 2035 targets",
            title: "Two targets, two distances",
            text: "Protein sits at 25% against a 30% goal; fibre at 8% against 20%. Reference lines mark each target.",
          },
          {
            label: "02 · Local production, 2015–2025",
            title: "Opposite directions",
            text: "Eggs have grown across the decade; vegetables fell by roughly a third since 2021. Each panel has its own scale.",
          },
          {
            label: "03 · Licensed farms by type",
            title: "A shift, not a decline",
            text: "Sea-based farms fell from 110 to 67 since 2019 while land-based doubled. Fewer farms need not mean less output.",
          },
        ],
        takeaway:
          "The protein target rests largely on eggs, while the fibre target requires reversing a multi-year fall in vegetable production.",
      },
    },
  ],
};

export const CONCLUSION = {
  title: "Conclusion",
  intro: "Across 178 countries, higher self-sufficiency is not consistently associated with more food available per person.",
  items: [
    {
      kicker: "Bottom line",
      title: "The overall answer",
      text: "Producing more food domestically does not automatically mean more food is available. Trade can support high availability in import-dependent countries, while high self-sufficiency does not guarantee an adequate or diverse supply.",
      placeholder: false,
    },
    {
      kicker: "Food groups",
      title: "One ratio cannot show the whole food system",
      text: "An overall self-sufficiency ratio can hide large gaps between food groups. A country may export a surplus overall while importing most of particular foods.",
      placeholder: false,
    },
    {
      kicker: "Singapore",
      title: "Explore Singapore’s food resilience",
      lenses: [
        {
          id: "imports",
          label: "Import network",
          title: "Trade is part of food resilience",
          text: "Singapore’s low self-sufficiency does not mean low food availability. Imports are its main supply source, so resilience depends on a broad supplier network and close attention to foods concentrated in one country.",
          link: "/dashboards/5",
          linkLabel: "Explore Singapore’s suppliers",
        },
        {
          id: "production",
          label: "Local production",
          title: "Local food complements trade",
          text: "Local farms cannot replace imports, but they can strengthen supply for selected foods and preserve production capacity during disruptions. The value of local production depends on what is produced, not only how much.",
          link: "/dashboards/6",
          linkLabel: "Explore local production",
        },
        {
          id: "targets",
          label: "2035 targets",
          title: "The two targets face different gaps",
          text: "Protein is closer to its target, but progress relies heavily on eggs. Fibre is further away and requires reversing the decline in vegetable production.",
          link: "/dashboards/6",
          linkLabel: "See progress towards 2035",
        },
      ],
      placeholder: false,
    },
    {
      kicker: "Interpretation",
      title: "Three distinctions matter",
      points: [
        "Origin ≠ adequacy — self-sufficiency shows where supply comes from.",
        "Association ≠ causation — patterns do not prove cause and effect.",
        "Availability ≠ access — national supply does not show distribution.",
      ],
      placeholder: false,
    },
  ],
};

export const REFERENCES = [
  {
    short: "Baer-Nawrocka & Sadowski (2019)",
    text: "Food security and food self-sufficiency around the world: A typology of countries. PLOS ONE 14(3).",
    url: "https://doi.org/10.1371/journal.pone.0213448",
  },
  {
    short: "Clapp (2017)",
    text: "Food self-sufficiency: Making sense of it, and when it makes sense. Food Policy 66: 88–96.",
    url: "https://doi.org/10.1016/j.foodpol.2016.12.001",
  },
  {
    short: "FAO (2025)",
    text: "Food Balance Sheets 2010–2023.",
    url: "https://www.fao.org/statistics/highlights-archive/highlights-detail/food-balance-sheets-2010-2023/en",
  },
  {
    short: "MSE (2025)",
    text: "Speech by Ms Grace Fu at the Asia-Pacific Agri-Food Innovation Summit.",
    url: "https://www.mse.gov.sg/latest-news/asia-pacific-agri-food-innovation-summit--singapore-international-agri-food-week----ms-grace-fu/",
  },
  {
    short: "SFA (2026)",
    text: "Singapore Food Statistics 2025.",
    url: "https://www.sfa.gov.sg/news-publications/newsroom/singapore-food-statistics-2025",
  },
  {
    short: "Takahashi (2025)",
    text: "A new method for calculating the food self-sufficiency ratio. Agriculture & Food Security.",
    url: "https://doi.org/10.1186/s40066-025-00570-z",
  },
];
