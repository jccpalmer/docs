---
title: Overview
description: 
published: true
date: 2023-06-19T00:55:42.307Z
tags: docker, deluge, vpn
editor: markdown
dateCreated: 2023-06-19T00:55:39.821Z
---

I set out on this project to create a [Deluge](https://deluge-torrent.org) container that would route through a virtual private network (VPN) and download files to my Network Attached Storage (NAS) server over the [Network File System (NFS)](https://en.wikipedia.org/wiki/Network_File_System) or [Samba (SMB)](https://en.wikipedia.org/wiki/Samba_(software)) protocols, which I would then sort through manually depending on the file type. Or, I would let Deluge continue to seed the file nested behind a VPN. 

This project requires the use of Gluetun, the details for which you can find in my [Gluetun documentation](https://docs.jccpalmer.com/books/docker/chapter/gluetun-vpn-tunnel) chapter.

Essentially, the way this works is that the Deluge Docker container is networked to the Gluetun container. This is done by having Gluetun handle Deluge's port configuraiton (default is port `8112`), which works because Deluge is networked to it. So when you go to `http://SERVERIP:8112`, you get the Deluge web UI with a different IP address than your public one.

The second step to this project was linking the Deluge container to a downloads folder on my NAS so that I wouldn't use the local storage on my server, which I would then have to transfer to the NAS and sort manually. With this configuration, the host server itself is linked to a download folder on my NAS via NFS (which I find works better since my server runs Debian), which I added as a volume in the Deluge container. When a file downloads to this folder, I am able to access it on my NAS and sort it from there.

This saves a monumental amount of time and it is rather simple to set up. I highly recommend that all homelabbers have a NAS of some kind, and linking servers to it is a key factor in its overall convenience.