import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  // Script to redirect to .html version of the path if it exists
  const redirectScript = `
    (function() {
      const path = window.location.pathname;
      // Don't redirect if already has .html or is root
      if (path.endsWith('.html') || path === '${baseDir}' || path === '${baseDir}/') return;

      // Try fetching the .html version
      const htmlPath = path.endsWith('/') ? path.slice(0, -1) + '.html' : path + '.html';
      fetch(htmlPath, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            window.location.replace(htmlPath);
          }
        })
        .catch(() => {});
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
