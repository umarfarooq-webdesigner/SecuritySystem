import React, { useState } from "react";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdCreditCard,
  MdAppRegistration,
} from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { motion } from "framer-motion";
import "./GuestRegistrationForm.css";

const GuestRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    email: "",
    phone: "",
    idType: "cnic",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (!formData.name.trim()) {
      err.name = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
      err.name = "Name must contain only alphabets";
    } else if (formData.name.length < 4 || formData.name.length > 15) {
      err.name = "Name must be 4-15 characters";
    }

    if (formData.idType === "cnic") {
      if (!formData.cnic.match(/^\d{5}-\d{7}-\d{1}$/)) {
        err.cnic = "CNIC must be in the format 35202-8021227-7";
      }
    } else if (formData.idType === "passport") {
      if (!formData.cnic.match(/^[A-Z]{2}[0-9]{7}$/)) {
        err.cnic = "Passport must be in format AB1234567";
      }
    }

    if (
      !formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ) {
      err.email = "Invalid email";
    }

    if (!formData.phone || !formData.phone.match(/^\+\d{10,15}$/)) {
      err.phone = "Phone must be a valid international number";
    }

    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Filter non-letter characters for name
    if (name === "name") {
      const filtered = value.replace(/[^a-zA-Z ]/g, "");
      setFormData({ ...formData, [name]: filtered });
    } 
    // ✅ Prevent letters if CNIC selected
    else if (name === "cnic" && formData.idType === "cnic") {
      const filtered = value.replace(/[^0-9-]/g, "");
      setFormData({ ...formData, [name]: filtered });
    } 
    else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const err = validate();
  if (Object.keys(err).length > 0) {
    setErrors(err);
  } else {
    try {
      const response = await fetch("http://localhost:5001/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          name: "",
          cnic: "",
          email: "",
          phone: "",
          idType: "cnic",
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="registration-form-container"
    >
      <h2 className="registration-form-title">
        <MdAppRegistration className="registration-form-icon" /> Guest Registration
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="registration-form-group">
          <label>
            <MdPerson className="registration-form-icon" /> Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="registration-form-input"
          />
          {errors.name && <p className="registration-form-error">{errors.name}</p>}
        </div>

        {/* CNIC / Passport toggle */}
        <div className="registration-form-group">
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <label>
              <input
                type="radio"
                name="idType"
                value="cnic"
                checked={formData.idType === "cnic"}
                onChange={(e) =>
                  setFormData({ ...formData, idType: e.target.value, cnic: "" })
                }
              />{" "}
              CNIC
            </label>
            <label>
              <input
                type="radio"
                name="idType"
                value="passport"
                checked={formData.idType === "passport"}
                onChange={(e) =>
                  setFormData({ ...formData, idType: e.target.value, cnic: "" })
                }
              />{" "}
              Passport
            </label>
          </div>
        </div>

        {/* CNIC/Passport input */}
        <div className="registration-form-group">
          <label>
            <MdCreditCard className="registration-form-icon" />{" "}
            {formData.idType === "passport" ? "Passport Number" : "CNIC"}:
          </label>
          <input
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            className="registration-form-input"
            placeholder={
              formData.idType === "passport" ? "e.g., AB1234567" : "35202-8021227-7"
            }
            required
          />
          {errors.cnic && <p className="registration-form-error">{errors.cnic}</p>}
        </div>

        {/* Email */}
        <div className="registration-form-group">
          <label>
            <MdEmail className="registration-form-icon" /> Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="registration-form-input"
          />
          {errors.email && <p className="registration-form-error">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="registration-form-group">
          <label>
            <MdPhone className="registration-form-icon" /> Phone:
          </label>
          <PhoneInput
            defaultCountry="PK"
            international
            value={formData.phone}
            onChange={(value) =>
              setFormData({ ...formData, phone: value || "" })
            }
            className="registration-form-input phone-input"
          />
          {errors.phone && <p className="registration-form-error">{errors.phone}</p>}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="registration-form-button"
        >
          <MdAppRegistration className="registration-form-icon" /> Register
        </motion.button>
      </form>
    </motion.div>
  );
};

export default GuestRegistrationForm;
