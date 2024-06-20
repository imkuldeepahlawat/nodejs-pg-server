# nodejs-pg-server

#### Setup And Start Server
```
git clone https://github.com/imkuldeepahlawat/nodejs-pg-server.git
cd node-pg-server
npm install
```
```
touch .env
echo 'PG_SECURE_URL = "POSTGRES_URL"' >> .env
echo 'PORT = "PORT_NUMBER"' >> .env
```
### Migrate Table
```
npm seed
```
### Start Server
```
npm dev
```
