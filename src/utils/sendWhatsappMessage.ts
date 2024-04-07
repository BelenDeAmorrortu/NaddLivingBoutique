export const sendWhatsappMessage = (message: string) => {
  window.open(
    `https://api.whatsapp.com/send?phone=541153463845&text=${message}`,
    "_blank"
  );
};
