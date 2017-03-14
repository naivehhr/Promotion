package com.mycalendar;

import android.app.Activity;
import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.keyee.pdfview.PDFView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.horcrux.svg.RNSvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PDFView(),
            new RNFetchBlobPackage(),
            new RNSvgPackage(),
            new LinearGradientPackage(),
            new ReactNativeI18n(),
          new RCTSwipeRefreshLayoutPackage(),
          new RCTSplashScreenPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
//    RCTSplashScreen.openSplashScreen(this);
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
