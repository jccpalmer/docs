---
title: Overview
description: 
published: true
date: 2023-06-19T19:17:30.101Z
tags: 
editor: markdown
dateCreated: 2023-06-19T19:17:30.101Z
---

I undertook this project to find an alternative to [Cloudflare Tunnels](https://www.cloudflare.com/products/tunnel). While Cloudflare offers an excellent service for homelabbers, and one I still use regularly — notably for my [website](https://www.jccpalmer.com) — there are limitations to the Terms of Service. Cloudflare does not allow for certain types of content to go through a Tunnel, such as media files. That meant exposing my Jellyfin server, for example, without opening ports 80 and 443 on my network would not be possible without violating Cloudflare's terms.

So I found an alternative, aptly named Self-Hosted Gateway ([GitHub link](https://github.com/fractalnetworksco/selfhosted-gateway)). This young project lets you establish your own gateway and tunnel system, though as far as I'm aware, it requires a virtual private server (VPS). Luckily, I can run the whole thing on a $5 per month nanode from Linode. (That's one CPU and 1GB of RAM.)

Self-Hosted Gateway is comprised of multiple technologies and scripting. To quote the developers:

> "This project automates the provisioning of a Reverse Proxy-over-VPN (RPoVPN) using WireGuard, Caddy and NGINX. It provides a self-hosted alternative to Cloudflare Tunnels, Tailscale Funnel or ngrok and is suitable for exposing services defined in a docker-compose file. There's no code or APIs, just a generic NGINX config and a short bash script. It automatically provisions TLS certs with Caddy's Automatic HTTPS feature via Let's Encrypt."

My favorite part is the automation of SSL certificates via Let's Encrypt, which the Caddy portion should renew automatically.

As of writing this, I only have one service properly tunneled, that being Jellyfin. I have yet to figure out how to expose multiple services in the same Docker Compose file. The project's documentation isn't all that descriptive.