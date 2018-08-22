# IOS 11.2 Free Wifi Tethering

### Required Software/Hardware
* OpenVPN Server (can be ran on loopback), with an publicly facing SSH daemon 
* A device that supports ad-hoc wifi networks (most laptop/operating system combinations support this)
* An IOS SSH client that supports port forwarding

### Overview
iPhones allow SSH tunnels to be active on all interfaces. This can be used to forward a TCP port to a VPN server for full IP tunneling. You can also port forward to a proxy server, but this can be somewhat restricting.

This system will involve 3 networks:

* **The ad-hoc WiFi network**- This connects the device we want to connect to the internet to the iPhone. Ad-hoc networks cannot currently be created on IOS 11.2.
* **The internet**- Your iPhone should be connected to the internet over the mobile network.
* **The VPN**- We will create a VPN connection to route all traffic through a tunnel.

We will need to glue these networks together. Heres high-level description one way to accomplish this:

1. Create the ad-hoc WiFi network  
2. Connect both the device we want to connect and the iPhone to it  
3. Create an SSH tunnel from the iPhone to the VPN server  
4. Connect to the OpenVPN server on the device we want to connect through the iPhone SSH tunnel  
5. Tether freely!  

#### Step 1. Creating the Ad-Hoc WiFi Network

This can be done pretty easily on both Linux and Windows, if your wireless card supports it.
* [Instructions for creating an ad-hoc wifi network with NetworkManager](https://help.ubuntu.com/community/WifiDocs/Adhoc) (Instructions are for Ubuntu, but the procedure is generally the same for most distros.)
* [Instructions for creating an ad-hoc wifi network on Windows](https://www.lifewire.com/set-up-an-ad-hoc-peer-wifi-network-818272) (Also has instructions for Macs)

Just be sure to not set the default gateway when defining the network. This will prevent the iPhone from actually bridging the connection to the internet. I had issues setting the ad-hoc network up with an encrypted connection. It shouldn't really matter security wise since all your traffic is getting tunneled through the VPN. Just make sure your firewall is up in case someone connects. You could also try using MAC address filtering, but that shouldn't be relied on. 

#### Step 2. Connect the Devices
This should be straightforward. Once again, check to make sure that the default gateway isn't set on either of the devices.

#### Step 3. Create the SSH tunnel
I used an app called Termius to create the tunnel. When you create the tunnel, the port forward wull be enabled on all device interfaces. This is what allows us to actually connect to the internet. You'll want to create a tunnel from a local port to the OpenVPN server port (usually 1194). Be sure to note the port you forwarded on the iPhone as we will have to modify our OpenVPN configuration.

----------------
``` 
iPhone:[5000] <====> VPNserver:[1194] 
```
----------------


#### Step 4. Connect to the OpenVPN Server
We will need to modify our OpenVPN configuration. We will no longer be connecting the the VPN through the internet, but through the SSH tunnel we created on our iPhone. Take note of the IP address of the iPhone and theOpen the configuration file with a text editor and make the following changes:

----------------
```
# find the line that says "remote" and comment it out. Create a new line with "remote" and 
# specify the IP address of the iPhone (on the wifi interface) with the port that you 
# forwarded to the VPN server.

remote 192.168.1.2 5000

# comment out existing config
# remote my.vpnserver.com 1194

```
----------------



#### Step 5. Tether Freely!
We should now be connected to to the VPN server through the SSH tunnel on the iPhone:

---------------------
``` 
ClientDevice <====> iPhone:[5000] <====> VPNserver:[1194] 
```

