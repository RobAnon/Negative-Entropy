import { c as createCommonjsModule, b as commonjsGlobal } from './create.2d047460.js';

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

export { CCapture$1 as C };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0NhcHR1cmUuNzcyNzkxNTAuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NjYXB0dXJlLmpzL3NyYy90YXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jY2FwdHVyZS5qcy9zcmMvZG93bmxvYWQuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9jY2FwdHVyZS5qcy9zcmMvZ2lmLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY2NhcHR1cmUuanMvc3JjL3dlYm0td3JpdGVyLTAuMi4wLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY2NhcHR1cmUuanMvc3JjL0NDYXB0dXJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgbG9va3VwID0gW1xuICAgICdBJyxcbiAgICAnQicsXG4gICAgJ0MnLFxuICAgICdEJyxcbiAgICAnRScsXG4gICAgJ0YnLFxuICAgICdHJyxcbiAgICAnSCcsXG4gICAgJ0knLFxuICAgICdKJyxcbiAgICAnSycsXG4gICAgJ0wnLFxuICAgICdNJyxcbiAgICAnTicsXG4gICAgJ08nLFxuICAgICdQJyxcbiAgICAnUScsXG4gICAgJ1InLFxuICAgICdTJyxcbiAgICAnVCcsXG4gICAgJ1UnLFxuICAgICdWJyxcbiAgICAnVycsXG4gICAgJ1gnLFxuICAgICdZJyxcbiAgICAnWicsXG4gICAgJ2EnLFxuICAgICdiJyxcbiAgICAnYycsXG4gICAgJ2QnLFxuICAgICdlJyxcbiAgICAnZicsXG4gICAgJ2cnLFxuICAgICdoJyxcbiAgICAnaScsXG4gICAgJ2onLFxuICAgICdrJyxcbiAgICAnbCcsXG4gICAgJ20nLFxuICAgICduJyxcbiAgICAnbycsXG4gICAgJ3AnLFxuICAgICdxJyxcbiAgICAncicsXG4gICAgJ3MnLFxuICAgICd0JyxcbiAgICAndScsXG4gICAgJ3YnLFxuICAgICd3JyxcbiAgICAneCcsXG4gICAgJ3knLFxuICAgICd6JyxcbiAgICAnMCcsXG4gICAgJzEnLFxuICAgICcyJyxcbiAgICAnMycsXG4gICAgJzQnLFxuICAgICc1JyxcbiAgICAnNicsXG4gICAgJzcnLFxuICAgICc4JyxcbiAgICAnOScsXG4gICAgJysnLFxuICAgICcvJyxcbiAgXVxuICBmdW5jdGlvbiBjbGVhbihsZW5ndGgpIHtcbiAgICB2YXIgaSxcbiAgICAgIGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJ1ZmZlcltpXSA9IDBcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlclxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kKG9yaWcsIGxlbmd0aCwgYWRkTGVuZ3RoLCBtdWx0aXBsZU9mKSB7XG4gICAgdmFyIG5ld1NpemUgPSBsZW5ndGggKyBhZGRMZW5ndGgsXG4gICAgICBidWZmZXIgPSBjbGVhbigocGFyc2VJbnQobmV3U2l6ZSAvIG11bHRpcGxlT2YpICsgMSkgKiBtdWx0aXBsZU9mKVxuXG4gICAgYnVmZmVyLnNldChvcmlnKVxuXG4gICAgcmV0dXJuIGJ1ZmZlclxuICB9XG5cbiAgZnVuY3Rpb24gcGFkKG51bSwgYnl0ZXMsIGJhc2UpIHtcbiAgICBudW0gPSBudW0udG9TdHJpbmcoYmFzZSB8fCA4KVxuICAgIHJldHVybiAnMDAwMDAwMDAwMDAwJy5zdWJzdHIobnVtLmxlbmd0aCArIDEyIC0gYnl0ZXMpICsgbnVtXG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdUb1VpbnQ4KGlucHV0LCBvdXQsIG9mZnNldCkge1xuICAgIHZhciBpLCBsZW5ndGhcblxuICAgIG91dCA9IG91dCB8fCBjbGVhbihpbnB1dC5sZW5ndGgpXG5cbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMFxuICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBvdXRbb2Zmc2V0XSA9IGlucHV0LmNoYXJDb2RlQXQoaSlcbiAgICAgIG9mZnNldCArPSAxXG4gICAgfVxuXG4gICAgcmV0dXJuIG91dFxuICB9XG5cbiAgZnVuY3Rpb24gdWludDhUb0Jhc2U2NCh1aW50OCkge1xuICAgIHZhciBpLFxuICAgICAgZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gICAgICBvdXRwdXQgPSAnJyxcbiAgICAgIHRlbXAsXG4gICAgICBsZW5ndGhcblxuICAgIGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NChudW0pIHtcbiAgICAgIHJldHVybiBsb29rdXBbKG51bSA+PiAxOCkgJiAweDNmXSArIGxvb2t1cFsobnVtID4+IDEyKSAmIDB4M2ZdICsgbG9va3VwWyhudW0gPj4gNikgJiAweDNmXSArIGxvb2t1cFtudW0gJiAweDNmXVxuICAgIH1cblxuICAgIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgIHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArIHVpbnQ4W2kgKyAyXVxuICAgICAgb3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuICAgIH1cblxuICAgIC8vIHRoaXMgcHJldmVudHMgYW4gRVJSX0lOVkFMSURfVVJMIGluIENocm9tZSAoRmlyZWZveCBva2F5KVxuICAgIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgb3V0cHV0ICs9ICc9J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBvdXRwdXQgKz0gJz09J1xuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICB3aW5kb3cudXRpbHMgPSB7fVxuICB3aW5kb3cudXRpbHMuY2xlYW4gPSBjbGVhblxuICB3aW5kb3cudXRpbHMucGFkID0gcGFkXG4gIHdpbmRvdy51dGlscy5leHRlbmQgPSBleHRlbmRcbiAgd2luZG93LnV0aWxzLnN0cmluZ1RvVWludDggPSBzdHJpbmdUb1VpbnQ4XG4gIHdpbmRvdy51dGlscy51aW50OFRvQmFzZTY0ID0gdWludDhUb0Jhc2U2NFxufSkoKVxuXG47KGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgLypcbnN0cnVjdCBwb3NpeF9oZWFkZXIgeyAgICAgICAgICAgICAvLyBieXRlIG9mZnNldFxuXHRjaGFyIG5hbWVbMTAwXTsgICAgICAgICAgICAgICAvLyAgIDBcblx0Y2hhciBtb2RlWzhdOyAgICAgICAgICAgICAgICAgLy8gMTAwXG5cdGNoYXIgdWlkWzhdOyAgICAgICAgICAgICAgICAgIC8vIDEwOFxuXHRjaGFyIGdpZFs4XTsgICAgICAgICAgICAgICAgICAvLyAxMTZcblx0Y2hhciBzaXplWzEyXTsgICAgICAgICAgICAgICAgLy8gMTI0XG5cdGNoYXIgbXRpbWVbMTJdOyAgICAgICAgICAgICAgIC8vIDEzNlxuXHRjaGFyIGNoa3N1bVs4XTsgICAgICAgICAgICAgICAvLyAxNDhcblx0Y2hhciB0eXBlZmxhZzsgICAgICAgICAgICAgICAgLy8gMTU2XG5cdGNoYXIgbGlua25hbWVbMTAwXTsgICAgICAgICAgIC8vIDE1N1xuXHRjaGFyIG1hZ2ljWzZdOyAgICAgICAgICAgICAgICAvLyAyNTdcblx0Y2hhciB2ZXJzaW9uWzJdOyAgICAgICAgICAgICAgLy8gMjYzXG5cdGNoYXIgdW5hbWVbMzJdOyAgICAgICAgICAgICAgIC8vIDI2NVxuXHRjaGFyIGduYW1lWzMyXTsgICAgICAgICAgICAgICAvLyAyOTdcblx0Y2hhciBkZXZtYWpvcls4XTsgICAgICAgICAgICAgLy8gMzI5XG5cdGNoYXIgZGV2bWlub3JbOF07ICAgICAgICAgICAgIC8vIDMzN1xuXHRjaGFyIHByZWZpeFsxNTVdOyAgICAgICAgICAgICAvLyAzNDVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA1MDBcbn07XG4qL1xuXG4gIHZhciB1dGlscyA9IHdpbmRvdy51dGlscyxcbiAgICBoZWFkZXJGb3JtYXRcblxuICBoZWFkZXJGb3JtYXQgPSBbXG4gICAge1xuICAgICAgZmllbGQ6ICdmaWxlTmFtZScsXG4gICAgICBsZW5ndGg6IDEwMCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZpZWxkOiAnZmlsZU1vZGUnLFxuICAgICAgbGVuZ3RoOiA4LFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICd1aWQnLFxuICAgICAgbGVuZ3RoOiA4LFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdnaWQnLFxuICAgICAgbGVuZ3RoOiA4LFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdmaWxlU2l6ZScsXG4gICAgICBsZW5ndGg6IDEyLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdtdGltZScsXG4gICAgICBsZW5ndGg6IDEyLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdjaGVja3N1bScsXG4gICAgICBsZW5ndGg6IDgsXG4gICAgfSxcbiAgICB7XG4gICAgICBmaWVsZDogJ3R5cGUnLFxuICAgICAgbGVuZ3RoOiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdsaW5rTmFtZScsXG4gICAgICBsZW5ndGg6IDEwMCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZpZWxkOiAndXN0YXInLFxuICAgICAgbGVuZ3RoOiA4LFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdvd25lcicsXG4gICAgICBsZW5ndGg6IDMyLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdncm91cCcsXG4gICAgICBsZW5ndGg6IDMyLFxuICAgIH0sXG4gICAge1xuICAgICAgZmllbGQ6ICdtYWpvck51bWJlcicsXG4gICAgICBsZW5ndGg6IDgsXG4gICAgfSxcbiAgICB7XG4gICAgICBmaWVsZDogJ21pbm9yTnVtYmVyJyxcbiAgICAgIGxlbmd0aDogOCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZpZWxkOiAnZmlsZW5hbWVQcmVmaXgnLFxuICAgICAgbGVuZ3RoOiAxNTUsXG4gICAgfSxcbiAgICB7XG4gICAgICBmaWVsZDogJ3BhZGRpbmcnLFxuICAgICAgbGVuZ3RoOiAxMixcbiAgICB9LFxuICBdXG5cbiAgZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGRhdGEsIGNiKSB7XG4gICAgdmFyIGJ1ZmZlciA9IHV0aWxzLmNsZWFuKDUxMiksXG4gICAgICBvZmZzZXQgPSAwXG5cbiAgICBoZWFkZXJGb3JtYXQuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHZhciBzdHIgPSBkYXRhW3ZhbHVlLmZpZWxkXSB8fCAnJyxcbiAgICAgICAgaSxcbiAgICAgICAgbGVuZ3RoXG5cbiAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IHN0ci5sZW5ndGg7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBidWZmZXJbb2Zmc2V0XSA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgICAgIG9mZnNldCArPSAxXG4gICAgICB9XG5cbiAgICAgIG9mZnNldCArPSB2YWx1ZS5sZW5ndGggLSBpIC8vIHNwYWNlIGl0IG91dCB3aXRoIG51bGxzXG4gICAgfSlcblxuICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjYihidWZmZXIsIG9mZnNldClcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlclxuICB9XG5cbiAgd2luZG93LmhlYWRlciA9IHt9XG4gIHdpbmRvdy5oZWFkZXIuc3RydWN0dXJlID0gaGVhZGVyRm9ybWF0XG4gIHdpbmRvdy5oZWFkZXIuZm9ybWF0ID0gZm9ybWF0SGVhZGVyXG59KSgpXG5cbjsoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgaGVhZGVyID0gd2luZG93LmhlYWRlcixcbiAgICB1dGlscyA9IHdpbmRvdy51dGlscyxcbiAgICByZWNvcmRTaXplID0gNTEyLFxuICAgIGJsb2NrU2l6ZVxuXG4gIGZ1bmN0aW9uIFRhcihyZWNvcmRzUGVyQmxvY2spIHtcbiAgICB0aGlzLndyaXR0ZW4gPSAwXG4gICAgYmxvY2tTaXplID0gKHJlY29yZHNQZXJCbG9jayB8fCAyMCkgKiByZWNvcmRTaXplXG4gICAgdGhpcy5vdXQgPSB1dGlscy5jbGVhbihibG9ja1NpemUpXG4gICAgdGhpcy5ibG9ja3MgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG5cbiAgVGFyLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoZmlsZXBhdGgsIGlucHV0LCBvcHRzLCBjYWxsYmFjaykge1xuICAgIHZhciBkYXRhLCBjaGVja3N1bSwgbW9kZSwgbXRpbWUsIHVpZCwgZ2lkLCBoZWFkZXJBcnJcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpbnB1dCA9IHV0aWxzLnN0cmluZ1RvVWludDgoaW5wdXQpXG4gICAgfSBlbHNlIGlmIChpbnB1dC5jb25zdHJ1Y3RvciAhPT0gVWludDhBcnJheS5wcm90b3R5cGUuY29uc3RydWN0b3IpIHtcbiAgICAgIHRocm93IChcbiAgICAgICAgJ0ludmFsaWQgaW5wdXQgdHlwZS4gWW91IGdhdmUgbWU6ICcgK1xuICAgICAgICBpbnB1dC5jb25zdHJ1Y3Rvci50b1N0cmluZygpLm1hdGNoKC9mdW5jdGlvblxccyooWyRBLVphLXpfXVswLTlBLVphLXpfXSopXFxzKlxcKC8pWzFdXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdHNcbiAgICAgIG9wdHMgPSB7fVxuICAgIH1cblxuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICBtb2RlID0gb3B0cy5tb2RlIHx8IHBhcnNlSW50KCc3NzcnLCA4KSAmIDB4ZmZmXG4gICAgbXRpbWUgPSBvcHRzLm10aW1lIHx8IE1hdGguZmxvb3IoK25ldyBEYXRlKCkgLyAxMDAwKVxuICAgIHVpZCA9IG9wdHMudWlkIHx8IDBcbiAgICBnaWQgPSBvcHRzLmdpZCB8fCAwXG5cbiAgICBkYXRhID0ge1xuICAgICAgZmlsZU5hbWU6IGZpbGVwYXRoLFxuICAgICAgZmlsZU1vZGU6IHV0aWxzLnBhZChtb2RlLCA3KSxcbiAgICAgIHVpZDogdXRpbHMucGFkKHVpZCwgNyksXG4gICAgICBnaWQ6IHV0aWxzLnBhZChnaWQsIDcpLFxuICAgICAgZmlsZVNpemU6IHV0aWxzLnBhZChpbnB1dC5sZW5ndGgsIDExKSxcbiAgICAgIG10aW1lOiB1dGlscy5wYWQobXRpbWUsIDExKSxcbiAgICAgIGNoZWNrc3VtOiAnICAgICAgICAnLFxuICAgICAgdHlwZTogJzAnLCAvLyBqdXN0IGEgZmlsZVxuICAgICAgdXN0YXI6ICd1c3RhciAgJyxcbiAgICAgIG93bmVyOiBvcHRzLm93bmVyIHx8ICcnLFxuICAgICAgZ3JvdXA6IG9wdHMuZ3JvdXAgfHwgJycsXG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBjaGVja3N1bVxuICAgIGNoZWNrc3VtID0gMFxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIGksXG4gICAgICAgIHZhbHVlID0gZGF0YVtrZXldLFxuICAgICAgICBsZW5ndGhcblxuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY2hlY2tzdW0gKz0gdmFsdWUuY2hhckNvZGVBdChpKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBkYXRhLmNoZWNrc3VtID0gdXRpbHMucGFkKGNoZWNrc3VtLCA2KSArICdcXHUwMDAwICdcblxuICAgIGhlYWRlckFyciA9IGhlYWRlci5mb3JtYXQoZGF0YSlcblxuICAgIHZhciBoZWFkZXJMZW5ndGggPSBNYXRoLmNlaWwoaGVhZGVyQXJyLmxlbmd0aCAvIHJlY29yZFNpemUpICogcmVjb3JkU2l6ZVxuICAgIHZhciBpbnB1dExlbmd0aCA9IE1hdGguY2VpbChpbnB1dC5sZW5ndGggLyByZWNvcmRTaXplKSAqIHJlY29yZFNpemVcblxuICAgIHRoaXMuYmxvY2tzLnB1c2goeyBoZWFkZXI6IGhlYWRlckFyciwgaW5wdXQ6IGlucHV0LCBoZWFkZXJMZW5ndGg6IGhlYWRlckxlbmd0aCwgaW5wdXRMZW5ndGg6IGlucHV0TGVuZ3RoIH0pXG4gIH1cblxuICBUYXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJ1ZmZlcnMgPSBbXVxuICAgIHZhciBjaHVua3MgPSBbXVxuICAgIHZhciBsZW5ndGggPSAwXG4gICAgdmFyIG1heCA9IE1hdGgucG93KDIsIDIwKVxuXG4gICAgdmFyIGNodW5rID0gW11cbiAgICB0aGlzLmJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7XG4gICAgICBpZiAobGVuZ3RoICsgYi5oZWFkZXJMZW5ndGggKyBiLmlucHV0TGVuZ3RoID4gbWF4KSB7XG4gICAgICAgIGNodW5rcy5wdXNoKHsgYmxvY2tzOiBjaHVuaywgbGVuZ3RoOiBsZW5ndGggfSlcbiAgICAgICAgY2h1bmsgPSBbXVxuICAgICAgICBsZW5ndGggPSAwXG4gICAgICB9XG4gICAgICBjaHVuay5wdXNoKGIpXG4gICAgICBsZW5ndGggKz0gYi5oZWFkZXJMZW5ndGggKyBiLmlucHV0TGVuZ3RoXG4gICAgfSlcbiAgICBjaHVua3MucHVzaCh7IGJsb2NrczogY2h1bmssIGxlbmd0aDogbGVuZ3RoIH0pXG5cbiAgICBjaHVua3MuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGMubGVuZ3RoKVxuICAgICAgdmFyIHdyaXR0ZW4gPSAwXG4gICAgICBjLmJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7XG4gICAgICAgIGJ1ZmZlci5zZXQoYi5oZWFkZXIsIHdyaXR0ZW4pXG4gICAgICAgIHdyaXR0ZW4gKz0gYi5oZWFkZXJMZW5ndGhcbiAgICAgICAgYnVmZmVyLnNldChiLmlucHV0LCB3cml0dGVuKVxuICAgICAgICB3cml0dGVuICs9IGIuaW5wdXRMZW5ndGhcbiAgICAgIH0pXG4gICAgICBidWZmZXJzLnB1c2goYnVmZmVyKVxuICAgIH0pXG5cbiAgICBidWZmZXJzLnB1c2gobmV3IFVpbnQ4QXJyYXkoMiAqIHJlY29yZFNpemUpKVxuXG4gICAgcmV0dXJuIG5ldyBCbG9iKGJ1ZmZlcnMsIHsgdHlwZTogJ29jdGV0L3N0cmVhbScgfSlcbiAgfVxuXG4gIFRhci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy53cml0dGVuID0gMFxuICAgIHRoaXMub3V0ID0gdXRpbHMuY2xlYW4oYmxvY2tTaXplKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFRhclxuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5UYXIgPSBUYXJcbiAgfVxufSkoKVxuIiwiLy9kb3dubG9hZC5qcyB2NC4yMSwgYnkgZGFuZGF2aXM7IDIwMDgtMjAxOC4gW01JVF0gc2VlIGh0dHA6Ly9kYW5tbC5jb20vZG93bmxvYWQuaHRtbCBmb3IgdGVzdHMvdXNhZ2Vcbi8vIHYxIGxhbmRlZCBhIEZGK0Nocm9tZSBjb21wYXRpYmxlIHdheSBvZiBkb3dubG9hZGluZyBzdHJpbmdzIHRvIGxvY2FsIHVuLW5hbWVkIGZpbGVzLCB1cGdyYWRlZCB0byB1c2UgYSBoaWRkZW4gZnJhbWUgYW5kIG9wdGlvbmFsIG1pbWVcbi8vIHYyIGFkZGVkIG5hbWVkIGZpbGVzIHZpYSBhW2Rvd25sb2FkXSwgbXNTYXZlQmxvYiwgSUUgKDEwKykgc3VwcG9ydCwgYW5kIHdpbmRvdy5VUkwgc3VwcG9ydCBmb3IgbGFyZ2VyK2Zhc3RlciBzYXZlcyB0aGFuIGRhdGFVUkxzXG4vLyB2MyBhZGRlZCBkYXRhVVJMIGFuZCBCbG9iIElucHV0LCBiaW5kLXRvZ2dsZSBhcml0eSwgYW5kIGxlZ2FjeSBkYXRhVVJMIGZhbGxiYWNrIHdhcyBpbXByb3ZlZCB3aXRoIGZvcmNlLWRvd25sb2FkIG1pbWUgYW5kIGJhc2U2NCBzdXBwb3J0LiAzLjEgaW1wcm92ZWQgc2FmYXJpIGhhbmRsaW5nLlxuLy8gdjQgYWRkcyBBTUQvVU1ELCBjb21tb25KUywgYW5kIHBsYWluIGJyb3dzZXIgc3VwcG9ydFxuLy8gdjQuMSBhZGRzIHVybCBkb3dubG9hZCBjYXBhYmlsaXR5IHZpYSBzb2xvIFVSTCBhcmd1bWVudCAoc2FtZSBkb21haW4vQ09SUyBvbmx5KVxuLy8gdjQuMiBhZGRzIHNlbWFudGljIHZhcmlhYmxlIG5hbWVzLCBsb25nIChvdmVyIDJNQikgZGF0YVVSTCBzdXBwb3J0LCBhbmQgaGlkZGVuIGJ5IGRlZmF1bHQgdGVtcCBhbmNob3JzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcm5kbWUvZG93bmxvYWRcblxuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbXSwgZmFjdG9yeSlcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAvLyBsaWtlIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIHJvb3QuZG93bmxvYWQgPSBmYWN0b3J5KClcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZG93bmxvYWQoZGF0YSwgc3RyRmlsZU5hbWUsIHN0ck1pbWVUeXBlKSB7XG4gICAgdmFyIHNlbGYgPSB3aW5kb3csIC8vIHRoaXMgc2NyaXB0IGlzIG9ubHkgZm9yIGJyb3dzZXJzIGFueXdheS4uLlxuICAgICAgZGVmYXVsdE1pbWUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJywgLy8gdGhpcyBkZWZhdWx0IG1pbWUgYWxzbyB0cmlnZ2VycyBpZnJhbWUgZG93bmxvYWRzXG4gICAgICBtaW1lVHlwZSA9IHN0ck1pbWVUeXBlIHx8IGRlZmF1bHRNaW1lLFxuICAgICAgcGF5bG9hZCA9IGRhdGEsXG4gICAgICB1cmwgPSAhc3RyRmlsZU5hbWUgJiYgIXN0ck1pbWVUeXBlICYmIHBheWxvYWQsXG4gICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXG4gICAgICB0b1N0cmluZyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoYSlcbiAgICAgIH0sXG4gICAgICBteUJsb2IgPSBzZWxmLkJsb2IgfHwgc2VsZi5Nb3pCbG9iIHx8IHNlbGYuV2ViS2l0QmxvYiB8fCB0b1N0cmluZyxcbiAgICAgIGZpbGVOYW1lID0gc3RyRmlsZU5hbWUgfHwgJ2Rvd25sb2FkJyxcbiAgICAgIGJsb2IsXG4gICAgICByZWFkZXJcbiAgICBteUJsb2IgPSBteUJsb2IuY2FsbCA/IG15QmxvYi5iaW5kKHNlbGYpIDogQmxvYlxuXG4gICAgaWYgKFN0cmluZyh0aGlzKSA9PT0gJ3RydWUnKSB7XG4gICAgICAvL3JldmVyc2UgYXJndW1lbnRzLCBhbGxvd2luZyBkb3dubG9hZC5iaW5kKHRydWUsIFwidGV4dC94bWxcIiwgXCJleHBvcnQueG1sXCIpIHRvIGFjdCBhcyBhIGNhbGxiYWNrXG4gICAgICBwYXlsb2FkID0gW3BheWxvYWQsIG1pbWVUeXBlXVxuICAgICAgbWltZVR5cGUgPSBwYXlsb2FkWzBdXG4gICAgICBwYXlsb2FkID0gcGF5bG9hZFsxXVxuICAgIH1cblxuICAgIGlmICh1cmwgJiYgdXJsLmxlbmd0aCA8IDIwNDgpIHtcbiAgICAgIC8vIGlmIG5vIGZpbGVuYW1lIGFuZCBubyBtaW1lLCBhc3N1bWUgYSB1cmwgd2FzIHBhc3NlZCBhcyB0aGUgb25seSBhcmd1bWVudFxuICAgICAgZmlsZU5hbWUgPSB1cmwuc3BsaXQoJy8nKS5wb3AoKS5zcGxpdCgnPycpWzBdXG4gICAgICBhbmNob3IuaHJlZiA9IHVybCAvLyBhc3NpZ24gaHJlZiBwcm9wIHRvIHRlbXAgYW5jaG9yXG4gICAgICBpZiAoYW5jaG9yLmhyZWYuaW5kZXhPZih1cmwpICE9PSAtMSkge1xuICAgICAgICAvLyBpZiB0aGUgYnJvd3NlciBkZXRlcm1pbmVzIHRoYXQgaXQncyBhIHBvdGVudGlhbGx5IHZhbGlkIHVybCBwYXRoOlxuICAgICAgICB2YXIgYWpheCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIGFqYXgub3BlbignR0VUJywgdXJsLCB0cnVlKVxuICAgICAgICBhamF4LnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgICBhamF4Lm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZG93bmxvYWQoZS50YXJnZXQucmVzcG9uc2UsIGZpbGVOYW1lLCBkZWZhdWx0TWltZSlcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhamF4LnNlbmQoKVxuICAgICAgICB9LCAwKSAvLyBhbGxvd3Mgc2V0dGluZyBjdXN0b20gYWpheCBoZWFkZXJzIHVzaW5nIHRoZSByZXR1cm46XG4gICAgICAgIHJldHVybiBhamF4XG4gICAgICB9IC8vIGVuZCBpZiB2YWxpZCB1cmw/XG4gICAgfSAvLyBlbmQgaWYgdXJsP1xuXG4gICAgLy9nbyBhaGVhZCBhbmQgZG93bmxvYWQgZGF0YVVSTHMgcmlnaHQgYXdheVxuICAgIGlmICgvXmRhdGE6KFtcXHcrLV0rXFwvW1xcdysuLV0rKT9bLDtdLy50ZXN0KHBheWxvYWQpKSB7XG4gICAgICBpZiAocGF5bG9hZC5sZW5ndGggPiAxMDI0ICogMTAyNCAqIDEuOTk5ICYmIG15QmxvYiAhPT0gdG9TdHJpbmcpIHtcbiAgICAgICAgcGF5bG9hZCA9IGRhdGFVcmxUb0Jsb2IocGF5bG9hZClcbiAgICAgICAgbWltZVR5cGUgPSBwYXlsb2FkLnR5cGUgfHwgZGVmYXVsdE1pbWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubXNTYXZlQmxvYiAvLyBJRTEwIGNhbid0IGRvIGFbZG93bmxvYWRdLCBvbmx5IEJsb2JzOlxuICAgICAgICAgID8gbmF2aWdhdG9yLm1zU2F2ZUJsb2IoZGF0YVVybFRvQmxvYihwYXlsb2FkKSwgZmlsZU5hbWUpXG4gICAgICAgICAgOiBzYXZlcihwYXlsb2FkKSAvLyBldmVyeW9uZSBlbHNlIGNhbiBzYXZlIGRhdGFVUkxzIHVuLXByb2Nlc3NlZFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL25vdCBkYXRhIHVybCwgaXMgaXQgYSBzdHJpbmcgd2l0aCBzcGVjaWFsIG5lZWRzP1xuICAgICAgaWYgKC8oW1xceDgwLVxceGZmXSkvLnRlc3QocGF5bG9hZCkpIHtcbiAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgIHRlbXBVaUFyciA9IG5ldyBVaW50OEFycmF5KHBheWxvYWQubGVuZ3RoKSxcbiAgICAgICAgICBteCA9IHRlbXBVaUFyci5sZW5ndGhcbiAgICAgICAgZm9yIChpOyBpIDwgbXg7ICsraSkgdGVtcFVpQXJyW2ldID0gcGF5bG9hZC5jaGFyQ29kZUF0KGkpXG4gICAgICAgIHBheWxvYWQgPSBuZXcgbXlCbG9iKFt0ZW1wVWlBcnJdLCB7IHR5cGU6IG1pbWVUeXBlIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGJsb2IgPSBwYXlsb2FkIGluc3RhbmNlb2YgbXlCbG9iID8gcGF5bG9hZCA6IG5ldyBteUJsb2IoW3BheWxvYWRdLCB7IHR5cGU6IG1pbWVUeXBlIH0pXG5cbiAgICBmdW5jdGlvbiBkYXRhVXJsVG9CbG9iKHN0clVybCkge1xuICAgICAgdmFyIHBhcnRzID0gc3RyVXJsLnNwbGl0KC9bOjssXS8pLFxuICAgICAgICB0eXBlID0gcGFydHNbMV0sXG4gICAgICAgIGluZGV4RGVjb2RlciA9IHN0clVybC5pbmRleE9mKCdjaGFyc2V0JykgPiAwID8gMyA6IDIsXG4gICAgICAgIGRlY29kZXIgPSBwYXJ0c1tpbmRleERlY29kZXJdID09ICdiYXNlNjQnID8gYXRvYiA6IGRlY29kZVVSSUNvbXBvbmVudCxcbiAgICAgICAgYmluRGF0YSA9IGRlY29kZXIocGFydHMucG9wKCkpLFxuICAgICAgICBteCA9IGJpbkRhdGEubGVuZ3RoLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgdWlBcnIgPSBuZXcgVWludDhBcnJheShteClcblxuICAgICAgZm9yIChpOyBpIDwgbXg7ICsraSkgdWlBcnJbaV0gPSBiaW5EYXRhLmNoYXJDb2RlQXQoaSlcblxuICAgICAgcmV0dXJuIG5ldyBteUJsb2IoW3VpQXJyXSwgeyB0eXBlOiB0eXBlIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2F2ZXIodXJsLCB3aW5Nb2RlKSB7XG4gICAgICBpZiAoJ2Rvd25sb2FkJyBpbiBhbmNob3IpIHtcbiAgICAgICAgLy9odG1sNSBBW2Rvd25sb2FkXVxuICAgICAgICBhbmNob3IuaHJlZiA9IHVybFxuICAgICAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVOYW1lKVxuICAgICAgICBhbmNob3IuY2xhc3NOYW1lID0gJ2Rvd25sb2FkLWpzLWxpbmsnXG4gICAgICAgIGFuY2hvci5pbm5lckhUTUwgPSAnZG93bmxvYWRpbmcuLi4nXG4gICAgICAgIGFuY2hvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhcmd1bWVudHMuY2FsbGVlKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFuY2hvcilcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYW5jaG9yLmNsaWNrKClcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGFuY2hvcilcbiAgICAgICAgICBpZiAod2luTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNlbGYuVVJMLnJldm9rZU9iamVjdFVSTChhbmNob3IuaHJlZilcbiAgICAgICAgICAgIH0sIDI1MClcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDY2KVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGUgbm9uLWFbZG93bmxvYWRdIHNhZmFyaSBhcyBiZXN0IHdlIGNhbjpcbiAgICAgIGlmICgvKFZlcnNpb24pXFwvKFxcZCspXFwuKFxcZCspKD86XFwuKFxcZCspKT8uKlNhZmFyaVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICBpZiAoL15kYXRhOi8udGVzdCh1cmwpKSB1cmwgPSAnZGF0YTonICsgdXJsLnJlcGxhY2UoL15kYXRhOihbXFx3XFwvXFwtXFwrXSspLywgZGVmYXVsdE1pbWUpXG4gICAgICAgIGlmICghd2luZG93Lm9wZW4odXJsKSkge1xuICAgICAgICAgIC8vIHBvcHVwIGJsb2NrZWQsIG9mZmVyIGRpcmVjdCBkb3dubG9hZDpcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb25maXJtKCdEaXNwbGF5aW5nIE5ldyBEb2N1bWVudFxcblxcblVzZSBTYXZlIEFzLi4uIHRvIGRvd25sb2FkLCB0aGVuIGNsaWNrIGJhY2sgdG8gcmV0dXJuIHRvIHRoaXMgcGFnZS4nKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICAvL2RvIGlmcmFtZSBkYXRhVVJMIGRvd25sb2FkIChvbGQgY2grRkYpOlxuICAgICAgdmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKVxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmKVxuXG4gICAgICBpZiAoIXdpbk1vZGUgJiYgL15kYXRhOi8udGVzdCh1cmwpKSB7XG4gICAgICAgIC8vIGZvcmNlIGEgbWltZSB0aGF0IHdpbGwgZG93bmxvYWQ6XG4gICAgICAgIHVybCA9ICdkYXRhOicgKyB1cmwucmVwbGFjZSgvXmRhdGE6KFtcXHdcXC9cXC1cXCtdKykvLCBkZWZhdWx0TWltZSlcbiAgICAgIH1cbiAgICAgIGYuc3JjID0gdXJsXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmKVxuICAgICAgfSwgMzMzKVxuICAgIH0gLy9lbmQgc2F2ZXJcblxuICAgIGlmIChuYXZpZ2F0b3IubXNTYXZlQmxvYikge1xuICAgICAgLy8gSUUxMCsgOiAoaGFzIEJsb2IsIGJ1dCBub3QgYVtkb3dubG9hZF0gb3IgVVJMKVxuICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVCbG9iKGJsb2IsIGZpbGVOYW1lKVxuICAgIH1cblxuICAgIGlmIChzZWxmLlVSTCkge1xuICAgICAgLy8gc2ltcGxlIGZhc3QgYW5kIG1vZGVybiB3YXkgdXNpbmcgQmxvYiBhbmQgVVJMOlxuICAgICAgc2F2ZXIoc2VsZi5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYW5kbGUgbm9uLUJsb2IoKStub24tVVJMIGJyb3dzZXJzOlxuICAgICAgaWYgKHR5cGVvZiBibG9iID09PSAnc3RyaW5nJyB8fCBibG9iLmNvbnN0cnVjdG9yID09PSB0b1N0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBzYXZlcignZGF0YTonICsgbWltZVR5cGUgKyAnO2Jhc2U2NCwnICsgc2VsZi5idG9hKGJsb2IpKVxuICAgICAgICB9IGNhdGNoICh5KSB7XG4gICAgICAgICAgcmV0dXJuIHNhdmVyKCdkYXRhOicgKyBtaW1lVHlwZSArICcsJyArIGVuY29kZVVSSUNvbXBvbmVudChibG9iKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCbG9iIGJ1dCBub3QgVVJMIHN1cHBvcnQ6XG4gICAgICByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgc2F2ZXIodGhpcy5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9IC8qIGVuZCBkb3dubG9hZCgpICovXG59KVxuIiwiOyhmdW5jdGlvbiAoYykge1xuICBmdW5jdGlvbiBhKGIsIGQpIHtcbiAgICBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChhLmNhY2hlLCBiKSkgcmV0dXJuIGEuY2FjaGVbYl1cbiAgICB2YXIgZSA9IGEucmVzb2x2ZShiKVxuICAgIGlmICghZSkgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcmVzb2x2ZSBtb2R1bGUgJyArIGIpXG4gICAgdmFyIGMgPSB7IGlkOiBiLCByZXF1aXJlOiBhLCBmaWxlbmFtZTogYiwgZXhwb3J0czoge30sIGxvYWRlZDogITEsIHBhcmVudDogZCwgY2hpbGRyZW46IFtdIH1cbiAgICBkICYmIGQuY2hpbGRyZW4ucHVzaChjKVxuICAgIHZhciBmID0gYi5zbGljZSgwLCBiLmxhc3RJbmRleE9mKCcvJykgKyAxKVxuICAgIHJldHVybiAoYS5jYWNoZVtiXSA9IGMuZXhwb3J0cyksIGUuY2FsbChjLmV4cG9ydHMsIGMsIGMuZXhwb3J0cywgZiwgYiksIChjLmxvYWRlZCA9ICEwKSwgKGEuY2FjaGVbYl0gPSBjLmV4cG9ydHMpXG4gIH1cbiAgOyhhLm1vZHVsZXMgPSB7fSksXG4gICAgKGEuY2FjaGUgPSB7fSksXG4gICAgKGEucmVzb2x2ZSA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICByZXR1cm4ge30uaGFzT3duUHJvcGVydHkuY2FsbChhLm1vZHVsZXMsIGIpID8gYS5tb2R1bGVzW2JdIDogdm9pZCAwXG4gICAgfSksXG4gICAgKGEuZGVmaW5lID0gZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgIGEubW9kdWxlc1tiXSA9IGNcbiAgICB9KVxuICB2YXIgYiA9IChmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAoXG4gICAgICAoYSA9ICcvJyksXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnYnJvd3NlcicsXG4gICAgICAgIHZlcnNpb246ICd2MC4xMC4yNicsXG4gICAgICAgIGJyb3dzZXI6ICEwLFxuICAgICAgICBlbnY6IHt9LFxuICAgICAgICBhcmd2OiBbXSxcbiAgICAgICAgbmV4dFRpY2s6XG4gICAgICAgICAgYy5zZXRJbW1lZGlhdGUgfHxcbiAgICAgICAgICBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChhLCAwKVxuICAgICAgICAgIH0sXG4gICAgICAgIGN3ZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhXG4gICAgICAgIH0sXG4gICAgICAgIGNoZGlyOiBmdW5jdGlvbiAoYikge1xuICAgICAgICAgIGEgPSBiXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKVxuICB9KSgpXG4gIGEuZGVmaW5lKCcvZ2lmLmNvZmZlZScsIGZ1bmN0aW9uIChkLCBtLCBsLCBrKSB7XG4gICAgZnVuY3Rpb24gZyhhLCBiKSB7XG4gICAgICByZXR1cm4ge30uaGFzT3duUHJvcGVydHkuY2FsbChhLCBiKVxuICAgIH1cbiAgICBmdW5jdGlvbiBqKGQsIGIpIHtcbiAgICAgIGZvciAodmFyIGEgPSAwLCBjID0gYi5sZW5ndGg7IGEgPCBjOyArK2EpIGlmIChhIGluIGIgJiYgYlthXSA9PT0gZCkgcmV0dXJuICEwXG4gICAgICByZXR1cm4gITFcbiAgICB9XG4gICAgZnVuY3Rpb24gaShhLCBiKSB7XG4gICAgICBmdW5jdGlvbiBkKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gYVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgYyBpbiBiKSBnKGIsIGMpICYmIChhW2NdID0gYltjXSlcbiAgICAgIHJldHVybiAoZC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSksIChhLnByb3RvdHlwZSA9IG5ldyBkKCkpLCAoYS5fX3N1cGVyX18gPSBiLnByb3RvdHlwZSksIGFcbiAgICB9XG4gICAgdmFyIGgsIGMsIGYsIGIsIGVcbiAgICA7KGYgPSBhKCdldmVudHMnLCBkKS5FdmVudEVtaXR0ZXIpLFxuICAgICAgKGggPSBhKCcvYnJvd3Nlci5jb2ZmZWUnLCBkKSksXG4gICAgICAoZSA9IChmdW5jdGlvbiAoZCkge1xuICAgICAgICBmdW5jdGlvbiBhKGQpIHtcbiAgICAgICAgICB2YXIgYSwgYlxuICAgICAgICAgIDsodGhpcy5ydW5uaW5nID0gITEpLFxuICAgICAgICAgICAgKHRoaXMub3B0aW9ucyA9IHt9KSxcbiAgICAgICAgICAgICh0aGlzLmZyYW1lcyA9IFtdKSxcbiAgICAgICAgICAgICh0aGlzLmZyZWVXb3JrZXJzID0gW10pLFxuICAgICAgICAgICAgKHRoaXMuYWN0aXZlV29ya2VycyA9IFtdKSxcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyhkKVxuICAgICAgICAgIGZvciAoYSBpbiBjKSAoYiA9IGNbYV0pLCBudWxsICE9IHRoaXMub3B0aW9uc1thXSA/IHRoaXMub3B0aW9uc1thXSA6ICh0aGlzLm9wdGlvbnNbYV0gPSBiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgaShhLCBkKSxcbiAgICAgICAgICAoYyA9IHtcbiAgICAgICAgICAgIHdvcmtlclNjcmlwdDogJ2dpZi53b3JrZXIuanMnLFxuICAgICAgICAgICAgd29ya2VyczogMixcbiAgICAgICAgICAgIHJlcGVhdDogMCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICAgICAgICAgIHF1YWxpdHk6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogbnVsbCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoYiA9IHsgZGVsYXk6IDUwMCwgY29weTogITEgfSksXG4gICAgICAgICAgKGEucHJvdG90eXBlLnNldE9wdGlvbiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAodGhpcy5vcHRpb25zW2FdID0gYiksXG4gICAgICAgICAgICAgIG51bGwgIT0gdGhpcy5fY2FudmFzICYmIChhID09PSAnd2lkdGgnIHx8IGEgPT09ICdoZWlnaHQnKSA/ICh0aGlzLl9jYW52YXNbYV0gPSBiKSA6IHZvaWQgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHZhciBhLCBjXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgZm9yIChhIGluIGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWcoYiwgYSkpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgOyhjID0gYlthXSksIGQucHVzaCh0aGlzLnNldE9wdGlvbihhLCBjKSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZFxuICAgICAgICAgICAgfS5jYWxsKHRoaXMsIFtdKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5hZGRGcmFtZSA9IGZ1bmN0aW9uIChhLCBkKSB7XG4gICAgICAgICAgICB2YXIgYywgZVxuICAgICAgICAgICAgbnVsbCA9PSBkICYmIChkID0ge30pLCAoYyA9IHt9KSwgKGMudHJhbnNwYXJlbnQgPSB0aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQpXG4gICAgICAgICAgICBmb3IgKGUgaW4gYikgY1tlXSA9IGRbZV0gfHwgYltlXVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAobnVsbCAhPSB0aGlzLm9wdGlvbnMud2lkdGggfHwgdGhpcy5zZXRPcHRpb24oJ3dpZHRoJywgYS53aWR0aCksXG4gICAgICAgICAgICAgIG51bGwgIT0gdGhpcy5vcHRpb25zLmhlaWdodCB8fCB0aGlzLnNldE9wdGlvbignaGVpZ2h0JywgYS5oZWlnaHQpLFxuICAgICAgICAgICAgICAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIEltYWdlRGF0YSAmJiBudWxsICE9IEltYWdlRGF0YSAmJiBhIGluc3RhbmNlb2YgSW1hZ2VEYXRhKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBjLmRhdGEgPSBhLmRhdGFcbiAgICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgICAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgJiZcbiAgICAgICAgICAgICAgICBudWxsICE9IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCAmJlxuICAgICAgICAgICAgICAgIGEgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHx8XG4gICAgICAgICAgICAgICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCAmJlxuICAgICAgICAgICAgICAgIG51bGwgIT0gV2ViR0xSZW5kZXJpbmdDb250ZXh0ICYmXG4gICAgICAgICAgICAgICAgYSBpbnN0YW5jZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dClcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgZC5jb3B5ID8gKGMuZGF0YSA9IHRoaXMuZ2V0Q29udGV4dERhdGEoYSkpIDogKGMuY29udGV4dCA9IGEpXG4gICAgICAgICAgICBlbHNlIGlmIChudWxsICE9IGEuY2hpbGROb2RlcykgZC5jb3B5ID8gKGMuZGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKGEpKSA6IChjLmltYWdlID0gYSlcbiAgICAgICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGltYWdlJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyYW1lcy5wdXNoKGMpXG4gICAgICAgICAgfSksXG4gICAgICAgICAgKGEucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkLCBhXG4gICAgICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgcnVubmluZycpXG4gICAgICAgICAgICBpZiAoIShudWxsICE9IHRoaXMub3B0aW9ucy53aWR0aCAmJiBudWxsICE9IHRoaXMub3B0aW9ucy5oZWlnaHQpKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gcmVuZGVyaW5nJylcbiAgICAgICAgICAgIDsodGhpcy5ydW5uaW5nID0gITApLFxuICAgICAgICAgICAgICAodGhpcy5uZXh0RnJhbWUgPSAwKSxcbiAgICAgICAgICAgICAgKHRoaXMuZmluaXNoZWRGcmFtZXMgPSAwKSxcbiAgICAgICAgICAgICAgKHRoaXMuaW1hZ2VQYXJ0cyA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICAgIHZhciBiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBiXG4gICAgICAgICAgICAgICAgICAgICAgYiA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIDAgPD0gdGhpcy5mcmFtZXMubGVuZ3RoID8gYSA8IHRoaXMuZnJhbWVzLmxlbmd0aCA6IGEgPiB0aGlzLmZyYW1lcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAwIDw9IHRoaXMuZnJhbWVzLmxlbmd0aCA/ICsrYSA6IC0tYVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGIucHVzaChhKVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiXG4gICAgICAgICAgICAgICAgICAgIH0uYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICAgICAgYSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGUgPSBiLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgIGEgPCBlO1xuICAgICAgICAgICAgICAgICAgKythXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKGQgPSBiW2FdKSwgYy5wdXNoKG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNcbiAgICAgICAgICAgICAgfS5jYWxsKHRoaXMsIFtdKSksXG4gICAgICAgICAgICAgIChhID0gdGhpcy5zcGF3bldvcmtlcnMoKSlcbiAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgIHZhciBjID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNcbiAgICAgICAgICAgICAgICAgIGMgPSBbXVxuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYiA9IDA7IDAgPD0gYSA/IGIgPCBhIDogYiA+IGE7IDAgPD0gYSA/ICsrYiA6IC0tYikgYy5wdXNoKGIpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gY1xuICAgICAgICAgICAgICAgIH0uYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICBiID0gMCxcbiAgICAgICAgICAgICAgICBlID0gYy5sZW5ndGg7XG4gICAgICAgICAgICAgIGIgPCBlO1xuICAgICAgICAgICAgICArK2JcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKGQgPSBjW2JdKSwgdGhpcy5yZW5kZXJOZXh0RnJhbWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdCgnc3RhcnQnKSwgdGhpcy5lbWl0KCdwcm9ncmVzcycsIDApXG4gICAgICAgICAgfSksXG4gICAgICAgICAgKGEucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFcbiAgICAgICAgICAgIHdoaWxlICghMCkge1xuICAgICAgICAgICAgICBpZiAoKChhID0gdGhpcy5hY3RpdmVXb3JrZXJzLnNoaWZ0KCkpLCAhKG51bGwgIT0gYSkpKSBicmVha1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygna2lsbGluZyBhY3RpdmUgd29ya2VyJyksIGEudGVybWluYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAodGhpcy5ydW5uaW5nID0gITEpLCB0aGlzLmVtaXQoJ2Fib3J0JylcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoYS5wcm90b3R5cGUuc3Bhd25Xb3JrZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIChhID0gTWF0aC5taW4odGhpcy5vcHRpb25zLndvcmtlcnMsIHRoaXMuZnJhbWVzLmxlbmd0aCkpLFxuICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNcbiAgICAgICAgICAgICAgICBjID0gW11cbiAgICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgICAgdmFyIGIgPSB0aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoIDw9IGEgPyBiIDwgYSA6IGIgPiBhO1xuICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlV29ya2Vycy5sZW5ndGggPD0gYSA/ICsrYiA6IC0tYlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIGMucHVzaChiKVxuICAgICAgICAgICAgICAgIHJldHVybiBjXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBiXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzcGF3bmluZyB3b3JrZXIgJyArIGMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGIgPSBuZXcgV29ya2VyKGEub3B0aW9ucy53b3JrZXJTY3JpcHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIChiLm9ubWVzc2FnZSA9IChmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5hY3RpdmVXb3JrZXJzLnNwbGljZShhLmFjdGl2ZVdvcmtlcnMuaW5kZXhPZihiKSwgMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmZyZWVXb3JrZXJzLnB1c2goYiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmZyYW1lRmluaXNoZWQoYy5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkoYSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYS5mcmVlV29ya2Vycy5wdXNoKGIpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSh0aGlzKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGFcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoYS5wcm90b3R5cGUuZnJhbWVGaW5pc2hlZCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZnJhbWUgJyArIGEuaW5kZXggKyAnIGZpbmlzaGVkIC0gJyArIHRoaXMuYWN0aXZlV29ya2Vycy5sZW5ndGggKyAnIGFjdGl2ZScpLFxuICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkRnJhbWVzKyssXG4gICAgICAgICAgICAgIHRoaXMuZW1pdCgncHJvZ3Jlc3MnLCB0aGlzLmZpbmlzaGVkRnJhbWVzIC8gdGhpcy5mcmFtZXMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgKHRoaXMuaW1hZ2VQYXJ0c1thLmluZGV4XSA9IGEpLFxuICAgICAgICAgICAgICBqKG51bGwsIHRoaXMuaW1hZ2VQYXJ0cykgPyB0aGlzLnJlbmRlck5leHRGcmFtZSgpIDogdGhpcy5maW5pc2hSZW5kZXJpbmcoKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5maW5pc2hSZW5kZXJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZSwgYSwgaywgbSwgYiwgZCwgaFxuICAgICAgICAgICAgYiA9IDBcbiAgICAgICAgICAgIGZvciAodmFyIGYgPSAwLCBqID0gdGhpcy5pbWFnZVBhcnRzLmxlbmd0aDsgZiA8IGo7ICsrZilcbiAgICAgICAgICAgICAgKGEgPSB0aGlzLmltYWdlUGFydHNbZl0pLCAoYiArPSAoYS5kYXRhLmxlbmd0aCAtIDEpICogYS5wYWdlU2l6ZSArIGEuY3Vyc29yKVxuICAgICAgICAgICAgOyhiICs9IGEucGFnZVNpemUgLSBhLmN1cnNvciksXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcgZmluaXNoZWQgLSBmaWxlc2l6ZSAnICsgTWF0aC5yb3VuZChiIC8gMWUzKSArICdrYicpLFxuICAgICAgICAgICAgICAoZSA9IG5ldyBVaW50OEFycmF5KGIpKSxcbiAgICAgICAgICAgICAgKGQgPSAwKVxuICAgICAgICAgICAgZm9yICh2YXIgZyA9IDAsIGwgPSB0aGlzLmltYWdlUGFydHMubGVuZ3RoOyBnIDwgbDsgKytnKSB7XG4gICAgICAgICAgICAgIGEgPSB0aGlzLmltYWdlUGFydHNbZ11cbiAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDAsIGkgPSBhLmRhdGEubGVuZ3RoOyBjIDwgaTsgKytjKVxuICAgICAgICAgICAgICAgIChoID0gYS5kYXRhW2NdKSwgKGsgPSBjKSwgZS5zZXQoaCwgZCksIGsgPT09IGEuZGF0YS5sZW5ndGggLSAxID8gKGQgKz0gYS5jdXJzb3IpIDogKGQgKz0gYS5wYWdlU2l6ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAobSA9IG5ldyBCbG9iKFtlXSwgeyB0eXBlOiAnaW1hZ2UvZ2lmJyB9KSksIHRoaXMuZW1pdCgnZmluaXNoZWQnLCBtLCBlKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5yZW5kZXJOZXh0RnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYywgYSwgYlxuICAgICAgICAgICAgaWYgKHRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ05vIGZyZWUgd29ya2VycycpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0RnJhbWUgPj0gdGhpcy5mcmFtZXMubGVuZ3RoXG4gICAgICAgICAgICAgID8gdm9pZCAwXG4gICAgICAgICAgICAgIDogKChjID0gdGhpcy5mcmFtZXNbdGhpcy5uZXh0RnJhbWUrK10pLFxuICAgICAgICAgICAgICAgIChiID0gdGhpcy5mcmVlV29ya2Vycy5zaGlmdCgpKSxcbiAgICAgICAgICAgICAgICAoYSA9IHRoaXMuZ2V0VGFzayhjKSksXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIGZyYW1lICcgKyAoYS5pbmRleCArIDEpICsgJyBvZiAnICsgdGhpcy5mcmFtZXMubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVdvcmtlcnMucHVzaChiKSxcbiAgICAgICAgICAgICAgICBiLnBvc3RNZXNzYWdlKGEpKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIChhLnByb3RvdHlwZS5nZXRDb250ZXh0RGF0YSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5vcHRpb25zLndpZHRoLCB0aGlzLm9wdGlvbnMuaGVpZ2h0KS5kYXRhXG4gICAgICAgICAgfSksXG4gICAgICAgICAgKGEucHJvdG90eXBlLmdldEltYWdlRGF0YSA9IGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICB2YXIgYVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgbnVsbCAhPSB0aGlzLl9jYW52YXMgfHxcbiAgICAgICAgICAgICAgICAoKHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpKSxcbiAgICAgICAgICAgICAgICAodGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoKSxcbiAgICAgICAgICAgICAgICAodGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMub3B0aW9ucy5oZWlnaHQpKSxcbiAgICAgICAgICAgICAgKGEgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSksXG4gICAgICAgICAgICAgIChhLnNldEZpbGwgPSB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZCksXG4gICAgICAgICAgICAgIGEuZmlsbFJlY3QoMCwgMCwgdGhpcy5vcHRpb25zLndpZHRoLCB0aGlzLm9wdGlvbnMuaGVpZ2h0KSxcbiAgICAgICAgICAgICAgYS5kcmF3SW1hZ2UoYiwgMCwgMCksXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q29udGV4dERhdGEoYSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAoYS5wcm90b3R5cGUuZ2V0VGFzayA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICB2YXIgYywgYlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoKGMgPSB0aGlzLmZyYW1lcy5pbmRleE9mKGEpKSxcbiAgICAgICAgICAgICAgKGIgPSB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGMsXG4gICAgICAgICAgICAgICAgbGFzdDogYyA9PT0gdGhpcy5mcmFtZXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICBkZWxheTogYS5kZWxheSxcbiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogYS50cmFuc3BhcmVudCxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5vcHRpb25zLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLmhlaWdodCxcbiAgICAgICAgICAgICAgICBxdWFsaXR5OiB0aGlzLm9wdGlvbnMucXVhbGl0eSxcbiAgICAgICAgICAgICAgICByZXBlYXQ6IHRoaXMub3B0aW9ucy5yZXBlYXQsXG4gICAgICAgICAgICAgICAgY2FuVHJhbnNmZXI6IGgubmFtZSA9PT0gJ2Nocm9tZScsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBudWxsICE9IGEuZGF0YSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgYi5kYXRhID0gYS5kYXRhXG4gICAgICAgICAgICBlbHNlIGlmIChudWxsICE9IGEuY29udGV4dCkgYi5kYXRhID0gdGhpcy5nZXRDb250ZXh0RGF0YShhLmNvbnRleHQpXG4gICAgICAgICAgICBlbHNlIGlmIChudWxsICE9IGEuaW1hZ2UpIGIuZGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKGEuaW1hZ2UpXG4gICAgICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcmFtZScpXG4gICAgICAgICAgICByZXR1cm4gYlxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGFcbiAgICAgICAgKVxuICAgICAgfSkoZikpLFxuICAgICAgKGQuZXhwb3J0cyA9IGUpXG4gIH0pLFxuICAgIGEuZGVmaW5lKCcvYnJvd3Nlci5jb2ZmZWUnLCBmdW5jdGlvbiAoZiwgZywgaCwgaSkge1xuICAgICAgdmFyIGEsIGQsIGUsIGMsIGJcbiAgICAgIDsoYyA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSksXG4gICAgICAgIChlID0gbmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpLFxuICAgICAgICAoYiA9IGMubWF0Y2goLyhvcGVyYXxpZXxmaXJlZm94fGNocm9tZXx2ZXJzaW9uKVtcXHNcXC86XShbXFx3XFxkXFwuXSspPy4qPyhzYWZhcml8dmVyc2lvbltcXHNcXC86XShbXFx3XFxkXFwuXSspfCQpLykgfHwgW1xuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgJ3Vua25vd24nLFxuICAgICAgICAgIDAsXG4gICAgICAgIF0pLFxuICAgICAgICAoZCA9IGJbMV0gPT09ICdpZScgJiYgZG9jdW1lbnQuZG9jdW1lbnRNb2RlKSxcbiAgICAgICAgKGEgPSB7XG4gICAgICAgICAgbmFtZTogYlsxXSA9PT0gJ3ZlcnNpb24nID8gYlszXSA6IGJbMV0sXG4gICAgICAgICAgdmVyc2lvbjogZCB8fCBwYXJzZUZsb2F0KGJbMV0gPT09ICdvcGVyYScgJiYgYls0XSA/IGJbNF0gOiBiWzJdKSxcbiAgICAgICAgICBwbGF0Zm9ybToge1xuICAgICAgICAgICAgbmFtZTogYy5tYXRjaCgvaXAoPzphZHxvZHxob25lKS8pXG4gICAgICAgICAgICAgID8gJ2lvcydcbiAgICAgICAgICAgICAgOiAoYy5tYXRjaCgvKD86d2Vib3N8YW5kcm9pZCkvKSB8fCBlLm1hdGNoKC9tYWN8d2lufGxpbnV4LykgfHwgWydvdGhlciddKVswXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgKGFbYS5uYW1lXSA9ICEwKSxcbiAgICAgICAgKGFbYS5uYW1lICsgcGFyc2VJbnQoYS52ZXJzaW9uLCAxMCldID0gITApLFxuICAgICAgICAoYS5wbGF0Zm9ybVthLnBsYXRmb3JtLm5hbWVdID0gITApLFxuICAgICAgICAoZi5leHBvcnRzID0gYSlcbiAgICB9KSxcbiAgICBhLmRlZmluZSgnZXZlbnRzJywgZnVuY3Rpb24gKGYsIGUsIGcsIGgpIHtcbiAgICAgIGIuRXZlbnRFbWl0dGVyIHx8IChiLkV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uICgpIHt9KVxuICAgICAgdmFyIGEgPSAoZS5FdmVudEVtaXR0ZXIgPSBiLkV2ZW50RW1pdHRlciksXG4gICAgICAgIGMgPVxuICAgICAgICAgIHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IEFycmF5LmlzQXJyYXlcbiAgICAgICAgICAgIDogZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpID09PSAnW29iamVjdCBBcnJheV0nXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgIGQgPSAxMFxuICAgICAgOyhhLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KSwgKHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgPSBhKVxuICAgICAgfSksXG4gICAgICAgIChhLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBmID09PSAnZXJyb3InICYmXG4gICAgICAgICAgICAoISh0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzLmVycm9yKSB8fCAoYyh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSlcbiAgICAgICAgICApXG4gICAgICAgICAgICB0aHJvdyBhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBFcnJvciA/IGFyZ3VtZW50c1sxXSA6IG5ldyBFcnJvcihcIlVuY2F1Z2h0LCB1bnNwZWNpZmllZCAnZXJyb3InIGV2ZW50LlwiKVxuICAgICAgICAgIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gITFcbiAgICAgICAgICB2YXIgYSA9IHRoaXMuX2V2ZW50c1tmXVxuICAgICAgICAgIGlmICghYSkgcmV0dXJuICExXG4gICAgICAgICAgaWYgKCEodHlwZW9mIGEgPT0gJ2Z1bmN0aW9uJykpXG4gICAgICAgICAgICBpZiAoYyhhKSkge1xuICAgICAgICAgICAgICB2YXIgYiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICAgICAgZSA9IGEuc2xpY2UoKVxuICAgICAgICAgICAgICBmb3IgKHZhciBkID0gMCwgZyA9IGUubGVuZ3RoOyBkIDwgZzsgZCsrKSBlW2RdLmFwcGx5KHRoaXMsIGIpXG4gICAgICAgICAgICAgIHJldHVybiAhMFxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiAhMVxuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBhLmNhbGwodGhpcylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgYS5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgYS5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdmFyIGIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgICAgICAgICAgIGEuYXBwbHkodGhpcywgYilcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICEwXG4gICAgICAgIH0pLFxuICAgICAgICAoYS5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgYikgdGhyb3cgbmV3IEVycm9yKCdhZGRMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpXG4gICAgICAgICAgaWYgKCh0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KSwgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIGEsIGIpLCAhdGhpcy5fZXZlbnRzW2FdKSlcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50c1thXSA9IGJcbiAgICAgICAgICBlbHNlIGlmIChjKHRoaXMuX2V2ZW50c1thXSkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZXZlbnRzW2FdLndhcm5lZCkge1xuICAgICAgICAgICAgICB2YXIgZVxuICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzICE9PSB1bmRlZmluZWQgPyAoZSA9IHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMpIDogKGUgPSBkKSxcbiAgICAgICAgICAgICAgICBlICYmXG4gICAgICAgICAgICAgICAgICBlID4gMCAmJlxuICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW2FdLmxlbmd0aCA+IGUgJiZcbiAgICAgICAgICAgICAgICAgICgodGhpcy5fZXZlbnRzW2FdLndhcm5lZCA9ICEwKSxcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1thXS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLnRyYWNlKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9ldmVudHNbYV0ucHVzaChiKVxuICAgICAgICAgIH0gZWxzZSB0aGlzLl9ldmVudHNbYV0gPSBbdGhpcy5fZXZlbnRzW2FdLCBiXVxuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0pLFxuICAgICAgICAoYS5wcm90b3R5cGUub24gPSBhLnByb3RvdHlwZS5hZGRMaXN0ZW5lciksXG4gICAgICAgIChhLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgICAgICB2YXIgYSA9IHRoaXNcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYS5vbihiLCBmdW5jdGlvbiBkKCkge1xuICAgICAgICAgICAgICBhLnJlbW92ZUxpc3RlbmVyKGIsIGQpLCBjLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGhpc1xuICAgICAgICAgIClcbiAgICAgICAgfSksXG4gICAgICAgIChhLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChhLCBkKSB7XG4gICAgICAgICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBkKSB0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUxpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJylcbiAgICAgICAgICBpZiAoISh0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzW2FdKSkgcmV0dXJuIHRoaXNcbiAgICAgICAgICB2YXIgYiA9IHRoaXMuX2V2ZW50c1thXVxuICAgICAgICAgIGlmIChjKGIpKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGIuaW5kZXhPZihkKVxuICAgICAgICAgICAgaWYgKGUgPCAwKSByZXR1cm4gdGhpc1xuICAgICAgICAgICAgYi5zcGxpY2UoZSwgMSksIGIubGVuZ3RoID09IDAgJiYgZGVsZXRlIHRoaXMuX2V2ZW50c1thXVxuICAgICAgICAgIH0gZWxzZSB0aGlzLl9ldmVudHNbYV0gPT09IGQgJiYgZGVsZXRlIHRoaXMuX2V2ZW50c1thXVxuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0pLFxuICAgICAgICAoYS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICByZXR1cm4gYSAmJiB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzW2FdICYmICh0aGlzLl9ldmVudHNbYV0gPSBudWxsKSwgdGhpc1xuICAgICAgICB9KSxcbiAgICAgICAgKGEucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pLFxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzW2FdIHx8ICh0aGlzLl9ldmVudHNbYV0gPSBbXSksXG4gICAgICAgICAgICBjKHRoaXMuX2V2ZW50c1thXSkgfHwgKHRoaXMuX2V2ZW50c1thXSA9IFt0aGlzLl9ldmVudHNbYV1dKSxcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50c1thXVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICB9KSxcbiAgICAoYy5HSUYgPSBhKCcvZ2lmLmNvZmZlZScpKVxufS5jYWxsKHRoaXMsIHRoaXMpKVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2lmLmpzLm1hcFxuLy8gZ2lmLmpzIDAuMS42IC0gaHR0cHM6Ly9naXRodWIuY29tL2pub3JkYmVyZy9naWYuanNcbiIsIi8qKlxuICogQSB0b29sIGZvciBwcmVzZW50aW5nIGFuIEFycmF5QnVmZmVyIGFzIGEgc3RyZWFtIGZvciB3cml0aW5nIHNvbWUgc2ltcGxlIGRhdGEgdHlwZXMuXG4gKlxuICogQnkgTmljaG9sYXMgU2hlcmxvY2tcbiAqXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgV1RGUEx2MiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XVEZQTFxuICovXG5cbid1c2Ugc3RyaWN0J1xuOyhmdW5jdGlvbiAoKSB7XG4gIHZhciBpc05vZGVFbnZpcm9tZW50ID0gdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzICE9PSAndW5kZWZpbmVkJ1xuXG4gIFxuICAvKlxuICAgKiBDcmVhdGUgYW4gQXJyYXlCdWZmZXIgb2YgdGhlIGdpdmVuIGxlbmd0aCBhbmQgcHJlc2VudCBpdCBhcyBhIHdyaXRhYmxlIHN0cmVhbSB3aXRoIG1ldGhvZHNcbiAgICogZm9yIHdyaXRpbmcgZGF0YSBpbiBkaWZmZXJlbnQgZm9ybWF0cy5cbiAgICovXG5cbiAgdmFyIEFycmF5QnVmZmVyRGF0YVN0cmVhbSA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICB0aGlzLmRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhpcy5wb3MgPSAwXG4gIH1cblxuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLnNlZWsgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgdGhpcy5wb3MgPSBvZmZzZXRcbiAgfVxuXG4gIEFycmF5QnVmZmVyRGF0YVN0cmVhbS5wcm90b3R5cGUud3JpdGVCeXRlcyA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5kYXRhW3RoaXMucG9zKytdID0gYXJyW2ldXG4gICAgfVxuICB9XG5cbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZUJ5dGUgPSBmdW5jdGlvbiAoYikge1xuICAgIHRoaXMuZGF0YVt0aGlzLnBvcysrXSA9IGJcbiAgfVxuXG4gIC8vU3lub255bTpcbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZVU4ID0gQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZUJ5dGVcblxuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLndyaXRlVTE2QkUgPSBmdW5jdGlvbiAodSkge1xuICAgIHRoaXMuZGF0YVt0aGlzLnBvcysrXSA9IHUgPj4gOFxuICAgIHRoaXMuZGF0YVt0aGlzLnBvcysrXSA9IHVcbiAgfVxuXG4gIEFycmF5QnVmZmVyRGF0YVN0cmVhbS5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIChkKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobmV3IEZsb2F0NjRBcnJheShbZF0pLmJ1ZmZlcilcblxuICAgIGZvciAodmFyIGkgPSBieXRlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdGhpcy53cml0ZUJ5dGUoYnl0ZXNbaV0pXG4gICAgfVxuICB9XG5cbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAoZCkge1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KG5ldyBGbG9hdDMyQXJyYXkoW2RdKS5idWZmZXIpXG5cbiAgICBmb3IgKHZhciBpID0gYnl0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRoaXMud3JpdGVCeXRlKGJ5dGVzW2ldKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSBhbiBBU0NJSSBzdHJpbmcgdG8gdGhlIHN0cmVhbVxuICAgKi9cbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZVN0cmluZyA9IGZ1bmN0aW9uIChzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPSBzLmNoYXJDb2RlQXQoaSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JpdGUgdGhlIGdpdmVuIDMyLWJpdCBpbnRlZ2VyIHRvIHRoZSBzdHJlYW0gYXMgYW4gRUJNTCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciB1c2luZyB0aGUgZ2l2ZW4gYnl0ZSB3aWR0aFxuICAgKiAodXNlIG1lYXN1cmVFQk1MVmFySW50KS5cbiAgICpcbiAgICogTm8gZXJyb3IgY2hlY2tpbmcgaXMgcGVyZm9ybWVkIHRvIGVuc3VyZSB0aGF0IHRoZSBzdXBwbGllZCB3aWR0aCBpcyBjb3JyZWN0IGZvciB0aGUgaW50ZWdlci5cbiAgICpcbiAgICogQHBhcmFtIGkgSW50ZWdlciB0byBiZSB3cml0dGVuXG4gICAqIEBwYXJhbSB3aWR0aCBOdW1iZXIgb2YgYnl0ZXMgdG8gd3JpdGUgdG8gdGhlIHN0cmVhbVxuICAgKi9cbiAgQXJyYXlCdWZmZXJEYXRhU3RyZWFtLnByb3RvdHlwZS53cml0ZUVCTUxWYXJJbnRXaWR0aCA9IGZ1bmN0aW9uIChpLCB3aWR0aCkge1xuICAgIHN3aXRjaCAod2lkdGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy53cml0ZVU4KCgxIDw8IDcpIHwgaSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy53cml0ZVU4KCgxIDw8IDYpIHwgKGkgPj4gOCkpXG4gICAgICAgIHRoaXMud3JpdGVVOChpKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLndyaXRlVTgoKDEgPDwgNSkgfCAoaSA+PiAxNikpXG4gICAgICAgIHRoaXMud3JpdGVVOChpID4+IDgpXG4gICAgICAgIHRoaXMud3JpdGVVOChpKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA0OlxuICAgICAgICB0aGlzLndyaXRlVTgoKDEgPDwgNCkgfCAoaSA+PiAyNCkpXG4gICAgICAgIHRoaXMud3JpdGVVOChpID4+IDE2KVxuICAgICAgICB0aGlzLndyaXRlVTgoaSA+PiA4KVxuICAgICAgICB0aGlzLndyaXRlVTgoaSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgLypcbiAgICAgICAgICogSmF2YVNjcmlwdCBjb252ZXJ0cyBpdHMgZG91YmxlcyB0byAzMi1iaXQgaW50ZWdlcnMgZm9yIGJpdHdpc2Ugb3BlcmF0aW9ucywgc28gd2UgbmVlZCB0byBkbyBhXG4gICAgICAgICAqIGRpdmlzaW9uIGJ5IDJeMzIgaW5zdGVhZCBvZiBhIHJpZ2h0LXNoaWZ0IG9mIDMyIHRvIHJldGFpbiB0aG9zZSB0b3AgMyBiaXRzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndyaXRlVTgoKDEgPDwgMykgfCAoKGkgLyA0Mjk0OTY3Mjk2KSAmIDB4NykpXG4gICAgICAgIHRoaXMud3JpdGVVOChpID4+IDI0KVxuICAgICAgICB0aGlzLndyaXRlVTgoaSA+PiAxNilcbiAgICAgICAgdGhpcy53cml0ZVU4KGkgPj4gOClcbiAgICAgICAgdGhpcy53cml0ZVU4KGkpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgUnVudGltZUV4Y2VwdGlvbignQmFkIEVCTUwgVklOVCBzaXplICcgKyB3aWR0aClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIGVuY29kZSB0aGUgZ2l2ZW4gaW50ZWdlciBhcyBhbiBFQk1MIFZJTlQuXG4gICAqL1xuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLm1lYXN1cmVFQk1MVmFySW50ID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIGlmICh2YWwgPCAoMSA8PCA3KSAtIDEpIHtcbiAgICAgIC8qIFRvcCBiaXQgaXMgc2V0LCBsZWF2aW5nIDcgYml0cyB0byBob2xkIHRoZSBpbnRlZ2VyLCBidXQgd2UgY2FuJ3Qgc3RvcmUgMTI3IGJlY2F1c2VcbiAgICAgICAqIFwiYWxsIGJpdHMgc2V0IHRvIG9uZVwiIGlzIGEgcmVzZXJ2ZWQgdmFsdWUuIFNhbWUgdGhpbmcgZm9yIHRoZSBvdGhlciBjYXNlcyBiZWxvdzpcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2UgaWYgKHZhbCA8ICgxIDw8IDE0KSAtIDEpIHtcbiAgICAgIHJldHVybiAyXG4gICAgfSBlbHNlIGlmICh2YWwgPCAoMSA8PCAyMSkgLSAxKSB7XG4gICAgICByZXR1cm4gM1xuICAgIH0gZWxzZSBpZiAodmFsIDwgKDEgPDwgMjgpIC0gMSkge1xuICAgICAgcmV0dXJuIDRcbiAgICB9IGVsc2UgaWYgKHZhbCA8IDM0MzU5NzM4MzY3KSB7XG4gICAgICAvLyAyIF4gMzUgLSAxIChjYW4gYWRkcmVzcyAzMkdCKVxuICAgICAgcmV0dXJuIDVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFeGNlcHRpb24oJ0VCTUwgVklOVCBzaXplIG5vdCBzdXBwb3J0ZWQgJyArIHZhbClcbiAgICB9XG4gIH1cblxuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLndyaXRlRUJNTFZhckludCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgdGhpcy53cml0ZUVCTUxWYXJJbnRXaWR0aChpLCB0aGlzLm1lYXN1cmVFQk1MVmFySW50KGkpKVxuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlIHRoZSBnaXZlbiB1bnNpZ25lZCAzMi1iaXQgaW50ZWdlciB0byB0aGUgc3RyZWFtIGluIGJpZy1lbmRpYW4gb3JkZXIgdXNpbmcgdGhlIGdpdmVuIGJ5dGUgd2lkdGguXG4gICAqIE5vIGVycm9yIGNoZWNraW5nIGlzIHBlcmZvcm1lZCB0byBlbnN1cmUgdGhhdCB0aGUgc3VwcGxpZWQgd2lkdGggaXMgY29ycmVjdCBmb3IgdGhlIGludGVnZXIuXG4gICAqXG4gICAqIE9taXQgdGhlIHdpZHRoIHBhcmFtZXRlciB0byBoYXZlIGl0IGRldGVybWluZWQgYXV0b21hdGljYWxseSBmb3IgeW91LlxuICAgKlxuICAgKiBAcGFyYW0gdSBVbnNpZ25lZCBpbnRlZ2VyIHRvIGJlIHdyaXR0ZW5cbiAgICogQHBhcmFtIHdpZHRoIE51bWJlciBvZiBieXRlcyB0byB3cml0ZSB0byB0aGUgc3RyZWFtXG4gICAqL1xuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLndyaXRlVW5zaWduZWRJbnRCRSA9IGZ1bmN0aW9uICh1LCB3aWR0aCkge1xuICAgIGlmICh3aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB3aWR0aCA9IHRoaXMubWVhc3VyZVVuc2lnbmVkSW50KHUpXG4gICAgfVxuXG4gICAgLy8gRWFjaCBjYXNlIGZhbGxzIHRocm91Z2g6XG4gICAgc3dpdGNoICh3aWR0aCkge1xuICAgICAgY2FzZSA1OlxuICAgICAgICB0aGlzLndyaXRlVTgoTWF0aC5mbG9vcih1IC8gNDI5NDk2NzI5NikpIC8vIE5lZWQgdG8gdXNlIGRpdmlzaW9uIHRvIGFjY2VzcyA+MzIgYml0cyBvZiBmbG9hdGluZyBwb2ludCB2YXJcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy53cml0ZVU4KHUgPj4gMjQpXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMud3JpdGVVOCh1ID4+IDE2KVxuICAgICAgY2FzZSAyOlxuICAgICAgICB0aGlzLndyaXRlVTgodSA+PiA4KVxuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLndyaXRlVTgodSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBSdW50aW1lRXhjZXB0aW9uKCdCYWQgVUlOVCBzaXplICcgKyB3aWR0aClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBudW1iZXIgb2YgYnl0ZXMgbmVlZGVkIHRvIGhvbGQgdGhlIG5vbi16ZXJvIGJpdHMgb2YgdGhlIGdpdmVuIHVuc2lnbmVkIGludGVnZXIuXG4gICAqL1xuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLm1lYXN1cmVVbnNpZ25lZEludCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAvLyBGb3JjZSB0byAzMi1iaXQgdW5zaWduZWQgaW50ZWdlclxuICAgIGlmICh2YWwgPCAxIDw8IDgpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfSBlbHNlIGlmICh2YWwgPCAxIDw8IDE2KSB7XG4gICAgICByZXR1cm4gMlxuICAgIH0gZWxzZSBpZiAodmFsIDwgMSA8PCAyNCkge1xuICAgICAgcmV0dXJuIDNcbiAgICB9IGVsc2UgaWYgKHZhbCA8IDQyOTQ5NjcyOTYpIHtcbiAgICAgIHJldHVybiA0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiA1XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHZpZXcgb24gdGhlIHBvcnRpb24gb2YgdGhlIGJ1ZmZlciBmcm9tIHRoZSBiZWdpbm5pbmcgdG8gdGhlIGN1cnJlbnQgc2VlayBwb3NpdGlvbiBhcyBhIFVpbnQ4QXJyYXkuXG4gICAqL1xuICBBcnJheUJ1ZmZlckRhdGFTdHJlYW0ucHJvdG90eXBlLmdldEFzRGF0YUFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnBvcyA8IHRoaXMuZGF0YS5ieXRlTGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhLnN1YmFycmF5KDAsIHRoaXMucG9zKVxuICAgIH0gZWxzZSBpZiAodGhpcy5wb3MgPT0gdGhpcy5kYXRhLmJ5dGVMZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgXCJBcnJheUJ1ZmZlckRhdGFTdHJlYW0ncyBwb3MgbGllcyBiZXlvbmQgZW5kIG9mIGJ1ZmZlclwiXG4gICAgfVxuICB9XG5cbiAgd2luZG93LkFycmF5QnVmZmVyRGF0YVN0cmVhbSA9IEFycmF5QnVmZmVyRGF0YVN0cmVhbVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgYSBzZXJpZXMgb2YgQmxvYi1jb252ZXJ0aWJsZSBvYmplY3RzIChBcnJheUJ1ZmZlciwgQmxvYiwgU3RyaW5nLCBldGMpIHRvIGJlIGFkZGVkIHRvIGEgYnVmZmVyLiBTZWVraW5nIGFuZFxuICAgKiBvdmVyd3JpdGluZyBvZiBibG9icyBpcyBhbGxvd2VkLlxuICAgKlxuICAgKiBZb3UgY2FuIHN1cHBseSBhIEZpbGVXcml0ZXIsIGluIHdoaWNoIGNhc2UgdGhlIEJsb2JCdWZmZXIgaXMganVzdCB1c2VkIGFzIHRlbXBvcmFyeSBzdG9yYWdlIGJlZm9yZSBpdCB3cml0ZXMgaXRcbiAgICogdGhyb3VnaCB0byB0aGUgZGlzay5cbiAgICpcbiAgICogQnkgTmljaG9sYXMgU2hlcmxvY2tcbiAgICpcbiAgICogUmVsZWFzZWQgdW5kZXIgdGhlIFdURlBMdjIgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV1RGUExcbiAgICovXG5cbiAgdmFyIEJsb2JCdWZmZXIgPSAoZnVuY3Rpb24gKGZzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkZXN0aW5hdGlvbikge1xuICAgICAgdmFyIGJ1ZmZlciA9IFtdLFxuICAgICAgICB3cml0ZVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKSxcbiAgICAgICAgZmlsZVdyaXRlciA9IG51bGwsXG4gICAgICAgIGZkID0gbnVsbFxuXG4gICAgICBpZiAodHlwZW9mIEZpbGVXcml0ZXIgIT09ICd1bmRlZmluZWQnICYmIGRlc3RpbmF0aW9uIGluc3RhbmNlb2YgRmlsZVdyaXRlcikge1xuICAgICAgICBmaWxlV3JpdGVyID0gZGVzdGluYXRpb25cbiAgICAgIH0gZWxzZSBpZiAoZnMgJiYgZGVzdGluYXRpb24pIHtcbiAgICAgICAgZmQgPSBkZXN0aW5hdGlvblxuICAgICAgfVxuXG4gICAgICAvLyBDdXJyZW50IHNlZWsgb2Zmc2V0XG4gICAgICB0aGlzLnBvcyA9IDBcblxuICAgICAgLy8gT25lIG1vcmUgdGhhbiB0aGUgaW5kZXggb2YgdGhlIGhpZ2hlc3QgYnl0ZSBldmVyIHdyaXR0ZW5cbiAgICAgIHRoaXMubGVuZ3RoID0gMFxuXG4gICAgICAvLyBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGNvbnZlcnRzIHRoZSBibG9iIHRvIGFuIEFycmF5QnVmZmVyXG4gICAgICBmdW5jdGlvbiByZWFkQmxvYkFzQnVmZmVyKGJsb2IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXG4gICAgICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjb252ZXJ0VG9VaW50OEFycmF5KHRoaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaWYgKHRoaW5nIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGluZylcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgQXJyYXlCdWZmZXIuaXNWaWV3KHRoaW5nKSkge1xuICAgICAgICAgICAgcmVzb2x2ZShuZXcgVWludDhBcnJheSh0aGluZykpXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGluZyBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICAgIHJlYWRCbG9iQXNCdWZmZXIodGhpbmcpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWZmZXIpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vQXNzdW1lIHRoYXQgQmxvYiB3aWxsIGtub3cgaG93IHRvIHJlYWQgdGhpcyB0aGluZ1xuICAgICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgICAgcmVhZEJsb2JBc0J1ZmZlcihuZXcgQmxvYihbdGhpbmddKSkudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlcilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1lYXN1cmVEYXRhKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGRhdGEuYnl0ZUxlbmd0aCB8fCBkYXRhLmxlbmd0aCB8fCBkYXRhLnNpemVcblxuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIocmVzdWx0KSkge1xuICAgICAgICAgIHRocm93ICdGYWlsZWQgdG8gZGV0ZXJtaW5lIHNpemUgb2YgZWxlbWVudCdcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBTZWVrIHRvIHRoZSBnaXZlbiBhYnNvbHV0ZSBvZmZzZXQuXG4gICAgICAgKlxuICAgICAgICogWW91IG1heSBub3Qgc2VlayBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgZmlsZSAodGhpcyB3b3VsZCBjcmVhdGUgYSBob2xlIGFuZC9vciBhbGxvdyBibG9ja3MgdG8gYmUgd3JpdHRlbiBpbiBub24tXG4gICAgICAgKiBzZXF1ZW50aWFsIG9yZGVyLCB3aGljaCBpc24ndCBjdXJyZW50bHkgc3VwcG9ydGVkIGJ5IHRoZSBtZW1vcnkgYnVmZmVyIGJhY2tlbmQpLlxuICAgICAgICovXG4gICAgICB0aGlzLnNlZWsgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgdGhyb3cgJ09mZnNldCBtYXkgbm90IGJlIG5lZ2F0aXZlJ1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKG9mZnNldCkpIHtcbiAgICAgICAgICB0aHJvdyAnT2Zmc2V0IG1heSBub3QgYmUgTmFOJ1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgJ1NlZWtpbmcgYmV5b25kIHRoZSBlbmQgb2YgZmlsZSBpcyBub3QgYWxsb3dlZCdcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9zID0gb2Zmc2V0XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogV3JpdGUgdGhlIEJsb2ItY29udmVydGlibGUgZGF0YSB0byB0aGUgYnVmZmVyIGF0IHRoZSBjdXJyZW50IHNlZWsgcG9zaXRpb24uXG4gICAgICAgKlxuICAgICAgICogTm90ZTogSWYgb3ZlcndyaXRpbmcgZXhpc3RpbmcgZGF0YSwgdGhlIHdyaXRlIG11c3Qgbm90IGNyb3NzIHByZWV4aXN0aW5nIGJsb2NrIGJvdW5kYXJpZXMgKHdyaXR0ZW4gZGF0YSBtdXN0XG4gICAgICAgKiBiZSBmdWxseSBjb250YWluZWQgYnkgdGhlIGV4dGVudCBvZiBhIHByZXZpb3VzIHdyaXRlKS5cbiAgICAgICAqL1xuICAgICAgdGhpcy53cml0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBuZXdFbnRyeSA9IHtcbiAgICAgICAgICAgIG9mZnNldDogdGhpcy5wb3MsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgbGVuZ3RoOiBtZWFzdXJlRGF0YShkYXRhKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzQXBwZW5kID0gbmV3RW50cnkub2Zmc2V0ID49IHRoaXMubGVuZ3RoXG5cbiAgICAgICAgdGhpcy5wb3MgKz0gbmV3RW50cnkubGVuZ3RoXG4gICAgICAgIHRoaXMubGVuZ3RoID0gTWF0aC5tYXgodGhpcy5sZW5ndGgsIHRoaXMucG9zKVxuXG4gICAgICAgIC8vIEFmdGVyIHByZXZpb3VzIHdyaXRlcyBjb21wbGV0ZSwgcGVyZm9ybSBvdXIgd3JpdGVcbiAgICAgICAgd3JpdGVQcm9taXNlID0gd3JpdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChmZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgY29udmVydFRvVWludDhBcnJheShuZXdFbnRyeS5kYXRhKS50aGVuKGZ1bmN0aW9uIChkYXRhQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxXcml0dGVuID0gMCxcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGRhdGFBcnJheS5idWZmZXIpLFxuICAgICAgICAgICAgICAgICAgaGFuZGxlV3JpdGVDb21wbGV0ZSA9IGZ1bmN0aW9uIChlcnIsIHdyaXR0ZW4sIGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFdyaXR0ZW4gKz0gd3JpdHRlblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbFdyaXR0ZW4gPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHN0aWxsIGhhdmUgbW9yZSB0byB3cml0ZS4uLlxuICAgICAgICAgICAgICAgICAgICAgIC8vIC8vZnMud3JpdGUoXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBmZCxcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGJ1ZmZlcixcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIHRvdGFsV3JpdHRlbixcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGJ1ZmZlci5sZW5ndGggLSB0b3RhbFdyaXR0ZW4sXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBuZXdFbnRyeS5vZmZzZXQgKyB0b3RhbFdyaXR0ZW4sXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBoYW5kbGVXcml0ZUNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyAvL2ZzLndyaXRlKGZkLCBidWZmZXIsIDAsIGJ1ZmZlci5sZW5ndGgsIG5ld0VudHJ5Lm9mZnNldCwgaGFuZGxlV3JpdGVDb21wbGV0ZSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIGlmIChmaWxlV3JpdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICBmaWxlV3JpdGVyLm9ud3JpdGVlbmQgPSByZXNvbHZlXG5cbiAgICAgICAgICAgICAgZmlsZVdyaXRlci5zZWVrKG5ld0VudHJ5Lm9mZnNldClcbiAgICAgICAgICAgICAgZmlsZVdyaXRlci53cml0ZShuZXcgQmxvYihbbmV3RW50cnkuZGF0YV0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKCFpc0FwcGVuZCkge1xuICAgICAgICAgICAgLy8gV2UgbWlnaHQgYmUgbW9kaWZ5aW5nIGEgd3JpdGUgdGhhdCB3YXMgYWxyZWFkeSBidWZmZXJlZCBpbiBtZW1vcnkuXG5cbiAgICAgICAgICAgIC8vIFNsb3cgbGluZWFyIHNlYXJjaCB0byBmaW5kIGEgYmxvY2sgd2UgbWlnaHQgYmUgb3ZlcndyaXRpbmdcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IGJ1ZmZlcltpXVxuXG4gICAgICAgICAgICAgIC8vIElmIG91ciBuZXcgZW50cnkgb3ZlcmxhcHMgdGhlIG9sZCBvbmUgaW4gYW55IHdheS4uLlxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIShuZXdFbnRyeS5vZmZzZXQgKyBuZXdFbnRyeS5sZW5ndGggPD0gZW50cnkub2Zmc2V0IHx8IG5ld0VudHJ5Lm9mZnNldCA+PSBlbnRyeS5vZmZzZXQgKyBlbnRyeS5sZW5ndGgpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdFbnRyeS5vZmZzZXQgPCBlbnRyeS5vZmZzZXQgfHwgbmV3RW50cnkub2Zmc2V0ICsgbmV3RW50cnkubGVuZ3RoID4gZW50cnkub2Zmc2V0ICsgZW50cnkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJ3cml0ZSBjcm9zc2VzIGJsb2IgYm91bmRhcmllcycpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0VudHJ5Lm9mZnNldCA9PSBlbnRyeS5vZmZzZXQgJiYgbmV3RW50cnkubGVuZ3RoID09IGVudHJ5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgLy8gV2Ugb3Zlcndyb3RlIHRoZSBlbnRpcmUgYmxvY2tcbiAgICAgICAgICAgICAgICAgIGVudHJ5LmRhdGEgPSBuZXdFbnRyeS5kYXRhXG5cbiAgICAgICAgICAgICAgICAgIC8vIFdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29udmVydFRvVWludDhBcnJheShlbnRyeS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZW50cnlBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LmRhdGEgPSBlbnRyeUFycmF5XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udmVydFRvVWludDhBcnJheShuZXdFbnRyeS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobmV3RW50cnlBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgIG5ld0VudHJ5LmRhdGEgPSBuZXdFbnRyeUFycmF5XG5cbiAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5kYXRhLnNldChuZXdFbnRyeS5kYXRhLCBuZXdFbnRyeS5vZmZzZXQgLSBlbnRyeS5vZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFbHNlIGZhbGwgdGhyb3VnaCB0byBkbyBhIHNpbXBsZSBhcHBlbmQsIGFzIHdlIGRpZG4ndCBvdmVyd3JpdGUgYW55IHByZS1leGlzdGluZyBibG9ja3NcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIucHVzaChuZXdFbnRyeSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBGaW5pc2ggYWxsIHdyaXRlcyB0byB0aGUgYnVmZmVyLCByZXR1cm5pbmcgYSBwcm9taXNlIHRoYXQgc2lnbmFscyB3aGVuIHRoYXQgaXMgY29tcGxldGUuXG4gICAgICAgKlxuICAgICAgICogSWYgYSBGaWxlV3JpdGVyIHdhcyBub3QgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggYSBCbG9iIHRoYXQgcmVwcmVzZW50cyB0aGUgY29tcGxldGVkIEJsb2JCdWZmZXJcbiAgICAgICAqIGNvbnRlbnRzLiBZb3UgY2FuIG9wdGlvbmFsbHkgcGFzcyBpbiBhIG1pbWVUeXBlIHRvIGJlIHVzZWQgZm9yIHRoaXMgYmxvYi5cbiAgICAgICAqXG4gICAgICAgKiBJZiBhIEZpbGVXcml0ZXIgd2FzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG51bGwgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxuICAgICAgICovXG4gICAgICB0aGlzLmNvbXBsZXRlID0gZnVuY3Rpb24gKG1pbWVUeXBlKSB7XG4gICAgICAgIGlmIChmZCB8fCBmaWxlV3JpdGVyKSB7XG4gICAgICAgICAgd3JpdGVQcm9taXNlID0gd3JpdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEFmdGVyIHdyaXRlcyBjb21wbGV0ZSB3ZSBuZWVkIHRvIG1lcmdlIHRoZSBidWZmZXIgdG8gZ2l2ZSB0byB0aGUgY2FsbGVyXG4gICAgICAgICAgd3JpdGVQcm9taXNlID0gd3JpdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGJ1ZmZlcltpXS5kYXRhKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJsb2IocmVzdWx0LCB7IG1pbWVUeXBlOiBtaW1lVHlwZSB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd3JpdGVQcm9taXNlXG4gICAgICB9XG4gICAgfVxuICB9KShpc05vZGVFbnZpcm9tZW50ID8gbnVsbCA6IG51bGwpXG5cbiAgd2luZG93LkJsb2JCdWZmZXIgPSBCbG9iQnVmZmVyXG5cbiAgLyoqXG4gICAqIFdlYk0gdmlkZW8gZW5jb2RlciBmb3IgR29vZ2xlIENocm9tZS4gVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBzdWl0YWJsZSBmb3IgY3JlYXRpbmcgdmVyeSBsYXJnZSB2aWRlbyBmaWxlcywgYmVjYXVzZVxuICAgKiBpdCBjYW4gc3RyZWFtIEJsb2JzIGRpcmVjdGx5IHRvIGEgRmlsZVdyaXRlciB3aXRob3V0IGJ1ZmZlcmluZyB0aGUgZW50aXJlIHZpZGVvIGluIG1lbW9yeS5cbiAgICpcbiAgICogV2hlbiBGaWxlV3JpdGVyIGlzIG5vdCBhdmFpbGFibGUgb3Igbm90IGRlc2lyZWQsIGl0IGNhbiBidWZmZXIgdGhlIHZpZGVvIGluIG1lbW9yeSBhcyBhIHNlcmllcyBvZiBCbG9icyB3aGljaCBhcmVcbiAgICogZXZlbnR1YWxseSByZXR1cm5lZCBhcyBvbmUgY29tcG9zaXRlIEJsb2IuXG4gICAqXG4gICAqIEJ5IE5pY2hvbGFzIFNoZXJsb2NrLlxuICAgKlxuICAgKiBCYXNlZCBvbiB0aGUgaWRlYXMgZnJvbSBXaGFtbXk6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRpbWF0dGVyMTUvd2hhbW15XG4gICAqXG4gICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBXVEZQTHYyIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dURlBMXG4gICAqL1xuXG4gIHZhciBXZWJNV3JpdGVyID0gZnVuY3Rpb24gKEFycmF5QnVmZmVyRGF0YVN0cmVhbSwgQmxvYkJ1ZmZlcikge1xuICAgIGZ1bmN0aW9uIGV4dGVuZChiYXNlLCB0b3ApIHtcbiAgICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgICA7W2Jhc2UsIHRvcF0uZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiB0YXJnZXRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgYSBCYXNlNjQgZGF0YSBVUkwgaW50byBhIGJpbmFyeSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIHRoZSBiaW5hcnkgc3RyaW5nLCBvciBmYWxzZSBpZiB0aGUgVVJMIGNvdWxkIG5vdCBiZSBkZWNvZGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlY29kZUJhc2U2NFdlYlBEYXRhVVJMKHVybCkge1xuICAgICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnIHx8ICF1cmwubWF0Y2goL15kYXRhOmltYWdlXFwvd2VicDtiYXNlNjQsL2kpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gd2luZG93LmF0b2IodXJsLnN1YnN0cmluZygnZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCwnLmxlbmd0aCkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhIHJhdyBiaW5hcnkgc3RyaW5nIChvbmUgY2hhcmFjdGVyID0gb25lIG91dHB1dCBieXRlKSB0byBhbiBBcnJheUJ1ZmZlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0cmluZ1RvQXJyYXlCdWZmZXIoc3RyaW5nKSB7XG4gICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHN0cmluZy5sZW5ndGgpLFxuICAgICAgICBpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIpXG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGludDhBcnJheVtpXSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWZmZXJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IHRoZSBnaXZlbiBjYW52YXMgdG8gYSBXZWJQIGVuY29kZWQgaW1hZ2UgYW5kIHJldHVybiB0aGUgaW1hZ2UgZGF0YSBhcyBhIHN0cmluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZW5kZXJBc1dlYlAoY2FudmFzLCBxdWFsaXR5KSB7XG4gICAgICB2YXIgZnJhbWUgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS93ZWJwJywgeyBxdWFsaXR5OiBxdWFsaXR5IH0pXG5cbiAgICAgIHJldHVybiBkZWNvZGVCYXNlNjRXZWJQRGF0YVVSTChmcmFtZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRyYWN0S2V5ZnJhbWVGcm9tV2ViUCh3ZWJQKSB7XG4gICAgICAvLyBBc3N1bWUgdGhhdCBDaHJvbWUgd2lsbCBnZW5lcmF0ZSBhIFNpbXBsZSBMb3NzeSBXZWJQIHdoaWNoIGhhcyB0aGlzIGhlYWRlcjpcbiAgICAgIHZhciBrZXlmcmFtZVN0YXJ0SW5kZXggPSB3ZWJQLmluZGV4T2YoJ1ZQOCAnKVxuXG4gICAgICBpZiAoa2V5ZnJhbWVTdGFydEluZGV4ID09IC0xKSB7XG4gICAgICAgIHRocm93ICdGYWlsZWQgdG8gaWRlbnRpZnkgYmVnaW5uaW5nIG9mIGtleWZyYW1lIGluIFdlYlAgaW1hZ2UnXG4gICAgICB9XG5cbiAgICAgIC8vIFNraXAgdGhlIGhlYWRlciBhbmQgdGhlIDQgYnl0ZXMgdGhhdCBlbmNvZGUgdGhlIGxlbmd0aCBvZiB0aGUgVlA4IGNodW5rXG4gICAgICBrZXlmcmFtZVN0YXJ0SW5kZXggKz0gJ1ZQOCAnLmxlbmd0aCArIDRcblxuICAgICAgcmV0dXJuIHdlYlAuc3Vic3RyaW5nKGtleWZyYW1lU3RhcnRJbmRleClcbiAgICB9XG5cbiAgICAvLyBKdXN0IGEgbGl0dGxlIHV0aWxpdHkgc28gd2UgY2FuIHRhZyB2YWx1ZXMgYXMgZmxvYXRzIGZvciB0aGUgRUJNTCBlbmNvZGVyJ3MgYmVuZWZpdFxuICAgIGZ1bmN0aW9uIEVCTUxGbG9hdDMyKHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBFQk1MRmxvYXQ2NCh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGUgdGhlIGdpdmVuIEVCTUwgb2JqZWN0IHRvIHRoZSBwcm92aWRlZCBBcnJheUJ1ZmZlclN0cmVhbS5cbiAgICAgKlxuICAgICAqIFRoZSBidWZmZXIncyBmaXJzdCBieXRlIGlzIGF0IGJ1ZmZlckZpbGVPZmZzZXQgaW5zaWRlIHRoZSB2aWRlbyBmaWxlLiBUaGlzIGlzIHVzZWQgdG8gY29tcGxldGUgb2Zmc2V0IGFuZFxuICAgICAqIGRhdGFPZmZzZXQgZmllbGRzIGluIGVhY2ggRUJNTCBzdHJ1Y3R1cmUsIGluZGljYXRpbmcgdGhlIGZpbGUgb2Zmc2V0IG9mIHRoZSBmaXJzdCBieXRlIG9mIHRoZSBFQk1MIGVsZW1lbnQgYW5kXG4gICAgICogaXRzIGRhdGEgcGF5bG9hZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3cml0ZUVCTUwoYnVmZmVyLCBidWZmZXJGaWxlT2Zmc2V0LCBlYm1sKSB7XG4gICAgICAvLyBJcyB0aGUgZWJtbCBhbiBhcnJheSBvZiBzaWJsaW5nIGVsZW1lbnRzP1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWJtbCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlYm1sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgd3JpdGVFQk1MKGJ1ZmZlciwgYnVmZmVyRmlsZU9mZnNldCwgZWJtbFtpXSlcbiAgICAgICAgfVxuICAgICAgICAvLyBJcyB0aGlzIHNvbWUgc29ydCBvZiByYXcgZGF0YSB0aGF0IHdlIHdhbnQgdG8gd3JpdGUgZGlyZWN0bHk/XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlYm1sID09PSAnc3RyaW5nJykge1xuICAgICAgICBidWZmZXIud3JpdGVTdHJpbmcoZWJtbClcbiAgICAgIH0gZWxzZSBpZiAoZWJtbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgYnVmZmVyLndyaXRlQnl0ZXMoZWJtbClcbiAgICAgIH0gZWxzZSBpZiAoZWJtbC5pZCkge1xuICAgICAgICAvLyBXZSdyZSB3cml0aW5nIGFuIEVCTUwgZWxlbWVudFxuICAgICAgICBlYm1sLm9mZnNldCA9IGJ1ZmZlci5wb3MgKyBidWZmZXJGaWxlT2Zmc2V0XG5cbiAgICAgICAgYnVmZmVyLndyaXRlVW5zaWduZWRJbnRCRShlYm1sLmlkKSAvLyBJRCBmaWVsZFxuXG4gICAgICAgIC8vIE5vdyB3ZSBuZWVkIHRvIHdyaXRlIHRoZSBzaXplIGZpZWxkLCBzbyB3ZSBtdXN0IGtub3cgdGhlIHBheWxvYWQgc2l6ZTpcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlYm1sLmRhdGEpKSB7XG4gICAgICAgICAgLy8gV3JpdGluZyBhbiBhcnJheSBvZiBjaGlsZCBlbGVtZW50cy4gV2Ugd29uJ3QgdHJ5IHRvIG1lYXN1cmUgdGhlIHNpemUgb2YgdGhlIGNoaWxkcmVuIHVwLWZyb250XG5cbiAgICAgICAgICB2YXIgc2l6ZVBvcywgZGF0YUJlZ2luLCBkYXRhRW5kXG5cbiAgICAgICAgICBpZiAoZWJtbC5zaXplID09PSAtMSkge1xuICAgICAgICAgICAgLy8gV3JpdGUgdGhlIHJlc2VydmVkIGFsbC1vbmUtYml0cyBtYXJrZXIgdG8gbm90ZSB0aGF0IHRoZSBzaXplIG9mIHRoaXMgZWxlbWVudCBpcyB1bmtub3duL3VuYm91bmRlZFxuICAgICAgICAgICAgYnVmZmVyLndyaXRlQnl0ZSgweGZmKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaXplUG9zID0gYnVmZmVyLnBvc1xuXG4gICAgICAgICAgICAvKiBXcml0ZSBhIGR1bW15IHNpemUgZmllbGQgdG8gb3ZlcndyaXRlIGxhdGVyLiA0IGJ5dGVzIGFsbG93cyBhbiBlbGVtZW50IG1heGltdW0gc2l6ZSBvZiAyNTZNQixcbiAgICAgICAgICAgICAqIHdoaWNoIHNob3VsZCBiZSBwbGVudHkgKHdlIGRvbid0IHdhbnQgdG8gaGF2ZSB0byBidWZmZXIgdGhhdCBtdWNoIGRhdGEgaW4gbWVtb3J5IGF0IG9uZSB0aW1lXG4gICAgICAgICAgICAgKiBhbnl3YXkhKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBidWZmZXIud3JpdGVCeXRlcyhbMCwgMCwgMCwgMF0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGF0YUJlZ2luID0gYnVmZmVyLnBvc1xuXG4gICAgICAgICAgZWJtbC5kYXRhT2Zmc2V0ID0gZGF0YUJlZ2luICsgYnVmZmVyRmlsZU9mZnNldFxuICAgICAgICAgIHdyaXRlRUJNTChidWZmZXIsIGJ1ZmZlckZpbGVPZmZzZXQsIGVibWwuZGF0YSlcblxuICAgICAgICAgIGlmIChlYm1sLnNpemUgIT09IC0xKSB7XG4gICAgICAgICAgICBkYXRhRW5kID0gYnVmZmVyLnBvc1xuXG4gICAgICAgICAgICBlYm1sLnNpemUgPSBkYXRhRW5kIC0gZGF0YUJlZ2luXG5cbiAgICAgICAgICAgIGJ1ZmZlci5zZWVrKHNpemVQb3MpXG4gICAgICAgICAgICBidWZmZXIud3JpdGVFQk1MVmFySW50V2lkdGgoZWJtbC5zaXplLCA0KSAvLyBTaXplIGZpZWxkXG5cbiAgICAgICAgICAgIGJ1ZmZlci5zZWVrKGRhdGFFbmQpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlYm1sLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYnVmZmVyLndyaXRlRUJNTFZhckludChlYm1sLmRhdGEubGVuZ3RoKSAvLyBTaXplIGZpZWxkXG4gICAgICAgICAgZWJtbC5kYXRhT2Zmc2V0ID0gYnVmZmVyLnBvcyArIGJ1ZmZlckZpbGVPZmZzZXRcbiAgICAgICAgICBidWZmZXIud3JpdGVTdHJpbmcoZWJtbC5kYXRhKVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlYm1sLmRhdGEgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgLy8gQWxsb3cgdGhlIGNhbGxlciB0byBleHBsaWNpdGx5IGNob29zZSB0aGUgc2l6ZSBpZiB0aGV5IHdpc2ggYnkgc3VwcGx5aW5nIGEgc2l6ZSBmaWVsZFxuICAgICAgICAgIGlmICghZWJtbC5zaXplKSB7XG4gICAgICAgICAgICBlYm1sLnNpemUgPSBidWZmZXIubWVhc3VyZVVuc2lnbmVkSW50KGVibWwuZGF0YSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIud3JpdGVFQk1MVmFySW50KGVibWwuc2l6ZSkgLy8gU2l6ZSBmaWVsZFxuICAgICAgICAgIGVibWwuZGF0YU9mZnNldCA9IGJ1ZmZlci5wb3MgKyBidWZmZXJGaWxlT2Zmc2V0XG4gICAgICAgICAgYnVmZmVyLndyaXRlVW5zaWduZWRJbnRCRShlYm1sLmRhdGEsIGVibWwuc2l6ZSlcbiAgICAgICAgfSBlbHNlIGlmIChlYm1sLmRhdGEgaW5zdGFuY2VvZiBFQk1MRmxvYXQ2NCkge1xuICAgICAgICAgIGJ1ZmZlci53cml0ZUVCTUxWYXJJbnQoOCkgLy8gU2l6ZSBmaWVsZFxuICAgICAgICAgIGVibWwuZGF0YU9mZnNldCA9IGJ1ZmZlci5wb3MgKyBidWZmZXJGaWxlT2Zmc2V0XG4gICAgICAgICAgYnVmZmVyLndyaXRlRG91YmxlQkUoZWJtbC5kYXRhLnZhbHVlKVxuICAgICAgICB9IGVsc2UgaWYgKGVibWwuZGF0YSBpbnN0YW5jZW9mIEVCTUxGbG9hdDMyKSB7XG4gICAgICAgICAgYnVmZmVyLndyaXRlRUJNTFZhckludCg0KSAvLyBTaXplIGZpZWxkXG4gICAgICAgICAgZWJtbC5kYXRhT2Zmc2V0ID0gYnVmZmVyLnBvcyArIGJ1ZmZlckZpbGVPZmZzZXRcbiAgICAgICAgICBidWZmZXIud3JpdGVGbG9hdEJFKGVibWwuZGF0YS52YWx1ZSlcbiAgICAgICAgfSBlbHNlIGlmIChlYm1sLmRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgYnVmZmVyLndyaXRlRUJNTFZhckludChlYm1sLmRhdGEuYnl0ZUxlbmd0aCkgLy8gU2l6ZSBmaWVsZFxuICAgICAgICAgIGVibWwuZGF0YU9mZnNldCA9IGJ1ZmZlci5wb3MgKyBidWZmZXJGaWxlT2Zmc2V0XG4gICAgICAgICAgYnVmZmVyLndyaXRlQnl0ZXMoZWJtbC5kYXRhKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93ICdCYWQgRUJNTCBkYXRhdHlwZSAnICsgdHlwZW9mIGVibWwuZGF0YVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnQmFkIEVCTUwgZGF0YXR5cGUgJyArIHR5cGVvZiBlYm1sLmRhdGFcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgIHZhciBNQVhfQ0xVU1RFUl9EVVJBVElPTl9NU0VDID0gNTAwMCxcbiAgICAgICAgREVGQVVMVF9UUkFDS19OVU1CRVIgPSAxLFxuICAgICAgICB3cml0dGVuSGVhZGVyID0gZmFsc2UsXG4gICAgICAgIHZpZGVvV2lkdGgsXG4gICAgICAgIHZpZGVvSGVpZ2h0LFxuICAgICAgICBjbHVzdGVyRnJhbWVCdWZmZXIgPSBbXSxcbiAgICAgICAgY2x1c3RlclN0YXJ0VGltZSA9IDAsXG4gICAgICAgIGNsdXN0ZXJEdXJhdGlvbiA9IDAsXG4gICAgICAgIG9wdGlvbkRlZmF1bHRzID0ge1xuICAgICAgICAgIHF1YWxpdHk6IDAuOTUsIC8vIFdlYk0gaW1hZ2UgcXVhbGl0eSBmcm9tIDAuMCAod29yc3QpIHRvIDEuMCAoYmVzdClcbiAgICAgICAgICBmaWxlV3JpdGVyOiBudWxsLCAvLyBDaHJvbWUgRmlsZVdyaXRlciBpbiBvcmRlciB0byBzdHJlYW0gdG8gYSBmaWxlIGluc3RlYWQgb2YgYnVmZmVyaW5nIHRvIG1lbW9yeSAob3B0aW9uYWwpXG4gICAgICAgICAgZmQ6IG51bGwsIC8vIE5vZGUuSlMgZmlsZSBkZXNjcmlwdG9yIHRvIHdyaXRlIHRvIGluc3RlYWQgb2YgYnVmZmVyaW5nIChvcHRpb25hbClcblxuICAgICAgICAgIC8vIFlvdSBtdXN0IHN1cHBseSBvbmUgb2Y6XG4gICAgICAgICAgZnJhbWVEdXJhdGlvbjogbnVsbCwgLy8gRHVyYXRpb24gb2YgZnJhbWVzIGluIG1pbGxpc2Vjb25kc1xuICAgICAgICAgIGZyYW1lUmF0ZTogbnVsbCwgLy8gTnVtYmVyIG9mIGZyYW1lcyBwZXIgc2Vjb25kXG4gICAgICAgIH0sXG4gICAgICAgIHNlZWtQb2ludHMgPSB7XG4gICAgICAgICAgQ3VlczogeyBpZDogbmV3IFVpbnQ4QXJyYXkoWzB4MWMsIDB4NTMsIDB4YmIsIDB4NmJdKSwgcG9zaXRpb25FQk1MOiBudWxsIH0sXG4gICAgICAgICAgU2VnbWVudEluZm86IHsgaWQ6IG5ldyBVaW50OEFycmF5KFsweDE1LCAweDQ5LCAweGE5LCAweDY2XSksIHBvc2l0aW9uRUJNTDogbnVsbCB9LFxuICAgICAgICAgIFRyYWNrczogeyBpZDogbmV3IFVpbnQ4QXJyYXkoWzB4MTYsIDB4NTQsIDB4YWUsIDB4NmJdKSwgcG9zaXRpb25FQk1MOiBudWxsIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVibWxTZWdtZW50LFxuICAgICAgICBzZWdtZW50RHVyYXRpb24gPSB7XG4gICAgICAgICAgaWQ6IDB4NDQ4OSwgLy8gRHVyYXRpb25cbiAgICAgICAgICBkYXRhOiBuZXcgRUJNTEZsb2F0NjQoMCksXG4gICAgICAgIH0sXG4gICAgICAgIHNlZWtIZWFkLFxuICAgICAgICBjdWVzID0gW10sXG4gICAgICAgIGJsb2JCdWZmZXIgPSBuZXcgQmxvYkJ1ZmZlcihvcHRpb25zLmZpbGVXcml0ZXIgfHwgb3B0aW9ucy5mZClcblxuICAgICAgZnVuY3Rpb24gZmlsZU9mZnNldFRvU2VnbWVudFJlbGF0aXZlKGZpbGVPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVPZmZzZXQgLSBlYm1sU2VnbWVudC5kYXRhT2Zmc2V0XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlIGEgU2Vla0hlYWQgZWxlbWVudCB3aXRoIGRlc2NyaXB0b3JzIGZvciB0aGUgcG9pbnRzIGluIHRoZSBnbG9iYWwgc2Vla1BvaW50cyBhcnJheS5cbiAgICAgICAqXG4gICAgICAgKiA1IGJ5dGVzIG9mIHBvc2l0aW9uIHZhbHVlcyBhcmUgcmVzZXJ2ZWQgZm9yIGVhY2ggbm9kZSwgd2hpY2ggbGllIGF0IHRoZSBvZmZzZXQgcG9pbnQucG9zaXRpb25FQk1MLmRhdGFPZmZzZXQsXG4gICAgICAgKiB0byBiZSBvdmVyd3JpdHRlbiBsYXRlci5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gY3JlYXRlU2Vla0hlYWQoKSB7XG4gICAgICAgIHZhciBzZWVrUG9zaXRpb25FQk1MVGVtcGxhdGUgPSB7XG4gICAgICAgICAgICBpZDogMHg1M2FjLCAvLyBTZWVrUG9zaXRpb25cbiAgICAgICAgICAgIHNpemU6IDUsIC8vIEFsbG93cyBmb3IgMzJHQiB2aWRlbyBmaWxlc1xuICAgICAgICAgICAgZGF0YTogMCwgLy8gV2UnbGwgb3ZlcndyaXRlIHRoaXMgd2hlbiB0aGUgZmlsZSBpcyBjb21wbGV0ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgaWQ6IDB4MTE0ZDliNzQsIC8vIFNlZWtIZWFkXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBzZWVrUG9pbnRzKSB7XG4gICAgICAgICAgdmFyIHNlZWtQb2ludCA9IHNlZWtQb2ludHNbbmFtZV1cblxuICAgICAgICAgIHNlZWtQb2ludC5wb3NpdGlvbkVCTUwgPSBPYmplY3QuY3JlYXRlKHNlZWtQb3NpdGlvbkVCTUxUZW1wbGF0ZSlcblxuICAgICAgICAgIHJlc3VsdC5kYXRhLnB1c2goe1xuICAgICAgICAgICAgaWQ6IDB4NGRiYiwgLy8gU2Vla1xuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDB4NTNhYiwgLy8gU2Vla0lEXG4gICAgICAgICAgICAgICAgZGF0YTogc2Vla1BvaW50LmlkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZWVrUG9pbnQucG9zaXRpb25FQk1MLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFdyaXRlIHRoZSBXZWJNIGZpbGUgaGVhZGVyIHRvIHRoZSBzdHJlYW0uXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHdyaXRlSGVhZGVyKCkge1xuICAgICAgICBzZWVrSGVhZCA9IGNyZWF0ZVNlZWtIZWFkKClcblxuICAgICAgICB2YXIgZWJtbEhlYWRlciA9IHtcbiAgICAgICAgICAgIGlkOiAweDFhNDVkZmEzLCAvLyBFQk1MXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMHg0Mjg2LCAvLyBFQk1MVmVyc2lvblxuICAgICAgICAgICAgICAgIGRhdGE6IDEsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMHg0MmY3LCAvLyBFQk1MUmVhZFZlcnNpb25cbiAgICAgICAgICAgICAgICBkYXRhOiAxLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDB4NDJmMiwgLy8gRUJNTE1heElETGVuZ3RoXG4gICAgICAgICAgICAgICAgZGF0YTogNCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweDQyZjMsIC8vIEVCTUxNYXhTaXplTGVuZ3RoXG4gICAgICAgICAgICAgICAgZGF0YTogOCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweDQyODIsIC8vIERvY1R5cGVcbiAgICAgICAgICAgICAgICBkYXRhOiAnd2VibScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMHg0Mjg3LCAvLyBEb2NUeXBlVmVyc2lvblxuICAgICAgICAgICAgICAgIGRhdGE6IDIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMHg0Mjg1LCAvLyBEb2NUeXBlUmVhZFZlcnNpb25cbiAgICAgICAgICAgICAgICBkYXRhOiAyLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNlZ21lbnRJbmZvID0ge1xuICAgICAgICAgICAgaWQ6IDB4MTU0OWE5NjYsIC8vIEluZm9cbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweDJhZDdiMSwgLy8gVGltZWNvZGVTY2FsZVxuICAgICAgICAgICAgICAgIGRhdGE6IDFlNiwgLy8gVGltZXMgd2lsbCBiZSBpbiBtaWxpc2Vjb25kcyAoMWU2IG5hbm9zZWNvbmRzIHBlciBzdGVwID0gMW1zKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDB4NGQ4MCwgLy8gTXV4aW5nQXBwXG4gICAgICAgICAgICAgICAgZGF0YTogJ3dlYm0td3JpdGVyLWpzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweDU3NDEsIC8vIFdyaXRpbmdBcHBcbiAgICAgICAgICAgICAgICBkYXRhOiAnd2VibS13cml0ZXItanMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzZWdtZW50RHVyYXRpb24sIC8vIFRvIGJlIGZpbGxlZCBpbiBsYXRlclxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYWNrcyA9IHtcbiAgICAgICAgICAgIGlkOiAweDE2NTRhZTZiLCAvLyBUcmFja3NcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAweGFlLCAvLyBUcmFja0VudHJ5XG4gICAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMHhkNywgLy8gVHJhY2tOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogREVGQVVMVF9UUkFDS19OVU1CRVIsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMHg3M2M1LCAvLyBUcmFja1VJRFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBERUZBVUxUX1RSQUNLX05VTUJFUixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAweDljLCAvLyBGbGFnTGFjaW5nXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IDAsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMHgyMmI1OWMsIC8vIExhbmd1YWdlXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICd1bmQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDB4ODYsIC8vIENvZGVjSURcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJ1ZfVlA4JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAweDI1ODY4OCwgLy8gQ29kZWNOYW1lXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ICdWUDgnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDB4ODMsIC8vIFRyYWNrVHlwZVxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAxLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDB4ZTAsIC8vIFZpZGVvXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMHhiMCwgLy8gUGl4ZWxXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlkZW9XaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAweGJhLCAvLyBQaXhlbEhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlkZW9IZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfVxuXG4gICAgICAgIGVibWxTZWdtZW50ID0ge1xuICAgICAgICAgIGlkOiAweDE4NTM4MDY3LCAvLyBTZWdtZW50XG4gICAgICAgICAgc2l6ZTogLTEsIC8vIFVuYm91bmRlZCBzaXplXG4gICAgICAgICAgZGF0YTogW3NlZWtIZWFkLCBzZWdtZW50SW5mbywgdHJhY2tzXSxcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBidWZmZXJTdHJlYW0gPSBuZXcgQXJyYXlCdWZmZXJEYXRhU3RyZWFtKDI1NilcblxuICAgICAgICB3cml0ZUVCTUwoYnVmZmVyU3RyZWFtLCBibG9iQnVmZmVyLnBvcywgW2VibWxIZWFkZXIsIGVibWxTZWdtZW50XSlcbiAgICAgICAgYmxvYkJ1ZmZlci53cml0ZShidWZmZXJTdHJlYW0uZ2V0QXNEYXRhQXJyYXkoKSlcblxuICAgICAgICAvLyBOb3cgd2Uga25vdyB3aGVyZSB0aGVzZSB0b3AtbGV2ZWwgZWxlbWVudHMgbGllIGluIHRoZSBmaWxlOlxuICAgICAgICBzZWVrUG9pbnRzLlNlZ21lbnRJbmZvLnBvc2l0aW9uRUJNTC5kYXRhID0gZmlsZU9mZnNldFRvU2VnbWVudFJlbGF0aXZlKHNlZ21lbnRJbmZvLm9mZnNldClcbiAgICAgICAgc2Vla1BvaW50cy5UcmFja3MucG9zaXRpb25FQk1MLmRhdGEgPSBmaWxlT2Zmc2V0VG9TZWdtZW50UmVsYXRpdmUodHJhY2tzLm9mZnNldClcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGUgYSBTaW1wbGVCbG9jayBrZXlmcmFtZSBoZWFkZXIgdXNpbmcgdGhlc2UgZmllbGRzOlxuICAgICAgICogICAgIHRpbWVjb2RlICAgIC0gVGltZSBvZiB0aGlzIGtleWZyYW1lXG4gICAgICAgKiAgICAgdHJhY2tOdW1iZXIgLSBUcmFjayBudW1iZXIgZnJvbSAxIHRvIDEyNiAoaW5jbHVzaXZlKVxuICAgICAgICogICAgIGZyYW1lICAgICAgIC0gUmF3IGZyYW1lIGRhdGEgcGF5bG9hZCBzdHJpbmdcbiAgICAgICAqXG4gICAgICAgKiBSZXR1cm5zIGFuIEVCTUwgZWxlbWVudC5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gY3JlYXRlS2V5ZnJhbWVCbG9jayhrZXlmcmFtZSkge1xuICAgICAgICB2YXIgYnVmZmVyU3RyZWFtID0gbmV3IEFycmF5QnVmZmVyRGF0YVN0cmVhbSgxICsgMiArIDEpXG5cbiAgICAgICAgaWYgKCEoa2V5ZnJhbWUudHJhY2tOdW1iZXIgPiAwICYmIGtleWZyYW1lLnRyYWNrTnVtYmVyIDwgMTI3KSkge1xuICAgICAgICAgIHRocm93ICdUcmFja051bWJlciBtdXN0IGJlID4gMCBhbmQgPCAxMjcnXG4gICAgICAgIH1cblxuICAgICAgICBidWZmZXJTdHJlYW0ud3JpdGVFQk1MVmFySW50KGtleWZyYW1lLnRyYWNrTnVtYmVyKSAvLyBBbHdheXMgMSBieXRlIHNpbmNlIHdlIGxpbWl0IHRoZSByYW5nZSBvZiB0cmFja051bWJlclxuICAgICAgICBidWZmZXJTdHJlYW0ud3JpdGVVMTZCRShrZXlmcmFtZS50aW1lY29kZSlcblxuICAgICAgICAvLyBGbGFncyBieXRlXG4gICAgICAgIGJ1ZmZlclN0cmVhbS53cml0ZUJ5dGUoXG4gICAgICAgICAgMSA8PCA3IC8vIEtleWZyYW1lXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiAweGEzLCAvLyBTaW1wbGVCbG9ja1xuICAgICAgICAgIGRhdGE6IFtidWZmZXJTdHJlYW0uZ2V0QXNEYXRhQXJyYXkoKSwga2V5ZnJhbWUuZnJhbWVdLFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlIGEgQ2x1c3RlciBub2RlIHVzaW5nIHRoZXNlIGZpZWxkczpcbiAgICAgICAqXG4gICAgICAgKiAgICB0aW1lY29kZSAgICAtIFN0YXJ0IHRpbWUgZm9yIHRoZSBjbHVzdGVyXG4gICAgICAgKlxuICAgICAgICogUmV0dXJucyBhbiBFQk1MIGVsZW1lbnQuXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNsdXN0ZXIoY2x1c3Rlcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiAweDFmNDNiNjc1LFxuICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IDB4ZTcsIC8vIFRpbWVjb2RlXG4gICAgICAgICAgICAgIGRhdGE6IE1hdGgucm91bmQoY2x1c3Rlci50aW1lY29kZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkQ3VlUG9pbnQodHJhY2tJbmRleCwgY2x1c3RlclRpbWUsIGNsdXN0ZXJGaWxlT2Zmc2V0KSB7XG4gICAgICAgIGN1ZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IDB4YmIsIC8vIEN1ZVxuICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IDB4YjMsIC8vIEN1ZVRpbWVcbiAgICAgICAgICAgICAgZGF0YTogY2x1c3RlclRpbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogMHhiNywgLy8gQ3VlVHJhY2tQb3NpdGlvbnNcbiAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkOiAweGY3LCAvLyBDdWVUcmFja1xuICAgICAgICAgICAgICAgICAgZGF0YTogdHJhY2tJbmRleCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkOiAweGYxLCAvLyBDdWVDbHVzdGVyUG9zaXRpb25cbiAgICAgICAgICAgICAgICAgIGRhdGE6IGZpbGVPZmZzZXRUb1NlZ21lbnRSZWxhdGl2ZShjbHVzdGVyRmlsZU9mZnNldCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBXcml0ZSBhIEN1ZXMgZWxlbWVudCB0byB0aGUgYmxvYlN0cmVhbSB1c2luZyB0aGUgZ2xvYmFsIGBjdWVzYCBhcnJheSBvZiBDdWVQb2ludHMgKHVzZSBhZGRDdWVQb2ludCgpKS5cbiAgICAgICAqIFRoZSBzZWVrIGVudHJ5IGZvciB0aGUgQ3VlcyBpbiB0aGUgU2Vla0hlYWQgaXMgdXBkYXRlZC5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gd3JpdGVDdWVzKCkge1xuICAgICAgICB2YXIgZWJtbCA9IHtcbiAgICAgICAgICAgIGlkOiAweDFjNTNiYjZiLFxuICAgICAgICAgICAgZGF0YTogY3VlcyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1ZXNCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXJEYXRhU3RyZWFtKDE2ICsgY3Vlcy5sZW5ndGggKiAzMikgLy8gUHJldHR5IGNydWRlIGVzdGltYXRlIG9mIHRoZSBidWZmZXIgc2l6ZSB3ZSdsbCBuZWVkXG5cbiAgICAgICAgd3JpdGVFQk1MKGN1ZXNCdWZmZXIsIGJsb2JCdWZmZXIucG9zLCBlYm1sKVxuICAgICAgICBibG9iQnVmZmVyLndyaXRlKGN1ZXNCdWZmZXIuZ2V0QXNEYXRhQXJyYXkoKSlcblxuICAgICAgICAvLyBOb3cgd2Uga25vdyB3aGVyZSB0aGUgQ3VlcyBlbGVtZW50IGhhcyBlbmRlZCB1cCwgd2UgY2FuIHVwZGF0ZSB0aGUgU2Vla0hlYWRcbiAgICAgICAgc2Vla1BvaW50cy5DdWVzLnBvc2l0aW9uRUJNTC5kYXRhID0gZmlsZU9mZnNldFRvU2VnbWVudFJlbGF0aXZlKGVibWwub2Zmc2V0KVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEZsdXNoIHRoZSBmcmFtZXMgaW4gdGhlIGN1cnJlbnQgY2x1c3RlckZyYW1lQnVmZmVyIG91dCB0byB0aGUgc3RyZWFtIGFzIGEgQ2x1c3Rlci5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gZmx1c2hDbHVzdGVyRnJhbWVCdWZmZXIoKSB7XG4gICAgICAgIGlmIChjbHVzdGVyRnJhbWVCdWZmZXIubGVuZ3RoID09IDApIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcnN0IHdvcmsgb3V0IGhvdyBsYXJnZSBvZiBhIGJ1ZmZlciB3ZSBuZWVkIHRvIGhvbGQgdGhlIGNsdXN0ZXIgZGF0YVxuICAgICAgICB2YXIgcmF3SW1hZ2VTaXplID0gMFxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2x1c3RlckZyYW1lQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgcmF3SW1hZ2VTaXplICs9IGNsdXN0ZXJGcmFtZUJ1ZmZlcltpXS5mcmFtZS5sZW5ndGhcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXJEYXRhU3RyZWFtKHJhd0ltYWdlU2l6ZSArIGNsdXN0ZXJGcmFtZUJ1ZmZlci5sZW5ndGggKiAzMiksIC8vIEVzdGltYXRlIDMyIGJ5dGVzIHBlciBTaW1wbGVCbG9jayBoZWFkZXJcbiAgICAgICAgICBjbHVzdGVyID0gY3JlYXRlQ2x1c3Rlcih7XG4gICAgICAgICAgICB0aW1lY29kZTogTWF0aC5yb3VuZChjbHVzdGVyU3RhcnRUaW1lKSxcbiAgICAgICAgICB9KVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2x1c3RlckZyYW1lQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY2x1c3Rlci5kYXRhLnB1c2goY3JlYXRlS2V5ZnJhbWVCbG9jayhjbHVzdGVyRnJhbWVCdWZmZXJbaV0pKVxuICAgICAgICB9XG5cbiAgICAgICAgd3JpdGVFQk1MKGJ1ZmZlciwgYmxvYkJ1ZmZlci5wb3MsIGNsdXN0ZXIpXG4gICAgICAgIGJsb2JCdWZmZXIud3JpdGUoYnVmZmVyLmdldEFzRGF0YUFycmF5KCkpXG5cbiAgICAgICAgYWRkQ3VlUG9pbnQoREVGQVVMVF9UUkFDS19OVU1CRVIsIE1hdGgucm91bmQoY2x1c3RlclN0YXJ0VGltZSksIGNsdXN0ZXIub2Zmc2V0KVxuXG4gICAgICAgIGNsdXN0ZXJGcmFtZUJ1ZmZlciA9IFtdXG4gICAgICAgIGNsdXN0ZXJTdGFydFRpbWUgKz0gY2x1c3RlckR1cmF0aW9uXG4gICAgICAgIGNsdXN0ZXJEdXJhdGlvbiA9IDBcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdmFsaWRhdGVPcHRpb25zKCkge1xuICAgICAgICAvLyBEZXJpdmUgZnJhbWVEdXJhdGlvbiBzZXR0aW5nIGlmIG5vdCBhbHJlYWR5IHN1cHBsaWVkXG4gICAgICAgIGlmICghb3B0aW9ucy5mcmFtZUR1cmF0aW9uKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMuZnJhbWVSYXRlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmZyYW1lRHVyYXRpb24gPSAxMDAwIC8gb3B0aW9ucy5mcmFtZVJhdGVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgJ01pc3NpbmcgcmVxdWlyZWQgZnJhbWVEdXJhdGlvbiBvciBmcmFtZVJhdGUgc2V0dGluZydcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkRnJhbWVUb0NsdXN0ZXIoZnJhbWUpIHtcbiAgICAgICAgZnJhbWUudHJhY2tOdW1iZXIgPSBERUZBVUxUX1RSQUNLX05VTUJFUlxuXG4gICAgICAgIC8vIEZyYW1lIHRpbWVjb2RlcyBhcmUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZWlyIGNsdXN0ZXI6XG4gICAgICAgIGZyYW1lLnRpbWVjb2RlID0gTWF0aC5yb3VuZChjbHVzdGVyRHVyYXRpb24pXG5cbiAgICAgICAgY2x1c3RlckZyYW1lQnVmZmVyLnB1c2goZnJhbWUpXG5cbiAgICAgICAgY2x1c3RlckR1cmF0aW9uICs9IGZyYW1lLmR1cmF0aW9uXG5cbiAgICAgICAgaWYgKGNsdXN0ZXJEdXJhdGlvbiA+PSBNQVhfQ0xVU1RFUl9EVVJBVElPTl9NU0VDKSB7XG4gICAgICAgICAgZmx1c2hDbHVzdGVyRnJhbWVCdWZmZXIoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogUmV3cml0ZXMgdGhlIFNlZWtIZWFkIGVsZW1lbnQgdGhhdCB3YXMgaW5pdGlhbGx5IHdyaXR0ZW4gdG8gdGhlIHN0cmVhbSB3aXRoIHRoZSBvZmZzZXRzIG9mIHRvcCBsZXZlbCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBDYWxsIG9uY2Ugd3JpdGluZyBpcyBjb21wbGV0ZSAoc28gdGhlIG9mZnNldCBvZiBhbGwgdG9wIGxldmVsIGVsZW1lbnRzIGlzIGtub3duKS5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gcmV3cml0ZVNlZWtIZWFkKCkge1xuICAgICAgICB2YXIgc2Vla0hlYWRCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXJEYXRhU3RyZWFtKHNlZWtIZWFkLnNpemUpLFxuICAgICAgICAgIG9sZFBvcyA9IGJsb2JCdWZmZXIucG9zXG5cbiAgICAgICAgLy8gV3JpdGUgdGhlIHJld3JpdHRlbiBTZWVrSGVhZCBlbGVtZW50J3MgZGF0YSBwYXlsb2FkIHRvIHRoZSBzdHJlYW0gKGRvbid0IG5lZWQgdG8gdXBkYXRlIHRoZSBpZCBvciBzaXplKVxuICAgICAgICB3cml0ZUVCTUwoc2Vla0hlYWRCdWZmZXIsIHNlZWtIZWFkLmRhdGFPZmZzZXQsIHNlZWtIZWFkLmRhdGEpXG5cbiAgICAgICAgLy8gQW5kIHdyaXRlIHRoYXQgdGhyb3VnaCB0byB0aGUgZmlsZVxuICAgICAgICBibG9iQnVmZmVyLnNlZWsoc2Vla0hlYWQuZGF0YU9mZnNldClcbiAgICAgICAgYmxvYkJ1ZmZlci53cml0ZShzZWVrSGVhZEJ1ZmZlci5nZXRBc0RhdGFBcnJheSgpKVxuXG4gICAgICAgIGJsb2JCdWZmZXIuc2VlayhvbGRQb3MpXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogUmV3cml0ZSB0aGUgRHVyYXRpb24gZmllbGQgb2YgdGhlIFNlZ21lbnQgd2l0aCB0aGUgbmV3bHktZGlzY292ZXJlZCB2aWRlbyBkdXJhdGlvbi5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gcmV3cml0ZUR1cmF0aW9uKCkge1xuICAgICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyRGF0YVN0cmVhbSg4KSxcbiAgICAgICAgICBvbGRQb3MgPSBibG9iQnVmZmVyLnBvc1xuXG4gICAgICAgIC8vIFJld3JpdGUgdGhlIGRhdGEgcGF5bG9hZCAoZG9uJ3QgbmVlZCB0byB1cGRhdGUgdGhlIGlkIG9yIHNpemUpXG4gICAgICAgIGJ1ZmZlci53cml0ZURvdWJsZUJFKGNsdXN0ZXJTdGFydFRpbWUpXG5cbiAgICAgICAgLy8gQW5kIHdyaXRlIHRoYXQgdGhyb3VnaCB0byB0aGUgZmlsZVxuICAgICAgICBibG9iQnVmZmVyLnNlZWsoc2VnbWVudER1cmF0aW9uLmRhdGFPZmZzZXQpXG4gICAgICAgIGJsb2JCdWZmZXIud3JpdGUoYnVmZmVyLmdldEFzRGF0YUFycmF5KCkpXG5cbiAgICAgICAgYmxvYkJ1ZmZlci5zZWVrKG9sZFBvcylcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBBZGQgYSBmcmFtZSB0byB0aGUgdmlkZW8uIEN1cnJlbnRseSB0aGUgZnJhbWUgbXVzdCBiZSBhIENhbnZhcyBlbGVtZW50LlxuICAgICAgICovXG4gICAgICB0aGlzLmFkZEZyYW1lID0gZnVuY3Rpb24gKGNhbnZhcykge1xuICAgICAgICBpZiAod3JpdHRlbkhlYWRlcikge1xuICAgICAgICAgIGlmIChjYW52YXMud2lkdGggIT0gdmlkZW9XaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9IHZpZGVvSGVpZ2h0KSB7XG4gICAgICAgICAgICB0aHJvdyAnRnJhbWUgc2l6ZSBkaWZmZXJzIGZyb20gcHJldmlvdXMgZnJhbWVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aWRlb1dpZHRoID0gY2FudmFzLndpZHRoXG4gICAgICAgICAgdmlkZW9IZWlnaHQgPSBjYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgICB3cml0ZUhlYWRlcigpXG4gICAgICAgICAgd3JpdHRlbkhlYWRlciA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3ZWJQID0gcmVuZGVyQXNXZWJQKGNhbnZhcywgeyBxdWFsaXR5OiBvcHRpb25zLnF1YWxpdHkgfSlcblxuICAgICAgICBpZiAoIXdlYlApIHtcbiAgICAgICAgICB0aHJvdyBcIkNvdWxkbid0IGRlY29kZSBXZWJQIGZyYW1lLCBkb2VzIHRoZSBicm93c2VyIHN1cHBvcnQgV2ViUD9cIlxuICAgICAgICB9XG5cbiAgICAgICAgYWRkRnJhbWVUb0NsdXN0ZXIoe1xuICAgICAgICAgIGZyYW1lOiBleHRyYWN0S2V5ZnJhbWVGcm9tV2ViUCh3ZWJQKSxcbiAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5mcmFtZUR1cmF0aW9uLFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEZpbmlzaCB3cml0aW5nIHRoZSB2aWRlbyBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0byBzaWduYWwgY29tcGxldGlvbi5cbiAgICAgICAqXG4gICAgICAgKiBJZiB0aGUgZGVzdGluYXRpb24gZGV2aWNlIHdhcyBtZW1vcnkgKGkuZS4gb3B0aW9ucy5maWxlV3JpdGVyIHdhcyBub3Qgc3VwcGxpZWQpLCB0aGUgUHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoXG4gICAgICAgKiBhIEJsb2Igd2l0aCB0aGUgY29udGVudHMgb2YgdGhlIGVudGlyZSB2aWRlby5cbiAgICAgICAqL1xuICAgICAgdGhpcy5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmx1c2hDbHVzdGVyRnJhbWVCdWZmZXIoKVxuXG4gICAgICAgIHdyaXRlQ3VlcygpXG4gICAgICAgIHJld3JpdGVTZWVrSGVhZCgpXG4gICAgICAgIHJld3JpdGVEdXJhdGlvbigpXG5cbiAgICAgICAgcmV0dXJuIGJsb2JCdWZmZXIuY29tcGxldGUoJ3ZpZGVvL3dlYm0nKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmdldFdyaXR0ZW5TaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYmxvYkJ1ZmZlci5sZW5ndGhcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9IGV4dGVuZChvcHRpb25EZWZhdWx0cywgb3B0aW9ucyB8fCB7fSlcbiAgICAgIHZhbGlkYXRlT3B0aW9ucygpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzTm9kZUVudmlyb21lbnQpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFdlYk1Xcml0ZXIoQXJyYXlCdWZmZXJEYXRhU3RyZWFtLCBCbG9iQnVmZmVyKVxuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5XZWJNV3JpdGVyID0gV2ViTVdyaXRlcihBcnJheUJ1ZmZlckRhdGFTdHJlYW0sIEJsb2JCdWZmZXIpXG4gIH1cbn0pKClcbiIsIjsoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgaXNOb2RlRW52aXJvbWVudCA9IHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCdcbiAgXG4gIHZhciBUYXIgPSBpc05vZGVFbnZpcm9tZW50ID8gcmVxdWlyZSgnLi90YXInKSA6IHdpbmRvdy5UYXJcbiAgdmFyIGRvd25sb2FkID0gaXNOb2RlRW52aXJvbWVudCA/IHJlcXVpcmUoJy4vZG93bmxvYWQnKSA6IHdpbmRvdy5kb3dubG9hZFxuICB2YXIgR0lGID0gaXNOb2RlRW52aXJvbWVudCA/IHJlcXVpcmUoJy4vZ2lmJykuR0lGIDogd2luZG93LkdJRlxuICB2YXIgV2ViTVdyaXRlciA9IGlzTm9kZUVudmlyb21lbnQgPyByZXF1aXJlKCcuL3dlYm0td3JpdGVyLTAuMi4wJykgOiB3aW5kb3cuV2ViTVdyaXRlclxuXG4gIHZhciBvYmplY3RUeXBlcyA9IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBvYmplY3Q6IHRydWUsXG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0dsb2JhbCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5PYmplY3QgPT09IE9iamVjdCA/IHZhbHVlIDogbnVsbFxuICB9XG5cbiAgLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbiAgdmFyIGZyZWVQYXJzZUZsb2F0ID0gcGFyc2VGbG9hdCxcbiAgICBmcmVlUGFyc2VJbnQgPSBwYXJzZUludFxuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG4gIHZhciBmcmVlRXhwb3J0cyA9IG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlID8gZXhwb3J0cyA6IHVuZGVmaW5lZFxuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbiAgdmFyIGZyZWVNb2R1bGUgPSBvYmplY3RUeXBlc1t0eXBlb2YgbW9kdWxlXSAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSA/IG1vZHVsZSA6IHVuZGVmaW5lZFxuXG4gIC8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG4gIHZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzID8gZnJlZUV4cG9ydHMgOiB1bmRlZmluZWRcblxuICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xuICB2YXIgZnJlZUdsb2JhbCA9IGNoZWNrR2xvYmFsKGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUgJiYgdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpXG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbiAgdmFyIGZyZWVTZWxmID0gY2hlY2tHbG9iYWwob2JqZWN0VHlwZXNbdHlwZW9mIHNlbGZdICYmIHNlbGYpXG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGB3aW5kb3dgLiAqL1xuICB2YXIgZnJlZVdpbmRvdyA9IGNoZWNrR2xvYmFsKG9iamVjdFR5cGVzW3R5cGVvZiB3aW5kb3ddICYmIHdpbmRvdylcblxuICAvKiogRGV0ZWN0IGB0aGlzYCBhcyB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbiAgdmFyIHRoaXNHbG9iYWwgPSBjaGVja0dsb2JhbChvYmplY3RUeXBlc1t0eXBlb2YgdGhpc10gJiYgdGhpcylcblxuICAvKipcbiAgICogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC5cbiAgICpcbiAgICogVGhlIGB0aGlzYCB2YWx1ZSBpcyB1c2VkIGlmIGl0J3MgdGhlIGdsb2JhbCBvYmplY3QgdG8gYXZvaWQgR3JlYXNlbW9ua2V5J3NcbiAgICogcmVzdHJpY3RlZCBgd2luZG93YCBvYmplY3QsIG90aGVyd2lzZSB0aGUgYHdpbmRvd2Agb2JqZWN0IGlzIHVzZWQuXG4gICAqL1xuICB2YXIgcm9vdCA9XG4gICAgZnJlZUdsb2JhbCB8fFxuICAgIChmcmVlV2luZG93ICE9PSAodGhpc0dsb2JhbCAmJiB0aGlzR2xvYmFsLndpbmRvdykgJiYgZnJlZVdpbmRvdykgfHxcbiAgICBmcmVlU2VsZiB8fFxuICAgIHRoaXNHbG9iYWwgfHxcbiAgICBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpXG5cbiAgaWYgKCEoJ2djJyBpbiB3aW5kb3cpKSB7XG4gICAgd2luZG93LmdjID0gZnVuY3Rpb24gKCkge31cbiAgfVxuXG4gIGlmICghSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlLnRvQmxvYikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUsICd0b0Jsb2InLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gKGNhbGxiYWNrLCB0eXBlLCBxdWFsaXR5KSB7XG4gICAgICAgIHZhciBiaW5TdHIgPSBhdG9iKHRoaXMudG9EYXRhVVJMKHR5cGUsIHF1YWxpdHkpLnNwbGl0KCcsJylbMV0pLFxuICAgICAgICAgIGxlbiA9IGJpblN0ci5sZW5ndGgsXG4gICAgICAgICAgYXJyID0gbmV3IFVpbnQ4QXJyYXkobGVuKVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBhcnJbaV0gPSBiaW5TdHIuY2hhckNvZGVBdChpKVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sobmV3IEJsb2IoW2Fycl0sIHsgdHlwZTogdHlwZSB8fCAnaW1hZ2UvcG5nJyB9KSlcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuXG4gIC8vIEBsaWNlbnNlIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAgLy8gY29weXJpZ2h0IFBhdWwgSXJpc2ggMjAxNVxuXG4gIC8vIERhdGUubm93KCkgaXMgc3VwcG9ydGVkIGV2ZXJ5d2hlcmUgZXhjZXB0IElFOC4gRm9yIElFOCB3ZSB1c2UgdGhlIERhdGUubm93IHBvbHlmaWxsXG4gIC8vICAgZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvcG9seWZpbGwtc2VydmljZS9ibG9iL21hc3Rlci9wb2x5ZmlsbHMvRGF0ZS5ub3cvcG9seWZpbGwuanNcbiAgLy8gYXMgU2FmYXJpIDYgZG9lc24ndCBoYXZlIHN1cHBvcnQgZm9yIE5hdmlnYXRpb25UaW1pbmcsIHdlIHVzZSBhIERhdGUubm93KCkgdGltZXN0YW1wIGZvciByZWxhdGl2ZSB2YWx1ZXNcblxuICAvLyBpZiB5b3Ugd2FudCB2YWx1ZXMgc2ltaWxhciB0byB3aGF0IHlvdSdkIGdldCB3aXRoIHJlYWwgcGVyZi5ub3csIHBsYWNlIHRoaXMgdG93YXJkcyB0aGUgaGVhZCBvZiB0aGUgcGFnZVxuICAvLyBidXQgaW4gcmVhbGl0eSwgeW91J3JlIGp1c3QgZ2V0dGluZyB0aGUgZGVsdGEgYmV0d2VlbiBub3coKSBjYWxscywgc28gaXQncyBub3QgdGVycmlibHkgaW1wb3J0YW50IHdoZXJlIGl0J3MgcGxhY2VkXG5cbiAgOyhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93ID09IGZhbHNlKSB7XG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2UgPSB7fVxuICAgIH1cblxuICAgIERhdGUubm93ID1cbiAgICAgIERhdGUubm93IHx8XG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoYW5rcyBJRThcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICB9XG5cbiAgICBpZiAoJ25vdycgaW4gd2luZG93LnBlcmZvcm1hbmNlID09IGZhbHNlKSB7XG4gICAgICB2YXIgbm93T2Zmc2V0ID0gRGF0ZS5ub3coKVxuXG4gICAgICBpZiAocGVyZm9ybWFuY2UudGltaW5nICYmIHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQpIHtcbiAgICAgICAgbm93T2Zmc2V0ID0gcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydFxuICAgICAgfVxuXG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID0gZnVuY3Rpb24gbm93KCkge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIG5vd09mZnNldFxuICAgICAgfVxuICAgIH1cbiAgfSkoKVxuXG4gIGZ1bmN0aW9uIHBhZChuKSB7XG4gICAgcmV0dXJuIFN0cmluZygnMDAwMDAwMCcgKyBuKS5zbGljZSgtNylcbiAgfVxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9BZGQtb25zL0NvZGVfc25pcHBldHMvVGltZXJzXG5cbiAgdmFyIGdfc3RhcnRUaW1lID0gd2luZG93LkRhdGUubm93KClcblxuICBmdW5jdGlvbiBndWlkKCkge1xuICAgIGZ1bmN0aW9uIHM0KCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgLnN1YnN0cmluZygxKVxuICAgIH1cbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIENDRnJhbWVFbmNvZGVyKHNldHRpbmdzKSB7XG4gICAgdmFyIF9oYW5kbGVycyA9IHt9XG5cbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3NcblxuICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIF9oYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyXG4gICAgfVxuXG4gICAgdGhpcy5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgaGFuZGxlciA9IF9oYW5kbGVyc1tldmVudF1cbiAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkobnVsbCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZpbGVuYW1lID0gc2V0dGluZ3MubmFtZSB8fCBndWlkKClcbiAgICB0aGlzLmV4dGVuc2lvbiA9ICcnXG4gICAgdGhpcy5taW1lVHlwZSA9ICcnXG4gIH1cblxuICBDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7fVxuICBDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHt9XG4gIENDRnJhbWVFbmNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7fVxuICBDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHt9XG4gIENDRnJhbWVFbmNvZGVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge31cbiAgQ0NGcmFtZUVuY29kZXIucHJvdG90eXBlLnNhZmVUb1Byb2NlZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnU3RlcCBub3Qgc2V0IScpXG4gIH1cblxuICBmdW5jdGlvbiBDQ1RhckVuY29kZXIoc2V0dGluZ3MpIHtcbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgdGhpcy5leHRlbnNpb24gPSAnLnRhcidcbiAgICB0aGlzLm1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL3gtdGFyJ1xuICAgIHRoaXMuZmlsZUV4dGVuc2lvbiA9ICcnXG4gICAgdGhpcy5iYXNlRmlsZW5hbWUgPSB0aGlzLmZpbGVuYW1lXG5cbiAgICB0aGlzLnRhcGUgPSBudWxsXG4gICAgdGhpcy5jb3VudCA9IDBcbiAgICB0aGlzLnBhcnQgPSAxXG4gICAgdGhpcy5mcmFtZXMgPSAwXG4gIH1cblxuICBDQ1RhckVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKVxuICB9XG5cbiAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoYmxvYikge1xuICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50YXBlLmFwcGVuZChwYWQodGhpcy5jb3VudCkgKyB0aGlzLmZpbGVFeHRlbnNpb24sIG5ldyBVaW50OEFycmF5KGZpbGVSZWFkZXIucmVzdWx0KSlcblxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b1NhdmVUaW1lID4gMCAmJiB0aGlzLmZyYW1lcyAvIHRoaXMuc2V0dGluZ3MuZnJhbWVyYXRlID49IHRoaXMuc2V0dGluZ3MuYXV0b1NhdmVUaW1lKSB7XG4gICAgICAgIHRoaXMuc2F2ZShcbiAgICAgICAgICBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgICAgdGhpcy5maWxlbmFtZSA9IHRoaXMuYmFzZUZpbGVuYW1lICsgJy1wYXJ0LScgKyBwYWQodGhpcy5wYXJ0KVxuICAgICAgICAgICAgZG93bmxvYWQoYmxvYiwgdGhpcy5maWxlbmFtZSArIHRoaXMuZXh0ZW5zaW9uLCB0aGlzLm1pbWVUeXBlKVxuICAgICAgICAgICAgdmFyIGNvdW50ID0gdGhpcy5jb3VudFxuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKClcbiAgICAgICAgICAgIHRoaXMuY291bnQgPSBjb3VudCArIDFcbiAgICAgICAgICAgIHRoaXMucGFydCsrXG4gICAgICAgICAgICB0aGlzLmZpbGVuYW1lID0gdGhpcy5iYXNlRmlsZW5hbWUgKyAnLXBhcnQtJyArIHBhZCh0aGlzLnBhcnQpXG4gICAgICAgICAgICB0aGlzLmZyYW1lcyA9IDBcbiAgICAgICAgICAgIHRoaXMuc3RlcCgpXG4gICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY291bnQrK1xuICAgICAgICB0aGlzLmZyYW1lcysrXG4gICAgICAgIHRoaXMuc3RlcCgpXG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpXG4gICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICB9XG5cbiAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sodGhpcy50YXBlLnNhdmUoKSlcbiAgfVxuXG4gIENDVGFyRW5jb2Rlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRhcGUgPSBuZXcgVGFyKClcbiAgICB0aGlzLmNvdW50ID0gMFxuICB9XG5cbiAgZnVuY3Rpb24gQ0NQTkdFbmNvZGVyKHNldHRpbmdzKSB7XG4gICAgQ0NUYXJFbmNvZGVyLmNhbGwodGhpcywgc2V0dGluZ3MpXG5cbiAgICB0aGlzLnR5cGUgPSAnaW1hZ2UvcG5nJ1xuICAgIHRoaXMuZmlsZUV4dGVuc2lvbiA9ICcucG5nJ1xuICB9XG5cbiAgQ0NQTkdFbmNvZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ0NUYXJFbmNvZGVyLnByb3RvdHlwZSlcblxuICBDQ1BOR0VuY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICBjYW52YXMudG9CbG9iKFxuICAgICAgZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBibG9iKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy50eXBlXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gQ0NKUEVHRW5jb2RlcihzZXR0aW5ncykge1xuICAgIENDVGFyRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgdGhpcy50eXBlID0gJ2ltYWdlL2pwZWcnXG4gICAgdGhpcy5maWxlRXh0ZW5zaW9uID0gJy5qcGcnXG4gICAgdGhpcy5xdWFsaXR5ID0gc2V0dGluZ3MucXVhbGl0eSAvIDEwMCB8fCAwLjhcbiAgfVxuXG4gIENDSlBFR0VuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ1RhckVuY29kZXIucHJvdG90eXBlKVxuXG4gIENDSlBFR0VuY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICBjYW52YXMudG9CbG9iKFxuICAgICAgZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgQ0NUYXJFbmNvZGVyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBibG9iKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy50eXBlLFxuICAgICAgdGhpcy5xdWFsaXR5XG4gICAgKVxuICB9XG5cbiAgLypcblxuXHRXZWJNIEVuY29kZXJcblxuKi9cblxuICBmdW5jdGlvbiBDQ1dlYk1FbmNvZGVyKHNldHRpbmdzKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgaWYgKGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3dlYnAnKS5zdWJzdHIoNSwgMTApICE9PSAnaW1hZ2Uvd2VicCcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdXZWJQIG5vdCBzdXBwb3J0ZWQgLSB0cnkgYW5vdGhlciBleHBvcnQgZm9ybWF0JylcbiAgICB9XG5cbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgdGhpcy5xdWFsaXR5ID0gc2V0dGluZ3MucXVhbGl0eSAvIDEwMCB8fCAwLjhcblxuICAgIHRoaXMuZXh0ZW5zaW9uID0gJy53ZWJtJ1xuICAgIHRoaXMubWltZVR5cGUgPSAndmlkZW8vd2VibSdcbiAgICB0aGlzLmJhc2VGaWxlbmFtZSA9IHRoaXMuZmlsZW5hbWVcbiAgICB0aGlzLmZyYW1lcmF0ZSA9IHNldHRpbmdzLmZyYW1lcmF0ZVxuXG4gICAgdGhpcy5mcmFtZXMgPSAwXG4gICAgdGhpcy5wYXJ0ID0gMVxuXG4gICAgdGhpcy52aWRlb1dyaXRlciA9IG5ldyBXZWJNV3JpdGVyKHtcbiAgICAgIHF1YWxpdHk6IHRoaXMucXVhbGl0eSxcbiAgICAgIGZpbGVXcml0ZXI6IG51bGwsXG4gICAgICBmZDogbnVsbCxcbiAgICAgIGZyYW1lUmF0ZTogdGhpcy5mcmFtZXJhdGUsXG4gICAgfSlcbiAgfVxuXG4gIENDV2ViTUVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NXZWJNRW5jb2Rlci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgdGhpcy5kaXNwb3NlKClcbiAgfVxuXG4gIENDV2ViTUVuY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICB0aGlzLnZpZGVvV3JpdGVyLmFkZEZyYW1lKGNhbnZhcylcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9TYXZlVGltZSA+IDAgJiYgdGhpcy5mcmFtZXMgLyB0aGlzLnNldHRpbmdzLmZyYW1lcmF0ZSA+PSB0aGlzLnNldHRpbmdzLmF1dG9TYXZlVGltZSkge1xuICAgICAgdGhpcy5zYXZlKFxuICAgICAgICBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgIHRoaXMuZmlsZW5hbWUgPSB0aGlzLmJhc2VGaWxlbmFtZSArICctcGFydC0nICsgcGFkKHRoaXMucGFydClcbiAgICAgICAgICBkb3dubG9hZChibG9iLCB0aGlzLmZpbGVuYW1lICsgdGhpcy5leHRlbnNpb24sIHRoaXMubWltZVR5cGUpXG4gICAgICAgICAgdGhpcy5kaXNwb3NlKClcbiAgICAgICAgICB0aGlzLnBhcnQrK1xuICAgICAgICAgIHRoaXMuZmlsZW5hbWUgPSB0aGlzLmJhc2VGaWxlbmFtZSArICctcGFydC0nICsgcGFkKHRoaXMucGFydClcbiAgICAgICAgICB0aGlzLnN0ZXAoKVxuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mcmFtZXMrK1xuICAgICAgdGhpcy5zdGVwKClcbiAgICB9XG4gIH1cblxuICBDQ1dlYk1FbmNvZGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy52aWRlb1dyaXRlci5jb21wbGV0ZSgpLnRoZW4oY2FsbGJhY2spXG4gIH1cblxuICBDQ1dlYk1FbmNvZGVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKGNhbnZhcykge1xuICAgIHRoaXMuZnJhbWVzID0gMFxuICAgIHRoaXMudmlkZW9Xcml0ZXIgPSBuZXcgV2ViTVdyaXRlcih7XG4gICAgICBxdWFsaXR5OiB0aGlzLnF1YWxpdHksXG4gICAgICBmaWxlV3JpdGVyOiBudWxsLFxuICAgICAgZmQ6IG51bGwsXG4gICAgICBmcmFtZVJhdGU6IHRoaXMuZnJhbWVyYXRlLFxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBDQ0ZGTXBlZ1NlcnZlckVuY29kZXIoc2V0dGluZ3MpIHtcbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgc2V0dGluZ3MucXVhbGl0eSA9IHNldHRpbmdzLnF1YWxpdHkgLyAxMDAgfHwgMC44XG5cbiAgICB0aGlzLmVuY29kZXIgPSBuZXcgRkZNcGVnU2VydmVyLlZpZGVvKHNldHRpbmdzKVxuICAgIHRoaXMuZW5jb2Rlci5vbihcbiAgICAgICdwcm9jZXNzJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdwcm9jZXNzJylcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIClcbiAgICB0aGlzLmVuY29kZXIub24oXG4gICAgICAnZmluaXNoZWQnLFxuICAgICAgZnVuY3Rpb24gKHVybCwgc2l6ZSkge1xuICAgICAgICB2YXIgY2IgPSB0aGlzLmNhbGxiYWNrXG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSB1bmRlZmluZWRcbiAgICAgICAgICBjYih1cmwsIHNpemUpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIClcbiAgICB0aGlzLmVuY29kZXIub24oXG4gICAgICAncHJvZ3Jlc3MnLFxuICAgICAgZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MocHJvZ3Jlc3MpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIClcbiAgICB0aGlzLmVuY29kZXIub24oXG4gICAgICAnZXJyb3InLFxuICAgICAgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgYWxlcnQoSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpXG4gICAgICB9LmJpbmQodGhpcylcbiAgICApXG4gIH1cblxuICBDQ0ZGTXBlZ1NlcnZlckVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NGRk1wZWdTZXJ2ZXJFbmNvZGVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuY29kZXIuc3RhcnQodGhpcy5zZXR0aW5ncylcbiAgfVxuXG4gIENDRkZNcGVnU2VydmVyRW5jb2Rlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGNhbnZhcykge1xuICAgIHRoaXMuZW5jb2Rlci5hZGQoY2FudmFzKVxuICB9XG5cbiAgQ0NGRk1wZWdTZXJ2ZXJFbmNvZGVyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgdGhpcy5lbmNvZGVyLmVuZCgpXG4gIH1cblxuICBDQ0ZGTXBlZ1NlcnZlckVuY29kZXIucHJvdG90eXBlLnNhZmVUb1Byb2NlZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5jb2Rlci5zYWZlVG9Qcm9jZWVkKClcbiAgfVxuXG4gIC8qXG5cdEhUTUxDYW52YXNFbGVtZW50LmNhcHR1cmVTdHJlYW0oKVxuKi9cblxuICBmdW5jdGlvbiBDQ1N0cmVhbUVuY29kZXIoc2V0dGluZ3MpIHtcbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgdGhpcy5mcmFtZXJhdGUgPSB0aGlzLnNldHRpbmdzLmZyYW1lcmF0ZVxuICAgIHRoaXMudHlwZSA9ICd2aWRlby93ZWJtJ1xuICAgIHRoaXMuZXh0ZW5zaW9uID0gJy53ZWJtJ1xuICAgIHRoaXMuc3RyZWFtID0gbnVsbFxuICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG51bGxcbiAgICB0aGlzLmNodW5rcyA9IFtdXG4gIH1cblxuICBDQ1N0cmVhbUVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NTdHJlYW1FbmNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgaWYgKCF0aGlzLnN0cmVhbSkge1xuICAgICAgdGhpcy5zdHJlYW0gPSBjYW52YXMuY2FwdHVyZVN0cmVhbSh0aGlzLmZyYW1lcmF0ZSlcbiAgICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG5ldyBNZWRpYVJlY29yZGVyKHRoaXMuc3RyZWFtKVxuICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLnN0YXJ0KClcblxuICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuY2h1bmtzLnB1c2goZS5kYXRhKVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuc3RlcCgpXG4gIH1cblxuICBDQ1N0cmVhbUVuY29kZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLm1lZGlhUmVjb3JkZXIub25zdG9wID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBibG9iID0gbmV3IEJsb2IodGhpcy5jaHVua3MsIHsgdHlwZTogJ3ZpZGVvL3dlYm0nIH0pXG4gICAgICB0aGlzLmNodW5rcyA9IFtdXG4gICAgICBjYWxsYmFjayhibG9iKVxuICAgIH0uYmluZCh0aGlzKVxuXG4gICAgdGhpcy5tZWRpYVJlY29yZGVyLnN0b3AoKVxuICB9XG5cbiAgLypmdW5jdGlvbiBDQ0dJRkVuY29kZXIoIHNldHRpbmdzICkge1xuXG5cdENDRnJhbWVFbmNvZGVyLmNhbGwoIHRoaXMgKTtcblxuXHRzZXR0aW5ncy5xdWFsaXR5ID0gc2V0dGluZ3MucXVhbGl0eSB8fCA2O1xuXHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cblx0dGhpcy5lbmNvZGVyID0gbmV3IEdJRkVuY29kZXIoKTtcblx0dGhpcy5lbmNvZGVyLnNldFJlcGVhdCggMSApO1xuICBcdHRoaXMuZW5jb2Rlci5zZXREZWxheSggc2V0dGluZ3Muc3RlcCApO1xuICBcdHRoaXMuZW5jb2Rlci5zZXRRdWFsaXR5KCA2ICk7XG4gIFx0dGhpcy5lbmNvZGVyLnNldFRyYW5zcGFyZW50KCBudWxsICk7XG4gIFx0dGhpcy5lbmNvZGVyLnNldFNpemUoIDE1MCwgMTUwICk7XG5cbiAgXHR0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG4gIFx0dGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cbn1cblxuQ0NHSUZFbmNvZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIENDRnJhbWVFbmNvZGVyICk7XG5cbkNDR0lGRW5jb2Rlci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcblxuXHR0aGlzLmVuY29kZXIuc3RhcnQoKTtcblxufVxuXG5DQ0dJRkVuY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKCBjYW52YXMgKSB7XG5cblx0dGhpcy5jYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7XG5cdHRoaXMuY2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG5cdHRoaXMuY3R4LmRyYXdJbWFnZSggY2FudmFzLCAwLCAwICk7XG5cdHRoaXMuZW5jb2Rlci5hZGRGcmFtZSggdGhpcy5jdHggKTtcblxuXHR0aGlzLmVuY29kZXIuc2V0U2l6ZSggY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0ICk7XG5cdHZhciByZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoY2FudmFzLndpZHRoICogY2FudmFzLmhlaWdodCAqIDQpO1xuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnd2ViZ2wnICk7XG5cdGNvbnRleHQucmVhZFBpeGVscygwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIGNvbnRleHQuUkdCQSwgY29udGV4dC5VTlNJR05FRF9CWVRFLCByZWFkQnVmZmVyKTtcblx0dGhpcy5lbmNvZGVyLmFkZEZyYW1lKCByZWFkQnVmZmVyLCB0cnVlICk7XG5cbn1cblxuQ0NHSUZFbmNvZGVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG5cblx0dGhpcy5lbmNvZGVyLmZpbmlzaCgpO1xuXG59XG5cbkNDR0lGRW5jb2Rlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblxuXHR2YXIgYmluYXJ5X2dpZiA9IHRoaXMuZW5jb2Rlci5zdHJlYW0oKS5nZXREYXRhKCk7XG5cblx0dmFyIGRhdGFfdXJsID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCwnK2VuY29kZTY0KGJpbmFyeV9naWYpO1xuXHR3aW5kb3cubG9jYXRpb24gPSBkYXRhX3VybDtcblx0cmV0dXJuO1xuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoIFsgYmluYXJ5X2dpZiBdLCB7IHR5cGU6IFwib2N0ZXQvc3RyZWFtXCIgfSApO1xuXHR2YXIgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoIGJsb2IgKTtcblx0Y2FsbGJhY2soIHVybCApO1xuXG59Ki9cblxuICBmdW5jdGlvbiBDQ0dJRkVuY29kZXIoc2V0dGluZ3MpIHtcbiAgICBDQ0ZyYW1lRW5jb2Rlci5jYWxsKHRoaXMsIHNldHRpbmdzKVxuXG4gICAgc2V0dGluZ3MucXVhbGl0eSA9IDMxIC0gKChzZXR0aW5ncy5xdWFsaXR5ICogMzApIC8gMTAwIHx8IDEwKVxuICAgIHNldHRpbmdzLndvcmtlcnMgPSBzZXR0aW5ncy53b3JrZXJzIHx8IDRcblxuICAgIHRoaXMuZXh0ZW5zaW9uID0gJy5naWYnXG4gICAgdGhpcy5taW1lVHlwZSA9ICdpbWFnZS9naWYnXG5cbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgdGhpcy5zaXplU2V0ID0gZmFsc2VcblxuICAgIHRoaXMuZW5jb2RlciA9IG5ldyBHSUYoe1xuICAgICAgd29ya2Vyczogc2V0dGluZ3Mud29ya2VycyxcbiAgICAgIHF1YWxpdHk6IHNldHRpbmdzLnF1YWxpdHksXG4gICAgICB3b3JrZXJTY3JpcHQ6IHNldHRpbmdzLndvcmtlcnNQYXRoICsgJ2dpZi53b3JrZXIuanMnLFxuICAgIH0pXG5cbiAgICB0aGlzLmVuY29kZXIub24oXG4gICAgICAncHJvZ3Jlc3MnLFxuICAgICAgZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MocHJvZ3Jlc3MpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIClcblxuICAgIHRoaXMuZW5jb2Rlci5vbihcbiAgICAgICdmaW5pc2hlZCcsXG4gICAgICBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICB2YXIgY2IgPSB0aGlzLmNhbGxiYWNrXG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSB1bmRlZmluZWRcbiAgICAgICAgICBjYihibG9iKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApXG4gIH1cblxuICBDQ0dJRkVuY29kZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDQ0ZyYW1lRW5jb2Rlci5wcm90b3R5cGUpXG5cbiAgQ0NHSUZFbmNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgaWYgKCF0aGlzLnNpemVTZXQpIHtcbiAgICAgIHRoaXMuZW5jb2Rlci5zZXRPcHRpb24oJ3dpZHRoJywgY2FudmFzLndpZHRoKVxuICAgICAgdGhpcy5lbmNvZGVyLnNldE9wdGlvbignaGVpZ2h0JywgY2FudmFzLmhlaWdodClcbiAgICAgIHRoaXMuc2l6ZVNldCA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aFxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHRcbiAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwKVxuXG4gICAgdGhpcy5lbmNvZGVyLmFkZEZyYW1lKHRoaXMuY3R4LCB7IGNvcHk6IHRydWUsIGRlbGF5OiB0aGlzLnNldHRpbmdzLnN0ZXAgfSlcbiAgICB0aGlzLnN0ZXAoKVxuXG4gICAgLyp0aGlzLmVuY29kZXIuc2V0U2l6ZSggY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0ICk7XG5cdHZhciByZWFkQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoY2FudmFzLndpZHRoICogY2FudmFzLmhlaWdodCAqIDQpO1xuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnd2ViZ2wnICk7XG5cdGNvbnRleHQucmVhZFBpeGVscygwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIGNvbnRleHQuUkdCQSwgY29udGV4dC5VTlNJR05FRF9CWVRFLCByZWFkQnVmZmVyKTtcblx0dGhpcy5lbmNvZGVyLmFkZEZyYW1lKCByZWFkQnVmZmVyLCB0cnVlICk7Ki9cbiAgfVxuXG4gIENDR0lGRW5jb2Rlci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuXG4gICAgdGhpcy5lbmNvZGVyLnJlbmRlcigpXG4gIH1cblxuICBmdW5jdGlvbiBDQ2FwdHVyZShzZXR0aW5ncykge1xuICAgIHZhciBfc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCB7fSxcbiAgICAgIF9kYXRlID0gbmV3IERhdGUoKSxcbiAgICAgIF92ZXJib3NlLFxuICAgICAgX2Rpc3BsYXksXG4gICAgICBfdGltZSxcbiAgICAgIF9zdGFydFRpbWUsXG4gICAgICBfcGVyZm9ybWFuY2VUaW1lLFxuICAgICAgX3BlcmZvcm1hbmNlU3RhcnRUaW1lLFxuICAgICAgX3N0ZXAsXG4gICAgICBfZW5jb2RlcixcbiAgICAgIF90aW1lb3V0cyA9IFtdLFxuICAgICAgX2ludGVydmFscyA9IFtdLFxuICAgICAgX2ZyYW1lQ291bnQgPSAwLFxuICAgICAgX2ludGVybWVkaWF0ZUZyYW1lQ291bnQgPSAwLFxuICAgICAgX2xhc3RGcmFtZSA9IG51bGwsXG4gICAgICBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lQ2FsbGJhY2tzID0gW10sXG4gICAgICBfY2FwdHVyaW5nID0gZmFsc2UsXG4gICAgICBfaGFuZGxlcnMgPSB7fVxuXG4gICAgX3NldHRpbmdzLmZyYW1lcmF0ZSA9IF9zZXR0aW5ncy5mcmFtZXJhdGUgfHwgNjBcbiAgICBfc2V0dGluZ3MubW90aW9uQmx1ckZyYW1lcyA9IDIgKiAoX3NldHRpbmdzLm1vdGlvbkJsdXJGcmFtZXMgfHwgMSlcbiAgICBfdmVyYm9zZSA9IF9zZXR0aW5ncy52ZXJib3NlIHx8IGZhbHNlXG4gICAgX2Rpc3BsYXkgPSBfc2V0dGluZ3MuZGlzcGxheSB8fCBmYWxzZVxuICAgIF9zZXR0aW5ncy5zdGVwID0gMTAwMC4wIC8gX3NldHRpbmdzLmZyYW1lcmF0ZVxuICAgIF9zZXR0aW5ncy50aW1lTGltaXQgPSBfc2V0dGluZ3MudGltZUxpbWl0IHx8IDBcbiAgICBfc2V0dGluZ3MuZnJhbWVMaW1pdCA9IF9zZXR0aW5ncy5mcmFtZUxpbWl0IHx8IDBcbiAgICBfc2V0dGluZ3Muc3RhcnRUaW1lID0gX3NldHRpbmdzLnN0YXJ0VGltZSB8fCAwXG5cbiAgICB2YXIgX3RpbWVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBfdGltZURpc3BsYXkuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgX3RpbWVEaXNwbGF5LnN0eWxlLmxlZnQgPSBfdGltZURpc3BsYXkuc3R5bGUudG9wID0gMFxuICAgIF90aW1lRGlzcGxheS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snXG4gICAgX3RpbWVEaXNwbGF5LnN0eWxlLmZvbnRGYW1pbHkgPSAnbW9ub3NwYWNlJ1xuICAgIF90aW1lRGlzcGxheS5zdHlsZS5mb250U2l6ZSA9ICcxMXB4J1xuICAgIF90aW1lRGlzcGxheS5zdHlsZS5wYWRkaW5nID0gJzVweCdcbiAgICBfdGltZURpc3BsYXkuc3R5bGUuY29sb3IgPSAncmVkJ1xuICAgIF90aW1lRGlzcGxheS5zdHlsZS56SW5kZXggPSAxMDAwMDBcbiAgICBpZiAoX3NldHRpbmdzLmRpc3BsYXkpIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoX3RpbWVEaXNwbGF5KVxuXG4gICAgdmFyIGNhbnZhc01vdGlvbkJsdXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIHZhciBjdHhNb3Rpb25CbHVyID0gY2FudmFzTW90aW9uQmx1ci5nZXRDb250ZXh0KCcyZCcpXG4gICAgdmFyIGJ1ZmZlck1vdGlvbkJsdXJcbiAgICB2YXIgaW1hZ2VEYXRhXG5cbiAgICBfbG9nKCdTdGVwIGlzIHNldCB0byAnICsgX3NldHRpbmdzLnN0ZXAgKyAnbXMnKVxuXG4gICAgdmFyIF9lbmNvZGVycyA9IHtcbiAgICAgIGdpZjogQ0NHSUZFbmNvZGVyLFxuICAgICAgd2VibTogQ0NXZWJNRW5jb2RlcixcbiAgICAgIGZmbXBlZ3NlcnZlcjogQ0NGRk1wZWdTZXJ2ZXJFbmNvZGVyLFxuICAgICAgcG5nOiBDQ1BOR0VuY29kZXIsXG4gICAgICBqcGc6IENDSlBFR0VuY29kZXIsXG4gICAgICAnd2VibS1tZWRpYXJlY29yZGVyJzogQ0NTdHJlYW1FbmNvZGVyLFxuICAgIH1cblxuICAgIHZhciBjdG9yID0gX2VuY29kZXJzW19zZXR0aW5ncy5mb3JtYXRdXG4gICAgaWYgKCFjdG9yKSB7XG4gICAgICB0aHJvdyAnRXJyb3I6IEluY29ycmVjdCBvciBtaXNzaW5nIGZvcm1hdDogVmFsaWQgZm9ybWF0cyBhcmUgJyArIE9iamVjdC5rZXlzKF9lbmNvZGVycykuam9pbignLCAnKVxuICAgIH1cbiAgICBfZW5jb2RlciA9IG5ldyBjdG9yKF9zZXR0aW5ncylcbiAgICBfZW5jb2Rlci5zdGVwID0gX3N0ZXBcblxuICAgIF9lbmNvZGVyLm9uKCdwcm9jZXNzJywgX3Byb2Nlc3MpXG4gICAgX2VuY29kZXIub24oJ3Byb2dyZXNzJywgX3Byb2dyZXNzKVxuXG4gICAgaWYgKCdwZXJmb3JtYW5jZScgaW4gd2luZG93ID09IGZhbHNlKSB7XG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2UgPSB7fVxuICAgIH1cblxuICAgIERhdGUubm93ID1cbiAgICAgIERhdGUubm93IHx8XG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoYW5rcyBJRThcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICB9XG5cbiAgICBpZiAoJ25vdycgaW4gd2luZG93LnBlcmZvcm1hbmNlID09IGZhbHNlKSB7XG4gICAgICB2YXIgbm93T2Zmc2V0ID0gRGF0ZS5ub3coKVxuXG4gICAgICBpZiAocGVyZm9ybWFuY2UudGltaW5nICYmIHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQpIHtcbiAgICAgICAgbm93T2Zmc2V0ID0gcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydFxuICAgICAgfVxuXG4gICAgICB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID0gZnVuY3Rpb24gbm93KCkge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIG5vd09mZnNldFxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBfb2xkU2V0VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0LFxuICAgICAgX29sZFNldEludGVydmFsID0gd2luZG93LnNldEludGVydmFsLFxuICAgICAgX29sZENsZWFySW50ZXJ2YWwgPSB3aW5kb3cuY2xlYXJJbnRlcnZhbCxcbiAgICAgIF9vbGRDbGVhclRpbWVvdXQgPSB3aW5kb3cuY2xlYXJUaW1lb3V0LFxuICAgICAgX29sZFJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gICAgICBfb2xkTm93ID0gd2luZG93LkRhdGUubm93LFxuICAgICAgX29sZFBlcmZvcm1hbmNlTm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdyxcbiAgICAgIF9vbGRHZXRUaW1lID0gd2luZG93LkRhdGUucHJvdG90eXBlLmdldFRpbWVcbiAgICAvLyBEYXRlLnByb3RvdHlwZS5fb2xkR2V0VGltZSA9IERhdGUucHJvdG90eXBlLmdldFRpbWU7XG5cbiAgICB2YXIgbWVkaWEgPSBbXVxuXG4gICAgZnVuY3Rpb24gX2luaXQoKSB7XG4gICAgICBfbG9nKCdDYXB0dXJlciBzdGFydCcpXG5cbiAgICAgIF9zdGFydFRpbWUgPSB3aW5kb3cuRGF0ZS5ub3coKVxuICAgICAgX3RpbWUgPSBfc3RhcnRUaW1lICsgX3NldHRpbmdzLnN0YXJ0VGltZVxuICAgICAgX3BlcmZvcm1hbmNlU3RhcnRUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgICBfcGVyZm9ybWFuY2VUaW1lID0gX3BlcmZvcm1hbmNlU3RhcnRUaW1lICsgX3NldHRpbmdzLnN0YXJ0VGltZVxuXG4gICAgICB3aW5kb3cuRGF0ZS5wcm90b3R5cGUuZ2V0VGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aW1lXG4gICAgICB9XG4gICAgICB3aW5kb3cuRGF0ZS5ub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGltZVxuICAgICAgfVxuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGltZSkge1xuICAgICAgICB2YXIgdCA9IHtcbiAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgICAgdGltZTogdGltZSxcbiAgICAgICAgICB0cmlnZ2VyVGltZTogX3RpbWUgKyB0aW1lLFxuICAgICAgICB9XG4gICAgICAgIF90aW1lb3V0cy5wdXNoKHQpXG4gICAgICAgIF9sb2coJ1RpbWVvdXQgc2V0IHRvICcgKyB0LnRpbWUpXG4gICAgICAgIHJldHVybiB0XG4gICAgICB9XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgX3RpbWVvdXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKF90aW1lb3V0c1tqXSA9PSBpZCkge1xuICAgICAgICAgICAgX3RpbWVvdXRzLnNwbGljZShqLCAxKVxuICAgICAgICAgICAgX2xvZygnVGltZW91dCBjbGVhcmVkJylcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRpbWUpIHtcbiAgICAgICAgdmFyIHQgPSB7XG4gICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgIHRpbWU6IHRpbWUsXG4gICAgICAgICAgdHJpZ2dlclRpbWU6IF90aW1lICsgdGltZSxcbiAgICAgICAgfVxuICAgICAgICBfaW50ZXJ2YWxzLnB1c2godClcbiAgICAgICAgX2xvZygnSW50ZXJ2YWwgc2V0IHRvICcgKyB0LnRpbWUpXG4gICAgICAgIHJldHVybiB0XG4gICAgICB9XG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBfbG9nKCdjbGVhciBJbnRlcnZhbCcpXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVDYWxsYmFja3MucHVzaChjYWxsYmFjaylcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfcGVyZm9ybWFuY2VUaW1lXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhvb2tDdXJyZW50VGltZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9ob29rZWQpIHtcbiAgICAgICAgICB0aGlzLl9ob29rZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5faG9va2VkVGltZSA9IHRoaXMuY3VycmVudFRpbWUgfHwgMFxuICAgICAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgICAgIG1lZGlhLnB1c2godGhpcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faG9va2VkVGltZSArIF9zZXR0aW5ncy5zdGFydFRpbWVcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxWaWRlb0VsZW1lbnQucHJvdG90eXBlLCAnY3VycmVudFRpbWUnLCB7IGdldDogaG9va0N1cnJlbnRUaW1lIH0pXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MQXVkaW9FbGVtZW50LnByb3RvdHlwZSwgJ2N1cnJlbnRUaW1lJywgeyBnZXQ6IGhvb2tDdXJyZW50VGltZSB9KVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9sb2coZXJyKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9zdGFydCgpIHtcbiAgICAgIF9pbml0KClcbiAgICAgIF9lbmNvZGVyLnN0YXJ0KClcbiAgICAgIF9jYXB0dXJpbmcgPSB0cnVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3N0b3AoKSB7XG4gICAgICBfY2FwdHVyaW5nID0gZmFsc2VcbiAgICAgIF9lbmNvZGVyLnN0b3AoKVxuICAgICAgX2Rlc3Ryb3koKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jYWxsKGZuLCBwKSB7XG4gICAgICBfb2xkU2V0VGltZW91dChmbiwgMCwgcClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc3RlcCgpIHtcbiAgICAgIC8vX29sZFJlcXVlc3RBbmltYXRpb25GcmFtZSggX3Byb2Nlc3MgKTtcbiAgICAgIF9jYWxsKF9wcm9jZXNzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9kZXN0cm95KCkge1xuICAgICAgX2xvZygnQ2FwdHVyZXIgc3RvcCcpXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCA9IF9vbGRTZXRUaW1lb3V0XG4gICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwgPSBfb2xkU2V0SW50ZXJ2YWxcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsID0gX29sZENsZWFySW50ZXJ2YWxcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQgPSBfb2xkQ2xlYXJUaW1lb3V0XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gX29sZFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgd2luZG93LkRhdGUucHJvdG90eXBlLmdldFRpbWUgPSBfb2xkR2V0VGltZVxuICAgICAgd2luZG93LkRhdGUubm93ID0gX29sZE5vd1xuICAgICAgd2luZG93LnBlcmZvcm1hbmNlLm5vdyA9IF9vbGRQZXJmb3JtYW5jZU5vd1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF91cGRhdGVUaW1lKCkge1xuICAgICAgdmFyIHNlY29uZHMgPSBfZnJhbWVDb3VudCAvIF9zZXR0aW5ncy5mcmFtZXJhdGVcbiAgICAgIGlmIChcbiAgICAgICAgKF9zZXR0aW5ncy5mcmFtZUxpbWl0ICYmIF9mcmFtZUNvdW50ID49IF9zZXR0aW5ncy5mcmFtZUxpbWl0KSB8fFxuICAgICAgICAoX3NldHRpbmdzLnRpbWVMaW1pdCAmJiBzZWNvbmRzID49IF9zZXR0aW5ncy50aW1lTGltaXQpXG4gICAgICApIHtcbiAgICAgICAgX3N0b3AoKVxuICAgICAgICBfc2F2ZSgpXG4gICAgICB9XG4gICAgICB2YXIgZCA9IG5ldyBEYXRlKG51bGwpXG4gICAgICBkLnNldFNlY29uZHMoc2Vjb25kcylcbiAgICAgIGlmIChfc2V0dGluZ3MubW90aW9uQmx1ckZyYW1lcyA+IDIpIHtcbiAgICAgICAgX3RpbWVEaXNwbGF5LnRleHRDb250ZW50ID1cbiAgICAgICAgICAnQ0NhcHR1cmUgJyArXG4gICAgICAgICAgX3NldHRpbmdzLmZvcm1hdCArXG4gICAgICAgICAgJyB8ICcgK1xuICAgICAgICAgIF9mcmFtZUNvdW50ICtcbiAgICAgICAgICAnIGZyYW1lcyAoJyArXG4gICAgICAgICAgX2ludGVybWVkaWF0ZUZyYW1lQ291bnQgK1xuICAgICAgICAgICcgaW50ZXIpIHwgJyArXG4gICAgICAgICAgZC50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aW1lRGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgJ0NDYXB0dXJlICcgKyBfc2V0dGluZ3MuZm9ybWF0ICsgJyB8ICcgKyBfZnJhbWVDb3VudCArICcgZnJhbWVzIHwgJyArIGQudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2NoZWNrRnJhbWUoY2FudmFzKSB7XG4gICAgICBpZiAoY2FudmFzTW90aW9uQmx1ci53aWR0aCAhPT0gY2FudmFzLndpZHRoIHx8IGNhbnZhc01vdGlvbkJsdXIuaGVpZ2h0ICE9PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgIGNhbnZhc01vdGlvbkJsdXIud2lkdGggPSBjYW52YXMud2lkdGhcbiAgICAgICAgY2FudmFzTW90aW9uQmx1ci5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0XG4gICAgICAgIGJ1ZmZlck1vdGlvbkJsdXIgPSBuZXcgVWludDE2QXJyYXkoY2FudmFzTW90aW9uQmx1ci5oZWlnaHQgKiBjYW52YXNNb3Rpb25CbHVyLndpZHRoICogNClcbiAgICAgICAgY3R4TW90aW9uQmx1ci5maWxsU3R5bGUgPSAnIzAnXG4gICAgICAgIGN0eE1vdGlvbkJsdXIuZmlsbFJlY3QoMCwgMCwgY2FudmFzTW90aW9uQmx1ci53aWR0aCwgY2FudmFzTW90aW9uQmx1ci5oZWlnaHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2JsZW5kRnJhbWUoY2FudmFzKSB7XG4gICAgICAvL19sb2coICdJbnRlcm1lZGlhdGUgRnJhbWU6ICcgKyBfaW50ZXJtZWRpYXRlRnJhbWVDb3VudCApO1xuXG4gICAgICBjdHhNb3Rpb25CbHVyLmRyYXdJbWFnZShjYW52YXMsIDAsIDApXG4gICAgICBpbWFnZURhdGEgPSBjdHhNb3Rpb25CbHVyLmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXNNb3Rpb25CbHVyLndpZHRoLCBjYW52YXNNb3Rpb25CbHVyLmhlaWdodClcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYnVmZmVyTW90aW9uQmx1ci5sZW5ndGg7IGogKz0gNCkge1xuICAgICAgICBidWZmZXJNb3Rpb25CbHVyW2pdICs9IGltYWdlRGF0YS5kYXRhW2pdXG4gICAgICAgIGJ1ZmZlck1vdGlvbkJsdXJbaiArIDFdICs9IGltYWdlRGF0YS5kYXRhW2ogKyAxXVxuICAgICAgICBidWZmZXJNb3Rpb25CbHVyW2ogKyAyXSArPSBpbWFnZURhdGEuZGF0YVtqICsgMl1cbiAgICAgIH1cbiAgICAgIF9pbnRlcm1lZGlhdGVGcmFtZUNvdW50KytcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc2F2ZUZyYW1lKCkge1xuICAgICAgdmFyIGRhdGEgPSBpbWFnZURhdGEuZGF0YVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBidWZmZXJNb3Rpb25CbHVyLmxlbmd0aDsgaiArPSA0KSB7XG4gICAgICAgIGRhdGFbal0gPSAoYnVmZmVyTW90aW9uQmx1cltqXSAqIDIpIC8gX3NldHRpbmdzLm1vdGlvbkJsdXJGcmFtZXNcbiAgICAgICAgZGF0YVtqICsgMV0gPSAoYnVmZmVyTW90aW9uQmx1cltqICsgMV0gKiAyKSAvIF9zZXR0aW5ncy5tb3Rpb25CbHVyRnJhbWVzXG4gICAgICAgIGRhdGFbaiArIDJdID0gKGJ1ZmZlck1vdGlvbkJsdXJbaiArIDJdICogMikgLyBfc2V0dGluZ3MubW90aW9uQmx1ckZyYW1lc1xuICAgICAgfVxuICAgICAgY3R4TW90aW9uQmx1ci5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKVxuICAgICAgX2VuY29kZXIuYWRkKGNhbnZhc01vdGlvbkJsdXIpXG4gICAgICBfZnJhbWVDb3VudCsrXG4gICAgICBfaW50ZXJtZWRpYXRlRnJhbWVDb3VudCA9IDBcbiAgICAgIF9sb2coJ0Z1bGwgTUIgRnJhbWUhICcgKyBfZnJhbWVDb3VudCArICcgJyArIF90aW1lKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBidWZmZXJNb3Rpb25CbHVyLmxlbmd0aDsgaiArPSA0KSB7XG4gICAgICAgIGJ1ZmZlck1vdGlvbkJsdXJbal0gPSAwXG4gICAgICAgIGJ1ZmZlck1vdGlvbkJsdXJbaiArIDFdID0gMFxuICAgICAgICBidWZmZXJNb3Rpb25CbHVyW2ogKyAyXSA9IDBcbiAgICAgIH1cbiAgICAgIGdjKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfY2FwdHVyZShjYW52YXMpIHtcbiAgICAgIGlmIChfY2FwdHVyaW5nKSB7XG4gICAgICAgIGlmIChfc2V0dGluZ3MubW90aW9uQmx1ckZyYW1lcyA+IDIpIHtcbiAgICAgICAgICBfY2hlY2tGcmFtZShjYW52YXMpXG4gICAgICAgICAgX2JsZW5kRnJhbWUoY2FudmFzKVxuXG4gICAgICAgICAgaWYgKF9pbnRlcm1lZGlhdGVGcmFtZUNvdW50ID49IDAuNSAqIF9zZXR0aW5ncy5tb3Rpb25CbHVyRnJhbWVzKSB7XG4gICAgICAgICAgICBfc2F2ZUZyYW1lKClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3N0ZXAoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfZW5jb2Rlci5hZGQoY2FudmFzKVxuICAgICAgICAgIF9mcmFtZUNvdW50KytcbiAgICAgICAgICBfbG9nKCdGdWxsIEZyYW1lISAnICsgX2ZyYW1lQ291bnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcHJvY2VzcygpIHtcbiAgICAgIHZhciBzdGVwID0gMTAwMCAvIF9zZXR0aW5ncy5mcmFtZXJhdGVcbiAgICAgIHZhciBkdCA9IChfZnJhbWVDb3VudCArIF9pbnRlcm1lZGlhdGVGcmFtZUNvdW50IC8gX3NldHRpbmdzLm1vdGlvbkJsdXJGcmFtZXMpICogc3RlcFxuXG4gICAgICBfdGltZSA9IF9zdGFydFRpbWUgKyBkdFxuICAgICAgX3BlcmZvcm1hbmNlVGltZSA9IF9wZXJmb3JtYW5jZVN0YXJ0VGltZSArIGR0XG5cbiAgICAgIG1lZGlhLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdi5faG9va2VkVGltZSA9IGR0IC8gMTAwMFxuICAgICAgfSlcblxuICAgICAgX3VwZGF0ZVRpbWUoKVxuICAgICAgX2xvZygnRnJhbWU6ICcgKyBfZnJhbWVDb3VudCArICcgJyArIF9pbnRlcm1lZGlhdGVGcmFtZUNvdW50KVxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IF90aW1lb3V0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoX3RpbWUgPj0gX3RpbWVvdXRzW2pdLnRyaWdnZXJUaW1lKSB7XG4gICAgICAgICAgX2NhbGwoX3RpbWVvdXRzW2pdLmNhbGxiYWNrKVxuICAgICAgICAgIC8vY29uc29sZS5sb2coICd0aW1lb3V0IScgKTtcbiAgICAgICAgICBfdGltZW91dHMuc3BsaWNlKGosIDEpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9pbnRlcnZhbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKF90aW1lID49IF9pbnRlcnZhbHNbal0udHJpZ2dlclRpbWUpIHtcbiAgICAgICAgICBfY2FsbChfaW50ZXJ2YWxzW2pdLmNhbGxiYWNrKVxuICAgICAgICAgIF9pbnRlcnZhbHNbal0udHJpZ2dlclRpbWUgKz0gX2ludGVydmFsc1tqXS50aW1lXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyggJ2ludGVydmFsIScgKTtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgX2NhbGwoY2IsIF90aW1lIC0gZ19zdGFydFRpbWUpXG4gICAgICB9KVxuICAgICAgX3JlcXVlc3RBbmltYXRpb25GcmFtZUNhbGxiYWNrcyA9IFtdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3NhdmUoY2FsbGJhY2spIHtcbiAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgIGRvd25sb2FkKGJsb2IsIF9lbmNvZGVyLmZpbGVuYW1lICsgX2VuY29kZXIuZXh0ZW5zaW9uLCBfZW5jb2Rlci5taW1lVHlwZSlcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgX2VuY29kZXIuc2F2ZShjYWxsYmFjaylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfbG9nKG1lc3NhZ2UpIHtcbiAgICAgIGlmIChfdmVyYm9zZSkgY29uc29sZS5sb2cobWVzc2FnZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIF9oYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2VtaXQoZXZlbnQpIHtcbiAgICAgIHZhciBoYW5kbGVyID0gX2hhbmRsZXJzW2V2ZW50XVxuICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgaGFuZGxlci5hcHBseShudWxsLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9wcm9ncmVzcyhwcm9ncmVzcykge1xuICAgICAgX2VtaXQoJ3Byb2dyZXNzJywgcHJvZ3Jlc3MpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiBfc3RhcnQsXG4gICAgICBjYXB0dXJlOiBfY2FwdHVyZSxcbiAgICAgIHN0b3A6IF9zdG9wLFxuICAgICAgc2F2ZTogX3NhdmUsXG4gICAgICBvbjogX29uLFxuICAgIH1cbiAgfVxuXG4gIDsoZnJlZVdpbmRvdyB8fCBmcmVlU2VsZiB8fCB7fSkuQ0NhcHR1cmUgPSBDQ2FwdHVyZVxuXG4gIC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMgbGlrZSByLmpzIGNoZWNrIGZvciBjb25kaXRpb24gcGF0dGVybnMgbGlrZSB0aGUgZm9sbG93aW5nOlxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBEZWZpbmUgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSBzbywgdGhyb3VnaCBwYXRoIG1hcHBpbmcsIGl0IGNhbiBiZVxuICAgIC8vIHJlZmVyZW5jZWQgYXMgdGhlIFwidW5kZXJzY29yZVwiIG1vZHVsZS5cbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIENDYXB0dXJlXG4gICAgfSlcbiAgfVxuICAvLyBDaGVjayBmb3IgYGV4cG9ydHNgIGFmdGVyIGBkZWZpbmVgIGluIGNhc2UgYSBidWlsZCBvcHRpbWl6ZXIgYWRkcyBhbiBgZXhwb3J0c2Agb2JqZWN0LlxuICBlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiBmcmVlTW9kdWxlKSB7XG4gICAgLy8gRXhwb3J0IGZvciBOb2RlLmpzLlxuICAgIGlmIChtb2R1bGVFeHBvcnRzKSB7XG4gICAgICA7KGZyZWVNb2R1bGUuZXhwb3J0cyA9IENDYXB0dXJlKS5DQ2FwdHVyZSA9IENDYXB0dXJlXG4gICAgfVxuICAgIC8vIEV4cG9ydCBmb3IgQ29tbW9uSlMgc3VwcG9ydC5cbiAgICBmcmVlRXhwb3J0cy5DQ2FwdHVyZSA9IENDYXB0dXJlXG4gIH0gZWxzZSB7XG4gICAgLy8gRXhwb3J0IHRvIHRoZSBnbG9iYWwgb2JqZWN0LlxuICAgIHJvb3QuQ0NhcHR1cmUgPSBDQ2FwdHVyZVxuICB9XG59KSgpXG4iXSwibmFtZXMiOlsidGhpcyIsInJlcXVpcmUkJDAiLCJkb3dubG9hZCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsImdsb2JhbCJdLCJtYXBwaW5ncyI6Ijs7O0FBQUMsQ0FBQyxZQUFZO0FBRWQ7QUFDQSxFQUFFLElBQUksTUFBTSxHQUFHO0FBQ2YsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBSSxHQUFHO0FBQ1AsSUFBRztBQUNILEVB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
