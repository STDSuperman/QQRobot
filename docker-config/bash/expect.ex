#!/usr/bin/expect -f
 
set timeout -1

spawn sh ./bash/install.bash

expect ">*"
 
send "1\r"

expect "Geographic area*"

send "6\r"

expect "Time zone:*"

send "31\r"

expect eof