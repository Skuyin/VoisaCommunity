"use client";

import Form from "next/form";
import { sendDiscordMessage } from "../actions/webhookMsg";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { motion } from "motion/react";

const MessageForm = () => {
  const [formState, formAction, isPending] = useActionState(
    sendDiscordMessage,
    null
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isPendingTransition, startTransition] = useTransition();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const maxLengths = {
    username: 30, // Max 50 characters
    email: 50, // Max 100 characters
    subject: 100, // Max 100 characters
    message: 1740, // Max 1920 characters
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxLengths[name]) {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (!executeRecaptcha) {
      console.warn("reCAPTCHA belum siap, menunggu inisialisasi...");
    } else {
      console.log("✅ reCAPTCHA siap digunakan!");
    }
  }, [executeRecaptcha]);

  const handleSubmit = async (formData) => {
    console.log("Form submitted!", formData);
    setFormValues({
      username: "",
      email: "",
      subject: "",
      message: "",
    });
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please try again.");
      return;
    }

    try {
      const token = await executeRecaptcha("submit");
      console.log("reCAPTCHA Token:", token);
      formData.append("recaptchaToken", token);
      startTransition(() => formAction(formData));
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("Failed to execute reCAPTCHA. Please try again.");
    }
  };

  useEffect(() => {
    if (formState?.success) {
      console.log("Form success:", formState?.message);
      toast.success(formState?.message);
    } else if (formState?.message === false) {
      console.log("Form error:", formState?.message);
      toast.error(formState?.message);
    }
  }, [formState]);

  return (
    <div className="flex items-center justify-center p-6">
      <Form
        action={handleSubmit}
        className="w-full mx-auto bg-white rounded-lg"
      >
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          Send Us a Message
        </h2>
        <div className="flex flex-col p-5 gap-4">
          <div className="flex gap-4">
            {/* Username */}
            <motion.input
              type="text"
              placeholder="Your Name"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              required
              maxLength={maxLengths.username}
              className="w-full px-4 py-2 text-black border-2 font-semibold border-slate-400 outline-none"
            />
          </div>
          <span className="text-sm text-gray-600">
            {formValues.username.length}/{maxLengths.username} characters
          </span>

          {/* Email */}
          <motion.input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            maxLength={maxLengths.email}
            className="w-full px-4 py-2 text-black border-2 font-semibold border-slate-400 outline-none"
          />
          <span className="text-sm text-gray-600">
            {formValues.email.length}/{maxLengths.email} characters
          </span>

          {/* Subject */}
          <motion.input
            type="text"
            placeholder="Subject"
            name="subject"
            value={formValues.subject}
            onChange={handleChange}
            required
            maxLength={maxLengths.subject}
            className="w-full px-4 py-2 text-black border-2 font-semibold border-slate-400 outline-none"
          />
          <span className="text-sm text-gray-600">
            {formValues.subject.length}/{maxLengths.subject} characters
          </span>

          {/* Message */}
          <motion.textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formValues.message}
            onChange={handleChange}
            required
            maxLength={maxLengths.message}
            className="w-full px-4 py-2 text-black border-2 font-semibold border-slate-400 outline-none"
          />
          <span className="text-sm text-gray-600">
            {formValues.message.length}/{maxLengths.message} characters
          </span>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full mt-6 px-4 py-2 text-lg font-semibold text-white rounded-md focus:outline-none"
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            background: "linear-gradient(to top,   #4A90E2, #56CCF2)",
          }}
        >
          {isPending || isPendingTransition ? (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >
              Sending...
            </motion.span>
          ) : (
            "Send"
          )}
        </motion.button>
      </Form>
    </div>
  );
};

export default MessageForm;
