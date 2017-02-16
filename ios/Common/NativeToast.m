//
//  NativeToast.m
//  ListViewLoadMore
//
//  Created by YYQ on 16/8/4.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "NativeToast.h"
#import "Global.h"

@implementation NativeToast 

RCT_EXPORT_MODULE();

#pragma mark iOS Native Toast
RCT_EXPORT_METHOD(showMessage:(NSString *)message showTime:(NSInteger)showTime positions:(NSString *)position){
  NSLog(@"__canshu position = %@ showTime = %ld",position,showTime);
  UIWindow *window = [UIApplication sharedApplication].keyWindow;
  UIView *showView = [[UIView alloc] init];
  [showView setUserInteractionEnabled:NO];
  dispatch_async(dispatch_get_main_queue(), ^{
    [showView setBackgroundColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0.8f]];
    showView.layer.cornerRadius = 5.0f;
    showView.layer.masksToBounds = YES;
    [window addSubview:showView];
    
    UILabel *label = [[UILabel alloc] init];
    label.text = message;
    label.textColor = [UIColor whiteColor];
    label.backgroundColor = [UIColor clearColor];
    label.textAlignment = 1;
    label.numberOfLines = 0;
    label.font = [UIFont boldSystemFontOfSize:TOAST_FONT_SIZE];
    CGRect realRect = [message boundingRectWithSize:CGSizeMake(TOAST_MAX_WIDTH, TOAST_MAX_HEIGHT) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:label.font}  context:nil];
    CGSize labelSize = realRect.size;
    labelSize.height = labelSize.height < TOAST_MIN_HEIGHT ? TOAST_MIN_HEIGHT : labelSize.height;
    labelSize.width = labelSize.width < TOAST_MIN_WIDTH ? TOAST_MIN_WIDTH : labelSize.width;
    label.frame = CGRectMake(10, 5, labelSize.width, labelSize.height);
    [showView addSubview:label];
    
    CGRect rect = [[UIScreen mainScreen] bounds];
    CGSize size = rect.size;
    CGFloat width = size.width;
    CGFloat height = size.height;
    CGFloat positionPoint = 0.5;
    if ([@[@"top",@"center",@"bottom"] containsObject:position]) {
      if ([position isEqualToString:@"top"]) {
        positionPoint = 0.2;
      }else if ([position isEqualToString:@"center"]){
        positionPoint = 0.5;
      }else if ([position isEqualToString:@"bottom"]){
        positionPoint = 0.8;
      }
    }else{
      positionPoint = 0.8;
    }
    NSInteger realShowTime = showTime;
    if (realShowTime < 1) {
      realShowTime = 1;
    }else if (realShowTime > 5){
      realShowTime = 5;
    }
    showView.frame = CGRectMake((width - labelSize.width - 20) / 2, height * positionPoint, labelSize.width + 20, labelSize.height + 10);
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(realShowTime * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      [UIView animateWithDuration:1 animations:^{
        showView.alpha = 0;
      } completion:^(BOOL finished){
        [showView removeFromSuperview];
      }];
    });
  });

}

RCT_EXPORT_METHOD(showMessage:(NSString *)msg)
{
  Global *global = [Global sharedInstance];
  UIWindow *window = [UIApplication sharedApplication].keyWindow;
  UIView *showView = [[UIView alloc] init];
  [showView setUserInteractionEnabled:NO];
  
  if (global.messageQueue.count > 3) {
    [global.messageQueue removeObjectAtIndex:0];
  }
  [global.messageQueue addObject:@{@"msg":msg,@"tag":@(arc4random())}];
  NSLog(@"\n\n ==== %ld\n\n",global.messageQueue.count);
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [showView setBackgroundColor:[UIColor colorWithRed:0 green:0 blue:0 alpha:0.7f]];
    showView.layer.cornerRadius = 5.0f;
    showView.layer.masksToBounds = YES;
    [window addSubview:showView];
    NSInteger tag = [[Global sharedInstance].messageQueue.lastObject[@"tag"] integerValue];
    [showView setTag: tag];
    UILabel *label = [[UILabel alloc] init];
    label.text = msg;
    label.textColor = [UIColor whiteColor];
    label.backgroundColor = [UIColor clearColor];
    label.textAlignment = 1;
    label.numberOfLines = 0;
    label.font = [UIFont boldSystemFontOfSize:TOAST_FONT_SIZE];
    CGRect realRect = [msg boundingRectWithSize:CGSizeMake(TOAST_MAX_WIDTH, TOAST_MAX_HEIGHT) options:NSStringDrawingTruncatesLastVisibleLine | NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:label.font}  context:nil];
    CGSize labelSize = realRect.size;
    labelSize.height = labelSize.height < TOAST_MIN_HEIGHT ? TOAST_MIN_HEIGHT : labelSize.height;
    labelSize.width = labelSize.width < TOAST_MIN_WIDTH ? TOAST_MIN_WIDTH : labelSize.width;
    label.frame = CGRectMake(10, 5, labelSize.width, labelSize.height);
    [showView addSubview:label];
    
    CGRect rect = [[UIScreen mainScreen] bounds];
    CGSize size = rect.size;
    CGFloat width = size.width;
    CGFloat height = size.height;
    NSMutableArray *queues = [Global sharedInstance].messageQueue;
    if (queues.count > 1) {
      [UIView animateWithDuration:0.2 animations:^{
        for (int i = 0 ; i< queues.count; i++) {
          NSInteger t = [queues[i][@"tag"] integerValue];
          UIView *tView = [window viewWithTag:t];
          [tView setCenter:CGPointMake(tView.center.x, tView.center.y - (tView.frame.size.height/2 + (labelSize.height + 10)/2 + 5))];
        }
      }];
    }
    showView.frame = CGRectMake(0,0, labelSize.width + 20, labelSize.height + 10);
    [showView setCenter:CGPointMake(width / 2, height * 0.8)];
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      [UIView animateWithDuration: 1.5 animations:^{
        showView.alpha = 0;
      } completion:^(BOOL finished){
        NSMutableArray *queue = [Global sharedInstance].messageQueue;
        __block NSInteger index = -1;
        [queue enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
          if ([obj[@"msg"] isEqualToString:msg]) {
            index = idx;
            *stop = YES;
          }
        }];
        if (index > -1) {
          [[Global sharedInstance].messageQueue removeObjectAtIndex:index];
        }
        [showView removeFromSuperview];
      }];
    });
    
  });
  
}

- (NSDictionary *)constantsToExport
{
  return @{
           @"VERSION": [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"],
           @"BUILD": [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"]
           };
}

@end


