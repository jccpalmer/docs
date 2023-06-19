---
title: Prerequisites and preparation
description: 
published: true
date: 2023-06-19T00:58:37.239Z
tags: docker, deluge, vpn
editor: markdown
dateCreated: 2023-06-19T00:58:34.711Z
---

### Background

This project sees a Deluge container route its traffic through a [Gluetun](http://docs.jccpalmer.com/books/docker/page/gluetun-vpn-documentation) container's network. A more thorough write-up is available [here](https://www.jccpalmer.com/homelab/deluge-docker-vpn/).

The below preparation will get a NAS server attached to the Docker host to which the Deluge container can download.

### Prerequisites

- A server, preferably with Debian, Ubuntu, or Alpine Linux installed.
- Docker and Docker Compose installed. (To avoid adding `sudo`, be sure to add your user to the docker group.)
- A text editor, such as nano or VSCode connected over SSH.
- A NAS with samba (SMB) file sharing enabled.
- An empty mount point for the SMB file share (e.g. /mnt).
- A knowledge of navigating a Linux filesystem.

### Limitations

This project has one notable limitation. If you use the Watchtower container to keep your other containers up-to-date, you will need to recreate the Deluge container every time Gluetun gets an update. This can happen frequently as, at time of writing, Gluetun is under active development. To avoid this issue, do not use Watchtower, but that would require manual Gluetun updating.

If the Deluge container goes down, simply navigate to its folder and recreate the container with the same Docker Compose command you will see later in these instructions.

### Preparation

1. Create a config folder on Docker host. (File structure depends on installation and personal preferences.)
    1. `mkdir docker/deluge/config`
2. Create a downloads folder if one does not already exist.
	1. `mkdir downloads`
3. Create a SMB credentials file. 
    1. `nano ~/.smbcredentials`
4. Insert the following into the blank file, making sure to use your own SMB credentials.  
    1. `username=USERNAME`
    2. `password=PASSWORD`
5. Set proper permissions for the credentials file. 
    1. `chmod 600 ~/.smbcredentials`
6. Add the SMB share to the /etc/fstab file, appending a new line. 
    1. `//SERVERIP/SHARENAME /MOUNTPOINT cifs credentials=/home/$USER/.smbcredentials 0 0`
    2. Example: `//192.168.1.100 /home/johnsmith/downloads cifs credentials=/home/johnsmith/.smbcredentials 0 0`
7. If CIFS-utils is not installed, install it.  
    1. If on Debian/Ubuntu: `sudo apt install cifs-utils`
    2. If on Alpine: `sudo apk add cifs-utils`
8. Mount the SMB share. 
    1. `sudo mount -a`