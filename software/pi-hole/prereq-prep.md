---
title: Prerequisites and preparation
description: 
published: true
date: 2023-06-21T11:10:23.195Z
tags: pi-hole, ads, soft
editor: markdown
dateCreated: 2023-06-21T11:10:23.195Z
---

## Prerequisites and preparation

To use Pi-Hole, it is recommended that you have a supported Linux distribution (distro) running. The Pi-Hole project officially supports Raspberry Pi OS, Ubuntu, Debian, Fedora, and CentOS. You can also install Pi-Hole in a Docker container, which is not described here.

Unbound should be available in all distro repositories.

For the sake of this documentation, I will assume that you're using a Debian-based distro. (From the supported list, that would be Debian itself, Ubuntu, and Raspberry Pi OS.)

You will need, at minimum, 2GB of file space (4GB is recommended) and 512MB of RAM. If you want to have internet access with no downtime, you will need a machine that runs 24/7. This could be something as small as a single-board computer (e.g. a Raspberry Pi, Orange Pi, etc.) or a cheap mini PC.

You will also need access to your router's DNS settings if you wish to apply Pi-Hole's ad blocking to your whole network. Please be sure you know how to do this, as it is outside the scope of this to cover every router manufacturer's firmware. (Most router interfaces can be found at `192.168.1.1` in your browser.)

If you can't change your router's DNS settings, you can still use Pi-Hole for ad blocking by changing the DNS settings on your devices. I encourage you to look up how to do that for your device(s) specifically as I will not cover that here.
