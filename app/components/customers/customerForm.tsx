"use client"

import { useEffect, useState } from "react";
import { addCustomer, updateCustomer } from "@/lib/customers";
import { Customer } from "@/types/customer";
import { untabbedCard, tabbedCard, dangerButton, heading, inputStyleStretch,
    labelStyle, primaryButton } from "@/styles/ui";

import { MESSAGES } from "@/constants/messages";


type Properties = {
    editingCustomer?: Customer;
    onCancel: () => void;
    onSubmit: () => void;
};


export default function CustomerForm({
    editingCustomer,
    onCancel,
    onSubmit
}: Properties) {
    
    // Customer metadata.
    const [forename, setForename] = useState("");
    const [surname, setSurname] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [townOrCity, setTownOrCity] = useState("");
    const [region, setRegion] = useState("");
    const [postcode, setPostcode] = useState("")
    const [postcodeValid, setPostcodeValid] = useState<boolean | null>(null);
    const [mobile, setMobile] = useState("");
    const [mobileValid, setMobileValid] = useState<boolean | null>(null);
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [notes, setNotes] = useState("");

    // UK postcode regex (simplified, covers standard formats).
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/;
  
    // UK phone number regex (basic, allows only UK country code, else enforces zero first number).
    const mobileRegex = /^(?:\+44|0)\d{9,10}$/ ;
  
    // Email regex (simple and practical, enforces '@', requires domain including '.', excludes spaces).
    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    
    
    // Runs when component loads.
    // NOTE: Dependancy array [editingCustomer], only re-run function if 'editingCustomer' changes.
    useEffect(() => {
      
        if (editingCustomer) {

            // Editing existing customer.
            setForename(editingCustomer.forename);
            setSurname(editingCustomer.surname);
            setAddressLine1(editingCustomer.address_line_1 || "");
            setAddressLine2(editingCustomer.address_line_2 || "");
            setTownOrCity(editingCustomer.town_city || "");
            setRegion(editingCustomer.region || "")
            setPostcode(editingCustomer.postcode || "");
            setMobile(editingCustomer.mobile || "");
            setEmail(editingCustomer.email || "");
            setNotes(editingCustomer.notes || "");

        } else {

            // Adding new customer.
            handleReset();
        }
  
    }, [editingCustomer]);


    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();

        // Forename and surname are mandatory.
        if (!forename.trim() || !surname.trim()) {
          alert("Forename and surname are required");
          return;
        }
    
        // Disallow invalid postcodes.
        if (postcode && !postcodeRegex.test(postcode)) {
            alert("Please enter a valid UK postcode");
            return;
        }
    
        // Disallow invalid phone numbers.
        if (mobile && !mobileRegex.test(mobile)) {
            alert("Please enter a valid UK phone number");
            return;
        }
    
        // Disallow invalid email addresses.
        if (email && !emailRegex.test(email)) {
          alert("Please enter a valid email address");
          return;
        }

        if (editingCustomer) {

            const confirmed = confirm(MESSAGES.CONFIRM_EDIT_CUSTOMER);
            if (!confirmed) {
                return;
            }

            // Editing existing customer.
            const { error } = await updateCustomer({
                id: editingCustomer.id,
                forename: forename.trim(),
                surname: surname.trim(),
                address_line_1: addressLine1 || null,
                address_line_2: addressLine2 || null,
                town_city: townOrCity || null,
                region: region || null,
                postcode: postcode || null,
                mobile: mobile || null,
                email: email || null,
                notes: notes || null
            });

            if (error) {
                console.error(error);
                alert("Error updating customer");
            } else {
                alert("Customer updated")
                onSubmit();
            }

        } else {

            // Adding new customer.
            const { error } = await addCustomer ({
                forename: forename.trim(),
                surname: surname.trim(),
                address_line_1: addressLine1 || null,
                address_line_2: addressLine2 || null,
                town_city: townOrCity || null,
                region: region || null,
                postcode: postcode || null,
                mobile: mobile || null,
                email: email || null,
                notes: notes || null
            });

            if (error) {
                console.error(error);
                alert("Error adding customer");
            } else {
                alert("Customer added");
                handleReset();
            }
        }
    };
    
    
    // Returns a UI border colour depending on the value of the input parameter.
    const getBorderColor = (value: boolean | null) => {
      if (value === null) {
        return "#ccc";
      }
  
      return value ? "green" : "red";
    };
    
    
    // Real-time postcode validation.
    const handlePostcodeChange = (value: string) => {
  
      // Make uppercase and remove all non-alphanumeric characters.
      value = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  
      // Clamp length to 7 characters (without space).
      if (value.length > 7) {
        value = value.slice(0, 7);
      }
  
      // Reinsert space before last 3 characters.
      if (value.length > 3) {
        value = value.slice(0, -3) + " " + value.slice(-3);
      }
  
      // Assign cleaned value.
      setPostcode(value);
  
      // Only validate when length is greater than 5 characters (excluding space).
      const rawLength = value.replace(" ", "").length;
  
      // Real-time feedback.
      if (rawLength < 5) {
        setPostcodeValid(null);
        return;
      }
  
      setPostcodeValid(postcodeRegex.test(value));
    };


    // Real-time phone number validation.
    const handleMobileChange = (value: string) => {
  
      // Remove all non-numeric characters.
      value = value.replace(/[^0-9]/gi, "");
  
      // Clamp length to 11 digits (without space).
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
  
      setMobile(value);
  
      // Only validate when length is equal to 11 digits.
      if (value.length < 11) {
        setMobileValid(null);
        return;
      }
  
      setMobileValid(mobileRegex.test(value));
    };


    // Real-time email address validation.
    const handleEmailChange = (value: string) => {
  
      // Remove all invalid characters.
      value = value.replace(/[^a-z0-9@.]/gi, "");
  
      setEmail(value);
      setEmailValid(emailRegex.test(value));
    };


    // Cancel button handler.
    const handleCancel = () => {

        const confirmed = confirm(MESSAGES.CANCEL_EDIT_CUSTOMER);
        if (confirmed) {
            onCancel();
        }
    };


    // Reset button handler.
    const handleReset = () => {
      setForename("");
      setSurname("");
      setAddressLine1("");
      setAddressLine2("");
      setTownOrCity("");
      setRegion("");
      setPostcode("");
      setPostcodeValid(null);
      setMobile("");
      setMobileValid(null);
      setEmail("");
      setEmailValid(null);
      setNotes("");
    };


    return (
        <div style={editingCustomer ? tabbedCard : untabbedCard}>
            <h3 style={heading}>{editingCustomer ? "Edit Customer" : "Add Customer"}</h3>

            {/* Editing Existing Customer */}
            <form
                name="CustomerForm"
                style={{ maxWidth: "400px" }}
                onSubmit={handleSubmit}
            >

                {/* Name inputs */}
                <h3 style={{ ...labelStyle, padding: "3px" }}>Name:</h3>
                <div style={{ paddingBottom: "20px"}}>
        
                {/* Forename input */}
                <input
                    autoFocus
                    required
                    type="text"
                    style={inputStyleStretch}
                    placeholder="Forename [Required]"
                    value={forename}
                    onChange={(e) => setForename(e.target.value)}
                />
        
                {/* Surname input */}
                <input
                    required
                    type="text"
                    style={inputStyleStretch}
                    placeholder="Surname [Required]"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                </div>
        
                {/* Address inputs */}
                <h3 style={{ ...labelStyle, padding: "3px" }}>Address:</h3>
                <div style={{ paddingBottom: "20px"}}>
        
                {/* Address line 1 input */}
                <input
                    type="text"
                    style={inputStyleStretch}
                    placeholder="Address line 1 [Optional]"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                />
        
                {/* Address line 2 */}
                <input
                    type="text"
                    style={inputStyleStretch}
                    placeholder="Address line 2 [Optional]"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                />
        
                {/* Town/City input */}
                <input
                    type="text"
                    style={inputStyleStretch}
                    placeholder="Town/City [Optional]"
                    value={townOrCity}
                    onChange={(e) => setTownOrCity(e.target.value)}
                />
        
                {/* Region input */}
                <input
                    type="text"
                    style={inputStyleStretch}
                    placeholder="Region [Optional]"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
        
                {/* Postcode input */}
                <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={postcode}
                    style={{...inputStyleStretch, border: `2px solid ${getBorderColor(postcodeValid)}`}}
                    placeholder="Postcode [Optional]"
                    onChange={(e) => handlePostcodeChange(e.target.value)}
                />
                </div>
        
                {/* Contact inputs */}
                <h3 style={{ ...labelStyle, padding: "3px" }}>Contact:</h3>
                <div style={{ paddingBottom: "20px"}}>
        
                {/* Mobile input */}
                <input
                    type="tel"
                    style={{...inputStyleStretch, border: `2px solid ${getBorderColor(mobileValid)}`}}
                    placeholder="Phone [Optional]"
                    value={mobile}
                    onChange={(e) => handleMobileChange(e.target.value)}
                />
        
                {/* Email input */}
                <input
                    type="email"
                    title="Enter a valid email address"
                    style={{...inputStyleStretch, border: `2px solid ${getBorderColor(emailValid)}`}}
                    placeholder="Email [Optional]"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                />
                </div>
        
                {/* Notes input */}
                <h3 style={{ ...labelStyle, padding: "3px" }}>Notes:</h3>
                <div style={{ marginBottom: "30px"}}>
                <textarea
                    style={{ ...inputStyleStretch, minHeight: "200px", maxHeight: "500px" }}
                    placeholder=""
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                </div>
        
                {/* Buttons */}
                <p>
                {/* Update/Submit button */}
                <button
                    type="submit"
                    style={{ ...primaryButton, marginBottom: "10px", width: "100%" }}
                >
                    {editingCustomer ? "Update" : "Submit"}
                </button>
                </p>
        
                <p>
                {/* Cancel/Reset button */}
                <button
                    type="button"
                    style={{ ...dangerButton, marginBottom: "10px", width: "100%" }}
                    onClick={(e) => {e.stopPropagation(); {editingCustomer ? handleCancel() : handleReset()}}}
                >
                    {editingCustomer ? "Cancel" : "Reset"}
                </button>
                </p>
            </form>
        </div>
    );
}