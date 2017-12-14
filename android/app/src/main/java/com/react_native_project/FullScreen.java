package com.react_native_project;

import android.graphics.Color;
import android.graphics.PixelFormat;
import android.graphics.drawable.shapes.Shape;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FullScreen extends ReactContextBaseJavaModule {
//    public void onCreate(Bundle savedInstanceState){
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.layout222);
//    }
    protected static final String TAG = FullScreen.class.getSimpleName();

    public FullScreen(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FullScreen";
    }
    private TextView textView = new TextView(getReactApplicationContext());
    private ImageView imageView = new ImageView(getReactApplicationContext());

    private RelativeLayout mainLayout = new RelativeLayout(getReactApplicationContext());
    private RelativeLayout myLayout = new RelativeLayout(getReactApplicationContext());
//    imageView = (ImageView) findViewById(R.id.closebtn);
    public WindowManager windowManager = MainActivity.getMainActivity().getWindowManager();
    @ReactMethod
    public void show() {
        View fullscreenView = new View(getReactApplicationContext());
        fullscreenView.setBackgroundColor(Color.BLACK);
        fullscreenView.setAlpha((float)0.5);
        mainLayout.addView(fullscreenView);

        imageView.setId(3);
        imageView.setImageResource(R.drawable.loading);
        RelativeLayout.LayoutParams imageLayoutParams =
                new RelativeLayout.LayoutParams(300,300);


        imageLayoutParams.addRule(RelativeLayout.CENTER_HORIZONTAL);
        imageLayoutParams.addRule(RelativeLayout.CENTER_VERTICAL);//图片居中

        imageView.setLayoutParams(imageLayoutParams);


        RelativeLayout.LayoutParams textParams =
            new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.WRAP_CONTENT,
                RelativeLayout.LayoutParams.WRAP_CONTENT);

        textParams.addRule(RelativeLayout.ABOVE, imageView.getId());
        textParams.addRule(RelativeLayout.CENTER_HORIZONTAL);//文本水平居中
        textParams.setMargins(0, 0, 0, 0);

        myLayout.addView(imageView);
        myLayout.addView(textView,textParams);


        RelativeLayout.LayoutParams mylayparams = new RelativeLayout.LayoutParams(500,500);
        mylayparams.addRule(RelativeLayout.CENTER_HORIZONTAL);
        mylayparams.addRule(RelativeLayout.CENTER_VERTICAL);
        myLayout.setLayoutParams(mylayparams);
        myLayout.setBackgroundResource(R.drawable.myback);//圆角布局

        mainLayout.addView(myLayout);

        WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.MATCH_PARENT,
            0, 0,
            PixelFormat.TRANSPARENT
        );
        // flag 设置 Window 属性
        layoutParams.flags= WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL;
        // type 设置 Window 类别（层级）
        layoutParams.type = WindowManager.LayoutParams.TYPE_APPLICATION;
        layoutParams.gravity = Gravity.CENTER;

        windowManager.addView(mainLayout, layoutParams);
    }
    @ReactMethod
    public void updateProgress(String message) {
        Log.i(TAG, message);
        textView.setText(message);
    }
    @ReactMethod
    public void close() {
        Toast.makeText(getReactApplicationContext(), "Toast Closed", Toast.LENGTH_LONG).show();
        myLayout.removeAllViews();
        mainLayout.removeAllViews();
        windowManager.removeView(mainLayout);
    }
}
