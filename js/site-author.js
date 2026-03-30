(function() {
  'use strict';

  const siteAuthor = {
    name: 'M.C.Aksoy',
    image: 'https://avatars.githubusercontent.com/u/20202577?s=400&u=bac8e22e3ed6004e83eeed1a89beee848072ba64&v=4',
    bio: 'Founder of Regional Price Calculator, focused on global pricing strategy, monetization, and regional market expansion.'
  };

  window.SITE_AUTHOR = siteAuthor;

  function applyAuthorProfile() {
    document.querySelectorAll('meta[name="author"]').forEach((meta) => {
      meta.setAttribute('content', siteAuthor.name);
    });

    document.querySelectorAll('meta[property="article:author"]').forEach((meta) => {
      meta.setAttribute('content', siteAuthor.name);
    });

    document.querySelectorAll('[data-site-author-name]').forEach((node) => {
      node.textContent = siteAuthor.name;
    });

    document.querySelectorAll('[data-site-author-bio]').forEach((node) => {
      node.textContent = siteAuthor.bio;
    });

    document.querySelectorAll('[data-site-author-image]').forEach((img) => {
      img.setAttribute('src', siteAuthor.image);
      img.setAttribute('alt', siteAuthor.name + ' profile picture');
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });

    document.querySelectorAll('script[type="application/ld+json"][data-site-author-schema]').forEach((script) => {
      let content = script.textContent;
      content = content.replace(/__SITE_AUTHOR_NAME__/g, siteAuthor.name);
      content = content.replace(/__SITE_AUTHOR_IMAGE__/g, siteAuthor.image);
      content = content.replace(/__SITE_AUTHOR_BIO__/g, siteAuthor.bio);
      script.textContent = content;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAuthorProfile);
  } else {
    applyAuthorProfile();
  }
})();
