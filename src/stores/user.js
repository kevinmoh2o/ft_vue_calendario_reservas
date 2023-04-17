import { defineStore } from "pinia";
import { auth } from "../firebase"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

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
        }
    }

})