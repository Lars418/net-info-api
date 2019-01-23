# Network Information API
A simple example showing the usage of the Network Information API. In this specific example I've created a small warning which will pop up when the device connection is "2g" or worse.

### Check if API is supported
```javascript
if('connection' in navigator) {
  //your code
}
```

### Defining the connection
```javascript
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
```
To ensure the compatability is as large as possible I've also included the prefixed versions.
