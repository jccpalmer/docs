---
title: Prerequisites and preparation
description: 
published: true
date: 2023-06-19T00:35:55.145Z
tags: docker
editor: markdown
dateCreated: 2023-06-19T00:35:52.698Z
---

### Background

Gluetun is a thin, lightweight container written by qdm12 ([GitHub link](https://github.com/qdm12/gluetun)) with Alpine Linux as the base for a minimal install size. It allows for the tunneling of other containers' traffic through a supported VPN of your choice. This is especially useful for containers that connect to the internet, such as a BitTorrent application.

### Prerequisites

- A server, preferably running Debian, Ubuntu, or Alpine.
- Docker and Docker Compose installed.
- A text editor installed such as nano or VSCode over SSH.
- A valid VPN subscription with a supported provider.
	- The following providers are supported: AirVPN, Cyberghost, ExpressVPN, FastestVPN, HideMyAss, IPVanish, IVPN, Mullvad, NordVPN, Perfect Privacy, Privado, Private Internet Access, PrivateVPN, ProtonVPN, PureVPN, SlickVPN, Surfshark, TorGuard, VPNSecure.me, VPNUnlimited, Vyprvpn, WeVPN, Windscribe
- OpenVPN or Wireguard authentication details.

### Preparation

No preparation needed for this project. Please proceed to the [Installing the Gluetun container](/books/docker/page/installing-the-gluetun-container) document.