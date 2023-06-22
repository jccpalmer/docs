---
title: Deluge VPN
description: 
published: true
date: 2023-06-22T19:12:34.839Z
tags: docker
editor: markdown
dateCreated: 2023-06-19T00:46:35.768Z
---

# Project scope

This document describes how to create a Deluge Docker container with traffic that routes through the Gluetun VPN tunnel described in the [Gluetun VPN tunnel](/docker/gluetun) document. This will also show how to have Deluge download files to a NAS via an SMB share.

Please click the dropdowns below to access the section you need.

<details><summary>Overview</summary>
  
I set out on this project to create a [Deluge](https://deluge-torrent.org) container that would route through a virtual private network (VPN) and download files to my Network Attached Storage (NAS) server over the [Network File System (NFS)](https://en.wikipedia.org/wiki/Network_File_System) or [Samba (SMB)](https://en.wikipedia.org/wiki/Samba_(software)) protocols, which I would then sort through manually depending on the file type. Or, I would let Deluge continue to seed the file nested behind a VPN. 

This project requires the use of Gluetun, the details for which you can find in my [Gluetun documentation](/docker/gluetun).

Essentially, the way this works is that the Deluge Docker container is networked to the Gluetun container. This is done by having Gluetun handle Deluge's port configuraiton (default is port `8112`), which works because Deluge is networked to it. So when you go to `http://SERVERIP:8112`, you get the Deluge web UI with a different IP address than your public one.

The second step to this project was linking the Deluge container to a downloads folder on my NAS so that I wouldn't use the local storage on my server, which I would then have to transfer to the NAS and sort manually. With this configuration, the host server itself is linked to a download folder on my NAS via NFS (which I find works better since my server runs Debian), which I added as a volume in the Deluge container. When a file downloads to this folder, I am able to access it on my NAS and sort it from there.

This saves a monumental amount of time and it is rather simple to set up. I highly recommend that all homelabbers have a NAS of some kind, and linking servers to it is a key factor in its overall convenience.
  
</details>

<details><summary>Prerequisites and preparation</summary>
  
## Background

This project sees a Deluge container route its traffic through a [Gluetun](/docker/gluetun) container's network. A more thorough write-up is available [here](https://www.jccpalmer.com/homelab/deluge-docker-vpn/).

The below preparation will get a NAS server attached to the Docker host that the Deluge container can download to.

## Prerequisites

- A server, preferably with Debian, Ubuntu, or Alpine Linux installed.
- Docker and Docker Compose installed. (To avoid adding `sudo`, be sure to add your user to the docker group.)
- A text editor, such as nano or VSCode connected over SSH.
- A NAS with samba (SMB) file sharing enabled.
- An empty mount point for the SMB file share (e.g. `/mnt` or `~/downloads`).
- A knowledge of navigating a Linux filesystem.

## Limitations

This project has one notable limitation. If you use the Watchtower container to keep your other containers up-to-date, you will need to recreate the Deluge container every time Gluetun gets an update. This can happen frequently as, at time of writing, Gluetun is under active development. To avoid this issue, do not use Watchtower, but that would require manual Gluetun updating.

If the Deluge container goes down, simply navigate to its folder and recreate the container with the same Docker Compose command you will see later in these instructions.

## Preparation

1. Create a Docker folder.
  	1. `mkdir docker`
2. Create a Deluge folder inside the Docker one you just created.
  	1. `mkdir docker/deluge`
3. Create a config folder on Docker host. (File structure depends on installation and personal preferences.)
    1. `mkdir docker/deluge/config`
4. Create a downloads folder if one does not already exist.
	1. `mkdir downloads`
5. Create a SMB credentials file. 
    1. `nano ~/.smbcredentials`
6. Insert the following into the blank file, making sure to use your own SMB credentials.  
    1. `username=USERNAME`
    2. `password=PASSWORD`
7. Set proper permissions for the credentials file. 
    1. `chmod 600 ~/.smbcredentials`
8. Add the SMB share to the /etc/fstab file, appending a new line. 
    1. `//SERVERIP/SHARENAME /MOUNTPOINT cifs credentials=/home/$USER/.smbcredentials 0 0`
    2. Example: `//192.168.1.100 /home/johnsmith/downloads cifs credentials=/home/johnsmith/.smbcredentials 0 0`
9. If CIFS-utils is not installed, install it.  
    1. If on Debian/Ubuntu: `sudo apt install cifs-utils`
    2. If on Alpine: `sudo apk add cifs-utils`
10. Mount the SMB share. 
    1. `sudo mount -a`
  
</details>

<details><summary>Installing the Deluge container</summary>
  
  **[Installing the Deluge container](/docker/deluge/install):** This section outlines how to install the Deluge container, including the Docker Compose content.
  
</details>

<details><summary>Configuring the Deluge VPN</summary>
  
  **Configuring the Deluge VPN:** This final required section outlines how to configure the Deluge container to route its traffic through Gluetun.
  
</details>

<details><summary>Optional: Using Portainer for installation</summary>
  
  *Using Portainer for installation:** In this optional section, I'll walk you through how to do this process in the Portainer GUI application.
  
</details>

<details><summary>Optional: Using the thin client application</summary>
  
  **Using the thin client application:** This optional section briefly goes over how to use the Deluge desktop application as a thin client.
  
</details>