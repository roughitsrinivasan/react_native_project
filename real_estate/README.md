## React Native using expo-cli

### Install nodejs
```
sudo apt install nodejs
```
### To Check version of nodejs
```
node --version
```
### If the version has to be updated, use the following command, else skip this step.


```
curl -fsSL https://deb.nodesource.comsetup_14.x | sudo -E bash -

sudo apt-get install -y nodejs 

node --version
```
###  Install npm

```
sudo apt install npm

npm --version
```
### Install expo-cli

```
sudo npm install --global expo-cli
```

### In order to run your app, go to the respective directory and run the following command :

```
expo start
```










## APK file Generation :

#### Use this link to set up an account on expo :-
```
https://expo.dev/signup
```

```
expo login
``` 

#### To check which user you are logged in with, use the command :-

``` 
expo whoami
``` 

#### Edit Config
If you want to add the app to the playstore. You should add "versionCode": 1 in app.json under "android".

```
"android":{
    
    "versionCode":1
}
```
#### Finally run the following command :-

```
expo build:android
```
#### Then select the following options on the terminal :-

- Select apk

- Select generate keystore


#### Download apk :-
- After the build is complete you can go to the builds section in your dashboard and download the apk.
