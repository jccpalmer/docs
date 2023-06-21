---
title: Installing Pi-Hole
description: 
published: true
date: 2023-06-21T13:06:41.561Z
tags: software, ads, pi-
editor: markdown
dateCreated: 2023-06-21T11:07:17.020Z
---

1. Open a terminal on the machine you'd like to install Pi-Hole on, be it locally or over SSH.
2. Input the following command in the terminal.
	1. `curl -sSL https://install.pi-hole.net | bash`
3. Enter your user account password. Let the installation script goes through its process until it asks you for input. Follow the prompts.
4. At the **Choose An Interface** screen, your default ethernet device should be the first option selected. It might be called `eth0` or `ens18`.
5. On the **Choose Upstream DNS Provider** screen, for now, choose something like Google. You will be changing this later after you uninstall and configure Unbound. 
6. On the **Blocklists** screen, select `Yes` to use the default blocklist. You can adjust this later if you choose.
7. On the **Admin Web Interface** screen, select `Yes`.
8. On the **Web Server** screen, select `Yes` to install admin interface's web server requirements.
9. At **Enable Logging**, this is a personal preference. If you want to see everything that Pi-Hole is blocking and allowing, select `Yes`. Otherwise, select `No`.
10. If you opted to enable logging, choose what privacy level you would like. The default, **Show Everything**, can be helpful for troubleshooting or simply for those curious.
11. After this, the script will continue its installation process.
12.  Be sure to set a static IP address for the Pi-Hole machine in your router settings.
13. To access the admin interface, in your browser, type in either `http://pi.hole/admin` or `http://SERVERIP/admin`.
14. The following screen will appear.
15. To access the password, go back to the terminal window and look several lines up from the bottom for a line that says `Web Interface Password:`.
	1. It should be in green text.
16. Once you enter your password, you will see the web interface, which should look like the below image.
17. Go to your router's DNS settings and input the Pi-Hole server's IP address. Save the options and go test an ad-heavy website, such as [MSN](https://www.msn.com).