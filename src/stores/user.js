import { defineStore } from "pinia";
import { auth,firestore } from "../firebase"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { collection,query,onSnapshot,where,doc,deleteDoc,getDocs,writeBatch , updateDoc , addDoc } from 'firebase/firestore';

export const useUserStore = defineStore("user",{
    state:()=>{
        return{
            user:null,
        }
    },
    actions:{
        async register(email,password){
            try {
                
                await createUserWithEmailAndPassword(auth,email,password)
            } catch (error) {
                switch(error.code){
                    case "auth/email-already-in-use":
                        alert("email already in use")
                        break
                    case "auth/invalid-email":
                        alert("email invalid")
                        break
                }
                return ;
            }
            this.user=auth.currentUser
        },
        async login(email,password){
            try {
                console.log(auth)
                await signInWithEmailAndPassword(auth,email,password)
            } catch (error) {
                switch(error.code){
                    case "auth/user-not-found":
                        alert(`Usuario ${email} no encontrado`)
                        break
                    case "auth/wrong-pasword":
                        alert("Wrong password")
                        break
                }
                return ;
            }
            this.user=auth.currentUser
        },
        async insert(tabla,registro){
            try {
                const docRef = await addDoc(collection(firestore, tabla),registro);
                return {estado:true,valor:docRef}
            } catch (e) {
                console.error('Error adding document: ', e);
                return {estado:false,valor:''}
            }
        },
        async getColletion(tabla){
            const q =await query(collection(firestore, tabla));
            try {
                const results = [];
                onSnapshot(q, (element) => {
                    element.forEach((doc) => {
                        results.push({ id: doc.id, ...doc.data() });
                    });
                    //this.user=results
                });
                return results;
              } catch (e) {
                console.error('Error getting documents: ', e);
              }
        },
        async getColletionById(tabla,nombreValue){
            const q = query(collection(firestore, tabla), where("id", "==", nombreValue));
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
        },
        async update(tabla,userId,valor){
            const userRef = doc(firestore, tabla, userId);

            try {
                await updateDoc(userRef, valor);
                console.log('Documento actualizado correctamente');
            } catch (e) {
                console.error('Error al actualizar el documento: ', e);
            }
        },
        async deleteCollection(tabla) {
            const collectionRef = collection(firestore, tabla);
            const queryVal = query(collectionRef);
            const docs = await getDocs(queryVal);
            const batch = writeBatch(firestore);
            docs.forEach((doc) => {
              batch.delete(doc.ref);
            });
            await batch.commit();
          },
          async deleteDocument(tabla, documentId) {
            const docRef = doc(firestore, tabla, documentId);
            await deleteDoc(docRef);
          }
        
    }

})

/*
 import { ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';

const data = ref([]);

const getData = async (tabla) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, tabla));
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    data.value = results;
  } catch (e) {
    console.error('Error getting documents: ', e);
  }
};
 */