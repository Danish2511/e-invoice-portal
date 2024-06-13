import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const Panel = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageWidth, setPageWidth] = useState(null);
    const [pageHeight, setPageHeight] = useState(null);
    const [formData, setFormData] = useState(null);

    const handleLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handlePageLoadSuccess = (page) => {
        const { width, height } = page.getViewport({ scale: 1 });
        setPageWidth(width);
        setPageHeight(height);
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
            const capitalizedLabel = capitalize(key); // Capitalize the label
    
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
                    <label htmlFor={name}>{capitalizedLabel}:</label>
                    <input
                        type="text"
                        id={name}
                        name={name}
                        defaultValue={value}
                        required
                    />
                </div>
            );
        });
    };

    return (
        <div className="panel-container">
            <div className="panel left-panel">
                <h2>PDF Preview</h2>
                {file ? (
                    <>
                        <Document file={file} onLoadSuccess={handleLoadSuccess}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    onLoadSuccess={handlePageLoadSuccess}
                                    width={pageWidth}
                                    height={pageHeight}
                                />
                            ))}
                        </Document>
                        <div className="extract-button-container">
                            <button className="extract-button" onClick={handleExtractClick}>
                                Extract
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No file selected</p>
                )}
            </div>
            <div className="panel right-panel">
                <h2>Invoice Form</h2>
                {formData ? (
                    <form>
                        {renderFormFields(formData.headers)}
                        <input type="submit" value="Submit" />
                    </form>
                ) : (
                    <p>No data extracted yet</p>
                )}
            </div>
        </div>
    );
};

export default Panel;
