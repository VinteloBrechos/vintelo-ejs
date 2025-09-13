const sanitizer = {
    sanitizeInput: (input) => {
        if (typeof input !== 'string') return '';
        return input.toString().trim().replace(/[<>]/g, '');
    },

    sanitizeFormData: (formData) => {
        const sanitized = {};
        for (const [key, value] of Object.entries(formData)) {
            sanitized[key] = sanitizer.sanitizeInput(value);
        }
        return sanitized;
    }
};

module.exports = sanitizer;