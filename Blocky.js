(function() {
  var Blocky;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Blocky = Blocky = (function() {
    function Blocky(text, container, config) {
      var c, canvas, canvas_size, limit, r, _fn, _ref, _ref2;
      if (text == null) {
        text = null;
      }
      if (container == null) {
        container = null;
      }
      if (config == null) {
        config = {};
      }
      if (container) {
        this.container = window.document.getElementById(container);
      }
      if (!this.container) {
        throw new Error("Invalid Container for QR Canvas");
      }
      if (!text) {
        throw new Error("No content for QR code");
      }
      this.cell_size = config.cell_size || 4;
      this.black = config.black || "rgb(0,0,0)";
      this.white = config.white || "rgb(255,255,255)";
      this.type_number = config.typenumber || 10;
      this.error_level = config.error_level || 'M';
      ((_ref = this.error_level.charAt(0).toUpperCase) === 'M' || _ref === 'H' || _ref === 'Q' || _ref === 'L') || 'M';
      if ((_ref2 = config.scheme) === 'watermelon' || _ref2 === 'wedding' || _ref2 === 'arctic' || _ref2 === 'spicy') {
        switch (config.scheme) {
          case 'watermelon':
            this.black = "rgb(247,12,71)";
            this.white = "rgb(168,247,130)";
            break;
          case 'wedding':
            this.black = "rgb(250,171,0)";
            this.white = "rgb(198,247,176)";
            break;
          case 'arctic':
            this.black = "rgb(252,0,244)";
            this.white = "rgb(214,255,252)";
            break;
          case 'spicy':
            this.black = "rgb(255,0,0)";
            this.white = "rgb(250,245,170)";
        }
      }
      canvas = window.document.createElement('canvas');
      if (!canvas) {
        alert('browser does not support Canvas. Sorry about that.');
        return;
      }
      this.context = canvas.getContext('2d');
      this.das_code = new QRCode(this.type_number, QRErrorCorrectLevel.L);
      this.das_code.addData(text);
      this.das_code.make();
      canvas_size = this.das_code.getModuleCount() * this.cell_size;
      canvas.setAttribute('width', canvas_size);
      canvas.setAttribute('height', canvas_size);
      this.container.appendChild(canvas);
      limit = this.das_code.getModuleCount();
      if (canvas.getContext) {
        for (r = 0; 0 <= limit ? r < limit : r > limit; 0 <= limit ? r++ : r--) {
          _fn = __bind(function(r, c) {
            if (this.das_code.isDark(r, c)) {
              this.context.fillStyle = this.black;
            } else {
              this.context.fillStyle = this.white;
            }
            return this.context.fillRect(c * this.cell_size, r * this.cell_size, this.cell_size, this.cell_size);
          }, this);
          for (c = 0; 0 <= limit ? c < limit : c > limit; 0 <= limit ? c++ : c--) {
            _fn(r, c);
          }
        }
      } else {
        console.log("no getContext.., cannot proceed.");
      }
    }
    return Blocky;
  })();
}).call(this);
