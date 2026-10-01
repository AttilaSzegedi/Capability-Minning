import rss from '@astrojs/rss';

export async function GET(context) {
  const postImportResult = import.meta.glob('../content/blog/*.md', { eager: true });
  const posts = Object.values(postImportResult);
  
  return rss({
    title: 'Capability Minning Blog',
    description: 'A jövő technológiái és a jelen fenyegetései professzionális megközelítésben.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.pubDate),
      description: post.frontmatter.description,
      link: `/blog/${post.file.split('/').pop().split('.').shift()}/`,
    })),
    customData: `<language>hu-hu</language>`,
  });
}
