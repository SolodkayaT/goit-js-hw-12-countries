import PNotify from "../../node_modules/pnotify/dist/es/PNotify.js";
import PNotifyStyleMaterial from "../../node_modules/pnotify/dist/es/PNotifyStyleMaterial.js";
PNotify.defaults.styling = "material";

const Warrning = message =>
  PNotify.error({
    text: message
  });
export { Warrning };
