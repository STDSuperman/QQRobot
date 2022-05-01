
# FROM node:16-alpine
FROM --platform=linux/amd64 ubuntu:16.04
WORKDIR /mirai
RUN groupadd -g 1000 -r node \
    && useradd -u 1000 -r -g node -s /bin/sh node\
    && apt-get update && apt-get install wget unzip nodejs language-pack-zh-hans npm -y --no-install-recommends \
    && mkdir mcl \
    && cd mcl \
    && wget https://github.com/iTXTech/mirai-console-loader/releases/download/v1.2.2/mcl-1.2.2.zip \
    && unzip mcl-1.2.2.zip \
    && chmod +x mcl \
    && echo -e 'LANG="zh_CN.UTF-8"\nLANGUAGE="zh_CN:zh"\nLC_NUMERIC="zh_CN"\nLC_TIME="zh_CN"\nLC_MONETARY="zh_CN"\nLC_PAPER="zh_CN"\nLC_NAME="zh_CN"\nLC_ADDRESS="zh_CN"\nLC_TELEPHONE="zh_CN"\nLC_MEASUREMENT="zh_CN"\nLC_IDENTIFICATION="zh_CN"\nLC_ALL="zh_CN.UTF-8"' > /etc/default/locale \
    && echo -e 'LANG="zh_CN.UTF-8"\nLANGUAGE="zh_CN:zh"\nLC_NUMERIC="zh_CN"\nLC_TIME="zh_CN"\nLC_MONETARY="zh_CN"\nLC_PAPER="zh_CN"\nLC_NAME="zh_CN"\nLC_ADDRESS="zh_CN"\nLC_TELEPHONE="zh_CN"\nLC_MEASUREMENT="zh_CN"\nLC_IDENTIFICATION="zh_CN"\nLC_ALL="zh_CN.UTF-8"' >> /etc/environment
WORKDIR /mirai/mcl
# USER node
COPY --chown=node:node ./docker-config/mirai /mirai
# COPY . .
SHELL ["/bin/bash", "-c"]
RUN \
  # && mkdir node_modules && yarn install --registry https://registry.npm.taobao.org \
  # && echo 'nameserver 8.8.8.8' >> /etc/resolv.conf \
  # && chmod -R +x /code/bash \
  # && bash /code/bash/install.bash \
  # && /bin/bash -c "source ~/.bashrc" \
  # && /bin/bash -c "source /etc/profile" \
  bash \
  && rm /bin/sh \
  && ln -s /bin/bash /bin/sh \
  && ls -al /bin/sh \
  && echo 'no' | dpkg-reconfigure dash \
  && echo 'export LANG="zh_CN.UTF-8"'  >> /etc/profile \
  && echo 'export PATH="/mirai/temp/jdk-17/bin:$PATH"' >> ~/.bashrc \
  # && cat ~/.bashrc \
  && . ~/.bashrc \
  && . /etc/profile \
  && export PATH="/mirai/temp/jdk-17/bin:$PATH" \
  && mkdir -p /mirai/mcl/config/net.mamoe.mirai-api-http \
  && cat /mirai/config/mirai-api-http-setting.yml > /mirai/mcl/config/net.mamoe.mirai-api-http/setting.yml \
  && ./mcl --update-package net.mamoe:mirai-api-http --channel stable-v2 --type plugin \
  # && wget -P /code/temp https://download.java.net/java/GA/jdk17.0.1/2a2082e5a09d4267845be086888add4f/12/GPL/openjdk-17.0.1_linux-x64_bin.tar.gz \
  # && tar xvf /code/temp/openjdk-17.0.1_linux-x64_bin.tar.gz \
  && apt-get purge --auto-remove \
  && rm -rf /tmp/* /var/lib/apt/lists/*
RUN yarn start:dev
# USER node
# CMD ["/code/mcl/mcl"]
# CMD ["cd", '/mirai/mcl', '&&', './mcl']
CMD ["/bin/bash"]