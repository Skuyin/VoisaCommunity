"use server";

export const sendDiscordMessage = async (prevState, formData) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaToken = formData.get("recaptchaToken");

  if (!recaptchaToken) {
    return { success: false, message: "reCAPTCHA token is missing." };
  }

  try {
    const verificationResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: recaptchaToken,
        }),
      }
    );

    const verificationData = await verificationResponse.json();
    console.log("🎯 reCAPTCHA Verification Response:", verificationData);
    if (!verificationData.success) {
      return {
        success: false,
        message: "reCAPTCHA verification failed.",
      };
    }

    const rawFormEntries = Object.fromEntries(formData);

    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: rawFormEntries?.username,
        avatar_url: "https://i.imgur.com/mDKlggm.png",
        content: `**NAME:** **\`${rawFormEntries?.username}\`** \n**EMAIL:** **\`${rawFormEntries?.email}\`** \n**SUBJECT:** **\`${rawFormEntries?.subject}\`** \n**MESSAGE:**\n${rawFormEntries?.message}`,
      }),
    });
    return {
      success: true,
      message: `Your message has been sent successfully.`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: `Problem is sending message: ${error.message}`,
    };
  }
};
