FROM node:16-alpine
WORKDIR /code
COPY --chown=node:node . .
RUN apk add --no-cache --virtual .build-deps-yarn curl git  \
  # && mkdir node_modules && yarn install --registry https://registry.npm.taobao.org \
  && mkdir mcl \
  && cd mcl \
  && curl https://sh.rustup.rs -sSf | sh \
  && source $HOME/.cargo/env \
  && git clone https://github.com/iTXTech/mcl-installer.git \
  && cd mcl-installer \
  && cargo build --features native-tls --release \
  && cd target/release && strip mcl-installer \
  && apk del .build-deps-yarn
USER node
CMD ["./mcl/mcl-installer-1.0.4-linux-amd64"]