---
title: Installing the Gluetun container
description: 
published: true
date: 2023-06-21T13:36:00.039Z
tags: docker
editor: markdown
dateCreated: 2023-06-19T00:39:00.631Z
---

## Project steps

Below are the steps needed to get the Gluetun container installed.

1. Create a folder for the Gluetun container.
	1. In this example, that would be `docker/gluetun`
1. Move into that new directory.
	1. `cd docker/gluetun`
2. Create a file called `docker-compose.yml`
3. Open the `docker-compose.yml` file in a text editor.
4. Copy the following contents into it. It is recommended to copy this code first into a blank notepad file to strip any formatting.
```
version: "3"
services:
  gluetun:
    image: qmcgaw/gluetun
    container_name: gluetun
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    ports:
      - 8888:8888/tcp # HTTP proxy
      - 8388:8388/tcp # Shadowsocks
      - 8388:8388/udp # Shadowsocks
      - 8112:8112 # Deluge (optional)
    volumes:
      - /home/USERNAME/docker/gluetun:/gluetun
    environment:
      - VPN_SERVICE_PROVIDER=VPNPROVIDER
      - VPN_TYPE=openvpn
      # OpenVPN:
      - OPENVPN_USER=OPENVPN_USERNAME
      - OPENVPN_PASSWORD=OPENVPN_PASSWORD
      # Wireguard:
      # - WIREGUARD_PRIVATE_KEY=wOEI9rqqbDwnN8/Bpp22sVz48T71vJ4fYmFWujulwUU=
      # - WIREGUARD_ADDRESSES=10.64.222.21/32
      # Timezone for accurate log times
      - TZ=YOURTIMEZONE
```
6. You will need to determine which protocol your VPN provider wants you to use. ProtonVPN, for example, uses OpenVPN at time of writing and did not offer a Wireguard configuration.
7. Exit the text editor.
8. If you are following the [Deluge VPN](https://docs.jccpalmer.com/books/docker/chapter/deluge-vpn) instructions, do not start the Gluetun container yet.
9. If you are not following the Deluge VPN instructions, then type the following.
	1. `docker-compose up -d`
10. The Gluetun container will download the resources it needs and start. 
11. To tunnel other containers through Gluetun, you will need to add the following line to their `network_mode` (with the quotes).
	1. `"service:gluetun"`