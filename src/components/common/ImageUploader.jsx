// ImageUploader.jsx
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const ImageUploader = ({ onUpload }) => {
    const [image, setImage] = useState(null);

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(file);
        onUpload(file);
    };

    return (
        <div>
            <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                        <input {...getInputProps()} />
                        <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen</p>
                    </div>
                )}
            </Dropzone>
            {image && <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%', marginTop: '20px' }} />}
        </div>
    );
};

export default ImageUploader;


