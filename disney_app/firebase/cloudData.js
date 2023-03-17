import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "./config"


const getCloudData = async (name) => {
    try {
        const docRef = doc(db, name, auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().data;
        } else {
            console.log("No such document with name " + name);
        }
    } catch (e) {
        console.log(e);
    }
}

const setCloudData = async (name, value) => {
    try {
        const docRef = await setDoc(doc(db, name, auth.currentUser.email), {
            data: value
        });
    } catch (e) {
        console.log(e);
    }
}

const addCloudData = async ({name, value}) => {
    try {
        const docRef = doc(db, name, auth.currentUser.email);
        updateDoc(docRef, value)
    } catch (e) {
        console.log(e);
    } 
};

export { getCloudData, setCloudData, addCloudData};