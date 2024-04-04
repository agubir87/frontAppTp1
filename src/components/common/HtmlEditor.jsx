import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const HtmlEditor = ({ onHtmlChange }) => {
  const [content, setContent] = useState('');

  const API_KEY = 'egtga0hyyhd6xhuqp87ehy0b553oywnx7tyyinepe4mjlpdh';

  const handleEditorChange = (content, editor) => {
    setContent(content);
    onHtmlChange(content); 
  };

  return (
    <Editor
      apiKey={API_KEY}
      initialValue=""
      value={content} 
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image imagetools media',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'table contextmenu directionality emoticons hr nonbreaking',
          'pagebreak preview print save textpattern visualchars',
          'anchor charmap colorpicker emoticons fullpage fullscreen',
          'importcss insertdatetime legacyoutput noneditable',
          'print preview searchreplace spellchecker template',
          'textcolor tinydrive visualblocks visualchars wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic underline strikethrough | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist | outdent indent | removeformat | \
          image media | link | code | fullscreen'
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default HtmlEditor;

