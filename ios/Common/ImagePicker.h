//
//  ImagePicker.h
//  ListViewLoadMore
//
//  Created by YYQ on 2016/12/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"

@interface ImagePicker : NSObject<RCTBridgeModule, UINavigationControllerDelegate,UIImagePickerControllerDelegate>
@property(nonatomic,strong)UIViewController *rootVC;
@property(nonatomic) RCTResponseSenderBlock callBack;
@end
