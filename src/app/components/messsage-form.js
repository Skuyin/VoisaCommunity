"use client";

import Form from "next/form";
import { sendDiscordMessage } from "../actions/webhookMsg";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const MessageForm = () => {
  const [formState, formAction, isPending] = useActionState(
    sendDiscordMessage,
    null
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isPendingTransition, startTransition] = useTransition();

  useEffect(() => {
    if (!executeRecaptcha) {
      console.warn("reCAPTCHA belum siap, menunggu inisialisasi...");
    } else {
      console.log("✅ reCAPTCHA siap digunakan!");
    }
  }, [executeRecaptcha]);

  const handleSubmit = async (formData) => {
    console.log("Form submitted!", formData);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <Form action={handleSubmit}>
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Send Us a Message
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            name="username"
            required
            className="w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            required
            className="w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-md"
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            required
            className="w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-md"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
        >
          {isPending || isPendingTransition ? "Sending..." : "Send"}
        </button>
      </Form>
    </div>
  );
};

export default MessageForm;
