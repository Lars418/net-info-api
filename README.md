# Network Information API
A simple example showing the usage of the Network Information API. In this specific example we'll be creating  a small warning which will pop up when the device connection is "2g" or worse.

### Check if API is supported
```javascript
if('connection' in navigator) {
  //your code
}
```

### Defining the connection
```javascript
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const info = document.getElementById('info');
```
To ensure the compatability is as large as possible we'll also include the prefixed versions.


### Check the connection strength
```javascript
if(connection.effectiveType == "2g" || connection.effectiveType == "slow-2g" || connection.rtt > 650) {
  info.classList.add("visible");
}
```
Using this `if`-statement we can detect the `effectiveType` of our connection. As of know the API is still experimental, which can result in some strange behaviour. Beside that not all browsers support all properties of the API. That's the reason why we'll also check if our `rtt` (round trip time) value is above 650ms.
There are also some other properties like `downlink` or `downlinkMax`, but they (at least for me) didn't seem to work properly enough to use them in this example.

## Check for a change in the connection strength
```javascript
connection.onchange = checkConnection;

function checkConnection(e) {
 if(e.target.effectiveType == "2g" || e.target.effectiveType == "slow-2g" || navigator.onLine == false || e.target.rtt > 650) { 
            info.classList.add("visible");
        }
        else {
            info.classList.remove("visible");
        } 
}
```
After we've checked the connection strength on page load the value can (and will probably) change, especially if we're moving. To update our strength we'll have to attach a function to the `onchange` event of our connection. The `if`-statement is almost the same, expect that we're also checking if our device is still `onLine`. We'd assume that our `effectiveType` and/or `rtt` value would also display this to us but the `effectiveType` always gave me an output of `4g` and the `rtt` one of `0` - which both don't seem to be correct.

(I haven't included the `onLine` check on page load because - obviously - our page couldn't load if we'd be offline.)
