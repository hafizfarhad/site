---
title: OverTheWire Krypton Wargame Writeup
author: Hafiz Farhad
pubDatetime: 2024-10-21T09:12:47.400Z
modDatetime: 2024-11-21T09:12:47.400Z
slug: krypton-wargame
featured: false
draft: false
ogImage: /assets/forrest-gump-quote.webp
tags:
  - crypto
description: Krypton is a wargame designed by the OverTheWire community. It helps you learn cryptography and cryptanalysis.
---


## Table of contents

## Intro

It's been a while since I started learning about cryptography. And I came across OverTheWire community - good-looking hackers.

They have built wargames as fun games to learn security concepts. Today, I will be solving Krypton Wargames.

Krypton (as the name suggests) is all about cryptography and cryptanalysis.

So let's get started!

## Level 0

There are so many ways to solve this level - you can use online tools, write your own python script, or simply write a terminal command (which ever comfortable you feel with). I am going to decode this string using python scirpt.

```python
import base64

decoded_string = base64.b64decode('S1JZUFRPTklTR1JFQVQ=')

print(decoded_string.decode('utf-8'))
```
```KRYPTONISGREAT```

At this point we are done with _level 0_.

## Level 01

To solve level 01, we have to login on a remote server using ssh. 

```bash
ssh krypton1@krypton.labs.overthewire.org -p 2231
```

> Password is __KRYPTONISGREAT__.

Once we are logged in successfully. we will cd to _/krypton/_ directory and then into _/krypton1/_.

```bash
cd /krypton/krypton1/
```

Type ```ls``` and you'll see 2 files in the _/krypton1/_ directory: `krypton2` and `README`.

You can read both files in the terminal by using `cat` command.

```bash
cat README
```

It tells you about the password which is encrypted in the file `krypton2`. It also tells about the encryption algorithm used in the file `krypton2`, ROT13.

```bash
cat krypton2
```
It gives us encrypted password.

Now, let's decrypt the file `krypton2` and get the password.

```python
def rot13(message):
    result = []
    for char in message:
        if 'A' <= char <= 'Z': 
            result.append(chr((ord(char) - ord('A') + 13) % 26 + ord('A')))
        elif 'a' <= char <= 'z': 
            result.append(chr((ord(char) - ord('a') + 13) % 26 + ord('a')))
        else:
            result.append(char)
    return ''.join(result)

message = "YRIRY GJB CNFFJBEQ EBGGRA"
decoded_message = rot13(message)
print(decoded_message)
```
```LEVEL TWO PASSWORD ROTTEN```

Here we go. We got the password for _level 2_.

## Level 02