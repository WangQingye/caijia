import v from '../../main';

function signData(data, num) {
    let data1 = '';
    let i = 0;
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (i < num) {
                data1 += data[key] + ',';
                i++;
            }
        }
    }
    data1 = data1.substring(0, data1.length - 1);
    console.log(data1);
    let sign = api.apiSign(data1, v.$store.state.privateKey);
    let ret = Object.assign(data, {
        sign: api.apiGetTransSign(sign)
    })
    return ret;
};
function checkSign(data, cb) {
    console.log(v.$store.state.privateKey);
    if (!v.$store.state.privateKey) {
        v.$store.commit("setPkDialogShow", true);
        v.$store.commit('setPkCallBack', cb);
        return;
    } else {
        cb();
    }
}

export {
    signData,
    checkSign
}