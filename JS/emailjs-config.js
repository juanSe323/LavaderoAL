// email-config.js
const EmailJSConfig = (() => {
  const SERVICE_ID = "service_2jwzykl";
  const TEMPLATE_ID = "template_mqv5a3a";
  const PUBLIC_KEY = "xYisZLdZCp_mWCuNL";

  const init = () => {
    emailjs.init(PUBLIC_KEY);
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const enviarResena = async (datos) => {
    return await emailjs.send(SERVICE_ID, TEMPLATE_ID, datos);
  };

  return {
    init,
    validarEmail,
    enviarResena,
  };
})();
