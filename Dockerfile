FROM alpine
RUN apk add --update nodejs npm && npm install -g yarn
RUN addgroup -S node && adduser -S node -G node
USER node
WORKDIR /code
COPY --chown=node:node . .
RUN mkdir node_modules && yarn install
CMD ["yarn", "build"]