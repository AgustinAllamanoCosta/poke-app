FROM node:hydrogen-slim as build

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn install 
RUN yarn build

FROM node:hydrogen-slim as prod

RUN addgroup --system nonrootgroup
RUN adduser --system nonroot --ingroup nonrootgroup

WORKDIR /usr/src/app

RUN chown -R nonroot:nonrootgroup /usr/src/app
RUN chmod 755 /usr/src/app

USER nonroot:nonrootgroup

COPY --chown=nonroot:nonrootgroup --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=nonroot:nonrootgroup --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "./dist/src/main"]
