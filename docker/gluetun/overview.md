---
title: Overview
description: 
published: true
date: 2023-06-19T00:24:31.872Z
tags: docker
editor: markdown
dateCreated: 2023-06-19T00:24:29.402Z
---

The goal of this project was to create a secure way to route traffic for some of my internet-facing Docker containers. I discovered the project via a YouTube video and dove right in. I use Proton VPN, a provider that makes it easy to get my sign-in credentails for the [OpenVPN](https://protonvpn.com/support/vpn-config-download/) and [Wireguard](https://protonvpn.com/support/wireguard-configurations/) protocols. (Instructions to acquire such files for Proton VPN linked.) 

Gluetun uses the [OpenVPN protocol](https://openvpn.net/community-resources/openvpn-protocol/), which works well enough for my homelab purposes. [Wireguard](https://www.wireguard.com/) is newer and more efficient, often resulting in higher throughputs. OpenVPN is also locked to one server, so when you download your OpenVPN configuration information, you'll need to pick the best server for you. If your VPN provider supports Wireguard, Gluetun also supports it.

The developer of Gluetun has built a wiki with instructions for each supported VPN provider, which streamlines the installation and setup processes. What I have written here is the workflow I followed for my own installation. If you're ready, feel free to get started with the [Gluetun VPN Tunnel: Prerequisites and preparation](https://docs.jccpalmer.com/books/docker/page/prerequisites-and-preparation-YRW) document.