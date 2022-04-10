#!/bin/bash
 
curl https://sh.rustup.rs -sSf | sh
echo $REPLAY
source $HOME/.cargo/env
mkdir mcl
cd mcl
git clone https://github.com/iTXTech/mcl-installer.git
cd mcl-installer
cargo build --features native-tls --release
cd target/release
cd ../../..
strip mcl-installer