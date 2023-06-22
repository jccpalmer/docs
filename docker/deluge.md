---
title: Deluge VPN
description: 
published: true
date: 2023-06-22T20:03:08.253Z
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

This project sees a Deluge container route its traffic through a [Gluetun](/docker/gluetun) container's network. A more thorough write-up is available [here](https://www.jccpalmer.com/blog/deluge-docker-vpn).

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
4. Create a downloads folder if one does not already exist. (Important for mounting the SMB share properly!)
	1. `mkdir downloads`
5. Create a SMB credentials file. 
    1. `nano ~/.smbcredentials`
6. Insert the following into the blank file, making sure to use your own SMB credentials.  
    1. `username=USERNAME`
    2. `password=PASSWORD`
7. Exit the text editor and set proper permissions for the credentials file. 
    1. `chmod 600 ~/.smbcredentials`
8. Add the SMB share to the `/etc/fstab` file, appending a new line. 
    1. `//SERVERIP/SHARENAME /MOUNTPOINT cifs credentials=/home/$USER/.smbcredentials 0 0`
    2. Example: `//192.168.1.100 /home/johnsmith/downloads cifs credentials=/home/johnsmith/.smbcredentials 0 0`
9. If CIFS-utils is not installed, install it.  
    1. If on Debian/Ubuntu: `sudo apt install cifs-utils`
    2. If on Alpine: `sudo apk add cifs-utils`
10. Mount the SMB share. 
    1. `sudo mount -a`
  
</details>

<details><summary>Installing the Deluge container</summary>
  
## Project steps
  
Below are the steps to get the Deluge container installed. You will be adjusting this later, but this section is to help you get going. The full page version is available [here](/docker/deluge/install).

1. Create a YAML file named `docker-compose.yml` in your text editor or IDE of your choice and save it to the directory created in Step 1 in [Preparation](/docker/deluge/prereq-prep). 
    a. In this example, the file is saved under `~/docker/deluge`.
2. Copy the following code into the blank file. 
  
<details>
  <summary>Docker Compose</summary>
  
  ```yaml
      	---
      version: "2.1"
      services:
        deluge:
          image: lscr.io/linuxserver/deluge:latest
          container_name: deluge
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=YOUR_TIMEZONE_HERE (TZ FORMAT)
         volumes:
          - /home/USERNAME/docker/deluge/config:/config
          - /home/USERNAME/downloads:/downloads
         ports:
          - 8112:8112
          - 6881:6881
          - 6881:6881/udp
        restart: unless-stopped
  ```
  
</details>

2. Fill in *YOUR\_TIMEZONE\_HERE* with an appropriate tz database format timezone, which you can find [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
4. Fill in *USERNAME* with your user account's username.
5. Save the file, naming it `docker-compose.yml`. 
6. Navigate to the deluge container folder where you saved docker-compose.yml.
	a. `cd docker/deluge`
7. Input the following command to start up the container for automatic installation.
	a. `docker-compose up -d`
8. Wait for the download and installation to finish.
9. Once complete, open a web browser and enter the server's IP address followed by port `8112`.
	a. In this example, that would be `http://localhost:8112`
10. The Deluge web UI should open. It will ask for a username and password.
	a. Input `admin` for *username* and `deluge` for *password*.
11. You will see your server's public IP address in the bottom right corner. Confirm this by checking it via a site such as [What's My IP?](https://www.whatsmyip.org/). My IP address is blurred for security reasons.

![deluge-1-1.jpg](/deluge-1-1.jpg)

12. The Deluge container is installed and ready for use if you don't want it masked behind a VPN. Assuming that you do, open your terminal to the Deluge directory and type the following.
  	1. `docker-compose down`
  	2. This will stop the Deluge container so that you can start Gluetun on port `8112`.
13. Move over to Gluetun and refer to those [instructions](/docker/gluetun) on setting it up and starting it before proceeding to the next Deluge section.
  
</details>

<details><summary>Configuring the Deluge VPN</summary>
  
## Project steps

Below are the steps necessary to set up Deluge to connect through the Gluetun VPN tunnel. The full page version is available here.

1. Navigate to where you saved the Deluge `docker-compose.yml` file.
	2. In this example, it's under `docker/deluge`.
3. Your code should look like the following with TZ filled in with your time zone and USERNAME with your account username.
  
<details>
  <summary>Docker Compose v1</summary>
  
  ```yaml
      	---
      version: "2.1"
      services:
        deluge:
          image: lscr.io/linuxserver/deluge:latest
          container_name: deluge
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=YOUR_TIMEZONE_HERE (TZ FORMAT)
         volumes:
          - /home/USERNAME/docker/deluge/config:/config
          - /home/USERNAME/downloads:/downloads
         ports:
          - 6881:6881
          - 6881:6881/udp
        restart: unless-stopped
  ```
  
</details>
4. However, since we have told Gluetun to be listening on port `8112`, you need to remove it from the Deluge container's Docker Compose.
5. Further, you need to also link Deluge to Gluetun's network. So your Docker Compose code should look like the following.
  
  <details>
  <summary>Docker Compose v2a</summary>
  
  ```yaml
      	---
      version: "2.1"
      services:
        deluge:
          image: lscr.io/linuxserver/deluge:latest
          container_name: deluge
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=YOUR_TIMEZONE_HERE (TZ FORMAT)
         volumes:
          - /home/USERNAME/docker/deluge/config:/config
          - /home/USERNAME/downloads:/downloads
         ports:
          - 8112:8112
          - 6881:6881
          - 6881:6881/udp
        restart: unless-stopped
        network_mode:
          container: gluetun
  ```
  
</details>
6. Exit the Docker Compose file, then type the following command.
  	1. `docker compose up -d`
  
### Errors with `network_mode: container`
  
1. The container should start up with the previous configuration. If, however, you run into errors, you can shut Deluge down with the following command while inside the Deluge directory.
  	1. `docker compose down`
2. Open your `docker-compose.yml` file and try changing `network_mode` to `service: gluetun` like the below code.
  
<details>
  <summary>Docker Compose v2b</summary>
  
  ```yaml
      	---
      version: "2.1"
      services:
        deluge:
          image: lscr.io/linuxserver/deluge:latest
          container_name: deluge
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=YOUR_TIMEZONE_HERE (TZ FORMAT)
         volumes:
          - /home/USERNAME/docker/deluge/config:/config
          - /home/USERNAME/downloads:/downloads
         ports:
          - 8112:8112
          - 6881:6881
          - 6881:6881/udp
        restart: unless-stopped
        network_mode:
          service: gluetun
  ```
  
</details>
3. Load up the container again with the following command.
  	1. `docker compose up -d`
  
</details>

<details><summary>Optional: Using Portainer for installation</summary>
  
  *Using Portainer for installation:** In this optional section, I'll walk you through how to do this process in the Portainer GUI application.
  
</details>

<details><summary>Optional: Using the thin client application</summary>
  
  **Using the thin client application:** This optional section briefly goes over how to use the Deluge desktop application as a thin client.
  
</details>