## Overview

I've done several interesting school projects over the years. This page holds a brief description of some of them.

## Haiku Generator 
This was created during my compiler class using sentence structures. The assingment was to have a .txt file that contained a comma-separated table of predefined word and the season they relate to. The user then specifies the season, and a haiku get's generated for them. I took a slightly different approach. I was lazy, and didn't want to manually create a word table. My implementation was written in python and queried a REST API to find related words to a topic and used those. This took a shorter amount of time and also gave users an unlimited set of topics they could choose from, rather than just the 4 seasons. 

This implementation also inspired me to create a twitter bot. The twitter bot code was based off the haiku generator but worked a little differently. It would parse every word in it's feed and their number of occurences in a dictionary. The words would then be sorted by occurence and used to form basic sentence structures. Additionally, the bot would go to the first profile in the feed, go to their followers list, and begin following a predetermined number of their followers. The issue was that the bot started following right-wing extremists, who followed other right-wing extremists. Because of how the bot was programmed, the bot would then start saying extreme right-wing statements. At that point, I decided to end the project. I may revisit it using an AI approach.


## Face Detecting Sentry Turret 
This was my first major programming project. Before this course, I had never programmed anything. This assignment was what made me change my major to computer science. The assignment was very open-ended, and we just had to manipulate a robot arm with MATLAB code. Me and my partner, Will, decided we wanted to do something crazy. It turns out that MATLAB has tons of image processing features, including depth perception. So we decided to give the robot depth perception, so it could calculate the location of a person and point nerf guns in that direction. The project was a major success and very fun. The technical report for this project can be found here: [Engr102project.pdf](documents/Engr102project.pdf)


## Simple Operating System
This was completed for CS450, the operating systems class. We learned about the history of operating systems and how they have evolved. We were assigned to create a (very) basic operating system in through a number of modules. The project was written almost entirely in C, with no system calls or libraries. The system call to perform the context switching had written in assembly. We had to implement the command handler that polled user input, define processes with process control block structs, implement the logic for the scheduler, and create a memory management system. The project was quite challenging, and very tedious. The material was rewarding to learn.




