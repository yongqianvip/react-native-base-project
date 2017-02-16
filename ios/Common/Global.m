//
//  Global.m
//  ListViewLoadMore
//
//  Created by YYQ on 16/8/4.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "Global.h"

@implementation Global
+(Global *)sharedInstance {
  static Global *global = nil;
  @synchronized(self) {
    if (global == nil) {
      global = [[self alloc] init];
      global.messageQueue = [[NSMutableArray alloc] initWithCapacity:3];
    }
  }
  return global;
}
#pragma mark- 初始化

-(instancetype)init {
  self = [super init];
  if (self) {

  }
  return self;
}

@end
