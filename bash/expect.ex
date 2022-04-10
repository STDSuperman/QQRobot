#!/usr/bin/expect -f
 
set timeout -1

spawn sh ./bash/install.bash
 
expect ">*"
 
send -- "1\r"
 
expect eof