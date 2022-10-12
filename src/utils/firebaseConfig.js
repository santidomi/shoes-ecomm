// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1VsVgR-vJKNFyq7P1HkNkfEqs0CJqI6Q",
  authDomain: "castelshoes-54cd0.firebaseapp.com",
  projectId: "castelshoes-54cd0",
  storageBucket: "castelshoes-54cd0.appspot.com",
  messagingSenderId: "839832137443",
  appId: "1:839832137443:web:7cec56013369b35a401fd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore (app);
export const firestoreFetch =  async(Id) => {
	let q;

    if (Id) {
        q = query(collection(db, "products"), where('categoryId', '==', Id));
    }else{
        q = query(collection(db, "products")); 
    }
    const querySnapshot = await getDocs(q);
    const dataFromFirestore = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
	return dataFromFirestore;
};

export const getOneItem = async (Id) => {
	const docRef = doc(db, "products", Id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
        const item = {
            id : docSnap.id,
            ...docSnap.data()
        }
        return item;

	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}
};