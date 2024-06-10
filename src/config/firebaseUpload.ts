import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface UploadFile {
  name: string;
  originFileObj: File;
}

export const uploadImageToFirebaseAndGetURL = async (file: UploadFile): Promise<string> => {
  try {
    const imageRef = ref(storage, `/images/${file.name}`);
    await uploadBytes(imageRef, file.originFileObj);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase: ", error);
    throw error;
  }
};
