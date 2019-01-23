import v from '../../main';
function signData(data) {
    if (!v.$store.state.privateKey) {
        v.$store.commit("setPkDialogShow", true);
        return false;
    } else {
        let sign = api.apiSign(JSON.stringify(data), v.$store.state.privateKey);
        let ret = Object.assign(data, {
            sign: api.apiGetTransSign(sign)
        })
        return ret;
    }
}

export {
    signData
}