import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  // SPA redirect script - stores the original path and redirects to index
  // Based on https://github.com/rafgraph/spa-github-pages
  const redirectScript = `
    (function() {
      var path = window.location.pathname;
      var search = window.location.search;
      var hash = window.location.hash;

      // Don't redirect if already at base or has .html
      if (path === '${baseDir}' || path === '${baseDir}/' || path.endsWith('.html')) return;

      // Store the redirect path in sessionStorage
      sessionStorage.setItem('spa-redirect', path + search + hash);

      // Redirect to base path
      window.location.replace('${baseDir || "/"}');
    })();
  `

  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
