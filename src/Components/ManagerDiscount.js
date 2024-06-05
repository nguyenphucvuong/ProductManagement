import { Alert } from "react-native";
import Discount from "../Models/Discount";
import { database } from "../FireBase/firebaseConfig";
import { child, push, ref, set, remove,update } from "firebase/database";

export default class ManagerDiscount {
    constructor() {
        this.epls = [];
    }
    //thêm sản phẩm
    addDiscount(id, nameDis,code, percentage,descriptionDis,status) {
        //FireBase
        const newKey = push(child(ref(database), 'Discount')).key;//id ramdon
        set(ref(database, 'Discount/' + newKey), {
            id: newKey,
            nameDis: nameDis,
            code: code,
            percentage: percentage,
            descriptionDis: descriptionDis,
            status: status,
        }).then(() => {
            Alert.alert('Thêm thành công')
        })
            .catch((error) => {
                console.error(error);
            });
    };
    //xóa sản phẩm
    removeDiscount(id) {
        remove(ref(database, 'Discount/' + id));
        alert('remove');
    };
    //sửa sản phẩm
    updateDiscount(id, nameDis,code, percentage,descriptionDis,status) {
        update(ref(database, 'Discount/' + id), {
            nameDis: nameDis,
            code: code,
            percentage: percentage,
            descriptionDis: descriptionDis,
            status: status,
        }).then(() => {
            Alert.alert('Sửa thành công')
        })
            .catch((error) => {
                console.error(error);
            });
    }
}