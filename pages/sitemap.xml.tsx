const createSitemap = (
  host,
  links,
  languages
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${languages
          .map((lang) => {
            return links
              .map((link) => {
                if (lang === "en") {
                  return `<url><loc>http://www.${host}${link}</loc></url>`;
                }
                return `<url><loc>http://www.${host}/${lang}${link}</loc></url>`;
              })
              .join("");
          })
          .join("")}
    </urlset>
    `;

const Sitemap = () => {};

Sitemap.getInitialProps = ({ res, req }) => {
  res.setHeader("Content-Type", "text/xml");

  res.write(
    createSitemap(
      req.headers.host,
      [
        "",
        "/about",
        "/products",
        "/product/placecard",
        "/product/nametag",
        "/product/invitation",
        "/product/savethedate",
      ],
      ["en", "no"]
    )
  );
  res.end();
  return res;
};

export default Sitemap;
