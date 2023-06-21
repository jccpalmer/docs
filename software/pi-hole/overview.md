---
title: Overview
description: 
published: true
date: 2023-06-21T13:32:09.213Z
tags: software, pi-hole, ads
editor: markdown
dateCreated: 2023-06-21T11:02:27.609Z
---

[Pi-Hole](https://pi-hole.net) is a popular DNS sinkhole that serves as network-wide ad blocking. It's easy to set up and it works wonders on blocking ads and trackers on your network. It can run on very light hardware, including its namesake, the Raspberry Pi. 

My installation sits in a [Linux Container (LXC)](https://linuxcontainers.org/) on one of my [Proxmox](https://www.proxmox.com/en/) nodes. (Proxmox is the hypervisor that I use on my servers.) An LXC is more lightweight than a full virtual machine, which is how I used to run Pi-Hole when I switched to a full server. 

With this project, I also use [Unbound](https://www.nlnetlabs.nl/projects/unbound/about/) for recursive DNS resolution. It supports both DNS-over-TLS and DNS-over-HTTPS for increased security and privacy. This means that I am not subject to a third-party for my DNS resolution, like Cloudflare or Google. One the great things about this is that it doesn't require much more effort or configuration on top of getting Pi-Hole going.