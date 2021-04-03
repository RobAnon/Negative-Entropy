'use strict';

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

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var tar = createCommonjsModule(function (module) {
(function () {

  var lookup = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '+',
    '/',
  ];
  function clean(length) {
    var i,
      buffer = new Uint8Array(length);
    for (i = 0; i < length; i += 1) {
      buffer[i] = 0;
    }
    return buffer
  }

  function extend(orig, length, addLength, multipleOf) {
    var newSize = length + addLength,
      buffer = clean((parseInt(newSize / multipleOf) + 1) * multipleOf);

    buffer.set(orig);

    return buffer
  }

  function pad(num, bytes, base) {
    num = num.toString(base || 8);
    return '000000000000'.substr(num.length + 12 - bytes) + num
  }

  function stringToUint8(input, out, offset) {
    var i, length;

    out = out || clean(input.length);

    offset = offset || 0;
    for (i = 0, length = input.length; i < length; i += 1) {
      out[offset] = input.charCodeAt(i);
      offset += 1;
    }

    return out
  }

  function uint8ToBase64(uint8) {
    var i,
      extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
      output = '',
      temp,
      length;

    function tripletToBase64(num) {
      return lookup[(num >> 18) & 0x3f] + lookup[(num >> 12) & 0x3f] + lookup[(num >> 6) & 0x3f] + lookup[num & 0x3f]
    }

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
      output += tripletToBase64(temp);
    }

    // this prevents an ERR_INVALID_URL in Chrome (Firefox okay)
    switch (output.length % 4) {
      case 1:
        output += '=';
        break
      case 2:
        output += '==';
        break
    }

    return output
  }

  window.utils = {};
  window.utils.clean = clean;
  window.utils.pad = pad;
  window.utils.extend = extend;
  window.utils.stringToUint8 = stringToUint8;
  window.utils.uint8ToBase64 = uint8ToBase64;
})()

;(function () {

  /*
struct posix_header {             // byte offset
	char name[100];               //   0
	char mode[8];                 // 100
	char uid[8];                  // 108
	char gid[8];                  // 116
	char size[12];                // 124
	char mtime[12];               // 136
	char chksum[8];               // 148
	char typeflag;                // 156
	char linkname[100];           // 157
	char magic[6];                // 257
	char version[2];              // 263
	char uname[32];               // 265
	char gname[32];               // 297
	char devmajor[8];             // 329
	char devminor[8];             // 337
	char prefix[155];             // 345
                                  // 500
};
*/

  var utils = window.utils,
    headerFormat;

  headerFormat = [
    {
      field: 'fileName',
      length: 100,
    },
    {
      field: 'fileMode',
      length: 8,
    },
    {
      field: 'uid',
      length: 8,
    },
    {
      field: 'gid',
      length: 8,
    },
    {
      field: 'fileSize',
      length: 12,
    },
    {
      field: 'mtime',
      length: 12,
    },
    {
      field: 'checksum',
      length: 8,
    },
    {
      field: 'type',
      length: 1,
    },
    {
      field: 'linkName',
      length: 100,
    },
    {
      field: 'ustar',
      length: 8,
    },
    {
      field: 'owner',
      length: 32,
    },
    {
      field: 'group',
      length: 32,
    },
    {
      field: 'majorNumber',
      length: 8,
    },
    {
      field: 'minorNumber',
      length: 8,
    },
    {
      field: 'filenamePrefix',
      length: 155,
    },
    {
      field: 'padding',
      length: 12,
    },
  ];

  function formatHeader(data, cb) {
    var buffer = utils.clean(512),
      offset = 0;

    headerFormat.forEach(function (value) {
      var str = data[value.field] || '',
        i,
        length;

      for (i = 0, length = str.length; i < length; i += 1) {
        buffer[offset] = str.charCodeAt(i);
        offset += 1;
      }

      offset += value.length - i; // space it out with nulls
    });

    if (typeof cb === 'function') {
      return cb(buffer, offset)
    }
    return buffer
  }

  window.header = {};
  window.header.structure = headerFormat;
  window.header.format = formatHeader;
})()

;(function () {

  var header = window.header,
    utils = window.utils,
    recordSize = 512,
    blockSize;

  function Tar(recordsPerBlock) {
    this.written = 0;
    blockSize = (recordsPerBlock || 20) * recordSize;
    this.out = utils.clean(blockSize);
    this.blocks = [];
    this.length = 0;
  }

  Tar.prototype.append = function (filepath, input, opts, callback) {
    var data, checksum, mode, mtime, uid, gid, headerArr;

    if (typeof input === 'string') {
      input = utils.stringToUint8(input);
    } else if (input.constructor !== Uint8Array.prototype.constructor) {
      throw (
        'Invalid input type. You gave me: ' +
        input.constructor.toString().match(/function\s*([$A-Za-z_][0-9A-Za-z_]*)\s*\(/)[1]
      )
    }

    if (typeof opts === 'function') {
      opts = {};
    }

    opts = opts || {};

    mode = opts.mode || parseInt('777', 8) & 0xfff;
    mtime = opts.mtime || Math.floor(+new Date() / 1000);
    uid = opts.uid || 0;
    gid = opts.gid || 0;

    data = {
      fileName: filepath,
      fileMode: utils.pad(mode, 7),
      uid: utils.pad(uid, 7),
      gid: utils.pad(gid, 7),
      fileSize: utils.pad(input.length, 11),
      mtime: utils.pad(mtime, 11),
      checksum: '        ',
      type: '0', // just a file
      ustar: 'ustar  ',
      owner: opts.owner || '',
      group: opts.group || '',
    };

    // calculate the checksum
    checksum = 0;
    Object.keys(data).forEach(function (key) {
      var i,
        value = data[key],
        length;

      for (i = 0, length = value.length; i < length; i += 1) {
        checksum += value.charCodeAt(i);
      }
    });

    data.checksum = utils.pad(checksum, 6) + '\u0000 ';

    headerArr = header.format(data);

    var headerLength = Math.ceil(headerArr.length / recordSize) * recordSize;
    var inputLength = Math.ceil(input.length / recordSize) * recordSize;

    this.blocks.push({ header: headerArr, input: input, headerLength: headerLength, inputLength: inputLength });
  };

  Tar.prototype.save = function () {
    var buffers = [];
    var chunks = [];
    var length = 0;
    var max = Math.pow(2, 20);

    var chunk = [];
    this.blocks.forEach(function (b) {
      if (length + b.headerLength + b.inputLength > max) {
        chunks.push({ blocks: chunk, length: length });
        chunk = [];
        length = 0;
      }
      chunk.push(b);
      length += b.headerLength + b.inputLength;
    });
    chunks.push({ blocks: chunk, length: length });

    chunks.forEach(function (c) {
      var buffer = new Uint8Array(c.length);
      var written = 0;
      c.blocks.forEach(function (b) {
        buffer.set(b.header, written);
        written += b.headerLength;
        buffer.set(b.input, written);
        written += b.inputLength;
      });
      buffers.push(buffer);
    });

    buffers.push(new Uint8Array(2 * recordSize));

    return new Blob(buffers, { type: 'octet/stream' })
  };

  Tar.prototype.clear = function () {
    this.written = 0;
    this.out = utils.clean(blockSize);
  };

  {
    module.exports = Tar;
  }
})();
});

var download = createCommonjsModule(function (module, exports) {
(function (root, factory) {
  {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  }
})(commonjsGlobal, function () {
  return function download(data, strFileName, strMimeType) {
    var self = window, // this script is only for browsers anyway...
      defaultMime = 'application/octet-stream', // this default mime also triggers iframe downloads
      mimeType = strMimeType || defaultMime,
      payload = data,
      url = !strFileName && !strMimeType && payload,
      anchor = document.createElement('a'),
      toString = function (a) {
        return String(a)
      },
      myBlob = self.Blob || self.MozBlob || self.WebKitBlob || toString,
      fileName = strFileName || 'download',
      blob,
      reader;
    myBlob = myBlob.call ? myBlob.bind(self) : Blob;

    if (String(this) === 'true') {
      //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
      payload = [payload, mimeType];
      mimeType = payload[0];
      payload = payload[1];
    }

    if (url && url.length < 2048) {
      // if no filename and no mime, assume a url was passed as the only argument
      fileName = url.split('/').pop().split('?')[0];
      anchor.href = url; // assign href prop to temp anchor
      if (anchor.href.indexOf(url) !== -1) {
        // if the browser determines that it's a potentially valid url path:
        var ajax = new XMLHttpRequest();
        ajax.open('GET', url, true);
        ajax.responseType = 'blob';
        ajax.onload = function (e) {
          download(e.target.response, fileName, defaultMime);
        };
        setTimeout(function () {
          ajax.send();
        }, 0); // allows setting custom ajax headers using the return:
        return ajax
      } // end if valid url?
    } // end if url?

    //go ahead and download dataURLs right away
    if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)) {
      if (payload.length > 1024 * 1024 * 1.999 && myBlob !== toString) {
        payload = dataUrlToBlob(payload);
        mimeType = payload.type || defaultMime;
      } else {
        return navigator.msSaveBlob // IE10 can't do a[download], only Blobs:
          ? navigator.msSaveBlob(dataUrlToBlob(payload), fileName)
          : saver(payload) // everyone else can save dataURLs un-processed
      }
    } else {
      //not data url, is it a string with special needs?
      if (/([\x80-\xff])/.test(payload)) {
        var i = 0,
          tempUiArr = new Uint8Array(payload.length),
          mx = tempUiArr.length;
        for (i; i < mx; ++i) tempUiArr[i] = payload.charCodeAt(i);
        payload = new myBlob([tempUiArr], { type: mimeType });
      }
    }
    blob = payload instanceof myBlob ? payload : new myBlob([payload], { type: mimeType });

    function dataUrlToBlob(strUrl) {
      var parts = strUrl.split(/[:;,]/),
        type = parts[1],
        indexDecoder = strUrl.indexOf('charset') > 0 ? 3 : 2,
        decoder = parts[indexDecoder] == 'base64' ? atob : decodeURIComponent,
        binData = decoder(parts.pop()),
        mx = binData.length,
        i = 0,
        uiArr = new Uint8Array(mx);

      for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);

      return new myBlob([uiArr], { type: type })
    }

    function saver(url, winMode) {
      if ('download' in anchor) {
        //html5 A[download]
        anchor.href = url;
        anchor.setAttribute('download', fileName);
        anchor.className = 'download-js-link';
        anchor.innerHTML = 'downloading...';
        anchor.style.display = 'none';
        anchor.addEventListener('click', function (e) {
          e.stopPropagation();
          this.removeEventListener('click', arguments.callee);
        });
        document.body.appendChild(anchor);
        setTimeout(function () {
          anchor.click();
          document.body.removeChild(anchor);
          if (winMode === true) {
            setTimeout(function () {
              self.URL.revokeObjectURL(anchor.href);
            }, 250);
          }
        }, 66);
        return true
      }

      // handle non-a[download] safari as best we can:
      if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
        if (/^data:/.test(url)) url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        if (!window.open(url)) {
          // popup blocked, offer direct download:
          if (
            confirm('Displaying New Document\n\nUse Save As... to download, then click back to return to this page.')
          ) {
            location.href = url;
          }
        }
        return true
      }

      //do iframe dataURL download (old ch+FF):
      var f = document.createElement('iframe');
      document.body.appendChild(f);

      if (!winMode && /^data:/.test(url)) {
        // force a mime that will download:
        url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
      }
      f.src = url;
      setTimeout(function () {
        document.body.removeChild(f);
      }, 333);
    } //end saver

    if (navigator.msSaveBlob) {
      // IE10+ : (has Blob, but not a[download] or URL)
      return navigator.msSaveBlob(blob, fileName)
    }

    if (self.URL) {
      // simple fast and modern way using Blob and URL:
      saver(self.URL.createObjectURL(blob), true);
    } else {
      // handle non-Blob()+non-URL browsers:
      if (typeof blob === 'string' || blob.constructor === toString) {
        try {
          return saver('data:' + mimeType + ';base64,' + self.btoa(blob))
        } catch (y) {
          return saver('data:' + mimeType + ',' + encodeURIComponent(blob))
        }
      }

      // Blob but not URL support:
      reader = new FileReader();
      reader.onload = function (e) {
        saver(this.result);
      };
      reader.readAsDataURL(blob);
    }
    return true
  } /* end download() */
});
});

(function (c) {
  function a(b, d) {
    if ({}.hasOwnProperty.call(a.cache, b)) return a.cache[b]
    var e = a.resolve(b);
    if (!e) throw new Error('Failed to resolve module ' + b)
    var c = { id: b, require: a, filename: b, exports: {}, loaded: !1, parent: d, children: [] };
    d && d.children.push(c);
    var f = b.slice(0, b.lastIndexOf('/') + 1);
    return (a.cache[b] = c.exports), e.call(c.exports, c, c.exports, f, b), (c.loaded = !0), (a.cache[b] = c.exports)
  }
(a.modules = {}),
    (a.cache = {}),
    (a.resolve = function (b) {
      return {}.hasOwnProperty.call(a.modules, b) ? a.modules[b] : void 0
    }),
    (a.define = function (b, c) {
      a.modules[b] = c;
    });
  var b = (function (a) {
    return (
      (a = '/'),
      {
        title: 'browser',
        version: 'v0.10.26',
        browser: !0,
        env: {},
        argv: [],
        nextTick:
          c.setImmediate ||
          function (a) {
            setTimeout(a, 0);
          },
        cwd: function () {
          return a
        },
        chdir: function (b) {
          a = b;
        },
      }
    )
  })();
  a.define('/gif.coffee', function (d, m, l, k) {
    function g(a, b) {
      return {}.hasOwnProperty.call(a, b)
    }
    function j(d, b) {
      for (var a = 0, c = b.length; a < c; ++a) if (a in b && b[a] === d) return !0
      return !1
    }
    function i(a, b) {
      function d() {
        this.constructor = a;
      }
      for (var c in b) g(b, c) && (a[c] = b[c]);
      return (d.prototype = b.prototype), (a.prototype = new d()), (a.__super__ = b.prototype), a
    }
    var h, c, f, b, e
    ;(f = a('events', d).EventEmitter),
      (h = a('/browser.coffee', d)),
      (e = (function (d) {
        function a(d) {
          var a, b
          ;(this.running = !1),
            (this.options = {}),
            (this.frames = []),
            (this.freeWorkers = []),
            (this.activeWorkers = []),
            this.setOptions(d);
          for (a in c) (b = c[a]), null != this.options[a] ? this.options[a] : (this.options[a] = b);
        }
        return (
          i(a, d),
          (c = {
            workerScript: 'gif.worker.js',
            workers: 2,
            repeat: 0,
            background: '#fff',
            quality: 10,
            width: null,
            height: null,
            transparent: null,
          }),
          (b = { delay: 500, copy: !1 }),
          (a.prototype.setOption = function (a, b) {
            return (
              (this.options[a] = b),
              null != this._canvas && (a === 'width' || a === 'height') ? (this._canvas[a] = b) : void 0
            )
          }),
          (a.prototype.setOptions = function (b) {
            var a, c;
            return function (d) {
              for (a in b) {
                if (!g(b, a)) continue
                ;(c = b[a]), d.push(this.setOption(a, c));
              }
              return d
            }.call(this, [])
          }),
          (a.prototype.addFrame = function (a, d) {
            var c, e;
            null == d && (d = {}), (c = {}), (c.transparent = this.options.transparent);
            for (e in b) c[e] = d[e] || b[e];
            if (
              (null != this.options.width || this.setOption('width', a.width),
              null != this.options.height || this.setOption('height', a.height),
              'undefined' !== typeof ImageData && null != ImageData && a instanceof ImageData)
            )
              c.data = a.data;
            else if (
              ('undefined' !== typeof CanvasRenderingContext2D &&
                null != CanvasRenderingContext2D &&
                a instanceof CanvasRenderingContext2D) ||
              ('undefined' !== typeof WebGLRenderingContext &&
                null != WebGLRenderingContext &&
                a instanceof WebGLRenderingContext)
            )
              d.copy ? (c.data = this.getContextData(a)) : (c.context = a);
            else if (null != a.childNodes) d.copy ? (c.data = this.getImageData(a)) : (c.image = a);
            else throw new Error('Invalid image')
            return this.frames.push(c)
          }),
          (a.prototype.render = function () {
            var a;
            if (this.running) throw new Error('Already running')
            if (!(null != this.options.width && null != this.options.height))
              throw new Error('Width and height must be set prior to rendering')
            ;(this.running = !0),
              (this.nextFrame = 0),
              (this.finishedFrames = 0),
              (this.imageParts = function (c) {
                for (
                  var b = function () {
                      var b;
                      b = [];
                      for (
                        var a = 0;
                        0 <= this.frames.length ? a < this.frames.length : a > this.frames.length;
                        0 <= this.frames.length ? ++a : --a
                      )
                        b.push(a);
                      return b
                    }.apply(this, arguments),
                    a = 0,
                    e = b.length;
                  a < e;
                  ++a
                )
                  (b[a]), c.push(null);
                return c
              }.call(this, [])),
              (a = this.spawnWorkers());
            for (
              var c = function () {
                  var c;
                  c = [];
                  for (var b = 0; 0 <= a ? b < a : b > a; 0 <= a ? ++b : --b) c.push(b);
                  return c
                }.apply(this, arguments),
                b = 0,
                e = c.length;
              b < e;
              ++b
            )
              (c[b]), this.renderNextFrame();
            return this.emit('start'), this.emit('progress', 0)
          }),
          (a.prototype.abort = function () {
            var a;
            while (!0) {
              if (((a = this.activeWorkers.shift()), !(null != a))) break
              console.log('killing active worker'), a.terminate();
            }
            return (this.running = !1), this.emit('abort')
          }),
          (a.prototype.spawnWorkers = function () {
            var a;
            return (
              (a = Math.min(this.options.workers, this.frames.length)),
              function () {
                var c;
                c = [];
                for (
                  var b = this.freeWorkers.length;
                  this.freeWorkers.length <= a ? b < a : b > a;
                  this.freeWorkers.length <= a ? ++b : --b
                )
                  c.push(b);
                return c
              }
                .apply(this, arguments)
                .forEach(
                  (function (a) {
                    return function (c) {
                      var b;
                      return (
                        console.log('spawning worker ' + c),
                        (b = new Worker(a.options.workerScript)),
                        (b.onmessage = (function (a) {
                          return function (c) {
                            return (
                              a.activeWorkers.splice(a.activeWorkers.indexOf(b), 1),
                              a.freeWorkers.push(b),
                              a.frameFinished(c.data)
                            )
                          }
                        })(a)),
                        a.freeWorkers.push(b)
                      )
                    }
                  })(this)
                ),
              a
            )
          }),
          (a.prototype.frameFinished = function (a) {
            return (
              console.log('frame ' + a.index + ' finished - ' + this.activeWorkers.length + ' active'),
              this.finishedFrames++,
              this.emit('progress', this.finishedFrames / this.frames.length),
              (this.imageParts[a.index] = a),
              j(null, this.imageParts) ? this.renderNextFrame() : this.finishRendering()
            )
          }),
          (a.prototype.finishRendering = function () {
            var e, a, k, m, b, d, h;
            b = 0;
            for (var f = 0, j = this.imageParts.length; f < j; ++f)
              (a = this.imageParts[f]), (b += (a.data.length - 1) * a.pageSize + a.cursor)
            ;(b += a.pageSize - a.cursor),
              console.log('rendering finished - filesize ' + Math.round(b / 1e3) + 'kb'),
              (e = new Uint8Array(b)),
              (d = 0);
            for (var g = 0, l = this.imageParts.length; g < l; ++g) {
              a = this.imageParts[g];
              for (var c = 0, i = a.data.length; c < i; ++c)
                (h = a.data[c]), (k = c), e.set(h, d), k === a.data.length - 1 ? (d += a.cursor) : (d += a.pageSize);
            }
            return (m = new Blob([e], { type: 'image/gif' })), this.emit('finished', m, e)
          }),
          (a.prototype.renderNextFrame = function () {
            var c, a, b;
            if (this.freeWorkers.length === 0) throw new Error('No free workers')
            return this.nextFrame >= this.frames.length
              ? void 0
              : ((c = this.frames[this.nextFrame++]),
                (b = this.freeWorkers.shift()),
                (a = this.getTask(c)),
                console.log('starting frame ' + (a.index + 1) + ' of ' + this.frames.length),
                this.activeWorkers.push(b),
                b.postMessage(a))
          }),
          (a.prototype.getContextData = function (a) {
            return a.getImageData(0, 0, this.options.width, this.options.height).data
          }),
          (a.prototype.getImageData = function (b) {
            var a;
            return (
              null != this._canvas ||
                ((this._canvas = document.createElement('canvas')),
                (this._canvas.width = this.options.width),
                (this._canvas.height = this.options.height)),
              (a = this._canvas.getContext('2d')),
              (a.setFill = this.options.background),
              a.fillRect(0, 0, this.options.width, this.options.height),
              a.drawImage(b, 0, 0),
              this.getContextData(a)
            )
          }),
          (a.prototype.getTask = function (a) {
            var c, b;
            if (
              ((c = this.frames.indexOf(a)),
              (b = {
                index: c,
                last: c === this.frames.length - 1,
                delay: a.delay,
                transparent: a.transparent,
                width: this.options.width,
                height: this.options.height,
                quality: this.options.quality,
                repeat: this.options.repeat,
                canTransfer: h.name === 'chrome',
              }),
              null != a.data)
            )
              b.data = a.data;
            else if (null != a.context) b.data = this.getContextData(a.context);
            else if (null != a.image) b.data = this.getImageData(a.image);
            else throw new Error('Invalid frame')
            return b
          }),
          a
        )
      })(f)),
      (d.exports = e);
  }),
    a.define('/browser.coffee', function (f, g, h, i) {
      var a, d, e, c, b
      ;(c = navigator.userAgent.toLowerCase()),
        (e = navigator.platform.toLowerCase()),
        (b = c.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [
          null,
          'unknown',
          0,
        ]),
        (d = b[1] === 'ie' && document.documentMode),
        (a = {
          name: b[1] === 'version' ? b[3] : b[1],
          version: d || parseFloat(b[1] === 'opera' && b[4] ? b[4] : b[2]),
          platform: {
            name: c.match(/ip(?:ad|od|hone)/)
              ? 'ios'
              : (c.match(/(?:webos|android)/) || e.match(/mac|win|linux/) || ['other'])[0],
          },
        }),
        (a[a.name] = !0),
        (a[a.name + parseInt(a.version, 10)] = !0),
        (a.platform[a.platform.name] = !0),
        (f.exports = a);
    }),
    a.define('events', function (f, e, g, h) {
      b.EventEmitter || (b.EventEmitter = function () {});
      var a = (e.EventEmitter = b.EventEmitter),
        c =
          typeof Array.isArray === 'function'
            ? Array.isArray
            : function (a) {
                return Object.prototype.toString.call(a) === '[object Array]'
              },
        d = 10
      ;(a.prototype.setMaxListeners = function (a) {
        this._events || (this._events = {}), (this._events.maxListeners = a);
      }),
        (a.prototype.emit = function (f) {
          if (
            f === 'error' &&
            (!(this._events && this._events.error) || (c(this._events.error) && !this._events.error.length))
          )
            throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.")
          if (!this._events) return !1
          var a = this._events[f];
          if (!a) return !1
          if (!(typeof a == 'function'))
            if (c(a)) {
              var b = Array.prototype.slice.call(arguments, 1),
                e = a.slice();
              for (var d = 0, g = e.length; d < g; d++) e[d].apply(this, b);
              return !0
            } else return !1
          switch (arguments.length) {
            case 1:
              a.call(this);
              break
            case 2:
              a.call(this, arguments[1]);
              break
            case 3:
              a.call(this, arguments[1], arguments[2]);
              break
            default:
              var b = Array.prototype.slice.call(arguments, 1);
              a.apply(this, b);
          }
          return !0
        }),
        (a.prototype.addListener = function (a, b) {
          if ('function' !== typeof b) throw new Error('addListener only takes instances of Function')
          if ((this._events || (this._events = {}), this.emit('newListener', a, b), !this._events[a]))
            this._events[a] = b;
          else if (c(this._events[a])) {
            if (!this._events[a].warned) {
              var e;
              this._events.maxListeners !== undefined ? (e = this._events.maxListeners) : (e = d),
                e &&
                  e > 0 &&
                  this._events[a].length > e &&
                  ((this._events[a].warned = !0),
                  console.error(
                    '(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',
                    this._events[a].length
                  ),
                  console.trace());
            }
            this._events[a].push(b);
          } else this._events[a] = [this._events[a], b];
          return this
        }),
        (a.prototype.on = a.prototype.addListener),
        (a.prototype.once = function (b, c) {
          var a = this;
          return (
            a.on(b, function d() {
              a.removeListener(b, d), c.apply(this, arguments);
            }),
            this
          )
        }),
        (a.prototype.removeListener = function (a, d) {
          if ('function' !== typeof d) throw new Error('removeListener only takes instances of Function')
          if (!(this._events && this._events[a])) return this
          var b = this._events[a];
          if (c(b)) {
            var e = b.indexOf(d);
            if (e < 0) return this
            b.splice(e, 1), b.length == 0 && delete this._events[a];
          } else this._events[a] === d && delete this._events[a];
          return this
        }),
        (a.prototype.removeAllListeners = function (a) {
          return a && this._events && this._events[a] && (this._events[a] = null), this
        }),
        (a.prototype.listeners = function (a) {
          return (
            this._events || (this._events = {}),
            this._events[a] || (this._events[a] = []),
            c(this._events[a]) || (this._events[a] = [this._events[a]]),
            this._events[a]
          )
        });
    }),
    (c.GIF = a('/gif.coffee'));
}.call(commonjsGlobal, commonjsGlobal));

// gif.js 0.1.6 - https://github.com/jnordberg/gif.js

var gif = {

};

var webmWriter0_2_0 = createCommonjsModule(function (module) {
(function () {

  
  /*
   * Create an ArrayBuffer of the given length and present it as a writable stream with methods
   * for writing data in different formats.
   */

  var ArrayBufferDataStream = function (length) {
    this.data = new Uint8Array(length);
    this.pos = 0;
  };

  ArrayBufferDataStream.prototype.seek = function (offset) {
    this.pos = offset;
  };

  ArrayBufferDataStream.prototype.writeBytes = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      this.data[this.pos++] = arr[i];
    }
  };

  ArrayBufferDataStream.prototype.writeByte = function (b) {
    this.data[this.pos++] = b;
  };

  //Synonym:
  ArrayBufferDataStream.prototype.writeU8 = ArrayBufferDataStream.prototype.writeByte;

  ArrayBufferDataStream.prototype.writeU16BE = function (u) {
    this.data[this.pos++] = u >> 8;
    this.data[this.pos++] = u;
  };

  ArrayBufferDataStream.prototype.writeDoubleBE = function (d) {
    var bytes = new Uint8Array(new Float64Array([d]).buffer);

    for (var i = bytes.length - 1; i >= 0; i--) {
      this.writeByte(bytes[i]);
    }
  };

  ArrayBufferDataStream.prototype.writeFloatBE = function (d) {
    var bytes = new Uint8Array(new Float32Array([d]).buffer);

    for (var i = bytes.length - 1; i >= 0; i--) {
      this.writeByte(bytes[i]);
    }
  };

  /**
   * Write an ASCII string to the stream
   */
  ArrayBufferDataStream.prototype.writeString = function (s) {
    for (var i = 0; i < s.length; i++) {
      this.data[this.pos++] = s.charCodeAt(i);
    }
  };

  /**
   * Write the given 32-bit integer to the stream as an EBML variable-length integer using the given byte width
   * (use measureEBMLVarInt).
   *
   * No error checking is performed to ensure that the supplied width is correct for the integer.
   *
   * @param i Integer to be written
   * @param width Number of bytes to write to the stream
   */
  ArrayBufferDataStream.prototype.writeEBMLVarIntWidth = function (i, width) {
    switch (width) {
      case 1:
        this.writeU8((1 << 7) | i);
        break
      case 2:
        this.writeU8((1 << 6) | (i >> 8));
        this.writeU8(i);
        break
      case 3:
        this.writeU8((1 << 5) | (i >> 16));
        this.writeU8(i >> 8);
        this.writeU8(i);
        break
      case 4:
        this.writeU8((1 << 4) | (i >> 24));
        this.writeU8(i >> 16);
        this.writeU8(i >> 8);
        this.writeU8(i);
        break
      case 5:
        /*
         * JavaScript converts its doubles to 32-bit integers for bitwise operations, so we need to do a
         * division by 2^32 instead of a right-shift of 32 to retain those top 3 bits
         */
        this.writeU8((1 << 3) | ((i / 4294967296) & 0x7));
        this.writeU8(i >> 24);
        this.writeU8(i >> 16);
        this.writeU8(i >> 8);
        this.writeU8(i);
        break
      default:
        throw new RuntimeException('Bad EBML VINT size ' + width)
    }
  };

  /**
   * Return the number of bytes needed to encode the given integer as an EBML VINT.
   */
  ArrayBufferDataStream.prototype.measureEBMLVarInt = function (val) {
    if (val < (1 << 7) - 1) {
      /* Top bit is set, leaving 7 bits to hold the integer, but we can't store 127 because
       * "all bits set to one" is a reserved value. Same thing for the other cases below:
       */
      return 1
    } else if (val < (1 << 14) - 1) {
      return 2
    } else if (val < (1 << 21) - 1) {
      return 3
    } else if (val < (1 << 28) - 1) {
      return 4
    } else if (val < 34359738367) {
      // 2 ^ 35 - 1 (can address 32GB)
      return 5
    } else {
      throw new RuntimeException('EBML VINT size not supported ' + val)
    }
  };

  ArrayBufferDataStream.prototype.writeEBMLVarInt = function (i) {
    this.writeEBMLVarIntWidth(i, this.measureEBMLVarInt(i));
  };

  /**
   * Write the given unsigned 32-bit integer to the stream in big-endian order using the given byte width.
   * No error checking is performed to ensure that the supplied width is correct for the integer.
   *
   * Omit the width parameter to have it determined automatically for you.
   *
   * @param u Unsigned integer to be written
   * @param width Number of bytes to write to the stream
   */
  ArrayBufferDataStream.prototype.writeUnsignedIntBE = function (u, width) {
    if (width === undefined) {
      width = this.measureUnsignedInt(u);
    }

    // Each case falls through:
    switch (width) {
      case 5:
        this.writeU8(Math.floor(u / 4294967296)); // Need to use division to access >32 bits of floating point var
      case 4:
        this.writeU8(u >> 24);
      case 3:
        this.writeU8(u >> 16);
      case 2:
        this.writeU8(u >> 8);
      case 1:
        this.writeU8(u);
        break
      default:
        throw new RuntimeException('Bad UINT size ' + width)
    }
  };

  /**
   * Return the number of bytes needed to hold the non-zero bits of the given unsigned integer.
   */
  ArrayBufferDataStream.prototype.measureUnsignedInt = function (val) {
    // Force to 32-bit unsigned integer
    if (val < 1 << 8) {
      return 1
    } else if (val < 1 << 16) {
      return 2
    } else if (val < 1 << 24) {
      return 3
    } else if (val < 4294967296) {
      return 4
    } else {
      return 5
    }
  };

  /**
   * Return a view on the portion of the buffer from the beginning to the current seek position as a Uint8Array.
   */
  ArrayBufferDataStream.prototype.getAsDataArray = function () {
    if (this.pos < this.data.byteLength) {
      return this.data.subarray(0, this.pos)
    } else if (this.pos == this.data.byteLength) {
      return this.data
    } else {
      throw "ArrayBufferDataStream's pos lies beyond end of buffer"
    }
  };

  window.ArrayBufferDataStream = ArrayBufferDataStream;

  /**
   * Allows a series of Blob-convertible objects (ArrayBuffer, Blob, String, etc) to be added to a buffer. Seeking and
   * overwriting of blobs is allowed.
   *
   * You can supply a FileWriter, in which case the BlobBuffer is just used as temporary storage before it writes it
   * through to the disk.
   *
   * By Nicholas Sherlock
   *
   * Released under the WTFPLv2 https://en.wikipedia.org/wiki/WTFPL
   */

  var BlobBuffer = (function (fs) {
    return function (destination) {
      var buffer = [],
        writePromise = Promise.resolve(),
        fileWriter = null,
        fd = null;

      if (typeof FileWriter !== 'undefined' && destination instanceof FileWriter) {
        fileWriter = destination;
      } else if (fs && destination) {
        fd = destination;
      }

      // Current seek offset
      this.pos = 0;

      // One more than the index of the highest byte ever written
      this.length = 0;

      // Returns a promise that converts the blob to an ArrayBuffer
      function readBlobAsBuffer(blob) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();

          reader.addEventListener('loadend', function () {
            resolve(reader.result);
          });

          reader.readAsArrayBuffer(blob);
        })
      }

      function convertToUint8Array(thing) {
        return new Promise(function (resolve, reject) {
          if (thing instanceof Uint8Array) {
            resolve(thing);
          } else if (thing instanceof ArrayBuffer || ArrayBuffer.isView(thing)) {
            resolve(new Uint8Array(thing));
          } else if (thing instanceof Blob) {
            resolve(
              readBlobAsBuffer(thing).then(function (buffer) {
                return new Uint8Array(buffer)
              })
            );
          } else {
            //Assume that Blob will know how to read this thing
            resolve(
              readBlobAsBuffer(new Blob([thing])).then(function (buffer) {
                return new Uint8Array(buffer)
              })
            );
          }
        })
      }

      function measureData(data) {
        var result = data.byteLength || data.length || data.size;

        if (!Number.isInteger(result)) {
          throw 'Failed to determine size of element'
        }

        return result
      }

      /**
       * Seek to the given absolute offset.
       *
       * You may not seek beyond the end of the file (this would create a hole and/or allow blocks to be written in non-
       * sequential order, which isn't currently supported by the memory buffer backend).
       */
      this.seek = function (offset) {
        if (offset < 0) {
          throw 'Offset may not be negative'
        }

        if (isNaN(offset)) {
          throw 'Offset may not be NaN'
        }

        if (offset > this.length) {
          throw 'Seeking beyond the end of file is not allowed'
        }

        this.pos = offset;
      };

      /**
       * Write the Blob-convertible data to the buffer at the current seek position.
       *
       * Note: If overwriting existing data, the write must not cross preexisting block boundaries (written data must
       * be fully contained by the extent of a previous write).
       */
      this.write = function (data) {
        var newEntry = {
            offset: this.pos,
            data: data,
            length: measureData(data),
          },
          isAppend = newEntry.offset >= this.length;

        this.pos += newEntry.length;
        this.length = Math.max(this.length, this.pos);

        // After previous writes complete, perform our write
        writePromise = writePromise.then(function () {
          if (fd) {
            return new Promise(function (resolve, reject) {
              convertToUint8Array(newEntry.data).then(function (dataArray) {
                Buffer.from(dataArray.buffer);

                // //fs.write(fd, buffer, 0, buffer.length, newEntry.offset, handleWriteComplete)
              });
            })
          } else if (fileWriter) {
            return new Promise(function (resolve, reject) {
              fileWriter.onwriteend = resolve;

              fileWriter.seek(newEntry.offset);
              fileWriter.write(new Blob([newEntry.data]));
            })
          } else if (!isAppend) {
            // We might be modifying a write that was already buffered in memory.

            // Slow linear search to find a block we might be overwriting
            for (var i = 0; i < buffer.length; i++) {
              var entry = buffer[i];

              // If our new entry overlaps the old one in any way...
              if (
                !(newEntry.offset + newEntry.length <= entry.offset || newEntry.offset >= entry.offset + entry.length)
              ) {
                if (newEntry.offset < entry.offset || newEntry.offset + newEntry.length > entry.offset + entry.length) {
                  throw new Error('Overwrite crosses blob boundaries')
                }

                if (newEntry.offset == entry.offset && newEntry.length == entry.length) {
                  // We overwrote the entire block
                  entry.data = newEntry.data;

                  // We're done
                  return
                } else {
                  return convertToUint8Array(entry.data)
                    .then(function (entryArray) {
                      entry.data = entryArray;

                      return convertToUint8Array(newEntry.data)
                    })
                    .then(function (newEntryArray) {
                      newEntry.data = newEntryArray;

                      entry.data.set(newEntry.data, newEntry.offset - entry.offset);
                    })
                }
              }
            }
            // Else fall through to do a simple append, as we didn't overwrite any pre-existing blocks
          }

          buffer.push(newEntry);
        });
      };

      /**
       * Finish all writes to the buffer, returning a promise that signals when that is complete.
       *
       * If a FileWriter was not provided, the promise is resolved with a Blob that represents the completed BlobBuffer
       * contents. You can optionally pass in a mimeType to be used for this blob.
       *
       * If a FileWriter was provided, the promise is resolved with null as the first argument.
       */
      this.complete = function (mimeType) {
        if (fd || fileWriter) {
          writePromise = writePromise.then(function () {
            return null
          });
        } else {
          // After writes complete we need to merge the buffer to give to the caller
          writePromise = writePromise.then(function () {
            var result = [];

            for (var i = 0; i < buffer.length; i++) {
              result.push(buffer[i].data);
            }

            return new Blob(result, { mimeType: mimeType })
          });
        }

        return writePromise
      };
    }
  })(null );

  window.BlobBuffer = BlobBuffer;

  /**
   * WebM video encoder for Google Chrome. This implementation is suitable for creating very large video files, because
   * it can stream Blobs directly to a FileWriter without buffering the entire video in memory.
   *
   * When FileWriter is not available or not desired, it can buffer the video in memory as a series of Blobs which are
   * eventually returned as one composite Blob.
   *
   * By Nicholas Sherlock.
   *
   * Based on the ideas from Whammy: https://github.com/antimatter15/whammy
   *
   * Released under the WTFPLv2 https://en.wikipedia.org/wiki/WTFPL
   */

  var WebMWriter = function (ArrayBufferDataStream, BlobBuffer) {
    function extend(base, top) {
      var target = {}

      ;[base, top].forEach(function (obj) {
        for (var prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            target[prop] = obj[prop];
          }
        }
      });

      return target
    }

    /**
     * Decode a Base64 data URL into a binary string.
     *
     * Returns the binary string, or false if the URL could not be decoded.
     */
    function decodeBase64WebPDataURL(url) {
      if (typeof url !== 'string' || !url.match(/^data:image\/webp;base64,/i)) {
        return false
      }

      return window.atob(url.substring('data:image/webp;base64,'.length))
    }

    /**
     * Convert the given canvas to a WebP encoded image and return the image data as a string.
     */
    function renderAsWebP(canvas, quality) {
      var frame = canvas.toDataURL('image/webp', { quality: quality });

      return decodeBase64WebPDataURL(frame)
    }

    function extractKeyframeFromWebP(webP) {
      // Assume that Chrome will generate a Simple Lossy WebP which has this header:
      var keyframeStartIndex = webP.indexOf('VP8 ');

      if (keyframeStartIndex == -1) {
        throw 'Failed to identify beginning of keyframe in WebP image'
      }

      // Skip the header and the 4 bytes that encode the length of the VP8 chunk
      keyframeStartIndex += 'VP8 '.length + 4;

      return webP.substring(keyframeStartIndex)
    }

    // Just a little utility so we can tag values as floats for the EBML encoder's benefit
    function EBMLFloat32(value) {
      this.value = value;
    }

    function EBMLFloat64(value) {
      this.value = value;
    }

    /**
     * Write the given EBML object to the provided ArrayBufferStream.
     *
     * The buffer's first byte is at bufferFileOffset inside the video file. This is used to complete offset and
     * dataOffset fields in each EBML structure, indicating the file offset of the first byte of the EBML element and
     * its data payload.
     */
    function writeEBML(buffer, bufferFileOffset, ebml) {
      // Is the ebml an array of sibling elements?
      if (Array.isArray(ebml)) {
        for (var i = 0; i < ebml.length; i++) {
          writeEBML(buffer, bufferFileOffset, ebml[i]);
        }
        // Is this some sort of raw data that we want to write directly?
      } else if (typeof ebml === 'string') {
        buffer.writeString(ebml);
      } else if (ebml instanceof Uint8Array) {
        buffer.writeBytes(ebml);
      } else if (ebml.id) {
        // We're writing an EBML element
        ebml.offset = buffer.pos + bufferFileOffset;

        buffer.writeUnsignedIntBE(ebml.id); // ID field

        // Now we need to write the size field, so we must know the payload size:

        if (Array.isArray(ebml.data)) {
          // Writing an array of child elements. We won't try to measure the size of the children up-front

          var sizePos, dataBegin, dataEnd;

          if (ebml.size === -1) {
            // Write the reserved all-one-bits marker to note that the size of this element is unknown/unbounded
            buffer.writeByte(0xff);
          } else {
            sizePos = buffer.pos;

            /* Write a dummy size field to overwrite later. 4 bytes allows an element maximum size of 256MB,
             * which should be plenty (we don't want to have to buffer that much data in memory at one time
             * anyway!)
             */
            buffer.writeBytes([0, 0, 0, 0]);
          }

          dataBegin = buffer.pos;

          ebml.dataOffset = dataBegin + bufferFileOffset;
          writeEBML(buffer, bufferFileOffset, ebml.data);

          if (ebml.size !== -1) {
            dataEnd = buffer.pos;

            ebml.size = dataEnd - dataBegin;

            buffer.seek(sizePos);
            buffer.writeEBMLVarIntWidth(ebml.size, 4); // Size field

            buffer.seek(dataEnd);
          }
        } else if (typeof ebml.data === 'string') {
          buffer.writeEBMLVarInt(ebml.data.length); // Size field
          ebml.dataOffset = buffer.pos + bufferFileOffset;
          buffer.writeString(ebml.data);
        } else if (typeof ebml.data === 'number') {
          // Allow the caller to explicitly choose the size if they wish by supplying a size field
          if (!ebml.size) {
            ebml.size = buffer.measureUnsignedInt(ebml.data);
          }

          buffer.writeEBMLVarInt(ebml.size); // Size field
          ebml.dataOffset = buffer.pos + bufferFileOffset;
          buffer.writeUnsignedIntBE(ebml.data, ebml.size);
        } else if (ebml.data instanceof EBMLFloat64) {
          buffer.writeEBMLVarInt(8); // Size field
          ebml.dataOffset = buffer.pos + bufferFileOffset;
          buffer.writeDoubleBE(ebml.data.value);
        } else if (ebml.data instanceof EBMLFloat32) {
          buffer.writeEBMLVarInt(4); // Size field
          ebml.dataOffset = buffer.pos + bufferFileOffset;
          buffer.writeFloatBE(ebml.data.value);
        } else if (ebml.data instanceof Uint8Array) {
          buffer.writeEBMLVarInt(ebml.data.byteLength); // Size field
          ebml.dataOffset = buffer.pos + bufferFileOffset;
          buffer.writeBytes(ebml.data);
        } else {
          throw 'Bad EBML datatype ' + typeof ebml.data
        }
      } else {
        throw 'Bad EBML datatype ' + typeof ebml.data
      }
    }

    return function (options) {
      var MAX_CLUSTER_DURATION_MSEC = 5000,
        DEFAULT_TRACK_NUMBER = 1,
        writtenHeader = false,
        videoWidth,
        videoHeight,
        clusterFrameBuffer = [],
        clusterStartTime = 0,
        clusterDuration = 0,
        optionDefaults = {
          quality: 0.95, // WebM image quality from 0.0 (worst) to 1.0 (best)
          fileWriter: null, // Chrome FileWriter in order to stream to a file instead of buffering to memory (optional)
          fd: null, // Node.JS file descriptor to write to instead of buffering (optional)

          // You must supply one of:
          frameDuration: null, // Duration of frames in milliseconds
          frameRate: null, // Number of frames per second
        },
        seekPoints = {
          Cues: { id: new Uint8Array([0x1c, 0x53, 0xbb, 0x6b]), positionEBML: null },
          SegmentInfo: { id: new Uint8Array([0x15, 0x49, 0xa9, 0x66]), positionEBML: null },
          Tracks: { id: new Uint8Array([0x16, 0x54, 0xae, 0x6b]), positionEBML: null },
        },
        ebmlSegment,
        segmentDuration = {
          id: 0x4489, // Duration
          data: new EBMLFloat64(0),
        },
        seekHead,
        cues = [],
        blobBuffer = new BlobBuffer(options.fileWriter || options.fd);

      function fileOffsetToSegmentRelative(fileOffset) {
        return fileOffset - ebmlSegment.dataOffset
      }

      /**
       * Create a SeekHead element with descriptors for the points in the global seekPoints array.
       *
       * 5 bytes of position values are reserved for each node, which lie at the offset point.positionEBML.dataOffset,
       * to be overwritten later.
       */
      function createSeekHead() {
        var seekPositionEBMLTemplate = {
            id: 0x53ac, // SeekPosition
            size: 5, // Allows for 32GB video files
            data: 0, // We'll overwrite this when the file is complete
          },
          result = {
            id: 0x114d9b74, // SeekHead
            data: [],
          };

        for (var name in seekPoints) {
          var seekPoint = seekPoints[name];

          seekPoint.positionEBML = Object.create(seekPositionEBMLTemplate);

          result.data.push({
            id: 0x4dbb, // Seek
            data: [
              {
                id: 0x53ab, // SeekID
                data: seekPoint.id,
              },
              seekPoint.positionEBML,
            ],
          });
        }

        return result
      }

      /**
       * Write the WebM file header to the stream.
       */
      function writeHeader() {
        seekHead = createSeekHead();

        var ebmlHeader = {
            id: 0x1a45dfa3, // EBML
            data: [
              {
                id: 0x4286, // EBMLVersion
                data: 1,
              },
              {
                id: 0x42f7, // EBMLReadVersion
                data: 1,
              },
              {
                id: 0x42f2, // EBMLMaxIDLength
                data: 4,
              },
              {
                id: 0x42f3, // EBMLMaxSizeLength
                data: 8,
              },
              {
                id: 0x4282, // DocType
                data: 'webm',
              },
              {
                id: 0x4287, // DocTypeVersion
                data: 2,
              },
              {
                id: 0x4285, // DocTypeReadVersion
                data: 2,
              },
            ],
          },
          segmentInfo = {
            id: 0x1549a966, // Info
            data: [
              {
                id: 0x2ad7b1, // TimecodeScale
                data: 1e6, // Times will be in miliseconds (1e6 nanoseconds per step = 1ms)
              },
              {
                id: 0x4d80, // MuxingApp
                data: 'webm-writer-js',
              },
              {
                id: 0x5741, // WritingApp
                data: 'webm-writer-js',
              },
              segmentDuration, // To be filled in later
            ],
          },
          tracks = {
            id: 0x1654ae6b, // Tracks
            data: [
              {
                id: 0xae, // TrackEntry
                data: [
                  {
                    id: 0xd7, // TrackNumber
                    data: DEFAULT_TRACK_NUMBER,
                  },
                  {
                    id: 0x73c5, // TrackUID
                    data: DEFAULT_TRACK_NUMBER,
                  },
                  {
                    id: 0x9c, // FlagLacing
                    data: 0,
                  },
                  {
                    id: 0x22b59c, // Language
                    data: 'und',
                  },
                  {
                    id: 0x86, // CodecID
                    data: 'V_VP8',
                  },
                  {
                    id: 0x258688, // CodecName
                    data: 'VP8',
                  },
                  {
                    id: 0x83, // TrackType
                    data: 1,
                  },
                  {
                    id: 0xe0, // Video
                    data: [
                      {
                        id: 0xb0, // PixelWidth
                        data: videoWidth,
                      },
                      {
                        id: 0xba, // PixelHeight
                        data: videoHeight,
                      },
                    ],
                  },
                ],
              },
            ],
          };

        ebmlSegment = {
          id: 0x18538067, // Segment
          size: -1, // Unbounded size
          data: [seekHead, segmentInfo, tracks],
        };

        var bufferStream = new ArrayBufferDataStream(256);

        writeEBML(bufferStream, blobBuffer.pos, [ebmlHeader, ebmlSegment]);
        blobBuffer.write(bufferStream.getAsDataArray());

        // Now we know where these top-level elements lie in the file:
        seekPoints.SegmentInfo.positionEBML.data = fileOffsetToSegmentRelative(segmentInfo.offset);
        seekPoints.Tracks.positionEBML.data = fileOffsetToSegmentRelative(tracks.offset);
      }

      /**
       * Create a SimpleBlock keyframe header using these fields:
       *     timecode    - Time of this keyframe
       *     trackNumber - Track number from 1 to 126 (inclusive)
       *     frame       - Raw frame data payload string
       *
       * Returns an EBML element.
       */
      function createKeyframeBlock(keyframe) {
        var bufferStream = new ArrayBufferDataStream(1 + 2 + 1);

        if (!(keyframe.trackNumber > 0 && keyframe.trackNumber < 127)) {
          throw 'TrackNumber must be > 0 and < 127'
        }

        bufferStream.writeEBMLVarInt(keyframe.trackNumber); // Always 1 byte since we limit the range of trackNumber
        bufferStream.writeU16BE(keyframe.timecode);

        // Flags byte
        bufferStream.writeByte(
          1 << 7 // Keyframe
        );

        return {
          id: 0xa3, // SimpleBlock
          data: [bufferStream.getAsDataArray(), keyframe.frame],
        }
      }

      /**
       * Create a Cluster node using these fields:
       *
       *    timecode    - Start time for the cluster
       *
       * Returns an EBML element.
       */
      function createCluster(cluster) {
        return {
          id: 0x1f43b675,
          data: [
            {
              id: 0xe7, // Timecode
              data: Math.round(cluster.timecode),
            },
          ],
        }
      }

      function addCuePoint(trackIndex, clusterTime, clusterFileOffset) {
        cues.push({
          id: 0xbb, // Cue
          data: [
            {
              id: 0xb3, // CueTime
              data: clusterTime,
            },
            {
              id: 0xb7, // CueTrackPositions
              data: [
                {
                  id: 0xf7, // CueTrack
                  data: trackIndex,
                },
                {
                  id: 0xf1, // CueClusterPosition
                  data: fileOffsetToSegmentRelative(clusterFileOffset),
                },
              ],
            },
          ],
        });
      }

      /**
       * Write a Cues element to the blobStream using the global `cues` array of CuePoints (use addCuePoint()).
       * The seek entry for the Cues in the SeekHead is updated.
       */
      function writeCues() {
        var ebml = {
            id: 0x1c53bb6b,
            data: cues,
          },
          cuesBuffer = new ArrayBufferDataStream(16 + cues.length * 32); // Pretty crude estimate of the buffer size we'll need

        writeEBML(cuesBuffer, blobBuffer.pos, ebml);
        blobBuffer.write(cuesBuffer.getAsDataArray());

        // Now we know where the Cues element has ended up, we can update the SeekHead
        seekPoints.Cues.positionEBML.data = fileOffsetToSegmentRelative(ebml.offset);
      }

      /**
       * Flush the frames in the current clusterFrameBuffer out to the stream as a Cluster.
       */
      function flushClusterFrameBuffer() {
        if (clusterFrameBuffer.length == 0) {
          return
        }

        // First work out how large of a buffer we need to hold the cluster data
        var rawImageSize = 0;

        for (var i = 0; i < clusterFrameBuffer.length; i++) {
          rawImageSize += clusterFrameBuffer[i].frame.length;
        }

        var buffer = new ArrayBufferDataStream(rawImageSize + clusterFrameBuffer.length * 32), // Estimate 32 bytes per SimpleBlock header
          cluster = createCluster({
            timecode: Math.round(clusterStartTime),
          });

        for (var i = 0; i < clusterFrameBuffer.length; i++) {
          cluster.data.push(createKeyframeBlock(clusterFrameBuffer[i]));
        }

        writeEBML(buffer, blobBuffer.pos, cluster);
        blobBuffer.write(buffer.getAsDataArray());

        addCuePoint(DEFAULT_TRACK_NUMBER, Math.round(clusterStartTime), cluster.offset);

        clusterFrameBuffer = [];
        clusterStartTime += clusterDuration;
        clusterDuration = 0;
      }

      function validateOptions() {
        // Derive frameDuration setting if not already supplied
        if (!options.frameDuration) {
          if (options.frameRate) {
            options.frameDuration = 1000 / options.frameRate;
          } else {
            throw 'Missing required frameDuration or frameRate setting'
          }
        }
      }

      function addFrameToCluster(frame) {
        frame.trackNumber = DEFAULT_TRACK_NUMBER;

        // Frame timecodes are relative to the start of their cluster:
        frame.timecode = Math.round(clusterDuration);

        clusterFrameBuffer.push(frame);

        clusterDuration += frame.duration;

        if (clusterDuration >= MAX_CLUSTER_DURATION_MSEC) {
          flushClusterFrameBuffer();
        }
      }

      /**
       * Rewrites the SeekHead element that was initially written to the stream with the offsets of top level elements.
       *
       * Call once writing is complete (so the offset of all top level elements is known).
       */
      function rewriteSeekHead() {
        var seekHeadBuffer = new ArrayBufferDataStream(seekHead.size),
          oldPos = blobBuffer.pos;

        // Write the rewritten SeekHead element's data payload to the stream (don't need to update the id or size)
        writeEBML(seekHeadBuffer, seekHead.dataOffset, seekHead.data);

        // And write that through to the file
        blobBuffer.seek(seekHead.dataOffset);
        blobBuffer.write(seekHeadBuffer.getAsDataArray());

        blobBuffer.seek(oldPos);
      }

      /**
       * Rewrite the Duration field of the Segment with the newly-discovered video duration.
       */
      function rewriteDuration() {
        var buffer = new ArrayBufferDataStream(8),
          oldPos = blobBuffer.pos;

        // Rewrite the data payload (don't need to update the id or size)
        buffer.writeDoubleBE(clusterStartTime);

        // And write that through to the file
        blobBuffer.seek(segmentDuration.dataOffset);
        blobBuffer.write(buffer.getAsDataArray());

        blobBuffer.seek(oldPos);
      }

      /**
       * Add a frame to the video. Currently the frame must be a Canvas element.
       */
      this.addFrame = function (canvas) {
        if (writtenHeader) {
          if (canvas.width != videoWidth || canvas.height != videoHeight) {
            throw 'Frame size differs from previous frames'
          }
        } else {
          videoWidth = canvas.width;
          videoHeight = canvas.height;

          writeHeader();
          writtenHeader = true;
        }

        var webP = renderAsWebP(canvas, { quality: options.quality });

        if (!webP) {
          throw "Couldn't decode WebP frame, does the browser support WebP?"
        }

        addFrameToCluster({
          frame: extractKeyframeFromWebP(webP),
          duration: options.frameDuration,
        });
      };

      /**
       * Finish writing the video and return a Promise to signal completion.
       *
       * If the destination device was memory (i.e. options.fileWriter was not supplied), the Promise is resolved with
       * a Blob with the contents of the entire video.
       */
      this.complete = function () {
        flushClusterFrameBuffer();

        writeCues();
        rewriteSeekHead();
        rewriteDuration();

        return blobBuffer.complete('video/webm')
      };

      this.getWrittenSize = function () {
        return blobBuffer.length
      };

      options = extend(optionDefaults, options || {});
      validateOptions();
    }
  };

  {
    module.exports = WebMWriter(ArrayBufferDataStream, BlobBuffer);
  }
})();
});

var CCapture = createCommonjsModule(function (module, exports) {
(function () {
  
  var Tar = tar ;
  var download$1 = download ;
  var GIF = gif.GIF ;
  var WebMWriter = webmWriter0_2_0 ;

  var objectTypes = {
    function: true,
    object: true,
  };

  function checkGlobal(value) {
    return value && value.Object === Object ? value : null
  }

  /** Detect free variable `exports`. */
  var freeExports = objectTypes['object'] && exports && !exports.nodeType ? exports : undefined;

  /** Detect free variable `module`. */
  var freeModule = objectTypes['object'] && module && !module.nodeType ? module : undefined;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports ? freeExports : undefined;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = checkGlobal(freeExports && freeModule && typeof commonjsGlobal == 'object' && commonjsGlobal);

  /** Detect free variable `self`. */
  var freeSelf = checkGlobal(objectTypes[typeof self] && self);

  /** Detect free variable `window`. */
  var freeWindow = checkGlobal(objectTypes[typeof window] && window);

  /** Detect `this` as the global object. */
  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root =
    freeGlobal ||
    (freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow) ||
    freeSelf ||
    thisGlobal ||
    Function('return this')();

  if (!('gc' in window)) {
    window.gc = function () {};
  }

  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
          len = binStr.length,
          arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], { type: type || 'image/png' }));
      },
    });
  }
(function () {
    if ('performance' in window == false) {
      window.performance = {};
    }

    Date.now =
      Date.now ||
      function () {
        // thanks IE8
        return new Date().getTime()
      };

    if ('now' in window.performance == false) {
      var nowOffset = Date.now();

      if (performance.timing && performance.timing.navigationStart) {
        nowOffset = performance.timing.navigationStart;
      }

      window.performance.now = function now() {
        return Date.now() - nowOffset
      };
    }
  })();

  function pad(n) {
    return String('0000000' + n).slice(-7)
  }
  // https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Timers

  var g_startTime = window.Date.now();

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }

  function CCFrameEncoder(settings) {
    var _handlers = {};

    this.settings = settings;

    this.on = function (event, handler) {
      _handlers[event] = handler;
    };

    this.emit = function (event) {
      var handler = _handlers[event];
      if (handler) {
        handler.apply(null, Array.prototype.slice.call(arguments, 1));
      }
    };

    this.filename = settings.name || guid();
    this.extension = '';
    this.mimeType = '';
  }

  CCFrameEncoder.prototype.start = function () {};
  CCFrameEncoder.prototype.stop = function () {};
  CCFrameEncoder.prototype.add = function () {};
  CCFrameEncoder.prototype.save = function () {};
  CCFrameEncoder.prototype.dispose = function () {};
  CCFrameEncoder.prototype.safeToProceed = function () {
    return true
  };
  CCFrameEncoder.prototype.step = function () {
    console.log('Step not set!');
  };

  function CCTarEncoder(settings) {
    CCFrameEncoder.call(this, settings);

    this.extension = '.tar';
    this.mimeType = 'application/x-tar';
    this.fileExtension = '';
    this.baseFilename = this.filename;

    this.tape = null;
    this.count = 0;
    this.part = 1;
    this.frames = 0;
  }

  CCTarEncoder.prototype = Object.create(CCFrameEncoder.prototype);

  CCTarEncoder.prototype.start = function () {
    this.dispose();
  };

  CCTarEncoder.prototype.add = function (blob) {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      this.tape.append(pad(this.count) + this.fileExtension, new Uint8Array(fileReader.result));

      if (this.settings.autoSaveTime > 0 && this.frames / this.settings.framerate >= this.settings.autoSaveTime) {
        this.save(
          function (blob) {
            this.filename = this.baseFilename + '-part-' + pad(this.part);
            download$1(blob, this.filename + this.extension, this.mimeType);
            var count = this.count;
            this.dispose();
            this.count = count + 1;
            this.part++;
            this.filename = this.baseFilename + '-part-' + pad(this.part);
            this.frames = 0;
            this.step();
          }.bind(this)
        );
      } else {
        this.count++;
        this.frames++;
        this.step();
      }
    }.bind(this);
    fileReader.readAsArrayBuffer(blob);
  };

  CCTarEncoder.prototype.save = function (callback) {
    callback(this.tape.save());
  };

  CCTarEncoder.prototype.dispose = function () {
    this.tape = new Tar();
    this.count = 0;
  };

  function CCPNGEncoder(settings) {
    CCTarEncoder.call(this, settings);

    this.type = 'image/png';
    this.fileExtension = '.png';
  }

  CCPNGEncoder.prototype = Object.create(CCTarEncoder.prototype);

  CCPNGEncoder.prototype.add = function (canvas) {
    canvas.toBlob(
      function (blob) {
        CCTarEncoder.prototype.add.call(this, blob);
      }.bind(this),
      this.type
    );
  };

  function CCJPEGEncoder(settings) {
    CCTarEncoder.call(this, settings);

    this.type = 'image/jpeg';
    this.fileExtension = '.jpg';
    this.quality = settings.quality / 100 || 0.8;
  }

  CCJPEGEncoder.prototype = Object.create(CCTarEncoder.prototype);

  CCJPEGEncoder.prototype.add = function (canvas) {
    canvas.toBlob(
      function (blob) {
        CCTarEncoder.prototype.add.call(this, blob);
      }.bind(this),
      this.type,
      this.quality
    );
  };

  /*

	WebM Encoder

*/

  function CCWebMEncoder(settings) {
    var canvas = document.createElement('canvas');
    if (canvas.toDataURL('image/webp').substr(5, 10) !== 'image/webp') {
      console.log('WebP not supported - try another export format');
    }

    CCFrameEncoder.call(this, settings);

    this.quality = settings.quality / 100 || 0.8;

    this.extension = '.webm';
    this.mimeType = 'video/webm';
    this.baseFilename = this.filename;
    this.framerate = settings.framerate;

    this.frames = 0;
    this.part = 1;

    this.videoWriter = new WebMWriter({
      quality: this.quality,
      fileWriter: null,
      fd: null,
      frameRate: this.framerate,
    });
  }

  CCWebMEncoder.prototype = Object.create(CCFrameEncoder.prototype);

  CCWebMEncoder.prototype.start = function (canvas) {
    this.dispose();
  };

  CCWebMEncoder.prototype.add = function (canvas) {
    this.videoWriter.addFrame(canvas);

    if (this.settings.autoSaveTime > 0 && this.frames / this.settings.framerate >= this.settings.autoSaveTime) {
      this.save(
        function (blob) {
          this.filename = this.baseFilename + '-part-' + pad(this.part);
          download$1(blob, this.filename + this.extension, this.mimeType);
          this.dispose();
          this.part++;
          this.filename = this.baseFilename + '-part-' + pad(this.part);
          this.step();
        }.bind(this)
      );
    } else {
      this.frames++;
      this.step();
    }
  };

  CCWebMEncoder.prototype.save = function (callback) {
    this.videoWriter.complete().then(callback);
  };

  CCWebMEncoder.prototype.dispose = function (canvas) {
    this.frames = 0;
    this.videoWriter = new WebMWriter({
      quality: this.quality,
      fileWriter: null,
      fd: null,
      frameRate: this.framerate,
    });
  };

  function CCFFMpegServerEncoder(settings) {
    CCFrameEncoder.call(this, settings);

    settings.quality = settings.quality / 100 || 0.8;

    this.encoder = new FFMpegServer.Video(settings);
    this.encoder.on(
      'process',
      function () {
        this.emit('process');
      }.bind(this)
    );
    this.encoder.on(
      'finished',
      function (url, size) {
        var cb = this.callback;
        if (cb) {
          this.callback = undefined;
          cb(url, size);
        }
      }.bind(this)
    );
    this.encoder.on(
      'progress',
      function (progress) {
        if (this.settings.onProgress) {
          this.settings.onProgress(progress);
        }
      }.bind(this)
    );
    this.encoder.on(
      'error',
      function (data) {
        alert(JSON.stringify(data, null, 2));
      }.bind(this)
    );
  }

  CCFFMpegServerEncoder.prototype = Object.create(CCFrameEncoder.prototype);

  CCFFMpegServerEncoder.prototype.start = function () {
    this.encoder.start(this.settings);
  };

  CCFFMpegServerEncoder.prototype.add = function (canvas) {
    this.encoder.add(canvas);
  };

  CCFFMpegServerEncoder.prototype.save = function (callback) {
    this.callback = callback;
    this.encoder.end();
  };

  CCFFMpegServerEncoder.prototype.safeToProceed = function () {
    return this.encoder.safeToProceed()
  };

  /*
	HTMLCanvasElement.captureStream()
*/

  function CCStreamEncoder(settings) {
    CCFrameEncoder.call(this, settings);

    this.framerate = this.settings.framerate;
    this.type = 'video/webm';
    this.extension = '.webm';
    this.stream = null;
    this.mediaRecorder = null;
    this.chunks = [];
  }

  CCStreamEncoder.prototype = Object.create(CCFrameEncoder.prototype);

  CCStreamEncoder.prototype.add = function (canvas) {
    if (!this.stream) {
      this.stream = canvas.captureStream(this.framerate);
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.start();

      this.mediaRecorder.ondataavailable = function (e) {
        this.chunks.push(e.data);
      }.bind(this);
    }
    this.step();
  };

  CCStreamEncoder.prototype.save = function (callback) {
    this.mediaRecorder.onstop = function (e) {
      var blob = new Blob(this.chunks, { type: 'video/webm' });
      this.chunks = [];
      callback(blob);
    }.bind(this);

    this.mediaRecorder.stop();
  };

  /*function CCGIFEncoder( settings ) {

	CCFrameEncoder.call( this );

	settings.quality = settings.quality || 6;
	this.settings = settings;

	this.encoder = new GIFEncoder();
	this.encoder.setRepeat( 1 );
  	this.encoder.setDelay( settings.step );
  	this.encoder.setQuality( 6 );
  	this.encoder.setTransparent( null );
  	this.encoder.setSize( 150, 150 );

  	this.canvas = document.createElement( 'canvas' );
  	this.ctx = this.canvas.getContext( '2d' );

}

CCGIFEncoder.prototype = Object.create( CCFrameEncoder );

CCGIFEncoder.prototype.start = function() {

	this.encoder.start();

}

CCGIFEncoder.prototype.add = function( canvas ) {

	this.canvas.width = canvas.width;
	this.canvas.height = canvas.height;
	this.ctx.drawImage( canvas, 0, 0 );
	this.encoder.addFrame( this.ctx );

	this.encoder.setSize( canvas.width, canvas.height );
	var readBuffer = new Uint8Array(canvas.width * canvas.height * 4);
	var context = canvas.getContext( 'webgl' );
	context.readPixels(0, 0, canvas.width, canvas.height, context.RGBA, context.UNSIGNED_BYTE, readBuffer);
	this.encoder.addFrame( readBuffer, true );

}

CCGIFEncoder.prototype.stop = function() {

	this.encoder.finish();

}

CCGIFEncoder.prototype.save = function( callback ) {

	var binary_gif = this.encoder.stream().getData();

	var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
	window.location = data_url;
	return;

	var blob = new Blob( [ binary_gif ], { type: "octet/stream" } );
	var url = window.URL.createObjectURL( blob );
	callback( url );

}*/

  function CCGIFEncoder(settings) {
    CCFrameEncoder.call(this, settings);

    settings.quality = 31 - ((settings.quality * 30) / 100 || 10);
    settings.workers = settings.workers || 4;

    this.extension = '.gif';
    this.mimeType = 'image/gif';

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.sizeSet = false;

    this.encoder = new GIF({
      workers: settings.workers,
      quality: settings.quality,
      workerScript: settings.workersPath + 'gif.worker.js',
    });

    this.encoder.on(
      'progress',
      function (progress) {
        if (this.settings.onProgress) {
          this.settings.onProgress(progress);
        }
      }.bind(this)
    );

    this.encoder.on(
      'finished',
      function (blob) {
        var cb = this.callback;
        if (cb) {
          this.callback = undefined;
          cb(blob);
        }
      }.bind(this)
    );
  }

  CCGIFEncoder.prototype = Object.create(CCFrameEncoder.prototype);

  CCGIFEncoder.prototype.add = function (canvas) {
    if (!this.sizeSet) {
      this.encoder.setOption('width', canvas.width);
      this.encoder.setOption('height', canvas.height);
      this.sizeSet = true;
    }

    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
    this.ctx.drawImage(canvas, 0, 0);

    this.encoder.addFrame(this.ctx, { copy: true, delay: this.settings.step });
    this.step();

    /*this.encoder.setSize( canvas.width, canvas.height );
	var readBuffer = new Uint8Array(canvas.width * canvas.height * 4);
	var context = canvas.getContext( 'webgl' );
	context.readPixels(0, 0, canvas.width, canvas.height, context.RGBA, context.UNSIGNED_BYTE, readBuffer);
	this.encoder.addFrame( readBuffer, true );*/
  };

  CCGIFEncoder.prototype.save = function (callback) {
    this.callback = callback;

    this.encoder.render();
  };

  function CCapture(settings) {
    var _settings = settings || {},
      _verbose,
      _time,
      _startTime,
      _performanceTime,
      _performanceStartTime,
      _step,
      _encoder,
      _timeouts = [],
      _intervals = [],
      _frameCount = 0,
      _intermediateFrameCount = 0,
      _requestAnimationFrameCallbacks = [],
      _capturing = false,
      _handlers = {};

    _settings.framerate = _settings.framerate || 60;
    _settings.motionBlurFrames = 2 * (_settings.motionBlurFrames || 1);
    _verbose = _settings.verbose || false;
    _settings.display || false;
    _settings.step = 1000.0 / _settings.framerate;
    _settings.timeLimit = _settings.timeLimit || 0;
    _settings.frameLimit = _settings.frameLimit || 0;
    _settings.startTime = _settings.startTime || 0;

    var _timeDisplay = document.createElement('div');
    _timeDisplay.style.position = 'absolute';
    _timeDisplay.style.left = _timeDisplay.style.top = 0;
    _timeDisplay.style.backgroundColor = 'black';
    _timeDisplay.style.fontFamily = 'monospace';
    _timeDisplay.style.fontSize = '11px';
    _timeDisplay.style.padding = '5px';
    _timeDisplay.style.color = 'red';
    _timeDisplay.style.zIndex = 100000;
    if (_settings.display) document.body.appendChild(_timeDisplay);

    var canvasMotionBlur = document.createElement('canvas');
    var ctxMotionBlur = canvasMotionBlur.getContext('2d');
    var bufferMotionBlur;
    var imageData;

    _log('Step is set to ' + _settings.step + 'ms');

    var _encoders = {
      gif: CCGIFEncoder,
      webm: CCWebMEncoder,
      ffmpegserver: CCFFMpegServerEncoder,
      png: CCPNGEncoder,
      jpg: CCJPEGEncoder,
      'webm-mediarecorder': CCStreamEncoder,
    };

    var ctor = _encoders[_settings.format];
    if (!ctor) {
      throw 'Error: Incorrect or missing format: Valid formats are ' + Object.keys(_encoders).join(', ')
    }
    _encoder = new ctor(_settings);
    _encoder.step = _step;

    _encoder.on('process', _process);
    _encoder.on('progress', _progress);

    if ('performance' in window == false) {
      window.performance = {};
    }

    Date.now =
      Date.now ||
      function () {
        // thanks IE8
        return new Date().getTime()
      };

    if ('now' in window.performance == false) {
      var nowOffset = Date.now();

      if (performance.timing && performance.timing.navigationStart) {
        nowOffset = performance.timing.navigationStart;
      }

      window.performance.now = function now() {
        return Date.now() - nowOffset
      };
    }

    var _oldSetTimeout = window.setTimeout,
      _oldSetInterval = window.setInterval,
      _oldClearInterval = window.clearInterval,
      _oldClearTimeout = window.clearTimeout,
      _oldRequestAnimationFrame = window.requestAnimationFrame,
      _oldNow = window.Date.now,
      _oldPerformanceNow = window.performance.now,
      _oldGetTime = window.Date.prototype.getTime;
    // Date.prototype._oldGetTime = Date.prototype.getTime;

    var media = [];

    function _init() {
      _log('Capturer start');

      _startTime = window.Date.now();
      _time = _startTime + _settings.startTime;
      _performanceStartTime = window.performance.now();
      _performanceTime = _performanceStartTime + _settings.startTime;

      window.Date.prototype.getTime = function () {
        return _time
      };
      window.Date.now = function () {
        return _time
      };

      window.setTimeout = function (callback, time) {
        var t = {
          callback: callback,
          time: time,
          triggerTime: _time + time,
        };
        _timeouts.push(t);
        _log('Timeout set to ' + t.time);
        return t
      };
      window.clearTimeout = function (id) {
        for (var j = 0; j < _timeouts.length; j++) {
          if (_timeouts[j] == id) {
            _timeouts.splice(j, 1);
            _log('Timeout cleared');
            continue
          }
        }
      };
      window.setInterval = function (callback, time) {
        var t = {
          callback: callback,
          time: time,
          triggerTime: _time + time,
        };
        _intervals.push(t);
        _log('Interval set to ' + t.time);
        return t
      };
      window.clearInterval = function (id) {
        _log('clear Interval');
        return null
      };
      window.requestAnimationFrame = function (callback) {
        _requestAnimationFrameCallbacks.push(callback);
      };
      window.performance.now = function () {
        return _performanceTime
      };

      function hookCurrentTime() {
        if (!this._hooked) {
          this._hooked = true;
          this._hookedTime = this.currentTime || 0;
          this.pause();
          media.push(this);
        }
        return this._hookedTime + _settings.startTime
      }

      try {
        Object.defineProperty(HTMLVideoElement.prototype, 'currentTime', { get: hookCurrentTime });
        Object.defineProperty(HTMLAudioElement.prototype, 'currentTime', { get: hookCurrentTime });
      } catch (err) {
        _log(err);
      }
    }

    function _start() {
      _init();
      _encoder.start();
      _capturing = true;
    }

    function _stop() {
      _capturing = false;
      _encoder.stop();
      _destroy();
    }

    function _call(fn, p) {
      _oldSetTimeout(fn, 0, p);
    }

    function _step() {
      //_oldRequestAnimationFrame( _process );
      _call(_process);
    }

    function _destroy() {
      _log('Capturer stop');
      window.setTimeout = _oldSetTimeout;
      window.setInterval = _oldSetInterval;
      window.clearInterval = _oldClearInterval;
      window.clearTimeout = _oldClearTimeout;
      window.requestAnimationFrame = _oldRequestAnimationFrame;
      window.Date.prototype.getTime = _oldGetTime;
      window.Date.now = _oldNow;
      window.performance.now = _oldPerformanceNow;
    }

    function _updateTime() {
      var seconds = _frameCount / _settings.framerate;
      if (
        (_settings.frameLimit && _frameCount >= _settings.frameLimit) ||
        (_settings.timeLimit && seconds >= _settings.timeLimit)
      ) {
        _stop();
        _save();
      }
      var d = new Date(null);
      d.setSeconds(seconds);
      if (_settings.motionBlurFrames > 2) {
        _timeDisplay.textContent =
          'CCapture ' +
          _settings.format +
          ' | ' +
          _frameCount +
          ' frames (' +
          _intermediateFrameCount +
          ' inter) | ' +
          d.toISOString().substr(11, 8);
      } else {
        _timeDisplay.textContent =
          'CCapture ' + _settings.format + ' | ' + _frameCount + ' frames | ' + d.toISOString().substr(11, 8);
      }
    }

    function _checkFrame(canvas) {
      if (canvasMotionBlur.width !== canvas.width || canvasMotionBlur.height !== canvas.height) {
        canvasMotionBlur.width = canvas.width;
        canvasMotionBlur.height = canvas.height;
        bufferMotionBlur = new Uint16Array(canvasMotionBlur.height * canvasMotionBlur.width * 4);
        ctxMotionBlur.fillStyle = '#0';
        ctxMotionBlur.fillRect(0, 0, canvasMotionBlur.width, canvasMotionBlur.height);
      }
    }

    function _blendFrame(canvas) {
      //_log( 'Intermediate Frame: ' + _intermediateFrameCount );

      ctxMotionBlur.drawImage(canvas, 0, 0);
      imageData = ctxMotionBlur.getImageData(0, 0, canvasMotionBlur.width, canvasMotionBlur.height);
      for (var j = 0; j < bufferMotionBlur.length; j += 4) {
        bufferMotionBlur[j] += imageData.data[j];
        bufferMotionBlur[j + 1] += imageData.data[j + 1];
        bufferMotionBlur[j + 2] += imageData.data[j + 2];
      }
      _intermediateFrameCount++;
    }

    function _saveFrame() {
      var data = imageData.data;
      for (var j = 0; j < bufferMotionBlur.length; j += 4) {
        data[j] = (bufferMotionBlur[j] * 2) / _settings.motionBlurFrames;
        data[j + 1] = (bufferMotionBlur[j + 1] * 2) / _settings.motionBlurFrames;
        data[j + 2] = (bufferMotionBlur[j + 2] * 2) / _settings.motionBlurFrames;
      }
      ctxMotionBlur.putImageData(imageData, 0, 0);
      _encoder.add(canvasMotionBlur);
      _frameCount++;
      _intermediateFrameCount = 0;
      _log('Full MB Frame! ' + _frameCount + ' ' + _time);
      for (var j = 0; j < bufferMotionBlur.length; j += 4) {
        bufferMotionBlur[j] = 0;
        bufferMotionBlur[j + 1] = 0;
        bufferMotionBlur[j + 2] = 0;
      }
      gc();
    }

    function _capture(canvas) {
      if (_capturing) {
        if (_settings.motionBlurFrames > 2) {
          _checkFrame(canvas);
          _blendFrame(canvas);

          if (_intermediateFrameCount >= 0.5 * _settings.motionBlurFrames) {
            _saveFrame();
          } else {
            _step();
          }
        } else {
          _encoder.add(canvas);
          _frameCount++;
          _log('Full Frame! ' + _frameCount);
        }
      }
    }

    function _process() {
      var step = 1000 / _settings.framerate;
      var dt = (_frameCount + _intermediateFrameCount / _settings.motionBlurFrames) * step;

      _time = _startTime + dt;
      _performanceTime = _performanceStartTime + dt;

      media.forEach(function (v) {
        v._hookedTime = dt / 1000;
      });

      _updateTime();
      _log('Frame: ' + _frameCount + ' ' + _intermediateFrameCount);

      for (var j = 0; j < _timeouts.length; j++) {
        if (_time >= _timeouts[j].triggerTime) {
          _call(_timeouts[j].callback);
          //console.log( 'timeout!' );
          _timeouts.splice(j, 1);
          continue
        }
      }

      for (var j = 0; j < _intervals.length; j++) {
        if (_time >= _intervals[j].triggerTime) {
          _call(_intervals[j].callback);
          _intervals[j].triggerTime += _intervals[j].time;
          //console.log( 'interval!' );
          continue
        }
      }

      _requestAnimationFrameCallbacks.forEach(function (cb) {
        _call(cb, _time - g_startTime);
      });
      _requestAnimationFrameCallbacks = [];
    }

    function _save(callback) {
      if (!callback) {
        callback = function (blob) {
          download$1(blob, _encoder.filename + _encoder.extension, _encoder.mimeType);
          return false
        };
      }
      _encoder.save(callback);
    }

    function _log(message) {
      if (_verbose) console.log(message);
    }

    function _on(event, handler) {
      _handlers[event] = handler;
    }

    function _emit(event) {
      var handler = _handlers[event];
      if (handler) {
        handler.apply(null, Array.prototype.slice.call(arguments, 1));
      }
    }

    function _progress(progress) {
      _emit('progress', progress);
    }

    return {
      start: _start,
      capture: _capture,
      stop: _stop,
      save: _save,
      on: _on,
    }
  }
(freeWindow || freeSelf || {}).CCapture = CCapture;

  // Some AMD build optimizers like r.js check for condition patterns like the following:
  if (freeExports && freeModule) {
    // Export for Node.js.
    if (moduleExports) {
(freeModule.exports = CCapture).CCapture = CCapture;
    }
    // Export for CommonJS support.
    freeExports.CCapture = CCapture;
  } else {
    // Export to the global object.
    root.CCapture = CCapture;
  }
})();
});

var CCapture$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), CCapture, {
	'default': CCapture,
	__moduleExports: CCapture
}));

exports.CCapture = CCapture$1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0NhcHR1cmUtNDVmMTFiY2MuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NjYXB0dXJlLmpzL3NyYy90YXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jY2FwdHVyZS5qcy9zcmMvZG93bmxvYWQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jY2FwdHVyZS5qcy9zcmMvZ2lmLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY2NhcHR1cmUuanMvc3JjL3dlYm0td3JpdGVyLTAuMi4wLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY2NhcHR1cmUuanMvc3JjL0NDYXB0dXJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgbG9va3VwID0gW1xuICAgICdBJyxcbiAgICAnQicsXG4gICAgJ0MnLFxuICAgICdEJyxcbiAgICAnRScsXG4gICAgJ0YnLFxuICAgICdHJyxcbiAgICAnSCcsXG4gICAgJ0knLFxuICAgICdKJyxcbiAgICAnSycsXG4gICAgJ0wnLFxuICAgICdNJyxcbiAgICAnTicsXG4gICAgJ08nLFxuICAgICdQJyxcbiAgICAnUScsXG4gICAgJ1InLFxuICAgICdTJyxcbiAgICAnVCcsXG4gICAgJ1UnLFxuICAgICdWJyxcbiAgICAnVycsXG4gICAgJ1gnLFxuICAgICdZJyxcbiAgICAnWicsXG4gICAgJ2EnLFxuICAgICdiJyxcbiAgICAnYycsXG4gICAgJ2QnLFxuICAgICdlJyxcbiAgICAnZicsXG4gICAgJ2cnLFxuICAgICdoJyxcbiAgICAnaScsXG4gICAgJ2onLFxuICAgICdrJyxcbiAgICAnbCcsXG4gICAgJ20nLFxuICAgICduJyxcbiAgICAnbycsXG4gICAgJ3AnLFxuICAgICdxJyxcbiAgICAncicsXG4gICAgJ3MnLFxuICAgICd0JyxcbiAgICAndScsXG4gICAgJ3YnLFxuICAgICd3JyxcbiAgICAneCcsXG4gICAgJ3knLFxuICAgICd6JyxcbiAgICAnMCcsXG4gICAgJzEnLFxuICAgICcyJyxcbiAgICAnMycsXG4gICAgJzQnLFxuICAgICc1JyxcbiAgICAnNicsXG4gICAgJzcnLFxuICAgICc4JyxcbiAgICAnOScsXG4gICAgJysnLFxuICAgICcvJyxcbiAgXVxuICBmdW5jdGlvbiBjbGVhbihsZW5ndGgpIHtcbiAgICB2YXIgaSxcbiAgICAgIGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJ1ZmZlcltpXSA9IDBcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlclxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kKG9yaWcsIGxlbmd0aCwgYWRkTGVuZ3RoLCBtdWx0aXBsZU9mKSB7XG4gICAgdmFyIG5ld1NpemUgPSBsZW5ndGggKyBhZGRMZW5ndGgsXG4gICAgICBidWZmZXIgPSBjbGVhbigocGFyc2VJbnQobmV3U2l6ZSAvIG11bHRpcGxlT2YpICsgMSkgKiBtdWx0aXBsZU9mKVxuXG4gICAgYnVmZmVyLnNldChvcmlnKVxuXG4gICAgcmV0dXJuIGJ1ZmZlclxuICB9XG5cbiAgZnVuY3Rpb24gcGFkKG51bSwgYnl0ZXMsIGJhc2UpIHtcbiAgICBudW0gPSBudW0udG9TdHJpbmcoYmFzZSB8fCA4KVxuICAgIHJldHVybiAnMDAwMDAwMDAwMDAwJy5zdWJzdHIobnVtLmxlbmd0aCArIDEyIC0gYnl0ZXMpICsgbnVtXG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdUb1VpbnQ4KGlucHV0LCBvdXQsIG9mZnNldCkge1xuICAgIHZhciBpLCBsZW5ndGhcblxuICAgIG91dCA9IG91dCB8fCBjbGVhbihpbnB1dC5sZW5ndGgpXG5cbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMFxuICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBvdXRbb2Zmc2V0XSA9IGlucHV0LmNoYXJDb2RlQXQoaSlcbiAgICAgIG9mZnNldCArPSAxXG4gICAgfVxuXG4gICAgcmV0dXJuIG91dFxuICB9XG5cbiAgZnVuY3Rpb24gdWludDhUb0Jhc2U2NCh1aW50OCkge1xuICAgIHZhciBpLFxuICAgICAgZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gICAgICBvdXRwdXQgPSAnJyxcbiAgICAgIHRlbXAsXG4gICAgICBsZW5ndGhcblxuICAgIGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NChudW0pIHtcbiAgICAgIHJldHVybiBsb29rdXBbKG51bSA+PiAxOCkgJiAweDNmXSArIGxvb2t1cFsobnVtID4+IDEyKSAmIDB4M2ZdICsgbG9va3VwWyhudW0gPj4gNikgJiAweDNmXSArIGxvb2t1cFtudW0gJiAweDNmXVxuICAgIH1cblxuICAgIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgIHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArIHVpbnQ4W2kgKyAyXVxuICAgICAgb3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuICAgIH1cblxuICAgIC8vIHRoaXMgcHJldmVudHMgYW4gRVJSX0lOVkFMSURfVVJMIGluIENocm9tZSAoRmlyZWZveCBva2F5KVxuICAgIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgb3V0cHV0ICs9ICc9J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBvdXRwdXQgKz0gJz09J1xuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICB3aW5kb3cudXRpbHMgPSB7fVxuICB3aW5kb3cudXRpbHMuY2xlYW4gPSBjbGVhblxuICB3aW5kb3cudXRpbHMucGFkID0gcGFkXG4gIHdpbmRvdy51dGlscy5leHRlbmQgPSBleHRlbmRcbiAgd2luZG93LnV0aWxzLnN0cmluZ1RvVWludDggPSBzdHJpbmdUb1VpbnQ4XG4gIHdpbmRvdy51dGlscy51aW50OFRvQmFzZTY0ID0gdWludDhUb0Jhc2U2NFxufSkoKVxuXG47KGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgLypcbnN0cnVjdCBwb3NpeF9oZWFkZXIgeyAgICAgICAgICAgICAvLyBieXRlIG9mZnNldFxuXHRjaGFyIG5hbWVbMTAwXTsgICAgICAgICAgICAgICAvLyAgIDBcblx0Y2hhciBtb2RlWzhdOyAgICAgICAgICAgICAgICAgLy8gMTAwXG5cdGNoYXIgdWlkWzhdOyAgICAgICAgICAgICAgICAgIC8vIDEwOFxuXHRjaGFyIGdpZFs4XTsgICAgICAgICAgICAgICAgICAvLyAxMTZcblx0Y2hhciBzaXplWzEyXTsgICAgICAgICAgICAgICAgLy8gMTI0XG5cdGNoYXIgbXRpbWVbMTJdOyAgICAgICAgICAgICAgIC8vIDEzNlxuXHRjaGFyIGNoa3N1bVs4XTsgICAgICAgICAgICAgICAvLyAxNDhcblx0Y2hhciB0eXBlZmxhZzsgICAgICAgICAgICAgICAgLy8gMTU2XG5cdGNoYXIgbGlua25hbWVbMTAwXTsgICAgICAgICAgIC8vIDE1N1xuXHRjaGFyIG1hZ2ljWzZdOyAgICAgICAgICAgICAgICAvLyAyNTdcblx0Y2hhciB2ZXJzaW9uWzJdOyAgICAgICAgICAgICAgLy8gMjYzXG5cdGNoYXIgdW5hbWVbMzJdOyAgICAgICAgICAgICAgIC8vIDI2NVxuXHRjaGFyIGduYW1lWzMyXTsgICAgICAgICAgICAgICAvLyAyOTdcblx0Y2hhciBkZXZtYWpvcls4XTsgICAgICAgICAgICAgLy8gMzI5XG5cdGNoYXIgZGV2bWlub3JbOF07ICAgICAgICAgICAgIC8vIDMzN1xuXHRjaGFyIHByZWZpeFsxNTVdOyAgICAgICAgICAgICAvLyAzNDVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA1MDBcbn07XG4qL1xuXG4gIHZhciB1dGlscyA9IHdpbmRvdy51dGlscyxcbiAgICBoZWFkZXJGb3JtYXRcblxuICBoZWFkZXJGb3JtYXQgPSBbXG4gICAge1xuICAgICAgZmllbGQ6ICdmaWxlTmFtZScsXG4gICAgICBsZW5ndGg6IDEwMCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZpZWxkOiAnZmlsZU1vZGUnLFxuICAgICAgbGVuZ3RoOiA4LFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICd1aWQnLFxuICAgICAgbGVuZ3RoOiA4LFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdnaWQnLFxuICAgICAgbGVuZ3RoOiA4LFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdmaWxlU2l6ZScsXG4gICAgICBsZW5ndGg6IDEyLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdtdGltZScsXG4gICAgICBsZW5ndGg6IDEyLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdjaGVja3N1bScsXG4gICAgICBsZW5ndGg6IDgsXG4gICAgfSxcbiAgICB7XG4gICAgICBmaWVsZDogJ3R5cGUnLFxuICAgICAgbGVuZ3RoOiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdsaW5rTmFtZScsXG4gICAgICBsZW5ndGg6IDEwMCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZpZWxkOiAndXN0YXInLFxuICAgICAgbGVuZ3RoOiA4LFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdvd25lcicsXG4gICAgICBsZW5ndGg6IDMyLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdncm91cCcsXG4gICAgICBsZW5ndGg6IDMyLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdtYWpvck51bWJlcicsXG4gICAgICBsZW5ndGg6IDgsXG4gICAgfSxcbiAgICB7XG4gICAgICBmaWVsZDogJ21pbm9yTnVtYmVyJyxcbiAgICAgIGxlbmd0aDogOCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZpZWxkOiAnZmlsZW5hbWVQcmVmaXgnLFxuICAgICAgbGVuZ3RoOiAxNTUsXG4gICAgfSxcbiAgICB7XG4gICAgICBmaWVsZDogJ3BhZGRpbmcnLFxuICAgICAgbGVuZ3RoOiAxMixcbiAgICB9LFxuICBdXG5cbiAgZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGRhdGEsIGNiKSB7XG4gICAgdmFyIGJ1ZmZlciA9IHV0aWxzLmNsZWFuKDUxMiksXG4gICAgICBvZmZzZXQgPSAwXG5cbiAgICBoZWFkZXJGb3JtYXQuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHZhciBzdHIgPSBkYXRhW3ZhbHVlLmZpZWxkXSB8fCAnJyxcbiAgICAgICAgaSxcbiAgICAgICAgbGVuZ3RoXG5cbiAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IHN0ci5sZW5ndGg7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBidWZmZXJbb2Zmc2V0XSA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgICAgIG9mZnNldCArPSAxXG4gICAgICB9XG5cbiAgICAgIG9mZnNldCArPSB2YWx1ZS5sZW5ndGggLSBpIC8vIHNwYWNlIGl0IG91dCB3aXRoIG51bGxzXG4gICAgfSlcblxuICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjYihidWZmZXIsIG9mZnNldClcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlclxuICB9XG5cbiAgd2luZG93LmhlYWRlciA9IHt9XG4gIHdpbmRvdy5oZWFkZXIuc3RydWN0dXJlID0gaGVhZGVyRm9ybWF0XG4gIHdpbmRvdy5oZWFkZXIuZm9ybWF0ID0gZm9ybWF0SGVhZGVyXG59KSgpXG5cbjsoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgaGVhZGVyID0gd2luZG93LmhlYWRlcixcbiAgICB1dGlscyA9IHdpbmRvdy51dGlscyxcbiAgICByZWNvcmRTaXplID0gNTEyLFxuICAgIGJsb2NrU2l6ZVxuXG4gIGZ1bmN0aW9uIFRhcihyZWNvcmRzUGVyQmxvY2spIHtcbiAgICB0aGlzLndyaXR0ZW4gPSAwXG4gICAgYmxvY2tTaXplID0gKHJlY29yZHNQZXJCbG9jayB8fCAyMCkgKiByZWNvcmRTaXplXG4gICAgdGhpcy5vdXQgPSB1dGlscy5jbGVhbihibG9ja1NpemUpXG4gICAgdGhpcy5ibG9ja3MgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG5cbiAgVGFyLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoZmlsZXBhdGgsIGlucHV0LCBvcHRzLCBjYWxsYmFjaykge1xuICAgIHZhciBkYXRhLCBjaGVja3N1bSwgbW9kZSwgbXRpbWUsIHVpZCwgZ2lkLCBoZWFkZXJBcnJcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpbnB1dCA9IHV0aWxzLnN0cmluZ1RvVWludDgoaW5wdXQpXG4gICAgfSBlbHNlIGlmIChpbnB1dC5jb25zdHJ1Y3RvciAhPT0gVWludDhBcnJheS5wcm90b3R5cGUuY29uc3RydWN0b3IpIHtcbiAgICAgIHRocm93IChcbiAgICAgICAgJ0ludmFsaWQgaW5wdXQgdHlwZS4gWW91IGdhdmUgbWU6ICcgK1xuICAgICAgICBpbnB1dC5jb25zdHJ1Y3Rvci50b1N0cmluZygpLm1hdGNoKC9mdW5jdGlvblxccyooWyRBLVphLXpfXVswLTlBLVphLXpfXSopXFxzKlxcKC8pWzFdXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHNcbiAgICAgIG9wdHMgPSB7fVxuICAgIH1cblxuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICBtb2RlID0gb3B0cy5tb2RlIHx8IHBhcnNlSW50KCc3NzcnLCA4KSAmIDB4ZmZmXG4gICAgbXRpbWUgPSBvcHRzLm10aW1lIHx8IE1hdGguZmxvb3IoK25ldyBEYXRlKCkgLyAxMDAwKVxuICAgIHVpZCA9IG9wdHMudWlkIHx8IDBcbiAgICBnaWQgPSBvcHRzLmdpZCB8fCAwXG5cbiAgICBkYXRhID0ge1xuICAgICAgZmlsZU5hbWU6IGZpbGVwYXRoLFxuICAgICAgZmlsZU1vZGU6IHV0aWxzLnBhZChtb2RlLCA3KSxcbiAgICAgIHVpZDogdXRpbHMucGFkKHVpZCwgNyksXG4gICAgICBnaWQ6IHV0aWxzLnBhZChnaWQsIDcpLFxuICAgICAgZmlsZVNpemU6IHV0aWxzLnBhZChpbnB1dC5sZW5ndGgsIDExKSxcbiAgICAgIG10aW1lOiB1dGlscy5wYWQobXRpbWUsIDExKSxcbiAgICAgIGNoZWNrc3VtOiAnICAgICAgICAnLFxuICAgICAgdHlwZTogJzAnLCAvLyBqdXN0IGEgZmlsZVxuICAgICAgdXN0YXI6ICd1c3RhciAgJyxcbiAgICAgIG93bmVyOiBvcHRzLm93bmVyIHx8ICcnLFxuICAgICAgZ3JvdXA6IG9wdHMuZ3JvdXAgfHwgJycsXG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBjaGVja3N1bVxuICAgIGNoZWNrc3VtID0gMFxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIGksXG4gICAgICAgIHZhbHVlID0gZGF0YVtrZXldLFxuICAgICAgICBsZW5ndGhcblxuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY2hlY2tzdW0gKz0gdmFsdWUuY2hhckNvZGVBdChpKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBkYXRhLmNoZWNrc3VtID0gdXRpbHMucGFkKGNoZWNrc3VtLCA2KSArICdcXHUwMDAwICdcblxuICAgIGhlYWRlckFyciA9IGhlYWRlci5mb3JtYXQoZGF0YSlcblxuICAgIHZhciBoZWFkZXJMZW5ndGggPSBNYXRoLmNlaWwoaGVhZGVyQXJyLmxlbmd0aCAvIHJlY29yZFNpemUpICogcmVjb3JkU2l6ZVxuICAgIHZhciBpbnB1dExlbmd0aCA9IE1hdGguY2VpbChpbnB1dC5sZW5ndGggLyByZWNvcmRTaXplKSAqIHJlY29yZFNpemVcblxuICAgIHRoaXMuYmxvY2tzLnB1c2goeyBoZWFkZXI6IGhlYWRlckFyciwgaW5wdXQ6IGlucHV0LCBoZWFkZXJMZW5ndGg6IGhlYWRlckxlbmd0aCwgaW5wdXRMZW5ndGg6IGlucHV0TGVuZ3RoIH0pXG4gIH1cblxuICBUYXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJ1ZmZlcnMgPSBbXVxuICAgIHZhciBjaHVua3MgPSBbXVxuICAgIHZhciBsZW5ndGggPSAwXG4gICAgdmFyIG1heCA9IE1hdGgucG93KDIsIDIwKVxuXG4gICAgdmFyIGNodW5rID0gW11cbiAgICB0aGlzLmJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7XG4gICAgICBpZiAobGVuZ3RoICsgYi5oZWFkZXJMZW5ndGggKyBiLmlucHV0TGVuZ3RoID4gbWF4KSB7XG4gICAgICAgIGNodW5rcy5wdXNoKHsgYmxvY2tzOiBjaHVuaywgbGVuZ3RoOiBsZW5ndGggfSlcbiAgICAgICAgY2h1bmsgPSBbXVxuICAgICAgICBsZW5ndGggPSAwXG4gICAgICB9XG4gICAgICBjaHVuay5wdXNoKGIpXG4gICAgICBsZW5ndGggKz0gYi5oZWFkZXJMZW5ndGggKyBiLmlucHV0TGVuZ3RoXG4gICAgfSlcbiAgICBjaHVua3MucHVzaCh7IGJsb2NrczogY2h1bmssIGxlbmd0aDogbGVuZ3RoIH0pXG5cbiAgICBjaHVua3MuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGMubGVuZ3RoKVxuICAgICAgdmFyIHdyaXR0ZW4gPSAwXG4gICAgICBjLmJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7XG4gICAgICAgIGJ1ZmZlci5zZXQoYi5oZWFkZXIsIHdyaXR0ZW4pXG4gICAgICAgIHdyaXR0ZW4gKz0gYi5oZWFkZXJMZW5ndGhcbiAgICAgICAgYnVmZmVyLnNldChiLmlucHV0LCB3cml0dGVuKVxuICAgICAgICB3cml0dGVuICs9IGIuaW5wdXRMZW5ndGhcbiAgICAgIH0pXG4gICAgICBidWZmZXJzLnB1c2goYnVmZmVyKVxuICAgIH0pXG5cbiAgICBidWZmZXJzLnB1c2gobmV3IFVpbnQ4QXJyYXkoMiAqIHJlY29yZFNpemUpKVxuXG4gICAgcmV0dXJuIG5ldyBCbG9iKGJ1ZmZlcnMsIHsgdHlwZTogJ29jdGV0L3N0cmVhbScgfSlcbiAgfVxuXG4gIFRhci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy53cml0dGVuID0gMFxuICAgIHRoaXMub3V0ID0gdXRpbHMuY2xlYW4oYmxvY2tTaXplKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFRhclxuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5UYXIgPSBUYXJcbiAgfVxufSkoKVxuIiwiLy9kb3dubG9hZC5qcyB2NC4yMSwgYnkgZGFuZGF2aXM7IDIwMDgtMjAxOC4gW01JVF0gc2VlIGh0dHA6Ly9kYW5tbC5jb20vZG93bmxvYWQuaHRtbCBmb3IgdGVzdHMvdXNhZ2Vcbi8vIHYxIGxhbmRlZCBhIEZGK0Nocm9tZSBjb21wYXRpYmxlIHdheSBvZiBkb3dubG9hZGluZyBzdHJpbmdzIHRvIGxvY2FsIHVuLW5hbWVkIGZpbGVzLCB1cGdyYWRlZCB0byB1c2UgYSBoaWRkZW4gZnJhbWUgYW5kIG9wdGlvbmFsIG1pbWVcbi8vIHYyIGFkZGVkIG5hbWVkIGZpbGVzIHZpYSBhW2Rvd25sb2FkXSwgbXNTYXZlQmxvYiwgSUUgKDEwKykgc3VwcG9ydCwgYW5kIHdpbmRvdy5VUkwgc3VwcG9ydCBmb3IgbGFyZ2VyK2Zhc3RlciBzYXZlcyB0aGFuIGRhdGFVUkxzXG4vLyB2MyBhZGRlZCBkYXRhVVJMIGFuZCBCbG9iIElucHV0LCBiaW5kLXRvZ2dsZSBhcml0eSwgYW5kIGxlZ2FjeSBkYXRhVVJMIGZhbGxiYWNrIHdhcyBpbXByb3ZlZCB3aXRoIGZvcmNlLWRvd25sb2FkIG1pbWUgYW5kIGJhc2U2NCBzdXBwb3J0LiAzLjEgaW1wcm92ZWQgc2FmYXJpIGhhbmRsaW5nLlxuLy8gdjQgYWRkcyBBTUQvVU1ELCBjb21tb25KUywgYW5kIHBsYWluIGJyb3dzZXIgc3VwcG9ydFxuLy8gdjQuMSBhZGRzIHVybCBkb3dubG9hZCBjYXBhYmlsaXR5IHZpYSBzb2xvIFVSTCBhcmd1bWVudCAoc2FtZSBkb21haW4vQ09SUyBvbmx5KVxuLy8gdjQuMiBhZGRzIHNlbWFudGljIHZhcmlhYmxlIG5hbWVzLCBsb25nIChvdmVyIDJNQikgZGF0YVVSTCBzdXBwb3J0LCBhbmQgaGlkZGVuIGJ5IGRlZmF1bHQgdGVtcCBhbmNob3JzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcm5kbWUvZG93bmxvYWRcblxuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbXSwgZmFjdG9yeSlcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAvLyBsaWtlIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIHJvb3QuZG93bmxvYWQgPSBmYWN0b3J5KClcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZG93bmxvYWQoZGF0YSwgc3RyRmlsZU5hbWUsIHN0ck1pbWVUeXBlKSB7XG4gICAgdmFyIHNlbGYgPSB3aW5kb3csIC8vIHRoaXMgc2NyaXB0IGlzIG9ubHkgZm9yIGJyb3dzZXJzIGFueXdheS4uLlxuICAgICAgZGVmYXVsdE1pbWUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJywgLy8gdGhpcyBkZWZhdWx0IG1pbWUgYWxzbyB0cmlnZ2VycyBpZnJhbWUgZG93bmxvYWRzXG4gICAgICBtaW1lVHlwZSA9IHN0ck1pbWVUeXBlIHx8IGRlZmF1bHRNaW1lLFxuICAgICAgcGF5bG9hZCA9IGRhdGEsXG4gICAgICB1cmwgPSAhc3RyRmlsZU5hbWUgJiYgIXN0ck1pbWVUeXBlICYmIHBheWxvYWQsXG4gICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXG4gICAgICB0b1N0cmluZyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoYSlcbiAgICAgIH0sXG4gICAgICBteUJsb2IgPSBzZWxmLkJsb2IgfHwgc2VsZi5Nb3pCbG9iIHx8IHNlbGYuV2ViS2l0QmxvYiB8fCB0b1N0cmluZyxcbiAgICAgIGZpbGVOYW1lID0gc3RyRmlsZU5hbWUgfHwgJ2Rvd25sb2FkJyxcbiAgICAgIGJsb2IsXG4gICAgICByZWFkZXJcbiAgICBteUJsb2IgPSBteUJsb2IuY2FsbCA/IG15QmxvYi5iaW5kKHNlbGYpIDogQmxvYlxuXG4gICAgaWYgKFN0cmluZyh0aGlzKSA9PT0gJ3RydWUnKSB7XG4gICAgICAvL3JldmVyc2UgYXJndW1lbnRzLCBhbGxvd2luZyBkb3dubG9hZC5iaW5kKHRydWUsIFwidGV4dC94bWxcIiwgXCJleHBvcnQueG1sXCIpIHRvIGFjdCBhcyBhIGNhbGxiYWNrXG4gICAgICBwYXlsb2FkID0gW3BheWxvYWQsIG1pbWVUeXBlXVxuICAgICAgbWltZVR5cGUgPSBwYXlsb2FkWzBdXG4gICAgICBwYXlsb2FkID0gcGF5bG9hZFsxXVxuICAgIH1cblxuICAgIGlmICh1cmwgJiYgdXJsLmxlbmd0aCA8IDIwNDgpIHtcbiAgICAgIC8vIGlmIG5vIGZpbGVuYW1lIGFuZCBubyBtaW1lLCBhc3N1bWUgYSB1cmwgd2FzIHBhc3NlZCBhcyB0aGUgb25seSBhcmd1bWVudFxuICAgICAgZmlsZU5hbWUgPSB1cmwuc3BsaXQoJy8nKS5wb3AoKS5zcGxpdCgnPycpWzBdXG4gICAgICBhbmNob3IuaHJlZiA9IHVybCAvLyBhc3NpZ24gaHJlZiBwcm9wIHRvIHRlbXAgYW5jaG9yXG4gICAgICBpZiAoYW5jaG9yLmhyZWYuaW5kZXhPZih1cmwpICE9PSAtMSkge1xuICAgICAgICAvLyBpZiB0aGUgYnJvd3NlciBkZXRlcm1pbmVzIHRoYXQgaXQncyBhIHBvdGVudGlhbGx5IHZhbGlkIHVybCBwYXRoOlxuICAgICAgICB2YXIgYWpheCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIGFqYXgub3BlbignR0VUJywgdXJsLCB0cnVlKVxuICAgICAgICBhamF4LnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgICBhamF4Lm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZG93bmxvYWQoZS50YXJnZXQucmVzcG9uc2UsIGZpbGVOYW1lLCBkZWZhdWx0TWltZSlcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhamF4LnNlbmQoKVxuICAgICAgICB9LCAwKSAvLyBhbGxvd3Mgc2V0dGluZyBjdXN0b20gYWpheCBoZWFkZXJzIHVzaW5nIHRoZSByZXR1cm46XG4gICAgICAgIHJldHVybiBhamF4XG4gICAgICB9IC8vIGVuZCBpZiB2YWxpZCB1cmw/XG4gICAgfSAvLyBlbmQgaWYgdXJsP1xuXG4gICAgLy9nbyBhaGVhZCBhbmQgZG93bmxvYWQgZGF0YVVSTHMgcmlnaHQgYXdheVxuICAgIGlmICgvXmRhdGE6KFtcXHcrLV0rXFwvW1xcdysuLV0rKT9bLDtdLy50ZXN0KHBheWxvYWQpKSB7XG4gICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAxMDI0ICogMTAyNCAqIDEuOTk5ICYmIG15QmxvYiAhPT0gdG9TdHJpbmcpIHtcbiAgICAgICAgcGF5bG9hZCA9IGRhdGFVcmxUb0Jsb2IocGF5bG9hZClcbiAgICAgICAgbWltZVR5cGUgPSBwYXlsb2FkLnR5cGUgfHwgZGVmYXVsdE1pbWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubXNTYXZlQmxvYiAvLyBJRTEwIGNhbid0IGRvIGFbZG93bmxvYWRdLCBvbmx5IEJsb2JzOlxuICAgICAgICAgID8gbmF2aWdhdG9yLm1zU2F2ZUJsb2IoZGF0YVVybFRvQmxvYihwYXlsb2FkKSwgZmlsZU5hbWUpXG4gICAgICAgICAgOiBzYXZlcihwYXlsb2FkKSAvLyBldmVyeW9uZSBlbHNlIGNhbiBzYXZlIGRhdGFVUkxzIHVuLXByb2Nlc3NlZFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL25vdCBkYXRhIHVybCwgaXMgaXQgYSBzdHJpbmcgd2l0aCBzcGVjaWFsIG5lZWRzP1xuICAgICAgaWYgKC8oW1xceDgwLVxceGZmXSkvLnRlc3QocGF5bG9hZCkpIHtcbiAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgIHRlbXBVaUFyciA9IG5ldyBVaW50OEFycmF5KHBheWxvYWQubGVuZ3RoKSxcbiAgICAgICAgICBteCA9IHRlbXBVaUFyci5sZW5ndGhcbiAgICAgICAgZm9yIChpOyBpIDwgbXg7ICsraSkgdGVtcFVpQXJyW2ldID0gcGF5bG9hZC5jaGFyQ29kZUF0KGkpXG4gICAgICAgIHBheWxvYWQgPSBuZXcgbXlCbG9iKFt0ZW1wVWlBcnJdLCB7IHR5cGU6IG1pbWVUeXBlIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGJsb2IgPSBwYXlsb2FkIGluc3RhbmNlb2YgbXlCbG9iID8gcGF5bG9hZCA6IG5ldyBteUJsb2IoW3BheWxvYWRdLCB7IHR5cGU6IG1pbWVUeXBlIH0pXG5cbiAgICBmdW5jdGlvbiBkYXRhVXJsVG9CbG9iKHN0clVybCkge1xuICAgICAgdmFyIHBhcnRzID0gc3RyVXJsLnNwbGl0KC9bOjssXS8pLFxuICAgICAgICB0eXBlID0gcGFydHNbMV0sXG4gICAgICAgIGluZGV4RGVjb2RlciA9IHN0clVybC5pbmRleE9mKCdjaGFyc2V0JykgPiAwID8gMyA6IDIsXG4gICAgICAgIGRlY29kZXIgPSBwYXJ0c1tpbmRleERlY29kZXJdID09ICdiYXNlNjQnID8gYXRvYiA6IGRlY29kZVVSSUNvbXBvbmVudCxcbiAgICAgICAgYmluRGF0YSA9IGRlY29kZXIocGFydHMucG9wKCkpLFxuICAgICAgICBteCA9IGJpbkRhdGEubGVuZ3RoLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgdWlBcnIgPSBuZXcgVWludDhBcnJheShteClcblxuICAgICAgZm9yIChpOyBpIDwgbXg7ICsraSkgdWlBcnJbaV0gPSBiaW5EYXRhLmNoYXJDb2RlQXQoaSlcblxuICAgICAgcmV0dXJuIG5ldyBteUJsb2IoW3VpQXJyXSwgeyB0eXBlOiB0eXBlIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2F2ZXIodXJsLCB3aW5Nb2RlKSB7XG4gICAgICBpZiAoJ2Rvd25sb2FkJyBpbiBhbmNob3IpIHtcbiAgICAgICAgLy9odG1sNSBBW2Rvd25sb2FkXVxuICAgICAgICBhbmNob3IuaHJlZiA9IHVybFxuICAgICAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVOYW1lKVxuICAgICAgICBhbmNob3IuY2xhc3NOYW1lID0gJ2Rvd25sb2FkLWpzLWxpbmsnXG4gICAgICAgIGFuY2hvci5pbm5lckhUTUwgPSAnZG93bmxvYWRpbmcuLi4nXG4gICAgICAgIGFuY2hvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhcmd1bWVudHMuY2FsbGVlKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFuY2hvcilcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYW5jaG9yLmNsaWNrKClcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGFuY2hvcilcbiAgICAgICAgICBpZiAod2luTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNlbGYuVVJMLnJldm9rZU9iamVjdFVSTChhbmNob3IuaHJlZilcbiAgICAgICAgICAgIH0sIDI1MClcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDY2KVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGUgbm9uLWFbZG93bmxvYWRdIHNhZmFyaSBhcyBiZXN0IHdlIGNhbjpcbiAgICAgIGlmICgvKFZlcnNpb24pXFwvKFxcZCspXFwuKFxcZCspKD86XFwuKFxcZCspKT8uKlNhZmFyaVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICBpZiAoL15kYXRhOi8udGVzdCh1cmwpKSB1cmwgPSAnZGF0YTonICsgdXJsLnJlcGxhY2UoL15kYXRhOihbXFx3XFwvXFwtXFwrXSspLywgZGVmYXVsdE1pbWUpXG4gICAgICAgIGlmICghd2luZG93Lm9wZW4odXJsKSkge1xuICAgICAgICAgIC8vIHBvcHVwIGJsb2NrZWQsIG9mZmVyIGRpcmVjdCBkb3dubG9hZDpcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb25maXJtKCdEaXNwbGF5aW5nIE5ldyBEb2N1bWVudFxcblxcblVzZSBTYXZlIEFzLi4uIHRvIGRvd25sb2FkLCB0aGVuIGNsaWNrIGJhY2sgdG8gcmV0dXJuIHRvIHRoaXMgcGFnZS4nKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICAvL2RvIGlmcmFtZSBkYXRhVVJMIGRvd25sb2FkIChvbGQgY2grRkYpOlxuICAgICAgdmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKVxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmKVxuXG4gICAgICBpZiAoIXdpbk1vZGUgJiYgL15kYXRhOi8udGVzdCh1cmwpKSB7XG4gICAgICAgIC8vIGZvcmNlIGEgbWltZSB0aGF0IHdpbGwgZG93bmxvYWQ6XG4gICAgICAgIHVybCA9ICdkYXRhOicgKyB1cmwucmVwbGFjZSgvXmRhdGE6KFtcXHdcXC9cXC1cXCtdKykvLCBkZWZhdWx0TWltZSlcbiAgICAgIH1cbiAgICAgIGYuc3JjID0gdXJsXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmKVxuICAgICAgfSwgMzMzKVxuICAgIH0gLy9lbmQgc2F2ZXJcblxuICAgIGlmIChuYXZpZ2F0b3IubXNTYXZlQmxvYikge1xuICAgICAgLy8gSUUxMCsgOiAoaGFzIEJsb2IsIGJ1dCBub3QgYVtkb3dubG9hZF0gb3IgVVJMKVxuICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVCbG9iKGJsb2IsIGZpbGVOYW1lKVxuICAgIH1cblxuICAgIGlmIChzZWxmLlVSTCkge1xuICAgICAgLy8gc2ltcGxlIGZhc3QgYW5kIG1vZGVybiB3YXkgdXNpbmcgQmxvYiBhbmQgVVJMOlxuICAgICAgc2F2ZXIoc2VsZi5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYW5kbGUgbm9uLUJsb2IoKStub24tVVJMIGJyb3dzZXJzOlxuICAgICAgaWYgKHR5cGVvZiBibG9iID09PSAnc3RyaW5nJyB8fCBibG9iLmNvbnN0cnVjdG9yID09PSB0b1N0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBzYXZlcignZGF0YTonICsgbWltZVR5cGUgKyAnO2Jhc2U2NCwnICsgc2VsZi5idG9hKGJsb2IpKVxuICAgICAgICB9IGNhdGNoICh5KSB7XG4gICAgICAgICAgcmV0dXJuIHNhdmVyKCdkYXRhOicgKyBtaW1lVHlwZSArICcsJyArIGVuY29kZVVSSUNvbXBvbmVudChibG9iKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCbG9iIGJ1dCBub3QgVVJMIHN1cHBvcnQ6XG4gICAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgc2F2ZXIodGhpcy5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9IC8qIGVuZCBkb3dubG9hZCgpICovXG59KVxuIiwiOyhmdW5jdGlvbiAoYykge1xuICBmdW5jdGlvbiBhKGIsIGQpIHtcbiAgICBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChhLmNhY2hlLCBiKSkgcmV0dXJuIGEuY2FjaGVbYl1cbiAgICB2YXIgZSA9IGEucmVzb2x2ZShiKVxuICAgIGlmICghZSkgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcmVzb2x2ZSBtb2R1bGUgJyArIGIpXG4gICAgdmFyIGMgPSB7IGlkOiBiLCByZXF1aXJlOiBhLCBmaWxlbmFtZTogYiwgZXhwb3J0czoge30sIGxvYWRlZDogITEsIHBhcmVudDogZCwgY2hpbGRyZW46IFtdIH1cbiAgICBkICYmIGQuY2hpbGRyZW4ucHVzaChjKVxuICAgIHZhciBmID0gYi5zbGljZSgwLCBiLmxhc3RJbmRleE9mKCcvJykgKyAxKVxuICAgIHJldHVybiAoYS5jYWNoZVtiXSA9IGMuZXhwb3J0cyksIGUuY2FsbChjLmV4cG9ydHMsIGMsIGMuZXhwb3J0cywgZiwgYiksIChjLmxvYWRlZCA9ICEwKSwgKGEuY2FjaGVbYl0gPSBjLmV4cG9ydHMpXG4gIH1cbiAgOyhhLm1vZHVsZXMgPSB7fSksXG4gICAgKGEuY2FjaGUgPSB7fSksXG4gICAgKGEucmVzb2x2ZSA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICByZXR1cm4ge30uaGFzT3duUHJvcGVydHkuY2FsbChhLm1vZHVsZXMsIGIpID8gYS5tb2R1bGVzW2JdIDogdm9pZCAwXG4gICAgfSksXG4gICAgKGEuZGVmaW5lID0gZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgIGEubW9kdWxlc1tiXSA9IGNcbiAgICB9KVxuICB2YXIgYiA9IChmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAoXG4gICAgICAoYSA9ICcvJyksXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnYnJvd3NlcicsXG4gICAgICAgIHZlcnNpb246ICd2MC4xMC4yNicsXG4gICAgICAgIGJyb3dzZXI6ICEwLFxuICAgICAgICBlbnY6IHt9LFxuICAgICAgICBhcmd2OiBbXSxcbiAgICAgICAgbmV4dFRpY2s6XG4gICAgICAgICAgYy5zZXRJbW1lZGlhdGUgfHxcbiAgICAgICAgICBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChhLCAwKVxuICAgICAgICAgIH0sXG4gICAgICAgIGN3ZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhXG4gICAgICAgIH0sXG4gICAgICAgIGNoZGlyOiBmdW5jdGlvbiAoYikge1xuICAgICAgICAgIGEgPSBiXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKVxuICB9KSgpXG4gIGEuZGVmaW5lKCcvZ2lmLmNvZmZlZScsIGZ1bmN0aW9uIChkLCBtLCBsLCBrKSB7XG4gICAgZnVuY3Rpb24gZyhhLCBiKSB7XG4gICAgICByZXR1cm4ge30uaGFzT3duUHJvcGVydHkuY2FsbChhLCBiKVxuICAgIH1cbiAgICBmdW5jdGlvbiBqKGQsIGIpIHtcbiAgICAgIGZvciAodmFyIGEgPSAwLCBjID0gYi5sZW5ndGg7IGEgPCBjOyArK2EpIGlmIChhIGluIGIgJiYgYlthXSA9PT0gZCkgcmV0dXJuICEwXG4gICAgICByZXR1cm4gITFcbiAgICB9XG4gICAgZnVuY3Rpb24gaShhLCBiKSB7XG4gICAgICBmdW5jdGlvbiBkKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gYVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgYyBpbiBiKSBnKGIsIGMpICYmIChhW2NdID0gYltjXSlcbiAgICAgIHJldHVybiAoZC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSksIChhLnByb3RvdHlwZSA9IG5ldyBkKCkpLCAoYS5fX3N1cGVyX18gPSBiLnByb3RvdHlwZSksIGFcbiAgICB9XG4gICAgdmFyIGgsIGMsIGYsIGIsIGVcbiAgICA7KGYgPSBhKCdldmVudHMnLCBkKS5FdmVudEVtaXR0ZXIpLFxuICAgICAgKGggPSBhKCcvYnJvd3Nlci5jb2ZmZWUnLCBkKSksXG4gICAgICAoZSA9IChmdW5jdGlvbiAoZCkge1xuICAgICAgICBmdW5jdGlvbiBhKGQpIHtcbiAgICAgICAgICB2YXIgYSwgYlxuICAgICAgICAgIDsodGhpcy5ydW5uaW5nID0gITEpLFxuICAgICAgICAgICAgKHRoaXMub3B0aW9ucyA9IHt9KSxcbiAgICAgICAgICAgICh0aGlzLmZyYW1lcyA9IFtdKSxcbiAgICAgICAgICAgICh0aGlzLmZyZWVXb3JrZXJzID0gW10pLFxuICAgICAgICAgICAgKHRoaXMuYWN0aXZlV29ya2VycyA9IFtdKSxcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyhkKVxuICAgICAgICAgIGZvciAoYSBpbiBjKSAoYiA9IGNbYV0pLCBudWxsICE9IHRoaXMub3B0aW9uc1thXSA/IHRoaXMub3B0aW9uc1thXSA6ICh0aGlzLm9wdGlvbnNbYV0gPSBiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgaShhLCBkKSxcbiAgICAgICAgICAoYyA9IHtcbiAgICAgICAgICAgIHdvcmtlclNjcmlwdDogJ2dpZi53b3JrZXIuanMnLFxuICAgICAgICAgICAgd29ya2VyczogMixcbiAgICAgICAgICAgIHJlcGVhdDogMCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICAgICAgICAgIHF1YWxpdHk6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogbnVsbCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoYiA9IHsgZGVsYXk6IDUwMCwgY29weTogITEgfSksXG4gICAgICAgICAgKGEucHJvdG90eXBlLnNldE9wdGlvbiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAodGhpcy5vcHRpb25zW2FdID0gYiksXG4gICAgICAgICAgICAgIG51bGwgIT0gdGhpcy5fY2FudmFzICYmIChhID09PSAnd2lkdGgnIHx8IGEgPT09ICdoZWlnaHQnKSA/ICh0aGlzLl9jYW52YXNbYV0gPSBiKSA6IHZvaWQgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHZhciBhLCBjXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgZm9yIChhIGluIGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWcoYiwgYSkpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgOyhjID0gYlthXSksIGQucHVzaCh0aGlzLnNldE9wdGlvbihhLCBjKSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZFxuICAgICAgICAgICAgfS5jYWxsKHRoaXMsIFtdKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5hZGRGcmFtZSA9IGZ1bmN0aW9uIChhLCBkKSB7XG4gICAgICAgICAgICB2YXIgYywgZVxuICAgICAgICAgICAgbnVsbCA9PSBkICYmIChkID0ge30pLCAoYyA9IHt9KSwgKGMudHJhbnNwYXJlbnQgPSB0aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQpXG4gICAgICAgICAgICBmb3IgKGUgaW4gYikgY1tlXSA9IGRbZV0gfHwgYltlXVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAobnVsbCAhPSB0aGlzLm9wdGlvbnMud2lkdGggfHwgdGhpcy5zZXRPcHRpb24oJ3dpZHRoJywgYS53aWR0aCksXG4gICAgICAgICAgICAgIG51bGwgIT0gdGhpcy5vcHRpb25zLmhlaWdodCB8fCB0aGlzLnNldE9wdGlvbignaGVpZ2h0JywgYS5oZWlnaHQpLFxuICAgICAgICAgICAgICAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIEltYWdlRGF0YSAmJiBudWxsICE9IEltYWdlRGF0YSAmJiBhIGluc3RhbmNlb2YgSW1hZ2VEYXRhKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBjLmRhdGEgPSBhLmRhdGFcbiAgICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgICAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgJiZcbiAgICAgICAgICAgICAgICBudWxsICE9IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCAmJlxuICAgICAgICAgICAgICAgIGEgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHx8XG4gICAgICAgICAgICAgICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCAmJlxuICAgICAgICAgICAgICAgIG51bGwgIT0gV2ViR0xSZW5kZXJpbmdDb250ZXh0ICYmXG4gICAgICAgICAgICAgICAgYSBpbnN0YW5jZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dClcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgZC5jb3B5ID8gKGMuZGF0YSA9IHRoaXMuZ2V0Q29udGV4dERhdGEoYSkpIDogKGMuY29udGV4dCA9IGEpXG4gICAgICAgICAgICBlbHNlIGlmIChudWxsICE9IGEuY2hpbGROb2RlcykgZC5jb3B5ID8gKGMuZGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKGEpKSA6IChjLmltYWdlID0gYSlcbiAgICAgICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGltYWdlJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYW1lcy5wdXNoKGMpXG4gICAgICAgICAgfSksXG4gICAgICAgICAgKGEucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkLCBhXG4gICAgICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgcnVubmluZycpXG4gICAgICAgICAgICBpZiAoIShudWxsICE9IHRoaXMub3B0aW9ucy53aWR0aCAmJiBudWxsICE9IHRoaXMub3B0aW9ucy5oZWlnaHQpKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gcmVuZGVyaW5nJylcbiAgICAgICAgICAgIDsodGhpcy5ydW5uaW5nID0gITApLFxuICAgICAgICAgICAgICAodGhpcy5uZXh0RnJhbWUgPSAwKSxcbiAgICAgICAgICAgICAgKHRoaXMuZmluaXNoZWRGcmFtZXMgPSAwKSxcbiAgICAgICAgICAgICAgKHRoaXMuaW1hZ2VQYXJ0cyA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICAgIHZhciBiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBiXG4gICAgICAgICAgICAgICAgICAgICAgYiA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIDAgPD0gdGhpcy5mcmFtZXMubGVuZ3RoID8gYSA8IHRoaXMuZnJhbWVzLmxlbmd0aCA6IGEgPiB0aGlzLmZyYW1lcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAwIDw9IHRoaXMuZnJhbWVzLmxlbmd0aCA/ICsrYSA6IC0tYVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGIucHVzaChhKVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiXG4gICAgICAgICAgICAgICAgICAgIH0uYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICAgICAgYSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGUgPSBiLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgIGEgPCBlO1xuICAgICAgICAgICAgICAgICAgKythXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKGQgPSBiW2FdKSwgYy5wdXNoKG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNcbiAgICAgICAgICAgICAgfS5jYWxsKHRoaXMsIFtdKSksXG4gICAgICAgICAgICAgIChhID0gdGhpcy5zcGF3bldvcmtlcnMoKSlcbiAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgIHZhciBjID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNcbiAgICAgICAgICAgICAgICAgIGMgPSBbXVxuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYiA9IDA7IDAgPD0gYSA/IGIgPCBhIDogYiA+IGE7IDAgPD0gYSA/ICsrYiA6IC0tYikgYy5wdXNoKGIpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gY1xuICAgICAgICAgICAgICAgIH0uYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICBiID0gMCxcbiAgICAgICAgICAgICAgICBlID0gYy5sZW5ndGg7XG4gICAgICAgICAgICAgIGIgPCBlO1xuICAgICAgICAgICAgICArK2JcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKGQgPSBjW2JdKSwgdGhpcy5yZW5kZXJOZXh0RnJhbWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdCgnc3RhcnQnKSwgdGhpcy5lbWl0KCdwcm9ncmVzcycsIDApXG4gICAgICAgICAgfSksXG4gICAgICAgICAgKGEucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFcbiAgICAgICAgICAgIHdoaWxlICghMCkge1xuICAgICAgICAgICAgICBpZiAoKChhID0gdGhpcy5hY3RpdmVXb3JrZXJzLnNoaWZ0KCkpLCAhKG51bGwgIT0gYSkpKSBicmVha1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2lsbGluZyBhY3RpdmUgd29ya2VyJyksIGEudGVybWluYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5ydW5uaW5nID0gITEpLCB0aGlzLmVtaXQoJ2Fib3J0JylcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoYS5wcm90b3R5cGUuc3Bhd25Xb3JrZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIChhID0gTWF0aC5taW4odGhpcy5vcHRpb25zLndvcmtlcnMsIHRoaXMuZnJhbWVzLmxlbmd0aCkpLFxuICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNcbiAgICAgICAgICAgICAgICBjID0gW11cbiAgICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgICAgdmFyIGIgPSB0aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoIDw9IGEgPyBiIDwgYSA6IGIgPiBhO1xuICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlV29ya2Vycy5sZW5ndGggPD0gYSA/ICsrYiA6IC0tYlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIGMucHVzaChiKVxuICAgICAgICAgICAgICAgIHJldHVybiBjXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBiXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzcGF3bmluZyB3b3JrZXIgJyArIGMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGIgPSBuZXcgV29ya2VyKGEub3B0aW9ucy53b3JrZXJTY3JpcHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChiLm9ubWVzc2FnZSA9IChmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5hY3RpdmVXb3JrZXJzLnNwbGljZShhLmFjdGl2ZVdvcmtlcnMuaW5kZXhPZihiKSwgMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmZyZWVXb3JrZXJzLnB1c2goYiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmZyYW1lRmluaXNoZWQoYy5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkoYSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYS5mcmVlV29ya2Vycy5wdXNoKGIpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSh0aGlzKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGFcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoYS5wcm90b3R5cGUuZnJhbWVGaW5pc2hlZCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZnJhbWUgJyArIGEuaW5kZXggKyAnIGZpbmlzaGVkIC0gJyArIHRoaXMuYWN0aXZlV29ya2Vycy5sZW5ndGggKyAnIGFjdGl2ZScpLFxuICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkRnJhbWVzKyssXG4gICAgICAgICAgICAgIHRoaXMuZW1pdCgncHJvZ3Jlc3MnLCB0aGlzLmZpbmlzaGVkRnJhbWVzIC8gdGhpcy5mcmFtZXMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgKHRoaXMuaW1hZ2VQYXJ0c1thLmluZGV4XSA9IGEpLFxuICAgICAgICAgICAgICBqKG51bGwsIHRoaXMuaW1hZ2VQYXJ0cykgPyB0aGlzLnJlbmRlck5leHRGcmFtZSgpIDogdGhpcy5maW5pc2hSZW5kZXJpbmcoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5maW5pc2hSZW5kZXJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZSwgYSwgaywgbSwgYiwgZCwgaFxuICAgICAgICAgICAgYiA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGYgPSAwLCBqID0gdGhpcy5pbWFnZVBhcnRzLmxlbmd0aDsgZiA8IGo7ICsrZilcbiAgICAgICAgICAgICAgKGEgPSB0aGlzLmltYWdlUGFydHNbZl0pLCAoYiArPSAoYS5kYXRhLmxlbmd0aCAtIDEpICogYS5wYWdlU2l6ZSArIGEuY3Vyc29yKVxuICAgICAgICAgICAgOyhiICs9IGEucGFnZVNpemUgLSBhLmN1cnNvciksXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcgZmluaXNoZWQgLSBmaWxlc2l6ZSAnICsgTWF0aC5yb3VuZChiIC8gMWUzKSArICdrYicpLFxuICAgICAgICAgICAgICAoZSA9IG5ldyBVaW50OEFycmF5KGIpKSxcbiAgICAgICAgICAgICAgKGQgPSAwKVxuICAgICAgICAgICAgZm9yICh2YXIgZyA9IDAsIGwgPSB0aGlzLmltYWdlUGFydHMubGVuZ3RoOyBnIDwgbDsgKytnKSB7XG4gICAgICAgICAgICAgIGEgPSB0aGlzLmltYWdlUGFydHNbZ11cbiAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDAsIGkgPSBhLmRhdGEubGVuZ3RoOyBjIDwgaTsgKytjKVxuICAgICAgICAgICAgICAgIChoID0gYS5kYXRhW2NdKSwgKGsgPSBjKSwgZS5zZXQoaCwgZCksIGsgPT09IGEuZGF0YS5sZW5ndGggLSAxID8gKGQgKz0gYS5jdXJzb3IpIDogKGQgKz0gYS5wYWdlU2l6ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAobSA9IG5ldyBCbG9iKFtlXSwgeyB0eXBlOiAnaW1hZ2UvZ2lmJyB9KSksIHRoaXMuZW1pdCgnZmluaXNoZWQnLCBtLCBlKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5yZW5kZXJOZXh0RnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYywgYSwgYlxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ05vIGZyZWUgd29ya2VycycpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0RnJhbWUgPj0gdGhpcy5mcmFtZXMubGVuZ3RoXG4gICAgICAgICAgICAgID8gdm9pZCAwXG4gICAgICAgICAgICAgIDogKChjID0gdGhpcy5mcmFtZXNbdGhpcy5uZXh0RnJhbWUrK10pLFxuICAgICAgICAgICAgICAgIChiID0gdGhpcy5mcmVlV29ya2Vycy5zaGlmdCgpKSxcbiAgICAgICAgICAgICAgICAoYSA9IHRoaXMuZ2V0VGFzayhjKSksXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIGZyYW1lICcgKyAoYS5pbmRleCArIDEpICsgJyBvZiAnICsgdGhpcy5mcmFtZXMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVdvcmtlcnMucHVzaChiKSxcbiAgICAgICAgICAgICAgICBiLnBvc3RNZXNzYWdlKGEpKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5nZXRDb250ZXh0RGF0YSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5vcHRpb25zLndpZHRoLCB0aGlzLm9wdGlvbnMuaGVpZ2h0KS5kYXRhXG4gICAgICAgICAgfSksXG4gICAgICAgICAgKGEucHJvdG90eXBlLmdldEltYWdlRGF0YSA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICB2YXIgYVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgbnVsbCAhPSB0aGlzLl9jYW52YXMgfHxcbiAgICAgICAgICAgICAgICAoKHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpKSxcbiAgICAgICAgICAgICAgICAodGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoKSxcbiAgICAgICAgICAgICAgICAodGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMub3B0aW9ucy5oZWlnaHQpKSxcbiAgICAgICAgICAgICAgKGEgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSksXG4gICAgICAgICAgICAgIChhLnNldEZpbGwgPSB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZCksXG4gICAgICAgICAgICAgIGEuZmlsbFJlY3QoMCwgMCwgdGhpcy5vcHRpb25zLndpZHRoLCB0aGlzLm9wdGlvbnMuaGVpZ2h0KSxcbiAgICAgICAgICAgICAgYS5kcmF3SW1hZ2UoYiwgMCwgMCksXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q29udGV4dERhdGEoYSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoYS5wcm90b3R5cGUuZ2V0VGFzayA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICB2YXIgYywgYlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoKGMgPSB0aGlzLmZyYW1lcy5pbmRleE9mKGEpKSxcbiAgICAgICAgICAgICAgKGIgPSB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGMsXG4gICAgICAgICAgICAgICAgbGFzdDogYyA9PT0gdGhpcy5mcmFtZXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICBkZWxheTogYS5kZWxheSxcbiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogYS50cmFuc3BhcmVudCxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodCxcbiAgICAgICAgICAgICAgICBxdWFsaXR5OiB0aGlzLm9wdGlvbnMucXVhbGl0eSxcbiAgICAgICAgICAgICAgICByZXBlYXQ6IHRoaXMub3B0aW9ucy5yZXBlYXQsXG4gICAgICAgICAgICAgICAgY2FuVHJhbnNmZXI6IGgubmFtZSA9PT0gJ2Nocm9tZScsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBudWxsICE9IGEuZGF0YSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgYi5kYXRhID0gYS5kYXRhXG4gICAgICAgICAgICBlbHNlIGlmIChudWxsICE9IGEuY29udGV4dCkgYi5kYXRhID0gdGhpcy5nZXRDb250ZXh0RGF0YShhLmNvbnRleHQpXG4gICAgICAgICAgICBlbHNlIGlmIChudWxsICE9IGEuaW1hZ2UpIGIuZGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKGEuaW1hZ2UpXG4gICAgICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcmFtZScpXG4gICAgICAgICAgICByZXR1cm4gYlxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGFcbiAgICAgICAgKVxuICAgICAgfSkoZikpLFxuICAgICAgKGQuZXhwb3J0cyA9IGUpXG4gIH0pLFxuICAgIGEuZGVmaW5lKCcvYnJvd3Nlci5jb2ZmZWUnLCBmdW5jdGlvbiAoZiwgZywgaCwgaSkge1xuICAgICAgdmFyIGEsIGQsIGUsIGMsIGJcbiAgICAgIDsoYyA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSksXG4gICAgICAgIChlID0gbmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpLFxuICAgICAgICAoYiA9IGMubWF0Y2goLyhvcGVyYXxpZXxmaXJlZm94fGNocm9tZXx2ZXJzaW9uKVtcXHNcXC86XShbXFx3XFxkXFwuXSspPy4qPyhzYWZhcml8dmVyc2lvbltcXHNcXC86XShbXFx3XFxkXFwuXSspfCQpLykgfHwgW1xuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgJ3Vua25vd24nLFxuICAgICAgICAgIDAsXG4gICAgICAgIF0pLFxuICAgICAgICAoZCA9IGJbMV0gPT09ICdpZScgJiYgZG9jdW1lbnQuZG9jdW1lbnRNb2RlKSxcbiAgICAgICAgKGEgPSB7XG4gICAgICAgICAgbmFtZTogYlsxXSA9PT0gJ3ZlcnNpb24nID8gYlszXSA6IGJbMV0sXG4gICAgICAgICAgdmVyc2lvbjogZCB8fCBwYXJzZUZsb2F0KGJbMV0gPT09ICdvcGVyYScgJiYgYls0XSA/IGJbNF0gOiBiWzJdKSxcbiAgICAgICAgICBwbGF0Zm9ybToge1xuICAgICAgICAgICAgbmFtZTogYy5tYXRjaCgvaXAoPzphZHxvZHxob25lKS8pXG4gICAgICAgICAgICAgID8gJ2lvcydcbiAgICAgICAgICAgICAgOiAoYy5tYXRjaCgvKD86d2Vib3N8YW5kcm9pZCkvKSB8fCBlLm1hdGNoKC9tYWN8d2lufGxpbnV4LykgfHwgWydvdGhlciddKVswXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgKGFbYS5uYW1lXSA9ICEwKSxcbiAgICAgICAgKGFbYS5uYW1lICsgcGFyc2VJbnQoYS52ZXJzaW9uLCAxMCldID0gITApLFxuICAgICAgICAoYS5wbGF0Zm9ybVthLnBsYXRmb3JtLm5hbWVdID0gITApLFxuICAgICAgICAoZi5leHBvcnRzID0gYSlcbiAgICB9KSxcbiAgICBhLmRlZmluZSgnZXZlbnRzJywgZnVuY3Rpb24gKGYsIGUsIGcsIGgpIHtcbiAgICAgIGIuRXZlbnRFbWl0dGVyIHx8IChiLkV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uICgpIHt9KVxuICAgICAgdmFyIGEgPSAoZS5FdmVudEVtaXR0ZXIgPSBiLkV2ZW50RW1pdHRlciksXG4gICAgICAgIGMgPVxuICAgICAgICAgIHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IEFycmF5LmlzQXJyYXlcbiAgICAgICAgICAgIDogZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpID09PSAnW29iamVjdCBBcnJheV0nXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgIGQgPSAxMFxuICAgICAgOyhhLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KSwgKHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgPSBhKVxuICAgICAgfSksXG4gICAgICAgIChhLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBmID09PSAnZXJyb3InICYmXG4gICAgICAgICAgICAoISh0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzLmVycm9yKSB8fCAoYyh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSlcbiAgICAgICAgICApXG4gICAgICAgICAgICB0aHJvdyBhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBFcnJvciA/IGFyZ3VtZW50c1sxXSA6IG5ldyBFcnJvcihcIlVuY2F1Z2h0LCB1bnNwZWNpZmllZCAnZXJyb3InIGV2ZW50LlwiKVxuICAgICAgICAgIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gITFcbiAgICAgICAgICB2YXIgYSA9IHRoaXMuX2V2ZW50c1tmXVxuICAgICAgICAgIGlmICghYSkgcmV0dXJuICExXG4gICAgICAgICAgaWYgKCEodHlwZW9mIGEgPT0gJ2Z1bmN0aW9uJykpXG4gICAgICAgICAgICBpZiAoYyhhKSkge1xuICAgICAgICAgICAgICB2YXIgYiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICAgICAgZSA9IGEuc2xpY2UoKVxuICAgICAgICAgICAgICBmb3IgKHZhciBkID0gMCwgZyA9IGUubGVuZ3RoOyBkIDwgZzsgZCsrKSBlW2RdLmFwcGx5KHRoaXMsIGIpXG4gICAgICAgICAgICAgIHJldHVybiAhMFxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiAhMVxuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBhLmNhbGwodGhpcylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgYS5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgYS5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdmFyIGIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgICAgICAgICAgIGEuYXBwbHkodGhpcywgYilcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICEwXG4gICAgICAgIH0pLFxuICAgICAgICAoYS5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgYikgdGhyb3cgbmV3IEVycm9yKCdhZGRMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpXG4gICAgICAgICAgaWYgKCh0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KSwgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIGEsIGIpLCAhdGhpcy5fZXZlbnRzW2FdKSlcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50c1thXSA9IGJcbiAgICAgICAgICBlbHNlIGlmIChjKHRoaXMuX2V2ZW50c1thXSkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZXZlbnRzW2FdLndhcm5lZCkge1xuICAgICAgICAgICAgICB2YXIgZVxuICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzICE9PSB1bmRlZmluZWQgPyAoZSA9IHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMpIDogKGUgPSBkKSxcbiAgICAgICAgICAgICAgICBlICYmXG4gICAgICAgICAgICAgICAgICBlID4gMCAmJlxuICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW2FdLmxlbmd0aCA+IGUgJiZcbiAgICAgICAgICAgICAgICAgICgodGhpcy5fZXZlbnRzW2FdLndhcm5lZCA9ICEwKSxcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1thXS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLnRyYWNlKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9ldmVudHNbYV0ucHVzaChiKVxuICAgICAgICAgIH0gZWxzZSB0aGlzLl9ldmVudHNbYV0gPSBbdGhpcy5fZXZlbnRzW2FdLCBiXVxuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0pLFxuICAgICAgICAoYS5wcm90b3R5cGUub24gPSBhLnByb3RvdHlwZS5hZGRMaXN0ZW5lciksXG4gICAgICAgIChhLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgICAgICB2YXIgYSA9IHRoaXNcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYS5vbihiLCBmdW5jdGlvbiBkKCkge1xuICAgICAgICAgICAgICBhLnJlbW92ZUxpc3RlbmVyKGIsIGQpLCBjLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGhpc1xuICAgICAgICAgIClcbiAgICAgICAgfSksXG4gICAgICAgIChhLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChhLCBkKSB7XG4gICAgICAgICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBkKSB0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUxpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJylcbiAgICAgICAgICBpZiAoISh0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzW2FdKSkgcmV0dXJuIHRoaXNcbiAgICAgICAgICB2YXIgYiA9IHRoaXMuX2V2ZW50c1thXVxuICAgICAgICAgIGlmIChjKGIpKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGIuaW5kZXhPZihkKVxuICAgICAgICAgICAgaWYgKGUgPCAwKSByZXR1cm4gdGhpc1xuICAgICAgICAgICAgYi5zcGxpY2UoZSwgMSksIGIubGVuZ3RoID09IDAgJiYgZGVsZXRlIHRoaXMuX2V2ZW50c1thXVxuICAgICAgICAgIH0gZWxzZSB0aGlzLl9ldmVudHNbYV0gPT09IGQgJiYgZGVsZXRlIHRoaXMuX2V2ZW50c1thXVxuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0pLFxuICAgICAgICAoYS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICByZXR1cm4gYSAmJiB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzW2FdICYmICh0aGlzLl9ldmVudHNbYV0gPSBudWxsKSwgdGhpc1xuICAgICAgICB9KSxcbiAgICAgICAgKGEucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pLFxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzW2FdIHx8ICh0aGlzLl9ldmVudHNbYV0gPSBbXSksXG4gICAgICAgICAgICBjKHRoaXMuX2V2ZW50c1thXSkgfHwgKHRoaXMuX2V2ZW50c1thXSA9IFt0aGlzLl9ldmVudHNbYV1dKSxcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50c1thXVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICB9KSxcbiAgICAoYy5HSUYgPSBhKCcvZ2lmLmNvZmZlZScpKVxufS5jYWxsKHRoaXMsIHRoaXMpKVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2lmLmpzLm1hcFxuLy8gZ2lmLmpzIDAuMS42IC0gaHR0cHM6Ly9naXRodWIuY29tL2pub3JkYmVyZy9naWYuanNcbiIsIi8qKlxuICogQSB0b29sIGZvciBwcmVzZW50aW5nIGFuIEFycmF5QnVmZmVyIGFzIGEgc3RyZWFtIGZvciB3cml0aW5nIHNvbWUgc2ltcGxlIGRhdGEgdHlwZXMuXG4gKlxuICogQnkgTmljaG9sYXMgU2hlcmxvY2tcbiAqXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgV1RGUEx2MiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XVEZQTFxuICovXG5cbid1c2Ugc3RyaWN0J1xuOyhmdW5jdGlvbiAoKSB7XG4gIHZhciBpc05vZGVFbnZpcm9tZW50ID0gdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJ1xuXG4gIFxuICAvKlxuICAgKiBDcmVhdGUgYW4gQXJyYXlCdWZmZXIgb2YgdGhlIGdpdmVuIGxlbmd0aCBhbmQgcHJlc2VudCBpdCBhcyBhIHdyaXRhYmxlIHN0cmVhbSB3aXRoIG1ldGhvZHNcbiAgICogZm9yIHdyaXRpbmcgZGF0YSBpbiBkaWZmZXJlbnQgZm9ybWF0cy5cbiAgICovXG5cbiAgdmFyIEFycmF5QnVmZmVyRGF0YVN0cmVhbSA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICB0aGlzLmRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhpcy5wb3MgPSAwXG4gIH1cblxuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLnNlZWsgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgdGhpcy5wb3MgPSBvZmZzZXRcbiAgfVxuXG4gIEFycmF5QnVmZmVyRGF0YVN0cmVhbS5wcm90b3R5cGUud3JpdGVCeXRlcyA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5kYXRhW3RoaXMucG9zKytdID0gYXJyW2ldXG4gICAgfVxuICB9XG5cbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZUJ5dGUgPSBmdW5jdGlvbiAoYikge1xuICAgIHRoaXMuZGF0YVt0aGlzLnBvcysrXSA9IGJcbiAgfVxuXG4gIC8vU3lub255bTpcbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZVU4ID0gQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZUJ5dGVcblxuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLndyaXRlVTE2QkUgPSBmdW5jdGlvbiAodSkge1xuICAgIHRoaXMuZGF0YVt0aGlzLnBvcysrXSA9IHUgPj4gOFxuICAgIHRoaXMuZGF0YVt0aGlzLnBvcysrXSA9IHVcbiAgfVxuXG4gIEFycmF5QnVmZmVyRGF0YVN0cmVhbS5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIChkKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobmV3IEZsb2F0NjRBcnJheShbZF0pLmJ1ZmZlcilcblxuICAgIGZvciAodmFyIGkgPSBieXRlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy53cml0ZUJ5dGUoYnl0ZXNbaV0pXG4gICAgfVxuICB9XG5cbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAoZCkge1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KG5ldyBGbG9hdDMyQXJyYXkoW2RdKS5idWZmZXIpXG5cbiAgICBmb3IgKHZhciBpID0gYnl0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRoaXMud3JpdGVCeXRlKGJ5dGVzW2ldKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSBhbiBBU0NJSSBzdHJpbmcgdG8gdGhlIHN0cmVhbVxuICAgKi9cbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZVN0cmluZyA9IGZ1bmN0aW9uIChzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPSBzLmNoYXJDb2RlQXQoaSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JpdGUgdGhlIGdpdmVuIDMyLWJpdCBpbnRlZ2VyIHRvIHRoZSBzdHJlYW0gYXMgYW4gRUJNTCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciB1c2luZyB0aGUgZ2l2ZW4gYnl0ZSB3aWR0aFxuICAgKiAodXNlIG1lYXN1cmVFQk1MVmFySW50KS5cbiAgICpcbiAgICogTm8gZXJyb3IgY2hlY2tpbmcgaXMgcGVyZm9ybWVkIHRvIGVuc3VyZSB0aGF0IHRoZSBzdXBwbGllZCB3aWR0aCBpcyBjb3JyZWN0IGZvciB0aGUgaW50ZWdlci5cbiAgICpcbiAgICogQHBhcmFtIGkgSW50ZWdlciB0byBiZSB3cml0dGVuXG4gICAqIEBwYXJhbSB3aWR0aCBOdW1iZXIgb2YgYnl0ZXMgdG8gd3JpdGUgdG8gdGhlIHN0cmVhbVxuICAgKi9cbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZUVCTUxWYXJJbnRXaWR0aCA9IGZ1bmN0aW9uIChpLCB3aWR0aCkge1xuICAgIHN3aXRjaCAod2lkdGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy53cml0ZVU4KCgxIDw8IDcpIHwgaSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy53cml0ZVU4KCgxIDw8IDYpIHwgKGkgPj4gOCkpXG4gICAgICAgIHRoaXMud3JpdGVVOChpKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLndyaXRlVTgoKDEgPDwgNSkgfCAoaSA+PiAxNikpXG4gICAgICAgIHRoaXMud3JpdGVVOChpID4+IDgpXG4gICAgICAgIHRoaXMud3JpdGVVOChpKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICB0aGlzLndyaXRlVTgoKDEgPDwgNCkgfCAoaSA+PiAyNCkpXG4gICAgICAgIHRoaXMud3JpdGVVOChpID4+IDE2KVxuICAgICAgICB0aGlzLndyaXRlVTgoaSA+PiA4KVxuICAgICAgICB0aGlzLndyaXRlVTgoaSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgLypcbiAgICAgICAgICogSmF2YVNjcmlwdCBjb252ZXJ0cyBpdHMgZG91YmxlcyB0byAzMi1iaXQgaW50ZWdlcnMgZm9yIGJpdHdpc2Ugb3BlcmF0aW9ucywgc28gd2UgbmVlZCB0byBkbyBhXG4gICAgICAgICAqIGRpdmlzaW9uIGJ5IDJeMzIgaW5zdGVhZCBvZiBhIHJpZ2h0LXNoaWZ0IG9mIDMyIHRvIHJldGFpbiB0aG9zZSB0b3AgMyBiaXRzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndyaXRlVTgoKDEgPDwgMykgfCAoKGkgLyA0Mjk0OTY3Mjk2KSAmIDB4NykpXG4gICAgICAgIHRoaXMud3JpdGVVOChpID4+IDI0KVxuICAgICAgICB0aGlzLndyaXRlVTgoaSA+PiAxNilcbiAgICAgICAgdGhpcy53cml0ZVU4KGkgPj4gOClcbiAgICAgICAgdGhpcy53cml0ZVU4KGkpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgUnVudGltZUV4Y2VwdGlvbignQmFkIEVCTUwgVklOVCBzaXplICcgKyB3aWR0aClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIGVuY29kZSB0aGUgZ2l2ZW4gaW50ZWdlciBhcyBhbiBFQk1MIFZJTlQuXG4gICAqL1xuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLm1lYXN1cmVFQk1MVmFySW50ID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIGlmICh2YWwgPCAoMSA8PCA3KSAtIDEpIHtcbiAgICAgIC8qIFRvcCBiaXQgaXMgc2V0LCBsZWF2aW5nIDcgYml0cyB0byBob2xkIHRoZSBpbnRlZ2VyLCBidXQgd2UgY2FuJ3Qgc3RvcmUgMTI3IGJlY2F1c2VcbiAgICAgICAqIFwiYWxsIGJpdHMgc2V0IHRvIG9uZVwiIGlzIGEgcmVzZXJ2ZWQgdmFsdWUuIFNhbWUgdGhpbmcgZm9yIHRoZSBvdGhlciBjYXNlcyBiZWxvdzpcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2UgaWYgKHZhbCA8ICgxIDw8IDE0KSAtIDEpIHtcbiAgICAgIHJldHVybiAyXG4gICAgfSBlbHNlIGlmICh2YWwgPCAoMSA8PCAyMSkgLSAxKSB7XG4gICAgICByZXR1cm4gM1xuICAgIH0gZWxzZSBpZiAodmFsIDwgKDEgPDwgMjgpIC0gMSkge1xuICAgICAgcmV0dXJuIDRcbiAgICB9IGVsc2UgaWYgKHZhbCA8IDM0MzU5NzM4MzY3KSB7XG4gICAgICAvLyAyIF4gMzUgLSAxIChjYW4gYWRkcmVzcyAzMkdCKVxuICAgICAgcmV0dXJuIDVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFeGNlcHRpb24oJ0VCTUwgVklOVCBzaXplIG5vdCBzdXBwb3J0ZWQgJyArIHZhbClcbiAgICB9XG4gIH1cblxuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLndyaXRlRUJNTFZhckludCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgdGhpcy53cml0ZUVCTUxWYXJJbnRXaWR0aChpLCB0aGlzLm1lYXN1cmVFQk1MVmFySW50KGkpKVxuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlIHRoZSBnaXZlbiB1bnNpZ25lZCAzMi1iaXQgaW50ZWdlciB0byB0aGUgc3RyZWFtIGluIGJpZy1lbmRpYW4gb3JkZXIgdXNpbmcgdGhlIGdpdmVuIGJ5dGUgd2lkdGguXG4gICAqIE5vIGVycm9yIGNoZWNraW5nIGlzIHBlcmZvcm1lZCB0byBlbnN1cmUgdGhhdCB0aGUgc3VwcGxpZWQgd2lkdGggaXMgY29ycmVjdCBmb3IgdGhlIGludGVnZXIuXG4gICAqXG4gICAqIE9taXQgdGhlIHdpZHRoIHBhcmFtZXRlciB0byBoYXZlIGl0IGRldGVybWluZWQgYXV0b21hdGljYWxseSBmb3IgeW91LlxuICAgKlxuICAgKiBAcGFyYW0gdSBVbnNpZ25lZCBpbnRlZ2VyIHRvIGJlIHdyaXR0ZW5cbiAgICogQHBhcmFtIHdpZHRoIE51bWJlciBvZiBieXRlcyB0byB3cml0ZSB0byB0aGUgc3RyZWFtXG4gICAqL1xuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLndyaXRlVW5zaWduZWRJbnRCRSA9IGZ1bmN0aW9uICh1LCB3aWR0aCkge1xuICAgIGlmICh3aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB3aWR0aCA9IHRoaXMubWVhc3VyZVVuc2lnbmVkSW50KHUpXG4gICAgfVxuXG4gICAgLy8gRWFjaCBjYXNlIGZhbGxzIHRocm91Z2g6XG4gICAgc3dpdGNoICh3aWR0aCkge1xuICAgICAgY2FzZSA1OlxuICAgICAgICB0aGlzLndyaXRlVTgoTWF0aC5mbG9vcih1IC8gNDI5NDk2NzI5NikpIC8vIE5lZWQgdG8gdXNlIGRpdmlzaW9uIHRvIGFjY2VzcyA+MzIgYml0cyBvZiBmbG9hdGluZyBwb2ludCB2YXJcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy53cml0ZVU4KHUgPj4gMjQpXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMud3JpdGVVOCh1ID4+IDE2KVxuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLndyaXRlVTgodSA+PiA4KVxuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLndyaXRlVTgodSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBSdW50aW1lRXhjZXB0aW9uKCdCYWQgVUlOVCBzaXplICcgKyB3aWR0aClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIGhvbGQgdGhlIG5vbi16ZXJvIGJpdHMgb2YgdGhlIGdpdmVuIHVuc2lnbmVkIGludGVnZXIuXG4gICAqL1xuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLm1lYXN1cmVVbnNpZ25lZEludCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAvLyBGb3JjZSB0byAzMi1iaXQgdW5zaWduZWQgaW50ZWdlclxuICAgIGlmICh2YWwgPCAxIDw8IDgpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfSBlbHNlIGlmICh2YWwgPCAxIDw8IDE2KSB7XG4gICAgICByZXR1cm4gMlxuICAgIH0gZWxzZSBpZiAodmFsIDwgMSA8PCAyNCkge1xuICAgICAgcmV0dXJuIDNcbiAgICB9IGVsc2UgaWYgKHZhbCA8IDQyOTQ5NjcyOTYpIHtcbiAgICAgIHJldHVybiA0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiA1XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHZpZXcgb24gdGhlIHBvcnRpb24gb2YgdGhlIGJ1ZmZlciBmcm9tIHRoZSBiZWdpbm5pbmcgdG8gdGhlIGN1cnJlbnQgc2VlayBwb3NpdGlvbiBhcyBhIFVpbnQ4QXJyYXkuXG4gICAqL1xuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLmdldEFzRGF0YUFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnBvcyA8IHRoaXMuZGF0YS5ieXRlTGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnN1YmFycmF5KDAsIHRoaXMucG9zKVxuICAgIH0gZWxzZSBpZiAodGhpcy5wb3MgPT0gdGhpcy5kYXRhLmJ5dGVMZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgXCJBcnJheUJ1ZmZlckRhdGFTdHJlYW0ncyBwb3MgbGllcyBiZXlvbmQgZW5kIG9mIGJ1ZmZlclwiXG4gICAgfVxuICB9XG5cbiAgd2luZG93LkFycmF5QnVmZmVyRGF0YVN0cmVhbSA9IEFycmF5QnVmZmVyRGF0YVN0cmVhbVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgYSBzZXJpZXMgb2YgQmxvYi1jb252ZXJ0aWJsZSBvYmplY3RzIChBcnJheUJ1ZmZlciwgQmxvYiwgU3RyaW5nLCBldGMpIHRvIGJlIGFkZGVkIHRvIGEgYnVmZmVyLiBTZWVraW5nIGFuZFxuICAgKiBvdmVyd3JpdGluZyBvZiBibG9icyBpcyBhbGxvd2VkLlxuICAgKlxuICAgKiBZb3UgY2FuIHN1cHBseSBhIEZpbGVXcml0ZXIsIGluIHdoaWNoIGNhc2UgdGhlIEJsb2JCdWZmZXIgaXMganVzdCB1c2VkIGFzIHRlbXBvcmFyeSBzdG9yYWdlIGJlZm9yZSBpdCB3cml0ZXMgaXRcbiAgICogdGhyb3VnaCB0byB0aGUgZGlzay5cbiAgICpcbiAgICogQnkgTmljaG9sYXMgU2hlcmxvY2tcbiAgICpcbiAgICogUmVsZWFzZWQgdW5kZXIgdGhlIFdURlBMdjIgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV1RGUExcbiAgICovXG5cbiAgdmFyIEJsb2JCdWZmZXIgPSAoZnVuY3Rpb24gKGZzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkZXN0aW5hdGlvbikge1xuICAgICAgdmFyIGJ1ZmZlciA9IFtdLFxuICAgICAgICB3cml0ZVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKSxcbiAgICAgICAgZmlsZVdyaXRlciA9IG51bGwsXG4gICAgICAgIGZkID0gbnVsbFxuXG4gICAgICBpZiAodHlwZW9mIEZpbGVXcml0ZXIgIT09ICd1bmRlZmluZWQnICYmIGRlc3RpbmF0aW9uIGluc3RhbmNlb2YgRmlsZVdyaXRlcikge1xuICAgICAgICBmaWxlV3JpdGVyID0gZGVzdGluYXRpb25cbiAgICAgIH0gZWxzZSBpZiAoZnMgJiYgZGVzdGluYXRpb24pIHtcbiAgICAgICAgZmQgPSBkZXN0aW5hdGlvblxuICAgICAgfVxuXG4gICAgICAvLyBDdXJyZW50IHNlZWsgb2Zmc2V0XG4gICAgICB0aGlzLnBvcyA9IDBcblxuICAgICAgLy8gT25lIG1vcmUgdGhhbiB0aGUgaW5kZXggb2YgdGhlIGhpZ2hlc3QgYnl0ZSBldmVyIHdyaXR0ZW5cbiAgICAgIHRoaXMubGVuZ3RoID0gMFxuXG4gICAgICAvLyBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGNvbnZlcnRzIHRoZSBibG9iIHRvIGFuIEFycmF5QnVmZmVyXG4gICAgICBmdW5jdGlvbiByZWFkQmxvYkFzQnVmZmVyKGJsb2IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXG4gICAgICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjb252ZXJ0VG9VaW50OEFycmF5KHRoaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaWYgKHRoaW5nIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGluZylcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgQXJyYXlCdWZmZXIuaXNWaWV3KHRoaW5nKSkge1xuICAgICAgICAgICAgcmVzb2x2ZShuZXcgVWludDhBcnJheSh0aGluZykpXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGluZyBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICAgIHJlYWRCbG9iQXNCdWZmZXIodGhpbmcpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWZmZXIpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vQXNzdW1lIHRoYXQgQmxvYiB3aWxsIGtub3cgaG93IHRvIHJlYWQgdGhpcyB0aGluZ1xuICAgICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgICAgcmVhZEJsb2JBc0J1ZmZlcihuZXcgQmxvYihbdGhpbmddKSkudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlcilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1lYXN1cmVEYXRhKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGRhdGEuYnl0ZUxlbmd0aCB8fCBkYXRhLmxlbmd0aCB8fCBkYXRhLnNpemVcblxuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocmVzdWx0KSkge1xuICAgICAgICAgIHRocm93ICdGYWlsZWQgdG8gZGV0ZXJtaW5lIHNpemUgb2YgZWxlbWVudCdcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBTZWVrIHRvIHRoZSBnaXZlbiBhYnNvbHV0ZSBvZmZzZXQuXG4gICAgICAgKlxuICAgICAgICogWW91IG1heSBub3Qgc2VlayBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgZmlsZSAodGhpcyB3b3VsZCBjcmVhdGUgYSBob2xlIGFuZC9vciBhbGxvdyBibG9ja3MgdG8gYmUgd3JpdHRlbiBpbiBub24tXG4gICAgICAgKiBzZXF1ZW50aWFsIG9yZGVyLCB3aGljaCBpc24ndCBjdXJyZW50bHkgc3VwcG9ydGVkIGJ5IHRoZSBtZW1vcnkgYnVmZmVyIGJhY2tlbmQpLlxuICAgICAgICovXG4gICAgICB0aGlzLnNlZWsgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgdGhyb3cgJ09mZnNldCBtYXkgbm90IGJlIG5lZ2F0aXZlJ1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKG9mZnNldCkpIHtcbiAgICAgICAgICB0aHJvdyAnT2Zmc2V0IG1heSBub3QgYmUgTmFOJ1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgJ1NlZWtpbmcgYmV5b25kIHRoZSBlbmQgb2YgZmlsZSBpcyBub3QgYWxsb3dlZCdcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9zID0gb2Zmc2V0XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogV3JpdGUgdGhlIEJsb2ItY29udmVydGlibGUgZGF0YSB0byB0aGUgYnVmZmVyIGF0IHRoZSBjdXJyZW50IHNlZWsgcG9zaXRpb24uXG4gICAgICAgKlxuICAgICAgICogTm90ZTogSWYgb3ZlcndyaXRpbmcgZXhpc3RpbmcgZGF0YSwgdGhlIHdyaXRlIG11c3Qgbm90IGNyb3NzIHByZWV4aXN0aW5nIGJsb2NrIGJvdW5kYXJpZXMgKHdyaXR0ZW4gZGF0YSBtdXN0XG4gICAgICAgKiBiZSBmdWxseSBjb250YWluZWQgYnkgdGhlIGV4dGVudCBvZiBhIHByZXZpb3VzIHdyaXRlKS5cbiAgICAgICAqL1xuICAgICAgdGhpcy53cml0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBuZXdFbnRyeSA9IHtcbiAgICAgICAgICAgIG9mZnNldDogdGhpcy5wb3MsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgbGVuZ3RoOiBtZWFzdXJlRGF0YShkYXRhKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzQXBwZW5kID0gbmV3RW50cnkub2Zmc2V0ID49IHRoaXMubGVuZ3RoXG5cbiAgICAgICAgdGhpcy5wb3MgKz0gbmV3RW50cnkubGVuZ3RoXG4gICAgICAgIHRoaXMubGVuZ3RoID0gTWF0aC5tYXgodGhpcy5sZW5ndGgsIHRoaXMucG9zKVxuXG4gICAgICAgIC8vIEFmdGVyIHByZXZpb3VzIHdyaXRlcyBjb21wbGV0ZSwgcGVyZm9ybSBvdXIgd3JpdGVcbiAgICAgICAgd3JpdGVQcm9taXNlID0gd3JpdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChmZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgY29udmVydFRvVWludDhBcnJheShuZXdFbnRyeS5kYXRhKS50aGVuKGZ1bmN0aW9uIChkYXRhQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxXcml0dGVuID0gMCxcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGRhdGFBcnJheS5idWZmZXIpLFxuICAgICAgICAgICAgICAgICAgaGFuZGxlV3JpdGVDb21wbGV0ZSA9IGZ1bmN0aW9uIChlcnIsIHdyaXR0ZW4sIGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFdyaXR0ZW4gKz0gd3JpdHRlblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbFdyaXR0ZW4gPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHN0aWxsIGhhdmUgbW9yZSB0byB3cml0ZS4uLlxuICAgICAgICAgICAgICAgICAgICAgIC8vIC8vZnMud3JpdGUoXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBmZCxcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGJ1ZmZlcixcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIHRvdGFsV3JpdHRlbixcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGJ1ZmZlci5sZW5ndGggLSB0b3RhbFdyaXR0ZW4sXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBuZXdFbnRyeS5vZmZzZXQgKyB0b3RhbFdyaXR0ZW4sXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBoYW5kbGVXcml0ZUNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyAvL2ZzLndyaXRlKGZkLCBidWZmZXIsIDAsIGJ1ZmZlci5sZW5ndGgsIG5ld0VudHJ5Lm9mZnNldCwgaGFuZGxlV3JpdGVDb21wbGV0ZSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIGlmIChmaWxlV3JpdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICBmaWxlV3JpdGVyLm9ud3JpdGVlbmQgPSByZXNvbHZlXG5cbiAgICAgICAgICAgICAgZmlsZVdyaXRlci5zZWVrKG5ld0VudHJ5Lm9mZnNldClcbiAgICAgICAgICAgICAgZmlsZVdyaXRlci53cml0ZShuZXcgQmxvYihbbmV3RW50cnkuZGF0YV0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKCFpc0FwcGVuZCkge1xuICAgICAgICAgICAgLy8gV2UgbWlnaHQgYmUgbW9kaWZ5aW5nIGEgd3JpdGUgdGhhdCB3YXMgYWxyZWFkeSBidWZmZXJlZCBpbiBtZW1vcnkuXG5cbiAgICAgICAgICAgIC8vIFNsb3cgbGluZWFyIHNlYXJjaCB0byBmaW5kIGEgYmxvY2sgd2UgbWlnaHQgYmUgb3ZlcndyaXRpbmdcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IGJ1ZmZlcltpXVxuXG4gICAgICAgICAgICAgIC8vIElmIG91ciBuZXcgZW50cnkgb3ZlcmxhcHMgdGhlIG9sZCBvbmUgaW4gYW55IHdheS4uLlxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIShuZXdFbnRyeS5vZmZzZXQgKyBuZXdFbnRyeS5sZW5ndGggPD0gZW50cnkub2Zmc2V0IHx8IG5ld0VudHJ5Lm9mZnNldCA+PSBlbnRyeS5vZmZzZXQgKyBlbnRyeS5sZW5ndGgpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdFbnRyeS5vZmZzZXQgPCBlbnRyeS5vZmZzZXQgfHwgbmV3RW50cnkub2Zmc2V0ICsgbmV3RW50cnkubGVuZ3RoID4gZW50cnkub2Zmc2V0ICsgZW50cnkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJ3cml0ZSBjcm9zc2VzIGJsb2IgYm91bmRhcmllcycpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0VudHJ5Lm9mZnNldCA9PSBlbnRyeS5vZmZzZXQgJiYgbmV3RW50cnkubGVuZ3RoID09IGVudHJ5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgLy8gV2Ugb3Zlcndyb3RlIHRoZSBlbnRpcmUgYmxvY2tcbiAgICAgICAgICAgICAgICAgIGVudHJ5LmRhdGEgPSBuZXdFbnRyeS5kYXRhXG5cbiAgICAgICAgICAgICAgICAgIC8vIFdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29udmVydFRvVWludDhBcnJheShlbnRyeS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZW50cnlBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LmRhdGEgPSBlbnRyeUFycmF5XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udmVydFRvVWludDhBcnJheShuZXdFbnRyeS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobmV3RW50cnlBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgIG5ld0VudHJ5LmRhdGEgPSBuZXdFbnRyeUFycmF5XG5cbiAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5kYXRhLnNldChuZXdFbnRyeS5kYXRhLCBuZXdFbnRyeS5vZmZzZXQgLSBlbnRyeS5vZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFbHNlIGZhbGwgdGhyb3VnaCB0byBkbyBhIHNpbXBsZSBhcHBlbmQsIGFzIHdlIGRpZG4ndCBvdmVyd3JpdGUgYW55IHByZS1leGlzdGluZyBibG9ja3NcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIucHVzaChuZXdFbnRyeSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBGaW5pc2ggYWxsIHdyaXRlcyB0byB0aGUgYnVmZmVyLCByZXR1cm5pbmcgYSBwcm9taXNlIHRoYXQgc2lnbmFscyB3aGVuIHRoYXQgaXMgY29tcGxldGUuXG4gICAgICAgKlxuICAgICAgICogSWYgYSBGaWxlV3JpdGVyIHdhcyBub3QgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggYSBCbG9iIHRoYXQgcmVwcmVzZW50cyB0aGUgY29tcGxldGVkIEJsb2JCdWZmZXJcbiAgICAgICAqIGNvbnRlbnRzLiBZb3UgY2FuIG9wdGlvbmFsbHkgcGFzcyBpbiBhIG1pbWVUeXBlIHRvIGJlIHVzZWQgZm9yIHRoaXMgYmxvYi5cbiAgICAgICAqXG4gICAgICAgKiBJZiBhIEZpbGVXcml0ZXIgd2FzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG51bGwgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxuICAgICAgICovXG4gICAgICB0aGlzLmNvbXBsZXRlID0gZnVuY3Rpb24gKG1pbWVUeXBlKSB7XG4gICAgICAgIGlmIChmZCB8fCBmaWxlV3JpdGVyKSB7XG4gICAgICAgICAgd3JpdGVQcm9taXNlID0gd3JpdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEFmdGVyIHdyaXRlcyBjb21wbGV0ZSB3ZSBuZWVkIHRvIG1lcmdlIHRoZSBidWZmZXIgdG8gZ2l2ZSB0byB0aGUgY2FsbGVyXG4gICAgICAgICAgd3JpdGVQcm9taXNlID0gd3JpdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGJ1ZmZlcltpXS5kYXRhKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJsb2IocmVzdWx0LCB7IG1pbWVUeXBlOiBtaW1lVHlwZSB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd3JpdGVQcm9taXNlXG4gICAgICB9XG4gICAgfVxuICB9KShpc05vZGVFbnZpcm9tZW50ID8gbnVsbCA6IG51bGwpXG5cbiAgd2luZG93LkJsb2JCdWZmZXIgPSBCbG9iQnVmZmVyXG5cbiAgLyoqXG4gICAqIFdlYk0gdmlkZW8gZW5jb2RlciBmb3IgR29vZ2xlIENocm9tZS4gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBzdWl0YWJsZSBmb3IgY3JlYXRpbmcgdmVyeSBsYXJnZSB2aWRlbyBmaWxlcywgYmVjYXVzZVxuICAgKiBpdCBjYW4gc3RyZWFtIEJsb2JzIGRpcmVjdGx5IHRvIGEgRmlsZVdyaXRlciB3aXRob3V0IGJ1ZmZlcmluZyB0aGUgZW50aXJlIHZpZGVvIGluIG1lbW9yeS5cbiAgICpcbiAgICogV2hlbiBGaWxlV3JpdGVyIGlzIG5vdCBhdmFpbGFibGUgb3Igbm90IGRlc2lyZWQsIGl0IGNhbiBidWZmZXIgdGhlIHZpZGVvIGluIG1lbW9yeSBhcyBhIHNlcmllcyBvZiBCbG9icyB3aGljaCBhcmVcbiAgICogZXZlbnR1YWxseSByZXR1cm5lZCBhcyBvbmUgY29tcG9zaXRlIEJsb2IuXG4gICAqXG4gICAqIEJ5IE5pY2hvbGFzIFNoZXJsb2NrLlxuICAgKlxuICAgKiBCYXNlZCBvbiB0aGUgaWRlYXMgZnJvbSBXaGFtbXk6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRpbWF0dGVyMTUvd2hhbW15XG4gICAqXG4gICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBXVEZQTHYyIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dURlBMXG4gICAqL1xuXG4gIHZhciBXZWJNV3JpdGVyID0gZnVuY3Rpb24gKEFycmF5QnVmZmVyRGF0YVN0cmVhbSwgQmxvYkJ1ZmZlcikge1xuICAgIGZ1bmN0aW9uIGV4dGVuZChiYXNlLCB0b3ApIHtcbiAgICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgICA7W2Jhc2UsIHRvcF0uZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiB0YXJnZXRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgYSBCYXNlNjQgZGF0YSBVUkwgaW50byBhIGJpbmFyeSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIHRoZSBiaW5hcnkgc3RyaW5nLCBvciBmYWxzZSBpZiB0aGUgVVJMIGNvdWxkIG5vdCBiZSBkZWNvZGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlY29kZUJhc2U2NFdlYlBEYXRhVVJMKHVybCkge1xuICAgICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnIHx8ICF1cmwubWF0Y2goL15kYXRhOmltYWdlXFwvd2VicDtiYXNlNjQsL2kpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gd2luZG93LmF0b2IodXJsLnN1YnN0cmluZygnZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCwnLmxlbmd0aCkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIHJhdyBiaW5hcnkgc3RyaW5nIChvbmUgY2hhcmFjdGVyID0gb25lIG91dHB1dCBieXRlKSB0byBhbiBBcnJheUJ1ZmZlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0cmluZ1RvQXJyYXlCdWZmZXIoc3RyaW5nKSB7XG4gICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHN0cmluZy5sZW5ndGgpLFxuICAgICAgICBpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIpXG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGludDhBcnJheVtpXSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWZmZXJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IHRoZSBnaXZlbiBjYW52YXMgdG8gYSBXZWJQIGVuY29kZWQgaW1hZ2UgYW5kIHJldHVybiB0aGUgaW1hZ2UgZGF0YSBhcyBhIHN0cmluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZW5kZXJBc1dlYlAoY2FudmFzLCBxdWFsaXR5KSB7XG4gICAgICB2YXIgZnJhbWUgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS93ZWJwJywgeyBxdWFsaXR5OiBxdWFsaXR5IH0pXG5cbiAgICAgIHJldHVybiBkZWNvZGVCYXNlNjRXZWJQRGF0YVVSTChmcmFtZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRyYWN0S2V5ZnJhbWVGcm9tV2ViUCh3ZWJQKSB7XG4gICAgICAvLyBBc3N1bWUgdGhhdCBDaHJvbWUgd2lsbCBnZW5lcmF0ZSBhIFNpbXBsZSBMb3NzeSBXZWJQIHdoaWNoIGhhcyB0aGlzIGhlYWRlcjpcbiAgICAgIHZhciBrZXlmcmFtZVN0YXJ0SW5kZXggPSB3ZWJQLmluZGV4T2YoJ1ZQOCAnKVxuXG4gICAgICBpZiAoa2V5ZnJhbWVTdGFydEluZGV4ID09IC0xKSB7XG4gICAgICAgIHRocm93ICdGYWlsZWQgdG8gaWRlbnRpZnkgYmVnaW5uaW5nIG9mIGtleWZyYW1lIGluIFdlYlAgaW1hZ2UnXG4gICAgICB9XG5cbiAgICAgIC8vIFNraXAgdGhlIGhlYWRlciBhbmQgdGhlIDQgYnl0ZXMgdGhhdCBlbmNvZGUgdGhlIGxlbmd0aCBvZiB0aGUgVlA4IGNodW5rXG4gICAgICBrZXlmcmFtZVN0YXJ0SW5kZXggKz0gJ1ZQOCAnLmxlbmd0aCArIDRcblxuICAgICAgcmV0dXJuIHdlYlAuc3Vic3RyaW5nKGtleWZyYW1lU3RhcnRJbmRleClcbiAgICB9XG5cbiAgICAvLyBKdXN0IGEgbGl0dGxlIHV0aWxpdHkgc28gd2UgY2FuIHRhZyB2YWx1ZXMgYXMgZmxvYXRzIGZvciB0aGUgRUJNTCBlbmNvZGVyJ3MgYmVuZWZpdFxuICAgIGZ1bmN0aW9uIEVCTUxGbG9hdDMyKHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBFQk1MRmxvYXQ2NCh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGUgdGhlIGdpdmVuIEVCTUwgb2JqZWN0IHRvIHRoZSBwcm92aWRlZCBBcnJheUJ1ZmZlclN0cmVhbS5cbiAgICAgKlxuICAgICAqIFRoZSBidWZmZXIncyBmaXJzdCBieXRlIGlzIGF0IGJ1ZmZlckZpbGVPZmZzZXQgaW5zaWRlIHRoZSB2aWRlbyBmaWxlLiBUaGlzIGlzIHVzZWQgdG8gY29tcGxldGUgb2Zmc2V0IGFuZFxuICAgICAqIGRhdGFPZmZzZXQgZmllbGRzIGluIGVhY2ggRUJNTCBzdHJ1Y3R1cmUsIGluZGljYXRpbmcgdGhlIGZpbGUgb2Zmc2V0IG9mIHRoZSBmaXJzdCBieXRlIG9mIHRoZSBFQk1MIGVsZW1lbnQgYW5kXG4gICAgICogaXRzIGRhdGEgcGF5bG9hZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3cml0ZUVCTUwoYnVmZmVyLCBidWZmZXJGaWxlT2Zmc2V0LCBlYm1sKSB7XG4gICAgICAvLyBJcyB0aGUgZWJtbCBhbiBhcnJheSBvZiBzaWJsaW5nIGVsZW1lbnRzP1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWJtbCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlYm1sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgd3JpdGVFQk1MKGJ1ZmZlciwgYnVmZmVyRmlsZU9mZnNldCwgZWJtbFtpXSlcbiAgICAgICAgfVxuICAgICAgICAvLyBJcyB0aGlzIHNvbWUgc29ydCBvZiByYXcgZGF0YSB0aGF0IHdlIHdhbnQgdG8gd3JpdGUgZGlyZWN0bHk/XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlYm1sID09PSAnc3RyaW5nJykge1xuICAgICAgICBidWZmZXIud3JpdGVTdHJpbmcoZWJtbClcbiAgICAgIH0gZWxzZSBpZiAoZWJtbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgYnVmZmVyLndyaXRlQnl0ZXMoZWJtbClcbiAgICAgIH0gZWxzZSBpZiAoZWJtbC5pZCkge1xuICAgICAgICAvLyBXZSdyZSB3cml0aW5nIGFuIEVCTUwgZWxlbWVudFxuICAgICAgICBlYm1sLm9mZnNldCA9IGJ1ZmZlci5wb3MgKyBidWZmZXJGaWxlT2Zmc2V0XG5cbiAgICAgICAgYnVmZmVyLndyaXRlVW5zaWduZWRJbnRCRShlYm1sLmlkKSAvLyBJRCBmaWVsZFxuXG4gICAgICAgIC8vIE5vdyB3ZSBuZWVkIHRvIHdyaXRlIHRoZSBzaXplIGZpZWxkLCBzbyB3ZSBtdXN0IGtub3cgdGhlIHBheWxvYWQgc2l6ZTpcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlYm1sLmRhdGEpKSB7XG4gICAgICAgICAgLy8gV3JpdGluZyBhbiBhcnJheSBvZiBjaGlsZCBlbGVtZW50cy4gV2Ugd29uJ3QgdHJ5IHRvIG1lYXN1cmUgdGhlIHNpemUgb2YgdGhlIGNoaWxkcmVuIHVwLWZyb250XG5cbiAgICAgICAgICB2YXIgc2l6ZVBvcywgZGF0YUJlZ2luLCBkYXRhRW5kXG5cbiAgICAgICAgICBpZiAoZWJtbC5zaXplID09PSAtMSkge1xuICAgICAgICAgICAgLy8gV3JpdGUgdGhlIHJlc2VydmVkIGFsbC1vbmUtYml0cyBtYXJrZXIgdG8gbm90ZSB0aGF0IHRoZSBzaXplIG9mIHRoaXMgZWxlbWVudCBpcyB1bmtub3duL3VuYm91bmRlZFxuICAgICAgICAgICAgYnVmZmVyLndyaXRlQnl0ZSgweGZmKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaXplUG9zID0gYnVmZmVyLnBvc1xuXG4gICAgICAgICAgICAvKiBXcml0ZSBhIGR1bW15IHNpemUgZmllbGQgdG8gb3ZlcndyaXRlIGxhdGVyLiA0IGJ5dGVzIGFsbG93cyBhbiBlbGVtZW50IG1heGltdW0gc2l6ZSBvZiAyNTZNQixcbiAgICAgICAgICAgICAqIHdoaWNoIHNob3VsZCBiZSBwbGVudHkgKHdlIGRvbid0IHdhbnQgdG8gaGF2ZSB0byBidWZmZXIgdGhhdCBtdWNoIGRhdGEgaW4gbWVtb3J5IGF0IG9uZSB0aW1lXG4gICAgICAgICAgICAgKiBhbnl3YXkhKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBidWZmZXIud3JpdGVCeXRlcyhbMCwgMCwgMCwgMF0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGF0YUJlZ2luID0gYnVmZmVyLnBvc1xuXG4gICAgICAgICAgZWJtbC5kYXRhT2Zmc2V0ID0gZGF0YUJlZ2luICsgYnVmZmVyRmlsZU9mZnNldFxuICAgICAgICAgIHdyaXRlRUJNTChidWZmZXIsIGJ1ZmZlckZpbGVPZmZzZXQsIGVibWwuZGF0YSlcblxuICAgICAgICAgIGlmIChlYm1sLnNpemUgIT09IC0xKSB7XG4gICAgICAgICAgICBkYXRhRW5kID0gYnVmZmVyLnBvc1xuXG4gICAgICAgICAgICBlYm1sLnNpemUgPSBkYXRhRW5kIC0gZGF0YUJlZ2luXG5cbiAgICAgICAgICAgIGJ1ZmZlci5zZWVrKHNpemVQb3MpXG4gICAgICAgICAgICBidWZmZXIud3JpdGVFQk1MVmFySW50V2lkdGgoZWJtbC5zaXplLCA0KSAvLyBTaXplIGZpZWxkXG5cbiAgICAgICAgICAgIGJ1ZmZlci5zZWVrKGRhdGFFbmQpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlYm1sLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYnVmZmVyLndyaXRlRUJNTFZhckludChlYm1sLmRhdGEubGVuZ3RoKSAvLyBTaXplIGZpZWxkXG4gICAgICAgICAgZWJtbC5kYXRhT2Zmc2V0ID0gYnVmZmVyLnBvcyArIGJ1ZmZlckZpbGVPZmZzZXRcbiAgICAgICAgICBidWZmZXIud3JpdGVTdHJpbmcoZWJtbC5kYXRhKVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlYm1sLmRhdGEgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgLy8gQWxsb3cgdGhlIGNhbGxlciB0byBleHBsaWNpdGx5IGNob29zZSB0aGUgc2l6ZSBpZiB0aGV5IHdpc2ggYnkgc3VwcGx5aW5nIGEgc2l6ZSBmaWVsZFxuICAgICAgICAgIGlmICghZWJtbC5zaXplKSB7XG4gICAgICAgICAgICBlYm1sLnNpemUgPSBidWZmZXIubWVhc3VyZVVuc2lnbmVkSW50KGVibWwuZGF0YSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIud3JpdGVFQk1MVmFySW50KGVibWwuc2l6ZSkgLy8gU2l6ZSBmaWVsZFxuICAgICAgICAgIGVibWwuZGF0YU9mZnNldCA9IGJ1ZmZlci5wb3MgKyBidWZmZXJGaWxlT2Zmc2V0XG4gICAgICAgICAgYnVmZmVyLndyaXRlVW5zaWduZWRJbnRCRShlYm1sLmRhdGEsIGVibWwuc2l6ZSlcbiAgICAgICAgfSBlbHNlIGlmIChlYm1sLmRhdGEgaW5zdGFuY2VvZiBFQk1MRmxvYXQ2NCkge1xuICAgICAgICAgIGJ1ZmZlci53cml0ZUVCTUxWYXJJbnQoOCkgLy8gU2l6ZSBmaWVsZFxuICAgICAgICAgIGVibWwuZGF0YU9mZnNldCA9IGJ1ZmZlci5wb3MgKyBidWZmZXJGaWxlT2Zmc2V0XG4gICAgICAgICAgYnVmZmVyLndyaXRlRG91YmxlQkUoZWJtbC5kYXRhLnZhbHVlKVxuICAgICAgICB9IGVsc2UgaWYgKGVibWwuZGF0YSBpbnN0YW5jZW9mIEVCTUxGbG9hdDMyKSB7XG4gICAgICAgICAgYnVmZmVyLndyaXRlRUJNTFZhckludCg0KSAvLyBTaXplIGZpZWxkXG4gICAgICAgICAgZWJtbC5kYXRhT2Zmc2V0ID0gYnVmZmVyLnBvcyArIGJ1ZmZlckZpbGVPZmZzZXRcbiAgICAgICAgICBidWZmZXIud3JpdGVGbG9hdEJFKGVibWwuZGF0YS52YWx1ZSlcbiAgICAgICAgfSBlbHNlIGlmIChlYm1sLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgYnVmZmVyLndyaXRlRUJNTFZhckludChlYm1sLmRhdGEuYnl0ZUxlbmd0aCkgLy8gU2l6ZSBmaWVsZFxuICAgICAgICAgIGVibWwuZGF0YU9mZnNldCA9IGJ1ZmZlci5wb3MgKyBidWZmZXJGaWxlT2Zmc2V0XG4gICAgICAgICAgYnVmZmVyLndyaXRlQnl0ZXMoZWJtbC5kYXRhKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICdCYWQgRUJNTCBkYXRhdHlwZSAnICsgdHlwZW9mIGVibWwuZGF0YVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnQmFkIEVCTUwgZGF0YXR5cGUgJyArIHR5cGVvZiBlYm1sLmRhdGFcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgIHZhciBNQVhfQ0xVU1RFUl9EVVJBVElPTl9NU0VDID0gNTAwMCxcbiAgICAgICAgREVGQVVMVF9UUkFDS19OVU1CRVIgPSAxLFxuICAgICAgICB3cml0dGVuSGVhZGVyID0gZmFsc2UsXG4gICAgICAgIHZpZGVvV2lkdGgsXG4gICAgICAgIHZpZGVvSGVpZ2h0LFxuICAgICAgICBjbHVzdGVyRnJhbWVCdWZmZXIgPSBbXSxcbiAgICAgICAgY2x1c3RlclN0YXJ0VGltZSA9IDAsXG4gICAgICAgIGNsdXN0ZXJEdXJhdGlvbiA9IDAsXG4gICAgICAgIG9wdGlvbkRlZmF1bHRzID0ge1xuICAgICAgICAgIHF1YWxpdHk6IDAuOTUsIC8vIFdlYk0gaW1hZ2UgcXVhbGl0eSBmcm9tIDAuMCAod29yc3QpIHRvIDEuMCAoYmVzdClcbiAgICAgICAgICBmaWxlV3JpdGVyOiBudWxsLCAvLyBDaHJvbWUgRmlsZVdyaXRlciBpbiBvcmRlciB0byBzdHJlYW0gdG8gYSBmaWxlIGluc3RlYWQgb2YgYnVmZmVyaW5nIHRvIG1lbW9yeSAob3B0aW9uYWwpXG4gICAgICAgICAgZmQ6IG51bGwsIC8vIE5vZGUuSlMgZmlsZSBkZXNjcmlwdG9yIHRvIHdyaXRlIHRvIGluc3RlYWQgb2YgYnVmZmVyaW5nIChvcHRpb25hbClcblxuICAgICAgICAgIC8vIFlvdSBtdXN0IHN1cHBseSBvbmUgb2Y6XG4gICAgICAgICAgZnJhbWVEdXJhdGlvbjogbnVsbCwgLy8gRHVyYXRpb24gb2YgZnJhbWVzIGluIG1pbGxpc2Vjb25kc1xuICAgICAgICAgIGZyYW1lUmF0ZTogbnVsbCwgLy8gTnVtYmVyIG9mIGZyYW1lcyBwZXIgc2Vjb25kXG4gICAgICAgIH0sXG4gICAgICAgIHNlZWtQb2ludHMgPSB7XG4gICAgICAgICAgQ3VlczogeyBpZDogbmV3IFVpbnQ4QXJyYXkoWzB4MWMsIDB4NTMsIDB4YmIsIDB4NmJdKSwgcG9zaXRpb25FQk1MOiBudWxsIH0sXG4gICAgICAgICAgU2VnbWVudEluZm86IHsgaWQ6IG5ldyBVaW50OEFycmF5KFsweDE1LCAweDQ5LCAweGE5LCAweDY2XSksIHBvc2l0aW9uRUJNTDogbnVsbCB9LFxuICAgICAgICAgIFRyYWNrczogeyBpZDogbmV3IFVpbnQ4QXJyYXkoWzB4MTYsIDB4NTQsIDB4YWUsIDB4NmJdKSwgcG9zaXRpb25FQk1MOiBudWxsIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVibWxTZWdtZW50LFxuICAgICAgICBzZWdtZW50RHVyYXRpb24gPSB7XG4gICAgICAgICAgaWQ6IDB4NDQ4OSwgLy8gRHVyYXRpb25cbiAgICAgICAgICBkYXRhOiBuZXcgRUJNTEZsb2F0NjQoMCksXG4gICAgICAgIH0sXG4gICAgICAgIHNlZWtIZWFkLFxuICAgICAgICBjdWVzID0gW10sXG4gICAgICAgIGJsb2JCdWZmZXIgPSBuZXcgQmxvYkJ1ZmZlcihvcHRpb25zLmZpbGVXcml0ZXIgfHwgb3B0aW9ucy5mZClcblxuICAgICAgZnVuY3Rpb24gZmlsZU9mZnNldFRvU2VnbWVudFJlbGF0aXZlKGZpbGVPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVPZmZzZXQgLSBlYm1sU2VnbWVudC5kYXRhT2Zmc2V0XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlIGEgU2Vla0hlYWQgZWxlbWVudCB3aXRoIGRlc2NyaXB0b3JzIGZvciB0aGUgcG9pbnRzIGluIHRoZSBnbG9iYWwgc2Vla1BvaW50cyBhcnJheS5cbiAgICAgICAqXG4gICAgICAgKiA1IGJ5dGVzIG9mIHBvc2l0aW9uIHZhbHVlcyBhcmUgcmVzZXJ2ZWQgZm9yIGVhY2ggbm9kZSwgd2hpY2ggbGllIGF0IHRoZSBvZmZzZXQgcG9pbnQucG9zaXRpb25FQk1MLmRhdGFPZmZzZXQsXG4gICAgICAgKiB0byBiZSBvdmVyd3JpdHRlbiBsYXRlci5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gY3JlYXRlU2Vla0hlYWQoKSB7XG4gICAgICAgIHZhciBzZWVrUG9zaXRpb25FQk1MVGVtcGxhdGUgPSB7XG4gICAgICAgICAgICBpZDogMHg1M2FjLCAvLyBTZWVrUG9zaXRpb25cbiAgICAgICAgICAgIHNpemU6IDUsIC8vIEFsbG93cyBmb3IgMzJHQiB2aWRlbyBmaWxlc1xuICAgICAgICAgICAgZGF0YTogMCwgLy8gV2UnbGwgb3ZlcndyaXRlIHRoaXMgd2hlbiB0aGUgZmlsZSBpcyBjb21wbGV0ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgaWQ6IDB4MTE0ZDliNzQsIC8vIFNlZWtIZWFkXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBzZWVrUG9pbnRzKSB7XG4gICAgICAgICAgdmFyIHNlZWtQb2ludCA9IHNlZWtQb2ludHNbbmFtZV1cblxuICAgICAgICAgIHNlZWtQb2ludC5wb3NpdGlvbkVCTUwgPSBPYmplY3QuY3JlYXRlKHNlZWtQb3NpdGlvbkVCTUxUZW1wbGF0ZSlcblxuICAgICAgICAgIHJlc3VsdC5kYXRhLnB1c2goe1xuICAgICAgICAgICAgaWQ6IDB4NGRiYiwgLy8gU2Vla1xuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDB4NTNhYiwgLy8gU2Vla0lEXG4gICAgICAgICAgICAgICAgZGF0YTogc2Vla1BvaW50LmlkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZWVrUG9pbnQucG9zaXRpb25FQk1MLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFdyaXRlIHRoZSBXZWJNIGZpbGUgaGVhZGVyIHRvIHRoZSBzdHJlYW0uXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHdyaXRlSGVhZGVyKCkge1xuICAgICAgICBzZWVrSGVhZCA9IGNyZWF0ZVNlZWtIZWFkKClcblxuICAgICAgICB2YXIgZWJtbEhlYWRlciA9IHtcbiAgICAgICAgICAgIGlkOiAweDFhNDVkZmEzLCAvLyBFQk1MXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMHg0Mjg2LCAvLyBFQk1MVmVyc2lvblxuICAgICAgICAgICAgICAgIGRhdGE6IDEsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMHg0MmY3LCAvLyBFQk1MUmVhZFZlcnNpb25cbiAgICAgICAgICAgICAgICBkYXRhOiAxLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDB4NDJmMiwgLy8gRUJNTE1heElETGVuZ3RoXG4gICAgICAgICAgICAgICAgZGF0YTogNCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweDQyZjMsIC8vIEVCTUxNYXhTaXplTGVuZ3RoXG4gICAgICAgICAgICAgICAgZGF0YTogOCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweDQyODIsIC8vIERvY1R5cGVcbiAgICAgICAgICAgICAgICBkYXRhOiAnd2VibScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMHg0Mjg3LCAvLyBEb2NUeXBlVmVyc2lvblxuICAgICAgICAgICAgICAgIGRhdGE6IDIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMHg0Mjg1LCAvLyBEb2NUeXBlUmVhZFZlcnNpb25cbiAgICAgICAgICAgICAgICBkYXRhOiAyLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNlZ21lbnRJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IDB4MTU0OWE5NjYsIC8vIEluZm9cbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweDJhZDdiMSwgLy8gVGltZWNvZGVTY2FsZVxuICAgICAgICAgICAgICAgIGRhdGE6IDFlNiwgLy8gVGltZXMgd2lsbCBiZSBpbiBtaWxpc2Vjb25kcyAoMWU2IG5hbm9zZWNvbmRzIHBlciBzdGVwID0gMW1zKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDB4NGQ4MCwgLy8gTXV4aW5nQXBwXG4gICAgICAgICAgICAgICAgZGF0YTogJ3dlYm0td3JpdGVyLWpzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweDU3NDEsIC8vIFdyaXRpbmdBcHBcbiAgICAgICAgICAgICAgICBkYXRhOiAnd2VibS13cml0ZXItanMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZWdtZW50RHVyYXRpb24sIC8vIFRvIGJlIGZpbGxlZCBpbiBsYXRlclxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYWNrcyA9IHtcbiAgICAgICAgICAgIGlkOiAweDE2NTRhZTZiLCAvLyBUcmFja3NcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweGFlLCAvLyBUcmFja0VudHJ5XG4gICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMHhkNywgLy8gVHJhY2tOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogREVGQVVMVF9UUkFDS19OVU1CRVIsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMHg3M2M1LCAvLyBUcmFja1VJRFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBERUZBVUxUX1RSQUNLX05VTUJFUixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAweDljLCAvLyBGbGFnTGFjaW5nXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IDAsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMHgyMmI1OWMsIC8vIExhbmd1YWdlXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICd1bmQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDB4ODYsIC8vIENvZGVjSURcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1ZfVlA4JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAweDI1ODY4OCwgLy8gQ29kZWNOYW1lXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICdWUDgnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDB4ODMsIC8vIFRyYWNrVHlwZVxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAxLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDB4ZTAsIC8vIFZpZGVvXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMHhiMCwgLy8gUGl4ZWxXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlkZW9XaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAweGJhLCAvLyBQaXhlbEhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlkZW9IZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfVxuXG4gICAgICAgIGVibWxTZWdtZW50ID0ge1xuICAgICAgICAgIGlkOiAweDE4NTM4MDY3LCAvLyBTZWdtZW50XG4gICAgICAgICAgc2l6ZTogLTEsIC8vIFVuYm91bmRlZCBzaXplXG4gICAgICAgICAgZGF0YTogW3NlZWtIZWFkLCBzZWdtZW50SW5mbywgdHJhY2tzXSxcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBidWZmZXJTdHJlYW0gPSBuZXcgQXJyYXlCdWZmZXJEYXRhU3RyZWFtKDI1NilcblxuICAgICAgICB3cml0ZUVCTUwoYnVmZmVyU3RyZWFtLCBibG9iQnVmZmVyLnBvcywgW2VibWxIZWFkZXIsIGVibWxTZWdtZW50XSlcbiAgICAgICAgYmxvYkJ1ZmZlci53cml0ZShidWZmZXJTdHJlYW0uZ2V0QXNEYXRhQXJyYXkoKSlcblxuICAgICAgICAvLyBOb3cgd2Uga25vdyB3aGVyZSB0aGVzZSB0b3AtbGV2ZWwgZWxlbWVudHMgbGllIGluIHRoZSBmaWxlOlxuICAgICAgICBzZWVrUG9pbnRzLlNlZ21lbnRJbmZvLnBvc2l0aW9uRUJNTC5kYXRhID0gZmlsZU9mZnNldFRvU2VnbWVudFJlbGF0aXZlKHNlZ21lbnRJbmZvLm9mZnNldClcbiAgICAgICAgc2Vla1BvaW50cy5UcmFja3MucG9zaXRpb25FQk1MLmRhdGEgPSBmaWxlT2Zmc2V0VG9TZWdtZW50UmVsYXRpdmUodHJhY2tzLm9mZnNldClcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGUgYSBTaW1wbGVCbG9jayBrZXlmcmFtZSBoZWFkZXIgdXNpbmcgdGhlc2UgZmllbGRzOlxuICAgICAgICogICAgIHRpbWVjb2RlICAgIC0gVGltZSBvZiB0aGlzIGtleWZyYW1lXG4gICAgICAgKiAgICAgdHJhY2tOdW1iZXIgLSBUcmFjayBudW1iZXIgZnJvbSAxIHRvIDEyNiAoaW5jbHVzaXZlKVxuICAgICAgICogICAgIGZyYW1lICAgICAgIC0gUmF3IGZyYW1lIGRhdGEgcGF5bG9hZCBzdHJpbmdcbiAgICAgICAqXG4gICAgICAgKiBSZXR1cm5zIGFuIEVCTUwgZWxlbWVudC5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gY3JlYXRlS2V5ZnJhbWVCbG9jayhrZXlmcmFtZSkge1xuICAgICAgICB2YXIgYnVmZmVyU3RyZWFtID0gbmV3IEFycmF5QnVmZmVyRGF0YVN0cmVhbSgxICsgMiArIDEpXG5cbiAgICAgICAgaWYgKCEoa2V5ZnJhbWUudHJhY2tOdW1iZXIgPiAwICYmIGtleWZyYW1lLnRyYWNrTnVtYmVyIDwgMTI3KSkge1xuICAgICAgICAgIHRocm93ICdUcmFja051bWJlciBtdXN0IGJlID4gMCBhbmQgPCAxMjcnXG4gICAgICAgIH1cblxuICAgICAgICBidWZmZXJTdHJlYW0ud3JpdGVFQk1MVmFySW50KGtleWZyYW1lLnRyYWNrTnVtYmVyKSAvLyBBbHdheXMgMSBieXRlIHNpbmNlIHdlIGxpbWl0IHRoZSByYW5nZSBvZiB0cmFja051bWJlclxuICAgICAgICBidWZmZXJTdHJlYW0ud3JpdGVVMTZCRShrZXlmcmFtZS50aW1lY29kZSlcblxuICAgICAgICAvLyBGbGFncyBieXRlXG4gICAgICAgIGJ1ZmZlclN0cmVhbS53cml0ZUJ5dGUoXG4gICAgICAgICAgMSA8PCA3IC8vIEtleWZyYW1lXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiAweGEzLCAvLyBTaW1wbGVCbG9ja1xuICAgICAgICAgIGRhdGE6IFtidWZmZXJTdHJlYW0uZ2V0QXNEYXRhQXJyYXkoKSwga2V5ZnJhbWUuZnJhbWVdLFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlIGEgQ2x1c3RlciBub2RlIHVzaW5nIHRoZXNlIGZpZWxkczpcbiAgICAgICAqXG4gICAgICAgKiAgICB0aW1lY29kZSAgICAtIFN0YXJ0IHRpbWUgZm9yIHRoZSBjbHVzdGVyXG4gICAgICAgKlxuICAgICAgICogUmV0dXJucyBhbiBFQk1MIGVsZW1lbnQuXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNsdXN0ZXIoY2x1c3Rlcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiAweDFmNDNiNjc1LFxuICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IDB4ZTcsIC8vIFRpbWVjb2RlXG4gICAgICAgICAgICAgIGRhdGE6IE1hdGgucm91bmQoY2x1c3Rlci50aW1lY29kZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkQ3VlUG9pbnQodHJhY2tJbmRleCwgY2x1c3RlclRpbWUsIGNsdXN0ZXJGaWxlT2Zmc2V0KSB7XG4gICAgICAgIGN1ZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IDB4YmIsIC8vIEN1ZVxuICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IDB4YjMsIC8vIEN1ZVRpbWVcbiAgICAgICAgICAgICAgZGF0YTogY2x1c3RlclRpbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogMHhiNywgLy8gQ3VlVHJhY2tQb3NpdGlvbnNcbiAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkOiAweGY3LCAvLyBDdWVUcmFja1xuICAgICAgICAgICAgICAgICAgZGF0YTogdHJhY2tJbmRleCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkOiAweGYxLCAvLyBDdWVDbHVzdGVyUG9zaXRpb25cbiAgICAgICAgICAgICAgICAgIGRhdGE6IGZpbGVPZmZzZXRUb1NlZ21lbnRSZWxhdGl2ZShjbHVzdGVyRmlsZU9mZnNldCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBXcml0ZSBhIEN1ZXMgZWxlbWVudCB0byB0aGUgYmxvYlN0cmVhbSB1c2luZyB0aGUgZ2xvYmFsIGBjdWVzYCBhcnJheSBvZiBDdWVQb2ludHMgKHVzZSBhZGRDdWVQb2ludCgpKS5cbiAgICAgICAqIFRoZSBzZWVrIGVudHJ5IGZvciB0aGUgQ3VlcyBpbiB0aGUgU2Vla0hlYWQgaXMgdXBkYXRlZC5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gd3JpdGVDdWVzKCkge1xuICAgICAgICB2YXIgZWJtbCA9IHtcbiAgICAgICAgICAgIGlkOiAweDFjNTNiYjZiLFxuICAgICAgICAgICAgZGF0YTogY3VlcyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1ZXNCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXJEYXRhU3RyZWFtKDE2ICsgY3Vlcy5sZW5ndGggKiAzMikgLy8gUHJldHR5IGNydWRlIGVzdGltYXRlIG9mIHRoZSBidWZmZXIgc2l6ZSB3ZSdsbCBuZWVkXG5cbiAgICAgICAgd3JpdGVFQk1MKGN1ZXNCdWZmZXIsIGJsb2JCdWZmZXIucG9zLCBlYm1sKVxuICAgICAgICBibG9iQnVmZmVyLndyaXRlKGN1ZXNCdWZmZXIuZ2V0QXNEYXRhQXJyYXkoKSlcblxuICAgICAgICAvLyBOb3cgd2Uga25vdyB3aGVyZSB0aGUgQ3VlcyBlbGVtZW50IGhhcyBlbmRlZCB1cCwgd2UgY2FuIHVwZGF0ZSB0aGUgU2Vla0hlYWRcbiAgICAgICAgc2Vla1BvaW50cy5DdWVzLnBvc2l0aW9uRUJNTC5kYXRhID0gZmlsZU9mZnNldFRvU2VnbWVudFJlbGF0aXZlKGVibWwub2Zmc2V0KVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEZsdXNoIHRoZSBmcmFtZXMgaW4gdGhlIGN1cnJlbnQgY2x1c3RlckZyYW1lQnVmZmVyIG91dCB0byB0aGUgc3RyZWFtIGFzIGEgQ2x1c3Rlci5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gZmx1c2hDbHVzdGVyRnJhbWVCdWZmZXIoKSB7XG4gICAgICAgIGlmIChjbHVzdGVyRnJhbWVCdWZmZXIubGVuZ3RoID09IDApIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcnN0IHdvcmsgb3V0IGhvdyBsYXJnZSBvZiBhIGJ1ZmZlciB3ZSBuZWVkIHRvIGhvbGQgdGhlIGNsdXN0ZXIgZGF0YVxuICAgICAgICB2YXIgcmF3SW1hZ2VTaXplID0gMFxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2x1c3RlckZyYW1lQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcmF3SW1hZ2VTaXplICs9IGNsdXN0ZXJGcmFtZUJ1ZmZlcltpXS5mcmFtZS5sZW5ndGhcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXJEYXRhU3RyZWFtKHJhd0ltYWdlU2l6ZSArIGNsdXN0ZXJGcmFtZUJ1ZmZlci5sZW5ndGggKiAzMiksIC8vIEVzdGltYXRlIDMyIGJ5dGVzIHBlciBTaW1wbGVCbG9jayBoZWFkZXJcbiAgICAgICAgICBjbHVzdGVyID0gY3JlYXRlQ2x1c3Rlcih7XG4gICAgICAgICAgICB0aW1lY29kZTogTWF0aC5yb3VuZChjbHVzdGVyU3RhcnRUaW1lKSxcbiAgICAgICAgICB9KVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2x1c3RlckZyYW1lQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY2x1c3Rlci5kYXRhLnB1c2goY3JlYXRlS2V5ZnJhbWVCbG9jayhjbHVzdGVyRnJhbWVCdWZmZXJbaV0pKVxuICAgICAgICB9XG5cbiAgICAgICAgd3JpdGVFQk1MKGJ1ZmZlciwgYmxvYkJ1ZmZlci5wb3MsIGNsdXN0ZXIpXG4gICAgICAgIGJsb2JCdWZmZXIud3JpdGUoYnVmZmVyLmdldEFzRGF0YUFycmF5KCkpXG5cbiAgICAgICAgYWRkQ3VlUG9pbnQoREVGQVVMVF9UUkFDS19OVU1CRVIsIE1hdGgucm91bmQoY2x1c3RlclN0YXJ0VGltZSksIGNsdXN0ZXIub2Zmc2V0KVxuXG4gICAgICAgIGNsdXN0ZXJGcmFtZUJ1ZmZlciA9IFtdXG4gICAgICAgIGNsdXN0ZXJTdGFydFRpbWUgKz0gY2x1c3RlckR1cmF0aW9uXG4gICAgICAgIGNsdXN0ZXJEdXJhdGlvbiA9IDBcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdmFsaWRhdGVPcHRpb25zKCkge1xuICAgICAgICAvLyBEZXJpdmUgZnJhbWVEdXJhdGlvbiBzZXR0aW5nIGlmIG5vdCBhbHJlYWR5IHN1cHBsaWVkXG4gICAgICAgIGlmICghb3B0aW9ucy5mcmFtZUR1cmF0aW9uKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMuZnJhbWVSYXRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmZyYW1lRHVyYXRpb24gPSAxMDAwIC8gb3B0aW9ucy5mcmFtZVJhdGVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgJ01pc3NpbmcgcmVxdWlyZWQgZnJhbWVEdXJhdGlvbiBvciBmcmFtZVJhdGUgc2V0dGluZydcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkRnJhbWVUb0NsdXN0ZXIoZnJhbWUpIHtcbiAgICAgICAgZnJhbWUudHJhY2tOdW1iZXIgPSBERUZBVUxUX1RSQUNLX05VTUJFUlxuXG4gICAgICAgIC8vIEZyYW1lIHRpbWVjb2RlcyBhcmUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZWlyIGNsdXN0ZXI6XG4gICAgICAgIGZyYW1lLnRpbWVjb2RlID0gTWF0aC5yb3VuZChjbHVzdGVyRHVyYXRpb24pXG5cbiAgICAgICAgY2x1c3RlckZyYW1lQnVmZmVyLnB1c2goZnJhbWUpXG5cbiAgICAgICAgY2x1c3RlckR1cmF0aW9uICs9IGZyYW1lLmR1cmF0aW9uXG5cbiAgICAgICAgaWYgKGNsdXN0ZXJEdXJhdGlvbiA+PSBNQVhfQ0xVU1RFUl9EVVJBVElPTl9NU0VDKSB7XG4gICAgICAgICAgZmx1c2hDbHVzdGVyRnJhbWVCdWZmZXIoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogUmV3cml0ZXMgdGhlIFNlZWtIZWFkIGVsZW1lbnQgdGhhdCB3YXMgaW5pdGlhbGx5IHdyaXR0ZW4gdG8gdGhlIHN0cmVhbSB3aXRoIHRoZSBvZmZzZXRzIG9mIHRvcCBsZXZlbCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBDYWxsIG9uY2Ugd3JpdGluZyBpcyBjb21wbGV0ZSAoc28gdGhlIG9mZnNldCBvZiBhbGwgdG9wIGxldmVsIGVsZW1lbnRzIGlzIGtub3duKS5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gcmV3cml0ZVNlZWtIZWFkKCkge1xuICAgICAgICB2YXIgc2Vla0hlYWRCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXJEYXRhU3RyZWFtKHNlZWtIZWFkLnNpemUpLFxuICAgICAgICAgIG9sZFBvcyA9IGJsb2JCdWZmZXIucG9zXG5cbiAgICAgICAgLy8gV3JpdGUgdGhlIHJld3JpdHRlbiBTZWVrSGVhZCBlbGVtZW50J3MgZGF0YSBwYXlsb2FkIHRvIHRoZSBzdHJlYW0gKGRvbid0IG5lZWQgdG8gdXBkYXRlIHRoZSBpZCBvciBzaXplKVxuICAgICAgICB3cml0ZUVCTUwoc2Vla0hlYWRCdWZmZXIsIHNlZWtIZWFkLmRhdGFPZmZzZXQsIHNlZWtIZWFkLmRhdGEpXG5cbiAgICAgICAgLy8gQW5kIHdyaXRlIHRoYXQgdGhyb3VnaCB0byB0aGUgZmlsZVxuICAgICAgICBibG9iQnVmZmVyLnNlZWsoc2Vla0hlYWQuZGF0YU9mZnNldClcbiAgICAgICAgYmxvYkJ1ZmZlci53cml0ZShzZWVrSGVhZEJ1ZmZlci5nZXRBc0RhdGFBcnJheSgpKVxuXG4gICAgICAgIGJsb2JCdWZmZXIuc2VlayhvbGRQb3MpXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogUmV3cml0ZSB0aGUgRHVyYXRpb24gZmllbGQgb2YgdGhlIFNlZ21lbnQgd2l0aCB0aGUgbmV3bHktZGlzY292ZXJlZCB2aWRlbyBkdXJhdGlvbi5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gcmV3cml0ZUR1cmF0aW9uKCkge1xuICAgICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyRGF0YVN0cmVhbSg4KSxcbiAgICAgICAgICBvbGRQb3MgPSBibG9iQnVmZmVyLnBvc1xuXG4gICAgICAgIC8vIFJld3JpdGUgdGhlIGRhdGEgcGF5bG9hZCAoZG9uJ3QgbmVlZCB0byB1cGRhdGUgdGhlIGlkIG9yIHNpemUpXG4gICAgICAgIGJ1ZmZlci53cml0ZURvdWJsZUJFKGNsdXN0ZXJTdGFydFRpbWUpXG5cbiAgICAgICAgLy8gQW5kIHdyaXRlIHRoYXQgdGhyb3VnaCB0byB0aGUgZmlsZVxuICAgICAgICBibG9iQnVmZmVyLnNlZWsoc2VnbWVudER1cmF0aW9uLmRhdGFPZmZzZXQpXG4gICAgICAgIGJsb2JCdWZmZXIud3JpdGUoYnVmZmVyLmdldEFzRGF0YUFycmF5KCkpXG5cbiAgICAgICAgYmxvYkJ1ZmZlci5zZWVrKG9sZFBvcylcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBBZGQgYSBmcmFtZSB0byB0aGUgdmlkZW8uIEN1cnJlbnRseSB0aGUgZnJhbWUgbXVzdCBiZSBhIENhbnZhcyBlbGVtZW50LlxuICAgICAgICovXG4gICAgICB0aGlzLmFkZEZyYW1lID0gZnVuY3Rpb24gKGNhbnZhcykge1xuICAgICAgICBpZiAod3JpdHRlbkhlYWRlcikge1xuICAgICAgICAgIGlmIChjYW52YXMud2lkdGggIT0gdmlkZW9XaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9IHZpZGVvSGVpZ2h0KSB7XG4gICAgICAgICAgICB0aHJvdyAnRnJhbWUgc2l6ZSBkaWZmZXJzIGZyb20gcHJldmlvdXMgZnJhbWVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aWRlb1dpZHRoID0gY2FudmFzLndpZHRoXG4gICAgICAgICAgdmlkZW9IZWlnaHQgPSBjYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgICB3cml0ZUhlYWRlcigpXG4gICAgICAgICAgd3JpdHRlbkhlYWRlciA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3ZWJQID0gcmVuZGVyQXNXZWJQKGNhbnZhcywgeyBxdWFsaXR5OiBvcHRpb25zLnF1YWxpdHkgfSlcblxuICAgICAgICBpZiAoIXdlYlApIHtcbiAgICAgICAgICB0aHJvdyBcIkNvdWxkbid0IGRlY29kZSBXZWJQIGZyYW1lLCBkb2VzIHRoZSBicm93c2VyIHN1cHBvcnQgV2ViUD9cIlxuICAgICAgICB9XG5cbiAgICAgICAgYWRkRnJhbWVUb0NsdXN0ZXIoe1xuICAgICAgICAgIGZyYW1lOiBleHRyYWN0S2V5ZnJhbWVGcm9tV2ViUCh3ZWJQKSxcbiAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5mcmFtZUR1cmF0aW9uLFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEZpbmlzaCB3cml0aW5nIHRoZSB2aWRlbyBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0byBzaWduYWwgY29tcGxldGlvbi5cbiAgICAgICAqXG4gICAgICAgKiBJZiB0aGUgZGVzdGluYXRpb24gZGV2aWNlIHdhcyBtZW1vcnkgKGkuZS4gb3B0aW9ucy5maWxlV3JpdGVyIHdhcyBub3Qgc3VwcGxpZWQpLCB0aGUgUHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoXG4gICAgICAgKiBhIEJsb2Igd2l0aCB0aGUgY29udGVudHMgb2YgdGhlIGVudGlyZSB2aWRlby5cbiAgICAgICAqL1xuICAgICAgdGhpcy5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmx1c2hDbHVzdGVyRnJhbWVCdWZmZXIoKVxuXG4gICAgICAgIHdyaXRlQ3VlcygpXG4gICAgICAgIHJld3JpdGVTZWVrSGVhZCgpXG4gICAgICAgIHJld3JpdGVEdXJhdGlvbigpXG5cbiAgICAgICAgcmV0dXJuIGJsb2JCdWZmZXIuY29tcGxldGUoJ3ZpZGVvL3dlYm0nKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmdldFdyaXR0ZW5TaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYmxvYkJ1ZmZlci5sZW5ndGhcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IGV4dGVuZChvcHRpb25EZWZhdWx0cywgb3B0aW9ucyB8fCB7fSlcbiAgICAgIHZhbGlkYXRlT3B0aW9ucygpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzTm9kZUVudmlyb21lbnQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFdlYk1Xcml0ZXIoQXJyYXlCdWZmZXJEYXRhU3RyZWFtLCBCbG9iQnVmZmVyKVxuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5XZWJNV3JpdGVyID0gV2ViTVdyaXRlcihBcnJheUJ1ZmZlckRhdGFTdHJlYW0sIEJsb2JCdWZmZXIpXG4gIH1cbn0pKClcbiIsIjsoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgaXNOb2RlRW52aXJvbWVudCA9IHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCdcbiAgXG4gIHZhciBUYXIgPSBpc05vZGVFbnZpcm9tZW50ID8gcmVxdWlyZSgnLi90YXInKSA6IHdpbmRvdy5UYXJcbiAgdmFyIGRvd25sb2FkID0gaXNOb2RlRW52aXJvbWVudCA/IHJlcXVpcmUoJy4vZG93bmxvYWQnKSA6IHdpbmRvdy5kb3dubG9hZFxuICB2YXIgR0lGID0gaXNOb2RlRW52aXJvbWVudCA/IHJlcXVpcmUoJy4vZ2lmJykuR0lGIDogd2luZG93LkdJRlxuICB2YXIgV2ViTVdyaXRlciA9IGlzTm9kZUVudmlyb21lbnQgPyByZXF1aXJlKCcuL3dlYm0td3JpdGVyLTAuMi4wJykgOiB3aW5kb3cuV2ViTVdyaXRlclxuXG4gIHZhciBvYmplY3RUeXBlcyA9IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBvYmplY3Q6IHRydWUsXG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0dsb2JhbCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5PYmplY3QgPT09IE9iamVjdCA/IHZhbHVlIDogbnVsbFxuICB9XG5cbiAgLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbiAgdmFyIGZyZWVQYXJzZUZsb2F0ID0gcGFyc2VGbG9hdCxcbiAgICBmcmVlUGFyc2VJbnQgPSBwYXJzZUludFxuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG4gIHZhciBmcmVlRXhwb3J0cyA9IG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlID8gZXhwb3J0cyA6IHVuZGVmaW5lZFxuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbiAgdmFyIGZyZWVNb2R1bGUgPSBvYmplY3RUeXBlc1t0eXBlb2YgbW9kdWxlXSAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSA/IG1vZHVsZSA6IHVuZGVmaW5lZFxuXG4gIC8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG4gIHZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzID8gZnJlZUV4cG9ydHMgOiB1bmRlZmluZWRcblxuICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xuICB2YXIgZnJlZUdsb2JhbCA9IGNoZWNrR2xvYmFsKGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUgJiYgdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpXG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbiAgdmFyIGZyZWVTZWxmID0gY2hlY2tHbG9iYWwob2JqZWN0VHlwZXNbdHlwZW9mIHNlbGZdICYmIHNlbGYpXG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGB3aW5kb3dgLiAqL1xuICB2YXIgZnJlZVdpbmRvdyA9IGNoZWNrR2xvYmFsKG9iamVjdFR5cGVzW3R5cGVvZiB3aW5kb3ddICYmIHdpbmRvdylcblxuICAvKiogRGV0ZWN0IGB0aGlzYCBhcyB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbiAgdmFyIHRoaXNHbG9iYWwgPSBjaGVja0dsb2JhbChvYmplY3RUeXBlc1t0eXBlb2YgdGhpc10gJiYgdGhpcylcblxuICAvKipcbiAgICogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC5cbiAgICpcbiAgICogVGhlIGB0aGlzYCB2YWx1ZSBpcyB1c2VkIGlmIGl0J3MgdGhlIGdsb2JhbCBvYmplY3QgdG8gYXZvaWQgR3JlYXNlbW9ua2V5J3NcbiAgICogcmVzdHJpY3RlZCBgd2luZG93YCBvYmplY3QsIG90aGVyd2lzZSB0aGUgYHdpbmRvd2Agb2JqZWN0IGlzIHVzZWQuXG4gICAqL1xuICB2YXIgcm9vdCA9XG4gICAgZnJlZUdsb2JhbCB8fFxuICAgIChmcmVlV2luZG93ICE9PSAodGhpc0dsb2JhbCAmJiB0aGlzR2xvYmFsLndpbmRvdykgJiYgZnJlZVdpbmRvdykgfHxcbiAgICBmcmVlU2VsZiB8fFxuICAgIHRoaXNHbG9iYWwgfHxcbiAgICBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpXG5cbiAgaWYgKCEoJ2djJyBpbiB3aW5kb3cpKSB7XG4gICAgd2luZG93LmdjID0gZnVuY3Rpb24gKCkge31cbiAgfVxuXG4gIGlmICghSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlLnRvQmxvYikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUsICd0b0Jsb2InLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gKGNhbGxiYWNrLCB0eXBlLCBxdWFsaXR5KSB7XG4gICAgICAgIHZhciBiaW5TdHIgPSBhdG9iKHRoaXMudG9EYXRhVVJMKHR5cGUsIHF1YWxpdHkpLnNwbGl0KCcsJylbMV0pLFxuICAgICAgICAgIGxlbiA9IGJpblN0ci5sZW5ndGgsXG4gICAgICAgICAgYXJyID0gbmV3IFVpbnQ4QXJyYXkobGVuKVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBhcnJbaV0gPSBiaW5TdHIuY2hhckNvZGVBdChpKVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sobmV3IEJsb2IoW2Fycl0sIHsgdHlwZTogdHlwZSB8fCAnaW1hZ2UvcG5nJyB9KSlcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIC8vIEBsaWNlbnNlIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAgLy8gY29weXJpZ2h0IFBhdWwgSXJpc2ggMjAxNVxuXG4gIC8vIERhdGUubm93KCkgaXMgc3VwcG9ydGVkIGV2ZXJ5d2hlcmUgZXhjZXB0IElFOC4gRm9yIElFOCB3ZSB1c2UgdGhlIERhdGUubm93IHBvbHlmaWxsXG4gIC8vICAgZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvcG9seWZpbGwtc2VydmljZS9ibG9iL21hc3Rlci9wb2x5ZmlsbHMvRGF0ZS5ub3cvcG9seWZpbGwuanNcbiAgLy8gYXMgU2FmYXJpIDYgZG9lc24ndCBoYXZlIHN1cHBvcnQgZm9yIE5hdmlnYXRpb25UaW1pbmcsIHdlIHVzZSBhIERhdGUubm93KCkgdGltZXN0YW1wIGZvciByZWxhdGl2ZSB2YWx1ZXNcblxuICAvLyBpZiB5b3Ugd2FudCB2YWx1ZXMgc2ltaWxhciB0byB3aGF0IHlvdSdkIGdldCB3aXRoIHJlYWwgcGVyZi5ub3csIHBsYWNlIHRoaXMgdG93YXJkcyB0aGUgaGVhZCBvZiB0aGUgcGFnZVxuICAvLyBidXQgaW4gcmVhbGl0eSwgeW91J3JlIGp1c3QgZ2V0dGluZyB0aGUgZGVsdGEgYmV0d2VlbiBub3coKSBjYWxscywgc28gaXQncyBub3QgdGVycmlibHkgaW1wb3J0YW50IHdoZXJlIGl0J3MgcGxhY2VkXG5cbiAgOyhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93ID09IGZhbHNlKSB7XG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2UgPSB7fVxuICAgIH1cblxuICAgIERhdGUubm93ID1cbiAgICAgIERhdGUubm93IHx8XG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoYW5rcyBJRThcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICB9XG5cbiAgICBpZiAoJ25vdycgaW4gd2luZG93LnBlcmZvcm1hbmNlID09IGZhbHNlKSB7XG4gICAgICB2YXIgbm93T2Zmc2V0ID0gRGF0ZS5ub3coKVxuXG4gICAgICBpZiAocGVyZm9ybWFuY2UudGltaW5nICYmIHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQpIHtcbiAgICAgICAgbm93T2Zmc2V0ID0gcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydFxuICAgICAgfVxuXG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID0gZnVuY3Rpb24gbm93KCkge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIG5vd09mZnNldFxuICAgICAgfVxuICAgIH1cbiAgfSkoKVxuXG4gIGZ1bmN0aW9uIHBhZChuKSB7XG4gICAgcmV0dXJuIFN0cmluZygnMDAwMDAwMCcgKyBuKS5zbGljZSgtNylcbiAgfVxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9BZGQtb25zL0NvZGVfc25pcHBldHMvVGltZXJzXG5cbiAgdmFyIGdfc3RhcnRUaW1lID0gd2luZG93LkRhdGUubm93KClcblxuICBmdW5jdGlvbiBndWlkKCkge1xuICAgIGZ1bmN0aW9uIHM0KCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgLnN1YnN0cmluZygxKVxuICAgIH1cbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIENDRnJhbWVFbmNvZGVyKHNldHRpbmdzKSB7XG4gICAgdmFyIF9oYW5kbGVycyA9IHt9XG5cbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3NcblxuICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIF9oYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyXG4gICAgfVxuXG4gICAgdGhpcy5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgaGFuZGxlciA9IF9oYW5kbGVyc1tldmVudF1cbiAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkobnVsbCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZpbGVuYW1lID0gc2V0dGluZ3MubmFtZSB8fCBndWlkKClcbiAgICB0aGlzLmV4dGVuc2lvbiA9ICcnXG4gICAgdGhpcy5taW1lVHlwZSA9ICcnXG4gIH1cblxuICBDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7fVxuICBDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHt9XG4gIENDRnJhbWVFbmNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7fVxuICBDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHt9XG4gIENDRnJhbWVFbmNvZGVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge31cbiAgQ0NGcmFtZUVuY29kZXIucHJvdG90eXBlLnNhZmVUb1Byb2NlZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnU3RlcCBub3Qgc2V0IScpXG4gIH1cblxuICBmdW5jdGlvbiBDQ1RhckVuY29kZXIoc2V0dGluZ3MpIHtcbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgdGhpcy5leHRlbnNpb24gPSAnLnRhcidcbiAgICB0aGlzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL3gtdGFyJ1xuICAgIHRoaXMuZmlsZUV4dGVuc2lvbiA9ICcnXG4gICAgdGhpcy5iYXNlRmlsZW5hbWUgPSB0aGlzLmZpbGVuYW1lXG5cbiAgICB0aGlzLnRhcGUgPSBudWxsXG4gICAgdGhpcy5jb3VudCA9IDBcbiAgICB0aGlzLnBhcnQgPSAxXG4gICAgdGhpcy5mcmFtZXMgPSAwXG4gIH1cblxuICBDQ1RhckVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKVxuICB9XG5cbiAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoYmxvYikge1xuICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50YXBlLmFwcGVuZChwYWQodGhpcy5jb3VudCkgKyB0aGlzLmZpbGVFeHRlbnNpb24sIG5ldyBVaW50OEFycmF5KGZpbGVSZWFkZXIucmVzdWx0KSlcblxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b1NhdmVUaW1lID4gMCAmJiB0aGlzLmZyYW1lcyAvIHRoaXMuc2V0dGluZ3MuZnJhbWVyYXRlID49IHRoaXMuc2V0dGluZ3MuYXV0b1NhdmVUaW1lKSB7XG4gICAgICAgIHRoaXMuc2F2ZShcbiAgICAgICAgICBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgICAgdGhpcy5maWxlbmFtZSA9IHRoaXMuYmFzZUZpbGVuYW1lICsgJy1wYXJ0LScgKyBwYWQodGhpcy5wYXJ0KVxuICAgICAgICAgICAgZG93bmxvYWQoYmxvYiwgdGhpcy5maWxlbmFtZSArIHRoaXMuZXh0ZW5zaW9uLCB0aGlzLm1pbWVUeXBlKVxuICAgICAgICAgICAgdmFyIGNvdW50ID0gdGhpcy5jb3VudFxuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKClcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSBjb3VudCArIDFcbiAgICAgICAgICAgIHRoaXMucGFydCsrXG4gICAgICAgICAgICB0aGlzLmZpbGVuYW1lID0gdGhpcy5iYXNlRmlsZW5hbWUgKyAnLXBhcnQtJyArIHBhZCh0aGlzLnBhcnQpXG4gICAgICAgICAgICB0aGlzLmZyYW1lcyA9IDBcbiAgICAgICAgICAgIHRoaXMuc3RlcCgpXG4gICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY291bnQrK1xuICAgICAgICB0aGlzLmZyYW1lcysrXG4gICAgICAgIHRoaXMuc3RlcCgpXG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpXG4gICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICB9XG5cbiAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sodGhpcy50YXBlLnNhdmUoKSlcbiAgfVxuXG4gIENDVGFyRW5jb2Rlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRhcGUgPSBuZXcgVGFyKClcbiAgICB0aGlzLmNvdW50ID0gMFxuICB9XG5cbiAgZnVuY3Rpb24gQ0NQTkdFbmNvZGVyKHNldHRpbmdzKSB7XG4gICAgQ0NUYXJFbmNvZGVyLmNhbGwodGhpcywgc2V0dGluZ3MpXG5cbiAgICB0aGlzLnR5cGUgPSAnaW1hZ2UvcG5nJ1xuICAgIHRoaXMuZmlsZUV4dGVuc2lvbiA9ICcucG5nJ1xuICB9XG5cbiAgQ0NQTkdFbmNvZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ0NUYXJFbmNvZGVyLnByb3RvdHlwZSlcblxuICBDQ1BOR0VuY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICBjYW52YXMudG9CbG9iKFxuICAgICAgZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBibG9iKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy50eXBlXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gQ0NKUEVHRW5jb2RlcihzZXR0aW5ncykge1xuICAgIENDVGFyRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgdGhpcy50eXBlID0gJ2ltYWdlL2pwZWcnXG4gICAgdGhpcy5maWxlRXh0ZW5zaW9uID0gJy5qcGcnXG4gICAgdGhpcy5xdWFsaXR5ID0gc2V0dGluZ3MucXVhbGl0eSAvIDEwMCB8fCAwLjhcbiAgfVxuXG4gIENDSlBFR0VuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ1RhckVuY29kZXIucHJvdG90eXBlKVxuXG4gIENDSlBFR0VuY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICBjYW52YXMudG9CbG9iKFxuICAgICAgZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBibG9iKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy50eXBlLFxuICAgICAgdGhpcy5xdWFsaXR5XG4gICAgKVxuICB9XG5cbiAgLypcblxuXHRXZWJNIEVuY29kZXJcblxuKi9cblxuICBmdW5jdGlvbiBDQ1dlYk1FbmNvZGVyKHNldHRpbmdzKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgaWYgKGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3dlYnAnKS5zdWJzdHIoNSwgMTApICE9PSAnaW1hZ2Uvd2VicCcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdXZWJQIG5vdCBzdXBwb3J0ZWQgLSB0cnkgYW5vdGhlciBleHBvcnQgZm9ybWF0JylcbiAgICB9XG5cbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgdGhpcy5xdWFsaXR5ID0gc2V0dGluZ3MucXVhbGl0eSAvIDEwMCB8fCAwLjhcblxuICAgIHRoaXMuZXh0ZW5zaW9uID0gJy53ZWJtJ1xuICAgIHRoaXMubWltZVR5cGUgPSAndmlkZW8vd2VibSdcbiAgICB0aGlzLmJhc2VGaWxlbmFtZSA9IHRoaXMuZmlsZW5hbWVcbiAgICB0aGlzLmZyYW1lcmF0ZSA9IHNldHRpbmdzLmZyYW1lcmF0ZVxuXG4gICAgdGhpcy5mcmFtZXMgPSAwXG4gICAgdGhpcy5wYXJ0ID0gMVxuXG4gICAgdGhpcy52aWRlb1dyaXRlciA9IG5ldyBXZWJNV3JpdGVyKHtcbiAgICAgIHF1YWxpdHk6IHRoaXMucXVhbGl0eSxcbiAgICAgIGZpbGVXcml0ZXI6IG51bGwsXG4gICAgICBmZDogbnVsbCxcbiAgICAgIGZyYW1lUmF0ZTogdGhpcy5mcmFtZXJhdGUsXG4gICAgfSlcbiAgfVxuXG4gIENDV2ViTUVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NXZWJNRW5jb2Rlci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgdGhpcy5kaXNwb3NlKClcbiAgfVxuXG4gIENDV2ViTUVuY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICB0aGlzLnZpZGVvV3JpdGVyLmFkZEZyYW1lKGNhbnZhcylcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9TYXZlVGltZSA+IDAgJiYgdGhpcy5mcmFtZXMgLyB0aGlzLnNldHRpbmdzLmZyYW1lcmF0ZSA+PSB0aGlzLnNldHRpbmdzLmF1dG9TYXZlVGltZSkge1xuICAgICAgdGhpcy5zYXZlKFxuICAgICAgICBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgIHRoaXMuZmlsZW5hbWUgPSB0aGlzLmJhc2VGaWxlbmFtZSArICctcGFydC0nICsgcGFkKHRoaXMucGFydClcbiAgICAgICAgICBkb3dubG9hZChibG9iLCB0aGlzLmZpbGVuYW1lICsgdGhpcy5leHRlbnNpb24sIHRoaXMubWltZVR5cGUpXG4gICAgICAgICAgdGhpcy5kaXNwb3NlKClcbiAgICAgICAgICB0aGlzLnBhcnQrK1xuICAgICAgICAgIHRoaXMuZmlsZW5hbWUgPSB0aGlzLmJhc2VGaWxlbmFtZSArICctcGFydC0nICsgcGFkKHRoaXMucGFydClcbiAgICAgICAgICB0aGlzLnN0ZXAoKVxuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mcmFtZXMrK1xuICAgICAgdGhpcy5zdGVwKClcbiAgICB9XG4gIH1cblxuICBDQ1dlYk1FbmNvZGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy52aWRlb1dyaXRlci5jb21wbGV0ZSgpLnRoZW4oY2FsbGJhY2spXG4gIH1cblxuICBDQ1dlYk1FbmNvZGVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKGNhbnZhcykge1xuICAgIHRoaXMuZnJhbWVzID0gMFxuICAgIHRoaXMudmlkZW9Xcml0ZXIgPSBuZXcgV2ViTVdyaXRlcih7XG4gICAgICBxdWFsaXR5OiB0aGlzLnF1YWxpdHksXG4gICAgICBmaWxlV3JpdGVyOiBudWxsLFxuICAgICAgZmQ6IG51bGwsXG4gICAgICBmcmFtZVJhdGU6IHRoaXMuZnJhbWVyYXRlLFxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBDQ0ZGTXBlZ1NlcnZlckVuY29kZXIoc2V0dGluZ3MpIHtcbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgc2V0dGluZ3MucXVhbGl0eSA9IHNldHRpbmdzLnF1YWxpdHkgLyAxMDAgfHwgMC44XG5cbiAgICB0aGlzLmVuY29kZXIgPSBuZXcgRkZNcGVnU2VydmVyLlZpZGVvKHNldHRpbmdzKVxuICAgIHRoaXMuZW5jb2Rlci5vbihcbiAgICAgICdwcm9jZXNzJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdwcm9jZXNzJylcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIClcbiAgICB0aGlzLmVuY29kZXIub24oXG4gICAgICAnZmluaXNoZWQnLFxuICAgICAgZnVuY3Rpb24gKHVybCwgc2l6ZSkge1xuICAgICAgICB2YXIgY2IgPSB0aGlzLmNhbGxiYWNrXG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSB1bmRlZmluZWRcbiAgICAgICAgICBjYih1cmwsIHNpemUpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIClcbiAgICB0aGlzLmVuY29kZXIub24oXG4gICAgICAncHJvZ3Jlc3MnLFxuICAgICAgZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MocHJvZ3Jlc3MpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIClcbiAgICB0aGlzLmVuY29kZXIub24oXG4gICAgICAnZXJyb3InLFxuICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpXG4gICAgICB9LmJpbmQodGhpcylcbiAgICApXG4gIH1cblxuICBDQ0ZGTXBlZ1NlcnZlckVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NGRk1wZWdTZXJ2ZXJFbmNvZGVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuY29kZXIuc3RhcnQodGhpcy5zZXR0aW5ncylcbiAgfVxuXG4gIENDRkZNcGVnU2VydmVyRW5jb2Rlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGNhbnZhcykge1xuICAgIHRoaXMuZW5jb2Rlci5hZGQoY2FudmFzKVxuICB9XG5cbiAgQ0NGRk1wZWdTZXJ2ZXJFbmNvZGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgdGhpcy5lbmNvZGVyLmVuZCgpXG4gIH1cblxuICBDQ0ZGTXBlZ1NlcnZlckVuY29kZXIucHJvdG90eXBlLnNhZmVUb1Byb2NlZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5jb2Rlci5zYWZlVG9Qcm9jZWVkKClcbiAgfVxuXG4gIC8qXG5cdEhUTUxDYW52YXNFbGVtZW50LmNhcHR1cmVTdHJlYW0oKVxuKi9cblxuICBmdW5jdGlvbiBDQ1N0cmVhbUVuY29kZXIoc2V0dGluZ3MpIHtcbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgdGhpcy5mcmFtZXJhdGUgPSB0aGlzLnNldHRpbmdzLmZyYW1lcmF0ZVxuICAgIHRoaXMudHlwZSA9ICd2aWRlby93ZWJtJ1xuICAgIHRoaXMuZXh0ZW5zaW9uID0gJy53ZWJtJ1xuICAgIHRoaXMuc3RyZWFtID0gbnVsbFxuICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG51bGxcbiAgICB0aGlzLmNodW5rcyA9IFtdXG4gIH1cblxuICBDQ1N0cmVhbUVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NTdHJlYW1FbmNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgaWYgKCF0aGlzLnN0cmVhbSkge1xuICAgICAgdGhpcy5zdHJlYW0gPSBjYW52YXMuY2FwdHVyZVN0cmVhbSh0aGlzLmZyYW1lcmF0ZSlcbiAgICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG5ldyBNZWRpYVJlY29yZGVyKHRoaXMuc3RyZWFtKVxuICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLnN0YXJ0KClcblxuICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuY2h1bmtzLnB1c2goZS5kYXRhKVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuc3RlcCgpXG4gIH1cblxuICBDQ1N0cmVhbUVuY29kZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLm1lZGlhUmVjb3JkZXIub25zdG9wID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBibG9iID0gbmV3IEJsb2IodGhpcy5jaHVua3MsIHsgdHlwZTogJ3ZpZGVvL3dlYm0nIH0pXG4gICAgICB0aGlzLmNodW5rcyA9IFtdXG4gICAgICBjYWxsYmFjayhibG9iKVxuICAgIH0uYmluZCh0aGlzKVxuXG4gICAgdGhpcy5tZWRpYVJlY29yZGVyLnN0b3AoKVxuICB9XG5cbiAgLypmdW5jdGlvbiBDQ0dJRkVuY29kZXIoIHNldHRpbmdzICkge1xuXG5cdENDRnJhbWVFbmNvZGVyLmNhbGwoIHRoaXMgKTtcblxuXHRzZXR0aW5ncy5xdWFsaXR5ID0gc2V0dGluZ3MucXVhbGl0eSB8fCA2O1xuXHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cblx0dGhpcy5lbmNvZGVyID0gbmV3IEdJRkVuY29kZXIoKTtcblx0dGhpcy5lbmNvZGVyLnNldFJlcGVhdCggMSApO1xuICBcdHRoaXMuZW5jb2Rlci5zZXREZWxheSggc2V0dGluZ3Muc3RlcCApO1xuICBcdHRoaXMuZW5jb2Rlci5zZXRRdWFsaXR5KCA2ICk7XG4gIFx0dGhpcy5lbmNvZGVyLnNldFRyYW5zcGFyZW50KCBudWxsICk7XG4gIFx0dGhpcy5lbmNvZGVyLnNldFNpemUoIDE1MCwgMTUwICk7XG5cbiAgXHR0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG4gIFx0dGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cbn1cblxuQ0NHSUZFbmNvZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIENDRnJhbWVFbmNvZGVyICk7XG5cbkNDR0lGRW5jb2Rlci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLmVuY29kZXIuc3RhcnQoKTtcblxufVxuXG5DQ0dJRkVuY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKCBjYW52YXMgKSB7XG5cblx0dGhpcy5jYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XG5cdHRoaXMuY2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG5cdHRoaXMuY3R4LmRyYXdJbWFnZSggY2FudmFzLCAwLCAwICk7XG5cdHRoaXMuZW5jb2Rlci5hZGRGcmFtZSggdGhpcy5jdHggKTtcblxuXHR0aGlzLmVuY29kZXIuc2V0U2l6ZSggY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0ICk7XG5cdHZhciByZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoY2FudmFzLndpZHRoICogY2FudmFzLmhlaWdodCAqIDQpO1xuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnd2ViZ2wnICk7XG5cdGNvbnRleHQucmVhZFBpeGVscygwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIGNvbnRleHQuUkdCQSwgY29udGV4dC5VTlNJR05FRF9CWVRFLCByZWFkQnVmZmVyKTtcblx0dGhpcy5lbmNvZGVyLmFkZEZyYW1lKCByZWFkQnVmZmVyLCB0cnVlICk7XG5cbn1cblxuQ0NHSUZFbmNvZGVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5lbmNvZGVyLmZpbmlzaCgpO1xuXG59XG5cbkNDR0lGRW5jb2Rlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblxuXHR2YXIgYmluYXJ5X2dpZiA9IHRoaXMuZW5jb2Rlci5zdHJlYW0oKS5nZXREYXRhKCk7XG5cblx0dmFyIGRhdGFfdXJsID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCwnK2VuY29kZTY0KGJpbmFyeV9naWYpO1xuXHR3aW5kb3cubG9jYXRpb24gPSBkYXRhX3VybDtcblx0cmV0dXJuO1xuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoIFsgYmluYXJ5X2dpZiBdLCB7IHR5cGU6IFwib2N0ZXQvc3RyZWFtXCIgfSApO1xuXHR2YXIgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoIGJsb2IgKTtcblx0Y2FsbGJhY2soIHVybCApO1xuXG59Ki9cblxuICBmdW5jdGlvbiBDQ0dJRkVuY29kZXIoc2V0dGluZ3MpIHtcbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgc2V0dGluZ3MucXVhbGl0eSA9IDMxIC0gKChzZXR0aW5ncy5xdWFsaXR5ICogMzApIC8gMTAwIHx8IDEwKVxuICAgIHNldHRpbmdzLndvcmtlcnMgPSBzZXR0aW5ncy53b3JrZXJzIHx8IDRcblxuICAgIHRoaXMuZXh0ZW5zaW9uID0gJy5naWYnXG4gICAgdGhpcy5taW1lVHlwZSA9ICdpbWFnZS9naWYnXG5cbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgdGhpcy5zaXplU2V0ID0gZmFsc2VcblxuICAgIHRoaXMuZW5jb2RlciA9IG5ldyBHSUYoe1xuICAgICAgd29ya2Vyczogc2V0dGluZ3Mud29ya2VycyxcbiAgICAgIHF1YWxpdHk6IHNldHRpbmdzLnF1YWxpdHksXG4gICAgICB3b3JrZXJTY3JpcHQ6IHNldHRpbmdzLndvcmtlcnNQYXRoICsgJ2dpZi53b3JrZXIuanMnLFxuICAgIH0pXG5cbiAgICB0aGlzLmVuY29kZXIub24oXG4gICAgICAncHJvZ3Jlc3MnLFxuICAgICAgZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MocHJvZ3Jlc3MpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIClcblxuICAgIHRoaXMuZW5jb2Rlci5vbihcbiAgICAgICdmaW5pc2hlZCcsXG4gICAgICBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICB2YXIgY2IgPSB0aGlzLmNhbGxiYWNrXG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSB1bmRlZmluZWRcbiAgICAgICAgICBjYihibG9iKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApXG4gIH1cblxuICBDQ0dJRkVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NHSUZFbmNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgaWYgKCF0aGlzLnNpemVTZXQpIHtcbiAgICAgIHRoaXMuZW5jb2Rlci5zZXRPcHRpb24oJ3dpZHRoJywgY2FudmFzLndpZHRoKVxuICAgICAgdGhpcy5lbmNvZGVyLnNldE9wdGlvbignaGVpZ2h0JywgY2FudmFzLmhlaWdodClcbiAgICAgIHRoaXMuc2l6ZVNldCA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHRcbiAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwKVxuXG4gICAgdGhpcy5lbmNvZGVyLmFkZEZyYW1lKHRoaXMuY3R4LCB7IGNvcHk6IHRydWUsIGRlbGF5OiB0aGlzLnNldHRpbmdzLnN0ZXAgfSlcbiAgICB0aGlzLnN0ZXAoKVxuXG4gICAgLyp0aGlzLmVuY29kZXIuc2V0U2l6ZSggY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0ICk7XG5cdHZhciByZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoY2FudmFzLndpZHRoICogY2FudmFzLmhlaWdodCAqIDQpO1xuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnd2ViZ2wnICk7XG5cdGNvbnRleHQucmVhZFBpeGVscygwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIGNvbnRleHQuUkdCQSwgY29udGV4dC5VTlNJR05FRF9CWVRFLCByZWFkQnVmZmVyKTtcblx0dGhpcy5lbmNvZGVyLmFkZEZyYW1lKCByZWFkQnVmZmVyLCB0cnVlICk7Ki9cbiAgfVxuXG4gIENDR0lGRW5jb2Rlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuXG4gICAgdGhpcy5lbmNvZGVyLnJlbmRlcigpXG4gIH1cblxuICBmdW5jdGlvbiBDQ2FwdHVyZShzZXR0aW5ncykge1xuICAgIHZhciBfc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCB7fSxcbiAgICAgIF9kYXRlID0gbmV3IERhdGUoKSxcbiAgICAgIF92ZXJib3NlLFxuICAgICAgX2Rpc3BsYXksXG4gICAgICBfdGltZSxcbiAgICAgIF9zdGFydFRpbWUsXG4gICAgICBfcGVyZm9ybWFuY2VUaW1lLFxuICAgICAgX3BlcmZvcm1hbmNlU3RhcnRUaW1lLFxuICAgICAgX3N0ZXAsXG4gICAgICBfZW5jb2RlcixcbiAgICAgIF90aW1lb3V0cyA9IFtdLFxuICAgICAgX2ludGVydmFscyA9IFtdLFxuICAgICAgX2ZyYW1lQ291bnQgPSAwLFxuICAgICAgX2ludGVybWVkaWF0ZUZyYW1lQ291bnQgPSAwLFxuICAgICAgX2xhc3RGcmFtZSA9IG51bGwsXG4gICAgICBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lQ2FsbGJhY2tzID0gW10sXG4gICAgICBfY2FwdHVyaW5nID0gZmFsc2UsXG4gICAgICBfaGFuZGxlcnMgPSB7fVxuXG4gICAgX3NldHRpbmdzLmZyYW1lcmF0ZSA9IF9zZXR0aW5ncy5mcmFtZXJhdGUgfHwgNjBcbiAgICBfc2V0dGluZ3MubW90aW9uQmx1ckZyYW1lcyA9IDIgKiAoX3NldHRpbmdzLm1vdGlvbkJsdXJGcmFtZXMgfHwgMSlcbiAgICBfdmVyYm9zZSA9IF9zZXR0aW5ncy52ZXJib3NlIHx8IGZhbHNlXG4gICAgX2Rpc3BsYXkgPSBfc2V0dGluZ3MuZGlzcGxheSB8fCBmYWxzZVxuICAgIF9zZXR0aW5ncy5zdGVwID0gMTAwMC4wIC8gX3NldHRpbmdzLmZyYW1lcmF0ZVxuICAgIF9zZXR0aW5ncy50aW1lTGltaXQgPSBfc2V0dGluZ3MudGltZUxpbWl0IHx8IDBcbiAgICBfc2V0dGluZ3MuZnJhbWVMaW1pdCA9IF9zZXR0aW5ncy5mcmFtZUxpbWl0IHx8IDBcbiAgICBfc2V0dGluZ3Muc3RhcnRUaW1lID0gX3NldHRpbmdzLnN0YXJ0VGltZSB8fCAwXG5cbiAgICB2YXIgX3RpbWVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBfdGltZURpc3BsYXkuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgX3RpbWVEaXNwbGF5LnN0eWxlLmxlZnQgPSBfdGltZURpc3BsYXkuc3R5bGUudG9wID0gMFxuICAgIF90aW1lRGlzcGxheS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snXG4gICAgX3RpbWVEaXNwbGF5LnN0eWxlLmZvbnRGYW1pbHkgPSAnbW9ub3NwYWNlJ1xuICAgIF90aW1lRGlzcGxheS5zdHlsZS5mb250U2l6ZSA9ICcxMXB4J1xuICAgIF90aW1lRGlzcGxheS5zdHlsZS5wYWRkaW5nID0gJzVweCdcbiAgICBfdGltZURpc3BsYXkuc3R5bGUuY29sb3IgPSAncmVkJ1xuICAgIF90aW1lRGlzcGxheS5zdHlsZS56SW5kZXggPSAxMDAwMDBcbiAgICBpZiAoX3NldHRpbmdzLmRpc3BsYXkpIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoX3RpbWVEaXNwbGF5KVxuXG4gICAgdmFyIGNhbnZhc01vdGlvbkJsdXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIHZhciBjdHhNb3Rpb25CbHVyID0gY2FudmFzTW90aW9uQmx1ci5nZXRDb250ZXh0KCcyZCcpXG4gICAgdmFyIGJ1ZmZlck1vdGlvbkJsdXJcbiAgICB2YXIgaW1hZ2VEYXRhXG5cbiAgICBfbG9nKCdTdGVwIGlzIHNldCB0byAnICsgX3NldHRpbmdzLnN0ZXAgKyAnbXMnKVxuXG4gICAgdmFyIF9lbmNvZGVycyA9IHtcbiAgICAgIGdpZjogQ0NHSUZFbmNvZGVyLFxuICAgICAgd2VibTogQ0NXZWJNRW5jb2RlcixcbiAgICAgIGZmbXBlZ3NlcnZlcjogQ0NGRk1wZWdTZXJ2ZXJFbmNvZGVyLFxuICAgICAgcG5nOiBDQ1BOR0VuY29kZXIsXG4gICAgICBqcGc6IENDSlBFR0VuY29kZXIsXG4gICAgICAnd2VibS1tZWRpYXJlY29yZGVyJzogQ0NTdHJlYW1FbmNvZGVyLFxuICAgIH1cblxuICAgIHZhciBjdG9yID0gX2VuY29kZXJzW19zZXR0aW5ncy5mb3JtYXRdXG4gICAgaWYgKCFjdG9yKSB7XG4gICAgICB0aHJvdyAnRXJyb3I6IEluY29ycmVjdCBvciBtaXNzaW5nIGZvcm1hdDogVmFsaWQgZm9ybWF0cyBhcmUgJyArIE9iamVjdC5rZXlzKF9lbmNvZGVycykuam9pbignLCAnKVxuICAgIH1cbiAgICBfZW5jb2RlciA9IG5ldyBjdG9yKF9zZXR0aW5ncylcbiAgICBfZW5jb2Rlci5zdGVwID0gX3N0ZXBcblxuICAgIF9lbmNvZGVyLm9uKCdwcm9jZXNzJywgX3Byb2Nlc3MpXG4gICAgX2VuY29kZXIub24oJ3Byb2dyZXNzJywgX3Byb2dyZXNzKVxuXG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93ID09IGZhbHNlKSB7XG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2UgPSB7fVxuICAgIH1cblxuICAgIERhdGUubm93ID1cbiAgICAgIERhdGUubm93IHx8XG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoYW5rcyBJRThcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICB9XG5cbiAgICBpZiAoJ25vdycgaW4gd2luZG93LnBlcmZvcm1hbmNlID09IGZhbHNlKSB7XG4gICAgICB2YXIgbm93T2Zmc2V0ID0gRGF0ZS5ub3coKVxuXG4gICAgICBpZiAocGVyZm9ybWFuY2UudGltaW5nICYmIHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQpIHtcbiAgICAgICAgbm93T2Zmc2V0ID0gcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydFxuICAgICAgfVxuXG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID0gZnVuY3Rpb24gbm93KCkge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIG5vd09mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBfb2xkU2V0VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0LFxuICAgICAgX29sZFNldEludGVydmFsID0gd2luZG93LnNldEludGVydmFsLFxuICAgICAgX29sZENsZWFySW50ZXJ2YWwgPSB3aW5kb3cuY2xlYXJJbnRlcnZhbCxcbiAgICAgIF9vbGRDbGVhclRpbWVvdXQgPSB3aW5kb3cuY2xlYXJUaW1lb3V0LFxuICAgICAgX29sZFJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gICAgICBfb2xkTm93ID0gd2luZG93LkRhdGUubm93LFxuICAgICAgX29sZFBlcmZvcm1hbmNlTm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdyxcbiAgICAgIF9vbGRHZXRUaW1lID0gd2luZG93LkRhdGUucHJvdG90eXBlLmdldFRpbWVcbiAgICAvLyBEYXRlLnByb3RvdHlwZS5fb2xkR2V0VGltZSA9IERhdGUucHJvdG90eXBlLmdldFRpbWU7XG5cbiAgICB2YXIgbWVkaWEgPSBbXVxuXG4gICAgZnVuY3Rpb24gX2luaXQoKSB7XG4gICAgICBfbG9nKCdDYXB0dXJlciBzdGFydCcpXG5cbiAgICAgIF9zdGFydFRpbWUgPSB3aW5kb3cuRGF0ZS5ub3coKVxuICAgICAgX3RpbWUgPSBfc3RhcnRUaW1lICsgX3NldHRpbmdzLnN0YXJ0VGltZVxuICAgICAgX3BlcmZvcm1hbmNlU3RhcnRUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgICBfcGVyZm9ybWFuY2VUaW1lID0gX3BlcmZvcm1hbmNlU3RhcnRUaW1lICsgX3NldHRpbmdzLnN0YXJ0VGltZVxuXG4gICAgICB3aW5kb3cuRGF0ZS5wcm90b3R5cGUuZ2V0VGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aW1lXG4gICAgICB9XG4gICAgICB3aW5kb3cuRGF0ZS5ub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGltZVxuICAgICAgfVxuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGltZSkge1xuICAgICAgICB2YXIgdCA9IHtcbiAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgdGltZTogdGltZSxcbiAgICAgICAgICB0cmlnZ2VyVGltZTogX3RpbWUgKyB0aW1lLFxuICAgICAgICB9XG4gICAgICAgIF90aW1lb3V0cy5wdXNoKHQpXG4gICAgICAgIF9sb2coJ1RpbWVvdXQgc2V0IHRvICcgKyB0LnRpbWUpXG4gICAgICAgIHJldHVybiB0XG4gICAgICB9XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgX3RpbWVvdXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKF90aW1lb3V0c1tqXSA9PSBpZCkge1xuICAgICAgICAgICAgX3RpbWVvdXRzLnNwbGljZShqLCAxKVxuICAgICAgICAgICAgX2xvZygnVGltZW91dCBjbGVhcmVkJylcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRpbWUpIHtcbiAgICAgICAgdmFyIHQgPSB7XG4gICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgIHRpbWU6IHRpbWUsXG4gICAgICAgICAgdHJpZ2dlclRpbWU6IF90aW1lICsgdGltZSxcbiAgICAgICAgfVxuICAgICAgICBfaW50ZXJ2YWxzLnB1c2godClcbiAgICAgICAgX2xvZygnSW50ZXJ2YWwgc2V0IHRvICcgKyB0LnRpbWUpXG4gICAgICAgIHJldHVybiB0XG4gICAgICB9XG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBfbG9nKCdjbGVhciBJbnRlcnZhbCcpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVDYWxsYmFja3MucHVzaChjYWxsYmFjaylcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfcGVyZm9ybWFuY2VUaW1lXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhvb2tDdXJyZW50VGltZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9ob29rZWQpIHtcbiAgICAgICAgICB0aGlzLl9ob29rZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5faG9va2VkVGltZSA9IHRoaXMuY3VycmVudFRpbWUgfHwgMFxuICAgICAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgICAgIG1lZGlhLnB1c2godGhpcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faG9va2VkVGltZSArIF9zZXR0aW5ncy5zdGFydFRpbWVcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxWaWRlb0VsZW1lbnQucHJvdG90eXBlLCAnY3VycmVudFRpbWUnLCB7IGdldDogaG9va0N1cnJlbnRUaW1lIH0pXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MQXVkaW9FbGVtZW50LnByb3RvdHlwZSwgJ2N1cnJlbnRUaW1lJywgeyBnZXQ6IGhvb2tDdXJyZW50VGltZSB9KVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9sb2coZXJyKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9zdGFydCgpIHtcbiAgICAgIF9pbml0KClcbiAgICAgIF9lbmNvZGVyLnN0YXJ0KClcbiAgICAgIF9jYXB0dXJpbmcgPSB0cnVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3N0b3AoKSB7XG4gICAgICBfY2FwdHVyaW5nID0gZmFsc2VcbiAgICAgIF9lbmNvZGVyLnN0b3AoKVxuICAgICAgX2Rlc3Ryb3koKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jYWxsKGZuLCBwKSB7XG4gICAgICBfb2xkU2V0VGltZW91dChmbiwgMCwgcClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc3RlcCgpIHtcbiAgICAgIC8vX29sZFJlcXVlc3RBbmltYXRpb25GcmFtZSggX3Byb2Nlc3MgKTtcbiAgICAgIF9jYWxsKF9wcm9jZXNzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9kZXN0cm95KCkge1xuICAgICAgX2xvZygnQ2FwdHVyZXIgc3RvcCcpXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCA9IF9vbGRTZXRUaW1lb3V0XG4gICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwgPSBfb2xkU2V0SW50ZXJ2YWxcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsID0gX29sZENsZWFySW50ZXJ2YWxcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQgPSBfb2xkQ2xlYXJUaW1lb3V0XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gX29sZFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgd2luZG93LkRhdGUucHJvdG90eXBlLmdldFRpbWUgPSBfb2xkR2V0VGltZVxuICAgICAgd2luZG93LkRhdGUubm93ID0gX29sZE5vd1xuICAgICAgd2luZG93LnBlcmZvcm1hbmNlLm5vdyA9IF9vbGRQZXJmb3JtYW5jZU5vd1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF91cGRhdGVUaW1lKCkge1xuICAgICAgdmFyIHNlY29uZHMgPSBfZnJhbWVDb3VudCAvIF9zZXR0aW5ncy5mcmFtZXJhdGVcbiAgICAgIGlmIChcbiAgICAgICAgKF9zZXR0aW5ncy5mcmFtZUxpbWl0ICYmIF9mcmFtZUNvdW50ID49IF9zZXR0aW5ncy5mcmFtZUxpbWl0KSB8fFxuICAgICAgICAoX3NldHRpbmdzLnRpbWVMaW1pdCAmJiBzZWNvbmRzID49IF9zZXR0aW5ncy50aW1lTGltaXQpXG4gICAgICApIHtcbiAgICAgICAgX3N0b3AoKVxuICAgICAgICBfc2F2ZSgpXG4gICAgICB9XG4gICAgICB2YXIgZCA9IG5ldyBEYXRlKG51bGwpXG4gICAgICBkLnNldFNlY29uZHMoc2Vjb25kcylcbiAgICAgIGlmIChfc2V0dGluZ3MubW90aW9uQmx1ckZyYW1lcyA+IDIpIHtcbiAgICAgICAgX3RpbWVEaXNwbGF5LnRleHRDb250ZW50ID1cbiAgICAgICAgICAnQ0NhcHR1cmUgJyArXG4gICAgICAgICAgX3NldHRpbmdzLmZvcm1hdCArXG4gICAgICAgICAgJyB8ICcgK1xuICAgICAgICAgIF9mcmFtZUNvdW50ICtcbiAgICAgICAgICAnIGZyYW1lcyAoJyArXG4gICAgICAgICAgX2ludGVybWVkaWF0ZUZyYW1lQ291bnQgK1xuICAgICAgICAgICcgaW50ZXIpIHwgJyArXG4gICAgICAgICAgZC50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aW1lRGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgJ0NDYXB0dXJlICcgKyBfc2V0dGluZ3MuZm9ybWF0ICsgJyB8ICcgKyBfZnJhbWVDb3VudCArICcgZnJhbWVzIHwgJyArIGQudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2NoZWNrRnJhbWUoY2FudmFzKSB7XG4gICAgICBpZiAoY2FudmFzTW90aW9uQmx1ci53aWR0aCAhPT0gY2FudmFzLndpZHRoIHx8IGNhbnZhc01vdGlvbkJsdXIuaGVpZ2h0ICE9PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgIGNhbnZhc01vdGlvbkJsdXIud2lkdGggPSBjYW52YXMud2lkdGhcbiAgICAgICAgY2FudmFzTW90aW9uQmx1ci5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0XG4gICAgICAgIGJ1ZmZlck1vdGlvbkJsdXIgPSBuZXcgVWludDE2QXJyYXkoY2FudmFzTW90aW9uQmx1ci5oZWlnaHQgKiBjYW52YXNNb3Rpb25CbHVyLndpZHRoICogNClcbiAgICAgICAgY3R4TW90aW9uQmx1ci5maWxsU3R5bGUgPSAnIzAnXG4gICAgICAgIGN0eE1vdGlvbkJsdXIuZmlsbFJlY3QoMCwgMCwgY2FudmFzTW90aW9uQmx1ci53aWR0aCwgY2FudmFzTW90aW9uQmx1ci5oZWlnaHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2JsZW5kRnJhbWUoY2FudmFzKSB7XG4gICAgICAvL19sb2coICdJbnRlcm1lZGlhdGUgRnJhbWU6ICcgKyBfaW50ZXJtZWRpYXRlRnJhbWVDb3VudCApO1xuXG4gICAgICBjdHhNb3Rpb25CbHVyLmRyYXdJbWFnZShjYW52YXMsIDAsIDApXG4gICAgICBpbWFnZURhdGEgPSBjdHhNb3Rpb25CbHVyLmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXNNb3Rpb25CbHVyLndpZHRoLCBjYW52YXNNb3Rpb25CbHVyLmhlaWdodClcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYnVmZmVyTW90aW9uQmx1ci5sZW5ndGg7IGogKz0gNCkge1xuICAgICAgICBidWZmZXJNb3Rpb25CbHVyW2pdICs9IGltYWdlRGF0YS5kYXRhW2pdXG4gICAgICAgIGJ1ZmZlck1vdGlvbkJsdXJbaiArIDFdICs9IGltYWdlRGF0YS5kYXRhW2ogKyAxXVxuICAgICAgICBidWZmZXJNb3Rpb25CbHVyW2ogKyAyXSArPSBpbWFnZURhdGEuZGF0YVtqICsgMl1cbiAgICAgIH1cbiAgICAgIF9pbnRlcm1lZGlhdGVGcmFtZUNvdW50KytcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc2F2ZUZyYW1lKCkge1xuICAgICAgdmFyIGRhdGEgPSBpbWFnZURhdGEuZGF0YVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBidWZmZXJNb3Rpb25CbHVyLmxlbmd0aDsgaiArPSA0KSB7XG4gICAgICAgIGRhdGFbal0gPSAoYnVmZmVyTW90aW9uQmx1cltqXSAqIDIpIC8gX3NldHRpbmdzLm1vdGlvbkJsdXJGcmFtZXNcbiAgICAgICAgZGF0YVtqICsgMV0gPSAoYnVmZmVyTW90aW9uQmx1cltqICsgMV0gKiAyKSAvIF9zZXR0aW5ncy5tb3Rpb25CbHVyRnJhbWVzXG4gICAgICAgIGRhdGFbaiArIDJdID0gKGJ1ZmZlck1vdGlvbkJsdXJbaiArIDJdICogMikgLyBfc2V0dGluZ3MubW90aW9uQmx1ckZyYW1lc1xuICAgICAgfVxuICAgICAgY3R4TW90aW9uQmx1ci5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKVxuICAgICAgX2VuY29kZXIuYWRkKGNhbnZhc01vdGlvbkJsdXIpXG4gICAgICBfZnJhbWVDb3VudCsrXG4gICAgICBfaW50ZXJtZWRpYXRlRnJhbWVDb3VudCA9IDBcbiAgICAgIF9sb2coJ0Z1bGwgTUIgRnJhbWUhICcgKyBfZnJhbWVDb3VudCArICcgJyArIF90aW1lKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBidWZmZXJNb3Rpb25CbHVyLmxlbmd0aDsgaiArPSA0KSB7XG4gICAgICAgIGJ1ZmZlck1vdGlvbkJsdXJbal0gPSAwXG4gICAgICAgIGJ1ZmZlck1vdGlvbkJsdXJbaiArIDFdID0gMFxuICAgICAgICBidWZmZXJNb3Rpb25CbHVyW2ogKyAyXSA9IDBcbiAgICAgIH1cbiAgICAgIGdjKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfY2FwdHVyZShjYW52YXMpIHtcbiAgICAgIGlmIChfY2FwdHVyaW5nKSB7XG4gICAgICAgIGlmIChfc2V0dGluZ3MubW90aW9uQmx1ckZyYW1lcyA+IDIpIHtcbiAgICAgICAgICBfY2hlY2tGcmFtZShjYW52YXMpXG4gICAgICAgICAgX2JsZW5kRnJhbWUoY2FudmFzKVxuXG4gICAgICAgICAgaWYgKF9pbnRlcm1lZGlhdGVGcmFtZUNvdW50ID49IDAuNSAqIF9zZXR0aW5ncy5tb3Rpb25CbHVyRnJhbWVzKSB7XG4gICAgICAgICAgICBfc2F2ZUZyYW1lKClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3N0ZXAoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfZW5jb2Rlci5hZGQoY2FudmFzKVxuICAgICAgICAgIF9mcmFtZUNvdW50KytcbiAgICAgICAgICBfbG9nKCdGdWxsIEZyYW1lISAnICsgX2ZyYW1lQ291bnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcHJvY2VzcygpIHtcbiAgICAgIHZhciBzdGVwID0gMTAwMCAvIF9zZXR0aW5ncy5mcmFtZXJhdGVcbiAgICAgIHZhciBkdCA9IChfZnJhbWVDb3VudCArIF9pbnRlcm1lZGlhdGVGcmFtZUNvdW50IC8gX3NldHRpbmdzLm1vdGlvbkJsdXJGcmFtZXMpICogc3RlcFxuXG4gICAgICBfdGltZSA9IF9zdGFydFRpbWUgKyBkdFxuICAgICAgX3BlcmZvcm1hbmNlVGltZSA9IF9wZXJmb3JtYW5jZVN0YXJ0VGltZSArIGR0XG5cbiAgICAgIG1lZGlhLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdi5faG9va2VkVGltZSA9IGR0IC8gMTAwMFxuICAgICAgfSlcblxuICAgICAgX3VwZGF0ZVRpbWUoKVxuICAgICAgX2xvZygnRnJhbWU6ICcgKyBfZnJhbWVDb3VudCArICcgJyArIF9pbnRlcm1lZGlhdGVGcmFtZUNvdW50KVxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IF90aW1lb3V0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoX3RpbWUgPj0gX3RpbWVvdXRzW2pdLnRyaWdnZXJUaW1lKSB7XG4gICAgICAgICAgX2NhbGwoX3RpbWVvdXRzW2pdLmNhbGxiYWNrKVxuICAgICAgICAgIC8vY29uc29sZS5sb2coICd0aW1lb3V0IScgKTtcbiAgICAgICAgICBfdGltZW91dHMuc3BsaWNlKGosIDEpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9pbnRlcnZhbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKF90aW1lID49IF9pbnRlcnZhbHNbal0udHJpZ2dlclRpbWUpIHtcbiAgICAgICAgICBfY2FsbChfaW50ZXJ2YWxzW2pdLmNhbGxiYWNrKVxuICAgICAgICAgIF9pbnRlcnZhbHNbal0udHJpZ2dlclRpbWUgKz0gX2ludGVydmFsc1tqXS50aW1lXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyggJ2ludGVydmFsIScgKTtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgX2NhbGwoY2IsIF90aW1lIC0gZ19zdGFydFRpbWUpXG4gICAgICB9KVxuICAgICAgX3JlcXVlc3RBbmltYXRpb25GcmFtZUNhbGxiYWNrcyA9IFtdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3NhdmUoY2FsbGJhY2spIHtcbiAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgIGRvd25sb2FkKGJsb2IsIF9lbmNvZGVyLmZpbGVuYW1lICsgX2VuY29kZXIuZXh0ZW5zaW9uLCBfZW5jb2Rlci5taW1lVHlwZSlcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgX2VuY29kZXIuc2F2ZShjYWxsYmFjaylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfbG9nKG1lc3NhZ2UpIHtcbiAgICAgIGlmIChfdmVyYm9zZSkgY29uc29sZS5sb2cobWVzc2FnZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIF9oYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2VtaXQoZXZlbnQpIHtcbiAgICAgIHZhciBoYW5kbGVyID0gX2hhbmRsZXJzW2V2ZW50XVxuICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgaGFuZGxlci5hcHBseShudWxsLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9wcm9ncmVzcyhwcm9ncmVzcykge1xuICAgICAgX2VtaXQoJ3Byb2dyZXNzJywgcHJvZ3Jlc3MpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiBfc3RhcnQsXG4gICAgICBjYXB0dXJlOiBfY2FwdHVyZSxcbiAgICAgIHN0b3A6IF9zdG9wLFxuICAgICAgc2F2ZTogX3NhdmUsXG4gICAgICBvbjogX29uLFxuICAgIH1cbiAgfVxuXG4gIDsoZnJlZVdpbmRvdyB8fCBmcmVlU2VsZiB8fCB7fSkuQ0NhcHR1cmUgPSBDQ2FwdHVyZVxuXG4gIC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMgbGlrZSByLmpzIGNoZWNrIGZvciBjb25kaXRpb24gcGF0dGVybnMgbGlrZSB0aGUgZm9sbG93aW5nOlxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBEZWZpbmUgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSBzbywgdGhyb3VnaCBwYXRoIG1hcHBpbmcsIGl0IGNhbiBiZVxuICAgIC8vIHJlZmVyZW5jZWQgYXMgdGhlIFwidW5kZXJzY29yZVwiIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIENDYXB0dXJlXG4gICAgfSlcbiAgfVxuICAvLyBDaGVjayBmb3IgYGV4cG9ydHNgIGFmdGVyIGBkZWZpbmVgIGluIGNhc2UgYSBidWlsZCBvcHRpbWl6ZXIgYWRkcyBhbiBgZXhwb3J0c2Agb2JqZWN0LlxuICBlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiBmcmVlTW9kdWxlKSB7XG4gICAgLy8gRXhwb3J0IGZvciBOb2RlLmpzLlxuICAgIGlmIChtb2R1bGVFeHBvcnRzKSB7XG4gICAgICA7KGZyZWVNb2R1bGUuZXhwb3J0cyA9IENDYXB0dXJlKS5DQ2FwdHVyZSA9IENDYXB0dXJlXG4gICAgfVxuICAgIC8vIEV4cG9ydCBmb3IgQ29tbW9uSlMgc3VwcG9ydC5cbiAgICBmcmVlRXhwb3J0cy5DQ2FwdHVyZSA9IENDYXB0dXJlXG4gIH0gZWxzZSB7XG4gICAgLy8gRXhwb3J0IHRvIHRoZSBnbG9iYWwgb2JqZWN0LlxuICAgIHJvb3QuQ0NhcHR1cmUgPSBDQ2FwdHVyZVxuICB9XG59KSgpXG4iXSwibmFtZXMiOlsidGhpcyIsInJlcXVpcmUkJDAiLCJkb3dubG9hZCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsImdsb2JhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLENBQUMsWUFBWTtBQUVkO0FBQ0EsRUFBRSxJQUFJLE1BQU0sR0FBRztBQUNmLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksR0FBRztB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QUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBQztBQUNwQyxLQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0EsRUFBRSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxFQUFFO0FBQzNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFDO0FBQzdCLElBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxVQUFTO0FBQ3JGO0FBQ0EsRUFBRSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxFQUFFO0FBQzVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQztBQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBQztBQUM3QixJQUFHO0FBQ0g7QUFDQSxFQUFFLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLEVBQUU7QUFDL0QsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDO0FBQzVEO0FBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEQsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMs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
