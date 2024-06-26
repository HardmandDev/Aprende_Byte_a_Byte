import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_API_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);

// const FileUpload = () => {
    // const [file, setFile] = useState(null);

    // const supabaseUrl = import.meta.env.VITE_SUPABASE_API_URL;
    // const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // const supabase = createClient(supabaseUrl, supabaseKey);

    // const handleFileChange = (event) => {
    //     setFile(event.target.files[0]);
    // };

    // const handleUpload = async () => {
    //     if (file) {
    //         try {
    //             const { data, error } = await supabase.storage
    //                 .from('ABB')
    //                 .upload('Courses/', file, {
    //                     cacheControl: '3600',
    //                     upsert: false,
    //                 });

    //             if (error) {
    //                 console.error('Error uploading file:', error.message);
    //             } else {
    //                 console.log('File uploaded successfully:', data);
    //             }
    //         } catch (error) {
    //             console.error('Error uploading file:', error.message);
    //         }
    //     } else {
    //         console.error('No file selected');
    //     }
    // };

//     async function uploadImage(e) {
//         let file = e.target.files[0];
//         const { data, error } = await supabase
//             .storage
//             .from('ABB')
//             .upload('Courses/', file);

//         if (data) {
//             console.log('File uploaded successfully:', data);
//         } else {
//             console.error('Error uploading file:', error.message);
//         }
//     }


//     return (
//         <div>
//             <input type="file" onChange={(e) => uploadImage(e)} />
//         </div>
//     );
// }

// export default FileUpload;


// import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_API_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const FileUpload = () => {
  async function uploadImage(e) {
    let file = e.target.files[0];
    const nombre = 'archivo.jpg'
    const { data, error } = await supabase
      .storage
      .from('public/ABB')
      .upload(nombre, file);

    if (data) {
      console.log('File uploaded successfully:', data);
    } else {
      console.error('Error uploading file:', error.message);
    }
  }

  return (
    <div>
      <input type="file" onChange={(e) => uploadImage(e)} />
    </div>
  );
}

export default FileUpload;