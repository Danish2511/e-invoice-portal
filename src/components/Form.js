import React, { useState } from 'react';

const initialData = {
    headers: {
        supplier: {
            supplierName: "AMS Setia Jaya Sdn. Bhd.",
            supplierTin: "C2584563222",
            supplierRegistration: "202001234567",
            SupplierTourismTaxRegistrationNumber: "123-4567-89012345",
            supplierSstRegistrationNumber: "A01-2345-67891012",
            supplierEmail: "general.ams@supplier.com",
            supplierMalaysiaStandardIndustrialClassificationMsicCode: "01111",
            supplierBusinessActivityDescription: "Growing of maize",
            supplierAddress: {
                addressLine0: "Lot 66",
                addressLine1: "Bangunan Merdeka",
                addressLine2: "Persiaran Jaya",
                postalZone: "50480",
                cityName: "Kuala Lumpur",
                state: "14",
                country: "MYS"
            },
            supplierContactNumber: "+60123456789"
        },
        buyer: {
            buyerName: "Hebat Group",
            buyerTin: "C2584563200",
            buyerRegistration: "BRN: 202001234567",
            buyerSstRegistrationNumber: "NA",
            buyerEmail: "name@buyer.com",
            buyerAddress: {
                addressLine0: "Address line 1",
                addressLine1: "Address line 2",
                addressLine2: "Address line 3",
                postalZone: "Postal Zone",
                cityName: "City Name",
                state: "State",
                country: "Country"
            },
            buyerContactNumber: "+60123456789"
        },
        eInvoiceVersion: "1.0",
        eInvoiceTypeCode: "01",
        eInvoiceCodeNumber: "INV12345",
        eInvoiceDate: "2017-11-26",
        eInvoiceTime: "15:30:00Z",
        issuerDigitalSignature: "",
        invoiceCurrencyCode: "MYR",
        currencyExchangeRate: 1,
        frequencyOfBilling: "Monthly",
        billingPeriodStartDate: "2017-11-26",
        billingPeriodEndDate: "2017-11-30",
        paymentMode: "01",
        supplierBankAccountNumber: "1234567890123",
        paymentTerms: "Payment method is Cash",
        prePaymentAmount: 1,
        prePaymentDate: "2000-01-01",
        prePaymentTime: "12:00:00Z",
        prePaymentReferenceNumber: "E12345678912",
        billReferenceNumber: "E12345678912",
        totalExcludingTax: 1436.5,
        totalIncludingTax: 1436.5,
        totalPayableAmount: 1436.5,
        totalNetAmount: 1436.5,
        totalDiscountValue: 1436.5,
        totalFeeChargeAmount: 1436.5,
        totalTaxAmount: 87.63,
        roundingAmount: 0.3,
        totalTaxableAmountPerTaxType: 1460.5,
        totalTaxAmountPerTaxType: 87.63,
        detailsOfTaxExemption: "Goods acquired with SST exemption under Sales Tax Act 2018. Reference No: (C01-2345-67890123)",
        amountExemptedFromTax: 1460.5,
        taxType: "01",
        invoiceAdditionalDiscountAmount: 100,
        invoiceAdditionalFeeAmount: 100,
        shippingRecipientName: "Greenz Sdn. Bhd.",
        ShippingRecipientAddress: {
            addressLine0: "Address line 1",
            addressLine1: "Address line 2",
            addressLine2: "Address line 3",
            postalZone: "Postal Zone",
            cityName: "City Name",
            state: "State",
            country: "Country"
        },
        shippingRecipientTin: "C2584563200",
        shippingRecipientRegistrationNumber: "E12345678912",
        referenceNumberOfCustomsFormNo1_9Etc: "E12345678912",
        incoterms: "CIF",
        freeTradeAgreementFtaInformation: "ASEAN-Australia-New Zealand FTA (AANZFTA)",
        authorisationNumberOfCertifiedExporter: "CPT-CCN-W-211111-KL-000002",
        referenceNumberOfCustomsFormNo2: "E12345678912",
        detailsOfOtherCharges: {
            hasCharges: true,
            chargeDetails: "Service charge",
            totalCharges: 100
        }
    },
    lines: [
        {
            classification: "001",
            descriptionOfProductOrService: "Laptop Peripherals",
            unitPrice: 17,
            taxType: "01",
            taxRate: 10,
            taxAmount: 87.63,
            detailsOfTaxExemption: "Goods acquired with SST exemption under Sales Tax Act 2018. Reference No: (C01-2345-67890123)",
            amountExemptedFromTax: 1460.5,
            subtotal: 100,
            totalExcludingTax: 1436.5,
            quantity: 1,
            measurement: "Kg",
            discountRate: 0.15,
            discountAmount: 1000,
            feeChargeRate: 0.1,
            feeChargeAmount: 1000,
            productTariffCode: "9800.00.0010",
            countryOfOrigin: "GBR"
        }
    ]
};

const Form = () => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        const newFormData = { ...formData };
        let obj = newFormData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (Array.isArray(obj[keys[i]])) {
                obj = obj[keys[i]][parseInt(keys[i + 1])];
                i++;
            } else {
                obj = obj[keys[i]];
            }
        }

        obj[keys[keys.length - 1]] = value;
        setFormData(newFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Convert formData to JSON format if needed
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Supplier Details</h2>
            <input type="text" name="headers.supplier.supplierName" value={formData.headers.supplier.supplierName} onChange={handleChange} placeholder="Supplier Name" />
            <input type="text" name="headers.supplier.supplierTin" value={formData.headers.supplier.supplierTin} onChange={handleChange} placeholder="Supplier Tin" />
            <input type="text" name="headers.supplier.supplierRegistration" value={formData.headers.supplier.supplierRegistration} onChange={handleChange} placeholder="Supplier Registration" />
            <input type="text" name="headers.supplier.SupplierTourismTaxRegistrationNumber" value={formData.headers.supplier.SupplierTourismTaxRegistrationNumber} onChange={handleChange} placeholder="Supplier Tourism Tax Registration Number" />
            <input type="text" name="headers.supplier.supplierSstRegistrationNumber" value={formData.headers.supplier.supplierSstRegistrationNumber} onChange={handleChange} placeholder="Supplier SST Registration Number" />
            <input type="text" name="headers.supplier.supplierEmail" value={formData.headers.supplier.supplierEmail} onChange={handleChange} placeholder="Supplier Email" />
            <input type="text" name="headers.supplier.supplierMalaysiaStandardIndustrialClassificationMsicCode" value={formData.headers.supplier.supplierMalaysiaStandardIndustrialClassificationMsicCode} onChange={handleChange} placeholder="Supplier MSIC Code" />
            <input type="text" name="headers.supplier.supplierBusinessActivityDescription" value={formData.headers.supplier.supplierBusinessActivityDescription} onChange={handleChange} placeholder="Supplier Business Activity Description" />
            
            <h2>Supplier Address</h2>
            <input type="text" name="headers.supplier.supplierAddress.addressLine0" value={formData.headers.supplier.supplierAddress.addressLine0} onChange={handleChange} placeholder="Address Line 0" />
            <input type="text" name="headers.supplier.supplierAddress.addressLine1" value={formData.headers.supplier.supplierAddress.addressLine1} onChange={handleChange} placeholder="Address Line 1" />
            <input type="text" name="headers.supplier.supplierAddress.addressLine2" value={formData.headers.supplier.supplierAddress.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
            <input type="text" name="headers.supplier.supplierAddress.postalZone" value={formData.headers.supplier.supplierAddress.postalZone} onChange={handleChange} placeholder="Postal Zone" />
            <input type="text" name="headers.supplier.supplierAddress.cityName" value={formData.headers.supplier.supplierAddress.cityName} onChange={handleChange} placeholder="City Name" />
            <input type="text" name="headers.supplier.supplierAddress.state" value={formData.headers.supplier.supplierAddress.state} onChange={handleChange} placeholder="State" />
            <input type="text" name="headers.supplier.supplierAddress.country" value={formData.headers.supplier.supplierAddress.country} onChange={handleChange} placeholder="Country" />
            <input type="text" name="headers.supplier.supplierContactNumber" value={formData.headers.supplier.supplierContactNumber} onChange={handleChange} placeholder="Supplier Contact Number" />

            <h2>Buyer Details</h2>
            <input type="text" name="headers.buyer.buyerName" value={formData.headers.buyer.buyerName} onChange={handleChange} placeholder="Buyer Name" />
            <input type="text" name="headers.buyer.buyerTin" value={formData.headers.buyer.buyerTin} onChange={handleChange} placeholder="Buyer Tin" />
            <input type="text" name="headers.buyer.buyerRegistration" value={formData.headers.buyer.buyerRegistration} onChange={handleChange} placeholder="Buyer Registration" />
            <input type="text" name="headers.buyer.buyerSstRegistrationNumber" value={formData.headers.buyer.buyerSstRegistrationNumber} onChange={handleChange} placeholder="Buyer SST Registration Number" />
            <input type="text" name="headers.buyer.buyerEmail" value={formData.headers.buyer.buyerEmail} onChange={handleChange} placeholder="Buyer Email" />

            <h2>Buyer Address</h2>
            <input type="text" name="headers.buyer.buyerAddress.addressLine0" value={formData.headers.buyer.buyerAddress.addressLine0} onChange={handleChange} placeholder="Address Line 0" />
            <input type="text" name="headers.buyer.buyerAddress.addressLine1" value={formData.headers.buyer.buyerAddress.addressLine1} onChange={handleChange} placeholder="Address Line 1" />
            <input type="text" name="headers.buyer.buyerAddress.addressLine2" value={formData.headers.buyer.buyerAddress.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
            <input type="text" name="headers.buyer.buyerAddress.postalZone" value={formData.headers.buyer.buyerAddress.postalZone} onChange={handleChange} placeholder="Postal Zone" />
            <input type="text" name="headers.buyer.buyerAddress.cityName" value={formData.headers.buyer.buyerAddress.cityName} onChange={handleChange} placeholder="City Name" />
            <input type="text" name="headers.buyer.buyerAddress.state" value={formData.headers.buyer.buyerAddress.state} onChange={handleChange} placeholder="State" />
            <input type="text" name="headers.buyer.buyerAddress.country" value={formData.headers.buyer.buyerAddress.country} onChange={handleChange} placeholder="Country" />
            <input type="text" name="headers.buyer.buyerContactNumber" value={formData.headers.buyer.buyerContactNumber} onChange={handleChange} placeholder="Buyer Contact Number" />

            <h2>Invoice Details</h2>
            <input type="text" name="headers.eInvoiceVersion" value={formData.headers.eInvoiceVersion} onChange={handleChange} placeholder="eInvoice Version" />
            <input type="text" name="headers.eInvoiceTypeCode" value={formData.headers.eInvoiceTypeCode} onChange={handleChange} placeholder="eInvoice Type Code" />
            <input type="text" name="headers.eInvoiceCodeNumber" value={formData.headers.eInvoiceCodeNumber} onChange={handleChange} placeholder="eInvoice Code Number" />
            <input type="text" name="headers.eInvoiceDate" value={formData.headers.eInvoiceDate} onChange={handleChange} placeholder="eInvoice Date" />
            <input type="text" name="headers.eInvoiceTime" value={formData.headers.eInvoiceTime} onChange={handleChange} placeholder="eInvoice Time" />

            <h2>Additional Details</h2>
            <input type="text" name="headers.issuerDigitalSignature" value={formData.headers.issuerDigitalSignature} onChange={handleChange} placeholder="Issuer Digital Signature" />
            <input type="text" name="headers.invoiceCurrencyCode" value={formData.headers.invoiceCurrencyCode} onChange={handleChange} placeholder="Invoice Currency Code" />
            <input type="text" name="headers.currencyExchangeRate" value={formData.headers.currencyExchangeRate} onChange={handleChange} placeholder="Currency Exchange Rate" />
            <input type="text" name="headers.frequencyOfBilling" value={formData.headers.frequencyOfBilling} onChange={handleChange} placeholder="Frequency of Billing" />
            <input type="text" name="headers.billingPeriodStartDate" value={formData.headers.billingPeriodStartDate} onChange={handleChange} placeholder="Billing Period Start Date" />
            <input type="text" name="headers.billingPeriodEndDate" value={formData.headers.billingPeriodEndDate} onChange={handleChange} placeholder="Billing Period End Date" />
            <input type="text" name="headers.paymentMode" value={formData.headers.paymentMode} onChange={handleChange} placeholder="Payment Mode" />
            <input type="text" name="headers.supplierBankAccountNumber" value={formData.headers.supplierBankAccountNumber} onChange={handleChange} placeholder="Supplier Bank Account Number" />
            <input type="text" name="headers.paymentTerms" value={formData.headers.paymentTerms} onChange={handleChange} placeholder="Payment Terms" />
            <input type="text" name="headers.prePaymentAmount" value={formData.headers.prePaymentAmount} onChange={handleChange} placeholder="Pre Payment Amount" />
            <input type="text" name="headers.prePaymentDate" value={formData.headers.prePaymentDate} onChange={handleChange} placeholder="Pre Payment Date" />
            <input type="text" name="headers.prePaymentTime" value={formData.headers.prePaymentTime} onChange={handleChange} placeholder="Pre Payment Time" />
            <input type="text" name="headers.prePaymentReferenceNumber" value={formData.headers.prePaymentReferenceNumber} onChange={handleChange} placeholder="Pre Payment Reference Number" />
            <input type="text" name="headers.billReferenceNumber" value={formData.headers.billReferenceNumber} onChange={handleChange} placeholder="Bill Reference Number" />

            <h2>Totals</h2>
            <input type="text" name="headers.totalExcludingTax" value={formData.headers.totalExcludingTax} onChange={handleChange} placeholder="Total Excluding Tax" />
            <input type="text" name="headers.totalIncludingTax" value={formData.headers.totalIncludingTax} onChange={handleChange} placeholder="Total Including Tax" />
            <input type="text" name="headers.totalPayableAmount" value={formData.headers.totalPayableAmount} onChange={handleChange} placeholder="Total Payable Amount" />
            <input type="text" name="headers.totalNetAmount" value={formData.headers.totalNetAmount} onChange={handleChange} placeholder="Total Net Amount" />
            <input type="text" name="headers.totalDiscountValue" value={formData.headers.totalDiscountValue} onChange={handleChange} placeholder="Total Discount Value" />
            <input type="text" name="headers.totalFeeChargeAmount" value={formData.headers.totalFeeChargeAmount} onChange={handleChange} placeholder="Total Fee Charge Amount" />
            <input type="text" name="headers.totalTaxAmount" value={formData.headers.totalTaxAmount} onChange={handleChange} placeholder="Total Tax Amount" />
            <input type="text" name="headers.roundingAmount" value={formData.headers.roundingAmount} onChange={handleChange} placeholder="Rounding Amount" />
            <input type="text" name="headers.totalTaxableAmountPerTaxType" value={formData.headers.totalTaxableAmountPerTaxType} onChange={handleChange} placeholder="Total Taxable Amount Per Tax Type" />
            <input type="text" name="headers.totalTaxAmountPerTaxType" value={formData.headers.totalTaxAmountPerTaxType} onChange={handleChange} placeholder="Total Tax Amount Per Tax Type" />
            <input type="text" name="headers.detailsOfTaxExemption" value={formData.headers.detailsOfTaxExemption} onChange={handleChange} placeholder="Details Of Tax Exemption" />
            <input type="text" name="headers.amountExemptedFromTax" value={formData.headers.amountExemptedFromTax} onChange={handleChange} placeholder="Amount Exempted From Tax" />
            <input type="text" name="headers.taxType" value={formData.headers.taxType} onChange={handleChange} placeholder="Tax Type" />
            <input type="text" name="headers.invoiceAdditionalDiscountAmount" value={formData.headers.invoiceAdditionalDiscountAmount} onChange={handleChange} placeholder="Invoice Additional Discount Amount" />
            <input type="text" name="headers.invoiceAdditionalFeeAmount" value={formData.headers.invoiceAdditionalFeeAmount} onChange={handleChange} placeholder="Invoice Additional Fee Amount" />

            <h2>Shipping Recipient Details</h2>
            <input type="text" name="headers.shippingRecipientName" value={formData.headers.shippingRecipientName} onChange={handleChange} placeholder="Shipping Recipient Name" />
            
            <h2>Shipping Recipient Address</h2>
            <input type="text" name="headers.ShippingRecipientAddress.addressLine0" value={formData.headers.ShippingRecipientAddress.addressLine0} onChange={handleChange} placeholder="Address Line 0" />
            <input type="text" name="headers.ShippingRecipientAddress.addressLine1" value={formData.headers.ShippingRecipientAddress.addressLine1} onChange={handleChange} placeholder="Address Line 1" />
            <input type="text" name="headers.ShippingRecipientAddress.addressLine2" value={formData.headers.ShippingRecipientAddress.addressLine2} onChange={handleChange} placeholder="Address Line 2" />
            <input type="text" name="headers.ShippingRecipientAddress.postalZone" value={formData.headers.ShippingRecipientAddress.postalZone} onChange={handleChange} placeholder="Postal Zone" />
            <input type="text" name="headers.ShippingRecipientAddress.cityName" value={formData.headers.ShippingRecipientAddress.cityName} onChange={handleChange} placeholder="City Name" />
            <input type="text" name="headers.ShippingRecipientAddress.state" value={formData.headers.ShippingRecipientAddress.state} onChange={handleChange} placeholder="State" />
            <input type="text" name="headers.ShippingRecipientAddress.country" value={formData.headers.ShippingRecipientAddress.country} onChange={handleChange} placeholder="Country" />
            
            <input type="text" name="headers.shippingRecipientTin" value={formData.headers.shippingRecipientTin} onChange={handleChange} placeholder="Shipping Recipient Tin" />
            <input type="text" name="headers.shippingRecipientRegistrationNumber" value={formData.headers.shippingRecipientRegistrationNumber} onChange={handleChange} placeholder="Shipping Recipient Registration Number" />
            <input type="text" name="headers.referenceNumberOfCustomsFormNo1_9Etc" value={formData.headers.referenceNumberOfCustomsFormNo1_9Etc} onChange={handleChange} placeholder="Reference Number Of Customs Form No.1-9 Etc" />
            <input type="text" name="headers.incoterms" value={formData.headers.incoterms} onChange={handleChange} placeholder="Incoterms" />
            <input type="text" name="headers.freeTradeAgreementFtaInformation" value={formData.headers.freeTradeAgreementFtaInformation} onChange={handleChange} placeholder="Free Trade Agreement FTA Information" />
            <input type="text" name="headers.authorisationNumberOfCertifiedExporter" value={formData.headers.authorisationNumberOfCertifiedExporter} onChange={handleChange} placeholder="Authorisation Number Of Certified Exporter" />
            <input type="text" name="headers.referenceNumberOfCustomsFormNo2" value={formData.headers.referenceNumberOfCustomsFormNo2} onChange={handleChange} placeholder="Reference Number Of Customs Form No.2" />
            
            <h2>Details Of Other Charges</h2>
            <input type="checkbox" name="headers.detailsOfOtherCharges.hasCharges" checked={formData.headers.detailsOfOtherCharges.hasCharges} onChange={(e) => handleChange({ target: { name: 'headers.detailsOfOtherCharges.hasCharges', value: e.target.checked } })} />
            <input type="text" name="headers.detailsOfOtherCharges.chargeDetails" value={formData.headers.detailsOfOtherCharges.chargeDetails} onChange={handleChange} placeholder="Charge Details" />
            <input type="text" name="headers.detailsOfOtherCharges.totalCharges" value={formData.headers.detailsOfOtherCharges.totalCharges} onChange={handleChange} placeholder="Total Charges" />

            <h2>Line Items</h2>
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
                    {formData.lines.map((line, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><input type="text" name={`lines[${index}].descriptionOfProductOrService`} value={line.descriptionOfProductOrService} onChange={handleChange} /></td>
                            <td><input type="text" name={`lines[${index}].quantity`} value={line.quantity} onChange={handleChange} /></td>
                            <td><input type="text" name={`lines[${index}].unitPrice`} value={line.unitPrice} onChange={handleChange} /></td>
                            <td>{(line.unitPrice * line.quantity).toFixed(2)}</td>
                            <td><input type="text" name={`lines[${index}].discountAmount`} value={line.discountAmount} onChange={handleChange} /></td>
                            <td><input type="text" name={`lines[${index}].taxAmount`} value={line.taxAmount} onChange={handleChange} /></td>
                            <td>{((line.unitPrice * line.quantity) - line.discountAmount + line.taxAmount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
