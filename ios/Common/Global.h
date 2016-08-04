//
//  Global.h
//  ListViewLoadMore
//
//  Created by YYQ on 16/8/4.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#define KEY_WINDOW          [[UIApplication sharedApplication]keyWindow]

#pragma mark - Device
#define IPHONEWIDTH         [UIScreen mainScreen].bounds.size.width
#define IPHONEHEIGHT        [UIScreen mainScreen].bounds.size.height
#define IPHONESCREEN5p5     IPHONEHEIGHT == 736.00
#define IPHONESCREEN4p7     IPHONEHEIGHT == 667.00
#define IPHONESCREEN4       IPHONEHEIGHT == 568.00
#define IPHONESCREEN3p5     IPHONEHEIGHT == 480.00

#pragma mark - TOAST
#define TOAST_FONT_SIZE     14.0
#define TOAST_MIN_WIDTH     100.0
#define TOAST_MIN_HEIGHT    44.0
#define TOAST_MAX_WIDTH     0.8 * IPHONEWIDTH
#define TOAST_MAX_HEIGHT    0.4 * IPHONEHEIGHT

@interface Global : NSObject

@property (strong, nonatomic) NSString *uuid;   //uuid

+(Global *) sharedInstance;

@end
