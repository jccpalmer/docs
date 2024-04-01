---
title: Docker
description: 
published: true
date: 2024-04-01T17:26:45.913Z
tags: docker
editor: markdown
dateCreated: 2023-06-18T20:56:05.958Z
---

# Projects

This section houses all documentation related to my self-hosted Docker container projects in my homelab. I run everything in a Debian virtual machine on a Proxmox server. This area is by far what I spend most of my time on. Full write-ups for these projects can be found on my [blog](https://www.jccpalmer.com/blog).

Note that these are separate from my [software](/software) projects.

## Grav

<details><summary>My website's CMS.</summary>
  
  **[Grav](/docker/grav):** This document outlines how I set up Grav, a lightweight CMS for my website.
  
</details>

## Deluge VPN

<details><summary>A Deluge BitTorrent container that's masked behind a VPN.</summary>
  
  **[Deluge VPN](/docker/deluge):** This document describes how to create a Deluge Docker container with traffic that routes through the Gluetun VPN tunnel described in another document. This will also show how to have Deluge download files to a NAS via a SMB share.
  
  Start here first to ensure that you can install the Deluge container as-is, then proceed to the Gluetun instructions when directed.
  
</details>

## Gluetun VPN tunnel

<details><summary>A container that can route other containers through a VPN.</summary>
  
  **[Gluetun VPN tunnel](/docker/gluetun):** This document describes how to set up a Gluetun VPN tunnel Docker container that you can route other Docker container traffic through.
  
</details>

## Self-hosted gateway

<details><summary>A self-hosted Cloudflare Tunnel alternative.</summary>
  
  **[Self-hosted gateway](/docker/self-hosted-gateway):** This document details how to set up a self-hosted gateway to safely expose your services to the internet without opening ports 80 and 443 on your home network.
  
</details>

## Nginx Proxy Manager

<details><summary>A Docker container to manage Nginx proxies with a GUI, Let's Encrypt, and more.</summary>
  
  **[Nginx Proxy Manager](/docker/npm):** This document gives an overview of how to set up Nginx Proxy Manager to expose your services safely behind proxies. It will also show how to set up Let's Encrypt for SSL.
  
  </details>

## Calibre & Calibre Web

<details><summary>Calibre in a Docker container, along with Calibre Web for easier remote interaction and Kobo sync.</summary>
  
  **[Calibre and Calibre Web](/docker/calibre):** This document details how to run Calibre in a Docker container, sync to a NAS for automatic book addition, and set up Calibre Web (including syncing to Kobo).
  
</details>

## Jellyfin

<details><summary>A self-hosted media server; a FOSS alternative to Plex.</summary>
  
  **[Jellyfin](/docker/jellyfin):** This document goes over how I set up my Jellyfin Docker container that pulls media from my NAS.
  
</details>

## Audiobookshelf

<details><summary>A self-hosted audiobook server.</summary>
  
  **[Audiobookshelf](/docker/audiobookshelf):** This document details how I set up my Audiobookshelf Docker container that, much like Jellyfin, pulls data from my NAS and serves up my audiobooks for consumption better than any other service I could find.
  
  </details>

## Vaultwarden migration

<details><summary>A completely self-hosted password manager.</summary>
  
  **[Vaultwarden](/docker/vaultwarden):** This document discusses my migration from Enpass to Vaultwarden for password management. It also describes how to set up the Docker container.
  
</details>

## Homer dashboard

<details><summary>A self-hosted dashboard for local and public services.</summary>
  
  **[Homer](/docker/homer):** This document describes how to set up a self-hosted dashboard using a Homer Docker container.
  
</details>