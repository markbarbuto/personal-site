# Maintain search and answer-engine visibility

Use this checklist after a release and when changing public professional facts. SEO helps readers find the portfolio through search. AEO helps answer engines retrieve and accurately attribute the same visible facts. Neither guarantees ranking, indexing, or citations.

## Verify the release

1. Run the build, generated SEO checks, assistant checks, and browser tests from the README.
2. Request the homepage, `/projects/`, and every project URL directly. Confirm successful responses and full case-study text in the initial HTML.
3. Confirm one self-canonical per published page on `https://markbarbuto.com/`. Check production for accidental noindex metadata or headers.
4. Request `/robots.txt`, `/sitemap.xml`, and `/og-image.png`. Check content types and successful responses.
5. Request an unknown project and missing asset. Confirm actual 404 status codes instead of a successful homepage response.
6. Inspect the Vercel preview for noindex metadata or headers. Confirm configured HTTP and www aliases redirect to the chosen production hostname without loops.
7. Verify actual crawler access through permitted hosting settings and logs. A request with a crawler user agent is only a response-parity check.

## Review public facts

Use profile, experience, project, and skill data as the source of truth. Publish concise visible descriptions of the role, technical specialization, personal contributions, and supported outcomes. Distinguish working functionality from planned integrations.

Metadata, JSON-LD, case studies, and demo answers derive from those records. Check the configured external assistant separately. Its API and knowledge corpus are not managed here. Do not use generated transcripts as evidence of employment or project outcomes.

Search crawling and training permission are separate choices. The public robots policy allows search crawling. OAI-SearchBot is OpenAI's search crawler, while GPTBot has a separate training role. This implementation does not add a special training opt-in. Change training policy only as an explicit owner decision.

## Set up owner accounts

1. Verify the site in Google Search Console and Bing Webmaster Tools through the owner's accounts. Add provider verification records through the appropriate DNS or site workflow. Never commit account credentials.
2. Submit `https://markbarbuto.com/sitemap.xml` and inspect representative pages. Compare declared and selected canonicals.
3. Link the portfolio from professional profiles the owner controls, including GitHub and LinkedIn.
4. Keep account-only tasks pending until an actual submission or verification receipt exists.

## Monitor after 30 and 60 days

Record a dated baseline before judging outcomes. Compare search impressions, clicks, CTR, indexed URLs, and landing pages for branded and project-specific queries. Record contact-link activity if supported by existing analytics. Avoid recording chat contents or personal data.

Use the same small sample of answer-engine questions on each review date.

- Who is Mark Barbuto, and what software does he build?
- What experience does Mark Barbuto have with .NET and Azure?
- What is Mark Barbuto's role in Indigenous Supports from KHP?
- What is Vitae AI, and which capabilities are currently described as available?

Record the engine, date, exact question, answer accuracy, and cited URLs. Separate unsupported answers from missing citations. Track observed AI referrals while acknowledging that referrers can be absent. These observations are diagnostics, not deterministic acceptance tests.

## Compare loading performance

Retain a baseline production build before editing assets. Run both directories through the same harness.

```sh
npm run measure:performance -- path/to/baseline-dist dist
```

The harness alternates five cold-cache mobile navigations per build with the same browser, network, and CPU settings. It records LCP, CLS, initial image bytes, and JavaScript bytes under `.audit/seo-aeo/performance/`. Validate successful content and nonzero LCP before trusting timings. Inspect raw samples when variation approaches the observed difference.

Local transfer sizes come from static preview and do not represent Vercel compression or field performance. Compare gzip bundle sizes separately. Target field p75 LCP of at most 2.5 seconds, INP of at most 200 ms, and CLS of at most 0.1 when sufficient real-user data exists.

## Read provider guidance

- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- [Google AI features and websites](https://developers.google.com/search/docs/appearance/ai-features).
- [Google generative AI optimization](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).
- [Vercel preview indexing](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines).

Google does not require special AI files such as llms.txt or special AI schema. Keep content useful, factual, visible, and linked. Structured data describes visible entities and does not guarantee enhanced results.
