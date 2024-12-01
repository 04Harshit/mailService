# Mail Sending Utility

This Node.js-based backend service automates sending personalized job inquiry emails. It reads recipient email addresses from an Excel file, formats dynamic content, and securely sends emails using Nodemailer.

---

## Features

- Bulk Emailing: Sends emails to multiple recipients from a list in an Excel file.
- Customizable Email Template: Personalize email subjects, body content, and sender details via environment variables.
- Secure Configuration: Uses environment variables to protect sensitive data like email credentials.
- Detailed Logging: Tracks the status of email deliveries (success or failure).
- Error Handling: Manages errors gracefully, ensuring uninterrupted operation.

---

## Prerequisites

- Node.js (v14 or later)
- npm
- A Gmail account (or any SMTP-enabled email service)
- App-specific password for Gmail or equivalent setup for other services

---

## Installation
1. **Clone the Repository**:
   ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name


2. **Install Dependencies**:
    ```bash
    npm install

3. **Set Up Environment Variables**: Create a .env file in the root directory with the following format:
    ```bash
    EMAIL_ID=your-email@gmail.com
    PASSWORD=your-email-password
    LOWER_INDEX=2
    UPPER_INDEX=101
    EMAIL_TITLE=Job Opportunity Inquiry
    EMAIL_BODY_CONTENT= Copy from content.txt by making personalized changes accordingly
    SENDER_NAME=Your Name
    RESUME_URL=https://your-resume-link
    PHONE_NUMBER=1234-567-890

4. **Prepare Your Excel File**:
- Save your email addresses in an Excel file (emails.xlsx), placing them in column D.
- Ensure the range of rows matches the LOWER_INDEX and UPPER_INDEX values in .env.

---

## Usage

1. **Run the Script**:
    ```bash
    node app.js

The script will:
- Read email addresses from the emails.xlsx file.
- Send emails to recipients within the specified range.
- Log email statuses in the console and an optional log file.

---

## File Structure
    ├── .env             # Environment variables <br>
    ├── app.js           # Main script for sending emails <br>
    ├── emails.xlsx      # Excel file with recipient data <br>
    ├── content.txt      # Storing EMAIL_BODY_CONTENT <br>
    └── package.json     # Node.js dependencies and scripts <br>

The email body is dynamically populated with the following template:

${process.env.EMAIL_BODY_CONTENT}

Best regards,<br>
<b>${process.env.SENDER_NAME}</b><br>
<b>Resume</b>: ${process.env.RESUME_URL} <br>
<b>Phone</b>: ${process.env.PHONE_NUMBER}

--- 

## Enhancements

- Throttling: Add a delay between emails to avoid triggering spam filters.
- Validation: Automatically skip invalid email addresses.
- Retry Mechanism: Reattempt failed emails after a delay.

---

## Troubleshooting

- Authentication Error: Ensure your email provider allows SMTP access and use an app-specific password if required.
- Excel Reading Issue: Confirm the email addresses are correctly placed in column D and match the specified range.
- License

This project is licensed under the MIT License.

---

## Contact

For questions or issues, please contact: <br>
Harshit Garg <br>
📧 04harshitgarg@gmail.com <br>

---