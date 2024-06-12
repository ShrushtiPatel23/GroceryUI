import imageCompression from 'browser-image-compression';

async function ImageBase64(file){
    const options = {
        maxSizeMB: 0.1, // Max file size in MB
        maxWidthOrHeight: 800, // Max width or height
        useWebWorker: true,
      };
    
      const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();

    reader.readAsDataURL(compressedFile);

    // const reader = new FileReader()
    // reader.readAsDataURL(file)


const data = new Promise((resolve,reject) => {
    reader.onload=()=>resolve(reader.result)
    reader.onerror = err => reject(err)
})

return data
}

export {ImageBase64}