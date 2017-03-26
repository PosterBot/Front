FROM nginx:alpine

COPY dist /usr/share/nginx/html

# EXPOSE 8080

# CMD ["npm", "start"]
