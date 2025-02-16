import React from 'react';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/logo192.png" />

          <link rel="manifest" href="/manifest.json" />

          {/* General meta tags (per-page) */}
          <title data-react-helmet="true">Covid Act Now</title>
          <link
            data-react-helmet="true"
            rel="canonical"
            href="https://covidactnow.org/"
          />
          <meta
            data-react-helmet="true"
            name="description"
            content="U.S. COVID Risk & Vaccine Tracker. All 50 states. 3,000+ counties."
          />
          <meta data-react-helmet="true" name="image" content="" />

          {/* Facebook Open Graph meta tags (site-wide) */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Covid Act Now" />
          <meta property="og:image:type" content="image/png" />
          <meta property="fb:app_id" content="743805156345210" />

          {/* Facebook Open Graph meta tags (per-page) */}
          {/* NOTE: These are replaced at build time by scripts/generate_index_pages.ts */}
          <meta property="og:url" content="https://covidactnow.org" />
          <meta
            property="og:image:url"
            content="https://covidactnow.org/covidactnow.png?fbrefresh=v3"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="og:title"
            content="U.S. COVID Risk & Vaccine Tracker"
          />
          <meta
            property="og:description"
            content="Covid Act Now has real-time COVID data and risk level for your community. See how your community is doing at covidactnow.org."
          />

          {/* Twitter meta tags (site-wide) */}
          <meta name="twitter:card" content="summary_large_image" />

          {/* Twitter meta tags (per-page) */}
          {/* NOTE: These are replaced at build time by scripts/generate_index_pages.ts */}
          <meta
            name="twitter:image"
            content="https://covidactnow.org/covidactnow.png"
          />
          <meta
            name="twitter:title"
            content="U.S. COVID Risk & Vaccine Tracker"
          />
          <meta
            name="twitter:description"
            content="Covid Act Now has real-time COVID data and risk level for your community. See how your community is doing at covidactnow.org."
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />

          {/* Google Optimize for A/B testing */}
          <script
            async
            src="https://www.googleoptimize.com/optimize.js?id=OPT-WT27VPR"
          ></script>

          {/* Twitter universal website tag code */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              !function (e, t, n, s, u, a) {
                e.twq || (s = e.twq = function () {
                  s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = '//static.ads-twitter.com/uwt.js',
                  a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
              }(window, document, 'script');
              // Insert Twitter Pixel ID and Standard Event data below
              twq('init', 'o3f92');
              twq('track', 'PageView');
            `,
            }}
          />
          {/* End Twitter universal website tag code */}

          {/* Facebook Pixel Code */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                  n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
              }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '692591964861759');
              fbq('track', 'PageView');
            `,
            }}
          />
          {/* End Facebook Pixel Code */}

          {/* Global site tag (gtag.js) - Google Ads: 527465414 */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-527465416"
          ></script>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'AW-527465416');
            `,
            }}
          />
          {/* end google site tag */}

          {/* Event snippet for Website traffic conversion page */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              gtag('event', 'conversion', { 'send_to': 'AW-527465415/lRyqCM2a9-kBEMf3wfsB' });
            `,
            }}
          />

          <noscript>
            <img
              height="1"
              width="1"
              src="https://www.facebook.com/tr?id=692591964861759&ev=PageView&noscript=1"
            />
          </noscript>

          {/*<div dangerouslySetInnerHTML={{ __html: `
            <!-- injected styled-component styles -->
        `}} />*/}
          {this.props.styles}
          {/*<div dangerouslySetInnerHTML={{ __html: `
            <!-- end injected styled-component styles -->
      `}} />*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
