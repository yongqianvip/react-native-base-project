//
//  FullScreen.m
//  react_native_project
//
//  Created by YYQ on 2017/11/22.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "FullScreen.h"
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@implementation FullScreen
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(show)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    UIWindow *cwindow = [UIApplication sharedApplication].keyWindow;
    UIViewController *mc = [cwindow rootViewController];
    
    UIView *bgview = [[UIView alloc] initWithFrame:CGRectMake(0, 0, cwindow.frame.size.width, cwindow.frame.size.height)];
    [bgview setBackgroundColor:[UIColor clearColor]];
    [bgview setTag:8081];
    
    [bgview setCenter:CGPointMake(mc.view.frame.size.width/2, mc.view.frame.size.height/2)];
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(closeTopWindow)];
    [bgview addGestureRecognizer:tap];
    [mc.view addSubview:bgview];
    
    UIView *sbv = [[UIView alloc]initWithFrame:CGRectMake(0, 0, bgview.frame.size.width, bgview.frame.size.height)];
    [sbv setBackgroundColor:[UIColor blackColor]];
    [sbv setAlpha:0.6];
    [bgview addSubview:sbv];
    
    UILabel *progressLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 110, 200, 44)];
    [progressLabel setTag:8082];
    [bgview addSubview:progressLabel];
  });
}
RCT_EXPORT_METHOD(close: (BOOL)clo callBack:(RCTResponseSenderBlock)callback male:(BOOL)isMale )
{
  [self closeTopWindow];
}
-(void)closeTopWindow{
  dispatch_async(dispatch_get_main_queue(), ^{
    UIWindow *cwindow = [UIApplication sharedApplication].keyWindow;
    UIViewController *mc = [cwindow rootViewController];
    UIView *tv = [mc.view viewWithTag:8081];
    [tv removeFromSuperview];
  });
}

RCT_EXPORT_METHOD(updateProgress:(NSString *)progress){
  dispatch_async(dispatch_get_main_queue(), ^{
    UIWindow *cwindow = [UIApplication sharedApplication].keyWindow;
    UIViewController *mc = [cwindow rootViewController];
    UILabel *proLabel = (UILabel *)[mc.view viewWithTag:8082];
    [proLabel setText:progress];
  });
}
@end
