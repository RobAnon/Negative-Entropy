import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, o as getContext, p as validate_store, r as component_subscribe, u as createEventDispatcher, w as onMount, x as get_store_value, y as writable, z as globals, e as element, A as svg_element, a as space, t as text, f as claim_element, g as children, b as detach_dev, c as claim_space, h as claim_text, j as attr_dev, k as add_location, B as set_style, l as insert_dev, m as append_dev, C as listen_dev, n as noop, D as run_all } from './client.7ce9bdcc.js';

function n(){}function e(n){return n()}function t(){return Object.create(null)}function o(n){n.forEach(e);}function r(n){return "function"==typeof n}function s(n,e){return n!=n?e==e:n!==e||n&&"object"==typeof n||"function"==typeof n}function a(n,e){n.appendChild(e);}function i(n,e,t){n.insertBefore(e,t||null);}function c(n){n.parentNode.removeChild(n);}function l(n){return document.createElement(n)}function d(n){return document.createTextNode(n)}function u(n,e,t){null==t?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t);}function p(n,e,t){n.classList[t?"add":"remove"](e);}let f;function g(n){f=n;}function _(){if(!f)throw new Error("Function called outside component initialization");return f}function m(){const n=_();return (e,t)=>{const o=n.$$.callbacks[e];if(o){const r=function(n,e){const t=document.createEvent("CustomEvent");return t.initCustomEvent(n,!1,!1,e),t}(e,t);o.slice().forEach((e=>{e.call(n,r);}));}}}function h(n,e){const t=n.$$.callbacks[e.type];t&&t.slice().forEach((n=>n(e)));}const v=[],b=[],y=[],w=[],$=Promise.resolve();let k=!1;function x(n){y.push(n);}let E=!1;const j=new Set;function M(){if(!E){E=!0;do{for(let n=0;n<v.length;n+=1){const e=v[n];g(e),N(e.$$);}for(g(null),v.length=0;b.length;)b.pop()();for(let n=0;n<y.length;n+=1){const e=y[n];j.has(e)||(j.add(e),e());}y.length=0;}while(v.length);for(;w.length;)w.pop()();k=!1,E=!1,j.clear();}}function N(n){if(null!==n.fragment){n.update(),o(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(x);}}const A=new Set;let C;function L(n,e){n&&n.i&&(A.delete(n),n.i(e));}function O(n,e,t,o){if(n&&n.o){if(A.has(n))return;A.add(n),C.c.push((()=>{A.delete(n),o&&(t&&n.d(1),o());})),n.o(e);}}function S(n,t,s){const{fragment:a,on_mount:i,on_destroy:c,after_update:l}=n.$$;a&&a.m(t,s),x((()=>{const t=i.map(e).filter(r);c?c.push(...t):o(t),n.$$.on_mount=[];})),l.forEach(x);}function T(n,e){const t=n.$$;null!==t.fragment&&(o(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[]);}function F(n,e){-1===n.$$.dirty[0]&&(v.push(n),k||(k=!0,$.then(M)),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31;}function J(e,r,s,a,i,l,d=[-1]){const u=f;g(e);const p=r.props||{},_=e.$$={fragment:null,ctx:null,props:l,update:n,not_equal:i,bound:t(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:t(),dirty:d,skip_bound:!1};let m=!1;if(_.ctx=s?s(e,p,((n,t,...o)=>{const r=o.length?o[0]:t;return _.ctx&&i(_.ctx[n],_.ctx[n]=r)&&(!_.skip_bound&&_.bound[n]&&_.bound[n](r),m&&F(e,n)),t})):[],_.update(),m=!0,o(_.before_update),_.fragment=!!a&&a(_.ctx),r.target){if(r.hydrate){const n=function(n){return Array.from(n.childNodes)}(r.target);_.fragment&&_.fragment.l(n),n.forEach(c);}else _.fragment&&_.fragment.c();r.intro&&L(e.$$.fragment),S(e,r.target,r.anchor),M();}g(u);}class P{$destroy(){T(this,1),this.$destroy=n;}$on(n,e){const t=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return t.push(e),()=>{const n=t.indexOf(e);-1!==n&&t.splice(n,1);}}$set(n){var e;this.$$set&&(e=n,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1);}}let D=1;function K(n){let e=n.action,t=n.cmd_id,o=this.pending_cmds.get(t);if(o){if(this.pending_cmds.delete(t),"cmd_error"===e){let{message:e,stack:t}=n,r=new Error(e);r.stack=t,o.reject(r);}"cmd_ok"===e&&o.resolve(n.args||"ok");}else console.error("command not found",t,n,[...this.pending_cmds.keys()]);}function R(n){if(n.source!==this.iframe.contentWindow)return;const{action:e,args:t}=n.data;switch(e){case"cmd_error":case"cmd_ok":return K.call(this,n.data);case"fetch_progress":return this.handlers.on_fetch_progress(t.remaining);case"error":return this.handlers.on_error(n.data);case"unhandledrejection":return this.handlers.on_unhandled_rejection(n.data);case"console":return this.handlers.on_console(n.data);case"console_group":return this.handlers.on_console_group(n.data);case"console_group_collapsed":return this.handlers.on_console_group_collapsed(n.data);case"console_group_end":return this.handlers.on_console_group_end(n.data);default:const o="on_"+e;"function"==typeof this.handlers[o]&&this.handlers[o](n.data);}}class U{constructor(n,e){this.iframe=n,this.handlers=e,this.pending_cmds=new Map,this.handle_event=R.bind(this),window.addEventListener("message",this.handle_event,!1);}destroy(){window.removeEventListener("message",this.handle_event);}iframe_command(n,e){return new Promise(((t,o)=>{const r=D++;this.pending_cmds.set(r,{resolve:t,reject:o}),this.iframe.contentWindow.postMessage({action:n,cmd_id:r,args:e},"*");}))}eval(n){return this.iframe_command("eval",{script:n})}add_script(n){return this.iframe_command("add_script",n)}add_script_content(n){return this.iframe_command("add_script_content",n)}add_style(n){return this.iframe_command("add_style",n)}add_asset(n){return this.iframe_command("add_asset",n)}handle_links(){return this.iframe_command("catch_clicks",{})}}function W(n){let e;return {c(){e=l("strong"),e.innerHTML="<em>Sorry, an error occured while executing the NFT.</em>",u(e,"class","beyondnft__sandbox__error svelte-1bwdt9k");},m(n,t){i(n,e,t);},d(n){n&&c(e);}}}function Y(e){let t,o,r,f,g=e[3]&&W();return {c(){t=l("div"),o=l("iframe"),f=d(" "),g&&g.c(),u(o,"title","Sandbox"),u(o,"sandbox",r="allow-scripts allow-pointer-lock allow-popups "+e[0]),u(o,"srcdoc",e[4]("<!DOCTYPE html>\n<html>\n  <head>\n    <style>\n      \n    </style>\n\n    <script>\n      (function () {\n        function handle_message(ev) {\n          let { action, cmd_id } = ev.data;\n          const send_message = (payload) =>\n            parent.postMessage({ ...payload }, ev.origin);\n\n          const send_reply = (payload) => send_message({ ...payload, cmd_id });\n          const send_ok = (args) => send_reply({ action: 'cmd_ok', args });\n          const send_error = (message, stack) =>\n            send_reply({ action: 'cmd_error', message, stack });\n\n          if (action === 'eval') {\n            try {\n              const { script } = ev.data.args;\n              eval(script);\n              send_ok();\n            } catch (e) {\n              send_error(e.message, e.stack);\n            }\n          }\n\n          if (action === 'add_script') {\n            try {\n              const script = document.createElement('script');\n              script.src = ev.data.args;\n              script.onload = () => send_ok();\n              document.body.appendChild(script);\n            } catch (e) {\n              send_error(e.message, e.stack);\n            }\n          }\n\n          if (action === 'add_script_content') {\n            try {\n              const script = document.createElement('script');\n              script.text = ev.data.args;\n              script.type = 'text/javascript';\n              document.body.appendChild(script);\n              send_ok();\n            } catch (e) {\n              send_error(e.message, e.stack);\n            }\n          }\n\n          if (action === 'add_style') {\n            try {\n              const link = document.createElement('link');\n              link.rel = 'stylesheet';\n              link.href = ev.data.args;\n              link.onload = () => send_ok();\n              document.body.appendChild(link);\n            } catch (e) {\n              send_error(e.message, e.stack);\n            }\n          }\n\n          if (action === 'catch_clicks') {\n            try {\n              const top_origin = ev.origin;\n              document.body.addEventListener('click', (event) => {\n                if (event.which !== 1) return;\n                if (event.metaKey || event.ctrlKey || event.shiftKey) return;\n                if (event.defaultPrevented) return;\n\n                // ensure target is a link\n                let el = event.target;\n                while (el && el.nodeName !== 'A') el = el.parentNode;\n                if (!el || el.nodeName !== 'A') return;\n\n                if (\n                  el.hasAttribute('download') ||\n                  el.getAttribute('rel') === 'external' ||\n                  el.target\n                )\n                  return;\n\n                event.preventDefault();\n\n                if (el.href.startsWith(top_origin)) {\n                  const url = new URL(el.href);\n                  if (url.hash[0] === '#') {\n                    window.location.hash = url.hash;\n                    return;\n                  }\n                }\n\n                window.open(el.href, '_blank');\n              });\n              send_ok();\n            } catch (e) {\n              send_error(e.message, e.stack);\n            }\n          }\n        }\n\n        window.addEventListener('message', handle_message, false);\n\n        window.onerror = function (msg, url, lineNo, columnNo, error) {\n          try {\n            parent.postMessage({ action: 'error', value: error }, '*');\n          } catch (e) {\n            parent.postMessage({ action: 'error', value: msg }, '*');\n            parent.postMessage({ action: 'error', value: error }, '*');\n          }\n        };\n\n        window.addEventListener('unhandledrejection', (event) => {\n          parent.postMessage(\n            { action: 'unhandledrejection', value: event.reason },\n            '*'\n          );\n        });\n\n        let previous = { level: null, args: null };\n\n        ['clear', 'log', 'info', 'dir', 'warn', 'error', 'table'].forEach(\n          (level) => {\n            const original = console[level];\n            console[level] = (...args) => {\n              const stringifiedArgs = stringify(args);\n              if (\n                previous.level === level &&\n                previous.args &&\n                previous.args === stringifiedArgs\n              ) {\n                parent.postMessage(\n                  { action: 'console', level, duplicate: true },\n                  '*'\n                );\n              } else {\n                previous = { level, args: stringifiedArgs };\n\n                try {\n                  parent.postMessage({ action: 'console', level, args }, '*');\n                } catch (err) {\n                  parent.postMessage(\n                    { action: 'console', level: 'unclonable' },\n                    '*'\n                  );\n                }\n              }\n\n              original(...args);\n            };\n          }\n        );\n\n        [\n          { method: 'group', action: 'console_group' },\n          { method: 'groupEnd', action: 'console_group_end' },\n          { method: 'groupCollapsed', action: 'console_group_collapsed' },\n        ].forEach((group_action) => {\n          const original = console[group_action.method];\n          console[group_action.method] = (label) => {\n            parent.postMessage({ action: group_action.action, label }, '*');\n\n            original(label);\n          };\n        });\n\n        const timers = new Map();\n        const original_time = console.time;\n        const original_timelog = console.timeLog;\n        const original_timeend = console.timeEnd;\n\n        console.time = (label = 'default') => {\n          original_time(label);\n          timers.set(label, performance.now());\n        };\n        console.timeLog = (label = 'default') => {\n          original_timelog(label);\n          const now = performance.now();\n          if (timers.has(label)) {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-log',\n                args: [`${label}: ${now - timers.get(label)}ms`],\n              },\n              '*'\n            );\n          } else {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-warn',\n                args: [`Timer '${label}' does not exist`],\n              },\n              '*'\n            );\n          }\n        };\n        console.timeEnd = (label = 'default') => {\n          original_timeend(label);\n          const now = performance.now();\n          if (timers.has(label)) {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-log',\n                args: [`${label}: ${now - timers.get(label)}ms`],\n              },\n              '*'\n            );\n          } else {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-warn',\n                args: [`Timer '${label}' does not exist`],\n              },\n              '*'\n            );\n          }\n          timers.delete(label);\n        };\n\n        const original_assert = console.assert;\n        console.assert = (condition, ...args) => {\n          if (condition) {\n            const stack = new Error().stack;\n            parent.postMessage(\n              { action: 'console', level: 'assert', args, stack },\n              '*'\n            );\n          }\n          original_assert(condition, ...args);\n        };\n\n        const counter = new Map();\n        const original_count = console.count;\n        const original_countreset = console.countReset;\n\n        console.count = (label = 'default') => {\n          counter.set(label, (counter.get(label) || 0) + 1);\n          parent.postMessage(\n            {\n              action: 'console',\n              level: 'system-log',\n              args: `${label}: ${counter.get(label)}`,\n            },\n            '*'\n          );\n          original_count(label);\n        };\n\n        console.countReset = (label = 'default') => {\n          if (counter.has(label)) {\n            counter.set(label, 0);\n          } else {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-warn',\n                args: `Count for '${label}' does not exist`,\n              },\n              '*'\n            );\n          }\n          original_countreset(label);\n        };\n\n        const original_trace = console.trace;\n\n        console.trace = (...args) => {\n          const stack = new Error().stack;\n          parent.postMessage(\n            { action: 'console', level: 'trace', args, stack },\n            '*'\n          );\n          original_trace(...args);\n        };\n\n        function stringify(args) {\n          try {\n            return JSON.stringify(args);\n          } catch (error) {\n            return null;\n          }\n        }\n      })(this);\n\n      // remove alert, set window context\n      (() => {\n        const original_alert = window.alert;\n        window.alert = function () {};\n\n        window.context = {\n          nft_json: {},\n          config: {},\n        };\n      })(this);\n    <\/script>\n  </head>\n  <body>\n    \x3c!-- NFTCODE --\x3e\n  </body>\n</html>\n")),u(o,"class","svelte-1bwdt9k"),p(o,"greyed-out",e[3]||z||e[2]),u(t,"class","beyondnft__sandbox svelte-1bwdt9k");},m(n,r){i(n,t,r),a(t,o),e[9](o),a(t,f),g&&g.m(t,null);},p(n,[e]){1&e&&r!==(r="allow-scripts allow-pointer-lock allow-popups "+n[0])&&u(o,"sandbox",r),12&e&&p(o,"greyed-out",n[3]||z||n[2]),n[3]?g||(g=W(),g.c(),g.m(t,null)):g&&(g.d(1),g=null);},i:n,o:n,d(n){n&&c(t),e[9](null),g&&g.d();}}}let z=!1;function B(n,e,t){let{code:o=""}=e,{proxy:r}=e,{json:s}=e,{owner_properties:a}=e,{sandbox_props:i=""}=e;const c=m();let l,d,u,p=0,f=[],g=[],h=f;var v;function y(){return s.interactive_nft?function(n){let e="";if(Array.isArray(n))for(const t of n){const n=t.type;"script"===n?e+=`<script type="text/javascript" src="${t.url}"><\/script>`:"style"===n?e+=`<script type="text/javascript">\n\t\t\t\t\t\t(() => {\n\t\t\t\t\t\t\tconst link = document.createElement('link');\n\t\t\t\t\t\t\tlink.rel = 'stylesheet';\n\t\t\t\t\t\t\tlink.href = "${t.url}";\n\t\t\t\t\t\t\tdocument.body.appendChild(link);\n\t\t\t\t\t\t})()\n\t\t\t\t\t<\/script>`:console.log("Unknown dependency type "+n);}return e}(s.interactive_nft.dependencies):""}function w(n){t(3,d=n),c("error",n);}function $(n){h.push(u=n),f=f;}function k(n,e){const t={level:"group",label:n,collapsed:e,logs:[]};h.push(t),g.push(h),h=t.logs,f=f;}return v=()=>(t(5,r=new U(l,{on_fetch_progress:n=>{t(2,p=n);},on_error:n=>{$({level:"error",args:[n.value]}),w(n.value);},on_unhandled_rejection:n=>{let e=n.value;"string"==typeof e&&(e={message:e}),e.message="Uncaught (in promise): "+e.message,$({level:"error",args:[e]}),w(e);},on_console:n=>{"clear"===n.level?(h=f=[],$(n)):n.duplicate?function(){const n=h[h.length-1];n?(n.count=(n.count||1)+1,f=f):(u.count=1,$(u));}():$(n);},on_console_group:n=>{k(n.label,!1);},on_console_group_end:()=>{h=g.pop();},on_console_group_collapsed:n=>{k(n.label,!0);}})),l.addEventListener("load",(()=>{r.handle_links(),!d&&c("loaded");})),()=>{r.destroy();}),_().$$.on_mount.push(v),n.$$set=n=>{"code"in n&&t(6,o=n.code),"proxy"in n&&t(5,r=n.proxy),"json"in n&&t(7,s=n.json),"owner_properties"in n&&t(8,a=n.owner_properties),"sandbox_props"in n&&t(0,i=n.sandbox_props);},[i,l,p,d,function(n){let e=y();const t=function(){const n={};if(s.interactive_nft&&Array.isArray(s.interactive_nft.properties)){let e={};a&&"object"==typeof a&&(e=a);for(const t of s.interactive_nft.properties)n[t.name]=t.value,void 0!==e[t.name]&&(n[t.name]=e[t.name]);}return n}(),r=`\n      window.context.properties = JSON.parse('${JSON.stringify(t)}');\n    `,i=`\n      window.context.nft_json = JSON.parse(${JSON.stringify(JSON.stringify(s))});\n    `;return e+=`<script type="text/javascript">${`\n      // specific p5 because it's causing troubles.\n      if (typeof p5 !== 'undefined' && p5.disableFriendlyErrors) {\n        p5.disableFriendlyErrors = true;\n        new p5();\n      }\n\n      ${r}\n      ${i}\n    `}<\/script>`,e+=o,n.replace("\x3c!-- NFTCODE --\x3e",e)},r,o,s,a,function(n){b[n?"unshift":"push"]((()=>{l=n,t(1,l);}));}]}class q extends P{constructor(n){var e;super(),document.getElementById("svelte-1bwdt9k-style")||((e=l("style")).id="svelte-1bwdt9k-style",e.textContent=".beyondnft__sandbox.svelte-1bwdt9k{background-color:white;border:none;width:100%;height:100%;position:relative}iframe.svelte-1bwdt9k{width:100%;height:100%;border:none;display:block}.greyed-out.svelte-1bwdt9k{filter:grayscale(50%) blur(1px);opacity:0.25}.beyondnft__sandbox__error.svelte-1bwdt9k{font-size:0.9em;position:absolute;top:0;left:0;padding:5px}",a(document.head,e)),J(this,n,B,Y,s,{code:6,proxy:5,json:7,owner_properties:8,sandbox_props:0});}}function H(e){let t;return {c(){t=d("Loading...");},m(n,e){i(n,t,e);},p:n,i:n,o:n,d(n){n&&c(t);}}}function I(n){let e,t,o;function r(e){n[6].call(null,e);}let s={code:n[1],owner_properties:n[2],sandbox_props:n[3],json:n[0]};return void 0!==n[4]&&(s.proxy=n[4]),e=new q({props:s}),b.push((()=>function(n,e,t){const o=n.$$.props[e];void 0!==o&&(n.$$.bound[o]=t,t(n.$$.ctx[o]));}(e,"proxy",r))),e.$on("loaded",n[7]),e.$on("error",n[8]),{c(){var n;(n=e.$$.fragment)&&n.c();},m(n,t){S(e,n,t),o=!0;},p(n,o){const r={};var s;2&o&&(r.code=n[1]),4&o&&(r.owner_properties=n[2]),8&o&&(r.sandbox_props=n[3]),1&o&&(r.json=n[0]),!t&&16&o&&(t=!0,r.proxy=n[4],s=()=>t=!1,w.push(s)),e.$set(r);},i(n){o||(L(e.$$.fragment,n),o=!0);},o(n){O(e.$$.fragment,n),o=!1;},d(n){T(e,n);}}}function G(n){let e,t,r,s;const a=[I,H],l=[];function u(n,e){return n[1]?0:1}return e=u(n),t=l[e]=a[e](n),{c(){t.c(),r=d("");},m(n,t){l[e].m(n,t),i(n,r,t),s=!0;},p(n,[s]){let i=e;e=u(n),e===i?l[e].p(n,s):(C={r:0,c:[],p:C},O(l[i],1,1,(()=>{l[i]=null;})),C.r||o(C.c),C=C.p,t=l[e],t||(t=l[e]=a[e](n),t.c()),L(t,1),t.m(r.parentNode,r));},i(n){s||(L(t),s=!0);},o(n){O(t),s=!1;},d(n){l[e].d(n),n&&c(r);}}}function Q(n,e,t){const o=m();let{data:r={}}=e,{code:s=""}=e,{owner_properties:a=[]}=e,{sandbox_props:i=""}=e,c=null;return !s&&r.interactive_nft?r.interactive_nft.code?(s=r.interactive_nft.code,r.interactive_nft.code=null):r.interactive_nft.code_uri?fetch(r.interactive_nft.code_uri).then((n=>n.text())).then((n=>t(1,s=n))).catch((n=>{o("Error",new Error("Error while fetching "+r.interactive_nft.code_uri));})):o("Error",new Error("You need to provide code for this NFT to run")):o("Error",new Error("You need to provide code for this NFT to run")),n.$$set=n=>{"data"in n&&t(0,r=n.data),"code"in n&&t(1,s=n.code),"owner_properties"in n&&t(2,a=n.owner_properties),"sandbox_props"in n&&t(3,i=n.sandbox_props);},[r,s,a,i,c,function(){return c},function(n){c=n,t(4,c);},function(e){h(n,e);},function(e){h(n,e);}]}class Sandbox extends P{constructor(n){super(),J(this,n,Q,G,s,{data:0,code:1,owner_properties:2,sandbox_props:3,getProxy:5});}get getProxy(){return this.$$.ctx[5]}}

// threejs.org/license
const REVISION = '126';
const MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
const TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };
const CullFaceNone = 0;
const CullFaceBack = 1;
const CullFaceFront = 2;
const PCFShadowMap = 1;
const PCFSoftShadowMap = 2;
const VSMShadowMap = 3;
const FrontSide = 0;
const BackSide = 1;
const DoubleSide = 2;
const FlatShading = 1;
const NoBlending = 0;
const NormalBlending = 1;
const AdditiveBlending = 2;
const SubtractiveBlending = 3;
const MultiplyBlending = 4;
const CustomBlending = 5;
const AddEquation = 100;
const SubtractEquation = 101;
const ReverseSubtractEquation = 102;
const MinEquation = 103;
const MaxEquation = 104;
const ZeroFactor = 200;
const OneFactor = 201;
const SrcColorFactor = 202;
const OneMinusSrcColorFactor = 203;
const SrcAlphaFactor = 204;
const OneMinusSrcAlphaFactor = 205;
const DstAlphaFactor = 206;
const OneMinusDstAlphaFactor = 207;
const DstColorFactor = 208;
const OneMinusDstColorFactor = 209;
const SrcAlphaSaturateFactor = 210;
const NeverDepth = 0;
const AlwaysDepth = 1;
const LessDepth = 2;
const LessEqualDepth = 3;
const EqualDepth = 4;
const GreaterEqualDepth = 5;
const GreaterDepth = 6;
const NotEqualDepth = 7;
const MultiplyOperation = 0;
const MixOperation = 1;
const AddOperation = 2;
const NoToneMapping = 0;
const LinearToneMapping = 1;
const ReinhardToneMapping = 2;
const CineonToneMapping = 3;
const ACESFilmicToneMapping = 4;
const CustomToneMapping = 5;

const UVMapping = 300;
const CubeReflectionMapping = 301;
const CubeRefractionMapping = 302;
const EquirectangularReflectionMapping = 303;
const EquirectangularRefractionMapping = 304;
const CubeUVReflectionMapping = 306;
const CubeUVRefractionMapping = 307;
const RepeatWrapping = 1000;
const ClampToEdgeWrapping = 1001;
const MirroredRepeatWrapping = 1002;
const NearestFilter = 1003;
const NearestMipmapNearestFilter = 1004;
const NearestMipmapLinearFilter = 1005;
const LinearFilter = 1006;
const LinearMipmapNearestFilter = 1007;
const LinearMipmapLinearFilter = 1008;
const UnsignedByteType = 1009;
const ByteType = 1010;
const ShortType = 1011;
const UnsignedShortType = 1012;
const IntType = 1013;
const UnsignedIntType = 1014;
const FloatType = 1015;
const HalfFloatType = 1016;
const UnsignedShort4444Type = 1017;
const UnsignedShort5551Type = 1018;
const UnsignedShort565Type = 1019;
const UnsignedInt248Type = 1020;
const AlphaFormat = 1021;
const RGBFormat = 1022;
const RGBAFormat = 1023;
const LuminanceFormat = 1024;
const LuminanceAlphaFormat = 1025;
const DepthFormat = 1026;
const DepthStencilFormat = 1027;
const RedFormat = 1028;
const RedIntegerFormat = 1029;
const RGFormat = 1030;
const RGIntegerFormat = 1031;
const RGBIntegerFormat = 1032;
const RGBAIntegerFormat = 1033;

const RGB_S3TC_DXT1_Format = 33776;
const RGBA_S3TC_DXT1_Format = 33777;
const RGBA_S3TC_DXT3_Format = 33778;
const RGBA_S3TC_DXT5_Format = 33779;
const RGB_PVRTC_4BPPV1_Format = 35840;
const RGB_PVRTC_2BPPV1_Format = 35841;
const RGBA_PVRTC_4BPPV1_Format = 35842;
const RGBA_PVRTC_2BPPV1_Format = 35843;
const RGB_ETC1_Format = 36196;
const RGB_ETC2_Format = 37492;
const RGBA_ETC2_EAC_Format = 37496;
const RGBA_ASTC_4x4_Format = 37808;
const RGBA_ASTC_5x4_Format = 37809;
const RGBA_ASTC_5x5_Format = 37810;
const RGBA_ASTC_6x5_Format = 37811;
const RGBA_ASTC_6x6_Format = 37812;
const RGBA_ASTC_8x5_Format = 37813;
const RGBA_ASTC_8x6_Format = 37814;
const RGBA_ASTC_8x8_Format = 37815;
const RGBA_ASTC_10x5_Format = 37816;
const RGBA_ASTC_10x6_Format = 37817;
const RGBA_ASTC_10x8_Format = 37818;
const RGBA_ASTC_10x10_Format = 37819;
const RGBA_ASTC_12x10_Format = 37820;
const RGBA_ASTC_12x12_Format = 37821;
const RGBA_BPTC_Format = 36492;
const SRGB8_ALPHA8_ASTC_4x4_Format = 37840;
const SRGB8_ALPHA8_ASTC_5x4_Format = 37841;
const SRGB8_ALPHA8_ASTC_5x5_Format = 37842;
const SRGB8_ALPHA8_ASTC_6x5_Format = 37843;
const SRGB8_ALPHA8_ASTC_6x6_Format = 37844;
const SRGB8_ALPHA8_ASTC_8x5_Format = 37845;
const SRGB8_ALPHA8_ASTC_8x6_Format = 37846;
const SRGB8_ALPHA8_ASTC_8x8_Format = 37847;
const SRGB8_ALPHA8_ASTC_10x5_Format = 37848;
const SRGB8_ALPHA8_ASTC_10x6_Format = 37849;
const SRGB8_ALPHA8_ASTC_10x8_Format = 37850;
const SRGB8_ALPHA8_ASTC_10x10_Format = 37851;
const SRGB8_ALPHA8_ASTC_12x10_Format = 37852;
const SRGB8_ALPHA8_ASTC_12x12_Format = 37853;
const ZeroCurvatureEnding = 2400;
const ZeroSlopeEnding = 2401;
const WrapAroundEnding = 2402;
const TrianglesDrawMode = 0;
const LinearEncoding = 3000;
const sRGBEncoding = 3001;
const GammaEncoding = 3007;
const RGBEEncoding = 3002;
const LogLuvEncoding = 3003;
const RGBM7Encoding = 3004;
const RGBM16Encoding = 3005;
const RGBDEncoding = 3006;
const BasicDepthPacking = 3200;
const RGBADepthPacking = 3201;
const TangentSpaceNormalMap = 0;
const ObjectSpaceNormalMap = 1;
const KeepStencilOp = 7680;
const AlwaysStencilFunc = 519;

const StaticDrawUsage = 35044;
const DynamicDrawUsage = 35048;
const GLSL3 = '300 es';

/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */

function EventDispatcher() {}

Object.assign( EventDispatcher.prototype, {

	addEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) this._listeners = {};

		const listeners = this._listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	},

	hasEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return false;

		const listeners = this._listeners;

		return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

	},

	removeEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return;

		const listeners = this._listeners;
		const listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			const index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	},

	dispatchEvent: function ( event ) {

		if ( this._listeners === undefined ) return;

		const listeners = this._listeners;
		const listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {

			event.target = this;

			// Make a copy, in case listeners are removed while iterating.
			const array = listenerArray.slice( 0 );

			for ( let i = 0, l = array.length; i < l; i ++ ) {

				array[ i ].call( this, event );

			}

		}

	}

} );

const _lut = [];

for ( let i = 0; i < 256; i ++ ) {

	_lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

}

let _seed = 1234567;

const MathUtils = {

	DEG2RAD: Math.PI / 180,
	RAD2DEG: 180 / Math.PI,

	generateUUID: function () {

		// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

		const d0 = Math.random() * 0xffffffff | 0;
		const d1 = Math.random() * 0xffffffff | 0;
		const d2 = Math.random() * 0xffffffff | 0;
		const d3 = Math.random() * 0xffffffff | 0;
		const uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
			_lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
			_lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
			_lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];

		// .toUpperCase() here flattens concatenated strings to save heap memory space.
		return uuid.toUpperCase();

	},

	clamp: function ( value, min, max ) {

		return Math.max( min, Math.min( max, value ) );

	},

	// compute euclidian modulo of m % n
	// https://en.wikipedia.org/wiki/Modulo_operation

	euclideanModulo: function ( n, m ) {

		return ( ( n % m ) + m ) % m;

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>

	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	},

	// https://en.wikipedia.org/wiki/Linear_interpolation

	lerp: function ( x, y, t ) {

		return ( 1 - t ) * x + t * y;

	},

	// http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/

	damp: function ( x, y, lambda, dt ) {

		return MathUtils.lerp( x, y, 1 - Math.exp( - lambda * dt ) );

	},

	// https://www.desmos.com/calculator/vcsjnyz7x4

	pingpong: function ( x, length = 1 ) {

		return length - Math.abs( MathUtils.euclideanModulo( x, length * 2 ) - length );

	},

	// http://en.wikipedia.org/wiki/Smoothstep

	smoothstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	},

	smootherstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

	},

	// Random integer from <low, high> interval

	randInt: function ( low, high ) {

		return low + Math.floor( Math.random() * ( high - low + 1 ) );

	},

	// Random float from <low, high> interval

	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );

	},

	// Random float from <-range/2, range/2> interval

	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );

	},

	// Deterministic pseudo-random float in the interval [ 0, 1 ]

	seededRandom: function ( s ) {

		if ( s !== undefined ) _seed = s % 2147483647;

		// Park-Miller algorithm

		_seed = _seed * 16807 % 2147483647;

		return ( _seed - 1 ) / 2147483646;

	},

	degToRad: function ( degrees ) {

		return degrees * MathUtils.DEG2RAD;

	},

	radToDeg: function ( radians ) {

		return radians * MathUtils.RAD2DEG;

	},

	isPowerOfTwo: function ( value ) {

		return ( value & ( value - 1 ) ) === 0 && value !== 0;

	},

	ceilPowerOfTwo: function ( value ) {

		return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

	},

	floorPowerOfTwo: function ( value ) {

		return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

	},

	setQuaternionFromProperEuler: function ( q, a, b, c, order ) {

		// Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles

		// rotations are applied to the axes in the order specified by 'order'
		// rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
		// angles are in radians

		const cos = Math.cos;
		const sin = Math.sin;

		const c2 = cos( b / 2 );
		const s2 = sin( b / 2 );

		const c13 = cos( ( a + c ) / 2 );
		const s13 = sin( ( a + c ) / 2 );

		const c1_3 = cos( ( a - c ) / 2 );
		const s1_3 = sin( ( a - c ) / 2 );

		const c3_1 = cos( ( c - a ) / 2 );
		const s3_1 = sin( ( c - a ) / 2 );

		switch ( order ) {

			case 'XYX':
				q.set( c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13 );
				break;

			case 'YZY':
				q.set( s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13 );
				break;

			case 'ZXZ':
				q.set( s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13 );
				break;

			case 'XZX':
				q.set( c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13 );
				break;

			case 'YXY':
				q.set( s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13 );
				break;

			case 'ZYZ':
				q.set( s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13 );
				break;

			default:
				console.warn( 'THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order );

		}

	}

};

class Vector2 {

	constructor( x = 0, y = 0 ) {

		this.x = x;
		this.y = y;

	}

	get width() {

		return this.x;

	}

	set width( value ) {

		this.x = value;

	}

	get height() {

		return this.y;

	}

	set height( value ) {

		this.y = value;

	}

	set( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	}

	setScalar( scalar ) {

		this.x = scalar;
		this.y = scalar;

		return this;

	}

	setX( x ) {

		this.x = x;

		return this;

	}

	setY( y ) {

		this.y = y;

		return this;

	}

	setComponent( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	getComponent( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	clone() {

		return new this.constructor( this.x, this.y );

	}

	copy( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	}

	add( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	}

	addScalar( s ) {

		this.x += s;
		this.y += s;

		return this;

	}

	addVectors( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	}

	addScaledVector( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;

		return this;

	}

	sub( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;

	}

	subScalar( s ) {

		this.x -= s;
		this.y -= s;

		return this;

	}

	subVectors( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	}

	multiply( v ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;

		return this;

	}

	divide( v ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	}

	divideScalar( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}

	applyMatrix3( m ) {

		const x = this.x, y = this.y;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

		return this;

	}

	min( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );

		return this;

	}

	max( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );

		return this;

	}

	clamp( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );

		return this;

	}

	clampScalar( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

		return this;

	}

	clampLength( min, max ) {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}

	floor() {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;

	}

	ceil() {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;

	}

	round() {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;

	}

	roundToZero() {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;

	}

	negate() {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y;

	}

	cross( v ) {

		return this.x * v.y - this.y * v.x;

	}

	lengthSq() {

		return this.x * this.x + this.y * this.y;

	}

	length() {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	}

	manhattanLength() {

		return Math.abs( this.x ) + Math.abs( this.y );

	}

	normalize() {

		return this.divideScalar( this.length() || 1 );

	}

	angle() {

		// computes the angle in radians with respect to the positive x-axis

		const angle = Math.atan2( - this.y, - this.x ) + Math.PI;

		return angle;

	}

	distanceTo( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	}

	distanceToSquared( v ) {

		const dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	}

	manhattanDistanceTo( v ) {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

	}

	setLength( length ) {

		return this.normalize().multiplyScalar( length );

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;

		return this;

	}

	equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	}

	fromArray( array, offset = 0 ) {

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;

	}

	fromBufferAttribute( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector2: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );

		return this;

	}

	rotateAround( center, angle ) {

		const c = Math.cos( angle ), s = Math.sin( angle );

		const x = this.x - center.x;
		const y = this.y - center.y;

		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();

		return this;

	}

}

Vector2.prototype.isVector2 = true;

class Matrix3 {

	constructor() {

		this.elements = [

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	set( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

		const te = this.elements;

		te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
		te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
		te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

		return this;

	}

	identity() {

		this.set(

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		);

		return this;

	}

	copy( m ) {

		const te = this.elements;
		const me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
		te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
		te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

		return this;

	}

	extractBasis( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrix3Column( this, 0 );
		yAxis.setFromMatrix3Column( this, 1 );
		zAxis.setFromMatrix3Column( this, 2 );

		return this;

	}

	setFromMatrix4( m ) {

		const me = m.elements;

		this.set(

			me[ 0 ], me[ 4 ], me[ 8 ],
			me[ 1 ], me[ 5 ], me[ 9 ],
			me[ 2 ], me[ 6 ], me[ 10 ]

		);

		return this;

	}

	multiply( m ) {

		return this.multiplyMatrices( this, m );

	}

	premultiply( m ) {

		return this.multiplyMatrices( m, this );

	}

	multiplyMatrices( a, b ) {

		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
		const a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
		const a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

		const b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
		const b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
		const b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
		te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
		te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
		te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
		te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
		te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
		te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

		return this;

	}

	multiplyScalar( s ) {

		const te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;

	}

	determinant() {

		const te = this.elements;

		const a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

	}

	invert() {

		const te = this.elements,

			n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ],
			n12 = te[ 3 ], n22 = te[ 4 ], n32 = te[ 5 ],
			n13 = te[ 6 ], n23 = te[ 7 ], n33 = te[ 8 ],

			t11 = n33 * n22 - n32 * n23,
			t12 = n32 * n13 - n33 * n12,
			t13 = n23 * n12 - n22 * n13,

			det = n11 * t11 + n21 * t12 + n31 * t13;

		if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0 );

		const detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
		te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

		te[ 3 ] = t12 * detInv;
		te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
		te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

		te[ 6 ] = t13 * detInv;
		te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
		te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

		return this;

	}

	transpose() {

		let tmp;
		const m = this.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;

	}

	getNormalMatrix( matrix4 ) {

		return this.setFromMatrix4( matrix4 ).invert().transpose();

	}

	transposeIntoArray( r ) {

		const m = this.elements;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	}

	setUvTransform( tx, ty, sx, sy, rotation, cx, cy ) {

		const c = Math.cos( rotation );
		const s = Math.sin( rotation );

		this.set(
			sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,
			- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,
			0, 0, 1
		);

		return this;

	}

	scale( sx, sy ) {

		const te = this.elements;

		te[ 0 ] *= sx; te[ 3 ] *= sx; te[ 6 ] *= sx;
		te[ 1 ] *= sy; te[ 4 ] *= sy; te[ 7 ] *= sy;

		return this;

	}

	rotate( theta ) {

		const c = Math.cos( theta );
		const s = Math.sin( theta );

		const te = this.elements;

		const a11 = te[ 0 ], a12 = te[ 3 ], a13 = te[ 6 ];
		const a21 = te[ 1 ], a22 = te[ 4 ], a23 = te[ 7 ];

		te[ 0 ] = c * a11 + s * a21;
		te[ 3 ] = c * a12 + s * a22;
		te[ 6 ] = c * a13 + s * a23;

		te[ 1 ] = - s * a11 + c * a21;
		te[ 4 ] = - s * a12 + c * a22;
		te[ 7 ] = - s * a13 + c * a23;

		return this;

	}

	translate( tx, ty ) {

		const te = this.elements;

		te[ 0 ] += tx * te[ 2 ]; te[ 3 ] += tx * te[ 5 ]; te[ 6 ] += tx * te[ 8 ];
		te[ 1 ] += ty * te[ 2 ]; te[ 4 ] += ty * te[ 5 ]; te[ 7 ] += ty * te[ 8 ];

		return this;

	}

	equals( matrix ) {

		const te = this.elements;
		const me = matrix.elements;

		for ( let i = 0; i < 9; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false;

		}

		return true;

	}

	fromArray( array, offset = 0 ) {

		for ( let i = 0; i < 9; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	}

	toArray( array = [], offset = 0 ) {

		const te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];

		array[ offset + 3 ] = te[ 3 ];
		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];

		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];
		array[ offset + 8 ] = te[ 8 ];

		return array;

	}

	clone() {

		return new this.constructor().fromArray( this.elements );

	}

}

Matrix3.prototype.isMatrix3 = true;

let _canvas;

const ImageUtils = {

	getDataURL: function ( image ) {

		if ( /^data:/i.test( image.src ) ) {

			return image.src;

		}

		if ( typeof HTMLCanvasElement == 'undefined' ) {

			return image.src;

		}

		let canvas;

		if ( image instanceof HTMLCanvasElement ) {

			canvas = image;

		} else {

			if ( _canvas === undefined ) _canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );

			_canvas.width = image.width;
			_canvas.height = image.height;

			const context = _canvas.getContext( '2d' );

			if ( image instanceof ImageData ) {

				context.putImageData( image, 0, 0 );

			} else {

				context.drawImage( image, 0, 0, image.width, image.height );

			}

			canvas = _canvas;

		}

		if ( canvas.width > 2048 || canvas.height > 2048 ) {

			return canvas.toDataURL( 'image/jpeg', 0.6 );

		} else {

			return canvas.toDataURL( 'image/png' );

		}

	}

};

let textureId = 0;

class Texture extends EventDispatcher {

	constructor( image = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = 1, encoding = LinearEncoding ) {

		super();

		Object.defineProperty( this, 'id', { value: textureId ++ } );

		this.uuid = MathUtils.generateUUID();

		this.name = '';

		this.image = image;
		this.mipmaps = [];

		this.mapping = mapping;

		this.wrapS = wrapS;
		this.wrapT = wrapT;

		this.magFilter = magFilter;
		this.minFilter = minFilter;

		this.anisotropy = anisotropy;

		this.format = format;
		this.internalFormat = null;
		this.type = type;

		this.offset = new Vector2( 0, 0 );
		this.repeat = new Vector2( 1, 1 );
		this.center = new Vector2( 0, 0 );
		this.rotation = 0;

		this.matrixAutoUpdate = true;
		this.matrix = new Matrix3();

		this.generateMipmaps = true;
		this.premultiplyAlpha = false;
		this.flipY = true;
		this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

		// Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
		//
		// Also changing the encoding after already used by a Material will not automatically make the Material
		// update. You need to explicitly call Material.needsUpdate to trigger it to recompile.
		this.encoding = encoding;

		this.version = 0;
		this.onUpdate = null;

	}

	updateMatrix() {

		this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( source ) {

		this.name = source.name;

		this.image = source.image;
		this.mipmaps = source.mipmaps.slice( 0 );

		this.mapping = source.mapping;

		this.wrapS = source.wrapS;
		this.wrapT = source.wrapT;

		this.magFilter = source.magFilter;
		this.minFilter = source.minFilter;

		this.anisotropy = source.anisotropy;

		this.format = source.format;
		this.internalFormat = source.internalFormat;
		this.type = source.type;

		this.offset.copy( source.offset );
		this.repeat.copy( source.repeat );
		this.center.copy( source.center );
		this.rotation = source.rotation;

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrix.copy( source.matrix );

		this.generateMipmaps = source.generateMipmaps;
		this.premultiplyAlpha = source.premultiplyAlpha;
		this.flipY = source.flipY;
		this.unpackAlignment = source.unpackAlignment;
		this.encoding = source.encoding;

		return this;

	}

	toJSON( meta ) {

		const isRootObject = ( meta === undefined || typeof meta === 'string' );

		if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

			return meta.textures[ this.uuid ];

		}

		const output = {

			metadata: {
				version: 4.5,
				type: 'Texture',
				generator: 'Texture.toJSON'
			},

			uuid: this.uuid,
			name: this.name,

			mapping: this.mapping,

			repeat: [ this.repeat.x, this.repeat.y ],
			offset: [ this.offset.x, this.offset.y ],
			center: [ this.center.x, this.center.y ],
			rotation: this.rotation,

			wrap: [ this.wrapS, this.wrapT ],

			format: this.format,
			type: this.type,
			encoding: this.encoding,

			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,

			flipY: this.flipY,

			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment

		};

		if ( this.image !== undefined ) {

			// TODO: Move to THREE.Image

			const image = this.image;

			if ( image.uuid === undefined ) {

				image.uuid = MathUtils.generateUUID(); // UGH

			}

			if ( ! isRootObject && meta.images[ image.uuid ] === undefined ) {

				let url;

				if ( Array.isArray( image ) ) {

					// process array of images e.g. CubeTexture

					url = [];

					for ( let i = 0, l = image.length; i < l; i ++ ) {

						// check cube texture with data textures

						if ( image[ i ].isDataTexture ) {

							url.push( serializeImage( image[ i ].image ) );

						} else {

							url.push( serializeImage( image[ i ] ) );

						}

					}

				} else {

					// process single image

					url = serializeImage( image );

				}

				meta.images[ image.uuid ] = {
					uuid: image.uuid,
					url: url
				};

			}

			output.image = image.uuid;

		}

		if ( ! isRootObject ) {

			meta.textures[ this.uuid ] = output;

		}

		return output;

	}

	dispose() {

		this.dispatchEvent( { type: 'dispose' } );

	}

	transformUv( uv ) {

		if ( this.mapping !== UVMapping ) return uv;

		uv.applyMatrix3( this.matrix );

		if ( uv.x < 0 || uv.x > 1 ) {

			switch ( this.wrapS ) {

				case RepeatWrapping:

					uv.x = uv.x - Math.floor( uv.x );
					break;

				case ClampToEdgeWrapping:

					uv.x = uv.x < 0 ? 0 : 1;
					break;

				case MirroredRepeatWrapping:

					if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

						uv.x = Math.ceil( uv.x ) - uv.x;

					} else {

						uv.x = uv.x - Math.floor( uv.x );

					}

					break;

			}

		}

		if ( uv.y < 0 || uv.y > 1 ) {

			switch ( this.wrapT ) {

				case RepeatWrapping:

					uv.y = uv.y - Math.floor( uv.y );
					break;

				case ClampToEdgeWrapping:

					uv.y = uv.y < 0 ? 0 : 1;
					break;

				case MirroredRepeatWrapping:

					if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

						uv.y = Math.ceil( uv.y ) - uv.y;

					} else {

						uv.y = uv.y - Math.floor( uv.y );

					}

					break;

			}

		}

		if ( this.flipY ) {

			uv.y = 1 - uv.y;

		}

		return uv;

	}

	set needsUpdate( value ) {

		if ( value === true ) this.version ++;

	}

}

Texture.DEFAULT_IMAGE = undefined;
Texture.DEFAULT_MAPPING = UVMapping;

Texture.prototype.isTexture = true;

function serializeImage( image ) {

	if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
		( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
		( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

		// default images

		return ImageUtils.getDataURL( image );

	} else {

		if ( image.data ) {

			// images of DataTexture

			return {
				data: Array.prototype.slice.call( image.data ),
				width: image.width,
				height: image.height,
				type: image.data.constructor.name
			};

		} else {

			console.warn( 'THREE.Texture: Unable to serialize Texture.' );
			return {};

		}

	}

}

class Vector4 {

	constructor( x = 0, y = 0, z = 0, w = 1 ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

	}

	get width() {

		return this.z;

	}

	set width( value ) {

		this.z = value;

	}

	get height() {

		return this.w;

	}

	set height( value ) {

		this.w = value;

	}

	set( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	}

	setScalar( scalar ) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		this.w = scalar;

		return this;

	}

	setX( x ) {

		this.x = x;

		return this;

	}

	setY( y ) {

		this.y = y;

		return this;

	}

	setZ( z ) {

		this.z = z;

		return this;

	}

	setW( w ) {

		this.w = w;

		return this;

	}

	setComponent( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	getComponent( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	clone() {

		return new this.constructor( this.x, this.y, this.z, this.w );

	}

	copy( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;

		return this;

	}

	add( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	}

	addScalar( s ) {

		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;

		return this;

	}

	addVectors( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	}

	addScaledVector( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;
		this.w += v.w * s;

		return this;

	}

	sub( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	}

	subScalar( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;
		this.w -= s;

		return this;

	}

	subVectors( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	}

	multiply( v ) {

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		this.w *= v.w;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;

	}

	applyMatrix4( m ) {

		const x = this.x, y = this.y, z = this.z, w = this.w;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
		this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

		return this;

	}

	divideScalar( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}

	setAxisAngleFromQuaternion( q ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized

		this.w = 2 * Math.acos( q.w );

		const s = Math.sqrt( 1 - q.w * q.w );

		if ( s < 0.0001 ) {

			this.x = 1;
			this.y = 0;
			this.z = 0;

		} else {

			this.x = q.x / s;
			this.y = q.y / s;
			this.z = q.z / s;

		}

		return this;

	}

	setAxisAngleFromRotationMatrix( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		let angle, x, y, z; // variables for result
		const epsilon = 0.01,		// margin to allow for rounding errors
			epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		if ( ( Math.abs( m12 - m21 ) < epsilon ) &&
		     ( Math.abs( m13 - m31 ) < epsilon ) &&
		     ( Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( Math.abs( m12 + m21 ) < epsilon2 ) &&
			     ( Math.abs( m13 + m31 ) < epsilon2 ) &&
			     ( Math.abs( m23 + m32 ) < epsilon2 ) &&
			     ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0

				this.set( 1, 0, 0, 0 );

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			const xx = ( m11 + 1 ) / 2;
			const yy = ( m22 + 1 ) / 2;
			const zz = ( m33 + 1 ) / 2;
			const xy = ( m12 + m21 ) / 4;
			const xz = ( m13 + m31 ) / 4;
			const yz = ( m23 + m32 ) / 4;

			if ( ( xx > yy ) && ( xx > zz ) ) {

				// m11 is the largest diagonal term

				if ( xx < epsilon ) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt( xx );
					y = xy / x;
					z = xz / x;

				}

			} else if ( yy > zz ) {

				// m22 is the largest diagonal term

				if ( yy < epsilon ) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt( yy );
					x = xy / y;
					z = yz / y;

				}

			} else {

				// m33 is the largest diagonal term so base result on this

				if ( zz < epsilon ) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt( zz );
					x = xz / z;
					y = yz / z;

				}

			}

			this.set( x, y, z, angle );

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		let s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 ) +
			( m13 - m31 ) * ( m13 - m31 ) +
			( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( Math.abs( s ) < 0.001 ) s = 1;

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = ( m32 - m23 ) / s;
		this.y = ( m13 - m31 ) / s;
		this.z = ( m21 - m12 ) / s;
		this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

		return this;

	}

	min( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );
		this.w = Math.min( this.w, v.w );

		return this;

	}

	max( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );
		this.w = Math.max( this.w, v.w );

		return this;

	}

	clamp( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );
		this.w = Math.max( min.w, Math.min( max.w, this.w ) );

		return this;

	}

	clampScalar( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );
		this.w = Math.max( minVal, Math.min( maxVal, this.w ) );

		return this;

	}

	clampLength( min, max ) {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}

	floor() {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );
		this.w = Math.floor( this.w );

		return this;

	}

	ceil() {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );
		this.w = Math.ceil( this.w );

		return this;

	}

	round() {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );
		this.w = Math.round( this.w );

		return this;

	}

	roundToZero() {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
		this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

		return this;

	}

	negate() {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		this.w = - this.w;

		return this;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	}

	lengthSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

	}

	length() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	}

	manhattanLength() {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

	}

	normalize() {

		return this.divideScalar( this.length() || 1 );

	}

	setLength( length ) {

		return this.normalize().multiplyScalar( length );

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;
		this.w = v1.w + ( v2.w - v1.w ) * alpha;

		return this;

	}

	equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

	}

	fromArray( array, offset = 0 ) {

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];
		this.w = array[ offset + 3 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;
		array[ offset + 3 ] = this.w;

		return array;

	}

	fromBufferAttribute( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector4: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		this.z = attribute.getZ( index );
		this.w = attribute.getW( index );

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();
		this.w = Math.random();

		return this;

	}

}

Vector4.prototype.isVector4 = true;

/*
 In options, we can specify:
 * Texture parameters for an auto-generated target texture
 * depthBuffer/stencilBuffer: Booleans to indicate if we should generate these buffers
*/
class WebGLRenderTarget extends EventDispatcher {

	constructor( width, height, options ) {

		super();

		this.width = width;
		this.height = height;
		this.depth = 1;

		this.scissor = new Vector4( 0, 0, width, height );
		this.scissorTest = false;

		this.viewport = new Vector4( 0, 0, width, height );

		options = options || {};

		this.texture = new Texture( undefined, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding );

		this.texture.image = {};
		this.texture.image.width = width;
		this.texture.image.height = height;
		this.texture.image.depth = 1;

		this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
		this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;

		this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
		this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : false;
		this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;

	}

	setTexture( texture ) {

		texture.image = {
			width: this.width,
			height: this.height,
			depth: this.depth
		};

		this.texture = texture;

	}

	setSize( width, height, depth = 1 ) {

		if ( this.width !== width || this.height !== height || this.depth !== depth ) {

			this.width = width;
			this.height = height;
			this.depth = depth;

			this.texture.image.width = width;
			this.texture.image.height = height;
			this.texture.image.depth = depth;

			this.dispose();

		}

		this.viewport.set( 0, 0, width, height );
		this.scissor.set( 0, 0, width, height );

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( source ) {

		this.width = source.width;
		this.height = source.height;
		this.depth = source.depth;

		this.viewport.copy( source.viewport );

		this.texture = source.texture.clone();

		this.depthBuffer = source.depthBuffer;
		this.stencilBuffer = source.stencilBuffer;
		this.depthTexture = source.depthTexture;

		return this;

	}

	dispose() {

		this.dispatchEvent( { type: 'dispose' } );

	}

}

WebGLRenderTarget.prototype.isWebGLRenderTarget = true;

class Quaternion {

	constructor( x = 0, y = 0, z = 0, w = 1 ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

	}

	static slerp( qa, qb, qm, t ) {

		return qm.copy( qa ).slerp( qb, t );

	}

	static slerpFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

		// fuzz-free, array-based Quaternion SLERP operation

		let x0 = src0[ srcOffset0 + 0 ],
			y0 = src0[ srcOffset0 + 1 ],
			z0 = src0[ srcOffset0 + 2 ],
			w0 = src0[ srcOffset0 + 3 ];

		const x1 = src1[ srcOffset1 + 0 ],
			y1 = src1[ srcOffset1 + 1 ],
			z1 = src1[ srcOffset1 + 2 ],
			w1 = src1[ srcOffset1 + 3 ];

		if ( t === 0 ) {

			dst[ dstOffset + 0 ] = x0;
			dst[ dstOffset + 1 ] = y0;
			dst[ dstOffset + 2 ] = z0;
			dst[ dstOffset + 3 ] = w0;
			return;

		}

		if ( t === 1 ) {

			dst[ dstOffset + 0 ] = x1;
			dst[ dstOffset + 1 ] = y1;
			dst[ dstOffset + 2 ] = z1;
			dst[ dstOffset + 3 ] = w1;
			return;

		}

		if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

			let s = 1 - t;
			const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
				dir = ( cos >= 0 ? 1 : - 1 ),
				sqrSin = 1 - cos * cos;

			// Skip the Slerp for tiny steps to avoid numeric problems:
			if ( sqrSin > Number.EPSILON ) {

				const sin = Math.sqrt( sqrSin ),
					len = Math.atan2( sin, cos * dir );

				s = Math.sin( s * len ) / sin;
				t = Math.sin( t * len ) / sin;

			}

			const tDir = t * dir;

			x0 = x0 * s + x1 * tDir;
			y0 = y0 * s + y1 * tDir;
			z0 = z0 * s + z1 * tDir;
			w0 = w0 * s + w1 * tDir;

			// Normalize in case we just did a lerp:
			if ( s === 1 - t ) {

				const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

				x0 *= f;
				y0 *= f;
				z0 *= f;
				w0 *= f;

			}

		}

		dst[ dstOffset ] = x0;
		dst[ dstOffset + 1 ] = y0;
		dst[ dstOffset + 2 ] = z0;
		dst[ dstOffset + 3 ] = w0;

	}

	static multiplyQuaternionsFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1 ) {

		const x0 = src0[ srcOffset0 ];
		const y0 = src0[ srcOffset0 + 1 ];
		const z0 = src0[ srcOffset0 + 2 ];
		const w0 = src0[ srcOffset0 + 3 ];

		const x1 = src1[ srcOffset1 ];
		const y1 = src1[ srcOffset1 + 1 ];
		const z1 = src1[ srcOffset1 + 2 ];
		const w1 = src1[ srcOffset1 + 3 ];

		dst[ dstOffset ] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
		dst[ dstOffset + 1 ] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
		dst[ dstOffset + 2 ] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
		dst[ dstOffset + 3 ] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

		return dst;

	}

	get x() {

		return this._x;

	}

	set x( value ) {

		this._x = value;
		this._onChangeCallback();

	}

	get y() {

		return this._y;

	}

	set y( value ) {

		this._y = value;
		this._onChangeCallback();

	}

	get z() {

		return this._z;

	}

	set z( value ) {

		this._z = value;
		this._onChangeCallback();

	}

	get w() {

		return this._w;

	}

	set w( value ) {

		this._w = value;
		this._onChangeCallback();

	}

	set( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this._onChangeCallback();

		return this;

	}

	clone() {

		return new this.constructor( this._x, this._y, this._z, this._w );

	}

	copy( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this._onChangeCallback();

		return this;

	}

	setFromEuler( euler, update ) {

		if ( ! ( euler && euler.isEuler ) ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		const x = euler._x, y = euler._y, z = euler._z, order = euler._order;

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		const cos = Math.cos;
		const sin = Math.sin;

		const c1 = cos( x / 2 );
		const c2 = cos( y / 2 );
		const c3 = cos( z / 2 );

		const s1 = sin( x / 2 );
		const s2 = sin( y / 2 );
		const s3 = sin( z / 2 );

		switch ( order ) {

			case 'XYZ':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'YXZ':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case 'ZXY':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'ZYX':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case 'YZX':
				this._x = s1 * c2 * c3 + c1 * s2 * s3;
				this._y = c1 * s2 * c3 + s1 * c2 * s3;
				this._z = c1 * c2 * s3 - s1 * s2 * c3;
				this._w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case 'XZY':
				this._x = s1 * c2 * c3 - c1 * s2 * s3;
				this._y = c1 * s2 * c3 - s1 * c2 * s3;
				this._z = c1 * c2 * s3 + s1 * s2 * c3;
				this._w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			default:
				console.warn( 'THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order );

		}

		if ( update !== false ) this._onChangeCallback();

		return this;

	}

	setFromAxisAngle( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		const halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this._onChangeCallback();

		return this;

	}

	setFromRotationMatrix( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		const te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33;

		if ( trace > 0 ) {

			const s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {

			const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this._onChangeCallback();

		return this;

	}

	setFromUnitVectors( vFrom, vTo ) {

		// assumes direction vectors vFrom and vTo are normalized

		const EPS = 0.000001;

		let r = vFrom.dot( vTo ) + 1;

		if ( r < EPS ) {

			r = 0;

			if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

				this._x = - vFrom.y;
				this._y = vFrom.x;
				this._z = 0;
				this._w = r;

			} else {

				this._x = 0;
				this._y = - vFrom.z;
				this._z = vFrom.y;
				this._w = r;

			}

		} else {

			// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

			this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
			this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
			this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
			this._w = r;

		}

		return this.normalize();

	}

	angleTo( q ) {

		return 2 * Math.acos( Math.abs( MathUtils.clamp( this.dot( q ), - 1, 1 ) ) );

	}

	rotateTowards( q, step ) {

		const angle = this.angleTo( q );

		if ( angle === 0 ) return this;

		const t = Math.min( 1, step / angle );

		this.slerp( q, t );

		return this;

	}

	identity() {

		return this.set( 0, 0, 0, 1 );

	}

	invert() {

		// quaternion is assumed to have unit length

		return this.conjugate();

	}

	conjugate() {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this._onChangeCallback();

		return this;

	}

	dot( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	}

	lengthSq() {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	}

	length() {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	}

	normalize() {

		let l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this._onChangeCallback();

		return this;

	}

	multiply( q, p ) {

		if ( p !== undefined ) {

			console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	}

	premultiply( q ) {

		return this.multiplyQuaternions( q, this );

	}

	multiplyQuaternions( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this._onChangeCallback();

		return this;

	}

	slerp( qb, t ) {

		if ( t === 0 ) return this;
		if ( t === 1 ) return this.copy( qb );

		const x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

		if ( sqrSinHalfTheta <= Number.EPSILON ) {

			const s = 1 - t;
			this._w = s * w + t * this._w;
			this._x = s * x + t * this._x;
			this._y = s * y + t * this._y;
			this._z = s * z + t * this._z;

			this.normalize();
			this._onChangeCallback();

			return this;

		}

		const sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
		const halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
		const ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
			ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this._onChangeCallback();

		return this;

	}

	equals( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	}

	fromArray( array, offset = 0 ) {

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this._onChangeCallback();

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	}

	fromBufferAttribute( attribute, index ) {

		this._x = attribute.getX( index );
		this._y = attribute.getY( index );
		this._z = attribute.getZ( index );
		this._w = attribute.getW( index );

		return this;

	}

	_onChange( callback ) {

		this._onChangeCallback = callback;

		return this;

	}

	_onChangeCallback() {}

}

Quaternion.prototype.isQuaternion = true;

class Vector3 {

	constructor( x = 0, y = 0, z = 0 ) {

		this.x = x;
		this.y = y;
		this.z = z;

	}

	set( x, y, z ) {

		if ( z === undefined ) z = this.z; // sprite.scale.set(x,y)

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

	setScalar( scalar ) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;

		return this;

	}

	setX( x ) {

		this.x = x;

		return this;

	}

	setY( y ) {

		this.y = y;

		return this;

	}

	setZ( z ) {

		this.z = z;

		return this;

	}

	setComponent( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	getComponent( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	clone() {

		return new this.constructor( this.x, this.y, this.z );

	}

	copy( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	}

	add( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	}

	addScalar( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	}

	addVectors( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	}

	addScaledVector( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;

		return this;

	}

	sub( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	}

	subScalar( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	}

	subVectors( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	}

	multiply( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	}

	multiplyScalar( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	}

	multiplyVectors( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	}

	applyEuler( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		return this.applyQuaternion( _quaternion.setFromEuler( euler ) );

	}

	applyAxisAngle( axis, angle ) {

		return this.applyQuaternion( _quaternion.setFromAxisAngle( axis, angle ) );

	}

	applyMatrix3( m ) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	}

	applyNormalMatrix( m ) {

		return this.applyMatrix3( m ).normalize();

	}

	applyMatrix4( m ) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		const w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

		return this;

	}

	applyQuaternion( q ) {

		const x = this.x, y = this.y, z = this.z;
		const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// calculate quat * vector

		const ix = qw * x + qy * z - qz * y;
		const iy = qw * y + qz * x - qx * z;
		const iz = qw * z + qx * y - qy * x;
		const iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	}

	project( camera ) {

		return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

	}

	unproject( camera ) {

		return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );

	}

	transformDirection( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this.normalize();

	}

	divide( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	}

	divideScalar( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	}

	min( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );

		return this;

	}

	max( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );

		return this;

	}

	clamp( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );

		return this;

	}

	clampScalar( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

		return this;

	}

	clampLength( min, max ) {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}

	floor() {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	}

	ceil() {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	}

	round() {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	}

	roundToZero() {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	}

	negate() {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	}

	dot( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	// TODO lengthSquared?

	lengthSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	}

	length() {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	}

	manhattanLength() {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	}

	normalize() {

		return this.divideScalar( this.length() || 1 );

	}

	setLength( length ) {

		return this.normalize().multiplyScalar( length );

	}

	lerp( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	}

	lerpVectors( v1, v2, alpha ) {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;

		return this;

	}

	cross( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		return this.crossVectors( this, v );

	}

	crossVectors( a, b ) {

		const ax = a.x, ay = a.y, az = a.z;
		const bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}

	projectOnVector( v ) {

		const denominator = v.lengthSq();

		if ( denominator === 0 ) return this.set( 0, 0, 0 );

		const scalar = v.dot( this ) / denominator;

		return this.copy( v ).multiplyScalar( scalar );

	}

	projectOnPlane( planeNormal ) {

		_vector.copy( this ).projectOnVector( planeNormal );

		return this.sub( _vector );

	}

	reflect( normal ) {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		return this.sub( _vector.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

	}

	angleTo( v ) {

		const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

		if ( denominator === 0 ) return Math.PI / 2;

		const theta = this.dot( v ) / denominator;

		// clamp, to handle numerical problems

		return Math.acos( MathUtils.clamp( theta, - 1, 1 ) );

	}

	distanceTo( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	}

	distanceToSquared( v ) {

		const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	}

	manhattanDistanceTo( v ) {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

	}

	setFromSpherical( s ) {

		return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

	}

	setFromSphericalCoords( radius, phi, theta ) {

		const sinPhiRadius = Math.sin( phi ) * radius;

		this.x = sinPhiRadius * Math.sin( theta );
		this.y = Math.cos( phi ) * radius;
		this.z = sinPhiRadius * Math.cos( theta );

		return this;

	}

	setFromCylindrical( c ) {

		return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

	}

	setFromCylindricalCoords( radius, theta, y ) {

		this.x = radius * Math.sin( theta );
		this.y = y;
		this.z = radius * Math.cos( theta );

		return this;

	}

	setFromMatrixPosition( m ) {

		const e = m.elements;

		this.x = e[ 12 ];
		this.y = e[ 13 ];
		this.z = e[ 14 ];

		return this;

	}

	setFromMatrixScale( m ) {

		const sx = this.setFromMatrixColumn( m, 0 ).length();
		const sy = this.setFromMatrixColumn( m, 1 ).length();
		const sz = this.setFromMatrixColumn( m, 2 ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;

	}

	setFromMatrixColumn( m, index ) {

		return this.fromArray( m.elements, index * 4 );

	}

	setFromMatrix3Column( m, index ) {

		return this.fromArray( m.elements, index * 3 );

	}

	equals( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	}

	fromArray( array, offset = 0 ) {

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	}

	fromBufferAttribute( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector3: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		this.z = attribute.getZ( index );

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();

		return this;

	}

}

Vector3.prototype.isVector3 = true;

const _vector = /*@__PURE__*/ new Vector3();
const _quaternion = /*@__PURE__*/ new Quaternion();

class Box3 {

	constructor( min = new Vector3( + Infinity, + Infinity, + Infinity ), max = new Vector3( - Infinity, - Infinity, - Infinity ) ) {

		this.min = min;
		this.max = max;

	}

	set( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	}

	setFromArray( array ) {

		let minX = + Infinity;
		let minY = + Infinity;
		let minZ = + Infinity;

		let maxX = - Infinity;
		let maxY = - Infinity;
		let maxZ = - Infinity;

		for ( let i = 0, l = array.length; i < l; i += 3 ) {

			const x = array[ i ];
			const y = array[ i + 1 ];
			const z = array[ i + 2 ];

			if ( x < minX ) minX = x;
			if ( y < minY ) minY = y;
			if ( z < minZ ) minZ = z;

			if ( x > maxX ) maxX = x;
			if ( y > maxY ) maxY = y;
			if ( z > maxZ ) maxZ = z;

		}

		this.min.set( minX, minY, minZ );
		this.max.set( maxX, maxY, maxZ );

		return this;

	}

	setFromBufferAttribute( attribute ) {

		let minX = + Infinity;
		let minY = + Infinity;
		let minZ = + Infinity;

		let maxX = - Infinity;
		let maxY = - Infinity;
		let maxZ = - Infinity;

		for ( let i = 0, l = attribute.count; i < l; i ++ ) {

			const x = attribute.getX( i );
			const y = attribute.getY( i );
			const z = attribute.getZ( i );

			if ( x < minX ) minX = x;
			if ( y < minY ) minY = y;
			if ( z < minZ ) minZ = z;

			if ( x > maxX ) maxX = x;
			if ( y > maxY ) maxY = y;
			if ( z > maxZ ) maxZ = z;

		}

		this.min.set( minX, minY, minZ );
		this.max.set( maxX, maxY, maxZ );

		return this;

	}

	setFromPoints( points ) {

		this.makeEmpty();

		for ( let i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] );

		}

		return this;

	}

	setFromCenterAndSize( center, size ) {

		const halfSize = _vector$1.copy( size ).multiplyScalar( 0.5 );

		this.min.copy( center ).sub( halfSize );
		this.max.copy( center ).add( halfSize );

		return this;

	}

	setFromObject( object ) {

		this.makeEmpty();

		return this.expandByObject( object );

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	}

	makeEmpty() {

		this.min.x = this.min.y = this.min.z = + Infinity;
		this.max.x = this.max.y = this.max.z = - Infinity;

		return this;

	}

	isEmpty() {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

	}

	getCenter( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box3: .getCenter() target is now required' );
			target = new Vector3();

		}

		return this.isEmpty() ? target.set( 0, 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	}

	getSize( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box3: .getSize() target is now required' );
			target = new Vector3();

		}

		return this.isEmpty() ? target.set( 0, 0, 0 ) : target.subVectors( this.max, this.min );

	}

	expandByPoint( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;

	}

	expandByVector( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;

	}

	expandByScalar( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;

	}

	expandByObject( object ) {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and children's, world transforms

		object.updateWorldMatrix( false, false );

		const geometry = object.geometry;

		if ( geometry !== undefined ) {

			if ( geometry.boundingBox === null ) {

				geometry.computeBoundingBox();

			}

			_box.copy( geometry.boundingBox );
			_box.applyMatrix4( object.matrixWorld );

			this.union( _box );

		}

		const children = object.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			this.expandByObject( children[ i ] );

		}

		return this;

	}

	containsPoint( point ) {

		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ||
			point.z < this.min.z || point.z > this.max.z ? false : true;

	}

	containsBox( box ) {

		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y &&
			this.min.z <= box.min.z && box.max.z <= this.max.z;

	}

	getParameter( point, target ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		if ( target === undefined ) {

			console.warn( 'THREE.Box3: .getParameter() target is now required' );
			target = new Vector3();

		}

		return target.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z )
		);

	}

	intersectsBox( box ) {

		// using 6 splitting planes to rule out intersections.
		return box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ||
			box.max.z < this.min.z || box.min.z > this.max.z ? false : true;

	}

	intersectsSphere( sphere ) {

		// Find the point on the AABB closest to the sphere center.
		this.clampPoint( sphere.center, _vector$1 );

		// If that point is inside the sphere, the AABB and sphere intersect.
		return _vector$1.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

	}

	intersectsPlane( plane ) {

		// We compute the minimum and maximum dot product values. If those values
		// are on the same side (back or front) of the plane, then there is no intersection.

		let min, max;

		if ( plane.normal.x > 0 ) {

			min = plane.normal.x * this.min.x;
			max = plane.normal.x * this.max.x;

		} else {

			min = plane.normal.x * this.max.x;
			max = plane.normal.x * this.min.x;

		}

		if ( plane.normal.y > 0 ) {

			min += plane.normal.y * this.min.y;
			max += plane.normal.y * this.max.y;

		} else {

			min += plane.normal.y * this.max.y;
			max += plane.normal.y * this.min.y;

		}

		if ( plane.normal.z > 0 ) {

			min += plane.normal.z * this.min.z;
			max += plane.normal.z * this.max.z;

		} else {

			min += plane.normal.z * this.max.z;
			max += plane.normal.z * this.min.z;

		}

		return ( min <= - plane.constant && max >= - plane.constant );

	}

	intersectsTriangle( triangle ) {

		if ( this.isEmpty() ) {

			return false;

		}

		// compute box center and extents
		this.getCenter( _center );
		_extents.subVectors( this.max, _center );

		// translate triangle to aabb origin
		_v0.subVectors( triangle.a, _center );
		_v1.subVectors( triangle.b, _center );
		_v2.subVectors( triangle.c, _center );

		// compute edge vectors for triangle
		_f0.subVectors( _v1, _v0 );
		_f1.subVectors( _v2, _v1 );
		_f2.subVectors( _v0, _v2 );

		// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
		// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
		// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
		let axes = [
			0, - _f0.z, _f0.y, 0, - _f1.z, _f1.y, 0, - _f2.z, _f2.y,
			_f0.z, 0, - _f0.x, _f1.z, 0, - _f1.x, _f2.z, 0, - _f2.x,
			- _f0.y, _f0.x, 0, - _f1.y, _f1.x, 0, - _f2.y, _f2.x, 0
		];
		if ( ! satForAxes( axes, _v0, _v1, _v2, _extents ) ) {

			return false;

		}

		// test 3 face normals from the aabb
		axes = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
		if ( ! satForAxes( axes, _v0, _v1, _v2, _extents ) ) {

			return false;

		}

		// finally testing the face normal of the triangle
		// use already existing triangle edge vectors here
		_triangleNormal.crossVectors( _f0, _f1 );
		axes = [ _triangleNormal.x, _triangleNormal.y, _triangleNormal.z ];

		return satForAxes( axes, _v0, _v1, _v2, _extents );

	}

	clampPoint( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box3: .clampPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( point ).clamp( this.min, this.max );

	}

	distanceToPoint( point ) {

		const clampedPoint = _vector$1.copy( point ).clamp( this.min, this.max );

		return clampedPoint.sub( point ).length();

	}

	getBoundingSphere( target ) {

		if ( target === undefined ) {

			console.error( 'THREE.Box3: .getBoundingSphere() target is now required' );
			//target = new Sphere(); // removed to avoid cyclic dependency

		}

		this.getCenter( target.center );

		target.radius = this.getSize( _vector$1 ).length() * 0.5;

		return target;

	}

	intersect( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
		if ( this.isEmpty() ) this.makeEmpty();

		return this;

	}

	union( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	}

	applyMatrix4( matrix ) {

		// transform of empty box is an empty box.
		if ( this.isEmpty() ) return this;

		// NOTE: I am using a binary pattern to specify all 2^3 combinations below
		_points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
		_points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
		_points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
		_points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
		_points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
		_points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
		_points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
		_points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 111

		this.setFromPoints( _points );

		return this;

	}

	translate( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	}

	equals( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	}

}

Box3.prototype.isBox3 = true;

const _points = [
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3(),
	/*@__PURE__*/ new Vector3()
];

const _vector$1 = /*@__PURE__*/ new Vector3();

const _box = /*@__PURE__*/ new Box3();

// triangle centered vertices

const _v0 = /*@__PURE__*/ new Vector3();
const _v1 = /*@__PURE__*/ new Vector3();
const _v2 = /*@__PURE__*/ new Vector3();

// triangle edge vectors

const _f0 = /*@__PURE__*/ new Vector3();
const _f1 = /*@__PURE__*/ new Vector3();
const _f2 = /*@__PURE__*/ new Vector3();

const _center = /*@__PURE__*/ new Vector3();
const _extents = /*@__PURE__*/ new Vector3();
const _triangleNormal = /*@__PURE__*/ new Vector3();
const _testAxis = /*@__PURE__*/ new Vector3();

function satForAxes( axes, v0, v1, v2, extents ) {

	for ( let i = 0, j = axes.length - 3; i <= j; i += 3 ) {

		_testAxis.fromArray( axes, i );
		// project the aabb onto the seperating axis
		const r = extents.x * Math.abs( _testAxis.x ) + extents.y * Math.abs( _testAxis.y ) + extents.z * Math.abs( _testAxis.z );
		// project all 3 vertices of the triangle onto the seperating axis
		const p0 = v0.dot( _testAxis );
		const p1 = v1.dot( _testAxis );
		const p2 = v2.dot( _testAxis );
		// actual test, basically see if either of the most extreme of the triangle points intersects r
		if ( Math.max( - Math.max( p0, p1, p2 ), Math.min( p0, p1, p2 ) ) > r ) {

			// points of the projected triangle are outside the projected half-length of the aabb
			// the axis is seperating and we can exit
			return false;

		}

	}

	return true;

}

const _box$1 = /*@__PURE__*/ new Box3();

class Sphere {

	constructor( center = new Vector3(), radius = - 1 ) {

		this.center = center;
		this.radius = radius;

	}

	set( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;

	}

	setFromPoints( points, optionalCenter ) {

		const center = this.center;

		if ( optionalCenter !== undefined ) {

			center.copy( optionalCenter );

		} else {

			_box$1.setFromPoints( points ).getCenter( center );

		}

		let maxRadiusSq = 0;

		for ( let i = 0, il = points.length; i < il; i ++ ) {

			maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

		}

		this.radius = Math.sqrt( maxRadiusSq );

		return this;

	}

	copy( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;

	}

	isEmpty() {

		return ( this.radius < 0 );

	}

	makeEmpty() {

		this.center.set( 0, 0, 0 );
		this.radius = - 1;

		return this;

	}

	containsPoint( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	}

	distanceToPoint( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	}

	intersectsSphere( sphere ) {

		const radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	}

	intersectsBox( box ) {

		return box.intersectsSphere( this );

	}

	intersectsPlane( plane ) {

		return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

	}

	clampPoint( point, target ) {

		const deltaLengthSq = this.center.distanceToSquared( point );

		if ( target === undefined ) {

			console.warn( 'THREE.Sphere: .clampPoint() target is now required' );
			target = new Vector3();

		}

		target.copy( point );

		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			target.sub( this.center ).normalize();
			target.multiplyScalar( this.radius ).add( this.center );

		}

		return target;

	}

	getBoundingBox( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Sphere: .getBoundingBox() target is now required' );
			target = new Box3();

		}

		if ( this.isEmpty() ) {

			// Empty sphere produces empty bounding box
			target.makeEmpty();
			return target;

		}

		target.set( this.center, this.center );
		target.expandByScalar( this.radius );

		return target;

	}

	applyMatrix4( matrix ) {

		this.center.applyMatrix4( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;

	}

	translate( offset ) {

		this.center.add( offset );

		return this;

	}

	equals( sphere ) {

		return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

const _vector$2 = /*@__PURE__*/ new Vector3();
const _segCenter = /*@__PURE__*/ new Vector3();
const _segDir = /*@__PURE__*/ new Vector3();
const _diff = /*@__PURE__*/ new Vector3();

const _edge1 = /*@__PURE__*/ new Vector3();
const _edge2 = /*@__PURE__*/ new Vector3();
const _normal = /*@__PURE__*/ new Vector3();

class Ray {

	constructor( origin = new Vector3(), direction = new Vector3( 0, 0, - 1 ) ) {

		this.origin = origin;
		this.direction = direction;

	}

	set( origin, direction ) {

		this.origin.copy( origin );
		this.direction.copy( direction );

		return this;

	}

	copy( ray ) {

		this.origin.copy( ray.origin );
		this.direction.copy( ray.direction );

		return this;

	}

	at( t, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Ray: .at() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.direction ).multiplyScalar( t ).add( this.origin );

	}

	lookAt( v ) {

		this.direction.copy( v ).sub( this.origin ).normalize();

		return this;

	}

	recast( t ) {

		this.origin.copy( this.at( t, _vector$2 ) );

		return this;

	}

	closestPointToPoint( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Ray: .closestPointToPoint() target is now required' );
			target = new Vector3();

		}

		target.subVectors( point, this.origin );

		const directionDistance = target.dot( this.direction );

		if ( directionDistance < 0 ) {

			return target.copy( this.origin );

		}

		return target.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

	}

	distanceToPoint( point ) {

		return Math.sqrt( this.distanceSqToPoint( point ) );

	}

	distanceSqToPoint( point ) {

		const directionDistance = _vector$2.subVectors( point, this.origin ).dot( this.direction );

		// point behind the ray

		if ( directionDistance < 0 ) {

			return this.origin.distanceToSquared( point );

		}

		_vector$2.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

		return _vector$2.distanceToSquared( point );

	}

	distanceSqToSegment( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

		// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
		// It returns the min distance between the ray and the segment
		// defined by v0 and v1
		// It can also set two optional targets :
		// - The closest point on the ray
		// - The closest point on the segment

		_segCenter.copy( v0 ).add( v1 ).multiplyScalar( 0.5 );
		_segDir.copy( v1 ).sub( v0 ).normalize();
		_diff.copy( this.origin ).sub( _segCenter );

		const segExtent = v0.distanceTo( v1 ) * 0.5;
		const a01 = - this.direction.dot( _segDir );
		const b0 = _diff.dot( this.direction );
		const b1 = - _diff.dot( _segDir );
		const c = _diff.lengthSq();
		const det = Math.abs( 1 - a01 * a01 );
		let s0, s1, sqrDist, extDet;

		if ( det > 0 ) {

			// The ray and segment are not parallel.

			s0 = a01 * b1 - b0;
			s1 = a01 * b0 - b1;
			extDet = segExtent * det;

			if ( s0 >= 0 ) {

				if ( s1 >= - extDet ) {

					if ( s1 <= extDet ) {

						// region 0
						// Minimum at interior points of ray and segment.

						const invDet = 1 / det;
						s0 *= invDet;
						s1 *= invDet;
						sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

					} else {

						// region 1

						s1 = segExtent;
						s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					}

				} else {

					// region 5

					s1 = - segExtent;
					s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

			} else {

				if ( s1 <= - extDet ) {

					// region 4

					s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
					s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				} else if ( s1 <= extDet ) {

					// region 3

					s0 = 0;
					s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = s1 * ( s1 + 2 * b1 ) + c;

				} else {

					// region 2

					s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
					s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

			}

		} else {

			// Ray and segment are parallel.

			s1 = ( a01 > 0 ) ? - segExtent : segExtent;
			s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
			sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

		}

		if ( optionalPointOnRay ) {

			optionalPointOnRay.copy( this.direction ).multiplyScalar( s0 ).add( this.origin );

		}

		if ( optionalPointOnSegment ) {

			optionalPointOnSegment.copy( _segDir ).multiplyScalar( s1 ).add( _segCenter );

		}

		return sqrDist;

	}

	intersectSphere( sphere, target ) {

		_vector$2.subVectors( sphere.center, this.origin );
		const tca = _vector$2.dot( this.direction );
		const d2 = _vector$2.dot( _vector$2 ) - tca * tca;
		const radius2 = sphere.radius * sphere.radius;

		if ( d2 > radius2 ) return null;

		const thc = Math.sqrt( radius2 - d2 );

		// t0 = first intersect point - entrance on front of sphere
		const t0 = tca - thc;

		// t1 = second intersect point - exit point on back of sphere
		const t1 = tca + thc;

		// test to see if both t0 and t1 are behind the ray - if so, return null
		if ( t0 < 0 && t1 < 0 ) return null;

		// test to see if t0 is behind the ray:
		// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
		// in order to always return an intersect point that is in front of the ray.
		if ( t0 < 0 ) return this.at( t1, target );

		// else t0 is in front of the ray, so return the first collision point scaled by t0
		return this.at( t0, target );

	}

	intersectsSphere( sphere ) {

		return this.distanceSqToPoint( sphere.center ) <= ( sphere.radius * sphere.radius );

	}

	distanceToPlane( plane ) {

		const denominator = plane.normal.dot( this.direction );

		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( plane.distanceToPoint( this.origin ) === 0 ) {

				return 0;

			}

			// Null is preferable to undefined since undefined means.... it is undefined

			return null;

		}

		const t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

		// Return if the ray never intersects the plane

		return t >= 0 ? t : null;

	}

	intersectPlane( plane, target ) {

		const t = this.distanceToPlane( plane );

		if ( t === null ) {

			return null;

		}

		return this.at( t, target );

	}

	intersectsPlane( plane ) {

		// check if the ray lies on the plane first

		const distToPoint = plane.distanceToPoint( this.origin );

		if ( distToPoint === 0 ) {

			return true;

		}

		const denominator = plane.normal.dot( this.direction );

		if ( denominator * distToPoint < 0 ) {

			return true;

		}

		// ray origin is behind the plane (and is pointing behind it)

		return false;

	}

	intersectBox( box, target ) {

		let tmin, tmax, tymin, tymax, tzmin, tzmax;

		const invdirx = 1 / this.direction.x,
			invdiry = 1 / this.direction.y,
			invdirz = 1 / this.direction.z;

		const origin = this.origin;

		if ( invdirx >= 0 ) {

			tmin = ( box.min.x - origin.x ) * invdirx;
			tmax = ( box.max.x - origin.x ) * invdirx;

		} else {

			tmin = ( box.max.x - origin.x ) * invdirx;
			tmax = ( box.min.x - origin.x ) * invdirx;

		}

		if ( invdiry >= 0 ) {

			tymin = ( box.min.y - origin.y ) * invdiry;
			tymax = ( box.max.y - origin.y ) * invdiry;

		} else {

			tymin = ( box.max.y - origin.y ) * invdiry;
			tymax = ( box.min.y - origin.y ) * invdiry;

		}

		if ( ( tmin > tymax ) || ( tymin > tmax ) ) return null;

		// These lines also handle the case where tmin or tmax is NaN
		// (result of 0 * Infinity). x !== x returns true if x is NaN

		if ( tymin > tmin || tmin !== tmin ) tmin = tymin;

		if ( tymax < tmax || tmax !== tmax ) tmax = tymax;

		if ( invdirz >= 0 ) {

			tzmin = ( box.min.z - origin.z ) * invdirz;
			tzmax = ( box.max.z - origin.z ) * invdirz;

		} else {

			tzmin = ( box.max.z - origin.z ) * invdirz;
			tzmax = ( box.min.z - origin.z ) * invdirz;

		}

		if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) return null;

		if ( tzmin > tmin || tmin !== tmin ) tmin = tzmin;

		if ( tzmax < tmax || tmax !== tmax ) tmax = tzmax;

		//return point closest to the ray (positive side)

		if ( tmax < 0 ) return null;

		return this.at( tmin >= 0 ? tmin : tmax, target );

	}

	intersectsBox( box ) {

		return this.intersectBox( box, _vector$2 ) !== null;

	}

	intersectTriangle( a, b, c, backfaceCulling, target ) {

		// Compute the offset origin, edges, and normal.

		// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

		_edge1.subVectors( b, a );
		_edge2.subVectors( c, a );
		_normal.crossVectors( _edge1, _edge2 );

		// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
		// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
		//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
		//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
		//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
		let DdN = this.direction.dot( _normal );
		let sign;

		if ( DdN > 0 ) {

			if ( backfaceCulling ) return null;
			sign = 1;

		} else if ( DdN < 0 ) {

			sign = - 1;
			DdN = - DdN;

		} else {

			return null;

		}

		_diff.subVectors( this.origin, a );
		const DdQxE2 = sign * this.direction.dot( _edge2.crossVectors( _diff, _edge2 ) );

		// b1 < 0, no intersection
		if ( DdQxE2 < 0 ) {

			return null;

		}

		const DdE1xQ = sign * this.direction.dot( _edge1.cross( _diff ) );

		// b2 < 0, no intersection
		if ( DdE1xQ < 0 ) {

			return null;

		}

		// b1+b2 > 1, no intersection
		if ( DdQxE2 + DdE1xQ > DdN ) {

			return null;

		}

		// Line intersects triangle, check if ray does.
		const QdN = - sign * _diff.dot( _normal );

		// t < 0, no intersection
		if ( QdN < 0 ) {

			return null;

		}

		// Ray intersects triangle.
		return this.at( QdN / DdN, target );

	}

	applyMatrix4( matrix4 ) {

		this.origin.applyMatrix4( matrix4 );
		this.direction.transformDirection( matrix4 );

		return this;

	}

	equals( ray ) {

		return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

class Matrix4 {

	constructor() {

		this.elements = [

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		];

		if ( arguments.length > 0 ) {

			console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

		}

	}

	set( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		const te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	}

	identity() {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	clone() {

		return new Matrix4().fromArray( this.elements );

	}

	copy( m ) {

		const te = this.elements;
		const me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
		te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
		te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
		te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

		return this;

	}

	copyPosition( m ) {

		const te = this.elements, me = m.elements;

		te[ 12 ] = me[ 12 ];
		te[ 13 ] = me[ 13 ];
		te[ 14 ] = me[ 14 ];

		return this;

	}

	setFromMatrix3( m ) {

		const me = m.elements;

		this.set(

			me[ 0 ], me[ 3 ], me[ 6 ], 0,
			me[ 1 ], me[ 4 ], me[ 7 ], 0,
			me[ 2 ], me[ 5 ], me[ 8 ], 0,
			0, 0, 0, 1

		);

		return this;

	}

	extractBasis( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrixColumn( this, 0 );
		yAxis.setFromMatrixColumn( this, 1 );
		zAxis.setFromMatrixColumn( this, 2 );

		return this;

	}

	makeBasis( xAxis, yAxis, zAxis ) {

		this.set(
			xAxis.x, yAxis.x, zAxis.x, 0,
			xAxis.y, yAxis.y, zAxis.y, 0,
			xAxis.z, yAxis.z, zAxis.z, 0,
			0, 0, 0, 1
		);

		return this;

	}

	extractRotation( m ) {

		// this method does not support reflection matrices

		const te = this.elements;
		const me = m.elements;

		const scaleX = 1 / _v1$1.setFromMatrixColumn( m, 0 ).length();
		const scaleY = 1 / _v1$1.setFromMatrixColumn( m, 1 ).length();
		const scaleZ = 1 / _v1$1.setFromMatrixColumn( m, 2 ).length();

		te[ 0 ] = me[ 0 ] * scaleX;
		te[ 1 ] = me[ 1 ] * scaleX;
		te[ 2 ] = me[ 2 ] * scaleX;
		te[ 3 ] = 0;

		te[ 4 ] = me[ 4 ] * scaleY;
		te[ 5 ] = me[ 5 ] * scaleY;
		te[ 6 ] = me[ 6 ] * scaleY;
		te[ 7 ] = 0;

		te[ 8 ] = me[ 8 ] * scaleZ;
		te[ 9 ] = me[ 9 ] * scaleZ;
		te[ 10 ] = me[ 10 ] * scaleZ;
		te[ 11 ] = 0;

		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	}

	makeRotationFromEuler( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

		}

		const te = this.elements;

		const x = euler.x, y = euler.y, z = euler.z;
		const a = Math.cos( x ), b = Math.sin( x );
		const c = Math.cos( y ), d = Math.sin( y );
		const e = Math.cos( z ), f = Math.sin( z );

		if ( euler.order === 'XYZ' ) {

			const ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = - c * f;
			te[ 8 ] = d;

			te[ 1 ] = af + be * d;
			te[ 5 ] = ae - bf * d;
			te[ 9 ] = - b * c;

			te[ 2 ] = bf - ae * d;
			te[ 6 ] = be + af * d;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YXZ' ) {

			const ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce + df * b;
			te[ 4 ] = de * b - cf;
			te[ 8 ] = a * d;

			te[ 1 ] = a * f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b;

			te[ 2 ] = cf * b - de;
			te[ 6 ] = df + ce * b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZXY' ) {

			const ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce - df * b;
			te[ 4 ] = - a * f;
			te[ 8 ] = de + cf * b;

			te[ 1 ] = cf + de * b;
			te[ 5 ] = a * e;
			te[ 9 ] = df - ce * b;

			te[ 2 ] = - a * d;
			te[ 6 ] = b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZYX' ) {

			const ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = be * d - af;
			te[ 8 ] = ae * d + bf;

			te[ 1 ] = c * f;
			te[ 5 ] = bf * d + ae;
			te[ 9 ] = af * d - be;

			te[ 2 ] = - d;
			te[ 6 ] = b * c;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YZX' ) {

			const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = bd - ac * f;
			te[ 8 ] = bc * f + ad;

			te[ 1 ] = f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b * e;

			te[ 2 ] = - d * e;
			te[ 6 ] = ad * f + bc;
			te[ 10 ] = ac - bd * f;

		} else if ( euler.order === 'XZY' ) {

			const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = - f;
			te[ 8 ] = d * e;

			te[ 1 ] = ac * f + bd;
			te[ 5 ] = a * e;
			te[ 9 ] = ad * f - bc;

			te[ 2 ] = bc * f - ad;
			te[ 6 ] = b * e;
			te[ 10 ] = bd * f + ac;

		}

		// bottom row
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// last column
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	}

	makeRotationFromQuaternion( q ) {

		return this.compose( _zero, q, _one );

	}

	lookAt( eye, target, up ) {

		const te = this.elements;

		_z.subVectors( eye, target );

		if ( _z.lengthSq() === 0 ) {

			// eye and target are in the same position

			_z.z = 1;

		}

		_z.normalize();
		_x.crossVectors( up, _z );

		if ( _x.lengthSq() === 0 ) {

			// up and z are parallel

			if ( Math.abs( up.z ) === 1 ) {

				_z.x += 0.0001;

			} else {

				_z.z += 0.0001;

			}

			_z.normalize();
			_x.crossVectors( up, _z );

		}

		_x.normalize();
		_y.crossVectors( _z, _x );

		te[ 0 ] = _x.x; te[ 4 ] = _y.x; te[ 8 ] = _z.x;
		te[ 1 ] = _x.y; te[ 5 ] = _y.y; te[ 9 ] = _z.y;
		te[ 2 ] = _x.z; te[ 6 ] = _y.z; te[ 10 ] = _z.z;

		return this;

	}

	multiply( m, n ) {

		if ( n !== undefined ) {

			console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
			return this.multiplyMatrices( m, n );

		}

		return this.multiplyMatrices( this, m );

	}

	premultiply( m ) {

		return this.multiplyMatrices( m, this );

	}

	multiplyMatrices( a, b ) {

		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		const a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		const a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		const a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		const b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		const b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		const b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		const b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	}

	multiplyScalar( s ) {

		const te = this.elements;

		te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
		te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
		te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
		te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

		return this;

	}

	determinant() {

		const te = this.elements;

		const n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
		const n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
		const n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
		const n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n41 * (
				+ n14 * n23 * n32
				 - n13 * n24 * n32
				 - n14 * n22 * n33
				 + n12 * n24 * n33
				 + n13 * n22 * n34
				 - n12 * n23 * n34
			) +
			n42 * (
				+ n11 * n23 * n34
				 - n11 * n24 * n33
				 + n14 * n21 * n33
				 - n13 * n21 * n34
				 + n13 * n24 * n31
				 - n14 * n23 * n31
			) +
			n43 * (
				+ n11 * n24 * n32
				 - n11 * n22 * n34
				 - n14 * n21 * n32
				 + n12 * n21 * n34
				 + n14 * n22 * n31
				 - n12 * n24 * n31
			) +
			n44 * (
				- n13 * n22 * n31
				 - n11 * n23 * n32
				 + n11 * n22 * n33
				 + n13 * n21 * n32
				 - n12 * n21 * n33
				 + n12 * n23 * n31
			)

		);

	}

	transpose() {

		const te = this.elements;
		let tmp;

		tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
		tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
		tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

		tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
		tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
		tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

		return this;

	}

	setPosition( x, y, z ) {

		const te = this.elements;

		if ( x.isVector3 ) {

			te[ 12 ] = x.x;
			te[ 13 ] = x.y;
			te[ 14 ] = x.z;

		} else {

			te[ 12 ] = x;
			te[ 13 ] = y;
			te[ 14 ] = z;

		}

		return this;

	}

	invert() {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		const te = this.elements,

			n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ], n41 = te[ 3 ],
			n12 = te[ 4 ], n22 = te[ 5 ], n32 = te[ 6 ], n42 = te[ 7 ],
			n13 = te[ 8 ], n23 = te[ 9 ], n33 = te[ 10 ], n43 = te[ 11 ],
			n14 = te[ 12 ], n24 = te[ 13 ], n34 = te[ 14 ], n44 = te[ 15 ],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );

		const detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

		return this;

	}

	scale( v ) {

		const te = this.elements;
		const x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;

	}

	getMaxScaleOnAxis() {

		const te = this.elements;

		const scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
		const scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
		const scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

		return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq ) );

	}

	makeTranslation( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationX( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0, 0, 0,
			0, c, - s, 0,
			0, s, c, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationY( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			- s, 0, c, 0,
			 0, 0, 0, 1

		);

		return this;

	}

	makeRotationZ( theta ) {

		const c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeRotationAxis( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		const c = Math.cos( angle );
		const s = Math.sin( angle );
		const t = 1 - c;
		const x = axis.x, y = axis.y, z = axis.z;
		const tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeScale( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	}

	makeShear( x, y, z ) {

		this.set(

			1, y, z, 0,
			x, 1, z, 0,
			x, y, 1, 0,
			0, 0, 0, 1

		);

		return this;

	}

	compose( position, quaternion, scale ) {

		const te = this.elements;

		const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		const x2 = x + x,	y2 = y + y, z2 = z + z;
		const xx = x * x2, xy = x * y2, xz = x * z2;
		const yy = y * y2, yz = y * z2, zz = z * z2;
		const wx = w * x2, wy = w * y2, wz = w * z2;

		const sx = scale.x, sy = scale.y, sz = scale.z;

		te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		te[ 1 ] = ( xy + wz ) * sx;
		te[ 2 ] = ( xz - wy ) * sx;
		te[ 3 ] = 0;

		te[ 4 ] = ( xy - wz ) * sy;
		te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
		te[ 6 ] = ( yz + wx ) * sy;
		te[ 7 ] = 0;

		te[ 8 ] = ( xz + wy ) * sz;
		te[ 9 ] = ( yz - wx ) * sz;
		te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
		te[ 11 ] = 0;

		te[ 12 ] = position.x;
		te[ 13 ] = position.y;
		te[ 14 ] = position.z;
		te[ 15 ] = 1;

		return this;

	}

	decompose( position, quaternion, scale ) {

		const te = this.elements;

		let sx = _v1$1.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
		const sy = _v1$1.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
		const sz = _v1$1.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

		// if determine is negative, we need to invert one scale
		const det = this.determinant();
		if ( det < 0 ) sx = - sx;

		position.x = te[ 12 ];
		position.y = te[ 13 ];
		position.z = te[ 14 ];

		// scale the rotation part
		_m1.copy( this );

		const invSX = 1 / sx;
		const invSY = 1 / sy;
		const invSZ = 1 / sz;

		_m1.elements[ 0 ] *= invSX;
		_m1.elements[ 1 ] *= invSX;
		_m1.elements[ 2 ] *= invSX;

		_m1.elements[ 4 ] *= invSY;
		_m1.elements[ 5 ] *= invSY;
		_m1.elements[ 6 ] *= invSY;

		_m1.elements[ 8 ] *= invSZ;
		_m1.elements[ 9 ] *= invSZ;
		_m1.elements[ 10 ] *= invSZ;

		quaternion.setFromRotationMatrix( _m1 );

		scale.x = sx;
		scale.y = sy;
		scale.z = sz;

		return this;

	}

	makePerspective( left, right, top, bottom, near, far ) {

		if ( far === undefined ) {

			console.warn( 'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.' );

		}

		const te = this.elements;
		const x = 2 * near / ( right - left );
		const y = 2 * near / ( top - bottom );

		const a = ( right + left ) / ( right - left );
		const b = ( top + bottom ) / ( top - bottom );
		const c = - ( far + near ) / ( far - near );
		const d = - 2 * far * near / ( far - near );

		te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a;	te[ 12 ] = 0;
		te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b;	te[ 13 ] = 0;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c;	te[ 14 ] = d;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

		return this;

	}

	makeOrthographic( left, right, top, bottom, near, far ) {

		const te = this.elements;
		const w = 1.0 / ( right - left );
		const h = 1.0 / ( top - bottom );
		const p = 1.0 / ( far - near );

		const x = ( right + left ) * w;
		const y = ( top + bottom ) * h;
		const z = ( far + near ) * p;

		te[ 0 ] = 2 * w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
		te[ 1 ] = 0;	te[ 5 ] = 2 * h;	te[ 9 ] = 0;	te[ 13 ] = - y;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 * p;	te[ 14 ] = - z;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

		return this;

	}

	equals( matrix ) {

		const te = this.elements;
		const me = matrix.elements;

		for ( let i = 0; i < 16; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false;

		}

		return true;

	}

	fromArray( array, offset = 0 ) {

		for ( let i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	}

	toArray( array = [], offset = 0 ) {

		const te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ] = te[ 8 ];
		array[ offset + 9 ] = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	}

}

Matrix4.prototype.isMatrix4 = true;

const _v1$1 = /*@__PURE__*/ new Vector3();
const _m1 = /*@__PURE__*/ new Matrix4();
const _zero = /*@__PURE__*/ new Vector3( 0, 0, 0 );
const _one = /*@__PURE__*/ new Vector3( 1, 1, 1 );
const _x = /*@__PURE__*/ new Vector3();
const _y = /*@__PURE__*/ new Vector3();
const _z = /*@__PURE__*/ new Vector3();

const _matrix = /*@__PURE__*/ new Matrix4();
const _quaternion$1 = /*@__PURE__*/ new Quaternion();

class Euler {

	constructor( x = 0, y = 0, z = 0, order = Euler.DefaultOrder ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order;

	}

	get x() {

		return this._x;

	}

	set x( value ) {

		this._x = value;
		this._onChangeCallback();

	}

	get y() {

		return this._y;

	}

	set y( value ) {

		this._y = value;
		this._onChangeCallback();

	}

	get z() {

		return this._z;

	}

	set z( value ) {

		this._z = value;
		this._onChangeCallback();

	}

	get order() {

		return this._order;

	}

	set order( value ) {

		this._order = value;
		this._onChangeCallback();

	}

	set( x, y, z, order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order || this._order;

		this._onChangeCallback();

		return this;

	}

	clone() {

		return new this.constructor( this._x, this._y, this._z, this._order );

	}

	copy( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this._onChangeCallback();

		return this;

	}

	setFromRotationMatrix( m, order, update ) {

		const clamp = MathUtils.clamp;

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		const te = m.elements;
		const m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		const m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		const m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		switch ( order ) {

			case 'XYZ':

				this._y = Math.asin( clamp( m13, - 1, 1 ) );

				if ( Math.abs( m13 ) < 0.9999999 ) {

					this._x = Math.atan2( - m23, m33 );
					this._z = Math.atan2( - m12, m11 );

				} else {

					this._x = Math.atan2( m32, m22 );
					this._z = 0;

				}

				break;

			case 'YXZ':

				this._x = Math.asin( - clamp( m23, - 1, 1 ) );

				if ( Math.abs( m23 ) < 0.9999999 ) {

					this._y = Math.atan2( m13, m33 );
					this._z = Math.atan2( m21, m22 );

				} else {

					this._y = Math.atan2( - m31, m11 );
					this._z = 0;

				}

				break;

			case 'ZXY':

				this._x = Math.asin( clamp( m32, - 1, 1 ) );

				if ( Math.abs( m32 ) < 0.9999999 ) {

					this._y = Math.atan2( - m31, m33 );
					this._z = Math.atan2( - m12, m22 );

				} else {

					this._y = 0;
					this._z = Math.atan2( m21, m11 );

				}

				break;

			case 'ZYX':

				this._y = Math.asin( - clamp( m31, - 1, 1 ) );

				if ( Math.abs( m31 ) < 0.9999999 ) {

					this._x = Math.atan2( m32, m33 );
					this._z = Math.atan2( m21, m11 );

				} else {

					this._x = 0;
					this._z = Math.atan2( - m12, m22 );

				}

				break;

			case 'YZX':

				this._z = Math.asin( clamp( m21, - 1, 1 ) );

				if ( Math.abs( m21 ) < 0.9999999 ) {

					this._x = Math.atan2( - m23, m22 );
					this._y = Math.atan2( - m31, m11 );

				} else {

					this._x = 0;
					this._y = Math.atan2( m13, m33 );

				}

				break;

			case 'XZY':

				this._z = Math.asin( - clamp( m12, - 1, 1 ) );

				if ( Math.abs( m12 ) < 0.9999999 ) {

					this._x = Math.atan2( m32, m22 );
					this._y = Math.atan2( m13, m11 );

				} else {

					this._x = Math.atan2( - m23, m33 );
					this._y = 0;

				}

				break;

			default:

				console.warn( 'THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order );

		}

		this._order = order;

		if ( update !== false ) this._onChangeCallback();

		return this;

	}

	setFromQuaternion( q, order, update ) {

		_matrix.makeRotationFromQuaternion( q );

		return this.setFromRotationMatrix( _matrix, order, update );

	}

	setFromVector3( v, order ) {

		return this.set( v.x, v.y, v.z, order || this._order );

	}

	reorder( newOrder ) {

		// WARNING: this discards revolution information -bhouston

		_quaternion$1.setFromEuler( this );

		return this.setFromQuaternion( _quaternion$1, newOrder );

	}

	equals( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	}

	fromArray( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

		this._onChangeCallback();

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._order;

		return array;

	}

	toVector3( optionalResult ) {

		if ( optionalResult ) {

			return optionalResult.set( this._x, this._y, this._z );

		} else {

			return new Vector3( this._x, this._y, this._z );

		}

	}

	_onChange( callback ) {

		this._onChangeCallback = callback;

		return this;

	}

	_onChangeCallback() {}

}

Euler.prototype.isEuler = true;

Euler.DefaultOrder = 'XYZ';
Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

class Layers {

	constructor() {

		this.mask = 1 | 0;

	}

	set( channel ) {

		this.mask = 1 << channel | 0;

	}

	enable( channel ) {

		this.mask |= 1 << channel | 0;

	}

	enableAll() {

		this.mask = 0xffffffff | 0;

	}

	toggle( channel ) {

		this.mask ^= 1 << channel | 0;

	}

	disable( channel ) {

		this.mask &= ~ ( 1 << channel | 0 );

	}

	disableAll() {

		this.mask = 0;

	}

	test( layers ) {

		return ( this.mask & layers.mask ) !== 0;

	}

}

let _object3DId = 0;

const _v1$2 = new Vector3();
const _q1 = new Quaternion();
const _m1$1 = new Matrix4();
const _target = new Vector3();

const _position = new Vector3();
const _scale = new Vector3();
const _quaternion$2 = new Quaternion();

const _xAxis = new Vector3( 1, 0, 0 );
const _yAxis = new Vector3( 0, 1, 0 );
const _zAxis = new Vector3( 0, 0, 1 );

const _addedEvent = { type: 'added' };
const _removedEvent = { type: 'removed' };

function Object3D() {

	Object.defineProperty( this, 'id', { value: _object3DId ++ } );

	this.uuid = MathUtils.generateUUID();

	this.name = '';
	this.type = 'Object3D';

	this.parent = null;
	this.children = [];

	this.up = Object3D.DefaultUp.clone();

	const position = new Vector3();
	const rotation = new Euler();
	const quaternion = new Quaternion();
	const scale = new Vector3( 1, 1, 1 );

	function onRotationChange() {

		quaternion.setFromEuler( rotation, false );

	}

	function onQuaternionChange() {

		rotation.setFromQuaternion( quaternion, undefined, false );

	}

	rotation._onChange( onRotationChange );
	quaternion._onChange( onQuaternionChange );

	Object.defineProperties( this, {
		position: {
			configurable: true,
			enumerable: true,
			value: position
		},
		rotation: {
			configurable: true,
			enumerable: true,
			value: rotation
		},
		quaternion: {
			configurable: true,
			enumerable: true,
			value: quaternion
		},
		scale: {
			configurable: true,
			enumerable: true,
			value: scale
		},
		modelViewMatrix: {
			value: new Matrix4()
		},
		normalMatrix: {
			value: new Matrix3()
		}
	} );

	this.matrix = new Matrix4();
	this.matrixWorld = new Matrix4();

	this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
	this.matrixWorldNeedsUpdate = false;

	this.layers = new Layers();
	this.visible = true;

	this.castShadow = false;
	this.receiveShadow = false;

	this.frustumCulled = true;
	this.renderOrder = 0;

	this.animations = [];

	this.userData = {};

}

Object3D.DefaultUp = new Vector3( 0, 1, 0 );
Object3D.DefaultMatrixAutoUpdate = true;

Object3D.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

	constructor: Object3D,

	isObject3D: true,

	onBeforeRender: function () {},
	onAfterRender: function () {},

	applyMatrix4: function ( matrix ) {

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		this.matrix.premultiply( matrix );

		this.matrix.decompose( this.position, this.quaternion, this.scale );

	},

	applyQuaternion: function ( q ) {

		this.quaternion.premultiply( q );

		return this;

	},

	setRotationFromAxisAngle: function ( axis, angle ) {

		// assumes axis is normalized

		this.quaternion.setFromAxisAngle( axis, angle );

	},

	setRotationFromEuler: function ( euler ) {

		this.quaternion.setFromEuler( euler, true );

	},

	setRotationFromMatrix: function ( m ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		this.quaternion.setFromRotationMatrix( m );

	},

	setRotationFromQuaternion: function ( q ) {

		// assumes q is normalized

		this.quaternion.copy( q );

	},

	rotateOnAxis: function ( axis, angle ) {

		// rotate object on axis in object space
		// axis is assumed to be normalized

		_q1.setFromAxisAngle( axis, angle );

		this.quaternion.multiply( _q1 );

		return this;

	},

	rotateOnWorldAxis: function ( axis, angle ) {

		// rotate object on axis in world space
		// axis is assumed to be normalized
		// method assumes no rotated parent

		_q1.setFromAxisAngle( axis, angle );

		this.quaternion.premultiply( _q1 );

		return this;

	},

	rotateX: function ( angle ) {

		return this.rotateOnAxis( _xAxis, angle );

	},

	rotateY: function ( angle ) {

		return this.rotateOnAxis( _yAxis, angle );

	},

	rotateZ: function ( angle ) {

		return this.rotateOnAxis( _zAxis, angle );

	},

	translateOnAxis: function ( axis, distance ) {

		// translate object by distance along axis in object space
		// axis is assumed to be normalized

		_v1$2.copy( axis ).applyQuaternion( this.quaternion );

		this.position.add( _v1$2.multiplyScalar( distance ) );

		return this;

	},

	translateX: function ( distance ) {

		return this.translateOnAxis( _xAxis, distance );

	},

	translateY: function ( distance ) {

		return this.translateOnAxis( _yAxis, distance );

	},

	translateZ: function ( distance ) {

		return this.translateOnAxis( _zAxis, distance );

	},

	localToWorld: function ( vector ) {

		return vector.applyMatrix4( this.matrixWorld );

	},

	worldToLocal: function ( vector ) {

		return vector.applyMatrix4( _m1$1.copy( this.matrixWorld ).invert() );

	},

	lookAt: function ( x, y, z ) {

		// This method does not support objects having non-uniformly-scaled parent(s)

		if ( x.isVector3 ) {

			_target.copy( x );

		} else {

			_target.set( x, y, z );

		}

		const parent = this.parent;

		this.updateWorldMatrix( true, false );

		_position.setFromMatrixPosition( this.matrixWorld );

		if ( this.isCamera || this.isLight ) {

			_m1$1.lookAt( _position, _target, this.up );

		} else {

			_m1$1.lookAt( _target, _position, this.up );

		}

		this.quaternion.setFromRotationMatrix( _m1$1 );

		if ( parent ) {

			_m1$1.extractRotation( parent.matrixWorld );
			_q1.setFromRotationMatrix( _m1$1 );
			this.quaternion.premultiply( _q1.invert() );

		}

	},

	add: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( let i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		if ( object === this ) {

			console.error( 'THREE.Object3D.add: object can\'t be added as a child of itself.', object );
			return this;

		}

		if ( object && object.isObject3D ) {

			if ( object.parent !== null ) {

				object.parent.remove( object );

			}

			object.parent = this;
			this.children.push( object );

			object.dispatchEvent( _addedEvent );

		} else {

			console.error( 'THREE.Object3D.add: object not an instance of THREE.Object3D.', object );

		}

		return this;

	},

	remove: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( let i = 0; i < arguments.length; i ++ ) {

				this.remove( arguments[ i ] );

			}

			return this;

		}

		const index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = null;
			this.children.splice( index, 1 );

			object.dispatchEvent( _removedEvent );

		}

		return this;

	},

	clear: function () {

		for ( let i = 0; i < this.children.length; i ++ ) {

			const object = this.children[ i ];

			object.parent = null;

			object.dispatchEvent( _removedEvent );

		}

		this.children.length = 0;

		return this;


	},

	attach: function ( object ) {

		// adds object as a child of this, while maintaining the object's world transform

		this.updateWorldMatrix( true, false );

		_m1$1.copy( this.matrixWorld ).invert();

		if ( object.parent !== null ) {

			object.parent.updateWorldMatrix( true, false );

			_m1$1.multiply( object.parent.matrixWorld );

		}

		object.applyMatrix4( _m1$1 );

		this.add( object );

		object.updateWorldMatrix( false, true );

		return this;

	},

	getObjectById: function ( id ) {

		return this.getObjectByProperty( 'id', id );

	},

	getObjectByName: function ( name ) {

		return this.getObjectByProperty( 'name', name );

	},

	getObjectByProperty: function ( name, value ) {

		if ( this[ name ] === value ) return this;

		for ( let i = 0, l = this.children.length; i < l; i ++ ) {

			const child = this.children[ i ];
			const object = child.getObjectByProperty( name, value );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	},

	getWorldPosition: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Object3D: .getWorldPosition() target is now required' );
			target = new Vector3();

		}

		this.updateWorldMatrix( true, false );

		return target.setFromMatrixPosition( this.matrixWorld );

	},

	getWorldQuaternion: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Object3D: .getWorldQuaternion() target is now required' );
			target = new Quaternion();

		}

		this.updateWorldMatrix( true, false );

		this.matrixWorld.decompose( _position, target, _scale );

		return target;

	},

	getWorldScale: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Object3D: .getWorldScale() target is now required' );
			target = new Vector3();

		}

		this.updateWorldMatrix( true, false );

		this.matrixWorld.decompose( _position, _quaternion$2, target );

		return target;

	},

	getWorldDirection: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Object3D: .getWorldDirection() target is now required' );
			target = new Vector3();

		}

		this.updateWorldMatrix( true, false );

		const e = this.matrixWorld.elements;

		return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

	},

	raycast: function () {},

	traverse: function ( callback ) {

		callback( this );

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverse( callback );

		}

	},

	traverseVisible: function ( callback ) {

		if ( this.visible === false ) return;

		callback( this );

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverseVisible( callback );

		}

	},

	traverseAncestors: function ( callback ) {

		const parent = this.parent;

		if ( parent !== null ) {

			callback( parent );

			parent.traverseAncestors( callback );

		}

	},

	updateMatrix: function () {

		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.matrixWorldNeedsUpdate = true;

	},

	updateMatrixWorld: function ( force ) {

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		if ( this.matrixWorldNeedsUpdate || force ) {

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].updateMatrixWorld( force );

		}

	},

	updateWorldMatrix: function ( updateParents, updateChildren ) {

		const parent = this.parent;

		if ( updateParents === true && parent !== null ) {

			parent.updateWorldMatrix( true, false );

		}

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		if ( this.parent === null ) {

			this.matrixWorld.copy( this.matrix );

		} else {

			this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

		}

		// update children

		if ( updateChildren === true ) {

			const children = this.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].updateWorldMatrix( false, true );

			}

		}

	},

	toJSON: function ( meta ) {

		// meta is a string when called from JSON.stringify
		const isRootObject = ( meta === undefined || typeof meta === 'string' );

		const output = {};

		// meta is a hash used to collect geometries, materials.
		// not providing it implies that this is the root object
		// being serialized.
		if ( isRootObject ) {

			// initialize meta obj
			meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {},
				shapes: {},
				skeletons: {},
				animations: {}
			};

			output.metadata = {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			};

		}

		// standard Object3D serialization

		const object = {};

		object.uuid = this.uuid;
		object.type = this.type;

		if ( this.name !== '' ) object.name = this.name;
		if ( this.castShadow === true ) object.castShadow = true;
		if ( this.receiveShadow === true ) object.receiveShadow = true;
		if ( this.visible === false ) object.visible = false;
		if ( this.frustumCulled === false ) object.frustumCulled = false;
		if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
		if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;

		object.layers = this.layers.mask;
		object.matrix = this.matrix.toArray();

		if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

		// object specific properties

		if ( this.isInstancedMesh ) {

			object.type = 'InstancedMesh';
			object.count = this.count;
			object.instanceMatrix = this.instanceMatrix.toJSON();

		}

		//

		function serialize( library, element ) {

			if ( library[ element.uuid ] === undefined ) {

				library[ element.uuid ] = element.toJSON( meta );

			}

			return element.uuid;

		}

		if ( this.isMesh || this.isLine || this.isPoints ) {

			object.geometry = serialize( meta.geometries, this.geometry );

			const parameters = this.geometry.parameters;

			if ( parameters !== undefined && parameters.shapes !== undefined ) {

				const shapes = parameters.shapes;

				if ( Array.isArray( shapes ) ) {

					for ( let i = 0, l = shapes.length; i < l; i ++ ) {

						const shape = shapes[ i ];

						serialize( meta.shapes, shape );

					}

				} else {

					serialize( meta.shapes, shapes );

				}

			}

		}

		if ( this.isSkinnedMesh ) {

			object.bindMode = this.bindMode;
			object.bindMatrix = this.bindMatrix.toArray();

			if ( this.skeleton !== undefined ) {

				serialize( meta.skeletons, this.skeleton );

				object.skeleton = this.skeleton.uuid;

			}

		}

		if ( this.material !== undefined ) {

			if ( Array.isArray( this.material ) ) {

				const uuids = [];

				for ( let i = 0, l = this.material.length; i < l; i ++ ) {

					uuids.push( serialize( meta.materials, this.material[ i ] ) );

				}

				object.material = uuids;

			} else {

				object.material = serialize( meta.materials, this.material );

			}

		}

		//

		if ( this.children.length > 0 ) {

			object.children = [];

			for ( let i = 0; i < this.children.length; i ++ ) {

				object.children.push( this.children[ i ].toJSON( meta ).object );

			}

		}

		//

		if ( this.animations.length > 0 ) {

			object.animations = [];

			for ( let i = 0; i < this.animations.length; i ++ ) {

				const animation = this.animations[ i ];

				object.animations.push( serialize( meta.animations, animation ) );

			}

		}

		if ( isRootObject ) {

			const geometries = extractFromCache( meta.geometries );
			const materials = extractFromCache( meta.materials );
			const textures = extractFromCache( meta.textures );
			const images = extractFromCache( meta.images );
			const shapes = extractFromCache( meta.shapes );
			const skeletons = extractFromCache( meta.skeletons );
			const animations = extractFromCache( meta.animations );

			if ( geometries.length > 0 ) output.geometries = geometries;
			if ( materials.length > 0 ) output.materials = materials;
			if ( textures.length > 0 ) output.textures = textures;
			if ( images.length > 0 ) output.images = images;
			if ( shapes.length > 0 ) output.shapes = shapes;
			if ( skeletons.length > 0 ) output.skeletons = skeletons;
			if ( animations.length > 0 ) output.animations = animations;

		}

		output.object = object;

		return output;

		// extract data from the cache hash
		// remove metadata on each item
		// and return as array
		function extractFromCache( cache ) {

			const values = [];
			for ( const key in cache ) {

				const data = cache[ key ];
				delete data.metadata;
				values.push( data );

			}

			return values;

		}

	},

	clone: function ( recursive ) {

		return new this.constructor().copy( this, recursive );

	},

	copy: function ( source, recursive = true ) {

		this.name = source.name;

		this.up.copy( source.up );

		this.position.copy( source.position );
		this.rotation.order = source.rotation.order;
		this.quaternion.copy( source.quaternion );
		this.scale.copy( source.scale );

		this.matrix.copy( source.matrix );
		this.matrixWorld.copy( source.matrixWorld );

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

		this.layers.mask = source.layers.mask;
		this.visible = source.visible;

		this.castShadow = source.castShadow;
		this.receiveShadow = source.receiveShadow;

		this.frustumCulled = source.frustumCulled;
		this.renderOrder = source.renderOrder;

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		if ( recursive === true ) {

			for ( let i = 0; i < source.children.length; i ++ ) {

				const child = source.children[ i ];
				this.add( child.clone() );

			}

		}

		return this;

	}

} );

const _vector1 = /*@__PURE__*/ new Vector3();
const _vector2 = /*@__PURE__*/ new Vector3();
const _normalMatrix = /*@__PURE__*/ new Matrix3();

class Plane {

	constructor( normal = new Vector3( 1, 0, 0 ), constant = 0 ) {

		// normal is assumed to be normalized

		this.normal = normal;
		this.constant = constant;

	}

	set( normal, constant ) {

		this.normal.copy( normal );
		this.constant = constant;

		return this;

	}

	setComponents( x, y, z, w ) {

		this.normal.set( x, y, z );
		this.constant = w;

		return this;

	}

	setFromNormalAndCoplanarPoint( normal, point ) {

		this.normal.copy( normal );
		this.constant = - point.dot( this.normal );

		return this;

	}

	setFromCoplanarPoints( a, b, c ) {

		const normal = _vector1.subVectors( c, b ).cross( _vector2.subVectors( a, b ) ).normalize();

		// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

		this.setFromNormalAndCoplanarPoint( normal, a );

		return this;

	}

	copy( plane ) {

		this.normal.copy( plane.normal );
		this.constant = plane.constant;

		return this;

	}

	normalize() {

		// Note: will lead to a divide by zero if the plane is invalid.

		const inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar( inverseNormalLength );
		this.constant *= inverseNormalLength;

		return this;

	}

	negate() {

		this.constant *= - 1;
		this.normal.negate();

		return this;

	}

	distanceToPoint( point ) {

		return this.normal.dot( point ) + this.constant;

	}

	distanceToSphere( sphere ) {

		return this.distanceToPoint( sphere.center ) - sphere.radius;

	}

	projectPoint( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .projectPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.normal ).multiplyScalar( - this.distanceToPoint( point ) ).add( point );

	}

	intersectLine( line, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .intersectLine() target is now required' );
			target = new Vector3();

		}

		const direction = line.delta( _vector1 );

		const denominator = this.normal.dot( direction );

		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( this.distanceToPoint( line.start ) === 0 ) {

				return target.copy( line.start );

			}

			// Unsure if this is the correct method to handle this case.
			return undefined;

		}

		const t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

		if ( t < 0 || t > 1 ) {

			return undefined;

		}

		return target.copy( direction ).multiplyScalar( t ).add( line.start );

	}

	intersectsLine( line ) {

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		const startSign = this.distanceToPoint( line.start );
		const endSign = this.distanceToPoint( line.end );

		return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

	}

	intersectsBox( box ) {

		return box.intersectsPlane( this );

	}

	intersectsSphere( sphere ) {

		return sphere.intersectsPlane( this );

	}

	coplanarPoint( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .coplanarPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.normal ).multiplyScalar( - this.constant );

	}

	applyMatrix4( matrix, optionalNormalMatrix ) {

		const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix( matrix );

		const referencePoint = this.coplanarPoint( _vector1 ).applyMatrix4( matrix );

		const normal = this.normal.applyMatrix3( normalMatrix ).normalize();

		this.constant = - referencePoint.dot( normal );

		return this;

	}

	translate( offset ) {

		this.constant -= offset.dot( this.normal );

		return this;

	}

	equals( plane ) {

		return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

Plane.prototype.isPlane = true;

const _v0$1 = /*@__PURE__*/ new Vector3();
const _v1$3 = /*@__PURE__*/ new Vector3();
const _v2$1 = /*@__PURE__*/ new Vector3();
const _v3 = /*@__PURE__*/ new Vector3();

const _vab = /*@__PURE__*/ new Vector3();
const _vac = /*@__PURE__*/ new Vector3();
const _vbc = /*@__PURE__*/ new Vector3();
const _vap = /*@__PURE__*/ new Vector3();
const _vbp = /*@__PURE__*/ new Vector3();
const _vcp = /*@__PURE__*/ new Vector3();

class Triangle {

	constructor( a = new Vector3(), b = new Vector3(), c = new Vector3() ) {

		this.a = a;
		this.b = b;
		this.c = c;

	}

	static getNormal( a, b, c, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getNormal() target is now required' );
			target = new Vector3();

		}

		target.subVectors( c, b );
		_v0$1.subVectors( a, b );
		target.cross( _v0$1 );

		const targetLengthSq = target.lengthSq();
		if ( targetLengthSq > 0 ) {

			return target.multiplyScalar( 1 / Math.sqrt( targetLengthSq ) );

		}

		return target.set( 0, 0, 0 );

	}

	// static/instance method to calculate barycentric coordinates
	// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
	static getBarycoord( point, a, b, c, target ) {

		_v0$1.subVectors( c, a );
		_v1$3.subVectors( b, a );
		_v2$1.subVectors( point, a );

		const dot00 = _v0$1.dot( _v0$1 );
		const dot01 = _v0$1.dot( _v1$3 );
		const dot02 = _v0$1.dot( _v2$1 );
		const dot11 = _v1$3.dot( _v1$3 );
		const dot12 = _v1$3.dot( _v2$1 );

		const denom = ( dot00 * dot11 - dot01 * dot01 );

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getBarycoord() target is now required' );
			target = new Vector3();

		}

		// collinear or singular triangle
		if ( denom === 0 ) {

			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return target.set( - 2, - 1, - 1 );

		}

		const invDenom = 1 / denom;
		const u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		const v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		// barycentric coordinates must always sum to 1
		return target.set( 1 - u - v, v, u );

	}

	static containsPoint( point, a, b, c ) {

		this.getBarycoord( point, a, b, c, _v3 );

		return ( _v3.x >= 0 ) && ( _v3.y >= 0 ) && ( ( _v3.x + _v3.y ) <= 1 );

	}

	static getUV( point, p1, p2, p3, uv1, uv2, uv3, target ) {

		this.getBarycoord( point, p1, p2, p3, _v3 );

		target.set( 0, 0 );
		target.addScaledVector( uv1, _v3.x );
		target.addScaledVector( uv2, _v3.y );
		target.addScaledVector( uv3, _v3.z );

		return target;

	}

	static isFrontFacing( a, b, c, direction ) {

		_v0$1.subVectors( c, b );
		_v1$3.subVectors( a, b );

		// strictly front facing
		return ( _v0$1.cross( _v1$3 ).dot( direction ) < 0 ) ? true : false;

	}

	set( a, b, c ) {

		this.a.copy( a );
		this.b.copy( b );
		this.c.copy( c );

		return this;

	}

	setFromPointsAndIndices( points, i0, i1, i2 ) {

		this.a.copy( points[ i0 ] );
		this.b.copy( points[ i1 ] );
		this.c.copy( points[ i2 ] );

		return this;

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( triangle ) {

		this.a.copy( triangle.a );
		this.b.copy( triangle.b );
		this.c.copy( triangle.c );

		return this;

	}

	getArea() {

		_v0$1.subVectors( this.c, this.b );
		_v1$3.subVectors( this.a, this.b );

		return _v0$1.cross( _v1$3 ).length() * 0.5;

	}

	getMidpoint( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getMidpoint() target is now required' );
			target = new Vector3();

		}

		return target.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

	}

	getNormal( target ) {

		return Triangle.getNormal( this.a, this.b, this.c, target );

	}

	getPlane( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getPlane() target is now required' );
			target = new Plane();

		}

		return target.setFromCoplanarPoints( this.a, this.b, this.c );

	}

	getBarycoord( point, target ) {

		return Triangle.getBarycoord( point, this.a, this.b, this.c, target );

	}

	getUV( point, uv1, uv2, uv3, target ) {

		return Triangle.getUV( point, this.a, this.b, this.c, uv1, uv2, uv3, target );

	}

	containsPoint( point ) {

		return Triangle.containsPoint( point, this.a, this.b, this.c );

	}

	isFrontFacing( direction ) {

		return Triangle.isFrontFacing( this.a, this.b, this.c, direction );

	}

	intersectsBox( box ) {

		return box.intersectsTriangle( this );

	}

	closestPointToPoint( p, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .closestPointToPoint() target is now required' );
			target = new Vector3();

		}

		const a = this.a, b = this.b, c = this.c;
		let v, w;

		// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
		// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
		// under the accompanying license; see chapter 5.1.5 for detailed explanation.
		// basically, we're distinguishing which of the voronoi regions of the triangle
		// the point lies in with the minimum amount of redundant computation.

		_vab.subVectors( b, a );
		_vac.subVectors( c, a );
		_vap.subVectors( p, a );
		const d1 = _vab.dot( _vap );
		const d2 = _vac.dot( _vap );
		if ( d1 <= 0 && d2 <= 0 ) {

			// vertex region of A; barycentric coords (1, 0, 0)
			return target.copy( a );

		}

		_vbp.subVectors( p, b );
		const d3 = _vab.dot( _vbp );
		const d4 = _vac.dot( _vbp );
		if ( d3 >= 0 && d4 <= d3 ) {

			// vertex region of B; barycentric coords (0, 1, 0)
			return target.copy( b );

		}

		const vc = d1 * d4 - d3 * d2;
		if ( vc <= 0 && d1 >= 0 && d3 <= 0 ) {

			v = d1 / ( d1 - d3 );
			// edge region of AB; barycentric coords (1-v, v, 0)
			return target.copy( a ).addScaledVector( _vab, v );

		}

		_vcp.subVectors( p, c );
		const d5 = _vab.dot( _vcp );
		const d6 = _vac.dot( _vcp );
		if ( d6 >= 0 && d5 <= d6 ) {

			// vertex region of C; barycentric coords (0, 0, 1)
			return target.copy( c );

		}

		const vb = d5 * d2 - d1 * d6;
		if ( vb <= 0 && d2 >= 0 && d6 <= 0 ) {

			w = d2 / ( d2 - d6 );
			// edge region of AC; barycentric coords (1-w, 0, w)
			return target.copy( a ).addScaledVector( _vac, w );

		}

		const va = d3 * d6 - d5 * d4;
		if ( va <= 0 && ( d4 - d3 ) >= 0 && ( d5 - d6 ) >= 0 ) {

			_vbc.subVectors( c, b );
			w = ( d4 - d3 ) / ( ( d4 - d3 ) + ( d5 - d6 ) );
			// edge region of BC; barycentric coords (0, 1-w, w)
			return target.copy( b ).addScaledVector( _vbc, w ); // edge region of BC

		}

		// face region
		const denom = 1 / ( va + vb + vc );
		// u = va * denom
		v = vb * denom;
		w = vc * denom;

		return target.copy( a ).addScaledVector( _vab, v ).addScaledVector( _vac, w );

	}

	equals( triangle ) {

		return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

	}

}

let materialId = 0;

function Material() {

	Object.defineProperty( this, 'id', { value: materialId ++ } );

	this.uuid = MathUtils.generateUUID();

	this.name = '';
	this.type = 'Material';

	this.fog = true;

	this.blending = NormalBlending;
	this.side = FrontSide;
	this.vertexColors = false;

	this.opacity = 1;
	this.transparent = false;

	this.blendSrc = SrcAlphaFactor;
	this.blendDst = OneMinusSrcAlphaFactor;
	this.blendEquation = AddEquation;
	this.blendSrcAlpha = null;
	this.blendDstAlpha = null;
	this.blendEquationAlpha = null;

	this.depthFunc = LessEqualDepth;
	this.depthTest = true;
	this.depthWrite = true;

	this.stencilWriteMask = 0xff;
	this.stencilFunc = AlwaysStencilFunc;
	this.stencilRef = 0;
	this.stencilFuncMask = 0xff;
	this.stencilFail = KeepStencilOp;
	this.stencilZFail = KeepStencilOp;
	this.stencilZPass = KeepStencilOp;
	this.stencilWrite = false;

	this.clippingPlanes = null;
	this.clipIntersection = false;
	this.clipShadows = false;

	this.shadowSide = null;

	this.colorWrite = true;

	this.precision = null; // override the renderer's default precision for this material

	this.polygonOffset = false;
	this.polygonOffsetFactor = 0;
	this.polygonOffsetUnits = 0;

	this.dithering = false;

	this.alphaTest = 0;
	this.premultipliedAlpha = false;

	this.visible = true;

	this.toneMapped = true;

	this.userData = {};

	this.version = 0;

}

Material.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

	constructor: Material,

	isMaterial: true,

	onBeforeCompile: function ( /* shaderobject, renderer */ ) {},

	customProgramCacheKey: function () {

		return this.onBeforeCompile.toString();

	},

	setValues: function ( values ) {

		if ( values === undefined ) return;

		for ( const key in values ) {

			const newValue = values[ key ];

			if ( newValue === undefined ) {

				console.warn( 'THREE.Material: \'' + key + '\' parameter is undefined.' );
				continue;

			}

			// for backward compatability if shading is set in the constructor
			if ( key === 'shading' ) {

				console.warn( 'THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.' );
				this.flatShading = ( newValue === FlatShading ) ? true : false;
				continue;

			}

			const currentValue = this[ key ];

			if ( currentValue === undefined ) {

				console.warn( 'THREE.' + this.type + ': \'' + key + '\' is not a property of this material.' );
				continue;

			}

			if ( currentValue && currentValue.isColor ) {

				currentValue.set( newValue );

			} else if ( ( currentValue && currentValue.isVector3 ) && ( newValue && newValue.isVector3 ) ) {

				currentValue.copy( newValue );

			} else {

				this[ key ] = newValue;

			}

		}

	},

	toJSON: function ( meta ) {

		const isRoot = ( meta === undefined || typeof meta === 'string' );

		if ( isRoot ) {

			meta = {
				textures: {},
				images: {}
			};

		}

		const data = {
			metadata: {
				version: 4.5,
				type: 'Material',
				generator: 'Material.toJSON'
			}
		};

		// standard Material serialization
		data.uuid = this.uuid;
		data.type = this.type;

		if ( this.name !== '' ) data.name = this.name;

		if ( this.color && this.color.isColor ) data.color = this.color.getHex();

		if ( this.roughness !== undefined ) data.roughness = this.roughness;
		if ( this.metalness !== undefined ) data.metalness = this.metalness;

		if ( this.sheen && this.sheen.isColor ) data.sheen = this.sheen.getHex();
		if ( this.emissive && this.emissive.isColor ) data.emissive = this.emissive.getHex();
		if ( this.emissiveIntensity && this.emissiveIntensity !== 1 ) data.emissiveIntensity = this.emissiveIntensity;

		if ( this.specular && this.specular.isColor ) data.specular = this.specular.getHex();
		if ( this.shininess !== undefined ) data.shininess = this.shininess;
		if ( this.clearcoat !== undefined ) data.clearcoat = this.clearcoat;
		if ( this.clearcoatRoughness !== undefined ) data.clearcoatRoughness = this.clearcoatRoughness;

		if ( this.clearcoatMap && this.clearcoatMap.isTexture ) {

			data.clearcoatMap = this.clearcoatMap.toJSON( meta ).uuid;

		}

		if ( this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture ) {

			data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON( meta ).uuid;

		}

		if ( this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture ) {

			data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON( meta ).uuid;
			data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();

		}

		if ( this.map && this.map.isTexture ) data.map = this.map.toJSON( meta ).uuid;
		if ( this.matcap && this.matcap.isTexture ) data.matcap = this.matcap.toJSON( meta ).uuid;
		if ( this.alphaMap && this.alphaMap.isTexture ) data.alphaMap = this.alphaMap.toJSON( meta ).uuid;

		if ( this.lightMap && this.lightMap.isTexture ) {

			data.lightMap = this.lightMap.toJSON( meta ).uuid;
			data.lightMapIntensity = this.lightMapIntensity;

		}

		if ( this.aoMap && this.aoMap.isTexture ) {

			data.aoMap = this.aoMap.toJSON( meta ).uuid;
			data.aoMapIntensity = this.aoMapIntensity;

		}

		if ( this.bumpMap && this.bumpMap.isTexture ) {

			data.bumpMap = this.bumpMap.toJSON( meta ).uuid;
			data.bumpScale = this.bumpScale;

		}

		if ( this.normalMap && this.normalMap.isTexture ) {

			data.normalMap = this.normalMap.toJSON( meta ).uuid;
			data.normalMapType = this.normalMapType;
			data.normalScale = this.normalScale.toArray();

		}

		if ( this.displacementMap && this.displacementMap.isTexture ) {

			data.displacementMap = this.displacementMap.toJSON( meta ).uuid;
			data.displacementScale = this.displacementScale;
			data.displacementBias = this.displacementBias;

		}

		if ( this.roughnessMap && this.roughnessMap.isTexture ) data.roughnessMap = this.roughnessMap.toJSON( meta ).uuid;
		if ( this.metalnessMap && this.metalnessMap.isTexture ) data.metalnessMap = this.metalnessMap.toJSON( meta ).uuid;

		if ( this.emissiveMap && this.emissiveMap.isTexture ) data.emissiveMap = this.emissiveMap.toJSON( meta ).uuid;
		if ( this.specularMap && this.specularMap.isTexture ) data.specularMap = this.specularMap.toJSON( meta ).uuid;

		if ( this.envMap && this.envMap.isTexture ) {

			data.envMap = this.envMap.toJSON( meta ).uuid;
			data.reflectivity = this.reflectivity; // Scale behind envMap
			data.refractionRatio = this.refractionRatio;

			if ( this.combine !== undefined ) data.combine = this.combine;
			if ( this.envMapIntensity !== undefined ) data.envMapIntensity = this.envMapIntensity;

		}

		if ( this.gradientMap && this.gradientMap.isTexture ) {

			data.gradientMap = this.gradientMap.toJSON( meta ).uuid;

		}

		if ( this.size !== undefined ) data.size = this.size;
		if ( this.sizeAttenuation !== undefined ) data.sizeAttenuation = this.sizeAttenuation;

		if ( this.blending !== NormalBlending ) data.blending = this.blending;
		if ( this.side !== FrontSide ) data.side = this.side;
		if ( this.vertexColors ) data.vertexColors = true;

		if ( this.opacity < 1 ) data.opacity = this.opacity;
		if ( this.transparent === true ) data.transparent = this.transparent;

		data.depthFunc = this.depthFunc;
		data.depthTest = this.depthTest;
		data.depthWrite = this.depthWrite;

		data.stencilWrite = this.stencilWrite;
		data.stencilWriteMask = this.stencilWriteMask;
		data.stencilFunc = this.stencilFunc;
		data.stencilRef = this.stencilRef;
		data.stencilFuncMask = this.stencilFuncMask;
		data.stencilFail = this.stencilFail;
		data.stencilZFail = this.stencilZFail;
		data.stencilZPass = this.stencilZPass;

		// rotation (SpriteMaterial)
		if ( this.rotation && this.rotation !== 0 ) data.rotation = this.rotation;

		if ( this.polygonOffset === true ) data.polygonOffset = true;
		if ( this.polygonOffsetFactor !== 0 ) data.polygonOffsetFactor = this.polygonOffsetFactor;
		if ( this.polygonOffsetUnits !== 0 ) data.polygonOffsetUnits = this.polygonOffsetUnits;

		if ( this.linewidth && this.linewidth !== 1 ) data.linewidth = this.linewidth;
		if ( this.dashSize !== undefined ) data.dashSize = this.dashSize;
		if ( this.gapSize !== undefined ) data.gapSize = this.gapSize;
		if ( this.scale !== undefined ) data.scale = this.scale;

		if ( this.dithering === true ) data.dithering = true;

		if ( this.alphaTest > 0 ) data.alphaTest = this.alphaTest;
		if ( this.premultipliedAlpha === true ) data.premultipliedAlpha = this.premultipliedAlpha;

		if ( this.wireframe === true ) data.wireframe = this.wireframe;
		if ( this.wireframeLinewidth > 1 ) data.wireframeLinewidth = this.wireframeLinewidth;
		if ( this.wireframeLinecap !== 'round' ) data.wireframeLinecap = this.wireframeLinecap;
		if ( this.wireframeLinejoin !== 'round' ) data.wireframeLinejoin = this.wireframeLinejoin;

		if ( this.morphTargets === true ) data.morphTargets = true;
		if ( this.morphNormals === true ) data.morphNormals = true;
		if ( this.skinning === true ) data.skinning = true;

		if ( this.flatShading === true ) data.flatShading = this.flatShading;

		if ( this.visible === false ) data.visible = false;

		if ( this.toneMapped === false ) data.toneMapped = false;

		if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

		// TODO: Copied from Object3D.toJSON

		function extractFromCache( cache ) {

			const values = [];

			for ( const key in cache ) {

				const data = cache[ key ];
				delete data.metadata;
				values.push( data );

			}

			return values;

		}

		if ( isRoot ) {

			const textures = extractFromCache( meta.textures );
			const images = extractFromCache( meta.images );

			if ( textures.length > 0 ) data.textures = textures;
			if ( images.length > 0 ) data.images = images;

		}

		return data;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.name = source.name;

		this.fog = source.fog;

		this.blending = source.blending;
		this.side = source.side;
		this.vertexColors = source.vertexColors;

		this.opacity = source.opacity;
		this.transparent = source.transparent;

		this.blendSrc = source.blendSrc;
		this.blendDst = source.blendDst;
		this.blendEquation = source.blendEquation;
		this.blendSrcAlpha = source.blendSrcAlpha;
		this.blendDstAlpha = source.blendDstAlpha;
		this.blendEquationAlpha = source.blendEquationAlpha;

		this.depthFunc = source.depthFunc;
		this.depthTest = source.depthTest;
		this.depthWrite = source.depthWrite;

		this.stencilWriteMask = source.stencilWriteMask;
		this.stencilFunc = source.stencilFunc;
		this.stencilRef = source.stencilRef;
		this.stencilFuncMask = source.stencilFuncMask;
		this.stencilFail = source.stencilFail;
		this.stencilZFail = source.stencilZFail;
		this.stencilZPass = source.stencilZPass;
		this.stencilWrite = source.stencilWrite;

		const srcPlanes = source.clippingPlanes;
		let dstPlanes = null;

		if ( srcPlanes !== null ) {

			const n = srcPlanes.length;
			dstPlanes = new Array( n );

			for ( let i = 0; i !== n; ++ i ) {

				dstPlanes[ i ] = srcPlanes[ i ].clone();

			}

		}

		this.clippingPlanes = dstPlanes;
		this.clipIntersection = source.clipIntersection;
		this.clipShadows = source.clipShadows;

		this.shadowSide = source.shadowSide;

		this.colorWrite = source.colorWrite;

		this.precision = source.precision;

		this.polygonOffset = source.polygonOffset;
		this.polygonOffsetFactor = source.polygonOffsetFactor;
		this.polygonOffsetUnits = source.polygonOffsetUnits;

		this.dithering = source.dithering;

		this.alphaTest = source.alphaTest;
		this.premultipliedAlpha = source.premultipliedAlpha;

		this.visible = source.visible;

		this.toneMapped = source.toneMapped;

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		return this;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

} );

Object.defineProperty( Material.prototype, 'needsUpdate', {

	set: function ( value ) {

		if ( value === true ) this.version ++;

	}

} );

const _colorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
	'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
	'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
	'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
	'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
	'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
	'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
	'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
	'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
	'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
	'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
	'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
	'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
	'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
	'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
	'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
	'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
	'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
	'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
	'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
	'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
	'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
	'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
	'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

const _hslA = { h: 0, s: 0, l: 0 };
const _hslB = { h: 0, s: 0, l: 0 };

function hue2rgb( p, q, t ) {

	if ( t < 0 ) t += 1;
	if ( t > 1 ) t -= 1;
	if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
	if ( t < 1 / 2 ) return q;
	if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
	return p;

}

function SRGBToLinear( c ) {

	return ( c < 0.04045 ) ? c * 0.0773993808 : Math.pow( c * 0.9478672986 + 0.0521327014, 2.4 );

}

function LinearToSRGB( c ) {

	return ( c < 0.0031308 ) ? c * 12.92 : 1.055 * ( Math.pow( c, 0.41666 ) ) - 0.055;

}

class Color {

	constructor( r, g, b ) {

		if ( g === undefined && b === undefined ) {

			// r is THREE.Color, hex or string
			return this.set( r );

		}

		return this.setRGB( r, g, b );

	}

	set( value ) {

		if ( value && value.isColor ) {

			this.copy( value );

		} else if ( typeof value === 'number' ) {

			this.setHex( value );

		} else if ( typeof value === 'string' ) {

			this.setStyle( value );

		}

		return this;

	}

	setScalar( scalar ) {

		this.r = scalar;
		this.g = scalar;
		this.b = scalar;

		return this;

	}

	setHex( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	}

	setRGB( r, g, b ) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	}

	setHSL( h, s, l ) {

		// h,s,l ranges are in 0.0 - 1.0
		h = MathUtils.euclideanModulo( h, 1 );
		s = MathUtils.clamp( s, 0, 1 );
		l = MathUtils.clamp( l, 0, 1 );

		if ( s === 0 ) {

			this.r = this.g = this.b = l;

		} else {

			const p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
			const q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		return this;

	}

	setStyle( style ) {

		function handleAlpha( string ) {

			if ( string === undefined ) return;

			if ( parseFloat( string ) < 1 ) {

				console.warn( 'THREE.Color: Alpha component of ' + style + ' will be ignored.' );

			}

		}


		let m;

		if ( m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec( style ) ) {

			// rgb / hsl

			let color;
			const name = m[ 1 ];
			const components = m[ 2 ];

			switch ( name ) {

				case 'rgb':
				case 'rgba':

					if ( color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

						// rgb(255,0,0) rgba(255,0,0,0.5)
						this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
						this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
						this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

						handleAlpha( color[ 4 ] );

						return this;

					}

					if ( color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

						// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
						this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
						this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
						this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

						handleAlpha( color[ 4 ] );

						return this;

					}

					break;

				case 'hsl':
				case 'hsla':

					if ( color = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec( components ) ) {

						// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
						const h = parseFloat( color[ 1 ] ) / 360;
						const s = parseInt( color[ 2 ], 10 ) / 100;
						const l = parseInt( color[ 3 ], 10 ) / 100;

						handleAlpha( color[ 4 ] );

						return this.setHSL( h, s, l );

					}

					break;

			}

		} else if ( m = /^\#([A-Fa-f\d]+)$/.exec( style ) ) {

			// hex color

			const hex = m[ 1 ];
			const size = hex.length;

			if ( size === 3 ) {

				// #ff0
				this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255;
				this.g = parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255;
				this.b = parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255;

				return this;

			} else if ( size === 6 ) {

				// #ff0000
				this.r = parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255;
				this.g = parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255;
				this.b = parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255;

				return this;

			}

		}

		if ( style && style.length > 0 ) {

			return this.setColorName( style );

		}

		return this;

	}

	setColorName( style ) {

		// color keywords
		const hex = _colorKeywords[ style ];

		if ( hex !== undefined ) {

			// red
			this.setHex( hex );

		} else {

			// unknown color
			console.warn( 'THREE.Color: Unknown color ' + style );

		}

		return this;

	}

	clone() {

		return new this.constructor( this.r, this.g, this.b );

	}

	copy( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	}

	copyGammaToLinear( color, gammaFactor = 2.0 ) {

		this.r = Math.pow( color.r, gammaFactor );
		this.g = Math.pow( color.g, gammaFactor );
		this.b = Math.pow( color.b, gammaFactor );

		return this;

	}

	copyLinearToGamma( color, gammaFactor = 2.0 ) {

		const safeInverse = ( gammaFactor > 0 ) ? ( 1.0 / gammaFactor ) : 1.0;

		this.r = Math.pow( color.r, safeInverse );
		this.g = Math.pow( color.g, safeInverse );
		this.b = Math.pow( color.b, safeInverse );

		return this;

	}

	convertGammaToLinear( gammaFactor ) {

		this.copyGammaToLinear( this, gammaFactor );

		return this;

	}

	convertLinearToGamma( gammaFactor ) {

		this.copyLinearToGamma( this, gammaFactor );

		return this;

	}

	copySRGBToLinear( color ) {

		this.r = SRGBToLinear( color.r );
		this.g = SRGBToLinear( color.g );
		this.b = SRGBToLinear( color.b );

		return this;

	}

	copyLinearToSRGB( color ) {

		this.r = LinearToSRGB( color.r );
		this.g = LinearToSRGB( color.g );
		this.b = LinearToSRGB( color.b );

		return this;

	}

	convertSRGBToLinear() {

		this.copySRGBToLinear( this );

		return this;

	}

	convertLinearToSRGB() {

		this.copyLinearToSRGB( this );

		return this;

	}

	getHex() {

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	}

	getHexString() {

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	}

	getHSL( target ) {

		// h,s,l ranges are in 0.0 - 1.0

		if ( target === undefined ) {

			console.warn( 'THREE.Color: .getHSL() target is now required' );
			target = { h: 0, s: 0, l: 0 };

		}

		const r = this.r, g = this.g, b = this.b;

		const max = Math.max( r, g, b );
		const min = Math.min( r, g, b );

		let hue, saturation;
		const lightness = ( min + max ) / 2.0;

		if ( min === max ) {

			hue = 0;
			saturation = 0;

		} else {

			const delta = max - min;

			saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

			switch ( max ) {

				case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
				case g: hue = ( b - r ) / delta + 2; break;
				case b: hue = ( r - g ) / delta + 4; break;

			}

			hue /= 6;

		}

		target.h = hue;
		target.s = saturation;
		target.l = lightness;

		return target;

	}

	getStyle() {

		return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	}

	offsetHSL( h, s, l ) {

		this.getHSL( _hslA );

		_hslA.h += h; _hslA.s += s; _hslA.l += l;

		this.setHSL( _hslA.h, _hslA.s, _hslA.l );

		return this;

	}

	add( color ) {

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	}

	addColors( color1, color2 ) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	}

	addScalar( s ) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	}

	sub( color ) {

		this.r = Math.max( 0, this.r - color.r );
		this.g = Math.max( 0, this.g - color.g );
		this.b = Math.max( 0, this.b - color.b );

		return this;

	}

	multiply( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	}

	multiplyScalar( s ) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	}

	lerp( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	}

	lerpColors( color1, color2, alpha ) {

		this.r = color1.r + ( color2.r - color1.r ) * alpha;
		this.g = color1.g + ( color2.g - color1.g ) * alpha;
		this.b = color1.b + ( color2.b - color1.b ) * alpha;

		return this;

	}

	lerpHSL( color, alpha ) {

		this.getHSL( _hslA );
		color.getHSL( _hslB );

		const h = MathUtils.lerp( _hslA.h, _hslB.h, alpha );
		const s = MathUtils.lerp( _hslA.s, _hslB.s, alpha );
		const l = MathUtils.lerp( _hslA.l, _hslB.l, alpha );

		this.setHSL( h, s, l );

		return this;

	}

	equals( c ) {

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

	}

	fromArray( array, offset = 0 ) {

		this.r = array[ offset ];
		this.g = array[ offset + 1 ];
		this.b = array[ offset + 2 ];

		return this;

	}

	toArray( array = [], offset = 0 ) {

		array[ offset ] = this.r;
		array[ offset + 1 ] = this.g;
		array[ offset + 2 ] = this.b;

		return array;

	}

	fromBufferAttribute( attribute, index ) {

		this.r = attribute.getX( index );
		this.g = attribute.getY( index );
		this.b = attribute.getZ( index );

		if ( attribute.normalized === true ) {

			// assuming Uint8Array

			this.r /= 255;
			this.g /= 255;
			this.b /= 255;

		}

		return this;

	}

	toJSON() {

		return this.getHex();

	}

}

Color.NAMES = _colorKeywords;

Color.prototype.isColor = true;
Color.prototype.r = 1;
Color.prototype.g = 1;
Color.prototype.b = 1;

/**
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>
 * }
 */

class MeshBasicMaterial extends Material {

	constructor( parameters ) {

		super();

		this.type = 'MeshBasicMaterial';

		this.color = new Color( 0xffffff ); // emissive

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;

		this.setValues( parameters );

	}

	copy( source ) {

		super.copy( source );

		this.color.copy( source.color );

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		return this;

	}

}

MeshBasicMaterial.prototype.isMeshBasicMaterial = true;

const _vector$3 = new Vector3();
const _vector2$1 = new Vector2();

function BufferAttribute( array, itemSize, normalized ) {

	if ( Array.isArray( array ) ) {

		throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );

	}

	this.name = '';

	this.array = array;
	this.itemSize = itemSize;
	this.count = array !== undefined ? array.length / itemSize : 0;
	this.normalized = normalized === true;

	this.usage = StaticDrawUsage;
	this.updateRange = { offset: 0, count: - 1 };

	this.version = 0;

}

Object.defineProperty( BufferAttribute.prototype, 'needsUpdate', {

	set: function ( value ) {

		if ( value === true ) this.version ++;

	}

} );

Object.assign( BufferAttribute.prototype, {

	isBufferAttribute: true,

	onUploadCallback: function () {},

	setUsage: function ( value ) {

		this.usage = value;

		return this;

	},

	copy: function ( source ) {

		this.name = source.name;
		this.array = new source.array.constructor( source.array );
		this.itemSize = source.itemSize;
		this.count = source.count;
		this.normalized = source.normalized;

		this.usage = source.usage;

		return this;

	},

	copyAt: function ( index1, attribute, index2 ) {

		index1 *= this.itemSize;
		index2 *= attribute.itemSize;

		for ( let i = 0, l = this.itemSize; i < l; i ++ ) {

			this.array[ index1 + i ] = attribute.array[ index2 + i ];

		}

		return this;

	},

	copyArray: function ( array ) {

		this.array.set( array );

		return this;

	},

	copyColorsArray: function ( colors ) {

		const array = this.array;
		let offset = 0;

		for ( let i = 0, l = colors.length; i < l; i ++ ) {

			let color = colors[ i ];

			if ( color === undefined ) {

				console.warn( 'THREE.BufferAttribute.copyColorsArray(): color is undefined', i );
				color = new Color();

			}

			array[ offset ++ ] = color.r;
			array[ offset ++ ] = color.g;
			array[ offset ++ ] = color.b;

		}

		return this;

	},

	copyVector2sArray: function ( vectors ) {

		const array = this.array;
		let offset = 0;

		for ( let i = 0, l = vectors.length; i < l; i ++ ) {

			let vector = vectors[ i ];

			if ( vector === undefined ) {

				console.warn( 'THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i );
				vector = new Vector2();

			}

			array[ offset ++ ] = vector.x;
			array[ offset ++ ] = vector.y;

		}

		return this;

	},

	copyVector3sArray: function ( vectors ) {

		const array = this.array;
		let offset = 0;

		for ( let i = 0, l = vectors.length; i < l; i ++ ) {

			let vector = vectors[ i ];

			if ( vector === undefined ) {

				console.warn( 'THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i );
				vector = new Vector3();

			}

			array[ offset ++ ] = vector.x;
			array[ offset ++ ] = vector.y;
			array[ offset ++ ] = vector.z;

		}

		return this;

	},

	copyVector4sArray: function ( vectors ) {

		const array = this.array;
		let offset = 0;

		for ( let i = 0, l = vectors.length; i < l; i ++ ) {

			let vector = vectors[ i ];

			if ( vector === undefined ) {

				console.warn( 'THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i );
				vector = new Vector4();

			}

			array[ offset ++ ] = vector.x;
			array[ offset ++ ] = vector.y;
			array[ offset ++ ] = vector.z;
			array[ offset ++ ] = vector.w;

		}

		return this;

	},

	applyMatrix3: function ( m ) {

		if ( this.itemSize === 2 ) {

			for ( let i = 0, l = this.count; i < l; i ++ ) {

				_vector2$1.fromBufferAttribute( this, i );
				_vector2$1.applyMatrix3( m );

				this.setXY( i, _vector2$1.x, _vector2$1.y );

			}

		} else if ( this.itemSize === 3 ) {

			for ( let i = 0, l = this.count; i < l; i ++ ) {

				_vector$3.fromBufferAttribute( this, i );
				_vector$3.applyMatrix3( m );

				this.setXYZ( i, _vector$3.x, _vector$3.y, _vector$3.z );

			}

		}

		return this;

	},

	applyMatrix4: function ( m ) {

		for ( let i = 0, l = this.count; i < l; i ++ ) {

			_vector$3.x = this.getX( i );
			_vector$3.y = this.getY( i );
			_vector$3.z = this.getZ( i );

			_vector$3.applyMatrix4( m );

			this.setXYZ( i, _vector$3.x, _vector$3.y, _vector$3.z );

		}

		return this;

	},

	applyNormalMatrix: function ( m ) {

		for ( let i = 0, l = this.count; i < l; i ++ ) {

			_vector$3.x = this.getX( i );
			_vector$3.y = this.getY( i );
			_vector$3.z = this.getZ( i );

			_vector$3.applyNormalMatrix( m );

			this.setXYZ( i, _vector$3.x, _vector$3.y, _vector$3.z );

		}

		return this;

	},

	transformDirection: function ( m ) {

		for ( let i = 0, l = this.count; i < l; i ++ ) {

			_vector$3.x = this.getX( i );
			_vector$3.y = this.getY( i );
			_vector$3.z = this.getZ( i );

			_vector$3.transformDirection( m );

			this.setXYZ( i, _vector$3.x, _vector$3.y, _vector$3.z );

		}

		return this;

	},

	set: function ( value, offset = 0 ) {

		this.array.set( value, offset );

		return this;

	},

	getX: function ( index ) {

		return this.array[ index * this.itemSize ];

	},

	setX: function ( index, x ) {

		this.array[ index * this.itemSize ] = x;

		return this;

	},

	getY: function ( index ) {

		return this.array[ index * this.itemSize + 1 ];

	},

	setY: function ( index, y ) {

		this.array[ index * this.itemSize + 1 ] = y;

		return this;

	},

	getZ: function ( index ) {

		return this.array[ index * this.itemSize + 2 ];

	},

	setZ: function ( index, z ) {

		this.array[ index * this.itemSize + 2 ] = z;

		return this;

	},

	getW: function ( index ) {

		return this.array[ index * this.itemSize + 3 ];

	},

	setW: function ( index, w ) {

		this.array[ index * this.itemSize + 3 ] = w;

		return this;

	},

	setXY: function ( index, x, y ) {

		index *= this.itemSize;

		this.array[ index + 0 ] = x;
		this.array[ index + 1 ] = y;

		return this;

	},

	setXYZ: function ( index, x, y, z ) {

		index *= this.itemSize;

		this.array[ index + 0 ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;

		return this;

	},

	setXYZW: function ( index, x, y, z, w ) {

		index *= this.itemSize;

		this.array[ index + 0 ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;
		this.array[ index + 3 ] = w;

		return this;

	},

	onUpload: function ( callback ) {

		this.onUploadCallback = callback;

		return this;

	},

	clone: function () {

		return new this.constructor( this.array, this.itemSize ).copy( this );

	},

	toJSON: function () {

		return {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.prototype.slice.call( this.array ),
			normalized: this.normalized
		};

	}

} );

//

function Int8BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Int8Array( array ), itemSize, normalized );

}

Int8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Int8BufferAttribute.prototype.constructor = Int8BufferAttribute;


function Uint8BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Uint8Array( array ), itemSize, normalized );

}

Uint8BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Uint8BufferAttribute.prototype.constructor = Uint8BufferAttribute;


function Uint8ClampedBufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Uint8ClampedArray( array ), itemSize, normalized );

}

Uint8ClampedBufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Uint8ClampedBufferAttribute.prototype.constructor = Uint8ClampedBufferAttribute;


function Int16BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Int16Array( array ), itemSize, normalized );

}

Int16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Int16BufferAttribute.prototype.constructor = Int16BufferAttribute;


function Uint16BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Uint16Array( array ), itemSize, normalized );

}

Uint16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;


function Int32BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Int32Array( array ), itemSize, normalized );

}

Int32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Int32BufferAttribute.prototype.constructor = Int32BufferAttribute;


function Uint32BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Uint32Array( array ), itemSize, normalized );

}

Uint32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;

function Float16BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Uint16Array( array ), itemSize, normalized );

}

Float16BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Float16BufferAttribute.prototype.constructor = Float16BufferAttribute;
Float16BufferAttribute.prototype.isFloat16BufferAttribute = true;

function Float32BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Float32Array( array ), itemSize, normalized );

}

Float32BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;


function Float64BufferAttribute( array, itemSize, normalized ) {

	BufferAttribute.call( this, new Float64Array( array ), itemSize, normalized );

}

Float64BufferAttribute.prototype = Object.create( BufferAttribute.prototype );
Float64BufferAttribute.prototype.constructor = Float64BufferAttribute;

function arrayMax( array ) {

	if ( array.length === 0 ) return - Infinity;

	let max = array[ 0 ];

	for ( let i = 1, l = array.length; i < l; ++ i ) {

		if ( array[ i ] > max ) max = array[ i ];

	}

	return max;

}

let _id = 0;

const _m1$2 = new Matrix4();
const _obj = new Object3D();
const _offset = new Vector3();
const _box$2 = new Box3();
const _boxMorphTargets = new Box3();
const _vector$4 = new Vector3();

function BufferGeometry() {

	Object.defineProperty( this, 'id', { value: _id ++ } );

	this.uuid = MathUtils.generateUUID();

	this.name = '';
	this.type = 'BufferGeometry';

	this.index = null;
	this.attributes = {};

	this.morphAttributes = {};
	this.morphTargetsRelative = false;

	this.groups = [];

	this.boundingBox = null;
	this.boundingSphere = null;

	this.drawRange = { start: 0, count: Infinity };

	this.userData = {};

}

BufferGeometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

	constructor: BufferGeometry,

	isBufferGeometry: true,

	getIndex: function () {

		return this.index;

	},

	setIndex: function ( index ) {

		if ( Array.isArray( index ) ) {

			this.index = new ( arrayMax( index ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( index, 1 );

		} else {

			this.index = index;

		}

		return this;

	},

	getAttribute: function ( name ) {

		return this.attributes[ name ];

	},

	setAttribute: function ( name, attribute ) {

		this.attributes[ name ] = attribute;

		return this;

	},

	deleteAttribute: function ( name ) {

		delete this.attributes[ name ];

		return this;

	},

	hasAttribute: function ( name ) {

		return this.attributes[ name ] !== undefined;

	},

	addGroup: function ( start, count, materialIndex = 0 ) {

		this.groups.push( {

			start: start,
			count: count,
			materialIndex: materialIndex

		} );

	},

	clearGroups: function () {

		this.groups = [];

	},

	setDrawRange: function ( start, count ) {

		this.drawRange.start = start;
		this.drawRange.count = count;

	},

	applyMatrix4: function ( matrix ) {

		const position = this.attributes.position;

		if ( position !== undefined ) {

			position.applyMatrix4( matrix );

			position.needsUpdate = true;

		}

		const normal = this.attributes.normal;

		if ( normal !== undefined ) {

			const normalMatrix = new Matrix3().getNormalMatrix( matrix );

			normal.applyNormalMatrix( normalMatrix );

			normal.needsUpdate = true;

		}

		const tangent = this.attributes.tangent;

		if ( tangent !== undefined ) {

			tangent.transformDirection( matrix );

			tangent.needsUpdate = true;

		}

		if ( this.boundingBox !== null ) {

			this.computeBoundingBox();

		}

		if ( this.boundingSphere !== null ) {

			this.computeBoundingSphere();

		}

		return this;

	},

	rotateX: function ( angle ) {

		// rotate geometry around world x-axis

		_m1$2.makeRotationX( angle );

		this.applyMatrix4( _m1$2 );

		return this;

	},

	rotateY: function ( angle ) {

		// rotate geometry around world y-axis

		_m1$2.makeRotationY( angle );

		this.applyMatrix4( _m1$2 );

		return this;

	},

	rotateZ: function ( angle ) {

		// rotate geometry around world z-axis

		_m1$2.makeRotationZ( angle );

		this.applyMatrix4( _m1$2 );

		return this;

	},

	translate: function ( x, y, z ) {

		// translate geometry

		_m1$2.makeTranslation( x, y, z );

		this.applyMatrix4( _m1$2 );

		return this;

	},

	scale: function ( x, y, z ) {

		// scale geometry

		_m1$2.makeScale( x, y, z );

		this.applyMatrix4( _m1$2 );

		return this;

	},

	lookAt: function ( vector ) {

		_obj.lookAt( vector );

		_obj.updateMatrix();

		this.applyMatrix4( _obj.matrix );

		return this;

	},

	center: function () {

		this.computeBoundingBox();

		this.boundingBox.getCenter( _offset ).negate();

		this.translate( _offset.x, _offset.y, _offset.z );

		return this;

	},

	setFromPoints: function ( points ) {

		const position = [];

		for ( let i = 0, l = points.length; i < l; i ++ ) {

			const point = points[ i ];
			position.push( point.x, point.y, point.z || 0 );

		}

		this.setAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

		return this;

	},

	computeBoundingBox: function () {

		if ( this.boundingBox === null ) {

			this.boundingBox = new Box3();

		}

		const position = this.attributes.position;
		const morphAttributesPosition = this.morphAttributes.position;

		if ( position && position.isGLBufferAttribute ) {

			console.error( 'THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this );

			this.boundingBox.set(
				new Vector3( - Infinity, - Infinity, - Infinity ),
				new Vector3( + Infinity, + Infinity, + Infinity )
			);

			return;

		}

		if ( position !== undefined ) {

			this.boundingBox.setFromBufferAttribute( position );

			// process morph attributes if present

			if ( morphAttributesPosition ) {

				for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

					const morphAttribute = morphAttributesPosition[ i ];
					_box$2.setFromBufferAttribute( morphAttribute );

					if ( this.morphTargetsRelative ) {

						_vector$4.addVectors( this.boundingBox.min, _box$2.min );
						this.boundingBox.expandByPoint( _vector$4 );

						_vector$4.addVectors( this.boundingBox.max, _box$2.max );
						this.boundingBox.expandByPoint( _vector$4 );

					} else {

						this.boundingBox.expandByPoint( _box$2.min );
						this.boundingBox.expandByPoint( _box$2.max );

					}

				}

			}

		} else {

			this.boundingBox.makeEmpty();

		}

		if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

			console.error( 'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this );

		}

	},

	computeBoundingSphere: function () {

		if ( this.boundingSphere === null ) {

			this.boundingSphere = new Sphere();

		}

		const position = this.attributes.position;
		const morphAttributesPosition = this.morphAttributes.position;

		if ( position && position.isGLBufferAttribute ) {

			console.error( 'THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this );

			this.boundingSphere.set( new Vector3(), Infinity );

			return;

		}

		if ( position ) {

			// first, find the center of the bounding sphere

			const center = this.boundingSphere.center;

			_box$2.setFromBufferAttribute( position );

			// process morph attributes if present

			if ( morphAttributesPosition ) {

				for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

					const morphAttribute = morphAttributesPosition[ i ];
					_boxMorphTargets.setFromBufferAttribute( morphAttribute );

					if ( this.morphTargetsRelative ) {

						_vector$4.addVectors( _box$2.min, _boxMorphTargets.min );
						_box$2.expandByPoint( _vector$4 );

						_vector$4.addVectors( _box$2.max, _boxMorphTargets.max );
						_box$2.expandByPoint( _vector$4 );

					} else {

						_box$2.expandByPoint( _boxMorphTargets.min );
						_box$2.expandByPoint( _boxMorphTargets.max );

					}

				}

			}

			_box$2.getCenter( center );

			// second, try to find a boundingSphere with a radius smaller than the
			// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

			let maxRadiusSq = 0;

			for ( let i = 0, il = position.count; i < il; i ++ ) {

				_vector$4.fromBufferAttribute( position, i );

				maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( _vector$4 ) );

			}

			// process morph attributes if present

			if ( morphAttributesPosition ) {

				for ( let i = 0, il = morphAttributesPosition.length; i < il; i ++ ) {

					const morphAttribute = morphAttributesPosition[ i ];
					const morphTargetsRelative = this.morphTargetsRelative;

					for ( let j = 0, jl = morphAttribute.count; j < jl; j ++ ) {

						_vector$4.fromBufferAttribute( morphAttribute, j );

						if ( morphTargetsRelative ) {

							_offset.fromBufferAttribute( position, j );
							_vector$4.add( _offset );

						}

						maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( _vector$4 ) );

					}

				}

			}

			this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

			if ( isNaN( this.boundingSphere.radius ) ) {

				console.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this );

			}

		}

	},

	computeFaceNormals: function () {

		// backwards compatibility

	},

	computeTangents: function () {

		const index = this.index;
		const attributes = this.attributes;

		// based on http://www.terathon.com/code/tangent.html
		// (per vertex tangents)

		if ( index === null ||
			 attributes.position === undefined ||
			 attributes.normal === undefined ||
			 attributes.uv === undefined ) {

			console.error( 'THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)' );
			return;

		}

		const indices = index.array;
		const positions = attributes.position.array;
		const normals = attributes.normal.array;
		const uvs = attributes.uv.array;

		const nVertices = positions.length / 3;

		if ( attributes.tangent === undefined ) {

			this.setAttribute( 'tangent', new BufferAttribute( new Float32Array( 4 * nVertices ), 4 ) );

		}

		const tangents = attributes.tangent.array;

		const tan1 = [], tan2 = [];

		for ( let i = 0; i < nVertices; i ++ ) {

			tan1[ i ] = new Vector3();
			tan2[ i ] = new Vector3();

		}

		const vA = new Vector3(),
			vB = new Vector3(),
			vC = new Vector3(),

			uvA = new Vector2(),
			uvB = new Vector2(),
			uvC = new Vector2(),

			sdir = new Vector3(),
			tdir = new Vector3();

		function handleTriangle( a, b, c ) {

			vA.fromArray( positions, a * 3 );
			vB.fromArray( positions, b * 3 );
			vC.fromArray( positions, c * 3 );

			uvA.fromArray( uvs, a * 2 );
			uvB.fromArray( uvs, b * 2 );
			uvC.fromArray( uvs, c * 2 );

			vB.sub( vA );
			vC.sub( vA );

			uvB.sub( uvA );
			uvC.sub( uvA );

			const r = 1.0 / ( uvB.x * uvC.y - uvC.x * uvB.y );

			// silently ignore degenerate uv triangles having coincident or colinear vertices

			if ( ! isFinite( r ) ) return;

			sdir.copy( vB ).multiplyScalar( uvC.y ).addScaledVector( vC, - uvB.y ).multiplyScalar( r );
			tdir.copy( vC ).multiplyScalar( uvB.x ).addScaledVector( vB, - uvC.x ).multiplyScalar( r );

			tan1[ a ].add( sdir );
			tan1[ b ].add( sdir );
			tan1[ c ].add( sdir );

			tan2[ a ].add( tdir );
			tan2[ b ].add( tdir );
			tan2[ c ].add( tdir );

		}

		let groups = this.groups;

		if ( groups.length === 0 ) {

			groups = [ {
				start: 0,
				count: indices.length
			} ];

		}

		for ( let i = 0, il = groups.length; i < il; ++ i ) {

			const group = groups[ i ];

			const start = group.start;
			const count = group.count;

			for ( let j = start, jl = start + count; j < jl; j += 3 ) {

				handleTriangle(
					indices[ j + 0 ],
					indices[ j + 1 ],
					indices[ j + 2 ]
				);

			}

		}

		const tmp = new Vector3(), tmp2 = new Vector3();
		const n = new Vector3(), n2 = new Vector3();

		function handleVertex( v ) {

			n.fromArray( normals, v * 3 );
			n2.copy( n );

			const t = tan1[ v ];

			// Gram-Schmidt orthogonalize

			tmp.copy( t );
			tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

			// Calculate handedness

			tmp2.crossVectors( n2, t );
			const test = tmp2.dot( tan2[ v ] );
			const w = ( test < 0.0 ) ? - 1.0 : 1.0;

			tangents[ v * 4 ] = tmp.x;
			tangents[ v * 4 + 1 ] = tmp.y;
			tangents[ v * 4 + 2 ] = tmp.z;
			tangents[ v * 4 + 3 ] = w;

		}

		for ( let i = 0, il = groups.length; i < il; ++ i ) {

			const group = groups[ i ];

			const start = group.start;
			const count = group.count;

			for ( let j = start, jl = start + count; j < jl; j += 3 ) {

				handleVertex( indices[ j + 0 ] );
				handleVertex( indices[ j + 1 ] );
				handleVertex( indices[ j + 2 ] );

			}

		}

	},

	computeVertexNormals: function () {

		const index = this.index;
		const positionAttribute = this.getAttribute( 'position' );

		if ( positionAttribute !== undefined ) {

			let normalAttribute = this.getAttribute( 'normal' );

			if ( normalAttribute === undefined ) {

				normalAttribute = new BufferAttribute( new Float32Array( positionAttribute.count * 3 ), 3 );
				this.setAttribute( 'normal', normalAttribute );

			} else {

				// reset existing normals to zero

				for ( let i = 0, il = normalAttribute.count; i < il; i ++ ) {

					normalAttribute.setXYZ( i, 0, 0, 0 );

				}

			}

			const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
			const nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
			const cb = new Vector3(), ab = new Vector3();

			// indexed elements

			if ( index ) {

				for ( let i = 0, il = index.count; i < il; i += 3 ) {

					const vA = index.getX( i + 0 );
					const vB = index.getX( i + 1 );
					const vC = index.getX( i + 2 );

					pA.fromBufferAttribute( positionAttribute, vA );
					pB.fromBufferAttribute( positionAttribute, vB );
					pC.fromBufferAttribute( positionAttribute, vC );

					cb.subVectors( pC, pB );
					ab.subVectors( pA, pB );
					cb.cross( ab );

					nA.fromBufferAttribute( normalAttribute, vA );
					nB.fromBufferAttribute( normalAttribute, vB );
					nC.fromBufferAttribute( normalAttribute, vC );

					nA.add( cb );
					nB.add( cb );
					nC.add( cb );

					normalAttribute.setXYZ( vA, nA.x, nA.y, nA.z );
					normalAttribute.setXYZ( vB, nB.x, nB.y, nB.z );
					normalAttribute.setXYZ( vC, nC.x, nC.y, nC.z );

				}

			} else {

				// non-indexed elements (unconnected triangle soup)

				for ( let i = 0, il = positionAttribute.count; i < il; i += 3 ) {

					pA.fromBufferAttribute( positionAttribute, i + 0 );
					pB.fromBufferAttribute( positionAttribute, i + 1 );
					pC.fromBufferAttribute( positionAttribute, i + 2 );

					cb.subVectors( pC, pB );
					ab.subVectors( pA, pB );
					cb.cross( ab );

					normalAttribute.setXYZ( i + 0, cb.x, cb.y, cb.z );
					normalAttribute.setXYZ( i + 1, cb.x, cb.y, cb.z );
					normalAttribute.setXYZ( i + 2, cb.x, cb.y, cb.z );

				}

			}

			this.normalizeNormals();

			normalAttribute.needsUpdate = true;

		}

	},

	merge: function ( geometry, offset ) {

		if ( ! ( geometry && geometry.isBufferGeometry ) ) {

			console.error( 'THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry );
			return;

		}

		if ( offset === undefined ) {

			offset = 0;

			console.warn(
				'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. '
				+ 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.'
			);

		}

		const attributes = this.attributes;

		for ( const key in attributes ) {

			if ( geometry.attributes[ key ] === undefined ) continue;

			const attribute1 = attributes[ key ];
			const attributeArray1 = attribute1.array;

			const attribute2 = geometry.attributes[ key ];
			const attributeArray2 = attribute2.array;

			const attributeOffset = attribute2.itemSize * offset;
			const length = Math.min( attributeArray2.length, attributeArray1.length - attributeOffset );

			for ( let i = 0, j = attributeOffset; i < length; i ++, j ++ ) {

				attributeArray1[ j ] = attributeArray2[ i ];

			}

		}

		return this;

	},

	normalizeNormals: function () {

		const normals = this.attributes.normal;

		for ( let i = 0, il = normals.count; i < il; i ++ ) {

			_vector$4.fromBufferAttribute( normals, i );

			_vector$4.normalize();

			normals.setXYZ( i, _vector$4.x, _vector$4.y, _vector$4.z );

		}

	},

	toNonIndexed: function () {

		function convertBufferAttribute( attribute, indices ) {

			const array = attribute.array;
			const itemSize = attribute.itemSize;
			const normalized = attribute.normalized;

			const array2 = new array.constructor( indices.length * itemSize );

			let index = 0, index2 = 0;

			for ( let i = 0, l = indices.length; i < l; i ++ ) {

				index = indices[ i ] * itemSize;

				for ( let j = 0; j < itemSize; j ++ ) {

					array2[ index2 ++ ] = array[ index ++ ];

				}

			}

			return new BufferAttribute( array2, itemSize, normalized );

		}

		//

		if ( this.index === null ) {

			console.warn( 'THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.' );
			return this;

		}

		const geometry2 = new BufferGeometry();

		const indices = this.index.array;
		const attributes = this.attributes;

		// attributes

		for ( const name in attributes ) {

			const attribute = attributes[ name ];

			const newAttribute = convertBufferAttribute( attribute, indices );

			geometry2.setAttribute( name, newAttribute );

		}

		// morph attributes

		const morphAttributes = this.morphAttributes;

		for ( const name in morphAttributes ) {

			const morphArray = [];
			const morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const attribute = morphAttribute[ i ];

				const newAttribute = convertBufferAttribute( attribute, indices );

				morphArray.push( newAttribute );

			}

			geometry2.morphAttributes[ name ] = morphArray;

		}

		geometry2.morphTargetsRelative = this.morphTargetsRelative;

		// groups

		const groups = this.groups;

		for ( let i = 0, l = groups.length; i < l; i ++ ) {

			const group = groups[ i ];
			geometry2.addGroup( group.start, group.count, group.materialIndex );

		}

		return geometry2;

	},

	toJSON: function () {

		const data = {
			metadata: {
				version: 4.5,
				type: 'BufferGeometry',
				generator: 'BufferGeometry.toJSON'
			}
		};

		// standard BufferGeometry serialization

		data.uuid = this.uuid;
		data.type = this.type;
		if ( this.name !== '' ) data.name = this.name;
		if ( Object.keys( this.userData ).length > 0 ) data.userData = this.userData;

		if ( this.parameters !== undefined ) {

			const parameters = this.parameters;

			for ( const key in parameters ) {

				if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

			}

			return data;

		}

		data.data = { attributes: {} };

		const index = this.index;

		if ( index !== null ) {

			data.data.index = {
				type: index.array.constructor.name,
				array: Array.prototype.slice.call( index.array )
			};

		}

		const attributes = this.attributes;

		for ( const key in attributes ) {

			const attribute = attributes[ key ];

			const attributeData = attribute.toJSON( data.data );

			if ( attribute.name !== '' ) attributeData.name = attribute.name;

			data.data.attributes[ key ] = attributeData;

		}

		const morphAttributes = {};
		let hasMorphAttributes = false;

		for ( const key in this.morphAttributes ) {

			const attributeArray = this.morphAttributes[ key ];

			const array = [];

			for ( let i = 0, il = attributeArray.length; i < il; i ++ ) {

				const attribute = attributeArray[ i ];

				const attributeData = attribute.toJSON( data.data );

				if ( attribute.name !== '' ) attributeData.name = attribute.name;

				array.push( attributeData );

			}

			if ( array.length > 0 ) {

				morphAttributes[ key ] = array;

				hasMorphAttributes = true;

			}

		}

		if ( hasMorphAttributes ) {

			data.data.morphAttributes = morphAttributes;
			data.data.morphTargetsRelative = this.morphTargetsRelative;

		}

		const groups = this.groups;

		if ( groups.length > 0 ) {

			data.data.groups = JSON.parse( JSON.stringify( groups ) );

		}

		const boundingSphere = this.boundingSphere;

		if ( boundingSphere !== null ) {

			data.data.boundingSphere = {
				center: boundingSphere.center.toArray(),
				radius: boundingSphere.radius
			};

		}

		return data;

	},

	clone: function () {

		/*
		 // Handle primitives

		 const parameters = this.parameters;

		 if ( parameters !== undefined ) {

		 const values = [];

		 for ( const key in parameters ) {

		 values.push( parameters[ key ] );

		 }

		 const geometry = Object.create( this.constructor.prototype );
		 this.constructor.apply( geometry, values );
		 return geometry;

		 }

		 return new this.constructor().copy( this );
		 */

		return new BufferGeometry().copy( this );

	},

	copy: function ( source ) {

		// reset

		this.index = null;
		this.attributes = {};
		this.morphAttributes = {};
		this.groups = [];
		this.boundingBox = null;
		this.boundingSphere = null;

		// used for storing cloned, shared data

		const data = {};

		// name

		this.name = source.name;

		// index

		const index = source.index;

		if ( index !== null ) {

			this.setIndex( index.clone( data ) );

		}

		// attributes

		const attributes = source.attributes;

		for ( const name in attributes ) {

			const attribute = attributes[ name ];
			this.setAttribute( name, attribute.clone( data ) );

		}

		// morph attributes

		const morphAttributes = source.morphAttributes;

		for ( const name in morphAttributes ) {

			const array = [];
			const morphAttribute = morphAttributes[ name ]; // morphAttribute: array of Float32BufferAttributes

			for ( let i = 0, l = morphAttribute.length; i < l; i ++ ) {

				array.push( morphAttribute[ i ].clone( data ) );

			}

			this.morphAttributes[ name ] = array;

		}

		this.morphTargetsRelative = source.morphTargetsRelative;

		// groups

		const groups = source.groups;

		for ( let i = 0, l = groups.length; i < l; i ++ ) {

			const group = groups[ i ];
			this.addGroup( group.start, group.count, group.materialIndex );

		}

		// bounding box

		const boundingBox = source.boundingBox;

		if ( boundingBox !== null ) {

			this.boundingBox = boundingBox.clone();

		}

		// bounding sphere

		const boundingSphere = source.boundingSphere;

		if ( boundingSphere !== null ) {

			this.boundingSphere = boundingSphere.clone();

		}

		// draw range

		this.drawRange.start = source.drawRange.start;
		this.drawRange.count = source.drawRange.count;

		// user data

		this.userData = source.userData;

		return this;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

} );

const _inverseMatrix = new Matrix4();
const _ray = new Ray();
const _sphere = new Sphere();

const _vA = new Vector3();
const _vB = new Vector3();
const _vC = new Vector3();

const _tempA = new Vector3();
const _tempB = new Vector3();
const _tempC = new Vector3();

const _morphA = new Vector3();
const _morphB = new Vector3();
const _morphC = new Vector3();

const _uvA = new Vector2();
const _uvB = new Vector2();
const _uvC = new Vector2();

const _intersectionPoint = new Vector3();
const _intersectionPointWorld = new Vector3();

function Mesh( geometry = new BufferGeometry(), material = new MeshBasicMaterial() ) {

	Object3D.call( this );

	this.type = 'Mesh';

	this.geometry = geometry;
	this.material = material;

	this.updateMorphTargets();

}

Mesh.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Mesh,

	isMesh: true,

	copy: function ( source ) {

		Object3D.prototype.copy.call( this, source );

		if ( source.morphTargetInfluences !== undefined ) {

			this.morphTargetInfluences = source.morphTargetInfluences.slice();

		}

		if ( source.morphTargetDictionary !== undefined ) {

			this.morphTargetDictionary = Object.assign( {}, source.morphTargetDictionary );

		}

		this.material = source.material;
		this.geometry = source.geometry;

		return this;

	},

	updateMorphTargets: function () {

		const geometry = this.geometry;

		if ( geometry.isBufferGeometry ) {

			const morphAttributes = geometry.morphAttributes;
			const keys = Object.keys( morphAttributes );

			if ( keys.length > 0 ) {

				const morphAttribute = morphAttributes[ keys[ 0 ] ];

				if ( morphAttribute !== undefined ) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for ( let m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

						const name = morphAttribute[ m ].name || String( m );

						this.morphTargetInfluences.push( 0 );
						this.morphTargetDictionary[ name ] = m;

					}

				}

			}

		} else {

			const morphTargets = geometry.morphTargets;

			if ( morphTargets !== undefined && morphTargets.length > 0 ) {

				console.error( 'THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

			}

		}

	},

	raycast: function ( raycaster, intersects ) {

		const geometry = this.geometry;
		const material = this.material;
		const matrixWorld = this.matrixWorld;

		if ( material === undefined ) return;

		// Checking boundingSphere distance to ray

		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		_sphere.copy( geometry.boundingSphere );
		_sphere.applyMatrix4( matrixWorld );

		if ( raycaster.ray.intersectsSphere( _sphere ) === false ) return;

		//

		_inverseMatrix.copy( matrixWorld ).invert();
		_ray.copy( raycaster.ray ).applyMatrix4( _inverseMatrix );

		// Check boundingBox before continuing

		if ( geometry.boundingBox !== null ) {

			if ( _ray.intersectsBox( geometry.boundingBox ) === false ) return;

		}

		let intersection;

		if ( geometry.isBufferGeometry ) {

			const index = geometry.index;
			const position = geometry.attributes.position;
			const morphPosition = geometry.morphAttributes.position;
			const morphTargetsRelative = geometry.morphTargetsRelative;
			const uv = geometry.attributes.uv;
			const uv2 = geometry.attributes.uv2;
			const groups = geometry.groups;
			const drawRange = geometry.drawRange;

			if ( index !== null ) {

				// indexed buffer geometry

				if ( Array.isArray( material ) ) {

					for ( let i = 0, il = groups.length; i < il; i ++ ) {

						const group = groups[ i ];
						const groupMaterial = material[ group.materialIndex ];

						const start = Math.max( group.start, drawRange.start );
						const end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

						for ( let j = start, jl = end; j < jl; j += 3 ) {

							const a = index.getX( j );
							const b = index.getX( j + 1 );
							const c = index.getX( j + 2 );

							intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

							if ( intersection ) {

								intersection.faceIndex = Math.floor( j / 3 ); // triangle number in indexed buffer semantics
								intersection.face.materialIndex = group.materialIndex;
								intersects.push( intersection );

							}

						}

					}

				} else {

					const start = Math.max( 0, drawRange.start );
					const end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

					for ( let i = start, il = end; i < il; i += 3 ) {

						const a = index.getX( i );
						const b = index.getX( i + 1 );
						const c = index.getX( i + 2 );

						intersection = checkBufferGeometryIntersection( this, material, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

						if ( intersection ) {

							intersection.faceIndex = Math.floor( i / 3 ); // triangle number in indexed buffer semantics
							intersects.push( intersection );

						}

					}

				}

			} else if ( position !== undefined ) {

				// non-indexed buffer geometry

				if ( Array.isArray( material ) ) {

					for ( let i = 0, il = groups.length; i < il; i ++ ) {

						const group = groups[ i ];
						const groupMaterial = material[ group.materialIndex ];

						const start = Math.max( group.start, drawRange.start );
						const end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

						for ( let j = start, jl = end; j < jl; j += 3 ) {

							const a = j;
							const b = j + 1;
							const c = j + 2;

							intersection = checkBufferGeometryIntersection( this, groupMaterial, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

							if ( intersection ) {

								intersection.faceIndex = Math.floor( j / 3 ); // triangle number in non-indexed buffer semantics
								intersection.face.materialIndex = group.materialIndex;
								intersects.push( intersection );

							}

						}

					}

				} else {

					const start = Math.max( 0, drawRange.start );
					const end = Math.min( position.count, ( drawRange.start + drawRange.count ) );

					for ( let i = start, il = end; i < il; i += 3 ) {

						const a = i;
						const b = i + 1;
						const c = i + 2;

						intersection = checkBufferGeometryIntersection( this, material, raycaster, _ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c );

						if ( intersection ) {

							intersection.faceIndex = Math.floor( i / 3 ); // triangle number in non-indexed buffer semantics
							intersects.push( intersection );

						}

					}

				}

			}

		} else if ( geometry.isGeometry ) {

			console.error( 'THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

		}

	}

} );

function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

	let intersect;

	if ( material.side === BackSide ) {

		intersect = ray.intersectTriangle( pC, pB, pA, true, point );

	} else {

		intersect = ray.intersectTriangle( pA, pB, pC, material.side !== DoubleSide, point );

	}

	if ( intersect === null ) return null;

	_intersectionPointWorld.copy( point );
	_intersectionPointWorld.applyMatrix4( object.matrixWorld );

	const distance = raycaster.ray.origin.distanceTo( _intersectionPointWorld );

	if ( distance < raycaster.near || distance > raycaster.far ) return null;

	return {
		distance: distance,
		point: _intersectionPointWorld.clone(),
		object: object
	};

}

function checkBufferGeometryIntersection( object, material, raycaster, ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c ) {

	_vA.fromBufferAttribute( position, a );
	_vB.fromBufferAttribute( position, b );
	_vC.fromBufferAttribute( position, c );

	const morphInfluences = object.morphTargetInfluences;

	if ( material.morphTargets && morphPosition && morphInfluences ) {

		_morphA.set( 0, 0, 0 );
		_morphB.set( 0, 0, 0 );
		_morphC.set( 0, 0, 0 );

		for ( let i = 0, il = morphPosition.length; i < il; i ++ ) {

			const influence = morphInfluences[ i ];
			const morphAttribute = morphPosition[ i ];

			if ( influence === 0 ) continue;

			_tempA.fromBufferAttribute( morphAttribute, a );
			_tempB.fromBufferAttribute( morphAttribute, b );
			_tempC.fromBufferAttribute( morphAttribute, c );

			if ( morphTargetsRelative ) {

				_morphA.addScaledVector( _tempA, influence );
				_morphB.addScaledVector( _tempB, influence );
				_morphC.addScaledVector( _tempC, influence );

			} else {

				_morphA.addScaledVector( _tempA.sub( _vA ), influence );
				_morphB.addScaledVector( _tempB.sub( _vB ), influence );
				_morphC.addScaledVector( _tempC.sub( _vC ), influence );

			}

		}

		_vA.add( _morphA );
		_vB.add( _morphB );
		_vC.add( _morphC );

	}

	if ( object.isSkinnedMesh && material.skinning ) {

		object.boneTransform( a, _vA );
		object.boneTransform( b, _vB );
		object.boneTransform( c, _vC );

	}

	const intersection = checkIntersection( object, material, raycaster, ray, _vA, _vB, _vC, _intersectionPoint );

	if ( intersection ) {

		if ( uv ) {

			_uvA.fromBufferAttribute( uv, a );
			_uvB.fromBufferAttribute( uv, b );
			_uvC.fromBufferAttribute( uv, c );

			intersection.uv = Triangle.getUV( _intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vector2() );

		}

		if ( uv2 ) {

			_uvA.fromBufferAttribute( uv2, a );
			_uvB.fromBufferAttribute( uv2, b );
			_uvC.fromBufferAttribute( uv2, c );

			intersection.uv2 = Triangle.getUV( _intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vector2() );

		}

		const face = {
			a: a,
			b: b,
			c: c,
			normal: new Vector3(),
			materialIndex: 0
		};

		Triangle.getNormal( _vA, _vB, _vC, face.normal );

		intersection.face = face;

	}

	return intersection;

}

class BoxGeometry extends BufferGeometry {

	constructor( width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1 ) {

		super();

		this.type = 'BoxGeometry';

		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments
		};

		const scope = this;

		// segments

		widthSegments = Math.floor( widthSegments );
		heightSegments = Math.floor( heightSegments );
		depthSegments = Math.floor( depthSegments );

		// buffers

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		// helper variables

		let numberOfVertices = 0;
		let groupStart = 0;

		// build each side of the box geometry

		buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
		buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
		buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
		buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
		buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
		buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

		// build geometry

		this.setIndex( indices );
		this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		function buildPlane( u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex ) {

			const segmentWidth = width / gridX;
			const segmentHeight = height / gridY;

			const widthHalf = width / 2;
			const heightHalf = height / 2;
			const depthHalf = depth / 2;

			const gridX1 = gridX + 1;
			const gridY1 = gridY + 1;

			let vertexCounter = 0;
			let groupCount = 0;

			const vector = new Vector3();

			// generate vertices, normals and uvs

			for ( let iy = 0; iy < gridY1; iy ++ ) {

				const y = iy * segmentHeight - heightHalf;

				for ( let ix = 0; ix < gridX1; ix ++ ) {

					const x = ix * segmentWidth - widthHalf;

					// set values to correct vector component

					vector[ u ] = x * udir;
					vector[ v ] = y * vdir;
					vector[ w ] = depthHalf;

					// now apply vector to vertex buffer

					vertices.push( vector.x, vector.y, vector.z );

					// set values to correct vector component

					vector[ u ] = 0;
					vector[ v ] = 0;
					vector[ w ] = depth > 0 ? 1 : - 1;

					// now apply vector to normal buffer

					normals.push( vector.x, vector.y, vector.z );

					// uvs

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );

					// counters

					vertexCounter += 1;

				}

			}

			// indices

			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment

			for ( let iy = 0; iy < gridY; iy ++ ) {

				for ( let ix = 0; ix < gridX; ix ++ ) {

					const a = numberOfVertices + ix + gridX1 * iy;
					const b = numberOfVertices + ix + gridX1 * ( iy + 1 );
					const c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
					const d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

					// increase counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup( groupStart, groupCount, materialIndex );

			// calculate new start value for groups

			groupStart += groupCount;

			// update total number of vertices

			numberOfVertices += vertexCounter;

		}

	}

}

/**
 * Uniform Utilities
 */

function cloneUniforms( src ) {

	const dst = {};

	for ( const u in src ) {

		dst[ u ] = {};

		for ( const p in src[ u ] ) {

			const property = src[ u ][ p ];

			if ( property && ( property.isColor ||
				property.isMatrix3 || property.isMatrix4 ||
				property.isVector2 || property.isVector3 || property.isVector4 ||
				property.isTexture || property.isQuaternion ) ) {

				dst[ u ][ p ] = property.clone();

			} else if ( Array.isArray( property ) ) {

				dst[ u ][ p ] = property.slice();

			} else {

				dst[ u ][ p ] = property;

			}

		}

	}

	return dst;

}

function mergeUniforms( uniforms ) {

	const merged = {};

	for ( let u = 0; u < uniforms.length; u ++ ) {

		const tmp = cloneUniforms( uniforms[ u ] );

		for ( const p in tmp ) {

			merged[ p ] = tmp[ p ];

		}

	}

	return merged;

}

// Legacy

const UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };

var default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";

var default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";

/**
 * parameters = {
 *  defines: { "label" : "value" },
 *  uniforms: { "parameter1": { value: 1.0 }, "parameter2": { value2: 2 } },
 *
 *  fragmentShader: <string>,
 *  vertexShader: <string>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  lights: <bool>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */

function ShaderMaterial( parameters ) {

	Material.call( this );

	this.type = 'ShaderMaterial';

	this.defines = {};
	this.uniforms = {};

	this.vertexShader = default_vertex;
	this.fragmentShader = default_fragment;

	this.linewidth = 1;

	this.wireframe = false;
	this.wireframeLinewidth = 1;

	this.fog = false; // set to use scene fog
	this.lights = false; // set to use scene lights
	this.clipping = false; // set to use user-defined clipping planes

	this.skinning = false; // set to use skinning attribute streams
	this.morphTargets = false; // set to use morph targets
	this.morphNormals = false; // set to use morph normals

	this.extensions = {
		derivatives: false, // set to use derivatives
		fragDepth: false, // set to use fragment depth values
		drawBuffers: false, // set to use draw buffers
		shaderTextureLOD: false // set to use shader texture LOD
	};

	// When rendered geometry doesn't include these attributes but the material does,
	// use these default values in WebGL. This avoids errors when buffer data is missing.
	this.defaultAttributeValues = {
		'color': [ 1, 1, 1 ],
		'uv': [ 0, 0 ],
		'uv2': [ 0, 0 ]
	};

	this.index0AttributeName = undefined;
	this.uniformsNeedUpdate = false;

	this.glslVersion = null;

	if ( parameters !== undefined ) {

		if ( parameters.attributes !== undefined ) {

			console.error( 'THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.' );

		}

		this.setValues( parameters );

	}

}

ShaderMaterial.prototype = Object.create( Material.prototype );
ShaderMaterial.prototype.constructor = ShaderMaterial;

ShaderMaterial.prototype.isShaderMaterial = true;

ShaderMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.fragmentShader = source.fragmentShader;
	this.vertexShader = source.vertexShader;

	this.uniforms = cloneUniforms( source.uniforms );

	this.defines = Object.assign( {}, source.defines );

	this.wireframe = source.wireframe;
	this.wireframeLinewidth = source.wireframeLinewidth;

	this.lights = source.lights;
	this.clipping = source.clipping;

	this.skinning = source.skinning;

	this.morphTargets = source.morphTargets;
	this.morphNormals = source.morphNormals;

	this.extensions = Object.assign( {}, source.extensions );

	this.glslVersion = source.glslVersion;

	return this;

};

ShaderMaterial.prototype.toJSON = function ( meta ) {

	const data = Material.prototype.toJSON.call( this, meta );

	data.glslVersion = this.glslVersion;
	data.uniforms = {};

	for ( const name in this.uniforms ) {

		const uniform = this.uniforms[ name ];
		const value = uniform.value;

		if ( value && value.isTexture ) {

			data.uniforms[ name ] = {
				type: 't',
				value: value.toJSON( meta ).uuid
			};

		} else if ( value && value.isColor ) {

			data.uniforms[ name ] = {
				type: 'c',
				value: value.getHex()
			};

		} else if ( value && value.isVector2 ) {

			data.uniforms[ name ] = {
				type: 'v2',
				value: value.toArray()
			};

		} else if ( value && value.isVector3 ) {

			data.uniforms[ name ] = {
				type: 'v3',
				value: value.toArray()
			};

		} else if ( value && value.isVector4 ) {

			data.uniforms[ name ] = {
				type: 'v4',
				value: value.toArray()
			};

		} else if ( value && value.isMatrix3 ) {

			data.uniforms[ name ] = {
				type: 'm3',
				value: value.toArray()
			};

		} else if ( value && value.isMatrix4 ) {

			data.uniforms[ name ] = {
				type: 'm4',
				value: value.toArray()
			};

		} else {

			data.uniforms[ name ] = {
				value: value
			};

			// note: the array variants v2v, v3v, v4v, m4v and tv are not supported so far

		}

	}

	if ( Object.keys( this.defines ).length > 0 ) data.defines = this.defines;

	data.vertexShader = this.vertexShader;
	data.fragmentShader = this.fragmentShader;

	const extensions = {};

	for ( const key in this.extensions ) {

		if ( this.extensions[ key ] === true ) extensions[ key ] = true;

	}

	if ( Object.keys( extensions ).length > 0 ) data.extensions = extensions;

	return data;

};

function Camera() {

	Object3D.call( this );

	this.type = 'Camera';

	this.matrixWorldInverse = new Matrix4();

	this.projectionMatrix = new Matrix4();
	this.projectionMatrixInverse = new Matrix4();

}

Camera.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Camera,

	isCamera: true,

	copy: function ( source, recursive ) {

		Object3D.prototype.copy.call( this, source, recursive );

		this.matrixWorldInverse.copy( source.matrixWorldInverse );

		this.projectionMatrix.copy( source.projectionMatrix );
		this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

		return this;

	},

	getWorldDirection: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Camera: .getWorldDirection() target is now required' );
			target = new Vector3();

		}

		this.updateWorldMatrix( true, false );

		const e = this.matrixWorld.elements;

		return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

	},

	updateMatrixWorld: function ( force ) {

		Object3D.prototype.updateMatrixWorld.call( this, force );

		this.matrixWorldInverse.copy( this.matrixWorld ).invert();

	},

	updateWorldMatrix: function ( updateParents, updateChildren ) {

		Object3D.prototype.updateWorldMatrix.call( this, updateParents, updateChildren );

		this.matrixWorldInverse.copy( this.matrixWorld ).invert();

	},

	clone: function () {

		return new this.constructor().copy( this );

	}

} );

function PerspectiveCamera( fov = 50, aspect = 1, near = 0.1, far = 2000 ) {

	Camera.call( this );

	this.type = 'PerspectiveCamera';

	this.fov = fov;
	this.zoom = 1;

	this.near = near;
	this.far = far;
	this.focus = 10;

	this.aspect = aspect;
	this.view = null;

	this.filmGauge = 35;	// width of the film (default in millimeters)
	this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

	this.updateProjectionMatrix();

}

PerspectiveCamera.prototype = Object.assign( Object.create( Camera.prototype ), {

	constructor: PerspectiveCamera,

	isPerspectiveCamera: true,

	copy: function ( source, recursive ) {

		Camera.prototype.copy.call( this, source, recursive );

		this.fov = source.fov;
		this.zoom = source.zoom;

		this.near = source.near;
		this.far = source.far;
		this.focus = source.focus;

		this.aspect = source.aspect;
		this.view = source.view === null ? null : Object.assign( {}, source.view );

		this.filmGauge = source.filmGauge;
		this.filmOffset = source.filmOffset;

		return this;

	},

	/**
	 * Sets the FOV by focal length in respect to the current .filmGauge.
	 *
	 * The default film gauge is 35, so that the focal length can be specified for
	 * a 35mm (full frame) camera.
	 *
	 * Values for focal length and film gauge must have the same unit.
	 */
	setFocalLength: function ( focalLength ) {

		/** see {@link http://www.bobatkins.com/photography/technical/field_of_view.html} */
		const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

		this.fov = MathUtils.RAD2DEG * 2 * Math.atan( vExtentSlope );
		this.updateProjectionMatrix();

	},

	/**
	 * Calculates the focal length from the current .fov and .filmGauge.
	 */
	getFocalLength: function () {

		const vExtentSlope = Math.tan( MathUtils.DEG2RAD * 0.5 * this.fov );

		return 0.5 * this.getFilmHeight() / vExtentSlope;

	},

	getEffectiveFOV: function () {

		return MathUtils.RAD2DEG * 2 * Math.atan(
			Math.tan( MathUtils.DEG2RAD * 0.5 * this.fov ) / this.zoom );

	},

	getFilmWidth: function () {

		// film not completely covered in portrait format (aspect < 1)
		return this.filmGauge * Math.min( this.aspect, 1 );

	},

	getFilmHeight: function () {

		// film not completely covered in landscape format (aspect > 1)
		return this.filmGauge / Math.max( this.aspect, 1 );

	},

	/**
	 * Sets an offset in a larger frustum. This is useful for multi-window or
	 * multi-monitor/multi-machine setups.
	 *
	 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
	 * the monitors are in grid like this
	 *
	 *   +---+---+---+
	 *   | A | B | C |
	 *   +---+---+---+
	 *   | D | E | F |
	 *   +---+---+---+
	 *
	 * then for each monitor you would call it like this
	 *
	 *   const w = 1920;
	 *   const h = 1080;
	 *   const fullWidth = w * 3;
	 *   const fullHeight = h * 2;
	 *
	 *   --A--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
	 *   --B--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
	 *   --C--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
	 *   --D--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
	 *   --E--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
	 *   --F--
	 *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
	 *
	 *   Note there is no reason monitors have to be the same size or in a grid.
	 */
	setViewOffset: function ( fullWidth, fullHeight, x, y, width, height ) {

		this.aspect = fullWidth / fullHeight;

		if ( this.view === null ) {

			this.view = {
				enabled: true,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			};

		}

		this.view.enabled = true;
		this.view.fullWidth = fullWidth;
		this.view.fullHeight = fullHeight;
		this.view.offsetX = x;
		this.view.offsetY = y;
		this.view.width = width;
		this.view.height = height;

		this.updateProjectionMatrix();

	},

	clearViewOffset: function () {

		if ( this.view !== null ) {

			this.view.enabled = false;

		}

		this.updateProjectionMatrix();

	},

	updateProjectionMatrix: function () {

		const near = this.near;
		let top = near * Math.tan( MathUtils.DEG2RAD * 0.5 * this.fov ) / this.zoom;
		let height = 2 * top;
		let width = this.aspect * height;
		let left = - 0.5 * width;
		const view = this.view;

		if ( this.view !== null && this.view.enabled ) {

			const fullWidth = view.fullWidth,
				fullHeight = view.fullHeight;

			left += view.offsetX * width / fullWidth;
			top -= view.offsetY * height / fullHeight;
			width *= view.width / fullWidth;
			height *= view.height / fullHeight;

		}

		const skew = this.filmOffset;
		if ( skew !== 0 ) left += near * skew / this.getFilmWidth();

		this.projectionMatrix.makePerspective( left, left + width, top, top - height, near, this.far );

		this.projectionMatrixInverse.copy( this.projectionMatrix ).invert();

	},

	toJSON: function ( meta ) {

		const data = Object3D.prototype.toJSON.call( this, meta );

		data.object.fov = this.fov;
		data.object.zoom = this.zoom;

		data.object.near = this.near;
		data.object.far = this.far;
		data.object.focus = this.focus;

		data.object.aspect = this.aspect;

		if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

		data.object.filmGauge = this.filmGauge;
		data.object.filmOffset = this.filmOffset;

		return data;

	}

} );

const fov = 90, aspect = 1;

class CubeCamera extends Object3D {

	constructor( near, far, renderTarget ) {

		super();

		this.type = 'CubeCamera';

		if ( renderTarget.isWebGLCubeRenderTarget !== true ) {

			console.error( 'THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.' );
			return;

		}

		this.renderTarget = renderTarget;

		const cameraPX = new PerspectiveCamera( fov, aspect, near, far );
		cameraPX.layers = this.layers;
		cameraPX.up.set( 0, - 1, 0 );
		cameraPX.lookAt( new Vector3( 1, 0, 0 ) );
		this.add( cameraPX );

		const cameraNX = new PerspectiveCamera( fov, aspect, near, far );
		cameraNX.layers = this.layers;
		cameraNX.up.set( 0, - 1, 0 );
		cameraNX.lookAt( new Vector3( - 1, 0, 0 ) );
		this.add( cameraNX );

		const cameraPY = new PerspectiveCamera( fov, aspect, near, far );
		cameraPY.layers = this.layers;
		cameraPY.up.set( 0, 0, 1 );
		cameraPY.lookAt( new Vector3( 0, 1, 0 ) );
		this.add( cameraPY );

		const cameraNY = new PerspectiveCamera( fov, aspect, near, far );
		cameraNY.layers = this.layers;
		cameraNY.up.set( 0, 0, - 1 );
		cameraNY.lookAt( new Vector3( 0, - 1, 0 ) );
		this.add( cameraNY );

		const cameraPZ = new PerspectiveCamera( fov, aspect, near, far );
		cameraPZ.layers = this.layers;
		cameraPZ.up.set( 0, - 1, 0 );
		cameraPZ.lookAt( new Vector3( 0, 0, 1 ) );
		this.add( cameraPZ );

		const cameraNZ = new PerspectiveCamera( fov, aspect, near, far );
		cameraNZ.layers = this.layers;
		cameraNZ.up.set( 0, - 1, 0 );
		cameraNZ.lookAt( new Vector3( 0, 0, - 1 ) );
		this.add( cameraNZ );

	}

	update( renderer, scene ) {

		if ( this.parent === null ) this.updateMatrixWorld();

		const renderTarget = this.renderTarget;

		const [ cameraPX, cameraNX, cameraPY, cameraNY, cameraPZ, cameraNZ ] = this.children;

		const currentXrEnabled = renderer.xr.enabled;
		const currentRenderTarget = renderer.getRenderTarget();

		renderer.xr.enabled = false;

		const generateMipmaps = renderTarget.texture.generateMipmaps;

		renderTarget.texture.generateMipmaps = false;

		renderer.setRenderTarget( renderTarget, 0 );
		renderer.render( scene, cameraPX );

		renderer.setRenderTarget( renderTarget, 1 );
		renderer.render( scene, cameraNX );

		renderer.setRenderTarget( renderTarget, 2 );
		renderer.render( scene, cameraPY );

		renderer.setRenderTarget( renderTarget, 3 );
		renderer.render( scene, cameraNY );

		renderer.setRenderTarget( renderTarget, 4 );
		renderer.render( scene, cameraPZ );

		renderTarget.texture.generateMipmaps = generateMipmaps;

		renderer.setRenderTarget( renderTarget, 5 );
		renderer.render( scene, cameraNZ );

		renderer.setRenderTarget( currentRenderTarget );

		renderer.xr.enabled = currentXrEnabled;

	}

}

class CubeTexture extends Texture {

	constructor( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

		images = images !== undefined ? images : [];
		mapping = mapping !== undefined ? mapping : CubeReflectionMapping;
		format = format !== undefined ? format : RGBFormat;

		super( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		// Why CubeTexture._needsFlipEnvMap is necessary:
		//
		// By convention -- likely based on the RenderMan spec from the 1990's -- cube maps are specified by WebGL (and three.js)
		// in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words,
		// in a left-handed coordinate system. By continuing this convention, preexisting cube maps continued to render correctly.

		// three.js uses a right-handed coordinate system. So environment maps used in three.js appear to have px and nx swapped
		// and the flag _needsFlipEnvMap controls this conversion. The flip is not required (and thus _needsFlipEnvMap is set to false)
		// when using WebGLCubeRenderTarget.texture as a cube texture.

		this._needsFlipEnvMap = true;

		this.flipY = false;

	}

	get images() {

		return this.image;

	}

	set images( value ) {

		this.image = value;

	}

}

CubeTexture.prototype.isCubeTexture = true;

class WebGLCubeRenderTarget extends WebGLRenderTarget {

	constructor( size, options, dummy ) {

		if ( Number.isInteger( options ) ) {

			console.warn( 'THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )' );

			options = dummy;

		}

		super( size, size, options );

		options = options || {};

		this.texture = new CubeTexture( undefined, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding );

		this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
		this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;

		this.texture._needsFlipEnvMap = false;

	}

	fromEquirectangularTexture( renderer, texture ) {

		this.texture.type = texture.type;
		this.texture.format = RGBAFormat; // see #18859
		this.texture.encoding = texture.encoding;

		this.texture.generateMipmaps = texture.generateMipmaps;
		this.texture.minFilter = texture.minFilter;
		this.texture.magFilter = texture.magFilter;

		const shader = {

			uniforms: {
				tEquirect: { value: null },
			},

			vertexShader: /* glsl */`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,

			fragmentShader: /* glsl */`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
		};

		const geometry = new BoxGeometry( 5, 5, 5 );

		const material = new ShaderMaterial( {

			name: 'CubemapFromEquirect',

			uniforms: cloneUniforms( shader.uniforms ),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			side: BackSide,
			blending: NoBlending

		} );

		material.uniforms.tEquirect.value = texture;

		const mesh = new Mesh( geometry, material );

		const currentMinFilter = texture.minFilter;

		// Avoid blurred poles
		if ( texture.minFilter === LinearMipmapLinearFilter ) texture.minFilter = LinearFilter;

		const camera = new CubeCamera( 1, 10, this );
		camera.update( renderer, mesh );

		texture.minFilter = currentMinFilter;

		mesh.geometry.dispose();
		mesh.material.dispose();

		return this;

	}

	clear( renderer, color, depth, stencil ) {

		const currentRenderTarget = renderer.getRenderTarget();

		for ( let i = 0; i < 6; i ++ ) {

			renderer.setRenderTarget( this, i );

			renderer.clear( color, depth, stencil );

		}

		renderer.setRenderTarget( currentRenderTarget );

	}

}

WebGLCubeRenderTarget.prototype.isWebGLCubeRenderTarget = true;

class DataTexture extends Texture {

	constructor( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

		super( null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.image = { data: data || null, width: width || 1, height: height || 1 };

		this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
		this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;

		this.generateMipmaps = false;
		this.flipY = false;
		this.unpackAlignment = 1;

		this.needsUpdate = true;

	}

}

DataTexture.prototype.isDataTexture = true;

const _sphere$1 = /*@__PURE__*/ new Sphere();
const _vector$5 = /*@__PURE__*/ new Vector3();

class Frustum {

	constructor( p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane() ) {

		this.planes = [ p0, p1, p2, p3, p4, p5 ];

	}

	set( p0, p1, p2, p3, p4, p5 ) {

		const planes = this.planes;

		planes[ 0 ].copy( p0 );
		planes[ 1 ].copy( p1 );
		planes[ 2 ].copy( p2 );
		planes[ 3 ].copy( p3 );
		planes[ 4 ].copy( p4 );
		planes[ 5 ].copy( p5 );

		return this;

	}

	copy( frustum ) {

		const planes = this.planes;

		for ( let i = 0; i < 6; i ++ ) {

			planes[ i ].copy( frustum.planes[ i ] );

		}

		return this;

	}

	setFromProjectionMatrix( m ) {

		const planes = this.planes;
		const me = m.elements;
		const me0 = me[ 0 ], me1 = me[ 1 ], me2 = me[ 2 ], me3 = me[ 3 ];
		const me4 = me[ 4 ], me5 = me[ 5 ], me6 = me[ 6 ], me7 = me[ 7 ];
		const me8 = me[ 8 ], me9 = me[ 9 ], me10 = me[ 10 ], me11 = me[ 11 ];
		const me12 = me[ 12 ], me13 = me[ 13 ], me14 = me[ 14 ], me15 = me[ 15 ];

		planes[ 0 ].setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 ).normalize();
		planes[ 1 ].setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 ).normalize();
		planes[ 2 ].setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 ).normalize();
		planes[ 3 ].setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 ).normalize();
		planes[ 4 ].setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 ).normalize();
		planes[ 5 ].setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 ).normalize();

		return this;

	}

	intersectsObject( object ) {

		const geometry = object.geometry;

		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		_sphere$1.copy( geometry.boundingSphere ).applyMatrix4( object.matrixWorld );

		return this.intersectsSphere( _sphere$1 );

	}

	intersectsSprite( sprite ) {

		_sphere$1.center.set( 0, 0, 0 );
		_sphere$1.radius = 0.7071067811865476;
		_sphere$1.applyMatrix4( sprite.matrixWorld );

		return this.intersectsSphere( _sphere$1 );

	}

	intersectsSphere( sphere ) {

		const planes = this.planes;
		const center = sphere.center;
		const negRadius = - sphere.radius;

		for ( let i = 0; i < 6; i ++ ) {

			const distance = planes[ i ].distanceToPoint( center );

			if ( distance < negRadius ) {

				return false;

			}

		}

		return true;

	}

	intersectsBox( box ) {

		const planes = this.planes;

		for ( let i = 0; i < 6; i ++ ) {

			const plane = planes[ i ];

			// corner at max distance

			_vector$5.x = plane.normal.x > 0 ? box.max.x : box.min.x;
			_vector$5.y = plane.normal.y > 0 ? box.max.y : box.min.y;
			_vector$5.z = plane.normal.z > 0 ? box.max.z : box.min.z;

			if ( plane.distanceToPoint( _vector$5 ) < 0 ) {

				return false;

			}

		}

		return true;

	}

	containsPoint( point ) {

		const planes = this.planes;

		for ( let i = 0; i < 6; i ++ ) {

			if ( planes[ i ].distanceToPoint( point ) < 0 ) {

				return false;

			}

		}

		return true;

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

function WebGLAnimation() {

	let context = null;
	let isAnimating = false;
	let animationLoop = null;
	let requestId = null;

	function onAnimationFrame( time, frame ) {

		animationLoop( time, frame );

		requestId = context.requestAnimationFrame( onAnimationFrame );

	}

	return {

		start: function () {

			if ( isAnimating === true ) return;
			if ( animationLoop === null ) return;

			requestId = context.requestAnimationFrame( onAnimationFrame );

			isAnimating = true;

		},

		stop: function () {

			context.cancelAnimationFrame( requestId );

			isAnimating = false;

		},

		setAnimationLoop: function ( callback ) {

			animationLoop = callback;

		},

		setContext: function ( value ) {

			context = value;

		}

	};

}

function WebGLAttributes( gl, capabilities ) {

	const isWebGL2 = capabilities.isWebGL2;

	const buffers = new WeakMap();

	function createBuffer( attribute, bufferType ) {

		const array = attribute.array;
		const usage = attribute.usage;

		const buffer = gl.createBuffer();

		gl.bindBuffer( bufferType, buffer );
		gl.bufferData( bufferType, array, usage );

		attribute.onUploadCallback();

		let type = 5126;

		if ( array instanceof Float32Array ) {

			type = 5126;

		} else if ( array instanceof Float64Array ) {

			console.warn( 'THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.' );

		} else if ( array instanceof Uint16Array ) {

			if ( attribute.isFloat16BufferAttribute ) {

				if ( isWebGL2 ) {

					type = 5131;

				} else {

					console.warn( 'THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.' );

				}

			} else {

				type = 5123;

			}

		} else if ( array instanceof Int16Array ) {

			type = 5122;

		} else if ( array instanceof Uint32Array ) {

			type = 5125;

		} else if ( array instanceof Int32Array ) {

			type = 5124;

		} else if ( array instanceof Int8Array ) {

			type = 5120;

		} else if ( array instanceof Uint8Array ) {

			type = 5121;

		}

		return {
			buffer: buffer,
			type: type,
			bytesPerElement: array.BYTES_PER_ELEMENT,
			version: attribute.version
		};

	}

	function updateBuffer( buffer, attribute, bufferType ) {

		const array = attribute.array;
		const updateRange = attribute.updateRange;

		gl.bindBuffer( bufferType, buffer );

		if ( updateRange.count === - 1 ) {

			// Not using update ranges

			gl.bufferSubData( bufferType, 0, array );

		} else {

			if ( isWebGL2 ) {

				gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
					array, updateRange.offset, updateRange.count );

			} else {

				gl.bufferSubData( bufferType, updateRange.offset * array.BYTES_PER_ELEMENT,
					array.subarray( updateRange.offset, updateRange.offset + updateRange.count ) );

			}

			updateRange.count = - 1; // reset range

		}

	}

	//

	function get( attribute ) {

		if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

		return buffers.get( attribute );

	}

	function remove( attribute ) {

		if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

		const data = buffers.get( attribute );

		if ( data ) {

			gl.deleteBuffer( data.buffer );

			buffers.delete( attribute );

		}

	}

	function update( attribute, bufferType ) {

		if ( attribute.isGLBufferAttribute ) {

			const cached = buffers.get( attribute );

			if ( ! cached || cached.version < attribute.version ) {

				buffers.set( attribute, {
					buffer: attribute.buffer,
					type: attribute.type,
					bytesPerElement: attribute.elementSize,
					version: attribute.version
				} );

			}

			return;

		}

		if ( attribute.isInterleavedBufferAttribute ) attribute = attribute.data;

		const data = buffers.get( attribute );

		if ( data === undefined ) {

			buffers.set( attribute, createBuffer( attribute, bufferType ) );

		} else if ( data.version < attribute.version ) {

			updateBuffer( data.buffer, attribute, bufferType );

			data.version = attribute.version;

		}

	}

	return {

		get: get,
		remove: remove,
		update: update

	};

}

class PlaneGeometry extends BufferGeometry {

	constructor( width = 1, height = 1, widthSegments = 1, heightSegments = 1 ) {

		super();
		this.type = 'PlaneGeometry';

		this.parameters = {
			width: width,
			height: height,
			widthSegments: widthSegments,
			heightSegments: heightSegments
		};

		const width_half = width / 2;
		const height_half = height / 2;

		const gridX = Math.floor( widthSegments );
		const gridY = Math.floor( heightSegments );

		const gridX1 = gridX + 1;
		const gridY1 = gridY + 1;

		const segment_width = width / gridX;
		const segment_height = height / gridY;

		//

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		for ( let iy = 0; iy < gridY1; iy ++ ) {

			const y = iy * segment_height - height_half;

			for ( let ix = 0; ix < gridX1; ix ++ ) {

				const x = ix * segment_width - width_half;

				vertices.push( x, - y, 0 );

				normals.push( 0, 0, 1 );

				uvs.push( ix / gridX );
				uvs.push( 1 - ( iy / gridY ) );

			}

		}

		for ( let iy = 0; iy < gridY; iy ++ ) {

			for ( let ix = 0; ix < gridX; ix ++ ) {

				const a = ix + gridX1 * iy;
				const b = ix + gridX1 * ( iy + 1 );
				const c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				const d = ( ix + 1 ) + gridX1 * iy;

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		this.setIndex( indices );
		this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

}

var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif";

var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";

var alphatest_fragment = "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif";

var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif";

var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";

var begin_vertex = "vec3 transformed = vec3( position );";

var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif";

var bsdfs = "vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif";

var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif";

var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif";

var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";

var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif";

var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif";

var color_fragment = "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif";

var color_pars_fragment = "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif";

var color_pars_vertex = "#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif";

var color_vertex = "#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor.xyz *= color.xyz;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif";

var common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}";

var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif";

var defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif";

var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif";

var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif";

var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif";

var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif";

var encodings_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";

var encodings_pars_fragment = "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}";

var envmap_fragment = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifndef ENVMAP_TYPE_CUBE_UV\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif";

var envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif";

var envmap_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif";

var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif";

var envmap_vertex = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif";

var fog_vertex = "#ifdef USE_FOG\n\tfogDepth = - mvPosition.z;\n#endif";

var fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif";

var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";

var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif";

var gradientmap_pars_fragment = "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}";

var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\treflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n#endif";

var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";

var lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif";

var lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif";

var envmap_physical_pars_fragment = "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif";

var lights_toon_fragment = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;";

var lights_toon_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)";

var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";

var lights_phong_pars_fragment = "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)";

var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;\nmaterial.specularRoughness = min( material.specularRoughness, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif";

var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat specularRoughness;\n\tvec3 specularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";

var lights_fragment_begin = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif";

var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif";

var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif";

var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";

var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif";

var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif";

var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif";

var map_fragment = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif";

var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif";

var map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";

var map_particle_pars_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";

var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif";

var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";

var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif";

var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\t\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\t\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif";

var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif";

var normal_fragment_begin = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;";

var normal_fragment_maps = "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif";

var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif";

var clearcoat_normal_fragment_begin = "#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif";

var clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\t#endif\n#endif";

var clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif";

var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}";

var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif";

var project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";

var dithering_fragment = "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";

var dithering_pars_fragment = "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif";

var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif";

var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";

var shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif";

var shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif";

var shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif";

var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}";

var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";

var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif";

var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";

var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif";

var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";

var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";

var tonemapping_fragment = "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";

var tonemapping_pars_fragment = "#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";

var transmissionmap_fragment = "#ifdef USE_TRANSMISSIONMAP\n\ttotalTransmission *= texture2D( transmissionMap, vUv ).r;\n#endif";

var transmissionmap_pars_fragment = "#ifdef USE_TRANSMISSIONMAP\n\tuniform sampler2D transmissionMap;\n#endif";

var uv_pars_fragment = "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif";

var uv_pars_vertex = "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif";

var uv_vertex = "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif";

var uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";

var uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif";

var uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif";

var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif";

var background_frag = "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

var background_vert = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}";

var cube_frag = "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

var cube_vert = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";

var depth_frag = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}";

var depth_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}";

var distanceRGBA_frag = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}";

var distanceRGBA_vert = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}";

var equirect_frag = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";

var equirect_vert = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}";

var linedashed_frag = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";

var linedashed_vert = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";

var meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

var meshbasic_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}";

var meshlambert_frag = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

var meshlambert_vert = "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

var meshmatcap_frag = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

var meshmatcap_vert = "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}";

var meshtoon_frag = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

var meshtoon_vert = "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

var meshphong_frag = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

var meshphong_vert = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

var meshphysical_frag = "#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\n\tuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#ifdef TRANSMISSION\n\t\tfloat totalTransmission = transmission;\n\t#endif\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <transmissionmap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSMISSION\n\t\tdiffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

var meshphysical_vert = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

var normal_frag = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}";

var normal_vert = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}";

var points_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";

var points_vert = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}";

var shadow_frag = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

var shadow_vert = "#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

var sprite_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";

var sprite_vert = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";

const ShaderChunk = {
	alphamap_fragment: alphamap_fragment,
	alphamap_pars_fragment: alphamap_pars_fragment,
	alphatest_fragment: alphatest_fragment,
	aomap_fragment: aomap_fragment,
	aomap_pars_fragment: aomap_pars_fragment,
	begin_vertex: begin_vertex,
	beginnormal_vertex: beginnormal_vertex,
	bsdfs: bsdfs,
	bumpmap_pars_fragment: bumpmap_pars_fragment,
	clipping_planes_fragment: clipping_planes_fragment,
	clipping_planes_pars_fragment: clipping_planes_pars_fragment,
	clipping_planes_pars_vertex: clipping_planes_pars_vertex,
	clipping_planes_vertex: clipping_planes_vertex,
	color_fragment: color_fragment,
	color_pars_fragment: color_pars_fragment,
	color_pars_vertex: color_pars_vertex,
	color_vertex: color_vertex,
	common: common,
	cube_uv_reflection_fragment: cube_uv_reflection_fragment,
	defaultnormal_vertex: defaultnormal_vertex,
	displacementmap_pars_vertex: displacementmap_pars_vertex,
	displacementmap_vertex: displacementmap_vertex,
	emissivemap_fragment: emissivemap_fragment,
	emissivemap_pars_fragment: emissivemap_pars_fragment,
	encodings_fragment: encodings_fragment,
	encodings_pars_fragment: encodings_pars_fragment,
	envmap_fragment: envmap_fragment,
	envmap_common_pars_fragment: envmap_common_pars_fragment,
	envmap_pars_fragment: envmap_pars_fragment,
	envmap_pars_vertex: envmap_pars_vertex,
	envmap_physical_pars_fragment: envmap_physical_pars_fragment,
	envmap_vertex: envmap_vertex,
	fog_vertex: fog_vertex,
	fog_pars_vertex: fog_pars_vertex,
	fog_fragment: fog_fragment,
	fog_pars_fragment: fog_pars_fragment,
	gradientmap_pars_fragment: gradientmap_pars_fragment,
	lightmap_fragment: lightmap_fragment,
	lightmap_pars_fragment: lightmap_pars_fragment,
	lights_lambert_vertex: lights_lambert_vertex,
	lights_pars_begin: lights_pars_begin,
	lights_toon_fragment: lights_toon_fragment,
	lights_toon_pars_fragment: lights_toon_pars_fragment,
	lights_phong_fragment: lights_phong_fragment,
	lights_phong_pars_fragment: lights_phong_pars_fragment,
	lights_physical_fragment: lights_physical_fragment,
	lights_physical_pars_fragment: lights_physical_pars_fragment,
	lights_fragment_begin: lights_fragment_begin,
	lights_fragment_maps: lights_fragment_maps,
	lights_fragment_end: lights_fragment_end,
	logdepthbuf_fragment: logdepthbuf_fragment,
	logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
	logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
	logdepthbuf_vertex: logdepthbuf_vertex,
	map_fragment: map_fragment,
	map_pars_fragment: map_pars_fragment,
	map_particle_fragment: map_particle_fragment,
	map_particle_pars_fragment: map_particle_pars_fragment,
	metalnessmap_fragment: metalnessmap_fragment,
	metalnessmap_pars_fragment: metalnessmap_pars_fragment,
	morphnormal_vertex: morphnormal_vertex,
	morphtarget_pars_vertex: morphtarget_pars_vertex,
	morphtarget_vertex: morphtarget_vertex,
	normal_fragment_begin: normal_fragment_begin,
	normal_fragment_maps: normal_fragment_maps,
	normalmap_pars_fragment: normalmap_pars_fragment,
	clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin,
	clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps,
	clearcoat_pars_fragment: clearcoat_pars_fragment,
	packing: packing,
	premultiplied_alpha_fragment: premultiplied_alpha_fragment,
	project_vertex: project_vertex,
	dithering_fragment: dithering_fragment,
	dithering_pars_fragment: dithering_pars_fragment,
	roughnessmap_fragment: roughnessmap_fragment,
	roughnessmap_pars_fragment: roughnessmap_pars_fragment,
	shadowmap_pars_fragment: shadowmap_pars_fragment,
	shadowmap_pars_vertex: shadowmap_pars_vertex,
	shadowmap_vertex: shadowmap_vertex,
	shadowmask_pars_fragment: shadowmask_pars_fragment,
	skinbase_vertex: skinbase_vertex,
	skinning_pars_vertex: skinning_pars_vertex,
	skinning_vertex: skinning_vertex,
	skinnormal_vertex: skinnormal_vertex,
	specularmap_fragment: specularmap_fragment,
	specularmap_pars_fragment: specularmap_pars_fragment,
	tonemapping_fragment: tonemapping_fragment,
	tonemapping_pars_fragment: tonemapping_pars_fragment,
	transmissionmap_fragment: transmissionmap_fragment,
	transmissionmap_pars_fragment: transmissionmap_pars_fragment,
	uv_pars_fragment: uv_pars_fragment,
	uv_pars_vertex: uv_pars_vertex,
	uv_vertex: uv_vertex,
	uv2_pars_fragment: uv2_pars_fragment,
	uv2_pars_vertex: uv2_pars_vertex,
	uv2_vertex: uv2_vertex,
	worldpos_vertex: worldpos_vertex,

	background_frag: background_frag,
	background_vert: background_vert,
	cube_frag: cube_frag,
	cube_vert: cube_vert,
	depth_frag: depth_frag,
	depth_vert: depth_vert,
	distanceRGBA_frag: distanceRGBA_frag,
	distanceRGBA_vert: distanceRGBA_vert,
	equirect_frag: equirect_frag,
	equirect_vert: equirect_vert,
	linedashed_frag: linedashed_frag,
	linedashed_vert: linedashed_vert,
	meshbasic_frag: meshbasic_frag,
	meshbasic_vert: meshbasic_vert,
	meshlambert_frag: meshlambert_frag,
	meshlambert_vert: meshlambert_vert,
	meshmatcap_frag: meshmatcap_frag,
	meshmatcap_vert: meshmatcap_vert,
	meshtoon_frag: meshtoon_frag,
	meshtoon_vert: meshtoon_vert,
	meshphong_frag: meshphong_frag,
	meshphong_vert: meshphong_vert,
	meshphysical_frag: meshphysical_frag,
	meshphysical_vert: meshphysical_vert,
	normal_frag: normal_frag,
	normal_vert: normal_vert,
	points_frag: points_frag,
	points_vert: points_vert,
	shadow_frag: shadow_frag,
	shadow_vert: shadow_vert,
	sprite_frag: sprite_frag,
	sprite_vert: sprite_vert
};

/**
 * Uniforms library for shared webgl shaders
 */

const UniformsLib = {

	common: {

		diffuse: { value: new Color( 0xeeeeee ) },
		opacity: { value: 1.0 },

		map: { value: null },
		uvTransform: { value: new Matrix3() },
		uv2Transform: { value: new Matrix3() },

		alphaMap: { value: null },

	},

	specularmap: {

		specularMap: { value: null },

	},

	envmap: {

		envMap: { value: null },
		flipEnvMap: { value: - 1 },
		reflectivity: { value: 1.0 },
		refractionRatio: { value: 0.98 },
		maxMipLevel: { value: 0 }

	},

	aomap: {

		aoMap: { value: null },
		aoMapIntensity: { value: 1 }

	},

	lightmap: {

		lightMap: { value: null },
		lightMapIntensity: { value: 1 }

	},

	emissivemap: {

		emissiveMap: { value: null }

	},

	bumpmap: {

		bumpMap: { value: null },
		bumpScale: { value: 1 }

	},

	normalmap: {

		normalMap: { value: null },
		normalScale: { value: new Vector2( 1, 1 ) }

	},

	displacementmap: {

		displacementMap: { value: null },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }

	},

	roughnessmap: {

		roughnessMap: { value: null }

	},

	metalnessmap: {

		metalnessMap: { value: null }

	},

	gradientmap: {

		gradientMap: { value: null }

	},

	fog: {

		fogDensity: { value: 0.00025 },
		fogNear: { value: 1 },
		fogFar: { value: 2000 },
		fogColor: { value: new Color( 0xffffff ) }

	},

	lights: {

		ambientLightColor: { value: [] },

		lightProbe: { value: [] },

		directionalLights: { value: [], properties: {
			direction: {},
			color: {}
		} },

		directionalLightShadows: { value: [], properties: {
			shadowBias: {},
			shadowNormalBias: {},
			shadowRadius: {},
			shadowMapSize: {}
		} },

		directionalShadowMap: { value: [] },
		directionalShadowMatrix: { value: [] },

		spotLights: { value: [], properties: {
			color: {},
			position: {},
			direction: {},
			distance: {},
			coneCos: {},
			penumbraCos: {},
			decay: {}
		} },

		spotLightShadows: { value: [], properties: {
			shadowBias: {},
			shadowNormalBias: {},
			shadowRadius: {},
			shadowMapSize: {}
		} },

		spotShadowMap: { value: [] },
		spotShadowMatrix: { value: [] },

		pointLights: { value: [], properties: {
			color: {},
			position: {},
			decay: {},
			distance: {}
		} },

		pointLightShadows: { value: [], properties: {
			shadowBias: {},
			shadowNormalBias: {},
			shadowRadius: {},
			shadowMapSize: {},
			shadowCameraNear: {},
			shadowCameraFar: {}
		} },

		pointShadowMap: { value: [] },
		pointShadowMatrix: { value: [] },

		hemisphereLights: { value: [], properties: {
			direction: {},
			skyColor: {},
			groundColor: {}
		} },

		// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
		rectAreaLights: { value: [], properties: {
			color: {},
			position: {},
			width: {},
			height: {}
		} },

		ltc_1: { value: null },
		ltc_2: { value: null }

	},

	points: {

		diffuse: { value: new Color( 0xeeeeee ) },
		opacity: { value: 1.0 },
		size: { value: 1.0 },
		scale: { value: 1.0 },
		map: { value: null },
		alphaMap: { value: null },
		uvTransform: { value: new Matrix3() }

	},

	sprite: {

		diffuse: { value: new Color( 0xeeeeee ) },
		opacity: { value: 1.0 },
		center: { value: new Vector2( 0.5, 0.5 ) },
		rotation: { value: 0.0 },
		map: { value: null },
		alphaMap: { value: null },
		uvTransform: { value: new Matrix3() }

	}

};

const ShaderLib = {

	basic: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.fog
		] ),

		vertexShader: ShaderChunk.meshbasic_vert,
		fragmentShader: ShaderChunk.meshbasic_frag

	},

	lambert: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new Color( 0x000000 ) }
			}
		] ),

		vertexShader: ShaderChunk.meshlambert_vert,
		fragmentShader: ShaderChunk.meshlambert_frag

	},

	phong: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new Color( 0x000000 ) },
				specular: { value: new Color( 0x111111 ) },
				shininess: { value: 30 }
			}
		] ),

		vertexShader: ShaderChunk.meshphong_vert,
		fragmentShader: ShaderChunk.meshphong_frag

	},

	standard: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.roughnessmap,
			UniformsLib.metalnessmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new Color( 0x000000 ) },
				roughness: { value: 1.0 },
				metalness: { value: 0.0 },
				envMapIntensity: { value: 1 } // temporary
			}
		] ),

		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag

	},

	toon: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.gradientmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new Color( 0x000000 ) }
			}
		] ),

		vertexShader: ShaderChunk.meshtoon_vert,
		fragmentShader: ShaderChunk.meshtoon_frag

	},

	matcap: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.fog,
			{
				matcap: { value: null }
			}
		] ),

		vertexShader: ShaderChunk.meshmatcap_vert,
		fragmentShader: ShaderChunk.meshmatcap_frag

	},

	points: {

		uniforms: mergeUniforms( [
			UniformsLib.points,
			UniformsLib.fog
		] ),

		vertexShader: ShaderChunk.points_vert,
		fragmentShader: ShaderChunk.points_frag

	},

	dashed: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		] ),

		vertexShader: ShaderChunk.linedashed_vert,
		fragmentShader: ShaderChunk.linedashed_frag

	},

	depth: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.displacementmap
		] ),

		vertexShader: ShaderChunk.depth_vert,
		fragmentShader: ShaderChunk.depth_frag

	},

	normal: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			{
				opacity: { value: 1.0 }
			}
		] ),

		vertexShader: ShaderChunk.normal_vert,
		fragmentShader: ShaderChunk.normal_frag

	},

	sprite: {

		uniforms: mergeUniforms( [
			UniformsLib.sprite,
			UniformsLib.fog
		] ),

		vertexShader: ShaderChunk.sprite_vert,
		fragmentShader: ShaderChunk.sprite_frag

	},

	background: {

		uniforms: {
			uvTransform: { value: new Matrix3() },
			t2D: { value: null },
		},

		vertexShader: ShaderChunk.background_vert,
		fragmentShader: ShaderChunk.background_frag

	},
	/* -------------------------------------------------------------------------
	//	Cube map shader
	 ------------------------------------------------------------------------- */

	cube: {

		uniforms: mergeUniforms( [
			UniformsLib.envmap,
			{
				opacity: { value: 1.0 }
			}
		] ),

		vertexShader: ShaderChunk.cube_vert,
		fragmentShader: ShaderChunk.cube_frag

	},

	equirect: {

		uniforms: {
			tEquirect: { value: null },
		},

		vertexShader: ShaderChunk.equirect_vert,
		fragmentShader: ShaderChunk.equirect_frag

	},

	distanceRGBA: {

		uniforms: mergeUniforms( [
			UniformsLib.common,
			UniformsLib.displacementmap,
			{
				referencePosition: { value: new Vector3() },
				nearDistance: { value: 1 },
				farDistance: { value: 1000 }
			}
		] ),

		vertexShader: ShaderChunk.distanceRGBA_vert,
		fragmentShader: ShaderChunk.distanceRGBA_frag

	},

	shadow: {

		uniforms: mergeUniforms( [
			UniformsLib.lights,
			UniformsLib.fog,
			{
				color: { value: new Color( 0x00000 ) },
				opacity: { value: 1.0 }
			},
		] ),

		vertexShader: ShaderChunk.shadow_vert,
		fragmentShader: ShaderChunk.shadow_frag

	}

};

ShaderLib.physical = {

	uniforms: mergeUniforms( [
		ShaderLib.standard.uniforms,
		{
			clearcoat: { value: 0 },
			clearcoatMap: { value: null },
			clearcoatRoughness: { value: 0 },
			clearcoatRoughnessMap: { value: null },
			clearcoatNormalScale: { value: new Vector2( 1, 1 ) },
			clearcoatNormalMap: { value: null },
			sheen: { value: new Color( 0x000000 ) },
			transmission: { value: 0 },
			transmissionMap: { value: null },
		}
	] ),

	vertexShader: ShaderChunk.meshphysical_vert,
	fragmentShader: ShaderChunk.meshphysical_frag

};

function WebGLBackground( renderer, cubemaps, state, objects, premultipliedAlpha ) {

	const clearColor = new Color( 0x000000 );
	let clearAlpha = 0;

	let planeMesh;
	let boxMesh;

	let currentBackground = null;
	let currentBackgroundVersion = 0;
	let currentTonemapping = null;

	function render( renderList, scene, camera, forceClear ) {

		let background = scene.isScene === true ? scene.background : null;

		if ( background && background.isTexture ) {

			background = cubemaps.get( background );

		}

		// Ignore background in AR
		// TODO: Reconsider this.

		const xr = renderer.xr;
		const session = xr.getSession && xr.getSession();

		if ( session && session.environmentBlendMode === 'additive' ) {

			background = null;

		}

		if ( background === null ) {

			setClear( clearColor, clearAlpha );

		} else if ( background && background.isColor ) {

			setClear( background, 1 );
			forceClear = true;

		}

		if ( renderer.autoClear || forceClear ) {

			renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );

		}

		if ( background && ( background.isCubeTexture || background.isWebGLCubeRenderTarget || background.mapping === CubeUVReflectionMapping ) ) {

			if ( boxMesh === undefined ) {

				boxMesh = new Mesh(
					new BoxGeometry( 1, 1, 1 ),
					new ShaderMaterial( {
						name: 'BackgroundCubeMaterial',
						uniforms: cloneUniforms( ShaderLib.cube.uniforms ),
						vertexShader: ShaderLib.cube.vertexShader,
						fragmentShader: ShaderLib.cube.fragmentShader,
						side: BackSide,
						depthTest: false,
						depthWrite: false,
						fog: false
					} )
				);

				boxMesh.geometry.deleteAttribute( 'normal' );
				boxMesh.geometry.deleteAttribute( 'uv' );

				boxMesh.onBeforeRender = function ( renderer, scene, camera ) {

					this.matrixWorld.copyPosition( camera.matrixWorld );

				};

				// enable code injection for non-built-in material
				Object.defineProperty( boxMesh.material, 'envMap', {

					get: function () {

						return this.uniforms.envMap.value;

					}

				} );

				objects.update( boxMesh );

			}

			if ( background.isWebGLCubeRenderTarget ) {

				// TODO Deprecate

				background = background.texture;

			}

			boxMesh.material.uniforms.envMap.value = background;
			boxMesh.material.uniforms.flipEnvMap.value = ( background.isCubeTexture && background._needsFlipEnvMap ) ? - 1 : 1;

			if ( currentBackground !== background ||
				currentBackgroundVersion !== background.version ||
				currentTonemapping !== renderer.toneMapping ) {

				boxMesh.material.needsUpdate = true;

				currentBackground = background;
				currentBackgroundVersion = background.version;
				currentTonemapping = renderer.toneMapping;

			}

			// push to the pre-sorted opaque render list
			renderList.unshift( boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null );

		} else if ( background && background.isTexture ) {

			if ( planeMesh === undefined ) {

				planeMesh = new Mesh(
					new PlaneGeometry( 2, 2 ),
					new ShaderMaterial( {
						name: 'BackgroundMaterial',
						uniforms: cloneUniforms( ShaderLib.background.uniforms ),
						vertexShader: ShaderLib.background.vertexShader,
						fragmentShader: ShaderLib.background.fragmentShader,
						side: FrontSide,
						depthTest: false,
						depthWrite: false,
						fog: false
					} )
				);

				planeMesh.geometry.deleteAttribute( 'normal' );

				// enable code injection for non-built-in material
				Object.defineProperty( planeMesh.material, 'map', {

					get: function () {

						return this.uniforms.t2D.value;

					}

				} );

				objects.update( planeMesh );

			}

			planeMesh.material.uniforms.t2D.value = background;

			if ( background.matrixAutoUpdate === true ) {

				background.updateMatrix();

			}

			planeMesh.material.uniforms.uvTransform.value.copy( background.matrix );

			if ( currentBackground !== background ||
				currentBackgroundVersion !== background.version ||
				currentTonemapping !== renderer.toneMapping ) {

				planeMesh.material.needsUpdate = true;

				currentBackground = background;
				currentBackgroundVersion = background.version;
				currentTonemapping = renderer.toneMapping;

			}


			// push to the pre-sorted opaque render list
			renderList.unshift( planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null );

		}

	}

	function setClear( color, alpha ) {

		state.buffers.color.setClear( color.r, color.g, color.b, alpha, premultipliedAlpha );

	}

	return {

		getClearColor: function () {

			return clearColor;

		},
		setClearColor: function ( color, alpha = 1 ) {

			clearColor.set( color );
			clearAlpha = alpha;
			setClear( clearColor, clearAlpha );

		},
		getClearAlpha: function () {

			return clearAlpha;

		},
		setClearAlpha: function ( alpha ) {

			clearAlpha = alpha;
			setClear( clearColor, clearAlpha );

		},
		render: render

	};

}

function WebGLBindingStates( gl, extensions, attributes, capabilities ) {

	const maxVertexAttributes = gl.getParameter( 34921 );

	const extension = capabilities.isWebGL2 ? null : extensions.get( 'OES_vertex_array_object' );
	const vaoAvailable = capabilities.isWebGL2 || extension !== null;

	const bindingStates = {};

	const defaultState = createBindingState( null );
	let currentState = defaultState;

	function setup( object, material, program, geometry, index ) {

		let updateBuffers = false;

		if ( vaoAvailable ) {

			const state = getBindingState( geometry, program, material );

			if ( currentState !== state ) {

				currentState = state;
				bindVertexArrayObject( currentState.object );

			}

			updateBuffers = needsUpdate( geometry, index );

			if ( updateBuffers ) saveCache( geometry, index );

		} else {

			const wireframe = ( material.wireframe === true );

			if ( currentState.geometry !== geometry.id ||
				currentState.program !== program.id ||
				currentState.wireframe !== wireframe ) {

				currentState.geometry = geometry.id;
				currentState.program = program.id;
				currentState.wireframe = wireframe;

				updateBuffers = true;

			}

		}

		if ( object.isInstancedMesh === true ) {

			updateBuffers = true;

		}

		if ( index !== null ) {

			attributes.update( index, 34963 );

		}

		if ( updateBuffers ) {

			setupVertexAttributes( object, material, program, geometry );

			if ( index !== null ) {

				gl.bindBuffer( 34963, attributes.get( index ).buffer );

			}

		}

	}

	function createVertexArrayObject() {

		if ( capabilities.isWebGL2 ) return gl.createVertexArray();

		return extension.createVertexArrayOES();

	}

	function bindVertexArrayObject( vao ) {

		if ( capabilities.isWebGL2 ) return gl.bindVertexArray( vao );

		return extension.bindVertexArrayOES( vao );

	}

	function deleteVertexArrayObject( vao ) {

		if ( capabilities.isWebGL2 ) return gl.deleteVertexArray( vao );

		return extension.deleteVertexArrayOES( vao );

	}

	function getBindingState( geometry, program, material ) {

		const wireframe = ( material.wireframe === true );

		let programMap = bindingStates[ geometry.id ];

		if ( programMap === undefined ) {

			programMap = {};
			bindingStates[ geometry.id ] = programMap;

		}

		let stateMap = programMap[ program.id ];

		if ( stateMap === undefined ) {

			stateMap = {};
			programMap[ program.id ] = stateMap;

		}

		let state = stateMap[ wireframe ];

		if ( state === undefined ) {

			state = createBindingState( createVertexArrayObject() );
			stateMap[ wireframe ] = state;

		}

		return state;

	}

	function createBindingState( vao ) {

		const newAttributes = [];
		const enabledAttributes = [];
		const attributeDivisors = [];

		for ( let i = 0; i < maxVertexAttributes; i ++ ) {

			newAttributes[ i ] = 0;
			enabledAttributes[ i ] = 0;
			attributeDivisors[ i ] = 0;

		}

		return {

			// for backward compatibility on non-VAO support browser
			geometry: null,
			program: null,
			wireframe: false,

			newAttributes: newAttributes,
			enabledAttributes: enabledAttributes,
			attributeDivisors: attributeDivisors,
			object: vao,
			attributes: {},
			index: null

		};

	}

	function needsUpdate( geometry, index ) {

		const cachedAttributes = currentState.attributes;
		const geometryAttributes = geometry.attributes;

		let attributesNum = 0;

		for ( const key in geometryAttributes ) {

			const cachedAttribute = cachedAttributes[ key ];
			const geometryAttribute = geometryAttributes[ key ];

			if ( cachedAttribute === undefined ) return true;

			if ( cachedAttribute.attribute !== geometryAttribute ) return true;

			if ( cachedAttribute.data !== geometryAttribute.data ) return true;

			attributesNum ++;

		}

		if ( currentState.attributesNum !== attributesNum ) return true;

		if ( currentState.index !== index ) return true;

		return false;

	}

	function saveCache( geometry, index ) {

		const cache = {};
		const attributes = geometry.attributes;
		let attributesNum = 0;

		for ( const key in attributes ) {

			const attribute = attributes[ key ];

			const data = {};
			data.attribute = attribute;

			if ( attribute.data ) {

				data.data = attribute.data;

			}

			cache[ key ] = data;

			attributesNum ++;

		}

		currentState.attributes = cache;
		currentState.attributesNum = attributesNum;

		currentState.index = index;

	}

	function initAttributes() {

		const newAttributes = currentState.newAttributes;

		for ( let i = 0, il = newAttributes.length; i < il; i ++ ) {

			newAttributes[ i ] = 0;

		}

	}

	function enableAttribute( attribute ) {

		enableAttributeAndDivisor( attribute, 0 );

	}

	function enableAttributeAndDivisor( attribute, meshPerAttribute ) {

		const newAttributes = currentState.newAttributes;
		const enabledAttributes = currentState.enabledAttributes;
		const attributeDivisors = currentState.attributeDivisors;

		newAttributes[ attribute ] = 1;

		if ( enabledAttributes[ attribute ] === 0 ) {

			gl.enableVertexAttribArray( attribute );
			enabledAttributes[ attribute ] = 1;

		}

		if ( attributeDivisors[ attribute ] !== meshPerAttribute ) {

			const extension = capabilities.isWebGL2 ? gl : extensions.get( 'ANGLE_instanced_arrays' );

			extension[ capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE' ]( attribute, meshPerAttribute );
			attributeDivisors[ attribute ] = meshPerAttribute;

		}

	}

	function disableUnusedAttributes() {

		const newAttributes = currentState.newAttributes;
		const enabledAttributes = currentState.enabledAttributes;

		for ( let i = 0, il = enabledAttributes.length; i < il; i ++ ) {

			if ( enabledAttributes[ i ] !== newAttributes[ i ] ) {

				gl.disableVertexAttribArray( i );
				enabledAttributes[ i ] = 0;

			}

		}

	}

	function vertexAttribPointer( index, size, type, normalized, stride, offset ) {

		if ( capabilities.isWebGL2 === true && ( type === 5124 || type === 5125 ) ) {

			gl.vertexAttribIPointer( index, size, type, stride, offset );

		} else {

			gl.vertexAttribPointer( index, size, type, normalized, stride, offset );

		}

	}

	function setupVertexAttributes( object, material, program, geometry ) {

		if ( capabilities.isWebGL2 === false && ( object.isInstancedMesh || geometry.isInstancedBufferGeometry ) ) {

			if ( extensions.get( 'ANGLE_instanced_arrays' ) === null ) return;

		}

		initAttributes();

		const geometryAttributes = geometry.attributes;

		const programAttributes = program.getAttributes();

		const materialDefaultAttributeValues = material.defaultAttributeValues;

		for ( const name in programAttributes ) {

			const programAttribute = programAttributes[ name ];

			if ( programAttribute >= 0 ) {

				const geometryAttribute = geometryAttributes[ name ];

				if ( geometryAttribute !== undefined ) {

					const normalized = geometryAttribute.normalized;
					const size = geometryAttribute.itemSize;

					const attribute = attributes.get( geometryAttribute );

					// TODO Attribute may not be available on context restore

					if ( attribute === undefined ) continue;

					const buffer = attribute.buffer;
					const type = attribute.type;
					const bytesPerElement = attribute.bytesPerElement;

					if ( geometryAttribute.isInterleavedBufferAttribute ) {

						const data = geometryAttribute.data;
						const stride = data.stride;
						const offset = geometryAttribute.offset;

						if ( data && data.isInstancedInterleavedBuffer ) {

							enableAttributeAndDivisor( programAttribute, data.meshPerAttribute );

							if ( geometry._maxInstanceCount === undefined ) {

								geometry._maxInstanceCount = data.meshPerAttribute * data.count;

							}

						} else {

							enableAttribute( programAttribute );

						}

						gl.bindBuffer( 34962, buffer );
						vertexAttribPointer( programAttribute, size, type, normalized, stride * bytesPerElement, offset * bytesPerElement );

					} else {

						if ( geometryAttribute.isInstancedBufferAttribute ) {

							enableAttributeAndDivisor( programAttribute, geometryAttribute.meshPerAttribute );

							if ( geometry._maxInstanceCount === undefined ) {

								geometry._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;

							}

						} else {

							enableAttribute( programAttribute );

						}

						gl.bindBuffer( 34962, buffer );
						vertexAttribPointer( programAttribute, size, type, normalized, 0, 0 );

					}

				} else if ( name === 'instanceMatrix' ) {

					const attribute = attributes.get( object.instanceMatrix );

					// TODO Attribute may not be available on context restore

					if ( attribute === undefined ) continue;

					const buffer = attribute.buffer;
					const type = attribute.type;

					enableAttributeAndDivisor( programAttribute + 0, 1 );
					enableAttributeAndDivisor( programAttribute + 1, 1 );
					enableAttributeAndDivisor( programAttribute + 2, 1 );
					enableAttributeAndDivisor( programAttribute + 3, 1 );

					gl.bindBuffer( 34962, buffer );

					gl.vertexAttribPointer( programAttribute + 0, 4, type, false, 64, 0 );
					gl.vertexAttribPointer( programAttribute + 1, 4, type, false, 64, 16 );
					gl.vertexAttribPointer( programAttribute + 2, 4, type, false, 64, 32 );
					gl.vertexAttribPointer( programAttribute + 3, 4, type, false, 64, 48 );

				} else if ( name === 'instanceColor' ) {

					const attribute = attributes.get( object.instanceColor );

					// TODO Attribute may not be available on context restore

					if ( attribute === undefined ) continue;

					const buffer = attribute.buffer;
					const type = attribute.type;

					enableAttributeAndDivisor( programAttribute, 1 );

					gl.bindBuffer( 34962, buffer );

					gl.vertexAttribPointer( programAttribute, 3, type, false, 12, 0 );

				} else if ( materialDefaultAttributeValues !== undefined ) {

					const value = materialDefaultAttributeValues[ name ];

					if ( value !== undefined ) {

						switch ( value.length ) {

							case 2:
								gl.vertexAttrib2fv( programAttribute, value );
								break;

							case 3:
								gl.vertexAttrib3fv( programAttribute, value );
								break;

							case 4:
								gl.vertexAttrib4fv( programAttribute, value );
								break;

							default:
								gl.vertexAttrib1fv( programAttribute, value );

						}

					}

				}

			}

		}

		disableUnusedAttributes();

	}

	function dispose() {

		reset();

		for ( const geometryId in bindingStates ) {

			const programMap = bindingStates[ geometryId ];

			for ( const programId in programMap ) {

				const stateMap = programMap[ programId ];

				for ( const wireframe in stateMap ) {

					deleteVertexArrayObject( stateMap[ wireframe ].object );

					delete stateMap[ wireframe ];

				}

				delete programMap[ programId ];

			}

			delete bindingStates[ geometryId ];

		}

	}

	function releaseStatesOfGeometry( geometry ) {

		if ( bindingStates[ geometry.id ] === undefined ) return;

		const programMap = bindingStates[ geometry.id ];

		for ( const programId in programMap ) {

			const stateMap = programMap[ programId ];

			for ( const wireframe in stateMap ) {

				deleteVertexArrayObject( stateMap[ wireframe ].object );

				delete stateMap[ wireframe ];

			}

			delete programMap[ programId ];

		}

		delete bindingStates[ geometry.id ];

	}

	function releaseStatesOfProgram( program ) {

		for ( const geometryId in bindingStates ) {

			const programMap = bindingStates[ geometryId ];

			if ( programMap[ program.id ] === undefined ) continue;

			const stateMap = programMap[ program.id ];

			for ( const wireframe in stateMap ) {

				deleteVertexArrayObject( stateMap[ wireframe ].object );

				delete stateMap[ wireframe ];

			}

			delete programMap[ program.id ];

		}

	}

	function reset() {

		resetDefaultState();

		if ( currentState === defaultState ) return;

		currentState = defaultState;
		bindVertexArrayObject( currentState.object );

	}

	// for backward-compatilibity

	function resetDefaultState() {

		defaultState.geometry = null;
		defaultState.program = null;
		defaultState.wireframe = false;

	}

	return {

		setup: setup,
		reset: reset,
		resetDefaultState: resetDefaultState,
		dispose: dispose,
		releaseStatesOfGeometry: releaseStatesOfGeometry,
		releaseStatesOfProgram: releaseStatesOfProgram,

		initAttributes: initAttributes,
		enableAttribute: enableAttribute,
		disableUnusedAttributes: disableUnusedAttributes

	};

}

function WebGLBufferRenderer( gl, extensions, info, capabilities ) {

	const isWebGL2 = capabilities.isWebGL2;

	let mode;

	function setMode( value ) {

		mode = value;

	}

	function render( start, count ) {

		gl.drawArrays( mode, start, count );

		info.update( count, mode, 1 );

	}

	function renderInstances( start, count, primcount ) {

		if ( primcount === 0 ) return;

		let extension, methodName;

		if ( isWebGL2 ) {

			extension = gl;
			methodName = 'drawArraysInstanced';

		} else {

			extension = extensions.get( 'ANGLE_instanced_arrays' );
			methodName = 'drawArraysInstancedANGLE';

			if ( extension === null ) {

				console.error( 'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
				return;

			}

		}

		extension[ methodName ]( mode, start, count, primcount );

		info.update( count, mode, primcount );

	}

	//

	this.setMode = setMode;
	this.render = render;
	this.renderInstances = renderInstances;

}

function WebGLCapabilities( gl, extensions, parameters ) {

	let maxAnisotropy;

	function getMaxAnisotropy() {

		if ( maxAnisotropy !== undefined ) return maxAnisotropy;

		if ( extensions.has( 'EXT_texture_filter_anisotropic' ) === true ) {

			const extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			maxAnisotropy = gl.getParameter( extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT );

		} else {

			maxAnisotropy = 0;

		}

		return maxAnisotropy;

	}

	function getMaxPrecision( precision ) {

		if ( precision === 'highp' ) {

			if ( gl.getShaderPrecisionFormat( 35633, 36338 ).precision > 0 &&
				gl.getShaderPrecisionFormat( 35632, 36338 ).precision > 0 ) {

				return 'highp';

			}

			precision = 'mediump';

		}

		if ( precision === 'mediump' ) {

			if ( gl.getShaderPrecisionFormat( 35633, 36337 ).precision > 0 &&
				gl.getShaderPrecisionFormat( 35632, 36337 ).precision > 0 ) {

				return 'mediump';

			}

		}

		return 'lowp';

	}

	/* eslint-disable no-undef */
	const isWebGL2 = ( typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext ) ||
		( typeof WebGL2ComputeRenderingContext !== 'undefined' && gl instanceof WebGL2ComputeRenderingContext );
	/* eslint-enable no-undef */

	let precision = parameters.precision !== undefined ? parameters.precision : 'highp';
	const maxPrecision = getMaxPrecision( precision );

	if ( maxPrecision !== precision ) {

		console.warn( 'THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.' );
		precision = maxPrecision;

	}

	const logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

	const maxTextures = gl.getParameter( 34930 );
	const maxVertexTextures = gl.getParameter( 35660 );
	const maxTextureSize = gl.getParameter( 3379 );
	const maxCubemapSize = gl.getParameter( 34076 );

	const maxAttributes = gl.getParameter( 34921 );
	const maxVertexUniforms = gl.getParameter( 36347 );
	const maxVaryings = gl.getParameter( 36348 );
	const maxFragmentUniforms = gl.getParameter( 36349 );

	const vertexTextures = maxVertexTextures > 0;
	const floatFragmentTextures = isWebGL2 || extensions.has( 'OES_texture_float' );
	const floatVertexTextures = vertexTextures && floatFragmentTextures;

	const maxSamples = isWebGL2 ? gl.getParameter( 36183 ) : 0;

	return {

		isWebGL2: isWebGL2,

		getMaxAnisotropy: getMaxAnisotropy,
		getMaxPrecision: getMaxPrecision,

		precision: precision,
		logarithmicDepthBuffer: logarithmicDepthBuffer,

		maxTextures: maxTextures,
		maxVertexTextures: maxVertexTextures,
		maxTextureSize: maxTextureSize,
		maxCubemapSize: maxCubemapSize,

		maxAttributes: maxAttributes,
		maxVertexUniforms: maxVertexUniforms,
		maxVaryings: maxVaryings,
		maxFragmentUniforms: maxFragmentUniforms,

		vertexTextures: vertexTextures,
		floatFragmentTextures: floatFragmentTextures,
		floatVertexTextures: floatVertexTextures,

		maxSamples: maxSamples

	};

}

function WebGLClipping( properties ) {

	const scope = this;

	let globalState = null,
		numGlobalPlanes = 0,
		localClippingEnabled = false,
		renderingShadows = false;

	const plane = new Plane(),
		viewNormalMatrix = new Matrix3(),

		uniform = { value: null, needsUpdate: false };

	this.uniform = uniform;
	this.numPlanes = 0;
	this.numIntersection = 0;

	this.init = function ( planes, enableLocalClipping, camera ) {

		const enabled =
			planes.length !== 0 ||
			enableLocalClipping ||
			// enable state of previous frame - the clipping code has to
			// run another frame in order to reset the state:
			numGlobalPlanes !== 0 ||
			localClippingEnabled;

		localClippingEnabled = enableLocalClipping;

		globalState = projectPlanes( planes, camera, 0 );
		numGlobalPlanes = planes.length;

		return enabled;

	};

	this.beginShadows = function () {

		renderingShadows = true;
		projectPlanes( null );

	};

	this.endShadows = function () {

		renderingShadows = false;
		resetGlobalState();

	};

	this.setState = function ( material, camera, useCache ) {

		const planes = material.clippingPlanes,
			clipIntersection = material.clipIntersection,
			clipShadows = material.clipShadows;

		const materialProperties = properties.get( material );

		if ( ! localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && ! clipShadows ) {

			// there's no local clipping

			if ( renderingShadows ) {

				// there's no global clipping

				projectPlanes( null );

			} else {

				resetGlobalState();

			}

		} else {

			const nGlobal = renderingShadows ? 0 : numGlobalPlanes,
				lGlobal = nGlobal * 4;

			let dstArray = materialProperties.clippingState || null;

			uniform.value = dstArray; // ensure unique state

			dstArray = projectPlanes( planes, camera, lGlobal, useCache );

			for ( let i = 0; i !== lGlobal; ++ i ) {

				dstArray[ i ] = globalState[ i ];

			}

			materialProperties.clippingState = dstArray;
			this.numIntersection = clipIntersection ? this.numPlanes : 0;
			this.numPlanes += nGlobal;

		}


	};

	function resetGlobalState() {

		if ( uniform.value !== globalState ) {

			uniform.value = globalState;
			uniform.needsUpdate = numGlobalPlanes > 0;

		}

		scope.numPlanes = numGlobalPlanes;
		scope.numIntersection = 0;

	}

	function projectPlanes( planes, camera, dstOffset, skipTransform ) {

		const nPlanes = planes !== null ? planes.length : 0;
		let dstArray = null;

		if ( nPlanes !== 0 ) {

			dstArray = uniform.value;

			if ( skipTransform !== true || dstArray === null ) {

				const flatSize = dstOffset + nPlanes * 4,
					viewMatrix = camera.matrixWorldInverse;

				viewNormalMatrix.getNormalMatrix( viewMatrix );

				if ( dstArray === null || dstArray.length < flatSize ) {

					dstArray = new Float32Array( flatSize );

				}

				for ( let i = 0, i4 = dstOffset; i !== nPlanes; ++ i, i4 += 4 ) {

					plane.copy( planes[ i ] ).applyMatrix4( viewMatrix, viewNormalMatrix );

					plane.normal.toArray( dstArray, i4 );
					dstArray[ i4 + 3 ] = plane.constant;

				}

			}

			uniform.value = dstArray;
			uniform.needsUpdate = true;

		}

		scope.numPlanes = nPlanes;
		scope.numIntersection = 0;

		return dstArray;

	}

}

function WebGLCubeMaps( renderer ) {

	let cubemaps = new WeakMap();

	function mapTextureMapping( texture, mapping ) {

		if ( mapping === EquirectangularReflectionMapping ) {

			texture.mapping = CubeReflectionMapping;

		} else if ( mapping === EquirectangularRefractionMapping ) {

			texture.mapping = CubeRefractionMapping;

		}

		return texture;

	}

	function get( texture ) {

		if ( texture && texture.isTexture ) {

			const mapping = texture.mapping;

			if ( mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping ) {

				if ( cubemaps.has( texture ) ) {

					const cubemap = cubemaps.get( texture ).texture;
					return mapTextureMapping( cubemap, texture.mapping );

				} else {

					const image = texture.image;

					if ( image && image.height > 0 ) {

						const currentRenderTarget = renderer.getRenderTarget();

						const renderTarget = new WebGLCubeRenderTarget( image.height / 2 );
						renderTarget.fromEquirectangularTexture( renderer, texture );
						cubemaps.set( texture, renderTarget );

						renderer.setRenderTarget( currentRenderTarget );

						texture.addEventListener( 'dispose', onTextureDispose );

						return mapTextureMapping( renderTarget.texture, texture.mapping );

					} else {

						// image not yet ready. try the conversion next frame

						return null;

					}

				}

			}

		}

		return texture;

	}

	function onTextureDispose( event ) {

		const texture = event.target;

		texture.removeEventListener( 'dispose', onTextureDispose );

		const cubemap = cubemaps.get( texture );

		if ( cubemap !== undefined ) {

			cubemaps.delete( texture );
			cubemap.dispose();

		}

	}

	function dispose() {

		cubemaps = new WeakMap();

	}

	return {
		get: get,
		dispose: dispose
	};

}

function WebGLExtensions( gl ) {

	const extensions = {};

	function getExtension( name ) {

		if ( extensions[ name ] !== undefined ) {

			return extensions[ name ];

		}

		let extension;

		switch ( name ) {

			case 'WEBGL_depth_texture':
				extension = gl.getExtension( 'WEBGL_depth_texture' ) || gl.getExtension( 'MOZ_WEBGL_depth_texture' ) || gl.getExtension( 'WEBKIT_WEBGL_depth_texture' );
				break;

			case 'EXT_texture_filter_anisotropic':
				extension = gl.getExtension( 'EXT_texture_filter_anisotropic' ) || gl.getExtension( 'MOZ_EXT_texture_filter_anisotropic' ) || gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );
				break;

			case 'WEBGL_compressed_texture_s3tc':
				extension = gl.getExtension( 'WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'MOZ_WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_s3tc' );
				break;

			case 'WEBGL_compressed_texture_pvrtc':
				extension = gl.getExtension( 'WEBGL_compressed_texture_pvrtc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_pvrtc' );
				break;

			default:
				extension = gl.getExtension( name );

		}

		extensions[ name ] = extension;

		return extension;

	}

	return {

		has: function ( name ) {

			return getExtension( name ) !== null;

		},

		init: function ( capabilities ) {

			if ( capabilities.isWebGL2 ) {

				getExtension( 'EXT_color_buffer_float' );

			} else {

				getExtension( 'WEBGL_depth_texture' );
				getExtension( 'OES_texture_float' );
				getExtension( 'OES_texture_half_float' );
				getExtension( 'OES_texture_half_float_linear' );
				getExtension( 'OES_standard_derivatives' );
				getExtension( 'OES_element_index_uint' );
				getExtension( 'OES_vertex_array_object' );
				getExtension( 'ANGLE_instanced_arrays' );

			}

			getExtension( 'OES_texture_float_linear' );
			getExtension( 'EXT_color_buffer_half_float' );

		},

		get: function ( name ) {

			const extension = getExtension( name );

			if ( extension === null ) {

				console.warn( 'THREE.WebGLRenderer: ' + name + ' extension not supported.' );

			}

			return extension;

		}

	};

}

function WebGLGeometries( gl, attributes, info, bindingStates ) {

	const geometries = {};
	const wireframeAttributes = new WeakMap();

	function onGeometryDispose( event ) {

		const geometry = event.target;

		if ( geometry.index !== null ) {

			attributes.remove( geometry.index );

		}

		for ( const name in geometry.attributes ) {

			attributes.remove( geometry.attributes[ name ] );

		}

		geometry.removeEventListener( 'dispose', onGeometryDispose );

		delete geometries[ geometry.id ];

		const attribute = wireframeAttributes.get( geometry );

		if ( attribute ) {

			attributes.remove( attribute );
			wireframeAttributes.delete( geometry );

		}

		bindingStates.releaseStatesOfGeometry( geometry );

		if ( geometry.isInstancedBufferGeometry === true ) {

			delete geometry._maxInstanceCount;

		}

		//

		info.memory.geometries --;

	}

	function get( object, geometry ) {

		if ( geometries[ geometry.id ] === true ) return geometry;

		geometry.addEventListener( 'dispose', onGeometryDispose );

		geometries[ geometry.id ] = true;

		info.memory.geometries ++;

		return geometry;

	}

	function update( geometry ) {

		const geometryAttributes = geometry.attributes;

		// Updating index buffer in VAO now. See WebGLBindingStates.

		for ( const name in geometryAttributes ) {

			attributes.update( geometryAttributes[ name ], 34962 );

		}

		// morph targets

		const morphAttributes = geometry.morphAttributes;

		for ( const name in morphAttributes ) {

			const array = morphAttributes[ name ];

			for ( let i = 0, l = array.length; i < l; i ++ ) {

				attributes.update( array[ i ], 34962 );

			}

		}

	}

	function updateWireframeAttribute( geometry ) {

		const indices = [];

		const geometryIndex = geometry.index;
		const geometryPosition = geometry.attributes.position;
		let version = 0;

		if ( geometryIndex !== null ) {

			const array = geometryIndex.array;
			version = geometryIndex.version;

			for ( let i = 0, l = array.length; i < l; i += 3 ) {

				const a = array[ i + 0 ];
				const b = array[ i + 1 ];
				const c = array[ i + 2 ];

				indices.push( a, b, b, c, c, a );

			}

		} else {

			const array = geometryPosition.array;
			version = geometryPosition.version;

			for ( let i = 0, l = ( array.length / 3 ) - 1; i < l; i += 3 ) {

				const a = i + 0;
				const b = i + 1;
				const c = i + 2;

				indices.push( a, b, b, c, c, a );

			}

		}

		const attribute = new ( arrayMax( indices ) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute )( indices, 1 );
		attribute.version = version;

		// Updating index buffer in VAO now. See WebGLBindingStates

		//

		const previousAttribute = wireframeAttributes.get( geometry );

		if ( previousAttribute ) attributes.remove( previousAttribute );

		//

		wireframeAttributes.set( geometry, attribute );

	}

	function getWireframeAttribute( geometry ) {

		const currentAttribute = wireframeAttributes.get( geometry );

		if ( currentAttribute ) {

			const geometryIndex = geometry.index;

			if ( geometryIndex !== null ) {

				// if the attribute is obsolete, create a new one

				if ( currentAttribute.version < geometryIndex.version ) {

					updateWireframeAttribute( geometry );

				}

			}

		} else {

			updateWireframeAttribute( geometry );

		}

		return wireframeAttributes.get( geometry );

	}

	return {

		get: get,
		update: update,

		getWireframeAttribute: getWireframeAttribute

	};

}

function WebGLIndexedBufferRenderer( gl, extensions, info, capabilities ) {

	const isWebGL2 = capabilities.isWebGL2;

	let mode;

	function setMode( value ) {

		mode = value;

	}

	let type, bytesPerElement;

	function setIndex( value ) {

		type = value.type;
		bytesPerElement = value.bytesPerElement;

	}

	function render( start, count ) {

		gl.drawElements( mode, count, type, start * bytesPerElement );

		info.update( count, mode, 1 );

	}

	function renderInstances( start, count, primcount ) {

		if ( primcount === 0 ) return;

		let extension, methodName;

		if ( isWebGL2 ) {

			extension = gl;
			methodName = 'drawElementsInstanced';

		} else {

			extension = extensions.get( 'ANGLE_instanced_arrays' );
			methodName = 'drawElementsInstancedANGLE';

			if ( extension === null ) {

				console.error( 'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
				return;

			}

		}

		extension[ methodName ]( mode, count, type, start * bytesPerElement, primcount );

		info.update( count, mode, primcount );

	}

	//

	this.setMode = setMode;
	this.setIndex = setIndex;
	this.render = render;
	this.renderInstances = renderInstances;

}

function WebGLInfo( gl ) {

	const memory = {
		geometries: 0,
		textures: 0
	};

	const render = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};

	function update( count, mode, instanceCount ) {

		render.calls ++;

		switch ( mode ) {

			case 4:
				render.triangles += instanceCount * ( count / 3 );
				break;

			case 1:
				render.lines += instanceCount * ( count / 2 );
				break;

			case 3:
				render.lines += instanceCount * ( count - 1 );
				break;

			case 2:
				render.lines += instanceCount * count;
				break;

			case 0:
				render.points += instanceCount * count;
				break;

			default:
				console.error( 'THREE.WebGLInfo: Unknown draw mode:', mode );
				break;

		}

	}

	function reset() {

		render.frame ++;
		render.calls = 0;
		render.triangles = 0;
		render.points = 0;
		render.lines = 0;

	}

	return {
		memory: memory,
		render: render,
		programs: null,
		autoReset: true,
		reset: reset,
		update: update
	};

}

function numericalSort( a, b ) {

	return a[ 0 ] - b[ 0 ];

}

function absNumericalSort( a, b ) {

	return Math.abs( b[ 1 ] ) - Math.abs( a[ 1 ] );

}

function WebGLMorphtargets( gl ) {

	const influencesList = {};
	const morphInfluences = new Float32Array( 8 );

	const workInfluences = [];

	for ( let i = 0; i < 8; i ++ ) {

		workInfluences[ i ] = [ i, 0 ];

	}

	function update( object, geometry, material, program ) {

		const objectInfluences = object.morphTargetInfluences;

		// When object doesn't have morph target influences defined, we treat it as a 0-length array
		// This is important to make sure we set up morphTargetBaseInfluence / morphTargetInfluences

		const length = objectInfluences === undefined ? 0 : objectInfluences.length;

		let influences = influencesList[ geometry.id ];

		if ( influences === undefined ) {

			// initialise list

			influences = [];

			for ( let i = 0; i < length; i ++ ) {

				influences[ i ] = [ i, 0 ];

			}

			influencesList[ geometry.id ] = influences;

		}

		// Collect influences

		for ( let i = 0; i < length; i ++ ) {

			const influence = influences[ i ];

			influence[ 0 ] = i;
			influence[ 1 ] = objectInfluences[ i ];

		}

		influences.sort( absNumericalSort );

		for ( let i = 0; i < 8; i ++ ) {

			if ( i < length && influences[ i ][ 1 ] ) {

				workInfluences[ i ][ 0 ] = influences[ i ][ 0 ];
				workInfluences[ i ][ 1 ] = influences[ i ][ 1 ];

			} else {

				workInfluences[ i ][ 0 ] = Number.MAX_SAFE_INTEGER;
				workInfluences[ i ][ 1 ] = 0;

			}

		}

		workInfluences.sort( numericalSort );

		const morphTargets = material.morphTargets && geometry.morphAttributes.position;
		const morphNormals = material.morphNormals && geometry.morphAttributes.normal;

		let morphInfluencesSum = 0;

		for ( let i = 0; i < 8; i ++ ) {

			const influence = workInfluences[ i ];
			const index = influence[ 0 ];
			const value = influence[ 1 ];

			if ( index !== Number.MAX_SAFE_INTEGER && value ) {

				if ( morphTargets && geometry.getAttribute( 'morphTarget' + i ) !== morphTargets[ index ] ) {

					geometry.setAttribute( 'morphTarget' + i, morphTargets[ index ] );

				}

				if ( morphNormals && geometry.getAttribute( 'morphNormal' + i ) !== morphNormals[ index ] ) {

					geometry.setAttribute( 'morphNormal' + i, morphNormals[ index ] );

				}

				morphInfluences[ i ] = value;
				morphInfluencesSum += value;

			} else {

				if ( morphTargets && geometry.hasAttribute( 'morphTarget' + i ) === true ) {

					geometry.deleteAttribute( 'morphTarget' + i );

				}

				if ( morphNormals && geometry.hasAttribute( 'morphNormal' + i ) === true ) {

					geometry.deleteAttribute( 'morphNormal' + i );

				}

				morphInfluences[ i ] = 0;

			}

		}

		// GLSL shader uses formula baseinfluence * base + sum(target * influence)
		// This allows us to switch between absolute morphs and relative morphs without changing shader code
		// When baseinfluence = 1 - sum(influence), the above is equivalent to sum((target - base) * influence)
		const morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;

		program.getUniforms().setValue( gl, 'morphTargetBaseInfluence', morphBaseInfluence );
		program.getUniforms().setValue( gl, 'morphTargetInfluences', morphInfluences );

	}

	return {

		update: update

	};

}

function WebGLObjects( gl, geometries, attributes, info ) {

	let updateMap = new WeakMap();

	function update( object ) {

		const frame = info.render.frame;

		const geometry = object.geometry;
		const buffergeometry = geometries.get( object, geometry );

		// Update once per frame

		if ( updateMap.get( buffergeometry ) !== frame ) {

			geometries.update( buffergeometry );

			updateMap.set( buffergeometry, frame );

		}

		if ( object.isInstancedMesh ) {

			if ( object.hasEventListener( 'dispose', onInstancedMeshDispose ) === false ) {

				object.addEventListener( 'dispose', onInstancedMeshDispose );

			}

			attributes.update( object.instanceMatrix, 34962 );

			if ( object.instanceColor !== null ) {

				attributes.update( object.instanceColor, 34962 );

			}

		}

		return buffergeometry;

	}

	function dispose() {

		updateMap = new WeakMap();

	}

	function onInstancedMeshDispose( event ) {

		const instancedMesh = event.target;

		instancedMesh.removeEventListener( 'dispose', onInstancedMeshDispose );

		attributes.remove( instancedMesh.instanceMatrix );

		if ( instancedMesh.instanceColor !== null ) attributes.remove( instancedMesh.instanceColor );

	}

	return {

		update: update,
		dispose: dispose

	};

}

class DataTexture2DArray extends Texture {

	constructor( data = null, width = 1, height = 1, depth = 1 ) {

		super( null );

		this.image = { data, width, height, depth };

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.wrapR = ClampToEdgeWrapping;

		this.generateMipmaps = false;
		this.flipY = false;

		this.needsUpdate = true;

	}

}

DataTexture2DArray.prototype.isDataTexture2DArray = true;

class DataTexture3D extends Texture {

	constructor( data = null, width = 1, height = 1, depth = 1 ) {

		// We're going to add .setXXX() methods for setting properties later.
		// Users can still set in DataTexture3D directly.
		//
		//	const texture = new THREE.DataTexture3D( data, width, height, depth );
		// 	texture.anisotropy = 16;
		//
		// See #14839

		super( null );

		this.image = { data, width, height, depth };

		this.magFilter = NearestFilter;
		this.minFilter = NearestFilter;

		this.wrapR = ClampToEdgeWrapping;

		this.generateMipmaps = false;
		this.flipY = false;

		this.needsUpdate = true;

	}

}

DataTexture3D.prototype.isDataTexture3D = true;

/**
 * Uniforms of a program.
 * Those form a tree structure with a special top-level container for the root,
 * which you get by calling 'new WebGLUniforms( gl, program )'.
 *
 *
 * Properties of inner nodes including the top-level container:
 *
 * .seq - array of nested uniforms
 * .map - nested uniforms by name
 *
 *
 * Methods of all nodes except the top-level container:
 *
 * .setValue( gl, value, [textures] )
 *
 * 		uploads a uniform value(s)
 *  	the 'textures' parameter is needed for sampler uniforms
 *
 *
 * Static methods of the top-level container (textures factorizations):
 *
 * .upload( gl, seq, values, textures )
 *
 * 		sets uniforms in 'seq' to 'values[id].value'
 *
 * .seqWithValue( seq, values ) : filteredSeq
 *
 * 		filters 'seq' entries with corresponding entry in values
 *
 *
 * Methods of the top-level container (textures factorizations):
 *
 * .setValue( gl, name, value, textures )
 *
 * 		sets uniform with  name 'name' to 'value'
 *
 * .setOptional( gl, obj, prop )
 *
 * 		like .set for an optional property of the object
 *
 */

const emptyTexture = new Texture();
const emptyTexture2dArray = new DataTexture2DArray();
const emptyTexture3d = new DataTexture3D();
const emptyCubeTexture = new CubeTexture();

// --- Utilities ---

// Array Caches (provide typed arrays for temporary by size)

const arrayCacheF32 = [];
const arrayCacheI32 = [];

// Float32Array caches used for uploading Matrix uniforms

const mat4array = new Float32Array( 16 );
const mat3array = new Float32Array( 9 );
const mat2array = new Float32Array( 4 );

// Flattening for arrays of vectors and matrices

function flatten( array, nBlocks, blockSize ) {

	const firstElem = array[ 0 ];

	if ( firstElem <= 0 || firstElem > 0 ) return array;
	// unoptimized: ! isNaN( firstElem )
	// see http://jacksondunstan.com/articles/983

	const n = nBlocks * blockSize;
	let r = arrayCacheF32[ n ];

	if ( r === undefined ) {

		r = new Float32Array( n );
		arrayCacheF32[ n ] = r;

	}

	if ( nBlocks !== 0 ) {

		firstElem.toArray( r, 0 );

		for ( let i = 1, offset = 0; i !== nBlocks; ++ i ) {

			offset += blockSize;
			array[ i ].toArray( r, offset );

		}

	}

	return r;

}

function arraysEqual( a, b ) {

	if ( a.length !== b.length ) return false;

	for ( let i = 0, l = a.length; i < l; i ++ ) {

		if ( a[ i ] !== b[ i ] ) return false;

	}

	return true;

}

function copyArray( a, b ) {

	for ( let i = 0, l = b.length; i < l; i ++ ) {

		a[ i ] = b[ i ];

	}

}

// Texture unit allocation

function allocTexUnits( textures, n ) {

	let r = arrayCacheI32[ n ];

	if ( r === undefined ) {

		r = new Int32Array( n );
		arrayCacheI32[ n ] = r;

	}

	for ( let i = 0; i !== n; ++ i ) {

		r[ i ] = textures.allocateTextureUnit();

	}

	return r;

}

// --- Setters ---

// Note: Defining these methods externally, because they come in a bunch
// and this way their names minify.

// Single scalar

function setValueV1f( gl, v ) {

	const cache = this.cache;

	if ( cache[ 0 ] === v ) return;

	gl.uniform1f( this.addr, v );

	cache[ 0 ] = v;

}

// Single float vector (from flat array or THREE.VectorN)

function setValueV2f( gl, v ) {

	const cache = this.cache;

	if ( v.x !== undefined ) {

		if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y ) {

			gl.uniform2f( this.addr, v.x, v.y );

			cache[ 0 ] = v.x;
			cache[ 1 ] = v.y;

		}

	} else {

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform2fv( this.addr, v );

		copyArray( cache, v );

	}

}

function setValueV3f( gl, v ) {

	const cache = this.cache;

	if ( v.x !== undefined ) {

		if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z ) {

			gl.uniform3f( this.addr, v.x, v.y, v.z );

			cache[ 0 ] = v.x;
			cache[ 1 ] = v.y;
			cache[ 2 ] = v.z;

		}

	} else if ( v.r !== undefined ) {

		if ( cache[ 0 ] !== v.r || cache[ 1 ] !== v.g || cache[ 2 ] !== v.b ) {

			gl.uniform3f( this.addr, v.r, v.g, v.b );

			cache[ 0 ] = v.r;
			cache[ 1 ] = v.g;
			cache[ 2 ] = v.b;

		}

	} else {

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform3fv( this.addr, v );

		copyArray( cache, v );

	}

}

function setValueV4f( gl, v ) {

	const cache = this.cache;

	if ( v.x !== undefined ) {

		if ( cache[ 0 ] !== v.x || cache[ 1 ] !== v.y || cache[ 2 ] !== v.z || cache[ 3 ] !== v.w ) {

			gl.uniform4f( this.addr, v.x, v.y, v.z, v.w );

			cache[ 0 ] = v.x;
			cache[ 1 ] = v.y;
			cache[ 2 ] = v.z;
			cache[ 3 ] = v.w;

		}

	} else {

		if ( arraysEqual( cache, v ) ) return;

		gl.uniform4fv( this.addr, v );

		copyArray( cache, v );

	}

}

// Single matrix (from flat array or MatrixN)

function setValueM2( gl, v ) {

	const cache = this.cache;
	const elements = v.elements;

	if ( elements === undefined ) {

		if ( arraysEqual( cache, v ) ) return;

		gl.uniformMatrix2fv( this.addr, false, v );

		copyArray( cache, v );

	} else {

		if ( arraysEqual( cache, elements ) ) return;

		mat2array.set( elements );

		gl.uniformMatrix2fv( this.addr, false, mat2array );

		copyArray( cache, elements );

	}

}

function setValueM3( gl, v ) {

	const cache = this.cache;
	const elements = v.elements;

	if ( elements === undefined ) {

		if ( arraysEqual( cache, v ) ) return;

		gl.uniformMatrix3fv( this.addr, false, v );

		copyArray( cache, v );

	} else {

		if ( arraysEqual( cache, elements ) ) return;

		mat3array.set( elements );

		gl.uniformMatrix3fv( this.addr, false, mat3array );

		copyArray( cache, elements );

	}

}

function setValueM4( gl, v ) {

	const cache = this.cache;
	const elements = v.elements;

	if ( elements === undefined ) {

		if ( arraysEqual( cache, v ) ) return;

		gl.uniformMatrix4fv( this.addr, false, v );

		copyArray( cache, v );

	} else {

		if ( arraysEqual( cache, elements ) ) return;

		mat4array.set( elements );

		gl.uniformMatrix4fv( this.addr, false, mat4array );

		copyArray( cache, elements );

	}

}

// Single texture (2D / Cube)

function setValueT1( gl, v, textures ) {

	const cache = this.cache;
	const unit = textures.allocateTextureUnit();

	if ( cache[ 0 ] !== unit ) {

		gl.uniform1i( this.addr, unit );
		cache[ 0 ] = unit;

	}

	textures.safeSetTexture2D( v || emptyTexture, unit );

}

function setValueT2DArray1( gl, v, textures ) {

	const cache = this.cache;
	const unit = textures.allocateTextureUnit();

	if ( cache[ 0 ] !== unit ) {

		gl.uniform1i( this.addr, unit );
		cache[ 0 ] = unit;

	}

	textures.setTexture2DArray( v || emptyTexture2dArray, unit );

}

function setValueT3D1( gl, v, textures ) {

	const cache = this.cache;
	const unit = textures.allocateTextureUnit();

	if ( cache[ 0 ] !== unit ) {

		gl.uniform1i( this.addr, unit );
		cache[ 0 ] = unit;

	}

	textures.setTexture3D( v || emptyTexture3d, unit );

}

function setValueT6( gl, v, textures ) {

	const cache = this.cache;
	const unit = textures.allocateTextureUnit();

	if ( cache[ 0 ] !== unit ) {

		gl.uniform1i( this.addr, unit );
		cache[ 0 ] = unit;

	}

	textures.safeSetTextureCube( v || emptyCubeTexture, unit );

}

// Integer / Boolean vectors or arrays thereof (always flat arrays)

function setValueV1i( gl, v ) {

	const cache = this.cache;

	if ( cache[ 0 ] === v ) return;

	gl.uniform1i( this.addr, v );

	cache[ 0 ] = v;

}

function setValueV2i( gl, v ) {

	const cache = this.cache;

	if ( arraysEqual( cache, v ) ) return;

	gl.uniform2iv( this.addr, v );

	copyArray( cache, v );

}

function setValueV3i( gl, v ) {

	const cache = this.cache;

	if ( arraysEqual( cache, v ) ) return;

	gl.uniform3iv( this.addr, v );

	copyArray( cache, v );

}

function setValueV4i( gl, v ) {

	const cache = this.cache;

	if ( arraysEqual( cache, v ) ) return;

	gl.uniform4iv( this.addr, v );

	copyArray( cache, v );

}

// uint

function setValueV1ui( gl, v ) {

	const cache = this.cache;

	if ( cache[ 0 ] === v ) return;

	gl.uniform1ui( this.addr, v );

	cache[ 0 ] = v;

}

// Helper to pick the right setter for the singular case

function getSingularSetter( type ) {

	switch ( type ) {

		case 0x1406: return setValueV1f; // FLOAT
		case 0x8b50: return setValueV2f; // _VEC2
		case 0x8b51: return setValueV3f; // _VEC3
		case 0x8b52: return setValueV4f; // _VEC4

		case 0x8b5a: return setValueM2; // _MAT2
		case 0x8b5b: return setValueM3; // _MAT3
		case 0x8b5c: return setValueM4; // _MAT4

		case 0x1404: case 0x8b56: return setValueV1i; // INT, BOOL
		case 0x8b53: case 0x8b57: return setValueV2i; // _VEC2
		case 0x8b54: case 0x8b58: return setValueV3i; // _VEC3
		case 0x8b55: case 0x8b59: return setValueV4i; // _VEC4

		case 0x1405: return setValueV1ui; // UINT

		case 0x8b5e: // SAMPLER_2D
		case 0x8d66: // SAMPLER_EXTERNAL_OES
		case 0x8dca: // INT_SAMPLER_2D
		case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
		case 0x8b62: // SAMPLER_2D_SHADOW
			return setValueT1;

		case 0x8b5f: // SAMPLER_3D
		case 0x8dcb: // INT_SAMPLER_3D
		case 0x8dd3: // UNSIGNED_INT_SAMPLER_3D
			return setValueT3D1;

		case 0x8b60: // SAMPLER_CUBE
		case 0x8dcc: // INT_SAMPLER_CUBE
		case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
		case 0x8dc5: // SAMPLER_CUBE_SHADOW
			return setValueT6;

		case 0x8dc1: // SAMPLER_2D_ARRAY
		case 0x8dcf: // INT_SAMPLER_2D_ARRAY
		case 0x8dd7: // UNSIGNED_INT_SAMPLER_2D_ARRAY
		case 0x8dc4: // SAMPLER_2D_ARRAY_SHADOW
			return setValueT2DArray1;

	}

}

// Array of scalars
function setValueV1fArray( gl, v ) {

	gl.uniform1fv( this.addr, v );

}

// Integer / Boolean vectors or arrays thereof (always flat arrays)
function setValueV1iArray( gl, v ) {

	gl.uniform1iv( this.addr, v );

}

function setValueV2iArray( gl, v ) {

	gl.uniform2iv( this.addr, v );

}

function setValueV3iArray( gl, v ) {

	gl.uniform3iv( this.addr, v );

}

function setValueV4iArray( gl, v ) {

	gl.uniform4iv( this.addr, v );

}


// Array of vectors (flat or from THREE classes)

function setValueV2fArray( gl, v ) {

	const data = flatten( v, this.size, 2 );

	gl.uniform2fv( this.addr, data );

}

function setValueV3fArray( gl, v ) {

	const data = flatten( v, this.size, 3 );

	gl.uniform3fv( this.addr, data );

}

function setValueV4fArray( gl, v ) {

	const data = flatten( v, this.size, 4 );

	gl.uniform4fv( this.addr, data );

}

// Array of matrices (flat or from THREE clases)

function setValueM2Array( gl, v ) {

	const data = flatten( v, this.size, 4 );

	gl.uniformMatrix2fv( this.addr, false, data );

}

function setValueM3Array( gl, v ) {

	const data = flatten( v, this.size, 9 );

	gl.uniformMatrix3fv( this.addr, false, data );

}

function setValueM4Array( gl, v ) {

	const data = flatten( v, this.size, 16 );

	gl.uniformMatrix4fv( this.addr, false, data );

}

// Array of textures (2D / Cube)

function setValueT1Array( gl, v, textures ) {

	const n = v.length;

	const units = allocTexUnits( textures, n );

	gl.uniform1iv( this.addr, units );

	for ( let i = 0; i !== n; ++ i ) {

		textures.safeSetTexture2D( v[ i ] || emptyTexture, units[ i ] );

	}

}

function setValueT6Array( gl, v, textures ) {

	const n = v.length;

	const units = allocTexUnits( textures, n );

	gl.uniform1iv( this.addr, units );

	for ( let i = 0; i !== n; ++ i ) {

		textures.safeSetTextureCube( v[ i ] || emptyCubeTexture, units[ i ] );

	}

}

// Helper to pick the right setter for a pure (bottom-level) array

function getPureArraySetter( type ) {

	switch ( type ) {

		case 0x1406: return setValueV1fArray; // FLOAT
		case 0x8b50: return setValueV2fArray; // _VEC2
		case 0x8b51: return setValueV3fArray; // _VEC3
		case 0x8b52: return setValueV4fArray; // _VEC4

		case 0x8b5a: return setValueM2Array; // _MAT2
		case 0x8b5b: return setValueM3Array; // _MAT3
		case 0x8b5c: return setValueM4Array; // _MAT4

		case 0x1404: case 0x8b56: return setValueV1iArray; // INT, BOOL
		case 0x8b53: case 0x8b57: return setValueV2iArray; // _VEC2
		case 0x8b54: case 0x8b58: return setValueV3iArray; // _VEC3
		case 0x8b55: case 0x8b59: return setValueV4iArray; // _VEC4

		case 0x8b5e: // SAMPLER_2D
		case 0x8d66: // SAMPLER_EXTERNAL_OES
		case 0x8dca: // INT_SAMPLER_2D
		case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
		case 0x8b62: // SAMPLER_2D_SHADOW
			return setValueT1Array;

		case 0x8b60: // SAMPLER_CUBE
		case 0x8dcc: // INT_SAMPLER_CUBE
		case 0x8dd4: // UNSIGNED_INT_SAMPLER_CUBE
		case 0x8dc5: // SAMPLER_CUBE_SHADOW
			return setValueT6Array;

	}

}

// --- Uniform Classes ---

function SingleUniform( id, activeInfo, addr ) {

	this.id = id;
	this.addr = addr;
	this.cache = [];
	this.setValue = getSingularSetter( activeInfo.type );

	// this.path = activeInfo.name; // DEBUG

}

function PureArrayUniform( id, activeInfo, addr ) {

	this.id = id;
	this.addr = addr;
	this.cache = [];
	this.size = activeInfo.size;
	this.setValue = getPureArraySetter( activeInfo.type );

	// this.path = activeInfo.name; // DEBUG

}

PureArrayUniform.prototype.updateCache = function ( data ) {

	const cache = this.cache;

	if ( data instanceof Float32Array && cache.length !== data.length ) {

		this.cache = new Float32Array( data.length );

	}

	copyArray( cache, data );

};

function StructuredUniform( id ) {

	this.id = id;

	this.seq = [];
	this.map = {};

}

StructuredUniform.prototype.setValue = function ( gl, value, textures ) {

	const seq = this.seq;

	for ( let i = 0, n = seq.length; i !== n; ++ i ) {

		const u = seq[ i ];
		u.setValue( gl, value[ u.id ], textures );

	}

};

// --- Top-level ---

// Parser - builds up the property tree from the path strings

const RePathPart = /(\w+)(\])?(\[|\.)?/g;

// extracts
// 	- the identifier (member name or array index)
//  - followed by an optional right bracket (found when array index)
//  - followed by an optional left bracket or dot (type of subscript)
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.

function addUniform( container, uniformObject ) {

	container.seq.push( uniformObject );
	container.map[ uniformObject.id ] = uniformObject;

}

function parseUniform( activeInfo, addr, container ) {

	const path = activeInfo.name,
		pathLength = path.length;

	// reset RegExp object, because of the early exit of a previous run
	RePathPart.lastIndex = 0;

	while ( true ) {

		const match = RePathPart.exec( path ),
			matchEnd = RePathPart.lastIndex;

		let id = match[ 1 ];
		const idIsIndex = match[ 2 ] === ']',
			subscript = match[ 3 ];

		if ( idIsIndex ) id = id | 0; // convert to integer

		if ( subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength ) {

			// bare name or "pure" bottom-level array "[0]" suffix

			addUniform( container, subscript === undefined ?
				new SingleUniform( id, activeInfo, addr ) :
				new PureArrayUniform( id, activeInfo, addr ) );

			break;

		} else {

			// step into inner node / create it in case it doesn't exist

			const map = container.map;
			let next = map[ id ];

			if ( next === undefined ) {

				next = new StructuredUniform( id );
				addUniform( container, next );

			}

			container = next;

		}

	}

}

// Root Container

function WebGLUniforms( gl, program ) {

	this.seq = [];
	this.map = {};

	const n = gl.getProgramParameter( program, 35718 );

	for ( let i = 0; i < n; ++ i ) {

		const info = gl.getActiveUniform( program, i ),
			addr = gl.getUniformLocation( program, info.name );

		parseUniform( info, addr, this );

	}

}

WebGLUniforms.prototype.setValue = function ( gl, name, value, textures ) {

	const u = this.map[ name ];

	if ( u !== undefined ) u.setValue( gl, value, textures );

};

WebGLUniforms.prototype.setOptional = function ( gl, object, name ) {

	const v = object[ name ];

	if ( v !== undefined ) this.setValue( gl, name, v );

};


// Static interface

WebGLUniforms.upload = function ( gl, seq, values, textures ) {

	for ( let i = 0, n = seq.length; i !== n; ++ i ) {

		const u = seq[ i ],
			v = values[ u.id ];

		if ( v.needsUpdate !== false ) {

			// note: always updating when .needsUpdate is undefined
			u.setValue( gl, v.value, textures );

		}

	}

};

WebGLUniforms.seqWithValue = function ( seq, values ) {

	const r = [];

	for ( let i = 0, n = seq.length; i !== n; ++ i ) {

		const u = seq[ i ];
		if ( u.id in values ) r.push( u );

	}

	return r;

};

function WebGLShader( gl, type, string ) {

	const shader = gl.createShader( type );

	gl.shaderSource( shader, string );
	gl.compileShader( shader );

	return shader;

}

let programIdCount = 0;

function addLineNumbers( string ) {

	const lines = string.split( '\n' );

	for ( let i = 0; i < lines.length; i ++ ) {

		lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];

	}

	return lines.join( '\n' );

}

function getEncodingComponents( encoding ) {

	switch ( encoding ) {

		case LinearEncoding:
			return [ 'Linear', '( value )' ];
		case sRGBEncoding:
			return [ 'sRGB', '( value )' ];
		case RGBEEncoding:
			return [ 'RGBE', '( value )' ];
		case RGBM7Encoding:
			return [ 'RGBM', '( value, 7.0 )' ];
		case RGBM16Encoding:
			return [ 'RGBM', '( value, 16.0 )' ];
		case RGBDEncoding:
			return [ 'RGBD', '( value, 256.0 )' ];
		case GammaEncoding:
			return [ 'Gamma', '( value, float( GAMMA_FACTOR ) )' ];
		case LogLuvEncoding:
			return [ 'LogLuv', '( value )' ];
		default:
			console.warn( 'THREE.WebGLProgram: Unsupported encoding:', encoding );
			return [ 'Linear', '( value )' ];

	}

}

function getShaderErrors( gl, shader, type ) {

	const status = gl.getShaderParameter( shader, 35713 );
	const log = gl.getShaderInfoLog( shader ).trim();

	if ( status && log === '' ) return '';

	// --enable-privileged-webgl-extension
	// console.log( '**' + type + '**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

	const source = gl.getShaderSource( shader );

	return 'THREE.WebGLShader: gl.getShaderInfoLog() ' + type + '\n' + log + addLineNumbers( source );

}

function getTexelDecodingFunction( functionName, encoding ) {

	const components = getEncodingComponents( encoding );
	return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[ 0 ] + 'ToLinear' + components[ 1 ] + '; }';

}

function getTexelEncodingFunction( functionName, encoding ) {

	const components = getEncodingComponents( encoding );
	return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[ 0 ] + components[ 1 ] + '; }';

}

function getToneMappingFunction( functionName, toneMapping ) {

	let toneMappingName;

	switch ( toneMapping ) {

		case LinearToneMapping:
			toneMappingName = 'Linear';
			break;

		case ReinhardToneMapping:
			toneMappingName = 'Reinhard';
			break;

		case CineonToneMapping:
			toneMappingName = 'OptimizedCineon';
			break;

		case ACESFilmicToneMapping:
			toneMappingName = 'ACESFilmic';
			break;

		case CustomToneMapping:
			toneMappingName = 'Custom';
			break;

		default:
			console.warn( 'THREE.WebGLProgram: Unsupported toneMapping:', toneMapping );
			toneMappingName = 'Linear';

	}

	return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';

}

function generateExtensions( parameters ) {

	const chunks = [
		( parameters.extensionDerivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.tangentSpaceNormalMap || parameters.clearcoatNormalMap || parameters.flatShading || parameters.shaderID === 'physical' ) ? '#extension GL_OES_standard_derivatives : enable' : '',
		( parameters.extensionFragDepth || parameters.logarithmicDepthBuffer ) && parameters.rendererExtensionFragDepth ? '#extension GL_EXT_frag_depth : enable' : '',
		( parameters.extensionDrawBuffers && parameters.rendererExtensionDrawBuffers ) ? '#extension GL_EXT_draw_buffers : require' : '',
		( parameters.extensionShaderTextureLOD || parameters.envMap ) && parameters.rendererExtensionShaderTextureLod ? '#extension GL_EXT_shader_texture_lod : enable' : ''
	];

	return chunks.filter( filterEmptyLine ).join( '\n' );

}

function generateDefines( defines ) {

	const chunks = [];

	for ( const name in defines ) {

		const value = defines[ name ];

		if ( value === false ) continue;

		chunks.push( '#define ' + name + ' ' + value );

	}

	return chunks.join( '\n' );

}

function fetchAttributeLocations( gl, program ) {

	const attributes = {};

	const n = gl.getProgramParameter( program, 35721 );

	for ( let i = 0; i < n; i ++ ) {

		const info = gl.getActiveAttrib( program, i );
		const name = info.name;

		// console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

		attributes[ name ] = gl.getAttribLocation( program, name );

	}

	return attributes;

}

function filterEmptyLine( string ) {

	return string !== '';

}

function replaceLightNums( string, parameters ) {

	return string
		.replace( /NUM_DIR_LIGHTS/g, parameters.numDirLights )
		.replace( /NUM_SPOT_LIGHTS/g, parameters.numSpotLights )
		.replace( /NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights )
		.replace( /NUM_POINT_LIGHTS/g, parameters.numPointLights )
		.replace( /NUM_HEMI_LIGHTS/g, parameters.numHemiLights )
		.replace( /NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows )
		.replace( /NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows )
		.replace( /NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows );

}

function replaceClippingPlaneNums( string, parameters ) {

	return string
		.replace( /NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes )
		.replace( /UNION_CLIPPING_PLANES/g, ( parameters.numClippingPlanes - parameters.numClipIntersection ) );

}

// Resolve Includes

const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

function resolveIncludes( string ) {

	return string.replace( includePattern, includeReplacer );

}

function includeReplacer( match, include ) {

	const string = ShaderChunk[ include ];

	if ( string === undefined ) {

		throw new Error( 'Can not resolve #include <' + include + '>' );

	}

	return resolveIncludes( string );

}

// Unroll Loops

const deprecatedUnrollLoopPattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
const unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

function unrollLoops( string ) {

	return string
		.replace( unrollLoopPattern, loopReplacer )
		.replace( deprecatedUnrollLoopPattern, deprecatedLoopReplacer );

}

function deprecatedLoopReplacer( match, start, end, snippet ) {

	console.warn( 'WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead.' );
	return loopReplacer( match, start, end, snippet );

}

function loopReplacer( match, start, end, snippet ) {

	let string = '';

	for ( let i = parseInt( start ); i < parseInt( end ); i ++ ) {

		string += snippet
			.replace( /\[\s*i\s*\]/g, '[ ' + i + ' ]' )
			.replace( /UNROLLED_LOOP_INDEX/g, i );

	}

	return string;

}

//

function generatePrecision( parameters ) {

	let precisionstring = 'precision ' + parameters.precision + ' float;\nprecision ' + parameters.precision + ' int;';

	if ( parameters.precision === 'highp' ) {

		precisionstring += '\n#define HIGH_PRECISION';

	} else if ( parameters.precision === 'mediump' ) {

		precisionstring += '\n#define MEDIUM_PRECISION';

	} else if ( parameters.precision === 'lowp' ) {

		precisionstring += '\n#define LOW_PRECISION';

	}

	return precisionstring;

}

function generateShadowMapTypeDefine( parameters ) {

	let shadowMapTypeDefine = 'SHADOWMAP_TYPE_BASIC';

	if ( parameters.shadowMapType === PCFShadowMap ) {

		shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF';

	} else if ( parameters.shadowMapType === PCFSoftShadowMap ) {

		shadowMapTypeDefine = 'SHADOWMAP_TYPE_PCF_SOFT';

	} else if ( parameters.shadowMapType === VSMShadowMap ) {

		shadowMapTypeDefine = 'SHADOWMAP_TYPE_VSM';

	}

	return shadowMapTypeDefine;

}

function generateEnvMapTypeDefine( parameters ) {

	let envMapTypeDefine = 'ENVMAP_TYPE_CUBE';

	if ( parameters.envMap ) {

		switch ( parameters.envMapMode ) {

			case CubeReflectionMapping:
			case CubeRefractionMapping:
				envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
				break;

			case CubeUVReflectionMapping:
			case CubeUVRefractionMapping:
				envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
				break;

		}

	}

	return envMapTypeDefine;

}

function generateEnvMapModeDefine( parameters ) {

	let envMapModeDefine = 'ENVMAP_MODE_REFLECTION';

	if ( parameters.envMap ) {

		switch ( parameters.envMapMode ) {

			case CubeRefractionMapping:
			case CubeUVRefractionMapping:

				envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
				break;

		}

	}

	return envMapModeDefine;

}

function generateEnvMapBlendingDefine( parameters ) {

	let envMapBlendingDefine = 'ENVMAP_BLENDING_NONE';

	if ( parameters.envMap ) {

		switch ( parameters.combine ) {

			case MultiplyOperation:
				envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
				break;

			case MixOperation:
				envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
				break;

			case AddOperation:
				envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
				break;

		}

	}

	return envMapBlendingDefine;

}

function WebGLProgram( renderer, cacheKey, parameters, bindingStates ) {

	const gl = renderer.getContext();

	const defines = parameters.defines;

	let vertexShader = parameters.vertexShader;
	let fragmentShader = parameters.fragmentShader;

	const shadowMapTypeDefine = generateShadowMapTypeDefine( parameters );
	const envMapTypeDefine = generateEnvMapTypeDefine( parameters );
	const envMapModeDefine = generateEnvMapModeDefine( parameters );
	const envMapBlendingDefine = generateEnvMapBlendingDefine( parameters );


	const gammaFactorDefine = ( renderer.gammaFactor > 0 ) ? renderer.gammaFactor : 1.0;

	const customExtensions = parameters.isWebGL2 ? '' : generateExtensions( parameters );

	const customDefines = generateDefines( defines );

	const program = gl.createProgram();

	let prefixVertex, prefixFragment;
	let versionString = parameters.glslVersion ? '#version ' + parameters.glslVersion + '\n' : '';

	if ( parameters.isRawShaderMaterial ) {

		prefixVertex = [

			customDefines

		].filter( filterEmptyLine ).join( '\n' );

		if ( prefixVertex.length > 0 ) {

			prefixVertex += '\n';

		}

		prefixFragment = [

			customExtensions,
			customDefines

		].filter( filterEmptyLine ).join( '\n' );

		if ( prefixFragment.length > 0 ) {

			prefixFragment += '\n';

		}

	} else {

		prefixVertex = [

			generatePrecision( parameters ),

			'#define SHADER_NAME ' + parameters.shaderName,

			customDefines,

			parameters.instancing ? '#define USE_INSTANCING' : '',
			parameters.instancingColor ? '#define USE_INSTANCING_COLOR' : '',

			parameters.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',

			'#define GAMMA_FACTOR ' + gammaFactorDefine,

			'#define MAX_BONES ' + parameters.maxBones,
			( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
			( parameters.useFog && parameters.fogExp2 ) ? '#define FOG_EXP2' : '',

			parameters.map ? '#define USE_MAP' : '',
			parameters.envMap ? '#define USE_ENVMAP' : '',
			parameters.envMap ? '#define ' + envMapModeDefine : '',
			parameters.lightMap ? '#define USE_LIGHTMAP' : '',
			parameters.aoMap ? '#define USE_AOMAP' : '',
			parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
			parameters.bumpMap ? '#define USE_BUMPMAP' : '',
			parameters.normalMap ? '#define USE_NORMALMAP' : '',
			( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
			( parameters.normalMap && parameters.tangentSpaceNormalMap ) ? '#define TANGENTSPACE_NORMALMAP' : '',

			parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
			parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
			parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
			parameters.displacementMap && parameters.supportsVertexTextures ? '#define USE_DISPLACEMENTMAP' : '',
			parameters.specularMap ? '#define USE_SPECULARMAP' : '',
			parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
			parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
			parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
			parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',

			parameters.vertexTangents ? '#define USE_TANGENT' : '',
			parameters.vertexColors ? '#define USE_COLOR' : '',
			parameters.vertexUvs ? '#define USE_UV' : '',
			parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',

			parameters.flatShading ? '#define FLAT_SHADED' : '',

			parameters.skinning ? '#define USE_SKINNING' : '',
			parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',

			parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
			parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
			parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
			parameters.flipSided ? '#define FLIP_SIDED' : '',

			parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
			parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

			parameters.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',

			parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
			( parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

			'uniform mat4 modelMatrix;',
			'uniform mat4 modelViewMatrix;',
			'uniform mat4 projectionMatrix;',
			'uniform mat4 viewMatrix;',
			'uniform mat3 normalMatrix;',
			'uniform vec3 cameraPosition;',
			'uniform bool isOrthographic;',

			'#ifdef USE_INSTANCING',

			'	attribute mat4 instanceMatrix;',

			'#endif',

			'#ifdef USE_INSTANCING_COLOR',

			'	attribute vec3 instanceColor;',

			'#endif',

			'attribute vec3 position;',
			'attribute vec3 normal;',
			'attribute vec2 uv;',

			'#ifdef USE_TANGENT',

			'	attribute vec4 tangent;',

			'#endif',

			'#ifdef USE_COLOR',

			'	attribute vec3 color;',

			'#endif',

			'#ifdef USE_MORPHTARGETS',

			'	attribute vec3 morphTarget0;',
			'	attribute vec3 morphTarget1;',
			'	attribute vec3 morphTarget2;',
			'	attribute vec3 morphTarget3;',

			'	#ifdef USE_MORPHNORMALS',

			'		attribute vec3 morphNormal0;',
			'		attribute vec3 morphNormal1;',
			'		attribute vec3 morphNormal2;',
			'		attribute vec3 morphNormal3;',

			'	#else',

			'		attribute vec3 morphTarget4;',
			'		attribute vec3 morphTarget5;',
			'		attribute vec3 morphTarget6;',
			'		attribute vec3 morphTarget7;',

			'	#endif',

			'#endif',

			'#ifdef USE_SKINNING',

			'	attribute vec4 skinIndex;',
			'	attribute vec4 skinWeight;',

			'#endif',

			'\n'

		].filter( filterEmptyLine ).join( '\n' );

		prefixFragment = [

			customExtensions,

			generatePrecision( parameters ),

			'#define SHADER_NAME ' + parameters.shaderName,

			customDefines,

			parameters.alphaTest ? '#define ALPHATEST ' + parameters.alphaTest + ( parameters.alphaTest % 1 ? '' : '.0' ) : '', // add '.0' if integer

			'#define GAMMA_FACTOR ' + gammaFactorDefine,

			( parameters.useFog && parameters.fog ) ? '#define USE_FOG' : '',
			( parameters.useFog && parameters.fogExp2 ) ? '#define FOG_EXP2' : '',

			parameters.map ? '#define USE_MAP' : '',
			parameters.matcap ? '#define USE_MATCAP' : '',
			parameters.envMap ? '#define USE_ENVMAP' : '',
			parameters.envMap ? '#define ' + envMapTypeDefine : '',
			parameters.envMap ? '#define ' + envMapModeDefine : '',
			parameters.envMap ? '#define ' + envMapBlendingDefine : '',
			parameters.lightMap ? '#define USE_LIGHTMAP' : '',
			parameters.aoMap ? '#define USE_AOMAP' : '',
			parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
			parameters.bumpMap ? '#define USE_BUMPMAP' : '',
			parameters.normalMap ? '#define USE_NORMALMAP' : '',
			( parameters.normalMap && parameters.objectSpaceNormalMap ) ? '#define OBJECTSPACE_NORMALMAP' : '',
			( parameters.normalMap && parameters.tangentSpaceNormalMap ) ? '#define TANGENTSPACE_NORMALMAP' : '',
			parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
			parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
			parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
			parameters.specularMap ? '#define USE_SPECULARMAP' : '',
			parameters.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
			parameters.metalnessMap ? '#define USE_METALNESSMAP' : '',
			parameters.alphaMap ? '#define USE_ALPHAMAP' : '',

			parameters.sheen ? '#define USE_SHEEN' : '',
			parameters.transmissionMap ? '#define USE_TRANSMISSIONMAP' : '',

			parameters.vertexTangents ? '#define USE_TANGENT' : '',
			parameters.vertexColors || parameters.instancingColor ? '#define USE_COLOR' : '',
			parameters.vertexUvs ? '#define USE_UV' : '',
			parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',

			parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

			parameters.flatShading ? '#define FLAT_SHADED' : '',

			parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
			parameters.flipSided ? '#define FLIP_SIDED' : '',

			parameters.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
			parameters.shadowMapEnabled ? '#define ' + shadowMapTypeDefine : '',

			parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

			parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',

			parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
			( parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth ) ? '#define USE_LOGDEPTHBUF_EXT' : '',

			( ( parameters.extensionShaderTextureLOD || parameters.envMap ) && parameters.rendererExtensionShaderTextureLod ) ? '#define TEXTURE_LOD_EXT' : '',

			'uniform mat4 viewMatrix;',
			'uniform vec3 cameraPosition;',
			'uniform bool isOrthographic;',

			( parameters.toneMapping !== NoToneMapping ) ? '#define TONE_MAPPING' : '',
			( parameters.toneMapping !== NoToneMapping ) ? ShaderChunk[ 'tonemapping_pars_fragment' ] : '', // this code is required here because it is used by the toneMapping() function defined below
			( parameters.toneMapping !== NoToneMapping ) ? getToneMappingFunction( 'toneMapping', parameters.toneMapping ) : '',

			parameters.dithering ? '#define DITHERING' : '',

			ShaderChunk[ 'encodings_pars_fragment' ], // this code is required here because it is used by the various encoding/decoding function defined below
			parameters.map ? getTexelDecodingFunction( 'mapTexelToLinear', parameters.mapEncoding ) : '',
			parameters.matcap ? getTexelDecodingFunction( 'matcapTexelToLinear', parameters.matcapEncoding ) : '',
			parameters.envMap ? getTexelDecodingFunction( 'envMapTexelToLinear', parameters.envMapEncoding ) : '',
			parameters.emissiveMap ? getTexelDecodingFunction( 'emissiveMapTexelToLinear', parameters.emissiveMapEncoding ) : '',
			parameters.lightMap ? getTexelDecodingFunction( 'lightMapTexelToLinear', parameters.lightMapEncoding ) : '',
			getTexelEncodingFunction( 'linearToOutputTexel', parameters.outputEncoding ),

			parameters.depthPacking ? '#define DEPTH_PACKING ' + parameters.depthPacking : '',

			'\n'

		].filter( filterEmptyLine ).join( '\n' );

	}

	vertexShader = resolveIncludes( vertexShader );
	vertexShader = replaceLightNums( vertexShader, parameters );
	vertexShader = replaceClippingPlaneNums( vertexShader, parameters );

	fragmentShader = resolveIncludes( fragmentShader );
	fragmentShader = replaceLightNums( fragmentShader, parameters );
	fragmentShader = replaceClippingPlaneNums( fragmentShader, parameters );

	vertexShader = unrollLoops( vertexShader );
	fragmentShader = unrollLoops( fragmentShader );

	if ( parameters.isWebGL2 && parameters.isRawShaderMaterial !== true ) {

		// GLSL 3.0 conversion for built-in materials and ShaderMaterial

		versionString = '#version 300 es\n';

		prefixVertex = [
			'#define attribute in',
			'#define varying out',
			'#define texture2D texture'
		].join( '\n' ) + '\n' + prefixVertex;

		prefixFragment = [
			'#define varying in',
			( parameters.glslVersion === GLSL3 ) ? '' : 'out highp vec4 pc_fragColor;',
			( parameters.glslVersion === GLSL3 ) ? '' : '#define gl_FragColor pc_fragColor',
			'#define gl_FragDepthEXT gl_FragDepth',
			'#define texture2D texture',
			'#define textureCube texture',
			'#define texture2DProj textureProj',
			'#define texture2DLodEXT textureLod',
			'#define texture2DProjLodEXT textureProjLod',
			'#define textureCubeLodEXT textureLod',
			'#define texture2DGradEXT textureGrad',
			'#define texture2DProjGradEXT textureProjGrad',
			'#define textureCubeGradEXT textureGrad'
		].join( '\n' ) + '\n' + prefixFragment;

	}

	const vertexGlsl = versionString + prefixVertex + vertexShader;
	const fragmentGlsl = versionString + prefixFragment + fragmentShader;

	// console.log( '*VERTEX*', vertexGlsl );
	// console.log( '*FRAGMENT*', fragmentGlsl );

	const glVertexShader = WebGLShader( gl, 35633, vertexGlsl );
	const glFragmentShader = WebGLShader( gl, 35632, fragmentGlsl );

	gl.attachShader( program, glVertexShader );
	gl.attachShader( program, glFragmentShader );

	// Force a particular attribute to index 0.

	if ( parameters.index0AttributeName !== undefined ) {

		gl.bindAttribLocation( program, 0, parameters.index0AttributeName );

	} else if ( parameters.morphTargets === true ) {

		// programs with morphTargets displace position out of attribute 0
		gl.bindAttribLocation( program, 0, 'position' );

	}

	gl.linkProgram( program );

	// check for link errors
	if ( renderer.debug.checkShaderErrors ) {

		const programLog = gl.getProgramInfoLog( program ).trim();
		const vertexLog = gl.getShaderInfoLog( glVertexShader ).trim();
		const fragmentLog = gl.getShaderInfoLog( glFragmentShader ).trim();

		let runnable = true;
		let haveDiagnostics = true;

		if ( gl.getProgramParameter( program, 35714 ) === false ) {

			runnable = false;

			const vertexErrors = getShaderErrors( gl, glVertexShader, 'vertex' );
			const fragmentErrors = getShaderErrors( gl, glFragmentShader, 'fragment' );

			console.error( 'THREE.WebGLProgram: shader error: ', gl.getError(), '35715', gl.getProgramParameter( program, 35715 ), 'gl.getProgramInfoLog', programLog, vertexErrors, fragmentErrors );

		} else if ( programLog !== '' ) {

			console.warn( 'THREE.WebGLProgram: gl.getProgramInfoLog()', programLog );

		} else if ( vertexLog === '' || fragmentLog === '' ) {

			haveDiagnostics = false;

		}

		if ( haveDiagnostics ) {

			this.diagnostics = {

				runnable: runnable,

				programLog: programLog,

				vertexShader: {

					log: vertexLog,
					prefix: prefixVertex

				},

				fragmentShader: {

					log: fragmentLog,
					prefix: prefixFragment

				}

			};

		}

	}

	// Clean up

	// Crashes in iOS9 and iOS10. #18402
	// gl.detachShader( program, glVertexShader );
	// gl.detachShader( program, glFragmentShader );

	gl.deleteShader( glVertexShader );
	gl.deleteShader( glFragmentShader );

	// set up caching for uniform locations

	let cachedUniforms;

	this.getUniforms = function () {

		if ( cachedUniforms === undefined ) {

			cachedUniforms = new WebGLUniforms( gl, program );

		}

		return cachedUniforms;

	};

	// set up caching for attribute locations

	let cachedAttributes;

	this.getAttributes = function () {

		if ( cachedAttributes === undefined ) {

			cachedAttributes = fetchAttributeLocations( gl, program );

		}

		return cachedAttributes;

	};

	// free resource

	this.destroy = function () {

		bindingStates.releaseStatesOfProgram( this );

		gl.deleteProgram( program );
		this.program = undefined;

	};

	//

	this.name = parameters.shaderName;
	this.id = programIdCount ++;
	this.cacheKey = cacheKey;
	this.usedTimes = 1;
	this.program = program;
	this.vertexShader = glVertexShader;
	this.fragmentShader = glFragmentShader;

	return this;

}

function WebGLPrograms( renderer, cubemaps, extensions, capabilities, bindingStates, clipping ) {

	const programs = [];

	const isWebGL2 = capabilities.isWebGL2;
	const logarithmicDepthBuffer = capabilities.logarithmicDepthBuffer;
	const floatVertexTextures = capabilities.floatVertexTextures;
	const maxVertexUniforms = capabilities.maxVertexUniforms;
	const vertexTextures = capabilities.vertexTextures;

	let precision = capabilities.precision;

	const shaderIDs = {
		MeshDepthMaterial: 'depth',
		MeshDistanceMaterial: 'distanceRGBA',
		MeshNormalMaterial: 'normal',
		MeshBasicMaterial: 'basic',
		MeshLambertMaterial: 'lambert',
		MeshPhongMaterial: 'phong',
		MeshToonMaterial: 'toon',
		MeshStandardMaterial: 'physical',
		MeshPhysicalMaterial: 'physical',
		MeshMatcapMaterial: 'matcap',
		LineBasicMaterial: 'basic',
		LineDashedMaterial: 'dashed',
		PointsMaterial: 'points',
		ShadowMaterial: 'shadow',
		SpriteMaterial: 'sprite'
	};

	const parameterNames = [
		'precision', 'isWebGL2', 'supportsVertexTextures', 'outputEncoding', 'instancing', 'instancingColor',
		'map', 'mapEncoding', 'matcap', 'matcapEncoding', 'envMap', 'envMapMode', 'envMapEncoding', 'envMapCubeUV',
		'lightMap', 'lightMapEncoding', 'aoMap', 'emissiveMap', 'emissiveMapEncoding', 'bumpMap', 'normalMap', 'objectSpaceNormalMap', 'tangentSpaceNormalMap', 'clearcoatMap', 'clearcoatRoughnessMap', 'clearcoatNormalMap', 'displacementMap', 'specularMap',
		'roughnessMap', 'metalnessMap', 'gradientMap',
		'alphaMap', 'combine', 'vertexColors', 'vertexTangents', 'vertexUvs', 'uvsVertexOnly', 'fog', 'useFog', 'fogExp2',
		'flatShading', 'sizeAttenuation', 'logarithmicDepthBuffer', 'skinning',
		'maxBones', 'useVertexTexture', 'morphTargets', 'morphNormals',
		'maxMorphTargets', 'maxMorphNormals', 'premultipliedAlpha',
		'numDirLights', 'numPointLights', 'numSpotLights', 'numHemiLights', 'numRectAreaLights',
		'numDirLightShadows', 'numPointLightShadows', 'numSpotLightShadows',
		'shadowMapEnabled', 'shadowMapType', 'toneMapping', 'physicallyCorrectLights',
		'alphaTest', 'doubleSided', 'flipSided', 'numClippingPlanes', 'numClipIntersection', 'depthPacking', 'dithering',
		'sheen', 'transmissionMap'
	];

	function getMaxBones( object ) {

		const skeleton = object.skeleton;
		const bones = skeleton.bones;

		if ( floatVertexTextures ) {

			return 1024;

		} else {

			// default for when object is not specified
			// ( for example when prebuilding shader to be used with multiple objects )
			//
			//  - leave some extra space for other uniforms
			//  - limit here is ANGLE's 254 max uniform vectors
			//    (up to 54 should be safe)

			const nVertexUniforms = maxVertexUniforms;
			const nVertexMatrices = Math.floor( ( nVertexUniforms - 20 ) / 4 );

			const maxBones = Math.min( nVertexMatrices, bones.length );

			if ( maxBones < bones.length ) {

				console.warn( 'THREE.WebGLRenderer: Skeleton has ' + bones.length + ' bones. This GPU supports ' + maxBones + '.' );
				return 0;

			}

			return maxBones;

		}

	}

	function getTextureEncodingFromMap( map ) {

		let encoding;

		if ( map && map.isTexture ) {

			encoding = map.encoding;

		} else if ( map && map.isWebGLRenderTarget ) {

			console.warn( 'THREE.WebGLPrograms.getTextureEncodingFromMap: don\'t use render targets as textures. Use their .texture property instead.' );
			encoding = map.texture.encoding;

		} else {

			encoding = LinearEncoding;

		}

		return encoding;

	}

	function getParameters( material, lights, shadows, scene, object ) {

		const fog = scene.fog;
		const environment = material.isMeshStandardMaterial ? scene.environment : null;

		const envMap = cubemaps.get( material.envMap || environment );

		const shaderID = shaderIDs[ material.type ];

		// heuristics to create shader parameters according to lights in the scene
		// (not to blow over maxLights budget)

		const maxBones = object.isSkinnedMesh ? getMaxBones( object ) : 0;

		if ( material.precision !== null ) {

			precision = capabilities.getMaxPrecision( material.precision );

			if ( precision !== material.precision ) {

				console.warn( 'THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.' );

			}

		}

		let vertexShader, fragmentShader;

		if ( shaderID ) {

			const shader = ShaderLib[ shaderID ];

			vertexShader = shader.vertexShader;
			fragmentShader = shader.fragmentShader;

		} else {

			vertexShader = material.vertexShader;
			fragmentShader = material.fragmentShader;

		}

		const currentRenderTarget = renderer.getRenderTarget();

		const parameters = {

			isWebGL2: isWebGL2,

			shaderID: shaderID,
			shaderName: material.type,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			defines: material.defines,

			isRawShaderMaterial: material.isRawShaderMaterial === true,
			glslVersion: material.glslVersion,

			precision: precision,

			instancing: object.isInstancedMesh === true,
			instancingColor: object.isInstancedMesh === true && object.instanceColor !== null,

			supportsVertexTextures: vertexTextures,
			outputEncoding: ( currentRenderTarget !== null ) ? getTextureEncodingFromMap( currentRenderTarget.texture ) : renderer.outputEncoding,
			map: !! material.map,
			mapEncoding: getTextureEncodingFromMap( material.map ),
			matcap: !! material.matcap,
			matcapEncoding: getTextureEncodingFromMap( material.matcap ),
			envMap: !! envMap,
			envMapMode: envMap && envMap.mapping,
			envMapEncoding: getTextureEncodingFromMap( envMap ),
			envMapCubeUV: ( !! envMap ) && ( ( envMap.mapping === CubeUVReflectionMapping ) || ( envMap.mapping === CubeUVRefractionMapping ) ),
			lightMap: !! material.lightMap,
			lightMapEncoding: getTextureEncodingFromMap( material.lightMap ),
			aoMap: !! material.aoMap,
			emissiveMap: !! material.emissiveMap,
			emissiveMapEncoding: getTextureEncodingFromMap( material.emissiveMap ),
			bumpMap: !! material.bumpMap,
			normalMap: !! material.normalMap,
			objectSpaceNormalMap: material.normalMapType === ObjectSpaceNormalMap,
			tangentSpaceNormalMap: material.normalMapType === TangentSpaceNormalMap,
			clearcoatMap: !! material.clearcoatMap,
			clearcoatRoughnessMap: !! material.clearcoatRoughnessMap,
			clearcoatNormalMap: !! material.clearcoatNormalMap,
			displacementMap: !! material.displacementMap,
			roughnessMap: !! material.roughnessMap,
			metalnessMap: !! material.metalnessMap,
			specularMap: !! material.specularMap,
			alphaMap: !! material.alphaMap,

			gradientMap: !! material.gradientMap,

			sheen: !! material.sheen,

			transmissionMap: !! material.transmissionMap,

			combine: material.combine,

			vertexTangents: ( material.normalMap && material.vertexTangents ),
			vertexColors: material.vertexColors,
			vertexUvs: !! material.map || !! material.bumpMap || !! material.normalMap || !! material.specularMap || !! material.alphaMap || !! material.emissiveMap || !! material.roughnessMap || !! material.metalnessMap || !! material.clearcoatMap || !! material.clearcoatRoughnessMap || !! material.clearcoatNormalMap || !! material.displacementMap || !! material.transmissionMap,
			uvsVertexOnly: ! ( !! material.map || !! material.bumpMap || !! material.normalMap || !! material.specularMap || !! material.alphaMap || !! material.emissiveMap || !! material.roughnessMap || !! material.metalnessMap || !! material.clearcoatNormalMap || !! material.transmissionMap ) && !! material.displacementMap,

			fog: !! fog,
			useFog: material.fog,
			fogExp2: ( fog && fog.isFogExp2 ),

			flatShading: !! material.flatShading,

			sizeAttenuation: material.sizeAttenuation,
			logarithmicDepthBuffer: logarithmicDepthBuffer,

			skinning: material.skinning && maxBones > 0,
			maxBones: maxBones,
			useVertexTexture: floatVertexTextures,

			morphTargets: material.morphTargets,
			morphNormals: material.morphNormals,
			maxMorphTargets: renderer.maxMorphTargets,
			maxMorphNormals: renderer.maxMorphNormals,

			numDirLights: lights.directional.length,
			numPointLights: lights.point.length,
			numSpotLights: lights.spot.length,
			numRectAreaLights: lights.rectArea.length,
			numHemiLights: lights.hemi.length,

			numDirLightShadows: lights.directionalShadowMap.length,
			numPointLightShadows: lights.pointShadowMap.length,
			numSpotLightShadows: lights.spotShadowMap.length,

			numClippingPlanes: clipping.numPlanes,
			numClipIntersection: clipping.numIntersection,

			dithering: material.dithering,

			shadowMapEnabled: renderer.shadowMap.enabled && shadows.length > 0,
			shadowMapType: renderer.shadowMap.type,

			toneMapping: material.toneMapped ? renderer.toneMapping : NoToneMapping,
			physicallyCorrectLights: renderer.physicallyCorrectLights,

			premultipliedAlpha: material.premultipliedAlpha,

			alphaTest: material.alphaTest,
			doubleSided: material.side === DoubleSide,
			flipSided: material.side === BackSide,

			depthPacking: ( material.depthPacking !== undefined ) ? material.depthPacking : false,

			index0AttributeName: material.index0AttributeName,

			extensionDerivatives: material.extensions && material.extensions.derivatives,
			extensionFragDepth: material.extensions && material.extensions.fragDepth,
			extensionDrawBuffers: material.extensions && material.extensions.drawBuffers,
			extensionShaderTextureLOD: material.extensions && material.extensions.shaderTextureLOD,

			rendererExtensionFragDepth: isWebGL2 || extensions.has( 'EXT_frag_depth' ),
			rendererExtensionDrawBuffers: isWebGL2 || extensions.has( 'WEBGL_draw_buffers' ),
			rendererExtensionShaderTextureLod: isWebGL2 || extensions.has( 'EXT_shader_texture_lod' ),

			customProgramCacheKey: material.customProgramCacheKey()

		};

		return parameters;

	}

	function getProgramCacheKey( parameters ) {

		const array = [];

		if ( parameters.shaderID ) {

			array.push( parameters.shaderID );

		} else {

			array.push( parameters.fragmentShader );
			array.push( parameters.vertexShader );

		}

		if ( parameters.defines !== undefined ) {

			for ( const name in parameters.defines ) {

				array.push( name );
				array.push( parameters.defines[ name ] );

			}

		}

		if ( parameters.isRawShaderMaterial === false ) {

			for ( let i = 0; i < parameterNames.length; i ++ ) {

				array.push( parameters[ parameterNames[ i ] ] );

			}

			array.push( renderer.outputEncoding );
			array.push( renderer.gammaFactor );

		}

		array.push( parameters.customProgramCacheKey );

		return array.join();

	}

	function getUniforms( material ) {

		const shaderID = shaderIDs[ material.type ];
		let uniforms;

		if ( shaderID ) {

			const shader = ShaderLib[ shaderID ];
			uniforms = UniformsUtils.clone( shader.uniforms );

		} else {

			uniforms = material.uniforms;

		}

		return uniforms;

	}

	function acquireProgram( parameters, cacheKey ) {

		let program;

		// Check if code has been already compiled
		for ( let p = 0, pl = programs.length; p < pl; p ++ ) {

			const preexistingProgram = programs[ p ];

			if ( preexistingProgram.cacheKey === cacheKey ) {

				program = preexistingProgram;
				++ program.usedTimes;

				break;

			}

		}

		if ( program === undefined ) {

			program = new WebGLProgram( renderer, cacheKey, parameters, bindingStates );
			programs.push( program );

		}

		return program;

	}

	function releaseProgram( program ) {

		if ( -- program.usedTimes === 0 ) {

			// Remove from unordered set
			const i = programs.indexOf( program );
			programs[ i ] = programs[ programs.length - 1 ];
			programs.pop();

			// Free WebGL resources
			program.destroy();

		}

	}

	return {
		getParameters: getParameters,
		getProgramCacheKey: getProgramCacheKey,
		getUniforms: getUniforms,
		acquireProgram: acquireProgram,
		releaseProgram: releaseProgram,
		// Exposed for resource monitoring & error feedback via renderer.info:
		programs: programs
	};

}

function WebGLProperties() {

	let properties = new WeakMap();

	function get( object ) {

		let map = properties.get( object );

		if ( map === undefined ) {

			map = {};
			properties.set( object, map );

		}

		return map;

	}

	function remove( object ) {

		properties.delete( object );

	}

	function update( object, key, value ) {

		properties.get( object )[ key ] = value;

	}

	function dispose() {

		properties = new WeakMap();

	}

	return {
		get: get,
		remove: remove,
		update: update,
		dispose: dispose
	};

}

function painterSortStable( a, b ) {

	if ( a.groupOrder !== b.groupOrder ) {

		return a.groupOrder - b.groupOrder;

	} else if ( a.renderOrder !== b.renderOrder ) {

		return a.renderOrder - b.renderOrder;

	} else if ( a.program !== b.program ) {

		return a.program.id - b.program.id;

	} else if ( a.material.id !== b.material.id ) {

		return a.material.id - b.material.id;

	} else if ( a.z !== b.z ) {

		return a.z - b.z;

	} else {

		return a.id - b.id;

	}

}

function reversePainterSortStable( a, b ) {

	if ( a.groupOrder !== b.groupOrder ) {

		return a.groupOrder - b.groupOrder;

	} else if ( a.renderOrder !== b.renderOrder ) {

		return a.renderOrder - b.renderOrder;

	} else if ( a.z !== b.z ) {

		return b.z - a.z;

	} else {

		return a.id - b.id;

	}

}


function WebGLRenderList( properties ) {

	const renderItems = [];
	let renderItemsIndex = 0;

	const opaque = [];
	const transparent = [];

	const defaultProgram = { id: - 1 };

	function init() {

		renderItemsIndex = 0;

		opaque.length = 0;
		transparent.length = 0;

	}

	function getNextRenderItem( object, geometry, material, groupOrder, z, group ) {

		let renderItem = renderItems[ renderItemsIndex ];
		const materialProperties = properties.get( material );

		if ( renderItem === undefined ) {

			renderItem = {
				id: object.id,
				object: object,
				geometry: geometry,
				material: material,
				program: materialProperties.program || defaultProgram,
				groupOrder: groupOrder,
				renderOrder: object.renderOrder,
				z: z,
				group: group
			};

			renderItems[ renderItemsIndex ] = renderItem;

		} else {

			renderItem.id = object.id;
			renderItem.object = object;
			renderItem.geometry = geometry;
			renderItem.material = material;
			renderItem.program = materialProperties.program || defaultProgram;
			renderItem.groupOrder = groupOrder;
			renderItem.renderOrder = object.renderOrder;
			renderItem.z = z;
			renderItem.group = group;

		}

		renderItemsIndex ++;

		return renderItem;

	}

	function push( object, geometry, material, groupOrder, z, group ) {

		const renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

		( material.transparent === true ? transparent : opaque ).push( renderItem );

	}

	function unshift( object, geometry, material, groupOrder, z, group ) {

		const renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

		( material.transparent === true ? transparent : opaque ).unshift( renderItem );

	}

	function sort( customOpaqueSort, customTransparentSort ) {

		if ( opaque.length > 1 ) opaque.sort( customOpaqueSort || painterSortStable );
		if ( transparent.length > 1 ) transparent.sort( customTransparentSort || reversePainterSortStable );

	}

	function finish() {

		// Clear references from inactive renderItems in the list

		for ( let i = renderItemsIndex, il = renderItems.length; i < il; i ++ ) {

			const renderItem = renderItems[ i ];

			if ( renderItem.id === null ) break;

			renderItem.id = null;
			renderItem.object = null;
			renderItem.geometry = null;
			renderItem.material = null;
			renderItem.program = null;
			renderItem.group = null;

		}

	}

	return {

		opaque: opaque,
		transparent: transparent,

		init: init,
		push: push,
		unshift: unshift,
		finish: finish,

		sort: sort
	};

}

function WebGLRenderLists( properties ) {

	let lists = new WeakMap();

	function get( scene, renderCallDepth ) {

		let list;

		if ( lists.has( scene ) === false ) {

			list = new WebGLRenderList( properties );
			lists.set( scene, [ list ] );

		} else {

			if ( renderCallDepth >= lists.get( scene ).length ) {

				list = new WebGLRenderList( properties );
				lists.get( scene ).push( list );

			} else {

				list = lists.get( scene )[ renderCallDepth ];

			}

		}

		return list;

	}

	function dispose() {

		lists = new WeakMap();

	}

	return {
		get: get,
		dispose: dispose
	};

}

function UniformsCache() {

	const lights = {};

	return {

		get: function ( light ) {

			if ( lights[ light.id ] !== undefined ) {

				return lights[ light.id ];

			}

			let uniforms;

			switch ( light.type ) {

				case 'DirectionalLight':
					uniforms = {
						direction: new Vector3(),
						color: new Color()
					};
					break;

				case 'SpotLight':
					uniforms = {
						position: new Vector3(),
						direction: new Vector3(),
						color: new Color(),
						distance: 0,
						coneCos: 0,
						penumbraCos: 0,
						decay: 0
					};
					break;

				case 'PointLight':
					uniforms = {
						position: new Vector3(),
						color: new Color(),
						distance: 0,
						decay: 0
					};
					break;

				case 'HemisphereLight':
					uniforms = {
						direction: new Vector3(),
						skyColor: new Color(),
						groundColor: new Color()
					};
					break;

				case 'RectAreaLight':
					uniforms = {
						color: new Color(),
						position: new Vector3(),
						halfWidth: new Vector3(),
						halfHeight: new Vector3()
					};
					break;

			}

			lights[ light.id ] = uniforms;

			return uniforms;

		}

	};

}

function ShadowUniformsCache() {

	const lights = {};

	return {

		get: function ( light ) {

			if ( lights[ light.id ] !== undefined ) {

				return lights[ light.id ];

			}

			let uniforms;

			switch ( light.type ) {

				case 'DirectionalLight':
					uniforms = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2()
					};
					break;

				case 'SpotLight':
					uniforms = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2()
					};
					break;

				case 'PointLight':
					uniforms = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2(),
						shadowCameraNear: 1,
						shadowCameraFar: 1000
					};
					break;

				// TODO (abelnation): set RectAreaLight shadow uniforms

			}

			lights[ light.id ] = uniforms;

			return uniforms;

		}

	};

}



let nextVersion = 0;

function shadowCastingLightsFirst( lightA, lightB ) {

	return ( lightB.castShadow ? 1 : 0 ) - ( lightA.castShadow ? 1 : 0 );

}

function WebGLLights( extensions, capabilities ) {

	const cache = new UniformsCache();

	const shadowCache = ShadowUniformsCache();

	const state = {

		version: 0,

		hash: {
			directionalLength: - 1,
			pointLength: - 1,
			spotLength: - 1,
			rectAreaLength: - 1,
			hemiLength: - 1,

			numDirectionalShadows: - 1,
			numPointShadows: - 1,
			numSpotShadows: - 1
		},

		ambient: [ 0, 0, 0 ],
		probe: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotShadow: [],
		spotShadowMap: [],
		spotShadowMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: []

	};

	for ( let i = 0; i < 9; i ++ ) state.probe.push( new Vector3() );

	const vector3 = new Vector3();
	const matrix4 = new Matrix4();
	const matrix42 = new Matrix4();

	function setup( lights ) {

		let r = 0, g = 0, b = 0;

		for ( let i = 0; i < 9; i ++ ) state.probe[ i ].set( 0, 0, 0 );

		let directionalLength = 0;
		let pointLength = 0;
		let spotLength = 0;
		let rectAreaLength = 0;
		let hemiLength = 0;

		let numDirectionalShadows = 0;
		let numPointShadows = 0;
		let numSpotShadows = 0;

		lights.sort( shadowCastingLightsFirst );

		for ( let i = 0, l = lights.length; i < l; i ++ ) {

			const light = lights[ i ];

			const color = light.color;
			const intensity = light.intensity;
			const distance = light.distance;

			const shadowMap = ( light.shadow && light.shadow.map ) ? light.shadow.map.texture : null;

			if ( light.isAmbientLight ) {

				r += color.r * intensity;
				g += color.g * intensity;
				b += color.b * intensity;

			} else if ( light.isLightProbe ) {

				for ( let j = 0; j < 9; j ++ ) {

					state.probe[ j ].addScaledVector( light.sh.coefficients[ j ], intensity );

				}

			} else if ( light.isDirectionalLight ) {

				const uniforms = cache.get( light );

				uniforms.color.copy( light.color ).multiplyScalar( light.intensity );

				if ( light.castShadow ) {

					const shadow = light.shadow;

					const shadowUniforms = shadowCache.get( light );

					shadowUniforms.shadowBias = shadow.bias;
					shadowUniforms.shadowNormalBias = shadow.normalBias;
					shadowUniforms.shadowRadius = shadow.radius;
					shadowUniforms.shadowMapSize = shadow.mapSize;

					state.directionalShadow[ directionalLength ] = shadowUniforms;
					state.directionalShadowMap[ directionalLength ] = shadowMap;
					state.directionalShadowMatrix[ directionalLength ] = light.shadow.matrix;

					numDirectionalShadows ++;

				}

				state.directional[ directionalLength ] = uniforms;

				directionalLength ++;

			} else if ( light.isSpotLight ) {

				const uniforms = cache.get( light );

				uniforms.position.setFromMatrixPosition( light.matrixWorld );

				uniforms.color.copy( color ).multiplyScalar( intensity );
				uniforms.distance = distance;

				uniforms.coneCos = Math.cos( light.angle );
				uniforms.penumbraCos = Math.cos( light.angle * ( 1 - light.penumbra ) );
				uniforms.decay = light.decay;

				if ( light.castShadow ) {

					const shadow = light.shadow;

					const shadowUniforms = shadowCache.get( light );

					shadowUniforms.shadowBias = shadow.bias;
					shadowUniforms.shadowNormalBias = shadow.normalBias;
					shadowUniforms.shadowRadius = shadow.radius;
					shadowUniforms.shadowMapSize = shadow.mapSize;

					state.spotShadow[ spotLength ] = shadowUniforms;
					state.spotShadowMap[ spotLength ] = shadowMap;
					state.spotShadowMatrix[ spotLength ] = light.shadow.matrix;

					numSpotShadows ++;

				}

				state.spot[ spotLength ] = uniforms;

				spotLength ++;

			} else if ( light.isRectAreaLight ) {

				const uniforms = cache.get( light );

				// (a) intensity is the total visible light emitted
				//uniforms.color.copy( color ).multiplyScalar( intensity / ( light.width * light.height * Math.PI ) );

				// (b) intensity is the brightness of the light
				uniforms.color.copy( color ).multiplyScalar( intensity );

				uniforms.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
				uniforms.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

				state.rectArea[ rectAreaLength ] = uniforms;

				rectAreaLength ++;

			} else if ( light.isPointLight ) {

				const uniforms = cache.get( light );

				uniforms.color.copy( light.color ).multiplyScalar( light.intensity );
				uniforms.distance = light.distance;
				uniforms.decay = light.decay;

				if ( light.castShadow ) {

					const shadow = light.shadow;

					const shadowUniforms = shadowCache.get( light );

					shadowUniforms.shadowBias = shadow.bias;
					shadowUniforms.shadowNormalBias = shadow.normalBias;
					shadowUniforms.shadowRadius = shadow.radius;
					shadowUniforms.shadowMapSize = shadow.mapSize;
					shadowUniforms.shadowCameraNear = shadow.camera.near;
					shadowUniforms.shadowCameraFar = shadow.camera.far;

					state.pointShadow[ pointLength ] = shadowUniforms;
					state.pointShadowMap[ pointLength ] = shadowMap;
					state.pointShadowMatrix[ pointLength ] = light.shadow.matrix;

					numPointShadows ++;

				}

				state.point[ pointLength ] = uniforms;

				pointLength ++;

			} else if ( light.isHemisphereLight ) {

				const uniforms = cache.get( light );

				uniforms.skyColor.copy( light.color ).multiplyScalar( intensity );
				uniforms.groundColor.copy( light.groundColor ).multiplyScalar( intensity );

				state.hemi[ hemiLength ] = uniforms;

				hemiLength ++;

			}

		}

		if ( rectAreaLength > 0 ) {

			if ( capabilities.isWebGL2 ) {

				// WebGL 2

				state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
				state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;

			} else {

				// WebGL 1

				if ( extensions.has( 'OES_texture_float_linear' ) === true ) {

					state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
					state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;

				} else if ( extensions.has( 'OES_texture_half_float_linear' ) === true ) {

					state.rectAreaLTC1 = UniformsLib.LTC_HALF_1;
					state.rectAreaLTC2 = UniformsLib.LTC_HALF_2;

				} else {

					console.error( 'THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.' );

				}

			}

		}

		state.ambient[ 0 ] = r;
		state.ambient[ 1 ] = g;
		state.ambient[ 2 ] = b;

		const hash = state.hash;

		if ( hash.directionalLength !== directionalLength ||
			hash.pointLength !== pointLength ||
			hash.spotLength !== spotLength ||
			hash.rectAreaLength !== rectAreaLength ||
			hash.hemiLength !== hemiLength ||
			hash.numDirectionalShadows !== numDirectionalShadows ||
			hash.numPointShadows !== numPointShadows ||
			hash.numSpotShadows !== numSpotShadows ) {

			state.directional.length = directionalLength;
			state.spot.length = spotLength;
			state.rectArea.length = rectAreaLength;
			state.point.length = pointLength;
			state.hemi.length = hemiLength;

			state.directionalShadow.length = numDirectionalShadows;
			state.directionalShadowMap.length = numDirectionalShadows;
			state.pointShadow.length = numPointShadows;
			state.pointShadowMap.length = numPointShadows;
			state.spotShadow.length = numSpotShadows;
			state.spotShadowMap.length = numSpotShadows;
			state.directionalShadowMatrix.length = numDirectionalShadows;
			state.pointShadowMatrix.length = numPointShadows;
			state.spotShadowMatrix.length = numSpotShadows;

			hash.directionalLength = directionalLength;
			hash.pointLength = pointLength;
			hash.spotLength = spotLength;
			hash.rectAreaLength = rectAreaLength;
			hash.hemiLength = hemiLength;

			hash.numDirectionalShadows = numDirectionalShadows;
			hash.numPointShadows = numPointShadows;
			hash.numSpotShadows = numSpotShadows;

			state.version = nextVersion ++;

		}

	}

	function setupView( lights, camera ) {

		let directionalLength = 0;
		let pointLength = 0;
		let spotLength = 0;
		let rectAreaLength = 0;
		let hemiLength = 0;

		const viewMatrix = camera.matrixWorldInverse;

		for ( let i = 0, l = lights.length; i < l; i ++ ) {

			const light = lights[ i ];

			if ( light.isDirectionalLight ) {

				const uniforms = state.directional[ directionalLength ];

				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
				vector3.setFromMatrixPosition( light.target.matrixWorld );
				uniforms.direction.sub( vector3 );
				uniforms.direction.transformDirection( viewMatrix );

				directionalLength ++;

			} else if ( light.isSpotLight ) {

				const uniforms = state.spot[ spotLength ];

				uniforms.position.setFromMatrixPosition( light.matrixWorld );
				uniforms.position.applyMatrix4( viewMatrix );

				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
				vector3.setFromMatrixPosition( light.target.matrixWorld );
				uniforms.direction.sub( vector3 );
				uniforms.direction.transformDirection( viewMatrix );

				spotLength ++;

			} else if ( light.isRectAreaLight ) {

				const uniforms = state.rectArea[ rectAreaLength ];

				uniforms.position.setFromMatrixPosition( light.matrixWorld );
				uniforms.position.applyMatrix4( viewMatrix );

				// extract local rotation of light to derive width/height half vectors
				matrix42.identity();
				matrix4.copy( light.matrixWorld );
				matrix4.premultiply( viewMatrix );
				matrix42.extractRotation( matrix4 );

				uniforms.halfWidth.set( light.width * 0.5, 0.0, 0.0 );
				uniforms.halfHeight.set( 0.0, light.height * 0.5, 0.0 );

				uniforms.halfWidth.applyMatrix4( matrix42 );
				uniforms.halfHeight.applyMatrix4( matrix42 );

				rectAreaLength ++;

			} else if ( light.isPointLight ) {

				const uniforms = state.point[ pointLength ];

				uniforms.position.setFromMatrixPosition( light.matrixWorld );
				uniforms.position.applyMatrix4( viewMatrix );

				pointLength ++;

			} else if ( light.isHemisphereLight ) {

				const uniforms = state.hemi[ hemiLength ];

				uniforms.direction.setFromMatrixPosition( light.matrixWorld );
				uniforms.direction.transformDirection( viewMatrix );
				uniforms.direction.normalize();

				hemiLength ++;

			}

		}

	}

	return {
		setup: setup,
		setupView: setupView,
		state: state
	};

}

function WebGLRenderState( extensions, capabilities ) {

	const lights = new WebGLLights( extensions, capabilities );

	const lightsArray = [];
	const shadowsArray = [];

	function init() {

		lightsArray.length = 0;
		shadowsArray.length = 0;

	}

	function pushLight( light ) {

		lightsArray.push( light );

	}

	function pushShadow( shadowLight ) {

		shadowsArray.push( shadowLight );

	}

	function setupLights() {

		lights.setup( lightsArray );

	}

	function setupLightsView( camera ) {

		lights.setupView( lightsArray, camera );

	}

	const state = {
		lightsArray: lightsArray,
		shadowsArray: shadowsArray,

		lights: lights
	};

	return {
		init: init,
		state: state,
		setupLights: setupLights,
		setupLightsView: setupLightsView,

		pushLight: pushLight,
		pushShadow: pushShadow
	};

}

function WebGLRenderStates( extensions, capabilities ) {

	let renderStates = new WeakMap();

	function get( scene, renderCallDepth = 0 ) {

		let renderState;

		if ( renderStates.has( scene ) === false ) {

			renderState = new WebGLRenderState( extensions, capabilities );
			renderStates.set( scene, [ renderState ] );

		} else {

			if ( renderCallDepth >= renderStates.get( scene ).length ) {

				renderState = new WebGLRenderState( extensions, capabilities );
				renderStates.get( scene ).push( renderState );

			} else {

				renderState = renderStates.get( scene )[ renderCallDepth ];

			}

		}

		return renderState;

	}

	function dispose() {

		renderStates = new WeakMap();

	}

	return {
		get: get,
		dispose: dispose
	};

}

/**
 * parameters = {
 *
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */

class MeshDepthMaterial extends Material {

	constructor( parameters ) {

		super();

		this.type = 'MeshDepthMaterial';

		this.depthPacking = BasicDepthPacking;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.wireframe = false;
		this.wireframeLinewidth = 1;

		this.fog = false;

		this.setValues( parameters );

	}

	copy( source ) {

		super.copy( source );

		this.depthPacking = source.depthPacking;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;

		return this;

	}

}

MeshDepthMaterial.prototype.isMeshDepthMaterial = true;

/**
 * parameters = {
 *
 *  referencePosition: <float>,
 *  nearDistance: <float>,
 *  farDistance: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>
 *
 * }
 */

class MeshDistanceMaterial extends Material {

	constructor( parameters ) {

		super();

		this.type = 'MeshDistanceMaterial';

		this.referencePosition = new Vector3();
		this.nearDistance = 1;
		this.farDistance = 1000;

		this.skinning = false;
		this.morphTargets = false;

		this.map = null;

		this.alphaMap = null;

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.fog = false;

		this.setValues( parameters );

	}

	copy( source ) {

		super.copy( source );

		this.referencePosition.copy( source.referencePosition );
		this.nearDistance = source.nearDistance;
		this.farDistance = source.farDistance;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		return this;

	}

}

MeshDistanceMaterial.prototype.isMeshDistanceMaterial = true;

var vsm_frag = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );\n\tfor ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean * HALF_SAMPLE_RATE;\n\tsquared_mean = squared_mean * HALF_SAMPLE_RATE;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}";

var vsm_vert = "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}";

function WebGLShadowMap( _renderer, _objects, maxTextureSize ) {

	let _frustum = new Frustum();

	const _shadowMapSize = new Vector2(),
		_viewportSize = new Vector2(),

		_viewport = new Vector4(),

		_depthMaterials = [],
		_distanceMaterials = [],

		_materialCache = {};

	const shadowSide = { 0: BackSide, 1: FrontSide, 2: DoubleSide };

	const shadowMaterialVertical = new ShaderMaterial( {

		defines: {
			SAMPLE_RATE: 2.0 / 8.0,
			HALF_SAMPLE_RATE: 1.0 / 8.0
		},

		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new Vector2() },
			radius: { value: 4.0 }
		},

		vertexShader: vsm_vert,

		fragmentShader: vsm_frag

	} );

	const shadowMaterialHorizontal = shadowMaterialVertical.clone();
	shadowMaterialHorizontal.defines.HORIZONTAL_PASS = 1;

	const fullScreenTri = new BufferGeometry();
	fullScreenTri.setAttribute(
		'position',
		new BufferAttribute(
			new Float32Array( [ - 1, - 1, 0.5, 3, - 1, 0.5, - 1, 3, 0.5 ] ),
			3
		)
	);

	const fullScreenMesh = new Mesh( fullScreenTri, shadowMaterialVertical );

	const scope = this;

	this.enabled = false;

	this.autoUpdate = true;
	this.needsUpdate = false;

	this.type = PCFShadowMap;

	this.render = function ( lights, scene, camera ) {

		if ( scope.enabled === false ) return;
		if ( scope.autoUpdate === false && scope.needsUpdate === false ) return;

		if ( lights.length === 0 ) return;

		const currentRenderTarget = _renderer.getRenderTarget();
		const activeCubeFace = _renderer.getActiveCubeFace();
		const activeMipmapLevel = _renderer.getActiveMipmapLevel();

		const _state = _renderer.state;

		// Set GL state for depth map.
		_state.setBlending( NoBlending );
		_state.buffers.color.setClear( 1, 1, 1, 1 );
		_state.buffers.depth.setTest( true );
		_state.setScissorTest( false );

		// render depth map

		for ( let i = 0, il = lights.length; i < il; i ++ ) {

			const light = lights[ i ];
			const shadow = light.shadow;

			if ( shadow === undefined ) {

				console.warn( 'THREE.WebGLShadowMap:', light, 'has no shadow.' );
				continue;

			}

			if ( shadow.autoUpdate === false && shadow.needsUpdate === false ) continue;

			_shadowMapSize.copy( shadow.mapSize );

			const shadowFrameExtents = shadow.getFrameExtents();

			_shadowMapSize.multiply( shadowFrameExtents );

			_viewportSize.copy( shadow.mapSize );

			if ( _shadowMapSize.x > maxTextureSize || _shadowMapSize.y > maxTextureSize ) {

				if ( _shadowMapSize.x > maxTextureSize ) {

					_viewportSize.x = Math.floor( maxTextureSize / shadowFrameExtents.x );
					_shadowMapSize.x = _viewportSize.x * shadowFrameExtents.x;
					shadow.mapSize.x = _viewportSize.x;

				}

				if ( _shadowMapSize.y > maxTextureSize ) {

					_viewportSize.y = Math.floor( maxTextureSize / shadowFrameExtents.y );
					_shadowMapSize.y = _viewportSize.y * shadowFrameExtents.y;
					shadow.mapSize.y = _viewportSize.y;

				}

			}

			if ( shadow.map === null && ! shadow.isPointLightShadow && this.type === VSMShadowMap ) {

				const pars = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBAFormat };

				shadow.map = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars );
				shadow.map.texture.name = light.name + '.shadowMap';

				shadow.mapPass = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars );

				shadow.camera.updateProjectionMatrix();

			}

			if ( shadow.map === null ) {

				const pars = { minFilter: NearestFilter, magFilter: NearestFilter, format: RGBAFormat };

				shadow.map = new WebGLRenderTarget( _shadowMapSize.x, _shadowMapSize.y, pars );
				shadow.map.texture.name = light.name + '.shadowMap';

				shadow.camera.updateProjectionMatrix();

			}

			_renderer.setRenderTarget( shadow.map );
			_renderer.clear();

			const viewportCount = shadow.getViewportCount();

			for ( let vp = 0; vp < viewportCount; vp ++ ) {

				const viewport = shadow.getViewport( vp );

				_viewport.set(
					_viewportSize.x * viewport.x,
					_viewportSize.y * viewport.y,
					_viewportSize.x * viewport.z,
					_viewportSize.y * viewport.w
				);

				_state.viewport( _viewport );

				shadow.updateMatrices( light, vp );

				_frustum = shadow.getFrustum();

				renderObject( scene, camera, shadow.camera, light, this.type );

			}

			// do blur pass for VSM

			if ( ! shadow.isPointLightShadow && this.type === VSMShadowMap ) {

				VSMPass( shadow, camera );

			}

			shadow.needsUpdate = false;

		}

		scope.needsUpdate = false;

		_renderer.setRenderTarget( currentRenderTarget, activeCubeFace, activeMipmapLevel );

	};

	function VSMPass( shadow, camera ) {

		const geometry = _objects.update( fullScreenMesh );

		// vertical pass

		shadowMaterialVertical.uniforms.shadow_pass.value = shadow.map.texture;
		shadowMaterialVertical.uniforms.resolution.value = shadow.mapSize;
		shadowMaterialVertical.uniforms.radius.value = shadow.radius;
		_renderer.setRenderTarget( shadow.mapPass );
		_renderer.clear();
		_renderer.renderBufferDirect( camera, null, geometry, shadowMaterialVertical, fullScreenMesh, null );

		// horizontal pass

		shadowMaterialHorizontal.uniforms.shadow_pass.value = shadow.mapPass.texture;
		shadowMaterialHorizontal.uniforms.resolution.value = shadow.mapSize;
		shadowMaterialHorizontal.uniforms.radius.value = shadow.radius;
		_renderer.setRenderTarget( shadow.map );
		_renderer.clear();
		_renderer.renderBufferDirect( camera, null, geometry, shadowMaterialHorizontal, fullScreenMesh, null );

	}

	function getDepthMaterialVariant( useMorphing, useSkinning, useInstancing ) {

		const index = useMorphing << 0 | useSkinning << 1 | useInstancing << 2;

		let material = _depthMaterials[ index ];

		if ( material === undefined ) {

			material = new MeshDepthMaterial( {

				depthPacking: RGBADepthPacking,

				morphTargets: useMorphing,
				skinning: useSkinning

			} );

			_depthMaterials[ index ] = material;

		}

		return material;

	}

	function getDistanceMaterialVariant( useMorphing, useSkinning, useInstancing ) {

		const index = useMorphing << 0 | useSkinning << 1 | useInstancing << 2;

		let material = _distanceMaterials[ index ];

		if ( material === undefined ) {

			material = new MeshDistanceMaterial( {

				morphTargets: useMorphing,
				skinning: useSkinning

			} );

			_distanceMaterials[ index ] = material;

		}

		return material;

	}

	function getDepthMaterial( object, geometry, material, light, shadowCameraNear, shadowCameraFar, type ) {

		let result = null;

		let getMaterialVariant = getDepthMaterialVariant;
		let customMaterial = object.customDepthMaterial;

		if ( light.isPointLight === true ) {

			getMaterialVariant = getDistanceMaterialVariant;
			customMaterial = object.customDistanceMaterial;

		}

		if ( customMaterial === undefined ) {

			let useMorphing = false;

			if ( material.morphTargets === true ) {

				useMorphing = geometry.morphAttributes && geometry.morphAttributes.position && geometry.morphAttributes.position.length > 0;

			}

			let useSkinning = false;

			if ( object.isSkinnedMesh === true ) {

				if ( material.skinning === true ) {

					useSkinning = true;

				} else {

					console.warn( 'THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:', object );

				}

			}

			const useInstancing = object.isInstancedMesh === true;

			result = getMaterialVariant( useMorphing, useSkinning, useInstancing );

		} else {

			result = customMaterial;

		}

		if ( _renderer.localClippingEnabled &&
				material.clipShadows === true &&
				material.clippingPlanes.length !== 0 ) {

			// in this case we need a unique material instance reflecting the
			// appropriate state

			const keyA = result.uuid, keyB = material.uuid;

			let materialsForVariant = _materialCache[ keyA ];

			if ( materialsForVariant === undefined ) {

				materialsForVariant = {};
				_materialCache[ keyA ] = materialsForVariant;

			}

			let cachedMaterial = materialsForVariant[ keyB ];

			if ( cachedMaterial === undefined ) {

				cachedMaterial = result.clone();
				materialsForVariant[ keyB ] = cachedMaterial;

			}

			result = cachedMaterial;

		}

		result.visible = material.visible;
		result.wireframe = material.wireframe;

		if ( type === VSMShadowMap ) {

			result.side = ( material.shadowSide !== null ) ? material.shadowSide : material.side;

		} else {

			result.side = ( material.shadowSide !== null ) ? material.shadowSide : shadowSide[ material.side ];

		}

		result.clipShadows = material.clipShadows;
		result.clippingPlanes = material.clippingPlanes;
		result.clipIntersection = material.clipIntersection;

		result.wireframeLinewidth = material.wireframeLinewidth;
		result.linewidth = material.linewidth;

		if ( light.isPointLight === true && result.isMeshDistanceMaterial === true ) {

			result.referencePosition.setFromMatrixPosition( light.matrixWorld );
			result.nearDistance = shadowCameraNear;
			result.farDistance = shadowCameraFar;

		}

		return result;

	}

	function renderObject( object, camera, shadowCamera, light, type ) {

		if ( object.visible === false ) return;

		const visible = object.layers.test( camera.layers );

		if ( visible && ( object.isMesh || object.isLine || object.isPoints ) ) {

			if ( ( object.castShadow || ( object.receiveShadow && type === VSMShadowMap ) ) && ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) ) {

				object.modelViewMatrix.multiplyMatrices( shadowCamera.matrixWorldInverse, object.matrixWorld );

				const geometry = _objects.update( object );
				const material = object.material;

				if ( Array.isArray( material ) ) {

					const groups = geometry.groups;

					for ( let k = 0, kl = groups.length; k < kl; k ++ ) {

						const group = groups[ k ];
						const groupMaterial = material[ group.materialIndex ];

						if ( groupMaterial && groupMaterial.visible ) {

							const depthMaterial = getDepthMaterial( object, geometry, groupMaterial, light, shadowCamera.near, shadowCamera.far, type );

							_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, group );

						}

					}

				} else if ( material.visible ) {

					const depthMaterial = getDepthMaterial( object, geometry, material, light, shadowCamera.near, shadowCamera.far, type );

					_renderer.renderBufferDirect( shadowCamera, null, geometry, depthMaterial, object, null );

				}

			}

		}

		const children = object.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			renderObject( children[ i ], camera, shadowCamera, light, type );

		}

	}

}

function WebGLState( gl, extensions, capabilities ) {

	const isWebGL2 = capabilities.isWebGL2;

	function ColorBuffer() {

		let locked = false;

		const color = new Vector4();
		let currentColorMask = null;
		const currentColorClear = new Vector4( 0, 0, 0, 0 );

		return {

			setMask: function ( colorMask ) {

				if ( currentColorMask !== colorMask && ! locked ) {

					gl.colorMask( colorMask, colorMask, colorMask, colorMask );
					currentColorMask = colorMask;

				}

			},

			setLocked: function ( lock ) {

				locked = lock;

			},

			setClear: function ( r, g, b, a, premultipliedAlpha ) {

				if ( premultipliedAlpha === true ) {

					r *= a; g *= a; b *= a;

				}

				color.set( r, g, b, a );

				if ( currentColorClear.equals( color ) === false ) {

					gl.clearColor( r, g, b, a );
					currentColorClear.copy( color );

				}

			},

			reset: function () {

				locked = false;

				currentColorMask = null;
				currentColorClear.set( - 1, 0, 0, 0 ); // set to invalid state

			}

		};

	}

	function DepthBuffer() {

		let locked = false;

		let currentDepthMask = null;
		let currentDepthFunc = null;
		let currentDepthClear = null;

		return {

			setTest: function ( depthTest ) {

				if ( depthTest ) {

					enable( 2929 );

				} else {

					disable( 2929 );

				}

			},

			setMask: function ( depthMask ) {

				if ( currentDepthMask !== depthMask && ! locked ) {

					gl.depthMask( depthMask );
					currentDepthMask = depthMask;

				}

			},

			setFunc: function ( depthFunc ) {

				if ( currentDepthFunc !== depthFunc ) {

					if ( depthFunc ) {

						switch ( depthFunc ) {

							case NeverDepth:

								gl.depthFunc( 512 );
								break;

							case AlwaysDepth:

								gl.depthFunc( 519 );
								break;

							case LessDepth:

								gl.depthFunc( 513 );
								break;

							case LessEqualDepth:

								gl.depthFunc( 515 );
								break;

							case EqualDepth:

								gl.depthFunc( 514 );
								break;

							case GreaterEqualDepth:

								gl.depthFunc( 518 );
								break;

							case GreaterDepth:

								gl.depthFunc( 516 );
								break;

							case NotEqualDepth:

								gl.depthFunc( 517 );
								break;

							default:

								gl.depthFunc( 515 );

						}

					} else {

						gl.depthFunc( 515 );

					}

					currentDepthFunc = depthFunc;

				}

			},

			setLocked: function ( lock ) {

				locked = lock;

			},

			setClear: function ( depth ) {

				if ( currentDepthClear !== depth ) {

					gl.clearDepth( depth );
					currentDepthClear = depth;

				}

			},

			reset: function () {

				locked = false;

				currentDepthMask = null;
				currentDepthFunc = null;
				currentDepthClear = null;

			}

		};

	}

	function StencilBuffer() {

		let locked = false;

		let currentStencilMask = null;
		let currentStencilFunc = null;
		let currentStencilRef = null;
		let currentStencilFuncMask = null;
		let currentStencilFail = null;
		let currentStencilZFail = null;
		let currentStencilZPass = null;
		let currentStencilClear = null;

		return {

			setTest: function ( stencilTest ) {

				if ( ! locked ) {

					if ( stencilTest ) {

						enable( 2960 );

					} else {

						disable( 2960 );

					}

				}

			},

			setMask: function ( stencilMask ) {

				if ( currentStencilMask !== stencilMask && ! locked ) {

					gl.stencilMask( stencilMask );
					currentStencilMask = stencilMask;

				}

			},

			setFunc: function ( stencilFunc, stencilRef, stencilMask ) {

				if ( currentStencilFunc !== stencilFunc ||
				     currentStencilRef !== stencilRef ||
				     currentStencilFuncMask !== stencilMask ) {

					gl.stencilFunc( stencilFunc, stencilRef, stencilMask );

					currentStencilFunc = stencilFunc;
					currentStencilRef = stencilRef;
					currentStencilFuncMask = stencilMask;

				}

			},

			setOp: function ( stencilFail, stencilZFail, stencilZPass ) {

				if ( currentStencilFail !== stencilFail ||
				     currentStencilZFail !== stencilZFail ||
				     currentStencilZPass !== stencilZPass ) {

					gl.stencilOp( stencilFail, stencilZFail, stencilZPass );

					currentStencilFail = stencilFail;
					currentStencilZFail = stencilZFail;
					currentStencilZPass = stencilZPass;

				}

			},

			setLocked: function ( lock ) {

				locked = lock;

			},

			setClear: function ( stencil ) {

				if ( currentStencilClear !== stencil ) {

					gl.clearStencil( stencil );
					currentStencilClear = stencil;

				}

			},

			reset: function () {

				locked = false;

				currentStencilMask = null;
				currentStencilFunc = null;
				currentStencilRef = null;
				currentStencilFuncMask = null;
				currentStencilFail = null;
				currentStencilZFail = null;
				currentStencilZPass = null;
				currentStencilClear = null;

			}

		};

	}

	//

	const colorBuffer = new ColorBuffer();
	const depthBuffer = new DepthBuffer();
	const stencilBuffer = new StencilBuffer();

	let enabledCapabilities = {};

	let currentProgram = null;

	let currentBlendingEnabled = false;
	let currentBlending = null;
	let currentBlendEquation = null;
	let currentBlendSrc = null;
	let currentBlendDst = null;
	let currentBlendEquationAlpha = null;
	let currentBlendSrcAlpha = null;
	let currentBlendDstAlpha = null;
	let currentPremultipledAlpha = false;

	let currentFlipSided = null;
	let currentCullFace = null;

	let currentLineWidth = null;

	let currentPolygonOffsetFactor = null;
	let currentPolygonOffsetUnits = null;

	const maxTextures = gl.getParameter( 35661 );

	let lineWidthAvailable = false;
	let version = 0;
	const glVersion = gl.getParameter( 7938 );

	if ( glVersion.indexOf( 'WebGL' ) !== - 1 ) {

		version = parseFloat( /^WebGL (\d)/.exec( glVersion )[ 1 ] );
		lineWidthAvailable = ( version >= 1.0 );

	} else if ( glVersion.indexOf( 'OpenGL ES' ) !== - 1 ) {

		version = parseFloat( /^OpenGL ES (\d)/.exec( glVersion )[ 1 ] );
		lineWidthAvailable = ( version >= 2.0 );

	}

	let currentTextureSlot = null;
	let currentBoundTextures = {};

	const currentScissor = new Vector4();
	const currentViewport = new Vector4();

	function createTexture( type, target, count ) {

		const data = new Uint8Array( 4 ); // 4 is required to match default unpack alignment of 4.
		const texture = gl.createTexture();

		gl.bindTexture( type, texture );
		gl.texParameteri( type, 10241, 9728 );
		gl.texParameteri( type, 10240, 9728 );

		for ( let i = 0; i < count; i ++ ) {

			gl.texImage2D( target + i, 0, 6408, 1, 1, 0, 6408, 5121, data );

		}

		return texture;

	}

	const emptyTextures = {};
	emptyTextures[ 3553 ] = createTexture( 3553, 3553, 1 );
	emptyTextures[ 34067 ] = createTexture( 34067, 34069, 6 );

	// init

	colorBuffer.setClear( 0, 0, 0, 1 );
	depthBuffer.setClear( 1 );
	stencilBuffer.setClear( 0 );

	enable( 2929 );
	depthBuffer.setFunc( LessEqualDepth );

	setFlipSided( false );
	setCullFace( CullFaceBack );
	enable( 2884 );

	setBlending( NoBlending );

	//

	function enable( id ) {

		if ( enabledCapabilities[ id ] !== true ) {

			gl.enable( id );
			enabledCapabilities[ id ] = true;

		}

	}

	function disable( id ) {

		if ( enabledCapabilities[ id ] !== false ) {

			gl.disable( id );
			enabledCapabilities[ id ] = false;

		}

	}

	function useProgram( program ) {

		if ( currentProgram !== program ) {

			gl.useProgram( program );

			currentProgram = program;

			return true;

		}

		return false;

	}

	const equationToGL = {
		[ AddEquation ]: 32774,
		[ SubtractEquation ]: 32778,
		[ ReverseSubtractEquation ]: 32779
	};

	if ( isWebGL2 ) {

		equationToGL[ MinEquation ] = 32775;
		equationToGL[ MaxEquation ] = 32776;

	} else {

		const extension = extensions.get( 'EXT_blend_minmax' );

		if ( extension !== null ) {

			equationToGL[ MinEquation ] = extension.MIN_EXT;
			equationToGL[ MaxEquation ] = extension.MAX_EXT;

		}

	}

	const factorToGL = {
		[ ZeroFactor ]: 0,
		[ OneFactor ]: 1,
		[ SrcColorFactor ]: 768,
		[ SrcAlphaFactor ]: 770,
		[ SrcAlphaSaturateFactor ]: 776,
		[ DstColorFactor ]: 774,
		[ DstAlphaFactor ]: 772,
		[ OneMinusSrcColorFactor ]: 769,
		[ OneMinusSrcAlphaFactor ]: 771,
		[ OneMinusDstColorFactor ]: 775,
		[ OneMinusDstAlphaFactor ]: 773
	};

	function setBlending( blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha ) {

		if ( blending === NoBlending ) {

			if ( currentBlendingEnabled === true ) {

				disable( 3042 );
				currentBlendingEnabled = false;

			}

			return;

		}

		if ( currentBlendingEnabled === false ) {

			enable( 3042 );
			currentBlendingEnabled = true;

		}

		if ( blending !== CustomBlending ) {

			if ( blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha ) {

				if ( currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation ) {

					gl.blendEquation( 32774 );

					currentBlendEquation = AddEquation;
					currentBlendEquationAlpha = AddEquation;

				}

				if ( premultipliedAlpha ) {

					switch ( blending ) {

						case NormalBlending:
							gl.blendFuncSeparate( 1, 771, 1, 771 );
							break;

						case AdditiveBlending:
							gl.blendFunc( 1, 1 );
							break;

						case SubtractiveBlending:
							gl.blendFuncSeparate( 0, 0, 769, 771 );
							break;

						case MultiplyBlending:
							gl.blendFuncSeparate( 0, 768, 0, 770 );
							break;

						default:
							console.error( 'THREE.WebGLState: Invalid blending: ', blending );
							break;

					}

				} else {

					switch ( blending ) {

						case NormalBlending:
							gl.blendFuncSeparate( 770, 771, 1, 771 );
							break;

						case AdditiveBlending:
							gl.blendFunc( 770, 1 );
							break;

						case SubtractiveBlending:
							gl.blendFunc( 0, 769 );
							break;

						case MultiplyBlending:
							gl.blendFunc( 0, 768 );
							break;

						default:
							console.error( 'THREE.WebGLState: Invalid blending: ', blending );
							break;

					}

				}

				currentBlendSrc = null;
				currentBlendDst = null;
				currentBlendSrcAlpha = null;
				currentBlendDstAlpha = null;

				currentBlending = blending;
				currentPremultipledAlpha = premultipliedAlpha;

			}

			return;

		}

		// custom blending

		blendEquationAlpha = blendEquationAlpha || blendEquation;
		blendSrcAlpha = blendSrcAlpha || blendSrc;
		blendDstAlpha = blendDstAlpha || blendDst;

		if ( blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha ) {

			gl.blendEquationSeparate( equationToGL[ blendEquation ], equationToGL[ blendEquationAlpha ] );

			currentBlendEquation = blendEquation;
			currentBlendEquationAlpha = blendEquationAlpha;

		}

		if ( blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha ) {

			gl.blendFuncSeparate( factorToGL[ blendSrc ], factorToGL[ blendDst ], factorToGL[ blendSrcAlpha ], factorToGL[ blendDstAlpha ] );

			currentBlendSrc = blendSrc;
			currentBlendDst = blendDst;
			currentBlendSrcAlpha = blendSrcAlpha;
			currentBlendDstAlpha = blendDstAlpha;

		}

		currentBlending = blending;
		currentPremultipledAlpha = null;

	}

	function setMaterial( material, frontFaceCW ) {

		material.side === DoubleSide
			? disable( 2884 )
			: enable( 2884 );

		let flipSided = ( material.side === BackSide );
		if ( frontFaceCW ) flipSided = ! flipSided;

		setFlipSided( flipSided );

		( material.blending === NormalBlending && material.transparent === false )
			? setBlending( NoBlending )
			: setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha );

		depthBuffer.setFunc( material.depthFunc );
		depthBuffer.setTest( material.depthTest );
		depthBuffer.setMask( material.depthWrite );
		colorBuffer.setMask( material.colorWrite );

		const stencilWrite = material.stencilWrite;
		stencilBuffer.setTest( stencilWrite );
		if ( stencilWrite ) {

			stencilBuffer.setMask( material.stencilWriteMask );
			stencilBuffer.setFunc( material.stencilFunc, material.stencilRef, material.stencilFuncMask );
			stencilBuffer.setOp( material.stencilFail, material.stencilZFail, material.stencilZPass );

		}

		setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

	}

	//

	function setFlipSided( flipSided ) {

		if ( currentFlipSided !== flipSided ) {

			if ( flipSided ) {

				gl.frontFace( 2304 );

			} else {

				gl.frontFace( 2305 );

			}

			currentFlipSided = flipSided;

		}

	}

	function setCullFace( cullFace ) {

		if ( cullFace !== CullFaceNone ) {

			enable( 2884 );

			if ( cullFace !== currentCullFace ) {

				if ( cullFace === CullFaceBack ) {

					gl.cullFace( 1029 );

				} else if ( cullFace === CullFaceFront ) {

					gl.cullFace( 1028 );

				} else {

					gl.cullFace( 1032 );

				}

			}

		} else {

			disable( 2884 );

		}

		currentCullFace = cullFace;

	}

	function setLineWidth( width ) {

		if ( width !== currentLineWidth ) {

			if ( lineWidthAvailable ) gl.lineWidth( width );

			currentLineWidth = width;

		}

	}

	function setPolygonOffset( polygonOffset, factor, units ) {

		if ( polygonOffset ) {

			enable( 32823 );

			if ( currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units ) {

				gl.polygonOffset( factor, units );

				currentPolygonOffsetFactor = factor;
				currentPolygonOffsetUnits = units;

			}

		} else {

			disable( 32823 );

		}

	}

	function setScissorTest( scissorTest ) {

		if ( scissorTest ) {

			enable( 3089 );

		} else {

			disable( 3089 );

		}

	}

	// texture

	function activeTexture( webglSlot ) {

		if ( webglSlot === undefined ) webglSlot = 33984 + maxTextures - 1;

		if ( currentTextureSlot !== webglSlot ) {

			gl.activeTexture( webglSlot );
			currentTextureSlot = webglSlot;

		}

	}

	function bindTexture( webglType, webglTexture ) {

		if ( currentTextureSlot === null ) {

			activeTexture();

		}

		let boundTexture = currentBoundTextures[ currentTextureSlot ];

		if ( boundTexture === undefined ) {

			boundTexture = { type: undefined, texture: undefined };
			currentBoundTextures[ currentTextureSlot ] = boundTexture;

		}

		if ( boundTexture.type !== webglType || boundTexture.texture !== webglTexture ) {

			gl.bindTexture( webglType, webglTexture || emptyTextures[ webglType ] );

			boundTexture.type = webglType;
			boundTexture.texture = webglTexture;

		}

	}

	function unbindTexture() {

		const boundTexture = currentBoundTextures[ currentTextureSlot ];

		if ( boundTexture !== undefined && boundTexture.type !== undefined ) {

			gl.bindTexture( boundTexture.type, null );

			boundTexture.type = undefined;
			boundTexture.texture = undefined;

		}

	}

	function compressedTexImage2D() {

		try {

			gl.compressedTexImage2D.apply( gl, arguments );

		} catch ( error ) {

			console.error( 'THREE.WebGLState:', error );

		}

	}

	function texImage2D() {

		try {

			gl.texImage2D.apply( gl, arguments );

		} catch ( error ) {

			console.error( 'THREE.WebGLState:', error );

		}

	}

	function texImage3D() {

		try {

			gl.texImage3D.apply( gl, arguments );

		} catch ( error ) {

			console.error( 'THREE.WebGLState:', error );

		}

	}

	//

	function scissor( scissor ) {

		if ( currentScissor.equals( scissor ) === false ) {

			gl.scissor( scissor.x, scissor.y, scissor.z, scissor.w );
			currentScissor.copy( scissor );

		}

	}

	function viewport( viewport ) {

		if ( currentViewport.equals( viewport ) === false ) {

			gl.viewport( viewport.x, viewport.y, viewport.z, viewport.w );
			currentViewport.copy( viewport );

		}

	}

	//

	function reset() {

		// reset state

		gl.disable( 3042 );
		gl.disable( 2884 );
		gl.disable( 2929 );
		gl.disable( 32823 );
		gl.disable( 3089 );
		gl.disable( 2960 );

		gl.blendEquation( 32774 );
		gl.blendFunc( 1, 0 );
		gl.blendFuncSeparate( 1, 0, 1, 0 );

		gl.colorMask( true, true, true, true );
		gl.clearColor( 0, 0, 0, 0 );

		gl.depthMask( true );
		gl.depthFunc( 513 );
		gl.clearDepth( 1 );

		gl.stencilMask( 0xffffffff );
		gl.stencilFunc( 519, 0, 0xffffffff );
		gl.stencilOp( 7680, 7680, 7680 );
		gl.clearStencil( 0 );

		gl.cullFace( 1029 );
		gl.frontFace( 2305 );

		gl.polygonOffset( 0, 0 );

		gl.activeTexture( 33984 );

		gl.useProgram( null );

		gl.lineWidth( 1 );

		gl.scissor( 0, 0, gl.canvas.width, gl.canvas.height );
		gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );

		// reset internals

		enabledCapabilities = {};

		currentTextureSlot = null;
		currentBoundTextures = {};

		currentProgram = null;

		currentBlendingEnabled = false;
		currentBlending = null;
		currentBlendEquation = null;
		currentBlendSrc = null;
		currentBlendDst = null;
		currentBlendEquationAlpha = null;
		currentBlendSrcAlpha = null;
		currentBlendDstAlpha = null;
		currentPremultipledAlpha = false;

		currentFlipSided = null;
		currentCullFace = null;

		currentLineWidth = null;

		currentPolygonOffsetFactor = null;
		currentPolygonOffsetUnits = null;

		colorBuffer.reset();
		depthBuffer.reset();
		stencilBuffer.reset();

	}

	return {

		buffers: {
			color: colorBuffer,
			depth: depthBuffer,
			stencil: stencilBuffer
		},

		enable: enable,
		disable: disable,

		useProgram: useProgram,

		setBlending: setBlending,
		setMaterial: setMaterial,

		setFlipSided: setFlipSided,
		setCullFace: setCullFace,

		setLineWidth: setLineWidth,
		setPolygonOffset: setPolygonOffset,

		setScissorTest: setScissorTest,

		activeTexture: activeTexture,
		bindTexture: bindTexture,
		unbindTexture: unbindTexture,
		compressedTexImage2D: compressedTexImage2D,
		texImage2D: texImage2D,
		texImage3D: texImage3D,

		scissor: scissor,
		viewport: viewport,

		reset: reset

	};

}

function WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info ) {

	const isWebGL2 = capabilities.isWebGL2;
	const maxTextures = capabilities.maxTextures;
	const maxCubemapSize = capabilities.maxCubemapSize;
	const maxTextureSize = capabilities.maxTextureSize;
	const maxSamples = capabilities.maxSamples;

	const _videoTextures = new WeakMap();
	let _canvas;

	// cordova iOS (as of 5.0) still uses UIWebView, which provides OffscreenCanvas,
	// also OffscreenCanvas.getContext("webgl"), but not OffscreenCanvas.getContext("2d")!
	// Some implementations may only implement OffscreenCanvas partially (e.g. lacking 2d).

	let useOffscreenCanvas = false;

	try {

		useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined'
			&& ( new OffscreenCanvas( 1, 1 ).getContext( '2d' ) ) !== null;

	} catch ( err ) {

		// Ignore any errors

	}

	function createCanvas( width, height ) {

		// Use OffscreenCanvas when available. Specially needed in web workers

		return useOffscreenCanvas ?
			new OffscreenCanvas( width, height ) :
			document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );

	}

	function resizeImage( image, needsPowerOfTwo, needsNewCanvas, maxSize ) {

		let scale = 1;

		// handle case if texture exceeds max size

		if ( image.width > maxSize || image.height > maxSize ) {

			scale = maxSize / Math.max( image.width, image.height );

		}

		// only perform resize if necessary

		if ( scale < 1 || needsPowerOfTwo === true ) {

			// only perform resize for certain image types

			if ( ( typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement ) ||
				( typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement ) ||
				( typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap ) ) {

				const floor = needsPowerOfTwo ? MathUtils.floorPowerOfTwo : Math.floor;

				const width = floor( scale * image.width );
				const height = floor( scale * image.height );

				if ( _canvas === undefined ) _canvas = createCanvas( width, height );

				// cube textures can't reuse the same canvas

				const canvas = needsNewCanvas ? createCanvas( width, height ) : _canvas;

				canvas.width = width;
				canvas.height = height;

				const context = canvas.getContext( '2d' );
				context.drawImage( image, 0, 0, width, height );

				console.warn( 'THREE.WebGLRenderer: Texture has been resized from (' + image.width + 'x' + image.height + ') to (' + width + 'x' + height + ').' );

				return canvas;

			} else {

				if ( 'data' in image ) {

					console.warn( 'THREE.WebGLRenderer: Image in DataTexture is too big (' + image.width + 'x' + image.height + ').' );

				}

				return image;

			}

		}

		return image;

	}

	function isPowerOfTwo( image ) {

		return MathUtils.isPowerOfTwo( image.width ) && MathUtils.isPowerOfTwo( image.height );

	}

	function textureNeedsPowerOfTwo( texture ) {

		if ( isWebGL2 ) return false;

		return ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) ||
			( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter );

	}

	function textureNeedsGenerateMipmaps( texture, supportsMips ) {

		return texture.generateMipmaps && supportsMips &&
			texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

	}

	function generateMipmap( target, texture, width, height ) {

		_gl.generateMipmap( target );

		const textureProperties = properties.get( texture );

		textureProperties.__maxMipLevel = Math.log2( Math.max( width, height ) );

	}

	function getInternalFormat( internalFormatName, glFormat, glType ) {

		if ( isWebGL2 === false ) return glFormat;

		if ( internalFormatName !== null ) {

			if ( _gl[ internalFormatName ] !== undefined ) return _gl[ internalFormatName ];

			console.warn( 'THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format \'' + internalFormatName + '\'' );

		}

		let internalFormat = glFormat;

		if ( glFormat === 6403 ) {

			if ( glType === 5126 ) internalFormat = 33326;
			if ( glType === 5131 ) internalFormat = 33325;
			if ( glType === 5121 ) internalFormat = 33321;

		}

		if ( glFormat === 6407 ) {

			if ( glType === 5126 ) internalFormat = 34837;
			if ( glType === 5131 ) internalFormat = 34843;
			if ( glType === 5121 ) internalFormat = 32849;

		}

		if ( glFormat === 6408 ) {

			if ( glType === 5126 ) internalFormat = 34836;
			if ( glType === 5131 ) internalFormat = 34842;
			if ( glType === 5121 ) internalFormat = 32856;

		}

		if ( internalFormat === 33325 || internalFormat === 33326 ||
			internalFormat === 34842 || internalFormat === 34836 ) {

			extensions.get( 'EXT_color_buffer_float' );

		}

		return internalFormat;

	}

	// Fallback filters for non-power-of-2 textures

	function filterFallback( f ) {

		if ( f === NearestFilter || f === NearestMipmapNearestFilter || f === NearestMipmapLinearFilter ) {

			return 9728;

		}

		return 9729;

	}

	//

	function onTextureDispose( event ) {

		const texture = event.target;

		texture.removeEventListener( 'dispose', onTextureDispose );

		deallocateTexture( texture );

		if ( texture.isVideoTexture ) {

			_videoTextures.delete( texture );

		}

		info.memory.textures --;

	}

	function onRenderTargetDispose( event ) {

		const renderTarget = event.target;

		renderTarget.removeEventListener( 'dispose', onRenderTargetDispose );

		deallocateRenderTarget( renderTarget );

		info.memory.textures --;

	}

	//

	function deallocateTexture( texture ) {

		const textureProperties = properties.get( texture );

		if ( textureProperties.__webglInit === undefined ) return;

		_gl.deleteTexture( textureProperties.__webglTexture );

		properties.remove( texture );

	}

	function deallocateRenderTarget( renderTarget ) {

		const texture = renderTarget.texture;

		const renderTargetProperties = properties.get( renderTarget );
		const textureProperties = properties.get( texture );

		if ( ! renderTarget ) return;

		if ( textureProperties.__webglTexture !== undefined ) {

			_gl.deleteTexture( textureProperties.__webglTexture );

		}

		if ( renderTarget.depthTexture ) {

			renderTarget.depthTexture.dispose();

		}

		if ( renderTarget.isWebGLCubeRenderTarget ) {

			for ( let i = 0; i < 6; i ++ ) {

				_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer[ i ] );
				if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer[ i ] );

			}

		} else {

			_gl.deleteFramebuffer( renderTargetProperties.__webglFramebuffer );
			if ( renderTargetProperties.__webglDepthbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthbuffer );
			if ( renderTargetProperties.__webglMultisampledFramebuffer ) _gl.deleteFramebuffer( renderTargetProperties.__webglMultisampledFramebuffer );
			if ( renderTargetProperties.__webglColorRenderbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglColorRenderbuffer );
			if ( renderTargetProperties.__webglDepthRenderbuffer ) _gl.deleteRenderbuffer( renderTargetProperties.__webglDepthRenderbuffer );

		}

		properties.remove( texture );
		properties.remove( renderTarget );

	}

	//

	let textureUnits = 0;

	function resetTextureUnits() {

		textureUnits = 0;

	}

	function allocateTextureUnit() {

		const textureUnit = textureUnits;

		if ( textureUnit >= maxTextures ) {

			console.warn( 'THREE.WebGLTextures: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + maxTextures );

		}

		textureUnits += 1;

		return textureUnit;

	}

	//

	function setTexture2D( texture, slot ) {

		const textureProperties = properties.get( texture );

		if ( texture.isVideoTexture ) updateVideoTexture( texture );

		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

			const image = texture.image;

			if ( image === undefined ) {

				console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is undefined' );

			} else if ( image.complete === false ) {

				console.warn( 'THREE.WebGLRenderer: Texture marked for update but image is incomplete' );

			} else {

				uploadTexture( textureProperties, texture, slot );
				return;

			}

		}

		state.activeTexture( 33984 + slot );
		state.bindTexture( 3553, textureProperties.__webglTexture );

	}

	function setTexture2DArray( texture, slot ) {

		const textureProperties = properties.get( texture );

		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

			uploadTexture( textureProperties, texture, slot );
			return;

		}

		state.activeTexture( 33984 + slot );
		state.bindTexture( 35866, textureProperties.__webglTexture );

	}

	function setTexture3D( texture, slot ) {

		const textureProperties = properties.get( texture );

		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

			uploadTexture( textureProperties, texture, slot );
			return;

		}

		state.activeTexture( 33984 + slot );
		state.bindTexture( 32879, textureProperties.__webglTexture );

	}

	function setTextureCube( texture, slot ) {

		const textureProperties = properties.get( texture );

		if ( texture.version > 0 && textureProperties.__version !== texture.version ) {

			uploadCubeTexture( textureProperties, texture, slot );
			return;

		}

		state.activeTexture( 33984 + slot );
		state.bindTexture( 34067, textureProperties.__webglTexture );

	}

	const wrappingToGL = {
		[ RepeatWrapping ]: 10497,
		[ ClampToEdgeWrapping ]: 33071,
		[ MirroredRepeatWrapping ]: 33648
	};

	const filterToGL = {
		[ NearestFilter ]: 9728,
		[ NearestMipmapNearestFilter ]: 9984,
		[ NearestMipmapLinearFilter ]: 9986,

		[ LinearFilter ]: 9729,
		[ LinearMipmapNearestFilter ]: 9985,
		[ LinearMipmapLinearFilter ]: 9987
	};

	function setTextureParameters( textureType, texture, supportsMips ) {

		if ( supportsMips ) {

			_gl.texParameteri( textureType, 10242, wrappingToGL[ texture.wrapS ] );
			_gl.texParameteri( textureType, 10243, wrappingToGL[ texture.wrapT ] );

			if ( textureType === 32879 || textureType === 35866 ) {

				_gl.texParameteri( textureType, 32882, wrappingToGL[ texture.wrapR ] );

			}

			_gl.texParameteri( textureType, 10240, filterToGL[ texture.magFilter ] );
			_gl.texParameteri( textureType, 10241, filterToGL[ texture.minFilter ] );

		} else {

			_gl.texParameteri( textureType, 10242, 33071 );
			_gl.texParameteri( textureType, 10243, 33071 );

			if ( textureType === 32879 || textureType === 35866 ) {

				_gl.texParameteri( textureType, 32882, 33071 );

			}

			if ( texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping ) {

				console.warn( 'THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.' );

			}

			_gl.texParameteri( textureType, 10240, filterFallback( texture.magFilter ) );
			_gl.texParameteri( textureType, 10241, filterFallback( texture.minFilter ) );

			if ( texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter ) {

				console.warn( 'THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.' );

			}

		}

		if ( extensions.has( 'EXT_texture_filter_anisotropic' ) === true ) {

			const extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			if ( texture.type === FloatType && extensions.has( 'OES_texture_float_linear' ) === false ) return; // verify extension for WebGL 1 and WebGL 2
			if ( isWebGL2 === false && ( texture.type === HalfFloatType && extensions.has( 'OES_texture_half_float_linear' ) === false ) ) return; // verify extension for WebGL 1 only

			if ( texture.anisotropy > 1 || properties.get( texture ).__currentAnisotropy ) {

				_gl.texParameterf( textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, capabilities.getMaxAnisotropy() ) );
				properties.get( texture ).__currentAnisotropy = texture.anisotropy;

			}

		}

	}

	function initTexture( textureProperties, texture ) {

		if ( textureProperties.__webglInit === undefined ) {

			textureProperties.__webglInit = true;

			texture.addEventListener( 'dispose', onTextureDispose );

			textureProperties.__webglTexture = _gl.createTexture();

			info.memory.textures ++;

		}

	}

	function uploadTexture( textureProperties, texture, slot ) {

		let textureType = 3553;

		if ( texture.isDataTexture2DArray ) textureType = 35866;
		if ( texture.isDataTexture3D ) textureType = 32879;

		initTexture( textureProperties, texture );

		state.activeTexture( 33984 + slot );
		state.bindTexture( textureType, textureProperties.__webglTexture );

		_gl.pixelStorei( 37440, texture.flipY );
		_gl.pixelStorei( 37441, texture.premultiplyAlpha );
		_gl.pixelStorei( 3317, texture.unpackAlignment );
		_gl.pixelStorei( 37443, 0 );

		const needsPowerOfTwo = textureNeedsPowerOfTwo( texture ) && isPowerOfTwo( texture.image ) === false;
		const image = resizeImage( texture.image, needsPowerOfTwo, false, maxTextureSize );

		const supportsMips = isPowerOfTwo( image ) || isWebGL2,
			glFormat = utils.convert( texture.format );

		let glType = utils.convert( texture.type ),
			glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType );

		setTextureParameters( textureType, texture, supportsMips );

		let mipmap;
		const mipmaps = texture.mipmaps;

		if ( texture.isDepthTexture ) {

			// populate depth texture with dummy data

			glInternalFormat = 6402;

			if ( isWebGL2 ) {

				if ( texture.type === FloatType ) {

					glInternalFormat = 36012;

				} else if ( texture.type === UnsignedIntType ) {

					glInternalFormat = 33190;

				} else if ( texture.type === UnsignedInt248Type ) {

					glInternalFormat = 35056;

				} else {

					glInternalFormat = 33189; // WebGL2 requires sized internalformat for glTexImage2D

				}

			} else {

				if ( texture.type === FloatType ) {

					console.error( 'WebGLRenderer: Floating point depth texture requires WebGL2.' );

				}

			}

			// validation checks for WebGL 1

			if ( texture.format === DepthFormat && glInternalFormat === 6402 ) {

				// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
				// DEPTH_COMPONENT and type is not UNSIGNED_SHORT or UNSIGNED_INT
				// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
				if ( texture.type !== UnsignedShortType && texture.type !== UnsignedIntType ) {

					console.warn( 'THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.' );

					texture.type = UnsignedShortType;
					glType = utils.convert( texture.type );

				}

			}

			if ( texture.format === DepthStencilFormat && glInternalFormat === 6402 ) {

				// Depth stencil textures need the DEPTH_STENCIL internal format
				// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
				glInternalFormat = 34041;

				// The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
				// DEPTH_STENCIL and type is not UNSIGNED_INT_24_8_WEBGL.
				// (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
				if ( texture.type !== UnsignedInt248Type ) {

					console.warn( 'THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.' );

					texture.type = UnsignedInt248Type;
					glType = utils.convert( texture.type );

				}

			}

			//

			state.texImage2D( 3553, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null );

		} else if ( texture.isDataTexture ) {

			// use manually created mipmaps if available
			// if there are no manual mipmaps
			// set 0 level mipmap and then use GL to generate other mipmap levels

			if ( mipmaps.length > 0 && supportsMips ) {

				for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

					mipmap = mipmaps[ i ];
					state.texImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

				}

				texture.generateMipmaps = false;
				textureProperties.__maxMipLevel = mipmaps.length - 1;

			} else {

				state.texImage2D( 3553, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data );
				textureProperties.__maxMipLevel = 0;

			}

		} else if ( texture.isCompressedTexture ) {

			for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

				mipmap = mipmaps[ i ];

				if ( texture.format !== RGBAFormat && texture.format !== RGBFormat ) {

					if ( glFormat !== null ) {

						state.compressedTexImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

					} else {

						console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()' );

					}

				} else {

					state.texImage2D( 3553, i, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

				}

			}

			textureProperties.__maxMipLevel = mipmaps.length - 1;

		} else if ( texture.isDataTexture2DArray ) {

			state.texImage3D( 35866, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );
			textureProperties.__maxMipLevel = 0;

		} else if ( texture.isDataTexture3D ) {

			state.texImage3D( 32879, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data );
			textureProperties.__maxMipLevel = 0;

		} else {

			// regular Texture (image, video, canvas)

			// use manually created mipmaps if available
			// if there are no manual mipmaps
			// set 0 level mipmap and then use GL to generate other mipmap levels

			if ( mipmaps.length > 0 && supportsMips ) {

				for ( let i = 0, il = mipmaps.length; i < il; i ++ ) {

					mipmap = mipmaps[ i ];
					state.texImage2D( 3553, i, glInternalFormat, glFormat, glType, mipmap );

				}

				texture.generateMipmaps = false;
				textureProperties.__maxMipLevel = mipmaps.length - 1;

			} else {

				state.texImage2D( 3553, 0, glInternalFormat, glFormat, glType, image );
				textureProperties.__maxMipLevel = 0;

			}

		}

		if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

			generateMipmap( textureType, texture, image.width, image.height );

		}

		textureProperties.__version = texture.version;

		if ( texture.onUpdate ) texture.onUpdate( texture );

	}

	function uploadCubeTexture( textureProperties, texture, slot ) {

		if ( texture.image.length !== 6 ) return;

		initTexture( textureProperties, texture );

		state.activeTexture( 33984 + slot );
		state.bindTexture( 34067, textureProperties.__webglTexture );

		_gl.pixelStorei( 37440, texture.flipY );
		_gl.pixelStorei( 37441, texture.premultiplyAlpha );
		_gl.pixelStorei( 3317, texture.unpackAlignment );
		_gl.pixelStorei( 37443, 0 );

		const isCompressed = ( texture && ( texture.isCompressedTexture || texture.image[ 0 ].isCompressedTexture ) );
		const isDataTexture = ( texture.image[ 0 ] && texture.image[ 0 ].isDataTexture );

		const cubeImage = [];

		for ( let i = 0; i < 6; i ++ ) {

			if ( ! isCompressed && ! isDataTexture ) {

				cubeImage[ i ] = resizeImage( texture.image[ i ], false, true, maxCubemapSize );

			} else {

				cubeImage[ i ] = isDataTexture ? texture.image[ i ].image : texture.image[ i ];

			}

		}

		const image = cubeImage[ 0 ],
			supportsMips = isPowerOfTwo( image ) || isWebGL2,
			glFormat = utils.convert( texture.format ),
			glType = utils.convert( texture.type ),
			glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType );

		setTextureParameters( 34067, texture, supportsMips );

		let mipmaps;

		if ( isCompressed ) {

			for ( let i = 0; i < 6; i ++ ) {

				mipmaps = cubeImage[ i ].mipmaps;

				for ( let j = 0; j < mipmaps.length; j ++ ) {

					const mipmap = mipmaps[ j ];

					if ( texture.format !== RGBAFormat && texture.format !== RGBFormat ) {

						if ( glFormat !== null ) {

							state.compressedTexImage2D( 34069 + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data );

						} else {

							console.warn( 'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()' );

						}

					} else {

						state.texImage2D( 34069 + i, j, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

					}

				}

			}

			textureProperties.__maxMipLevel = mipmaps.length - 1;

		} else {

			mipmaps = texture.mipmaps;

			for ( let i = 0; i < 6; i ++ ) {

				if ( isDataTexture ) {

					state.texImage2D( 34069 + i, 0, glInternalFormat, cubeImage[ i ].width, cubeImage[ i ].height, 0, glFormat, glType, cubeImage[ i ].data );

					for ( let j = 0; j < mipmaps.length; j ++ ) {

						const mipmap = mipmaps[ j ];
						const mipmapImage = mipmap.image[ i ].image;

						state.texImage2D( 34069 + i, j + 1, glInternalFormat, mipmapImage.width, mipmapImage.height, 0, glFormat, glType, mipmapImage.data );

					}

				} else {

					state.texImage2D( 34069 + i, 0, glInternalFormat, glFormat, glType, cubeImage[ i ] );

					for ( let j = 0; j < mipmaps.length; j ++ ) {

						const mipmap = mipmaps[ j ];

						state.texImage2D( 34069 + i, j + 1, glInternalFormat, glFormat, glType, mipmap.image[ i ] );

					}

				}

			}

			textureProperties.__maxMipLevel = mipmaps.length;

		}

		if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

			// We assume images for cube map have the same size.
			generateMipmap( 34067, texture, image.width, image.height );

		}

		textureProperties.__version = texture.version;

		if ( texture.onUpdate ) texture.onUpdate( texture );

	}

	// Render targets

	// Setup storage for target texture and bind it to correct framebuffer
	function setupFrameBufferTexture( framebuffer, renderTarget, attachment, textureTarget ) {

		const texture = renderTarget.texture;

		const glFormat = utils.convert( texture.format );
		const glType = utils.convert( texture.type );
		const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType );

		if ( textureTarget === 32879 || textureTarget === 35866 ) {

			state.texImage3D( textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, renderTarget.depth, 0, glFormat, glType, null );

		} else {

			state.texImage2D( textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

		}

		_gl.bindFramebuffer( 36160, framebuffer );
		_gl.framebufferTexture2D( 36160, attachment, textureTarget, properties.get( texture ).__webglTexture, 0 );
		_gl.bindFramebuffer( 36160, null );

	}

	// Setup storage for internal depth/stencil buffers and bind to correct framebuffer
	function setupRenderBufferStorage( renderbuffer, renderTarget, isMultisample ) {

		_gl.bindRenderbuffer( 36161, renderbuffer );

		if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

			let glInternalFormat = 33189;

			if ( isMultisample ) {

				const depthTexture = renderTarget.depthTexture;

				if ( depthTexture && depthTexture.isDepthTexture ) {

					if ( depthTexture.type === FloatType ) {

						glInternalFormat = 36012;

					} else if ( depthTexture.type === UnsignedIntType ) {

						glInternalFormat = 33190;

					}

				}

				const samples = getRenderTargetSamples( renderTarget );

				_gl.renderbufferStorageMultisample( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

			} else {

				_gl.renderbufferStorage( 36161, glInternalFormat, renderTarget.width, renderTarget.height );

			}

			_gl.framebufferRenderbuffer( 36160, 36096, 36161, renderbuffer );

		} else if ( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

			if ( isMultisample ) {

				const samples = getRenderTargetSamples( renderTarget );

				_gl.renderbufferStorageMultisample( 36161, samples, 35056, renderTarget.width, renderTarget.height );

			} else {

				_gl.renderbufferStorage( 36161, 34041, renderTarget.width, renderTarget.height );

			}


			_gl.framebufferRenderbuffer( 36160, 33306, 36161, renderbuffer );

		} else {

			const texture = renderTarget.texture;

			const glFormat = utils.convert( texture.format );
			const glType = utils.convert( texture.type );
			const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType );

			if ( isMultisample ) {

				const samples = getRenderTargetSamples( renderTarget );

				_gl.renderbufferStorageMultisample( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

			} else {

				_gl.renderbufferStorage( 36161, glInternalFormat, renderTarget.width, renderTarget.height );

			}

		}

		_gl.bindRenderbuffer( 36161, null );

	}

	// Setup resources for a Depth Texture for a FBO (needs an extension)
	function setupDepthTexture( framebuffer, renderTarget ) {

		const isCube = ( renderTarget && renderTarget.isWebGLCubeRenderTarget );
		if ( isCube ) throw new Error( 'Depth Texture with cube render targets is not supported' );

		_gl.bindFramebuffer( 36160, framebuffer );

		if ( ! ( renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture ) ) {

			throw new Error( 'renderTarget.depthTexture must be an instance of THREE.DepthTexture' );

		}

		// upload an empty depth texture with framebuffer size
		if ( ! properties.get( renderTarget.depthTexture ).__webglTexture ||
				renderTarget.depthTexture.image.width !== renderTarget.width ||
				renderTarget.depthTexture.image.height !== renderTarget.height ) {

			renderTarget.depthTexture.image.width = renderTarget.width;
			renderTarget.depthTexture.image.height = renderTarget.height;
			renderTarget.depthTexture.needsUpdate = true;

		}

		setTexture2D( renderTarget.depthTexture, 0 );

		const webglDepthTexture = properties.get( renderTarget.depthTexture ).__webglTexture;

		if ( renderTarget.depthTexture.format === DepthFormat ) {

			_gl.framebufferTexture2D( 36160, 36096, 3553, webglDepthTexture, 0 );

		} else if ( renderTarget.depthTexture.format === DepthStencilFormat ) {

			_gl.framebufferTexture2D( 36160, 33306, 3553, webglDepthTexture, 0 );

		} else {

			throw new Error( 'Unknown depthTexture format' );

		}

	}

	// Setup GL resources for a non-texture depth buffer
	function setupDepthRenderbuffer( renderTarget ) {

		const renderTargetProperties = properties.get( renderTarget );

		const isCube = ( renderTarget.isWebGLCubeRenderTarget === true );

		if ( renderTarget.depthTexture ) {

			if ( isCube ) throw new Error( 'target.depthTexture not supported in Cube render targets' );

			setupDepthTexture( renderTargetProperties.__webglFramebuffer, renderTarget );

		} else {

			if ( isCube ) {

				renderTargetProperties.__webglDepthbuffer = [];

				for ( let i = 0; i < 6; i ++ ) {

					_gl.bindFramebuffer( 36160, renderTargetProperties.__webglFramebuffer[ i ] );
					renderTargetProperties.__webglDepthbuffer[ i ] = _gl.createRenderbuffer();
					setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer[ i ], renderTarget, false );

				}

			} else {

				_gl.bindFramebuffer( 36160, renderTargetProperties.__webglFramebuffer );
				renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
				setupRenderBufferStorage( renderTargetProperties.__webglDepthbuffer, renderTarget, false );

			}

		}

		_gl.bindFramebuffer( 36160, null );

	}

	// Set up GL resources for the render target
	function setupRenderTarget( renderTarget ) {

		const texture = renderTarget.texture;

		const renderTargetProperties = properties.get( renderTarget );
		const textureProperties = properties.get( texture );

		renderTarget.addEventListener( 'dispose', onRenderTargetDispose );

		textureProperties.__webglTexture = _gl.createTexture();

		info.memory.textures ++;

		const isCube = ( renderTarget.isWebGLCubeRenderTarget === true );
		const isMultisample = ( renderTarget.isWebGLMultisampleRenderTarget === true );
		const isRenderTarget3D = texture.isDataTexture3D || texture.isDataTexture2DArray;
		const supportsMips = isPowerOfTwo( renderTarget ) || isWebGL2;

		// Handles WebGL2 RGBFormat fallback - #18858

		if ( isWebGL2 && texture.format === RGBFormat && ( texture.type === FloatType || texture.type === HalfFloatType ) ) {

			texture.format = RGBAFormat;

			console.warn( 'THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.' );

		}

		// Setup framebuffer

		if ( isCube ) {

			renderTargetProperties.__webglFramebuffer = [];

			for ( let i = 0; i < 6; i ++ ) {

				renderTargetProperties.__webglFramebuffer[ i ] = _gl.createFramebuffer();

			}

		} else {

			renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();

			if ( isMultisample ) {

				if ( isWebGL2 ) {

					renderTargetProperties.__webglMultisampledFramebuffer = _gl.createFramebuffer();
					renderTargetProperties.__webglColorRenderbuffer = _gl.createRenderbuffer();

					_gl.bindRenderbuffer( 36161, renderTargetProperties.__webglColorRenderbuffer );

					const glFormat = utils.convert( texture.format );
					const glType = utils.convert( texture.type );
					const glInternalFormat = getInternalFormat( texture.internalFormat, glFormat, glType );
					const samples = getRenderTargetSamples( renderTarget );
					_gl.renderbufferStorageMultisample( 36161, samples, glInternalFormat, renderTarget.width, renderTarget.height );

					_gl.bindFramebuffer( 36160, renderTargetProperties.__webglMultisampledFramebuffer );
					_gl.framebufferRenderbuffer( 36160, 36064, 36161, renderTargetProperties.__webglColorRenderbuffer );
					_gl.bindRenderbuffer( 36161, null );

					if ( renderTarget.depthBuffer ) {

						renderTargetProperties.__webglDepthRenderbuffer = _gl.createRenderbuffer();
						setupRenderBufferStorage( renderTargetProperties.__webglDepthRenderbuffer, renderTarget, true );

					}

					_gl.bindFramebuffer( 36160, null );


				} else {

					console.warn( 'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.' );

				}

			}

		}

		// Setup color buffer

		if ( isCube ) {

			state.bindTexture( 34067, textureProperties.__webglTexture );
			setTextureParameters( 34067, texture, supportsMips );

			for ( let i = 0; i < 6; i ++ ) {

				setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer[ i ], renderTarget, 36064, 34069 + i );

			}

			if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

				generateMipmap( 34067, texture, renderTarget.width, renderTarget.height );

			}

			state.bindTexture( 34067, null );

		} else {

			let glTextureType = 3553;

			if ( isRenderTarget3D ) {

				// Render targets containing layers, i.e: Texture 3D and 2d arrays

				if ( isWebGL2 ) {

					const isTexture3D = texture.isDataTexture3D;
					glTextureType = isTexture3D ? 32879 : 35866;

				} else {

					console.warn( 'THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.' );

				}

			}

			state.bindTexture( glTextureType, textureProperties.__webglTexture );
			setTextureParameters( glTextureType, texture, supportsMips );
			setupFrameBufferTexture( renderTargetProperties.__webglFramebuffer, renderTarget, 36064, glTextureType );

			if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

				generateMipmap( 3553, texture, renderTarget.width, renderTarget.height );

			}

			state.bindTexture( 3553, null );

		}

		// Setup depth and stencil buffers

		if ( renderTarget.depthBuffer ) {

			setupDepthRenderbuffer( renderTarget );

		}

	}

	function updateRenderTargetMipmap( renderTarget ) {

		const texture = renderTarget.texture;

		const supportsMips = isPowerOfTwo( renderTarget ) || isWebGL2;

		if ( textureNeedsGenerateMipmaps( texture, supportsMips ) ) {

			const target = renderTarget.isWebGLCubeRenderTarget ? 34067 : 3553;
			const webglTexture = properties.get( texture ).__webglTexture;

			state.bindTexture( target, webglTexture );
			generateMipmap( target, texture, renderTarget.width, renderTarget.height );
			state.bindTexture( target, null );

		}

	}

	function updateMultisampleRenderTarget( renderTarget ) {

		if ( renderTarget.isWebGLMultisampleRenderTarget ) {

			if ( isWebGL2 ) {

				const renderTargetProperties = properties.get( renderTarget );

				_gl.bindFramebuffer( 36008, renderTargetProperties.__webglMultisampledFramebuffer );
				_gl.bindFramebuffer( 36009, renderTargetProperties.__webglFramebuffer );

				const width = renderTarget.width;
				const height = renderTarget.height;
				let mask = 16384;

				if ( renderTarget.depthBuffer ) mask |= 256;
				if ( renderTarget.stencilBuffer ) mask |= 1024;

				_gl.blitFramebuffer( 0, 0, width, height, 0, 0, width, height, mask, 9728 );

				_gl.bindFramebuffer( 36160, renderTargetProperties.__webglMultisampledFramebuffer ); // see #18905

			} else {

				console.warn( 'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.' );

			}

		}

	}

	function getRenderTargetSamples( renderTarget ) {

		return ( isWebGL2 && renderTarget.isWebGLMultisampleRenderTarget ) ?
			Math.min( maxSamples, renderTarget.samples ) : 0;

	}

	function updateVideoTexture( texture ) {

		const frame = info.render.frame;

		// Check the last frame we updated the VideoTexture

		if ( _videoTextures.get( texture ) !== frame ) {

			_videoTextures.set( texture, frame );
			texture.update();

		}

	}

	// backwards compatibility

	let warnedTexture2D = false;
	let warnedTextureCube = false;

	function safeSetTexture2D( texture, slot ) {

		if ( texture && texture.isWebGLRenderTarget ) {

			if ( warnedTexture2D === false ) {

				console.warn( 'THREE.WebGLTextures.safeSetTexture2D: don\'t use render targets as textures. Use their .texture property instead.' );
				warnedTexture2D = true;

			}

			texture = texture.texture;

		}

		setTexture2D( texture, slot );

	}

	function safeSetTextureCube( texture, slot ) {

		if ( texture && texture.isWebGLCubeRenderTarget ) {

			if ( warnedTextureCube === false ) {

				console.warn( 'THREE.WebGLTextures.safeSetTextureCube: don\'t use cube render targets as textures. Use their .texture property instead.' );
				warnedTextureCube = true;

			}

			texture = texture.texture;

		}


		setTextureCube( texture, slot );

	}

	//

	this.allocateTextureUnit = allocateTextureUnit;
	this.resetTextureUnits = resetTextureUnits;

	this.setTexture2D = setTexture2D;
	this.setTexture2DArray = setTexture2DArray;
	this.setTexture3D = setTexture3D;
	this.setTextureCube = setTextureCube;
	this.setupRenderTarget = setupRenderTarget;
	this.updateRenderTargetMipmap = updateRenderTargetMipmap;
	this.updateMultisampleRenderTarget = updateMultisampleRenderTarget;

	this.safeSetTexture2D = safeSetTexture2D;
	this.safeSetTextureCube = safeSetTextureCube;

}

function WebGLUtils( gl, extensions, capabilities ) {

	const isWebGL2 = capabilities.isWebGL2;

	function convert( p ) {

		let extension;

		if ( p === UnsignedByteType ) return 5121;
		if ( p === UnsignedShort4444Type ) return 32819;
		if ( p === UnsignedShort5551Type ) return 32820;
		if ( p === UnsignedShort565Type ) return 33635;

		if ( p === ByteType ) return 5120;
		if ( p === ShortType ) return 5122;
		if ( p === UnsignedShortType ) return 5123;
		if ( p === IntType ) return 5124;
		if ( p === UnsignedIntType ) return 5125;
		if ( p === FloatType ) return 5126;

		if ( p === HalfFloatType ) {

			if ( isWebGL2 ) return 5131;

			extension = extensions.get( 'OES_texture_half_float' );

			if ( extension !== null ) {

				return extension.HALF_FLOAT_OES;

			} else {

				return null;

			}

		}

		if ( p === AlphaFormat ) return 6406;
		if ( p === RGBFormat ) return 6407;
		if ( p === RGBAFormat ) return 6408;
		if ( p === LuminanceFormat ) return 6409;
		if ( p === LuminanceAlphaFormat ) return 6410;
		if ( p === DepthFormat ) return 6402;
		if ( p === DepthStencilFormat ) return 34041;
		if ( p === RedFormat ) return 6403;

		// WebGL2 formats.

		if ( p === RedIntegerFormat ) return 36244;
		if ( p === RGFormat ) return 33319;
		if ( p === RGIntegerFormat ) return 33320;
		if ( p === RGBIntegerFormat ) return 36248;
		if ( p === RGBAIntegerFormat ) return 36249;

		if ( p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format ||
			p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format ) {

			extension = extensions.get( 'WEBGL_compressed_texture_s3tc' );

			if ( extension !== null ) {

				if ( p === RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
				if ( p === RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				if ( p === RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				if ( p === RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

			} else {

				return null;

			}

		}

		if ( p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format ||
			p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format ) {

			extension = extensions.get( 'WEBGL_compressed_texture_pvrtc' );

			if ( extension !== null ) {

				if ( p === RGB_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
				if ( p === RGB_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
				if ( p === RGBA_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
				if ( p === RGBA_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

			} else {

				return null;

			}

		}

		if ( p === RGB_ETC1_Format ) {

			extension = extensions.get( 'WEBGL_compressed_texture_etc1' );

			if ( extension !== null ) {

				return extension.COMPRESSED_RGB_ETC1_WEBGL;

			} else {

				return null;

			}

		}

		if ( p === RGB_ETC2_Format || p === RGBA_ETC2_EAC_Format ) {

			extension = extensions.get( 'WEBGL_compressed_texture_etc' );

			if ( extension !== null ) {

				if ( p === RGB_ETC2_Format ) return extension.COMPRESSED_RGB8_ETC2;
				if ( p === RGBA_ETC2_EAC_Format ) return extension.COMPRESSED_RGBA8_ETC2_EAC;

			}

		}

		if ( p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format ||
			p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format ||
			p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format ||
			p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format ||
			p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format ||
			p === SRGB8_ALPHA8_ASTC_4x4_Format || p === SRGB8_ALPHA8_ASTC_5x4_Format || p === SRGB8_ALPHA8_ASTC_5x5_Format ||
			p === SRGB8_ALPHA8_ASTC_6x5_Format || p === SRGB8_ALPHA8_ASTC_6x6_Format || p === SRGB8_ALPHA8_ASTC_8x5_Format ||
			p === SRGB8_ALPHA8_ASTC_8x6_Format || p === SRGB8_ALPHA8_ASTC_8x8_Format || p === SRGB8_ALPHA8_ASTC_10x5_Format ||
			p === SRGB8_ALPHA8_ASTC_10x6_Format || p === SRGB8_ALPHA8_ASTC_10x8_Format || p === SRGB8_ALPHA8_ASTC_10x10_Format ||
			p === SRGB8_ALPHA8_ASTC_12x10_Format || p === SRGB8_ALPHA8_ASTC_12x12_Format ) {

			extension = extensions.get( 'WEBGL_compressed_texture_astc' );

			if ( extension !== null ) {

				// TODO Complete?

				return p;

			} else {

				return null;

			}

		}

		if ( p === RGBA_BPTC_Format ) {

			extension = extensions.get( 'EXT_texture_compression_bptc' );

			if ( extension !== null ) {

				// TODO Complete?

				return p;

			} else {

				return null;

			}

		}

		if ( p === UnsignedInt248Type ) {

			if ( isWebGL2 ) return 34042;

			extension = extensions.get( 'WEBGL_depth_texture' );

			if ( extension !== null ) {

				return extension.UNSIGNED_INT_24_8_WEBGL;

			} else {

				return null;

			}

		}

	}

	return { convert: convert };

}

function ArrayCamera( array = [] ) {

	PerspectiveCamera.call( this );

	this.cameras = array;

}

ArrayCamera.prototype = Object.assign( Object.create( PerspectiveCamera.prototype ), {

	constructor: ArrayCamera,

	isArrayCamera: true

} );

class Group extends Object3D {

	constructor() {

		super();

		this.type = 'Group';

	}

}

Group.prototype.isGroup = true;

function WebXRController() {

	this._targetRay = null;
	this._grip = null;
	this._hand = null;

}

Object.assign( WebXRController.prototype, {

	constructor: WebXRController,

	getHandSpace: function () {

		if ( this._hand === null ) {

			this._hand = new Group();
			this._hand.matrixAutoUpdate = false;
			this._hand.visible = false;

			this._hand.joints = {};
			this._hand.inputState = { pinching: false };

		}

		return this._hand;

	},

	getTargetRaySpace: function () {

		if ( this._targetRay === null ) {

			this._targetRay = new Group();
			this._targetRay.matrixAutoUpdate = false;
			this._targetRay.visible = false;

		}

		return this._targetRay;

	},

	getGripSpace: function () {

		if ( this._grip === null ) {

			this._grip = new Group();
			this._grip.matrixAutoUpdate = false;
			this._grip.visible = false;

		}

		return this._grip;

	},

	dispatchEvent: function ( event ) {

		if ( this._targetRay !== null ) {

			this._targetRay.dispatchEvent( event );

		}

		if ( this._grip !== null ) {

			this._grip.dispatchEvent( event );

		}

		if ( this._hand !== null ) {

			this._hand.dispatchEvent( event );

		}

		return this;

	},

	disconnect: function ( inputSource ) {

		this.dispatchEvent( { type: 'disconnected', data: inputSource } );

		if ( this._targetRay !== null ) {

			this._targetRay.visible = false;

		}

		if ( this._grip !== null ) {

			this._grip.visible = false;

		}

		if ( this._hand !== null ) {

			this._hand.visible = false;

		}

		return this;

	},

	update: function ( inputSource, frame, referenceSpace ) {

		let inputPose = null;
		let gripPose = null;
		let handPose = null;

		const targetRay = this._targetRay;
		const grip = this._grip;
		const hand = this._hand;

		if ( inputSource && frame.session.visibilityState !== 'visible-blurred' ) {

			if ( hand && inputSource.hand ) {

				handPose = true;

				for ( const inputjoint of inputSource.hand.values() ) {

					// Update the joints groups with the XRJoint poses
					const jointPose = frame.getJointPose( inputjoint, referenceSpace );

					if ( hand.joints[ inputjoint.jointName ] === undefined ) {

						// The transform of this joint will be updated with the joint pose on each frame
						const joint = new Group();
						joint.matrixAutoUpdate = false;
						joint.visible = false;
						hand.joints[ inputjoint.jointName ] = joint;
						// ??
						hand.add( joint );

					}

					const joint = hand.joints[ inputjoint.jointName ];

					if ( jointPose !== null ) {

						joint.matrix.fromArray( jointPose.transform.matrix );
						joint.matrix.decompose( joint.position, joint.rotation, joint.scale );
						joint.jointRadius = jointPose.radius;

					}

					joint.visible = jointPose !== null;

				}

				// Custom events

				// Check pinchz
				const indexTip = hand.joints[ 'index-finger-tip' ];
				const thumbTip = hand.joints[ 'thumb-tip' ];
				const distance = indexTip.position.distanceTo( thumbTip.position );

				const distanceToPinch = 0.02;
				const threshold = 0.005;

				if ( hand.inputState.pinching && distance > distanceToPinch + threshold ) {

					hand.inputState.pinching = false;
					this.dispatchEvent( {
						type: 'pinchend',
						handedness: inputSource.handedness,
						target: this
					} );

				} else if ( ! hand.inputState.pinching && distance <= distanceToPinch - threshold ) {

					hand.inputState.pinching = true;
					this.dispatchEvent( {
						type: 'pinchstart',
						handedness: inputSource.handedness,
						target: this
					} );

				}

			} else {

				if ( targetRay !== null ) {

					inputPose = frame.getPose( inputSource.targetRaySpace, referenceSpace );

					if ( inputPose !== null ) {

						targetRay.matrix.fromArray( inputPose.transform.matrix );
						targetRay.matrix.decompose( targetRay.position, targetRay.rotation, targetRay.scale );

					}

				}

				if ( grip !== null && inputSource.gripSpace ) {

					gripPose = frame.getPose( inputSource.gripSpace, referenceSpace );

					if ( gripPose !== null ) {

						grip.matrix.fromArray( gripPose.transform.matrix );
						grip.matrix.decompose( grip.position, grip.rotation, grip.scale );

					}

				}

			}

		}

		if ( targetRay !== null ) {

			targetRay.visible = ( inputPose !== null );

		}

		if ( grip !== null ) {

			grip.visible = ( gripPose !== null );

		}

		if ( hand !== null ) {

			hand.visible = ( handPose !== null );

		}

		return this;

	}

} );

function WebXRManager( renderer, gl ) {

	const scope = this;

	let session = null;

	let framebufferScaleFactor = 1.0;

	let referenceSpace = null;
	let referenceSpaceType = 'local-floor';

	let pose = null;

	const controllers = [];
	const inputSourcesMap = new Map();

	//

	const cameraL = new PerspectiveCamera();
	cameraL.layers.enable( 1 );
	cameraL.viewport = new Vector4();

	const cameraR = new PerspectiveCamera();
	cameraR.layers.enable( 2 );
	cameraR.viewport = new Vector4();

	const cameras = [ cameraL, cameraR ];

	const cameraVR = new ArrayCamera();
	cameraVR.layers.enable( 1 );
	cameraVR.layers.enable( 2 );

	let _currentDepthNear = null;
	let _currentDepthFar = null;

	//

	this.enabled = false;

	this.isPresenting = false;

	this.getController = function ( index ) {

		let controller = controllers[ index ];

		if ( controller === undefined ) {

			controller = new WebXRController();
			controllers[ index ] = controller;

		}

		return controller.getTargetRaySpace();

	};

	this.getControllerGrip = function ( index ) {

		let controller = controllers[ index ];

		if ( controller === undefined ) {

			controller = new WebXRController();
			controllers[ index ] = controller;

		}

		return controller.getGripSpace();

	};

	this.getHand = function ( index ) {

		let controller = controllers[ index ];

		if ( controller === undefined ) {

			controller = new WebXRController();
			controllers[ index ] = controller;

		}

		return controller.getHandSpace();

	};

	//

	function onSessionEvent( event ) {

		const controller = inputSourcesMap.get( event.inputSource );

		if ( controller ) {

			controller.dispatchEvent( { type: event.type, data: event.inputSource } );

		}

	}

	function onSessionEnd() {

		inputSourcesMap.forEach( function ( controller, inputSource ) {

			controller.disconnect( inputSource );

		} );

		inputSourcesMap.clear();

		_currentDepthNear = null;
		_currentDepthFar = null;

		//

		renderer.setFramebuffer( null );
		renderer.setRenderTarget( renderer.getRenderTarget() ); // Hack #15830
		animation.stop();

		scope.isPresenting = false;

		scope.dispatchEvent( { type: 'sessionend' } );

	}

	this.setFramebufferScaleFactor = function ( value ) {

		framebufferScaleFactor = value;

		if ( scope.isPresenting === true ) {

			console.warn( 'THREE.WebXRManager: Cannot change framebuffer scale while presenting.' );

		}

	};

	this.setReferenceSpaceType = function ( value ) {

		referenceSpaceType = value;

		if ( scope.isPresenting === true ) {

			console.warn( 'THREE.WebXRManager: Cannot change reference space type while presenting.' );

		}

	};

	this.getReferenceSpace = function () {

		return referenceSpace;

	};

	this.getSession = function () {

		return session;

	};

	this.setSession = async function ( value ) {

		session = value;

		if ( session !== null ) {

			session.addEventListener( 'select', onSessionEvent );
			session.addEventListener( 'selectstart', onSessionEvent );
			session.addEventListener( 'selectend', onSessionEvent );
			session.addEventListener( 'squeeze', onSessionEvent );
			session.addEventListener( 'squeezestart', onSessionEvent );
			session.addEventListener( 'squeezeend', onSessionEvent );
			session.addEventListener( 'end', onSessionEnd );
			session.addEventListener( 'inputsourceschange', onInputSourcesChange );

			const attributes = gl.getContextAttributes();

			if ( attributes.xrCompatible !== true ) {

				await gl.makeXRCompatible();

			}

			const layerInit = {
				antialias: attributes.antialias,
				alpha: attributes.alpha,
				depth: attributes.depth,
				stencil: attributes.stencil,
				framebufferScaleFactor: framebufferScaleFactor
			};

			// eslint-disable-next-line no-undef
			const baseLayer = new XRWebGLLayer( session, gl, layerInit );

			session.updateRenderState( { baseLayer: baseLayer } );

			referenceSpace = await session.requestReferenceSpace( referenceSpaceType );

			animation.setContext( session );
			animation.start();

			scope.isPresenting = true;

			scope.dispatchEvent( { type: 'sessionstart' } );

		}

	};

	function onInputSourcesChange( event ) {

		const inputSources = session.inputSources;

		// Assign inputSources to available controllers

		for ( let i = 0; i < controllers.length; i ++ ) {

			inputSourcesMap.set( inputSources[ i ], controllers[ i ] );

		}

		// Notify disconnected

		for ( let i = 0; i < event.removed.length; i ++ ) {

			const inputSource = event.removed[ i ];
			const controller = inputSourcesMap.get( inputSource );

			if ( controller ) {

				controller.dispatchEvent( { type: 'disconnected', data: inputSource } );
				inputSourcesMap.delete( inputSource );

			}

		}

		// Notify connected

		for ( let i = 0; i < event.added.length; i ++ ) {

			const inputSource = event.added[ i ];
			const controller = inputSourcesMap.get( inputSource );

			if ( controller ) {

				controller.dispatchEvent( { type: 'connected', data: inputSource } );

			}

		}

	}

	//

	const cameraLPos = new Vector3();
	const cameraRPos = new Vector3();

	/**
	 * Assumes 2 cameras that are parallel and share an X-axis, and that
	 * the cameras' projection and world matrices have already been set.
	 * And that near and far planes are identical for both cameras.
	 * Visualization of this technique: https://computergraphics.stackexchange.com/a/4765
	 */
	function setProjectionFromUnion( camera, cameraL, cameraR ) {

		cameraLPos.setFromMatrixPosition( cameraL.matrixWorld );
		cameraRPos.setFromMatrixPosition( cameraR.matrixWorld );

		const ipd = cameraLPos.distanceTo( cameraRPos );

		const projL = cameraL.projectionMatrix.elements;
		const projR = cameraR.projectionMatrix.elements;

		// VR systems will have identical far and near planes, and
		// most likely identical top and bottom frustum extents.
		// Use the left camera for these values.
		const near = projL[ 14 ] / ( projL[ 10 ] - 1 );
		const far = projL[ 14 ] / ( projL[ 10 ] + 1 );
		const topFov = ( projL[ 9 ] + 1 ) / projL[ 5 ];
		const bottomFov = ( projL[ 9 ] - 1 ) / projL[ 5 ];

		const leftFov = ( projL[ 8 ] - 1 ) / projL[ 0 ];
		const rightFov = ( projR[ 8 ] + 1 ) / projR[ 0 ];
		const left = near * leftFov;
		const right = near * rightFov;

		// Calculate the new camera's position offset from the
		// left camera. xOffset should be roughly half `ipd`.
		const zOffset = ipd / ( - leftFov + rightFov );
		const xOffset = zOffset * - leftFov;

		// TODO: Better way to apply this offset?
		cameraL.matrixWorld.decompose( camera.position, camera.quaternion, camera.scale );
		camera.translateX( xOffset );
		camera.translateZ( zOffset );
		camera.matrixWorld.compose( camera.position, camera.quaternion, camera.scale );
		camera.matrixWorldInverse.copy( camera.matrixWorld ).invert();

		// Find the union of the frustum values of the cameras and scale
		// the values so that the near plane's position does not change in world space,
		// although must now be relative to the new union camera.
		const near2 = near + zOffset;
		const far2 = far + zOffset;
		const left2 = left - xOffset;
		const right2 = right + ( ipd - xOffset );
		const top2 = topFov * far / far2 * near2;
		const bottom2 = bottomFov * far / far2 * near2;

		camera.projectionMatrix.makePerspective( left2, right2, top2, bottom2, near2, far2 );

	}

	function updateCamera( camera, parent ) {

		if ( parent === null ) {

			camera.matrixWorld.copy( camera.matrix );

		} else {

			camera.matrixWorld.multiplyMatrices( parent.matrixWorld, camera.matrix );

		}

		camera.matrixWorldInverse.copy( camera.matrixWorld ).invert();

	}

	this.getCamera = function ( camera ) {

		cameraVR.near = cameraR.near = cameraL.near = camera.near;
		cameraVR.far = cameraR.far = cameraL.far = camera.far;

		if ( _currentDepthNear !== cameraVR.near || _currentDepthFar !== cameraVR.far ) {

			// Note that the new renderState won't apply until the next frame. See #18320

			session.updateRenderState( {
				depthNear: cameraVR.near,
				depthFar: cameraVR.far
			} );

			_currentDepthNear = cameraVR.near;
			_currentDepthFar = cameraVR.far;

		}

		const parent = camera.parent;
		const cameras = cameraVR.cameras;

		updateCamera( cameraVR, parent );

		for ( let i = 0; i < cameras.length; i ++ ) {

			updateCamera( cameras[ i ], parent );

		}

		// update camera and its children

		camera.matrixWorld.copy( cameraVR.matrixWorld );
		camera.matrix.copy( cameraVR.matrix );
		camera.matrix.decompose( camera.position, camera.quaternion, camera.scale );

		const children = camera.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].updateMatrixWorld( true );

		}

		// update projection matrix for proper view frustum culling

		if ( cameras.length === 2 ) {

			setProjectionFromUnion( cameraVR, cameraL, cameraR );

		} else {

			// assume single camera setup (AR)

			cameraVR.projectionMatrix.copy( cameraL.projectionMatrix );

		}

		return cameraVR;

	};

	// Animation Loop

	let onAnimationFrameCallback = null;

	function onAnimationFrame( time, frame ) {

		pose = frame.getViewerPose( referenceSpace );

		if ( pose !== null ) {

			const views = pose.views;
			const baseLayer = session.renderState.baseLayer;

			renderer.setFramebuffer( baseLayer.framebuffer );

			let cameraVRNeedsUpdate = false;

			// check if it's necessary to rebuild cameraVR's camera list

			if ( views.length !== cameraVR.cameras.length ) {

				cameraVR.cameras.length = 0;
				cameraVRNeedsUpdate = true;

			}

			for ( let i = 0; i < views.length; i ++ ) {

				const view = views[ i ];
				const viewport = baseLayer.getViewport( view );

				const camera = cameras[ i ];
				camera.matrix.fromArray( view.transform.matrix );
				camera.projectionMatrix.fromArray( view.projectionMatrix );
				camera.viewport.set( viewport.x, viewport.y, viewport.width, viewport.height );

				if ( i === 0 ) {

					cameraVR.matrix.copy( camera.matrix );

				}

				if ( cameraVRNeedsUpdate === true ) {

					cameraVR.cameras.push( camera );

				}

			}

		}

		//

		const inputSources = session.inputSources;

		for ( let i = 0; i < controllers.length; i ++ ) {

			const controller = controllers[ i ];
			const inputSource = inputSources[ i ];

			controller.update( inputSource, frame, referenceSpace );

		}

		if ( onAnimationFrameCallback ) onAnimationFrameCallback( time, frame );

	}

	const animation = new WebGLAnimation();
	animation.setAnimationLoop( onAnimationFrame );

	this.setAnimationLoop = function ( callback ) {

		onAnimationFrameCallback = callback;

	};

	this.dispose = function () {};

}

Object.assign( WebXRManager.prototype, EventDispatcher.prototype );

function WebGLMaterials( properties ) {

	function refreshFogUniforms( uniforms, fog ) {

		uniforms.fogColor.value.copy( fog.color );

		if ( fog.isFog ) {

			uniforms.fogNear.value = fog.near;
			uniforms.fogFar.value = fog.far;

		} else if ( fog.isFogExp2 ) {

			uniforms.fogDensity.value = fog.density;

		}

	}

	function refreshMaterialUniforms( uniforms, material, pixelRatio, height ) {

		if ( material.isMeshBasicMaterial ) {

			refreshUniformsCommon( uniforms, material );

		} else if ( material.isMeshLambertMaterial ) {

			refreshUniformsCommon( uniforms, material );
			refreshUniformsLambert( uniforms, material );

		} else if ( material.isMeshToonMaterial ) {

			refreshUniformsCommon( uniforms, material );
			refreshUniformsToon( uniforms, material );

		} else if ( material.isMeshPhongMaterial ) {

			refreshUniformsCommon( uniforms, material );
			refreshUniformsPhong( uniforms, material );

		} else if ( material.isMeshStandardMaterial ) {

			refreshUniformsCommon( uniforms, material );

			if ( material.isMeshPhysicalMaterial ) {

				refreshUniformsPhysical( uniforms, material );

			} else {

				refreshUniformsStandard( uniforms, material );

			}

		} else if ( material.isMeshMatcapMaterial ) {

			refreshUniformsCommon( uniforms, material );
			refreshUniformsMatcap( uniforms, material );

		} else if ( material.isMeshDepthMaterial ) {

			refreshUniformsCommon( uniforms, material );
			refreshUniformsDepth( uniforms, material );

		} else if ( material.isMeshDistanceMaterial ) {

			refreshUniformsCommon( uniforms, material );
			refreshUniformsDistance( uniforms, material );

		} else if ( material.isMeshNormalMaterial ) {

			refreshUniformsCommon( uniforms, material );
			refreshUniformsNormal( uniforms, material );

		} else if ( material.isLineBasicMaterial ) {

			refreshUniformsLine( uniforms, material );

			if ( material.isLineDashedMaterial ) {

				refreshUniformsDash( uniforms, material );

			}

		} else if ( material.isPointsMaterial ) {

			refreshUniformsPoints( uniforms, material, pixelRatio, height );

		} else if ( material.isSpriteMaterial ) {

			refreshUniformsSprites( uniforms, material );

		} else if ( material.isShadowMaterial ) {

			uniforms.color.value.copy( material.color );
			uniforms.opacity.value = material.opacity;

		} else if ( material.isShaderMaterial ) {

			material.uniformsNeedUpdate = false; // #15581

		}

	}

	function refreshUniformsCommon( uniforms, material ) {

		uniforms.opacity.value = material.opacity;

		if ( material.color ) {

			uniforms.diffuse.value.copy( material.color );

		}

		if ( material.emissive ) {

			uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

		}

		if ( material.map ) {

			uniforms.map.value = material.map;

		}

		if ( material.alphaMap ) {

			uniforms.alphaMap.value = material.alphaMap;

		}

		if ( material.specularMap ) {

			uniforms.specularMap.value = material.specularMap;

		}

		const envMap = properties.get( material ).envMap;

		if ( envMap ) {

			uniforms.envMap.value = envMap;

			uniforms.flipEnvMap.value = ( envMap.isCubeTexture && envMap._needsFlipEnvMap ) ? - 1 : 1;

			uniforms.reflectivity.value = material.reflectivity;
			uniforms.refractionRatio.value = material.refractionRatio;

			const maxMipLevel = properties.get( envMap ).__maxMipLevel;

			if ( maxMipLevel !== undefined ) {

				uniforms.maxMipLevel.value = maxMipLevel;

			}

		}

		if ( material.lightMap ) {

			uniforms.lightMap.value = material.lightMap;
			uniforms.lightMapIntensity.value = material.lightMapIntensity;

		}

		if ( material.aoMap ) {

			uniforms.aoMap.value = material.aoMap;
			uniforms.aoMapIntensity.value = material.aoMapIntensity;

		}

		// uv repeat and offset setting priorities
		// 1. color map
		// 2. specular map
		// 3. displacementMap map
		// 4. normal map
		// 5. bump map
		// 6. roughnessMap map
		// 7. metalnessMap map
		// 8. alphaMap map
		// 9. emissiveMap map
		// 10. clearcoat map
		// 11. clearcoat normal map
		// 12. clearcoat roughnessMap map

		let uvScaleMap;

		if ( material.map ) {

			uvScaleMap = material.map;

		} else if ( material.specularMap ) {

			uvScaleMap = material.specularMap;

		} else if ( material.displacementMap ) {

			uvScaleMap = material.displacementMap;

		} else if ( material.normalMap ) {

			uvScaleMap = material.normalMap;

		} else if ( material.bumpMap ) {

			uvScaleMap = material.bumpMap;

		} else if ( material.roughnessMap ) {

			uvScaleMap = material.roughnessMap;

		} else if ( material.metalnessMap ) {

			uvScaleMap = material.metalnessMap;

		} else if ( material.alphaMap ) {

			uvScaleMap = material.alphaMap;

		} else if ( material.emissiveMap ) {

			uvScaleMap = material.emissiveMap;

		} else if ( material.clearcoatMap ) {

			uvScaleMap = material.clearcoatMap;

		} else if ( material.clearcoatNormalMap ) {

			uvScaleMap = material.clearcoatNormalMap;

		} else if ( material.clearcoatRoughnessMap ) {

			uvScaleMap = material.clearcoatRoughnessMap;

		}

		if ( uvScaleMap !== undefined ) {

			// backwards compatibility
			if ( uvScaleMap.isWebGLRenderTarget ) {

				uvScaleMap = uvScaleMap.texture;

			}

			if ( uvScaleMap.matrixAutoUpdate === true ) {

				uvScaleMap.updateMatrix();

			}

			uniforms.uvTransform.value.copy( uvScaleMap.matrix );

		}

		// uv repeat and offset setting priorities for uv2
		// 1. ao map
		// 2. light map

		let uv2ScaleMap;

		if ( material.aoMap ) {

			uv2ScaleMap = material.aoMap;

		} else if ( material.lightMap ) {

			uv2ScaleMap = material.lightMap;

		}

		if ( uv2ScaleMap !== undefined ) {

			// backwards compatibility
			if ( uv2ScaleMap.isWebGLRenderTarget ) {

				uv2ScaleMap = uv2ScaleMap.texture;

			}

			if ( uv2ScaleMap.matrixAutoUpdate === true ) {

				uv2ScaleMap.updateMatrix();

			}

			uniforms.uv2Transform.value.copy( uv2ScaleMap.matrix );

		}

	}

	function refreshUniformsLine( uniforms, material ) {

		uniforms.diffuse.value.copy( material.color );
		uniforms.opacity.value = material.opacity;

	}

	function refreshUniformsDash( uniforms, material ) {

		uniforms.dashSize.value = material.dashSize;
		uniforms.totalSize.value = material.dashSize + material.gapSize;
		uniforms.scale.value = material.scale;

	}

	function refreshUniformsPoints( uniforms, material, pixelRatio, height ) {

		uniforms.diffuse.value.copy( material.color );
		uniforms.opacity.value = material.opacity;
		uniforms.size.value = material.size * pixelRatio;
		uniforms.scale.value = height * 0.5;

		if ( material.map ) {

			uniforms.map.value = material.map;

		}

		if ( material.alphaMap ) {

			uniforms.alphaMap.value = material.alphaMap;

		}

		// uv repeat and offset setting priorities
		// 1. color map
		// 2. alpha map

		let uvScaleMap;

		if ( material.map ) {

			uvScaleMap = material.map;

		} else if ( material.alphaMap ) {

			uvScaleMap = material.alphaMap;

		}

		if ( uvScaleMap !== undefined ) {

			if ( uvScaleMap.matrixAutoUpdate === true ) {

				uvScaleMap.updateMatrix();

			}

			uniforms.uvTransform.value.copy( uvScaleMap.matrix );

		}

	}

	function refreshUniformsSprites( uniforms, material ) {

		uniforms.diffuse.value.copy( material.color );
		uniforms.opacity.value = material.opacity;
		uniforms.rotation.value = material.rotation;

		if ( material.map ) {

			uniforms.map.value = material.map;

		}

		if ( material.alphaMap ) {

			uniforms.alphaMap.value = material.alphaMap;

		}

		// uv repeat and offset setting priorities
		// 1. color map
		// 2. alpha map

		let uvScaleMap;

		if ( material.map ) {

			uvScaleMap = material.map;

		} else if ( material.alphaMap ) {

			uvScaleMap = material.alphaMap;

		}

		if ( uvScaleMap !== undefined ) {

			if ( uvScaleMap.matrixAutoUpdate === true ) {

				uvScaleMap.updateMatrix();

			}

			uniforms.uvTransform.value.copy( uvScaleMap.matrix );

		}

	}

	function refreshUniformsLambert( uniforms, material ) {

		if ( material.emissiveMap ) {

			uniforms.emissiveMap.value = material.emissiveMap;

		}

	}

	function refreshUniformsPhong( uniforms, material ) {

		uniforms.specular.value.copy( material.specular );
		uniforms.shininess.value = Math.max( material.shininess, 1e-4 ); // to prevent pow( 0.0, 0.0 )

		if ( material.emissiveMap ) {

			uniforms.emissiveMap.value = material.emissiveMap;

		}

		if ( material.bumpMap ) {

			uniforms.bumpMap.value = material.bumpMap;
			uniforms.bumpScale.value = material.bumpScale;
			if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

		}

		if ( material.normalMap ) {

			uniforms.normalMap.value = material.normalMap;
			uniforms.normalScale.value.copy( material.normalScale );
			if ( material.side === BackSide ) uniforms.normalScale.value.negate();

		}

		if ( material.displacementMap ) {

			uniforms.displacementMap.value = material.displacementMap;
			uniforms.displacementScale.value = material.displacementScale;
			uniforms.displacementBias.value = material.displacementBias;

		}

	}

	function refreshUniformsToon( uniforms, material ) {

		if ( material.gradientMap ) {

			uniforms.gradientMap.value = material.gradientMap;

		}

		if ( material.emissiveMap ) {

			uniforms.emissiveMap.value = material.emissiveMap;

		}

		if ( material.bumpMap ) {

			uniforms.bumpMap.value = material.bumpMap;
			uniforms.bumpScale.value = material.bumpScale;
			if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

		}

		if ( material.normalMap ) {

			uniforms.normalMap.value = material.normalMap;
			uniforms.normalScale.value.copy( material.normalScale );
			if ( material.side === BackSide ) uniforms.normalScale.value.negate();

		}

		if ( material.displacementMap ) {

			uniforms.displacementMap.value = material.displacementMap;
			uniforms.displacementScale.value = material.displacementScale;
			uniforms.displacementBias.value = material.displacementBias;

		}

	}

	function refreshUniformsStandard( uniforms, material ) {

		uniforms.roughness.value = material.roughness;
		uniforms.metalness.value = material.metalness;

		if ( material.roughnessMap ) {

			uniforms.roughnessMap.value = material.roughnessMap;

		}

		if ( material.metalnessMap ) {

			uniforms.metalnessMap.value = material.metalnessMap;

		}

		if ( material.emissiveMap ) {

			uniforms.emissiveMap.value = material.emissiveMap;

		}

		if ( material.bumpMap ) {

			uniforms.bumpMap.value = material.bumpMap;
			uniforms.bumpScale.value = material.bumpScale;
			if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

		}

		if ( material.normalMap ) {

			uniforms.normalMap.value = material.normalMap;
			uniforms.normalScale.value.copy( material.normalScale );
			if ( material.side === BackSide ) uniforms.normalScale.value.negate();

		}

		if ( material.displacementMap ) {

			uniforms.displacementMap.value = material.displacementMap;
			uniforms.displacementScale.value = material.displacementScale;
			uniforms.displacementBias.value = material.displacementBias;

		}

		const envMap = properties.get( material ).envMap;

		if ( envMap ) {

			//uniforms.envMap.value = material.envMap; // part of uniforms common
			uniforms.envMapIntensity.value = material.envMapIntensity;

		}

	}

	function refreshUniformsPhysical( uniforms, material ) {

		refreshUniformsStandard( uniforms, material );

		uniforms.reflectivity.value = material.reflectivity; // also part of uniforms common

		uniforms.clearcoat.value = material.clearcoat;
		uniforms.clearcoatRoughness.value = material.clearcoatRoughness;
		if ( material.sheen ) uniforms.sheen.value.copy( material.sheen );

		if ( material.clearcoatMap ) {

			uniforms.clearcoatMap.value = material.clearcoatMap;

		}

		if ( material.clearcoatRoughnessMap ) {

			uniforms.clearcoatRoughnessMap.value = material.clearcoatRoughnessMap;

		}

		if ( material.clearcoatNormalMap ) {

			uniforms.clearcoatNormalScale.value.copy( material.clearcoatNormalScale );
			uniforms.clearcoatNormalMap.value = material.clearcoatNormalMap;

			if ( material.side === BackSide ) {

				uniforms.clearcoatNormalScale.value.negate();

			}

		}

		uniforms.transmission.value = material.transmission;

		if ( material.transmissionMap ) {

			uniforms.transmissionMap.value = material.transmissionMap;

		}

	}

	function refreshUniformsMatcap( uniforms, material ) {

		if ( material.matcap ) {

			uniforms.matcap.value = material.matcap;

		}

		if ( material.bumpMap ) {

			uniforms.bumpMap.value = material.bumpMap;
			uniforms.bumpScale.value = material.bumpScale;
			if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

		}

		if ( material.normalMap ) {

			uniforms.normalMap.value = material.normalMap;
			uniforms.normalScale.value.copy( material.normalScale );
			if ( material.side === BackSide ) uniforms.normalScale.value.negate();

		}

		if ( material.displacementMap ) {

			uniforms.displacementMap.value = material.displacementMap;
			uniforms.displacementScale.value = material.displacementScale;
			uniforms.displacementBias.value = material.displacementBias;

		}

	}

	function refreshUniformsDepth( uniforms, material ) {

		if ( material.displacementMap ) {

			uniforms.displacementMap.value = material.displacementMap;
			uniforms.displacementScale.value = material.displacementScale;
			uniforms.displacementBias.value = material.displacementBias;

		}

	}

	function refreshUniformsDistance( uniforms, material ) {

		if ( material.displacementMap ) {

			uniforms.displacementMap.value = material.displacementMap;
			uniforms.displacementScale.value = material.displacementScale;
			uniforms.displacementBias.value = material.displacementBias;

		}

		uniforms.referencePosition.value.copy( material.referencePosition );
		uniforms.nearDistance.value = material.nearDistance;
		uniforms.farDistance.value = material.farDistance;

	}

	function refreshUniformsNormal( uniforms, material ) {

		if ( material.bumpMap ) {

			uniforms.bumpMap.value = material.bumpMap;
			uniforms.bumpScale.value = material.bumpScale;
			if ( material.side === BackSide ) uniforms.bumpScale.value *= - 1;

		}

		if ( material.normalMap ) {

			uniforms.normalMap.value = material.normalMap;
			uniforms.normalScale.value.copy( material.normalScale );
			if ( material.side === BackSide ) uniforms.normalScale.value.negate();

		}

		if ( material.displacementMap ) {

			uniforms.displacementMap.value = material.displacementMap;
			uniforms.displacementScale.value = material.displacementScale;
			uniforms.displacementBias.value = material.displacementBias;

		}

	}

	return {
		refreshFogUniforms: refreshFogUniforms,
		refreshMaterialUniforms: refreshMaterialUniforms
	};

}

function createCanvasElement() {

	const canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
	canvas.style.display = 'block';
	return canvas;

}

function WebGLRenderer( parameters ) {

	parameters = parameters || {};

	const _canvas = parameters.canvas !== undefined ? parameters.canvas : createCanvasElement(),
		_context = parameters.context !== undefined ? parameters.context : null,

		_alpha = parameters.alpha !== undefined ? parameters.alpha : false,
		_depth = parameters.depth !== undefined ? parameters.depth : true,
		_stencil = parameters.stencil !== undefined ? parameters.stencil : true,
		_antialias = parameters.antialias !== undefined ? parameters.antialias : false,
		_premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
		_preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
		_powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default',
		_failIfMajorPerformanceCaveat = parameters.failIfMajorPerformanceCaveat !== undefined ? parameters.failIfMajorPerformanceCaveat : false;

	let currentRenderList = null;
	let currentRenderState = null;

	// render() can be called from within a callback triggered by another render.
	// We track this so that the nested render call gets its list and state isolated from the parent render call.

	const renderListStack = [];
	const renderStateStack = [];

	// public properties

	this.domElement = _canvas;

	// Debug configuration container
	this.debug = {

		/**
		 * Enables error checking and reporting when shader programs are being compiled
		 * @type {boolean}
		 */
		checkShaderErrors: true
	};

	// clearing

	this.autoClear = true;
	this.autoClearColor = true;
	this.autoClearDepth = true;
	this.autoClearStencil = true;

	// scene graph

	this.sortObjects = true;

	// user-defined clipping

	this.clippingPlanes = [];
	this.localClippingEnabled = false;

	// physically based shading

	this.gammaFactor = 2.0;	// for backwards compatibility
	this.outputEncoding = LinearEncoding;

	// physical lights

	this.physicallyCorrectLights = false;

	// tone mapping

	this.toneMapping = NoToneMapping;
	this.toneMappingExposure = 1.0;

	// morphs

	this.maxMorphTargets = 8;
	this.maxMorphNormals = 4;

	// internal properties

	const _this = this;

	let _isContextLost = false;

	// internal state cache

	let _framebuffer = null;

	let _currentActiveCubeFace = 0;
	let _currentActiveMipmapLevel = 0;
	let _currentRenderTarget = null;
	let _currentFramebuffer = null;
	let _currentMaterialId = - 1;

	let _currentCamera = null;

	const _currentViewport = new Vector4();
	const _currentScissor = new Vector4();
	let _currentScissorTest = null;

	//

	let _width = _canvas.width;
	let _height = _canvas.height;

	let _pixelRatio = 1;
	let _opaqueSort = null;
	let _transparentSort = null;

	const _viewport = new Vector4( 0, 0, _width, _height );
	const _scissor = new Vector4( 0, 0, _width, _height );
	let _scissorTest = false;

	// frustum

	const _frustum = new Frustum();

	// clipping

	let _clippingEnabled = false;
	let _localClippingEnabled = false;

	// camera matrices cache

	const _projScreenMatrix = new Matrix4();

	const _vector3 = new Vector3();

	const _emptyScene = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };

	function getTargetPixelRatio() {

		return _currentRenderTarget === null ? _pixelRatio : 1;

	}

	// initialize

	let _gl = _context;

	function getContext( contextNames, contextAttributes ) {

		for ( let i = 0; i < contextNames.length; i ++ ) {

			const contextName = contextNames[ i ];
			const context = _canvas.getContext( contextName, contextAttributes );
			if ( context !== null ) return context;

		}

		return null;

	}

	try {

		const contextAttributes = {
			alpha: _alpha,
			depth: _depth,
			stencil: _stencil,
			antialias: _antialias,
			premultipliedAlpha: _premultipliedAlpha,
			preserveDrawingBuffer: _preserveDrawingBuffer,
			powerPreference: _powerPreference,
			failIfMajorPerformanceCaveat: _failIfMajorPerformanceCaveat
		};

		// event listeners must be registered before WebGL context is created, see #12753

		_canvas.addEventListener( 'webglcontextlost', onContextLost, false );
		_canvas.addEventListener( 'webglcontextrestored', onContextRestore, false );

		if ( _gl === null ) {

			const contextNames = [ 'webgl2', 'webgl', 'experimental-webgl' ];

			if ( _this.isWebGL1Renderer === true ) {

				contextNames.shift();

			}

			_gl = getContext( contextNames, contextAttributes );

			if ( _gl === null ) {

				if ( getContext( contextNames ) ) {

					throw new Error( 'Error creating WebGL context with your selected attributes.' );

				} else {

					throw new Error( 'Error creating WebGL context.' );

				}

			}

		}

		// Some experimental-webgl implementations do not have getShaderPrecisionFormat

		if ( _gl.getShaderPrecisionFormat === undefined ) {

			_gl.getShaderPrecisionFormat = function () {

				return { 'rangeMin': 1, 'rangeMax': 1, 'precision': 1 };

			};

		}

	} catch ( error ) {

		console.error( 'THREE.WebGLRenderer: ' + error.message );
		throw error;

	}

	let extensions, capabilities, state, info;
	let properties, textures, cubemaps, attributes, geometries, objects;
	let programCache, materials, renderLists, renderStates, clipping;

	let background, morphtargets, bufferRenderer, indexedBufferRenderer;

	let utils, bindingStates;

	function initGLContext() {

		extensions = new WebGLExtensions( _gl );

		capabilities = new WebGLCapabilities( _gl, extensions, parameters );

		extensions.init( capabilities );

		utils = new WebGLUtils( _gl, extensions, capabilities );

		state = new WebGLState( _gl, extensions, capabilities );
		state.scissor( _currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ).floor() );
		state.viewport( _currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ).floor() );

		info = new WebGLInfo( _gl );
		properties = new WebGLProperties();
		textures = new WebGLTextures( _gl, extensions, state, properties, capabilities, utils, info );
		cubemaps = new WebGLCubeMaps( _this );
		attributes = new WebGLAttributes( _gl, capabilities );
		bindingStates = new WebGLBindingStates( _gl, extensions, attributes, capabilities );
		geometries = new WebGLGeometries( _gl, attributes, info, bindingStates );
		objects = new WebGLObjects( _gl, geometries, attributes, info );
		morphtargets = new WebGLMorphtargets( _gl );
		clipping = new WebGLClipping( properties );
		programCache = new WebGLPrograms( _this, cubemaps, extensions, capabilities, bindingStates, clipping );
		materials = new WebGLMaterials( properties );
		renderLists = new WebGLRenderLists( properties );
		renderStates = new WebGLRenderStates( extensions, capabilities );
		background = new WebGLBackground( _this, cubemaps, state, objects, _premultipliedAlpha );

		bufferRenderer = new WebGLBufferRenderer( _gl, extensions, info, capabilities );
		indexedBufferRenderer = new WebGLIndexedBufferRenderer( _gl, extensions, info, capabilities );

		info.programs = programCache.programs;

		_this.capabilities = capabilities;
		_this.extensions = extensions;
		_this.properties = properties;
		_this.renderLists = renderLists;
		_this.state = state;
		_this.info = info;

	}

	initGLContext();

	// xr

	const xr = new WebXRManager( _this, _gl );

	this.xr = xr;

	// shadow map

	const shadowMap = new WebGLShadowMap( _this, objects, capabilities.maxTextureSize );

	this.shadowMap = shadowMap;

	// API

	this.getContext = function () {

		return _gl;

	};

	this.getContextAttributes = function () {

		return _gl.getContextAttributes();

	};

	this.forceContextLoss = function () {

		const extension = extensions.get( 'WEBGL_lose_context' );
		if ( extension ) extension.loseContext();

	};

	this.forceContextRestore = function () {

		const extension = extensions.get( 'WEBGL_lose_context' );
		if ( extension ) extension.restoreContext();

	};

	this.getPixelRatio = function () {

		return _pixelRatio;

	};

	this.setPixelRatio = function ( value ) {

		if ( value === undefined ) return;

		_pixelRatio = value;

		this.setSize( _width, _height, false );

	};

	this.getSize = function ( target ) {

		if ( target === undefined ) {

			console.warn( 'WebGLRenderer: .getsize() now requires a Vector2 as an argument' );

			target = new Vector2();

		}

		return target.set( _width, _height );

	};

	this.setSize = function ( width, height, updateStyle ) {

		if ( xr.isPresenting ) {

			console.warn( 'THREE.WebGLRenderer: Can\'t change size while VR device is presenting.' );
			return;

		}

		_width = width;
		_height = height;

		_canvas.width = Math.floor( width * _pixelRatio );
		_canvas.height = Math.floor( height * _pixelRatio );

		if ( updateStyle !== false ) {

			_canvas.style.width = width + 'px';
			_canvas.style.height = height + 'px';

		}

		this.setViewport( 0, 0, width, height );

	};

	this.getDrawingBufferSize = function ( target ) {

		if ( target === undefined ) {

			console.warn( 'WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument' );

			target = new Vector2();

		}

		return target.set( _width * _pixelRatio, _height * _pixelRatio ).floor();

	};

	this.setDrawingBufferSize = function ( width, height, pixelRatio ) {

		_width = width;
		_height = height;

		_pixelRatio = pixelRatio;

		_canvas.width = Math.floor( width * pixelRatio );
		_canvas.height = Math.floor( height * pixelRatio );

		this.setViewport( 0, 0, width, height );

	};

	this.getCurrentViewport = function ( target ) {

		if ( target === undefined ) {

			console.warn( 'WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument' );

			target = new Vector4();

		}

		return target.copy( _currentViewport );

	};

	this.getViewport = function ( target ) {

		return target.copy( _viewport );

	};

	this.setViewport = function ( x, y, width, height ) {

		if ( x.isVector4 ) {

			_viewport.set( x.x, x.y, x.z, x.w );

		} else {

			_viewport.set( x, y, width, height );

		}

		state.viewport( _currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ).floor() );

	};

	this.getScissor = function ( target ) {

		return target.copy( _scissor );

	};

	this.setScissor = function ( x, y, width, height ) {

		if ( x.isVector4 ) {

			_scissor.set( x.x, x.y, x.z, x.w );

		} else {

			_scissor.set( x, y, width, height );

		}

		state.scissor( _currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ).floor() );

	};

	this.getScissorTest = function () {

		return _scissorTest;

	};

	this.setScissorTest = function ( boolean ) {

		state.setScissorTest( _scissorTest = boolean );

	};

	this.setOpaqueSort = function ( method ) {

		_opaqueSort = method;

	};

	this.setTransparentSort = function ( method ) {

		_transparentSort = method;

	};

	// Clearing

	this.getClearColor = function ( target ) {

		if ( target === undefined ) {

			console.warn( 'WebGLRenderer: .getClearColor() now requires a Color as an argument' );

			target = new Color();

		}

		return target.copy( background.getClearColor() );

	};

	this.setClearColor = function () {

		background.setClearColor.apply( background, arguments );

	};

	this.getClearAlpha = function () {

		return background.getClearAlpha();

	};

	this.setClearAlpha = function () {

		background.setClearAlpha.apply( background, arguments );

	};

	this.clear = function ( color, depth, stencil ) {

		let bits = 0;

		if ( color === undefined || color ) bits |= 16384;
		if ( depth === undefined || depth ) bits |= 256;
		if ( stencil === undefined || stencil ) bits |= 1024;

		_gl.clear( bits );

	};

	this.clearColor = function () {

		this.clear( true, false, false );

	};

	this.clearDepth = function () {

		this.clear( false, true, false );

	};

	this.clearStencil = function () {

		this.clear( false, false, true );

	};

	//

	this.dispose = function () {

		_canvas.removeEventListener( 'webglcontextlost', onContextLost, false );
		_canvas.removeEventListener( 'webglcontextrestored', onContextRestore, false );

		renderLists.dispose();
		renderStates.dispose();
		properties.dispose();
		cubemaps.dispose();
		objects.dispose();
		bindingStates.dispose();

		xr.dispose();

		animation.stop();

	};

	// Events

	function onContextLost( event ) {

		event.preventDefault();

		console.log( 'THREE.WebGLRenderer: Context Lost.' );

		_isContextLost = true;

	}

	function onContextRestore( /* event */ ) {

		console.log( 'THREE.WebGLRenderer: Context Restored.' );

		_isContextLost = false;

		initGLContext();

	}

	function onMaterialDispose( event ) {

		const material = event.target;

		material.removeEventListener( 'dispose', onMaterialDispose );

		deallocateMaterial( material );

	}

	// Buffer deallocation

	function deallocateMaterial( material ) {

		releaseMaterialProgramReference( material );

		properties.remove( material );

	}


	function releaseMaterialProgramReference( material ) {

		const programInfo = properties.get( material ).program;

		if ( programInfo !== undefined ) {

			programCache.releaseProgram( programInfo );

		}

	}

	// Buffer rendering

	function renderObjectImmediate( object, program ) {

		object.render( function ( object ) {

			_this.renderBufferImmediate( object, program );

		} );

	}

	this.renderBufferImmediate = function ( object, program ) {

		bindingStates.initAttributes();

		const buffers = properties.get( object );

		if ( object.hasPositions && ! buffers.position ) buffers.position = _gl.createBuffer();
		if ( object.hasNormals && ! buffers.normal ) buffers.normal = _gl.createBuffer();
		if ( object.hasUvs && ! buffers.uv ) buffers.uv = _gl.createBuffer();
		if ( object.hasColors && ! buffers.color ) buffers.color = _gl.createBuffer();

		const programAttributes = program.getAttributes();

		if ( object.hasPositions ) {

			_gl.bindBuffer( 34962, buffers.position );
			_gl.bufferData( 34962, object.positionArray, 35048 );

			bindingStates.enableAttribute( programAttributes.position );
			_gl.vertexAttribPointer( programAttributes.position, 3, 5126, false, 0, 0 );

		}

		if ( object.hasNormals ) {

			_gl.bindBuffer( 34962, buffers.normal );
			_gl.bufferData( 34962, object.normalArray, 35048 );

			bindingStates.enableAttribute( programAttributes.normal );
			_gl.vertexAttribPointer( programAttributes.normal, 3, 5126, false, 0, 0 );

		}

		if ( object.hasUvs ) {

			_gl.bindBuffer( 34962, buffers.uv );
			_gl.bufferData( 34962, object.uvArray, 35048 );

			bindingStates.enableAttribute( programAttributes.uv );
			_gl.vertexAttribPointer( programAttributes.uv, 2, 5126, false, 0, 0 );

		}

		if ( object.hasColors ) {

			_gl.bindBuffer( 34962, buffers.color );
			_gl.bufferData( 34962, object.colorArray, 35048 );

			bindingStates.enableAttribute( programAttributes.color );
			_gl.vertexAttribPointer( programAttributes.color, 3, 5126, false, 0, 0 );

		}

		bindingStates.disableUnusedAttributes();

		_gl.drawArrays( 4, 0, object.count );

		object.count = 0;

	};

	this.renderBufferDirect = function ( camera, scene, geometry, material, object, group ) {

		if ( scene === null ) scene = _emptyScene; // renderBufferDirect second parameter used to be fog (could be null)

		const frontFaceCW = ( object.isMesh && object.matrixWorld.determinant() < 0 );

		const program = setProgram( camera, scene, material, object );

		state.setMaterial( material, frontFaceCW );

		//

		let index = geometry.index;
		const position = geometry.attributes.position;

		//

		if ( index === null ) {

			if ( position === undefined || position.count === 0 ) return;

		} else if ( index.count === 0 ) {

			return;

		}

		//

		let rangeFactor = 1;

		if ( material.wireframe === true ) {

			index = geometries.getWireframeAttribute( geometry );
			rangeFactor = 2;

		}

		if ( material.morphTargets || material.morphNormals ) {

			morphtargets.update( object, geometry, material, program );

		}

		bindingStates.setup( object, material, program, geometry, index );

		let attribute;
		let renderer = bufferRenderer;

		if ( index !== null ) {

			attribute = attributes.get( index );

			renderer = indexedBufferRenderer;
			renderer.setIndex( attribute );

		}

		//

		const dataCount = ( index !== null ) ? index.count : position.count;

		const rangeStart = geometry.drawRange.start * rangeFactor;
		const rangeCount = geometry.drawRange.count * rangeFactor;

		const groupStart = group !== null ? group.start * rangeFactor : 0;
		const groupCount = group !== null ? group.count * rangeFactor : Infinity;

		const drawStart = Math.max( rangeStart, groupStart );
		const drawEnd = Math.min( dataCount, rangeStart + rangeCount, groupStart + groupCount ) - 1;

		const drawCount = Math.max( 0, drawEnd - drawStart + 1 );

		if ( drawCount === 0 ) return;

		//

		if ( object.isMesh ) {

			if ( material.wireframe === true ) {

				state.setLineWidth( material.wireframeLinewidth * getTargetPixelRatio() );
				renderer.setMode( 1 );

			} else {

				renderer.setMode( 4 );

			}

		} else if ( object.isLine ) {

			let lineWidth = material.linewidth;

			if ( lineWidth === undefined ) lineWidth = 1; // Not using Line*Material

			state.setLineWidth( lineWidth * getTargetPixelRatio() );

			if ( object.isLineSegments ) {

				renderer.setMode( 1 );

			} else if ( object.isLineLoop ) {

				renderer.setMode( 2 );

			} else {

				renderer.setMode( 3 );

			}

		} else if ( object.isPoints ) {

			renderer.setMode( 0 );

		} else if ( object.isSprite ) {

			renderer.setMode( 4 );

		}

		if ( object.isInstancedMesh ) {

			renderer.renderInstances( drawStart, drawCount, object.count );

		} else if ( geometry.isInstancedBufferGeometry ) {

			const instanceCount = Math.min( geometry.instanceCount, geometry._maxInstanceCount );

			renderer.renderInstances( drawStart, drawCount, instanceCount );

		} else {

			renderer.render( drawStart, drawCount );

		}

	};

	// Compile

	this.compile = function ( scene, camera ) {

		currentRenderState = renderStates.get( scene );
		currentRenderState.init();

		scene.traverseVisible( function ( object ) {

			if ( object.isLight && object.layers.test( camera.layers ) ) {

				currentRenderState.pushLight( object );

				if ( object.castShadow ) {

					currentRenderState.pushShadow( object );

				}

			}

		} );

		currentRenderState.setupLights();

		const compiled = new WeakMap();

		scene.traverse( function ( object ) {

			const material = object.material;

			if ( material ) {

				if ( Array.isArray( material ) ) {

					for ( let i = 0; i < material.length; i ++ ) {

						const material2 = material[ i ];

						if ( compiled.has( material2 ) === false ) {

							initMaterial( material2, scene, object );
							compiled.set( material2 );

						}

					}

				} else if ( compiled.has( material ) === false ) {

					initMaterial( material, scene, object );
					compiled.set( material );

				}

			}

		} );

	};

	// Animation Loop

	let onAnimationFrameCallback = null;

	function onAnimationFrame( time ) {

		if ( xr.isPresenting ) return;
		if ( onAnimationFrameCallback ) onAnimationFrameCallback( time );

	}

	const animation = new WebGLAnimation();
	animation.setAnimationLoop( onAnimationFrame );

	if ( typeof window !== 'undefined' ) animation.setContext( window );

	this.setAnimationLoop = function ( callback ) {

		onAnimationFrameCallback = callback;
		xr.setAnimationLoop( callback );

		( callback === null ) ? animation.stop() : animation.start();

	};

	// Rendering

	this.render = function ( scene, camera ) {

		let renderTarget, forceClear;

		if ( arguments[ 2 ] !== undefined ) {

			console.warn( 'THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead.' );
			renderTarget = arguments[ 2 ];

		}

		if ( arguments[ 3 ] !== undefined ) {

			console.warn( 'THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead.' );
			forceClear = arguments[ 3 ];

		}

		if ( camera !== undefined && camera.isCamera !== true ) {

			console.error( 'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.' );
			return;

		}

		if ( _isContextLost === true ) return;

		// reset caching for this frame

		bindingStates.resetDefaultState();
		_currentMaterialId = - 1;
		_currentCamera = null;

		// update scene graph

		if ( scene.autoUpdate === true ) scene.updateMatrixWorld();

		// update camera matrices and frustum

		if ( camera.parent === null ) camera.updateMatrixWorld();

		if ( xr.enabled === true && xr.isPresenting === true ) {

			camera = xr.getCamera( camera );

		}

		//
		if ( scene.isScene === true ) scene.onBeforeRender( _this, scene, camera, renderTarget || _currentRenderTarget );

		currentRenderState = renderStates.get( scene, renderStateStack.length );
		currentRenderState.init();

		renderStateStack.push( currentRenderState );

		_projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
		_frustum.setFromProjectionMatrix( _projScreenMatrix );

		_localClippingEnabled = this.localClippingEnabled;
		_clippingEnabled = clipping.init( this.clippingPlanes, _localClippingEnabled, camera );

		currentRenderList = renderLists.get( scene, renderListStack.length );
		currentRenderList.init();

		renderListStack.push( currentRenderList );

		projectObject( scene, camera, 0, _this.sortObjects );

		currentRenderList.finish();

		if ( _this.sortObjects === true ) {

			currentRenderList.sort( _opaqueSort, _transparentSort );

		}

		//

		if ( _clippingEnabled === true ) clipping.beginShadows();

		const shadowsArray = currentRenderState.state.shadowsArray;

		shadowMap.render( shadowsArray, scene, camera );

		currentRenderState.setupLights();
		currentRenderState.setupLightsView( camera );

		if ( _clippingEnabled === true ) clipping.endShadows();

		//

		if ( this.info.autoReset === true ) this.info.reset();

		if ( renderTarget !== undefined ) {

			this.setRenderTarget( renderTarget );

		}

		//

		background.render( currentRenderList, scene, camera, forceClear );

		// render scene

		const opaqueObjects = currentRenderList.opaque;
		const transparentObjects = currentRenderList.transparent;

		if ( opaqueObjects.length > 0 ) renderObjects( opaqueObjects, scene, camera );
		if ( transparentObjects.length > 0 ) renderObjects( transparentObjects, scene, camera );

		//

		if ( scene.isScene === true ) scene.onAfterRender( _this, scene, camera );

		//

		if ( _currentRenderTarget !== null ) {

			// Generate mipmap if we're using any kind of mipmap filtering

			textures.updateRenderTargetMipmap( _currentRenderTarget );

			// resolve multisample renderbuffers to a single-sample texture if necessary

			textures.updateMultisampleRenderTarget( _currentRenderTarget );

		}

		// Ensure depth buffer writing is enabled so it can be cleared on next render

		state.buffers.depth.setTest( true );
		state.buffers.depth.setMask( true );
		state.buffers.color.setMask( true );

		state.setPolygonOffset( false );

		// _gl.finish();

		renderStateStack.pop();

		if ( renderStateStack.length > 0 ) {

			currentRenderState = renderStateStack[ renderStateStack.length - 1 ];

		} else {

			currentRenderState = null;

		}

		renderListStack.pop();

		if ( renderListStack.length > 0 ) {

			currentRenderList = renderListStack[ renderListStack.length - 1 ];

		} else {

			currentRenderList = null;

		}

	};

	function projectObject( object, camera, groupOrder, sortObjects ) {

		if ( object.visible === false ) return;

		const visible = object.layers.test( camera.layers );

		if ( visible ) {

			if ( object.isGroup ) {

				groupOrder = object.renderOrder;

			} else if ( object.isLOD ) {

				if ( object.autoUpdate === true ) object.update( camera );

			} else if ( object.isLight ) {

				currentRenderState.pushLight( object );

				if ( object.castShadow ) {

					currentRenderState.pushShadow( object );

				}

			} else if ( object.isSprite ) {

				if ( ! object.frustumCulled || _frustum.intersectsSprite( object ) ) {

					if ( sortObjects ) {

						_vector3.setFromMatrixPosition( object.matrixWorld )
							.applyMatrix4( _projScreenMatrix );

					}

					const geometry = objects.update( object );
					const material = object.material;

					if ( material.visible ) {

						currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

					}

				}

			} else if ( object.isImmediateRenderObject ) {

				if ( sortObjects ) {

					_vector3.setFromMatrixPosition( object.matrixWorld )
						.applyMatrix4( _projScreenMatrix );

				}

				currentRenderList.push( object, null, object.material, groupOrder, _vector3.z, null );

			} else if ( object.isMesh || object.isLine || object.isPoints ) {

				if ( object.isSkinnedMesh ) {

					// update skeleton only once in a frame

					if ( object.skeleton.frame !== info.render.frame ) {

						object.skeleton.update();
						object.skeleton.frame = info.render.frame;

					}

				}

				if ( ! object.frustumCulled || _frustum.intersectsObject( object ) ) {

					if ( sortObjects ) {

						_vector3.setFromMatrixPosition( object.matrixWorld )
							.applyMatrix4( _projScreenMatrix );

					}

					const geometry = objects.update( object );
					const material = object.material;

					if ( Array.isArray( material ) ) {

						const groups = geometry.groups;

						for ( let i = 0, l = groups.length; i < l; i ++ ) {

							const group = groups[ i ];
							const groupMaterial = material[ group.materialIndex ];

							if ( groupMaterial && groupMaterial.visible ) {

								currentRenderList.push( object, geometry, groupMaterial, groupOrder, _vector3.z, group );

							}

						}

					} else if ( material.visible ) {

						currentRenderList.push( object, geometry, material, groupOrder, _vector3.z, null );

					}

				}

			}

		}

		const children = object.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			projectObject( children[ i ], camera, groupOrder, sortObjects );

		}

	}

	function renderObjects( renderList, scene, camera ) {

		const overrideMaterial = scene.isScene === true ? scene.overrideMaterial : null;

		for ( let i = 0, l = renderList.length; i < l; i ++ ) {

			const renderItem = renderList[ i ];

			const object = renderItem.object;
			const geometry = renderItem.geometry;
			const material = overrideMaterial === null ? renderItem.material : overrideMaterial;
			const group = renderItem.group;

			if ( camera.isArrayCamera ) {

				const cameras = camera.cameras;

				for ( let j = 0, jl = cameras.length; j < jl; j ++ ) {

					const camera2 = cameras[ j ];

					if ( object.layers.test( camera2.layers ) ) {

						state.viewport( _currentViewport.copy( camera2.viewport ) );

						currentRenderState.setupLightsView( camera2 );

						renderObject( object, scene, camera2, geometry, material, group );

					}

				}

			} else {

				renderObject( object, scene, camera, geometry, material, group );

			}

		}

	}

	function renderObject( object, scene, camera, geometry, material, group ) {

		object.onBeforeRender( _this, scene, camera, geometry, material, group );

		object.modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );
		object.normalMatrix.getNormalMatrix( object.modelViewMatrix );

		if ( object.isImmediateRenderObject ) {

			const program = setProgram( camera, scene, material, object );

			state.setMaterial( material );

			bindingStates.reset();

			renderObjectImmediate( object, program );

		} else {

			_this.renderBufferDirect( camera, scene, geometry, material, object, group );

		}

		object.onAfterRender( _this, scene, camera, geometry, material, group );

	}

	function initMaterial( material, scene, object ) {

		if ( scene.isScene !== true ) scene = _emptyScene; // scene could be a Mesh, Line, Points, ...

		const materialProperties = properties.get( material );

		const lights = currentRenderState.state.lights;
		const shadowsArray = currentRenderState.state.shadowsArray;

		const lightsStateVersion = lights.state.version;

		const parameters = programCache.getParameters( material, lights.state, shadowsArray, scene, object );
		const programCacheKey = programCache.getProgramCacheKey( parameters );

		let program = materialProperties.program;
		let programChange = true;

		// always update environment and fog - changing these trigger an initMaterial call, but it's possible that the program doesn't change

		materialProperties.environment = material.isMeshStandardMaterial ? scene.environment : null;
		materialProperties.fog = scene.fog;
		materialProperties.envMap = cubemaps.get( material.envMap || materialProperties.environment );

		if ( program === undefined ) {

			// new material
			material.addEventListener( 'dispose', onMaterialDispose );

		} else if ( program.cacheKey !== programCacheKey ) {

			// changed glsl or parameters
			releaseMaterialProgramReference( material );

		} else if ( materialProperties.lightsStateVersion !== lightsStateVersion ) {

			programChange = false;

		} else if ( parameters.shaderID !== undefined ) {

			// same glsl and uniform list
			return;

		} else {

			// only rebuild uniform list
			programChange = false;

		}

		if ( programChange ) {

			parameters.uniforms = programCache.getUniforms( material );

			material.onBeforeCompile( parameters, _this );

			program = programCache.acquireProgram( parameters, programCacheKey );

			materialProperties.program = program;
			materialProperties.uniforms = parameters.uniforms;
			materialProperties.outputEncoding = parameters.outputEncoding;

		}

		const uniforms = materialProperties.uniforms;

		if ( ! material.isShaderMaterial &&
			! material.isRawShaderMaterial ||
			material.clipping === true ) {

			materialProperties.numClippingPlanes = clipping.numPlanes;
			materialProperties.numIntersection = clipping.numIntersection;
			uniforms.clippingPlanes = clipping.uniform;

		}

		// store the light setup it was created for

		materialProperties.needsLights = materialNeedsLights( material );
		materialProperties.lightsStateVersion = lightsStateVersion;

		if ( materialProperties.needsLights ) {

			// wire up the material to this renderer's lighting state

			uniforms.ambientLightColor.value = lights.state.ambient;
			uniforms.lightProbe.value = lights.state.probe;
			uniforms.directionalLights.value = lights.state.directional;
			uniforms.directionalLightShadows.value = lights.state.directionalShadow;
			uniforms.spotLights.value = lights.state.spot;
			uniforms.spotLightShadows.value = lights.state.spotShadow;
			uniforms.rectAreaLights.value = lights.state.rectArea;
			uniforms.ltc_1.value = lights.state.rectAreaLTC1;
			uniforms.ltc_2.value = lights.state.rectAreaLTC2;
			uniforms.pointLights.value = lights.state.point;
			uniforms.pointLightShadows.value = lights.state.pointShadow;
			uniforms.hemisphereLights.value = lights.state.hemi;

			uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
			uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
			uniforms.spotShadowMap.value = lights.state.spotShadowMap;
			uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
			uniforms.pointShadowMap.value = lights.state.pointShadowMap;
			uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
			// TODO (abelnation): add area lights shadow info to uniforms

		}

		const progUniforms = materialProperties.program.getUniforms();
		const uniformsList = WebGLUniforms.seqWithValue( progUniforms.seq, uniforms );

		materialProperties.uniformsList = uniformsList;

	}

	function setProgram( camera, scene, material, object ) {

		if ( scene.isScene !== true ) scene = _emptyScene; // scene could be a Mesh, Line, Points, ...

		textures.resetTextureUnits();

		const fog = scene.fog;
		const environment = material.isMeshStandardMaterial ? scene.environment : null;
		const encoding = ( _currentRenderTarget === null ) ? _this.outputEncoding : _currentRenderTarget.texture.encoding;
		const envMap = cubemaps.get( material.envMap || environment );

		const materialProperties = properties.get( material );
		const lights = currentRenderState.state.lights;

		if ( _clippingEnabled === true ) {

			if ( _localClippingEnabled === true || camera !== _currentCamera ) {

				const useCache =
					camera === _currentCamera &&
					material.id === _currentMaterialId;

				// we might want to call this function with some ClippingGroup
				// object instead of the material, once it becomes feasible
				// (#8465, #8379)
				clipping.setState( material, camera, useCache );

			}

		}

		if ( material.version === materialProperties.__version ) {

			if ( material.fog && materialProperties.fog !== fog ) {

				initMaterial( material, scene, object );

			} else if ( materialProperties.environment !== environment ) {

				initMaterial( material, scene, object );

			} else if ( materialProperties.needsLights && ( materialProperties.lightsStateVersion !== lights.state.version ) ) {

				initMaterial( material, scene, object );

			} else if ( materialProperties.numClippingPlanes !== undefined &&
				( materialProperties.numClippingPlanes !== clipping.numPlanes ||
				materialProperties.numIntersection !== clipping.numIntersection ) ) {

				initMaterial( material, scene, object );

			} else if ( materialProperties.outputEncoding !== encoding ) {

				initMaterial( material, scene, object );

			} else if ( materialProperties.envMap !== envMap ) {

				initMaterial( material, scene, object );

			}

		} else {

			initMaterial( material, scene, object );
			materialProperties.__version = material.version;

		}

		let refreshProgram = false;
		let refreshMaterial = false;
		let refreshLights = false;

		const program = materialProperties.program,
			p_uniforms = program.getUniforms(),
			m_uniforms = materialProperties.uniforms;

		if ( state.useProgram( program.program ) ) {

			refreshProgram = true;
			refreshMaterial = true;
			refreshLights = true;

		}

		if ( material.id !== _currentMaterialId ) {

			_currentMaterialId = material.id;

			refreshMaterial = true;

		}

		if ( refreshProgram || _currentCamera !== camera ) {

			p_uniforms.setValue( _gl, 'projectionMatrix', camera.projectionMatrix );

			if ( capabilities.logarithmicDepthBuffer ) {

				p_uniforms.setValue( _gl, 'logDepthBufFC',
					2.0 / ( Math.log( camera.far + 1.0 ) / Math.LN2 ) );

			}

			if ( _currentCamera !== camera ) {

				_currentCamera = camera;

				// lighting uniforms depend on the camera so enforce an update
				// now, in case this material supports lights - or later, when
				// the next material that does gets activated:

				refreshMaterial = true;		// set to true on material change
				refreshLights = true;		// remains set until update done

			}

			// load material specific uniforms
			// (shader material also gets them for the sake of genericity)

			if ( material.isShaderMaterial ||
				material.isMeshPhongMaterial ||
				material.isMeshToonMaterial ||
				material.isMeshStandardMaterial ||
				material.envMap ) {

				const uCamPos = p_uniforms.map.cameraPosition;

				if ( uCamPos !== undefined ) {

					uCamPos.setValue( _gl,
						_vector3.setFromMatrixPosition( camera.matrixWorld ) );

				}

			}

			if ( material.isMeshPhongMaterial ||
				material.isMeshToonMaterial ||
				material.isMeshLambertMaterial ||
				material.isMeshBasicMaterial ||
				material.isMeshStandardMaterial ||
				material.isShaderMaterial ) {

				p_uniforms.setValue( _gl, 'isOrthographic', camera.isOrthographicCamera === true );

			}

			if ( material.isMeshPhongMaterial ||
				material.isMeshToonMaterial ||
				material.isMeshLambertMaterial ||
				material.isMeshBasicMaterial ||
				material.isMeshStandardMaterial ||
				material.isShaderMaterial ||
				material.isShadowMaterial ||
				material.skinning ) {

				p_uniforms.setValue( _gl, 'viewMatrix', camera.matrixWorldInverse );

			}

		}

		// skinning uniforms must be set even if material didn't change
		// auto-setting of texture unit for bone texture must go before other textures
		// otherwise textures used for skinning can take over texture units reserved for other material textures

		if ( material.skinning ) {

			p_uniforms.setOptional( _gl, object, 'bindMatrix' );
			p_uniforms.setOptional( _gl, object, 'bindMatrixInverse' );

			const skeleton = object.skeleton;

			if ( skeleton ) {

				const bones = skeleton.bones;

				if ( capabilities.floatVertexTextures ) {

					if ( skeleton.boneTexture === null ) {

						// layout (1 matrix = 4 pixels)
						//      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
						//  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
						//       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
						//       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
						//       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)


						let size = Math.sqrt( bones.length * 4 ); // 4 pixels needed for 1 matrix
						size = MathUtils.ceilPowerOfTwo( size );
						size = Math.max( size, 4 );

						const boneMatrices = new Float32Array( size * size * 4 ); // 4 floats per RGBA pixel
						boneMatrices.set( skeleton.boneMatrices ); // copy current values

						const boneTexture = new DataTexture( boneMatrices, size, size, RGBAFormat, FloatType );

						skeleton.boneMatrices = boneMatrices;
						skeleton.boneTexture = boneTexture;
						skeleton.boneTextureSize = size;

					}

					p_uniforms.setValue( _gl, 'boneTexture', skeleton.boneTexture, textures );
					p_uniforms.setValue( _gl, 'boneTextureSize', skeleton.boneTextureSize );

				} else {

					p_uniforms.setOptional( _gl, skeleton, 'boneMatrices' );

				}

			}

		}

		if ( refreshMaterial || materialProperties.receiveShadow !== object.receiveShadow ) {

			materialProperties.receiveShadow = object.receiveShadow;
			p_uniforms.setValue( _gl, 'receiveShadow', object.receiveShadow );

		}

		if ( refreshMaterial ) {

			p_uniforms.setValue( _gl, 'toneMappingExposure', _this.toneMappingExposure );

			if ( materialProperties.needsLights ) {

				// the current material requires lighting info

				// note: all lighting uniforms are always set correctly
				// they simply reference the renderer's state for their
				// values
				//
				// use the current material's .needsUpdate flags to set
				// the GL state when required

				markUniformsLightsNeedsUpdate( m_uniforms, refreshLights );

			}

			// refresh uniforms common to several materials

			if ( fog && material.fog ) {

				materials.refreshFogUniforms( m_uniforms, fog );

			}

			materials.refreshMaterialUniforms( m_uniforms, material, _pixelRatio, _height );

			WebGLUniforms.upload( _gl, materialProperties.uniformsList, m_uniforms, textures );

		}

		if ( material.isShaderMaterial && material.uniformsNeedUpdate === true ) {

			WebGLUniforms.upload( _gl, materialProperties.uniformsList, m_uniforms, textures );
			material.uniformsNeedUpdate = false;

		}

		if ( material.isSpriteMaterial ) {

			p_uniforms.setValue( _gl, 'center', object.center );

		}

		// common matrices

		p_uniforms.setValue( _gl, 'modelViewMatrix', object.modelViewMatrix );
		p_uniforms.setValue( _gl, 'normalMatrix', object.normalMatrix );
		p_uniforms.setValue( _gl, 'modelMatrix', object.matrixWorld );

		return program;

	}

	// If uniforms are marked as clean, they don't need to be loaded to the GPU.

	function markUniformsLightsNeedsUpdate( uniforms, value ) {

		uniforms.ambientLightColor.needsUpdate = value;
		uniforms.lightProbe.needsUpdate = value;

		uniforms.directionalLights.needsUpdate = value;
		uniforms.directionalLightShadows.needsUpdate = value;
		uniforms.pointLights.needsUpdate = value;
		uniforms.pointLightShadows.needsUpdate = value;
		uniforms.spotLights.needsUpdate = value;
		uniforms.spotLightShadows.needsUpdate = value;
		uniforms.rectAreaLights.needsUpdate = value;
		uniforms.hemisphereLights.needsUpdate = value;

	}

	function materialNeedsLights( material ) {

		return material.isMeshLambertMaterial || material.isMeshToonMaterial || material.isMeshPhongMaterial ||
			material.isMeshStandardMaterial || material.isShadowMaterial ||
			( material.isShaderMaterial && material.lights === true );

	}

	//
	this.setFramebuffer = function ( value ) {

		if ( _framebuffer !== value && _currentRenderTarget === null ) _gl.bindFramebuffer( 36160, value );

		_framebuffer = value;

	};

	this.getActiveCubeFace = function () {

		return _currentActiveCubeFace;

	};

	this.getActiveMipmapLevel = function () {

		return _currentActiveMipmapLevel;

	};

	this.getRenderTarget = function () {

		return _currentRenderTarget;

	};

	this.setRenderTarget = function ( renderTarget, activeCubeFace = 0, activeMipmapLevel = 0 ) {

		_currentRenderTarget = renderTarget;
		_currentActiveCubeFace = activeCubeFace;
		_currentActiveMipmapLevel = activeMipmapLevel;

		if ( renderTarget && properties.get( renderTarget ).__webglFramebuffer === undefined ) {

			textures.setupRenderTarget( renderTarget );

		}

		let framebuffer = _framebuffer;
		let isCube = false;
		let isRenderTarget3D = false;

		if ( renderTarget ) {

			const texture = renderTarget.texture;

			if ( texture.isDataTexture3D || texture.isDataTexture2DArray ) {

				isRenderTarget3D = true;

			}

			const __webglFramebuffer = properties.get( renderTarget ).__webglFramebuffer;

			if ( renderTarget.isWebGLCubeRenderTarget ) {

				framebuffer = __webglFramebuffer[ activeCubeFace ];
				isCube = true;

			} else if ( renderTarget.isWebGLMultisampleRenderTarget ) {

				framebuffer = properties.get( renderTarget ).__webglMultisampledFramebuffer;

			} else {

				framebuffer = __webglFramebuffer;

			}

			_currentViewport.copy( renderTarget.viewport );
			_currentScissor.copy( renderTarget.scissor );
			_currentScissorTest = renderTarget.scissorTest;

		} else {

			_currentViewport.copy( _viewport ).multiplyScalar( _pixelRatio ).floor();
			_currentScissor.copy( _scissor ).multiplyScalar( _pixelRatio ).floor();
			_currentScissorTest = _scissorTest;

		}

		if ( _currentFramebuffer !== framebuffer ) {

			_gl.bindFramebuffer( 36160, framebuffer );
			_currentFramebuffer = framebuffer;

		}

		state.viewport( _currentViewport );
		state.scissor( _currentScissor );
		state.setScissorTest( _currentScissorTest );

		if ( isCube ) {

			const textureProperties = properties.get( renderTarget.texture );
			_gl.framebufferTexture2D( 36160, 36064, 34069 + activeCubeFace, textureProperties.__webglTexture, activeMipmapLevel );

		} else if ( isRenderTarget3D ) {

			const textureProperties = properties.get( renderTarget.texture );
			const layer = activeCubeFace || 0;
			_gl.framebufferTextureLayer( 36160, 36064, textureProperties.__webglTexture, activeMipmapLevel || 0, layer );

		}

	};

	this.readRenderTargetPixels = function ( renderTarget, x, y, width, height, buffer, activeCubeFaceIndex ) {

		if ( ! ( renderTarget && renderTarget.isWebGLRenderTarget ) ) {

			console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.' );
			return;

		}

		let framebuffer = properties.get( renderTarget ).__webglFramebuffer;

		if ( renderTarget.isWebGLCubeRenderTarget && activeCubeFaceIndex !== undefined ) {

			framebuffer = framebuffer[ activeCubeFaceIndex ];

		}

		if ( framebuffer ) {

			let restore = false;

			if ( framebuffer !== _currentFramebuffer ) {

				_gl.bindFramebuffer( 36160, framebuffer );

				restore = true;

			}

			try {

				const texture = renderTarget.texture;
				const textureFormat = texture.format;
				const textureType = texture.type;

				if ( textureFormat !== RGBAFormat && utils.convert( textureFormat ) !== _gl.getParameter( 35739 ) ) {

					console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.' );
					return;

				}

				const halfFloatSupportedByExt = ( textureType === HalfFloatType ) && ( extensions.has( 'EXT_color_buffer_half_float' ) || ( capabilities.isWebGL2 && extensions.has( 'EXT_color_buffer_float' ) ) );

				if ( textureType !== UnsignedByteType && utils.convert( textureType ) !== _gl.getParameter( 35738 ) && // Edge and Chrome Mac < 52 (#9513)
					! ( textureType === FloatType && ( capabilities.isWebGL2 || extensions.has( 'OES_texture_float' ) || extensions.has( 'WEBGL_color_buffer_float' ) ) ) && // Chrome Mac >= 52 and Firefox
					! halfFloatSupportedByExt ) {

					console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.' );
					return;

				}

				if ( _gl.checkFramebufferStatus( 36160 ) === 36053 ) {

					// the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)

					if ( ( x >= 0 && x <= ( renderTarget.width - width ) ) && ( y >= 0 && y <= ( renderTarget.height - height ) ) ) {

						_gl.readPixels( x, y, width, height, utils.convert( textureFormat ), utils.convert( textureType ), buffer );

					}

				} else {

					console.error( 'THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.' );

				}

			} finally {

				if ( restore ) {

					_gl.bindFramebuffer( 36160, _currentFramebuffer );

				}

			}

		}

	};

	this.copyFramebufferToTexture = function ( position, texture, level = 0 ) {

		const levelScale = Math.pow( 2, - level );
		const width = Math.floor( texture.image.width * levelScale );
		const height = Math.floor( texture.image.height * levelScale );
		const glFormat = utils.convert( texture.format );

		textures.setTexture2D( texture, 0 );

		_gl.copyTexImage2D( 3553, level, glFormat, position.x, position.y, width, height, 0 );

		state.unbindTexture();

	};

	this.copyTextureToTexture = function ( position, srcTexture, dstTexture, level = 0 ) {

		const width = srcTexture.image.width;
		const height = srcTexture.image.height;
		const glFormat = utils.convert( dstTexture.format );
		const glType = utils.convert( dstTexture.type );

		textures.setTexture2D( dstTexture, 0 );

		// As another texture upload may have changed pixelStorei
		// parameters, make sure they are correct for the dstTexture
		_gl.pixelStorei( 37440, dstTexture.flipY );
		_gl.pixelStorei( 37441, dstTexture.premultiplyAlpha );
		_gl.pixelStorei( 3317, dstTexture.unpackAlignment );

		if ( srcTexture.isDataTexture ) {

			_gl.texSubImage2D( 3553, level, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data );

		} else {

			if ( srcTexture.isCompressedTexture ) {

				_gl.compressedTexSubImage2D( 3553, level, position.x, position.y, srcTexture.mipmaps[ 0 ].width, srcTexture.mipmaps[ 0 ].height, glFormat, srcTexture.mipmaps[ 0 ].data );

			} else {

				_gl.texSubImage2D( 3553, level, position.x, position.y, glFormat, glType, srcTexture.image );

			}

		}

		// Generate mipmaps only when copying level 0
		if ( level === 0 && dstTexture.generateMipmaps ) _gl.generateMipmap( 3553 );

		state.unbindTexture();

	};

	this.copyTextureToTexture3D = function ( sourceBox, position, srcTexture, dstTexture, level = 0 ) {

		if ( _this.isWebGL1Renderer ) {

			console.warn( 'THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.' );
			return;

		}

		const { width, height, data } = srcTexture.image;
		const glFormat = utils.convert( dstTexture.format );
		const glType = utils.convert( dstTexture.type );
		let glTarget;

		if ( dstTexture.isDataTexture3D ) {

			textures.setTexture3D( dstTexture, 0 );
			glTarget = 32879;

		} else if ( dstTexture.isDataTexture2DArray ) {

			textures.setTexture2DArray( dstTexture, 0 );
			glTarget = 35866;

		} else {

			console.warn( 'THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.' );
			return;

		}

		_gl.pixelStorei( 37440, dstTexture.flipY );
		_gl.pixelStorei( 37441, dstTexture.premultiplyAlpha );
		_gl.pixelStorei( 3317, dstTexture.unpackAlignment );

		const unpackRowLen = _gl.getParameter( 3314 );
		const unpackImageHeight = _gl.getParameter( 32878 );
		const unpackSkipPixels = _gl.getParameter( 3316 );
		const unpackSkipRows = _gl.getParameter( 3315 );
		const unpackSkipImages = _gl.getParameter( 32877 );

		_gl.pixelStorei( 3314, width );
		_gl.pixelStorei( 32878, height );
		_gl.pixelStorei( 3316, sourceBox.min.x );
		_gl.pixelStorei( 3315, sourceBox.min.y );
		_gl.pixelStorei( 32877, sourceBox.min.z );

		_gl.texSubImage3D(
			glTarget,
			level,
			position.x,
			position.y,
			position.z,
			sourceBox.max.x - sourceBox.min.x + 1,
			sourceBox.max.y - sourceBox.min.y + 1,
			sourceBox.max.z - sourceBox.min.z + 1,
			glFormat,
			glType,
			data
		);

		_gl.pixelStorei( 3314, unpackRowLen );
		_gl.pixelStorei( 32878, unpackImageHeight );
		_gl.pixelStorei( 3316, unpackSkipPixels );
		_gl.pixelStorei( 3315, unpackSkipRows );
		_gl.pixelStorei( 32877, unpackSkipImages );

		// Generate mipmaps only when copying level 0
		if ( level === 0 && dstTexture.generateMipmaps ) _gl.generateMipmap( glTarget );

		state.unbindTexture();

	};

	this.initTexture = function ( texture ) {

		textures.setTexture2D( texture, 0 );

		state.unbindTexture();

	};

	this.resetState = function () {

		state.reset();
		bindingStates.reset();

	};

	if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

		__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'observe', { detail: this } ) ); // eslint-disable-line no-undef

	}

}

class Scene extends Object3D {

	constructor() {

		super();

		this.type = 'Scene';

		this.background = null;
		this.environment = null;
		this.fog = null;

		this.overrideMaterial = null;

		this.autoUpdate = true; // checked by the renderer

		if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

			__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'observe', { detail: this } ) ); // eslint-disable-line no-undef

		}

	}

	copy( source, recursive ) {

		super.copy( source, recursive );

		if ( source.background !== null ) this.background = source.background.clone();
		if ( source.environment !== null ) this.environment = source.environment.clone();
		if ( source.fog !== null ) this.fog = source.fog.clone();

		if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

		this.autoUpdate = source.autoUpdate;
		this.matrixAutoUpdate = source.matrixAutoUpdate;

		return this;

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		if ( this.background !== null ) data.object.background = this.background.toJSON( meta );
		if ( this.environment !== null ) data.object.environment = this.environment.toJSON( meta );
		if ( this.fog !== null ) data.object.fog = this.fog.toJSON();

		return data;

	}

}

Scene.prototype.isScene = true;

function InterleavedBuffer( array, stride ) {

	this.array = array;
	this.stride = stride;
	this.count = array !== undefined ? array.length / stride : 0;

	this.usage = StaticDrawUsage;
	this.updateRange = { offset: 0, count: - 1 };

	this.version = 0;

	this.uuid = MathUtils.generateUUID();

}

Object.defineProperty( InterleavedBuffer.prototype, 'needsUpdate', {

	set: function ( value ) {

		if ( value === true ) this.version ++;

	}

} );

Object.assign( InterleavedBuffer.prototype, {

	isInterleavedBuffer: true,

	onUploadCallback: function () {},

	setUsage: function ( value ) {

		this.usage = value;

		return this;

	},

	copy: function ( source ) {

		this.array = new source.array.constructor( source.array );
		this.count = source.count;
		this.stride = source.stride;
		this.usage = source.usage;

		return this;

	},

	copyAt: function ( index1, attribute, index2 ) {

		index1 *= this.stride;
		index2 *= attribute.stride;

		for ( let i = 0, l = this.stride; i < l; i ++ ) {

			this.array[ index1 + i ] = attribute.array[ index2 + i ];

		}

		return this;

	},

	set: function ( value, offset = 0 ) {

		this.array.set( value, offset );

		return this;

	},

	clone: function ( data ) {

		if ( data.arrayBuffers === undefined ) {

			data.arrayBuffers = {};

		}

		if ( this.array.buffer._uuid === undefined ) {

			this.array.buffer._uuid = MathUtils.generateUUID();

		}

		if ( data.arrayBuffers[ this.array.buffer._uuid ] === undefined ) {

			data.arrayBuffers[ this.array.buffer._uuid ] = this.array.slice( 0 ).buffer;

		}

		const array = new this.array.constructor( data.arrayBuffers[ this.array.buffer._uuid ] );

		const ib = new InterleavedBuffer( array, this.stride );
		ib.setUsage( this.usage );

		return ib;

	},

	onUpload: function ( callback ) {

		this.onUploadCallback = callback;

		return this;

	},

	toJSON: function ( data ) {

		if ( data.arrayBuffers === undefined ) {

			data.arrayBuffers = {};

		}

		// generate UUID for array buffer if necessary

		if ( this.array.buffer._uuid === undefined ) {

			this.array.buffer._uuid = MathUtils.generateUUID();

		}

		if ( data.arrayBuffers[ this.array.buffer._uuid ] === undefined ) {

			data.arrayBuffers[ this.array.buffer._uuid ] = Array.prototype.slice.call( new Uint32Array( this.array.buffer ) );

		}

		//

		return {
			uuid: this.uuid,
			buffer: this.array.buffer._uuid,
			type: this.array.constructor.name,
			stride: this.stride
		};

	}

} );

const _vector$6 = new Vector3();

function InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, normalized ) {

	this.name = '';

	this.data = interleavedBuffer;
	this.itemSize = itemSize;
	this.offset = offset;

	this.normalized = normalized === true;

}

Object.defineProperties( InterleavedBufferAttribute.prototype, {

	count: {

		get: function () {

			return this.data.count;

		}

	},

	array: {

		get: function () {

			return this.data.array;

		}

	},

	needsUpdate: {

		set: function ( value ) {

			this.data.needsUpdate = value;

		}

	}

} );

Object.assign( InterleavedBufferAttribute.prototype, {

	isInterleavedBufferAttribute: true,

	applyMatrix4: function ( m ) {

		for ( let i = 0, l = this.data.count; i < l; i ++ ) {

			_vector$6.x = this.getX( i );
			_vector$6.y = this.getY( i );
			_vector$6.z = this.getZ( i );

			_vector$6.applyMatrix4( m );

			this.setXYZ( i, _vector$6.x, _vector$6.y, _vector$6.z );

		}

		return this;

	},

	setX: function ( index, x ) {

		this.data.array[ index * this.data.stride + this.offset ] = x;

		return this;

	},

	setY: function ( index, y ) {

		this.data.array[ index * this.data.stride + this.offset + 1 ] = y;

		return this;

	},

	setZ: function ( index, z ) {

		this.data.array[ index * this.data.stride + this.offset + 2 ] = z;

		return this;

	},

	setW: function ( index, w ) {

		this.data.array[ index * this.data.stride + this.offset + 3 ] = w;

		return this;

	},

	getX: function ( index ) {

		return this.data.array[ index * this.data.stride + this.offset ];

	},

	getY: function ( index ) {

		return this.data.array[ index * this.data.stride + this.offset + 1 ];

	},

	getZ: function ( index ) {

		return this.data.array[ index * this.data.stride + this.offset + 2 ];

	},

	getW: function ( index ) {

		return this.data.array[ index * this.data.stride + this.offset + 3 ];

	},

	setXY: function ( index, x, y ) {

		index = index * this.data.stride + this.offset;

		this.data.array[ index + 0 ] = x;
		this.data.array[ index + 1 ] = y;

		return this;

	},

	setXYZ: function ( index, x, y, z ) {

		index = index * this.data.stride + this.offset;

		this.data.array[ index + 0 ] = x;
		this.data.array[ index + 1 ] = y;
		this.data.array[ index + 2 ] = z;

		return this;

	},

	setXYZW: function ( index, x, y, z, w ) {

		index = index * this.data.stride + this.offset;

		this.data.array[ index + 0 ] = x;
		this.data.array[ index + 1 ] = y;
		this.data.array[ index + 2 ] = z;
		this.data.array[ index + 3 ] = w;

		return this;

	},

	clone: function ( data ) {

		if ( data === undefined ) {

			console.log( 'THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.' );

			const array = [];

			for ( let i = 0; i < this.count; i ++ ) {

				const index = i * this.data.stride + this.offset;

				for ( let j = 0; j < this.itemSize; j ++ ) {

					array.push( this.data.array[ index + j ] );

				}

			}

			return new BufferAttribute( new this.array.constructor( array ), this.itemSize, this.normalized );

		} else {

			if ( data.interleavedBuffers === undefined ) {

				data.interleavedBuffers = {};

			}

			if ( data.interleavedBuffers[ this.data.uuid ] === undefined ) {

				data.interleavedBuffers[ this.data.uuid ] = this.data.clone( data );

			}

			return new InterleavedBufferAttribute( data.interleavedBuffers[ this.data.uuid ], this.itemSize, this.offset, this.normalized );

		}

	},

	toJSON: function ( data ) {

		if ( data === undefined ) {

			console.log( 'THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.' );

			const array = [];

			for ( let i = 0; i < this.count; i ++ ) {

				const index = i * this.data.stride + this.offset;

				for ( let j = 0; j < this.itemSize; j ++ ) {

					array.push( this.data.array[ index + j ] );

				}

			}

			// deinterleave data and save it as an ordinary buffer attribute for now

			return {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: array,
				normalized: this.normalized
			};

		} else {

			// save as true interlaved attribtue

			if ( data.interleavedBuffers === undefined ) {

				data.interleavedBuffers = {};

			}

			if ( data.interleavedBuffers[ this.data.uuid ] === undefined ) {

				data.interleavedBuffers[ this.data.uuid ] = this.data.toJSON( data );

			}

			return {
				isInterleavedBufferAttribute: true,
				itemSize: this.itemSize,
				data: this.data.uuid,
				offset: this.offset,
				normalized: this.normalized
			};

		}

	}

} );

const _v1$4 = /*@__PURE__*/ new Vector3();
const _v2$2 = /*@__PURE__*/ new Vector3();

class LOD extends Object3D {

	constructor() {

		super();

		this._currentLevel = 0;

		this.type = 'LOD';

		Object.defineProperties( this, {
			levels: {
				enumerable: true,
				value: []
			},
			isLOD: {
				value: true,
			}
		} );

		this.autoUpdate = true;

	}

	copy( source ) {

		super.copy( source, false );

		const levels = source.levels;

		for ( let i = 0, l = levels.length; i < l; i ++ ) {

			const level = levels[ i ];

			this.addLevel( level.object.clone(), level.distance );

		}

		this.autoUpdate = source.autoUpdate;

		return this;

	}

	addLevel( object, distance = 0 ) {

		distance = Math.abs( distance );

		const levels = this.levels;

		let l;

		for ( l = 0; l < levels.length; l ++ ) {

			if ( distance < levels[ l ].distance ) {

				break;

			}

		}

		levels.splice( l, 0, { distance: distance, object: object } );

		this.add( object );

		return this;

	}

	getCurrentLevel() {

		return this._currentLevel;

	}

	getObjectForDistance( distance ) {

		const levels = this.levels;

		if ( levels.length > 0 ) {

			let i, l;

			for ( i = 1, l = levels.length; i < l; i ++ ) {

				if ( distance < levels[ i ].distance ) {

					break;

				}

			}

			return levels[ i - 1 ].object;

		}

		return null;

	}

	raycast( raycaster, intersects ) {

		const levels = this.levels;

		if ( levels.length > 0 ) {

			_v1$4.setFromMatrixPosition( this.matrixWorld );

			const distance = raycaster.ray.origin.distanceTo( _v1$4 );

			this.getObjectForDistance( distance ).raycast( raycaster, intersects );

		}

	}

	update( camera ) {

		const levels = this.levels;

		if ( levels.length > 1 ) {

			_v1$4.setFromMatrixPosition( camera.matrixWorld );
			_v2$2.setFromMatrixPosition( this.matrixWorld );

			const distance = _v1$4.distanceTo( _v2$2 ) / camera.zoom;

			levels[ 0 ].object.visible = true;

			let i, l;

			for ( i = 1, l = levels.length; i < l; i ++ ) {

				if ( distance >= levels[ i ].distance ) {

					levels[ i - 1 ].object.visible = false;
					levels[ i ].object.visible = true;

				} else {

					break;

				}

			}

			this._currentLevel = i - 1;

			for ( ; i < l; i ++ ) {

				levels[ i ].object.visible = false;

			}

		}

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		if ( this.autoUpdate === false ) data.object.autoUpdate = false;

		data.object.levels = [];

		const levels = this.levels;

		for ( let i = 0, l = levels.length; i < l; i ++ ) {

			const level = levels[ i ];

			data.object.levels.push( {
				object: level.object.uuid,
				distance: level.distance
			} );

		}

		return data;

	}

}

const _basePosition = new Vector3();

const _skinIndex = new Vector4();
const _skinWeight = new Vector4();

const _vector$7 = new Vector3();
const _matrix$1 = new Matrix4();

function SkinnedMesh( geometry, material ) {

	Mesh.call( this, geometry, material );

	this.type = 'SkinnedMesh';

	this.bindMode = 'attached';
	this.bindMatrix = new Matrix4();
	this.bindMatrixInverse = new Matrix4();

}

SkinnedMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {

	constructor: SkinnedMesh,

	isSkinnedMesh: true,

	copy: function ( source ) {

		Mesh.prototype.copy.call( this, source );

		this.bindMode = source.bindMode;
		this.bindMatrix.copy( source.bindMatrix );
		this.bindMatrixInverse.copy( source.bindMatrixInverse );

		this.skeleton = source.skeleton;

		return this;

	},

	bind: function ( skeleton, bindMatrix ) {

		this.skeleton = skeleton;

		if ( bindMatrix === undefined ) {

			this.updateMatrixWorld( true );

			this.skeleton.calculateInverses();

			bindMatrix = this.matrixWorld;

		}

		this.bindMatrix.copy( bindMatrix );
		this.bindMatrixInverse.copy( bindMatrix ).invert();

	},

	pose: function () {

		this.skeleton.pose();

	},

	normalizeSkinWeights: function () {

		const vector = new Vector4();

		const skinWeight = this.geometry.attributes.skinWeight;

		for ( let i = 0, l = skinWeight.count; i < l; i ++ ) {

			vector.x = skinWeight.getX( i );
			vector.y = skinWeight.getY( i );
			vector.z = skinWeight.getZ( i );
			vector.w = skinWeight.getW( i );

			const scale = 1.0 / vector.manhattanLength();

			if ( scale !== Infinity ) {

				vector.multiplyScalar( scale );

			} else {

				vector.set( 1, 0, 0, 0 ); // do something reasonable

			}

			skinWeight.setXYZW( i, vector.x, vector.y, vector.z, vector.w );

		}

	},

	updateMatrixWorld: function ( force ) {

		Mesh.prototype.updateMatrixWorld.call( this, force );

		if ( this.bindMode === 'attached' ) {

			this.bindMatrixInverse.copy( this.matrixWorld ).invert();

		} else if ( this.bindMode === 'detached' ) {

			this.bindMatrixInverse.copy( this.bindMatrix ).invert();

		} else {

			console.warn( 'THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode );

		}

	},

	boneTransform: function ( index, target ) {

		const skeleton = this.skeleton;
		const geometry = this.geometry;

		_skinIndex.fromBufferAttribute( geometry.attributes.skinIndex, index );
		_skinWeight.fromBufferAttribute( geometry.attributes.skinWeight, index );

		_basePosition.fromBufferAttribute( geometry.attributes.position, index ).applyMatrix4( this.bindMatrix );

		target.set( 0, 0, 0 );

		for ( let i = 0; i < 4; i ++ ) {

			const weight = _skinWeight.getComponent( i );

			if ( weight !== 0 ) {

				const boneIndex = _skinIndex.getComponent( i );

				_matrix$1.multiplyMatrices( skeleton.bones[ boneIndex ].matrixWorld, skeleton.boneInverses[ boneIndex ] );

				target.addScaledVector( _vector$7.copy( _basePosition ).applyMatrix4( _matrix$1 ), weight );

			}

		}

		return target.applyMatrix4( this.bindMatrixInverse );

	}

} );

function Bone() {

	Object3D.call( this );

	this.type = 'Bone';

}

Bone.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Bone,

	isBone: true

} );

const _offsetMatrix = /*@__PURE__*/ new Matrix4();
const _identityMatrix = /*@__PURE__*/ new Matrix4();

class Skeleton {

	constructor( bones = [], boneInverses = [] ) {

		this.uuid = MathUtils.generateUUID();

		this.bones = bones.slice( 0 );
		this.boneInverses = boneInverses;
		this.boneMatrices = null;

		this.boneTexture = null;
		this.boneTextureSize = 0;

		this.frame = - 1;

		this.init();

	}

	init() {

		const bones = this.bones;
		const boneInverses = this.boneInverses;

		this.boneMatrices = new Float32Array( bones.length * 16 );

		// calculate inverse bone matrices if necessary

		if ( boneInverses.length === 0 ) {

			this.calculateInverses();

		} else {

			// handle special case

			if ( bones.length !== boneInverses.length ) {

				console.warn( 'THREE.Skeleton: Number of inverse bone matrices does not match amount of bones.' );

				this.boneInverses = [];

				for ( let i = 0, il = this.bones.length; i < il; i ++ ) {

					this.boneInverses.push( new Matrix4() );

				}

			}

		}

	}

	calculateInverses() {

		this.boneInverses.length = 0;

		for ( let i = 0, il = this.bones.length; i < il; i ++ ) {

			const inverse = new Matrix4();

			if ( this.bones[ i ] ) {

				inverse.copy( this.bones[ i ].matrixWorld ).invert();

			}

			this.boneInverses.push( inverse );

		}

	}

	pose() {

		// recover the bind-time world matrices

		for ( let i = 0, il = this.bones.length; i < il; i ++ ) {

			const bone = this.bones[ i ];

			if ( bone ) {

				bone.matrixWorld.copy( this.boneInverses[ i ] ).invert();

			}

		}

		// compute the local matrices, positions, rotations and scales

		for ( let i = 0, il = this.bones.length; i < il; i ++ ) {

			const bone = this.bones[ i ];

			if ( bone ) {

				if ( bone.parent && bone.parent.isBone ) {

					bone.matrix.copy( bone.parent.matrixWorld ).invert();
					bone.matrix.multiply( bone.matrixWorld );

				} else {

					bone.matrix.copy( bone.matrixWorld );

				}

				bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

			}

		}

	}

	update() {

		const bones = this.bones;
		const boneInverses = this.boneInverses;
		const boneMatrices = this.boneMatrices;
		const boneTexture = this.boneTexture;

		// flatten bone matrices to array

		for ( let i = 0, il = bones.length; i < il; i ++ ) {

			// compute the offset between the current and the original transform

			const matrix = bones[ i ] ? bones[ i ].matrixWorld : _identityMatrix;

			_offsetMatrix.multiplyMatrices( matrix, boneInverses[ i ] );
			_offsetMatrix.toArray( boneMatrices, i * 16 );

		}

		if ( boneTexture !== null ) {

			boneTexture.needsUpdate = true;

		}

	}

	clone() {

		return new Skeleton( this.bones, this.boneInverses );

	}

	getBoneByName( name ) {

		for ( let i = 0, il = this.bones.length; i < il; i ++ ) {

			const bone = this.bones[ i ];

			if ( bone.name === name ) {

				return bone;

			}

		}

		return undefined;

	}

	dispose( ) {

		if ( this.boneTexture !== null ) {

			this.boneTexture.dispose();

			this.boneTexture = null;

		}

	}

	fromJSON( json, bones ) {

		this.uuid = json.uuid;

		for ( let i = 0, l = json.bones.length; i < l; i ++ ) {

			const uuid = json.bones[ i ];
			let bone = bones[ uuid ];

			if ( bone === undefined ) {

				console.warn( 'THREE.Skeleton: No bone found with UUID:', uuid );
				bone = new Bone();

			}

			this.bones.push( bone );
			this.boneInverses.push( new Matrix4().fromArray( json.boneInverses[ i ] ) );

		}

		this.init();

		return this;

	}

	toJSON() {

		const data = {
			metadata: {
				version: 4.5,
				type: 'Skeleton',
				generator: 'Skeleton.toJSON'
			},
			bones: [],
			boneInverses: []
		};

		data.uuid = this.uuid;

		const bones = this.bones;
		const boneInverses = this.boneInverses;

		for ( let i = 0, l = bones.length; i < l; i ++ ) {

			const bone = bones[ i ];
			data.bones.push( bone.uuid );

			const boneInverse = boneInverses[ i ];
			data.boneInverses.push( boneInverse.toArray() );

		}

		return data;

	}

}

const _instanceLocalMatrix = new Matrix4();
const _instanceWorldMatrix = new Matrix4();

const _instanceIntersects = [];

const _mesh = new Mesh();

function InstancedMesh( geometry, material, count ) {

	Mesh.call( this, geometry, material );

	this.instanceMatrix = new BufferAttribute( new Float32Array( count * 16 ), 16 );
	this.instanceColor = null;

	this.count = count;

	this.frustumCulled = false;

}

InstancedMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {

	constructor: InstancedMesh,

	isInstancedMesh: true,

	copy: function ( source ) {

		Mesh.prototype.copy.call( this, source );

		this.instanceMatrix.copy( source.instanceMatrix );

		if ( source.instanceColor !== null ) this.instanceColor = source.instanceColor.clone();

		this.count = source.count;

		return this;

	},

	getColorAt: function ( index, color ) {

		color.fromArray( this.instanceColor.array, index * 3 );

	},

	getMatrixAt: function ( index, matrix ) {

		matrix.fromArray( this.instanceMatrix.array, index * 16 );

	},

	raycast: function ( raycaster, intersects ) {

		const matrixWorld = this.matrixWorld;
		const raycastTimes = this.count;

		_mesh.geometry = this.geometry;
		_mesh.material = this.material;

		if ( _mesh.material === undefined ) return;

		for ( let instanceId = 0; instanceId < raycastTimes; instanceId ++ ) {

			// calculate the world matrix for each instance

			this.getMatrixAt( instanceId, _instanceLocalMatrix );

			_instanceWorldMatrix.multiplyMatrices( matrixWorld, _instanceLocalMatrix );

			// the mesh represents this single instance

			_mesh.matrixWorld = _instanceWorldMatrix;

			_mesh.raycast( raycaster, _instanceIntersects );

			// process the result of raycast

			for ( let i = 0, l = _instanceIntersects.length; i < l; i ++ ) {

				const intersect = _instanceIntersects[ i ];
				intersect.instanceId = instanceId;
				intersect.object = this;
				intersects.push( intersect );

			}

			_instanceIntersects.length = 0;

		}

	},

	setColorAt: function ( index, color ) {

		if ( this.instanceColor === null ) {

			this.instanceColor = new BufferAttribute( new Float32Array( this.count * 3 ), 3 );

		}

		color.toArray( this.instanceColor.array, index * 3 );

	},

	setMatrixAt: function ( index, matrix ) {

		matrix.toArray( this.instanceMatrix.array, index * 16 );

	},

	updateMorphTargets: function () {

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

} );

/**
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round"
 * }
 */

class LineBasicMaterial extends Material {

	constructor( parameters ) {

		super();

		this.type = 'LineBasicMaterial';

		this.color = new Color( 0xffffff );

		this.linewidth = 1;
		this.linecap = 'round';
		this.linejoin = 'round';

		this.morphTargets = false;

		this.setValues( parameters );

	}


	copy( source ) {

		super.copy( source );

		this.color.copy( source.color );

		this.linewidth = source.linewidth;
		this.linecap = source.linecap;
		this.linejoin = source.linejoin;

		this.morphTargets = source.morphTargets;

		return this;

	}

}

LineBasicMaterial.prototype.isLineBasicMaterial = true;

const _start = new Vector3();
const _end = new Vector3();
const _inverseMatrix$1 = new Matrix4();
const _ray$1 = new Ray();
const _sphere$2 = new Sphere();

function Line( geometry = new BufferGeometry(), material = new LineBasicMaterial() ) {

	Object3D.call( this );

	this.type = 'Line';

	this.geometry = geometry;
	this.material = material;

	this.updateMorphTargets();

}

Line.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Line,

	isLine: true,

	copy: function ( source ) {

		Object3D.prototype.copy.call( this, source );

		this.material = source.material;
		this.geometry = source.geometry;

		return this;

	},

	computeLineDistances: function () {

		const geometry = this.geometry;

		if ( geometry.isBufferGeometry ) {

			// we assume non-indexed geometry

			if ( geometry.index === null ) {

				const positionAttribute = geometry.attributes.position;
				const lineDistances = [ 0 ];

				for ( let i = 1, l = positionAttribute.count; i < l; i ++ ) {

					_start.fromBufferAttribute( positionAttribute, i - 1 );
					_end.fromBufferAttribute( positionAttribute, i );

					lineDistances[ i ] = lineDistances[ i - 1 ];
					lineDistances[ i ] += _start.distanceTo( _end );

				}

				geometry.setAttribute( 'lineDistance', new Float32BufferAttribute( lineDistances, 1 ) );

			} else {

				console.warn( 'THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.' );

			}

		} else if ( geometry.isGeometry ) {

			console.error( 'THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

		}

		return this;

	},

	raycast: function ( raycaster, intersects ) {

		const geometry = this.geometry;
		const matrixWorld = this.matrixWorld;
		const threshold = raycaster.params.Line.threshold;

		// Checking boundingSphere distance to ray

		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		_sphere$2.copy( geometry.boundingSphere );
		_sphere$2.applyMatrix4( matrixWorld );
		_sphere$2.radius += threshold;

		if ( raycaster.ray.intersectsSphere( _sphere$2 ) === false ) return;

		//

		_inverseMatrix$1.copy( matrixWorld ).invert();
		_ray$1.copy( raycaster.ray ).applyMatrix4( _inverseMatrix$1 );

		const localThreshold = threshold / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
		const localThresholdSq = localThreshold * localThreshold;

		const vStart = new Vector3();
		const vEnd = new Vector3();
		const interSegment = new Vector3();
		const interRay = new Vector3();
		const step = this.isLineSegments ? 2 : 1;

		if ( geometry.isBufferGeometry ) {

			const index = geometry.index;
			const attributes = geometry.attributes;
			const positionAttribute = attributes.position;

			if ( index !== null ) {

				const indices = index.array;

				for ( let i = 0, l = indices.length - 1; i < l; i += step ) {

					const a = indices[ i ];
					const b = indices[ i + 1 ];

					vStart.fromBufferAttribute( positionAttribute, a );
					vEnd.fromBufferAttribute( positionAttribute, b );

					const distSq = _ray$1.distanceSqToSegment( vStart, vEnd, interRay, interSegment );

					if ( distSq > localThresholdSq ) continue;

					interRay.applyMatrix4( this.matrixWorld ); //Move back to world space for distance calculation

					const distance = raycaster.ray.origin.distanceTo( interRay );

					if ( distance < raycaster.near || distance > raycaster.far ) continue;

					intersects.push( {

						distance: distance,
						// What do we want? intersection point on the ray or on the segment??
						// point: raycaster.ray.at( distance ),
						point: interSegment.clone().applyMatrix4( this.matrixWorld ),
						index: i,
						face: null,
						faceIndex: null,
						object: this

					} );

				}

			} else {

				for ( let i = 0, l = positionAttribute.count - 1; i < l; i += step ) {

					vStart.fromBufferAttribute( positionAttribute, i );
					vEnd.fromBufferAttribute( positionAttribute, i + 1 );

					const distSq = _ray$1.distanceSqToSegment( vStart, vEnd, interRay, interSegment );

					if ( distSq > localThresholdSq ) continue;

					interRay.applyMatrix4( this.matrixWorld ); //Move back to world space for distance calculation

					const distance = raycaster.ray.origin.distanceTo( interRay );

					if ( distance < raycaster.near || distance > raycaster.far ) continue;

					intersects.push( {

						distance: distance,
						// What do we want? intersection point on the ray or on the segment??
						// point: raycaster.ray.at( distance ),
						point: interSegment.clone().applyMatrix4( this.matrixWorld ),
						index: i,
						face: null,
						faceIndex: null,
						object: this

					} );

				}

			}

		} else if ( geometry.isGeometry ) {

			console.error( 'THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

		}

	},

	updateMorphTargets: function () {

		const geometry = this.geometry;

		if ( geometry.isBufferGeometry ) {

			const morphAttributes = geometry.morphAttributes;
			const keys = Object.keys( morphAttributes );

			if ( keys.length > 0 ) {

				const morphAttribute = morphAttributes[ keys[ 0 ] ];

				if ( morphAttribute !== undefined ) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for ( let m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

						const name = morphAttribute[ m ].name || String( m );

						this.morphTargetInfluences.push( 0 );
						this.morphTargetDictionary[ name ] = m;

					}

				}

			}

		} else {

			const morphTargets = geometry.morphTargets;

			if ( morphTargets !== undefined && morphTargets.length > 0 ) {

				console.error( 'THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.' );

			}

		}

	}

} );

const _start$1 = new Vector3();
const _end$1 = new Vector3();

function LineSegments( geometry, material ) {

	Line.call( this, geometry, material );

	this.type = 'LineSegments';

}

LineSegments.prototype = Object.assign( Object.create( Line.prototype ), {

	constructor: LineSegments,

	isLineSegments: true,

	computeLineDistances: function () {

		const geometry = this.geometry;

		if ( geometry.isBufferGeometry ) {

			// we assume non-indexed geometry

			if ( geometry.index === null ) {

				const positionAttribute = geometry.attributes.position;
				const lineDistances = [];

				for ( let i = 0, l = positionAttribute.count; i < l; i += 2 ) {

					_start$1.fromBufferAttribute( positionAttribute, i );
					_end$1.fromBufferAttribute( positionAttribute, i + 1 );

					lineDistances[ i ] = ( i === 0 ) ? 0 : lineDistances[ i - 1 ];
					lineDistances[ i + 1 ] = lineDistances[ i ] + _start$1.distanceTo( _end$1 );

				}

				geometry.setAttribute( 'lineDistance', new Float32BufferAttribute( lineDistances, 1 ) );

			} else {

				console.warn( 'THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.' );

			}

		} else if ( geometry.isGeometry ) {

			console.error( 'THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

		}

		return this;

	}

} );

/**
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  size: <float>,
 *  sizeAttenuation: <bool>
 *
 *  morphTargets: <bool>
 * }
 */

class PointsMaterial extends Material {

	constructor( parameters ) {

		super();

		this.type = 'PointsMaterial';

		this.color = new Color( 0xffffff );

		this.map = null;

		this.alphaMap = null;

		this.size = 1;
		this.sizeAttenuation = true;

		this.morphTargets = false;

		this.setValues( parameters );

	}

	copy( source ) {

		super.copy( source );

		this.color.copy( source.color );

		this.map = source.map;

		this.alphaMap = source.alphaMap;

		this.size = source.size;
		this.sizeAttenuation = source.sizeAttenuation;

		this.morphTargets = source.morphTargets;

		return this;

	}

}

PointsMaterial.prototype.isPointsMaterial = true;

const _inverseMatrix$2 = new Matrix4();
const _ray$2 = new Ray();
const _sphere$3 = new Sphere();
const _position$1 = new Vector3();

function Points( geometry = new BufferGeometry(), material = new PointsMaterial() ) {

	Object3D.call( this );

	this.type = 'Points';

	this.geometry = geometry;
	this.material = material;

	this.updateMorphTargets();

}

Points.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Points,

	isPoints: true,

	copy: function ( source ) {

		Object3D.prototype.copy.call( this, source );

		this.material = source.material;
		this.geometry = source.geometry;

		return this;

	},

	raycast: function ( raycaster, intersects ) {

		const geometry = this.geometry;
		const matrixWorld = this.matrixWorld;
		const threshold = raycaster.params.Points.threshold;

		// Checking boundingSphere distance to ray

		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		_sphere$3.copy( geometry.boundingSphere );
		_sphere$3.applyMatrix4( matrixWorld );
		_sphere$3.radius += threshold;

		if ( raycaster.ray.intersectsSphere( _sphere$3 ) === false ) return;

		//

		_inverseMatrix$2.copy( matrixWorld ).invert();
		_ray$2.copy( raycaster.ray ).applyMatrix4( _inverseMatrix$2 );

		const localThreshold = threshold / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
		const localThresholdSq = localThreshold * localThreshold;

		if ( geometry.isBufferGeometry ) {

			const index = geometry.index;
			const attributes = geometry.attributes;
			const positionAttribute = attributes.position;

			if ( index !== null ) {

				const indices = index.array;

				for ( let i = 0, il = indices.length; i < il; i ++ ) {

					const a = indices[ i ];

					_position$1.fromBufferAttribute( positionAttribute, a );

					testPoint( _position$1, a, localThresholdSq, matrixWorld, raycaster, intersects, this );

				}

			} else {

				for ( let i = 0, l = positionAttribute.count; i < l; i ++ ) {

					_position$1.fromBufferAttribute( positionAttribute, i );

					testPoint( _position$1, i, localThresholdSq, matrixWorld, raycaster, intersects, this );

				}

			}

		} else {

			console.error( 'THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

		}

	},

	updateMorphTargets: function () {

		const geometry = this.geometry;

		if ( geometry.isBufferGeometry ) {

			const morphAttributes = geometry.morphAttributes;
			const keys = Object.keys( morphAttributes );

			if ( keys.length > 0 ) {

				const morphAttribute = morphAttributes[ keys[ 0 ] ];

				if ( morphAttribute !== undefined ) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for ( let m = 0, ml = morphAttribute.length; m < ml; m ++ ) {

						const name = morphAttribute[ m ].name || String( m );

						this.morphTargetInfluences.push( 0 );
						this.morphTargetDictionary[ name ] = m;

					}

				}

			}

		} else {

			const morphTargets = geometry.morphTargets;

			if ( morphTargets !== undefined && morphTargets.length > 0 ) {

				console.error( 'THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.' );

			}

		}

	}

} );

function testPoint( point, index, localThresholdSq, matrixWorld, raycaster, intersects, object ) {

	const rayPointDistanceSq = _ray$2.distanceSqToPoint( point );

	if ( rayPointDistanceSq < localThresholdSq ) {

		const intersectPoint = new Vector3();

		_ray$2.closestPointToPoint( point, intersectPoint );
		intersectPoint.applyMatrix4( matrixWorld );

		const distance = raycaster.ray.origin.distanceTo( intersectPoint );

		if ( distance < raycaster.near || distance > raycaster.far ) return;

		intersects.push( {

			distance: distance,
			distanceToRay: Math.sqrt( rayPointDistanceSq ),
			point: intersectPoint,
			index: index,
			face: null,
			object: object

		} );

	}

}

class CompressedTexture extends Texture {

	constructor( mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

		super( null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

		this.image = { width: width, height: height };
		this.mipmaps = mipmaps;

		// no flipping for cube textures
		// (also flipping doesn't work for compressed textures )

		this.flipY = false;

		// can't generate mipmaps for compressed textures
		// mips must be embedded in DDS files

		this.generateMipmaps = false;

	}

}

CompressedTexture.prototype.isCompressedTexture = true;

/**
 * Parametric Surfaces Geometry
 * based on the brilliant article by @prideout https://prideout.net/blog/old/blog/index.html@p=44.html
 */

function ParametricGeometry( func, slices, stacks ) {

	BufferGeometry.call( this );

	this.type = 'ParametricGeometry';

	this.parameters = {
		func: func,
		slices: slices,
		stacks: stacks
	};

	// buffers

	const indices = [];
	const vertices = [];
	const normals = [];
	const uvs = [];

	const EPS = 0.00001;

	const normal = new Vector3();

	const p0 = new Vector3(), p1 = new Vector3();
	const pu = new Vector3(), pv = new Vector3();

	if ( func.length < 3 ) {

		console.error( 'THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.' );

	}

	// generate vertices, normals and uvs

	const sliceCount = slices + 1;

	for ( let i = 0; i <= stacks; i ++ ) {

		const v = i / stacks;

		for ( let j = 0; j <= slices; j ++ ) {

			const u = j / slices;

			// vertex

			func( u, v, p0 );
			vertices.push( p0.x, p0.y, p0.z );

			// normal

			// approximate tangent vectors via finite differences

			if ( u - EPS >= 0 ) {

				func( u - EPS, v, p1 );
				pu.subVectors( p0, p1 );

			} else {

				func( u + EPS, v, p1 );
				pu.subVectors( p1, p0 );

			}

			if ( v - EPS >= 0 ) {

				func( u, v - EPS, p1 );
				pv.subVectors( p0, p1 );

			} else {

				func( u, v + EPS, p1 );
				pv.subVectors( p1, p0 );

			}

			// cross product of tangent vectors returns surface normal

			normal.crossVectors( pu, pv ).normalize();
			normals.push( normal.x, normal.y, normal.z );

			// uv

			uvs.push( u, v );

		}

	}

	// generate indices

	for ( let i = 0; i < stacks; i ++ ) {

		for ( let j = 0; j < slices; j ++ ) {

			const a = i * sliceCount + j;
			const b = i * sliceCount + j + 1;
			const c = ( i + 1 ) * sliceCount + j + 1;
			const d = ( i + 1 ) * sliceCount + j;

			// faces one and two

			indices.push( a, b, d );
			indices.push( b, c, d );

		}

	}

	// build geometry

	this.setIndex( indices );
	this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
	this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

}

ParametricGeometry.prototype = Object.create( BufferGeometry.prototype );
ParametricGeometry.prototype.constructor = ParametricGeometry;

class SphereGeometry extends BufferGeometry {

	constructor( radius = 1, widthSegments = 8, heightSegments = 6, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI ) {

		super();
		this.type = 'SphereGeometry';

		this.parameters = {
			radius: radius,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			phiStart: phiStart,
			phiLength: phiLength,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		};

		widthSegments = Math.max( 3, Math.floor( widthSegments ) );
		heightSegments = Math.max( 2, Math.floor( heightSegments ) );

		const thetaEnd = Math.min( thetaStart + thetaLength, Math.PI );

		let index = 0;
		const grid = [];

		const vertex = new Vector3();
		const normal = new Vector3();

		// buffers

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		// generate vertices, normals and uvs

		for ( let iy = 0; iy <= heightSegments; iy ++ ) {

			const verticesRow = [];

			const v = iy / heightSegments;

			// special case for the poles

			let uOffset = 0;

			if ( iy == 0 && thetaStart == 0 ) {

				uOffset = 0.5 / widthSegments;

			} else if ( iy == heightSegments && thetaEnd == Math.PI ) {

				uOffset = - 0.5 / widthSegments;

			}

			for ( let ix = 0; ix <= widthSegments; ix ++ ) {

				const u = ix / widthSegments;

				// vertex

				vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
				vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
				vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal

				normal.copy( vertex ).normalize();
				normals.push( normal.x, normal.y, normal.z );

				// uv

				uvs.push( u + uOffset, 1 - v );

				verticesRow.push( index ++ );

			}

			grid.push( verticesRow );

		}

		// indices

		for ( let iy = 0; iy < heightSegments; iy ++ ) {

			for ( let ix = 0; ix < widthSegments; ix ++ ) {

				const a = grid[ iy ][ ix + 1 ];
				const b = grid[ iy ][ ix ];
				const c = grid[ iy + 1 ][ ix ];
				const d = grid[ iy + 1 ][ ix + 1 ];

				if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d );
				if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	}

}

/**
 * parameters = {
 *  color: <hex>,
 *  roughness: <float>,
 *  metalness: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalMapType: THREE.TangentSpaceNormalMap,
 *  normalScale: <Vector2>,
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  roughnessMap: new THREE.Texture( <Image> ),
 *
 *  metalnessMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  envMapIntensity: <float>
 *
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *  flatShading: <bool>
 * }
 */

function MeshStandardMaterial( parameters ) {

	Material.call( this );

	this.defines = { 'STANDARD': '' };

	this.type = 'MeshStandardMaterial';

	this.color = new Color( 0xffffff ); // diffuse
	this.roughness = 1.0;
	this.metalness = 0.0;

	this.map = null;

	this.lightMap = null;
	this.lightMapIntensity = 1.0;

	this.aoMap = null;
	this.aoMapIntensity = 1.0;

	this.emissive = new Color( 0x000000 );
	this.emissiveIntensity = 1.0;
	this.emissiveMap = null;

	this.bumpMap = null;
	this.bumpScale = 1;

	this.normalMap = null;
	this.normalMapType = TangentSpaceNormalMap;
	this.normalScale = new Vector2( 1, 1 );

	this.displacementMap = null;
	this.displacementScale = 1;
	this.displacementBias = 0;

	this.roughnessMap = null;

	this.metalnessMap = null;

	this.alphaMap = null;

	this.envMap = null;
	this.envMapIntensity = 1.0;

	this.refractionRatio = 0.98;

	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = 'round';
	this.wireframeLinejoin = 'round';

	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;

	this.flatShading = false;

	this.vertexTangents = false;

	this.setValues( parameters );

}

MeshStandardMaterial.prototype = Object.create( Material.prototype );
MeshStandardMaterial.prototype.constructor = MeshStandardMaterial;

MeshStandardMaterial.prototype.isMeshStandardMaterial = true;

MeshStandardMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.defines = { 'STANDARD': '' };

	this.color.copy( source.color );
	this.roughness = source.roughness;
	this.metalness = source.metalness;

	this.map = source.map;

	this.lightMap = source.lightMap;
	this.lightMapIntensity = source.lightMapIntensity;

	this.aoMap = source.aoMap;
	this.aoMapIntensity = source.aoMapIntensity;

	this.emissive.copy( source.emissive );
	this.emissiveMap = source.emissiveMap;
	this.emissiveIntensity = source.emissiveIntensity;

	this.bumpMap = source.bumpMap;
	this.bumpScale = source.bumpScale;

	this.normalMap = source.normalMap;
	this.normalMapType = source.normalMapType;
	this.normalScale.copy( source.normalScale );

	this.displacementMap = source.displacementMap;
	this.displacementScale = source.displacementScale;
	this.displacementBias = source.displacementBias;

	this.roughnessMap = source.roughnessMap;

	this.metalnessMap = source.metalnessMap;

	this.alphaMap = source.alphaMap;

	this.envMap = source.envMap;
	this.envMapIntensity = source.envMapIntensity;

	this.refractionRatio = source.refractionRatio;

	this.wireframe = source.wireframe;
	this.wireframeLinewidth = source.wireframeLinewidth;
	this.wireframeLinecap = source.wireframeLinecap;
	this.wireframeLinejoin = source.wireframeLinejoin;

	this.skinning = source.skinning;
	this.morphTargets = source.morphTargets;
	this.morphNormals = source.morphNormals;

	this.flatShading = source.flatShading;

	this.vertexTangents = source.vertexTangents;

	return this;

};

/**
 * parameters = {
 *  clearcoat: <float>,
 *  clearcoatMap: new THREE.Texture( <Image> ),
 *  clearcoatRoughness: <float>,
 *  clearcoatRoughnessMap: new THREE.Texture( <Image> ),
 *  clearcoatNormalScale: <Vector2>,
 *  clearcoatNormalMap: new THREE.Texture( <Image> ),
 *
 *  reflectivity: <float>,
 *  ior: <float>,
 *
 *  sheen: <Color>,
 *
 *  transmission: <float>,
 *  transmissionMap: new THREE.Texture( <Image> )
 * }
 */

function MeshPhysicalMaterial( parameters ) {

	MeshStandardMaterial.call( this );

	this.defines = {

		'STANDARD': '',
		'PHYSICAL': ''

	};

	this.type = 'MeshPhysicalMaterial';

	this.clearcoat = 0.0;
	this.clearcoatMap = null;
	this.clearcoatRoughness = 0.0;
	this.clearcoatRoughnessMap = null;
	this.clearcoatNormalScale = new Vector2( 1, 1 );
	this.clearcoatNormalMap = null;

	this.reflectivity = 0.5; // maps to F0 = 0.04

	Object.defineProperty( this, 'ior', {
		get: function () {

			return ( 1 + 0.4 * this.reflectivity ) / ( 1 - 0.4 * this.reflectivity );

		},
		set: function ( ior ) {

			this.reflectivity = MathUtils.clamp( 2.5 * ( ior - 1 ) / ( ior + 1 ), 0, 1 );

		}
	} );

	this.sheen = null; // null will disable sheen bsdf

	this.transmission = 0.0;
	this.transmissionMap = null;

	this.setValues( parameters );

}

MeshPhysicalMaterial.prototype = Object.create( MeshStandardMaterial.prototype );
MeshPhysicalMaterial.prototype.constructor = MeshPhysicalMaterial;

MeshPhysicalMaterial.prototype.isMeshPhysicalMaterial = true;

MeshPhysicalMaterial.prototype.copy = function ( source ) {

	MeshStandardMaterial.prototype.copy.call( this, source );

	this.defines = {

		'STANDARD': '',
		'PHYSICAL': ''

	};

	this.clearcoat = source.clearcoat;
	this.clearcoatMap = source.clearcoatMap;
	this.clearcoatRoughness = source.clearcoatRoughness;
	this.clearcoatRoughnessMap = source.clearcoatRoughnessMap;
	this.clearcoatNormalMap = source.clearcoatNormalMap;
	this.clearcoatNormalScale.copy( source.clearcoatNormalScale );

	this.reflectivity = source.reflectivity;

	if ( source.sheen ) {

		this.sheen = ( this.sheen || new Color() ).copy( source.sheen );

	} else {

		this.sheen = null;

	}

	this.transmission = source.transmission;
	this.transmissionMap = source.transmissionMap;

	return this;

};

/**
 * parameters = {
 *  color: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalMapType: THREE.TangentSpaceNormalMap,
 *  normalScale: <Vector2>,
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.MultiplyOperation,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *  flatShading: <bool>
 * }
 */

class MeshPhongMaterial extends Material {

	constructor( parameters ) {

		super();

		this.type = 'MeshPhongMaterial';

		this.color = new Color( 0xffffff ); // diffuse
		this.specular = new Color( 0x111111 );
		this.shininess = 30;

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.emissive = new Color( 0x000000 );
		this.emissiveIntensity = 1.0;
		this.emissiveMap = null;

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2( 1, 1 );

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.specularMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.combine = MultiplyOperation;
		this.reflectivity = 1;
		this.refractionRatio = 0.98;

		this.wireframe = false;
		this.wireframeLinewidth = 1;
		this.wireframeLinecap = 'round';
		this.wireframeLinejoin = 'round';

		this.skinning = false;
		this.morphTargets = false;
		this.morphNormals = false;

		this.flatShading = false;

		this.setValues( parameters );

	}

	copy( source ) {

		super.copy( source );

		this.color.copy( source.color );
		this.specular.copy( source.specular );
		this.shininess = source.shininess;

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.emissive.copy( source.emissive );
		this.emissiveMap = source.emissiveMap;
		this.emissiveIntensity = source.emissiveIntensity;

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy( source.normalScale );

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.specularMap = source.specularMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.combine = source.combine;
		this.reflectivity = source.reflectivity;
		this.refractionRatio = source.refractionRatio;

		this.wireframe = source.wireframe;
		this.wireframeLinewidth = source.wireframeLinewidth;
		this.wireframeLinecap = source.wireframeLinecap;
		this.wireframeLinejoin = source.wireframeLinejoin;

		this.skinning = source.skinning;
		this.morphTargets = source.morphTargets;
		this.morphNormals = source.morphNormals;

		this.flatShading = source.flatShading;

		return this;

	}

}

MeshPhongMaterial.prototype.isMeshPhongMaterial = true;

/**
 * Abstract base class of interpolants over parametric samples.
 *
 * The parameter domain is one dimensional, typically the time or a path
 * along a curve defined by the data.
 *
 * The sample values can have any dimensionality and derived classes may
 * apply special interpretations to the data.
 *
 * This class provides the interval seek in a Template Method, deferring
 * the actual interpolation to derived classes.
 *
 * Time complexity is O(1) for linear access crossing at most two points
 * and O(log N) for random access, where N is the number of positions.
 *
 * References:
 *
 * 		http://www.oodesign.com/template-method-pattern.html
 *
 */

function Interpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

	this.parameterPositions = parameterPositions;
	this._cachedIndex = 0;

	this.resultBuffer = resultBuffer !== undefined ?
		resultBuffer : new sampleValues.constructor( sampleSize );
	this.sampleValues = sampleValues;
	this.valueSize = sampleSize;

}

Object.assign( Interpolant.prototype, {

	evaluate: function ( t ) {

		const pp = this.parameterPositions;
		let i1 = this._cachedIndex,
			t1 = pp[ i1 ],
			t0 = pp[ i1 - 1 ];

		validate_interval: {

			seek: {

				let right;

				linear_scan: {

					//- See http://jsperf.com/comparison-to-undefined/3
					//- slower code:
					//-
					//- 				if ( t >= t1 || t1 === undefined ) {
					forward_scan: if ( ! ( t < t1 ) ) {

						for ( let giveUpAt = i1 + 2; ; ) {

							if ( t1 === undefined ) {

								if ( t < t0 ) break forward_scan;

								// after end

								i1 = pp.length;
								this._cachedIndex = i1;
								return this.afterEnd_( i1 - 1, t, t0 );

							}

							if ( i1 === giveUpAt ) break; // this loop

							t0 = t1;
							t1 = pp[ ++ i1 ];

							if ( t < t1 ) {

								// we have arrived at the sought interval
								break seek;

							}

						}

						// prepare binary search on the right side of the index
						right = pp.length;
						break linear_scan;

					}

					//- slower code:
					//-					if ( t < t0 || t0 === undefined ) {
					if ( ! ( t >= t0 ) ) {

						// looping?

						const t1global = pp[ 1 ];

						if ( t < t1global ) {

							i1 = 2; // + 1, using the scan for the details
							t0 = t1global;

						}

						// linear reverse scan

						for ( let giveUpAt = i1 - 2; ; ) {

							if ( t0 === undefined ) {

								// before start

								this._cachedIndex = 0;
								return this.beforeStart_( 0, t, t1 );

							}

							if ( i1 === giveUpAt ) break; // this loop

							t1 = t0;
							t0 = pp[ -- i1 - 1 ];

							if ( t >= t0 ) {

								// we have arrived at the sought interval
								break seek;

							}

						}

						// prepare binary search on the left side of the index
						right = i1;
						i1 = 0;
						break linear_scan;

					}

					// the interval is valid

					break validate_interval;

				} // linear scan

				// binary search

				while ( i1 < right ) {

					const mid = ( i1 + right ) >>> 1;

					if ( t < pp[ mid ] ) {

						right = mid;

					} else {

						i1 = mid + 1;

					}

				}

				t1 = pp[ i1 ];
				t0 = pp[ i1 - 1 ];

				// check boundary cases, again

				if ( t0 === undefined ) {

					this._cachedIndex = 0;
					return this.beforeStart_( 0, t, t1 );

				}

				if ( t1 === undefined ) {

					i1 = pp.length;
					this._cachedIndex = i1;
					return this.afterEnd_( i1 - 1, t0, t );

				}

			} // seek

			this._cachedIndex = i1;

			this.intervalChanged_( i1, t0, t1 );

		} // validate_interval

		return this.interpolate_( i1, t0, t, t1 );

	},

	settings: null, // optional, subclass-specific settings structure
	// Note: The indirection allows central control of many interpolants.

	// --- Protected interface

	DefaultSettings_: {},

	getSettings_: function () {

		return this.settings || this.DefaultSettings_;

	},

	copySampleValue_: function ( index ) {

		// copies a sample value to the result buffer

		const result = this.resultBuffer,
			values = this.sampleValues,
			stride = this.valueSize,
			offset = index * stride;

		for ( let i = 0; i !== stride; ++ i ) {

			result[ i ] = values[ offset + i ];

		}

		return result;

	},

	// Template methods for derived classes:

	interpolate_: function ( /* i1, t0, t, t1 */ ) {

		throw new Error( 'call to abstract method' );
		// implementations shall return this.resultBuffer

	},

	intervalChanged_: function ( /* i1, t0, t1 */ ) {

		// empty

	}

} );

// DECLARE ALIAS AFTER assign prototype
Object.assign( Interpolant.prototype, {

	//( 0, t, t0 ), returns this.resultBuffer
	beforeStart_: Interpolant.prototype.copySampleValue_,

	//( N-1, tN-1, t ), returns this.resultBuffer
	afterEnd_: Interpolant.prototype.copySampleValue_,

} );

/**
 * Fast and simple cubic spline interpolant.
 *
 * It was derived from a Hermitian construction setting the first derivative
 * at each sample position to the linear slope between neighboring positions
 * over their parameter interval.
 */

function CubicInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

	Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	this._weightPrev = - 0;
	this._offsetPrev = - 0;
	this._weightNext = - 0;
	this._offsetNext = - 0;

}

CubicInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

	constructor: CubicInterpolant,

	DefaultSettings_: {

		endingStart: ZeroCurvatureEnding,
		endingEnd: ZeroCurvatureEnding

	},

	intervalChanged_: function ( i1, t0, t1 ) {

		const pp = this.parameterPositions;
		let iPrev = i1 - 2,
			iNext = i1 + 1,

			tPrev = pp[ iPrev ],
			tNext = pp[ iNext ];

		if ( tPrev === undefined ) {

			switch ( this.getSettings_().endingStart ) {

				case ZeroSlopeEnding:

					// f'(t0) = 0
					iPrev = i1;
					tPrev = 2 * t0 - t1;

					break;

				case WrapAroundEnding:

					// use the other end of the curve
					iPrev = pp.length - 2;
					tPrev = t0 + pp[ iPrev ] - pp[ iPrev + 1 ];

					break;

				default: // ZeroCurvatureEnding

					// f''(t0) = 0 a.k.a. Natural Spline
					iPrev = i1;
					tPrev = t1;

			}

		}

		if ( tNext === undefined ) {

			switch ( this.getSettings_().endingEnd ) {

				case ZeroSlopeEnding:

					// f'(tN) = 0
					iNext = i1;
					tNext = 2 * t1 - t0;

					break;

				case WrapAroundEnding:

					// use the other end of the curve
					iNext = 1;
					tNext = t1 + pp[ 1 ] - pp[ 0 ];

					break;

				default: // ZeroCurvatureEnding

					// f''(tN) = 0, a.k.a. Natural Spline
					iNext = i1 - 1;
					tNext = t0;

			}

		}

		const halfDt = ( t1 - t0 ) * 0.5,
			stride = this.valueSize;

		this._weightPrev = halfDt / ( t0 - tPrev );
		this._weightNext = halfDt / ( tNext - t1 );
		this._offsetPrev = iPrev * stride;
		this._offsetNext = iNext * stride;

	},

	interpolate_: function ( i1, t0, t, t1 ) {

		const result = this.resultBuffer,
			values = this.sampleValues,
			stride = this.valueSize,

			o1 = i1 * stride,		o0 = o1 - stride,
			oP = this._offsetPrev, 	oN = this._offsetNext,
			wP = this._weightPrev,	wN = this._weightNext,

			p = ( t - t0 ) / ( t1 - t0 ),
			pp = p * p,
			ppp = pp * p;

		// evaluate polynomials

		const sP = - wP * ppp + 2 * wP * pp - wP * p;
		const s0 = ( 1 + wP ) * ppp + ( - 1.5 - 2 * wP ) * pp + ( - 0.5 + wP ) * p + 1;
		const s1 = ( - 1 - wN ) * ppp + ( 1.5 + wN ) * pp + 0.5 * p;
		const sN = wN * ppp - wN * pp;

		// combine data linearly

		for ( let i = 0; i !== stride; ++ i ) {

			result[ i ] =
					sP * values[ oP + i ] +
					s0 * values[ o0 + i ] +
					s1 * values[ o1 + i ] +
					sN * values[ oN + i ];

		}

		return result;

	}

} );

function LinearInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

	Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

}

LinearInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

	constructor: LinearInterpolant,

	interpolate_: function ( i1, t0, t, t1 ) {

		const result = this.resultBuffer,
			values = this.sampleValues,
			stride = this.valueSize,

			offset1 = i1 * stride,
			offset0 = offset1 - stride,

			weight1 = ( t - t0 ) / ( t1 - t0 ),
			weight0 = 1 - weight1;

		for ( let i = 0; i !== stride; ++ i ) {

			result[ i ] =
					values[ offset0 + i ] * weight0 +
					values[ offset1 + i ] * weight1;

		}

		return result;

	}

} );

/**
 *
 * Interpolant that evaluates to the sample value at the position preceeding
 * the parameter.
 */

function DiscreteInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

	Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

}

DiscreteInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

	constructor: DiscreteInterpolant,

	interpolate_: function ( i1 /*, t0, t, t1 */ ) {

		return this.copySampleValue_( i1 - 1 );

	}

} );

/**
 * Spherical linear unit quaternion interpolant.
 */

function QuaternionLinearInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

	Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

}

QuaternionLinearInterpolant.prototype = Object.assign( Object.create( Interpolant.prototype ), {

	constructor: QuaternionLinearInterpolant,

	interpolate_: function ( i1, t0, t, t1 ) {

		const result = this.resultBuffer,
			values = this.sampleValues,
			stride = this.valueSize,

			alpha = ( t - t0 ) / ( t1 - t0 );

		let offset = i1 * stride;

		for ( let end = offset + stride; offset !== end; offset += 4 ) {

			Quaternion.slerpFlat( result, 0, values, offset - stride, values, offset, alpha );

		}

		return result;

	}

} );

const Cache = {

	enabled: false,

	files: {},

	add: function ( key, file ) {

		if ( this.enabled === false ) return;

		// console.log( 'THREE.Cache', 'Adding key:', key );

		this.files[ key ] = file;

	},

	get: function ( key ) {

		if ( this.enabled === false ) return;

		// console.log( 'THREE.Cache', 'Checking key:', key );

		return this.files[ key ];

	},

	remove: function ( key ) {

		delete this.files[ key ];

	},

	clear: function () {

		this.files = {};

	}

};

function LoadingManager( onLoad, onProgress, onError ) {

	const scope = this;

	let isLoading = false;
	let itemsLoaded = 0;
	let itemsTotal = 0;
	let urlModifier = undefined;
	const handlers = [];

	// Refer to #5689 for the reason why we don't set .onStart
	// in the constructor

	this.onStart = undefined;
	this.onLoad = onLoad;
	this.onProgress = onProgress;
	this.onError = onError;

	this.itemStart = function ( url ) {

		itemsTotal ++;

		if ( isLoading === false ) {

			if ( scope.onStart !== undefined ) {

				scope.onStart( url, itemsLoaded, itemsTotal );

			}

		}

		isLoading = true;

	};

	this.itemEnd = function ( url ) {

		itemsLoaded ++;

		if ( scope.onProgress !== undefined ) {

			scope.onProgress( url, itemsLoaded, itemsTotal );

		}

		if ( itemsLoaded === itemsTotal ) {

			isLoading = false;

			if ( scope.onLoad !== undefined ) {

				scope.onLoad();

			}

		}

	};

	this.itemError = function ( url ) {

		if ( scope.onError !== undefined ) {

			scope.onError( url );

		}

	};

	this.resolveURL = function ( url ) {

		if ( urlModifier ) {

			return urlModifier( url );

		}

		return url;

	};

	this.setURLModifier = function ( transform ) {

		urlModifier = transform;

		return this;

	};

	this.addHandler = function ( regex, loader ) {

		handlers.push( regex, loader );

		return this;

	};

	this.removeHandler = function ( regex ) {

		const index = handlers.indexOf( regex );

		if ( index !== - 1 ) {

			handlers.splice( index, 2 );

		}

		return this;

	};

	this.getHandler = function ( file ) {

		for ( let i = 0, l = handlers.length; i < l; i += 2 ) {

			const regex = handlers[ i ];
			const loader = handlers[ i + 1 ];

			if ( regex.global ) regex.lastIndex = 0; // see #17920

			if ( regex.test( file ) ) {

				return loader;

			}

		}

		return null;

	};

}

const DefaultLoadingManager = new LoadingManager();

function Loader( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	this.crossOrigin = 'anonymous';
	this.withCredentials = false;
	this.path = '';
	this.resourcePath = '';
	this.requestHeader = {};

}

Object.assign( Loader.prototype, {

	load: function ( /* url, onLoad, onProgress, onError */ ) {},

	loadAsync: function ( url, onProgress ) {

		const scope = this;

		return new Promise( function ( resolve, reject ) {

			scope.load( url, resolve, onProgress, reject );

		} );

	},

	parse: function ( /* data */ ) {},

	setCrossOrigin: function ( crossOrigin ) {

		this.crossOrigin = crossOrigin;
		return this;

	},

	setWithCredentials: function ( value ) {

		this.withCredentials = value;
		return this;

	},

	setPath: function ( path ) {

		this.path = path;
		return this;

	},

	setResourcePath: function ( resourcePath ) {

		this.resourcePath = resourcePath;
		return this;

	},

	setRequestHeader: function ( requestHeader ) {

		this.requestHeader = requestHeader;
		return this;

	}

} );

const loading = {};

function FileLoader( manager ) {

	Loader.call( this, manager );

}

FileLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: FileLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		if ( url === undefined ) url = '';

		if ( this.path !== undefined ) url = this.path + url;

		url = this.manager.resolveURL( url );

		const scope = this;

		const cached = Cache.get( url );

		if ( cached !== undefined ) {

			scope.manager.itemStart( url );

			setTimeout( function () {

				if ( onLoad ) onLoad( cached );

				scope.manager.itemEnd( url );

			}, 0 );

			return cached;

		}

		// Check if request is duplicate

		if ( loading[ url ] !== undefined ) {

			loading[ url ].push( {

				onLoad: onLoad,
				onProgress: onProgress,
				onError: onError

			} );

			return;

		}

		// Check for data: URI
		const dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
		const dataUriRegexResult = url.match( dataUriRegex );
		let request;

		// Safari can not handle Data URIs through XMLHttpRequest so process manually
		if ( dataUriRegexResult ) {

			const mimeType = dataUriRegexResult[ 1 ];
			const isBase64 = !! dataUriRegexResult[ 2 ];

			let data = dataUriRegexResult[ 3 ];
			data = decodeURIComponent( data );

			if ( isBase64 ) data = atob( data );

			try {

				let response;
				const responseType = ( this.responseType || '' ).toLowerCase();

				switch ( responseType ) {

					case 'arraybuffer':
					case 'blob':

						const view = new Uint8Array( data.length );

						for ( let i = 0; i < data.length; i ++ ) {

							view[ i ] = data.charCodeAt( i );

						}

						if ( responseType === 'blob' ) {

							response = new Blob( [ view.buffer ], { type: mimeType } );

						} else {

							response = view.buffer;

						}

						break;

					case 'document':

						const parser = new DOMParser();
						response = parser.parseFromString( data, mimeType );

						break;

					case 'json':

						response = JSON.parse( data );

						break;

					default: // 'text' or other

						response = data;

						break;

				}

				// Wait for next browser tick like standard XMLHttpRequest event dispatching does
				setTimeout( function () {

					if ( onLoad ) onLoad( response );

					scope.manager.itemEnd( url );

				}, 0 );

			} catch ( error ) {

				// Wait for next browser tick like standard XMLHttpRequest event dispatching does
				setTimeout( function () {

					if ( onError ) onError( error );

					scope.manager.itemError( url );
					scope.manager.itemEnd( url );

				}, 0 );

			}

		} else {

			// Initialise array for duplicate requests

			loading[ url ] = [];

			loading[ url ].push( {

				onLoad: onLoad,
				onProgress: onProgress,
				onError: onError

			} );

			request = new XMLHttpRequest();

			request.open( 'GET', url, true );

			request.addEventListener( 'load', function ( event ) {

				const response = this.response;

				const callbacks = loading[ url ];

				delete loading[ url ];

				if ( this.status === 200 || this.status === 0 ) {

					// Some browsers return HTTP Status 0 when using non-http protocol
					// e.g. 'file://' or 'data://'. Handle as success.

					if ( this.status === 0 ) console.warn( 'THREE.FileLoader: HTTP Status 0 received.' );

					// Add to cache only on HTTP success, so that we do not cache
					// error response bodies as proper responses to requests.
					Cache.add( url, response );

					for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

						const callback = callbacks[ i ];
						if ( callback.onLoad ) callback.onLoad( response );

					}

					scope.manager.itemEnd( url );

				} else {

					for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

						const callback = callbacks[ i ];
						if ( callback.onError ) callback.onError( event );

					}

					scope.manager.itemError( url );
					scope.manager.itemEnd( url );

				}

			}, false );

			request.addEventListener( 'progress', function ( event ) {

				const callbacks = loading[ url ];

				for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

					const callback = callbacks[ i ];
					if ( callback.onProgress ) callback.onProgress( event );

				}

			}, false );

			request.addEventListener( 'error', function ( event ) {

				const callbacks = loading[ url ];

				delete loading[ url ];

				for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

					const callback = callbacks[ i ];
					if ( callback.onError ) callback.onError( event );

				}

				scope.manager.itemError( url );
				scope.manager.itemEnd( url );

			}, false );

			request.addEventListener( 'abort', function ( event ) {

				const callbacks = loading[ url ];

				delete loading[ url ];

				for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

					const callback = callbacks[ i ];
					if ( callback.onError ) callback.onError( event );

				}

				scope.manager.itemError( url );
				scope.manager.itemEnd( url );

			}, false );

			if ( this.responseType !== undefined ) request.responseType = this.responseType;
			if ( this.withCredentials !== undefined ) request.withCredentials = this.withCredentials;

			if ( request.overrideMimeType ) request.overrideMimeType( this.mimeType !== undefined ? this.mimeType : 'text/plain' );

			for ( const header in this.requestHeader ) {

				request.setRequestHeader( header, this.requestHeader[ header ] );

			}

			request.send( null );

		}

		scope.manager.itemStart( url );

		return request;

	},

	setResponseType: function ( value ) {

		this.responseType = value;
		return this;

	},

	setMimeType: function ( value ) {

		this.mimeType = value;
		return this;

	}

} );

/**
 * Abstract Base class to block based textures loader (dds, pvr, ...)
 *
 * Sub classes have to implement the parse() method which will be used in load().
 */

function CompressedTextureLoader( manager ) {

	Loader.call( this, manager );

}

CompressedTextureLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: CompressedTextureLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		const scope = this;

		const images = [];

		const texture = new CompressedTexture();

		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( scope.withCredentials );

		let loaded = 0;

		function loadTexture( i ) {

			loader.load( url[ i ], function ( buffer ) {

				const texDatas = scope.parse( buffer, true );

				images[ i ] = {
					width: texDatas.width,
					height: texDatas.height,
					format: texDatas.format,
					mipmaps: texDatas.mipmaps
				};

				loaded += 1;

				if ( loaded === 6 ) {

					if ( texDatas.mipmapCount === 1 ) texture.minFilter = LinearFilter;

					texture.image = images;
					texture.format = texDatas.format;
					texture.needsUpdate = true;

					if ( onLoad ) onLoad( texture );

				}

			}, onProgress, onError );

		}

		if ( Array.isArray( url ) ) {

			for ( let i = 0, il = url.length; i < il; ++ i ) {

				loadTexture( i );

			}

		} else {

			// compressed cubemap texture stored in a single DDS file

			loader.load( url, function ( buffer ) {

				const texDatas = scope.parse( buffer, true );

				if ( texDatas.isCubemap ) {

					const faces = texDatas.mipmaps.length / texDatas.mipmapCount;

					for ( let f = 0; f < faces; f ++ ) {

						images[ f ] = { mipmaps: [] };

						for ( let i = 0; i < texDatas.mipmapCount; i ++ ) {

							images[ f ].mipmaps.push( texDatas.mipmaps[ f * texDatas.mipmapCount + i ] );
							images[ f ].format = texDatas.format;
							images[ f ].width = texDatas.width;
							images[ f ].height = texDatas.height;

						}

					}

					texture.image = images;

				} else {

					texture.image.width = texDatas.width;
					texture.image.height = texDatas.height;
					texture.mipmaps = texDatas.mipmaps;

				}

				if ( texDatas.mipmapCount === 1 ) {

					texture.minFilter = LinearFilter;

				}

				texture.format = texDatas.format;
				texture.needsUpdate = true;

				if ( onLoad ) onLoad( texture );

			}, onProgress, onError );

		}

		return texture;

	}

} );

class ImageLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		if ( this.path !== undefined ) url = this.path + url;

		url = this.manager.resolveURL( url );

		const scope = this;

		const cached = Cache.get( url );

		if ( cached !== undefined ) {

			scope.manager.itemStart( url );

			setTimeout( function () {

				if ( onLoad ) onLoad( cached );

				scope.manager.itemEnd( url );

			}, 0 );

			return cached;

		}

		const image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );

		function onImageLoad() {

			image.removeEventListener( 'load', onImageLoad, false );
			image.removeEventListener( 'error', onImageError, false );

			Cache.add( url, this );

			if ( onLoad ) onLoad( this );

			scope.manager.itemEnd( url );

		}

		function onImageError( event ) {

			image.removeEventListener( 'load', onImageLoad, false );
			image.removeEventListener( 'error', onImageError, false );

			if ( onError ) onError( event );

			scope.manager.itemError( url );
			scope.manager.itemEnd( url );

		}

		image.addEventListener( 'load', onImageLoad, false );
		image.addEventListener( 'error', onImageError, false );

		if ( url.substr( 0, 5 ) !== 'data:' ) {

			if ( this.crossOrigin !== undefined ) image.crossOrigin = this.crossOrigin;

		}

		scope.manager.itemStart( url );

		image.src = url;

		return image;

	}

}

class CubeTextureLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( urls, onLoad, onProgress, onError ) {

		const texture = new CubeTexture();

		const loader = new ImageLoader( this.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.setPath( this.path );

		let loaded = 0;

		function loadTexture( i ) {

			loader.load( urls[ i ], function ( image ) {

				texture.images[ i ] = image;

				loaded ++;

				if ( loaded === 6 ) {

					texture.needsUpdate = true;

					if ( onLoad ) onLoad( texture );

				}

			}, undefined, onError );

		}

		for ( let i = 0; i < urls.length; ++ i ) {

			loadTexture( i );

		}

		return texture;

	}

}

/**
 * Abstract Base class to load generic binary textures formats (rgbe, hdr, ...)
 *
 * Sub classes have to implement the parse() method which will be used in load().
 */

function DataTextureLoader( manager ) {

	Loader.call( this, manager );

}

DataTextureLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: DataTextureLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		const scope = this;

		const texture = new DataTexture();

		const loader = new FileLoader( this.manager );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( this.requestHeader );
		loader.setPath( this.path );
		loader.setWithCredentials( scope.withCredentials );
		loader.load( url, function ( buffer ) {

			const texData = scope.parse( buffer );

			if ( ! texData ) return;

			if ( texData.image !== undefined ) {

				texture.image = texData.image;

			} else if ( texData.data !== undefined ) {

				texture.image.width = texData.width;
				texture.image.height = texData.height;
				texture.image.data = texData.data;

			}

			texture.wrapS = texData.wrapS !== undefined ? texData.wrapS : ClampToEdgeWrapping;
			texture.wrapT = texData.wrapT !== undefined ? texData.wrapT : ClampToEdgeWrapping;

			texture.magFilter = texData.magFilter !== undefined ? texData.magFilter : LinearFilter;
			texture.minFilter = texData.minFilter !== undefined ? texData.minFilter : LinearFilter;

			texture.anisotropy = texData.anisotropy !== undefined ? texData.anisotropy : 1;

			if ( texData.encoding !== undefined ) {

				texture.encoding = texData.encoding;

			}

			if ( texData.flipY !== undefined ) {

				texture.flipY = texData.flipY;

			}

			if ( texData.format !== undefined ) {

				texture.format = texData.format;

			}

			if ( texData.type !== undefined ) {

				texture.type = texData.type;

			}

			if ( texData.mipmaps !== undefined ) {

				texture.mipmaps = texData.mipmaps;
				texture.minFilter = LinearMipmapLinearFilter; // presumably...

			}

			if ( texData.mipmapCount === 1 ) {

				texture.minFilter = LinearFilter;

			}

			texture.needsUpdate = true;

			if ( onLoad ) onLoad( texture, texData );

		}, onProgress, onError );


		return texture;

	}

} );

function TextureLoader( manager ) {

	Loader.call( this, manager );

}

TextureLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: TextureLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		const texture = new Texture();

		const loader = new ImageLoader( this.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.setPath( this.path );

		loader.load( url, function ( image ) {

			texture.image = image;

			// JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
			const isJPEG = url.search( /\.jpe?g($|\?)/i ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

			texture.format = isJPEG ? RGBFormat : RGBAFormat;
			texture.needsUpdate = true;

			if ( onLoad !== undefined ) {

				onLoad( texture );

			}

		}, onProgress, onError );

		return texture;

	}

} );

/**
 * Extensible curve object.
 *
 * Some common of curve methods:
 * .getPoint( t, optionalTarget ), .getTangent( t, optionalTarget )
 * .getPointAt( u, optionalTarget ), .getTangentAt( u, optionalTarget )
 * .getPoints(), .getSpacedPoints()
 * .getLength()
 * .updateArcLengths()
 *
 * This following curves inherit from THREE.Curve:
 *
 * -- 2D curves --
 * THREE.ArcCurve
 * THREE.CubicBezierCurve
 * THREE.EllipseCurve
 * THREE.LineCurve
 * THREE.QuadraticBezierCurve
 * THREE.SplineCurve
 *
 * -- 3D curves --
 * THREE.CatmullRomCurve3
 * THREE.CubicBezierCurve3
 * THREE.LineCurve3
 * THREE.QuadraticBezierCurve3
 *
 * A series of curves can be represented as a THREE.CurvePath.
 *
 **/

function Curve() {

	this.type = 'Curve';

	this.arcLengthDivisions = 200;

}

Object.assign( Curve.prototype, {

	// Virtual base class method to overwrite and implement in subclasses
	//	- t [0 .. 1]

	getPoint: function ( /* t, optionalTarget */ ) {

		console.warn( 'THREE.Curve: .getPoint() not implemented.' );
		return null;

	},

	// Get point at relative position in curve according to arc length
	// - u [0 .. 1]

	getPointAt: function ( u, optionalTarget ) {

		const t = this.getUtoTmapping( u );
		return this.getPoint( t, optionalTarget );

	},

	// Get sequence of points using getPoint( t )

	getPoints: function ( divisions = 5 ) {

		const points = [];

		for ( let d = 0; d <= divisions; d ++ ) {

			points.push( this.getPoint( d / divisions ) );

		}

		return points;

	},

	// Get sequence of points using getPointAt( u )

	getSpacedPoints: function ( divisions = 5 ) {

		const points = [];

		for ( let d = 0; d <= divisions; d ++ ) {

			points.push( this.getPointAt( d / divisions ) );

		}

		return points;

	},

	// Get total curve arc length

	getLength: function () {

		const lengths = this.getLengths();
		return lengths[ lengths.length - 1 ];

	},

	// Get list of cumulative segment lengths

	getLengths: function ( divisions ) {

		if ( divisions === undefined ) divisions = this.arcLengthDivisions;

		if ( this.cacheArcLengths &&
			( this.cacheArcLengths.length === divisions + 1 ) &&
			! this.needsUpdate ) {

			return this.cacheArcLengths;

		}

		this.needsUpdate = false;

		const cache = [];
		let current, last = this.getPoint( 0 );
		let sum = 0;

		cache.push( 0 );

		for ( let p = 1; p <= divisions; p ++ ) {

			current = this.getPoint( p / divisions );
			sum += current.distanceTo( last );
			cache.push( sum );
			last = current;

		}

		this.cacheArcLengths = cache;

		return cache; // { sums: cache, sum: sum }; Sum is in the last element.

	},

	updateArcLengths: function () {

		this.needsUpdate = true;
		this.getLengths();

	},

	// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant

	getUtoTmapping: function ( u, distance ) {

		const arcLengths = this.getLengths();

		let i = 0;
		const il = arcLengths.length;

		let targetArcLength; // The targeted u distance value to get

		if ( distance ) {

			targetArcLength = distance;

		} else {

			targetArcLength = u * arcLengths[ il - 1 ];

		}

		// binary search for the index with largest value smaller than target u distance

		let low = 0, high = il - 1, comparison;

		while ( low <= high ) {

			i = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

			comparison = arcLengths[ i ] - targetArcLength;

			if ( comparison < 0 ) {

				low = i + 1;

			} else if ( comparison > 0 ) {

				high = i - 1;

			} else {

				high = i;
				break;

				// DONE

			}

		}

		i = high;

		if ( arcLengths[ i ] === targetArcLength ) {

			return i / ( il - 1 );

		}

		// we could get finer grain at lengths, or use simple interpolation between two points

		const lengthBefore = arcLengths[ i ];
		const lengthAfter = arcLengths[ i + 1 ];

		const segmentLength = lengthAfter - lengthBefore;

		// determine where we are between the 'before' and 'after' points

		const segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;

		// add that fractional amount to t

		const t = ( i + segmentFraction ) / ( il - 1 );

		return t;

	},

	// Returns a unit vector tangent at t
	// In case any sub curve does not implement its tangent derivation,
	// 2 points a small delta apart will be used to find its gradient
	// which seems to give a reasonable approximation

	getTangent: function ( t, optionalTarget ) {

		const delta = 0.0001;
		let t1 = t - delta;
		let t2 = t + delta;

		// Capping in case of danger

		if ( t1 < 0 ) t1 = 0;
		if ( t2 > 1 ) t2 = 1;

		const pt1 = this.getPoint( t1 );
		const pt2 = this.getPoint( t2 );

		const tangent = optionalTarget || ( ( pt1.isVector2 ) ? new Vector2() : new Vector3() );

		tangent.copy( pt2 ).sub( pt1 ).normalize();

		return tangent;

	},

	getTangentAt: function ( u, optionalTarget ) {

		const t = this.getUtoTmapping( u );
		return this.getTangent( t, optionalTarget );

	},

	computeFrenetFrames: function ( segments, closed ) {

		// see http://www.cs.indiana.edu/pub/techreports/TR425.pdf

		const normal = new Vector3();

		const tangents = [];
		const normals = [];
		const binormals = [];

		const vec = new Vector3();
		const mat = new Matrix4();

		// compute the tangent vectors for each segment on the curve

		for ( let i = 0; i <= segments; i ++ ) {

			const u = i / segments;

			tangents[ i ] = this.getTangentAt( u, new Vector3() );
			tangents[ i ].normalize();

		}

		// select an initial normal vector perpendicular to the first tangent vector,
		// and in the direction of the minimum tangent xyz component

		normals[ 0 ] = new Vector3();
		binormals[ 0 ] = new Vector3();
		let min = Number.MAX_VALUE;
		const tx = Math.abs( tangents[ 0 ].x );
		const ty = Math.abs( tangents[ 0 ].y );
		const tz = Math.abs( tangents[ 0 ].z );

		if ( tx <= min ) {

			min = tx;
			normal.set( 1, 0, 0 );

		}

		if ( ty <= min ) {

			min = ty;
			normal.set( 0, 1, 0 );

		}

		if ( tz <= min ) {

			normal.set( 0, 0, 1 );

		}

		vec.crossVectors( tangents[ 0 ], normal ).normalize();

		normals[ 0 ].crossVectors( tangents[ 0 ], vec );
		binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] );


		// compute the slowly-varying normal and binormal vectors for each segment on the curve

		for ( let i = 1; i <= segments; i ++ ) {

			normals[ i ] = normals[ i - 1 ].clone();

			binormals[ i ] = binormals[ i - 1 ].clone();

			vec.crossVectors( tangents[ i - 1 ], tangents[ i ] );

			if ( vec.length() > Number.EPSILON ) {

				vec.normalize();

				const theta = Math.acos( MathUtils.clamp( tangents[ i - 1 ].dot( tangents[ i ] ), - 1, 1 ) ); // clamp for floating pt errors

				normals[ i ].applyMatrix4( mat.makeRotationAxis( vec, theta ) );

			}

			binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );

		}

		// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same

		if ( closed === true ) {

			let theta = Math.acos( MathUtils.clamp( normals[ 0 ].dot( normals[ segments ] ), - 1, 1 ) );
			theta /= segments;

			if ( tangents[ 0 ].dot( vec.crossVectors( normals[ 0 ], normals[ segments ] ) ) > 0 ) {

				theta = - theta;

			}

			for ( let i = 1; i <= segments; i ++ ) {

				// twist a little...
				normals[ i ].applyMatrix4( mat.makeRotationAxis( tangents[ i ], theta * i ) );
				binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );

			}

		}

		return {
			tangents: tangents,
			normals: normals,
			binormals: binormals
		};

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.arcLengthDivisions = source.arcLengthDivisions;

		return this;

	},

	toJSON: function () {

		const data = {
			metadata: {
				version: 4.5,
				type: 'Curve',
				generator: 'Curve.toJSON'
			}
		};

		data.arcLengthDivisions = this.arcLengthDivisions;
		data.type = this.type;

		return data;

	},

	fromJSON: function ( json ) {

		this.arcLengthDivisions = json.arcLengthDivisions;

		return this;

	}

} );

class Light extends Object3D {

	constructor( color, intensity = 1 ) {

		super();

		this.type = 'Light';

		this.color = new Color( color );
		this.intensity = intensity;

	}

	copy( source ) {

		super.copy( source );

		this.color.copy( source.color );
		this.intensity = source.intensity;

		return this;

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		data.object.color = this.color.getHex();
		data.object.intensity = this.intensity;

		if ( this.groundColor !== undefined ) data.object.groundColor = this.groundColor.getHex();

		if ( this.distance !== undefined ) data.object.distance = this.distance;
		if ( this.angle !== undefined ) data.object.angle = this.angle;
		if ( this.decay !== undefined ) data.object.decay = this.decay;
		if ( this.penumbra !== undefined ) data.object.penumbra = this.penumbra;

		if ( this.shadow !== undefined ) data.object.shadow = this.shadow.toJSON();

		return data;

	}

}

Light.prototype.isLight = true;

class HemisphereLight extends Light {

	constructor( skyColor, groundColor, intensity ) {

		super( skyColor, intensity );

		this.type = 'HemisphereLight';

		this.position.copy( Object3D.DefaultUp );
		this.updateMatrix();

		this.groundColor = new Color( groundColor );

	}

	copy( source ) {

		Light.prototype.copy.call( this, source );

		this.groundColor.copy( source.groundColor );

		return this;

	}

}

HemisphereLight.prototype.isHemisphereLight = true;

const _projScreenMatrix = /*@__PURE__*/ new Matrix4();
const _lightPositionWorld = /*@__PURE__*/ new Vector3();
const _lookTarget = /*@__PURE__*/ new Vector3();

class LightShadow {

	constructor( camera ) {

		this.camera = camera;

		this.bias = 0;
		this.normalBias = 0;
		this.radius = 1;

		this.mapSize = new Vector2( 512, 512 );

		this.map = null;
		this.mapPass = null;
		this.matrix = new Matrix4();

		this.autoUpdate = true;
		this.needsUpdate = false;

		this._frustum = new Frustum();
		this._frameExtents = new Vector2( 1, 1 );

		this._viewportCount = 1;

		this._viewports = [

			new Vector4( 0, 0, 1, 1 )

		];

	}

	getViewportCount() {

		return this._viewportCount;

	}

	getFrustum() {

		return this._frustum;

	}

	updateMatrices( light ) {

		const shadowCamera = this.camera;
		const shadowMatrix = this.matrix;

		_lightPositionWorld.setFromMatrixPosition( light.matrixWorld );
		shadowCamera.position.copy( _lightPositionWorld );

		_lookTarget.setFromMatrixPosition( light.target.matrixWorld );
		shadowCamera.lookAt( _lookTarget );
		shadowCamera.updateMatrixWorld();

		_projScreenMatrix.multiplyMatrices( shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse );
		this._frustum.setFromProjectionMatrix( _projScreenMatrix );

		shadowMatrix.set(
			0.5, 0.0, 0.0, 0.5,
			0.0, 0.5, 0.0, 0.5,
			0.0, 0.0, 0.5, 0.5,
			0.0, 0.0, 0.0, 1.0
		);

		shadowMatrix.multiply( shadowCamera.projectionMatrix );
		shadowMatrix.multiply( shadowCamera.matrixWorldInverse );

	}

	getViewport( viewportIndex ) {

		return this._viewports[ viewportIndex ];

	}

	getFrameExtents() {

		return this._frameExtents;

	}

	copy( source ) {

		this.camera = source.camera.clone();

		this.bias = source.bias;
		this.radius = source.radius;

		this.mapSize.copy( source.mapSize );

		return this;

	}

	clone() {

		return new this.constructor().copy( this );

	}

	toJSON() {

		const object = {};

		if ( this.bias !== 0 ) object.bias = this.bias;
		if ( this.normalBias !== 0 ) object.normalBias = this.normalBias;
		if ( this.radius !== 1 ) object.radius = this.radius;
		if ( this.mapSize.x !== 512 || this.mapSize.y !== 512 ) object.mapSize = this.mapSize.toArray();

		object.camera = this.camera.toJSON( false ).object;
		delete object.camera.matrix;

		return object;

	}

}

class SpotLightShadow extends LightShadow {

	constructor() {

		super( new PerspectiveCamera( 50, 1, 0.5, 500 ) );

		this.focus = 1;

	}

	updateMatrices( light ) {

		const camera = this.camera;

		const fov = MathUtils.RAD2DEG * 2 * light.angle * this.focus;
		const aspect = this.mapSize.width / this.mapSize.height;
		const far = light.distance || camera.far;

		if ( fov !== camera.fov || aspect !== camera.aspect || far !== camera.far ) {

			camera.fov = fov;
			camera.aspect = aspect;
			camera.far = far;
			camera.updateProjectionMatrix();

		}

		super.updateMatrices( light );

	}

}

SpotLightShadow.prototype.isSpotLightShadow = true;

class SpotLight extends Light {

	constructor( color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1 ) {

		super( color, intensity );

		this.type = 'SpotLight';

		this.position.copy( Object3D.DefaultUp );
		this.updateMatrix();

		this.target = new Object3D();

		this.distance = distance;
		this.angle = angle;
		this.penumbra = penumbra;
		this.decay = decay; // for physically correct lights, should be 2.

		this.shadow = new SpotLightShadow();

	}

	get power() {

		// intensity = power per solid angle.
		// ref: equation (17) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		return this.intensity * Math.PI;

	}

	set power( power ) {

		// intensity = power per solid angle.
		// ref: equation (17) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		this.intensity = power / Math.PI;

	}

	copy( source ) {

		super.copy( source );

		this.distance = source.distance;
		this.angle = source.angle;
		this.penumbra = source.penumbra;
		this.decay = source.decay;

		this.target = source.target.clone();

		this.shadow = source.shadow.clone();

		return this;

	}

}

SpotLight.prototype.isSpotLight = true;

const _projScreenMatrix$1 = /*@__PURE__*/ new Matrix4();
const _lightPositionWorld$1 = /*@__PURE__*/ new Vector3();
const _lookTarget$1 = /*@__PURE__*/ new Vector3();

class PointLightShadow extends LightShadow {

	constructor() {

		super( new PerspectiveCamera( 90, 1, 0.5, 500 ) );

		this._frameExtents = new Vector2( 4, 2 );

		this._viewportCount = 6;

		this._viewports = [
			// These viewports map a cube-map onto a 2D texture with the
			// following orientation:
			//
			//  xzXZ
			//   y Y
			//
			// X - Positive x direction
			// x - Negative x direction
			// Y - Positive y direction
			// y - Negative y direction
			// Z - Positive z direction
			// z - Negative z direction

			// positive X
			new Vector4( 2, 1, 1, 1 ),
			// negative X
			new Vector4( 0, 1, 1, 1 ),
			// positive Z
			new Vector4( 3, 1, 1, 1 ),
			// negative Z
			new Vector4( 1, 1, 1, 1 ),
			// positive Y
			new Vector4( 3, 0, 1, 1 ),
			// negative Y
			new Vector4( 1, 0, 1, 1 )
		];

		this._cubeDirections = [
			new Vector3( 1, 0, 0 ), new Vector3( - 1, 0, 0 ), new Vector3( 0, 0, 1 ),
			new Vector3( 0, 0, - 1 ), new Vector3( 0, 1, 0 ), new Vector3( 0, - 1, 0 )
		];

		this._cubeUps = [
			new Vector3( 0, 1, 0 ), new Vector3( 0, 1, 0 ), new Vector3( 0, 1, 0 ),
			new Vector3( 0, 1, 0 ), new Vector3( 0, 0, 1 ),	new Vector3( 0, 0, - 1 )
		];

	}

	updateMatrices( light, viewportIndex = 0 ) {

		const camera = this.camera;
		const shadowMatrix = this.matrix;

		_lightPositionWorld$1.setFromMatrixPosition( light.matrixWorld );
		camera.position.copy( _lightPositionWorld$1 );

		_lookTarget$1.copy( camera.position );
		_lookTarget$1.add( this._cubeDirections[ viewportIndex ] );
		camera.up.copy( this._cubeUps[ viewportIndex ] );
		camera.lookAt( _lookTarget$1 );
		camera.updateMatrixWorld();

		shadowMatrix.makeTranslation( - _lightPositionWorld$1.x, - _lightPositionWorld$1.y, - _lightPositionWorld$1.z );

		_projScreenMatrix$1.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
		this._frustum.setFromProjectionMatrix( _projScreenMatrix$1 );

	}

}

PointLightShadow.prototype.isPointLightShadow = true;

class PointLight extends Light {

	constructor( color, intensity, distance = 0, decay = 1 ) {

		super( color, intensity );

		this.type = 'PointLight';

		this.distance = distance;
		this.decay = decay; // for physically correct lights, should be 2.

		this.shadow = new PointLightShadow();

	}

	get power() {

		// intensity = power per solid angle.
		// ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		return this.intensity * 4 * Math.PI;

	}

	set power( power ) {

		// intensity = power per solid angle.
		// ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		this.intensity = power / ( 4 * Math.PI );

	}

	copy( source ) {

		super.copy( source );

		this.distance = source.distance;
		this.decay = source.decay;

		this.shadow = source.shadow.clone();

		return this;

	}

}

PointLight.prototype.isPointLight = true;

const LoaderUtils = {

	decodeText: function ( array ) {

		if ( typeof TextDecoder !== 'undefined' ) {

			return new TextDecoder().decode( array );

		}

		// Avoid the String.fromCharCode.apply(null, array) shortcut, which
		// throws a "maximum call stack size exceeded" error for large arrays.

		let s = '';

		for ( let i = 0, il = array.length; i < il; i ++ ) {

			// Implicitly assumes little-endian.
			s += String.fromCharCode( array[ i ] );

		}

		try {

			// merges multi-byte utf-8 characters.

			return decodeURIComponent( escape( s ) );

		} catch ( e ) { // see #16358

			return s;

		}

	},

	extractUrlBase: function ( url ) {

		const index = url.lastIndexOf( '/' );

		if ( index === - 1 ) return './';

		return url.substr( 0, index + 1 );

	}

};

function InstancedBufferGeometry() {

	BufferGeometry.call( this );

	this.type = 'InstancedBufferGeometry';
	this.instanceCount = Infinity;

}

InstancedBufferGeometry.prototype = Object.assign( Object.create( BufferGeometry.prototype ), {

	constructor: InstancedBufferGeometry,

	isInstancedBufferGeometry: true,

	copy: function ( source ) {

		BufferGeometry.prototype.copy.call( this, source );

		this.instanceCount = source.instanceCount;

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	toJSON: function () {

		const data = BufferGeometry.prototype.toJSON.call( this );

		data.instanceCount = this.instanceCount;

		data.isInstancedBufferGeometry = true;

		return data;

	}

} );

function InstancedBufferAttribute( array, itemSize, normalized, meshPerAttribute ) {

	if ( typeof ( normalized ) === 'number' ) {

		meshPerAttribute = normalized;

		normalized = false;

		console.error( 'THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.' );

	}

	BufferAttribute.call( this, array, itemSize, normalized );

	this.meshPerAttribute = meshPerAttribute || 1;

}

InstancedBufferAttribute.prototype = Object.assign( Object.create( BufferAttribute.prototype ), {

	constructor: InstancedBufferAttribute,

	isInstancedBufferAttribute: true,

	copy: function ( source ) {

		BufferAttribute.prototype.copy.call( this, source );

		this.meshPerAttribute = source.meshPerAttribute;

		return this;

	},

	toJSON: function ()	{

		const data = BufferAttribute.prototype.toJSON.call( this );

		data.meshPerAttribute = this.meshPerAttribute;

		data.isInstancedBufferAttribute = true;

		return data;

	}

} );

function ImageBitmapLoader( manager ) {

	if ( typeof createImageBitmap === 'undefined' ) {

		console.warn( 'THREE.ImageBitmapLoader: createImageBitmap() not supported.' );

	}

	if ( typeof fetch === 'undefined' ) {

		console.warn( 'THREE.ImageBitmapLoader: fetch() not supported.' );

	}

	Loader.call( this, manager );

	this.options = { premultiplyAlpha: 'none' };

}

ImageBitmapLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: ImageBitmapLoader,

	isImageBitmapLoader: true,

	setOptions: function setOptions( options ) {

		this.options = options;

		return this;

	},

	load: function ( url, onLoad, onProgress, onError ) {

		if ( url === undefined ) url = '';

		if ( this.path !== undefined ) url = this.path + url;

		url = this.manager.resolveURL( url );

		const scope = this;

		const cached = Cache.get( url );

		if ( cached !== undefined ) {

			scope.manager.itemStart( url );

			setTimeout( function () {

				if ( onLoad ) onLoad( cached );

				scope.manager.itemEnd( url );

			}, 0 );

			return cached;

		}

		const fetchOptions = {};
		fetchOptions.credentials = ( this.crossOrigin === 'anonymous' ) ? 'same-origin' : 'include';
		fetchOptions.headers = this.requestHeader;

		fetch( url, fetchOptions ).then( function ( res ) {

			return res.blob();

		} ).then( function ( blob ) {

			return createImageBitmap( blob, Object.assign( scope.options, { colorSpaceConversion: 'none' } ) );

		} ).then( function ( imageBitmap ) {

			Cache.add( url, imageBitmap );

			if ( onLoad ) onLoad( imageBitmap );

			scope.manager.itemEnd( url );

		} ).catch( function ( e ) {

			if ( onError ) onError( e );

			scope.manager.itemError( url );
			scope.manager.itemEnd( url );

		} );

		scope.manager.itemStart( url );

	}

} );

let _context;

const AudioContext = {

	getContext: function () {

		if ( _context === undefined ) {

			_context = new ( window.AudioContext || window.webkitAudioContext )();

		}

		return _context;

	},

	setContext: function ( value ) {

		_context = value;

	}

};

class AudioLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new FileLoader( this.manager );
		loader.setResponseType( 'arraybuffer' );
		loader.setPath( this.path );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );
		loader.load( url, function ( buffer ) {

			try {

				// Create a copy of the buffer. The `decodeAudioData` method
				// detaches the buffer when complete, preventing reuse.
				const bufferCopy = buffer.slice( 0 );

				const context = AudioContext.getContext();
				context.decodeAudioData( bufferCopy, function ( audioBuffer ) {

					onLoad( audioBuffer );

				} );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				scope.manager.itemError( url );

			}

		}, onProgress, onError );

	}

}

new Matrix4();
new Matrix4();

class Audio extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'Audio';

		this.listener = listener;
		this.context = listener.context;

		this.gain = this.context.createGain();
		this.gain.connect( listener.getInput() );

		this.autoplay = false;

		this.buffer = null;
		this.detune = 0;
		this.loop = false;
		this.loopStart = 0;
		this.loopEnd = 0;
		this.offset = 0;
		this.duration = undefined;
		this.playbackRate = 1;
		this.isPlaying = false;
		this.hasPlaybackControl = true;
		this.source = null;
		this.sourceType = 'empty';

		this._startedAt = 0;
		this._progress = 0;
		this._connected = false;

		this.filters = [];

	}

	getOutput() {

		return this.gain;

	}

	setNodeSource( audioNode ) {

		this.hasPlaybackControl = false;
		this.sourceType = 'audioNode';
		this.source = audioNode;
		this.connect();

		return this;

	}

	setMediaElementSource( mediaElement ) {

		this.hasPlaybackControl = false;
		this.sourceType = 'mediaNode';
		this.source = this.context.createMediaElementSource( mediaElement );
		this.connect();

		return this;

	}

	setMediaStreamSource( mediaStream ) {

		this.hasPlaybackControl = false;
		this.sourceType = 'mediaStreamNode';
		this.source = this.context.createMediaStreamSource( mediaStream );
		this.connect();

		return this;

	}

	setBuffer( audioBuffer ) {

		this.buffer = audioBuffer;
		this.sourceType = 'buffer';

		if ( this.autoplay ) this.play();

		return this;

	}

	play( delay = 0 ) {

		if ( this.isPlaying === true ) {

			console.warn( 'THREE.Audio: Audio is already playing.' );
			return;

		}

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this._startedAt = this.context.currentTime + delay;

		const source = this.context.createBufferSource();
		source.buffer = this.buffer;
		source.loop = this.loop;
		source.loopStart = this.loopStart;
		source.loopEnd = this.loopEnd;
		source.onended = this.onEnded.bind( this );
		source.start( this._startedAt, this._progress + this.offset, this.duration );

		this.isPlaying = true;

		this.source = source;

		this.setDetune( this.detune );
		this.setPlaybackRate( this.playbackRate );

		return this.connect();

	}

	pause() {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		if ( this.isPlaying === true ) {

			// update current progress

			this._progress += Math.max( this.context.currentTime - this._startedAt, 0 ) * this.playbackRate;

			if ( this.loop === true ) {

				// ensure _progress does not exceed duration with looped audios

				this._progress = this._progress % ( this.duration || this.buffer.duration );

			}

			this.source.stop();
			this.source.onended = null;

			this.isPlaying = false;

		}

		return this;

	}

	stop() {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this._progress = 0;

		this.source.stop();
		this.source.onended = null;
		this.isPlaying = false;

		return this;

	}

	connect() {

		if ( this.filters.length > 0 ) {

			this.source.connect( this.filters[ 0 ] );

			for ( let i = 1, l = this.filters.length; i < l; i ++ ) {

				this.filters[ i - 1 ].connect( this.filters[ i ] );

			}

			this.filters[ this.filters.length - 1 ].connect( this.getOutput() );

		} else {

			this.source.connect( this.getOutput() );

		}

		this._connected = true;

		return this;

	}

	disconnect() {

		if ( this.filters.length > 0 ) {

			this.source.disconnect( this.filters[ 0 ] );

			for ( let i = 1, l = this.filters.length; i < l; i ++ ) {

				this.filters[ i - 1 ].disconnect( this.filters[ i ] );

			}

			this.filters[ this.filters.length - 1 ].disconnect( this.getOutput() );

		} else {

			this.source.disconnect( this.getOutput() );

		}

		this._connected = false;

		return this;

	}

	getFilters() {

		return this.filters;

	}

	setFilters( value ) {

		if ( ! value ) value = [];

		if ( this._connected === true ) {

			this.disconnect();
			this.filters = value.slice();
			this.connect();

		} else {

			this.filters = value.slice();

		}

		return this;

	}

	setDetune( value ) {

		this.detune = value;

		if ( this.source.detune === undefined ) return; // only set detune when available

		if ( this.isPlaying === true ) {

			this.source.detune.setTargetAtTime( this.detune, this.context.currentTime, 0.01 );

		}

		return this;

	}

	getDetune() {

		return this.detune;

	}

	getFilter() {

		return this.getFilters()[ 0 ];

	}

	setFilter( filter ) {

		return this.setFilters( filter ? [ filter ] : [] );

	}

	setPlaybackRate( value ) {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this.playbackRate = value;

		if ( this.isPlaying === true ) {

			this.source.playbackRate.setTargetAtTime( this.playbackRate, this.context.currentTime, 0.01 );

		}

		return this;

	}

	getPlaybackRate() {

		return this.playbackRate;

	}

	onEnded() {

		this.isPlaying = false;

	}

	getLoop() {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return false;

		}

		return this.loop;

	}

	setLoop( value ) {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this.loop = value;

		if ( this.isPlaying === true ) {

			this.source.loop = this.loop;

		}

		return this;

	}

	setLoopStart( value ) {

		this.loopStart = value;

		return this;

	}

	setLoopEnd( value ) {

		this.loopEnd = value;

		return this;

	}

	getVolume() {

		return this.gain.gain.value;

	}

	setVolume( value ) {

		this.gain.gain.setTargetAtTime( value, this.context.currentTime, 0.01 );

		return this;

	}

}

// Characters [].:/ are reserved for track binding syntax.
const _RESERVED_CHARS_RE = '\\[\\]\\.:\\/';
const _reservedRe = new RegExp( '[' + _RESERVED_CHARS_RE + ']', 'g' );

// Attempts to allow node names from any language. ES5's `\w` regexp matches
// only latin characters, and the unicode \p{L} is not yet supported. So
// instead, we exclude reserved characters and match everything else.
const _wordChar = '[^' + _RESERVED_CHARS_RE + ']';
const _wordCharOrDot = '[^' + _RESERVED_CHARS_RE.replace( '\\.', '' ) + ']';

// Parent directories, delimited by '/' or ':'. Currently unused, but must
// be matched to parse the rest of the track name.
const _directoryRe = /((?:WC+[\/:])*)/.source.replace( 'WC', _wordChar );

// Target node. May contain word characters (a-zA-Z0-9_) and '.' or '-'.
const _nodeRe = /(WCOD+)?/.source.replace( 'WCOD', _wordCharOrDot );

// Object on target node, and accessor. May not contain reserved
// characters. Accessor may contain any character except closing bracket.
const _objectRe = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace( 'WC', _wordChar );

// Property and accessor. May not contain reserved characters. Accessor may
// contain any non-bracket characters.
const _propertyRe = /\.(WC+)(?:\[(.+)\])?/.source.replace( 'WC', _wordChar );

const _trackRe = new RegExp( ''
	+ '^'
	+ _directoryRe
	+ _nodeRe
	+ _objectRe
	+ _propertyRe
	+ '$'
);

const _supportedObjectNames = [ 'material', 'materials', 'bones' ];

function Composite( targetGroup, path, optionalParsedPath ) {

	const parsedPath = optionalParsedPath || PropertyBinding.parseTrackName( path );

	this._targetGroup = targetGroup;
	this._bindings = targetGroup.subscribe_( path, parsedPath );

}

Object.assign( Composite.prototype, {

	getValue: function ( array, offset ) {

		this.bind(); // bind all binding

		const firstValidIndex = this._targetGroup.nCachedObjects_,
			binding = this._bindings[ firstValidIndex ];

		// and only call .getValue on the first
		if ( binding !== undefined ) binding.getValue( array, offset );

	},

	setValue: function ( array, offset ) {

		const bindings = this._bindings;

		for ( let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++ i ) {

			bindings[ i ].setValue( array, offset );

		}

	},

	bind: function () {

		const bindings = this._bindings;

		for ( let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++ i ) {

			bindings[ i ].bind();

		}

	},

	unbind: function () {

		const bindings = this._bindings;

		for ( let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++ i ) {

			bindings[ i ].unbind();

		}

	}

} );


function PropertyBinding( rootNode, path, parsedPath ) {

	this.path = path;
	this.parsedPath = parsedPath || PropertyBinding.parseTrackName( path );

	this.node = PropertyBinding.findNode( rootNode, this.parsedPath.nodeName ) || rootNode;

	this.rootNode = rootNode;

}

Object.assign( PropertyBinding, {

	Composite: Composite,

	create: function ( root, path, parsedPath ) {

		if ( ! ( root && root.isAnimationObjectGroup ) ) {

			return new PropertyBinding( root, path, parsedPath );

		} else {

			return new PropertyBinding.Composite( root, path, parsedPath );

		}

	},

	/**
	 * Replaces spaces with underscores and removes unsupported characters from
	 * node names, to ensure compatibility with parseTrackName().
	 *
	 * @param {string} name Node name to be sanitized.
	 * @return {string}
	 */
	sanitizeNodeName: function ( name ) {

		return name.replace( /\s/g, '_' ).replace( _reservedRe, '' );

	},

	parseTrackName: function ( trackName ) {

		const matches = _trackRe.exec( trackName );

		if ( ! matches ) {

			throw new Error( 'PropertyBinding: Cannot parse trackName: ' + trackName );

		}

		const results = {
			// directoryName: matches[ 1 ], // (tschw) currently unused
			nodeName: matches[ 2 ],
			objectName: matches[ 3 ],
			objectIndex: matches[ 4 ],
			propertyName: matches[ 5 ], // required
			propertyIndex: matches[ 6 ]
		};

		const lastDot = results.nodeName && results.nodeName.lastIndexOf( '.' );

		if ( lastDot !== undefined && lastDot !== - 1 ) {

			const objectName = results.nodeName.substring( lastDot + 1 );

			// Object names must be checked against an allowlist. Otherwise, there
			// is no way to parse 'foo.bar.baz': 'baz' must be a property, but
			// 'bar' could be the objectName, or part of a nodeName (which can
			// include '.' characters).
			if ( _supportedObjectNames.indexOf( objectName ) !== - 1 ) {

				results.nodeName = results.nodeName.substring( 0, lastDot );
				results.objectName = objectName;

			}

		}

		if ( results.propertyName === null || results.propertyName.length === 0 ) {

			throw new Error( 'PropertyBinding: can not parse propertyName from trackName: ' + trackName );

		}

		return results;

	},

	findNode: function ( root, nodeName ) {

		if ( ! nodeName || nodeName === '' || nodeName === '.' || nodeName === - 1 || nodeName === root.name || nodeName === root.uuid ) {

			return root;

		}

		// search into skeleton bones.
		if ( root.skeleton ) {

			const bone = root.skeleton.getBoneByName( nodeName );

			if ( bone !== undefined ) {

				return bone;

			}

		}

		// search into node subtree.
		if ( root.children ) {

			const searchNodeSubtree = function ( children ) {

				for ( let i = 0; i < children.length; i ++ ) {

					const childNode = children[ i ];

					if ( childNode.name === nodeName || childNode.uuid === nodeName ) {

						return childNode;

					}

					const result = searchNodeSubtree( childNode.children );

					if ( result ) return result;

				}

				return null;

			};

			const subTreeNode = searchNodeSubtree( root.children );

			if ( subTreeNode ) {

				return subTreeNode;

			}

		}

		return null;

	}

} );

Object.assign( PropertyBinding.prototype, { // prototype, continued

	// these are used to "bind" a nonexistent property
	_getValue_unavailable: function () {},
	_setValue_unavailable: function () {},

	BindingType: {
		Direct: 0,
		EntireArray: 1,
		ArrayElement: 2,
		HasFromToArray: 3
	},

	Versioning: {
		None: 0,
		NeedsUpdate: 1,
		MatrixWorldNeedsUpdate: 2
	},

	GetterByBindingType: [

		function getValue_direct( buffer, offset ) {

			buffer[ offset ] = this.node[ this.propertyName ];

		},

		function getValue_array( buffer, offset ) {

			const source = this.resolvedProperty;

			for ( let i = 0, n = source.length; i !== n; ++ i ) {

				buffer[ offset ++ ] = source[ i ];

			}

		},

		function getValue_arrayElement( buffer, offset ) {

			buffer[ offset ] = this.resolvedProperty[ this.propertyIndex ];

		},

		function getValue_toArray( buffer, offset ) {

			this.resolvedProperty.toArray( buffer, offset );

		}

	],

	SetterByBindingTypeAndVersioning: [

		[
			// Direct

			function setValue_direct( buffer, offset ) {

				this.targetObject[ this.propertyName ] = buffer[ offset ];

			},

			function setValue_direct_setNeedsUpdate( buffer, offset ) {

				this.targetObject[ this.propertyName ] = buffer[ offset ];
				this.targetObject.needsUpdate = true;

			},

			function setValue_direct_setMatrixWorldNeedsUpdate( buffer, offset ) {

				this.targetObject[ this.propertyName ] = buffer[ offset ];
				this.targetObject.matrixWorldNeedsUpdate = true;

			}

		], [

			// EntireArray

			function setValue_array( buffer, offset ) {

				const dest = this.resolvedProperty;

				for ( let i = 0, n = dest.length; i !== n; ++ i ) {

					dest[ i ] = buffer[ offset ++ ];

				}

			},

			function setValue_array_setNeedsUpdate( buffer, offset ) {

				const dest = this.resolvedProperty;

				for ( let i = 0, n = dest.length; i !== n; ++ i ) {

					dest[ i ] = buffer[ offset ++ ];

				}

				this.targetObject.needsUpdate = true;

			},

			function setValue_array_setMatrixWorldNeedsUpdate( buffer, offset ) {

				const dest = this.resolvedProperty;

				for ( let i = 0, n = dest.length; i !== n; ++ i ) {

					dest[ i ] = buffer[ offset ++ ];

				}

				this.targetObject.matrixWorldNeedsUpdate = true;

			}

		], [

			// ArrayElement

			function setValue_arrayElement( buffer, offset ) {

				this.resolvedProperty[ this.propertyIndex ] = buffer[ offset ];

			},

			function setValue_arrayElement_setNeedsUpdate( buffer, offset ) {

				this.resolvedProperty[ this.propertyIndex ] = buffer[ offset ];
				this.targetObject.needsUpdate = true;

			},

			function setValue_arrayElement_setMatrixWorldNeedsUpdate( buffer, offset ) {

				this.resolvedProperty[ this.propertyIndex ] = buffer[ offset ];
				this.targetObject.matrixWorldNeedsUpdate = true;

			}

		], [

			// HasToFromArray

			function setValue_fromArray( buffer, offset ) {

				this.resolvedProperty.fromArray( buffer, offset );

			},

			function setValue_fromArray_setNeedsUpdate( buffer, offset ) {

				this.resolvedProperty.fromArray( buffer, offset );
				this.targetObject.needsUpdate = true;

			},

			function setValue_fromArray_setMatrixWorldNeedsUpdate( buffer, offset ) {

				this.resolvedProperty.fromArray( buffer, offset );
				this.targetObject.matrixWorldNeedsUpdate = true;

			}

		]

	],

	getValue: function getValue_unbound( targetArray, offset ) {

		this.bind();
		this.getValue( targetArray, offset );

		// Note: This class uses a State pattern on a per-method basis:
		// 'bind' sets 'this.getValue' / 'setValue' and shadows the
		// prototype version of these methods with one that represents
		// the bound state. When the property is not found, the methods
		// become no-ops.

	},

	setValue: function getValue_unbound( sourceArray, offset ) {

		this.bind();
		this.setValue( sourceArray, offset );

	},

	// create getter / setter pair for a property in the scene graph
	bind: function () {

		let targetObject = this.node;
		const parsedPath = this.parsedPath;

		const objectName = parsedPath.objectName;
		const propertyName = parsedPath.propertyName;
		let propertyIndex = parsedPath.propertyIndex;

		if ( ! targetObject ) {

			targetObject = PropertyBinding.findNode( this.rootNode, parsedPath.nodeName ) || this.rootNode;

			this.node = targetObject;

		}

		// set fail state so we can just 'return' on error
		this.getValue = this._getValue_unavailable;
		this.setValue = this._setValue_unavailable;

		// ensure there is a value node
		if ( ! targetObject ) {

			console.error( 'THREE.PropertyBinding: Trying to update node for track: ' + this.path + ' but it wasn\'t found.' );
			return;

		}

		if ( objectName ) {

			let objectIndex = parsedPath.objectIndex;

			// special cases were we need to reach deeper into the hierarchy to get the face materials....
			switch ( objectName ) {

				case 'materials':

					if ( ! targetObject.material ) {

						console.error( 'THREE.PropertyBinding: Can not bind to material as node does not have a material.', this );
						return;

					}

					if ( ! targetObject.material.materials ) {

						console.error( 'THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.', this );
						return;

					}

					targetObject = targetObject.material.materials;

					break;

				case 'bones':

					if ( ! targetObject.skeleton ) {

						console.error( 'THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.', this );
						return;

					}

					// potential future optimization: skip this if propertyIndex is already an integer
					// and convert the integer string to a true integer.

					targetObject = targetObject.skeleton.bones;

					// support resolving morphTarget names into indices.
					for ( let i = 0; i < targetObject.length; i ++ ) {

						if ( targetObject[ i ].name === objectIndex ) {

							objectIndex = i;
							break;

						}

					}

					break;

				default:

					if ( targetObject[ objectName ] === undefined ) {

						console.error( 'THREE.PropertyBinding: Can not bind to objectName of node undefined.', this );
						return;

					}

					targetObject = targetObject[ objectName ];

			}


			if ( objectIndex !== undefined ) {

				if ( targetObject[ objectIndex ] === undefined ) {

					console.error( 'THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.', this, targetObject );
					return;

				}

				targetObject = targetObject[ objectIndex ];

			}

		}

		// resolve property
		const nodeProperty = targetObject[ propertyName ];

		if ( nodeProperty === undefined ) {

			const nodeName = parsedPath.nodeName;

			console.error( 'THREE.PropertyBinding: Trying to update property for track: ' + nodeName +
				'.' + propertyName + ' but it wasn\'t found.', targetObject );
			return;

		}

		// determine versioning scheme
		let versioning = this.Versioning.None;

		this.targetObject = targetObject;

		if ( targetObject.needsUpdate !== undefined ) { // material

			versioning = this.Versioning.NeedsUpdate;

		} else if ( targetObject.matrixWorldNeedsUpdate !== undefined ) { // node transform

			versioning = this.Versioning.MatrixWorldNeedsUpdate;

		}

		// determine how the property gets bound
		let bindingType = this.BindingType.Direct;

		if ( propertyIndex !== undefined ) {

			// access a sub element of the property array (only primitives are supported right now)

			if ( propertyName === 'morphTargetInfluences' ) {

				// potential optimization, skip this if propertyIndex is already an integer, and convert the integer string to a true integer.

				// support resolving morphTarget names into indices.
				if ( ! targetObject.geometry ) {

					console.error( 'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.', this );
					return;

				}

				if ( targetObject.geometry.isBufferGeometry ) {

					if ( ! targetObject.geometry.morphAttributes ) {

						console.error( 'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.', this );
						return;

					}

					if ( targetObject.morphTargetDictionary[ propertyIndex ] !== undefined ) {

						propertyIndex = targetObject.morphTargetDictionary[ propertyIndex ];

					}


				} else {

					console.error( 'THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.', this );
					return;

				}

			}

			bindingType = this.BindingType.ArrayElement;

			this.resolvedProperty = nodeProperty;
			this.propertyIndex = propertyIndex;

		} else if ( nodeProperty.fromArray !== undefined && nodeProperty.toArray !== undefined ) {

			// must use copy for Object3D.Euler/Quaternion

			bindingType = this.BindingType.HasFromToArray;

			this.resolvedProperty = nodeProperty;

		} else if ( Array.isArray( nodeProperty ) ) {

			bindingType = this.BindingType.EntireArray;

			this.resolvedProperty = nodeProperty;

		} else {

			this.propertyName = propertyName;

		}

		// select getter / setter
		this.getValue = this.GetterByBindingType[ bindingType ];
		this.setValue = this.SetterByBindingTypeAndVersioning[ bindingType ][ versioning ];

	},

	unbind: function () {

		this.node = null;

		// back to the prototype version of getValue / setValue
		// note: avoiding to mutate the shape of 'this' via 'delete'
		this.getValue = this._getValue_unbound;
		this.setValue = this._setValue_unbound;

	}

} );

// DECLARE ALIAS AFTER assign prototype
Object.assign( PropertyBinding.prototype, {

	// initial state of these methods that calls 'bind'
	_getValue_unbound: PropertyBinding.prototype.getValue,
	_setValue_unbound: PropertyBinding.prototype.setValue,

} );

class Uniform {

	constructor( value ) {

		if ( typeof value === 'string' ) {

			console.warn( 'THREE.Uniform: Type parameter is no longer needed.' );
			value = arguments[ 1 ];

		}

		this.value = value;

	}

	clone() {

		return new Uniform( this.value.clone === undefined ? this.value : this.value.clone() );

	}

}

function InstancedInterleavedBuffer( array, stride, meshPerAttribute ) {

	InterleavedBuffer.call( this, array, stride );

	this.meshPerAttribute = meshPerAttribute || 1;

}

InstancedInterleavedBuffer.prototype = Object.assign( Object.create( InterleavedBuffer.prototype ), {

	constructor: InstancedInterleavedBuffer,

	isInstancedInterleavedBuffer: true,

	copy: function ( source ) {

		InterleavedBuffer.prototype.copy.call( this, source );

		this.meshPerAttribute = source.meshPerAttribute;

		return this;

	},

	clone: function ( data ) {

		const ib = InterleavedBuffer.prototype.clone.call( this, data );

		ib.meshPerAttribute = this.meshPerAttribute;

		return ib;

	},

	toJSON: function ( data ) {

		const json = InterleavedBuffer.prototype.toJSON.call( this, data );

		json.isInstancedInterleavedBuffer = true;
		json.meshPerAttribute = this.meshPerAttribute;

		return json;

	}

} );

function GLBufferAttribute( buffer, type, itemSize, elementSize, count ) {

	this.buffer = buffer;
	this.type = type;
	this.itemSize = itemSize;
	this.elementSize = elementSize;
	this.count = count;

	this.version = 0;

}

Object.defineProperty( GLBufferAttribute.prototype, 'needsUpdate', {

	set: function ( value ) {

		if ( value === true ) this.version ++;

	}

} );

Object.assign( GLBufferAttribute.prototype, {

	isGLBufferAttribute: true,

	setBuffer: function ( buffer ) {

		this.buffer = buffer;

		return this;

	},

	setType: function ( type, elementSize ) {

		this.type = type;
		this.elementSize = elementSize;

		return this;

	},

	setItemSize: function ( itemSize ) {

		this.itemSize = itemSize;

		return this;

	},

	setCount: function ( count ) {

		this.count = count;

		return this;

	},

} );

function Raycaster( origin, direction, near = 0, far = Infinity ) {

	this.ray = new Ray( origin, direction );
	// direction is assumed to be normalized (for accurate distance calculations)

	this.near = near;
	this.far = far;
	this.camera = null;
	this.layers = new Layers();

	this.params = {
		Mesh: {},
		Line: { threshold: 1 },
		LOD: {},
		Points: { threshold: 1 },
		Sprite: {}
	};

	Object.defineProperties( this.params, {
		PointCloud: {
			get: function () {

				console.warn( 'THREE.Raycaster: params.PointCloud has been renamed to params.Points.' );
				return this.Points;

			}
		}
	} );

}

function ascSort( a, b ) {

	return a.distance - b.distance;

}

function intersectObject( object, raycaster, intersects, recursive ) {

	if ( object.layers.test( raycaster.layers ) ) {

		object.raycast( raycaster, intersects );

	}

	if ( recursive === true ) {

		const children = object.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			intersectObject( children[ i ], raycaster, intersects, true );

		}

	}

}

Object.assign( Raycaster.prototype, {

	set: function ( origin, direction ) {

		// direction is assumed to be normalized (for accurate distance calculations)

		this.ray.set( origin, direction );

	},

	setFromCamera: function ( coords, camera ) {

		if ( camera && camera.isPerspectiveCamera ) {

			this.ray.origin.setFromMatrixPosition( camera.matrixWorld );
			this.ray.direction.set( coords.x, coords.y, 0.5 ).unproject( camera ).sub( this.ray.origin ).normalize();
			this.camera = camera;

		} else if ( camera && camera.isOrthographicCamera ) {

			this.ray.origin.set( coords.x, coords.y, ( camera.near + camera.far ) / ( camera.near - camera.far ) ).unproject( camera ); // set origin in plane of camera
			this.ray.direction.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );
			this.camera = camera;

		} else {

			console.error( 'THREE.Raycaster: Unsupported camera type: ' + camera.type );

		}

	},

	intersectObject: function ( object, recursive = false, intersects = [] ) {

		intersectObject( object, this, intersects, recursive );

		intersects.sort( ascSort );

		return intersects;

	},

	intersectObjects: function ( objects, recursive = false, intersects = [] ) {

		for ( let i = 0, l = objects.length; i < l; i ++ ) {

			intersectObject( objects[ i ], this, intersects, recursive );

		}

		intersects.sort( ascSort );

		return intersects;

	}

} );

/**
 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
 *
 * The polar angle (phi) is measured from the positive y-axis. The positive y-axis is up.
 * The azimuthal angle (theta) is measured from the positive z-axis.
 */

class Spherical {

	constructor( radius = 1, phi = 0, theta = 0 ) {

		this.radius = radius;
		this.phi = phi; // polar angle
		this.theta = theta; // azimuthal angle

		return this;

	}

	set( radius, phi, theta ) {

		this.radius = radius;
		this.phi = phi;
		this.theta = theta;

		return this;

	}

	copy( other ) {

		this.radius = other.radius;
		this.phi = other.phi;
		this.theta = other.theta;

		return this;

	}

	// restrict phi to be betwee EPS and PI-EPS
	makeSafe() {

		const EPS = 0.000001;
		this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );

		return this;

	}

	setFromVector3( v ) {

		return this.setFromCartesianCoords( v.x, v.y, v.z );

	}

	setFromCartesianCoords( x, y, z ) {

		this.radius = Math.sqrt( x * x + y * y + z * z );

		if ( this.radius === 0 ) {

			this.theta = 0;
			this.phi = 0;

		} else {

			this.theta = Math.atan2( x, z );
			this.phi = Math.acos( MathUtils.clamp( y / this.radius, - 1, 1 ) );

		}

		return this;

	}

	clone() {

		return new this.constructor().copy( this );

	}

}

function ImmediateRenderObject( material ) {

	Object3D.call( this );

	this.material = material;
	this.render = function ( /* renderCallback */ ) {};

	this.hasPositions = false;
	this.hasNormals = false;
	this.hasColors = false;
	this.hasUvs = false;

	this.positionArray = null;
	this.normalArray = null;
	this.colorArray = null;
	this.uvArray = null;

	this.count = 0;

}

ImmediateRenderObject.prototype = Object.create( Object3D.prototype );
ImmediateRenderObject.prototype.constructor = ImmediateRenderObject;

ImmediateRenderObject.prototype.isImmediateRenderObject = true;

class AxesHelper extends LineSegments {

	constructor( size = 1 ) {

		const vertices = [
			0, 0, 0,	size, 0, 0,
			0, 0, 0,	0, size, 0,
			0, 0, 0,	0, 0, size
		];

		const colors = [
			1, 0, 0,	1, 0.6, 0,
			0, 1, 0,	0.6, 1, 0,
			0, 0, 1,	0, 0.6, 1
		];

		const geometry = new BufferGeometry();
		geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

		const material = new LineBasicMaterial( { vertexColors: true, toneMapped: false } );

		super( geometry, material );

		this.type = 'AxesHelper';

	}

}

const backgroundMaterial = new MeshBasicMaterial( {
	side: BackSide,
	depthWrite: false,
	depthTest: false,
} );
new Mesh( new BoxGeometry(), backgroundMaterial );

//

Curve.create = function ( construct, getPoint ) {

	console.log( 'THREE.Curve.create() has been deprecated' );

	construct.prototype = Object.create( Curve.prototype );
	construct.prototype.constructor = construct;
	construct.prototype.getPoint = getPoint;

	return construct;

};

//

Loader.prototype.extractUrlBase = function ( url ) {

	console.warn( 'THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead.' );
	return LoaderUtils.extractUrlBase( url );

};

Loader.Handlers = {

	add: function ( /* regex, loader */ ) {

		console.error( 'THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.' );

	},

	get: function ( /* file */ ) {

		console.error( 'THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.' );

	}

};

//

Box3.prototype.center = function ( optionalTarget ) {

	console.warn( 'THREE.Box3: .center() has been renamed to .getCenter().' );
	return this.getCenter( optionalTarget );

};

Box3.prototype.empty = function () {

	console.warn( 'THREE.Box3: .empty() has been renamed to .isEmpty().' );
	return this.isEmpty();

};

Box3.prototype.isIntersectionBox = function ( box ) {

	console.warn( 'THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().' );
	return this.intersectsBox( box );

};

Box3.prototype.isIntersectionSphere = function ( sphere ) {

	console.warn( 'THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().' );
	return this.intersectsSphere( sphere );

};

Box3.prototype.size = function ( optionalTarget ) {

	console.warn( 'THREE.Box3: .size() has been renamed to .getSize().' );
	return this.getSize( optionalTarget );

};

//

Sphere.prototype.empty = function () {

	console.warn( 'THREE.Sphere: .empty() has been renamed to .isEmpty().' );
	return this.isEmpty();

};

//

Frustum.prototype.setFromMatrix = function ( m ) {

	console.warn( 'THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix().' );
	return this.setFromProjectionMatrix( m );

};

//

MathUtils.random16 = function () {

	console.warn( 'THREE.Math: .random16() has been deprecated. Use Math.random() instead.' );
	return Math.random();

};

MathUtils.nearestPowerOfTwo = function ( value ) {

	console.warn( 'THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo().' );
	return MathUtils.floorPowerOfTwo( value );

};

MathUtils.nextPowerOfTwo = function ( value ) {

	console.warn( 'THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo().' );
	return MathUtils.ceilPowerOfTwo( value );

};

//

Matrix3.prototype.flattenToArrayOffset = function ( array, offset ) {

	console.warn( 'THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.' );
	return this.toArray( array, offset );

};

Matrix3.prototype.multiplyVector3 = function ( vector ) {

	console.warn( 'THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.' );
	return vector.applyMatrix3( this );

};

Matrix3.prototype.multiplyVector3Array = function ( /* a */ ) {

	console.error( 'THREE.Matrix3: .multiplyVector3Array() has been removed.' );

};

Matrix3.prototype.applyToBufferAttribute = function ( attribute ) {

	console.warn( 'THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead.' );
	return attribute.applyMatrix3( this );

};

Matrix3.prototype.applyToVector3Array = function ( /* array, offset, length */ ) {

	console.error( 'THREE.Matrix3: .applyToVector3Array() has been removed.' );

};

Matrix3.prototype.getInverse = function ( matrix ) {

	console.warn( 'THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead.' );
	return this.copy( matrix ).invert();

};

//

Matrix4.prototype.extractPosition = function ( m ) {

	console.warn( 'THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().' );
	return this.copyPosition( m );

};

Matrix4.prototype.flattenToArrayOffset = function ( array, offset ) {

	console.warn( 'THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.' );
	return this.toArray( array, offset );

};

Matrix4.prototype.getPosition = function () {

	console.warn( 'THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.' );
	return new Vector3().setFromMatrixColumn( this, 3 );

};

Matrix4.prototype.setRotationFromQuaternion = function ( q ) {

	console.warn( 'THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().' );
	return this.makeRotationFromQuaternion( q );

};

Matrix4.prototype.multiplyToArray = function () {

	console.warn( 'THREE.Matrix4: .multiplyToArray() has been removed.' );

};

Matrix4.prototype.multiplyVector3 = function ( vector ) {

	console.warn( 'THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
	return vector.applyMatrix4( this );

};

Matrix4.prototype.multiplyVector4 = function ( vector ) {

	console.warn( 'THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
	return vector.applyMatrix4( this );

};

Matrix4.prototype.multiplyVector3Array = function ( /* a */ ) {

	console.error( 'THREE.Matrix4: .multiplyVector3Array() has been removed.' );

};

Matrix4.prototype.rotateAxis = function ( v ) {

	console.warn( 'THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.' );
	v.transformDirection( this );

};

Matrix4.prototype.crossVector = function ( vector ) {

	console.warn( 'THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
	return vector.applyMatrix4( this );

};

Matrix4.prototype.translate = function () {

	console.error( 'THREE.Matrix4: .translate() has been removed.' );

};

Matrix4.prototype.rotateX = function () {

	console.error( 'THREE.Matrix4: .rotateX() has been removed.' );

};

Matrix4.prototype.rotateY = function () {

	console.error( 'THREE.Matrix4: .rotateY() has been removed.' );

};

Matrix4.prototype.rotateZ = function () {

	console.error( 'THREE.Matrix4: .rotateZ() has been removed.' );

};

Matrix4.prototype.rotateByAxis = function () {

	console.error( 'THREE.Matrix4: .rotateByAxis() has been removed.' );

};

Matrix4.prototype.applyToBufferAttribute = function ( attribute ) {

	console.warn( 'THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead.' );
	return attribute.applyMatrix4( this );

};

Matrix4.prototype.applyToVector3Array = function ( /* array, offset, length */ ) {

	console.error( 'THREE.Matrix4: .applyToVector3Array() has been removed.' );

};

Matrix4.prototype.makeFrustum = function ( left, right, bottom, top, near, far ) {

	console.warn( 'THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead.' );
	return this.makePerspective( left, right, top, bottom, near, far );

};

Matrix4.prototype.getInverse = function ( matrix ) {

	console.warn( 'THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead.' );
	return this.copy( matrix ).invert();

};

//

Plane.prototype.isIntersectionLine = function ( line ) {

	console.warn( 'THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().' );
	return this.intersectsLine( line );

};

//

Quaternion.prototype.multiplyVector3 = function ( vector ) {

	console.warn( 'THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.' );
	return vector.applyQuaternion( this );

};

Quaternion.prototype.inverse = function ( ) {

	console.warn( 'THREE.Quaternion: .inverse() has been renamed to invert().' );
	return this.invert();

};

//

Ray.prototype.isIntersectionBox = function ( box ) {

	console.warn( 'THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().' );
	return this.intersectsBox( box );

};

Ray.prototype.isIntersectionPlane = function ( plane ) {

	console.warn( 'THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().' );
	return this.intersectsPlane( plane );

};

Ray.prototype.isIntersectionSphere = function ( sphere ) {

	console.warn( 'THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().' );
	return this.intersectsSphere( sphere );

};

//

Triangle.prototype.area = function () {

	console.warn( 'THREE.Triangle: .area() has been renamed to .getArea().' );
	return this.getArea();

};

Triangle.prototype.barycoordFromPoint = function ( point, target ) {

	console.warn( 'THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().' );
	return this.getBarycoord( point, target );

};

Triangle.prototype.midpoint = function ( target ) {

	console.warn( 'THREE.Triangle: .midpoint() has been renamed to .getMidpoint().' );
	return this.getMidpoint( target );

};

Triangle.prototypenormal = function ( target ) {

	console.warn( 'THREE.Triangle: .normal() has been renamed to .getNormal().' );
	return this.getNormal( target );

};

Triangle.prototype.plane = function ( target ) {

	console.warn( 'THREE.Triangle: .plane() has been renamed to .getPlane().' );
	return this.getPlane( target );

};

Triangle.barycoordFromPoint = function ( point, a, b, c, target ) {

	console.warn( 'THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().' );
	return Triangle.getBarycoord( point, a, b, c, target );

};

Triangle.normal = function ( a, b, c, target ) {

	console.warn( 'THREE.Triangle: .normal() has been renamed to .getNormal().' );
	return Triangle.getNormal( a, b, c, target );

};

//

Vector2.prototype.fromAttribute = function ( attribute, index, offset ) {

	console.warn( 'THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute().' );
	return this.fromBufferAttribute( attribute, index, offset );

};

Vector2.prototype.distanceToManhattan = function ( v ) {

	console.warn( 'THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo().' );
	return this.manhattanDistanceTo( v );

};

Vector2.prototype.lengthManhattan = function () {

	console.warn( 'THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength().' );
	return this.manhattanLength();

};

//

Vector3.prototype.setEulerFromRotationMatrix = function () {

	console.error( 'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.' );

};

Vector3.prototype.setEulerFromQuaternion = function () {

	console.error( 'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.' );

};

Vector3.prototype.getPositionFromMatrix = function ( m ) {

	console.warn( 'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().' );
	return this.setFromMatrixPosition( m );

};

Vector3.prototype.getScaleFromMatrix = function ( m ) {

	console.warn( 'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().' );
	return this.setFromMatrixScale( m );

};

Vector3.prototype.getColumnFromMatrix = function ( index, matrix ) {

	console.warn( 'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().' );
	return this.setFromMatrixColumn( matrix, index );

};

Vector3.prototype.applyProjection = function ( m ) {

	console.warn( 'THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead.' );
	return this.applyMatrix4( m );

};

Vector3.prototype.fromAttribute = function ( attribute, index, offset ) {

	console.warn( 'THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute().' );
	return this.fromBufferAttribute( attribute, index, offset );

};

Vector3.prototype.distanceToManhattan = function ( v ) {

	console.warn( 'THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo().' );
	return this.manhattanDistanceTo( v );

};

Vector3.prototype.lengthManhattan = function () {

	console.warn( 'THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength().' );
	return this.manhattanLength();

};

//

Vector4.prototype.fromAttribute = function ( attribute, index, offset ) {

	console.warn( 'THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute().' );
	return this.fromBufferAttribute( attribute, index, offset );

};

Vector4.prototype.lengthManhattan = function () {

	console.warn( 'THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength().' );
	return this.manhattanLength();

};

//

Object3D.prototype.getChildByName = function ( name ) {

	console.warn( 'THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().' );
	return this.getObjectByName( name );

};

Object3D.prototype.renderDepth = function () {

	console.warn( 'THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.' );

};

Object3D.prototype.translate = function ( distance, axis ) {

	console.warn( 'THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.' );
	return this.translateOnAxis( axis, distance );

};

Object3D.prototype.getWorldRotation = function () {

	console.error( 'THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.' );

};

Object3D.prototype.applyMatrix = function ( matrix ) {

	console.warn( 'THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4().' );
	return this.applyMatrix4( matrix );

};

Object.defineProperties( Object3D.prototype, {

	eulerOrder: {
		get: function () {

			console.warn( 'THREE.Object3D: .eulerOrder is now .rotation.order.' );
			return this.rotation.order;

		},
		set: function ( value ) {

			console.warn( 'THREE.Object3D: .eulerOrder is now .rotation.order.' );
			this.rotation.order = value;

		}
	},
	useQuaternion: {
		get: function () {

			console.warn( 'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.' );

		},
		set: function () {

			console.warn( 'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.' );

		}
	}

} );

Mesh.prototype.setDrawMode = function () {

	console.error( 'THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.' );

};

Object.defineProperties( Mesh.prototype, {

	drawMode: {
		get: function () {

			console.error( 'THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode.' );
			return TrianglesDrawMode;

		},
		set: function () {

			console.error( 'THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.' );

		}
	}

} );

Object.defineProperties( LOD.prototype, {

	objects: {
		get: function () {

			console.warn( 'THREE.LOD: .objects has been renamed to .levels.' );
			return this.levels;

		}
	}

} );

Object.defineProperty( Skeleton.prototype, 'useVertexTexture', {

	get: function () {

		console.warn( 'THREE.Skeleton: useVertexTexture has been removed.' );

	},
	set: function () {

		console.warn( 'THREE.Skeleton: useVertexTexture has been removed.' );

	}

} );

SkinnedMesh.prototype.initBones = function () {

	console.error( 'THREE.SkinnedMesh: initBones() has been removed.' );

};

Object.defineProperty( Curve.prototype, '__arcLengthDivisions', {

	get: function () {

		console.warn( 'THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.' );
		return this.arcLengthDivisions;

	},
	set: function ( value ) {

		console.warn( 'THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.' );
		this.arcLengthDivisions = value;

	}

} );

//

PerspectiveCamera.prototype.setLens = function ( focalLength, filmGauge ) {

	console.warn( 'THREE.PerspectiveCamera.setLens is deprecated. ' +
			'Use .setFocalLength and .filmGauge for a photographic setup.' );

	if ( filmGauge !== undefined ) this.filmGauge = filmGauge;
	this.setFocalLength( focalLength );

};

//

Object.defineProperties( Light.prototype, {
	onlyShadow: {
		set: function () {

			console.warn( 'THREE.Light: .onlyShadow has been removed.' );

		}
	},
	shadowCameraFov: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowCameraFov is now .shadow.camera.fov.' );
			this.shadow.camera.fov = value;

		}
	},
	shadowCameraLeft: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowCameraLeft is now .shadow.camera.left.' );
			this.shadow.camera.left = value;

		}
	},
	shadowCameraRight: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowCameraRight is now .shadow.camera.right.' );
			this.shadow.camera.right = value;

		}
	},
	shadowCameraTop: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowCameraTop is now .shadow.camera.top.' );
			this.shadow.camera.top = value;

		}
	},
	shadowCameraBottom: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.' );
			this.shadow.camera.bottom = value;

		}
	},
	shadowCameraNear: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowCameraNear is now .shadow.camera.near.' );
			this.shadow.camera.near = value;

		}
	},
	shadowCameraFar: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowCameraFar is now .shadow.camera.far.' );
			this.shadow.camera.far = value;

		}
	},
	shadowCameraVisible: {
		set: function () {

			console.warn( 'THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.' );

		}
	},
	shadowBias: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowBias is now .shadow.bias.' );
			this.shadow.bias = value;

		}
	},
	shadowDarkness: {
		set: function () {

			console.warn( 'THREE.Light: .shadowDarkness has been removed.' );

		}
	},
	shadowMapWidth: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.' );
			this.shadow.mapSize.width = value;

		}
	},
	shadowMapHeight: {
		set: function ( value ) {

			console.warn( 'THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.' );
			this.shadow.mapSize.height = value;

		}
	}
} );

//

Object.defineProperties( BufferAttribute.prototype, {

	length: {
		get: function () {

			console.warn( 'THREE.BufferAttribute: .length has been deprecated. Use .count instead.' );
			return this.array.length;

		}
	},
	dynamic: {
		get: function () {

			console.warn( 'THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead.' );
			return this.usage === DynamicDrawUsage;

		},
		set: function ( /* value */ ) {

			console.warn( 'THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead.' );
			this.setUsage( DynamicDrawUsage );

		}
	}

} );

BufferAttribute.prototype.setDynamic = function ( value ) {

	console.warn( 'THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead.' );
	this.setUsage( value === true ? DynamicDrawUsage : StaticDrawUsage );
	return this;

};

BufferAttribute.prototype.copyIndicesArray = function ( /* indices */ ) {

	console.error( 'THREE.BufferAttribute: .copyIndicesArray() has been removed.' );

},

BufferAttribute.prototype.setArray = function ( /* array */ ) {

	console.error( 'THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers' );

};

//

BufferGeometry.prototype.addIndex = function ( index ) {

	console.warn( 'THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().' );
	this.setIndex( index );

};

BufferGeometry.prototype.addAttribute = function ( name, attribute ) {

	console.warn( 'THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute().' );

	if ( ! ( attribute && attribute.isBufferAttribute ) && ! ( attribute && attribute.isInterleavedBufferAttribute ) ) {

		console.warn( 'THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).' );

		return this.setAttribute( name, new BufferAttribute( arguments[ 1 ], arguments[ 2 ] ) );

	}

	if ( name === 'index' ) {

		console.warn( 'THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.' );
		this.setIndex( attribute );

		return this;

	}

	return this.setAttribute( name, attribute );

};

BufferGeometry.prototype.addDrawCall = function ( start, count, indexOffset ) {

	if ( indexOffset !== undefined ) {

		console.warn( 'THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.' );

	}

	console.warn( 'THREE.BufferGeometry: .addDrawCall() is now .addGroup().' );
	this.addGroup( start, count );

};

BufferGeometry.prototype.clearDrawCalls = function () {

	console.warn( 'THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().' );
	this.clearGroups();

};

BufferGeometry.prototype.computeOffsets = function () {

	console.warn( 'THREE.BufferGeometry: .computeOffsets() has been removed.' );

};

BufferGeometry.prototype.removeAttribute = function ( name ) {

	console.warn( 'THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute().' );

	return this.deleteAttribute( name );

};

BufferGeometry.prototype.applyMatrix = function ( matrix ) {

	console.warn( 'THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4().' );
	return this.applyMatrix4( matrix );

};

Object.defineProperties( BufferGeometry.prototype, {

	drawcalls: {
		get: function () {

			console.error( 'THREE.BufferGeometry: .drawcalls has been renamed to .groups.' );
			return this.groups;

		}
	},
	offsets: {
		get: function () {

			console.warn( 'THREE.BufferGeometry: .offsets has been renamed to .groups.' );
			return this.groups;

		}
	}

} );

Object.defineProperties( InstancedBufferGeometry.prototype, {

	maxInstancedCount: {
		get: function () {

			console.warn( 'THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount.' );
			return this.instanceCount;

		},
		set: function ( value ) {

			console.warn( 'THREE.InstancedBufferGeometry: .maxInstancedCount has been renamed to .instanceCount.' );
			this.instanceCount = value;

		}
	}

} );

Object.defineProperties( Raycaster.prototype, {

	linePrecision: {
		get: function () {

			console.warn( 'THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead.' );
			return this.params.Line.threshold;

		},
		set: function ( value ) {

			console.warn( 'THREE.Raycaster: .linePrecision has been deprecated. Use .params.Line.threshold instead.' );
			this.params.Line.threshold = value;

		}
	}

} );

Object.defineProperties( InterleavedBuffer.prototype, {

	dynamic: {
		get: function () {

			console.warn( 'THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead.' );
			return this.usage === DynamicDrawUsage;

		},
		set: function ( value ) {

			console.warn( 'THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead.' );
			this.setUsage( value );

		}
	}

} );

InterleavedBuffer.prototype.setDynamic = function ( value ) {

	console.warn( 'THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead.' );
	this.setUsage( value === true ? DynamicDrawUsage : StaticDrawUsage );
	return this;

};

InterleavedBuffer.prototype.setArray = function ( /* array */ ) {

	console.error( 'THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers' );

};

//

Scene.prototype.dispose = function () {

	console.error( 'THREE.Scene: .dispose() has been removed.' );

};

//

Object.defineProperties( Uniform.prototype, {

	dynamic: {
		set: function () {

			console.warn( 'THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.' );

		}
	},
	onUpdate: {
		value: function () {

			console.warn( 'THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead.' );
			return this;

		}
	}

} );

//

Object.defineProperties( Material.prototype, {

	wrapAround: {
		get: function () {

			console.warn( 'THREE.Material: .wrapAround has been removed.' );

		},
		set: function () {

			console.warn( 'THREE.Material: .wrapAround has been removed.' );

		}
	},

	overdraw: {
		get: function () {

			console.warn( 'THREE.Material: .overdraw has been removed.' );

		},
		set: function () {

			console.warn( 'THREE.Material: .overdraw has been removed.' );

		}
	},

	wrapRGB: {
		get: function () {

			console.warn( 'THREE.Material: .wrapRGB has been removed.' );
			return new Color();

		}
	},

	shading: {
		get: function () {

			console.error( 'THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.' );

		},
		set: function ( value ) {

			console.warn( 'THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.' );
			this.flatShading = ( value === FlatShading );

		}
	},

	stencilMask: {
		get: function () {

			console.warn( 'THREE.' + this.type + ': .stencilMask has been removed. Use .stencilFuncMask instead.' );
			return this.stencilFuncMask;

		},
		set: function ( value ) {

			console.warn( 'THREE.' + this.type + ': .stencilMask has been removed. Use .stencilFuncMask instead.' );
			this.stencilFuncMask = value;

		}
	}

} );

Object.defineProperties( MeshPhongMaterial.prototype, {

	metal: {
		get: function () {

			console.warn( 'THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.' );
			return false;

		},
		set: function () {

			console.warn( 'THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead' );

		}
	}

} );

Object.defineProperties( MeshPhysicalMaterial.prototype, {

	transparency: {
		get: function () {

			console.warn( 'THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission.' );
			return this.transmission;

		},
		set: function ( value ) {

			console.warn( 'THREE.MeshPhysicalMaterial: .transparency has been renamed to .transmission.' );
			this.transmission = value;

		}
	}

} );

Object.defineProperties( ShaderMaterial.prototype, {

	derivatives: {
		get: function () {

			console.warn( 'THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.' );
			return this.extensions.derivatives;

		},
		set: function ( value ) {

			console.warn( 'THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.' );
			this.extensions.derivatives = value;

		}
	}

} );

//

WebGLRenderer.prototype.clearTarget = function ( renderTarget, color, depth, stencil ) {

	console.warn( 'THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead.' );
	this.setRenderTarget( renderTarget );
	this.clear( color, depth, stencil );

};

WebGLRenderer.prototype.animate = function ( callback ) {

	console.warn( 'THREE.WebGLRenderer: .animate() is now .setAnimationLoop().' );
	this.setAnimationLoop( callback );

};

WebGLRenderer.prototype.getCurrentRenderTarget = function () {

	console.warn( 'THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget().' );
	return this.getRenderTarget();

};

WebGLRenderer.prototype.getMaxAnisotropy = function () {

	console.warn( 'THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy().' );
	return this.capabilities.getMaxAnisotropy();

};

WebGLRenderer.prototype.getPrecision = function () {

	console.warn( 'THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision.' );
	return this.capabilities.precision;

};

WebGLRenderer.prototype.resetGLState = function () {

	console.warn( 'THREE.WebGLRenderer: .resetGLState() is now .state.reset().' );
	return this.state.reset();

};

WebGLRenderer.prototype.supportsFloatTextures = function () {

	console.warn( 'THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( \'OES_texture_float\' ).' );
	return this.extensions.get( 'OES_texture_float' );

};

WebGLRenderer.prototype.supportsHalfFloatTextures = function () {

	console.warn( 'THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( \'OES_texture_half_float\' ).' );
	return this.extensions.get( 'OES_texture_half_float' );

};

WebGLRenderer.prototype.supportsStandardDerivatives = function () {

	console.warn( 'THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( \'OES_standard_derivatives\' ).' );
	return this.extensions.get( 'OES_standard_derivatives' );

};

WebGLRenderer.prototype.supportsCompressedTextureS3TC = function () {

	console.warn( 'THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( \'WEBGL_compressed_texture_s3tc\' ).' );
	return this.extensions.get( 'WEBGL_compressed_texture_s3tc' );

};

WebGLRenderer.prototype.supportsCompressedTexturePVRTC = function () {

	console.warn( 'THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( \'WEBGL_compressed_texture_pvrtc\' ).' );
	return this.extensions.get( 'WEBGL_compressed_texture_pvrtc' );

};

WebGLRenderer.prototype.supportsBlendMinMax = function () {

	console.warn( 'THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( \'EXT_blend_minmax\' ).' );
	return this.extensions.get( 'EXT_blend_minmax' );

};

WebGLRenderer.prototype.supportsVertexTextures = function () {

	console.warn( 'THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures.' );
	return this.capabilities.vertexTextures;

};

WebGLRenderer.prototype.supportsInstancedArrays = function () {

	console.warn( 'THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( \'ANGLE_instanced_arrays\' ).' );
	return this.extensions.get( 'ANGLE_instanced_arrays' );

};

WebGLRenderer.prototype.enableScissorTest = function ( boolean ) {

	console.warn( 'THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().' );
	this.setScissorTest( boolean );

};

WebGLRenderer.prototype.initMaterial = function () {

	console.warn( 'THREE.WebGLRenderer: .initMaterial() has been removed.' );

};

WebGLRenderer.prototype.addPrePlugin = function () {

	console.warn( 'THREE.WebGLRenderer: .addPrePlugin() has been removed.' );

};

WebGLRenderer.prototype.addPostPlugin = function () {

	console.warn( 'THREE.WebGLRenderer: .addPostPlugin() has been removed.' );

};

WebGLRenderer.prototype.updateShadowMap = function () {

	console.warn( 'THREE.WebGLRenderer: .updateShadowMap() has been removed.' );

};

WebGLRenderer.prototype.setFaceCulling = function () {

	console.warn( 'THREE.WebGLRenderer: .setFaceCulling() has been removed.' );

};

WebGLRenderer.prototype.allocTextureUnit = function () {

	console.warn( 'THREE.WebGLRenderer: .allocTextureUnit() has been removed.' );

};

WebGLRenderer.prototype.setTexture = function () {

	console.warn( 'THREE.WebGLRenderer: .setTexture() has been removed.' );

};

WebGLRenderer.prototype.setTexture2D = function () {

	console.warn( 'THREE.WebGLRenderer: .setTexture2D() has been removed.' );

};

WebGLRenderer.prototype.setTextureCube = function () {

	console.warn( 'THREE.WebGLRenderer: .setTextureCube() has been removed.' );

};

WebGLRenderer.prototype.getActiveMipMapLevel = function () {

	console.warn( 'THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel().' );
	return this.getActiveMipmapLevel();

};

Object.defineProperties( WebGLRenderer.prototype, {

	shadowMapEnabled: {
		get: function () {

			return this.shadowMap.enabled;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.' );
			this.shadowMap.enabled = value;

		}
	},
	shadowMapType: {
		get: function () {

			return this.shadowMap.type;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.' );
			this.shadowMap.type = value;

		}
	},
	shadowMapCullFace: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.' );
			return undefined;

		},
		set: function ( /* value */ ) {

			console.warn( 'THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.' );

		}
	},
	context: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .context has been removed. Use .getContext() instead.' );
			return this.getContext();

		}
	},
	vr: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .vr has been renamed to .xr' );
			return this.xr;

		}
	},
	gammaInput: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.' );
			return false;

		},
		set: function () {

			console.warn( 'THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.' );

		}
	},
	gammaOutput: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead.' );
			return false;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead.' );
			this.outputEncoding = ( value === true ) ? sRGBEncoding : LinearEncoding;

		}
	},
	toneMappingWhitePoint: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.' );
			return 1.0;

		},
		set: function () {

			console.warn( 'THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.' );

		}
	},

} );

Object.defineProperties( WebGLShadowMap.prototype, {

	cullFace: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.' );
			return undefined;

		},
		set: function ( /* cullFace */ ) {

			console.warn( 'THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.' );

		}
	},
	renderReverseSided: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.' );
			return undefined;

		},
		set: function () {

			console.warn( 'THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.' );

		}
	},
	renderSingleSided: {
		get: function () {

			console.warn( 'THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.' );
			return undefined;

		},
		set: function () {

			console.warn( 'THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.' );

		}
	}

} );

//

Object.defineProperties( WebGLRenderTarget.prototype, {

	wrapS: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.' );
			return this.texture.wrapS;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.' );
			this.texture.wrapS = value;

		}
	},
	wrapT: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.' );
			return this.texture.wrapT;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.' );
			this.texture.wrapT = value;

		}
	},
	magFilter: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.' );
			return this.texture.magFilter;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.' );
			this.texture.magFilter = value;

		}
	},
	minFilter: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.' );
			return this.texture.minFilter;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.' );
			this.texture.minFilter = value;

		}
	},
	anisotropy: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.' );
			return this.texture.anisotropy;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.' );
			this.texture.anisotropy = value;

		}
	},
	offset: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .offset is now .texture.offset.' );
			return this.texture.offset;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .offset is now .texture.offset.' );
			this.texture.offset = value;

		}
	},
	repeat: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .repeat is now .texture.repeat.' );
			return this.texture.repeat;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .repeat is now .texture.repeat.' );
			this.texture.repeat = value;

		}
	},
	format: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .format is now .texture.format.' );
			return this.texture.format;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .format is now .texture.format.' );
			this.texture.format = value;

		}
	},
	type: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .type is now .texture.type.' );
			return this.texture.type;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .type is now .texture.type.' );
			this.texture.type = value;

		}
	},
	generateMipmaps: {
		get: function () {

			console.warn( 'THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.' );
			return this.texture.generateMipmaps;

		},
		set: function ( value ) {

			console.warn( 'THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.' );
			this.texture.generateMipmaps = value;

		}
	}

} );

//

Object.defineProperties( Audio.prototype, {

	load: {
		value: function ( file ) {

			console.warn( 'THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.' );
			const scope = this;
			const audioLoader = new AudioLoader();
			audioLoader.load( file, function ( buffer ) {

				scope.setBuffer( buffer );

			} );
			return this;

		}
	},
	startTime: {
		set: function () {

			console.warn( 'THREE.Audio: .startTime is now .play( delay ).' );

		}
	}

} );

//

CubeCamera.prototype.updateCubeMap = function ( renderer, scene ) {

	console.warn( 'THREE.CubeCamera: .updateCubeMap() is now .update().' );
	return this.update( renderer, scene );

};

CubeCamera.prototype.clear = function ( renderer, color, depth, stencil ) {

	console.warn( 'THREE.CubeCamera: .clear() is now .renderTarget.clear().' );
	return this.renderTarget.clear( renderer, color, depth, stencil );

};

ImageUtils.crossOrigin = undefined;

ImageUtils.loadTexture = function ( url, mapping, onLoad, onError ) {

	console.warn( 'THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.' );

	const loader = new TextureLoader();
	loader.setCrossOrigin( this.crossOrigin );

	const texture = loader.load( url, onLoad, undefined, onError );

	if ( mapping ) texture.mapping = mapping;

	return texture;

};

ImageUtils.loadTextureCube = function ( urls, mapping, onLoad, onError ) {

	console.warn( 'THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.' );

	const loader = new CubeTextureLoader();
	loader.setCrossOrigin( this.crossOrigin );

	const texture = loader.load( urls, onLoad, undefined, onError );

	if ( mapping ) texture.mapping = mapping;

	return texture;

};

ImageUtils.loadCompressedTexture = function () {

	console.error( 'THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.' );

};

ImageUtils.loadCompressedTextureCube = function () {

	console.error( 'THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.' );

};

if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

	/* eslint-disable no-undef */
	__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'register', { detail: {
		revision: REVISION,
	} } ) );
	/* eslint-enable no-undef */

}

if ( typeof window !== 'undefined' ) {

	if ( window.__THREE__ ) {

		console.warn( 'WARNING: Multiple instances of Three.js being imported.' );

	} else {

		window.__THREE__ = REVISION;

	}

}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var alea = createCommonjsModule(function (module) {
// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; };
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = String(data);
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.alea = impl;
}

})(
  commonjsGlobal,
  module,    // present in node.js
  (typeof undefined) == 'function'    // present with an AMD loader
);
});

var xor128 = createCommonjsModule(function (module) {
// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor128 = impl;
}

})(
  commonjsGlobal,
  module,    // present in node.js
  (typeof undefined) == 'function'    // present with an AMD loader
);
});

var xorwow = createCommonjsModule(function (module) {
// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorwow = impl;
}

})(
  commonjsGlobal,
  module,    // present in node.js
  (typeof undefined) == 'function'    // present with an AMD loader
);
});

var xorshift7 = createCommonjsModule(function (module) {
// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) X[7] = -1;

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorshift7 = impl;
}

})(
  commonjsGlobal,
  module,    // present in node.js
  (typeof undefined) == 'function'    // present with an AMD loader
);
});

var xor4096 = createCommonjsModule(function (module) {
// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
}
function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor4096 = impl;
}

})(
  commonjsGlobal,                                     // window object or global
  module,    // present in node.js
  (typeof undefined) == 'function'    // present with an AMD loader
);
});

var tychei = createCommonjsModule(function (module) {
// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
}
function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.tychei = impl;
}

})(
  commonjsGlobal,
  module,    // present in node.js
  (typeof undefined) == 'function'    // present with an AMD loader
);
});

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': _nodeResolve_empty
});

var require$$0 = getCjsExportFromNamespace(_nodeResolve_empty$1);

var seedrandom$1 = createCommonjsModule(function (module) {
/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

var width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; };
  prng.quick = function() { return arc4.g(4) / 0x100000000; };
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); };
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
}
//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if (module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require$$0;
  } catch (ex) {}
} else {
  // When included as a plain script, set up Math.seedrandom global.
  math['seed' + rngname] = seedrandom;
}


// End anonymous scope, and pass initial values.
})(
  // global: `self` in browsers (including strict mode and web workers),
  // otherwise `this` in Node and other environments
  (typeof self !== 'undefined') ? self : commonjsGlobal,
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);
});

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.


// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.


// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.


// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.


// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.


// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.


// The original ARC4-based prng included in this library.
// Period: ~2^1600


seedrandom$1.alea = alea;
seedrandom$1.xor128 = xor128;
seedrandom$1.xorwow = xorwow;
seedrandom$1.xorshift7 = xorshift7;
seedrandom$1.xor4096 = xor4096;
seedrandom$1.tychei = tychei;

var seedrandom = seedrandom$1;

/* src/routes/create.svelte generated by Svelte v3.37.0 */

const { Object: Object_1, window: window_1 } = globals;
const file = "src/routes/create.svelte";

function create_fragment(ctx) {
	let section;
	let div2;
	let div1;
	let div0;
	let button0;
	let svg0;
	let g2;
	let g0;
	let path0;
	let g1;
	let path1;
	let t0;
	let button1;
	let svg1;
	let path2;
	let t1;
	let button2;
	let svg2;
	let g3;
	let path3;
	let path4;
	let path5;
	let path6;
	let path7;
	let path8;
	let path9;
	let path10;
	let path11;
	let path12;
	let t2;
	let button3;
	let svg3;
	let g4;
	let path13;
	let path14;
	let path15;
	let t3;
	let div5;
	let div4;
	let div3;
	let textarea;
	let t4;
	let div7;
	let button4;
	let t5;
	let t6;
	let br0;
	let br1;
	let t7;
	let div6;
	let button5;
	let t8;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			section = element("section");
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			button0 = element("button");
			svg0 = svg_element("svg");
			g2 = svg_element("g");
			g0 = svg_element("g");
			path0 = svg_element("path");
			g1 = svg_element("g");
			path1 = svg_element("path");
			t0 = space();
			button1 = element("button");
			svg1 = svg_element("svg");
			path2 = svg_element("path");
			t1 = space();
			button2 = element("button");
			svg2 = svg_element("svg");
			g3 = svg_element("g");
			path3 = svg_element("path");
			path4 = svg_element("path");
			path5 = svg_element("path");
			path6 = svg_element("path");
			path7 = svg_element("path");
			path8 = svg_element("path");
			path9 = svg_element("path");
			path10 = svg_element("path");
			path11 = svg_element("path");
			path12 = svg_element("path");
			t2 = space();
			button3 = element("button");
			svg3 = svg_element("svg");
			g4 = svg_element("g");
			path13 = svg_element("path");
			path14 = svg_element("path");
			path15 = svg_element("path");
			t3 = space();
			div5 = element("div");
			div4 = element("div");
			div3 = element("div");
			textarea = element("textarea");
			t4 = space();
			div7 = element("div");
			button4 = element("button");
			t5 = text("Load New Seed");
			t6 = space();
			br0 = element("br");
			br1 = element("br");
			t7 = space();
			div6 = element("div");
			button5 = element("button");
			t8 = text("Mint");
			this.h();
		},
		l: function claim(nodes) {
			section = claim_element(nodes, "SECTION", {});
			var section_nodes = children(section);
			div2 = claim_element(section_nodes, "DIV", { class: true, id: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true, id: true });
			var div0_nodes = children(div0);
			button0 = claim_element(div0_nodes, "BUTTON", { id: true, class: true });
			var button0_nodes = children(button0);

			svg0 = claim_element(
				button0_nodes,
				"svg",
				{
					width: true,
					height: true,
					"enable-background": true,
					id: true,
					version: true,
					viewBox: true,
					"xml:space": true,
					xmlns: true,
					"xmlns:xlink": true,
					class: true
				},
				1
			);

			var svg0_nodes = children(svg0);
			g2 = claim_element(svg0_nodes, "g", {}, 1);
			var g2_nodes = children(g2);
			g0 = claim_element(g2_nodes, "g", {}, 1);
			var g0_nodes = children(g0);
			path0 = claim_element(g0_nodes, "path", { d: true }, 1);
			children(path0).forEach(detach_dev);
			g0_nodes.forEach(detach_dev);
			g1 = claim_element(g2_nodes, "g", {}, 1);
			var g1_nodes = children(g1);
			path1 = claim_element(g1_nodes, "path", { d: true, fill: true }, 1);
			children(path1).forEach(detach_dev);
			g1_nodes.forEach(detach_dev);
			g2_nodes.forEach(detach_dev);
			svg0_nodes.forEach(detach_dev);
			button0_nodes.forEach(detach_dev);
			t0 = claim_space(div0_nodes);
			button1 = claim_element(div0_nodes, "BUTTON", { id: true, class: true });
			var button1_nodes = children(button1);

			svg1 = claim_element(
				button1_nodes,
				"svg",
				{
					width: true,
					height: true,
					id: true,
					style: true,
					version: true,
					viewBox: true,
					"xml:space": true,
					xmlns: true,
					"xmlns:xlink": true,
					class: true
				},
				1
			);

			var svg1_nodes = children(svg1);
			path2 = claim_element(svg1_nodes, "path", { d: true }, 1);
			children(path2).forEach(detach_dev);
			svg1_nodes.forEach(detach_dev);
			button1_nodes.forEach(detach_dev);
			t1 = claim_space(div0_nodes);
			button2 = claim_element(div0_nodes, "BUTTON", { id: true, class: true });
			var button2_nodes = children(button2);

			svg2 = claim_element(
				button2_nodes,
				"svg",
				{
					version: true,
					xmlns: true,
					width: true,
					height: true,
					viewBox: true,
					preserveAspectRatio: true,
					class: true
				},
				1
			);

			var svg2_nodes = children(svg2);
			g3 = claim_element(svg2_nodes, "g", { transform: true, stroke: true }, 1);
			var g3_nodes = children(g3);
			path3 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path3).forEach(detach_dev);
			path4 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path4).forEach(detach_dev);
			path5 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path5).forEach(detach_dev);
			path6 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path6).forEach(detach_dev);
			path7 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path7).forEach(detach_dev);
			path8 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path8).forEach(detach_dev);
			path9 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path9).forEach(detach_dev);
			path10 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path10).forEach(detach_dev);
			path11 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path11).forEach(detach_dev);
			path12 = claim_element(g3_nodes, "path", { d: true }, 1);
			children(path12).forEach(detach_dev);
			g3_nodes.forEach(detach_dev);
			svg2_nodes.forEach(detach_dev);
			button2_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t2 = claim_space(div1_nodes);
			button3 = claim_element(div1_nodes, "BUTTON", { id: true, class: true });
			var button3_nodes = children(button3);

			svg3 = claim_element(
				button3_nodes,
				"svg",
				{
					opacity: true,
					height: true,
					width: true,
					xmlns: true,
					"xmlns:xlink": true,
					"aria-hidden": true,
					focusable: true,
					style: true,
					preserveAspectRatio: true,
					viewBox: true,
					class: true
				},
				1
			);

			var svg3_nodes = children(svg3);
			g4 = claim_element(svg3_nodes, "g", {}, 1);
			var g4_nodes = children(g4);
			path13 = claim_element(g4_nodes, "path", { d: true }, 1);
			children(path13).forEach(detach_dev);
			path14 = claim_element(g4_nodes, "path", { d: true }, 1);
			children(path14).forEach(detach_dev);
			path15 = claim_element(g4_nodes, "path", { d: true }, 1);
			children(path15).forEach(detach_dev);
			g4_nodes.forEach(detach_dev);
			svg3_nodes.forEach(detach_dev);
			button3_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			t3 = claim_space(section_nodes);
			div5 = claim_element(section_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			div4 = claim_element(div5_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);

			textarea = claim_element(div3_nodes, "TEXTAREA", {
				class: true,
				name: true,
				id: true,
				placeholder: true
			});

			children(textarea).forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			t4 = claim_space(section_nodes);
			div7 = claim_element(section_nodes, "DIV", { class: true });
			var div7_nodes = children(div7);
			button4 = claim_element(div7_nodes, "BUTTON", { class: true, id: true });
			var button4_nodes = children(button4);
			t5 = claim_text(button4_nodes, "Load New Seed");
			button4_nodes.forEach(detach_dev);
			t6 = claim_space(div7_nodes);
			br0 = claim_element(div7_nodes, "BR", {});
			br1 = claim_element(div7_nodes, "BR", {});
			t7 = claim_space(div7_nodes);
			div6 = claim_element(div7_nodes, "DIV", {});
			var div6_nodes = children(div6);
			button5 = claim_element(div6_nodes, "BUTTON", { class: true, id: true });
			var button5_nodes = children(button5);
			t8 = claim_text(button5_nodes, "Mint");
			button5_nodes.forEach(detach_dev);
			div6_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(path0, "d", "M21.9989624,14.0064087V4.0002441h27v-2h-29v12.0045166L14,13.9997559v4.6199951L2,14.6397705V39.40979l12-3.9900513    v4.5800171l6.9971313,0.008667c-0.0490112-0.4731445-0.0772705-0.9525146-0.0772705-1.4388428    c0-3.1660156,1.1289063-6.296875,3.1210938-8.7148438v-3.4072266c0-5.7607422,4.4296875-10.4472656,9.875-10.4472656    s9.875,4.6865234,9.875,10.4472656v3.4072266c1.9970703,2.4179688,3.1289063,5.5498047,3.1289063,8.7148438    c0,0.4933472-0.0298462,0.9793091-0.0802612,1.4590454L50,40.0297852v-26L21.9989624,14.0064087z");
			add_location(path0, file, 1012, 227, 28122);
			add_location(g0, file, 1012, 224, 28119);
			attr_dev(path1, "d", "M41.7909546,26.4475098c0-4.6582031-3.5322266-8.4472656-7.875-8.4472656    s-7.875,3.7890625-7.875,8.4472656v4.1594238c-1.9874268,2.1243286-3.1209717,4.9937134-3.1209717,7.9628296    c0,6.2999878,4.9299927,11.4299927,11,11.4299927c6.0599976,0,11-5.1300049,11-11.4299927    c0-2.9725952-1.1450806-5.8452759-3.1290283-7.961792V26.4475098z M36.1699829,40.0197754v3.4599609h-4.5v-3.4599609    c-0.789978-0.6700439-1.25-1.6900024-1.25-2.7600098c0-1.9899902,1.5700073-3.6099854,3.5-3.6099854s3.5,1.6199951,3.5,3.6099854    C37.4199829,38.3297729,36.9499512,39.3497314,36.1699829,40.0197754z M39.7909546,28.9006348    c-0.0093994-0.0068359-0.0188599-0.0128784-0.0282593-0.0188599c-0.0009766-0.0006104-0.00177-0.0014038-0.0027466-0.0020142    c-2.3612671-1.553833-5.2926636-2.0270386-8.020813-1.472229c-1.2930298,0.2623901-2.545166,0.7348633-3.6630249,1.4696655    c-0.0117188,0.0078125-0.0234375,0.015625-0.0351563,0.0234375v-2.453125c0-3.5546875,2.6357422-6.4472656,5.875-6.4472656    s5.875,2.8925781,5.875,6.4472656V28.9006348z");
			attr_dev(path1, "fill", "#3A92CC");
			add_location(path1, file, 1012, 772, 28667);
			add_location(g1, file, 1012, 769, 28664);
			add_location(g2, file, 1012, 221, 28116);
			attr_dev(svg0, "width", "48px");
			attr_dev(svg0, "height", "36px");
			attr_dev(svg0, "enable-background", "new 0 0 52 52");
			attr_dev(svg0, "id", "Layer_1");
			attr_dev(svg0, "version", "1.1");
			attr_dev(svg0, "viewBox", "0 0 52 52");
			attr_dev(svg0, "xml:space", "preserve");
			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg0, "xmlns:xlink", "http://www.w3.org/1999/xlink");
			attr_dev(svg0, "class", "svelte-15lmnyq");
			add_location(svg0, file, 1012, 9, 27904);
			attr_dev(button0, "id", "lock");
			attr_dev(button0, "class", "svelte-15lmnyq");
			add_location(button0, file, 1011, 9, 27854);
			attr_dev(path2, "d", "M69.294,11.442c-6.788-5.594-15.724-7.82-24.512-6.109C32.951,7.636,23.449,17.623,21.675,29.62  c-1.447,9.79,2.031,19.567,9.304,26.155c3.277,2.968,5.254,7.243,5.568,12.039c0.006,0.087,0.023,0.171,0.042,0.254v15.039  c0,0.828,0.671,1.5,1.5,1.5h1.495c0.609,4.359,3.813,7.697,7.672,7.697h6.81c3.859,0,7.062-3.338,7.671-7.697h1.495  c0.828,0,1.5-0.672,1.5-1.5V67.828c0-0.003,0.001-0.006,0.001-0.01c0-4.462,2.026-8.771,5.706-12.133  c6.062-5.538,9.538-13.415,9.538-21.61C79.978,25.287,76.084,17.037,69.294,11.442z M45.357,39.91h-2.305  c-1.271,0-2.305-1.034-2.305-2.305s1.034-2.305,2.305-2.305s2.305,1.034,2.305,2.305V39.91z M55.966,37.605  c0-1.271,1.034-2.305,2.306-2.305c1.271,0,2.305,1.034,2.305,2.305s-1.034,2.305-2.305,2.305h-2.303L55.966,37.605z M55.063,69.211  h6.67v12.396H60.36c-0.003,0-0.006-0.001-0.01-0.001s-0.006,0.001-0.01,0.001H40.982c-0.003,0-0.006-0.001-0.01-0.001  s-0.006,0.001-0.01,0.001H39.59V69.211h14.366 M48.357,66.211V42.91h4.617l0.034,23.301H48.357z M54.066,89.304h-6.81  c-2.238,0-4.117-2.004-4.637-4.697h16.083C58.183,87.3,56.304,89.304,54.066,89.304z M68.416,53.471  c-3.872,3.537-6.164,8.013-6.593,12.74h-5.816L55.974,42.91h2.298c2.925,0,5.305-2.38,5.305-5.305c0-2.925-2.38-5.305-5.305-5.305  c-2.926,0-5.306,2.38-5.306,5.307l0.003,2.303h-4.612v-2.305c0-2.925-2.38-5.305-5.305-5.305c-2.925,0-5.305,2.38-5.305,5.305  c0,2.925,2.38,5.305,5.305,5.305h2.305v23.301h-5.972c-0.636-5.005-2.864-9.465-6.393-12.66c-6.528-5.914-9.65-14.696-8.35-23.493  c1.591-10.76,10.108-19.716,20.712-21.781c7.908-1.538,15.938,0.458,22.03,5.48c6.096,5.023,9.592,12.429,9.592,20.319  C76.978,41.43,73.857,48.5,68.416,53.471z");
			add_location(path2, file, 1017, 248, 30076);
			attr_dev(svg1, "width", "48px");
			attr_dev(svg1, "height", "36px");
			attr_dev(svg1, "id", "Layer_1");
			set_style(svg1, "enable-background", "new 0 0 100.353 100.352");
			attr_dev(svg1, "version", "1.1");
			attr_dev(svg1, "viewBox", "0 0 100.353 100.352");
			attr_dev(svg1, "xml:space", "preserve");
			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg1, "xmlns:xlink", "http://www.w3.org/1999/xlink");
			attr_dev(svg1, "class", "svelte-15lmnyq");
			add_location(svg1, file, 1017, 9, 29837);
			attr_dev(button1, "id", "headlamp");
			attr_dev(button1, "class", "svelte-15lmnyq");
			add_location(button1, file, 1016, 9, 29779);
			attr_dev(path3, "d", "M1255 6374 c-235 -39 -491 -152 -670 -295 -104 -83 -284 -274 -344\n            -364 -102 -155 -190 -364 -225 -537 -10 -48 -16 -129 -16 -216 0 -128 2 -142\n            23 -172 33 -49 98 -80 169 -80 107 0 166 45 192 145 9 32 16 76 16 96 0 62 38\n            260 64 338 83 240 276 461 503 575 115 58 226 89 378 106 188 22 217 28 254\n            58 56 44 73 85 69 168 -4 86 -30 131 -99 169 -41 22 -58 25 -140 24 -52 -1\n            -130 -7 -174 -15z");
			add_location(path3, file, 1027, 12, 32137);
			attr_dev(path4, "d", "M4465 6366 c-198 -65 -297 -154 -499 -451 -205 -300 -222 -321 -281\n            -353 -32 -17 -283 -29 -652 -31 -182 -1 -183 -1 -271 -34 -134 -51 -244 -120\n            -342 -217 -121 -119 -196 -235 -259 -405 l-26 -70 -3 -1387 c-3 -1554 -7\n            -1457 71 -1621 103 -216 297 -389 527 -469 l95 -33 2275 0 2275 0 95 32 c261\n            89 468 294 568 564 l27 74 3 1375 c2 965 0 1394 -8 1439 -47 273 -251 538\n            -516 670 -166 82 -171 83 -609 90 -436 7 -420 4 -491 81 -21 22 -85 111 -144\n            198 -58 86 -126 186 -151 222 -71 105 -203 230 -286 273 -147 76 -157 77 -777\n            77 -547 -1 -552 -1 -621 -24z m1165 -401 c46 -9 86 -39 115 -84 13 -21 29 -44\n            37 -52 7 -8 36 -48 64 -89 258 -381 291 -423 391 -491 52 -36 152 -87 198\n            -100 73 -22 186 -29 491 -29 341 -1 379 -5 475 -48 93 -42 189 -145 221 -234\n            39 -108 39 -116 35 -1478 -2 -729 -7 -1342 -12 -1363 -4 -20 -11 -40 -16 -43\n            -5 -3 -9 -11 -9 -19 0 -8 -14 -34 -30 -58 -70 -104 -153 -148 -310 -166 -111\n            -13 -4149 -13 -4321 -1 -70 5 -140 15 -155 21 -77 31 -97 43 -129 71 -36 31\n            -95 111 -95 129 0 5 -4 17 -9 27 -29 57 -31 140 -31 1427 0 1338 0 1346 38\n            1453 31 89 128 191 222 234 92 42 142 47 488 48 400 0 447 7 602 85 76 38 192\n            141 243 214 17 25 37 52 43 61 11 14 85 122 188 275 22 33 46 66 53 73 7 7 13\n            17 13 21 0 4 21 30 48 58 46 50 49 51 117 58 39 3 74 8 79 9 23 6 925 -3 956\n            -9z");
			add_location(path4, file, 1033, 12, 32602);
			attr_dev(path5, "d", "M4905 4675 c-254 -42 -487 -167 -696 -375 -256 -256 -384 -551 -384\n            -885 2 -572 416 -1092 989 -1240 126 -32 147 -35 284 -35 126 0 165 4 251 25\n            255 63 425 155 604 324 233 222 354 439 407 733 31 171 24 306 -25 498 -88\n            347 -374 686 -715 848 -176 83 -293 112 -485 117 -94 3 -169 0 -230 -10z m364\n            -421 c17 -4 29 -10 26 -14 -2 -4 6 -5 19 -3 43 9 190 -52 288 -118 82 -56 152\n            -125 142 -140 -4 -7 -3 -10 3 -6 22 14 114 -131 151 -239 43 -127 47 -156 46\n            -329 0 -148 -3 -180 -23 -244 -30 -98 -70 -183 -81 -176 -6 3 -7 -1 -4 -9 13\n            -35 -135 -203 -241 -273 -253 -166 -603 -190 -885 -60 -65 30 -121 68 -114 78\n            3 5 -1 6 -8 4 -30 -12 -219 190 -202 216 4 7 3 9 -3 6 -18 -11 -77 116 -111\n            233 -21 73 -23 373 -3 445 22 83 53 168 74 205 128 229 300 357 562 419 46 10\n            317 14 364 5z");
			add_location(path5, file, 1051, 12, 34091);
			attr_dev(path6, "d", "M8655 6380 c-58 -18 -108 -79 -124 -150 -22 -97 33 -203 116 -228 21\n            -6 96 -18 167 -27 200 -24 296 -50 417 -111 94 -46 156 -91 242 -174 198 -189\n            299 -413 327 -728 12 -132 24 -166 73 -209 42 -37 85 -47 162 -41 120 10 191\n            106 182 243 -11 167 -62 373 -132 528 -197 443 -596 769 -1074 878 -97 22\n            -310 34 -356 19z");
			add_location(path6, file, 1062, 12, 34991);
			attr_dev(path7, "d", "M1310 5511 c-203 -65 -385 -250 -444 -450 -20 -70 -21 -212 -2 -250\n            67 -129 271 -138 355 -16 14 21 26 63 35 122 7 49 19 100 25 112 31 58 87 88\n            179 97 31 3 71 10 88 15 38 12 93 64 110 106 17 39 18 131 3 170 -13 34 -55\n            80 -91 99 -39 20 -189 18 -258 -5z");
			add_location(path7, file, 1067, 12, 35370);
			attr_dev(path8, "d", "M8625 5512 c-40 -26 -71 -61 -84 -95 -18 -47 -13 -136 10 -184 33\n            -69 80 -93 215 -111 120 -16 158 -59 180 -205 22 -145 83 -207 207 -207 67 0\n            102 12 140 48 47 45 57 73 57 169 -1 231 -160 452 -409 566 -58 27 -79 31\n            -176 34 -96 4 -114 2 -140 -15z");
			add_location(path8, file, 1071, 12, 35679);
			attr_dev(path9, "d", "M1034 1694 c-5 -1 -26 -5 -47 -9 -45 -7 -105 -57 -123 -102 -19 -44\n            -18 -177 2 -244 59 -200 244 -388 446 -450 71 -23 204 -25 251 -5 79 32 126\n            135 106 226 -24 105 -82 149 -223 165 -125 15 -179 72 -192 203 -3 31 -10 71\n            -16 87 -12 33 -62 90 -93 108 -21 11 -94 25 -111 21z");
			add_location(path9, file, 1075, 12, 35981);
			attr_dev(path10, "d", "M9097 1686 c-96 -26 -136 -83 -152 -220 -15 -121 -69 -176 -191 -191\n            -88 -11 -109 -17 -146 -42 -50 -34 -78 -94 -78 -166 0 -67 12 -102 48 -140 43\n            -46 74 -57 159 -57 162 0 291 58 423 190 132 132 190 261 190 423 0 85 -11\n            116 -57 159 -49 47 -123 63 -196 44z");
			add_location(path10, file, 1079, 12, 36308);
			attr_dev(path11, "d", "M9994 1694 c-5 -1 -26 -5 -47 -9 -49 -8 -110 -63 -125 -112 -6 -21\n            -18 -99 -27 -173 -25 -215 -75 -366 -169 -513 -52 -83 -189 -222 -275 -280\n            -156 -105 -305 -156 -531 -182 -172 -20 -203 -30 -244 -76 -76 -83 -62 -232\n            28 -299 60 -45 170 -51 351 -20 200 34 402 115 580 232 90 59 281 239 364 343\n            176 221 298 542 318 841 5 63 2 77 -23 129 -33 67 -82 105 -148 115 -23 3 -46\n            5 -52 4z");
			add_location(path11, file, 1083, 12, 36620);
			attr_dev(path12, "d", "M105 1675 c-42 -20 -59 -35 -84 -75 -19 -31 -21 -50 -21 -168 0 -199\n            40 -361 140 -567 80 -165 141 -248 299 -406 158 -157 238 -216 406 -299 198\n            -97 440 -155 615 -148 76 3 92 7 128 32 55 37 82 95 82 172 0 70 -21 116 -71\n            156 -37 30 -67 37 -259 59 -271 30 -476 131 -658 323 -164 173 -244 360 -277\n            646 -9 74 -21 151 -27 170 -12 40 -51 85 -90 106 -35 18 -144 18 -183 -1z");
			add_location(path12, file, 1089, 12, 37077);
			attr_dev(g3, "transform", "translate(0.000000,639.000000) scale(0.100000,-0.100000)");
			attr_dev(g3, "stroke", "none");
			add_location(g3, file, 1025, 12, 32024);
			attr_dev(svg2, "version", "1.0");
			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg2, "width", "48px");
			attr_dev(svg2, "height", "48px");
			attr_dev(svg2, "viewBox", "0 0 1023.000000 639.000000");
			attr_dev(svg2, "preserveAspectRatio", "xMidYMid meet");
			attr_dev(svg2, "class", "svelte-15lmnyq");
			add_location(svg2, file, 1022, 12, 31829);
			attr_dev(button2, "id", "stabilize");
			attr_dev(button2, "class", "svelte-15lmnyq");
			add_location(button2, file, 1021, 9, 31766);
			attr_dev(div0, "class", "button-actual svelte-15lmnyq");
			attr_dev(div0, "id", "inner_div");
			add_location(div0, file, 1002, 6, 27360);
			attr_dev(path13, "d", "M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755c-.165.165-.337.328-.517.486l.708.709z");
			add_location(path13, file, 1102, 331, 38031);
			attr_dev(path14, "d", "M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z");
			add_location(path14, file, 1102, 606, 38306);
			attr_dev(path15, "d", "M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12l-.708.708z");
			add_location(path15, file, 1102, 786, 38486);
			add_location(g4, file, 1102, 327, 38027);
			attr_dev(svg3, "opacity", /*opct*/ ctx[6]);
			attr_dev(svg3, "height", "48px");
			attr_dev(svg3, "width", "48px");
			attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg3, "xmlns:xlink", "http://www.w3.org/1999/xlink");
			attr_dev(svg3, "aria-hidden", "true");
			attr_dev(svg3, "focusable", "false");
			set_style(svg3, "-ms-transform", "rotate(360deg)");
			set_style(svg3, "-webkit-transform", "rotate(360deg)");
			set_style(svg3, "transform", "rotate(360deg)");
			attr_dev(svg3, "preserveAspectRatio", "xMidYMid meet");
			attr_dev(svg3, "viewBox", "0 0 16 16");
			attr_dev(svg3, "class", "svelte-15lmnyq");
			add_location(svg3, file, 1102, 12, 37712);
			attr_dev(button3, "id", "hide");
			attr_dev(button3, "class", "svelte-15lmnyq");
			add_location(button3, file, 1101, 10, 37611);
			attr_dev(div1, "class", "button-container svelte-15lmnyq");
			add_location(div1, file, 1001, 6, 27322);
			attr_dev(div2, "class", "canvas-container svelte-15lmnyq");
			attr_dev(div2, "id", "canvas-container");
			add_location(div2, file, 999, 4, 27217);
			attr_dev(textarea, "class", "form-control");
			attr_dev(textarea, "name", "textarea");
			attr_dev(textarea, "id", "textareaID");
			attr_dev(textarea, "placeholder", "Choose a unique name for your NFT and hit Load New Seed...");
			add_location(textarea, file, 1114, 9, 38948);
			attr_dev(div3, "class", "col");
			add_location(div3, file, 1113, 8, 38921);
			attr_dev(div4, "class", "row");
			add_location(div4, file, 1111, 6, 38892);
			attr_dev(div5, "class", "container");
			add_location(div5, file, 1109, 5, 38859);
			attr_dev(button4, "class", "btn btn-primary");
			attr_dev(button4, "id", "reset");
			add_location(button4, file, 1121, 6, 39179);
			add_location(br0, file, 1124, 5, 39286);
			add_location(br1, file, 1124, 9, 39290);
			attr_dev(button5, "class", "btn btn-secondary");
			attr_dev(button5, "id", "start");
			add_location(button5, file, 1126, 5, 39313);
			add_location(div6, file, 1125, 5, 39302);
			attr_dev(div7, "class", "buttons");
			add_location(div7, file, 1120, 6, 39151);
			add_location(section, file, 998, 2, 27203);
		},
		m: function mount(target, anchor) {
			insert_dev(target, section, anchor);
			append_dev(section, div2);
			append_dev(div2, div1);
			append_dev(div1, div0);
			append_dev(div0, button0);
			append_dev(button0, svg0);
			append_dev(svg0, g2);
			append_dev(g2, g0);
			append_dev(g0, path0);
			append_dev(g2, g1);
			append_dev(g1, path1);
			append_dev(div0, t0);
			append_dev(div0, button1);
			append_dev(button1, svg1);
			append_dev(svg1, path2);
			append_dev(div0, t1);
			append_dev(div0, button2);
			append_dev(button2, svg2);
			append_dev(svg2, g3);
			append_dev(g3, path3);
			append_dev(g3, path4);
			append_dev(g3, path5);
			append_dev(g3, path6);
			append_dev(g3, path7);
			append_dev(g3, path8);
			append_dev(g3, path9);
			append_dev(g3, path10);
			append_dev(g3, path11);
			append_dev(g3, path12);
			append_dev(div1, t2);
			append_dev(div1, button3);
			append_dev(button3, svg3);
			append_dev(svg3, g4);
			append_dev(g4, path13);
			append_dev(g4, path14);
			append_dev(g4, path15);
			append_dev(section, t3);
			append_dev(section, div5);
			append_dev(div5, div4);
			append_dev(div4, div3);
			append_dev(div3, textarea);
			append_dev(section, t4);
			append_dev(section, div7);
			append_dev(div7, button4);
			append_dev(button4, t5);
			append_dev(div7, t6);
			append_dev(div7, br0);
			append_dev(div7, br1);
			append_dev(div7, t7);
			append_dev(div7, div6);
			append_dev(div6, button5);
			append_dev(button5, t8);

			if (!mounted) {
				dispose = [
					listen_dev(window_1, "resize", /*resize_handler*/ ctx[22], false, false, false),
					listen_dev(button0, "click", /*click_handler*/ ctx[23], false, false, false),
					listen_dev(button1, "click", /*click_handler_1*/ ctx[24], false, false, false),
					listen_dev(button2, "click", /*click_handler_2*/ ctx[25], false, false, false),
					listen_dev(button3, "click", /*click_handler_3*/ ctx[26], false, false, false),
					listen_dev(button3, "mouseover", /*hideEnter*/ ctx[9], false, false, false),
					listen_dev(button3, "mouseout", /*hideExit*/ ctx[10], false, false, false),
					listen_dev(button4, "click", /*click_handler_4*/ ctx[27], false, false, false),
					listen_dev(button5, "click", /*click_handler_5*/ ctx[28], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*opct*/ 64) {
				attr_dev(svg3, "opacity", /*opct*/ ctx[6]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(section);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const fr = 30;
const limit = 20;
const actual = 5;

function getTier(rarity) {
	if (rarity < 6) {
		return "Common";
	}

	if (rarity < 324) {
		return "Uncommon";
	}

	if (rarity < 5125) {
		return "Rare";
	} else {
		return "Legendary";
	}
}

function getProperty(namee, val, display = "string") {
	var property;

	if (display == "string") {
		property = { trait_type: namee, value: val };
	} else {
		property = {
			display_type: display,
			trait_type: namee,
			value: val
		};
	}

	return property;
}

function getQuadrant(x, y, z, offset) {
	var xPositive = offset - x > 0;
	var yPositive = offset - y > 0;
	var zPositive = offset - z > 0;

	if (xPositive) {
		if (yPositive) {
			if (zPositive) {
				return 0;
			} else {
				return 1;
			}
		} else {
			if (zPositive) {
				return 2;
			} else {
				return 3;
			}
		}
	} else {
		if (yPositive) {
			if (zPositive) {
				return 4;
			} else {
				return 5;
			}
		} else {
			if (zPositive) {
				return 6;
			} else {
				return 7;
			}
		}
	}
}

function instance($$self, $$props, $$invalidate) {
	let $app;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Create", slots, []);
	const app = getContext("app");
	validate_store(app, "app");
	component_subscribe($$self, app, value => $$invalidate(74, $app = value));
	const dispatch = createEventDispatcher();
	const myApp = writable({ camera: null, renderer: null });
	let { innerHeight } = $$props;
	let { innerWidth } = $$props;
	let { CCapture } = "";

	onMount(async () => {
		await Promise.all([import('./OrbitControls.b2cb7c71.js'), __inject_styles(["client-e118e612.css","create-e500561d.css"])]).then(function(x) { return x[0]; });
		await Promise.all([import('./client.7ce9bdcc.js'), __inject_styles(["client-e118e612.css"])]).then(function(x) { return x[0]; }).then(function (n) { return n.H; });
		CCapture = await Promise.all([import('./CCapture.1cfcf9a9.js'), __inject_styles(["client-e118e612.css","create-e500561d.css"])]).then(function(x) { return x[0]; }).then(function (n) { return n.C; }).default;
		const renderer = document.getElementById("canvas");
		document.getElementById("canvas-container").appendChild(renderer);
		document.getElementById("canvas").setAttribute("style", "width: 100%; height: 100%;");
		onWindowResize();
		init();
	});

	//let contract = $app.contract;
	//let account = $app.account;
	let view;

	let data;
	let mintText;

	//FORM PRELIMINARY JSON STRUCTURE FOR UPLOAD
	let name = "";

	let description = "An NFT of Negative Entropy: Series 1: Thomas"; //TODO include minter address in here + number it is
	let attributes = [];
	let image = "";
	let dependencies = [];
	let code = "defaultCode";
	let valid = false;

	//TODO: Standardize to IPFS://, maybe store this in .env
	let code_uri = "https://gateway.ipfs.io/ipfs/Qma3kCuqMiTrgUCKvLSArrMwbHyyDcjZjYpwobHsjDHUR5";

	// temp values
	let attrKey = "";

	let attrValue = "";
	let dependency = "";
	let dependencyType = "script";
	let _camera, _recorder;

	function onFile(e) {
		if (this.files && this.files.length) {
			$$invalidate(20, image = this.files[0]);
		}
	}

	function validate() {
		let _valid = true;
		_valid = _valid && data.name.trim() !== "";
		_valid = _valid && data.description.trim() !== "";
		_valid = _valid && data.image;
		_valid = _valid && data.interactive_nft.code;
		valid = _valid;
	}

	let _sandbox;

	function renderSandbox() {
		if (_sandbox) {
			_sandbox.$destroy();
		}

		$$invalidate(16, view.innerHTML = "", view);
		_sandbox = new Sandbox({ target: view, props: { data } });
	}

	function addDependency() {
		if (dependency.trim() !== "") {
			dependencies.push({ url: dependency, type: dependencyType });
			$$invalidate(21, dependencies);
			dependency = "";
			dependencyType = "script";
		}
	}

	function removeDependency(dep) {
		dependencies.splice(dependencies.indexOf(dep), 1);
		$$invalidate(21, dependencies);
	}

	function addAttribute() {
		if (attrKey.trim() !== "" && attrValue.trim() !== "") {
			$$invalidate(19, attributes[attrKey] = attrValue, attributes);
			$$invalidate(19, attributes);
			attrKey = attrValue = "";
		}
	}

	function removeAttribute(key) {
		delete attributes[key];
		$$invalidate(19, attributes);
	}

	let seed = "Buck";
	let camera, scene, renderer, mesh, headlight, stableOld, lockOld;
	let sizes = 350;

	const recorder = new CCapture({
			verbose: false,
			display: false,
			framerate: fr,
			quality: 75,
			format: "webm",
			timeLimit: limit,
			frameLimit: 0,
			autoSaveTime: 0
		});

	let opct = 1;
	let STABILIZE = true;
	let CAMERA_LOCK = false;
	let OVER_POWER = 7;
	let HEADLAMP = false;

	var params = {
		stabilize: STABILIZE,
		lock: CAMERA_LOCK,
		hide: false
	};

	const color = new Color();
	var attr;

	//Declare global vars
	let rand,
		random,
		b,
		dummy,
		visPos,
		pos,
		totalAve,
		offsets,
		recording,
		frame,
		speedMult,
		count,
		amount,
		newSeed,
		palette;

	let size,
		intensityBoost,
		metaly,
		rough,
		emissivity,
		random2,
		random3,
		random4,
		rotationRate,
		rotationRate2,
		rotationRate3,
		controls,
		container;

	const init = async () => {
		palette = [15660300, 3447003, 15396333, 15904887, 15877125, 6879492, 12370194, 11088422];
		rand = new seedrandom(seed);
		random = rand();
		b = random * 208186.01 / 1000000.01;
		dummy = new Object3D();
		visPos = [];
		pos = [];
		totalAve = new Vector3();
		offsets = new Vector3();
		recording = false;
		frame = 0;
		speedMult = 1;
		size = 0.25 + random;
		intensityBoost = 1;
		randomize();
		amount = rand() * 20 + 20;
		count = Math.pow(amount, 3);

		var props = {
			metal: metaly > 0,
			yRot: rotationRate > 0,
			xRot: rotationRate2 > 0,
			zRot: rotationRate3 > 0
		};

		var rarity = 1 / ((props.metal ? 0.2 : 0.8) * (props.yRot ? 0.25 : 0.75) * (props.xRot ? 0.25 * 0.25 : 1 - 0.25 * 0.25) * (props.zRot ? 0.25 * 0.25 * 0.25 : 1 - 0.25 * 0.25 * 0.25));

		"{\"Shiny\"" + ":\"" + (props.metal ? "Yes" : "No") + "\", " + "\"Y-Rotation\"" + ":\"" + (props.yRot
		? random2 > 0 ? "Positive" : "Negative"
		: "None") + "\", " + "\"X-Rotation\"" + ":\"" + (props.xRot
		? random3 > 0 ? "Positive" : "Negative"
		: "None") + "\", " + "\"Z-Rotation\"" + ":\"" + (props.zRot
		? random4 > 0 ? "Positive" : "Negative"
		: "None") + "\", " + "\"Number of Particles\"" + ":\"" + count.toFixed(0) + "\", " + "\"Size of Particles\"" + ":\"" + size.toFixed(3) + "\", " + "\"Speed mutliplier\"" + ":\"" + random.toFixed(3) + "\", " + "\"Series\":\"Series 1: Thomas\"" + ", " + "\"Tier\"" + ":\"" + getTier(rarity.toFixed(0)) + "\"}";

		$$invalidate(19, attributes = [
			getProperty("Shiny", props.metal ? "True" : "False"),
			getProperty("Y-Rotation", props.yRot
			? random2 > 0 ? "Positive" : "Negative"
			: "None"),
			getProperty("X-Rotation", props.xRot
			? random3 > 0 ? "Positive" : "Negative"
			: "None"),
			getProperty("Z-Rotation", props.zRot
			? random4 > 0 ? "Positive" : "Negative"
			: "None"),
			getProperty("Number of Particles", count.toFixed(0), "number"),
			getProperty("Size of Particles", size.toFixed(3), "number"),
			getProperty("Speed Multiplier", random.toFixed(3), "number"),
			getProperty("Series", "Series 1: Thomas"),
			getProperty("Tier", getTier(rarity.toFixed(0))),
			getProperty("seed", seed)
		]);

		camera = new PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
		camera.position.set(77, 77, 77);
		camera.lookAt(0, 0, 0);
		myApp.set({ camera });
		scene = new Scene();
		scene.background = new Color(4473924);
		initLights(scene, camera);
		const geometry = new SphereGeometry(size, 5, 3);

		const material = new MeshStandardMaterial({
				color: 16777215,
				roughness: rough, //Shinyness
				metalness: metaly,
				emissiveIntensity: emissivity,
				emissive: 2489064
			});

		material.color = material.color.convertSRGBToLinear();
		material.emissive = material.emissive.convertSRGBToLinear();
		mesh = new InstancedMesh(geometry, material, count);
		let counter = 0;
		const offset = (amount - 1) / 2;
		const matrix = new Matrix4();

		for (let x = 0; x < amount; x++) {
			for (let y = 0; y < amount; y++) {
				for (let z = 0; z < amount; z++) {
					matrix.setPosition(offset - x, offset - y, offset - z);
					var index = getQuadrant(x, y, z, offset);
					color.setHex(palette[index]).convertSRGBToLinear();
					mesh.setMatrixAt(counter, matrix);
					mesh.setColorAt(counter, color);
					var position = new Vector3(offset - x, offset - y, offset - z);
					pos.push(position);
					visPos.push(position.clone());
					counter++;
				}
			}
		}

		scene.add(mesh);
		geometry.dispose();
		material.dispose();

		if (typeof newSeed === "undefined") {
			renderer = new WebGLRenderer({ antialias: true });
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
			renderer.toneMapping = LinearToneMapping;

			if (document.getElementById("canvas")) {
				document.getElementById("canvas-container").removeChild(document.getElementById("canvas"));
				document.getElementById("canvas-container").appendChild(renderer.domElement).setAttribute("id", "canvas");
				document.getElementById("canvas").setAttribute("style", "width: 100%; height: 100%;");
			} else {
				document.body.appendChild(renderer.domElement).setAttribute("id", "canvas");
			}

			myApp.update(m => {
				m.camera = camera;
				m.renderer = renderer;
			});
		}

		controls = new OrbitControls(camera, renderer.domElement);
	};

	function reset() {
		seed = (" " + newSeed).slice(1); //Force deep copy of newSeed

		//Remove all
		scene.traverse(object => {
			if (!object.isMesh) return;
			object.geometry.dispose();

			if (object.material.isMaterial) {
				cleanMaterial(object.material);
			} else {
				// an array of materials
				for (const material of object.material) cleanMaterial(material);
			}
		});

		while (scene.children.length > 0) {
			scene.remove(scene.children[0]);
		}

		renderer.renderLists.dispose();
		init();
	}

	const cleanMaterial = material => {
		material.dispose();

		// dispose textures
		for (const key of Object.keys(material)) {
			const value = material[key];

			if (value && typeof value === "object" && "minFilter" in value) {
				value.dispose();
			}
		}
	};

	function randomize() {
		//Randomize palette
		for (var iter = 0; iter < palette.length; iter++) {
			var val = palette[iter];
			var num = parseInt(Number(val), 10);
			num += Math.floor(16777215 * rand() % 16777215);
			var newVal = "0x" + num.toString(16);
			palette[iter] = newVal;
		}

		//Randomize if shiny or not
		//0.8 to keep it kinda rare
		if (rand() > 0.8) {
			metaly = rand();
			rough = rand();
			emissivity = 0.1 * rand();
			intensityBoost = 1;
		} else {
			metaly = 0;
			rough = 1;
			emissivity = 0;
		}

		random2 = rand() * (random > 0.5 ? 1 : -1);
		random3 = rand() * (random2 > 0.5 ? 1 : -1);
		random4 = rand() * (random3 > 0.5 ? 1 : -1);
		rotationRate = rand() > 0.75 ? 0.005 : 0;
		rotationRate2 = rand() > 0.75 & rotationRate > 0 ? 0.005 : 0;

		rotationRate3 = rand() > 0.75 & rotationRate > 0 & rotationRate2 > 0
		? 0.005
		: 0;
	}

	function fitCameraToSelection(camera, controls, posArray, fitOffset = 1.2) {
		const box = new Box3().setFromPoints(posArray);
		const size = box.getSize(new Vector3());
		box.getCenter(new Vector3());
		const maxSize = Math.max(size.x, size.y, size.z); //Find the maximum dimension of the box
		const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * camera.fov / 360)); //Fancy math
		const fitWidthDistance = fitHeightDistance / camera.aspect; //More fancy math to find distance camera needs to be to see
		const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance); //Take whichever of these distances is larger and use it with the offset

		const direction = controls.target.clone().sub(camera.position).normalize().multiplyScalar(distance); //Find camera position relative to target
		//Get unit normal vector for this value
		//Convert that unit normal to distance camera needs to be from target to fit everything

		controls.maxDistance = distance * 10; //
		camera.near = distance / 100; //100 is the max view distance(?)
		camera.far = distance * 100;
		camera.updateProjectionMatrix(); //Update the camera
		camera.position.copy(controls.target).sub(direction); //Set position of camera to our target, then subtract the direction we calculated previously
		controls.update();
	}

	function initLights(scene, camera) {
		//ILLUMINGATED CAMERA
		headlight = new PointLight(16513781, intensityBoost, 300);

		if (HEADLAMP) {
			camera.add(headlight);
		}

		scene.add(camera);
		const keyLight = new SpotLight(16777215, intensityBoost);
		keyLight.position.set(55, 99, 88);
		scene.add(keyLight);
		const fillLight = new SpotLight(16755036, intensityBoost / 2);
		fillLight.position.set(99, 77, 55);
		scene.add(fillLight);
		const rimLight = new SpotLight(16777215, intensityBoost);
		rimLight.position.set(-99, 88, -99);
		scene.add(rimLight);
	}

	function onWindowResize() {
		setAttributes();
		get_store_value(myApp);

		if (recording) {
			return;
		}

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
		document.getElementById("canvas").setAttribute("style", "width: 100%; height: 100%;");
	}

	const setAttributes = () => {
		const $attributes = document.getElementById("attributes");

		if ($attributes) {
			$attributes.value = attr;
		}
	};

	const start = e => {
		if ($app.contract == null) {
			//We are not set up with Web3, alert user and return
			alert("Web3 is not Connected!");

			return;
		}

		const $start = document.getElementById("start");
		const $headlamp = document.getElementById("headlamp");
		const $stabilize = document.getElementById("stabilize");
		const $lock = document.getElementById("lock");
		const $reset = document.getElementById("reset");
		const $hide = document.getElementById("reset");
		resize(350, 350);
		$start.textContent = "Recording & Minting...";
		$headlamp.style.display = "none";
		$stabilize.style.display = "none";
		$lock.style.display = "none";
		$reset.style.display = "none";
		$hide.style.display = "none";
		$$invalidate(6, opct = 0);
		stableOld = params.stabilize;
		lockOld = params.lock;
		params.lock = true;
		params.stabilize = true;
		recording = true;
		speedMult = OVER_POWER;
		controls.target.set(0, 0, 0);
		controls.update();
		controls.enabled = false;
		recorder.start();
	};

	const headlamp = e => {
		const $headlamp = document.getElementById("headlamp");

		if (HEADLAMP) {
			$headlamp.style.fill = "black";
			HEADLAMP = false;
			camera.remove(headlight);
		} else {
			$headlamp.style.fill = "red";
			HEADLAMP = true;
			camera.add(headlight);
		}
	};

	const stabilize = e => {
		const $stabilize = document.getElementById("stabilize");

		//e.preventDefault();
		if (params.stabilize) {
			$stabilize.style.fill = "black";
			params.stabilize = false;
		} else {
			$stabilize.style.fill = "red";
			params.stabilize = true;
		}
	};

	const lock = e => {
		const $lock = document.getElementById("lock");

		if (params.lock) {
			//$lock.innerHTML = "Enable Camera-Lock"
			$lock.style.fill = "black";

			params.lock = false;
		} else {
			$lock.style.fill = "red";
			params.lock = true;
		}
	};

	const _reset = e => {
		newSeed = document.getElementById("textareaID").value.trim();
		reset();
	};

	const hide = () => {
		const $hide = document.getElementById("hide");

		if (params.hide) {
			//Already hidden, unhide
			$hide.style.fill = "black";

			document.getElementById("inner_div").style.visibility = "visible";
			params.hide = false;
			$$invalidate(6, opct = 1);
		} else {
			//Not hidden, hide
			$hide.style.fill = "red";

			document.getElementById("inner_div").style.visibility = "hidden";
			params.hide = true;
			$$invalidate(6, opct = 0);
		}
	};

	function hideEnter() {
		if (params.hide) {
			$$invalidate(6, opct = 1);
		}
	}

	function hideExit() {
		if (params.hide) {
			$$invalidate(6, opct = 0);
		}
	}

	const resize = (width, height) => {
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
	};

	function animate() {
		render();

		if (recording) {
			recorder.capture(renderer.domElement);
			frame++;

			if (frame > fr * actual) {
				onRecordingEnd();
			}
		}

		requestAnimationFrame(animate);
	}

	function render() {
		const SCALING_FACTOR = 10;

		if (mesh) {
			var reps = 0;

			while (reps < speedMult) {
				var len = pos.length;

				if (params.stabilize) {
					offsets.copy(totalAve).divideScalar(len).negate();
					totalAve.set(0, 0, 0);
				}

				mesh.rotation.x += rotationRate2 * random3;
				mesh.rotation.y += rotationRate * random2;
				mesh.rotation.z += rotationRate3 * random4;
				let i = 0;

				while (i < count) {
					var position = pos[i];
					var visPosition = visPos[i];
					var dx = position.x / SCALING_FACTOR;
					var dy = position.y / SCALING_FACTOR;
					var dz = position.z / SCALING_FACTOR;
					var x1 = (-b * dx + Math.sin(dy)) * random;
					var y1 = (-b * dy + Math.sin(dz)) * random;
					var z1 = (-b * dz + Math.sin(dx)) * random;

					//var randCall = rand();
					var xm = rand();

					var ym = rand(); //randCall*random3;
					var zm = rand(); //randCall*random4;
					position.x += x1 + xm / 5;
					position.y += y1 + ym / 5;
					position.z += z1 + zm / 5;
					visPosition.copy(position).add(offsets);

					if (params.stabilize) {
						dummy.position.set(visPosition.x, visPosition.y, visPosition.z);
						totalAve = totalAve.addVectors(totalAve, position);
					} else {
						dummy.position.set(position.x, position.y, position.z);
					}

					dummy.updateMatrix();
					mesh.setMatrixAt(i++, dummy.matrix);
				}

				reps++;
			}

			mesh.instanceMatrix.needsUpdate = true;
			mesh.instanceColor.needsUpdate = true;
		}

		if (params.lock) {
			fitCameraToSelection(camera, controls, visPos, 1.3);
		}

		renderer.render(scene, camera);
	}

	animate();
	var webMfile = writable();
	let formData;

	async function onRecordingEnd() {
		//FORM JSON 
		$$invalidate(18, name = seed); //Name the NFT after it's seed

		//TODO: Add number to description here
		//FORM ATTRIBUTES
		recording = false;

		recorder.stop();
		var blob = new Blob();

		await recorder.save(async _blob => {
			blob = _blob;
			mint(new File([blob], "blob.webm"));
		});

		onWindowResize();
		speedMult = 1;
		controls.enabled = true;
		const $start = document.getElementById("start");
		const $headlamp = document.getElementById("headlamp");
		const $stabilize = document.getElementById("stabilize");
		const $lock = document.getElementById("lock");
		const $reset = document.getElementById("reset");
		$start.style.display = "inline";
		$headlamp.style.display = "inline";
		$stabilize.style.display = "inline";
		$lock.style.display = "inline";
		$reset.style.display = "inline";
		params.stabilize = stableOld;
		params.lock = lockOld;
		$$invalidate(6, opct = 1);
		$start.textContent = "Mint";
	}

	async function mint(file, code) {
		if (!confirm(`Are you sure you would like to mint this token?`)) {
			return;
		}

		contract = $app.contract;
		account = $app.account;
		mintText = "Uploading image to ipfs...";
		await ipfs.connect("https://ipfs.infura.io:5001");
		let file_ = await ipfs.add(file);
		const image_uri = `https://gateway.ipfs.io/ipfs/${file_.path}`;
		$$invalidate(17, data.image = image_uri, data);
		await contract.methods.totalSupply().call();

		// here is where you'd set external_url in the json
		var payload = {};

		payload.customer = $app.account;
		payload.nft = data;

		//Backend verifies that seed is unique, uploads JSON to IPFS
		//Backend signs message (seed+URI) and returns signed message
		var destination = BACKEND + "signature";

		let response = await fetch(destination, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			body: JSON.stringify(payload)
		});

		let result = await response.json();

		//Take signed message, communicate with contract, and mint
		const cost = await contract.methods.PRICE().call({ from: $app.account });

		$app.web3.utils.fromWei(cost);
		mintText = "Adding NFT to blockchain - See MetaMask (or the like) for transaction";
		await contract.methods.mint($app.account, result.v, result.r, result.s, result.URI, result.seed).send({ from: $app.account, value: cost });
		dispatch("minted");
	}

	const writable_props = ["innerHeight", "innerWidth"];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Create> was created with unknown prop '${key}'`);
	});

	const resize_handler = () => onWindowResize();
	const click_handler = () => lock();
	const click_handler_1 = () => headlamp();
	const click_handler_2 = () => stabilize();
	const click_handler_3 = () => hide();
	const click_handler_4 = () => _reset();
	const click_handler_5 = e => start();

	$$self.$$set = $$props => {
		if ("innerHeight" in $$props) $$invalidate(11, innerHeight = $$props.innerHeight);
		if ("innerWidth" in $$props) $$invalidate(12, innerWidth = $$props.innerWidth);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		getContext,
		onMount,
		Sandbox,
		HemisphereLight,
		LinearToneMapping,
		Box3,
		SpotLight,
		Scene,
		Color,
		Object3D,
		Vector3,
		PerspectiveCamera,
		PointLight,
		SphereGeometry,
		MeshStandardMaterial,
		InstancedMesh,
		Matrix4,
		AxesHelper,
		WebGLRenderer,
		seedrandom,
		get: get_store_value,
		writable,
		app,
		dispatch,
		myApp,
		innerHeight,
		innerWidth,
		CCapture,
		view,
		data,
		mintText,
		name,
		description,
		attributes,
		image,
		dependencies,
		code,
		valid,
		code_uri,
		attrKey,
		attrValue,
		dependency,
		dependencyType,
		_camera,
		_recorder,
		onFile,
		validate,
		_sandbox,
		renderSandbox,
		addDependency,
		removeDependency,
		addAttribute,
		removeAttribute,
		seed,
		camera,
		scene,
		renderer,
		mesh,
		headlight,
		stableOld,
		lockOld,
		fr,
		limit,
		actual,
		sizes,
		recorder,
		opct,
		STABILIZE,
		CAMERA_LOCK,
		OVER_POWER,
		HEADLAMP,
		params,
		color,
		attr,
		getTier,
		rand,
		random,
		b,
		dummy,
		visPos,
		pos,
		totalAve,
		offsets,
		recording,
		frame,
		speedMult,
		count,
		amount,
		newSeed,
		palette,
		size,
		intensityBoost,
		metaly,
		rough,
		emissivity,
		random2,
		random3,
		random4,
		rotationRate,
		rotationRate2,
		rotationRate3,
		controls,
		container,
		init,
		reset,
		getProperty,
		cleanMaterial,
		randomize,
		fitCameraToSelection,
		getQuadrant,
		initLights,
		onWindowResize,
		setAttributes,
		start,
		headlamp,
		stabilize,
		lock,
		_reset,
		hide,
		hideEnter,
		hideExit,
		resize,
		animate,
		render,
		webMfile,
		formData,
		onRecordingEnd,
		mint,
		$app
	});

	$$self.$inject_state = $$props => {
		if ("innerHeight" in $$props) $$invalidate(11, innerHeight = $$props.innerHeight);
		if ("innerWidth" in $$props) $$invalidate(12, innerWidth = $$props.innerWidth);
		if ("CCapture" in $$props) CCapture = $$props.CCapture;
		if ("view" in $$props) $$invalidate(16, view = $$props.view);
		if ("data" in $$props) $$invalidate(17, data = $$props.data);
		if ("mintText" in $$props) mintText = $$props.mintText;
		if ("name" in $$props) $$invalidate(18, name = $$props.name);
		if ("description" in $$props) $$invalidate(77, description = $$props.description);
		if ("attributes" in $$props) $$invalidate(19, attributes = $$props.attributes);
		if ("image" in $$props) $$invalidate(20, image = $$props.image);
		if ("dependencies" in $$props) $$invalidate(21, dependencies = $$props.dependencies);
		if ("code" in $$props) $$invalidate(78, code = $$props.code);
		if ("valid" in $$props) valid = $$props.valid;
		if ("code_uri" in $$props) $$invalidate(79, code_uri = $$props.code_uri);
		if ("attrKey" in $$props) attrKey = $$props.attrKey;
		if ("attrValue" in $$props) attrValue = $$props.attrValue;
		if ("dependency" in $$props) dependency = $$props.dependency;
		if ("dependencyType" in $$props) dependencyType = $$props.dependencyType;
		if ("_camera" in $$props) _camera = $$props._camera;
		if ("_recorder" in $$props) _recorder = $$props._recorder;
		if ("_sandbox" in $$props) _sandbox = $$props._sandbox;
		if ("seed" in $$props) seed = $$props.seed;
		if ("camera" in $$props) camera = $$props.camera;
		if ("scene" in $$props) scene = $$props.scene;
		if ("renderer" in $$props) renderer = $$props.renderer;
		if ("mesh" in $$props) mesh = $$props.mesh;
		if ("headlight" in $$props) headlight = $$props.headlight;
		if ("stableOld" in $$props) stableOld = $$props.stableOld;
		if ("lockOld" in $$props) lockOld = $$props.lockOld;
		if ("sizes" in $$props) sizes = $$props.sizes;
		if ("opct" in $$props) $$invalidate(6, opct = $$props.opct);
		if ("STABILIZE" in $$props) STABILIZE = $$props.STABILIZE;
		if ("CAMERA_LOCK" in $$props) CAMERA_LOCK = $$props.CAMERA_LOCK;
		if ("OVER_POWER" in $$props) OVER_POWER = $$props.OVER_POWER;
		if ("HEADLAMP" in $$props) HEADLAMP = $$props.HEADLAMP;
		if ("params" in $$props) params = $$props.params;
		if ("attr" in $$props) attr = $$props.attr;
		if ("rand" in $$props) rand = $$props.rand;
		if ("random" in $$props) random = $$props.random;
		if ("b" in $$props) b = $$props.b;
		if ("dummy" in $$props) dummy = $$props.dummy;
		if ("visPos" in $$props) visPos = $$props.visPos;
		if ("pos" in $$props) pos = $$props.pos;
		if ("totalAve" in $$props) totalAve = $$props.totalAve;
		if ("offsets" in $$props) offsets = $$props.offsets;
		if ("recording" in $$props) recording = $$props.recording;
		if ("frame" in $$props) frame = $$props.frame;
		if ("speedMult" in $$props) speedMult = $$props.speedMult;
		if ("count" in $$props) count = $$props.count;
		if ("amount" in $$props) amount = $$props.amount;
		if ("newSeed" in $$props) newSeed = $$props.newSeed;
		if ("palette" in $$props) palette = $$props.palette;
		if ("size" in $$props) size = $$props.size;
		if ("intensityBoost" in $$props) intensityBoost = $$props.intensityBoost;
		if ("metaly" in $$props) metaly = $$props.metaly;
		if ("rough" in $$props) rough = $$props.rough;
		if ("emissivity" in $$props) emissivity = $$props.emissivity;
		if ("random2" in $$props) random2 = $$props.random2;
		if ("random3" in $$props) random3 = $$props.random3;
		if ("random4" in $$props) random4 = $$props.random4;
		if ("rotationRate" in $$props) rotationRate = $$props.rotationRate;
		if ("rotationRate2" in $$props) rotationRate2 = $$props.rotationRate2;
		if ("rotationRate3" in $$props) rotationRate3 = $$props.rotationRate3;
		if ("controls" in $$props) controls = $$props.controls;
		if ("container" in $$props) container = $$props.container;
		if ("webMfile" in $$props) webMfile = $$props.webMfile;
		if ("formData" in $$props) formData = $$props.formData;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*name, attributes, image, dependencies*/ 3932160) {
			{
				let _data = { name, description, attributes, image };

				if (code) {
					_data.interactive_nft = { code_uri, dependencies };
					$$invalidate(17, data = _data);
					validate();
				}
			}
		}

		if ($$self.$$.dirty[0] & /*view, data*/ 196608) {
			view && code && data && renderSandbox();
		}
	};

	return [
		start,
		headlamp,
		stabilize,
		lock,
		_reset,
		hide,
		opct,
		app,
		onWindowResize,
		hideEnter,
		hideExit,
		innerHeight,
		innerWidth,
		init,
		setAttributes,
		resize,
		view,
		data,
		name,
		attributes,
		image,
		dependencies,
		resize_handler,
		click_handler,
		click_handler_1,
		click_handler_2,
		click_handler_3,
		click_handler_4,
		click_handler_5
	];
}

class Create extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				innerHeight: 11,
				innerWidth: 12,
				init: 13,
				setAttributes: 14,
				start: 0,
				headlamp: 1,
				stabilize: 2,
				lock: 3,
				_reset: 4,
				hide: 5,
				resize: 15
			},
			[-1, -1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Create",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*innerHeight*/ ctx[11] === undefined && !("innerHeight" in props)) {
			console.warn("<Create> was created without expected prop 'innerHeight'");
		}

		if (/*innerWidth*/ ctx[12] === undefined && !("innerWidth" in props)) {
			console.warn("<Create> was created without expected prop 'innerWidth'");
		}
	}

	get innerHeight() {
		throw new Error("<Create>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set innerHeight(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get innerWidth() {
		throw new Error("<Create>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set innerWidth(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get init() {
		return this.$$.ctx[13];
	}

	set init(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get setAttributes() {
		return this.$$.ctx[14];
	}

	set setAttributes(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get start() {
		return this.$$.ctx[0];
	}

	set start(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get headlamp() {
		return this.$$.ctx[1];
	}

	set headlamp(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get stabilize() {
		return this.$$.ctx[2];
	}

	set stabilize(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get lock() {
		return this.$$.ctx[3];
	}

	set lock(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get _reset() {
		return this.$$.ctx[4];
	}

	set _reset(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hide() {
		return this.$$.ctx[5];
	}

	set hide(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get resize() {
		return this.$$.ctx[15];
	}

	set resize(value) {
		throw new Error("<Create>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var create = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': Create
});

export { EventDispatcher as E, MOUSE as M, Quaternion as Q, Spherical as S, TOUCH as T, Vector3 as V, Vector2 as a, commonjsGlobal as b, createCommonjsModule as c, create as d };
