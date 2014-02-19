### Interactive Mobile Dashboard using ChartJS and Cordova ###

To run in your browser:

1. Download ChartJS from http://chartjs.devexpress.com/

2. Copy dx.chartjs.js and globalize.min.js in www/lib/chartjs

3. Open www/index.html in your browser


To run as a Cordova app:


1. Download ChartJS from http://chartjs.devexpress.com/

2. Copy dx.chartjs.js and globalize.min.js in www/lib/chartjs

3. Open Terminal and type:

    ```
    cordova create olympic-dashboard-chartjs
    cd olympic-dashboard-chartjs
    cordova platforms add ios
    cordova plugin add org.apache.cordova.device
    cordova plugin add org.apache.cordova.console
    cordova plugin add org.apache.cordova.statusbar
    ```

4. Delete the www folder that was created and replace it with the www folder from this repo

5. In terminal type:

    ```
    cordova build ios
    ```

6. Open the .xcodeproj file in the platforms/ios folder and run the app in the emulator or on your iOS device. To run the app on your iOS device, you need an Apple developer certificate and an app provisioning profile.

