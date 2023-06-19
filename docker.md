---
title: Docker
description: This is where you can find documentation for my Docker projects
published: true
date: 2023-06-19T00:47:08.778Z
tags: docker
editor: markdown
dateCreated: 2023-06-18T20:56:05.958Z
---

# Docker projects

This section houses all documentation related to my self-hosted Docker container projects in my homelab. I run everything in a Debian virtual machine on a Proxmox server. This area is by far what I spend most of my time on. Full write-ups for these projects can be found on my [blog](https://www.jccpalmer.com/blog).

## Gluetun VPN tunnel

<details><summary>A container that can route other containers through a VPN</summary>
  
  **[Gluetun VPN tunnel](/docker/gluetun):** This document describes how to set up a Gluetun VPN tunnel Docker container through which other container traffic may be routed.
  
</details>

## Deluge VPN

<details><summary>A Deluge BitTorrent container that's masked behind a VPN</summary>
  
  **[Deluge VPN](/docker/deluge-vpn):** This document describes how to create a Deluge Docker container with traffic that routes through the Gluetun VPN tunnel described in another document. This will also show how to have Deluge download files to a NAS via a SMB share.
  
</details>