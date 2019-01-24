(function(window, undefined) {
	var sm2 = function(){
		var sm2_key = function(pkx, pky, sk) {
			this.sm2_pkey = new sm2_pkey(pkx, pky);
			this.sm2_skey = sk;
		};
		var sm2_pkey = function(pkx, pky) {
			this.pkeyx = pkx;
			this.pkeyy = pky;
		};
		var sm2_sign = function(rstr, sstr) {
			this.r = rstr;
			this.s = sstr;
			return this;
		};

		this.key_gen = function () {
			var ecurve = sjcl.ecc.curves.sm2_256_1;
			var k = sjcl.bn.random(ecurve.r, 0);
		//	console.log("d:" + k.toString());
			var kG = ecurve.G.mult(k);
			var str = kG.toBits();
			var len = sjcl.bitArray.bitLength(str);
			var x = sjcl.bitArray.bitSlice(str, 0, len / 2);
			var y = sjcl.bitArray.bitSlice(str, len / 2);
			var xx = sjcl.bn.fromBits(x);
			var yy = sjcl.bn.fromBits(y);
		//	console.log("pkx:" + xx.toString());
			var key = new sm2_key(xx.toString(), yy.toString(), k.toString());
			
			return key;
		};

		this.sign = function (msgBytes, skey) {
			var ecurve = sjcl.ecc.curves.sm2_256_1;
			var e = sm3.hash(msgBytes);
			//console.log("Hm:"+e.toString());
			var k = sjcl.bn.random(ecurve.r, 0);
			//var k=new sjcl.bn(skey_tmp);
			//console.log("k:"+k.toString());
			var kG = ecurve.G.mult(k);
			var str = kG.toBits();
			var len = sjcl.bitArray.bitLength(str);
			var x = sjcl.bitArray.bitSlice(str, 0, len / 2);
			var x1 = sjcl.bn.fromBits(x);
			
			//console.log("x:"+x1.toString());
			
			var Bige = new sjcl.bn(e);
			var Bigr = (Bige.add(x1)).mod(ecurve.r);
			
			if(Bigr.equals(new sjcl.bn("0x00"))||ecurve.r.equals(Bigr.add(k)))
			{
				console.log("sign error!");
				return "error";
			}

			//var dA = new sjcl.bn(skey_tmp);
			var dA = new sjcl.bn(skey);
			var dA1 = (dA.add(new sjcl.bn("0x01"))).inverseMod(ecurve.r);

			var tmp1 = (Bigr.mul(dA)).mod(ecurve.r);
			var tmp2 = (k.sub(tmp1)).mod(ecurve.r);
			var Bigs = (dA1.mul(tmp2)).mod(ecurve.r);
			if(Bigs.equals(new sjcl.bn("0x00"))){
				console.log("sign error!");
				return "error";
			}
			var signature = sm2_sign(Bigr.toString(), Bigs.toString());
			//console.log(signature.r);
			//console.log(signature.s);
			return signature;
		};

		//
		this.verify = function (msgBytes, pkey, sign) {
			var ecurve = sjcl.ecc.curves.sm2_256_1;
			var e = sm3.hash(msgBytes);
			var r = new sjcl.bn(sign.r);
			var s = new sjcl.bn(sign.s);
			var t = (r.add(s)).mod(ecurve.r);
			
			var pkeyx = new sjcl.bn(pkey.pkeyx);
			var pkeyy = new sjcl.bn(pkey.pkeyy);
			//var pkeyx = new sjcl.bn(pkeyx_tmp);
			//var pkeyy = new sjcl.bn(pkeyy_tmp);

			var pkey = new sjcl.ecc.point(ecurve, new ecurve.field(pkeyx),
					new ecurve.field(pkeyy));

			var tmp = ecurve.G.mult2(s, t, pkey);

			var str = tmp.toBits();
			var len = sjcl.bitArray.bitLength(str);
			var x = sjcl.bitArray.bitSlice(str, 0, len / 2);
			var x1 = sjcl.bn.fromBits(x);
			
			var R = (x1.add(new sjcl.bn(e))).mod(ecurve.r);
			//console.log(R.toString());
			if (R.equals(r))
				return 0;//
			else
				return 1;//
			

		};
	}
	if (typeof module !== 'undefined' && module.exports)
		module.exports = new sm2();
	else {
		window.sm2 = new sm2();
	}
}(this));


