import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import InputField from './InputField';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme, Row } from 'antd';

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
                subTotal: responseData.headers.subtotal || '',
                serviceTax: responseData.headers.service_tax || '',
                total: responseData.headers.total || '',
                items: responseData.headers.items || [],
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

    const invoiceFields = () => (
        <>
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                <InputField placeholder="Invoice No" name="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} span="12" />
                <InputField placeholder="Invoice Date" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} span="12" />
                <InputField placeholder="Invoice Time" name="invoiceTime" value={formData.invoiceTime} onChange={handleInputChange} span="12" />
                <InputField placeholder="Issuer Digital Signature" name="issuerDigitalSignature" value={formData.issuerDigitalSignature} onChange={handleInputChange} span="12" />
                <InputField placeholder="Invoice Currency Code" name="invoiceCurrencyCode" value={formData.invoiceCurrencyCode} onChange={handleInputChange} span="12" />
                <InputField placeholder="Currency Exchange Rate" name="currencyExchangeRate" value={formData.currencyExchangeRate} onChange={handleInputChange} span="12" />
                <InputField placeholder="Total Excluding Tax" name="totalExcludingTax" value={formData.totalExcludingTax} onChange={handleInputChange} span="12" />
                <InputField placeholder="Total Including Tax" name="totalIncludingTax" value={formData.totalIncludingTax} onChange={handleInputChange} span="12" />
                <InputField placeholder="Total PayableAmount" name="totalPayableAmount" value={formData.totalPayableAmount} onChange={handleInputChange} span="12" />
                <InputField placeholder="Total Tax Amount" name="totalTaxAmount" value={formData.totalTaxAmount} onChange={handleInputChange} span="12" />
                <InputField placeholder="Total Taxable Amount Per Tax Type" name="totalTaxableAmountPerTaxType" value={formData.totalTaxableAmountPerTaxType} onChange={handleInputChange} span="12" />
                <InputField placeholder="Total Tax Amount Per Tax Type" name="totalTaxAmountPerTaxType" value={formData.totalTaxAmountPerTaxType} onChange={handleInputChange} span="12" />
                <InputField placeholder="Tax Type" name="taxType" value={formData.taxType} onChange={handleInputChange} span="12" />
                <InputField placeholder="Invoice Additional Discount Amount" name="invoiceAdditionalDiscountAmount" value={formData.invoiceAdditionalDiscountAmount} onChange={handleInputChange} span="12" />
                <InputField placeholder="Invoice Additional Fee Amount" name="invoiceAdditionalFeeAmount" value={formData.invoiceAdditionalFeeAmount} onChange={handleInputChange} span="12" />
                <InputField placeholder="Reference Number Of Customs Form No" name="referenceNumberOfCustomsFormNo1_9Etc" value={formData.referenceNumberOfCustomsFormNo1_9Etc} onChange={handleInputChange} span="12" />
            </Row>
        </>
    );

    const supplierFields = () => (
        <>
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                <InputField placeholder="Supplier Name" name="supplierName" value={formData.supplierName} onChange={handleInputChange} span="12" />
                <InputField placeholder="Supplier TIN" name="supplierTin" value={formData.supplierTin} onChange={handleInputChange} span="12" />
                <InputField placeholder="Supplier Registration" name="supplierRegistration" value={formData.supplierRegistration} onChange={handleInputChange} span="12" />
                <InputField placeholder="Supplier Email" name="supplierEmail" value={formData.supplierEmail} onChange={handleInputChange} span="12" />
                <InputField placeholder="Supplier MSIC Code" name="supplierMalaysiaStandardIndustrialClassificationMsicCode" value={formData.supplierMalaysiaStandardIndustrialClassificationMsicCode} onChange={handleInputChange} span="12" />
                <InputField placeholder="Supplier Business Activity Description" name="supplierBusinessActivityDescription" value={formData.supplierBusinessActivityDescription} onChange={handleInputChange} span="12" />
                <InputField placeholder="Address Line 0" name="addressLine0" value={formData.addressLine0} onChange={handleInputChange} span="12" />
                <InputField placeholder="City Name" name="cityName" value={formData.cityName} onChange={handleInputChange} span="12" />
                <InputField placeholder="State" name="state" value={formData.state} onChange={handleInputChange} span="12" />
                <InputField placeholder="Country" name="country" value={formData.country} onChange={handleInputChange} span="12" />
                <InputField placeholder="Supplier Contact Number" name="supplierContactNumber" value={formData.supplierContactNumber} onChange={handleInputChange} span="12" />
                <InputField placeholder="Supplier Bank Account Number" name="supplierBankAccountNumber" value={formData.supplierBankAccountNumber} onChange={handleInputChange} span="12" />
            </Row>
        </>
    );

    const buyerFields = () => (
        <>
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                <InputField placeholder="Buyer Name" name="buyerName" value={formData.buyerName} onChange={handleInputChange} span="12" />
                <InputField placeholder="Buyer TIN" name="buyerTin" value={formData.buyerTin} onChange={handleInputChange} span="12" />
                <InputField placeholder="Buyer Registration" name="buyerRegistration" value={formData.buyerRegistration} onChange={handleInputChange} span="12" />
                <InputField placeholder="Buyer SST Registration Number" name="buyerSstRegistrationNumber" value={formData.buyerSstRegistrationNumber} onChange={handleInputChange} span="12" />
                <InputField placeholder="Address Line 0" name="addressLine0" value={formData.addressLine0} onChange={handleInputChange} span="12" />
                <InputField placeholder="City Name" name="cityName" value={formData.cityName} onChange={handleInputChange} span="12" />
                <InputField placeholder="State" name="state" value={formData.state} onChange={handleInputChange} span="12" />
                <InputField placeholder="Country" name="country" value={formData.country} onChange={handleInputChange} span="12" />
                <InputField placeholder="Buyer Contact Number" name="buyerContactNumber" value={formData.buyerContactNumber} onChange={handleInputChange} span="12" />
            </Row>
        </>
    );

    const lineItems = () => (
        <>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
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
                                <td>{item.Description}</td>
                                <td>{item.Qty}</td>
                                <td>{item["U/Price"]}</td>
                                <td>{item.Amt}</td>
                                <td>{item.Disc}</td>
                                <td>{item.Tax}</td>
                                <td>{item["Net Amt"]}</td>
                            </tr>
                            <tr>
                                <th colSpan={7} style={{ textAlign: 'right', paddingRight: '100px' }}>Subtotal</th>
                                <td colSpan={1}>{formData.subTotal}</td>
                            </tr>
                            <tr>
                                <th colSpan={7} style={{ textAlign: 'right', paddingRight: '100px' }}>Service Tax (8%)</th>
                                <td colSpan={1}>{formData.serviceTax}</td>
                            </tr>
                            <tr>
                                <th colSpan={7} style={{ textAlign: 'right', paddingRight: '100px' }}>Total</th>
                                <td colSpan={1}>{formData.total}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </>
    );

    //const text = invoiceFields();
    const getItems = (panelStyle) => [
        {
            key: '1',
            label: 'Invoice Details',
            children: <p>{invoiceFields()}</p>,
            style: panelStyle,
        },
        {
            key: '2',
            label: 'Supplier Details',
            children: <p>{supplierFields()}</p>,
            style: panelStyle,
        },
        {
            key: '3',
            label: 'Buyer Details',
            children: <p>{buyerFields()}</p>,
            style: panelStyle,
        },
        {
            key: '4',
            label: 'Line Items',
            children: <p>{lineItems()}</p>,
            style: panelStyle,
        },
    ];

    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 20,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
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
                        Extract
                    </button>
                </div>
            </div>
            <div className="panel right-panel">
                <h2>Form</h2>
                <form onSubmit={handleSubmit}>
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            background: token.colorBgContainer,
                        }}
                        items={getItems(panelStyle)}
                    />
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