import { collection, addDoc,query,onSnapshot } from "firebase/firestore";
import { firestore } from "@/firebase";


export const storeEvent = async (tabla, registro) => {
  try {
    const docRef = await addDoc(collection(firestore, tabla), registro);
    return { estado: true, valor: docRef };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { estado: false, valor: "" };
  }
};


export const fetchEvents = async (tabla) => {
    const q = query(collection(firestore, tabla));
    try {
        const results = [];
        onSnapshot(q, (element) => {
            element.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
        });
        return results;
        } catch (e) {
        console.error('Error getting documents: ', e);
        }
  };

