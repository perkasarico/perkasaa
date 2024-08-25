import a26_0x271bad from "os";
import a26_0x5e67db from "fs";
import a26_0x1d5b52 from "path";
import a26_0x4caf1b from "crypto";
import a26_0x248e76 from "chalk";
import { promisify } from "util";
import { writeFile, readFile } from "fs";
import { exec } from "child_process";
import { promisified } from "regedit";
import a26_0x253d12 from "axios";
import { v4 as a26_0x3e29aa } from "uuid";
import { ALIAS, VERSION_SC } from "./konst.js";
const vPromisified = promisified;
const vPromisify = promisify(writeFile);
const vPromisify2 = promisify(readFile);
const vPromisify3 = promisify(exec);
const vF = p => {
  const v = p % 10;
  const v2 = p % 100;
  if (v === 1 && v2 !== 11) {
    return p + "st";
  }
  if (v === 2 && v2 !== 12) {
    return p + "nd";
  }
  if (v === 3 && v2 !== 13) {
    return p + "rd";
  }
  return p + "th";
};
const vF2 = p2 => {
  const v3 = new Date(Math.floor(p2 * 1000));
  let v4 = v3.getDate();
  let v5 = v3.getMonth() + 1;
  let v6 = v3.getFullYear();
  if (v4 < 10) {
    v4 = "0" + v4;
  }
  if (v5 < 10) {
    v5 = "0" + v5;
  }
  const v7 = v6.toString().slice(-2);
  return v4 + "/" + v5 + "/" + v7;
};
const vF3 = p3 => {
  const v8 = Date.now();
  let v9 = Math.floor(p3 * 1000) - v8;
  if (v9 <= 0) {
    return "license Expired";
  }
  const v10 = 60000;
  const v11 = v10 * 60;
  const v12 = v11 * 24;
  const v13 = Math.floor(v9 / v12);
  v9 %= v12;
  const v14 = Math.floor(v9 / v11);
  v9 %= v11;
  const v15 = Math.floor(v9 / v10);
  return v13 + " hari " + v14 + " jam " + v15 + " menit";
};
const vF4 = p4 => {
  if (p4 < 1) {
    p4 = 0;
  }
  const v16 = Math.floor(p4 / 3600);
  const v17 = Math.floor(p4 % 3600 / 60);
  const v18 = p4 % 60;
  const v19 = v16.toString().padStart(2, "0");
  const v20 = v17.toString().padStart(2, "0");
  const v21 = v18.toString().padStart(2, "0");
  return "" + a26_0x248e76.magentaBright("[") + a26_0x248e76.whiteBright(v19) + a26_0x248e76.blackBright(":") + a26_0x248e76.whiteBright(v20) + a26_0x248e76.blackBright(":") + a26_0x248e76.whiteBright(v21) + a26_0x248e76.magentaBright("]");
};
const vF5 = () => {
  const v22 = new Date();
  const v23 = v22.getHours().toString().padStart(2, "0");
  const v24 = v22.getMinutes().toString().padStart(2, "0");
  const v25 = v22.getSeconds().toString().padStart(2, "0");
  return "" + a26_0x248e76.magentaBright("[") + a26_0x248e76.whiteBright(v23) + a26_0x248e76.blackBright(":") + a26_0x248e76.whiteBright(v24) + a26_0x248e76.blackBright(":") + a26_0x248e76.whiteBright(v25) + a26_0x248e76.magentaBright("]");
};
const vF6 = p5 => {
  const v26 = ["", "K", "M", "B", "T", "Q"];
  const v27 = "abcdefghijklmnopqrstuvwxyz";
  if (p5 < 1000) {
    return p5.toString();
  }
  let v28 = -1;
  let vP5 = p5;
  while (vP5 >= 1000) {
    vP5 /= 1000;
    v28++;
  }
  if (v28 >= v26.length) {
    const v29 = v28 - v26.length;
    const v30 = v27[Math.floor(v29 / v27.length)];
    const v31 = v27[v29 % v27.length];
    return "" + vP5.toFixed(3) + v30 + v31;
  }
  return "" + vP5.toFixed(3) + v26[v28];
};
const vF7 = p6 => {
  const v32 = a26_0x4caf1b.createHash("sha1");
  v32.update(p6);
  return v32.digest("hex");
};
const vF8 = async p7 => {
  try {
    const v33 = await a26_0x253d12.post("https://tuyulgaple.my.id/premium/", {
      request: ALIAS,
      tipe: "verif",
      userid: p7
    });
    return v33.data;
  } catch (_0x2205a8) {
    return {
      code: 100,
      data: null
    };
  }
};
const vF9 = async () => {
  try {
    const {
      stdout: _0x156d06,
      stderr: _0x3bf272
    } = await vPromisify3("powershell.exe \"(Get-WmiObject Win32_ComputerSystemProduct).UUID\"");
    if (_0x3bf272) {
      return null;
    }
    const v34 = _0x156d06.trim();
    return v34;
  } catch (_0xd66800) {
    return null;
  }
};
const vF10 = async () => {
  try {
    await vPromisify3("termux-keystore generate " + ALIAS + " -a RSA");
    const {
      stdout: _0x89f957,
      stderr: _0x240d02
    } = await vPromisify3("termux-keystore list -d");
    if (_0x240d02) {
      throw new Error("Termux API not installed");
    }
    let v35 = null;
    try {
      const v36 = JSON.parse(_0x89f957.trim());
      if (v36.length > 0) {
        v36.forEach(p8 => {
          if (p8.alias === ALIAS) {
            v35 = vF7(p8.modulus);
          }
        });
      }
    } catch (_0x1e6a6f) {
      throw new Error("Failed parsing license data");
    }
    if (!v35) {
      throw new Error("Failed generating license key");
    }
    return v35;
  } catch (_0x561192) {
    throw new Error("Failed generating license: " + _0x561192.message);
  }
};
const vF11 = async () => {
  try {
    const {
      stdout: _0x4d0d60,
      stderr: _0x32d302
    } = await vPromisify3("termux-keystore list -d");
    if (_0x32d302) {
      throw new Error("Termux API not installed");
    }
    let v37 = null;
    try {
      const v38 = JSON.parse(_0x4d0d60.trim());
      if (v38.length > 0) {
        v38.forEach(p9 => {
          if (p9.alias === ALIAS) {
            v37 = vF7(p9.modulus);
          }
        });
      }
    } catch (_0x42c047) {
      throw new Error("Failed parsing license data");
    }
    if (!v37) {
      v37 = await vF10();
    }
    return v37;
  } catch (_0x19a807) {
    throw new Error("Failed getting license: " + _0x19a807.message);
  }
};
const vF12 = async () => {
  try {
    const v39 = await vPromisified.list(["HKCU\\SOFTWARE\\CatizenPremium"]);
    if (v39["HKCU\\SOFTWARE\\CatizenPremium"].exists) {
      const v40 = v39["HKCU\\SOFTWARE\\CatizenPremium"].values.uuid;
      if (!v40) {
        const vA26_0x3e29aa = a26_0x3e29aa();
        await vPromisified.putValue({
          "HKCU\\SOFTWARE\\CatizenPremium": {
            uuid: {
              value: vA26_0x3e29aa,
              type: "REG_SZ"
            }
          }
        });
        return vA26_0x3e29aa;
      }
      if (v40 && typeof v40.value === "string") {
        return v40.value;
      } else {
        throw new Error("Invalid UUID format in registry");
      }
    } else {
      const vA26_0x3e29aa2 = a26_0x3e29aa();
      await vPromisified.createKey(["HKCU\\SOFTWARE\\CatizenPremium"]);
      await vPromisified.putValue({
        "HKCU\\SOFTWARE\\CatizenPremium": {
          uuid: {
            value: vA26_0x3e29aa2,
            type: "REG_SZ"
          }
        }
      });
      return vA26_0x3e29aa2;
    }
  } catch (_0x54d341) {
    throw new Error("Failed while managing registry: " + _0x54d341.message);
  }
};
const vF13 = async () => {
  try {
    const v41 = await vF9();
    let v42 = null;
    if (v41) {
      v42 = vF7(v41 + "|" + ALIAS);
    } else {
      const v43 = await vF12();
      v42 = vF7(v43 + "|" + ALIAS);
    }
    return v42;
  } catch (_0x2ca2ce) {
    throw new Error("Failed while generating license: " + _0x2ca2ce.message);
  }
};
const vF14 = async () => {
  try {
    const {
      stdout: _0x2650d6,
      stderr: _0x571b2c
    } = await vPromisify3("hostnamectl status | grep \"Machine ID\"");
    if (_0x571b2c) {
      throw new Error("Failed to get machine ID");
    }
    const v44 = _0x2650d6.trim().split(":");
    if (v44.length < 2) {
      throw new Error("Invalid machine ID format");
    }
    const v45 = v44[1].trim();
    return v45;
  } catch (_0x4aa051) {
    throw new Error("Failed to get machine ID: " + _0x4aa051.message);
  }
};
const vF15 = async () => {
  const v46 = "/var/lib/" + ALIAS + ".txt";
  try {
    let v47;
    try {
      const v48 = await vPromisify2(v46, "utf8");
      v47 = v48.trim();
    } catch (_0x595692) {
      v47 = a26_0x3e29aa();
      await vPromisify(v46, v47, "utf-8");
    }
    return v47;
  } catch (_0x419b65) {
    throw new Error("Failed while managing UUID file: " + _0x419b65.message);
  }
};
const vF16 = async () => {
  try {
    const v49 = await vF14();
    const v50 = v49 ? v49 : await vF15();
    return v50;
  } catch (_0x3d436c) {
    throw new Error("Failed while managing UUID or Machine ID: " + _0x3d436c.message);
  }
};
const vF17 = async () => {
  try {
    const v51 = await vF16();
    const vVF7 = vF7(v51 + "|" + ALIAS);
    return vVF7;
  } catch (_0x103bda) {
    throw new Error("Failed while generating license: " + _0x103bda.message);
  }
};
const vF18 = async () => {
  let v52 = null;
  if (a26_0x271bad.platform() === "win32") {
    v52 = await vF13();
  } else if (a26_0x271bad.platform() === "android") {
    v52 = await vF11();
  } else if (a26_0x271bad.platform() === "linux") {
    v52 = await vF17();
  } else {
    throw new Error("This program not support for " + a26_0x271bad.platform() + " yet");
  }
  return v52;
};
const vF19 = p10 => {
  let v53;
  if (a26_0x271bad.platform() === "win32") {
    v53 = a26_0x1d5b52.join(process.env.APPDATA, p10);
  } else if (a26_0x271bad.platform() === "darwin") {
    v53 = a26_0x1d5b52.join(process.env.HOME, ".local", "share", p10);
  } else {
    v53 = a26_0x1d5b52.join(process.env.HOME, ".local", "share", p10);
  }
  return v53;
};
const vF20 = p11 => {
  const vVF19 = vF19(p11);
  if (!a26_0x5e67db.existsSync(vVF19)) {
    a26_0x5e67db.mkdirSync(vVF19, {
      recursive: true
    });
  }
};
const vF21 = async () => {
  try {
    const v54 = await a26_0x253d12.post("https://tuyulgaple.my.id/adidoank/", {
      sk: ALIAS,
      vr: VERSION_SC
    });
    if (v54.data.status) {
      return {
        status: "connect",
        baner: v54.data.baner
      };
    } else if (v54.data === "") {
      return {
        status: "reconnecting",
        baner: vF22()
      };
    } else {
      return {
        status: "exit",
        baner: vF22()
      };
    }
  } catch (_0x19be52) {
    return {
      status: "reconnecting",
      baner: vF22()
    };
  }
};
const vF22 = () => {
  const v55 = "\n" + a26_0x248e76.white("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~") + "\n" + a26_0x248e76.blueBright("╔══╗ ╔╦╗ ╔═╦╗ ╔╦╗ ╔╗─ ╔══╗ ╔══╗ ╔═╗ ╔╗─ ╔═╗") + "\n" + a26_0x248e76.blueBright("╚╗╔╝ ║║║ ╚╗║║ ║║║ ║║─ ║╔═╣ ║╔╗║ ║╬║ ║║─ ║╦╝") + "\n" + a26_0x248e76.whiteBright("─║║─ ║║║ ╔╩╗║ ║║║ ║╚╗ ║╚╗║ ║╠╣║ ║╔╝ ║╚╗ ║╩") + "\n" + a26_0x248e76.cyanBright("─╚╝─ ╚═╝ ╚══╝ ╚═╝ ╚═╝ ╚══╝ ╚╝╚╝ ╚╝─ ╚═╝ ╚═╝") + "\n" + a26_0x248e76.whiteBright("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~") + "\n" + a26_0x248e76.whiteBright("- skrip") + a26_0x248e76.blueBright("[" + ALIAS + "]") + " " + a26_0x248e76.whiteBright("Versi : " + VERSION_SC) + "\n" + a26_0x248e76.redBright("- tidak dapat terhubung ke server") + " " + a26_0x248e76.blueBright("tuyulgaple") + "\n";
  return v55;
};
const vF23 = p12 => {
  const v56 = "[34m╔══╗ ╔╦╗ ╔═╦╗ ╔╦╗ ╔╗─ ╔══╗ ╔══╗ ╔═╗ ╔╗─ ╔═╗\n[37m╚╗╔╝ ║║║ ╚╗║║ ║║║ ║║─ ║╔═╣ ║╔╗║ ║╬║ ║║─ ║╦╝\n[36m─║║─ ║║║ ╔╩╗║ ║║║ ║╚╗ ║╚╗║ ║╠╣║ ║╔╝ ║╚╗ ║╩╗\n[37m─╚╝─ ╚═╝ ╚══╝ ╚═╝ ╚═╝ ╚══╝ ╚╝╚╝ ╚╝─ ╚═╝ ╚═╝\n";
  const v57 = "╔══╗ ╔╦╗ ╔═╦╗ ╔╦╗ ╔╗─ ╔══╗ ╔══╗ ╔═╗ ╔╗─ ╔═╗\n╚╗╔╝ ║║║ ╚╗║║ ║║║ ║║─ ║╔═╣ ║╔╗║ ║╬║ ║║─ ║╦╝[37m\n─║║─ ║║║ ╔╩╗║ ║║║ ║╚╗ ║╚╗║ ║╠╣║ ║╔╝ ║╚╗ ║╩╗[36m\n─╚╝─ ╚═╝ ╚══╝ ╚═╝ ╚═╝ ╚══╝ ╚╝╚╝ ╚╝─ ╚═╝ ╚═╝[37m\n";
  const v58 = p12.replace(v57, v56);
  return v58;
};
const vF24 = async (p13, p14) => {
  await vPromisify(p13, p14, "utf-8");
};
const vF25 = p15 => {
  try {
    const v59 = a26_0x5e67db.readFileSync(p15, "utf8");
    return JSON.parse(v59);
  } catch (_0x4e0c1c) {
    return null;
  }
};
const vF26 = p16 => {
  try {
    a26_0x5e67db.unlinkSync(p16);
    return {
      status: true,
      message: "File deleted successfully"
    };
  } catch (_0x39a95c) {
    return {
      status: false,
      message: "Error deleting the file"
    };
  }
};
const vF27 = p17 => {
  let v60 = [];
  function f(p18) {
    const v61 = a26_0x5e67db.readdirSync(p18);
    v61.forEach(p19 => {
      const v62 = a26_0x1d5b52.join(p18, p19);
      const v63 = a26_0x5e67db.statSync(v62);
      if (v63 && v63.isDirectory()) {
        f(v62);
      } else {
        v60.push(v62);
      }
    });
  }
  f(vF19(p17));
  return v60;
};
const vF28 = (p20, p21) => {
  const v64 = [];
  for (let v65 = 0; v65 < p20.length; v65 += p21) {
    v64.push(p20.slice(v65, v65 + p21));
  }
  return v64;
};
const vF29 = p22 => {
  const v66 = new URLSearchParams(p22);
  const v67 = v66.get("user");
  if (!v67) {
    throw new Error("Parameter 'user' tidak ditemukan di URL");
  }
  const vDecodeURIComponent = decodeURIComponent(v67);
  const v68 = JSON.parse(vDecodeURIComponent);
  return v68;
};
export { vF as getOrdinalSuffix, vF4 as convertTimestamp, vF5 as getCurrentTime, vF6 as formatNumber, vF8 as validateLicense, vF18 as getLicense, vF20 as createSessionDirectory, vF19 as getSessionDirectory, vF27 as getAllFilesFromFolder, vF24 as writeToFile, vF25 as readJsonFile, vF26 as deleteFile, vF21 as runtimeServer, vF23 as updateBanner, vF28 as groupAccounts, vF29 as getUserFromUrl, vF2 as formatDate, vF3 as countdownLicense };