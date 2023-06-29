git checkout .
rm -drf ./node_modules
git pull origin main
chmod +x ./start.sh
npm i
pm2 delete FrioStats-Back
pm2 start src/app.js --name FrioStats-Back
pm2 ls