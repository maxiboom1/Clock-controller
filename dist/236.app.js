"use strict";exports.id=236,exports.ids=[236],exports.modules={8236:(e,r,o)=>{o.r(r),o.d(r,{apps:()=>O,default:()=>H,openApp:()=>_});var t=o(7742),n=o(2254),i=o(9411),a=o(1041),s=o(7718),c=o(3977),l=o(612),p=o(7561);let d,m;function u(){return void 0===m&&(m=(()=>{try{return p.statSync("/run/.containerenv"),!0}catch{return!1}})()||(void 0===d&&(d=function(){try{return p.statSync("/.dockerenv"),!0}catch{return!1}}()||function(){try{return p.readFileSync("/proc/self/cgroup","utf8").includes("docker")}catch{return!1}}()),d)),m}const f=()=>{if("linux"!==t.platform)return!1;if(l.release().toLowerCase().includes("microsoft"))return!u();try{return!!p.readFileSync("/proc/version","utf8").toLowerCase().includes("microsoft")&&!u()}catch{return!1}},w=t.env.__IS_WSL_TEST__?f:f();function g(e,r,o){const t=o=>Object.defineProperty(e,r,{value:o,enumerable:!0,writable:!0});return Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get(){const e=o();return t(e),e},set(e){t(e)}}),e}var h=o(7261);const y=(0,h.promisify)(s.execFile),x=(0,h.promisify)(s.execFile);async function v(e){return async function(e,{humanReadableOutput:r=!0}={}){if("darwin"!==t.platform)throw new Error("macOS only");const o=r?[]:["-ss"],{stdout:n}=await x("osascript",["-e",e,o]);return n.trim()}(`tell application "Finder" to set app_path to application file id "${e}" as string\ntell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`)}const S=(0,h.promisify)(s.execFile),E={AppXq0fevzme2pys62n3e0fbqa7peapykr8v:{name:"Edge",id:"com.microsoft.edge.old"},MSEdgeDHTML:{name:"Edge",id:"com.microsoft.edge"},MSEdgeHTM:{name:"Edge",id:"com.microsoft.edge"},"IE.HTTP":{name:"Internet Explorer",id:"com.microsoft.ie"},FirefoxURL:{name:"Firefox",id:"org.mozilla.firefox"},ChromeHTML:{name:"Chrome",id:"com.google.chrome"},BraveHTML:{name:"Brave",id:"com.brave.Browser"},BraveBHTML:{name:"Brave Beta",id:"com.brave.Browser.beta"},BraveSSHTM:{name:"Brave Nightly",id:"com.brave.Browser.nightly"}};class b extends Error{}const P=(0,h.promisify)(s.execFile);const A=i.dirname((0,a.fileURLToPath)("file:///C:/github/Clock%20controller/node_modules/open/index.js")),C=i.join(A,"xdg-open"),{platform:F,arch:L}=t,T=(()=>{const e="/mnt/";let r;return async function(){if(r)return r;const o="/etc/wsl.conf";let t=!1;try{await c.access(o,c.constants.F_OK),t=!0}catch{}if(!t)return e;const n=await c.readFile(o,{encoding:"utf8"}),i=/(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(n);return i?(r=i.groups.mountPoint.trim(),r=r.endsWith("/")?r:`${r}/`,r):e}})(),B=async(e,r)=>{let o;for(const t of e)try{return await r(t)}catch(e){o=e}throw o},$=async e=>{if(e={wait:!1,background:!1,newInstance:!1,allowNonzeroExitCode:!1,...e},Array.isArray(e.app))return B(e.app,(r=>$({...e,app:r})));let r,{name:o,arguments:i=[]}=e.app??{};if(i=[...i],Array.isArray(o))return B(o,(r=>$({...e,app:{name:r,arguments:i}})));if("browser"===o||"browserPrivate"===o){const r={"com.google.chrome":"chrome","google-chrome.desktop":"chrome","org.mozilla.firefox":"firefox","firefox.desktop":"firefox","com.microsoft.msedge":"edge","com.microsoft.edge":"edge","microsoft-edge.desktop":"edge"},n={chrome:"--incognito",firefox:"--private-window",edge:"--inPrivate"},a=await async function(){if("darwin"===t.platform){const e=await async function(){if("darwin"!==t.platform)throw new Error("macOS only");const{stdout:e}=await y("defaults",["read","com.apple.LaunchServices/com.apple.launchservices.secure","LSHandlers"]),r=/LSHandlerRoleAll = "(?!-)(?<id>[^"]+?)";\s+?LSHandlerURLScheme = (?:http|https);/.exec(e);return r?.groups.id??"com.apple.Safari"}();return{name:await v(e),id:e}}if("linux"===t.platform){const{stdout:e}=await P("xdg-mime",["query","default","x-scheme-handler/http"]),r=e.trim();return{name:r.replace(/.desktop$/,"").replace("-"," ").toLowerCase().replaceAll(/(?:^|\s|-)\S/g,(e=>e.toUpperCase())),id:r}}if("win32"===t.platform)return async function(e=S){const{stdout:r}=await e("reg",["QUERY"," HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice","/v","ProgId"]),o=/ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(r);if(!o)throw new b(`Cannot find Windows browser in stdout: ${JSON.stringify(r)}`);const{id:t}=o.groups,n=E[t];if(!n)throw new b(`Unknown browser ID: ${t}`);return n}();throw new Error("Only macOS, Linux, and Windows are supported")}();if(a.id in r){const t=r[a.id];return"browserPrivate"===o&&i.push(n[t]),$({...e,app:{name:O[t],arguments:i}})}throw new Error(`${a.name} is not supported as a default browser`)}const a=[],l={};if("darwin"===F)r="open",e.wait&&a.push("--wait-apps"),e.background&&a.push("--background"),e.newInstance&&a.push("--new"),o&&a.push("-a",o);else if("win32"===F||w&&!u()&&!o){const s=await T();r=w?`${s}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`:`${t.env.SYSTEMROOT||t.env.windir||"C:\\Windows"}\\System32\\WindowsPowerShell\\v1.0\\powershell`,a.push("-NoProfile","-NonInteractive","-ExecutionPolicy","Bypass","-EncodedCommand"),w||(l.windowsVerbatimArguments=!0);const c=["Start"];e.wait&&c.push("-Wait"),o?(c.push(`"\`"${o}\`""`),e.target&&i.push(e.target)):e.target&&c.push(`"${e.target}"`),i.length>0&&(i=i.map((e=>`"\`"${e}\`""`)),c.push("-ArgumentList",i.join(","))),e.target=n.Buffer.from(c.join(" "),"utf16le").toString("base64")}else{if(o)r=o;else{const e=!A||"/"===A;let o=!1;try{await c.access(C,c.constants.X_OK),o=!0}catch{}r=t.versions.electron??("android"===F||e||!o)?"xdg-open":C}i.length>0&&a.push(...i),e.wait||(l.stdio="ignore",l.detached=!0)}"darwin"===F&&i.length>0&&a.push("--args",...i),e.target&&a.push(e.target);const p=s.spawn(r,a,l);return e.wait?new Promise(((r,o)=>{p.once("error",o),p.once("close",(t=>{!e.allowNonzeroExitCode&&t>0?o(new Error(`Exited with code ${t}`)):r(p)}))})):(p.unref(),p)},_=(e,r)=>{if("string"!=typeof e)throw new TypeError("Expected a `name`");const{arguments:o=[]}=r??{};if(null!=o&&!Array.isArray(o))throw new TypeError("Expected `appArguments` as Array type");return $({...r,app:{name:e,arguments:o}})};function M(e){if("string"==typeof e||Array.isArray(e))return e;const{[L]:r}=e;if(!r)throw new Error(`${L} is not supported`);return r}function k({[F]:e},{wsl:r}){if(r&&w)return M(r);if(!e)throw new Error(`${F} is not supported`);return M(e)}const O={};g(O,"chrome",(()=>k({darwin:"google chrome",win32:"chrome",linux:["google-chrome","google-chrome-stable","chromium"]},{wsl:{ia32:"/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",x64:["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe","/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]}}))),g(O,"firefox",(()=>k({darwin:"firefox",win32:"C:\\Program Files\\Mozilla Firefox\\firefox.exe",linux:"firefox"},{wsl:"/mnt/c/Program Files/Mozilla Firefox/firefox.exe"}))),g(O,"edge",(()=>k({darwin:"microsoft edge",win32:"msedge",linux:["microsoft-edge","microsoft-edge-dev"]},{wsl:"/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"}))),g(O,"browser",(()=>"browser")),g(O,"browserPrivate",(()=>"browserPrivate"));const H=(e,r)=>{if("string"!=typeof e)throw new TypeError("Expected a `target`");return $({...r,target:e})}}};