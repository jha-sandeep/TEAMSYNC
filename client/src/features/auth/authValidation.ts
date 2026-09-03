export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

export interface RegisterFormErrors {
    name: string;
    email: string;
    password: string;
}

export const validateRegisterForm = (formData: RegisterFormData): RegisterFormErrors => {
    const errors: RegisterFormErrors = {
        name: "",
        email: "",
        password: "",
    };

    if (!formData.name.trim()) {
        errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Enter a valid email address";
    }

    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    return errors;
};