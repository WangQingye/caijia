(function(window, undefined) {
	var api = function(){

		function str2Bytes(str){			 
			var pos = 0;			 
			var len = str.length;			 
			if(len %2 != 0){			 
			   return null; 			 
			}			 
			len /= 2;			 
			var hexA = new Array();			 
			for(var i=0; i<len; i++){			 
			   var s = str.substr(pos, 2);			 
			   var v = parseInt(s, 16);			 
			   hexA.push(v);			 
			   pos += 2;			 
			}			 
			return hexA;			 
		}

		function bytes2Str(arr){			 
			var str = "";			 
			for(var i=0; i<arr.length; i++){			 
			   var tmp = arr[i].toString(16);			 
			   if(tmp.length == 1){			 
				   tmp = "0" + tmp;			 
			   }		 
			   str += tmp;		 
			}			 
			return str;
		 
		}
		var writeUTF = function (str, isGetBytes) {
			  var back = [];
			  var byteSize = 0;
			  for (var i = 0; i < str.length; i++) {
				  var code = str.charCodeAt(i);
				  if (0x00 <= code && code <= 0x7f) {
						byteSize += 1;
						back.push(code);
				  } else if (0x80 <= code && code <= 0x7ff) {
						byteSize += 2;
						back.push((192 | (31 & (code >> 6))));
						back.push((128 | (63 & code)))
				  } else if ((0x800 <= code && code <= 0xd7ff) 
						  || (0xe000 <= code && code <= 0xffff)) {
						byteSize += 3;
						back.push((224 | (15 & (code >> 12))));
						back.push((128 | (63 & (code >> 6))));
						back.push((128 | (63 & code)))
				  }
			   }
			   for (i = 0; i < back.length; i++) {
					back[i] &= 0xff;
			   }
			   if (isGetBytes) {
					return back
			   }
			   if (byteSize <= 0xff) {
					return [0, byteSize].concat(back);
			   } else {
					return [byteSize >> 8, byteSize & 0xff].concat(back);
				}
		}


		//生成公私钥，使用pin码加密私钥

		//{ pk: 
		//	  sm2_pkey {
		//	     pkeyx: '',
		//	     pkeyy: '' 
		//		 },
		//	  h_sk: '' 
		//}
		this.apiKeyGen = function (pin){
			var sm2_key = sm2.key_gen();
			var h_pin = sm3.hash(pin);
			var eskString = sm4.sm4_crypt_ecb(h_pin,sm2_key.sm2_skey,1);
			var tmp = new Array();
			for(var i = 0;i < eskString.length;i++){
				tmp[i] =  eskString.charCodeAt(i);
			}
			var esk = bytes2Str(tmp);
			
			return {pk:sm2_key.sm2_pkey,esk:esk,sk:sm2_key.sm2_skey};			
		}


		this.apiDecESk = function (pin,esk){
			var tmp = str2Bytes(esk);
			var eskString = "";
			for(var i = 0;i<tmp.length;i++){
				eskString = eskString + String.fromCharCode(tmp[i]);
			}
			var h_pin = sm3.hash(pin);
			var sk = sm4.sm4_crypt_ecb(h_pin,eskString,0);
			var num = sk.length;
			for(;num > 0;num--){
				if(sk.charCodeAt(num-1)!=0){
					break;
				}
			}
			sk = sk.substring(0,num);
			return sk;
		}

		this.apiSign = function (msg, sk){
			var msgBytes = writeUTF(msg,true);
			var ss = sm2.sign(msgBytes,sk);
			var ss1 ={};
			ss1.r = ss.r;
			ss1.s = ss.s;
			return ss1;
		}

		this.apiVerify = function (msg, pk,sign){
			var msgBytes = writeUTF(msg,true);
			return sm2.verify(msgBytes,pk, sign)
		}

		this.apiGetTransPk = function (pk){
			var tpk = "04";
			var x = pk.pkeyx;
			var y = pk.pkeyy;
			for(var i = x.length;i<64;i++){
				tpk = tpk + "0";
			}
			tpk = tpk + x;
			for(var i = y.length;i<64;i++){
				tpk = tpk + "0";
			}
			tpk = tpk + y;
			return tpk;
		}
		
		this.apiGetPk = function (tpk){
			
			var pkeyx = tpk.substring(2,2+64);
			var pkeyy = tpk.substring(2+64,2+64+64);
			var pk = {pkeyx:pkeyx,pkeyy:pkeyy};
			return pk;
		}

		this.apiGetTransSign = function (s){
			var sign = "30";
			var length = 0;
			var r1 = s.r;
			var s1 = s.s;
			
			for(var i = r1.length;i<64;i++){
				r1 = "0" + r1;
			}
			for(var i = s1.length;i<64;i++){
				s1 = "0" + s1;
			}
			
			if(r1[0]>"7"){
				r1 = "00" + r1;
			}
			
			if(s1[0]>"7"){
				s1 = "00" + s1;
			}
			//"30450221" +r1 +"0220"+ s1
			length = length + 2 + r1.length/2 + 2 + s1.length/2;
			
			var l0 = (r1.length/2).toString(16);
			var l1 = (s1.length/2).toString(16);
			sign = sign + length.toString(16) + "02" + (r1.length/2).toString(16) + r1 +  "02" + (s1.length/2).toString(16) + s1;	
			return sign;
		}
	}
	if (typeof module !== 'undefined' && module.exports)
		module.exports = new api();
	else {
		window.api = new api();
	}
}(this));