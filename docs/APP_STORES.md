# Putting I Wrote Today on the App Store and Google Play

The website is the app. Capacitor wraps it for the stores, so the iPhone and Android apps are made from the
same files as https://emmaberat.github.io/iwrotetoday/.

## Quotes don't need a store update

Quotes, words and celebration words live in `content.json`. Edit that file and push to GitHub. The apps
download the new list whenever they open online, so people get new quotes without you submitting anything.
The same file holds `bookshopAffiliateId`: put your Bookshop.org affiliate number there and every book link
becomes a commission link.

Only changes to the app's own code or design (`index.html`, icons) need a new build and a store update.

## One-time setup on your Mac

1. Install **Xcode** (App Store), then open it once to accept the licence and install components.
2. Install **Node 22 or newer** (https://nodejs.org) and **Android Studio** (https://developer.android.com/studio).
3. In Terminal:
   ```
   git clone https://github.com/emmaberat/iwrotetoday
   cd iwrotetoday
   npm install
   ```

## Decide the app ID now (it can't change later)

The app ID is `com.emmaberat.iwrotetoday`. The App Store and Google Play both lock it in after the first
upload. If you want a different one, change `appId` in `capacitor.config.json`, in Xcode (target App > General
> Bundle Identifier) and in `android/app/build.gradle` (`namespace` and `applicationId`) **before** you upload.

## iPhone

1. `npm run ios` copies the website into the app and opens Xcode.
2. Click **App** (blue icon, top of the left list) > **Signing & Capabilities**, tick *Automatically manage
   signing* and pick your **Team**.
3. Plug in your iPhone, choose it at the top, press **Run**. Try every screen (check in, "i didn't, but i will
   tomorrow", my writing days, daily reminder, how it works). Check nothing sits under the notch or home bar.
4. In App Store Connect (https://appstoreconnect.apple.com) create a new app with the same bundle ID.
5. In Xcode choose **Any iOS Device (arm64)**, then **Product > Archive > Distribute App > App Store Connect >
   Upload**.
6. In App Store Connect, fill in the listing:
   - Privacy policy URL: https://emmaberat.github.io/iwrotetoday/privacy.html
   - App Privacy: **Data Not Collected**
   - Age rating: answer honestly. Some quotes contain strong language and mature themes, so expect 12+ or higher.
   - Screenshots: upload from the simulator or your phone at the sizes it asks for.
   - Choose the build, then **Submit for Review**.

## Android

1. `npm run android` copies the website into the app and opens Android Studio. Let Gradle finish syncing.
2. Press **Run** with a phone plugged in (USB debugging on) or an emulator. Test every screen.
3. **Build > Generate Signed App Bundle / APK > Android App Bundle.** Create a new keystore when asked and
   **back it up** (and its passwords) somewhere safe: you need it for every future update.
4. In Google Play Console create the app, then upload the `.aab` file.
5. Fill in the listing: privacy policy URL (same as above), Data safety (**no data collected**), content rating
   questionnaire, target audience and store listing graphics.
6. Google currently requires new personal developer accounts to run a closed test with a minimum number of
   testers for 14 days before applying for production access. Check Play Console for what applies to you.

## Updating the app later

Bump the version first: Xcode > App > General (Version and Build) and `versionCode` / `versionName` in
`android/app/build.gradle`. Then run `npm run ios` or `npm run android` again and upload a new build.

## Known things to check before submitting

- The **daily reminder** screen hands out a calendar file (.ics). That works in a browser but not inside an
  iPhone app. Real phone notifications are the better route inside the apps.
- Apple can reject apps that are only a repackaged website. Native notifications help with that.
- The app uses `viewport-fit=cover` and safe-area padding; check the top and bottom on a real iPhone with a notch.
