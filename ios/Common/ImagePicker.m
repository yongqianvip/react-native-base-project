//
//  ImagePicker.m
//  ListViewLoadMore
//
//  Created by YYQ on 2016/12/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ImagePicker.h"
#import "AppDelegate.h"

@implementation ImagePicker

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showAndGetImagePathWithCamOrLab:(NSString* )source callBack:(RCTResponseSenderBlock)callBack) {
  _callBack = callBack;
  UIApplication *app = [UIApplication sharedApplication];
//  AppDelegate *app2 = app.delegate;
  
  _rootVC = app.keyWindow.rootViewController; // (UIApplicationDe)[UIApplication sharedApplication].delegate;
  NSLog(@"image has been clicked");
  // 创建UIImagePickerController实例
  UIImagePickerController *imagePickerController = [[UIImagePickerController alloc] init];
  // 设置代理
  imagePickerController.delegate = self;
  // 是否允许编辑（默认为NO）
  imagePickerController.allowsEditing = YES;
  _rootVC.modalPresentationStyle=UIModalPresentationOverCurrentContext;
  
  // 创建一个警告控制器
  UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"选取图片" message:nil preferredStyle:UIAlertControllerStyleActionSheet];
  // 设置警告响应事件
  UIAlertAction *cameraAction = [UIAlertAction actionWithTitle:@"拍照" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    // 设置照片来源为相机
    imagePickerController.sourceType = UIImagePickerControllerSourceTypeCamera;
    
    // 设置进入相机时使用前置或后置摄像头
    imagePickerController.cameraDevice = UIImagePickerControllerCameraDeviceRear;
    
    // 展示选取照片控制器
    [_rootVC presentViewController:imagePickerController animated:YES completion:^{}];
  }];
  
  UIAlertAction *photosAction = [UIAlertAction actionWithTitle:@"从相册选择" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
    imagePickerController.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    [_rootVC presentViewController:imagePickerController animated:YES completion:^{}];
  }];
  
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
  }];
  
  // 判断是否支持相机
  if([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera])
  {
    // 添加警告按钮
    [alert addAction:cameraAction];
  }
  [alert addAction:photosAction];
  [alert addAction:cancelAction];
  // 展示警告控制器
  [_rootVC presentViewController:alert animated:YES completion:nil];
  
}


#pragma mark - UIImagePickerControllerDelegate
// 完成图片的选取后调用的方法
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
  // 选取完图片后跳转回原控制器
  [picker dismissViewControllerAnimated:YES completion:nil];
  
  //    // 创建保存图像时需要传入的选择器对象（回调方法格式固定）
  //    SEL selectorToCall = @selector(image:didFinishSavingWithError:contextInfo:);
  //    // 将图像保存到相册（第三个参数需要传入上面格式的选择器对象）
  //    UIImageWriteToSavedPhotosAlbum(image, self, selectorToCall, NULL);
  
  // 从info中将图片取出，并加载到imageView当中
  UIImage *image = [info objectForKey:UIImagePickerControllerEditedImage];
//  self.imageView.image = image;
  
  NSData *data;
  NSString *type;
  if (UIImageJPEGRepresentation(image, 0.3) != nil) {
    data = UIImageJPEGRepresentation(image, 0.3);
    type = @".jpg";
  }else{
    data = UIImagePNGRepresentation(image);
    type = @".png";
  }
  NSDate *date = [NSDate date];
  //获取当前时间
  NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
  [dateFormat setDateFormat:@"yyyyMMddHHmmss"];
  NSString *curretDateAndTime = [dateFormat stringFromDate:date];
  NSString *path = [[[[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] stringByAppendingString:@"/"] stringByAppendingString:curretDateAndTime] stringByAppendingString:type];
  [data writeToFile:path atomically:YES];
  NSLog(@"------file path is %@",path);
  _callBack(@[[NSNull null], @{
               @"filePath": path
               }]);

//  _imageView2.image = [UIImage imageWithData:[NSData dataWithContentsOfFile:path]];
}

// 取消选取调用的方法
- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
  [_rootVC dismissViewControllerAnimated:YES completion:nil];
}

@end
