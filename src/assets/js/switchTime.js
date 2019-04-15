import v from '../../main';


function renderTime(date) {// IOS/iPhone的Safari不兼容Javascript中的Date( YYYY-MM-DD HH:mm:ss 或者YYYY/MM/DD HH:mm:ss这样的时间格式)问题
    if (!date) return;
    let aa = date.replace(/\-/g, "/");
    let bb = aa.replace(/T/g, " ");
    let cc = bb.split(".")[0];
    let dataObj = new Date(cc);
    let txt = "";
    txt += dataObj.getFullYear() + "-";
    txt += PrefixInteger(dataObj.getMonth() + 1, 2) + "-";
    txt += PrefixInteger(dataObj.getDate(), 2) + " ";
    txt += PrefixInteger(dataObj.getHours(), 2) + ":";
    txt += PrefixInteger(dataObj.getMinutes(), 2) + ":";
    txt += PrefixInteger(dataObj.getSeconds(), 2);
    return regfn(txt);
  }

  function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
  }
  function regfn(str){
    let reg=/\s+00:|:00+$/g;
    let strIndex=str.search(reg);
    if(strIndex>0){
      let strSlice = str.slice(0,strIndex)
      return strSlice
    }else{
      return str
    }
  }

export {
    renderTime
}