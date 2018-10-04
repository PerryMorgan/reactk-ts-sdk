# ReactK js SDK

## Usage

ReactK tag is really easy to use.
Use the javascript code bellow and replace values insides brackets.

```
    <script src="https://js.reactk.com/script/reactk.min.js"></script>
    <script type="text/javascript">
        reactk.init("simple-example", "[MY_OPTIONAL_USER_ID]");
        
        // optional, do not use if you already inject user id into method init()
        reactk.setUserId("[OR_DEFINE_USER_ID_HERE]");
        
        // payload is a custom hashmap with values linked to the event
        reactk.track("[EVENT_NAME]", {mykey:"myvalue"});
        
        // optional, can be useful with some javascript framework
        window.reactk = reactk;
    </script>
```

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

```

# Contributions

All contributions are welcomed
