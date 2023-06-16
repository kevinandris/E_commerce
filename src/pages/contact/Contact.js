// ! 46
import { FaTwitter, FaPhoneAlt, FaEnvelope } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
import Card from "../../components/card/Card"
import styles from "./Contact.module.scss"
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_6vcgp9v', form.current, 'ObxC0F64G_COjoW6T')
      .then((result) => {
          toast.success("Message sent successfully")
      }, (error) => {
          toast.error(error.text)
      });
      
      e.target.reset(); // empty the fields
  }

  return (
    <>
      <section>
        <div className={`container ${styles.contact}`}>
          <h2>Contact Us</h2>
            <div className={styles.section}>
              <form ref={form} onSubmit={sendEmail}>
                <Card cardClass={styles.card}>
                  <label>Name:</label>
                  <input type="text" name="user_name" placeholder="Full Name" required/>

                  <label>Email:</label>
                  <input type="email" name="user_email" placeholder="Your active email" required/>

                  <label>Subject:</label>
                  <input type="text" name="subject"  placeholder="Subject" required/>

                  <label>Your message:</label>
                  <textarea type="text" name="message" cols="30" rows="10"/>

                  <button type="submit" className="--btn --btn-primary">Send Message</button>
                </Card>
              </form>

              <div className={styles.details}>
                <Card cardClass={styles.card2}>
                  <h3>Our Contact Information</h3>
                  <p>Fill the form or contact us via other channels listed below</p>
                  <div className={styles.icons}>
                    <span>
                      <FaPhoneAlt />
                      <p>+64 021 123 0022</p>
                    </span>
                    <span>
                      <FaEnvelope />
                      <p>Support@E-commerce.com</p>
                    </span>
                    <span>
                      <GoLocation />
                      <p>Auckland, New Zealand</p>
                    </span>
                    <span>
                      <FaTwitter />
                      <p>@Kevinandris</p>
                    </span>
                  </div>
                </Card>
              </div>
            </div>

        </div>
      </section>
    </>
  )
}

export default Contact