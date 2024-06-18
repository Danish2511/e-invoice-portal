import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import InputField from './InputField';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const Panel = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierTin: '',
        supplierRegistration: '',
        supplierTourismTaxRegistrationNumber: '',
        supplierSstRegistrationNumber: '',
        supplierEmail: '',
        supplierMalaysiaStandardIndustrialClassificationMsicCode: '',
        supplierBusinessActivityDescription: '',
        addressLine0: '',
        addressLine1: '',
        addressLine2: '',
        postalZone: '',
        cityName: '',
        state: '',
        country: '',
        supplierContactNumber: '',
        buyerName: '',
        buyerTin: '',
        buyerRegistration: '',
        buyerSstRegistrationNumber: '',
        buyerEmail: '',
        buyerAddressLine0: '',
        buyerAddressLine1: '',
        buyerAddressLine2: '',
        buyerPostalZone: '',
        buyerCityName: '',
        buyerState: '',
        buyerCountry: '',
        buyerContactNumber: '',
        invoiceNo: '',
        invoiceDate: '',
        invoiceTime: '',
        items: []
    });
    const [panelWidth, setPanelWidth] = useState(0);

    const handleLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleExtractClick = async () => {
        try {
            const formData = new FormData();
            formData.append('pdf_file', file);

            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const responseData = response.data;
            setFormData({
                supplierName: responseData.headers.supplier_name || '',
                supplierTin: responseData.headers.supplier_tin || '',
                supplierRegistration: responseData.headers.supplier_registration || '',
                supplierTourismTaxRegistrationNumber: responseData.headers.supplier_tourism_tax_registration_number || '',
                supplierSstRegistrationNumber: responseData.headers.supplier_sst_registration_number || '',
                supplierEmail: responseData.headers.supplier_email || '',
                supplierMalaysiaStandardIndustrialClassificationMsicCode: responseData.headers.supplier_malaysia_standard_industrial_classification_msic_code || '',
                supplierBusinessActivityDescription: responseData.headers.supplier_business_activity_description || '',
                addressLine0: responseData.headers.address_line0 || '',
                addressLine1: responseData.headers.address_line1 || '',
                addressLine2: responseData.headers.address_line2 || '',
                postalZone: responseData.headers.postal_zone || '',
                cityName: responseData.headers.city_name || '',
                state: responseData.headers.state || '',
                country: responseData.headers.country || '',
                supplierContactNumber: responseData.headers.supplier_contact_number || '',
                buyerName: responseData.headers.buyer_name || '',
                buyerTin: responseData.headers.buyer_tin || '',
                buyerRegistration: responseData.headers.buyer_registration || '',
                buyerSstRegistrationNumber: responseData.headers.buyer_sst_registration_number || '',
                buyerEmail: responseData.headers.buyer_email || '',
                buyerAddressLine0: responseData.headers.buyer_address_line0 || '',
                buyerAddressLine1: responseData.headers.buyer_address_line1 || '',
                buyerAddressLine2: responseData.headers.buyer_address_line2 || '',
                buyerPostalZone: responseData.headers.buyer_postal_zone || '',
                buyerCityName: responseData.headers.buyer_city_name || '',
                buyerState: responseData.headers.buyer_state || '',
                buyerCountry: responseData.headers.buyer_country || '',
                buyerContactNumber: responseData.headers.contact || '',
                buyerAddress: responseData.headers.buyer_address || '',
                
                invoiceNo: responseData.headers.invoice_no || '',
                invoiceDate: responseData.headers.invoice_date || '',
                invoiceTime: responseData.headers.invoice_time || '',
                items: responseData.headers.items || []
            });
            console.log(responseData);
        } catch (error) {
            console.error('Error extracting data:', error);
        }
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleItemChange = (e, index) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const updatedItems = prevFormData.items.map((item, i) => 
                i === index ? { ...item, [name]: value } : item
            );
            return {
                ...prevFormData,
                items: updatedItems
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Convert formData to JSON format if needed
    };

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
                <form onSubmit={handleSubmit}>

                    <h3>Supplier Details</h3>
                    <InputField label="Supplier's Name" type="text" name="supplierName" value={formData.supplierName} onChange={handleInputChange} />
                    <InputField label="Supplier's TIN" type="text" name="supplierTin" value={formData.supplierTin} onChange={handleInputChange} />
                    <InputField label="Supplier's Registration" type="text" name="supplierRegistration" value={formData.supplierRegistration} onChange={handleInputChange} />
                    <InputField label="Supplier's Tourism Tax Registration Number" type="text" name="supplierTourismTaxRegistrationNumber" value={formData.supplierTourismTaxRegistrationNumber} onChange={handleInputChange} />
                    <InputField label="Supplier's SST Registration Number" type="text" name="supplierSstRegistrationNumber" value={formData.supplierSstRegistrationNumber} onChange={handleInputChange} />
                    <InputField label="Supplier's Email" type="text" name="supplierEmail" value={formData.supplierEmail} onChange={handleInputChange} />
                    <InputField label="Supplier's Malaysia Standard Industrial Classification (MSIC) Code" type="text" name="supplierMalaysiaStandardIndustrialClassificationMsicCode" value={formData.supplierMalaysiaStandardIndustrialClassificationMsicCode} onChange={handleInputChange} />
                    <InputField label="Supplier's Business Activity Description" type="text" name="supplierBusinessActivityDescription" value={formData.supplierBusinessActivityDescription} onChange={handleInputChange} />

                    <h3>Supplier Address</h3>
                    <InputField label="Address Line0" type="text" name="addressLine0" value={formData.addressLine0} onChange={handleInputChange} />
                    <InputField label="Address Line1" type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} />
                    <InputField label="Address Line2" type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} />
                    <InputField label="Postal Zone" type="text" name="postalZone" value={formData.postalZone} onChange={handleInputChange} />
                    <InputField label="City Name" type="text" name="cityName" value={formData.cityName} onChange={handleInputChange} />
                    <InputField label="State" type="text" name="state" value={formData.state} onChange={handleInputChange} />
                    <InputField label="Country" type="text" name="country" value={formData.country} onChange={handleInputChange} />
                    <InputField label="Supplier Contact Number" type="text" name="supplierContactNumber" value={formData.supplierContactNumber} onChange={handleInputChange} />

                    <h3>Buyer Details</h3>
                    <InputField label="Buyer Name" type="text" name="buyerName" value={formData.buyerName} onChange={handleInputChange} />
                    <InputField label="Buyer Tin" type="text" name="buyerTin" value={formData.buyerTin} onChange={handleInputChange} />
                    <InputField label="Buyer Registration" type="text" name="buyerRegistration" value={formData.buyerRegistration} onChange={handleInputChange} />
                    <InputField label="Buyer SST Registration Number" type="text" name="buyerSstRegistrationNumber" value={formData.buyerSstRegistrationNumber} onChange={handleInputChange} />
                    <InputField label="Buyer Email" type="text" name="buyerEmail" value={formData.email} onChange={handleInputChange} />

                    <h3>Buyer Address</h3>
                    {/* <InputField label="Address Line0" type="text" name="buyerAddressLine0" value={formData.buyerAddressLine0} onChange={handleInputChange} />
                    <InputField label="Address Line1" type="text" name="buyerAddressLine1" value={formData.buyerAddressLine1} onChange={handleInputChange} />
                    <InputField label="Address Line2" type="text" name="buyerAddressLine2" value={formData.buyerAddressLine2} onChange={handleInputChange} />
                    <InputField label="Postal Zone" type="text" name="buyerPostalZone" value={formData.buyerPostalZone} onChange={handleInputChange} />
                    <InputField label="City Name" type="text" name="buyerCityName" value={formData.buyerCityName} onChange={handleInputChange} />
                    <InputField label="State" type="text" name="buyerState" value={formData.buyerState} onChange={handleInputChange} />
                    <InputField label="Country" type="text" name="buyerCountry" value={formData.buyerCountry} onChange={handleInputChange} /> */}
                    <InputField label="Buyer Address" type="text" name="buyerAddress" value={formData.buyerAddress} onChange={handleInputChange} />
                    <InputField label="Buyer Contact Number" type="text" name="buyerContactNumber" value={formData.buyerContactNumber} onChange={handleInputChange} />

                    <h3>Invoice Details</h3>
                    <InputField label="Invoice No" type="text" name="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} />
                    <InputField label="Invoice Date" type="text" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} />
                    <InputField label="Invoice Time" type="text" name="invoiceTime" value={formData.invoiceTime} onChange={handleInputChange} />

                    <h3>Line Items</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>U/Price</th>
                                <th>Amt</th>
                                <th>Disc</th>
                                <th>Tax</th>
                                <th>Net Amt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><input type="text" name="Description" value={item.Description} onChange={(e) => handleItemChange(e, index)} /></td>
                                    <td><input type="text" name="Qty" value={item.Qty} onChange={(e) => handleItemChange(e, index)} /></td>
                                    <td><input type="text" name="U/Price" value={item["U/Price"]} onChange={(e) => handleItemChange(e, index)} /></td>
                                    <td><input type="text" name="Amt" value={item.Amt} onChange={(e) => handleItemChange(e, index)} /></td>
                                    <td><input type="text" name="Disc" value={item.Disc} onChange={(e) => handleItemChange(e, index)} /></td>
                                    <td><input type="text" name="Tax" value={item.Tax} onChange={(e) => handleItemChange(e, index)} /></td>
                                    <td><input type="text" name="Net Amt" value={item["Net Amt"]} onChange={(e) => handleItemChange(e, index)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Panel;
