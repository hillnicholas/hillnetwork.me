## Overview

I have focused a significant amount of time on learning IPv4 networking. I have a working knowledge of a number of protocols, including:

* Link Layer 
	* Ethernet
	* 802.11 b/g/n (basic understanding)
* Network Layer
	* IPv4
* Transport Layer
	* TCP
	* UDP
* Application Layer
	* SSH/SFTP
	* FTP
	* HTTP/HTTPS


During my time with InfoSec, I was responsible for ensuring the data entered in our instance of SecurityCenter was correct. I developed an algorithm that helped compare the IP range values that are stored by the SecurityCenter instance with the values given to us by network operations. 



## VPN technologies

I have worked with a number of VPN technologies, including SSL/TLS based VPNs (OpenVPN), IPSec/IKE based VPNs (Strongswan) and PPTP VPNs (Windows RAS). I have built these with a combination of different configurations, including:

* site-to-site
* host-to-host
* remote access
* route based
* policy based
* layer 2 tunneling
* layer 3 tunneling
* EAP authentication
* Public Key authentication
* MOBIKE
* VTI devices
* split tunneling


## Strongswan Simple Auto-configuration
[https://github.com/hillnicholas/easyswan](https://github.com/hillnicholas/easyswan)  
I wrote a shell script that allows someone to create a simple full-tunnel VPN for roadwarrior clients. The script configures a basic public key infrastructure automatically. Users can be added with ease using the same script. The script currently only supports generating working configurations for public key authentication only.


## OpenVPN Tunneled Bridging 
[https://github.com/hillnicholas/openvpnScripts](https://github.com/hillnicholas/openvpnScripts/blob/master/site-to-site-bridge.sh)  
I wrote a shell script that creates an Openvswitch bridge and automatically connects an OpenVPN TAP VTI device and adds a given ethernet port to it. This allows someone to connect to the VPN over the WiFi interface on their personal device, and have any other device connected to the ethernet on their personal device be automatically tunneled. This concept was tested, and was even able to relay DHCP discover and offer requests on the VPN server's subnet.


## Round-Robin VTI Switching
[https://github.com/hillnicholas/openvpnScripts/](https://github.com/hillnicholas/openvpnScripts/blob/master/route-switching.sh)  
I wrote another shell script that allows a user with multiple connected VTI devices to switch the default route at given time intervals. This was just a conceptual project rather than something with an actual use case, but I thought it was pretty neat.


## Software Defined Networking
For easy management from the router, I have my LXD bridge and KVM hosts bridged to my LAN. I've used both Linux bridge and Openvswitch in the past. I'm also very comfortable with iproute2 utilities. 


## PFSense
I have been using PFsense for my Openstack cloud project, and have been utilizing it's advanced firewall features and IPsec VPN support.

## DD-WRT 
I use DD-WRT for both my LAN in Morgantown and my LAN in Frederick. I found DD-WRT to be very customizable as well, and frequently use a number of it's features.

## Cisco IOS 
All of my wired devices have been connected to a Catalyst 3560 switch. I have a number of VLANs that I use to help segment my network.












