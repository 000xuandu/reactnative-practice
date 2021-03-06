fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## Android
### android update_config
```
fastlane android update_config
```
Runs android's lane'
### android build_apk_staging
```
fastlane android build_apk_staging
```
Build APK Release Staging
### android build_apk_production
```
fastlane android build_apk_production
```
Build APK Release Production
### android build_aab_production
```
fastlane android build_aab_production
```
Build AAB Release Production
### android distribute_staging
```
fastlane android distribute_staging
```
Distribute Staging
### android distribute_production
```
fastlane android distribute_production
```
Distribute Production

----

## iOS
### ios update_config
```
fastlane ios update_config
```
Runs ios's lane

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
