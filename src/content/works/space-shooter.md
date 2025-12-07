---
sortOrder: 3
title: Space Shooter
slug: space-shooter
description: A multiplayer space game made with Raylib
thumbnail: /images/works/space-shooter/thumb.png
github: https://github.com/vakisddot/space-shooter
featured: true
---
This is a very rough **space-shooter game** that was made entirely with the purpose of experimentation.

As my first real C++ project, it made me understand that I was very spoiled as a .NET developer! Not only did I have to go through hell to have all of my headers work as intended, but I also had to deal with memory leaks and bugs that I couldn’t even comprehend!

And because I apparently like to make my life hell, I decided to add multiplayer as well. This is where everything “went wrong”, the game framework that i chose (Raylib), and the networking abstraction (ENet) didn’t like each other very much for some reason, and whenever `“enet.h”` was referenced along with `“raylib.h”` in the same file, the damn game wouldn’t even compile, meaning that I had to do some crazy workarounds just to get the entire thing to work!

But it does, you can actually **host a server** and **play with other players**, but there’s also a lot that I would probably fix if I find the time to do so :(

## Technologies used:

*   **Raylib (C++)**
    
*   **ENet**