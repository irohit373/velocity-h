import { Resend } from 'resend';

// 📚 LEARNING: Initialize Resend client
// We create ONE instance of Resend that's reused across all email sends
// This is more efficient than creating a new client for each email
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email to Candidate
 * - Keeps email logic separate from API routes (clean code)
 * 
 * @param {Object} params - Email parameters
 * @param {string} params.applicantEmail - Candidate's email address
 * @param {string} params.applicantName - Candidate's full name
 * @param {string} params.jobTitle - Job position they applied for
 * @param {number} params.jobId - Job ID for reference
 * @returns {Promise<Object>} Resend API response
 */
export async function sendApplicationConfirmation({
  applicantEmail,
  applicantName,
  jobTitle,
  jobId,
}) {
  try {
    if (!applicantEmail || !applicantName || !jobTitle) {
      throw new Error('Missing required email parameters');
    }
    
    const emailResponse = await resend.emails.send({
      from: 'VELOCITY HR <onboarding@resend.dev>',
      to: [applicantEmail],      
      subject: `Application Received - ${jobTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #e0e0e0;
                border-top: none;
                border-radius: 0 0 10px 10px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding: 20px;
                color: #666;
                font-size: 14px;
              }
              .button {
                display: inline-block;
                padding: 12px 30px;
                background: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
              }
              .highlight {
                background: #f3f4f6;
                padding: 15px;
                border-left: 4px solid #667eea;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">✅ Application Received!</h1>
            </div>
            
            <div class="content">
              <p>Hi <strong>${applicantName}</strong>,</p>
              
              <p>Thank you for applying to the <strong>${jobTitle}</strong> position at VELOCITY H!</p>
              
              <div class="highlight">
                <p style="margin: 0;"><strong>What happens next?</strong></p>
                <ul style="margin: 10px 0;">
                  <li>Our AI system is analyzing your resume</li>
                  <li>Our recruitment team will review your application</li>
                  <li>You'll hear from us within 5-7 business days</li>
                </ul>
              </div>
              
              <p>In the meantime, you can:</p>
              <ul>
                <li>Check out more openings at VELOCITY H</li>
                <li>Connect with us on LinkedIn</li>
                <li>Prepare for potential interviews</li>
              </ul>
              
              <center>
                <a href="${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/jobs" class="button">
                  View More Jobs
                </a>
              </center>
              
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                <strong>Application Reference:</strong> JOB-${jobId}<br>
                <strong>Position:</strong> ${jobTitle}
              </p>
            </div>
            
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply.</p>
              <p>© ${new Date().getFullYear()} VELOCITY H. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Hi ${applicantName},

Thank you for applying to the ${jobTitle} position at VELOCITY H!

What happens next?
- Our AI system is analyzing your resume
- Our recruitment team will review your application
- You'll hear from us within 5-7 business days

Application Reference: JOB-${jobId}
Position: ${jobTitle}

Best regards,
VELOCITY H Team

This is an automated confirmation email. Please do not reply.
      `,
    });

    console.log('Email sent:', {
      to: applicantEmail,
      emailId: emailResponse.data?.id,
    });

    return emailResponse;
  } catch (error) {
    console.error('Email sending failed:', {
      error: error.message,
      applicantEmail,
      jobTitle,
    });
    
    return null;
  }
}
