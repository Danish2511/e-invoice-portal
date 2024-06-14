import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const Panel = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [formData, setFormData] = useState(null);
    const [panelWidth, setPanelWidth] = useState(0);

    const handleLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleExtractClick = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://127.0.0.1:3030/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setFormData(response.data);
        } catch (error) {
            console.error('Error extracting data:', error);
        }
    };

    const renderFormFields = (data, prefix = '') => {
        if (!data) return null;

        const capitalize = (str) => {
            return str.replace(/([A-Z])/g, ' $1')
                .replace(/^./, (s) => s.toUpperCase());
        };

        return Object.keys(data).map((key) => {
            const value = data[key];
            const name = prefix ? `${prefix}.${key}` : key;
            const capitalizedLabel = capitalize(key);

            if (typeof value === 'object' && value !== null) {
                return (
                    <fieldset key={name}>
                        <legend>{capitalizedLabel}</legend>
                        {renderFormFields(value, name)}
                    </fieldset>
                );
            }

            return (
                <div key={name}>
                    <label>{capitalizedLabel}</label>
                    <input type="text" name={name} defaultValue={value} />
                </div>
            );
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setPanelWidth(document.querySelector('.left-panel').offsetWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="panel-container">
            <div className="panel left-panel">
                <h2>PDF Preview</h2>
                {file && (
                    <Document
                        file={file}
                        onLoadSuccess={handleLoadSuccess}
                        className="react-pdf__Document"
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={panelWidth}
                                className="react-pdf__Page"
                            />
                        ))}
                    </Document>
                )}
                <div className="extract-button-container">
                    <button onClick={handleExtractClick} className="extract-button">
                        Extract Data
                    </button>
                </div>
            </div>
            <div className="panel right-panel">
                <h2>Form</h2>
                {formData && (
                    <form>
                        {renderFormFields(formData)}
                    </form>
                )}
            </div>
        </div>
    );
};

export default Panel;
