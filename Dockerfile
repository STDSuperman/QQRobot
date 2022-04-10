
# FROM node:16-alpine
FROM --platform=linux/amd64 ubuntu
WORKDIR /code
RUN groupadd -g 1000 node \
    && useradd -u 1000 -g node -s /bin/sh node
# USER node
COPY --chown=node:node . .
# COPY . .
RUN \
  apt-get update && apt-get install wget unzip nodejs npm -y --no-install-recommends \
  # && mkdir node_modules && yarn install --registry https://registry.npm.taobao.org \
  && mkdir mcl \
  && cd mcl \
  && echo 'export PATH="/code/temp/jdk-17/bin:$PATH"' >> ~/.bashrc \
  && . ~/.bashrc \
  && wget https://github.com/iTXTech/mirai-console-loader/releases/download/v1.2.2/mcl-1.2.2.zip \
  && unzip mcl-1.2.2.zip \
  && chmod +x mcl \
  # && tar xvf https://download.java.net/java/GA/jdk17.0.1/2a2082e5a09d4267845be086888add4f/12/GPL/openjdk-17.0.1_linux-x64_bin.tar.gz \
  && apt-get purge --auto-remove \
  && rm -rf /tmp/* /var/lib/apt/lists/* \
USER node
CMD ["/code/mcl/mcl"]
# https://download.java.net/java/GA/jdk17/0d483333a00540d886896bac774ff48b/35/GPL/openjdk-17_linux-x64_bin.tar.gz.sha25