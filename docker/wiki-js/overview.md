---
title: Overview
description: This is a brief overview of Wiki.js
published: true
date: 2024-04-01T16:00:38.945Z
tags: docker
editor: markdown
dateCreated: 2024-04-01T15:45:16.764Z
---

[Wiki.js](https://js.wiki) is an open-source wiki engine written in JavaScript running in Node.js, and you can self-host it entirely like I do. I went the Docker route, the documentation for which follows, but the software works on macOS, Windows Server, and Kubernetes.

The robust feature set, attractive user interface (UI), and Markdown support drew me away from BookStack, my previous documentation platform. Wiki.js supports a visual editor if Markdown isn't your jam, git syncing, access control and guest view (like you're seeing now!), excellent asset management depending on your host's capabilities, and a great search engine. The admin panel sports plenty of controls to tweak, including a self-updater, even if you're a container.

I highly recommend the Docker route because it includes most of what you need to get up and running. I have a PostgreSQL container running alongside the Wiki.js one, which is one of the requirements. However, the software also supports MariaDB, MySQL, SQLite, and MS SQL.