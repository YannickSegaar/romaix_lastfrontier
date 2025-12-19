// YRS: SNOWFALL EXTENSION VERSION 1 (27 OCT 2025)

// This extension is now designed to work with the Snowify library.
export const SnowfallExtension1 = {
  name: 'Snowfall',
  type: 'effect',
  
  // Match the exact Custom Action name from Voiceflow
  match: ({ trace }) => trace.type === 'ext_snowfall1',
  
  effect: ({ trace }) => {
    console.log('Snowfall extension triggered!', trace);
    
    // Wait for library to be available
    if (typeof initSnowify === 'undefined') {
      console.error('Snowify library not loaded yet, retrying...');
      setTimeout(() => {
        if (typeof initSnowify !== 'undefined') {
          executeSnowfall(trace);
        } else {
          console.error('Snowify library failed to load');
        }
      }, 1000);
      return;
    }
    
    executeSnowfall(trace);
  }
};

function executeSnowfall(trace) {
  const action = trace.payload?.action || 'start'; // Default to start
  
  if (action === 'start') {
    console.log('Starting Snowify effect... ❄️');
    const options = trace.payload?.options || {};
    initSnowify(options);
  } else if (action === 'stop') {
    console.log('Stopping Snowify effect...');
    const snowCanvas = document.getElementById('snow-canvas');
    if (snowCanvas) {
      snowCanvas.remove();
    }
  }
}

// YRS: PULSE SNOWSPORTS LEAD CAPTURE FORM EXTENSION VERSION 1 (27 OCT 2025)

export const PulseSnowsportsLeadForm1 = {
  name: 'PulseSnowsportsLeadForm1',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_pulseSnowsportsLeadForm1' || trace.payload?.name === 'ext_pulseSnowsportsLeadForm1',
  render: ({ trace, element }) => {
    // --- Configuration from Voiceflow Payload ---
    const {
      formTitle = 'Book Your Ski Lesson Today!',
      formSubtitle = 'Expert instruction in Verbier, Morzine & Manchester',
      height = '720',
      backgroundColor = '#FFFFFF',
      maxWidth = '460px',
      primaryColor = '#031e6c',
      secondaryColor = '#031e6c',
      accentColor = '#FFFFFF',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      blueAccent = '#E8F4F8',
      greenAccent = '#F0F8E8',
      borderWidth = '1px',
      borderStyle = 'solid',
      borderRadius = '16px',
      shadowColor = 'rgba(3, 30, 108, 0.25)',
      shadowSize = '12px',
      animateIn = true,
      logoUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/PulseSnowsports_Logo_FullName.png',
      showLogo = true,
      lessonIconUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/SkiWithEase_SkiLesson.svg',
      conversationHistory = null,
      conversationSummary = '',
      conversationId = null,
      userId = null,
    } = trace.payload || {};

    const N8N_WEBHOOK_URL = 'https://n8n.romaix-n8n.xyz/webhook-test/b9aaee97-42c6-4568-aefe-7f7e396bdd0f';

    let currentStep = 'form';
    let isSubmitting = false;

    element.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: center; align-items: flex-start; background-color: transparent; margin: 0; padding: 8px 0;';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'pulse-snowsports-lead-form-wrapper';
    wrapper.style.cssText = `
      width: ${maxWidth}; min-width: ${maxWidth}; max-width: ${maxWidth};
      border: ${borderWidth} ${borderStyle} ${borderColor}; border-radius: ${borderRadius};
      overflow: hidden; background: ${backgroundColor};
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px ${shadowSize} ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.1);
      height: ${height}px; display: flex; flex-direction: column; margin: 0 auto; position: relative;
    `;
    
    if (animateIn) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(15px) scale(0.98)';
      wrapper.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    wrapper.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .pulse-snowsports-lead-form-wrapper * { box-sizing: border-box; }
        
        .form-header { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          color: white; 
          padding: 22px 28px; 
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .form-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        .logo-container { 
          margin-bottom: 10px; 
          position: relative;
          z-index: 1;
        }
        .logo-container img { 
          max-height: 40px; 
          max-width: 180px; 
          object-fit: contain;
        }
        .form-header h2 { 
          margin: 0 0 6px 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 20px; 
          font-weight: 700; 
          letter-spacing: -0.3px;
          position: relative;
          z-index: 1;
        }
        .form-header p { 
          margin: 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 13px; 
          opacity: 0.95; 
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }
        
        .form-content { 
          flex: 1; 
          padding: 24px 28px 20px 28px; 
          font-family: 'Inter', sans-serif; 
          background: ${backgroundColor};
          overflow-y: auto;
        }
        
        .form-step { 
          display: none; 
          animation: fadeInUp 0.3s ease-out;
        }
        .form-step.active { 
          display: block; 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(12px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        .form-group { 
          margin-bottom: 18px; 
          position: relative; 
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group label { 
          display: block; 
          margin-bottom: 7px; 
          font-weight: 600; 
          color: ${textColor}; 
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .form-group input, .form-group select, .form-group textarea { 
          width: 100%; 
          padding: 12px 14px; 
          border-radius: 10px; 
          border: 1.5px solid ${borderColor}; 
          font-size: 14px; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .form-group textarea {
          min-height: 100px;
          resize: vertical;
          line-height: 1.5;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { 
          color: #94A3B8; 
          font-size: 13px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: ${primaryColor}; 
          box-shadow: 0 0 0 3px rgba(3, 30, 108, 0.15);
          background: ${accentColor};
          transform: translateY(-1px);
        }
        
        /* Date Input Styling */
        .form-group input[type="date"] {
          cursor: pointer;
          position: relative;
        }
        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
        
        /* Lesson Type with Icon */
        .lesson-option {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lesson-icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
          flex-shrink: 0;
        }
        
        .checkbox-group { 
          display: flex; 
          align-items: flex-start; 
          margin: 14px 0 0 0; 
          gap: 10px;
        }
        .checkbox-wrapper {
          position: relative;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .checkbox-wrapper input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid ${borderColor};
          border-radius: 4px;
          background: ${accentColor};
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .checkbox-wrapper input[type="checkbox"]:checked {
          background: ${secondaryColor};
          border-color: ${secondaryColor};
          transform: scale(1.05);
        }
        .checkbox-wrapper input[type="checkbox"]:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .checkbox-group label { 
          margin-bottom: 0; 
          text-transform: none; 
          letter-spacing: 0; 
          font-weight: 400; 
          font-size: 12px; 
          line-height: 1.5; 
          cursor: pointer;
          color: #64748B;
        }
        .checkbox-group label a {
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 500;
        }
        .checkbox-group label a:hover {
          text-decoration: underline;
        }
        
        /* Select Dropdown Styling */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
          cursor: pointer;
        }
        
        .error-message { 
          color: #EF4444; 
          background: #FEE2E2; 
          padding: 10px 14px; 
          border-radius: 8px; 
          font-size: 12px; 
          margin-top: 12px;
          font-weight: 500;
        }
        
        .loading-container { 
          text-align: center; 
          padding: 60px 20px; 
        }
        .spinner { 
          margin: 0 auto 20px; 
          width: 50px; 
          height: 50px; 
          border: 4px solid ${lightGray}; 
          border-top-color: ${primaryColor}; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        .loading-text { 
          font-size: 16px; 
          color: ${textColor}; 
          font-weight: 500;
        }
        
        .success-container { 
          text-align: center; 
          padding: 50px 28px; 
        }
        .success-icon { 
          width: 70px; 
          height: 70px; 
          margin: 0 auto 20px; 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 20px rgba(3, 30, 108, 0.3);
        }
        .success-icon svg { 
          width: 38px; 
          height: 38px; 
          color: white; 
        }
        .success-title { 
          font-size: 22px; 
          font-weight: 700; 
          color: ${textColor}; 
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }
        .success-message { 
          font-size: 14px; 
          color: #64748B; 
          line-height: 1.6; 
          margin: 0;
        }
        
        .btn-container { 
          padding: 0 28px 24px 28px; 
          background: ${backgroundColor};
          position: relative;
        }
        .btn { 
          width: 100%; 
          padding: 14px 24px; 
          border: none; 
          border-radius: 10px; 
          font-size: 15px; 
          font-weight: 600; 
          cursor: pointer; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }
        .btn-primary { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          color: white;
          box-shadow: 0 4px 12px rgba(3, 30, 108, 0.3);
        }
        .btn-primary:hover { 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(3, 30, 108, 0.4);
        }
        .btn-primary:active { 
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(3, 30, 108, 0.3);
        }
        
        /* Scrollbar Styling */
        .form-content::-webkit-scrollbar {
          width: 6px;
        }
        .form-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>
      
      <div class="form-header">
        ${showLogo ? `
          <div class="logo-container">
            <img src="${logoUrl}" alt="Pulse Snowsports" />
          </div>
        ` : ''}
        <h2>${formTitle}</h2>
        <p>${formSubtitle}</p>
      </div>
      
      <div class="form-content">
        <div id="form-step" class="form-step active">
          <form id="lead-form">
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name *</label>
                <input type="text" id="first-name" name="firstName" placeholder="John" required>
              </div>
              
              <div class="form-group">
                <label for="last-name">Last Name *</label>
                <input type="text" id="last-name" name="lastName" placeholder="Smith" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" placeholder="john.smith@example.com" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" placeholder="+44 7700 900000" required>
            </div>
            
            <div class="form-group">
              <label for="ski-school">Ski School *</label>
              <select id="ski-school" name="skiSchool" required>
                <option value="">Select a ski school</option>
                <option value="Verbier">Verbier</option>
                <option value="Morzine">Morzine</option>
                <option value="Manchester">Manchester</option>
              </select>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="arrival-date">Arrival Date *</label>
                <input type="date" id="arrival-date" name="arrivalDate" required>
              </div>
              
              <div class="form-group">
                <label for="departure-date">Departure Date *</label>
                <input type="date" id="departure-date" name="departureDate" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="experience-level">Experience Level *</label>
              <select id="experience-level" name="experienceLevel" required>
                <option value="">Select your experience</option>
                <option value="beginner">Beginner - Never skied before</option>
                <option value="intermediate">Intermediate - Can turn and stop</option>
                <option value="advanced">Advanced - Comfortable on black runs</option>
                <option value="expert">Expert - All terrain & conditions</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="lesson-type">Lesson Type *</label>
              <select id="lesson-type" name="lessonType" required>
                <option value="">Select lesson type</option>
                <option value="private">Private Lesson</option>
                <option value="group">Group Lesson</option>
                <option value="family">Family Lesson</option>
                <option value="kids">Kids Lesson</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Additional Information</label>
              <textarea id="message" name="message" placeholder="Tell us about your goals, any specific requirements, or questions you have..."></textarea>
            </div>

            
            <div class="checkbox-group">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="privacy-consent" name="privacyConsent" required>
              </div>
              <label for="privacy-consent">
                I want personalized lesson recommendations and agree to the <a href="https://pulsesnowsports.com/privacy-policy" target="_blank">Privacy Policy</a>.
              </label>
            </div>
            
            <div id="error-container"></div>
          </form>
        </div>
        
        <div id="loading-step" class="form-step">
          <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">Preparing your ski adventure...</div>
          </div>
        </div>
        
        <div id="success-step" class="form-step">
          <div class="success-container">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="success-title">Ready to Hit the Slopes!</h3>
            <p class="success-message">
              Thank you! Our experienced ski instructors will contact you within 24 hours with personalized lesson options. See you on the mountain!
            </p>
          </div>
        </div>
      </div>

      <div class="btn-container">
        <button id="submit-btn" class="btn btn-primary">Get My Lesson Plan</button>
      </div>
    `;

    container.appendChild(wrapper);
    element.appendChild(container);

    if (animateIn) {
      setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }

    // Set minimum dates for date pickers
    const today = new Date().toISOString().split('T')[0];
    const arrivalInput = wrapper.querySelector('#arrival-date');
    const departureInput = wrapper.querySelector('#departure-date');
    
    if (arrivalInput) {
      arrivalInput.setAttribute('min', today);
      arrivalInput.addEventListener('change', (e) => {
        if (departureInput) {
          departureInput.setAttribute('min', e.target.value);
        }
      });
    }

    function showStep(stepId) {
      const steps = wrapper.querySelectorAll('.form-step');
      steps.forEach(step => step.classList.remove('active'));
      
      const targetStep = wrapper.querySelector(`#${stepId}-step`);
      if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepId;
        
        const btnContainer = wrapper.querySelector('.btn-container');
        btnContainer.style.display = (stepId === 'form') ? 'block' : 'none';
      }
    }

    function showError(message) {
      const errorContainer = wrapper.querySelector('#error-container');
      errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    function clearError() {
      const errorContainer = wrapper.querySelector('#error-container');
      errorContainer.innerHTML = '';
    }

    function validateForm() {
      const form = wrapper.querySelector('#lead-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = borderColor;
        }
      });
      
      const emailField = wrapper.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value && !emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
      }

      // Validate date order
      const arrivalDate = wrapper.querySelector('#arrival-date').value;
      const departureDate = wrapper.querySelector('#departure-date').value;
      if (arrivalDate && departureDate && new Date(departureDate) <= new Date(arrivalDate)) {
        isValid = false;
        wrapper.querySelector('#departure-date').style.borderColor = '#EF4444';
        showError('Departure date must be after arrival date.');
      }
      
      return isValid;
    }

    async function sendToWebhook(formData) {
      try {
        let cleanConversationHistory = conversationHistory;
        if (conversationHistory && typeof conversationHistory === 'string') {
          cleanConversationHistory = conversationHistory
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/"/g, '\\"');
        }

        const payload = {
          lead: formData,
          conversationData: {
            history: cleanConversationHistory,
            conversationId: conversationId,
            userId: userId,
            timestamp: new Date().toISOString()
          },
          source: 'Voiceflow Lead Form - Pulse Snowsports',
          formType: 'Pulse Snowsports Ski Lesson Lead Capture',
          timestamp: new Date().toISOString()
        };

        console.log('Sending payload to webhook:', JSON.stringify(payload, null, 2));

        await new Promise(resolve => setTimeout(resolve, 1800));
        
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Successfully sent lead to webhook');
        return true;
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        return true;
      }
    }

    const submitBtn = wrapper.querySelector('#submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        clearError();
        
        if (!validateForm()) {
          showError('Please fill out all required fields correctly.');
          return;
        }
        
        isSubmitting = true;
        showStep('loading');
        
        const formData = {
          firstName: wrapper.querySelector('#first-name').value.trim(),
          lastName: wrapper.querySelector('#last-name').value.trim(),
          email: wrapper.querySelector('#email').value.trim(),
          phone: wrapper.querySelector('#phone').value.trim(),
          skiSchool: wrapper.querySelector('#ski-school').value,
          arrivalDate: wrapper.querySelector('#arrival-date').value,
          departureDate: wrapper.querySelector('#departure-date').value,
          experienceLevel: wrapper.querySelector('#experience-level').value,
          lessonType: wrapper.querySelector('#lesson-type').value,
          message: wrapper.querySelector('#message').value.trim()
        };
        
        const success = await sendToWebhook(formData);
        
        if (success) {
          showStep('success');
        } else {
          showStep('form');
          showError('Oops! Something went wrong. Please try again.');
        }
        
        isSubmitting = false;
      });
    }

    const inputs = wrapper.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = borderColor;
        }
      });
      
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
          input.style.borderColor = borderColor;
        }
      });
    });

    return function cleanup() {
      // Cleanup if needed
    };
  }
};


// YRS: PULSE SNOWSPORTS LEAD CAPTURE FORM EXTENSION VERSION 2 (27 OCT 2025)

export const PulseSnowsportsLeadForm2 = {
  name: 'PulseSnowsportsLeadForm2',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_pulseSnowsportsLeadForm2' || trace.payload?.name === 'ext_pulseSnowsportsLeadForm2',
  render: ({ trace, element }) => {
    // --- Configuration from Voiceflow Payload ---
    const {
      formTitle = 'Book Your Ski Lesson Today!',
      formSubtitle = 'Expert instruction in Verbier, Morzine & Manchester',
      height = '720',
      backgroundColor = '#FFFFFF',
      maxWidth = '460px',
      primaryColor = '#031e6c',
      secondaryColor = '#031e6c',
      accentColor = '#FFFFFF',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      blueAccent = '#E8F4F8',
      greenAccent = '#F0F8E8',
      borderWidth = '1px',
      borderStyle = 'solid',
      borderRadius = '16px',
      shadowColor = 'rgba(3, 30, 108, 0.25)',
      shadowSize = '12px',
      animateIn = true,
      logoUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/PulseSnowsports_Logo_FullName.png',
      showLogo = true,
      lessonIconUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/SkiWithEase_SkiLesson.svg',
      conversationHistory = null,
      conversationSummary = '',
      conversationId = null,
      userId = null,
    } = trace.payload || {};

    const N8N_WEBHOOK_URL = 'https://n8n.romaix-n8n.xyz/webhook/b9aaee97-42c6-4568-aefe-7f7e396bdd0f';

    let currentStep = 'form';
    let isSubmitting = false;

    element.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: center; align-items: flex-start; background-color: transparent; margin: 0; padding: 8px 0;';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'pulse-snowsports-lead-form-wrapper';
    wrapper.style.cssText = `
      width: ${maxWidth}; min-width: ${maxWidth}; max-width: ${maxWidth};
      border: ${borderWidth} ${borderStyle} ${borderColor}; border-radius: ${borderRadius};
      overflow: hidden; background: ${backgroundColor};
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px ${shadowSize} ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.1);
      height: ${height}px; display: flex; flex-direction: column; margin: 0 auto; position: relative;
    `;
    
    if (animateIn) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(15px) scale(0.98)';
      wrapper.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    wrapper.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .pulse-snowsports-lead-form-wrapper * { box-sizing: border-box; }
        
        .form-header { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          color: white; 
          padding: 22px 28px; 
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .form-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        .logo-container { 
          margin-bottom: 10px; 
          position: relative;
          z-index: 1;
        }
        .logo-container img { 
          max-height: 40px; 
          max-width: 180px; 
          object-fit: contain;
        }
        .form-header h2 { 
          margin: 0 0 6px 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 20px; 
          font-weight: 700; 
          letter-spacing: -0.3px;
          position: relative;
          z-index: 1;
        }
        .form-header p { 
          margin: 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 13px; 
          opacity: 0.95; 
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }
        
        .form-content { 
          flex: 1; 
          padding: 24px 28px 20px 28px; 
          font-family: 'Inter', sans-serif; 
          background: ${backgroundColor};
          overflow-y: auto;
        }
        
        .form-step { 
          display: none; 
          animation: fadeInUp 0.3s ease-out;
        }
        .form-step.active { 
          display: block; 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(12px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        .form-group { 
          margin-bottom: 18px; 
          position: relative; 
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group label { 
          display: block; 
          margin-bottom: 7px; 
          font-weight: 600; 
          color: ${textColor}; 
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .form-group input, .form-group select, .form-group textarea { 
          width: 100%; 
          padding: 12px 14px; 
          border-radius: 10px; 
          border: 1.5px solid ${borderColor}; 
          font-size: 14px; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .form-group textarea {
          min-height: 100px;
          resize: vertical;
          line-height: 1.5;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { 
          color: #94A3B8; 
          font-size: 13px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: ${primaryColor}; 
          box-shadow: 0 0 0 3px rgba(3, 30, 108, 0.15);
          background: ${accentColor};
          transform: translateY(-1px);
        }
        
        /* Date Input Styling */
        .form-group input[type="date"] {
          cursor: pointer;
          position: relative;
        }
        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
        
        /* Lesson Type with Icon */
        .lesson-option {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lesson-icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
          flex-shrink: 0;
        }
        
        .checkbox-group { 
          display: flex; 
          align-items: flex-start; 
          margin: 14px 0 0 0; 
          gap: 10px;
        }
        .checkbox-wrapper {
          position: relative;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .checkbox-wrapper input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid ${borderColor};
          border-radius: 4px;
          background: ${accentColor};
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .checkbox-wrapper input[type="checkbox"]:checked {
          background: ${secondaryColor};
          border-color: ${secondaryColor};
          transform: scale(1.05);
        }
        .checkbox-wrapper input[type="checkbox"]:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .checkbox-group label { 
          margin-bottom: 0; 
          text-transform: none; 
          letter-spacing: 0; 
          font-weight: 400; 
          font-size: 12px; 
          line-height: 1.5; 
          cursor: pointer;
          color: #64748B;
        }
        .checkbox-group label a {
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 500;
        }
        .checkbox-group label a:hover {
          text-decoration: underline;
        }
        
        /* Select Dropdown Styling */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
          cursor: pointer;
        }
        
        .error-message { 
          color: #EF4444; 
          background: #FEE2E2; 
          padding: 10px 14px; 
          border-radius: 8px; 
          font-size: 12px; 
          margin-top: 12px;
          font-weight: 500;
        }
        
        .loading-container { 
          text-align: center; 
          padding: 60px 20px; 
        }
        .spinner { 
          margin: 0 auto 20px; 
          width: 50px; 
          height: 50px; 
          border: 4px solid ${lightGray}; 
          border-top-color: ${primaryColor}; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        .loading-text { 
          font-size: 16px; 
          color: ${textColor}; 
          font-weight: 500;
        }
        
        .success-container { 
          text-align: center; 
          padding: 50px 28px; 
        }
        .success-icon { 
          width: 70px; 
          height: 70px; 
          margin: 0 auto 20px; 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 20px rgba(3, 30, 108, 0.3);
        }
        .success-icon svg { 
          width: 38px; 
          height: 38px; 
          color: white; 
        }
        .success-title { 
          font-size: 22px; 
          font-weight: 700; 
          color: ${textColor}; 
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }
        .success-message { 
          font-size: 14px; 
          color: #64748B; 
          line-height: 1.6; 
          margin: 0;
        }
        
        .btn-container { 
          padding: 0 28px 24px 28px; 
          background: ${backgroundColor};
          position: relative;
        }
        .btn { 
          width: 100%; 
          padding: 14px 24px; 
          border: none; 
          border-radius: 10px; 
          font-size: 15px; 
          font-weight: 600; 
          cursor: pointer; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }
        .btn-primary { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #02163d 100%); 
          color: white;
          box-shadow: 0 4px 12px rgba(3, 30, 108, 0.3);
        }
        .btn-primary:hover { 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(3, 30, 108, 0.4);
        }
        .btn-primary:active { 
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(3, 30, 108, 0.3);
        }
        
        /* Scrollbar Styling */
        .form-content::-webkit-scrollbar {
          width: 6px;
        }
        .form-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>
      
      <div class="form-header">
        ${showLogo ? `
          <div class="logo-container">
            <img src="${logoUrl}" alt="Pulse Snowsports" />
          </div>
        ` : ''}
        <h2>${formTitle}</h2>
        <p>${formSubtitle}</p>
      </div>
      
      <div class="form-content">
        <div id="form-step" class="form-step active">
          <form id="lead-form">
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name *</label>
                <input type="text" id="first-name" name="firstName" placeholder="John" required>
              </div>
              
              <div class="form-group">
                <label for="last-name">Last Name *</label>
                <input type="text" id="last-name" name="lastName" placeholder="Smith" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" placeholder="john.smith@example.com" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" placeholder="+44 7700 900000" required>
            </div>
            
            <div class="form-group">
              <label for="ski-school">Ski School *</label>
              <select id="ski-school" name="skiSchool" required>
                <option value="">Select a ski school</option>
                <option value="Verbier">Verbier</option>
                <option value="Morzine">Morzine</option>
                <option value="Manchester">Manchester</option>
              </select>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="arrival-date">Arrival Date *</label>
                <input type="date" id="arrival-date" name="arrivalDate" required>
              </div>
              
              <div class="form-group">
                <label for="departure-date">Departure Date *</label>
                <input type="date" id="departure-date" name="departureDate" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="experience-level">Experience Level *</label>
              <select id="experience-level" name="experienceLevel" required>
                <option value="">Select your experience</option>
                <option value="beginner">Beginner - Never skied before</option>
                <option value="intermediate">Intermediate - Can turn and stop</option>
                <option value="advanced">Advanced - Comfortable on black runs</option>
                <option value="expert">Expert - All terrain & conditions</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="lesson-type">Lesson Type *</label>
              <select id="lesson-type" name="lessonType" required>
                <option value="">Select lesson type</option>
                <option value="private">Private Lesson</option>
                <option value="group">Group Lesson</option>
                <option value="family">Family Lesson</option>
                <option value="kids">Kids Lesson</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Additional Information</label>
              <textarea id="message" name="message" placeholder="Tell us about your goals, any specific requirements, or questions you have...">${conversationSummary || 'Experienced skier looking for off piste skiing in Verbier'}</textarea>
            </div>

            
            <div class="checkbox-group">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="privacy-consent" name="privacyConsent" required>
              </div>
              <label for="privacy-consent">
                I want personalized lesson recommendations and agree to the <a href="https://pulsesnowsports.com/privacy-policy" target="_blank">Privacy Policy</a>.
              </label>
            </div>
            
            <div id="error-container"></div>
          </form>
        </div>
        
        <div id="loading-step" class="form-step">
          <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">Preparing your ski adventure...</div>
          </div>
        </div>
        
        <div id="success-step" class="form-step">
          <div class="success-container">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="success-title">Ready to Hit the Slopes!</h3>
            <p class="success-message">
              Thank you! Our experienced ski instructors will contact you within 24 hours with personalized lesson options. See you on the mountain!
            </p>
          </div>
        </div>
      </div>

      <div class="btn-container">
        <button id="submit-btn" class="btn btn-primary">Get My Lesson Plan</button>
      </div>
    `;

    container.appendChild(wrapper);
    element.appendChild(container);

    if (animateIn) {
      setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }

    // Set minimum dates for date pickers
    const today = new Date().toISOString().split('T')[0];
    const arrivalInput = wrapper.querySelector('#arrival-date');
    const departureInput = wrapper.querySelector('#departure-date');
    
    if (arrivalInput) {
      arrivalInput.setAttribute('min', today);
      arrivalInput.addEventListener('change', (e) => {
        if (departureInput) {
          departureInput.setAttribute('min', e.target.value);
        }
      });
    }

    function showStep(stepId) {
      const steps = wrapper.querySelectorAll('.form-step');
      steps.forEach(step => step.classList.remove('active'));
      
      const targetStep = wrapper.querySelector(`#${stepId}-step`);
      if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepId;
        
        const btnContainer = wrapper.querySelector('.btn-container');
        btnContainer.style.display = (stepId === 'form') ? 'block' : 'none';
      }
    }

    function showError(message) {
      const errorContainer = wrapper.querySelector('#error-container');
      errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }

    function clearError() {
      const errorContainer = wrapper.querySelector('#error-container');
      errorContainer.innerHTML = '';
    }

    function validateForm() {
      const form = wrapper.querySelector('#lead-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = borderColor;
        }
      });
      
      const emailField = wrapper.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value && !emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
      }

      // Validate date order
      const arrivalDate = wrapper.querySelector('#arrival-date').value;
      const departureDate = wrapper.querySelector('#departure-date').value;
      if (arrivalDate && departureDate && new Date(departureDate) <= new Date(arrivalDate)) {
        isValid = false;
        wrapper.querySelector('#departure-date').style.borderColor = '#EF4444';
        showError('Departure date must be after arrival date.');
      }
      
      return isValid;
    }

    async function sendToWebhook(formData) {
      try {
        let cleanConversationHistory = conversationHistory;
        if (conversationHistory && typeof conversationHistory === 'string') {
          cleanConversationHistory = conversationHistory
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/"/g, '\\"');
        }

        const payload = {
          lead: formData,
          conversationData: {
            history: cleanConversationHistory,
            conversationId: conversationId,
            userId: userId,
            timestamp: new Date().toISOString()
          },
          source: 'Voiceflow Lead Form - Pulse Snowsports',
          formType: 'Pulse Snowsports Ski Lesson Lead Capture',
          timestamp: new Date().toISOString()
        };

        console.log('Sending payload to webhook:', JSON.stringify(payload, null, 2));

        await new Promise(resolve => setTimeout(resolve, 1800));
        
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Successfully sent lead to webhook');
        return true;
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        return true;
      }
    }

    const submitBtn = wrapper.querySelector('#submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        clearError();
        
        if (!validateForm()) {
          showError('Please fill out all required fields correctly.');
          return;
        }
        
        isSubmitting = true;
        showStep('loading');
        
        const formData = {
          firstName: wrapper.querySelector('#first-name').value.trim(),
          lastName: wrapper.querySelector('#last-name').value.trim(),
          email: wrapper.querySelector('#email').value.trim(),
          phone: wrapper.querySelector('#phone').value.trim(),
          skiSchool: wrapper.querySelector('#ski-school').value,
          arrivalDate: wrapper.querySelector('#arrival-date').value,
          departureDate: wrapper.querySelector('#departure-date').value,
          experienceLevel: wrapper.querySelector('#experience-level').value,
          lessonType: wrapper.querySelector('#lesson-type').value,
          message: wrapper.querySelector('#message').value.trim()
        };
        
        const success = await sendToWebhook(formData);
        
        if (success) {
          showStep('success');
        } else {
          showStep('form');
          showError('Oops! Something went wrong. Please try again.');
        }
        
        isSubmitting = false;
      });
    }

    const inputs = wrapper.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = borderColor;
        }
      });
      
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
          input.style.borderColor = borderColor;
        }
      });
    });

    return function cleanup() {
      // Cleanup if needed
    };
  }
};

// YRS: LAST FRONTIER HELISKIING LEAD CAPTURE FORM EXTENSION VERSION 1 (13 NOV 2025)

export const LastFrontierHeliskiingLeadForm1 = {
  name: 'LastFrontierHeliskiingLeadForm1',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_lastFrontierHeliskiingLeadForm1' || trace.payload?.name === 'ext_lastFrontierHeliskiingLeadForm1',
  render: ({ trace, element }) => {
    // --- Configuration from Voiceflow Payload ---
    const {
      formTitle = 'Plan Your Heli Ski Adventure',
      formSubtitle = 'Experience world-class heliskiing in British Columbia, Canada',
      height = '720',
      backgroundColor = '#FFFFFF',
      maxWidth = '460px',
      primaryColor = '#ee2d24',
      secondaryColor = '#1a1a1a',
      accentColor = '#FFFFFF',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      borderWidth = '1px',
      borderStyle = 'solid',
      borderRadius = '16px',
      shadowColor = 'rgba(238, 45, 36, 0.25)',
      shadowSize = '12px',
      animateIn = true,
      logoUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/LastFrontierHeliskiing_Logo_FullName.svg',
      showLogo = true,
      conversationHistory = null,
      conversationSummary = '',
      conversationId = null,
      userId = null,
    } = trace.payload || {};

    const N8N_WEBHOOK_URL = 'https://n8n.romaix-n8n.xyz/webhook/9d6eaed8-9595-473f-9173-9d7b184a06df';

    let currentStep = 'form-step-1';
    let isSubmitting = false;

    element.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: center; align-items: flex-start; background-color: transparent; margin: 0; padding: 8px 0;';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'last-frontier-lead-form-wrapper';
    wrapper.style.cssText = `
      width: ${maxWidth}; min-width: ${maxWidth}; max-width: ${maxWidth};
      border: ${borderWidth} ${borderStyle} ${borderColor}; border-radius: ${borderRadius};
      overflow: hidden; background: ${backgroundColor};
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px ${shadowSize} ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.1);
      height: ${height}px; display: flex; flex-direction: column; margin: 0 auto; position: relative;
    `;
    
    if (animateIn) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(15px) scale(0.98)';
      wrapper.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    wrapper.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        .last-frontier-lead-form-wrapper * { box-sizing: border-box; }
        
        .form-header { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          color: white; 
          padding: 22px 28px; 
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .form-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        .logo-container { 
          margin-bottom: 12px; 
          position: relative;
          z-index: 1;
        }
        .logo-container img { 
          max-height: 45px; 
          max-width: 200px; 
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .form-header h2 { 
          margin: 0 0 6px 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 21px; 
          font-weight: 900; 
          letter-spacing: -0.4px;
          position: relative;
          z-index: 1;
          text-transform: uppercase;
        }
        .form-header p { 
          margin: 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 13px; 
          opacity: 0.95; 
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }
        
        /* Progress Indicator */
        .progress-container {
          padding: 20px 28px 16px 28px;
          background: ${lightGray};
          border-bottom: 1px solid ${borderColor};
        }
        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .progress-line {
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 3px;
          background: ${borderColor};
          z-index: 0;
        }
        .progress-line-fill {
          height: 100%;
          background: ${primaryColor};
          transition: width 0.4s ease;
          width: 0%;
        }
        .progress-step {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .progress-step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${accentColor};
          border: 3px solid ${borderColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          color: #64748B;
          transition: all 0.3s ease;
        }
        .progress-step.active .progress-step-circle {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: white;
          transform: scale(1.1);
        }
        .progress-step.completed .progress-step-circle {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: white;
        }
        .progress-step-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .progress-step.active .progress-step-label {
          color: ${primaryColor};
        }
        .progress-step.completed .progress-step-label {
          color: ${primaryColor};
        }
        .step-optional {
          font-size: 9px;
          color: #94A3B8;
          font-weight: 400;
          text-transform: lowercase;
        }
        
        .form-content { 
          flex: 1; 
          padding: 24px 28px 20px 28px; 
          font-family: 'Inter', sans-serif; 
          background: ${backgroundColor};
          overflow-y: auto;
        }
        
        .form-step { 
          display: none; 
          animation: fadeInUp 0.3s ease-out;
        }
        .form-step.active { 
          display: block; 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(12px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        .form-group { 
          margin-bottom: 18px; 
          position: relative; 
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group label { 
          display: block; 
          margin-bottom: 7px; 
          font-weight: 600; 
          color: ${textColor}; 
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .required-star {
          color: ${primaryColor};
          margin-left: 2px;
        }
        .form-group input, .form-group select, .form-group textarea { 
          width: 100%; 
          padding: 12px 14px; 
          border-radius: 10px; 
          border: 1.5px solid ${borderColor}; 
          font-size: 14px; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .form-group textarea {
          min-height: 90px;
          resize: vertical;
          line-height: 1.5;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { 
          color: #94A3B8; 
          font-size: 13px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: ${primaryColor}; 
          box-shadow: 0 0 0 3px rgba(238, 45, 36, 0.15);
          background: ${accentColor};
          transform: translateY(-1px);
        }
        
        /* Date Input Styling */
        .form-group input[type="date"] {
          cursor: pointer;
          position: relative;
        }
        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
        
        /* Select Dropdown Styling */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
          cursor: pointer;
        }
        
        /* Lodge Selection Cards */
        .lodge-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .lodge-card {
          border: 2px solid ${borderColor};
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .lodge-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(238, 45, 36, 0.15);
        }
        .lodge-card.selected {
          border-color: ${primaryColor};
          background: rgba(238, 45, 36, 0.05);
        }
        .lodge-card input[type="radio"] {
          display: none;
        }
        .lodge-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .lodge-icon {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }
        .lodge-name {
          font-size: 16px;
          font-weight: 700;
          color: ${textColor};
          flex: 1;
        }
        .lodge-details {
          font-size: 12px;
          color: #64748B;
          line-height: 1.6;
          padding-left: 38px;
        }
        .lodge-details li {
          margin-bottom: 4px;
        }
        .lodge-link {
          display: inline-block;
          margin-top: 8px;
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 600;
          font-size: 11px;
        }
        
        /* Trip Length Selection */
        .trip-length-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .trip-length-card {
          border: 2px solid ${borderColor};
          border-radius: 10px;
          padding: 14px 10px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .trip-length-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
        }
        .trip-length-card.selected {
          border-color: ${primaryColor};
          background: rgba(238, 45, 36, 0.05);
        }
        .trip-length-card input[type="radio"] {
          display: none;
        }
        .trip-length-label {
          font-weight: 700;
          font-size: 18px;
          color: ${textColor};
        }
        
        /* Yes/No Toggle */
        .yes-no-toggle {
          display: flex;
          gap: 12px;
        }
        .toggle-option {
          flex: 1;
          border: 2px solid ${borderColor};
          border-radius: 10px;
          padding: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: ${accentColor};
          font-weight: 600;
          color: ${textColor};
        }
        .toggle-option:hover {
          border-color: ${primaryColor};
          transform: translateY(-1px);
        }
        .toggle-option.selected {
          border-color: ${primaryColor};
          background: rgba(238, 45, 36, 0.05);
          color: ${primaryColor};
        }
        .toggle-option input[type="radio"] {
          display: none;
        }
        
        /* Ski Days Selector */
        .ski-days-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ski-days-card {
          border: 2px solid ${borderColor};
          border-radius: 10px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: ${accentColor};
          font-weight: 600;
          color: ${textColor};
        }
        .ski-days-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-1px);
        }
        .ski-days-card.selected {
          border-color: ${primaryColor};
          background: rgba(238, 45, 36, 0.05);
          color: ${primaryColor};
        }
        .ski-days-card input[type="radio"] {
          display: none;
        }
        
        /* Group Size Slider */
        .group-size-container {
          padding: 10px 0;
        }
        .group-size-display {
          text-align: center;
          font-size: 32px;
          font-weight: 900;
          color: ${primaryColor};
          margin-bottom: 12px;
        }
        .group-size-label {
          text-align: center;
          font-size: 12px;
          color: #64748B;
          margin-bottom: 16px;
        }
        input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 5px;
          background: linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} 0%, ${borderColor} 0%, ${borderColor} 100%);
          outline: none;
          -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${primaryColor};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${primaryColor};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.3);
        }
        
        /* Season Info Table */
        .season-info-table {
          margin-top: 12px;
          border: 1px solid ${borderColor};
          border-radius: 10px;
          overflow: hidden;
          font-size: 11px;
        }
        .season-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          border-bottom: 1px solid ${borderColor};
        }
        .season-row:last-child {
          border-bottom: none;
        }
        .season-row.header {
          background: ${lightGray};
          font-weight: 700;
          text-transform: uppercase;
        }
        .season-cell {
          padding: 10px 8px;
          border-right: 1px solid ${borderColor};
        }
        .season-cell:last-child {
          border-right: none;
        }
        .season-period {
          font-weight: 600;
          color: ${textColor};
        }
        
        .checkbox-group { 
          display: flex; 
          align-items: flex-start; 
          margin: 14px 0 0 0; 
          gap: 10px;
        }
        .checkbox-wrapper {
          position: relative;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .checkbox-wrapper input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid ${borderColor};
          border-radius: 4px;
          background: ${accentColor};
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .checkbox-wrapper input[type="checkbox"]:checked {
          background: ${primaryColor};
          border-color: ${primaryColor};
          transform: scale(1.05);
        }
        .checkbox-wrapper input[type="checkbox"]:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .checkbox-group label { 
          margin-bottom: 0; 
          text-transform: none; 
          letter-spacing: 0; 
          font-weight: 400; 
          font-size: 12px; 
          line-height: 1.5; 
          cursor: pointer;
          color: #64748B;
        }
        .checkbox-group label a {
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 500;
        }
        .checkbox-group label a:hover {
          text-decoration: underline;
        }
        
        .error-message { 
          color: #EF4444; 
          background: #FEE2E2; 
          padding: 10px 14px; 
          border-radius: 8px; 
          font-size: 12px; 
          margin-top: 12px;
          font-weight: 500;
        }
        
        .loading-container { 
          text-align: center; 
          padding: 60px 20px; 
        }
        .spinner { 
          margin: 0 auto 20px; 
          width: 50px; 
          height: 50px; 
          border: 4px solid ${lightGray}; 
          border-top-color: ${primaryColor}; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        .loading-text { 
          font-size: 16px; 
          color: ${textColor}; 
          font-weight: 500;
        }
        
        .success-container { 
          text-align: center; 
          padding: 50px 28px; 
        }
        .success-icon { 
          width: 70px; 
          height: 70px; 
          margin: 0 auto 20px; 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 20px rgba(238, 45, 36, 0.3);
        }
        .success-icon svg { 
          width: 38px; 
          height: 38px; 
          color: white; 
        }
        .success-title { 
          font-size: 22px; 
          font-weight: 700; 
          color: ${textColor}; 
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }
        .success-message { 
          font-size: 14px; 
          color: #64748B; 
          line-height: 1.6; 
          margin: 0;
        }
        
        .btn-container { 
          padding: 0 28px 24px 28px; 
          background: ${backgroundColor};
          position: relative;
          display: flex;
          gap: 12px;
        }
        .btn { 
          flex: 1;
          padding: 14px 24px; 
          border: none; 
          border-radius: 10px; 
          font-size: 15px; 
          font-weight: 600; 
          cursor: pointer; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }
        .btn-primary { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          color: white;
          box-shadow: 0 4px 12px rgba(238, 45, 36, 0.3);
        }
        .btn-primary:hover { 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(238, 45, 36, 0.4);
        }
        .btn-primary:active { 
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.3);
        }
        .btn-secondary {
          background: ${accentColor};
          color: ${textColor};
          border: 2px solid ${borderColor};
        }
        .btn-secondary:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
        }
        
        /* Scrollbar Styling */
        .form-content::-webkit-scrollbar {
          width: 6px;
        }
        .form-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>
      
      <div class="form-header">
        ${showLogo ? `
          <div class="logo-container">
            <img src="${logoUrl}" alt="Last Frontier Heliskiing" />
          </div>
        ` : ''}
        <h2>${formTitle}</h2>
        <p>${formSubtitle}</p>
      </div>
      
      <div class="progress-container">
        <div class="progress-steps">
          <div class="progress-line">
            <div class="progress-line-fill" id="progress-fill"></div>
          </div>
          <div class="progress-step active" data-step="1">
            <div class="progress-step-circle">1</div>
            <div class="progress-step-label">Contact Info</div>
          </div>
          <div class="progress-step" data-step="2">
            <div class="progress-step-circle">2</div>
            <div class="progress-step-label">Trip Details <span class="step-optional">(optional)</span></div>
          </div>
        </div>
      </div>
      
      <div class="form-content">
        <!-- STEP 1: Contact Information -->
        <div id="form-step-1" class="form-step active">
          <form id="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name <span class="required-star">*</span></label>
                <input type="text" id="first-name" name="firstName" placeholder="John" required>
              </div>
              
              <div class="form-group">
                <label for="last-name">Last Name <span class="required-star">*</span></label>
                <input type="text" id="last-name" name="lastName" placeholder="Smith" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">E-mail Address <span class="required-star">*</span></label>
              <input type="email" id="email" name="email" placeholder="john.smith@example.com" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Telephone Number <span class="required-star">*</span></label>
              <input type="tel" id="phone" name="phone" placeholder="+1 (888) 655 5566" required>
            </div>
            
            <div class="form-group">
              <label for="country">Country <span class="required-star">*</span></label>
              <select id="country" name="country" required>
                <option value="">Select your country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Austria">Austria</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" name="city" placeholder="Vancouver">
            </div>
            
            <div class="form-group">
              <label for="hear-about-us">How Did You Hear About Us? <span class="required-star">*</span></label>
              <select id="hear-about-us" name="hearAboutUs" required>
                <option value="">Select an option</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend/Family Referral">Friend/Family Referral</option>
                <option value="Magazine/Publication">Magazine/Publication</option>
                <option value="Travel Agent">Travel Agent</option>
                <option value="Previous Guest">Previous Guest</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="booking-timeframe">When Do You Intend to Book? <span class="required-star">*</span></label>
              <select id="booking-timeframe" name="bookingTimeframe" required>
                <option value="">Select timeframe</option>
                <option value="This Season">This Season</option>
                <option value="Next Season">Next Season</option>
                <option value="Within 1 Year">Within 1 Year</option>
                <option value="Just Researching">Just Researching</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="contact-urgency">Contact Urgency Rating <span class="required-star">*</span></label>
              <select id="contact-urgency" name="contactUrgency" required>
                <option value="">Select urgency level</option>
                <option value="High - Contact ASAP">High - Contact ASAP</option>
                <option value="Medium - Within 2-3 days">Medium - Within 2-3 days</option>
                <option value="Low - Within a week">Low - Within a week</option>
                <option value="No rush">No rush</option>
              </select>
            </div>
            
            <div id="error-container-1"></div>
          </form>
        </div>
        
        <!-- STEP 2: Trip Details (Optional) -->
        <div id="form-step-2" class="form-step">
          <form id="trip-details-form">
            <div class="form-group">
              <label>Which Lodge Do You Want to Stay At?</label>
              <div class="lodge-options">
                <label class="lodge-card" for="lodge-bell2">
                  <input type="radio" id="lodge-bell2" name="lodge" value="Bell 2 Lodge">
                  <div class="lodge-header">
                    <svg class="lodge-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div class="lodge-name">Bell 2 Lodge</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Remote heli ski village</li>
                    <li>Stay in log chalets with wood stoves</li>
                    <li>Helipads on site = less commuting</li>
                    <li>More tour options in early season</li>
                    <li>Better suited to strong intermediate skiers</li>
                    <li>Max 36 guests</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-lodges/#bell-2-lodge" target="_blank" class="lodge-link">Learn more →</a>
                </label>
                
                <label class="lodge-card" for="lodge-ripley">
                  <input type="radio" id="lodge-ripley" name="lodge" value="Ripley Creek">
                  <div class="lodge-header">
                    <svg class="lodge-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div class="lodge-name">Ripley Creek</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Situated in heart of historic mining town</li>
                    <li>Hotel accommodation with separate restaurant / bar</li>
                    <li>Skiing & riding further from town = more commuting</li>
                    <li>30% more snow = deep days</li>
                    <li>Only suitable to advanced & expert skiers</li>
                    <li>Max 24 guests</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-lodges/#ripley-creek" target="_blank" class="lodge-link">Learn more →</a>
                </label>
                
                <label class="lodge-card" for="lodge-both">
                  <input type="radio" id="lodge-both" name="lodge" value="Both">
                  <div class="lodge-header">
                    <svg class="lodge-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <div class="lodge-name">Both</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Experience two world-class heliskiing locations</li>
                    <li>Explore nature & stay in funky mining town</li>
                    <li>Ski & ride terrain in two mountain ranges</li>
                    <li>7 or 10 day Safari Tour options</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-tours/#lodge-to-lodge-safari" target="_blank" class="lodge-link">Learn more →</a>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>How Many Days Would You Like to Stay?</label>
              <div class="trip-length-options">
                <label class="trip-length-card" for="days-10">
                  <input type="radio" id="days-10" name="tripLength" value="10 days">
                  <div class="trip-length-label">10 days</div>
                </label>
                <label class="trip-length-card" for="days-7">
                  <input type="radio" id="days-7" name="tripLength" value="7 days">
                  <div class="trip-length-label">7 days</div>
                </label>
                <label class="trip-length-card" for="days-5">
                  <input type="radio" id="days-5" name="tripLength" value="5 days">
                  <div class="trip-length-label">5 days</div>
                </label>
                <label class="trip-length-card" for="days-4">
                  <input type="radio" id="days-4" name="tripLength" value="4 days">
                  <div class="trip-length-label">4 days</div>
                </label>
                <label class="trip-length-card" for="days-custom">
                  <input type="radio" id="days-custom" name="tripLength" value="? days">
                  <div class="trip-length-label">? days</div>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Have You Cat Skied?</label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="cat-ski-yes">
                  <input type="radio" id="cat-ski-yes" name="catSkied" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="cat-ski-no">
                  <input type="radio" id="cat-ski-no" name="catSkied" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Have You Heli Skied?</label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="heli-ski-yes">
                  <input type="radio" id="heli-ski-yes" name="heliSkied" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="heli-ski-no">
                  <input type="radio" id="heli-ski-no" name="heliSkied" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>How Many Days a Year Do You Ski or Ride?</label>
              <div class="ski-days-options">
                <label class="ski-days-card" for="ski-days-1">
                  <input type="radio" id="ski-days-1" name="skiDaysPerYear" value="0-10 Days">
                  0-10 Days
                </label>
                <label class="ski-days-card" for="ski-days-2">
                  <input type="radio" id="ski-days-2" name="skiDaysPerYear" value="10-30 Days">
                  10-30 Days
                </label>
                <label class="ski-days-card" for="ski-days-3">
                  <input type="radio" id="ski-days-3" name="skiDaysPerYear" value="30+ Days">
                  30+ Days
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>How Many People Are in Your Group?</label>
              <div class="group-size-container">
                <div class="group-size-display" id="group-size-display">1</div>
                <div class="group-size-label">person</div>
                <input type="range" id="group-size" name="groupSize" min="1" max="13" value="1" step="1">
              </div>
            </div>
            
            <div class="form-group">
              <label for="visit-dates">When Would You Like to Visit?</label>
              <input type="text" id="visit-dates" name="visitDates" placeholder="e.g., February 15-25, 2026">
              <div class="season-info-table">
                <div class="season-row header">
                  <div class="season-cell">Season Period</div>
                  <div class="season-cell">Terrain</div>
                  <div class="season-cell">Cost</div>
                  <div class="season-cell">Snowfall</div>
                </div>
                <div class="season-row">
                  <div class="season-cell season-period">Early Dec & Jan</div>
                  <div class="season-cell">More Trees</div>
                  <div class="season-cell">$$</div>
                  <div class="season-cell">❄️❄️❄️❄️</div>
                </div>
                <div class="season-row">
                  <div class="season-cell season-period">Middle Feb & March</div>
                  <div class="season-cell">Mix Alpine & Trees</div>
                  <div class="season-cell">$$$$</div>
                  <div class="season-cell">❄️❄️❄️</div>
                </div>
                <div class="season-row">
                  <div class="season-cell season-period">Late April</div>
                  <div class="season-cell">Mostly Alpine</div>
                  <div class="season-cell">$$$</div>
                  <div class="season-cell">❄️❄️</div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>Are You Requesting a Private Tour?</label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="private-yes">
                  <input type="radio" id="private-yes" name="privateTour" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="private-no">
                  <input type="radio" id="private-no" name="privateTour" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label for="additional-questions">Additional Questions</label>
              <textarea id="additional-questions" name="additionalQuestions" placeholder="Tell us about your experience level, specific preferences, or any questions you have...">${conversationSummary || ''}</textarea>
            </div>
            
            <div class="checkbox-group">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="privacy-consent" name="privacyConsent" required>
              </div>
              <label for="privacy-consent">
                By clicking submit you agree to our <a href="https://www.lastfrontierheli.com/privacy-policy/" target="_blank">privacy policy</a>.
              </label>
            </div>
            
            <div id="error-container-2"></div>
          </form>
        </div>
        
        <div id="loading-step" class="form-step">
          <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">Preparing your heliskiing adventure...</div>
          </div>
        </div>
        
        <div id="success-step" class="form-step">
          <div class="success-container">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="success-title">Request Received!</h3>
            <p class="success-message">
              Thank you for your interest in Last Frontier Heliskiing! Our team will review your request and contact you within 24 hours to discuss your epic heliskiing adventure. Get ready for the experience of a lifetime!
            </p>
          </div>
        </div>
      </div>

      <div class="btn-container" id="btn-container">
        <button id="back-btn" class="btn btn-secondary" style="display: none;">Back</button>
        <button id="next-btn" class="btn btn-primary">Continue to Trip Details</button>
      </div>
    `;

    container.appendChild(wrapper);
    element.appendChild(container);

    if (animateIn) {
      setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }

    // Progress update function
    function updateProgress(step) {
      const progressFill = wrapper.querySelector('#progress-fill');
      const progressSteps = wrapper.querySelectorAll('.progress-step');
      
      progressSteps.forEach((stepEl, index) => {
        if (index + 1 < step) {
          stepEl.classList.add('completed');
          stepEl.classList.remove('active');
        } else if (index + 1 === step) {
          stepEl.classList.add('active');
          stepEl.classList.remove('completed');
        } else {
          stepEl.classList.remove('active', 'completed');
        }
      });
      
      const fillPercentage = ((step - 1) / 1) * 100;
      progressFill.style.width = fillPercentage + '%';
    }

    // Group size slider functionality
    const groupSizeSlider = wrapper.querySelector('#group-size');
    const groupSizeDisplay = wrapper.querySelector('#group-size-display');
    if (groupSizeSlider && groupSizeDisplay) {
      groupSizeSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        const displayValue = value === '13' ? '12+' : value;
        groupSizeDisplay.textContent = displayValue;
        
        // Update slider background gradient
        const percentage = ((value - 1) / 12) * 100;
        e.target.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${percentage}%, ${borderColor} ${percentage}%, ${borderColor} 100%)`;
      });
    }

    // Lodge selection handlers
    const lodgeCards = wrapper.querySelectorAll('.lodge-card');
    lodgeCards.forEach(card => {
      card.addEventListener('click', () => {
        lodgeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Trip length handlers
    const tripLengthCards = wrapper.querySelectorAll('.trip-length-card');
    tripLengthCards.forEach(card => {
      card.addEventListener('click', () => {
        tripLengthCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Yes/No toggle handlers
    const toggleOptions = wrapper.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
      option.addEventListener('click', () => {
        const name = option.querySelector('input').name;
        wrapper.querySelectorAll(`input[name="${name}"]`).forEach(input => {
          input.parentElement.classList.remove('selected');
        });
        option.classList.add('selected');
        option.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Ski days handlers
    const skiDaysCards = wrapper.querySelectorAll('.ski-days-card');
    skiDaysCards.forEach(card => {
      card.addEventListener('click', () => {
        skiDaysCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    function showStep(stepId) {
      const steps = wrapper.querySelectorAll('.form-step');
      steps.forEach(step => step.classList.remove('active'));
      
      const targetStep = wrapper.querySelector(`#${stepId}`);
      if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepId;
        
        const btnContainer = wrapper.querySelector('#btn-container');
        const backBtn = wrapper.querySelector('#back-btn');
        const nextBtn = wrapper.querySelector('#next-btn');
        
        if (stepId === 'form-step-1') {
          btnContainer.style.display = 'flex';
          backBtn.style.display = 'none';
          nextBtn.style.display = 'block';
          nextBtn.textContent = 'Continue to Trip Details';
          updateProgress(1);
        } else if (stepId === 'form-step-2') {
          btnContainer.style.display = 'flex';
          backBtn.style.display = 'block';
          nextBtn.style.display = 'block';
          nextBtn.textContent = 'Submit Request';
          updateProgress(2);
        } else {
          btnContainer.style.display = 'none';
        }
      }
    }

    function showError(message, step) {
      const errorContainer = wrapper.querySelector(`#error-container-${step}`);
      if (errorContainer) {
        errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
      }
    }

    function clearError(step) {
      const errorContainer = wrapper.querySelector(`#error-container-${step}`);
      if (errorContainer) {
        errorContainer.innerHTML = '';
      }
    }

    function validateStep1() {
      const form = wrapper.querySelector('#contact-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = borderColor;
        }
      });
      
      const emailField = wrapper.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value && !emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
      }
      
      return isValid;
    }

    function validateStep2() {
      const privacyConsent = wrapper.querySelector('#privacy-consent');
      if (!privacyConsent.checked) {
        return false;
      }
      return true;
    }

    async function sendToWebhook(formData) {
      try {
        let cleanConversationHistory = conversationHistory;
        if (conversationHistory && typeof conversationHistory === 'string') {
          cleanConversationHistory = conversationHistory
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/"/g, '\\"');
        }

        const payload = {
          lead: formData,
          conversationData: {
            history: cleanConversationHistory,
            conversationId: conversationId,
            userId: userId,
            timestamp: new Date().toISOString()
          },
          source: 'Voiceflow Lead Form - Last Frontier Heliskiing',
          formType: 'Last Frontier Heliskiing Lead Capture',
          timestamp: new Date().toISOString()
        };

        console.log('Sending payload to webhook:', JSON.stringify(payload, null, 2));

        await new Promise(resolve => setTimeout(resolve, 1800));
        
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Successfully sent lead to webhook');
        return true;
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        return true; // Return true anyway to show success to user
      }
    }

    const backBtn = wrapper.querySelector('#back-btn');
    const nextBtn = wrapper.querySelector('#next-btn');

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep === 'form-step-2') {
          showStep('form-step-1');
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        if (currentStep === 'form-step-1') {
          clearError(1);
          
          if (!validateStep1()) {
            showError('Please fill out all required fields correctly.', 1);
            return;
          }
          
          showStep('form-step-2');
        } else if (currentStep === 'form-step-2') {
          clearError(2);
          
          if (!validateStep2()) {
            showError('Please accept the privacy policy to continue.', 2);
            return;
          }
          
          isSubmitting = true;
          showStep('loading-step');
          
          // Collect all form data
          const formData = {
            // Step 1 data
            firstName: wrapper.querySelector('#first-name').value.trim(),
            lastName: wrapper.querySelector('#last-name').value.trim(),
            email: wrapper.querySelector('#email').value.trim(),
            phone: wrapper.querySelector('#phone').value.trim(),
            country: wrapper.querySelector('#country').value,
            city: wrapper.querySelector('#city').value.trim(),
            hearAboutUs: wrapper.querySelector('#hear-about-us').value,
            bookingTimeframe: wrapper.querySelector('#booking-timeframe').value,
            contactUrgency: wrapper.querySelector('#contact-urgency').value,
            
            // Step 2 data
            lodge: wrapper.querySelector('input[name="lodge"]:checked')?.value || '',
            tripLength: wrapper.querySelector('input[name="tripLength"]:checked')?.value || '',
            catSkied: wrapper.querySelector('input[name="catSkied"]:checked')?.value || '',
            heliSkied: wrapper.querySelector('input[name="heliSkied"]:checked')?.value || '',
            skiDaysPerYear: wrapper.querySelector('input[name="skiDaysPerYear"]:checked')?.value || '',
            groupSize: wrapper.querySelector('#group-size').value === '13' ? '12+' : wrapper.querySelector('#group-size').value,
            visitDates: wrapper.querySelector('#visit-dates').value.trim(),
            privateTour: wrapper.querySelector('input[name="privateTour"]:checked')?.value || '',
            additionalQuestions: wrapper.querySelector('#additional-questions').value.trim()
          };
          
          const success = await sendToWebhook(formData);
          
          if (success) {
            showStep('success-step');
          } else {
            showStep('form-step-2');
            showError('Oops! Something went wrong. Please try again.', 2);
          }
          
          isSubmitting = false;
        }
      });
    }

    // Input field styling on blur/input
    const inputs = wrapper.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = borderColor;
        }
      });
      
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
          input.style.borderColor = borderColor;
        }
      });
    });

    return function cleanup() {
      // Cleanup if needed
    };
  }
};

// YRS: LAST FRONTIER HELISKIING LEAD CAPTURE FORM EXTENSION VERSION 2 (13 NOV 2025)

export const LastFrontierHeliskiingLeadForm2 = {
  name: 'LastFrontierHeliskiingLeadForm2',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_lastFrontierHeliskiingLeadForm2' || trace.payload?.name === 'ext_lastFrontierHeliskiingLeadForm2',
  render: ({ trace, element }) => {
    // --- Configuration from Voiceflow Payload ---
    const {
      formTitle = 'Plan Your Heli Ski Adventure',
      formSubtitle = 'Experience world-class heliskiing in British Columbia, Canada',
      height = '720',
      backgroundColor = '#FFFFFF',
      maxWidth = '460px',
      primaryColor = '#ee2d24',
      secondaryColor = '#1a1a1a',
      accentColor = '#FFFFFF',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      borderWidth = '1px',
      borderStyle = 'solid',
      borderRadius = '16px',
      shadowColor = 'rgba(238, 45, 36, 0.25)',
      shadowSize = '12px',
      animateIn = true,
      logoUrl = 'https://www.lastfrontierheli.com/wp-content/themes/lastfrontier/dist/images/logo-desktop.svg',
      showLogo = true,
      conversationHistory = null,
      conversationSummary = '',
      conversationId = null,
      userId = null,
    } = trace.payload || {};

    const N8N_WEBHOOK_URL = 'https://n8n.romaix-n8n.xyz/webhook/last-frontier-heliskiing-lead';

    let currentStep = 'form-step-1';
    let isSubmitting = false;

    element.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: center; align-items: flex-start; background-color: transparent; margin: 0; padding: 8px 0;';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'last-frontier-lead-form-wrapper';
    wrapper.style.cssText = `
      width: ${maxWidth}; min-width: ${maxWidth}; max-width: ${maxWidth};
      border: ${borderWidth} ${borderStyle} ${borderColor}; border-radius: ${borderRadius};
      overflow: hidden; background: ${backgroundColor};
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px ${shadowSize} ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.1);
      height: ${height}px; display: flex; flex-direction: column; margin: 0 auto; position: relative;
    `;
    
    if (animateIn) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(15px) scale(0.98)';
      wrapper.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    wrapper.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        .last-frontier-lead-form-wrapper * { box-sizing: border-box; }
        
        .form-header { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          color: white; 
          padding: 22px 28px; 
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .form-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        .logo-container { 
          margin-bottom: 12px; 
          position: relative;
          z-index: 1;
        }
        .logo-container img { 
          max-height: 45px; 
          max-width: 200px; 
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .form-header h2 { 
          margin: 0 0 6px 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 21px; 
          font-weight: 900; 
          letter-spacing: -0.4px;
          position: relative;
          z-index: 1;
          text-transform: uppercase;
        }
        .form-header p { 
          margin: 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 13px; 
          opacity: 0.95; 
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }
        
        /* Progress Indicator */
        .progress-container {
          padding: 20px 28px 16px 28px;
          background: ${lightGray};
          border-bottom: 1px solid ${borderColor};
        }
        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .progress-line {
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 3px;
          background: ${borderColor};
          z-index: 0;
        }
        .progress-line-fill {
          height: 100%;
          background: ${primaryColor};
          transition: width 0.4s ease;
          width: 0%;
        }
        .progress-step {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .progress-step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${accentColor};
          border: 3px solid ${borderColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          color: #64748B;
          transition: all 0.3s ease;
        }
        .progress-step.active .progress-step-circle {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: white;
          transform: scale(1.1);
        }
        .progress-step.completed .progress-step-circle {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: white;
        }
        .progress-step-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .progress-step.active .progress-step-label {
          color: ${primaryColor};
        }
        .progress-step.completed .progress-step-label {
          color: ${primaryColor};
        }
        .step-optional {
          font-size: 9px;
          color: #94A3B8;
          font-weight: 400;
          text-transform: lowercase;
        }
        
        .form-content { 
          flex: 1; 
          padding: 24px 28px 20px 28px; 
          font-family: 'Inter', sans-serif; 
          background: ${backgroundColor};
          overflow-y: auto;
        }
        
        .form-step { 
          display: none; 
          animation: fadeInUp 0.3s ease-out;
        }
        .form-step.active { 
          display: block; 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(12px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        .form-group { 
          margin-bottom: 18px; 
          position: relative; 
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group label { 
          display: block; 
          margin-bottom: 12px; 
          font-weight: 900; 
          color: ${textColor}; 
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }
        .required-star {
          color: ${primaryColor};
          margin-left: 3px;
          font-size: 16px;
        }
        .form-group .form-sublabel {
          display: block;
          font-size: 12px;
          font-weight: 400;
          text-transform: none;
          color: #666;
          margin-top: 4px;
          letter-spacing: 0;
        }
        .form-group input, .form-group select, .form-group textarea { 
          width: 100%; 
          padding: 12px 14px; 
          border-radius: 10px; 
          border: 1.5px solid ${borderColor}; 
          font-size: 14px; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .form-group textarea {
          min-height: 90px;
          resize: vertical;
          line-height: 1.5;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { 
          color: #94A3B8; 
          font-size: 13px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: ${primaryColor}; 
          box-shadow: 0 0 0 3px rgba(238, 45, 36, 0.15);
          background: ${accentColor};
          transform: translateY(-1px);
        }
        
        /* Date Input Styling */
        .form-group input[type="date"] {
          cursor: pointer;
          position: relative;
        }
        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
        
        /* Select Dropdown Styling */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
          cursor: pointer;
        }
        
        /* Lodge Selection Cards */
        .lodge-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 500px) {
          .lodge-options {
            grid-template-columns: 1fr;
          }
        }
        .lodge-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 20px 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          text-align: center;
          position: relative;
        }
        .lodge-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .lodge-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .lodge-card input[type="radio"] {
          display: none;
        }
        .lodge-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .lodge-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          opacity: 0.7;
        }
        .lodge-name {
          font-size: 17px;
          font-weight: 900;
          color: ${textColor};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .lodge-details {
          font-size: 12px;
          color: #666;
          line-height: 1.7;
          text-align: left;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .lodge-details li {
          margin-bottom: 6px;
          position: relative;
          padding-left: 12px;
        }
        .lodge-details li:before {
          content: '•';
          position: absolute;
          left: 0;
          color: ${primaryColor};
          font-weight: bold;
        }
        .lodge-link {
          display: inline-block;
          margin-top: 10px;
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid ${primaryColor};
          padding-bottom: 2px;
        }
        .lodge-link:hover {
          opacity: 0.8;
        }
        
        /* Trip Length Selection */
        .trip-length-options {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .trip-length-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 16px 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          min-width: 75px;
          position: relative;
        }
        .trip-length-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .trip-length-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .trip-length-card input[type="radio"] {
          display: none;
        }
        .trip-length-icon {
          font-size: 28px;
          margin-bottom: 8px;
          opacity: 0.6;
        }
        .trip-length-label {
          font-weight: 900;
          font-size: 15px;
          color: ${textColor};
          text-transform: uppercase;
        }
        
        /* Yes/No Toggle */
        .yes-no-toggle {
          display: flex;
          gap: 14px;
          justify-content: center;
        }
        .toggle-option {
          flex: 0 0 120px;
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 14px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          font-weight: 700;
          font-size: 15px;
          color: ${textColor};
          text-transform: uppercase;
        }
        .toggle-option:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .toggle-option.selected {
          border-color: ${primaryColor};
          background: white;
          color: ${textColor};
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .toggle-option input[type="radio"] {
          display: none;
        }
        
        /* Ski Days Selector */
        .ski-days-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
          margin: 0 auto;
        }
        .ski-days-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          font-weight: 900;
          font-size: 15px;
          color: ${textColor};
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-transform: uppercase;
        }
        .ski-days-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .ski-days-card.selected {
          border-color: ${primaryColor};
          background: white;
          color: ${textColor};
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .ski-days-card input[type="radio"] {
          display: none;
        }
        .ski-days-icon {
          font-size: 24px;
          opacity: 0.6;
        }
        
        /* Group Size Slider */
        .group-size-container {
          padding: 14px 0;
        }
        .group-size-display {
          text-align: center;
          font-size: 18px;
          font-weight: 400;
          color: #666;
          margin-bottom: 18px;
        }
        .group-size-slider-wrapper {
          position: relative;
          padding: 30px 0;
        }
        .group-size-numbers {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 0 8px;
        }
        .group-size-number {
          font-size: 13px;
          font-weight: 600;
          color: #999;
          min-width: 28px;
          text-align: center;
        }
        .group-size-visual {
          display: flex;
          justify-content: space-around;
          margin-top: 30px;
          gap: 20px;
        }
        .heli-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
        .heli-group.active {
          opacity: 1;
        }
        .heli-icon {
          font-size: 32px;
          color: #999;
        }
        .people-icons {
          display: flex;
          gap: 4px;
        }
        .person-icon {
          font-size: 20px;
        }
        .person-icon.highlighted {
          color: ${primaryColor};
        }
        input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 5px;
          background: linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} 0%, #d0d0d0 0%, #d0d0d0 100%);
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${primaryColor};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.4);
          border: 3px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${primaryColor};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.4);
        }
        
        /* Season Selection Cards */
        .season-selection {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 14px;
        }
        @media (max-width: 500px) {
          .season-selection {
            grid-template-columns: 1fr;
          }
        }
        .season-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 18px 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          text-align: center;
        }
        .season-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .season-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .season-card input[type="radio"] {
          display: none;
        }
        .season-title {
          font-weight: 900;
          font-size: 15px;
          color: ${textColor};
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .season-dates {
          font-size: 12px;
          color: #666;
          margin-bottom: 16px;
        }
        .season-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-top: 1px solid #e5e5e5;
          font-size: 11px;
        }
        .season-detail-row:first-of-type {
          border-top: 2px solid #e5e5e5;
          margin-top: 8px;
        }
        .season-detail-label {
          color: #666;
          font-weight: 600;
          text-align: left;
        }
        .season-detail-value {
          color: ${textColor};
          font-weight: 700;
          text-align: right;
        }
        .season-terrain-icon {
          font-size: 20px;
        }
        .season-learn-more {
          display: inline-block;
          margin-top: 12px;
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid ${primaryColor};
          padding-bottom: 2px;
        }
        
        /* Season Info Table - Hidden by default, shown below cards */
        .season-info-table {
          display: none;
        }
        
        .checkbox-group { 
          display: flex; 
          align-items: flex-start; 
          margin: 14px 0 0 0; 
          gap: 10px;
        }
        .checkbox-wrapper {
          position: relative;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .checkbox-wrapper input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid ${borderColor};
          border-radius: 4px;
          background: ${accentColor};
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .checkbox-wrapper input[type="checkbox"]:checked {
          background: ${primaryColor};
          border-color: ${primaryColor};
          transform: scale(1.05);
        }
        .checkbox-wrapper input[type="checkbox"]:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .checkbox-group label { 
          margin-bottom: 0; 
          text-transform: none; 
          letter-spacing: 0; 
          font-weight: 400; 
          font-size: 12px; 
          line-height: 1.5; 
          cursor: pointer;
          color: #64748B;
        }
        .checkbox-group label a {
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 500;
        }
        .checkbox-group label a:hover {
          text-decoration: underline;
        }
        
        .error-message { 
          color: #EF4444; 
          background: #FEE2E2; 
          padding: 10px 14px; 
          border-radius: 8px; 
          font-size: 12px; 
          margin-top: 12px;
          font-weight: 500;
        }
        
        .loading-container { 
          text-align: center; 
          padding: 60px 20px; 
        }
        .spinner { 
          margin: 0 auto 20px; 
          width: 50px; 
          height: 50px; 
          border: 4px solid ${lightGray}; 
          border-top-color: ${primaryColor}; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        .loading-text { 
          font-size: 16px; 
          color: ${textColor}; 
          font-weight: 500;
        }
        
        .success-container { 
          text-align: center; 
          padding: 50px 28px; 
        }
        .success-icon { 
          width: 70px; 
          height: 70px; 
          margin: 0 auto 20px; 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 20px rgba(238, 45, 36, 0.3);
        }
        .success-icon svg { 
          width: 38px; 
          height: 38px; 
          color: white; 
        }
        .success-title { 
          font-size: 22px; 
          font-weight: 700; 
          color: ${textColor}; 
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }
        .success-message { 
          font-size: 14px; 
          color: #64748B; 
          line-height: 1.6; 
          margin: 0;
        }
        
        .btn-container { 
          padding: 0 28px 24px 28px; 
          background: ${backgroundColor};
          position: relative;
          display: flex;
          gap: 12px;
        }
        .btn { 
          flex: 1;
          padding: 14px 24px; 
          border: none; 
          border-radius: 10px; 
          font-size: 15px; 
          font-weight: 600; 
          cursor: pointer; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }
        .btn-primary { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          color: white;
          box-shadow: 0 4px 12px rgba(238, 45, 36, 0.3);
        }
        .btn-primary:hover { 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(238, 45, 36, 0.4);
        }
        .btn-primary:active { 
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.3);
        }
        .btn-secondary {
          background: ${accentColor};
          color: ${textColor};
          border: 2px solid ${borderColor};
        }
        .btn-secondary:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
        }
        
        /* Scrollbar Styling */
        .form-content::-webkit-scrollbar {
          width: 6px;
        }
        .form-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>
      
      <div class="form-header">
        ${showLogo ? `
          <div class="logo-container">
            <img src="${logoUrl}" alt="Last Frontier Heliskiing" />
          </div>
        ` : ''}
        <h2>${formTitle}</h2>
        <p>${formSubtitle}</p>
      </div>
      
      <div class="progress-container">
        <div class="progress-steps">
          <div class="progress-line">
            <div class="progress-line-fill" id="progress-fill"></div>
          </div>
          <div class="progress-step active" data-step="1">
            <div class="progress-step-circle">1</div>
            <div class="progress-step-label">Contact Info</div>
          </div>
          <div class="progress-step" data-step="2">
            <div class="progress-step-circle">2</div>
            <div class="progress-step-label">Trip Details <span class="step-optional">(optional)</span></div>
          </div>
        </div>
      </div>
      
      <div class="form-content">
        <!-- STEP 1: Contact Information -->
        <div id="form-step-1" class="form-step active">
          <form id="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name <span class="required-star">*</span></label>
                <input type="text" id="first-name" name="firstName" placeholder="John" required>
              </div>
              
              <div class="form-group">
                <label for="last-name">Last Name <span class="required-star">*</span></label>
                <input type="text" id="last-name" name="lastName" placeholder="Smith" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">E-mail Address <span class="required-star">*</span></label>
              <input type="email" id="email" name="email" placeholder="john.smith@example.com" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Telephone Number <span class="required-star">*</span></label>
              <input type="tel" id="phone" name="phone" placeholder="+1 (888) 655 5566" required>
            </div>
            
            <div class="form-group">
              <label for="country">Country <span class="required-star">*</span></label>
              <select id="country" name="country" required>
                <option value="">Select your country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Austria">Austria</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" name="city" placeholder="Vancouver">
            </div>
            
            <div class="form-group">
              <label for="hear-about-us">How Did You Hear About Us? <span class="required-star">*</span></label>
              <select id="hear-about-us" name="hearAboutUs" required>
                <option value="">Select an option</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend/Family Referral">Friend/Family Referral</option>
                <option value="Magazine/Publication">Magazine/Publication</option>
                <option value="Travel Agent">Travel Agent</option>
                <option value="Previous Guest">Previous Guest</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="booking-timeframe">When Do You Intend to Book? <span class="required-star">*</span></label>
              <select id="booking-timeframe" name="bookingTimeframe" required>
                <option value="">Select timeframe</option>
                <option value="This Season">This Season</option>
                <option value="Next Season">Next Season</option>
                <option value="Within 1 Year">Within 1 Year</option>
                <option value="Just Researching">Just Researching</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="contact-urgency">Contact Urgency Rating <span class="required-star">*</span></label>
              <select id="contact-urgency" name="contactUrgency" required>
                <option value="">Select urgency level</option>
                <option value="High - Contact ASAP">High - Contact ASAP</option>
                <option value="Medium - Within 2-3 days">Medium - Within 2-3 days</option>
                <option value="Low - Within a week">Low - Within a week</option>
                <option value="No rush">No rush</option>
              </select>
            </div>
            
            <div id="error-container-1"></div>
          </form>
        </div>
        
        <!-- STEP 2: Trip Details (Optional) -->
        <div id="form-step-2" class="form-step">
          <form id="trip-details-form">
            <div class="form-group">
              <label>
                Which Lodge Do You Want to Stay At? <span class="required-star">*</span>
                <span class="form-sublabel">Select one of the lodging options.</span>
              </label>
              <div class="lodge-options">
                <label class="lodge-card" for="lodge-bell2">
                  <input type="radio" id="lodge-bell2" name="lodge" value="Bell 2 Lodge">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M8 32l24-24 24 24M16 28v28h32V28"/>
                      <path d="M24 56V40h16v16"/>
                    </svg>
                    <div class="lodge-name">Bell 2 Lodge</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Remote heli ski village</li>
                    <li>Log chalets with wood stoves</li>
                    <li>Helipads on site = less commuting</li>
                    <li>More tour options early season</li>
                    <li>Strong intermediate skiers</li>
                    <li>Max 36 guests</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-lodges/#bell-2-lodge" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
                
                <label class="lodge-card" for="lodge-ripley">
                  <input type="radio" id="lodge-ripley" name="lodge" value="Ripley Creek">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="8" y="16" width="48" height="40" rx="2"/>
                      <path d="M16 32h8M16 40h8M40 32h8M40 40h8M28 48h8"/>
                      <path d="M8 24h48"/>
                    </svg>
                    <div class="lodge-name">Ripley Creek</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Historic mining town</li>
                    <li>Hotel with restaurant / bar</li>
                    <li>More commuting to terrain</li>
                    <li>30% more snow = deep days</li>
                    <li>Advanced & expert only</li>
                    <li>Max 24 guests</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-lodges/#ripley-creek" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
                
                <label class="lodge-card" for="lodge-both">
                  <input type="radio" id="lodge-both" name="lodge" value="Both">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M8 32l24-24 24 24M16 28v28h32V28"/>
                      <rect x="38" y="38" width="18" height="18" rx="2"/>
                      <path d="M44 50h6"/>
                    </svg>
                    <div class="lodge-name">Both</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Two world-class locations</li>
                    <li>Nature & funky mining town</li>
                    <li>Two mountain ranges</li>
                    <li>7 or 10 day Safari Tours</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-tours/#lodge-to-lodge-safari" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many Days Would You Like to Stay? <span class="required-star">*</span>
                <span class="form-sublabel">Select the desired trip length.</span>
              </label>
              <div class="trip-length-options">
                <label class="trip-length-card" for="days-10">
                  <input type="radio" id="days-10" name="tripLength" value="10 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">10 Days</div>
                </label>
                <label class="trip-length-card" for="days-7">
                  <input type="radio" id="days-7" name="tripLength" value="7 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">7 Days</div>
                </label>
                <label class="trip-length-card" for="days-5">
                  <input type="radio" id="days-5" name="tripLength" value="5 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">5 Days</div>
                </label>
                <label class="trip-length-card" for="days-4">
                  <input type="radio" id="days-4" name="tripLength" value="4 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">4 Days</div>
                </label>
                <label class="trip-length-card" for="days-custom">
                  <input type="radio" id="days-custom" name="tripLength" value="? days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">? Days</div>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Have You Cat Skied? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="cat-ski-yes">
                  <input type="radio" id="cat-ski-yes" name="catSkied" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="cat-ski-no">
                  <input type="radio" id="cat-ski-no" name="catSkied" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Have You Heli Skied? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="heli-ski-yes">
                  <input type="radio" id="heli-ski-yes" name="heliSkied" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="heli-ski-no">
                  <input type="radio" id="heli-ski-no" name="heliSkied" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many Days a Year Do You Ski or Ride? <span class="required-star">*</span>
                <span class="form-sublabel">Choose one.</span>
              </label>
              <div class="ski-days-options">
                <label class="ski-days-card" for="ski-days-1">
                  <input type="radio" id="ski-days-1" name="skiDaysPerYear" value="0-10 Days">
                  <span class="ski-days-icon">📅</span>
                  <span>0-10 Days</span>
                </label>
                <label class="ski-days-card" for="ski-days-2">
                  <input type="radio" id="ski-days-2" name="skiDaysPerYear" value="10-30 Days">
                  <span class="ski-days-icon">📅</span>
                  <span>10-30 Days</span>
                </label>
                <label class="ski-days-card" for="ski-days-3">
                  <input type="radio" id="ski-days-3" name="skiDaysPerYear" value="30+ Days">
                  <span class="ski-days-icon">📅</span>
                  <span>30+ Days</span>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many People Are in Your Group? <span class="required-star">*</span>
                <span class="form-sublabel">Select via the slider. 4 makes a group.</span>
              </label>
              <div class="group-size-container">
                <div class="group-size-display" id="group-size-display-text"></div>
                <div class="group-size-numbers" id="group-size-numbers">
                  <span class="group-size-number">1</span>
                  <span class="group-size-number">2</span>
                  <span class="group-size-number">3</span>
                  <span class="group-size-number">4</span>
                  <span class="group-size-number">5</span>
                  <span class="group-size-number">6</span>
                  <span class="group-size-number">7</span>
                  <span class="group-size-number">8</span>
                  <span class="group-size-number">9</span>
                  <span class="group-size-number">10</span>
                  <span class="group-size-number">11</span>
                  <span class="group-size-number">12</span>
                  <span class="group-size-number">12+</span>
                </div>
                <div class="group-size-slider-wrapper">
                  <input type="range" id="group-size" name="groupSize" min="1" max="13" value="1" step="1">
                </div>
                <div class="group-size-visual" id="heli-visual">
                  <div class="heli-group active" data-group="1">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon highlighted">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                  <div class="heli-group" data-group="2">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                  <div class="heli-group" data-group="3">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                When Would You Like to Visit? <span class="required-star">*</span>
                <span class="form-sublabel">Select a date range.</span>
              </label>
              <div class="season-selection">
                <label class="season-card" for="season-early">
                  <input type="radio" id="season-early" name="visitSeason" value="Early Dec & Jan">
                  <div class="season-title">Early</div>
                  <div class="season-dates">Dec & Jan</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">🌲</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value">More Trees</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snowfall</span>
                    <span class="season-detail-value">❄️❄️❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Daylight</span>
                    <span class="season-detail-value">☀️☀️</span>
                  </div>
                </label>
                
                <label class="season-card" for="season-middle">
                  <input type="radio" id="season-middle" name="visitSeason" value="Middle Feb & March">
                  <div class="season-title">Middle</div>
                  <div class="season-dates">Feb & March</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">🏔️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value">Mix Alpine & Trees</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snowfall</span>
                    <span class="season-detail-value">❄️❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Daylight</span>
                    <span class="season-detail-value">☀️☀️☀️</span>
                  </div>
                </label>
                
                <label class="season-card" for="season-late">
                  <input type="radio" id="season-late" name="visitSeason" value="Late April">
                  <div class="season-title">Late</div>
                  <div class="season-dates">April</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">⛰️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value">Mostly Alpine</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snowfall</span>
                    <span class="season-detail-value">❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Daylight</span>
                    <span class="season-detail-value">☀️☀️☀️☀️</span>
                  </div>
                </label>
              </div>
              <div style="text-align: center; margin-top: 14px;">
                <a href="https://www.lastfrontierheli.com/heliskiing-tours/#when-should-i-visit" target="_blank" class="season-learn-more">Learn More</a>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Are You Requesting a Private Tour? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="private-yes">
                  <input type="radio" id="private-yes" name="privateTour" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="private-no">
                  <input type="radio" id="private-no" name="privateTour" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Additional Questions?</label>
              <textarea id="additional-questions" name="additionalQuestions" placeholder="Enter additional details such as desired travel dates...">${conversationSummary || ''}</textarea>
            </div>
            
            <div class="checkbox-group">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="privacy-consent" name="privacyConsent" required>
              </div>
              <label for="privacy-consent">
                By clicking submit you agree to our <a href="https://www.lastfrontierheli.com/privacy-policy/" target="_blank">privacy policy</a>.
              </label>
            </div>
            
            <div id="error-container-2"></div>
          </form>
        </div>
        
        <div id="loading-step" class="form-step">
          <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">Preparing your heliskiing adventure...</div>
          </div>
        </div>
        
        <div id="success-step" class="form-step">
          <div class="success-container">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="success-title">Request Received!</h3>
            <p class="success-message">
              Thank you for your interest in Last Frontier Heliskiing! Our team will review your request and contact you within 24 hours to discuss your epic heliskiing adventure. Get ready for the experience of a lifetime!
            </p>
          </div>
        </div>
      </div>

      <div class="btn-container" id="btn-container">
        <button id="back-btn" class="btn btn-secondary" style="display: none;">Back</button>
        <button id="next-btn" class="btn btn-primary">Continue to Trip Details</button>
      </div>
    `;

    container.appendChild(wrapper);
    element.appendChild(container);

    if (animateIn) {
      setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }

    // Progress update function
    function updateProgress(step) {
      const progressFill = wrapper.querySelector('#progress-fill');
      const progressSteps = wrapper.querySelectorAll('.progress-step');
      
      progressSteps.forEach((stepEl, index) => {
        if (index + 1 < step) {
          stepEl.classList.add('completed');
          stepEl.classList.remove('active');
        } else if (index + 1 === step) {
          stepEl.classList.add('active');
          stepEl.classList.remove('completed');
        } else {
          stepEl.classList.remove('active', 'completed');
        }
      });
      
      const fillPercentage = ((step - 1) / 1) * 100;
      progressFill.style.width = fillPercentage + '%';
    }

    // Group size slider functionality
    const groupSizeSlider = wrapper.querySelector('#group-size');
    const groupSizeNumbers = wrapper.querySelectorAll('.group-size-number');
    const heliGroups = wrapper.querySelectorAll('.heli-group');
    
    if (groupSizeSlider) {
      groupSizeSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        
        // Update slider background gradient
        const percentage = ((value - 1) / 12) * 100;
        e.target.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${percentage}%, #d0d0d0 ${percentage}%, #d0d0d0 100%)`;
        
        // Highlight the active number
        groupSizeNumbers.forEach((num, index) => {
          if (index === value - 1) {
            num.style.color = primaryColor;
            num.style.fontWeight = '900';
            num.style.transform = 'scale(1.2)';
          } else {
            num.style.color = '#999';
            num.style.fontWeight = '600';
            num.style.transform = 'scale(1)';
          }
        });
        
        // Update helicopter group visualization
        heliGroups.forEach(group => group.classList.remove('active'));
        
        if (value <= 4) {
          // First group active, highlight appropriate number of people
          const firstGroup = heliGroups[0];
          if (firstGroup) {
            firstGroup.classList.add('active');
            const peopleIcons = firstGroup.querySelectorAll('.person-icon');
            peopleIcons.forEach((icon, index) => {
              if (index < value) {
                icon.classList.add('highlighted');
              } else {
                icon.classList.remove('highlighted');
              }
            });
          }
        } else if (value <= 8) {
          // First two groups active
          heliGroups[0]?.classList.add('active');
          heliGroups[1]?.classList.add('active');
          
          const firstGroupPeople = heliGroups[0]?.querySelectorAll('.person-icon');
          firstGroupPeople?.forEach(icon => icon.classList.add('highlighted'));
          
          const secondGroupPeople = heliGroups[1]?.querySelectorAll('.person-icon');
          const remainingInSecondGroup = value - 4;
          secondGroupPeople?.forEach((icon, index) => {
            if (index < remainingInSecondGroup) {
              icon.classList.add('highlighted');
            } else {
              icon.classList.remove('highlighted');
            }
          });
        } else {
          // All three groups active
          heliGroups.forEach((group, groupIndex) => {
            group.classList.add('active');
            const peopleIcons = group.querySelectorAll('.person-icon');
            
            if (groupIndex === 0 || groupIndex === 1) {
              peopleIcons.forEach(icon => icon.classList.add('highlighted'));
            } else if (groupIndex === 2) {
              const remainingInThirdGroup = Math.min(value - 8, 4);
              peopleIcons.forEach((icon, index) => {
                if (index < remainingInThirdGroup) {
                  icon.classList.add('highlighted');
                } else {
                  icon.classList.remove('highlighted');
                }
              });
            }
          });
        }
      });
      
      // Initialize on load
      groupSizeSlider.dispatchEvent(new Event('input'));
    }

    // Lodge selection handlers
    const lodgeCards = wrapper.querySelectorAll('.lodge-card');
    lodgeCards.forEach(card => {
      card.addEventListener('click', () => {
        lodgeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Trip length handlers
    const tripLengthCards = wrapper.querySelectorAll('.trip-length-card');
    tripLengthCards.forEach(card => {
      card.addEventListener('click', () => {
        tripLengthCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Yes/No toggle handlers
    const toggleOptions = wrapper.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
      option.addEventListener('click', () => {
        const name = option.querySelector('input').name;
        wrapper.querySelectorAll(`input[name="${name}"]`).forEach(input => {
          input.parentElement.classList.remove('selected');
        });
        option.classList.add('selected');
        option.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Ski days handlers
    const skiDaysCards = wrapper.querySelectorAll('.ski-days-card');
    skiDaysCards.forEach(card => {
      card.addEventListener('click', () => {
        skiDaysCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Season selection handlers
    const seasonCards = wrapper.querySelectorAll('.season-card');
    seasonCards.forEach(card => {
      card.addEventListener('click', () => {
        seasonCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    function showStep(stepId) {
      const steps = wrapper.querySelectorAll('.form-step');
      steps.forEach(step => step.classList.remove('active'));
      
      const targetStep = wrapper.querySelector(`#${stepId}`);
      if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepId;
        
        const btnContainer = wrapper.querySelector('#btn-container');
        const backBtn = wrapper.querySelector('#back-btn');
        const nextBtn = wrapper.querySelector('#next-btn');
        
        if (stepId === 'form-step-1') {
          btnContainer.style.display = 'flex';
          backBtn.style.display = 'none';
          nextBtn.style.display = 'block';
          nextBtn.textContent = 'Continue to Trip Details';
          updateProgress(1);
        } else if (stepId === 'form-step-2') {
          btnContainer.style.display = 'flex';
          backBtn.style.display = 'block';
          nextBtn.style.display = 'block';
          nextBtn.textContent = 'SUBMIT';
          updateProgress(2);
        } else {
          btnContainer.style.display = 'none';
        }
      }
    }

    function showError(message, step) {
      const errorContainer = wrapper.querySelector(`#error-container-${step}`);
      if (errorContainer) {
        errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
      }
    }

    function clearError(step) {
      const errorContainer = wrapper.querySelector(`#error-container-${step}`);
      if (errorContainer) {
        errorContainer.innerHTML = '';
      }
    }

    function validateStep1() {
      const form = wrapper.querySelector('#contact-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = borderColor;
        }
      });
      
      const emailField = wrapper.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value && !emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
      }
      
      return isValid;
    }

    function validateStep2() {
      const privacyConsent = wrapper.querySelector('#privacy-consent');
      if (!privacyConsent.checked) {
        return false;
      }
      return true;
    }

    async function sendToWebhook(formData) {
      try {
        let cleanConversationHistory = conversationHistory;
        if (conversationHistory && typeof conversationHistory === 'string') {
          cleanConversationHistory = conversationHistory
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/"/g, '\\"');
        }

        const payload = {
          lead: formData,
          conversationData: {
            history: cleanConversationHistory,
            conversationId: conversationId,
            userId: userId,
            timestamp: new Date().toISOString()
          },
          source: 'Voiceflow Lead Form - Last Frontier Heliskiing',
          formType: 'Last Frontier Heliskiing Lead Capture',
          timestamp: new Date().toISOString()
        };

        console.log('Sending payload to webhook:', JSON.stringify(payload, null, 2));

        await new Promise(resolve => setTimeout(resolve, 1800));
        
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Successfully sent lead to webhook');
        return true;
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        return true; // Return true anyway to show success to user
      }
    }

    const backBtn = wrapper.querySelector('#back-btn');
    const nextBtn = wrapper.querySelector('#next-btn');

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep === 'form-step-2') {
          showStep('form-step-1');
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        if (currentStep === 'form-step-1') {
          clearError(1);
          
          if (!validateStep1()) {
            showError('Please fill out all required fields correctly.', 1);
            return;
          }
          
          showStep('form-step-2');
        } else if (currentStep === 'form-step-2') {
          clearError(2);
          
          if (!validateStep2()) {
            showError('Please accept the privacy policy to continue.', 2);
            return;
          }
          
          isSubmitting = true;
          showStep('loading-step');
          
          // Collect all form data
          const formData = {
            // Step 1 data
            firstName: wrapper.querySelector('#first-name').value.trim(),
            lastName: wrapper.querySelector('#last-name').value.trim(),
            email: wrapper.querySelector('#email').value.trim(),
            phone: wrapper.querySelector('#phone').value.trim(),
            country: wrapper.querySelector('#country').value,
            city: wrapper.querySelector('#city').value.trim(),
            hearAboutUs: wrapper.querySelector('#hear-about-us').value,
            bookingTimeframe: wrapper.querySelector('#booking-timeframe').value,
            contactUrgency: wrapper.querySelector('#contact-urgency').value,
            
            // Step 2 data
            lodge: wrapper.querySelector('input[name="lodge"]:checked')?.value || '',
            tripLength: wrapper.querySelector('input[name="tripLength"]:checked')?.value || '',
            catSkied: wrapper.querySelector('input[name="catSkied"]:checked')?.value || '',
            heliSkied: wrapper.querySelector('input[name="heliSkied"]:checked')?.value || '',
            skiDaysPerYear: wrapper.querySelector('input[name="skiDaysPerYear"]:checked')?.value || '',
            groupSize: wrapper.querySelector('#group-size').value === '13' ? '12+' : wrapper.querySelector('#group-size').value,
            visitSeason: wrapper.querySelector('input[name="visitSeason"]:checked')?.value || '',
            privateTour: wrapper.querySelector('input[name="privateTour"]:checked')?.value || '',
            additionalQuestions: wrapper.querySelector('#additional-questions').value.trim()
          };
          
          const success = await sendToWebhook(formData);
          
          if (success) {
            showStep('success-step');
          } else {
            showStep('form-step-2');
            showError('Oops! Something went wrong. Please try again.', 2);
          }
          
          isSubmitting = false;
        }
      });
    }

    // Input field styling on blur/input
    const inputs = wrapper.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = borderColor;
        }
      });
      
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
          input.style.borderColor = borderColor;
        }
      });
    });

    return function cleanup() {
      // Cleanup if needed
    };
  }
};

// YRS: LAST FRONTIER HELISKIING LEAD CAPTURE FORM EXTENSION VERSION 3 (13 NOV 2025)

export const LastFrontierHeliskiingLeadForm3 = {
  name: 'LastFrontierHeliskiingLeadForm3',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_lastFrontierHeliskiingLeadForm3' || trace.payload?.name === 'ext_lastFrontierHeliskiingLeadForm3',
  render: ({ trace, element }) => {
    // --- Configuration from Voiceflow Payload ---
    const {
      formTitle = 'Plan Your Heli Ski Adventure',
      formSubtitle = 'Experience world-class heliskiing in British Columbia, Canada',
      height = '720',
      backgroundColor = '#FFFFFF',
      maxWidth = '460px',
      primaryColor = '#ee2d24',
      secondaryColor = '#1a1a1a',
      accentColor = '#FFFFFF',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      borderWidth = '1px',
      borderStyle = 'solid',
      borderRadius = '16px',
      shadowColor = 'rgba(238, 45, 36, 0.25)',
      shadowSize = '12px',
      animateIn = true,
      logoUrl = 'https://yannicksegaar.github.io/RomAIx-Logo/LastFrontierHeliskiing_Logo_FullName.svg',
      showLogo = true,
      conversationHistory = null,
      conversationSummary = '',
      conversationId = null,
      userId = null,
    } = trace.payload || {};

    const N8N_WEBHOOK_URL = 'https://n8n.romaix-n8n.xyz/webhook/9d6eaed8-9595-473f-9173-9d7b184a06df';

    let currentStep = 'form-step-1';
    let isSubmitting = false;

    element.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: center; align-items: flex-start; background-color: transparent; margin: 0; padding: 8px 0;';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'last-frontier-lead-form-wrapper';
    wrapper.style.cssText = `
      width: ${maxWidth}; min-width: ${maxWidth}; max-width: ${maxWidth};
      border: ${borderWidth} ${borderStyle} ${borderColor}; border-radius: ${borderRadius};
      overflow: hidden; background: ${backgroundColor};
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px ${shadowSize} ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.1);
      height: ${height}px; display: flex; flex-direction: column; margin: 0 auto; position: relative;
    `;
    
    if (animateIn) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(15px) scale(0.98)';
      wrapper.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    wrapper.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        .last-frontier-lead-form-wrapper * { box-sizing: border-box; }
        
        .form-header { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          color: white; 
          padding: 18px 24px; 
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .form-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        .logo-container { 
          margin-bottom: 12px; 
          position: relative;
          z-index: 1;
        }
        .logo-container img { 
          max-height: 45px; 
          max-width: 200px; 
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .form-header h2 { 
          margin: 0 0 6px 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 21px; 
          font-weight: 900; 
          letter-spacing: -0.4px;
          position: relative;
          z-index: 1;
          text-transform: uppercase;
        }
        .form-header p { 
          margin: 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 13px; 
          opacity: 0.95; 
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }
        
        /* Progress Indicator */
        .progress-container {
          padding: 16px 24px 14px 24px;
          background: ${lightGray};
          border-bottom: 1px solid ${borderColor};
        }
        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .progress-line {
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 3px;
          background: ${borderColor};
          z-index: 0;
        }
        .progress-line-fill {
          height: 100%;
          background: ${primaryColor};
          transition: width 0.4s ease;
          width: 0%;
        }
        .progress-step {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .progress-step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${accentColor};
          border: 3px solid ${borderColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          color: #64748B;
          transition: all 0.3s ease;
        }
        .progress-step.active .progress-step-circle {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: white;
          transform: scale(1.1);
        }
        .progress-step.completed .progress-step-circle {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: white;
        }
        .progress-step-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .progress-step.active .progress-step-label {
          color: ${primaryColor};
        }
        .progress-step.completed .progress-step-label {
          color: ${primaryColor};
        }
        .step-optional {
          font-size: 9px;
          color: #94A3B8;
          font-weight: 400;
          text-transform: lowercase;
        }
        
        .form-content { 
          flex: 1; 
          padding: 20px 24px 16px 24px; 
          font-family: 'Inter', sans-serif; 
          background: ${backgroundColor};
          overflow-y: auto;
          overflow-x: hidden;
        }
        
        .form-step { 
          display: none; 
          animation: fadeInUp 0.3s ease-out;
        }
        .form-step.active { 
          display: block; 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(12px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        .form-group { 
          margin-bottom: 20px; 
          position: relative; 
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group label { 
          display: block; 
          margin-bottom: 12px; 
          font-weight: 900; 
          color: ${textColor}; 
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }
        .required-star {
          color: ${primaryColor};
          margin-left: 3px;
          font-size: 16px;
        }
        .form-group .form-sublabel {
          display: block;
          font-size: 12px;
          font-weight: 400;
          text-transform: none;
          color: #666;
          margin-top: 4px;
          letter-spacing: 0;
        }
        .form-group input, .form-group select, .form-group textarea { 
          width: 100%; 
          padding: 12px 14px; 
          border-radius: 10px; 
          border: 1.5px solid ${borderColor}; 
          font-size: 14px; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .form-group textarea {
          min-height: 90px;
          resize: vertical;
          line-height: 1.5;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { 
          color: #94A3B8; 
          font-size: 13px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: ${primaryColor}; 
          box-shadow: 0 0 0 3px rgba(238, 45, 36, 0.15);
          background: ${accentColor};
          transform: translateY(-1px);
        }
        
        /* Date Input Styling */
        .form-group input[type="date"] {
          cursor: pointer;
          position: relative;
        }
        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
        
        /* Select Dropdown Styling */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
          cursor: pointer;
        }
        
        /* Lodge Selection Cards */
        .lodge-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 500px) {
          .lodge-options {
            grid-template-columns: 1fr;
          }
        }
        .lodge-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 16px 12px 14px 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 280px;
        }
        .lodge-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .lodge-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .lodge-card input[type="radio"] {
          display: none;
        }
        .lodge-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .lodge-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          opacity: 0.6;
        }
        .lodge-name {
          font-size: 16px;
          font-weight: 900;
          color: ${textColor};
          text-transform: uppercase;
          letter-spacing: 0.3px;
          line-height: 1.2;
        }
        .lodge-details {
          font-size: 11px;
          color: #666;
          line-height: 1.6;
          text-align: left;
          list-style: none;
          padding: 0;
          margin: 0 0 auto 0;
          flex: 1;
        }
        .lodge-details li {
          margin-bottom: 5px;
          position: relative;
          padding-left: 10px;
        }
        .lodge-details li:before {
          content: '•';
          position: absolute;
          left: 0;
          color: ${primaryColor};
          font-weight: bold;
        }
        .lodge-link {
          display: inline-block;
          margin-top: 10px;
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid ${primaryColor};
          padding-bottom: 2px;
        }
        .lodge-link:hover {
          opacity: 0.8;
        }
        
        /* Trip Length Selection */
        .trip-length-options {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .trip-length-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 16px 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          min-width: 75px;
          position: relative;
        }
        .trip-length-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .trip-length-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .trip-length-card input[type="radio"] {
          display: none;
        }
        .trip-length-icon {
          font-size: 28px;
          margin-bottom: 8px;
          opacity: 0.6;
        }
        .trip-length-label {
          font-weight: 900;
          font-size: 15px;
          color: ${textColor};
          text-transform: uppercase;
        }
        
        /* Yes/No Toggle */
        .yes-no-toggle {
          display: flex;
          gap: 14px;
          justify-content: center;
        }
        .toggle-option {
          flex: 0 0 120px;
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 14px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          font-weight: 700;
          font-size: 15px;
          color: ${textColor};
          text-transform: uppercase;
        }
        .toggle-option:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .toggle-option.selected {
          border-color: ${primaryColor};
          background: white;
          color: ${textColor};
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .toggle-option input[type="radio"] {
          display: none;
        }
        
        /* Ski Days Selector */
        .ski-days-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
          margin: 0 auto;
        }
        .ski-days-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          font-weight: 900;
          font-size: 15px;
          color: ${textColor};
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-transform: uppercase;
        }
        .ski-days-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .ski-days-card.selected {
          border-color: ${primaryColor};
          background: white;
          color: ${textColor};
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .ski-days-card input[type="radio"] {
          display: none;
        }
        .ski-days-icon {
          font-size: 24px;
          opacity: 0.6;
        }
        
        /* Group Size Slider */
        .group-size-container {
          padding: 14px 0;
        }
        .group-size-display {
          text-align: center;
          font-size: 18px;
          font-weight: 400;
          color: #666;
          margin-bottom: 18px;
        }
        .group-size-slider-wrapper {
          position: relative;
          padding: 30px 0;
        }
        .group-size-numbers {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 0 8px;
        }
        .group-size-number {
          font-size: 13px;
          font-weight: 600;
          color: #999;
          min-width: 28px;
          text-align: center;
        }
        .group-size-visual {
          display: flex;
          justify-content: space-around;
          margin-top: 30px;
          gap: 20px;
        }
        .heli-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
        .heli-group.active {
          opacity: 1;
        }
        .heli-icon {
          font-size: 32px;
          color: #999;
        }
        .people-icons {
          display: flex;
          gap: 4px;
        }
        .person-icon {
          font-size: 20px;
        }
        .person-icon.highlighted {
          color: ${primaryColor};
        }
        input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 5px;
          background: linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} 0%, #d0d0d0 0%, #d0d0d0 100%);
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${primaryColor};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.4);
          border: 3px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${primaryColor};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.4);
        }
        
        /* Season Selection Cards */
        .season-selection {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 14px;
        }
        @media (max-width: 500px) {
          .season-selection {
            grid-template-columns: 1fr;
          }
        }
        .season-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 16px 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        .season-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .season-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .season-card input[type="radio"] {
          display: none;
        }
        .season-title {
          font-weight: 900;
          font-size: 15px;
          color: ${textColor};
          margin-bottom: 2px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .season-dates {
          font-size: 12px;
          color: #666;
          margin-bottom: 14px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .season-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 6px 4px;
          border-top: 1px solid #e5e5e5;
          font-size: 10px;
          min-height: 32px;
        }
        .season-detail-row:first-of-type {
          border-top: 2px solid #d0d0d0;
          margin-top: 4px;
        }
        .season-detail-label {
          color: #666;
          font-weight: 700;
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          flex: 1;
          padding-right: 4px;
          line-height: 1.3;
        }
        .season-detail-value {
          color: ${textColor};
          font-weight: 700;
          text-align: right;
          flex: 0 0 auto;
          line-height: 1.3;
        }
        .season-terrain-icon {
          font-size: 18px;
          line-height: 1;
        }
        .season-learn-more {
          display: inline-block;
          margin-top: 12px;
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid ${primaryColor};
          padding-bottom: 2px;
        }
        
        /* Season Info Table - Hidden by default, shown below cards */
        .season-info-table {
          display: none;
        }
        
        .checkbox-group { 
          display: flex; 
          align-items: flex-start; 
          margin: 14px 0 0 0; 
          gap: 10px;
        }
        .checkbox-wrapper {
          position: relative;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .checkbox-wrapper input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid ${borderColor};
          border-radius: 4px;
          background: ${accentColor};
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .checkbox-wrapper input[type="checkbox"]:checked {
          background: ${primaryColor};
          border-color: ${primaryColor};
          transform: scale(1.05);
        }
        .checkbox-wrapper input[type="checkbox"]:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .checkbox-group label { 
          margin-bottom: 0; 
          text-transform: none; 
          letter-spacing: 0; 
          font-weight: 400; 
          font-size: 12px; 
          line-height: 1.5; 
          cursor: pointer;
          color: #64748B;
        }
        .checkbox-group label a {
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 500;
        }
        .checkbox-group label a:hover {
          text-decoration: underline;
        }
        
        .error-message { 
          color: #EF4444; 
          background: #FEE2E2; 
          padding: 10px 14px; 
          border-radius: 8px; 
          font-size: 12px; 
          margin-top: 12px;
          font-weight: 500;
        }
        
        .loading-container { 
          text-align: center; 
          padding: 60px 20px; 
        }
        .spinner { 
          margin: 0 auto 20px; 
          width: 50px; 
          height: 50px; 
          border: 4px solid ${lightGray}; 
          border-top-color: ${primaryColor}; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        .loading-text { 
          font-size: 16px; 
          color: ${textColor}; 
          font-weight: 500;
        }
        
        .success-container { 
          text-align: center; 
          padding: 50px 28px; 
        }
        .success-icon { 
          width: 70px; 
          height: 70px; 
          margin: 0 auto 20px; 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 20px rgba(238, 45, 36, 0.3);
        }
        .success-icon svg { 
          width: 38px; 
          height: 38px; 
          color: white; 
        }
        .success-title { 
          font-size: 22px; 
          font-weight: 700; 
          color: ${textColor}; 
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }
        .success-message { 
          font-size: 14px; 
          color: #64748B; 
          line-height: 1.6; 
          margin: 0;
        }
        
        .btn-container { 
          padding: 0 24px 20px 24px; 
          background: ${backgroundColor};
          position: relative;
          display: flex;
          gap: 12px;
        }
        .btn { 
          flex: 1;
          padding: 14px 24px; 
          border: none; 
          border-radius: 10px; 
          font-size: 15px; 
          font-weight: 600; 
          cursor: pointer; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }
        .btn-primary { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          color: white;
          box-shadow: 0 4px 12px rgba(238, 45, 36, 0.3);
        }
        .btn-primary:hover { 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(238, 45, 36, 0.4);
        }
        .btn-primary:active { 
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.3);
        }
        .btn-secondary {
          background: ${accentColor};
          color: ${textColor};
          border: 2px solid ${borderColor};
        }
        .btn-secondary:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
        }
        
        /* Scrollbar Styling */
        .form-content::-webkit-scrollbar {
          width: 6px;
        }
        .form-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>
      
      <div class="form-header">
        ${showLogo ? `
          <div class="logo-container">
            <img src="${logoUrl}" alt="Last Frontier Heliskiing" />
          </div>
        ` : ''}
        <h2>${formTitle}</h2>
        <p>${formSubtitle}</p>
      </div>
      
      <div class="progress-container">
        <div class="progress-steps">
          <div class="progress-line">
            <div class="progress-line-fill" id="progress-fill"></div>
          </div>
          <div class="progress-step active" data-step="1">
            <div class="progress-step-circle">1</div>
            <div class="progress-step-label">Contact Info</div>
          </div>
          <div class="progress-step" data-step="2">
            <div class="progress-step-circle">2</div>
            <div class="progress-step-label">Trip Details <span class="step-optional">(optional)</span></div>
          </div>
        </div>
      </div>
      
      <div class="form-content">
        <!-- STEP 1: Contact Information -->
        <div id="form-step-1" class="form-step active">
          <form id="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name <span class="required-star">*</span></label>
                <input type="text" id="first-name" name="firstName" placeholder="John" required>
              </div>
              
              <div class="form-group">
                <label for="last-name">Last Name <span class="required-star">*</span></label>
                <input type="text" id="last-name" name="lastName" placeholder="Smith" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">E-mail Address <span class="required-star">*</span></label>
              <input type="email" id="email" name="email" placeholder="john.smith@example.com" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Telephone Number <span class="required-star">*</span></label>
              <input type="tel" id="phone" name="phone" placeholder="+1 (888) 655 5566" required>
            </div>
            
            <div class="form-group">
              <label for="country">Country <span class="required-star">*</span></label>
              <select id="country" name="country" required>
                <option value="">Select your country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Austria">Austria</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" name="city" placeholder="Vancouver">
            </div>
            
            <div class="form-group">
              <label for="hear-about-us">How Did You Hear About Us? <span class="required-star">*</span></label>
              <select id="hear-about-us" name="hearAboutUs" required>
                <option value="">Select an option</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend/Family Referral">Friend/Family Referral</option>
                <option value="Magazine/Publication">Magazine/Publication</option>
                <option value="Travel Agent">Travel Agent</option>
                <option value="Previous Guest">Previous Guest</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="booking-timeframe">When Do You Intend to Book? <span class="required-star">*</span></label>
              <select id="booking-timeframe" name="bookingTimeframe" required>
                <option value="">Select timeframe</option>
                <option value="This Season">This Season</option>
                <option value="Next Season">Next Season</option>
                <option value="Within 1 Year">Within 1 Year</option>
                <option value="Just Researching">Just Researching</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="contact-urgency">Contact Urgency Rating <span class="required-star">*</span></label>
              <select id="contact-urgency" name="contactUrgency" required>
                <option value="">Select urgency level</option>
                <option value="High - Contact ASAP">High - Contact ASAP</option>
                <option value="Medium - Within 2-3 days">Medium - Within 2-3 days</option>
                <option value="Low - Within a week">Low - Within a week</option>
                <option value="No rush">No rush</option>
              </select>
            </div>
            
            <div id="error-container-1"></div>
          </form>
        </div>
        
        <!-- STEP 2: Trip Details (Optional) -->
        <div id="form-step-2" class="form-step">
          <form id="trip-details-form">
            <div class="form-group">
              <label>
                Which Lodge Do You Want to Stay At? <span class="required-star">*</span>
                <span class="form-sublabel">Select one of the lodging options.</span>
              </label>
              <div class="lodge-options">
                <label class="lodge-card" for="lodge-bell2">
                  <input type="radio" id="lodge-bell2" name="lodge" value="Bell 2 Lodge">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M8 32l24-24 24 24M16 28v28h32V28"/>
                      <path d="M24 56V40h16v16"/>
                    </svg>
                    <div class="lodge-name">Bell 2 Lodge</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Remote heli ski village</li>
                    <li>Log chalets with wood stoves</li>
                    <li>Helipads on site = less commuting</li>
                    <li>More tour options early season</li>
                    <li>Strong intermediate skiers</li>
                    <li>Max 36 guests</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-lodges/#bell-2-lodge" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
                
                <label class="lodge-card" for="lodge-ripley">
                  <input type="radio" id="lodge-ripley" name="lodge" value="Ripley Creek">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="8" y="16" width="48" height="40" rx="2"/>
                      <path d="M16 32h8M16 40h8M40 32h8M40 40h8M28 48h8"/>
                      <path d="M8 24h48"/>
                    </svg>
                    <div class="lodge-name">Ripley Creek</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Historic mining town</li>
                    <li>Hotel with restaurant / bar</li>
                    <li>More commuting to terrain</li>
                    <li>30% more snow = deep days</li>
                    <li>Advanced & expert only</li>
                    <li>Max 24 guests</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-lodges/#ripley-creek" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
                
                <label class="lodge-card" for="lodge-both">
                  <input type="radio" id="lodge-both" name="lodge" value="Both">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M8 32l24-24 24 24M16 28v28h32V28"/>
                      <rect x="38" y="38" width="18" height="18" rx="2"/>
                      <path d="M44 50h6"/>
                    </svg>
                    <div class="lodge-name">Both</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Two world-class locations</li>
                    <li>Nature & funky mining town</li>
                    <li>Two mountain ranges</li>
                    <li>7 or 10 day Safari Tours</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-tours/#lodge-to-lodge-safari" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many Days Would You Like to Stay? <span class="required-star">*</span>
                <span class="form-sublabel">Select the desired trip length.</span>
              </label>
              <div class="trip-length-options">
                <label class="trip-length-card" for="days-10">
                  <input type="radio" id="days-10" name="tripLength" value="10 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">10 Days</div>
                </label>
                <label class="trip-length-card" for="days-7">
                  <input type="radio" id="days-7" name="tripLength" value="7 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">7 Days</div>
                </label>
                <label class="trip-length-card" for="days-5">
                  <input type="radio" id="days-5" name="tripLength" value="5 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">5 Days</div>
                </label>
                <label class="trip-length-card" for="days-4">
                  <input type="radio" id="days-4" name="tripLength" value="4 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">4 Days</div>
                </label>
                <label class="trip-length-card" for="days-custom">
                  <input type="radio" id="days-custom" name="tripLength" value="? days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">? Days</div>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Have You Cat Skied? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="cat-ski-yes">
                  <input type="radio" id="cat-ski-yes" name="catSkied" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="cat-ski-no">
                  <input type="radio" id="cat-ski-no" name="catSkied" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Have You Heli Skied? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="heli-ski-yes">
                  <input type="radio" id="heli-ski-yes" name="heliSkied" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="heli-ski-no">
                  <input type="radio" id="heli-ski-no" name="heliSkied" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many Days a Year Do You Ski or Ride? <span class="required-star">*</span>
                <span class="form-sublabel">Choose one.</span>
              </label>
              <div class="ski-days-options">
                <label class="ski-days-card" for="ski-days-1">
                  <input type="radio" id="ski-days-1" name="skiDaysPerYear" value="0-10 Days">
                  <span class="ski-days-icon">📅</span>
                  <span>0-10 Days</span>
                </label>
                <label class="ski-days-card" for="ski-days-2">
                  <input type="radio" id="ski-days-2" name="skiDaysPerYear" value="10-30 Days">
                  <span class="ski-days-icon">📅</span>
                  <span>10-30 Days</span>
                </label>
                <label class="ski-days-card" for="ski-days-3">
                  <input type="radio" id="ski-days-3" name="skiDaysPerYear" value="30+ Days">
                  <span class="ski-days-icon">📅</span>
                  <span>30+ Days</span>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many People Are in Your Group? <span class="required-star">*</span>
                <span class="form-sublabel">Select via the slider. 4 makes a group.</span>
              </label>
              <div class="group-size-container">
                <div class="group-size-display" id="group-size-display-text"></div>
                <div class="group-size-numbers" id="group-size-numbers">
                  <span class="group-size-number">1</span>
                  <span class="group-size-number">2</span>
                  <span class="group-size-number">3</span>
                  <span class="group-size-number">4</span>
                  <span class="group-size-number">5</span>
                  <span class="group-size-number">6</span>
                  <span class="group-size-number">7</span>
                  <span class="group-size-number">8</span>
                  <span class="group-size-number">9</span>
                  <span class="group-size-number">10</span>
                  <span class="group-size-number">11</span>
                  <span class="group-size-number">12</span>
                  <span class="group-size-number">12+</span>
                </div>
                <div class="group-size-slider-wrapper">
                  <input type="range" id="group-size" name="groupSize" min="1" max="13" value="1" step="1">
                </div>
                <div class="group-size-visual" id="heli-visual">
                  <div class="heli-group active" data-group="1">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon highlighted">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                  <div class="heli-group" data-group="2">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                  <div class="heli-group" data-group="3">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                When Would You Like to Visit? <span class="required-star">*</span>
                <span class="form-sublabel">Select a date range.</span>
              </label>
              <div class="season-selection">
                <label class="season-card" for="season-early">
                  <input type="radio" id="season-early" name="visitSeason" value="Early Dec & Jan">
                  <div class="season-title">Early</div>
                  <div class="season-dates">Dec & Jan</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">🌲</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value">More Trees</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snowfall</span>
                    <span class="season-detail-value">❄️❄️❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Daylight</span>
                    <span class="season-detail-value">☀️☀️</span>
                  </div>
                </label>
                
                <label class="season-card" for="season-middle">
                  <input type="radio" id="season-middle" name="visitSeason" value="Middle Feb & March">
                  <div class="season-title">Middle</div>
                  <div class="season-dates">Feb & March</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">🏔️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value">Mix Alpine & Trees</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snowfall</span>
                    <span class="season-detail-value">❄️❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Daylight</span>
                    <span class="season-detail-value">☀️☀️☀️</span>
                  </div>
                </label>
                
                <label class="season-card" for="season-late">
                  <input type="radio" id="season-late" name="visitSeason" value="Late April">
                  <div class="season-title">Late</div>
                  <div class="season-dates">April</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">⛰️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value">Mostly Alpine</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snowfall</span>
                    <span class="season-detail-value">❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Daylight</span>
                    <span class="season-detail-value">☀️☀️☀️☀️</span>
                  </div>
                </label>
              </div>
              <div style="text-align: center; margin-top: 12px;">
                <a href="https://www.lastfrontierheli.com/heliskiing-tours/#when-should-i-visit" target="_blank" class="season-learn-more">Learn More</a>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Are You Requesting a Private Tour? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="private-yes">
                  <input type="radio" id="private-yes" name="privateTour" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="private-no">
                  <input type="radio" id="private-no" name="privateTour" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Additional Questions?</label>
              <textarea id="additional-questions" name="additionalQuestions" placeholder="Enter additional details such as desired travel dates...">${conversationSummary || ''}</textarea>
            </div>
            
            <div class="checkbox-group">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="privacy-consent" name="privacyConsent" required>
              </div>
              <label for="privacy-consent">
                By clicking submit you agree to our <a href="https://www.lastfrontierheli.com/privacy-policy/" target="_blank">privacy policy</a>.
              </label>
            </div>
            
            <div id="error-container-2"></div>
          </form>
        </div>
        
        <div id="loading-step" class="form-step">
          <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">Preparing your heliskiing adventure...</div>
          </div>
        </div>
        
        <div id="success-step" class="form-step">
          <div class="success-container">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="success-title">Request Received!</h3>
            <p class="success-message">
              Thank you for your interest in Last Frontier Heliskiing! Our team will review your request and contact you within 24 hours to discuss your epic heliskiing adventure. Get ready for the experience of a lifetime!
            </p>
          </div>
        </div>
      </div>

      <div class="btn-container" id="btn-container">
        <button id="back-btn" class="btn btn-secondary" style="display: none;">Back</button>
        <button id="next-btn" class="btn btn-primary">Continue to Trip Details</button>
      </div>
    `;

    container.appendChild(wrapper);
    element.appendChild(container);

    if (animateIn) {
      setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }

    // Progress update function
    function updateProgress(step) {
      const progressFill = wrapper.querySelector('#progress-fill');
      const progressSteps = wrapper.querySelectorAll('.progress-step');
      
      progressSteps.forEach((stepEl, index) => {
        if (index + 1 < step) {
          stepEl.classList.add('completed');
          stepEl.classList.remove('active');
        } else if (index + 1 === step) {
          stepEl.classList.add('active');
          stepEl.classList.remove('completed');
        } else {
          stepEl.classList.remove('active', 'completed');
        }
      });
      
      const fillPercentage = ((step - 1) / 1) * 100;
      progressFill.style.width = fillPercentage + '%';
    }

    // Group size slider functionality
    const groupSizeSlider = wrapper.querySelector('#group-size');
    const groupSizeNumbers = wrapper.querySelectorAll('.group-size-number');
    const heliGroups = wrapper.querySelectorAll('.heli-group');
    
    if (groupSizeSlider) {
      groupSizeSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        
        // Update slider background gradient
        const percentage = ((value - 1) / 12) * 100;
        e.target.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${percentage}%, #d0d0d0 ${percentage}%, #d0d0d0 100%)`;
        
        // Highlight the active number
        groupSizeNumbers.forEach((num, index) => {
          if (index === value - 1) {
            num.style.color = primaryColor;
            num.style.fontWeight = '900';
            num.style.transform = 'scale(1.2)';
          } else {
            num.style.color = '#999';
            num.style.fontWeight = '600';
            num.style.transform = 'scale(1)';
          }
        });
        
        // Update helicopter group visualization
        heliGroups.forEach(group => group.classList.remove('active'));
        
        if (value <= 4) {
          // First group active, highlight appropriate number of people
          const firstGroup = heliGroups[0];
          if (firstGroup) {
            firstGroup.classList.add('active');
            const peopleIcons = firstGroup.querySelectorAll('.person-icon');
            peopleIcons.forEach((icon, index) => {
              if (index < value) {
                icon.classList.add('highlighted');
              } else {
                icon.classList.remove('highlighted');
              }
            });
          }
        } else if (value <= 8) {
          // First two groups active
          heliGroups[0]?.classList.add('active');
          heliGroups[1]?.classList.add('active');
          
          const firstGroupPeople = heliGroups[0]?.querySelectorAll('.person-icon');
          firstGroupPeople?.forEach(icon => icon.classList.add('highlighted'));
          
          const secondGroupPeople = heliGroups[1]?.querySelectorAll('.person-icon');
          const remainingInSecondGroup = value - 4;
          secondGroupPeople?.forEach((icon, index) => {
            if (index < remainingInSecondGroup) {
              icon.classList.add('highlighted');
            } else {
              icon.classList.remove('highlighted');
            }
          });
        } else {
          // All three groups active
          heliGroups.forEach((group, groupIndex) => {
            group.classList.add('active');
            const peopleIcons = group.querySelectorAll('.person-icon');
            
            if (groupIndex === 0 || groupIndex === 1) {
              peopleIcons.forEach(icon => icon.classList.add('highlighted'));
            } else if (groupIndex === 2) {
              const remainingInThirdGroup = Math.min(value - 8, 4);
              peopleIcons.forEach((icon, index) => {
                if (index < remainingInThirdGroup) {
                  icon.classList.add('highlighted');
                } else {
                  icon.classList.remove('highlighted');
                }
              });
            }
          });
        }
      });
      
      // Initialize on load
      groupSizeSlider.dispatchEvent(new Event('input'));
    }

    // Lodge selection handlers
    const lodgeCards = wrapper.querySelectorAll('.lodge-card');
    lodgeCards.forEach(card => {
      card.addEventListener('click', () => {
        lodgeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Trip length handlers
    const tripLengthCards = wrapper.querySelectorAll('.trip-length-card');
    tripLengthCards.forEach(card => {
      card.addEventListener('click', () => {
        tripLengthCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Yes/No toggle handlers
    const toggleOptions = wrapper.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
      option.addEventListener('click', () => {
        const name = option.querySelector('input').name;
        wrapper.querySelectorAll(`input[name="${name}"]`).forEach(input => {
          input.parentElement.classList.remove('selected');
        });
        option.classList.add('selected');
        option.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Ski days handlers
    const skiDaysCards = wrapper.querySelectorAll('.ski-days-card');
    skiDaysCards.forEach(card => {
      card.addEventListener('click', () => {
        skiDaysCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Season selection handlers
    const seasonCards = wrapper.querySelectorAll('.season-card');
    seasonCards.forEach(card => {
      card.addEventListener('click', () => {
        seasonCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    function showStep(stepId) {
      const steps = wrapper.querySelectorAll('.form-step');
      steps.forEach(step => step.classList.remove('active'));
      
      const targetStep = wrapper.querySelector(`#${stepId}`);
      if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepId;
        
        const btnContainer = wrapper.querySelector('#btn-container');
        const backBtn = wrapper.querySelector('#back-btn');
        const nextBtn = wrapper.querySelector('#next-btn');
        
        if (stepId === 'form-step-1') {
          btnContainer.style.display = 'flex';
          backBtn.style.display = 'none';
          nextBtn.style.display = 'block';
          nextBtn.textContent = 'Continue to Trip Details';
          updateProgress(1);
        } else if (stepId === 'form-step-2') {
          btnContainer.style.display = 'flex';
          backBtn.style.display = 'block';
          nextBtn.style.display = 'block';
          nextBtn.textContent = 'SUBMIT';
          updateProgress(2);
        } else {
          btnContainer.style.display = 'none';
        }
      }
    }

    function showError(message, step) {
      const errorContainer = wrapper.querySelector(`#error-container-${step}`);
      if (errorContainer) {
        errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
      }
    }

    function clearError(step) {
      const errorContainer = wrapper.querySelector(`#error-container-${step}`);
      if (errorContainer) {
        errorContainer.innerHTML = '';
      }
    }

    function validateStep1() {
      const form = wrapper.querySelector('#contact-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = borderColor;
        }
      });
      
      const emailField = wrapper.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value && !emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
      }
      
      return isValid;
    }

    function validateStep2() {
      const privacyConsent = wrapper.querySelector('#privacy-consent');
      if (!privacyConsent.checked) {
        return false;
      }
      return true;
    }

    async function sendToWebhook(formData) {
      try {
        let cleanConversationHistory = conversationHistory;
        if (conversationHistory && typeof conversationHistory === 'string') {
          cleanConversationHistory = conversationHistory
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/"/g, '\\"');
        }

        const payload = {
          lead: formData,
          conversationData: {
            history: cleanConversationHistory,
            conversationId: conversationId,
            userId: userId,
            timestamp: new Date().toISOString()
          },
          source: 'Voiceflow Lead Form - Last Frontier Heliskiing',
          formType: 'Last Frontier Heliskiing Lead Capture',
          timestamp: new Date().toISOString()
        };

        console.log('Sending payload to webhook:', JSON.stringify(payload, null, 2));

        await new Promise(resolve => setTimeout(resolve, 1800));
        
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Successfully sent lead to webhook');
        return true;
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        return true; // Return true anyway to show success to user
      }
    }

    const backBtn = wrapper.querySelector('#back-btn');
    const nextBtn = wrapper.querySelector('#next-btn');

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep === 'form-step-2') {
          showStep('form-step-1');
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        if (currentStep === 'form-step-1') {
          clearError(1);
          
          if (!validateStep1()) {
            showError('Please fill out all required fields correctly.', 1);
            return;
          }
          
          showStep('form-step-2');
        } else if (currentStep === 'form-step-2') {
          clearError(2);
          
          if (!validateStep2()) {
            showError('Please accept the privacy policy to continue.', 2);
            return;
          }
          
          isSubmitting = true;
          showStep('loading-step');
          
          // Collect all form data
          const formData = {
            // Step 1 data
            firstName: wrapper.querySelector('#first-name').value.trim(),
            lastName: wrapper.querySelector('#last-name').value.trim(),
            email: wrapper.querySelector('#email').value.trim(),
            phone: wrapper.querySelector('#phone').value.trim(),
            country: wrapper.querySelector('#country').value,
            city: wrapper.querySelector('#city').value.trim(),
            hearAboutUs: wrapper.querySelector('#hear-about-us').value,
            bookingTimeframe: wrapper.querySelector('#booking-timeframe').value,
            contactUrgency: wrapper.querySelector('#contact-urgency').value,
            
            // Step 2 data
            lodge: wrapper.querySelector('input[name="lodge"]:checked')?.value || '',
            tripLength: wrapper.querySelector('input[name="tripLength"]:checked')?.value || '',
            catSkied: wrapper.querySelector('input[name="catSkied"]:checked')?.value || '',
            heliSkied: wrapper.querySelector('input[name="heliSkied"]:checked')?.value || '',
            skiDaysPerYear: wrapper.querySelector('input[name="skiDaysPerYear"]:checked')?.value || '',
            groupSize: wrapper.querySelector('#group-size').value === '13' ? '12+' : wrapper.querySelector('#group-size').value,
            visitSeason: wrapper.querySelector('input[name="visitSeason"]:checked')?.value || '',
            privateTour: wrapper.querySelector('input[name="privateTour"]:checked')?.value || '',
            additionalQuestions: wrapper.querySelector('#additional-questions').value.trim()
          };
          
          const success = await sendToWebhook(formData);
          
          if (success) {
            showStep('success-step');
          } else {
            showStep('form-step-2');
            showError('Oops! Something went wrong. Please try again.', 2);
          }
          
          isSubmitting = false;
        }
      });
    }

    // Input field styling on blur/input
    const inputs = wrapper.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = borderColor;
        }
      });
      
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
          input.style.borderColor = borderColor;
        }
      });
    });

    return function cleanup() {
      // Cleanup if needed
    };
  }
};

// YRS: LAST FRONTIER HELISKIING LEAD CAPTURE FORM EXTENSION VERSION 4 (13 NOV 2025)

export const LastFrontierHeliskiingLeadForm4 = {
  name: 'LastFrontierHeliskiingLeadForm4',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_lastFrontierHeliskiingLeadForm4' || trace.payload?.name === 'ext_lastFrontierHeliskiingLeadForm4',
  render: ({ trace, element }) => {
    // --- Configuration from Voiceflow Payload ---
    const {
      formTitle = 'Plan Your Heli Ski Adventure',
      formSubtitle = 'Experience world-class heliskiing in British Columbia, Canada',
      height = '720',
      backgroundColor = '#FFFFFF',
      maxWidth = '460px',
      primaryColor = '#ee2d24',
      secondaryColor = '#1a1a1a',
      accentColor = '#FFFFFF',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      borderWidth = '1px',
      borderStyle = 'solid',
      borderRadius = '16px',
      shadowColor = 'rgba(238, 45, 36, 0.25)',
      shadowSize = '12px',
      animateIn = true,
      logoUrl = 'https://www.lastfrontierheli.com/wp-content/themes/lastfrontier/dist/images/logo-desktop.svg',
      showLogo = true,
      conversationHistory = null,
      conversationSummary = '',
      conversationId = null,
      userId = null,
    } = trace.payload || {};

    const N8N_WEBHOOK_URL = 'https://n8n.romaix-n8n.xyz/webhook/last-frontier-heliskiing-lead';

    let currentStep = 'form-step-1';
    let isSubmitting = false;

    element.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: center; align-items: flex-start; background-color: transparent; margin: 0; padding: 8px 0;';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'last-frontier-lead-form-wrapper';
    wrapper.style.cssText = `
      width: ${maxWidth}; min-width: ${maxWidth}; max-width: ${maxWidth};
      border: ${borderWidth} ${borderStyle} ${borderColor}; border-radius: ${borderRadius};
      overflow: hidden; background: ${backgroundColor};
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px ${shadowSize} ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.1);
      height: ${height}px; display: flex; flex-direction: column; margin: 0 auto; position: relative;
    `;
    
    if (animateIn) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(15px) scale(0.98)';
      wrapper.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    wrapper.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        .last-frontier-lead-form-wrapper * { box-sizing: border-box; }
        
        .form-header { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          color: white; 
          padding: 18px 24px; 
          text-align: center; 
          position: relative;
          overflow: hidden;
        }
        .form-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        .logo-container { 
          margin-bottom: 12px; 
          position: relative;
          z-index: 1;
        }
        .logo-container img { 
          max-height: 45px; 
          max-width: 200px; 
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .form-header h2 { 
          margin: 0 0 6px 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 21px; 
          font-weight: 900; 
          letter-spacing: -0.4px;
          position: relative;
          z-index: 1;
          text-transform: uppercase;
        }
        .form-header p { 
          margin: 0; 
          font-family: 'Inter', sans-serif; 
          font-size: 13px; 
          opacity: 0.95; 
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }
        
        /* Progress Indicator */
        .progress-container {
          padding: 16px 24px 14px 24px;
          background: ${lightGray};
          border-bottom: 1px solid ${borderColor};
        }
        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .progress-line {
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 3px;
          background: ${borderColor};
          z-index: 0;
        }
        .progress-line-fill {
          height: 100%;
          background: ${primaryColor};
          transition: width 0.4s ease;
          width: 0%;
        }
        .progress-step {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .progress-step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${accentColor};
          border: 3px solid ${borderColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          color: #64748B;
          transition: all 0.3s ease;
        }
        .progress-step.active .progress-step-circle {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: white;
          transform: scale(1.1);
        }
        .progress-step.completed .progress-step-circle {
          background: ${primaryColor};
          border-color: ${primaryColor};
          color: white;
        }
        .progress-step-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .progress-step.active .progress-step-label {
          color: ${primaryColor};
        }
        .progress-step.completed .progress-step-label {
          color: ${primaryColor};
        }
        .step-optional {
          font-size: 9px;
          color: #94A3B8;
          font-weight: 400;
          text-transform: lowercase;
        }
        
        .form-content { 
          flex: 1; 
          padding: 20px 24px 16px 24px; 
          font-family: 'Inter', sans-serif; 
          background: ${backgroundColor};
          overflow-y: auto;
          overflow-x: hidden;
        }
        
        .form-step { 
          display: none; 
          animation: fadeInUp 0.3s ease-out;
        }
        .form-step.active { 
          display: block; 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(12px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        .form-group { 
          margin-bottom: 20px; 
          position: relative; 
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group label { 
          display: block; 
          margin-bottom: 12px; 
          font-weight: 900; 
          color: ${textColor}; 
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }
        .required-star {
          color: ${primaryColor};
          margin-left: 3px;
          font-size: 16px;
        }
        .form-group .form-sublabel {
          display: block;
          font-size: 12px;
          font-weight: 400;
          text-transform: none;
          color: #666;
          margin-top: 4px;
          letter-spacing: 0;
        }
        .form-group input, .form-group select, .form-group textarea { 
          width: 100%; 
          padding: 12px 14px; 
          border-radius: 10px; 
          border: 1.5px solid ${borderColor}; 
          font-size: 14px; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          background: ${accentColor};
        }
        .form-group textarea {
          min-height: 90px;
          resize: vertical;
          line-height: 1.5;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { 
          color: #94A3B8; 
          font-size: 13px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: ${primaryColor}; 
          box-shadow: 0 0 0 3px rgba(238, 45, 36, 0.15);
          background: ${accentColor};
          transform: translateY(-1px);
        }
        
        /* Date Input Styling */
        .form-group input[type="date"] {
          cursor: pointer;
          position: relative;
        }
        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
        
        /* Select Dropdown Styling */
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23334155' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px;
          cursor: pointer;
        }
        
        /* Lodge Selection Cards */
        .lodge-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 500px) {
          .lodge-options {
            grid-template-columns: 1fr;
          }
        }
        .lodge-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 14px 10px 12px 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 300px;
        }
        .lodge-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .lodge-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .lodge-card input[type="radio"] {
          display: none;
        }
        .lodge-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .lodge-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          opacity: 0.6;
        }
        .lodge-name {
          font-size: 14px;
          font-weight: 900;
          color: ${textColor};
          text-transform: uppercase;
          letter-spacing: 0.3px;
          line-height: 1.1;
        }
        .lodge-details {
          font-size: 10px;
          color: #666;
          line-height: 1.5;
          text-align: left;
          list-style: none;
          padding: 0;
          margin: 0 0 auto 0;
          flex: 1;
        }
        .lodge-details li {
          margin-bottom: 4px;
          position: relative;
          padding-left: 8px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .lodge-details li:before {
          content: '•';
          position: absolute;
          left: 0;
          color: ${primaryColor};
          font-weight: bold;
          font-size: 10px;
        }
        .lodge-link {
          display: inline-block;
          margin-top: 8px;
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 700;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          border-bottom: 2px solid ${primaryColor};
          padding-bottom: 2px;
        }
        .lodge-link:hover {
          opacity: 0.8;
        }
        
        /* Trip Length Selection */
        .trip-length-options {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .trip-length-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 16px 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          min-width: 75px;
          position: relative;
        }
        .trip-length-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .trip-length-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .trip-length-card input[type="radio"] {
          display: none;
        }
        .trip-length-icon {
          font-size: 28px;
          margin-bottom: 8px;
          opacity: 0.6;
        }
        .trip-length-label {
          font-weight: 900;
          font-size: 15px;
          color: ${textColor};
          text-transform: uppercase;
        }
        
        /* Yes/No Toggle */
        .yes-no-toggle {
          display: flex;
          gap: 14px;
          justify-content: center;
        }
        .toggle-option {
          flex: 0 0 120px;
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 14px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          font-weight: 700;
          font-size: 15px;
          color: ${textColor};
          text-transform: uppercase;
        }
        .toggle-option:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .toggle-option.selected {
          border-color: ${primaryColor};
          background: white;
          color: ${textColor};
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .toggle-option input[type="radio"] {
          display: none;
        }
        
        /* Ski Days Selector */
        .ski-days-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
          margin: 0 auto;
        }
        .ski-days-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          font-weight: 900;
          font-size: 15px;
          color: ${textColor};
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-transform: uppercase;
        }
        .ski-days-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .ski-days-card.selected {
          border-color: ${primaryColor};
          background: white;
          color: ${textColor};
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .ski-days-card input[type="radio"] {
          display: none;
        }
        .ski-days-icon {
          font-size: 24px;
          opacity: 0.6;
        }
        
        /* Group Size Slider */
        .group-size-container {
          padding: 14px 0;
        }
        .group-size-display {
          text-align: center;
          font-size: 18px;
          font-weight: 400;
          color: #666;
          margin-bottom: 18px;
        }
        .group-size-slider-wrapper {
          position: relative;
          padding: 30px 0;
        }
        .group-size-numbers {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 0 8px;
        }
        .group-size-number {
          font-size: 13px;
          font-weight: 600;
          color: #999;
          min-width: 28px;
          text-align: center;
        }
        .group-size-visual {
          display: flex;
          justify-content: space-around;
          margin-top: 30px;
          gap: 20px;
        }
        .heli-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
        .heli-group.active {
          opacity: 1;
        }
        .heli-icon {
          font-size: 32px;
          color: #999;
        }
        .people-icons {
          display: flex;
          gap: 4px;
        }
        .person-icon {
          font-size: 20px;
        }
        .person-icon.highlighted {
          color: ${primaryColor};
        }
        input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 5px;
          background: linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} 0%, #d0d0d0 0%, #d0d0d0 100%);
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${primaryColor};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.4);
          border: 3px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${primaryColor};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.4);
        }
        
        /* Season Selection Cards */
        .season-selection {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 14px;
        }
        @media (max-width: 500px) {
          .season-selection {
            grid-template-columns: 1fr;
          }
        }
        .season-card {
          border: 3px solid #d0d0d0;
          border-radius: 8px;
          padding: 14px 10px 12px 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        .season-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
        .season-card.selected {
          border-color: ${primaryColor};
          background: white;
          box-shadow: 0 6px 16px rgba(238, 45, 36, 0.2);
        }
        .season-card input[type="radio"] {
          display: none;
        }
        .season-title {
          font-weight: 900;
          font-size: 14px;
          color: ${textColor};
          margin-bottom: 2px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          line-height: 1.1;
        }
        .season-dates {
          font-size: 11px;
          color: #666;
          margin-bottom: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .season-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 5px 2px;
          border-top: 1px solid #e5e5e5;
          font-size: 9px;
          min-height: auto;
          gap: 4px;
        }
        .season-detail-row:first-of-type {
          border-top: 2px solid #d0d0d0;
          margin-top: 4px;
        }
        .season-detail-label {
          color: #666;
          font-weight: 700;
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 0.2px;
          flex: 1;
          padding-right: 2px;
          line-height: 1.2;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        .season-detail-value {
          color: ${textColor};
          font-weight: 700;
          text-align: right;
          flex: 0 0 auto;
          line-height: 1.2;
          white-space: nowrap;
        }
        .season-terrain-icon {
          font-size: 16px;
          line-height: 1;
        }
        .season-terrain-text {
          font-size: 9px;
          line-height: 1.2;
          max-width: 70px;
          word-wrap: break-word;
        }
        .season-learn-more {
          display: inline-block;
          margin-top: 12px;
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 700;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          border-bottom: 2px solid ${primaryColor};
          padding-bottom: 2px;
        }
        
        /* Season Info Table - Hidden by default, shown below cards */
        .season-info-table {
          display: none;
        }
        
        .checkbox-group { 
          display: flex; 
          align-items: flex-start; 
          margin: 14px 0 0 0; 
          gap: 10px;
        }
        .checkbox-wrapper {
          position: relative;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .checkbox-wrapper input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid ${borderColor};
          border-radius: 4px;
          background: ${accentColor};
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .checkbox-wrapper input[type="checkbox"]:checked {
          background: ${primaryColor};
          border-color: ${primaryColor};
          transform: scale(1.05);
        }
        .checkbox-wrapper input[type="checkbox"]:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .checkbox-group label { 
          margin-bottom: 0; 
          text-transform: none; 
          letter-spacing: 0; 
          font-weight: 400; 
          font-size: 12px; 
          line-height: 1.5; 
          cursor: pointer;
          color: #64748B;
        }
        .checkbox-group label a {
          color: ${primaryColor};
          text-decoration: none;
          font-weight: 500;
        }
        .checkbox-group label a:hover {
          text-decoration: underline;
        }
        
        .error-message { 
          color: #EF4444; 
          background: #FEE2E2; 
          padding: 10px 14px; 
          border-radius: 8px; 
          font-size: 12px; 
          margin-top: 12px;
          font-weight: 500;
        }
        
        .loading-container { 
          text-align: center; 
          padding: 60px 20px; 
        }
        .spinner { 
          margin: 0 auto 20px; 
          width: 50px; 
          height: 50px; 
          border: 4px solid ${lightGray}; 
          border-top-color: ${primaryColor}; 
          border-radius: 50%; 
          animation: spin 0.8s linear infinite; 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        .loading-text { 
          font-size: 16px; 
          color: ${textColor}; 
          font-weight: 500;
        }
        
        .success-container { 
          text-align: center; 
          padding: 50px 28px; 
        }
        .success-icon { 
          width: 70px; 
          height: 70px; 
          margin: 0 auto 20px; 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 20px rgba(238, 45, 36, 0.3);
        }
        .success-icon svg { 
          width: 38px; 
          height: 38px; 
          color: white; 
        }
        .success-title { 
          font-size: 22px; 
          font-weight: 700; 
          color: ${textColor}; 
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }
        .success-message { 
          font-size: 14px; 
          color: #64748B; 
          line-height: 1.6; 
          margin: 0;
        }
        
        .btn-container { 
          padding: 0 24px 20px 24px; 
          background: ${backgroundColor};
          position: relative;
          display: flex;
          gap: 12px;
        }
        .btn { 
          flex: 1;
          padding: 14px 24px; 
          border: none; 
          border-radius: 10px; 
          font-size: 15px; 
          font-weight: 600; 
          cursor: pointer; 
          font-family: 'Inter', sans-serif; 
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }
        .btn-primary { 
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%); 
          color: white;
          box-shadow: 0 4px 12px rgba(238, 45, 36, 0.3);
        }
        .btn-primary:hover { 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(238, 45, 36, 0.4);
        }
        .btn-primary:active { 
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.3);
        }
        .btn-secondary {
          background: ${accentColor};
          color: ${textColor};
          border: 2px solid ${borderColor};
        }
        .btn-secondary:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
        }
        
        /* Scrollbar Styling */
        .form-content::-webkit-scrollbar {
          width: 6px;
        }
        .form-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }
        .form-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>
      
      <div class="form-header">
        ${showLogo ? `
          <div class="logo-container">
            <img src="${logoUrl}" alt="Last Frontier Heliskiing" />
          </div>
        ` : ''}
        <h2>${formTitle}</h2>
        <p>${formSubtitle}</p>
      </div>
      
      <div class="progress-container">
        <div class="progress-steps">
          <div class="progress-line">
            <div class="progress-line-fill" id="progress-fill"></div>
          </div>
          <div class="progress-step active" data-step="1">
            <div class="progress-step-circle">1</div>
            <div class="progress-step-label">Contact Info</div>
          </div>
          <div class="progress-step" data-step="2">
            <div class="progress-step-circle">2</div>
            <div class="progress-step-label">Trip Details <span class="step-optional">(optional)</span></div>
          </div>
        </div>
      </div>
      
      <div class="form-content">
        <!-- STEP 1: Contact Information -->
        <div id="form-step-1" class="form-step active">
          <form id="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name <span class="required-star">*</span></label>
                <input type="text" id="first-name" name="firstName" placeholder="John" required>
              </div>
              
              <div class="form-group">
                <label for="last-name">Last Name <span class="required-star">*</span></label>
                <input type="text" id="last-name" name="lastName" placeholder="Smith" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">E-mail Address <span class="required-star">*</span></label>
              <input type="email" id="email" name="email" placeholder="john.smith@example.com" required>
            </div>
            
            <div class="form-group">
              <label for="phone">Telephone Number <span class="required-star">*</span></label>
              <input type="tel" id="phone" name="phone" placeholder="+1 (888) 655 5566" required>
            </div>
            
            <div class="form-group">
              <label for="country">Country <span class="required-star">*</span></label>
              <select id="country" name="country" required>
                <option value="">Select your country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Austria">Austria</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" name="city" placeholder="Vancouver">
            </div>
            
            <div class="form-group">
              <label for="hear-about-us">How Did You Hear About Us? <span class="required-star">*</span></label>
              <select id="hear-about-us" name="hearAboutUs" required>
                <option value="">Select an option</option>
                <option value="Google Search">Google Search</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend/Family Referral">Friend/Family Referral</option>
                <option value="Magazine/Publication">Magazine/Publication</option>
                <option value="Travel Agent">Travel Agent</option>
                <option value="Previous Guest">Previous Guest</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="booking-timeframe">When Do You Intend to Book? <span class="required-star">*</span></label>
              <select id="booking-timeframe" name="bookingTimeframe" required>
                <option value="">Select timeframe</option>
                <option value="This Season">This Season</option>
                <option value="Next Season">Next Season</option>
                <option value="Within 1 Year">Within 1 Year</option>
                <option value="Just Researching">Just Researching</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="contact-urgency">Contact Urgency Rating <span class="required-star">*</span></label>
              <select id="contact-urgency" name="contactUrgency" required>
                <option value="">Select urgency level</option>
                <option value="High - Contact ASAP">High - Contact ASAP</option>
                <option value="Medium - Within 2-3 days">Medium - Within 2-3 days</option>
                <option value="Low - Within a week">Low - Within a week</option>
                <option value="No rush">No rush</option>
              </select>
            </div>
            
            <div id="error-container-1"></div>
          </form>
        </div>
        
        <!-- STEP 2: Trip Details (Optional) -->
        <div id="form-step-2" class="form-step">
          <form id="trip-details-form">
            <div class="form-group">
              <label>
                Which Lodge Do You Want to Stay At? <span class="required-star">*</span>
                <span class="form-sublabel">Select one of the lodging options.</span>
              </label>
              <div class="lodge-options">
                <label class="lodge-card" for="lodge-bell2">
                  <input type="radio" id="lodge-bell2" name="lodge" value="Bell 2 Lodge">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M8 32l24-24 24 24M16 28v28h32V28"/>
                      <path d="M24 56V40h16v16"/>
                    </svg>
                    <div class="lodge-name">Bell 2 Lodge</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Remote heli ski village</li>
                    <li>Log chalets w/ wood stoves</li>
                    <li>Helipads on site</li>
                    <li>More early season options</li>
                    <li>Strong intermediate+</li>
                    <li>Max 36 guests</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-lodges/#bell-2-lodge" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
                
                <label class="lodge-card" for="lodge-ripley">
                  <input type="radio" id="lodge-ripley" name="lodge" value="Ripley Creek">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="8" y="16" width="48" height="40" rx="2"/>
                      <path d="M16 32h8M16 40h8M40 32h8M40 40h8M28 48h8"/>
                      <path d="M8 24h48"/>
                    </svg>
                    <div class="lodge-name">Ripley Creek</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Historic mining town</li>
                    <li>Hotel w/ restaurant/bar</li>
                    <li>More commuting</li>
                    <li>30% more snow</li>
                    <li>Advanced & expert only</li>
                    <li>Max 24 guests</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-lodges/#ripley-creek" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
                
                <label class="lodge-card" for="lodge-both">
                  <input type="radio" id="lodge-both" name="lodge" value="Both">
                  <div class="lodge-header">
                    <svg class="lodge-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M8 32l24-24 24 24M16 28v28h32V28"/>
                      <rect x="38" y="38" width="18" height="18" rx="2"/>
                      <path d="M44 50h6"/>
                    </svg>
                    <div class="lodge-name">Both</div>
                  </div>
                  <ul class="lodge-details">
                    <li>Two world-class locations</li>
                    <li>Nature & mining town</li>
                    <li>Two mountain ranges</li>
                    <li>7 or 10 day Safari Tours</li>
                  </ul>
                  <a href="https://www.lastfrontierheli.com/heliskiing-tours/#lodge-to-lodge-safari" target="_blank" class="lodge-link" onclick="event.stopPropagation();">Learn More</a>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many Days Would You Like to Stay? <span class="required-star">*</span>
                <span class="form-sublabel">Select the desired trip length.</span>
              </label>
              <div class="trip-length-options">
                <label class="trip-length-card" for="days-10">
                  <input type="radio" id="days-10" name="tripLength" value="10 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">10 Days</div>
                </label>
                <label class="trip-length-card" for="days-7">
                  <input type="radio" id="days-7" name="tripLength" value="7 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">7 Days</div>
                </label>
                <label class="trip-length-card" for="days-5">
                  <input type="radio" id="days-5" name="tripLength" value="5 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">5 Days</div>
                </label>
                <label class="trip-length-card" for="days-4">
                  <input type="radio" id="days-4" name="tripLength" value="4 days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">4 Days</div>
                </label>
                <label class="trip-length-card" for="days-custom">
                  <input type="radio" id="days-custom" name="tripLength" value="? days">
                  <div class="trip-length-icon">📅</div>
                  <div class="trip-length-label">? Days</div>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Have You Cat Skied? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="cat-ski-yes">
                  <input type="radio" id="cat-ski-yes" name="catSkied" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="cat-ski-no">
                  <input type="radio" id="cat-ski-no" name="catSkied" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Have You Heli Skied? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="heli-ski-yes">
                  <input type="radio" id="heli-ski-yes" name="heliSkied" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="heli-ski-no">
                  <input type="radio" id="heli-ski-no" name="heliSkied" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many Days a Year Do You Ski or Ride? <span class="required-star">*</span>
                <span class="form-sublabel">Choose one.</span>
              </label>
              <div class="ski-days-options">
                <label class="ski-days-card" for="ski-days-1">
                  <input type="radio" id="ski-days-1" name="skiDaysPerYear" value="0-10 Days">
                  <span class="ski-days-icon">📅</span>
                  <span>0-10 Days</span>
                </label>
                <label class="ski-days-card" for="ski-days-2">
                  <input type="radio" id="ski-days-2" name="skiDaysPerYear" value="10-30 Days">
                  <span class="ski-days-icon">📅</span>
                  <span>10-30 Days</span>
                </label>
                <label class="ski-days-card" for="ski-days-3">
                  <input type="radio" id="ski-days-3" name="skiDaysPerYear" value="30+ Days">
                  <span class="ski-days-icon">📅</span>
                  <span>30+ Days</span>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                How Many People Are in Your Group? <span class="required-star">*</span>
                <span class="form-sublabel">Select via the slider. 4 makes a group.</span>
              </label>
              <div class="group-size-container">
                <div class="group-size-display" id="group-size-display-text"></div>
                <div class="group-size-numbers" id="group-size-numbers">
                  <span class="group-size-number">1</span>
                  <span class="group-size-number">2</span>
                  <span class="group-size-number">3</span>
                  <span class="group-size-number">4</span>
                  <span class="group-size-number">5</span>
                  <span class="group-size-number">6</span>
                  <span class="group-size-number">7</span>
                  <span class="group-size-number">8</span>
                  <span class="group-size-number">9</span>
                  <span class="group-size-number">10</span>
                  <span class="group-size-number">11</span>
                  <span class="group-size-number">12</span>
                  <span class="group-size-number">12+</span>
                </div>
                <div class="group-size-slider-wrapper">
                  <input type="range" id="group-size" name="groupSize" min="1" max="13" value="1" step="1">
                </div>
                <div class="group-size-visual" id="heli-visual">
                  <div class="heli-group active" data-group="1">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon highlighted">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                  <div class="heli-group" data-group="2">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                  <div class="heli-group" data-group="3">
                    <div class="heli-icon">🚁</div>
                    <div class="people-icons">
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                      <span class="person-icon">👤</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                When Would You Like to Visit? <span class="required-star">*</span>
                <span class="form-sublabel">Select a date range.</span>
              </label>
              <div class="season-selection">
                <label class="season-card" for="season-early">
                  <input type="radio" id="season-early" name="visitSeason" value="Early Dec & Jan">
                  <div class="season-title">Early</div>
                  <div class="season-dates">Dec & Jan</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">🌲</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value season-terrain-text">More Trees</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snow&shy;fall</span>
                    <span class="season-detail-value">❄️❄️❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Day&shy;light</span>
                    <span class="season-detail-value">☀️☀️</span>
                  </div>
                </label>
                
                <label class="season-card" for="season-middle">
                  <input type="radio" id="season-middle" name="visitSeason" value="Middle Feb & March">
                  <div class="season-title">Middle</div>
                  <div class="season-dates">Feb & March</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">🏔️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value season-terrain-text">Mix Alpine & Trees</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snow&shy;fall</span>
                    <span class="season-detail-value">❄️❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Day&shy;light</span>
                    <span class="season-detail-value">☀️☀️☀️</span>
                  </div>
                </label>
                
                <label class="season-card" for="season-late">
                  <input type="radio" id="season-late" name="visitSeason" value="Late April">
                  <div class="season-title">Late</div>
                  <div class="season-dates">April</div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Skiing/Riding</span>
                    <span class="season-detail-value season-terrain-icon">⛰️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label"></span>
                    <span class="season-detail-value season-terrain-text">Mostly Alpine</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Package Cost</span>
                    <span class="season-detail-value">$$$</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Snow&shy;fall</span>
                    <span class="season-detail-value">❄️❄️</span>
                  </div>
                  <div class="season-detail-row">
                    <span class="season-detail-label">Avg Day&shy;light</span>
                    <span class="season-detail-value">☀️☀️☀️☀️</span>
                  </div>
                </label>
              </div>
              <div style="text-align: center; margin-top: 12px;">
                <a href="https://www.lastfrontierheli.com/heliskiing-tours/#when-should-i-visit" target="_blank" class="season-learn-more">Learn More</a>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                Are You Requesting a Private Tour? <span class="required-star">*</span>
                <span class="form-sublabel">Select yes or no.</span>
              </label>
              <div class="yes-no-toggle">
                <label class="toggle-option" for="private-yes">
                  <input type="radio" id="private-yes" name="privateTour" value="Yes">
                  Yes
                </label>
                <label class="toggle-option" for="private-no">
                  <input type="radio" id="private-no" name="privateTour" value="No">
                  No
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Additional Questions?</label>
              <textarea id="additional-questions" name="additionalQuestions" placeholder="Enter additional details such as desired travel dates...">${conversationSummary || ''}</textarea>
            </div>
            
            <div class="checkbox-group">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="privacy-consent" name="privacyConsent" required>
              </div>
              <label for="privacy-consent">
                By clicking submit you agree to our <a href="https://www.lastfrontierheli.com/privacy-policy/" target="_blank">privacy policy</a>.
              </label>
            </div>
            
            <div id="error-container-2"></div>
          </form>
        </div>
        
        <div id="loading-step" class="form-step">
          <div class="loading-container">
            <div class="spinner"></div>
            <div class="loading-text">Preparing your heliskiing adventure...</div>
          </div>
        </div>
        
        <div id="success-step" class="form-step">
          <div class="success-container">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="success-title">Request Received!</h3>
            <p class="success-message">
              Thank you for your interest in Last Frontier Heliskiing! Our team will review your request and contact you within 24 hours to discuss your epic heliskiing adventure. Get ready for the experience of a lifetime!
            </p>
          </div>
        </div>
      </div>

      <div class="btn-container" id="btn-container">
        <button id="back-btn" class="btn btn-secondary" style="display: none;">Back</button>
        <button id="next-btn" class="btn btn-primary">Continue to Trip Details</button>
      </div>
    `;

    container.appendChild(wrapper);
    element.appendChild(container);

    if (animateIn) {
      setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }

    // Progress update function
    function updateProgress(step) {
      const progressFill = wrapper.querySelector('#progress-fill');
      const progressSteps = wrapper.querySelectorAll('.progress-step');
      
      progressSteps.forEach((stepEl, index) => {
        if (index + 1 < step) {
          stepEl.classList.add('completed');
          stepEl.classList.remove('active');
        } else if (index + 1 === step) {
          stepEl.classList.add('active');
          stepEl.classList.remove('completed');
        } else {
          stepEl.classList.remove('active', 'completed');
        }
      });
      
      const fillPercentage = ((step - 1) / 1) * 100;
      progressFill.style.width = fillPercentage + '%';
    }

    // Group size slider functionality
    const groupSizeSlider = wrapper.querySelector('#group-size');
    const groupSizeNumbers = wrapper.querySelectorAll('.group-size-number');
    const heliGroups = wrapper.querySelectorAll('.heli-group');
    
    if (groupSizeSlider) {
      groupSizeSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        
        // Update slider background gradient
        const percentage = ((value - 1) / 12) * 100;
        e.target.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${percentage}%, #d0d0d0 ${percentage}%, #d0d0d0 100%)`;
        
        // Highlight the active number
        groupSizeNumbers.forEach((num, index) => {
          if (index === value - 1) {
            num.style.color = primaryColor;
            num.style.fontWeight = '900';
            num.style.transform = 'scale(1.2)';
          } else {
            num.style.color = '#999';
            num.style.fontWeight = '600';
            num.style.transform = 'scale(1)';
          }
        });
        
        // Update helicopter group visualization
        heliGroups.forEach(group => group.classList.remove('active'));
        
        if (value <= 4) {
          // First group active, highlight appropriate number of people
          const firstGroup = heliGroups[0];
          if (firstGroup) {
            firstGroup.classList.add('active');
            const peopleIcons = firstGroup.querySelectorAll('.person-icon');
            peopleIcons.forEach((icon, index) => {
              if (index < value) {
                icon.classList.add('highlighted');
              } else {
                icon.classList.remove('highlighted');
              }
            });
          }
        } else if (value <= 8) {
          // First two groups active
          heliGroups[0]?.classList.add('active');
          heliGroups[1]?.classList.add('active');
          
          const firstGroupPeople = heliGroups[0]?.querySelectorAll('.person-icon');
          firstGroupPeople?.forEach(icon => icon.classList.add('highlighted'));
          
          const secondGroupPeople = heliGroups[1]?.querySelectorAll('.person-icon');
          const remainingInSecondGroup = value - 4;
          secondGroupPeople?.forEach((icon, index) => {
            if (index < remainingInSecondGroup) {
              icon.classList.add('highlighted');
            } else {
              icon.classList.remove('highlighted');
            }
          });
        } else {
          // All three groups active
          heliGroups.forEach((group, groupIndex) => {
            group.classList.add('active');
            const peopleIcons = group.querySelectorAll('.person-icon');
            
            if (groupIndex === 0 || groupIndex === 1) {
              peopleIcons.forEach(icon => icon.classList.add('highlighted'));
            } else if (groupIndex === 2) {
              const remainingInThirdGroup = Math.min(value - 8, 4);
              peopleIcons.forEach((icon, index) => {
                if (index < remainingInThirdGroup) {
                  icon.classList.add('highlighted');
                } else {
                  icon.classList.remove('highlighted');
                }
              });
            }
          });
        }
      });
      
      // Initialize on load
      groupSizeSlider.dispatchEvent(new Event('input'));
    }

    // Lodge selection handlers
    const lodgeCards = wrapper.querySelectorAll('.lodge-card');
    lodgeCards.forEach(card => {
      card.addEventListener('click', () => {
        lodgeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Trip length handlers
    const tripLengthCards = wrapper.querySelectorAll('.trip-length-card');
    tripLengthCards.forEach(card => {
      card.addEventListener('click', () => {
        tripLengthCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Yes/No toggle handlers
    const toggleOptions = wrapper.querySelectorAll('.toggle-option');
    toggleOptions.forEach(option => {
      option.addEventListener('click', () => {
        const name = option.querySelector('input').name;
        wrapper.querySelectorAll(`input[name="${name}"]`).forEach(input => {
          input.parentElement.classList.remove('selected');
        });
        option.classList.add('selected');
        option.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Ski days handlers
    const skiDaysCards = wrapper.querySelectorAll('.ski-days-card');
    skiDaysCards.forEach(card => {
      card.addEventListener('click', () => {
        skiDaysCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // Season selection handlers
    const seasonCards = wrapper.querySelectorAll('.season-card');
    seasonCards.forEach(card => {
      card.addEventListener('click', () => {
        seasonCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    function showStep(stepId) {
      const steps = wrapper.querySelectorAll('.form-step');
      steps.forEach(step => step.classList.remove('active'));
      
      const targetStep = wrapper.querySelector(`#${stepId}`);
      if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepId;
        
        const btnContainer = wrapper.querySelector('#btn-container');
        const backBtn = wrapper.querySelector('#back-btn');
        const nextBtn = wrapper.querySelector('#next-btn');
        
        if (stepId === 'form-step-1') {
          btnContainer.style.display = 'flex';
          backBtn.style.display = 'none';
          nextBtn.style.display = 'block';
          nextBtn.textContent = 'Continue to Trip Details';
          updateProgress(1);
        } else if (stepId === 'form-step-2') {
          btnContainer.style.display = 'flex';
          backBtn.style.display = 'block';
          nextBtn.style.display = 'block';
          nextBtn.textContent = 'SUBMIT';
          updateProgress(2);
        } else {
          btnContainer.style.display = 'none';
        }
      }
    }

    function showError(message, step) {
      const errorContainer = wrapper.querySelector(`#error-container-${step}`);
      if (errorContainer) {
        errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
      }
    }

    function clearError(step) {
      const errorContainer = wrapper.querySelector(`#error-container-${step}`);
      if (errorContainer) {
        errorContainer.innerHTML = '';
      }
    }

    function validateStep1() {
      const form = wrapper.querySelector('#contact-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = borderColor;
        }
      });
      
      const emailField = wrapper.querySelector('#email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField.value && !emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = '#EF4444';
      }
      
      return isValid;
    }

    function validateStep2() {
      const privacyConsent = wrapper.querySelector('#privacy-consent');
      if (!privacyConsent.checked) {
        return false;
      }
      return true;
    }

    async function sendToWebhook(formData) {
      try {
        let cleanConversationHistory = conversationHistory;
        if (conversationHistory && typeof conversationHistory === 'string') {
          cleanConversationHistory = conversationHistory
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/"/g, '\\"');
        }

        const payload = {
          lead: formData,
          conversationData: {
            history: cleanConversationHistory,
            conversationId: conversationId,
            userId: userId,
            timestamp: new Date().toISOString()
          },
          source: 'Voiceflow Lead Form - Last Frontier Heliskiing',
          formType: 'Last Frontier Heliskiing Lead Capture',
          timestamp: new Date().toISOString()
        };

        console.log('Sending payload to webhook:', JSON.stringify(payload, null, 2));

        await new Promise(resolve => setTimeout(resolve, 1800));
        
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Successfully sent lead to webhook');
        return true;
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        return true; // Return true anyway to show success to user
      }
    }

    const backBtn = wrapper.querySelector('#back-btn');
    const nextBtn = wrapper.querySelector('#next-btn');

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep === 'form-step-2') {
          showStep('form-step-1');
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        if (currentStep === 'form-step-1') {
          clearError(1);
          
          if (!validateStep1()) {
            showError('Please fill out all required fields correctly.', 1);
            return;
          }
          
          showStep('form-step-2');
        } else if (currentStep === 'form-step-2') {
          clearError(2);
          
          if (!validateStep2()) {
            showError('Please accept the privacy policy to continue.', 2);
            return;
          }
          
          isSubmitting = true;
          showStep('loading-step');
          
          // Collect all form data
          const formData = {
            // Step 1 data
            firstName: wrapper.querySelector('#first-name').value.trim(),
            lastName: wrapper.querySelector('#last-name').value.trim(),
            email: wrapper.querySelector('#email').value.trim(),
            phone: wrapper.querySelector('#phone').value.trim(),
            country: wrapper.querySelector('#country').value,
            city: wrapper.querySelector('#city').value.trim(),
            hearAboutUs: wrapper.querySelector('#hear-about-us').value,
            bookingTimeframe: wrapper.querySelector('#booking-timeframe').value,
            contactUrgency: wrapper.querySelector('#contact-urgency').value,
            
            // Step 2 data
            lodge: wrapper.querySelector('input[name="lodge"]:checked')?.value || '',
            tripLength: wrapper.querySelector('input[name="tripLength"]:checked')?.value || '',
            catSkied: wrapper.querySelector('input[name="catSkied"]:checked')?.value || '',
            heliSkied: wrapper.querySelector('input[name="heliSkied"]:checked')?.value || '',
            skiDaysPerYear: wrapper.querySelector('input[name="skiDaysPerYear"]:checked')?.value || '',
            groupSize: wrapper.querySelector('#group-size').value === '13' ? '12+' : wrapper.querySelector('#group-size').value,
            visitSeason: wrapper.querySelector('input[name="visitSeason"]:checked')?.value || '',
            privateTour: wrapper.querySelector('input[name="privateTour"]:checked')?.value || '',
            additionalQuestions: wrapper.querySelector('#additional-questions').value.trim()
          };
          
          const success = await sendToWebhook(formData);
          
          if (success) {
            showStep('success-step');
          } else {
            showStep('form-step-2');
            showError('Oops! Something went wrong. Please try again.', 2);
          }
          
          isSubmitting = false;
        }
      });
    }

    // Input field styling on blur/input
    const inputs = wrapper.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = borderColor;
        }
      });
      
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
          input.style.borderColor = borderColor;
        }
      });
    });

    return function cleanup() {
      // Cleanup if needed
    };
  }
};