FROM node:22.17.1-alpine

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
