import { Alert } from "react-native";
import React, { Component, useState, useEffect } from "react";
import Admin from "../Models/Admin";
import { storage, database } from "../FireBase/firebaseConfig";
import { child, push, ref as databaseRef, set, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject, getMetadata } from "firebase/storage";
import * as FileSystem from 'expo-file-system';

export default class Manager {
    constructor() {
        this.epls = [];
    }
    async checkFileExists(imageUri) {
        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        console.log('fileInfo',fileInfo);
        if (!fileInfo.exists) {
            throw new Error('File does not exist');
        }
        return fileInfo;
    }
    async  convertImageToBlob(imageUri) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(new TypeError('Network request failed'));
            xhr.responseType = 'blob';
            xhr.open('GET', imageUri, true);
            xhr.send(null);
        });
    }
    async uploadImage(idPr, imageUri) {
        const blobImage = await this.convertImageToBlob(imageUri);
        const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const storageRefs = storageRef(storage, `images/${idPr}/` + fileName);
        const uploadTask = uploadBytesResumable(storageRefs, blobImage);
    
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Upload failed', error);
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);
                    blobImage.close();
                    resolve(downloadURL);
                }
            );
        });
    }
    //thêm sản phẩm
    async addProduct(idPr, namePr, typePr, pricePr, descriptionPr, colorPr, imagePr) {
        //test 
        // const newProduct = new Admin(idPr, namePr, typePr, pricePr, descriptionPr, imagePr);
        // this.epls.push(newProduct);
        //FireBase
        const newKey = push(child(databaseRef(database), 'product')).key;
        try {
            const downloadURLs = [];
            await Promise.all(imagePr.map(async (imageUri) => {
                await this.checkFileExists(imageUri);
                const downloadURL = await this.uploadImage(newKey, imageUri);
                downloadURLs.push(downloadURL);
            }));
            await set(databaseRef(database, 'product/' + newKey), {
                idPr: newKey,
                namePr: namePr,
                typePr: typePr,
                pricePr: pricePr,
                descriptionPr: descriptionPr,
                colorPr: colorPr,
                imagePr: downloadURLs,
            }).then(() => {
                Alert.alert('Thêm thành công')
            })
                .catch((error) => {
                    console.error(error);
                });
    
        } catch (error) {
            console.error(error);
        }
    };
    //xóa sản phẩm
    async removeProduct(idPr, imagePr) {
        //sắp xếp id
        // for (let i = 0; i < this.epls.length; i++) {
        //     if (this.epls[i].getIdPr() == idPr) {
        //         this.epls.splice(i, 1);
        //         //sau khi xóa, cập nhật lại ID của các sản phẩm còn lại
        //         for (let j = i; j < this.epls.length; j++) {
        //             this.epls[j].setIdPr(j + 1);
        //         }
        //         return this.epls;
        //     }
        // }
        remove(databaseRef(database, 'product/' + idPr)).then(() => {
            Alert.alert('remove product');
        }).catch((error) => {
            console.error(error);
        })
        for (const imageUri of imagePr) {
            console.log('imagePr', imageUri);
            //xử lý đường dẫn trong file 
            const fileInfo = await FileSystem.getInfoAsync(imageUri);
            console.log('fileInfo', fileInfo);
            if (!fileInfo.exists) {
                throw new Error('File does not exist');
            }
            const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
            //console.log('fileName',fileName);
            const imagePath = `images/${idPr}/` + fileName;
            const ref = storageRef(storage, imagePath);
            // Tiếp tục xóa tệp
            deleteObject(ref)
                .then(() => {
                    //alert('Đã xóa hình ảnh');
                })
                .catch((error) => {
                    console.error('Lỗi khi xóa tệp:', error);
                });
        }
    };
    //sửa sản phẩm
    async updateProduct(idPr, namePr, typePr, pricePr, descriptionPr, colorPr, imagePr) {
        try {
            const downloadURLs = [];
            await Promise.all(imagePr.map(async (imageUri) => {
                const downloadURL = await this.uploadImage(idPr, imageUri);
                downloadURLs.push(downloadURL);
            }));    
            update(databaseRef(database, 'product/' + idPr), {
                namePr: namePr,
                typePr: typePr,
                pricePr: pricePr,
                descriptionPr: descriptionPr,
                colorPr: colorPr,
                imagePr: downloadURLs,
            }).then(() => {
                Alert.alert('Sửa thành công')
                console.log('downloadURLs',downloadURLs);
            })
                .catch((error) => {
                    console.error(error);
                });
    
        } catch (error) {
            console.error(error);
        }
        
    }
    //xóa hình ảnh
    // removeImage(imagePr) {
    //     for (let i = 0; i < this.epls.length; i++) {
    //         const images = this.epls[i].getImagePr();
    //         for (let j = 0; j < images.length; j++) {
    //             if (images[i] === imagePr) {
    //                 images.splice(j, 1);
    //                 colors.splice(j,1);
    //                 return;
    //             }
    //         }
    //     }
    // }
}