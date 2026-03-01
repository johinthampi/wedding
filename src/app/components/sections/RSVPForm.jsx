"use client";
import { useState } from "react";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "",
    guests: "1",
    customGuests: "",
    meal: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name.trim());
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,5}[-\s.]?[0-9]{1,5}$/;
    return phoneRegex.test(phone.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  
    // Special handling for guests selection
    if (name === "guests") {
      setFormData((prev) => ({ 
        ...prev, 
        guests: value, 
        customGuests: value === "custom" ? "" : prev.customGuests 
      }));
    } else {
      // For all other fields, just update the value
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Validate attendance
    if (!formData.attendance) {
      newErrors.attendance = "Please select your attendance";
    }

    // If attending, validate guests and meal
    if (formData.attendance === "joyfully_accepts") {
      // Validate guests
      if (formData.guests === "custom") {
        const customGuestsNum = parseInt(formData.customGuests);
        if (!formData.customGuests || isNaN(customGuestsNum) || customGuestsNum < 1) {
          newErrors.customGuests = "Please enter a valid number of guests (minimum 1)";
        } else if (customGuestsNum > 20) {
          newErrors.customGuests = "For groups larger than 20, please contact us directly";
        }
      } else {
        const guestsNum = parseInt(formData.guests);
        if (guestsNum < 1) {
          newErrors.guests = "Number of guests must be at least 1";
        }
      }

      // Validate meal preference
      if (!formData.meal) {
        newErrors.meal = "Please select a meal preference";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setLoading(true);

    // Prepare data for submission
    const submissionData = {
      ...formData,
      guests: formData.guests === "custom" ? formData.customGuests : formData.guests,
    };
  
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });
    
    setLoading(false);
    
    const result = await res.json();
    
    if (!res.ok) {
      alert(result.error);
      return;
    }
    
    setSubmitted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before showing confirmation
    if (!validateForm()) {
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Show confirmation modal
    setShowConfirmation(true);
  };

  const getGuestCount = () => {
    if (formData.attendance !== "joyfully_accepts") return "0";
    return formData.guests === "custom" ? formData.customGuests : formData.guests;
  };

  const getMealPreference = () => {
    if (!formData.meal) return "Not selected";
    const meals = {
      vegetarian: "Vegetarian",
      non_vegetarian: "Non-Vegetarian",
      vegan: "Vegan"
    };
    return meals[formData.meal] || formData.meal;
  };

  const getAttendanceText = () => {
    return formData.attendance === "joyfully_accepts" 
      ? "✅ Joyfully Accepts" 
      : "❌ Regretfully Declines";
  };


  return (
    <>
      <style>{`
     *,
*::before,
*::after {
  box-sizing: border-box;
}
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');

  .rsvp-section {
    background: radial-gradient(ellipse at 50% 0%, #F7F0DC 0%, #FDFAF3 50%, #F0E8D0 100%);
    padding: 90px 20px 110px;
    font-family: 'Cormorant Garamond', serif;
    position: relative;
    overflow: hidden;
  }

  .rsvp-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.5;
  }

  /* ── Header ── */
  .rsvp-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .rsvp-title {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(3.5rem, 8vw, 6rem);
    background: linear-gradient(135deg, #8B6914 0%, #C9A84C 30%, #F5E6B8 50%, #C9A84C 70%, #8B6914 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: shimmer 4s ease-in-out infinite;
    margin-bottom: 8px;
    filter: drop-shadow(0 2px 8px rgba(139,105,20,0.2));
    line-height: 1.2;
  }

  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .rsvp-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 14px;
  }
  .orn-line {
    height: 1px;
    width: 80px;
    background: linear-gradient(90deg, transparent, #C9A84C, transparent);
  }
  .orn-diamond {
    width: 7px;
    height: 7px;
    background: #C9A84C;
    transform: rotate(45deg);
  }

  .rsvp-subtitle {
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    letter-spacing: 0.35em;
    color: #8B6914;
    text-transform: uppercase;
  }

  /* ── Card ── */
  .rsvp-card-wrapper {
    position: relative;
    max-width: 680px;
    margin: 0 auto;
    padding: 24px;
  }

  .rsvp-card {
    position: relative;
    z-index: 2;
    background: linear-gradient(160deg, #FEFCF5 0%, #FAF3E0 40%, #FDF8ED 100%);
    border: 1px solid rgba(201,168,76,0.3);
    outline: 1px solid rgba(201,168,76,0.15);
    outline-offset: -10px;
    padding: 52px 48px 48px;
    box-shadow:
      0 8px 40px rgba(139,105,20,0.14),
      0 2px 10px rgba(201,168,76,0.1),
      inset 0 1px 0 rgba(255,255,255,0.9);
  }

  /* ── Form elements ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px 28px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  .form-group.full {
    grid-column: 1 / -1;
  }

  .form-label {
    font-family: 'Cinzel', serif;
    font-size: 0.68rem;
    letter-spacing: 0.25em;
    color: #8B6914;
    text-transform: uppercase;
  }
  
  .form-label.optional::after {
    content: " (optional)";
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    color: rgba(139,105,20,0.5);
    text-transform: lowercase;
    margin-left: 4px;
  }

  .form-input,
  .form-select,
  .form-textarea {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    color: #3D2B0E;
    background: rgba(255,255,255,0.65);
    border: none;
    border-bottom: 1px solid rgba(201,168,76,0.5);
    outline: none;
    padding: 10px 4px;
    width: 100%;
    transition: border-color 0.3s, background 0.3s;
    appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
  }

  .form-input.error,
  .form-select.error,
  .form-textarea.error {
    border-bottom-color: #B22222;
  }

  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    border-bottom-color: #C9A84C;
    background: rgba(245,230,184,0.18);
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: rgba(107,79,30,0.35);
    font-style: italic;
  }

  .form-textarea {
    resize: vertical;
    min-height: 90px;
    border: 1px solid rgba(201,168,76,0.35);
    padding: 12px;
    background: rgba(255,255,255,0.5);
  }

  .form-textarea:focus {
    border-color: #C9A84C;
  }

  .error-message {
    color: #B22222;
    font-size: 0.75rem;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    margin-top: 4px;
  }

  /* Custom select arrow */
  .select-wrapper {
    position: relative;
  }
  .select-wrapper::after {
    content: '◆';
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    color: #C9A84C;
    font-size: 0.5rem;
    pointer-events: none;
  }

  /* Attendance radio pills */
  .radio-group {
    display: flex;
    gap: 14px;
  }

  .radio-label {
    flex: 1;
    cursor: pointer;
  }

  .radio-label input {
    display: none;
  }

  .radio-pill {
    display: block;
    text-align: center;
    padding: 11px 10px;
    border: 1px solid rgba(201,168,76,0.4);
    background: rgba(255,255,255,0.5);
    font-family: 'Cinzel', serif;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    color: #8B6914;
    text-transform: uppercase;
    transition: all 0.25s ease;
    cursor: pointer;
  }

  .radio-label input:checked + .radio-pill {
    background: linear-gradient(135deg, #8B6914, #C9A84C, #F0D478, #C9A84C, #8B6914);
    background-size: 200% 100%;
    color: #FDFAF3;
    border-color: transparent;
    box-shadow: 0 2px 12px rgba(139,105,20,0.25);
    animation: shimmer 3s ease-in-out infinite;
  }

  .radio-pill:hover {
    border-color: #C9A84C;
    background: rgba(201,168,76,0.08);
  }

  /* Section divider inside form */
  .form-divider {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 4px 0;
  }
  .form-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
  }
  .form-divider-text {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    color: rgba(139,105,20,0.6);
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* Custom guests input */
  .custom-guests-input {
    margin-top: 12px;
  }

  /* Submit button */
  .submit-wrapper {
    grid-column: 1 / -1;
    text-align: center;
    margin-top: 10px;
  }

  .submit-btn {
    font-family: 'Cinzel', serif;
    font-size: 0.78rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #FDFAF3;
    background: linear-gradient(135deg, #8B6914 0%, #C9A84C 35%, #F0D478 50%, #C9A84C 65%, #8B6914 100%);
    background-size: 200% 100%;
    border: none;
    padding: 16px 56px;
    cursor: pointer;
    position: relative;
    transition: background-position 0.5s ease, transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 4px 20px rgba(139,105,20,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .submit-btn:hover:not(:disabled) {
    background-position: 100% 0;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(139,105,20,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .submit-btn:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  /* Corner accents on card */
  .card-corner {
    position: absolute;
    width: 22px;
    height: 22px;
  }
  .card-corner.tl { top: 12px; left: 12px; border-top: 1.5px solid rgba(201,168,76,0.55); border-left: 1.5px solid rgba(201,168,76,0.55); }
  .card-corner.tr { top: 12px; right: 12px; border-top: 1.5px solid rgba(201,168,76,0.55); border-right: 1.5px solid rgba(201,168,76,0.55); }
  .card-corner.bl { bottom: 12px; left: 12px; border-bottom: 1.5px solid rgba(201,168,76,0.55); border-left: 1.5px solid rgba(201,168,76,0.55); }
  .card-corner.br { bottom: 12px; right: 12px; border-bottom: 1.5px solid rgba(201,168,76,0.55); border-right: 1.5px solid rgba(201,168,76,0.55); }

  /* ── Success state ── */
  .success-state {
    text-align: center;
    padding: 40px 20px;
    animation: fadeIn 0.6s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .success-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 24px;
    color: #C9A84C;
  }

  .success-title {
    font-family: 'Great Vibes', cursive;
    font-size: 3rem;
    background: linear-gradient(135deg, #8B6914, #C9A84C, #F5E6B8, #C9A84C, #8B6914);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
  }

  .success-text {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: #6B4F1E;
    line-height: 1.8;
  }

  /* Required field indicator */
  .required-indicator {
    color: #C9A84C;
    margin-left: 2px;
  }

  /* Loading spinner */
  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Modal styles (your existing modal styles) */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(3px);
    animation: fadeIn 0.3s ease;
  }

  .confirmation-modal {
    background: linear-gradient(160deg, #FEFCF5 0%, #FAF3E0 40%, #FDF8ED 100%);
    border: 1px solid rgba(201,168,76,0.3);
    padding: 40px;
    max-width: 500px;
    width: 90%;
    position: relative;
    box-shadow: 0 20px 60px rgba(139,105,20,0.3);
    animation: slideUp 0.4s ease;
  }

  .modal-corner {
    position: absolute;
    width: 30px;
    height: 30px;
  }
  .modal-corner.tl { top: 10px; left: 10px; border-top: 2px solid #C9A84C; border-left: 2px solid #C9A84C; }
  .modal-corner.tr { top: 10px; right: 10px; border-top: 2px solid #C9A84C; border-right: 2px solid #C9A84C; }
  .modal-corner.bl { bottom: 10px; left: 10px; border-bottom: 2px solid #C9A84C; border-left: 2px solid #C9A84C; }
  .modal-corner.br { bottom: 10px; right: 10px; border-bottom: 2px solid #C9A84C; border-right: 2px solid #C9A84C; }

  .modal-title {
    font-family: 'Great Vibes', cursive;
    font-size: 2.5rem;
    color: #8B6914;
    text-align: center;
    margin-bottom: 20px;
  }

  .modal-subtitle {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(139,105,20,0.7);
    text-align: center;
    margin-bottom: 30px;
    text-transform: uppercase;
  }

  .summary-item {
    display: flex;
    margin-bottom: 16px;
    border-bottom: 1px dashed rgba(201,168,76,0.3);
    padding-bottom: 8px;
  }

  .summary-label {
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: #8B6914;
    width: 120px;
    text-transform: uppercase;
  }

  .summary-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    color: #3D2B0E;
    flex: 1;
  }

  .summary-value.empty {
    font-style: italic;
    color: rgba(107,79,30,0.5);
  }

  .modal-actions {
    display: flex;
    gap: 16px;
    margin-top: 30px;
  }

  .modal-btn {
    flex: 1;
    padding: 14px;
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .modal-btn.confirm {
    background: linear-gradient(135deg, #8B6914, #C9A84C);
    color: #FDFAF3;
    box-shadow: 0 4px 15px rgba(139,105,20,0.3);
  }

  .modal-btn.confirm:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139,105,20,0.4);
  }

  .modal-btn.edit {
    background: transparent;
    border: 1px solid #C9A84C;
    color: #8B6914;
  }

  .modal-btn.edit:hover {
    background: rgba(201,168,76,0.1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .edit-hint {
    font-size: 0.65rem;
    color: rgba(139,105,20,0.4);
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    margin-top: 2px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .form-group:hover .edit-hint {
    opacity: 1;
  }

@media (max-width: 640px) {
  .rsvp-section {
    padding: 70px 16px 90px;
  }

  .rsvp-card-wrapper {
    padding: 12px;
  }

  .rsvp-card {
    padding: 32px 18px 28px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .radio-group {
    flex-direction: column;
  }

  .submit-btn {
    width: 100%;
    padding: 16px;
  }
}

@media (max-width: 640px) {

  .modal-overlay {
    align-items: flex-start;
    padding: 20px 12px;
    overflow-y: auto;
  }

  .confirmation-modal {
    width: 100%;
    max-width: 100%;
    padding: 28px 20px;
    margin: 40px 0;
  }

  .modal-title {
    font-size: 2rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-btn {
    width: 100%;
  }

  .summary-item {
    flex-direction: column;
    gap: 4px;
  }

  .summary-label {
    width: 100%;
    font-size: 0.65rem;
  }

  .summary-value {
    font-size: 1rem;
  }
}

/* Radio error glow */
.radio-group.error .radio-pill {
  border: 1px solid #B22222;
  background: rgba(178, 34, 34, 0.05);
  box-shadow: 0 0 0 1px rgba(178, 34, 34, 0.4),
              0 0 10px rgba(178, 34, 34, 0.25);
  animation: errorPulse 1.2s ease-in-out infinite;
}

/* Subtle pulse animation */
@keyframes errorPulse {
  0%, 100% {
    box-shadow: 0 0 0 1px rgba(178, 34, 34, 0.4),
                0 0 10px rgba(178, 34, 34, 0.25);
  }
  50% {
    box-shadow: 0 0 0 2px rgba(178, 34, 34, 0.6),
                0 0 18px rgba(178, 34, 34, 0.35);
  }
}
`}</style>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="confirmation-modal" onClick={e => e.stopPropagation()}>
            <span className="modal-corner tl" />
            <span className="modal-corner tr" />
            <span className="modal-corner bl" />
            <span className="modal-corner br" />
            
            <h3 className="modal-title">Please Confirm</h3>
            <p className="modal-subtitle">Review your details before submitting</p>

            <div className="summary-item">
              <span className="summary-label">Full Name</span>
              <span className="summary-value">{formData.name}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Email</span>
              <span className={`summary-value ${!formData.email ? 'empty' : ''}`}>
                {formData.email || "Not provided"}
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Phone</span>
              <span className="summary-value">{formData.phone}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Attendance</span>
              <span className="summary-value">{getAttendanceText()}</span>
            </div>

            {formData.attendance === "joyfully_accepts" && (
              <>
                <div className="summary-item">
                  <span className="summary-label">Number of Guests</span>
                  <span className="summary-value">{getGuestCount()}</span>
                </div>

                <div className="summary-item">
                  <span className="summary-label">Meal Preference</span>
                  <span className="summary-value">{getMealPreference()}</span>
                </div>
              </>
            )}

            <div className="summary-item">
              <span className="summary-label">Message</span>
              <span className={`summary-value ${!formData.message ? 'empty' : ''}`}>
                {formData.message || "No message"}
              </span>
            </div>

            <div className="modal-actions">
              <button className="modal-btn edit" onClick={() => setShowConfirmation(false)}>
                Edit Details
              </button>
              <button className="modal-btn confirm" onClick={handleConfirmSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}


      <section id="rsvp" className="rsvp-section">
        {/* Header */}
        <div className="rsvp-header">
          <h2 className="rsvp-title">RSVP</h2>
          <div className="rsvp-ornament">
            <div className="orn-line" />
            <div className="orn-diamond" />
            <div className="orn-line" />
          </div>
          <p className="rsvp-subtitle">Kindly reply by April 20, 2026</p>
        </div>

        {/* Card with frame */}
        <div className="rsvp-card-wrapper">
          <div className="rsvp-card">
            <span className="card-corner tl" />
            <span className="card-corner tr" />
            <span className="card-corner bl" />
            <span className="card-corner br" />

            {submitted ? (
              <div className="success-state">
                <svg className="success-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="32" cy="32" r="28" />
                  <polyline points="20 34 28 42 46 24" />
                </svg>
                <p className="success-title">Thank You!</p>
                <p className="success-text">
                  We are so delighted you will be joining us<br />
                  to celebrate our special day.<br />
                  We look forward to seeing you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  {/* Personal details - All required except email and message */}
                  <div className="form-group full">
  <label className="form-label">
    Full Name <span className="required-indicator">*</span>
  </label>
  <input
    className={`form-input ${errors.name ? 'error' : ''}`}
    type="text"
    name="name"
    required
    placeholder="Your full name"
    value={formData.name}
    onChange={handleChange}
  />
  <div className="edit-hint">Double-check spelling</div> {/* Add this */}
  {errors.name && <div className="error-message">{errors.name}</div>}
</div>

                  <div className="form-group">
                    <label className="form-label optional">
                      Email Address
                    </label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required-indicator">*</span>
                    </label>
                    <input
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                  </div>

                  {/* Divider */}
                  <div className="form-divider">
                    <div className="form-divider-line" />
                    <span className="form-divider-text">Attendance</span>
                    <div className="form-divider-line" />
                  </div>

                  {/* Attendance - Required */}
                  <div className="form-group full">
                    <label className="form-label">
                      Will you be attending? <span className="required-indicator">*</span>
                    </label>
                    <div className={`radio-group ${errors.attendance ? "error" : ""}`}>
                      {[
                        { val: "joyfully_accepts", label: "Joyfully Accepts" },
                        { val: "declines",          label: "Respectfully Declines" },
                      ].map(({ val, label }) => (
                        <label className="radio-label" key={val}>
                          <input
                            type="radio"
                            name="attendance"
                            value={val}
                            required
                            checked={formData.attendance === val}
                            onChange={handleChange}
                          />
                          <span className="radio-pill">{label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.attendance && <div className="error-message">{errors.attendance}</div>}
                  </div>

                  {formData.attendance === "joyfully_accepts" && (
                    <>
                      <div className="form-group">
                        <label className="form-label">
                          Number of Guests <span className="required-indicator">*</span>
                        </label>
                        <div className="select-wrapper">
                          <select
                            className={`form-select ${errors.guests || errors.customGuests ? 'error' : ''}`}
                            name="guests"
                            required
                            value={formData.guests}
                            onChange={handleChange}
                          >
                            {[1,2,3,4,5,6].map(n => (
                              <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                            ))}
                            <option value="custom">More than 6 guests</option>
                          </select>
                        </div>
                        {errors.guests && <div className="error-message">{errors.guests}</div>}
                        
                        {/* Custom guests input */}
                        {formData.guests === "custom" && (
                          <div className="custom-guests-input">
                            <input
                              className={`form-input ${errors.customGuests ? 'error' : ''}`}
                              type="number"
                              name="customGuests"
                              placeholder="Enter number of guests"
                              min="1"
                              max="20"
                              value={formData.customGuests}
                              onChange={handleChange}
                            />
                            {errors.customGuests && <div className="error-message">{errors.customGuests}</div>}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Meal Preference <span className="required-indicator">*</span>
                        </label>
                        <div className="select-wrapper">
                          <select
                            className={`form-select ${errors.meal ? 'error' : ''}`}
                            name="meal"
                            required
                            value={formData.meal}
                            onChange={handleChange}
                          >
                            <option value="">Select preference</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="non_vegetarian">Non-Vegetarian</option>
                            <option value="vegan">Vegan</option>
                          </select>
                        </div>
                        {errors.meal && <div className="error-message">{errors.meal}</div>}
                      </div>
                    </>
                  )}

                  {/* Divider */}
                  <div className="form-divider">
                    <div className="form-divider-line" />
                    <span className="form-divider-text">A Note for the Couple</span>
                    <div className="form-divider-line" />
                  </div>

                  {/* Message - Optional with live typing */}
                  <div className="form-group full">
                    <label className="form-label optional">
                      Message
                    </label>
                    <textarea
                      className="form-textarea"
                      name="message"
                      placeholder="Share your wishes, blessings, or a favourite memory…"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    {formData.message && (
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#8B6914',
                        fontFamily: 'Cormorant Garamond',
                        fontStyle: 'italic',
                        textAlign: 'right',
                        marginTop: '4px'
                      }}>
                        {formData.message.length} characters
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="submit-wrapper">
                  <button
  type="submit"
  className="submit-btn"
  disabled={loading}
>
  {loading && <span className="spinner" />}
  {loading ? "Sending..." : "Review & Submit"}
</button>
                  </div>

                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}