# Development Guide

This repository uses Jekyll to automatically convert Markdown files to HTML for GitHub Pages.

## Local Development

### Prerequisites

- Ruby version 2.5.0 or higher
- RubyGems
- GCC and Make

For mingw64 on windows:

   ```
   pacman -S --needed base-devel mingw-w64-x86_64-toolchain mingw-w64-x86_64-ruby
   ```

### Setup

1. Install Jekyll and Bundler gems:
   ```
   gem install jekyll bundler
   ```

2. Install dependencies:
   ```
   bundle install
   ```

3. Run the site locally:
   ```
   bundle exec jekyll serve
   ```

4. Browse to http://localhost:4000

## Adding Content

### Creating New Pages

To create a new page, add a Markdown file with front matter:

```markdown
---
layout: default
title: Your Page Title
---

* TOC
{:toc}

---

Content goes here...
```

### Linking to Pages

Use standard Markdown links with Jekyll syntax to reference other pages:

```markdown
[Link Text]({% link path/to/page.md %})
```

Jekyll will automatically convert these to the correct HTML links.

## Deployment

The site is automatically built and deployed to GitHub Pages when changes are pushed to the main branch using the GitHub Actions workflow defined in `.github/workflows/jekyll.yml`.