---
title: Technical Analysis of WannaCry Ransomware
author: Hafiz Farhad
pubDatetime: 2024-09-21T09:12:47.400Z
modDatetime: 2024-11-21T09:12:47.400Z
slug: wannacry-ransomware
featured: true
draft: false
ogImage: /assets/forrest-gump-quote.webp
tags:
  - malware
description: WannaCry is a self-propagated malware, classified as crypto-ransomware, that spread around the internet infecting over 250k computers in more than 150 countries.
---

## Table of contents

## Intro

WannaCry (also known as WanaCrypt0r/WanaDecrypt0r) is a ransomware, a type of malware that encrypts all files and in return asks for money to decrypt them. It’s beta version was discovered on February 9, 2017, and then WannaCry v1.0 was found on March 18, 2017, and finally WannaCry v2.0 was found on May 12, 2017.

WannaCry is special because it is a network worm — it has capabilities to travel (or self-propagate) via computer network(s).

WannaCry is considered to be the biggest ransomware outbreak in history. Because, In the first week of its propagation, it infected over 250k computers in more than 150 countries. Notable victims included FedEx, Honda, Nissan, and the UK’s National Health Service (NHS).

Within a few hours of propagation, WannaCry was neutralized (by the killswitch method) temporarily by a security researcher, [Marcus Hutchins](https://malwaretech.com/).

WannaCry utilizes EternelBlue, a vulnerability exploit developed by the National Security Agency (NSA). But it was stolen by a group called the Shadow Brokers, and the NSA was itself compromised too.

It actively probes the Server Message Block (SMB) protocol, which operates over TCP ports __139__ and __445__. Although Microsoft patched the SMB vulnerability with [MS17-010](https://learn.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010), many systems had not been updated prior to the release of WannaCry, and many of the organizations at that time were using Windows XP, which was not patched until after the attack.

### Experiment

In order to learn more about WannaCry. I have used the following tools to perform both static as well as dynamic analysis:

1. **WannaCry Malware** - You know what it is.

2. **Windows 10 Pro** - Where the malware was executed (victim’s machine).

3. **FLOSS** - An alternative to strings.exe.

4. **UniExtractor** - Extract files from any type of extractables.

5. **PEview** - A tool to view the structure and content of executables.

6. **FakeNet-NG** - A tool that is used to simulate the internet.

7. **Wireshark** - Packet analyzer used for network analysis.

8. **Regshot** - Registry compare utility.


## Static Analysis

I’ll start from very basic static analysis (and is considered a good practice) - to get the hash of a sample and see if anyone has already submitted (or reported) this piece of software as malware.

Once we get the hash, there is a website named virustotal where we can check if this hash is reported as malicious or not.

Now let’s get the hash of WannaCry executable and analyze it on virustotal.

So first we have to unzip the file.

It’s asking for a password.

OK…

Most of the time, malware zip files are protected by simple passwords (provided by authors) to prevent accidental execution.

Once we unzip the file. We need to get the md5sum of an actual WannaCry executable and paste it on virustotal.

```shell
md5sum wannacry.exe
```

See the difference.

71 out of 75 security vendors have marked this hash as malicious. Interesting!

Ok, So, I think we are done with our first part of static analysis.

Now let’s analyze this executable through a basic tool called FLOSS.

FLOSS is basically an improved version of strings.exe. It extracts as many (human-readable) strings as possible from the binary (or executable) file. It can print them out on the screen, or you can simply extract them in a *.txt file.

For now, I will extract all the strings into a output.txt file.

```shell
floss.exe wannacry.exe > output.txt
```

Let’s open output.txt and see if we got something.

Ok…, So, usually FLOSS decodes strings (if encrypted) right in the bottom of the file, but I guess we got unlucky today. And there’re no decoded strings. But you can see all the words (and strings) used in the WannaCry executable file.

Let’s look at another tool called UniExtract.

UniExtract extracts Dynamic Link Libraries (DLLs) and executables present in a file.

So, I’m gonna give it a WannaCry binary. Although it could not extract files. But we got information about which files are present in the WannaCry binary.

See all the language packs with the .Wnry extension.

Also remember the output.txt file mentioned above? The same files were present there too.

Looks Interesting. LOL

Ok, so let’s look at the last tool: PEview.

The good thing about PEview is that it makes the file structure very readable. Like where are the headers, where is the data, and all the other stuff. file anddd hit ENTER.

OPPPS…

Another error.

UniExtract didn’t work as expected. I don’t know why.

Let’s hit yes and see what’s up there.

The important thing is if you see a virtual size significantly greater than the size of raw data. Then it is an indicator that this file is doing something extra.

Actually, the size of raw data means the size of binary when it is at rest. And the virtual size means the size of the binary when it’s started running.

From this, we can conclude that if the virtual size is significantly higher than the size of raw data, We can say that it’s a packed binary file, and it is loading (or unpacking) some extra libraries at runtime.

To conclude our static analysis, we got md5sum of the WannaCry binary file and confirmed that the file is malicious, and then we ran a FLOSS tool to extract strings (and keywords), which included language packers, DLLs, and some executables, which was later confirmed by UniExtractor. Although UniExtractor didn’t extract all files (DLLS and executables), we got the idea. And then finally we ran a PEview and analyzed section headers and size of the data.

So, now let’s move to another part of our analysis.

## Dynamic Analysis

Before we start dynamic analysis let’s check if we are secure enough.

Hmmm, everything looks good.

Now, let’s run the WannaCry executable and see what is there for us.

Hehe! Looks cool! Now, we have to set up tools to analyze its behavior.

Let’s start with FakeNet-NG to see if this executable calls over the internet when executed.

Basically, FakeNet-NG will trick the malware into thinking that there’s internet available (while in actuality there is no internet connection, LOL).

First we have to open FakeNet-NG.

You can see in the picture b. (After malware execution), an exe file (svchost.exe) is making TCP and UDP requests. Most probably the malware is using its worm-like capabilities and trying to take over the computer network(s).

How about looking at actual traffic?

So, let’s open Wireshark. And see what happens on the network when ransomware is executed.

See the ARP requests? It is trying to bruteforce and connect with every IP present on the networks.

Basically, it’s checking other computers on the network and trying to translate there (if possible).

Let’s open another tool called Regshot.

Regshot tries to compare delta between two states of our system and looks for registry keys, files, and directories that are changed, moved, or deleted.

Let’s take the first snapshot.

Once we are done.

We’ll run the WannaCry executable.

OK, So, I have executed malware, and now it’s time to take a 2nd snapshot.

Once we are done with the 2nd snapshot, just hit compare.

You can see the delta between two shots.

I think that’s it for the WannaCry analysis.

But hopefully I will try to explore this dynamic analysis on more malwares in the future, InshaAllah.

## Conclusion

To conclude dynamic analysis, we used 3 different tools: Regshot, FakeNet-NG, and Wireshark. 
We saw WannaCry’s worm-like capabilities in the Wireshark tool. Where it was trying to bruteforce IP’s and transmit to other nodes on the network. 
In FakeNet-NG, we noticed the executable was trying to access the internet. 
And in the last part, in Regshot, we saw a huge difference between two snapshots (because, as we know, it encrypts files, directories, and changes permission modes).