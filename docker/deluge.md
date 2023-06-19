---
title: Deluge VPN
description: 
published: true
date: 2023-06-19T13:26:18.917Z
tags: docker
editor: markdown
dateCreated: 2023-06-19T00:46:35.768Z
---

# Project scope

This document describes how to create a Deluge Docker container with traffic that routes through the Gluetun VPN tunnel described in the [Gluetun VPN Tunnel](/docker/gluetun) document. This will also show how to have Deluge download files to a NAS via an SMB share.

Please click the dropdowns below to access the section you need.

<details><summary>Overview</summary>
  
  **[Overview](/docker/deluge/overview):** This first section details the project's scope and purpose. It also provides some background on how I came up with the idea.
  
</details>

<details><summary>Prerequisites and preparation</summary>
  
  **[Prerequisites and preparation](/docker/deluge/prereq-prep):** This section details everything you need to get started and how to do it, including setting up an SMB share for Deluge to download to.
  
</details>

<details><summary>Installing the Deluge container</summary>
  
  **Installing the Deluge container:** This section outlines how to install the Deluge container, including the Docker Compose content.
  
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