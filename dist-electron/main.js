import qs from "fs";
import $i from "path";
import Bp from "zlib";
import Zm from "crypto";
import { exec as Rd } from "child_process";
import { app as Ht, BrowserWindow as ji, ipcMain as Dt, dialog as Vm } from "electron";
import xn from "fs/promises";
import Ip from "stream";
import Gm from "events";
import Ym from "buffer";
import zs from "util";
import Km from "url";
import Qm from "os";
import Qe from "node:path";
import { fileURLToPath as Jm } from "node:url";
var re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ey(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ty(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var $r = { exports: {} }, Np = {
  /* The local file header */
  LOCHDR: 30,
  // LOC header size
  LOCSIG: 67324752,
  // "PK\003\004"
  LOCVER: 4,
  // version needed to extract
  LOCFLG: 6,
  // general purpose bit flag
  LOCHOW: 8,
  // compression method
  LOCTIM: 10,
  // modification time (2 bytes time, 2 bytes date)
  LOCCRC: 14,
  // uncompressed file crc-32 value
  LOCSIZ: 18,
  // compressed size
  LOCLEN: 22,
  // uncompressed size
  LOCNAM: 26,
  // filename length
  LOCEXT: 28,
  // extra field length
  /* The Data descriptor */
  EXTSIG: 134695760,
  // "PK\007\008"
  EXTHDR: 16,
  // EXT header size
  EXTCRC: 4,
  // uncompressed file crc-32 value
  EXTSIZ: 8,
  // compressed size
  EXTLEN: 12,
  // uncompressed size
  /* The central directory file header */
  CENHDR: 46,
  // CEN header size
  CENSIG: 33639248,
  // "PK\001\002"
  CENVEM: 4,
  // version made by
  CENVER: 6,
  // version needed to extract
  CENFLG: 8,
  // encrypt, decrypt flags
  CENHOW: 10,
  // compression method
  CENTIM: 12,
  // modification time (2 bytes time, 2 bytes date)
  CENCRC: 16,
  // uncompressed file crc-32 value
  CENSIZ: 20,
  // compressed size
  CENLEN: 24,
  // uncompressed size
  CENNAM: 28,
  // filename length
  CENEXT: 30,
  // extra field length
  CENCOM: 32,
  // file comment length
  CENDSK: 34,
  // volume number start
  CENATT: 36,
  // internal file attributes
  CENATX: 38,
  // external file attributes (host system dependent)
  CENOFF: 42,
  // LOC header offset
  /* The entries in the end of central directory */
  ENDHDR: 22,
  // END header size
  ENDSIG: 101010256,
  // "PK\005\006"
  ENDSUB: 8,
  // number of entries on this disk
  ENDTOT: 10,
  // total number of entries
  ENDSIZ: 12,
  // central directory size in bytes
  ENDOFF: 16,
  // offset of first CEN header
  ENDCOM: 20,
  // zip file comment length
  END64HDR: 20,
  // zip64 END header size
  END64SIG: 117853008,
  // zip64 Locator signature, "PK\006\007"
  END64START: 4,
  // number of the disk with the start of the zip64
  END64OFF: 8,
  // relative offset of the zip64 end of central directory
  END64NUMDISKS: 16,
  // total number of disks
  ZIP64SIG: 101075792,
  // zip64 signature, "PK\006\006"
  ZIP64HDR: 56,
  // zip64 record minimum size
  ZIP64LEAD: 12,
  // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
  ZIP64SIZE: 4,
  // zip64 size of the central directory record
  ZIP64VEM: 12,
  // zip64 version made by
  ZIP64VER: 14,
  // zip64 version needed to extract
  ZIP64DSK: 16,
  // zip64 number of this disk
  ZIP64DSKDIR: 20,
  // number of the disk with the start of the record directory
  ZIP64SUB: 24,
  // number of entries on this disk
  ZIP64TOT: 32,
  // total number of entries
  ZIP64SIZB: 40,
  // zip64 central directory size in bytes
  ZIP64OFF: 48,
  // offset of start of central directory with respect to the starting disk number
  ZIP64EXTRA: 56,
  // extensible data sector
  /* Compression methods */
  STORED: 0,
  // no compression
  SHRUNK: 1,
  // shrunk
  REDUCED1: 2,
  // reduced with compression factor 1
  REDUCED2: 3,
  // reduced with compression factor 2
  REDUCED3: 4,
  // reduced with compression factor 3
  REDUCED4: 5,
  // reduced with compression factor 4
  IMPLODED: 6,
  // imploded
  // 7 reserved for Tokenizing compression algorithm
  DEFLATED: 8,
  // deflated
  ENHANCED_DEFLATED: 9,
  // enhanced deflated
  PKWARE: 10,
  // PKWare DCL imploded
  // 11 reserved by PKWARE
  BZIP2: 12,
  //  compressed using BZIP2
  // 13 reserved by PKWARE
  LZMA: 14,
  // LZMA
  // 15-17 reserved by PKWARE
  IBM_TERSE: 18,
  // compressed using IBM TERSE
  IBM_LZ77: 19,
  // IBM LZ77 z
  AES_ENCRYPT: 99,
  // WinZIP AES encryption method
  /* General purpose bit flag */
  // values can obtained with expression 2**bitnr
  FLG_ENC: 1,
  // Bit 0: encrypted file
  FLG_COMP1: 2,
  // Bit 1, compression option
  FLG_COMP2: 4,
  // Bit 2, compression option
  FLG_DESC: 8,
  // Bit 3, data descriptor
  FLG_ENH: 16,
  // Bit 4, enhanced deflating
  FLG_PATCH: 32,
  // Bit 5, indicates that the file is compressed patched data.
  FLG_STR: 64,
  // Bit 6, strong encryption (patented)
  // Bits 7-10: Currently unused.
  FLG_EFS: 2048,
  // Bit 11: Language encoding flag (EFS)
  // Bit 12: Reserved by PKWARE for enhanced compression.
  // Bit 13: encrypted the Central Directory (patented).
  // Bits 14-15: Reserved by PKWARE.
  FLG_MSK: 4096,
  // mask header values
  /* Load type */
  FILE: 2,
  BUFFER: 1,
  NONE: 0,
  /* 4.5 Extensible data fields */
  EF_ID: 0,
  EF_SIZE: 2,
  /* Header IDs */
  ID_ZIP64: 1,
  ID_AVINFO: 7,
  ID_PFS: 8,
  ID_OS2: 9,
  ID_NTFS: 10,
  ID_OPENVMS: 12,
  ID_UNIX: 13,
  ID_FORK: 14,
  ID_PATCH: 15,
  ID_X509_PKCS7: 20,
  ID_X509_CERTID_F: 21,
  ID_X509_CERTID_C: 22,
  ID_STRONGENC: 23,
  ID_RECORD_MGT: 24,
  ID_X509_PKCS7_RL: 25,
  ID_IBM1: 101,
  ID_IBM2: 102,
  ID_POSZIP: 18064,
  EF_ZIP64_OR_32: 4294967295,
  EF_ZIP64_OR_16: 65535,
  EF_ZIP64_SUNCOMP: 0,
  EF_ZIP64_SCOMP: 8,
  EF_ZIP64_RHO: 16,
  EF_ZIP64_DSN: 24
}, fa = {};
(function(e) {
  const t = {
    /* Header error messages */
    INVALID_LOC: "Invalid LOC header (bad signature)",
    INVALID_CEN: "Invalid CEN header (bad signature)",
    INVALID_END: "Invalid END header (bad signature)",
    /* Descriptor */
    DESCRIPTOR_NOT_EXIST: "No descriptor present",
    DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
    DESCRIPTOR_FAULTY: "Descriptor data is malformed",
    /* ZipEntry error messages*/
    NO_DATA: "Nothing to decompress",
    BAD_CRC: "CRC32 checksum failed {0}",
    FILE_IN_THE_WAY: "There is a file in the way: {0}",
    UNKNOWN_METHOD: "Invalid/unsupported compression method",
    /* Inflater error messages */
    AVAIL_DATA: "inflate::Available inflate data did not terminate",
    INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
    TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
    INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
    INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
    INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
    INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
    INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
    INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
    INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
    /* ADM-ZIP error messages */
    CANT_EXTRACT_FILE: "Could not extract the file",
    CANT_OVERRIDE: "Target file already exists",
    DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
    NO_ZIP: "No zip file was loaded",
    NO_ENTRY: "Entry doesn't exist",
    DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
    FILE_NOT_FOUND: 'File not found: "{0}"',
    NOT_IMPLEMENTED: "Not implemented",
    INVALID_FILENAME: "Invalid filename",
    INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
    INVALID_PASS_PARAM: "Incompatible password parameter",
    WRONG_PASSWORD: "Wrong Password",
    /* ADM-ZIP */
    COMMENT_TOO_LONG: "Comment is too long",
    // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
    EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
  };
  function n(r) {
    return function(...i) {
      return i.length && (r = r.replace(/\{(\d)\}/g, (u, a) => i[a] || "")), new Error("ADM-ZIP: " + r);
    };
  }
  for (const r of Object.keys(t))
    e[r] = n(t[r]);
})(fa);
const ny = qs, We = $i, Od = Np, ry = fa, iy = typeof process == "object" && process.platform === "win32", Ld = (e) => typeof e == "object" && e !== null, Rp = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = 3988292384 ^ t >>> 1 : t >>>= 1;
  return t >>> 0;
});
function ke(e) {
  this.sep = We.sep, this.fs = ny, Ld(e) && Ld(e.fs) && typeof e.fs.statSync == "function" && (this.fs = e.fs);
}
var uy = ke;
ke.prototype.makeDir = function(e) {
  const t = this;
  function n(r) {
    let i = r.split(t.sep)[0];
    r.split(t.sep).forEach(function(u) {
      if (!(!u || u.substr(-1, 1) === ":")) {
        i += t.sep + u;
        var a;
        try {
          a = t.fs.statSync(i);
        } catch {
          t.fs.mkdirSync(i);
        }
        if (a && a.isFile()) throw ry.FILE_IN_THE_WAY(`"${i}"`);
      }
    });
  }
  n(e);
};
ke.prototype.writeFileTo = function(e, t, n, r) {
  const i = this;
  if (i.fs.existsSync(e)) {
    if (!n) return !1;
    var u = i.fs.statSync(e);
    if (u.isDirectory())
      return !1;
  }
  var a = We.dirname(e);
  i.fs.existsSync(a) || i.makeDir(a);
  var o;
  try {
    o = i.fs.openSync(e, "w", 438);
  } catch {
    i.fs.chmodSync(e, 438), o = i.fs.openSync(e, "w", 438);
  }
  if (o)
    try {
      i.fs.writeSync(o, t, 0, t.length, 0);
    } finally {
      i.fs.closeSync(o);
    }
  return i.fs.chmodSync(e, r || 438), !0;
};
ke.prototype.writeFileToAsync = function(e, t, n, r, i) {
  typeof r == "function" && (i = r, r = void 0);
  const u = this;
  u.fs.exists(e, function(a) {
    if (a && !n) return i(!1);
    u.fs.stat(e, function(o, c) {
      if (a && c.isDirectory())
        return i(!1);
      var s = We.dirname(e);
      u.fs.exists(s, function(f) {
        f || u.makeDir(s), u.fs.open(e, "w", 438, function(m, b) {
          m ? u.fs.chmod(e, 438, function() {
            u.fs.open(e, "w", 438, function(p, l) {
              u.fs.write(l, t, 0, t.length, 0, function() {
                u.fs.close(l, function() {
                  u.fs.chmod(e, r || 438, function() {
                    i(!0);
                  });
                });
              });
            });
          }) : b ? u.fs.write(b, t, 0, t.length, 0, function() {
            u.fs.close(b, function() {
              u.fs.chmod(e, r || 438, function() {
                i(!0);
              });
            });
          }) : u.fs.chmod(e, r || 438, function() {
            i(!0);
          });
        });
      });
    });
  });
};
ke.prototype.findFiles = function(e) {
  const t = this;
  function n(r, i, u) {
    let a = [];
    return t.fs.readdirSync(r).forEach(function(o) {
      const c = We.join(r, o), s = t.fs.statSync(c);
      a.push(We.normalize(c) + (s.isDirectory() ? t.sep : "")), s.isDirectory() && u && (a = a.concat(n(c, i, u)));
    }), a;
  }
  return n(e, void 0, !0);
};
ke.prototype.findFilesAsync = function(e, t) {
  const n = this;
  let r = [];
  n.fs.readdir(e, function(i, u) {
    if (i) return t(i);
    let a = u.length;
    if (!a) return t(null, r);
    u.forEach(function(o) {
      o = We.join(e, o), n.fs.stat(o, function(c, s) {
        if (c) return t(c);
        s && (r.push(We.normalize(o) + (s.isDirectory() ? n.sep : "")), s.isDirectory() ? n.findFilesAsync(o, function(f, m) {
          if (f) return t(f);
          r = r.concat(m), --a || t(null, r);
        }) : --a || t(null, r));
      });
    });
  });
};
ke.prototype.getAttributes = function() {
};
ke.prototype.setAttributes = function() {
};
ke.crc32update = function(e, t) {
  return Rp[(e ^ t) & 255] ^ e >>> 8;
};
ke.crc32 = function(e) {
  typeof e == "string" && (e = Buffer.from(e, "utf8"));
  let t = e.length, n = -1;
  for (let r = 0; r < t; ) n = ke.crc32update(n, e[r++]);
  return ~n >>> 0;
};
ke.methodToString = function(e) {
  switch (e) {
    case Od.STORED:
      return "STORED (" + e + ")";
    case Od.DEFLATED:
      return "DEFLATED (" + e + ")";
    default:
      return "UNSUPPORTED (" + e + ")";
  }
};
ke.canonical = function(e) {
  if (!e) return "";
  const t = We.posix.normalize("/" + e.split("\\").join("/"));
  return We.join(".", t);
};
ke.zipnamefix = function(e) {
  if (!e) return "";
  const t = We.posix.normalize("/" + e.split("\\").join("/"));
  return We.posix.join(".", t);
};
ke.findLast = function(e, t) {
  if (!Array.isArray(e)) throw new TypeError("arr is not array");
  const n = e.length >>> 0;
  for (let r = n - 1; r >= 0; r--)
    if (t(e[r], r, e))
      return e[r];
};
ke.sanitize = function(e, t) {
  e = We.resolve(We.normalize(e));
  for (var n = t.split("/"), r = 0, i = n.length; r < i; r++) {
    var u = We.normalize(We.join(e, n.slice(r, i).join(We.sep)));
    if (u.indexOf(e) === 0)
      return u;
  }
  return We.normalize(We.join(e, We.basename(t)));
};
ke.toBuffer = function(t, n) {
  return Buffer.isBuffer(t) ? t : t instanceof Uint8Array ? Buffer.from(t) : typeof t == "string" ? n(t) : Buffer.alloc(0);
};
ke.readBigUInt64LE = function(e, t) {
  var n = Buffer.from(e.slice(t, t + 8));
  return n.swap64(), parseInt(`0x${n.toString("hex")}`);
};
ke.fromDOS2Date = function(e) {
  return new Date((e >> 25 & 127) + 1980, Math.max((e >> 21 & 15) - 1, 0), Math.max(e >> 16 & 31, 1), e >> 11 & 31, e >> 5 & 63, (e & 31) << 1);
};
ke.fromDate2DOS = function(e) {
  let t = 0, n = 0;
  return e.getFullYear() > 1979 && (t = (e.getFullYear() - 1980 & 127) << 9 | e.getMonth() + 1 << 5 | e.getDate(), n = e.getHours() << 11 | e.getMinutes() << 5 | e.getSeconds() >> 1), t << 16 | n;
};
ke.isWin = iy;
ke.crcTable = Rp;
const ay = $i;
var oy = function(e, { fs: t }) {
  var n = e || "", r = u(), i = null;
  function u() {
    return {
      directory: !1,
      readonly: !1,
      hidden: !1,
      executable: !1,
      mtime: 0,
      atime: 0
    };
  }
  return n && t.existsSync(n) ? (i = t.statSync(n), r.directory = i.isDirectory(), r.mtime = i.mtime, r.atime = i.atime, r.executable = (73 & i.mode) !== 0, r.readonly = (128 & i.mode) === 0, r.hidden = ay.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
    get directory() {
      return r.directory;
    },
    get readOnly() {
      return r.readonly;
    },
    get hidden() {
      return r.hidden;
    },
    get mtime() {
      return r.mtime;
    },
    get atime() {
      return r.atime;
    },
    get executable() {
      return r.executable;
    },
    decodeAttributes: function() {
    },
    encodeAttributes: function() {
    },
    toJSON: function() {
      return {
        path: n,
        isDirectory: r.directory,
        isReadOnly: r.readonly,
        isHidden: r.hidden,
        isExecutable: r.executable,
        mTime: r.mtime,
        aTime: r.atime
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, cy = {
  efs: !0,
  encode: (e) => Buffer.from(e, "utf8"),
  decode: (e) => e.toString("utf8")
};
$r.exports = uy;
$r.exports.Constants = Np;
$r.exports.Errors = fa;
$r.exports.FileAttr = oy;
$r.exports.decoder = cy;
var Hi = $r.exports, da = {}, Un = Hi, J = Un.Constants, sy = function() {
  var e = 20, t = 10, n = 0, r = 0, i = 0, u = 0, a = 0, o = 0, c = 0, s = 0, f = 0, m = 0, b = 0, p = 0, l = 0;
  e |= Un.isWin ? 2560 : 768, n |= J.FLG_EFS;
  const g = {
    extraLen: 0
  }, D = (d) => Math.max(0, d) >>> 0, h = (d) => Math.max(0, d) & 255;
  return i = Un.fromDate2DOS(/* @__PURE__ */ new Date()), {
    get made() {
      return e;
    },
    set made(d) {
      e = d;
    },
    get version() {
      return t;
    },
    set version(d) {
      t = d;
    },
    get flags() {
      return n;
    },
    set flags(d) {
      n = d;
    },
    get flags_efs() {
      return (n & J.FLG_EFS) > 0;
    },
    set flags_efs(d) {
      d ? n |= J.FLG_EFS : n &= ~J.FLG_EFS;
    },
    get flags_desc() {
      return (n & J.FLG_DESC) > 0;
    },
    set flags_desc(d) {
      d ? n |= J.FLG_DESC : n &= ~J.FLG_DESC;
    },
    get method() {
      return r;
    },
    set method(d) {
      switch (d) {
        case J.STORED:
          this.version = 10;
        case J.DEFLATED:
        default:
          this.version = 20;
      }
      r = d;
    },
    get time() {
      return Un.fromDOS2Date(this.timeval);
    },
    set time(d) {
      this.timeval = Un.fromDate2DOS(d);
    },
    get timeval() {
      return i;
    },
    set timeval(d) {
      i = D(d);
    },
    get timeHighByte() {
      return h(i >>> 8);
    },
    get crc() {
      return u;
    },
    set crc(d) {
      u = D(d);
    },
    get compressedSize() {
      return a;
    },
    set compressedSize(d) {
      a = D(d);
    },
    get size() {
      return o;
    },
    set size(d) {
      o = D(d);
    },
    get fileNameLength() {
      return c;
    },
    set fileNameLength(d) {
      c = d;
    },
    get extraLength() {
      return s;
    },
    set extraLength(d) {
      s = d;
    },
    get extraLocalLength() {
      return g.extraLen;
    },
    set extraLocalLength(d) {
      g.extraLen = d;
    },
    get commentLength() {
      return f;
    },
    set commentLength(d) {
      f = d;
    },
    get diskNumStart() {
      return m;
    },
    set diskNumStart(d) {
      m = D(d);
    },
    get inAttr() {
      return b;
    },
    set inAttr(d) {
      b = D(d);
    },
    get attr() {
      return p;
    },
    set attr(d) {
      p = D(d);
    },
    // get Unix file permissions
    get fileAttr() {
      return (p || 0) >> 16 & 4095;
    },
    get offset() {
      return l;
    },
    set offset(d) {
      l = D(d);
    },
    get encrypted() {
      return (n & J.FLG_ENC) === J.FLG_ENC;
    },
    get centralHeaderSize() {
      return J.CENHDR + c + s + f;
    },
    get realDataOffset() {
      return l + J.LOCHDR + g.fnameLen + g.extraLen;
    },
    get localHeader() {
      return g;
    },
    loadLocalHeaderFromBinary: function(d) {
      var y = d.slice(l, l + J.LOCHDR);
      if (y.readUInt32LE(0) !== J.LOCSIG)
        throw Un.Errors.INVALID_LOC();
      g.version = y.readUInt16LE(J.LOCVER), g.flags = y.readUInt16LE(J.LOCFLG), g.method = y.readUInt16LE(J.LOCHOW), g.time = y.readUInt32LE(J.LOCTIM), g.crc = y.readUInt32LE(J.LOCCRC), g.compressedSize = y.readUInt32LE(J.LOCSIZ), g.size = y.readUInt32LE(J.LOCLEN), g.fnameLen = y.readUInt16LE(J.LOCNAM), g.extraLen = y.readUInt16LE(J.LOCEXT);
      const x = l + J.LOCHDR + g.fnameLen, v = x + g.extraLen;
      return d.slice(x, v);
    },
    loadFromBinary: function(d) {
      if (d.length !== J.CENHDR || d.readUInt32LE(0) !== J.CENSIG)
        throw Un.Errors.INVALID_CEN();
      e = d.readUInt16LE(J.CENVEM), t = d.readUInt16LE(J.CENVER), n = d.readUInt16LE(J.CENFLG), r = d.readUInt16LE(J.CENHOW), i = d.readUInt32LE(J.CENTIM), u = d.readUInt32LE(J.CENCRC), a = d.readUInt32LE(J.CENSIZ), o = d.readUInt32LE(J.CENLEN), c = d.readUInt16LE(J.CENNAM), s = d.readUInt16LE(J.CENEXT), f = d.readUInt16LE(J.CENCOM), m = d.readUInt16LE(J.CENDSK), b = d.readUInt16LE(J.CENATT), p = d.readUInt32LE(J.CENATX), l = d.readUInt32LE(J.CENOFF);
    },
    localHeaderToBinary: function() {
      var d = Buffer.alloc(J.LOCHDR);
      return d.writeUInt32LE(J.LOCSIG, 0), d.writeUInt16LE(t, J.LOCVER), d.writeUInt16LE(n, J.LOCFLG), d.writeUInt16LE(r, J.LOCHOW), d.writeUInt32LE(i, J.LOCTIM), d.writeUInt32LE(u, J.LOCCRC), d.writeUInt32LE(a, J.LOCSIZ), d.writeUInt32LE(o, J.LOCLEN), d.writeUInt16LE(c, J.LOCNAM), d.writeUInt16LE(g.extraLen, J.LOCEXT), d;
    },
    centralHeaderToBinary: function() {
      var d = Buffer.alloc(J.CENHDR + c + s + f);
      return d.writeUInt32LE(J.CENSIG, 0), d.writeUInt16LE(e, J.CENVEM), d.writeUInt16LE(t, J.CENVER), d.writeUInt16LE(n, J.CENFLG), d.writeUInt16LE(r, J.CENHOW), d.writeUInt32LE(i, J.CENTIM), d.writeUInt32LE(u, J.CENCRC), d.writeUInt32LE(a, J.CENSIZ), d.writeUInt32LE(o, J.CENLEN), d.writeUInt16LE(c, J.CENNAM), d.writeUInt16LE(s, J.CENEXT), d.writeUInt16LE(f, J.CENCOM), d.writeUInt16LE(m, J.CENDSK), d.writeUInt16LE(b, J.CENATT), d.writeUInt32LE(p, J.CENATX), d.writeUInt32LE(l, J.CENOFF), d;
    },
    toJSON: function() {
      const d = function(y) {
        return y + " bytes";
      };
      return {
        made: e,
        version: t,
        flags: n,
        method: Un.methodToString(r),
        time: this.time,
        crc: "0x" + u.toString(16).toUpperCase(),
        compressedSize: d(a),
        size: d(o),
        fileNameLength: d(c),
        extraLength: d(s),
        commentLength: d(f),
        diskNumStart: m,
        inAttr: b,
        attr: p,
        offset: l,
        centralHeaderSize: d(J.CENHDR + c + s + f)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, _r = Hi, we = _r.Constants, fy = function() {
  var e = 0, t = 0, n = 0, r = 0, i = 0;
  return {
    get diskEntries() {
      return e;
    },
    set diskEntries(u) {
      e = t = u;
    },
    get totalEntries() {
      return t;
    },
    set totalEntries(u) {
      t = e = u;
    },
    get size() {
      return n;
    },
    set size(u) {
      n = u;
    },
    get offset() {
      return r;
    },
    set offset(u) {
      r = u;
    },
    get commentLength() {
      return i;
    },
    set commentLength(u) {
      i = u;
    },
    get mainHeaderSize() {
      return we.ENDHDR + i;
    },
    loadFromBinary: function(u) {
      if ((u.length !== we.ENDHDR || u.readUInt32LE(0) !== we.ENDSIG) && (u.length < we.ZIP64HDR || u.readUInt32LE(0) !== we.ZIP64SIG))
        throw _r.Errors.INVALID_END();
      u.readUInt32LE(0) === we.ENDSIG ? (e = u.readUInt16LE(we.ENDSUB), t = u.readUInt16LE(we.ENDTOT), n = u.readUInt32LE(we.ENDSIZ), r = u.readUInt32LE(we.ENDOFF), i = u.readUInt16LE(we.ENDCOM)) : (e = _r.readBigUInt64LE(u, we.ZIP64SUB), t = _r.readBigUInt64LE(u, we.ZIP64TOT), n = _r.readBigUInt64LE(u, we.ZIP64SIZE), r = _r.readBigUInt64LE(u, we.ZIP64OFF), i = 0);
    },
    toBinary: function() {
      var u = Buffer.alloc(we.ENDHDR + i);
      return u.writeUInt32LE(we.ENDSIG, 0), u.writeUInt32LE(0, 4), u.writeUInt16LE(e, we.ENDSUB), u.writeUInt16LE(t, we.ENDTOT), u.writeUInt32LE(n, we.ENDSIZ), u.writeUInt32LE(r, we.ENDOFF), u.writeUInt16LE(i, we.ENDCOM), u.fill(" ", we.ENDHDR), u;
    },
    toJSON: function() {
      const u = function(a, o) {
        let c = a.toString(16).toUpperCase();
        for (; c.length < o; ) c = "0" + c;
        return "0x" + c;
      };
      return {
        diskEntries: e,
        totalEntries: t,
        size: n + " bytes",
        offset: u(r, 4),
        commentLength: i
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
};
da.EntryHeader = sy;
da.MainHeader = fy;
var la = {}, dy = function(e) {
  var t = Bp, n = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
  return {
    deflate: function() {
      return t.deflateRawSync(e, n);
    },
    deflateAsync: function(r) {
      var i = t.createDeflateRaw(n), u = [], a = 0;
      i.on("data", function(o) {
        u.push(o), a += o.length;
      }), i.on("end", function() {
        var o = Buffer.alloc(a), c = 0;
        o.fill(0);
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          f.copy(o, c), c += f.length;
        }
        r && r(o);
      }), i.end(e);
    }
  };
};
const ly = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
var hy = function(e, t) {
  var n = Bp;
  const r = ly >= 15 && t > 0 ? { maxOutputLength: t } : {};
  return {
    inflate: function() {
      return n.inflateRawSync(e, r);
    },
    inflateAsync: function(i) {
      var u = n.createInflateRaw(r), a = [], o = 0;
      u.on("data", function(c) {
        a.push(c), o += c.length;
      }), u.on("end", function() {
        var c = Buffer.alloc(o), s = 0;
        c.fill(0);
        for (var f = 0; f < a.length; f++) {
          var m = a[f];
          m.copy(c, s), s += m.length;
        }
        i && i(c);
      }), u.end(e);
    }
  };
};
const { randomFillSync: Wd } = Zm, py = fa, gy = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
  return t >>> 0;
}), Op = (e, t) => Math.imul(e, t) >>> 0, Md = (e, t) => gy[(e ^ t) & 255] ^ e >>> 8, xi = () => typeof Wd == "function" ? Wd(Buffer.alloc(12)) : xi.node();
xi.node = () => {
  const e = Buffer.alloc(12), t = e.length;
  for (let n = 0; n < t; n++) e[n] = Math.random() * 256 & 255;
  return e;
};
const Ou = {
  genSalt: xi
};
function ha(e) {
  const t = Buffer.isBuffer(e) ? e : Buffer.from(e);
  this.keys = new Uint32Array([305419896, 591751049, 878082192]);
  for (let n = 0; n < t.length; n++)
    this.updateKeys(t[n]);
}
ha.prototype.updateKeys = function(e) {
  const t = this.keys;
  return t[0] = Md(t[0], e), t[1] += t[0] & 255, t[1] = Op(t[1], 134775813) + 1, t[2] = Md(t[2], t[1] >>> 24), e;
};
ha.prototype.next = function() {
  const e = (this.keys[2] | 2) >>> 0;
  return Op(e, e ^ 1) >> 8 & 255;
};
function by(e) {
  const t = new ha(e);
  return function(n) {
    const r = Buffer.alloc(n.length);
    let i = 0;
    for (let u of n)
      r[i++] = t.updateKeys(u ^ t.next());
    return r;
  };
}
function my(e) {
  const t = new ha(e);
  return function(n, r, i = 0) {
    r || (r = Buffer.alloc(n.length));
    for (let u of n) {
      const a = t.next();
      r[i++] = u ^ a, t.updateKeys(u);
    }
    return r;
  };
}
function yy(e, t, n) {
  if (!e || !Buffer.isBuffer(e) || e.length < 12)
    return Buffer.alloc(0);
  const r = by(n), i = r(e.slice(0, 12)), u = (t.flags & 8) === 8 ? t.timeHighByte : t.crc >>> 24;
  if (i[11] !== u)
    throw py.WRONG_PASSWORD();
  return r(e.slice(12));
}
function Dy(e) {
  Buffer.isBuffer(e) && e.length >= 12 ? Ou.genSalt = function() {
    return e.slice(0, 12);
  } : e === "node" ? Ou.genSalt = xi.node : Ou.genSalt = xi;
}
function xy(e, t, n, r = !1) {
  e == null && (e = Buffer.alloc(0)), Buffer.isBuffer(e) || (e = Buffer.from(e.toString()));
  const i = my(n), u = Ou.genSalt();
  u[11] = t.crc >>> 24 & 255, r && (u[10] = t.crc >>> 16 & 255);
  const a = Buffer.alloc(e.length + 12);
  return i(u, a), i(e, a, 12);
}
var vy = { decrypt: yy, encrypt: xy, _salter: Dy };
la.Deflater = dy;
la.Inflater = hy;
la.ZipCrypto = vy;
var pe = Hi, _y = da, Ae = pe.Constants, vo = la, Lp = function(e, t) {
  var n = new _y.EntryHeader(), r = Buffer.alloc(0), i = Buffer.alloc(0), u = !1, a = null, o = Buffer.alloc(0), c = Buffer.alloc(0), s = !0;
  const f = e, m = typeof f.decoder == "object" ? f.decoder : pe.decoder;
  s = m.hasOwnProperty("efs") ? m.efs : !1;
  function b() {
    return !t || !(t instanceof Uint8Array) ? Buffer.alloc(0) : (c = n.loadLocalHeaderFromBinary(t), t.slice(n.realDataOffset, n.realDataOffset + n.compressedSize));
  }
  function p(y) {
    if (n.flags_desc) {
      const x = {}, v = n.realDataOffset + n.compressedSize;
      if (t.readUInt32LE(v) == Ae.LOCSIG || t.readUInt32LE(v) == Ae.CENSIG)
        throw pe.Errors.DESCRIPTOR_NOT_EXIST();
      if (t.readUInt32LE(v) == Ae.EXTSIG)
        x.crc = t.readUInt32LE(v + Ae.EXTCRC), x.compressedSize = t.readUInt32LE(v + Ae.EXTSIZ), x.size = t.readUInt32LE(v + Ae.EXTLEN);
      else if (t.readUInt16LE(v + 12) === 19280)
        x.crc = t.readUInt32LE(v + Ae.EXTCRC - 4), x.compressedSize = t.readUInt32LE(v + Ae.EXTSIZ - 4), x.size = t.readUInt32LE(v + Ae.EXTLEN - 4);
      else
        throw pe.Errors.DESCRIPTOR_UNKNOWN();
      if (x.compressedSize !== n.compressedSize || x.size !== n.size || x.crc !== n.crc)
        throw pe.Errors.DESCRIPTOR_FAULTY();
      if (pe.crc32(y) !== x.crc)
        return !1;
    } else if (pe.crc32(y) !== n.localHeader.crc)
      return !1;
    return !0;
  }
  function l(y, x, v) {
    if (typeof x > "u" && typeof y == "string" && (v = y, y = void 0), u)
      return y && x && x(Buffer.alloc(0), pe.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
    var _ = b();
    if (_.length === 0)
      return y && x && x(_), _;
    if (n.encrypted) {
      if (typeof v != "string" && !Buffer.isBuffer(v))
        throw pe.Errors.INVALID_PASS_PARAM();
      _ = vo.ZipCrypto.decrypt(_, n, v);
    }
    var w = Buffer.alloc(n.size);
    switch (n.method) {
      case pe.Constants.STORED:
        if (_.copy(w), p(w))
          return y && x && x(w), w;
        throw y && x && x(w, pe.Errors.BAD_CRC()), pe.Errors.BAD_CRC();
      case pe.Constants.DEFLATED:
        var A = new vo.Inflater(_, n.size);
        if (y)
          A.inflateAsync(function(B) {
            B.copy(B, 0), x && (p(B) ? x(B) : x(B, pe.Errors.BAD_CRC()));
          });
        else {
          if (A.inflate(w).copy(w, 0), !p(w))
            throw pe.Errors.BAD_CRC(`"${m.decode(r)}"`);
          return w;
        }
        break;
      default:
        throw y && x && x(Buffer.alloc(0), pe.Errors.UNKNOWN_METHOD()), pe.Errors.UNKNOWN_METHOD();
    }
  }
  function g(y, x) {
    if ((!a || !a.length) && Buffer.isBuffer(t))
      return y && x && x(b()), b();
    if (a.length && !u) {
      var v;
      switch (n.method) {
        case pe.Constants.STORED:
          return n.compressedSize = n.size, v = Buffer.alloc(a.length), a.copy(v), y && x && x(v), v;
        default:
        case pe.Constants.DEFLATED:
          var _ = new vo.Deflater(a);
          if (y)
            _.deflateAsync(function(A) {
              v = Buffer.alloc(A.length), n.compressedSize = A.length, A.copy(v), x && x(v);
            });
          else {
            var w = _.deflate();
            return n.compressedSize = w.length, w;
          }
          _ = null;
          break;
      }
    } else if (y && x)
      x(Buffer.alloc(0));
    else
      return Buffer.alloc(0);
  }
  function D(y, x) {
    return (y.readUInt32LE(x + 4) << 4) + y.readUInt32LE(x);
  }
  function h(y) {
    try {
      for (var x = 0, v, _, w; x + 4 < y.length; )
        v = y.readUInt16LE(x), x += 2, _ = y.readUInt16LE(x), x += 2, w = y.slice(x, x + _), x += _, Ae.ID_ZIP64 === v && d(w);
    } catch {
      throw pe.Errors.EXTRA_FIELD_PARSE_ERROR();
    }
  }
  function d(y) {
    var x, v, _, w;
    y.length >= Ae.EF_ZIP64_SCOMP && (x = D(y, Ae.EF_ZIP64_SUNCOMP), n.size === Ae.EF_ZIP64_OR_32 && (n.size = x)), y.length >= Ae.EF_ZIP64_RHO && (v = D(y, Ae.EF_ZIP64_SCOMP), n.compressedSize === Ae.EF_ZIP64_OR_32 && (n.compressedSize = v)), y.length >= Ae.EF_ZIP64_DSN && (_ = D(y, Ae.EF_ZIP64_RHO), n.offset === Ae.EF_ZIP64_OR_32 && (n.offset = _)), y.length >= Ae.EF_ZIP64_DSN + 4 && (w = y.readUInt32LE(Ae.EF_ZIP64_DSN), n.diskNumStart === Ae.EF_ZIP64_OR_16 && (n.diskNumStart = w));
  }
  return {
    get entryName() {
      return m.decode(r);
    },
    get rawEntryName() {
      return r;
    },
    set entryName(y) {
      r = pe.toBuffer(y, m.encode);
      var x = r[r.length - 1];
      u = x === 47 || x === 92, n.fileNameLength = r.length;
    },
    get efs() {
      return typeof s == "function" ? s(this.entryName) : s;
    },
    get extra() {
      return o;
    },
    set extra(y) {
      o = y, n.extraLength = y.length, h(y);
    },
    get comment() {
      return m.decode(i);
    },
    set comment(y) {
      if (i = pe.toBuffer(y, m.encode), n.commentLength = i.length, i.length > 65535) throw pe.Errors.COMMENT_TOO_LONG();
    },
    get name() {
      var y = m.decode(r);
      return u ? y.substr(y.length - 1).split("/").pop() : y.split("/").pop();
    },
    get isDirectory() {
      return u;
    },
    getCompressedData: function() {
      return g(!1, null);
    },
    getCompressedDataAsync: function(y) {
      g(!0, y);
    },
    setData: function(y) {
      a = pe.toBuffer(y, pe.decoder.encode), !u && a.length ? (n.size = a.length, n.method = pe.Constants.DEFLATED, n.crc = pe.crc32(y), n.changed = !0) : n.method = pe.Constants.STORED;
    },
    getData: function(y) {
      return n.changed ? a : l(!1, null, y);
    },
    getDataAsync: function(y, x) {
      n.changed ? y(a) : l(!0, y, x);
    },
    set attr(y) {
      n.attr = y;
    },
    get attr() {
      return n.attr;
    },
    set header(y) {
      n.loadFromBinary(y);
    },
    get header() {
      return n;
    },
    packCentralHeader: function() {
      n.flags_efs = this.efs, n.extraLength = o.length;
      var y = n.centralHeaderToBinary(), x = pe.Constants.CENHDR;
      return r.copy(y, x), x += r.length, o.copy(y, x), x += n.extraLength, i.copy(y, x), y;
    },
    packLocalHeader: function() {
      let y = 0;
      n.flags_efs = this.efs, n.extraLocalLength = c.length;
      const x = n.localHeaderToBinary(), v = Buffer.alloc(x.length + r.length + n.extraLocalLength);
      return x.copy(v, y), y += x.length, r.copy(v, y), y += r.length, c.copy(v, y), y += c.length, v;
    },
    toJSON: function() {
      const y = function(x) {
        return "<" + (x && x.length + " bytes buffer" || "null") + ">";
      };
      return {
        entryName: this.entryName,
        name: this.name,
        comment: this.comment,
        isDirectory: this.isDirectory,
        header: n.toJSON(),
        compressedData: y(t),
        data: y(a)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
};
const Pd = Lp, Ey = da, He = Hi;
var wy = function(e, t) {
  var n = [], r = {}, i = Buffer.alloc(0), u = new Ey.MainHeader(), a = !1;
  const o = /* @__PURE__ */ new Set(), c = t, { noSort: s, decoder: f } = c;
  e ? p(c.readEntries) : a = !0;
  function m() {
    const g = /* @__PURE__ */ new Set();
    for (const D of Object.keys(r)) {
      const h = D.split("/");
      if (h.pop(), !!h.length)
        for (let d = 0; d < h.length; d++) {
          const y = h.slice(0, d + 1).join("/") + "/";
          g.add(y);
        }
    }
    for (const D of g)
      if (!(D in r)) {
        const h = new Pd(c);
        h.entryName = D, h.attr = 16, h.temporary = !0, n.push(h), r[h.entryName] = h, o.add(h);
      }
  }
  function b() {
    if (a = !0, r = {}, u.diskEntries > (e.length - u.offset) / He.Constants.CENHDR)
      throw He.Errors.DISK_ENTRY_TOO_LARGE();
    n = new Array(u.diskEntries);
    for (var g = u.offset, D = 0; D < n.length; D++) {
      var h = g, d = new Pd(c, e);
      d.header = e.slice(h, h += He.Constants.CENHDR), d.entryName = e.slice(h, h += d.header.fileNameLength), d.header.extraLength && (d.extra = e.slice(h, h += d.header.extraLength)), d.header.commentLength && (d.comment = e.slice(h, h + d.header.commentLength)), g += d.header.centralHeaderSize, n[D] = d, r[d.entryName] = d;
    }
    o.clear(), m();
  }
  function p(g) {
    var D = e.length - He.Constants.ENDHDR, h = Math.max(0, D - 65535), d = h, y = e.length, x = -1, v = 0;
    for ((typeof c.trailingSpace == "boolean" ? c.trailingSpace : !1) && (h = 0), D; D >= d; D--)
      if (e[D] === 80) {
        if (e.readUInt32LE(D) === He.Constants.ENDSIG) {
          x = D, v = D, y = D + He.Constants.ENDHDR, d = D - He.Constants.END64HDR;
          continue;
        }
        if (e.readUInt32LE(D) === He.Constants.END64SIG) {
          d = h;
          continue;
        }
        if (e.readUInt32LE(D) === He.Constants.ZIP64SIG) {
          x = D, y = D + He.readBigUInt64LE(e, D + He.Constants.ZIP64SIZE) + He.Constants.ZIP64LEAD;
          break;
        }
      }
    if (x == -1) throw He.Errors.INVALID_FORMAT();
    u.loadFromBinary(e.slice(x, y)), u.commentLength && (i = e.slice(v + He.Constants.ENDHDR)), g && b();
  }
  function l() {
    n.length > 1 && !s && n.sort((g, D) => g.entryName.toLowerCase().localeCompare(D.entryName.toLowerCase()));
  }
  return {
    /**
     * Returns an array of ZipEntry objects existent in the current opened archive
     * @return Array
     */
    get entries() {
      return a || b(), n.filter((g) => !o.has(g));
    },
    /**
     * Archive comment
     * @return {String}
     */
    get comment() {
      return f.decode(i);
    },
    set comment(g) {
      i = He.toBuffer(g, f.encode), u.commentLength = i.length;
    },
    getEntryCount: function() {
      return a ? n.length : u.diskEntries;
    },
    forEach: function(g) {
      this.entries.forEach(g);
    },
    /**
     * Returns a reference to the entry with the given name or null if entry is inexistent
     *
     * @param entryName
     * @return ZipEntry
     */
    getEntry: function(g) {
      return a || b(), r[g] || null;
    },
    /**
     * Adds the given entry to the entry list
     *
     * @param entry
     */
    setEntry: function(g) {
      a || b(), n.push(g), r[g.entryName] = g, u.totalEntries = n.length;
    },
    /**
     * Removes the file with the given name from the entry list.
     *
     * If the entry is a directory, then all nested files and directories will be removed
     * @param entryName
     * @returns {void}
     */
    deleteFile: function(g, D = !0) {
      a || b();
      const h = r[g];
      this.getEntryChildren(h, D).map((y) => y.entryName).forEach(this.deleteEntry);
    },
    /**
     * Removes the entry with the given name from the entry list.
     *
     * @param {string} entryName
     * @returns {void}
     */
    deleteEntry: function(g) {
      a || b();
      const D = r[g], h = n.indexOf(D);
      h >= 0 && (n.splice(h, 1), delete r[g], u.totalEntries = n.length);
    },
    /**
     *  Iterates and returns all nested files and directories of the given entry
     *
     * @param entry
     * @return Array
     */
    getEntryChildren: function(g, D = !0) {
      if (a || b(), typeof g == "object")
        if (g.isDirectory && D) {
          const h = [], d = g.entryName;
          for (const y of n)
            y.entryName.startsWith(d) && h.push(y);
          return h;
        } else
          return [g];
      return [];
    },
    /**
     *  How many child elements entry has
     *
     * @param {ZipEntry} entry
     * @return {integer}
     */
    getChildCount: function(g) {
      if (g && g.isDirectory) {
        const D = this.getEntryChildren(g);
        return D.includes(g) ? D.length - 1 : D.length;
      }
      return 0;
    },
    /**
     * Returns the zip file
     *
     * @return Buffer
     */
    compressToBuffer: function() {
      a || b(), l();
      const g = [], D = [];
      let h = 0, d = 0;
      u.size = 0, u.offset = 0;
      let y = 0;
      for (const _ of this.entries) {
        const w = _.getCompressedData();
        _.header.offset = d;
        const A = _.packLocalHeader(), B = A.length + w.length;
        d += B, g.push(A), g.push(w);
        const P = _.packCentralHeader();
        D.push(P), u.size += P.length, h += B + P.length, y++;
      }
      h += u.mainHeaderSize, u.offset = d, u.totalEntries = y, d = 0;
      const x = Buffer.alloc(h);
      for (const _ of g)
        _.copy(x, d), d += _.length;
      for (const _ of D)
        _.copy(x, d), d += _.length;
      const v = u.toBinary();
      return i && i.copy(v, He.Constants.ENDHDR), v.copy(x, d), e = x, a = !1, x;
    },
    toAsyncBuffer: function(g, D, h, d) {
      try {
        a || b(), l();
        const y = [], x = [];
        let v = 0, _ = 0, w = 0;
        u.size = 0, u.offset = 0;
        const A = function(B) {
          if (B.length > 0) {
            const P = B.shift(), L = P.entryName + P.extra.toString();
            h && h(L), P.getCompressedDataAsync(function(I) {
              d && d(L), P.header.offset = _;
              const z = P.packLocalHeader(), H = z.length + I.length;
              _ += H, y.push(z), y.push(I);
              const G = P.packCentralHeader();
              x.push(G), u.size += G.length, v += H + G.length, w++, A(B);
            });
          } else {
            v += u.mainHeaderSize, u.offset = _, u.totalEntries = w, _ = 0;
            const P = Buffer.alloc(v);
            y.forEach(function(I) {
              I.copy(P, _), _ += I.length;
            }), x.forEach(function(I) {
              I.copy(P, _), _ += I.length;
            });
            const L = u.toBinary();
            i && i.copy(L, He.Constants.ENDHDR), L.copy(P, _), e = P, a = !1, g(P);
          }
        };
        A(Array.from(this.entries));
      } catch (y) {
        D(y);
      }
    }
  };
};
const Te = Hi, Fe = $i, Uy = Lp, Ty = wy, Xn = (...e) => Te.findLast(e, (t) => typeof t == "boolean"), qd = (...e) => Te.findLast(e, (t) => typeof t == "string"), Cy = (...e) => Te.findLast(e, (t) => typeof t == "function"), Ay = {
  // option "noSort" : if true it disables files sorting
  noSort: !1,
  // read entries during load (initial loading may be slower)
  readEntries: !1,
  // default method is none
  method: Te.Constants.NONE,
  // file system
  fs: null
};
var Fy = function(e, t) {
  let n = null;
  const r = Object.assign(/* @__PURE__ */ Object.create(null), Ay);
  e && typeof e == "object" && (e instanceof Uint8Array || (Object.assign(r, e), e = r.input ? r.input : void 0, r.input && delete r.input), Buffer.isBuffer(e) && (n = e, r.method = Te.Constants.BUFFER, e = void 0)), Object.assign(r, t);
  const i = new Te(r);
  if ((typeof r.decoder != "object" || typeof r.decoder.encode != "function" || typeof r.decoder.decode != "function") && (r.decoder = Te.decoder), e && typeof e == "string")
    if (i.fs.existsSync(e))
      r.method = Te.Constants.FILE, r.filename = e, n = i.fs.readFileSync(e);
    else
      throw Te.Errors.INVALID_FILENAME();
  const u = new Ty(n, r), { canonical: a, sanitize: o, zipnamefix: c } = Te;
  function s(p) {
    if (p && u) {
      var l;
      if (typeof p == "string" && (l = u.getEntry(Fe.posix.normalize(p))), typeof p == "object" && typeof p.entryName < "u" && typeof p.header < "u" && (l = u.getEntry(p.entryName)), l)
        return l;
    }
    return null;
  }
  function f(p) {
    const { join: l, normalize: g, sep: D } = Fe.posix;
    return l(".", g(D + p.split("\\").join(D) + D));
  }
  function m(p) {
    return p instanceof RegExp ? /* @__PURE__ */ function(l) {
      return function(g) {
        return l.test(g);
      };
    }(p) : typeof p != "function" ? () => !0 : p;
  }
  const b = (p, l) => {
    let g = l.slice(-1);
    return g = g === i.sep ? i.sep : "", Fe.relative(p, l) + g;
  };
  return {
    /**
     * Extracts the given entry from the archive and returns the content as a Buffer object
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {Buffer|string} [pass] - password
     * @return Buffer or Null in case of error
     */
    readFile: function(p, l) {
      var g = s(p);
      return g && g.getData(l) || null;
    },
    /**
     * Returns how many child elements has on entry (directories) on files it is always 0
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @returns {integer}
     */
    childCount: function(p) {
      const l = s(p);
      if (l)
        return u.getChildCount(l);
    },
    /**
     * Asynchronous readFile
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {callback} callback
     *
     * @return Buffer or Null in case of error
     */
    readFileAsync: function(p, l) {
      var g = s(p);
      g ? g.getDataAsync(l) : l(null, "getEntry failed for:" + p);
    },
    /**
     * Extracts the given entry from the archive and returns the content as plain text in the given encoding
     * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
     * @param {string} encoding - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsText: function(p, l) {
      var g = s(p);
      if (g) {
        var D = g.getData();
        if (D && D.length)
          return D.toString(l || "utf8");
      }
      return "";
    },
    /**
     * Asynchronous readAsText
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {callback} callback
     * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsTextAsync: function(p, l, g) {
      var D = s(p);
      D ? D.getDataAsync(function(h, d) {
        if (d) {
          l(h, d);
          return;
        }
        h && h.length ? l(h.toString(g || "utf8")) : l("");
      }) : l("");
    },
    /**
     * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteFile: function(p, l = !0) {
      var g = s(p);
      g && u.deleteFile(g.entryName, l);
    },
    /**
     * Remove the entry from the file or directory without affecting any nested entries
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteEntry: function(p) {
      var l = s(p);
      l && u.deleteEntry(l.entryName);
    },
    /**
     * Adds a comment to the zip. The zip must be rewritten after adding the comment.
     *
     * @param {string} comment
     */
    addZipComment: function(p) {
      u.comment = p;
    },
    /**
     * Returns the zip comment
     *
     * @return String
     */
    getZipComment: function() {
      return u.comment || "";
    },
    /**
     * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
     * The comment cannot exceed 65535 characters in length
     *
     * @param {ZipEntry} entry
     * @param {string} comment
     */
    addZipEntryComment: function(p, l) {
      var g = s(p);
      g && (g.comment = l);
    },
    /**
     * Returns the comment of the specified entry
     *
     * @param {ZipEntry} entry
     * @return String
     */
    getZipEntryComment: function(p) {
      var l = s(p);
      return l && l.comment || "";
    },
    /**
     * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
     *
     * @param {ZipEntry} entry
     * @param {Buffer} content
     */
    updateFile: function(p, l) {
      var g = s(p);
      g && g.setData(l);
    },
    /**
     * Adds a file from the disk to the archive
     *
     * @param {string} localPath File to add to zip
     * @param {string} [zipPath] Optional path inside the zip
     * @param {string} [zipName] Optional name for the file
     * @param {string} [comment] Optional file comment
     */
    addLocalFile: function(p, l, g, D) {
      if (i.fs.existsSync(p)) {
        l = l ? f(l) : "";
        const h = Fe.win32.basename(Fe.win32.normalize(p));
        l += g || h;
        const d = i.fs.statSync(p), y = d.isFile() ? i.fs.readFileSync(p) : Buffer.alloc(0);
        d.isDirectory() && (l += i.sep), this.addFile(l, y, D, d);
      } else
        throw Te.Errors.FILE_NOT_FOUND(p);
    },
    /**
     * Callback for showing if everything was done.
     *
     * @callback doneCallback
     * @param {Error} err - Error object
     * @param {boolean} done - was request fully completed
     */
    /**
     * Adds a file from the disk to the archive
     *
     * @param {(object|string)} options - options object, if it is string it us used as localPath.
     * @param {string} options.localPath - Local path to the file.
     * @param {string} [options.comment] - Optional file comment.
     * @param {string} [options.zipPath] - Optional path inside the zip
     * @param {string} [options.zipName] - Optional name for the file
     * @param {doneCallback} callback - The callback that handles the response.
     */
    addLocalFileAsync: function(p, l) {
      p = typeof p == "object" ? p : { localPath: p };
      const g = Fe.resolve(p.localPath), { comment: D } = p;
      let { zipPath: h, zipName: d } = p;
      const y = this;
      i.fs.stat(g, function(x, v) {
        if (x) return l(x, !1);
        h = h ? f(h) : "";
        const _ = Fe.win32.basename(Fe.win32.normalize(g));
        if (h += d || _, v.isFile())
          i.fs.readFile(g, function(w, A) {
            return w ? l(w, !1) : (y.addFile(h, A, D, v), setImmediate(l, void 0, !0));
          });
        else if (v.isDirectory())
          return h += i.sep, y.addFile(h, Buffer.alloc(0), D, v), setImmediate(l, void 0, !0);
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - local path to the folder
     * @param {string} [zipPath] - optional path inside zip
     * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
     */
    addLocalFolder: function(p, l, g) {
      if (g = m(g), l = l ? f(l) : "", p = Fe.normalize(p), i.fs.existsSync(p)) {
        const D = i.findFiles(p), h = this;
        if (D.length)
          for (const d of D) {
            const y = Fe.join(l, b(p, d));
            g(y) && h.addLocalFile(d, Fe.dirname(y));
          }
      } else
        throw Te.Errors.FILE_NOT_FOUND(p);
    },
    /**
     * Asynchronous addLocalFolder
     * @param {string} localPath
     * @param {callback} callback
     * @param {string} [zipPath] optional path inside zip
     * @param {RegExp|function} [filter] optional RegExp or Function if files match will
     *               be included.
     */
    addLocalFolderAsync: function(p, l, g, D) {
      D = m(D), g = g ? f(g) : "", p = Fe.normalize(p);
      var h = this;
      i.fs.open(p, "r", function(d) {
        if (d && d.code === "ENOENT")
          l(void 0, Te.Errors.FILE_NOT_FOUND(p));
        else if (d)
          l(void 0, d);
        else {
          var y = i.findFiles(p), x = -1, v = function() {
            if (x += 1, x < y.length) {
              var _ = y[x], w = b(p, _).split("\\").join("/");
              w = w.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), D(w) ? i.fs.stat(_, function(A, B) {
                A && l(void 0, A), B.isFile() ? i.fs.readFile(_, function(P, L) {
                  P ? l(void 0, P) : (h.addFile(g + w, L, "", B), v());
                }) : (h.addFile(g + w + "/", Buffer.alloc(0), "", B), v());
              }) : process.nextTick(() => {
                v();
              });
            } else
              l(!0, void 0);
          };
          v();
        }
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {object | string} options - options object, if it is string it us used as localPath.
     * @param {string} options.localPath - Local path to the folder.
     * @param {string} [options.zipPath] - optional path inside zip.
     * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
     * @param {function|string} [options.namefix] - optional function to help fix filename
     * @param {doneCallback} callback - The callback that handles the response.
     *
     */
    addLocalFolderAsync2: function(p, l) {
      const g = this;
      p = typeof p == "object" ? p : { localPath: p }, localPath = Fe.resolve(f(p.localPath));
      let { zipPath: D, filter: h, namefix: d } = p;
      h instanceof RegExp ? h = /* @__PURE__ */ function(v) {
        return function(_) {
          return v.test(_);
        };
      }(h) : typeof h != "function" && (h = function() {
        return !0;
      }), D = D ? f(D) : "", d == "latin1" && (d = (v) => v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof d != "function" && (d = (v) => v);
      const y = (v) => Fe.join(D, d(b(localPath, v))), x = (v) => Fe.win32.basename(Fe.win32.normalize(d(v)));
      i.fs.open(localPath, "r", function(v) {
        v && v.code === "ENOENT" ? l(void 0, Te.Errors.FILE_NOT_FOUND(localPath)) : v ? l(void 0, v) : i.findFilesAsync(localPath, function(_, w) {
          if (_) return l(_);
          w = w.filter((A) => h(y(A))), w.length || l(void 0, !1), setImmediate(
            w.reverse().reduce(function(A, B) {
              return function(P, L) {
                if (P || L === !1) return setImmediate(A, P, !1);
                g.addLocalFileAsync(
                  {
                    localPath: B,
                    zipPath: Fe.dirname(y(B)),
                    zipName: x(B)
                  },
                  A
                );
              };
            }, l)
          );
        });
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - path where files will be extracted
     * @param {object} props - optional properties
     * @param {string} [props.zipPath] - optional path inside zip
     * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
     * @param {function|string} [props.namefix] - optional function to help fix filename
     */
    addLocalFolderPromise: function(p, l) {
      return new Promise((g, D) => {
        this.addLocalFolderAsync2(Object.assign({ localPath: p }, l), (h, d) => {
          h && D(h), d && g(this);
        });
      });
    },
    /**
     * Allows you to create a entry (file or directory) in the zip file.
     * If you want to create a directory the entryName must end in / and a null buffer should be provided.
     * Comment and attributes are optional
     *
     * @param {string} entryName
     * @param {Buffer | string} content - file content as buffer or utf8 coded string
     * @param {string} [comment] - file comment
     * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
     */
    addFile: function(p, l, g, D) {
      p = c(p);
      let h = s(p);
      const d = h != null;
      d || (h = new Uy(r), h.entryName = p), h.comment = g || "";
      const y = typeof D == "object" && D instanceof i.fs.Stats;
      y && (h.header.time = D.mtime);
      var x = h.isDirectory ? 16 : 0;
      let v = h.isDirectory ? 16384 : 32768;
      return y ? v |= 4095 & D.mode : typeof D == "number" ? v |= 4095 & D : v |= h.isDirectory ? 493 : 420, x = (x | v << 16) >>> 0, h.attr = x, h.setData(l), d || u.setEntry(h), h;
    },
    /**
     * Returns an array of ZipEntry objects representing the files and folders inside the archive
     *
     * @param {string} [password]
     * @returns Array
     */
    getEntries: function(p) {
      return u.password = p, u ? u.entries : [];
    },
    /**
     * Returns a ZipEntry object representing the file or folder specified by ``name``.
     *
     * @param {string} name
     * @return ZipEntry
     */
    getEntry: function(p) {
      return s(p);
    },
    getEntryCount: function() {
      return u.getEntryCount();
    },
    forEach: function(p) {
      return u.forEach(p);
    },
    /**
     * Extracts the given entry to the given targetPath
     * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
     *
     * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
     * @param {string} targetPath - Target folder where to write the file
     * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
     * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
     * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
     * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
     *
     * @return Boolean
     */
    extractEntryTo: function(p, l, g, D, h, d) {
      D = Xn(!1, D), h = Xn(!1, h), g = Xn(!0, g), d = qd(h, d);
      var y = s(p);
      if (!y)
        throw Te.Errors.NO_ENTRY();
      var x = a(y.entryName), v = o(l, d && !y.isDirectory ? d : g ? x : Fe.basename(x));
      if (y.isDirectory) {
        var _ = u.getEntryChildren(y);
        return _.forEach(function(B) {
          if (B.isDirectory) return;
          var P = B.getData();
          if (!P)
            throw Te.Errors.CANT_EXTRACT_FILE();
          var L = a(B.entryName), I = o(l, g ? L : Fe.basename(L));
          const z = h ? B.header.fileAttr : void 0;
          i.writeFileTo(I, P, D, z);
        }), !0;
      }
      var w = y.getData(u.password);
      if (!w) throw Te.Errors.CANT_EXTRACT_FILE();
      if (i.fs.existsSync(v) && !D)
        throw Te.Errors.CANT_OVERRIDE();
      const A = h ? p.header.fileAttr : void 0;
      return i.writeFileTo(v, w, D, A), !0;
    },
    /**
     * Test the archive
     * @param {string} [pass]
     */
    test: function(p) {
      if (!u)
        return !1;
      for (var l in u.entries)
        try {
          if (l.isDirectory)
            continue;
          var g = u.entries[l].getData(p);
          if (!g)
            return !1;
        } catch {
          return !1;
        }
      return !0;
    },
    /**
     * Extracts the entire archive to the given location
     *
     * @param {string} targetPath Target location
     * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
     *                  Default is FALSE
     * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
     *                  Default is FALSE
     * @param {string|Buffer} [pass] password
     */
    extractAllTo: function(p, l, g, D) {
      if (g = Xn(!1, g), D = qd(g, D), l = Xn(!1, l), !u) throw Te.Errors.NO_ZIP();
      u.entries.forEach(function(h) {
        var d = o(p, a(h.entryName));
        if (h.isDirectory) {
          i.makeDir(d);
          return;
        }
        var y = h.getData(D);
        if (!y)
          throw Te.Errors.CANT_EXTRACT_FILE();
        const x = g ? h.header.fileAttr : void 0;
        i.writeFileTo(d, y, l, x);
        try {
          i.fs.utimesSync(d, h.header.time, h.header.time);
        } catch {
          throw Te.Errors.CANT_EXTRACT_FILE();
        }
      });
    },
    /**
     * Asynchronous extractAllTo
     *
     * @param {string} targetPath Target location
     * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
     *                  Default is FALSE
     * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
     *                  Default is FALSE
     * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
     */
    extractAllToAsync: function(p, l, g, D) {
      if (D = Cy(l, g, D), g = Xn(!1, g), l = Xn(!1, l), !D)
        return new Promise((v, _) => {
          this.extractAllToAsync(p, l, g, function(w) {
            w ? _(w) : v(this);
          });
        });
      if (!u) {
        D(Te.Errors.NO_ZIP());
        return;
      }
      p = Fe.resolve(p);
      const h = (v) => o(p, Fe.normalize(a(v.entryName))), d = (v, _) => new Error(v + ': "' + _ + '"'), y = [], x = [];
      u.entries.forEach((v) => {
        v.isDirectory ? y.push(v) : x.push(v);
      });
      for (const v of y) {
        const _ = h(v), w = g ? v.header.fileAttr : void 0;
        try {
          i.makeDir(_), w && i.fs.chmodSync(_, w), i.fs.utimesSync(_, v.header.time, v.header.time);
        } catch {
          D(d("Unable to create folder", _));
        }
      }
      x.reverse().reduce(function(v, _) {
        return function(w) {
          if (w)
            v(w);
          else {
            const A = Fe.normalize(a(_.entryName)), B = o(p, A);
            _.getDataAsync(function(P, L) {
              if (L)
                v(L);
              else if (!P)
                v(Te.Errors.CANT_EXTRACT_FILE());
              else {
                const I = g ? _.header.fileAttr : void 0;
                i.writeFileToAsync(B, P, l, I, function(z) {
                  z || v(d("Unable to write file", B)), i.fs.utimes(B, _.header.time, _.header.time, function(H) {
                    H ? v(d("Unable to set times", B)) : v();
                  });
                });
              }
            });
          }
        };
      }, D)();
    },
    /**
     * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
     *
     * @param {string} targetFileName
     * @param {function} callback
     */
    writeZip: function(p, l) {
      if (arguments.length === 1 && typeof p == "function" && (l = p, p = ""), !p && r.filename && (p = r.filename), !!p) {
        var g = u.compressToBuffer();
        if (g) {
          var D = i.writeFileTo(p, g, !0);
          typeof l == "function" && l(D ? null : new Error("failed"), "");
        }
      }
    },
    /**
             *
             * @param {string} targetFileName
             * @param {object} [props]
             * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
             * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.
    
             * @returns {Promise<void>}
             */
    writeZipPromise: function(p, l) {
      const { overwrite: g, perm: D } = Object.assign({ overwrite: !0 }, l);
      return new Promise((h, d) => {
        !p && r.filename && (p = r.filename), p || d("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((y) => {
          const x = (v) => v ? h(v) : d("ADM-ZIP: Wasn't able to write zip file");
          i.writeFileToAsync(p, y, g, D, x);
        }, d);
      });
    },
    /**
     * @returns {Promise<Buffer>} A promise to the Buffer.
     */
    toBufferPromise: function() {
      return new Promise((p, l) => {
        u.toAsyncBuffer(p, l);
      });
    },
    /**
     * Returns the content of the entire zip file as a Buffer object
     *
     * @prop {function} [onSuccess]
     * @prop {function} [onFail]
     * @prop {function} [onItemStart]
     * @prop {function} [onItemEnd]
     * @returns {Buffer}
     */
    toBuffer: function(p, l, g, D) {
      return typeof p == "function" ? (u.toAsyncBuffer(p, l, g, D), null) : u.compressToBuffer();
    }
  };
};
const ky = /* @__PURE__ */ ey(Fy);
var Ft = {}, $s = "1.13.7", zd = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, pa = Array.prototype, js = Object.prototype, $d = typeof Symbol < "u" ? Symbol.prototype : null, Sy = pa.push, Xi = pa.slice, vi = js.toString, By = js.hasOwnProperty, Wp = typeof ArrayBuffer < "u", Iy = typeof DataView < "u", Ny = Array.isArray, jd = Object.keys, Hd = Object.create, Xd = Wp && ArrayBuffer.isView, Ry = isNaN, Oy = isFinite, Mp = !{ toString: null }.propertyIsEnumerable("toString"), Zd = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], Ly = Math.pow(2, 53) - 1;
function it(e, t) {
  return t = t == null ? e.length - 1 : +t, function() {
    for (var n = Math.max(arguments.length - t, 0), r = Array(n), i = 0; i < n; i++)
      r[i] = arguments[i + t];
    switch (t) {
      case 0:
        return e.call(this, r);
      case 1:
        return e.call(this, arguments[0], r);
      case 2:
        return e.call(this, arguments[0], arguments[1], r);
    }
    var u = Array(t + 1);
    for (i = 0; i < t; i++)
      u[i] = arguments[i];
    return u[t] = r, e.apply(this, u);
  };
}
function Pn(e) {
  var t = typeof e;
  return t === "function" || t === "object" && !!e;
}
function Pp(e) {
  return e === null;
}
function Hs(e) {
  return e === void 0;
}
function Xs(e) {
  return e === !0 || e === !1 || vi.call(e) === "[object Boolean]";
}
function qp(e) {
  return !!(e && e.nodeType === 1);
}
function tt(e) {
  var t = "[object " + e + "]";
  return function(n) {
    return vi.call(n) === t;
  };
}
const ga = tt("String"), Zs = tt("Number"), zp = tt("Date"), $p = tt("RegExp"), jp = tt("Error"), Vs = tt("Symbol"), Gs = tt("ArrayBuffer");
var Hp = tt("Function"), Wy = zd.document && zd.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof Wy != "function" && (Hp = function(e) {
  return typeof e == "function" || !1;
});
const et = Hp, Xp = tt("Object");
var Zp = Iy && (!/\[native code\]/.test(String(DataView)) || Xp(new DataView(new ArrayBuffer(8)))), Ys = typeof Map < "u" && Xp(/* @__PURE__ */ new Map()), My = tt("DataView");
function Py(e) {
  return e != null && et(e.getInt8) && Gs(e.buffer);
}
const _i = Zp ? Py : My, qn = Ny || tt("Array");
function zn(e, t) {
  return e != null && By.call(e, t);
}
var Ds = tt("Arguments");
(function() {
  Ds(arguments) || (Ds = function(e) {
    return zn(e, "callee");
  });
})();
const ba = Ds;
function Vp(e) {
  return !Vs(e) && Oy(e) && !isNaN(parseFloat(e));
}
function Ks(e) {
  return Zs(e) && Ry(e);
}
function Qs(e) {
  return function() {
    return e;
  };
}
function Gp(e) {
  return function(t) {
    var n = e(t);
    return typeof n == "number" && n >= 0 && n <= Ly;
  };
}
function Yp(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
const Xu = Yp("byteLength"), qy = Gp(Xu);
var zy = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function $y(e) {
  return Xd ? Xd(e) && !_i(e) : qy(e) && zy.test(vi.call(e));
}
const Js = Wp ? $y : Qs(!1), st = Yp("length");
function jy(e) {
  for (var t = {}, n = e.length, r = 0; r < n; ++r) t[e[r]] = !0;
  return {
    contains: function(i) {
      return t[i] === !0;
    },
    push: function(i) {
      return t[i] = !0, e.push(i);
    }
  };
}
function Kp(e, t) {
  t = jy(t);
  var n = Zd.length, r = e.constructor, i = et(r) && r.prototype || js, u = "constructor";
  for (zn(e, u) && !t.contains(u) && t.push(u); n--; )
    u = Zd[n], u in e && e[u] !== i[u] && !t.contains(u) && t.push(u);
}
function Pe(e) {
  if (!Pn(e)) return [];
  if (jd) return jd(e);
  var t = [];
  for (var n in e) zn(e, n) && t.push(n);
  return Mp && Kp(e, t), t;
}
function Qp(e) {
  if (e == null) return !0;
  var t = st(e);
  return typeof t == "number" && (qn(e) || ga(e) || ba(e)) ? t === 0 : st(Pe(e)) === 0;
}
function ef(e, t) {
  var n = Pe(t), r = n.length;
  if (e == null) return !r;
  for (var i = Object(e), u = 0; u < r; u++) {
    var a = n[u];
    if (t[a] !== i[a] || !(a in i)) return !1;
  }
  return !0;
}
function he(e) {
  if (e instanceof he) return e;
  if (!(this instanceof he)) return new he(e);
  this._wrapped = e;
}
he.VERSION = $s;
he.prototype.value = function() {
  return this._wrapped;
};
he.prototype.valueOf = he.prototype.toJSON = he.prototype.value;
he.prototype.toString = function() {
  return String(this._wrapped);
};
function Vd(e) {
  return new Uint8Array(
    e.buffer || e,
    e.byteOffset || 0,
    Xu(e)
  );
}
var Gd = "[object DataView]";
function xs(e, t, n, r) {
  if (e === t) return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null) return !1;
  if (e !== e) return t !== t;
  var i = typeof e;
  return i !== "function" && i !== "object" && typeof t != "object" ? !1 : Jp(e, t, n, r);
}
function Jp(e, t, n, r) {
  e instanceof he && (e = e._wrapped), t instanceof he && (t = t._wrapped);
  var i = vi.call(e);
  if (i !== vi.call(t)) return !1;
  if (Zp && i == "[object Object]" && _i(e)) {
    if (!_i(t)) return !1;
    i = Gd;
  }
  switch (i) {
    case "[object RegExp]":
    case "[object String]":
      return "" + e == "" + t;
    case "[object Number]":
      return +e != +e ? +t != +t : +e == 0 ? 1 / +e === 1 / t : +e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object Symbol]":
      return $d.valueOf.call(e) === $d.valueOf.call(t);
    case "[object ArrayBuffer]":
    case Gd:
      return Jp(Vd(e), Vd(t), n, r);
  }
  var u = i === "[object Array]";
  if (!u && Js(e)) {
    var a = Xu(e);
    if (a !== Xu(t)) return !1;
    if (e.buffer === t.buffer && e.byteOffset === t.byteOffset) return !0;
    u = !0;
  }
  if (!u) {
    if (typeof e != "object" || typeof t != "object") return !1;
    var o = e.constructor, c = t.constructor;
    if (o !== c && !(et(o) && o instanceof o && et(c) && c instanceof c) && "constructor" in e && "constructor" in t)
      return !1;
  }
  n = n || [], r = r || [];
  for (var s = n.length; s--; )
    if (n[s] === e) return r[s] === t;
  if (n.push(e), r.push(t), u) {
    if (s = e.length, s !== t.length) return !1;
    for (; s--; )
      if (!xs(e[s], t[s], n, r)) return !1;
  } else {
    var f = Pe(e), m;
    if (s = f.length, Pe(t).length !== s) return !1;
    for (; s--; )
      if (m = f[s], !(zn(t, m) && xs(e[m], t[m], n, r))) return !1;
  }
  return n.pop(), r.pop(), !0;
}
function e1(e, t) {
  return xs(e, t);
}
function jr(e) {
  if (!Pn(e)) return [];
  var t = [];
  for (var n in e) t.push(n);
  return Mp && Kp(e, t), t;
}
function tf(e) {
  var t = st(e);
  return function(n) {
    if (n == null) return !1;
    var r = jr(n);
    if (st(r)) return !1;
    for (var i = 0; i < t; i++)
      if (!et(n[e[i]])) return !1;
    return e !== r1 || !et(n[nf]);
  };
}
var nf = "forEach", t1 = "has", rf = ["clear", "delete"], n1 = ["get", t1, "set"], Hy = rf.concat(nf, n1), r1 = rf.concat(n1), Xy = ["add"].concat(rf, nf, t1);
const i1 = Ys ? tf(Hy) : tt("Map"), u1 = Ys ? tf(r1) : tt("WeakMap"), a1 = Ys ? tf(Xy) : tt("Set"), o1 = tt("WeakSet");
function or(e) {
  for (var t = Pe(e), n = t.length, r = Array(n), i = 0; i < n; i++)
    r[i] = e[t[i]];
  return r;
}
function c1(e) {
  for (var t = Pe(e), n = t.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [t[i], e[t[i]]];
  return r;
}
function uf(e) {
  for (var t = {}, n = Pe(e), r = 0, i = n.length; r < i; r++)
    t[e[n[r]]] = n[r];
  return t;
}
function Ei(e) {
  var t = [];
  for (var n in e)
    et(e[n]) && t.push(n);
  return t.sort();
}
function af(e, t) {
  return function(n) {
    var r = arguments.length;
    if (t && (n = Object(n)), r < 2 || n == null) return n;
    for (var i = 1; i < r; i++)
      for (var u = arguments[i], a = e(u), o = a.length, c = 0; c < o; c++) {
        var s = a[c];
        (!t || n[s] === void 0) && (n[s] = u[s]);
      }
    return n;
  };
}
const of = af(jr), Ir = af(Pe), cf = af(jr, !0);
function Zy() {
  return function() {
  };
}
function s1(e) {
  if (!Pn(e)) return {};
  if (Hd) return Hd(e);
  var t = Zy();
  t.prototype = e;
  var n = new t();
  return t.prototype = null, n;
}
function f1(e, t) {
  var n = s1(e);
  return t && Ir(n, t), n;
}
function d1(e) {
  return Pn(e) ? qn(e) ? e.slice() : of({}, e) : e;
}
function l1(e, t) {
  return t(e), e;
}
function sf(e) {
  return qn(e) ? e : [e];
}
he.toPath = sf;
function Zi(e) {
  return he.toPath(e);
}
function ff(e, t) {
  for (var n = t.length, r = 0; r < n; r++) {
    if (e == null) return;
    e = e[t[r]];
  }
  return n ? e : void 0;
}
function df(e, t, n) {
  var r = ff(e, Zi(t));
  return Hs(r) ? n : r;
}
function h1(e, t) {
  t = Zi(t);
  for (var n = t.length, r = 0; r < n; r++) {
    var i = t[r];
    if (!zn(e, i)) return !1;
    e = e[i];
  }
  return !!n;
}
function ma(e) {
  return e;
}
function Qn(e) {
  return e = Ir({}, e), function(t) {
    return ef(t, e);
  };
}
function ya(e) {
  return e = Zi(e), function(t) {
    return ff(t, e);
  };
}
function Vi(e, t, n) {
  if (t === void 0) return e;
  switch (n ?? 3) {
    case 1:
      return function(r) {
        return e.call(t, r);
      };
    case 3:
      return function(r, i, u) {
        return e.call(t, r, i, u);
      };
    case 4:
      return function(r, i, u, a) {
        return e.call(t, r, i, u, a);
      };
  }
  return function() {
    return e.apply(t, arguments);
  };
}
function p1(e, t, n) {
  return e == null ? ma : et(e) ? Vi(e, t, n) : Pn(e) && !qn(e) ? Qn(e) : ya(e);
}
function Da(e, t) {
  return p1(e, t, 1 / 0);
}
he.iteratee = Da;
function lt(e, t, n) {
  return he.iteratee !== Da ? he.iteratee(e, t) : p1(e, t, n);
}
function g1(e, t, n) {
  t = lt(t, n);
  for (var r = Pe(e), i = r.length, u = {}, a = 0; a < i; a++) {
    var o = r[a];
    u[o] = t(e[o], o, e);
  }
  return u;
}
function lf() {
}
function b1(e) {
  return e == null ? lf : function(t) {
    return df(e, t);
  };
}
function m1(e, t, n) {
  var r = Array(Math.max(0, e));
  t = Vi(t, n, 1);
  for (var i = 0; i < e; i++) r[i] = t(i);
  return r;
}
function Zu(e, t) {
  return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
}
const Nr = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function y1(e) {
  var t = function(u) {
    return e[u];
  }, n = "(?:" + Pe(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
  return function(u) {
    return u = u == null ? "" : "" + u, r.test(u) ? u.replace(i, t) : u;
  };
}
const D1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, x1 = y1(D1), Vy = uf(D1), v1 = y1(Vy), _1 = he.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var _o = /(.)^/, Gy = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, Yy = /\\|'|\r|\n|\u2028|\u2029/g;
function Ky(e) {
  return "\\" + Gy[e];
}
var Qy = /^\s*(\w|\$)+\s*$/;
function E1(e, t, n) {
  !t && n && (t = n), t = cf({}, t, he.templateSettings);
  var r = RegExp([
    (t.escape || _o).source,
    (t.interpolate || _o).source,
    (t.evaluate || _o).source
  ].join("|") + "|$", "g"), i = 0, u = "__p+='";
  e.replace(r, function(s, f, m, b, p) {
    return u += e.slice(i, p).replace(Yy, Ky), i = p + s.length, f ? u += `'+
((__t=(` + f + `))==null?'':_.escape(__t))+
'` : m ? u += `'+
((__t=(` + m + `))==null?'':__t)+
'` : b && (u += `';
` + b + `
__p+='`), s;
  }), u += `';
`;
  var a = t.variable;
  if (a) {
    if (!Qy.test(a)) throw new Error(
      "variable is not a bare identifier: " + a
    );
  } else
    u = `with(obj||{}){
` + u + `}
`, a = "obj";
  u = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` + u + `return __p;
`;
  var o;
  try {
    o = new Function(a, "_", u);
  } catch (s) {
    throw s.source = u, s;
  }
  var c = function(s) {
    return o.call(this, s, he);
  };
  return c.source = "function(" + a + `){
` + u + "}", c;
}
function w1(e, t, n) {
  t = Zi(t);
  var r = t.length;
  if (!r)
    return et(n) ? n.call(e) : n;
  for (var i = 0; i < r; i++) {
    var u = e == null ? void 0 : e[t[i]];
    u === void 0 && (u = n, i = r), e = et(u) ? u.call(e) : u;
  }
  return e;
}
var Jy = 0;
function U1(e) {
  var t = ++Jy + "";
  return e ? e + t : t;
}
function T1(e) {
  var t = he(e);
  return t._chain = !0, t;
}
function C1(e, t, n, r, i) {
  if (!(r instanceof t)) return e.apply(n, i);
  var u = s1(e.prototype), a = e.apply(u, i);
  return Pn(a) ? a : u;
}
var cr = it(function(e, t) {
  var n = cr.placeholder, r = function() {
    for (var i = 0, u = t.length, a = Array(u), o = 0; o < u; o++)
      a[o] = t[o] === n ? arguments[i++] : t[o];
    for (; i < arguments.length; ) a.push(arguments[i++]);
    return C1(e, r, this, this, a);
  };
  return r;
});
cr.placeholder = he;
const hf = it(function(e, t, n) {
  if (!et(e)) throw new TypeError("Bind must be called on a function");
  var r = it(function(i) {
    return C1(e, r, t, this, n.concat(i));
  });
  return r;
}), xt = Gp(st);
function sr(e, t, n, r) {
  if (r = r || [], !t && t !== 0)
    t = 1 / 0;
  else if (t <= 0)
    return r.concat(e);
  for (var i = r.length, u = 0, a = st(e); u < a; u++) {
    var o = e[u];
    if (xt(o) && (qn(o) || ba(o)))
      if (t > 1)
        sr(o, t - 1, n, r), i = r.length;
      else
        for (var c = 0, s = o.length; c < s; ) r[i++] = o[c++];
    else n || (r[i++] = o);
  }
  return r;
}
const A1 = it(function(e, t) {
  t = sr(t, !1, !1);
  var n = t.length;
  if (n < 1) throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = t[n];
    e[r] = hf(e[r], e);
  }
  return e;
});
function F1(e, t) {
  var n = function(r) {
    var i = n.cache, u = "" + (t ? t.apply(this, arguments) : r);
    return zn(i, u) || (i[u] = e.apply(this, arguments)), i[u];
  };
  return n.cache = {}, n;
}
const pf = it(function(e, t, n) {
  return setTimeout(function() {
    return e.apply(null, n);
  }, t);
}), k1 = cr(pf, he, 1);
function S1(e, t, n) {
  var r, i, u, a, o = 0;
  n || (n = {});
  var c = function() {
    o = n.leading === !1 ? 0 : Nr(), r = null, a = e.apply(i, u), r || (i = u = null);
  }, s = function() {
    var f = Nr();
    !o && n.leading === !1 && (o = f);
    var m = t - (f - o);
    return i = this, u = arguments, m <= 0 || m > t ? (r && (clearTimeout(r), r = null), o = f, a = e.apply(i, u), r || (i = u = null)) : !r && n.trailing !== !1 && (r = setTimeout(c, m)), a;
  };
  return s.cancel = function() {
    clearTimeout(r), o = 0, r = i = u = null;
  }, s;
}
function B1(e, t, n) {
  var r, i, u, a, o, c = function() {
    var f = Nr() - i;
    t > f ? r = setTimeout(c, t - f) : (r = null, n || (a = e.apply(o, u)), r || (u = o = null));
  }, s = it(function(f) {
    return o = this, u = f, i = Nr(), r || (r = setTimeout(c, t), n && (a = e.apply(o, u))), a;
  });
  return s.cancel = function() {
    clearTimeout(r), r = u = o = null;
  }, s;
}
function I1(e, t) {
  return cr(t, e);
}
function xa(e) {
  return function() {
    return !e.apply(this, arguments);
  };
}
function N1() {
  var e = arguments, t = e.length - 1;
  return function() {
    for (var n = t, r = e[t].apply(this, arguments); n--; ) r = e[n].call(this, r);
    return r;
  };
}
function R1(e, t) {
  return function() {
    if (--e < 1)
      return t.apply(this, arguments);
  };
}
function gf(e, t) {
  var n;
  return function() {
    return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n;
  };
}
const O1 = cr(gf, 2);
function bf(e, t, n) {
  t = lt(t, n);
  for (var r = Pe(e), i, u = 0, a = r.length; u < a; u++)
    if (i = r[u], t(e[i], i, e)) return i;
}
function L1(e) {
  return function(t, n, r) {
    n = lt(n, r);
    for (var i = st(t), u = e > 0 ? 0 : i - 1; u >= 0 && u < i; u += e)
      if (n(t[u], u, t)) return u;
    return -1;
  };
}
const va = L1(1), mf = L1(-1);
function yf(e, t, n, r) {
  n = lt(n, r, 1);
  for (var i = n(t), u = 0, a = st(e); u < a; ) {
    var o = Math.floor((u + a) / 2);
    n(e[o]) < i ? u = o + 1 : a = o;
  }
  return u;
}
function W1(e, t, n) {
  return function(r, i, u) {
    var a = 0, o = st(r);
    if (typeof u == "number")
      e > 0 ? a = u >= 0 ? u : Math.max(u + o, a) : o = u >= 0 ? Math.min(u + 1, o) : u + o + 1;
    else if (n && u && o)
      return u = n(r, i), r[u] === i ? u : -1;
    if (i !== i)
      return u = t(Xi.call(r, a, o), Ks), u >= 0 ? u + a : -1;
    for (u = e > 0 ? a : o - 1; u >= 0 && u < o; u += e)
      if (r[u] === i) return u;
    return -1;
  };
}
const Df = W1(1, va, yf), M1 = W1(-1, mf);
function wi(e, t, n) {
  var r = xt(e) ? va : bf, i = r(e, t, n);
  if (i !== void 0 && i !== -1) return e[i];
}
function P1(e, t) {
  return wi(e, Qn(t));
}
function Lt(e, t, n) {
  t = Vi(t, n);
  var r, i;
  if (xt(e))
    for (r = 0, i = e.length; r < i; r++)
      t(e[r], r, e);
  else {
    var u = Pe(e);
    for (r = 0, i = u.length; r < i; r++)
      t(e[u[r]], u[r], e);
  }
  return e;
}
function pn(e, t, n) {
  t = lt(t, n);
  for (var r = !xt(e) && Pe(e), i = (r || e).length, u = Array(i), a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    u[a] = t(e[o], o, e);
  }
  return u;
}
function q1(e) {
  var t = function(n, r, i, u) {
    var a = !xt(n) && Pe(n), o = (a || n).length, c = e > 0 ? 0 : o - 1;
    for (u || (i = n[a ? a[c] : c], c += e); c >= 0 && c < o; c += e) {
      var s = a ? a[c] : c;
      i = r(i, n[s], s, n);
    }
    return i;
  };
  return function(n, r, i, u) {
    var a = arguments.length >= 3;
    return t(n, Vi(r, u, 4), i, a);
  };
}
const Cr = q1(1), Vu = q1(-1);
function Ln(e, t, n) {
  var r = [];
  return t = lt(t, n), Lt(e, function(i, u, a) {
    t(i, u, a) && r.push(i);
  }), r;
}
function z1(e, t, n) {
  return Ln(e, xa(lt(t)), n);
}
function Gu(e, t, n) {
  t = lt(t, n);
  for (var r = !xt(e) && Pe(e), i = (r || e).length, u = 0; u < i; u++) {
    var a = r ? r[u] : u;
    if (!t(e[a], a, e)) return !1;
  }
  return !0;
}
function Yu(e, t, n) {
  t = lt(t, n);
  for (var r = !xt(e) && Pe(e), i = (r || e).length, u = 0; u < i; u++) {
    var a = r ? r[u] : u;
    if (t(e[a], a, e)) return !0;
  }
  return !1;
}
function Ut(e, t, n, r) {
  return xt(e) || (e = or(e)), (typeof n != "number" || r) && (n = 0), Df(e, t, n) >= 0;
}
const $1 = it(function(e, t, n) {
  var r, i;
  return et(t) ? i = t : (t = Zi(t), r = t.slice(0, -1), t = t[t.length - 1]), pn(e, function(u) {
    var a = i;
    if (!a) {
      if (r && r.length && (u = ff(u, r)), u == null) return;
      a = u[t];
    }
    return a == null ? a : a.apply(u, n);
  });
});
function _a(e, t) {
  return pn(e, ya(t));
}
function j1(e, t) {
  return Ln(e, Qn(t));
}
function xf(e, t, n) {
  var r = -1 / 0, i = -1 / 0, u, a;
  if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
    e = xt(e) ? e : or(e);
    for (var o = 0, c = e.length; o < c; o++)
      u = e[o], u != null && u > r && (r = u);
  } else
    t = lt(t, n), Lt(e, function(s, f, m) {
      a = t(s, f, m), (a > i || a === -1 / 0 && r === -1 / 0) && (r = s, i = a);
    });
  return r;
}
function H1(e, t, n) {
  var r = 1 / 0, i = 1 / 0, u, a;
  if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
    e = xt(e) ? e : or(e);
    for (var o = 0, c = e.length; o < c; o++)
      u = e[o], u != null && u < r && (r = u);
  } else
    t = lt(t, n), Lt(e, function(s, f, m) {
      a = t(s, f, m), (a < i || a === 1 / 0 && r === 1 / 0) && (r = s, i = a);
    });
  return r;
}
var eD = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function vf(e) {
  return e ? qn(e) ? Xi.call(e) : ga(e) ? e.match(eD) : xt(e) ? pn(e, ma) : or(e) : [];
}
function _f(e, t, n) {
  if (t == null || n)
    return xt(e) || (e = or(e)), e[Zu(e.length - 1)];
  var r = vf(e), i = st(r);
  t = Math.max(Math.min(t, i), 0);
  for (var u = i - 1, a = 0; a < t; a++) {
    var o = Zu(a, u), c = r[a];
    r[a] = r[o], r[o] = c;
  }
  return r.slice(0, t);
}
function X1(e) {
  return _f(e, 1 / 0);
}
function Z1(e, t, n) {
  var r = 0;
  return t = lt(t, n), _a(pn(e, function(i, u, a) {
    return {
      value: i,
      index: r++,
      criteria: t(i, u, a)
    };
  }).sort(function(i, u) {
    var a = i.criteria, o = u.criteria;
    if (a !== o) {
      if (a > o || a === void 0) return 1;
      if (a < o || o === void 0) return -1;
    }
    return i.index - u.index;
  }), "value");
}
function Ea(e, t) {
  return function(n, r, i) {
    var u = t ? [[], []] : {};
    return r = lt(r, i), Lt(n, function(a, o) {
      var c = r(a, o, n);
      e(u, a, c);
    }), u;
  };
}
const V1 = Ea(function(e, t, n) {
  zn(e, n) ? e[n].push(t) : e[n] = [t];
}), G1 = Ea(function(e, t, n) {
  e[n] = t;
}), Y1 = Ea(function(e, t, n) {
  zn(e, n) ? e[n]++ : e[n] = 1;
}), K1 = Ea(function(e, t, n) {
  e[n ? 0 : 1].push(t);
}, !0);
function Q1(e) {
  return e == null ? 0 : xt(e) ? e.length : Pe(e).length;
}
function tD(e, t, n) {
  return t in n;
}
const Ef = it(function(e, t) {
  var n = {}, r = t[0];
  if (e == null) return n;
  et(r) ? (t.length > 1 && (r = Vi(r, t[1])), t = jr(e)) : (r = tD, t = sr(t, !1, !1), e = Object(e));
  for (var i = 0, u = t.length; i < u; i++) {
    var a = t[i], o = e[a];
    r(o, a, e) && (n[a] = o);
  }
  return n;
}), J1 = it(function(e, t) {
  var n = t[0], r;
  return et(n) ? (n = xa(n), t.length > 1 && (r = t[1])) : (t = pn(sr(t, !1, !1), String), n = function(i, u) {
    return !Ut(t, u);
  }), Ef(e, n, r);
});
function wf(e, t, n) {
  return Xi.call(e, 0, Math.max(0, e.length - (t == null || n ? 1 : t)));
}
function Ar(e, t, n) {
  return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[0] : wf(e, e.length - t);
}
function Yn(e, t, n) {
  return Xi.call(e, t == null || n ? 1 : t);
}
function e2(e, t, n) {
  return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[e.length - 1] : Yn(e, Math.max(0, e.length - t));
}
function t2(e) {
  return Ln(e, Boolean);
}
function n2(e, t) {
  return sr(e, t, !1);
}
const Uf = it(function(e, t) {
  return t = sr(t, !0, !0), Ln(e, function(n) {
    return !Ut(t, n);
  });
}), r2 = it(function(e, t) {
  return Uf(e, t);
});
function Ui(e, t, n, r) {
  Xs(t) || (r = n, n = t, t = !1), n != null && (n = lt(n, r));
  for (var i = [], u = [], a = 0, o = st(e); a < o; a++) {
    var c = e[a], s = n ? n(c, a, e) : c;
    t && !n ? ((!a || u !== s) && i.push(c), u = s) : n ? Ut(u, s) || (u.push(s), i.push(c)) : Ut(i, c) || i.push(c);
  }
  return i;
}
const i2 = it(function(e) {
  return Ui(sr(e, !0, !0));
});
function u2(e) {
  for (var t = [], n = arguments.length, r = 0, i = st(e); r < i; r++) {
    var u = e[r];
    if (!Ut(t, u)) {
      var a;
      for (a = 1; a < n && Ut(arguments[a], u); a++)
        ;
      a === n && t.push(u);
    }
  }
  return t;
}
function Ti(e) {
  for (var t = e && xf(e, st).length || 0, n = Array(t), r = 0; r < t; r++)
    n[r] = _a(e, r);
  return n;
}
const a2 = it(Ti);
function o2(e, t) {
  for (var n = {}, r = 0, i = st(e); r < i; r++)
    t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
  return n;
}
function c2(e, t, n) {
  t == null && (t = e || 0, e = 0), n || (n = t < e ? -1 : 1);
  for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), u = 0; u < r; u++, e += n)
    i[u] = e;
  return i;
}
function s2(e, t) {
  if (t == null || t < 1) return [];
  for (var n = [], r = 0, i = e.length; r < i; )
    n.push(Xi.call(e, r, r += t));
  return n;
}
function Tf(e, t) {
  return e._chain ? he(t).chain() : t;
}
function Cf(e) {
  return Lt(Ei(e), function(t) {
    var n = he[t] = e[t];
    he.prototype[t] = function() {
      var r = [this._wrapped];
      return Sy.apply(r, arguments), Tf(this, n.apply(he, r));
    };
  }), he;
}
Lt(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
  var t = pa[e];
  he.prototype[e] = function() {
    var n = this._wrapped;
    return n != null && (t.apply(n, arguments), (e === "shift" || e === "splice") && n.length === 0 && delete n[0]), Tf(this, n);
  };
});
Lt(["concat", "join", "slice"], function(e) {
  var t = pa[e];
  he.prototype[e] = function() {
    var n = this._wrapped;
    return n != null && (n = t.apply(n, arguments)), Tf(this, n);
  };
});
const nD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: $s,
  after: R1,
  all: Gu,
  allKeys: jr,
  any: Yu,
  assign: Ir,
  before: gf,
  bind: hf,
  bindAll: A1,
  chain: T1,
  chunk: s2,
  clone: d1,
  collect: pn,
  compact: t2,
  compose: N1,
  constant: Qs,
  contains: Ut,
  countBy: Y1,
  create: f1,
  debounce: B1,
  default: he,
  defaults: cf,
  defer: k1,
  delay: pf,
  detect: wi,
  difference: Uf,
  drop: Yn,
  each: Lt,
  escape: x1,
  every: Gu,
  extend: of,
  extendOwn: Ir,
  filter: Ln,
  find: wi,
  findIndex: va,
  findKey: bf,
  findLastIndex: mf,
  findWhere: P1,
  first: Ar,
  flatten: n2,
  foldl: Cr,
  foldr: Vu,
  forEach: Lt,
  functions: Ei,
  get: df,
  groupBy: V1,
  has: h1,
  head: Ar,
  identity: ma,
  include: Ut,
  includes: Ut,
  indexBy: G1,
  indexOf: Df,
  initial: wf,
  inject: Cr,
  intersection: u2,
  invert: uf,
  invoke: $1,
  isArguments: ba,
  isArray: qn,
  isArrayBuffer: Gs,
  isBoolean: Xs,
  isDataView: _i,
  isDate: zp,
  isElement: qp,
  isEmpty: Qp,
  isEqual: e1,
  isError: jp,
  isFinite: Vp,
  isFunction: et,
  isMap: i1,
  isMatch: ef,
  isNaN: Ks,
  isNull: Pp,
  isNumber: Zs,
  isObject: Pn,
  isRegExp: $p,
  isSet: a1,
  isString: ga,
  isSymbol: Vs,
  isTypedArray: Js,
  isUndefined: Hs,
  isWeakMap: u1,
  isWeakSet: o1,
  iteratee: Da,
  keys: Pe,
  last: e2,
  lastIndexOf: M1,
  map: pn,
  mapObject: g1,
  matcher: Qn,
  matches: Qn,
  max: xf,
  memoize: F1,
  methods: Ei,
  min: H1,
  mixin: Cf,
  negate: xa,
  noop: lf,
  now: Nr,
  object: o2,
  omit: J1,
  once: O1,
  pairs: c1,
  partial: cr,
  partition: K1,
  pick: Ef,
  pluck: _a,
  property: ya,
  propertyOf: b1,
  random: Zu,
  range: c2,
  reduce: Cr,
  reduceRight: Vu,
  reject: z1,
  rest: Yn,
  restArguments: it,
  result: w1,
  sample: _f,
  select: Ln,
  shuffle: X1,
  size: Q1,
  some: Yu,
  sortBy: Z1,
  sortedIndex: yf,
  tail: Yn,
  take: Ar,
  tap: l1,
  template: E1,
  templateSettings: _1,
  throttle: S1,
  times: m1,
  toArray: vf,
  toPath: sf,
  transpose: Ti,
  unescape: v1,
  union: i2,
  uniq: Ui,
  unique: Ui,
  uniqueId: U1,
  unzip: Ti,
  values: or,
  where: j1,
  without: r2,
  wrap: I1,
  zip: a2
}, Symbol.toStringTag, { value: "Module" }));
var vs = Cf(nD);
vs._ = vs;
const rD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: $s,
  after: R1,
  all: Gu,
  allKeys: jr,
  any: Yu,
  assign: Ir,
  before: gf,
  bind: hf,
  bindAll: A1,
  chain: T1,
  chunk: s2,
  clone: d1,
  collect: pn,
  compact: t2,
  compose: N1,
  constant: Qs,
  contains: Ut,
  countBy: Y1,
  create: f1,
  debounce: B1,
  default: vs,
  defaults: cf,
  defer: k1,
  delay: pf,
  detect: wi,
  difference: Uf,
  drop: Yn,
  each: Lt,
  escape: x1,
  every: Gu,
  extend: of,
  extendOwn: Ir,
  filter: Ln,
  find: wi,
  findIndex: va,
  findKey: bf,
  findLastIndex: mf,
  findWhere: P1,
  first: Ar,
  flatten: n2,
  foldl: Cr,
  foldr: Vu,
  forEach: Lt,
  functions: Ei,
  get: df,
  groupBy: V1,
  has: h1,
  head: Ar,
  identity: ma,
  include: Ut,
  includes: Ut,
  indexBy: G1,
  indexOf: Df,
  initial: wf,
  inject: Cr,
  intersection: u2,
  invert: uf,
  invoke: $1,
  isArguments: ba,
  isArray: qn,
  isArrayBuffer: Gs,
  isBoolean: Xs,
  isDataView: _i,
  isDate: zp,
  isElement: qp,
  isEmpty: Qp,
  isEqual: e1,
  isError: jp,
  isFinite: Vp,
  isFunction: et,
  isMap: i1,
  isMatch: ef,
  isNaN: Ks,
  isNull: Pp,
  isNumber: Zs,
  isObject: Pn,
  isRegExp: $p,
  isSet: a1,
  isString: ga,
  isSymbol: Vs,
  isTypedArray: Js,
  isUndefined: Hs,
  isWeakMap: u1,
  isWeakSet: o1,
  iteratee: Da,
  keys: Pe,
  last: e2,
  lastIndexOf: M1,
  map: pn,
  mapObject: g1,
  matcher: Qn,
  matches: Qn,
  max: xf,
  memoize: F1,
  methods: Ei,
  min: H1,
  mixin: Cf,
  negate: xa,
  noop: lf,
  now: Nr,
  object: o2,
  omit: J1,
  once: O1,
  pairs: c1,
  partial: cr,
  partition: K1,
  pick: Ef,
  pluck: _a,
  property: ya,
  propertyOf: b1,
  random: Zu,
  range: c2,
  reduce: Cr,
  reduceRight: Vu,
  reject: z1,
  rest: Yn,
  restArguments: it,
  result: w1,
  sample: _f,
  select: Ln,
  shuffle: X1,
  size: Q1,
  some: Yu,
  sortBy: Z1,
  sortedIndex: yf,
  tail: Yn,
  take: Ar,
  tap: l1,
  template: E1,
  templateSettings: _1,
  throttle: S1,
  times: m1,
  toArray: vf,
  toPath: sf,
  transpose: Ti,
  unescape: v1,
  union: i2,
  uniq: Ui,
  unique: Ui,
  uniqueId: U1,
  unzip: Ti,
  values: or,
  where: j1,
  without: r2,
  wrap: I1,
  zip: a2
}, Symbol.toStringTag, { value: "Module" })), Ne = /* @__PURE__ */ ty(rD);
var Af = {}, je = {}, f2 = { exports: {} }, du = { exports: {} }, Yd;
function Hr() {
  if (Yd) return du.exports;
  Yd = 1;
  var e = /* @__PURE__ */ function() {
    return this === void 0;
  }();
  if (e)
    du.exports = {
      freeze: Object.freeze,
      defineProperty: Object.defineProperty,
      getDescriptor: Object.getOwnPropertyDescriptor,
      keys: Object.keys,
      names: Object.getOwnPropertyNames,
      getPrototypeOf: Object.getPrototypeOf,
      isArray: Array.isArray,
      isES5: e,
      propertyIsWritable: function(f, m) {
        var b = Object.getOwnPropertyDescriptor(f, m);
        return !!(!b || b.writable || b.set);
      }
    };
  else {
    var t = {}.hasOwnProperty, n = {}.toString, r = {}.constructor.prototype, i = function(f) {
      var m = [];
      for (var b in f)
        t.call(f, b) && m.push(b);
      return m;
    }, u = function(f, m) {
      return { value: f[m] };
    }, a = function(f, m, b) {
      return f[m] = b.value, f;
    }, o = function(f) {
      return f;
    }, c = function(f) {
      try {
        return Object(f).constructor.prototype;
      } catch {
        return r;
      }
    }, s = function(f) {
      try {
        return n.call(f) === "[object Array]";
      } catch {
        return !1;
      }
    };
    du.exports = {
      isArray: s,
      keys: i,
      names: i,
      defineProperty: a,
      getDescriptor: u,
      freeze: o,
      getPrototypeOf: c,
      isES5: e,
      propertyIsWritable: function() {
        return !0;
      }
    };
  }
  return du.exports;
}
var Eo, Kd;
function De() {
  if (Kd) return Eo;
  Kd = 1;
  var e = Hr(), t = typeof navigator > "u", n = { e: {} }, r, i = typeof self < "u" ? self : typeof window < "u" ? window : typeof re < "u" || re !== void 0 ? re : null;
  function u() {
    try {
      var S = r;
      return r = null, S.apply(this, arguments);
    } catch ($) {
      return n.e = $, n;
    }
  }
  function a(S) {
    return r = S, u;
  }
  var o = function(S, $) {
    var ee = {}.hasOwnProperty;
    function te() {
      this.constructor = S, this.constructor$ = $;
      for (var Q in $.prototype)
        ee.call($.prototype, Q) && Q.charAt(Q.length - 1) !== "$" && (this[Q + "$"] = $.prototype[Q]);
    }
    return te.prototype = $.prototype, S.prototype = new te(), S.prototype;
  };
  function c(S) {
    return S == null || S === !0 || S === !1 || typeof S == "string" || typeof S == "number";
  }
  function s(S) {
    return typeof S == "function" || typeof S == "object" && S !== null;
  }
  function f(S) {
    return c(S) ? new Error(_(S)) : S;
  }
  function m(S, $) {
    var ee = S.length, te = new Array(ee + 1), Q;
    for (Q = 0; Q < ee; ++Q)
      te[Q] = S[Q];
    return te[Q] = $, te;
  }
  function b(S, $, ee) {
    if (e.isES5) {
      var te = Object.getOwnPropertyDescriptor(S, $);
      if (te != null)
        return te.get == null && te.set == null ? te.value : ee;
    } else
      return {}.hasOwnProperty.call(S, $) ? S[$] : void 0;
  }
  function p(S, $, ee) {
    if (c(S)) return S;
    var te = {
      value: ee,
      configurable: !0,
      enumerable: !1,
      writable: !0
    };
    return e.defineProperty(S, $, te), S;
  }
  function l(S) {
    throw S;
  }
  var g = function() {
    var S = [
      Array.prototype,
      Object.prototype,
      Function.prototype
    ], $ = function(Q) {
      for (var T = 0; T < S.length; ++T)
        if (S[T] === Q)
          return !0;
      return !1;
    };
    if (e.isES5) {
      var ee = Object.getOwnPropertyNames;
      return function(Q) {
        for (var T = [], F = /* @__PURE__ */ Object.create(null); Q != null && !$(Q); ) {
          var X;
          try {
            X = ee(Q);
          } catch {
            return T;
          }
          for (var K = 0; K < X.length; ++K) {
            var N = X[K];
            if (!F[N]) {
              F[N] = !0;
              var q = Object.getOwnPropertyDescriptor(Q, N);
              q != null && q.get == null && q.set == null && T.push(N);
            }
          }
          Q = e.getPrototypeOf(Q);
        }
        return T;
      };
    } else {
      var te = {}.hasOwnProperty;
      return function(Q) {
        if ($(Q)) return [];
        var T = [];
        e: for (var F in Q)
          if (te.call(Q, F))
            T.push(F);
          else {
            for (var X = 0; X < S.length; ++X)
              if (te.call(S[X], F))
                continue e;
            T.push(F);
          }
        return T;
      };
    }
  }(), D = /this\s*\.\s*\S+\s*=/;
  function h(S) {
    try {
      if (typeof S == "function") {
        var $ = e.names(S.prototype), ee = e.isES5 && $.length > 1, te = $.length > 0 && !($.length === 1 && $[0] === "constructor"), Q = D.test(S + "") && e.names(S).length > 0;
        if (ee || te || Q)
          return !0;
      }
      return !1;
    } catch {
      return !1;
    }
  }
  function d(S) {
    return S;
  }
  var y = /^[a-z$_][a-z$_0-9]*$/i;
  function x(S) {
    return y.test(S);
  }
  function v(S, $, ee) {
    for (var te = new Array(S), Q = 0; Q < S; ++Q)
      te[Q] = $ + Q + ee;
    return te;
  }
  function _(S) {
    try {
      return S + "";
    } catch {
      return "[no string representation]";
    }
  }
  function w(S) {
    return S !== null && typeof S == "object" && typeof S.message == "string" && typeof S.name == "string";
  }
  function A(S) {
    try {
      p(S, "isOperational", !0);
    } catch {
    }
  }
  function B(S) {
    return S == null ? !1 : S instanceof Error.__BluebirdErrorTypes__.OperationalError || S.isOperational === !0;
  }
  function P(S) {
    return w(S) && e.propertyIsWritable(S, "stack");
  }
  var L = function() {
    return "stack" in new Error() ? function(S) {
      return P(S) ? S : new Error(_(S));
    } : function(S) {
      if (P(S)) return S;
      try {
        throw new Error(_(S));
      } catch ($) {
        return $;
      }
    };
  }();
  function I(S) {
    return {}.toString.call(S);
  }
  function z(S, $, ee) {
    for (var te = e.names(S), Q = 0; Q < te.length; ++Q) {
      var T = te[Q];
      if (ee(T))
        try {
          e.defineProperty($, T, e.getDescriptor(S, T));
        } catch {
        }
    }
  }
  var H = function(S) {
    return e.isArray(S) ? S : null;
  };
  if (typeof Symbol < "u" && Symbol.iterator) {
    var G = typeof Array.from == "function" ? function(S) {
      return Array.from(S);
    } : function(S) {
      for (var $ = [], ee = S[Symbol.iterator](), te; !(te = ee.next()).done; )
        $.push(te.value);
      return $;
    };
    H = function(S) {
      return e.isArray(S) ? S : S != null && typeof S[Symbol.iterator] == "function" ? G(S) : null;
    };
  }
  var C = typeof process < "u" && I(process).toLowerCase() === "[object process]", U = typeof process < "u" && typeof process.env < "u";
  function E(S) {
    return U ? process.env[S] : void 0;
  }
  function k() {
    if (typeof Promise == "function")
      try {
        var S = new Promise(function() {
        });
        if ({}.toString.call(S) === "[object Promise]")
          return Promise;
      } catch {
      }
  }
  function R(S, $) {
    return S.bind($);
  }
  var M = {
    isClass: h,
    isIdentifier: x,
    inheritedDataKeys: g,
    getDataPropertyOrDefault: b,
    thrower: l,
    isArray: e.isArray,
    asArray: H,
    notEnumerableProp: p,
    isPrimitive: c,
    isObject: s,
    isError: w,
    canEvaluate: t,
    errorObj: n,
    tryCatch: a,
    inherits: o,
    withAppended: m,
    maybeWrapAsError: f,
    toFastProperties: d,
    filledRange: v,
    toString: _,
    canAttachTrace: P,
    ensureErrorObject: L,
    originatesFromRejection: B,
    markAsOriginatingFromRejection: A,
    classString: I,
    copyDescriptors: z,
    hasDevTools: typeof chrome < "u" && chrome && typeof chrome.loadTimes == "function",
    isNode: C,
    hasEnvVariables: U,
    env: E,
    global: i,
    getNativePromise: k,
    domainBind: R
  };
  M.isRecentNode = M.isNode && function() {
    var S = process.versions.node.split(".").map(Number);
    return S[0] === 0 && S[1] > 10 || S[0] > 0;
  }(), M.isNode && M.toFastProperties(process);
  try {
    throw new Error();
  } catch (S) {
    M.lastLineError = S;
  }
  return Eo = M, Eo;
}
var lu = { exports: {} }, wo, Qd;
function iD() {
  if (Qd) return wo;
  Qd = 1;
  var e = De(), t, n = function() {
    throw new Error(`No async scheduler available

    See http://goo.gl/MqrFmX
`);
  }, r = e.getNativePromise();
  if (e.isNode && typeof MutationObserver > "u") {
    var i = re.setImmediate, u = process.nextTick;
    t = e.isRecentNode ? function(o) {
      i.call(re, o);
    } : function(o) {
      u.call(process, o);
    };
  } else if (typeof r == "function" && typeof r.resolve == "function") {
    var a = r.resolve();
    t = function(o) {
      a.then(o);
    };
  } else typeof MutationObserver < "u" && !(typeof window < "u" && window.navigator && (window.navigator.standalone || window.cordova)) ? t = function() {
    var o = document.createElement("div"), c = { attributes: !0 }, s = !1, f = document.createElement("div"), m = new MutationObserver(function() {
      o.classList.toggle("foo"), s = !1;
    });
    m.observe(f, c);
    var b = function() {
      s || (s = !0, f.classList.toggle("foo"));
    };
    return function(l) {
      var g = new MutationObserver(function() {
        g.disconnect(), l();
      });
      g.observe(o, c), b();
    };
  }() : typeof setImmediate < "u" ? t = function(o) {
    setImmediate(o);
  } : typeof setTimeout < "u" ? t = function(o) {
    setTimeout(o, 0);
  } : t = n;
  return wo = t, wo;
}
var Uo, Jd;
function uD() {
  if (Jd) return Uo;
  Jd = 1;
  function e(n, r, i, u, a) {
    for (var o = 0; o < a; ++o)
      i[o + u] = n[o + r], n[o + r] = void 0;
  }
  function t(n) {
    this._capacity = n, this._length = 0, this._front = 0;
  }
  return t.prototype._willBeOverCapacity = function(n) {
    return this._capacity < n;
  }, t.prototype._pushOne = function(n) {
    var r = this.length();
    this._checkCapacity(r + 1);
    var i = this._front + r & this._capacity - 1;
    this[i] = n, this._length = r + 1;
  }, t.prototype.push = function(n, r, i) {
    var u = this.length() + 3;
    if (this._willBeOverCapacity(u)) {
      this._pushOne(n), this._pushOne(r), this._pushOne(i);
      return;
    }
    var a = this._front + u - 3;
    this._checkCapacity(u);
    var o = this._capacity - 1;
    this[a + 0 & o] = n, this[a + 1 & o] = r, this[a + 2 & o] = i, this._length = u;
  }, t.prototype.shift = function() {
    var n = this._front, r = this[n];
    return this[n] = void 0, this._front = n + 1 & this._capacity - 1, this._length--, r;
  }, t.prototype.length = function() {
    return this._length;
  }, t.prototype._checkCapacity = function(n) {
    this._capacity < n && this._resizeTo(this._capacity << 1);
  }, t.prototype._resizeTo = function(n) {
    var r = this._capacity;
    this._capacity = n;
    var i = this._front, u = this._length, a = i + u & r - 1;
    e(this, 0, this, r, a);
  }, Uo = t, Uo;
}
var el;
function aD() {
  if (el) return lu.exports;
  el = 1;
  var e;
  try {
    throw new Error();
  } catch (c) {
    e = c;
  }
  var t = iD(), n = uD(), r = De();
  function i() {
    this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new n(16), this._normalQueue = new n(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
    var c = this;
    this.drainQueues = function() {
      c._drainQueues();
    }, this._schedule = t;
  }
  i.prototype.setScheduler = function(c) {
    var s = this._schedule;
    return this._schedule = c, this._customScheduler = !0, s;
  }, i.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
  }, i.prototype.enableTrampoline = function() {
    this._trampolineEnabled = !0;
  }, i.prototype.disableTrampolineIfNecessary = function() {
    r.hasDevTools && (this._trampolineEnabled = !1);
  }, i.prototype.haveItemsQueued = function() {
    return this._isTickUsed || this._haveDrainedQueues;
  }, i.prototype.fatalError = function(c, s) {
    s ? (process.stderr.write("Fatal " + (c instanceof Error ? c.stack : c) + `
`), process.exit(2)) : this.throwLater(c);
  }, i.prototype.throwLater = function(c, s) {
    if (arguments.length === 1 && (s = c, c = function() {
      throw s;
    }), typeof setTimeout < "u")
      setTimeout(function() {
        c(s);
      }, 0);
    else try {
      this._schedule(function() {
        c(s);
      });
    } catch {
      throw new Error(`No async scheduler available

    See http://goo.gl/MqrFmX
`);
    }
  };
  function u(c, s, f) {
    this._lateQueue.push(c, s, f), this._queueTick();
  }
  function a(c, s, f) {
    this._normalQueue.push(c, s, f), this._queueTick();
  }
  function o(c) {
    this._normalQueue._pushOne(c), this._queueTick();
  }
  return r.hasDevTools ? (i.prototype.invokeLater = function(c, s, f) {
    this._trampolineEnabled ? u.call(this, c, s, f) : this._schedule(function() {
      setTimeout(function() {
        c.call(s, f);
      }, 100);
    });
  }, i.prototype.invoke = function(c, s, f) {
    this._trampolineEnabled ? a.call(this, c, s, f) : this._schedule(function() {
      c.call(s, f);
    });
  }, i.prototype.settlePromises = function(c) {
    this._trampolineEnabled ? o.call(this, c) : this._schedule(function() {
      c._settlePromises();
    });
  }) : (i.prototype.invokeLater = u, i.prototype.invoke = a, i.prototype.settlePromises = o), i.prototype._drainQueue = function(c) {
    for (; c.length() > 0; ) {
      var s = c.shift();
      if (typeof s != "function") {
        s._settlePromises();
        continue;
      }
      var f = c.shift(), m = c.shift();
      s.call(f, m);
    }
  }, i.prototype._drainQueues = function() {
    this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, this._drainQueue(this._lateQueue);
  }, i.prototype._queueTick = function() {
    this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
  }, i.prototype._reset = function() {
    this._isTickUsed = !1;
  }, lu.exports = i, lu.exports.firstLineError = e, lu.exports;
}
var To, tl;
function Wn() {
  if (tl) return To;
  tl = 1;
  var e = Hr(), t = e.freeze, n = De(), r = n.inherits, i = n.notEnumerableProp;
  function u(h, d) {
    function y(x) {
      if (!(this instanceof y)) return new y(x);
      i(
        this,
        "message",
        typeof x == "string" ? x : d
      ), i(this, "name", h), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this);
    }
    return r(y, Error), y;
  }
  var a, o, c = u("Warning", "warning"), s = u("CancellationError", "cancellation error"), f = u("TimeoutError", "timeout error"), m = u("AggregateError", "aggregate error");
  try {
    a = TypeError, o = RangeError;
  } catch {
    a = u("TypeError", "type error"), o = u("RangeError", "range error");
  }
  for (var b = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), p = 0; p < b.length; ++p)
    typeof Array.prototype[b[p]] == "function" && (m.prototype[b[p]] = Array.prototype[b[p]]);
  e.defineProperty(m.prototype, "length", {
    value: 0,
    configurable: !1,
    writable: !0,
    enumerable: !0
  }), m.prototype.isOperational = !0;
  var l = 0;
  m.prototype.toString = function() {
    var h = Array(l * 4 + 1).join(" "), d = `
` + h + `AggregateError of:
`;
    l++, h = Array(l * 4 + 1).join(" ");
    for (var y = 0; y < this.length; ++y) {
      for (var x = this[y] === this ? "[Circular AggregateError]" : this[y] + "", v = x.split(`
`), _ = 0; _ < v.length; ++_)
        v[_] = h + v[_];
      x = v.join(`
`), d += x + `
`;
    }
    return l--, d;
  };
  function g(h) {
    if (!(this instanceof g))
      return new g(h);
    i(this, "name", "OperationalError"), i(this, "message", h), this.cause = h, this.isOperational = !0, h instanceof Error ? (i(this, "message", h.message), i(this, "stack", h.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
  r(g, Error);
  var D = Error.__BluebirdErrorTypes__;
  return D || (D = t({
    CancellationError: s,
    TimeoutError: f,
    OperationalError: g,
    RejectionError: g,
    AggregateError: m
  }), e.defineProperty(Error, "__BluebirdErrorTypes__", {
    value: D,
    writable: !1,
    enumerable: !1,
    configurable: !1
  })), To = {
    Error,
    TypeError: a,
    RangeError: o,
    CancellationError: D.CancellationError,
    OperationalError: D.OperationalError,
    TimeoutError: D.TimeoutError,
    AggregateError: D.AggregateError,
    Warning: c
  }, To;
}
var Co, nl;
function oD() {
  return nl || (nl = 1, Co = function(e, t) {
    var n = De(), r = n.errorObj, i = n.isObject;
    function u(m, b) {
      if (i(m)) {
        if (m instanceof e) return m;
        var p = o(m);
        if (p === r) {
          b && b._pushContext();
          var l = e.reject(p.e);
          return b && b._popContext(), l;
        } else if (typeof p == "function") {
          if (s(m)) {
            var l = new e(t);
            return m._then(
              l._fulfill,
              l._reject,
              void 0,
              l,
              null
            ), l;
          }
          return f(m, p, b);
        }
      }
      return m;
    }
    function a(m) {
      return m.then;
    }
    function o(m) {
      try {
        return a(m);
      } catch (b) {
        return r.e = b, r;
      }
    }
    var c = {}.hasOwnProperty;
    function s(m) {
      try {
        return c.call(m, "_promise0");
      } catch {
        return !1;
      }
    }
    function f(m, b, p) {
      var l = new e(t), g = l;
      p && p._pushContext(), l._captureStackTrace(), p && p._popContext();
      var D = !0, h = n.tryCatch(b).call(m, d, y);
      D = !1, l && h === r && (l._rejectCallback(h.e, !0, !0), l = null);
      function d(x) {
        l && (l._resolveCallback(x), l = null);
      }
      function y(x) {
        l && (l._rejectCallback(x, D, !0), l = null);
      }
      return g;
    }
    return u;
  }), Co;
}
var Ao, rl;
function cD() {
  return rl || (rl = 1, Ao = function(e, t, n, r, i) {
    var u = De();
    u.isArray;
    function a(c) {
      switch (c) {
        case -2:
          return [];
        case -3:
          return {};
      }
    }
    function o(c) {
      var s = this._promise = new e(t);
      c instanceof e && s._propagateFrom(c, 3), s._setOnCancel(this), this._values = c, this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
    }
    return u.inherits(o, i), o.prototype.length = function() {
      return this._length;
    }, o.prototype.promise = function() {
      return this._promise;
    }, o.prototype._init = function c(s, f) {
      var m = n(this._values, this._promise);
      if (m instanceof e) {
        m = m._target();
        var b = m._bitField;
        if (this._values = m, b & 50397184)
          if (b & 33554432)
            m = m._value();
          else return b & 16777216 ? this._reject(m._reason()) : this._cancel();
        else return this._promise._setAsyncGuaranteed(), m._then(
          c,
          this._reject,
          void 0,
          this,
          f
        );
      }
      if (m = u.asArray(m), m === null) {
        var p = r(
          "expecting an array or an iterable object but got " + u.classString(m)
        ).reason();
        this._promise._rejectCallback(p, !1);
        return;
      }
      if (m.length === 0) {
        f === -5 ? this._resolveEmptyArray() : this._resolve(a(f));
        return;
      }
      this._iterate(m);
    }, o.prototype._iterate = function(c) {
      var s = this.getActualLength(c.length);
      this._length = s, this._values = this.shouldCopyValues() ? new Array(s) : this._values;
      for (var f = this._promise, m = !1, b = null, p = 0; p < s; ++p) {
        var l = n(c[p], f);
        l instanceof e ? (l = l._target(), b = l._bitField) : b = null, m ? b !== null && l.suppressUnhandledRejections() : b !== null ? b & 50397184 ? b & 33554432 ? m = this._promiseFulfilled(l._value(), p) : b & 16777216 ? m = this._promiseRejected(l._reason(), p) : m = this._promiseCancelled(p) : (l._proxy(this, p), this._values[p] = l) : m = this._promiseFulfilled(l, p);
      }
      m || f._setAsyncGuaranteed();
    }, o.prototype._isResolved = function() {
      return this._values === null;
    }, o.prototype._resolve = function(c) {
      this._values = null, this._promise._fulfill(c);
    }, o.prototype._cancel = function() {
      this._isResolved() || !this._promise._isCancellable() || (this._values = null, this._promise._cancel());
    }, o.prototype._reject = function(c) {
      this._values = null, this._promise._rejectCallback(c, !1);
    }, o.prototype._promiseFulfilled = function(c, s) {
      this._values[s] = c;
      var f = ++this._totalResolved;
      return f >= this._length ? (this._resolve(this._values), !0) : !1;
    }, o.prototype._promiseCancelled = function() {
      return this._cancel(), !0;
    }, o.prototype._promiseRejected = function(c) {
      return this._totalResolved++, this._reject(c), !0;
    }, o.prototype._resultCancelled = function() {
      if (!this._isResolved()) {
        var c = this._values;
        if (this._cancel(), c instanceof e)
          c.cancel();
        else
          for (var s = 0; s < c.length; ++s)
            c[s] instanceof e && c[s].cancel();
      }
    }, o.prototype.shouldCopyValues = function() {
      return !0;
    }, o.prototype.getActualLength = function(c) {
      return c;
    }, o;
  }), Ao;
}
var Fo, il;
function sD() {
  return il || (il = 1, Fo = function(e) {
    var t = !1, n = [];
    e.prototype._promiseCreated = function() {
    }, e.prototype._pushContext = function() {
    }, e.prototype._popContext = function() {
      return null;
    }, e._peekContext = e.prototype._peekContext = function() {
    };
    function r() {
      this._trace = new r.CapturedTrace(u());
    }
    r.prototype._pushContext = function() {
      this._trace !== void 0 && (this._trace._promiseCreated = null, n.push(this._trace));
    }, r.prototype._popContext = function() {
      if (this._trace !== void 0) {
        var a = n.pop(), o = a._promiseCreated;
        return a._promiseCreated = null, o;
      }
      return null;
    };
    function i() {
      if (t) return new r();
    }
    function u() {
      var a = n.length - 1;
      if (a >= 0)
        return n[a];
    }
    return r.CapturedTrace = null, r.create = i, r.deactivateLongStackTraces = function() {
    }, r.activateLongStackTraces = function() {
      var a = e.prototype._pushContext, o = e.prototype._popContext, c = e._peekContext, s = e.prototype._peekContext, f = e.prototype._promiseCreated;
      r.deactivateLongStackTraces = function() {
        e.prototype._pushContext = a, e.prototype._popContext = o, e._peekContext = c, e.prototype._peekContext = s, e.prototype._promiseCreated = f, t = !1;
      }, t = !0, e.prototype._pushContext = r.prototype._pushContext, e.prototype._popContext = r.prototype._popContext, e._peekContext = e.prototype._peekContext = u, e.prototype._promiseCreated = function() {
        var m = this._peekContext();
        m && m._promiseCreated == null && (m._promiseCreated = this);
      };
    }, r;
  }), Fo;
}
var ko, ul;
function fD() {
  return ul || (ul = 1, ko = function(e, t) {
    var n = e._getDomain, r = e._async, i = Wn().Warning, u = De(), a = u.canAttachTrace, o, c, s = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, f = /\((?:timers\.js):\d+:\d+\)/, m = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, b = null, p = null, l = !1, g, D = !!(u.env("BLUEBIRD_DEBUG") != 0 && (u.env("BLUEBIRD_DEBUG") || u.env("NODE_ENV") === "development")), h = !!(u.env("BLUEBIRD_WARNINGS") != 0 && (D || u.env("BLUEBIRD_WARNINGS"))), d = !!(u.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (D || u.env("BLUEBIRD_LONG_STACK_TRACES"))), y = u.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (h || !!u.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
    e.prototype.suppressUnhandledRejections = function() {
      var O = this._target();
      O._bitField = O._bitField & -1048577 | 524288;
    }, e.prototype._ensurePossibleRejectionHandled = function() {
      this._bitField & 524288 || (this._setRejectionIsUnhandled(), r.invokeLater(this._notifyUnhandledRejection, this, void 0));
    }, e.prototype._notifyUnhandledRejectionIsHandled = function() {
      q(
        "rejectionHandled",
        o,
        void 0,
        this
      );
    }, e.prototype._setReturnedNonUndefined = function() {
      this._bitField = this._bitField | 268435456;
    }, e.prototype._returnedNonUndefined = function() {
      return (this._bitField & 268435456) !== 0;
    }, e.prototype._notifyUnhandledRejection = function() {
      if (this._isRejectionUnhandled()) {
        var O = this._settledValue();
        this._setUnhandledRejectionIsNotified(), q(
          "unhandledRejection",
          c,
          O,
          this
        );
      }
    }, e.prototype._setUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField | 262144;
    }, e.prototype._unsetUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField & -262145;
    }, e.prototype._isUnhandledRejectionNotified = function() {
      return (this._bitField & 262144) > 0;
    }, e.prototype._setRejectionIsUnhandled = function() {
      this._bitField = this._bitField | 1048576;
    }, e.prototype._unsetRejectionIsUnhandled = function() {
      this._bitField = this._bitField & -1048577, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
    }, e.prototype._isRejectionUnhandled = function() {
      return (this._bitField & 1048576) > 0;
    }, e.prototype._warn = function(O, W, V) {
      return ee(O, W, V || this);
    }, e.onPossiblyUnhandledRejection = function(O) {
      var W = n();
      c = typeof O == "function" ? W === null ? O : u.domainBind(W, O) : void 0;
    }, e.onUnhandledRejectionHandled = function(O) {
      var W = n();
      o = typeof O == "function" ? W === null ? O : u.domainBind(W, O) : void 0;
    };
    var x = function() {
    };
    e.longStackTraces = function() {
      if (r.haveItemsQueued() && !xe.longStackTraces)
        throw new Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);
      if (!xe.longStackTraces && oe()) {
        var O = e.prototype._captureStackTrace, W = e.prototype._attachExtraTrace;
        xe.longStackTraces = !0, x = function() {
          if (r.haveItemsQueued() && !xe.longStackTraces)
            throw new Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);
          e.prototype._captureStackTrace = O, e.prototype._attachExtraTrace = W, t.deactivateLongStackTraces(), r.enableTrampoline(), xe.longStackTraces = !1;
        }, e.prototype._captureStackTrace = R, e.prototype._attachExtraTrace = M, t.activateLongStackTraces(), r.disableTrampolineIfNecessary();
      }
    }, e.hasLongStackTraces = function() {
      return xe.longStackTraces && oe();
    };
    var v = function() {
      try {
        if (typeof CustomEvent == "function") {
          var O = new CustomEvent("CustomEvent");
          return u.global.dispatchEvent(O), function(W, V) {
            var Y = new CustomEvent(W.toLowerCase(), {
              detail: V,
              cancelable: !0
            });
            return !u.global.dispatchEvent(Y);
          };
        } else if (typeof Event == "function") {
          var O = new Event("CustomEvent");
          return u.global.dispatchEvent(O), function(V, Y) {
            var ie = new Event(V.toLowerCase(), {
              cancelable: !0
            });
            return ie.detail = Y, !u.global.dispatchEvent(ie);
          };
        } else {
          var O = document.createEvent("CustomEvent");
          return O.initCustomEvent("testingtheevent", !1, !0, {}), u.global.dispatchEvent(O), function(V, Y) {
            var ie = document.createEvent("CustomEvent");
            return ie.initCustomEvent(
              V.toLowerCase(),
              !1,
              !0,
              Y
            ), !u.global.dispatchEvent(ie);
          };
        }
      } catch {
      }
      return function() {
        return !1;
      };
    }(), _ = function() {
      return u.isNode ? function() {
        return process.emit.apply(process, arguments);
      } : u.global ? function(O) {
        var W = "on" + O.toLowerCase(), V = u.global[W];
        return V ? (V.apply(u.global, [].slice.call(arguments, 1)), !0) : !1;
      } : function() {
        return !1;
      };
    }();
    function w(O, W) {
      return { promise: W };
    }
    var A = {
      promiseCreated: w,
      promiseFulfilled: w,
      promiseRejected: w,
      promiseResolved: w,
      promiseCancelled: w,
      promiseChained: function(O, W, V) {
        return { promise: W, child: V };
      },
      warning: function(O, W) {
        return { warning: W };
      },
      unhandledRejection: function(O, W, V) {
        return { reason: W, promise: V };
      },
      rejectionHandled: w
    }, B = function(O) {
      var W = !1;
      try {
        W = _.apply(null, arguments);
      } catch (Y) {
        r.throwLater(Y), W = !0;
      }
      var V = !1;
      try {
        V = v(
          O,
          A[O].apply(null, arguments)
        );
      } catch (Y) {
        r.throwLater(Y), V = !0;
      }
      return V || W;
    };
    e.config = function(O) {
      if (O = Object(O), "longStackTraces" in O && (O.longStackTraces ? e.longStackTraces() : !O.longStackTraces && e.hasLongStackTraces() && x()), "warnings" in O) {
        var W = O.warnings;
        xe.warnings = !!W, y = xe.warnings, u.isObject(W) && "wForgottenReturn" in W && (y = !!W.wForgottenReturn);
      }
      if ("cancellation" in O && O.cancellation && !xe.cancellation) {
        if (r.haveItemsQueued())
          throw new Error(
            "cannot enable cancellation after promises are in use"
          );
        e.prototype._clearCancellationData = G, e.prototype._propagateFrom = C, e.prototype._onCancel = z, e.prototype._setOnCancel = H, e.prototype._attachCancellationCallback = I, e.prototype._execute = L, E = C, xe.cancellation = !0;
      }
      return "monitoring" in O && (O.monitoring && !xe.monitoring ? (xe.monitoring = !0, e.prototype._fireEvent = B) : !O.monitoring && xe.monitoring && (xe.monitoring = !1, e.prototype._fireEvent = P)), e;
    };
    function P() {
      return !1;
    }
    e.prototype._fireEvent = P, e.prototype._execute = function(O, W, V) {
      try {
        O(W, V);
      } catch (Y) {
        return Y;
      }
    }, e.prototype._onCancel = function() {
    }, e.prototype._setOnCancel = function(O) {
    }, e.prototype._attachCancellationCallback = function(O) {
    }, e.prototype._captureStackTrace = function() {
    }, e.prototype._attachExtraTrace = function() {
    }, e.prototype._clearCancellationData = function() {
    }, e.prototype._propagateFrom = function(O, W) {
    };
    function L(O, W, V) {
      var Y = this;
      try {
        O(W, V, function(ie) {
          if (typeof ie != "function")
            throw new TypeError("onCancel must be a function, got: " + u.toString(ie));
          Y._attachCancellationCallback(ie);
        });
      } catch (ie) {
        return ie;
      }
    }
    function I(O) {
      if (!this._isCancellable()) return this;
      var W = this._onCancel();
      W !== void 0 ? u.isArray(W) ? W.push(O) : this._setOnCancel([W, O]) : this._setOnCancel(O);
    }
    function z() {
      return this._onCancelField;
    }
    function H(O) {
      this._onCancelField = O;
    }
    function G() {
      this._cancellationParent = void 0, this._onCancelField = void 0;
    }
    function C(O, W) {
      if (W & 1) {
        this._cancellationParent = O;
        var V = O._branchesRemainingToCancel;
        V === void 0 && (V = 0), O._branchesRemainingToCancel = V + 1;
      }
      W & 2 && O._isBound() && this._setBoundTo(O._boundTo);
    }
    function U(O, W) {
      W & 2 && O._isBound() && this._setBoundTo(O._boundTo);
    }
    var E = U;
    function k() {
      var O = this._boundTo;
      return O !== void 0 && O instanceof e ? O.isFulfilled() ? O.value() : void 0 : O;
    }
    function R() {
      this._trace = new It(this._peekContext());
    }
    function M(O, W) {
      if (a(O)) {
        var V = this._trace;
        if (V !== void 0 && W && (V = V._parent), V !== void 0)
          V.attachExtraTrace(O);
        else if (!O.__stackCleaned__) {
          var Y = K(O);
          u.notEnumerableProp(
            O,
            "stack",
            Y.message + `
` + Y.stack.join(`
`)
          ), u.notEnumerableProp(O, "__stackCleaned__", !0);
        }
      }
    }
    function S(O, W, V, Y, ie) {
      if (O === void 0 && W !== null && y) {
        if (ie !== void 0 && ie._returnedNonUndefined() || !(Y._bitField & 65535)) return;
        V && (V = V + " ");
        var Ce = "", be = "";
        if (W._trace) {
          for (var ae = W._trace.stack.split(`
`), ve = F(ae), Re = ve.length - 1; Re >= 0; --Re) {
            var un = ve[Re];
            if (!f.test(un)) {
              var an = un.match(m);
              an && (Ce = "at " + an[1] + ":" + an[2] + ":" + an[3] + " ");
              break;
            }
          }
          if (ve.length > 0) {
            for (var Hm = ve[0], Re = 0; Re < ae.length; ++Re)
              if (ae[Re] === Hm) {
                Re > 0 && (be = `
` + ae[Re - 1]);
                break;
              }
          }
        }
        var Xm = "a promise was created in a " + V + "handler " + Ce + "but was not returned from it, see http://goo.gl/rRqMUw" + be;
        Y._warn(Xm, !0, W);
      }
    }
    function $(O, W) {
      var V = O + " is deprecated and will be removed in a future version.";
      return W && (V += " Use " + W + " instead."), ee(V);
    }
    function ee(O, W, V) {
      if (xe.warnings) {
        var Y = new i(O), ie;
        if (W)
          V._attachExtraTrace(Y);
        else if (xe.longStackTraces && (ie = e._peekContext()))
          ie.attachExtraTrace(Y);
        else {
          var Ce = K(Y);
          Y.stack = Ce.message + `
` + Ce.stack.join(`
`);
        }
        B("warning", Y) || N(Y, "", !0);
      }
    }
    function te(O, W) {
      for (var V = 0; V < W.length - 1; ++V)
        W[V].push("From previous event:"), W[V] = W[V].join(`
`);
      return V < W.length && (W[V] = W[V].join(`
`)), O + `
` + W.join(`
`);
    }
    function Q(O) {
      for (var W = 0; W < O.length; ++W)
        (O[W].length === 0 || W + 1 < O.length && O[W][0] === O[W + 1][0]) && (O.splice(W, 1), W--);
    }
    function T(O) {
      for (var W = O[0], V = 1; V < O.length; ++V) {
        for (var Y = O[V], ie = W.length - 1, Ce = W[ie], be = -1, ae = Y.length - 1; ae >= 0; --ae)
          if (Y[ae] === Ce) {
            be = ae;
            break;
          }
        for (var ae = be; ae >= 0; --ae) {
          var ve = Y[ae];
          if (W[ie] === ve)
            W.pop(), ie--;
          else
            break;
        }
        W = Y;
      }
    }
    function F(O) {
      for (var W = [], V = 0; V < O.length; ++V) {
        var Y = O[V], ie = Y === "    (No stack trace)" || b.test(Y), Ce = ie && de(Y);
        ie && !Ce && (l && Y.charAt(0) !== " " && (Y = "    " + Y), W.push(Y));
      }
      return W;
    }
    function X(O) {
      for (var W = O.stack.replace(/\s+$/g, "").split(`
`), V = 0; V < W.length; ++V) {
        var Y = W[V];
        if (Y === "    (No stack trace)" || b.test(Y))
          break;
      }
      return V > 0 && O.name != "SyntaxError" && (W = W.slice(V)), W;
    }
    function K(O) {
      var W = O.stack, V = O.toString();
      return W = typeof W == "string" && W.length > 0 ? X(O) : ["    (No stack trace)"], {
        message: V,
        stack: O.name == "SyntaxError" ? W : F(W)
      };
    }
    function N(O, W, V) {
      if (typeof console < "u") {
        var Y;
        if (u.isObject(O)) {
          var ie = O.stack;
          Y = W + p(ie, O);
        } else
          Y = W + String(O);
        typeof g == "function" ? g(Y, V) : (typeof console.log == "function" || typeof console.log == "object") && console.log(Y);
      }
    }
    function q(O, W, V, Y) {
      var ie = !1;
      try {
        typeof W == "function" && (ie = !0, O === "rejectionHandled" ? W(Y) : W(V, Y));
      } catch (Ce) {
        r.throwLater(Ce);
      }
      O === "unhandledRejection" ? !B(O, V, Y) && !ie && N(V, "Unhandled rejection ") : B(O, Y);
    }
    function Z(O) {
      var W;
      if (typeof O == "function")
        W = "[function " + (O.name || "anonymous") + "]";
      else {
        W = O && typeof O.toString == "function" ? O.toString() : u.toString(O);
        var V = /\[object [a-zA-Z0-9$_]+\]/;
        if (V.test(W))
          try {
            var Y = JSON.stringify(O);
            W = Y;
          } catch {
          }
        W.length === 0 && (W = "(empty array)");
      }
      return "(<" + ne(W) + ">, no stack trace)";
    }
    function ne(O) {
      var W = 41;
      return O.length < W ? O : O.substr(0, W - 3) + "...";
    }
    function oe() {
      return typeof hr == "function";
    }
    var de = function() {
      return !1;
    }, Le = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
    function ut(O) {
      var W = O.match(Le);
      if (W)
        return {
          fileName: W[1],
          line: parseInt(W[2], 10)
        };
    }
    function Hn(O, W) {
      if (oe()) {
        for (var V = O.stack.split(`
`), Y = W.stack.split(`
`), ie = -1, Ce = -1, be, ae, ve = 0; ve < V.length; ++ve) {
          var Re = ut(V[ve]);
          if (Re) {
            be = Re.fileName, ie = Re.line;
            break;
          }
        }
        for (var ve = 0; ve < Y.length; ++ve) {
          var Re = ut(Y[ve]);
          if (Re) {
            ae = Re.fileName, Ce = Re.line;
            break;
          }
        }
        ie < 0 || Ce < 0 || !be || !ae || be !== ae || ie >= Ce || (de = function(un) {
          if (s.test(un)) return !0;
          var an = ut(un);
          return !!(an && an.fileName === be && ie <= an.line && an.line <= Ce);
        });
      }
    }
    function It(O) {
      this._parent = O, this._promisesCreated = 0;
      var W = this._length = 1 + (O === void 0 ? 0 : O._length);
      hr(this, It), W > 32 && this.uncycle();
    }
    u.inherits(It, Error), t.CapturedTrace = It, It.prototype.uncycle = function() {
      var O = this._length;
      if (!(O < 2)) {
        for (var W = [], V = {}, Y = 0, ie = this; ie !== void 0; ++Y)
          W.push(ie), ie = ie._parent;
        O = this._length = Y;
        for (var Y = O - 1; Y >= 0; --Y) {
          var Ce = W[Y].stack;
          V[Ce] === void 0 && (V[Ce] = Y);
        }
        for (var Y = 0; Y < O; ++Y) {
          var be = W[Y].stack, ae = V[be];
          if (ae !== void 0 && ae !== Y) {
            ae > 0 && (W[ae - 1]._parent = void 0, W[ae - 1]._length = 1), W[Y]._parent = void 0, W[Y]._length = 1;
            var ve = Y > 0 ? W[Y - 1] : this;
            ae < O - 1 ? (ve._parent = W[ae + 1], ve._parent.uncycle(), ve._length = ve._parent._length + 1) : (ve._parent = void 0, ve._length = 1);
            for (var Re = ve._length + 1, un = Y - 2; un >= 0; --un)
              W[un]._length = Re, Re++;
            return;
          }
        }
      }
    }, It.prototype.attachExtraTrace = function(O) {
      if (!O.__stackCleaned__) {
        this.uncycle();
        for (var W = K(O), V = W.message, Y = [W.stack], ie = this; ie !== void 0; )
          Y.push(F(ie.stack.split(`
`))), ie = ie._parent;
        T(Y), Q(Y), u.notEnumerableProp(O, "stack", te(V, Y)), u.notEnumerableProp(O, "__stackCleaned__", !0);
      }
    };
    var hr = function() {
      var W = /^\s*at\s*/, V = function(be, ae) {
        return typeof be == "string" ? be : ae.name !== void 0 && ae.message !== void 0 ? ae.toString() : Z(ae);
      };
      if (typeof Error.stackTraceLimit == "number" && typeof Error.captureStackTrace == "function") {
        Error.stackTraceLimit += 6, b = W, p = V;
        var Y = Error.captureStackTrace;
        return de = function(be) {
          return s.test(be);
        }, function(be, ae) {
          Error.stackTraceLimit += 6, Y(be, ae), Error.stackTraceLimit -= 6;
        };
      }
      var ie = new Error();
      if (typeof ie.stack == "string" && ie.stack.split(`
`)[0].indexOf("stackDetection@") >= 0)
        return b = /@/, p = V, l = !0, function(ae) {
          ae.stack = new Error().stack;
        };
      var Ce;
      try {
        throw new Error();
      } catch (be) {
        Ce = "stack" in be;
      }
      return !("stack" in ie) && Ce && typeof Error.stackTraceLimit == "number" ? (b = W, p = V, function(ae) {
        Error.stackTraceLimit += 6;
        try {
          throw new Error();
        } catch (ve) {
          ae.stack = ve.stack;
        }
        Error.stackTraceLimit -= 6;
      }) : (p = function(be, ae) {
        return typeof be == "string" ? be : (typeof ae == "object" || typeof ae == "function") && ae.name !== void 0 && ae.message !== void 0 ? ae.toString() : Z(ae);
      }, null);
    }();
    typeof console < "u" && typeof console.warn < "u" && (g = function(O) {
      console.warn(O);
    }, u.isNode && process.stderr.isTTY ? g = function(O, W) {
      var V = W ? "\x1B[33m" : "\x1B[31m";
      console.warn(V + O + `\x1B[0m
`);
    } : !u.isNode && typeof new Error().stack == "string" && (g = function(O, W) {
      console.warn(
        "%c" + O,
        W ? "color: darkorange" : "color: red"
      );
    }));
    var xe = {
      warnings: h,
      longStackTraces: !1,
      cancellation: !1,
      monitoring: !1
    };
    return d && e.longStackTraces(), {
      longStackTraces: function() {
        return xe.longStackTraces;
      },
      warnings: function() {
        return xe.warnings;
      },
      cancellation: function() {
        return xe.cancellation;
      },
      monitoring: function() {
        return xe.monitoring;
      },
      propagateFromFunction: function() {
        return E;
      },
      boundValueFunction: function() {
        return k;
      },
      checkForgottenReturns: S,
      setBounds: Hn,
      warn: ee,
      deprecated: $,
      CapturedTrace: It,
      fireDomEvent: v,
      fireGlobalEvent: _
    };
  }), ko;
}
var So, al;
function dD() {
  return al || (al = 1, So = function(e, t) {
    var n = De(), r = e.CancellationError, i = n.errorObj;
    function u(m, b, p) {
      this.promise = m, this.type = b, this.handler = p, this.called = !1, this.cancelPromise = null;
    }
    u.prototype.isFinallyHandler = function() {
      return this.type === 0;
    };
    function a(m) {
      this.finallyHandler = m;
    }
    a.prototype._resultCancelled = function() {
      o(this.finallyHandler);
    };
    function o(m, b) {
      return m.cancelPromise != null ? (arguments.length > 1 ? m.cancelPromise._reject(b) : m.cancelPromise._cancel(), m.cancelPromise = null, !0) : !1;
    }
    function c() {
      return f.call(this, this.promise._target()._settledValue());
    }
    function s(m) {
      if (!o(this, m))
        return i.e = m, i;
    }
    function f(m) {
      var b = this.promise, p = this.handler;
      if (!this.called) {
        this.called = !0;
        var l = this.isFinallyHandler() ? p.call(b._boundValue()) : p.call(b._boundValue(), m);
        if (l !== void 0) {
          b._setReturnedNonUndefined();
          var g = t(l, b);
          if (g instanceof e) {
            if (this.cancelPromise != null)
              if (g._isCancelled()) {
                var D = new r("late cancellation observer");
                return b._attachExtraTrace(D), i.e = D, i;
              } else g.isPending() && g._attachCancellationCallback(
                new a(this)
              );
            return g._then(
              c,
              s,
              void 0,
              this,
              void 0
            );
          }
        }
      }
      return b.isRejected() ? (o(this), i.e = m, i) : (o(this), m);
    }
    return e.prototype._passThrough = function(m, b, p, l) {
      return typeof m != "function" ? this.then() : this._then(
        p,
        l,
        void 0,
        new u(this, b, m),
        void 0
      );
    }, e.prototype.lastly = e.prototype.finally = function(m) {
      return this._passThrough(
        m,
        0,
        f,
        f
      );
    }, e.prototype.tap = function(m) {
      return this._passThrough(m, 1, f);
    }, u;
  }), So;
}
var Bo, ol;
function lD() {
  return ol || (ol = 1, Bo = function(e) {
    var t = De(), n = Hr().keys, r = t.tryCatch, i = t.errorObj;
    function u(a, o, c) {
      return function(s) {
        var f = c._boundValue();
        e: for (var m = 0; m < a.length; ++m) {
          var b = a[m];
          if (b === Error || b != null && b.prototype instanceof Error) {
            if (s instanceof b)
              return r(o).call(f, s);
          } else if (typeof b == "function") {
            var p = r(b).call(f, s);
            if (p === i)
              return p;
            if (p)
              return r(o).call(f, s);
          } else if (t.isObject(s)) {
            for (var l = n(b), g = 0; g < l.length; ++g) {
              var D = l[g];
              if (b[D] != s[D])
                continue e;
            }
            return r(o).call(f, s);
          }
        }
        return e;
      };
    }
    return u;
  }), Bo;
}
var Io, cl;
function d2() {
  if (cl) return Io;
  cl = 1;
  var e = De(), t = e.maybeWrapAsError, n = Wn(), r = n.OperationalError, i = Hr();
  function u(s) {
    return s instanceof Error && i.getPrototypeOf(s) === Error.prototype;
  }
  var a = /^(?:name|message|stack|cause)$/;
  function o(s) {
    var f;
    if (u(s)) {
      f = new r(s), f.name = s.name, f.message = s.message, f.stack = s.stack;
      for (var m = i.keys(s), b = 0; b < m.length; ++b) {
        var p = m[b];
        a.test(p) || (f[p] = s[p]);
      }
      return f;
    }
    return e.markAsOriginatingFromRejection(s), s;
  }
  function c(s, f) {
    return function(m, b) {
      if (s !== null) {
        if (m) {
          var p = o(t(m));
          s._attachExtraTrace(p), s._reject(p);
        } else if (!f)
          s._fulfill(b);
        else {
          for (var l = arguments.length, g = new Array(Math.max(l - 1, 0)), D = 1; D < l; ++D)
            g[D - 1] = arguments[D];
          s._fulfill(g);
        }
        s = null;
      }
    };
  }
  return Io = c, Io;
}
var No, sl;
function hD() {
  return sl || (sl = 1, No = function(e, t, n, r, i) {
    var u = De(), a = u.tryCatch;
    e.method = function(o) {
      if (typeof o != "function")
        throw new e.TypeError("expecting a function but got " + u.classString(o));
      return function() {
        var c = new e(t);
        c._captureStackTrace(), c._pushContext();
        var s = a(o).apply(this, arguments), f = c._popContext();
        return i.checkForgottenReturns(
          s,
          f,
          "Promise.method",
          c
        ), c._resolveFromSyncValue(s), c;
      };
    }, e.attempt = e.try = function(o) {
      if (typeof o != "function")
        return r("expecting a function but got " + u.classString(o));
      var c = new e(t);
      c._captureStackTrace(), c._pushContext();
      var s;
      if (arguments.length > 1) {
        i.deprecated("calling Promise.try with more than 1 argument");
        var f = arguments[1], m = arguments[2];
        s = u.isArray(f) ? a(o).apply(m, f) : a(o).call(m, f);
      } else
        s = a(o)();
      var b = c._popContext();
      return i.checkForgottenReturns(
        s,
        b,
        "Promise.try",
        c
      ), c._resolveFromSyncValue(s), c;
    }, e.prototype._resolveFromSyncValue = function(o) {
      o === u.errorObj ? this._rejectCallback(o.e, !1) : this._resolveCallback(o, !0);
    };
  }), No;
}
var Ro, fl;
function pD() {
  return fl || (fl = 1, Ro = function(e, t, n, r) {
    var i = !1, u = function(s, f) {
      this._reject(f);
    }, a = function(s, f) {
      f.promiseRejectionQueued = !0, f.bindingPromise._then(u, u, null, this, s);
    }, o = function(s, f) {
      this._bitField & 50397184 || this._resolveCallback(f.target);
    }, c = function(s, f) {
      f.promiseRejectionQueued || this._reject(s);
    };
    e.prototype.bind = function(s) {
      i || (i = !0, e.prototype._propagateFrom = r.propagateFromFunction(), e.prototype._boundValue = r.boundValueFunction());
      var f = n(s), m = new e(t);
      m._propagateFrom(this, 1);
      var b = this._target();
      if (m._setBoundTo(f), f instanceof e) {
        var p = {
          promiseRejectionQueued: !1,
          promise: m,
          target: b,
          bindingPromise: f
        };
        b._then(t, a, void 0, m, p), f._then(
          o,
          c,
          void 0,
          m,
          p
        ), m._setOnCancel(f);
      } else
        m._resolveCallback(b);
      return m;
    }, e.prototype._setBoundTo = function(s) {
      s !== void 0 ? (this._bitField = this._bitField | 2097152, this._boundTo = s) : this._bitField = this._bitField & -2097153;
    }, e.prototype._isBound = function() {
      return (this._bitField & 2097152) === 2097152;
    }, e.bind = function(s, f) {
      return e.resolve(f).bind(s);
    };
  }), Ro;
}
var Oo, dl;
function gD() {
  return dl || (dl = 1, Oo = function(e, t, n, r) {
    var i = De(), u = i.tryCatch, a = i.errorObj, o = e._async;
    e.prototype.break = e.prototype.cancel = function() {
      if (!r.cancellation()) return this._warn("cancellation is disabled");
      for (var c = this, s = c; c._isCancellable(); ) {
        if (!c._cancelBy(s)) {
          s._isFollowing() ? s._followee().cancel() : s._cancelBranched();
          break;
        }
        var f = c._cancellationParent;
        if (f == null || !f._isCancellable()) {
          c._isFollowing() ? c._followee().cancel() : c._cancelBranched();
          break;
        } else
          c._isFollowing() && c._followee().cancel(), c._setWillBeCancelled(), s = c, c = f;
      }
    }, e.prototype._branchHasCancelled = function() {
      this._branchesRemainingToCancel--;
    }, e.prototype._enoughBranchesHaveCancelled = function() {
      return this._branchesRemainingToCancel === void 0 || this._branchesRemainingToCancel <= 0;
    }, e.prototype._cancelBy = function(c) {
      return c === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), this._enoughBranchesHaveCancelled() ? (this._invokeOnCancel(), !0) : !1);
    }, e.prototype._cancelBranched = function() {
      this._enoughBranchesHaveCancelled() && this._cancel();
    }, e.prototype._cancel = function() {
      this._isCancellable() && (this._setCancelled(), o.invoke(this._cancelPromises, this, void 0));
    }, e.prototype._cancelPromises = function() {
      this._length() > 0 && this._settlePromises();
    }, e.prototype._unsetOnCancel = function() {
      this._onCancelField = void 0;
    }, e.prototype._isCancellable = function() {
      return this.isPending() && !this._isCancelled();
    }, e.prototype.isCancellable = function() {
      return this.isPending() && !this.isCancelled();
    }, e.prototype._doInvokeOnCancel = function(c, s) {
      if (i.isArray(c))
        for (var f = 0; f < c.length; ++f)
          this._doInvokeOnCancel(c[f], s);
      else if (c !== void 0)
        if (typeof c == "function") {
          if (!s) {
            var m = u(c).call(this._boundValue());
            m === a && (this._attachExtraTrace(m.e), o.throwLater(m.e));
          }
        } else
          c._resultCancelled(this);
    }, e.prototype._invokeOnCancel = function() {
      var c = this._onCancel();
      this._unsetOnCancel(), o.invoke(this._doInvokeOnCancel, this, c);
    }, e.prototype._invokeInternalOnCancel = function() {
      this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
    }, e.prototype._resultCancelled = function() {
      this.cancel();
    };
  }), Oo;
}
var Lo, ll;
function bD() {
  return ll || (ll = 1, Lo = function(e) {
    function t() {
      return this.value;
    }
    function n() {
      throw this.reason;
    }
    e.prototype.return = e.prototype.thenReturn = function(r) {
      return r instanceof e && r.suppressUnhandledRejections(), this._then(
        t,
        void 0,
        void 0,
        { value: r },
        void 0
      );
    }, e.prototype.throw = e.prototype.thenThrow = function(r) {
      return this._then(
        n,
        void 0,
        void 0,
        { reason: r },
        void 0
      );
    }, e.prototype.catchThrow = function(r) {
      if (arguments.length <= 1)
        return this._then(
          void 0,
          n,
          void 0,
          { reason: r },
          void 0
        );
      var i = arguments[1], u = function() {
        throw i;
      };
      return this.caught(r, u);
    }, e.prototype.catchReturn = function(r) {
      if (arguments.length <= 1)
        return r instanceof e && r.suppressUnhandledRejections(), this._then(
          void 0,
          t,
          void 0,
          { value: r },
          void 0
        );
      var i = arguments[1];
      i instanceof e && i.suppressUnhandledRejections();
      var u = function() {
        return i;
      };
      return this.caught(r, u);
    };
  }), Lo;
}
var Wo, hl;
function mD() {
  return hl || (hl = 1, Wo = function(e) {
    function t(c) {
      c !== void 0 ? (c = c._target(), this._bitField = c._bitField, this._settledValueField = c._isFateSealed() ? c._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0);
    }
    t.prototype._settledValue = function() {
      return this._settledValueField;
    };
    var n = t.prototype.value = function() {
      if (!this.isFulfilled())
        throw new TypeError(`cannot get fulfillment value of a non-fulfilled promise

    See http://goo.gl/MqrFmX
`);
      return this._settledValue();
    }, r = t.prototype.error = t.prototype.reason = function() {
      if (!this.isRejected())
        throw new TypeError(`cannot get rejection reason of a non-rejected promise

    See http://goo.gl/MqrFmX
`);
      return this._settledValue();
    }, i = t.prototype.isFulfilled = function() {
      return (this._bitField & 33554432) !== 0;
    }, u = t.prototype.isRejected = function() {
      return (this._bitField & 16777216) !== 0;
    }, a = t.prototype.isPending = function() {
      return (this._bitField & 50397184) === 0;
    }, o = t.prototype.isResolved = function() {
      return (this._bitField & 50331648) !== 0;
    };
    t.prototype.isCancelled = function() {
      return (this._bitField & 8454144) !== 0;
    }, e.prototype.__isCancelled = function() {
      return (this._bitField & 65536) === 65536;
    }, e.prototype._isCancelled = function() {
      return this._target().__isCancelled();
    }, e.prototype.isCancelled = function() {
      return (this._target()._bitField & 8454144) !== 0;
    }, e.prototype.isPending = function() {
      return a.call(this._target());
    }, e.prototype.isRejected = function() {
      return u.call(this._target());
    }, e.prototype.isFulfilled = function() {
      return i.call(this._target());
    }, e.prototype.isResolved = function() {
      return o.call(this._target());
    }, e.prototype.value = function() {
      return n.call(this._target());
    }, e.prototype.reason = function() {
      var c = this._target();
      return c._unsetRejectionIsUnhandled(), r.call(c);
    }, e.prototype._value = function() {
      return this._settledValue();
    }, e.prototype._reason = function() {
      return this._unsetRejectionIsUnhandled(), this._settledValue();
    }, e.PromiseInspection = t;
  }), Wo;
}
var Mo, pl;
function yD() {
  return pl || (pl = 1, Mo = function(e, t, n, r, i, u) {
    var a = De(), o = a.canEvaluate, c = a.tryCatch, s = a.errorObj, f;
    if (o) {
      for (var m = function(d) {
        return new Function("value", "holder", `                             
	            'use strict';                                                    
	            holder.pIndex = value;                                           
	            holder.checkFulfillment(this);                                   
	            `.replace(/Index/g, d));
      }, b = function(d) {
        return new Function("promise", "holder", `                           
	            'use strict';                                                    
	            holder.pIndex = promise;                                         
	            `.replace(/Index/g, d));
      }, p = function(d) {
        for (var y = new Array(d), x = 0; x < y.length; ++x)
          y[x] = "this.p" + (x + 1);
        var v = y.join(" = ") + " = null;", _ = `var promise;
` + y.map(function(P) {
          return `                                                         
	                promise = ` + P + `;                                      
	                if (promise instanceof Promise) {                            
	                    promise.cancel();                                        
	                }                                                            
	            `;
        }).join(`
`), w = y.join(", "), A = "Holder$" + d, B = `return function(tryCatch, errorObj, Promise, async) {    
	            'use strict';                                                    
	            function [TheName](fn) {                                         
	                [TheProperties]                                              
	                this.fn = fn;                                                
	                this.asyncNeeded = true;                                     
	                this.now = 0;                                                
	            }                                                                
	                                                                             
	            [TheName].prototype._callFunction = function(promise) {          
	                promise._pushContext();                                      
	                var ret = tryCatch(this.fn)([ThePassedArguments]);           
	                promise._popContext();                                       
	                if (ret === errorObj) {                                      
	                    promise._rejectCallback(ret.e, false);                   
	                } else {                                                     
	                    promise._resolveCallback(ret);                           
	                }                                                            
	            };                                                               
	                                                                             
	            [TheName].prototype.checkFulfillment = function(promise) {       
	                var now = ++this.now;                                        
	                if (now === [TheTotal]) {                                    
	                    if (this.asyncNeeded) {                                  
	                        async.invoke(this._callFunction, this, promise);     
	                    } else {                                                 
	                        this._callFunction(promise);                         
	                    }                                                        
	                                                                             
	                }                                                            
	            };                                                               
	                                                                             
	            [TheName].prototype._resultCancelled = function() {              
	                [CancellationCode]                                           
	            };                                                               
	                                                                             
	            return [TheName];                                                
	        }(tryCatch, errorObj, Promise, async);                               
	        `;
        return B = B.replace(/\[TheName\]/g, A).replace(/\[TheTotal\]/g, d).replace(/\[ThePassedArguments\]/g, w).replace(/\[TheProperties\]/g, v).replace(/\[CancellationCode\]/g, _), new Function("tryCatch", "errorObj", "Promise", "async", B)(c, s, e, i);
      }, l = [], g = [], D = [], h = 0; h < 8; ++h)
        l.push(p(h + 1)), g.push(m(h + 1)), D.push(b(h + 1));
      f = function(d) {
        this._reject(d);
      };
    }
    e.join = function() {
      var d = arguments.length - 1, y;
      if (d > 0 && typeof arguments[d] == "function" && (y = arguments[d], d <= 8 && o)) {
        var H = new e(r);
        H._captureStackTrace();
        for (var x = l[d - 1], v = new x(y), _ = g, w = 0; w < d; ++w) {
          var A = n(arguments[w], H);
          if (A instanceof e) {
            A = A._target();
            var B = A._bitField;
            B & 50397184 ? B & 33554432 ? _[w].call(
              H,
              A._value(),
              v
            ) : B & 16777216 ? H._reject(A._reason()) : H._cancel() : (A._then(
              _[w],
              f,
              void 0,
              H,
              v
            ), D[w](A, v), v.asyncNeeded = !1);
          } else
            _[w].call(H, A, v);
        }
        if (!H._isFateSealed()) {
          if (v.asyncNeeded) {
            var P = u();
            P !== null && (v.fn = a.domainBind(P, v.fn));
          }
          H._setAsyncGuaranteed(), H._setOnCancel(v);
        }
        return H;
      }
      for (var L = arguments.length, I = new Array(L), z = 0; z < L; ++z)
        I[z] = arguments[z];
      y && I.pop();
      var H = new t(I).promise();
      return y !== void 0 ? H.spread(y) : H;
    };
  }), Mo;
}
var Po, gl;
function DD() {
  return gl || (gl = 1, Po = function(e, t, n, r, i, u) {
    var a = e._getDomain, o = De(), c = o.tryCatch, s = o.errorObj, f = e._async;
    function m(p, l, g, D) {
      this.constructor$(p), this._promise._captureStackTrace();
      var h = a();
      this._callback = h === null ? l : o.domainBind(h, l), this._preservedValues = D === i ? new Array(this.length()) : null, this._limit = g, this._inFlight = 0, this._queue = [], f.invoke(this._asyncInit, this, void 0);
    }
    o.inherits(m, t), m.prototype._asyncInit = function() {
      this._init$(void 0, -2);
    }, m.prototype._init = function() {
    }, m.prototype._promiseFulfilled = function(p, l) {
      var g = this._values, D = this.length(), h = this._preservedValues, d = this._limit;
      if (l < 0) {
        if (l = l * -1 - 1, g[l] = p, d >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved()))
          return !0;
      } else {
        if (d >= 1 && this._inFlight >= d)
          return g[l] = p, this._queue.push(l), !1;
        h !== null && (h[l] = p);
        var y = this._promise, x = this._callback, v = y._boundValue();
        y._pushContext();
        var _ = c(x).call(v, p, l, D), w = y._popContext();
        if (u.checkForgottenReturns(
          _,
          w,
          h !== null ? "Promise.filter" : "Promise.map",
          y
        ), _ === s)
          return this._reject(_.e), !0;
        var A = r(_, this._promise);
        if (A instanceof e) {
          A = A._target();
          var B = A._bitField;
          if (B & 50397184)
            if (B & 33554432)
              _ = A._value();
            else return B & 16777216 ? (this._reject(A._reason()), !0) : (this._cancel(), !0);
          else return d >= 1 && this._inFlight++, g[l] = A, A._proxy(this, (l + 1) * -1), !1;
        }
        g[l] = _;
      }
      var P = ++this._totalResolved;
      return P >= D ? (h !== null ? this._filter(g, h) : this._resolve(g), !0) : !1;
    }, m.prototype._drainQueue = function() {
      for (var p = this._queue, l = this._limit, g = this._values; p.length > 0 && this._inFlight < l; ) {
        if (this._isResolved()) return;
        var D = p.pop();
        this._promiseFulfilled(g[D], D);
      }
    }, m.prototype._filter = function(p, l) {
      for (var g = l.length, D = new Array(g), h = 0, d = 0; d < g; ++d)
        p[d] && (D[h++] = l[d]);
      D.length = h, this._resolve(D);
    }, m.prototype.preservedValues = function() {
      return this._preservedValues;
    };
    function b(p, l, g, D) {
      if (typeof l != "function")
        return n("expecting a function but got " + o.classString(l));
      var h = 0;
      if (g !== void 0)
        if (typeof g == "object" && g !== null) {
          if (typeof g.concurrency != "number")
            return e.reject(
              new TypeError("'concurrency' must be a number but it is " + o.classString(g.concurrency))
            );
          h = g.concurrency;
        } else
          return e.reject(new TypeError(
            "options argument must be an object but it is " + o.classString(g)
          ));
      return h = typeof h == "number" && isFinite(h) && h >= 1 ? h : 0, new m(p, l, h, D).promise();
    }
    e.prototype.map = function(p, l) {
      return b(this, p, l, null);
    }, e.map = function(p, l, g, D) {
      return b(p, l, g, D);
    };
  }), Po;
}
var qo, bl;
function xD() {
  if (bl) return qo;
  bl = 1;
  var e = Object.create;
  if (e) {
    var t = e(null), n = e(null);
    t[" size"] = n[" size"] = 0;
  }
  return qo = function(r) {
    var i = De(), u = i.canEvaluate, a = i.isIdentifier, o, c;
    {
      var s = function(D) {
        return new Function("ensureMethod", `                                    
	        return function(obj) {                                               
	            'use strict'                                                     
	            var len = this.length;                                           
	            ensureMethod(obj, 'methodName');                                 
	            switch(len) {                                                    
	                case 1: return obj.methodName(this[0]);                      
	                case 2: return obj.methodName(this[0], this[1]);             
	                case 3: return obj.methodName(this[0], this[1], this[2]);    
	                case 0: return obj.methodName();                             
	                default:                                                     
	                    return obj.methodName.apply(obj, this);                  
	            }                                                                
	        };                                                                   
	        `.replace(/methodName/g, D))(b);
      }, f = function(D) {
        return new Function("obj", `                                             
	        'use strict';                                                        
	        return obj.propertyName;                                             
	        `.replace("propertyName", D));
      }, m = function(D, h, d) {
        var y = d[D];
        if (typeof y != "function") {
          if (!a(D))
            return null;
          if (y = h(D), d[D] = y, d[" size"]++, d[" size"] > 512) {
            for (var x = Object.keys(d), v = 0; v < 256; ++v) delete d[x[v]];
            d[" size"] = x.length - 256;
          }
        }
        return y;
      };
      o = function(D) {
        return m(D, s, t);
      }, c = function(D) {
        return m(D, f, n);
      };
    }
    function b(D, h) {
      var d;
      if (D != null && (d = D[h]), typeof d != "function") {
        var y = "Object " + i.classString(D) + " has no method '" + i.toString(h) + "'";
        throw new r.TypeError(y);
      }
      return d;
    }
    function p(D) {
      var h = this.pop(), d = b(D, h);
      return d.apply(D, this);
    }
    r.prototype.call = function(D) {
      for (var h = arguments.length, d = new Array(Math.max(h - 1, 0)), y = 1; y < h; ++y)
        d[y - 1] = arguments[y];
      if (u) {
        var x = o(D);
        if (x !== null)
          return this._then(
            x,
            void 0,
            void 0,
            d,
            void 0
          );
      }
      return d.push(D), this._then(p, void 0, void 0, d, void 0);
    };
    function l(D) {
      return D[this];
    }
    function g(D) {
      var h = +this;
      return h < 0 && (h = Math.max(0, h + D.length)), D[h];
    }
    r.prototype.get = function(D) {
      var h = typeof D == "number", d;
      if (h)
        d = g;
      else if (u) {
        var y = c(D);
        d = y !== null ? y : l;
      } else
        d = l;
      return this._then(d, void 0, void 0, D, void 0);
    };
  }, qo;
}
var zo, ml;
function vD() {
  return ml || (ml = 1, zo = function(e, t, n, r, i, u) {
    var a = De(), o = Wn().TypeError, c = De().inherits, s = a.errorObj, f = a.tryCatch, m = {};
    function b(y) {
      setTimeout(function() {
        throw y;
      }, 0);
    }
    function p(y) {
      var x = n(y);
      return x !== y && typeof y._isDisposable == "function" && typeof y._getDisposer == "function" && y._isDisposable() && x._setDisposable(y._getDisposer()), x;
    }
    function l(y, x) {
      var v = 0, _ = y.length, w = new e(i);
      function A() {
        if (v >= _) return w._fulfill();
        var B = p(y[v++]);
        if (B instanceof e && B._isDisposable()) {
          try {
            B = n(
              B._getDisposer().tryDispose(x),
              y.promise
            );
          } catch (P) {
            return b(P);
          }
          if (B instanceof e)
            return B._then(
              A,
              b,
              null,
              null,
              null
            );
        }
        A();
      }
      return A(), w;
    }
    function g(y, x, v) {
      this._data = y, this._promise = x, this._context = v;
    }
    g.prototype.data = function() {
      return this._data;
    }, g.prototype.promise = function() {
      return this._promise;
    }, g.prototype.resource = function() {
      return this.promise().isFulfilled() ? this.promise().value() : m;
    }, g.prototype.tryDispose = function(y) {
      var x = this.resource(), v = this._context;
      v !== void 0 && v._pushContext();
      var _ = x !== m ? this.doDispose(x, y) : null;
      return v !== void 0 && v._popContext(), this._promise._unsetDisposable(), this._data = null, _;
    }, g.isDisposer = function(y) {
      return y != null && typeof y.resource == "function" && typeof y.tryDispose == "function";
    };
    function D(y, x, v) {
      this.constructor$(y, x, v);
    }
    c(D, g), D.prototype.doDispose = function(y, x) {
      var v = this.data();
      return v.call(y, y, x);
    };
    function h(y) {
      return g.isDisposer(y) ? (this.resources[this.index]._setDisposable(y), y.promise()) : y;
    }
    function d(y) {
      this.length = y, this.promise = null, this[y - 1] = null;
    }
    d.prototype._resultCancelled = function() {
      for (var y = this.length, x = 0; x < y; ++x) {
        var v = this[x];
        v instanceof e && v.cancel();
      }
    }, e.using = function() {
      var y = arguments.length;
      if (y < 2) return t(
        "you must pass at least 2 arguments to Promise.using"
      );
      var x = arguments[y - 1];
      if (typeof x != "function")
        return t("expecting a function but got " + a.classString(x));
      var v, _ = !0;
      y === 2 && Array.isArray(arguments[0]) ? (v = arguments[0], y = v.length, _ = !1) : (v = arguments, y--);
      for (var w = new d(y), A = 0; A < y; ++A) {
        var B = v[A];
        if (g.isDisposer(B)) {
          var P = B;
          B = B.promise(), B._setDisposable(P);
        } else {
          var L = n(B);
          L instanceof e && (B = L._then(h, null, null, {
            resources: w,
            index: A
          }, void 0));
        }
        w[A] = B;
      }
      for (var I = new Array(w.length), A = 0; A < I.length; ++A)
        I[A] = e.resolve(w[A]).reflect();
      var z = e.all(I).then(function(G) {
        for (var C = 0; C < G.length; ++C) {
          var U = G[C];
          if (U.isRejected())
            return s.e = U.error(), s;
          if (!U.isFulfilled()) {
            z.cancel();
            return;
          }
          G[C] = U.value();
        }
        H._pushContext(), x = f(x);
        var E = _ ? x.apply(void 0, G) : x(G), k = H._popContext();
        return u.checkForgottenReturns(
          E,
          k,
          "Promise.using",
          H
        ), E;
      }), H = z.lastly(function() {
        var G = new e.PromiseInspection(z);
        return l(w, G);
      });
      return w.promise = H, H._setOnCancel(w), H;
    }, e.prototype._setDisposable = function(y) {
      this._bitField = this._bitField | 131072, this._disposer = y;
    }, e.prototype._isDisposable = function() {
      return (this._bitField & 131072) > 0;
    }, e.prototype._getDisposer = function() {
      return this._disposer;
    }, e.prototype._unsetDisposable = function() {
      this._bitField = this._bitField & -131073, this._disposer = void 0;
    }, e.prototype.disposer = function(y) {
      if (typeof y == "function")
        return new D(y, this, r());
      throw new o();
    };
  }), zo;
}
var $o, yl;
function _D() {
  return yl || (yl = 1, $o = function(e, t, n) {
    var r = De(), i = e.TimeoutError;
    function u(m) {
      this.handle = m;
    }
    u.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
    };
    var a = function(m) {
      return o(+this).thenReturn(m);
    }, o = e.delay = function(m, b) {
      var p, l;
      return b !== void 0 ? (p = e.resolve(b)._then(a, null, null, m, void 0), n.cancellation() && b instanceof e && p._setOnCancel(b)) : (p = new e(t), l = setTimeout(function() {
        p._fulfill();
      }, +m), n.cancellation() && p._setOnCancel(new u(l)), p._captureStackTrace()), p._setAsyncGuaranteed(), p;
    };
    e.prototype.delay = function(m) {
      return o(m, this);
    };
    var c = function(m, b, p) {
      var l;
      typeof b != "string" ? b instanceof Error ? l = b : l = new i("operation timed out") : l = new i(b), r.markAsOriginatingFromRejection(l), m._attachExtraTrace(l), m._reject(l), p != null && p.cancel();
    };
    function s(m) {
      return clearTimeout(this.handle), m;
    }
    function f(m) {
      throw clearTimeout(this.handle), m;
    }
    e.prototype.timeout = function(m, b) {
      m = +m;
      var p, l, g = new u(setTimeout(function() {
        p.isPending() && c(p, b, l);
      }, m));
      return n.cancellation() ? (l = this.then(), p = l._then(
        s,
        f,
        void 0,
        g,
        void 0
      ), p._setOnCancel(g)) : p = this._then(
        s,
        f,
        void 0,
        g,
        void 0
      ), p;
    };
  }), $o;
}
var jo, Dl;
function ED() {
  return Dl || (Dl = 1, jo = function(e, t, n, r, i, u) {
    var a = Wn(), o = a.TypeError, c = De(), s = c.errorObj, f = c.tryCatch, m = [];
    function b(l, g, D) {
      for (var h = 0; h < g.length; ++h) {
        D._pushContext();
        var d = f(g[h])(l);
        if (D._popContext(), d === s) {
          D._pushContext();
          var y = e.reject(s.e);
          return D._popContext(), y;
        }
        var x = r(d, D);
        if (x instanceof e) return x;
      }
      return null;
    }
    function p(l, g, D, h) {
      if (u.cancellation()) {
        var d = new e(n), y = this._finallyPromise = new e(n);
        this._promise = d.lastly(function() {
          return y;
        }), d._captureStackTrace(), d._setOnCancel(this);
      } else {
        var x = this._promise = new e(n);
        x._captureStackTrace();
      }
      this._stack = h, this._generatorFunction = l, this._receiver = g, this._generator = void 0, this._yieldHandlers = typeof D == "function" ? [D].concat(m) : m, this._yieldedPromise = null, this._cancellationPhase = !1;
    }
    c.inherits(p, i), p.prototype._isResolved = function() {
      return this._promise === null;
    }, p.prototype._cleanup = function() {
      this._promise = this._generator = null, u.cancellation() && this._finallyPromise !== null && (this._finallyPromise._fulfill(), this._finallyPromise = null);
    }, p.prototype._promiseCancelled = function() {
      if (!this._isResolved()) {
        var l = typeof this._generator.return < "u", g;
        if (l)
          this._promise._pushContext(), g = f(this._generator.return).call(
            this._generator,
            void 0
          ), this._promise._popContext();
        else {
          var D = new e.CancellationError(
            "generator .return() sentinel"
          );
          e.coroutine.returnSentinel = D, this._promise._attachExtraTrace(D), this._promise._pushContext(), g = f(this._generator.throw).call(
            this._generator,
            D
          ), this._promise._popContext();
        }
        this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(g);
      }
    }, p.prototype._promiseFulfilled = function(l) {
      this._yieldedPromise = null, this._promise._pushContext();
      var g = f(this._generator.next).call(this._generator, l);
      this._promise._popContext(), this._continue(g);
    }, p.prototype._promiseRejected = function(l) {
      this._yieldedPromise = null, this._promise._attachExtraTrace(l), this._promise._pushContext();
      var g = f(this._generator.throw).call(this._generator, l);
      this._promise._popContext(), this._continue(g);
    }, p.prototype._resultCancelled = function() {
      if (this._yieldedPromise instanceof e) {
        var l = this._yieldedPromise;
        this._yieldedPromise = null, l.cancel();
      }
    }, p.prototype.promise = function() {
      return this._promise;
    }, p.prototype._run = function() {
      this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0);
    }, p.prototype._continue = function(l) {
      var g = this._promise;
      if (l === s)
        return this._cleanup(), this._cancellationPhase ? g.cancel() : g._rejectCallback(l.e, !1);
      var D = l.value;
      if (l.done === !0)
        return this._cleanup(), this._cancellationPhase ? g.cancel() : g._resolveCallback(D);
      var h = r(D, this._promise);
      if (!(h instanceof e) && (h = b(
        h,
        this._yieldHandlers,
        this._promise
      ), h === null)) {
        this._promiseRejected(
          new o(
            `A value %s was yielded that could not be treated as a promise

    See http://goo.gl/MqrFmX

`.replace("%s", D) + `From coroutine:
` + this._stack.split(`
`).slice(1, -7).join(`
`)
          )
        );
        return;
      }
      h = h._target();
      var d = h._bitField;
      d & 50397184 ? d & 33554432 ? e._async.invoke(
        this._promiseFulfilled,
        this,
        h._value()
      ) : d & 16777216 ? e._async.invoke(
        this._promiseRejected,
        this,
        h._reason()
      ) : this._promiseCancelled() : (this._yieldedPromise = h, h._proxy(this, null));
    }, e.coroutine = function(l, g) {
      if (typeof l != "function")
        throw new o(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);
      var D = Object(g).yieldHandler, h = p, d = new Error().stack;
      return function() {
        var y = l.apply(this, arguments), x = new h(
          void 0,
          void 0,
          D,
          d
        ), v = x.promise();
        return x._generator = y, x._promiseFulfilled(void 0), v;
      };
    }, e.coroutine.addYieldHandler = function(l) {
      if (typeof l != "function")
        throw new o("expecting a function but got " + c.classString(l));
      m.push(l);
    }, e.spawn = function(l) {
      if (u.deprecated("Promise.spawn()", "Promise.coroutine()"), typeof l != "function")
        return t(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);
      var g = new p(l, this), D = g.promise();
      return g._run(e.spawn), D;
    };
  }), jo;
}
var Ho, xl;
function wD() {
  return xl || (xl = 1, Ho = function(e) {
    var t = De(), n = e._async, r = t.tryCatch, i = t.errorObj;
    function u(c, s) {
      var f = this;
      if (!t.isArray(c)) return a.call(f, c, s);
      var m = r(s).apply(f._boundValue(), [null].concat(c));
      m === i && n.throwLater(m.e);
    }
    function a(c, s) {
      var f = this, m = f._boundValue(), b = c === void 0 ? r(s).call(m, null) : r(s).call(m, null, c);
      b === i && n.throwLater(b.e);
    }
    function o(c, s) {
      var f = this;
      if (!c) {
        var m = new Error(c + "");
        m.cause = c, c = m;
      }
      var b = r(s).call(f._boundValue(), c);
      b === i && n.throwLater(b.e);
    }
    e.prototype.asCallback = e.prototype.nodeify = function(c, s) {
      if (typeof c == "function") {
        var f = a;
        s !== void 0 && Object(s).spread && (f = u), this._then(
          f,
          o,
          void 0,
          this,
          c
        );
      }
      return this;
    };
  }), Ho;
}
var Xo, vl;
function UD() {
  return vl || (vl = 1, Xo = function(e, t) {
    var n = {}, r = De(), i = d2(), u = r.withAppended, a = r.maybeWrapAsError, o = r.canEvaluate, c = Wn().TypeError, s = "Async", f = { __isPromisified__: !0 }, m = [
      "arity",
      "length",
      "name",
      "arguments",
      "caller",
      "callee",
      "prototype",
      "__isPromisified__"
    ], b = new RegExp("^(?:" + m.join("|") + ")$"), p = function(z) {
      return r.isIdentifier(z) && z.charAt(0) !== "_" && z !== "constructor";
    };
    function l(z) {
      return !b.test(z);
    }
    function g(z) {
      try {
        return z.__isPromisified__ === !0;
      } catch {
        return !1;
      }
    }
    function D(z, H, G) {
      var C = r.getDataPropertyOrDefault(
        z,
        H + G,
        f
      );
      return C ? g(C) : !1;
    }
    function h(z, H, G) {
      for (var C = 0; C < z.length; C += 2) {
        var U = z[C];
        if (G.test(U)) {
          for (var E = U.replace(G, ""), k = 0; k < z.length; k += 2)
            if (z[k] === E)
              throw new c(`Cannot promisify an API that has normal methods with '%s'-suffix

    See http://goo.gl/MqrFmX
`.replace("%s", H));
        }
      }
    }
    function d(z, H, G, C) {
      for (var U = r.inheritedDataKeys(z), E = [], k = 0; k < U.length; ++k) {
        var R = U[k], M = z[R], S = C === p ? !0 : p(R);
        typeof M == "function" && !g(M) && !D(z, R, H) && C(R, M, z, S) && E.push(R, M);
      }
      return h(E, H, G), E;
    }
    var y = function(z) {
      return z.replace(/([$])/, "\\$");
    }, x;
    {
      var v = function(z) {
        for (var H = [z], G = Math.max(0, z - 1 - 3), C = z - 1; C >= G; --C)
          H.push(C);
        for (var C = z + 1; C <= 3; ++C)
          H.push(C);
        return H;
      }, _ = function(z) {
        return r.filledRange(z, "_arg", "");
      }, w = function(z) {
        return r.filledRange(
          Math.max(z, 3),
          "_arg",
          ""
        );
      }, A = function(z) {
        return typeof z.length == "number" ? Math.max(Math.min(z.length, 1024), 0) : 0;
      };
      x = function(z, H, G, C, U, E) {
        var k = Math.max(0, A(C) - 1), R = v(k), M = typeof z == "string" || H === n;
        function S(Q) {
          var T = _(Q).join(", "), F = Q > 0 ? ", " : "", X;
          return M ? X = `ret = callback.call(this, {{args}}, nodeback); break;
` : X = H === void 0 ? `ret = callback({{args}}, nodeback); break;
` : `ret = callback.call(receiver, {{args}}, nodeback); break;
`, X.replace("{{args}}", T).replace(", ", F);
        }
        function $() {
          for (var Q = "", T = 0; T < R.length; ++T)
            Q += "case " + R[T] + ":" + S(R[T]);
          return Q += `                                                             
	        default:                                                             
	            var args = new Array(len + 1);                                   
	            var i = 0;                                                       
	            for (var i = 0; i < len; ++i) {                                  
	               args[i] = arguments[i];                                       
	            }                                                                
	            args[i] = nodeback;                                              
	            [CodeForCall]                                                    
	            break;                                                           
	        `.replace("[CodeForCall]", M ? `ret = callback.apply(this, args);
` : `ret = callback.apply(receiver, args);
`), Q;
        }
        var ee = typeof z == "string" ? "this != null ? this['" + z + "'] : fn" : "fn", te = `'use strict';                                                
	        var ret = function (Parameters) {                                    
	            'use strict';                                                    
	            var len = arguments.length;                                      
	            var promise = new Promise(INTERNAL);                             
	            promise._captureStackTrace();                                    
	            var nodeback = nodebackForPromise(promise, ` + E + `);   
	            var ret;                                                         
	            var callback = tryCatch([GetFunctionCode]);                      
	            switch(len) {                                                    
	                [CodeForSwitchCase]                                          
	            }                                                                
	            if (ret === errorObj) {                                          
	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);
	            }                                                                
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     
	            return promise;                                                  
	        };                                                                   
	        notEnumerableProp(ret, '__isPromisified__', true);                   
	        return ret;                                                          
	    `.replace("[CodeForSwitchCase]", $()).replace("[GetFunctionCode]", ee);
        return te = te.replace("Parameters", w(k)), new Function(
          "Promise",
          "fn",
          "receiver",
          "withAppended",
          "maybeWrapAsError",
          "nodebackForPromise",
          "tryCatch",
          "errorObj",
          "notEnumerableProp",
          "INTERNAL",
          te
        )(
          e,
          C,
          H,
          u,
          a,
          i,
          r.tryCatch,
          r.errorObj,
          r.notEnumerableProp,
          t
        );
      };
    }
    function B(z, H, G, C, U, E) {
      var k = /* @__PURE__ */ function() {
        return this;
      }(), R = z;
      typeof R == "string" && (z = C);
      function M() {
        var S = H;
        H === n && (S = this);
        var $ = new e(t);
        $._captureStackTrace();
        var ee = typeof R == "string" && this !== k ? this[R] : z, te = i($, E);
        try {
          ee.apply(S, u(arguments, te));
        } catch (Q) {
          $._rejectCallback(a(Q), !0, !0);
        }
        return $._isFateSealed() || $._setAsyncGuaranteed(), $;
      }
      return r.notEnumerableProp(M, "__isPromisified__", !0), M;
    }
    var P = o ? x : B;
    function L(z, H, G, C, U) {
      for (var E = new RegExp(y(H) + "$"), k = d(z, H, E, G), R = 0, M = k.length; R < M; R += 2) {
        var S = k[R], $ = k[R + 1], ee = S + H;
        if (C === P)
          z[ee] = P(S, n, S, $, H, U);
        else {
          var te = C($, function() {
            return P(
              S,
              n,
              S,
              $,
              H,
              U
            );
          });
          r.notEnumerableProp(te, "__isPromisified__", !0), z[ee] = te;
        }
      }
      return r.toFastProperties(z), z;
    }
    function I(z, H, G) {
      return P(
        z,
        H,
        void 0,
        z,
        null,
        G
      );
    }
    e.promisify = function(z, H) {
      if (typeof z != "function")
        throw new c("expecting a function but got " + r.classString(z));
      if (g(z))
        return z;
      H = Object(H);
      var G = H.context === void 0 ? n : H.context, C = !!H.multiArgs, U = I(z, G, C);
      return r.copyDescriptors(z, U, l), U;
    }, e.promisifyAll = function(z, H) {
      if (typeof z != "function" && typeof z != "object")
        throw new c(`the target of promisifyAll must be an object or a function

    See http://goo.gl/MqrFmX
`);
      H = Object(H);
      var G = !!H.multiArgs, C = H.suffix;
      typeof C != "string" && (C = s);
      var U = H.filter;
      typeof U != "function" && (U = p);
      var E = H.promisifier;
      if (typeof E != "function" && (E = P), !r.isIdentifier(C))
        throw new RangeError(`suffix must be a valid identifier

    See http://goo.gl/MqrFmX
`);
      for (var k = r.inheritedDataKeys(z), R = 0; R < k.length; ++R) {
        var M = z[k[R]];
        k[R] !== "constructor" && r.isClass(M) && (L(
          M.prototype,
          C,
          U,
          E,
          G
        ), L(M, C, U, E, G));
      }
      return L(z, C, U, E, G);
    };
  }), Xo;
}
var Zo, _l;
function TD() {
  return _l || (_l = 1, Zo = function(e, t, n, r) {
    var i = De(), u = i.isObject, a = Hr(), o;
    typeof Map == "function" && (o = Map);
    var c = /* @__PURE__ */ function() {
      var b = 0, p = 0;
      function l(g, D) {
        this[b] = g, this[b + p] = D, b++;
      }
      return function(D) {
        p = D.size, b = 0;
        var h = new Array(D.size * 2);
        return D.forEach(l, h), h;
      };
    }(), s = function(b) {
      for (var p = new o(), l = b.length / 2 | 0, g = 0; g < l; ++g) {
        var D = b[l + g], h = b[g];
        p.set(D, h);
      }
      return p;
    };
    function f(b) {
      var p = !1, l;
      if (o !== void 0 && b instanceof o)
        l = c(b), p = !0;
      else {
        var g = a.keys(b), D = g.length;
        l = new Array(D * 2);
        for (var h = 0; h < D; ++h) {
          var d = g[h];
          l[h] = b[d], l[h + D] = d;
        }
      }
      this.constructor$(l), this._isMap = p, this._init$(void 0, -3);
    }
    i.inherits(f, t), f.prototype._init = function() {
    }, f.prototype._promiseFulfilled = function(b, p) {
      this._values[p] = b;
      var l = ++this._totalResolved;
      if (l >= this._length) {
        var g;
        if (this._isMap)
          g = s(this._values);
        else {
          g = {};
          for (var D = this.length(), h = 0, d = this.length(); h < d; ++h)
            g[this._values[h + D]] = this._values[h];
        }
        return this._resolve(g), !0;
      }
      return !1;
    }, f.prototype.shouldCopyValues = function() {
      return !1;
    }, f.prototype.getActualLength = function(b) {
      return b >> 1;
    };
    function m(b) {
      var p, l = n(b);
      if (u(l))
        l instanceof e ? p = l._then(
          e.props,
          void 0,
          void 0,
          void 0,
          void 0
        ) : p = new f(l).promise();
      else return r(`cannot await properties of a non-object

    See http://goo.gl/MqrFmX
`);
      return l instanceof e && p._propagateFrom(l, 2), p;
    }
    e.prototype.props = function() {
      return m(this);
    }, e.props = function(b) {
      return m(b);
    };
  }), Zo;
}
var Vo, El;
function CD() {
  return El || (El = 1, Vo = function(e, t, n, r) {
    var i = De(), u = function(o) {
      return o.then(function(c) {
        return a(c, o);
      });
    };
    function a(o, c) {
      var s = n(o);
      if (s instanceof e)
        return u(s);
      if (o = i.asArray(o), o === null)
        return r("expecting an array or an iterable object but got " + i.classString(o));
      var f = new e(t);
      c !== void 0 && f._propagateFrom(c, 3);
      for (var m = f._fulfill, b = f._reject, p = 0, l = o.length; p < l; ++p) {
        var g = o[p];
        g === void 0 && !(p in o) || e.cast(g)._then(m, b, void 0, f, null);
      }
      return f;
    }
    e.race = function(o) {
      return a(o, void 0);
    }, e.prototype.race = function() {
      return a(this, void 0);
    };
  }), Vo;
}
var Go, wl;
function AD() {
  return wl || (wl = 1, Go = function(e, t, n, r, i, u) {
    var a = e._getDomain, o = De(), c = o.tryCatch;
    function s(l, g, D, h) {
      this.constructor$(l);
      var d = a();
      this._fn = d === null ? g : o.domainBind(d, g), D !== void 0 && (D = e.resolve(D), D._attachCancellationCallback(this)), this._initialValue = D, this._currentCancellable = null, h === i ? this._eachValues = Array(this._length) : h === 0 ? this._eachValues = null : this._eachValues = void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
    }
    o.inherits(s, t), s.prototype._gotAccum = function(l) {
      this._eachValues !== void 0 && this._eachValues !== null && l !== i && this._eachValues.push(l);
    }, s.prototype._eachComplete = function(l) {
      return this._eachValues !== null && this._eachValues.push(l), this._eachValues;
    }, s.prototype._init = function() {
    }, s.prototype._resolveEmptyArray = function() {
      this._resolve(this._eachValues !== void 0 ? this._eachValues : this._initialValue);
    }, s.prototype.shouldCopyValues = function() {
      return !1;
    }, s.prototype._resolve = function(l) {
      this._promise._resolveCallback(l), this._values = null;
    }, s.prototype._resultCancelled = function(l) {
      if (l === this._initialValue) return this._cancel();
      this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel());
    }, s.prototype._iterate = function(l) {
      this._values = l;
      var g, D, h = l.length;
      if (this._initialValue !== void 0 ? (g = this._initialValue, D = 0) : (g = e.resolve(l[0]), D = 1), this._currentCancellable = g, !g.isRejected())
        for (; D < h; ++D) {
          var d = {
            accum: null,
            value: l[D],
            index: D,
            length: h,
            array: this
          };
          g = g._then(b, void 0, void 0, d, void 0);
        }
      this._eachValues !== void 0 && (g = g._then(this._eachComplete, void 0, void 0, this, void 0)), g._then(f, f, void 0, g, this);
    }, e.prototype.reduce = function(l, g) {
      return m(this, l, g, null);
    }, e.reduce = function(l, g, D, h) {
      return m(l, g, D, h);
    };
    function f(l, g) {
      this.isFulfilled() ? g._resolve(l) : g._reject(l);
    }
    function m(l, g, D, h) {
      if (typeof g != "function")
        return n("expecting a function but got " + o.classString(g));
      var d = new s(l, g, D, h);
      return d.promise();
    }
    function b(l) {
      this.accum = l, this.array._gotAccum(l);
      var g = r(this.value, this.array._promise);
      return g instanceof e ? (this.array._currentCancellable = g, g._then(p, void 0, void 0, this, void 0)) : p.call(this, g);
    }
    function p(l) {
      var g = this.array, D = g._promise, h = c(g._fn);
      D._pushContext();
      var d;
      g._eachValues !== void 0 ? d = h.call(D._boundValue(), l, this.index, this.length) : d = h.call(
        D._boundValue(),
        this.accum,
        l,
        this.index,
        this.length
      ), d instanceof e && (g._currentCancellable = d);
      var y = D._popContext();
      return u.checkForgottenReturns(
        d,
        y,
        g._eachValues !== void 0 ? "Promise.each" : "Promise.reduce",
        D
      ), d;
    }
  }), Go;
}
var Yo, Ul;
function FD() {
  return Ul || (Ul = 1, Yo = function(e, t, n) {
    var r = e.PromiseInspection, i = De();
    function u(a) {
      this.constructor$(a);
    }
    i.inherits(u, t), u.prototype._promiseResolved = function(a, o) {
      this._values[a] = o;
      var c = ++this._totalResolved;
      return c >= this._length ? (this._resolve(this._values), !0) : !1;
    }, u.prototype._promiseFulfilled = function(a, o) {
      var c = new r();
      return c._bitField = 33554432, c._settledValueField = a, this._promiseResolved(o, c);
    }, u.prototype._promiseRejected = function(a, o) {
      var c = new r();
      return c._bitField = 16777216, c._settledValueField = a, this._promiseResolved(o, c);
    }, e.settle = function(a) {
      return n.deprecated(".settle()", ".reflect()"), new u(a).promise();
    }, e.prototype.settle = function() {
      return e.settle(this);
    };
  }), Yo;
}
var Ko, Tl;
function kD() {
  return Tl || (Tl = 1, Ko = function(e, t, n) {
    var r = De(), i = Wn().RangeError, u = Wn().AggregateError, a = r.isArray, o = {};
    function c(f) {
      this.constructor$(f), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
    }
    r.inherits(c, t), c.prototype._init = function() {
      if (this._initialized) {
        if (this._howMany === 0) {
          this._resolve([]);
          return;
        }
        this._init$(void 0, -5);
        var f = a(this._values);
        !this._isResolved() && f && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
      }
    }, c.prototype.init = function() {
      this._initialized = !0, this._init();
    }, c.prototype.setUnwrap = function() {
      this._unwrap = !0;
    }, c.prototype.howMany = function() {
      return this._howMany;
    }, c.prototype.setHowMany = function(f) {
      this._howMany = f;
    }, c.prototype._promiseFulfilled = function(f) {
      return this._addFulfilled(f), this._fulfilled() === this.howMany() ? (this._values.length = this.howMany(), this.howMany() === 1 && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0) : !1;
    }, c.prototype._promiseRejected = function(f) {
      return this._addRejected(f), this._checkOutcome();
    }, c.prototype._promiseCancelled = function() {
      return this._values instanceof e || this._values == null ? this._cancel() : (this._addRejected(o), this._checkOutcome());
    }, c.prototype._checkOutcome = function() {
      if (this.howMany() > this._canPossiblyFulfill()) {
        for (var f = new u(), m = this.length(); m < this._values.length; ++m)
          this._values[m] !== o && f.push(this._values[m]);
        return f.length > 0 ? this._reject(f) : this._cancel(), !0;
      }
      return !1;
    }, c.prototype._fulfilled = function() {
      return this._totalResolved;
    }, c.prototype._rejected = function() {
      return this._values.length - this.length();
    }, c.prototype._addRejected = function(f) {
      this._values.push(f);
    }, c.prototype._addFulfilled = function(f) {
      this._values[this._totalResolved++] = f;
    }, c.prototype._canPossiblyFulfill = function() {
      return this.length() - this._rejected();
    }, c.prototype._getRangeError = function(f) {
      var m = "Input array must contain at least " + this._howMany + " items but contains only " + f + " items";
      return new i(m);
    }, c.prototype._resolveEmptyArray = function() {
      this._reject(this._getRangeError(0));
    };
    function s(f, m) {
      if ((m | 0) !== m || m < 0)
        return n(`expecting a positive integer

    See http://goo.gl/MqrFmX
`);
      var b = new c(f), p = b.promise();
      return b.setHowMany(m), b.init(), p;
    }
    e.some = function(f, m) {
      return s(f, m);
    }, e.prototype.some = function(f) {
      return s(this, f);
    }, e._SomePromiseArray = c;
  }), Ko;
}
var Qo, Cl;
function SD() {
  return Cl || (Cl = 1, Qo = function(e, t) {
    var n = e.map;
    e.prototype.filter = function(r, i) {
      return n(this, r, i, t);
    }, e.filter = function(r, i, u) {
      return n(r, i, u, t);
    };
  }), Qo;
}
var Jo, Al;
function BD() {
  return Al || (Al = 1, Jo = function(e, t) {
    var n = e.reduce, r = e.all;
    function i() {
      return r(this);
    }
    function u(a, o) {
      return n(a, o, t, t);
    }
    e.prototype.each = function(a) {
      return n(this, a, t, 0)._then(i, void 0, void 0, this, void 0);
    }, e.prototype.mapSeries = function(a) {
      return n(this, a, t, t);
    }, e.each = function(a, o) {
      return n(a, o, t, 0)._then(i, void 0, void 0, a, void 0);
    }, e.mapSeries = u;
  }), Jo;
}
var ec, Fl;
function ID() {
  return Fl || (Fl = 1, ec = function(e) {
    var t = e._SomePromiseArray;
    function n(r) {
      var i = new t(r), u = i.promise();
      return i.setHowMany(1), i.setUnwrap(), i.init(), u;
    }
    e.any = function(r) {
      return n(r);
    }, e.prototype.any = function() {
      return n(this);
    };
  }), ec;
}
(function(e) {
  e.exports = function() {
    var t = function() {
      return new b(`circular promise resolution chain

    See http://goo.gl/MqrFmX
`);
    }, n = function() {
      return new I.PromiseInspection(this._target());
    }, r = function(C) {
      return I.reject(new b(C));
    };
    function i() {
    }
    var u = {}, a = De(), o;
    a.isNode ? o = function() {
      var C = process.domain;
      return C === void 0 && (C = null), C;
    } : o = function() {
      return null;
    }, a.notEnumerableProp(I, "_getDomain", o);
    var c = Hr(), s = aD(), f = new s();
    c.defineProperty(I, "_async", { value: f });
    var m = Wn(), b = I.TypeError = m.TypeError;
    I.RangeError = m.RangeError;
    var p = I.CancellationError = m.CancellationError;
    I.TimeoutError = m.TimeoutError, I.OperationalError = m.OperationalError, I.RejectionError = m.OperationalError, I.AggregateError = m.AggregateError;
    var l = function() {
    }, g = {}, D = {}, h = oD()(I, l), d = cD()(
      I,
      l,
      h,
      r,
      i
    ), y = sD()(I), x = y.create, v = fD()(I, y);
    v.CapturedTrace;
    var _ = dD()(I, h), w = lD()(D), A = d2(), B = a.errorObj, P = a.tryCatch;
    function L(C, U) {
      if (typeof U != "function")
        throw new b("expecting a function but got " + a.classString(U));
      if (C.constructor !== I)
        throw new b(`the promise constructor cannot be invoked directly

    See http://goo.gl/MqrFmX
`);
    }
    function I(C) {
      this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, C !== l && (L(this, C), this._resolveFromExecutor(C)), this._promiseCreated(), this._fireEvent("promiseCreated", this);
    }
    I.prototype.toString = function() {
      return "[object Promise]";
    }, I.prototype.caught = I.prototype.catch = function(C) {
      var U = arguments.length;
      if (U > 1) {
        var E = new Array(U - 1), k = 0, R;
        for (R = 0; R < U - 1; ++R) {
          var M = arguments[R];
          if (a.isObject(M))
            E[k++] = M;
          else
            return r("expecting an object but got A catch statement predicate " + a.classString(M));
        }
        return E.length = k, C = arguments[R], this.then(void 0, w(E, C, this));
      }
      return this.then(void 0, C);
    }, I.prototype.reflect = function() {
      return this._then(
        n,
        n,
        void 0,
        this,
        void 0
      );
    }, I.prototype.then = function(C, U) {
      if (v.warnings() && arguments.length > 0 && typeof C != "function" && typeof U != "function") {
        var E = ".then() only accepts functions but was passed: " + a.classString(C);
        arguments.length > 1 && (E += ", " + a.classString(U)), this._warn(E);
      }
      return this._then(C, U, void 0, void 0, void 0);
    }, I.prototype.done = function(C, U) {
      var E = this._then(C, U, void 0, void 0, void 0);
      E._setIsFinal();
    }, I.prototype.spread = function(C) {
      return typeof C != "function" ? r("expecting a function but got " + a.classString(C)) : this.all()._then(C, void 0, void 0, g, void 0);
    }, I.prototype.toJSON = function() {
      var C = {
        isFulfilled: !1,
        isRejected: !1,
        fulfillmentValue: void 0,
        rejectionReason: void 0
      };
      return this.isFulfilled() ? (C.fulfillmentValue = this.value(), C.isFulfilled = !0) : this.isRejected() && (C.rejectionReason = this.reason(), C.isRejected = !0), C;
    }, I.prototype.all = function() {
      return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new d(this).promise();
    }, I.prototype.error = function(C) {
      return this.caught(a.originatesFromRejection, C);
    }, I.getNewLibraryCopy = e.exports, I.is = function(C) {
      return C instanceof I;
    }, I.fromNode = I.fromCallback = function(C) {
      var U = new I(l);
      U._captureStackTrace();
      var E = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : !1, k = P(C)(A(U, E));
      return k === B && U._rejectCallback(k.e, !0), U._isFateSealed() || U._setAsyncGuaranteed(), U;
    }, I.all = function(C) {
      return new d(C).promise();
    }, I.cast = function(C) {
      var U = h(C);
      return U instanceof I || (U = new I(l), U._captureStackTrace(), U._setFulfilled(), U._rejectionHandler0 = C), U;
    }, I.resolve = I.fulfilled = I.cast, I.reject = I.rejected = function(C) {
      var U = new I(l);
      return U._captureStackTrace(), U._rejectCallback(C, !0), U;
    }, I.setScheduler = function(C) {
      if (typeof C != "function")
        throw new b("expecting a function but got " + a.classString(C));
      return f.setScheduler(C);
    }, I.prototype._then = function(C, U, E, k, R) {
      var M = R !== void 0, S = M ? R : new I(l), $ = this._target(), ee = $._bitField;
      M || (S._propagateFrom(this, 3), S._captureStackTrace(), k === void 0 && this._bitField & 2097152 && (ee & 50397184 ? k = this._boundValue() : k = $ === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, S));
      var te = o();
      if (ee & 50397184) {
        var Q, T, F = $._settlePromiseCtx;
        ee & 33554432 ? (T = $._rejectionHandler0, Q = C) : ee & 16777216 ? (T = $._fulfillmentHandler0, Q = U, $._unsetRejectionIsUnhandled()) : (F = $._settlePromiseLateCancellationObserver, T = new p("late cancellation observer"), $._attachExtraTrace(T), Q = U), f.invoke(F, $, {
          handler: te === null ? Q : typeof Q == "function" && a.domainBind(te, Q),
          promise: S,
          receiver: k,
          value: T
        });
      } else
        $._addCallbacks(C, U, S, k, te);
      return S;
    }, I.prototype._length = function() {
      return this._bitField & 65535;
    }, I.prototype._isFateSealed = function() {
      return (this._bitField & 117506048) !== 0;
    }, I.prototype._isFollowing = function() {
      return (this._bitField & 67108864) === 67108864;
    }, I.prototype._setLength = function(C) {
      this._bitField = this._bitField & -65536 | C & 65535;
    }, I.prototype._setFulfilled = function() {
      this._bitField = this._bitField | 33554432, this._fireEvent("promiseFulfilled", this);
    }, I.prototype._setRejected = function() {
      this._bitField = this._bitField | 16777216, this._fireEvent("promiseRejected", this);
    }, I.prototype._setFollowing = function() {
      this._bitField = this._bitField | 67108864, this._fireEvent("promiseResolved", this);
    }, I.prototype._setIsFinal = function() {
      this._bitField = this._bitField | 4194304;
    }, I.prototype._isFinal = function() {
      return (this._bitField & 4194304) > 0;
    }, I.prototype._unsetCancelled = function() {
      this._bitField = this._bitField & -65537;
    }, I.prototype._setCancelled = function() {
      this._bitField = this._bitField | 65536, this._fireEvent("promiseCancelled", this);
    }, I.prototype._setWillBeCancelled = function() {
      this._bitField = this._bitField | 8388608;
    }, I.prototype._setAsyncGuaranteed = function() {
      f.hasCustomScheduler() || (this._bitField = this._bitField | 134217728);
    }, I.prototype._receiverAt = function(C) {
      var U = C === 0 ? this._receiver0 : this[C * 4 - 4 + 3];
      if (U !== u)
        return U === void 0 && this._isBound() ? this._boundValue() : U;
    }, I.prototype._promiseAt = function(C) {
      return this[C * 4 - 4 + 2];
    }, I.prototype._fulfillmentHandlerAt = function(C) {
      return this[C * 4 - 4 + 0];
    }, I.prototype._rejectionHandlerAt = function(C) {
      return this[C * 4 - 4 + 1];
    }, I.prototype._boundValue = function() {
    }, I.prototype._migrateCallback0 = function(C) {
      C._bitField;
      var U = C._fulfillmentHandler0, E = C._rejectionHandler0, k = C._promise0, R = C._receiverAt(0);
      R === void 0 && (R = u), this._addCallbacks(U, E, k, R, null);
    }, I.prototype._migrateCallbackAt = function(C, U) {
      var E = C._fulfillmentHandlerAt(U), k = C._rejectionHandlerAt(U), R = C._promiseAt(U), M = C._receiverAt(U);
      M === void 0 && (M = u), this._addCallbacks(E, k, R, M, null);
    }, I.prototype._addCallbacks = function(C, U, E, k, R) {
      var M = this._length();
      if (M >= 65531 && (M = 0, this._setLength(0)), M === 0)
        this._promise0 = E, this._receiver0 = k, typeof C == "function" && (this._fulfillmentHandler0 = R === null ? C : a.domainBind(R, C)), typeof U == "function" && (this._rejectionHandler0 = R === null ? U : a.domainBind(R, U));
      else {
        var S = M * 4 - 4;
        this[S + 2] = E, this[S + 3] = k, typeof C == "function" && (this[S + 0] = R === null ? C : a.domainBind(R, C)), typeof U == "function" && (this[S + 1] = R === null ? U : a.domainBind(R, U));
      }
      return this._setLength(M + 1), M;
    }, I.prototype._proxy = function(C, U) {
      this._addCallbacks(void 0, void 0, U, C, null);
    }, I.prototype._resolveCallback = function(C, U) {
      if (!(this._bitField & 117506048)) {
        if (C === this)
          return this._rejectCallback(t(), !1);
        var E = h(C, this);
        if (!(E instanceof I)) return this._fulfill(C);
        U && this._propagateFrom(E, 2);
        var k = E._target();
        if (k === this) {
          this._reject(t());
          return;
        }
        var R = k._bitField;
        if (R & 50397184)
          if (R & 33554432)
            this._fulfill(k._value());
          else if (R & 16777216)
            this._reject(k._reason());
          else {
            var $ = new p("late cancellation observer");
            k._attachExtraTrace($), this._reject($);
          }
        else {
          var M = this._length();
          M > 0 && k._migrateCallback0(this);
          for (var S = 1; S < M; ++S)
            k._migrateCallbackAt(this, S);
          this._setFollowing(), this._setLength(0), this._setFollowee(k);
        }
      }
    }, I.prototype._rejectCallback = function(C, U, E) {
      var k = a.ensureErrorObject(C), R = k === C;
      if (!R && !E && v.warnings()) {
        var M = "a promise was rejected with a non-error: " + a.classString(C);
        this._warn(M, !0);
      }
      this._attachExtraTrace(k, U ? R : !1), this._reject(C);
    }, I.prototype._resolveFromExecutor = function(C) {
      var U = this;
      this._captureStackTrace(), this._pushContext();
      var E = !0, k = this._execute(C, function(R) {
        U._resolveCallback(R);
      }, function(R) {
        U._rejectCallback(R, E);
      });
      E = !1, this._popContext(), k !== void 0 && U._rejectCallback(k, !0);
    }, I.prototype._settlePromiseFromHandler = function(C, U, E, k) {
      var R = k._bitField;
      if (!(R & 65536)) {
        k._pushContext();
        var M;
        U === g ? !E || typeof E.length != "number" ? (M = B, M.e = new b("cannot .spread() a non-array: " + a.classString(E))) : M = P(C).apply(this._boundValue(), E) : M = P(C).call(U, E);
        var S = k._popContext();
        R = k._bitField, !(R & 65536) && (M === D ? k._reject(E) : M === B ? k._rejectCallback(M.e, !1) : (v.checkForgottenReturns(M, S, "", k, this), k._resolveCallback(M)));
      }
    }, I.prototype._target = function() {
      for (var C = this; C._isFollowing(); ) C = C._followee();
      return C;
    }, I.prototype._followee = function() {
      return this._rejectionHandler0;
    }, I.prototype._setFollowee = function(C) {
      this._rejectionHandler0 = C;
    }, I.prototype._settlePromise = function(C, U, E, k) {
      var R = C instanceof I, M = this._bitField, S = (M & 134217728) !== 0;
      M & 65536 ? (R && C._invokeInternalOnCancel(), E instanceof _ && E.isFinallyHandler() ? (E.cancelPromise = C, P(U).call(E, k) === B && C._reject(B.e)) : U === n ? C._fulfill(n.call(E)) : E instanceof i ? E._promiseCancelled(C) : R || C instanceof d ? C._cancel() : E.cancel()) : typeof U == "function" ? R ? (S && C._setAsyncGuaranteed(), this._settlePromiseFromHandler(U, E, k, C)) : U.call(E, k, C) : E instanceof i ? E._isResolved() || (M & 33554432 ? E._promiseFulfilled(k, C) : E._promiseRejected(k, C)) : R && (S && C._setAsyncGuaranteed(), M & 33554432 ? C._fulfill(k) : C._reject(k));
    }, I.prototype._settlePromiseLateCancellationObserver = function(C) {
      var U = C.handler, E = C.promise, k = C.receiver, R = C.value;
      typeof U == "function" ? E instanceof I ? this._settlePromiseFromHandler(U, k, R, E) : U.call(k, R, E) : E instanceof I && E._reject(R);
    }, I.prototype._settlePromiseCtx = function(C) {
      this._settlePromise(C.promise, C.handler, C.receiver, C.value);
    }, I.prototype._settlePromise0 = function(C, U, E) {
      var k = this._promise0, R = this._receiverAt(0);
      this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(k, C, R, U);
    }, I.prototype._clearCallbackDataAtIndex = function(C) {
      var U = C * 4 - 4;
      this[U + 2] = this[U + 3] = this[U + 0] = this[U + 1] = void 0;
    }, I.prototype._fulfill = function(C) {
      var U = this._bitField;
      if (!((U & 117506048) >>> 16)) {
        if (C === this) {
          var E = t();
          return this._attachExtraTrace(E), this._reject(E);
        }
        this._setFulfilled(), this._rejectionHandler0 = C, (U & 65535) > 0 && (U & 134217728 ? this._settlePromises() : f.settlePromises(this));
      }
    }, I.prototype._reject = function(C) {
      var U = this._bitField;
      if (!((U & 117506048) >>> 16)) {
        if (this._setRejected(), this._fulfillmentHandler0 = C, this._isFinal())
          return f.fatalError(C, a.isNode);
        (U & 65535) > 0 ? f.settlePromises(this) : this._ensurePossibleRejectionHandled();
      }
    }, I.prototype._fulfillPromises = function(C, U) {
      for (var E = 1; E < C; E++) {
        var k = this._fulfillmentHandlerAt(E), R = this._promiseAt(E), M = this._receiverAt(E);
        this._clearCallbackDataAtIndex(E), this._settlePromise(R, k, M, U);
      }
    }, I.prototype._rejectPromises = function(C, U) {
      for (var E = 1; E < C; E++) {
        var k = this._rejectionHandlerAt(E), R = this._promiseAt(E), M = this._receiverAt(E);
        this._clearCallbackDataAtIndex(E), this._settlePromise(R, k, M, U);
      }
    }, I.prototype._settlePromises = function() {
      var C = this._bitField, U = C & 65535;
      if (U > 0) {
        if (C & 16842752) {
          var E = this._fulfillmentHandler0;
          this._settlePromise0(this._rejectionHandler0, E, C), this._rejectPromises(U, E);
        } else {
          var k = this._rejectionHandler0;
          this._settlePromise0(this._fulfillmentHandler0, k, C), this._fulfillPromises(U, k);
        }
        this._setLength(0);
      }
      this._clearCancellationData();
    }, I.prototype._settledValue = function() {
      var C = this._bitField;
      if (C & 33554432)
        return this._rejectionHandler0;
      if (C & 16777216)
        return this._fulfillmentHandler0;
    };
    function z(C) {
      this.promise._resolveCallback(C);
    }
    function H(C) {
      this.promise._rejectCallback(C, !1);
    }
    I.defer = I.pending = function() {
      v.deprecated("Promise.defer", "new Promise");
      var C = new I(l);
      return {
        promise: C,
        resolve: z,
        reject: H
      };
    }, a.notEnumerableProp(
      I,
      "_makeSelfResolutionError",
      t
    ), hD()(
      I,
      l,
      h,
      r,
      v
    ), pD()(I, l, h, v), gD()(I, d, r, v), bD()(I), mD()(I), yD()(
      I,
      d,
      h,
      l,
      f,
      o
    ), I.Promise = I, I.version = "3.4.7", DD()(I, d, r, h, l, v), xD()(I), vD()(I, r, h, x, l, v), _D()(I, l, v), ED()(I, r, l, h, i, v), wD()(I), UD()(I, l), TD()(I, d, h, r), CD()(I, l, h, r), AD()(I, d, r, h, l, v), FD()(I, d, v), kD()(I, d, r), SD()(I, l), BD()(I, l), ID()(I), a.toFastProperties(I), a.toFastProperties(I.prototype);
    function G(C) {
      var U = new I(l);
      U._fulfillmentHandler0 = C, U._rejectionHandler0 = C, U._promise0 = C, U._receiver0 = C;
    }
    return G({ a: 1 }), G({ b: 2 }), G({ c: 3 }), G(1), G(function() {
    }), G(void 0), G(!1), G(new I(l)), v.setBounds(s.firstLineError, a.lastLineError), I;
  };
})(f2);
var ND = f2.exports, RD = Ne, ft = ND();
je.defer = OD;
je.when = ft.resolve;
je.resolve = ft.resolve;
je.all = ft.all;
je.props = ft.props;
je.reject = ft.reject;
je.promisify = ft.promisify;
je.mapSeries = ft.mapSeries;
je.attempt = ft.attempt;
je.nfcall = function(e) {
  var t = Array.prototype.slice.call(arguments, 1), n = ft.promisify(e);
  return n.apply(null, t);
};
ft.prototype.fail = ft.prototype.caught;
ft.prototype.also = function(e) {
  return this.then(function(t) {
    var n = RD.extend({}, t, e(t));
    return ft.props(n);
  });
};
function OD() {
  var e, t, n = new ft.Promise(function(r, i) {
    e = r, t = i;
  });
  return {
    resolve: e,
    reject: t,
    promise: n
  };
}
var ce = {}, LD = Ne, Ge = ce.types = {
  document: "document",
  paragraph: "paragraph",
  run: "run",
  text: "text",
  tab: "tab",
  checkbox: "checkbox",
  hyperlink: "hyperlink",
  noteReference: "noteReference",
  image: "image",
  note: "note",
  commentReference: "commentReference",
  comment: "comment",
  table: "table",
  tableRow: "tableRow",
  tableCell: "tableCell",
  break: "break",
  bookmarkStart: "bookmarkStart"
};
function WD(e, t) {
  return t = t || {}, {
    type: Ge.document,
    children: e,
    notes: t.notes || new wa({}),
    comments: t.comments || []
  };
}
function MD(e, t) {
  t = t || {};
  var n = t.indent || {};
  return {
    type: Ge.paragraph,
    children: e,
    styleId: t.styleId || null,
    styleName: t.styleName || null,
    numbering: t.numbering || null,
    alignment: t.alignment || null,
    indent: {
      start: n.start || null,
      end: n.end || null,
      firstLine: n.firstLine || null,
      hanging: n.hanging || null
    }
  };
}
function PD(e, t) {
  return t = t || {}, {
    type: Ge.run,
    children: e,
    styleId: t.styleId || null,
    styleName: t.styleName || null,
    isBold: !!t.isBold,
    isUnderline: !!t.isUnderline,
    isItalic: !!t.isItalic,
    isStrikethrough: !!t.isStrikethrough,
    isAllCaps: !!t.isAllCaps,
    isSmallCaps: !!t.isSmallCaps,
    verticalAlignment: t.verticalAlignment || l2.baseline,
    font: t.font || null,
    fontSize: t.fontSize || null,
    highlight: t.highlight || null
  };
}
var l2 = {
  baseline: "baseline",
  superscript: "superscript",
  subscript: "subscript"
};
function qD(e) {
  return {
    type: Ge.text,
    value: e
  };
}
function zD() {
  return {
    type: Ge.tab
  };
}
function $D(e) {
  return {
    type: Ge.checkbox,
    checked: e.checked
  };
}
function jD(e, t) {
  return {
    type: Ge.hyperlink,
    children: e,
    href: t.href,
    anchor: t.anchor,
    targetFrame: t.targetFrame
  };
}
function HD(e) {
  return {
    type: Ge.noteReference,
    noteType: e.noteType,
    noteId: e.noteId
  };
}
function wa(e) {
  this._notes = LD.indexBy(e, function(t) {
    return h2(t.noteType, t.noteId);
  });
}
wa.prototype.resolve = function(e) {
  return this.findNoteByKey(h2(e.noteType, e.noteId));
};
wa.prototype.findNoteByKey = function(e) {
  return this._notes[e] || null;
};
function XD(e) {
  return {
    type: Ge.note,
    noteType: e.noteType,
    noteId: e.noteId,
    body: e.body
  };
}
function ZD(e) {
  return {
    type: Ge.commentReference,
    commentId: e.commentId
  };
}
function VD(e) {
  return {
    type: Ge.comment,
    commentId: e.commentId,
    body: e.body,
    authorName: e.authorName,
    authorInitials: e.authorInitials
  };
}
function h2(e, t) {
  return e + "-" + t;
}
function GD(e) {
  return {
    type: Ge.image,
    // `read` is retained for backwards compatibility, but other read
    // methods should be preferred.
    read: function(t) {
      return t ? e.readImage(t) : e.readImage().then(function(n) {
        return Buffer.from(n);
      });
    },
    readAsArrayBuffer: function() {
      return e.readImage();
    },
    readAsBase64String: function() {
      return e.readImage("base64");
    },
    readAsBuffer: function() {
      return e.readImage().then(function(t) {
        return Buffer.from(t);
      });
    },
    altText: e.altText,
    contentType: e.contentType
  };
}
function YD(e, t) {
  return t = t || {}, {
    type: Ge.table,
    children: e,
    styleId: t.styleId || null,
    styleName: t.styleName || null
  };
}
function KD(e, t) {
  return t = t || {}, {
    type: Ge.tableRow,
    children: e,
    isHeader: t.isHeader || !1
  };
}
function QD(e, t) {
  return t = t || {}, {
    type: Ge.tableCell,
    children: e,
    colSpan: t.colSpan == null ? 1 : t.colSpan,
    rowSpan: t.rowSpan == null ? 1 : t.rowSpan
  };
}
function Ff(e) {
  return {
    type: Ge.break,
    breakType: e
  };
}
function JD(e) {
  return {
    type: Ge.bookmarkStart,
    name: e.name
  };
}
ce.document = ce.Document = WD;
ce.paragraph = ce.Paragraph = MD;
ce.run = ce.Run = PD;
ce.text = ce.Text = qD;
ce.tab = ce.Tab = zD;
ce.checkbox = ce.Checkbox = $D;
ce.Hyperlink = jD;
ce.noteReference = ce.NoteReference = HD;
ce.Notes = wa;
ce.Note = XD;
ce.commentReference = ZD;
ce.comment = VD;
ce.Image = GD;
ce.Table = YD;
ce.TableRow = KD;
ce.TableCell = QD;
ce.lineBreak = Ff("line");
ce.pageBreak = Ff("page");
ce.columnBreak = Ff("column");
ce.BookmarkStart = JD;
ce.verticalAlignment = l2;
var vt = {}, Ci = Ne;
vt.Result = Jt;
vt.success = ex;
vt.warning = tx;
vt.error = nx;
function Jt(e, t) {
  this.value = e, this.messages = t || [];
}
Jt.prototype.map = function(e) {
  return new Jt(e(this.value), this.messages);
};
Jt.prototype.flatMap = function(e) {
  var t = e(this.value);
  return new Jt(t.value, kf([this, t]));
};
Jt.prototype.flatMapThen = function(e) {
  var t = this;
  return e(this.value).then(function(n) {
    return new Jt(n.value, kf([t, n]));
  });
};
Jt.combine = function(e) {
  var t = Ci.flatten(Ci.pluck(e, "value")), n = kf(e);
  return new Jt(t, n);
};
function ex(e) {
  return new Jt(e, []);
}
function tx(e) {
  return {
    type: "warning",
    message: e
  };
}
function nx(e) {
  return {
    type: "error",
    message: e.message,
    error: e
  };
}
function kf(e) {
  var t = [];
  return Ci.flatten(Ci.pluck(e, "messages"), !0).forEach(function(n) {
    rx(t, n) || t.push(n);
  }), t;
}
function rx(e, t) {
  return Ci.find(e, ix.bind(null, t)) !== void 0;
}
function ix(e, t) {
  return e.type === t.type && e.message === t.message;
}
var Gi = {}, Ua = {};
Ua.byteLength = ox;
Ua.toByteArray = sx;
Ua.fromByteArray = lx;
var Xt = [], Et = [], ux = typeof Uint8Array < "u" ? Uint8Array : Array, tc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var pr = 0, ax = tc.length; pr < ax; ++pr)
  Xt[pr] = tc[pr], Et[tc.charCodeAt(pr)] = pr;
Et[45] = 62;
Et[95] = 63;
function p2(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  n === -1 && (n = t);
  var r = n === t ? 0 : 4 - n % 4;
  return [n, r];
}
function ox(e) {
  var t = p2(e), n = t[0], r = t[1];
  return (n + r) * 3 / 4 - r;
}
function cx(e, t, n) {
  return (t + n) * 3 / 4 - n;
}
function sx(e) {
  var t, n = p2(e), r = n[0], i = n[1], u = new ux(cx(e, r, i)), a = 0, o = i > 0 ? r - 4 : r, c;
  for (c = 0; c < o; c += 4)
    t = Et[e.charCodeAt(c)] << 18 | Et[e.charCodeAt(c + 1)] << 12 | Et[e.charCodeAt(c + 2)] << 6 | Et[e.charCodeAt(c + 3)], u[a++] = t >> 16 & 255, u[a++] = t >> 8 & 255, u[a++] = t & 255;
  return i === 2 && (t = Et[e.charCodeAt(c)] << 2 | Et[e.charCodeAt(c + 1)] >> 4, u[a++] = t & 255), i === 1 && (t = Et[e.charCodeAt(c)] << 10 | Et[e.charCodeAt(c + 1)] << 4 | Et[e.charCodeAt(c + 2)] >> 2, u[a++] = t >> 8 & 255, u[a++] = t & 255), u;
}
function fx(e) {
  return Xt[e >> 18 & 63] + Xt[e >> 12 & 63] + Xt[e >> 6 & 63] + Xt[e & 63];
}
function dx(e, t, n) {
  for (var r, i = [], u = t; u < n; u += 3)
    r = (e[u] << 16 & 16711680) + (e[u + 1] << 8 & 65280) + (e[u + 2] & 255), i.push(fx(r));
  return i.join("");
}
function lx(e) {
  for (var t, n = e.length, r = n % 3, i = [], u = 16383, a = 0, o = n - r; a < o; a += u)
    i.push(dx(e, a, a + u > o ? o : a + u));
  return r === 1 ? (t = e[n - 1], i.push(
    Xt[t >> 2] + Xt[t << 4 & 63] + "=="
  )) : r === 2 && (t = (e[n - 2] << 8) + e[n - 1], i.push(
    Xt[t >> 10] + Xt[t >> 4 & 63] + Xt[t << 2 & 63] + "="
  )), i.join("");
}
var Xr = {}, nc = {}, Oe = {}, hu = { exports: {} }, pu = { exports: {} }, kl;
function Ta() {
  if (kl) return pu.exports;
  kl = 1, typeof process > "u" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0 ? pu.exports = { nextTick: e } : pu.exports = process;
  function e(t, n, r, i) {
    if (typeof t != "function")
      throw new TypeError('"callback" argument must be a function');
    var u = arguments.length, a, o;
    switch (u) {
      case 0:
      case 1:
        return process.nextTick(t);
      case 2:
        return process.nextTick(function() {
          t.call(null, n);
        });
      case 3:
        return process.nextTick(function() {
          t.call(null, n, r);
        });
      case 4:
        return process.nextTick(function() {
          t.call(null, n, r, i);
        });
      default:
        for (a = new Array(u - 1), o = 0; o < a.length; )
          a[o++] = arguments[o];
        return process.nextTick(function() {
          t.apply(null, a);
        });
    }
  }
  return pu.exports;
}
var rc, Sl;
function hx() {
  if (Sl) return rc;
  Sl = 1;
  var e = {}.toString;
  return rc = Array.isArray || function(t) {
    return e.call(t) == "[object Array]";
  }, rc;
}
var ic, Bl;
function g2() {
  return Bl || (Bl = 1, ic = Ip), ic;
}
var gu = { exports: {} }, Il;
function Ca() {
  return Il || (Il = 1, function(e, t) {
    var n = Ym, r = n.Buffer;
    function i(a, o) {
      for (var c in a)
        o[c] = a[c];
    }
    r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = n : (i(n, t), t.Buffer = u);
    function u(a, o, c) {
      return r(a, o, c);
    }
    i(r, u), u.from = function(a, o, c) {
      if (typeof a == "number")
        throw new TypeError("Argument must not be a number");
      return r(a, o, c);
    }, u.alloc = function(a, o, c) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      var s = r(a);
      return o !== void 0 ? typeof c == "string" ? s.fill(o, c) : s.fill(o) : s.fill(0), s;
    }, u.allocUnsafe = function(a) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      return r(a);
    }, u.allocUnsafeSlow = function(a) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      return n.SlowBuffer(a);
    };
  }(gu, gu.exports)), gu.exports;
}
var Xe = {}, Nl;
function Yi() {
  if (Nl) return Xe;
  Nl = 1;
  function e(g) {
    return Array.isArray ? Array.isArray(g) : l(g) === "[object Array]";
  }
  Xe.isArray = e;
  function t(g) {
    return typeof g == "boolean";
  }
  Xe.isBoolean = t;
  function n(g) {
    return g === null;
  }
  Xe.isNull = n;
  function r(g) {
    return g == null;
  }
  Xe.isNullOrUndefined = r;
  function i(g) {
    return typeof g == "number";
  }
  Xe.isNumber = i;
  function u(g) {
    return typeof g == "string";
  }
  Xe.isString = u;
  function a(g) {
    return typeof g == "symbol";
  }
  Xe.isSymbol = a;
  function o(g) {
    return g === void 0;
  }
  Xe.isUndefined = o;
  function c(g) {
    return l(g) === "[object RegExp]";
  }
  Xe.isRegExp = c;
  function s(g) {
    return typeof g == "object" && g !== null;
  }
  Xe.isObject = s;
  function f(g) {
    return l(g) === "[object Date]";
  }
  Xe.isDate = f;
  function m(g) {
    return l(g) === "[object Error]" || g instanceof Error;
  }
  Xe.isError = m;
  function b(g) {
    return typeof g == "function";
  }
  Xe.isFunction = b;
  function p(g) {
    return g === null || typeof g == "boolean" || typeof g == "number" || typeof g == "string" || typeof g == "symbol" || // ES6 symbol
    typeof g > "u";
  }
  Xe.isPrimitive = p, Xe.isBuffer = Buffer.isBuffer;
  function l(g) {
    return Object.prototype.toString.call(g);
  }
  return Xe;
}
var bu = { exports: {} }, mu = { exports: {} }, Rl;
function px() {
  return Rl || (Rl = 1, typeof Object.create == "function" ? mu.exports = function(t, n) {
    n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : mu.exports = function(t, n) {
    if (n) {
      t.super_ = n;
      var r = function() {
      };
      r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
    }
  }), mu.exports;
}
var Ol;
function Ki() {
  if (Ol) return bu.exports;
  Ol = 1;
  try {
    var e = require("util");
    if (typeof e.inherits != "function") throw "";
    bu.exports = e.inherits;
  } catch {
    bu.exports = px();
  }
  return bu.exports;
}
var uc = { exports: {} }, Ll;
function gx() {
  return Ll || (Ll = 1, function(e) {
    function t(u, a) {
      if (!(u instanceof a))
        throw new TypeError("Cannot call a class as a function");
    }
    var n = Ca().Buffer, r = zs;
    function i(u, a, o) {
      u.copy(a, o);
    }
    e.exports = function() {
      function u() {
        t(this, u), this.head = null, this.tail = null, this.length = 0;
      }
      return u.prototype.push = function(o) {
        var c = { data: o, next: null };
        this.length > 0 ? this.tail.next = c : this.head = c, this.tail = c, ++this.length;
      }, u.prototype.unshift = function(o) {
        var c = { data: o, next: this.head };
        this.length === 0 && (this.tail = c), this.head = c, ++this.length;
      }, u.prototype.shift = function() {
        if (this.length !== 0) {
          var o = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, o;
        }
      }, u.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, u.prototype.join = function(o) {
        if (this.length === 0) return "";
        for (var c = this.head, s = "" + c.data; c = c.next; )
          s += o + c.data;
        return s;
      }, u.prototype.concat = function(o) {
        if (this.length === 0) return n.alloc(0);
        for (var c = n.allocUnsafe(o >>> 0), s = this.head, f = 0; s; )
          i(s.data, c, f), f += s.data.length, s = s.next;
        return c;
      }, u;
    }(), r && r.inspect && r.inspect.custom && (e.exports.prototype[r.inspect.custom] = function() {
      var u = r.inspect({ length: this.length });
      return this.constructor.name + " " + u;
    });
  }(uc)), uc.exports;
}
var ac, Wl;
function b2() {
  if (Wl) return ac;
  Wl = 1;
  var e = Ta();
  function t(i, u) {
    var a = this, o = this._readableState && this._readableState.destroyed, c = this._writableState && this._writableState.destroyed;
    return o || c ? (u ? u(i) : i && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(r, this, i)) : e.nextTick(r, this, i)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(i || null, function(s) {
      !u && s ? a._writableState ? a._writableState.errorEmitted || (a._writableState.errorEmitted = !0, e.nextTick(r, a, s)) : e.nextTick(r, a, s) : u && u(s);
    }), this);
  }
  function n() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function r(i, u) {
    i.emit("error", u);
  }
  return ac = {
    destroy: t,
    undestroy: n
  }, ac;
}
var oc, Ml;
function bx() {
  return Ml || (Ml = 1, oc = zs.deprecate), oc;
}
var cc, Pl;
function m2() {
  if (Pl) return cc;
  Pl = 1;
  var e = Ta();
  cc = g;
  function t(U) {
    var E = this;
    this.next = null, this.entry = null, this.finish = function() {
      C(E, U);
    };
  }
  var n = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : e.nextTick, r;
  g.WritableState = p;
  var i = Object.create(Yi());
  i.inherits = Ki();
  var u = {
    deprecate: bx()
  }, a = g2(), o = Ca().Buffer, c = (typeof re < "u" ? re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(U) {
    return o.from(U);
  }
  function f(U) {
    return o.isBuffer(U) || U instanceof c;
  }
  var m = b2();
  i.inherits(g, a);
  function b() {
  }
  function p(U, E) {
    r = r || Rr(), U = U || {};
    var k = E instanceof r;
    this.objectMode = !!U.objectMode, k && (this.objectMode = this.objectMode || !!U.writableObjectMode);
    var R = U.highWaterMark, M = U.writableHighWaterMark, S = this.objectMode ? 16 : 16 * 1024;
    R || R === 0 ? this.highWaterMark = R : k && (M || M === 0) ? this.highWaterMark = M : this.highWaterMark = S, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var $ = U.decodeStrings === !1;
    this.decodeStrings = !$, this.defaultEncoding = U.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ee) {
      w(E, ee);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new t(this);
  }
  p.prototype.getBuffer = function() {
    for (var E = this.bufferedRequest, k = []; E; )
      k.push(E), E = E.next;
    return k;
  }, function() {
    try {
      Object.defineProperty(p.prototype, "buffer", {
        get: u.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var l;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (l = Function.prototype[Symbol.hasInstance], Object.defineProperty(g, Symbol.hasInstance, {
    value: function(U) {
      return l.call(this, U) ? !0 : this !== g ? !1 : U && U._writableState instanceof p;
    }
  })) : l = function(U) {
    return U instanceof this;
  };
  function g(U) {
    if (r = r || Rr(), !l.call(g, this) && !(this instanceof r))
      return new g(U);
    this._writableState = new p(U, this), this.writable = !0, U && (typeof U.write == "function" && (this._write = U.write), typeof U.writev == "function" && (this._writev = U.writev), typeof U.destroy == "function" && (this._destroy = U.destroy), typeof U.final == "function" && (this._final = U.final)), a.call(this);
  }
  g.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function D(U, E) {
    var k = new Error("write after end");
    U.emit("error", k), e.nextTick(E, k);
  }
  function h(U, E, k, R) {
    var M = !0, S = !1;
    return k === null ? S = new TypeError("May not write null values to stream") : typeof k != "string" && k !== void 0 && !E.objectMode && (S = new TypeError("Invalid non-string/buffer chunk")), S && (U.emit("error", S), e.nextTick(R, S), M = !1), M;
  }
  g.prototype.write = function(U, E, k) {
    var R = this._writableState, M = !1, S = !R.objectMode && f(U);
    return S && !o.isBuffer(U) && (U = s(U)), typeof E == "function" && (k = E, E = null), S ? E = "buffer" : E || (E = R.defaultEncoding), typeof k != "function" && (k = b), R.ended ? D(this, k) : (S || h(this, R, U, k)) && (R.pendingcb++, M = y(this, R, S, U, E, k)), M;
  }, g.prototype.cork = function() {
    var U = this._writableState;
    U.corked++;
  }, g.prototype.uncork = function() {
    var U = this._writableState;
    U.corked && (U.corked--, !U.writing && !U.corked && !U.bufferProcessing && U.bufferedRequest && P(this, U));
  }, g.prototype.setDefaultEncoding = function(E) {
    if (typeof E == "string" && (E = E.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((E + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + E);
    return this._writableState.defaultEncoding = E, this;
  };
  function d(U, E, k) {
    return !U.objectMode && U.decodeStrings !== !1 && typeof E == "string" && (E = o.from(E, k)), E;
  }
  Object.defineProperty(g.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function y(U, E, k, R, M, S) {
    if (!k) {
      var $ = d(E, R, M);
      R !== $ && (k = !0, M = "buffer", R = $);
    }
    var ee = E.objectMode ? 1 : R.length;
    E.length += ee;
    var te = E.length < E.highWaterMark;
    if (te || (E.needDrain = !0), E.writing || E.corked) {
      var Q = E.lastBufferedRequest;
      E.lastBufferedRequest = {
        chunk: R,
        encoding: M,
        isBuf: k,
        callback: S,
        next: null
      }, Q ? Q.next = E.lastBufferedRequest : E.bufferedRequest = E.lastBufferedRequest, E.bufferedRequestCount += 1;
    } else
      x(U, E, !1, ee, R, M, S);
    return te;
  }
  function x(U, E, k, R, M, S, $) {
    E.writelen = R, E.writecb = $, E.writing = !0, E.sync = !0, k ? U._writev(M, E.onwrite) : U._write(M, S, E.onwrite), E.sync = !1;
  }
  function v(U, E, k, R, M) {
    --E.pendingcb, k ? (e.nextTick(M, R), e.nextTick(H, U, E), U._writableState.errorEmitted = !0, U.emit("error", R)) : (M(R), U._writableState.errorEmitted = !0, U.emit("error", R), H(U, E));
  }
  function _(U) {
    U.writing = !1, U.writecb = null, U.length -= U.writelen, U.writelen = 0;
  }
  function w(U, E) {
    var k = U._writableState, R = k.sync, M = k.writecb;
    if (_(k), E) v(U, k, R, E, M);
    else {
      var S = L(k);
      !S && !k.corked && !k.bufferProcessing && k.bufferedRequest && P(U, k), R ? n(A, U, k, S, M) : A(U, k, S, M);
    }
  }
  function A(U, E, k, R) {
    k || B(U, E), E.pendingcb--, R(), H(U, E);
  }
  function B(U, E) {
    E.length === 0 && E.needDrain && (E.needDrain = !1, U.emit("drain"));
  }
  function P(U, E) {
    E.bufferProcessing = !0;
    var k = E.bufferedRequest;
    if (U._writev && k && k.next) {
      var R = E.bufferedRequestCount, M = new Array(R), S = E.corkedRequestsFree;
      S.entry = k;
      for (var $ = 0, ee = !0; k; )
        M[$] = k, k.isBuf || (ee = !1), k = k.next, $ += 1;
      M.allBuffers = ee, x(U, E, !0, E.length, M, "", S.finish), E.pendingcb++, E.lastBufferedRequest = null, S.next ? (E.corkedRequestsFree = S.next, S.next = null) : E.corkedRequestsFree = new t(E), E.bufferedRequestCount = 0;
    } else {
      for (; k; ) {
        var te = k.chunk, Q = k.encoding, T = k.callback, F = E.objectMode ? 1 : te.length;
        if (x(U, E, !1, F, te, Q, T), k = k.next, E.bufferedRequestCount--, E.writing)
          break;
      }
      k === null && (E.lastBufferedRequest = null);
    }
    E.bufferedRequest = k, E.bufferProcessing = !1;
  }
  g.prototype._write = function(U, E, k) {
    k(new Error("_write() is not implemented"));
  }, g.prototype._writev = null, g.prototype.end = function(U, E, k) {
    var R = this._writableState;
    typeof U == "function" ? (k = U, U = null, E = null) : typeof E == "function" && (k = E, E = null), U != null && this.write(U, E), R.corked && (R.corked = 1, this.uncork()), R.ending || G(this, R, k);
  };
  function L(U) {
    return U.ending && U.length === 0 && U.bufferedRequest === null && !U.finished && !U.writing;
  }
  function I(U, E) {
    U._final(function(k) {
      E.pendingcb--, k && U.emit("error", k), E.prefinished = !0, U.emit("prefinish"), H(U, E);
    });
  }
  function z(U, E) {
    !E.prefinished && !E.finalCalled && (typeof U._final == "function" ? (E.pendingcb++, E.finalCalled = !0, e.nextTick(I, U, E)) : (E.prefinished = !0, U.emit("prefinish")));
  }
  function H(U, E) {
    var k = L(E);
    return k && (z(U, E), E.pendingcb === 0 && (E.finished = !0, U.emit("finish"))), k;
  }
  function G(U, E, k) {
    E.ending = !0, H(U, E), k && (E.finished ? e.nextTick(k) : U.once("finish", k)), E.ended = !0, U.writable = !1;
  }
  function C(U, E, k) {
    var R = U.entry;
    for (U.entry = null; R; ) {
      var M = R.callback;
      E.pendingcb--, M(k), R = R.next;
    }
    E.corkedRequestsFree.next = U;
  }
  return Object.defineProperty(g.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(U) {
      this._writableState && (this._writableState.destroyed = U);
    }
  }), g.prototype.destroy = m.destroy, g.prototype._undestroy = m.undestroy, g.prototype._destroy = function(U, E) {
    this.end(), E(U);
  }, cc;
}
var sc, ql;
function Rr() {
  if (ql) return sc;
  ql = 1;
  var e = Ta(), t = Object.keys || function(m) {
    var b = [];
    for (var p in m)
      b.push(p);
    return b;
  };
  sc = c;
  var n = Object.create(Yi());
  n.inherits = Ki();
  var r = y2(), i = m2();
  n.inherits(c, r);
  for (var u = t(i.prototype), a = 0; a < u.length; a++) {
    var o = u[a];
    c.prototype[o] || (c.prototype[o] = i.prototype[o]);
  }
  function c(m) {
    if (!(this instanceof c)) return new c(m);
    r.call(this, m), i.call(this, m), m && m.readable === !1 && (this.readable = !1), m && m.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, m && m.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", s);
  }
  Object.defineProperty(c.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function s() {
    this.allowHalfOpen || this._writableState.ended || e.nextTick(f, this);
  }
  function f(m) {
    m.end();
  }
  return Object.defineProperty(c.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(m) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = m, this._writableState.destroyed = m);
    }
  }), c.prototype._destroy = function(m, b) {
    this.push(null), this.end(), e.nextTick(b, m);
  }, sc;
}
var fc = {}, zl;
function $l() {
  if (zl) return fc;
  zl = 1;
  var e = Ca().Buffer, t = e.isEncoding || function(h) {
    switch (h = "" + h, h && h.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function n(h) {
    if (!h) return "utf8";
    for (var d; ; )
      switch (h) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return h;
        default:
          if (d) return;
          h = ("" + h).toLowerCase(), d = !0;
      }
  }
  function r(h) {
    var d = n(h);
    if (typeof d != "string" && (e.isEncoding === t || !t(h))) throw new Error("Unknown encoding: " + h);
    return d || h;
  }
  fc.StringDecoder = i;
  function i(h) {
    this.encoding = r(h);
    var d;
    switch (this.encoding) {
      case "utf16le":
        this.text = m, this.end = b, d = 4;
        break;
      case "utf8":
        this.fillLast = c, d = 4;
        break;
      case "base64":
        this.text = p, this.end = l, d = 3;
        break;
      default:
        this.write = g, this.end = D;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = e.allocUnsafe(d);
  }
  i.prototype.write = function(h) {
    if (h.length === 0) return "";
    var d, y;
    if (this.lastNeed) {
      if (d = this.fillLast(h), d === void 0) return "";
      y = this.lastNeed, this.lastNeed = 0;
    } else
      y = 0;
    return y < h.length ? d ? d + this.text(h, y) : this.text(h, y) : d || "";
  }, i.prototype.end = f, i.prototype.text = s, i.prototype.fillLast = function(h) {
    if (this.lastNeed <= h.length)
      return h.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    h.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, h.length), this.lastNeed -= h.length;
  };
  function u(h) {
    return h <= 127 ? 0 : h >> 5 === 6 ? 2 : h >> 4 === 14 ? 3 : h >> 3 === 30 ? 4 : h >> 6 === 2 ? -1 : -2;
  }
  function a(h, d, y) {
    var x = d.length - 1;
    if (x < y) return 0;
    var v = u(d[x]);
    return v >= 0 ? (v > 0 && (h.lastNeed = v - 1), v) : --x < y || v === -2 ? 0 : (v = u(d[x]), v >= 0 ? (v > 0 && (h.lastNeed = v - 2), v) : --x < y || v === -2 ? 0 : (v = u(d[x]), v >= 0 ? (v > 0 && (v === 2 ? v = 0 : h.lastNeed = v - 3), v) : 0));
  }
  function o(h, d, y) {
    if ((d[0] & 192) !== 128)
      return h.lastNeed = 0, "�";
    if (h.lastNeed > 1 && d.length > 1) {
      if ((d[1] & 192) !== 128)
        return h.lastNeed = 1, "�";
      if (h.lastNeed > 2 && d.length > 2 && (d[2] & 192) !== 128)
        return h.lastNeed = 2, "�";
    }
  }
  function c(h) {
    var d = this.lastTotal - this.lastNeed, y = o(this, h);
    if (y !== void 0) return y;
    if (this.lastNeed <= h.length)
      return h.copy(this.lastChar, d, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    h.copy(this.lastChar, d, 0, h.length), this.lastNeed -= h.length;
  }
  function s(h, d) {
    var y = a(this, h, d);
    if (!this.lastNeed) return h.toString("utf8", d);
    this.lastTotal = y;
    var x = h.length - (y - this.lastNeed);
    return h.copy(this.lastChar, 0, x), h.toString("utf8", d, x);
  }
  function f(h) {
    var d = h && h.length ? this.write(h) : "";
    return this.lastNeed ? d + "�" : d;
  }
  function m(h, d) {
    if ((h.length - d) % 2 === 0) {
      var y = h.toString("utf16le", d);
      if (y) {
        var x = y.charCodeAt(y.length - 1);
        if (x >= 55296 && x <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = h[h.length - 2], this.lastChar[1] = h[h.length - 1], y.slice(0, -1);
      }
      return y;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = h[h.length - 1], h.toString("utf16le", d, h.length - 1);
  }
  function b(h) {
    var d = h && h.length ? this.write(h) : "";
    if (this.lastNeed) {
      var y = this.lastTotal - this.lastNeed;
      return d + this.lastChar.toString("utf16le", 0, y);
    }
    return d;
  }
  function p(h, d) {
    var y = (h.length - d) % 3;
    return y === 0 ? h.toString("base64", d) : (this.lastNeed = 3 - y, this.lastTotal = 3, y === 1 ? this.lastChar[0] = h[h.length - 1] : (this.lastChar[0] = h[h.length - 2], this.lastChar[1] = h[h.length - 1]), h.toString("base64", d, h.length - y));
  }
  function l(h) {
    var d = h && h.length ? this.write(h) : "";
    return this.lastNeed ? d + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : d;
  }
  function g(h) {
    return h.toString(this.encoding);
  }
  function D(h) {
    return h && h.length ? this.write(h) : "";
  }
  return fc;
}
var dc, jl;
function y2() {
  if (jl) return dc;
  jl = 1;
  var e = Ta();
  dc = d;
  var t = hx(), n;
  d.ReadableState = h, Gm.EventEmitter;
  var r = function(T, F) {
    return T.listeners(F).length;
  }, i = g2(), u = Ca().Buffer, a = (typeof re < "u" ? re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function o(T) {
    return u.from(T);
  }
  function c(T) {
    return u.isBuffer(T) || T instanceof a;
  }
  var s = Object.create(Yi());
  s.inherits = Ki();
  var f = zs, m = void 0;
  f && f.debuglog ? m = f.debuglog("stream") : m = function() {
  };
  var b = gx(), p = b2(), l;
  s.inherits(d, i);
  var g = ["error", "close", "destroy", "pause", "resume"];
  function D(T, F, X) {
    if (typeof T.prependListener == "function") return T.prependListener(F, X);
    !T._events || !T._events[F] ? T.on(F, X) : t(T._events[F]) ? T._events[F].unshift(X) : T._events[F] = [X, T._events[F]];
  }
  function h(T, F) {
    n = n || Rr(), T = T || {};
    var X = F instanceof n;
    this.objectMode = !!T.objectMode, X && (this.objectMode = this.objectMode || !!T.readableObjectMode);
    var K = T.highWaterMark, N = T.readableHighWaterMark, q = this.objectMode ? 16 : 16 * 1024;
    K || K === 0 ? this.highWaterMark = K : X && (N || N === 0) ? this.highWaterMark = N : this.highWaterMark = q, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new b(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = T.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, T.encoding && (l || (l = $l().StringDecoder), this.decoder = new l(T.encoding), this.encoding = T.encoding);
  }
  function d(T) {
    if (n = n || Rr(), !(this instanceof d)) return new d(T);
    this._readableState = new h(T, this), this.readable = !0, T && (typeof T.read == "function" && (this._read = T.read), typeof T.destroy == "function" && (this._destroy = T.destroy)), i.call(this);
  }
  Object.defineProperty(d.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(T) {
      this._readableState && (this._readableState.destroyed = T);
    }
  }), d.prototype.destroy = p.destroy, d.prototype._undestroy = p.undestroy, d.prototype._destroy = function(T, F) {
    this.push(null), F(T);
  }, d.prototype.push = function(T, F) {
    var X = this._readableState, K;
    return X.objectMode ? K = !0 : typeof T == "string" && (F = F || X.defaultEncoding, F !== X.encoding && (T = u.from(T, F), F = ""), K = !0), y(this, T, F, !1, K);
  }, d.prototype.unshift = function(T) {
    return y(this, T, null, !0, !1);
  };
  function y(T, F, X, K, N) {
    var q = T._readableState;
    if (F === null)
      q.reading = !1, P(T, q);
    else {
      var Z;
      N || (Z = v(q, F)), Z ? T.emit("error", Z) : q.objectMode || F && F.length > 0 ? (typeof F != "string" && !q.objectMode && Object.getPrototypeOf(F) !== u.prototype && (F = o(F)), K ? q.endEmitted ? T.emit("error", new Error("stream.unshift() after end event")) : x(T, q, F, !0) : q.ended ? T.emit("error", new Error("stream.push() after EOF")) : (q.reading = !1, q.decoder && !X ? (F = q.decoder.write(F), q.objectMode || F.length !== 0 ? x(T, q, F, !1) : z(T, q)) : x(T, q, F, !1))) : K || (q.reading = !1);
    }
    return _(q);
  }
  function x(T, F, X, K) {
    F.flowing && F.length === 0 && !F.sync ? (T.emit("data", X), T.read(0)) : (F.length += F.objectMode ? 1 : X.length, K ? F.buffer.unshift(X) : F.buffer.push(X), F.needReadable && L(T)), z(T, F);
  }
  function v(T, F) {
    var X;
    return !c(F) && typeof F != "string" && F !== void 0 && !T.objectMode && (X = new TypeError("Invalid non-string/buffer chunk")), X;
  }
  function _(T) {
    return !T.ended && (T.needReadable || T.length < T.highWaterMark || T.length === 0);
  }
  d.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, d.prototype.setEncoding = function(T) {
    return l || (l = $l().StringDecoder), this._readableState.decoder = new l(T), this._readableState.encoding = T, this;
  };
  var w = 8388608;
  function A(T) {
    return T >= w ? T = w : (T--, T |= T >>> 1, T |= T >>> 2, T |= T >>> 4, T |= T >>> 8, T |= T >>> 16, T++), T;
  }
  function B(T, F) {
    return T <= 0 || F.length === 0 && F.ended ? 0 : F.objectMode ? 1 : T !== T ? F.flowing && F.length ? F.buffer.head.data.length : F.length : (T > F.highWaterMark && (F.highWaterMark = A(T)), T <= F.length ? T : F.ended ? F.length : (F.needReadable = !0, 0));
  }
  d.prototype.read = function(T) {
    m("read", T), T = parseInt(T, 10);
    var F = this._readableState, X = T;
    if (T !== 0 && (F.emittedReadable = !1), T === 0 && F.needReadable && (F.length >= F.highWaterMark || F.ended))
      return m("read: emitReadable", F.length, F.ended), F.length === 0 && F.ended ? ee(this) : L(this), null;
    if (T = B(T, F), T === 0 && F.ended)
      return F.length === 0 && ee(this), null;
    var K = F.needReadable;
    m("need readable", K), (F.length === 0 || F.length - T < F.highWaterMark) && (K = !0, m("length less than watermark", K)), F.ended || F.reading ? (K = !1, m("reading or ended", K)) : K && (m("do read"), F.reading = !0, F.sync = !0, F.length === 0 && (F.needReadable = !0), this._read(F.highWaterMark), F.sync = !1, F.reading || (T = B(X, F)));
    var N;
    return T > 0 ? N = R(T, F) : N = null, N === null ? (F.needReadable = !0, T = 0) : F.length -= T, F.length === 0 && (F.ended || (F.needReadable = !0), X !== T && F.ended && ee(this)), N !== null && this.emit("data", N), N;
  };
  function P(T, F) {
    if (!F.ended) {
      if (F.decoder) {
        var X = F.decoder.end();
        X && X.length && (F.buffer.push(X), F.length += F.objectMode ? 1 : X.length);
      }
      F.ended = !0, L(T);
    }
  }
  function L(T) {
    var F = T._readableState;
    F.needReadable = !1, F.emittedReadable || (m("emitReadable", F.flowing), F.emittedReadable = !0, F.sync ? e.nextTick(I, T) : I(T));
  }
  function I(T) {
    m("emit readable"), T.emit("readable"), k(T);
  }
  function z(T, F) {
    F.readingMore || (F.readingMore = !0, e.nextTick(H, T, F));
  }
  function H(T, F) {
    for (var X = F.length; !F.reading && !F.flowing && !F.ended && F.length < F.highWaterMark && (m("maybeReadMore read 0"), T.read(0), X !== F.length); )
      X = F.length;
    F.readingMore = !1;
  }
  d.prototype._read = function(T) {
    this.emit("error", new Error("_read() is not implemented"));
  }, d.prototype.pipe = function(T, F) {
    var X = this, K = this._readableState;
    switch (K.pipesCount) {
      case 0:
        K.pipes = T;
        break;
      case 1:
        K.pipes = [K.pipes, T];
        break;
      default:
        K.pipes.push(T);
        break;
    }
    K.pipesCount += 1, m("pipe count=%d opts=%j", K.pipesCount, F);
    var N = (!F || F.end !== !1) && T !== process.stdout && T !== process.stderr, q = N ? ne : O;
    K.endEmitted ? e.nextTick(q) : X.once("end", q), T.on("unpipe", Z);
    function Z(W, V) {
      m("onunpipe"), W === X && V && V.hasUnpiped === !1 && (V.hasUnpiped = !0, Le());
    }
    function ne() {
      m("onend"), T.end();
    }
    var oe = G(X);
    T.on("drain", oe);
    var de = !1;
    function Le() {
      m("cleanup"), T.removeListener("close", hr), T.removeListener("finish", xe), T.removeListener("drain", oe), T.removeListener("error", It), T.removeListener("unpipe", Z), X.removeListener("end", ne), X.removeListener("end", O), X.removeListener("data", Hn), de = !0, K.awaitDrain && (!T._writableState || T._writableState.needDrain) && oe();
    }
    var ut = !1;
    X.on("data", Hn);
    function Hn(W) {
      m("ondata"), ut = !1;
      var V = T.write(W);
      V === !1 && !ut && ((K.pipesCount === 1 && K.pipes === T || K.pipesCount > 1 && Q(K.pipes, T) !== -1) && !de && (m("false write response, pause", K.awaitDrain), K.awaitDrain++, ut = !0), X.pause());
    }
    function It(W) {
      m("onerror", W), O(), T.removeListener("error", It), r(T, "error") === 0 && T.emit("error", W);
    }
    D(T, "error", It);
    function hr() {
      T.removeListener("finish", xe), O();
    }
    T.once("close", hr);
    function xe() {
      m("onfinish"), T.removeListener("close", hr), O();
    }
    T.once("finish", xe);
    function O() {
      m("unpipe"), X.unpipe(T);
    }
    return T.emit("pipe", X), K.flowing || (m("pipe resume"), X.resume()), T;
  };
  function G(T) {
    return function() {
      var F = T._readableState;
      m("pipeOnDrain", F.awaitDrain), F.awaitDrain && F.awaitDrain--, F.awaitDrain === 0 && r(T, "data") && (F.flowing = !0, k(T));
    };
  }
  d.prototype.unpipe = function(T) {
    var F = this._readableState, X = { hasUnpiped: !1 };
    if (F.pipesCount === 0) return this;
    if (F.pipesCount === 1)
      return T && T !== F.pipes ? this : (T || (T = F.pipes), F.pipes = null, F.pipesCount = 0, F.flowing = !1, T && T.emit("unpipe", this, X), this);
    if (!T) {
      var K = F.pipes, N = F.pipesCount;
      F.pipes = null, F.pipesCount = 0, F.flowing = !1;
      for (var q = 0; q < N; q++)
        K[q].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var Z = Q(F.pipes, T);
    return Z === -1 ? this : (F.pipes.splice(Z, 1), F.pipesCount -= 1, F.pipesCount === 1 && (F.pipes = F.pipes[0]), T.emit("unpipe", this, X), this);
  }, d.prototype.on = function(T, F) {
    var X = i.prototype.on.call(this, T, F);
    if (T === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (T === "readable") {
      var K = this._readableState;
      !K.endEmitted && !K.readableListening && (K.readableListening = K.needReadable = !0, K.emittedReadable = !1, K.reading ? K.length && L(this) : e.nextTick(C, this));
    }
    return X;
  }, d.prototype.addListener = d.prototype.on;
  function C(T) {
    m("readable nexttick read 0"), T.read(0);
  }
  d.prototype.resume = function() {
    var T = this._readableState;
    return T.flowing || (m("resume"), T.flowing = !0, U(this, T)), this;
  };
  function U(T, F) {
    F.resumeScheduled || (F.resumeScheduled = !0, e.nextTick(E, T, F));
  }
  function E(T, F) {
    F.reading || (m("resume read 0"), T.read(0)), F.resumeScheduled = !1, F.awaitDrain = 0, T.emit("resume"), k(T), F.flowing && !F.reading && T.read(0);
  }
  d.prototype.pause = function() {
    return m("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (m("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function k(T) {
    var F = T._readableState;
    for (m("flow", F.flowing); F.flowing && T.read() !== null; )
      ;
  }
  d.prototype.wrap = function(T) {
    var F = this, X = this._readableState, K = !1;
    T.on("end", function() {
      if (m("wrapped end"), X.decoder && !X.ended) {
        var Z = X.decoder.end();
        Z && Z.length && F.push(Z);
      }
      F.push(null);
    }), T.on("data", function(Z) {
      if (m("wrapped data"), X.decoder && (Z = X.decoder.write(Z)), !(X.objectMode && Z == null) && !(!X.objectMode && (!Z || !Z.length))) {
        var ne = F.push(Z);
        ne || (K = !0, T.pause());
      }
    });
    for (var N in T)
      this[N] === void 0 && typeof T[N] == "function" && (this[N] = /* @__PURE__ */ function(Z) {
        return function() {
          return T[Z].apply(T, arguments);
        };
      }(N));
    for (var q = 0; q < g.length; q++)
      T.on(g[q], this.emit.bind(this, g[q]));
    return this._read = function(Z) {
      m("wrapped _read", Z), K && (K = !1, T.resume());
    }, this;
  }, Object.defineProperty(d.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), d._fromList = R;
  function R(T, F) {
    if (F.length === 0) return null;
    var X;
    return F.objectMode ? X = F.buffer.shift() : !T || T >= F.length ? (F.decoder ? X = F.buffer.join("") : F.buffer.length === 1 ? X = F.buffer.head.data : X = F.buffer.concat(F.length), F.buffer.clear()) : X = M(T, F.buffer, F.decoder), X;
  }
  function M(T, F, X) {
    var K;
    return T < F.head.data.length ? (K = F.head.data.slice(0, T), F.head.data = F.head.data.slice(T)) : T === F.head.data.length ? K = F.shift() : K = X ? S(T, F) : $(T, F), K;
  }
  function S(T, F) {
    var X = F.head, K = 1, N = X.data;
    for (T -= N.length; X = X.next; ) {
      var q = X.data, Z = T > q.length ? q.length : T;
      if (Z === q.length ? N += q : N += q.slice(0, T), T -= Z, T === 0) {
        Z === q.length ? (++K, X.next ? F.head = X.next : F.head = F.tail = null) : (F.head = X, X.data = q.slice(Z));
        break;
      }
      ++K;
    }
    return F.length -= K, N;
  }
  function $(T, F) {
    var X = u.allocUnsafe(T), K = F.head, N = 1;
    for (K.data.copy(X), T -= K.data.length; K = K.next; ) {
      var q = K.data, Z = T > q.length ? q.length : T;
      if (q.copy(X, X.length - T, 0, Z), T -= Z, T === 0) {
        Z === q.length ? (++N, K.next ? F.head = K.next : F.head = F.tail = null) : (F.head = K, K.data = q.slice(Z));
        break;
      }
      ++N;
    }
    return F.length -= N, X;
  }
  function ee(T) {
    var F = T._readableState;
    if (F.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    F.endEmitted || (F.ended = !0, e.nextTick(te, F, T));
  }
  function te(T, F) {
    !T.endEmitted && T.length === 0 && (T.endEmitted = !0, F.readable = !1, F.emit("end"));
  }
  function Q(T, F) {
    for (var X = 0, K = T.length; X < K; X++)
      if (T[X] === F) return X;
    return -1;
  }
  return dc;
}
var lc, Hl;
function D2() {
  if (Hl) return lc;
  Hl = 1, lc = r;
  var e = Rr(), t = Object.create(Yi());
  t.inherits = Ki(), t.inherits(r, e);
  function n(a, o) {
    var c = this._transformState;
    c.transforming = !1;
    var s = c.writecb;
    if (!s)
      return this.emit("error", new Error("write callback called multiple times"));
    c.writechunk = null, c.writecb = null, o != null && this.push(o), s(a);
    var f = this._readableState;
    f.reading = !1, (f.needReadable || f.length < f.highWaterMark) && this._read(f.highWaterMark);
  }
  function r(a) {
    if (!(this instanceof r)) return new r(a);
    e.call(this, a), this._transformState = {
      afterTransform: n.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, a && (typeof a.transform == "function" && (this._transform = a.transform), typeof a.flush == "function" && (this._flush = a.flush)), this.on("prefinish", i);
  }
  function i() {
    var a = this;
    typeof this._flush == "function" ? this._flush(function(o, c) {
      u(a, o, c);
    }) : u(this, null, null);
  }
  r.prototype.push = function(a, o) {
    return this._transformState.needTransform = !1, e.prototype.push.call(this, a, o);
  }, r.prototype._transform = function(a, o, c) {
    throw new Error("_transform() is not implemented");
  }, r.prototype._write = function(a, o, c) {
    var s = this._transformState;
    if (s.writecb = c, s.writechunk = a, s.writeencoding = o, !s.transforming) {
      var f = this._readableState;
      (s.needTransform || f.needReadable || f.length < f.highWaterMark) && this._read(f.highWaterMark);
    }
  }, r.prototype._read = function(a) {
    var o = this._transformState;
    o.writechunk !== null && o.writecb && !o.transforming ? (o.transforming = !0, this._transform(o.writechunk, o.writeencoding, o.afterTransform)) : o.needTransform = !0;
  }, r.prototype._destroy = function(a, o) {
    var c = this;
    e.prototype._destroy.call(this, a, function(s) {
      o(s), c.emit("close");
    });
  };
  function u(a, o, c) {
    if (o) return a.emit("error", o);
    if (c != null && a.push(c), a._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (a._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return a.push(null);
  }
  return lc;
}
var hc, Xl;
function mx() {
  if (Xl) return hc;
  Xl = 1, hc = n;
  var e = D2(), t = Object.create(Yi());
  t.inherits = Ki(), t.inherits(n, e);
  function n(r) {
    if (!(this instanceof n)) return new n(r);
    e.call(this, r);
  }
  return n.prototype._transform = function(r, i, u) {
    u(null, r);
  }, hc;
}
var Zl;
function x2() {
  return Zl || (Zl = 1, function(e, t) {
    var n = Ip;
    process.env.READABLE_STREAM === "disable" && n ? (e.exports = n, t = e.exports = n.Readable, t.Readable = n.Readable, t.Writable = n.Writable, t.Duplex = n.Duplex, t.Transform = n.Transform, t.PassThrough = n.PassThrough, t.Stream = n) : (t = e.exports = y2(), t.Stream = n || t, t.Readable = t, t.Writable = m2(), t.Duplex = Rr(), t.Transform = D2(), t.PassThrough = mx());
  }(hu, hu.exports)), hu.exports;
}
var Vl, yu;
Oe.base64 = !0;
Oe.array = !0;
Oe.string = !0;
Oe.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u";
Oe.nodebuffer = typeof Buffer < "u";
Oe.uint8array = typeof Uint8Array < "u";
if (typeof ArrayBuffer > "u")
  yu = Oe.blob = !1;
else {
  var Gl = new ArrayBuffer(0);
  try {
    yu = Oe.blob = new Blob([Gl], {
      type: "application/zip"
    }).size === 0;
  } catch {
    try {
      var yx = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, Yl = new yx();
      Yl.append(Gl), yu = Oe.blob = Yl.getBlob("application/zip").size === 0;
    } catch {
      yu = Oe.blob = !1;
    }
  }
}
try {
  Vl = Oe.nodestream = !!x2().Readable;
} catch {
  Vl = Oe.nodestream = !1;
}
var Du = {}, Kl;
function v2() {
  if (Kl) return Du;
  Kl = 1;
  var e = Se(), t = Oe, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return Du.encode = function(r) {
    for (var i = [], u, a, o, c, s, f, m, b = 0, p = r.length, l = p, g = e.getTypeOf(r) !== "string"; b < r.length; )
      l = p - b, g ? (u = r[b++], a = b < p ? r[b++] : 0, o = b < p ? r[b++] : 0) : (u = r.charCodeAt(b++), a = b < p ? r.charCodeAt(b++) : 0, o = b < p ? r.charCodeAt(b++) : 0), c = u >> 2, s = (u & 3) << 4 | a >> 4, f = l > 1 ? (a & 15) << 2 | o >> 6 : 64, m = l > 2 ? o & 63 : 64, i.push(n.charAt(c) + n.charAt(s) + n.charAt(f) + n.charAt(m));
    return i.join("");
  }, Du.decode = function(r) {
    var i, u, a, o, c, s, f, m = 0, b = 0, p = "data:";
    if (r.substr(0, p.length) === p)
      throw new Error("Invalid base64 input, it looks like a data url.");
    r = r.replace(/[^A-Za-z0-9+/=]/g, "");
    var l = r.length * 3 / 4;
    if (r.charAt(r.length - 1) === n.charAt(64) && l--, r.charAt(r.length - 2) === n.charAt(64) && l--, l % 1 !== 0)
      throw new Error("Invalid base64 input, bad content length.");
    var g;
    for (t.uint8array ? g = new Uint8Array(l | 0) : g = new Array(l | 0); m < r.length; )
      o = n.indexOf(r.charAt(m++)), c = n.indexOf(r.charAt(m++)), s = n.indexOf(r.charAt(m++)), f = n.indexOf(r.charAt(m++)), i = o << 2 | c >> 4, u = (c & 15) << 4 | s >> 2, a = (s & 3) << 6 | f, g[b++] = i, s !== 64 && (g[b++] = u), f !== 64 && (g[b++] = a);
    return g;
  }, Du;
}
var Aa = {
  /**
   * True if this is running in Nodejs, will be undefined in a browser.
   * In a browser, browserify won't include this file and the whole module
   * will be resolved an empty object.
   */
  isNode: typeof Buffer < "u",
  /**
   * Create a new nodejs Buffer from an existing content.
   * @param {Object} data the data to pass to the constructor.
   * @param {String} encoding the encoding to use.
   * @return {Buffer} a new Buffer.
   */
  newBufferFrom: function(e, t) {
    if (Buffer.from && Buffer.from !== Uint8Array.from)
      return Buffer.from(e, t);
    if (typeof e == "number")
      throw new Error('The "data" argument must not be a number');
    return new Buffer(e, t);
  },
  /**
   * Create a new nodejs Buffer with the specified size.
   * @param {Integer} size the size of the buffer.
   * @return {Buffer} a new Buffer.
   */
  allocBuffer: function(e) {
    if (Buffer.alloc)
      return Buffer.alloc(e);
    var t = new Buffer(e);
    return t.fill(0), t;
  },
  /**
   * Find out if an object is a Buffer.
   * @param {Object} b the object to test.
   * @return {Boolean} true if the object is a Buffer, false otherwise.
   */
  isBuffer: function(e) {
    return Buffer.isBuffer(e);
  },
  isStream: function(e) {
    return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
  }
}, pc, Ql;
function Dx() {
  if (Ql) return pc;
  Ql = 1;
  var e = re.MutationObserver || re.WebKitMutationObserver, t;
  if (process.browser)
    if (e) {
      var n = 0, r = new e(c), i = re.document.createTextNode("");
      r.observe(i, {
        characterData: !0
      }), t = function() {
        i.data = n = ++n % 2;
      };
    } else if (!re.setImmediate && typeof re.MessageChannel < "u") {
      var u = new re.MessageChannel();
      u.port1.onmessage = c, t = function() {
        u.port2.postMessage(0);
      };
    } else "document" in re && "onreadystatechange" in re.document.createElement("script") ? t = function() {
      var f = re.document.createElement("script");
      f.onreadystatechange = function() {
        c(), f.onreadystatechange = null, f.parentNode.removeChild(f), f = null;
      }, re.document.documentElement.appendChild(f);
    } : t = function() {
      setTimeout(c, 0);
    };
  else
    t = function() {
      process.nextTick(c);
    };
  var a, o = [];
  function c() {
    a = !0;
    for (var f, m, b = o.length; b; ) {
      for (m = o, o = [], f = -1; ++f < b; )
        m[f]();
      b = o.length;
    }
    a = !1;
  }
  pc = s;
  function s(f) {
    o.push(f) === 1 && !a && t();
  }
  return pc;
}
var gc, Jl;
function xx() {
  if (Jl) return gc;
  Jl = 1;
  var e = Dx();
  function t() {
  }
  var n = {}, r = ["REJECTED"], i = ["FULFILLED"], u = ["PENDING"];
  if (!process.browser)
    var a = ["UNHANDLED"];
  gc = o;
  function o(h) {
    if (typeof h != "function")
      throw new TypeError("resolver must be a function");
    this.state = u, this.queue = [], this.outcome = void 0, process.browser || (this.handled = a), h !== t && m(this, h);
  }
  o.prototype.finally = function(h) {
    if (typeof h != "function")
      return this;
    var d = this.constructor;
    return this.then(y, x);
    function y(v) {
      function _() {
        return v;
      }
      return d.resolve(h()).then(_);
    }
    function x(v) {
      function _() {
        throw v;
      }
      return d.resolve(h()).then(_);
    }
  }, o.prototype.catch = function(h) {
    return this.then(null, h);
  }, o.prototype.then = function(h, d) {
    if (typeof h != "function" && this.state === i || typeof d != "function" && this.state === r)
      return this;
    var y = new this.constructor(t);
    if (process.browser || this.handled === a && (this.handled = null), this.state !== u) {
      var x = this.state === i ? h : d;
      s(y, x, this.outcome);
    } else
      this.queue.push(new c(y, h, d));
    return y;
  };
  function c(h, d, y) {
    this.promise = h, typeof d == "function" && (this.onFulfilled = d, this.callFulfilled = this.otherCallFulfilled), typeof y == "function" && (this.onRejected = y, this.callRejected = this.otherCallRejected);
  }
  c.prototype.callFulfilled = function(h) {
    n.resolve(this.promise, h);
  }, c.prototype.otherCallFulfilled = function(h) {
    s(this.promise, this.onFulfilled, h);
  }, c.prototype.callRejected = function(h) {
    n.reject(this.promise, h);
  }, c.prototype.otherCallRejected = function(h) {
    s(this.promise, this.onRejected, h);
  };
  function s(h, d, y) {
    e(function() {
      var x;
      try {
        x = d(y);
      } catch (v) {
        return n.reject(h, v);
      }
      x === h ? n.reject(h, new TypeError("Cannot resolve promise with itself")) : n.resolve(h, x);
    });
  }
  n.resolve = function(h, d) {
    var y = b(f, d);
    if (y.status === "error")
      return n.reject(h, y.value);
    var x = y.value;
    if (x)
      m(h, x);
    else {
      h.state = i, h.outcome = d;
      for (var v = -1, _ = h.queue.length; ++v < _; )
        h.queue[v].callFulfilled(d);
    }
    return h;
  }, n.reject = function(h, d) {
    h.state = r, h.outcome = d, process.browser || h.handled === a && e(function() {
      h.handled === a && process.emit("unhandledRejection", d, h);
    });
    for (var y = -1, x = h.queue.length; ++y < x; )
      h.queue[y].callRejected(d);
    return h;
  };
  function f(h) {
    var d = h && h.then;
    if (h && (typeof h == "object" || typeof h == "function") && typeof d == "function")
      return function() {
        d.apply(h, arguments);
      };
  }
  function m(h, d) {
    var y = !1;
    function x(A) {
      y || (y = !0, n.reject(h, A));
    }
    function v(A) {
      y || (y = !0, n.resolve(h, A));
    }
    function _() {
      d(v, x);
    }
    var w = b(_);
    w.status === "error" && x(w.value);
  }
  function b(h, d) {
    var y = {};
    try {
      y.value = h(d), y.status = "success";
    } catch (x) {
      y.status = "error", y.value = x;
    }
    return y;
  }
  o.resolve = p;
  function p(h) {
    return h instanceof this ? h : n.resolve(new this(t), h);
  }
  o.reject = l;
  function l(h) {
    var d = new this(t);
    return n.reject(d, h);
  }
  o.all = g;
  function g(h) {
    var d = this;
    if (Object.prototype.toString.call(h) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var y = h.length, x = !1;
    if (!y)
      return this.resolve([]);
    for (var v = new Array(y), _ = 0, w = -1, A = new this(t); ++w < y; )
      B(h[w], w);
    return A;
    function B(P, L) {
      d.resolve(P).then(I, function(z) {
        x || (x = !0, n.reject(A, z));
      });
      function I(z) {
        v[L] = z, ++_ === y && !x && (x = !0, n.resolve(A, v));
      }
    }
  }
  o.race = D;
  function D(h) {
    var d = this;
    if (Object.prototype.toString.call(h) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var y = h.length, x = !1;
    if (!y)
      return this.resolve([]);
    for (var v = -1, _ = new this(t); ++v < y; )
      w(h[v]);
    return _;
    function w(A) {
      d.resolve(A).then(function(B) {
        x || (x = !0, n.resolve(_, B));
      }, function(B) {
        x || (x = !0, n.reject(_, B));
      });
    }
  }
  return gc;
}
var _s = null;
typeof Promise < "u" ? _s = Promise : _s = xx();
var Qi = {
  Promise: _s
};
(function(e, t) {
  if (e.setImmediate)
    return;
  var n = 1, r = {}, i = !1, u = e.document, a;
  function o(d) {
    typeof d != "function" && (d = new Function("" + d));
    for (var y = new Array(arguments.length - 1), x = 0; x < y.length; x++)
      y[x] = arguments[x + 1];
    var v = { callback: d, args: y };
    return r[n] = v, a(n), n++;
  }
  function c(d) {
    delete r[d];
  }
  function s(d) {
    var y = d.callback, x = d.args;
    switch (x.length) {
      case 0:
        y();
        break;
      case 1:
        y(x[0]);
        break;
      case 2:
        y(x[0], x[1]);
        break;
      case 3:
        y(x[0], x[1], x[2]);
        break;
      default:
        y.apply(t, x);
        break;
    }
  }
  function f(d) {
    if (i)
      setTimeout(f, 0, d);
    else {
      var y = r[d];
      if (y) {
        i = !0;
        try {
          s(y);
        } finally {
          c(d), i = !1;
        }
      }
    }
  }
  function m() {
    a = function(d) {
      process.nextTick(function() {
        f(d);
      });
    };
  }
  function b() {
    if (e.postMessage && !e.importScripts) {
      var d = !0, y = e.onmessage;
      return e.onmessage = function() {
        d = !1;
      }, e.postMessage("", "*"), e.onmessage = y, d;
    }
  }
  function p() {
    var d = "setImmediate$" + Math.random() + "$", y = function(x) {
      x.source === e && typeof x.data == "string" && x.data.indexOf(d) === 0 && f(+x.data.slice(d.length));
    };
    e.addEventListener ? e.addEventListener("message", y, !1) : e.attachEvent("onmessage", y), a = function(x) {
      e.postMessage(d + x, "*");
    };
  }
  function l() {
    var d = new MessageChannel();
    d.port1.onmessage = function(y) {
      var x = y.data;
      f(x);
    }, a = function(y) {
      d.port2.postMessage(y);
    };
  }
  function g() {
    var d = u.documentElement;
    a = function(y) {
      var x = u.createElement("script");
      x.onreadystatechange = function() {
        f(y), x.onreadystatechange = null, d.removeChild(x), x = null;
      }, d.appendChild(x);
    };
  }
  function D() {
    a = function(d) {
      setTimeout(f, 0, d);
    };
  }
  var h = Object.getPrototypeOf && Object.getPrototypeOf(e);
  h = h && h.setTimeout ? h : e, {}.toString.call(e.process) === "[object process]" ? m() : b() ? p() : e.MessageChannel ? l() : u && "onreadystatechange" in u.createElement("script") ? g() : D(), h.setImmediate = o, h.clearImmediate = c;
})(typeof self > "u" ? re : self);
var eh;
function Se() {
  return eh || (eh = 1, function(e) {
    var t = Oe, n = v2(), r = Aa, i = Qi;
    function u(b) {
      var p = null;
      return t.uint8array ? p = new Uint8Array(b.length) : p = new Array(b.length), o(b, p);
    }
    e.newBlob = function(b, p) {
      e.checkSupport("blob");
      try {
        return new Blob([b], {
          type: p
        });
      } catch {
        try {
          var l = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, g = new l();
          return g.append(b), g.getBlob(p);
        } catch {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    function a(b) {
      return b;
    }
    function o(b, p) {
      for (var l = 0; l < b.length; ++l)
        p[l] = b.charCodeAt(l) & 255;
      return p;
    }
    var c = {
      /**
       * Transform an array of int into a string, chunk by chunk.
       * See the performances notes on arrayLikeToString.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @param {String} type the type of the array.
       * @param {Integer} chunk the chunk size.
       * @return {String} the resulting string.
       * @throws Error if the chunk is too big for the stack.
       */
      stringifyByChunk: function(b, p, l) {
        var g = [], D = 0, h = b.length;
        if (h <= l)
          return String.fromCharCode.apply(null, b);
        for (; D < h; )
          p === "array" || p === "nodebuffer" ? g.push(String.fromCharCode.apply(null, b.slice(D, Math.min(D + l, h)))) : g.push(String.fromCharCode.apply(null, b.subarray(D, Math.min(D + l, h)))), D += l;
        return g.join("");
      },
      /**
       * Call String.fromCharCode on every item in the array.
       * This is the naive implementation, which generate A LOT of intermediate string.
       * This should be used when everything else fail.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @return {String} the result.
       */
      stringifyByChar: function(b) {
        for (var p = "", l = 0; l < b.length; l++)
          p += String.fromCharCode(b[l]);
        return p;
      },
      applyCanBeUsed: {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array: function() {
          try {
            return t.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch {
            return !1;
          }
        }(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer: function() {
          try {
            return t.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1;
          } catch {
            return !1;
          }
        }()
      }
    };
    function s(b) {
      var p = 65536, l = e.getTypeOf(b), g = !0;
      if (l === "uint8array" ? g = c.applyCanBeUsed.uint8array : l === "nodebuffer" && (g = c.applyCanBeUsed.nodebuffer), g)
        for (; p > 1; )
          try {
            return c.stringifyByChunk(b, l, p);
          } catch {
            p = Math.floor(p / 2);
          }
      return c.stringifyByChar(b);
    }
    e.applyFromCharCode = s;
    function f(b, p) {
      for (var l = 0; l < b.length; l++)
        p[l] = b[l];
      return p;
    }
    var m = {};
    m.string = {
      string: a,
      array: function(b) {
        return o(b, new Array(b.length));
      },
      arraybuffer: function(b) {
        return m.string.uint8array(b).buffer;
      },
      uint8array: function(b) {
        return o(b, new Uint8Array(b.length));
      },
      nodebuffer: function(b) {
        return o(b, r.allocBuffer(b.length));
      }
    }, m.array = {
      string: s,
      array: a,
      arraybuffer: function(b) {
        return new Uint8Array(b).buffer;
      },
      uint8array: function(b) {
        return new Uint8Array(b);
      },
      nodebuffer: function(b) {
        return r.newBufferFrom(b);
      }
    }, m.arraybuffer = {
      string: function(b) {
        return s(new Uint8Array(b));
      },
      array: function(b) {
        return f(new Uint8Array(b), new Array(b.byteLength));
      },
      arraybuffer: a,
      uint8array: function(b) {
        return new Uint8Array(b);
      },
      nodebuffer: function(b) {
        return r.newBufferFrom(new Uint8Array(b));
      }
    }, m.uint8array = {
      string: s,
      array: function(b) {
        return f(b, new Array(b.length));
      },
      arraybuffer: function(b) {
        return b.buffer;
      },
      uint8array: a,
      nodebuffer: function(b) {
        return r.newBufferFrom(b);
      }
    }, m.nodebuffer = {
      string: s,
      array: function(b) {
        return f(b, new Array(b.length));
      },
      arraybuffer: function(b) {
        return m.nodebuffer.uint8array(b).buffer;
      },
      uint8array: function(b) {
        return f(b, new Uint8Array(b.length));
      },
      nodebuffer: a
    }, e.transformTo = function(b, p) {
      if (p || (p = ""), !b)
        return p;
      e.checkSupport(b);
      var l = e.getTypeOf(p), g = m[l][b](p);
      return g;
    }, e.resolve = function(b) {
      for (var p = b.split("/"), l = [], g = 0; g < p.length; g++) {
        var D = p[g];
        D === "." || D === "" && g !== 0 && g !== p.length - 1 || (D === ".." ? l.pop() : l.push(D));
      }
      return l.join("/");
    }, e.getTypeOf = function(b) {
      if (typeof b == "string")
        return "string";
      if (Object.prototype.toString.call(b) === "[object Array]")
        return "array";
      if (t.nodebuffer && r.isBuffer(b))
        return "nodebuffer";
      if (t.uint8array && b instanceof Uint8Array)
        return "uint8array";
      if (t.arraybuffer && b instanceof ArrayBuffer)
        return "arraybuffer";
    }, e.checkSupport = function(b) {
      var p = t[b.toLowerCase()];
      if (!p)
        throw new Error(b + " is not supported by this platform");
    }, e.MAX_VALUE_16BITS = 65535, e.MAX_VALUE_32BITS = -1, e.pretty = function(b) {
      var p = "", l, g;
      for (g = 0; g < (b || "").length; g++)
        l = b.charCodeAt(g), p += "\\x" + (l < 16 ? "0" : "") + l.toString(16).toUpperCase();
      return p;
    }, e.delay = function(b, p, l) {
      setImmediate(function() {
        b.apply(l || null, p || []);
      });
    }, e.inherits = function(b, p) {
      var l = function() {
      };
      l.prototype = p.prototype, b.prototype = new l();
    }, e.extend = function() {
      var b = {}, p, l;
      for (p = 0; p < arguments.length; p++)
        for (l in arguments[p])
          Object.prototype.hasOwnProperty.call(arguments[p], l) && typeof b[l] > "u" && (b[l] = arguments[p][l]);
      return b;
    }, e.prepareContent = function(b, p, l, g, D) {
      var h = i.Promise.resolve(p).then(function(d) {
        var y = t.blob && (d instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(d)) !== -1);
        return y && typeof FileReader < "u" ? new i.Promise(function(x, v) {
          var _ = new FileReader();
          _.onload = function(w) {
            x(w.target.result);
          }, _.onerror = function(w) {
            v(w.target.error);
          }, _.readAsArrayBuffer(d);
        }) : d;
      });
      return h.then(function(d) {
        var y = e.getTypeOf(d);
        return y ? (y === "arraybuffer" ? d = e.transformTo("uint8array", d) : y === "string" && (D ? d = n.decode(d) : l && g !== !0 && (d = u(d))), d) : i.Promise.reject(
          new Error("Can't read the data of '" + b + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
        );
      });
    };
  }(nc)), nc;
}
function _2(e) {
  this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
    data: [],
    end: [],
    error: []
  }, this.previous = null;
}
_2.prototype = {
  /**
   * Push a chunk to the next workers.
   * @param {Object} chunk the chunk to push
   */
  push: function(e) {
    this.emit("data", e);
  },
  /**
   * End the stream.
   * @return {Boolean} true if this call ended the worker, false otherwise.
   */
  end: function() {
    if (this.isFinished)
      return !1;
    this.flush();
    try {
      this.emit("end"), this.cleanUp(), this.isFinished = !0;
    } catch (e) {
      this.emit("error", e);
    }
    return !0;
  },
  /**
   * End the stream with an error.
   * @param {Error} e the error which caused the premature end.
   * @return {Boolean} true if this call ended the worker with an error, false otherwise.
   */
  error: function(e) {
    return this.isFinished ? !1 : (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
  },
  /**
   * Add a callback on an event.
   * @param {String} name the name of the event (data, end, error)
   * @param {Function} listener the function to call when the event is triggered
   * @return {GenericWorker} the current object for chainability
   */
  on: function(e, t) {
    return this._listeners[e].push(t), this;
  },
  /**
   * Clean any references when a worker is ending.
   */
  cleanUp: function() {
    this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
  },
  /**
   * Trigger an event. This will call registered callback with the provided arg.
   * @param {String} name the name of the event (data, end, error)
   * @param {Object} arg the argument to call the callback with.
   */
  emit: function(e, t) {
    if (this._listeners[e])
      for (var n = 0; n < this._listeners[e].length; n++)
        this._listeners[e][n].call(this, t);
  },
  /**
   * Chain a worker with an other.
   * @param {Worker} next the worker receiving events from the current one.
   * @return {worker} the next worker for chainability
   */
  pipe: function(e) {
    return e.registerPrevious(this);
  },
  /**
   * Same as `pipe` in the other direction.
   * Using an API with `pipe(next)` is very easy.
   * Implementing the API with the point of view of the next one registering
   * a source is easier, see the ZipFileWorker.
   * @param {Worker} previous the previous worker, sending events to this one
   * @return {Worker} the current worker for chainability
   */
  registerPrevious: function(e) {
    if (this.isLocked)
      throw new Error("The stream '" + this + "' has already been used.");
    this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
    var t = this;
    return e.on("data", function(n) {
      t.processChunk(n);
    }), e.on("end", function() {
      t.end();
    }), e.on("error", function(n) {
      t.error(n);
    }), this;
  },
  /**
   * Pause the stream so it doesn't send events anymore.
   * @return {Boolean} true if this call paused the worker, false otherwise.
   */
  pause: function() {
    return this.isPaused || this.isFinished ? !1 : (this.isPaused = !0, this.previous && this.previous.pause(), !0);
  },
  /**
   * Resume a paused stream.
   * @return {Boolean} true if this call resumed the worker, false otherwise.
   */
  resume: function() {
    if (!this.isPaused || this.isFinished)
      return !1;
    this.isPaused = !1;
    var e = !1;
    return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
  },
  /**
   * Flush any remaining bytes as the stream is ending.
   */
  flush: function() {
  },
  /**
   * Process a chunk. This is usually the method overridden.
   * @param {Object} chunk the chunk to process.
   */
  processChunk: function(e) {
    this.push(e);
  },
  /**
   * Add a key/value to be added in the workers chain streamInfo once activated.
   * @param {String} key the key to use
   * @param {Object} value the associated value
   * @return {Worker} the current worker for chainability
   */
  withStreamInfo: function(e, t) {
    return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
  },
  /**
   * Merge this worker's streamInfo into the chain's streamInfo.
   */
  mergeStreamInfo: function() {
    for (var e in this.extraStreamInfo)
      Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
  },
  /**
   * Lock the stream to prevent further updates on the workers chain.
   * After calling this method, all calls to pipe will fail.
   */
  lock: function() {
    if (this.isLocked)
      throw new Error("The stream '" + this + "' has already been used.");
    this.isLocked = !0, this.previous && this.previous.lock();
  },
  /**
   *
   * Pretty print the workers chain.
   */
  toString: function() {
    var e = "Worker " + this.name;
    return this.previous ? this.previous + " -> " + e : e;
  }
};
var St = _2;
(function(e) {
  for (var t = Se(), n = Oe, r = Aa, i = St, u = new Array(256), a = 0; a < 256; a++)
    u[a] = a >= 252 ? 6 : a >= 248 ? 5 : a >= 240 ? 4 : a >= 224 ? 3 : a >= 192 ? 2 : 1;
  u[254] = u[254] = 1;
  var o = function(b) {
    var p, l, g, D, h, d = b.length, y = 0;
    for (D = 0; D < d; D++)
      l = b.charCodeAt(D), (l & 64512) === 55296 && D + 1 < d && (g = b.charCodeAt(D + 1), (g & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (g - 56320), D++)), y += l < 128 ? 1 : l < 2048 ? 2 : l < 65536 ? 3 : 4;
    for (n.uint8array ? p = new Uint8Array(y) : p = new Array(y), h = 0, D = 0; h < y; D++)
      l = b.charCodeAt(D), (l & 64512) === 55296 && D + 1 < d && (g = b.charCodeAt(D + 1), (g & 64512) === 56320 && (l = 65536 + (l - 55296 << 10) + (g - 56320), D++)), l < 128 ? p[h++] = l : l < 2048 ? (p[h++] = 192 | l >>> 6, p[h++] = 128 | l & 63) : l < 65536 ? (p[h++] = 224 | l >>> 12, p[h++] = 128 | l >>> 6 & 63, p[h++] = 128 | l & 63) : (p[h++] = 240 | l >>> 18, p[h++] = 128 | l >>> 12 & 63, p[h++] = 128 | l >>> 6 & 63, p[h++] = 128 | l & 63);
    return p;
  }, c = function(b, p) {
    var l;
    for (p = p || b.length, p > b.length && (p = b.length), l = p - 1; l >= 0 && (b[l] & 192) === 128; )
      l--;
    return l < 0 || l === 0 ? p : l + u[b[l]] > p ? l : p;
  }, s = function(b) {
    var p, l, g, D, h = b.length, d = new Array(h * 2);
    for (l = 0, p = 0; p < h; ) {
      if (g = b[p++], g < 128) {
        d[l++] = g;
        continue;
      }
      if (D = u[g], D > 4) {
        d[l++] = 65533, p += D - 1;
        continue;
      }
      for (g &= D === 2 ? 31 : D === 3 ? 15 : 7; D > 1 && p < h; )
        g = g << 6 | b[p++] & 63, D--;
      if (D > 1) {
        d[l++] = 65533;
        continue;
      }
      g < 65536 ? d[l++] = g : (g -= 65536, d[l++] = 55296 | g >> 10 & 1023, d[l++] = 56320 | g & 1023);
    }
    return d.length !== l && (d.subarray ? d = d.subarray(0, l) : d.length = l), t.applyFromCharCode(d);
  };
  e.utf8encode = function(p) {
    return n.nodebuffer ? r.newBufferFrom(p, "utf-8") : o(p);
  }, e.utf8decode = function(p) {
    return n.nodebuffer ? t.transformTo("nodebuffer", p).toString("utf-8") : (p = t.transformTo(n.uint8array ? "uint8array" : "array", p), s(p));
  };
  function f() {
    i.call(this, "utf-8 decode"), this.leftOver = null;
  }
  t.inherits(f, i), f.prototype.processChunk = function(b) {
    var p = t.transformTo(n.uint8array ? "uint8array" : "array", b.data);
    if (this.leftOver && this.leftOver.length) {
      if (n.uint8array) {
        var l = p;
        p = new Uint8Array(l.length + this.leftOver.length), p.set(this.leftOver, 0), p.set(l, this.leftOver.length);
      } else
        p = this.leftOver.concat(p);
      this.leftOver = null;
    }
    var g = c(p), D = p;
    g !== p.length && (n.uint8array ? (D = p.subarray(0, g), this.leftOver = p.subarray(g, p.length)) : (D = p.slice(0, g), this.leftOver = p.slice(g, p.length))), this.push({
      data: e.utf8decode(D),
      meta: b.meta
    });
  }, f.prototype.flush = function() {
    this.leftOver && this.leftOver.length && (this.push({
      data: e.utf8decode(this.leftOver),
      meta: {}
    }), this.leftOver = null);
  }, e.Utf8DecodeWorker = f;
  function m() {
    i.call(this, "utf-8 encode");
  }
  t.inherits(m, i), m.prototype.processChunk = function(b) {
    this.push({
      data: e.utf8encode(b.data),
      meta: b.meta
    });
  }, e.Utf8EncodeWorker = m;
})(Xr);
var E2 = St, w2 = Se();
function Sf(e) {
  E2.call(this, "ConvertWorker to " + e), this.destType = e;
}
w2.inherits(Sf, E2);
Sf.prototype.processChunk = function(e) {
  this.push({
    data: w2.transformTo(this.destType, e.data),
    meta: e.meta
  });
};
var vx = Sf, bc, th;
function _x() {
  if (th) return bc;
  th = 1;
  var e = x2().Readable, t = Se();
  t.inherits(n, e);
  function n(r, i, u) {
    e.call(this, i), this._helper = r;
    var a = this;
    r.on("data", function(o, c) {
      a.push(o) || a._helper.pause(), u && u(c);
    }).on("error", function(o) {
      a.emit("error", o);
    }).on("end", function() {
      a.push(null);
    });
  }
  return n.prototype._read = function() {
    this._helper.resume();
  }, bc = n, bc;
}
var Kn = Se(), Ex = vx, wx = St, Ux = v2(), Tx = Oe, Cx = Qi, U2 = null;
if (Tx.nodestream)
  try {
    U2 = _x();
  } catch {
  }
function Ax(e, t, n) {
  switch (e) {
    case "blob":
      return Kn.newBlob(Kn.transformTo("arraybuffer", t), n);
    case "base64":
      return Ux.encode(t);
    default:
      return Kn.transformTo(e, t);
  }
}
function Fx(e, t) {
  var n, r = 0, i = null, u = 0;
  for (n = 0; n < t.length; n++)
    u += t[n].length;
  switch (e) {
    case "string":
      return t.join("");
    case "array":
      return Array.prototype.concat.apply([], t);
    case "uint8array":
      for (i = new Uint8Array(u), n = 0; n < t.length; n++)
        i.set(t[n], r), r += t[n].length;
      return i;
    case "nodebuffer":
      return Buffer.concat(t);
    default:
      throw new Error("concat : unsupported type '" + e + "'");
  }
}
function kx(e, t) {
  return new Cx.Promise(function(n, r) {
    var i = [], u = e._internalType, a = e._outputType, o = e._mimeType;
    e.on("data", function(c, s) {
      i.push(c), t && t(s);
    }).on("error", function(c) {
      i = [], r(c);
    }).on("end", function() {
      try {
        var c = Ax(a, Fx(u, i), o);
        n(c);
      } catch (s) {
        r(s);
      }
      i = [];
    }).resume();
  });
}
function T2(e, t, n) {
  var r = t;
  switch (t) {
    case "blob":
    case "arraybuffer":
      r = "uint8array";
      break;
    case "base64":
      r = "string";
      break;
  }
  try {
    this._internalType = r, this._outputType = t, this._mimeType = n, Kn.checkSupport(r), this._worker = e.pipe(new Ex(r)), e.lock();
  } catch (i) {
    this._worker = new wx("error"), this._worker.error(i);
  }
}
T2.prototype = {
  /**
   * Listen a StreamHelper, accumulate its content and concatenate it into a
   * complete block.
   * @param {Function} updateCb the update callback.
   * @return Promise the promise for the accumulation.
   */
  accumulate: function(e) {
    return kx(this, e);
  },
  /**
   * Add a listener on an event triggered on a stream.
   * @param {String} evt the name of the event
   * @param {Function} fn the listener
   * @return {StreamHelper} the current helper.
   */
  on: function(e, t) {
    var n = this;
    return e === "data" ? this._worker.on(e, function(r) {
      t.call(n, r.data, r.meta);
    }) : this._worker.on(e, function() {
      Kn.delay(t, arguments, n);
    }), this;
  },
  /**
   * Resume the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  resume: function() {
    return Kn.delay(this._worker.resume, [], this._worker), this;
  },
  /**
   * Pause the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  pause: function() {
    return this._worker.pause(), this;
  },
  /**
   * Return a nodejs stream for this helper.
   * @param {Function} updateCb the update callback.
   * @return {NodejsStreamOutputAdapter} the nodejs stream.
   */
  toNodejsStream: function(e) {
    if (Kn.checkSupport("nodestream"), this._outputType !== "nodebuffer")
      throw new Error(this._outputType + " is not supported by this method");
    return new U2(this, {
      objectMode: this._outputType !== "nodebuffer"
    }, e);
  }
};
var C2 = T2, Bt = {};
Bt.base64 = !1;
Bt.binary = !1;
Bt.dir = !1;
Bt.createFolders = !0;
Bt.date = null;
Bt.compression = null;
Bt.compressionOptions = null;
Bt.comment = null;
Bt.unixPermissions = null;
Bt.dosPermissions = null;
var Fa = Se(), ka = St, Sx = 16 * 1024;
function Zr(e) {
  ka.call(this, "DataWorker");
  var t = this;
  this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(n) {
    t.dataIsReady = !0, t.data = n, t.max = n && n.length || 0, t.type = Fa.getTypeOf(n), t.isPaused || t._tickAndRepeat();
  }, function(n) {
    t.error(n);
  });
}
Fa.inherits(Zr, ka);
Zr.prototype.cleanUp = function() {
  ka.prototype.cleanUp.call(this), this.data = null;
};
Zr.prototype.resume = function() {
  return ka.prototype.resume.call(this) ? (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, Fa.delay(this._tickAndRepeat, [], this)), !0) : !1;
};
Zr.prototype._tickAndRepeat = function() {
  this._tickScheduled = !1, !(this.isPaused || this.isFinished) && (this._tick(), this.isFinished || (Fa.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
};
Zr.prototype._tick = function() {
  if (this.isPaused || this.isFinished)
    return !1;
  var e = Sx, t = null, n = Math.min(this.max, this.index + e);
  if (this.index >= this.max)
    return this.end();
  switch (this.type) {
    case "string":
      t = this.data.substring(this.index, n);
      break;
    case "uint8array":
      t = this.data.subarray(this.index, n);
      break;
    case "array":
    case "nodebuffer":
      t = this.data.slice(this.index, n);
      break;
  }
  return this.index = n, this.push({
    data: t,
    meta: {
      percent: this.max ? this.index / this.max * 100 : 0
    }
  });
};
var A2 = Zr, Bx = Se();
function Ix() {
  for (var e, t = [], n = 0; n < 256; n++) {
    e = n;
    for (var r = 0; r < 8; r++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[n] = e;
  }
  return t;
}
var F2 = Ix();
function Nx(e, t, n, r) {
  var i = F2, u = r + n;
  e = e ^ -1;
  for (var a = r; a < u; a++)
    e = e >>> 8 ^ i[(e ^ t[a]) & 255];
  return e ^ -1;
}
function Rx(e, t, n, r) {
  var i = F2, u = r + n;
  e = e ^ -1;
  for (var a = r; a < u; a++)
    e = e >>> 8 ^ i[(e ^ t.charCodeAt(a)) & 255];
  return e ^ -1;
}
var Bf = function(t, n) {
  if (typeof t > "u" || !t.length)
    return 0;
  var r = Bx.getTypeOf(t) !== "string";
  return r ? Nx(n | 0, t, t.length, 0) : Rx(n | 0, t, t.length, 0);
}, k2 = St, Ox = Bf, Lx = Se();
function If() {
  k2.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
}
Lx.inherits(If, k2);
If.prototype.processChunk = function(e) {
  this.streamInfo.crc32 = Ox(e.data, this.streamInfo.crc32 || 0), this.push(e);
};
var S2 = If, Wx = Se(), Nf = St;
function Rf(e) {
  Nf.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
}
Wx.inherits(Rf, Nf);
Rf.prototype.processChunk = function(e) {
  if (e) {
    var t = this.streamInfo[this.propName] || 0;
    this.streamInfo[this.propName] = t + e.data.length;
  }
  Nf.prototype.processChunk.call(this, e);
};
var Mx = Rf, nh = Qi, rh = A2, Px = S2, Es = Mx;
function Of(e, t, n, r, i) {
  this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = i;
}
Of.prototype = {
  /**
   * Create a worker to get the uncompressed content.
   * @return {GenericWorker} the worker.
   */
  getContentWorker: function() {
    var e = new rh(nh.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new Es("data_length")), t = this;
    return e.on("end", function() {
      if (this.streamInfo.data_length !== t.uncompressedSize)
        throw new Error("Bug : uncompressed data size mismatch");
    }), e;
  },
  /**
   * Create a worker to get the compressed content.
   * @return {GenericWorker} the worker.
   */
  getCompressedWorker: function() {
    return new rh(nh.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
  }
};
Of.createWorkerFrom = function(e, t, n) {
  return e.pipe(new Px()).pipe(new Es("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new Es("compressedSize")).withStreamInfo("compression", t);
};
var Lf = Of, qx = C2, zx = A2, mc = Xr, yc = Lf, ih = St, Wf = function(e, t, n) {
  this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {
    compression: n.compression,
    compressionOptions: n.compressionOptions
  };
};
Wf.prototype = {
  /**
   * Create an internal stream for the content of this object.
   * @param {String} type the type of each chunk.
   * @return StreamHelper the stream.
   */
  internalStream: function(e) {
    var t = null, n = "string";
    try {
      if (!e)
        throw new Error("No output type specified.");
      n = e.toLowerCase();
      var r = n === "string" || n === "text";
      (n === "binarystring" || n === "text") && (n = "string"), t = this._decompressWorker();
      var i = !this._dataBinary;
      i && !r && (t = t.pipe(new mc.Utf8EncodeWorker())), !i && r && (t = t.pipe(new mc.Utf8DecodeWorker()));
    } catch (u) {
      t = new ih("error"), t.error(u);
    }
    return new qx(t, n, "");
  },
  /**
   * Prepare the content in the asked type.
   * @param {String} type the type of the result.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Promise the promise of the result.
   */
  async: function(e, t) {
    return this.internalStream(e).accumulate(t);
  },
  /**
   * Prepare the content as a nodejs stream.
   * @param {String} type the type of each chunk.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Stream the stream.
   */
  nodeStream: function(e, t) {
    return this.internalStream(e || "nodebuffer").toNodejsStream(t);
  },
  /**
   * Return a worker for the compressed content.
   * @private
   * @param {Object} compression the compression object to use.
   * @param {Object} compressionOptions the options to use when compressing.
   * @return Worker the worker.
   */
  _compressWorker: function(e, t) {
    if (this._data instanceof yc && this._data.compression.magic === e.magic)
      return this._data.getCompressedWorker();
    var n = this._decompressWorker();
    return this._dataBinary || (n = n.pipe(new mc.Utf8EncodeWorker())), yc.createWorkerFrom(n, e, t);
  },
  /**
   * Return a worker for the decompressed content.
   * @private
   * @return Worker the worker.
   */
  _decompressWorker: function() {
    return this._data instanceof yc ? this._data.getContentWorker() : this._data instanceof ih ? this._data : new zx(this._data);
  }
};
var uh = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], $x = function() {
  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};
for (var Dc = 0; Dc < uh.length; Dc++)
  Wf.prototype[uh[Dc]] = $x;
var jx = Wf, B2 = {}, Sa = {}, Ba = {}, mn = {};
(function(e) {
  var t = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
  function n(u, a) {
    return Object.prototype.hasOwnProperty.call(u, a);
  }
  e.assign = function(u) {
    for (var a = Array.prototype.slice.call(arguments, 1); a.length; ) {
      var o = a.shift();
      if (o) {
        if (typeof o != "object")
          throw new TypeError(o + "must be non-object");
        for (var c in o)
          n(o, c) && (u[c] = o[c]);
      }
    }
    return u;
  }, e.shrinkBuf = function(u, a) {
    return u.length === a ? u : u.subarray ? u.subarray(0, a) : (u.length = a, u);
  };
  var r = {
    arraySet: function(u, a, o, c, s) {
      if (a.subarray && u.subarray) {
        u.set(a.subarray(o, o + c), s);
        return;
      }
      for (var f = 0; f < c; f++)
        u[s + f] = a[o + f];
    },
    // Join array of chunks to single array.
    flattenChunks: function(u) {
      var a, o, c, s, f, m;
      for (c = 0, a = 0, o = u.length; a < o; a++)
        c += u[a].length;
      for (m = new Uint8Array(c), s = 0, a = 0, o = u.length; a < o; a++)
        f = u[a], m.set(f, s), s += f.length;
      return m;
    }
  }, i = {
    arraySet: function(u, a, o, c, s) {
      for (var f = 0; f < c; f++)
        u[s + f] = a[o + f];
    },
    // Join array of chunks to single array.
    flattenChunks: function(u) {
      return [].concat.apply([], u);
    }
  };
  e.setTyped = function(u) {
    u ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, r)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, i));
  }, e.setTyped(t);
})(mn);
var Ji = {}, en = {}, Vr = {}, Hx = mn, Xx = 4, ah = 0, oh = 1, Zx = 2;
function Gr(e) {
  for (var t = e.length; --t >= 0; )
    e[t] = 0;
}
var Vx = 0, I2 = 1, Gx = 2, Yx = 3, Kx = 258, Mf = 29, eu = 256, Ai = eu + 1 + Mf, Fr = 30, Pf = 19, N2 = 2 * Ai + 1, Vn = 15, xc = 16, Qx = 7, qf = 256, R2 = 16, O2 = 17, L2 = 18, ws = (
  /* extra bits for each length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
), Lu = (
  /* extra bits for each distance code */
  [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
), Jx = (
  /* extra bits for each bit length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
), W2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], ev = 512, ln = new Array((Ai + 2) * 2);
Gr(ln);
var pi = new Array(Fr * 2);
Gr(pi);
var Fi = new Array(ev);
Gr(Fi);
var ki = new Array(Kx - Yx + 1);
Gr(ki);
var zf = new Array(Mf);
Gr(zf);
var Ku = new Array(Fr);
Gr(Ku);
function vc(e, t, n, r, i) {
  this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
}
var M2, P2, q2;
function _c(e, t) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
}
function z2(e) {
  return e < 256 ? Fi[e] : Fi[256 + (e >>> 7)];
}
function Si(e, t) {
  e.pending_buf[e.pending++] = t & 255, e.pending_buf[e.pending++] = t >>> 8 & 255;
}
function ct(e, t, n) {
  e.bi_valid > xc - n ? (e.bi_buf |= t << e.bi_valid & 65535, Si(e, e.bi_buf), e.bi_buf = t >> xc - e.bi_valid, e.bi_valid += n - xc) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
}
function Zt(e, t, n) {
  ct(
    e,
    n[t * 2],
    n[t * 2 + 1]
    /*.Len*/
  );
}
function $2(e, t) {
  var n = 0;
  do
    n |= e & 1, e >>>= 1, n <<= 1;
  while (--t > 0);
  return n >>> 1;
}
function tv(e) {
  e.bi_valid === 16 ? (Si(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}
function nv(e, t) {
  var n = t.dyn_tree, r = t.max_code, i = t.stat_desc.static_tree, u = t.stat_desc.has_stree, a = t.stat_desc.extra_bits, o = t.stat_desc.extra_base, c = t.stat_desc.max_length, s, f, m, b, p, l, g = 0;
  for (b = 0; b <= Vn; b++)
    e.bl_count[b] = 0;
  for (n[e.heap[e.heap_max] * 2 + 1] = 0, s = e.heap_max + 1; s < N2; s++)
    f = e.heap[s], b = n[n[f * 2 + 1] * 2 + 1] + 1, b > c && (b = c, g++), n[f * 2 + 1] = b, !(f > r) && (e.bl_count[b]++, p = 0, f >= o && (p = a[f - o]), l = n[f * 2], e.opt_len += l * (b + p), u && (e.static_len += l * (i[f * 2 + 1] + p)));
  if (g !== 0) {
    do {
      for (b = c - 1; e.bl_count[b] === 0; )
        b--;
      e.bl_count[b]--, e.bl_count[b + 1] += 2, e.bl_count[c]--, g -= 2;
    } while (g > 0);
    for (b = c; b !== 0; b--)
      for (f = e.bl_count[b]; f !== 0; )
        m = e.heap[--s], !(m > r) && (n[m * 2 + 1] !== b && (e.opt_len += (b - n[m * 2 + 1]) * n[m * 2], n[m * 2 + 1] = b), f--);
  }
}
function j2(e, t, n) {
  var r = new Array(Vn + 1), i = 0, u, a;
  for (u = 1; u <= Vn; u++)
    r[u] = i = i + n[u - 1] << 1;
  for (a = 0; a <= t; a++) {
    var o = e[a * 2 + 1];
    o !== 0 && (e[a * 2] = $2(r[o]++, o));
  }
}
function rv() {
  var e, t, n, r, i, u = new Array(Vn + 1);
  for (n = 0, r = 0; r < Mf - 1; r++)
    for (zf[r] = n, e = 0; e < 1 << ws[r]; e++)
      ki[n++] = r;
  for (ki[n - 1] = r, i = 0, r = 0; r < 16; r++)
    for (Ku[r] = i, e = 0; e < 1 << Lu[r]; e++)
      Fi[i++] = r;
  for (i >>= 7; r < Fr; r++)
    for (Ku[r] = i << 7, e = 0; e < 1 << Lu[r] - 7; e++)
      Fi[256 + i++] = r;
  for (t = 0; t <= Vn; t++)
    u[t] = 0;
  for (e = 0; e <= 143; )
    ln[e * 2 + 1] = 8, e++, u[8]++;
  for (; e <= 255; )
    ln[e * 2 + 1] = 9, e++, u[9]++;
  for (; e <= 279; )
    ln[e * 2 + 1] = 7, e++, u[7]++;
  for (; e <= 287; )
    ln[e * 2 + 1] = 8, e++, u[8]++;
  for (j2(ln, Ai + 1, u), e = 0; e < Fr; e++)
    pi[e * 2 + 1] = 5, pi[e * 2] = $2(e, 5);
  M2 = new vc(ln, ws, eu + 1, Ai, Vn), P2 = new vc(pi, Lu, 0, Fr, Vn), q2 = new vc(new Array(0), Jx, 0, Pf, Qx);
}
function H2(e) {
  var t;
  for (t = 0; t < Ai; t++)
    e.dyn_ltree[t * 2] = 0;
  for (t = 0; t < Fr; t++)
    e.dyn_dtree[t * 2] = 0;
  for (t = 0; t < Pf; t++)
    e.bl_tree[t * 2] = 0;
  e.dyn_ltree[qf * 2] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
}
function X2(e) {
  e.bi_valid > 8 ? Si(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}
function iv(e, t, n, r) {
  X2(e), Si(e, n), Si(e, ~n), Hx.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n;
}
function ch(e, t, n, r) {
  var i = t * 2, u = n * 2;
  return e[i] < e[u] || e[i] === e[u] && r[t] <= r[n];
}
function Ec(e, t, n) {
  for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && ch(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !ch(t, r, e.heap[i], e.depth)); )
    e.heap[n] = e.heap[i], n = i, i <<= 1;
  e.heap[n] = r;
}
function sh(e, t, n) {
  var r, i, u = 0, a, o;
  if (e.last_lit !== 0)
    do
      r = e.pending_buf[e.d_buf + u * 2] << 8 | e.pending_buf[e.d_buf + u * 2 + 1], i = e.pending_buf[e.l_buf + u], u++, r === 0 ? Zt(e, i, t) : (a = ki[i], Zt(e, a + eu + 1, t), o = ws[a], o !== 0 && (i -= zf[a], ct(e, i, o)), r--, a = z2(r), Zt(e, a, n), o = Lu[a], o !== 0 && (r -= Ku[a], ct(e, r, o)));
    while (u < e.last_lit);
  Zt(e, qf, t);
}
function Us(e, t) {
  var n = t.dyn_tree, r = t.stat_desc.static_tree, i = t.stat_desc.has_stree, u = t.stat_desc.elems, a, o, c = -1, s;
  for (e.heap_len = 0, e.heap_max = N2, a = 0; a < u; a++)
    n[a * 2] !== 0 ? (e.heap[++e.heap_len] = c = a, e.depth[a] = 0) : n[a * 2 + 1] = 0;
  for (; e.heap_len < 2; )
    s = e.heap[++e.heap_len] = c < 2 ? ++c : 0, n[s * 2] = 1, e.depth[s] = 0, e.opt_len--, i && (e.static_len -= r[s * 2 + 1]);
  for (t.max_code = c, a = e.heap_len >> 1; a >= 1; a--)
    Ec(e, n, a);
  s = u;
  do
    a = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[
      1
      /*SMALLEST*/
    ] = e.heap[e.heap_len--], Ec(
      e,
      n,
      1
      /*SMALLEST*/
    ), o = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[--e.heap_max] = a, e.heap[--e.heap_max] = o, n[s * 2] = n[a * 2] + n[o * 2], e.depth[s] = (e.depth[a] >= e.depth[o] ? e.depth[a] : e.depth[o]) + 1, n[a * 2 + 1] = n[o * 2 + 1] = s, e.heap[
      1
      /*SMALLEST*/
    ] = s++, Ec(
      e,
      n,
      1
      /*SMALLEST*/
    );
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[
    1
    /*SMALLEST*/
  ], nv(e, t), j2(n, c, e.bl_count);
}
function fh(e, t, n) {
  var r, i = -1, u, a = t[0 * 2 + 1], o = 0, c = 7, s = 4;
  for (a === 0 && (c = 138, s = 3), t[(n + 1) * 2 + 1] = 65535, r = 0; r <= n; r++)
    u = a, a = t[(r + 1) * 2 + 1], !(++o < c && u === a) && (o < s ? e.bl_tree[u * 2] += o : u !== 0 ? (u !== i && e.bl_tree[u * 2]++, e.bl_tree[R2 * 2]++) : o <= 10 ? e.bl_tree[O2 * 2]++ : e.bl_tree[L2 * 2]++, o = 0, i = u, a === 0 ? (c = 138, s = 3) : u === a ? (c = 6, s = 3) : (c = 7, s = 4));
}
function dh(e, t, n) {
  var r, i = -1, u, a = t[0 * 2 + 1], o = 0, c = 7, s = 4;
  for (a === 0 && (c = 138, s = 3), r = 0; r <= n; r++)
    if (u = a, a = t[(r + 1) * 2 + 1], !(++o < c && u === a)) {
      if (o < s)
        do
          Zt(e, u, e.bl_tree);
        while (--o !== 0);
      else u !== 0 ? (u !== i && (Zt(e, u, e.bl_tree), o--), Zt(e, R2, e.bl_tree), ct(e, o - 3, 2)) : o <= 10 ? (Zt(e, O2, e.bl_tree), ct(e, o - 3, 3)) : (Zt(e, L2, e.bl_tree), ct(e, o - 11, 7));
      o = 0, i = u, a === 0 ? (c = 138, s = 3) : u === a ? (c = 6, s = 3) : (c = 7, s = 4);
    }
}
function uv(e) {
  var t;
  for (fh(e, e.dyn_ltree, e.l_desc.max_code), fh(e, e.dyn_dtree, e.d_desc.max_code), Us(e, e.bl_desc), t = Pf - 1; t >= 3 && e.bl_tree[W2[t] * 2 + 1] === 0; t--)
    ;
  return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
}
function av(e, t, n, r) {
  var i;
  for (ct(e, t - 257, 5), ct(e, n - 1, 5), ct(e, r - 4, 4), i = 0; i < r; i++)
    ct(e, e.bl_tree[W2[i] * 2 + 1], 3);
  dh(e, e.dyn_ltree, t - 1), dh(e, e.dyn_dtree, n - 1);
}
function ov(e) {
  var t = 4093624447, n;
  for (n = 0; n <= 31; n++, t >>>= 1)
    if (t & 1 && e.dyn_ltree[n * 2] !== 0)
      return ah;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return oh;
  for (n = 32; n < eu; n++)
    if (e.dyn_ltree[n * 2] !== 0)
      return oh;
  return ah;
}
var lh = !1;
function cv(e) {
  lh || (rv(), lh = !0), e.l_desc = new _c(e.dyn_ltree, M2), e.d_desc = new _c(e.dyn_dtree, P2), e.bl_desc = new _c(e.bl_tree, q2), e.bi_buf = 0, e.bi_valid = 0, H2(e);
}
function Z2(e, t, n, r) {
  ct(e, (Vx << 1) + (r ? 1 : 0), 3), iv(e, t, n);
}
function sv(e) {
  ct(e, I2 << 1, 3), Zt(e, qf, ln), tv(e);
}
function fv(e, t, n, r) {
  var i, u, a = 0;
  e.level > 0 ? (e.strm.data_type === Zx && (e.strm.data_type = ov(e)), Us(e, e.l_desc), Us(e, e.d_desc), a = uv(e), i = e.opt_len + 3 + 7 >>> 3, u = e.static_len + 3 + 7 >>> 3, u <= i && (i = u)) : i = u = n + 5, n + 4 <= i && t !== -1 ? Z2(e, t, n, r) : e.strategy === Xx || u === i ? (ct(e, (I2 << 1) + (r ? 1 : 0), 3), sh(e, ln, pi)) : (ct(e, (Gx << 1) + (r ? 1 : 0), 3), av(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), sh(e, e.dyn_ltree, e.dyn_dtree)), H2(e), r && X2(e);
}
function dv(e, t, n) {
  return e.pending_buf[e.d_buf + e.last_lit * 2] = t >>> 8 & 255, e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = t & 255, e.pending_buf[e.l_buf + e.last_lit] = n & 255, e.last_lit++, t === 0 ? e.dyn_ltree[n * 2]++ : (e.matches++, t--, e.dyn_ltree[(ki[n] + eu + 1) * 2]++, e.dyn_dtree[z2(t) * 2]++), e.last_lit === e.lit_bufsize - 1;
}
Vr._tr_init = cv;
Vr._tr_stored_block = Z2;
Vr._tr_flush_block = fv;
Vr._tr_tally = dv;
Vr._tr_align = sv;
function lv(e, t, n, r) {
  for (var i = e & 65535 | 0, u = e >>> 16 & 65535 | 0, a = 0; n !== 0; ) {
    a = n > 2e3 ? 2e3 : n, n -= a;
    do
      i = i + t[r++] | 0, u = u + i | 0;
    while (--a);
    i %= 65521, u %= 65521;
  }
  return i | u << 16 | 0;
}
var V2 = lv;
function hv() {
  for (var e, t = [], n = 0; n < 256; n++) {
    e = n;
    for (var r = 0; r < 8; r++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[n] = e;
  }
  return t;
}
var pv = hv();
function gv(e, t, n, r) {
  var i = pv, u = r + n;
  e ^= -1;
  for (var a = r; a < u; a++)
    e = e >>> 8 ^ i[(e ^ t[a]) & 255];
  return e ^ -1;
}
var G2 = gv, $f = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, rt = mn, Tt = Vr, Y2 = V2, Tn = G2, bv = $f, fr = 0, mv = 1, yv = 3, Rn = 4, hh = 5, Vt = 0, ph = 1, Ct = -2, Dv = -3, wc = -5, xv = -1, vv = 1, xu = 2, _v = 3, Ev = 4, wv = 0, Uv = 2, Ia = 8, Tv = 9, Cv = 15, Av = 8, Fv = 29, kv = 256, Ts = kv + 1 + Fv, Sv = 30, Bv = 19, Iv = 2 * Ts + 1, Nv = 15, fe = 3, Bn = 258, Rt = Bn + fe + 1, Rv = 32, Na = 42, Cs = 69, Wu = 73, Mu = 91, Pu = 103, Gn = 113, di = 666, Me = 1, tu = 2, Jn = 3, Yr = 4, Ov = 3;
function In(e, t) {
  return e.msg = bv[t], t;
}
function gh(e) {
  return (e << 1) - (e > 4 ? 9 : 0);
}
function kn(e) {
  for (var t = e.length; --t >= 0; )
    e[t] = 0;
}
function Cn(e) {
  var t = e.state, n = t.pending;
  n > e.avail_out && (n = e.avail_out), n !== 0 && (rt.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
}
function Ze(e, t) {
  Tt._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, Cn(e.strm);
}
function le(e, t) {
  e.pending_buf[e.pending++] = t;
}
function ui(e, t) {
  e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = t & 255;
}
function Lv(e, t, n, r) {
  var i = e.avail_in;
  return i > r && (i = r), i === 0 ? 0 : (e.avail_in -= i, rt.arraySet(t, e.input, e.next_in, i, n), e.state.wrap === 1 ? e.adler = Y2(e.adler, t, i, n) : e.state.wrap === 2 && (e.adler = Tn(e.adler, t, i, n)), e.next_in += i, e.total_in += i, i);
}
function K2(e, t) {
  var n = e.max_chain_length, r = e.strstart, i, u, a = e.prev_length, o = e.nice_match, c = e.strstart > e.w_size - Rt ? e.strstart - (e.w_size - Rt) : 0, s = e.window, f = e.w_mask, m = e.prev, b = e.strstart + Bn, p = s[r + a - 1], l = s[r + a];
  e.prev_length >= e.good_match && (n >>= 2), o > e.lookahead && (o = e.lookahead);
  do
    if (i = t, !(s[i + a] !== l || s[i + a - 1] !== p || s[i] !== s[r] || s[++i] !== s[r + 1])) {
      r += 2, i++;
      do
        ;
      while (s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && r < b);
      if (u = Bn - (b - r), r = b - Bn, u > a) {
        if (e.match_start = t, a = u, u >= o)
          break;
        p = s[r + a - 1], l = s[r + a];
      }
    }
  while ((t = m[t & f]) > c && --n !== 0);
  return a <= e.lookahead ? a : e.lookahead;
}
function er(e) {
  var t = e.w_size, n, r, i, u, a;
  do {
    if (u = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - Rt)) {
      rt.arraySet(e.window, e.window, t, t, 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, r = e.hash_size, n = r;
      do
        i = e.head[--n], e.head[n] = i >= t ? i - t : 0;
      while (--r);
      r = t, n = r;
      do
        i = e.prev[--n], e.prev[n] = i >= t ? i - t : 0;
      while (--r);
      u += t;
    }
    if (e.strm.avail_in === 0)
      break;
    if (r = Lv(e.strm, e.window, e.strstart + e.lookahead, u), e.lookahead += r, e.lookahead + e.insert >= fe)
      for (a = e.strstart - e.insert, e.ins_h = e.window[a], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[a + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[a + fe - 1]) & e.hash_mask, e.prev[a & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = a, a++, e.insert--, !(e.lookahead + e.insert < fe)); )
        ;
  } while (e.lookahead < Rt && e.strm.avail_in !== 0);
}
function Wv(e, t) {
  var n = 65535;
  for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5); ; ) {
    if (e.lookahead <= 1) {
      if (er(e), e.lookahead === 0 && t === fr)
        return Me;
      if (e.lookahead === 0)
        break;
    }
    e.strstart += e.lookahead, e.lookahead = 0;
    var r = e.block_start + n;
    if ((e.strstart === 0 || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, Ze(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - Rt && (Ze(e, !1), e.strm.avail_out === 0))
      return Me;
  }
  return e.insert = 0, t === Rn ? (Ze(e, !0), e.strm.avail_out === 0 ? Jn : Yr) : (e.strstart > e.block_start && (Ze(e, !1), e.strm.avail_out === 0), Me);
}
function Uc(e, t) {
  for (var n, r; ; ) {
    if (e.lookahead < Rt) {
      if (er(e), e.lookahead < Rt && t === fr)
        return Me;
      if (e.lookahead === 0)
        break;
    }
    if (n = 0, e.lookahead >= fe && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + fe - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), n !== 0 && e.strstart - n <= e.w_size - Rt && (e.match_length = K2(e, n)), e.match_length >= fe)
      if (r = Tt._tr_tally(e, e.strstart - e.match_start, e.match_length - fe), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= fe) {
        e.match_length--;
        do
          e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + fe - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
    else
      r = Tt._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (r && (Ze(e, !1), e.strm.avail_out === 0))
      return Me;
  }
  return e.insert = e.strstart < fe - 1 ? e.strstart : fe - 1, t === Rn ? (Ze(e, !0), e.strm.avail_out === 0 ? Jn : Yr) : e.last_lit && (Ze(e, !1), e.strm.avail_out === 0) ? Me : tu;
}
function gr(e, t) {
  for (var n, r, i; ; ) {
    if (e.lookahead < Rt) {
      if (er(e), e.lookahead < Rt && t === fr)
        return Me;
      if (e.lookahead === 0)
        break;
    }
    if (n = 0, e.lookahead >= fe && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + fe - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = fe - 1, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - Rt && (e.match_length = K2(e, n), e.match_length <= 5 && (e.strategy === vv || e.match_length === fe && e.strstart - e.match_start > 4096) && (e.match_length = fe - 1)), e.prev_length >= fe && e.match_length <= e.prev_length) {
      i = e.strstart + e.lookahead - fe, r = Tt._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - fe), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + fe - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = fe - 1, e.strstart++, r && (Ze(e, !1), e.strm.avail_out === 0))
        return Me;
    } else if (e.match_available) {
      if (r = Tt._tr_tally(e, 0, e.window[e.strstart - 1]), r && Ze(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return Me;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (r = Tt._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < fe - 1 ? e.strstart : fe - 1, t === Rn ? (Ze(e, !0), e.strm.avail_out === 0 ? Jn : Yr) : e.last_lit && (Ze(e, !1), e.strm.avail_out === 0) ? Me : tu;
}
function Mv(e, t) {
  for (var n, r, i, u, a = e.window; ; ) {
    if (e.lookahead <= Bn) {
      if (er(e), e.lookahead <= Bn && t === fr)
        return Me;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= fe && e.strstart > 0 && (i = e.strstart - 1, r = a[i], r === a[++i] && r === a[++i] && r === a[++i])) {
      u = e.strstart + Bn;
      do
        ;
      while (r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && i < u);
      e.match_length = Bn - (u - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= fe ? (n = Tt._tr_tally(e, 1, e.match_length - fe), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = Tt._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (Ze(e, !1), e.strm.avail_out === 0))
      return Me;
  }
  return e.insert = 0, t === Rn ? (Ze(e, !0), e.strm.avail_out === 0 ? Jn : Yr) : e.last_lit && (Ze(e, !1), e.strm.avail_out === 0) ? Me : tu;
}
function Pv(e, t) {
  for (var n; ; ) {
    if (e.lookahead === 0 && (er(e), e.lookahead === 0)) {
      if (t === fr)
        return Me;
      break;
    }
    if (e.match_length = 0, n = Tt._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (Ze(e, !1), e.strm.avail_out === 0))
      return Me;
  }
  return e.insert = 0, t === Rn ? (Ze(e, !0), e.strm.avail_out === 0 ? Jn : Yr) : e.last_lit && (Ze(e, !1), e.strm.avail_out === 0) ? Me : tu;
}
function $t(e, t, n, r, i) {
  this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
}
var Er;
Er = [
  /*      good lazy nice chain */
  new $t(0, 0, 0, 0, Wv),
  /* 0 store only */
  new $t(4, 4, 8, 4, Uc),
  /* 1 max speed, no lazy matches */
  new $t(4, 5, 16, 8, Uc),
  /* 2 */
  new $t(4, 6, 32, 32, Uc),
  /* 3 */
  new $t(4, 4, 16, 16, gr),
  /* 4 lazy matches */
  new $t(8, 16, 32, 32, gr),
  /* 5 */
  new $t(8, 16, 128, 128, gr),
  /* 6 */
  new $t(8, 32, 128, 256, gr),
  /* 7 */
  new $t(32, 128, 258, 1024, gr),
  /* 8 */
  new $t(32, 258, 258, 4096, gr)
  /* 9 max compression */
];
function qv(e) {
  e.window_size = 2 * e.w_size, kn(e.head), e.max_lazy_match = Er[e.level].max_lazy, e.good_match = Er[e.level].good_length, e.nice_match = Er[e.level].nice_length, e.max_chain_length = Er[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = fe - 1, e.match_available = 0, e.ins_h = 0;
}
function zv() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Ia, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new rt.Buf16(Iv * 2), this.dyn_dtree = new rt.Buf16((2 * Sv + 1) * 2), this.bl_tree = new rt.Buf16((2 * Bv + 1) * 2), kn(this.dyn_ltree), kn(this.dyn_dtree), kn(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new rt.Buf16(Nv + 1), this.heap = new rt.Buf16(2 * Ts + 1), kn(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new rt.Buf16(2 * Ts + 1), kn(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
function Q2(e) {
  var t;
  return !e || !e.state ? In(e, Ct) : (e.total_in = e.total_out = 0, e.data_type = Uv, t = e.state, t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? Na : Gn, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = fr, Tt._tr_init(t), Vt);
}
function J2(e) {
  var t = Q2(e);
  return t === Vt && qv(e.state), t;
}
function $v(e, t) {
  return !e || !e.state || e.state.wrap !== 2 ? Ct : (e.state.gzhead = t, Vt);
}
function eg(e, t, n, r, i, u) {
  if (!e)
    return Ct;
  var a = 1;
  if (t === xv && (t = 6), r < 0 ? (a = 0, r = -r) : r > 15 && (a = 2, r -= 16), i < 1 || i > Tv || n !== Ia || r < 8 || r > 15 || t < 0 || t > 9 || u < 0 || u > Ev)
    return In(e, Ct);
  r === 8 && (r = 9);
  var o = new zv();
  return e.state = o, o.strm = e, o.wrap = a, o.gzhead = null, o.w_bits = r, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = i + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + fe - 1) / fe), o.window = new rt.Buf8(o.w_size * 2), o.head = new rt.Buf16(o.hash_size), o.prev = new rt.Buf16(o.w_size), o.lit_bufsize = 1 << i + 6, o.pending_buf_size = o.lit_bufsize * 4, o.pending_buf = new rt.Buf8(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = t, o.strategy = u, o.method = n, J2(e);
}
function jv(e, t) {
  return eg(e, t, Ia, Cv, Av, wv);
}
function Hv(e, t) {
  var n, r, i, u;
  if (!e || !e.state || t > hh || t < 0)
    return e ? In(e, Ct) : Ct;
  if (r = e.state, !e.output || !e.input && e.avail_in !== 0 || r.status === di && t !== Rn)
    return In(e, e.avail_out === 0 ? wc : Ct);
  if (r.strm = e, n = r.last_flush, r.last_flush = t, r.status === Na)
    if (r.wrap === 2)
      e.adler = 0, le(r, 31), le(r, 139), le(r, 8), r.gzhead ? (le(
        r,
        (r.gzhead.text ? 1 : 0) + (r.gzhead.hcrc ? 2 : 0) + (r.gzhead.extra ? 4 : 0) + (r.gzhead.name ? 8 : 0) + (r.gzhead.comment ? 16 : 0)
      ), le(r, r.gzhead.time & 255), le(r, r.gzhead.time >> 8 & 255), le(r, r.gzhead.time >> 16 & 255), le(r, r.gzhead.time >> 24 & 255), le(r, r.level === 9 ? 2 : r.strategy >= xu || r.level < 2 ? 4 : 0), le(r, r.gzhead.os & 255), r.gzhead.extra && r.gzhead.extra.length && (le(r, r.gzhead.extra.length & 255), le(r, r.gzhead.extra.length >> 8 & 255)), r.gzhead.hcrc && (e.adler = Tn(e.adler, r.pending_buf, r.pending, 0)), r.gzindex = 0, r.status = Cs) : (le(r, 0), le(r, 0), le(r, 0), le(r, 0), le(r, 0), le(r, r.level === 9 ? 2 : r.strategy >= xu || r.level < 2 ? 4 : 0), le(r, Ov), r.status = Gn);
    else {
      var a = Ia + (r.w_bits - 8 << 4) << 8, o = -1;
      r.strategy >= xu || r.level < 2 ? o = 0 : r.level < 6 ? o = 1 : r.level === 6 ? o = 2 : o = 3, a |= o << 6, r.strstart !== 0 && (a |= Rv), a += 31 - a % 31, r.status = Gn, ui(r, a), r.strstart !== 0 && (ui(r, e.adler >>> 16), ui(r, e.adler & 65535)), e.adler = 1;
    }
  if (r.status === Cs)
    if (r.gzhead.extra) {
      for (i = r.pending; r.gzindex < (r.gzhead.extra.length & 65535) && !(r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = Tn(e.adler, r.pending_buf, r.pending - i, i)), Cn(e), i = r.pending, r.pending === r.pending_buf_size)); )
        le(r, r.gzhead.extra[r.gzindex] & 255), r.gzindex++;
      r.gzhead.hcrc && r.pending > i && (e.adler = Tn(e.adler, r.pending_buf, r.pending - i, i)), r.gzindex === r.gzhead.extra.length && (r.gzindex = 0, r.status = Wu);
    } else
      r.status = Wu;
  if (r.status === Wu)
    if (r.gzhead.name) {
      i = r.pending;
      do {
        if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = Tn(e.adler, r.pending_buf, r.pending - i, i)), Cn(e), i = r.pending, r.pending === r.pending_buf_size)) {
          u = 1;
          break;
        }
        r.gzindex < r.gzhead.name.length ? u = r.gzhead.name.charCodeAt(r.gzindex++) & 255 : u = 0, le(r, u);
      } while (u !== 0);
      r.gzhead.hcrc && r.pending > i && (e.adler = Tn(e.adler, r.pending_buf, r.pending - i, i)), u === 0 && (r.gzindex = 0, r.status = Mu);
    } else
      r.status = Mu;
  if (r.status === Mu)
    if (r.gzhead.comment) {
      i = r.pending;
      do {
        if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = Tn(e.adler, r.pending_buf, r.pending - i, i)), Cn(e), i = r.pending, r.pending === r.pending_buf_size)) {
          u = 1;
          break;
        }
        r.gzindex < r.gzhead.comment.length ? u = r.gzhead.comment.charCodeAt(r.gzindex++) & 255 : u = 0, le(r, u);
      } while (u !== 0);
      r.gzhead.hcrc && r.pending > i && (e.adler = Tn(e.adler, r.pending_buf, r.pending - i, i)), u === 0 && (r.status = Pu);
    } else
      r.status = Pu;
  if (r.status === Pu && (r.gzhead.hcrc ? (r.pending + 2 > r.pending_buf_size && Cn(e), r.pending + 2 <= r.pending_buf_size && (le(r, e.adler & 255), le(r, e.adler >> 8 & 255), e.adler = 0, r.status = Gn)) : r.status = Gn), r.pending !== 0) {
    if (Cn(e), e.avail_out === 0)
      return r.last_flush = -1, Vt;
  } else if (e.avail_in === 0 && gh(t) <= gh(n) && t !== Rn)
    return In(e, wc);
  if (r.status === di && e.avail_in !== 0)
    return In(e, wc);
  if (e.avail_in !== 0 || r.lookahead !== 0 || t !== fr && r.status !== di) {
    var c = r.strategy === xu ? Pv(r, t) : r.strategy === _v ? Mv(r, t) : Er[r.level].func(r, t);
    if ((c === Jn || c === Yr) && (r.status = di), c === Me || c === Jn)
      return e.avail_out === 0 && (r.last_flush = -1), Vt;
    if (c === tu && (t === mv ? Tt._tr_align(r) : t !== hh && (Tt._tr_stored_block(r, 0, 0, !1), t === yv && (kn(r.head), r.lookahead === 0 && (r.strstart = 0, r.block_start = 0, r.insert = 0))), Cn(e), e.avail_out === 0))
      return r.last_flush = -1, Vt;
  }
  return t !== Rn ? Vt : r.wrap <= 0 ? ph : (r.wrap === 2 ? (le(r, e.adler & 255), le(r, e.adler >> 8 & 255), le(r, e.adler >> 16 & 255), le(r, e.adler >> 24 & 255), le(r, e.total_in & 255), le(r, e.total_in >> 8 & 255), le(r, e.total_in >> 16 & 255), le(r, e.total_in >> 24 & 255)) : (ui(r, e.adler >>> 16), ui(r, e.adler & 65535)), Cn(e), r.wrap > 0 && (r.wrap = -r.wrap), r.pending !== 0 ? Vt : ph);
}
function Xv(e) {
  var t;
  return !e || !e.state ? Ct : (t = e.state.status, t !== Na && t !== Cs && t !== Wu && t !== Mu && t !== Pu && t !== Gn && t !== di ? In(e, Ct) : (e.state = null, t === Gn ? In(e, Dv) : Vt));
}
function Zv(e, t) {
  var n = t.length, r, i, u, a, o, c, s, f;
  if (!e || !e.state || (r = e.state, a = r.wrap, a === 2 || a === 1 && r.status !== Na || r.lookahead))
    return Ct;
  for (a === 1 && (e.adler = Y2(e.adler, t, n, 0)), r.wrap = 0, n >= r.w_size && (a === 0 && (kn(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), f = new rt.Buf8(r.w_size), rt.arraySet(f, t, n - r.w_size, r.w_size, 0), t = f, n = r.w_size), o = e.avail_in, c = e.next_in, s = e.input, e.avail_in = n, e.next_in = 0, e.input = t, er(r); r.lookahead >= fe; ) {
    i = r.strstart, u = r.lookahead - (fe - 1);
    do
      r.ins_h = (r.ins_h << r.hash_shift ^ r.window[i + fe - 1]) & r.hash_mask, r.prev[i & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = i, i++;
    while (--u);
    r.strstart = i, r.lookahead = fe - 1, er(r);
  }
  return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = fe - 1, r.match_available = 0, e.next_in = c, e.input = s, e.avail_in = o, r.wrap = a, Vt;
}
en.deflateInit = jv;
en.deflateInit2 = eg;
en.deflateReset = J2;
en.deflateResetKeep = Q2;
en.deflateSetHeader = $v;
en.deflate = Hv;
en.deflateEnd = Xv;
en.deflateSetDictionary = Zv;
en.deflateInfo = "pako deflate (from Nodeca project)";
var dr = {}, Ra = mn, tg = !0, ng = !0;
try {
  String.fromCharCode.apply(null, [0]);
} catch {
  tg = !1;
}
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  ng = !1;
}
var Bi = new Ra.Buf8(256);
for (var vn = 0; vn < 256; vn++)
  Bi[vn] = vn >= 252 ? 6 : vn >= 248 ? 5 : vn >= 240 ? 4 : vn >= 224 ? 3 : vn >= 192 ? 2 : 1;
Bi[254] = Bi[254] = 1;
dr.string2buf = function(e) {
  var t, n, r, i, u, a = e.length, o = 0;
  for (i = 0; i < a; i++)
    n = e.charCodeAt(i), (n & 64512) === 55296 && i + 1 < a && (r = e.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (t = new Ra.Buf8(o), u = 0, i = 0; u < o; i++)
    n = e.charCodeAt(i), (n & 64512) === 55296 && i + 1 < a && (r = e.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), n < 128 ? t[u++] = n : n < 2048 ? (t[u++] = 192 | n >>> 6, t[u++] = 128 | n & 63) : n < 65536 ? (t[u++] = 224 | n >>> 12, t[u++] = 128 | n >>> 6 & 63, t[u++] = 128 | n & 63) : (t[u++] = 240 | n >>> 18, t[u++] = 128 | n >>> 12 & 63, t[u++] = 128 | n >>> 6 & 63, t[u++] = 128 | n & 63);
  return t;
};
function rg(e, t) {
  if (t < 65534 && (e.subarray && ng || !e.subarray && tg))
    return String.fromCharCode.apply(null, Ra.shrinkBuf(e, t));
  for (var n = "", r = 0; r < t; r++)
    n += String.fromCharCode(e[r]);
  return n;
}
dr.buf2binstring = function(e) {
  return rg(e, e.length);
};
dr.binstring2buf = function(e) {
  for (var t = new Ra.Buf8(e.length), n = 0, r = t.length; n < r; n++)
    t[n] = e.charCodeAt(n);
  return t;
};
dr.buf2string = function(e, t) {
  var n, r, i, u, a = t || e.length, o = new Array(a * 2);
  for (r = 0, n = 0; n < a; ) {
    if (i = e[n++], i < 128) {
      o[r++] = i;
      continue;
    }
    if (u = Bi[i], u > 4) {
      o[r++] = 65533, n += u - 1;
      continue;
    }
    for (i &= u === 2 ? 31 : u === 3 ? 15 : 7; u > 1 && n < a; )
      i = i << 6 | e[n++] & 63, u--;
    if (u > 1) {
      o[r++] = 65533;
      continue;
    }
    i < 65536 ? o[r++] = i : (i -= 65536, o[r++] = 55296 | i >> 10 & 1023, o[r++] = 56320 | i & 1023);
  }
  return rg(o, r);
};
dr.utf8border = function(e, t) {
  var n;
  for (t = t || e.length, t > e.length && (t = e.length), n = t - 1; n >= 0 && (e[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? t : n + Bi[e[n]] > t ? n : t;
};
function Vv() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var ig = Vv, gi = en, bi = mn, As = dr, Fs = $f, Gv = ig, ug = Object.prototype.toString, Yv = 0, Tc = 4, kr = 0, bh = 1, mh = 2, Kv = -1, Qv = 0, Jv = 8;
function tr(e) {
  if (!(this instanceof tr)) return new tr(e);
  this.options = bi.assign({
    level: Kv,
    method: Jv,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Qv,
    to: ""
  }, e || {});
  var t = this.options;
  t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Gv(), this.strm.avail_out = 0;
  var n = gi.deflateInit2(
    this.strm,
    t.level,
    t.method,
    t.windowBits,
    t.memLevel,
    t.strategy
  );
  if (n !== kr)
    throw new Error(Fs[n]);
  if (t.header && gi.deflateSetHeader(this.strm, t.header), t.dictionary) {
    var r;
    if (typeof t.dictionary == "string" ? r = As.string2buf(t.dictionary) : ug.call(t.dictionary) === "[object ArrayBuffer]" ? r = new Uint8Array(t.dictionary) : r = t.dictionary, n = gi.deflateSetDictionary(this.strm, r), n !== kr)
      throw new Error(Fs[n]);
    this._dict_set = !0;
  }
}
tr.prototype.push = function(e, t) {
  var n = this.strm, r = this.options.chunkSize, i, u;
  if (this.ended)
    return !1;
  u = t === ~~t ? t : t === !0 ? Tc : Yv, typeof e == "string" ? n.input = As.string2buf(e) : ug.call(e) === "[object ArrayBuffer]" ? n.input = new Uint8Array(e) : n.input = e, n.next_in = 0, n.avail_in = n.input.length;
  do {
    if (n.avail_out === 0 && (n.output = new bi.Buf8(r), n.next_out = 0, n.avail_out = r), i = gi.deflate(n, u), i !== bh && i !== kr)
      return this.onEnd(i), this.ended = !0, !1;
    (n.avail_out === 0 || n.avail_in === 0 && (u === Tc || u === mh)) && (this.options.to === "string" ? this.onData(As.buf2binstring(bi.shrinkBuf(n.output, n.next_out))) : this.onData(bi.shrinkBuf(n.output, n.next_out)));
  } while ((n.avail_in > 0 || n.avail_out === 0) && i !== bh);
  return u === Tc ? (i = gi.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === kr) : (u === mh && (this.onEnd(kr), n.avail_out = 0), !0);
};
tr.prototype.onData = function(e) {
  this.chunks.push(e);
};
tr.prototype.onEnd = function(e) {
  e === kr && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = bi.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function jf(e, t) {
  var n = new tr(t);
  if (n.push(e, !0), n.err)
    throw n.msg || Fs[n.err];
  return n.result;
}
function e3(e, t) {
  return t = t || {}, t.raw = !0, jf(e, t);
}
function t3(e, t) {
  return t = t || {}, t.gzip = !0, jf(e, t);
}
Ji.Deflate = tr;
Ji.deflate = jf;
Ji.deflateRaw = e3;
Ji.gzip = t3;
var nu = {}, Wt = {}, vu = 30, n3 = 12, r3 = function(t, n) {
  var r, i, u, a, o, c, s, f, m, b, p, l, g, D, h, d, y, x, v, _, w, A, B, P, L;
  r = t.state, i = t.next_in, P = t.input, u = i + (t.avail_in - 5), a = t.next_out, L = t.output, o = a - (n - t.avail_out), c = a + (t.avail_out - 257), s = r.dmax, f = r.wsize, m = r.whave, b = r.wnext, p = r.window, l = r.hold, g = r.bits, D = r.lencode, h = r.distcode, d = (1 << r.lenbits) - 1, y = (1 << r.distbits) - 1;
  e:
    do {
      g < 15 && (l += P[i++] << g, g += 8, l += P[i++] << g, g += 8), x = D[l & d];
      t:
        for (; ; ) {
          if (v = x >>> 24, l >>>= v, g -= v, v = x >>> 16 & 255, v === 0)
            L[a++] = x & 65535;
          else if (v & 16) {
            _ = x & 65535, v &= 15, v && (g < v && (l += P[i++] << g, g += 8), _ += l & (1 << v) - 1, l >>>= v, g -= v), g < 15 && (l += P[i++] << g, g += 8, l += P[i++] << g, g += 8), x = h[l & y];
            n:
              for (; ; ) {
                if (v = x >>> 24, l >>>= v, g -= v, v = x >>> 16 & 255, v & 16) {
                  if (w = x & 65535, v &= 15, g < v && (l += P[i++] << g, g += 8, g < v && (l += P[i++] << g, g += 8)), w += l & (1 << v) - 1, w > s) {
                    t.msg = "invalid distance too far back", r.mode = vu;
                    break e;
                  }
                  if (l >>>= v, g -= v, v = a - o, w > v) {
                    if (v = w - v, v > m && r.sane) {
                      t.msg = "invalid distance too far back", r.mode = vu;
                      break e;
                    }
                    if (A = 0, B = p, b === 0) {
                      if (A += f - v, v < _) {
                        _ -= v;
                        do
                          L[a++] = p[A++];
                        while (--v);
                        A = a - w, B = L;
                      }
                    } else if (b < v) {
                      if (A += f + b - v, v -= b, v < _) {
                        _ -= v;
                        do
                          L[a++] = p[A++];
                        while (--v);
                        if (A = 0, b < _) {
                          v = b, _ -= v;
                          do
                            L[a++] = p[A++];
                          while (--v);
                          A = a - w, B = L;
                        }
                      }
                    } else if (A += b - v, v < _) {
                      _ -= v;
                      do
                        L[a++] = p[A++];
                      while (--v);
                      A = a - w, B = L;
                    }
                    for (; _ > 2; )
                      L[a++] = B[A++], L[a++] = B[A++], L[a++] = B[A++], _ -= 3;
                    _ && (L[a++] = B[A++], _ > 1 && (L[a++] = B[A++]));
                  } else {
                    A = a - w;
                    do
                      L[a++] = L[A++], L[a++] = L[A++], L[a++] = L[A++], _ -= 3;
                    while (_ > 2);
                    _ && (L[a++] = L[A++], _ > 1 && (L[a++] = L[A++]));
                  }
                } else if (v & 64) {
                  t.msg = "invalid distance code", r.mode = vu;
                  break e;
                } else {
                  x = h[(x & 65535) + (l & (1 << v) - 1)];
                  continue n;
                }
                break;
              }
          } else if (v & 64)
            if (v & 32) {
              r.mode = n3;
              break e;
            } else {
              t.msg = "invalid literal/length code", r.mode = vu;
              break e;
            }
          else {
            x = D[(x & 65535) + (l & (1 << v) - 1)];
            continue t;
          }
          break;
        }
    } while (i < u && a < c);
  _ = g >> 3, i -= _, g -= _ << 3, l &= (1 << g) - 1, t.next_in = i, t.next_out = a, t.avail_in = i < u ? 5 + (u - i) : 5 - (i - u), t.avail_out = a < c ? 257 + (c - a) : 257 - (a - c), r.hold = l, r.bits = g;
}, yh = mn, br = 15, Dh = 852, xh = 592, vh = 0, Cc = 1, _h = 2, i3 = [
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
], u3 = [
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
], a3 = [
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
], o3 = [
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
], c3 = function(t, n, r, i, u, a, o, c) {
  var s = c.bits, f = 0, m = 0, b = 0, p = 0, l = 0, g = 0, D = 0, h = 0, d = 0, y = 0, x, v, _, w, A, B = null, P = 0, L, I = new yh.Buf16(br + 1), z = new yh.Buf16(br + 1), H = null, G = 0, C, U, E;
  for (f = 0; f <= br; f++)
    I[f] = 0;
  for (m = 0; m < i; m++)
    I[n[r + m]]++;
  for (l = s, p = br; p >= 1 && I[p] === 0; p--)
    ;
  if (l > p && (l = p), p === 0)
    return u[a++] = 1 << 24 | 64 << 16 | 0, u[a++] = 1 << 24 | 64 << 16 | 0, c.bits = 1, 0;
  for (b = 1; b < p && I[b] === 0; b++)
    ;
  for (l < b && (l = b), h = 1, f = 1; f <= br; f++)
    if (h <<= 1, h -= I[f], h < 0)
      return -1;
  if (h > 0 && (t === vh || p !== 1))
    return -1;
  for (z[1] = 0, f = 1; f < br; f++)
    z[f + 1] = z[f] + I[f];
  for (m = 0; m < i; m++)
    n[r + m] !== 0 && (o[z[n[r + m]]++] = m);
  if (t === vh ? (B = H = o, L = 19) : t === Cc ? (B = i3, P -= 257, H = u3, G -= 257, L = 256) : (B = a3, H = o3, L = -1), y = 0, m = 0, f = b, A = a, g = l, D = 0, _ = -1, d = 1 << l, w = d - 1, t === Cc && d > Dh || t === _h && d > xh)
    return 1;
  for (; ; ) {
    C = f - D, o[m] < L ? (U = 0, E = o[m]) : o[m] > L ? (U = H[G + o[m]], E = B[P + o[m]]) : (U = 96, E = 0), x = 1 << f - D, v = 1 << g, b = v;
    do
      v -= x, u[A + (y >> D) + v] = C << 24 | U << 16 | E | 0;
    while (v !== 0);
    for (x = 1 << f - 1; y & x; )
      x >>= 1;
    if (x !== 0 ? (y &= x - 1, y += x) : y = 0, m++, --I[f] === 0) {
      if (f === p)
        break;
      f = n[r + o[m]];
    }
    if (f > l && (y & w) !== _) {
      for (D === 0 && (D = l), A += b, g = f - D, h = 1 << g; g + D < p && (h -= I[g + D], !(h <= 0)); )
        g++, h <<= 1;
      if (d += 1 << g, t === Cc && d > Dh || t === _h && d > xh)
        return 1;
      _ = y & w, u[_] = l << 24 | g << 16 | A - a | 0;
    }
  }
  return y !== 0 && (u[A + y] = f - D << 24 | 64 << 16 | 0), c.bits = l, 0;
}, bt = mn, ks = V2, jt = G2, s3 = r3, mi = c3, f3 = 0, ag = 1, og = 2, Eh = 4, d3 = 5, _u = 6, nr = 0, l3 = 1, h3 = 2, kt = -2, cg = -3, sg = -4, p3 = -5, wh = 8, fg = 1, Uh = 2, Th = 3, Ch = 4, Ah = 5, Fh = 6, kh = 7, Sh = 8, Bh = 9, Ih = 10, Qu = 11, on = 12, Ac = 13, Nh = 14, Fc = 15, Rh = 16, Oh = 17, Lh = 18, Wh = 19, Eu = 20, wu = 21, Mh = 22, Ph = 23, qh = 24, zh = 25, $h = 26, kc = 27, jh = 28, Hh = 29, _e = 30, dg = 31, g3 = 32, b3 = 852, m3 = 592, y3 = 15, D3 = y3;
function Xh(e) {
  return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
}
function x3() {
  this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new bt.Buf16(320), this.work = new bt.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
function lg(e) {
  var t;
  return !e || !e.state ? kt : (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = fg, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new bt.Buf32(b3), t.distcode = t.distdyn = new bt.Buf32(m3), t.sane = 1, t.back = -1, nr);
}
function hg(e) {
  var t;
  return !e || !e.state ? kt : (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, lg(e));
}
function pg(e, t) {
  var n, r;
  return !e || !e.state || (r = e.state, t < 0 ? (n = 0, t = -t) : (n = (t >> 4) + 1, t < 48 && (t &= 15)), t && (t < 8 || t > 15)) ? kt : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, hg(e));
}
function gg(e, t) {
  var n, r;
  return e ? (r = new x3(), e.state = r, r.window = null, n = pg(e, t), n !== nr && (e.state = null), n) : kt;
}
function v3(e) {
  return gg(e, D3);
}
var Zh = !0, Sc, Bc;
function _3(e) {
  if (Zh) {
    var t;
    for (Sc = new bt.Buf32(512), Bc = new bt.Buf32(32), t = 0; t < 144; )
      e.lens[t++] = 8;
    for (; t < 256; )
      e.lens[t++] = 9;
    for (; t < 280; )
      e.lens[t++] = 7;
    for (; t < 288; )
      e.lens[t++] = 8;
    for (mi(ag, e.lens, 0, 288, Sc, 0, e.work, { bits: 9 }), t = 0; t < 32; )
      e.lens[t++] = 5;
    mi(og, e.lens, 0, 32, Bc, 0, e.work, { bits: 5 }), Zh = !1;
  }
  e.lencode = Sc, e.lenbits = 9, e.distcode = Bc, e.distbits = 5;
}
function bg(e, t, n, r) {
  var i, u = e.state;
  return u.window === null && (u.wsize = 1 << u.wbits, u.wnext = 0, u.whave = 0, u.window = new bt.Buf8(u.wsize)), r >= u.wsize ? (bt.arraySet(u.window, t, n - u.wsize, u.wsize, 0), u.wnext = 0, u.whave = u.wsize) : (i = u.wsize - u.wnext, i > r && (i = r), bt.arraySet(u.window, t, n - r, i, u.wnext), r -= i, r ? (bt.arraySet(u.window, t, n - r, r, 0), u.wnext = r, u.whave = u.wsize) : (u.wnext += i, u.wnext === u.wsize && (u.wnext = 0), u.whave < u.wsize && (u.whave += i))), 0;
}
function E3(e, t) {
  var n, r, i, u, a, o, c, s, f, m, b, p, l, g, D = 0, h, d, y, x, v, _, w, A, B = new bt.Buf8(4), P, L, I = (
    /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  );
  if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0)
    return kt;
  n = e.state, n.mode === on && (n.mode = Ac), a = e.next_out, i = e.output, c = e.avail_out, u = e.next_in, r = e.input, o = e.avail_in, s = n.hold, f = n.bits, m = o, b = c, A = nr;
  e:
    for (; ; )
      switch (n.mode) {
        case fg:
          if (n.wrap === 0) {
            n.mode = Ac;
            break;
          }
          for (; f < 16; ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          if (n.wrap & 2 && s === 35615) {
            n.check = 0, B[0] = s & 255, B[1] = s >>> 8 & 255, n.check = jt(n.check, B, 2, 0), s = 0, f = 0, n.mode = Uh;
            break;
          }
          if (n.flags = 0, n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((s & 255) << 8) + (s >> 8)) % 31) {
            e.msg = "incorrect header check", n.mode = _e;
            break;
          }
          if ((s & 15) !== wh) {
            e.msg = "unknown compression method", n.mode = _e;
            break;
          }
          if (s >>>= 4, f -= 4, w = (s & 15) + 8, n.wbits === 0)
            n.wbits = w;
          else if (w > n.wbits) {
            e.msg = "invalid window size", n.mode = _e;
            break;
          }
          n.dmax = 1 << w, e.adler = n.check = 1, n.mode = s & 512 ? Ih : on, s = 0, f = 0;
          break;
        case Uh:
          for (; f < 16; ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          if (n.flags = s, (n.flags & 255) !== wh) {
            e.msg = "unknown compression method", n.mode = _e;
            break;
          }
          if (n.flags & 57344) {
            e.msg = "unknown header flags set", n.mode = _e;
            break;
          }
          n.head && (n.head.text = s >> 8 & 1), n.flags & 512 && (B[0] = s & 255, B[1] = s >>> 8 & 255, n.check = jt(n.check, B, 2, 0)), s = 0, f = 0, n.mode = Th;
        case Th:
          for (; f < 32; ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          n.head && (n.head.time = s), n.flags & 512 && (B[0] = s & 255, B[1] = s >>> 8 & 255, B[2] = s >>> 16 & 255, B[3] = s >>> 24 & 255, n.check = jt(n.check, B, 4, 0)), s = 0, f = 0, n.mode = Ch;
        case Ch:
          for (; f < 16; ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          n.head && (n.head.xflags = s & 255, n.head.os = s >> 8), n.flags & 512 && (B[0] = s & 255, B[1] = s >>> 8 & 255, n.check = jt(n.check, B, 2, 0)), s = 0, f = 0, n.mode = Ah;
        case Ah:
          if (n.flags & 1024) {
            for (; f < 16; ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            n.length = s, n.head && (n.head.extra_len = s), n.flags & 512 && (B[0] = s & 255, B[1] = s >>> 8 & 255, n.check = jt(n.check, B, 2, 0)), s = 0, f = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Fh;
        case Fh:
          if (n.flags & 1024 && (p = n.length, p > o && (p = o), p && (n.head && (w = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), bt.arraySet(
            n.head.extra,
            r,
            u,
            // extra field is limited to 65536 bytes
            // - no need for additional size check
            p,
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            w
          )), n.flags & 512 && (n.check = jt(n.check, r, p, u)), o -= p, u += p, n.length -= p), n.length))
            break e;
          n.length = 0, n.mode = kh;
        case kh:
          if (n.flags & 2048) {
            if (o === 0)
              break e;
            p = 0;
            do
              w = r[u + p++], n.head && w && n.length < 65536 && (n.head.name += String.fromCharCode(w));
            while (w && p < o);
            if (n.flags & 512 && (n.check = jt(n.check, r, p, u)), o -= p, u += p, w)
              break e;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Sh;
        case Sh:
          if (n.flags & 4096) {
            if (o === 0)
              break e;
            p = 0;
            do
              w = r[u + p++], n.head && w && n.length < 65536 && (n.head.comment += String.fromCharCode(w));
            while (w && p < o);
            if (n.flags & 512 && (n.check = jt(n.check, r, p, u)), o -= p, u += p, w)
              break e;
          } else n.head && (n.head.comment = null);
          n.mode = Bh;
        case Bh:
          if (n.flags & 512) {
            for (; f < 16; ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            if (s !== (n.check & 65535)) {
              e.msg = "header crc mismatch", n.mode = _e;
              break;
            }
            s = 0, f = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = on;
          break;
        case Ih:
          for (; f < 32; ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          e.adler = n.check = Xh(s), s = 0, f = 0, n.mode = Qu;
        case Qu:
          if (n.havedict === 0)
            return e.next_out = a, e.avail_out = c, e.next_in = u, e.avail_in = o, n.hold = s, n.bits = f, h3;
          e.adler = n.check = 1, n.mode = on;
        case on:
          if (t === d3 || t === _u)
            break e;
        case Ac:
          if (n.last) {
            s >>>= f & 7, f -= f & 7, n.mode = kc;
            break;
          }
          for (; f < 3; ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          switch (n.last = s & 1, s >>>= 1, f -= 1, s & 3) {
            case 0:
              n.mode = Nh;
              break;
            case 1:
              if (_3(n), n.mode = Eu, t === _u) {
                s >>>= 2, f -= 2;
                break e;
              }
              break;
            case 2:
              n.mode = Oh;
              break;
            case 3:
              e.msg = "invalid block type", n.mode = _e;
          }
          s >>>= 2, f -= 2;
          break;
        case Nh:
          for (s >>>= f & 7, f -= f & 7; f < 32; ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          if ((s & 65535) !== (s >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", n.mode = _e;
            break;
          }
          if (n.length = s & 65535, s = 0, f = 0, n.mode = Fc, t === _u)
            break e;
        case Fc:
          n.mode = Rh;
        case Rh:
          if (p = n.length, p) {
            if (p > o && (p = o), p > c && (p = c), p === 0)
              break e;
            bt.arraySet(i, r, u, p, a), o -= p, u += p, c -= p, a += p, n.length -= p;
            break;
          }
          n.mode = on;
          break;
        case Oh:
          for (; f < 14; ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          if (n.nlen = (s & 31) + 257, s >>>= 5, f -= 5, n.ndist = (s & 31) + 1, s >>>= 5, f -= 5, n.ncode = (s & 15) + 4, s >>>= 4, f -= 4, n.nlen > 286 || n.ndist > 30) {
            e.msg = "too many length or distance symbols", n.mode = _e;
            break;
          }
          n.have = 0, n.mode = Lh;
        case Lh:
          for (; n.have < n.ncode; ) {
            for (; f < 3; ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            n.lens[I[n.have++]] = s & 7, s >>>= 3, f -= 3;
          }
          for (; n.have < 19; )
            n.lens[I[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, P = { bits: n.lenbits }, A = mi(f3, n.lens, 0, 19, n.lencode, 0, n.work, P), n.lenbits = P.bits, A) {
            e.msg = "invalid code lengths set", n.mode = _e;
            break;
          }
          n.have = 0, n.mode = Wh;
        case Wh:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; D = n.lencode[s & (1 << n.lenbits) - 1], h = D >>> 24, d = D >>> 16 & 255, y = D & 65535, !(h <= f); ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            if (y < 16)
              s >>>= h, f -= h, n.lens[n.have++] = y;
            else {
              if (y === 16) {
                for (L = h + 2; f < L; ) {
                  if (o === 0)
                    break e;
                  o--, s += r[u++] << f, f += 8;
                }
                if (s >>>= h, f -= h, n.have === 0) {
                  e.msg = "invalid bit length repeat", n.mode = _e;
                  break;
                }
                w = n.lens[n.have - 1], p = 3 + (s & 3), s >>>= 2, f -= 2;
              } else if (y === 17) {
                for (L = h + 3; f < L; ) {
                  if (o === 0)
                    break e;
                  o--, s += r[u++] << f, f += 8;
                }
                s >>>= h, f -= h, w = 0, p = 3 + (s & 7), s >>>= 3, f -= 3;
              } else {
                for (L = h + 7; f < L; ) {
                  if (o === 0)
                    break e;
                  o--, s += r[u++] << f, f += 8;
                }
                s >>>= h, f -= h, w = 0, p = 11 + (s & 127), s >>>= 7, f -= 7;
              }
              if (n.have + p > n.nlen + n.ndist) {
                e.msg = "invalid bit length repeat", n.mode = _e;
                break;
              }
              for (; p--; )
                n.lens[n.have++] = w;
            }
          }
          if (n.mode === _e)
            break;
          if (n.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", n.mode = _e;
            break;
          }
          if (n.lenbits = 9, P = { bits: n.lenbits }, A = mi(ag, n.lens, 0, n.nlen, n.lencode, 0, n.work, P), n.lenbits = P.bits, A) {
            e.msg = "invalid literal/lengths set", n.mode = _e;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, P = { bits: n.distbits }, A = mi(og, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, P), n.distbits = P.bits, A) {
            e.msg = "invalid distances set", n.mode = _e;
            break;
          }
          if (n.mode = Eu, t === _u)
            break e;
        case Eu:
          n.mode = wu;
        case wu:
          if (o >= 6 && c >= 258) {
            e.next_out = a, e.avail_out = c, e.next_in = u, e.avail_in = o, n.hold = s, n.bits = f, s3(e, b), a = e.next_out, i = e.output, c = e.avail_out, u = e.next_in, r = e.input, o = e.avail_in, s = n.hold, f = n.bits, n.mode === on && (n.back = -1);
            break;
          }
          for (n.back = 0; D = n.lencode[s & (1 << n.lenbits) - 1], h = D >>> 24, d = D >>> 16 & 255, y = D & 65535, !(h <= f); ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          if (d && !(d & 240)) {
            for (x = h, v = d, _ = y; D = n.lencode[_ + ((s & (1 << x + v) - 1) >> x)], h = D >>> 24, d = D >>> 16 & 255, y = D & 65535, !(x + h <= f); ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            s >>>= x, f -= x, n.back += x;
          }
          if (s >>>= h, f -= h, n.back += h, n.length = y, d === 0) {
            n.mode = $h;
            break;
          }
          if (d & 32) {
            n.back = -1, n.mode = on;
            break;
          }
          if (d & 64) {
            e.msg = "invalid literal/length code", n.mode = _e;
            break;
          }
          n.extra = d & 15, n.mode = Mh;
        case Mh:
          if (n.extra) {
            for (L = n.extra; f < L; ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            n.length += s & (1 << n.extra) - 1, s >>>= n.extra, f -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = Ph;
        case Ph:
          for (; D = n.distcode[s & (1 << n.distbits) - 1], h = D >>> 24, d = D >>> 16 & 255, y = D & 65535, !(h <= f); ) {
            if (o === 0)
              break e;
            o--, s += r[u++] << f, f += 8;
          }
          if (!(d & 240)) {
            for (x = h, v = d, _ = y; D = n.distcode[_ + ((s & (1 << x + v) - 1) >> x)], h = D >>> 24, d = D >>> 16 & 255, y = D & 65535, !(x + h <= f); ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            s >>>= x, f -= x, n.back += x;
          }
          if (s >>>= h, f -= h, n.back += h, d & 64) {
            e.msg = "invalid distance code", n.mode = _e;
            break;
          }
          n.offset = y, n.extra = d & 15, n.mode = qh;
        case qh:
          if (n.extra) {
            for (L = n.extra; f < L; ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            n.offset += s & (1 << n.extra) - 1, s >>>= n.extra, f -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            e.msg = "invalid distance too far back", n.mode = _e;
            break;
          }
          n.mode = zh;
        case zh:
          if (c === 0)
            break e;
          if (p = b - c, n.offset > p) {
            if (p = n.offset - p, p > n.whave && n.sane) {
              e.msg = "invalid distance too far back", n.mode = _e;
              break;
            }
            p > n.wnext ? (p -= n.wnext, l = n.wsize - p) : l = n.wnext - p, p > n.length && (p = n.length), g = n.window;
          } else
            g = i, l = a - n.offset, p = n.length;
          p > c && (p = c), c -= p, n.length -= p;
          do
            i[a++] = g[l++];
          while (--p);
          n.length === 0 && (n.mode = wu);
          break;
        case $h:
          if (c === 0)
            break e;
          i[a++] = n.length, c--, n.mode = wu;
          break;
        case kc:
          if (n.wrap) {
            for (; f < 32; ) {
              if (o === 0)
                break e;
              o--, s |= r[u++] << f, f += 8;
            }
            if (b -= c, e.total_out += b, n.total += b, b && (e.adler = n.check = /*UPDATE(state.check, put - _out, _out);*/
            n.flags ? jt(n.check, i, b, a - b) : ks(n.check, i, b, a - b)), b = c, (n.flags ? s : Xh(s)) !== n.check) {
              e.msg = "incorrect data check", n.mode = _e;
              break;
            }
            s = 0, f = 0;
          }
          n.mode = jh;
        case jh:
          if (n.wrap && n.flags) {
            for (; f < 32; ) {
              if (o === 0)
                break e;
              o--, s += r[u++] << f, f += 8;
            }
            if (s !== (n.total & 4294967295)) {
              e.msg = "incorrect length check", n.mode = _e;
              break;
            }
            s = 0, f = 0;
          }
          n.mode = Hh;
        case Hh:
          A = l3;
          break e;
        case _e:
          A = cg;
          break e;
        case dg:
          return sg;
        case g3:
        default:
          return kt;
      }
  return e.next_out = a, e.avail_out = c, e.next_in = u, e.avail_in = o, n.hold = s, n.bits = f, (n.wsize || b !== e.avail_out && n.mode < _e && (n.mode < kc || t !== Eh)) && bg(e, e.output, e.next_out, b - e.avail_out), m -= e.avail_in, b -= e.avail_out, e.total_in += m, e.total_out += b, n.total += b, n.wrap && b && (e.adler = n.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
  n.flags ? jt(n.check, i, b, e.next_out - b) : ks(n.check, i, b, e.next_out - b)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === on ? 128 : 0) + (n.mode === Eu || n.mode === Fc ? 256 : 0), (m === 0 && b === 0 || t === Eh) && A === nr && (A = p3), A;
}
function w3(e) {
  if (!e || !e.state)
    return kt;
  var t = e.state;
  return t.window && (t.window = null), e.state = null, nr;
}
function U3(e, t) {
  var n;
  return !e || !e.state || (n = e.state, !(n.wrap & 2)) ? kt : (n.head = t, t.done = !1, nr);
}
function T3(e, t) {
  var n = t.length, r, i, u;
  return !e || !e.state || (r = e.state, r.wrap !== 0 && r.mode !== Qu) ? kt : r.mode === Qu && (i = 1, i = ks(i, t, n, 0), i !== r.check) ? cg : (u = bg(e, t, n, n), u ? (r.mode = dg, sg) : (r.havedict = 1, nr));
}
Wt.inflateReset = hg;
Wt.inflateReset2 = pg;
Wt.inflateResetKeep = lg;
Wt.inflateInit = v3;
Wt.inflateInit2 = gg;
Wt.inflate = E3;
Wt.inflateEnd = w3;
Wt.inflateGetHeader = U3;
Wt.inflateSetDictionary = T3;
Wt.inflateInfo = "pako inflate (from Nodeca project)";
var mg = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
function C3() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var A3 = C3, Sr = Wt, yi = mn, qu = dr, Be = mg, Ss = $f, F3 = ig, k3 = A3, yg = Object.prototype.toString;
function rr(e) {
  if (!(this instanceof rr)) return new rr(e);
  this.options = yi.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ""
  }, e || {});
  var t = this.options;
  t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new F3(), this.strm.avail_out = 0;
  var n = Sr.inflateInit2(
    this.strm,
    t.windowBits
  );
  if (n !== Be.Z_OK)
    throw new Error(Ss[n]);
  if (this.header = new k3(), Sr.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = qu.string2buf(t.dictionary) : yg.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = Sr.inflateSetDictionary(this.strm, t.dictionary), n !== Be.Z_OK)))
    throw new Error(Ss[n]);
}
rr.prototype.push = function(e, t) {
  var n = this.strm, r = this.options.chunkSize, i = this.options.dictionary, u, a, o, c, s, f = !1;
  if (this.ended)
    return !1;
  a = t === ~~t ? t : t === !0 ? Be.Z_FINISH : Be.Z_NO_FLUSH, typeof e == "string" ? n.input = qu.binstring2buf(e) : yg.call(e) === "[object ArrayBuffer]" ? n.input = new Uint8Array(e) : n.input = e, n.next_in = 0, n.avail_in = n.input.length;
  do {
    if (n.avail_out === 0 && (n.output = new yi.Buf8(r), n.next_out = 0, n.avail_out = r), u = Sr.inflate(n, Be.Z_NO_FLUSH), u === Be.Z_NEED_DICT && i && (u = Sr.inflateSetDictionary(this.strm, i)), u === Be.Z_BUF_ERROR && f === !0 && (u = Be.Z_OK, f = !1), u !== Be.Z_STREAM_END && u !== Be.Z_OK)
      return this.onEnd(u), this.ended = !0, !1;
    n.next_out && (n.avail_out === 0 || u === Be.Z_STREAM_END || n.avail_in === 0 && (a === Be.Z_FINISH || a === Be.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (o = qu.utf8border(n.output, n.next_out), c = n.next_out - o, s = qu.buf2string(n.output, o), n.next_out = c, n.avail_out = r - c, c && yi.arraySet(n.output, n.output, o, c, 0), this.onData(s)) : this.onData(yi.shrinkBuf(n.output, n.next_out))), n.avail_in === 0 && n.avail_out === 0 && (f = !0);
  } while ((n.avail_in > 0 || n.avail_out === 0) && u !== Be.Z_STREAM_END);
  return u === Be.Z_STREAM_END && (a = Be.Z_FINISH), a === Be.Z_FINISH ? (u = Sr.inflateEnd(this.strm), this.onEnd(u), this.ended = !0, u === Be.Z_OK) : (a === Be.Z_SYNC_FLUSH && (this.onEnd(Be.Z_OK), n.avail_out = 0), !0);
};
rr.prototype.onData = function(e) {
  this.chunks.push(e);
};
rr.prototype.onEnd = function(e) {
  e === Be.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = yi.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function Hf(e, t) {
  var n = new rr(t);
  if (n.push(e, !0), n.err)
    throw n.msg || Ss[n.err];
  return n.result;
}
function S3(e, t) {
  return t = t || {}, t.raw = !0, Hf(e, t);
}
nu.Inflate = rr;
nu.inflate = Hf;
nu.inflateRaw = S3;
nu.ungzip = Hf;
var B3 = mn.assign, I3 = Ji, N3 = nu, R3 = mg, Dg = {};
B3(Dg, I3, N3, R3);
var O3 = Dg, L3 = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", W3 = O3, xg = Se(), Oa = St, M3 = L3 ? "uint8array" : "array";
Ba.magic = "\b\0";
function lr(e, t) {
  Oa.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
}
xg.inherits(lr, Oa);
lr.prototype.processChunk = function(e) {
  this.meta = e.meta, this._pako === null && this._createPako(), this._pako.push(xg.transformTo(M3, e.data), !1);
};
lr.prototype.flush = function() {
  Oa.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
};
lr.prototype.cleanUp = function() {
  Oa.prototype.cleanUp.call(this), this._pako = null;
};
lr.prototype._createPako = function() {
  this._pako = new W3[this._pakoAction]({
    raw: !0,
    level: this._pakoOptions.level || -1
    // default compression
  });
  var e = this;
  this._pako.onData = function(t) {
    e.push({
      data: t,
      meta: e.meta
    });
  };
};
Ba.compressWorker = function(e) {
  return new lr("Deflate", e);
};
Ba.uncompressWorker = function() {
  return new lr("Inflate", {});
};
var Vh = St;
Sa.STORE = {
  magic: "\0\0",
  compressWorker: function() {
    return new Vh("STORE compression");
  },
  uncompressWorker: function() {
    return new Vh("STORE decompression");
  }
};
Sa.DEFLATE = Ba;
var $n = {};
$n.LOCAL_FILE_HEADER = "PK";
$n.CENTRAL_FILE_HEADER = "PK";
$n.CENTRAL_DIRECTORY_END = "PK";
$n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
$n.ZIP64_CENTRAL_DIRECTORY_END = "PK";
$n.DATA_DESCRIPTOR = "PK\x07\b";
var wr = Se(), Kr = St, Ic = Xr, Gh = Bf, Ju = $n, me = function(e, t) {
  var n = "", r;
  for (r = 0; r < t; r++)
    n += String.fromCharCode(e & 255), e = e >>> 8;
  return n;
}, P3 = function(e, t) {
  var n = e;
  return e || (n = t ? 16893 : 33204), (n & 65535) << 16;
}, q3 = function(e) {
  return (e || 0) & 63;
}, vg = function(e, t, n, r, i, u) {
  var a = e.file, o = e.compression, c = u !== Ic.utf8encode, s = wr.transformTo("string", u(a.name)), f = wr.transformTo("string", Ic.utf8encode(a.name)), m = a.comment, b = wr.transformTo("string", u(m)), p = wr.transformTo("string", Ic.utf8encode(m)), l = f.length !== a.name.length, g = p.length !== m.length, D, h, d = "", y = "", x = "", v = a.dir, _ = a.date, w = {
    crc32: 0,
    compressedSize: 0,
    uncompressedSize: 0
  };
  (!t || n) && (w.crc32 = e.crc32, w.compressedSize = e.compressedSize, w.uncompressedSize = e.uncompressedSize);
  var A = 0;
  t && (A |= 8), !c && (l || g) && (A |= 2048);
  var B = 0, P = 0;
  v && (B |= 16), i === "UNIX" ? (P = 798, B |= P3(a.unixPermissions, v)) : (P = 20, B |= q3(a.dosPermissions)), D = _.getUTCHours(), D = D << 6, D = D | _.getUTCMinutes(), D = D << 5, D = D | _.getUTCSeconds() / 2, h = _.getUTCFullYear() - 1980, h = h << 4, h = h | _.getUTCMonth() + 1, h = h << 5, h = h | _.getUTCDate(), l && (y = // Version
  me(1, 1) + // NameCRC32
  me(Gh(s), 4) + // UnicodeName
  f, d += // Info-ZIP Unicode Path Extra Field
  "up" + // size
  me(y.length, 2) + // content
  y), g && (x = // Version
  me(1, 1) + // CommentCRC32
  me(Gh(b), 4) + // UnicodeName
  p, d += // Info-ZIP Unicode Path Extra Field
  "uc" + // size
  me(x.length, 2) + // content
  x);
  var L = "";
  L += `
\0`, L += me(A, 2), L += o.magic, L += me(D, 2), L += me(h, 2), L += me(w.crc32, 4), L += me(w.compressedSize, 4), L += me(w.uncompressedSize, 4), L += me(s.length, 2), L += me(d.length, 2);
  var I = Ju.LOCAL_FILE_HEADER + L + s + d, z = Ju.CENTRAL_FILE_HEADER + // version made by (00: DOS)
  me(P, 2) + // file header (common to file and central directory)
  L + // file comment length
  me(b.length, 2) + // disk number start
  "\0\0\0\0" + // external file attributes
  me(B, 4) + // relative offset of local header
  me(r, 4) + // file name
  s + // extra field
  d + // file comment
  b;
  return {
    fileRecord: I,
    dirRecord: z
  };
}, z3 = function(e, t, n, r, i) {
  var u = "", a = wr.transformTo("string", i(r));
  return u = Ju.CENTRAL_DIRECTORY_END + // number of this disk
  "\0\0\0\0" + // total number of entries in the central directory on this disk
  me(e, 2) + // total number of entries in the central directory
  me(e, 2) + // size of the central directory   4 bytes
  me(t, 4) + // offset of start of central directory with respect to the starting disk number
  me(n, 4) + // .ZIP file comment length
  me(a.length, 2) + // .ZIP file comment
  a, u;
}, $3 = function(e) {
  var t = "";
  return t = Ju.DATA_DESCRIPTOR + // crc-32                          4 bytes
  me(e.crc32, 4) + // compressed size                 4 bytes
  me(e.compressedSize, 4) + // uncompressed size               4 bytes
  me(e.uncompressedSize, 4), t;
};
function Mt(e, t, n, r) {
  Kr.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
}
wr.inherits(Mt, Kr);
Mt.prototype.push = function(e) {
  var t = e.meta.percent || 0, n = this.entriesCount, r = this._sources.length;
  this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, Kr.prototype.push.call(this, {
    data: e.data,
    meta: {
      currentFile: this.currentFile,
      percent: n ? (t + 100 * (n - r - 1)) / n : 100
    }
  }));
};
Mt.prototype.openedSource = function(e) {
  this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
  var t = this.streamFiles && !e.file.dir;
  if (t) {
    var n = vg(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.push({
      data: n.fileRecord,
      meta: { percent: 0 }
    });
  } else
    this.accumulate = !0;
};
Mt.prototype.closedSource = function(e) {
  this.accumulate = !1;
  var t = this.streamFiles && !e.file.dir, n = vg(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
  if (this.dirRecords.push(n.dirRecord), t)
    this.push({
      data: $3(e),
      meta: { percent: 100 }
    });
  else
    for (this.push({
      data: n.fileRecord,
      meta: { percent: 0 }
    }); this.contentBuffer.length; )
      this.push(this.contentBuffer.shift());
  this.currentFile = null;
};
Mt.prototype.flush = function() {
  for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++)
    this.push({
      data: this.dirRecords[t],
      meta: { percent: 100 }
    });
  var n = this.bytesWritten - e, r = z3(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
  this.push({
    data: r,
    meta: { percent: 100 }
  });
};
Mt.prototype.prepareNextSource = function() {
  this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
};
Mt.prototype.registerPrevious = function(e) {
  this._sources.push(e);
  var t = this;
  return e.on("data", function(n) {
    t.processChunk(n);
  }), e.on("end", function() {
    t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
  }), e.on("error", function(n) {
    t.error(n);
  }), this;
};
Mt.prototype.resume = function() {
  if (!Kr.prototype.resume.call(this))
    return !1;
  if (!this.previous && this._sources.length)
    return this.prepareNextSource(), !0;
  if (!this.previous && !this._sources.length && !this.generatedError)
    return this.end(), !0;
};
Mt.prototype.error = function(e) {
  var t = this._sources;
  if (!Kr.prototype.error.call(this, e))
    return !1;
  for (var n = 0; n < t.length; n++)
    try {
      t[n].error(e);
    } catch {
    }
  return !0;
};
Mt.prototype.lock = function() {
  Kr.prototype.lock.call(this);
  for (var e = this._sources, t = 0; t < e.length; t++)
    e[t].lock();
};
var j3 = Mt, H3 = Sa, X3 = j3, Z3 = function(e, t) {
  var n = e || t, r = H3[n];
  if (!r)
    throw new Error(n + " is not a valid compression method !");
  return r;
};
B2.generateWorker = function(e, t, n) {
  var r = new X3(t.streamFiles, n, t.platform, t.encodeFileName), i = 0;
  try {
    e.forEach(function(u, a) {
      i++;
      var o = Z3(a.options.compression, t.compression), c = a.options.compressionOptions || t.compressionOptions || {}, s = a.dir, f = a.date;
      a._compressWorker(o, c).withStreamInfo("file", {
        name: u,
        dir: s,
        date: f,
        comment: a.comment || "",
        unixPermissions: a.unixPermissions,
        dosPermissions: a.dosPermissions
      }).pipe(r);
    }), r.entriesCount = i;
  } catch (u) {
    r.error(u);
  }
  return r;
};
var V3 = Se(), La = St;
function ru(e, t) {
  La.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
}
V3.inherits(ru, La);
ru.prototype._bindStream = function(e) {
  var t = this;
  this._stream = e, e.pause(), e.on("data", function(n) {
    t.push({
      data: n,
      meta: {
        percent: 0
      }
    });
  }).on("error", function(n) {
    t.isPaused ? this.generatedError = n : t.error(n);
  }).on("end", function() {
    t.isPaused ? t._upstreamEnded = !0 : t.end();
  });
};
ru.prototype.pause = function() {
  return La.prototype.pause.call(this) ? (this._stream.pause(), !0) : !1;
};
ru.prototype.resume = function() {
  return La.prototype.resume.call(this) ? (this._upstreamEnded ? this.end() : this._stream.resume(), !0) : !1;
};
var G3 = ru, Y3 = Xr, Di = Se(), _g = St, K3 = C2, Eg = Bt, Yh = Lf, Q3 = jx, J3 = B2, Kh = Aa, e_ = G3, wg = function(e, t, n) {
  var r = Di.getTypeOf(t), i, u = Di.extend(n || {}, Eg);
  u.date = u.date || /* @__PURE__ */ new Date(), u.compression !== null && (u.compression = u.compression.toUpperCase()), typeof u.unixPermissions == "string" && (u.unixPermissions = parseInt(u.unixPermissions, 8)), u.unixPermissions && u.unixPermissions & 16384 && (u.dir = !0), u.dosPermissions && u.dosPermissions & 16 && (u.dir = !0), u.dir && (e = Ug(e)), u.createFolders && (i = t_(e)) && Tg.call(this, i, !0);
  var a = r === "string" && u.binary === !1 && u.base64 === !1;
  (!n || typeof n.binary > "u") && (u.binary = !a);
  var o = t instanceof Yh && t.uncompressedSize === 0;
  (o || u.dir || !t || t.length === 0) && (u.base64 = !1, u.binary = !0, t = "", u.compression = "STORE", r = "string");
  var c = null;
  t instanceof Yh || t instanceof _g ? c = t : Kh.isNode && Kh.isStream(t) ? c = new e_(e, t) : c = Di.prepareContent(e, t, u.binary, u.optimizedBinaryString, u.base64);
  var s = new Q3(e, c, u);
  this.files[e] = s;
}, t_ = function(e) {
  e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
  var t = e.lastIndexOf("/");
  return t > 0 ? e.substring(0, t) : "";
}, Ug = function(e) {
  return e.slice(-1) !== "/" && (e += "/"), e;
}, Tg = function(e, t) {
  return t = typeof t < "u" ? t : Eg.createFolders, e = Ug(e), this.files[e] || wg.call(this, e, null, {
    dir: !0,
    createFolders: t
  }), this.files[e];
};
function Qh(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
var n_ = {
  /**
   * @see loadAsync
   */
  load: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Call a callback function for each entry at this folder level.
   * @param {Function} cb the callback function:
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   */
  forEach: function(e) {
    var t, n, r;
    for (t in this.files)
      r = this.files[t], n = t.slice(this.root.length, t.length), n && t.slice(0, this.root.length) === this.root && e(n, r);
  },
  /**
   * Filter nested files/folders with the specified function.
   * @param {Function} search the predicate to use :
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   * @return {Array} An array of matching elements.
   */
  filter: function(e) {
    var t = [];
    return this.forEach(function(n, r) {
      e(n, r) && t.push(r);
    }), t;
  },
  /**
   * Add a file to the zip file, or search a file.
   * @param   {string|RegExp} name The name of the file to add (if data is defined),
   * the name of the file to find (if no data) or a regex to match files.
   * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
   * @param   {Object} o     File options
   * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
   * a file (when searching by string) or an array of files (when searching by regex).
   */
  file: function(e, t, n) {
    if (arguments.length === 1)
      if (Qh(e)) {
        var r = e;
        return this.filter(function(u, a) {
          return !a.dir && r.test(u);
        });
      } else {
        var i = this.files[this.root + e];
        return i && !i.dir ? i : null;
      }
    else
      e = this.root + e, wg.call(this, e, t, n);
    return this;
  },
  /**
   * Add a directory to the zip file, or search.
   * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
   * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
   */
  folder: function(e) {
    if (!e)
      return this;
    if (Qh(e))
      return this.filter(function(i, u) {
        return u.dir && e.test(i);
      });
    var t = this.root + e, n = Tg.call(this, t), r = this.clone();
    return r.root = n.name, r;
  },
  /**
   * Delete a file, or a directory and all sub-files, from the zip
   * @param {string} name the name of the file to delete
   * @return {JSZip} this JSZip object
   */
  remove: function(e) {
    e = this.root + e;
    var t = this.files[e];
    if (t || (e.slice(-1) !== "/" && (e += "/"), t = this.files[e]), t && !t.dir)
      delete this.files[e];
    else
      for (var n = this.filter(function(i, u) {
        return u.name.slice(0, e.length) === e;
      }), r = 0; r < n.length; r++)
        delete this.files[n[r].name];
    return this;
  },
  /**
   * @deprecated This method has been removed in JSZip 3.0, please check the upgrade guide.
   */
  generate: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Generate the complete zip file as an internal stream.
   * @param {Object} options the options to generate the zip file :
   * - compression, "STORE" by default.
   * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
   * @return {StreamHelper} the streamed zip file.
   */
  generateInternalStream: function(e) {
    var t, n = {};
    try {
      if (n = Di.extend(e || {}, {
        streamFiles: !1,
        compression: "STORE",
        compressionOptions: null,
        type: "",
        platform: "DOS",
        comment: null,
        mimeType: "application/zip",
        encodeFileName: Y3.utf8encode
      }), n.type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), n.type === "binarystring" && (n.type = "string"), !n.type)
        throw new Error("No output type specified.");
      Di.checkSupport(n.type), (n.platform === "darwin" || n.platform === "freebsd" || n.platform === "linux" || n.platform === "sunos") && (n.platform = "UNIX"), n.platform === "win32" && (n.platform = "DOS");
      var r = n.comment || this.comment || "";
      t = J3.generateWorker(this, n, r);
    } catch (i) {
      t = new _g("error"), t.error(i);
    }
    return new K3(t, n.type || "string", n.mimeType);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateAsync: function(e, t) {
    return this.generateInternalStream(e).accumulate(t);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateNodeStream: function(e, t) {
    return e = e || {}, e.type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
  }
}, r_ = n_, i_ = Se();
function Cg(e) {
  this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
}
Cg.prototype = {
  /**
   * Check that the offset will not go too far.
   * @param {string} offset the additional offset to check.
   * @throws {Error} an Error if the offset is out of bounds.
   */
  checkOffset: function(e) {
    this.checkIndex(this.index + e);
  },
  /**
   * Check that the specified index will not be too far.
   * @param {string} newIndex the index to check.
   * @throws {Error} an Error if the index is out of bounds.
   */
  checkIndex: function(e) {
    if (this.length < this.zero + e || e < 0)
      throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
  },
  /**
   * Change the index.
   * @param {number} newIndex The new index.
   * @throws {Error} if the new index is out of the data.
   */
  setIndex: function(e) {
    this.checkIndex(e), this.index = e;
  },
  /**
   * Skip the next n bytes.
   * @param {number} n the number of bytes to skip.
   * @throws {Error} if the new index is out of the data.
   */
  skip: function(e) {
    this.setIndex(this.index + e);
  },
  /**
   * Get the byte at the specified index.
   * @param {number} i the index to use.
   * @return {number} a byte.
   */
  byteAt: function() {
  },
  /**
   * Get the next number with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {number} the corresponding number.
   */
  readInt: function(e) {
    var t = 0, n;
    for (this.checkOffset(e), n = this.index + e - 1; n >= this.index; n--)
      t = (t << 8) + this.byteAt(n);
    return this.index += e, t;
  },
  /**
   * Get the next string with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {string} the corresponding string.
   */
  readString: function(e) {
    return i_.transformTo("string", this.readData(e));
  },
  /**
   * Get raw data without conversion, <size> bytes.
   * @param {number} size the number of bytes to read.
   * @return {Object} the raw data, implementation specific.
   */
  readData: function() {
  },
  /**
   * Find the last occurrence of a zip signature (4 bytes).
   * @param {string} sig the signature to find.
   * @return {number} the index of the last occurrence, -1 if not found.
   */
  lastIndexOfSignature: function() {
  },
  /**
   * Read the signature (4 bytes) at the current position and compare it with sig.
   * @param {string} sig the expected signature
   * @return {boolean} true if the signature matches, false otherwise.
   */
  readAndCheckSignature: function() {
  },
  /**
   * Get the next date.
   * @return {Date} the date.
   */
  readDate: function() {
    var e = this.readInt(4);
    return new Date(Date.UTC(
      (e >> 25 & 127) + 1980,
      // year
      (e >> 21 & 15) - 1,
      // month
      e >> 16 & 31,
      // day
      e >> 11 & 31,
      // hour
      e >> 5 & 63,
      // minute
      (e & 31) << 1
    ));
  }
};
var Ag = Cg, Fg = Ag, u_ = Se();
function Qr(e) {
  Fg.call(this, e);
  for (var t = 0; t < this.data.length; t++)
    e[t] = e[t] & 255;
}
u_.inherits(Qr, Fg);
Qr.prototype.byteAt = function(e) {
  return this.data[this.zero + e];
};
Qr.prototype.lastIndexOfSignature = function(e) {
  for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), u = this.length - 4; u >= 0; --u)
    if (this.data[u] === t && this.data[u + 1] === n && this.data[u + 2] === r && this.data[u + 3] === i)
      return u - this.zero;
  return -1;
};
Qr.prototype.readAndCheckSignature = function(e) {
  var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), u = this.readData(4);
  return t === u[0] && n === u[1] && r === u[2] && i === u[3];
};
Qr.prototype.readData = function(e) {
  if (this.checkOffset(e), e === 0)
    return [];
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var kg = Qr, Sg = Ag, a_ = Se();
function Jr(e) {
  Sg.call(this, e);
}
a_.inherits(Jr, Sg);
Jr.prototype.byteAt = function(e) {
  return this.data.charCodeAt(this.zero + e);
};
Jr.prototype.lastIndexOfSignature = function(e) {
  return this.data.lastIndexOf(e) - this.zero;
};
Jr.prototype.readAndCheckSignature = function(e) {
  var t = this.readData(4);
  return e === t;
};
Jr.prototype.readData = function(e) {
  this.checkOffset(e);
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var o_ = Jr, Bg = kg, c_ = Se();
function Xf(e) {
  Bg.call(this, e);
}
c_.inherits(Xf, Bg);
Xf.prototype.readData = function(e) {
  if (this.checkOffset(e), e === 0)
    return new Uint8Array(0);
  var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var Ig = Xf, Ng = Ig, s_ = Se();
function Zf(e) {
  Ng.call(this, e);
}
s_.inherits(Zf, Ng);
Zf.prototype.readData = function(e) {
  this.checkOffset(e);
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var f_ = Zf, Uu = Se(), Jh = Oe, d_ = kg, l_ = o_, h_ = f_, p_ = Ig, Rg = function(e) {
  var t = Uu.getTypeOf(e);
  return Uu.checkSupport(t), t === "string" && !Jh.uint8array ? new l_(e) : t === "nodebuffer" ? new h_(e) : Jh.uint8array ? new p_(Uu.transformTo("uint8array", e)) : new d_(Uu.transformTo("array", e));
}, Nc = Rg, _n = Se(), g_ = Lf, e0 = Bf, Tu = Xr, Cu = Sa, b_ = Oe, m_ = 0, y_ = 3, D_ = function(e) {
  for (var t in Cu)
    if (Object.prototype.hasOwnProperty.call(Cu, t) && Cu[t].magic === e)
      return Cu[t];
  return null;
};
function Og(e, t) {
  this.options = e, this.loadOptions = t;
}
Og.prototype = {
  /**
   * say if the file is encrypted.
   * @return {boolean} true if the file is encrypted, false otherwise.
   */
  isEncrypted: function() {
    return (this.bitFlag & 1) === 1;
  },
  /**
   * say if the file has utf-8 filename/comment.
   * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
   */
  useUTF8: function() {
    return (this.bitFlag & 2048) === 2048;
  },
  /**
   * Read the local part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readLocalPart: function(e) {
    var t, n;
    if (e.skip(22), this.fileNameLength = e.readInt(2), n = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1)
      throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
    if (t = D_(this.compressionMethod), t === null)
      throw new Error("Corrupted zip : compression " + _n.pretty(this.compressionMethod) + " unknown (inner file : " + _n.transformTo("string", this.fileName) + ")");
    this.decompressed = new g_(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readCentralPart: function(e) {
    this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
    var t = e.readInt(2);
    if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted())
      throw new Error("Encrypted zip are not supported");
    e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
  },
  /**
   * Parse the external file attributes and get the unix/dos permissions.
   */
  processAttributes: function() {
    this.unixPermissions = null, this.dosPermissions = null;
    var e = this.versionMadeBy >> 8;
    this.dir = !!(this.externalFileAttributes & 16), e === m_ && (this.dosPermissions = this.externalFileAttributes & 63), e === y_ && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), !this.dir && this.fileNameStr.slice(-1) === "/" && (this.dir = !0);
  },
  /**
   * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
   * @param {DataReader} reader the reader to use.
   */
  parseZIP64ExtraField: function() {
    if (this.extraFields[1]) {
      var e = Nc(this.extraFields[1].value);
      this.uncompressedSize === _n.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === _n.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === _n.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === _n.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
    }
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readExtraFields: function(e) {
    var t = e.index + this.extraFieldsLength, n, r, i;
    for (this.extraFields || (this.extraFields = {}); e.index + 4 < t; )
      n = e.readInt(2), r = e.readInt(2), i = e.readData(r), this.extraFields[n] = {
        id: n,
        length: r,
        value: i
      };
    e.setIndex(t);
  },
  /**
   * Apply an UTF8 transformation if needed.
   */
  handleUTF8: function() {
    var e = b_.uint8array ? "uint8array" : "array";
    if (this.useUTF8())
      this.fileNameStr = Tu.utf8decode(this.fileName), this.fileCommentStr = Tu.utf8decode(this.fileComment);
    else {
      var t = this.findExtraFieldUnicodePath();
      if (t !== null)
        this.fileNameStr = t;
      else {
        var n = _n.transformTo(e, this.fileName);
        this.fileNameStr = this.loadOptions.decodeFileName(n);
      }
      var r = this.findExtraFieldUnicodeComment();
      if (r !== null)
        this.fileCommentStr = r;
      else {
        var i = _n.transformTo(e, this.fileComment);
        this.fileCommentStr = this.loadOptions.decodeFileName(i);
      }
    }
  },
  /**
   * Find the unicode path declared in the extra field, if any.
   * @return {String} the unicode path, null otherwise.
   */
  findExtraFieldUnicodePath: function() {
    var e = this.extraFields[28789];
    if (e) {
      var t = Nc(e.value);
      return t.readInt(1) !== 1 || e0(this.fileName) !== t.readInt(4) ? null : Tu.utf8decode(t.readData(e.length - 5));
    }
    return null;
  },
  /**
   * Find the unicode comment declared in the extra field, if any.
   * @return {String} the unicode comment, null otherwise.
   */
  findExtraFieldUnicodeComment: function() {
    var e = this.extraFields[25461];
    if (e) {
      var t = Nc(e.value);
      return t.readInt(1) !== 1 || e0(this.fileComment) !== t.readInt(4) ? null : Tu.utf8decode(t.readData(e.length - 5));
    }
    return null;
  }
};
var x_ = Og, v_ = Rg, cn = Se(), Nt = $n, __ = x_, E_ = Oe;
function Lg(e) {
  this.files = [], this.loadOptions = e;
}
Lg.prototype = {
  /**
   * Check that the reader is on the specified signature.
   * @param {string} expectedSignature the expected signature.
   * @throws {Error} if it is an other signature.
   */
  checkSignature: function(e) {
    if (!this.reader.readAndCheckSignature(e)) {
      this.reader.index -= 4;
      var t = this.reader.readString(4);
      throw new Error("Corrupted zip or bug: unexpected signature (" + cn.pretty(t) + ", expected " + cn.pretty(e) + ")");
    }
  },
  /**
   * Check if the given signature is at the given index.
   * @param {number} askedIndex the index to check.
   * @param {string} expectedSignature the signature to expect.
   * @return {boolean} true if the signature is here, false otherwise.
   */
  isSignature: function(e, t) {
    var n = this.reader.index;
    this.reader.setIndex(e);
    var r = this.reader.readString(4), i = r === t;
    return this.reader.setIndex(n), i;
  },
  /**
   * Read the end of the central directory.
   */
  readBlockEndOfCentral: function() {
    this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
    var e = this.reader.readData(this.zipCommentLength), t = E_.uint8array ? "uint8array" : "array", n = cn.transformTo(t, e);
    this.zipComment = this.loadOptions.decodeFileName(n);
  },
  /**
   * Read the end of the Zip 64 central directory.
   * Not merged with the method readEndOfCentral :
   * The end of central can coexist with its Zip64 brother,
   * I don't want to read the wrong number of bytes !
   */
  readBlockZip64EndOfCentral: function() {
    this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
    for (var e = this.zip64EndOfCentralSize - 44, t = 0, n, r, i; t < e; )
      n = this.reader.readInt(2), r = this.reader.readInt(4), i = this.reader.readData(r), this.zip64ExtensibleData[n] = {
        id: n,
        length: r,
        value: i
      };
  },
  /**
   * Read the end of the Zip 64 central directory locator.
   */
  readBlockZip64EndOfCentralLocator: function() {
    if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1)
      throw new Error("Multi-volumes zip are not supported");
  },
  /**
   * Read the local files, based on the offset read in the central part.
   */
  readLocalFiles: function() {
    var e, t;
    for (e = 0; e < this.files.length; e++)
      t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(Nt.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
  },
  /**
   * Read the central directory.
   */
  readCentralDir: function() {
    var e;
    for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(Nt.CENTRAL_FILE_HEADER); )
      e = new __({
        zip64: this.zip64
      }, this.loadOptions), e.readCentralPart(this.reader), this.files.push(e);
    if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
      throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
  },
  /**
   * Read the end of central directory.
   */
  readEndOfCentral: function() {
    var e = this.reader.lastIndexOfSignature(Nt.CENTRAL_DIRECTORY_END);
    if (e < 0) {
      var t = !this.isSignature(0, Nt.LOCAL_FILE_HEADER);
      throw t ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
    }
    this.reader.setIndex(e);
    var n = e;
    if (this.checkSignature(Nt.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === cn.MAX_VALUE_16BITS || this.diskWithCentralDirStart === cn.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === cn.MAX_VALUE_16BITS || this.centralDirRecords === cn.MAX_VALUE_16BITS || this.centralDirSize === cn.MAX_VALUE_32BITS || this.centralDirOffset === cn.MAX_VALUE_32BITS) {
      if (this.zip64 = !0, e = this.reader.lastIndexOfSignature(Nt.ZIP64_CENTRAL_DIRECTORY_LOCATOR), e < 0)
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
      if (this.reader.setIndex(e), this.checkSignature(Nt.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, Nt.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(Nt.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
      this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(Nt.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
    }
    var r = this.centralDirOffset + this.centralDirSize;
    this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
    var i = n - r;
    if (i > 0)
      this.isSignature(n, Nt.CENTRAL_FILE_HEADER) || (this.reader.zero = i);
    else if (i < 0)
      throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.");
  },
  prepareReader: function(e) {
    this.reader = v_(e);
  },
  /**
   * Read a zip file and create ZipEntries.
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
   */
  load: function(e) {
    this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
  }
};
var w_ = Lg, Rc = Se(), zu = Qi, U_ = Xr, T_ = w_, C_ = S2, t0 = Aa;
function A_(e) {
  return new zu.Promise(function(t, n) {
    var r = e.decompressed.getContentWorker().pipe(new C_());
    r.on("error", function(i) {
      n(i);
    }).on("end", function() {
      r.streamInfo.crc32 !== e.decompressed.crc32 ? n(new Error("Corrupted zip : CRC32 mismatch")) : t();
    }).resume();
  });
}
var F_ = function(e, t) {
  var n = this;
  return t = Rc.extend(t || {}, {
    base64: !1,
    checkCRC32: !1,
    optimizedBinaryString: !1,
    createFolders: !1,
    decodeFileName: U_.utf8decode
  }), t0.isNode && t0.isStream(e) ? zu.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : Rc.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(r) {
    var i = new T_(t);
    return i.load(r), i;
  }).then(function(i) {
    var u = [zu.Promise.resolve(i)], a = i.files;
    if (t.checkCRC32)
      for (var o = 0; o < a.length; o++)
        u.push(A_(a[o]));
    return zu.Promise.all(u);
  }).then(function(i) {
    for (var u = i.shift(), a = u.files, o = 0; o < a.length; o++) {
      var c = a[o], s = c.fileNameStr, f = Rc.resolve(c.fileNameStr);
      n.file(f, c.decompressed, {
        binary: !0,
        optimizedBinaryString: !0,
        date: c.date,
        dir: c.dir,
        comment: c.fileCommentStr.length ? c.fileCommentStr : null,
        unixPermissions: c.unixPermissions,
        dosPermissions: c.dosPermissions,
        createFolders: t.createFolders
      }), c.dir || (n.file(f).unsafeOriginalName = s);
    }
    return u.zipComment.length && (n.comment = u.zipComment), n;
  });
};
function At() {
  if (!(this instanceof At))
    return new At();
  if (arguments.length)
    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
  this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
    var e = new At();
    for (var t in this)
      typeof this[t] != "function" && (e[t] = this[t]);
    return e;
  };
}
At.prototype = r_;
At.prototype.loadAsync = F_;
At.support = Oe;
At.defaults = Bt;
At.version = "3.10.1";
At.loadAsync = function(e, t) {
  return new At().loadAsync(e, t);
};
At.external = Qi;
var k_ = At, S_ = Ua, B_ = k_;
Gi.openArrayBuffer = I_;
Gi.splitPath = N_;
Gi.joinPath = R_;
function I_(e) {
  return B_.loadAsync(e).then(function(t) {
    function n(a) {
      return t.file(a) !== null;
    }
    function r(a, o) {
      return t.file(a).async("uint8array").then(function(c) {
        if (o === "base64")
          return S_.fromByteArray(c);
        if (o) {
          var s = new TextDecoder(o);
          return s.decode(c);
        } else
          return c;
      });
    }
    function i(a, o) {
      t.file(a, o);
    }
    function u() {
      return t.generateAsync({ type: "arraybuffer" });
    }
    return {
      exists: n,
      read: r,
      write: i,
      toArrayBuffer: u
    };
  });
}
function N_(e) {
  var t = e.lastIndexOf("/");
  return t === -1 ? { dirname: "", basename: e } : {
    dirname: e.substring(0, t),
    basename: e.substring(t + 1)
  };
}
function R_() {
  var e = Array.prototype.filter.call(arguments, function(n) {
    return n;
  }), t = [];
  return e.forEach(function(n) {
    /^\//.test(n) ? t = [n] : t.push(n);
  }), t.join("/");
}
var Vf = {}, yn = {}, ei = {}, Wa = Ne;
ei.Element = ti;
ei.element = function(e, t, n) {
  return new ti(e, t, n);
};
ei.text = function(e) {
  return {
    type: "text",
    value: e
  };
};
var Wg = ei.emptyElement = {
  first: function() {
    return null;
  },
  firstOrEmpty: function() {
    return Wg;
  },
  attributes: {},
  children: []
};
function ti(e, t, n) {
  this.type = "element", this.name = e, this.attributes = t || {}, this.children = n || [];
}
ti.prototype.first = function(e) {
  return Wa.find(this.children, function(t) {
    return t.name === e;
  });
};
ti.prototype.firstOrEmpty = function(e) {
  return this.first(e) || Wg;
};
ti.prototype.getElementsByTagName = function(e) {
  var t = Wa.filter(this.children, function(n) {
    return n.name === e;
  });
  return Mg(t);
};
ti.prototype.text = function() {
  if (this.children.length === 0)
    return "";
  if (this.children.length !== 1 || this.children[0].type !== "text")
    throw new Error("Not implemented");
  return this.children[0].value;
};
var O_ = {
  getElementsByTagName: function(e) {
    return Mg(Wa.flatten(this.map(function(t) {
      return t.getElementsByTagName(e);
    }, !0)));
  }
};
function Mg(e) {
  return Wa.extend(e, O_);
}
var Pg = {}, Gf = {}, Ma = {}, tn = {}, Dn = {};
function L_(e, t, n) {
  if (n === void 0 && (n = Array.prototype), e && typeof n.find == "function")
    return n.find.call(e, t);
  for (var r = 0; r < e.length; r++)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      var i = e[r];
      if (t.call(void 0, i, r, e))
        return i;
    }
}
function Yf(e, t) {
  return t === void 0 && (t = Object), t && typeof t.freeze == "function" ? t.freeze(e) : e;
}
function W_(e, t) {
  if (e === null || typeof e != "object")
    throw new TypeError("target is not an object");
  for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  return e;
}
var qg = Yf({
  /**
   * `text/html`, the only mime type that triggers treating an XML document as HTML.
   *
   * @see DOMParser.SupportedType.isHTML
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
   */
  HTML: "text/html",
  /**
   * Helper method to check a mime type if it indicates an HTML document
   *
   * @param {string} [value]
   * @returns {boolean}
   *
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
  isHTML: function(e) {
    return e === qg.HTML;
  },
  /**
   * `application/xml`, the standard mime type for XML documents.
   *
   * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
   * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_APPLICATION: "application/xml",
  /**
   * `text/html`, an alias for `application/xml`.
   *
   * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
   * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_TEXT: "text/xml",
  /**
   * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
   * but is parsed as an XML document.
   *
   * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
   * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
   */
  XML_XHTML_APPLICATION: "application/xhtml+xml",
  /**
   * `image/svg+xml`,
   *
   * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
   * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
   * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
   */
  XML_SVG_IMAGE: "image/svg+xml"
}), zg = Yf({
  /**
   * The XHTML namespace.
   *
   * @see http://www.w3.org/1999/xhtml
   */
  HTML: "http://www.w3.org/1999/xhtml",
  /**
   * Checks if `uri` equals `NAMESPACE.HTML`.
   *
   * @param {string} [uri]
   *
   * @see NAMESPACE.HTML
   */
  isHTML: function(e) {
    return e === zg.HTML;
  },
  /**
   * The SVG namespace.
   *
   * @see http://www.w3.org/2000/svg
   */
  SVG: "http://www.w3.org/2000/svg",
  /**
   * The `xml:` namespace.
   *
   * @see http://www.w3.org/XML/1998/namespace
   */
  XML: "http://www.w3.org/XML/1998/namespace",
  /**
   * The `xmlns:` namespace
   *
   * @see https://www.w3.org/2000/xmlns/
   */
  XMLNS: "http://www.w3.org/2000/xmlns/"
});
Dn.assign = W_;
Dn.find = L_;
Dn.freeze = Yf;
Dn.MIME_TYPE = qg;
Dn.NAMESPACE = zg;
var $g = Dn, Kt = $g.find, Ii = $g.NAMESPACE;
function M_(e) {
  return e !== "";
}
function P_(e) {
  return e ? e.split(/[\t\n\f\r ]+/).filter(M_) : [];
}
function q_(e, t) {
  return e.hasOwnProperty(t) || (e[t] = !0), e;
}
function n0(e) {
  if (!e) return [];
  var t = P_(e);
  return Object.keys(t.reduce(q_, {}));
}
function z_(e) {
  return function(t) {
    return e && e.indexOf(t) !== -1;
  };
}
function iu(e, t) {
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
}
function ht(e, t) {
  var n = e.prototype;
  if (!(n instanceof t)) {
    let r = function() {
    };
    r.prototype = t.prototype, r = new r(), iu(n, r), e.prototype = n = r;
  }
  n.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), n.constructor = e);
}
var pt = {}, Ot = pt.ELEMENT_NODE = 1, Or = pt.ATTRIBUTE_NODE = 2, ea = pt.TEXT_NODE = 3, jg = pt.CDATA_SECTION_NODE = 4, Hg = pt.ENTITY_REFERENCE_NODE = 5, $_ = pt.ENTITY_NODE = 6, Xg = pt.PROCESSING_INSTRUCTION_NODE = 7, Zg = pt.COMMENT_NODE = 8, Vg = pt.DOCUMENT_NODE = 9, Gg = pt.DOCUMENT_TYPE_NODE = 10, gn = pt.DOCUMENT_FRAGMENT_NODE = 11, j_ = pt.NOTATION_NODE = 12, nt = {}, $e = {};
nt.INDEX_SIZE_ERR = ($e[1] = "Index size error", 1);
nt.DOMSTRING_SIZE_ERR = ($e[2] = "DOMString size error", 2);
var ot = nt.HIERARCHY_REQUEST_ERR = ($e[3] = "Hierarchy request error", 3);
nt.WRONG_DOCUMENT_ERR = ($e[4] = "Wrong document", 4);
nt.INVALID_CHARACTER_ERR = ($e[5] = "Invalid character", 5);
nt.NO_DATA_ALLOWED_ERR = ($e[6] = "No data allowed", 6);
nt.NO_MODIFICATION_ALLOWED_ERR = ($e[7] = "No modification allowed", 7);
var Yg = nt.NOT_FOUND_ERR = ($e[8] = "Not found", 8);
nt.NOT_SUPPORTED_ERR = ($e[9] = "Not supported", 9);
var r0 = nt.INUSE_ATTRIBUTE_ERR = ($e[10] = "Attribute in use", 10);
nt.INVALID_STATE_ERR = ($e[11] = "Invalid state", 11);
nt.SYNTAX_ERR = ($e[12] = "Syntax error", 12);
nt.INVALID_MODIFICATION_ERR = ($e[13] = "Invalid modification", 13);
nt.NAMESPACE_ERR = ($e[14] = "Invalid namespace", 14);
nt.INVALID_ACCESS_ERR = ($e[15] = "Invalid access", 15);
function Ie(e, t) {
  if (t instanceof Error)
    var n = t;
  else
    n = this, Error.call(this, $e[e]), this.message = $e[e], Error.captureStackTrace && Error.captureStackTrace(this, Ie);
  return n.code = e, t && (this.message = this.message + ": " + t), n;
}
Ie.prototype = Error.prototype;
iu(nt, Ie);
function hn() {
}
hn.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item: function(e) {
    return e >= 0 && e < this.length ? this[e] : null;
  },
  toString: function(e, t) {
    for (var n = [], r = 0; r < this.length; r++)
      Ur(this[r], n, e, t);
    return n.join("");
  },
  /**
   * @private
   * @param {function (Node):boolean} predicate
   * @returns {Node[]}
   */
  filter: function(e) {
    return Array.prototype.filter.call(this, e);
  },
  /**
   * @private
   * @param {Node} item
   * @returns {number}
   */
  indexOf: function(e) {
    return Array.prototype.indexOf.call(this, e);
  }
};
function Lr(e, t) {
  this._node = e, this._refresh = t, Kf(this);
}
function Kf(e) {
  var t = e._node._inc || e._node.ownerDocument._inc;
  if (e._inc !== t) {
    var n = e._refresh(e._node);
    if (cb(e, "length", n.length), !e.$$length || n.length < e.$$length)
      for (var r = n.length; r in e; r++)
        Object.prototype.hasOwnProperty.call(e, r) && delete e[r];
    iu(n, e), e._inc = t;
  }
}
Lr.prototype.item = function(e) {
  return Kf(this), this[e] || null;
};
ht(Lr, hn);
function ta() {
}
function Kg(e, t) {
  for (var n = e.length; n--; )
    if (e[n] === t)
      return n;
}
function i0(e, t, n, r) {
  if (r ? t[Kg(t, r)] = n : t[t.length++] = n, e) {
    n.ownerElement = e;
    var i = e.ownerDocument;
    i && (r && eb(i, e, r), H_(i, e, n));
  }
}
function u0(e, t, n) {
  var r = Kg(t, n);
  if (r >= 0) {
    for (var i = t.length - 1; r < i; )
      t[r] = t[++r];
    if (t.length = i, e) {
      var u = e.ownerDocument;
      u && (eb(u, e, n), n.ownerElement = null);
    }
  } else
    throw new Ie(Yg, new Error(e.tagName + "@" + n));
}
ta.prototype = {
  length: 0,
  item: hn.prototype.item,
  getNamedItem: function(e) {
    for (var t = this.length; t--; ) {
      var n = this[t];
      if (n.nodeName == e)
        return n;
    }
  },
  setNamedItem: function(e) {
    var t = e.ownerElement;
    if (t && t != this._ownerElement)
      throw new Ie(r0);
    var n = this.getNamedItem(e.nodeName);
    return i0(this._ownerElement, this, e, n), n;
  },
  /* returns Node */
  setNamedItemNS: function(e) {
    var t = e.ownerElement, n;
    if (t && t != this._ownerElement)
      throw new Ie(r0);
    return n = this.getNamedItemNS(e.namespaceURI, e.localName), i0(this._ownerElement, this, e, n), n;
  },
  /* returns Node */
  removeNamedItem: function(e) {
    var t = this.getNamedItem(e);
    return u0(this._ownerElement, this, t), t;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function(e, t) {
    var n = this.getNamedItemNS(e, t);
    return u0(this._ownerElement, this, n), n;
  },
  getNamedItemNS: function(e, t) {
    for (var n = this.length; n--; ) {
      var r = this[n];
      if (r.localName == t && r.namespaceURI == e)
        return r;
    }
    return null;
  }
};
function Qg() {
}
Qg.prototype = {
  /**
   * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
   * The different implementations fairly diverged in what kind of features were reported.
   * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
   *
   * @deprecated It is deprecated and modern browsers return true in all cases.
   *
   * @param {string} feature
   * @param {string} [version]
   * @returns {boolean} always true
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
   * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
   */
  hasFeature: function(e, t) {
    return !0;
  },
  /**
   * Creates an XML Document object of the specified type with its document element.
   *
   * __It behaves slightly different from the description in the living standard__:
   * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
   * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string|null} namespaceURI
   * @param {string} qualifiedName
   * @param {DocumentType=null} doctype
   * @returns {Document}
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocument: function(e, t, n) {
    var r = new uu();
    if (r.implementation = this, r.childNodes = new hn(), r.doctype = n || null, n && r.appendChild(n), t) {
      var i = r.createElementNS(e, t);
      r.appendChild(i);
    }
    return r;
  },
  /**
   * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
   *
   * __This behavior is slightly different from the in the specs__:
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string} qualifiedName
   * @param {string} [publicId]
   * @param {string} [systemId]
   * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
   * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocumentType: function(e, t, n) {
    var r = new Pa();
    return r.name = e, r.nodeName = e, r.publicId = t || "", r.systemId = n || "", r;
  }
};
function ge() {
}
ge.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function(e, t) {
    return na(this, e, t);
  },
  replaceChild: function(e, t) {
    na(this, e, t, nb), t && this.removeChild(t);
  },
  removeChild: function(e) {
    return tb(this, e);
  },
  appendChild: function(e) {
    return this.insertBefore(e, null);
  },
  hasChildNodes: function() {
    return this.firstChild != null;
  },
  cloneNode: function(e) {
    return Bs(this.ownerDocument || this, this, e);
  },
  // Modified in DOM Level 2:
  normalize: function() {
    for (var e = this.firstChild; e; ) {
      var t = e.nextSibling;
      t && t.nodeType == ea && e.nodeType == ea ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function(e, t) {
    return this.ownerDocument.implementation.hasFeature(e, t);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function() {
    return this.attributes.length > 0;
  },
  /**
   * Look up the prefix associated to the given namespace URI, starting from this node.
   * **The default namespace declarations are ignored by this method.**
   * See Namespace Prefix Lookup for details on the algorithm used by this method.
   *
   * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
   *
   * @param {string | null} namespaceURI
   * @returns {string | null}
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
   * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
   * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
   * @see https://github.com/xmldom/xmldom/issues/322
   */
  lookupPrefix: function(e) {
    for (var t = this; t; ) {
      var n = t._nsMap;
      if (n) {
        for (var r in n)
          if (Object.prototype.hasOwnProperty.call(n, r) && n[r] === e)
            return r;
      }
      t = t.nodeType == Or ? t.ownerDocument : t.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function(e) {
    for (var t = this; t; ) {
      var n = t._nsMap;
      if (n && Object.prototype.hasOwnProperty.call(n, e))
        return n[e];
      t = t.nodeType == Or ? t.ownerDocument : t.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function(e) {
    var t = this.lookupPrefix(e);
    return t == null;
  }
};
function Jg(e) {
  return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == '"' && "&quot;" || "&#" + e.charCodeAt() + ";";
}
iu(pt, ge);
iu(pt, ge.prototype);
function Ni(e, t) {
  if (t(e))
    return !0;
  if (e = e.firstChild)
    do
      if (Ni(e, t))
        return !0;
    while (e = e.nextSibling);
}
function uu() {
  this.ownerDocument = this;
}
function H_(e, t, n) {
  e && e._inc++;
  var r = n.namespaceURI;
  r === Ii.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
}
function eb(e, t, n, r) {
  e && e._inc++;
  var i = n.namespaceURI;
  i === Ii.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
}
function Qf(e, t, n) {
  if (e && e._inc) {
    e._inc++;
    var r = t.childNodes;
    if (n)
      r[r.length++] = n;
    else {
      for (var i = t.firstChild, u = 0; i; )
        r[u++] = i, i = i.nextSibling;
      r.length = u, delete r[r.length];
    }
  }
}
function tb(e, t) {
  var n = t.previousSibling, r = t.nextSibling;
  return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, t.parentNode = null, t.previousSibling = null, t.nextSibling = null, Qf(e.ownerDocument, e), t;
}
function X_(e) {
  return e && (e.nodeType === ge.DOCUMENT_NODE || e.nodeType === ge.DOCUMENT_FRAGMENT_NODE || e.nodeType === ge.ELEMENT_NODE);
}
function Z_(e) {
  return e && (Qt(e) || Jf(e) || bn(e) || e.nodeType === ge.DOCUMENT_FRAGMENT_NODE || e.nodeType === ge.COMMENT_NODE || e.nodeType === ge.PROCESSING_INSTRUCTION_NODE);
}
function bn(e) {
  return e && e.nodeType === ge.DOCUMENT_TYPE_NODE;
}
function Qt(e) {
  return e && e.nodeType === ge.ELEMENT_NODE;
}
function Jf(e) {
  return e && e.nodeType === ge.TEXT_NODE;
}
function a0(e, t) {
  var n = e.childNodes || [];
  if (Kt(n, Qt) || bn(t))
    return !1;
  var r = Kt(n, bn);
  return !(t && r && n.indexOf(r) > n.indexOf(t));
}
function o0(e, t) {
  var n = e.childNodes || [];
  function r(u) {
    return Qt(u) && u !== t;
  }
  if (Kt(n, r))
    return !1;
  var i = Kt(n, bn);
  return !(t && i && n.indexOf(i) > n.indexOf(t));
}
function V_(e, t, n) {
  if (!X_(e))
    throw new Ie(ot, "Unexpected parent node type " + e.nodeType);
  if (n && n.parentNode !== e)
    throw new Ie(Yg, "child not in parent");
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !Z_(t) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    bn(t) && e.nodeType !== ge.DOCUMENT_NODE
  )
    throw new Ie(
      ot,
      "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType
    );
}
function G_(e, t, n) {
  var r = e.childNodes || [], i = t.childNodes || [];
  if (t.nodeType === ge.DOCUMENT_FRAGMENT_NODE) {
    var u = i.filter(Qt);
    if (u.length > 1 || Kt(i, Jf))
      throw new Ie(ot, "More than one element or text in fragment");
    if (u.length === 1 && !a0(e, n))
      throw new Ie(ot, "Element in fragment can not be inserted before doctype");
  }
  if (Qt(t) && !a0(e, n))
    throw new Ie(ot, "Only one element can be added and only after doctype");
  if (bn(t)) {
    if (Kt(r, bn))
      throw new Ie(ot, "Only one doctype is allowed");
    var a = Kt(r, Qt);
    if (n && r.indexOf(a) < r.indexOf(n))
      throw new Ie(ot, "Doctype can only be inserted before an element");
    if (!n && a)
      throw new Ie(ot, "Doctype can not be appended since element is present");
  }
}
function nb(e, t, n) {
  var r = e.childNodes || [], i = t.childNodes || [];
  if (t.nodeType === ge.DOCUMENT_FRAGMENT_NODE) {
    var u = i.filter(Qt);
    if (u.length > 1 || Kt(i, Jf))
      throw new Ie(ot, "More than one element or text in fragment");
    if (u.length === 1 && !o0(e, n))
      throw new Ie(ot, "Element in fragment can not be inserted before doctype");
  }
  if (Qt(t) && !o0(e, n))
    throw new Ie(ot, "Only one element can be added and only after doctype");
  if (bn(t)) {
    if (Kt(r, function(c) {
      return bn(c) && c !== n;
    }))
      throw new Ie(ot, "Only one doctype is allowed");
    var a = Kt(r, Qt);
    if (n && r.indexOf(a) < r.indexOf(n))
      throw new Ie(ot, "Doctype can only be inserted before an element");
  }
}
function na(e, t, n, r) {
  V_(e, t, n), e.nodeType === ge.DOCUMENT_NODE && (r || G_)(e, t, n);
  var i = t.parentNode;
  if (i && i.removeChild(t), t.nodeType === gn) {
    var u = t.firstChild;
    if (u == null)
      return t;
    var a = t.lastChild;
  } else
    u = a = t;
  var o = n ? n.previousSibling : e.lastChild;
  u.previousSibling = o, a.nextSibling = n, o ? o.nextSibling = u : e.firstChild = u, n == null ? e.lastChild = a : n.previousSibling = a;
  do
    u.parentNode = e;
  while (u !== a && (u = u.nextSibling));
  return Qf(e.ownerDocument || e, e), t.nodeType == gn && (t.firstChild = t.lastChild = null), t;
}
function Y_(e, t) {
  return t.parentNode && t.parentNode.removeChild(t), t.parentNode = e, t.previousSibling = e.lastChild, t.nextSibling = null, t.previousSibling ? t.previousSibling.nextSibling = t : e.firstChild = t, e.lastChild = t, Qf(e.ownerDocument, e, t), t;
}
uu.prototype = {
  //implementation : null,
  nodeName: "#document",
  nodeType: Vg,
  /**
   * The DocumentType node of the document.
   *
   * @readonly
   * @type DocumentType
   */
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function(e, t) {
    if (e.nodeType == gn) {
      for (var n = e.firstChild; n; ) {
        var r = n.nextSibling;
        this.insertBefore(n, t), n = r;
      }
      return e;
    }
    return na(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === Ot && (this.documentElement = e), e;
  },
  removeChild: function(e) {
    return this.documentElement == e && (this.documentElement = null), tb(this, e);
  },
  replaceChild: function(e, t) {
    na(this, e, t, nb), e.ownerDocument = this, t && this.removeChild(t), Qt(e) && (this.documentElement = e);
  },
  // Introduced in DOM Level 2:
  importNode: function(e, t) {
    return ob(this, e, t);
  },
  // Introduced in DOM Level 2:
  getElementById: function(e) {
    var t = null;
    return Ni(this.documentElement, function(n) {
      if (n.nodeType == Ot && n.getAttribute("id") == e)
        return t = n, !0;
    }), t;
  },
  /**
   * The `getElementsByClassName` method of `Document` interface returns an array-like object
   * of all child elements which have **all** of the given class name(s).
   *
   * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
   *
   *
   * Warning: This is a live LiveNodeList.
   * Changes in the DOM will reflect in the array as the changes occur.
   * If an element selected by this array no longer qualifies for the selector,
   * it will automatically be removed. Be aware of this for iteration purposes.
   *
   * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
   * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
   */
  getElementsByClassName: function(e) {
    var t = n0(e);
    return new Lr(this, function(n) {
      var r = [];
      return t.length > 0 && Ni(n.documentElement, function(i) {
        if (i !== n && i.nodeType === Ot) {
          var u = i.getAttribute("class");
          if (u) {
            var a = e === u;
            if (!a) {
              var o = n0(u);
              a = t.every(z_(o));
            }
            a && r.push(i);
          }
        }
      }), r;
    });
  },
  //document factory method:
  createElement: function(e) {
    var t = new ir();
    t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new hn();
    var n = t.attributes = new ta();
    return n._ownerElement = t, t;
  },
  createDocumentFragment: function() {
    var e = new qa();
    return e.ownerDocument = this, e.childNodes = new hn(), e;
  },
  createTextNode: function(e) {
    var t = new ed();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createComment: function(e) {
    var t = new td();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createCDATASection: function(e) {
    var t = new nd();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createProcessingInstruction: function(e, t) {
    var n = new id();
    return n.ownerDocument = this, n.tagName = n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
  },
  createAttribute: function(e) {
    var t = new ra();
    return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
  },
  createEntityReference: function(e) {
    var t = new rd();
    return t.ownerDocument = this, t.nodeName = e, t;
  },
  // Introduced in DOM Level 2:
  createElementNS: function(e, t) {
    var n = new ir(), r = t.split(":"), i = n.attributes = new ta();
    return n.childNodes = new hn(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, i._ownerElement = n, n;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function(e, t) {
    var n = new ra(), r = t.split(":");
    return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n;
  }
};
ht(uu, ge);
function ir() {
  this._nsMap = {};
}
ir.prototype = {
  nodeType: Ot,
  hasAttribute: function(e) {
    return this.getAttributeNode(e) != null;
  },
  getAttribute: function(e) {
    var t = this.getAttributeNode(e);
    return t && t.value || "";
  },
  getAttributeNode: function(e) {
    return this.attributes.getNamedItem(e);
  },
  setAttribute: function(e, t) {
    var n = this.ownerDocument.createAttribute(e);
    n.value = n.nodeValue = "" + t, this.setAttributeNode(n);
  },
  removeAttribute: function(e) {
    var t = this.getAttributeNode(e);
    t && this.removeAttributeNode(t);
  },
  //four real opeartion method
  appendChild: function(e) {
    return e.nodeType === gn ? this.insertBefore(e, null) : Y_(this, e);
  },
  setAttributeNode: function(e) {
    return this.attributes.setNamedItem(e);
  },
  setAttributeNodeNS: function(e) {
    return this.attributes.setNamedItemNS(e);
  },
  removeAttributeNode: function(e) {
    return this.attributes.removeNamedItem(e.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function(e, t) {
    var n = this.getAttributeNodeNS(e, t);
    n && this.removeAttributeNode(n);
  },
  hasAttributeNS: function(e, t) {
    return this.getAttributeNodeNS(e, t) != null;
  },
  getAttributeNS: function(e, t) {
    var n = this.getAttributeNodeNS(e, t);
    return n && n.value || "";
  },
  setAttributeNS: function(e, t, n) {
    var r = this.ownerDocument.createAttributeNS(e, t);
    r.value = r.nodeValue = "" + n, this.setAttributeNode(r);
  },
  getAttributeNodeNS: function(e, t) {
    return this.attributes.getNamedItemNS(e, t);
  },
  getElementsByTagName: function(e) {
    return new Lr(this, function(t) {
      var n = [];
      return Ni(t, function(r) {
        r !== t && r.nodeType == Ot && (e === "*" || r.tagName == e) && n.push(r);
      }), n;
    });
  },
  getElementsByTagNameNS: function(e, t) {
    return new Lr(this, function(n) {
      var r = [];
      return Ni(n, function(i) {
        i !== n && i.nodeType === Ot && (e === "*" || i.namespaceURI === e) && (t === "*" || i.localName == t) && r.push(i);
      }), r;
    });
  }
};
uu.prototype.getElementsByTagName = ir.prototype.getElementsByTagName;
uu.prototype.getElementsByTagNameNS = ir.prototype.getElementsByTagNameNS;
ht(ir, ge);
function ra() {
}
ra.prototype.nodeType = Or;
ht(ra, ge);
function au() {
}
au.prototype = {
  data: "",
  substringData: function(e, t) {
    return this.data.substring(e, e + t);
  },
  appendData: function(e) {
    e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
  },
  insertData: function(e, t) {
    this.replaceData(e, 0, t);
  },
  appendChild: function(e) {
    throw new Error($e[ot]);
  },
  deleteData: function(e, t) {
    this.replaceData(e, t, "");
  },
  replaceData: function(e, t, n) {
    var r = this.data.substring(0, e), i = this.data.substring(e + t);
    n = r + n + i, this.nodeValue = this.data = n, this.length = n.length;
  }
};
ht(au, ge);
function ed() {
}
ed.prototype = {
  nodeName: "#text",
  nodeType: ea,
  splitText: function(e) {
    var t = this.data, n = t.substring(e);
    t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
    var r = this.ownerDocument.createTextNode(n);
    return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
  }
};
ht(ed, au);
function td() {
}
td.prototype = {
  nodeName: "#comment",
  nodeType: Zg
};
ht(td, au);
function nd() {
}
nd.prototype = {
  nodeName: "#cdata-section",
  nodeType: jg
};
ht(nd, au);
function Pa() {
}
Pa.prototype.nodeType = Gg;
ht(Pa, ge);
function rb() {
}
rb.prototype.nodeType = j_;
ht(rb, ge);
function ib() {
}
ib.prototype.nodeType = $_;
ht(ib, ge);
function rd() {
}
rd.prototype.nodeType = Hg;
ht(rd, ge);
function qa() {
}
qa.prototype.nodeName = "#document-fragment";
qa.prototype.nodeType = gn;
ht(qa, ge);
function id() {
}
id.prototype.nodeType = Xg;
ht(id, ge);
function ub() {
}
ub.prototype.serializeToString = function(e, t, n) {
  return ab.call(e, t, n);
};
ge.prototype.toString = ab;
function ab(e, t) {
  var n = [], r = this.nodeType == 9 && this.documentElement || this, i = r.prefix, u = r.namespaceURI;
  if (u && i == null) {
    var i = r.lookupPrefix(u);
    if (i == null)
      var a = [
        { namespace: u, prefix: null }
        //{namespace:uri,prefix:''}
      ];
  }
  return Ur(this, n, e, t, a), n.join("");
}
function c0(e, t, n) {
  var r = e.prefix || "", i = e.namespaceURI;
  if (!i || r === "xml" && i === Ii.XML || i === Ii.XMLNS)
    return !1;
  for (var u = n.length; u--; ) {
    var a = n[u];
    if (a.prefix === r)
      return a.namespace !== i;
  }
  return !0;
}
function Oc(e, t, n) {
  e.push(" ", t, '="', n.replace(/[<>&"\t\n\r]/g, Jg), '"');
}
function Ur(e, t, n, r, i) {
  if (i || (i = []), r)
    if (e = r(e), e) {
      if (typeof e == "string") {
        t.push(e);
        return;
      }
    } else
      return;
  switch (e.nodeType) {
    case Ot:
      var u = e.attributes, a = u.length, h = e.firstChild, o = e.tagName;
      n = Ii.isHTML(e.namespaceURI) || n;
      var c = o;
      if (!n && !e.prefix && e.namespaceURI) {
        for (var s, f = 0; f < u.length; f++)
          if (u.item(f).name === "xmlns") {
            s = u.item(f).value;
            break;
          }
        if (!s)
          for (var m = i.length - 1; m >= 0; m--) {
            var b = i[m];
            if (b.prefix === "" && b.namespace === e.namespaceURI) {
              s = b.namespace;
              break;
            }
          }
        if (s !== e.namespaceURI)
          for (var m = i.length - 1; m >= 0; m--) {
            var b = i[m];
            if (b.namespace === e.namespaceURI) {
              b.prefix && (c = b.prefix + ":" + o);
              break;
            }
          }
      }
      t.push("<", c);
      for (var p = 0; p < a; p++) {
        var l = u.item(p);
        l.prefix == "xmlns" ? i.push({ prefix: l.localName, namespace: l.value }) : l.nodeName == "xmlns" && i.push({ prefix: "", namespace: l.value });
      }
      for (var p = 0; p < a; p++) {
        var l = u.item(p);
        if (c0(l, n, i)) {
          var g = l.prefix || "", D = l.namespaceURI;
          Oc(t, g ? "xmlns:" + g : "xmlns", D), i.push({ prefix: g, namespace: D });
        }
        Ur(l, t, n, r, i);
      }
      if (o === c && c0(e, n, i)) {
        var g = e.prefix || "", D = e.namespaceURI;
        Oc(t, g ? "xmlns:" + g : "xmlns", D), i.push({ prefix: g, namespace: D });
      }
      if (h || n && !/^(?:meta|link|img|br|hr|input)$/i.test(o)) {
        if (t.push(">"), n && /^script$/i.test(o))
          for (; h; )
            h.data ? t.push(h.data) : Ur(h, t, n, r, i.slice()), h = h.nextSibling;
        else
          for (; h; )
            Ur(h, t, n, r, i.slice()), h = h.nextSibling;
        t.push("</", c, ">");
      } else
        t.push("/>");
      return;
    case Vg:
    case gn:
      for (var h = e.firstChild; h; )
        Ur(h, t, n, r, i.slice()), h = h.nextSibling;
      return;
    case Or:
      return Oc(t, e.name, e.value);
    case ea:
      return t.push(
        e.data.replace(/[<&>]/g, Jg)
      );
    case jg:
      return t.push("<![CDATA[", e.data, "]]>");
    case Zg:
      return t.push("<!--", e.data, "-->");
    case Gg:
      var d = e.publicId, y = e.systemId;
      if (t.push("<!DOCTYPE ", e.name), d)
        t.push(" PUBLIC ", d), y && y != "." && t.push(" ", y), t.push(">");
      else if (y && y != ".")
        t.push(" SYSTEM ", y, ">");
      else {
        var x = e.internalSubset;
        x && t.push(" [", x, "]"), t.push(">");
      }
      return;
    case Xg:
      return t.push("<?", e.target, " ", e.data, "?>");
    case Hg:
      return t.push("&", e.nodeName, ";");
    default:
      t.push("??", e.nodeName);
  }
}
function ob(e, t, n) {
  var r;
  switch (t.nodeType) {
    case Ot:
      r = t.cloneNode(!1), r.ownerDocument = e;
    case gn:
      break;
    case Or:
      n = !0;
      break;
  }
  if (r || (r = t.cloneNode(!1)), r.ownerDocument = e, r.parentNode = null, n)
    for (var i = t.firstChild; i; )
      r.appendChild(ob(e, i, n)), i = i.nextSibling;
  return r;
}
function Bs(e, t, n) {
  var r = new t.constructor();
  for (var i in t)
    if (Object.prototype.hasOwnProperty.call(t, i)) {
      var u = t[i];
      typeof u != "object" && u != r[i] && (r[i] = u);
    }
  switch (t.childNodes && (r.childNodes = new hn()), r.ownerDocument = e, r.nodeType) {
    case Ot:
      var a = t.attributes, o = r.attributes = new ta(), c = a.length;
      o._ownerElement = r;
      for (var s = 0; s < c; s++)
        r.setAttributeNode(Bs(e, a.item(s), !0));
      break;
    case Or:
      n = !0;
  }
  if (n)
    for (var f = t.firstChild; f; )
      r.appendChild(Bs(e, f, n)), f = f.nextSibling;
  return r;
}
function cb(e, t, n) {
  e[t] = n;
}
try {
  if (Object.defineProperty) {
    let e = function(t) {
      switch (t.nodeType) {
        case Ot:
        case gn:
          var n = [];
          for (t = t.firstChild; t; )
            t.nodeType !== 7 && t.nodeType !== 8 && n.push(e(t)), t = t.nextSibling;
          return n.join("");
        default:
          return t.nodeValue;
      }
    };
    Object.defineProperty(Lr.prototype, "length", {
      get: function() {
        return Kf(this), this.$$length;
      }
    }), Object.defineProperty(ge.prototype, "textContent", {
      get: function() {
        return e(this);
      },
      set: function(t) {
        switch (this.nodeType) {
          case Ot:
          case gn:
            for (; this.firstChild; )
              this.removeChild(this.firstChild);
            (t || String(t)) && this.appendChild(this.ownerDocument.createTextNode(t));
            break;
          default:
            this.data = t, this.value = t, this.nodeValue = t;
        }
      }
    }), cb = function(t, n, r) {
      t["$$" + n] = r;
    };
  }
} catch {
}
tn.DocumentType = Pa;
tn.DOMException = Ie;
tn.DOMImplementation = Qg;
tn.Element = ir;
tn.Node = ge;
tn.NodeList = hn;
tn.XMLSerializer = ub;
var za = {}, sb = {};
(function(e) {
  var t = Dn.freeze;
  e.XML_ENTITIES = t({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  }), e.HTML_ENTITIES = t({
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    AMP: "&",
    amp: "&",
    And: "⩓",
    and: "∧",
    andand: "⩕",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsd: "∡",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    ap: "≈",
    apacir: "⩯",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    Barwed: "⌆",
    barwed: "⌅",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    Because: "∵",
    because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxDL: "╗",
    boxDl: "╖",
    boxdL: "╕",
    boxdl: "┐",
    boxDR: "╔",
    boxDr: "╓",
    boxdR: "╒",
    boxdr: "┌",
    boxH: "═",
    boxh: "─",
    boxHD: "╦",
    boxHd: "╤",
    boxhD: "╥",
    boxhd: "┬",
    boxHU: "╩",
    boxHu: "╧",
    boxhU: "╨",
    boxhu: "┴",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxUL: "╝",
    boxUl: "╜",
    boxuL: "╛",
    boxul: "┘",
    boxUR: "╚",
    boxUr: "╙",
    boxuR: "╘",
    boxur: "└",
    boxV: "║",
    boxv: "│",
    boxVH: "╬",
    boxVh: "╫",
    boxvH: "╪",
    boxvh: "┼",
    boxVL: "╣",
    boxVl: "╢",
    boxvL: "╡",
    boxvl: "┤",
    boxVR: "╠",
    boxVr: "╟",
    boxvR: "╞",
    boxvr: "├",
    bprime: "‵",
    Breve: "˘",
    breve: "˘",
    brvbar: "¦",
    Bscr: "ℬ",
    bscr: "𝒷",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsol: "\\",
    bsolb: "⧅",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    Cap: "⋒",
    cap: "∩",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    CenterDot: "·",
    centerdot: "·",
    Cfr: "ℭ",
    cfr: "𝔠",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    cir: "○",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    Colon: "∷",
    colon: ":",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    Conint: "∯",
    conint: "∮",
    ContourIntegral: "∮",
    Copf: "ℂ",
    copf: "𝕔",
    coprod: "∐",
    Coproduct: "∐",
    COPY: "©",
    copy: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    Cross: "⨯",
    cross: "✗",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    Cup: "⋓",
    cup: "∪",
    cupbrcap: "⩈",
    CupCap: "≍",
    cupcap: "⩆",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    Dagger: "‡",
    dagger: "†",
    daleth: "ℸ",
    Darr: "↡",
    dArr: "⇓",
    darr: "↓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    DD: "ⅅ",
    dd: "ⅆ",
    ddagger: "‡",
    ddarr: "⇊",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    Diamond: "⋄",
    diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrow: "↓",
    Downarrow: "⇓",
    downarrow: "↓",
    DownArrowBar: "⤓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVector: "↽",
    DownLeftVectorBar: "⥖",
    DownRightTeeVector: "⥟",
    DownRightVector: "⇁",
    DownRightVectorBar: "⥗",
    DownTee: "⊤",
    DownTeeArrow: "↧",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    ecir: "≖",
    Ecirc: "Ê",
    ecirc: "ê",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    eDot: "≑",
    edot: "ė",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp: " ",
    emsp13: " ",
    emsp14: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    Escr: "ℰ",
    escr: "ℯ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    ExponentialE: "ⅇ",
    exponentiale: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    ForAll: "∀",
    forall: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    Fscr: "ℱ",
    fscr: "𝒻",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    gE: "≧",
    ge: "≥",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    ges: "⩾",
    gescc: "⪩",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    Gg: "⋙",
    gg: "≫",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gl: "≷",
    gla: "⪥",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gnE: "≩",
    gne: "⪈",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    Gt: "≫",
    GT: ">",
    gt: ">",
    gtcc: "⪧",
    gtcir: "⩺",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    hArr: "⇔",
    harr: "↔",
    harrcir: "⥈",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    Hfr: "ℌ",
    hfr: "𝔥",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    Hopf: "ℍ",
    hopf: "𝕙",
    horbar: "―",
    HorizontalLine: "─",
    Hscr: "ℋ",
    hscr: "𝒽",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    Ifr: "ℑ",
    ifr: "𝔦",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Im: "ℑ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    in: "∈",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    Int: "∬",
    int: "∫",
    intcal: "⊺",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    Iscr: "ℐ",
    iscr: "𝒾",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    Lang: "⟪",
    lang: "⟨",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    Larr: "↞",
    lArr: "⇐",
    larr: "←",
    larrb: "⇤",
    larrbfs: "⤟",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    lat: "⪫",
    lAtail: "⤛",
    latail: "⤙",
    late: "⪭",
    lates: "⪭︀",
    lBarr: "⤎",
    lbarr: "⤌",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    lE: "≦",
    le: "≤",
    LeftAngleBracket: "⟨",
    LeftArrow: "←",
    Leftarrow: "⇐",
    leftarrow: "←",
    LeftArrowBar: "⇤",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVector: "⇃",
    LeftDownVectorBar: "⥙",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrow: "↔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTee: "⊣",
    LeftTeeArrow: "↤",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangle: "⊲",
    LeftTriangleBar: "⧏",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVector: "↿",
    LeftUpVectorBar: "⥘",
    LeftVector: "↼",
    LeftVectorBar: "⥒",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    les: "⩽",
    lescc: "⪨",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    Ll: "⋘",
    ll: "≪",
    llarr: "⇇",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoust: "⎰",
    lmoustache: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lnE: "≨",
    lne: "⪇",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftarrow: "⟵",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longleftrightarrow: "⟷",
    longmapsto: "⟼",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    longrightarrow: "⟶",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    Lscr: "ℒ",
    lscr: "𝓁",
    Lsh: "↰",
    lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    Lt: "≪",
    LT: "<",
    lt: "<",
    ltcc: "⪦",
    ltcir: "⩹",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    mid: "∣",
    midast: "*",
    midcir: "⫰",
    middot: "·",
    minus: "−",
    minusb: "⊟",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    Mscr: "ℳ",
    mscr: "𝓂",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natur: "♮",
    natural: "♮",
    naturals: "ℕ",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    ne: "≠",
    nearhk: "⤤",
    neArr: "⇗",
    nearr: "↗",
    nearrow: "↗",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: `
`,
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nhArr: "⇎",
    nharr: "↮",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlArr: "⇍",
    nlarr: "↚",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nLeftarrow: "⇍",
    nleftarrow: "↚",
    nLeftrightarrow: "⇎",
    nleftrightarrow: "↮",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    Nopf: "ℕ",
    nopf: "𝕟",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangle: "⋪",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangle: "⋫",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    npar: "∦",
    nparallel: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    npre: "⪯̸",
    nprec: "⊀",
    npreceq: "⪯̸",
    nrArr: "⇏",
    nrarr: "↛",
    nrarrc: "⤳̸",
    nrarrw: "↝̸",
    nRightarrow: "⇏",
    nrightarrow: "↛",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nVDash: "⊯",
    nVdash: "⊮",
    nvDash: "⊭",
    nvdash: "⊬",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwArr: "⇖",
    nwarr: "↖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    ocir: "⊚",
    Ocirc: "Ô",
    ocirc: "ô",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    Or: "⩔",
    or: "∨",
    orarr: "↻",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    Otimes: "⨷",
    otimes: "⊗",
    otimesas: "⨶",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    par: "∥",
    para: "¶",
    parallel: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plus: "+",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    Popf: "ℙ",
    popf: "𝕡",
    pound: "£",
    Pr: "⪻",
    pr: "≺",
    prap: "⪷",
    prcue: "≼",
    prE: "⪳",
    pre: "⪯",
    prec: "≺",
    precapprox: "⪷",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    precsim: "≾",
    Prime: "″",
    prime: "′",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportion: "∷",
    Proportional: "∝",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    Qopf: "ℚ",
    qopf: "𝕢",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    QUOT: '"',
    quot: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    Rang: "⟫",
    rang: "⟩",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    Rarr: "↠",
    rArr: "⇒",
    rarr: "→",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    rAtail: "⤜",
    ratail: "⤚",
    ratio: "∶",
    rationals: "ℚ",
    RBarr: "⤐",
    rBarr: "⤏",
    rbarr: "⤍",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    Re: "ℜ",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    rect: "▭",
    REG: "®",
    reg: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    Rfr: "ℜ",
    rfr: "𝔯",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrow: "→",
    Rightarrow: "⇒",
    rightarrow: "→",
    RightArrowBar: "⇥",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVector: "⇂",
    RightDownVectorBar: "⥕",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTee: "⊢",
    RightTeeArrow: "↦",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangle: "⊳",
    RightTriangleBar: "⧐",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVector: "↾",
    RightUpVectorBar: "⥔",
    RightVector: "⇀",
    RightVectorBar: "⥓",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoust: "⎱",
    rmoustache: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    Ropf: "ℝ",
    ropf: "𝕣",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    Rscr: "ℛ",
    rscr: "𝓇",
    Rsh: "↱",
    rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    Sc: "⪼",
    sc: "≻",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    sccue: "≽",
    scE: "⪴",
    sce: "⪰",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdot: "⋅",
    sdotb: "⊡",
    sdote: "⩦",
    searhk: "⤥",
    seArr: "⇘",
    searr: "↘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    sol: "/",
    solb: "⧄",
    solbar: "⌿",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    squ: "□",
    Square: "□",
    square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    Sub: "⋐",
    sub: "⊂",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    Subset: "⋐",
    subset: "⊂",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succ: "≻",
    succapprox: "⪸",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    Sum: "∑",
    sum: "∑",
    sung: "♪",
    Sup: "⋑",
    sup: "⊃",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    Supset: "⋑",
    supset: "⊃",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swArr: "⇙",
    swarr: "↙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "	",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    Therefore: "∴",
    therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    thinsp: " ",
    ThinSpace: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    Tilde: "∼",
    tilde: "˜",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    times: "×",
    timesb: "⊠",
    timesbar: "⨱",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    top: "⊤",
    topbot: "⌶",
    topcir: "⫱",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    TRADE: "™",
    trade: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    Uarr: "↟",
    uArr: "⇑",
    uarr: "↑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrow: "↑",
    Uparrow: "⇑",
    uparrow: "↑",
    UpArrowBar: "⤒",
    UpArrowDownArrow: "⇅",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    updownarrow: "↕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    Upsi: "ϒ",
    upsi: "υ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTee: "⊥",
    UpTeeArrow: "↥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    vArr: "⇕",
    varr: "↕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    Vbar: "⫫",
    vBar: "⫨",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    VDash: "⊫",
    Vdash: "⊩",
    vDash: "⊨",
    vdash: "⊢",
    Vdashl: "⫦",
    Vee: "⋁",
    vee: "∨",
    veebar: "⊻",
    veeeq: "≚",
    vellip: "⋮",
    Verbar: "‖",
    verbar: "|",
    Vert: "‖",
    vert: "|",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    Wedge: "⋀",
    wedge: "∧",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xhArr: "⟺",
    xharr: "⟷",
    Xi: "Ξ",
    xi: "ξ",
    xlArr: "⟸",
    xlarr: "⟵",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrArr: "⟹",
    xrarr: "⟶",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    Yuml: "Ÿ",
    yuml: "ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    Zfr: "ℨ",
    zfr: "𝔷",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    Zopf: "ℤ",
    zopf: "𝕫",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "‍",
    zwnj: "‌"
  }), e.entityMap = e.HTML_ENTITIES;
})(sb);
var ud = {}, Ri = Dn.NAMESPACE, Is = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, s0 = new RegExp("[\\-\\.0-9" + Is.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), f0 = new RegExp("^" + Is.source + s0.source + "*(?::" + Is.source + s0.source + "*)?$"), ai = 0, En = 1, mr = 2, oi = 3, yr = 4, Dr = 5, ci = 6, Au = 7;
function Wr(e, t) {
  this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, Wr);
}
Wr.prototype = new Error();
Wr.prototype.name = Wr.name;
function fb() {
}
fb.prototype = {
  parse: function(e, t, n) {
    var r = this.domBuilder;
    r.startDocument(), db(t, t = {}), K_(
      e,
      t,
      n,
      r,
      this.errorHandler
    ), r.endDocument();
  }
};
function K_(e, t, n, r, i) {
  function u(C) {
    if (C > 65535) {
      C -= 65536;
      var U = 55296 + (C >> 10), E = 56320 + (C & 1023);
      return String.fromCharCode(U, E);
    } else
      return String.fromCharCode(C);
  }
  function a(C) {
    var U = C.slice(1, -1);
    return Object.hasOwnProperty.call(n, U) ? n[U] : U.charAt(0) === "#" ? u(parseInt(U.substr(1).replace("x", "0x"))) : (i.error("entity not found:" + C), C);
  }
  function o(C) {
    if (C > g) {
      var U = e.substring(g, C).replace(/&#?\w+;/g, a);
      b && c(g), r.characters(U, 0, C - g), g = C;
    }
  }
  function c(C, U) {
    for (; C >= f && (U = m.exec(e)); )
      s = U.index, f = s + U[0].length, b.lineNumber++;
    b.columnNumber = C - s + 1;
  }
  for (var s = 0, f = 0, m = /.*(?:\r\n?|\n)|.*$/g, b = r.locator, p = [{ currentNSMap: t }], l = {}, g = 0; ; ) {
    try {
      var D = e.indexOf("<", g);
      if (D < 0) {
        if (!e.substr(g).match(/^\s*$/)) {
          var h = r.doc, d = h.createTextNode(e.substr(g));
          h.appendChild(d), r.currentElement = d;
        }
        return;
      }
      switch (D > g && o(D), e.charAt(D + 1)) {
        case "/":
          var L = e.indexOf(">", D + 3), y = e.substring(D + 2, L).replace(/[ \t\n\r]+$/g, ""), x = p.pop();
          L < 0 ? (y = e.substring(D + 2).replace(/[\s<].*/, ""), i.error("end tag name: " + y + " is not complete:" + x.tagName), L = D + 1 + y.length) : y.match(/\s</) && (y = y.replace(/[\s<].*/, ""), i.error("end tag name: " + y + " maybe not complete"), L = D + 1 + y.length);
          var v = x.localNSMap, _ = x.tagName == y, w = _ || x.tagName && x.tagName.toLowerCase() == y.toLowerCase();
          if (w) {
            if (r.endElement(x.uri, x.localName, y), v)
              for (var A in v)
                Object.prototype.hasOwnProperty.call(v, A) && r.endPrefixMapping(A);
            _ || i.fatalError("end tag name: " + y + " is not match the current start tagName:" + x.tagName);
          } else
            p.push(x);
          L++;
          break;
        case "?":
          b && c(D), L = n6(e, D, r);
          break;
        case "!":
          b && c(D), L = t6(e, D, r, i);
          break;
        default:
          b && c(D);
          var B = new lb(), P = p[p.length - 1].currentNSMap, L = Q_(e, D, B, P, a, i), I = B.length;
          if (!B.closed && e6(e, L, B.tagName, l) && (B.closed = !0, n.nbsp || i.warning("unclosed xml attribute")), b && I) {
            for (var z = d0(b, {}), H = 0; H < I; H++) {
              var G = B[H];
              c(G.offset), G.locator = d0(b, {});
            }
            r.locator = z, l0(B, r, P) && p.push(B), r.locator = b;
          } else
            l0(B, r, P) && p.push(B);
          Ri.isHTML(B.uri) && !B.closed ? L = J_(e, L, B.tagName, a, r) : L++;
      }
    } catch (C) {
      if (C instanceof Wr)
        throw C;
      i.error("element parse error: " + C), L = -1;
    }
    L > g ? g = L : o(Math.max(D, g) + 1);
  }
}
function d0(e, t) {
  return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
}
function Q_(e, t, n, r, i, u) {
  function a(b, p, l) {
    n.attributeNames.hasOwnProperty(b) && u.fatalError("Attribute " + b + " redefined"), n.addValue(
      b,
      // @see https://www.w3.org/TR/xml/#AVNormalize
      // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
      // - recursive replacement of (DTD) entity references
      // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
      p.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, i),
      l
    );
  }
  for (var o, c, s = ++t, f = ai; ; ) {
    var m = e.charAt(s);
    switch (m) {
      case "=":
        if (f === En)
          o = e.slice(t, s), f = oi;
        else if (f === mr)
          f = oi;
        else
          throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (f === oi || f === En)
          if (f === En && (u.warning('attribute value must after "="'), o = e.slice(t, s)), t = s + 1, s = e.indexOf(m, t), s > 0)
            c = e.slice(t, s), a(o, c, t - 1), f = Dr;
          else
            throw new Error("attribute value no end '" + m + "' match");
        else if (f == yr)
          c = e.slice(t, s), a(o, c, t), u.warning('attribute "' + o + '" missed start quot(' + m + ")!!"), t = s + 1, f = Dr;
        else
          throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (f) {
          case ai:
            n.setTagName(e.slice(t, s));
          case Dr:
          case ci:
          case Au:
            f = Au, n.closed = !0;
          case yr:
          case En:
            break;
          case mr:
            n.closed = !0;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        return u.error("unexpected end of input"), f == ai && n.setTagName(e.slice(t, s)), s;
      case ">":
        switch (f) {
          case ai:
            n.setTagName(e.slice(t, s));
          case Dr:
          case ci:
          case Au:
            break;
          case yr:
          case En:
            c = e.slice(t, s), c.slice(-1) === "/" && (n.closed = !0, c = c.slice(0, -1));
          case mr:
            f === mr && (c = o), f == yr ? (u.warning('attribute "' + c + '" missed quot(")!'), a(o, c, t)) : ((!Ri.isHTML(r[""]) || !c.match(/^(?:disabled|checked|selected)$/i)) && u.warning('attribute "' + c + '" missed value!! "' + c + '" instead!!'), a(c, c, t));
            break;
          case oi:
            throw new Error("attribute value missed!!");
        }
        return s;
      case "":
        m = " ";
      default:
        if (m <= " ")
          switch (f) {
            case ai:
              n.setTagName(e.slice(t, s)), f = ci;
              break;
            case En:
              o = e.slice(t, s), f = mr;
              break;
            case yr:
              var c = e.slice(t, s);
              u.warning('attribute "' + c + '" missed quot(")!!'), a(o, c, t);
            case Dr:
              f = ci;
              break;
          }
        else
          switch (f) {
            case mr:
              n.tagName, (!Ri.isHTML(r[""]) || !o.match(/^(?:disabled|checked|selected)$/i)) && u.warning('attribute "' + o + '" missed value!! "' + o + '" instead2!!'), a(o, o, t), t = s, f = En;
              break;
            case Dr:
              u.warning('attribute space is required"' + o + '"!!');
            case ci:
              f = En, t = s;
              break;
            case oi:
              f = yr, t = s;
              break;
            case Au:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
    }
    s++;
  }
}
function l0(e, t, n) {
  for (var r = e.tagName, i = null, m = e.length; m--; ) {
    var u = e[m], a = u.qName, o = u.value, b = a.indexOf(":");
    if (b > 0)
      var c = u.prefix = a.slice(0, b), s = a.slice(b + 1), f = c === "xmlns" && s;
    else
      s = a, c = null, f = a === "xmlns" && "";
    u.localName = s, f !== !1 && (i == null && (i = {}, db(n, n = {})), n[f] = i[f] = o, u.uri = Ri.XMLNS, t.startPrefixMapping(f, o));
  }
  for (var m = e.length; m--; ) {
    u = e[m];
    var c = u.prefix;
    c && (c === "xml" && (u.uri = Ri.XML), c !== "xmlns" && (u.uri = n[c || ""]));
  }
  var b = r.indexOf(":");
  b > 0 ? (c = e.prefix = r.slice(0, b), s = e.localName = r.slice(b + 1)) : (c = null, s = e.localName = r);
  var p = e.uri = n[c || ""];
  if (t.startElement(p, s, r, e), e.closed) {
    if (t.endElement(p, s, r), i)
      for (c in i)
        Object.prototype.hasOwnProperty.call(i, c) && t.endPrefixMapping(c);
  } else
    return e.currentNSMap = n, e.localNSMap = i, !0;
}
function J_(e, t, n, r, i) {
  if (/^(?:script|textarea)$/i.test(n)) {
    var u = e.indexOf("</" + n + ">", t), a = e.substring(t + 1, u);
    if (/[&<]/.test(a))
      return /^script$/i.test(n) ? (i.characters(a, 0, a.length), u) : (a = a.replace(/&#?\w+;/g, r), i.characters(a, 0, a.length), u);
  }
  return t + 1;
}
function e6(e, t, n, r) {
  var i = r[n];
  return i == null && (i = e.lastIndexOf("</" + n + ">"), i < t && (i = e.lastIndexOf("</" + n)), r[n] = i), i < t;
}
function db(e, t) {
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
}
function t6(e, t, n, r) {
  var i = e.charAt(t + 2);
  switch (i) {
    case "-":
      if (e.charAt(t + 3) === "-") {
        var u = e.indexOf("-->", t + 4);
        return u > t ? (n.comment(e, t + 4, u - t - 4), u + 3) : (r.error("Unclosed comment"), -1);
      } else
        return -1;
    default:
      if (e.substr(t + 3, 6) == "CDATA[") {
        var u = e.indexOf("]]>", t + 9);
        return n.startCDATA(), n.characters(e, t + 9, u - t - 9), n.endCDATA(), u + 3;
      }
      var a = r6(e, t), o = a.length;
      if (o > 1 && /!doctype/i.test(a[0][0])) {
        var c = a[1][0], s = !1, f = !1;
        o > 3 && (/^public$/i.test(a[2][0]) ? (s = a[3][0], f = o > 4 && a[4][0]) : /^system$/i.test(a[2][0]) && (f = a[3][0]));
        var m = a[o - 1];
        return n.startDTD(c, s, f), n.endDTD(), m.index + m[0].length;
      }
  }
  return -1;
}
function n6(e, t, n) {
  var r = e.indexOf("?>", t);
  if (r) {
    var i = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    return i ? (i[0].length, n.processingInstruction(i[1], i[2]), r + 2) : -1;
  }
  return -1;
}
function lb() {
  this.attributeNames = {};
}
lb.prototype = {
  setTagName: function(e) {
    if (!f0.test(e))
      throw new Error("invalid tagName:" + e);
    this.tagName = e;
  },
  addValue: function(e, t, n) {
    if (!f0.test(e))
      throw new Error("invalid attribute:" + e);
    this.attributeNames[e] = this.length, this[this.length++] = { qName: e, value: t, offset: n };
  },
  length: 0,
  getLocalName: function(e) {
    return this[e].localName;
  },
  getLocator: function(e) {
    return this[e].locator;
  },
  getQName: function(e) {
    return this[e].qName;
  },
  getURI: function(e) {
    return this[e].uri;
  },
  getValue: function(e) {
    return this[e].value;
  }
  //	,getIndex:function(uri, localName)){
  //		if(localName){
  //
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},
};
function r6(e, t) {
  var n, r = [], i = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  for (i.lastIndex = t, i.exec(e); n = i.exec(e); )
    if (r.push(n), n[1]) return r;
}
ud.XMLReader = fb;
ud.ParseError = Wr;
var i6 = Dn, u6 = tn, h0 = sb, hb = ud, a6 = u6.DOMImplementation, p0 = i6.NAMESPACE, o6 = hb.ParseError, c6 = hb.XMLReader;
function pb(e) {
  return e.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
}
function gb(e) {
  this.options = e || { locator: {} };
}
gb.prototype.parseFromString = function(e, t) {
  var n = this.options, r = new c6(), i = n.domBuilder || new ou(), u = n.errorHandler, a = n.locator, o = n.xmlns || {}, c = /\/x?html?$/.test(t), s = c ? h0.HTML_ENTITIES : h0.XML_ENTITIES;
  a && i.setDocumentLocator(a), r.errorHandler = s6(u, i, a), r.domBuilder = n.domBuilder || i, c && (o[""] = p0.HTML), o.xml = o.xml || p0.XML;
  var f = n.normalizeLineEndings || pb;
  return e && typeof e == "string" ? r.parse(
    f(e),
    o,
    s
  ) : r.errorHandler.error("invalid doc source"), i.doc;
};
function s6(e, t, n) {
  if (!e) {
    if (t instanceof ou)
      return t;
    e = t;
  }
  var r = {}, i = e instanceof Function;
  n = n || {};
  function u(a) {
    var o = e[a];
    !o && i && (o = e.length == 2 ? function(c) {
      e(a, c);
    } : e), r[a] = o && function(c) {
      o("[xmldom " + a + "]	" + c + Ns(n));
    } || function() {
    };
  }
  return u("warning"), u("error"), u("fatalError"), r;
}
function ou() {
  this.cdata = !1;
}
function xr(e, t) {
  t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
}
ou.prototype = {
  startDocument: function() {
    this.doc = new a6().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
  },
  startElement: function(e, t, n, r) {
    var i = this.doc, u = i.createElementNS(e, n || t), a = r.length;
    Fu(this, u), this.currentElement = u, this.locator && xr(this.locator, u);
    for (var o = 0; o < a; o++) {
      var e = r.getURI(o), c = r.getValue(o), n = r.getQName(o), s = i.createAttributeNS(e, n);
      this.locator && xr(r.getLocator(o), s), s.value = s.nodeValue = c, u.setAttributeNode(s);
    }
  },
  endElement: function(e, t, n) {
    var r = this.currentElement;
    r.tagName, this.currentElement = r.parentNode;
  },
  startPrefixMapping: function(e, t) {
  },
  endPrefixMapping: function(e) {
  },
  processingInstruction: function(e, t) {
    var n = this.doc.createProcessingInstruction(e, t);
    this.locator && xr(this.locator, n), Fu(this, n);
  },
  ignorableWhitespace: function(e, t, n) {
  },
  characters: function(e, t, n) {
    if (e = g0.apply(this, arguments), e) {
      if (this.cdata)
        var r = this.doc.createCDATASection(e);
      else
        var r = this.doc.createTextNode(e);
      this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && xr(this.locator, r);
    }
  },
  skippedEntity: function(e) {
  },
  endDocument: function() {
    this.doc.normalize();
  },
  setDocumentLocator: function(e) {
    (this.locator = e) && (e.lineNumber = 0);
  },
  //LexicalHandler
  comment: function(e, t, n) {
    e = g0.apply(this, arguments);
    var r = this.doc.createComment(e);
    this.locator && xr(this.locator, r), Fu(this, r);
  },
  startCDATA: function() {
    this.cdata = !0;
  },
  endCDATA: function() {
    this.cdata = !1;
  },
  startDTD: function(e, t, n) {
    var r = this.doc.implementation;
    if (r && r.createDocumentType) {
      var i = r.createDocumentType(e, t, n);
      this.locator && xr(this.locator, i), Fu(this, i), this.doc.doctype = i;
    }
  },
  /**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(e) {
    console.warn("[xmldom warning]	" + e, Ns(this.locator));
  },
  error: function(e) {
    console.error("[xmldom error]	" + e, Ns(this.locator));
  },
  fatalError: function(e) {
    throw new o6(e, this.locator);
  }
};
function Ns(e) {
  if (e)
    return `
@` + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
}
function g0(e, t, n) {
  return typeof e == "string" ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
  ou.prototype[e] = function() {
    return null;
  };
});
function Fu(e, t) {
  e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
}
za.__DOMHandler = ou;
za.normalizeLineEndings = pb;
za.DOMParser = gb;
var bb = tn;
Ma.DOMImplementation = bb.DOMImplementation;
Ma.XMLSerializer = bb.XMLSerializer;
Ma.DOMParser = za.DOMParser;
var f6 = Ma, d6 = tn;
function l6(e) {
  var t = null, n = new f6.DOMParser({
    errorHandler: function(i, u) {
      t = { level: i, message: u };
    }
  }), r = n.parseFromString(e);
  if (t === null)
    return r;
  throw new Error(t.level + ": " + t.message);
}
Gf.parseFromString = l6;
Gf.Node = d6.Node;
var Lc = je, b0 = Ne, mb = Gf, yb = ei, h6 = yb.Element;
Pg.readString = p6;
var m0 = mb.Node;
function p6(e, t) {
  t = t || {};
  try {
    var n = mb.parseFromString(e, "text/xml");
  } catch (a) {
    return Lc.reject(a);
  }
  if (n.documentElement.tagName === "parsererror")
    return Lc.resolve(new Error(n.documentElement.textContent));
  function r(a) {
    switch (a.nodeType) {
      case m0.ELEMENT_NODE:
        return i(a);
      case m0.TEXT_NODE:
        return yb.text(a.nodeValue);
    }
  }
  function i(a) {
    var o = u(a), c = [];
    b0.forEach(a.childNodes, function(f) {
      var m = r(f);
      m && c.push(m);
    });
    var s = {};
    return b0.forEach(a.attributes, function(f) {
      s[u(f)] = f.value;
    }), new h6(o, s, c);
  }
  function u(a) {
    if (a.namespaceURI) {
      var o = t[a.namespaceURI], c;
      return o ? c = o + ":" : c = "{" + a.namespaceURI + "}", c + a.localName;
    } else
      return a.localName;
  }
  return Lc.resolve(r(n.documentElement));
}
var Db = {}, li = {}, sn = {}, y0;
function jn() {
  return y0 || (y0 = 1, (function() {
    var e, t, n, r, i, u, a, o = [].slice, c = {}.hasOwnProperty;
    e = function() {
      var s, f, m, b, p, l;
      if (l = arguments[0], p = 2 <= arguments.length ? o.call(arguments, 1) : [], i(Object.assign))
        Object.assign.apply(null, arguments);
      else
        for (s = 0, m = p.length; s < m; s++)
          if (b = p[s], b != null)
            for (f in b)
              c.call(b, f) && (l[f] = b[f]);
      return l;
    }, i = function(s) {
      return !!s && Object.prototype.toString.call(s) === "[object Function]";
    }, u = function(s) {
      var f;
      return !!s && ((f = typeof s) == "function" || f === "object");
    }, n = function(s) {
      return i(Array.isArray) ? Array.isArray(s) : Object.prototype.toString.call(s) === "[object Array]";
    }, r = function(s) {
      var f;
      if (n(s))
        return !s.length;
      for (f in s)
        if (c.call(s, f))
          return !1;
      return !0;
    }, a = function(s) {
      var f, m;
      return u(s) && (m = Object.getPrototypeOf(s)) && (f = m.constructor) && typeof f == "function" && f instanceof f && Function.prototype.toString.call(f) === Function.prototype.toString.call(Object);
    }, t = function(s) {
      return i(s.valueOf) ? s.valueOf() : s;
    }, sn.assign = e, sn.isFunction = i, sn.isObject = u, sn.isArray = n, sn.isEmpty = r, sn.isPlainObject = a, sn.getValue = t;
  }).call(re)), sn;
}
var Wc = { exports: {} }, Mc = { exports: {} }, Pc = { exports: {} }, qc = { exports: {} }, D0;
function xb() {
  return D0 || (D0 = 1, (function() {
    qc.exports = function() {
      function e(t, n, r) {
        if (this.options = t.options, this.stringify = t.stringify, this.parent = t, n == null)
          throw new Error("Missing attribute name. " + this.debugInfo(n));
        if (r == null)
          throw new Error("Missing attribute value. " + this.debugInfo(n));
        this.name = this.stringify.attName(n), this.value = this.stringify.attValue(r);
      }
      return e.prototype.clone = function() {
        return Object.create(this);
      }, e.prototype.toString = function(t) {
        return this.options.writer.set(t).attribute(this);
      }, e.prototype.debugInfo = function(t) {
        return t = t || this.name, t == null ? "parent: <" + this.parent.name + ">" : "attribute: {" + t + "}, parent: <" + this.parent.name + ">";
      }, e;
    }();
  }).call(re)), qc.exports;
}
var x0;
function $a() {
  return x0 || (x0 = 1, (function() {
    var e, t, n, r, i, u, a = function(c, s) {
      for (var f in s)
        o.call(s, f) && (c[f] = s[f]);
      function m() {
        this.constructor = c;
      }
      return m.prototype = s.prototype, c.prototype = new m(), c.__super__ = s.prototype, c;
    }, o = {}.hasOwnProperty;
    u = jn(), i = u.isObject, r = u.isFunction, n = u.getValue, t = gt(), e = xb(), Pc.exports = function(c) {
      a(s, c);
      function s(f, m, b) {
        if (s.__super__.constructor.call(this, f), m == null)
          throw new Error("Missing element name. " + this.debugInfo());
        this.name = this.stringify.eleName(m), this.attributes = {}, b != null && this.attribute(b), f.isDocument && (this.isRoot = !0, this.documentObject = f, f.rootObject = this);
      }
      return s.prototype.clone = function() {
        var f, m, b, p;
        b = Object.create(this), b.isRoot && (b.documentObject = null), b.attributes = {}, p = this.attributes;
        for (m in p)
          o.call(p, m) && (f = p[m], b.attributes[m] = f.clone());
        return b.children = [], this.children.forEach(function(l) {
          var g;
          return g = l.clone(), g.parent = b, b.children.push(g);
        }), b;
      }, s.prototype.attribute = function(f, m) {
        var b, p;
        if (f != null && (f = n(f)), i(f))
          for (b in f)
            o.call(f, b) && (p = f[b], this.attribute(b, p));
        else
          r(m) && (m = m.apply()), (!this.options.skipNullAttributes || m != null) && (this.attributes[f] = new e(this, f, m));
        return this;
      }, s.prototype.removeAttribute = function(f) {
        var m, b, p;
        if (f == null)
          throw new Error("Missing attribute name. " + this.debugInfo());
        if (f = n(f), Array.isArray(f))
          for (b = 0, p = f.length; b < p; b++)
            m = f[b], delete this.attributes[m];
        else
          delete this.attributes[f];
        return this;
      }, s.prototype.toString = function(f) {
        return this.options.writer.set(f).element(this);
      }, s.prototype.att = function(f, m) {
        return this.attribute(f, m);
      }, s.prototype.a = function(f, m) {
        return this.attribute(f, m);
      }, s;
    }(t);
  }).call(re)), Pc.exports;
}
var zc = { exports: {} }, v0;
function ja() {
  return v0 || (v0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), zc.exports = function(r) {
      t(i, r);
      function i(u, a) {
        if (i.__super__.constructor.call(this, u), a == null)
          throw new Error("Missing CDATA text. " + this.debugInfo());
        this.text = this.stringify.cdata(a);
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(u) {
        return this.options.writer.set(u).cdata(this);
      }, i;
    }(e);
  }).call(re)), zc.exports;
}
var $c = { exports: {} }, _0;
function Ha() {
  return _0 || (_0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), $c.exports = function(r) {
      t(i, r);
      function i(u, a) {
        if (i.__super__.constructor.call(this, u), a == null)
          throw new Error("Missing comment text. " + this.debugInfo());
        this.text = this.stringify.comment(a);
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(u) {
        return this.options.writer.set(u).comment(this);
      }, i;
    }(e);
  }).call(re)), $c.exports;
}
var jc = { exports: {} }, E0;
function Xa() {
  return E0 || (E0 = 1, (function() {
    var e, t, n = function(i, u) {
      for (var a in u)
        r.call(u, a) && (i[a] = u[a]);
      function o() {
        this.constructor = i;
      }
      return o.prototype = u.prototype, i.prototype = new o(), i.__super__ = u.prototype, i;
    }, r = {}.hasOwnProperty;
    t = jn().isObject, e = gt(), jc.exports = function(i) {
      n(u, i);
      function u(a, o, c, s) {
        var f;
        u.__super__.constructor.call(this, a), t(o) && (f = o, o = f.version, c = f.encoding, s = f.standalone), o || (o = "1.0"), this.version = this.stringify.xmlVersion(o), c != null && (this.encoding = this.stringify.xmlEncoding(c)), s != null && (this.standalone = this.stringify.xmlStandalone(s));
      }
      return u.prototype.toString = function(a) {
        return this.options.writer.set(a).declaration(this);
      }, u;
    }(e);
  }).call(re)), jc.exports;
}
var Hc = { exports: {} }, Xc = { exports: {} }, w0;
function Za() {
  return w0 || (w0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), Xc.exports = function(r) {
      t(i, r);
      function i(u, a, o, c, s, f) {
        if (i.__super__.constructor.call(this, u), a == null)
          throw new Error("Missing DTD element name. " + this.debugInfo());
        if (o == null)
          throw new Error("Missing DTD attribute name. " + this.debugInfo(a));
        if (!c)
          throw new Error("Missing DTD attribute type. " + this.debugInfo(a));
        if (!s)
          throw new Error("Missing DTD attribute default. " + this.debugInfo(a));
        if (s.indexOf("#") !== 0 && (s = "#" + s), !s.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/))
          throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(a));
        if (f && !s.match(/^(#FIXED|#DEFAULT)$/))
          throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(a));
        this.elementName = this.stringify.eleName(a), this.attributeName = this.stringify.attName(o), this.attributeType = this.stringify.dtdAttType(c), this.defaultValue = this.stringify.dtdAttDefault(f), this.defaultValueType = s;
      }
      return i.prototype.toString = function(u) {
        return this.options.writer.set(u).dtdAttList(this);
      }, i;
    }(e);
  }).call(re)), Xc.exports;
}
var Zc = { exports: {} }, U0;
function Va() {
  return U0 || (U0 = 1, (function() {
    var e, t, n = function(i, u) {
      for (var a in u)
        r.call(u, a) && (i[a] = u[a]);
      function o() {
        this.constructor = i;
      }
      return o.prototype = u.prototype, i.prototype = new o(), i.__super__ = u.prototype, i;
    }, r = {}.hasOwnProperty;
    t = jn().isObject, e = gt(), Zc.exports = function(i) {
      n(u, i);
      function u(a, o, c, s) {
        if (u.__super__.constructor.call(this, a), c == null)
          throw new Error("Missing DTD entity name. " + this.debugInfo(c));
        if (s == null)
          throw new Error("Missing DTD entity value. " + this.debugInfo(c));
        if (this.pe = !!o, this.name = this.stringify.eleName(c), !t(s))
          this.value = this.stringify.dtdEntityValue(s);
        else {
          if (!s.pubID && !s.sysID)
            throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(c));
          if (s.pubID && !s.sysID)
            throw new Error("System identifier is required for a public external entity. " + this.debugInfo(c));
          if (s.pubID != null && (this.pubID = this.stringify.dtdPubID(s.pubID)), s.sysID != null && (this.sysID = this.stringify.dtdSysID(s.sysID)), s.nData != null && (this.nData = this.stringify.dtdNData(s.nData)), this.pe && this.nData)
            throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(c));
        }
      }
      return u.prototype.toString = function(a) {
        return this.options.writer.set(a).dtdEntity(this);
      }, u;
    }(e);
  }).call(re)), Zc.exports;
}
var Vc = { exports: {} }, T0;
function Ga() {
  return T0 || (T0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), Vc.exports = function(r) {
      t(i, r);
      function i(u, a, o) {
        if (i.__super__.constructor.call(this, u), a == null)
          throw new Error("Missing DTD element name. " + this.debugInfo());
        o || (o = "(#PCDATA)"), Array.isArray(o) && (o = "(" + o.join(",") + ")"), this.name = this.stringify.eleName(a), this.value = this.stringify.dtdElementValue(o);
      }
      return i.prototype.toString = function(u) {
        return this.options.writer.set(u).dtdElement(this);
      }, i;
    }(e);
  }).call(re)), Vc.exports;
}
var Gc = { exports: {} }, C0;
function Ya() {
  return C0 || (C0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), Gc.exports = function(r) {
      t(i, r);
      function i(u, a, o) {
        if (i.__super__.constructor.call(this, u), a == null)
          throw new Error("Missing DTD notation name. " + this.debugInfo(a));
        if (!o.pubID && !o.sysID)
          throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(a));
        this.name = this.stringify.eleName(a), o.pubID != null && (this.pubID = this.stringify.dtdPubID(o.pubID)), o.sysID != null && (this.sysID = this.stringify.dtdSysID(o.sysID));
      }
      return i.prototype.toString = function(u) {
        return this.options.writer.set(u).dtdNotation(this);
      }, i;
    }(e);
  }).call(re)), Gc.exports;
}
var A0;
function Ka() {
  return A0 || (A0 = 1, (function() {
    var e, t, n, r, i, u, a = function(c, s) {
      for (var f in s)
        o.call(s, f) && (c[f] = s[f]);
      function m() {
        this.constructor = c;
      }
      return m.prototype = s.prototype, c.prototype = new m(), c.__super__ = s.prototype, c;
    }, o = {}.hasOwnProperty;
    u = jn().isObject, i = gt(), e = Za(), n = Va(), t = Ga(), r = Ya(), Hc.exports = function(c) {
      a(s, c);
      function s(f, m, b) {
        var p, l;
        s.__super__.constructor.call(this, f), this.name = "!DOCTYPE", this.documentObject = f, u(m) && (p = m, m = p.pubID, b = p.sysID), b == null && (l = [m, b], b = l[0], m = l[1]), m != null && (this.pubID = this.stringify.dtdPubID(m)), b != null && (this.sysID = this.stringify.dtdSysID(b));
      }
      return s.prototype.element = function(f, m) {
        var b;
        return b = new t(this, f, m), this.children.push(b), this;
      }, s.prototype.attList = function(f, m, b, p, l) {
        var g;
        return g = new e(this, f, m, b, p, l), this.children.push(g), this;
      }, s.prototype.entity = function(f, m) {
        var b;
        return b = new n(this, !1, f, m), this.children.push(b), this;
      }, s.prototype.pEntity = function(f, m) {
        var b;
        return b = new n(this, !0, f, m), this.children.push(b), this;
      }, s.prototype.notation = function(f, m) {
        var b;
        return b = new r(this, f, m), this.children.push(b), this;
      }, s.prototype.toString = function(f) {
        return this.options.writer.set(f).docType(this);
      }, s.prototype.ele = function(f, m) {
        return this.element(f, m);
      }, s.prototype.att = function(f, m, b, p, l) {
        return this.attList(f, m, b, p, l);
      }, s.prototype.ent = function(f, m) {
        return this.entity(f, m);
      }, s.prototype.pent = function(f, m) {
        return this.pEntity(f, m);
      }, s.prototype.not = function(f, m) {
        return this.notation(f, m);
      }, s.prototype.up = function() {
        return this.root() || this.documentObject;
      }, s;
    }(i);
  }).call(re)), Hc.exports;
}
var Yc = { exports: {} }, F0;
function Qa() {
  return F0 || (F0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), Yc.exports = function(r) {
      t(i, r);
      function i(u, a) {
        if (i.__super__.constructor.call(this, u), a == null)
          throw new Error("Missing raw text. " + this.debugInfo());
        this.value = this.stringify.raw(a);
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(u) {
        return this.options.writer.set(u).raw(this);
      }, i;
    }(e);
  }).call(re)), Yc.exports;
}
var Kc = { exports: {} }, k0;
function Ja() {
  return k0 || (k0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), Kc.exports = function(r) {
      t(i, r);
      function i(u, a) {
        if (i.__super__.constructor.call(this, u), a == null)
          throw new Error("Missing element text. " + this.debugInfo());
        this.value = this.stringify.eleText(a);
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(u) {
        return this.options.writer.set(u).text(this);
      }, i;
    }(e);
  }).call(re)), Kc.exports;
}
var Qc = { exports: {} }, S0;
function eo() {
  return S0 || (S0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), Qc.exports = function(r) {
      t(i, r);
      function i(u, a, o) {
        if (i.__super__.constructor.call(this, u), a == null)
          throw new Error("Missing instruction target. " + this.debugInfo());
        this.target = this.stringify.insTarget(a), o && (this.value = this.stringify.insValue(o));
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(u) {
        return this.options.writer.set(u).processingInstruction(this);
      }, i;
    }(e);
  }).call(re)), Qc.exports;
}
var Jc = { exports: {} }, B0;
function ad() {
  return B0 || (B0 = 1, (function() {
    var e, t = function(r, i) {
      for (var u in i)
        n.call(i, u) && (r[u] = i[u]);
      function a() {
        this.constructor = r;
      }
      return a.prototype = i.prototype, r.prototype = new a(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = gt(), Jc.exports = function(r) {
      t(i, r);
      function i(u) {
        i.__super__.constructor.call(this, u), this.isDummy = !0;
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(u) {
        return "";
      }, i;
    }(e);
  }).call(re)), Jc.exports;
}
var I0;
function gt() {
  return I0 || (I0 = 1, (function() {
    var e, t, n, r, i, u, a, o, c, s, f, m, b, p, l = {}.hasOwnProperty;
    p = jn(), b = p.isObject, m = p.isFunction, f = p.isEmpty, s = p.getValue, u = null, e = null, t = null, n = null, r = null, o = null, c = null, a = null, i = null, Mc.exports = function() {
      function g(D) {
        this.parent = D, this.parent && (this.options = this.parent.options, this.stringify = this.parent.stringify), this.children = [], u || (u = $a(), e = ja(), t = Ha(), n = Xa(), r = Ka(), o = Qa(), c = Ja(), a = eo(), i = ad());
      }
      return g.prototype.element = function(D, h, d) {
        var y, x, v, _, w, A, B, P, L, I, z;
        if (A = null, h === null && d == null && (L = [{}, null], h = L[0], d = L[1]), h == null && (h = {}), h = s(h), b(h) || (I = [h, d], d = I[0], h = I[1]), D != null && (D = s(D)), Array.isArray(D))
          for (v = 0, B = D.length; v < B; v++)
            x = D[v], A = this.element(x);
        else if (m(D))
          A = this.element(D.apply());
        else if (b(D)) {
          for (w in D)
            if (l.call(D, w))
              if (z = D[w], m(z) && (z = z.apply()), b(z) && f(z) && (z = null), !this.options.ignoreDecorators && this.stringify.convertAttKey && w.indexOf(this.stringify.convertAttKey) === 0)
                A = this.attribute(w.substr(this.stringify.convertAttKey.length), z);
              else if (!this.options.separateArrayItems && Array.isArray(z))
                for (_ = 0, P = z.length; _ < P; _++)
                  x = z[_], y = {}, y[w] = x, A = this.element(y);
              else b(z) ? (A = this.element(w), A.element(z)) : A = this.element(w, z);
        } else this.options.skipNullNodes && d === null ? A = this.dummy() : !this.options.ignoreDecorators && this.stringify.convertTextKey && D.indexOf(this.stringify.convertTextKey) === 0 ? A = this.text(d) : !this.options.ignoreDecorators && this.stringify.convertCDataKey && D.indexOf(this.stringify.convertCDataKey) === 0 ? A = this.cdata(d) : !this.options.ignoreDecorators && this.stringify.convertCommentKey && D.indexOf(this.stringify.convertCommentKey) === 0 ? A = this.comment(d) : !this.options.ignoreDecorators && this.stringify.convertRawKey && D.indexOf(this.stringify.convertRawKey) === 0 ? A = this.raw(d) : !this.options.ignoreDecorators && this.stringify.convertPIKey && D.indexOf(this.stringify.convertPIKey) === 0 ? A = this.instruction(D.substr(this.stringify.convertPIKey.length), d) : A = this.node(D, h, d);
        if (A == null)
          throw new Error("Could not create any elements with: " + D + ". " + this.debugInfo());
        return A;
      }, g.prototype.insertBefore = function(D, h, d) {
        var y, x, v;
        if (this.isRoot)
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(D));
        return x = this.parent.children.indexOf(this), v = this.parent.children.splice(x), y = this.parent.element(D, h, d), Array.prototype.push.apply(this.parent.children, v), y;
      }, g.prototype.insertAfter = function(D, h, d) {
        var y, x, v;
        if (this.isRoot)
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(D));
        return x = this.parent.children.indexOf(this), v = this.parent.children.splice(x + 1), y = this.parent.element(D, h, d), Array.prototype.push.apply(this.parent.children, v), y;
      }, g.prototype.remove = function() {
        var D;
        if (this.isRoot)
          throw new Error("Cannot remove the root element. " + this.debugInfo());
        return D = this.parent.children.indexOf(this), [].splice.apply(this.parent.children, [D, D - D + 1].concat([])), this.parent;
      }, g.prototype.node = function(D, h, d) {
        var y, x;
        return D != null && (D = s(D)), h || (h = {}), h = s(h), b(h) || (x = [h, d], d = x[0], h = x[1]), y = new u(this, D, h), d != null && y.text(d), this.children.push(y), y;
      }, g.prototype.text = function(D) {
        var h;
        return h = new c(this, D), this.children.push(h), this;
      }, g.prototype.cdata = function(D) {
        var h;
        return h = new e(this, D), this.children.push(h), this;
      }, g.prototype.comment = function(D) {
        var h;
        return h = new t(this, D), this.children.push(h), this;
      }, g.prototype.commentBefore = function(D) {
        var h, d;
        return h = this.parent.children.indexOf(this), d = this.parent.children.splice(h), this.parent.comment(D), Array.prototype.push.apply(this.parent.children, d), this;
      }, g.prototype.commentAfter = function(D) {
        var h, d;
        return h = this.parent.children.indexOf(this), d = this.parent.children.splice(h + 1), this.parent.comment(D), Array.prototype.push.apply(this.parent.children, d), this;
      }, g.prototype.raw = function(D) {
        var h;
        return h = new o(this, D), this.children.push(h), this;
      }, g.prototype.dummy = function() {
        var D;
        return D = new i(this), this.children.push(D), D;
      }, g.prototype.instruction = function(D, h) {
        var d, y, x, v, _;
        if (D != null && (D = s(D)), h != null && (h = s(h)), Array.isArray(D))
          for (v = 0, _ = D.length; v < _; v++)
            d = D[v], this.instruction(d);
        else if (b(D))
          for (d in D)
            l.call(D, d) && (y = D[d], this.instruction(d, y));
        else
          m(h) && (h = h.apply()), x = new a(this, D, h), this.children.push(x);
        return this;
      }, g.prototype.instructionBefore = function(D, h) {
        var d, y;
        return d = this.parent.children.indexOf(this), y = this.parent.children.splice(d), this.parent.instruction(D, h), Array.prototype.push.apply(this.parent.children, y), this;
      }, g.prototype.instructionAfter = function(D, h) {
        var d, y;
        return d = this.parent.children.indexOf(this), y = this.parent.children.splice(d + 1), this.parent.instruction(D, h), Array.prototype.push.apply(this.parent.children, y), this;
      }, g.prototype.declaration = function(D, h, d) {
        var y, x;
        return y = this.document(), x = new n(y, D, h, d), y.children[0] instanceof n ? y.children[0] = x : y.children.unshift(x), y.root() || y;
      }, g.prototype.doctype = function(D, h) {
        var d, y, x, v, _, w, A, B, P, L;
        for (y = this.document(), x = new r(y, D, h), P = y.children, v = _ = 0, A = P.length; _ < A; v = ++_)
          if (d = P[v], d instanceof r)
            return y.children[v] = x, x;
        for (L = y.children, v = w = 0, B = L.length; w < B; v = ++w)
          if (d = L[v], d.isRoot)
            return y.children.splice(v, 0, x), x;
        return y.children.push(x), x;
      }, g.prototype.up = function() {
        if (this.isRoot)
          throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
        return this.parent;
      }, g.prototype.root = function() {
        var D;
        for (D = this; D; ) {
          if (D.isDocument)
            return D.rootObject;
          if (D.isRoot)
            return D;
          D = D.parent;
        }
      }, g.prototype.document = function() {
        var D;
        for (D = this; D; ) {
          if (D.isDocument)
            return D;
          D = D.parent;
        }
      }, g.prototype.end = function(D) {
        return this.document().end(D);
      }, g.prototype.prev = function() {
        var D;
        for (D = this.parent.children.indexOf(this); D > 0 && this.parent.children[D - 1].isDummy; )
          D = D - 1;
        if (D < 1)
          throw new Error("Already at the first node. " + this.debugInfo());
        return this.parent.children[D - 1];
      }, g.prototype.next = function() {
        var D;
        for (D = this.parent.children.indexOf(this); D < this.parent.children.length - 1 && this.parent.children[D + 1].isDummy; )
          D = D + 1;
        if (D === -1 || D === this.parent.children.length - 1)
          throw new Error("Already at the last node. " + this.debugInfo());
        return this.parent.children[D + 1];
      }, g.prototype.importDocument = function(D) {
        var h;
        return h = D.root().clone(), h.parent = this, h.isRoot = !1, this.children.push(h), this;
      }, g.prototype.debugInfo = function(D) {
        var h, d;
        return D = D || this.name, D == null && !((h = this.parent) != null && h.name) ? "" : D == null ? "parent: <" + this.parent.name + ">" : (d = this.parent) != null && d.name ? "node: <" + D + ">, parent: <" + this.parent.name + ">" : "node: <" + D + ">";
      }, g.prototype.ele = function(D, h, d) {
        return this.element(D, h, d);
      }, g.prototype.nod = function(D, h, d) {
        return this.node(D, h, d);
      }, g.prototype.txt = function(D) {
        return this.text(D);
      }, g.prototype.dat = function(D) {
        return this.cdata(D);
      }, g.prototype.com = function(D) {
        return this.comment(D);
      }, g.prototype.ins = function(D, h) {
        return this.instruction(D, h);
      }, g.prototype.doc = function() {
        return this.document();
      }, g.prototype.dec = function(D, h, d) {
        return this.declaration(D, h, d);
      }, g.prototype.dtd = function(D, h) {
        return this.doctype(D, h);
      }, g.prototype.e = function(D, h, d) {
        return this.element(D, h, d);
      }, g.prototype.n = function(D, h, d) {
        return this.node(D, h, d);
      }, g.prototype.t = function(D) {
        return this.text(D);
      }, g.prototype.d = function(D) {
        return this.cdata(D);
      }, g.prototype.c = function(D) {
        return this.comment(D);
      }, g.prototype.r = function(D) {
        return this.raw(D);
      }, g.prototype.i = function(D, h) {
        return this.instruction(D, h);
      }, g.prototype.u = function() {
        return this.up();
      }, g.prototype.importXMLBuilder = function(D) {
        return this.importDocument(D);
      }, g;
    }();
  }).call(re)), Mc.exports;
}
var es = { exports: {} }, N0;
function vb() {
  return N0 || (N0 = 1, (function() {
    var e = function(n, r) {
      return function() {
        return n.apply(r, arguments);
      };
    }, t = {}.hasOwnProperty;
    es.exports = function() {
      function n(r) {
        this.assertLegalChar = e(this.assertLegalChar, this);
        var i, u, a;
        r || (r = {}), this.noDoubleEncoding = r.noDoubleEncoding, u = r.stringify || {};
        for (i in u)
          t.call(u, i) && (a = u[i], this[i] = a);
      }
      return n.prototype.eleName = function(r) {
        return r = "" + r || "", this.assertLegalChar(r);
      }, n.prototype.eleText = function(r) {
        return r = "" + r || "", this.assertLegalChar(this.elEscape(r));
      }, n.prototype.cdata = function(r) {
        return r = "" + r || "", r = r.replace("]]>", "]]]]><![CDATA[>"), this.assertLegalChar(r);
      }, n.prototype.comment = function(r) {
        if (r = "" + r || "", r.match(/--/))
          throw new Error("Comment text cannot contain double-hypen: " + r);
        return this.assertLegalChar(r);
      }, n.prototype.raw = function(r) {
        return "" + r || "";
      }, n.prototype.attName = function(r) {
        return r = "" + r || "";
      }, n.prototype.attValue = function(r) {
        return r = "" + r || "", this.attEscape(r);
      }, n.prototype.insTarget = function(r) {
        return "" + r || "";
      }, n.prototype.insValue = function(r) {
        if (r = "" + r || "", r.match(/\?>/))
          throw new Error("Invalid processing instruction value: " + r);
        return r;
      }, n.prototype.xmlVersion = function(r) {
        if (r = "" + r || "", !r.match(/1\.[0-9]+/))
          throw new Error("Invalid version number: " + r);
        return r;
      }, n.prototype.xmlEncoding = function(r) {
        if (r = "" + r || "", !r.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/))
          throw new Error("Invalid encoding: " + r);
        return r;
      }, n.prototype.xmlStandalone = function(r) {
        return r ? "yes" : "no";
      }, n.prototype.dtdPubID = function(r) {
        return "" + r || "";
      }, n.prototype.dtdSysID = function(r) {
        return "" + r || "";
      }, n.prototype.dtdElementValue = function(r) {
        return "" + r || "";
      }, n.prototype.dtdAttType = function(r) {
        return "" + r || "";
      }, n.prototype.dtdAttDefault = function(r) {
        return r != null ? "" + r || "" : r;
      }, n.prototype.dtdEntityValue = function(r) {
        return "" + r || "";
      }, n.prototype.dtdNData = function(r) {
        return "" + r || "";
      }, n.prototype.convertAttKey = "@", n.prototype.convertPIKey = "?", n.prototype.convertTextKey = "#text", n.prototype.convertCDataKey = "#cdata", n.prototype.convertCommentKey = "#comment", n.prototype.convertRawKey = "#raw", n.prototype.assertLegalChar = function(r) {
        var i;
        if (i = r.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), i)
          throw new Error("Invalid character in string: " + r + " at index " + i.index);
        return r;
      }, n.prototype.elEscape = function(r) {
        var i;
        return i = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g, r.replace(i, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
      }, n.prototype.attEscape = function(r) {
        var i;
        return i = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g, r.replace(i, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
      }, n;
    }();
  }).call(re)), es.exports;
}
var ts = { exports: {} }, ns = { exports: {} }, R0;
function _b() {
  return R0 || (R0 = 1, (function() {
    var e = {}.hasOwnProperty;
    ns.exports = function() {
      function t(n) {
        var r, i, u, a, o, c, s, f, m;
        n || (n = {}), this.pretty = n.pretty || !1, this.allowEmpty = (i = n.allowEmpty) != null ? i : !1, this.pretty ? (this.indent = (u = n.indent) != null ? u : "  ", this.newline = (a = n.newline) != null ? a : `
`, this.offset = (o = n.offset) != null ? o : 0, this.dontprettytextnodes = (c = n.dontprettytextnodes) != null ? c : 0) : (this.indent = "", this.newline = "", this.offset = 0, this.dontprettytextnodes = 0), this.spacebeforeslash = (s = n.spacebeforeslash) != null ? s : "", this.spacebeforeslash === !0 && (this.spacebeforeslash = " "), this.newlinedefault = this.newline, this.prettydefault = this.pretty, f = n.writer || {};
        for (r in f)
          e.call(f, r) && (m = f[r], this[r] = m);
      }
      return t.prototype.set = function(n) {
        var r, i, u;
        n || (n = {}), "pretty" in n && (this.pretty = n.pretty), "allowEmpty" in n && (this.allowEmpty = n.allowEmpty), this.pretty ? (this.indent = "indent" in n ? n.indent : "  ", this.newline = "newline" in n ? n.newline : `
`, this.offset = "offset" in n ? n.offset : 0, this.dontprettytextnodes = "dontprettytextnodes" in n ? n.dontprettytextnodes : 0) : (this.indent = "", this.newline = "", this.offset = 0, this.dontprettytextnodes = 0), this.spacebeforeslash = "spacebeforeslash" in n ? n.spacebeforeslash : "", this.spacebeforeslash === !0 && (this.spacebeforeslash = " "), this.newlinedefault = this.newline, this.prettydefault = this.pretty, i = n.writer || {};
        for (r in i)
          e.call(i, r) && (u = i[r], this[r] = u);
        return this;
      }, t.prototype.space = function(n) {
        var r;
        return this.pretty ? (r = (n || 0) + this.offset + 1, r > 0 ? new Array(r).join(this.indent) : "") : "";
      }, t;
    }();
  }).call(re)), ns.exports;
}
var O0;
function od() {
  return O0 || (O0 = 1, (function() {
    var e, t, n, r, i, u, a, o, c, s, f, m, b, p, l = function(D, h) {
      for (var d in h)
        g.call(h, d) && (D[d] = h[d]);
      function y() {
        this.constructor = D;
      }
      return y.prototype = h.prototype, D.prototype = new y(), D.__super__ = h.prototype, D;
    }, g = {}.hasOwnProperty;
    a = Xa(), o = Ka(), e = ja(), t = Ha(), s = $a(), m = Qa(), b = Ja(), f = eo(), c = ad(), n = Za(), r = Ga(), i = Va(), u = Ya(), p = _b(), ts.exports = function(D) {
      l(h, D);
      function h(d) {
        h.__super__.constructor.call(this, d);
      }
      return h.prototype.document = function(d) {
        var y, x, v, _, w;
        for (this.textispresent = !1, _ = "", w = d.children, x = 0, v = w.length; x < v; x++)
          y = w[x], !(y instanceof c) && (_ += (function() {
            switch (!1) {
              case !(y instanceof a):
                return this.declaration(y);
              case !(y instanceof o):
                return this.docType(y);
              case !(y instanceof t):
                return this.comment(y);
              case !(y instanceof f):
                return this.processingInstruction(y);
              default:
                return this.element(y, 0);
            }
          }).call(this));
        return this.pretty && _.slice(-this.newline.length) === this.newline && (_ = _.slice(0, -this.newline.length)), _;
      }, h.prototype.attribute = function(d) {
        return " " + d.name + '="' + d.value + '"';
      }, h.prototype.cdata = function(d, y) {
        return this.space(y) + "<![CDATA[" + d.text + "]]>" + this.newline;
      }, h.prototype.comment = function(d, y) {
        return this.space(y) + "<!-- " + d.text + " -->" + this.newline;
      }, h.prototype.declaration = function(d, y) {
        var x;
        return x = this.space(y), x += '<?xml version="' + d.version + '"', d.encoding != null && (x += ' encoding="' + d.encoding + '"'), d.standalone != null && (x += ' standalone="' + d.standalone + '"'), x += this.spacebeforeslash + "?>", x += this.newline, x;
      }, h.prototype.docType = function(d, y) {
        var x, v, _, w, A;
        if (y || (y = 0), w = this.space(y), w += "<!DOCTYPE " + d.root().name, d.pubID && d.sysID ? w += ' PUBLIC "' + d.pubID + '" "' + d.sysID + '"' : d.sysID && (w += ' SYSTEM "' + d.sysID + '"'), d.children.length > 0) {
          for (w += " [", w += this.newline, A = d.children, v = 0, _ = A.length; v < _; v++)
            x = A[v], w += (function() {
              switch (!1) {
                case !(x instanceof n):
                  return this.dtdAttList(x, y + 1);
                case !(x instanceof r):
                  return this.dtdElement(x, y + 1);
                case !(x instanceof i):
                  return this.dtdEntity(x, y + 1);
                case !(x instanceof u):
                  return this.dtdNotation(x, y + 1);
                case !(x instanceof e):
                  return this.cdata(x, y + 1);
                case !(x instanceof t):
                  return this.comment(x, y + 1);
                case !(x instanceof f):
                  return this.processingInstruction(x, y + 1);
                default:
                  throw new Error("Unknown DTD node type: " + x.constructor.name);
              }
            }).call(this);
          w += "]";
        }
        return w += this.spacebeforeslash + ">", w += this.newline, w;
      }, h.prototype.element = function(d, y) {
        var x, v, _, w, A, B, P, L, I, z, H, G, C;
        y || (y = 0), C = !1, this.textispresent ? (this.newline = "", this.pretty = !1) : (this.newline = this.newlinedefault, this.pretty = this.prettydefault), G = this.space(y), L = "", L += G + "<" + d.name, I = d.attributes;
        for (P in I)
          g.call(I, P) && (x = I[P], L += this.attribute(x));
        if (d.children.length === 0 || d.children.every(function(U) {
          return U.value === "";
        }))
          this.allowEmpty ? L += "></" + d.name + ">" + this.newline : L += this.spacebeforeslash + "/>" + this.newline;
        else if (this.pretty && d.children.length === 1 && d.children[0].value != null)
          L += ">", L += d.children[0].value, L += "</" + d.name + ">" + this.newline;
        else {
          if (this.dontprettytextnodes) {
            for (z = d.children, _ = 0, A = z.length; _ < A; _++)
              if (v = z[_], v.value != null) {
                this.textispresent++, C = !0;
                break;
              }
          }
          for (this.textispresent && (this.newline = "", this.pretty = !1, G = this.space(y)), L += ">" + this.newline, H = d.children, w = 0, B = H.length; w < B; w++)
            v = H[w], L += (function() {
              switch (!1) {
                case !(v instanceof e):
                  return this.cdata(v, y + 1);
                case !(v instanceof t):
                  return this.comment(v, y + 1);
                case !(v instanceof s):
                  return this.element(v, y + 1);
                case !(v instanceof m):
                  return this.raw(v, y + 1);
                case !(v instanceof b):
                  return this.text(v, y + 1);
                case !(v instanceof f):
                  return this.processingInstruction(v, y + 1);
                case !(v instanceof c):
                  return "";
                default:
                  throw new Error("Unknown XML node type: " + v.constructor.name);
              }
            }).call(this);
          C && this.textispresent--, this.textispresent || (this.newline = this.newlinedefault, this.pretty = this.prettydefault), L += G + "</" + d.name + ">" + this.newline;
        }
        return L;
      }, h.prototype.processingInstruction = function(d, y) {
        var x;
        return x = this.space(y) + "<?" + d.target, d.value && (x += " " + d.value), x += this.spacebeforeslash + "?>" + this.newline, x;
      }, h.prototype.raw = function(d, y) {
        return this.space(y) + d.value + this.newline;
      }, h.prototype.text = function(d, y) {
        return this.space(y) + d.value + this.newline;
      }, h.prototype.dtdAttList = function(d, y) {
        var x;
        return x = this.space(y) + "<!ATTLIST " + d.elementName + " " + d.attributeName + " " + d.attributeType, d.defaultValueType !== "#DEFAULT" && (x += " " + d.defaultValueType), d.defaultValue && (x += ' "' + d.defaultValue + '"'), x += this.spacebeforeslash + ">" + this.newline, x;
      }, h.prototype.dtdElement = function(d, y) {
        return this.space(y) + "<!ELEMENT " + d.name + " " + d.value + this.spacebeforeslash + ">" + this.newline;
      }, h.prototype.dtdEntity = function(d, y) {
        var x;
        return x = this.space(y) + "<!ENTITY", d.pe && (x += " %"), x += " " + d.name, d.value ? x += ' "' + d.value + '"' : (d.pubID && d.sysID ? x += ' PUBLIC "' + d.pubID + '" "' + d.sysID + '"' : d.sysID && (x += ' SYSTEM "' + d.sysID + '"'), d.nData && (x += " NDATA " + d.nData)), x += this.spacebeforeslash + ">" + this.newline, x;
      }, h.prototype.dtdNotation = function(d, y) {
        var x;
        return x = this.space(y) + "<!NOTATION " + d.name, d.pubID && d.sysID ? x += ' PUBLIC "' + d.pubID + '" "' + d.sysID + '"' : d.pubID ? x += ' PUBLIC "' + d.pubID + '"' : d.sysID && (x += ' SYSTEM "' + d.sysID + '"'), x += this.spacebeforeslash + ">" + this.newline, x;
      }, h.prototype.openNode = function(d, y) {
        var x, v, _, w;
        if (y || (y = 0), d instanceof s) {
          _ = this.space(y) + "<" + d.name, w = d.attributes;
          for (v in w)
            g.call(w, v) && (x = w[v], _ += this.attribute(x));
          return _ += (d.children ? ">" : "/>") + this.newline, _;
        } else
          return _ = this.space(y) + "<!DOCTYPE " + d.rootNodeName, d.pubID && d.sysID ? _ += ' PUBLIC "' + d.pubID + '" "' + d.sysID + '"' : d.sysID && (_ += ' SYSTEM "' + d.sysID + '"'), _ += (d.children ? " [" : ">") + this.newline, _;
      }, h.prototype.closeNode = function(d, y) {
        switch (y || (y = 0), !1) {
          case !(d instanceof s):
            return this.space(y) + "</" + d.name + ">" + this.newline;
          case !(d instanceof o):
            return this.space(y) + "]>" + this.newline;
        }
      }, h;
    }(p);
  }).call(re)), ts.exports;
}
var L0;
function g6() {
  return L0 || (L0 = 1, (function() {
    var e, t, n, r, i = function(a, o) {
      for (var c in o)
        u.call(o, c) && (a[c] = o[c]);
      function s() {
        this.constructor = a;
      }
      return s.prototype = o.prototype, a.prototype = new s(), a.__super__ = o.prototype, a;
    }, u = {}.hasOwnProperty;
    r = jn().isPlainObject, e = gt(), n = vb(), t = od(), Wc.exports = function(a) {
      i(o, a);
      function o(c) {
        o.__super__.constructor.call(this, null), this.name = "?xml", c || (c = {}), c.writer || (c.writer = new t()), this.options = c, this.stringify = new n(c), this.isDocument = !0;
      }
      return o.prototype.end = function(c) {
        var s;
        return c ? r(c) && (s = c, c = this.options.writer.set(s)) : c = this.options.writer, c.document(this);
      }, o.prototype.toString = function(c) {
        return this.options.writer.set(c).document(this);
      }, o;
    }(e);
  }).call(re)), Wc.exports;
}
var rs = { exports: {} }, W0;
function b6() {
  return W0 || (W0 = 1, (function() {
    var e, t, n, r, i, u, a, o, c, s, f, m, b, p, l, g, D, h, d, y, x = {}.hasOwnProperty;
    y = jn(), h = y.isObject, D = y.isFunction, d = y.isPlainObject, g = y.getValue, s = $a(), t = ja(), n = Ha(), m = Qa(), l = Ja(), f = eo(), o = Xa(), c = Ka(), r = Za(), u = Va(), i = Ga(), a = Ya(), e = xb(), p = vb(), b = od(), rs.exports = function() {
      function v(_, w, A) {
        var B;
        this.name = "?xml", _ || (_ = {}), _.writer ? d(_.writer) && (B = _.writer, _.writer = new b(B)) : _.writer = new b(_), this.options = _, this.writer = _.writer, this.stringify = new p(_), this.onDataCallback = w || function() {
        }, this.onEndCallback = A || function() {
        }, this.currentNode = null, this.currentLevel = -1, this.openTags = {}, this.documentStarted = !1, this.documentCompleted = !1, this.root = null;
      }
      return v.prototype.node = function(_, w, A) {
        var B, P;
        if (_ == null)
          throw new Error("Missing node name.");
        if (this.root && this.currentLevel === -1)
          throw new Error("Document can only have one root node. " + this.debugInfo(_));
        return this.openCurrent(), _ = g(_), w === null && A == null && (B = [{}, null], w = B[0], A = B[1]), w == null && (w = {}), w = g(w), h(w) || (P = [w, A], A = P[0], w = P[1]), this.currentNode = new s(this, _, w), this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, A != null && this.text(A), this;
      }, v.prototype.element = function(_, w, A) {
        return this.currentNode && this.currentNode instanceof c ? this.dtdElement.apply(this, arguments) : this.node(_, w, A);
      }, v.prototype.attribute = function(_, w) {
        var A, B;
        if (!this.currentNode || this.currentNode.children)
          throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(_));
        if (_ != null && (_ = g(_)), h(_))
          for (A in _)
            x.call(_, A) && (B = _[A], this.attribute(A, B));
        else
          D(w) && (w = w.apply()), (!this.options.skipNullAttributes || w != null) && (this.currentNode.attributes[_] = new e(this, _, w));
        return this;
      }, v.prototype.text = function(_) {
        var w;
        return this.openCurrent(), w = new l(this, _), this.onData(this.writer.text(w, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.cdata = function(_) {
        var w;
        return this.openCurrent(), w = new t(this, _), this.onData(this.writer.cdata(w, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.comment = function(_) {
        var w;
        return this.openCurrent(), w = new n(this, _), this.onData(this.writer.comment(w, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.raw = function(_) {
        var w;
        return this.openCurrent(), w = new m(this, _), this.onData(this.writer.raw(w, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.instruction = function(_, w) {
        var A, B, P, L, I;
        if (this.openCurrent(), _ != null && (_ = g(_)), w != null && (w = g(w)), Array.isArray(_))
          for (A = 0, L = _.length; A < L; A++)
            B = _[A], this.instruction(B);
        else if (h(_))
          for (B in _)
            x.call(_, B) && (P = _[B], this.instruction(B, P));
        else
          D(w) && (w = w.apply()), I = new f(this, _, w), this.onData(this.writer.processingInstruction(I, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }, v.prototype.declaration = function(_, w, A) {
        var B;
        if (this.openCurrent(), this.documentStarted)
          throw new Error("declaration() must be the first node.");
        return B = new o(this, _, w, A), this.onData(this.writer.declaration(B, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.doctype = function(_, w, A) {
        if (this.openCurrent(), _ == null)
          throw new Error("Missing root node name.");
        if (this.root)
          throw new Error("dtd() must come before the root node.");
        return this.currentNode = new c(this, w, A), this.currentNode.rootNodeName = _, this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, this;
      }, v.prototype.dtdElement = function(_, w) {
        var A;
        return this.openCurrent(), A = new i(this, _, w), this.onData(this.writer.dtdElement(A, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.attList = function(_, w, A, B, P) {
        var L;
        return this.openCurrent(), L = new r(this, _, w, A, B, P), this.onData(this.writer.dtdAttList(L, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.entity = function(_, w) {
        var A;
        return this.openCurrent(), A = new u(this, !1, _, w), this.onData(this.writer.dtdEntity(A, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.pEntity = function(_, w) {
        var A;
        return this.openCurrent(), A = new u(this, !0, _, w), this.onData(this.writer.dtdEntity(A, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.notation = function(_, w) {
        var A;
        return this.openCurrent(), A = new a(this, _, w), this.onData(this.writer.dtdNotation(A, this.currentLevel + 1), this.currentLevel + 1), this;
      }, v.prototype.up = function() {
        if (this.currentLevel < 0)
          throw new Error("The document node has no parent.");
        return this.currentNode ? (this.currentNode.children ? this.closeNode(this.currentNode) : this.openNode(this.currentNode), this.currentNode = null) : this.closeNode(this.openTags[this.currentLevel]), delete this.openTags[this.currentLevel], this.currentLevel--, this;
      }, v.prototype.end = function() {
        for (; this.currentLevel >= 0; )
          this.up();
        return this.onEnd();
      }, v.prototype.openCurrent = function() {
        if (this.currentNode)
          return this.currentNode.children = !0, this.openNode(this.currentNode);
      }, v.prototype.openNode = function(_) {
        if (!_.isOpen)
          return !this.root && this.currentLevel === 0 && _ instanceof s && (this.root = _), this.onData(this.writer.openNode(_, this.currentLevel), this.currentLevel), _.isOpen = !0;
      }, v.prototype.closeNode = function(_) {
        if (!_.isClosed)
          return this.onData(this.writer.closeNode(_, this.currentLevel), this.currentLevel), _.isClosed = !0;
      }, v.prototype.onData = function(_, w) {
        return this.documentStarted = !0, this.onDataCallback(_, w + 1);
      }, v.prototype.onEnd = function() {
        return this.documentCompleted = !0, this.onEndCallback();
      }, v.prototype.debugInfo = function(_) {
        return _ == null ? "" : "node: <" + _ + ">";
      }, v.prototype.ele = function() {
        return this.element.apply(this, arguments);
      }, v.prototype.nod = function(_, w, A) {
        return this.node(_, w, A);
      }, v.prototype.txt = function(_) {
        return this.text(_);
      }, v.prototype.dat = function(_) {
        return this.cdata(_);
      }, v.prototype.com = function(_) {
        return this.comment(_);
      }, v.prototype.ins = function(_, w) {
        return this.instruction(_, w);
      }, v.prototype.dec = function(_, w, A) {
        return this.declaration(_, w, A);
      }, v.prototype.dtd = function(_, w, A) {
        return this.doctype(_, w, A);
      }, v.prototype.e = function(_, w, A) {
        return this.element(_, w, A);
      }, v.prototype.n = function(_, w, A) {
        return this.node(_, w, A);
      }, v.prototype.t = function(_) {
        return this.text(_);
      }, v.prototype.d = function(_) {
        return this.cdata(_);
      }, v.prototype.c = function(_) {
        return this.comment(_);
      }, v.prototype.r = function(_) {
        return this.raw(_);
      }, v.prototype.i = function(_, w) {
        return this.instruction(_, w);
      }, v.prototype.att = function() {
        return this.currentNode && this.currentNode instanceof c ? this.attList.apply(this, arguments) : this.attribute.apply(this, arguments);
      }, v.prototype.a = function() {
        return this.currentNode && this.currentNode instanceof c ? this.attList.apply(this, arguments) : this.attribute.apply(this, arguments);
      }, v.prototype.ent = function(_, w) {
        return this.entity(_, w);
      }, v.prototype.pent = function(_, w) {
        return this.pEntity(_, w);
      }, v.prototype.not = function(_, w) {
        return this.notation(_, w);
      }, v;
    }();
  }).call(re)), rs.exports;
}
var is = { exports: {} }, M0;
function m6() {
  return M0 || (M0 = 1, (function() {
    var e, t, n, r, i, u, a, o, c, s, f, m, b, p, l = function(D, h) {
      for (var d in h)
        g.call(h, d) && (D[d] = h[d]);
      function y() {
        this.constructor = D;
      }
      return y.prototype = h.prototype, D.prototype = new y(), D.__super__ = h.prototype, D;
    }, g = {}.hasOwnProperty;
    a = Xa(), o = Ka(), e = ja(), t = Ha(), s = $a(), m = Qa(), b = Ja(), f = eo(), c = ad(), n = Za(), r = Ga(), i = Va(), u = Ya(), p = _b(), is.exports = function(D) {
      l(h, D);
      function h(d, y) {
        h.__super__.constructor.call(this, y), this.stream = d;
      }
      return h.prototype.document = function(d) {
        var y, x, v, _, w, A, B, P;
        for (A = d.children, x = 0, _ = A.length; x < _; x++)
          y = A[x], y.isLastRootNode = !1;
        for (d.children[d.children.length - 1].isLastRootNode = !0, B = d.children, P = [], v = 0, w = B.length; v < w; v++)
          if (y = B[v], !(y instanceof c))
            switch (!1) {
              case !(y instanceof a):
                P.push(this.declaration(y));
                break;
              case !(y instanceof o):
                P.push(this.docType(y));
                break;
              case !(y instanceof t):
                P.push(this.comment(y));
                break;
              case !(y instanceof f):
                P.push(this.processingInstruction(y));
                break;
              default:
                P.push(this.element(y));
            }
        return P;
      }, h.prototype.attribute = function(d) {
        return this.stream.write(" " + d.name + '="' + d.value + '"');
      }, h.prototype.cdata = function(d, y) {
        return this.stream.write(this.space(y) + "<![CDATA[" + d.text + "]]>" + this.endline(d));
      }, h.prototype.comment = function(d, y) {
        return this.stream.write(this.space(y) + "<!-- " + d.text + " -->" + this.endline(d));
      }, h.prototype.declaration = function(d, y) {
        return this.stream.write(this.space(y)), this.stream.write('<?xml version="' + d.version + '"'), d.encoding != null && this.stream.write(' encoding="' + d.encoding + '"'), d.standalone != null && this.stream.write(' standalone="' + d.standalone + '"'), this.stream.write(this.spacebeforeslash + "?>"), this.stream.write(this.endline(d));
      }, h.prototype.docType = function(d, y) {
        var x, v, _, w;
        if (y || (y = 0), this.stream.write(this.space(y)), this.stream.write("<!DOCTYPE " + d.root().name), d.pubID && d.sysID ? this.stream.write(' PUBLIC "' + d.pubID + '" "' + d.sysID + '"') : d.sysID && this.stream.write(' SYSTEM "' + d.sysID + '"'), d.children.length > 0) {
          for (this.stream.write(" ["), this.stream.write(this.endline(d)), w = d.children, v = 0, _ = w.length; v < _; v++)
            switch (x = w[v], !1) {
              case !(x instanceof n):
                this.dtdAttList(x, y + 1);
                break;
              case !(x instanceof r):
                this.dtdElement(x, y + 1);
                break;
              case !(x instanceof i):
                this.dtdEntity(x, y + 1);
                break;
              case !(x instanceof u):
                this.dtdNotation(x, y + 1);
                break;
              case !(x instanceof e):
                this.cdata(x, y + 1);
                break;
              case !(x instanceof t):
                this.comment(x, y + 1);
                break;
              case !(x instanceof f):
                this.processingInstruction(x, y + 1);
                break;
              default:
                throw new Error("Unknown DTD node type: " + x.constructor.name);
            }
          this.stream.write("]");
        }
        return this.stream.write(this.spacebeforeslash + ">"), this.stream.write(this.endline(d));
      }, h.prototype.element = function(d, y) {
        var x, v, _, w, A, B, P, L;
        y || (y = 0), L = this.space(y), this.stream.write(L + "<" + d.name), B = d.attributes;
        for (A in B)
          g.call(B, A) && (x = B[A], this.attribute(x));
        if (d.children.length === 0 || d.children.every(function(I) {
          return I.value === "";
        }))
          this.allowEmpty ? this.stream.write("></" + d.name + ">") : this.stream.write(this.spacebeforeslash + "/>");
        else if (this.pretty && d.children.length === 1 && d.children[0].value != null)
          this.stream.write(">"), this.stream.write(d.children[0].value), this.stream.write("</" + d.name + ">");
        else {
          for (this.stream.write(">" + this.newline), P = d.children, _ = 0, w = P.length; _ < w; _++)
            switch (v = P[_], !1) {
              case !(v instanceof e):
                this.cdata(v, y + 1);
                break;
              case !(v instanceof t):
                this.comment(v, y + 1);
                break;
              case !(v instanceof s):
                this.element(v, y + 1);
                break;
              case !(v instanceof m):
                this.raw(v, y + 1);
                break;
              case !(v instanceof b):
                this.text(v, y + 1);
                break;
              case !(v instanceof f):
                this.processingInstruction(v, y + 1);
                break;
              case !(v instanceof c):
                break;
              default:
                throw new Error("Unknown XML node type: " + v.constructor.name);
            }
          this.stream.write(L + "</" + d.name + ">");
        }
        return this.stream.write(this.endline(d));
      }, h.prototype.processingInstruction = function(d, y) {
        return this.stream.write(this.space(y) + "<?" + d.target), d.value && this.stream.write(" " + d.value), this.stream.write(this.spacebeforeslash + "?>" + this.endline(d));
      }, h.prototype.raw = function(d, y) {
        return this.stream.write(this.space(y) + d.value + this.endline(d));
      }, h.prototype.text = function(d, y) {
        return this.stream.write(this.space(y) + d.value + this.endline(d));
      }, h.prototype.dtdAttList = function(d, y) {
        return this.stream.write(this.space(y) + "<!ATTLIST " + d.elementName + " " + d.attributeName + " " + d.attributeType), d.defaultValueType !== "#DEFAULT" && this.stream.write(" " + d.defaultValueType), d.defaultValue && this.stream.write(' "' + d.defaultValue + '"'), this.stream.write(this.spacebeforeslash + ">" + this.endline(d));
      }, h.prototype.dtdElement = function(d, y) {
        return this.stream.write(this.space(y) + "<!ELEMENT " + d.name + " " + d.value), this.stream.write(this.spacebeforeslash + ">" + this.endline(d));
      }, h.prototype.dtdEntity = function(d, y) {
        return this.stream.write(this.space(y) + "<!ENTITY"), d.pe && this.stream.write(" %"), this.stream.write(" " + d.name), d.value ? this.stream.write(' "' + d.value + '"') : (d.pubID && d.sysID ? this.stream.write(' PUBLIC "' + d.pubID + '" "' + d.sysID + '"') : d.sysID && this.stream.write(' SYSTEM "' + d.sysID + '"'), d.nData && this.stream.write(" NDATA " + d.nData)), this.stream.write(this.spacebeforeslash + ">" + this.endline(d));
      }, h.prototype.dtdNotation = function(d, y) {
        return this.stream.write(this.space(y) + "<!NOTATION " + d.name), d.pubID && d.sysID ? this.stream.write(' PUBLIC "' + d.pubID + '" "' + d.sysID + '"') : d.pubID ? this.stream.write(' PUBLIC "' + d.pubID + '"') : d.sysID && this.stream.write(' SYSTEM "' + d.sysID + '"'), this.stream.write(this.spacebeforeslash + ">" + this.endline(d));
      }, h.prototype.endline = function(d) {
        return d.isLastRootNode ? "" : this.newline;
      }, h;
    }(p);
  }).call(re)), is.exports;
}
(function() {
  var e, t, n, r, i, u, a;
  a = jn(), i = a.assign, u = a.isFunction, e = g6(), t = b6(), r = od(), n = m6(), li.create = function(o, c, s, f) {
    var m, b;
    if (o == null)
      throw new Error("Root element needs a name.");
    return f = i({}, c, s, f), m = new e(f), b = m.element(o), f.headless || (m.declaration(f), (f.pubID != null || f.sysID != null) && m.doctype(f)), b;
  }, li.begin = function(o, c, s) {
    var f;
    return u(o) && (f = [o, c], c = f[0], s = f[1], o = {}), c ? new t(o, c, s) : new e(o);
  }, li.stringWriter = function(o) {
    return new r(o);
  }, li.streamWriter = function(o, c) {
    return new n(o, c);
  };
}).call(re);
var P0 = Ne, y6 = li;
Db.writeString = D6;
function D6(e, t) {
  var n = P0.invert(t), r = {
    element: u,
    text: x6
  };
  function i(c, s) {
    return r[s.type](c, s);
  }
  function u(c, s) {
    var f = c.element(a(s.name), s.attributes);
    s.children.forEach(function(m) {
      i(f, m);
    });
  }
  function a(c) {
    var s = /^\{(.*)\}(.*)$/.exec(c);
    if (s) {
      var f = n[s[1]];
      return f + (f === "" ? "" : ":") + s[2];
    } else
      return c;
  }
  function o(c) {
    var s = y6.create(a(c.name), {
      version: "1.0",
      encoding: "UTF-8",
      standalone: !0
    });
    return P0.forEach(t, function(f, m) {
      var b = "xmlns" + (m === "" ? "" : ":" + m);
      s.attribute(b, f);
    }), c.children.forEach(function(f) {
      i(s, f);
    }), s.end();
  }
  return o(e);
}
function x6(e, t) {
  e.text(t.value);
}
var to = ei;
yn.Element = to.Element;
yn.element = to.element;
yn.emptyElement = to.emptyElement;
yn.text = to.text;
yn.readString = Pg.readString;
yn.writeString = Db.writeString;
var v6 = Ne, _6 = je, E6 = yn;
Vf.read = Eb;
Vf.readXmlFromZipFile = U6;
var w6 = {
  // Transitional format
  "http://schemas.openxmlformats.org/wordprocessingml/2006/main": "w",
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships": "r",
  "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing": "wp",
  "http://schemas.openxmlformats.org/drawingml/2006/main": "a",
  "http://schemas.openxmlformats.org/drawingml/2006/picture": "pic",
  // Strict format
  "http://purl.oclc.org/ooxml/wordprocessingml/main": "w",
  "http://purl.oclc.org/ooxml/officeDocument/relationships": "r",
  "http://purl.oclc.org/ooxml/drawingml/wordprocessingDrawing": "wp",
  "http://purl.oclc.org/ooxml/drawingml/main": "a",
  "http://purl.oclc.org/ooxml/drawingml/picture": "pic",
  // Common
  "http://schemas.openxmlformats.org/package/2006/content-types": "content-types",
  "http://schemas.openxmlformats.org/package/2006/relationships": "relationships",
  "http://schemas.openxmlformats.org/markup-compatibility/2006": "mc",
  "urn:schemas-microsoft-com:vml": "v",
  "urn:schemas-microsoft-com:office:word": "office-word",
  // [MS-DOCX]: Word Extensions to the Office Open XML (.docx) File Format
  // https://learn.microsoft.com/en-us/openspecs/office_standards/ms-docx/b839fe1f-e1ca-4fa6-8c26-5954d0abbccd
  "http://schemas.microsoft.com/office/word/2010/wordml": "wordml"
};
function Eb(e) {
  return E6.readString(e, w6).then(function(t) {
    return wb(t)[0];
  });
}
function U6(e, t) {
  return e.exists(t) ? e.read(t, "utf-8").then(T6).then(Eb) : _6.resolve(null);
}
function T6(e) {
  return e.replace(/^\uFEFF/g, "");
}
function wb(e) {
  return e.type === "element" ? e.name === "mc:AlternateContent" ? e.first("mc:Fallback").children : (e.children = v6.flatten(e.children.map(wb, !0)), [e]) : [e];
}
var cd = {}, On = {}, sd = {};
Object.defineProperty(sd, "__esModule", { value: !0 });
var C6 = [
  { "Typeface name": "Symbol", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Symbol", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "33", "Unicode hex": "21" },
  { "Typeface name": "Symbol", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "8704", "Unicode hex": "2200" },
  { "Typeface name": "Symbol", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "35", "Unicode hex": "23" },
  { "Typeface name": "Symbol", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "8707", "Unicode hex": "2203" },
  { "Typeface name": "Symbol", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "37", "Unicode hex": "25" },
  { "Typeface name": "Symbol", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "38", "Unicode hex": "26" },
  { "Typeface name": "Symbol", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "8717", "Unicode hex": "220D" },
  { "Typeface name": "Symbol", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "40", "Unicode hex": "28" },
  { "Typeface name": "Symbol", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "41", "Unicode hex": "29" },
  { "Typeface name": "Symbol", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "42", "Unicode hex": "2A" },
  { "Typeface name": "Symbol", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "43", "Unicode hex": "2B" },
  { "Typeface name": "Symbol", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "44", "Unicode hex": "2C" },
  { "Typeface name": "Symbol", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "8722", "Unicode hex": "2212" },
  { "Typeface name": "Symbol", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "46", "Unicode hex": "2E" },
  { "Typeface name": "Symbol", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "47", "Unicode hex": "2F" },
  { "Typeface name": "Symbol", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "48", "Unicode hex": "30" },
  { "Typeface name": "Symbol", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "49", "Unicode hex": "31" },
  { "Typeface name": "Symbol", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "50", "Unicode hex": "32" },
  { "Typeface name": "Symbol", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "51", "Unicode hex": "33" },
  { "Typeface name": "Symbol", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "52", "Unicode hex": "34" },
  { "Typeface name": "Symbol", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "53", "Unicode hex": "35" },
  { "Typeface name": "Symbol", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "54", "Unicode hex": "36" },
  { "Typeface name": "Symbol", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "55", "Unicode hex": "37" },
  { "Typeface name": "Symbol", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "56", "Unicode hex": "38" },
  { "Typeface name": "Symbol", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "57", "Unicode hex": "39" },
  { "Typeface name": "Symbol", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "58", "Unicode hex": "3A" },
  { "Typeface name": "Symbol", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "59", "Unicode hex": "3B" },
  { "Typeface name": "Symbol", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "60", "Unicode hex": "3C" },
  { "Typeface name": "Symbol", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "61", "Unicode hex": "3D" },
  { "Typeface name": "Symbol", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "62", "Unicode hex": "3E" },
  { "Typeface name": "Symbol", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "63", "Unicode hex": "3F" },
  { "Typeface name": "Symbol", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "8773", "Unicode hex": "2245" },
  { "Typeface name": "Symbol", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "913", "Unicode hex": "391" },
  { "Typeface name": "Symbol", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "914", "Unicode hex": "392" },
  { "Typeface name": "Symbol", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "935", "Unicode hex": "3A7" },
  { "Typeface name": "Symbol", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "916", "Unicode hex": "394" },
  { "Typeface name": "Symbol", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "917", "Unicode hex": "395" },
  { "Typeface name": "Symbol", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "934", "Unicode hex": "3A6" },
  { "Typeface name": "Symbol", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "915", "Unicode hex": "393" },
  { "Typeface name": "Symbol", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "919", "Unicode hex": "397" },
  { "Typeface name": "Symbol", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "921", "Unicode hex": "399" },
  { "Typeface name": "Symbol", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "977", "Unicode hex": "3D1" },
  { "Typeface name": "Symbol", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "922", "Unicode hex": "39A" },
  { "Typeface name": "Symbol", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "923", "Unicode hex": "39B" },
  { "Typeface name": "Symbol", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "924", "Unicode hex": "39C" },
  { "Typeface name": "Symbol", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "925", "Unicode hex": "39D" },
  { "Typeface name": "Symbol", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "927", "Unicode hex": "39F" },
  { "Typeface name": "Symbol", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "928", "Unicode hex": "3A0" },
  { "Typeface name": "Symbol", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "920", "Unicode hex": "398" },
  { "Typeface name": "Symbol", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "929", "Unicode hex": "3A1" },
  { "Typeface name": "Symbol", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "931", "Unicode hex": "3A3" },
  { "Typeface name": "Symbol", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "932", "Unicode hex": "3A4" },
  { "Typeface name": "Symbol", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "933", "Unicode hex": "3A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "962", "Unicode hex": "3C2" },
  { "Typeface name": "Symbol", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "937", "Unicode hex": "3A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "926", "Unicode hex": "39E" },
  { "Typeface name": "Symbol", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "936", "Unicode hex": "3A8" },
  { "Typeface name": "Symbol", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "918", "Unicode hex": "396" },
  { "Typeface name": "Symbol", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "91", "Unicode hex": "5B" },
  { "Typeface name": "Symbol", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "8756", "Unicode hex": "2234" },
  { "Typeface name": "Symbol", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "93", "Unicode hex": "5D" },
  { "Typeface name": "Symbol", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "8869", "Unicode hex": "22A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "95", "Unicode hex": "5F" },
  { "Typeface name": "Symbol", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "8254", "Unicode hex": "203E" },
  { "Typeface name": "Symbol", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "945", "Unicode hex": "3B1" },
  { "Typeface name": "Symbol", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "946", "Unicode hex": "3B2" },
  { "Typeface name": "Symbol", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "967", "Unicode hex": "3C7" },
  { "Typeface name": "Symbol", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "948", "Unicode hex": "3B4" },
  { "Typeface name": "Symbol", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "949", "Unicode hex": "3B5" },
  { "Typeface name": "Symbol", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "966", "Unicode hex": "3C6" },
  { "Typeface name": "Symbol", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "947", "Unicode hex": "3B3" },
  { "Typeface name": "Symbol", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "951", "Unicode hex": "3B7" },
  { "Typeface name": "Symbol", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "953", "Unicode hex": "3B9" },
  { "Typeface name": "Symbol", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "981", "Unicode hex": "3D5" },
  { "Typeface name": "Symbol", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "954", "Unicode hex": "3BA" },
  { "Typeface name": "Symbol", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "955", "Unicode hex": "3BB" },
  { "Typeface name": "Symbol", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "956", "Unicode hex": "3BC" },
  { "Typeface name": "Symbol", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "957", "Unicode hex": "3BD" },
  { "Typeface name": "Symbol", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "959", "Unicode hex": "3BF" },
  { "Typeface name": "Symbol", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "960", "Unicode hex": "3C0" },
  { "Typeface name": "Symbol", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "952", "Unicode hex": "3B8" },
  { "Typeface name": "Symbol", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "961", "Unicode hex": "3C1" },
  { "Typeface name": "Symbol", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "963", "Unicode hex": "3C3" },
  { "Typeface name": "Symbol", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "964", "Unicode hex": "3C4" },
  { "Typeface name": "Symbol", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "965", "Unicode hex": "3C5" },
  { "Typeface name": "Symbol", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "982", "Unicode hex": "3D6" },
  { "Typeface name": "Symbol", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "969", "Unicode hex": "3C9" },
  { "Typeface name": "Symbol", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "958", "Unicode hex": "3BE" },
  { "Typeface name": "Symbol", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "968", "Unicode hex": "3C8" },
  { "Typeface name": "Symbol", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "950", "Unicode hex": "3B6" },
  { "Typeface name": "Symbol", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "123", "Unicode hex": "7B" },
  { "Typeface name": "Symbol", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "124", "Unicode hex": "7C" },
  { "Typeface name": "Symbol", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "125", "Unicode hex": "7D" },
  { "Typeface name": "Symbol", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "126", "Unicode hex": "7E" },
  { "Typeface name": "Symbol", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "8364", "Unicode hex": "20AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "978", "Unicode hex": "3D2" },
  { "Typeface name": "Symbol", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "8242", "Unicode hex": "2032" },
  { "Typeface name": "Symbol", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "8804", "Unicode hex": "2264" },
  { "Typeface name": "Symbol", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "8260", "Unicode hex": "2044" },
  { "Typeface name": "Symbol", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "8734", "Unicode hex": "221E" },
  { "Typeface name": "Symbol", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "402", "Unicode hex": "192" },
  { "Typeface name": "Symbol", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "9827", "Unicode hex": "2663" },
  { "Typeface name": "Symbol", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "9830", "Unicode hex": "2666" },
  { "Typeface name": "Symbol", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "9829", "Unicode hex": "2665" },
  { "Typeface name": "Symbol", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "9824", "Unicode hex": "2660" },
  { "Typeface name": "Symbol", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "8596", "Unicode hex": "2194" },
  { "Typeface name": "Symbol", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "8592", "Unicode hex": "2190" },
  { "Typeface name": "Symbol", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "8593", "Unicode hex": "2191" },
  { "Typeface name": "Symbol", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "8594", "Unicode hex": "2192" },
  { "Typeface name": "Symbol", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "8595", "Unicode hex": "2193" },
  { "Typeface name": "Symbol", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "176", "Unicode hex": "B0" },
  { "Typeface name": "Symbol", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "177", "Unicode hex": "B1" },
  { "Typeface name": "Symbol", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "8243", "Unicode hex": "2033" },
  { "Typeface name": "Symbol", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "8805", "Unicode hex": "2265" },
  { "Typeface name": "Symbol", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "215", "Unicode hex": "D7" },
  { "Typeface name": "Symbol", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "8733", "Unicode hex": "221D" },
  { "Typeface name": "Symbol", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "8706", "Unicode hex": "2202" },
  { "Typeface name": "Symbol", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "8226", "Unicode hex": "2022" },
  { "Typeface name": "Symbol", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "247", "Unicode hex": "F7" },
  { "Typeface name": "Symbol", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "8800", "Unicode hex": "2260" },
  { "Typeface name": "Symbol", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "8801", "Unicode hex": "2261" },
  { "Typeface name": "Symbol", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "8776", "Unicode hex": "2248" },
  { "Typeface name": "Symbol", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "8230", "Unicode hex": "2026" },
  { "Typeface name": "Symbol", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "9168", "Unicode hex": "23D0" },
  { "Typeface name": "Symbol", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "9135", "Unicode hex": "23AF" },
  { "Typeface name": "Symbol", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "8629", "Unicode hex": "21B5" },
  { "Typeface name": "Symbol", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "8501", "Unicode hex": "2135" },
  { "Typeface name": "Symbol", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "8465", "Unicode hex": "2111" },
  { "Typeface name": "Symbol", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "8476", "Unicode hex": "211C" },
  { "Typeface name": "Symbol", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "8472", "Unicode hex": "2118" },
  { "Typeface name": "Symbol", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "8855", "Unicode hex": "2297" },
  { "Typeface name": "Symbol", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "8853", "Unicode hex": "2295" },
  { "Typeface name": "Symbol", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "8709", "Unicode hex": "2205" },
  { "Typeface name": "Symbol", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "8745", "Unicode hex": "2229" },
  { "Typeface name": "Symbol", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "8746", "Unicode hex": "222A" },
  { "Typeface name": "Symbol", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "8835", "Unicode hex": "2283" },
  { "Typeface name": "Symbol", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "8839", "Unicode hex": "2287" },
  { "Typeface name": "Symbol", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "8836", "Unicode hex": "2284" },
  { "Typeface name": "Symbol", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "8834", "Unicode hex": "2282" },
  { "Typeface name": "Symbol", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "8838", "Unicode hex": "2286" },
  { "Typeface name": "Symbol", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "8712", "Unicode hex": "2208" },
  { "Typeface name": "Symbol", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "8713", "Unicode hex": "2209" },
  { "Typeface name": "Symbol", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "8736", "Unicode hex": "2220" },
  { "Typeface name": "Symbol", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "8711", "Unicode hex": "2207" },
  { "Typeface name": "Symbol", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "174", "Unicode hex": "AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "169", "Unicode hex": "A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "8482", "Unicode hex": "2122" },
  { "Typeface name": "Symbol", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "8719", "Unicode hex": "220F" },
  { "Typeface name": "Symbol", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "8730", "Unicode hex": "221A" },
  { "Typeface name": "Symbol", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "8901", "Unicode hex": "22C5" },
  { "Typeface name": "Symbol", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "172", "Unicode hex": "AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "8743", "Unicode hex": "2227" },
  { "Typeface name": "Symbol", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "8744", "Unicode hex": "2228" },
  { "Typeface name": "Symbol", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "8660", "Unicode hex": "21D4" },
  { "Typeface name": "Symbol", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "8656", "Unicode hex": "21D0" },
  { "Typeface name": "Symbol", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "8657", "Unicode hex": "21D1" },
  { "Typeface name": "Symbol", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "8658", "Unicode hex": "21D2" },
  { "Typeface name": "Symbol", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "8659", "Unicode hex": "21D3" },
  { "Typeface name": "Symbol", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "9674", "Unicode hex": "25CA" },
  { "Typeface name": "Symbol", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "12296", "Unicode hex": "3008" },
  { "Typeface name": "Symbol", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "174", "Unicode hex": "AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "169", "Unicode hex": "A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "8482", "Unicode hex": "2122" },
  { "Typeface name": "Symbol", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "8721", "Unicode hex": "2211" },
  { "Typeface name": "Symbol", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "9115", "Unicode hex": "239B" },
  { "Typeface name": "Symbol", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "9116", "Unicode hex": "239C" },
  { "Typeface name": "Symbol", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "9117", "Unicode hex": "239D" },
  { "Typeface name": "Symbol", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "9121", "Unicode hex": "23A1" },
  { "Typeface name": "Symbol", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "9122", "Unicode hex": "23A2" },
  { "Typeface name": "Symbol", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "9123", "Unicode hex": "23A3" },
  { "Typeface name": "Symbol", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "9127", "Unicode hex": "23A7" },
  { "Typeface name": "Symbol", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "9128", "Unicode hex": "23A8" },
  { "Typeface name": "Symbol", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "9129", "Unicode hex": "23A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "9130", "Unicode hex": "23AA" },
  { "Typeface name": "Symbol", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "63743", "Unicode hex": "F8FF" },
  { "Typeface name": "Symbol", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "12297", "Unicode hex": "3009" },
  { "Typeface name": "Symbol", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "8747", "Unicode hex": "222B" },
  { "Typeface name": "Symbol", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "8992", "Unicode hex": "2320" },
  { "Typeface name": "Symbol", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "9134", "Unicode hex": "23AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "8993", "Unicode hex": "2321" },
  { "Typeface name": "Symbol", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "9118", "Unicode hex": "239E" },
  { "Typeface name": "Symbol", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "9119", "Unicode hex": "239F" },
  { "Typeface name": "Symbol", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "9120", "Unicode hex": "23A0" },
  { "Typeface name": "Symbol", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "9124", "Unicode hex": "23A4" },
  { "Typeface name": "Symbol", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "9125", "Unicode hex": "23A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "9126", "Unicode hex": "23A6" },
  { "Typeface name": "Symbol", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "9131", "Unicode hex": "23AB" },
  { "Typeface name": "Symbol", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "9132", "Unicode hex": "23AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "9133", "Unicode hex": "23AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Webdings", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128375", "Unicode hex": "1F577" },
  { "Typeface name": "Webdings", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "128376", "Unicode hex": "1F578" },
  { "Typeface name": "Webdings", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "128370", "Unicode hex": "1F572" },
  { "Typeface name": "Webdings", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128374", "Unicode hex": "1F576" },
  { "Typeface name": "Webdings", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "127942", "Unicode hex": "1F3C6" },
  { "Typeface name": "Webdings", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "127894", "Unicode hex": "1F396" },
  { "Typeface name": "Webdings", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128391", "Unicode hex": "1F587" },
  { "Typeface name": "Webdings", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128488", "Unicode hex": "1F5E8" },
  { "Typeface name": "Webdings", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "128489", "Unicode hex": "1F5E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128496", "Unicode hex": "1F5F0" },
  { "Typeface name": "Webdings", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128497", "Unicode hex": "1F5F1" },
  { "Typeface name": "Webdings", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "127798", "Unicode hex": "1F336" },
  { "Typeface name": "Webdings", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "127895", "Unicode hex": "1F397" },
  { "Typeface name": "Webdings", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128638", "Unicode hex": "1F67E" },
  { "Typeface name": "Webdings", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128636", "Unicode hex": "1F67C" },
  { "Typeface name": "Webdings", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128469", "Unicode hex": "1F5D5" },
  { "Typeface name": "Webdings", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128470", "Unicode hex": "1F5D6" },
  { "Typeface name": "Webdings", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128471", "Unicode hex": "1F5D7" },
  { "Typeface name": "Webdings", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "9204", "Unicode hex": "23F4" },
  { "Typeface name": "Webdings", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "9205", "Unicode hex": "23F5" },
  { "Typeface name": "Webdings", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "9206", "Unicode hex": "23F6" },
  { "Typeface name": "Webdings", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "9207", "Unicode hex": "23F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "9194", "Unicode hex": "23EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "9193", "Unicode hex": "23E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "9198", "Unicode hex": "23EE" },
  { "Typeface name": "Webdings", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "9197", "Unicode hex": "23ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "9208", "Unicode hex": "23F8" },
  { "Typeface name": "Webdings", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "9209", "Unicode hex": "23F9" },
  { "Typeface name": "Webdings", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "9210", "Unicode hex": "23FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "128474", "Unicode hex": "1F5DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "128499", "Unicode hex": "1F5F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128736", "Unicode hex": "1F6E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "127959", "Unicode hex": "1F3D7" },
  { "Typeface name": "Webdings", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "127960", "Unicode hex": "1F3D8" },
  { "Typeface name": "Webdings", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "127961", "Unicode hex": "1F3D9" },
  { "Typeface name": "Webdings", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "127962", "Unicode hex": "1F3DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "127964", "Unicode hex": "1F3DC" },
  { "Typeface name": "Webdings", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "127981", "Unicode hex": "1F3ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "127963", "Unicode hex": "1F3DB" },
  { "Typeface name": "Webdings", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "127968", "Unicode hex": "1F3E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "127958", "Unicode hex": "1F3D6" },
  { "Typeface name": "Webdings", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "127965", "Unicode hex": "1F3DD" },
  { "Typeface name": "Webdings", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128739", "Unicode hex": "1F6E3" },
  { "Typeface name": "Webdings", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "128269", "Unicode hex": "1F50D" },
  { "Typeface name": "Webdings", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "127956", "Unicode hex": "1F3D4" },
  { "Typeface name": "Webdings", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128065", "Unicode hex": "1F441" },
  { "Typeface name": "Webdings", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "128066", "Unicode hex": "1F442" },
  { "Typeface name": "Webdings", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "127966", "Unicode hex": "1F3DE" },
  { "Typeface name": "Webdings", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "127957", "Unicode hex": "1F3D5" },
  { "Typeface name": "Webdings", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "128740", "Unicode hex": "1F6E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "127967", "Unicode hex": "1F3DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "128755", "Unicode hex": "1F6F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "128364", "Unicode hex": "1F56C" },
  { "Typeface name": "Webdings", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "128363", "Unicode hex": "1F56B" },
  { "Typeface name": "Webdings", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128360", "Unicode hex": "1F568" },
  { "Typeface name": "Webdings", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "128264", "Unicode hex": "1F508" },
  { "Typeface name": "Webdings", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "127892", "Unicode hex": "1F394" },
  { "Typeface name": "Webdings", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "127893", "Unicode hex": "1F395" },
  { "Typeface name": "Webdings", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "128492", "Unicode hex": "1F5EC" },
  { "Typeface name": "Webdings", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128637", "Unicode hex": "1F67D" },
  { "Typeface name": "Webdings", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "128493", "Unicode hex": "1F5ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "128490", "Unicode hex": "1F5EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "128491", "Unicode hex": "1F5EB" },
  { "Typeface name": "Webdings", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "11156", "Unicode hex": "2B94" },
  { "Typeface name": "Webdings", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "10004", "Unicode hex": "2714" },
  { "Typeface name": "Webdings", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "128690", "Unicode hex": "1F6B2" },
  { "Typeface name": "Webdings", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "11036", "Unicode hex": "2B1C" },
  { "Typeface name": "Webdings", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "128737", "Unicode hex": "1F6E1" },
  { "Typeface name": "Webdings", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "128230", "Unicode hex": "1F4E6" },
  { "Typeface name": "Webdings", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "128753", "Unicode hex": "1F6F1" },
  { "Typeface name": "Webdings", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "11035", "Unicode hex": "2B1B" },
  { "Typeface name": "Webdings", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "128657", "Unicode hex": "1F691" },
  { "Typeface name": "Webdings", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "128712", "Unicode hex": "1F6C8" },
  { "Typeface name": "Webdings", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "128745", "Unicode hex": "1F6E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "128752", "Unicode hex": "1F6F0" },
  { "Typeface name": "Webdings", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "128968", "Unicode hex": "1F7C8" },
  { "Typeface name": "Webdings", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "128372", "Unicode hex": "1F574" },
  { "Typeface name": "Webdings", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "11044", "Unicode hex": "2B24" },
  { "Typeface name": "Webdings", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "128741", "Unicode hex": "1F6E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "128660", "Unicode hex": "1F694" },
  { "Typeface name": "Webdings", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "128472", "Unicode hex": "1F5D8" },
  { "Typeface name": "Webdings", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "128473", "Unicode hex": "1F5D9" },
  { "Typeface name": "Webdings", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "10067", "Unicode hex": "2753" },
  { "Typeface name": "Webdings", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "128754", "Unicode hex": "1F6F2" },
  { "Typeface name": "Webdings", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "128647", "Unicode hex": "1F687" },
  { "Typeface name": "Webdings", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "128653", "Unicode hex": "1F68D" },
  { "Typeface name": "Webdings", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "9971", "Unicode hex": "26F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "10680", "Unicode hex": "29B8" },
  { "Typeface name": "Webdings", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "8854", "Unicode hex": "2296" },
  { "Typeface name": "Webdings", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "128685", "Unicode hex": "1F6AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "128494", "Unicode hex": "1F5EE" },
  { "Typeface name": "Webdings", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "9168", "Unicode hex": "23D0" },
  { "Typeface name": "Webdings", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128495", "Unicode hex": "1F5EF" },
  { "Typeface name": "Webdings", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128498", "Unicode hex": "1F5F2" },
  { "Typeface name": "Webdings", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "128697", "Unicode hex": "1F6B9" },
  { "Typeface name": "Webdings", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "128698", "Unicode hex": "1F6BA" },
  { "Typeface name": "Webdings", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "128713", "Unicode hex": "1F6C9" },
  { "Typeface name": "Webdings", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "128714", "Unicode hex": "1F6CA" },
  { "Typeface name": "Webdings", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "128700", "Unicode hex": "1F6BC" },
  { "Typeface name": "Webdings", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "128125", "Unicode hex": "1F47D" },
  { "Typeface name": "Webdings", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "127947", "Unicode hex": "1F3CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "9975", "Unicode hex": "26F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "127938", "Unicode hex": "1F3C2" },
  { "Typeface name": "Webdings", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "127948", "Unicode hex": "1F3CC" },
  { "Typeface name": "Webdings", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "127946", "Unicode hex": "1F3CA" },
  { "Typeface name": "Webdings", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "127940", "Unicode hex": "1F3C4" },
  { "Typeface name": "Webdings", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "127949", "Unicode hex": "1F3CD" },
  { "Typeface name": "Webdings", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "127950", "Unicode hex": "1F3CE" },
  { "Typeface name": "Webdings", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "128664", "Unicode hex": "1F698" },
  { "Typeface name": "Webdings", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "128480", "Unicode hex": "1F5E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "128738", "Unicode hex": "1F6E2" },
  { "Typeface name": "Webdings", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "128176", "Unicode hex": "1F4B0" },
  { "Typeface name": "Webdings", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "127991", "Unicode hex": "1F3F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "128179", "Unicode hex": "1F4B3" },
  { "Typeface name": "Webdings", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "128106", "Unicode hex": "1F46A" },
  { "Typeface name": "Webdings", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "128481", "Unicode hex": "1F5E1" },
  { "Typeface name": "Webdings", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128482", "Unicode hex": "1F5E2" },
  { "Typeface name": "Webdings", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "128483", "Unicode hex": "1F5E3" },
  { "Typeface name": "Webdings", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "10031", "Unicode hex": "272F" },
  { "Typeface name": "Webdings", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "128388", "Unicode hex": "1F584" },
  { "Typeface name": "Webdings", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128389", "Unicode hex": "1F585" },
  { "Typeface name": "Webdings", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128387", "Unicode hex": "1F583" },
  { "Typeface name": "Webdings", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128390", "Unicode hex": "1F586" },
  { "Typeface name": "Webdings", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "128441", "Unicode hex": "1F5B9" },
  { "Typeface name": "Webdings", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "128442", "Unicode hex": "1F5BA" },
  { "Typeface name": "Webdings", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "128443", "Unicode hex": "1F5BB" },
  { "Typeface name": "Webdings", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "128373", "Unicode hex": "1F575" },
  { "Typeface name": "Webdings", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "128368", "Unicode hex": "1F570" },
  { "Typeface name": "Webdings", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "128445", "Unicode hex": "1F5BD" },
  { "Typeface name": "Webdings", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "128446", "Unicode hex": "1F5BE" },
  { "Typeface name": "Webdings", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128203", "Unicode hex": "1F4CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128466", "Unicode hex": "1F5D2" },
  { "Typeface name": "Webdings", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128467", "Unicode hex": "1F5D3" },
  { "Typeface name": "Webdings", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "128366", "Unicode hex": "1F56E" },
  { "Typeface name": "Webdings", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "128218", "Unicode hex": "1F4DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128478", "Unicode hex": "1F5DE" },
  { "Typeface name": "Webdings", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128479", "Unicode hex": "1F5DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "128451", "Unicode hex": "1F5C3" },
  { "Typeface name": "Webdings", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128450", "Unicode hex": "1F5C2" },
  { "Typeface name": "Webdings", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "128444", "Unicode hex": "1F5BC" },
  { "Typeface name": "Webdings", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "127917", "Unicode hex": "1F3AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "127900", "Unicode hex": "1F39C" },
  { "Typeface name": "Webdings", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "127896", "Unicode hex": "1F398" },
  { "Typeface name": "Webdings", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "127897", "Unicode hex": "1F399" },
  { "Typeface name": "Webdings", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "127911", "Unicode hex": "1F3A7" },
  { "Typeface name": "Webdings", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "128191", "Unicode hex": "1F4BF" },
  { "Typeface name": "Webdings", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "127902", "Unicode hex": "1F39E" },
  { "Typeface name": "Webdings", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "128247", "Unicode hex": "1F4F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "127903", "Unicode hex": "1F39F" },
  { "Typeface name": "Webdings", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "127916", "Unicode hex": "1F3AC" },
  { "Typeface name": "Webdings", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "128253", "Unicode hex": "1F4FD" },
  { "Typeface name": "Webdings", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128249", "Unicode hex": "1F4F9" },
  { "Typeface name": "Webdings", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "128254", "Unicode hex": "1F4FE" },
  { "Typeface name": "Webdings", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "128251", "Unicode hex": "1F4FB" },
  { "Typeface name": "Webdings", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "127898", "Unicode hex": "1F39A" },
  { "Typeface name": "Webdings", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "127899", "Unicode hex": "1F39B" },
  { "Typeface name": "Webdings", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "128250", "Unicode hex": "1F4FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "128187", "Unicode hex": "1F4BB" },
  { "Typeface name": "Webdings", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "128421", "Unicode hex": "1F5A5" },
  { "Typeface name": "Webdings", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "128422", "Unicode hex": "1F5A6" },
  { "Typeface name": "Webdings", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "128423", "Unicode hex": "1F5A7" },
  { "Typeface name": "Webdings", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "128377", "Unicode hex": "1F579" },
  { "Typeface name": "Webdings", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "127918", "Unicode hex": "1F3AE" },
  { "Typeface name": "Webdings", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "128379", "Unicode hex": "1F57B" },
  { "Typeface name": "Webdings", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "128380", "Unicode hex": "1F57C" },
  { "Typeface name": "Webdings", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "128223", "Unicode hex": "1F4DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "128385", "Unicode hex": "1F581" },
  { "Typeface name": "Webdings", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "128384", "Unicode hex": "1F580" },
  { "Typeface name": "Webdings", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "128424", "Unicode hex": "1F5A8" },
  { "Typeface name": "Webdings", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128425", "Unicode hex": "1F5A9" },
  { "Typeface name": "Webdings", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128447", "Unicode hex": "1F5BF" },
  { "Typeface name": "Webdings", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128426", "Unicode hex": "1F5AA" },
  { "Typeface name": "Webdings", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128476", "Unicode hex": "1F5DC" },
  { "Typeface name": "Webdings", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128274", "Unicode hex": "1F512" },
  { "Typeface name": "Webdings", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128275", "Unicode hex": "1F513" },
  { "Typeface name": "Webdings", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128477", "Unicode hex": "1F5DD" },
  { "Typeface name": "Webdings", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128229", "Unicode hex": "1F4E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128228", "Unicode hex": "1F4E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128371", "Unicode hex": "1F573" },
  { "Typeface name": "Webdings", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "127779", "Unicode hex": "1F323" },
  { "Typeface name": "Webdings", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "127780", "Unicode hex": "1F324" },
  { "Typeface name": "Webdings", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "127781", "Unicode hex": "1F325" },
  { "Typeface name": "Webdings", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "127782", "Unicode hex": "1F326" },
  { "Typeface name": "Webdings", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "9729", "Unicode hex": "2601" },
  { "Typeface name": "Webdings", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "127784", "Unicode hex": "1F328" },
  { "Typeface name": "Webdings", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "127783", "Unicode hex": "1F327" },
  { "Typeface name": "Webdings", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "127785", "Unicode hex": "1F329" },
  { "Typeface name": "Webdings", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "127786", "Unicode hex": "1F32A" },
  { "Typeface name": "Webdings", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "127788", "Unicode hex": "1F32C" },
  { "Typeface name": "Webdings", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "127787", "Unicode hex": "1F32B" },
  { "Typeface name": "Webdings", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "127772", "Unicode hex": "1F31C" },
  { "Typeface name": "Webdings", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "127777", "Unicode hex": "1F321" },
  { "Typeface name": "Webdings", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "128715", "Unicode hex": "1F6CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "128719", "Unicode hex": "1F6CF" },
  { "Typeface name": "Webdings", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "127869", "Unicode hex": "1F37D" },
  { "Typeface name": "Webdings", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "127864", "Unicode hex": "1F378" },
  { "Typeface name": "Webdings", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "128718", "Unicode hex": "1F6CE" },
  { "Typeface name": "Webdings", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "128717", "Unicode hex": "1F6CD" },
  { "Typeface name": "Webdings", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "9413", "Unicode hex": "24C5" },
  { "Typeface name": "Webdings", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "9855", "Unicode hex": "267F" },
  { "Typeface name": "Webdings", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "128710", "Unicode hex": "1F6C6" },
  { "Typeface name": "Webdings", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "128392", "Unicode hex": "1F588" },
  { "Typeface name": "Webdings", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "127891", "Unicode hex": "1F393" },
  { "Typeface name": "Webdings", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "128484", "Unicode hex": "1F5E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "128485", "Unicode hex": "1F5E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "128486", "Unicode hex": "1F5E6" },
  { "Typeface name": "Webdings", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "128487", "Unicode hex": "1F5E7" },
  { "Typeface name": "Webdings", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "128746", "Unicode hex": "1F6EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "128063", "Unicode hex": "1F43F" },
  { "Typeface name": "Webdings", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "128038", "Unicode hex": "1F426" },
  { "Typeface name": "Webdings", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "128031", "Unicode hex": "1F41F" },
  { "Typeface name": "Webdings", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "128021", "Unicode hex": "1F415" },
  { "Typeface name": "Webdings", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "128008", "Unicode hex": "1F408" },
  { "Typeface name": "Webdings", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "128620", "Unicode hex": "1F66C" },
  { "Typeface name": "Webdings", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "128622", "Unicode hex": "1F66E" },
  { "Typeface name": "Webdings", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "128621", "Unicode hex": "1F66D" },
  { "Typeface name": "Webdings", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "128623", "Unicode hex": "1F66F" },
  { "Typeface name": "Webdings", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "128506", "Unicode hex": "1F5FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "127757", "Unicode hex": "1F30D" },
  { "Typeface name": "Webdings", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "127759", "Unicode hex": "1F30F" },
  { "Typeface name": "Webdings", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "127758", "Unicode hex": "1F30E" },
  { "Typeface name": "Webdings", "Dingbat dec": "255", "Dingbat hex": "FF", "Unicode dec": "128330", "Unicode hex": "1F54A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128393", "Unicode hex": "1F589" },
  { "Typeface name": "Wingdings", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "9986", "Unicode hex": "2702" },
  { "Typeface name": "Wingdings", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "9985", "Unicode hex": "2701" },
  { "Typeface name": "Wingdings", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128083", "Unicode hex": "1F453" },
  { "Typeface name": "Wingdings", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "128365", "Unicode hex": "1F56D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "128366", "Unicode hex": "1F56E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128367", "Unicode hex": "1F56F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128383", "Unicode hex": "1F57F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "9990", "Unicode hex": "2706" },
  { "Typeface name": "Wingdings", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128386", "Unicode hex": "1F582" },
  { "Typeface name": "Wingdings", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128387", "Unicode hex": "1F583" },
  { "Typeface name": "Wingdings", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "128234", "Unicode hex": "1F4EA" },
  { "Typeface name": "Wingdings", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "128235", "Unicode hex": "1F4EB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128236", "Unicode hex": "1F4EC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128237", "Unicode hex": "1F4ED" },
  { "Typeface name": "Wingdings", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128448", "Unicode hex": "1F5C0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128449", "Unicode hex": "1F5C1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128462", "Unicode hex": "1F5CE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "128463", "Unicode hex": "1F5CF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "128464", "Unicode hex": "1F5D0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "128452", "Unicode hex": "1F5C4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "8987", "Unicode hex": "231B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "128430", "Unicode hex": "1F5AE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "128432", "Unicode hex": "1F5B0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "128434", "Unicode hex": "1F5B2" },
  { "Typeface name": "Wingdings", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "128435", "Unicode hex": "1F5B3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "128436", "Unicode hex": "1F5B4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "128427", "Unicode hex": "1F5AB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "128428", "Unicode hex": "1F5AC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "9991", "Unicode hex": "2707" },
  { "Typeface name": "Wingdings", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "9997", "Unicode hex": "270D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128398", "Unicode hex": "1F58E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "9996", "Unicode hex": "270C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "128399", "Unicode hex": "1F58F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "128077", "Unicode hex": "1F44D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "128078", "Unicode hex": "1F44E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "9756", "Unicode hex": "261C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "9758", "Unicode hex": "261E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "9757", "Unicode hex": "261D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "9759", "Unicode hex": "261F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "128400", "Unicode hex": "1F590" },
  { "Typeface name": "Wingdings", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "9786", "Unicode hex": "263A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128528", "Unicode hex": "1F610" },
  { "Typeface name": "Wingdings", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "9785", "Unicode hex": "2639" },
  { "Typeface name": "Wingdings", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "128163", "Unicode hex": "1F4A3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128369", "Unicode hex": "1F571" },
  { "Typeface name": "Wingdings", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "127987", "Unicode hex": "1F3F3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "127985", "Unicode hex": "1F3F1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "9992", "Unicode hex": "2708" },
  { "Typeface name": "Wingdings", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9788", "Unicode hex": "263C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "127778", "Unicode hex": "1F322" },
  { "Typeface name": "Wingdings", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "10052", "Unicode hex": "2744" },
  { "Typeface name": "Wingdings", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "128326", "Unicode hex": "1F546" },
  { "Typeface name": "Wingdings", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "10014", "Unicode hex": "271E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128328", "Unicode hex": "1F548" },
  { "Typeface name": "Wingdings", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "10016", "Unicode hex": "2720" },
  { "Typeface name": "Wingdings", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "10017", "Unicode hex": "2721" },
  { "Typeface name": "Wingdings", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "9770", "Unicode hex": "262A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "9775", "Unicode hex": "262F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128329", "Unicode hex": "1F549" },
  { "Typeface name": "Wingdings", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "9784", "Unicode hex": "2638" },
  { "Typeface name": "Wingdings", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "9800", "Unicode hex": "2648" },
  { "Typeface name": "Wingdings", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "9801", "Unicode hex": "2649" },
  { "Typeface name": "Wingdings", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "9802", "Unicode hex": "264A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "9803", "Unicode hex": "264B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "9804", "Unicode hex": "264C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "9805", "Unicode hex": "264D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "9806", "Unicode hex": "264E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "9807", "Unicode hex": "264F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "9808", "Unicode hex": "2650" },
  { "Typeface name": "Wingdings", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "9809", "Unicode hex": "2651" },
  { "Typeface name": "Wingdings", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "9810", "Unicode hex": "2652" },
  { "Typeface name": "Wingdings", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "9811", "Unicode hex": "2653" },
  { "Typeface name": "Wingdings", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "128624", "Unicode hex": "1F670" },
  { "Typeface name": "Wingdings", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "128629", "Unicode hex": "1F675" },
  { "Typeface name": "Wingdings", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "9899", "Unicode hex": "26AB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "128318", "Unicode hex": "1F53E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "9724", "Unicode hex": "25FC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "128911", "Unicode hex": "1F78F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "128912", "Unicode hex": "1F790" },
  { "Typeface name": "Wingdings", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "10065", "Unicode hex": "2751" },
  { "Typeface name": "Wingdings", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "10066", "Unicode hex": "2752" },
  { "Typeface name": "Wingdings", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "128927", "Unicode hex": "1F79F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "10731", "Unicode hex": "29EB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "9670", "Unicode hex": "25C6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "10070", "Unicode hex": "2756" },
  { "Typeface name": "Wingdings", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "11049", "Unicode hex": "2B29" },
  { "Typeface name": "Wingdings", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "8999", "Unicode hex": "2327" },
  { "Typeface name": "Wingdings", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "11193", "Unicode hex": "2BB9" },
  { "Typeface name": "Wingdings", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "8984", "Unicode hex": "2318" },
  { "Typeface name": "Wingdings", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "127989", "Unicode hex": "1F3F5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "127990", "Unicode hex": "1F3F6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128630", "Unicode hex": "1F676" },
  { "Typeface name": "Wingdings", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128631", "Unicode hex": "1F677" },
  { "Typeface name": "Wingdings", "Dingbat dec": "127", "Dingbat hex": "7F", "Unicode dec": "9647", "Unicode hex": "25AF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "127243", "Unicode hex": "1F10B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "10112", "Unicode hex": "2780" },
  { "Typeface name": "Wingdings", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "10113", "Unicode hex": "2781" },
  { "Typeface name": "Wingdings", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "10114", "Unicode hex": "2782" },
  { "Typeface name": "Wingdings", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "10115", "Unicode hex": "2783" },
  { "Typeface name": "Wingdings", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "10116", "Unicode hex": "2784" },
  { "Typeface name": "Wingdings", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "10117", "Unicode hex": "2785" },
  { "Typeface name": "Wingdings", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "10118", "Unicode hex": "2786" },
  { "Typeface name": "Wingdings", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "10119", "Unicode hex": "2787" },
  { "Typeface name": "Wingdings", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "10120", "Unicode hex": "2788" },
  { "Typeface name": "Wingdings", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "10121", "Unicode hex": "2789" },
  { "Typeface name": "Wingdings", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "127244", "Unicode hex": "1F10C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "10122", "Unicode hex": "278A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "10123", "Unicode hex": "278B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "10124", "Unicode hex": "278C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "10125", "Unicode hex": "278D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "10126", "Unicode hex": "278E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "10127", "Unicode hex": "278F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "10128", "Unicode hex": "2790" },
  { "Typeface name": "Wingdings", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "10129", "Unicode hex": "2791" },
  { "Typeface name": "Wingdings", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "10130", "Unicode hex": "2792" },
  { "Typeface name": "Wingdings", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "10131", "Unicode hex": "2793" },
  { "Typeface name": "Wingdings", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128610", "Unicode hex": "1F662" },
  { "Typeface name": "Wingdings", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "128608", "Unicode hex": "1F660" },
  { "Typeface name": "Wingdings", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "128609", "Unicode hex": "1F661" },
  { "Typeface name": "Wingdings", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "128611", "Unicode hex": "1F663" },
  { "Typeface name": "Wingdings", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128606", "Unicode hex": "1F65E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128604", "Unicode hex": "1F65C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128605", "Unicode hex": "1F65D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "128607", "Unicode hex": "1F65F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "8729", "Unicode hex": "2219" },
  { "Typeface name": "Wingdings", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "8226", "Unicode hex": "2022" },
  { "Typeface name": "Wingdings", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "11037", "Unicode hex": "2B1D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "11096", "Unicode hex": "2B58" },
  { "Typeface name": "Wingdings", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "128902", "Unicode hex": "1F786" },
  { "Typeface name": "Wingdings", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "128904", "Unicode hex": "1F788" },
  { "Typeface name": "Wingdings", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128906", "Unicode hex": "1F78A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128907", "Unicode hex": "1F78B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128319", "Unicode hex": "1F53F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "9642", "Unicode hex": "25AA" },
  { "Typeface name": "Wingdings", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "128910", "Unicode hex": "1F78E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128961", "Unicode hex": "1F7C1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128965", "Unicode hex": "1F7C5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "9733", "Unicode hex": "2605" },
  { "Typeface name": "Wingdings", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128971", "Unicode hex": "1F7CB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "128975", "Unicode hex": "1F7CF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "128979", "Unicode hex": "1F7D3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "128977", "Unicode hex": "1F7D1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "11216", "Unicode hex": "2BD0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "8982", "Unicode hex": "2316" },
  { "Typeface name": "Wingdings", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "11214", "Unicode hex": "2BCE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "11215", "Unicode hex": "2BCF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "11217", "Unicode hex": "2BD1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "10026", "Unicode hex": "272A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "10032", "Unicode hex": "2730" },
  { "Typeface name": "Wingdings", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "128336", "Unicode hex": "1F550" },
  { "Typeface name": "Wingdings", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "128337", "Unicode hex": "1F551" },
  { "Typeface name": "Wingdings", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128338", "Unicode hex": "1F552" },
  { "Typeface name": "Wingdings", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "128339", "Unicode hex": "1F553" },
  { "Typeface name": "Wingdings", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "128340", "Unicode hex": "1F554" },
  { "Typeface name": "Wingdings", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "128341", "Unicode hex": "1F555" },
  { "Typeface name": "Wingdings", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "128342", "Unicode hex": "1F556" },
  { "Typeface name": "Wingdings", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "128343", "Unicode hex": "1F557" },
  { "Typeface name": "Wingdings", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "128344", "Unicode hex": "1F558" },
  { "Typeface name": "Wingdings", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "128345", "Unicode hex": "1F559" },
  { "Typeface name": "Wingdings", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "128346", "Unicode hex": "1F55A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "128347", "Unicode hex": "1F55B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "11184", "Unicode hex": "2BB0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "11185", "Unicode hex": "2BB1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "11186", "Unicode hex": "2BB2" },
  { "Typeface name": "Wingdings", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "11187", "Unicode hex": "2BB3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "11188", "Unicode hex": "2BB4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "11189", "Unicode hex": "2BB5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "11190", "Unicode hex": "2BB6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "11191", "Unicode hex": "2BB7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128618", "Unicode hex": "1F66A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128619", "Unicode hex": "1F66B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128597", "Unicode hex": "1F655" },
  { "Typeface name": "Wingdings", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128596", "Unicode hex": "1F654" },
  { "Typeface name": "Wingdings", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128599", "Unicode hex": "1F657" },
  { "Typeface name": "Wingdings", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128598", "Unicode hex": "1F656" },
  { "Typeface name": "Wingdings", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128592", "Unicode hex": "1F650" },
  { "Typeface name": "Wingdings", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128593", "Unicode hex": "1F651" },
  { "Typeface name": "Wingdings", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128594", "Unicode hex": "1F652" },
  { "Typeface name": "Wingdings", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128595", "Unicode hex": "1F653" },
  { "Typeface name": "Wingdings", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "9003", "Unicode hex": "232B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "8998", "Unicode hex": "2326" },
  { "Typeface name": "Wingdings", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "11160", "Unicode hex": "2B98" },
  { "Typeface name": "Wingdings", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "11162", "Unicode hex": "2B9A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "11161", "Unicode hex": "2B99" },
  { "Typeface name": "Wingdings", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "11163", "Unicode hex": "2B9B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "11144", "Unicode hex": "2B88" },
  { "Typeface name": "Wingdings", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "11146", "Unicode hex": "2B8A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "11145", "Unicode hex": "2B89" },
  { "Typeface name": "Wingdings", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "11147", "Unicode hex": "2B8B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "129128", "Unicode hex": "1F868" },
  { "Typeface name": "Wingdings", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "129130", "Unicode hex": "1F86A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "129129", "Unicode hex": "1F869" },
  { "Typeface name": "Wingdings", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "129131", "Unicode hex": "1F86B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "129132", "Unicode hex": "1F86C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "129133", "Unicode hex": "1F86D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "129135", "Unicode hex": "1F86F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "129134", "Unicode hex": "1F86E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "129144", "Unicode hex": "1F878" },
  { "Typeface name": "Wingdings", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "129146", "Unicode hex": "1F87A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "129145", "Unicode hex": "1F879" },
  { "Typeface name": "Wingdings", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "129147", "Unicode hex": "1F87B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "129148", "Unicode hex": "1F87C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "129149", "Unicode hex": "1F87D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "129151", "Unicode hex": "1F87F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "129150", "Unicode hex": "1F87E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "8678", "Unicode hex": "21E6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "8680", "Unicode hex": "21E8" },
  { "Typeface name": "Wingdings", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "8679", "Unicode hex": "21E7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "8681", "Unicode hex": "21E9" },
  { "Typeface name": "Wingdings", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "11012", "Unicode hex": "2B04" },
  { "Typeface name": "Wingdings", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "8691", "Unicode hex": "21F3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "11009", "Unicode hex": "2B01" },
  { "Typeface name": "Wingdings", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "11008", "Unicode hex": "2B00" },
  { "Typeface name": "Wingdings", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "11011", "Unicode hex": "2B03" },
  { "Typeface name": "Wingdings", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "11010", "Unicode hex": "2B02" },
  { "Typeface name": "Wingdings", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "129196", "Unicode hex": "1F8AC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "129197", "Unicode hex": "1F8AD" },
  { "Typeface name": "Wingdings", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "128502", "Unicode hex": "1F5F6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "10003", "Unicode hex": "2713" },
  { "Typeface name": "Wingdings", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "128503", "Unicode hex": "1F5F7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "128505", "Unicode hex": "1F5F9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128394", "Unicode hex": "1F58A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "128395", "Unicode hex": "1F58B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "128396", "Unicode hex": "1F58C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128397", "Unicode hex": "1F58D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "9988", "Unicode hex": "2704" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "9984", "Unicode hex": "2700" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128382", "Unicode hex": "1F57E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128381", "Unicode hex": "1F57D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "128453", "Unicode hex": "1F5C5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128454", "Unicode hex": "1F5C6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128455", "Unicode hex": "1F5C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "128456", "Unicode hex": "1F5C8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "128457", "Unicode hex": "1F5C9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128458", "Unicode hex": "1F5CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128459", "Unicode hex": "1F5CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128460", "Unicode hex": "1F5CC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128461", "Unicode hex": "1F5CD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128203", "Unicode hex": "1F4CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "128465", "Unicode hex": "1F5D1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "128468", "Unicode hex": "1F5D4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "128437", "Unicode hex": "1F5B5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "128438", "Unicode hex": "1F5B6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "128439", "Unicode hex": "1F5B7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "128440", "Unicode hex": "1F5B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "128429", "Unicode hex": "1F5AD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "128431", "Unicode hex": "1F5AF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "128433", "Unicode hex": "1F5B1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "128402", "Unicode hex": "1F592" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "128403", "Unicode hex": "1F593" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "128408", "Unicode hex": "1F598" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "128409", "Unicode hex": "1F599" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128410", "Unicode hex": "1F59A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "128411", "Unicode hex": "1F59B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "128072", "Unicode hex": "1F448" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "128073", "Unicode hex": "1F449" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "128412", "Unicode hex": "1F59C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "128413", "Unicode hex": "1F59D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "128414", "Unicode hex": "1F59E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "128415", "Unicode hex": "1F59F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "128416", "Unicode hex": "1F5A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "128417", "Unicode hex": "1F5A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "128070", "Unicode hex": "1F446" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128071", "Unicode hex": "1F447" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "128418", "Unicode hex": "1F5A2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "128419", "Unicode hex": "1F5A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128401", "Unicode hex": "1F591" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "128500", "Unicode hex": "1F5F4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "128504", "Unicode hex": "1F5F8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "128501", "Unicode hex": "1F5F5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9745", "Unicode hex": "2611" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "11197", "Unicode hex": "2BBD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "9746", "Unicode hex": "2612" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "11198", "Unicode hex": "2BBE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "11199", "Unicode hex": "2BBF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128711", "Unicode hex": "1F6C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "10680", "Unicode hex": "29B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "128625", "Unicode hex": "1F671" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "128628", "Unicode hex": "1F674" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "128626", "Unicode hex": "1F672" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128627", "Unicode hex": "1F673" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "8253", "Unicode hex": "203D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "128633", "Unicode hex": "1F679" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "128634", "Unicode hex": "1F67A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "128635", "Unicode hex": "1F67B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "128614", "Unicode hex": "1F666" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "128612", "Unicode hex": "1F664" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "128613", "Unicode hex": "1F665" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "128615", "Unicode hex": "1F667" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "128602", "Unicode hex": "1F65A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "128600", "Unicode hex": "1F658" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "128601", "Unicode hex": "1F659" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "128603", "Unicode hex": "1F65B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "9450", "Unicode hex": "24EA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "9312", "Unicode hex": "2460" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "9313", "Unicode hex": "2461" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "9314", "Unicode hex": "2462" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "9315", "Unicode hex": "2463" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "9316", "Unicode hex": "2464" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "9317", "Unicode hex": "2465" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "9318", "Unicode hex": "2466" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "9319", "Unicode hex": "2467" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "9320", "Unicode hex": "2468" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "9321", "Unicode hex": "2469" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "9471", "Unicode hex": "24FF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "10102", "Unicode hex": "2776" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "10103", "Unicode hex": "2777" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "10104", "Unicode hex": "2778" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "10105", "Unicode hex": "2779" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "10106", "Unicode hex": "277A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "10107", "Unicode hex": "277B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "10108", "Unicode hex": "277C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "10109", "Unicode hex": "277D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "10110", "Unicode hex": "277E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "10111", "Unicode hex": "277F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "9737", "Unicode hex": "2609" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "127765", "Unicode hex": "1F315" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "9789", "Unicode hex": "263D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "9790", "Unicode hex": "263E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "11839", "Unicode hex": "2E3F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "10013", "Unicode hex": "271D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "128327", "Unicode hex": "1F547" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "128348", "Unicode hex": "1F55C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "128349", "Unicode hex": "1F55D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "128350", "Unicode hex": "1F55E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "128351", "Unicode hex": "1F55F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "128352", "Unicode hex": "1F560" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "128353", "Unicode hex": "1F561" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "128354", "Unicode hex": "1F562" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "128355", "Unicode hex": "1F563" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "128356", "Unicode hex": "1F564" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "128357", "Unicode hex": "1F565" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "128358", "Unicode hex": "1F566" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "128359", "Unicode hex": "1F567" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "128616", "Unicode hex": "1F668" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "128617", "Unicode hex": "1F669" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "8901", "Unicode hex": "22C5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128900", "Unicode hex": "1F784" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "10625", "Unicode hex": "2981" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "9679", "Unicode hex": "25CF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "9675", "Unicode hex": "25CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128901", "Unicode hex": "1F785" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128903", "Unicode hex": "1F787" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128905", "Unicode hex": "1F789" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "8857", "Unicode hex": "2299" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "10687", "Unicode hex": "29BF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "128908", "Unicode hex": "1F78C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "128909", "Unicode hex": "1F78D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "9726", "Unicode hex": "25FE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "9632", "Unicode hex": "25A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "9633", "Unicode hex": "25A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128913", "Unicode hex": "1F791" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128914", "Unicode hex": "1F792" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128915", "Unicode hex": "1F793" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "128916", "Unicode hex": "1F794" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "9635", "Unicode hex": "25A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128917", "Unicode hex": "1F795" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128918", "Unicode hex": "1F796" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "128919", "Unicode hex": "1F797" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128920", "Unicode hex": "1F798" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "11049", "Unicode hex": "2B29" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "11045", "Unicode hex": "2B25" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "9671", "Unicode hex": "25C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "128922", "Unicode hex": "1F79A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "9672", "Unicode hex": "25C8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "128923", "Unicode hex": "1F79B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "128924", "Unicode hex": "1F79C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "128925", "Unicode hex": "1F79D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "128926", "Unicode hex": "1F79E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "11050", "Unicode hex": "2B2A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "11047", "Unicode hex": "2B27" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "9674", "Unicode hex": "25CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128928", "Unicode hex": "1F7A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "9686", "Unicode hex": "25D6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "9687", "Unicode hex": "25D7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "11210", "Unicode hex": "2BCA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "11211", "Unicode hex": "2BCB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "11200", "Unicode hex": "2BC0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "11201", "Unicode hex": "2BC1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "11039", "Unicode hex": "2B1F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "11202", "Unicode hex": "2BC2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "11043", "Unicode hex": "2B23" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "11042", "Unicode hex": "2B22" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "11203", "Unicode hex": "2BC3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "11204", "Unicode hex": "2BC4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "128929", "Unicode hex": "1F7A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "128930", "Unicode hex": "1F7A2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "128931", "Unicode hex": "1F7A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "128932", "Unicode hex": "1F7A4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "128933", "Unicode hex": "1F7A5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128934", "Unicode hex": "1F7A6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128935", "Unicode hex": "1F7A7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128936", "Unicode hex": "1F7A8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128937", "Unicode hex": "1F7A9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128938", "Unicode hex": "1F7AA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128939", "Unicode hex": "1F7AB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128940", "Unicode hex": "1F7AC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128941", "Unicode hex": "1F7AD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128942", "Unicode hex": "1F7AE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128943", "Unicode hex": "1F7AF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "128944", "Unicode hex": "1F7B0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "128945", "Unicode hex": "1F7B1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "128946", "Unicode hex": "1F7B2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "128947", "Unicode hex": "1F7B3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "128948", "Unicode hex": "1F7B4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "128949", "Unicode hex": "1F7B5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "128950", "Unicode hex": "1F7B6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "128951", "Unicode hex": "1F7B7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "128952", "Unicode hex": "1F7B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "128953", "Unicode hex": "1F7B9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "128954", "Unicode hex": "1F7BA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "128955", "Unicode hex": "1F7BB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "128956", "Unicode hex": "1F7BC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "128957", "Unicode hex": "1F7BD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "128958", "Unicode hex": "1F7BE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "128959", "Unicode hex": "1F7BF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "128960", "Unicode hex": "1F7C0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "128962", "Unicode hex": "1F7C2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "128964", "Unicode hex": "1F7C4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "128966", "Unicode hex": "1F7C6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "128969", "Unicode hex": "1F7C9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "128970", "Unicode hex": "1F7CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "10038", "Unicode hex": "2736" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "128972", "Unicode hex": "1F7CC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "128974", "Unicode hex": "1F7CE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "128976", "Unicode hex": "1F7D0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "128978", "Unicode hex": "1F7D2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "10041", "Unicode hex": "2739" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "128963", "Unicode hex": "1F7C3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "128967", "Unicode hex": "1F7C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "10031", "Unicode hex": "272F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "128973", "Unicode hex": "1F7CD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "128980", "Unicode hex": "1F7D4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "11212", "Unicode hex": "2BCC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "11213", "Unicode hex": "2BCD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "8251", "Unicode hex": "203B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "8258", "Unicode hex": "2042" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "11104", "Unicode hex": "2B60" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "11106", "Unicode hex": "2B62" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "11105", "Unicode hex": "2B61" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "11107", "Unicode hex": "2B63" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "11110", "Unicode hex": "2B66" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "11111", "Unicode hex": "2B67" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "11113", "Unicode hex": "2B69" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "11112", "Unicode hex": "2B68" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "11120", "Unicode hex": "2B70" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "11122", "Unicode hex": "2B72" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "11121", "Unicode hex": "2B71" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "11123", "Unicode hex": "2B73" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "11126", "Unicode hex": "2B76" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "11128", "Unicode hex": "2B78" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "11131", "Unicode hex": "2B7B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "11133", "Unicode hex": "2B7D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "11108", "Unicode hex": "2B64" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "11109", "Unicode hex": "2B65" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "11114", "Unicode hex": "2B6A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "11116", "Unicode hex": "2B6C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "11115", "Unicode hex": "2B6B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "11117", "Unicode hex": "2B6D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "11085", "Unicode hex": "2B4D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "11168", "Unicode hex": "2BA0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "11169", "Unicode hex": "2BA1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "11170", "Unicode hex": "2BA2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "11171", "Unicode hex": "2BA3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "11172", "Unicode hex": "2BA4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "11173", "Unicode hex": "2BA5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "11174", "Unicode hex": "2BA6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "11175", "Unicode hex": "2BA7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "11152", "Unicode hex": "2B90" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "11153", "Unicode hex": "2B91" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "11154", "Unicode hex": "2B92" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "11155", "Unicode hex": "2B93" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "11136", "Unicode hex": "2B80" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "11139", "Unicode hex": "2B83" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "11134", "Unicode hex": "2B7E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "11135", "Unicode hex": "2B7F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "11140", "Unicode hex": "2B84" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "11142", "Unicode hex": "2B86" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "11141", "Unicode hex": "2B85" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "11143", "Unicode hex": "2B87" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "11151", "Unicode hex": "2B8F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "11149", "Unicode hex": "2B8D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "11150", "Unicode hex": "2B8E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "11148", "Unicode hex": "2B8C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "11118", "Unicode hex": "2B6E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "11119", "Unicode hex": "2B6F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9099", "Unicode hex": "238B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "8996", "Unicode hex": "2324" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "8963", "Unicode hex": "2303" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "8997", "Unicode hex": "2325" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "9251", "Unicode hex": "2423" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "9085", "Unicode hex": "237D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "8682", "Unicode hex": "21EA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "11192", "Unicode hex": "2BB8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "129184", "Unicode hex": "1F8A0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "129185", "Unicode hex": "1F8A1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "129186", "Unicode hex": "1F8A2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "129187", "Unicode hex": "1F8A3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "129188", "Unicode hex": "1F8A4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "129189", "Unicode hex": "1F8A5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "129190", "Unicode hex": "1F8A6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "129191", "Unicode hex": "1F8A7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "129192", "Unicode hex": "1F8A8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "129193", "Unicode hex": "1F8A9" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "129194", "Unicode hex": "1F8AA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "129195", "Unicode hex": "1F8AB" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "129104", "Unicode hex": "1F850" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "129106", "Unicode hex": "1F852" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "129105", "Unicode hex": "1F851" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "129107", "Unicode hex": "1F853" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "129108", "Unicode hex": "1F854" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "129109", "Unicode hex": "1F855" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "129111", "Unicode hex": "1F857" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "129110", "Unicode hex": "1F856" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "129112", "Unicode hex": "1F858" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "129113", "Unicode hex": "1F859" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "9650", "Unicode hex": "25B2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "9660", "Unicode hex": "25BC" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "9651", "Unicode hex": "25B3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "9661", "Unicode hex": "25BD" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "9664", "Unicode hex": "25C0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "9654", "Unicode hex": "25B6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "9665", "Unicode hex": "25C1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "9655", "Unicode hex": "25B7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "9699", "Unicode hex": "25E3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "9698", "Unicode hex": "25E2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "9700", "Unicode hex": "25E4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "9701", "Unicode hex": "25E5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "128896", "Unicode hex": "1F780" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128898", "Unicode hex": "1F782" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128897", "Unicode hex": "1F781" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "128899", "Unicode hex": "1F783" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "11205", "Unicode hex": "2BC5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "11206", "Unicode hex": "2BC6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "11207", "Unicode hex": "2BC7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "11208", "Unicode hex": "2BC8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "11164", "Unicode hex": "2B9C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "11166", "Unicode hex": "2B9E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "11165", "Unicode hex": "2B9D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "11167", "Unicode hex": "2B9F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "129040", "Unicode hex": "1F810" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "129042", "Unicode hex": "1F812" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "129041", "Unicode hex": "1F811" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "129043", "Unicode hex": "1F813" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "129044", "Unicode hex": "1F814" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "129046", "Unicode hex": "1F816" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "129045", "Unicode hex": "1F815" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "129047", "Unicode hex": "1F817" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "129048", "Unicode hex": "1F818" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "129050", "Unicode hex": "1F81A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "129049", "Unicode hex": "1F819" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "129051", "Unicode hex": "1F81B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "129052", "Unicode hex": "1F81C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "129054", "Unicode hex": "1F81E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "129053", "Unicode hex": "1F81D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "129055", "Unicode hex": "1F81F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "129024", "Unicode hex": "1F800" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "129026", "Unicode hex": "1F802" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "129025", "Unicode hex": "1F801" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "129027", "Unicode hex": "1F803" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "129028", "Unicode hex": "1F804" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "129030", "Unicode hex": "1F806" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "129029", "Unicode hex": "1F805" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "129031", "Unicode hex": "1F807" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "129032", "Unicode hex": "1F808" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "129034", "Unicode hex": "1F80A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "129033", "Unicode hex": "1F809" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "129035", "Unicode hex": "1F80B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "129056", "Unicode hex": "1F820" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "129058", "Unicode hex": "1F822" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "129060", "Unicode hex": "1F824" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "129062", "Unicode hex": "1F826" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "129064", "Unicode hex": "1F828" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "129066", "Unicode hex": "1F82A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "129068", "Unicode hex": "1F82C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "129180", "Unicode hex": "1F89C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "129181", "Unicode hex": "1F89D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "129182", "Unicode hex": "1F89E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "129183", "Unicode hex": "1F89F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "129070", "Unicode hex": "1F82E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "129072", "Unicode hex": "1F830" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "129074", "Unicode hex": "1F832" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "129076", "Unicode hex": "1F834" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "129078", "Unicode hex": "1F836" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "129080", "Unicode hex": "1F838" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "129082", "Unicode hex": "1F83A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "129081", "Unicode hex": "1F839" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "129083", "Unicode hex": "1F83B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "129176", "Unicode hex": "1F898" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "129178", "Unicode hex": "1F89A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "129177", "Unicode hex": "1F899" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "129179", "Unicode hex": "1F89B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "129084", "Unicode hex": "1F83C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "129086", "Unicode hex": "1F83E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "129085", "Unicode hex": "1F83D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "129087", "Unicode hex": "1F83F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "129088", "Unicode hex": "1F840" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "129090", "Unicode hex": "1F842" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "129089", "Unicode hex": "1F841" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "129091", "Unicode hex": "1F843" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "129092", "Unicode hex": "1F844" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "129094", "Unicode hex": "1F846" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "129093", "Unicode hex": "1F845" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "129095", "Unicode hex": "1F847" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "11176", "Unicode hex": "2BA8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "11177", "Unicode hex": "2BA9" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "11178", "Unicode hex": "2BAA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "11179", "Unicode hex": "2BAB" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "11180", "Unicode hex": "2BAC" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "11181", "Unicode hex": "2BAD" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "11182", "Unicode hex": "2BAE" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "11183", "Unicode hex": "2BAF" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "129120", "Unicode hex": "1F860" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "129122", "Unicode hex": "1F862" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "129121", "Unicode hex": "1F861" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "129123", "Unicode hex": "1F863" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "129124", "Unicode hex": "1F864" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "129125", "Unicode hex": "1F865" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "129127", "Unicode hex": "1F867" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "129126", "Unicode hex": "1F866" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "129136", "Unicode hex": "1F870" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "129138", "Unicode hex": "1F872" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "129137", "Unicode hex": "1F871" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "129139", "Unicode hex": "1F873" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "129140", "Unicode hex": "1F874" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "129141", "Unicode hex": "1F875" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "129143", "Unicode hex": "1F877" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "129142", "Unicode hex": "1F876" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "129152", "Unicode hex": "1F880" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "129154", "Unicode hex": "1F882" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "129153", "Unicode hex": "1F881" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "129155", "Unicode hex": "1F883" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "129156", "Unicode hex": "1F884" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "129157", "Unicode hex": "1F885" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "129159", "Unicode hex": "1F887" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "129158", "Unicode hex": "1F886" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "129168", "Unicode hex": "1F890" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "129170", "Unicode hex": "1F892" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "129169", "Unicode hex": "1F891" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "129171", "Unicode hex": "1F893" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "129172", "Unicode hex": "1F894" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "129174", "Unicode hex": "1F896" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "129173", "Unicode hex": "1F895" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "129175", "Unicode hex": "1F897" }
];
sd.default = C6;
var A6 = re && re.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(On, "__esModule", { value: !0 });
On.hex = On.dec = On.codePoint = void 0;
var F6 = A6(sd), Ub = {}, k6 = String.fromCodePoint ? String.fromCodePoint : N6;
for (var us = 0, q0 = F6.default; us < q0.length; us++) {
  var as = q0[us], z0 = parseInt(as["Unicode dec"], 10), S6 = {
    codePoint: z0,
    string: k6(z0)
  };
  Ub[as["Typeface name"].toUpperCase() + "_" + as["Dingbat dec"]] = S6;
}
function fd(e, t) {
  return Ub[e.toUpperCase() + "_" + t];
}
On.codePoint = fd;
function B6(e, t) {
  return fd(e, parseInt(t, 10));
}
On.dec = B6;
function I6(e, t) {
  return fd(e, parseInt(t, 16));
}
On.hex = I6;
function N6(e) {
  if (e <= 65535)
    return String.fromCharCode(e);
  var t = Math.floor((e - 65536) / 1024) + 55296, n = (e - 65536) % 1024 + 56320;
  return String.fromCharCode(t, n);
}
var dd = {};
dd.uriToZipEntryName = R6;
dd.replaceFragment = O6;
function R6(e, t) {
  return t.charAt(0) === "/" ? t.substr(1) : e + "/" + t;
}
function O6(e, t) {
  var n = e.indexOf("#");
  return n !== -1 && (e = e.substring(0, n)), e + "#" + t;
}
cd.createBodyReader = W6;
cd._readNumberingProperties = Cb;
var $0 = On, wt = Ne, Ue = ce, Tb = vt.Result, fn = vt.warning, L6 = yn, j0 = dd;
function W6(e) {
  return {
    readXmlElement: function(t) {
      return new H0(e).readXmlElement(t);
    },
    readXmlElements: function(t) {
      return new H0(e).readXmlElements(t);
    }
  };
}
function H0(e) {
  var t = [], n = [], r = [], i = e.relationships, u = e.contentTypes, a = e.docxFile, o = e.files, c = e.numbering, s = e.styles;
  function f(N) {
    var q = N.map(m);
    return X0(q);
  }
  function m(N) {
    if (N.type === "element") {
      var q = C[N.name];
      if (q)
        return q(N);
      if (!Object.prototype.hasOwnProperty.call(P6, N.name)) {
        var Z = fn("An unrecognised element was ignored: " + N.name);
        return si([Z]);
      }
    }
    return fi();
  }
  function b(N) {
    return y(N).map(function(q) {
      return {
        type: "paragraphProperties",
        styleId: q.styleId,
        styleName: q.name,
        alignment: N.firstOrEmpty("w:jc").attributes["w:val"],
        numbering: Cb(q.styleId, N.firstOrEmpty("w:numPr"), c),
        indent: p(N.firstOrEmpty("w:ind"))
      };
    });
  }
  function p(N) {
    return {
      start: N.attributes["w:start"] || N.attributes["w:left"],
      end: N.attributes["w:end"] || N.attributes["w:right"],
      firstLine: N.attributes["w:firstLine"],
      hanging: N.attributes["w:hanging"]
    };
  }
  function l(N) {
    return x(N).map(function(q) {
      var Z = N.firstOrEmpty("w:sz").attributes["w:val"], ne = /^[0-9]+$/.test(Z) ? parseInt(Z, 10) / 2 : null;
      return {
        type: "runProperties",
        styleId: q.styleId,
        styleName: q.name,
        verticalAlignment: N.firstOrEmpty("w:vertAlign").attributes["w:val"],
        font: N.firstOrEmpty("w:rFonts").attributes["w:ascii"],
        fontSize: ne,
        isBold: D(N.first("w:b")),
        isUnderline: g(N.first("w:u")),
        isItalic: D(N.first("w:i")),
        isStrikethrough: D(N.first("w:strike")),
        isAllCaps: D(N.first("w:caps")),
        isSmallCaps: D(N.first("w:smallCaps")),
        highlight: d(N.firstOrEmpty("w:highlight").attributes["w:val"])
      };
    });
  }
  function g(N) {
    if (N) {
      var q = N.attributes["w:val"];
      return q !== void 0 && q !== "false" && q !== "0" && q !== "none";
    } else
      return !1;
  }
  function D(N) {
    if (N) {
      var q = N.attributes["w:val"];
      return q !== "false" && q !== "0";
    } else
      return !1;
  }
  function h(N) {
    return N !== "false" && N !== "0";
  }
  function d(N) {
    return !N || N === "none" ? null : N;
  }
  function y(N) {
    return _(N, "w:pStyle", "Paragraph", s.findParagraphStyleById);
  }
  function x(N) {
    return _(N, "w:rStyle", "Run", s.findCharacterStyleById);
  }
  function v(N) {
    return _(N, "w:tblStyle", "Table", s.findTableStyleById);
  }
  function _(N, q, Z, ne) {
    var oe = [], de = N.first(q), Le = null, ut = null;
    if (de && (Le = de.attributes["w:val"], Le)) {
      var Hn = ne(Le);
      Hn ? ut = Hn.name : oe.push(K(Z, Le));
    }
    return ku({ styleId: Le, name: ut }, oe);
  }
  function w(N) {
    var q = N.attributes["w:fldCharType"];
    if (q === "begin")
      t.push({ type: "begin", fldChar: N }), n = [];
    else if (q === "end") {
      var Z = t.pop();
      if (Z.type === "begin" && (Z = B(Z)), Z.type === "checkbox")
        return at(Ue.checkbox({
          checked: Z.checked
        }));
    } else if (q === "separate") {
      var ne = t.pop(), oe = B(ne);
      t.push(oe);
    }
    return fi();
  }
  function A() {
    var N = wt.last(t.filter(function(q) {
      return q.type === "hyperlink";
    }));
    return N ? N.options : null;
  }
  function B(N) {
    return P(
      n.join(""),
      N.type === "begin" ? N.fldChar : L6.emptyElement
    );
  }
  function P(N, q) {
    var Z = /\s*HYPERLINK "(.*)"/.exec(N);
    if (Z)
      return { type: "hyperlink", options: { href: Z[1] } };
    var ne = /\s*HYPERLINK\s+\\l\s+"(.*)"/.exec(N);
    if (ne)
      return { type: "hyperlink", options: { anchor: ne[1] } };
    var oe = /\s*FORMCHECKBOX\s*/.exec(N);
    if (oe) {
      var de = q.firstOrEmpty("w:ffData").firstOrEmpty("w:checkBox"), Le = de.first("w:checked"), ut = Le == null ? D(de.first("w:default")) : D(Le);
      return { type: "checkbox", checked: ut };
    }
    return { type: "unknown" };
  }
  function L(N) {
    return n.push(N.text()), fi();
  }
  function I(N) {
    var q = N.attributes["w:font"], Z = N.attributes["w:char"], ne = $0.hex(q, Z);
    return ne == null && /^F0..$/.test(Z) && (ne = $0.hex(q, Z.substring(2))), ne == null ? si([fn(
      "A w:sym element with an unsupported character was ignored: char " + Z + " in font " + q
    )]) : at(new Ue.Text(ne.string));
  }
  function z(N) {
    return function(q) {
      var Z = q.attributes["w:id"];
      return at(new Ue.NoteReference({
        noteType: N,
        noteId: Z
      }));
    };
  }
  function H(N) {
    return at(Ue.commentReference({
      commentId: N.attributes["w:id"]
    }));
  }
  function G(N) {
    return f(N.children);
  }
  var C = {
    "w:p": function(N) {
      var q = N.firstOrEmpty("w:pPr"), Z = !!q.firstOrEmpty("w:rPr").first("w:del");
      if (Z)
        return N.children.forEach(function(oe) {
          r.push(oe);
        }), fi();
      var ne = N.children;
      return r.length > 0 && (ne = r.concat(ne), r = []), Ve.map(
        b(q),
        f(ne),
        function(oe, de) {
          return new Ue.Paragraph(de, oe);
        }
      ).insertExtra();
    },
    "w:r": function(N) {
      return Ve.map(
        l(N.firstOrEmpty("w:rPr")),
        f(N.children),
        function(q, Z) {
          var ne = A();
          return ne !== null && (Z = [new Ue.Hyperlink(Z, ne)]), new Ue.Run(Z, q);
        }
      );
    },
    "w:fldChar": w,
    "w:instrText": L,
    "w:t": function(N) {
      return at(new Ue.Text(N.text()));
    },
    "w:tab": function(N) {
      return at(new Ue.Tab());
    },
    "w:noBreakHyphen": function() {
      return at(new Ue.Text("‑"));
    },
    "w:softHyphen": function(N) {
      return at(new Ue.Text("­"));
    },
    "w:sym": I,
    "w:hyperlink": function(N) {
      var q = N.attributes["r:id"], Z = N.attributes["w:anchor"];
      return f(N.children).map(function(ne) {
        function oe(Le) {
          var ut = N.attributes["w:tgtFrame"] || null;
          return new Ue.Hyperlink(
            ne,
            wt.extend({ targetFrame: ut }, Le)
          );
        }
        if (q) {
          var de = i.findTargetByRelationshipId(q);
          return Z && (de = j0.replaceFragment(de, Z)), oe({ href: de });
        } else return Z ? oe({ anchor: Z }) : ne;
      });
    },
    "w:tbl": U,
    "w:tr": k,
    "w:tc": R,
    "w:footnoteReference": z("footnote"),
    "w:endnoteReference": z("endnote"),
    "w:commentReference": H,
    "w:br": function(N) {
      var q = N.attributes["w:type"];
      return q == null || q === "textWrapping" ? at(Ue.lineBreak) : q === "page" ? at(Ue.pageBreak) : q === "column" ? at(Ue.columnBreak) : si([fn("Unsupported break type: " + q)]);
    },
    "w:bookmarkStart": function(N) {
      var q = N.attributes["w:name"];
      return q === "_GoBack" ? fi() : at(new Ue.BookmarkStart({ name: q }));
    },
    "mc:AlternateContent": function(N) {
      return G(N.first("mc:Fallback"));
    },
    "w:sdt": function(N) {
      var q = N.firstOrEmpty("w:sdtPr").first("wordml:checkbox");
      if (q) {
        var Z = q.first("wordml:checked"), ne = !!Z && h(
          Z.attributes["wordml:val"]
        );
        return at(Ue.checkbox({
          checked: ne
        }));
      } else
        return f(N.firstOrEmpty("w:sdtContent").children);
    },
    "w:ins": G,
    "w:object": G,
    "w:smartTag": G,
    "w:drawing": G,
    "w:pict": function(N) {
      return G(N).toExtra();
    },
    "v:roundrect": G,
    "v:shape": G,
    "v:textbox": G,
    "w:txbxContent": G,
    "wp:inline": $,
    "wp:anchor": $,
    "v:imagedata": T,
    "v:group": G,
    "v:rect": G
  };
  return {
    readXmlElement: m,
    readXmlElements: f
  };
  function U(N) {
    var q = E(N.firstOrEmpty("w:tblPr"));
    return f(N.children).flatMap(S).flatMap(function(Z) {
      return q.map(function(ne) {
        return Ue.Table(Z, ne);
      });
    });
  }
  function E(N) {
    return v(N).map(function(q) {
      return {
        styleId: q.styleId,
        styleName: q.name
      };
    });
  }
  function k(N) {
    var q = N.firstOrEmpty("w:trPr"), Z = !!q.first("w:tblHeader");
    return f(N.children).map(function(ne) {
      return Ue.TableRow(ne, { isHeader: Z });
    });
  }
  function R(N) {
    return f(N.children).map(function(q) {
      var Z = N.firstOrEmpty("w:tcPr"), ne = Z.firstOrEmpty("w:gridSpan").attributes["w:val"], oe = ne ? parseInt(ne, 10) : 1, de = Ue.TableCell(q, { colSpan: oe });
      return de._vMerge = M(Z), de;
    });
  }
  function M(N) {
    var q = N.first("w:vMerge");
    if (q) {
      var Z = q.attributes["w:val"];
      return Z === "continue" || !Z;
    } else
      return null;
  }
  function S(N) {
    var q = wt.any(N, function(oe) {
      return oe.type !== Ue.types.tableRow;
    });
    if (q)
      return ku(N, [fn(
        "unexpected non-row element in table, cell merging may be incorrect"
      )]);
    var Z = wt.any(N, function(oe) {
      return wt.any(oe.children, function(de) {
        return de.type !== Ue.types.tableCell;
      });
    });
    if (Z)
      return ku(N, [fn(
        "unexpected non-cell element in table row, cell merging may be incorrect"
      )]);
    var ne = {};
    return N.forEach(function(oe) {
      var de = 0;
      oe.children.forEach(function(Le) {
        Le._vMerge && ne[de] ? ne[de].rowSpan++ : (ne[de] = Le, Le._vMerge = !1), de += Le.colSpan;
      });
    }), N.forEach(function(oe) {
      oe.children = oe.children.filter(function(de) {
        return !de._vMerge;
      }), oe.children.forEach(function(de) {
        delete de._vMerge;
      });
    }), at(N);
  }
  function $(N) {
    var q = N.getElementsByTagName("a:graphic").getElementsByTagName("a:graphicData").getElementsByTagName("pic:pic").getElementsByTagName("pic:blipFill").getElementsByTagName("a:blip");
    return X0(q.map(ee.bind(null, N)));
  }
  function ee(N, q) {
    var Z = N.first("wp:docPr").attributes, ne = te(Z.descr) ? Z.title : Z.descr, oe = Q(q);
    return oe === null ? si([fn("Could not find image file for a:blip element")]) : X(oe, ne);
  }
  function te(N) {
    return N == null || /^\s*$/.test(N);
  }
  function Q(N) {
    var q = N.attributes["r:embed"], Z = N.attributes["r:link"];
    if (q)
      return F(q);
    if (Z) {
      var ne = i.findTargetByRelationshipId(Z);
      return {
        path: ne,
        read: o.read.bind(o, ne)
      };
    } else
      return null;
  }
  function T(N) {
    var q = N.attributes["r:id"];
    return q ? X(
      F(q),
      N.attributes["o:title"]
    ) : si([fn("A v:imagedata element without a relationship ID was ignored")]);
  }
  function F(N) {
    var q = j0.uriToZipEntryName("word", i.findTargetByRelationshipId(N));
    return {
      path: q,
      read: a.read.bind(a, q)
    };
  }
  function X(N, q) {
    var Z = u.findContentType(N.path), ne = Ue.Image({
      readImage: N.read,
      altText: q,
      contentType: Z
    }), oe = M6[Z] ? [] : fn("Image of type " + Z + " is unlikely to display in web browsers");
    return ku(ne, oe);
  }
  function K(N, q) {
    return fn(
      N + " style with ID " + q + " was referenced but not defined in the document"
    );
  }
}
function Cb(e, t, n) {
  var r = t.firstOrEmpty("w:ilvl").attributes["w:val"], i = t.firstOrEmpty("w:numId").attributes["w:val"];
  if (r !== void 0 && i !== void 0)
    return n.findLevel(i, r);
  if (e != null) {
    var u = n.findLevelByParagraphStyleId(e);
    if (u != null)
      return u;
  }
  return null;
}
var M6 = {
  "image/png": !0,
  "image/gif": !0,
  "image/jpeg": !0,
  "image/svg+xml": !0,
  "image/tiff": !0
}, P6 = {
  "office-word:wrap": !0,
  "v:shadow": !0,
  "v:shapetype": !0,
  "w:annotationRef": !0,
  "w:bookmarkEnd": !0,
  "w:sectPr": !0,
  "w:proofErr": !0,
  "w:lastRenderedPageBreak": !0,
  "w:commentRangeStart": !0,
  "w:commentRangeEnd": !0,
  "w:del": !0,
  "w:footnoteRef": !0,
  "w:endnoteRef": !0,
  "w:pPr": !0,
  "w:rPr": !0,
  "w:tblPr": !0,
  "w:tblGrid": !0,
  "w:trPr": !0,
  "w:tcPr": !0
};
function si(e) {
  return new Ve(null, null, e);
}
function fi() {
  return new Ve(null);
}
function at(e) {
  return new Ve(e);
}
function ku(e, t) {
  return new Ve(e, null, t);
}
function Ve(e, t, n) {
  this.value = e || [], this.extra = t || [], this._result = new Tb({
    element: this.value,
    extra: t
  }, n), this.messages = this._result.messages;
}
Ve.prototype.toExtra = function() {
  return new Ve(null, no(this.extra, this.value), this.messages);
};
Ve.prototype.insertExtra = function() {
  var e = this.extra;
  return e && e.length ? new Ve(no(this.value, e), null, this.messages) : this;
};
Ve.prototype.map = function(e) {
  var t = this._result.map(function(n) {
    return e(n.element);
  });
  return new Ve(t.value, this.extra, t.messages);
};
Ve.prototype.flatMap = function(e) {
  var t = this._result.flatMap(function(n) {
    return e(n.element)._result;
  });
  return new Ve(t.value.element, no(this.extra, t.value.extra), t.messages);
};
Ve.map = function(e, t, n) {
  return new Ve(
    n(e.value, t.value),
    no(e.extra, t.extra),
    e.messages.concat(t.messages)
  );
};
function X0(e) {
  var t = Tb.combine(wt.pluck(e, "_result"));
  return new Ve(
    wt.flatten(wt.pluck(t.value, "element")),
    wt.filter(wt.flatten(wt.pluck(t.value, "extra")), q6),
    t.messages
  );
}
function no(e, t) {
  return wt.flatten([e, t]);
}
function q6(e) {
  return e;
}
var Ab = {};
Ab.DocumentXmlReader = j6;
var z6 = ce, $6 = vt.Result;
function j6(e) {
  var t = e.bodyReader;
  function n(r) {
    var i = r.first("w:body");
    if (i == null)
      throw new Error("Could not find the body element: are you sure this is a docx file?");
    var u = t.readXmlElements(i.children).map(function(a) {
      return new z6.Document(a, {
        notes: e.notes,
        comments: e.comments
      });
    });
    return new $6(u.value, u.messages);
  }
  return {
    convertXmlToDocument: n
  };
}
var ro = {};
ro.readRelationships = H6;
ro.defaultValue = new ld([]);
ro.Relationships = ld;
function H6(e) {
  var t = [];
  return e.children.forEach(function(n) {
    if (n.name === "relationships:Relationship") {
      var r = {
        relationshipId: n.attributes.Id,
        target: n.attributes.Target,
        type: n.attributes.Type
      };
      t.push(r);
    }
  }), new ld(t);
}
function ld(e) {
  var t = {};
  e.forEach(function(r) {
    t[r.relationshipId] = r.target;
  });
  var n = {};
  return e.forEach(function(r) {
    n[r.type] || (n[r.type] = []), n[r.type].push(r.target);
  }), {
    findTargetByRelationshipId: function(r) {
      return t[r];
    },
    findTargetsByType: function(r) {
      return n[r] || [];
    }
  };
}
var hd = {};
hd.readContentTypesFromXml = Z6;
var X6 = {
  png: "png",
  gif: "gif",
  jpeg: "jpeg",
  jpg: "jpeg",
  tif: "tiff",
  tiff: "tiff",
  bmp: "bmp"
};
hd.defaultContentTypes = Fb({}, {});
function Z6(e) {
  var t = {}, n = {};
  return e.children.forEach(function(r) {
    if (r.name === "content-types:Default" && (t[r.attributes.Extension] = r.attributes.ContentType), r.name === "content-types:Override") {
      var i = r.attributes.PartName;
      i.charAt(0) === "/" && (i = i.substring(1)), n[i] = r.attributes.ContentType;
    }
  }), Fb(n, t);
}
function Fb(e, t) {
  return {
    findContentType: function(n) {
      var r = e[n];
      if (r)
        return r;
      var i = n.split("."), u = i[i.length - 1];
      if (t.hasOwnProperty(u))
        return t[u];
      var a = X6[u.toLowerCase()];
      return a ? "image/" + a : null;
    }
  };
}
var io = {}, Su = Ne;
io.readNumberingXml = V6;
io.Numbering = pd;
io.defaultNumbering = new pd({}, {});
function pd(e, t, n) {
  var r = Su.flatten(Su.values(t).map(function(o) {
    return Su.values(o.levels);
  })), i = Su.indexBy(
    r.filter(function(o) {
      return o.paragraphStyleId != null;
    }),
    "paragraphStyleId"
  );
  function u(o, c) {
    var s = e[o];
    if (s) {
      var f = t[s.abstractNumId];
      if (f) {
        if (f.numStyleLink == null)
          return t[s.abstractNumId].levels[c];
        var m = n.findNumberingStyleById(f.numStyleLink);
        return u(m.numId, c);
      } else return null;
    } else
      return null;
  }
  function a(o) {
    return i[o] || null;
  }
  return {
    findLevel: u,
    findLevelByParagraphStyleId: a
  };
}
function V6(e, t) {
  if (!t || !t.styles)
    throw new Error("styles is missing");
  var n = G6(e), r = K6(e);
  return new pd(r, n, t.styles);
}
function G6(e) {
  var t = {};
  return e.getElementsByTagName("w:abstractNum").forEach(function(n) {
    var r = n.attributes["w:abstractNumId"];
    t[r] = Y6(n);
  }), t;
}
function Y6(e) {
  var t = {};
  e.getElementsByTagName("w:lvl").forEach(function(r) {
    var i = r.attributes["w:ilvl"], u = r.firstOrEmpty("w:numFmt").attributes["w:val"], a = r.firstOrEmpty("w:pStyle").attributes["w:val"];
    t[i] = {
      isOrdered: u !== "bullet",
      level: i,
      paragraphStyleId: a
    };
  });
  var n = e.firstOrEmpty("w:numStyleLink").attributes["w:val"];
  return { levels: t, numStyleLink: n };
}
function K6(e) {
  var t = {};
  return e.getElementsByTagName("w:num").forEach(function(n) {
    var r = n.attributes["w:numId"], i = n.first("w:abstractNumId").attributes["w:val"];
    t[r] = { abstractNumId: i };
  }), t;
}
var uo = {};
uo.readStylesXml = Q6;
uo.Styles = Oi;
uo.defaultStyles = new Oi({}, {});
function Oi(e, t, n, r) {
  return {
    findParagraphStyleById: function(i) {
      return e[i];
    },
    findCharacterStyleById: function(i) {
      return t[i];
    },
    findTableStyleById: function(i) {
      return n[i];
    },
    findNumberingStyleById: function(i) {
      return r[i];
    }
  };
}
Oi.EMPTY = new Oi({}, {}, {}, {});
function Q6(e) {
  var t = {}, n = {}, r = {}, i = {}, u = {
    paragraph: t,
    character: n,
    table: r
  };
  return e.getElementsByTagName("w:style").forEach(function(a) {
    var o = J6(a);
    if (o.type === "numbering")
      i[o.styleId] = t8(a);
    else {
      var c = u[o.type];
      c && (c[o.styleId] = o);
    }
  }), new Oi(t, n, r, i);
}
function J6(e) {
  var t = e.attributes["w:type"], n = e.attributes["w:styleId"], r = e8(e);
  return { type: t, styleId: n, name: r };
}
function e8(e) {
  var t = e.first("w:name");
  return t ? t.attributes["w:val"] : null;
}
function t8(e) {
  var t = e.firstOrEmpty("w:pPr").firstOrEmpty("w:numPr").firstOrEmpty("w:numId").attributes["w:val"];
  return { numId: t };
}
var gd = {}, n8 = ce, r8 = vt.Result;
gd.createFootnotesReader = kb.bind(re, "footnote");
gd.createEndnotesReader = kb.bind(re, "endnote");
function kb(e, t) {
  function n(u) {
    return r8.combine(u.getElementsByTagName("w:" + e).filter(r).map(i));
  }
  function r(u) {
    var a = u.attributes["w:type"];
    return a !== "continuationSeparator" && a !== "separator";
  }
  function i(u) {
    var a = u.attributes["w:id"];
    return t.readXmlElements(u.children).map(function(o) {
      return n8.Note({ noteType: e, noteId: a, body: o });
    });
  }
  return n;
}
var Sb = {}, i8 = ce, u8 = vt.Result;
function a8(e) {
  function t(r) {
    return u8.combine(r.getElementsByTagName("w:comment").map(n));
  }
  function n(r) {
    var i = r.attributes["w:id"];
    function u(a) {
      return (r.attributes[a] || "").trim() || null;
    }
    return e.readXmlElements(r.children).map(function(a) {
      return i8.comment({
        commentId: i,
        body: a,
        authorName: u("w:author"),
        authorInitials: u("w:initials")
      });
    });
  }
  return t;
}
Sb.createCommentsReader = a8;
var bd = {}, ao = { exports: {} };
function Bb(e) {
  return e.charAt(0) === "/";
}
function Ib(e) {
  var t = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/, n = t.exec(e), r = n[1] || "", i = !!(r && r.charAt(1) !== ":");
  return !!(n[2] || i);
}
ao.exports = process.platform === "win32" ? Ib : Bb;
ao.exports.posix = Bb;
ao.exports.win32 = Ib;
var o8 = ao.exports, Z0 = qs, c8 = Km, s8 = Qm, f8 = $i.dirname, d8 = $i.resolve, l8 = o8, hi = je;
bd.Files = md;
bd.uriToPath = Nb;
function md(e) {
  function t(r, i) {
    return n(r).then(function(u) {
      return p8(u, i).caught(function(a) {
        var o = "could not open external image: '" + r + "' (document directory: '" + e + `')
` + a.message;
        return hi.reject(new Error(o));
      });
    });
  }
  function n(r) {
    var i = Nb(r);
    return l8(i) ? hi.resolve(i) : e ? hi.resolve(d8(e, i)) : hi.reject(new Error("could not find external image '" + r + "', path of input document is unknown"));
  }
  return {
    read: t
  };
}
function h8(e) {
  return new md(f8(e));
}
md.relativeToFile = h8;
var p8 = hi.promisify(Z0.readFile.bind(Z0));
function Nb(e, t) {
  t || (t = s8.platform());
  var n = c8.parse(e);
  if (g8(n) || b8(n)) {
    var r = decodeURIComponent(n.path);
    return t === "win32" && /^\/[a-z]:/i.test(r) ? r.slice(1) : r;
  } else
    throw new Error("Could not convert URI to path: " + e);
}
function g8(e) {
  return e.protocol === "file:" && (!e.host || e.host === "localhost");
}
function b8(e) {
  return !e.protocol && !e.host;
}
Af.read = _8;
Af._findPartPaths = Ob;
var m8 = je, y8 = ce, os = vt.Result, ia = Gi, Rb = Vf.readXmlFromZipFile, D8 = cd.createBodyReader, x8 = Ab.DocumentXmlReader, Mr = ro, V0 = hd, G0 = io, Y0 = uo, K0 = gd, v8 = Sb, Q0 = bd.Files;
function _8(e, t) {
  return t = t || {}, m8.props({
    contentTypes: w8(e),
    partPaths: Ob(e),
    docxFile: e,
    files: t.path ? Q0.relativeToFile(t.path) : new Q0(null)
  }).also(function(n) {
    return {
      styles: T8(e, n.partPaths.styles)
    };
  }).also(function(n) {
    return {
      numbering: U8(e, n.partPaths.numbering, n.styles)
    };
  }).also(function(n) {
    return {
      footnotes: Bu(n.partPaths.footnotes, n, function(r, i) {
        return i ? K0.createFootnotesReader(r)(i) : new os([]);
      }),
      endnotes: Bu(n.partPaths.endnotes, n, function(r, i) {
        return i ? K0.createEndnotesReader(r)(i) : new os([]);
      }),
      comments: Bu(n.partPaths.comments, n, function(r, i) {
        return i ? v8.createCommentsReader(r)(i) : new os([]);
      })
    };
  }).also(function(n) {
    return {
      notes: n.footnotes.flatMap(function(r) {
        return n.endnotes.map(function(i) {
          return new y8.Notes(r.concat(i));
        });
      })
    };
  }).then(function(n) {
    return Bu(n.partPaths.mainDocument, n, function(r, i) {
      return n.notes.flatMap(function(u) {
        return n.comments.flatMap(function(a) {
          var o = new x8({
            bodyReader: r,
            notes: u,
            comments: a
          });
          return o.convertXmlToDocument(i);
        });
      });
    });
  });
}
function Ob(e) {
  return C8(e).then(function(t) {
    var n = J0({
      docxFile: e,
      relationships: t,
      relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      basePath: "",
      fallbackPath: "word/document.xml"
    });
    if (!e.exists(n))
      throw new Error("Could not find main document part. Are you sure this is a valid .docx file?");
    return ni({
      filename: Lb(n),
      readElement: Mr.readRelationships,
      defaultValue: Mr.defaultValue
    })(e).then(function(r) {
      function i(u) {
        return J0({
          docxFile: e,
          relationships: r,
          relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/" + u,
          basePath: ia.splitPath(n).dirname,
          fallbackPath: "word/" + u + ".xml"
        });
      }
      return {
        mainDocument: n,
        comments: i("comments"),
        endnotes: i("endnotes"),
        footnotes: i("footnotes"),
        numbering: i("numbering"),
        styles: i("styles")
      };
    });
  });
}
function J0(e) {
  var t = e.docxFile, n = e.relationships, r = e.relationshipType, i = e.basePath, u = e.fallbackPath, a = n.findTargetsByType(r), o = a.map(function(s) {
    return E8(ia.joinPath(i, s), "/");
  }), c = o.filter(function(s) {
    return t.exists(s);
  });
  return c.length === 0 ? u : c[0];
}
function E8(e, t) {
  return e.substring(0, t.length) === t ? e.substring(t.length) : e;
}
function ni(e) {
  return function(t) {
    return Rb(t, e.filename).then(function(n) {
      return n ? e.readElement(n) : e.defaultValue;
    });
  };
}
function Bu(e, t, n) {
  var r = ni({
    filename: Lb(e),
    readElement: Mr.readRelationships,
    defaultValue: Mr.defaultValue
  });
  return r(t.docxFile).then(function(i) {
    var u = new D8({
      relationships: i,
      contentTypes: t.contentTypes,
      docxFile: t.docxFile,
      numbering: t.numbering,
      styles: t.styles,
      files: t.files
    });
    return Rb(t.docxFile, e).then(function(a) {
      return n(u, a);
    });
  });
}
function Lb(e) {
  var t = ia.splitPath(e);
  return ia.joinPath(t.dirname, "_rels", t.basename + ".rels");
}
var w8 = ni({
  filename: "[Content_Types].xml",
  readElement: V0.readContentTypesFromXml,
  defaultValue: V0.defaultContentTypes
});
function U8(e, t, n) {
  return ni({
    filename: t,
    readElement: function(r) {
      return G0.readNumberingXml(r, { styles: n });
    },
    defaultValue: G0.defaultNumbering
  })(e);
}
function T8(e, t) {
  return ni({
    filename: t,
    readElement: Y0.readStylesXml,
    defaultValue: Y0.defaultStyles
  })(e);
}
var C8 = ni({
  filename: "_rels/.rels",
  readElement: Mr.readRelationships,
  defaultValue: Mr.defaultValue
}), yd = {}, A8 = Ne, F8 = je, Li = yn;
yd.writeStyleMap = S8;
yd.readStyleMap = N8;
var k8 = "http://schemas.zwobble.org/mammoth/style-map", ua = "mammoth/style-map", Wb = "/" + ua;
function S8(e, t) {
  return e.write(ua, t), B8(e).then(function() {
    return I8(e);
  });
}
function B8(e) {
  var t = "word/_rels/document.xml.rels", n = "http://schemas.openxmlformats.org/package/2006/relationships", r = "{" + n + "}Relationship";
  return e.read(t, "utf8").then(Li.readString).then(function(i) {
    var u = i.children;
    Mb(u, r, "Id", {
      Id: "rMammothStyleMap",
      Type: k8,
      Target: Wb
    });
    var a = { "": n };
    return e.write(t, Li.writeString(i, a));
  });
}
function I8(e) {
  var t = "[Content_Types].xml", n = "http://schemas.openxmlformats.org/package/2006/content-types", r = "{" + n + "}Override";
  return e.read(t, "utf8").then(Li.readString).then(function(i) {
    var u = i.children;
    Mb(u, r, "PartName", {
      PartName: Wb,
      ContentType: "text/prs.mammoth.style-map"
    });
    var a = { "": n };
    return e.write(t, Li.writeString(i, a));
  });
}
function Mb(e, t, n, r) {
  var i = A8.find(e, function(u) {
    return u.name === t && u.attributes[n] === r[n];
  });
  i ? i.attributes = r : e.push(Li.element(t, r));
}
function N8(e) {
  return e.exists(ua) ? e.read(ua, "utf8") : F8.resolve(null);
}
var Dd = {}, Zn = {}, dn = {}, wn = {}, ep;
function Pb() {
  if (ep) return wn;
  ep = 1;
  var e = co();
  function t(c, s, f) {
    return r(
      e.element(c, s, { fresh: !1 }),
      f
    );
  }
  function n(c, s, f) {
    var m = e.element(c, s, { fresh: !0 });
    return r(m, f);
  }
  function r(c, s) {
    return {
      type: "element",
      tag: c,
      children: s || []
    };
  }
  function i(c) {
    return {
      type: "text",
      value: c
    };
  }
  var u = {
    type: "forceWrite"
  };
  wn.freshElement = n, wn.nonFreshElement = t, wn.elementWithTag = r, wn.text = i, wn.forceWrite = u;
  var a = {
    br: !0,
    hr: !0,
    img: !0,
    input: !0
  };
  function o(c) {
    return c.children.length === 0 && a[c.tag.tagName];
  }
  return wn.isVoidElement = o, wn;
}
var cs, tp;
function R8() {
  if (tp) return cs;
  tp = 1;
  var e = Ne, t = Pb();
  function n(g) {
    return r(s(g));
  }
  function r(g) {
    var D = [];
    return g.map(i).forEach(function(h) {
      c(D, h);
    }), D;
  }
  function i(g) {
    return u[g.type](g);
  }
  var u = {
    element: a,
    text: o,
    forceWrite: o
  };
  function a(g) {
    return t.elementWithTag(g.tag, r(g.children));
  }
  function o(g) {
    return g;
  }
  function c(g, D) {
    var h = g[g.length - 1];
    D.type === "element" && !D.tag.fresh && h && h.type === "element" && D.tag.matchesElement(h.tag) ? (D.tag.separator && c(h.children, t.text(D.tag.separator)), D.children.forEach(function(d) {
      c(h.children, d);
    })) : g.push(D);
  }
  function s(g) {
    return f(g, function(D) {
      return m[D.type](D);
    });
  }
  function f(g, D) {
    return e.flatten(e.map(g, D), !0);
  }
  var m = {
    element: p,
    text: l,
    forceWrite: b
  };
  function b(g) {
    return [g];
  }
  function p(g) {
    var D = s(g.children);
    return D.length === 0 && !t.isVoidElement(g) ? [] : [t.elementWithTag(g.tag, D)];
  }
  function l(g) {
    return g.value.length === 0 ? [] : [g];
  }
  return cs = n, cs;
}
var np;
function oo() {
  if (np) return dn;
  np = 1;
  var e = Pb();
  dn.freshElement = e.freshElement, dn.nonFreshElement = e.nonFreshElement, dn.elementWithTag = e.elementWithTag, dn.text = e.text, dn.forceWrite = e.forceWrite, dn.simplify = R8();
  function t(a, o) {
    o.forEach(function(c) {
      n(a, c);
    });
  }
  function n(a, o) {
    r[o.type](a, o);
  }
  var r = {
    element: i,
    text: u,
    forceWrite: function() {
    }
  };
  function i(a, o) {
    e.isVoidElement(o) ? a.selfClosing(o.tag.tagName, o.tag.attributes) : (a.open(o.tag.tagName, o.tag.attributes), t(a, o.children), a.close(o.tag.tagName));
  }
  function u(a, o) {
    a.text(o.value);
  }
  return dn.write = t, dn;
}
var rp;
function co() {
  if (rp) return Zn;
  rp = 1;
  var e = Ne, t = oo();
  Zn.topLevelElement = n, Zn.elements = r, Zn.element = u;
  function n(o, c) {
    return r([u(o, c, { fresh: !0 })]);
  }
  function r(o) {
    return new i(o.map(function(c) {
      return e.isString(c) ? u(c) : c;
    }));
  }
  function i(o) {
    this._elements = o;
  }
  i.prototype.wrap = function(c) {
    for (var s = c(), f = this._elements.length - 1; f >= 0; f--)
      s = this._elements[f].wrapNodes(s);
    return s;
  };
  function u(o, c, s) {
    return s = s || {}, new a(o, c, s);
  }
  function a(o, c, s) {
    var f = {};
    e.isArray(o) ? (o.forEach(function(m) {
      f[m] = !0;
    }), o = o[0]) : f[o] = !0, this.tagName = o, this.tagNames = f, this.attributes = c || {}, this.fresh = s.fresh, this.separator = s.separator;
  }
  return a.prototype.matchesElement = function(o) {
    return this.tagNames[o.tagName] && e.isEqual(this.attributes || {}, o.attributes || {});
  }, a.prototype.wrap = function(c) {
    return this.wrapNodes(c());
  }, a.prototype.wrapNodes = function(c) {
    return [t.elementWithTag(this, c)];
  }, Zn.empty = r([]), Zn.ignore = {
    wrap: function() {
      return [];
    }
  }, Zn;
}
var xd = {};
(function(e) {
  var t = Ne, n = je, r = oo();
  e.imgElement = i;
  function i(u) {
    return function(a, o) {
      return n.when(u(a)).then(function(c) {
        var s = {};
        return a.altText && (s.alt = a.altText), t.extend(s, c), [r.freshElement("img", s)];
      });
    };
  }
  e.inline = e.imgElement, e.dataUri = i(function(u) {
    return u.readAsBase64String().then(function(a) {
      return {
        src: "data:" + u.contentType + ";base64," + a
      };
    });
  });
})(xd);
var qb = {}, zb = {}, $b = Ne;
zb.writer = O8;
function O8(e) {
  return e = e || {}, e.prettyPrint ? L8() : jb();
}
var Iu = {
  div: !0,
  p: !0,
  ul: !0,
  li: !0
};
function L8() {
  var e = 0, t = "  ", n = [], r = !0, i = !1, u = jb();
  function a(l, g) {
    Iu[l] && b(), n.push(l), u.open(l, g), Iu[l] && e++, r = !1;
  }
  function o(l) {
    Iu[l] && (e--, b()), n.pop(), u.close(l);
  }
  function c(l) {
    m();
    var g = p() ? l : l.replace(`
`, `
` + t);
    u.text(g);
  }
  function s(l, g) {
    b(), u.selfClosing(l, g);
  }
  function f() {
    return n.length === 0 || Iu[n[n.length - 1]];
  }
  function m() {
    i || (b(), i = !0);
  }
  function b() {
    if (i = !1, !r && f() && !p()) {
      u._append(`
`);
      for (var l = 0; l < e; l++)
        u._append(t);
    }
  }
  function p() {
    return $b.some(n, function(l) {
      return l === "pre";
    });
  }
  return {
    asString: u.asString,
    open: a,
    close: o,
    text: c,
    selfClosing: s
  };
}
function jb() {
  var e = [];
  function t(c, s) {
    var f = i(s);
    e.push("<" + c + f + ">");
  }
  function n(c) {
    e.push("</" + c + ">");
  }
  function r(c, s) {
    var f = i(s);
    e.push("<" + c + f + " />");
  }
  function i(c) {
    return $b.map(c, function(s, f) {
      return " " + f + '="' + M8(s) + '"';
    }).join("");
  }
  function u(c) {
    e.push(W8(c));
  }
  function a(c) {
    e.push(c);
  }
  function o() {
    return e.join("");
  }
  return {
    asString: o,
    open: t,
    close: n,
    text: u,
    selfClosing: r,
    _append: a
  };
}
function W8(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function M8(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var Hb = {}, P8 = Ne;
function ip(e) {
  return aa(e, e);
}
function aa(e, t) {
  return function() {
    return { start: e, end: t };
  };
}
function q8(e) {
  var t = e.href || "";
  return t ? {
    start: "[",
    end: "](" + t + ")",
    anchorPosition: "before"
  } : {};
}
function z8(e) {
  var t = e.src || "", n = e.alt || "";
  return t || n ? { start: "![" + n + "](" + t + ")" } : {};
}
function up(e) {
  return function(t, n) {
    return {
      start: n ? `
` : "",
      end: n ? "" : `
`,
      list: {
        isOrdered: e.isOrdered,
        indent: n ? n.indent + 1 : 0,
        count: 0
      }
    };
  };
}
function $8(e, t, n) {
  t = t || { indent: 0, isOrdered: !1, count: 0 }, t.count++, n.hasClosed = !1;
  var r = t.isOrdered ? t.count + "." : "-", i = Zb("	", t.indent) + r + " ";
  return {
    start: i,
    end: function() {
      if (!n.hasClosed)
        return n.hasClosed = !0, `
`;
    }
  };
}
var Xb = {
  p: aa("", `

`),
  br: aa("", `  
`),
  ul: up({ isOrdered: !1 }),
  ol: up({ isOrdered: !0 }),
  li: $8,
  strong: ip("__"),
  em: ip("*"),
  a: q8,
  img: z8
};
(function() {
  for (var e = 1; e <= 6; e++)
    Xb["h" + e] = aa(Zb("#", e) + " ", `

`);
})();
function Zb(e, t) {
  return new Array(t + 1).join(e);
}
function j8() {
  var e = [], t = [], n = null, r = {};
  function i(f, m) {
    m = m || {};
    var b = Xb[f] || function() {
      return {};
    }, p = b(m, n, r);
    t.push({ end: p.end, list: n }), p.list && (n = p.list);
    var l = p.anchorPosition === "before";
    l && u(m), e.push(p.start || ""), l || u(m);
  }
  function u(f) {
    f.id && e.push('<a id="' + f.id + '"></a>');
  }
  function a(f) {
    var m = t.pop();
    n = m.list;
    var b = P8.isFunction(m.end) ? m.end() : m.end;
    e.push(b || "");
  }
  function o(f, m) {
    i(f, m), a();
  }
  function c(f) {
    e.push(H8(f));
  }
  function s() {
    return e.join("");
  }
  return {
    asString: s,
    open: i,
    close: a,
    text: c,
    selfClosing: o
  };
}
Hb.writer = j8;
function H8(e) {
  return e.replace(/\\/g, "\\\\").replace(/([\`\*_\{\}\[\]\(\)\#\+\-\.\!])/g, "\\$1");
}
var X8 = zb, Z8 = Hb;
qb.writer = V8;
function V8(e) {
  return e = e || {}, e.outputFormat === "markdown" ? Z8.writer() : X8.writer(e);
}
var An = Ne, ap = je, $u = ce, _t = co(), Rs = vt, G8 = xd, se = oo(), Y8 = qb;
Dd.DocumentConverter = K8;
function K8(e) {
  return {
    convertToHtml: function(t) {
      var n = An.indexBy(
        t.type === $u.types.document ? t.comments : [],
        "commentId"
      ), r = new Q8(e, n);
      return r.convertToHtml(t);
    }
  };
}
function Q8(e, t) {
  var n = 1, r = [], i = [];
  e = An.extend({ ignoreEmptyParagraphs: !0 }, e);
  var u = e.idPrefix === void 0 ? "" : e.idPrefix, a = e.ignoreEmptyParagraphs, o = _t.topLevelElement("p"), c = e.styleMap || [];
  function s(E) {
    var k = [], R = m(E, k, {}), M = [];
    Vb(R, function($) {
      $.type === "deferred" && M.push($);
    });
    var S = {};
    return ap.mapSeries(M, function($) {
      return $.value().then(function(ee) {
        S[$.id] = ee;
      });
    }).then(function() {
      function $(te) {
        return ss(te, function(Q) {
          return Q.type === "deferred" ? S[Q.id] : Q.children ? [
            An.extend({}, Q, {
              children: $(Q.children)
            })
          ] : [Q];
        });
      }
      var ee = Y8.writer({
        prettyPrint: e.prettyPrint,
        outputFormat: e.outputFormat
      });
      return se.write(ee, se.simplify($(R))), new Rs.Result(ee.asString(), k);
    });
  }
  function f(E, k, R) {
    return ss(E, function(M) {
      return m(M, k, R);
    });
  }
  function m(E, k, R) {
    if (!R)
      throw new Error("options not set");
    var M = U[E.type];
    return M ? M(E, k, R) : [];
  }
  function b(E, k, R) {
    return p(E, k).wrap(function() {
      var M = f(E.children, k, R);
      return a ? M : [se.forceWrite].concat(M);
    });
  }
  function p(E, k) {
    var R = h(E);
    return R ? R.to : (E.styleId && k.push(op("paragraph", E)), o);
  }
  function l(E, k, R) {
    var M = function() {
      return f(E.children, k, R);
    }, S = [];
    if (E.highlight !== null) {
      var $ = D({ type: "highlight", color: E.highlight });
      $ && S.push($);
    }
    E.isSmallCaps && S.push(g("smallCaps")), E.isAllCaps && S.push(g("allCaps")), E.isStrikethrough && S.push(g("strikethrough", "s")), E.isUnderline && S.push(g("underline")), E.verticalAlignment === $u.verticalAlignment.subscript && S.push(_t.element("sub", {}, { fresh: !1 })), E.verticalAlignment === $u.verticalAlignment.superscript && S.push(_t.element("sup", {}, { fresh: !1 })), E.isItalic && S.push(g("italic", "em")), E.isBold && S.push(g("bold", "strong"));
    var ee = _t.empty, te = h(E);
    return te ? ee = te.to : E.styleId && k.push(op("run", E)), S.push(ee), S.forEach(function(Q) {
      M = Q.wrap.bind(Q, M);
    }), M();
  }
  function g(E, k) {
    var R = D({ type: E });
    return R || (k ? _t.element(k, {}, { fresh: !1 }) : _t.empty);
  }
  function D(E, k) {
    var R = h(E);
    return R ? R.to : k;
  }
  function h(E) {
    for (var k = 0; k < c.length; k++)
      if (c[k].from.matches(E))
        return c[k];
  }
  function d(E) {
    return function(k, R) {
      return ap.attempt(function() {
        return E(k, R);
      }).caught(function(M) {
        return R.push(Rs.error(M)), [];
      });
    };
  }
  function y(E) {
    return v(E.noteType, E.noteId);
  }
  function x(E) {
    return _(E.noteType, E.noteId);
  }
  function v(E, k) {
    return w(E + "-" + k);
  }
  function _(E, k) {
    return w(E + "-ref-" + k);
  }
  function w(E) {
    return u + E;
  }
  var A = _t.elements([
    _t.element("table", {}, { fresh: !0 })
  ]);
  function B(E, k, R) {
    return D(E, A).wrap(function() {
      return P(E, k, R);
    });
  }
  function P(E, k, R) {
    var M = An.findIndex(E.children, function(te) {
      return !te.type === $u.types.tableRow || !te.isHeader;
    });
    M === -1 && (M = E.children.length);
    var S;
    if (M === 0)
      S = f(
        E.children,
        k,
        An.extend({}, R, { isTableHeader: !1 })
      );
    else {
      var $ = f(
        E.children.slice(0, M),
        k,
        An.extend({}, R, { isTableHeader: !0 })
      ), ee = f(
        E.children.slice(M),
        k,
        An.extend({}, R, { isTableHeader: !1 })
      );
      S = [
        se.freshElement("thead", {}, $),
        se.freshElement("tbody", {}, ee)
      ];
    }
    return [se.forceWrite].concat(S);
  }
  function L(E, k, R) {
    var M = f(E.children, k, R);
    return [
      se.freshElement("tr", {}, [se.forceWrite].concat(M))
    ];
  }
  function I(E, k, R) {
    var M = R.isTableHeader ? "th" : "td", S = f(E.children, k, R), $ = {};
    return E.colSpan !== 1 && ($.colspan = E.colSpan.toString()), E.rowSpan !== 1 && ($.rowspan = E.rowSpan.toString()), [
      se.freshElement(M, $, [se.forceWrite].concat(S))
    ];
  }
  function z(E, k, R) {
    return D(E, _t.ignore).wrap(function() {
      var M = t[E.commentId], S = i.length + 1, $ = "[" + t4(M) + S + "]";
      return i.push({ label: $, comment: M }), [
        se.freshElement("a", {
          href: "#" + v("comment", E.commentId),
          id: _("comment", E.commentId)
        }, [se.text($)])
      ];
    });
  }
  function H(E, k, R) {
    var M = E.label, S = E.comment, $ = f(S.body, k, R).concat([
      se.nonFreshElement("p", {}, [
        se.text(" "),
        se.freshElement("a", { href: "#" + _("comment", S.commentId) }, [
          se.text("↑")
        ])
      ])
    ]);
    return [
      se.freshElement(
        "dt",
        { id: v("comment", S.commentId) },
        [se.text("Comment " + M)]
      ),
      se.freshElement("dd", {}, $)
    ];
  }
  function G(E, k, R) {
    return C(E).wrap(function() {
      return [];
    });
  }
  function C(E) {
    var k = h(E);
    return k ? k.to : E.breakType === "line" ? _t.topLevelElement("br") : _t.empty;
  }
  var U = {
    document: function(E, k, R) {
      var M = f(E.children, k, R), S = r.map(function(ee) {
        return E.notes.resolve(ee);
      }), $ = f(S, k, R);
      return M.concat([
        se.freshElement("ol", {}, $),
        se.freshElement("dl", {}, ss(i, function(ee) {
          return H(ee, k, R);
        }))
      ]);
    },
    paragraph: b,
    run: l,
    text: function(E, k, R) {
      return [se.text(E.value)];
    },
    tab: function(E, k, R) {
      return [se.text("	")];
    },
    hyperlink: function(E, k, R) {
      var M = E.anchor ? "#" + w(E.anchor) : E.href, S = { href: M };
      E.targetFrame != null && (S.target = E.targetFrame);
      var $ = f(E.children, k, R);
      return [se.nonFreshElement("a", S, $)];
    },
    checkbox: function(E) {
      var k = { type: "checkbox" };
      return E.checked && (k.checked = "checked"), [se.freshElement("input", k)];
    },
    bookmarkStart: function(E, k, R) {
      var M = se.freshElement("a", {
        id: w(E.name)
      }, [se.forceWrite]);
      return [M];
    },
    noteReference: function(E, k, R) {
      r.push(E);
      var M = se.freshElement("a", {
        href: "#" + y(E),
        id: x(E)
      }, [se.text("[" + n++ + "]")]);
      return [se.freshElement("sup", {}, [M])];
    },
    note: function(E, k, R) {
      var M = f(E.body, k, R), S = se.elementWithTag(_t.element("p", {}, { fresh: !1 }), [
        se.text(" "),
        se.freshElement("a", { href: "#" + x(E) }, [se.text("↑")])
      ]), $ = M.concat([S]);
      return se.freshElement("li", { id: y(E) }, $);
    },
    commentReference: z,
    comment: H,
    image: e4(d(e.convertImage || G8.dataUri)),
    table: B,
    tableRow: L,
    tableCell: I,
    break: G
  };
  return {
    convertToHtml: s
  };
}
var J8 = 1;
function e4(e) {
  return function(t, n, r) {
    return [
      {
        type: "deferred",
        id: J8++,
        value: function() {
          return e(t, n, r);
        }
      }
    ];
  };
}
function op(e, t) {
  return Rs.warning(
    "Unrecognised " + e + " style: '" + t.styleName + "' (Style ID: " + t.styleId + ")"
  );
}
function ss(e, t) {
  return An.flatten(e.map(t), !0);
}
function Vb(e, t) {
  e.forEach(function(n) {
    t(n), n.children && Vb(n.children, t);
  });
}
var t4 = Dd.commentAuthorLabel = function(t) {
  return t.authorInitials || "";
}, Gb = {}, n4 = ce;
function Yb(e) {
  if (e.type === "text")
    return e.value;
  if (e.type === n4.types.tab)
    return "	";
  var t = e.type === "paragraph" ? `

` : "";
  return (e.children || []).map(Yb).join("") + t;
}
Gb.convertElementToRawText = Yb;
var so = {}, Pt = {}, Kb = {}, Qb = { exports: {} }, Pr = Qb.exports = function(e, t) {
  this._tokens = e, this._startIndex = t || 0;
};
Pr.prototype.head = function() {
  return this._tokens[this._startIndex];
};
Pr.prototype.tail = function(e) {
  return new Pr(this._tokens, this._startIndex + 1);
};
Pr.prototype.toArray = function() {
  return this._tokens.slice(this._startIndex);
};
Pr.prototype.end = function() {
  return this._tokens[this._tokens.length - 1];
};
Pr.prototype.to = function(e) {
  var t = this.head().source, n = e.head() || e.end();
  return t.to(n.source);
};
var r4 = Qb.exports, i4 = r4;
Kb.Parser = function(e) {
  var t = function(n, r) {
    return n(new i4(r));
  };
  return {
    parseTokens: t
  };
};
var vd = {}, Jb = {};
(function(e) {
  e.none = /* @__PURE__ */ Object.create({
    value: function() {
      throw new Error("Called value on none");
    },
    isNone: function() {
      return !0;
    },
    isSome: function() {
      return !1;
    },
    map: function() {
      return e.none;
    },
    flatMap: function() {
      return e.none;
    },
    filter: function() {
      return e.none;
    },
    toArray: function() {
      return [];
    },
    orElse: t,
    valueOrElse: t
  });
  function t(r) {
    return typeof r == "function" ? r() : r;
  }
  e.some = function(r) {
    return new n(r);
  };
  var n = function(r) {
    this._value = r;
  };
  n.prototype.value = function() {
    return this._value;
  }, n.prototype.isNone = function() {
    return !1;
  }, n.prototype.isSome = function() {
    return !0;
  }, n.prototype.map = function(r) {
    return new n(r(this._value));
  }, n.prototype.flatMap = function(r) {
    return r(this._value);
  }, n.prototype.filter = function(r) {
    return r(this._value) ? this : e.none;
  }, n.prototype.toArray = function() {
    return [this._value];
  }, n.prototype.orElse = function(r) {
    return this;
  }, n.prototype.valueOrElse = function(r) {
    return this._value;
  }, e.isOption = function(r) {
    return r === e.none || r instanceof n;
  }, e.fromNullable = function(r) {
    return r == null ? e.none : new n(r);
  };
})(Jb);
var _d = {
  failure: function(e, t) {
    if (e.length < 1)
      throw new Error("Failure must have errors");
    return new Je({
      status: "failure",
      remaining: t,
      errors: e
    });
  },
  error: function(e, t) {
    if (e.length < 1)
      throw new Error("Failure must have errors");
    return new Je({
      status: "error",
      remaining: t,
      errors: e
    });
  },
  success: function(e, t, n) {
    return new Je({
      status: "success",
      value: e,
      source: n,
      remaining: t,
      errors: []
    });
  },
  cut: function(e) {
    return new Je({
      status: "cut",
      remaining: e,
      errors: []
    });
  }
}, Je = function(e) {
  this._value = e.value, this._status = e.status, this._hasValue = e.value !== void 0, this._remaining = e.remaining, this._source = e.source, this._errors = e.errors;
};
Je.prototype.map = function(e) {
  return this._hasValue ? new Je({
    value: e(this._value, this._source),
    status: this._status,
    remaining: this._remaining,
    source: this._source,
    errors: this._errors
  }) : this;
};
Je.prototype.changeRemaining = function(e) {
  return new Je({
    value: this._value,
    status: this._status,
    remaining: e,
    source: this._source,
    errors: this._errors
  });
};
Je.prototype.isSuccess = function() {
  return this._status === "success" || this._status === "cut";
};
Je.prototype.isFailure = function() {
  return this._status === "failure";
};
Je.prototype.isError = function() {
  return this._status === "error";
};
Je.prototype.isCut = function() {
  return this._status === "cut";
};
Je.prototype.value = function() {
  return this._value;
};
Je.prototype.remaining = function() {
  return this._remaining;
};
Je.prototype.source = function() {
  return this._source;
};
Je.prototype.errors = function() {
  return this._errors;
};
var Ed = {};
Ed.error = function(e) {
  return new fo(e);
};
var fo = function(e) {
  this.expected = e.expected, this.actual = e.actual, this._location = e.location;
};
fo.prototype.describe = function() {
  var e = this._location ? this._location.describe() + `:
` : "";
  return e + "Expected " + this.expected + `
but got ` + this.actual;
};
fo.prototype.lineNumber = function() {
  return this._location.lineNumber();
};
fo.prototype.characterNumber = function() {
  return this._location.characterNumber();
};
var em = {};
em.fromArray = function(e) {
  var t = 0, n = function() {
    return t < e.length;
  };
  return new ur({
    hasNext: n,
    next: function() {
      if (n())
        return e[t++];
      throw new Error("No more elements");
    }
  });
};
var ur = function(e) {
  this._iterator = e;
};
ur.prototype.map = function(e) {
  var t = this._iterator;
  return new ur({
    hasNext: function() {
      return t.hasNext();
    },
    next: function() {
      return e(t.next());
    }
  });
};
ur.prototype.filter = function(e) {
  var t = this._iterator, n = !1, r = !1, i, u = function() {
    if (!n)
      for (n = !0, r = !1; t.hasNext() && !r; )
        i = t.next(), r = e(i);
  };
  return new ur({
    hasNext: function() {
      return u(), r;
    },
    next: function() {
      u();
      var a = i;
      return n = !1, a;
    }
  });
};
ur.prototype.first = function() {
  var e = this._iterator;
  return this._iterator.hasNext() ? e.next() : null;
};
ur.prototype.toArray = function() {
  for (var e = []; this._iterator.hasNext(); )
    e.push(this._iterator.next());
  return e;
};
(function(e) {
  var t = Ne, n = Jb, r = _d, i = Ed, u = em;
  e.token = function(b, p) {
    var l = p !== void 0;
    return function(g) {
      var D = g.head();
      if (D && D.name === b && (!l || D.value === p))
        return r.success(D.value, g.tail(), D.source);
      var h = f({ name: b, value: p });
      return m(g, h);
    };
  }, e.tokenOfType = function(b) {
    return e.token(b);
  }, e.firstOf = function(b, p) {
    return t.isArray(p) || (p = Array.prototype.slice.call(arguments, 1)), function(l) {
      return u.fromArray(p).map(function(g) {
        return g(l);
      }).filter(function(g) {
        return g.isSuccess() || g.isError();
      }).first() || m(l, b);
    };
  }, e.then = function(b, p) {
    return function(l) {
      var g = b(l);
      return g.map || console.log(g), g.map(p);
    };
  }, e.sequence = function() {
    var b = Array.prototype.slice.call(arguments, 0), p = function(g) {
      var D = t.foldl(b, function(d, y) {
        var x = d.result, v = d.hasCut;
        if (!x.isSuccess())
          return { result: x, hasCut: v };
        var _ = y(x.remaining());
        if (_.isCut())
          return { result: x, hasCut: !0 };
        if (_.isSuccess()) {
          var w;
          y.isCaptured ? w = x.value().withValue(y, _.value()) : w = x.value();
          var A = _.remaining(), B = g.to(A);
          return {
            result: r.success(w, A, B),
            hasCut: v
          };
        } else return v ? { result: r.error(_.errors(), _.remaining()), hasCut: v } : { result: _, hasCut: v };
      }, { result: r.success(new a(), g), hasCut: !1 }).result, h = g.to(D.remaining());
      return D.map(function(d) {
        return d.withValue(e.sequence.source, h);
      });
    };
    p.head = function() {
      var g = t.find(b, l);
      return e.then(
        p,
        e.sequence.extract(g)
      );
    }, p.map = function(g) {
      return e.then(
        p,
        function(D) {
          return g.apply(this, D.toArray());
        }
      );
    };
    function l(g) {
      return g.isCaptured;
    }
    return p;
  };
  var a = function(b, p) {
    this._values = b || {}, this._valuesArray = p || [];
  };
  a.prototype.withValue = function(b, p) {
    if (b.captureName && b.captureName in this._values)
      throw new Error('Cannot add second value for capture "' + b.captureName + '"');
    var l = t.clone(this._values);
    l[b.captureName] = p;
    var g = this._valuesArray.concat([p]);
    return new a(l, g);
  }, a.prototype.get = function(b) {
    if (b.captureName in this._values)
      return this._values[b.captureName];
    throw new Error('No value for capture "' + b.captureName + '"');
  }, a.prototype.toArray = function() {
    return this._valuesArray;
  }, e.sequence.capture = function(b, p) {
    var l = function() {
      return b.apply(this, arguments);
    };
    return l.captureName = p, l.isCaptured = !0, l;
  }, e.sequence.extract = function(b) {
    return function(p) {
      return p.get(b);
    };
  }, e.sequence.applyValues = function(b) {
    var p = Array.prototype.slice.call(arguments, 1);
    return function(l) {
      var g = p.map(function(D) {
        return l.get(D);
      });
      return b.apply(this, g);
    };
  }, e.sequence.source = {
    captureName: "☃source☃"
  }, e.sequence.cut = function() {
    return function(b) {
      return r.cut(b);
    };
  }, e.optional = function(b) {
    return function(p) {
      var l = b(p);
      return l.isSuccess() ? l.map(n.some) : l.isFailure() ? r.success(n.none, p) : l;
    };
  }, e.zeroOrMoreWithSeparator = function(b, p) {
    return s(b, p, !1);
  }, e.oneOrMoreWithSeparator = function(b, p) {
    return s(b, p, !0);
  };
  var o = e.zeroOrMore = function(b) {
    return function(p) {
      for (var l = [], g; (g = b(p)) && g.isSuccess(); )
        p = g.remaining(), l.push(g.value());
      return g.isError() ? g : r.success(l, p);
    };
  };
  e.oneOrMore = function(b) {
    return e.oneOrMoreWithSeparator(b, c);
  };
  function c(b) {
    return r.success(null, b);
  }
  var s = function(b, p, l) {
    return function(g) {
      var D = b(g);
      if (D.isSuccess()) {
        var h = e.sequence.capture(b, "main"), d = o(e.then(
          e.sequence(p, h),
          e.sequence.extract(h)
        )), y = d(D.remaining());
        return r.success([D.value()].concat(y.value()), y.remaining());
      } else return l || D.isError() ? D : r.success([], g);
    };
  };
  e.leftAssociative = function(b, p, l) {
    var g;
    l ? g = [{ func: l, rule: p }] : g = p, g = g.map(function(h) {
      return e.then(h.rule, function(d) {
        return function(y, x) {
          return h.func(y, d, x);
        };
      });
    });
    var D = e.firstOf.apply(null, ["rules"].concat(g));
    return function(h) {
      var d = h, y = b(h);
      if (!y.isSuccess())
        return y;
      for (var x = D(y.remaining()); x.isSuccess(); ) {
        var v = x.remaining(), _ = d.to(x.remaining()), w = x.value();
        y = r.success(
          w(y.value(), _),
          v,
          _
        ), x = D(y.remaining());
      }
      return x.isError() ? x : y;
    };
  }, e.leftAssociative.firstOf = function() {
    return Array.prototype.slice.call(arguments, 0);
  }, e.nonConsuming = function(b) {
    return function(p) {
      return b(p).changeRemaining(p);
    };
  };
  var f = function(b) {
    return b.value ? b.name + ' "' + b.value + '"' : b.name;
  };
  function m(b, p) {
    var l, g = b.head();
    return g ? l = i.error({
      expected: p,
      actual: f(g),
      location: g.source
    }) : l = i.error({
      expected: p,
      actual: "end of tokens"
    }), r.failure([l], b);
  }
})(vd);
var tm = { exports: {} };
tm.exports = function(e, t) {
  var n = {
    asString: function() {
      return e;
    },
    range: function(r, i) {
      return new ar(e, t, r, i);
    }
  };
  return n;
};
var ar = function(e, t, n, r) {
  this._string = e, this._description = t, this._startIndex = n, this._endIndex = r;
};
ar.prototype.to = function(e) {
  return new ar(this._string, this._description, this._startIndex, e._endIndex);
};
ar.prototype.describe = function() {
  var e = this._position(), t = this._description ? this._description + `
` : "";
  return t + "Line number: " + e.lineNumber + `
Character number: ` + e.characterNumber;
};
ar.prototype.lineNumber = function() {
  return this._position().lineNumber;
};
ar.prototype.characterNumber = function() {
  return this._position().characterNumber;
};
ar.prototype._position = function() {
  for (var e = this, t = 0, n = function() {
    return e._string.indexOf(`
`, t);
  }, r = 1; n() !== -1 && n() < this._startIndex; )
    t = n() + 1, r += 1;
  var i = this._startIndex - t + 1;
  return { lineNumber: r, characterNumber: i };
};
var nm = tm.exports, rm = function(e, t, n) {
  this.name = e, this.value = t, n && (this.source = n);
}, im = {};
(function(e) {
  var t = vd, n = _d;
  e.parser = function(u, a, o) {
    var c = {
      rule: b,
      leftAssociative: p,
      rightAssociative: l
    }, s = new r(o.map(m)), f = t.firstOf(u, a);
    function m(h) {
      return {
        name: h.name,
        rule: i(h.ruleBuilder.bind(null, c))
      };
    }
    function b() {
      return g(s);
    }
    function p(h) {
      return g(s.untilExclusive(h));
    }
    function l(h) {
      return g(s.untilInclusive(h));
    }
    function g(h) {
      return D.bind(null, h);
    }
    function D(h, d) {
      var y = f(d);
      return y.isSuccess() ? h.apply(y) : y;
    }
    return c;
  };
  function r(u) {
    function a(m) {
      return new r(u.slice(0, c().indexOf(m)));
    }
    function o(m) {
      return new r(u.slice(0, c().indexOf(m) + 1));
    }
    function c() {
      return u.map(function(m) {
        return m.name;
      });
    }
    function s(m) {
      for (var b, p; ; )
        if (b = f(m.remaining()), b.isSuccess())
          p = m.source().to(b.source()), m = n.success(
            b.value()(m.value(), p),
            b.remaining(),
            p
          );
        else return b.isFailure() ? m : b;
    }
    function f(m) {
      return t.firstOf("infix", u.map(function(b) {
        return b.rule;
      }))(m);
    }
    return {
      apply: s,
      untilExclusive: a,
      untilInclusive: o
    };
  }
  e.infix = function(u, a) {
    function o(c) {
      return e.infix(u, function(s) {
        var f = a(s);
        return function(m) {
          var b = f(m);
          return b.map(function(p) {
            return function(l, g) {
              return c(l, p, g);
            };
          });
        };
      });
    }
    return {
      name: u,
      ruleBuilder: a,
      map: o
    };
  };
  var i = function(u) {
    var a;
    return function(o) {
      return a || (a = u()), a(o);
    };
  };
})(im);
var um = {}, fs = rm, u4 = nm;
um.RegexTokeniser = a4;
function a4(e) {
  e = e.map(function(i) {
    return {
      name: i.name,
      regex: new RegExp(i.regex.source, "g")
    };
  });
  function t(i, u) {
    for (var a = new u4(i, u), o = 0, c = []; o < i.length; ) {
      var s = n(i, o, a);
      o = s.endIndex, c.push(s.token);
    }
    return c.push(r(i, a)), c;
  }
  function n(i, u, a) {
    for (var o = 0; o < e.length; o++) {
      var c = e[o].regex;
      c.lastIndex = u;
      var s = c.exec(i);
      if (s) {
        var m = u + s[0].length;
        if (s.index === u && m > u) {
          var f = s[1], b = new fs(
            e[o].name,
            f,
            a.range(u, m)
          );
          return { token: b, endIndex: m };
        }
      }
    }
    var m = u + 1, b = new fs(
      "unrecognisedCharacter",
      i.substring(u, m),
      a.range(u, m)
    );
    return { token: b, endIndex: m };
  }
  function r(i, u) {
    return new fs(
      "end",
      null,
      u.range(i.length, i.length)
    );
  }
  return {
    tokenise: t
  };
}
Pt.Parser = Kb.Parser;
Pt.rules = vd;
Pt.errors = Ed;
Pt.results = _d;
Pt.StringSource = nm;
Pt.Token = rm;
Pt.bottomUp = im;
Pt.RegexTokeniser = um.RegexTokeniser;
Pt.rule = function(e) {
  var t;
  return function(n) {
    return t || (t = e()), t(n);
  };
};
var Ye = {};
Ye.paragraph = o4;
Ye.run = c4;
Ye.table = s4;
Ye.bold = new qt("bold");
Ye.italic = new qt("italic");
Ye.underline = new qt("underline");
Ye.strikethrough = new qt("strikethrough");
Ye.allCaps = new qt("allCaps");
Ye.smallCaps = new qt("smallCaps");
Ye.highlight = f4;
Ye.commentReference = new qt("commentReference");
Ye.lineBreak = new lo({ breakType: "line" });
Ye.pageBreak = new lo({ breakType: "page" });
Ye.columnBreak = new lo({ breakType: "column" });
Ye.equalTo = l4;
Ye.startsWith = h4;
function o4(e) {
  return new qt("paragraph", e);
}
function c4(e) {
  return new qt("run", e);
}
function s4(e) {
  return new qt("table", e);
}
function f4(e) {
  return new am(e);
}
function qt(e, t) {
  t = t || {}, this._elementType = e, this._styleId = t.styleId, this._styleName = t.styleName, t.list && (this._listIndex = t.list.levelIndex, this._listIsOrdered = t.list.isOrdered);
}
qt.prototype.matches = function(e) {
  return e.type === this._elementType && (this._styleId === void 0 || e.styleId === this._styleId) && (this._styleName === void 0 || e.styleName && this._styleName.operator(this._styleName.operand, e.styleName)) && (this._listIndex === void 0 || d4(e, this._listIndex, this._listIsOrdered)) && (this._breakType === void 0 || this._breakType === e.breakType);
};
function am(e) {
  e = e || {}, this._color = e.color;
}
am.prototype.matches = function(e) {
  return e.type === "highlight" && (this._color === void 0 || e.color === this._color);
};
function lo(e) {
  e = e || {}, this._breakType = e.breakType;
}
lo.prototype.matches = function(e) {
  return e.type === "break" && (this._breakType === void 0 || e.breakType === this._breakType);
};
function d4(e, t, n) {
  return e.numbering && e.numbering.level == t && e.numbering.isOrdered == n;
}
function l4(e) {
  return {
    operator: p4,
    operand: e
  };
}
function h4(e) {
  return {
    operator: g4,
    operand: e
  };
}
function p4(e, t) {
  return e.toUpperCase() === t.toUpperCase();
}
function g4(e, t) {
  return t.toUpperCase().indexOf(e.toUpperCase()) === 0;
}
var om = {}, b4 = Pt, m4 = b4.RegexTokeniser;
om.tokenise = y4;
var cp = "'((?:\\\\.|[^'])*)";
function y4(e) {
  var t = "(?:[a-zA-Z\\-_]|\\\\.)", n = new m4([
    { name: "identifier", regex: new RegExp("(" + t + "(?:" + t + "|[0-9])*)") },
    { name: "dot", regex: /\./ },
    { name: "colon", regex: /:/ },
    { name: "gt", regex: />/ },
    { name: "whitespace", regex: /\s+/ },
    { name: "arrow", regex: /=>/ },
    { name: "equals", regex: /=/ },
    { name: "startsWith", regex: /\^=/ },
    { name: "open-paren", regex: /\(/ },
    { name: "close-paren", regex: /\)/ },
    { name: "open-square-bracket", regex: /\[/ },
    { name: "close-square-bracket", regex: /\]/ },
    { name: "string", regex: new RegExp(cp + "'") },
    { name: "unterminated-string", regex: new RegExp(cp) },
    { name: "integer", regex: /([0-9]+)/ },
    { name: "choice", regex: /\|/ },
    { name: "bang", regex: /(!)/ }
  ]);
  return n.tokenise(e);
}
var D4 = Ne, j = Pt, Ke = Ye, ju = co(), x4 = om.tokenise, ds = vt;
so.readHtmlPath = w4;
so.readDocumentMatcher = E4;
so.readStyle = v4;
function v4(e) {
  return wd(B4, e);
}
function _4() {
  return j.rules.sequence(
    j.rules.sequence.capture(cm()),
    j.rules.tokenOfType("whitespace"),
    j.rules.tokenOfType("arrow"),
    j.rules.sequence.capture(j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("whitespace"),
      j.rules.sequence.capture(sm())
    ).head())),
    j.rules.tokenOfType("end")
  ).map(function(e, t) {
    return {
      from: e,
      to: t.valueOrElse(ju.empty)
    };
  });
}
function E4(e) {
  return wd(cm(), e);
}
function cm() {
  var e = j.rules.sequence, t = function(_, w) {
    return j.rules.then(
      j.rules.token("identifier", _),
      function() {
        return w;
      }
    );
  }, n = t("p", Ke.paragraph), r = t("r", Ke.run), i = j.rules.firstOf(
    "p or r or table",
    n,
    r
  ), u = j.rules.sequence(
    j.rules.tokenOfType("dot"),
    j.rules.sequence.cut(),
    j.rules.sequence.capture(ho)
  ).map(function(_) {
    return { styleId: _ };
  }), a = j.rules.firstOf(
    "style name matcher",
    j.rules.then(
      j.rules.sequence(
        j.rules.tokenOfType("equals"),
        j.rules.sequence.cut(),
        j.rules.sequence.capture(Tr)
      ).head(),
      function(_) {
        return { styleName: Ke.equalTo(_) };
      }
    ),
    j.rules.then(
      j.rules.sequence(
        j.rules.tokenOfType("startsWith"),
        j.rules.sequence.cut(),
        j.rules.sequence.capture(Tr)
      ).head(),
      function(_) {
        return { styleName: Ke.startsWith(_) };
      }
    )
  ), o = j.rules.sequence(
    j.rules.tokenOfType("open-square-bracket"),
    j.rules.sequence.cut(),
    j.rules.token("identifier", "style-name"),
    j.rules.sequence.capture(a),
    j.rules.tokenOfType("close-square-bracket")
  ).head(), c = j.rules.firstOf(
    "list type",
    t("ordered-list", { isOrdered: !0 }),
    t("unordered-list", { isOrdered: !1 })
  ), s = e(
    j.rules.tokenOfType("colon"),
    e.capture(c),
    e.cut(),
    j.rules.tokenOfType("open-paren"),
    e.capture(U4),
    j.rules.tokenOfType("close-paren")
  ).map(function(_, w) {
    return {
      list: {
        isOrdered: _.isOrdered,
        levelIndex: w - 1
      }
    };
  });
  function f(_) {
    var w = j.rules.firstOf.apply(
      j.rules.firstOf,
      ["matcher suffix"].concat(_)
    ), A = j.rules.zeroOrMore(w);
    return j.rules.then(A, function(B) {
      var P = {};
      return B.forEach(function(L) {
        D4.extend(P, L);
      }), P;
    });
  }
  var m = e(
    e.capture(i),
    e.capture(f([
      u,
      o,
      s
    ]))
  ).map(function(_, w) {
    return _(w);
  }), b = e(
    j.rules.token("identifier", "table"),
    e.capture(f([
      u,
      o
    ]))
  ).map(function(_) {
    return Ke.table(_);
  }), p = t("b", Ke.bold), l = t("i", Ke.italic), g = t("u", Ke.underline), D = t("strike", Ke.strikethrough), h = t("all-caps", Ke.allCaps), d = t("small-caps", Ke.smallCaps), y = e(
    j.rules.token("identifier", "highlight"),
    j.rules.sequence.capture(j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("open-square-bracket"),
      j.rules.sequence.cut(),
      j.rules.token("identifier", "color"),
      j.rules.tokenOfType("equals"),
      j.rules.sequence.capture(Tr),
      j.rules.tokenOfType("close-square-bracket")
    ).head()))
  ).map(function(_) {
    return Ke.highlight({
      color: _.valueOrElse(void 0)
    });
  }), x = t("comment-reference", Ke.commentReference), v = e(
    j.rules.token("identifier", "br"),
    e.cut(),
    j.rules.tokenOfType("open-square-bracket"),
    j.rules.token("identifier", "type"),
    j.rules.tokenOfType("equals"),
    e.capture(Tr),
    j.rules.tokenOfType("close-square-bracket")
  ).map(function(_) {
    switch (_) {
      case "line":
        return Ke.lineBreak;
      case "page":
        return Ke.pageBreak;
      case "column":
        return Ke.columnBreak;
    }
  });
  return j.rules.firstOf(
    "element type",
    m,
    b,
    p,
    l,
    g,
    D,
    h,
    d,
    y,
    x,
    v
  );
}
function w4(e) {
  return wd(sm(), e);
}
function sm() {
  var e = j.rules.sequence.capture, t = j.rules.tokenOfType("whitespace"), n = j.rules.then(
    j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("colon"),
      j.rules.token("identifier", "fresh")
    )),
    function(a) {
      return a.map(function() {
        return !0;
      }).valueOrElse(!1);
    }
  ), r = j.rules.then(
    j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("colon"),
      j.rules.token("identifier", "separator"),
      j.rules.tokenOfType("open-paren"),
      e(Tr),
      j.rules.tokenOfType("close-paren")
    ).head()),
    function(a) {
      return a.valueOrElse("");
    }
  ), i = j.rules.oneOrMoreWithSeparator(
    ho,
    j.rules.tokenOfType("choice")
  ), u = j.rules.sequence(
    e(i),
    e(j.rules.zeroOrMore(F4)),
    e(n),
    e(r)
  ).map(function(a, o, c, s) {
    var f = {}, m = {};
    return o.forEach(function(b) {
      b.append && f[b.name] ? f[b.name] += " " + b.value : f[b.name] = b.value;
    }), c && (m.fresh = !0), s && (m.separator = s), ju.element(a, f, m);
  });
  return j.rules.firstOf(
    "html path",
    j.rules.then(j.rules.tokenOfType("bang"), function() {
      return ju.ignore;
    }),
    j.rules.then(
      j.rules.zeroOrMoreWithSeparator(
        u,
        j.rules.sequence(
          t,
          j.rules.tokenOfType("gt"),
          t
        )
      ),
      ju.elements
    )
  );
}
var ho = j.rules.then(
  j.rules.tokenOfType("identifier"),
  fm
), U4 = j.rules.tokenOfType("integer"), Tr = j.rules.then(
  j.rules.tokenOfType("string"),
  fm
), T4 = {
  n: `
`,
  r: "\r",
  t: "	"
};
function fm(e) {
  return e.replace(/\\(.)/g, function(t, n) {
    return T4[n] || n;
  });
}
var C4 = j.rules.sequence(
  j.rules.tokenOfType("open-square-bracket"),
  j.rules.sequence.cut(),
  j.rules.sequence.capture(ho),
  j.rules.tokenOfType("equals"),
  j.rules.sequence.capture(Tr),
  j.rules.tokenOfType("close-square-bracket")
).map(function(e, t) {
  return { name: e, value: t, append: !1 };
}), A4 = j.rules.sequence(
  j.rules.tokenOfType("dot"),
  j.rules.sequence.cut(),
  j.rules.sequence.capture(ho)
).map(function(e) {
  return { name: "class", value: e, append: !0 };
}), F4 = j.rules.firstOf(
  "attribute or class",
  C4,
  A4
);
function wd(e, t) {
  var n = x4(t), r = j.Parser(), i = r.parseTokens(e, n);
  return i.isSuccess() ? ds.success(i.value()) : new ds.Result(null, [ds.warning(k4(t, i))]);
}
function k4(e, t) {
  return "Did not understand this style mapping, so ignored it: " + e + `
` + t.errors().map(S4).join(`
`);
}
function S4(e) {
  return "Error was at character number " + e.characterNumber() + ": Expected " + e.expected + " but got " + e.actual;
}
var B4 = _4(), po = {};
po.readOptions = R4;
var dm = Ne, I4 = po._defaultStyleMap = [
  "p.Heading1 => h1:fresh",
  "p.Heading2 => h2:fresh",
  "p.Heading3 => h3:fresh",
  "p.Heading4 => h4:fresh",
  "p.Heading5 => h5:fresh",
  "p.Heading6 => h6:fresh",
  "p[style-name='Heading 1'] => h1:fresh",
  "p[style-name='Heading 2'] => h2:fresh",
  "p[style-name='Heading 3'] => h3:fresh",
  "p[style-name='Heading 4'] => h4:fresh",
  "p[style-name='Heading 5'] => h5:fresh",
  "p[style-name='Heading 6'] => h6:fresh",
  "p[style-name='heading 1'] => h1:fresh",
  "p[style-name='heading 2'] => h2:fresh",
  "p[style-name='heading 3'] => h3:fresh",
  "p[style-name='heading 4'] => h4:fresh",
  "p[style-name='heading 5'] => h5:fresh",
  "p[style-name='heading 6'] => h6:fresh",
  "r[style-name='Strong'] => strong",
  "p[style-name='footnote text'] => p:fresh",
  "r[style-name='footnote reference'] =>",
  "p[style-name='endnote text'] => p:fresh",
  "r[style-name='endnote reference'] =>",
  "p[style-name='annotation text'] => p:fresh",
  "r[style-name='annotation reference'] =>",
  // LibreOffice
  "p[style-name='Footnote'] => p:fresh",
  "r[style-name='Footnote anchor'] =>",
  "p[style-name='Endnote'] => p:fresh",
  "r[style-name='Endnote anchor'] =>",
  "p:unordered-list(1) => ul > li:fresh",
  "p:unordered-list(2) => ul|ol > li > ul > li:fresh",
  "p:unordered-list(3) => ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:unordered-list(4) => ul|ol > li > ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:unordered-list(5) => ul|ol > li > ul|ol > li > ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:ordered-list(1) => ol > li:fresh",
  "p:ordered-list(2) => ul|ol > li > ol > li:fresh",
  "p:ordered-list(3) => ul|ol > li > ul|ol > li > ol > li:fresh",
  "p:ordered-list(4) => ul|ol > li > ul|ol > li > ul|ol > li > ol > li:fresh",
  "p:ordered-list(5) => ul|ol > li > ul|ol > li > ul|ol > li > ul|ol > li > ol > li:fresh",
  "r[style-name='Hyperlink'] =>",
  "p[style-name='Normal'] => p:fresh"
], N4 = po._standardOptions = {
  transformDocument: O4,
  includeDefaultStyleMap: !0,
  includeEmbeddedStyleMap: !0
};
function R4(e) {
  return e = e || {}, dm.extend({}, N4, e, {
    customStyleMap: sp(e.styleMap),
    readStyleMap: function() {
      var t = this.customStyleMap;
      return this.includeEmbeddedStyleMap && (t = t.concat(sp(this.embeddedStyleMap))), this.includeDefaultStyleMap && (t = t.concat(I4)), t;
    }
  });
}
function sp(e) {
  return e ? dm.isString(e) ? e.split(`
`).map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t !== "" && t.charAt(0) !== "#";
  }) : e : [];
}
function O4(e) {
  return e;
}
var lm = {}, L4 = qs, Hu = je, fp = Gi;
lm.openZip = M4;
var W4 = Hu.promisify(L4.readFile);
function M4(e) {
  return e.path ? W4(e.path).then(fp.openArrayBuffer) : e.buffer ? Hu.resolve(fp.openArrayBuffer(e.buffer)) : e.file ? Hu.resolve(e.file) : Hu.reject(new Error("Could not find file in options"));
}
var ri = {}, dp = Ne;
ri.paragraph = P4;
ri.run = q4;
ri._elements = pm;
ri.getDescendantsOfType = z4;
ri.getDescendants = gm;
function P4(e) {
  return hm("paragraph", e);
}
function q4(e) {
  return hm("run", e);
}
function hm(e, t) {
  return pm(function(n) {
    return n.type === e ? t(n) : n;
  });
}
function pm(e) {
  return function t(n) {
    if (n.children) {
      var r = dp.map(n.children, t);
      n = dp.extend(n, { children: r });
    }
    return e(n);
  };
}
function z4(e, t) {
  return gm(e).filter(function(n) {
    return n.type === t;
  });
}
function gm(e) {
  var t = [];
  return bm(e, function(n) {
    t.push(n);
  }), t;
}
function bm(e, t) {
  e.children && e.children.forEach(function(n) {
    bm(n, t), t(n);
  });
}
var mm = {}, $4 = co(), j4 = oo();
mm.element = H4;
function H4(e) {
  return function(t) {
    return j4.elementWithTag($4.element(e), [t]);
  };
}
var X4 = Ne, ym = Af, Ud = yd, Z4 = Dd.DocumentConverter, V4 = Gb.convertElementToRawText, G4 = so.readStyle, Y4 = po.readOptions, go = lm, K4 = vt.Result;
Ft.convertToHtml = Q4;
Ft.convertToMarkdown = J4;
Ft.convert = Td;
Ft.extractRawText = rE;
Ft.images = xd;
Ft.transforms = ri;
Ft.underline = mm;
Ft.embedStyleMap = iE;
Ft.readEmbeddedStyleMap = eE;
function Q4(e, t) {
  return Td(e, t);
}
function J4(e, t) {
  var n = Object.create(t || {});
  return n.outputFormat = "markdown", Td(e, n);
}
function Td(e, t) {
  return t = Y4(t), go.openZip(e).tap(function(n) {
    return Ud.readStyleMap(n).then(function(r) {
      t.embeddedStyleMap = r;
    });
  }).then(function(n) {
    return ym.read(n, e).then(function(r) {
      return r.map(t.transformDocument);
    }).then(function(r) {
      return tE(r, t);
    });
  });
}
function eE(e) {
  return go.openZip(e).then(Ud.readStyleMap);
}
function tE(e, t) {
  var n = nE(t.readStyleMap()), r = X4.extend({}, t, {
    styleMap: n.value
  }), i = new Z4(r);
  return e.flatMapThen(function(u) {
    return n.flatMapThen(function(a) {
      return i.convertToHtml(u);
    });
  });
}
function nE(e) {
  return K4.combine((e || []).map(G4)).map(function(t) {
    return t.filter(function(n) {
      return !!n;
    });
  });
}
function rE(e) {
  return go.openZip(e).then(ym.read).then(function(t) {
    return t.map(V4);
  });
}
function iE(e, t) {
  return go.openZip(e).tap(function(n) {
    return Ud.writeStyleMap(n, t);
  }).then(function(n) {
    return n.toArrayBuffer();
  }).then(function(n) {
    return {
      toArrayBuffer: function() {
        return n;
      },
      toBuffer: function() {
        return Buffer.from(n);
      }
    };
  });
}
Ft.styleMapping = function() {
  throw new Error(`Use a raw string instead of mammoth.styleMapping e.g. "p[style-name='Title'] => h1" instead of mammoth.styleMapping("p[style-name='Title'] => h1")`);
};
const lp = {};
function uE(e) {
  let t = lp[e];
  if (t)
    return t;
  t = lp[e] = [];
  for (let n = 0; n < 128; n++) {
    const r = String.fromCharCode(n);
    t.push(r);
  }
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t[r] = "%" + ("0" + r.toString(16).toUpperCase()).slice(-2);
  }
  return t;
}
function qr(e, t) {
  typeof t != "string" && (t = qr.defaultChars);
  const n = uE(t);
  return e.replace(/(%[a-f0-9]{2})+/gi, function(r) {
    let i = "";
    for (let u = 0, a = r.length; u < a; u += 3) {
      const o = parseInt(r.slice(u + 1, u + 3), 16);
      if (o < 128) {
        i += n[o];
        continue;
      }
      if ((o & 224) === 192 && u + 3 < a) {
        const c = parseInt(r.slice(u + 4, u + 6), 16);
        if ((c & 192) === 128) {
          const s = o << 6 & 1984 | c & 63;
          s < 128 ? i += "��" : i += String.fromCharCode(s), u += 3;
          continue;
        }
      }
      if ((o & 240) === 224 && u + 6 < a) {
        const c = parseInt(r.slice(u + 4, u + 6), 16), s = parseInt(r.slice(u + 7, u + 9), 16);
        if ((c & 192) === 128 && (s & 192) === 128) {
          const f = o << 12 & 61440 | c << 6 & 4032 | s & 63;
          f < 2048 || f >= 55296 && f <= 57343 ? i += "���" : i += String.fromCharCode(f), u += 6;
          continue;
        }
      }
      if ((o & 248) === 240 && u + 9 < a) {
        const c = parseInt(r.slice(u + 4, u + 6), 16), s = parseInt(r.slice(u + 7, u + 9), 16), f = parseInt(r.slice(u + 10, u + 12), 16);
        if ((c & 192) === 128 && (s & 192) === 128 && (f & 192) === 128) {
          let m = o << 18 & 1835008 | c << 12 & 258048 | s << 6 & 4032 | f & 63;
          m < 65536 || m > 1114111 ? i += "����" : (m -= 65536, i += String.fromCharCode(55296 + (m >> 10), 56320 + (m & 1023))), u += 9;
          continue;
        }
      }
      i += "�";
    }
    return i;
  });
}
qr.defaultChars = ";/?:@&=+$,#";
qr.componentChars = "";
const hp = {};
function aE(e) {
  let t = hp[e];
  if (t)
    return t;
  t = hp[e] = [];
  for (let n = 0; n < 128; n++) {
    const r = String.fromCharCode(n);
    /^[0-9a-z]$/i.test(r) ? t.push(r) : t.push("%" + ("0" + n.toString(16).toUpperCase()).slice(-2));
  }
  for (let n = 0; n < e.length; n++)
    t[e.charCodeAt(n)] = e[n];
  return t;
}
function cu(e, t, n) {
  typeof t != "string" && (n = t, t = cu.defaultChars), typeof n > "u" && (n = !0);
  const r = aE(t);
  let i = "";
  for (let u = 0, a = e.length; u < a; u++) {
    const o = e.charCodeAt(u);
    if (n && o === 37 && u + 2 < a && /^[0-9a-f]{2}$/i.test(e.slice(u + 1, u + 3))) {
      i += e.slice(u, u + 3), u += 2;
      continue;
    }
    if (o < 128) {
      i += r[o];
      continue;
    }
    if (o >= 55296 && o <= 57343) {
      if (o >= 55296 && o <= 56319 && u + 1 < a) {
        const c = e.charCodeAt(u + 1);
        if (c >= 56320 && c <= 57343) {
          i += encodeURIComponent(e[u] + e[u + 1]), u++;
          continue;
        }
      }
      i += "%EF%BF%BD";
      continue;
    }
    i += encodeURIComponent(e[u]);
  }
  return i;
}
cu.defaultChars = ";/?:@&=+$,-_.!~*'()#";
cu.componentChars = "-_.!~*'()";
function Cd(e) {
  let t = "";
  return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
}
function oa() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
const oE = /^([a-z0-9.+-]+:)/i, cE = /:[0-9]*$/, sE = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, fE = ["<", ">", '"', "`", " ", "\r", `
`, "	"], dE = ["{", "}", "|", "\\", "^", "`"].concat(fE), lE = ["'"].concat(dE), pp = ["%", "/", "?", ";", "#"].concat(lE), gp = ["/", "?", "#"], hE = 255, bp = /^[+a-z0-9A-Z_-]{0,63}$/, pE = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, mp = {
  javascript: !0,
  "javascript:": !0
}, yp = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function Ad(e, t) {
  if (e && e instanceof oa) return e;
  const n = new oa();
  return n.parse(e, t), n;
}
oa.prototype.parse = function(e, t) {
  let n, r, i, u = e;
  if (u = u.trim(), !t && e.split("#").length === 1) {
    const s = sE.exec(u);
    if (s)
      return this.pathname = s[1], s[2] && (this.search = s[2]), this;
  }
  let a = oE.exec(u);
  if (a && (a = a[0], n = a.toLowerCase(), this.protocol = a, u = u.substr(a.length)), (t || a || u.match(/^\/\/[^@\/]+@[^@\/]+/)) && (i = u.substr(0, 2) === "//", i && !(a && mp[a]) && (u = u.substr(2), this.slashes = !0)), !mp[a] && (i || a && !yp[a])) {
    let s = -1;
    for (let l = 0; l < gp.length; l++)
      r = u.indexOf(gp[l]), r !== -1 && (s === -1 || r < s) && (s = r);
    let f, m;
    s === -1 ? m = u.lastIndexOf("@") : m = u.lastIndexOf("@", s), m !== -1 && (f = u.slice(0, m), u = u.slice(m + 1), this.auth = f), s = -1;
    for (let l = 0; l < pp.length; l++)
      r = u.indexOf(pp[l]), r !== -1 && (s === -1 || r < s) && (s = r);
    s === -1 && (s = u.length), u[s - 1] === ":" && s--;
    const b = u.slice(0, s);
    u = u.slice(s), this.parseHost(b), this.hostname = this.hostname || "";
    const p = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!p) {
      const l = this.hostname.split(/\./);
      for (let g = 0, D = l.length; g < D; g++) {
        const h = l[g];
        if (h && !h.match(bp)) {
          let d = "";
          for (let y = 0, x = h.length; y < x; y++)
            h.charCodeAt(y) > 127 ? d += "x" : d += h[y];
          if (!d.match(bp)) {
            const y = l.slice(0, g), x = l.slice(g + 1), v = h.match(pE);
            v && (y.push(v[1]), x.unshift(v[2])), x.length && (u = x.join(".") + u), this.hostname = y.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > hE && (this.hostname = ""), p && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  const o = u.indexOf("#");
  o !== -1 && (this.hash = u.substr(o), u = u.slice(0, o));
  const c = u.indexOf("?");
  return c !== -1 && (this.search = u.substr(c), u = u.slice(0, c)), u && (this.pathname = u), yp[n] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
oa.prototype.parseHost = function(e) {
  let t = cE.exec(e);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
const gE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: qr,
  encode: cu,
  format: Cd,
  parse: Ad
}, Symbol.toStringTag, { value: "Module" })), Dm = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, xm = /[\0-\x1F\x7F-\x9F]/, bE = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, Fd = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, vm = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/, _m = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, mE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: Dm,
  Cc: xm,
  Cf: bE,
  P: Fd,
  S: vm,
  Z: _m
}, Symbol.toStringTag, { value: "Module" })), yE = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), DE = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var ls;
const xE = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), vE = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (ls = String.fromCodePoint) !== null && ls !== void 0 ? ls : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  }
);
function _E(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = xE.get(e)) !== null && t !== void 0 ? t : e;
}
var ze;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(ze || (ze = {}));
const EE = 32;
var Nn;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(Nn || (Nn = {}));
function Os(e) {
  return e >= ze.ZERO && e <= ze.NINE;
}
function wE(e) {
  return e >= ze.UPPER_A && e <= ze.UPPER_F || e >= ze.LOWER_A && e <= ze.LOWER_F;
}
function UE(e) {
  return e >= ze.UPPER_A && e <= ze.UPPER_Z || e >= ze.LOWER_A && e <= ze.LOWER_Z || Os(e);
}
function TE(e) {
  return e === ze.EQUALS || UE(e);
}
var qe;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(qe || (qe = {}));
var Sn;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Sn || (Sn = {}));
class CE {
  constructor(t, n, r) {
    this.decodeTree = t, this.emitCodePoint = n, this.errors = r, this.state = qe.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Sn.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = qe.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, n) {
    switch (this.state) {
      case qe.EntityStart:
        return t.charCodeAt(n) === ze.NUM ? (this.state = qe.NumericStart, this.consumed += 1, this.stateNumericStart(t, n + 1)) : (this.state = qe.NamedEntity, this.stateNamedEntity(t, n));
      case qe.NumericStart:
        return this.stateNumericStart(t, n);
      case qe.NumericDecimal:
        return this.stateNumericDecimal(t, n);
      case qe.NumericHex:
        return this.stateNumericHex(t, n);
      case qe.NamedEntity:
        return this.stateNamedEntity(t, n);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, n) {
    return n >= t.length ? -1 : (t.charCodeAt(n) | EE) === ze.LOWER_X ? (this.state = qe.NumericHex, this.consumed += 1, this.stateNumericHex(t, n + 1)) : (this.state = qe.NumericDecimal, this.stateNumericDecimal(t, n));
  }
  addToNumericResult(t, n, r, i) {
    if (n !== r) {
      const u = r - n;
      this.result = this.result * Math.pow(i, u) + parseInt(t.substr(n, u), i), this.consumed += u;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, n) {
    const r = n;
    for (; n < t.length; ) {
      const i = t.charCodeAt(n);
      if (Os(i) || wE(i))
        n += 1;
      else
        return this.addToNumericResult(t, r, n, 16), this.emitNumericEntity(i, 3);
    }
    return this.addToNumericResult(t, r, n, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, n) {
    const r = n;
    for (; n < t.length; ) {
      const i = t.charCodeAt(n);
      if (Os(i))
        n += 1;
      else
        return this.addToNumericResult(t, r, n, 10), this.emitNumericEntity(i, 2);
    }
    return this.addToNumericResult(t, r, n, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, n) {
    var r;
    if (this.consumed <= n)
      return (r = this.errors) === null || r === void 0 || r.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === ze.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === Sn.Strict)
      return 0;
    return this.emitCodePoint(_E(this.result), this.consumed), this.errors && (t !== ze.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, n) {
    const { decodeTree: r } = this;
    let i = r[this.treeIndex], u = (i & Nn.VALUE_LENGTH) >> 14;
    for (; n < t.length; n++, this.excess++) {
      const a = t.charCodeAt(n);
      if (this.treeIndex = AE(r, i, this.treeIndex + Math.max(1, u), a), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === Sn.Attribute && // We shouldn't have consumed any characters after the entity,
        (u === 0 || // And there should be no invalid characters.
        TE(a)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (i = r[this.treeIndex], u = (i & Nn.VALUE_LENGTH) >> 14, u !== 0) {
        if (a === ze.SEMI)
          return this.emitNamedEntityData(this.treeIndex, u, this.consumed + this.excess);
        this.decodeMode !== Sn.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: n, decodeTree: r } = this, i = (r[n] & Nn.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(n, i, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, n, r) {
    const { decodeTree: i } = this;
    return this.emitCodePoint(n === 1 ? i[t] & ~Nn.VALUE_LENGTH : i[t + 1], r), n === 3 && this.emitCodePoint(i[t + 2], r), r;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case qe.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== Sn.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      case qe.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case qe.NumericHex:
        return this.emitNumericEntity(0, 3);
      case qe.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case qe.EntityStart:
        return 0;
    }
  }
}
function Em(e) {
  let t = "";
  const n = new CE(e, (r) => t += vE(r));
  return function(i, u) {
    let a = 0, o = 0;
    for (; (o = i.indexOf("&", o)) >= 0; ) {
      t += i.slice(a, o), n.startEntity(u);
      const s = n.write(
        i,
        // Skip the "&"
        o + 1
      );
      if (s < 0) {
        a = o + n.end();
        break;
      }
      a = o + s, o = s === 0 ? a + 1 : a;
    }
    const c = t + i.slice(a);
    return t = "", c;
  };
}
function AE(e, t, n, r) {
  const i = (t & Nn.BRANCH_LENGTH) >> 7, u = t & Nn.JUMP_TABLE;
  if (i === 0)
    return u !== 0 && r === u ? n : -1;
  if (u) {
    const c = r - u;
    return c < 0 || c >= i ? -1 : e[n + c] - 1;
  }
  let a = n, o = a + i - 1;
  for (; a <= o; ) {
    const c = a + o >>> 1, s = e[c];
    if (s < r)
      a = c + 1;
    else if (s > r)
      o = c - 1;
    else
      return e[c + i];
  }
  return -1;
}
const FE = Em(yE);
Em(DE);
function wm(e, t = Sn.Legacy) {
  return FE(e, t);
}
function kE(e) {
  return Object.prototype.toString.call(e);
}
function kd(e) {
  return kE(e) === "[object String]";
}
const SE = Object.prototype.hasOwnProperty;
function BE(e, t) {
  return SE.call(e, t);
}
function bo(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(n) {
    if (n) {
      if (typeof n != "object")
        throw new TypeError(n + "must be object");
      Object.keys(n).forEach(function(r) {
        e[r] = n[r];
      });
    }
  }), e;
}
function Um(e, t, n) {
  return [].concat(e.slice(0, t), n, e.slice(t + 1));
}
function Sd(e) {
  return !(e >= 55296 && e <= 57343 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534 || e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e > 1114111);
}
function ca(e) {
  if (e > 65535) {
    e -= 65536;
    const t = 55296 + (e >> 10), n = 56320 + (e & 1023);
    return String.fromCharCode(t, n);
  }
  return String.fromCharCode(e);
}
const Tm = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, IE = /&([a-z#][a-z0-9]{1,31});/gi, NE = new RegExp(Tm.source + "|" + IE.source, "gi"), RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function OE(e, t) {
  if (t.charCodeAt(0) === 35 && RE.test(t)) {
    const r = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
    return Sd(r) ? ca(r) : e;
  }
  const n = wm(e);
  return n !== e ? n : e;
}
function LE(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(Tm, "$1");
}
function zr(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(NE, function(t, n, r) {
    return n || OE(t, r);
  });
}
const WE = /[&<>"]/, ME = /[&<>"]/g, PE = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function qE(e) {
  return PE[e];
}
function Mn(e) {
  return WE.test(e) ? e.replace(ME, qE) : e;
}
const zE = /[.?*+^$[\]\\(){}|-]/g;
function $E(e) {
  return e.replace(zE, "\\$&");
}
function ye(e) {
  switch (e) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function Wi(e) {
  if (e >= 8192 && e <= 8202)
    return !0;
  switch (e) {
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return !0;
  }
  return !1;
}
function Mi(e) {
  return Fd.test(e) || vm.test(e);
}
function Pi(e) {
  switch (e) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function mo(e) {
  return e = e.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (e = e.replace(/ẞ/g, "ß")), e.toLowerCase().toUpperCase();
}
const jE = { mdurl: gE, ucmicro: mE }, HE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arrayReplaceAt: Um,
  assign: bo,
  escapeHtml: Mn,
  escapeRE: $E,
  fromCodePoint: ca,
  has: BE,
  isMdAsciiPunct: Pi,
  isPunctChar: Mi,
  isSpace: ye,
  isString: kd,
  isValidEntityCode: Sd,
  isWhiteSpace: Wi,
  lib: jE,
  normalizeReference: mo,
  unescapeAll: zr,
  unescapeMd: LE
}, Symbol.toStringTag, { value: "Module" }));
function XE(e, t, n) {
  let r, i, u, a;
  const o = e.posMax, c = e.pos;
  for (e.pos = t + 1, r = 1; e.pos < o; ) {
    if (u = e.src.charCodeAt(e.pos), u === 93 && (r--, r === 0)) {
      i = !0;
      break;
    }
    if (a = e.pos, e.md.inline.skipToken(e), u === 91) {
      if (a === e.pos - 1)
        r++;
      else if (n)
        return e.pos = c, -1;
    }
  }
  let s = -1;
  return i && (s = e.pos), e.pos = c, s;
}
function ZE(e, t, n) {
  let r, i = t;
  const u = {
    ok: !1,
    pos: 0,
    str: ""
  };
  if (e.charCodeAt(i) === 60) {
    for (i++; i < n; ) {
      if (r = e.charCodeAt(i), r === 10 || r === 60)
        return u;
      if (r === 62)
        return u.pos = i + 1, u.str = zr(e.slice(t + 1, i)), u.ok = !0, u;
      if (r === 92 && i + 1 < n) {
        i += 2;
        continue;
      }
      i++;
    }
    return u;
  }
  let a = 0;
  for (; i < n && (r = e.charCodeAt(i), !(r === 32 || r < 32 || r === 127)); ) {
    if (r === 92 && i + 1 < n) {
      if (e.charCodeAt(i + 1) === 32)
        break;
      i += 2;
      continue;
    }
    if (r === 40 && (a++, a > 32))
      return u;
    if (r === 41) {
      if (a === 0)
        break;
      a--;
    }
    i++;
  }
  return t === i || a !== 0 || (u.str = zr(e.slice(t, i)), u.pos = i, u.ok = !0), u;
}
function VE(e, t, n, r) {
  let i, u = t;
  const a = {
    // if `true`, this is a valid link title
    ok: !1,
    // if `true`, this link can be continued on the next line
    can_continue: !1,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: "",
    // expected closing marker character code
    marker: 0
  };
  if (r)
    a.str = r.str, a.marker = r.marker;
  else {
    if (u >= n)
      return a;
    let o = e.charCodeAt(u);
    if (o !== 34 && o !== 39 && o !== 40)
      return a;
    t++, u++, o === 40 && (o = 41), a.marker = o;
  }
  for (; u < n; ) {
    if (i = e.charCodeAt(u), i === a.marker)
      return a.pos = u + 1, a.str += zr(e.slice(t, u)), a.ok = !0, a;
    if (i === 40 && a.marker === 41)
      return a;
    i === 92 && u + 1 < n && u++, u++;
  }
  return a.can_continue = !0, a.str += zr(e.slice(t, u)), a;
}
const GE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseLinkDestination: ZE,
  parseLinkLabel: XE,
  parseLinkTitle: VE
}, Symbol.toStringTag, { value: "Module" })), nn = {};
nn.code_inline = function(e, t, n, r, i) {
  const u = e[t];
  return "<code" + i.renderAttrs(u) + ">" + Mn(u.content) + "</code>";
};
nn.code_block = function(e, t, n, r, i) {
  const u = e[t];
  return "<pre" + i.renderAttrs(u) + "><code>" + Mn(e[t].content) + `</code></pre>
`;
};
nn.fence = function(e, t, n, r, i) {
  const u = e[t], a = u.info ? zr(u.info).trim() : "";
  let o = "", c = "";
  if (a) {
    const f = a.split(/(\s+)/g);
    o = f[0], c = f.slice(2).join("");
  }
  let s;
  if (n.highlight ? s = n.highlight(u.content, o, c) || Mn(u.content) : s = Mn(u.content), s.indexOf("<pre") === 0)
    return s + `
`;
  if (a) {
    const f = u.attrIndex("class"), m = u.attrs ? u.attrs.slice() : [];
    f < 0 ? m.push(["class", n.langPrefix + o]) : (m[f] = m[f].slice(), m[f][1] += " " + n.langPrefix + o);
    const b = {
      attrs: m
    };
    return `<pre><code${i.renderAttrs(b)}>${s}</code></pre>
`;
  }
  return `<pre><code${i.renderAttrs(u)}>${s}</code></pre>
`;
};
nn.image = function(e, t, n, r, i) {
  const u = e[t];
  return u.attrs[u.attrIndex("alt")][1] = i.renderInlineAsText(u.children, n, r), i.renderToken(e, t, n);
};
nn.hardbreak = function(e, t, n) {
  return n.xhtmlOut ? `<br />
` : `<br>
`;
};
nn.softbreak = function(e, t, n) {
  return n.breaks ? n.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
nn.text = function(e, t) {
  return Mn(e[t].content);
};
nn.html_block = function(e, t) {
  return e[t].content;
};
nn.html_inline = function(e, t) {
  return e[t].content;
};
function ii() {
  this.rules = bo({}, nn);
}
ii.prototype.renderAttrs = function(t) {
  let n, r, i;
  if (!t.attrs)
    return "";
  for (i = "", n = 0, r = t.attrs.length; n < r; n++)
    i += " " + Mn(t.attrs[n][0]) + '="' + Mn(t.attrs[n][1]) + '"';
  return i;
};
ii.prototype.renderToken = function(t, n, r) {
  const i = t[n];
  let u = "";
  if (i.hidden)
    return "";
  i.block && i.nesting !== -1 && n && t[n - 1].hidden && (u += `
`), u += (i.nesting === -1 ? "</" : "<") + i.tag, u += this.renderAttrs(i), i.nesting === 0 && r.xhtmlOut && (u += " /");
  let a = !1;
  if (i.block && (a = !0, i.nesting === 1 && n + 1 < t.length)) {
    const o = t[n + 1];
    (o.type === "inline" || o.hidden || o.nesting === -1 && o.tag === i.tag) && (a = !1);
  }
  return u += a ? `>
` : ">", u;
};
ii.prototype.renderInline = function(e, t, n) {
  let r = "";
  const i = this.rules;
  for (let u = 0, a = e.length; u < a; u++) {
    const o = e[u].type;
    typeof i[o] < "u" ? r += i[o](e, u, t, n, this) : r += this.renderToken(e, u, t);
  }
  return r;
};
ii.prototype.renderInlineAsText = function(e, t, n) {
  let r = "";
  for (let i = 0, u = e.length; i < u; i++)
    switch (e[i].type) {
      case "text":
        r += e[i].content;
        break;
      case "image":
        r += this.renderInlineAsText(e[i].children, t, n);
        break;
      case "html_inline":
      case "html_block":
        r += e[i].content;
        break;
      case "softbreak":
      case "hardbreak":
        r += `
`;
        break;
    }
  return r;
};
ii.prototype.render = function(e, t, n) {
  let r = "";
  const i = this.rules;
  for (let u = 0, a = e.length; u < a; u++) {
    const o = e[u].type;
    o === "inline" ? r += this.renderInline(e[u].children, t, n) : typeof i[o] < "u" ? r += i[o](e, u, t, n, this) : r += this.renderToken(e, u, t, n);
  }
  return r;
};
function dt() {
  this.__rules__ = [], this.__cache__ = null;
}
dt.prototype.__find__ = function(e) {
  for (let t = 0; t < this.__rules__.length; t++)
    if (this.__rules__[t].name === e)
      return t;
  return -1;
};
dt.prototype.__compile__ = function() {
  const e = this, t = [""];
  e.__rules__.forEach(function(n) {
    n.enabled && n.alt.forEach(function(r) {
      t.indexOf(r) < 0 && t.push(r);
    });
  }), e.__cache__ = {}, t.forEach(function(n) {
    e.__cache__[n] = [], e.__rules__.forEach(function(r) {
      r.enabled && (n && r.alt.indexOf(n) < 0 || e.__cache__[n].push(r.fn));
    });
  });
};
dt.prototype.at = function(e, t, n) {
  const r = this.__find__(e), i = n || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__[r].fn = t, this.__rules__[r].alt = i.alt || [], this.__cache__ = null;
};
dt.prototype.before = function(e, t, n, r) {
  const i = this.__find__(e), u = r || {};
  if (i === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(i, 0, {
    name: t,
    enabled: !0,
    fn: n,
    alt: u.alt || []
  }), this.__cache__ = null;
};
dt.prototype.after = function(e, t, n, r) {
  const i = this.__find__(e), u = r || {};
  if (i === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(i + 1, 0, {
    name: t,
    enabled: !0,
    fn: n,
    alt: u.alt || []
  }), this.__cache__ = null;
};
dt.prototype.push = function(e, t, n) {
  const r = n || {};
  this.__rules__.push({
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
dt.prototype.enable = function(e, t) {
  Array.isArray(e) || (e = [e]);
  const n = [];
  return e.forEach(function(r) {
    const i = this.__find__(r);
    if (i < 0) {
      if (t)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[i].enabled = !0, n.push(r);
  }, this), this.__cache__ = null, n;
};
dt.prototype.enableOnly = function(e, t) {
  Array.isArray(e) || (e = [e]), this.__rules__.forEach(function(n) {
    n.enabled = !1;
  }), this.enable(e, t);
};
dt.prototype.disable = function(e, t) {
  Array.isArray(e) || (e = [e]);
  const n = [];
  return e.forEach(function(r) {
    const i = this.__find__(r);
    if (i < 0) {
      if (t)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[i].enabled = !1, n.push(r);
  }, this), this.__cache__ = null, n;
};
dt.prototype.getRules = function(e) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[e] || [];
};
function zt(e, t, n) {
  this.type = e, this.tag = t, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
zt.prototype.attrIndex = function(t) {
  if (!this.attrs)
    return -1;
  const n = this.attrs;
  for (let r = 0, i = n.length; r < i; r++)
    if (n[r][0] === t)
      return r;
  return -1;
};
zt.prototype.attrPush = function(t) {
  this.attrs ? this.attrs.push(t) : this.attrs = [t];
};
zt.prototype.attrSet = function(t, n) {
  const r = this.attrIndex(t), i = [t, n];
  r < 0 ? this.attrPush(i) : this.attrs[r] = i;
};
zt.prototype.attrGet = function(t) {
  const n = this.attrIndex(t);
  let r = null;
  return n >= 0 && (r = this.attrs[n][1]), r;
};
zt.prototype.attrJoin = function(t, n) {
  const r = this.attrIndex(t);
  r < 0 ? this.attrPush([t, n]) : this.attrs[r][1] = this.attrs[r][1] + " " + n;
};
function Cm(e, t, n) {
  this.src = e, this.env = n, this.tokens = [], this.inlineMode = !1, this.md = t;
}
Cm.prototype.Token = zt;
const YE = /\r\n?|\n/g, KE = /\0/g;
function QE(e) {
  let t;
  t = e.src.replace(YE, `
`), t = t.replace(KE, "�"), e.src = t;
}
function JE(e) {
  let t;
  e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
function e5(e) {
  const t = e.tokens;
  for (let n = 0, r = t.length; n < r; n++) {
    const i = t[n];
    i.type === "inline" && e.md.inline.parse(i.content, e.md, e.env, i.children);
  }
}
function t5(e) {
  return /^<a[>\s]/i.test(e);
}
function n5(e) {
  return /^<\/a\s*>/i.test(e);
}
function r5(e) {
  const t = e.tokens;
  if (e.md.options.linkify)
    for (let n = 0, r = t.length; n < r; n++) {
      if (t[n].type !== "inline" || !e.md.linkify.pretest(t[n].content))
        continue;
      let i = t[n].children, u = 0;
      for (let a = i.length - 1; a >= 0; a--) {
        const o = i[a];
        if (o.type === "link_close") {
          for (a--; i[a].level !== o.level && i[a].type !== "link_open"; )
            a--;
          continue;
        }
        if (o.type === "html_inline" && (t5(o.content) && u > 0 && u--, n5(o.content) && u++), !(u > 0) && o.type === "text" && e.md.linkify.test(o.content)) {
          const c = o.content;
          let s = e.md.linkify.match(c);
          const f = [];
          let m = o.level, b = 0;
          s.length > 0 && s[0].index === 0 && a > 0 && i[a - 1].type === "text_special" && (s = s.slice(1));
          for (let p = 0; p < s.length; p++) {
            const l = s[p].url, g = e.md.normalizeLink(l);
            if (!e.md.validateLink(g))
              continue;
            let D = s[p].text;
            s[p].schema ? s[p].schema === "mailto:" && !/^mailto:/i.test(D) ? D = e.md.normalizeLinkText("mailto:" + D).replace(/^mailto:/, "") : D = e.md.normalizeLinkText(D) : D = e.md.normalizeLinkText("http://" + D).replace(/^http:\/\//, "");
            const h = s[p].index;
            if (h > b) {
              const v = new e.Token("text", "", 0);
              v.content = c.slice(b, h), v.level = m, f.push(v);
            }
            const d = new e.Token("link_open", "a", 1);
            d.attrs = [["href", g]], d.level = m++, d.markup = "linkify", d.info = "auto", f.push(d);
            const y = new e.Token("text", "", 0);
            y.content = D, y.level = m, f.push(y);
            const x = new e.Token("link_close", "a", -1);
            x.level = --m, x.markup = "linkify", x.info = "auto", f.push(x), b = s[p].lastIndex;
          }
          if (b < c.length) {
            const p = new e.Token("text", "", 0);
            p.content = c.slice(b), p.level = m, f.push(p);
          }
          t[n].children = i = Um(i, a, f);
        }
      }
    }
}
const Am = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, i5 = /\((c|tm|r)\)/i, u5 = /\((c|tm|r)\)/ig, a5 = {
  c: "©",
  r: "®",
  tm: "™"
};
function o5(e, t) {
  return a5[t.toLowerCase()];
}
function c5(e) {
  let t = 0;
  for (let n = e.length - 1; n >= 0; n--) {
    const r = e[n];
    r.type === "text" && !t && (r.content = r.content.replace(u5, o5)), r.type === "link_open" && r.info === "auto" && t--, r.type === "link_close" && r.info === "auto" && t++;
  }
}
function s5(e) {
  let t = 0;
  for (let n = e.length - 1; n >= 0; n--) {
    const r = e[n];
    r.type === "text" && !t && Am.test(r.content) && (r.content = r.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), r.type === "link_open" && r.info === "auto" && t--, r.type === "link_close" && r.info === "auto" && t++;
  }
}
function f5(e) {
  let t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type === "inline" && (i5.test(e.tokens[t].content) && c5(e.tokens[t].children), Am.test(e.tokens[t].content) && s5(e.tokens[t].children));
}
const d5 = /['"]/, Dp = /['"]/g, xp = "’";
function Nu(e, t, n) {
  return e.slice(0, t) + n + e.slice(t + 1);
}
function l5(e, t) {
  let n;
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const u = e[i], a = e[i].level;
    for (n = r.length - 1; n >= 0 && !(r[n].level <= a); n--)
      ;
    if (r.length = n + 1, u.type !== "text")
      continue;
    let o = u.content, c = 0, s = o.length;
    e:
      for (; c < s; ) {
        Dp.lastIndex = c;
        const f = Dp.exec(o);
        if (!f)
          break;
        let m = !0, b = !0;
        c = f.index + 1;
        const p = f[0] === "'";
        let l = 32;
        if (f.index - 1 >= 0)
          l = o.charCodeAt(f.index - 1);
        else
          for (n = i - 1; n >= 0 && !(e[n].type === "softbreak" || e[n].type === "hardbreak"); n--)
            if (e[n].content) {
              l = e[n].content.charCodeAt(e[n].content.length - 1);
              break;
            }
        let g = 32;
        if (c < s)
          g = o.charCodeAt(c);
        else
          for (n = i + 1; n < e.length && !(e[n].type === "softbreak" || e[n].type === "hardbreak"); n++)
            if (e[n].content) {
              g = e[n].content.charCodeAt(0);
              break;
            }
        const D = Pi(l) || Mi(String.fromCharCode(l)), h = Pi(g) || Mi(String.fromCharCode(g)), d = Wi(l), y = Wi(g);
        if (y ? m = !1 : h && (d || D || (m = !1)), d ? b = !1 : D && (y || h || (b = !1)), g === 34 && f[0] === '"' && l >= 48 && l <= 57 && (b = m = !1), m && b && (m = D, b = h), !m && !b) {
          p && (u.content = Nu(u.content, f.index, xp));
          continue;
        }
        if (b)
          for (n = r.length - 1; n >= 0; n--) {
            let x = r[n];
            if (r[n].level < a)
              break;
            if (x.single === p && r[n].level === a) {
              x = r[n];
              let v, _;
              p ? (v = t.md.options.quotes[2], _ = t.md.options.quotes[3]) : (v = t.md.options.quotes[0], _ = t.md.options.quotes[1]), u.content = Nu(u.content, f.index, _), e[x.token].content = Nu(
                e[x.token].content,
                x.pos,
                v
              ), c += _.length - 1, x.token === i && (c += v.length - 1), o = u.content, s = o.length, r.length = n;
              continue e;
            }
          }
        m ? r.push({
          token: i,
          pos: f.index,
          single: p,
          level: a
        }) : b && p && (u.content = Nu(u.content, f.index, xp));
      }
  }
}
function h5(e) {
  if (e.md.options.typographer)
    for (let t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type !== "inline" || !d5.test(e.tokens[t].content) || l5(e.tokens[t].children, e);
}
function p5(e) {
  let t, n;
  const r = e.tokens, i = r.length;
  for (let u = 0; u < i; u++) {
    if (r[u].type !== "inline") continue;
    const a = r[u].children, o = a.length;
    for (t = 0; t < o; t++)
      a[t].type === "text_special" && (a[t].type = "text");
    for (t = n = 0; t < o; t++)
      a[t].type === "text" && t + 1 < o && a[t + 1].type === "text" ? a[t + 1].content = a[t].content + a[t + 1].content : (t !== n && (a[n] = a[t]), n++);
    t !== n && (a.length = n);
  }
}
const hs = [
  ["normalize", QE],
  ["block", JE],
  ["inline", e5],
  ["linkify", r5],
  ["replacements", f5],
  ["smartquotes", h5],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", p5]
];
function Bd() {
  this.ruler = new dt();
  for (let e = 0; e < hs.length; e++)
    this.ruler.push(hs[e][0], hs[e][1]);
}
Bd.prototype.process = function(e) {
  const t = this.ruler.getRules("");
  for (let n = 0, r = t.length; n < r; n++)
    t[n](e);
};
Bd.prototype.State = Cm;
function rn(e, t, n, r) {
  this.src = e, this.md = t, this.env = n, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
  const i = this.src;
  for (let u = 0, a = 0, o = 0, c = 0, s = i.length, f = !1; a < s; a++) {
    const m = i.charCodeAt(a);
    if (!f)
      if (ye(m)) {
        o++, m === 9 ? c += 4 - c % 4 : c++;
        continue;
      } else
        f = !0;
    (m === 10 || a === s - 1) && (m !== 10 && a++, this.bMarks.push(u), this.eMarks.push(a), this.tShift.push(o), this.sCount.push(c), this.bsCount.push(0), f = !1, o = 0, c = 0, u = a + 1);
  }
  this.bMarks.push(i.length), this.eMarks.push(i.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
rn.prototype.push = function(e, t, n) {
  const r = new zt(e, t, n);
  return r.block = !0, n < 0 && this.level--, r.level = this.level, n > 0 && this.level++, this.tokens.push(r), r;
};
rn.prototype.isEmpty = function(t) {
  return this.bMarks[t] + this.tShift[t] >= this.eMarks[t];
};
rn.prototype.skipEmptyLines = function(t) {
  for (let n = this.lineMax; t < n && !(this.bMarks[t] + this.tShift[t] < this.eMarks[t]); t++)
    ;
  return t;
};
rn.prototype.skipSpaces = function(t) {
  for (let n = this.src.length; t < n; t++) {
    const r = this.src.charCodeAt(t);
    if (!ye(r))
      break;
  }
  return t;
};
rn.prototype.skipSpacesBack = function(t, n) {
  if (t <= n)
    return t;
  for (; t > n; )
    if (!ye(this.src.charCodeAt(--t)))
      return t + 1;
  return t;
};
rn.prototype.skipChars = function(t, n) {
  for (let r = this.src.length; t < r && this.src.charCodeAt(t) === n; t++)
    ;
  return t;
};
rn.prototype.skipCharsBack = function(t, n, r) {
  if (t <= r)
    return t;
  for (; t > r; )
    if (n !== this.src.charCodeAt(--t))
      return t + 1;
  return t;
};
rn.prototype.getLines = function(t, n, r, i) {
  if (t >= n)
    return "";
  const u = new Array(n - t);
  for (let a = 0, o = t; o < n; o++, a++) {
    let c = 0;
    const s = this.bMarks[o];
    let f = s, m;
    for (o + 1 < n || i ? m = this.eMarks[o] + 1 : m = this.eMarks[o]; f < m && c < r; ) {
      const b = this.src.charCodeAt(f);
      if (ye(b))
        b === 9 ? c += 4 - (c + this.bsCount[o]) % 4 : c++;
      else if (f - s < this.tShift[o])
        c++;
      else
        break;
      f++;
    }
    c > r ? u[a] = new Array(c - r + 1).join(" ") + this.src.slice(f, m) : u[a] = this.src.slice(f, m);
  }
  return u.join("");
};
rn.prototype.Token = zt;
const g5 = 65536;
function ps(e, t) {
  const n = e.bMarks[t] + e.tShift[t], r = e.eMarks[t];
  return e.src.slice(n, r);
}
function vp(e) {
  const t = [], n = e.length;
  let r = 0, i = e.charCodeAt(r), u = !1, a = 0, o = "";
  for (; r < n; )
    i === 124 && (u ? (o += e.substring(a, r - 1), a = r) : (t.push(o + e.substring(a, r)), o = "", a = r + 1)), u = i === 92, r++, i = e.charCodeAt(r);
  return t.push(o + e.substring(a)), t;
}
function b5(e, t, n, r) {
  if (t + 2 > n)
    return !1;
  let i = t + 1;
  if (e.sCount[i] < e.blkIndent || e.sCount[i] - e.blkIndent >= 4)
    return !1;
  let u = e.bMarks[i] + e.tShift[i];
  if (u >= e.eMarks[i])
    return !1;
  const a = e.src.charCodeAt(u++);
  if (a !== 124 && a !== 45 && a !== 58 || u >= e.eMarks[i])
    return !1;
  const o = e.src.charCodeAt(u++);
  if (o !== 124 && o !== 45 && o !== 58 && !ye(o) || a === 45 && ye(o))
    return !1;
  for (; u < e.eMarks[i]; ) {
    const x = e.src.charCodeAt(u);
    if (x !== 124 && x !== 45 && x !== 58 && !ye(x))
      return !1;
    u++;
  }
  let c = ps(e, t + 1), s = c.split("|");
  const f = [];
  for (let x = 0; x < s.length; x++) {
    const v = s[x].trim();
    if (!v) {
      if (x === 0 || x === s.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(v))
      return !1;
    v.charCodeAt(v.length - 1) === 58 ? f.push(v.charCodeAt(0) === 58 ? "center" : "right") : v.charCodeAt(0) === 58 ? f.push("left") : f.push("");
  }
  if (c = ps(e, t).trim(), c.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4)
    return !1;
  s = vp(c), s.length && s[0] === "" && s.shift(), s.length && s[s.length - 1] === "" && s.pop();
  const m = s.length;
  if (m === 0 || m !== f.length)
    return !1;
  if (r)
    return !0;
  const b = e.parentType;
  e.parentType = "table";
  const p = e.md.block.ruler.getRules("blockquote"), l = e.push("table_open", "table", 1), g = [t, 0];
  l.map = g;
  const D = e.push("thead_open", "thead", 1);
  D.map = [t, t + 1];
  const h = e.push("tr_open", "tr", 1);
  h.map = [t, t + 1];
  for (let x = 0; x < s.length; x++) {
    const v = e.push("th_open", "th", 1);
    f[x] && (v.attrs = [["style", "text-align:" + f[x]]]);
    const _ = e.push("inline", "", 0);
    _.content = s[x].trim(), _.children = [], e.push("th_close", "th", -1);
  }
  e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
  let d, y = 0;
  for (i = t + 2; i < n && !(e.sCount[i] < e.blkIndent); i++) {
    let x = !1;
    for (let _ = 0, w = p.length; _ < w; _++)
      if (p[_](e, i, n, !0)) {
        x = !0;
        break;
      }
    if (x || (c = ps(e, i).trim(), !c) || e.sCount[i] - e.blkIndent >= 4 || (s = vp(c), s.length && s[0] === "" && s.shift(), s.length && s[s.length - 1] === "" && s.pop(), y += m - s.length, y > g5))
      break;
    if (i === t + 2) {
      const _ = e.push("tbody_open", "tbody", 1);
      _.map = d = [t + 2, 0];
    }
    const v = e.push("tr_open", "tr", 1);
    v.map = [i, i + 1];
    for (let _ = 0; _ < m; _++) {
      const w = e.push("td_open", "td", 1);
      f[_] && (w.attrs = [["style", "text-align:" + f[_]]]);
      const A = e.push("inline", "", 0);
      A.content = s[_] ? s[_].trim() : "", A.children = [], e.push("td_close", "td", -1);
    }
    e.push("tr_close", "tr", -1);
  }
  return d && (e.push("tbody_close", "tbody", -1), d[1] = i), e.push("table_close", "table", -1), g[1] = i, e.parentType = b, e.line = i, !0;
}
function m5(e, t, n) {
  if (e.sCount[t] - e.blkIndent < 4)
    return !1;
  let r = t + 1, i = r;
  for (; r < n; ) {
    if (e.isEmpty(r)) {
      r++;
      continue;
    }
    if (e.sCount[r] - e.blkIndent >= 4) {
      r++, i = r;
      continue;
    }
    break;
  }
  e.line = i;
  const u = e.push("code_block", "code", 0);
  return u.content = e.getLines(t, i, 4 + e.blkIndent, !1) + `
`, u.map = [t, e.line], !0;
}
function y5(e, t, n, r) {
  let i = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || i + 3 > u)
    return !1;
  const a = e.src.charCodeAt(i);
  if (a !== 126 && a !== 96)
    return !1;
  let o = i;
  i = e.skipChars(i, a);
  let c = i - o;
  if (c < 3)
    return !1;
  const s = e.src.slice(o, i), f = e.src.slice(i, u);
  if (a === 96 && f.indexOf(String.fromCharCode(a)) >= 0)
    return !1;
  if (r)
    return !0;
  let m = t, b = !1;
  for (; m++, !(m >= n || (i = o = e.bMarks[m] + e.tShift[m], u = e.eMarks[m], i < u && e.sCount[m] < e.blkIndent)); )
    if (e.src.charCodeAt(i) === a && !(e.sCount[m] - e.blkIndent >= 4) && (i = e.skipChars(i, a), !(i - o < c) && (i = e.skipSpaces(i), !(i < u)))) {
      b = !0;
      break;
    }
  c = e.sCount[t], e.line = m + (b ? 1 : 0);
  const p = e.push("fence", "code", 0);
  return p.info = f, p.content = e.getLines(t + 1, m, c, !0), p.markup = s, p.map = [t, e.line], !0;
}
function D5(e, t, n, r) {
  let i = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  const a = e.lineMax;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(i) !== 62)
    return !1;
  if (r)
    return !0;
  const o = [], c = [], s = [], f = [], m = e.md.block.ruler.getRules("blockquote"), b = e.parentType;
  e.parentType = "blockquote";
  let p = !1, l;
  for (l = t; l < n; l++) {
    const y = e.sCount[l] < e.blkIndent;
    if (i = e.bMarks[l] + e.tShift[l], u = e.eMarks[l], i >= u)
      break;
    if (e.src.charCodeAt(i++) === 62 && !y) {
      let v = e.sCount[l] + 1, _, w;
      e.src.charCodeAt(i) === 32 ? (i++, v++, w = !1, _ = !0) : e.src.charCodeAt(i) === 9 ? (_ = !0, (e.bsCount[l] + v) % 4 === 3 ? (i++, v++, w = !1) : w = !0) : _ = !1;
      let A = v;
      for (o.push(e.bMarks[l]), e.bMarks[l] = i; i < u; ) {
        const B = e.src.charCodeAt(i);
        if (ye(B))
          B === 9 ? A += 4 - (A + e.bsCount[l] + (w ? 1 : 0)) % 4 : A++;
        else
          break;
        i++;
      }
      p = i >= u, c.push(e.bsCount[l]), e.bsCount[l] = e.sCount[l] + 1 + (_ ? 1 : 0), s.push(e.sCount[l]), e.sCount[l] = A - v, f.push(e.tShift[l]), e.tShift[l] = i - e.bMarks[l];
      continue;
    }
    if (p)
      break;
    let x = !1;
    for (let v = 0, _ = m.length; v < _; v++)
      if (m[v](e, l, n, !0)) {
        x = !0;
        break;
      }
    if (x) {
      e.lineMax = l, e.blkIndent !== 0 && (o.push(e.bMarks[l]), c.push(e.bsCount[l]), f.push(e.tShift[l]), s.push(e.sCount[l]), e.sCount[l] -= e.blkIndent);
      break;
    }
    o.push(e.bMarks[l]), c.push(e.bsCount[l]), f.push(e.tShift[l]), s.push(e.sCount[l]), e.sCount[l] = -1;
  }
  const g = e.blkIndent;
  e.blkIndent = 0;
  const D = e.push("blockquote_open", "blockquote", 1);
  D.markup = ">";
  const h = [t, 0];
  D.map = h, e.md.block.tokenize(e, t, l);
  const d = e.push("blockquote_close", "blockquote", -1);
  d.markup = ">", e.lineMax = a, e.parentType = b, h[1] = e.line;
  for (let y = 0; y < f.length; y++)
    e.bMarks[y + t] = o[y], e.tShift[y + t] = f[y], e.sCount[y + t] = s[y], e.bsCount[y + t] = c[y];
  return e.blkIndent = g, !0;
}
function x5(e, t, n, r) {
  const i = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  let u = e.bMarks[t] + e.tShift[t];
  const a = e.src.charCodeAt(u++);
  if (a !== 42 && a !== 45 && a !== 95)
    return !1;
  let o = 1;
  for (; u < i; ) {
    const s = e.src.charCodeAt(u++);
    if (s !== a && !ye(s))
      return !1;
    s === a && o++;
  }
  if (o < 3)
    return !1;
  if (r)
    return !0;
  e.line = t + 1;
  const c = e.push("hr", "hr", 0);
  return c.map = [t, e.line], c.markup = Array(o + 1).join(String.fromCharCode(a)), !0;
}
function _p(e, t) {
  const n = e.eMarks[t];
  let r = e.bMarks[t] + e.tShift[t];
  const i = e.src.charCodeAt(r++);
  if (i !== 42 && i !== 45 && i !== 43)
    return -1;
  if (r < n) {
    const u = e.src.charCodeAt(r);
    if (!ye(u))
      return -1;
  }
  return r;
}
function Ep(e, t) {
  const n = e.bMarks[t] + e.tShift[t], r = e.eMarks[t];
  let i = n;
  if (i + 1 >= r)
    return -1;
  let u = e.src.charCodeAt(i++);
  if (u < 48 || u > 57)
    return -1;
  for (; ; ) {
    if (i >= r)
      return -1;
    if (u = e.src.charCodeAt(i++), u >= 48 && u <= 57) {
      if (i - n >= 10)
        return -1;
      continue;
    }
    if (u === 41 || u === 46)
      break;
    return -1;
  }
  return i < r && (u = e.src.charCodeAt(i), !ye(u)) ? -1 : i;
}
function v5(e, t) {
  const n = e.level + 2;
  for (let r = t + 2, i = e.tokens.length - 2; r < i; r++)
    e.tokens[r].level === n && e.tokens[r].type === "paragraph_open" && (e.tokens[r + 2].hidden = !0, e.tokens[r].hidden = !0, r += 2);
}
function _5(e, t, n, r) {
  let i, u, a, o, c = t, s = !0;
  if (e.sCount[c] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[c] - e.listIndent >= 4 && e.sCount[c] < e.blkIndent)
    return !1;
  let f = !1;
  r && e.parentType === "paragraph" && e.sCount[c] >= e.blkIndent && (f = !0);
  let m, b, p;
  if ((p = Ep(e, c)) >= 0) {
    if (m = !0, a = e.bMarks[c] + e.tShift[c], b = Number(e.src.slice(a, p - 1)), f && b !== 1) return !1;
  } else if ((p = _p(e, c)) >= 0)
    m = !1;
  else
    return !1;
  if (f && e.skipSpaces(p) >= e.eMarks[c])
    return !1;
  if (r)
    return !0;
  const l = e.src.charCodeAt(p - 1), g = e.tokens.length;
  m ? (o = e.push("ordered_list_open", "ol", 1), b !== 1 && (o.attrs = [["start", b]])) : o = e.push("bullet_list_open", "ul", 1);
  const D = [c, 0];
  o.map = D, o.markup = String.fromCharCode(l);
  let h = !1;
  const d = e.md.block.ruler.getRules("list"), y = e.parentType;
  for (e.parentType = "list"; c < n; ) {
    u = p, i = e.eMarks[c];
    const x = e.sCount[c] + p - (e.bMarks[c] + e.tShift[c]);
    let v = x;
    for (; u < i; ) {
      const G = e.src.charCodeAt(u);
      if (G === 9)
        v += 4 - (v + e.bsCount[c]) % 4;
      else if (G === 32)
        v++;
      else
        break;
      u++;
    }
    const _ = u;
    let w;
    _ >= i ? w = 1 : w = v - x, w > 4 && (w = 1);
    const A = x + w;
    o = e.push("list_item_open", "li", 1), o.markup = String.fromCharCode(l);
    const B = [c, 0];
    o.map = B, m && (o.info = e.src.slice(a, p - 1));
    const P = e.tight, L = e.tShift[c], I = e.sCount[c], z = e.listIndent;
    if (e.listIndent = e.blkIndent, e.blkIndent = A, e.tight = !0, e.tShift[c] = _ - e.bMarks[c], e.sCount[c] = v, _ >= i && e.isEmpty(c + 1) ? e.line = Math.min(e.line + 2, n) : e.md.block.tokenize(e, c, n, !0), (!e.tight || h) && (s = !1), h = e.line - c > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = z, e.tShift[c] = L, e.sCount[c] = I, e.tight = P, o = e.push("list_item_close", "li", -1), o.markup = String.fromCharCode(l), c = e.line, B[1] = c, c >= n || e.sCount[c] < e.blkIndent || e.sCount[c] - e.blkIndent >= 4)
      break;
    let H = !1;
    for (let G = 0, C = d.length; G < C; G++)
      if (d[G](e, c, n, !0)) {
        H = !0;
        break;
      }
    if (H)
      break;
    if (m) {
      if (p = Ep(e, c), p < 0)
        break;
      a = e.bMarks[c] + e.tShift[c];
    } else if (p = _p(e, c), p < 0)
      break;
    if (l !== e.src.charCodeAt(p - 1))
      break;
  }
  return m ? o = e.push("ordered_list_close", "ol", -1) : o = e.push("bullet_list_close", "ul", -1), o.markup = String.fromCharCode(l), D[1] = c, e.line = c, e.parentType = y, s && v5(e, g), !0;
}
function E5(e, t, n, r) {
  let i = e.bMarks[t] + e.tShift[t], u = e.eMarks[t], a = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(i) !== 91)
    return !1;
  function o(d) {
    const y = e.lineMax;
    if (d >= y || e.isEmpty(d))
      return null;
    let x = !1;
    if (e.sCount[d] - e.blkIndent > 3 && (x = !0), e.sCount[d] < 0 && (x = !0), !x) {
      const w = e.md.block.ruler.getRules("reference"), A = e.parentType;
      e.parentType = "reference";
      let B = !1;
      for (let P = 0, L = w.length; P < L; P++)
        if (w[P](e, d, y, !0)) {
          B = !0;
          break;
        }
      if (e.parentType = A, B)
        return null;
    }
    const v = e.bMarks[d] + e.tShift[d], _ = e.eMarks[d];
    return e.src.slice(v, _ + 1);
  }
  let c = e.src.slice(i, u + 1);
  u = c.length;
  let s = -1;
  for (i = 1; i < u; i++) {
    const d = c.charCodeAt(i);
    if (d === 91)
      return !1;
    if (d === 93) {
      s = i;
      break;
    } else if (d === 10) {
      const y = o(a);
      y !== null && (c += y, u = c.length, a++);
    } else if (d === 92 && (i++, i < u && c.charCodeAt(i) === 10)) {
      const y = o(a);
      y !== null && (c += y, u = c.length, a++);
    }
  }
  if (s < 0 || c.charCodeAt(s + 1) !== 58)
    return !1;
  for (i = s + 2; i < u; i++) {
    const d = c.charCodeAt(i);
    if (d === 10) {
      const y = o(a);
      y !== null && (c += y, u = c.length, a++);
    } else if (!ye(d)) break;
  }
  const f = e.md.helpers.parseLinkDestination(c, i, u);
  if (!f.ok)
    return !1;
  const m = e.md.normalizeLink(f.str);
  if (!e.md.validateLink(m))
    return !1;
  i = f.pos;
  const b = i, p = a, l = i;
  for (; i < u; i++) {
    const d = c.charCodeAt(i);
    if (d === 10) {
      const y = o(a);
      y !== null && (c += y, u = c.length, a++);
    } else if (!ye(d)) break;
  }
  let g = e.md.helpers.parseLinkTitle(c, i, u);
  for (; g.can_continue; ) {
    const d = o(a);
    if (d === null) break;
    c += d, i = u, u = c.length, a++, g = e.md.helpers.parseLinkTitle(c, i, u, g);
  }
  let D;
  for (i < u && l !== i && g.ok ? (D = g.str, i = g.pos) : (D = "", i = b, a = p); i < u; ) {
    const d = c.charCodeAt(i);
    if (!ye(d))
      break;
    i++;
  }
  if (i < u && c.charCodeAt(i) !== 10 && D)
    for (D = "", i = b, a = p; i < u; ) {
      const d = c.charCodeAt(i);
      if (!ye(d))
        break;
      i++;
    }
  if (i < u && c.charCodeAt(i) !== 10)
    return !1;
  const h = mo(c.slice(1, s));
  return h ? (r || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[h] > "u" && (e.env.references[h] = { title: D, href: m }), e.line = a), !0) : !1;
}
const w5 = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], U5 = "[a-zA-Z_:][a-zA-Z0-9:._-]*", T5 = "[^\"'=<>`\\x00-\\x20]+", C5 = "'[^']*'", A5 = '"[^"]*"', F5 = "(?:" + T5 + "|" + C5 + "|" + A5 + ")", k5 = "(?:\\s+" + U5 + "(?:\\s*=\\s*" + F5 + ")?)", Fm = "<[A-Za-z][A-Za-z0-9\\-]*" + k5 + "*\\s*\\/?>", km = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", S5 = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->", B5 = "<[?][\\s\\S]*?[?]>", I5 = "<![A-Za-z][^>]*>", N5 = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", R5 = new RegExp("^(?:" + Fm + "|" + km + "|" + S5 + "|" + B5 + "|" + I5 + "|" + N5 + ")"), O5 = new RegExp("^(?:" + Fm + "|" + km + ")"), vr = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + w5.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(O5.source + "\\s*$"), /^$/, !1]
];
function L5(e, t, n, r) {
  let i = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(i) !== 60)
    return !1;
  let a = e.src.slice(i, u), o = 0;
  for (; o < vr.length && !vr[o][0].test(a); o++)
    ;
  if (o === vr.length)
    return !1;
  if (r)
    return vr[o][2];
  let c = t + 1;
  if (!vr[o][1].test(a)) {
    for (; c < n && !(e.sCount[c] < e.blkIndent); c++)
      if (i = e.bMarks[c] + e.tShift[c], u = e.eMarks[c], a = e.src.slice(i, u), vr[o][1].test(a)) {
        a.length !== 0 && c++;
        break;
      }
  }
  e.line = c;
  const s = e.push("html_block", "", 0);
  return s.map = [t, c], s.content = e.getLines(t, c, e.blkIndent, !0), !0;
}
function W5(e, t, n, r) {
  let i = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  let a = e.src.charCodeAt(i);
  if (a !== 35 || i >= u)
    return !1;
  let o = 1;
  for (a = e.src.charCodeAt(++i); a === 35 && i < u && o <= 6; )
    o++, a = e.src.charCodeAt(++i);
  if (o > 6 || i < u && !ye(a))
    return !1;
  if (r)
    return !0;
  u = e.skipSpacesBack(u, i);
  const c = e.skipCharsBack(u, 35, i);
  c > i && ye(e.src.charCodeAt(c - 1)) && (u = c), e.line = t + 1;
  const s = e.push("heading_open", "h" + String(o), 1);
  s.markup = "########".slice(0, o), s.map = [t, e.line];
  const f = e.push("inline", "", 0);
  f.content = e.src.slice(i, u).trim(), f.map = [t, e.line], f.children = [];
  const m = e.push("heading_close", "h" + String(o), -1);
  return m.markup = "########".slice(0, o), !0;
}
function M5(e, t, n) {
  const r = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  const i = e.parentType;
  e.parentType = "paragraph";
  let u = 0, a, o = t + 1;
  for (; o < n && !e.isEmpty(o); o++) {
    if (e.sCount[o] - e.blkIndent > 3)
      continue;
    if (e.sCount[o] >= e.blkIndent) {
      let p = e.bMarks[o] + e.tShift[o];
      const l = e.eMarks[o];
      if (p < l && (a = e.src.charCodeAt(p), (a === 45 || a === 61) && (p = e.skipChars(p, a), p = e.skipSpaces(p), p >= l))) {
        u = a === 61 ? 1 : 2;
        break;
      }
    }
    if (e.sCount[o] < 0)
      continue;
    let b = !1;
    for (let p = 0, l = r.length; p < l; p++)
      if (r[p](e, o, n, !0)) {
        b = !0;
        break;
      }
    if (b)
      break;
  }
  if (!u)
    return !1;
  const c = e.getLines(t, o, e.blkIndent, !1).trim();
  e.line = o + 1;
  const s = e.push("heading_open", "h" + String(u), 1);
  s.markup = String.fromCharCode(a), s.map = [t, e.line];
  const f = e.push("inline", "", 0);
  f.content = c, f.map = [t, e.line - 1], f.children = [];
  const m = e.push("heading_close", "h" + String(u), -1);
  return m.markup = String.fromCharCode(a), e.parentType = i, !0;
}
function P5(e, t, n) {
  const r = e.md.block.ruler.getRules("paragraph"), i = e.parentType;
  let u = t + 1;
  for (e.parentType = "paragraph"; u < n && !e.isEmpty(u); u++) {
    if (e.sCount[u] - e.blkIndent > 3 || e.sCount[u] < 0)
      continue;
    let s = !1;
    for (let f = 0, m = r.length; f < m; f++)
      if (r[f](e, u, n, !0)) {
        s = !0;
        break;
      }
    if (s)
      break;
  }
  const a = e.getLines(t, u, e.blkIndent, !1).trim();
  e.line = u;
  const o = e.push("paragraph_open", "p", 1);
  o.map = [t, e.line];
  const c = e.push("inline", "", 0);
  return c.content = a, c.map = [t, e.line], c.children = [], e.push("paragraph_close", "p", -1), e.parentType = i, !0;
}
const Ru = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", b5, ["paragraph", "reference"]],
  ["code", m5],
  ["fence", y5, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", D5, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", x5, ["paragraph", "reference", "blockquote", "list"]],
  ["list", _5, ["paragraph", "reference", "blockquote"]],
  ["reference", E5],
  ["html_block", L5, ["paragraph", "reference", "blockquote"]],
  ["heading", W5, ["paragraph", "reference", "blockquote"]],
  ["lheading", M5],
  ["paragraph", P5]
];
function yo() {
  this.ruler = new dt();
  for (let e = 0; e < Ru.length; e++)
    this.ruler.push(Ru[e][0], Ru[e][1], { alt: (Ru[e][2] || []).slice() });
}
yo.prototype.tokenize = function(e, t, n) {
  const r = this.ruler.getRules(""), i = r.length, u = e.md.options.maxNesting;
  let a = t, o = !1;
  for (; a < n && (e.line = a = e.skipEmptyLines(a), !(a >= n || e.sCount[a] < e.blkIndent)); ) {
    if (e.level >= u) {
      e.line = n;
      break;
    }
    const c = e.line;
    let s = !1;
    for (let f = 0; f < i; f++)
      if (s = r[f](e, a, n, !1), s) {
        if (c >= e.line)
          throw new Error("block rule didn't increment state.line");
        break;
      }
    if (!s) throw new Error("none of the block rules matched");
    e.tight = !o, e.isEmpty(e.line - 1) && (o = !0), a = e.line, a < n && e.isEmpty(a) && (o = !0, a++, e.line = a);
  }
};
yo.prototype.parse = function(e, t, n, r) {
  if (!e)
    return;
  const i = new this.State(e, t, n, r);
  this.tokenize(i, i.line, i.lineMax);
};
yo.prototype.State = rn;
function su(e, t, n, r) {
  this.src = e, this.env = n, this.md = t, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
su.prototype.pushPending = function() {
  const e = new zt("text", "", 0);
  return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
};
su.prototype.push = function(e, t, n) {
  this.pending && this.pushPending();
  const r = new zt(e, t, n);
  let i = null;
  return n < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), r.level = this.level, n > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], i = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(r), this.tokens_meta.push(i), r;
};
su.prototype.scanDelims = function(e, t) {
  const n = this.posMax, r = this.src.charCodeAt(e), i = e > 0 ? this.src.charCodeAt(e - 1) : 32;
  let u = e;
  for (; u < n && this.src.charCodeAt(u) === r; )
    u++;
  const a = u - e, o = u < n ? this.src.charCodeAt(u) : 32, c = Pi(i) || Mi(String.fromCharCode(i)), s = Pi(o) || Mi(String.fromCharCode(o)), f = Wi(i), m = Wi(o), b = !m && (!s || f || c), p = !f && (!c || m || s);
  return { can_open: b && (t || !p || c), can_close: p && (t || !b || s), length: a };
};
su.prototype.Token = zt;
function q5(e) {
  switch (e) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function z5(e, t) {
  let n = e.pos;
  for (; n < e.posMax && !q5(e.src.charCodeAt(n)); )
    n++;
  return n === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, n)), e.pos = n, !0);
}
const $5 = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function j5(e, t) {
  if (!e.md.options.linkify || e.linkLevel > 0) return !1;
  const n = e.pos, r = e.posMax;
  if (n + 3 > r || e.src.charCodeAt(n) !== 58 || e.src.charCodeAt(n + 1) !== 47 || e.src.charCodeAt(n + 2) !== 47) return !1;
  const i = e.pending.match($5);
  if (!i) return !1;
  const u = i[1], a = e.md.linkify.matchAtStart(e.src.slice(n - u.length));
  if (!a) return !1;
  let o = a.url;
  if (o.length <= u.length) return !1;
  o = o.replace(/\*+$/, "");
  const c = e.md.normalizeLink(o);
  if (!e.md.validateLink(c)) return !1;
  if (!t) {
    e.pending = e.pending.slice(0, -u.length);
    const s = e.push("link_open", "a", 1);
    s.attrs = [["href", c]], s.markup = "linkify", s.info = "auto";
    const f = e.push("text", "", 0);
    f.content = e.md.normalizeLinkText(o);
    const m = e.push("link_close", "a", -1);
    m.markup = "linkify", m.info = "auto";
  }
  return e.pos += o.length - u.length, !0;
}
function H5(e, t) {
  let n = e.pos;
  if (e.src.charCodeAt(n) !== 10)
    return !1;
  const r = e.pending.length - 1, i = e.posMax;
  if (!t)
    if (r >= 0 && e.pending.charCodeAt(r) === 32)
      if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
        let u = r - 1;
        for (; u >= 1 && e.pending.charCodeAt(u - 1) === 32; ) u--;
        e.pending = e.pending.slice(0, u), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (n++; n < i && ye(e.src.charCodeAt(n)); )
    n++;
  return e.pos = n, !0;
}
const Id = [];
for (let e = 0; e < 256; e++)
  Id.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
  Id[e.charCodeAt(0)] = 1;
});
function X5(e, t) {
  let n = e.pos;
  const r = e.posMax;
  if (e.src.charCodeAt(n) !== 92 || (n++, n >= r)) return !1;
  let i = e.src.charCodeAt(n);
  if (i === 10) {
    for (t || e.push("hardbreak", "br", 0), n++; n < r && (i = e.src.charCodeAt(n), !!ye(i)); )
      n++;
    return e.pos = n, !0;
  }
  let u = e.src[n];
  if (i >= 55296 && i <= 56319 && n + 1 < r) {
    const o = e.src.charCodeAt(n + 1);
    o >= 56320 && o <= 57343 && (u += e.src[n + 1], n++);
  }
  const a = "\\" + u;
  if (!t) {
    const o = e.push("text_special", "", 0);
    i < 256 && Id[i] !== 0 ? o.content = u : o.content = a, o.markup = a, o.info = "escape";
  }
  return e.pos = n + 1, !0;
}
function Z5(e, t) {
  let n = e.pos;
  if (e.src.charCodeAt(n) !== 96)
    return !1;
  const i = n;
  n++;
  const u = e.posMax;
  for (; n < u && e.src.charCodeAt(n) === 96; )
    n++;
  const a = e.src.slice(i, n), o = a.length;
  if (e.backticksScanned && (e.backticks[o] || 0) <= i)
    return t || (e.pending += a), e.pos += o, !0;
  let c = n, s;
  for (; (s = e.src.indexOf("`", c)) !== -1; ) {
    for (c = s + 1; c < u && e.src.charCodeAt(c) === 96; )
      c++;
    const f = c - s;
    if (f === o) {
      if (!t) {
        const m = e.push("code_inline", "code", 0);
        m.markup = a, m.content = e.src.slice(n, s).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      return e.pos = c, !0;
    }
    e.backticks[f] = s;
  }
  return e.backticksScanned = !0, t || (e.pending += a), e.pos += o, !0;
}
function V5(e, t) {
  const n = e.pos, r = e.src.charCodeAt(n);
  if (t || r !== 126)
    return !1;
  const i = e.scanDelims(e.pos, !0);
  let u = i.length;
  const a = String.fromCharCode(r);
  if (u < 2)
    return !1;
  let o;
  u % 2 && (o = e.push("text", "", 0), o.content = a, u--);
  for (let c = 0; c < u; c += 2)
    o = e.push("text", "", 0), o.content = a + a, e.delimiters.push({
      marker: r,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: i.can_open,
      close: i.can_close
    });
  return e.pos += i.length, !0;
}
function wp(e, t) {
  let n;
  const r = [], i = t.length;
  for (let u = 0; u < i; u++) {
    const a = t[u];
    if (a.marker !== 126 || a.end === -1)
      continue;
    const o = t[a.end];
    n = e.tokens[a.token], n.type = "s_open", n.tag = "s", n.nesting = 1, n.markup = "~~", n.content = "", n = e.tokens[o.token], n.type = "s_close", n.tag = "s", n.nesting = -1, n.markup = "~~", n.content = "", e.tokens[o.token - 1].type === "text" && e.tokens[o.token - 1].content === "~" && r.push(o.token - 1);
  }
  for (; r.length; ) {
    const u = r.pop();
    let a = u + 1;
    for (; a < e.tokens.length && e.tokens[a].type === "s_close"; )
      a++;
    a--, u !== a && (n = e.tokens[a], e.tokens[a] = e.tokens[u], e.tokens[u] = n);
  }
}
function G5(e) {
  const t = e.tokens_meta, n = e.tokens_meta.length;
  wp(e, e.delimiters);
  for (let r = 0; r < n; r++)
    t[r] && t[r].delimiters && wp(e, t[r].delimiters);
}
const Sm = {
  tokenize: V5,
  postProcess: G5
};
function Y5(e, t) {
  const n = e.pos, r = e.src.charCodeAt(n);
  if (t || r !== 95 && r !== 42)
    return !1;
  const i = e.scanDelims(e.pos, r === 42);
  for (let u = 0; u < i.length; u++) {
    const a = e.push("text", "", 0);
    a.content = String.fromCharCode(r), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: r,
      // Total length of these series of delimiters.
      //
      length: i.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: i.can_open,
      close: i.can_close
    });
  }
  return e.pos += i.length, !0;
}
function Up(e, t) {
  const n = t.length;
  for (let r = n - 1; r >= 0; r--) {
    const i = t[r];
    if (i.marker !== 95 && i.marker !== 42 || i.end === -1)
      continue;
    const u = t[i.end], a = r > 0 && t[r - 1].end === i.end + 1 && // check that first two markers match and adjacent
    t[r - 1].marker === i.marker && t[r - 1].token === i.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    t[i.end + 1].token === u.token + 1, o = String.fromCharCode(i.marker), c = e.tokens[i.token];
    c.type = a ? "strong_open" : "em_open", c.tag = a ? "strong" : "em", c.nesting = 1, c.markup = a ? o + o : o, c.content = "";
    const s = e.tokens[u.token];
    s.type = a ? "strong_close" : "em_close", s.tag = a ? "strong" : "em", s.nesting = -1, s.markup = a ? o + o : o, s.content = "", a && (e.tokens[t[r - 1].token].content = "", e.tokens[t[i.end + 1].token].content = "", r--);
  }
}
function K5(e) {
  const t = e.tokens_meta, n = e.tokens_meta.length;
  Up(e, e.delimiters);
  for (let r = 0; r < n; r++)
    t[r] && t[r].delimiters && Up(e, t[r].delimiters);
}
const Bm = {
  tokenize: Y5,
  postProcess: K5
};
function Q5(e, t) {
  let n, r, i, u, a = "", o = "", c = e.pos, s = !0;
  if (e.src.charCodeAt(e.pos) !== 91)
    return !1;
  const f = e.pos, m = e.posMax, b = e.pos + 1, p = e.md.helpers.parseLinkLabel(e, e.pos, !0);
  if (p < 0)
    return !1;
  let l = p + 1;
  if (l < m && e.src.charCodeAt(l) === 40) {
    for (s = !1, l++; l < m && (n = e.src.charCodeAt(l), !(!ye(n) && n !== 10)); l++)
      ;
    if (l >= m)
      return !1;
    if (c = l, i = e.md.helpers.parseLinkDestination(e.src, l, e.posMax), i.ok) {
      for (a = e.md.normalizeLink(i.str), e.md.validateLink(a) ? l = i.pos : a = "", c = l; l < m && (n = e.src.charCodeAt(l), !(!ye(n) && n !== 10)); l++)
        ;
      if (i = e.md.helpers.parseLinkTitle(e.src, l, e.posMax), l < m && c !== l && i.ok)
        for (o = i.str, l = i.pos; l < m && (n = e.src.charCodeAt(l), !(!ye(n) && n !== 10)); l++)
          ;
    }
    (l >= m || e.src.charCodeAt(l) !== 41) && (s = !0), l++;
  }
  if (s) {
    if (typeof e.env.references > "u")
      return !1;
    if (l < m && e.src.charCodeAt(l) === 91 ? (c = l + 1, l = e.md.helpers.parseLinkLabel(e, l), l >= 0 ? r = e.src.slice(c, l++) : l = p + 1) : l = p + 1, r || (r = e.src.slice(b, p)), u = e.env.references[mo(r)], !u)
      return e.pos = f, !1;
    a = u.href, o = u.title;
  }
  if (!t) {
    e.pos = b, e.posMax = p;
    const g = e.push("link_open", "a", 1), D = [["href", a]];
    g.attrs = D, o && D.push(["title", o]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
  }
  return e.pos = l, e.posMax = m, !0;
}
function J5(e, t) {
  let n, r, i, u, a, o, c, s, f = "";
  const m = e.pos, b = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91)
    return !1;
  const p = e.pos + 2, l = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
  if (l < 0)
    return !1;
  if (u = l + 1, u < b && e.src.charCodeAt(u) === 40) {
    for (u++; u < b && (n = e.src.charCodeAt(u), !(!ye(n) && n !== 10)); u++)
      ;
    if (u >= b)
      return !1;
    for (s = u, o = e.md.helpers.parseLinkDestination(e.src, u, e.posMax), o.ok && (f = e.md.normalizeLink(o.str), e.md.validateLink(f) ? u = o.pos : f = ""), s = u; u < b && (n = e.src.charCodeAt(u), !(!ye(n) && n !== 10)); u++)
      ;
    if (o = e.md.helpers.parseLinkTitle(e.src, u, e.posMax), u < b && s !== u && o.ok)
      for (c = o.str, u = o.pos; u < b && (n = e.src.charCodeAt(u), !(!ye(n) && n !== 10)); u++)
        ;
    else
      c = "";
    if (u >= b || e.src.charCodeAt(u) !== 41)
      return e.pos = m, !1;
    u++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (u < b && e.src.charCodeAt(u) === 91 ? (s = u + 1, u = e.md.helpers.parseLinkLabel(e, u), u >= 0 ? i = e.src.slice(s, u++) : u = l + 1) : u = l + 1, i || (i = e.src.slice(p, l)), a = e.env.references[mo(i)], !a)
      return e.pos = m, !1;
    f = a.href, c = a.title;
  }
  if (!t) {
    r = e.src.slice(p, l);
    const g = [];
    e.md.inline.parse(
      r,
      e.md,
      e.env,
      g
    );
    const D = e.push("image", "img", 0), h = [["src", f], ["alt", ""]];
    D.attrs = h, D.children = g, D.content = r, c && h.push(["title", c]);
  }
  return e.pos = u, e.posMax = b, !0;
}
const ew = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, tw = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function nw(e, t) {
  let n = e.pos;
  if (e.src.charCodeAt(n) !== 60)
    return !1;
  const r = e.pos, i = e.posMax;
  for (; ; ) {
    if (++n >= i) return !1;
    const a = e.src.charCodeAt(n);
    if (a === 60) return !1;
    if (a === 62) break;
  }
  const u = e.src.slice(r + 1, n);
  if (tw.test(u)) {
    const a = e.md.normalizeLink(u);
    if (!e.md.validateLink(a))
      return !1;
    if (!t) {
      const o = e.push("link_open", "a", 1);
      o.attrs = [["href", a]], o.markup = "autolink", o.info = "auto";
      const c = e.push("text", "", 0);
      c.content = e.md.normalizeLinkText(u);
      const s = e.push("link_close", "a", -1);
      s.markup = "autolink", s.info = "auto";
    }
    return e.pos += u.length + 2, !0;
  }
  if (ew.test(u)) {
    const a = e.md.normalizeLink("mailto:" + u);
    if (!e.md.validateLink(a))
      return !1;
    if (!t) {
      const o = e.push("link_open", "a", 1);
      o.attrs = [["href", a]], o.markup = "autolink", o.info = "auto";
      const c = e.push("text", "", 0);
      c.content = e.md.normalizeLinkText(u);
      const s = e.push("link_close", "a", -1);
      s.markup = "autolink", s.info = "auto";
    }
    return e.pos += u.length + 2, !0;
  }
  return !1;
}
function rw(e) {
  return /^<a[>\s]/i.test(e);
}
function iw(e) {
  return /^<\/a\s*>/i.test(e);
}
function uw(e) {
  const t = e | 32;
  return t >= 97 && t <= 122;
}
function aw(e, t) {
  if (!e.md.options.html)
    return !1;
  const n = e.posMax, r = e.pos;
  if (e.src.charCodeAt(r) !== 60 || r + 2 >= n)
    return !1;
  const i = e.src.charCodeAt(r + 1);
  if (i !== 33 && i !== 63 && i !== 47 && !uw(i))
    return !1;
  const u = e.src.slice(r).match(R5);
  if (!u)
    return !1;
  if (!t) {
    const a = e.push("html_inline", "", 0);
    a.content = u[0], rw(a.content) && e.linkLevel++, iw(a.content) && e.linkLevel--;
  }
  return e.pos += u[0].length, !0;
}
const ow = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, cw = /^&([a-z][a-z0-9]{1,31});/i;
function sw(e, t) {
  const n = e.pos, r = e.posMax;
  if (e.src.charCodeAt(n) !== 38 || n + 1 >= r) return !1;
  if (e.src.charCodeAt(n + 1) === 35) {
    const u = e.src.slice(n).match(ow);
    if (u) {
      if (!t) {
        const a = u[1][0].toLowerCase() === "x" ? parseInt(u[1].slice(1), 16) : parseInt(u[1], 10), o = e.push("text_special", "", 0);
        o.content = Sd(a) ? ca(a) : ca(65533), o.markup = u[0], o.info = "entity";
      }
      return e.pos += u[0].length, !0;
    }
  } else {
    const u = e.src.slice(n).match(cw);
    if (u) {
      const a = wm(u[0]);
      if (a !== u[0]) {
        if (!t) {
          const o = e.push("text_special", "", 0);
          o.content = a, o.markup = u[0], o.info = "entity";
        }
        return e.pos += u[0].length, !0;
      }
    }
  }
  return !1;
}
function Tp(e) {
  const t = {}, n = e.length;
  if (!n) return;
  let r = 0, i = -2;
  const u = [];
  for (let a = 0; a < n; a++) {
    const o = e[a];
    if (u.push(0), (e[r].marker !== o.marker || i !== o.token - 1) && (r = a), i = o.token, o.length = o.length || 0, !o.close) continue;
    t.hasOwnProperty(o.marker) || (t[o.marker] = [-1, -1, -1, -1, -1, -1]);
    const c = t[o.marker][(o.open ? 3 : 0) + o.length % 3];
    let s = r - u[r] - 1, f = s;
    for (; s > c; s -= u[s] + 1) {
      const m = e[s];
      if (m.marker === o.marker && m.open && m.end < 0) {
        let b = !1;
        if ((m.close || o.open) && (m.length + o.length) % 3 === 0 && (m.length % 3 !== 0 || o.length % 3 !== 0) && (b = !0), !b) {
          const p = s > 0 && !e[s - 1].open ? u[s - 1] + 1 : 0;
          u[a] = a - s + p, u[s] = p, o.open = !1, m.end = a, m.close = !1, f = -1, i = -2;
          break;
        }
      }
    }
    f !== -1 && (t[o.marker][(o.open ? 3 : 0) + (o.length || 0) % 3] = f);
  }
}
function fw(e) {
  const t = e.tokens_meta, n = e.tokens_meta.length;
  Tp(e.delimiters);
  for (let r = 0; r < n; r++)
    t[r] && t[r].delimiters && Tp(t[r].delimiters);
}
function dw(e) {
  let t, n, r = 0;
  const i = e.tokens, u = e.tokens.length;
  for (t = n = 0; t < u; t++)
    i[t].nesting < 0 && r--, i[t].level = r, i[t].nesting > 0 && r++, i[t].type === "text" && t + 1 < u && i[t + 1].type === "text" ? i[t + 1].content = i[t].content + i[t + 1].content : (t !== n && (i[n] = i[t]), n++);
  t !== n && (i.length = n);
}
const gs = [
  ["text", z5],
  ["linkify", j5],
  ["newline", H5],
  ["escape", X5],
  ["backticks", Z5],
  ["strikethrough", Sm.tokenize],
  ["emphasis", Bm.tokenize],
  ["link", Q5],
  ["image", J5],
  ["autolink", nw],
  ["html_inline", aw],
  ["entity", sw]
], bs = [
  ["balance_pairs", fw],
  ["strikethrough", Sm.postProcess],
  ["emphasis", Bm.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", dw]
];
function fu() {
  this.ruler = new dt();
  for (let e = 0; e < gs.length; e++)
    this.ruler.push(gs[e][0], gs[e][1]);
  this.ruler2 = new dt();
  for (let e = 0; e < bs.length; e++)
    this.ruler2.push(bs[e][0], bs[e][1]);
}
fu.prototype.skipToken = function(e) {
  const t = e.pos, n = this.ruler.getRules(""), r = n.length, i = e.md.options.maxNesting, u = e.cache;
  if (typeof u[t] < "u") {
    e.pos = u[t];
    return;
  }
  let a = !1;
  if (e.level < i) {
    for (let o = 0; o < r; o++)
      if (e.level++, a = n[o](e, !0), e.level--, a) {
        if (t >= e.pos)
          throw new Error("inline rule didn't increment state.pos");
        break;
      }
  } else
    e.pos = e.posMax;
  a || e.pos++, u[t] = e.pos;
};
fu.prototype.tokenize = function(e) {
  const t = this.ruler.getRules(""), n = t.length, r = e.posMax, i = e.md.options.maxNesting;
  for (; e.pos < r; ) {
    const u = e.pos;
    let a = !1;
    if (e.level < i) {
      for (let o = 0; o < n; o++)
        if (a = t[o](e, !1), a) {
          if (u >= e.pos)
            throw new Error("inline rule didn't increment state.pos");
          break;
        }
    }
    if (a) {
      if (e.pos >= r)
        break;
      continue;
    }
    e.pending += e.src[e.pos++];
  }
  e.pending && e.pushPending();
};
fu.prototype.parse = function(e, t, n, r) {
  const i = new this.State(e, t, n, r);
  this.tokenize(i);
  const u = this.ruler2.getRules(""), a = u.length;
  for (let o = 0; o < a; o++)
    u[o](i);
};
fu.prototype.State = su;
function lw(e) {
  const t = {};
  e = e || {}, t.src_Any = Dm.source, t.src_Cc = xm.source, t.src_Z = _m.source, t.src_P = Fd.source, t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
  const n = "[><｜]";
  return t.src_pseudo_letter = "(?:(?!" + n + "|" + t.src_ZPCc + ")" + t.src_Any + ")", t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?", t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = "(?=$|" + n + "|" + t.src_ZPCc + ")(?!" + (e["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + t.src_ZPCc + "))", t.src_path = "(?:[/?#](?:(?!" + t.src_ZCc + "|" + n + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + t.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + t.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + t.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + t.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + t.src_ZCc + "|[']).)+\\'|\\'(?=" + t.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + t.src_ZCc + "|[.]|$)|" + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
  ",(?!" + t.src_ZCc + "|$)|;(?!" + t.src_ZCc + "|$)|\\!+(?!" + t.src_ZCc + "|[!]|$)|\\?(?!" + t.src_ZCc + "|[?]|$))+|\\/)?", t.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = // Allow letters & digits (http://test1)
  "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})", t.src_domain = "(?:" + t.src_xn + "|(?:" + t.src_pseudo_letter + ")|(?:" + t.src_pseudo_letter + "(?:-|" + t.src_pseudo_letter + "){0,61}" + t.src_pseudo_letter + "))", t.src_host = "(?:(?:(?:(?:" + t.src_domain + ")\\.)*" + t.src_domain + "))", t.tpl_host_fuzzy = "(?:" + t.src_ip4 + "|(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%)))", t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))", t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + t.src_ZPCc + "|>|$))", t.tpl_email_fuzzy = "(^|" + n + '|"|\\(|' + t.src_ZCc + ")(" + t.src_email_name + "@" + t.tpl_host_fuzzy_strict + ")", t.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_fuzzy_strict + t.src_path + ")", t.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_no_ip_fuzzy_strict + t.src_path + ")", t;
}
function Ls(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(n) {
    n && Object.keys(n).forEach(function(r) {
      e[r] = n[r];
    });
  }), e;
}
function Do(e) {
  return Object.prototype.toString.call(e);
}
function hw(e) {
  return Do(e) === "[object String]";
}
function pw(e) {
  return Do(e) === "[object Object]";
}
function gw(e) {
  return Do(e) === "[object RegExp]";
}
function Cp(e) {
  return Do(e) === "[object Function]";
}
function bw(e) {
  return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
const Im = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function mw(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t || Im.hasOwnProperty(n);
  }, !1);
}
const yw = {
  "http:": {
    validate: function(e, t, n) {
      const r = e.slice(t);
      return n.re.http || (n.re.http = new RegExp(
        "^\\/\\/" + n.re.src_auth + n.re.src_host_port_strict + n.re.src_path,
        "i"
      )), n.re.http.test(r) ? r.match(n.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(e, t, n) {
      const r = e.slice(t);
      return n.re.no_http || (n.re.no_http = new RegExp(
        "^" + n.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + n.re.src_domain + ")\\.)+" + n.re.src_domain_root + ")" + n.re.src_port + n.re.src_host_terminator + n.re.src_path,
        "i"
      )), n.re.no_http.test(r) ? t >= 3 && e[t - 3] === ":" || t >= 3 && e[t - 3] === "/" ? 0 : r.match(n.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(e, t, n) {
      const r = e.slice(t);
      return n.re.mailto || (n.re.mailto = new RegExp(
        "^" + n.re.src_email_name + "@" + n.re.src_host_strict,
        "i"
      )), n.re.mailto.test(r) ? r.match(n.re.mailto)[0].length : 0;
    }
  }
}, Dw = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", xw = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function vw(e) {
  e.__index__ = -1, e.__text_cache__ = "";
}
function _w(e) {
  return function(t, n) {
    const r = t.slice(n);
    return e.test(r) ? r.match(e)[0].length : 0;
  };
}
function Ap() {
  return function(e, t) {
    t.normalize(e);
  };
}
function sa(e) {
  const t = e.re = lw(e.__opts__), n = e.__tlds__.slice();
  e.onCompile(), e.__tlds_replaced__ || n.push(Dw), n.push(t.src_xn), t.src_tlds = n.join("|");
  function r(o) {
    return o.replace("%TLDS%", t.src_tlds);
  }
  t.email_fuzzy = RegExp(r(t.tpl_email_fuzzy), "i"), t.link_fuzzy = RegExp(r(t.tpl_link_fuzzy), "i"), t.link_no_ip_fuzzy = RegExp(r(t.tpl_link_no_ip_fuzzy), "i"), t.host_fuzzy_test = RegExp(r(t.tpl_host_fuzzy_test), "i");
  const i = [];
  e.__compiled__ = {};
  function u(o, c) {
    throw new Error('(LinkifyIt) Invalid schema "' + o + '": ' + c);
  }
  Object.keys(e.__schemas__).forEach(function(o) {
    const c = e.__schemas__[o];
    if (c === null)
      return;
    const s = { validate: null, link: null };
    if (e.__compiled__[o] = s, pw(c)) {
      gw(c.validate) ? s.validate = _w(c.validate) : Cp(c.validate) ? s.validate = c.validate : u(o, c), Cp(c.normalize) ? s.normalize = c.normalize : c.normalize ? u(o, c) : s.normalize = Ap();
      return;
    }
    if (hw(c)) {
      i.push(o);
      return;
    }
    u(o, c);
  }), i.forEach(function(o) {
    e.__compiled__[e.__schemas__[o]] && (e.__compiled__[o].validate = e.__compiled__[e.__schemas__[o]].validate, e.__compiled__[o].normalize = e.__compiled__[e.__schemas__[o]].normalize);
  }), e.__compiled__[""] = { validate: null, normalize: Ap() };
  const a = Object.keys(e.__compiled__).filter(function(o) {
    return o.length > 0 && e.__compiled__[o];
  }).map(bw).join("|");
  e.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + t.src_ZPCc + "))(" + a + ")", "i"), e.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + t.src_ZPCc + "))(" + a + ")", "ig"), e.re.schema_at_start = RegExp("^" + e.re.schema_search.source, "i"), e.re.pretest = RegExp(
    "(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@",
    "i"
  ), vw(e);
}
function Ew(e, t) {
  const n = e.__index__, r = e.__last_index__, i = e.__text_cache__.slice(n, r);
  this.schema = e.__schema__.toLowerCase(), this.index = n + t, this.lastIndex = r + t, this.raw = i, this.text = i, this.url = i;
}
function Ws(e, t) {
  const n = new Ew(e, t);
  return e.__compiled__[n.schema].normalize(n, e), n;
}
function mt(e, t) {
  if (!(this instanceof mt))
    return new mt(e, t);
  t || mw(e) && (t = e, e = {}), this.__opts__ = Ls({}, Im, t), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = Ls({}, yw, e), this.__compiled__ = {}, this.__tlds__ = xw, this.__tlds_replaced__ = !1, this.re = {}, sa(this);
}
mt.prototype.add = function(t, n) {
  return this.__schemas__[t] = n, sa(this), this;
};
mt.prototype.set = function(t) {
  return this.__opts__ = Ls(this.__opts__, t), this;
};
mt.prototype.test = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length)
    return !1;
  let n, r, i, u, a, o, c, s, f;
  if (this.re.schema_test.test(t)) {
    for (c = this.re.schema_search, c.lastIndex = 0; (n = c.exec(t)) !== null; )
      if (u = this.testSchemaAt(t, n[2], c.lastIndex), u) {
        this.__schema__ = n[2], this.__index__ = n.index + n[1].length, this.__last_index__ = n.index + n[0].length + u;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (s = t.search(this.re.host_fuzzy_test), s >= 0 && (this.__index__ < 0 || s < this.__index__) && (r = t.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (a = r.index + r[1].length, (this.__index__ < 0 || a < this.__index__) && (this.__schema__ = "", this.__index__ = a, this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (f = t.indexOf("@"), f >= 0 && (i = t.match(this.re.email_fuzzy)) !== null && (a = i.index + i[1].length, o = i.index + i[0].length, (this.__index__ < 0 || a < this.__index__ || a === this.__index__ && o > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = a, this.__last_index__ = o))), this.__index__ >= 0;
};
mt.prototype.pretest = function(t) {
  return this.re.pretest.test(t);
};
mt.prototype.testSchemaAt = function(t, n, r) {
  return this.__compiled__[n.toLowerCase()] ? this.__compiled__[n.toLowerCase()].validate(t, r, this) : 0;
};
mt.prototype.match = function(t) {
  const n = [];
  let r = 0;
  this.__index__ >= 0 && this.__text_cache__ === t && (n.push(Ws(this, r)), r = this.__last_index__);
  let i = r ? t.slice(r) : t;
  for (; this.test(i); )
    n.push(Ws(this, r)), i = i.slice(this.__last_index__), r += this.__last_index__;
  return n.length ? n : null;
};
mt.prototype.matchAtStart = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length) return null;
  const n = this.re.schema_at_start.exec(t);
  if (!n) return null;
  const r = this.testSchemaAt(t, n[2], n[0].length);
  return r ? (this.__schema__ = n[2], this.__index__ = n.index + n[1].length, this.__last_index__ = n.index + n[0].length + r, Ws(this, 0)) : null;
};
mt.prototype.tlds = function(t, n) {
  return t = Array.isArray(t) ? t : [t], n ? (this.__tlds__ = this.__tlds__.concat(t).sort().filter(function(r, i, u) {
    return r !== u[i - 1];
  }).reverse(), sa(this), this) : (this.__tlds__ = t.slice(), this.__tlds_replaced__ = !0, sa(this), this);
};
mt.prototype.normalize = function(t) {
  t.schema || (t.url = "http://" + t.url), t.schema === "mailto:" && !/^mailto:/i.test(t.url) && (t.url = "mailto:" + t.url);
};
mt.prototype.onCompile = function() {
};
const Br = 2147483647, Gt = 36, Nd = 1, qi = 26, ww = 38, Uw = 700, Nm = 72, Rm = 128, Om = "-", Tw = /^xn--/, Cw = /[^\0-\x7F]/, Aw = /[\x2E\u3002\uFF0E\uFF61]/g, Fw = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, ms = Gt - Nd, Yt = Math.floor, ys = String.fromCharCode;
function Fn(e) {
  throw new RangeError(Fw[e]);
}
function kw(e, t) {
  const n = [];
  let r = e.length;
  for (; r--; )
    n[r] = t(e[r]);
  return n;
}
function Lm(e, t) {
  const n = e.split("@");
  let r = "";
  n.length > 1 && (r = n[0] + "@", e = n[1]), e = e.replace(Aw, ".");
  const i = e.split("."), u = kw(i, t).join(".");
  return r + u;
}
function Wm(e) {
  const t = [];
  let n = 0;
  const r = e.length;
  for (; n < r; ) {
    const i = e.charCodeAt(n++);
    if (i >= 55296 && i <= 56319 && n < r) {
      const u = e.charCodeAt(n++);
      (u & 64512) == 56320 ? t.push(((i & 1023) << 10) + (u & 1023) + 65536) : (t.push(i), n--);
    } else
      t.push(i);
  }
  return t;
}
const Sw = (e) => String.fromCodePoint(...e), Bw = function(e) {
  return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : Gt;
}, Fp = function(e, t) {
  return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, Mm = function(e, t, n) {
  let r = 0;
  for (e = n ? Yt(e / Uw) : e >> 1, e += Yt(e / t); e > ms * qi >> 1; r += Gt)
    e = Yt(e / ms);
  return Yt(r + (ms + 1) * e / (e + ww));
}, Pm = function(e) {
  const t = [], n = e.length;
  let r = 0, i = Rm, u = Nm, a = e.lastIndexOf(Om);
  a < 0 && (a = 0);
  for (let o = 0; o < a; ++o)
    e.charCodeAt(o) >= 128 && Fn("not-basic"), t.push(e.charCodeAt(o));
  for (let o = a > 0 ? a + 1 : 0; o < n; ) {
    const c = r;
    for (let f = 1, m = Gt; ; m += Gt) {
      o >= n && Fn("invalid-input");
      const b = Bw(e.charCodeAt(o++));
      b >= Gt && Fn("invalid-input"), b > Yt((Br - r) / f) && Fn("overflow"), r += b * f;
      const p = m <= u ? Nd : m >= u + qi ? qi : m - u;
      if (b < p)
        break;
      const l = Gt - p;
      f > Yt(Br / l) && Fn("overflow"), f *= l;
    }
    const s = t.length + 1;
    u = Mm(r - c, s, c == 0), Yt(r / s) > Br - i && Fn("overflow"), i += Yt(r / s), r %= s, t.splice(r++, 0, i);
  }
  return String.fromCodePoint(...t);
}, qm = function(e) {
  const t = [];
  e = Wm(e);
  const n = e.length;
  let r = Rm, i = 0, u = Nm;
  for (const c of e)
    c < 128 && t.push(ys(c));
  const a = t.length;
  let o = a;
  for (a && t.push(Om); o < n; ) {
    let c = Br;
    for (const f of e)
      f >= r && f < c && (c = f);
    const s = o + 1;
    c - r > Yt((Br - i) / s) && Fn("overflow"), i += (c - r) * s, r = c;
    for (const f of e)
      if (f < r && ++i > Br && Fn("overflow"), f === r) {
        let m = i;
        for (let b = Gt; ; b += Gt) {
          const p = b <= u ? Nd : b >= u + qi ? qi : b - u;
          if (m < p)
            break;
          const l = m - p, g = Gt - p;
          t.push(
            ys(Fp(p + l % g, 0))
          ), m = Yt(l / g);
        }
        t.push(ys(Fp(m, 0))), u = Mm(i, s, o === a), i = 0, ++o;
      }
    ++i, ++r;
  }
  return t.join("");
}, Iw = function(e) {
  return Lm(e, function(t) {
    return Tw.test(t) ? Pm(t.slice(4).toLowerCase()) : t;
  });
}, Nw = function(e) {
  return Lm(e, function(t) {
    return Cw.test(t) ? "xn--" + qm(t) : t;
  });
}, zm = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: Wm,
    encode: Sw
  },
  decode: Pm,
  encode: qm,
  toASCII: Nw,
  toUnicode: Iw
}, Rw = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, Ow = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
}, Lw = {
  options: {
    // Enable HTML tags in source
    html: !0,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !0,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
}, Ww = {
  default: Rw,
  zero: Ow,
  commonmark: Lw
}, Mw = /^(vbscript|javascript|file|data):/, Pw = /^data:image\/(gif|png|jpeg|webp);/;
function qw(e) {
  const t = e.trim().toLowerCase();
  return Mw.test(t) ? Pw.test(t) : !0;
}
const $m = ["http:", "https:", "mailto:"];
function zw(e) {
  const t = Ad(e, !0);
  if (t.hostname && (!t.protocol || $m.indexOf(t.protocol) >= 0))
    try {
      t.hostname = zm.toASCII(t.hostname);
    } catch {
    }
  return cu(Cd(t));
}
function $w(e) {
  const t = Ad(e, !0);
  if (t.hostname && (!t.protocol || $m.indexOf(t.protocol) >= 0))
    try {
      t.hostname = zm.toUnicode(t.hostname);
    } catch {
    }
  return qr(Cd(t), qr.defaultChars + "%");
}
function yt(e, t) {
  if (!(this instanceof yt))
    return new yt(e, t);
  t || kd(e) || (t = e || {}, e = "default"), this.inline = new fu(), this.block = new yo(), this.core = new Bd(), this.renderer = new ii(), this.linkify = new mt(), this.validateLink = qw, this.normalizeLink = zw, this.normalizeLinkText = $w, this.utils = HE, this.helpers = bo({}, GE), this.options = {}, this.configure(e), t && this.set(t);
}
yt.prototype.set = function(e) {
  return bo(this.options, e), this;
};
yt.prototype.configure = function(e) {
  const t = this;
  if (kd(e)) {
    const n = e;
    if (e = Ww[n], !e)
      throw new Error('Wrong `markdown-it` preset "' + n + '", check name');
  }
  if (!e)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return e.options && t.set(e.options), e.components && Object.keys(e.components).forEach(function(n) {
    e.components[n].rules && t[n].ruler.enableOnly(e.components[n].rules), e.components[n].rules2 && t[n].ruler2.enableOnly(e.components[n].rules2);
  }), this;
};
yt.prototype.enable = function(e, t) {
  let n = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(i) {
    n = n.concat(this[i].ruler.enable(e, !0));
  }, this), n = n.concat(this.inline.ruler2.enable(e, !0));
  const r = e.filter(function(i) {
    return n.indexOf(i) < 0;
  });
  if (r.length && !t)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
  return this;
};
yt.prototype.disable = function(e, t) {
  let n = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(i) {
    n = n.concat(this[i].ruler.disable(e, !0));
  }, this), n = n.concat(this.inline.ruler2.disable(e, !0));
  const r = e.filter(function(i) {
    return n.indexOf(i) < 0;
  });
  if (r.length && !t)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
  return this;
};
yt.prototype.use = function(e) {
  const t = [this].concat(Array.prototype.slice.call(arguments, 1));
  return e.apply(e, t), this;
};
yt.prototype.parse = function(e, t) {
  if (typeof e != "string")
    throw new Error("Input data should be a String");
  const n = new this.core.State(e, this, t);
  return this.core.process(n), n.tokens;
};
yt.prototype.render = function(e, t) {
  return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t);
};
yt.prototype.parseInline = function(e, t) {
  const n = new this.core.State(e, this, t);
  return n.inlineMode = !0, this.core.process(n), n.tokens;
};
yt.prototype.renderInline = function(e, t) {
  return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t);
};
const xo = Qe.dirname(Jm(import.meta.url));
process.env.APP_ROOT = Qe.join(xo, "..");
const Ms = process.env.VITE_DEV_SERVER_URL, o9 = Qe.join(process.env.APP_ROOT, "dist-electron"), jm = Qe.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ms ? Qe.join(process.env.APP_ROOT, "public") : jm;
let ue, Ee;
const zi = "https://kolnovel.com/post/", kp = "https://kolnovel.com/account/";
function Ps() {
  ue = new ji({
    icon: Qe.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: Qe.join(xo, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !0
      // Consider security implications
    }
  }), ue.webContents.on("did-finish-load", () => {
    ue == null || ue.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Ms ? ue.loadURL(Ms) : ue.loadFile(Qe.join(jm, "index.html"));
}
function Sp() {
  Ee = new ji({
    width: 800,
    // Adjust as needed
    height: 600,
    // Adjust as needed
    show: !1,
    webPreferences: {
      preload: Qe.join(xo, "hiddenPreload.mjs"),
      javascript: !0,
      contextIsolation: !0
    }
  }), console.log(`[Main] Loading initial hidden URL: ${zi}`), Ee.loadURL(zi), Ee.on("closed", () => {
    Ee = null;
  }), Ee.webContents.on("did-fail-load", (e, t, n, r) => {
    console.error(`[Hidden Window] Failed to load ${r}: ${n} (Code: ${t})`);
  });
}
Ht.on("window-all-closed", () => {
  process.platform !== "darwin" && (Ht.quit(), ue = null, Ee = null);
});
Ht.on("activate", () => {
  ji.getAllWindows().length === 0 && Ps();
});
Ht.whenReady().then(() => {
  Ps(), Sp(), Ht.on("activate", () => {
    ji.getAllWindows().length === 0 && (Ps(), Ee || Sp());
  });
});
Dt.on("form-missing", (e, t) => {
  if (console.log(`[Main] Received notification: Element '${t}' is missing in hidden window.`), !Ee || Ee.isDestroyed()) {
    console.warn("[Main] Hidden window does not exist. Cannot change URL or visibility.");
    return;
  }
  console.log(`[Main] Loading URL in hidden window: ${kp}`), Ee.loadURL(kp), ue && ue.webContents && !ue.isDestroyed() ? (console.log("[Main] Hiding main window and showing hidden window."), ue.hide(), Ee.show()) : console.warn("[Main] Main window does not exist or is not ready. Cannot change visibility.");
});
Dt.on("login-success", () => {
  if (console.log("[Main] Received notification: Login successful."), !Ee || Ee.isDestroyed()) {
    console.warn("[Main] Hidden window does not exist. Cannot change URL or visibility.");
    return;
  }
  console.log(`[Main] Loading URL in hidden window: ${zi}`), Ee.loadURL(zi), ue && ue.webContents && !ue.isDestroyed() ? (console.log("[Main] Hiding hidden window and showing main window."), Ee.hide(), ue.show(), ue.webContents.send("loged-in")) : console.warn("[Main] Main window does not exist or is not ready. Cannot change visibility.");
});
Dt.on("loged-in", () => {
  ue && ue.webContents && !ue.isDestroyed() ? ue.webContents.send("loged-in") : console.warn("[Main] Main window does not exist or is not ready. Cannot change visibility.");
});
Dt.on("novels-data-hidden", (e, t) => {
  ue && ue.webContents && !ue.isDestroyed() ? ue.webContents.send("novels-data", t) : console.warn("[Main] Main window does not exist or is not ready. Cannot change visibility.");
});
Dt.on("novel-selected", (e, t) => {
  Ee && Ee.webContents && !Ee.isDestroyed() ? Ee.webContents.send("novel-selected", t) : console.warn("[Main] Main window does not exist or is not ready. Cannot change visibility.");
});
Dt.on("novels-volumes-hidden", (e, t) => {
  ue && ue.webContents && !ue.isDestroyed() ? ue.webContents.send("novels-volumes", t) : console.warn("[Main] Main window does not exist or is not ready. Cannot change visibility.");
});
Dt.handle("open-file-dialog", async () => {
  const e = await Vm.showOpenDialog({
    title: "Select File",
    properties: ["openFile"],
    filters: [
      { name: "Supported Files", extensions: ["md", "docx", "doc", "zip"] },
      { name: "Markdown", extensions: ["md"] },
      { name: "Word Documents", extensions: ["docx", "doc"] },
      { name: "Zip Archives (containing md, doc, docx)", extensions: ["zip"] }
    ]
  });
  return !e.canceled && e.filePaths.length > 0 ? e.filePaths[0] : null;
});
Dt.handle("read-and-convert-file", async (e, t) => {
  try {
    const n = Qe.extname(t).toLowerCase();
    if (n === ".zip")
      try {
        const r = new ky(t), i = r.getEntries(), u = [];
        for (const a of i)
          if (!a.isDirectory) {
            const o = Qe.extname(a.entryName).toLowerCase();
            if ([".md", ".docx", ".doc"].includes(o)) {
              let c = null;
              try {
                c = r.readAsText(a.entryName);
              } catch {
                c = r.readFile(a.entryName);
              }
              let s = "";
              switch (o) {
                case ".md": {
                  typeof c == "string" && (s = new yt().render(c), u.push({ name: a.name, type: "markdown", content: s }));
                  break;
                }
                case ".docx": {
                  c instanceof Buffer ? (s = (await Ft.convertToHtml({ buffer: c })).value, u.push({ name: a.name, type: "docx", content: s })) : console.error(`Error reading ${a.entryName} from zip as Buffer.`);
                  break;
                }
                case ".doc": {
                  if (c instanceof Buffer)
                    try {
                      const f = Qe.join(Ht.getPath("temp"), `temp_${Date.now()}_${a.name}`);
                      await xn.writeFile(f, c, {});
                      const m = Qe.join(Ht.getPath("temp"), `temp_${Date.now()}.html`);
                      await new Promise((b, p) => {
                        Rd(`libreoffice --headless --convert-to html "${f}" --outdir "${Ht.getPath("temp")}"`, (l) => {
                          if (l) {
                            console.error(`Error converting .doc in zip: ${l}`), p(l);
                            return;
                          }
                          b();
                        });
                      }), s = await xn.readFile(m, { encoding: "utf-8" }), await xn.unlink(f), await xn.unlink(m), u.push({ name: a.name, type: "doc", content: s });
                    } catch (f) {
                      console.error("Error converting .doc in zip:", f);
                    }
                  else
                    console.error(`Error reading ${a.entryName} from zip as Buffer.`);
                  break;
                }
              }
            }
          }
        return u;
      } catch (r) {
        return console.error("Error reading zip file:", r), "<p>Error reading the zip file.</p>";
      }
    else {
      const r = await xn.readFile(t, "utf-8"), i = Qe.basename(t), u = n.substring(1);
      switch (n) {
        case ".md":
          return {
            content: new yt().render(r),
            type: u,
            name: i
          };
        case ".docx":
          return {
            content: (await Ft.convertToHtml({ buffer: await xn.readFile(t) })).value,
            type: u,
            name: i
          };
        case ".doc":
          try {
            const a = Qe.join(Ht.getPath("temp"), `temp_${Date.now()}.html`);
            await new Promise((c, s) => {
              Rd(`libreoffice --headless --convert-to html "${t}" --outdir "${Ht.getPath("temp")}"`, (f) => {
                if (f) {
                  console.error(`Error converting .doc: ${f}`), s(f);
                  return;
                }
                c();
              });
            });
            const o = await xn.readFile(a, "utf-8");
            return await xn.unlink(a), {
              content: o,
              type: u,
              name: i
            };
          } catch (a) {
            return console.error("Error converting .doc:", a), "<p>Error reading or converting .doc file.</p>";
          }
        default:
          return "<p>Unsupported file format.</p>";
      }
    }
  } catch (n) {
    return console.error("Error reading file:", n), "<p>Error reading the file.</p>";
  }
});
Dt.on("console-log", (e, t) => {
  console.log(t);
});
Dt.on("process-data", async (e, t) => {
  if (console.log("Main process received data from Tab 1:", t), Ee && ue && !Ee.isDestroyed() && !ue.isDestroyed())
    Ee == null || Ee.webContents.send("process-data-request", t);
  else
    return { status: "error", error: "Tab 2 window not available." };
});
Dt.on("data-processed-response", (e, t) => {
  console.log("Main process received response from Tab 2:", t), ue && ue.webContents && !ue.isDestroyed() && (console.log("Sending response to Tab 1:", t), ue.webContents.send("data-processed-response", t));
});
Dt.on("process-data-array", async (e, t) => {
  console.log("Received data array in main process:", t), await Hw(t);
});
async function jw(e) {
  return new Promise((t, n) => {
    const r = new ji({
      width: 800,
      height: 600,
      show: !1,
      // Make it hidden
      webPreferences: {
        preload: Qe.join(xo, "postPreload.mjs"),
        nodeIntegration: !0,
        contextIsolation: !1
        // Consider security implications for hidden tabs too
      }
    });
    r.loadURL(zi), r.webContents.on("did-finish-load", () => {
      r.webContents.send("process-item", e), ue == null || ue.webContents.send("tab-prossesing", { id: e.id }), Dt.once(`response-from-tab-${e.id}`, (i, u) => {
        console.log(`Received response from tab ${e.id}:`, u), r.close(), t({ id: e.id, result: u });
      });
    }), r.webContents.on("did-fail-load", (i, u, a, o) => {
      console.error(`Failed to load ${o}: ${a} (Error Code: ${u})`), r.close(), n(new Error(`Failed to load ${o}: ${a}`));
    });
  });
}
async function Hw(e) {
  for (const t of e)
    try {
      const n = await jw(t);
      ue == null || ue.webContents.send("tab-processed", n);
    } catch (n) {
      console.error(`Error processing item ${t.id}:`, n), ue == null || ue.webContents.send("tab-processed", { id: t.id, error: n });
    }
  console.log("All items processed."), ue == null || ue.webContents.send("processing-complete");
}
export {
  o9 as MAIN_DIST,
  jm as RENDERER_DIST,
  Ms as VITE_DEV_SERVER_URL
};
