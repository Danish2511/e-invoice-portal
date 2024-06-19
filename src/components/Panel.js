import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import InputField from './InputField';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const Panel = ({ file }) => {
    const currTime = new Date().toLocaleTimeString();
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
                supplierRegistration: responseData.headers.reg_no || '',
                supplierTourismTaxRegistrationNumber: responseData.headers.supplier_tourism_tax_registration_number || '',
                supplierSstRegistrationNumber: responseData.headers.supplier_sst_registration_number || '',
                supplierEmail: responseData.headers.email || '',
                supplierMalaysiaStandardIndustrialClassificationMsicCode: responseData.headers.supplier_malaysia_standard_industrial_classification_msic_code || '',
                supplierBusinessActivityDescription: responseData.headers.supplier_business_activity_description || '',
                addressLine0: responseData.headers.address_line0 || '',
                addressLine1: responseData.headers.address_line1 || '',
                addressLine2: responseData.headers.address_line2 || '',
                postalZone: responseData.headers.postal_zone || '',
                cityName: responseData.headers.city_name || '',
                state: responseData.headers.state || '',
                country: responseData.headers.country || '',
                supplierContactNumber: responseData.headers.contact || '',
                buyerName: responseData.headers.buyer_name || '',
                buyerTin: responseData.headers.buyer_tin || '',
                buyerRegistration: responseData.headers.bill_to_reg_no || '',
                buyerSstRegistrationNumber: responseData.headers.buyer_sst_registration_number || '',
                buyerEmail: responseData.headers.eemail || '',
                buyerAddressLine0: responseData.headers.buyer_address_line0 || '',
                buyerAddressLine1: responseData.headers.buyer_address_line1 || '',
                buyerAddressLine2: responseData.headers.buyer_address_line2 || '',
                buyerPostalZone: responseData.headers.buyer_postal_zone || '',
                buyerCityName: responseData.headers.buyer_city_name || '',
                buyerState: responseData.headers.buyer_state || '',
                buyerCountry: responseData.headers.buyer_country || '',
                buyerContactNumber: responseData.headers.ccontact || '',
                buyerAddress: responseData.headers.buyer_address || '',
                supplierAddress: responseData.headers.supplier_address || '',
                invoiceNo: responseData.headers.invoice_no || '',
                invoiceDate: responseData.headers.invoice_date || '',
                invoiceTime: currTime || '',
                items: responseData.headers.items || []
            });
            console.log(responseData);
        } catch (error) {
            console.error('Error extracting data:', error);
        }
    };

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

        const formattedData = {
            headers: {
                supplier: {
                    supplierName: formData.supplierName,
                    supplierTin: formData.supplierTin,
                    supplierRegistration: formData.supplierRegistration,
                    supplierEmail: formData.supplierEmail,
                    supplierMalaysiaStandardIndustrialClassificationMsicCode: formData.supplierMalaysiaStandardIndustrialClassificationMsicCode,
                    supplierBusinessActivityDescription: formData.supplierBusinessActivityDescription,
                    supplierAddress: {
                        addressLine0: formData.addressLine0,
                        addressLine1: formData.addressLine1,
                        addressLine2: formData.addressLine2,
                        postalZone: formData.postalZone,
                        cityName: formData.cityName,
                        state: formData.state,
                        country: formData.country,
                    },
                    supplierContactNumber: formData.supplierContactNumber,
                },
                buyer: {
                    buyerName: formData.buyerName,
                    buyerTin: formData.buyerTin,
                    buyerRegistration: formData.buyerRegistration,
                    buyerSstRegistrationNumber: formData.buyerSstRegistrationNumber,
                    buyerEmail: formData.buyerEmail,
                    buyerAddress: {
                        addressLine0: formData.buyerAddressLine0,
                        addressLine1: formData.buyerAddressLine1,
                        addressLine2: formData.buyerAddressLine2,
                        postalZone: formData.buyerPostalZone,
                        cityName: formData.buyerCityName,
                        state: formData.buyerState,
                        country: formData.buyerCountry,
                    },
                    buyerContactNumber: formData.buyerContactNumber,
                },
                eInvoiceVersion: '',
                eInvoiceTypeCode: '',
                eInvoiceCodeNumber: '',
                eInvoiceDate: formData.invoiceDate,
                eInvoiceTime: formData.invoiceTime,
                issuerDigitalSignature: '',
                invoiceCurrencyCode: '',
                currencyExchangeRate: 1,
                frequencyOfBilling: '',
                billingPeriodStartDate: '',
                billingPeriodEndDate: '',
                paymentMode: '',
                supplierBankAccountNumber: '',
                paymentTerms: '',
                prePaymentAmount: null,
                prePaymentDate: '',
                prePaymentTime: '',
                prePaymentReferenceNumber: '',
                billReferenceNumber: '',
                totalExcludingTax: null,
                totalIncludingTax: null,
                totalPayableAmount: null,
                totalNetAmount: null,
                totalDiscountValue: null,
                totalFeeChargeAmount: null,
                totalTaxAmount: null,
                roundingAmount: null,
                totalTaxableAmountPerTaxType: null,
                totalTaxAmountPerTaxType: null,
                detailsOfTaxExemption: '',
                amountExemptedFromTax: null,
                taxType: '',
                invoiceAdditionalDiscountAmount: null,
                invoiceAdditionalFeeAmount: null,
                shippingRecipientName: '',
                ShippingRecipientAddress: {
                    addressLine0: '',
                    addressLine1: '',
                    addressLine2: '',
                    postalZone: '',
                    cityName: '',
                    state: '',
                    country: '',
                },
                shippingRecipientTin: '',
                shippingRecipientRegistrationNumber: '',
                shippingRecipientPhoneNumber: '',
                supplyOrderReference: '',
                supplyOrderReferenceDate: '',
                supplyOrderReferenceTime: '',
                deliveryOrderReference: '',
                deliveryOrderReferenceDate: '',
                deliveryOrderReferenceTime: '',
                portOfEntry: '',
                recipientDeliveryInstructions: '',
                portOfEntryCode: '',
                placeOfReceiptByCarrier: '',
                meansOfTransport: '',
                placeOfDelivery: '',
                lineItems: formData.items.map((item) => ({
                    itemNumber: item.No,
                    itemDescription: item.Description,
                    itemQuantity: item.Qty,
                    itemUnitPrice: item[""],
                    itemTotalAmount: item.Amt,
                    itemDiscount: item.Disc,
                    itemTax: item.Tax,
                    itemNetAmount: item[""],
                })),
            }
        };

        console.log(JSON.stringify(formattedData, null, 2));
        console.log(file);
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
                    <h3>Invoice Details</h3>
                    <InputField label="Invoice No" name="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} />
                    <InputField label="Invoice Date" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} />
                    <InputField label="Invoice Time" name="invoiceTime" value={formData.invoiceTime} onChange={handleInputChange} />

                    <h3>Supplier Details</h3>
                    <InputField label="Supplier Name" name="supplierName" value={formData.supplierName} onChange={handleInputChange} />
                    {/* <InputField label="Supplier TIN" name="supplierTin" value={formData.supplierTin} onChange={handleInputChange} /> */}
                    <InputField label="Supplier Registration" name="supplierRegistration" value={formData.supplierRegistration} onChange={handleInputChange} />
                    {/* <InputField label="Supplier Tourism Tax Registration Number" name="supplierTourismTaxRegistrationNumber" value={formData.supplierTourismTaxRegistrationNumber} onChange={handleInputChange} /> */}
                    {/* <InputField label="Supplier SST Registration Number" name="supplierSstRegistrationNumber" value={formData.supplierSstRegistrationNumber} onChange={handleInputChange} /> */}
                    <InputField label="Supplier Email" name="supplierEmail" value={formData.supplierEmail} onChange={handleInputChange} />
                    {/* <InputField label="Supplier Malaysia Standard Industrial Classification (MSIC) Code" name="supplierMalaysiaStandardIndustrialClassificationMsicCode" value={formData.supplierMalaysiaStandardIndustrialClassificationMsicCode} onChange={handleInputChange} /> */}
                    {/* <InputField label="Supplier Business Activity Description" name="supplierBusinessActivityDescription" value={formData.supplierBusinessActivityDescription} onChange={handleInputChange} /> */}
                    <InputField label="Supplier Address" name="addressLine0" value={formData.supplierAddress} onChange={handleInputChange} />
                    {/* <InputField label="Address Line1" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} /> */}
                    {/* <InputField label="Address Line2" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} /> */}
                    {/* <InputField label="Postal Zone" name="postalZone" value={formData.postalZone} onChange={handleInputChange} /> */}
                    {/* <InputField label="City Name" name="cityName" value={formData.cityName} onChange={handleInputChange} /> */}
                    {/* <InputField label="State" name="state" value={formData.state} onChange={handleInputChange} /> */}
                    {/* <InputField label="Country" name="country" value={formData.country} onChange={handleInputChange} /> */}
                    <InputField label="Supplier Contact Number" name="supplierContactNumber" value={formData.supplierContactNumber} onChange={handleInputChange} />

                    <h3>Buyer Details</h3>
                    <InputField label="Buyer Name" name="buyerName" value={formData.buyerName} onChange={handleInputChange} />
                    {/* <InputField label="Buyer Tin" name="buyerTin" value={formData.buyerTin} onChange={handleInputChange} /> */}
                    <InputField label="Buyer Registration" name="buyerRegistration" value={formData.buyerRegistration} onChange={handleInputChange} />
                    {/* <InputField label="Buyer SST Registration Number" name="buyerSstRegistrationNumber" value={formData.buyerSstRegistrationNumber} onChange={handleInputChange} /> */}
                    <InputField label="Buyer Email" name="buyerEmail" value={formData.buyerEmail} onChange={handleInputChange} />
                    {/* <InputField label="Buyer Address" name="buyerAddressLine0" value={formData.buyerAddressLine0} onChange={handleInputChange} /> */}
                    {/* <InputField label="Address Line1" name="buyerAddressLine1" value={formData.buyerAddressLine1} onChange={handleInputChange} /> */}
                    {/* <InputField label="Address Line2" name="buyerAddressLine2" value={formData.buyerAddressLine2} onChange={handleInputChange} /> */}
                    {/* <InputField label="Postal Zone" name="buyerPostalZone" value={formData.buyerPostalZone} onChange={handleInputChange} /> */}
                    {/* <InputField label="City Name" name="buyerCityName" value={formData.buyerCityName} onChange={handleInputChange} /> */}
                    {/* <InputField label="State" name="buyerState" value={formData.buyerState} onChange={handleInputChange} /> */}
                    {/* <InputField label="Country" name="buyerCountry" value={formData.buyerCountry} onChange={handleInputChange} /> */}
                    <InputField label="Buyer Address" name="buyerAddress" value={formData.buyerAddress} onChange={handleInputChange} />
                    <InputField label="Buyer Contact Number" name="buyerContactNumber" value={formData.buyerContactNumber} onChange={handleInputChange} />

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
                                <>
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
                                    <tr>
                                    <th colSpan={6} style={{textAlign:'right'}}>Subtotal</th>
                                    <td colSpan={2} style={{textAlign:'right'}}>RM18,000.00</td>
                                    </tr>
                                    <tr>
                                    <th colSpan={6} style={{textAlign:'right'}}>Service Tax (8%)</th>
                                    <td colSpan={2} style={{textAlign:'right'}}>RM1,440.00</td>
                                    </tr>
                                    <tr>
                                    <th colSpan={6} style={{textAlign:'right'}}>Total</th>
                                    <td colSpan={2} style={{textAlign:'right'}}>RM19,440.00</td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <div className="extract-button-container">
                        <button type='submit' className="extract-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Panel;