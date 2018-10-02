# ReactK js SDK

## Compile

Use docker to compile project

````
docker run -v $PWD:/mnt -it --entrypoint /bin/sh node:10-alpine
````

Get node modules

```
cd /mnt && npm install
```


```
#compile ts files
cd /mnt && npm run build

# exec tests
npm run test 
    OR
cd /mnt && ./node_modules/.bin/jest test

# concat file
cd /mnt && npm run concat
```

# Contributions

All contributions are welcomed
