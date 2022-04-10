# FROM node:16-alpine
FROM ubuntu
WORKDIR /code
# RUN addgroup -g 1000 node
# USER node
# COPY --chown=node:node . .
COPY . .
RUN apt-get update && apt-get install -y --no-install-recommends curl expect nodejs npm -y\
# set -e && apk add --no-cache --virtual .build-deps-yarn curl expect \
  # && mkdir node_modules && yarn install --registry https://registry.npm.taobao.org \
  && chmod +x ./bash/expect.ex \
  && chmod +x ./bash/install.bash \
  && expect ./bash/expect.ex \
  && apt-get purge --auto-remove \
  && rm -rf /tmp/* /var/lib/apt/lists/*
CMD ["/bin/bash"]