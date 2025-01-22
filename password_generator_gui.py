import random
import string
import tkinter as tk
from tkinter import messagebox

def generate_passwords():
    person_name = entry_name.get().strip()
    try:
        length = int(entry_length.get())
        if length < len(person_name) + 2:
            messagebox.showerror("Error", "Password length must be at least the length of the name + 2.")
            return
        
        # Get user preferences
        use_upper = var_upper.get()
        use_lower = var_lower.get()
        use_digits = var_digits.get()
        use_special = var_special.get()
        
        if not any([use_upper, use_lower, use_digits, use_special]):
            messagebox.showerror("Error", "At least one character type must be selected.")
            return
        
        # Build the character pool based on preferences
        char_pool = ''
        if use_upper:
            char_pool += string.ascii_uppercase
        if use_lower:
            char_pool += string.ascii_lowercase
        if use_digits:
            char_pool += string.digits
        if use_special:
            char_pool += string.punctuation
        
        # Generate passwords
        passwords = []
        for _ in range(10):
            base_password = list(person_name)
            while len(base_password) < length:
                base_password.append(random.choice(char_pool))
            random.shuffle(base_password)
            passwords.append(''.join(base_password[:length]))
        
        # Display passwords
        result_text.delete(1.0, tk.END)
        result_text.insert(tk.END, "\n".join(passwords))
    except ValueError:
        messagebox.showerror("Error", "Please enter a valid number for password length.")

# Create the main window
root = tk.Tk()
root.title("Strong Password Generator")
root.geometry("500x600")
root.resizable(False, False)

# GUI Components
tk.Label(root, text="Strong Password Generator", font=("Arial", 18)).pack(pady=10)

frame = tk.Frame(root)
frame.pack(pady=10)

tk.Label(frame, text="Your Name:").grid(row=0, column=0, padx=5, pady=5)
entry_name = tk.Entry(frame, width=30)
entry_name.grid(row=0, column=1, padx=5, pady=5)

tk.Label(frame, text="Password Length:").grid(row=1, column=0, padx=5, pady=5)
entry_length = tk.Entry(frame, width=30)
entry_length.grid(row=1, column=1, padx=5, pady=5)

# Checkboxes for character types
var_upper = tk.BooleanVar(value=True)
var_lower = tk.BooleanVar(value=True)
var_digits = tk.BooleanVar(value=True)
var_special = tk.BooleanVar(value=True)

tk.Checkbutton(root, text="Include Uppercase Letters", variable=var_upper).pack(anchor="w", padx=20)
tk.Checkbutton(root, text="Include Lowercase Letters", variable=var_lower).pack(anchor="w", padx=20)
tk.Checkbutton(root, text="Include Numbers", variable=var_digits).pack(anchor="w", padx=20)
tk.Checkbutton(root, text="Include Special Characters", variable=var_special).pack(anchor="w", padx=20)

tk.Button(root, text="Generate Passwords", command=generate_passwords, bg="#007bff", fg="white", font=("Arial", 12)).pack(pady=20)

tk.Label(root, text="Generated Passwords:", font=("Arial", 14)).pack(pady=5)
result_text = tk.Text(root, height=15, width=50, wrap="word", state="normal")
result_text.pack(pady=5)

# Run the application
root.mainloop()
