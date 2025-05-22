import React, { useState, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useParams } from 'react-router-dom'
const VisualizarPDF = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {

      
      setPdfUrl(`http://localhost:3001/${id}/pdf`);
    
  }, [id]);

  return (
    <div>
     <h2>Visualizador de PDF</h2>
      {pdfUrl ? (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
          <div style={{ height: '500px', border: '1px solid #ccc' }}>
            <Viewer fileUrl={pdfUrl} />
          </div>
        </Worker>
      ) : (
        <p>Nenhum PDF selecionado</p>
      )}
    </div>
  );
};

export default VisualizarPDF;