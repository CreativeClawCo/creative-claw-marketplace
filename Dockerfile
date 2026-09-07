FROM node:22-slim
WORKDIR /app
COPY glama-mcp/package.json glama-mcp/package-lock.json* ./glama-mcp/
RUN cd glama-mcp && npm install --omit=dev
COPY glama-mcp/ ./glama-mcp/
WORKDIR /app/glama-mcp
CMD ["node", "server.mjs"]
