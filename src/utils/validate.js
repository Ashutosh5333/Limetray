export const validate = (fields) => {
    const errors = {};
  
    if (!fields.email?.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(fields.email))
      errors.email = "Enter a valid email";
  
    if (!fields.password?.trim()) errors.password = "Password is required";
  
    if (fields.name !== undefined && !fields.name.trim())
      errors.name = "Name is required";
  
    return errors;
  };
  